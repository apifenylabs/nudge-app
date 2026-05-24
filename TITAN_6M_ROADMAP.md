# Titan 6-Month Roadmap → Monetization

Last updated: 2026-05-24 01:50 HKT

## 🎯 The Goal
Ship a product users **love opening daily** and are **willing to pay for** by Month 3. Then iterate to scale through Month 6. No aimless building — every sprint ties to a revenue milestone.

---

## Portfolio Priority

| Project | Priority | Role | Monetization Path |
|---------|----------|------|-------------------|
| **Titan** | 🔴 P0 | Main product | Freemium SaaS — $19/$49/$99 tiers |
| **Apifeny AI** | 🔴 P0 | Lead gen & playbook sales | $9 PDF playbooks → $47/mo Pro membership |
| **LifeOS** | 🟡 P1 | Retention & daily habit | Free → optional $7/mo "Deep Sync" (CSV export, multi-device, trends) |
| Nudge | 🔵 P2 | Side experiment | Differentiate first, monetize later |
| EV/Luxury/Senior/Kids Travel | ⚪ P3 | Maintain, no active dev | Affiliate-only (low effort) |

---

## Phase Breakdown

### Phase 1 — Ship to Win (Weeks 1-4) = $0 → $200 MRR

**Goal:** Get Titan into real hands. First playbooks selling on Apifeny.

**Titan (weeks 1-2):**
- [ ] Deploy routing refactor + off-white dashboard (🚀 DONE, live on Vercel)
- [ ] Add landing page (app/page.tsx) that converts visitors → login page
- [ ] Ship Supabase auth (login/signup) so users don't lose data
- [ ] "Your data is local" banner + clear CTA to create account
- [ ] Test with 5 real users → fix top 3 friction points

**Apifeny AI (weeks 1-4):**
- [ ] Rewrite top 5 playbooks from "tool list" format to **template-first** format:
  - Each playbook: Problem → Copy-paste Prompt → Expected Output → Why the paid version is better
- [ ] Add "Free Template" download (email capture) on every playbook page
- [ ] Sell 3 PDF playbooks @ $9 each → goal: 20 sales = $180 MRR
- [ ] Install Stripe checkout (exists in Nudge codebase, port over)
- [ ] Launch email sequence: Free template → 3 helpful emails → "Buy the playbook"

**LifeOS:**
- [ ] No changes — collect usage data, fix bugs

**Revenue milestone:** $200 MRR from playbooks + 10 Titan signups

---

### Phase 2 — Hook Users (Weeks 5-8) = $200 → $1K MRR

**Goal:** Users return daily. Freemium wall goes up.

**Titan (weeks 5-6):**
- [ ] Freemium gates:
  - Free: 1 swarm, 3 agents, basic mascots, no swarm save
  - Pro $19/mo: unlimited swarms, 10 agents, all mascots, save/load
  - Team $49/mo: 5 seats, shared swarms, role management
  - Enterprise $99/mo: custom agents, API access, priority support
- [ ] Stripe Checkout integration (port Nudge code)
- [ ] User settings page — subscription management
- [ ] Onboarding flow: First visit → choose mascot → create first agent → see dashboard
- [ ] Close the loop: "You've hit the free limit — upgrade to unlock unlimited swarms"

**Apifeny AI (weeks 5-8):**
- [ ] Pro membership ($47/mo): all 71 playbooks, new ones weekly, community access
- [ ] Gate individual playbooks behind membership (remove $9 option or keep both)
- [ ] Add "Playbook of the Week" feature — FOMO driver
- [ ] Build affiliate flow for tools directory (referral links → commission)
- [ ] Weekly email to 500+ subs → goal: 5% open rate → 20% click → 5% purchase

**LifeOS (week 7-8):**
- [ ] "Deep Sync" $7/mo: CSV export, sync across devices, trend analysis PDF
- [ ] Gamification: streaks, achievements

**Revenue milestone:** $1K MRR (Titan $300 + Apifeny $700)

---

### Phase 3 — Scale & Retain (Weeks 9-16) = $1K → $5K MRR

**Goal:** Reduce churn, increase spend per user.

**Titan (weeks 9-12):**
- [ ] Swarm sharing (share a swarm config via link)
- [ ] Public profile / portfolio page for power users
- [ ] Analytics dashboard for Pro+ (usage stats, cost savings calc)
- [ ] Referral program: "Invite a friend — both get 1 month free"
- [ ] Blog / changelog — publicly track updates, build trust

**Apifeny AI (weeks 9-16):**
- [ ] Guest expert playbooks (pay creators 50% rev share)
- [ ] Corporate licensing ($199/mo for teams of 10+)
- [ ] Tiered membership: Starter $19/mo (10 playbooks) / Pro $47/mo (all)
- [ ] Automated onboarding email drip (14-day sequence)
- [ ] Launch "AI Stack Audit" — paid service ($97 one-time, analyze a startup's AI stack)

**Revenue milestone:** $5K MRR ($2K Titan + $3K Apifeny)

---

### Phase 4 — Compound (Weeks 17-24) = $5K → $15K MRR

**Goal:** Multiple revenue streams, each growing independently.

**Titan (weeks 17-20):**
- [ ] Marketplace: community agent templates (pay creators 50%)
- [ ] White-label for agencies ($299/mo, resell as their product)
- [ ] API access for developers (usage-based pricing)
- [ ] Zapier / Make integration (enterprise unlock)

**Apifeny AI (weeks 21-24):**
- [ ] Directory listing upgrades (paid featured placement)
- [ ] Custom playbook service ($297 — we write a playbook for their exact use case)
- [ ] Affiliate program for playbooks (others promote, we pay 30%)

**Revenue milestone:** $15K MRR ($6K Titan + $7K Apifeny + $2K LifeOS)

---

## Weekly Sprint Cadence

Each week:
- **Monday:** Audit metrics (active users, MRR, churn, playbook sales). Pick 1 thing to improve.
- **Tue-Thu:** Build. One feature per sprint. No scope creep.
- **Fri:** Deploy + test. Fix critical bugs. Write what you shipped.
- **Sat-Sun:** Gather feedback. Research competitors. Plan next sprint.

**No aimless building.** If a task doesn't tie to a Phase, it doesn't get built.

---

## Immediate Next Actions (This Week)

1. ⏰ Deploy Titan routing refactor 🚀 (DONE — live at titan-app-puce.vercel.app)
2. 🔨 Fix login page (currently 404 on root `/` — visitors hit nothing)
3. 🔨 Rewrite one Apifeny playbook in template-first format as proof of concept
4. 🔨 Port Stripe checkout into Apifeny (Nudge project has it)
5. 📊 Set up Vercel Analytics on all sites to collect actual data
6. 🧪 Share Titan with 3 friends, get feedback

---

## Success Metrics (Tracked Weekly)

| Metric | Current | Phase 1 Target | Phase 2 | Phase 3 | Phase 4 |
|--------|---------|----------------|---------|---------|---------|
| Titan MAU | 0 | 10 | 100 | 500 | 2,000 |
| Titan Paid Users | 0 | 0 | 5 | 50 | 200 |
| Apifeny Playbook Sales | 0 | 20 | 100 | 500 | 2,000 |
| Apifeny Pro Members | 0 | 0 | 10 | 60 | 250 |
| Total MRR | $0 | $200 | $1K | $5K | $15K |
