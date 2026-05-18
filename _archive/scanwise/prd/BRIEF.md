# ScanWise — Product Brief

## Vision
ScanWise is a universal product scanner that turns any barcode or product name into instant, actionable insights. Built for conscious consumers who want to know what's really in their products — without spending hours researching.

## Core Value Proposition
Scan → Understand → Share. One tap turns a product into a safety score, ingredient breakdown, alternative recommendations, and shareable insight cards.

## Target Audience
- Health-conscious shoppers (food, supplements)
- Parents checking baby/kids products
- Beauty/clean skincare enthusiasts
- Eco-conscious buyers looking for sustainable alternatives
- Deal hunters comparing prices

## Psychological Hooks
1. **Variable Reward** — Every scan reveals a surprising insight ("1 in 3 sunscreens still contain this ingredient..."). Keeps users coming back.
2. **Curiosity Gap** — Brief teaser ("Scanning... did you know?") before full reveal. Animated score gauge creates anticipation.
3. **Daily Streak** — "7-day scan streak 🔥" with badges, emoji rewards, and streak milestones (3, 7, 14, 30 days).
4. **Shareable Results** — Beautiful social cards with score badges make users want to post and compare with friends.

## Core User Flow
1. **Homepage** — Big search bar + barcode scanner placeholder + "Surprise Me" button
2. **Search → Loading** — Animated scan line + curiosity hook (random fact)
3. **Results Page** — Safety Score (animated 0-100 gauge) → Ingredient breakdown → Pricing → Alternatives → News
4. **Share Card** — Auto-generate shareable image with score, key findings, and brand info

## Data Sources
- Open Food Facts API (free, no key — 2M+ food products)
- Open Beauty Facts API (free, no key — cosmetics/personal care)
- Web search fallback for news/recalls via DuckDuckGo

## Scoring Algorithm

### Safety Score (0-100)
| Component | Weight | Mapping |
|-----------|--------|---------|
| Nutri-Score | 40% | a=95, b=80, c=60, d=35, e=15 |
| NOVA Processing | 30% | 1=90, 2=70, 3=40, 4=20 |
| Additive Penalty | 30% | Each flagged additive: -5 to -15 |

### Ingredient Analysis
- Flag known controversial additives: carrageenan, BHT/BHA, artificial colors (Red 40, Yellow 5, etc.), high fructose corn syrup, MSG, titanium dioxide, palm oil, artificial sweeteners (aspartame, sucralose, saccharin)
- Rate ingredients as Clean ✅ / Caution ⚠️ / Dirty ❌
- Generate plain-English explanations for complex ingredient names

### Overall Score
```
Overall = Safety × 0.5 + Ingredients × 0.3 + Completeness × 0.2
```
Where completeness = how many data fields the product has (image, ingredients, nutrition, brands, categories)

## Monetization (Future)
- Freemium model: 10 scans/day free, unlimited scans $2.99/mo
- Barcode scanner (hardware/API) for Pro tier
- Affiliate links to healthier alternatives (iHerb, Amazon)

## Tech Stack
- **Framework:** Next.js 14+ (App Router, TypeScript)
- **Styling:** Tailwind CSS v4
- **UI:** shadcn/ui components
- **APIs:** Open Food Facts, Open Beauty Facts
- **Deploy:** Vercel (free tier)

## Phase 1 Deliverables (This Build)
- [x] Product brief (this file)
- [ ] Next.js app scaffolded
- [ ] Homepage with search + Surprise Me
- [ ] Product detail page with score gauge
- [ ] Open Food Facts API integration
- [ ] Basic ingredient analysis
- [ ] Share card component
- [ ] Streak tracking with localStorage
- [ ] News/recall feed component
- [ ] Build passes cleanly

## File Architecture
```
scanwise/
├── app/
│   ├── page.tsx                  — Homepage
│   ├── layout.tsx               — Root layout
│   ├── globals.css              — Global styles
│   ├── product/
│   │   └── [id]/
│   │       └── page.tsx         — Product results
│   └── results/
│       └── page.tsx             — Search results
├── components/
│   ├── ScoreGauge.tsx           — Animated ring gauge
│   ├── IngredientList.tsx       — Ingredient breakdown
│   ├── ShareCard.tsx            — Shareable result card
│   ├── StreakBadge.tsx          — Daily streak display
│   └── NewsFeed.tsx             — News & recalls
├── lib/
│   ├── api.ts                   — Open Food Facts client
│   ├── score.ts                 — Scoring algorithm
│   └── streaks.ts               — Streak manager
├── prd/BRIEF.md                 — This file
└── data/
    └── hooks.json               — Curated insights
```
