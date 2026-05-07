#!/usr/bin/env python3
"""Fetch more SOL 15m data by paginating through Binance API."""
import sys, os, json, csv, time
from datetime import datetime, timezone, timedelta
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from fetch_data import fetch_binance_klines

OUTPUT = "/home/captain/.openclaw/workspace/trading-playbooks/data/SOLUSDT_15m_90d.csv"
SYMBOL = "SOLUSDT"
INTERVAL = "15m"
LIMIT = 1000
DAYS_BACK = 90

all_rows = []
start_time = datetime.now(timezone.utc)

# Fetch in reverse chronological chunks
for i in range(8):  # 8 * 1000 = 8000 candles ≈ 83 days at 15m
    end = start_time - timedelta(days=(i * 12))  # Each chunk overlaps
    end_ms = int(end.timestamp() * 1000)
    
    print(f"Fetching chunk {i+1}/8 ending at {end.strftime('%Y-%m-%d')}...")
    rows = fetch_binance_klines(SYMBOL, INTERVAL, LIMIT, start_time_ms=end_ms - (LIMIT * 15 * 60 * 1000))
    
    if not rows:
        break
    all_rows.extend(rows)
    time.sleep(0.5)  # Rate limit

# Sort and deduplicate
seen = set()
unique = []
for r in sorted(all_rows, key=lambda x: x["timestamp"]):
    ts = r["timestamp"]
    if ts not in seen:
        seen.add(ts)
        unique.append(r)

print(f"Total unique rows: {len(unique)}")

# Trim to 90 days
cutoff = start_time - timedelta(days=90)
unique = [r for r in unique if datetime.fromisoformat(r["timestamp"]) >= cutoff]

# Save
Path(OUTPUT).parent.mkdir(parents=True, exist_ok=True)
with open(OUTPUT, "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=["timestamp","open","high","low","close","volume"])
    w.writeheader()
    w.writerows(unique)

if unique:
    print(f"Saved {len(unique)} rows to {OUTPUT}")
    print(f"Range: {unique[0]['timestamp'][:10]} → {unique[-1]['timestamp'][:10]}")
    print(f"First: O={unique[0]['open']} H={unique[0]['high']} L={unique[0]['low']} C={unique[0]['close']}")
    print(f"Last:  O={unique[-1]['open']} H={unique[-1]['high']} L={unique[-1]['low']} C={unique[-1]['close']}")
else:
    print("No data received")
    sys.exit(1)
