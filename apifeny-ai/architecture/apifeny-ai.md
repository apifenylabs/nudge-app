# apifeny.ai — AI Tools Directory Architecture

## Overview
Apifeny AI is a curated AI tools directory and learning platform focused on Asia. It combines a ranked tools catalog with editorial playbooks, community-submitted workflows, and a build-in-public dev log.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom tech-dark theme
- **State**: Client components with localStorage for MVP
- **Deployment**: Vercel (auto-deploy from GitHub)
- **Data**: In-memory seed data, Supabase planned for Phase 2

## Directory Structure

```
apifeny-ai/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (Header + Footer)
│   ├── page.tsx                  # Homepage
│   ├── page-content.tsx          # Homepage content sections
│   ├── tools/                    # Tool catalog pages
│   │   ├── page.tsx              # Full tools listing with filters
│   │   └── [slug]/page.tsx       # Individual tool detail page
│   ├── rankings/                 # Workflow-based rankings
│   │   ├── page.tsx              # All ranking categories
│   │   └── [slug]/page.tsx       # Individual ranking by workflow
│   ├── playbooks/                # Editorial playbooks
│   │   └── page.tsx              # List all playbooks
│   ├── playbook/                 # Individual playbooks
│   │   ├── page.tsx              # Redirect to /playbooks
│   │   └── [slug]/page.tsx       # Full playbook detail
│   ├── community-playbook/       # Community-submitted playbooks
│   │   ├── page.tsx              # Grid with search, tags, voting
│   │   └── [id]/page.tsx         # Community playbook detail
│   ├── submit-playbook/          # Community playbook submission form
│   ├── collections/              # Curated collections
│   ├── collection/[slug]/        # Individual collection
│   ├── blog/                     # Blog listing + articles
│   ├── build-in-public/          # Dev log (the journey)
│   ├── submit/                   # Tool submission form
│   ├── about/                    # About page
│   └── privacy/ + terms/        # Legal pages
├── components/                   # Reusable UI components
│   ├── Header.tsx               # Main navigation
│   ├── Footer.tsx               # Footer with links
│   ├── ToolCard.tsx             # Tool card (grid item) — includes "Best For" pipeline stage badges
│   ├── ToolGrid.tsx             # Grid with filter/sort logic
│   ├── ToolFilters.tsx          # Full filter sidebar (search, category, pricing, use case, agent role, region, toggles)
│   ├── ToolDetail.tsx           # Full tool detail layout
│   ├── ToolCommunityPlaybooks.tsx # Related community playbooks on tool detail
│   ├── ToolComments.tsx         # Client-side comment system (single-thread)
│   ├── PlaybookComments.tsx     # Client-side threaded comment/discussion system for community playbooks (localStorage)
│   ├── PlaybookTOC.tsx          # Client-side TOC with smooth scroll for editorial playbooks
│   ├── ReadingProgressBar.tsx   # Fixed-position scroll progress indicator
│   ├── HowToUse.tsx             # Quick-start steps component
│   ├── PriceComparisonTable.tsx # Pricing comparison component
│   ├── AffiliateCTABar.tsx      # Tool website link CTA
│   ├── SubmitToolForm.tsx       # Tool submission form component
│   ├── TrendingTools.tsx        # Homepage trending section
│   ├── MustUseThisMonth.tsx     # Homepage monthly must-use
│   ├── FeaturedCategories.tsx   # Homepage categories grid
│   ├── FeaturedCollections.tsx  # Homepage collections
│   ├── FeaturedRankings.tsx     # Homepage rankings by workflow
│   ├── FeaturedPlaybooks.tsx    # Homepage featured playbooks
│   ├── NewsletterSignup.tsx     # Email signup
│   └── SponsoredToolSpot.tsx    # Sponsored placement
├── lib/                         # Shared logic
│   ├── data.ts                  # 60-tool seed dataset
│   ├── types.ts                 # TypeScript interfaces + constants (incl. regions)
│   ├── ranking-algorithm.ts     # Cosme-style 5-factor ranking engine
│   ├── ranking-categories.ts    # 10 workflow-based ranking category definitions
│   ├── playbooks.ts             # 14 editorial playbooks (12 original + AI-Powered Market Research + AI Testing & QA Automation)
│   ├── community-playbooks.ts   # 5 seed community playbooks (3 original + Deep Research w/ Perplexity+Gemini + AI Agents w/ LangChain+Claude) + voting/sharing system
│   ├── collections.ts           # 5 curated collections
│   ├── blog-data.ts             # Blog content
│   ├── generated-blog-data.ts   # Auto-generated blog posts
│   ├── affiliate-links.ts       # Affiliate URL mapping
│   ├── utils.ts                 # Shared utilities (colors, formatting)
│   └── supabase.ts              # Supabase client (placeholder)
└── architecture/                # Docs
    └── apifeny-ai.md            # This file
```

## Core Features

### 1. Tool Catalog (60 tools)
- Full CRUD is simulated; data lives in `lib/data.ts`
- 15 categories, each tool has: pricing, Asia score, agent roles, pipeline stages, languages
- Filterable by search, category, pricing, use case, agent role, Asia-ready, agentic, multimodal, **region**

### 2. Cosme-Style Ranking Algorithm
- 5-factor weighted scoring:
  - Community Rating × log-normalized review confidence (35%)
  - Trending Velocity with recency decay (20%)
  - Asia Score (20%)
  - Editor Pick bonus (15%)
  - Saves/Bookmarks (10%)
- Output: 0-10 score per tool with full breakdown

### 3. Workflow-Based Rankings
- 10 ranking categories: Strategic Planning, Ideation, Research, Coding, Code Review, Deployment, Agent Building, Content Creation, Automation, Multimodal
- Each filters relevant tools by pipeline stage + categories/roles, re-ranks, displays top N
- Dedicated `/rankings/[slug]` pages with score badges and explanation
- Homepage featured section

### 4. Editorial Playbooks (14)
- Step-by-step guides with difficulty, read time, related tools
- Pro tips, common mistakes sections
- Linked to tool detail pages via HowToUse component
- Includes: AI-Powered Market Research (research pipeline stage), AI Testing & QA Automation (testing pipeline stage)
- Premium polish: reading progress bar, smooth-scroll TOC, revenue callout glow animation, enhanced typography

### 5. Community Playbooks (5 seed)
- Real-world workflows with:
  - Author attribution
  - Exact prompts used (with what worked/didn't)
  - Measurable results (MRR/ARR, time savings)
  - Revenue impact
- **Voting** (upvote/downvote with localStorage persistence)
- **Sharing** (X/Twitter, LinkedIn with count tracking)
- Searchable and filterable by tag
- Visible on tool detail pages when tools are referenced

### 6. User Submission (Playbooks)
- `/submit-playbook` form with:
  - Multi-step builder with add/remove
  - Tool selector (60 tool options)
  - Sample prompts with "what worked / didn't work"
  - Revenue/real results fields
  - localStorage persistence with editorial review notice

### 7. Build in Public
- `/build-in-public` page tracking the Apifeny AI journey
- 10 entries: features, content, infra, SEO updates

### 8. Comments & Voting
- Built-in commenting on tool pages (localStorage)
- Threaded comments on community playbook detail pages (localStorage, with replies)
- Comment counts shown on community playbook cards
- Voting on community playbooks (upvote/downvote)

### 9. Global + Region Filter
- Filter tools by region: Asia, North America, Europe, Southeast Asia, East Asia, etc.
- Region filter dropdown on ranking pages and community playbook pages

### 10. Ranking Page Enhancements
- Enhanced hero section with:
  - "Why this matters" callout explaining workflow stage criticality
  - Key stats box (tools ranked, adoption rate, savings)
  - "Start here if..." tip suggesting who the ranking is for

### 11. Premium UI Polish
- Reading progress bar (fixed top, gradient) on editorial + ranking pages
- Smooth-scroll Table of Contents on editorial playbook detail
- Revenue callout with glow animation on hover
- Hover micro-interactions on scoring and pipeline badges
- "Best For" color-coded pipeline stage badges on ToolCard.tsx

## Future (Phase 2)
- Supabase integration for persistent data
- User accounts with profiles
- User-submitted playbook approval workflow
- "Build as you browse" — tool purchasing via affiliate links
- Monthly newsletter
- API for external tool data ingestion
- Multi-language support
