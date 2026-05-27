# Agentic Project Delivery System — PRD

> **Working title:** Helmsman  
> **Status:** Pre-product, v0 → v3 roadmap  
> **Owner:** Wosobu / Apifeny Labs

---

## 1. Vision

An AI agent that **drives** project delivery end-to-end. Not a dashboard, not a tracker — an autonomous delivery manager that runs standups, surfaces risks, re-plans paths, and holds people accountable.

The outcome: teams ship faster because the project management overhead — the status-gathering, block-chasing, risk-assessing, report-writing — is handled by an agent that never sleeps, never forgets, and has perfect context.

This is **project management as a service**, not project management software.

---

## 2. Problem

Project managers and delivery leads spend **~80% of their time** on non-delivery work:

- Chasing people for status updates (syncs, DMs, standup meetings)
- Updating Jira/Linear tickets after the fact
- Writing status reports nobody reads
- Preparing for ceremonies instead of removing blockers
- Manually detecting slips when it's already too late

Existing tools (Asana, Monday, Jira, Linear) are **reactive record-keepers**. They store what happened. They don't *make things happen*. They add admin surface area instead of removing it.

**The core insight:** A project manager's job is mostly pattern-matching and nudging. "Feature X hasn't moved in 3 days → that's a risk → who owns it → what's the plan?" That's an AI task, not a human task.

---

## 3. Target Users

| Persona | Pain Point | Helmsman's Role |
|---------|-----------|-----------------|
| **PM/Delivery Manager** | Status updates and prioritisation consume 80% of brain cycles | Offload the ceremonies, keep the strategic decisions |
| **Engineering Lead** | Context switching to update tickets and answer "where are we?" | Async, structured, minimal-inbox agent posts |
| **Founder wearing PM hat** | No bandwidth for project management, everything slips | Zero-effort delivery visibility + risk alerts |
| **Individual Contributor** | Standup meetings waste time; report-writing feels performative | 30-second Loom-style async check-in or Slack message parse |

---

## 4. Core Features

### 4a. Async Standup Agent (v1 MVP)

- Posts to Slack/Teams/Discord at configurable intervals
- Asks each team member: `What did you complete? What are you working on? Any blockers?`
- Parses responses into structured delivery entries (bypasses the "I wrote it in Slack, now I have to write it in Jira" problem)
- Syncs completed work to GitHub commits/PRs and Linear/Jira ticket transitions
- If someone doesn't respond by deadline, auto-escalates with a nudge to the channel

### 4b. Blocker Detection & Escalation (v1)

- Keywords + LLM intent parsing: "waiting on Bob for X" triggers blocker tracking
- If a blocker persists >24h with no resolution action → notifies the PM/lead
- Links blocker to the specific ticket/PR/dependency
- Suggests resolution paths based on project history (e.g., "last time this dependency blocked Y, they unblocked by reassigning to Z")

### 4c. Automated Status Reports (v1)

- Generates weekly/daily delivery snapshots from agent data
- "This week shipped: [features]. At risk: [items]. Last week's blockers: [resolved/unresolved]."
- Stakeholder-ready summaries (executive, team, client variants)
- Posts to Slack channel or emails on schedule — no copy-paste, no formatting

### 4d. Delivery Risk Prediction (v2)

- Analyses velocity trends per sprint/cycle
- Flags when a feature is statistically unlikely to ship on its current trajectory
- "Features A and B are tracking to be 3 days late. Recommend descoping C or adding 1 person to A."
- Uses e.g. burn-down rate, commit cadence, PR lag, ticket state creep

### 4e. Automated Re-Planning (v2)

- When a slip is detected, generates re-plan proposals
- "If we cut feature C, A and B ship on time. If we push D to next sprint, same result."
- PM reviews + approves/rejects — or configures auto-approve rules for low-risk re-plans
- Updates the ticket system with the new timeline

### 4f. Delivery Orchestration (v3)

- Dependency graph management: tracks cross-team delivery chains
- "Team B can't start until Team A ships the API — but Team A slipped 2 days. Option: let Team B stub it, or reorder their sprint."
- Multi-sprint horizon scanning
- Release coordination agent: manages code freeze, regression window, release notes

### 4g. Retrospective Generation (v3)

- Analyses delivery data across a sprint/cycle
- Surfaces factual patterns: "7 of 10 items shipped, 3 slipped. Common cause: dependency on external API. Suggestion: stub dependencies earlier."
- Reduces retro from a 90-minute meeting to a 15-minute decision session

---

## 5. How It's Different

| Dimension | Existing Tools (Linear/Jira/Asana/Monday) | Helmsman |
|-----------|------------------------------------------|----------|
| **Nature** | Reactive record-keeper | Proactive delivery driver |
| **Standups** | You write standup notes in them | It runs the standup for you |
| **Blockers** | You mark them manually | It detects and escalates them |
| **Risk** | You look at a burndown chart | It tells you what's at risk and why |
| **Reports** | You export CSV / build dashboards | It writes the report and posts it |
| **Re-planning** | Manual drag-and-drop | It proposes the re-plan |
| **Integration** | Passively syncs | Reads + writes (creates tickets, moves statuses, assigns people) |

**Helmsman is an agent, not a tool.** It sends notifications. It asks questions. It escalates. It proposes decisions. The human stays in the loop for *strategy* — not for transcription.

---

## 6. Monetisation

**SaaS — per-project / per-team pricing.**

| Tier | Price | Target | Features |
|------|-------|--------|----------|
| **Starter** | $29/mo (up to 5 users, 1 project) | Solo founder, small team | Async standups, blocker detection, weekly reports |
| **Team** | $99/mo (up to 20 users, 5 projects) | Startup, agency | Everything above + risk prediction, Slack/Linear/GitHub write-back |
| **Scale** | $299/mo (unlimited users, unlimited projects) | Product teams, mid-market | Everything + re-planning, dependency graph, multi-team orchestration |
| **Enterprise** | Custom | Orgs needing SSO, custom integrations, SLAs | All features + audit trail, compliance, dedicated agent |

**North star:** Replace the PM "ceremony overhead" subscription (Slack + Jira + Notion + Standup bot + Status report tool = $150+/mo/seat) with a single $99 team plan.

---

## 7. Phases

### v0 — Research & Foundation (weeks 1-2)
- Ship this PRD
- Build prototype: a single Slack bot that asks "What did you do yesterday?" and parses responses
- Sync to a Notion database or Google Sheet to prove the loop
- Test with 1-2 real teams (Apifeny internal + one founder friend)

**Gate:** ✅ 3 teams using it daily, reaction: "I don't have to write a standup anymore"

### v1 — Core Delivery Agent (weeks 3-6)
- Async standup agent (Slack/Discord/Telegram)
- Blocker detection + auto-escalation
- Structured delivery logs (no ticket spam, just parsed facts)
- GitHub commit + PR sync (read-only)
- Status report generation (Slack post + email)
- Dashboard: single-page web view of current sprint health

**Gate:** ✅ 10 teams, <5% daily churn, user reports they reclaimed 4+ hours/week

### v2 — Prediction & Re-planning (weeks 7-12)
- Velocity analytics + risk prediction
- Re-plan proposals (PM approves/rejects via Slack)
- Linear + Jira write-back (move tickets, update statuses, create subtasks)
- Dependency graph (manual definition, auto-tracking)
- Slack slash commands: `/helmsman status`, `/helmsman risk`, `/helmsman re-plan`

**Gate:** ✅ 50 teams, 20% paid conversion from trial

### v3 — Full Orchestration (Q2 2026 onwards)
- Cross-team dependency management
- Retrospective generation
- Release management (freeze windows, regression tracking, release notes)
- AI that learns team velocity patterns and adjusts recommendations
- Open API for custom integrations / third-party tools

---

## 8. Technical Notes

### Stack

| Layer | Choice | Why |
|-------|--------|-----|
| **Orchestration** | Node.js / Python agent runtime | LLM calls, async event handling, cron-like scheduling |
| **LLM** | GPT-4o or Claude 3.5+ (Anthropic) | Intent parsing, risk analysis, natural-language report generation |
| **Storage** | PostgreSQL (Supabase) | Simple, scalable, has built-in auth + real-time |
| **Queue** | Redis / BullMQ | Reliable delivery of standup reminders, escalation timeouts |
| **Web Dashboard** | Next.js (Tailwind) | Fast to iterate, shared state with Supabase real-time |
| **Integrations** | Webhooks + REST APIs | GitHub, GitLab, Linear, Jira, Slack, Discord, Telegram, Notion |

### Integration Details

- **GitHub API:** Poll commit activity via GraphQL / webhooks. Track PR lifecycle (opened → reviewed → merged → deployed). Detect stale PRs (>72h with no activity).
- **Linear/Jira:** OAuth-based. Read tickets, statuses, assignees. Write ticket transitions, comment updates, subtask creation (v2+). Webhook for ticket changes.
- **Slack:** Socket mode (no exposed endpoint) for interactive messages. Blocks for structured inputs (e.g., dropdown for "what did you work on?").
- **LLM layer:** System prompt includes project context, sprint goals, team roles, historical patterns. Output structured JSON for downstream processing (not free-text). Use tool/function calling for deterministic branching (e.g., "escalate blocker" → function call, not hallucination).

### Security & Privacy

- No LLM training on customer data (zero-retention APIs or self-hosted model for sensitive orgs)
- OAuth tokens stored encrypted at rest
- Audit log of all agent actions (every ticket move, every status update, every escalation)

---

## 9. Success Metrics

### Leading Indicators (daily/weekly)

| Metric | Target | Why |
|--------|--------|-----|
| Standup completion rate | >90% | If the team doesn't engage, the agent doesn't work |
| Blocker detection accuracy | >80% precision, >80% recall | False positives and misses both erode trust |
| Time from blocker detection to escalation | <1h | Speed of surfacing risk |
| Weekly active teams | n/a (tracking only) | Measure adoption |

### Lagging Indicators (monthly/quarterly)

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Delivery velocity improvement | +20% within 3 months | Compare tickets/features shipped per sprint pre/post |
| Blocker resolution time | -40% within 3 months | Average hours blocker active → resolved |
| Status-report-writing time eliminated | -100% | Nobody writes a status report manually any more |
| User retention (paid, 90-day) | >80% | Standard SaaS retention benchmark |
| NPS | >40 | User survey at week 4 and week 12 |

### Counter-Metrics (watch for)

- **Standup fatigue:** If response rate drops after week 2, the agent is too noisy → adjust cadence
- **Report overload:** If users stop reading the generated reports, reduce frequency or switch to digests
- **Risk alert desensitisation:** If every sprint has "at risk" flags, they become noise → tighten risk thresholds

---

## 10. Open Questions

1. **Does the agent hold people accountable, or does that feel creepy?** — Need to tune tone. Agent should feel helpful, not policing. Word choice matters ("re-schedule" vs "overdue").
2. **v1: pure Slack bot or web dashboard too?** — MVP suggests Slack-only to force the agent interaction model. Dashboard added when users need "the big picture at a glance."
3. **How do we handle teams that don't use Slack/Discord?** — Email/web check-in as fallback (v2).
4. **Trial length?** — 14-day free trial (enough to see value in one sprint cycle).
5. **Competitor risk?** — Standup bots (Geekbot, Standuply, Status Hero) exist but none re-plan or do risk prediction. Market segmentation matters — we're not a standup bot, we're a delivery agent that happens to run standups.

---

## Appendix: Competitor Landscape

| Product | What It Does | Gap Helmsman Fills |
|---------|-------------|-------------------|
| **Geekbot / Standuply** | Async standup bot, basic reporting | No proactive risk, no re-planning, no write-back to ticketing |
| **Linear** | Fast issue tracking, beautiful UX | Zero delivery management — it's a nice todo list |
| **Asana / Monday** | Project tracking, Gantt charts, automations | Automations are IF-THEN rules, not AI-driven. Config-heavy. |
| **Jira** | Everything and nothing | Swamp of configuration, AI features (Jira Intelligence) are search, not delivery management |
| **Status Hero** | Automated status reports from integrations | Good at collecting status. Zero decision support. |
| **Motion** | AI calendar + task scheduling | Focused on individual scheduling, not team delivery |

**The moat:** Helmsman learns your team patterns, makes proactive recommendations, and writes back to your tools. It's an active participant, not a passive aggregator. The more it runs, the better it gets at spotting risks before they materialise.
