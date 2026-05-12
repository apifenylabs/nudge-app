# MEMORY.md — Captain's Long-Term Memory

## Fleet Status (May 7)
**Overall: 3.5/10** — polished storefronts, empty shelves. Brutal assessment at `strategic-assessment-may-7.md`.

### Priority Rank
1. **Nudge** — Stripe+pricing+dashboard ready. Blocked: Supabase schema not run (needs service_role key or manual SQL)
2. **Family Travel Asia** — Best blog (20+ posts) + custom domain (familytravelasia.com). Blocked: no affiliate IDs, only 5 destinations
3. **EV Charging Asia** — 1,125 stations data. Blocked: SSG routing broken (pages 404)
4. **Apifeny AI** — Best design, Cosme clone. Cosme-style ranking algorithm deployed. Blocked: no DB, "19k tools" fabricated
5. **Luxury Travel** — 51 properties in data. Blocked: slugs mismatch (bali-001 vs names)
6. **Social Beast** — Internal tool, seed data deployed, /create fixed

### What's Blocking Revenue (All 6)
- No traffic, no distribution strategy
- Nudge: Supabase schema not run
- Family/EV/Luxury: No affiliate accounts configured
- Apifeny: Supabase DB not deployed

## Projects

### EV Charging Hub Asia → Family + Luxury EV Road Trip Planner
- **Phase 1 (May 6):** Monetization deployed — affiliate links on all 1125 station pages + Featured Family EV Stops on homepage + Price Comparison Widget
- **Live at:** https://ev-charging-asia.vercel.app
- **Next:** Fix SSG routing so station pages actually render

### apifeny.ai — AI Tools Directory (Pillar 3)
- **Status:** MVP built, deployed. Cosme-style ranking algorithm deployed.
- **Requires:** Chris runs SQL schema in Supabase dashboard (same as Nudge)
- **Live at:** https://apifeny-ai.vercel.app

### Luxury Family Travel Asia — Image Replacement
- **Infrastructure built:** photo credit overlay, image-map.json loader, gallery section on detail pages
- **51 properties in data** — slugs use `bali-001` format, need mapping to descriptive URLs
- **Live at:** https://luxury-family-travel-asia.vercel.app

### OmniMind — Zero-Knowledge AI Memory API
- **Phase 1 (Plaintext MVP)**: FastAPI + Qdrant + SQLite/PostgreSQL + React dashboard
- **Phase 2 Crypto done**: AES-256-GCM, HKDF key derivation, integrity check ✅
- **Supabase schema**: RUN (omnimind.memories table live)
- **Qdrant v1.17 fix**: Using query_points() API
- **24/24 tests passing** ✅
- **Full CRUD verified**: store, semantic search, list, delete, user isolation
- **Plugin**: OpenClaw SDK refactored (definePluginEntry)
- **Deploy**: scripts/deploy.sh (--fly, --railway, --docker)
- **PRD**: Full venture deck with business model, $1B thesis
- **Repo**: github.com/apifenylabs/omnimind
- **Next**: Deploy backend + add Stripe billing

### Nudge — Premium Family Task Manager
- **Stripe, pricing, dashboard, blog, auth — all built**
- **BLOCKED:** Signup schema not run on Supabase project
- **Deploy-schema endpoint live at:** /api/deploy-schema (returns instructions)
- **Live at:** https://nudge-sigma-liart.vercel.app

### Social Beast — Content Automation
- **Status:** Full Next.js web app built, seed data deployed, /create fixed
- **Live at:** https://social-beast-two.vercel.app

### Family Travel Asia
- **Custom domain:** familytravelasia.com ✅
- **Best blog content** (20+ posts)
- **Zero monetization** — no affiliate links configured
