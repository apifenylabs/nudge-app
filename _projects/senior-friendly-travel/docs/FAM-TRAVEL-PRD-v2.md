# Family Travel Asia — PRD v2

> **Status**: Active ✅ | **Previous version**: MVP_PLAN.md | **Date**: 2026-05-31
> **Directive**: Luxury Family Travel archived (2026-05-30). All travel energy → Family Travel Asia. No second directory.

---

## 1. Why This Exists

Luxury Family Travel was a near-identical audience with a premium paint job. Two bleeding cash cows = waste. 

**One directory. One brand. One monetization path.**

Family Travel Asia owns the "Asia family travel" search space. Luxury's good bits (content, UI patterns, premium edge) get absorbed into this single site. No second property.

EV Charging Asia stays separate — different audience, different search intent. It can cross-link into travel content (road trips, family EV routes) but lives independently.

---

## 2. Current State

| Metric | Value |
|--------|-------|
| Live URL | `family-travel-directory.vercel.app` |
| Tech | Next.js, app router, static JSON data |
| Destinations | 26 city JSON files |
| Blog posts | 5 blog-posts.json + 156 individual posts in data/blog/ |
| Components | 38+ UI components |
| Monetization | Affiliate links (Klook, Viator, GYG) — configured but no revenue yet |
| SEO | Basic meta tags, clean URLs, SchemaOrg |

### What Fam Already Has That Luxury Didn't
- `/best-for/[babies|multigen|teens]` — age-group filtering
- `ComparisonTable.tsx` — side-by-side activity/property compare
- `MapContainer.tsx` + `SimpleMapContainer.tsx` — location pins
- Auth system (Supabase) — bookmarks, reviews, saved lists
- `FilterSidebar.tsx` — search refine
- `DarkModeToggle.tsx`

### What Luxury Had That Fam Should Absorb
- **Content**: 54 unique blog posts covering premium angles (villas, butler service, Michelin dining, ski resorts, cruises, first-class travel, private jets, Aman resorts)
- **Components worth pulling**: `BookingCTA.tsx`, `StickyBookBar.tsx`, `TrendingNow.tsx`, `FeaturedReviews.tsx`, `EditorBadge.tsx`, `PremiumCard.tsx`, `MustBookThisMonth.tsx`
- **Data patterns**: `blog-index.json` structure, proper content categories

---

## 3. Strategic Scope (Phased)

### Phase A: Absorb Luxury Content (NOW)
Move luxury's 54 blog posts into fam's data structure. Rewrite titles/descriptions where needed to match fam's tone (less "exclusive luxury", more "best of Asia for families"). Batch republish to grow blog count from ~160 → ~210 posts.

**Assets to pull:**
- All 54 blog post JSON files from `luxury/data/blog/`
- Blog index entries (already in luxury's `blog-index.json`)
- Any destination data luxury had that fam doesn't (check: luxury has 5 destination files, fam has 26 — likely all covered)
- Premium-focused components: `BookingCTA`, `StickyBookBar`, `TrendingNow`, `FeaturedReviews`, `MustBookThisMonth`

### Phase B: Monetization Pipeline (NEXT)
Affiliates are configured. Revenue isn't flowing because:

1. **Traffic generation** — no active SEO/content push after initial build
2. **Conversion UX** — need proper "Book Now" CTAs that actually go to partner links with tracking
3. **No funnel** — users land, browse, leave. No email capture, no retargeting

**Fix order:**
1. Verify affiliate links actually go to live Klook/Viator/GYG pages with tracking
2. Add `BookingCTA` from luxury codebase (already built, just port it)
3. Add `StickyBookBar` for mobile users browsing activities
4. Create "Trip Planner" flow → capture email → retarget via email
5. Cross-link blog → activity listing → affiliate CTA

### Phase C: Feature Gaps
What fam still needs that luxury had partially or that competitors do:

- **Comparison pages** (`/compare` route exists in luxury, not in fam — route built but empty)
- **Property listings** (luxury had `/properties/[slug]` — hotel/accommodation listings)
- **Content categories / topic hubs** (luxury had `/top10`, topic clustering via tags)
- **User account features** (both have auth, but saved/bookmarks are basic)

### Phase D: Revenue Engine
When traffic exists, add:
- Google Adsense (component exists, not activated)
- Premium listing for businesses → paid placement
- Trip planning consultation → high-ticket affiliate upsell

---

## 4. Content Strategy

### Blog Expansion Pipeline
Absorb luxury's 54 posts, then:
- Content gaps: Vietnam (Da Nang, Hanoi), Philippines (Cebu, Palawan), Cambodia (Siem Reap), Indonesia (beyond Bali)
- Seasonal content: "Best time to visit X with kids", school holiday guides
- Age-specific: babies vs teens vs multigen deep dives
- Niche: Family-friendly EV road trips (cross-link with EV Charging Asia)

### SEO Priority
- Luxury's old domain had 62 blog posts indexed. Those slugs can be 301-redirected or recreated on fam.
- Luxury's destination pages (527) had overlapping content with fam's 26 — no point migrating them, just let the domain die.
- Focus fam's SEO energy on **long-tail family travel queries** that luxury already had rankings for.

---

## 5. UI/UX Alignment

Luxury had a premium aesthetic (dark mode, card shadows, premium badges). Fam's UI is cleaner, more Klook-like. 

**Keep fam's UI as the base** — it's the right one for a family audience. Pull in only these luxury components because they convert/engage:
- `BookingCTA.tsx` — prominent book-now button
- `StickyBookBar.tsx` — mobile sticky CTA bar
- `TrendingNow.tsx` — social proof / popularity signals
- `EditorBadge.tsx` — builds trust for reviews
- `MustBookThisMonth.tsx` — urgency / seasonal picks

Do NOT bring luxury's dark theme, premium-only layouts, or "exclusive" messaging.

---

## 6. What's NOT Happening

- No second travel directory (luxury is archived, don't touch)
- No EV charging map on fam travel (EV is separate)
- No Supabase real-time features until traffic justifies cost
- No social-beast integration for now (keep focus)

---

## 7. Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Blog posts | ~160 | 250+ (incl luxury migration) |
| Destinations | 26 | 35 |
| Monthly visitors | ~0 (unmonitored) | 1,000 organic |
| Affiliate revenue | $0 | $200/mo |
| Email subscribers | 0 | 100 |

---

## 8. Quick Wins (This Week)

1. Port luxury's 54 blog posts into fam data structure ✓
2. Add `BookingCTA` + `StickyBookBar` components ✓
3. Wire affiliate tracking properly ✓
4. Build `/compare` listing pages (route exists, no content)
5. Deploy and verify all links work
