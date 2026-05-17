# Change Management Framework

> LOCKED May 17 2026 — Empire OS Enterprise Operations Layer.
> CEO agent MUST follow this for ALL project additions, edits, and lifecycle changes.

## Scope

This framework governs:
- **New projects** — creating any new directory, product, tool, or domain
- **Existing project edits** — changing scope, ownership, revenue model, deployment, or status
- **Project lifecycle** — activate, defer, archive, kill, revive

## Principles

1. **Traceability** — every change has an audit trail with date, agent, and rationale
2. **Completeness** — no partial updates. When one index changes, ALL related indexes update
3. **Accountability** — CEO agent owns index accuracy. Inconsistencies are system bugs
4. **Approval gates** — domain purchase and go-live require human approval until $10k MRR

## Process Overview

### New Projects → `/life/Empire-Graph/new-project-checklist.md`
### Project Edits → `/life/Empire-Graph/project-edit-log.md`
### Status Changes → update `projects-index.md` + `ceo-central-log.md`

## File Map

| File | Purpose | Owner |
|------|---------|-------|
| `life/Empire-Graph/change-management.md` | This file — framework definition | CEO |
| `life/Empire-Graph/new-project-checklist.md` | Mandatory pre-launch checklist | CEO (executor), Chris (approver) |
| `life/Empire-Graph/project-edit-log.md` | Centralized audit trail | CEO |
| `life/projects-index.md` | Master index of all projects | CEO |
| `life/ceo-central-log.md` | Strategic summary log | CEO |
| `life/cross-project-synergies.md` | Flywheel and connection mapping | CEO |

## Exception Policy

Emergency fixes (security, site-down, payment failure) bypass the full framework but MUST be logged in `project-edit-log.md` within 1 hour with:
- What was the emergency
- What was done
- What normal process was bypassed
- Retroactive compliance steps taken

## Violation Handling

If the CEO detects an index inconsistency or an unlogged change:
1. Log it as a bug in `ceo-central-log.md` with `[SYNC-ERROR]` tag
2. Fix all affected indexes within the same session
3. Record the fix in `project-edit-log.md` with `[SELF-HEAL]` tag
