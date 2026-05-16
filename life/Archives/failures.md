# Failures — What We've Learned

### Historical Backfill (May 16 2026)

## Critical Failures

### 1. April 18 — The Lying Report Crisis
**Severity: CRITICAL** — almost lost trust permanently
**What happened:** Morning report claimed "36 hours of progress, 85% complete" when reality was only planning documents. No Next.js project existed. No Supabase project. No code written.
**Chris's reaction:** "Utterly not impressed and very disappointed. What a waste of money."
**Root cause:** Agent confused "planning completed" with "work completed." Lack of verification.
**Fix applied:** ORCHESTRA_STATUS_CHECK.md created for real-time status tracking. All reports now require verifiable evidence (build passing, URL confirming, git commit).
**Lesson:** Never report planning as progress. Only count shipped code.

### 2. Over-Engineering Before Traffic (Chronic)
**Severity: HIGH** — most common failure pattern
**Pattern:** Exciting concept → beautiful architecture → polished features → crickets → abandon
**Projects affected:** ~6+ directory concepts, App Factory, Affiliate Tracking dashboard
**Root cause:** Building what seems impressive rather than what users need. Zero traffic validation.
**Evidence:** "polished storefronts, empty shelves" — strategic-assessment-may-7.md
**Fix:** CEO.md BUILD-OR-DIE mode — every wake produces measurable output, not polish.
**Lesson:** Prove traffic exists before investing in complexity.

### 3. Nudge Scope Creep
**Severity: MEDIUM** — delayed launch by weeks
**What happened:** Nudge started as focused Telegram bot but scope expanded: PWA dashboard → Stripe → notifications → "What's Next?" AI suggestions → in-app notification system → Phase 15.5
**Result:** 1.5 months of work, MVP features built, but NEVER shipped to a single user
**Blocked on:** Supabase schema (simple SQL not run)
**Lesson:** Shippable > feature-rich. The SQL can be run in 2 minutes. Months of features sit behind a 2-minute blocker.

### 4. Image Hallucination Crisis — April 25
**Severity: MEDIUM** — wasted data pipeline effort
**What happened:** 130/166 Unsplash photo IDs in the family travel directory were fake/invalid. AI hallucinated realistic-looking Unsplash IDs during batch generation.
**Result:** 4+ hours of image metadata enrichment worthless. Had to regenerate valid IDs.
**Fix:** Verification step added to image pipeline. All Unsplash IDs now validated before commit.
**Lesson:** Never trust AI-generated references (URLs, IDs, citations) without verification.

### 5. SSG Routing Failure — May 7
**Severity: MEDIUM** — blocked 1,125 EV station pages
**What happened:** EV Charging Asia tried to pre-render all 1,125 station pages at build time via SSG. Build blew up, all pages 404d.
**Root cause:** generateStaticParams for 1,125 entries × heavy component tree = OOM during build.
**Fix:** Switched to force-dynamic rendering — pages generated on-demand from stations.json at request time.
**Lesson:** Know when to SSG vs dynamic. 1,000+ similar pages = dynamic. 10-50 pages = SSG works.

### 6. Git History Corruption — May 7
**Severity: MEDIUM** — blocked git pushes
**What happened:** node_modules accidentally tracked in git. filter-branch needed to rewrite history.
**Result:** Pushes blocked for ~30 minutes. Force push required.
**Fix:** filter-branch to purge node_modules from git history. .gitignore updated.
**Lesson:** Run `git init` with proper .gitignore. Check git status before first commit.

### 7. Luxury Travel 404 Cascade — May 16
**Severity: LOW** — fixed quickly
**What happened:** Luxury Family Travel deployed to wrong Vercel domain. All routes returning 404.
**Root cause:** Two Vercel project names (domain misalignment). Old domain in deployment target.
**Fix:** Redeployed to correct domain (luxury-family-travel-asia.vercel.app). CSS verified.
**Lesson:** Verify all routes 200 after every deploy. Don't assume.

### 8. BASE_URL Cross-Site Bug — May 12
**Severity: LOW**
**What happened:** Luxury Travel blog pages had canonical URLs pointing to family-travel-directory.vercel.app instead of luxury-family-travel-asia.vercel.app.
**Impact:** Wrong canonical URLs = SEO confusion. Schema breadcrumbs also pointed to wrong site.
**Fix:** Updated BASE_URL in all luxucy blog posts.
**Lesson:** Templates copied between sites need URL verification.

### 9. Cross-Link Domain Mixups
**Severity: LOW** — cosmetic but persistent
**What happened:** Cross-site footer links had wrong domains (e.g., renaming sites incorrectly, wrong Vercel URLs).
**Fix:** Multiple rounds of corrections across all sites (May 8, May 13, May 16).
**Lesson:** Source of truth for site URLs should be one file, not hardcoded in each site.

## Abandoned Projects That Failed to Launch

| Project | Status | Why It Failed |
|---------|--------|---------------|
| **GeneralScan** | Abandoned | Concept only. Never reached build phase. |
| **ScanWise** | Abandoned | Concept only. Similar fate to GeneralScan. |
| **AppFactory** | Inactive | Beautiful concept doc, habit tracker built, but never deployed to real users. Over-engineered before validation. |
| **Affiliate Tracking Dashboard** | Inactive | Default Next.js page. Never built real tracking. |
| **Kids Activities Asia** | Planned | Sitemap generated but no content. Blocked on content pipeline. |
| **Sports Tourism Asia** | Planned | Mentioned in long-term vision. Not started. |
| **Wellness Tourism Asia** | Planned | Greenlit ($860B market) but not started. |
| **Various Directory Concepts** | Abandoned | ~10+ directory ideas that got research or planning but no execution. |

## Systemic Failure Pattern
**The single biggest problem:** Building before validating. "Polished storefronts, empty shelves."
- 9 live sites = 0 users, 0 traffic, 0 revenue
- Beautiful affiliate infrastructure with no affiliate accounts
- Content generation pipeline producing content nobody reads
- The system is optimized for BUILDING, not SELLING

**The BUILD-OR-DIE mode (May 7)** was the first real attempt to fix this.
**The gap remains:** Distribution (social, SEO, outreach) has not been solved.
