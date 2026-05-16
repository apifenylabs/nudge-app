# Revenue Sprint — 7 Days to First Dollar

**Start: May 17 01:00 HKT**
**Constraint: Zero new credit card spend**

## The Strategy
Unblock 3 revenue channels using only what's already built. No new code needed — just configuration, deployment, and distribution.

## Sprint Plan

### Day 1 (May 17) — Unblock All Revenue Infrastructure
**Goal:** Every technical blocker for first dollar removed
- ✅ Nudge: Deploy Supabase schema via deploy-schema endpoint (SQL ready — 315 lines)
- ✅ Nudge: Set Stripe keys — empty .env.local needs filling (Chris provides keys)
- ✅ Affiliates: Verify all 3 directory sites have live affiliate link infrastructure
- ✅ Social Beast: Confirm build completes and /deploy endpoint works

### Day 2 (May 18) — Activate Affiliate Links
**Goal:** Booking.com, Klook, Agoda links live on 3 directory sites
- Family Travel Asia: Add Booking.com/Klook affiliate CTAs on destination pages
- EV Charging Asia: Replace placeholder IDs in affiliate-links.ts with real IDs
- Luxury Travel Asia: Verify Klook/Booking affiliate links render on property pages
- Cross-reference: Add footer affiliate disclosure on all 3

### Day 3 (May 19) — Organic Distribution Launch
**Goal:** First external traffic via free channels
- Social Beast: Generate 5 human-like Reddit posts in r/AsiaTravel, r/ElectricVehicles, r/travel
- Post 3 X/threads about build-in-public journey to agent-hq-alpha.vercel.app
- Seed Apifeny AI on r/SideProject and r/alphaorchestra

### Day 4 (May 20) — SEO Pipeline Activation
**Goal:** Organic search discovery begins compounding
- Add GA4 or Vercel Analytics to all sites (free tier)
- Generate 1-2 new long-tail blog posts per directory site
- Verify sitemaps submit correctly on all 9 sites

### Day 5 (May 21) — Nudge Monetization Go-Live
**Goal:** Freemium pricing active — users can sign up and subscribe
- ✅ Stripe keys set → checkout flow tested end-to-end
- Signup flow → create family → free plan active → upsell to Pro
- Post Nudge on r/SideProject, r/productivity, r/alphaorchestra

### Day 6 (May 22) — Traffic & Conversion Optimization
**Goal:** Measure + optimize what's getting traction
- Review analytics from Day 4 — which pages get views?
- Tweak affiliate CTAs on highest-traffic pages
- Double down on distribution channel showing traction
- Cross-post best-performing content to 2 more channels

### Day 7 (May 23) — Review & Compound
**Goal:** First dollar in — set up compounding loop
- Revenue report: what worked, what didn't
- Set up automated distribution (Social Beast crons)
- Scale winning channel ×3
- Publish build-in-public thread on X summarizing sprint
