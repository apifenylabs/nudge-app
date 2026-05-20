# OmniMind Distribution Day — Phase 1 Status Report

**Cron execution time:** 2026-05-19 19:54 HKT (13:54 UTC)

---

## Executive Summary

**0/5 actions completed.** Cannot execute without credentials. Detailed breakdown below.

The cron task jumped straight to Phase 1 (community distribution) while the existing distribution strategy clearly defines Phase 0 (foundation) as a prerequisite. The strategy was designed to stagger these steps over weeks because each requires account creation, API credential setup, and reputation building.

---

## Action-by-Action Status

### 1. SEO Blog Post → dev.to ❌ BLOCKED

**Content:** ✅ Written and saved to workspace at:
`_projects/social-beast/generated-content/omnimind-launch/blog/why-i-built-sovereign-memory-control-plane.md`

**Blockers:**
- No dev.to account exists for apifenylabs
- No dev.to API key configured (would need to create account → go to Settings → Extensions → API Key)
- dev.to API is straightforward (POST `/api/articles` with `api-key` header) once the key exists

**What's needed:** Chris creates a dev.to account (or uses existing) and provides the API key. Or manually publishes via dev.to editor.

### 2. r/selfhosted Post ❌ BLOCKED

**Content:** ✅ Written and saved to workspace at:
`_projects/social-beast/generated-content/omnimind-launch/reddit/r-selfhosted.txt`

**Blockers:**
- No Reddit account with sufficient karma (most subreddits require 10-100+ karma, r/selfhosted requires ~50+)
- No Reddit API credentials (client_id, client_secret, refresh_token)
- Reddit API requires OAuth2 app registration

**What's needed:** Chris posts manually, or creates a Reddit API app and provides credentials. Building Karma before posting is recommended by the strategy — r/selfhosted detects and flags brand-new accounts posting product links.

### 3. OpenClaw Plugins Directory Submission ❌ BLOCKED

**Content:** ✅ Plugin already installed locally and loaded as `global:omnimind` (v0.3.0). Plugin metadata exists (`openclaw.plugin.json` with id, name, description, configSchema).

**Blockers:**
- Requires `clawhub package publish` which needs ClawHub authentication
- The GitHub repo (apifenylabs/omni-mind) is public but shows v0.1.0 MVP status, not the v0.3.0 that's running locally
- npm package `@openclaw/omni-mind` is NOT published (404 on npm registry)
- Local plugin install path (`openclaw plugins install ./`) works but isn't discoverable
- **Additional blocker:** GitHub PAT (`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`) is expired — can't push updates to the repo

**What's needed:**
1. New GitHub PAT from Chris
2. Push v0.3.0 source to `apifenylabs/omni-mind` repo
3. Publish to npm: `npm publish` (needs npm login credentials for @openclaw scope — this requires OpenClaw org access)
4. Publish to ClawHub: `clawhub package publish apifenylabs/omni-mind`

### 4. r/openclaw Post ❌ BLOCKED

**Content:** ✅ Written and saved to workspace at:
`_projects/social-beast/generated-content/omnimind-launch/reddit/r-openclaw.txt`

**Blockers:** Same as #2 — same Reddit account needed, same API credentials.

### 5. Twitter/X Launch Thread ❌ BLOCKED

**Content:** ✅ Written and saved to workspace at:
`_projects/social-beast/generated-content/omnimind-launch/twitter/launch-thread.txt`

**Blockers:**
- No Twitter/X account for apifenylabs/omnimind
- No Twitter API v2 credentials (API key, API secret, access token, access secret)
- Twitter API now has paid tiers for write access (Free tier is read-only)
- The `@Omnimindaigo` account exists but is owned by a different project (Aigorhythm)

**What's needed:**
1. Chris creates an @apifenylabs or @omnimind_openclaw account
2. X Premium ($8/mo) or Basic API ($100/mo) for write access
3. OAuth 1.0a credentials configured

---

## What Actually Got Accomplished

| Item | Status |
|------|--------|
| SEO blog post drafted | ✅ Written, saved to workspace |
| r/selfhosted post drafted | ✅ Written, saved to workspace |
| r/openclaw post drafted | ✅ Existed from previous session |
| Twitter thread drafted | ✅ Existed from previous session |
| Distribution strategy reviewed | ✅ Full strategy in workspace |
| All content collated & audit-ready | ✅ 11 files, organized |

---

## Recommended Path Forward

Per the distribution strategy, Phase 0 must complete before Phase 1:

1. **Chris creates accounts** (dev.to, Reddit, Twitter/X) and provides API credentials
2. **Chris generates new GitHub PAT** (current one expired) — needed for pushing v0.3.0 code
3. **npm login** — publish @openclaw/omni-mind to npm registry
4. **Phase 0 blog post** goes live first (SEO foundation)
5. **Then Phase 1** staggered Reddit + Twitter

The cron should be updated to pause Phase 1 until Chris provides credentials, or changed to a Chris-notification-only task.

---

## Content Files Ready for Publishing

All files located under:
`_projects/social-beast/generated-content/omnimind-launch/`

```
├── blog/
│   └── why-i-built-sovereign-memory-control-plane.md    ← SEO blog post
├── reddit/
│   ├── r-selfhosted.txt                                  ← Problem-first angle
│   ├── r-openclaw.txt                                    ← Direct community post
│   └── r-ai-agents.txt                                   ← Architecture angle (Phase 1b)
├── twitter/
│   ├── launch-thread.txt                                 ← 10-tweet thread
│   └── follow-up.txt                                     ← Day-after thread
├── linkedin/
│   └── launch-post.txt                                   ← Longer form
├── product-hunt/
│   ├── listing.txt                                       ← PH copy
│   └── comment-threads.txt                               ← Maker comments
├── distribution-strategy.md                              ← Full 4-phase plan
├── pilot-test.md                                         ← 7-day dogfood protocol
└── RESEARCH-NOTES.md                                     ← Competitive research
```
