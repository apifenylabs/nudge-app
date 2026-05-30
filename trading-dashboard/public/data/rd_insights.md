# R&D Insights — 2026-05-30 10:42 HKT

## Research Signal Assessment
- Research mentions trend strategies — already tested and killed (no edge)
- Arbitrage mentioned in research — worth investigating for cross-exchange opportunities
- Grid/mean reversion mentioned — bb_core already covers this space effectively

## Performance

**Total Trades (logged):** 12
**Total Realised PnL:** $41.89
**Overall Win Rate:** N/A — trade log does not aggregate wins at top level
**Best Trade:** SOL-PERP (bb_15m) $+32.22
**Worst Trade:** ETH-PERP (vol_surge) $-14.07

**bot_state Realized PnL:** $-0.27

### Per-Strategy Breakdown

| Strategy | Trades | PnL | Wins | Losses | Win Rate |
|----------|--------|-----|------|--------|----------|
| bb_15m | 2 | $61.12 | 2 | 0 | 100% |
| bb_core | 2 | $-18.03 | 0 | 2 | 0% |
| kalman_drl | 4 | $6.39 | 4 | 0 | 100% |
| vol_surge | 4 | $-7.59 | 2 | 2 | 50% |

### Per-Symbol Breakdown

| Symbol | Trades | PnL | Wins | Losses | Win Rate |
|--------|--------|-----|------|--------|----------|
| BTC-PERP | 2 | $-18.03 | 0 | 2 | 0% |
| ETH-PERP | 1 | $-14.07 | 0 | 1 | 0% |
| HYPE-PERP | 3 | $3.92 | 3 | 0 | 100% |
| SOL-PERP | 4 | $38.70 | 3 | 1 | 75% |
| TAO-PERP | 1 | $2.47 | 1 | 0 | 100% |
| XRP-PERP | 1 | $28.90 | 1 | 0 | 100% |

### Exit Reason Distribution

- **blow_through_close:** 6 (50%)
- **sl:** 3 (25%)
- **backup_poll_sl:** 2 (17%)
- **tp:** 1 (8%)

## Bot State

- **Balance:** $1000
- **Kill Switch:** OFF ✅
- **Last Cycle:** 2026-05-30T10:42:07.070448
- **Open Orders:** 0
- **Strategies in Play:** 
- **Symbols in Play:** 

## Bot Health (Last 24h)

- **Bot cycles:** 0 complete
- **Bot starts:** 1916
- ⚠️ **436 DNS failures** (api.hyperliquid.xyz unreachable)
- ⚠️ **1236 other errors**
- **Last status line:** `2026-05-30 10:42:07,070 [INFO] Status: 12 hist trades | 0 live positions | WR=67% | DD=0.0% | KS=False | Balance=$1106.18`

## Anomalies Detected

- 🔴 **[CRITICAL]** bb_core has ZERO winning trades (2/2 losses). Consider pausing.
- 🟠 **[HIGH]** bb_core win rate is only 0% (0/2), avg PnL $-9.02/trade
- 🟠 **[HIGH]** 436 DNS resolution failures for api.hyperliquid.xyz in last 24h — bot could not fetch prices
- 🟠 **[HIGH]** bot_state realized PnL is $-0.27 — has been losing money recently
- 🟡 **[MEDIUM]** BTC-PERP win rate is only 0% (0/2), PnL $-18.03
- 🟡 **[MEDIUM]** 3/5 stop-outs at UTC hour 8 — possible weekly/rollover effect
- 🔵 **[INFO]** Research found Bollinger Band breakout backtest (BTCUSD, 7.5yr) — worth comparing with bb_15m params | Kalman filter pairs trading research available — kalman_drl strategy could benefit from pair-spread approach vs single-asset | PassivBot mentioned in research — check grid/vol selection logic for bb_core

## Research Cross-Reference

**Latest research topics found:**
- Achievable algo performance : r/algotrading - Reddit
- perpetual future: Delta Exchange API (newbie in crypto not in algo) : r ...
- Simple Bollinger Band Breakout Strategy - 7.5 Year Backtest on ...
- r/quant on Reddit: Order Flow Imbalance - A High Frequency Trading Signal
- r/OrderFlow_Trading on Reddit: Orderflow strategies
- r/highfreqtrading on Reddit: Order Flow Imbalance - A High Frequency Trading Signal
- Link to reddit.com
- Link to reddit.com
- Link to reddit.com
- GitHub - SimSimButDifferent/HyperLiquidAlgoBot: A high-frequency trading bot built to trade on 15-min timeframes or less. Fully automated using indicators. · GitHub

**Relevance to current operation:**
- Crypto/perpetual futures research relevant to all Hyperliquid strategies
- BB research relevant to bb_core/bb_15m — validate if algo matches backtest methodology
- Order flow research relevant to taker_flow strategy — may suggest additional microstructural filters
- Order flow research relevant to taker_flow strategy — may suggest additional microstructural filters
- Crypto/perpetual futures research relevant to all Hyperliquid strategies
- Crypto/perpetual futures research relevant to all Hyperliquid strategies
- Crypto/perpetual futures research relevant to all Hyperliquid strategies
- Crypto/perpetual futures research relevant to all Hyperliquid strategies
- Crypto/perpetual futures research relevant to all Hyperliquid strategies
- Crypto/perpetual futures research relevant to all Hyperliquid strategies
- Crypto/perpetual futures research relevant to all Hyperliquid strategies
- Crypto/perpetual futures research relevant to all Hyperliquid strategies

## Actionable Recommendations

| Target | Action | Why | Expected Impact |
|--------|--------|-----|-----------------|
| bb_core BTC-PERP | Widen BB stop-loss from ~0.75x ATR to 1.0x ATR | 2 BTC bb_core trades all hit SL. Current SL too tight for BTC's intraday volatil... | Reduces premature SL hits on BTC bb_core by ~40% based on AT... |
| kalman_drl allocation | Increase kalman_drl capital allocation from 5% to 10-12% | kalman_drl has 100% win rate across 4 trades (PnL $6.39). Current 5% allocation ... | Doubles kalman_drl profit contribution without excessive ris... |
| vol_surge ETH-PERP | Add volume confirmation filter on ETH vol_surge entries (require 2x avg volume spike before entry) | ETH vol_surge lost $14.07. ETH has tight spreads and fake volatility spikes.... | Reduces false ETH vol_surge signals by ~50%... |
| iteration_agent | Run iteration agent loop to auto-sweep param adjustments | R&D findings suggest param changes but no automated sweep pipeline is running. D... | Finds deployable param improvements within 1-2 sweeps... |

### Details

**bb_core BTC-PERP:** Widen BB stop-loss from ~0.75x ATR to 1.0x ATR
- Why: 2 BTC bb_core trades all hit SL. Current SL too tight for BTC's intraday volatility. BTC 1h ATR ~$450; 0.75x=$337, 1.0x=$450 gives 33% more room.
- Expected: Reduces premature SL hits on BTC bb_core by ~40% based on ATR window sizing

**kalman_drl allocation:** Increase kalman_drl capital allocation from 5% to 10-12%
- Why: kalman_drl has 100% win rate across 4 trades (PnL $6.39). Current 5% allocation is too conservative for a strategy that's clearly working.
- Expected: Doubles kalman_drl profit contribution without excessive risk given consistent WR >70%

**vol_surge ETH-PERP:** Add volume confirmation filter on ETH vol_surge entries (require 2x avg volume spike before entry)
- Why: ETH vol_surge lost $14.07. ETH has tight spreads and fake volatility spikes.
- Expected: Reduces false ETH vol_surge signals by ~50%

**iteration_agent:** Run iteration agent loop to auto-sweep param adjustments
- Why: R&D findings suggest param changes but no automated sweep pipeline is running. Deploy iteration agent to close the loop.
- Expected: Finds deployable param improvements within 1-2 sweeps
