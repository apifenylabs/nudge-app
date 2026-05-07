#!/usr/bin/env python3
"""Parameter sweep for ORB strategy — find optimal settings on BTC."""
import sys, os, json, itertools
from pathlib import Path

sys.path.insert(0, "/home/captain/.openclaw/workspace/trading-playbooks/scripts")
os.chdir("/home/captain/.openclaw/workspace/trading-playbooks")

from orb_signal import load_ohlcv, generate_signals
from orb_backtest import run_backtest

DATA = "data/BTCUSDT_1h_90d.csv"

print("Loading BTCUSDT 1h data...")
df = load_ohlcv(DATA)
print(f"Loaded {len(df)} bars\n")

# Parameter grid
range_bars_list = [2, 3, 4, 6, 8, 12]  # 2h to 12h opening range
atr_buffer_list = [0.3, 0.5, 0.7, 1.0]
stop_atr_list = [1.0, 1.5, 2.0]
tp1_r_list = [1.0, 1.5, 2.0]

results_log = []

# Limit sweep to reasonable combinations
for range_bars, buf, stop, tp1 in itertools.product(
    range_bars_list, atr_buffer_list, stop_atr_list, tp1_r_list
):
    signals = generate_signals(
        df, range_bars=range_bars,
        atr_buffer_mult=buf, stop_atr_mult=stop, tp1_r_mult=tp1,
        risk_per_trade_pct=1.0, account_balance=1000.0,
    )
    
    results = run_backtest(df, signals, slippage_bps=10, fee_bps=5, initial_balance=1000.0)
    perf = results["performance"]
    
    results_log.append({
        "range_bars": range_bars,
        "atr_buffer": buf,
        "stop_atr": stop,
        "tp1_r": tp1,
        "return_pct": perf["total_return_pct"],
        "win_rate": perf["win_rate_pct"],
        "sharpe": perf["sharpe_ratio"],
        "max_dd": perf["max_drawdown_pct"],
        "num_trades": perf["num_trades"],
        "profit_factor": perf["profit_factor"],
    })
    
    print(f"r={range_bars:2d} b={buf:.1f} s={stop:.1f} tp={tp1:.1f} → "
          f"ret={perf['total_return_pct']:>+6.1f}% wr={perf['win_rate_pct']:>4.0f}% "
          f"sharpe={perf['sharpe_ratio']:>+5.1f} dd={perf['max_drawdown_pct']:>4.1f}% "
          f"trades={perf['num_trades']:3d} pf={perf['profit_factor']:.2f}")

# Sort by Sharpe
results_log.sort(key=lambda r: r["sharpe"], reverse=True)

print(f"\n{'='*80}")
print(f"TOP 10 COMBINATIONS (by Sharpe)")
print(f"{'='*80}")
print(f"{'Rng':>4} {'Buf':>5} {'Stop':>5} {'TP1':>5} {'Return':>8} {'Win%':>6} {'Sharpe':>7} {'DD%':>6} {'N':>4} {'PF':>5}")
for r in results_log[:10]:
    print(f"{r['range_bars']:>4d} {r['atr_buffer']:>5.1f} {r['stop_atr']:>5.1f} {r['tp1_r']:>5.1f} "
          f"{r['return_pct']:>+7.1f}% {r['win_rate']:>5.0f}% {r['sharpe']:>+6.1f} "
          f"{r['max_dd']:>5.1f}% {r['num_trades']:>4d} {r['profit_factor']:>5.2f}")

print(f"\n{'='*80}")
print(f"WORST 5 COMBINATIONS")
print(f"{'='*80}")
for r in results_log[-5:]:
    print(f"{r['range_bars']:>4d} {r['atr_buffer']:>5.1f} {r['stop_atr']:>5.1f} {r['tp1_r']:>5.1f} "
          f"{r['return_pct']:>+7.1f}% {r['win_rate']:>5.0f}% {r['sharpe']:>+6.1f} "
          f"{r['max_dd']:>5.1f}% {r['num_trades']:>4d} {r['profit_factor']:>5.2f}")

# Save full results
with open("data/parameter_sweep.json", "w") as f:
    json.dump(results_log, f, indent=2)
print(f"\nFull sweep saved to data/parameter_sweep.json")
