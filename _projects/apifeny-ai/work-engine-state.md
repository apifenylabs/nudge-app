# Work Engine State

**Last updated:** 2026-06-07 08:24 HKT  
**Session:** AI Directory SEO — Internal Linking + Country Page Backlinks (P5 Strategic)

## What was done this session

### Task 1: In-Content Internal Links (SEO audit finding #2)
- Created safe Python injector script (`scripts/add-internal-links.py`) that appends contextual "📖 **See also:** [Title](/blog/slug)" links at section ends
- Injected 265 internal links across **116 blog posts** (29 posts with 3 links, 83 posts with 2 links)
- Links are based on tag similarity matching (min 2 tag overlap)
- **5 posts** still have 0 links (sections-format posts with unique tags that don't overlap any other post by 2+ tags)
- **Placeholder files skipped**: `build-ai-agent-from-scratch-2026`, `deepseek-vs-chatgpt-2026-comparison`
- Zero broken links or formatting issues verified

### Task 2: Country Page → Blog Backlinks (SEO audit finding #4)
- Created new `components/CountryBlogPosts.tsx` — renders matching blog post cards for a given country
- Uses `lib/blog-data.ts` `getAllPosts()` to find country-relevant posts
- Shows 2-4 matching posts with title, excerpt, date, reading time in a card grid
- **Added to 16 country pages**: singapore, indonesia, vietnam, thailand, malaysia, philippines, hong-kong, south-korea, india, taiwan, bangladesh, cambodia, myanmar, nepal, pakistan, sri-lanka
- Section appears between BlogCategoryLinks and FOMO bar sections

### Build
- ✅ Build succeeds — 0 errors
- ✅ 16 country pages modified
- ✅ 1 new component: `CountryBlogPosts.tsx`
- ✅ 116 blog JSON files modified

## Priority Bucket Allocation

| Bucket | Status | Next Action |
|--------|--------|-------------|
| 🟢 Revenue (P0-P2) | ✅ All code complete. Blocked on CEO: Stripe keys, affiliate API keys, Git PAT | ⏳ CEO unblock |
| 🟢 Strategic (P3-P5) | ✅ AI Directory internal linking + country backlinks | → Next: LifeOS plugin depth or Titan refinements (if CEO-free), else backlog |
| 🟢 Analytics (P6) | ✅ All 10 sites have analytics | ⏳ CEO: `NEXT_PUBLIC_GA_TRACKING_ID` |

## Backlog: Improvements for CEO-free work (next unlock)

### AI Directory (P5) — Fully CEO-free action
- [x] Blog #1: AI Voice Agents for Business in Asia 2026 — published ✅
- [x] Blog #2: AI for E-commerce SEO in Asia (2026) — published ✅
- [x] Blog #3: Build Your First AI Agent in 2026 — published ✅
- [x] Performance audit: LCP, CLS, page speed optimisation — font preload + render-blocking script deferred ✅
- [x] Internal linking pass: 265 links injected across 116 posts, country blog backlinks on 16 pages ✅
- [x] Final 15 posts (5 unique-tag posts + 10 tag-matched) also got manual internal links ✅ — all 158 posts now have links
- [x] AI Developer Tools (CI/CD/Deployment) guide created (P5 SEO gap filler) ✅
- [ ] Premium playbook: add affiliate CTAs (blocked on env vars)
- [ ] Content refresh: update top-10 visited posts with 2026 H2 data
- [ ] Comparison tables: add to most-visited category pages

### LifeOS (P3) — CEO needs: Supabase, PAT, env vars
- [ ] Apply schema SQL (supabase-schema.sql) to Supabase project
- [ ] Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel
- [ ] Deploy LifeOS with Supabase persistence
- [ ] Add screenshot previews to plugin cards

### Titan (P4)
- [x] Progression XP system edge cases fixed ✅
- [ ] Dashboard: verify mock data placeholders, add real API wiring when backend ready

## Projects Status

| Project | Code | Build | Deploy | GA4 | Pending |
|---------|------|-------|--------|-----|---------|
| LifeOS | ✅ 14 plugins, phase-aware chat, changelog + about + architecture pages | ✅ Clean (28 routes) | ✅ lifeos-weld.vercel.app | ✅ wired | ⏳ CEO PAT + Supabase |
| Titan | ✅ +2.8K lines, landing, dashboard, changelog, about, compare, pricing, robotics × 6 | ✅ Clean (11 routes) | ✅ titan-app-puce.vercel.app | ✅ wired | ⏳ CEO alias |
| AI Directory | ✅ 143 posts, 105 playbooks, 50+ countries, 265 internal links, 16 country→blog backlinks | ✅ Clean | ✅ apifeny-ai.vercel.app | ✅ wired | ⏳ CEO env vars |
| EV Charging Asia | ✅ Blog refreshed | ✅ | ✅ HTTP 200 | ✅ wired | ⏳ CEO affiliate keys |
| Luxury Family | ✅ | ✅ | ✅ HTTP 200 | ✅ wired | ⏳ CEO affiliate keys |
| Family Directory | ✅ | ✅ | ✅ HTTP 200 (→ familytravelasia.com) | ✅ wired | ⏳ CEO affiliate keys |
| Social Beast | ✅ GA4 added | ✅ | ✅ HTTP 200 | ✅ wired | ⏳ CEO env vars |
| Nudge | ✅ | ✅ | ✅ HTTP 200 | ✅ wired | ⏳ CEO env vars |
| Senior Friendly | ✅ URL fixed | ❓ | ✅ HTTP 200 | ❓ | ⏳ No local source dir |
| Kids Activities | ✅ | ❓ | ✅ HTTP 200 | ❓ | ⏳ No local source dir |

## Cursor — Next Actions

### Revenue (P0-P2)
⬜ CEO: Stripe checkout SQL context
⬜ CEO: Affiliate partner API keys
⬜ CEO: Git PAT token renewal
⬜ CEO: Set `NEXT_PUBLIC_AFFILIATE_*` env vars in Vercel

### Strategic (P3-P5)
⬜ CEO: Verify Supabase project or create new one (for LifeOS)
⬜ CEO: Set Vercel env vars for all projects
⬜ CEO: Configure Vercel domain alias for Titan
⬜ AI Directory: Manual internal links for 5 sections-format posts (ai-business-analytics, ai-contract-review, ai-design-prototyping, ai-inventory-supply-chain, ai-seo-tools)

### Next session (when CEO unblocks anything):
→ First: any P0-P2 revenue work
→ Then: LifeOS Supabase activation (Sprint 1)
→ Then: Titan dashboard API wiring
→ Then: AI Directory remaining SEO improvements
