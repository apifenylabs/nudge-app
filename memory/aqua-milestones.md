# Project Aqua — Migration Milestones

**Last Updated:** 2026-06-07 20:51 HKT

## Phase tracker

| Phase | Description | Status | Date | Notes |
|-------|-------------|--------|------|-------|
| 1 | Turtle Soup isolated | ✅ | 2026-06-07 | aqua/strategies/turtle_soup.py |
| 2 | BB Core ported | ✅ | 2026-06-07 | aqua/strategies/bb_core.py |
| 3 | VolSurge + FundingProxy ported | ✅ | 2026-06-07 | aqua/strategies/vol_surge.py, funding_proxy.py |
| 4 | Remaining strats + filters migration | ⏳ | — | btc_stat_arb, oi_gate/orderflow/vwap → core/filters/ |
| 4b | order_queue.py + risk_manager.py | ⏳ | — | Build infra in aqua/core/ |
| 5 | Switchover: cron → aqua orchestrator | ⏳ | — | Requires full parallel validation |

## Key decisions
- 2026-06-07: CEO bumped VolSurge + Turtle Soup alloc 0.10 → 1.00
- 2026-06-07: OI Gate, Orderflow Filters, VWAP Variance → aqua/core/filters/ (not strategies)
- 2026-06-07: Dead R&D strats (taker_flow, wick, meme_surge, kalman_drl) → _archive/

## What's live (runs in main_bot.py, not yet in Aqua)
- BTC Stat Arb (2%)
- DFA Filter (regime gate, no alloc)
- OI Gate (guardian, no alloc)
- Orderflow Filters (guardian, no alloc)
- VWAP Variance (guardian, no alloc)
