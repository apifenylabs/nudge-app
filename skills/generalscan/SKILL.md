# GeneralScan Skill — Universal Product Scanner

**Version:** 1.0.0 | **Type:** Application Skill | **App Dir:** `workspace/generalscan/`

## Overview

GeneralScan is a Next.js web app that lets users search products by name and get instant:
- Product details (name, brand, category, ingredients)
- Sustainability score (0-100) with breakdown (eco-score, packaging, certifications, sourcing)
- Health rating (0-100) with breakdown (nutri-score, ingredients, allergens, certifications)
- Value score (0-100) with breakdown (brand, completeness, nutrition quality)
- Overall composite score with configurable weights
- Compare up to 4 products side-by-side

## Quick Start

```bash
cd ~/.openclaw/workspace/generalscan
npm run dev
```

Open `http://localhost:3000` in a browser.

## Architecture

```
src/
├── app/
│   ├── layout.tsx          # Root layout with nav & footer
│   ├── page.tsx            # Homepage with search
│   ├── globals.css         # Tailwind + base styles
│   ├── product/[id]/
│   │   └── page.tsx        # Product detail with score cards
│   └── compare/
│       └── page.tsx        # Side-by-side comparison
├── components/
│   ├── SearchBar.tsx       # Reusable search input
│   ├── ProductCard.tsx     # Search result card
│   ├── ScoreCard.tsx       # Score gauge with breakdown
│   ├── ProductInfo.tsx     # Detailed product info section
│   ├── States.tsx          # Loading, empty, error states
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── api.ts              # Open Food Facts API client
│   ├── score.ts            # Scoring algorithms
│   ├── types.ts            # TypeScript interfaces
│   └── utils.ts            # Utility functions
└── __tests__/
    └── score.test.ts       # Scoring algorithm tests
```

## API Data Sources

| Source | URL | Key | Rate Limit |
|--------|-----|-----|------------|
| Open Food Facts | `world.openfoodfacts.org` | None | ~10 req/s |
| Open Beauty Facts | `world.openbeautyfacts.org` | None | ~10 req/s |

## Scoring Weights

Overall = Sustainability × 0.25 + Health × 0.45 + Value × 0.30
- **Health** weighted highest (parent/health-conscious user persona)

### Sustainability (0-100)
- Eco-Score grade (40 pts max)
- Packaging materials (20 pts max)
- Certifications (organic, fair-trade, etc.) (20 pts max)
- Local sourcing / origins (20 pts max)

### Health (0-100)
- Nutri-Score grade (50 pts max)
- Ingredient quality & additives penalty (25 pts max)
- Allergen clarity (10 pts max)
- Health certifications (organic, non-GMO, vegan) (15 pts max)

### Value (0-100)
- Brand recognition (30 pts max)
- Quantity info (15 pts max)
- Nutrition quality (35 pts max)
- Product data completeness (20 pts max)

## Tests

```bash
cd ~/.openclaw/workspace/generalscan
npx vitest run     # Run all tests
npx vitest         # Watch mode
```

## Deployment

```bash
npm run build      # Production build
npm start          # Production server
```

## Skills

### production-readiness
```bash
# Before shipping
cd ~/.openclaw/workspace/generalscan
npm run build      # Must pass with 0 errors
npx vitest run     # Must pass all tests
# Manual QA: check homepage, search, product detail, compare
# Verify: loading/empty/error states
# Verify: mobile responsive at 375px
```

### scoring-customization
To modify scoring weights or factors, edit `src/lib/score.ts`:
- `calculateSustainability()` — adjust scoring factors
- `calculateHealth()` — adjust health factors
- `calculateValue()` — adjust value factors  
- `calculateOverall()` — adjust weight constants

After changes, run `npx vitest run` to verify tests still pass.
