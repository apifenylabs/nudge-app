# Station [id] Routing Fix

## What Changed

**File**: `app/station/[id]/page.tsx`

### Before
- `export const dynamic = 'force-dynamic'` — All 1,125 station pages were **dynamically rendered** on every request. No SSG at all. Slow initial loads, no SEO pre-rendering.
- No `generateStaticParams` — pages were never pre-built.

### After
1. **Removed** `export const dynamic = 'force-dynamic'`
2. **Added** `export async function generateStaticParams()` — returns all 1,125 station IDs from `stations.json`, telling Next.js to pre-render every station page at build time.
3. **Kept** `export const dynamicParams = true` — any station ID not in the build data (e.g., newly added stations) will render on-demand without a 404.
4. **Added** `export const revalidate = 3600` — ISR (Incremental Static Regeneration) every hour so pages refresh with updated data without a full rebuild.

### Build Result
- **1,253 total static pages generated** (up from 0 for station routes)
- All 1,125 station pages now pre-rendered as SSG (`●` in build output)
- Blog, itineraries, routes pages all unaffected
- No memory/timeout issues during build

### Trade-off
- Build time increases slightly (generating 1,125 pages vs 0)
- First page load is now instant (static HTML served from CDN/edge) instead of server-rendered per request
- ISR ensures pages stay reasonably fresh without manual rebuilds
