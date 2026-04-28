# Social Beast × Greg Isenberg Playbook Analysis

## 1. What Applies Directly

**"Pick a niche → build media → own the category" is our exact strategy.** Directory Beast *is* the niche (family travel, Asia). Social Beast *is* the daily media engine. We don't need to hunt for a niche — we already have one with 506 destinations live. The playbook reduces to: **post daily travel content → build audience → drive traffic to Directory Beast → monetize.**

**Self-hosted stack.** Greg's Postiz + n8n + AI engine maps to us: we already have a publish script. We'd upgrade to: n8n (scheduling/queue) + AI content transformation (rewrite each destination in multiple formats, rotate angles) + multi-platform publishing (Twitter/X, Telegram, Instagram, Threads). Self-hosted = zero ongoing SaaS cost.

**Approval workflow.** AI generates → human approves → auto-publishes. For us: AI (DeepSeek or Gemini) generates 7 posts from 1 destination → Chris reviews in a morning batch → approves → queue drains across the week. This is the exact "review batch" workflow Greg recommends.

**Daily cadence.** Destination count (506) gives us ~1.4 years of *unique* daily posts before recycling. That's enough runway to build an audience organically.

**Category ownership potential.** No one owns "Asian family travel on social media" as a content brand. Daily destination posts + parent tips + budget breakdowns = the definitive voice. This is Greg's playbook verbatim.

## 2. What Doesn't Apply and Why

**"Sell nothing, product comes later."** This is the wrong half. We *already have* the product (Directory Beast). We're not starting cold. Our content should aggressively drive to the directory — it's not lead gen for a future product, it's distribution for a *live product*.

**B2B agency SaaS model.** Greg sells to businesses (white-label social tools). We're doing all in-house. No client onboarding, no multi-tenant infrastructure, no white-labeling. Simpler by an order of magnitude.

**Human as the face of the brand.** Greg emphasizes founders becoming the known person. For a family travel directory, the *brand* can be the face — "Family Travel Directory" as the trusted source. Chris doesn't need to become a travel influencer; the content is the asset.

## 3. Recommended Social Beast Phase 1 Scope (PRD First)

**PRD** (before any code):
- Define target platforms (priority: Twitter/X → Telegram → Instagram → Threads)
- Define post formats per platform (short-form Twitter, carousel Instagram, thread Threads)
- Define rotation strategy: 506 destinations × 3-5 angles each = 1,500-2,500 unique posts
- Define approval flow: AI generates weekly batch → Chris approves in dashboard → auto-queues
- Define metrics: impressions, clicks to Directory Beast, conversion to app install

**Build (Phase 1):**
1. **n8n workflow** — pick destination from JSON, apply template, queue for approval
2. **AI content transformer** — single destination → 7 posts (1 standard + 6 alternative angles: budget, safety, best-for, hidden gem, food-adjacent, weather-tip)
3. **Approval dashboard** — lightweight web UI (Next.js, extends social-beast-components) listing queued posts with approve/skip/edit
4. **Multi-platform publisher** — Twitter/X API v2 + Telegram Bot API first, Instagram later
5. **Daily cron** — drain approved queue at 09:00 HKT

**Non-goals for Phase 1:** No Instagram carousel generation. No AI image generation. No analytics dashboard. No user accounts. No scheduling UI (n8n handles this). No content idea generation (destination data is the source).

**Estimated time:** 3-5 days for a working MVP. n8n setup: 1 day. AI transformer: 1 day. Approval UI: 1-2 days. Publisher integration: 1 day.
