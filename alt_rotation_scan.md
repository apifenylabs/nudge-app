# Alt Rotation Scan — 2026-05-23 06:10 HKT

Source: Binance Futures (USDⓈ-M perpetuals). Data via ccxt + REST API.

---

## Pair Liquidity Table

Sorted by **Total Addressable Liquidity** (24h quote volume + open interest in USD).  
Thin flag: < $10M daily volume.

| Rank | Pair       | Last ($)  | 24h Vol ($)      | OI ($)           | FR (8h bp) | FR (APR %) | 24h Chg  | Total Liq ($)    | Note     |
|------|------------|-----------|------------------|------------------|------------|------------|----------|------------------|----------|
| 1    | **HYPE/USDT** | 55.87 | 2,106,334,818    | 388,406,874      | +0.50 bp   | +5.48%     | -3.62%   | **2,494,741,692** | Tier 1   |
| 2    | **XRP/USDT**  | 1.34  | 609,432,531      | 432,074,093      | -0.40 bp   | -4.39%     | -2.37%   | **1,041,506,624** | Tier 1   |
| 3    | **DOGE/USDT** | 0.104 | 393,555,029      | 239,806,470      | +0.01 bp   | +0.13%     | -1.36%   | **633,361,499**   | Tier 2   |
| 4    | **SUI/USDT**  | 1.06  | 368,096,860      | 111,838,451      | +0.83 bp   | +9.13%     | -5.53%   | **479,935,310**   | Tier 2   |
| 5    | **TAO/USDT**  | 272.2 | 177,937,713      | 75,498,022       | +0.50 bp   | +5.48%     | -3.77%   | **253,435,734**   | Tier 2   |
| 6    | **AVAX/USDT** | 9.25  | 115,668,721      | 75,311,222       | -0.75 bp   | -8.20%     | -2.29%   | **190,979,943**   | Tier 2   |
| 7    | **BONK/USDT** | 0.006047 | 20,396,884    | 16,413,909       | +0.50 bp   | +5.48%     | -2.94%   | **36,810,793**    | Tier 3   |
| 8    | **WIF/USDT**  | 0.194 | 26,164,513       | 16,227,328       | +0.01 bp   | +0.12%     | -3.04%   | **42,391,841**    | Tier 3   |
| 9    | **POPCAT/USDT** | 0.055 | 2,431,786      | 2,444,992        | -0.04 bp   | -0.48%     | -5.88%   | **4,876,778**     | ⚠️ THIN |

**Tiers:**
- **Tier 1** (mega-liquid): HYPE, XRP — >$1B total liquidity, institutional-grade
- **Tier 2** (liquid): DOGE, SUI, TAO, AVAX — >$100M total liq, good for active trading
- **Tier 3** (thin but viable): BONK, WIF — $20-40M total liq, manageable slippage
- **⚠️ POPCAT** — <$5M total liq, avoid for anything beyond tiny positions; funding neutral

---

## Funding Rate Analysis

| Pair     | FR (8h)     | FR (APR)     | Signal                          |
|----------|-------------|--------------|---------------------------------|
| HYPE     | +0.50 bp    | +5.48%       | Slight long bias, normal        |
| XRP      | -0.40 bp    | -4.39%       | Mild short bias, normal         |
| DOGE     | +0.01 bp    | +0.13%       | Neutral — attractive            |
| SUI      | +0.83 bp    | +9.13%       | Elevated long bias ⚠️           |
| TAO      | +0.50 bp    | +5.48%       | Slight long bias, normal        |
| AVAX     | -0.75 bp    | -8.20%       | Notable short bias — contrarian |
| BONK     | +0.50 bp    | +5.48%       | Normal for memecoin             |
| WIF      | +0.01 bp    | +0.12%       | Neutral — good for pairs        |
| POPCAT   | -0.04 bp    | -0.48%       | Neutral                         |

**Takeaway:** No funding extremes. SUI longs paying 9% APR is notable (upward pressure / hype premium). AVAX shorts paying 8% — market is bearish on AVAX.

---

## Ratio Momentum — Alt Season Check

| Pair     | Last              | 7d Change | 30d Change | 30d High       | 30d Low        |
|----------|-------------------|-----------|------------|----------------|----------------|
| SOL/BTC  | 0.00112180        | **+1.31%** | **+1.93%** | 0.00119110     | 0.00105330     |
| ETH/BTC  | 0.02737000        | **-1.93%** | **-8.12%** | 0.03013000     | 0.02737000     |

**Spot prices (Binance):**
- BTC: $75,884
- ETH: $2,077
- SOL: $85.14

### Verdict: ❌ Alt Season NOT Brewing

- **ETH/BTC at 30-day lows** (-8.12% monthly) — the bellwether for "alt season" is firmly bearish
- **SOL/BTC barely positive** (+1.93% monthly, about 40% off 30d high) — SOL is holding up better than ETH but not strong enough
- BTC at $75K is capturing share; capital is rotating into BTC, not out of it
- Long-tail alts (POPCAT, WIF, BONK all -3% to -6% today) confirm risk-off

**Trigger to watch:** ETH/BTC reclaiming above 0.028 (±1% from here) would be first sign of life. SOL/BTC breaking above 0.00119 (30d high) would confirm.

---

## Actionable Summary

### Worth Trading (by quality)

1. **🥇 HYPE/USDT** — #1 by volume, $388M OI, healthy funding. Flagship perp.
2. **🥇 XRP/USDT** — $432M OI (highest of the bunch), negative funding (shorts paying). Best setup for a squeeze.
3. **🥈 DOGE/USDT** — $240M OI, near-zero funding. Great for neutral strategies.
4. **🥈 SUI/USDT** — $112M OI, 9% APR long funding suggests crowded long — potential for liquidation cascade on a dip.
5. **🥈 TAO/USDT** — $75M OI, AI narrative. Low correlation to memes.
6. **🥈 AVAX/USDT** — $75M OI, shorts paying 8% APR. If any bounce happens, funding accelerates it.
7. **🥉 BONK/USDT** — $16M OI, memecoin with real volume. Viable for smaller size.
8. **🥉 WIF/USDT** — $16M OI, neutral funding. Same boat as BONK.
9. **⛔ POPCAT/USDT** — <$5M total liquidity. Avoid.

### Key Observations

- **Biggest OI gap:** XRP has $432M OI but only $609M daily volume (OI/Vol = 0.71) — relatively high conviction positioning. HYPE has $388M OI vs $2.1B vol (OI/Vol = 0.18) — high velocity, more trading than holding.
- **Bullish setup:** XRP negative funding + high OI = shorts getting squeezed if price turns.
- **Bearish setup:** SUI expensive funding + weak price action (-5.5% today) = leverage unwinding.
- **POPCAT is dead liquidity** — <$5M total, avoid completely.
