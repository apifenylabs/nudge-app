#!/usr/bin/env python3
"""
Multi-day Backtest Engine — Holds positions across days until stop/TP hit.

This is a new backtester designed for TendersAlt (positions may last days/weeks).
Reuses the same signal format but with multi-day position management.

Usage:
    from tendersalt_backtest import run_backtest_multiday
"""
import json
from typing import Optional
from pathlib import Path

import numpy as np
import pandas as pd


def run_backtest_multiday(
    df: pd.DataFrame,
    signals: list,
    slippage_bps: float = 10.0,
    fee_bps: float = 5.0,
    initial_balance: float = 1000.0,
    max_days_hold: int = 30,
) -> dict:
    """
    Run a multi-day backtest where positions stay open until:
    - Stop loss hit
    - Take profit hit (TP1: 50%, TP2: remaining)
    - Max days expired
    - End of data
    
    Signals are sorted by bar_index/timestamp.
    Each signal opens a new position.
    """
    df = df.copy()
    df["timestamp"] = pd.to_datetime(df["timestamp"])
    
    # Sort signals by bar_index or timestamp
    def signal_sort_key(s):
        return s.get("bar_index", s.get("date", 0))
    
    signals_sorted = sorted(signals, key=signal_sort_key)
    
    highs = df["high"].values
    lows = df["low"].values
    opens = df["open"].values
    closes = df["close"].values
    
    trades = []
    equity_curve = []
    balance = initial_balance
    peak = initial_balance
    
    # Track open positions
    # (entry_bar, side, entry_price, stop, tp1, tp2, remaining_qty, filled_entry_price, partial_tp1)
    positions = []
    signal_queue = list(signals_sorted)
    next_signal_idx = 0
    
    # Pre-process: map bar index to signals
    signals_by_bar = {}
    for s in signals_sorted:
        bi = s.get("bar_index", 0)
        if bi not in signals_by_bar:
            signals_by_bar[bi] = []
        signals_by_bar[bi].append(s)
    
    for i in range(len(df)):
        # ── 1. Check for new signals at this bar ──
        new_signals = signals_by_bar.get(i, [])
        for sig in new_signals:
            side = sig["side"]
            entry = sig["entry_price"]
            stop = sig["stop_loss"]
            tp1 = sig["take_profit_1"]
            tp2 = sig["take_profit_2"]
            qty = sig["position_size"]
            
            if qty <= 0:
                continue
            
            # Fill at entry with slippage
            if side == "BUY":
                fill_price = entry * (1 + slippage_bps / 10000)
            else:
                fill_price = entry * (1 - slippage_bps / 10000)
            
            # Calculate actual position qty
            risk = abs(fill_price - stop)
            actual_qty = min(qty, (balance * 0.2) / fill_price)  # Max 20% per position
            
            if actual_qty > 0:
                positions.append({
                    "entry_bar": i,
                    "side": side,
                    "entry_price": fill_price,
                    "stop_loss": stop,
                    "take_profit_1": tp1,
                    "take_profit_2": tp2,
                    "remaining_qty": actual_qty,
                    "partial_tp1": False,
                    "entry_cost": fill_price * actual_qty,
                    "signal": sig,
                })
                balance -= fill_price * actual_qty  # Reserve capital
        
        # ── 2. Check existing positions ──
        closed_positions = []
        
        for pos in positions:
            side = pos["side"]
            entry_price = pos["entry_price"]
            stop = pos["stop_loss"]
            tp1 = pos["take_profit_1"]
            tp2 = pos["take_profit_2"]
            qty = pos["remaining_qty"]
            
            if qty <= 0:
                continue
            
            if side == "BUY":
                # Check stop loss
                if lows[i] <= stop:
                    # Stop hit — fill at stop
                    fill = stop * (1 - slippage_bps / 10000)
                    pnl = (fill - entry_price) * qty
                    balance += fill * qty
                    closed_positions.append({
                        "close_bar": i,
                        "exit_price": fill,
                        "pnl": pnl,
                        "exit_reason": "STOP_LOSS",
                        **pos,
                    })
                    pos["remaining_qty"] = 0
                    continue
                
                # Check TP1 (close 50%)
                if highs[i] >= tp1 and not pos["partial_tp1"]:
                    half_qty = qty * 0.5
                    fill = tp1 * (1 - slippage_bps / 10000)
                    pnl = (fill - entry_price) * half_qty
                    balance += fill * half_qty
                    pos["remaining_qty"] -= half_qty
                    pos["partial_tp1"] = True
                
                # Check TP2 (close remaining)
                if highs[i] >= tp2 and pos["partial_tp1"] and pos["remaining_qty"] > 0:
                    fill = tp2 * (1 - slippage_bps / 10000)
                    pnl = (fill - entry_price) * pos["remaining_qty"]
                    balance += fill * pos["remaining_qty"]
                    closed_positions.append({
                        "close_bar": i,
                        "exit_price": fill,
                        "pnl": pnl,
                        "exit_reason": "FULL_TP",
                        **pos,
                    })
                    pos["remaining_qty"] = 0
                    continue
            
            else:  # SELL
                if highs[i] >= stop:
                    fill = stop * (1 + slippage_bps / 10000)
                    pnl = (entry_price - fill) * qty
                    balance += fill * qty
                    closed_positions.append({
                        "close_bar": i,
                        "exit_price": fill,
                        "pnl": pnl,
                        "exit_reason": "STOP_LOSS",
                        **pos,
                    })
                    pos["remaining_qty"] = 0
                    continue
                
                if lows[i] <= tp1 and not pos["partial_tp1"]:
                    half_qty = qty * 0.5
                    fill = tp1 * (1 + slippage_bps / 10000)
                    pnl = (entry_price - fill) * half_qty
                    balance += fill * half_qty
                    pos["remaining_qty"] -= half_qty
                    pos["partial_tp1"] = True
                
                if lows[i] <= tp2 and pos["partial_tp1"] and pos["remaining_qty"] > 0:
                    fill = tp2 * (1 + slippage_bps / 10000)
                    pnl = (entry_price - fill) * pos["remaining_qty"]
                    balance += fill * pos["remaining_qty"]
                    closed_positions.append({
                        "close_bar": i,
                        "exit_price": fill,
                        "pnl": pnl,
                        "exit_reason": "FULL_TP",
                        **pos,
                    })
                    pos["remaining_qty"] = 0
                    continue
            
            # Check max hold days
            if i - pos["entry_bar"] >= max_days_hold * 96:  # 96 bars/day at 15m
                if pos["remaining_qty"] > 0:
                    fill = closes[i] * (1 - (slippage_bps / 10000 if side == "BUY" else -slippage_bps / 10000))
                    pnl = (fill - entry_price if side == "BUY" else entry_price - fill) * pos["remaining_qty"]
                    balance += fill * pos["remaining_qty"]
                    closed_positions.append({
                        "close_bar": i,
                        "exit_price": fill,
                        "pnl": pnl,
                        "exit_reason": "MAX_DAYS_EXPIRED",
                        **pos,
                    })
                    pos["remaining_qty"] = 0
        
        # Process closed positions into trade records
        for cp in closed_positions:
            entry_bar = cp["entry_bar"]
            close_bar = cp["close_bar"]
            side = cp["side"]
            entry_price = cp["entry_price"]
            exit_price = cp["exit_price"]
            pnl = cp["pnl"]
            total_qty = cp.get("remaining_qty", 0) + (cp.get("partial_tp1", False) and cp["remaining_qty"] > 0)
            trade = {
                "date": str(df["timestamp"].iloc[entry_bar])[:10],
                "entry_date": str(df["timestamp"].iloc[entry_bar]),
                "exit_date": str(df["timestamp"].iloc[close_bar]),
                "side": side,
                "entry": round(entry_price, 4),
                "exit": round(exit_price, 4),
                "pnl": round(pnl, 2),
                "pnl_pct": round(pnl / max(balance - pnl, 1) * 100, 2),
                "bars_held": close_bar - entry_bar,
                "exit_reason": cp["exit_reason"],
                "partial_tp1": cp.get("partial_tp1", False),
            }
            
            # Apply fees
            fees = abs(pnl) * fee_bps / 10000
            pnl_after_fees = pnl - fees
            trade["pnl"] = round(pnl_after_fees, 2)
            
            if pnl_after_fees > 0:
                trade["result"] = "WIN"
            elif pnl_after_fees == 0:
                trade["result"] = "BREAK_EVEN"
            else:
                trade["result"] = "LOSS"
            
            trades.append(trade)
            
            # Equity update
            equity_curve.append({
                "date": str(df["timestamp"].iloc[close_bar]),
                "balance": round(balance, 2),
                "side": side,
                "pnl": round(pnl_after_fees, 2),
            })
            
            peak = max(peak, balance)
        
        # EOD close for remaining positions (if any at last bar)
        if i == len(df) - 1:
            for pos in positions:
                if pos["remaining_qty"] > 0:
                    side = pos["side"]
                    entry_price = pos["entry_price"]
                    fill = closes[i] * (1 - (slippage_bps / 10000 if side == "BUY" else -slippage_bps / 10000))
                    pnl = (fill - entry_price if side == "BUY" else entry_price - fill) * pos["remaining_qty"]
                    balance += fill * pos["remaining_qty"]
                    fees = abs(pnl) * fee_bps / 10000
                    pnl -= fees
                    
                    trades.append({
                        "date": str(df["timestamp"].iloc[pos["entry_bar"]])[:10],
                        "entry_date": str(df["timestamp"].iloc[pos["entry_bar"]]),
                        "exit_date": str(df["timestamp"].iloc[i]),
                        "side": side,
                        "entry": round(entry_price, 4),
                        "exit": round(fill, 4),
                        "pnl": round(pnl, 2),
                        "pnl_pct": round(pnl / max(balance - pnl, 1) * 100, 2),
                        "bars_held": i - pos["entry_bar"],
                        "exit_reason": "EOD_FORCE_CLOSE",
                        "partial_tp1": pos.get("partial_tp1", False),
                        "result": "WIN" if pnl > 0 else ("LOSS" if pnl < 0 else "BREAK_EVEN"),
                    })
                    pos["remaining_qty"] = 0
    
    # Post-process metrics
    total_return = ((balance - initial_balance) / initial_balance) * 100
    winning_trades = [t for t in trades if t["result"] == "WIN"]
    losing_trades = [t for t in trades if t["result"] == "LOSS"]
    
    num_trades = len(trades)
    win_rate = len(winning_trades) / max(num_trades, 1) * 100
    
    avg_win = np.mean([t["pnl"] for t in winning_trades]) if winning_trades else 0
    avg_loss = np.mean([t["pnl"] for t in losing_trades]) if losing_trades else 0
    
    # Sharpe
    daily_pnls = [t["pnl"] for t in trades]
    if len(daily_pnls) > 1:
        sharpe = np.mean(daily_pnls) / max(np.std(daily_pnls), 1e-10) * np.sqrt(252)
    else:
        sharpe = 0.0
    
    gross_profit = sum(t["pnl"] for t in winning_trades)
    gross_loss = abs(sum(t["pnl"] for t in losing_trades))
    profit_factor = gross_profit / max(gross_loss, 1e-10)
    
    # Max drawdown from equity curve
    peak_bal = initial_balance
    max_dd = 0.0
    for eq in equity_curve:
        peak_bal = max(peak_bal, eq["balance"])
        dd = (peak_bal - eq["balance"]) / peak_bal * 100
        max_dd = max(max_dd, dd)
    
    results = {
        "strategy": "TENDERSALT_FIB",
        "parameters": {
            "initial_balance": initial_balance,
            "slippage_bps": slippage_bps,
            "fee_bps": fee_bps,
            "max_days_hold": max_days_hold,
        },
        "performance": {
            "total_return_pct": round(total_return, 2),
            "final_balance": round(balance, 2),
            "num_trades": num_trades,
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
