# SocialOS Deployment Guide

Last updated: 2026-04-15

## Current status

SocialOS is **not yet an MVP app**.

- ✅ Landing page live at https://socialos-landing.vercel.app/
- ✅ Validation dashboard and tracker (static HTML/JS)
- ❌ No backend, auth, or automation engine
- ❌ No user accounts or paid features

## What we have

1. **Landing page** – email capture, waitlist signup
2. **Validation dashboard** – weighted scoring, local storage, export
3. **Validation plan** – 7‑day validation steps

## What we don’t have

- SocialOS product MVP
- User authentication
- Content automation engine
- Scheduling, posting, analytics
- Billing or subscriptions

## Deployment options

### Option A: Keep landing page only
The current live URL is fine for validation. No need to redeploy.

### Option B: Deploy validation dashboard as a static site
```bash
mkdir -p ~/socialos-validation-deploy
cp /home/captain/.openclaw/workspace/socialos-validation-dashboard.html ~/socialos-validation-deploy/index.html
cp /home/captain/.openclaw/workspace/socialos-validation-tracker.js ~/socialos-validation-deploy/

cd ~/socialos-validation-deploy
git init
git add .
git commit -m "SocialOS validation dashboard"
git branch -M main
git remote add origin git@github.com:YOUR_GITHUB_USERNAME/socialos-validation.git
git push -u origin main

npm install -g vercel
vercel
vercel --prod
```

### Option C: Build SocialOS MVP (future)
This requires a full app stack (Next.js, Supabase, automation APIs). Not ready yet.

## Next steps

1. **Continue validation** – use the landing page and dashboard to gather signals.
2. **Decide MVP scope** – what is the smallest useful automation product?
3. **Build MVP** – after validation signals are strong.
4. **Deploy MVP** – as a separate app from the landing page.

---

**Rule:** Do not call SocialOS an MVP until there is a working product with backend and user accounts.
