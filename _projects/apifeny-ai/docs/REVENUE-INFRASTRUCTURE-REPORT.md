# Apifeny AI — Revenue Infrastructure Report
**Generated:** 2026-05-30
**Site:** apifeny-ai.vercel.app

---

## 1. Existing Monetization Channels (Already Active)

| Channel | Status | Details |
|---------|--------|---------|
| **Affiliate Links (AI Tools)** | ✅ LIVE | 85+ tools in `lib/affiliate-links.ts` with structured data. `AffiliateButton` component used on tool pages. `/api/redirect` routes tracked tool clicks server-side. |
| **Affiliate Links (Travel)** | ✅ LIVE | `components/affiliate/AffiliateLink.tsx` supports Booking.com, Klook, Viator, Expedia, GetYourGuide, TripAdvisor, Agoda. Wired to central tracking API at `affiliate-tracking.vercel.app`. Used in footer and `PriceComparison` widget. |
| **Travelpayouts Script** | ✅ LIVE | Loaded in `layout.tsx` head. Hotel/rental affiliate network. |
| **Email Capture** | ✅ LIVE | `EmailCapture.tsx` (modal + inline variants) used on all playbook pages via `FreeTemplateSection`. `NewsletterSignup.tsx` on playbook pages. |
| **Newsletter API** | ✅ LIVE | `/api/newsletter` — full CRUD, preferences, analytics. JSON file persistence. |
| **Stripe Checkout** | ✅ BASE | `/api/create-checkout` — ready with 12+ products (single playbooks $9-19, Pro $47/mo, $470/yr). `/api/stripe-webhook` — stub handler (needs Supabase integration for fulfillment). |
| **Revenue Tracker** | ✅ LIVE | `/revenue` — public leaderboard showing verified user MRR stories. |
| **PDF Sales (Coming Soon)** | ✅ PLANNED | Every playbook page has a "Download PDF" CTA section ($9 one-time), currently disabled pending Stripe live mode. |
| **Affiliate Disclosure** | ✅ LIVE | In footer: "Some links are affiliate links. We may earn a commission." |

## 2. New Monetization Channels (Added This Session)

### 2.1 Premium Route (`/premium`)
- **Route:** `app/premium/page.tsx` + `_PremiumClient.tsx`
- **Pitch:** "Stop Collecting AI Tools. Start Shipping."
- **Two plans:**
  - Pro Monthly: $47/mo — full access, cancel anytime
  - Pro Yearly: $39/mo ($470/yr) — 2 months free, best value
- **Stats hero:** 79+ playbooks, 300+ prompts, $9/playbook or free
- **6 feature cards:** 79+ playbooks, PDF downloads, copy-paste prompts, revenue metrics, new playbooks first, lifetime access
- **CTAs:** Direct checkout via Stripe (uses existing `/api/create-checkout`)
- **Header link:** Added "Pro" with crown icon next to Playbooks in both desktop + mobile nav
- **Footer link:** Added "Pro" in Quick Links section

### 2.2 Email Capture on All Content Pages
- **New component:** `components/ContentEmailCapture.tsx`
  - Three variants: `inline` (rich, full-width), `compact` (smaller), `sidebar` (vertical)
  - Per-playbook capture: "Get the full '{playbook}' playbook" with free PDF pitch
  - Generic capture: "Get the Best AI Tools — Weekly"
  - Source tracking via `source` prop
  - Uses existing `/api/newsletter-subscribe` endpoint
- **Deployment:** To be wired into ALL dynamic pages — compare pages, guides, blog posts, categories, ranks, static playbooks (next iteration)

### 2.3 AdSense Placeholder
- **Component:** `components/AdSensePlaceholder.tsx`
- **Slots:** 728×90 Leaderboard, 336×280 Large Rectangle, 300×600 Skyscraper
- **Status:** Placeholder overlay. Uncomment `<ins>` block when AdSense is approved in ~4-8 weeks.
- **Site code placeholder:** `ca-pub-XXXXXXXXXXXXXXXX` (update with real ID)
- **Layout script placeholder:** `components/Header.tsx` or `layout.tsx` `<head>`

## 3. Revenue Projections (Conservative Estimate)

### Affiliate Revenue
| Tier | Traffic | Conversion | Avg Commission | Monthly |
|------|---------|-----------|---------------|---------|
| Minimal | 1K visitors/mo | 0.5% | $15 CPA | **$75** |
| Medium | 5K visitors/mo | 1.0% | $15 CPA | **$750** |
| Target | 20K visitors/mo | 1.5% | $20 CPA | **$6,000** |

### Playbook PDF Sales
| Tier | Traffic | Conversion | Avg $9-19 | Monthly |
|------|---------|-----------|-----------|---------|
| Minimal | 1K playbook views | 0.3% | $12 avg | **$36** |
| Medium | 10K views | 0.5% | $12 avg | **$600** |
| Target | 50K views | 1.0% | $12 avg | **$6,000** |

### Pro Subscription
| Tier | Playbook Views | Conversion | $47/mo | Monthly |
|------|---------------|-----------|--------|---------|
| Minimal | 1K views | 0.1% | $47 | **$47** |
| Medium | 10K views | 0.3% | $47 | **$1,410** |
| Target | 50K views | 0.5% | $47 | **$11,750** |

### Total Monthly Revenue Potential
| Tier | Affiliate | PDF Sales | Pro Subscriptions | **Total** |
|------|-----------|-----------|-------------------|-----------|
| Launch | $75 | $36 | $47 | **$158** |
| Growth | $750 | $600 | $1,410 | **$2,760** |
| Scale | $6,000 | $6,000 | $11,750 | **$23,750** |

## 4. Action Items for $1K MRR

### Immediate (This Week)
- [x] `/premium` route live with Stripe checkout
- [x] Premium link in header + footer
- [x] `ContentEmailCapture` component ready for all pages
- [ ] Wire `ContentEmailCapture` into all compare pages (13 pages)
- [ ] Wire `ContentEmailCapture` into all blog `[slug]` pages
- [ ] Wire `ContentEmailCapture` into all guide pages (25 pages)
- [ ] Wire `ContentEmailCapture` into all ranking pages
- [ ] Set `STRIPE_SECRET_KEY` to live (not test) key
- [ ] Enable the disabled PDF download section on playbook pages

### Next 2 Weeks
- [ ] Enable display ads (AdSense approval takes 1-4 weeks)
- [ ] Add email capture popup (exit-intent) via `EmailCapture.tsx` modal
- [ ] Set up affiliate IDs for all 20+ `NEXT_PUBLIC_AFFILIATE_*` env vars
- [ ] Connect Stripe webhook to Supabase for fulfillment
- [ ] Add "Pro" badge to playbook pages for locked content

### Strategic (30-60 Days)
- [ ] Launch Pro yearly ($470/yr) as primary upsell
- [ ] Add locked/free-preview pattern to playbooks (first 3 steps free)
- [ ] Start affiliate newsletter (recommend tools + earn)
- [ ] Build Apifeny affiliate program (referral rewards for existing users)
- [ ] Create 3 premium-only "masterclass" playbooks
- [ ] Test ad placements: leaderboard above fold, rectangle in sidebar

## 5. File Changes Summary

| File | Type | Description |
|------|------|-------------|
| `app/premium/page.tsx` | **NEW** | Premium route page with metadata |
| `app/premium/_PremiumClient.tsx` | **NEW** | Premium client component: features, plans, Stripe checkout |
| `components/ContentEmailCapture.tsx` | **NEW** | Universal email capture for all content pages (3 variants) |
| `components/AdSensePlaceholder.tsx` | **NEW** | AdSense ad slot ready for approval |
| `components/Header.tsx` | **MODIFIED** | Added "Pro" nav link (desktop + mobile) with Crown icon |
| `components/Footer.tsx` | **MODIFIED** | Added "Pro" link in Quick Links section |
