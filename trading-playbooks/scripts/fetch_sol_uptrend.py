#!/usr/bin/env python3
"""Fetch SOL 15m data from Nov-Dec 2025 uptrend period."""
import csv, json, time, urllib.request
from datetime import datetime, timezone
from pathlib import Path

OUTPUT = "/home/captain/.openclaw/workspace/trading-playbooks/data/SOLUSDT_15m_uptrend.csv"
SYMBOL = "SOLUSDT"
INTERVAL = "15m"

def fetch_binance_klines(symbol, interval, limit=1000, start_time_ms=None):
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
            "open": float(k[1]), "high": float(k[2]), "low": float(k[3]),
            "close": float(k[4]), "volume": float(k[5]),
        })
    return rows

all_rows = []
fetch_end = int(datetime(2025, 12, 15, tzinfo=timezone.utc).timestamp() * 1000)

for i in range(6):
    end_ms = fetch_end - (i * 12 * 24 * 60 * 60 * 1000)
    start_ms = end_ms - (1000 * 15 * 60 * 1000)
    dt = datetime.fromtimestamp(start_ms/1000, tz=timezone.utc).strftime('%Y-%m-%d')
    print(f"Chunk {i+1}/6 starting {dt}...", flush=True)
    rows = fetch_binance_klines(SYMBOL, INTERVAL, 1000, start_time_ms=start_ms)
    if not rows:
        break
    all_rows.extend(rows)
    time.sleep(0.5)

# Deduplicate
seen = set()
unique = []
for r in sorted(all_rows, key=lambda x: x["timestamp"]):
    ts = r["timestamp"]
    if ts not in seen:
        seen.add(ts)
        unique.append(r)

Path(OUTPUT).parent.mkdir(parents=True, exist_ok=True)
with open(OUTPUT, "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=["timestamp","open","high","low","close","volume"])
    w.writeheader()
    w.writerows(unique)

if unique:
    prices = [r["close"] for r in unique]
    print(f"Saved {len(unique)} rows")
    print(f"Range: {unique[0]['timestamp'][:10]} -> {unique[-1]['timestamp'][:10]}")
    print(f"Price: ${float(prices[0]):.2f} -> ${float(prices[-1]):.2f}")
    maxp, minp = max(float(p) for p in prices), min(float(p) for p in prices)
    print(f"Range: ${minp:.2f} - ${maxp:.2f} ({(maxp-minp)/minp*100:.0f}%)")
