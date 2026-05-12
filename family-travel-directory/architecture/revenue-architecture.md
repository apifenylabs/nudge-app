# Family Travel Asia — Revenue Architecture Plan

## Current State (May 13, 2026)
- 52 blog posts, 30+ components, custom domain familytravelasia.com ✅
- Comparison tables built ✅
- Price comparison widgets built ✅
- Klook/Viator affiliate URL infrastructure built ✅
- **Revenue: $0** because affiliate IDs are hardcoded as `PLACEHOLDER_AFFILIATE_ID`

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
