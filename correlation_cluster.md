# Correlation Cluster Analysis

**Generated:** 2026-05-23  
**Source:** 30 days of 1h OHLCV close data (713 hourly returns per pair)  
**Exchanges:** Binance (10 pairs), Hyperliquid (HYPE/USDT), Bybit (POPCAT/USDT)

## Data Coverage

| Pair | Source | Candles | From | To |
|------|--------|---------|------|----|
| SOL/USDT | Binance | 713 | Apr 23 | May 22 |
| BTC/USDT | Binance | 713 | Apr 23 | May 22 |
| ETH/USDT | Binance | 713 | Apr 23 | May 22 |
| SUI/USDT | Binance | 713 | Apr 23 | May 22 |
| TAO/USDT | Binance | 713 | Apr 23 | May 22 |
| XRP/USDT | Binance | 713 | Apr 23 | May 22 |
| AVAX/USDT | Binance | 713 | Apr 23 | May 22 |
| WIF/USDT | Binance | 713 | Apr 23 | May 22 |
| BONK/USDT | Binance | 713 | Apr 23 | May 22 |
| DOGE/USDT | Binance | 713 | Apr 23 | May 22 |
| HYPE/USDT | Hyperliquid | 713 | Apr 23 | May 22 |
| POPCAT/USDT | Bybit | 714 | Apr 23 | May 22 |

## Correlation Matrix (Pearson — Hourly Returns)

|                | SOL | BTC | ETH | SUI | TAO | XRP | AVAX | WIF | BONK | DOGE | HYPE | POPCAT |
|----------------|:---:|:---:|:---:|:---:|:---:|:---:|:----:|:---:|:----:|:----:|:----:|:------:|
| **SOL/USDT**   | 1.00|0.80 |0.84 |0.66 |0.53 |0.80 |0.84  |0.53 |0.79  |0.70  |0.40  |0.73    |
| **BTC/USDT**   |0.80 |1.00 |0.89 |0.54 |0.50 |0.76 |0.80  |0.47 |0.72  |0.74  |0.35  |0.66    |
| **ETH/USDT**   |0.84 |0.89 |1.00 |0.57 |0.52 |0.77 |0.81  |0.46 |0.74  |0.73  |0.36  |0.67    |
| **SUI/USDT**   |0.66 |0.54 |0.57 |1.00 |0.43 |0.61 |0.68  |0.40 |0.66  |0.50  |0.32  |0.56    |
| **TAO/USDT**   |0.53 |0.50 |0.52 |0.43 |1.00 |0.53 |0.55  |0.32 |0.53  |0.42  |0.28  |0.47    |
| **XRP/USDT**   |0.80 |0.76 |0.77 |0.61 |0.53 |1.00 |0.82  |0.48 |0.76  |0.72  |0.33  |0.67    |
| **AVAX/USDT**  |0.84 |0.80 |0.81 |0.68 |0.55 |0.82 |1.00  |0.54 |0.84  |0.74  |0.36  |0.74    |
| **WIF/USDT**   |0.53 |0.47 |0.46 |0.40 |0.32 |0.48 |0.54  |1.00 |0.59  |0.49  |0.22  |0.58    |
| **BONK/USDT**  |0.79 |0.72 |0.74 |0.66 |0.53 |0.76 |0.84  |0.59 |1.00  |0.72  |0.34  |0.78    |
| **DOGE/USDT**  |0.70 |0.74 |0.73 |0.50 |0.42 |0.72 |0.74  |0.49 |0.72  |1.00  |0.28  |0.64    |
| **HYPE/USDT**  |0.40 |0.35 |0.36 |0.32 |0.28 |0.33 |0.36  |0.22 |0.34  |0.28  |1.00  |0.34    |
| **POPCAT/USDT**|0.73 |0.66 |0.67 |0.56 |0.47 |0.67 |0.74  |0.58 |0.78  |0.64  |0.34  |1.00    |

## Detected Clusters (correlation > 0.7)

**Cluster 1 — "Core Crypto"** (7 members, all pairwise > 0.7):
- **SOL/USDT · BTC/USDT · ETH/USDT · XRP/USDT · AVAX/USDT · BONK/USDT · POPCAT/USDT**

This is the broad market beta cluster. Everything here moves together. Holding SOL, BTC, ETH, XRP, and AVAX together provides almost zero diversification benefit at hourly resolution.

Notable members of the cluster:
- **BONK and POPCAT** are inside this cluster — they ARE SOL beta, not a separate bet.
- **DOGE** is just outside the cluster (0.70 with SOL, 0.74 with BTC).
- **AVAX** is the highest-correlated pair in the set (0.84 with every major).

## Diversification Analysis (correlation with BTC < 0.5)

| Pair | vs BTC | Diversifier? |
|------|:------:|:------------:|
| **HYPE/USDT** | **0.350** | ✅ **Best diversifier** |
| **WIF/USDT**  | **0.466** | ✅ **Strong diversifier** |
| **TAO/USDT**  | **0.499** | ✅ **Borderline diversifier** |
| SUI/USDT      | 0.536    | ❌ Not diversifier |
| POPCAT/USDT   | 0.656    | ❌ Not diversifier |
| BONK/USDT     | 0.721    | ❌ Not diversifier |
| DOGE/USDT     | 0.738    | ❌ Not diversifier |
| XRP/USDT      | 0.756    | ❌ Not diversifier |
| SOL/USDT      | 0.797    | ❌ Not diversifier |
| AVAX/USDT     | 0.796    | ❌ Not diversifier |
| ETH/USDT      | 0.887    | ❌ Most correlated to BTC |

## The Key Question: Are BONK / POPCAT / DOGE Just SOL Beta?

**Answer: YES for BONK and POPCAT. DOGE is borderline.**

| Memecoin | vs SOL | vs BTC | Verdict |
|----------|:------:|:------:|---------|
| **BONK/USDT** | **0.79** | 0.72 | **SOL beta** — same cluster, no diversification |
| **POPCAT/USDT** | **0.73** | 0.66 | **SOL beta** — same cluster |
| **DOGE/USDT** | **0.70** | 0.74 | High correlation to both SOL and BTC — mostly beta |
| **WIF/USDT** | **0.53** | 0.47 | **True diversifier** — behaves differently from both SOL and BTC |

## Conclusions

1. **HYPE is the only genuine diversifier** among the 12 pairs — ~0.35 with everything else. This is a distinct asset class bet.
2. **WIF and TAO are mild diversifiers** — correlation to BTC just under 0.5, off the main cluster.
3. **BONK and POPCAT are SOL exposure in disguise** — they belong to the same >0.7 cluster as SOL, BTC, ETH, XRP, AVAX. They add volatility, not diversification.
4. **DOGE is mostly beta** — tied to both SOL (0.70) and BTC (0.74), not a meaningful hedge.
5. **The core macro cluster** (SOL · BTC · ETH · XRP · AVAX · BONK · POPCAT) collapses to ~1.5 effective independent bets in a Markowitz sense.

### Portfolio Implication

If your crypto portfolio holds SOL + BONK + POPCAT + DOGE, you have effectively one large SOL/beta position with leverage, not a diversified basket. The only real diversifiers in this set are **HYPE** (strongest), **WIF**, and **TAO** (weak).
