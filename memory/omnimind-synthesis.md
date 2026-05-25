# OmniMind Synthesis Report

## 2026-05-25 (Monday) — Daily Synthesis

Generated: 2026-05-25T03:00 HKT (Backup Run) | Window: May 19–25, 2026

---

## 1. Cross-Day Pattern Analysis

### Pattern A: The Live Trading Breakthrough (May 23→25)
**Arc**: Paper-only ($500, BB Core 88% WR) → Live HL deployment ($40.59, balance bug) → Real live trading ($112, 7 closed trades, 67% WR, TP/SL workaround)
- May 23: Kalman DRL deployed, 5% alloc, $500 paper
- May 24: **CRITICAL** — discovered balance was being read from perp `clearinghouseState` ($0) instead of portfolio endpoint. Bot WAS NOT trading live for days despite reporting $41 balance. Fix applied, live verified at $40.59.
- May 25: Wosobu deposited SOL → $112 portfolio. TP/SL workaround deployed (resting reduce-only limit GTC orders). ETH short at +$9.72 UPnL. Portfolio at $117.12 (+$4.13 in 24h).
- **Key repeating theme**: Every live milestone has a hidden bug that silently invalidates all prior confidence. Gold Template's killswitch gate would have caught clearinghouseState issue earlier.

### Pattern B: "Promising Finding → Fails in Real Conditions" (Repeating)
- CrypNuevo on BTC/ETH: OHLCV-only passes theory → cross-asset test fails (BTC 28% WR, ETH 30%)
- Grid BB walk-forward: Train PF 2.39 → Test PF 0.84 (65% edge decay)
- TendersAlt: 41.3% WR, -72.2% PnL in bearish flush
- Ensemble stress test: ALL 12 perps fail profitability gates
- **Contradiction**: SOL Vol Surge (89.8% WR, PF 17.51) and BB Core (88% WR) remain the only strategies that hold up across days. Everything else decays in real conditions.
- **Insight**: The gap between paper backtest and live conditions is the single largest risk factor. May 24's balance bug is a perfect example.

### Pattern C: Infrastructure Debt Accumulates Faster Than Product Output
- 19 crons, 8 sites, 3 SaaS products, active trading bot, multiple research agents
- Blockers are ALL Wosobu-dependent and haven't moved in 5+ days: Supabase migration, GitHub PAT expiry, Stripe keys, affiliate accounts
- **Repeating theme**: Week 1 of the 1-month roadmap (May 24-30) is "Infrastructure & Gates" — exactly what's blocked
- **Risk**: Trading is consuming 70%+ of execution energy while product revenue is $0.00. The 70/30 rule (70% revenue projects) is being violated in practice.

### Pattern D: Phantom Performance Metrics
- COINT_PAIRS generating fake +868,440% PnL from 2021 signals reconciled against 2026 prices
- Old connector had silent paper fallback → false "live trading" confidence
- Paper WR of 88-90% on BB Core hasn't been tested with real funding costs, slippage, or HL perp fees
- **Warning**: Without the Gold Template's killswitch/epistemic gates applied to the live system, the bot may be confidently trading a strategy that only works in backtest

### Pattern E: The $500 → $0 → $112 Trust Arc (NEW — consolidated from May 23-25)
- **May 23 memory**: "Account balance: $500.00" — treated as fact
- **May 24 discovery**: Balance was $0 (perp clearinghouseState), bot never trading live, paper fallback silently reported $41
- **May 25**: Actual real balance after Wosobu's SOL deposit = $112 ($40 USDC originally in spot wallet + $85.68 SOL sold)
- **Three-level illusion**: (1) Thought $500 paper → (2) Actually $0 → (3) Real is $112. Each layer peeled back a false assumption.
- **Corollary**: Any confidence expressed before May 24 about "live trading" is invalid. The first real live trade executed on May 24 at ~11:03 HKT.
- **Synthesis**: This is the most important trust lesson in the entire week. Never report a balance without verifying the exact API endpoint.

### Pattern F: Gold Template v2 Toolset (NEW — missing from prior synthesis)
- Built May 19-20: Epistemic Gate, Killswitch Gate, Rolling Optimizer — 3 scripts
- **Epistemic Gate**: Correctly blocks BB(10,2.0) RSI<15 at 16% confidence — quantifies uncertainty
- **Killswitch Gate**: Paper gate fails 78 trades @ 48.7% WR < 55% requirement — automated shutoff
- **Rolling Optimizer**: 62 windows, proves params shift every 3-6 months — dynamic re-optimization needed
- **Status**: Still not applied to production live bot. This is a gap between tool and execution.
- **12 gaps identified** in GOLD_V2_GAP_ANALYSIS.md — foundational document for production readiness

### Pattern G: Non-Crypto Fringe Findings (NEW — largely unsynthesized before)
- **SPY Grid** (May 19): BB(10,1.5) RSI<25 — 88.9% WR, PF 11.26, DD -2.9%, Sharpe 6.17. Paper-trade candidate, never revisited.
- **Forex** (May 19-20): AUDUSD WR 58%, PF 1.48 — 0.52 from gate. Using ADX filter + session overlap could push it over.
- **Equity screener** (May 23): FMP free tier selected (250 calls/day), script not written yet.
- **Status**: All non-crypto research is blocked at "interesting finding → never implemented" stage.

### Pattern H: Autonomous Work Engine is Functioning But Fragmented
- May 22→24: Building while Wosobu sleeps (LifeOS plugins, Kalman DRL deployment, forum mining)
- Each session produces a long action list → next session doesn't execute it (e.g., "Wire core_bb playbook" has been pending since May 22)
- **Recommendation**: The action queue needs pruning — distinguish true blockers (need Wosobu) from genuine backlog items

### Pattern I: The Revenue Crisis Deepens (NEW — amplified from raw data)
- May 19: Content generation blitz (+15 blog posts, affiliate IDs placed across 5 travel sites). All 200 site pages green.
- May 22 late session: Affiliate tracking dashboard built (18 AI tool links, click tracking API) — **NEVER DEPLOYED**
- May 22: Titan v0.61 shipped with agent evolution UI
- May 24: Roadmap shows Week 1 "Infrastructure & Gates" but all monetization paths blocked on Wosobu
- May 25: $0 revenue across ALL products. The affiliate tracking app has no real clicks because it was never deployed.
- **Pattern**: Building monetization infrastructure → never shipping/activating → $0 revenue.
- **Specific**: The 70/30 rule says 70% effort on revenue projects, but execution shows trading + LifeOS consuming 70%+ while product output stays at demo stage.

---

## 2. Key Contradictions

| Statement | Counter-Statement | Source |
|-----------|------------------|--------|
| BB Core 88% WR / 14.72 PF | Long-only on perps failed ALL 12 pairs in stress test | May 22 |
| Live bot trading May 20+ | Bot was reading $0 balance, NOT trading live | May 24 |
| $500 paper account | Actual live account is $112 (Wosobu deposited SOL) | May 25 |
| 70% effort on revenue projects | Trading + LifeOS consumes 70%+ of output | All entries |
| 1-month roadmap to $500 MRR | Core infrastructure blocked for 5+ days | May 21→25 |
| SOL CrypNuevo "barely passes gate" (43.2% WR) | SOL Vol Surge 89.8% WR is the same asset but different strategy | May 20 vs May 21 |
| $500 account balance reported as fact | Balance was $0 (perp API bug) then $112 (deposit) | May 23 vs May 24-25 |
| "Enterprise-grade trading infrastructure" | PnL reconciliation bug creates +868,440% phantom PnL | May 23 |

---

## 3. Building Insights (Day-over-Day)

1. **May 19→20**: CrypNuevo correction — the "1-2 punch" of having a critique response AND a fix in the same session is the right workflow pattern. SPY Grid (88.9% WR) found but abandoned.
2. **May 20→21**: SOL Vol Surge identified as the second proven signal. Structure: find what SOL does that others don't. Gold Template v2 tools built but never connected to live system.
3. **May 21→22**: Ensemble stress test proved multi-pair BB Core unprofitable — narrowed focus to SOL-only (correct call). Titan v0.61 shipped with agent evolution.
4. **May 22→23**: PnL reconciliation bug discovered — the trading beast has systemic data quality issues. Affiliate dashboard built but not deployed.
5. **May 23→24**: Balance bug fix — the single most impactful 24h. $0 paper → $112 real with TP/SL protection. **All prior "live trading" claims invalidated.**
6. **May 24→25**: Live trading confirmed working with 7 closes, 67% WR, TP/SL self-healing cron. Portfolio up $4.13. Revenue: still $0.

**Narrative arc**: A week of building infrastructure and debunking assumptions finally produced a real, working live trading system — but it also revealed that most of the week's work was based on phantom data ($500 paper that was actually $0, trading that wasn't happening). The non-trading product work (travel sites, Titan UI, affiliate dashboard) produced ship-ready artifacts but $0 revenue. The week's biggest lesson is **verify before trusting** — every system, every API, every balance.

---

## 4. Watch Items

- **ETH short at $2,058 TP**: Nearest exit. +$9.72 UPnL at May 25 01:28 HKT.
- **Kalman DRL allocation**: Currently 5% on $112 = $5.60/position. Needs 30-40% for meaningful sizing.
- **Blockers (5+ days stale)**: Supabase, GitHub PAT, Stripe keys, affiliate accounts — all require Wosobu action
- **Pending research actions**: Forex ADX filter, FMP equity screener, Jupiter API meme execution — untouched since May 22
- **Revenue**: $0.00 across all products. Affiliate dashboard built but never deployed.
- **Gold Template v2 not applied**: Epistemic Gate, Killswitch Gate, Rolling Optimizer exist as scripts but never integrated into live bot.
- **SPY Grid candidate abandoned**: 88.9% WR equity strategy found May 19, never revisited.
- **Phantom PnL bug**: COINT_PAIRS +868,440% needs `max_lookback_bars = 200` clamp fix.

---

## 5. Strategy Priority Rebalance (Suggestion)

| Priority | Current Allocation | Suggested | Rationale |
|----------|:-----------------:|:---------:|-----------|
| Live HL Trading | 70% | 50% | Now proven to work; maintain, don't over-optimize |
| Core BB Engine | N/A | 20% | Wire the playbook, fix reconciliation bug, apply Gold Template gates |
| Product Revenue | 15% | 25% | $0 revenue at day 25 of May is critical. Deploy affiliate dashboard first. |
| Research | 15% | 5% | Pause new strategies until actions executed |

---

## 6. Backup Run — Cross-Check Summary (May 25 03:00 HKT)

**Gaps found vs prior synthesis:**
1. **Gold Template v2 toolset** (Epistemic/Killswitch/Rolling Optimizer) — built May 19-20, 12 gaps documented, never applied to live bot. Not in prior synthesis.
2. **SPY Grid BB(10,1.5) RSI<25** — 88.9% WR equity candidate found May 19 and abandoned. Entire non-crypto research stream underreported.
3. **Affiliate dashboard built May 22 late session** — 18 links, click tracking API, never deployed. Revenue $0 partly because built-but-not-shipped pattern.
4. **$500→$0→$112 trust arc** — the three-layer illusion of account balance was previously fragmented across entries. Consolidated here as Pattern E.
5. **Revenue crisis pattern** — built infrastructure never activated. Missing from prior synthesis. Added as Pattern I.
6. **Pipeline state table** from May 25 memory (10 algos with confidence/stage) — richer detail than prior summary.

**No contradictions between days found** beyond those already documented in Section 2. The narrative is consistent: findings get progressively more real as bugs are uncovered.

**Patterns identified in this backup run:**
- Pattern E ($500→$0→$112 Trust Arc) — NEW
- Pattern F (Gold Template v2 Toolset) — NEW
- Pattern G (Non-Crypto Fringe Findings) — NEW
- Pattern I (Revenue Crisis Deepens) — NEW
