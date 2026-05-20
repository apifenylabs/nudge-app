# TITAN — Phase 3: Swarm Orchestrator + BAU Engine (Sprint 2)

Last updated: 2026-05-20 | Source: Wosobu's Phase 3 delivery

## Scope
- Swarm Orchestrator visual multi-agent map + drag-and-drop
- Cross-agent negotiation (basic)
- Memory graph v1
- Heartbeat scheduler + proactive crons + self-healing stubs
- Live BAU monitoring + ROI updates

## Excluded (for later phases)
- Full IP manifests
- Robotics hooks
- Enterprise BYO
- Advanced certification

## Success Criteria
User can equip 3+ agents, visually orchestrate them, run a coordinated task (e.g. "travel + finance swarm"), see live BAU monitoring + ROI updates.

## Guardrails
- OWASP Agentic Top 10 + TDAD applied
- Model-agnostic
- OpenClaw-native heartbeat scheduler on deploy
- 100% test coverage

## Workstreams

### A: UI/UX — SwarmOrchestrator.tsx
Core visual map extending the existing dashboard:
- Drag-and-drop orchestration (React DnD + Framer Motion)
- Circular hub with agent avatars, connection lines
- Agent resize/reorder via drag

**Key component**: `src/components/SwarmOrchestrator.tsx`
- Agents loaded from Supabase, displayed as orbiting avatars
- Draggable reordering, connection lines for negotiation links
- Live status indicators (idle, working, error)

### B: Negotiation Engine
- `src/lib/negotiation.ts` — basic cross-agent message passing
- Simple handshake protocol: Agent A requests data → Agent B responds
- Priority queuing (travel agent takes precedence during business hours)
- Retry + timeout logic

### C: Memory Graph v1
- Extends Supabase schema — `interactions` table with:
  - agent_id, skill_id, result_summary, timestamp, success
- Personal graph query: "What has my swarm done today?"
- Used by ROI dashboard to show "Your swarm saved X hours / $Y"

### D: BAU Engine (Heartbeat + Crons + Self-Healing)
- Heartbeat scheduler: checks every 60s for agent health
- Cron jobs: daily skill version check, weekly graph compaction
- Self-healing stub: if an agent fails 3+ heartbeats → re-initialize
- Alert channel: Telegram (same group as the founder)

### E: Auditor Agent v1
- Enhanced from v0: runs actual skill test suites (not just regex)
- Issues "Titan Certified" badge with tier (Bronze/Silver/Gold)
- Compliance: OWASP Agentic Top 10 + Snyk ToxicSkills patterns

## Step 3: Integration & Alignment
- E2E flow: Create 3 agents → customize in Atelier → equip skills → orchestrate in SwarmOrchestrator → run coordinated task → see live BAU → check ROI dashboard

## Schema Changes
```sql
-- Memory graph interactions
create table interactions (
  id uuid primary key default uuid_generate_v4(),
  agent_id uuid references agents,
  skill_id uuid references skills,
  result_summary jsonb,
  success boolean default true,
  created_at timestamp default now()
);

-- Orchestration configuration
create table orchestrations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users,
  name text,
  agent_ids uuid[], -- ordered array
  connection_map jsonb,
  active boolean default true,
  created_at timestamp default now()
);

-- Heartbeat log
create table heartbeats (
  id uuid primary key default uuid_generate_v4(),
  agent_id uuid references agents,
  status text check (status in ('healthy', 'degraded', 'dead')),
  last_ping timestamp default now(),
  fail_count integer default 0
);
```

## JSON Artifact
```json
{
  "phase": "3_COMPLETE",
  "project": "Titan",
  "sprint": "2",
  "deliverables": ["Swarm_Orchestrator", "Negotiation_Engine_v0", "Memory_Graph_v1", "BAU_Engine", "Auditor_v1"],
  "deployment_status": "PRODUCTION_LIVE",
  "next_phase": "PHASE 4: Auditor + Certification Engine"
}
```
