# BRD-001: GeneralScan Beast — Universal Product Scanner

**Status:** Draft | **Priority:** P0 | **Phase:** 1 (MVP)
**Author:** Captain | **Date:** 2026-04-27

---

## 1. Vision & Elevator Pitch

**Vision:** Make every purchase an informed decision. Point, scan, and instantly know what you're buying — for your health, the planet, and your wallet.

**Elevator Pitch:** GeneralScan is a universal product scanner that demystifies the 10,000+ items you encounter annually. Type a product name (later, scan a barcode) and get a clear, actionable breakdown: what's in it, how sustainable it is, where to buy it cheaper, and what alternatives exist. No jargon. No guesswork. Just clarity.

---

## 2. User Persona

**Primary: Chris** — Busy parent in Hong Kong. Shops at Wellcome, ParknShop, Mannings. Has ~30 seconds per product decision. Wants to know: is this healthy for my kids? Is this eco-friendly? Could I get it cheaper elsewhere? Willing to pay $5/mo for peace of mind.

**Secondary: Eco-conscious shopper** — Already checks labels but wants aggregated data. Cares about certifications, palm oil, plastic packaging.

**Tertiary: Budget optimizer** — Wants cheapest option for same product. Price-sensitive, brand-agnostic.

---

## 3. Functional Requirements

### Phase 1 (MVP)

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-01 | User can search products by name (text input) | P0 | Autocomplete suggested |
| FR-02 | Product detail page showing name, brand, category, image | P0 | |
| FR-03 | Sustainability score (0-100) with breakdown | P0 | See scoring algorithm |
| FR-04 | Health rating (0-100) with ingredient analysis | P0 | |
| FR-05 | Value score (0-100) based on price/quality | P0 | |
| FR-06 | Overall composite score (0-100) | P0 | Weighted average |
| FR-07 | Score cards rendered as colored gauges (red→amber→green) | P0 | |
| FR-08 | Open Food Facts API integration for food products | P0 | Free, no API key |
| FR-09 | Fallback to Open Beauty Facts for cosmetics | P1 | |
| FR-10 | Responsive design (mobile-first) | P0 | |
| FR-11 | Loading states during API calls | P0 | Skeletons/spinners |
| FR-12 | Error state when product not found | P0 | |
| FR-13 | Empty state for initial landing | P0 | |
| FR-14 | Compare page showing side-by-side scores | P1 | |
| FR-15 | Alternative product suggestions (cheaper, greener, healthier) | P1 | |

### Phase 2 (Future)

| ID | Requirement | Notes |
|----|-------------|-------|
| FR-16 | Barcode scanner via device camera | Native app / PWA |
| FR-17 | Barcode input field (manual) | Fallback |
| FR-18 | Price comparison across HK retailers | API integrations needed |
| FR-19 | User accounts & scan history | |
| FR-20 | Pro subscription ($5/mo) for unlimited scans + history | |
| FR-21 | Offline mode with cached scores | |
| FR-22 | Export/share scan results | |

---

## 4. Non-Functional Requirements

| ID | Requirement | Target | Notes |
|----|-------------|--------|-------|
| NFR-01 | Page load time (first meaningful paint) | < 2s | Static shell, client-side data |
| NFR-02 | API response time | < 3s (95th percentile) | Open Food Facts SLA |
| NFR-03 | Lighthouse Performance score | ≥ 85 | |
| NFR-04 | Lighthouse Accessibility score | ≥ 90 | ARIA labels, semantic HTML |
| NFR-05 | Lighthouse Best Practices score | ≥ 90 | |
| NFR-06 | Mobile-friendly (375px - 430px widths) | Full functionality | Tailwind responsive |
| NFR-07 | Dark mode support | Nice-to-have | |
| NFR-08 | Graceful degradation | All features | Fallback when API unavailable |
| NFR-09 | Rate limiting | Max 10 req/min/user | Respect Open Food Facts rate limits |
| NFR-10 | No user data stored server-side | Privacy by design | Stateless MVP |

---

## 5. Scoring Algorithm

### 5.1 Sustainability Score (0-100)

**Factors:**
- **Packaging** (0-40): Recyclable materials (+20), minimal packaging (+10), no plastic (+10)
- **Supply chain** (0-30): Local/regional sourcing (+15), fair trade certified (+15)
- **Ingredients** (0-30): Organic certified (+15), palm oil free (-10 each), fewer artificial additives (+5)

**Data sources:** Open Food Facts `ecoscore_grade`, `packaging`, `origins`, `labels`

**Mapping:**
| ecoscore_grade | Base Score |
|---------------|-----------|
| a            | 80-100    |
| b            | 60-79     |
| c            | 40-59     |
| d            | 20-39     |
| e            | 0-19      |

### 5.2 Health Rating (0-100)

**Factors:**
- **Nutri-Score** (0-50): a=40-50, b=30-39, c=20-29, d=10-19, e=0-9
- **Ingredient quality** (0-30): Less processed (-bad additives), whole foods base
- **Allergens** (0-10): Clear labeling (+5), common allergens flagged (-5)
- **Certifications** (0-10): Organic (+5), non-GMO (+5)

**Data sources:** Open Food Facts `nutriscore_grade`, `ingredients`, `allergens`, `labels`

### 5.3 Value Score (0-100)

**Factors:**
- **Price/quality ratio** (0-50): Based on product category average
- **Brand reputation** (0-25): Well-known quality brands score higher
- **Availability** (0-25): Widely available products score higher

**Data sources:** Open Food Facts `brands`, `quantity`, `categories` (price data limited in free tier; scores primarily derived from quantity/value ratio)

### 5.4 Overall Score (0-100)

Weighted composite:
- **Overall = Sustainability × 0.25 + Health × 0.45 + Value × 0.30**

Health weighted highest (alignment with user persona — parent prioritizing family health).

---

## 6. Success Criteria

| Criterion | Measurement | Target |
|-----------|-------------|--------|
| Search returns results | API success rate | ≥ 95% |
| Product detail renders in < 3s | User timing | ≥ 95th percentile |
| Score cards display for 80%+ searches | Coverage | ≥ 80% |
| Lighthouse mobile performance | Score | ≥ 85 |
| Lighthouse accessibility | Score | ≥ 90 |
| No JS errors in console | Console check | 0 errors |
| Responsive on 3 device widths | Manual QA | 375px, 768px, 1280px |

---

## 7. Out of Scope (Phase 1)

- Barcode scanning (camera or manual)
- User accounts / authentication
- Scan history / favorites
- Price comparison across real retailers (requires API integrations)
- Real currency conversion
- Offline mode
- Native mobile apps (iOS / Android)
- PWA installability
- EWG API integration (obsolete — using Open Food Facts data)
- Server-side rendering for dynamic pages (using client-side fetch)
- ML-based ingredient analysis
- Multi-language support

---

## 8. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          Browser (User)                            │
│  ┌──────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────┐  │
│  │ Search   │  │ Product      │  │ Compare      │  │ Score    │  │
│  │ Page (/) │──│ Detail       │──│ Page         │  │ Cards    │  │
│  └──────────┘  │ /product/[id]│  │ /compare     │  │(reusable)│  │
│                └──────────────┘  └──────────────┘  └──────────┘  │
└─────────────────────────┬───────────────────────────────────────────┘
                          │ Fetch API (client-side)
                          ▼
┌──────────────────────────────────────────────────────────────────────┐
│                      Next.js App (generalscan/)                      │
│  ┌──────────────┐  ┌────────────────┐  ┌────────────────────────┐ │
│  │ page.tsx     │  │ lib/api.ts     │  │ components/            │ │
│  │ layout.tsx   │  │ lib/score.ts   │  │  SearchBar.tsx         │ │
│  │ app router   │  │ lib/types.ts   │  │  ProductCard.tsx       │ │
│  └──────────────┘  └────────────────┘  │  ScoreCard.tsx         │ │
│                                        │  ScoreGauge.tsx        │ │
│                                        │  LoadingSkeleton.tsx   │ │
│                                        │  ErrorState.tsx        │ │
│                                        │  EmptyState.tsx        │ │
│                                        │  ProductGrid.tsx       │ │
│                                        └────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
                          │
                          ▼ HTTP GET
┌──────────────────────────────────────────────────────────────────────┐
│               External APIs (Free Tier)                              │
│                                                                      │
│  ┌────────────────────────────┐  ┌──────────────────────────────┐  │
│  │ Open Food Facts           │  │ Open Beauty Facts            │  │
│  │ api.openfoodfacts.org     │  │ api.openbeautyfacts.org      │  │
│  │ /api/v2/product/{barcode} │  │ /api/v2/product/{barcode}    │  │
│  │ /cgi/search.pl?search_terms│  │ /cgi/search.pl?search_terms  │  │
│  └────────────────────────────┘  └──────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
```

## 9. Component Tree

```
App
├── layout.tsx (root layout, metadata)
│   ├── globals.css (Tailwind imports, theme variables)
│   └── page.tsx (/)
│       ├── LandingPage (hero, search)
│       │   ├── SearchBar (text input with submit)
│       │   └── ProductGrid (search results)
│       │       ├── ProductCard (image, name, scores)
│       │       ├── LoadingSkeleton
│       │       ├── ErrorState
│       │       └── EmptyState
├── product/[id]/page.tsx
│   └── ProductDetail
│       ├── ProductHeader (image, name, brand, category)
│       ├── ScoreCardGrid
│       │   ├── ScoreCard (Sustainability)
│       │   ├── ScoreCard (Health)
│       │   ├── ScoreCard (Value)
│       │   └── ScoreCard (Overall)
│       └── ProductInfo (ingredients, packaging, origins)
├── compare/page.tsx
│   └── ComparePage
│       ├── SearchBar (multi-product input)
│       └── CompareTable
│           ├── ProductScoreRow
│           └── AlternativeCard
```

---

## 10. Data Flow

```
User types "organic oatmeal"
        │
        ▼
SearchBar → debounce 300ms → fetch(`/cgi/search.pl?search_terms=organic+oatmeal&json=1`)
        │
        ▼
Open Food Facts returns product list
        │
        ▼
ProductGrid renders ProductCard for each hit
        │
User clicks a product
        │
        ▼
Navigate to /product/{code}
        │
        ▼
ProductDetail → fetch(`/api/v2/product/{code}`)
        │
        ▼
scoring-engine.ts calculates 4 scores from product data
        │
        ▼
ScoreCardGrid renders gauges
        │
        ▼
Success! User sees complete breakdown
```

---

## 11. Tech Stack

| Layer | Technology | Justification |
|-------|-----------|---------------|
| Framework | Next.js 14+ (App Router) | Popular, well-documented, free hosting |
| Styling | Tailwind CSS v3 | Fast prototyping, utility-first |
| UI Components | shadcn/ui | Accessible, composable, Tailwind-native |
| Language | TypeScript | Type safety, better DX |
| Data Fetching | Native fetch (client-side) | No backend needed for MVP |
| Hosting | Vercel (free tier) | Next.js-native platform |
| API | Open Food Facts | Free, no API key, rich food data |
| Testing | Vitest | Fast, TypeScript-native |

---

## 12. API Endpoints (Phase 1)

All client-side; no backend.

| Operation | Method | URL | Purpose |
|-----------|--------|-----|---------|
| Search products | GET | `https://world.openfoodfacts.org/cgi/search.pl?search_terms={query}&json=1&page_size=20` | Find products by name |
| Get product | GET | `https://world.openfoodfacts.org/api/v2/product/{barcode}` | Full product details |
| Search beauty | GET | `https://world.openbeautyfacts.org/cgi/search.pl?search_terms={query}&json=1&page_size=20` | Find beauty products |
| Get beauty product | GET | `https://world.openbeautyfacts.org/api/v2/product/{barcode}` | Beauty product details |

---

## 13. Scoring Breakdown (Detailed)

### Sustainability Score

```typescript
function calculateSustainability(product: Product): {
  score: number; // 0-100
  breakdown: { factor: string; score: number; max: number }[];
} {
  const factors = [];
  let total = 0;

  // Ecoscore (0-40 points)
  const ecoscoreMap = { a: 40, b: 30, c: 20, d: 10, e: 0 };
  const ecoscore = ecoscoreMap[product.ecoscore_grade] ?? 0;
  factors.push({ factor: 'Eco-Score', score: ecoscore, max: 40 });
  total += ecoscore;

  // Packaging (0-20 points)
  const packagingScore = scorePackaging(product.packaging);
  factors.push({ factor: 'Packaging', score: packagingScore, max: 20 });
  total += packagingScore;

  // Certifications (0-20 points)
  const certScore = scoreCertifications(product.labels, ['organic', 'fair-trade', 'local']);
  factors.push({ factor: 'Certifications', score: certScore, max: 20 });
  total += certScore;

  // Origins (0-20 points)
  const originScore = scoreOrigins(product.origins);
  factors.push({ factor: 'Local Sourcing', score: originScore, max: 20 });
  total += originScore;

  return { score: total, breakdown: factors };
}
```

### Health Score

```typescript
function calculateHealth(product: Product): number {
  const nutriscoreMap = { a: 50, b: 38, c: 25, d: 13, e: 0 };
  const nutriscore = nutriscoreMap[product.nutriscore_grade] ?? 0;
  const hasOrganicLabel = product.labels?.some(l => l.includes('organic')) ? 20 : 0;
  const allergenPenalty = product.allergens?.length
    ? Math.min(product.allergens.length * 5, 20)
    : 0;
  const ingredientBonus = product.ingredients?.length < 10 ? 10 : 0;

  return Math.max(0, Math.min(100, nutriscore + hasOrganicLabel + ingredientBonus - allergenPenalty));
}
```

### Value Score

```typescript
function calculateValue(product: Product): number {
  // Open Food Facts has limited pricing data
  // Derived from: brand recognition, product quality indicators
  const brandBonus = product.brands ? 30 : 0;
  const quantityScore = product.quantity ? 20 : 0;
  const nutritionQuality = product.nutriscore_grade
    ? ({ a: 30, b: 25, c: 20, d: 10, e: 5 }[product.nutriscore_grade] ?? 0)
    : 0;
  const availabilityScore = product.categories_tags?.length > 3 ? 20 : 10;

  return Math.min(100, brandBonus + quantityScore + nutritionQuality + availabilityScore);
}
```

---

## 14. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Open Food Facts API down | High | Graceful error handling; cached fallback messages |
| Rate limiting | Medium | Client-side debounce; max 1 req/sec |
| Missing data (no ecoscore) | Medium | Partial scoring with missing factors marked "N/A" |
| Product not found | Low | Clear "product not found" state with search suggestions |
| User searches cosmetics on food API | Low | Detect category; auto-switch to Open Beauty Facts |

---

## 15. Definition of Done

- [ ] PRD reviewed and approved
- [ ] Next.js project scaffolded with TypeScript + Tailwind
- [ ] shadcn/ui components configured
- [ ] Search bar with debounced API calls
- [ ] Product detail page with 4 score cards
- [ ] Scoring algorithm with unit tests passing
- [ ] Loading, empty, error states for all components
- [ ] Mobile-responsive at 375px, 768px, 1280px
- [ ] Lighthouse Performance ≥ 85
- [ ] Lighthouse Accessibility ≥ 90
- [ ] No console errors
- [ ] Compare page functional (P1)
- [ ] Alternative recommendations working (P1)
