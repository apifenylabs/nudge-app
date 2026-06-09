# Aqua Paper Trading Cycle Log

## 2026-06-08 20:36 HKT (12:36 UTC)

**Mode:** Paper | **Cycle:** 15m BB Core Scan + Multi-strategy Check

### Run: 15m BB Core Strategy Scan (BB(10,2) + RSI<20, TP 1.5%, SL 0.75%)

**Scan data:** 15m candles, last ~90 days across 12 pairs (Binance + Hyperliquid)

**Ranked by Total Return (90d):**

| Pair | Signals | WR% | TotR% | Freq/day | Trades | Verdict |
|------|---------|------|-------|----------|--------|---------|
| HYPE | 67 | 31.3% | **+9.78%** | 1.28 | 67 | ✅ High freq, positive total R despite low WR |
| BONK | 12 | 58.3% | **+2.72%** | 1.15 | 12 | ✅ Consistent, positive |
| SUI | 7 | 71.4% | **+0.67%** | 0.67 | 7 | ✅ Strong WR, positive |
| DOGE | 8 | 75.0% | **+0.59%** | 0.77 | 8 | ✅ Highest WR of the set |
| POPCAT | 6 | 50.0% | **+0.44%** | 0.58 | 6 | ✅ Neutral-positive |
| BTC | 6 | 66.7% | **+0.28%** | 0.58 | 6 | ✅ Above average WR |
| SOL | 9 | 55.6% | **+0.24%** | 0.86 | 9 | ✅ Frequent, slightly positive |
| WIF | 6 | 50.0% | **+0.14%** | 0.58 | 6 | ✅ Neutral-positive |
| XRP | 5 | 60.0% | **+0.09%** | 0.48 | 5 | ✅ Low freq, positive edge |
| ETH | 7 | 57.1% | **-0.51%** | 0.67 | 7 | ⚠️ Decent WR but net negative |
| AVAX | 9 | 55.6% | **-0.86%** | 0.86 | 9 | ⚠️ Decent freq but net loser |
| TAO | 6 | 16.7% | **-1.49%** | 0.58 | 6 | ❌ Worst performer — avoid |

### Strategy-Level Assessment

**BB Core 15m (this scan):** No live signals firing right now — all pairs are range-bound, no closes below BB lower band with RSI<20. The scan is a historical backtest, not live triggers. No positions to open.

**Current Market Context (20:36 HKT, Asian evening):**
- Previous cycle assessment still valid: low volume, range-bound consolidation (0.5-1.0x vol ratios)
- BTC +0.91% drift but volume -35% — no conviction
- ETH slight outperformance last session (+2.55%) but volumes still low
- No BB extremes (all positions 51-85% of band range)
- All funding rates near neutral (±1-2% annualized)

### Paper Position Review

- **Open Positions:** 0
- **Cash Balance:** $1,115.73 (from 2026-05-31)
- **Trades Today:** 0
- **Signals Triggered:** 0

### Energy / Perpetual / EV Assets

No dedicated energy/perpetual scripts found in active workspace. The scan covers HYPE (Hyperliquid perpetual) + standard perpetual pairs on Binance. No EV or energy sector assets in the current scan set.

### Verdict

**🟡 HOLD — No action.** No strategy fires in current market conditions:
1. BB Core — no oversold extremes hit (RSI 55-65 range on all pairs)
2. VolSurge — volume ratios all sub-1.0x
3. Funding — all neutral
4. Turtle Soup / TendersAlt — insufficient range structure

**Top-ranked pairs to watch:** HYPE (high frequency, positive drift but low WR — needs management), BONK (high WR + positive R), DOGE (75% WR)

**Next cycle:** 15 min (next auto-scan)
