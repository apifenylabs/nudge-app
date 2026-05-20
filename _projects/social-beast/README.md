# Social Beast — Content Empire for Builders

Create, schedule, and publish social content across Twitter/X, LinkedIn, Telegram, Instagram, and your blog. AI-powered content engine with smart buckets, templates, and auto-generation.

## Features

- **Dashboard** — Quick stats, recent posts, platform status
- **Content Calendar** — Monthly grid view with per-day details, weekly schedule, and content bucket strategy
- **Posts** — Browse, search, filter, bulk archive/delete
- **Create** — Compose posts with platform-aware formatting, schedule, affiliate links
- **Analytics** — Engagement tracking across platforms
- **Settings** — Platform connections, brand voice, timezone
- **Community** — Discussion board
- **Build Log** — Transparent development timeline
- **Generate Week** — Auto-creates 12-14 draft posts from 7 content buckets

## Content Buckets

| # | Bucket | Emoji | Frequency | Best Platforms |
|---|--------|-------|-----------|----------------|
| 1 | Build in Public | 🏗️ | 3-4x/week | Twitter/X, LinkedIn |
| 2 | Product Deep Dives | 🔧 | 2x/week | LinkedIn, Twitter, Blog |
| 3 | Industry Commentary | 💡 | 2-3x/week | Twitter/X, LinkedIn |
| 4 | User Wins | 🏆 | 1-2x/week | LinkedIn, Twitter, Instagram |
| 5 | Behind the Scenes | 🎬 | 1-2x/week | Twitter/X, LinkedIn, Instagram |
| 6 | Humor & Relatability | 😅 | 1-2x/week | Twitter/X, Telegram, Instagram |
| 7 | Cross-Promotion | 🔗 | 1x/week | Twitter/X, LinkedIn, Telegram |

Each bucket has 3 ready-to-use templates with auto-fillable placeholders.

## Deployment

### Production (Vercel)

The site is live at: **https://social-beast-two.vercel.app**

**CLI Deploy:**
```bash
# From the social-beast directory
npx vercel --prod
```

**Git-based Deploy (recommended):**
1. Push to your GitHub repo
2. Import project in Vercel dashboard → Add New → Project
3. Vercel auto-detects Next.js — no config needed
4. Every push to `main` auto-deploys

### Environment Variables (none needed for MVP)

All data is localStorage-based. No API keys or database required.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS (cream/ink/accent/highlight palette)
- **Icons:** Lucide React
- **Charts:** Recharts
- **Storage:** localStorage (MVP — Supabase planned)
- **Analytics:** @vercel/analytics + @vercel/speed-insights
- **Hosting:** Vercel (Pro)

## Local Development

```bash
# Install
npm install

# Run
npm run dev

# Build
npm run build

# Lint
npm run lint
```

## Project Structure

```
social-beast/
├── app/                          # Next.js App Router pages
│   ├── analytics/                # Analytics dashboard
│   ├── build-log/                # Build log / changelog
│   ├── calendar/                 # Content calendar + bucket strategy
│   ├── community/                # Discussion board
│   ├── create/                   # Post composer
│   ├── posts/                    # All posts (search, filter, bulk)
│   ├── settings/                 # Platform connections, preferences
│   ├── globals.css               # Design system (cream/ink palette)
│   ├── layout.tsx                # Root layout with metadata + JSON-LD
│   ├── loading.tsx               # Loading state
│   ├── page.tsx                  # Dashboard
│   ├── robots.ts
│   └── sitemap.ts
├── components/                   # Reusable UI components
│   ├── AnalyticsChart.tsx
│   ├── AppShell.tsx
│   ├── CalendarView.tsx
│   ├── CrossSiteFooter.tsx
│   ├── Navbar.tsx
│   ├── PlatformBadge.tsx
│   ├── PostCard.tsx
│   ├── PostForm.tsx
│   ├── Sidebar.tsx
│   └── StatsCard.tsx
├── lib/                          # Business logic & data layer
│   ├── affiliate-links.ts        # Booking/Klook/Viator link generation
│   ├── analytics.ts              # Analytics computation
│   ├── calendar-generator.ts     # Week-ahead post generation
│   ├── content-buckets.ts        # 7 buckets with templates
│   ├── content-sources.ts        # Site content directory sources
│   ├── platforms.ts              # Platform config + publish abstractions
│   ├── posts.ts                  # Post CRUD (localStorage)
│   ├── publish.ts                # Multi-platform publishing
│   ├── scheduler.ts              # Schedule CRUD + processing
│   ├── seed-data.ts              # First-visit seed posts
│   └── types.ts                  # TypeScript types
├── public/
│   └── robots.txt
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── postcss.config.mjs
└── vercel.json
```

## Publishing Script (legacy)

The directory publishing script at `publish-directory.js` is a standalone Node.js script for batch-publishing destination content to Twitter/X and Telegram. It's separate from the Next.js app.

```bash
node publish-directory.js --dry-run
node publish-directory.js
```

## License

MIT — built by [Apifeny Labs](https://apifenylabs.github.io)
