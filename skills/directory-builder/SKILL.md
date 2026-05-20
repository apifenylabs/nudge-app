---
name: directory-builder
description: Build and optimize directory-style websites (travel, listings, reviews) with Next.js, Tailwind, JSON data, Vercel deploy. Use when creating a new directory site or auditing/improving an existing one.
---

# Directory Site Builder

Pattern for building listing/directory sites: EV charging stations, hotels, activities, AI tools.

## Architecture

```
app/
  page.tsx          ← Homepage (hero + featured + blog grid)
  [slug]/page.tsx   ← Detail pages (generated via generateStaticParams)
  search/page.tsx   ← Map + filters
  compare/page.tsx  ← Side-by-side comparison
  blog/             ← Blog section
    page.tsx
    [slug]/page.tsx
lib/
  getData.ts        ← Static data loader
  blog-data.ts      ← Blog post loader
  scoring.ts        ← Rating/comparison logic
  markdown-render.tsx ← Blog content renderer
data/
  stations.json     ← Main directory data
  blog-index.json   ← Blog metadata
components/        ← Reusable UI
  MapWithFilters.tsx  ← Map + search + filter combo
  TrustBadges.tsx     ← Trust signals
```

## Data Pattern

Store all data in `data/*.json`. Import directly (Next.js bundles it on build — no fs.readFile needed):

```tsx
import data from '@/data/stations.json'; // works on Vercel serverless
```

## Station/Listing Schema

```typescript
interface Listing {
  id: string;            // "country-city-NNN"
  name: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  description: string;
  // ...domain-specific fields
}
```

## Critical Performance Rules

| Rule | Why |
|---|---|
| `generateStaticParams` max 50 | OOM on free-tier if >50 pages built at once |
| `revalidate = 3600` | ISR for remaining pages |
| All blog posts SSG via `getAllPosts()` | Pre-built at deploy |
| Map component `ssr: false` | Leaflet breaks SSR |
| Error boundaries on every app | Prevents blank screen on client crash |
| Pre-warm after deploy | Cold start gives 504 on first request |

## Blog System

1. Content in `content/blog/*.md` or `content/blog/*.json`
2. Generate via script: `node scripts/generate-blog-data-node.js` → `lib/generated-blog-data.ts`
3. Render with `lib/markdown-render.tsx` (zero-dependency markdown → JSX)

## SEO Checklist

- [ ] JSON-LD structured data (FAQPage, Article, BreadcrumbList)
- [ ] OG tags (title, description, image)
- [ ] Canonical URLs
- [ ] Sitemap (Next.js built-in)
- [ ] Per-page meta description (160 chars max)
- [ ] Affiliate links with `rel="sponsored"`
