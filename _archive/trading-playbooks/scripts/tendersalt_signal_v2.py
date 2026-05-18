#!/usr/bin/env python3
"""
TendersAlt Signal Generator v2 — One signal per swing, not per bar.
Deduplicates: first bar in golden pocket = signal, no repeats until price exits zone.

Usage:
    python3 tendersalt_signal_v2.py --data SOLUSDT_15m_90d.csv --output signals.json
"""
import argparse
import json
import sys
from pathlib import Path
from typing import Optional

import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).parent))
from swing_detector import detect_swings, calculate_fib_levels
from orb_signal import load_ohlcv


def calculate_rsi(prices: np.ndarray, period: int = 14) -> np.ndarray:
    """Calculate RSI from price array."""
    deltas = np.diff(prices)
    gains = np.where(deltas > 0, deltas, 0)
    losses = np.where(deltas < 0, -deltas, 0)
    
    avg_gain = np.zeros_like(prices)
    avg_loss = np.zeros_like(prices)
    
    avg_gain[period] = np.mean(gains[:period])
    avg_loss[period] = np.mean(losses[:period])
    
    for i in range(period + 1, len(prices)):
        avg_gain[i] = (avg_gain[i - 1] * (period - 1) + gains[i - 1]) / period
        avg_loss[i] = (avg_loss[i - 1] * (period - 1) + losses[i - 1]) / period
    
    rs = np.divide(avg_gain, avg_loss, out=np.full_like(avg_gain, 50.0), where=avg_loss != 0)
    rsi = 100 - (100 / (1 + rs))
    rsi[:period] = 50.0
    return rsi


def generate_tendersalt_signals_v2(
    df: pd.DataFrame,
    swing_min_height_pct: float = 5.0,
    swing_window: int = 30,
    rsi_period: int = 14,
    divergence_threshold: float = 3.0,
    require_divergence: bool = False,
    risk_per_trade_pct: float = 1.0,
    account_balance: float = 1000.0,
    max_position_pct: float = 20.0,
    min_signal_gap_bars: int = 48,  # 48 * 15min = 12h gap between signals
) -> list:
    """
    Generate deduplicated TendersAlt signals.
    
    Rules:
    - One signal per swing pair, not per bar
    - Signal fires on FIRST bar that enters golden pocket
    - After signal, ignore that swing until price exits GP zone
    - Min gap between signals to prevent clustering
    """
    highs = df["high"].values
    lows = df["low"].values
    closes = df["close"].values
    prices = closes
    
    rsi = calculate_rsi(prices, rsi_period)
    
    # Detect swings
    swings = detect_swings(df, min_height_pct=swing_min_height_pct, window=swing_window)
    if not swings:
        return []
    
    # Build a map: swing_end_index → pair for quick lookup
    # Track which swings have already generated a signal
    signaled_swing_keys = set()  # f"{swing_low_idx}_{swing_high_idx}"
    
    signals = []
    last_signal_bar = -min_signal_gap_bars
    
    for i in range(max(swing_window, 50), len(df)):
        if i - last_signal_bar < min_signal_gap_bars:
            continue  # Min gap between signals not reached
        
        current_price = prices[i]
        current_high = highs[i]
        current_low = lows[i]
        
        # Find the most recent un-signaled swing where price is in golden pocket
        for pair in reversed(swings):
            if pair["swing_end"]["index"] >= i:
                continue  # Swing hasn't completed yet
            if pair["swing_end"]["index"] < i - 300:
                break  # Too far back
            
            # Check if this swing already generated a signal
            swing_key = f"{pair['swing_low']['index']}_{pair['swing_high']['index']}"
            if swing_key in signaled_swing_keys:
                continue  # Already signaled
            
            swing_low_price = pair["swing_low"]["price"]
            swing_high_price = pair["swing_high"]["price"]
            
            fib = calculate_fib_levels(swing_low_price, swing_high_price)
            
            # Check golden pocket
            gp_min = fib["golden_pocket"]["entry_min"]
            gp_max = fib["golden_pocket"]["entry_max"]
            
            # Skip if price range doesn't overlap with golden pocket
            if not (current_low <= gp_max and current_high >= gp_min):
                continue
            
            # Only fire if the *close* is within or near the golden pocket (within 3%)
            # This prevents signals from wide-range bars that barely touch the zone
            gp_mid = (gp_min + gp_max) / 2
            if abs(current_price - gp_mid) / gp_mid > 0.05:
                continue
            
            # RSI divergence check
            start_idx = min(pair["swing_low"]["index"], pair["swing_high"]["index"])
            end_idx = max(pair["swing_low"]["index"], pair["swing_high"]["index"])
            
            rsi_at_swing_start = rsi[start_idx]
            rsi_current = rsi[i]
            
            # Determine side
            if pair["direction"] == "UP":
                # Swing went up, now retracing → potential BUY
                # Bullish divergence: RSI at current > RSI at swing low while price is near low
                rsi_diff = rsi_current - rsi_at_swing_start
                
                if require_divergence and rsi_diff < divergence_threshold:
                    continue  # Skip if divergence required but not met
                
                side = "BUY"
                entry = current_price
                stop = min(swing_low_price * 0.98, entry * 0.93)
                tp1 = fib["extension"]["1.618"]
                tp2 = fib["extension"]["2.000"]
                
            else:  # DOWN
                rsi_diff = rsi_at_swing_start - rsi_current
                
                if require_divergence and rsi_diff < divergence_threshold:
                    continue
                
                side = "SELL"
                entry = current_price
                stop = max(swing_high_price * 1.02, entry * 1.07)
                
                # For shorts: extension from the bottom
                inv_target = swing_low_price - (swing_high_price - swing_low_price)
                tp1 = entry - (entry - inv_target) * 0.618
                tp2 = entry - (entry - inv_target) * 1.0
                tp1 = max(tp1, swing_low_price * 0.9)
                tp2 = max(tp2, swing_low_price * 0.85)
            
            # Position sizing
            r = abs(entry - stop)
            if r > 0:
                qty = min(
                    (account_balance * risk_per_trade_pct / 100) / r,
                    (account_balance * max_position_pct / 100) / entry,
                )
            else:
                qty = 0
            
            # R:R
            rr1 = abs(tp1 - entry) / r if r > 0 else 0
            rr2 = abs(tp2 - entry) / r if r > 0 else 0
            
            signal = {
                "strategy": "TENDERSALT_FIB",
                "timestamp": str(df["timestamp"].iloc[i]) if "timestamp" in df.columns else str(i),
                "bar_index": int(i),
                "side": side,
                "entry_price": round(entry, 4),
                "stop_loss": round(stop, 4),
                "take_profit_1": round(tp1, 4),
                "take_profit_2": round(tp2, 4),
                "position_size": round(qty, 6),
                "risk_amount": round(account_balance * risk_per_trade_pct / 100, 2),
                "risk_reward_1": round(rr1, 2),
                "risk_reward_2": round(rr2, 2),
                "swing_low": round(swing_low_price, 4),
                "swing_high": round(swing_high_price, 4),
                "swing_height_pct": pair["height_pct"],
                "swing_direction": pair["direction"],
                "golden_pocket_min": gp_min,
                "golden_pocket_max": gp_max,
                "fib_1_618": fib["extension"]["1.618"],
                "fib_2_000": fib["extension"]["2.000"],
                "rsi_at_swing": round(rsi_at_swing_start, 1),
                "rsi_current": round(rsi_current, 1),
                "rsi_diff": round(rsi_diff, 1),
                "divergence": bool(rsi_diff >= divergence_threshold),
            }
            
            signals.append(signal)
            signaled_swing_keys.add(swing_key)
            last_signal_bar = i
            break  # One signal per bar max
    
    return signals


def main():
    parser = argparse.ArgumentParser(description="TendersAlt Fib Signal Generator v2")
    parser.add_argument("--input", "-i", required=True, help="OHLCV CSV/JSON")
    parser.add_argument("--output", "-o", default="tendersalt_signals.json", help="Output path")
    parser.add_argument("--min_swing", type=float, default=5.0, help="Minimum swing height %")
    parser.add_argument("--require_divergence", action="store_true", help="Only signal with RSI divergence")
    parser.add_argument("--balance", type=float, default=1000.0)
    
    args = parser.parse_args()
    
    print(f"Loading {args.input}...")
    df = load_ohlcv(args.input)
    
    print(f"Signals: min_swing={args.min_swing}%, div_required={args.require_divergence}")
    signals = generate_tendersalt_signals_v2(
        df, swing_min_height_pct=args.min_swing,
        require_divergence=args.require_divergence,
        account_balance=args.balance,
    )
    
    print(f"Generated {len(signals)} signals")
    
    with open(args.output, "w") as f:
        json.dump(signals, f, indent=2)
    
    if signals:
        div_count = sum(1 for s in signals if s["divergence"])
        buy = sum(1 for s in signals if s["side"] == "BUY")
        avg_rr = np.mean([s["risk_reward_1"] for s in signals])
        print(f"BUY: {buy} / SELL: {len(signals) - buy} | Div confirmed: {div_count} | Avg R:R: {avg_rr:.2f}")
    print(f"Saved to {args.output}")


if __name__ == "__main__":
    main()
