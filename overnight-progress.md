# 🌙 Overnight Build — June 12, 2026 @ 01:30 HKT

## Results: ✅ All 6 sites verified 200 OK

| # | Project | Changes | URL | HTTP | Notes |
|---|---------|---------|-----|------|-------|
| 1 | **family-travel-directory** | ✅ Clean — no changes | familytravelasia.com | 200 | Standalone repo, no deploy needed |
| 2 | **luxury-family-travel** | ✅ Clean — no changes | luxury-family-travel.vercel.app | 200 | Standalone repo, no deploy needed |
| 3 | **ev-charging-asia** | ✅ Pushed (monorepo) | ev-charging-asia.vercel.app | 200 | Auto-deploy triggered via git push |
| 4 | **apifeny-ai** | ✅ Pushed (monorepo) — 15+ new blog posts, AI news section, country comparisons, monthly roundup | apifeny-ai.vercel.app | 200 | Auto-deploy triggered via git push |
| 5 | **nudge** | ✅ Pushed (monorepo) | nudge-sigma-liart.vercel.app | 200 | Auto-deploy triggered via git push |
| 6 | **social-beast** | ✅ Clean — no changes | social-beast-two.vercel.app | 200 | Standalone repo, no deploy needed |

## Deployment Actions

### Git Push (triggered Vercel auto-deploys)
- **Monorepo** (nudge-app): Committed 699 changed files and pushed to `origin/master`
  - `_projects/apifeny-ai/` — 15+ new blog posts, AI news section (2 pages), country comparison pages, monthly roundup, trending page, +1 deleted partial file
  - `_projects/senior-friendly-travel/` — Full project scaffold (new)
  - `_projects/titan/` — Waitlist page, atoms components, Footer
  - `titan-app/` — Changelog, pricing, features pages
  - `lib/generated-blog-data.ts` — Updated blog data
  - Various `titan/src/` page updates

### Known Issues
- **luxury-family-travel-asia.vercel.app** → 404 (old URL). Correct URL is **luxury-family-travel.vercel.app** (200 ✅)
- **VERCEL_TOKEN expired** — cannot use `vercel deploy --prod --yes` CLI command. Using git push to trigger Vercel auto-deploys instead (works via GitHub integration with stored PAT).
- The stored VERCEL_TOKEN (`vcp_32aEub...`) is invalid. Needs regeneration from Vercel dashboard if CLI deploys are preferred.

## Vercel CLI Status
- `vercel whoami` → Error (token invalid)
- Workaround: Git push to GitHub → Vercel auto-deploy ✅

## Health Check Time
- Checked at: 01:35 HKT (2026-06-11 17:35 UTC)
- Result: ✅ All 6 sites returning 200
