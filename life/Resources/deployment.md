# Deployment — Infrastructure Lessons

## Vercel
- **Tokens expire** — Vercel OAuth tokens don't persist across sessions
- **Always use long-lived tokens** for automated CI/CD deploys
- `vercel login` requires browser OAuth — can't be fully automated without a token
- `VERCEL_TOKEN` env var is the way to go for scripted deploys
- Deployment command: `vercel --prod --token=$VERCEL_TOKEN`
- **Vercel account:** apifenylabs-2612 (found May 16)
- **GitHub auto-deploy:** Pushing to master triggers Vercel auto-deploy for linked projects

## DNS
- **Propagation:** 5-30 minutes typically
- Some DNS providers take up to 48 hours for initial setup
- Always verify with `dig` or `curl -I` after changes

## Custom Domains
- Add domain in Vercel project settings → Domains
- Update DNS A record or CNAME as Vercel instructs
- SSL cert auto-provisions (Let's Encrypt) within minutes

## Build Process
- Next.js SSG generates static pages at build time
- Dynamic routes (`/[slug]`) with `generateStaticParams` pre-render at build
- Server-rendered routes (ƒ) are fine for API endpoints but add cold start latency

### Historical Backfill (May 16 2026)

## All Vercel Projects, Domains & Known Issues

### Live Sites (9 total, all verified 200/308 as of May 16 23:37)

| # | Site | Vercel Domain | Custom Domain | Pages | Status | Known Issues |
|---|------|--------------|---------------|-------|--------|-------------|
| 1 | **Family Travel Asia** | family-travel-directory.vercel.app | familytravelasia.com ✅ | 780+ | ✅ 200 | Vercel redeploy blocked (auth expired) |
| 2 | **EV Charging Asia** | ev-charging-asia.vercel.app | evfamilytravelasia.com (not DNS'd) | 1,260 | ✅ 200 | Target domain not pointed |
| 3 | **Luxury Family Travel Asia** | luxury-family-travel-asia.vercel.app | luxuryfamilytravelasia.com (not DNS'd) | 1,161 | ✅ 200 | Was returning 404 on all routes (old domain) — fixed May 16 23:29 |
| 4 | **Apifeny AI** | apifeny-ai.vercel.app | apifenyai.com | 198 | ✅ 200 | Cross-site footer URLs fixed May 16 |
| 5 | **Senior Friendly Travel** | senior-friendly-travel-asia.vercel.app | — | Minimal | ✅ 200 (redeployed May 16) | Was 404 — redeployed |
| 6 | **Nudge** | nudge-sigma-liart.vercel.app | — | Many | ✅ 200 | Supabase schema not applied, latest code not redeployed |
| 7 | **AI Cofounder** | ai-cofounder-private.vercel.app | — | 16 | ✅ 200 | Minimal content |
| 8 | **Social Beast Dashboard** | social-beast-two.vercel.app | — | SPA | ✅ 200 | Mock data, no real API keys |
| 9 | **Agent HQ Dashboard** | agent-hq-dashboard.vercel.app | — | SPA | ✅ 200 | Mock data only; Felix upgrade done |

### Deploy Issues Catalog
| Date | Site | Issue | Fix |
|------|------|-------|-----|
| Apr 21 | Nudge | ESLint config blocked build | Created eslint.config.js |
| Apr 28 | Nudge | 12 days of deploy failures | TypeScript strict fixes, lazy getter pattern, frozen export fix |
| Apr 29 | EV Charging | 1,125 station SSG | N/A — worked initially |
| May 7 | EV Charging | SSG routing broken (tried pre-rendering 1,125 station pages) | force-dynamic rendering |
| May 7 | All | Git push blocked by node_modules in monorepo | filter-branch to purge |
| May 12 | Family Travel | 10 broken blog posts ([object Object] content) | Sub-agent spawned to fix |
| May 12 | Luxury Travel | BASE_URL pointing to wrong site | Fixed canonical URLs + schema breadcrumbs |
| May 13 | Senior Friendly | 404 (never deployed) | Deployed to Vercel prod |
| May 16 | Luxury Travel | 404 on all routes | Redeployed to correct Vercel domain |
| May 16 | Senior Friendly | 404 again | Redeployed |

### Recurring Blockers
1. **Vercel auth expires** — most common blocker. `vercel login` requires browser OAuth.
2. **Supabase keys not shared** — service_role key needed for Nudge migrations
3. **Domains not DNS'd** — familytravelasia.com works, others don't
4. **GA4 env vars not set** — GoogleAnalytics component imported but no IDs

## Build Stats (as of May 16 2026)
- EV Charging: 86 blog posts, 33 itineraries, 1,125+ stations, 96 sitemap URLs
- Family Travel: 117 blog posts, 506 destinations, 780 pages
- Luxury Travel: 45 blog posts, 51 properties, 527 destinations, 1,104 sitemap URLs
- Apifeny: 198 static pages, 21 blog posts, 60 tool pages
- Senior Friendly: minimal pages
- All 4 apps have Vercel Analytics + SpeedInsights imported
- GA4 component wired but inactive (needs NEXT_PUBLIC_GA_TRACKING_ID env var)
- All sites have cross-site footer links (verified May 13)
