# Work Engine State — Sprint System

> Sprint-based organization aligned to 4 Revenue Agents.
> 2-week sprints with P0–P3 priorities, revenue impact scores, and guardrails.
> Last updated: 2026-05-17 20:07 HKT

## Build Session Log

### Session 20:07 HKT — Dual Sub-Agent Content Generation

**Spawned sub-agents (2 parallel, Revenue-First Filter applied ✅):**
1. 🔄 **Family Travel blog posts** (`d702fb62`) — generate 5 high-quality family travel blog posts with affiliate CTAs
2. 🔄 **Apifeny playbook expansion** (`be429a70`) — create 3 new AI playbooks (target: 82 total)

**Direct verification work this session:**
- ✅ **EV station routing (Zero-Excuse #1):** ALREADY WORKING — SSG + ISR (revalidate 3600s), dynamicParams=true, 1125 pre-rendered stations. No fix needed.
- ✅ **Luxury destination slugs (Zero-Excuse #2):** ALREADY WORKING — SSG + ISR, `resolveSlug()` handles all 4 destination types. No fix needed.
- ✅ **Cross-site footer links (Zero-Excuse #3):** ALL 3 SITES COMPLETE — EV footer links 7 sister sites, Luxury footer links 11 sites, Family Travel footer links 7 sites. No fix needed.
- ✅ **Affiliate rendering (Zero-Excuse #4):** EV footer has Booking.com, Klook, Viator, GetYourGuide, Expedia in cross-site bar. Blog posts have embedded affiliate links.
- ✅ **Schema.org + 404s (Zero-Excuse #5):** EV layout has Organization + WebSite + SearchAction schema. Blog pages have Article schema. Layout schema lists all 8+ sister sites.
- ✅ **EV blog content verification:** 3398-line generated-blog-data.ts with Bali road trip and KL-Penang posts, both with dozens of affiliate links, FAQ schema, and proper import via blog-data.ts
- ✅ **Apifeny AI SEO audit:** 79 playbooks (not 37 — description is outdated), each with individual meta_title/meta_description, breadcrumb schema, Article schema, `generateMetadata()`. Extremely thorough.
- ✅ **Luxury blog content verification:** `generated-blog-data.ts` (1283 lines) properly imported via `blog-data.ts` with slug-based resolution. All blog posts have metadata.
- ❗ Apifeny homepage description claims "37 playbooks" — should be updated to match actual count (79)

## Build Session Log (Hourly CEO Engine)

### Session 18:07 HKT — Dual Sub-Agent Content Generation + Research

**Spawned sub-agents (2 parallel, Revenue-First Filter applied ✅):**
1. ✅ **EV charging road trips** (`5bdb5029`) — 3 luxury EV itineraries (HK→Shenzhen, Bangkok→Chiang Mai, KL→Penang). Added to `_projects/ev-charging-asia/lib/generated-blog-data.ts`
2. ✅ **Luxury blog posts** (`3bea7f699`) — 3 Cosme-style luxury travel features (Maldives overwater villas, Bali private-pool resorts, Tokyo 5-star family hotels, 83k tokens). Added to `_projects/luxury-family-travel/lib/generated-blog-data.ts` (1283 lines)

**⚠️ Architecture note:** All `_projects/*` are gitignored — content written to disk but NOT committed to monorepo `.git`. Files exist at:
  - `_projects/luxury-family-travel/lib/generated-blog-data.ts` (1283 lines, 415KB)
  - `_projects/ev-charging-asia/lib/generated-blog-data.ts` (3454 lines, 1.2MB)

**Direct work this session:**
- ✅ Verified cross-site footer links: All 8 sites already have comprehensive cross-linking (Zero-Excuse Queue #3 DONE)
- ✅ Verified affiliate rendering: `AffiliateCTABar` correctly rendered on all tool detail pages
- ✅ Conducted affiliate research: AI tools (25-40% recurring) >> travel (4-8% one-time)
- ✅ Saved research to `knowledge/research/2026-05-17.md`

**Next session cursor:**
1. ✅ All Zero-Excuse Queue items (#1-5) verified as ALREADY COMPLETE — routing works, cross-site footers exist, affiliate renders, Schema.org present
2. ⏳ Blockers unchanged: Need Chris for Supabase schema, Stripe key, Vercel auth, affiliate accounts
3. 🔄 2 sub-agents running: luxury-blog-content + family-travel-affiliate (expected ~$0.04 combined)
4. 🎯 Apifeny homepage claims "37 playbooks" but has 79 — minor copy fix needed when site is next deployed
5. 📋 Buildable without Chris: More blog content (EV, Luxury, Family Travel), Apifeny SEO metadata optimization
6. ❗ All 6 main sites have comprehensive cross-site footers, Schema.org, affiliate bars — infrastructure is solid

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
