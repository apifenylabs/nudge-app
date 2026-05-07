#!/usr/bin/env python3
"""
TendersAlt Signal Generator v3 — ATR-based stops, fixed SELL targets, trend filter.

Key improvements over v2:
- ATR-based stops (not swing extremes)
- Proper short targets using fib extensions downward
- Optional trend filter (only trade in direction of 50-bar MA)
- Dynamic position sizing

Usage:
    python3 tendersalt_signal_v3.py --input data.csv --output signals.json
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


def calculate_atr(df: pd.DataFrame, period: int = 14) -> np.ndarray:
    """Calculate Average True Range."""
    high = df["high"].values
    low = df["low"].values
    close = df["close"].values
    
    tr = np.zeros(len(df))
    tr[0] = high[0] - low[0]
    for i in range(1, len(df)):
        tr[i] = max(high[i] - low[i], abs(high[i] - close[i-1]), abs(low[i] - close[i-1]))
    
    atr = np.zeros(len(df))
    atr[period] = np.mean(tr[1:period+1])
    for i in range(period + 1, len(df)):
        atr[i] = (atr[i-1] * (period - 1) + tr[i]) / period
    atr[:period] = atr[period] if len(df) > period else 0
    
    return atr


def calculate_rsi(prices: np.ndarray, period: int = 14) -> np.ndarray:
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


def generate_signals_v3(
    df: pd.DataFrame,
    swing_min_height_pct: float = 5.0,
    swing_window: int = 30,
    rsi_period: int = 14,
    atr_period: int = 14,
    atr_stop_mult: float = 2.0,   # Stop = entry +/- ATR * mult
    atr_tp1_mult: float = 3.0,    # TP1 = entry +/- ATR * mult
    atr_tp2_mult: float = 5.0,    # TP2 = entry +/- ATR * mult
    require_divergence: bool = False,
    divergence_threshold: float = 3.0,
    use_trend_filter: bool = False,
    trend_ma_period: int = 50,
    risk_per_trade_pct: float = 1.0,
    account_balance: float = 1000.0,
    max_position_pct: float = 20.0,
    min_signal_gap_bars: int = 48,
) -> list:
    """
    Generate TendersAlt signals with ATR-based risk management.
    """
    closes = df["close"].values
    highs = df["high"].values
    lows = df["low"].values
    
    atr = calculate_atr(df, atr_period)
    rsi = calculate_rsi(closes, rsi_period)
    
    # Trend filter: MA50
    if use_trend_filter:
        ma50 = np.full(len(closes), np.nan)
        for i in range(trend_ma_period, len(closes)):
            ma50[i] = np.mean(closes[i - trend_ma_period:i])
    
    # Detect swings
    swings = detect_swings(df, min_height_pct=swing_min_height_pct, window=swing_window)
    if not swings:
        return []
    
    signaled_swing_keys = set()
    signals = []
    last_signal_bar = -min_signal_gap_bars
    
    for i in range(max(swing_window, atr_period, rsi_period, 50), len(df)):
        if i - last_signal_bar < min_signal_gap_bars:
            continue
        
        current_price = closes[i]
        current_high = highs[i]
        current_low = lows[i]
        current_atr = atr[i]
        
        if current_atr <= 0:
            continue
        
        # Trend filter
        if use_trend_filter and not np.isnan(ma50[i]):
            trend_up = closes[i] > ma50[i]
        
        for pair in reversed(swings):
            if pair["swing_end"]["index"] >= i:
                continue
            if pair["swing_end"]["index"] < i - 300:
                break
            
            swing_key = f"{pair['swing_low']['index']}_{pair['swing_high']['index']}"
            if swing_key in signaled_swing_keys:
                continue
            
            swing_low_price = pair["swing_low"]["price"]
            swing_high_price = pair["swing_high"]["price"]
            
            fib = calculate_fib_levels(swing_low_price, swing_high_price)
            gp_min = fib["golden_pocket"]["entry_min"]
            gp_max = fib["golden_pocket"]["entry_max"]
            
            # Check golden pocket overlap
            if not (current_low <= gp_max and current_high >= gp_min):
                continue
            
            gp_mid = (gp_min + gp_max) / 2
            if abs(current_price - gp_mid) / gp_mid > 0.05:
                continue
            
            # RSI divergence
            start_idx = min(pair["swing_low"]["index"], pair["swing_high"]["index"])
            rsi_start = rsi[start_idx]
            rsi_current = rsi[i]
            
            if pair["direction"] == "UP":
                side = "BUY"
                rsi_diff = rsi_current - rsi_start
                if require_divergence and rsi_diff < divergence_threshold:
                    continue
                entry = current_price
                stop = entry - current_atr * atr_stop_mult
                tp1 = entry + current_atr * atr_tp1_mult
                tp2 = entry + current_atr * atr_tp2_mult
            else:
                side = "SELL"
                rsi_diff = rsi_start - rsi_current
                if require_divergence and rsi_diff < divergence_threshold:
                    continue
                entry = current_price
                stop = entry + current_atr * atr_stop_mult
                tp1 = entry - current_atr * atr_tp1_mult
                tp2 = entry - current_atr * atr_tp2_mult
            
            # Position sizing
            risk_per_unit = abs(entry - stop)
            if risk_per_unit > 0:
                risk_amount = account_balance * risk_per_trade_pct / 100
                qty = min(
                    risk_amount / risk_per_unit,
                    (account_balance * max_position_pct / 100) / entry,
                )
            else:
                qty = 0
            
            r = abs(entry - stop)
            rr1 = abs(tp1 - entry) / r if r > 0 else 0
            rr2 = abs(tp2 - entry) / r if r > 0 else 0
            
            signal = {
                "strategy": "TENDERSALT_V3",
                "timestamp": str(df["timestamp"].iloc[i]),
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
                "atr": round(current_atr, 4),
                "atr_stop_mult": atr_stop_mult,
                "rsi_start": round(rsi_start, 1),
                "rsi_current": round(rsi_current, 1),
                "rsi_diff": round(rsi_diff, 1),
                "divergence": bool(rsi_diff >= divergence_threshold),
            }
            
            signals.append(signal)
            signaled_swing_keys.add(swing_key)
            last_signal_bar = i
            break
    
    return signals


def main():
    parser = argparse.ArgumentParser(description="TendersAlt v3 (ATR-based risk management)")
    parser.add_argument("--input", "-i", required=True)
    parser.add_argument("--output", "-o", default="tendersalt_v3_signals.json")
    parser.add_argument("--min_swing", type=float, default=5.0)
    parser.add_argument("--atr_stop", type=float, default=2.0, help="ATR multiplier for stop")
    parser.add_argument("--atr_tp1", type=float, default=3.0, help="ATR multiplier for TP1")
    parser.add_argument("--atr_tp2", type=float, default=5.0, help="ATR multiplier for TP2")
    parser.add_argument("--require_divergence", action="store_true")
    parser.add_argument("--use_trend_filter", action="store_true")
    parser.add_argument("--balance", type=float, default=1000.0)
    
    args = parser.parse_args()
    
    df = load_ohlcv(args.input)
    signals = generate_signals_v3(
        df,
        swing_min_height_pct=args.min_swing,
        atr_stop_mult=args.atr_stop,
        atr_tp1_mult=args.atr_tp1,
        atr_tp2_mult=args.atr_tp2,
        require_divergence=args.require_divergence,
        use_trend_filter=args.use_trend_filter,
        account_balance=args.balance,
    )
    
    with open(args.output, "w") as f:
        json.dump(signals, f, indent=2)
    
    buy = sum(1 for s in signals if s["side"] == "BUY")
    sell = len(signals) - buy
    div = sum(1 for s in signals if s["divergence"])
    avg_rr = np.mean([s["risk_reward_1"] for s in signals]) if signals else 0
    print(f"{len(signals)} signals ({buy}B/{sell}S) | div={div} | avg R:R={avg_rr:.2f}")
    print(f"Saved to {args.output}")


if __name__ == "__main__":
    main()
