# 🎯 GOALS & MILESTONES — Daily Check

This file is the source of truth for ranking targets, revenue milestones, and seed-readiness proof.
**EVERY cron run AND EVERY session start: check this file first.**
**No aimless building. Every action maps to a milestone or it doesn't happen.**

---

## 🏆 OVERARCHING OBJECTIVE
**Get seed-worthy. Prove revenue model + ranking traction with data.**
Not buzzwords. Hard numbers that a VC can't argue with.

---

## 📊 RANKING TARGETS (Google)

### Target: Top 10 for our clusters by EOQ

| Site | Current Est. Position | Target | Check Date |
|------|----------------------|--------|------------|
| apifeny-ai.vercel.app | Unknown (no GA4) | Top 10 for "AI tools directory" | TBD |
| ev-charging-asia.vercel.app | Unknown | Top 10 for "EV charging [country]" | TBD |
| luxury-family-travel.vercel.app | Unknown | Top 10 for "luxury family travel [region]" | TBD |
| titan-app (not deployed) | N/A | Rankable before launch | N/A |

**BLOCKER:** No analytics → can't measure ranking progress. Need GA4 or similar.

### What I CAN do without ranking data:
- [x] Structured data (JSON-LD) on all pages — DONE for Titan, AI Dir, EV, Travel
- [x] Sitemaps comprehensive — DONE
- [ ] Build backlinks (outreach pending)
- [ ] Content velocity (blog posts on schedule)
- [ ] PageSpeed/Lighthouse optimization

---

## 💰 REVENUE MILESTONES

### Milestone 1: $100 MRR
**Path:** Affiliate revenue from travel sites + AI Directory
**Status:** 🔴 BLOCKED — No affiliate accounts active (need env vars)
**ETA:** Unknown (CEO action required)

### Milestone 2: $500 MRR
**Path:** Affiliates + Titan token sales + PDF guides
**Status:** 🔴 BLOCKED at M1

### Milestone 3: $2,000 MRR
**Path:** Add trading bot revenue share / managed signals
**Status:** 🔴 BLOCKED (ICT strategy in research phase, not deployed)

### Milestone 4: $10,000 MRR (Seed-Proof Revenue)
**Status:** 🔴 Requires stacking all channels

### Trading Bot Balance (sub-track)
- Last check: ~$1,100-$1,200 range (stable, not growing)
- Mode: LIVE with small size
- WR: 69% historical, 16 trades
- Status: Maintenance mode — running. Not a growth channel yet.

---

## ✅ DAILY CHECK PROTOCOL

Every cron run and every session start:
1. **Read this file.** Check milestone progress.
2. **Ask: does my next action move any milestone forward?** If no → don't do it.
3. **If blocked, say why clearly.** Don't do alternative work that doesn't push a milestone.
4. **Log progress/blockers to HEARTBEAT.md** with current milestone status.

### Approvable Actions (move milestones):
- Anything that can ship TODAY and potentially rank or earn
- Blog posts (if deployed)
- Backlink outreach
- Env var requests (unblock revenue)
- Trading strategy deployment (if backtest-validated)

### Non-Approvable Actions (skip unless milestone-gated):
- Page restructures of already-working pages
- New page types without ranking data proving the current pages work
- Feature additions to non-deployed sites
- Cosmetic improvements

---

## 🔑 BLOCKER LOG

| Block | Severity | Owner | First Noted | Status |
|-------|----------|-------|-------------|--------|
| Vercel CLI unauthenticated | HIGH | CEO | 2026-06-01 | 🔴 Unchanged |
| Stripe keys missing | HIGH | CEO | 2026-06-01 | 🔴 Unchanged |
| Affiliate env vars missing | HIGH | CEO | 2026-06-01 | 🔴 Unchanged |
| No analytics (GA4) | HIGH | CEO | 2026-06-01 | 🔴 Unchanged |
| Git PAT expired for some repos | MEDIUM | CEO | 2026-06-11 | 🔴 Unchanged |

---

## 📅 WEEKLY REVIEW

**Next review due:** 2026-06-15 (Mon)
**Items to review:**
1. Has any ranking data become available?
2. Any revenue from any channel?
3. Has any blocker been resolved?
4. Are we building toward milestones or not?

---

*Created 2026-06-12 per CEO directive. Update after every significant milestone change.*
