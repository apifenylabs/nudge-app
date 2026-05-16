# Site Health Audit — May 16, 2026 08:14 HKT

## Summary

Audited 7 sites for broken links, 404s, stale content, and DNS/config issues. **Critical issues found on 4 of 7 sites.** Fixes applied to source code (awaiting deploy).

## Per-Site Results

### ✅ Apifeny AI (apifeny-ai.vercel.app — 163 pages)
- **Status:** Healthy
- **Homepage:** 200 ✅
- **All tool pages:** 200 ✅ (chatgpt, claude, gemini, etc.)
- **Blog:** 200 ✅
- **Playbook:** 307 (redirects — expected)
- **Sitemap:** Uses correct BASE_URL ✅
- **robots.txt:** Correct ✅
- **Issues:** None

### ⚠️ EV Charging Asia (ev-charging-asia.vercel.app — 1,207 URLs)
- **Status:** Mostly healthy
- **Homepage:** 200 ✅
- **Station pages (sampled):** 200 ✅ (id=1, 5, 100 all work)
- **Route pages:** 200 ✅
- **Sitemap:** Uses correct BASE_URL ✅
- **robots.txt:** Correct ✅
- **Notes:** 1,125 station pages rendering dynamically as expected
- **Issues:** Minor — old short-slug `/itinerary/` URLs also in sitemap alongside full `/routes/` URLs (could cause duplicate content in SEO)

### 🔴 Family Travel Asia (familytravelasia.com → www.familytravelasia.com — 1,010 URLs)
- **Status:** Critical issues
- **Homepage:** 200 ✅ (307 from non-www → www works)
- **Static pages:** about ✅ | contact ✅ | privacy ✅ | blog ✅ | search ✅ | review ✅ | health ✅
- **/destination/[id]:** ALL **404** ❌ — destination routes in sitemap but no matching pages
- **/city/[slug]:** ALL **404** ❌ — 21+ city URLs in sitemap with no `/app/city/` route
- **Sitemap:** ✅ Fixed — removed dead /city/ and /category/ URLs
- **Issues fixed:**
  - ✅ Removed `/city/` and `/category/` entries from sitemap.ts
  - ⚠️ `/destination/` pages still 404 — requires new route or data matching fix

### 🔴 Luxury Family Travel (luxury-family-travel-asia.vercel.app — 805 URLs)
- **Status:** Critical issues — FIXED IN SOURCE
- **Homepage:** 200 ✅
- **Destination pages (sampled):** Most 200 ✅, one 404 (seoul-kids-1 — may be missing data)
- **Custom domain (luxuryfamilytravelasia.com):** **DNS DOES NOT RESOLVE** ❌
- **Sitemap:** Was generating 242 dead `/city/` and `/category/` URLs pointing to unresolvable custom domain
- **robots.txt:** Was pointing sitemap to unresolvable custom domain
- **Issues fixed in source (awaiting deploy):**
  - ✅ Changed all BASE_URL → `https://luxury-family-travel-asia.vercel.app`
  - ✅ Removed dead /city/ and /category/ from sitemap
  - ✅ Updated canonical, robots, schema.org URLs
  - ✅ Fixed 6 files total (sitemap.ts, robots.ts, layout.tsx, blog/page.tsx, blog/[slug]/page.tsx, destination/[slug]/page.tsx, page-content.tsx)
  - ⚠️ 1 dest 404 (seoul-kids-1) — data issue, not routing
  - ⚠️ Custom domain DNS still needs setup

### 🔴 Senior Friendly Travel (senior-friendly-travel-asia.vercel.app — 41 URLs)
- **Status:** Critical issues
- **Homepage:** 200 ✅
- **Blog:** 200 ✅ | Blog posts: 200 ✅
- **/about:** **404** ❌ — route not implemented
- **/contact:** **404** ❌
- **/privacy:** **404** ❌
- **/health:** **404** ❌
- **/destinations:** (not verified)
- **Deployed robots.txt** points to `seniorfriendlytravel.asia` (DNS doesn't resolve) ❌
- **Source sitemap/robots** already uses correct Vercel URL ✅ → needs redeploy
- **Issues:** 4 static pages missing routes, stale deployment with wrong domain URL
- **Note:** Source code was already fixed (uses vercel.app URLs) but never redeployed

### ✅ Social Beast (social-beast-two.vercel.app)
- **Status:** Healthy
- **Homepage:** 200 ✅
- **Issues:** None (internal tool, limited surface)

### ✅ Nudge (nudge-sigma-liart.vercel.app)
- **Status:** Healthy
- **Homepage:** 200 ✅
- **Privacy:** 200 ✅
- **Issues:** Needs schema.org markup (previously noted)

## Total Dead URLs Eliminated (in source)
- **Luxury:** 242 dead `/city/` and `/category/` URLs removed from sitemap
- **Family Travel:** ~31 dead `/city/` and `/category/` URLs removed from sitemap
- **Total:** ~273 dead URLs no longer being submitted to search engines

## Remaining Unfixed Issues (need Chris)
1. **Deploy needed:** Luxury and Family Travel source fixes need to be deployed (git push → Vercel)
2. **Senior site redeploy:** Source is already correct, needs production deployment
3. **Senior pages:** Need about, contact, privacy, health routes created (currently 404)
4. **Family Travel destination pages:** All 404 — need route or data fix
5. **Custom domains:** luxuryfamilytravelasia.com and seniorfriendlytravel.asia DNS not configured
6. **Luxury 404:** /destination/seoul-kids-1 returns 404 (missing data)
7. **Duplicate content:** EV Charging has both `/routes/` and `/itinerary/` short-slug URLs
