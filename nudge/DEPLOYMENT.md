# Nudge Deployment Guide

Last updated: 2026-04-15

## Current status

Nudge is an **alpha deployment candidate**, not yet monetization-ready.

- ✅ MVP foundation: auth, dashboard, Telegram webhook, follow-up flow, Supabase schema
- ✅ Natural language parsing with fallback mode
- ✅ Clarifying follow-up for missing task details
- ❌ Stripe billing not implemented
- ❌ Subscription management not implemented
- ❌ Production hardening incomplete

## Prerequisites

1. **Supabase project** with the schema from `supabase-schema.sql`
2. **Telegram bot** via BotFather
3. **Vercel account** (or other Next.js host)
4. **Anthropic API key** (optional, for Haiku parsing)

## Environment variables

Set these in Vercel (or `.env.local` for local dev):

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Telegram
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_WEBHOOK_SECRET=your-webhook-secret

# App URL
NEXT_PUBLIC_APP_URL=https://your-nudge-domain.com

# Auth
JWT_SECRET=your-jwt-secret
ENCRYPTION_KEY=your-encryption-key

# Optional AI parsing
ANTHROPIC_API_KEY=your-anthropic-key
NEXT_PUBLIC_ENABLE_AI_PARSING=true
```

## Deploy steps

### 1. Push to GitHub

```bash
cd /home/captain/.openclaw/workspace/nudge
git init
git add .
git commit -m "Nudge MVP alpha"
git branch -M main
git remote add origin git@github.com:YOUR_GITHUB_USERNAME/nudge.git
git push -u origin main
```

### 2. Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Follow the prompts, link your GitHub repo, and set the environment variables.

### 3. Set Telegram webhook

After deployment, get your live URL (e.g., `https://nudge-xyz.vercel.app`).

```bash
curl -X POST "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook?url=https://<YOUR_NUDGE_URL>/api/telegram/webhook&secret_token=<TELEGRAM_WEBHOOK_SECRET>"
```

### 4. Test

1. Visit your live URL
2. Sign up
3. Create a family
4. Connect Telegram in Settings
5. Send a natural language task to your bot

## Known gaps

### Billing
- No Stripe integration
- No subscription tiers
- No payment webhooks

### Security
- Webhook secret is optional (should be required in production)
- No rate limiting
- No audit logging

### Features
- No email/SMS reminders
- No recurring task engine
- No mobile app

## Next steps after deployment

1. **Add Stripe** – implement checkout, subscriptions, and webhooks.
2. **Harden security** – require webhook secret, add rate limiting, audit logs.
3. **Add notifications** – email, SMS, push.
4. **Add recurring tasks** – weekly, monthly patterns.
5. **Add mobile PWA** – offline support, push notifications.

---

**Important:** Do not claim “full monetization ready” until Stripe is implemented and tested.
