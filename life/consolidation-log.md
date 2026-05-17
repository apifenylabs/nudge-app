# Consolidation Log
First entry: 2026-05-16

## 2026-05-17 Consolidation

### Files modified:
- `scripts/watchdog.sh` — Fixed 2 systemic issues
- `consolidation-log.md` — This entry

### Improvements made:
1. **watchdog.sh PATH fix** — Added `export PATH="$HOME/.npm-global/bin:$HOME/.local/bin:/usr/bin:/bin:$PATH"` at top of script. All `openclaw` calls (gateway check, cron list) were returning "command not found" because cron context lacks npm global bin in PATH. This was causing 3 consecutive false "Gateway DOWN — restart FAILED" alerts every cycle even though the gateway was running fine.

2. **watchdog.sh stalled-task infinite loop fix** — `_generate_ceo_tasks()` was scanning ALL git repos for STALLED projects every single cycle and appending fresh log entries each time. `_check_projects_blockers()` then scrolled through the entire accumulated log and re-echoed every stalled entry, creating ~40+ redundant task suggestions. Fixed by adding a deduplication cache (`/tmp/ceo-stalled-cache.md`) that re-scans stalled projects at most once per 12 hours instead of every cycle.

### Bottlenecks logged:
- **watchdog.sh PATH issue** — Systemic bug affecting all watchdog cycles. The script calls `openclaw gateway status` but cron PATH doesn't include `~/.npm-global/bin/. Fix applied above.
- **Stalled-project infinite loop** — Not a Chris blocker, but a 1.5KB+ noise generator in every watchdog cycle output. Fix applied.

### Knowledge added:
- Cron jobs run with a restricted PATH. Any script invoked from cron must set its PATH explicitly if it uses `openclaw` CLI or other non-standard binaries.
- Task generation functions in watchdog.sh should use deduplication caches for stateful scans (stalled projects, down sites) to avoid re-listing the same findings every cycle.

## 2026-05-16 Consolidation

### Files modified:
- `life/CONSOLIDATION.md` — Step 1 now scans ALL cron jobs (not just self), Step 2 adds "cron health issues" category
- `life/cron-health.md` — Created: documents 4 failing cron jobs with root causes

### Improvements made:
1. **CONSOLIDATION.md Step 1** — Changed from reviewing only `ceo-consolidation-primary` runs to listing ALL cron jobs. Consolidation was blind to neighboring job failures.
2. **CONSOLIDATION.md Step 2** — Added "Cron health issues" as explicit identification category. Critical failures (timeouts, delivery errors) should be analyzed for root cause — not just Chris-facing bottlenecks.
3. **cron-health.md created** — New persistent tracker for cron failure patterns. Enables trend analysis: "is this getting worse?" "same root cause hitting multiple jobs?"

### Bottlenecks logged:
- **4 cron jobs failing consecutively** (none requiring Chris input, all systemic):
  - `ceo-proactive-improvement`: 4x delivery error (@heartbeat not found)
  - `ceo-site-health-audit`: 3x same delivery error
  - `ceo-social-publisher`: 3x timeout (300s too short)
  - `proactive-builder`: 2x timeout (300s too short)
- All delivery failures share root cause: `channel: "last"` pointing to unresolvable "@heartbeat" recipient
- All timeout failures share root cause: 5min limit on tasks that need 8-10min

### Knowledge added:
- `cron-health.md` serves as root-cause knowledge base for recurring cron failures
- If the same delivery + timeout patterns persist next check, escalate to Chris with a one-line fix suggestion

