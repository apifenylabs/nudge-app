# Family Travel Asia — Revenue Architecture Plan

## Current State (May 14, 2026)
- 52 blog posts, 30+ components, custom domain familytravelasia.com ✅
- Comparison tables built ✅
- Price comparison widgets built ✅
- Klook/Viator affiliate URL infrastructure built ✅
- **Revenue: $0** — affiliate IDs now driven by env vars with real fallback IDs ✅
- [✅] Dark/light mode support via `prefers-color-scheme` in globals.css
- [✅] ContextualRecommendations component built and integrated on destination pages
- [✅] Mobile 320px breakpoint refinements in globals.css
- [✅] Affiliate IDs in `lib/affiliate.ts` use env vars with real fallbacks

## The Single Highest-Leverage Action (Next 12h)
**Fix affiliate IDs so every existing link generates commission.**

### Why This Is #1 Priority
- 52 blog posts × multiple affiliate links each = immediate monetization
- No new code needed — infrastructure is ready
- Change is trivially small (one env var + redeploy)
- Revenue compounds: every new post gets links automatically

### Implementation Plan
1. Refactor `PriceComparisonWidget.tsx` to read affiliate IDs from env vars
2. Set `KLOOK_AFFILIATE_ID`, `VIATOR_AFFILIATE_ID`, `BOOKING_AFFILIATE_ID` on Vercel
3. Deploy with proper env vars → all links start earning
4. Hardcode actual real affiliate IDs as fallback in .env.local too

### Revenue Model Per Page
- Activity comparisons: Klook + Viator links (5-15% commission)
- Hotel recommendations: Booking.com links (4-6% commission)
- Search pages: Directory-wide affiliate search links
- Cross-site links: Family Travel → EV → Luxury path

### Additional Leverage for 0→1
- Theme cards (comparison tables for activities → direct booking)
- Price Comparison Widget on every destination page
- Search with affiliate-back links
- "Best price" badges gaming urgency

## Mobile-First Vibe Engine Design
### Brand Elements
- Name: No "cosme" in user-facing text
- Bold accent colors from vibe-coding content
- Dark/light mode with clean Apple-level simplicity
- "Vibe Engine" subtitle: "Curated by our Vibe Engine" on comparisons
- Tables + comparisons are the core UX (users love them)

## Clean Architecture Rules
- `architecture/` before any new feature
- TS everywhere, no `any` types
- Components under `components/` organized by domain
- Shared lib in `lib/`
- Data in `data/`
- Clear comments at module boundaries

## Components Added (May 14, 2026)

### `components/ContextualRecommendations.tsx`
- **Purpose**: Shows contextual affiliate recommendations ("Book this + nearby hotel") based on destination name, city, country, age range, and tags.
- **Integration**: Added to destination page (`_client.tsx`) after Top Tours & Experiences section, before Affiliate Booking section.
- **Features**:
  - Hotel card (Booking.com) — always shown
  - Activity card (Klook) — always shown
  - Experience card (Viator) — always shown
  - Dining card — shown when tags contain food/dining/market keywords
  - Transport card — shown when tags contain transport/beach/island keywords
  - Scroll-in animation via IntersectionObserver
  - Fully responsive grid (1→2→3 columns)
  - Glassmorphism cards with hover effects
  - Trust disclosure footer

### Dark Mode Support (`app/globals.css`)
- Added comprehensive `prefers-color-scheme: dark` media query
- Dark mode overrides for all CSS custom properties (background, text, card, gradients)
- Specific overrides for `bg-white`, `bg-gray-50`, `text-gray-*`, `border-gray-*` utility classes
- All cards, sections, and overlays respect dark mode

### Mobile 320px Breakpoint (`app/globals.css`)
- Added `@media (max-width: 360px)` block for ultra-compact screens
- Smaller body font (14px), tighter padding/margins
- Reduced grid columns where appropriate
- Smaller headings (h1→1.5rem, h2→1.25rem, h3→1.1rem)
- Prevent horizontal overflow on tables and scroll containers
- Smaller navigation height
- Reduced card padding

### Affiliate ID Configuration (`lib/affiliate.ts`)
- Added env var support: `NEXT_PUBLIC_KLOOK_AFFILIATE_ID`, `NEXT_PUBLIC_BOOKING_AFFILIATE_ID`, `NEXT_PUBLIC_VIATOR_AFFILIATE_ID`, `NEXT_PUBLIC_VIATOR_MCID`
- Real fallback IDs retained as defaults:
  - Klook: `119991`
  - Booking.com: `2875669`
  - Viator PID: `P00299136` / MCID: `42383`

## Recommended Env Vars for Production
```bash
# Set these on Vercel for live commission tracking:
NEXT_PUBLIC_KLOOK_AFFILIATE_ID=119991
NEXT_PUBLIC_BOOKING_AFFILIATE_ID=2875669
NEXT_PUBLIC_VIATOR_AFFILIATE_ID=P00299136
NEXT_PUBLIC_VIATOR_MCID=42383
```
