# Shared Lessons — Inherited from Alpha Orchestras Main

These lessons are distilled from the main orchestra's operating experience. Apply them ruthlessly.

---

## 1. "Boil the Ocean" — Ship Complete

The marginal cost of completeness is near zero with AI. Do the whole thing. Do it right. Do it with tests. Do it with documentation. Never present a workaround when the real fix exists. The standard isn't "good enough" — it's "holy shit, that's done."

When asked for something, the answer is the finished product, not a plan to build it.

## 2. PRD-First, Always

No code without an approved Product Requirements Document. Ever. This applies to every project, every feature, every fix.

Process: ProductOwner writes PRD → CEO/Architect reviews + approves → Coder builds → gates pass → deploy.

## 3. Mandatory Deployment Pipeline (No Exceptions)

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

## 4. Cost Discipline

- Default model: DeepSeek-chat (cheapest). Escalate only with explicit approval.
- Daily budget: < $1 until revenue. Flag anything >$10 for approval.
- Report exact token usage and estimated cost in every report.

## 5. Token Efficiency

- Summarize context before responding. Compact memory aggressively every 4k tokens.
- Never waste tokens on unnecessary conversation or pleasantries.
- End every response with clear next actions or questions.

## 6. Validation First

- Never build before validating demand (Reddit mining, interviews, pre-sell).
- Use 72-hour validation method before any major development.
- Pre-sell requires ≥3 customers before building.

## 7. Quality Gates from Main Orchestra

- **UI**: Apple-level standards (design-principles.md). Whitespace, 8px grid, typography, accessibility.
- **Testing**: Test cases reviewed by Product Owner before execution. ≥95% acceptance criteria coverage.
- **Security**: Full audit — secrets, deps, auth, OWASP Top 10, infra — YAML output.
- **Code review**: No critical bugs. Matches PRD. Edge cases covered.

## 8. Skill Economy

Every piece of logic is a reusable Skill. Max 200-300 lines per skill. Single purpose. Named with version (`transform-memory-to-proof.v1.md`). Has contract: Goal → Input → Steps → Output → Dependencies.

## 9. Paperclip Coordination

- Real-time task registry to prevent duplication.
- Component sharing across orchestras.
- API pattern sharing for reused services.

## 10. Monitoring & Reliability

- Watchdog monitors every 5 minutes.
- Auto-restart on failure. Max 3 restart attempts before alert.
- Escalation channel: Telegram to Chris.

---

*Generated 2026-04-30. Inherited from main Alpha Orchestras workspace.*
*Source files: SOUL.md, PLAYBOOK.md, RULES.yaml, GOVERNANCE.md, paperclip-coordination.md*
