# DEPLOY STATUS

## Current

- **URL:** https://social-beast-two.vercel.app
- **Status:** ✅ Live (200 OK, 6 pages working)
- **Framework:** Next.js 14 (App Router)
- **Storage:** localStorage
- **Deploy method:** CLI (`npx vercel --prod`)

## Git Repository

- **Remote:** Not yet connected to GitHub
- **Local:** Git initialized at project root
- **Next step:** Create repo at apifenylabs/social-beast, push, connect Vercel

## To Set Up Git Integration

```bash
# 1. Create GitHub repo manually at github.com/new
#    Name: social-beast
#    Private or Public as you prefer
#    Do NOT initialize with README (we have one)

# 2. Push existing code
cd /home/captain/.openclaw/workspace/_projects/social-beast
git remote add origin https://github.com/apifenylabs/social-beast.git
git push -u origin main

# 3. Connect to Vercel
#    Vercel Dashboard → Add New → Project → Import social-beast
#    Vercel auto-detects Next.js — framework preset "Next.js"
#    Leave all defaults, click Deploy
```

## Recent Changes (May 20)

- ✅ **SB-1:** Repo initialized, docs updated for git setup
- ✅ **SB-2:** Calendar page enhanced with content buckets, weekly schedule, template viewer, Generate Week button
- ✅ **SB-3:** 7 content buckets created with 3 templates each (21 templates total)
- New files: `lib/content-buckets.ts`, `lib/calendar-generator.ts`
- Enhanced: `app/calendar/page.tsx`, `README.md`, `.gitignore`

## Pages

| Route | Status | Description |
|-------|--------|-------------|
| `/` | ✅ | Dashboard with stats, recent posts, platform status |
| `/calendar` | ✅ | Content calendar with buckets + weekly schedule + Generate Week |
| `/posts` | ✅ | All posts with search, filter, bulk archive/delete |
| `/create` | ✅ | Post composer with platform selector, schedule, affiliates |
| `/analytics` | ✅ | Engagement analytics with charts |
| `/settings` | ✅ | Platform connections, brand voice, preferences |
| `/community` | ✅ | Discussion board |
| `/build-log` | ✅ | Build timeline / changelog |
