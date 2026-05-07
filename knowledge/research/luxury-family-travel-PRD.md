# Luxury Family Travel Asia — PRD

**Product Requirements Document — Pilot Directory**

```yaml
project: "Luxury Family Travel Asia"
version: "1.0 (Initial PRD)"
date: "2026-04-30"
based_on_brd: "PRD_TEMPLATE.md" + "Directory Beast Master Template"
status: "PRD Phase — Pre-Development"
```

## 1. Overview

Luxury Family Travel Asia is the second directory built on the Directory Beast Master Template. It targets affluent families wanting premium travel experiences across Asia — 5-star resorts, private tours, butler-service villas, Michelin dining with kids, and exclusive family experiences.

**Differentiation from Directory Beast:** While Directory Beast covers all family travel (budget to luxury), Luxury Family Travel Asia curates only premium/premium-plus experiences. Same technical template, different brand, data, and curation criteria.

## 2. Target Audience

- Affluent families ($200k+/yr household income)
- Luxury travelers who expect 5-star service
- Parents who want safe, exclusive experiences for their kids
- Multi-generational travelers (grandparents + kids)
- Asia-resident expat families

## 3. Curation Criteria (must meet 4/5)

- Price range: $$$ or $$$$ only
- Safety rating: 4.0+
- Family-friendly amenities: dedicated kids club, babysitting, or family suites
- Location: Asia-Pacific (same bounds as Directory Beast)
- Premium feel: concierge, private transfers, or VIP experiences

## 4. Feature Set (Phase 1)

Same technical architecture as Directory Beast:
- SSG landing page with luxury-themed hero
- Klook-density grid (5-6 cards per row)
- Category carousels (Beach Resorts, Mountain Retreats, City Luxury, Private Villas)
- Affiliate links: Klook (119991), Viator (P00299136), Booking.com (2875669)
- Age filters, safety scores, parent stories
- Luxury-specific badges: "Butler Service", "Kids Club", "Private Pool", "Michelin Dining"

## 5. Initial Destinations (30 curated)

1. **Bali:** Four Seasons Sayan, Bulgari Resort, Ayana Estate
2. **Phuket:** Amanpuri, Trisara, Rosewood Phuket
3. **Maldives:** Soneva Fushi, Velaa Private Island, Gili Lankanfushi
4. **Singapore:** Raffles Hotel, Marina Bay Sands, Capella Sentosa
5. **Tokyo:** Aman Tokyo, Park Hyatt, Palace Hotel
6. **Hong Kong:** Mandarin Oriental, Four Seasons, Upper House
7. **Kyoto:** Aman Kyoto, Ritz-Carlton, Hoshinoya
8. **Langkawi:** The Datai, Four Seasons, St. Regis
9. **Hanoi:** Sofitel Legend Metropole, Capella Hanoi
10. **Siem Reap:** Amansara, Shinta Mani, Raffles Grand Hotel

## 6. Deployment

- Vercel Hobby (free tier)
- Custom domain: luxuryfamilytravelasia.com (or similar)
- Reuse Directory Beast's `lib/affiliate.ts`, components, and styling
- Brand assets: dark gold (#C9A96E) + cream (#F5F0E8) + deep navy (#1A1A2E)

## 7. Phase Plan

- **Phase 1:** Land + 30 destinations + search + affiliate links (est. 2h build)
- **Phase 2:** Booking system integration
- **Phase 3:** Concierge request form
- **Phase 4:** Curator review system
