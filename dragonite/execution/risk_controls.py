"""
Dragonite — Risk Controls
=========================
Hard limits that every trade must pass before execution.
No strategy bypasses this module.

Rules:
- Max single trade risk: 3% of account (Phase 1)
- Max concurrent positions: 3
- Max portfolio at risk: 10%
- Daily loss limit: 6%
- Weekly loss limit: 12%
- Drawdown kill switch: -30% from peak
"""

import logging
from datetime import date, datetime
from typing import Optional

logger = logging.getLogger("dragonite.risk_controls")


class RiskManager:
    """Gatekeeper for all trades — no order placed without passing here."""

    def __init__(self, initial_balance: float = 800.0):
        self.initial_balance = initial_balance
        self.peak_balance = initial_balance
        self.current_balance = initial_balance

        # Phase-dependent limits
        self._max_single_risk_pct = 0.03  # 3%
        self._max_positions = 3
        self._max_portfolio_risk_pct = 0.10  # 10%
        self._daily_loss_limit_pct = 0.06  # 6%
        self._weekly_loss_limit_pct = 0.12  # 12%
        self._drawdown_kill_pct = 0.30  # 30%

        # Daily tracking
        self._today = date.today()
        self._daily_pnl = 0.0
        self._weekly_pnl = 0.0
        self._week_start = date.today()

        # Open positions
        self._open_positions: list[dict] = []

    def update_balance(self, new_balance: float):
        """Update account balance and track peak/drawdown."""
        self.current_balance = new_balance
        if new_balance > self.peak_balance:
            self.peak_balance = new_balance

        # Reset daily/weekly P&L if new day/week
        today = date.today()
        if today != self._today:
            self._daily_pnl = 0.0
            self._today = today

        # Weekly reset (Monday)
        if today.weekday() == 0 and today != self._week_start:
            self._weekly_pnl = 0.0
            self._week_start = today

    def record_trade_pnl(self, pnl: float):
        """Record a closed trade's P&L for daily/weekly tracking."""
        self._daily_pnl += pnl
        self._weekly_pnl += pnl

    def set_open_positions(self, positions: list[dict]):
        """Sync current open positions."""
        self._open_positions = positions

    # --- Gate checks ---

    def check_trade(self, symbol: str, action: str,
                    risk_amount: float) -> tuple[bool, str]:
        """
        Check if a trade is allowed. Returns (allowed: bool, reason: str).

        Args:
            symbol: Instrument symbol
            action: "BUY" or "SELL"
            risk_amount: Dollar amount at risk on this trade
        """
        checks = [
            self._check_kill_switch(),
            self._check_daily_loss(),
            self._check_weekly_loss(),
            self._check_single_risk(risk_amount),
            self._check_max_positions(),
            self._check_portfolio_risk(risk_amount),
        ]

        for allowed, reason in checks:
            if not allowed:
                logger.warning(f"Trade BLOCKED for {symbol}: {reason}")
                return False, reason

        logger.info(f"Trade APPROVED for {symbol} {action} (risk=${risk_amount:.2f})")
        return True, "approved"

    def _check_kill_switch(self) -> tuple[bool, str]:
        """Hard kill if drawdown > 30% from peak."""
        if self.peak_balance == 0:
            return True, ""
        dd = (self.peak_balance - self.current_balance) / self.peak_balance
        if dd >= self._drawdown_kill_pct:
            return False, (
                f"KILL SWITCH: Drawdown {dd:.1%} >= {self._drawdown_kill_pct:.0%} "
                f"(peak=${self.peak_balance:.2f}, current=${self.current_balance:.2f})"
            )
        return True, ""

    def _check_daily_loss(self) -> tuple[bool, str]:
        """Check if daily loss limit is hit."""
        if self._daily_pnl <= -self.current_balance * self._daily_loss_limit_pct:
            return False, (
                f"Daily loss limit: ${self._daily_pnl:.2f} today <= "
                f"-{(self._daily_loss_limit_pct*100):.0f}% of ${self.current_balance:.2f}"
            )
        return True, ""

    def _check_weekly_loss(self) -> tuple[bool, str]:
        """Check if weekly loss limit is hit."""
        if self._weekly_pnl <= -self.current_balance * self._weekly_loss_limit_pct:
            return False, (
                f"Weekly loss limit: ${self._weekly_pnl:.2f} this week <= "
                f"-{(self._weekly_loss_limit_pct*100):.0f}% of ${self.current_balance:.2f}"
            )
        return True, ""

    def _check_single_risk(self, risk_amount: float) -> tuple[bool, str]:
        """Check single trade risk."""
        max_risk = self.current_balance * self._max_single_risk_pct
        if risk_amount > max_risk:
            return False, (
                f"Risk ${risk_amount:.2f} > max ${max_risk:.2f} "
                f"({self._max_single_risk_pct*100:.0f}% of ${self.current_balance:.2f})"
            )
        return True, ""

    def _check_max_positions(self) -> tuple[bool, str]:
        """Check max concurrent positions."""
        active = len([p for p in self._open_positions if abs(p.get("quantity", 0)) > 0])
        if active >= self._max_positions:
            return False, (
                f"Already {active}/{self._max_positions} positions open"
            )
        return True, ""

    def _check_portfolio_risk(self, new_risk: float) -> tuple[bool, str]:
        """Check total portfolio at risk including this new trade."""
        existing_risk = sum(
            abs(p.get("unrealized_pnl", 0))
            for p in self._open_positions
            if p.get("unrealized_pnl", 0) < 0
        )
        total_risk = existing_risk + new_risk
        max_portfolio_risk = self.current_balance * self._max_portfolio_risk_pct
        if total_risk > max_portfolio_risk:
            return False, (
                f"Total risk ${total_risk:.2f} > max ${max_portfolio_risk:.2f} "
                f"({self._max_portfolio_risk_pct*100:.0f}% of portfolio)"
            )
        return True, ""

    def get_status(self) -> dict:
        """Return current risk status."""
        dd = (self.peak_balance - self.current_balance) / self.peak_balance if self.peak_balance else 0
        return {
            "balance": self.current_balance,
            "peak": self.peak_balance,
            "drawdown": f"{dd:.2%}",
            "daily_pnl": f"${self._daily_pnl:.2f}",
            "weekly_pnl": f"${self._weekly_pnl:.2f}",
            "open_positions": len(self._open_positions),
            "max_positions": self._max_positions,
            "kill_switch_active": dd >= self._drawdown_kill_pct,
        }
