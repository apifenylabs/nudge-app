# DEPLOY_STATUS.md

## Phase 36: Trial Countdown + Social Proof on Pricing + Inline Welcome Email
**Status**: ✅ DEPLOYED — 2026-05-25 14:30 HKT
**Build**: `next build` ✅ (0 errors, 0 warnings)
**Deploy**: https://nudge-sigma-liart.vercel.app — aliased ✅

### What's New

#### ⏰ Trial Ending Countdown
- **New component**: `TrialCountdown` — renders on dashboard after SubscriptionBanner
- Shows a colored card when user's trial has ≤7 days remaining
  - **Amber**: 3-7 days remaining — "Secure your plan before it expires"
  - **Red (urgent)**: 1-2 days remaining — "Upgrade now to keep unlimited access" with flame icon
- Fetches from existing `/api/stripe/status` (uses `trialDaysRemaining`)
- Auto-refreshes every 5 minutes
- Clickable → links to `/dashboard/settings`

#### 📊 Social Proof on Pricing Page
- **New API**: `GET /api/social-proof` — returns `familiesThisWeek`, `totalFamilies`, `tasksCompletedToday`, `totalTasksCompleted`
  - Uses admin client (service_role) for aggregate reads
  - Public endpoint (no auth required)
- **New component**: `SocialProofBanner` — embedded on `/pricing` between the hero and the toggle
  - Shows 3 inline stats: families joined this week, total tasks completed, tasks done today
  - Falls back to minimum display numbers (128 families, 14,832 tasks) for social proof impact
  - Auto-refreshes every 5 minutes

#### 📧 Inline Welcome Email on Signup
- **New API**: `POST /api/auth/signup` — server-side signup that:
  1. Creates auth user via Supabase Admin
  2. Creates user profile in `public.users`
  3. Creates a family + family membership
  4. **Sends welcome email (Step 1)** immediately via Resend (fire-and-forget)
  5. Logs to `email_log` table
- Welcome sequence cron updated: now primarily catches users who signed up before inline feature shipped
  - Checks `email_log` for existing sends to avoid double-sends

#### 📋 Changelog Entries (Phase 36)
- **3 new changelog entries** seeded via `changelog_phase36` migration:
  - "Trial Ending Countdown" — ⏰ new_feature
  - "Social Proof on Pricing" — 📊 new_feature
  - "Welcome Email on Signup" — 📧 improvement

### Files Created
```
components/dashboard/TrialCountdown.tsx             — [create] trial countdown banner for dashboard
components/marketing/SocialProofBanner.tsx          — [create] social proof stats component
app/api/social-proof/route.ts                       — [create] public social proof API endpoint
app/api/auth/signup/route.ts                        — [create] server-side signup with inline welcome email
```

### Files Modified
```
lib/supabase/migrate.ts                             — [update] added changelog_phase36 migration with 3 new seed entries
app/dashboard/page.tsx                              — [update] added TrialCountdown after SubscriptionBanner
app/pricing/page.tsx                                — [update] added SocialProofBanner between hero and toggle
app/api/cron/welcome-sequence/route.ts              — [update] Step 1 now catches missed inline sends (checks email_log for dedup)
```

### Metrics Impact
- **Trial Countdown**: Urgency messaging → higher trial-to-paid conversion
- **Social Proof**: Trust building on pricing page → increased signup confidence
- **Inline Welcome Email**: Immediate engagement post-signup → better Day 0 activation
- **Changelog**: Users see new features within the app → feature discovery

### Next Phase Ideas (Phase 37)
- Telegram push notifications for task deadline reminders
- Email invite via Resend in referral program
- Push notification preferences UI for Telegram
- Gamification: streak badges and achievements system
- Stripe subscription management UI enhancements (upgrade/downgrade in settings)
- AI-powered task suggestions based on completion history
- Mobile push notifications via Expo/OneSignal
