# AI Cofounder — Master Template

## Structure for Each Vertical

Every AI Cofounder vertical follows this exact structure:

### 1. Landing Page (app/categories/[slug]/page.tsx)
- Hero with category-specific emoji and tagline
- "How It Works" 4-5 step flow
- Sample output preview (realistic mock)
- "What's Coming" feature preview
- CTA to waitlist

### 2. Agent Flow (app/categories/[slug]/onboard/page.tsx)
- 5-7 smart questions to understand user context
- Parallel agent queries (Research, Plan, Budget, Execute)
- Visual canvas output (charts, tables, lists)
- One-click affiliate links
- Save/share functionality

### 3. Data Layer (app/data/categories/[slug].ts)
- Affiliate link configs per category
- Category scoring weights
- Template questions array
- Sample output data

### 4. Monetization
- Freemium: basic output free
- Premium ($9-15/mo): advanced features
- Affiliates: primary revenue (10-30% commissions)
- Contextual recommendations

### Files to Create Per New Vertical
- `app/categories/[slug]/page.tsx` — Landing page
- `app/categories/[slug]/layout.tsx` — Category layout wrapper
- `app/data/categories/[slug].ts` — Data layer (affiliates, questions, samples)
- `docs/CATEGORY_[SLUG].md` — Research brief and validation

### Scoring Criteria (Before Building)
Score each criterion 0-10:

| Criteria | Score (0-10) | Weight |
|---|---|---|
| **PAIN VOLUME** — Are there 100+ proven complaints/comments in 30 days? | | 1.0x |
| **REVENUE SPEED** — Can we monetize in month 1? | | 1.0x |
| **AFFILIATE MATURITY** — Is there an existing affiliate ecosystem? | | 1.0x |
| **DATA AVAILABILITY** — Can AI research this domain reliably? | | 1.0x |
| **BUILD EFFORT** — Can we ship this in 2 days? | | 1.0x |
| **STRATEGIC FIT** — Does this strengthen the ecosystem? | | 1.0x |

**Decision:**
- Total ≥ **35**: Build immediately
- Total **25–34**: Research deeper before building
- Total **< 25**: Skip entirely

## Build Checklist for New Vertical

### Pre-Build
- [ ] Research brief created (`docs/CATEGORY_[SLUG].md`)
- [ ] Scoring completed (≥35 required)
- [ ] 3+ affiliate programs identified with commission rates verified
- [ ] 5-7 onboarding questions drafted
- [ ] Sample output mock created
- [ ] Emoji and tagline selected

### Build
- [ ] Landing page: hero, how-it-works, sample preview, feature preview, CTA
- [ ] Layout: consistent navigation, footer, SEO metadata
- [ ] Data layer: affiliates, questions, sample output, config
- [ ] Agent flow stub (onboard page with question form)
- [ ] Build passes (`npm run build`)

### Post-Build
- [ ] SEO metadata complete (title, description, open graph)
- [ ] Internal links to other verticals
- [ ] Waitlist capture wired up
- [ ] Deploy to Vercel staging
- [ ] Screenshot captured for build-in-public post

## Category Variations

Each vertical can have different **agent personalities** and **output formats**:

| Vertical | Agent Personality | Output Format |
|---|---|---|
| Meal Planning | Nutritionist + Chef + Budget Planner | Weekly meal grid, grocery list, nutrition breakdown |
| Personal Finance | Financial Advisor + Accountant + Planner | Budget allocation chart, savings plan, debt payoff timeline |
| Solopreneur Ops | CEO + Operations Manager + Marketer | Weekly ops calendar, marketing plan, cash flow table |
| Travel | Travel Agent + Local Guide + Budgeter | Itinerary timeline, budget breakdown, packing list |
