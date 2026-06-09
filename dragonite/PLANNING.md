# Dragonite — IKBR Trading Project Plan

## Mission
Take $800 USD in Interactive Brokers → $200k using systematic, crypto-style trading adapted for forex and US equities.

## Philosophy
- Same DNA as crypto bots (BB core, trend following, momentum) but adapted for IKBR instruments
- Aggressive early ($800-$10k), scale protection later ($10k+)
- **Don't blow up** — risk controls are non-negotiable at every stage
- Paper → small live → scale: prove edge before increasing size

## Three-Phase Roadmap

### Phase 1: Foundation ($800 → $5,000)
**Focus:** Forex majors only (EUR/USD, GBP/USD, USD/JPY)
**Speed:** Aggressive (3% risk/trade, 30:1 leverage)
**Timeline:** 2-3 months if strategy works

| Instrument | Why | Leverage | Max Risk/Trade |
|-----------|-----|----------|----------------|
| EUR/USD | Tightest spread, best liquidity, trends well | 30:1 | 3% ($24) |
| GBP/USD | More volatility = more opportunity | 30:1 | 2.5% ($20) |
| USD/JPY | Clean trend structure | 30:1 | 2% ($16) |

**Strategy:** Trend-following adapted from crypto BB core. Entry on pullback to 20-period EMA with RSI confirmation. 1.5R target, 0.75R stop.

**Risk budget:** Max 10% portfolio at risk across all open positions. Daily loss limit: 6% of account.

---

### Phase 2: Growth ($5,000 → $50,000)
**Focus:** Add small-cap momentum stocks + leveraged ETFs
**Speed:** Moderate (2% risk/trade)
**Instruments:**
- Forex majors (continue)
- TQQQ (3x Nasdaq) / SOXL (3x semis)
- Top 20 S&P momentum stocks via volume screener
- Weekly call options on SPY/QQQ (max 10% of portfolio)

**Risk budget:** Max 8% portfolio at risk. Daily loss limit: 4%.

---

### Phase 3: Scale ($50,000 → $200,000)
**Focus:** Diversified multi-strategy
**Speed:** Conservative (1-1.5% risk/trade)
**Instruments:**
- Forex + stocks + options + futures
- Multi-strategy (trend, mean reversion, event-driven)
- Automated execution with human oversight

**Risk budget:** Max 5% portfolio at risk. Daily loss limit: 2%.

---

## Risk Controls (HARD RULES)

1. **Max single trade:** 3% of account value (Phase 1), scales down as account grows
2. **Max open positions:** 3 concurrent (Phase 1)
3. **Max portfolio at risk:** 10% across all open trades
4. **Daily loss limit:** 6% of account — stop trading for the day if hit
5. **Weekly loss limit:** 12% of account — stop trading for the week
6. **Drawdown kill switch:** -30% from peak = stop all trading, reassess strategy
7. **No 0DTE options** (gambling, not trading)
8. **No margin calls** — position size so worst-case scenario stays within available capital
9. **Always set stops** — every position gets a hard stop-loss at entry

---

## Instrument Selection Rationale

### Forex (Phase 1)
| Criteria | EUR/USD | GBP/USD | USD/JPY | USD/CHF | AUD/USD |
|----------|---------|---------|---------|---------|---------|
| Spread cost | ✅ 0.59 pip (lowest) | ✅ 0.8 pip | ✅ 0.7 pip | ✅ 0.8 pip | ⚠️ 1.0 pip |
| Volume | ✅ Highest | ✅ High | ✅ High | ⚠️ Medium | ⚠️ Medium |
| Trend quality | ✅ Strong | ✅ Strong | ✅ Good | ⚠️ Choppy | ⚠️ Mixed |
| Correlation | — | ✅ Low with EUR | ✅ Low with EUR | ❌ High with EUR | ✅ Low |

**Final 3:** EUR/USD (primary), GBP/USD, USD/JPY

### US Stocks (Phase 2+)
When we reach Phase 2, screen for:
- **Volume:** > 5M shares/day (liquidity)
- **RSI:** Trending (RSI 50-70, not overbought/oversold)
- **ATR:** > 2% daily move (volatility for small accounts)
- **Sector:** AI/semiconductor/tech momentum (NVDA, AMD, AVGO, etc.)
- **Leveraged options:** TQQQ, SOXL, FNGU for small-cap leveraged exposure

### Options (Phase 2+, 10% max of portfolio)
- Weekly calls on SPY/QQQ for asymmetric upside
- Iron condors for income (when account > $10k)
- **NEVER** 0DTE, **NEVER** more than 10% of portfolio

---

## Key Decisions Made
- ✅ **Broker:** IKBR (keep the $800 already there, lowest fees, multi-asset)
- ✅ **Phase 1 instrument:** Forex majors (EUR/USD, GBP/USD, USD/JPY)
- ✅ **Risk model:** Aggressive but controlled (3% per trade, kill switches in place)
- ✅ **Strategy type:** Trend-following (BB/EMA hybrid, like crypto)
- ✅ **File structure:** Aqua-style (execution / strategies / research / monitoring / tests)
- ✅ **Build order:** Connector → Backtest → Paper trade → Live
