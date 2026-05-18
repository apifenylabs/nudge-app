# PLAYBOOK.md — Trading Playbooks (Full Strategy & Processes)

**Core Mission**
- Build automated trading strategies that generate revenue with minimal human input.
- Short-term: Validate signal pipeline and get first paying subscribers.
- Medium-term: Run multiple trading strategies across crypto and equities.
- Long-term: Package and sell trading playbooks as a subscription product.

**Priority Order**
1. Signal generation pipeline (price, volume, on-chain, sentiment)
2. Backtesting framework (strategy validation before live deployment)
3. Portfolio management & risk controls
4. Subscription delivery (telegram/web dashboard)

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
TEST (Tester — backtest framework, signal validation)
  ↓
REVIEW (Reviewer)
  ↓
AUDITOR (SecurityAgent + Reviewer — no real funds exposed)
  ↓
CHIEF EDITOR (Final sign-off)
  ↓
DEPLOY (Simulated environment first → paper trading → live with approval)
```

All gates blocking. No skips.

**Quality Gates**
- All P0 acceptance criteria must pass testing
- Backtest results require minimum Sharpe ratio and drawdown thresholds
- No critical bugs blocking launch
- Security audit: no exposed API keys, no real funds at risk
- Paper trading period before any live deployment

**Skill Economy**
- Max 200-300 lines per skill
- Single purpose per skill
- Named `generate-macd-signal.v1.md`
- Has contract: Goal → Input → Steps → Output → Dependencies

**Documentation Structure**
```
~/.openclaw/workspace/trading-playbooks/
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
- All trading-related artifacts live exclusively in this directory.
- Real trading requires explicit user approval (separate from code deployment approval).

---

*This playbook inherits governance from the main Alpha Orchestras workspace. See shared-lessons.md for inherited operating principles.*
