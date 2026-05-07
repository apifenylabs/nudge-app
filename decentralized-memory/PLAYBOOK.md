# PLAYBOOK.md — Decentralized Memory Layer for AI (Full Strategy & Processes)

**Core Mission**
- Build a persistent, verifiable memory layer where AI agents store knowledge, proofs, and context.
- Short-term: Design protocol, validate demand, build MVP.
- Medium-term: Hosted API service and self-hosted node software.
- Long-term: Become the standard memory persistence layer for autonomous AI agents.

**Priority Order**
1. Protocol design (data model, storage, attestation, retrieval)
2. MVP implementation (DHT/IPFS or lightweight chain, client SDK)
3. API layer (hosted service for teams)
4. Monetization (protocol fees / subscription)

**LLM Tiered Strategy (Cost Control)**
- Default / Routine / Worker tasks → DeepSeek-chat (cheapest)
- Coding / technical tasks → DeepSeek or Kimi
- Review / reasoning / quality → Claude Sonnet ($20 plan)
- High-stakes CEO decisions → Opus (only with explicit user approval)

**Token & Cost Rules**
- Always report exact token usage and estimated cost in every report.
- Flag any action estimated >$10 as "needs approval".
- Daily budget target: <$1 until we have consistent revenue.
- Compact memory aggressively every 4k tokens.

**Validation First (Solopreneur AI SaaS Playbook)**
- Never build before validating demand (Reddit mining, interviews, pre-sell).
- Use 72-hour validation method before any major development.
- Pre-sell requires ≥3 paying subscribers before building deeper features.

**Mandatory Deployment Pipeline (NO EXCEPTIONS)**

```
PRD (ProductOwner)
  ↓
APPROVE (CEO/Architect)
  ↓
DEV (Coder)
  ↓
UI REVIEW (UIAgent)
  ↓
TEST (Tester — protocol edge cases, stress testing)
  ↓
REVIEW (Reviewer)
  ↓
AUDITOR (SecurityAgent + Reviewer — cryptographic correctness)
  ↓
CHIEF EDITOR (Final sign-off)
  ↓
DEPLOY (Testnet → Mainnet with approval)
```

All gates blocking. No skips.

**Quality Gates**
- All P0 acceptance criteria must pass testing
- Cryptographic verification: proofs must be independently verifiable
- No critical bugs blocking launch
- Security audit: no private key exposure, no data corruption
- Performance: retrieval under specified latency targets

**Skill Economy**
- Max 200-300 lines per skill
- Single purpose per skill
- Named `store-memory-verifiable.v1.md`
- Has contract: Goal → Input → Steps → Output → Dependencies

**Documentation Structure**
```
~/.openclaw/workspace/decentralized-memory/
├── shared-lessons.md          # Inherited governance from main orchestra
├── SOUL.md                    # This workspace's soul
├── PLAYBOOK.md                # This file
├── RULES.yaml                 # Execution rules (inherited)
├── KANBAN-WORKFLOW.md         # Project management
├── design-principles.md       # UI standards (inherited)
├── paperclip-coordination.md  # Coordination protocol (inherited)
├── GOVERNANCE.md              # Global governance (inherited)
├── SHARED_KNOWLEDGE_BASE.md   # Cross-orchestra synergy (inherited template)
├── knowledge/                 # Project-specific knowledge base
├── agents/                    # Agent role definitions
├── templates/                 # Project templates
├── memory/                    # Daily notes and long-term memory
├── prd/                       # Product requirements documents
└── shared/                    # Shared assets
```

**Isolation Rules**
- This workspace is **code- and task-isolated** from other projects.
- No cross-contamination of code, dependencies, or tasks.
- May read from the main workspace's shared knowledge base for governance reference only.
- All memory-layer artifacts live exclusively in this directory.

---

*This playbook inherits governance from the main Alpha Orchestras workspace. See shared-lessons.md for inherited operating principles.*
