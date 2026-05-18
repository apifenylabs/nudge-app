#!/usr/bin/env python3
"""Run ORB backtest on BTCUSDT 1h data with standard params."""
import sys, os, json
from pathlib import Path

sys.path.insert(0, "/home/captain/.openclaw/workspace/trading-playbooks/scripts")
os.chdir("/home/captain/.openclaw/workspace/trading-playbooks")

from orb_signal import load_ohlcv, generate_signals
from orb_backtest import run_backtest

DATA = "/home/captain/.openclaw/workspace/trading-playbooks/data/BTCUSDT_1h_90d.csv"
BALANCE = 1000.0
RISK_PCT = 1.0
RANGE_BARS = 6
SLIPPAGE = 10  # bps
FEE = 5  # bps

print(f"Loading {DATA}...")
df = load_ohlcv(DATA)
print(f"Loaded {len(df)} bars")

print(f"ORB signals: range={RANGE_BARS}h, risk={RISK_PCT}%, balance=${BALANCE:.0f}")
signals = generate_signals(df, range_bars=RANGE_BARS, risk_per_trade_pct=RISK_PCT, account_balance=BALANCE)
print(f"Generated {len(signals)} signals ({len(signals)//2} trading days)")

with open("data/BTCUSDT_signals.json", "w") as f:
    json.dump(signals, f, indent=2)

print(f"Backtest: slippage={SLIPPAGE}bp, fee={FEE}bp")
results = run_backtest(df, signals, slippage_bps=SLIPPAGE, fee_bps=FEE, initial_balance=BALANCE)

with open("data/BTCUSDT_backtest.json", "w") as f:
    json.dump(results, f, indent=2)

perf = results["performance"]
print(f"\n{'='*55}")
print(f"  ORB BACKTEST — BTCUSDT 1h | 90 days")
print(f"{'='*55}")
print(f"  Total Return:     {perf['total_return_pct']:>+8.2f}%")
print(f"  Final Balance:    ${perf['final_balance']:>8.2f}")
print(f"  Num Trades:       {perf['num_trades']:>8d}")
print(f"  Win Rate:         {perf['win_rate_pct']:>8.1f}%")
print(f"  Avg Win:          ${perf['avg_win']:>8.2f}")
print(f"  Avg Loss:         ${perf['avg_loss']:>8.2f}")
print(f"  Profit Factor:    {perf['profit_factor']:>8.2f}")
print(f"  Sharpe Ratio:     {perf['sharpe_ratio']:>8.2f}")
print(f"  Max Drawdown:     {perf['max_drawdown_pct']:>8.2f}%")
print(f"{'='*55}")

if perf["sharpe_ratio"] >= 1.0 and perf["win_rate_pct"] > 40 and perf["max_drawdown_pct"] < 15:
    print(f"  ✅ Passes validation thresholds")
else:
    print(f"  ⚠️  Below thresholds")
    if perf["sharpe_ratio"] < 1.0:
        print(f"     - Sharpe {perf['sharpe_ratio']:.1f} < 1.0")
    if perf["win_rate_pct"] <= 40:
        print(f"     - Win rate {perf['win_rate_pct']:.1f}% <= 40%")
    if perf["max_drawdown_pct"] >= 15:
        print(f"     - Max DD {perf['max_drawdown_pct']:.1f}% >= 15%")
print(f"{'='*55}")
