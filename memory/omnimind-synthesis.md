
## 2026-05-29 (Friday) — Daily Synthesis

Generated: 2026-05-29T02:00 HKT | Window: May 19–29, 2026

---

## 1. Cross-Day Pattern Analysis

### Pattern AG: Live Trading Incident — Accidental Position Doubling (CRITICAL NEW)
- **Event**: At 00:57 HKT May 29, a connector test script accidentally placed live market buys because `HyperliquidConnector(paper=False)` was initialized in an ad-hoc debug session. The SDK exchange object was live, and positional parameter mismatches in `order()`/`bulk_orders()` calls submitted as market buys before the validation error returned.
- **Impact**: Positions doubled instantly — BTC +0.0022 (now 0.0044 total), ETH +1.642 (now 3.284 total), WIF +9,634 (now 21,167 total). Notional went from $1,031 → $1,113 (+$82).
- **Root cause**: No paper-mode guard in ad-hoc test scripts. `PAPER_MODE_FORCE = True` guard has been added to SOP.
- **Resolution**: Wosubu OK'd keeping the doubled positions ("if the trade is good go for it"). Native TP/SL set on full position sizes by 01:15 HKT.
- **Cross-day relevance**: This is the **second live-trading bug** after the May 24 balance bug (clearinghouseState read). Pattern emerging: every major trading milestone in this system has a hidden bug that surfaces through ad-hoc debug code, not through the main bot.
- **Pattern AH inheritance**: This is an escalation of the "hidden bug at every milestone" pattern first identified in the May 24 synthesis.

### Pattern AH: Shadow Mode Transition — Bot Now in PAPER Mode (NEW)
- At 23:34 HKT May 28, the bot was switched to `PAPER_MODE=True` (shadow mode).
- The bot still processes all 7 symbols, runs grid lifecycle, funding veto, all 6 strategy paths — but logs orders instead of executing.
- **Purpose**: Overnight validation of the new config (3 bugs fixed, limit grid entry for BB 15m, funding rate veto).
- **Implication**: The system is in a deliberate "pause and validate" phase, not a breakdown. This is the first time the bot has intentionally stopped live execution since May 24.
- **Watch**: Shadow mode logs need checking at ~08:00 HKT for race conditions, stale grids, funding cache timestamps.

### Pattern AI: The Config Refactor (May 28 22:32-23:46) — Largest Single Change Yet (NEW)
- **3 critical bugs fixed**: BB 1h phantom allocation (30% was unspendable), Funding Proxy & Taker Flow returned 0%, Funding Proxy signal block (indentation bug).
- **3 new features built**: Limit Grid Entry for BB 15m (3 passive orders at -1x/-2x/-3x ATR), Funding Rate Veto for Vol Surge SHORT signals (Z-score > +2.5), Funding History Cache (15-min TTL, thread-safe).
- **Allocation rebalance**: BB 1h 55%→30%, BB 15m 0%→20%, Fund Proxy 20%→15%, Taker Flow 15%→10%, Vol Surge 5%→15%, Kalman DRL 5% (unchanged), Cash 5% (unchanged).
- **Position cap**: 3→4.
- **WIF**: Gated from all strategies.
- **Key insight**: This is the first comprehensive strategy rebalance since the bot went live. The old config (May 23-28) was essentially running on BB Core alone — all other strategies had implementation bugs that made them return 0% allocation or crash silently.
- **Projected monthly PnL**: +$12.30 (vs -$7.12 old config). WR improves but bottleneck remains account size ($996 → $50k at 6.9 years).

### Pattern AJ: Portfolio Volatility Increases with Diversity (CONTINUED)
- May 28's trading day had the widest balance range: $963→$1,030 ($67 range, ~7% of portfolio).
- Four positions (BTC, ETH, SOL, WIF) created correlated drawdowns — all worsened simultaneously at several points (20:25 dip, 21:44 sharp dip).
- **Key observation**: The worst UPnL moments were when ALL positions moved against simultaneously. The correlation of the four positions (all crypto longs) creates portfolio-level risk that position-level SL cannot fully mitigate.
- **SOL and XRP**: Both were opened and closed within the same day — short-lived positions. SOL's return to spot cash ($282) was the only portfolio buffer.
- **WIF**: Persistent drawdown (-$56 to -$82 range), now gated from all strategies. "Never backtested — Wosubu directive" is notable: WIF was never validated before going live.

### Pattern AK: 10-Item Backlog — Day 8 of Zero Execution (ESCALATED)
- Pattern AE identified on May 28 as the #1 synthesis concern. Now **day 8**.
- **NEW context**: The config refactor (Pattern AI) actually closed one item implicitly — the BB 1h wire and Funding Proxy/Taker Flow fixes address multiple backlogged items without being explicitly checked off.
- However, the core items (FMP screener, Jupiter API meme execution, forex ADX filter, Kalman funding rate alignment with Algotick params, PnL reconciliation fix) remain completely untouched.
- **Contradiction**: The system is capable of major changes (config refactor = 3 bugs + 3 features in ~1 hour), but only when the focus is on active trading. The backlog items are "offline" and never get attention.

### Pattern AL: Revenue Still $0.00 — Day 33 (CRITICAL)
- No progress on any monetization path. Supabase migration still blocked (day 9). No Stripe checkout. No affiliate payout.
- The May 24-30 Week 1 roadmap ("Infrastructure & Gates") has effectively **zero wins**.
- **Counterpoint**: The Singapore EV guide was published (5,000+ word SEO play) — that's a step toward SEO revenue, but zero dollars in the bank.
- **Hard truth**: May ends in 2 days. The month-end revenue target ($0 baseline, but aspiration was first $9) will not be met.

### Pattern AM: Site Reliability — All 5 Sites Healthy (CONTINUED)
- ev-charging-asia, apifeny-ai, luxury-family-travel, family-travel-directory, social-beast — all 200 OK at last heartbeat.
- 24 crons: 21 healthy, 3 with errors. `proactive-builder` (4 consecutive errors) and `wick-improvement-daily` (1 error) need investigation.
- Vercel upload rate-limit (5000/day) blocking git push on ev-charging-asia.

---

## 2. Key Contradictions (May 29 additions)

| Statement | Counter-Statement | Source |
|-----------|------------------|--------|
| "Bot is in shadow mode — safe validation period" | Bot doubled positions at 00:57 HKT via ad-hoc script not covered by shadow mode | May 29 incident |
| "10-item backlog at zero execution for 8 days" | Config refactor fixed multiple undiagnosed bugs that effectively were backlog items | May 28 23:00-23:46 |
| "Shadow mode must check for stale grids" | The grid lifecycle was built in shadow mode — no live testing confirms thread safety | May 28 config refactor |
| "Revenue $0.00 for 33 days" | Singapore SEO guide published — first real content marketing play | May 29 HEARTBEAT |
| "WIF gated from all strategies" | WIF was never backtested before going live — the gate is closing a process failure, not a new discovery | May 28 config |
| "All 200 OK" | Vercel rate-limited — ev-charging-asia code is committed but not deployed | May 29 HEARTBEAT |

---

## 3. Building Insights (May 28→29)

1. **Accidental doubling is the most important incident since the balance bug.** But unlike May 24 (undiagnosed false confidence), this was immediately caught, root-caused, documented, and given a procedural fix. The incident response quality is improving.

2. **The shadow mode + config refactor together form a "reset" of the trading system.** The original bot went live May 24 with incomplete implementations (BB 1h unspendable, Funding Proxy/Taker Flow returning 0%). The May 28 refactor doesn't just add features — it fixes the original deployment. Shadow mode is the correct approach for re-validation.

3. **Portfolio diversity without correlation awareness is just concentrated risk on multiple legs.** 4 crypto longs move together. The portfolio has directional bias (all long) across all positions. This is structurally identical to being 4x leveraged on a single direction. A funding rate arb, mean-reversion short, or cross-market position would add true diversification.

4. **The WIF gate confirms a process gap: strategies go live without backtesting.** The May 23 permission framework requires backtest → paper → live, but WIF was directly live with zero backtest validation. This is a governance violation that went unnoticed for 5 days.

5. **The system's execution capability is fine — the attention allocation model is broken.** The config refactor proves the system CAN execute major work (3 bugs + 3 features in ~1h). The problem isn't skill or infrastructure — it's that active trading issues get attention while backlog items don't. A structured triage system for the 10-item backlog would fix this.

---

## 4. May 28 Full Session Summary (Cron Data)

### Balance Timeline (May 28, all times HKT)
| Time | Balance | Key Event | Range Δ |
|------|---------|-----------|---------|
| 09:11 | $1,027 | BTC only, stable | — |
| 11:28 | $1,028 | ETH LONG opened (1.642 @ $1,988.50) | +$1 |
| 12:37 | $963 | Portfolio expansion: SOL, XRP, WIF opened. Balance low. | -$65 |
| 18:07 | $1,039 | Recovery | +$76 |
| 20:17 | $994 | XRP closed, SOL & WIF bleeding | -$45 |
| 21:44 | $967 | Sharp dip: ETH -$21.67, all positions red | -$27 |
| 22:21 | $1,030 | Recovery +6.56%. SOL closed. | +$63 |
| 23:16 | $1,008 | Slight drift | -$22 |
| 23:43 | $1,031 | Flat consolidation | +$23 |

### Positions Final (23:43 HKT)
- BTC LONG 0.0022 @ $76,116 | UPnL: -$7.11
- ETH LONG 1.642 @ $1,988.50 | UPnL: +$2.46
- WIF LONG 11,533 @ $0.18 | UPnL: -$52.44
- **Total balance**: $1,031.06
- **12 hist trades | WR=67% | DD=10.6% | Kill Switch=False**

### Config Changes (22:32 HKT)
- SL widened 0.75x → 1.0x ATR for BB 15m
- BB 15m: 0% → 20% allocation, gated to SOL/BTC/ETH
- BB 1h: 55% → 30%
- Funding Proxy: 20% → 15%
- Taker Flow: 15% → 10%
- Vol Surge: 5% → 15% (with funding veto)
- Kalman DRL: 5% (unchanged)
- Cash: 5% (unchanged)
- Position cap: 3 → 4
- WIF: gated from all strategies

### Code Changes (23:00-23:46 HKT)
1. BB 1h signal loop added (was phantom — no code path called check_signal with 1h data)
2. Funding Proxy & Taker Flow allocation cases added to risk_manager.py
3. Funding Proxy signal block indentation bug fixed
4. Limit Grid Entry for BB 15m: 3 passive limit orders at -1x/-2x/-3x ATR from signal price, 6-bar expiration. Backtest: SOL WR 40%→100%, ETH 43%→80%.
5. Funding Rate Veto: Z-score > +2.5 blocks Vol Surge SHORT signals
6. Funding History Cache: 15-min TTL per coin, thread-safe lock

### May 29 00:22-01:29 HKT (Post-Incident)
- After incident: balance recovered to $1,109.66 by 01:29 HKT (from $1,054 at 00:22)
- Bot running in PAPER mode (shadow) — all strategy paths active but logging only
- Positions protected with native TP/SL at doubled sizes

---

## 5. Watch Items (May 29 Forward)

- **Shadow mode logs**: Check ~08:00 HKT for race conditions, stale grids, funding cache timestamps
- **Accidental position monitoring**: Positions are now doubled. Monitor UPnL, TP/SL triggers for natural exits
- **WIF**: Gated but still held. Wosubu approved keeping but monitor drawdown limits
- **Proactive-builder cron**: 4 consecutive errors — needs investigation. Wick-improvement-daily: 1 error
- **Vercel git push**: Deploy Singapore EV guide when rate-limit clears
- **Revenue**: May ends in 2 days. $0.00 across all products. Month-end is effectively a write-off.
- **Polymarket wallet**: Still waiting on Wosobu for SOL + JupUSD
- **10-item backlog**: Can the system execute any single backlog item this week?
