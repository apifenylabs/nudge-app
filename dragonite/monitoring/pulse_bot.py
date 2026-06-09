"""
Dragonite — Pulse Bot (Telegram Status)
========================================
Cron-driven status updates for Dragonite trading.
Reports balance, positions, recent trades, risk status.
"""

import logging
from datetime import datetime

logger = logging.getLogger("dragonite.pulse")


def generate_pulse(
    balance: float = 800.0,
    peak_balance: float = 800.0,
    positions: list = None,
    trades_today: int = 0,
    daily_pnl: float = 0.0,
    weekly_pnl: float = 0.0,
    risk_status: str = "✅ Normal",
) -> str:
    """Generate a formatted status message."""
    positions = positions or []
    dd = ((peak_balance - balance) / peak_balance * 100) if peak_balance else 0
    now = datetime.now().strftime("%Y-%m-%d %H:%M HKT")

    # Position summary
    pos_lines = []
    for p in positions:
        pos_lines.append(
            f"  • {p.get('symbol', '?')}: "
            f"{p.get('quantity', 0):.2f} units "
            f"@ ${p.get('avg_cost', 0):.4f} "
            f"(P&L: ${p.get('unrealized_pnl', 0):.2f})"
        )

    pos_section = "\n".join(pos_lines) if pos_lines else "  None"

    msg = (
        f"🐉 **Dragonite Pulse** — {now}\n\n"
        f"**Balance:** ${balance:.2f} "
        f"(peak: ${peak_balance:.2f}, DD: {dd:.1f}%)\n"
        f"**Risk Status:** {risk_status}\n\n"
        f"**Positions:**\n{pos_section}\n\n"
        f"**Today:** {trades_today} trades, P&L ${daily_pnl:.2f}\n"
        f"**Week:** P&L ${weekly_pnl:.2f}\n\n"
        f"Next phase at $5,000 → Growth mode 📈"
    )

    return msg


def generate_alert(
    alert_type: str, message: str, balance: float = 800.0
) -> str:
    """Generate an alert message."""
    emoji_map = {
        "kill_switch": "🚨",
        "daily_loss": "⚠️",
        "weekly_loss": "⚠️",
        "drawdown": "🔴",
        "trade": "📊",
        "info": "ℹ️",
    }
    emoji = emoji_map.get(alert_type, "🔔")

    return (
        f"{emoji} **Dragonite Alert**\n\n"
        f"**Type:** {alert_type}\n"
        f"**Message:** {message}\n"
        f"**Balance:** ${balance:.2f}\n"
        f"**Time:** {datetime.now().strftime('%H:%M HKT')}"
    )
