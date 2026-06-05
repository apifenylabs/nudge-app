# Apifeny AI Directory

> **Copy-Paste AI Playbooks That Replace $2,200/mo in Services**

A comprehensive directory of AI tools, playbooks, and country-specific guides for solopreneurs and businesses in Asia. Stop collecting AI tools — start shipping results.

## 🚀 Live Site

[apifeny-ai.vercel.app](https://apifeny-ai.vercel.app)

## 🏗️ Tech Stack

- **Framework:** Next.js (App Router)
- **UI:** Tailwind CSS v4 + Base UI
- **Analytics:** Vercel Analytics + SpeedInsights + Google Analytics (env var)
- **Database:** Supabase (pending CEO migration)
- **PDF Generation:** Server-side via Puppeteer
- **SEO:** Dynamic sitemap, JSON-LD, OpenGraph, metadata per page

## 📂 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── ai-tools-*/        # Country pages (50+ countries)
│   ├── blog/              # Blog posts
│   ├── playbook/          # Individual playbook pages
│   ├── playbooks/         # Playbook listings
│   ├── tools/             # Tool detail pages
│   ├── categories/        # Browse by category
│   └── sitemap.ts         # Auto-generated sitemap (86 URLs)
├── components/            # Shared React components
│   ├── CountryPageTemplate.tsx
│   ├── SeoMetadata.tsx
│   ├── GeoSeoSchema.tsx
│   └── ...
├── data/                  # Static JSON data (131 files)
│   ├── tools.json
│   ├── collections.json
│   ├── affiliate-links.json
│   └── blog/*.json
├── lib/                   # Shared utilities
├── scripts/               # Data generation pipeline
├── components/            # UI Components
└── public/                # Static assets
```

## 🧠 Key Features

- **127+ blog posts:** Country-specific AI tool guides, comparisons, and industry analyses
- **50+ country pages:** Localized tool recommendations per Asian country
- **Copy-paste playbooks:** 105 step-by-step AI playbooks
- **SEO-first architecture:** Per-page metadata, JSON-LD, breadcrumbs, Geo SEO
- **Affiliate-ready:** Affiliate link infrastructure (pending CEO API keys)

## 🚦 Status

| Area | Status |
|------|--------|
| Code | ✅ Complete |
| Build | ✅ Clean (472 pages) |
| Deploy | ✅ Production (Vercel) |
| GA4 | ✅ Wired (needs `NEXT_PUBLIC_GA_TRACKING_ID`) |
| Affiliates | ⏳ Needs CEO: `NEXT_PUBLIC_AFFILIATE_*` env vars |
| Supabase | ⏳ Needs CEO migration |

## 🛠️ Local Development

```bash
npm install
npm run dev        # Next.js dev server
npm run build      # Generate blog data + build
npm run lint       # ESLint
```

## 📄 License

Proprietary — Apifeny Labs
