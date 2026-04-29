# PRD: Directory Beast 10/10 Upgrade — Phase 3 (Final Push)

## Project
**Directory Beast** (family-travel-directory.vercel.app)
**Master Template** for all future directories

## Status of Locked Requirements

| Requirement | Status | What's Missing |
|---|---|---|
| Full user accounts + auth | ✅ BUILT (Ph1) | SQL schema NOT applied to Supabase (needs dashboard access) |
| Complete parent review system | ✅ BUILT (Ph1) | SQL schema NOT applied; works with mock data |
| Advanced search + multi-filters | ✅ UPGRADED (Ph2/10x) | Glassmorphism cards, EV filter, score badges all live |
| Apple-level UI polish | 🟡 PARTIAL | Hero upgraded, cards upgraded. Remaining: destination detail page, mobile nav, overall spacing |
| SEO blog workflow | ✅ BUILT | 3 blogs live. Researcher→Writer→SEO→Editor process documented. Next: more content |
| EV Charging Asia | ✅ BUILT + DEPLOYED | 30+ stations, check-in system, blog posts. Next: expand with OpenChargeMap API |
| AdSense integration | ✅ BUILT | 2 slots on destination pages (in-content + bottom) |

## What to Build Now (Phase 3)

### 1. Expand EV Charging Asia with Real Data
- Integrate OpenChargeMap API: `https://api.openchargemap.io/v3/poi`
- Query params: `maxresults=100`, `countrycode=JP|SG|TH|MY|CN`
- Create a script at `/workspace/ev-charging-asia/scripts/fetch-stations.js`
- Run the script to populate `data/stations.json` with real station data
- Each station should include: name, address, lat/lng, connector types, speeds, pricing (where available)

### 2. Destination Page Polish (Apple-level)
- /destination/[slug]/ — add glassmorphism sections throughout
- Better spacing: generous padding, section dividers
- Mobile: bottom navigation bar with quick actions
- Consistent card styles matching the new DestinationCard design

### 3. Mobile Experience
- Sticky bottom nav on mobile (Home, Search, Blog, Account)
- Filter drawer slides up (already done for search)
- Touch-friendly: larger tap targets on all buttons and links

### 4. Blog Content Pipeline
- Add 2 more SEO articles about family travel destinations
- Ensure Researcher → Writer → SEO Agent → Chief Editor flow per governance

### 5. EV Charging Filter on Directory Beast (already done)
- Already live: EV Nearby toggle in FilterBar
- Tagged cities: Tokyo, Singapore, Bangkok, Shanghai, Shenzhen

## Key Architecture
- `@supabase/supabase-js` for browser (NO @supabase/ssr)
- Lazy `createBrowserSupabaseClient()` from `/lib/supabase-browser.ts`
- Server routes: dynamic import inside async functions
- `strict: false` in tsconfig
- Tailwind for all styling
- Max 200-300 lines per component

## Delivery
- All changes live on family-travel-directory.vercel.app
- EV data expanded on ev-charging-asia.vercel.app
- Total build must pass clean
