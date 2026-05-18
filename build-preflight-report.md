# Build Preflight Report

**Date:** 2026-04-23
**Project:** Family Travel Directory

---

## 1. Data Loading (page.tsx)

- **Dynamically loads ALL destinations?** ✅ YES
  - `fetch('/data/destinations.json')` loads the entire JSON array
  - No hardcoded `.slice(0, 10)` or pagination limit
  - Storage is via `useState<Destination[]>` which is unbounded
- **Current data:** 10 destinations in `public/data/destinations.json`
- **Scales to 20+ destinations?** ✅ YES — the filtering, sorting, and rendering all operate on the full array. Adding 10 more items will work without changes.

---

## 2. BusinessListingCard Component

**Location:** `components/BusinessListingCard.tsx`

### Fields displayed:
| Field | Displayed? | Notes |
|---|---|---|
| Name | ✅ Yes | `<h3>{business.name}</h3>` |
| Description | ✅ Yes | `<p>{business.description}</p>` |
| Rating (safetyRating) | ✅ Yes | Big badge with `/5.0` |
| Age groups (ageRange) | ✅ Yes | Badge: "👶 Ages {ageRange}" |
| Price level (priceRange) | ✅ Yes | Visual dots + text |
| Tips (tipsAndTricks) | ❌ **NOT displayed** | Field not expected by this component's interface |
| Parent stories (parentStory) | ❌ **NOT displayed** | Field not expected by this component's interface |
| City | ✅ Yes | Dynamic from `business.city` — not hardcoded |
| Category | ✅ Yes | Dynamic from `business.category` |

### Is city name dynamically rendered from data?
✅ **YES.** `{business.city}` is rendered from the prop data. No hardcoded city names in the card.

### Issues found:

1. **⚠️ BusinessListingCard isn't used anywhere in page.tsx**
   - `page.tsx` renders its own inline card with a completely different design (flat list, expandable details)
   - `BusinessListingCard.tsx` is an abandoned/unused premium card component
   - Not a blocking issue, but dead code to be aware of

2. **⚠️ Tips & Tricks are NOT shown in BusinessListingCard**
   - The card interface has no `tipsAndTricks` or `parentStory` fields
   - The card interface is `Business`, not `Destination` — different types
   - If this card were used, tips & parent stories would be missing

3. **⚠️ `ageRange` in page.tsx filtering has a parsing bug for expansion**
   - Filter logic: `parseInt(d.ageRange) <= 3` — this assumes `ageRange` is just a number string like `"2"` or `"5"`
   - If the JSON stores `ageRange` as `"2-5"` (range format), `parseInt("2-5")` returns `2`, which would work for the `0-3` filter but fail for `4-6` (wouldn't catch items with range `2-5`)
   - **Will break with 20+ destinations** if any have ranges that span multiple age brackets

---

## 3. Sitemap (`app/sitemap.ts`)

- ✅ Exists and generates sitemap entries for static pages, cities, and categories
- ⚠️ **Cities hardcoded** — 7 cities listed inline: Tokyo, Osaka, Singapore, Bangkok, Nara, Hong Kong, Bali
- ⚠️ **Not dynamic** — doesn't read from destinations.json to auto-discover cities
- ⚠️ **City pages don't exist** — sitemap references `/city/{slug}` but no route handler exists
- ⚠️ **Category pages don't exist** — sitemap references `/category/{slug}` but no route handler exists
- ❌ **No individual destination pages** — sitemap doesn't include `/destination/{id}` URLs
- **Will break with 20+ destinations** if no route handlers are created for these sitemap entries

---

## 4. Robots (`app/robots.ts`)

- ✅ Exists and properly configured
- ✅ Points to correct sitemap URL
- ✅ Disallows `/api/` and `/_next/`
- No issues found.

---

## 5. Critical Issues That Will Break with 20+ Destinations

| # | Severity | Issue |
|---|----------|-------|
| 1 | 🔴 HIGH | **No individual destination pages.** Sitemap generates city/category URLs but there are no routes for them (`app/city/[slug]/page.tsx`, `app/category/[slug]/page.tsx` are missing — these would all 404). |
| 2 | 🔴 HIGH | **Sitemap cities are hardcoded.** Adding a new city like "Seoul" to destinations.json won't update the sitemap. Should read from data dynamically. |
| 3 | 🟡 MEDIUM | **ageRange filtering logic fragile.** `parseInt()` on range strings like `"2-5"` produces false positives. As data grows with more diverse age ranges, this filter will behave unexpectedly. |
| 4 | 🟡 MEDIUM | **BusinessListingCard is dead code.** If someone later tries to "switch to the card component," tips & parent stories would be lost since the card doesn't display them. |
| 5 | 🟢 LOW | **Hardcoded "120+" parent tips stat.** Stats section says "120+ Parent Tips" regardless of data. As data grows, this becomes inaccurate. Should calculate dynamically from `destinations`. |

---

## Recommendations Before Scaling

1. **Fix sitemap** — Read destinations.json in `sitemap.ts` to dynamically generate city URLs and add per-destination URLs
2. **Create route handlers** — Add `app/city/[slug]/page.tsx` and `app/destinations/[id]/page.tsx` (or use the existing single-page approach with anchor links)
3. **Fix ageRange filter** — Use proper range-based filtering or switch to numeric min/max values (e.g., `ageMin: 2, ageMax: 5`)
4. **Add tips/parent stories to BusinessListingCard** or remove the dead component
5. **Make stats dynamic** — Replace hardcoded "120+" with computed aggregations

**Verdict:** The core single-page app (page.tsx) will functionally load and render 20+ destinations without breaking. The main issues are in SEO infrastructure (sitemap/routes) and data accuracy (stats, filters). Safe to expand data, but fix the sitemap and routes before going to production with more destinations.
