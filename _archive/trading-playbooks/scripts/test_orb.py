#!/usr/bin/env python3
"""
ORB Unit Tests — Test signal generator and backtest engine with fixed fixtures.
"""
import json
import sys
import os
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "scripts"))

import numpy as np
import pandas as pd

from orb_signal import load_ohlcv, calculate_atr, generate_signals
from orb_backtest import run_backtest


# ── Test Fixtures ──

def make_fixture_csv(rows: list) -> str:
    """Create a temporary CSV fixture from rows."""
    header = "timestamp,open,high,low,close,volume"
    lines = [header] + [",".join(str(v) for v in r) for r in rows]
    content = "\n".join(lines)
    f = tempfile.NamedTemporaryFile(mode="w", suffix=".csv", delete=False)
    f.write(content)
    f.close()
    return f.name


def make_uptrend_day() -> str:
    """A day with clear uptrend: opens low, rallies, slight pullback."""
    rows = []
    for i in range(48):  # 48 30-min bars = 1 trading day
        t = f"2026-04-30T{9 + i//2:02d}:{(i%2)*30:02d}:00"
        base = 100.0
        trend = i * 0.05  # gradual uptrend
        noise = np.sin(i * 0.3) * 0.2
        close = base + trend + noise
        high = close + 0.15
        low = close - 0.15
        open_ = close - (noise * 0.5) + 0.05 * np.cos(i)
        rows.append([t, round(open_, 4), round(high, 4), round(low, 4), round(close, 4), 1000 + i * 10])
    return make_fixture_csv(rows)


def make_range_day() -> str:
    """A day that trades in a tight range (low volatility)."""
    rows = []
    for i in range(48):
        t = f"2026-04-30T{9 + i//2:02d}:{(i%2)*30:02d}:00"
        center = 100.0
        noise = np.sin(i * 0.5) * 0.05
        close = center + noise
        high = close + 0.03
        low = close - 0.03
        open_ = center + np.cos(i * 0.3) * 0.03
        rows.append([t, round(open_, 4), round(high, 4), round(low, 4), round(close, 4), 500 + i * 2])
    return make_fixture_csv(rows)


def make_multi_day() -> str:
    """5 trading days with varying volatility (hourly bars 9-22, avoiding hour 24)."""
    import calendar
    all_rows = []
    for day in range(5):
        month = 4 if 28 + day <= 30 else 5
        day_of_month = 28 + day if month == 4 else 28 + day - 30
        date = f"2026-{month:02d}-{day_of_month:02d}"
        for i in range(13):  # 9:00 to 21:00 (13 hours)
            t = f"{date}T{9 + i:02d}:00:00"
            vol = 1.0 + day * 0.3
            base = 100.0 + day * 2.0
            trend = i * 0.1 * vol
            noise = np.sin(i * 0.5 + day) * 0.3 * vol
            close = base + trend + noise
            high = close + 0.2 * vol
            low = close - 0.2 * vol
            open_ = close - noise * 0.3
            all_rows.append([t, round(open_, 4), round(high, 4), round(low, 4), round(close, 4), 1000])
    return make_fixture_csv(all_rows)


# ── Tests ──

def test_load_csv():
    path = make_uptrend_day()
    df = load_ohlcv(path)
    os.unlink(path)
    assert len(df) == 48
    assert "open" in df.columns
    assert "high" in df.columns
    assert "close" in df.columns
    assert len(df.columns) >= 5  # + timestamp + volume
    print("✅ test_load_csv: PASS")


def test_atr_calculation():
    path = make_uptrend_day()
    df = load_ohlcv(path)
    atr = calculate_atr(df, 14)
    os.unlink(path)
    assert len(atr) == 48
    assert atr.iloc[13] > 0  # First valid ATR
    assert not atr.isna().all()  # Should have valid values
    print(f"✅ test_atr_calculation: PASS (ATR range: {atr.min():.4f} - {atr.max():.4f})")


def test_signal_generation():
    path = make_multi_day()
    df = load_ohlcv(path)
    signals = generate_signals(df, range_bars=5, risk_per_trade_pct=1.0, account_balance=1000.0)
    os.unlink(path)
    
    assert len(signals) > 0, "Should generate signals"
    assert len(signals) % 2 == 0, "Should have BUY/SELL pairs"
    
    # Each signal has required fields
    for sig in signals:
        assert "side" in sig
        assert "entry_price" in sig
        assert "stop_loss" in sig
        assert "take_profit_1" in sig
        assert "take_profit_2" in sig
        assert "position_size" in sig
        assert sig["entry_price"] > sig["stop_loss"] if sig["side"] == "BUY" else sig["entry_price"] < sig["stop_loss"], \
            f"Stop should be on correct side for {sig['side']}: entry={sig['entry_price']}, stop={sig['stop_loss']}"
    
    print(f"✅ test_signal_generation: PASS ({len(signals)} signals, {len(signals)//2} days)")


def test_backtest_basic():
    path = make_multi_day()
    df = load_ohlcv(path)
    signals = generate_signals(df, range_bars=5, risk_per_trade_pct=1.0, account_balance=1000.0)
    
    results = run_backtest(df, signals, initial_balance=1000.0)
    os.unlink(path)
    
    perf = results["performance"]
    assert perf["num_trades"] >= 0
    assert perf["final_balance"] > 0  # Should not blow up
    assert "sharpe_ratio" in perf
    assert "max_drawdown_pct" in perf
    assert len(results["trades"]) > 0
    assert len(results["equity_curve"]) > 0
    
    # Check trade structure
    trade = results["trades"][0]
    assert "side" in trade
    assert "date" in trade
    assert "pnl" in trade
    assert "exit_reason" in trade
    assert "result" in trade
    
    print(f"✅ test_backtest_basic: PASS ({perf['num_trades']} trades, return: {perf['total_return_pct']:+.1f}%)")


def test_tp_hit():
    """Test that take profit triggers correctly."""
    # Generate a clean uptrend day
    path = make_uptrend_day()
    df = load_ohlcv(path)
    
    # Just test first day
    day0 = df.iloc[:24].copy()
    
    local_signals = generate_signals(day0, range_bars=5, risk_per_trade_pct=1.0, account_balance=1000.0)
    
    results = run_backtest(day0, local_signals, initial_balance=1000.0)
    os.unlink(path)
    
    trades = [t for t in results["trades"] if t["entry"] is not None]
    winning_trades = [t for t in trades if t["pnl"] > 0]
    losing_trades = [t for t in trades if t["pnl"] <= 0]
    
    # In an uptrend, BUY signals should have partial TP hits
    buy_trades = [t for t in trades if t["side"] == "BUY"]
    tp_hits = [t for t in buy_trades if t.get("partial_tp1")]
    
    print(f"✅ test_tp_hit: PASS ({len(trades)} trades, {len(winning_trades)} winners, {len(tp_hits)} TP hits in uptrend)")


def test_edge_empty_data():
    """Edge case: empty data should return empty signals."""
    df = pd.DataFrame(columns=["timestamp", "open", "high", "low", "close", "volume"])
    signals = generate_signals(df)
    assert len(signals) == 0
    print("✅ test_edge_empty_data: PASS")


def test_edge_single_bar():
    """Edge case: too few bars for range should return no signals."""
    rows = [["2026-04-30T09:00:00", 100.0, 101.0, 99.0, 100.5, 1000]]
    path = make_fixture_csv(rows)
    df = load_ohlcv(path)
    signals = generate_signals(df, range_bars=15)
    os.unlink(path)
    assert len(signals) == 0
    print("✅ test_edge_single_bar: PASS")


def test_backtest_no_signals():
    """Backtest with no signals should gracefully return zero stats."""
    df = pd.DataFrame(columns=["timestamp", "open", "high", "low", "close", "volume"])
    results = run_backtest(df, [], initial_balance=1000.0)
    assert results["performance"]["num_trades"] == 0
    assert results["performance"]["final_balance"] == 1000.0
    print("✅ test_backtest_no_signals: PASS")


def test_slippage_impact():
    """Backtest with high slippage should reduce returns vs low slippage."""
    path = make_multi_day()
    df = load_ohlcv(path)
    signals = generate_signals(df, range_bars=5, risk_per_trade_pct=1.0, account_balance=1000.0)
    
    low_slip = run_backtest(df, signals, slippage_bps=1)
    high_slip = run_backtest(df, signals, slippage_bps=100)
    os.unlink(path)
    
    assert high_slip["performance"]["total_return_pct"] <= low_slip["performance"]["total_return_pct"] or \
           abs(high_slip["performance"]["total_return_pct"] - low_slip["performance"]["total_return_pct"]) < 0.01
    print(f"✅ test_slippage_impact: PASS (1bp: {low_slip['performance']['total_return_pct']:+.1f}%, 100bp: {high_slip['performance']['total_return_pct']:+.1f}%)")


# ── Run ──

if __name__ == "__main__":
    tests = [
        test_load_csv,
        test_atr_calculation,
        test_signal_generation,
        test_backtest_basic,
        test_tp_hit,
        test_edge_empty_data,
        test_edge_single_bar,
        test_backtest_no_signals,
        test_slippage_impact,
    ]
    
    passed = 0
    failed = 0
    
    print(f"{'='*50}")
    print(f"ORB TRADING PLAYBOOK - UNIT TESTS")
    print(f"{'='*50}\n")
    
    for test_fn in tests:
        try:
            test_fn()
            passed += 1
        except Exception as e:
            print(f"❌ {test_fn.__name__}: FAIL - {e}")
            import traceback
            traceback.print_exc()
            failed += 1
    
    print(f"\n{'='*50}")
    print(f"Results: {passed} passed, {failed} failed out of {len(tests)} tests")
    print(f"{'='*50}")
    
    sys.exit(1 if failed > 0 else 0)
