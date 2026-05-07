#!/usr/bin/env python3
"""Test TendersAlt signal generation on SOL 15m data."""
import sys, os, json
sys.path.insert(0, "/home/captain/.openclaw/workspace/trading-playbooks/scripts")
os.chdir("/home/captain/.openclaw/workspace/trading-playbooks")

from tendersalt_signal import generate_tendersalt_signals
from orb_signal import load_ohlcv

DATA = "data/SOLUSDT_15m_90d.csv"

print("Loading SOL 15m data...")
df = load_ohlcv(DATA)
print(f"Loaded {len(df)} bars (range: {df['timestamp'].iloc[0][:10]} → {df['timestamp'].iloc[-1][:10]})")
print(f"Price range: ${df['low'].min():.2f} - ${df['high'].max():.2f}")

for min_swing in [3.0, 5.0, 8.0, 10.0]:
    signals = generate_tendersalt_signals(
        df, swing_min_height_pct=min_swing, account_balance=1000.0
    )
    buy = sum(1 for s in signals if s["side"] == "BUY")
    sell = sum(1 for s in signals if s["side"] == "SELL")
    div = sum(1 for s in signals if s["divergence_type"] != "NONE")
    print(f"  min_swing={min_swing:4.0f}% → {len(signals):4d} signals ({buy}B/{sell}S, {div} div)")

# Best params based on signal count
best_swing = 5.0
print(f"\nGenerating full signals with min_swing={best_swing}%...")
signals = generate_tendersalt_signals(df, swing_min_height_pct=best_swing, account_balance=1000.0)
print(f"Total: {len(signals)} signals")

if signals:
    # Show first 5
    for s in signals[:5]:
        print(f"  {s['timestamp']} | {s['side']:4s} | entry=${s['entry_price']:.2f} "
              f"| stop=${s['stop_loss']:.2f} | R:R={s['risk_reward_1']}:1 "
              f"| swing={s['swing_height_pct']:.1f}% | div={s['divergence_type']}")
    
    # Save
    with open("data/TENDERSALT_signals.json", "w") as f:
        json.dump(signals, f, indent=2)
    print(f"\nSaved {len(signals)} signals to data/TENDERSALT_signals.json")
