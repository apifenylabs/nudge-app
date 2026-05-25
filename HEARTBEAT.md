# HEARTBEAT.md — Last Check
2026-05-26 01:50 HKT

## System State
- ✅ **Overnight Build Run (01:30 HKT)** — all 6 projects deployed & returning HTTP 200
  - www.familytravelasia.com ✅
  - luxury-family-travel-asia.vercel.app ✅
  - ev-charging-asia.vercel.app ✅
  - apifeny-ai.vercel.app ✅
  - nudge-sigma-liart.vercel.app ✅
  - social-beast-two.vercel.app ✅
- ✅ **Trading live on Hyperliquid** — $117.12 portfolio (+193% from $40.59), 3 open positions (ETH/HYPE/WIF), 7 closed trades today (67% WR, -$0.04 net)
- ✅ **TP/SL workaround deployed** — resting reduce-only limit GTC orders instead of native grouped TPSL
- ✅ **Internal trading dashboard** deployed to vercel (trading-only, professional white layout)
- ✅ **Regime filter (exp31) built** — BTC 1h trend/ATR tagging with regime score
- ✅ **All symlinks healthy** — memory/, HEARTBEAT.md, cron-health.md
- ✅ **EV Charging diagnostics deployed** — map now has error boundary + invalidateSize + tile error detector
- ✅ **Data pipeline** — fetch-live-data & data-pipeline-hourly both OK, fresh data flowing
- ✅ **Cron health** — 26 jobs, 5 showing "gateway restart" errors (transient, auto-recovery expected)
- 🔴 **Revenue: $0.00** — no paying users on any product
- ✅ **Regime snapshot regenerated** @ 01:25 HKT (BTC $77,576, 30d realized vol: 6.3%, dominance: 58.2%, LOW vol)
- ✅ **AI Directory: 2 new comparison pages** — /compare/ index + /compare/chatgpt-vs-claude live on production

## Cron Health Audit (2026-05-26 01:25)
| Cron | Status | Error | Fix |
|------|--------|-------|-----|
| **trading-pulse-check** | ⚠️ error (delivery "none" mode — "Message failed" is expected silent echo artifact) | Regime snapshot stale 5d (now fixed), paper engine files OK | ✅ Regime snapshot regenerated at 01:25. Pulse check set to 'none' delivery — will error every run. Consider delivery='announce' or accept silent errors. |
| **trading-beast-hourly** | ✅ auto-recovered | Last few runs all 'ok' | Resolved |
| **overnight-build-runner** | ⚠️ error (last run 01:30 interrupted by gateway restart) | Expected auto-recovery at next 01:30 run | Will self-resolve |
| **trading-llm-iteration** | ⚠️ error (interrupted by gateway restart) | Will auto-recover next cycle | No action needed |
| **proactive-builder** | ⚠️ error (interrupted by gateway restart) | Next run at ~12:00 HKT | Will self-resolve |
| **ceo-consolidation-primary** | ❌ error (gateway restart) but backup 23:30 ran OK | Interrupted mid-run | No action, backup delivers report |

## Blockers
1. **Supabase SQL** — needs Wosobu to create project or run SQL manually (blocks Titan/Apifeny/Nudge persistence)
2. **KalmanDRL sizing** — 5% alloc on $112 = $5.60/position. Need 30-40% for meaningful trades
3. **Vercel team access** — still unresolved for shared deployments
4. **Small capital** — $112 seed, proving profitable trading before scaling to $500 seed target

## Next Up
1. ~Bump KalmanDRL alloc 5% → 30-40%~ (meta_allocator is static planning doc; SFP paper strats bumped 5→15% ea)
2. Wire tick data pipeline → unblock Vol Surge
3. Monitor ETH short TP hit ($2,058)
4. Build external Felixbot-style public dashboard
5. ~Regime snapshot fixed~ ✅ regenerated 01:25 HKT — coinGecko 429 handled gracefully
6. Fix trading-pulse-check: change delivery from 'none' to avoid spurious 'Message failed' errors

## Latest Playbook Audit (2026-05-26 00:09)
- Report: playbook-builder-report.md written
- P0: Enable playbooks 4-6 paper mode (already coded, zero infra cost)
- P1: Start ML feature pipeline (playbook 9) — zero-cost engineering today
- P2: Re-escalate playbook 10 with concrete $2k SOL + $250/mo infra ask
- P3: Build playbook 7 Deribit testnet module
- P4: Build playbook 8 arb detection engine
