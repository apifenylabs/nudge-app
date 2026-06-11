# HEARTBEAT.md — May 19 09:20 HKT

## STATUS: 🟢 BOILING OCEAN | BRUTE FORCE DONE

## BREAKTHROUGH: Grid Mean Rev hits PF=5.31, WR=68.4% in bull regime
- Largest brute force search: 5,400 param combos tested
- Root cause of prior PF issues FIXED: exit logic was broken (exits.shift(24))
- Best single-regime result: BB(20,2.5) RSI<20 — PF=5.31, WR=68.4%, DD=11.7%
- **Gate problem is structural**: no single playbook works across all 4 regimes
- Solution: regime-aware meta-strategy (next work item)

## ALL 10 PLAYBOOKS — CODE EXISTS
| # | Playbook | Code | Backtested | Best Bull WR | Gate |
|---|----------|------|------------|-------------|------|
| 1 | TendersAlt BTC | ✅ | ✅ | 52% | ❌ |
| 2 | Cointegration Pairs | ✅ | ✅ | 43% | ❌ |
| 3 | Funding Rate Arb | ✅ | ✅ (session) | — | ❌ |
| 4 | Trend Following | ✅ | ✅ | 34% | ❌ |
| 5 | Grid Mean Rev [NEW] | ✅ | ✅ (brute force) | **68.4%** | ❌ |
| 6 | Volume Profile [NEW] | ✅ | ✅ | 47% | ❌ |
| 7 | Options Delta-Neutral [STUB] | ✅ | 🚫 needs infra | — | 🚫 |
| 8 | Cross-Exchange Arb [STUB] | ✅ | 🚫 needs infra | — | 🚫 |
| 9 | ML Prediction [STUB] | ✅ | 🚫 needs infra | — | 🚫 |
| 10 | MEV Solana [STUB] | ✅ | 🚫 needs SOL capital | — | 🚫 |

## DATA FILE
- grid_search_optimized.json: top 10 params x 4 regimes
- brute_force_grid_top100.csv
- brute_force_vwap_top50.csv

## BLOCKERS (Chris)
1. ⚡ VITE_STRIPE_SECRET_KEY
2. **Regime detection module** needed before any playbook can gate-pass
3. Playbooks 7-10 need external infra (exchange APIs, ML GPU, Solana RPC)

## NEXT ACTION (beat AI agents to this)
Building a regime detection layer that switches playbooks based on market state.
No single strategy survives all 4. Meta-strategy is the only path to $100M Gate.
