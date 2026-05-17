# Work Engine State — Sprint System

> Sprint-based organization aligned to 4 Revenue Agents.
> 2-week sprints with P0–P3 priorities, revenue impact scores, and guardrails.
> Last updated: 2026-05-17 15:07 HKT

## Build Session Log (Hourly CEO Engine)

### Session 15:07 HKT — Zero-Excuse Build Queue

**Spawned sub-agents:**
1. 🟡 `luxury-slug-fix` — Fix Luxury destination slug routing to match data
2. 🟡 `family-travel-blog` — Generate 5 blog posts for familytravelasia.com

**Direct work this session:**
- ✅ Verified cross-site footer links already present on all 4 sites (Family, Luxury, EV, Apifeny)
- ✅ Verified schema.org sameAs arrays link all sites to each other

**Next session cursor:** Wait for sub-agents to complete, then verify + log results. If done, move to Zero-Excuse Queue #6 (Fix Apifeny tool detail pages).

---

## Current Sprint: May 17–31, 2026 (Sprint 1)

### Sprint Goal
**Ship first revenue** — finalize Apifeny AI monetization + prepare Nudge for launch. No new directories, no domains, no side projects.

### Sprint Backlog

#### P0: Apifeny AI MVP Completion
| Task | Revenue Impact | Effort | Dependencies |
|------|:--------------:|:------:|:------------:|
| ✅ Create 1st playbook landing page (AI Solopreneur Toolkit) | HIGH ($19/sale) | DONE ✅ | None |
| ✅ Create 2nd playbook landing page (Directory Builder) | HIGH ($19/sale) | DONE ✅ | None |
| ✅ **Create 3rd playbook landing page (AI Workflow Automation)** | HIGH ($9-$29/sale) | **DONE ✅** | None |
| ✅ Organize tool rankings by pipeline stage (ideate→build→launch→scale) | MEDIUM (discoverability) | DONE ✅ | None |
| ✅ PDF API supports all 3 products (generate-pdf route) | HIGH (enables sales) | DONE ✅ | None |
| ✅ Link routing: paid playbooks → /playbooks/[slug], free → /playbook/[slug] | MEDIUM (UX) | DONE ✅ | None |
| ✅ Add [CEO-REVIEW] research to playbook content | MEDIUM (quality) | DONE ✅ | Research done ✅, content verified |
| **Total P0:** 0 tasks remaining ✅ | Revenue: unbounded (first $ matters) | ALL DONE ✅ | — |
| **BUILD VERIFIED:** `npm run build` passes ✅ | | | |

#### P1: Nudge Monetization
| Task | Revenue Impact | Effort | Dependencies |
|------|:--------------:|:------:|:------------:|
| Prepare supabase-schema.sql with copy-paste instructions | MEDIUM ($5-$9/mo/user) | 15m | Schema file exists |
| Write "Schema Setup Guide" for Chris (3 steps, <1 min) | MEDIUM | 10m | Schema prep done |
| Verify pricing page + Stripe test flow works | MEDIUM | 30m | Schema must run |
| **Total P1:** 3 tasks | Revenue: $5-$9/mo per user | ~55m | Blocked: Chris runs schema |

#### P2: Traffic + First Sales
| Task | Revenue Impact | Effort | Dependencies |
|------|:--------------:|:------:|:------------:|
| Cross-link Apifeny playbooks → directory sites | LOW (organic traffic) | 30m | P0 done 🟢 |
| ✅ Cross-link directories → Apifeny AI | LOW | ✅ DONE — already in place from Phase E | None |
| SEO keyword audit for Apifeny AI homepage | LOW (long-term) | 30m | None |
| **Total P2:** 3 tasks | Revenue: indirect | ~1.25h | — |

#### P3: Future Prep (Do NOT start until $1k MRR)
| Task | Revenue Impact | Notes |
|------|:--------------:|:------|
| New directory or product evaluation | HIGH but premature | Must pass Revenue-First Guardrail + New Project Guardrail |
| Domain purchases | $0 | Only after $1k MRR. Chris pays for 3-4 max. |
| Senior / Kids content | $0 | **DEPRIORITIZED** — zero effort. No domain, no content. |

### Blockers (Need Chris)
1. **Supabase schema** — nudge/supabase-schema.sql → paste in Supabase SQL Editor (30 sec)
2. **VITE_STRIPE_SECRET_KEY** — set in Vercel env for apifeny-ai (enables PDF sales)
3. **Vercel deploy auth** — no vercel token available, can't deploy
4. **Affiliate accounts** — Klook, Booking, Viator (content ready, just needs signup)

### Revenue Dashboard
| Project | Status | MRR | Path to First $ |
|---------|--------|:---:|:---------------:|
| Apifeny AI | Sprint P0 | $0 | PDF playbook sales ($9 each) — 3 products live, needs deploy + Stripe key |
| Nudge | Sprint P1 (blocked) | $0 | Subscriptions ($5-9/mo) |
| Directories | Waiting on affiliates | $0 | Affiliate commissions |
| Social Beast | Waiting on API keys | $0 | Traffic/lead attribution |

### Guardrails
- ✅ Revenue-First Filter: Every task passes the 3-question gate
- ✅ New Project Guardrail: Any new project needs research + business case + approval
- ✅ Zero new domains: Chris pays for 3-4 max, only after $1k MRR
- ✅ Deprioritized: Senior, Kids — ZERO effort until $1k MRR

---

## Sprint Cadence

- **Sprint length:** 2 weeks
- **Review:** Every Sunday (weekly check-in)
- **Adjustment:** Based on treasury.md + research-archive findings
- **Backlog grooming:** When P0 tasks complete, P1 becomes P0. Never start P3 before P0-P2 done.

## Task State Rules
- ✅ Done — completed and verified
- 🔄 In Progress — actively working
- ⏳ Blocked — waiting on Chris (prepare materials, report status)
- 📋 Ready — in backlog, next available
- ❌ Skipped — deferred to future sprint
