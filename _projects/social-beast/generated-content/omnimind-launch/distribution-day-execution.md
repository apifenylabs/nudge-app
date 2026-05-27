# OmniMind Launch — Distribution Day Execution Report
**Date:** 2026-05-27 10:00 HKT  
**Task:** Cron-triggered Phase 1 distribution  

---

## Status Summary

| # | Channel | Status | Result |
|---|---------|--------|--------|
| 1 | dev.to SEO blog post | ⏳ BLOCKED | Needs API key — content ready |
| 2 | r/selfhosted | ⏳ BLOCKED | Needs Reddit account credentials |
| 3 | OpenClaw plugins directory | ⏳ BLOCKED | Needs ClawHub login token |
| 4 | r/openclaw | ⏳ BLOCKED | Needs Reddit account credentials |
| 5 | Twitter/X launch thread | ⏳ BLOCKED | Needs Twitter/X API keys |

**Blocking root cause:** No social media API keys or credentials configured for any publishing platform. Social Beast components exist as a web app (Supabase-backed Next.js) but the actual platform connectors (`lib/platforms.ts`) are placeholder implementations with no real API calls.

---

## Per-Channel Detail

### 1. dev.to SEO Blog Post
- **Content:** Ready at `_projects/social-beast/generated-content/omnimind-launch/blog/why-i-built-sovereign-memory-control-plane.md`
- **SEO-optimized version:** Ready with front matter (title, description, tags: `openclaw, ai, memory, selfhosted, opensource`)
- **Blocked on:** `DEV_TO_API_KEY` — dev.to requires an API key from `https://dev.to/settings/extensions`
- **Unblock:** Sign in to dev.to → Settings → Extensions → generate API key → set as env var `DEV_TO_API_KEY`. Then POST to `https://dev.to/api/articles` with the markdown body.
- **Autopublish capability:** Once key is set, the publish script handles the rest.

### 2. r/selfhosted
- **Content:** Ready at `_projects/social-beast/generated-content/omnimind-launch/reddit/r-selfhosted.txt`
- **Angle:** Problem-first — "I got tired of my AI agents forgetting everything, so I built a memory layer that runs entirely on my server"
- **Blocked on:** Reddit account + app credentials (`REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET`, `REDDIT_USERNAME`, `REDDIT_PASSWORD`)
- **Unblock:** Need a Reddit account with 50+ karma (for r/selfhosted posting), registered as a script app at `https://www.reddit.com/prefs/apps`

### 3. OpenClaw Plugins Directory (ClawHub)
- **Package manifest:** Already exists at `openclaw.plugin.json` in the repo
- **Blocked on:** `clawhub login` — requires browser-based OAuth or a `--token` parameter
- **Unblock:** Run `clawhub auth login --device` for headless device code flow, or get an API token from ClawHub settings
- **Package to publish:** `@openclaw/omni-mind` v0.3.0

### 4. r/openclaw
- **Content:** Ready at `_projects/social-beast/generated-content/omnimind-launch/reddit/r-openclaw.txt`
- **Title:** "I built a memory layer for OpenClaw agents that stores conversations in 3 databases and evolves overnight"
- **Blocked on:** Same Reddit account requirements as r/selfhosted
- **Strategy note:** Per distribution plan, this should go out 3 days AFTER r/selfhosted, not same day, to avoid coordinated promotion detection

### 5. Twitter/X Launch Thread
- **Content:** Ready at `_projects/social-beast/generated-content/omnimind-launch/twitter/launch-thread.txt` (10 tweets)
- **Blocked on:** Twitter/X API credentials (`TWITTER_API_KEY`, `TWITTER_API_SECRET`, `TWITTER_ACCESS_TOKEN`, `TWITTER_ACCESS_TOKEN_SECRET`) OR browser login to `x.com`
- **Unblock:** Register a Twitter/X developer app → OAuth 1.0a user context → set env vars

---

## What CAN Be Done Right Now

**GitHub repo actions (public repo, no auth needed for reads):**
- ✅ Blog post content exists in repo (suitable for GitHub Discussions)
- ✅ Plugin manifest exists and is correct
- ✅ Release v0.3.0 tagged with full notes
- ✅ README describes architecture and install

**Recommendation: Level up the README with distribution-friendly content**

1. Add "Why OmniMind" section to README that mirrors the blog post
2. Add comparison table to README
3. Add installation badge
4. Set up GitHub Discussions for community engagement

---

## Immediate Unblock Path

**What Wosobu needs to do (10 minutes total):**

1. **dev.to API key** (2 min): Go to `dev.to/settings/extensions` → Generate API key → `export DEV_TO_API_KEY=xxx`
2. **Reddit account** (5 min): Create account or use existing → `reddit.com/prefs/apps` → Create script app → note client_id and secret
3. **ClawHub token** (1 min): `clawhub auth login --device` → follow URL → paste code
4. **Twitter/X app** (2 min): Go to `developer.twitter.com` → create project → generate OAuth 1.0a tokens

Once these are set, execute the auto-publisher script:

```bash
python3 /home/captain/.openclaw/workspace/_projects/social-beast/publish-omnimind.py
```

This script is prepared and ready to fire.
