# Work — Chris's Work Style & Preferences

## Work Patterns
- **Works in bursts** — high-energy periods followed by lower-energy recovery
- **Evenings are productive** — tends to do deep work later in the day (HK time)
- **Gets distracted easily** — needs strong automation that finishes things without him
- **Values completeness** — "boil the ocean" is the standard, not exceptions

## What He Wants
- **Felix-level autonomy** — he gives vague direction + occasional advice + dumb questions
- **System returns finished products**, not plans to build them
- **Minimal daily review** — ideally zero unless he explicitly asks

## What Annoy Him
- Wasting tokens on filler language ("Great question!", "I'd be happy to help!")
- Reporting "blocked" without shipping something else in the meantime
- Breaking existing work (always additive, never destructive)
- Over-engineering before traffic/revenue proves the concept

## Communication
- **Direct and token-efficient** — say it in fewer words
- **Bullet lists > paragraphs** in status updates
- **Only flag things he needs to act on** — don't report everything
- **End every report with a clear actionable question** (if there is one)

## Decision Style
- Prefers concrete output over analysis
- Will invest when revenue proves the concept
- Until then: move fast, ship cheap, prove value

### Historical Backfill (May 16 2026)

## Full Project Catalog

### 1. Nudge — Family Task Management Telegram Bot + PWA
**Status:** Active (deployed, schema blocked)
**Domain:** nudge-sigma-liart.vercel.app
**Stack:** Next.js 14, Supabase, Stripe, Telegram Bot (grammY)
**Description:** Natural language task capture via Telegram. Families message the bot ("Remind Jake to take out trash tonight"), bot parses and assigns. Smart reminders escalate until completion. Freemium SaaS: Free (1 user, 10 tasks/wk), Pro ($5/mo, 5 members), Family ($9/mo, unlimited).
**History:** Started April 10, 2026. Morphed from a grand multi-agent vision into a focused Next.js project. Stripe checkout flow + pricing page built. Supabase schema designed but NOT applied (blocked on service_role key). Phase 15.5 added in-app notifications + "What's Next?" contextual suggestions. Dashboard, onboarding, auth all built. Notifications table migration prepared but SQL not run.
**Blockers:** Supabase service_role key (needs Chris to copy from Supabase Dashboard), Vercel re-deploy for latest code.
**Affiliate IDs:** Klook 119991 (not yet injected), Booking.com 2875669, Viator P00299136
**Source:** Memory files 2026-04-10 through 2026-05-16, NUDGE_PLAYBOOK.md

### 2. Social Beast — Social Content Automation
**Status:** Active (partial — seed data deployed)
**Domain:** social-beast-two.vercel.app
**Stack:** Next.js, component library
**Description:** Automated social media content creation and distribution. Generates posts, manages scheduling, creates brand-consistent content across platforms. Has a component library (social-beast-components) and brand voice documentation. Seed data deployed.
**History:** Started April 2026 as secondary priority. Content generation pipeline works (creates cross-site portfolio posts, OmniMind updates). Recent output: 3 cross-site posts + OmniMind v0.3.0 launch posts. All saved to pending-posts/ directory.
**Blockers:** No social API keys (Reddit, X, LinkedIn, Pinterest) — content is generated but sits in drafts. Pinterest pipeline built (board structure, pin descriptions, upload CSV) but never uploaded.
**Source:** Memory 2026-04-10, 2026-05-16, social-beast-brand-voice.md

### 3. Apifeny AI — AI Tools, Agents & Playbooks Directory
**Status:** Active (deployed, 198 pages)
**Domain:** apifeny-ai.vercel.app (also apifenyai.com)
**Stack:** Next.js, Kaggle AI tools dataset
**Description:** AI tools directory with Cosme-style curation — ranking, scoring, editorial curation, community signals. 198 static pages. 5 complete phases: Monetization (affiliate links, CTAs, price comparison), Cosme-Style Curation (trending badges, collections), Playbooks Section (6 guides), Community Layer (comments, reviews, tips), Cross-Site Bridge (headers/badges to other sites).
**History:** Started May 5, 2026. Built in 2 days across 5 phases. Best-designed site in the portfolio. Blog has 21 posts with affiliate CTAs injected. Landing page, blog, tool detail pages all live.
**Blockers:** Affiliate account signups (needs Chris to join Jasper/Writesonic/Synthesia programs). Newsletter API not connected to Supabase.
**Source:** apifeny-ai/AGENTS.md, memory 2026-05-07, 2026-05-13

### 4. EV Charging Asia — EV Charging Station Directory
**Status:** Active (deployed, 1,125 stations)
**Domain:** ev-charging-asia.vercel.app (target: evfamilytravelasia.com)
**Stack:** Next.js, Leaflet maps, static JSON data
**Description:** EV charging station directory for Asia. 1,125 stations across 6 countries (Thailand 180, India 275, Indonesia 180, Malaysia 153, Singapore 133, Japan 204). 86 blog posts. 33 itineraries. Interactive map with filter (connector types, power levels, live status). 12 route/itinerary detail pages with RouteMap component.
**History:** Started April 28-29, 2026. SSG routing was initially broken (tried rendering 1,125 station pages at build) — fixed by switching to force-dynamic rendering May 7. 47 blog posts added by May 8, expanded to 67 by May 15, 86 by May 16. 3 EV road trip posts written. 15 new posts added May 15 overnight. Itinerary maps work. Cross-site footer links verified.
**Blockers:** Vercel redeploy needed (auth expired). DNS for evfamilytravelasia.com.
**Source:** Memory 2026-04-28, 2026-04-29, 2026-05-07, 2026-05-08, 2026-05-12, 2026-05-15

### 5. Family Travel Asia — Family Travel Directory
**Status:** Active (deployed, best blog content)
**Domain:** familytravelasia.com
**Stack:** Next.js, SSG, Supabase (schema)
**Description:** Family-friendly travel directory for Asia. 506 destinations across 230 cities, 121 countries. 39+ blog posts (best blog content in portfolio). Destination pages with 9-section structure (Hero, Quick Overview, Age-Specific Guide, Top Attractions, Tips, Family-Friendly Hotels, FAQs, etc.). Information gain layer populated (583 tips with reddit sentiment, primary sources, human-verified tips, geo scores). Cross-linked with sister sites.
**History:** Originally "Directory Beast" — started April 17-18 after Chris called out lying in reports. Massive scale push to 506 destinations by April 25. Image hallucination crisis April 25 (130/166 Unsplash IDs fake). Bootstrap-themed phase then Tailwind redesign. Carousel sections (Seasonal Picks, Top Picks, Just Added, Parent Tips, country rows). Affiliate IDs injected. 5 new blog posts pushed May 16 (Airbnb vs hotels, multi-city itinerary, cruise guide, baby travel, packing checklist) — total 117 posts.
**Blockers:** Images need real sourcing (many destination pages use placeholder/broken Unsplash). Vercel redeploy blocked.
**Source:** Memory 2026-04-17 through 2026-05-16, various daily reports

### 6. Luxury Family Travel Asia — Premium Pivot
**Status:** Active (deployed, 51 properties)
**Domain:** luxury-family-travel-asia.vercel.app
**Stack:** Next.js, Cosme-style design
**Description:** Editorially curated luxury family travel directory. Premium pivot from standard directory. 51 luxury properties across Asia with scoring + ranking system. 45 blog posts. 61 destinations loaded. Cosme-style curation layer (collections, trending markers, editor picks). Cross-site footers fixed (was pointing to wrong domain).
**History:** Started alongside Directory Beast. Premium pivot after original concept proved too generic. 23 blog posts by early May, expanded to 45 by May 16. Had a 404 crisis (old domain routing wrong) — fixed by redeploying to correct Vercel domain May 16 23:29.
**Blockers:** Slug mismatch on destination pages. Image sourcing. Affiliate setup needs Chris. 51 properties loaded but many with thin data.
**Source:** Memory 2026-05-07, 2026-05-08, 2026-05-16, work-engine-state.md

### 7. Senior Friendly Travel Asia — Smallest Site
**Status:** Active (deployed, recently fixed)
**Domain:** senior-friendly-travel-asia.vercel.app
**Stack:** Next.js
**Description:** Directory for senior/accessible travel in Asia. Smallest site in the portfolio. Was returning 404 — redeployed May 16 23:37. Cross-site footer added May 13 (7 sister-site links). Schema.org markup verified. Sitemap added.
**History:** Built as part of the senior/elder care directory concept. Minimal content compared to other sites.
**Source:** Memory 2026-05-13, HEARTBEAT.md 2026-05-16

### 8. AI Cofounder — Meal Planning & AI Tools
**Status:** Active (deployed)
**Domain:** ai-cofounder-private.vercel.app
**Stack:** Next.js
**Description:** AI-powered meal planning + AI tools portal. 16 pages with interactive wizard. Separate concept from the main directory ecosystem. More experimental/product-focused.
**Source:** HEARTBEAT.md 2026-05-16, memory fragments

### 9. OmniMind — Zero-Knowledge Memory API
**Status:** Active (v0.3.0 built, not yet launched)
**Repo:** github.com/apifenylabs/omnimind
**Stack:** Python, FastAPI, LanceDB, Kuzu, SQLite, AES-256-GCM encryption
**Description:** Zero-knowledge AI memory API. Phase 1 (plaintext) complete. Phase 2 (encryption + JWT) architecture designed. Phase 3 (OpenClaw plugin SDK) built as v0.3.0. Three-storage per chunk: LanceDB (vector + full text), Kuzu (graph edges via LLM extraction), SQLite (provenance + dedup). Plugin SDK learned: format is {label, name, description, parameters, execute}. 13/13 tests passing. PR #3 shipped. Product Hunt draft + Reddit launch post drafted.
**History:** Started April 2026. Phase 1 → Phase 2 architecture → v0.3.0 plugin. Build fixed May 16 (Kuzu v0.9.0 API learned: querySync not execute). 585 lines clean JS output. First real OpenClaw plugin from this ecosystem.
**Blockers:** NPM publish vs source-only (decision pending). GitHub push status. Advisor review of launch materials.
**Source:** Memory 2026-05-16, knowledge/omnimind.md, working session 22:11

### 10. Trading Bots — Recurring Theme
**Status:** Planned/Research (not built)
**Description:** Algorithmic trading bots concept mentioned multiple times by Chris as a "later" priority (third after apps and social). Several memory files mention "trading-playbooks" references. Not built yet.
**Source:** USER.md, memory 2026-04-10 preference list

### 11. KidScan / KidScan API — AI Food Scanner
**Status:** Planned/Research (not deployed)
**Stack:** Supabase, AI image processing
**Description:** AI-powered food scanner for kids — scan food items to check for age-appropriate ingredients, allergens, safety. Concept overlaps with Directory Beast (safety filtering). API layer planned. Research document exists (kidscan-research.md). Not built beyond planning.
**Source:** ORCHESTRA_STATUS_CHECK.md, kidscan-research.md

### 12. GeneralScan — Scanner Concept
**Status:** Abandoned
**Description:** Broader scan concept related to KidScan. AGENTS.md file exists at generalscan/AGENTS.md. Never built beyond concept.
**Source:** File system scan

### 13. ScanWise — Scanner Concept
**Status:** Abandoned
**Description:** Another scan-related concept. README exists. Same fate as GeneralScan — concept only.
**Source:** File system scan

### 14. Habit Tracker — First AppFactory App
**Status:** Inactive (built, PM2 running locally)
**Port:** 3003 (PM2 process)
**Stack:** Next.js 14, Supabase, Tailwind CSS
**Description:** First actual app from the AppFactory concept. Habit tracking with AI insights, streak calculation, calendar view, PWA-ready. Competitive analysis done (vs Habitica, Streaks, HabitNow, Productive). Core features: auth, habit creation, tracking, streaks, progress dashboard. Was running on PM2 (PID 247875, 66.7MB RAM). App Store deployment plan written.
**History:** Built April 17-21, 2026. Part of the AppFactory Beast orchestra. Never deployed beyond local PM2. Designed as PWA for iOS/Android.
**Source:** APPFACTORY_STATUS.md, APP_STORE_DEPLOYMENT_PLAN.md, memory 2026-04-21

### 15. Kids Activities Asia — Directory Concept
**Status:** Planned (thumbnail built)
**Description:** Directory of kids' activities and classes by city in Asia. Strong synergy with KidScan and Nudge. Sitemap created May 16 (48 URLs). Concept stage only — no real content.
**Source:** Memory 2026-05-16, work-engine-state.md

### 16. Affiliate Tracking — Next.js Dashboard
**Status:** Inactive (deployed, stale)
**Stack:** Next.js (bootstrapped with create-next-app)
**Description:** Affiliate link tracking and revenue monitoring dashboard. Created as part of the Affiliate Beast orchestra. Default Next.js README — never received custom implementation. Affiliate infrastructure exists across all sites (components, link helpers) but no centralized tracking dashboard data.
**Source:** ORCHESTRA_STATUS_CHECK.md, affiliate-tracking/README.md

### 17. Social Beast Components — Component Library
**Status:** Inactive
**Description:** Shared component library for Social Beast and potentially all sites. Referenced in component-library.md and social-beast-component-library.md. Never integrated across all projects.
**Source:** social-beast-component-library.md, component-library.md

### 18. Agent HQ Dashboard — Orchestra Monitoring
**Status:** Active (deployed, Felix upgrade applied)
**Domain:** agent-hq-dashboard.vercel.app
**Stack:** Vite + React
**Description:** Dashboard to monitor all orchestras, track tasks, view metrics. Built as Vite/React app. Felix upgrade applied May 16 — 6 live metrics, 10-task queue, overnight log. Mock data only (no real API integration).
**History:** First deployed April 12, 2026. Original URL verified live. Was showing older static/mock iteration until Felix upgrade.
**Source:** Memory 2026-04-12, 2026-04-15, HEARTBEAT.md 2026-05-16

### 19. Directory Beast (the original engine concept)
**Status:** Absorbed into Family Travel Asia
**Description:** The original concept of an autonomous directory-building engine that could spin up niche directories automatically. Morphologically evolved into the Family Travel Asia project. The "Directory Beast" name now refers to the PM2 process (port 3000) running the family travel directory codebase.
**Source:** Memory 2026-04-17 → 2026-04-26 evolution

## Cross-Project Ecosystem
- All sites cross-link to each other via footer (May 8 — 65 cross-site links injected)
- Cross-site footers verified on all 8+ sites (May 13)
- Vercel Analytics + SpeedInsights on all 4 main sites (May 16)
- Social Beast generates cross-portfolio content
- OmniMind designed as data backbone across all sites
