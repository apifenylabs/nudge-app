# GLOBAL GOVERNANCE v2 — Vibe Coding + Skill Economy

_Adopted 2026-04-27. Merges SOUL.md, PLAYBOOK.md, RULES.yaml, and new rules from Greg Isenberg + Vibe Coding research._

---

## Core Principle: PRD-First, Always

No code without an approved Product Requirements Document. Ever. This applies to every project, every feature, every fix.

**Process:** ProductOwner writes PRD → CEO/Architect reviews + approves → Coder builds → gates pass → deploy.

## Skill Economy

Every piece of logic is a reusable Skill:
- **Max 200-300 lines** per skill
- **Single purpose** per skill
- **Reusable** across all orchestras
- **Named** `transform-destination-to-tweet.v1.md`
- **Has contract:** Goal → Input → Steps → Output → Dependencies

All skills cataloged in `workspace/skills/INDEX.md`.

## Hard Limits

- **5,000 lines max** per core service
- **300 lines max** per Skill file
- **$1/day max** spend until revenue (hard)

## Auditor Gate

Every deployment passes through Auditor (SecurityAgent + Reviewer):
1. Security scan — no secrets, no injection, no vulns
2. Code review — matches PRD? Bugs? Edge cases?
3. Skill economy — is it reusable? No bloat?

Auditor must approve before Chief Editor signs off.

## Deployment Pipeline

```
PRD (ProductOwner)
  → APPROVE (CEO/Architect)
    → DEV (Coder)
      → UI REVIEW (UIAgent)
        → TEST (Tester)
          → REVIEW (Reviewer)
            → AUDITOR (SecurityAgent + Reviewer)
              → CHIEF EDITOR (Final)
                → DEPLOY
```

All gates blocking. No skips.

## Model Routing

From RULES.yaml — unchanged:
- Default: DeepSeek-chat (cheapest)
- Local first: qwen2.5-coder:3b for routine coding
- Paperclip CEO/strategic: DeepSeek-chat
- Review/security: only escalate to Sonnet/Opus with explicit approval

## Escalation: "Boil the Ocean"

From SOUL.md — the standard remains: ship the complete thing. No half-baked. No "let's table this." The answer is the finished product, not a plan to build it.
