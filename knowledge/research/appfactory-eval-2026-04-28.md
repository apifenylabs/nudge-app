# AppFactory Eval: What To Build Next

## Existing Assets

### HabitFlow (habit-tracker/)
- Status: Landing page + auth callback only. Zero habit features built.
- Route: 1 marketing page + 1 auth hook
- Dependencies: `@supabase/ssr` (breaks on Vercel), needs rewriting
- **Effort to ship MVP: ~8-12 hours of coding**
- **Monetization path:** Freemium habits ($5/mo) — saturated market (Streaks, Habitica, etc.)
- **Verdict: ⚠️ Low priority.** No differentiation, huge competition, long dev time.

### Nudge (nudge/)
- Already deployed to Vercel: nudge-sigma-liart.vercel.app
- Full architecture: Telegram bot, NLP parser, task management, PWA
- **Effort to ship mobile: Needs React Native + Apple Dev ($99/yr) + Google Play ($25 one-time)**
- **Monetization path:** $5/mo Pro, $9/mo Family — proven need (busy parents)
- **Verdict: ✅ High priority.** Existing code, validated need, clear monetization.

## Recommendation

**Build Nudge mobile app (React Native Expo)** — not a new app.

Rationale:
1. Nudge already works as Telegram bot — React Native PWA wrapper gets you on both stores quickly
2. $5-9/mo freemium is realistic for parents
3. Telegram bot is the growth engine; mobile app is the premium unlock
4. Cost: $0 for dev (we do it), $124/yr in store fees (need approval)

## What NOT to build
- Habit Tracker — generic, competitive, no unique angle
- General ScanWise — already built at workspace/scanwise/, no clear monetization
- New AppFactory app — no research-backed niche identified

## Next step for Nudge mobile
If you approve, I'll write the Nudge mobile PRD: React Native Expo app wrapping the Telegram bot + PWA, with native notifications, Apple/Google Sign-In, subscription payments via RevenueCat. < ~2 days of work start to ship.
