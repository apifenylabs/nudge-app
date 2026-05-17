# Idea Repository — Master Index

> LOCKED May 17 2026.
> Every idea we've ever brainstormed goes here for future reference.
> Searchable, scored, and categorized. Never lose an idea again.

---

## Repository Structure

```
idea-repository/
├── README.md            ← This file — master index and search guide
├── building-now/        ← Ideas already in active development (links to project logs)
├── active/              ← Vetted ideas in backlog (pass 4/5 IdeaBrowser criteria)
├── scrapped/            ← Ideas that failed assessment (with reason, for posterity)
```

## Search by Tag

| Tag | Category |
|-----|----------|
| `[greg]` | Greg Isenberg's 36 opportunities |
| `[ai-saas]` | AI SaaS / API products |
| `[directory]` | Niche directory sites |
| `[content]` | Content / playbook / PDF products |
| `[marketplace]` | Multi-sided marketplaces |
| `[hardware]` | Physical products (usually scrapped) |
| `[social]` | Social / community apps |
| `[enterprise]` | B2B / Enterprise (usually deferred) |
| `[nudge-adj]` | Ideas that extend Nudge |
| `[apifeny-adj]` | Ideas that extend Apifeny AI |
| `[omnimind-adj]` | Ideas that extend OmniMind |
| `[olympus]` | Ideas generated from Olympus scans |
| `[raw]` | Unassessed raw ideas (captured but not yet scored) |

## Search by Status

| Status | What It Means | Location |
|--------|---------------|----------|
| 🟢 BUILDING | Active development in current sprint | `building-now/` + linked project log |
| 🟡 BACKLOG | Passed IdeaBrowser, waiting for entry | `active/` + `idea-backlog.md` |
| 🔴 SCRAPPED | Failed assessment or wrong model | `scrapped/` + why |
| ⚪ NOT-ASSESSED | Raw capture, not yet scored | `scrapped/raw-ideas.md` |

## Quick Stats

- **Building now:** 7 ideas (see below)
- **Backlog:** 8 ideas
- **Scrapped:** 21 ideas
- **Total assessed:** 36 ideas (Greg Isenberg batch)
- **Last review:** 2026-05-17
- **Next review:** 2026-05-31 (biweekly cadence)

## Current Sprint Status

Building Now → links to their project logs:

| Idea | Project Log | Sprint Priority |
|------|:-----------:|:---------------:|
| 🟢 Family Task Manager (Nudge) | `~/life/nudge-log.md` | P1 |
| 🟢 AI Playbook Library (Apifeny AI) | `~/life/ai-directory-log.md` | P0 |
| 🟢 AI Product Builder (AI Cofounder) | `~/life/ai-cofounder-log.md` | Active |
| 🟢 Zero-Knowledge Memory API (OmniMind) | `~/life/omnimind-log.md` | Active |
| 🟢 Content Distribution (Social Beast) | `~/life/distribution-log.md` | P2 |
| 🟢 Family Travel Directory | `~/life/family-travel-log.md` | Waiting on affiliates |
| 🟢 EV Charging Directory | `~/life/ev-charging-log.md` | Waiting on affiliates |

## Review Cadence

- **Biweekly (every 2 weeks):** Full repository review — scan scrapped ideas for trend changes
- **Triggered review:** If a major market shift (new platform, regulation, viral trend) makes a scrapped idea viable, move it back to `active/` for assessment
- **Never rebuild from scratch:** This repository is permanent. Every idea has a record.

## File Naming Convention for New Ideas

```
idea-repository/<category>/<YYYY-MM-DD>-<slug>.md
```

Each file must contain:
- One-liner
- Source
- Assessment score (1-5)
- Why it passed/failed
- Tags
- Revisit trigger (if applicable)
