# Affiliate — Commission Programs & Status

## Current Status
- **No active affiliate accounts** — all zero
- All sites have affiliate link infrastructure built (AffiliateLink component, PriceComparison widget)
- Links currently point to placeholder/generic URLs

## Priority Programs (To Sign Up)

### Booking.com (Travel Sites)
- Commission: 3-4% per booking
- Tracked by hotel ID
- Priority for: Family Travel, Luxury Travel

### Klook (Activities & Tours)
- Commission: 4-7% per booking
- Best for: travel activities, tours, experiences
- Priority for: Family Travel, Luxury Travel, EV Charging

### Amazon (General/EV)
- Commission: 1-10% (varies by category)
- Priority for: EV Charging (car accessories), Blog posts

### Agoda (Hotels)
- Commission: 3-6% per booking
- Priority for: Family Travel, Luxury Travel

### Instacart (Food/Grocery)
- Commission: Per-order
- Priority for: AI Cofounder (meal planning)

## Implementation
- All affiliate links go through `lib/affiliate-links.ts` per project
- PriceComparison widget shows Klook vs Viator vs direct
- Deep Link Engine recommends contextual products on every detail page

### Historical Backfill (May 16 2026)

## Complete Affiliate Program Catalog

### AI Tools (Apifeny AI — Top Priority)
**Commission type:** Recurring 20-30% (highest value — monthly residual)

| Program | URL | Commission | Signup Status | Notes |
|---------|-----|------------|---------------|-------|
| **Jasper** | https://www.jasper.ai/affiliates | 30% recurring | NOT signed up | AI writing leader |
| **Writesonic** | https://writesonic.com/affiliate | 30% recurring | NOT signed up | AI content |
| **Copy.ai** | https://www.copy.ai/affiliates | 30% recurring | NOT signed up | AI copywriting |
| **Murf AI** | https://murf.ai/affiliate | 20% recurring | NOT signed up | AI voice |
| **Synthesia** | https://www.synthesia.io/affiliate | 20-30% recurring | NOT signed up | AI video — huge potential |
| **Notion** | https://www.notion.so/affiliates | 20% recurring | NOT signed up | Productivity |
| **Lovable** | https://lovable.dev/affiliates | 10-20% recurring | NOT signed up | No-code apps |

**Revenue potential:** $500+/month per program at scale. Recurring = month after month.
**Source:** affiliate-signup-checklist.md, memory 2026-05-13

### Travel (All Family Sites — 3-8% per booking)

| Program | URL | Cookie Duration | Commission | Signup Status |
|---------|-----|----------------|------------|---------------|
| **Klook** | https://affiliate.klook.com | 30 days | 15-25% (verified Apr 2026) | NOT signed up (quickest win) |
| **Viator** | https://www.viator.com/affiliates | 30 days | ~8% | NOT signed up |
| **Booking.com** | Via CJ.com | 30-90 days | 25-40% (via intermediary) | NOT signed up |
| **Agoda** | Via CJ.com or direct | 30 days | 4-6% | NOT signed up |

**Quickest win:** Klook (instant approval for sites with content)
**Source:** affiliate-signup-checklist.md, memory 2026-05-07, 2026-05-13

### Affiliate Networks (Gateway to 1000s of programs)

| Network | URL | Why |
|---------|-----|-----|
| **CJ Affiliate** | https://www.cj.com | Booking.com, Agoda, Viator, Expedia |
| **ShareASale** | https://www.shareasale.com | Smaller travel + SaaS programs |
| **Impact** | https://impact.com | Premium travel + luxury brands |

### Already-Hardcoded Affiliate IDs (placeholder injected May 7)
- **Klook:** 119991
- **Booking.com:** 2875669
- **Viator:** P00299136
- **EV itinerary Klook/Booking:** 8188783

These IDs are hardcoded into all 6 sites but NO affiliate accounts have been created.
If Chris signs up, the IDs will change and all sites need re-injection.

### Cross-Referenced from Research
- **Travel affiliate:** Booking.com 25-40%, Expedia up to 4% (memory 2026-05-13)
- **APAC travel affiliate conversion rates:** 4.2% vs 1.8% generic (memory 2026-05-07 research)
- **AI tools:** Recurring 20-30%, $500+/month potential per program (memory 2026-05-13)
- **Wellness tourism:** $860B market untapped — Pillar 2 opportunity (memory 2026-05-07)

### Monetization Infrastructure Built (May 7-13)
1. Affiliate CTA components on all blog posts (Apifeny, Family Travel, Luxury, EV)
2. PriceComparisonWidget on EV itinerary pages
3. SponsoredToolSpot component on Apifeny
4. BlogAffiliateCTA with 20+ slug-specific overrides and 50+ tag-based matching rules
5. Affiliate disclosure on all pages (legally required)
6. Cross-site links driving traffic between sites
7. Klook/Booking/Viator deep link infrastructure on all 6 travel sites

### What Blocks Revenue Today
1. **No affiliate accounts** — all links go to generic URLs, no commission tracking
2. **No traffic** — zero GA data across all 6 sites
3. **No social distribution** — API keys not set up
4. **No SEO rankings** — sites are too new to rank
