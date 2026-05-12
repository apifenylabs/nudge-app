# Prop Trading Funding — Complete Research (2026)

> **Last updated:** 2026-05-13
> **Sources:** Web research across 15+ prop firm review sites, comparison platforms, and industry analysis

---

## 1. Best Prop Firms for Algorithmic / Automated Trading

### Top-Tier Algo-Friendly Firms

| Firm | Best For | EAs/Bots | Profit Split | Max Account | Platforms |
|------|----------|----------|-------------|-------------|-----------|
| **FTMO** | Reliability, brand trust | ✅ Allowed | 80–90% | $1M | MT4, MT5, cTrader |
| **FundedNext** | Budget entry, earn-while-passing | ✅ Allowed | 60–95% | $4M | MT4, MT5, cTrader |
| **The5ers** | Live accounts from start | ✅ Allowed (no HFT) | 80% | $4M | MT4, MT5 |
| **Funded Trading Plus** | Instant funding available | ✅ Allowed | 80–90% | $2.5M | MT4, MT5, DXtrade, cTrader |
| **FunderPro** | Time-free challenges | ✅ EAs permitted | Up to 90% | $200K | MT5 |
| **Blue Guardian** | Drawdown protection | ✅ Allowed | Up to 85% | 4:1 scaling | MT4, MT5 |
| **SabioTrade** | Multi-market algo trading | ✅ Allowed | Up to 90% | Multiple | Multiple |
| **E8 Markets** | Minimal restrictions | ✅ Allowed | 80% | $1M | MT4, MT5, cTrader |

### Key Insight for Algo Traders

- **FTMO** is the industry benchmark — most trusted, most transparent about rules
- **The5ers** puts you on real (not simulated) capital — execution quality matches real markets
- **Funded Trading Plus** and **FunderPro** have the clearest, most permissive EA policies
- **Apex Trader Funding** (futures) offers 100% of first $25K in profits — best for high-performers
- **FTMO** and **Topstep** are best for futures; **FTMO** and **SabioTrade** for forex/crypto

---

## 2. Banned vs Allowed Strategies

### 🚫 Generally Banned (ALL firms)

| Strategy | Why Banned | Example Firms That Explicitly Ban |
|----------|-----------|----------------------------------|
| **Martingale** | Doubling down on losses violates risk rules, can blow account | FTMO, Topstep, Apex, The5ers, FundedNext |
| **Grid trading** | Creates artificial losses to exploit rules, non-market behavior | FTMO, Apex, most futures firms |
| **Latency arbitrage** | Exploits platform delays, considered abuse | FunderPro, Funded Trading Plus, E8 Markets |
| **HFT / Tick scalping** | Generates excessive data, some firms ban <10s trades | The5ers (bans HFT), many crypto firms allow |
| **Hedging across accounts** | Copying trades between prop firm and personal accounts | All firms — instant disqualification |
| **Negative slippage / ECN abuse** | Exploiting broker price feeds | All firms — considered fraud |
| **Reverse correlation arbitrage** | Automated pair trading exploiting feed differences | All major firms |

### ✅ Generally Allowed

| Strategy | Notes | Compatible Firms |
|----------|-------|-----------------|
| **Trend following** | Most common funded strategy | All firms |
| **Swing trading** | Best with static (balance-based) drawdown | FTMO, FundedNext |
| **Scalping (manual)** | Allowed by most, some firms restrict <30s | FTMO, Apex, E8 Markets |
| **News trading** | Restricted by some (no trading ±2 min NFP) | FTUK, Funded Trading Plus (allows); FTMO (restricted) |
| **Algo / EA / Bot** | Allowed with standard risk rules | See section 7 below |
| **Copy trading** | Often banned unless platform-integrated | Most ban personal copy trading |

### Drawdown Type Matters More Than Banned Strategy Lists

This is critical — different drawdown types interact with your strategy:

| Drawdown Type | How It Works | Best For | Worst For |
|--------------|-------------|----------|-----------|
| **Static (balance-based)** | Floor fixed at % of starting balance | Swing traders, strategies with large wins | Less relevant |
| **Trailing (intraday)** | Floor follows equity in real-time | Scalpers, low-vol strategies | Swing traders, trend followers |
| **Trailing (end-of-day)** | Floor updates at market close | Day traders, moderate volatility strategies | Intraday peak strategies |

**FTMO** = 10% static (balance-based) — most forgiving for swing strategies
**Topstep** = Trailing intraday — tightest for trend followers
**Apex** = Trailing EOD — middle ground
**The5ers** = 6% balance-based (Hyper Growth) — tight absolute limit

---

## 3. Can TendersAlt Fib Strategy Pass a Prop Firm Eval?

### Strategy Profile (inferred from name + common knowledge)

TendersAlt Fib appears to be a **Fibonacci-based trend/retracement strategy** — entries at Fib levels with structured exits and risk management.

### Compatibility Assessment

| Factor | Compatibility | Notes |
|--------|--------------|-------|
| **Martingale risk** | ✅ Unlikely (Fib strategies are structured) | No risk — Fib uses fixed levels |
| **Grid trading** | ✅ Unlikely | Fib-based entries are discrete levels, not grid |
| **Holding time** | ✅ Usually 1-48h (swing/day) | Compatible with FTMO static drawdown |
| **TP/SL structure** | ✅ Usually fixed SL/TP | Compatible with all firms |
| **Daily loss limit** | ⚠️ Depends on position sizing | Must size for 3-5% daily loss limits |
| **Profit lumpiness** | ⚠️ If big winners are rare | Avoid consistency-rule firms if profit is uneven |
| **Frequency** | ✅ Typically 1-5 trades/day | Below HFT triggers |

### Recommended Firm for TendersAlt Fib

**Primary: FTMO (forex/indices)**
- Static 10% drawdown — most forgiving
- No time limit
- No consistency rule
- Weekend holding allowed on Swing accounts
- EA/bot execution permitted

**Alternative: FundedNext** (more budget-friendly)
- Same 10% static drawdown
- 15% profit share during challenge phase
- Lower entry fees ($32 for $6K)

### What To Check Before Buying a Challenge

1. Run the EA on a demo for 30+ trades — measure max drawdown and max daily loss
2. If max daily loss > 3% of account, reduce position size
3. If the strategy's maximum drawdown > 8%, use FTMO (10% static) not The5ers (6%)
4. If profit is concentrated in a few days, choose FTMO over FundedNext (consistency rule)
5. Ensure the EA doesn't trade news events if the firm restricts them

---

## 4. Cheapest Way to Get Funded

### Price Table — Best Value by Account Size

| Account Size | Cheapest Option | Price | Alternative | Price |
|-------------|----------------|-------|-------------|-------|
| **$5K** | FundingPips 2-Step | **$49** | TTT Markets 2-Step | $49 |
| **$10K** | FundingPips | **$99** | FundedNext | $116 |
| **$25K** | TTT Markets | **$199** | Apex (discounts often 80% off) | ~$60 with promo |
| **$50K** | FundingPips | **$299** | FTMO | ~$350 ($360 w/o discount) |
| **$100K** | FundedNext | **$329** | FTMO | ~$540 (refunded on first payout) |
| **$150K+** | Apex (futures, 80% discount) | **~$60-100** | FTMO 200K | $1,080 |

### Rock-Bottom Entry Points

- **$49** — FundingPips $5K (2-step, verified payouts)
- **$49** — TTT Markets $5K (2-step, EA allowed)
- **$32** — FundedNext $6K (2-step, earn during challenge)
- **$13** — Some discount promos (check fundedtrading.com)
- **$44** — Instant Funding (skip challenge, pay for access; e.g., InstantFunding.com)

### Smart Cost Strategy

1. **Start small:** Pass a $5K challenge first ($49) to learn the firm's rules
2. **Use discount codes:** Most firms offer 5-20% off (check ResponsibleTrading.com)
3. **Time purchases:** Black Friday, firm anniversaries can give 20-50% off
4. **Pass rate math:** A $49 challenge needing 4 attempts = $196. A $150 challenge passed first time = cheaper

### Cheapest $50K Challenge Options

| Firm | Price | Structure | Notes |
|------|-------|-----------|-------|
| FundingPips | **$299** | 2-Step, no time limit | Verified payouts |
| FTMO | ~$350 | 2-Step, no time limit | Fee refunded on first payout |
| Apex (futures) | ~$60 (80% off) | 1-Step, 7 min days | Futures only |
| The5ers | ~$200 | 2-Step, real account | Tighter drawdown (6%) |
| E8 Markets | ~$175 | 1-Step | Minimal restrictions |

---

## 5. Payout Structure and Scaling

### Profit Splits (Industry Comparison)

| Firm | Standard Split | Max Split | When It Increases |
|------|---------------|-----------|-------------------|
| **Apex** | 100% of first $25K | 90/10 | After $25K threshold |
| **Topstep** | 100% of first $10K | 90/10 | After $10K threshold |
| **FTMO** | 80/20 | 90/10 | After proving consistency |
| **FundedNext** | 80/20 (evaluation) | 95/5 | Through scaling tiers |
| **The5ers** | 80/20 | 80/20 | Scaling grows capital (up to $4M) |
| **FunderPro** | Up to 90% | 90/10 | Via scaling milestones |
| **SabioTrade** | Up to 90% | 90/10 | Via scaling |

### Max Drawdown Limits

| Firm | Max Drawdown | Daily Loss | Type |
|------|-------------|-----------|------|
| FTMO | 10% | 5% | Static (balance-based) |
| FundedNext | 10% | 5% | Static |
| Topstep | Varies ($3K trail) | Fixed dollar | Trailing intraday |
| Apex | Varies ($1.5K+ trail) | 4-5% | Trailing EOD |
| The5ers | 6% | 3% | Balance-based |
| MyFundedFX | 8% | 5% | Balance-based |
| FunderPro | 8% | 4% | Balance-based |

### Consistency Rules — The Hidden Trap

| Firm | Consistency Rule | Impact |
|------|-----------------|--------|
| **FTMO** | ❌ No consistency rule | Best for strategies with lumpy profits |
| **FundedNext Evaluation** | ✅ No single day > 30% of total profit | Requires steady income curve |
| **Topstep** | Scaling limits prevent oversized trades | Structure regulates sizing |
| **Apex** | ❌ No explicit consistency rule | Fairly permissive |
| **The5ers** | 30% consistency rule (some models) | Check specific program |
| **FunderPro** | ❌ No consistency rule | Permissive |

### Scaling Programs

| Firm | Max Cap | Timeline to Max |
|------|---------|-----------------|
| The5ers | $4M | 6-12 months |
| FundedNext | $4M | Scaling tiers (prove consistency) |
| FTMO | $1M (from $100K max initial) | Graduated scaling |
| Topstep | Unlimited (Express accounts) | Add accounts as profitable |
| Apex | Multiple accounts (combine) | Proving period varies |

### Payout Frequency

| Firm | First Payout | Subsequent | Processing Time |
|------|-------------|-------------|-----------------|
| FTMO | After 14 days of funded trading | Every 14 days | 3-7 business days |
| FundedNext | Immediate (24h typical) | Bi-weekly | <24 hours reported |
| Apex | $500 minimum, monthly | Monthly | 3-5 days |
| Topstep | $100 minimum | Weekly/bi-weekly | 1-3 business days |
| The5ers | Monthly | Monthly | 3-10 business days |
| FTUK | After 14 days | Every 14 days | 1-3 days |

---

## 6. Timeline: Eval to Payout

### Full Journey Timeline (Realistic)

| Phase | Duration | Notes |
|-------|----------|-------|
| **Step 1: Purchase + Setup** | Day 1 | Instant, after payment |
| **Step 2: Evaluation (Phase 1)** | 15–45 days (one-step) / 30–90 days (two-step) | Depends on challenge structure |
| **Step 3: Verification (Phase 2)** | 7–30 days (varies by model) | Simpler for one-step firms |
| **Step 4: KYC/Onboarding** | 3–7 days after passing | Identity verification |
| **Step 5: First Funded Month** | 14–30 days trading | Must hit minimum trading days + profit rules |
| **Step 6: First Payout Request** | Day of request + 1-14 days processing | Varies by firm |
| **Total: Eval → First Payout** | **30–120 days** (average 60–90 days) | |

### Timeline by Challenge Type

| Challenge Type | Avg Pass Time | First Attempt Rate | Total to First Payout |
|---------------|--------------|-------------------|----------------------|
| One-Step Evaluation | 15–45 days | 15–20% | 30–60 days |
| Two-Step Evaluation | 30–90 days | 5–10% | 60–120 days |
| Instant Funding | 7–21 days (to payout threshold) | N/A | 14–30 days |
| No Time Limit | 40–120 days | Higher for disciplined | 70–150 days |
| Time-Bound (30-day) | 25–50 days | Lower (pressure) | 50–90 days |

### Learning Curve Reality

| Attempt | Pass Rate | Average Time |
|---------|-----------|--------------|
| 1st attempt | 5–10% | 45–60 days |
| 2nd attempt | 15–25% | 30–40 days |
| 3+ attempts | 20–30% | 20–35 days |

**Reality:** Only 7% of traders ever receive a payout. Most require 2-3 attempts to pass the evaluation. Budget accordingly.

### Fastest Path to Payout

1. Choose an **instant funding** firm (no eval, pay for access): 14–30 days
2. Choose a **1-step evaluation** (FTMO removed time limits; others offer single phase): 30–60 days
3. **Day trade/scalp** to accumulate profits faster: 20–40 days pass time
4. Pick firms with **24-hour payouts** (FundedNext, Crypto Fund Trader, Hola Prime)

---

## 7. Prop Firms Explicitly Allowing EA / Algo Trading

### Top 11 Algo-Friendly Firms (Detailed)

| Firm | EA Policy | Key Algo Perk | Platforms | Entry Fee ($50K) |
|------|-----------|--------------|-----------|-----------------|
| **SabioTrade** | ✅ Yes, follow risk rules | Multi-market, 90% split | Multiple | ~$250 |
| **Blueberry Funded** | ✅ Yes, broker-backed | Real-time data tools | Multiple | ~$200 |
| **DNA Funded** | ✅ Yes, encourages tracking | 1-phase, no time limit | TradeLocker | ~$150 |
| **FunderPro** | ✅ Yes, all EAs unless abuse | No time limit, MT5 | MT5 | ~$200 |
| **Funded Trading Plus** | ✅ Yes, across all accounts | Instant funding available | MT4/MT5, DXtrade | ~$250 |
| **FTUK** | ✅ Yes, risk-based rules | Real account from start | MT4/MT5 | N/A (instant) |
| **Blue Guardian** | ✅ Yes, most EA setups | Guardian Protector (risk tool) | MT4/MT5 | ~$150 |
| **The5ers** | ✅ Yes, no HFT | Live account day one | MT4/MT5 | ~$200 |
| **E8 Markets** | ✅ Yes, minimal restrictions | 1-step, fast scaling | MT4/MT5, cTrader | ~$175 |
| **FTMO** | ✅ Yes | Industry benchmark | MT4, MT5, cTrader | ~$350 |
| **Apex (futures)** | ✅ Yes | Futures-specific, cheap eval | Tradovate, NinjaTrader | ~$60 (discount) |

### EA-Specific Restrictions to Check

| Restriction | Firms That Enforce | Impact |
|------------|-------------------|--------|
| HFT / < 10s trades | The5ers, some firms | Fib strategies NOT affected |
| Latency arbitrage | FunderPro, most firms | Fib strategies NOT affected |
| Copy trading ban | All major firms | NOT affected (running one EA) |
| News trading restriction | FTMO, Topstep | Check if EA trades news |
| Grid/martingale detection | All firms | Fib strategies NOT at risk |
| Consistency rules | FundedNext | May affect lumpy Fib profits |

---

## 8. Crypto-Specific Prop Firms

### Yes, Crypto Prop Firms Exist — And They're Growing Fast

The crypto prop trading sector surpassed **$20 billion in 2025** with accelerating momentum in 2026. These are genuine, purpose-built firms — not just forex firms adding crypto as an afterthought.

### Best Crypto-Only / Crypto-First Prop Firms

| Firm | Profit Split | Max Account | Crypto Leverage | Pairs | Platforms |
|------|-------------|-------------|-----------------|-------|-----------|
| **Crypto Fund Trader** | 80/20 | $300K | Up to **100x** | 710+ pairs | CFT, MT5, Bybit |
| **HyroTrader** | Up to 90% | $1M | Up to **100x** | Extensive | Cleo, Bybit (demo) |
| **Hola Prime** | Up to 95% | $4M | 5x (BTC/ETH) | 110+ coins | MT5, Match-Trader, cTrader, DXtrade |
| **FX2 Funding** | Up to 95% | $2M | 2x | Limited pairs | MT5, cTrader, DXtrade |
| **FTMO** | Up to 90% | $1M | 3x | 32+ crypto pairs | MT4, MT5, cTrader |
| **FundedNext** | Up to 95% | $4M | 1x | Compact list | MT4, MT5, cTrader |
| **Funded Trading Plus** | Up to 90% | $2.5M | 2x | Broad crypto | MT4, MT5, DXtrade, cTrader |
| **PipFarm** | Up to 95% | $1.5M | 5x | Good selection | cTrader |

### Key Crypto Prop Firm Advantages

1. **Higher leverage** — Up to 100x on crypto (vs 1:30 forex max)
2. **Weekend trading** — Crypto trades 24/7, most firms allow weekend holds
3. **Broader coin selection** — 700+ pairs at Crypto Fund Trader
4. **Crypto-native evaluation** — 1-step challenges common
5. **Faster payouts** — Many process within 24 hours (crypto withdrawals)

### Is Crypto or Forex Better for Algo Prop Trading?

| Factor | Crypto | Forex |
|--------|--------|-------|
| **Leverage** | Up to 100x ✅ | Up to 30:1 |
| **Trading hours** | 24/7 ✅ | 24/5 |
| **Firm track record** | Newer (less proven) | 5-10 year track records ✅ |
| **Strategy freedom** | More permissive ✅ | More rules/restrictions |
| **Platform support** | Growing (Bybit, DXtrade) | Mature (MT4/MT5, cTrader) ✅ |
| **Payout speed** | 24h typical ✅ | 1-14 days |
| **Brand trust** | Less established | FTMO = industry gold standard ✅ |

### Best Approach: Hybrid

Most algo traders should start with **forex prop firms** (FTMO, FundedNext) for proven payout reliability and established rules, then expand into **crypto prop firms** (Crypto Fund Trader, Hola Prime) for higher leverage and 24/7 trading once the strategy is proven.

---

## Summary: Action Plan for TendersAlt Fib Strategy

1. **Best fit firm:** FTMO ($100K challenge, ~$540, 10% static drawdown, no consistency rule, EA allowed)
2. **Backup option:** FundedNext ($100K, ~$329, 15% profit share during eval, but has consistency rule)
3. **Expected cost:** $50-540 for $50-100K challenge
4. **Expected timeline:** 60-90 days eval → first payout (realistic with 1-2 attempts)
5. **Profit potential:** Keep 80-90% of profits, scale to $1M+ capital
6. **Crypto alternative:** Crypto Fund Trader (up to 100x leverage, 710+ pairs, faster payouts)
7. **Biggest risk:** Daily loss limits — must ensure EA never loses >5% in a single day
8. **Budget for:** At least 2-3 challenge attempts ($100-1,500 total)

### Quick-Start Checklist

- [ ] Backtest TendersAlt Fib with a prop firm daily loss limit of 5% embedded
- [ ] Measure strategy's max drawdown — must fit within chosen firm's limit
- [ ] Run EA on MT4/MT5 demo for 60+ trades (~1 month)
- [ ] Choose firm: FTMO (safest) or FundedNext (cheaper, has consistency rule)
- [ ] Use discount codes for 10-20% off challenge fee
- [ ] Start with $50K or $100K challenge
- [ ] During eval: let the EA run, monitor daily loss limits
- [ ] After passing: let the EA run on funded account, request first payout after 14+ trading days

---

### Sources

- blog.pickmytrade.trade (Best Algo Firms 2026)
- propfirmplus.com (Algo Allowed Rules 2026)
- kraken.com/learn (Best Crypto Prop Firms 2026)
- coinspot.io (Crypto Prop Firms Review 2026)
- tradersdna.com (Cheapest Challenges 2026)
- propjournal.net (Prop Firm Rules Comparison 2026)
- joinprop.com (Challenge Timeline Data 2026)
- vettedpropfirms.com (EA-Friendly Firms 2026)
- apextraderfunding.com (Rules Explained 2026)
- tradersecondbrain.com (Rules Cheatsheet 2026)
- tradezella.com (Prop Firm Guide 2026)
- aivyne.com (Timeline to Get Funded)
