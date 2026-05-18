#!/usr/bin/env python3
"""
Swing Detection Engine — Identifies major swing highs/lows in price data.

Pure numpy/pandas. No scipy dependency.

Usage:
    from swing_detector import detect_swings
    swings = detect_swings(df, min_height_pct=5.0, window=30)
"""
from typing import Optional
import numpy as np
import pandas as pd


def detect_swings(
    df: pd.DataFrame,
    min_height_pct: float = 5.0,
    max_lookback: int = 100,
    window: int = 30,
) -> list:
    """
    Detect significant swing highs and lows in price data.
    
    A swing is defined as a local extremum (peak or trough) within a rolling window,
    with a minimum price move (height_pct) to filter noise.
    
    Args:
        df: OHLCV DataFrame with columns ['high', 'low', 'close']
        min_height_pct: Minimum swing height as percentage (e.g., 5.0 = 5%)
        max_lookback: Maximum bars to scan back for swing validation
        window: Rolling window size for local extremum detection
        
    Returns:
        List of swing dicts with: index, type(HIGH/LOW), price, timestamp, height_pct
    """
    highs = df["high"].values
    lows = df["low"].values
    closes = df["close"].values
    timestamps = df["timestamp"].values if "timestamp" in df.columns else np.arange(len(df))
    
    swings = []
    
    # First pass: find all local peaks and troughs
    for i in range(window, len(df) - window):
        # Local high (peak)
        if highs[i] == max(highs[i - window:i + window + 1]):
            # Check it's a peak (compare to neighbors)
            left = int(max(0, i - window // 4))
            right = int(min(len(df) - 1, i + window // 4))
            if highs[i] >= high_center(highs, left, right) * 1.001:
                swings.append({
                    "index": int(i),
                    "type": "HIGH",
                    "price": round(float(highs[i]), 4),
                    "timestamp": str(timestamps[i]),
                })
        
        # Local low (trough)
        if lows[i] == min(lows[i - window:i + window + 1]):
            left = int(max(0, i - window // 4))
            right = int(min(len(df) - 1, i + window // 4))
            if lows[i] <= low_center(lows, left, right) * 0.999:
                swings.append({
                    "index": int(i),
                    "type": "LOW",
                    "price": round(float(lows[i]), 4),
                    "timestamp": str(timestamps[i]),
                })
    
    if not swings:
        return swings
    
    # Second pass: filter by minimum swing height
    swings.sort(key=lambda s: s["index"])
    
    # Build swing pairs (HIGH→LOW or LOW→HIGH)
    pairs = []
    i = 0
    while i < len(swings) - 1:
        current = swings[i]
        # Find the next opposite-type swing
        next_type = "LOW" if current["type"] == "HIGH" else "HIGH"
        for j in range(i + 1, len(swings)):
            if swings[j]["type"] == next_type:
                # Check height
                height = abs(current["price"] - swings[j]["price"])
                base = min(current["price"], swings[j]["price"])
                height_pct = height / base * 100
                
                if height_pct >= min_height_pct:
                    direction = "UP" if swings[j]["type"] == "HIGH" else "DOWN"
                    pairs.append({
                        "swing_start": current,
                        "swing_end": swings[j],
                        "height_pct": round(height_pct, 2),
                        "direction": direction,
                        "bars": swings[j]["index"] - current["index"],
                        "swing_low": current if current["type"] == "LOW" else swings[j],
                        "swing_high": current if current["type"] == "HIGH" else swings[j],
                    })
                    i = j
                    break
        else:
            i += 1
    
    return pairs


def high_center(arr, left, right):
    """Average of values around the edges of a window (excluding the center point)."""
    if right - left < 4:
        return arr[left:right+1].mean()
    return np.mean([arr[left], arr[right], arr[(left + right) // 2]])


def low_center(arr, left, right):
    """Same as high_center but for lows."""
    if right - left < 4:
        return arr[left:right+1].mean()
    return np.mean([arr[left], arr[right], arr[(left + right) // 2]])


def calculate_fib_levels(swing_low: float, swing_high: float) -> dict:
    """
    Calculate all Fibonacci retracement and extension levels from a swing pair.
    
    For UP swing: swing_low is start, swing_high is end (retrace = pullback from high)
    For DOWN swing: swing_high is start, swing_low is end (retrace = bounce from low)
    
    Args:
        swing_low: Price at swing low point
        swing_high: Price at swing high point
        
    Returns:
        Dict with all fib levels and the range
    """
    diff = swing_high - swing_low
    
    levels = {
        "swing_low": round(swing_low, 4),
        "swing_high": round(swing_high, 4),
        "range": round(diff, 4),
        "range_pct": round(diff / swing_low * 100, 2),
        "retracement": {
            "0.236": round(swing_high - diff * 0.236, 4),
            "0.382": round(swing_high - diff * 0.382, 4),
            "0.500": round(swing_high - diff * 0.500, 4),
            "0.618": round(swing_high - diff * 0.618, 4),  # Golden pocket start
            "0.786": round(swing_high - diff * 0.786, 4),  # Golden pocket end
        },
        "extension": {
            "1.272": round(swing_high + diff * 0.272, 4),
            "1.618": round(swing_high + diff * 0.618, 4),  # TP1 target
            "2.000": round(swing_high + diff * 1.000, 4),  # TP2 target
            "2.618": round(swing_high + diff * 1.618, 4),
            "3.618": round(swing_high + diff * 2.618, 4),
        },
        "golden_pocket": {
            "entry_min": round(swing_high - diff * 0.786, 4),
            "entry_max": round(swing_high - diff * 0.618, 4),
        },
    }
    return levels


def check_price_in_golden_pocket(price: float, fib_levels: dict) -> bool:
    """Check if current price is within the golden pocket zone."""
    gp = fib_levels["golden_pocket"]
    return gp["entry_min"] <= price <= gp["entry_max"]


def find_active_swing_for_price(
    current_price: float,
    swing_pairs: list,
    current_index: int,
    max_bars_ago: int = 200,
) -> Optional[dict]:
    """
    Find the most recent swing pair that this price could be retracing to.
    
    For a BUY signal: Most recent completed UP swing (LOW→HIGH), 
    price is now retracing back toward 0.618-0.786.
    
    For a SELL signal: Most recent completed DOWN swing (HIGH→LOW),
    price is now bouncing back toward 0.618-0.786.
    """
    for pair in reversed(swing_pairs):
        if pair["swing_end"]["index"] > current_index:
            continue
        if pair["swing_end"]["index"] < current_index - max_bars_ago:
            continue
        
        fib = calculate_fib_levels(pair["swing_low"]["price"], pair["swing_high"]["price"])
        if check_price_in_golden_pocket(current_price, fib):
            return {"pair": pair, "fib_levels": fib}
    
    return None
