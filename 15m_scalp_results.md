# 15M Scalp Frequency Test Results

## Strategy (exact BB Core)
- BB(10,2.0) + RSI(14) < 20 entry
- TP = 1.5 × ATR(14) | SL = 0.75 × ATR(14)
- Max hold = 48 bars (12h on 15m, 48h on 1h)
- Non-overlapping trades (bar skip)
- Slippage: 0.5-4bp depending on liquidity
- RSI(14) = SMA of gains/losses (exact bb_core.py)

## Data Range
- **15m OHLCV**: 2025-11-20 → 2026-05-22 (183 days)
- Generated: 2026-05-22 17:27 UTC

## Per-Pair Results

| Pair | 15m Signals | 1h Signals | Ratio (15m/1h) | 15m WR% | 15m PF | 15m Total R | 15m Avg R | 1h WR% | 1h PF | Trades/Week (15m) | Max Consec Loss | Avg Bars Held | Verdict |
|------|:----------:|:----------:|:--------------:|:-------:|:------:|:-----------:|:---------:|:------:|:-----:|:-----------------:|:---------------:|:-------------:|:-------:|
| HYPE/USDT | 40 | 16 | 2.5x | 50.0% | 0.99 | -0.26 | -0.006 | 50.0% | 1.85 | 5.36 | 5 | 3.7 | ✅ PASS (freq OK) |
| WIF/USDT | 40 | 19 | 2.11x | 35.0% | 0.99 | -0.25 | -0.006 | 26.3% | 0.68 | 1.52 | 6 | 4.8 | ⚠️ EDGE (freq OK) |
| TAO/USDT | 56 | 12 | 4.67x | 33.9% | 0.92 | -2.51 | -0.045 | 33.3% | 0.95 | 2.13 | 5 | 3.1 | ❌ NOISE (freq OK) |
| BTC/USDT | 63 | 25 | 2.52x | 33.3% | 0.97 | -1.1 | -0.017 | 28.0% | 0.77 | 2.4 | 9 | 3.3 | ❌ NOISE (freq OK) |
| XRP/USDT | 69 | 18 | 3.83x | 33.3% | 0.88 | -4.68 | -0.068 | 38.9% | 1.2 | 2.63 | 9 | 2.6 | ❌ NOISE (freq OK) |
| SOL/USDT | 63 | 21 | 3.0x | 31.7% | 0.84 | -5.7 | -0.091 | 23.8% | 0.59 | 2.4 | 8 | 2.8 | ❌ NOISE (freq OK) |
| ETH/USDT | 89 | 26 | 3.42x | 25.8% | 0.66 | -17.29 | -0.194 | 23.1% | 0.59 | 3.39 | 12 | 3.1 | ❌ NOISE (freq OK) |

## Summary

- **Average 15m WR: 34.7%**
- **Average signal ratio (15m/1h): 3.1x**
- **Total 15m signals (all pairs): 420**
- **Total 1h signals (all pairs): 137**
- **Average trades/week on 15m: 2.8**

- **PASS (WR ≥ 50%): 1 pairs**
  - HYPE/USDT: 50.0% WR, 5.36/week
- **EDGE (WR 35-50%): 1 pairs**
  - WIF/USDT: 35.0% WR, 1.52/week
- **NOISE (WR < 35%): 5 pairs**
  - TAO/USDT: 33.9% WR, 2.13/week
  - BTC/USDT: 33.3% WR, 2.4/week
  - XRP/USDT: 33.3% WR, 2.63/week
  - SOL/USDT: 31.7% WR, 2.4/week
  - ETH/USDT: 25.8% WR, 3.39/week

## Key Question

> **Does 15m provide 4-10× more signals than 1h while maintaining WR > 50%?**

### ❌ NO — 15m noise is too high for this strategy
- WR: 34.7% (below 35% noise threshold)
- Signal ratio: 3.1x

## Trade Details (15m)

### HYPE/USDT
- **Signals**: 40 over 52.2 days (5.36/week)
- **WR**: 50.0% | **PF**: 0.99 | **Total R**: -0.26 | **Avg R**: -0.006
- **Max Consec Losses**: 5 | **Avg Bars Held**: 3.7

  Exit breakdown: {'TP': 20, 'SL': 20}

  Loss runs (lengths): [5, 3, 3, 2, 2, 1, 1, 3]
  Worst loss run: 5 consecutive losses

### WIF/USDT
- **Signals**: 40 over 183.7 days (1.52/week)
- **WR**: 35.0% | **PF**: 0.99 | **Total R**: -0.25 | **Avg R**: -0.006
- **Max Consec Losses**: 6 | **Avg Bars Held**: 4.8

  Exit breakdown: {'SL': 26, 'TP': 14}

  Loss runs (lengths): [1, 6, 5, 1, 5, 2, 1, 1, 2, 1, 1]
  Worst loss run: 6 consecutive losses

### TAO/USDT
- **Signals**: 56 over 183.7 days (2.13/week)
- **WR**: 33.9% | **PF**: 0.92 | **Total R**: -2.51 | **Avg R**: -0.045
- **Max Consec Losses**: 5 | **Avg Bars Held**: 3.1

  Exit breakdown: {'SL': 37, 'TP': 19}

  Loss runs (lengths): [3, 1, 2, 4, 5, 3, 2, 4, 2, 4, 1, 1, 5]
  Worst loss run: 5 consecutive losses

### BTC/USDT
- **Signals**: 63 over 183.7 days (2.4/week)
- **WR**: 33.3% | **PF**: 0.97 | **Total R**: -1.1 | **Avg R**: -0.017
- **Max Consec Losses**: 9 | **Avg Bars Held**: 3.3

  Exit breakdown: {'SL': 42, 'TP': 21}

  Loss runs (lengths): [1, 1, 3, 1, 1, 2, 1, 9, 4, 1, 1, 3, 1, 6, 3]...
  Worst loss run: 9 consecutive losses

### XRP/USDT
- **Signals**: 69 over 183.7 days (2.63/week)
- **WR**: 33.3% | **PF**: 0.88 | **Total R**: -4.68 | **Avg R**: -0.068
- **Max Consec Losses**: 9 | **Avg Bars Held**: 2.6

  Exit breakdown: {'TP': 23, 'SL': 46}

  Loss runs (lengths): [7, 5, 2, 1, 2, 1, 2, 1, 1, 1, 1, 9, 2, 3, 2]...
  Worst loss run: 9 consecutive losses

### SOL/USDT
- **Signals**: 63 over 183.7 days (2.4/week)
- **WR**: 31.7% | **PF**: 0.84 | **Total R**: -5.7 | **Avg R**: -0.091
- **Max Consec Losses**: 8 | **Avg Bars Held**: 2.8

  Exit breakdown: {'SL': 43, 'TP': 20}

  Loss runs (lengths): [4, 2, 1, 3, 2, 5, 2, 2, 2, 5, 3, 2, 1, 1, 8]
  Worst loss run: 8 consecutive losses

### ETH/USDT
- **Signals**: 89 over 183.7 days (3.39/week)
- **WR**: 25.8% | **PF**: 0.66 | **Total R**: -17.29 | **Avg R**: -0.194
- **Max Consec Losses**: 12 | **Avg Bars Held**: 3.1

  Exit breakdown: {'SL': 66, 'TP': 23}

  Loss runs (lengths): [2, 1, 7, 6, 1, 12, 1, 2, 1, 1, 2, 2, 1, 4, 6]...
  Worst loss run: 12 consecutive losses

---
### Methodology
- RSI(14) computed as SMA of gains/losses over 14 periods (exact bb_core.py code)
- Entry: RSI < 20 AND close < BB lower band
- Exit: TP (1.5×ATR) or SL (0.75×ATR) or time stop (48 bars = 12h on 15m)
- Non-overlapping: after trade exits, skip to next bar
- Slippage applied: entry × (1 + bp/10000), exit × (1 - bp/10000)

### Legend
- **PASS**: WR ≥ 50% — viable parallel system
- **EDGE**: WR 35-50% — tradeable with careful position sizing
- **NOISE**: WR < 35% — not worth trading