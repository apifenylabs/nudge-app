# 🚀 Chris Setup Checklist — Unblock Everything

_Last updated: May 5, 2026, 07:34 HKT_

Everything is waiting on you. Here's exactly what to do, in order.

---

## ⏫ P0: GA4 Tracking (5 minutes)

Need: ONE Google Analytics 4 property + tracking ID per site.

**Steps:**
1. Go to [GA4 Admin](https://analytics.google.com/analytics/web/)
2. Create a GA4 property for each domain (or one property, one stream per domain)
3. Copy the `G-XXXXXXXXXX` IDs
4. Add them to each Vercel project:

```bash
# family-travel-directory
vercel env add NEXT_PUBLIC_GA_TRACKING_ID production < familytravelasia_ga.txt

# luxury-family-travel-asia
vercel env add NEXT_PUBLIC_GA_TRACKING_ID production < luxury_ga.txt

# nudge
vercel env add NEXT_PUBLIC_GA_TRACKING_ID production < nudge_ga.txt

# ev-charging-asia
vercel env add NEXT_PUBLIC_GA_TRACKING_ID production < ev_ga.txt
```

Or paste them into Vercel Dashboard → Project Settings → Environment Variables.

**Or just reply with:** `GA4 IDs: familytravelasia.com → G-XXXX, luxury → G-XXXX, nudge → G-XXXX, ev-charging → G-XXXX`

---

## ⏫ P1: Nudge Supabase Service Role Key (2 minutes)

Nudge needs this for admin operations (creating users, background reminders).

**Steps:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard) → Project → Settings → API
2. Copy the `service_role` key (NOT the anon key)
3. Add to Vercel:

```bash
cd /home/captain/.openclaw/workspace/nudge
vercel env add SUPABASE_SERVICE_ROLE_KEY production
```

**Or reply:** `SUPABASE_SERVICE_ROLE_KEY: eyJhbGciOi...`

---

## ⏫ P1: Nudge Custom Domain (5 minutes)

**Steps:**
1. Buy a domain (e.g., `getnudge.app`, `usenudge.app`, `familytasks.com`)
2. Add to Vercel: Project → nudge → Settings → Domains → add domain
3. Configure DNS at your registrar (CNAME to `cname.vercel-dns.com`)

**Or reply:** `Nudge domain: getnudge.app (or tell me which one you want)`

---

## ⏫ P3: Next Directory Idea (1 minute reply)

The proposal for **Digital Nomad Families Asia** is ready. Or pick something else:

- Best International Schools Asia
- Medical Tourism Asia (family)
- Something entirely new

**Reply:** `P3: Digital Nomad Families Asia (GO)` or `P3: [your idea]`

---

## ⬇️ Optional: DeepSeek API Key for Nudge NLP

Currently Nudge falls back to local Ollama for NLP parsing. To use DeepSeek's cloud NLP instead (better accuracy):

1. Get key from [DeepSeek API](https://platform.deepseek.com/)
2. Add to Vercel: `vercel env add DEEPSEEK_API_KEY production`

---

### One-Liner Template

Reply with this filled in to unblock everything at once:

```
GA4: familytravelasia.com=G-XXXXX, luxury=G-XXXXX, nudge=G-XXXXX, ev-charging=G-XXXXX
Supabase key: eyJhbGciOi...
Nudge domain: getnudge.app
P3: GO Digital Nomad Families Asia
```
