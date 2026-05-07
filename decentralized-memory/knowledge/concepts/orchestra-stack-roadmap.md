# Orchestra Stack Roadmap

Last updated: 2026-04-15

## Decision

Paperclip comes before Obsidian deployment work.

- **Paperclip first**: orchestration, isolation, agent session control, permissions, and runtime plumbing.
- **Obsidian second**: durable knowledge workflows, linked notes, review loops, and operator visibility.

## Why this order

Obsidian improves knowledge quality, but it does not solve orchestration reliability.
Paperclip is the lower-layer dependency for running multiple orchestrated app lanes safely.
Once Paperclip is stable, Obsidian becomes much more valuable because it can reflect real system state instead of aspirational notes.

## Planned stack phases

### Phase 1, honest local foundations
- Make dashboards truthful about sample vs live data.
- Make Nudge deployable as an alpha.
- Keep strategy, memory, and handoff files explicit and date-stamped.

### Phase 2, Paperclip runtime layer
- Session isolation between orchestras
- Resource quotas and guardrails per lane
- Reliable task routing and background execution
- Safe backend bridge so Agent HQ can read real telemetry
- Production checklist for failures, retries, and observability

### Phase 3, Obsidian knowledge layer
- Mirror durable project knowledge into Obsidian-friendly markdown structure
- Link projects, competitors, decisions, blockers, and experiments
- Add daily review and weekly review templates
- Keep knowledge base separate from noisy chat history
- Support post-run summaries from agent work into linked notes

## How Obsidian should fit later

Obsidian should become the human-facing control room for:
- durable decisions
- project status snapshots
- architecture notes
- growth experiments
- postmortems
- reusable playbooks

It should not be the source of truth for live orchestration state.
That remains with the runtime and app backends. Obsidian is the structured memory and review surface.

## Paperclip readiness gaps to close before rollout
- Real install and configuration, not just architecture notes
- Proven session isolation and secrets handling
- Recovery path when orchestras fail or hang
- Agent HQ telemetry bridge design
- Local-to-cloud deployment model
- Production test checklist

## Obsidian readiness tasks after Paperclip
- Define vault folder structure that mirrors `knowledge/`
- Decide sync path between workspace markdown and Obsidian vault
- Add note templates for product, growth, infra, and incidents
- Add periodic compaction and review routine
- Add link conventions for projects and decisions

## Guardrail

Do not claim live orchestration, live telemetry, or production readiness until Paperclip is actually installed, wired, and tested.
