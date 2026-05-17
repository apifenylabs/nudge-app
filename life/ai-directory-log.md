# AI Directory Topic Log

> Project: Apifeny AI — AI Tools + Playbooks Directory
> Owner Agent: AI/Innovation Revenue Agent
> Status: ACTIVE — playbooks expanding, PDF sales launching
> Revenue Target: $3k/mo (playbooks + ads + PDF sales)
> Deployed: apifeny-ai.vercel.app

---

## Current State

- Playbooks: 58 total (content creation, chatbots, SEO, art, market research, newsletters, video, customer support, resume)
- Cosme-style ranking: ✅ algorithm deployed
- Tools directory: ~90 tools listed
- PDF playbook sales: ✅ AI Solopreneur Toolkit built at /playbooks/ai-solopreneur-toolkit ($9, Stripe checkout)
- Supabase DB: ⏳ schema exists but not deployed on Supabase

## Monetization Strategy

- **Playbooks** — free + premium tiers (community submissions)
- **PDF downloads** — $9-$29 per playbook (Nate Eliason model). Dedicated landing pages at /playbooks/<slug>
- **Affiliate** — tool recommendations with affiliate links
- **Community** — paid community access (future)
- **Tool subscriptions** — unlisted/premium tool access (future)

## Key Files

- Playbook pages: `app/playbook/[slug]/page.tsx`
- Playbook data: `lib/playbooks.ts`, `lib/community-playbooks.ts`
- PDF checkout API: `app/api/create-checkout/route.ts`
- Stripe env: uses VITE_STRIPE_SECRET_KEY (test key in nudge/.env.prod)

## What Chris Needs To Do

1. Set VITE_STRIPE_SECRET_KEY in Vercel env for apifeny-ai
2. Run Supabase schema for storing user playbooks

## Edit History

(Managed in life/Empire-Graph/project-edit-log.md)
