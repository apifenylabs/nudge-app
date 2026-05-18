# KANBAN-WORKFLOW.md - Project Management Rules for Agents

## Board Columns (GitHub Project)

**Backlog**
- Ideas not yet validated
- Low-priority tasks
- Waiting for user input

**Validation (72-hour sprint)**
- Reddit problem mining
- Landing page creation
- Smoke test / traffic generation
- Pre-sell outreach
- Validation interviews

**Build**
- Only entered after pre-sell validation (≥3 customers)
- MVP development (split into subtasks)
- Code review & testing

**Done**
- Completed tasks with summary comment (what was done, cost, time spent, next action)

## Agent Instructions

- When starting a task: Move issue to "In Progress" (or create new issue)
- When finished: Move to "Done" and add comment with:
  - What was accomplished
  - Exact token usage and cost
  - Estimated time spent
  - Next recommended action
- If blocked: Add label `blocked` and tag @human in comment
- Always reference PLAYBOOK.md and RULES.yaml for decisions

## Human Review
- User reviews board daily
- Agents continue unless task is labeled `needs-human`

This Kanban follows the Solopreneur AI SaaS Playbook validation-first approach.
