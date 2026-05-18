# Destination & Property Slug Routing — Audit & Fix

## Files Audited
- `app/destination/[slug]/page.tsx` — Main destination page
- `app/properties/[slug]/page.tsx` — Legacy property redirect page
- `lib/data.ts` — Data loader (`getDestinationBySlug`, `allDestinations`)
- `data/destinations.json` — 527 destination entries

## Findings

### ✅ Already Working
- `generateStaticParams` in the destination page **already returns all 527 slugs** from `allDestinations`.
- `getDestinationBySlug` resolves both **actual slugs** and **legacy IDs** via `slugAliases` + fallback id lookup.
- `dynamicParams = true` enables ISR fallback for future destinations.
- `notFound()` handles unknown slugs.
- **All 527 destination pages + 554 property redirects generate at build time** with zero 404s.
- The build completed successfully.

### 🔧 Fixes Applied

1. **Fixed canonical URL in `generateMetadata`** (lines for `alternates.canonical` and `openGraph.url`):
   - Was using the raw `slug` parameter (could be an alias/id).
   - Now uses the data's canonical `d.slug || d.id` so the canonical URL always points to the real slug.

2. **Fixed stale comment** ("520 destinations" → "all destinations").

### ✅ Verified: Properties Redirect Page
- `app/properties/[slug]/page.tsx` generates both slug-based and id-based routes (554 total).
- Uses `redirect('/destination/${params.slug}')` — fine for Next.js 14.
- No changes needed.

### ✅ No Blog Content Affected
- `data/blog/` directory untouched.
- `/blog/[slug]` generates 34 paths — unchanged.

## Build Output (after fixes)
```
● /destination/[slug]   527 paths  (all destinations)
● /properties/[slug]    554 paths  (527 slugs + 27 legacy id redirects)
○ /blog/[slug]           34 paths  (unchanged)
```

## Summary
The routing was already correct — all 527 destinations generate successfully. The fix corrected canonical URL handling for aliased slugs and updated a stale comment. No breaking changes.
