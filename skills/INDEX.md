# Skill Catalog — Social Beast

## Data Source Skills

| Skill | File | Purpose |
|-------|------|---------|
| source-directory-beast | `social-beast/source-directory-beast.skill.md` | Pull destinations from Directory Beast JSON |
| source-build-in-public | `social-beast/source-build-in-public.skill.md` | Generate build-in-public milestone posts |

## Transform Skills (8 Formats)

| Skill | File | Format | Platform |
|-------|------|--------|----------|
| transform-short-hook | `social-beast/transform-short-hook.skill.md` | 1-2 sentence tweet | Twitter/X |
| transform-story-thread | `social-beast/transform-story-thread.skill.md` | 3-5 tweet thread | Twitter/X |
| transform-telegram-deep-dive | `social-beast/transform-telegram-deep-dive.skill.md` | Rich text deep dive | Telegram |
| transform-linkedin-insight | `social-beast/transform-linkedin-insight.skill.md` | Professional 2-3 paragraph post | LinkedIn |
| transform-carousel-card | `social-beast/transform-carousel-card.skill.md` | Instagram carousel text | Instagram |
| transform-tiktok-script | `social-beast/transform-tiktok-script.skill.md` | 30-60s script outline | TikTok |
| transform-build-in-public | `social-beast/transform-build-in-public.skill.md` | Behind-the-scenes narrative | Twitter/Telegram |
| transform-newsletter-blurb | `social-beast/transform-newsletter-blurb.skill.md` | 100-word excerpt | Email |

## Publish Skills

| Skill | File | Platform |
|-------|------|----------|
| publish-twitter | `social-beast/publish-twitter.skill.md` | Twitter/X API v2 |
| publish-telegram | `social-beast/publish-telegram.skill.md` | Telegram Bot API |
| publish-linkedin | `social-beast/publish-linkedin.skill.md` | LinkedIn REST API |

## Orchestration Skills

| Skill | File | Purpose |
|-------|------|---------|
| approval-telegram | `social-beast/approval-telegram.skill.md` | Send batch + collect responses via Telegram |
| daily-pipeline | `social-beast/daily-pipeline.skill.md` | Main orchestrator: source → transform → approval → publish |

## Supporting Files

| File | Purpose |
|------|---------|
| `social-beast/schemas.md` | Data interfaces (DataSource, ContentItem, ApprovalQueue, PublishLog) |
| `social-beast/approval-handler.md` | Telegram approval button workflow documentation |
| `social-beast/lib.js` | Shared utilities (contentHash, todayStr, read/write JSON, etc.) |
| `social-beast/daily-pipeline.sh` | Cron-ready shell runner for daily execution |
| `social-beast/daily-pipeline.js` | Main Node.js orchestrator implementation |

## Test Files

| File | Tests |
|------|-------|
| `social-beast/test/test-lib.js` | Core library utilities |
| `social-beast/test/test-source-directory-beast.js` | Directory Beast data source |
| `social-beast/test/test-transforms.js` | All 8 transform skills |
| `social-beast/test/test-publish.js` | All 3 publish skills (mock mode) |
| `social-beast/test/test-pipeline.js` | Full pipeline integration test |

---

*Last updated: 2026-04-27*
