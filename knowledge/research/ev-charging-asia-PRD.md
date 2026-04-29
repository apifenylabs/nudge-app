# PRD: EV Charging Asia — Map-First Directory for EV Drivers

## Project Information
```yaml
project: "EV Charging Asia"
version: "5.0 (Asia Expansion - Live)"
date: "2026-04-29"
based_on_brd: "N/A — greenfield directory product"
status: "Active Development"

## CEO Directives (2026-04-29) — COMPLETED ✅

1. ✅ **Expanded to 6 countries**: Thailand (180), India (275), Indonesia (180), Malaysia (153), Singapore (133), Japan (204) = 1,125 total stations.
2. ✅ **Map is Asia-only** — maxBounds set to [-11, 95] to [46, 146], viscosity 1.0, center [20, 110] zoom 4.
3. ✅ **Legend added** — MapLegend component with charger type letters (C/H/T/G/N) and power level dots.
4. ✅ **EV driver filters** — Connector types (multi-select OR), power level (radio), live status, reliability (4+ toggle), amenities, member benefits (free parking, membership discount, 24/7).
5. ✅ **1,125 synthetic stations** generated with real operator names and city coordinates. OpenChargeMap API fetch script ready in scripts/.
6. ✅ **Android overlap fixed** — featured bottom sheet has min-h-[44px] tap targets, safe area padding, below-map positioning.
7. ✅ **Pipeline executed**: PRD updated → Code built → Build passes clean (1,142 SSG pages).
parent_template: "Directory Beast (master template)"
```

---

## 1. Product Overview

### 1.1 Elevator Pitch
A map-first directory of EV charging stations across Asia. Think PlugShare for Asia — interactive map, real-time filters, real OpenChargeMap data. Built for the EV driver who needs to answer one question: "Where can I charge right now?"

### 1.2 Business Case
| Metric | Value |
|---|---|
| Market priority score | 9.3/10 (#2 in directory prioritization) |
| Competition | PlugShare (global, weak in Asia), Google Maps (generic, no EV filters) |
| Key catalyst | Thailand +2,000 new stations in 2026; India EV sales growing 50% YoY |
| Monetization path | Premium listings for station owners → affiliate → data feeds |

### 1.3 Target Audience
- **Primary:** EV drivers in Thailand and India looking for charging stations
- **Secondary:** EV road trippers planning routes between cities
- **Tertiary (optional):** Families who want stations near kid-friendly amenities (secondary toggle only)

### 1.4 Design Philosophy
**Map-first, not card-first.** The homepage is an interactive map, like PlugShare. Directory Beast (family travel) stays card/inspiration focused. Do NOT mix the two styles. This is a utility, not a discovery engine.

---

## 2. Focus Markets (MVP — Expanded)

```yaml
focus_markets_mvp:
  - market: "Thailand" (180 stations)
    cities: ["Bangkok", "Phuket", "Pattaya", "Chiang Mai", "Chiang Rai", "Hat Yai", "Khon Kaen", "Krabi", "Koh Samui", "Rayong", "Surat Thani"]
    rationale: "Fastest-growing EV market in SEA; 2,000+ new stations in 2026"
  - market: "India" (275 stations)
    cities: ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Pune", "Ahmedabad", "Kolkata", "Jaipur", "Lucknow", "Chandigarh", "Kochi"]
    rationale: "50% YoY EV sales growth; massive population"
  - market: "Indonesia" (180 stations)
    cities: ["Jakarta", "Surabaya", "Bandung", "Denpasar", "Medan", "Makassar", "Yogyakarta", "Semarang", "Batam", "Mataram"]
    rationale: "Largest SEA population; growing EV adoption"
  - market: "Malaysia" (153 stations)
    cities: ["Kuala Lumpur", "Johor Bahru", "Penang", "Ipoh", "Kota Kinabalu", "Kuching", "Melaka", "Kuantan", "Malacca City"]
    rationale: "Strong EV incentives; good highway infrastructure"
  - market: "Singapore" (133 stations)
    cities: ["Central", "Orchard", "Marina Bay", "Changi", "Jurong", "Woodlands", "Tampines", "Punggol", "Sentosa"]
    rationale: "High-density city-state; aggressive EV adoption"
  - market: "Japan" (204 stations)
    cities: ["Tokyo", "Osaka", "Kyoto", "Yokohama", "Nagoya", "Fukuoka", "Sapporo", "Kobe", "Naha", "Hiroshima"]
    rationale: "Major EV market; CHAdeMO origin country"
```
```

---

## 3. User Personas

```yaml
user_personas:
  - name: "Bangkok EV Commuter Aek"
    description: "Bangkok-based professional, drives a BYD Atto 3. Charges 2-3x/week at public stations near home and office."
    goals:
      - "Find available CCS2 chargers within 5km of current location"
      - "Check which stations near Siam Paragon or CentralWorld are working right now"
      - "Filter by power level — wants 150kW+ only for top-ups"
    pain_points:
      - "Opens multiple apps to find available chargers (EA Anywhere, PEA Volta, etc.)"
      - "Drives to stations that show as available but are actually broken"
      - "Can't easily filter by connector type for his car"
    scenarios:
      - "Needs a 20-minute top-up during lunch near Sathorn. Wants to see all available 150kW+ CCS2 stations within 5km, sorted by distance."

  - name: "India Road Tripper Priya"
    description: "Delhi-based entrepreneur, drives a Tata Nexon EV. Regularly drives Delhi to Jaipur, Agra, Chandigarh."
    goals:
      - "Plan charging stops on the Delhi-Jaipur highway"
      - "Know which stations are reliable vs. frequently broken"
      - "Find stations with nearby restaurants for meal breaks"
    pain_points:
      - "Charging infrastructure is sparse between cities"
      - "Current apps don't have good data for India routes"
      - "Status information is often outdated"
    scenarios:
      - "Planning a weekend trip from Delhi to Jaipur (280km). Needs one reliable charging stop in the middle with a restaurant nearby."

  - name: "Phuket Tourist/Tesla Driver"
    description: "Foreign tourist renting a Tesla in Phuket. Needs to find Superchargers and top-up stations."
    goals:
      - "Find Tesla Superchargers and compatible CCS2 stations near beaches"
      - "Plan a Phuket island circuit with charging stops"
      - "Know which stations have restaurants or convenience stores nearby"
    pain_points:
      - "Limited knowledge of local charging locations"
      - "Rental car has limited range, needs frequent charging"
      - "Different connector types in Thailand vs home country"
```

---

## 4. MVP Features (Locked Scope)

```yaml
mvp_features:
  map_first_homepage:
    priority: "P0"
    description: "Interactive Leaflet/Mapbox map as the primary view. Search bar overlays the map. Station pins with charger type icons + power level badges."
  
  filters:
    priority: "P0"
    types:
      - "Connector type: CCS2, CHAdeMO, Type 2 AC, GB/T, Tesla NACS" 
      - "Power level: Any, <50kW, 50-150kW, 150kW+"
      - "Status: All, Working Only (toggles visibility)"
      - "Amenities: Restroom, Food, 24/7, Covered Parking (toggle, hidden behind expand)"
    logic: "OR for connectors, AND for amenities"

  openchargemap_data:
    priority: "P0"
    description: "Pull real stations from OpenChargeMap API for Thailand + India cities. 50+ stations per market. Fallback to synthetic data if API is slow/limited."

  ev_driver_filters:
    priority: "P0"
    description: "Realistic EV driver filters replacing family-friendly toggle.
      - Connector Types: CCS2, CHAdeMO, Type 2, GB/T, NACS (multi-select OR)
      - Power Level: Any, <50kW, 50-150kW, 150kW+
      - Live Status: All, Working Only
      - Reliability Score: 4+ Only toggle
      - Member Benefits: Free Parking, Membership Discount, 24/7 Access"

  station_detail:
    priority: "P0"
    sections:
      - "Header: name, address, overall score"
      - "Charger types with port counts and max speeds"
      - "Status: last reported working/broken (user reports)"
      - "Amenities: restroom, food, covered parking, 24/7, mall"
      - "Map pin showing location"
      - "Share button"

NOT_included_MVP:
  - "User accounts / auth"
  - "User photos gallery"
  - "Route planner"
  - "Station owner claiming"
  - "Reviews system"
  - "Complex partnerships"
```

---

## 5. Technical Architecture

```yaml
framework: "Next.js 14 (matching Directory Beast template)"
styling: "Tailwind CSS"
maps: "React-Leaflet (free, no API key)"
data_source: "OpenChargeMap API (free tier, no API key for basic queries)"
hosting: "Vercel (Hobby tier, free)"
supabase: "Reuse existing project (llnflvnjinavbtqadgyu.supabase.co) — only if needed for check-ins"

data_model_station:
  - id: string
  - name: string
  - address: string
  - city: string
  - country: string
  - latitude: number
  - longitude: number
  - chargerTypes: string[]
  - chargerCount: number
  - chargerSpeed: number (max kW)
  - reliability: number (1-5)
  - locationConvenience: number (1-5)
  - isOperational: boolean
  - hasRestroomNearby: boolean
  - hasFoodNearby: boolean
  - hasCoveredParking: boolean
  - has24by7Access: boolean
  - isMallParking: boolean
  - paymentMethods: string[]
  - operator: string
  - description: string

scoring_algorithm:
  speedScore: "min(chargerSpeed / 250, 1) * 0.3"
  reliabilityScore: "(reliability / 5) * 0.3"
  locationScore: "(locationConvenience / 5) * 0.2"
  amenityScore: "computeAmenityScore(station) * 0.2"
  total: "round((speedScore + reliabilityScore + locationScore + amenityScore) * 100)"
```

---

## 6. Pages & Routes

```yaml
routes:
  /:
    type: "static (SSG)"
    layout: "Map-first homepage. Interactive Leaflet map as primary view. Search bar overlay top. Station pins on map. Featured stations sidebar/sheet."
  /search:
    type: "static (SSG)"
    layout: "Full-page filterable map view. Filters on left (or bottom sheet on mobile). Results as list + map pins."
  /station/[id]:
    type: "SSG (getStaticProps)"
    layout: "Station detail with all info, map pin, status, amenities."
  /about:
    type: "static"
    layout: "About page — maker story, mission, why Asia."
  /blog:
    type: "static"
    layout: "Blog listing page."
  /blog/[slug]:
    type: "dynamic"
    layout: "SEO blog articles."
  /contact:
    type: "static"
    layout: "Contact form (existing)."
  /privacy:
    type: "static"
    layout: "Privacy policy (existing)."
```

---

## 7. User Stories & Acceptance Criteria

```yaml
user_stories:

  - as_a: "EV driver"
    i_want: "To see an interactive map of charging stations when I land on the homepage"
    so_that: "I can immediately find stations near me"
    priority: "P0"
    acceptance_criteria:
      - "Map fills at least 70% of viewport on desktop, 60% on mobile"
      - "Station pins shown with charger-type icons and power level"
      - "Clicking a pin shows a popup with station name, address, power level, status"
      - "Search bar overlays the map, not above it"
      - "Map loads within 3 seconds"

  - as_a: "EV driver"
    i_want: "To filter stations by connector type and power level"
    so_that: "I only see stations compatible with my car"
    priority: "P0"
    acceptance_criteria:
      - "Filter bar with: Connector Type (CCS2/CHAdeMO/Type2/GB/T/NACS), Power Level (Any/<50/50-150/150+), Status (All/Working Only)"
      - "OR logic for connectors — selecting CCS2 + CHAdeMO shows stations with either"
      - "Map pins update in real-time as filters change"
      - "Count badge showing filtered results"

  - as_a: "EV driver"
    i_want: "To see station detail with charger types, speeds, and status"
    so_that: "I can decide if a station is worth visiting"
    priority: "P0"
    acceptance_criteria:
      - "Detail page shows: name, address, connector types with port counts, max kW per type"
      - "Reliability score (0-100) with color tier"
      - "Amenity icons: restroom, food, covered parking, 24/7, mall"
      - "Status: 'Last reported: Working' or 'Recent reports: 2 broken in 24h'"
      - "Mini map showing station location"
      - "Share button"

  - as_a: "EV driver in India"
    i_want: "To see real charging stations from OpenChargeMap"
    so_that: "I can trust the data is accurate"
    priority: "P0"
    acceptance_criteria:
      - "At least 50 real stations from OpenChargeMap API for Thailand cities"
      - "At least 50 real stations from OpenChargeMap API for India cities"
      - "Fallback to synthetic data with warning banner if API fails"
      - "Each station has real name, address, connector types from source data"

  - as_a: "EV driver"
    i_want: "To filter by realistic criteria: connector type, power level, live status, reliability"
    so_that: "I can quickly find stations that match my specific needs"
    priority: "P0"
    acceptance_criteria:
      - "Connector types (CCS2/CHAdeMO/Type2/GB/T/NACS) multi-select with OR logic"
      - "Power level radio: Any, <50kW, 50-150kW, 150kW+"
      - "Live status: All or Working Only toggle"
      - "Reliability: 4+ only toggle"
      - "Member Benefits: Free Parking, Membership Discount, 24/7 Access toggles"
      - "Hidden behind 'More filters' expand section"

# Unhappy path tests
  - as_a: "EV driver"
    i_want: "To see what happens when no stations match my filters"
    so_that: "I know the filters are working"
    priority: "P0"
    acceptance_criteria:
      - "Empty state: 'No stations match your filters. Try adjusting your search.'"
      - "Map shows empty with friendly message overlay"
      - "Clear filters button appears"

  - as_a: "EV driver"
    i_want: "To see what happens when I visit a station that doesn't exist"
    so_that: "I know there's no data issue"
    priority: "P0"
    acceptance_criteria:
      - "404 page: 'Station not found. It may have been removed or the link is incorrect.'"
      - "Auto-redirect to search page after 5 seconds"
      - "'Browse all stations' link"
```

---

## 8. UI/UX Guidelines

```yaml
design:
  style: "Clean, map-first utility. NOT card/inspiration focused like Directory Beast."
  colors:
    primary: "Blue-600 (electric blue)"
    secondary: "Emerald-500 (green energy)"
    accent: "Amber-500 (warning/waiting)"
    map_bg: "Gray-100 (light map background)"
  map:
    default_zoom: 12
    default_center: "[13.7367, 100.5231]" # Bangkok
    pin_design: "Custom circle icons with charger-type letter: C=CCS2, H=CHAdeMO, T=Type2, G=GB/T, N=NACS"
    cluster: "Group nearby pins at low zoom, expand on zoom-in"

mobile:
  layout: "Map fills viewport. Search bar + filters as floating top bar. Station detail slides up as bottom sheet."
  filters: "Expandable bottom drawer with glassmorphism"
```

---

## 9. Marketing & SEO

```yaml
keywords:
  primary:
    - "EV charging stations Thailand"
    - "EV charging stations India"
    - "Bangkok EV charging"
    - "Delhi EV charging"
    - "Electric vehicle charging Asia"
  secondary:
    - "CCS2 charger Thailand"
    - "Tesla Supercharger Bangkok"
    - "EV charging Phuket"
    - "Tata Nexu charging Delhi"

blog:
  existing_posts:
    - "EV Charging in Asia 2026 — Complete Guide"
    - "Thailand EV Charging Guide"
    - "CCS2 vs CHAdeMO"
  mvp_additions:
    - "India EV Charging Guide 2026 — Complete City-by-City Breakdown"
```

---

## 10. MVP Build Plan

```yaml
order: "Execute sequentially, not parallel"

step_1_map_first:
  files:
    - "app/page.tsx" (rewrite — map-first layout)
    - "components/MapView.tsx" (new — interactive Leaflet map with pins)
    - "components/SearchOverlay.tsx" (new — search bar overlay on map)
  description: "Rewrite homepage to be map-first instead of card-first. Map fills viewport. Search bar overlays. Station pins with charger-type icons."

step_2_filters:
  files:
    - "components/FilterPanel.tsx" (new — collapsible filter panel)
    - Update MapView to react to filter changes
  description: "Connector type + power level + status filters. Real-time map pin updates. Empty state when no matches."

step_3_data_expansion:
  files:
    - "scripts/fetch-stations.js" (update — add India cities, remove non-Thailand/India)
    - "data/stations.json" (regenerate)
    - "lib/getData.ts" (update — throttle API calls, cache results)
  description: "Pull real OpenChargeMap data for Thailand + India. 50+ per market. Fallback to synthetic."

step_4_polish:
  files:
    - "app/station/[id]/_client.tsx" (polish — ensure detail page matches new design)
    - "app/about/page.tsx" (update — EV driver focus)
  description: "Polish station detail, about page, empty states. Verify all unhappy paths."

step_5_deploy:
  description: "Build, deploy to Vercel, verify all routes. Add env vars if needed."

NOT_in_this_MVP:
  - "User accounts/check-in system"
  - "Station owner claiming"
  - "Route planner"
  - "Complex UGC"
```

---

## 11. Test Strategy

```yaml
happy_path_tests:
  - "Homepage loads map in <3s with station pins visible"
  - "Clicking a pin shows popup with station info"
  - "Filter by CCS2 — only CCS2 stations visible"
  - "Filter by 150kW+ — only fast stations visible"
  - "Station detail page loads all fields correctly"
  - "Share button opens native share dialog"

unhappy_path_tests:
  - "No stations match filters → empty state message + clear filters button"
  - "Visit /station/nonexistent → 404 page with redirect to search"
  - "API fetch fails → fallback to synthetic data with warning banner"
  - "JavaScript disabled → basic fallback page"
  - "Network offline during station detail → error state with retry button"
  - "Station has no amenities → amenity section hidden / shows 'none listed'"
```

---

## 12. Blockers

```yaml
blockers:
  - item: "Supabase SQL schemas"
    status: "BLOCKED — needs Chris at desk to run in Supabase dashboard"
    priority: "Low for MVP (not needed for map-first v1)"
  - item: "OpenChargeMap API rate limits"
    status: "Monitor during fetch. Free tier allows ~100 queries/day. Cache aggressively."
    priority: "Medium"
```

---

## 13. Delivery

```yaml
updated_prd_location: "workspace/knowledge/research/ev-charging-asia-PRD.md (this file)"
build_directory: "workspace/ev-charging-asia/"
template_used: "Directory Beast (master template)"
live_url: "https://ev-charging-asia.vercel.app"
estimated_cost: "< $0.20 (DeepSeek-chat only)"
```
