# Dragonite — Status

## 2026-06-10 ~00:30 HKT — Project Created

### Files Built
| File | Status | Purpose |
|------|--------|---------|
| `PLANNING.md` | ✅ | Full project roadmap, 3 phases |
| `CONFIG.md` | ✅ | IKBR config + competitor comparison |
| `STATUS.md` | ✅ | This file — live status tracker |
| `execution/broker.py` | ✅ | IB Gateway connector (ib_insync) |
| `execution/order_manager.py` | ✅ | Market/limit/stop order placement |
| `execution/risk_controls.py` | ✅ | Kill switch, daily/weekly limits, position caps |
| `strategies/trend_following.py` | ✅ | Forex trend-following (EMA+RSI+ADX) |
| `research/pair_selection.md` | ✅ | EUR/USD, GBP/USD, USD/JPY rationale |
| `research/risk_analysis.md` | ✅ | Monte Carlo, position sizing, phase transitions |
| `scripts/backtest_runner.py` | ✅ | Backtest with local compute (Yahoo Finance) |
| `scripts/manual_trade.py` | ✅ | Manual trade tool |
| `monitoring/pulse_bot.py` | ✅ | Telegram pulse format |
| `tests/test_risk_controls.py` | ✅ | 8 risk control unit tests |

### Next To-Do (Waiting for CEO)
1. [ ] Install IB Gateway on your machine (or we confirm it's already there)
2. [ ] Get paper account credentials → set in `.env.local`
3. [ ] Run `python scripts/backtest_runner.py --months 12` to validate strategy
4. [ ] Review backtest results → tune strategy params
5. [ ] Connect to paper IKBR account → verify broker connector works
6. [ ] First paper trade
7. [ ] Go live with $800

### Blocks
- ❓ IB Gateway installed? (Need CEO to confirm)
- ❓ Paper account ID? (Need CEO to provide)
