# Project Edit Log — Centralized Audit Trail

> LOCKED May 17 2026.
> Every project change MUST be logged here with date, agent, rationale, and downstream files updated.

## Format

```yaml
# Template
- date: "YYYY-MM-DD HH:MM TZ"
  project: "project-name"
  type: "NEW / EDIT / STATUS / LAUNCH / DEFER / ARCHIVE / KILL / SELF-HEAL / EMERGENCY"
  summary: "What changed and why"
  human_approval: "yes / no / not-required"  # Required for domain+go-live until $10k MRR
  files_updated:
    - "life/projects-index.md"
    - "life/cross-project-synergies.md"
    - "life/Empire-Graph/<project>-log.md"
    - "life/ceo-central-log.md"
  agent: "CEO / Sub-agent name"
  verification: "Indexes synced and consistent (yes/no)"
```

---

## Entries

- date: "2026-05-17 10:45 HKT"
  project: "system"
  type: "NEW"
  summary: "Created Empire OS Change Management Framework — change-management.md, new-project-checklist.md, project-edit-log.md, projects-index.md, ceo-central-log.md, cross-project-synergies.md"
  human_approval: "not-required"
  files_updated:
    - "life/Empire-Graph/change-management.md"
    - "life/Empire-Graph/new-project-checklist.md"
    - "life/Empire-Graph/project-edit-log.md"
    - "life/projects-index.md"
    - "life/cross-project-synergies.md"
    - "life/ceo-central-log.md"
  agent: "CEO (Captain)"
  verification: "yes"

- date: "2026-05-17 10:45 HKT"
  project: "all"
  type: "EDIT"
  summary: "Added Change Management Framework rule section to RULES.yaml — all new/edit actions must follow Empire-Graph framework, CEO responsible for index accuracy"
  human_approval: "not-required"
  files_updated:
    - "RULES.yaml"
  agent: "CEO (Captain)"
  verification: "yes"
