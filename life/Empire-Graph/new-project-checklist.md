# New Project Onboarding Checklist

> MANDATORY — CEO agent must complete ALL items before any new project goes live.
> LOCKED May 17 2026.

## Phase 1: Concept Approval

- [ ] **Revenue-First Filter passed?** (RULES.yaml revenue_first_filter — 3 questions: direct revenue? simplest version? ship without Chris?)
- [ ] **New Project Guardrail satisfied?** (data-backed research + business case with flywheel synergy + projected MRR)
- [ ] **Assigned to correct Revenue Agent?** (Directory / Nudge / Social Beast / AI Innovation)
- [ ] **Human approval received** for domain purchase and go-live? (Required until $10k MRR. Record in ceo-central-log.md)

## Phase 2: Infrastructure

- [ ] **Dedicated topic log created** (`life/Empire-Graph/<projectname>-log.md`) with:
  - Project name, slug, owner agent
  - Revenue target (monthly MRR goal)
  - Launch date
  - Key milestones
- [ ] **Projects index updated** (`life/projects-index.md`) with:
  - Status (`concept / building / live / deferred / archived`)
  - Revenue target
  - Owner agent
  - Launch date
- [ ] **Cross-project synergies updated** (`life/cross-project-synergies.md`) — what flywheel connections exist?
- [ ] **CEO central log updated** (`life/ceo-central-log.md`) — summary entry with key details

## Phase 3: Technical

- [ ] **Domain registered** (if applicable) — requires human action or explicit approval
- [ ] **Repo initialized** (if applicable) — require Vercel/GitHub setup
- [ ] **Deployment configured** — CI/CD, env vars, secrets
- [ ] **Site health check added** to watchdog.sh
- [ ] **Stripe/product keys configured** if charging

## Phase 4: Revenue

- [ ] **Monetization strategy documented** in the topic log
- [ ] **Affiliate accounts created** (if directory) or **payment integration set up** (if SaaS)
- [ ] **Revenue tracking configured** — linked to treasury (`life/Resources/treasury.md`)
- [ ] **First revenue target set** with deadline

## Phase 5: Launch

- [ ] **All Phase 1-4 items complete**
- [ ] **Build passes** (npm run build or equivalent) — no errors
- [ ] **Sites 200 OK** — verified by curl/headless check
- [ ] **Final human approval recorded** in ceo-central-log.md
- [ ] **Launch entry logged** in project-edit-log.md with `[LAUNCH]` tag

---

## Quick Reference

```yaml
# Template for project-edit-log.md entries
- date: "YYYY-MM-DD HH:MM TZ"
  project: "project-name"
  type: "NEW / EDIT / STATUS / LAUNCH / DEFER / ARCHIVE / SELF-HEAL"
  summary: "What changed and why"
  files_updated:
    - "life/projects-index.md"
    - "life/cross-project-synergies.md"
    - "life/Empire-Graph/<project>-log.md"
    - "life/ceo-central-log.md"
  agent: "CEO / Sub-agent"
```
