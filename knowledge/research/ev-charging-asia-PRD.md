# PRD: EV Charging Stations Asia — Family-Friendly Directory

## Project Information
```yaml
project: "EV Charging Stations Asia (Family-Friendly Directory)"
version: "1.0"
date: "2026-04-28"
based_on_brd: "N/A — greenfield directory product"
status: "Approved for Phase 1"
```

---

## 1. Product Overview

### 1.1 Elevator Pitch
A searchable directory of EV charging stations across Asia, uniquely filtered by family-friendly nearby amenities — playgrounds, restaurants, restrooms, hotels, malls. Built for the EV-driving parent who needs to know: "Can I charge here AND keep my kids happy for 30 minutes?"

### 1.2 Business Case
| Metric | Value |
|---|---|
| Market priority score | 9.3/10 (#2 in directory prioritization) |
| Year-1 organic traffic (est.) | 50k–100k visits/month |
| Year-1 revenue (est.) | $2k–$8k/month |
| Competition level | Very low in this niche |
| Key market catalysts | Thailand +2,000 new stations in 2026; Indonesia +1,500; fuel crisis accelerating EV adoption across SEA |

### 1.3 Target Audience
- **Primary:** Families with children who drive EVs in Asia (expat and local)
- **Secondary:** EV road trippers planning multi-stop routes
- **Tertiary:** Hotels, malls, and businesses wanting to promote their charging facilities to families

---

## 2. Focus Markets (Phase 1)

```yaml
focus_markets_phase_1:
  - market: "Thailand"
    priority: 1
    rationale: "Largest growth market for new EV stations in 2026; strong tourism infrastructure; 2,000+ new stations expected"
    est_stations: "3,000+"
  - market: "Indonesia"
    priority: 2
    rationale: "Rapid EV expansion; 1,500+ new stations in 2026; growing middle-class family car market"
    est_stations: "2,000+"
  - market: "Japan"
    priority: 3
    rationale: "Mature market with dense station coverage; high EV adoption; strong CHAdeMO infrastructure"
    est_stations: "8,000+"
  - market: "Malaysia"
    priority: 4
    rationale: "Growing market with good mix of urban/highway stations; government EV incentives"
    est_stations: "1,500+"
  - market: "Singapore"
    priority: 5
    rationale: "Small but extremely dense; high EV adoption rate; excellent data availability"
    est_stations: "800+"
```

---

## 3. User Personas

```yaml
user_personas:
  - name: "Family Road-Tripper Fang"
    description: "Thai mother of two (ages 4 and 8), drives a BYD Atto 3. Plans weekend trips from Bangkok to Hua Hin, Pattaya, and Khao Yai."
    goals:
      - "Find charging stations with playgrounds or kid-friendly cafes nearby"
      - "Plan routes where charging stops align with meal/bathroom breaks"
      - "Know which stations have clean bathrooms and stroller access"
    pain_points:
      - "Current EV apps don't filter by kid-friendliness"
      - "Ends up at chargers in hot parking lots with nothing for kids to do"
      - "Can't easily find stations that support her specific connector type"
    scenarios:
      - "Planning a 3-hour drive from Bangkok to Hua Hin: needs one charging stop in the middle that has a food court and a play area"
  - name: "Expat EV Commuter Ryan"
    description: "American expat in Singapore, drives a Tesla Model 3. Uses public charging at malls and condos."
    goals:
      - "Find Tesla Superchargers near family-friendly destinations"
      - "Compare charging costs across stations"
      - "Discover stations with nearby amenities he can use while charging"
    pain_points:
      - "Overpaying for charging at tourist-heavy locations"
      - "Doesn't know which stations are reliable vs. frequently broken"
      - "No way to filter by connector type (NACS vs CCS) for his car"
    scenarios:
      - "Sunday outing with family: wants to find a Supercharger at a mall with a kids' play area and good food options"
  - name: "Hotel/Mall Operator Mei Ling"
    description: "Marketing manager for a family hotel chain in Malaysia with 6 EV chargers across properties."
    goals:
      - "Get her hotel's charging stations listed and promoted"
      - "Attract EV-driving families to book stays"
      - "Highlight family amenities (pool, playground, kid's club)"
    pain_points:
      - "No dedicated channel to reach EV-driving families"
      - "Current directories are generic and don't highlight family features"
      - "Can't easily update pricing or availability"
    scenarios:
      - "Listing her Penang hotel on the directory with a sponsored priority listing to attract families"
  - name: "EV Curious Parent Sara"
    description: "Jakarta-based mother considering her first EV. Wants to understand charging infrastructure before buying."
    goals:
      - "See how many charging stations exist on common routes"
      - "Check which stations have family-friendly nearby amenities"
      - "Compare connector types and understand which EV works best for her needs"
    pain_points:
      - "Overwhelmed by technical charging info without lifestyle context"
      - "Can't visualize if the infrastructure supports her family's lifestyle"
      - "Wants to see real photos and reviews from other families"
    scenarios:
      - "Researching whether an EV is practical for her daily school-run + weekend trips routine"
```

---

## 4. User Stories & Acceptance Criteria

```yaml
user_stories:

  # ── P0: Must have for Phase 1 launch ──

  - as_a: "Visiting parent"
    i_want: "To browse EV charging stations near a city or along a route"
    so_that: "I can plan my charging stops before a trip"
    priority: "P0"
    acceptance_criteria:
      - "Homepage shows a search bar accepting city name, region, or route start/end"
      - "Results populate within 2 seconds of search submission"
      - "Default sort is by overall score (Convenience + Family combined)"
      - "Results display station name, address, connector types, and scores"
      - "Map view shows stations as pins with score badges"
      - "Empty state: 'No stations found in this area. Check back soon or suggest a station.'"
      - "Error state: 'Unable to load stations. Please try again.' with retry button"

  - as_a: "Visiting parent"
    i_want: "To filter stations by family-friendly amenities within 1km"
    so_that: "I only see stations where my kids have something to do during charging"
    priority: "P0"
    acceptance_criteria:
      - "Filter bar includes toggleable amenity chips: Playground, Kid-friendly restaurant, Family hotel, Shopping mall, Park/beach, Rest stop"
      - "Multiple amenity filters combine with AND logic (all selected amenities must be within 1km)"
      - "Results update in real-time as filters change (no page reload)"
      - "Each station card shows icons for which nearby amenities are present"
      - "A 'No nearby amenities' chip appears when station lacks any family-friendly nearby places"

  - as_a: "Visiting parent"
    i_want: "To see detailed information about a specific charging station"
    so_that: "I can decide if it's worth stopping at"
    priority: "P0"
    acceptance_criteria:
      - "Station detail page loads within 2 seconds"
      - "Page displays: name, full address, open hours, pricing, connector types + count, charging speed (kW)"
      - "Convenience Score and Family Score displayed prominently with breakdown bars"
      - "Nearby amenities section shows distance to each amenity (e.g., 'Playground - 400m') with a mini map"
      - "User-submitted photos gallery section (placeholder in Phase 1)"
      - "'While you charge' section suggests things to do at each nearby amenity"
      - "Affiliate links section for relevant charging accessories"
      - "Share button with Telegram/WhatsApp native share"
      - "404 state for deleted/unlisted stations — redirect to search with toast: 'Station no longer available'"
      - "Loading skeleton for station detail while data fetches"

  - as_a: "Visiting parent"
    i_want: "To filter stations by connector type"
    so_that: "I only see stations compatible with my car"
    priority: "P0"
    acceptance_criteria:
      - "Filter options: Tesla Supercharger (NACS), CCS2, CHAdeMO, Type 2 AC, GB/T (China standard)"
      - "Default is 'All' — no filter applied"
      - "Multiple connector types can be selected; station must support at least one selected type"
      - "Each station card shows connector icons for all supported types"
      - "Count of available ports per connector type shown in detail view"

  - as_a: "Station owner / Hotel operator"
    i_want: "To claim my station listing and add family-friendly information"
    so_that: "Families can discover my station and amenities"
    priority: "P0"
    acceptance_criteria:
      - "Claim form accessible from any station detail page (button: 'Claim this listing')"
      - "Form collects: owner name, email, phone, relationship to station"
      - "Form collects: bathroom availability, stroller access, kid-safe waiting area, nearby amenities list"
      - "Claim triggers admin notification (email) for manual verification"
      - "Claimed stations show 'Verified owner' badge"
      - "Claimed stations get priority in search results (verified > unverified, all else equal)"

  # ── P1: Important but could ship after initial launch ──

  - as_a: "Visiting parent"
    i_want: "To filter stations by pricing model (free, paid, membership)"
    so_that: "I can choose stations that fit my budget and subscription"
    priority: "P1"
    acceptance_criteria:
      - "Filter options: Free, Pay-per-use, Membership required, Unknown"
      - "Multiple selections allowed (OR logic)"
      - "Pricing shown on cards: 'Free', '$0.25/kWh', 'Member only', or '—' for unknown"

  - as_a: "Visiting parent"
    i_want: "To filter by minimum charging speed"
    so_that: "I only see stations that can charge my car within a reasonable time"
    priority: "P1"
    acceptance_criteria:
      - "Slider or preset options: ≥50kW, ≥100kW, ≥150kW, ≥250kW"
      - "Selected minimum speed shown as label on filter bar"
      - "Station cards show max charging speed prominently"

  - as_a: "Visiting parent"
    i_want: "To submit a new station or correct existing station info"
    so_that: "The directory stays accurate and helpful for everyone"
    priority: "P1"
    acceptance_criteria:
      - "'Suggest a station' form accessible from nav and empty search results"
      - "Form fields: station name, address (required), connector types, notes about amenities"
      - "Form fields: family amenity checkboxes, optional photo upload"
      - "Submission saved to pending queue; admin notification sent"
      - "Confirmation message: 'Thanks! We'll review and add it within 48 hours.'"
      - "Duplicate detection: warn if submitted address matches existing station"

  - as_a: "Visiting parent"
    i_want: "To filter stations by safety rating of the surrounding area"
    so_that: "I feel comfortable stopping with my family, especially at night"
    priority: "P1"
    acceptance_criteria:
      - "Safety rating shown on station detail page (scale: Very Safe / Safe / Moderate / Caution)"
      - "Safety rating derived from Directory Beast destination data or third-party crime data"
      - "Filter options: 'Very Safe only', 'Safe or better', 'All'"
      - "Safety rating displayed as an icon + label on station cards"

  # ── P2: Future / stretch goals ──

  - as_a: "Visiting parent"
    i_want: "To filter stations suitable for specific age groups"
    so_that: "I find age-appropriate activities for my children during charging"
    priority: "P2"
    acceptance_criteria:
      - "Age filter options: Toddlers (playgrounds, soft play), Young kids (playgrounds, food courts), Teens (WiFi, food courts, malls)"
      - "Filter applies fine-tuned amenity preferences per age bracket"
      - "Age filter visible below amenity chips when toggled on"

  - as_a: "EV manufacturer"
    i_want: "To sponsor a directory placement"
    so_that: "EV-driving families see our brand as the family-friendly choice"
    priority: "P2"
    acceptance_criteria:
      - "Sponsored slot available at top of search results (marked 'Sponsored')"
      - "Sponsorship includes featured station highlight on homepage"
      - "Admin panel for managing sponsored placements and billing"
```

---

## 5. Features

```yaml
features:

  - name: "Station Directory Search & Browse"
    description: "Core search interface allowing users to find EV charging stations by location, city, region, or along a route. Returns paginated results with map view."
    priority: "P0"
    requirements:
      - "Search bar with autocomplete (cities, regions, landmark names)"
      - "Result cards: station name, address, connector icons, pricing badge, Overall Score badge"
      - "Map integration (MapLibre GL JS — free tier, no API key needed for self-hosted tiles or use free OSM tile layers)"
      - "Toggle between list view and map view"
      - "Pagination: 20 results per page, infinite scroll on mobile"
    success_metrics:
      - metric: "Search completion rate"
        target: ">80% of searches yield at least one result"
        timeframe: "Launch + 30 days"
      - metric: "Search-to-detail-page conversion"
        target: ">40% of search users click into a station detail"
        timeframe: "Launch + 30 days"

  - name: "Family-Friendly Filter System"
    description: "Multi-faceted filter bar enabling parents to narrow stations by nearby amenities, safety, connector type, charging speed, and pricing."
    priority: "P0"
    requirements:
      - "Horizontal scrollable chip bar on desktop and mobile"
      - "Amenity chips: Playground 🎡, Kid-friendly restaurant 🍽️, Family hotel 🏨, Shopping mall 🛍️, Park/beach 🌳, Rest stop 🚏, Bathrooms 🚻"
      - "Safety filter dropdown: All, Safe+, Very Safe"
      - "Connector type selector (multi-select pills)"
      - "Pricing filter (multi-select pills)"
      - "Charging speed slider"
      - "Active filter count badge on mobile filter toggle button"
      - "Clear all filters button"
      - "URL query parameter sync (shareable filtered search URLs)"
      - "Filter state persists across page navigation within session"
    success_metrics:
      - metric: "Filter usage rate"
        target: ">30% of sessions use at least one filter"
        timeframe: "Launch + 30 days"
      - metric: "Amenity filter usage"
        target: ">50% of filter users toggle at least one amenity"
        timeframe: "Launch + 60 days"

  - name: "Station Detail Page"
    description: "Comprehensive station information page with scores, amenities, photos, and 'While you charge' suggestions."
    priority: "P0"
    requirements:
      - "Hero section: station name, address, open hours, pricing"
      - "Score cards: Convenience Score and Family Score with breakdown bars and explanations"
      - "Connector section: per-connector type, count, max kW, pricing if applicable"
      - "Nearby amenities section: list of places within 1km, distances, amenity type icons"
      - "Mini map showing station location + nearby amenity pins (powered by OpenStreetMap)"
      - "'While you charge' section — auto-generated suggestions based on nearby amenities"
      - "Photo gallery section (placeholder UI in Phase 1 — static images or empty state)"
      - "Claim this listing call-to-action"
      - "Affiliate product recommendations section"
      - "Share button (native navigator.share or fallback copy-link)"
      - "Report incorrect info button"
      - "Schema.org/JSON-LD structured data for SEO (Place, LocalBusiness)"
      - "Loading skeleton state while fetching"
      - "404 state with feedback link"
    success_metrics:
      - metric: "Detail page engagement depth"
        target: "Average scroll depth >60% of page"
        timeframe: "Launch + 30 days"
      - metric: "Station claim initiation rate"
        target: ">2% of detail page visitors initiate claim"
        timeframe: "Launch + 90 days"

  - name: "Station Scoring Algorithm"
    description: "Dual-score system ranking stations by convenience and family-friendliness, combined into an overall score."
    priority: "P0"
    requirements:
      - "**Convenience Score (0–100):** Charging speed (kW) × 30% + Connector type availability × 20% + Pricing reasonableness × 20% + Nearby amenities quantity × 30%"
      - "**Family Score (0–100):** Safety rating × 40% + Kid-friendly nearby amenities × 35% + On-site amenities (bathrooms, shelter) × 25%"
      - "**Overall Score:** Convenience × 0.5 + Family Score × 0.5"
      - "Scores calculated server-side and cached with station data"
      - "Score breakdown visible on detail page with percentage bars"
      - "Score icon color: Green (≥80), Yellow (50–79), Red (<50)"
    success_metrics:
      - metric: "Score correlation with user engagement"
        target: "Higher-scoring stations receive >2× more detail page views than lower-scoring"
        timeframe: "Launch + 60 days"

  - name: "Listing Claim & Verification"
    description: "Self-service tool for station owners to claim their listing, verify ownership, and add/update station details."
    priority: "P0"
    requirements:
      - "Claim form on every station detail page"
      - "Verification workflow: submit claim → admin review → approve/reject → email notification"
      - "Once verified: owner can edit station name, address, hours, pricing, connector details, photos, and family amenities"
      - "Verified badge shown on station cards and detail page"
      - "Edit history tracked for moderation"
      - "Spam protection: rate limit (max 1 claim per email per 24h)"
    success_metrics:
      - metric: "Claim-to-verification conversion"
        target: ">60% of claims verified within 72 hours"
        timeframe: "Launch + 90 days"
      - metric: "Claimed vs unclaimed station engagement"
        target: "Claimed stations get >30% more detail views"
        timeframe: "Launch + 90 days"

  - name: "User Submissions (Suggest/Correct)"
    description: "Crowdsourced new station suggestions and corrections to keep data fresh and accurate."
    priority: "P1"
    requirements:
      - "'Suggest a new station' form accessible from nav and empty search results"
      - "'Report incorrect info' button on every detail page"
      - "Submission fields: name, address (required), connector types, open hours, pricing, family amenity checkboxes, photo"
      - "Duplicate detection: fuzzy match on address against existing stations"
      - "Submissions go to pending admin queue with status tracking"
      - "User gets confirmation + optional email when submission is processed"
    success_metrics:
      - metric: "New station submissions per week"
        target: ">50 submissions/week by month 3"
        timeframe: "Launch + 90 days"
      - metric: "Submission acceptance rate"
        target: ">70% of submissions accepted (quality gate)"
        timeframe: "Launch + 90 days"

  - name: "Affiliate Product Recommendations"
    description: "Smart affiliate product placements based on station context — charging cables, adapters, travel accessories, kids entertainment."
    priority: "P1"
    requirements:
      - "Affiliate widget on station detail page (bottom section)"
      - "Contextual products: 'Traveling with kids?' → kids travel games; 'CCS station?' → CCS cables"
      - "Product cards: image, title, price, affiliate badge, affiliate link button"
      - "Affiliate links use configurable tracking IDs (Amazone, Shopee, Lazada per market)"
      - "Performance tracking (clicks tracked, conversions via affiliate network)"
      - "No affiliate link cloaking — disclose as 'Ad' or 'Sponsored'"
    success_metrics:
      - metric: "Affiliate click-through rate"
        target: ">2% of detail page visitors click an affiliate link"
        timeframe: "Launch + 60 days"
      - metric: "Affiliate revenue per 1,000 visits"
        target: "$5+ RPM"
        timeframe: "Launch + 90 days"

  - name: "Age-Specific Family Filters"
    description: "Smart filter adjusting 'kid-friendly' recommendations based on children's age group."
    priority: "P2"
    requirements:
      - "Toggle: 'Kids age:' None / Toddlers (0–4) / Young kids (5–10) / Teens (11+)"
      - "Toddler mode: prefers playgrounds, soft play, family restrooms, stroller access"
      - "Young kid mode: prefers playgrounds, food courts, fast food, rest stops"
      - "Teen mode: prefers WiFi, food courts, shopping malls, game zones"
      - "Filter updates amenity chips to relevant subset for selected age group"
      - "Score algorithm adjusts Family Score weights per age group"
    success_metrics:
      - metric: "Age filter adoption"
        target: ">15% of family-filter users try age-specific filter"
        timeframe: "Launch + 90 days"
```

---

## 6. Data Model

### 6.1 Core Entity: Station

```typescript
interface Station {
  id: string;                    // UUID, primary key
  sourceId: string;              // OpenChargeMap reference ID
  name: string;                  // Station name
  address: string;               // Full address
  city: string;                  // City
  region: string;                // Province/region
  country: string;               // ISO 3166-1 alpha-2
  postalCode: string;
  lat: number;                   // Latitude (decimal)
  lng: number;                   // Longitude (decimal)
  
  // Charging details
  connectors: Connector[];       // Array of available connector types
  maxPowerKw: number;            // Maximum charging speed
  pricing: PricingInfo;          // Pricing model and rates
  operatingHours: string;        // Human-readable hours
  isTeslaSupercharger: boolean;  // Tesla-only or universal
  
  // Amenities
  nearbyAmenities: NearbyAmenity[];  // Places within 1km
  
  // Scores
  convenienceScore: number;      // 0–100
  familyScore: number;           // 0–100
  overallScore: number;          // 0–100
  safetyRating: SafetyRating;    // Safety rating of area
  
  // Metadata
  claimedBy: string | null;      // User ID of verified owner
  isVerified: boolean;           // Ownership verified
  lastUpdated: string;           // ISO 8601
  dataSource: 'openchargemap' | 'crowdsourced' | 'owner';
  photos: string[];              // URLs or placeholder
  createdAt: string;
  updatedAt: string;
}

interface Connector {
  type: 'tesla_nacs' | 'ccs2' | 'chademo' | 'type2_ac' | 'gbt' | 'other';
  count: number;                 // Number of ports
  maxPowerKw: number;            // Max kW for this connector
  pricing?: string;              // Per-connector pricing if different
}

interface PricingInfo {
  model: 'free' | 'pay_per_use' | 'membership' | 'unknown';
  pricePerKwh?: number;          // For pay-per-use
  currency?: string;             // ISO 4217
  membership?: string;           // Membership name if applicable
}

interface NearbyAmenity {
  type: 'playground' | 'kid_restaurant' | 'family_hotel' | 'shopping_mall' | 'park' | 'rest_stop' | 'bathroom';
  name: string;                  // Place name
  distanceMeters: number;        // Distance from station
  lat: number;
  lng: number;
  isVerified: boolean;           // Confirmed by crowdsource or owner
}

enum SafetyRating {
  VerySafe = 4,
  Safe = 3,
  Moderate = 2,
  Caution = 1,
  Unknown = 0
}
```

### 6.2 Supporting Entities

```typescript
interface UserSubmission {
  id: string;
  type: 'suggest_new' | 'report_error' | 'claim_listing';
  stationId: string | null;          // Null for new station suggestions
  submittedBy: string;               // Email or anonymous hash
  data: Record<string, any>;         // Flexible payload
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
  createdAt: string;
  processedAt?: string;
}

interface CrowdsourcedReview {
  id: string;
  stationId: string;
  familyScore: number;               // 1–5 stars
  comment: string;
  hasBathrooms: boolean;
  hasStrollerAccess: boolean;
  hasKidArea: boolean;
  photos: string[];
  createdAt: string;
  helpfulCount: number;
}

interface CountryConfig {
  country: string;
  currency: string;                  // ISO 4217
  affiliateProgram: 'amazon' | 'shopee' | 'lazada' | 'none';
  affiliateTag: string;
  defaultUnit: 'km' | 'miles';
  languageCode: string;              // For locale
  timezone: string;
}
```

### 6.3 Data Flow

```
OpenChargeMap API ──→ Sync Worker ──→ Local Cache (SQLite/file) ──→ Next.js API Routes ──→ UI
                    (hourly cron)          ↓
                                    Enrichment Layer
                                    (Directory Beast data, 
                                     safety data, amenities)
                                           ↓
                                    Server-side scoring
                                           ↓
                                    Stored cached result

Crowdsource ──→ Submit Form ──→ Pending Queue ──→ Admin Review ──→ Approved data merged into cache
```

---

## 7. API Endpoints

```yaml
api_endpoints:

  - endpoint: "GET /api/stations"
    description: "Search and filter stations"
    query_parameters:
      - name: "q"
        type: "string"
        description: "Search query (city, region, landmark)"
        required: false
      - name: "lat"
        type: "number"
        description: "Latitude for location-based search"
        required: false
      - name: "lng"
        type: "number"
        description: "Longitude for location-based search"
        required: false
      - name: "radius"
        type: "number"
        description: "Search radius in km (default 50)"
        required: false
      - name: "amenities"
        type: "string[]"
        description: "Comma-separated amenity types to filter"
        required: false
      - name: "connectors"
        type: "string[]"
        description: "Comma-separated connector types to filter"
        required: false
      - name: "pricing"
        type: "string[]"
        description: "Pricing models to include"
        required: false
      - name: "minPower"
        type: "number"
        description: "Minimum charging speed in kW"
        required: false
      - name: "safety"
        type: "string"
        description: "Minimum safety rating (safe|very_safe)"
        required: false
      - name: "ageGroup"
        type: "string"
        description: "Age-specific filter (toddlers|young_kids|teens)"
        required: false
      - name: "sort"
        type: "string"
        description: "Sort method (overall|convenience|family|distance)"
        default: "overall"
      - name: "page"
        type: "number"
        description: "Page number"
        default: 1
      - name: "limit"
        type: "number"
        description: "Items per page"
        default: 20
    response:
      description: "Paginated list of stations"
      schema_type: "object"
      properties:
        stations: "Station[]"
        total: "number"
        page: "number"
        totalPages: "number"

  - endpoint: "GET /api/stations/:id"
    description: "Get detailed station information"
    response:
      description: "Full station object with nearby amenities and scores"
      schema_type: "Station"
    error_responses:
      - status: 404
        description: "Station not found"

  - endpoint: "GET /api/stations/:id/nearby"
    description: "Get nearby family-friendly amenities for a station"
    response:
      description: "Array of nearby amenities with distances"
      schema_type: "NearbyAmenity[]"

  - endpoint: "POST /api/submissions"
    description: "Submit a new station suggestion, correction, or claim"
    body:
      type: "object"
      required: ["type", "data"]
      properties:
        type: "string (suggest_new|report_error|claim_listing)"
        stationId: "string (optional)"
        data: "object (flexible payload)"
        email: "string (optional)"
    response:
      status: 201
      description: "Submission created"
      body: "{ id: string, status: 'pending', message: string }"

  - endpoint: "GET /api/health"
    description: "Health check endpoint"
    response:
      status: 200
      body: "{ status: 'ok', stationCount: number, lastSync: string }"

  - endpoint: "GET /api/markets"
    description: "Get list of supported markets/countries"
    response:
      description: "Array of country configurations"
      schema_type: "CountryConfig[]"
```

---

## 8. Non-Functional Requirements

```yaml
non_functional_requirements:
  - category: "Performance"
    requirement: "First Contentful Paint <1.5s on mobile 3G; Time to Interactive <3s on mobile 3G; Lighthouse performance score >85"
    notes: "Achieve via Next.js static generation for landing pages, incremental static regeneration for station pages, lazy loading for offscreen content"
  - category: "Performance"
    requirement: "API response time <500ms for search queries (p95); station detail <200ms (p95)"
    notes: "Local cache with hourly refresh; indexed queries on city/region/amenity"
  - category: "Performance"
    requirement: "Map tiles load within 2s on initial view"
    notes: "Use vector tiles from OpenFreeMap or Protomaps; lazy load map JS only when user toggles map view"
  - category: "Security"
    requirement: "HTTPS enforced everywhere; no API keys exposed client-side"
  - category: "Security"
    requirement: "Submit/CORS protection; rate limit submissions to 5/hour per IP"
  - category: "Security"
    requirement: "No user data stored — email optional and only for submission status; no passwords, no PII"
  - category: "Reliability"
    requirement: "99% uptime target (static site + simple API)"
    notes: "Static generation means no database dependency for read paths; deploy on Vercel free tier or Cloudflare Pages"
  - category: "Reliability"
    requirement: "Graceful degradation when OpenChargeMap API is unavailable — serve last cached data"
    notes: "Cache TTL: 1 hour; stale-while-revalidate pattern"
  - category: "Scalability"
    requirement: "Handle 10,000 daily visitors and 50,000 API requests without degradation"
    notes: "Static generation serves most pages; API handles search/filter — can scale horizontally"
  - category: "Scalability"
    requirement: "Support up to 100,000 station records in local cache"
  - category: "Accessibility"
    requirement: "WCAG 2.1 AA compliant (contrast, keyboard navigation, screen reader support, focus indicators)"
  - category: "Compatibility"
    requirement: "Works on Chrome, Safari, Firefox latest 2 versions; mobile browsers (iOS Safari, Android Chrome)"
  - category: "Compatibility"
    requirement: "Works on Telegram in-app browser (WebView compatibility)"
```

---

## 9. Technical Architecture

### 9.1 Stack
| Layer | Technology | Rationale |
|---|---|---|
| Framework | Next.js 14+ (App Router) | Directory Beast standard; SSG/ISR for performance; API routes |
| Language | TypeScript | Type safety, Directory Beast standard |
| Styling | Tailwind CSS | Directory Beast standard; utility-first rapid dev |
| UI Components | shadcn/ui (Radix primitives) | Accessible, composable, Directory Beast standard |
| Map | MapLibre GL JS (free, open-source) | No API key needed; self-hosted tiles via OpenFreeMap |
| Icons | Lucide React | Directory Beast standard; consistent icon set |
| State | React hooks + URL search params | Simple enough for a directory; no global state manager needed |
| Data Cache | Local JSON files + Node fs | Simple cache for MVP; upgrade to SQLite or PostgreSQL later |
| Hosting | Vercel (free tier) or Cloudflare Pages | Free tier sufficient for Phase 1 traffic |
| CI | GitHub Actions | Deploy on merge to main |

### 9.2 Project Structure
```
ev-charging-asia/
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout (Header, Footer, providers)
│   │   ├── page.tsx              # Homepage (search + featured)
│   │   ├── search/
│   │   │   └── page.tsx          # Search results page
│   │   ├── stations/
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Station detail page (ISR)
│   │   └── api/
│   │       ├── stations/
│   │       │   ├── route.ts      # GET /api/stations (search)
│   │       │   └── [id]/
│   │       │       └── route.ts  # GET /api/stations/:id
│   │       ├── submissions/
│   │       │   └── route.ts      # POST /api/submissions
│   │       └── health/
│   │           └── route.ts      # GET /api/health
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── SearchBar.tsx
│   │   ├── FilterBar.tsx
│   │   ├── StationCard.tsx
│   │   ├── StationDetail.tsx
│   │   ├── ScoreBadge.tsx
│   │   ├── AmenityChip.tsx
│   │   ├── MiniMap.tsx
│   │   ├── WhileYouCharge.tsx
│   │   ├── ClaimForm.tsx
│   │   └── SubmitStationForm.tsx
│   ├── lib/
│   │   ├── openchargemap.ts      # OpenChargeMap API client
│   │   ├── scoring.ts            # Score calculation algorithms
│   │   ├── cache.ts              # Local data cache layer
│   │   ├── amenities.ts          # Nearby amenity enrichment
│   │   ├── submissions.ts        # Submission handling (queue, validation, persistence)
│   │   ├── scoring.ts            # Score calculation algorithms
│   │   ├── cache.ts              # Local data cache layer
│   │   ├── amenities.ts          # Nearby amenity enrichment from external data
│   │   ├── submissions.ts        # Submission handling (queue, validation, persistence)
│   │   ├── affiliates.ts         # Affiliate link builder per market
│   │   ├── country-config.ts     # Per-market country configuration
│   │   └── scoring.ts            # ConvenienceScore, FamilyScore, OverallScore
│   ├── data/
│   │   ├── stations/             # Cached station data (per-country JSON files)
│   │   ├── amenities/            # Cached nearby amenity data
│   │   └── config/               # Country configs, scoring weights
│   ├── scripts/
│   │   ├── sync-stations.ts      # OpenChargeMap sync worker (run via cron)
│   │   └── enrich-amenities.ts   # Amenity enrichment from Directory Beast data
│   └── types/
│       └── index.ts              # Shared TypeScript type definitions
├── public/
│   └── images/                   # Static images, icons, logos
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

### 9.3 OpenChargeMap Integration

```yaml
data_sync:
  source: "OpenChargeMap API"
  api_base: "https://api.openchargemap.io/v3"
  rate_limit: "The free tier allows approximately 100 requests/day per API key; 4000+ developers registered"
  sync_strategy:
    - mode: "Initial bulk import"
      description: "Pull all stations for Phase 1 focus markets (country-level queries) in one-off batch"
      batch_size: 100
    - mode: "Hourly incremental refresh"
      description: "Run via GitHub Actions cron or Vercel Cron Jobs to pull updated stations, new stations, and corrections"
      endpoint: "/poi?countrycode={ISO}&maxresults=100&modifiedsince={ISO_8601}"
```

### 9.4 Data Sync Flow

```
┌─────────────────────┐     ┌───────────────────┐     ┌──────────────────────┐
│  OpenChargeMap API  │────→│  Sync Worker       │────→│  Local JSON Cache    │
│  (upstream source)  │     │  (scripts/sync-    │     │  (data/stations/)    │
└─────────────────────┘     │  stations.ts)      │     └──────────┬───────────┘
                            └───────────────────┘                │
                                       │                         ▼
                                       ▼                ┌──────────────────┐
                            ┌───────────────────┐      │  Next.js API     │
                            │  Enrichment Layer  │◄─────│  Routes          │
                            │  (scripts/enrich-  │      │  (api/stations/) │
                            │  amenities.ts)     │      └──────────────────┘
                            └───────────────────┘
                                       │
                                       ▼
                            ┌───────────────────┐
                            │  Download OSM     │
                            │  nearby POI data  │
                            │  -> cached per    │
                            │  station          │
                            └───────────────────┘
```

---

## 10. Design Requirements

```yaml
design_requirements:
  - requirement: "Mobile-first responsive design"
    details: "All layouts designed for vertical smartphone screens first; tablet and desktop breakpoints at 768px and 1024px"
  - requirement: "Apple-level visual polish"
    details: "Generous whitespace, subtle shadows, consistent 8px grid, rounded corners (radius-lg = 12px), smooth transitions (300ms ease)"
  - requirement: "Score visual system"
    details: "Green/yellow/red badge system for scores; circular radial meter for detail page; at-a-glance color coding"
  - requirement: "Family-friendly aesthetic"
    details: "Warm color palette (not sterile tech look), rounded UI elements, friendly illustrations for empty states, emoji amenity icons"
  - requirement: "Shared component library"
    details: "Reuse Header, Footer, SearchBar, Card, FilterBar components from Directory Beast template; extend as needed"
  - requirement: "Dark mode support"
    details: "Auto-detect system preference; manual toggle in header; dark theme for all components"
  - requirement: "Loading/product states"
    details: "Skeleton loading for all data-fetching views; optimistic UI for filter changes; empty states with illustrations and clear CTAs"
```

---

## 11. SEO Requirements

```yaml
seo_requirements:

  - category: "Technical SEO"
    requirements:
      - "Dynamic sitemap.xml generated at build time — include all station detail pages, market/city landing pages"
      - "robots.txt allowing all crawlers, with sitemap URL declared"
      - "Canonical URLs on all pages (no duplicate content issues)"
      - "Server-side rendering (SSR/ISR) so crawlers see full HTML, not empty JavaScript shells"
      - "Page speed score >90 on PageSpeed Insights for mobile"

  - category: "Structured Data (JSON-LD)"
    requirements:
      - "Station detail pages: Schema.org Place + LocalBusiness (if applicable)"
      - "Station detail pages: Schema.org EVChargingStation (custom type or extension)"
      - "Search results: CollectionPage + ItemList for paginated results"
      - "BreadcrumbList on all subpages"
      - "Review aggregate stars for stations with user reviews (Phase 2)"

  - category: "Content & Metadata"
    requirements:
      - "Every page gets unique: title tag, meta description, OG:title, OG:description, OG:image"
      - "Dynamic title format: '{Station name} - EV Charging in {City} | EV Charging Asia'"
      - "Dynamic title format: '{City} EV Charging Stations | Family-Friendly Filters | EV Charging Asia'"
      - "OpenGraph image auto-generated per station (name, score, connector types overlay on template)"
      - "Twitter Cards (summary_large_image)""
      - "Hreflang tags for multi-language pages (Phase 2: Thai, Japanese, Indonesian, Malay, Chinese)"

  - category: "Content Hub / Blog"
    requirements:
      - "Blog subdirectory at /blog/ for SEO content: 'Top 10 Family-Friendly Charging Stops on Bangkok-Hua Hin Route' etc."
      - "Blog posts link to relevant station detail pages and search result pages"
      - "Each blog post targets 2-3 long-tail keywords around family EV travel in Asia"
```

---

## 12. Monetization Details

```yaml
monetization_strategy:

  - stream: "Featured Listings"
    description: "Station owners pay for priority placement in search results and featured spot on homepage"
    pricing_model: "$29/mo (featured) or $9/mo (verified badge only)"
    target_customers: "Hotel chains, mall operators, charging network operators, single station owners"
    implementation:
      - "Featured stations appear at top of search results tagged 'Sponsored'"
      - "Featured stations rotate through homepage hero section"
      - "Stripe/Paddle payment integration for recurring billing (Phase 2 — Phase 1 manually managed)"
    phase: "Phase 2 (manual in Phase 1 — hand-collected)"

  - stream: "Sponsored Directory Placement"
    description: "Auto manufacturers sponsor premium placements promoting their EVs as family-friendly"
    pricing_model: "$500/mo (top search bar placement + dedicated landing page)"
    target_customers: "BYD, MG, Toyota bZ, Nissan, Hyundai, Kia, Tesla (Asia markets)"
    implementation:
      - "Sponsored brand banner at top of search results"
      - "Brand landing page showing all stations compatible with their vehicles"
      - "Brand logo + tagline: 'The family-friendly EV — find charging near you'"
    phase: "Phase 3 (after traffic validates)"

  - stream: "Affiliate Commissions"
    description: "Commission from charging cables, adapters, travel accessories, kids travel gear sold through affiliate links"
    commission_rates: "Amazon Associates 1-10%; Shopee/Lazada 1-5%; specific affiliate programs vary"
    target_products:
      - "CCS2 to Type 2 cables"
      - "NACS to CCS2 adapters"
      - "Portable Level 2 chargers"
      - "Kids travel activity kits"
      - "Car seat organizers and travel accessories"
      - "EV charging station WiFi extenders"
    implementation:
      - "Affiliate links on station detail pages ('Get the right cable for this station')""
      - "Contextual widget: 'Charging for 30 min? Keep kids entertained with...'""
      - "Each market country uses appropriate affiliate network (Amazon US, Shopee SG/MY/TH, Lazada ID)"
    phase: "Phase 1 (high-effort, low-cost to implement)"

  - stream: "Hotel Affiliate Bookings"
    description: "Earn commission when users book hotels that advertise EV charging"
    commission_rates: "Booking.com 3-5%; Agoda 3-5%; direct partnerships negotiable"
    implementation:
      - "Hotel stations get 'Book this hotel' button with affiliate link"
      - "Hotel detail shows: EV charger type, number of ports, pricing, nearby family amenities"
    phase: "Phase 3 (needs hotel partnerships)"

  - stream: "Premium Filters & Advanced Search"
    description: "Unlock advanced search features (saved routes, charger reliability filters, price alerts)"
    pricing_model: "$5/mo Premium tier"
    features:
      - "Saved routes with auto charging stop suggestions"
      - "Historic charger reliability data"
      - "Real-time availability (when integrated)"
      - "Price drop alerts"
      - "Export trip plan as PDF"
    phase: "Phase 3 (after user base established)"

  - stream: "EV Charging Asia Data API"
    description: "Sell API access to enriched station data with family-friendly scoring"
    pricing_model: "$99/mo (1,000 req/day) or $499/mo (10,000 req/day)"
    target_customers: "Travel apps, navigation apps, EV manufacturer apps, roadside assistance providers"
    phase: "Phase 4 (post-traction)"
```


---

## 13. Implementation Phases

```yaml
implementation_phases:

  Phase 1:
    name: "MVP — Core Directory"
    duration: "3-4 weeks"
    cost_estimate: "~$50 (API key costs + domain + Vercel free tier)"
    deliverables:
      - "Next.js app scaffolded from Directory Beast template"
      - "OpenChargeMap sync script for Phase 1 focus markets"
      - "Station search + browse (list & map views)"
      - "Station detail pages with ISR"
      - "Family-friendly filter system (amenity chips + safety + connector + pricing)"
      - "Scoring algorithm (Convenience + Family + Overall)"
      - "Nearby amenity enrichment from OSM data"
      - "Claim this listing form (manual admin processing)"
      - "Suggest a station form (manual admin processing)"
      - "Affiliate product widget"
      - "SEO basics (sitemap, JSON-LD, metadata)"
      - "Blog section (2-3 pillar posts for SEO)"
    success_gate: "500+ stations indexed across focus markets; search works with all filters; detail pages load <2s"

  Phase 2:
    name: "Engagement & Growth"
    duration: "4-6 weeks"
    cost_estimate: "~$150-300 (potential database costs if off free tier)"
    deliverables:
      - "User accounts (email + magic link login)"
      - "User reviews and photo uploads for stations"
      - "Real-time charger availability (integrate with network APIs or crowdsource)"
      - "Featured listing payment system (Stripe/Paddle)"
      - "Admin dashboard for submission management"
      - "Verified badge system with automated workflow"
      - "Age-specific family filters"
      - "Multi-language support (Thai, Japanese, Indonesian)"
      - "Expanded markets: Philippines, Vietnam"
    success_gate: "500+ verified accounts; 100+ claimed listings; $200+/mo revenue"

  Phase 3:
    name: "Trip Planning & Sponsored Content"
    duration: "6-8 weeks"
    cost_estimate: "~$500-1,000"
    deliverables:
      - "Route-based trip planner (multi-stop with charging recommendations)"
      - "'While you charge' activity suggestions per age group"
      - "Hotel affiliate booking integration"
      - "Sponsored brand placements (EV manufacturers)"
      - "Premium tier (saved routes, advanced filters)"
      - "Mobile PWA improvements (offline station cache, install prompt)"
      - "Content marketing engine (auto-generated market reports)"
    success_gate: "$1,000+/mo revenue; 5,000+ MAU; 100+ claimed listings"
```

---

## 14. Out of Scope (Phase 1)

```yaml
out_of_scope_phase_1:
  - item: "User accounts (email/password or social login)"
    note: "Phase 2; Phase 1 uses email-only submission forms without auth"
  - item: "Real-time charger availability / status"
    note: "Phase 2; requires integration with charging network APIs"
  - item: "Route planning (multi-stop trip builder)"
    note: "Phase 3; requires complex geospatial calculations"
  - item: "Automated payment for featured listings"
    note: "Phase 2; Phase 1 owner claims are manually processed via email"
  - item: "User reviews and photo uploads"
    note: "Phase 2; Phase 1 uses static placeholder UI"
  - item: "Multi-language content"
    note: "Phase 2; Phase 1 is English-only with hreflang stubs"
  - item: "Native mobile apps"
    note: "Phase 3; Phase 1 is PWA-only"
  - item: "Automated content generation"
    note: "Phase 3; Phase 1 content is manually written"
```

---

## 15. Key Differentiators (Competitive Analysis)

| Differentiator | EV Charging Asia | PlugShare | ChargeMap | ABRP |
|---|---|---|---|---|
| Family-friendly filtering | ✅ | ❌ | ❌ | ❌ |
| Age-specific recommendations | ✅ | ❌ | ❌ | ❌ |
| 'While you charge' suggestions | ✅ | ❌ | ❌ | ❌ |
| Safety rating of area | ✅ | ❌ | ❌ | ❌ |
| Focus on Asia markets | ✅ (full) | Partial | Partial | ❌ |
| Station scoring (convenience + family) | ✅ | ❌ | ❌ | ❌ |
| Claim listing for station owners | ✅ | ✅ | ❌ | ❌ |
| Offline PWA support | ✅ | ✅ | ✅ | ✅ |
| Real-time availability | Phase 2 | ✅ | ✅ | ✅ |
| Route planning | Phase 3 | ❌ | ❌ | ✅ |

---

## 16. Success Measurement

```yaml
launch_criteria:
  - "All P0 acceptance criteria pass"
  - "500+ stations indexed across Phase 1 focus markets"
  - "Search + filter returns results within <2s on mobile 3G"
  - "Lighthouse scores: Performance ≥85, Accessibility ≥90, SEO ≥95"
  - "All critical error states handled (no raw error displays)"
  - "Sitemap + robots.txt deployed and crawlable"

success_metrics:
  - metric: "Monthly Active Users (MAU)"
    target: "5,000 within 3 months of launch"
    measurement: "Telemetry (opt-in anonymous page view counter)"
  - metric: "Unique stations viewed per session"
    target: ">2.5 average"
    measurement: "Analytics"
  - metric: "Filter adoption rate"
    target: ">30% of sessions"
    measurement: "Query param tracking"
  - metric: "Station claim initiation rate"
    target: ">2% of detail page visitors"
    measurement: "Form submission logs"
  - metric: "Monthly revenue"
    target: "$200 by month 3"
    measurement: "Affiliate + manual featured listing revenue"
  - metric: "Organic traffic growth"
    target: "50k visits/month by month 6"
    measurement: "Search Console / Analytics"
  - metric: "Bounce rate"
    target: "<50%"
    measurement: "Analytics"
  - metric: "Affiliate click-through"
    target: ">2% CTR"
    measurement: "Affiliate network dashboard"

next_phase_triggers:
  - trigger: "3,000+ MAU sustained for 2 consecutive months"
    action: "Begin Phase 2 planning (user accounts, reviews, payments)"
  - trigger: "$200+ MRR sustained for 2 consecutive months"
    action: "Invest in sponsored placements outreach and hotel partnerships"
  - trigger: "15,000+ stations across region"
    action: "Begin Phase 3 route planning engine"
```

---

## 17. Risks & Mitigations

```yaml
risks:
  - risk: "OpenChargeMap API rate limits or deprecation"
    likelihood: "Low-Medium"
    impact: "High"
    mitigation: "Cache aggressively (hourly refresh); maintain local station data; secondary data import path from CSV/JSON if API changes"

  - risk: "Low data quality in focus markets (missing stations, wrong locations)"
    likelihood: "Medium"
    impact: "Medium"
    mitigation: "Crowdsourced corrections as primary quality mechanism; incentivize station corrections; verify against multiple sources"

  - risk: "Slow organic growth in early months"
    likelihood: "Medium"
    impact: "Medium"
    mitigation: "Blog content targeting long-tail family EV keywords; cross-post to EV forums and Facebook groups; minimal paid ads if budget allows"

  - risk: "Family-friendliness scoring is subjective"
    likelihood: "Medium"
    impact: "Medium"
    mitigation: "Allow users to submit their own family rating; weight crowdsourced ratings higher over time; transparent score breakdown so users understand"

  - risk: "Hosting costs exceed free tier"
    likelihood: "Low (Phase 1)"
    impact: "Low"
    mitigation: "Static generation keeps server costs near-zero; Cloudflare Workers free tier for API; monitor and set alerts at $10/mo"
```

---

## 18. Tools & Services Budget (Phase 1)

```yaml
budget_phase_1:
  - item: "Domain (evchargingasia.com or similar)"
    cost: "~$12/year"
    vendor: "Namecheap / Cloudflare Registrar"
  - item: "Vercel Hobby (free tier)"
    cost: "$0"
    notes: "100GB bandwidth, 6000 build minutes/month — sufficient for Phase 1"
  - item: "OpenChargeMap API Key"
    cost: "$0 (free tier)"
    notes: "100 req/day for free tier; upgrade to $99/mo if needed"
  - item: "MapLibre GL JS (open source)"
    cost: "$0"
    notes: "Self-hosted tiles via OpenFreeMap (free)"
  - item: "GitHub (free tier)"
    cost: "$0"
    notes: "Private repo, CI minutes"
  - item: "Affiliate accounts (Amazon, Shopee, Lazada)"
    cost: "$0"
    notes: "Free to join; commission-based"
  - item: "Analytics (Plausible or Umami self-hosted)"
    cost: "$0 or ~$10/mo"
    notes: "Self-host Umami on free Railway tier or use Plausible free trial"
  - item: "Total Phase 1 budget"
    cost: "~$12/year + optional $10/mo analytics"
"
```

---

## 19. Approval

```yaml
approval:
  product_owner: "_________________ Date: _________
  cto: "_________________ Date: _________
  status: "DRAFT — pending review"
```

---

## Appendix A: Scoring Algorithm Detail

### Convenience Score (0–100)

| Component | Weight | Calculation |
|---|---|---|
| Charging speed | 30% | Normalized to max 350kW: `(max_kW / 350) * 100`, capped at 100 |
| Connector availability | 20% | Number of connector types supported: 1=40pts, 2=70pts, 3+=100pts |
| Pricing reasonableness | 20% | Free=100pts, Pay-per-use under $0.30/kWh=70pts, Pay-per-use over $0.30/kWh=40pts, Membership only=30pts, Unknown=10pts |
| Nearby amenities (quantity) | 30% | 0=0pts, 1=20pts, 2=40pts, 3=60pts, 4=80pts, 5+=100pts |

### Family Score (0–100)

| Component | Weight | Calculation |
|---|---|---|
| Safety rating | 40% | Very Safe=100pts, Safe=75pts, Moderate=50pts, Caution=25pts, Unknown=10pts |
| Kid-friendly nearby amenities | 35% | Each applicable amenity within 1km: Playground=30pts, Kid restaurant=20pts, Park=20pts, Mall=15pts, Hotel=15pts. Sum capped at 100pts |
| On-site amenities | 25% | Bathrooms available=40pts, Stroller accessible=30pts, Kid-safe waiting area=30pts |

### Overall Score
```
OverallScore = (ConvenienceScore × 0.5) + (FamilyScore × 0.5)
```

### Pricing Optimization Score Tiers
- **Green** (≥80): Excellent station — fast, affordable, and surrounded by family activities
- **Yellow** (50–79): Decent option — check detail page for specific strengths
- **Red** (<50): Limited appeal — likely a no-frills stop or unknown data

---

## Appendix B: Layout & Component Reference

### Page Layouts

| Page | Layout Pattern | Key Components |
|---|---|---|
| Homepage | Hero search bar → Featured stations (horizontal scroll) → 'By Market' quick links → Blog highlights | SearchBar, StationCard, MarketLinks |
| Search Results | Top: FilterBar (sticky) → Results: list grid (2-col desktop, 1-col mobile) → Right/Overlay: Map | FilterBar, StationCard (list variant), MiniMap |
| Station Detail | Hero (name, address, scores) → Connectors section → Amenities section → MiniMap → 'While you charge' → Affiliate widget → Claim CTA | ScoreBadge, AmenityChip, MiniMap, WhileYouCharge, ClaimForm |

### Component Reference to Directory Beast

- **Header.tsx**: Reuse Directory Beast Header — logo, nav, search toggle, theme toggle
- **Footer.tsx**: Reuse Directory Beast Footer — links, social, legal
- **StationCard.tsx**: Pattern-match Directory Beast listing card (image → station photo or placeholder, title → name, subtitle → address + city, badges → scores + connector types, tags → amenity icons)
- **FilterBar.tsx**: Extend Directory Beast filter pattern with amenity chips as horizontal scrollable toggle groups
- **SearchBar.tsx**: Reuse Directory Beast search with autocomplete (city focus)

---

*End of PRD v1.0. This document should be reviewed and approved before any development work begins.*}