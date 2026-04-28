# GLOBAL GOVERNANCE — Vibe Coding + Skill Economy Rules

_Adopted 2026-04-27. Supersedes prior governance documents._

## 1. PRD-First — No Code Without Approved Plan

**Rule:** Every feature, every project, every fix begins with a Product Requirements Document (PRD). The Product Owner writes it. The Architect (CEO/CTO) reviews and approves it. Only then does a Coder touch a file.

**Why:** "Vibe coding" without a spec produces drift. A PRD is the single source of truth that Coders, Testers, and Reviewers all align against.

**Format:** Markdown, under `prd/<project>/<feature>.md` with:
- Vision & user story
- Functional requirements (numbered)
- Non-functional requirements (security, performance, scalability)
- Success criteria (how we know it's done)
- Out-of-scope (explicit not-doing list)

## 2. Skill Economy — Small, Reusable Skills

**Rule:** Every piece of logic lives in a standalone Skill file. Skills are:
- **Max 200-300 lines** each
- **Single purpose** (one transformation, one integration, one data source)
- **Reusable** across orchestras (Social Beast sources from Directory Beast data; Writer skill writes for any project)
- **Named clearly** like `transform-destination-to-social.v1.md`

**Skill Anatomy:**
- Goal (one sentence)
- Input contract (what data it expects)
- Steps (numbered, plain language)
- Output contract (what it produces)
- Dependencies (other skills it calls)

**Skill Catalog:** `workspace/skills/INDEX.md` — auto-updated master list.

## 3. Hard 5,000-Line Limit Per Core Service

**Rule:** No single file, no single agent script, no single orchestration pipeline exceeds **5,000 lines**. If it does, split it. Services that hit the limit:
- Spin off a new Skill
- Create a dedicated sub-agent
- Delegate to another orchestration layer

**Why:** 5,000 lines is the readability ceiling. Beyond that, maintainability drops, bugs hide, and cost-per-token goes up.

## 4. Auditor Gate — Security + Lean Code Review

**Rule:** Every deployment passes through the Auditor:

1. **Security scan:** No secrets, no injection vectors, no dependency vulns
2. **Lean code review:** Does it match the PRD? Are there bugs? Edge cases handled?
3. **Skill economy check:** Is everything a reusable Skill? No bloat?

The Auditor (SecurityAgent + Reviewer combined role) must approve before deploy. If it fails, it goes back to Coder with notes.

## 5. Deployment Pipeline (Updated)

```
PRD (ProductOwner) → APPROVE (CEO/Architect) → DEV (Coder) → UI REVIEW (UIAgent) → TEST (Tester) → REVIEW (Reviewer) → AUDITOR (SecurityAgent+Reviewer) → CHIEF EDITOR (Final) → DEPLOY
```

Every gate is blocking. No gate can be skipped.

---

# PRD-001: Social Beast — Universal Content Engine & Distribution Platform

**Status:** DRAFT v1 — 2026-04-27
**Author:** Product Owner
**Approved by:** _(CEO signature pending)_

---

## 1. Vision

Social Beast is the single reusable distribution and personal-brand engine for ALL Alpha Orchestras projects. It pulls raw data from any product (Directory Beast, Nudge, GeneralScan, future apps), transforms each item into 7+ high-engagement social formats, queues them for Chris's approval, and publishes across every relevant platform — automatically, daily, at 09:00 HKT.

One destination card from Directory Beast → 7 social posts. One Nudge feature launch → 5 announcement formats. One GeneralScan product review → 3 sharable cards. All from the same engine. All inside OpenClaw + Paperclip. Zero external SaaS.

---

## 2. User Story

> "As Chris (CEO/operator), I wake up to a Telegram message: '7 posts ready for your approval.' I tap approve/skip/edit on each. By 09:00 HKT, the approved queue drains across Twitter, Telegram, LinkedIn, and Instagram, driving traffic back to our live products. I spend 5 minutes a day. The system learns what performs and adjusts."

---

## 3. Functional Requirements

### FR-001: Universal Content Source
Social Beast must accept data from ANY project by reading a standardized `DataSource` interface. Each project exposes:
- `title` (string) — the item name
- `description` (string) — core description
- `url` (string) — link back to the project page
- `tags` (string[]) — keywords for format selection
- `type` (enum) — `destination`, `feature`, `review`, `tip`, `insight`, `milestone`
- `images` (string[]) — optional asset paths

### FR-002: 7+ Post Formats Per Item
Each source item generates at least 7 distinct formats:
| # | Format | Platform | Description |
|---|--------|----------|-------------|
| 1 | Short Hook | Twitter/X | 1-2 sentences, link, 1 hashtag |
| 2 | Story Thread | Twitter/X | 3-5 tweet thread, hook + details + CTA |
| 3 | Telegram Deep Dive | Telegram | Rich text, emoji, bullet points, link |
| 4 | LinkedIn Insight | LinkedIn | Professional angle, 2-3 paragraphs |
| 5 | Instagram Carousel Card | Instagram | Single image-ready text (image gen is Phase 2) |
| 6 | TikTok Script | TikTok | 30-60s script outline |
| 7 | Build-In-Public Post | Personal brand | "Behind the scenes" angle — how it was built, what was learned |
| 8 | Newsletter Blurb | Newsletter/Email | 100-word excerpt + link |

### FR-003: Multi-Platform Publishing
Supported platforms (Phase 1):
- **Twitter/X** — API v2 (tweet + thread)
- **Telegram** — Bot API (rich text to @yourchannel)
- **LinkedIn** — REST API (article post)

Phase 2:
- **Instagram** — Graph API (carousel + single image)
- **TikTok** — Content Posting API
- **Newsletter** — via email/Resend

### FR-004: Simple Approval Workflow
Approval happens via a single interface:
- **Primary:** Telegram bot — Chris receives a daily digest message: "📋 7 posts ready for tomorrow." Each post has inline buttons: ✅ Approve | ✏️ Edit | ❌ Skip
- **Secondary:** Agent HQ dashboard (web) for batch operations

Approved posts enter the publishing queue. Skipped posts go back to rotation. Edited posts return to the AI for revision.

### FR-005: Personal Brand / Build-In-Public Layer
Every post from format #7 (Build-In-Public) shares the story behind the product:
- "Why we built this" narratives
- Revenue milestones (real when they exist, aspirational when they don't)
- Lessons learned, tech choices, failures
- Agent orchestra behind-the-scenes

This runs on its own cron schedule (1x/day minimum) independent of product data.

### FR-006: Performance Tracking
Social Beast logs every published post:
- `platform`, `format`, `source_item`, `publish_time`, `approval_time`, `url`
- Daily/weekly aggregator in Agent HQ
- Top-performing formats get higher rotation weight
- Bottom-performing formats get revised or dropped

### FR-007: Daily Cron at 09:00 HKT
The full pipeline runs every morning:
1. 07:00 HKT — Pull items from all active project sources
2. 07:30 HKT — Generate 7+ formats per item
3. 08:00 HKT — Batch approval request to Chris
4. 08:30 HKT — Collect approvals
5. 09:00 HKT — Publish approved queue across platforms

---

## 4. Non-Functional Requirements

### NFR-001: Skill Economy
Every step in the pipeline is a reusable Skill (max 300 lines):
- `source-directory-beast.skill.md` — pulls destinations
- `source-nudge.skill.md` — pulls feature updates
- `transform-to-tweet.skill.md` — destination → short hook
- `transform-to-thread.skill.md` — destination → story thread
- `publish-twitter.skill.md` — posts to Twitter API
- `build-in-public.skill.md` — generates BIP post from milestone
- `approval-telegram.skill.md` — sends batch + collects responses

### NFR-002: Zero External Tools
Everything runs inside OpenClaw + Paperclip. No Postiz. No n8n. No Buffer. No Hootsuite. The pipeline is:
```
OpenClaw skills (transform) → Paperclip (orchestrate) → OpenClaw skills (publish)
```

### NFR-003: 5,000-Line Limit
Social Beast as a whole stays under 5,000 lines total. If it grows beyond, sub-skills spin off into independent agents.

### NFR-004: Idempotent Publishing
Every post has a unique content hash. If a post is generated twice (duplicate source item), it's skipped. No duplicates on any platform.

### NFR-005: Graceful Degradation
If a platform API is down, that platform is skipped. Other platforms publish on schedule. Chris is alerted via Telegram.

---

## 5. Success Criteria

- ✅ 7 formats generated per source item
- ✅ Approval takes Chris ≤5 minutes/day
- ✅ Posts publish on schedule at 09:00 HKT
- ✅ At least 3 platforms live (Twitter, Telegram, LinkedIn)
- ✅ No external SaaS dependencies
- ✅ Total codebase ≤5,000 lines
- ✅ Build-in-public auto-generates 1 post/day
- ✅ Performance tracking visible in Agent HQ

---

## 6. Out of Scope (Phase 1)

- ❌ AI image generation (Instagram carousels use text-only cards)
- ❌ Video rendering (TikTok scripts are text outlines only)
- ❌ User accounts or multi-tenant system
- ❌ Content idea generation (sources must provide data)
- ❌ Analytics dashboard (raw logs only in Phase 1)
- ❌ Instagram/TikTok/Newsletter publishing (Phase 2)

---

## 7. Architecture Overview

```
Paperclip (Scheduler + Ticketing)
  │
  └── OpenClaw (Skill Engine)
       │
       ├── 06:50 — cron trigger (Paperclip heartbeat)
       ├── 07:00 — source.skill (pull from all projects)
       ├── 07:30 — transform.skill (7 formats × N items)
       ├── 08:00 — approval.skill (Telegram batch)
       ├── 08:30 — approval.skill (collect responses)
       └── 09:00 — publish.skill (post to platforms)

Skills stored in: workspace/skills/social-beast/
Project sources: workspace/*/ (directory-beast, nudge, etc.)
Approval store: workspace/social-beast-approvals/
Log store: workspace/social-beast-logs/
```

---

## 8. Dependencies

- Twitter/X API v2 credentials (tokens in Paperclip secrets)
- Telegram Bot API (already configured — `@wosobu`)
- LinkedIn Developer App credentials (needs setup)
- Directory Beast data JSON (already at `public/data/destinations.json`)

---

_End of PRD. Next: CEO/Architect review and approval, then Phase 1 build (3-5 days)._
