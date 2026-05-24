# Nudge Deployment Status

## Current Phase: 34 — Trial Conversion Engine + Welcome Email Sequence

**Status:** ✅ **DEPLOYED**

**Date:** 2026-05-24 (Sun May 24 14:30 HKT)

**Deploy URL:** https://nudge-sigma-liart.vercel.app
**Build:** `next build` passes ✅

### Summary
Phase 34 adds the trial conversion engine and onboarding email drip sequence — the two highest-impact additions for driving MRR from existing users who are on the fence or haven't fully activated.

### What Changed

#### New Email Templates
- **`trialGracePeriodEmail()`** — Post-trial grace period email showing what features the user lost, with a one-click reactivation link. Sent 1-3 days after trial expires.
- **`welcomeSequenceEmail()`** — 3-step onboarding drip (Day 0: Welcome + quick start tips, Day 2: Streaks + family invite, Day 7: First week recap + upgrade nudge)

#### New Cron Routes
- **`app/api/cron/trial-grace/route.ts`** — Runs daily at 14:00 UTC, finds subscriptions whose trial ended 1-3 days ago, sends grace period re-engagement email with "what you lost" display.
- **`app/api/cron/welcome-sequence/route.ts`** — Runs daily at 10:00 UTC, finds new users at Day 0, Day 2, and Day 7 milestones and sends onboarding drip emails with dedup (via `email_log` table).

#### New API Routes
- **`app/api/admin/trial-stats/route.ts`** — Returns trial conversion analytics: total trials, converted, expired, grace reactivations, conversion rates, weekly trends.

#### Database Migrations
Added to `lib/supabase/migrate.ts`:
- **`trial_events`** — Tracks trial lifecycle events (started, 3d warning, 1d warning, expired, grace sent, grace reactivated, converted)
- **`email_log`** — Dedup + analytics for sent emails (user_id, email_type, sent status)
- **`task_shares_rls`** — Ensures `task_shares` table exists with proper RLS policies

#### Engagement Impact
| Feature | Expected MRR Impact |
|---------|-------------------|
| Trial grace re-engagement | 15-25% recovery of expired trials |
| Day 0 welcome email | +30% activation (first task within 24h) |
| Day 2 streak email | +20% day-3 retention |
| Day 7 upgrade nudge | +15% trial conversion |
| Admin conversion analytics | Track what's working |

### Cron Schedule (Vercel)
```
0 10 * * * — Welcome sequence (daily at 18:00 HKT)
0 12 * * * — Trial expiry warning (daily at 20:00 HKT) [existing]
0 14 * * * — Trial grace re-engagement (daily at 22:00 HKT)
0 20 * * 0 — Weekly scorecard (Sunday) [existing]
0 0 * * *  — Daily digest [existing]
```

### Environment Variables
- `CRON_SECRET` — Already set (used for auth on all cron endpoints)

### Deployment
```
npm run build  # PASSES
npx vercel build --prod
npx vercel deploy --prod --prebuilt
```

### Database Migration Required
Run migrations in this order via Supabase SQL editor or `lib/supabase/migrate.ts`:
1. `trial_events` — Trial lifecycle tracking table
2. `email_log` — Email send log for dedup
3. `task_shares_rls` — Task shares table for share analytics

### Next Priority Areas (after this phase)
1. Family invite email integration (connect email template to invite API)
2. Dashboard notification of "what's new" / changelog
3. Referral system (refer-a-family rewards)
