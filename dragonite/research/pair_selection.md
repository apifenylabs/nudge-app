# Dragonite — Forex Pair Selection

## Selection Criteria

1. **Liquidity** — Tight spreads, high volume
2. **Trend quality** — Clean directional moves, low choppiness
3. **Low correlation** — Don't want all positions moving together
4. **Volatility** — Enough movement to profit on $800 account
5. **IKBR margin availability** — Must support 30:1 leverage

## Selected Pairs (Phase 1)

### 1. EUR/USD (Primary)
- **Why:** Tightest spread (0.59 pips all-in), highest volume globally
- **Best TF:** 1H for swing trades, 15m for faster scalps
- **Trend behavior:** Strong directional moves during London/NY overlap
- **Avg daily range:** ~70-100 pips
- **Leverage:** 30:1
- **Correlation:** Low with JPY pairs, high with CHF pairs

### 2. GBP/USD (Secondary)
- **Why:** More volatile than EUR/USD (avg 100-140 pips daily), good trends
- **Best TF:** 1H-4H (cleaner structure than 15m)
- **Trend behavior:** Sharper moves, more gap risk on news (BOE)
- **Avg daily range:** ~100-140 pips
- **Leverage:** 30:1
- **Correlation:** Moderate with EUR/USD (~0.6)
- **Edge:** Higher volatility = higher profit potential per trade

### 3. USD/JPY (Tertiary)
- **Why:** Clean trend structure, good diversification from EUR/GBP
- **Best TF:** 1H (BOJ intervention risk on lower TFs)
- **Trend behavior:** Strong during Asian session, good carry trade dynamics
- **Avg daily range:** ~60-100 pips
- **Leverage:** 30:1
- **Correlation:** Low with EUR/USD (~0.3), diversifies portfolio

## Pair Correlation Matrix
```
            EUR/USD  GBP/USD  USD/JPY  USD/CHF
EUR/USD     1.0      0.6      0.3      0.8
GBP/USD     0.6      1.0      0.2      0.5
USD/JPY     0.3      0.2      1.0      0.4
USD/CHF     0.8      0.5      0.4      1.0
```

**Key:** CHF pairs are highly correlated with EUR — avoid USD/CHF when EUR/USD is active.

## Session Schedule (HKT / UTC+8)
| Session | Time (HKT) | Best Pairs |
|---------|-----------|------------|
| Asia | 06:00-15:00 | USD/JPY |
| London | 15:00-00:00 | EUR/USD, GBP/USD |
| NY | 20:00-05:00 | EUR/USD, GBP/USD |
| London+NY overlap | 20:00-00:00 | Best volatility window |

**Optimal trading hours:** 15:00-00:00 HKT (London + NY overlap)
