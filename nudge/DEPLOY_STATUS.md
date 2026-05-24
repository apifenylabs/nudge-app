# Nudge Deployment Status

## Current Phase: 33 — Annual Billing + Usage Meter + Upgrade Modals

**Status:** ✅ **DEPLOYED**

**Date:** 2026-05-23 (Sun May 24 02:45 HKT)

**Deploy URL:** https://nudge-sigma-liart.vercel.app
**Build:** `next build` passes → `vercel build --prod` → `vercel deploy --prod --prebuilt`
**Key fix:** Unlinked Vercel project from dead `apifenylabs/nudge` GitHub repo (repo didn't exist). Without git integration, `vercel deploy --prebuilt` worked immediately.

### Summary
Phase 33 adds annual billing infrastructure, usage metering, and contextual upgrade prompts to drive conversion from free → paid.

### What Changed

#### Files Modified
- `lib/stripe/config.ts` — Added `PriceConfig` (monthly+yearly), `getPriceId()`, `resolvePlanFromPrice()`, yearly env vars
- `lib/stripe/server.ts` — Updated `createCheckoutSession` typing for interval support
- `lib/stripe/db.ts` — Added `billingInterval` to upsert/update, added `clearSubscription()`
- `lib/plans.ts` — Added `BillingInterval` type, `PlanPricing` with yearly pricing, `getPriceLabel()`, `getYearlyPerMonth()`, `getSubscriptionStatus()` with billing interval
- `app/api/stripe/create-checkout/route.ts` — Accept `interval` param, use `getPriceId()` for resolution
- `app/api/stripe/webhook/route.ts` — Parse `billing_interval` from price ID, store in DB
- `app/api/stripe/change-plan/route.ts` — Accept `interval` param, support billing interval changes, yearly price mapping
- `app/dashboard/page.tsx` — Added `UsageMeter` component
- `app/pricing/page.tsx` — Converted to `'use client'` with billing interval toggle, yearly pricing
- `lib/supabase/migrate.ts` — Added `billing_interval` migration (adds columns, updates plan constraint)
- `components/billing/SubscriptionCard.tsx` — Full rewrite with interval toggle, switch-interval action, yearly pricing display
- `components/billing/PlanComparison.tsx` — Billing interval toggle, yearly per-month pricing
- `components/billing/ConfirmModal.tsx` — Added `info` variant for billing interval changes
- `components/billing/CheckoutButton.tsx` — Accept `interval` prop, use `getPriceId()`

#### Files Created
- `components/billing/UsageMeter.tsx` — Dashboard widget showing free plan task usage vs limit with progress bar and upgrade CTA
- `components/billing/UpgradePrompt.tsx` — Full-screen modal with plan selector (Pro/Family), billing interval toggle, feature highlights, and checkout flow

### Pricing Structure
| Plan | Monthly | Yearly | Savings |
|------|---------|--------|---------|
| Pro  | $5/mo   | $50/yr ($4.17/mo) | 17% |
| Family | $9/mo | $90/yr ($7.50/mo) | 17% |

### Environment Variables Added
Need to set in Vercel:
- `STRIPE_PRICE_PRO_YEARLY` — Stripe price ID for Pro annual
- `STRIPE_PRICE_FAMILY_YEARLY` — Stripe price ID for Family annual
- `NEXT_PUBLIC_STRIPE_PRICE_PRO_YEARLY` — Public price ID for Pro annual
- `NEXT_PUBLIC_STRIPE_PRICE_FAMILY_YEARLY` — Public price ID for Family annual

### Database Migration Required
Run `billing_interval` migration via `lib/supabase/migrate.ts`:
- Adds `billing_interval TEXT` column to `subscriptions`
- Adds `family_id UUID` column to `subscriptions`
- Updates plan CHECK constraint to `'free' | 'pro' | 'family'`

### Deployment
```
npm run build  # PASSES
npx vercel build --prod
npx vercel deploy --prod --prebuilt
```

**Env vars added to Vercel:** `STRIPE_PRICE_PRO_YEARLY`, `STRIPE_PRICE_FAMILY_YEARLY`, `STRIPE_PRICE_PRO_MONTHLY`, `STRIPE_PRICE_FAMILY_MONTHLY`, `NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY`, `NEXT_PUBLIC_STRIPE_PRICE_FAMILY_MONTHLY`, `STRIPE_SECRET_KEY`, `DATABASE_URL`

**Stil needs migration:** Run `billing_interval` migration on production Supabase DB

### Next Priority Areas (after this phase)
1. Email notification system (trial-ending, task reminders via email)
2. Onboarding flow polish (guided walkthrough, family invite during signup)
3. Telegram deep linking (direct task creation from inline mode)
