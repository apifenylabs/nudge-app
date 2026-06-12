## 2026-06-11 ~00:05 HKT — Full Microstructure Research Log (from Wosobu, multi-message)

### Source
Wosobu sent detailed research on institutional order flow, MMBM/MSSM quantification, and two-pipeline architecture for crypto (Aqua) vs TradFi (Lightning).

### Key Framework: MMBM as Microstructure, Not Chart Pattern
Market makers do NOT paint candles. MMBM is visual footprint of:
- Large block order execution
- Inventory rebalancing
- Regime-switching microstructure

### Three Proprietary Indicators (Crypto)

**1. Order Book Imbalance (OBI)**
- Measures structural supply/demand skew at inside market quotes
- Calculated from L2 snapshots (100ms granularity)
- Sign: OBI > +0.70 sustained inside a range = institutional algo quietly absorbing sell orders without letting mid-price rise
- OBI < -0.70 sustained = distribution/accumulation in progress

**2. Cumulative Volume Delta (CVD)**
- Running sum of aggressive market orders hitting passive limit orders
- Key use: When price prints new low but CVD refuses to make new low = **mathematical proof of Liquidity Hunt**
- Retail sellers market-sell, institutional resting limit block swallows inventory whole
- CVD divergence identifies fakeouts before price reverses

**3. Hawkes Process Intensity (λ_t)**
- Self-excitation / clustering of trade arrivals
- When λ_t breaks past rolling baseline = large block orders being broken up into execution algorithm stream
- Indicates impending expansion before BB band break

### Multi-State HMM Classifier (Core Math)
Replace fixed indicator thresholds with 2-state Hidden Markov Model:

| State | Name | Characteristics |
|-------|------|----------------|
| 0 | Stationary Accumulation/Distribution | Low VPIN, mean-reverting, tight OBI oscillations |
| 1 | Directional Expansion | High trade arrival intensity, persistent OBI structural skew, accelerating CVD |

- Feed features: log-returns, OBI, CVD, Hawkes intensity, VPIN
- HMM emits probability of being in each state in real-time
- **Critical insight**: Mean reversion strategies eat money in State 1 (expansion). HMM tells you when to switch from reversion → momentum, or to flat.

### Part 2: TradFi Equities (Project Lightning) — Separate Architecture

Key differences from crypto:
- **Fragmented liquidity**: 16+ lit exchanges (NASDAQ, NYSE, Cboe) + dozens of dark pools
- **Single exchange OBI is blind** — calculates only a fraction of real depth
- **SIP (Securities Information Processor)** gives NBBO but no full depth
- **Solution**: Use consolidated tape (SIP) for price, but need direct-feed or alternative data for microstructure metrics
- **Alternative data for Lightning**: Tick-level TRF (Trade Reporting Facility) data, ADF (Alternative Display Facility), or broker-specific algo-routing metrics
- IBKR L2 data is **exchange-specific only** → cannot compute true OBI/CVD without multi-feed aggregation
- **Recommendation for Lightning**: Start with MES micro futures (CME data is centralized, cleaner), use traded volume profiles + cumulative delta from futures tape rather than fragmented equities

### Immediate Aqua Application Priority

1️⃣ **OBI — Order Book Imbalance** (highest impact, lowest effort)
- Wire into aqua orchestrator filter chain
- Receive L2 snapshots from Hyperliquid WS (already being connected)
- Compute: OBI = (bid_volume - ask_volume) / (bid_volume + ask_volume) at top 5 levels
- Filter: Reject BB reversion LONG entry if OBI < -0.5 (flow is still bearish, catching a knife)
- Filter: Reject SHORT entry if OBI > +0.5 (flow still bullish)
- Estimate: 2-3h integration, pure filter addition

2️⃣ **CVD — Cumulative Volume Delta** (medium effort)
- Requires trade tape stream (HL WS has it)
- Compute: delta = sum(buy_trade_volume) - sum(sell_trade_volume) over rolling window
- Divergence detection: price making new low + CVD making higher low = liquidity hunt = reversal imminent
- Use as pre-BB entry trigger (cannot enter reversal until CVD diverges)

3️⃣ **HMM — Hidden Markov Model** (Phase 3)
- Replace or supplement Hurst DFA gate
- Train 2-state HMM on OBI + CVD + returns features
- Output: probability of expansion state. BB reversion disabled when expansion prob > 0.7
- Complexity: needs ~1 month of training data, offline calibration, periodic retraining
- Shelf until v32 is live and we have 200+ trades of data

4️⃣ **Hawkes Process** (lowest priority)
- Computationally heavy real-time estimation
- Better for tick-level data than 15m bars
- Revisit when we have sub-minute execution

### Key Insight for DFA Improvement
Current DFA uses single Hurst exponent (H ≈ 0.5 = random walk, H < 0.5 = mean reverting). HMM approach is superior because:
- Hurst is a single value for entire window — blends range + expansion together
- HMM emits a **probability** of which regime we're in — can be partial (70% expansion = 70% position size reduction)
- HMM + Hurst together: use Hurst as one of several features fed to HMM

### Decision: Accept as Research Input for Phase 3
- Accepted: OBI as Phase 2.5 filter (after v32 stabilizes)
- Accepted: HMM concept replacing DFA in Phase 3
- Accepted: CVD divergence as future entry trigger refinement
- Shelved: Hawkes Process and Lightning-specific microstructure (no data pipeline)
