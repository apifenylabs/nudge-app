# AppFactory: Nudge Mobile App — PRD (v1.0)

## Project Information
```yaml
project: "Nudge Mobile"
version: "1.0 (PRD)"
date: "2026-04-28"
status: "PRD — pending CEO approval"
build_path: "workspace/nudge-mobile/"
```

## 1. Why Nudge, Not A New App

Nudge already has:
- ✅ Working Telegram bot integration
- ✅ Natural language task parser
- ✅ Task management backend
- ✅ Supabase database schema (57 migrations)
- ✅ PWA web app deployed at nudge-sigma-liart.vercel.app
- ✅ Family/parenting use case with $5-9/mo willingness to pay

AppFactory's job is NOT to build random apps — it's to package existing products for mobile distribution channels. **Nudge is the most shippable product we have.**

## 2. Mobile Strategy: Progressive Wrapper (Not Native Rewrite)

Do NOT rebuild Nudge from scratch in React Native. Instead:
- Ship the PWA as-is to both app stores via PWABuilder
- Wrap in a lightweight WebView shell (Capacitor.js) for native store listing
- Add native push notifications via OneSignal (free tier: 10k users)
- Add Apple/Google Pay via Stripe Checkout

Cost to ship: $0 for PWA + Capacitor, $99/yr Apple Developer, $25 one-time Google Play

## 3. MVP Scope

```yaml
mvp:
  - "Capacitor.js shell wrapping existing Nudge PWA"
  - "Push notifications via OneSignal"
  - "Apple Dev Account setup ($99/yr - needs approval)"
  - "Google Play Console ($25 one-time - needs approval)"
  - "Stripe subscriptions"
  - "iOS + Android app store listings"

not_in_mvp:
  - "Native UI rewrite"
  - "Offline-first sync"
  - "Apple Watch / Wear OS"
  - "Widgets"
```

## 4. Cost-Benefit

| Item | Cost | Time | Impact |
|---|---|---|---|
| PWA shell (Capacitor) | $0 | 4 hours | High — unlocks both stores |
| Push notifications | $0 | 2 hours | High |
| Apple Dev Account | $99/yr | 1 day | Required for iOS |
| Google Play Account | $25 one-time | 1 day | Required for Android |
| **Total upfront** | **$124** | **~2 days dev** | |

## 5. Decision Required

✅ **Approve Nudge Mobile build** — $124 total, ~2 days dev, clear monetization
⏸️ **Defer new AppFactory app** — no research-backed niche
❌ **Skip Habit Tracker** — saturated market, no unique angle
