# AI Cofounder — Research Ingestion

## Source: Original brief from Chris (May 16, 2026)

> **The Vision:**
> An AI "Cofounder" platform — a set of vertical-specific AI tools that each follow the same pattern: 5-7 smart questions → parallel agent processing → visual canvas output → one-click affiliate monetization.
>
> Each vertical (Meal Planning, Personal Finance, Solopreneur Ops, Travel) is its own mini-product on the same platform. Users get AI-powered plans, recommendations, and actionable outputs — and we earn through affiliates + premium subscriptions.
>
> This is a "Copilot for Life" — but instead of generic chat, each vertical is specialized with its own expert personality, data layer, and output format.

## Vertical Validation Summaries

### 1. Meal Planning & Nutrition
- **Pain:** 100M+ households plan meals weekly. Top complaint: "What's for dinner?" daily stress
- **Market:** $10B+ meal kit industry, $2B+ grocery delivery, $500M+ nutrition apps
- **Affiliates:** HelloFresh (up to $40/referral), Thrive Market, Instacart, Amazon Fresh
- **Differentiation:** Combines nutrition, budget, and schedule constraints in one place
- **Build time:** Estimated 2-3 days for MVP

### 2. Personal Finance
- **Pain:** 78% of Americans live paycheck to paycheck. Budgeting is the #1 New Year resolution
- **Market:** $1B+ personal finance app market, 200M+ Mint users (before shutdown)
- **Affiliates:** Mint/Rocket Money, YNAB (referral), credit cards, investment platforms
- **Differentiation:** AI-powered "what if" scenarios + personalized advice + action plan
- **Build time:** Estimated 3-4 days for MVP

### 3. Solopreneur/Small Biz Ops
- **Pain:** 60M+ solopreneurs globally. Top struggles: time management, marketing, cash flow
- **Market:** $20B+ productivity tools, growing solopreneur economy
- **Affiliates:** Notion, Zapier, Canva, Wave, Stripe
- **Differentiation:** Weekly ops engine — marketing calendar, cash flow projection, task prioritization
- **Build time:** Estimated 3-4 days for MVP

### 4. Travel Planning
- **Pain:** Travelers spend 5+ hours planning a single trip. Overwhelmed by options.
- **Market:** $1T+ travel industry, $500B+ online booking
- **Affiliates:** Booking.com (up to 40%), Expedia, Airbnb, Skyscanner, Kiwi
- **Differentiation:** Context-aware itineraries (budget, interests, pace) + real-time adjustments
- **Build time:** Estimated 4-5 days for MVP

## Monetization Model

| Tier | Price | Features | Revenue/User |
|---|---|---|---|
| Free | $0 | Basic output, 1 plan/month, no save | $0 (acquisition) |
| Pro | $9/mo | Unlimited plans, save, history, export | $9/mo |
| Family | $15/mo | Shared boards, 5 users, collaboration | $15/mo |
| **Affiliates** | Per-referral | 10-30% commission embedded in outputs | $0.50-$5/user/mo |

**Revenue per 1,000 MAU estimate:**
- Free: 0
- Pro (5% conversion): 50 × $9 = $450/mo
- Family (2% conversion): 20 × $15 = $300/mo
- Affiliate revenue (assume 30% click-through, 5% purchase, avg $3 commission): 1,000 × 0.3 × 0.05 × $3 = $45/mo
- **Total: ~$795/mo per 1,000 MAU**

## Key Competitors

| Competitor | Weakness | Our Advantage |
|---|---|---|
| ChatGPT / Claude | Generic, no specialized output | Vertical-specific personas + format |
| Mealime / YNAB / TripIt | Single vertical, no ecosystem | Cross-vertical data + context |
| Zapier / Make | Requires setup, technical | Zero-setup, natural language input |
| Notion templates | Static, no AI generation | Dynamic, personalized, actionable |

## Technical Strategy

- **Phase 1 (Week 1-2):** Build 4 landing pages + waitlist capture → validate demand
- **Phase 2 (Week 2-4):** Build Meal Planning vertical fully → launch on Product Hunt
- **Phase 3 (Week 4-8):** Build Personal Finance → cross-sell to existing users
- **Phase 4 (Month 3+):** Solopreneur + Travel → full platform

## Cost Analysis

| Item | Cost |
|---|---|
| DeepSeek-chat API | ~$0.15/day (assuming 100+ completions) |
| Vercel hosting | $0 (Hobby tier) |
| Supabase | $0 (Free tier, 500MB DB) |
| Domain | ~$10/year |
| Ollama (local) | $0 (electricity only) |
| **Total daily cost** | **~$0.15/day** |

## Key Risks

1. **Affiliate commission dependency** — revenue is delayed (30-60 day payout windows)
2. **Free tier cannibalization** — must keep free tier useful enough to convert, not so useful they never pay
3. **SEO competition** — established players dominate search for "meal plan" etc.
4. **Agent quality** — if AI output is generic, users won't come back
5. **Build-in-public fatigue** — must sustain daily content without burning out

## Open Questions

1. Should we validate with a landing page + waitlist first (weeks 1-2) before building?
2. Single platform (ai-cofounder.com) or separate domains per vertical?
3. PWA first or native app first?
4. Which vertical has the highest intent-to-pay based on waitlist interest?
