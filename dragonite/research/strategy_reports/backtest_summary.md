# Dragonite — Strategy Research Summary

## Backtest Results (local compute, yfinance data)

### Best Strategy Found: EMA10/30 Trend-Following on USD/JPY 4H
- **Parameters:** fast_ema=10, slow_ema=30, ADX>20, 1.5R, 0.5% stop
- **1-year result:** +15.18%, 47.4% WR, 1.24 PF, 17.2% DD
- **Trades:** 38 in 1 year (~3/month)
- **Best on:** USD/JPY (trends cleanest of the majors)

### Summary of All Tests

| Strategy | TF | Pair | Trades | WR | Return | PF | Max DD |
|----------|-----|------|--------|------|--------|------|---------|
| EMA10/30 | 4H | USD/JPY | 38 | 47.4% | +15.2% | 1.24 | 17.2% |
| EMA20/50 | 4H | USD/JPY | 39 | 41.0% | -3.7% | 0.94 | 26.1% |
| EMA20/50 | 1H | EUR/USD | 51 | 33.3% | -10.4% | 0.79 | 15.9% |
| Breakout | 1H | All | 70+ | 25-33% | -16 to -35% | <1.0 | 28-36% |
| Scalp 15m | 15m | All | 27-34 | 33-39% | -13 to -18% | <1.0 | 20-23% |

### Key Findings

1. **USD/JPY is the best forex pair** for systematic trading — cleanest trend structure, lowest correlation with EUR
2. **4H timeframe > 1H > 15m** — fewer signals but higher WR
3. **EMA10/30 crossover + ADX filter + 1.5R R:R** is the best parameter set found
4. **Breakout strategies don't work well** on 1h+ data without institutional data feeds
5. **Scalping 15m** loses to spread costs on $800 account

## 💀 The $800 → $200k Reality

### What's mathematically possible on forex

At +15%/year with compounding:
- Year 1: $800 → $920
- Year 3: $1,217
- Year 5: $1,609
- Year 10: $3,236
- Year 35: $105,000
- Year 43: $200,000

**43 years.** That's the honest math.

### What would need to happen for $200k "fast"

To hit $200k in **3 years**, you need:
- +250% per year (account doubles every 5 months)
- 2% per trading day (252 trading days)
- OR leverage on crazy directionals

### Realistic paths

| Path | Timeline | Risk | Likelihood |
|------|----------|------|-----------|
| **Forex only, conservative** | 40+ years | Low | Very likely |
| **Forex only, aggressive (scalp)** | 5-10 years | Medium | Possible if WR > 55% |
| **Forex + Options (weekly calls)** | 2-5 years | High | Possible — options carry asymmetric returns |
| **Forex + Leveraged ETFs + Options** | 1-3 years | Very high | Possible but ~30% blowup risk |
| **Pure options (0DTE/gambling)** | Months | Extreme | Unlikely (addiction path) |

## Recommendation

**Phase 1 (now):** Start with forex only on USD/JPY 4H. Build the system. Prove the edge.
- $800 with 3% risk, 10:1 leverage, EMA10/30 strategy on USD/JPY
- Target: 15-20% per year with <15% DD
- **This won't get us to $200k fast, but it won't blow up**

**Phase 2 (June 2026):** Once forex system is running, add **leveraged ETFs** (TQQQ, SOXL) with same trend-following approach. These have 3x the daily move — more volatility, more profit potential.

**Phase 3 (July 2026):** Add **weekly call options on SPY/QQQ** — 10-15% of portfolio. This is where the asymmetric returns come from. One good run can multiply the account. One bad run costs 10%.

## Files Saved
- `research/backtest_results/EUR.USD_6mo_1h_results.md`
- `research/backtest_results/GBP.USD_6mo_1h_results.md`
- `research/backtest_results/USD.JPY_6mo_1h_results.md`
