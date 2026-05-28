# Cron Health Monitor

Consolidation-tracked issues across all cron jobs.

## Active Issues

| Job | Issue | Status | Since |
|-----|-------|--------|-------|
| trading-beast-hourly | 180s timeout too tight → bumped to 300s | ✅ Fixed 2026-05-21 | 2026-05-21 |
| kill-switch / balance check | HL 429 rate limiting causes false-positive "stuck" state. Add retry/backoff before declaring stuck. | ⚠️ Open | 2026-05-26 |
| consolidation / memory | trading-log.md grows 50+ entries/day. Append-only with unique data; compact via header rule, not deletion. | 🟢 Monitored | 2026-05-27 |

## Observed Noise Patterns

### trading-log.md Bloat (Identified 2026-05-27)
- **Problem**: ~680 lines, ~107 daily entries all with identical boilerplate.
- **Verdict**: 99/107 entries have unique balance data — append-only is correct for data fidelity.
- **Mitigation**: Added header explaining auto-generation + reference to daily memories for summaries.
- **No change needed**: Data is too granular to collapse without loss.

### Memory File Cron-Dump Bloat (Identified 2026-05-28)
- **Problem**: 32 near-identical cron run entries appended to memory/2026-05-28.md = 28KB, 740 lines.
- **Root cause**: Each cron bot run writes a full structured entry with boilerplate (balance check, bot run, delta, assessment). ~80% of content is repeated across entries.
- **Mitigation**: Collapse into a compact timeline table + shared state header. 28KB → 4.4KB (84% reduction).
- **Rule**: Memory files get the timeline-table compression treatment during nightly consolidation. Raw full entries go to trading-log.md only.

## Latest Build Run

- **2026-05-16**: ceo-proactive-improvement, ceo-site-health-audit — delivery channel `@heartbeat` unresolvable. Resolved when cron was recreated through scrapping — no longer an issue.
- **2026-05-16**: ceo-social-publisher, proactive-builder — 300s timeouts too short. Resolved: not active cron jobs anymore (consolidation took over).
