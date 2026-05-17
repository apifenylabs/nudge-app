# Work Engine State — Sprint System

> Sprint-based organization aligned to 4 Revenue Agents.
> 2-week sprints with P0–P3 priorities, revenue impact scores, and guardrails.
> Last updated: 2026-05-17 22:30 HKT

## Build Session Log

### Session 22:07 HKT — Fixed critical revenue leak: ALL 7 paid playbooks now go through Stripe checkout

**Revenue-critical fix:**
- 🔴 **CRITICAL BUG FOUND**: 6 of 7 paid playbook pages ($2-$19) were using `/api/generate-pdf` for direct free download — NO payment processing. Only the Solopreneur Toolkit had a separate Stripe route.
- ✅ **Expanded `/api/create-checkout/route.ts`** — now supports ALL 7 products with individual pricing:
  - AI Solopreneur Toolkit ($9)
  - Directory Builder Template ($19)
  - AI Workflow Automation ($9)
  - AI for E-Commerce ($2)
  - AI for Marketing Automation ($10)
  - AI Sales Funnel Builder ($9)
  - AI Marketing for Asia ($12)
- ✅ **Updated ALL 6 affected pages** to use `/api/create-checkout` instead of free PDF generation:
  - `ai-solopreneur-toolkit` ✅
  - `directory-builder` ✅
  - `ai-workflow-automation` ✅
  - `ai-for-ecommerce` ✅
  - `ai-for-marketing-automation` ✅
  - `ai-sales-funnel-builder` ✅
  - `ai-marketing-for-asia` ✅
- ✅ **Build verified:** `npm run build` passes clean — all routes generated successfully

**Context:**
The `generate-pdf` API served PDFs directly without any payment gate. Anyone clicking "Download $19" got the file for free. This was the #1 revenue blocker — not schema, not Stripe keys, not Vercel auth. This fix means: once `VITE_STRIPE_SECRET_KEY` is set in Vercel env, all 7 products will process real payments.

### Session 21:55 HKT — Nudge Admin: Subscriptions page + affiliate research
### Session 21:07 HKT — Dual Sub-Agent Content Generation

**Next session cursor:**
1. ✅ Revenue leak fixed — all playbooks now require Stripe checkout
2. ⏳ Still blocked: Chris needs to set `VITE_STRIPE_SECRET_KEY` in Vercel env for real payments
3. 🎯 Next buildable: SEO metadata on playbook pages, affiliate links on directory sites

---

## Current Sprint: May 17–31, 2026 (Sprint 1)

### Sprint Goal
**Ship first revenue** — finalize Apifeny AI monetization + prepare Nudge for launch.

### Sprint Backlog

#### P0: Apifeny AI MVP Completion
| Task | Revenue Impact | Effort | Dependencies |
|------|:--------------:|:------:|:------------:|
| ✅ Create 1st playbook landing page (AI Solopreneur Toolkit) | HIGH ($19/sale) | DONE ✅ | None |
| ✅ Create 2nd playbook landing page (Directory Builder) | HIGH ($19/sale) | DONE ✅ | None |
| ✅ Create 3rd playbook landing page (AI Workflow Automation) | HIGH ($9-$29/sale) | DONE ✅ | None |
| ✅ Organize tool rankings by pipeline stage | MEDIUM | DONE ✅ | None |
| ✅ PDF API supports all 3 products (generate-pdf route) | HIGH (enables sales) | DONE ✅ | None |
| ✅ Link routing: paid → /playbooks/[slug], free → /playbook/[slug] | MEDIUM | DONE ✅ | None |
| ✅ Add [CEO-REVIEW] research to playbook content | MEDIUM | DONE ✅ | All done ✅ |
| ✅ **Fix revenue leak: ALL 7 playbooks now use Stripe checkout** | **CRITICAL** | **DONE ✅** | **None** |
| **P0 remaining:** Set `VITE_STRIPE_SECRET_KEY` in Vercel env | — | 30s | Chris action |
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
| ✅ Cross-link Apifeny playbooks → directory sites | LOW (organic traffic) | ✅ DONE | None |
| ✅ Cross-link directories → Apifeny AI | LOW | ✅ DONE | None |
| SEO keyword audit for Apifeny AI homepage | LOW (long-term) | 30m | None |
| **Total P2:** 1 task remaining | Revenue: indirect | ~30m | — |

#### P3: Future Prep (Do NOT start until $1k MRR)
| Task | Revenue Impact | Notes |
|------|:--------------:|:------|
| New directory or product evaluation | HIGH but premature | Must pass Revenue-First Guardrail |
| Domain purchases | $0 | Only after $1k MRR |
| Senior / Kids content | $0 | **DEPRIORITIZED** — zero effort |

### Blockers (Need Chris)
1. ⚡ **VITE_STRIPE_SECRET_KEY** — set in Vercel env for apifeny-ai (NOW THE #1 REVENUE BLOCKER — all 7 products ready to sell)
2. **Supabase schema** — nudge/supabase-schema.sql → paste in Supabase SQL Editor (30 sec)
3. **Vercel deploy auth** — no vercel token available, can't deploy
4. **Affiliate accounts** — Klook, Booking, Viator (content ready, needs signup)

### Revenue Dashboard
| Project | Status | MRR | Path to First $ |
|---------|--------|:---:|:---------------:|
| Apifeny AI | Sprint P0 | $0 | **Ready to sell** — 7 playbooks ($2-$19 each), 0$ until Stripe key set |
| Nudge | Sprint P1 (blocked) | $0 | Subscriptions ($5-9/mo) |
| Directories | Waiting on affiliates | $0 | Affiliate commissions |
| Social Beast | Waiting on API keys | $0 | Traffic/lead attribution |

### Guardrails
- ✅ Revenue-First Filter: Every task passes the 3-question gate
- ✅ New Project Guardrail: Any new project needs research + business case + approval
- ✅ Zero new domains: Chris pays for 3-4 max, only after $1k MRR
- ✅ Deprioritized: Senior, Kids — ZERO effort until $1k MRR
