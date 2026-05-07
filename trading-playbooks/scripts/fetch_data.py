#!/usr/bin/env python3
"""
Fetch market data from free APIs (Yahoo Finance, Binance, CoinGecko) for backtesting.
No API keys required.

Usage:
    python3 fetch_data.py --symbol BTCUSDT --exchange binance --interval 1h --days 365 --output btc_1h.csv
"""
import argparse
import csv
import json
import sys
import time
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Optional


def fetch_binance_klines(symbol: str, interval: str = "1h", limit: int = 1000, start_time_ms: int = None) -> list:
    """Fetch klines from Binance public API (no key needed)."""
    import urllib.request
    
    params = f"symbol={symbol}&interval={interval}&limit={limit}"
    if start_time_ms:
        params += f"&startTime={start_time_ms}"
    
    url = f"https://api.binance.com/api/v3/klines?{params}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = json.loads(resp.read().decode())
    
    rows = []
    for k in data:
        rows.append({
            "timestamp": datetime.fromtimestamp(k[0] / 1000, tz=timezone.utc).isoformat(),
            "open": float(k[1]),
            "high": float(k[2]),
            "low": float(k[3]),
            "close": float(k[4]),
            "volume": float(k[5]),
        })
    
    return rows


def fetch_yahoo_ohlc(symbol: str, days: int = 365, interval: str = "1h") -> list:
    """
    Fetch OHLCV data from Yahoo Finance using the chart API.
    Falls back to daily if hourly is unavailable for the full period.
    Uses the `range` param to get the max period, then filters.
    """
    import urllib.request
    
    # Yahoo Finance v8 chart API
    range_str = f"{max(days, 1)}d"
    url = f"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?range={range_str}&interval={interval}"
    
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode())
    except Exception:
        # Fallback: try 5m data if hourly fails
        url = url.replace(f"interval={interval}", "interval=5m&includePrePost=false")
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode())
    
    result = data["chart"]["result"][0]
    timestamps = result["timestamp"]
    quotes = result["indicators"]["quote"][0]
    
    rows = []
    cutoff = datetime.now(timezone.utc) - timedelta(days=days)
    
    for i, ts in enumerate(timestamps):
        dt = datetime.fromtimestamp(ts, tz=timezone.utc)
        if dt < cutoff:
            continue
        
        o = quotes.get("open", [None])[i]
        h = quotes.get("high", [None])[i]
        l = quotes.get("low", [None])[i]
        c = quotes.get("close", [None])[i]
        v = quotes.get("volume", [None])[i]
        
        if all(v is not None for v in [o, h, l, c]):
            rows.append({
                "timestamp": dt.isoformat(),
                "open": float(o),
                "high": float(h),
                "low": float(l),
                "close": float(c),
                "volume": float(v) if v else 0,
            })
    
    return rows


def save_csv(rows: list, path: str):
    """Save OHLCV rows to CSV."""
    if not rows:
        print("No data to save")
        return
    
    with open(path, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["timestamp", "open", "high", "low", "close", "volume"])
        writer.writeheader()
        writer.writerows(rows)
    
    print(f"Saved {len(rows)} rows to {path}")


def main():
    parser = argparse.ArgumentParser(description="Fetch OHLCV market data from free APIs")
    parser.add_argument("--symbol", "-s", required=True, help="Ticker symbol (e.g., BTCUSDT, AAPL, SPY)")
    parser.add_argument("--exchange", "-e", choices=["binance", "yahoo"], default="binance",
                        help="Data source (binance for crypto, yahoo for stocks)")
    parser.add_argument("--interval", "-i", default="1h", help="Candle interval (1h, 15m, 1d)")
    parser.add_argument("--days", "-d", type=int, default=90, help="Days of historical data")
    parser.add_argument("--output", "-o", default=None, help="Output CSV path")
    
    args = parser.parse_args()
    
    if not args.output:
        safe_symbol = args.symbol.replace("^", "").replace("/", "-")
        args.output = f"data/{safe_symbol}_{args.interval}_{args.days}d.csv"
    
    Path(args.output).parent.mkdir(parents=True, exist_ok=True)
    
    print(f"Fetching {args.days}d of {args.interval} data for {args.symbol} from {args.exchange}...")
    
    if args.exchange == "binance":
        rows = fetch_binance_klines(args.symbol, args.interval, limit=min(args.days * 24, 1000))
    else:
        rows = fetch_yahoo_ohlc(args.symbol, args.days, args.interval)
    
    if not rows:
        print("No data received. Check symbol and try again.")
        sys.exit(1)
    
    # Binance returns data in reverse chronological for some endpoints; sort
    rows.sort(key=lambda r: r["timestamp"])
    
    # Trim to requested days
    cutoff = datetime.now(timezone.utc) - timedelta(days=args.days)
    rows = [r for r in rows if datetime.fromisoformat(r["timestamp"]) >= cutoff]
    
    save_csv(rows, args.output)
    print(f"Date range: {rows[0]['timestamp'][:10]} to {rows[-1]['timestamp'][:10]}")
    
    # Show first/last
    first, last = rows[0], rows[-1]
    print(f"First bar: O={first['open']:.2f} H={first['high']:.2f} L={first['low']:.2f} C={first['close']:.2f}")
    print(f"Last bar:  O={last['open']:.2f} H={last['high']:.2f} L={last['low']:.2f} C={last['close']:.2f}")


if __name__ == "__main__":
    main()
