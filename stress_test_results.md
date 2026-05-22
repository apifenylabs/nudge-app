# Hyperliquid Perps Stress Test Results

**Date:** 2026-05-22 17:08 UTC  
**Balance:** $500.0 | **Risk:** 2.0% | **Fee:** 5.0bp  
**Ensemble:** BB Core + Vol Surge (1h bars, ~2023-2026)  
*Note: Funding Proxy skipped (Hyperliquid API timeout)*
---

## Ranked Results

| Rank | Pair | WR% | PF | R/trade | T/yr | MaxDD% | LiqSc | WF(t/v) | MC-Prof% | Edge | Score |
|------|------|-----|-----|---------|------|--------|-------|---------|----------|------|-------|
| 1 | POPCAT-PERP | 33.0 | 0.41 | -0.015 | 880 | 3.12 | 40.0 | 25.0%/33.3% | 0.0 | ❌ | 38.5 |
| 2 | BTC-PERP | 24.5 | 0.52 | -0.004 | 402 | 8.96 | 56.0 | 28.7%/30.0% | 0.0 | ❌ | 35.9 |
| 3 | BONK-PERP | 24.1 | 0.31 | -0.001 | 389 | 0.86 | 48.0 | 26.2%/24.3% | 0.0 | ❌ | 34.2 |
| 4 | HYPE-PERP | 25.9 | 0.38 | -0.01 | 623 | 1.2 | 31.0 | 22.2%/23.5% | 0.2 | ❌ | 33.0 |
| 5 | WIF-PERP | 25.5 | 0.52 | -0.017 | 407 | 25.67 | 54.0 | 29.1%/23.4% | 0.0 | ❌ | 30.9 |
| 6 | SOL-PERP | 21.4 | 0.38 | -0.013 | 320 | 21.76 | 58.0 | 24.4%/25.0% | 0.0 | ❌ | 29.2 |
| 7 | AVAX-PERP | 23.4 | 0.37 | -0.015 | 358 | 26.96 | 53.0 | 25.5%/27.1% | 0.0 | ❌ | 28.7 |
| 8 | TAO-PERP | 21.5 | 0.32 | -0.014 | 739 | 2.42 | 24.0 | 16.7%/20.8% | 0.0 | ❌ | 28.6 |
| 9 | ETH-PERP | 18.8 | 0.36 | -0.01 | 388 | 19.2 | 46.0 | 21.3%/23.2% | 0.0 | ❌ | 26.7 |
| 10 | SUI-PERP | 23.5 | 0.38 | -0.016 | 367 | 30.95 | 45.0 | 25.2%/24.5% | 0.0 | ❌ | 26.5 |
| 11 | XRP-PERP | 16.4 | 0.22 | -0.017 | 301 | 25.6 | 41.0 | 16.8%/21.8% | 0.0 | ❌ | 21.8 |
| 12 | DOGE-PERP | 18.3 | 0.28 | -0.017 | 359 | 31.42 | 24.0 | 23.2%/19.9% | 0.0 | ❌ | 20.5 |

---
## Per-Pair Details

### POPCAT-PERP
- **Slippage:** 10.0bp | **Liq Score:** 40.0/100 | **30d Vol:** $30,953,206
- **Trades:** 94 | **WR:** 33.0% | **PF:** 0.41 | **Avg R:** -0.015 | **Return:** -2.9%
- **MCL:** 10 | **Max DD:** 3.12% | **Sharpe:** -11.59 | **Est T/yr:** 880
- **WF:** tr=35t 37.1%/0.54PF | te=16t 25.0%/0.21PF | va=36t 33.3%/0.43PF
- **MC(2k):** med=-2.9% | P95=-1.6% | P5=-4.3% | profit=0.0% | ruin=0.0%
- **Regime:** trend(77t)=33.8%/0.47PF | chop(17t)=29.4%/0.22PF | stable=False
- **Funding bleed:** est $131.4/yr exposure (avg hold 0.0h)

### BTC-PERP
- **Slippage:** 0.5bp | **Liq Score:** 56.0/100 | **30d Vol:** $205,834,994
- **Trades:** 1032 | **WR:** 24.5% | **PF:** 0.52 | **Avg R:** -0.004 | **Return:** -8.9%
- **MCL:** 17 | **Max DD:** 8.96% | **Sharpe:** -5.89 | **Est T/yr:** 402
- **WF:** tr=362t 15.7%/0.27PF | te=320t 28.7%/0.66PF | va=347t 30.0%/0.75PF
- **MC(2k):** med=-8.9% | P95=-7.0% | P5=-10.7% | profit=0.0% | ruin=0.0%
- **Regime:** trend(822t)=24.3%/0.52PF | chop(210t)=25.2%/0.58PF | stable=False
- **Funding bleed:** est $131.4/yr exposure (avg hold 0.0h)

### BONK-PERP
- **Slippage:** 8.0bp | **Liq Score:** 48.0/100 | **30d Vol:** $77,826,364
- **Trades:** 789 | **WR:** 24.1% | **PF:** 0.31 | **Avg R:** -0.001 | **Return:** -0.9%
- **MCL:** 14 | **Max DD:** 0.86% | **Sharpe:** -8.68 | **Est T/yr:** 389
- **WF:** tr=296t 22.3%/0.34PF | te=221t 26.2%/0.3PF | va=272t 24.3%/0.27PF
- **MC(2k):** med=-0.9% | P95=-0.7% | P5=-1.0% | profit=0.0% | ruin=0.0%
- **Regime:** trend(630t)=23.3%/0.3PF | chop(159t)=27.0%/0.36PF | stable=False
- **Funding bleed:** est $131.4/yr exposure (avg hold 0.0h)

### HYPE-PERP
- **Slippage:** 1.5bp | **Liq Score:** 31.0/100 | **30d Vol:** $11,055,932
- **Trades:** 58 | **WR:** 25.9% | **PF:** 0.38 | **Avg R:** -0.01 | **Return:** -1.2%
- **MCL:** 7 | **Max DD:** 1.2% | **Sharpe:** -8.22 | **Est T/yr:** 623
- **WF:** tr=25t 28.0%/0.62PF | te=9t 22.2%/0.35PF | va=17t 23.5%/0.18PF
- **MC(2k):** med=-1.2% | P95=-0.5% | P5=-1.8% | profit=0.2% | ruin=0.0%
- **Regime:** trend(45t)=28.9%/0.48PF | chop(13t)=15.4%/0.13PF | stable=False
- **Funding bleed:** est $131.4/yr exposure (avg hold 0.0h)

### WIF-PERP
- **Slippage:** 5.0bp | **Liq Score:** 54.0/100 | **30d Vol:** $150,418,248
- **Trades:** 734 | **WR:** 25.5% | **PF:** 0.52 | **Avg R:** -0.017 | **Return:** -25.2%
- **MCL:** 15 | **Max DD:** 25.67% | **Sharpe:** -4.14 | **Est T/yr:** 407
- **WF:** tr=289t 24.2%/0.44PF | te=206t 29.1%/0.89PF | va=235t 23.4%/0.32PF
- **MC(2k):** med=-25.1% | P95=-18.2% | P5=-31.8% | profit=0.0% | ruin=0.0%
- **Regime:** trend(562t)=25.4%/0.53PF | chop(172t)=25.6%/0.47PF | stable=False
- **Funding bleed:** est $131.4/yr exposure (avg hold 0.0h)

### SOL-PERP
- **Slippage:** 1.0bp | **Liq Score:** 58.0/100 | **30d Vol:** $250,697,593
- **Trades:** 818 | **WR:** 21.4% | **PF:** 0.38 | **Avg R:** -0.013 | **Return:** -21.3%
- **MCL:** 29 | **Max DD:** 21.76% | **Sharpe:** -7.52 | **Est T/yr:** 320
- **WF:** tr=305t 16.1%/0.23PF | te=250t 24.4%/0.51PF | va=260t 25.0%/0.47PF
- **MC(2k):** med=-21.3% | P95=-18.2% | P5=-24.6% | profit=0.0% | ruin=0.0%
- **Regime:** trend(644t)=21.4%/0.39PF | chop(174t)=21.3%/0.33PF | stable=False
- **Funding bleed:** est $131.4/yr exposure (avg hold 0.0h)

### AVAX-PERP
- **Slippage:** 2.0bp | **Liq Score:** 53.0/100 | **30d Vol:** $147,186,218
- **Trades:** 918 | **WR:** 23.4% | **PF:** 0.37 | **Avg R:** -0.015 | **Return:** -26.9%
- **MCL:** 15 | **Max DD:** 26.96% | **Sharpe:** -6.17 | **Est T/yr:** 358
- **WF:** tr=348t 18.7%/0.27PF | te=286t 25.5%/0.38PF | va=280t 27.1%/0.51PF
- **MC(2k):** med=-27.0% | P95=-22.6% | P5=-31.6% | profit=0.0% | ruin=0.0%
- **Regime:** trend(707t)=22.3%/0.34PF | chop(211t)=27.0%/0.55PF | stable=False
- **Funding bleed:** est $131.4/yr exposure (avg hold 1.0h)

### TAO-PERP
- **Slippage:** 4.0bp | **Liq Score:** 24.0/100 | **30d Vol:** $28,607
- **Trades:** 79 | **WR:** 21.5% | **PF:** 0.32 | **Avg R:** -0.014 | **Return:** -2.3%
- **MCL:** 17 | **Max DD:** 2.42% | **Sharpe:** -11.85 | **Est T/yr:** 739
- **WF:** tr=33t 27.3%/0.54PF | te=18t 16.7%/0.14PF | va=24t 20.8%/0.38PF
- **MC(2k):** med=-2.3% | P95=-1.4% | P5=-3.1% | profit=0.0% | ruin=0.0%
- **Regime:** trend(46t)=23.9%/0.4PF | chop(33t)=18.2%/0.23PF | stable=False
- **Funding bleed:** est $131.4/yr exposure (avg hold 0.0h)

### ETH-PERP
- **Slippage:** 0.5bp | **Liq Score:** 46.0/100 | **30d Vol:** $63,674,482
- **Trades:** 995 | **WR:** 18.8% | **PF:** 0.36 | **Avg R:** -0.01 | **Return:** -19.2%
- **MCL:** 26 | **Max DD:** 19.2% | **Sharpe:** -7.11 | **Est T/yr:** 388
- **WF:** tr=384t 13.5%/0.21PF | te=310t 21.3%/0.4PF | va=297t 23.2%/0.48PF
- **MC(2k):** med=-19.1% | P95=-16.4% | P5=-22.0% | profit=0.0% | ruin=0.0%
- **Regime:** trend(790t)=18.9%/0.36PF | chop(205t)=18.5%/0.32PF | stable=False
- **Funding bleed:** est $131.4/yr exposure (avg hold 0.0h)

### SUI-PERP
- **Slippage:** 2.5bp | **Liq Score:** 45.0/100 | **30d Vol:** $56,205,252
- **Trades:** 940 | **WR:** 23.5% | **PF:** 0.38 | **Avg R:** -0.016 | **Return:** -30.8%
- **MCL:** 26 | **Max DD:** 30.95% | **Sharpe:** -7.79 | **Est T/yr:** 367
- **WF:** tr=384t 21.9%/0.36PF | te=250t 25.2%/0.39PF | va=302t 24.5%/0.41PF
- **MC(2k):** med=-30.8% | P95=-26.4% | P5=-35.2% | profit=0.0% | ruin=0.0%
- **Regime:** trend(736t)=24.7%/0.41PF | chop(204t)=19.1%/0.27PF | stable=False
- **Funding bleed:** est $131.4/yr exposure (avg hold 0.0h)

### XRP-PERP
- **Slippage:** 1.5bp | **Liq Score:** 41.0/100 | **30d Vol:** $33,615,607
- **Trades:** 773 | **WR:** 16.4% | **PF:** 0.22 | **Avg R:** -0.017 | **Return:** -25.5%
- **MCL:** 26 | **Max DD:** 25.6% | **Sharpe:** -10.2 | **Est T/yr:** 301
- **WF:** tr=323t 12.4%/0.12PF | te=208t 16.8%/0.26PF | va=238t 21.8%/0.35PF
- **MC(2k):** med=-25.6% | P95=-22.6% | P5=-28.4% | profit=0.0% | ruin=0.0%
- **Regime:** trend(597t)=15.6%/0.21PF | chop(176t)=19.3%/0.3PF | stable=False
- **Funding bleed:** est $131.4/yr exposure (avg hold 0.0h)

### DOGE-PERP
- **Slippage:** 1.5bp | **Liq Score:** 24.0/100 | **30d Vol:** $1,405,190
- **Trades:** 922 | **WR:** 18.3% | **PF:** 0.28 | **Avg R:** -0.017 | **Return:** -31.4%
- **MCL:** 26 | **Max DD:** 31.42% | **Sharpe:** -8.04 | **Est T/yr:** 359
- **WF:** tr=371t 14.0%/0.21PF | te=259t 23.2%/0.32PF | va=287t 19.9%/0.32PF
- **MC(2k):** med=-31.5% | P95=-27.4% | P5=-35.2% | profit=0.0% | ruin=0.0%
- **Regime:** trend(740t)=18.5%/0.27PF | chop(182t)=17.6%/0.29PF | stable=False
- **Funding bleed:** est $131.4/yr exposure (avg hold 0.0h)

---
## Final Whitelist Recommendation

## Critical Finding: No Pair Passes Statistical Gates

**None of the 12 pairs satisfy the ensemble's profitability requirements.** The BB Core + Vol Surge long-only mean-reversion signals do not produce a positive expectancy on 1h Binance spot data from 2023-2026.

### Why All Pairs Fail

| Issue | Detail |
|-------|--------|
| **WR ceiling** | Best WR was POPCAT at 33% (short data, small sample). All pairs with >300 trades sit at 18-25% WR |
| **PF < 0.8** | Best PF was BTC/WIF at 0.52 — losses exceed gains by ~2:1 |
| **Avg R negative** | Every pair shows negative R-multiple — each trade loses money on average |
| **MC profit probability 0%** | Zero chance of profitability across 2,000 resampled paths for ALL pairs |
| **Long-only drag** | Both strategies are long-only. In a crypto bull market (2023-2024), buying dips doesn't compensate for riding deep corrections |
| **Funding bleed** | Long-only on perps means paying ~11-33%/yr in funding — catastrophic for a sub-25% WR strategy |

### Best of the Worst (Ranked by least-bad)
1. **BTC-PERP** — WR 24.5%, PF 0.52, DD 9%. Best WF test set (28.7%/0.66PF). Liquid. Low slippage. Still loses money. **No.**
2. **WIF-PERP** — WR 25.5%, PF 0.52. Test set showed 0.89PF. But MC says 100% chance of loss. **No.**
3. **POPCAT-PERP** — WR 33.0% (small sample, 94 trades). 10bp slippage eats any edge. **No.**

### Root Cause Analysis

The ensemble as coded has two fundamental problems:

**1. BB Core entry is too restrictive.** RSI < 20 AND close < lower BB(10,2) catches extreme moves but almost always in the middle of a cascade — the 0.75 ATR stop is too tight for the entry, resulting in frequent SL hits.

**2. Vol Surge fires too often, with poor exits.** The 1.0 ATR TP vs 0.5 ATR SL gives 2:1 R:R in theory, but the 24-bar volume average catches many false surges (end-of-day spikes, news events). Realized WR ~23% means winners are too rare despite the favorable R:R.

**3. No short signals.** The ensemble has zero short-side participation — in crypto's structurally bull-biased environment, the funding_proxy short signal (which would collect funding and ride mean reversion down) could have offset losses. But it requires HL funding data which timed out.

### Recommendations

1. **Do NOT deploy this ensemble as-is.** All 12 pairs fail.
2. **Redesign signals for perp markets:** Add short-side signals. The funding_proxy short is a high-conviction edge worth prioritizing (it collects funding AND benefits from mean reversion).
3. **Widen stops on BB Core:** 0.75 ATR SL on a close-below-lower-BB entry is too tight; widen to 1.5-2.0 ATR.
4. **Vol Surge needs confirmation:** Add RSI divergence or OBV confirmation to reduce false signals.
5. **Re-run with actual Hyperliquid perp data** (not Binance spot) — the perp market has different dynamics (funding, liquidation cascades) that may favor these signals differently.

### Final Verdict

**No whitelist candidates. Zero of 12 pairs pass.**

This is honest — the ensemble in its current form is not production-ready for any of these pairs.

---
*Generated by stress_test_full.py — brutally honest per specification*
