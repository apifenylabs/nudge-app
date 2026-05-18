# Context Compaction Protocol

Last updated: 2026-04-15

## Goal

Reduce token growth by storing durable state in files instead of relying on long chat history.

## Protocol

1. **Chat is for commands, not long-term memory**
   - Use chat to assign work, confirm decisions, and review results.

2. **Project state lives in files**
   - Store current status, blockers, next steps, and important decisions in markdown.
   - Prefer exact dates like `2026-04-15`.

3. **Checkpoint after meaningful progress**
   - After audits, deployments, or major coding sessions, write a short state summary.
   - Keep summaries short enough to reload quickly.

4. **Use fresh focused sessions for big work**
   - Split coding, research, and review into smaller sessions or subagents.
   - Reload only the files relevant to that project.

5. **Dashboards must distinguish live vs sample**
   - Never display model usage, cost, or telemetry as live unless backed by a real feed.

## Minimal file set per project

- `README.md` for product overview
- `DEPLOYMENT.md` for exact deploy steps
- `STATUS.md` for current truth
- `memory/YYYY-MM-DD.md` for durable daily events

## Review cadence

- Daily: append durable facts to daily memory
- Weekly: roll stable lessons into longer-lived docs
- Before major compaction: update project status files first

## Rule

If a fact matters later, write it down. Do not trust the model to remember it from chat alone.
