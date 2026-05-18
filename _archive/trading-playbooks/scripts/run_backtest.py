#!/usr/bin/env python3
"""
Run full ORB backtest pipeline:
1. Generate signals from OHLCV data
2. Run backtest simulation
3. Output results + summary

Usage:
    python3 run_backtest.py --data data/BTCUSDT_1h_90d.csv [--range_bars 15] [--output results]
"""
import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from orb_signal import load_ohlcv, generate_signals
from orb_backtest import run_backtest


def main():
    parser = argparse.ArgumentParser(description="Run complete ORB backtest pipeline")
    parser.add_argument("--data", "-d", required=True, help="OHLCV CSV/JSON input")
    parser.add_argument("--output", "-o", default=None, help="Output file prefix")
    parser.add_argument("--range_bars", type=int, default=6, help="Opening range in bars (default 6 for hourly = 6h range)")
    parser.add_argument("--atr_period", type=int, default=14)
    parser.add_argument("--balance", type=float, default=1000.0)
    parser.add_argument("--risk_pct", type=float, default=1.0)
    parser.add_argument("--slippage", type=float, default=10.0, help="Slippage bps")
    parser.add_argument("--fee", type=float, default=5.0, help="Fee bps")
    
    args = parser.parse_args()
    
    prefix = args.output or Path(args.data).stem
    
    print(f"Loading {args.data}...")
    df = load_ohlcv(args.data)
    print(f"Loaded {len(df)} bars")
    
    print(f"Generating ORB signals (range={args.range_bars}h, ATR={args.atr_period})...")
    signals = generate_signals(
        df,
        range_bars=args.range_bars,
        atr_period=args.atr_period,
        risk_per_trade_pct=args.risk_pct,
        account_balance=args.balance,
    )
    print(f"Generated {len(signals)} signals ({len(signals)//2} trading days)")
    
    # Save signals
    sig_path = f"{prefix}_signals.json"
    with open(sig_path, "w") as f:
        json.dump(signals, f, indent=2)
    print(f"Signals saved to {sig_path}")
    
    print(f"Running backtest (slippage={args.slippage}bp, fee={args.fee}bp)...")
    results = run_backtest(
        df, signals,
        slippage_bps=args.slippage,
        fee_bps=args.fee,
        initial_balance=args.balance,
    )
    
    # Save results
    res_path = f"{prefix}_backtest.json"
    with open(res_path, "w") as f:
        json.dump(results, f, indent=2)
    print(f"Results saved to {res_path}")
    
    # Print summary
    perf = results["performance"]
    print(f"\n{'='*55}")
    print(f"  ORB BACKTEST — {Path(args.data).stem}")
    print(f"{'='*55}")
    print(f"  Period:           {args.range_bars}h opening range")
    print(f"  Balance:          ${args.balance:.2f}")
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
    
    # Assessment
    if perf["sharpe_ratio"] >= 1.0 and perf["win_rate_pct"] > 40 and perf["max_drawdown_pct"] < 15:
        print(f"  ✅ Passes validation thresholds! Ready for paper trading.")
    else:
        print(f"  ⚠️  Does not meet all thresholds:")
        if perf["sharpe_ratio"] < 1.0:
            print(f"     - Sharpe {perf['sharpe_ratio']:.1f} < 1.0")
        if perf["win_rate_pct"] <= 40:
            print(f"     - Win rate {perf['win_rate_pct']:.1f}% <= 40%")
        if perf["max_drawdown_pct"] >= 15:
            print(f"     - Max DD {perf['max_drawdown_pct']:.1f}% >= 15%")
        print(f"  Consider tuning range_bars, atr_period, or atr_buffer_mult.")
    print(f"{'='*55}")


if __name__ == "__main__":
    main()
