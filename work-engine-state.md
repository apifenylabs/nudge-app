# Work Engine State

**Last updated:** 2026-06-06 10:07 HKT  
**Session:** Heartbeat 10:07 — Fixed ProfileProgressXP multi-level-up XP carryover bug (addXp now recalculates per level). Build ✅, deploy ✅, all 4 sites HTTP 200 ✅. Cursor advanced to next Strategic item.

## What was done this session
- ✅ **useLevelProgression.addXp fixed** — now accepts `number | ((level) => number)` so XP thresholds are recalculated per level-up, fixing multi-level-up carryover bug
- ✅ **ProfileProgressXP caller fixed** — passes recalculation function instead of static `xpNeeded`
- ✅ **Build verified** — Titan builds clean (11 routes)
- ✅ **Deploy verified** — `titan-app-puce.vercel.app` + `titan-gamma-gules.vercel.app` HTTP 200
- ✅ **Titan progression XP logic is now taut** across all 3 components: ProgressionBar (EVOLUTION_STAGES-derived), ProfileProgressXP (per-level recalculation), ProgressionCarousel (display-only)

## Priority Bucket Allocation

| Bucket | Status | Next Action |
|--------|--------|-------------|
| 🟢 Revenue (P0-P2) | ✅ All code complete. Blocked on CEO: Stripe keys, affiliate API keys, Git PAT | ⏳ CEO unblock |
| 🟢 Strategic (P3-P5) | ✅ Titan XP progression fixed + deployed. LifeOS CEO-blocked (Supabase). | → Next: AI Directory blog growth — 2-3 new posts (no env vars needed) |
| 🟢 Analytics (P6) | ✅ All 10 sites have analytics | ⏳ CEO: `NEXT_PUBLIC_GA_TRACKING_ID` |

## Backlog: Improvements for CEO-free work (next unlock)

### AI Directory (P5) — Fully CEO-free action
- [ ] Blog: generate 2-3 new posts targeting long-tail keywords (no env vars needed)
- [ ] Premium playbook: add affiliate CTAs (blocked on env vars)
- Additional SEO improvements, keyword research

### LifeOS (P3) — CEO needs: Supabase, PAT, env vars
- [ ] Apply schema SQL (supabase-schema.sql) to Supabase project
- [ ] Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel
- [ ] Deploy LifeOS with Supabase persistence (in-memory fallback currently works)
- [ ] Add screenshot previews to plugin cards

### Titan (P4)
- [x] Progression XP system edge cases fixed — multi-level-up carryover ✅
- [ ] Dashboard: verify mock data placeholders, add real API wiring when backend ready

## Projects Status

| Project | Code | Build | Deploy | GA4 | Pending |
|---------|------|-------|--------|-----|---------|
| LifeOS | ✅ 14 plugins, phase-aware chat, changelog + about + architecture pages | ✅ Clean (28 routes) | ✅ lifeos-weld.vercel.app | ✅ wired | ⏳ CEO PAT + Supabase |
| Titan | ✅ +2.8K lines, landing, dashboard, changelog, about, compare, pricing, robotics × 6 | ✅ Clean (11 routes) | ✅ titan-app-puce.vercel.app | ✅ wired | ⏳ CEO alias |
| AI Directory | ✅ 139 posts, 105 playbooks, 50+ countries | ✅ Clean (472 pages) | ✅ apifeny-ai.vercel.app | ✅ wired | ⏳ CEO env vars |
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
⬜ AI Directory: Blog growth — generate 2-3 new blog posts targeting emerging AI categories (next CEO-free action)

### Next session (when CEO unblocks anything):
→ First: any P0-P2 revenue work
→ Then: LifeOS Supabase activation (Sprint 1)
→ Then: AI Directory blog growth
→ Then: Titan dashboard API wiring
