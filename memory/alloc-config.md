# Alloc Config — Live Trading Budgets

**Last Updated:** 2026-06-07 20:51 HKT
**Source:** Verified against config.py + last CEO directive

## Current allocations (all 1.00 = 100% of balance for 2% risk calc)

| Strategy | Alloc | Verified |
|----------|-------|----------|
| BB Core (1h + 15m) | 1.00 | ✅ config.py |
| Vol Surge | 1.00 | ✅ config.py ALLOC_VOL_SURGE=1.00 |
| Turtle Soup | 1.00 | ✅ bumped per CEO directive 2026-06-07 |
| Funding Proxy | 0.20 | ✅ CEO-confirmed at 20% |

## Remaining (to be ported to Aqua)
| BTC Stat Arb | 0.02 | 2% — minimal proving allocation |

## Filters (no alloc, no trades)
- OI Gate → aqua/core/filters/
- Orderflow Filters → aqua/core/filters/
- VWAP Variance → aqua/core/filters/

## Key history
- 2026-06-07 10:13: CEO directed MIN_BALANCE bumped $20 → $650
- 2026-06-07 20:51: CEO directed VolSurge + Turtle Soup promoted 0.10 → 1.00
