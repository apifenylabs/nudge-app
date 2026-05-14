# Affiliate Setup Guide — EV Charging Asia

> **Goal**: activate affiliate links across all 6 sites by setting a few Vercel environment variables.  
> **Status**: components are installed and rendering plain links. No env vars → no affiliate tracking.  
> **To enable**: join one or more programs below and set the matching env vars in Vercel.

---

## Quick Start

```bash
# 1. Copy the template
cp .env.example .env.local

# 2. Fill in IDs (see each section below)
# 3. For production: set vars in Vercel Project Settings → Environment Variables
```

---

## Provider Sign-up Guides

### 1. Booking.com (Hotels)

| Item | Detail |
|---|---|
| Program | [Booking.com Partner Program](https://partner.booking.com) |
| Sign-up | Create a partner account → "Affiliate" plan (free) |
| Approval | Usually instant; some regions need ID verification |
| Env var | `NEXT_PUBLIC_AFFILIATE_BOOKING_COM` |
| Value | Your `aid` parameter, e.g. `book_1234567` |
| Documentation | [Affiliate API docs](https://developers.booking.com) |
| Commission | ~4% per qualifying booking |

**How to find product IDs**:  
- Search on Booking.com for a hotel  
- The URL contains `/hotel/xx/hotel-name` — use that slug as the `productId`  

**URL format**: `https://www.booking.com/searchresults.html?aid={aid}&ss={productId}`

---

### 2. Klook (Activities, Tours, Rentals)

| Item | Detail |
|---|---|
| Program | [Klook Affiliate Program](https://affiliate.klook.com) |
| Sign-up | Register on the Klook affiliate portal |
| Approval | Usually instant |
| Env var | `NEXT_PUBLIC_AFFILIATE_KLOOK` |
| Value | Your `aid` parameter, e.g. `klk_119991` |
| Commission | ~3-6% depending on category |

**How to find product IDs**:  
- Browse Klook and open an activity page  
- The URL path after `/activity/` is your `productId`, e.g. `12345-tesla-rental-bangkok`  

**URL format**: `https://affiliate.klook.com/redirect?aid={aid}&aff_adid={productId}`

---

### 3. Viator / Tripadvisor Experiences

| Item | Detail |
|---|---|
| Program | [Viator Affiliate Program](https://www.viator.com/affiliates) |
| Sign-up | Register via Tripadvisor's affiliate portal |
| Approval | Usually instant for most countries |
| Env var | `NEXT_PUBLIC_AFFILIATE_VIATOR` |
| Value | Your `pid` parameter, e.g. `viator_P00299136` |
| Commission | ~4-8% |

**How to find product IDs**:  
- Open a Viator tour page  
- The URL path component after `/tours/` is your productId, e.g. `Bangkok-Elephant-Sanctuary`

**URL format**: `https://www.viator.com/{productId}?pid={pid}`

---

### 4. Expedia (Hotels, Car Rentals, Flights)

| Item | Detail |
|---|---|
| Program | [Expedia Partner Solutions / TravelAds](https://expediapartnersolutions.com) |
| Sign-up | Apply via the Expedia Partner Solutions portal |
| Approval | Requires approval (2-5 business days) |
| Env var | `NEXT_PUBLIC_AFFILIATE_EXPEDIA` |
| Value | Your affiliate `msp_cid`, e.g. `exp_123456` |
| Commission | ~3-5% |

**How to find product IDs**:  
- Search Expedia and copy the property/activity slug from the URL  

**URL format**: `https://www.expedia.com/{productId}?msp_cid={cid}`

---

### 5. GetYourGuide (Tours & Activities)

| Item | Detail |
|---|---|
| Program | [GetYourGuide Affiliate Program](https://partner.getyourguide.com) |
| Sign-up | Register as a partner → "Affiliate Program" |
| Approval | Usually instant |
| Env var | `NEXT_PUBLIC_AFFILIATE_GETYOURGUIDE` |
| Value | Your `partner_id`, e.g. `gyg_YOUR_PARTNER_ID` |
| Commission | ~6-10% |

**How to find product IDs**:  
- Browse a tour page — the URL path after `/en/` is the product slug  

**URL format**: `https://www.getyourguide.com/{productId}?partner_id={partnerId}`

---

### 6. Tripadvisor (Attractions, Hotels, Restaurants)

| Item | Detail |
|---|---|
| Program | [Tripadvisor Affiliate Program](https://www.tripadvisor.com/affiliates) |
| Sign-up | Same portal as Viator |
| Approval | Usually instant |
| Env var | `NEXT_PUBLIC_AFFILIATE_TRIPADVISOR` |
| Value | Your `partner_id`, e.g. `trip_12345` |
| Commission | ~50% of revenue share |

**URL format**: `https://www.tripadvisor.com/{productId}?partner_id={partnerId}`

---

### 7. Agoda (Hotels)

| Item | Detail |
|---|---|
| Program | [Agoda Partner Program](https://partner.agoda.com) |
| Sign-up | Register on the Agoda Partner Hub |
| Approval | Usually instant |
| Env var | `NEXT_PUBLIC_AFFILIATE_AGODA` |
| Value | Your `cid`, e.g. `agoda_999999` |
| Commission | ~3-5% |

**URL format**: `https://www.agoda.com/{productId}?cid={cid}`

---

## Environment Variables Reference

| Variable | Provider | Where to Get It |
|---|---|---|
| `NEXT_PUBLIC_AFFILIATE_BOOKING_COM` | Booking.com | Partner dashboard → Affiliate Settings |
| `NEXT_PUBLIC_AFFILIATE_KLOOK` | Klook | Affiliate portal → Account |
| `NEXT_PUBLIC_AFFILIATE_VIATOR` | Viator | Affiliate portal → API Keys |
| `NEXT_PUBLIC_AFFILIATE_EXPEDIA` | Expedia | Partner Solutions Dashboard |
| `NEXT_PUBLIC_AFFILIATE_GETYOURGUIDE` | GetYourGuide | Partner Hub → Affiliate |
| `NEXT_PUBLIC_AFFILIATE_TRIPADVISOR` | Tripadvisor | Affiliate portal |
| `NEXT_PUBLIC_AFFILIATE_AGODA` | Agoda | Partner Hub → Account |

### Setting vars in Vercel

1. Go to your project on [vercel.com](https://vercel.com)
2. **Settings** → **Environment Variables**
3. Add each `NEXT_PUBLIC_AFFILIATE_*` var
4. Set them for **Production**, **Preview**, and (for local dev) **Development**
5. Redeploy: `vercel --prod` or push to production branch

### Local development

```bash
# After filling in .env.local, run:
vercel env pull .env.local
# Or just use the .env.local file directly:
next dev
```

---

## Component Usage

### `<AffiliateLink />` — individual provider button

```tsx
import AffiliateLink from '@/components/affiliate/AffiliateLink';

// Simple – always renders, plain link until env var is set
<AffiliateLink
  href="https://www.booking.com/hotel/th/bangkok-luxury"
  provider="booking.com"
  productId="bangkok-luxury"
/>

// With custom children
<AffiliateLink
  href="https://www.klook.com/activity/12345"
  provider="klook"
  productId="12345-tesla-rental"
>
  Rent a Tesla in Bangkok
</AffiliateLink>
```

### `<PriceComparison />` — compare providers side-by-side

```tsx
import PriceComparison from '@/components/affiliate/PriceComparison';

<PriceComparison
  title="Compare hotel prices"
  options={[
    { provider: 'booking.com', price: '$85/night', url: '...', productId: 'bangkok-luxury', badge: 'Best Value' },
    { provider: 'expedia', price: '$92/night', url: '...', productId: 'bangkok-luxury' },
    { provider: 'agoda', price: '$88/night', url: '...', productId: 'bangkok-luxury' },
  ]}
/>
```

---

## How the Env-Var Gating Works

1. `AffiliateLink` looks up `process.env['NEXT_PUBLIC_AFFILIATE_{PROVIDER}']`
2. If the var is **set** AND `productId` is provided → constructs an affiliate-tagged URL
3. Otherwise → renders the plain `href` as-is
4. The component is **always visible** — the env var only controls *tracking*, not *visibility*

This means you can deploy the components today. They'll show "Book via Booking.com" buttons with plain URLs. Once you set the env var, those same buttons automatically start using affiliate links.

---

## Cross-Site Reuse

These components live in `components/affiliate/` and have **zero site-specific imports**.  
Copy the entire folder to any other Next.js site in your network:

- `family-travel-asia`
- `senior-friendly-travel-asia`
- `luxury-family-travel-asia`
- `kids-activities-asia`
- Any future site

Just set the same `NEXT_PUBLIC_AFFILIATE_*` env vars per site.

---

## Legal Compliance

✅ FTC affiliate disclosure is already in `SiteFooter.tsx`  
✅ Each `<AffiliateLink />` includes `rel="sponsored"`  
✅ Each `<AffiliateLink />` adds `target="_blank"` for safety  
✅ Commission disclosure shown in widget footers  

**Recommended**: add a dedicated `/affiliate-disclosure` page for full transparency.

---

## Monitoring & Optimization

- **Vercel Analytics**: track outbound click events (future enhancement)
- **Manual check**: once env vars are set, visit any page with affiliate links and inspect the URL
- **_paq / GA4**: add `onClick` event tracking to `AffiliateLink` for conversion data

---

## Troubleshooting

| Problem | Likely Cause | Fix |
|---|---|---|
| Links go to plain URLs despite env vars | `NEXT_PUBLIC_` prefix missing | Rename to `NEXT_PUBLIC_AFFILIATE_*` |
| Local dev not picking up vars | Need to restart dev server | `next dev` restart |
| Env vars not showing in build | Vercel env vars not set for branch | Set in Vercel Dashboard → Environment Variables |
| Links not rendering | Component import path wrong | Use `@/components/affiliate/AffiliateLink` |
