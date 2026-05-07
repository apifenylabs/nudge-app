#!/usr/bin/env python3
"""Run full TendersAlt backtest against SOL 15m data and compare parameter combos."""
import sys, os, json, itertools
from pathlib import Path
import numpy as np

sys.path.insert(0, "/home/captain/.openclaw/workspace/trading-playbooks/scripts")
os.chdir("/home/captain/.openclaw/workspace/trading-playbooks")

from orb_signal import load_ohlcv
from orb_backtest import run_backtest
from tendersalt_signal_v2 import generate_tendersalt_signals_v2

DATA = "data/SOLUSDT_15m_90d.csv"
print(f"Loading {DATA}...")
df = load_ohlcv(DATA)
print(f"Loaded {len(df)} bars")

# Parameter sweep
results_log = []

# Test various min_swing + divergence setting combos
for min_swing, req_div in [(3, False), (5, False), (8, False), (10, False),
                            (3, True), (5, True), (8, True), (10, True)]:
    signals = generate_tendersalt_signals_v2(
        df, swing_min_height_pct=float(min_swing),
        require_divergence=req_div,
        account_balance=1000.0,
    )
    
    if not signals:
        print(f"  swing={min_swing}% div_req={req_div} → 0 signals (skip)")
        results_log.append({
            "min_swing": min_swing, "div_required": req_div,
            "num_signals": 0, "return_pct": 0, "win_rate": 0,
            "sharpe": 0, "max_dd": 0, "pf": 0,
        })
        continue
    
    results = run_backtest(df, signals, slippage_bps=10, fee_bps=5, initial_balance=1000.0)
    perf = results["performance"]
    
    results_log.append({
        "min_swing": min_swing,
        "div_required": req_div,
        "num_signals": perf["num_trades"],
        "num_skipped": perf["num_skipped"],
        "return_pct": perf["total_return_pct"],
        "win_rate": perf["win_rate_pct"],
        "sharpe": perf["sharpe_ratio"],
        "max_dd": perf["max_drawdown_pct"],
        "pf": perf["profit_factor"],
    })
    print(f"  swing={min_swing:2d}% div={str(req_div):5s} → {perf['num_trades']:2d} trades "
          f"ret={perf['total_return_pct']:>+6.1f}% wr={perf['win_rate_pct']:>4.0f}% "
          f"sharpe={perf['sharpe_ratio']:>+5.1f} dd={perf['max_drawdown_pct']:>4.1f}%")

# Sort by Sharpe
results_log.sort(key=lambda r: r["sharpe"], reverse=True)

print(f"\n{'='*70}")
print(f"TOP RESULTS (by Sharpe)")
print(f"{'='*70}")
print(f"{'Swing':>5} {'DivReq':>7} {'Trades':>7} {'Return':>8} {'Win%':>6} {'Sharpe':>7} {'DD%':>6} {'PF':>6}")
for r in results_log:
    if r["num_signals"] == 0:
        continue
    print(f"{r['min_swing']:>5d} {str(r['div_required']):>7s} {r['num_signals']:>7d} "
          f"{r['return_pct']:>+7.1f}% {r['win_rate']:>5.0f}% {r['sharpe']:>+6.1f} "
          f"{r['max_dd']:>5.1f}% {r['pf']:>5.2f}")

# Save
with open("data/TENDERSALT_sweep.json", "w") as f:
    json.dump(results_log, f, indent=2)
print(f"\nSaved to data/TENDERSALT_sweep.json")
