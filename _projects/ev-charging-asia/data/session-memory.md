# Session: May 28, 2026 03:45 HKT — Revenue Enhancement & MRR Growth Session

## What We Did
1. **Free Route Checklist Lead Magnet** (`components/itineraries/FreeRouteChecklistCTA.tsx`)
   - Added to every route detail page (`/routes/[slug]/page.tsx`)
   - Converts visitors by offering a free "10-Point EV Road Trip Checklist" in exchange for email
   - "Get Free Guide" button → email form → auto-download + subscribe API
   - Generates a formatted 10-point checklist text file covering range planning, charging stops, offline maps, EV accessories, family essentials, cross-border requirements, emergencies, and more
   - Graceful: non-intrusive compact banner, expands to form on click, success state

2. **Trip Cost Calculator** (`components/itineraries/TripCostCalculator.tsx`)
   - Added to every route detail page above the star rating section
   - 20+ EV models to choose from (Tesla, BYD, MG, Hyundai, Kia, Nissan, VinFast, XPeng, NIO, etc.)
   - Custom car mode with adjustable consumption & battery size
   - Country-specific electricity rates for public/home charging (12 countries)
   - Toll cost estimates per country
   - Shows: energy needed (kWh), charging sessions, public/home/mixed charging costs, toll estimate, total estimated cost
   - Cost-per-km and charging time estimates
   - Fuel comparison note (2.5x more for petrol)
   - Collapsible UI to avoid clutter

3. **Route Popularity Leaderboard** (`components/itineraries/RoutePopularityLeaderboard.tsx`)
   - Added to `/routes` listing page, between the route grid and the quiz
   - Fetches vote data from `/api/vote/leaderboard` endpoint
   - Toggle between "Top Rated" and "Most Votes" sort
   - Top 6 entries with medal icons for 1-3, rank numbers for 4-6
   - Route name, duration, difficulty, countries shown

4. **Leaderboard API** (`app/api/vote/leaderboard/route.ts`)
   - GET endpoint that merges vote store with itinerary data (names, difficulty, duration, countries)
   - Returns enriched entries array for the leaderboard component

## Files Created
- `components/itineraries/FreeRouteChecklistCTA.tsx` — Lead magnet with email capture + auto-download
- `components/itineraries/TripCostCalculator.tsx` — Interactive trip cost estimator with 20+ EV models
- `components/itineraries/RoutePopularityLeaderboard.tsx` — Social proof leaderboard for /routes page
- `app/api/vote/leaderboard/route.ts` — API endpoint merging vote data with itinerary metadata

## Files Modified
- `app/routes/[slug]/page.tsx` — Added FreeRouteChecklistCTA + TripCostCalculator imports and sections
- `app/routes/page.tsx` — Added RoutePopularityLeaderboard import and section

## Build
✅ `npm run build` — Compiled successfully (165 pages)
✅ Vercel deploy — Successful
✅ Smoke tests: /routes (200), /routes/[slug] (200), /api/vote/leaderboard (200), /compare (200)

## MRR Impact Analysis
| Feature | Impact | Notes |
|---------|--------|-------|
| Free Checklist Lead Magnet | 🟢 High | Email capture = retargeting + nurture → premium guide sales. Every route page gets it. |
| Trip Cost Calculator | 🟡 Medium | Increases time-on-page + trust → higher affiliate conversion. Practical utility drives repeat visits. |
| Route Popularity Leaderboard | 🟡 Medium | Social proof drives urgency. "Most popular" badge = FOMO for premium guide purchases. |

## Next Recommendations
- [ ] Connect email capture to real CRM (Mailchimp, ConvertKit) instead of in-memory store
- [ ] Add CTAs to free checklist download success page (cross-sell route guide PDFs)
- [ ] A/B test free checklist placement (above fold vs. mid-page)
- [ ] Implement Stripe affiliate program tracking
- [ ] Add "Compare" upsell: when comparing 2 routes, suggest the premium guide for both
