#!/usr/bin/env python3
"""
ORB Signal Generator — Opening Range Breakout Strategy
Pure Python, single purpose: generate ORB signals from OHLCV data.

Usage:
    python3 orb_signal.py --input data.csv --output signals.json [--range_min 15]

Output: JSON array of signals with entry/stop/target levels.
"""
import argparse
import json
import sys
from pathlib import Path
from typing import Optional

try:
    import numpy as np
    import pandas as pd
except ImportError as e:
    print(f"Missing dependency: {e}. Install with: pip install numpy pandas")
    sys.exit(1)


def calculate_atr(df: pd.DataFrame, period: int = 14) -> pd.Series:
    """Calculate Average True Range."""
    n = len(df)
    if n < 2:
        return pd.Series([np.nan] * n, index=df.index)
    
    high = df["high"].values
    low = df["low"].values
    close = df["close"].values
    
    tr = np.maximum(
        high[1:] - low[1:],
        np.maximum(
            np.abs(high[1:] - close[:-1]),
            np.abs(low[1:] - close[:-1]),
        ),
    )
    atr = np.full(n, np.nan)
    
    # First ATR is SMA of first `period` TR values
    if n >= period + 1:
        atr[period] = np.mean(tr[:period])
        for i in range(period + 1, n):
            atr[i] = (atr[i - 1] * (period - 1) + tr[i - 1]) / period
    
    # Backfill first valid ATR
    first_valid = np.where(~np.isnan(atr))[0]
    if len(first_valid) > 0:
        atr[:first_valid[0]] = atr[first_valid[0]]
    return pd.Series(atr, index=df.index)


def identify_opening_range(df: pd.DataFrame, range_bars: int = 15) -> tuple:
    """
    Identify the opening range from the first `range_bars` bars.

    Returns: (or_high, or_low, or_open, or_close) for the range window.
    """
    range_slice = df.iloc[:range_bars]
    or_high = range_slice["high"].max()
    or_low = range_slice["low"].min()
    or_open = range_slice["open"].iloc[0]
    or_close = range_slice["close"].iloc[-1]
    return or_high, or_low, or_open, or_close


def generate_signals(
    df: pd.DataFrame,
    range_bars: int = 15,
    atr_period: int = 14,
    atr_buffer_mult: float = 0.5,
    stop_atr_mult: float = 1.5,
    tp1_r_mult: float = 1.5,
    tp2_r_mult: float = 2.0,
    risk_per_trade_pct: float = 1.0,
    account_balance: float = 1000.0,
    max_position_pct: float = 20.0,
) -> list:
    """
    Generate ORB signals for each trading day in the dataframe.

    Works on intraday data where one day = one opening range period.
    The function assumes data is sorted ascending by timestamp.
    Each day is processed independently (range find → signal generation).
    
    If data spans multiple days, it groups by date.
    """
    if "timestamp" in df.columns:
        df = df.copy()
        df["timestamp"] = pd.to_datetime(df["timestamp"], format="mixed")
        df["date"] = df["timestamp"].dt.date
    else:
        df = df.copy()
        df["date"] = 1  # Treat all as one day
    
    atr = calculate_atr(df, atr_period)
    
    signals = []
    idx = 0
    
    for date_val, day_df in df.groupby("date", sort=True):
        day_len = len(day_df)
        if day_len < range_bars + 5:  # Need range window + some trading bars
            continue
        
        # Get opening range
        or_high, or_low, or_open, or_close = identify_opening_range(day_df, range_bars)
        
        # ATR at end of opening range
        atr_end = atr.iloc[idx + range_bars - 1] if idx + range_bars - 1 < len(atr) else atr.iloc[idx]
        if np.isnan(atr_end) or atr_end == 0:
            idx += day_len
            continue
        
        # Entry levels with buffer
        buy_entry = or_high + atr_end * atr_buffer_mult
        sell_entry = or_low - atr_end * atr_buffer_mult
        
        # Stop loss levels
        buy_stop = buy_entry - atr_end * stop_atr_mult
        sell_stop = sell_entry + atr_end * stop_atr_mult
        
        # Take profit levels
        buy_r = buy_entry - buy_stop  # Risk per unit for BUY
        buy_tp1 = buy_entry + buy_r * tp1_r_mult
        buy_tp2 = buy_entry + buy_r * tp2_r_mult
        
        sell_r = sell_stop - sell_entry  # Risk per unit for SELL
        sell_tp1 = sell_entry - sell_r * tp1_r_mult
        sell_tp2 = sell_entry - sell_r * tp2_r_mult
        
        # Position sizing
        buy_qty = min(
            (account_balance * risk_per_trade_pct / 100) / buy_r,
            (account_balance * max_position_pct / 100) / buy_entry,
        ) if buy_r > 0 else 0
        
        sell_qty = min(
            (account_balance * risk_per_trade_pct / 100) / sell_r,
            (account_balance * max_position_pct / 100) / sell_entry,
        ) if sell_r > 0 else 0
        
        base_signal = {
            "date": str(date_val),
            "or_high": round(or_high, 4),
            "or_low": round(or_low, 4),
            "atr": round(atr_end, 4),
        }
        
        # BUY signal
        buy_signal = {
            **base_signal,
            "side": "BUY",
            "entry_price": round(buy_entry, 4),
            "stop_loss": round(buy_stop, 4),
            "take_profit_1": round(buy_tp1, 4),
            "take_profit_2": round(buy_tp2, 4),
            "position_size": round(buy_qty, 6),
            "risk_amount": round(account_balance * risk_per_trade_pct / 100, 2),
            "r_mult_tp1": tp1_r_mult,
            "r_mult_tp2": tp2_r_mult,
        }
        signals.append(buy_signal)
        
        # SELL signal
        sell_signal = {
            **base_signal,
            "side": "SELL",
            "entry_price": round(sell_entry, 4),
            "stop_loss": round(sell_stop, 4),
            "take_profit_1": round(sell_tp1, 4),
            "take_profit_2": round(sell_tp2, 4),
            "position_size": round(sell_qty, 6),
            "risk_amount": round(account_balance * risk_per_trade_pct / 100, 2),
            "r_mult_tp1": tp1_r_mult,
            "r_mult_tp2": tp2_r_mult,
        }
        signals.append(sell_signal)
        
        idx += day_len
    
    return signals


def load_ohlcv(path: str) -> pd.DataFrame:
    """Load OHLCV data from CSV or JSON."""
    p = Path(path)
    if not p.exists():
        raise FileNotFoundError(f"File not found: {path}")
    
    if p.suffix == ".csv":
        df = pd.read_csv(path)
    elif p.suffix == ".json":
        df = pd.DataFrame(json.loads(p.read_text()))
    else:
        raise ValueError(f"Unsupported format: {p.suffix}. Use .csv or .json")
    
    # Normalize column names
    col_map = {
        "time": "timestamp",
        "date": "timestamp",
        "datetime": "timestamp",
        "o": "open",
        "h": "high",
        "l": "low",
        "c": "close",
        "v": "volume",
    }
    df = df.rename(columns={k: v for k, v in col_map.items() if k in df.columns})
    
    required = {"open", "high", "low", "close"}
    missing = required - set(df.columns)
    if missing:
        raise ValueError(f"Missing required columns: {missing}")
    
    # Ensure timestamp exists; use index if not
    if "timestamp" not in df.columns:
        df["timestamp"] = df.index
    
    df = df.sort_values("timestamp").reset_index(drop=True)
    return df


def main():
    parser = argparse.ArgumentParser(description="ORB Signal Generator")
    parser.add_argument("--input", "-i", required=True, help="OHLCV CSV or JSON file")
    parser.add_argument("--output", "-o", default="orb_signals.json", help="Output JSON path")
    parser.add_argument("--range_bars", type=int, default=15, help="Opening range window (bars)")
    parser.add_argument("--atr_period", type=int, default=14, help="ATR calculation period")
    parser.add_argument("--balance", type=float, default=1000.0, help="Account balance for position sizing")
    parser.add_argument("--risk_pct", type=float, default=1.0, help="Risk per trade %")
    parser.add_argument("--max_position_pct", type=float, default=20.0, help="Max position size % of account")
    
    args = parser.parse_args()
    
    print(f"Loading data from {args.input}...")
    df = load_ohlcv(args.input)
    print(f"Loaded {len(df)} bars")
    
    signals = generate_signals(
        df,
        range_bars=args.range_bars,
        atr_period=args.atr_period,
        risk_per_trade_pct=args.risk_pct,
        account_balance=args.balance,
        max_position_pct=args.max_position_pct,
    )
    
    print(f"Generated {len(signals)} signals ({len(signals)//2} trading days)")
    
    with open(args.output, "w") as f:
        json.dump(signals, f, indent=2)
    print(f"Signals written to {args.output}")
    
    # Summary
    buy_count = sum(1 for s in signals if s["side"] == "BUY")
    sell_count = sum(1 for s in signals if s["side"] == "SELL")
    avg_r = sum(s["position_size"] * (s["stop_loss"] if s["side"] == "BUY" else s["entry_price"])
                for s in signals) / max(len(signals), 1)
    print(f"\nSummary: {buy_count} BUY / {sell_count} SELL | Avg risk/trade: ${avg_r:.2f}")


if __name__ == "__main__":
    main()
