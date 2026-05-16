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
