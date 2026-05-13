# EV Charging Asia — Architecture

## Overview

Next.js 14 app router project. Family + luxury EV road trip planner for Asia.
1,125 charging stations across 7 countries.

## Tech Stack

- Next.js 14 (app router)
- TypeScript
- Tailwind CSS
- Leaflet (map)
- Vercel (deployment)

## Project Structure

```
ev-charging-asia/
├── app/
│   ├── layout.tsx              # Root layout with metadata + analytics
│   ├── globals.css             # Global styles, dark mode, Vibe Engine
│   ├── page.tsx                # Homepage (server)
│   ├── page-content.tsx        # Homepage client content
│   ├── search/page.tsx         # Search page (server)
│   ├── search/_client.tsx      # Search page client logic
│   ├── station/[id]/
│   │   ├── page.tsx            # Station detail (server, dynamic)
│   │   └── _client.tsx         # Station detail client component
│   ├── routes/[slug]/page.tsx  # Route detail (SSG)
│   ├── itinerary/
│   │   ├── page.tsx            # Itinerary listing
│   │   └── [slug]/page.tsx     # Itinerary detail (SSG)
│   ├── blog/
│   │   ├── page.tsx            # Blog listing
│   │   └── [slug]/page.tsx     # Blog post (SSG with dynamic import)
│   ├── compare/page.tsx        # Route comparison
│   └── ...
├── components/
│   ├── AffiliateCTABar.tsx      # Affiliate CTA buttons (existing)
│   ├── EvRoadTripCTA.tsx        # ★NEW — Prominent EV car rental CTA
│   ├── PremiumPartnerSection.tsx # ★NEW — Premium listings / featured partners
│   ├── RoadTripPackageWidget.tsx # ★NEW — EV road trip package booking
│   ├── FeaturedFamilyStops.tsx  # Family-friendly carousel
│   ├── PriceComparisonWidget.tsx # Charging cost comparison
│   ├── EvMapContainer.tsx       # Leaflet map wrapper
│   ├── MapWithFilters.tsx       # Homepage map + filter
│   ├── MapView.tsx              # Map component
│   ├── StationCard.tsx          # Station card component
│   ├── HeroSection.tsx          # Search page hero
│   ├── StationTipForm.tsx       # User tips form
│   ├── SiteFooter.tsx           # Shared footer
│   ├── GoogleAnalytics.tsx      # GA4 integration
│   └── itineraries/
│       ├── ItineraryRevenueSection.tsx  # ★NEW — Revenue section wrapper for itinerary pages
│       ├── ItineraryAffiliateCTA.tsx
│       ├── ItineraryDaysTimeline.tsx
│       ├── ItinerarySEOSection.tsx
│       ├── ItineraryCard.tsx
│       ├── RouteMap.tsx
│       ├── SeasonalRecommendations.tsx
│       ├── SeasonalComparisonTable.tsx
│       └── PrintButton.tsx
├── lib/
│   ├── affiliate-links.ts     # Centralized affiliate link config
│   ├── scoring.ts             # Station scoring algorithm
│   ├── getData.ts             # Data access layer
│   ├── blog-data.ts           # Blog post definitions
│   └── ...
├── data/
│   ├── stations.json          # 1,125 station records
│   └── itinerary data files...
├── scripts/
│   └── generate-blog-data-node.js  # Blog data generator
├── tailwind.config.ts
├── next.config.js
└── package.json
```

## Routing

| Route | Type | Notes |
|-------|------|-------|
| `/` | Static | Homepage |
| `/search` | Static | Search + filters |
| `/station/[id]` | Dynamic | Station detail — `force-dynamic` (live data) |
| `/routes` | Static | All route listings |
| `/routes/[slug]` | SSG | 12 route detail pages |
| `/itinerary` | Static | All itinerary listings |
| `/itinerary/[slug]` | SSG | 12 itinerary detail pages |
| `/blog` | Static | Blog listing |
| `/blog/[slug]` | SSG | 31 blog posts |
| `/compare` | Static | Route comparison |

## Routing

- / (homepage): Static — client interactive (map, filters)
- /station/[id]: Dynamic — `force-dynamic` for real-time reliability data
- /routes/[slug]: SSG — 12 route detail pages
- /itinerary/[slug]: SSG — 12 itinerary pages with station data 
- /blog/[slug]: SSG — 31 blog posts with dynamic thumbnail imports
- /search: Static — client-side filtering on 1,125 stations

## Revenue Components (Added May 2026)

### 1. EvRoadTripCTA (`components/EvRoadTripCTA.tsx`)
- Prominent "Book Your EV Road Trip" car rental CTA
- Country-specific rental options via Klook affiliate
- Two modes: compact (search/station pages) and full (homepage)
- Reuses existing Klook affiliate link IDs

### 2. PremiumPartnerSection (`components/PremiumPartnerSection.tsx`)
- Premium listing / featured partner showcase
- Three tiers: Platinum, Gold, Silver
- Partners: Klook (EV rentals), Booking.com (hotels), Viator (tours)
- Expandable partner details
- Links to partner booking pages

### 3. RoadTripPackageWidget (`components/RoadTripPackageWidget.tsx`)
- Curated EV road trip packages
- Groups: Weekend trips, Week-long adventures, Extended journeys
- Compact mode for sidebar/page insertion
- Full mode with category grouping
- Package highlights and price indicators

### 4. ItineraryRevenueSection (`components/itineraries/ItineraryRevenueSection.tsx`)
- Client wrapper for injecting revenue components into server-rendered itinerary pages
- Composes all three revenue components

## Dark Mode Support

- Enabled via `darkMode: "class"` in tailwind.config.ts
- CSS variables for brand colors in dark mode
- Override classes for backgrounds, text, borders, shadows
- Maps and Leaflet containers get dark theme
- Respects `prefers-reduced-motion`
- Activation: Add `dark` class to `<html>` element

## Mobile-First Design

- Safe area padding via `env(safe-area-*)`
- 44px minimum tap targets on mobile
- 320px breakpoint safe-zone clamp sizing
- Touch-friendly improvements (hover:none/pointer:coarse queries)
- Smooth scrolling (prefers-reduced-motion aware)
- Responsive grid: 1 col mobile → 2 col tablet → 3-4 col desktop

## Build & Deployment

- Build: `npm run build` (generates blog data, then next build)
- Deploy: Vercel via GitHub
- Build ignores TypeScript errors and ESLint (configured in next.config.js)
- Output: Static + SSG pages; station detail is dynamic (server-rendered)

## Build Status

- 71 pages generated (12 routes SSG, 12 itinerary SSG, 31 blog SSG, plus static pages)
- Station/[id] is dynamic (force-dynamic), verified at request time
