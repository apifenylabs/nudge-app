#!/usr/bin/env python3
"""Sweep TendersAlt v3 parameters and run multi-day backtest on SOL data."""
import sys, os, json, itertools
sys.path.insert(0, "/home/captain/.openclaw/workspace/trading-playbooks/scripts")
os.chdir("/home/captain/.openclaw/workspace/trading-playbooks")

from orb_signal import load_ohlcv
from tendersalt_v3 import generate_signals_v3
from tendersalt_backtest import run_backtest_multiday
import numpy as np

DATASETS = {
    "SOL_bear_15m": "data/SOLUSDT_15m_90d.csv",
    "SOL_choppy_1h": "data/SOLUSDT_uptrend_30m.csv",
}

all_results = []

for dataset_name, dataset_path in DATASETS.items():
    print(f"\n{'='*70}")
    print(f"DATASET: {dataset_name} ({dataset_path})")
    print(f"{'='*70}")
    
    df = load_ohlcv(dataset_path)
    
    # Parameter grid
    params = list(itertools.product(
        [5.0, 8.0],          # swing_min_height
        [1.5, 2.0, 3.0],     # atr_stop_mult
        [2.0, 3.0, 4.0],     # atr_tp1_mult
        [3.0, 5.0, 7.0],     # atr_tp2_mult
    ))
    
    dataset_results = []
    
    for min_sw, stop_m, tp1_m, tp2_m in params:
        signals = generate_signals_v3(
            df,
            swing_min_height_pct=min_sw,
            atr_stop_mult=stop_m,
            atr_tp1_mult=tp1_m,
            atr_tp2_mult=tp2_m,
            require_divergence=False,
            use_trend_filter=False,
            account_balance=1000.0,
        )
        
        if not signals:
            continue
        
        results = run_backtest_multiday(df, signals, slippage_bps=10, fee_bps=5, initial_balance=1000.0)
        perf = results["performance"]
        
        dataset_results.append({
            "dataset": dataset_name,
            "min_swing": min_sw,
            "atr_stop": stop_m,
            "atr_tp1": tp1_m,
            "atr_tp2": tp2_m,
            "num_signals": len(signals),
            "num_trades": perf["num_trades"],
            "return_pct": perf["total_return_pct"],
            "win_rate": perf["win_rate_pct"],
            "sharpe": perf["sharpe_ratio"],
            "max_dd": perf["max_drawdown_pct"],
            "pf": perf["profit_factor"],
        })
    
    all_results.extend(dataset_results)
    
    # Best by Sharpe for this dataset
    dataset_results.sort(key=lambda r: r["sharpe"], reverse=True)
    print(f"\nTop 5 for {dataset_name}:")
    print(f"{'Swing':>5} {'Skip':>5} {'TP1':>5} {'TP2':>5} {'Trds':>5} {'Return':>8} {'Win%':>6} {'Sharpe':>7} {'DD%':>6} {'PF':>6}")
    for r in dataset_results[:5]:
        print(f"{r['min_swing']:>4.0f}% {r['atr_stop']:>4.1f}x {r['atr_tp1']:>4.1f}x {r['atr_tp2']:>4.1f}x "
              f"{r['num_trades']:>5d} {r['return_pct']:>+7.1f}% {r['win_rate']:>5.0f}% "
              f"{r['sharpe']:>+6.1f} {r['max_dd']:>5.1f}% {r['pf']:>5.2f}")

# Overall rankings
all_results.sort(key=lambda r: r["sharpe"], reverse=True)

print(f"\n{'='*70}")
print(f"OVERALL TOP 10 (by Sharpe across all datasets)")
print(f"{'='*70}")
print(f"{'Dataset':>20} {'Swing':>5} {'Stop':>5} {'TP1':>5} {'TP2':>5} {'Trds':>5} {'Ret':>8} {'Win%':>6} {'Sharpe':>7} {'DD%':>6} {'PF':>6}")
for r in all_results[:10]:
    print(f"{r['dataset']:>20} {r['min_swing']:>4.0f}% {r['atr_stop']:>4.1f}x {r['atr_tp1']:>4.1f}x {r['atr_tp2']:>4.1f}x "
          f"{r['num_trades']:>5d} {r['return_pct']:>+7.1f}% {r['win_rate']:>5.0f}% "
          f"{r['sharpe']:>+6.1f} {r['max_dd']:>5.1f}% {r['pf']:>5.2f}")

with open("data/TENDERSALT_v3_sweep.json", "w") as f:
    json.dump(all_results, f, indent=2)
print(f"\nSaved to data/TENDERSALT_v3_sweep.json")
