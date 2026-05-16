# HEARTBEAT.md — May 17 01:27 HKT

## STATUS: 🟢 WATCHDOG UPGRADED — FULL COVERAGE
- **Watchdog v2**: Now scans ALL 8 git repos, 9 sites, PARA health, cron health, stalled detection
- **Felix v0.4**: Shipped to omnimind (71/71 tests, 10 new API endpoints)
- **Life/PARA**: Green — all forms present

## WATCHDOG COVERAGE (every 15min via crontab)

### What It Scans
| Check | Coverage | 
|-------|----------|
| Gateway | ✅ Running |
| Git repos | 8 (across ~/.openclaw/workspace + ~/workspaces) |
| Uncommitted | 5 dirty repos |
| Deployed Sites | 9/9 healthy |
| PARA Structure | ✅ All 5 forms present |
| Cron Jobs | 12 total (7 ok, 3 idle, 2 error) |
| Stalled Projects | 4 flagged (>4 weeks stale) |
| CEO Tasks | 4 generated |

### Stalled Projects (need attention)
- affiliate-tracking (25d stale)
- habit-tracker (25d stale)
- kidscan-api (25d stale)
- social-beast-components (25d stale)

### Failing Cron Jobs (need Chris)
- ceo-24-7-work-engine (delivery channel broken)
- proactive-builder (timeout — needs shorter payload)

### Active Projects
- nudge — 11h ago, 2 uncommitted
- agent-hq — 2h ago, 4 uncommitted
- omnimind — <5min ago, clean

## LOG FILES
- cron-health.md — Verbose cycle output (auto-trimmed at 500 lines)
- watchdog-log.md — Structured table summaries (auto-trimmed at 300 lines)

## CRON SCHEDULE
| Name | Schedule | Purpose |
|------|----------|---------|
| watchdog.sh | */15 min | Shell watchdog (gateway + workspaces + PARA + sites) |
| Orchestra Health Check | every 30min | OpenClaw internal health |
| omnimind-consolidation | 02:00 + 03:00 | Memify nightly |
| ceo-24-7-work-engine | hourly | 24/7 task execution |
| ceo-morning-summary | 08:00 | Daily briefing |
| proactive-builder | every 12h | Autonomous builds |
| ceo-consolidation | 23:00 + 23:30 | Felix CEO consolidation |
| nudge-enhancer | 02:15, 14:15 | Nudge improvements |
| ev-itinerary-expander | 03:45 | EV content |
| overnight-build-runner | 01:30 | Build queue |

## ALL SITES
| Site | Status |
|------|--------|
| AI Cofounder | ✅ 200 |
| Apifeny AI | ✅ 200 |
| EV Charging Asia | ✅ 200 |
| Family Travel Asia | ✅ 200 |
| Luxury Travel Asia | ✅ 200 |
| Senior Friendly Travel | ✅ 200 |
| Nudge | ✅ 200 (schema blocked) |
| Social Beast | ✅ 200 |
| Agent HQ | ✅ 200 |

## BUDGET
- Today: ~$0.45 (DeepSeek-chat + omnimind upgrade testing)
- Daily cap: $0.50
