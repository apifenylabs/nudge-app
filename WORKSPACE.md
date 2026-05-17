# Workspace Structure — Consolidated May 17 2026

## Architecture
Single OpenClaw gateway. CEO agent (this one) oversees everything.

## Directory Layout

```
~/.openclaw/workspace/
├── _projects/          ← All active project repos (symlinked to root)
│   ├── nudge/
│   ├── apifeny-ai/
│   ├── ai-cofounder/
│   ├── social-beast/
│   ├── ev-charging-asia/
│   ├── family-travel-directory/
│   ├── luxury-family-travel/
│   ├── senior-friendly-travel-asia/   (deprioritized)
│   └── kids-activities-asia/          (deprioritized)
├── _archive/           ← Non-core projects (git history preserved)
│   └── 20 repos (agent-hq, habit-tracker, scanwise, etc.)
├── life/               ← CEO command center
│   ├── Empire-Graph/   ← Change management, idea repository, research
│   ├── Resources/      ← Treasury
│   ├── *-log.md        ← Per-project topic logs
│   ├── ceo-central-log.md
│   ├── projects-index.md
│   └── cross-project-synergies.md
├── RULES.yaml          ← Permanent operational rules
├── WORKSPACE.md        ← This file
├── SOUL.md             ← Captain's soul
├── IDENTITY.md         ← Captain's identity
├── USER.md             ← Human profile
└── ...
```

## Key Principles
- CEO only — one agent, one gateway, one command center
- Every project gets a topic log in `life/`
- No revenue project starts without framework compliance
- Archive preserves history — nothing deleted permanently
