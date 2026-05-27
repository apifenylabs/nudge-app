# PRD: Category Management AI Agent

> **Status:** Draft v1 · **Owner:** Apifeny Labs · **Date:** 2026-05-26

---

## 1. Vision

**One-liner:** An AI that tells Shopify and retail stores what products to stock next — based on real trend data, not gut feel.

**Long version:** Every week, thousands of store owners make inventory bets with no data. They guess what's hot, overstock duds, and miss the next wave. This agent changes that. It scrapes the open web — Google Trends, Reddit, TikTok, competitor catalogs, search volume APIs — and returns concrete, actionable answers: "Stock waterproof picnic blankets next week. Searches are up 340% in your region. Competitors in your niche are out of stock." No dashboards to interpret. No charts to read. It tells you, in plain language, what to buy and why.

---

## 2. Problem

**Retailers don't know what to sell next — and it's costing them.**

- **Gut-feel inventory.** Most Shopify stores stock based on last year's numbers or whatever the owner thinks is cool. This is gambling.
- **Missed trends.** A product category blows up on TikTok. By the time a store owner hears about it, the wave is cresting — or they're weeks late and competitors already took the share.
- **Dead stock.** The flip side: they order something that looked good and it sits for six months eating storage fees.
- **Information overload.** Google Trends, Exploding Topics, Jungle Scout, social listening — the data exists, but it's fragmented. No one has time to stitch it together weekly.
- **No competitor awareness.** They don't know what their competitors added or discontinued last week. They operate blind.

**The gap:** There's no single tool that ingests all these signals and spits out a **buy list** in plain English.

---

## 3. Target Users

| Persona | Pain Point | Willing to Pay |
|---|---|---|
| **Shopify store owner** (solo, 1-50 SKUs) | Guesses what to stock. No time for research. | $10-30/mo |
| **Retail buyer** (multi-brand, 50-500 SKUs) | Needs category-level trend intel across verticals. | $50-100/mo |
| **E-comm manager** (agency, manages 5+ stores) | Needs alerts across clients. Competitor gap analysis. | $100-300/mo |
| **DTC brand founder** | Launching new product lines. Needs validation fast. | $100-200/mo |

---

## 4. Core Features

### 4.1 Trend Detection (The Engine)

*What's gaining momentum, right now.*

- **Google Trends scraper** — daily queries for relevant category keywords. Track 7-day/30-day momentum.
- **Reddit & TikTok listening** — monitor subreddits (r/shopify, r/entrepreneur, niche subreddits) and TikTok hashtag velocity. Early wave detection.
- **Search volume analysis** — pull relative growth from Google Trends API + supplemental paid APIs (Ahrefs/Keyword Insights for absolute volume where available).
- **News & media monitoring** — RSS feeds of industry news. When a niche gets coverage, flag it.
- **Output:** "Trending up: Portable power stations (+210% search, +45% Reddit mentions, 3 TikTok virals this week)."

### 4.2 Category Recommendations (The Action)

*Don't tell me what's trending. Tell me what to stock.*

- **Personalized recommendations** — "Your store sells camping gear. Portable power stations are trending across all signals. Here are 3 specific products with suppliers."
- **Seasonal timing** — "Winter is 8 weeks away in your market. Start ordering heated camping gear now."
- **Price tier suggestions** — "Trend is premium ($80-150). Don't stock the cheap $20 version — it's getting bad reviews on Amazon."

### 4.3 Competitor Gap Analysis

*What your competitors are selling that you aren't.*

- **Shopify store scraper** — given a competitor URL, periodically scrape their product catalog. Flag new additions.
- **Amazon category tracking** — track top sellers in your niche on Amazon. Compare against your catalog.
- **Gap report** — "Your 3 top competitors all launched 'solar camping showers' in the last 30 days. You don't carry this. Estimated demand: medium-high."
- **Out-of-stock alerts** — "Competitor X is sold out of Y. This is a signal to stock your alternative."

### 4.4 Demand Forecasting

*How much to order.*

- **Simple short-term forecast** — based on search trend trajectory + social signal velocity + seasonality. "Expect 40-60 units sold in the next 30 days. Order 60 to be safe."
- **Restock timing** — "Your current stock of Z will sell out in 12 days. Lead time from supplier is 10 days. Order now."
- **Region-specific** — "Trend is hitting the US west coast first. If your store ships there, prioritize."

---

## 5. How It's Different

| Existing Tool | What It Does | What's Missing |
|---|---|---|
| **Exploding Topics** | Trend database | No personalized recommendations. No competitor gaps. Dashboard-only. |
| **Google Trends** | Raw search data | No synthesis. No action items. No store integration. |
| **Jungle Scout** | Amazon product research | Shopify-store-specific? No. Proactive alerts? No. |
| **Simply Trends / Treendly** | Trend lists | No competitive analysis. No demand forecasting. No Shopify integration. |
| **Covalent** | Trend intelligence for brands | Enterprise pricing ($500+/mo). Overkill for indie stores. |

**Category Management AI** is not another analytics dashboard. It's a **proactive AI assistant** that says, in plain language, "next week, stock X because Y is happening." It doesn't show you a chart and make you interpret it. It tells you what to do.

The closest analogy: **a buying consultant that works 24/7** and costs $20/mo instead of $5,000/mo.

---

## 6. Monetization

### Free Tier
- Weekly trend digest (general, not personalized)
- Top 5 trending categories in your broad niche
- 2 trend alerts per month
- Shopify app listing only (basic)

### Growth Tier — $19/mo
- Personalized category recommendations for 1 store
- Weekly actionable "stock these" report
- Google Trends + Reddit listening
- 10 trend alerts / month
- Email + in-app alerts

### Pro Tier — $79/mo
- Up to 5 stores
- Competitor gap analysis (track 3 competitors)
- Demand forecasting
- Amazon category comparison
- Unlimited trend alerts
- Supplier suggestions (curated list)
- Priority support

### Enterprise — Custom
- Unlimited stores
- Custom data sources
- API access
- White-label reports
- Dedicated onboarding

---

## 7. Phases

### Phase 1: Trend Watching + Recommendations (MVP)
**Timeline:** 6-8 weeks

**Scope:**
- Google Trends scraper for 50 broad categories
- Reddit listening (top 20 e-comm subreddits + 10 niche per user)
- Weekly personalized report: "Stock these 5 categories next week"
- Shopify OAuth integration — read product catalog for personalization
- Web dashboard with plain-language recommendations
- Email delivery of weekly report

**Output quality bar:** The recommendation must be explainable in one sentence. "Stock waterproof picnic blankets because searches are up 340% and 3 competitors are running low."

**Deliverables:**
- Trend detection pipeline (Python, scheduled daily crawls)
- Shopify app (public listing, basic install flow)
- Web dashboard (Next.js, simple cards with trend data)
- Weekly email digest (Resend/Mailgun)

### Phase 2: Competitor Analysis + Demand Forecasting
**Timeline:** +6-8 weeks after Phase 1

**Scope:**
- Competitor Shopify store scraper (given URL → catalog comparison)
- Amazon top-sellers scraper for category comparison
- "Gap analysis" report — what competitors sell that you don't
- Simple demand forecast (linear regression on trend trajectory)
- Restock timing recommendations
- Alerts: "Competitor X sold out of Y"

### Phase 3: Auto-Purchase Suggestions + Supplier Integration
**Timeline:** +8-12 weeks after Phase 2

**Scope:**
- Supplier database integration (Spocket, Oberlo, Printful, AliExpress)
- One-click "add this product" to Shopify draft
- Margin calculation — estimated profit per recommended product
- "Auto-purchase" tier — system auto-creates Shopify purchase orders on user approval
- Bidirectional sync — purchase history feeds back into trend model
- Shopify admin integration (native Shopify interface, not just web app)

### Phase 4: Predictive Trend Engine
**Timeline:** Q2 2027

**Scope:**
- ML model trained on historical trend data + sell-through rates
- Predict which categories will trend 30-60 days out
- Confidence scoring per prediction
- User feedback loop — "Was this recommendation useful?" → trains model
- Custom category tracking (user defines own trend keywords)

---

## 8. Technical Notes

### 8.1 Data Sources

| Source | Access Method | Cost | Risk |
|---|---|---|---|
| Google Trends API (g-trends) | Public, daily pull | Free | Rate limits; rotating IPs needed |
| Reddit API (PRAW) | Public, subreddit monitoring | Free | API limits (~60 req/min) |
| TikTok (unofficial scrape) | Headless browser / apify actors | Paid proxy | Terms violation risk. Consider NewsAPI as fallback. |
| Amazon Product API | PAAPI 5.0 | Free tier | Rate limited, limited data |
| Shopify API | OAuth, store owner grant | Free | Read-only scopes sufficient |
| NewsAPI / RSS | Public | Free tier (100 req/day) | Coverage gaps |
| Ahrefs / SEMrush (optional) | Paid API | $50-200/mo | For keyword volume data. Not essential for v1. |

### 8.2 Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Scheduler (cron)                   │
│  Daily: Google Trends, Reddit, News, Competitor URLs │
└────────────┬────────────────────────────────────────┘
             │
┌────────────▼────────────┐     ┌──────────────────────────┐
│    Trend Engine (Python) │────▶│   Supabase / Postgres    │
│  - Signal aggregation   │     │  - Trend signals table   │
│  - Momentum scoring     │     │  - Store configs         │
│  - Category matching    │     │  - Recommendation cache  │
└────────────┬────────────┘     └───────────┬──────────────┘
             │                              │
┌────────────▼──────────────────────────────▼──────────────┐
│                    API Layer (Next.js)                    │
│  - /api/recommendations  - /api/trends  - /api/gaps      │
└────────────┬──────────────────────────────────┬───────────┘
             │                                  │
┌────────────▼──────────┐     ┌─────────────────▼──────────┐
│   Shopify App (React) │     │   Web Dashboard (Next.js)  │
│   Embedded in admin   │     │   app.apifeny.ai/trends    │
└───────────────────────┘     └────────────────────────────┘
```

### 8.3 Key Technical Decisions

- **Trend Engine:** Python (async, aiohttp for scraping). Celery + Redis for job queue. Scheduled via simple cron or Temporal.
- **Scoring algorithm (v1):** Weighted sum. Google Trends momentum (40%) + Reddit signal (25%) + social/News (20%) + seasonality (15%). Threshold-based — only surface signals above 70/100.
- **Shopify app:** Remix or Next.js with Shopify App Bridge. OAuth, webhooks for product/order events.
- **AI layer:** GPT-4o (or Claude 4 Sonnet) for the "plain language" report generation. Takes structured trend data → natural language buy recommendations.
- **Hosting:** Vercel (dashboard + API), Railway/Render (Python trend engine), Supabase (DB + realtime).

### 8.4 Privacy & Compliance

- Shopify data stays per-store. No cross-store training data without opt-in.
- Competitor scraping: public URLs only. No scraping of logged-in Shopify admin.
- GDPR compliance for EU stores. Store user's preference data on request.

---

## 9. Success Metrics

### Core Metrics (North Star)
| Metric | Target (90 days) | How to Measure |
|---|---|---|
| **Recommendation accuracy** | ≥70% of recommended categories sell within 21 days | Track if user stocks a recommended product, then check Shopify order data |
| **User retention (weekly)** | ≥60% Week 4, ≥40% Week 12 | App uninstall rate + dashboard logins |
| **Active users** | 500 paid users by end of Phase 1 | Stripe subscriptions |

### Secondary Metrics
| Metric | Target | Notes |
|---|---|---|
| **Trend detection lead time** | ≥7 days before peak | Measure against Google Trends peak date |
| **Competitor gap discovery rate** | ≥3 gaps per store per week | Gaps flagged vs gaps acted on |
| **Revenue per store** | $50 avg MRR across paid tiers | |
| **NPS** | ≥40 | Survey after 30 days of use |

### Counter-Metrics (What to avoid)
- **False positives:** Trend recommendations that flop. Track "this recommendation was wrong" feedback. Target <15% of surfaced recommendations.
- **Alert fatigue:** Too many notifications → users tune out. Cap alerts to 3/week per store on Growth tier.
- **Commodity advice:** If every store in a niche gets the same recommendations, differentiation drops. Build niche personalization by Phase 2.

---

## 10. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Google Trends blocks scraping | Medium | High | Rotating proxies, official API fallback, cached results |
| TikTok scraping banned | Medium | Medium | Switch to NewsAPI + Reddit as primary; TikTok as nice-to-have |
| Shopify app rejected | Low | Critical | Follow Shopify App Guidelines strictly. Submit early for review. |
| Users don't trust AI recommendations | Medium | Medium | Show explainability: "640% search increase in 7 days" — not "AI says so" |
| Competitor data scraping is legally grey | Medium | Medium | Only scrape publicly listed products. No pricing/profit scraping. TOS-safe. |

---

## 11. Open Questions

- **Should the trend engine be niche-specific or general-first?** Propose general-first (50 broad categories), then let niche emerge from user store data. General proves value fast; niche requires critical mass.
- **Free tier weekly digest — email or in-app only?** Email has higher open rate. Do both, but email is the hook.
- **Supplier integration in v1 or v3?** v3. v1 must validate trend accuracy before adding commerce friction. Recommendations first, purchases later.
- **How do we handle non-English trend sources?** v1: English only. Phase 2: top 5 languages (Spanish, French, German, Japanese, Chinese).

---

## 12. Competitive Landscape (Detailed)

| Product | Price | Trend Detection | Personalization | Competitor Gaps | Demand Forecast | Shopify Integration |
|---|---|---|---|---|---|---|
| **Category Mgmt AI** | $19-79/mo | ✅ Multi-source | ✅ Store-specific | ✅ Yes | ✅ v2 | ✅ Native app |
| Exploding Topics Pro | $79/mo | ✅ Database | ❌ Generic | ❌ No | ❌ No | ❌ No |
| Treendly | $39/mo | ✅ Web only | ❌ Generic | ❌ No | ❌ No | ❌ No |
| SimplyTrends | $29/mo | ✅ Web + social | ❌ Generic | ⚠️ Basic | ❌ No | ❌ No |
| Jungle Scout Suite | $69/mo | ✅ Amazon only | ✅ Amazon-specific | ✅ Amazon gaps | ✅ Amazon | ❌ No |
| ZIK Analytics | $30/mo | ✅ eBay/Amazon | ❌ Generic | ✅ eBay/Amazon | ⚠️ Basic | ❌ No |
| Covalent | $500+/mo | ✅ Enterprise | ✅ Custom | ✅ Full | ✅ Full | ❌ No |

---

## 13. Go-To-Market Plan

### Channel Strategy
- **Shopify App Store** — primary distribution. SEO + reviews.
- **Twitter/X** — share weekly trend insights publicly. Build authority.
- **Reddit (r/shopify, r/dropshipping)** — organic posts with real trend data. Not promotional — genuinely useful.
- **Indie Hackers** — build-in-public thread.
- **Email list** — free weekly trend report → upsell personalized.

### Launch Tactics
- **Beta (4 weeks):** 50 free users. Manual trend reports. Collect feedback + testimonials.
- **Public launch:** Shopify App Store listing + Product Hunt.
- **Referral program:** 1 month free for every referred paying user.

---

## 14. Appendix: Trend Scoring Algorithm (v1)

```
Signal score = Σ (weight × normalized_signal)

Weights:
  Google Trends momentum (7d)    0.40
  Reddit mentions (7d)           0.15
  Reddit velocity (3d vs 7d)     0.10
  TikTok hashtag velocity        0.10
  News coverage count (7d)       0.10
  Seasonal factor                0.15
    - High: +15% to final score
    - Baseline: 0%
    - Off-season: -15%

Score range: 0-100
  ≤ 40:  Not actionable
  41-65: Watch list
  66-80: Consider stocking
  > 80:  Strong buy signal

Threshold for user alert: ≥ 70
Threshold for "stock these" weekly report: ≥ 65
```

---

*This document is a living PRD. Update it as market feedback and technical discoveries reshape the product. Next review: 30 days after Phase 1 launch or on CEO request.*
