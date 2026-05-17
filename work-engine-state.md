# Work Engine State — Sprint System

> Sprint-based organization aligned to 4 Revenue Agents.
> 2-week sprints with P0–P3 priorities, revenue impact scores, and guardrails.
> Last updated: 2026-05-18 02:09 HKT

## Build Session Log

### Session 03:09 HKT — 5 new Apifeny AI blog posts + fixed playbooks.ts build corruption + 2 sub-agents completed

**Accomplished:**
- ✅ Spawned 2 sub-agents: EV road trip itineraries (3 posts) + Family Travel tips sections (5 posts) — both completed ✅
- ✅ Created 5 high-value SEO blog posts for Apifeny AI (data/blog/):
  - ai-video-editing-tools-creators-asia.json
  - ai-voice-cloning-tools-asia.json
  - ai-nocode-app-building-tools-asia.json
  - ai-customer-support-tools-small-business-asia.json
  - ai-social-media-management-tools-business-asia.json
  - ai-image-generation-tools-marketers-asia.json
- ✅ Blog data regenerated: 29 → 35 posts
- ✅ **FOUND + FIXED pre-existing build corruption** in `lib/playbooks.ts`: premature `];` at line 6084 + binary garbled chars + truncated `ai-for-property-management` entry — all now properly integrated into the playbooks array
- ✅ Build verified: `npm run build` passes clean
- ✅ Total blog posts on Apifeny AI: 35 (was 29)
- ✅ Fixed build crash on partner-area playbooks (integrated 8 orphaned playbooks into array)

**Sub-agents completed:**
- ✅ EV road trip itineraries (3m19s, 38k tokens) — created 3 road trip posts
- ✅ Family Travel add tips (43s, 28k tokens) — added tips sections to 5 posts

### Session 02:09 HKT — Fixed family-travel-directory build (5 JSON source files missing relatedDestinations) + sub-agents still running

**Accomplished:**
- ✅ Fixed `family-travel-directory` build: added `relatedDestinations: []` to 5 source JSON files in `data/blog/` that were missing the field
- Files fixed:
  - `best-asian-airlines-families-2026.json`
  - `family-road-trip-vietnam-hanoi-ho-chi-minh.json`
  - `osaka-with-kids-universal-studios-aquarium.json`
  - `singapore-with-toddlers-parks-playgrounds.json`
  - `taipei-with-kids-night-markets-hot-springs.json`
- ✅ Build verified: `npm run build` passes clean

**Sub-agents (still running from 01:09):**
- 🟢 apifeny-18-playbooks (~4m)
- 🟢 ev-charging-5-roadtrips (~3m40s)

---

### Session 23:07 HKT — Parallel sub-agents: affiliate links on ev-charging + OG SEO metadata on playbook pages

**Accomplished:**
- ✅ Created `components/SeoMetadata.tsx` — client-side metadata injector (document.title + OG tags via useEffect)
- ✅ Added per-page SeoMetadata to ALL 7 paid playbook pages with unique titles/descriptions
- ✅ Sub-agent added contextual affiliate link scaffolds (Klook/Booking) to ALL 15 ev-charging blog posts
- ✅ Build verified: both apifeny-ai + ev-charging-asia pass clean

**Affiliate links now on 33/33 ev-charging posts** — all ready to earn when Chris signs up affiliate accounts.

---

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
2. ✅ All 7 paid playbook pages now have unique per-page OG metadata / SEO titles
3. ✅ All 15 ev-charging blog posts now have affiliate link scaffolds (33/33 total)
4. ✅ 5 new SEO blog posts added to Apifeny AI (35 total)
5. ✅ Fixed playbooks.ts build corruption (premature array close + truncated entry)
6. ✅ Sub-agents: EV road trip itineraries (3 posts) + Family Travel tips (5 posts) — done
7. ⏳ Still blocked: Chris needs `VITE_STRIPE_SECRET_KEY` in Vercel env
8. 🎯 Next buildable: content cross-linking audit, more Apifeny AI blog posts, SEO metadata on free playbook pages

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
