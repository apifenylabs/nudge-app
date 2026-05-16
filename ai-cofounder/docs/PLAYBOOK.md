# AI Cofounder Platform — Playbook

> The complete strategy and execution playbook for building, launching, and scaling the AI Cofounder platform.

---

## Core Pattern

```
5-7 Smart Questions → Parallel AI Agents (Research × Plan × Budget × Execute)
→ Visual Canvas (Charts, Tables, Lists) → One-Click Affiliate Links
→ Save & Share → On-Trip / Live Mode
```

Every vertical follows this same interaction flow. The questions adapt to the category, but the engine stays the same.

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Frontend                          │
│  Next.js 14 + App Router + Tailwind CSS             │
│  lucide-react (icons) + recharts (charts)           │
│  Responsive PWA-ready                               │
├─────────────────────────────────────────────────────┤
│                    Backend                           │
│  Local JSON (phase 1) → Supabase (phase 2)          │
│  Affiliate link management                          │
│  Waitlist / email capture (Supabase or Resend)      │
├─────────────────────────────────────────────────────┤
│                    Agentic Layer                     │
│  OpenClaw Gateway + SOUL.md personality             │
│  Parallel agent dispatch (Research, Plan, Budget)   │
│  Model routing per AUTONOMOUS_RULES                 │
├─────────────────────────────────────────────────────┤
│                    Deployment                        │
│  Vercel (frontend) + GitHub (source)                │
│  Environment variables via Vercel dashboard         │
└─────────────────────────────────────────────────────┘
```

## Vertical Build Order (Priority)

```
1. Meal Planning & Nutrition    — Daily pain, fastest revenue, strong grocery affiliates
2. Personal Finance              — High LTV, established finance affiliate ecosystem
3. Solopreneur/Small Biz Ops     — Dogfood our own product, emerging market
4. Travel Planning               — Proven SaaS pattern, strong booking affiliates
```

### Why This Order?

| Vertical | Rationale |
|---|---|
| Meal Planning | **Immediate value.** People spend 30+ min/week planning meals. Grocery affiliate commissions (5-15%) are well-established. Lowest build effort of all verticals. |
| Personal Finance | **Highest LTV.** Budgeting is a recurring need. Finance affiliates pay well (banks, credit cards, investment platforms). Users willing to pay $15/mo. |
| Solopreneur Ops | **Dogfood + Narrative.** While building the platform, we document everything. Build-in-public content writes itself. Attracts other solopreneurs = our target customer. |
| Travel | **Biggest market.** But most competition. Build after we validate the pattern with 3 earlier verticals. Use travel as the "proven formula expansion." |

## Monetization Layers

```
Layer 1: Affiliate Links (Primary)
  - 10-30% commissions per referral
  - Integrated naturally into outputs
  - Contextual recommendations only (not spam)

Layer 2: Freemium → Premium ($9-15/mo)
  - Free: basic output (1 plan/mo, no save)
  - Pro ($9/mo): unlimited plans, save, share, history
  - Family/Team ($15/mo): shared boards, collaboration

Layer 3: Sponsored Content
  - Brand partnerships in relevant verticals
  - Example: Meal prep companies, kitchenware brands
  - Only after reaching 10k+ MAU

Layer 4: Data Licensing (Long-term)
  - Anonymized usage patterns for market research
  - Only after reaching 100k+ users
```

## Distribution Strategy

### Phase 1: Viral (Weeks 1-4)
- **Build-in-public on X/Twitter** — daily progress screenshots, metrics, lessons
- **Reddit value-posting** — answer questions in niche subs (r/mealprep, r/personalfinance, r/solopreneur) with actual outputs
- **Shareable outputs** — each generated plan has "Share as image" button → built-in viral loop

### Phase 2: SEO (Weeks 2-8)
- **Long-tail SEO** — each page targets specific queries
  - "meal plan for family of 4 under $200/week"
  - "budget planner for freelancers hong kong"
  - "travel itinerary generator 7 days europe"
- **Programmatic pages** — generate landing pages for top query combinations
- **Schema markup** — FAQ, HowTo, Product structured data

### Phase 3: Launch (Week 4-6)
- **Product Hunt launch** — choose strongest vertical (likely Meal Planning)
- **Hacker News "Show HN"** — with detailed build story
- **Email capture** — waitlist → launch announcement → referral program

## Metrics & KPIs

| Metric | Target (Month 1) |
|---|---|
| Waitlist signups | 500 |
| MAU (post-launch) | 1,000 |
| Free → Premium conversion | 5% |
| Average affiliate revenue/user | $0.50/mo |
| Build cost | < $0.50/day |
| Page load time | < 2s |

## Competitive Moat

1. **Parallel agent architecture** — not just a template, but an engine that produces unique, context-rich outputs
2. **Cross-vertical ecosystem** — a family that plans meals, budgets, and trips together stays longer
3. **Build-in-public audience** — real users watching real progress = free distribution + trust
4. **Lowest operating cost** — DeepSeek-chat + Ollama local, not GPT-4 API bills

## Tools & Stack Reference

| Need | Tool |
|---|---|
| Frontend | Next.js 14, Tailwind CSS, lucide-react, recharts |
| Backend | Supabase (Postgres + Auth + Storage) |
| Agent orchestration | OpenClaw Gateway |
| AI models | DeepSeek-chat, Ollama (local), Gemini 2.5 Flash |
| Deployment | Vercel |
| Source control | GitHub |
| Domain | (TBD) |
| Email | Resend or Supabase |
| Analytics | PostHog (self-hosted) or Plausible |
