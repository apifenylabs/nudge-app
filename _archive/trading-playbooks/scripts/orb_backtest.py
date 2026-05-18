#!/usr/bin/env python3
"""
ORB Backtest Engine — Simulates trading the ORB strategy over historical data.

Usage:
    python3 orb_backtest.py --input data.csv --signals signals.json --output backtest_results.json

Or generate signals on the fly:
    python3 orb_backtest.py --input data.csv --output results.json [--range_bars 15]

Output: backtest metrics + equity curve + trade log.
"""
import argparse
import json
import sys
from pathlib import Path
from typing import Optional

import numpy as np
import pandas as pd

# Import from sibling module
sys.path.insert(0, str(Path(__file__).parent))
from orb_signal import load_ohlcv, generate_signals, calculate_atr


def run_backtest(
    df: pd.DataFrame,
    signals: list,
    slippage_bps: float = 10.0,  # 0.1%
    fee_bps: float = 5.0,       # 0.05%
    compounding: bool = False,
    initial_balance: float = 1000.0,
) -> dict:
    """
    Run a backtest of ORB signals against historical OHLCV data.
    
    For each signal, scans forward through price data to find:
    - Trigger (price hits entry level)
    - Stop loss hit
    - Take profit 1 hit (close 50% of position)
    - Take profit 2 hit (close remaining 50%)
    
    Returns performance metrics, equity curve, and trade log.
    """
    # Index data by date for fast lookup
    df = df.copy()
    df["timestamp"] = pd.to_datetime(df["timestamp"])
    
    # Organize signals by date (handle both "date" and "timestamp" fields)
    signals_by_date = {}
    for s in signals:
        raw = s.get("date", s.get("timestamp", s.get("bar_index", "unknown")))
        day_str = str(raw)[:10]
        if day_str not in signals_by_date:
            signals_by_date[day_str] = []
        signals_by_date[day_str].append(s)
    
    trades = []
    equity_curve = []
    balance = initial_balance
    max_balance = initial_balance
    peak = initial_balance
    
    for date_str, day_signals in sorted(signals_by_date.items()):
        # Filter data for this date
        day_data = df[df["timestamp"].dt.date == pd.Timestamp(date_str).date()]
        if day_data.empty:
            continue
        
        day_highs = day_data["high"].values
        day_lows = day_data["low"].values
        day_opens = day_data["open"].values
        day_closes = day_data["close"].values
        
        for sig in day_signals:
            side = sig["side"]
            entry = sig["entry_price"]
            stop = sig["stop_loss"]
            tp1 = sig["take_profit_1"]
            tp2 = sig["take_profit_2"]
            
            position_size = sig["position_size"]
            risk_amount = sig.get("risk_amount", balance * 0.01)
            
            if position_size <= 0:
                continue
            
            # Trade tracking
            trade = {
                "date": date_str,
                "side": side,
                "entry": None,
                "exit": None,
                "pnl": 0.0,
                "pnl_pct": 0.0,
                "bars_held": 0,
                "exit_reason": "EXPIRED",
                "partial_tp1": False,
            }
            
            # Check if entry is triggered intraday
            triggered = False
            for i in range(len(day_data)):
                if side == "BUY":
                    if day_highs[i] >= entry:
                        # Triggered — fill at entry with slippage
                        triggered = True
                        fill_price = entry * (1 + slippage_bps / 10000)
                        trade["entry"] = round(fill_price, 4)
                        trade["entry_bar"] = i
                        
                        # Scan forward for exit
                        remaining_qty = position_size
                        for j in range(i, len(day_data)):
                            # Check stop loss
                            if day_lows[j] <= stop:
                                # Fill at stop (or lower if gap)
                                fill = min(stop, day_opens[j]) if j > i else stop
                                fill = fill * (1 - slippage_bps / 10000)
                                pnl = (fill - fill_price) * remaining_qty
                                trade["pnl"] += pnl
                                trade["exit"] = round(fill, 4)
                                trade["bars_held"] = j - i
                                trade["exit_reason"] = "STOP_LOSS"
                                break
                            
                            # Check TP1 (close 50%)
                            if day_highs[j] >= tp1 and not trade["partial_tp1"]:
                                half_qty = remaining_qty * 0.5
                                fill = min(tp1, day_highs[j])
                                fill = fill * (1 - slippage_bps / 10000)
                                pnl = (fill - fill_price) * half_qty
                                trade["pnl"] += pnl
                                remaining_qty -= half_qty
                                trade["partial_tp1"] = True
                                trade["tp1_fill"] = round(fill, 4)
                            
                            # Check TP2 (close remaining)
                            if day_highs[j] >= tp2 and trade["partial_tp1"]:
                                fill = min(tp2, day_highs[j])
                                fill = fill * (1 - slippage_bps / 10000)
                                pnl = (fill - fill_price) * remaining_qty
                                trade["pnl"] += pnl
                                trade["exit"] = round(fill, 4)
                                trade["bars_held"] = j - i
                                trade["exit_reason"] = "FULL_TP"
                                remaining_qty = 0
                                break
                            
                            # End of day — close remaining position
                            if j == len(day_data) - 1 and remaining_qty > 0:
                                fill = day_closes[j] * (1 - slippage_bps / 10000)
                                pnl = (fill - fill_price) * remaining_qty
                                trade["pnl"] += pnl
                                trade["exit"] = round(fill, 4)
                                trade["bars_held"] = j - i
                                trade["exit_reason"] = "EOD_CLOSE"
                                remaining_qty = 0
                        
                        # Apply fees
                        fees = abs(trade["pnl"]) * fee_bps / 10000
                        trade["pnl"] -= fees
                        trade["fees"] = round(fees, 4)
                        
                        break
                
                else:  # SELL
                    if day_lows[i] <= entry:
                        triggered = True
                        fill_price = entry * (1 - slippage_bps / 10000)
                        trade["entry"] = round(fill_price, 4)
                        trade["entry_bar"] = i
                        
                        remaining_qty = position_size
                        for j in range(i, len(day_data)):
                            if day_highs[j] >= stop:
                                fill = max(stop, day_opens[j]) if j > i else stop
                                fill = fill * (1 + slippage_bps / 10000)
                                pnl = (fill_price - fill) * remaining_qty
                                trade["pnl"] += pnl
                                trade["exit"] = round(fill, 4)
                                trade["bars_held"] = j - i
                                trade["exit_reason"] = "STOP_LOSS"
                                break
                            
                            if day_lows[j] <= tp1 and not trade["partial_tp1"]:
                                half_qty = remaining_qty * 0.5
                                fill = max(tp1, day_lows[j])
                                fill = fill * (1 + slippage_bps / 10000)
                                pnl = (fill_price - fill) * half_qty
                                trade["pnl"] += pnl
                                remaining_qty -= half_qty
                                trade["partial_tp1"] = True
                                trade["tp1_fill"] = round(fill, 4)
                            
                            if day_lows[j] <= tp2 and trade["partial_tp1"]:
                                fill = max(tp2, day_lows[j])
                                fill = fill * (1 + slippage_bps / 10000)
                                pnl = (fill_price - fill) * remaining_qty
                                trade["pnl"] += pnl
                                trade["exit"] = round(fill, 4)
                                trade["bars_held"] = j - i
                                trade["exit_reason"] = "FULL_TP"
                                remaining_qty = 0
                                break
                            
                            if j == len(day_data) - 1 and remaining_qty > 0:
                                fill = day_closes[j] * (1 + slippage_bps / 10000)
                                pnl = (fill_price - fill) * remaining_qty
                                trade["pnl"] += pnl
                                trade["exit"] = round(fill, 4)
                                trade["bars_held"] = j - i
                                trade["exit_reason"] = "EOD_CLOSE"
                                remaining_qty = 0
                        
                        fees = abs(trade["pnl"]) * fee_bps / 10000
                        trade["pnl"] -= fees
                        trade["fees"] = round(fees, 4)
                        
                        break
            
            if not triggered:
                trade["exit_reason"] = "NOT_TRIGGERED"
            
            if trade["entry"] is not None:
                trade["pnl"] = round(trade["pnl"], 2)
                trade["pnl_pct"] = round(trade["pnl"] / max(balance, 1) * 100, 2)
                balance += trade["pnl"]
                
                # Tax partial TP1 closure as a win if net positive
                if trade["partial_tp1"]:
                    trade["result"] = "WIN"
                elif trade["pnl"] > 0:
                    trade["result"] = "WIN"
                elif trade["pnl"] == 0:
                    trade["result"] = "BREAK_EVEN"
                else:
                    trade["result"] = "LOSS"
            else:
                trade["result"] = "SKIPPED"
            
            trades.append(trade)
            
            # Track equity
            equity_curve.append({
                "date": date_str,
                "balance": round(balance, 2),
                "side": side,
                "pnl": trade["pnl"],
            })
            
            max_balance = max(max_balance, balance)
            peak = max(peak, balance)
    
    # Calculate metrics
    total_return = ((balance - initial_balance) / initial_balance) * 100
    winning_trades = [t for t in trades if t["result"] == "WIN" and t["entry"] is not None]
    losing_trades = [t for t in trades if t["result"] == "LOSS"]
    skipped_trades = [t for t in trades if t["result"] == "SKIPPED"]
    
    num_trades = len([t for t in trades if t["entry"] is not None])
    win_rate = len(winning_trades) / max(num_trades, 1) * 100
    
    avg_win = np.mean([t["pnl"] for t in winning_trades]) if winning_trades else 0
    avg_loss = np.mean([t["pnl"] for t in losing_trades]) if losing_trades else 0
    
    # Sharpe ratio (daily returns)
    daily_pnls = [t["pnl"] for t in trades if t["entry"] is not None]
    if len(daily_pnls) > 1:
        sharpe = np.mean(daily_pnls) / max(np.std(daily_pnls), 1e-10) * np.sqrt(252)
    else:
        sharpe = 0.0
    
    # Profit factor
    gross_profit = sum(t["pnl"] for t in winning_trades)
    gross_loss = abs(sum(t["pnl"] for t in losing_trades))
    profit_factor = gross_profit / max(gross_loss, 1e-10)
    
    # Max drawdown
    peak_balance = initial_balance
    max_dd = 0.0
    for eq in equity_curve:
        peak_balance = max(peak_balance, eq["balance"])
        dd = (peak_balance - eq["balance"]) / peak_balance * 100
        max_dd = max(max_dd, dd)
    
    results = {
        "strategy": "ORB",
        "parameters": {
            "initial_balance": initial_balance,
            "slippage_bps": slippage_bps,
            "fee_bps": fee_bps,
            "compounding": compounding,
        },
        "performance": {
            "total_return_pct": round(total_return, 2),
            "final_balance": round(balance, 2),
            "num_trades": num_trades,
            "num_skipped": len(skipped_trades),
            "win_rate_pct": round(win_rate, 1),
            "avg_win": round(avg_win, 2),
            "avg_loss": round(avg_loss, 2),
            "profit_factor": round(profit_factor, 2),
            "sharpe_ratio": round(sharpe, 2),
            "max_drawdown_pct": round(max_dd, 2),
        },
        "trades": trades,
        "equity_curve": equity_curve,
    }
    
    return results


def main():
    parser = argparse.ArgumentParser(description="ORB Backtest Engine")
    parser.add_argument("--input", "-i", required=True, help="OHLCV CSV or JSON file")
    parser.add_argument("--signals", "-s", default=None, help="Pre-generated signals JSON (optional)")
    parser.add_argument("--output", "-o", default="orb_backtest_results.json", help="Output JSON path")
    parser.add_argument("--range_bars", type=int, default=15, help="Opening range window (bars)")
    parser.add_argument("--balance", type=float, default=1000.0, help="Initial account balance")
    parser.add_argument("--risk_pct", type=float, default=1.0, help="Risk per trade %")
    parser.add_argument("--slippage", type=float, default=10.0, help="Slippage in basis points")
    parser.add_argument("--fee", type=float, default=5.0, help="Fee in basis points per trade")
    
    args = parser.parse_args()
    
    print(f"Loading data from {args.input}...")
    df = load_ohlcv(args.input)
    print(f"Loaded {len(df)} bars")
    
    if args.signals:
        print(f"Loading signals from {args.signals}...")
        signals = json.loads(Path(args.signals).read_text())
    else:
        print("Generating signals from data...")
        signals = generate_signals(
            df,
            range_bars=args.range_bars,
            risk_per_trade_pct=args.risk_pct,
            account_balance=args.balance,
        )
    
    print(f"Running backtest with {len(signals)} signals ({len(signals)//2} trading days)...")
    results = run_backtest(
        df, signals,
        slippage_bps=args.slippage,
        fee_bps=args.fee,
        initial_balance=args.balance,
    )
    
    with open(args.output, "w") as f:
        json.dump(results, f, indent=2)
    
    perf = results["performance"]
    print(f"\n{'='*50}")
    print(f"ORB BACKTEST RESULTS")
    print(f"{'='*50}")
    print(f"Total Return:        {perf['total_return_pct']:>+8.2f}%")
    print(f"Final Balance:       ${perf['final_balance']:>8.2f}")
    print(f"Num Trades:          {perf['num_trades']:>8d}")
    print(f"Win Rate:            {perf['win_rate_pct']:>8.1f}%")
    print(f"Avg Win:             ${perf['avg_win']:>8.2f}")
    print(f"Avg Loss:            ${perf['avg_loss']:>8.2f}")
    print(f"Profit Factor:       {perf['profit_factor']:>8.2f}")
    print(f"Sharpe Ratio:        {perf['sharpe_ratio']:>8.2f}")
    print(f"Max Drawdown:        {perf['max_drawdown_pct']:>8.2f}%")
    print(f"{'='*50}")
    print(f"Full results written to {args.output}")


if __name__ == "__main__":
    main()
