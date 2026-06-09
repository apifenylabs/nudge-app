"""Tests for risk_controls module."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from execution.risk_controls import RiskManager


def test_initial_state():
    rm = RiskManager(initial_balance=800.0)
    status = rm.get_status()
    assert status["balance"] == 800.0
    assert status["peak"] == 800.0
    assert status["kill_switch_active"] is False


def test_approve_small_trade():
    rm = RiskManager(initial_balance=800.0)
    allowed, reason = rm.check_trade("EUR.USD", "BUY", 20.0)
    assert allowed, f"Trade should be allowed: {reason}"


def test_block_oversized_trade():
    rm = RiskManager(initial_balance=800.0)
    # 3% of 800 = $24 max
    allowed, reason = rm.check_trade("EUR.USD", "BUY", 100.0)
    assert not allowed, "Trade should be blocked (exceeds 3% risk)"


def test_max_positions():
    rm = RiskManager(initial_balance=800.0)
    # Simulate 3 positions already open
    rm.set_open_positions([
        {"symbol": "EUR.USD", "quantity": 10000, "unrealized_pnl": 5.0},
        {"symbol": "GBP.USD", "quantity": 10000, "unrealized_pnl": -3.0},
        {"symbol": "USD.JPY", "quantity": 10000, "unrealized_pnl": 2.0},
    ])
    allowed, reason = rm.check_trade("AUD.USD", "BUY", 20.0)
    assert not allowed, "Trade should be blocked (max 3 positions)"


def test_kill_switch():
    rm = RiskManager(initial_balance=800.0)
    rm.update_balance(560.0)  # -30% from 800
    allowed, reason = rm.check_trade("EUR.USD", "BUY", 10.0)
    assert not allowed, "Trade should be blocked (kill switch)"


def test_daily_loss_limit():
    rm = RiskManager(initial_balance=800.0)
    rm.record_trade_pnl(-50.0)  # -6.25% > -6% limit
    allowed, reason = rm.check_trade("EUR.USD", "BUY", 10.0)
    assert not allowed, "Trade should be blocked (daily loss limit)"


def test_weekly_loss_limit():
    rm = RiskManager(initial_balance=800.0)
    rm.record_trade_pnl(-100.0)  # -12.5% > -12% limit
    allowed, reason = rm.check_trade("EUR.USD", "BUY", 10.0)
    assert not allowed, "Trade should be blocked (weekly loss limit)"


def test_portfolio_risk_cap():
    rm = RiskManager(initial_balance=800.0)
    # Max portfolio risk = 10% = $80
    # Existing positions with -$70 unrealized loss
    rm.set_open_positions([
        {"symbol": "EUR.USD", "quantity": 10000, "unrealized_pnl": -70.0},
    ])
    # Adding a $20 risk trade = $90 total > $80 limit
    allowed, reason = rm.check_trade("GBP.USD", "BUY", 20.0)
    assert not allowed, "Trade should be blocked (portfolio risk cap)"


if __name__ == "__main__":
    test_initial_state()
    print("✅ test_initial_state")
    test_approve_small_trade()
    print("✅ test_approve_small_trade")
    test_block_oversized_trade()
    print("✅ test_block_oversized_trade")
    test_max_positions()
    print("✅ test_max_positions")
    test_kill_switch()
    print("✅ test_kill_switch")
    test_daily_loss_limit()
    print("✅ test_daily_loss_limit")
    test_weekly_loss_limit()
    print("✅ test_weekly_loss_limit")
    test_portfolio_risk_cap()
    print("✅ test_portfolio_risk_cap")
    print("\n🎉 All risk control tests passed!")
