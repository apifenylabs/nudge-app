# Architecture Overview

## Project Structure

```
luxury-family-travel/
├── app/                          # Next.js 14 App Router pages
│   ├── destination/[slug]/       # Destination detail page (20 live pages)
│   │   ├── page.tsx              # Server component — static params, data loading
│   │   └── _client.tsx           # Client component — full detail page UI
│   ├── page.tsx                  # Home server component
│   ├── page-content.tsx          # Home client component
│   ├── search/                   # Search/browse page
│   ├── blog/                     # Blog pages
│   └── ...
├── components/                   # React components
│   ├── BookingCTA.tsx            # Hotel booking CTA with partner links (Booking, Agoda, Expedia, Klook, Viator)
│   ├── PriceComparisonWidget.tsx  # 🆕 Expandable price comparison (Booking/Klook/Viator/Agoda/Expedia)
│   ├── StickyBookBar.tsx          # 🆕 Mobile sticky bottom booking bar
│   ├── ContextualRecommendations.tsx  # 🆕 "Complete Your Trip" cross-sell widgets
│   ├── AffiliateButton.tsx       # Affiliate button component
│   ├── AffiliateLink.tsx         # Generic affiliate link wrapper
│   ├── DestinationCard.tsx       # Card used in carousels/grid
│   ├── BookmarkButton.tsx        # Save/bookmark button
│   ├── ReviewList.tsx            # Reviews display
│   ├── ReviewForm.tsx            # Review submission
│   ├── Header.tsx                # Site header
│   ├── BottomNav.tsx             # Mobile bottom navigation bar
│   ├── SiteFooter.tsx            # Desktop footer
│   ├── AdUnit.tsx                # Ad placement component
│   └── ...
├── lib/                          # Utilities
│   ├── affiliate.ts              # Affiliate config & URL builders
│   ├── supabase-browser.ts       # Supabase client
│   └── ...
├── public/data/                  # JSON data files
│   ├── destinations.json         # 20 live destinations (main data source)
│   ├── batch-*.json              # 30+ batch files (~590 total entries, not yet merged into app)
│   └── image-map.json            # Photo credits & gallery mapping
└── ...
```

## Affiliate Strategy

### Affiliate IDs (configured in `lib/affiliate.ts`)
- **Klook**: `119991`
- **Booking.com**: `aid=2875669`
- **Viator**: `PID=P00299136`, `MCID=42383`

### Revenue Components (new, in order of impact)

| Component | Location | Description | Revenue Potential |
|-----------|----------|-------------|-------------------|
| **PriceComparisonWidget** | Every destination page, before BookingCTA | Expandable panel with 5 booking options side-by-side (Booking, Klook, Viator, Agoda, Expedia). Best-deal badges based on category type. | Highest — visible by default, expandable, multiple partners |
| **StickyBookBar** | Every destination page, mobile only | Fixed bottom bar appears on scroll (700px). 3 buttons: Book Hotel / Klook / Viator. Dismissible. | High — persistent mobile CTA |
| **BookingCTA** (enhanced) | Every destination page | Smart fallback generates search URLs for all 20 destinations (previously only 15 hardcoded). Now shows Booking/Agoda/Expedia + pill links to Klook/Viator. | High — covers all 20 destinations |
| **ContextualRecommendations** | Every destination page, after BookingCTA | "Complete Your Trip" section with 3 category-aware recommendations (e.g., parks show Express Pass + Family Meal + Nearby Hotel). | Medium — cross-sell |
| **AffiliateButton fallback** | Every destination page | Dynamic fallback for destinations without `affiliateLinks` in data — generates Booking/Klook/Viator links from name+city. | Medium — ensures 100% coverage |

### Data Flow
1. Data loaded from `public/data/destinations.json` via fetch in `_client.tsx`
2. Affiliate links are generated client-side using `destination.name` + `destination.city` + affiliate IDs
3. For destinations with `affiliateLinks` in data, those are used preferentially
4. All 20 current destinations use the smart fallback path

## Mobile-First Design

### Breakpoints (Tailwind defaults)
- `sm`: 640px — tablet
- `md`: 768px — small desktop
- `lg`: 1024px — desktop

### Mobile Enhancements (applied in this update)
- Hero section: `h-[45vh]` on mobile, `min-h-[300px]`
- Text sizing: `text-2xl` → `text-xl` or `text-lg` on mobile
- Padding: `p-6` → `p-4` (GlassCard), `px-4` → `px-3` (main)
- Gap spacing: `gap-6` → `gap-4` on mobile grids
- Touch targets: `min-h-[44px]` on all buttons/links
- Safe area: `env(safe-area-inset-bottom)` padding on mobile
- StickyBookBar: persistent bottom bar on mobile with `env(safe-area-inset-bottom)`

## Build
```bash
npm run generate-blog-data    # Python script → lib/generated-blog-data.ts
npm run build                 # Next.js build
```
