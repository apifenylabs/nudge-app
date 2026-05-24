# HEARTBEAT — May 24 10:59 HKT (ceo-24-7-work-engine cron)

## ⚡ PRIORITIES (LOCKED)
| Tier | Project | Role | Resource |
|------|---------|------|----------|
| **P0** | **Titan** | Main product — agent swarm dashboard + auth + freemium | 50% |
| **P0** | **Apifeny AI** | Playbook sales engine — email capture → Stripe → $9/$47 | 40% |
| **P1** | **Nudge** | Family + life dashboard — task mgmt + Daily Check-in habit tracker | 10% |
| **P2** | EV/Luxury/Senior/Kids Travel | Affiliate-only, zero active dev | 0% |

**LifeOS (standalone habit tracker) → merged into Nudge as Daily Check-in.** The standalone `_projects/lifeos` site stays for reference, and LifeOS lives in two forms:
- **Daily Check-in** tab in Nudge's dashboard (merged this session) — simple habit tracker with 13 daily trackers, localStorage + Supabase sync
- **LifeOS/Titan plugin** — stays as the guided-phase copilot tab in Titan (the original Titan `/dashboard/lifeos` concept)

Nudge now has **life tracking + task management** combined. This is its differentiation angle.

## 🔴 ACTIVE AGENTS
1. **Titan Monetization** `titan_monetization` — timed out. Resume: landing page + auth + freemium gates
2. **Apifeny Rewrite** `apifeny_sprint1` — completed: EmailCapture component created, integrated into 8 playbook pages. Build ✅. Next: homepage rewrite + FOMO

## 🚨 LIVE TRADING — CRITICAL CONTEXT (MAY 24)
**Hyperliquid connector is now LIVE and real.** Read `memory/2026-05-24.md` before any trading session.

### What was broken & fixed:
- ❌ Old connector read `clearinghouseState` (perp wallet = $0) → returned paper defaults silently
- ✅ Fixed: reads **portfolio endpoint** (`Info.portfolio().[0][1]["vlm"]`) for unified account balance
- ✅ SDK `Exchange(wallet)` works — placed 2 live orders (SOL long, ETH short) verified on-chain
- ✅ Balance = $41.03 USDC (spot). The perp wallet shows $0 by design under unified accounts

### Every cron tick — verify this:
1. Connection works (SDK initialized)
2. Balance > $20 (MIN_BALANCE)
3. Kill switch = false
4. Real positions, not paper defaults

**No API keys needed** — private key + wallet address in `.env` is enough.

## 🟢 SITE HEALTH (@2:20 HKT)
- ✅ Titan (titan-app-puce.vercel.app) — 13 routes, off-white dashboard, routing refactor shipped
- ✅ Apifeny AI (apifeny-ai.vercel.app) — 42 routes, 43K lines, EmailCapture live, build ✅
- ✅ LifeOS (ai-cofounder-lovat.vercel.app) — standalone site kept as reference; merged into Nudge
- ✅ Nudge — family task app + **Daily Check-in** (13 trackers, localStorage + Supabase sync), Stripe + Supabase wired

## ⛔ BLOCKERS (zero action until you unblock)
- Supabase migration (manual SQL step)
- Environment variables (GA4, affiliate IDs)
- Custom domain (apifeny.ai DNS)

## 📊 BUDGET
~$0.30 / $0.50 today · All DeepSeek-chat

## 🔜 NEXT
- Resume Titan sub-agent with lighter brief (context overflow was the issue)
- Apifeny: homepage rewrite + FOMO mechanisms
