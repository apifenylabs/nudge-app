# TITAN — Phase 2: Skill Forge & Visual Atelier Build (Sprint 1)

Last updated: 2026-05-20 | Source: Wosobu's Phase 2 delivery

## Step 1: Sprint Planning (Complete)
- **Scope**: Week 1 (Visual Atelier, Skill Forge, single-agent + caretaker) + Week 2 (swarm orchestrator v0, auditor, data graph v0, ROI dashboard)
- **Success criteria**: Production-deployable MVP — beta user can create, customize, and test one agent + one skill end-to-end
- **Guardrails**: Zero hallucinations (negative examples in prompts), OWASP Agentic Top 10 compliance, model-agnostic, OpenClaw-native heartbeat scheduler
- **Tech**: React + shadcn + Framer Motion frontend, Supabase backend, agentskills.io SKILL.md standard
- **Testing**: 100% unit + integration + e2e

## Step 2: Workstream A — UI/UX (Visual Atelier)

### Core Component: `VisualAtelier.tsx`
```tsx
export default function VisualAtelier() {
  const [baseModel, setBaseModel] = useState('cute-robot');
  const [selectedSkin, setSelectedSkin] = useState<string | null>(null);
  const skins = ['cyber-ninja', 'neon-guardian', 'classic-orb', 'future-robot-brain'];

  return (
    <div className="flex h-screen bg-zinc-950 text-white">
      {/* Left: Base Models */}
      <div className="w-64 border-r border-zinc-800 p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-4">Base Models</h2>
      </div>
      {/* Center: Live Preview — animated 3D/2D agent */}
      {/* Right: Skins, outfits, accessories */}
    </div>
  );
}
```

### Key UI files (generated):
- `src/components/VisualAtelier.tsx` — core studio
- `src/components/SkillForge.tsx` — Replit-style IDE
- `src/components/SwarmDashboard.tsx` — main hub
- `src/components/CaretakerMode.tsx` — starter mode
- `src/components/AgentCard.tsx` — individual agent display
- `src/components/CertBadge.tsx` — OWASP certification badge
- `src/lib/agent-builder.ts` — agent creation logic + SKILL.md generation

## Step 3: Parallel Execution Model
- UI/UX: Delivers components (Atelier + Skill Forge + Dashboard)
- Skill Engine: SKILL.md parser + sandbox runner + AI co-pilot
- Backend: Agent CRUD, graph data model, heartbeat scheduler
- Auditor: OWASP-scan integration + cert issuance

## Guardrails (Enforced)
- No hallucinations — all prompts include negative examples
- OWASP Agentic Top 10 compliance from day 1
- Model-agnostic (no hardcoded provider)
- All cosmetic: skins have zero functional impact
- Private skills are end-to-end encrypted
- OpenClaw-native heartbeat scheduler on deploy
