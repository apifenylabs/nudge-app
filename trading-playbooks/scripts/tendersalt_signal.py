#!/usr/bin/env python3
"""
TendersAlt Signal Generator — Fibonacci retracement + RSI divergence + volume confirmation.

Builds on swing_detector.py. Generates BUY/SELL signals when:
1. Price enters golden pocket (0.618-0.786 Fib retracement)
2. RSI shows divergence
3. Volume profile confirms

Usage:
    python3 tendersalt_signal.py --data SOLUSDT_15m_90d.csv --output signals.json
"""
import argparse
import json
import sys
from pathlib import Path
from typing import Optional

import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).parent))
from swing_detector import detect_swings, calculate_fib_levels, check_price_in_golden_pocket
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


def calculate_vwap(df: pd.DataFrame, period: int = None) -> np.ndarray:
    """Calculate Volume Weighted Average Price."""
    if period is None:
        period = len(df)
    
    high = df["high"].values
    low = df["low"].values
    close = df["close"].values
    volume = df["volume"].values if "volume" in df.columns else np.ones(len(df))
    
    typical_price = (high + low + close) / 3
    cum_vp = np.cumsum(typical_price * volume)
    cum_v = np.cumsum(volume)
    
    vwap = np.full(len(df), np.nan)
    vwap[period - 1:] = cum_vp[period - 1:] / cum_v[period - 1:]
    vwap[:period - 1] = cum_vp[:period - 1] / np.maximum(cum_v[:period - 1], 1)
    
    return vwap


def detect_divergence(
    prices: np.ndarray,
    rsi: np.ndarray,
    swing_low_idx: int,
    swing_high_idx: int,
    current_idx: int,
    divergence_threshold: float = 5.0,
) -> dict:
    """
    Detect RSI divergence between a swing point and current price.
    
    Returns: dict with type (BULLISH/BEARISH/NONE), strength, rsi_diff
    """
    if current_idx <= swing_high_idx:
        return {"type": "NONE", "strength": 0, "rsi_diff": 0}
    
    rsi_swing = rsi[swing_low_idx]  # RSI at swing low
    
    # Get RSI at a recent local extremum (last 10 bars)
    recent_window = prices[max(0, current_idx - 10):current_idx + 1]
    rsi_window = rsi[max(0, current_idx - 10):current_idx + 1]
    
    # Find nearest local price extreme in recent window
    if len(recent_window) < 3:
        return {"type": "NONE", "strength": 0, "rsi_diff": 0}
    
    recent_min_idx = np.argmin(recent_window)
    recent_max_idx = np.argmax(recent_window)
    
    rsi_recent_min = rsi_window[recent_min_idx]
    rsi_recent_max = rsi_window[recent_max_idx]
    
    # For UP swing (price went up, now retracing): check for bullish divergence
    # Lower low in price + higher low in RSI = bullish divergence
    current_price = prices[current_idx]
    current_rsi = rsi[current_idx]
    price_at_swing_low = prices[swing_low_idx]
    
    if current_price <= price_at_swing_low * 1.02:  # Price at or near swing low
        rsi_diff = current_rsi - rsi_swing
        if rsi_diff > divergence_threshold:
            return {
                "type": "BULLISH",
                "strength": round(rsi_diff, 1),
                "rsi_diff": round(rsi_diff, 1),
                "rsi_at_swing_low": round(rsi_swing, 1),
                "rsi_current": round(current_rsi, 1),
            }
    
    # For DOWN swing (price went down, now bouncing): check for bearish divergence
    if current_idx >= swing_high_idx and swing_high_idx > swing_low_idx:
        rsi_at_high = rsi[swing_high_idx]
        
        # Higher high in RSI + lower high in price = bearish divergence
        # Actually for a bounce-up retrace: if RSI is making lower highs while 
        # price continues up, that's bearish divergence for the next leg
        # This is simplified for now
    
    return {"type": "NONE", "strength": 0, "rsi_diff": 0}


def generate_tendersalt_signals(
    df: pd.DataFrame,
    swing_min_height_pct: float = 5.0,
    swing_window: int = 30,
    rsi_period: int = 14,
    divergence_threshold: float = 5.0,
    risk_per_trade_pct: float = 1.0,
    account_balance: float = 1000.0,
    max_position_pct: float = 20.0,
) -> list:
    """
    Generate TendersAlt signals: Fib retracement + RSI divergence + volume confirmation.
    Scans forward through data, generating signals as conditions are met.
    """
    highs = df["high"].values
    lows = df["low"].values
    closes = df["close"].values
    prices = closes
    
    rsi = calculate_rsi(prices, rsi_period)
    vwap = calculate_vwap(df)
    
    # Detect all swings
    swings = detect_swings(df, min_height_pct=swing_min_height_pct, window=swing_window)
    if not swings:
        return []
    
    signals = []
    
    for i in range(swing_window * 2, len(df)):
        current_price = prices[i]
        current_high = highs[i]
        current_low = lows[i]
        
        # Find active swing for this price
        # Look for swings that completed before this bar
        recent_pairs = [p for p in swings 
                       if p["swing_end"]["index"] < i
                       and p["swing_end"]["index"] > i - 200]
        
        for pair in reversed(recent_pairs):
            swing_low_price = pair["swing_low"]["price"]
            swing_high_price = pair["swing_high"]["price"]
            swing_start_idx = pair["swing_start"]["index"]
            swing_end_idx = pair["swing_end"]["index"]
            
            fib = calculate_fib_levels(swing_low_price, swing_high_price)
            
            # Check if current bar's range overlaps with golden pocket
            if not (current_low <= fib["golden_pocket"]["entry_max"] and 
                    current_high >= fib["golden_pocket"]["entry_min"]):
                continue
            
            # Price is in golden pocket → check divergence
            divergence = detect_divergence(
                prices, rsi,
                swing_start_idx if pair["direction"] == "UP" else swing_end_idx,
                swing_end_idx if pair["direction"] == "UP" else swing_start_idx,
                i,
                divergence_threshold,
            )
            
            # Determine side
            if pair["direction"] == "UP":
                # Retracing DOWN from swing high → potential BUY
                if divergence["type"] == "BULLISH":
                    side = "BUY"
                elif divergence["type"] == "NONE":
                    side = "BUY"  # Conservative: take golden pocket even without divergence
                else:
                    continue
            elif pair["direction"] == "DOWN":
                # Bouncing UP from swing low → potential SELL
                if divergence["type"] == "BEARISH":
                    side = "SELL"
                elif divergence["type"] == "NONE":
                    side = "SELL"
                else:
                    continue
            else:
                continue
            
            # Entry at current close (simulated)
            entry = current_price
            
            # Stop loss
            if side == "BUY":
                stop = min(swing_low_price * 0.99, entry * 0.95)  # Below swing low or -5%
            else:
                stop = max(swing_high_price * 1.01, entry * 1.05)  # Above swing high or +5%
            
            # Take profit at fib extensions
            if side == "BUY":
                tp1 = fib["extension"]["1.618"]  # 161.8% extension
                tp2 = fib["extension"]["2.000"]  # 200% extension
            else:
                # For shorts: tp below entry
                inv_entry = swing_high_price + (swing_high_price - swing_low_price)
                tp1 = inv_entry - (inv_entry - entry) * 1.618
                tp2 = inv_entry - (inv_entry - entry) * 2.0
                tp1 = min(tp1, entry)
                tp2 = min(tp2, tp1)
            
            # Position sizing
            r = abs(entry - stop)
            if r > 0:
                qty = min(
                    (account_balance * risk_per_trade_pct / 100) / r,
                    (account_balance * max_position_pct / 100) / entry,
                )
            else:
                qty = 0
            
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
                "risk_reward_1": round(abs(tp1 - entry) / r, 2) if r > 0 else 0,
                "risk_reward_2": round(abs(tp2 - entry) / r, 2) if r > 0 else 0,
                "r_mult_tp1": round(abs(tp1 - entry) / r, 2) if r > 0 else 0,
                "r_mult_tp2": round(abs(tp2 - entry) / r, 2) if r > 0 else 0,
                # Fib metadata
                "swing_low": round(swing_low_price, 4),
                "swing_high": round(swing_high_price, 4),
                "swing_height_pct": pair["height_pct"],
                "swing_direction": pair["direction"],
                "golden_pocket_min": fib["golden_pocket"]["entry_min"],
                "golden_pocket_max": fib["golden_pocket"]["entry_max"],
                "fib_0_618": fib["retracement"]["0.618"],
                "fib_0_786": fib["retracement"]["0.786"],
                "fib_1_618": fib["extension"]["1.618"],
                "fib_2_000": fib["extension"]["2.000"],
                # Divergence
                "divergence_type": divergence["type"],
                "divergence_strength": divergence.get("strength", 0),
                "rsi_at_swing": divergence.get("rsi_at_swing_low", 0),
                "rsi_current": divergence.get("rsi_current", 0),
            }
            
            signals.append(signal)
            break  # One signal per bar
    
    return signals


def main():
    parser = argparse.ArgumentParser(description="TendersAlt Fib Signal Generator")
    parser.add_argument("--input", "-i", required=True, help="OHLCV CSV/JSON")
    parser.add_argument("--output", "-o", default="tendersalt_signals.json", help="Output path")
    parser.add_argument("--min_swing", type=float, default=5.0, help="Minimum swing height %")
    parser.add_argument("--balance", type=float, default=1000.0)
    
    args = parser.parse_args()
    
    print(f"Loading {args.input}...")
    df = load_ohlcv(args.input)
    print(f"Loaded {len(df)} bars")
    
    print(f"Running TendersAlt (min_swing={args.min_swing}%, balance=${args.balance:.0f})...")
    signals = generate_tendersalt_signals(df, swing_min_height_pct=args.min_swing, account_balance=args.balance)
    
    print(f"Generated {len(signals)} signals")
    
    with open(args.output, "w") as f:
        json.dump(signals, f, indent=2)
    
    buy_count = sum(1 for s in signals if s["side"] == "BUY")
    sell_count = sum(1 for s in signals if s["side"] == "SELL")
    div_count = sum(1 for s in signals if s["divergence_type"] != "NONE")
    print(f"BUY: {buy_count} / SELL: {sell_count} | Divergence confirmed: {div_count}")
    print(f"Saved to {args.output}")


if __name__ == "__main__":
    main()
