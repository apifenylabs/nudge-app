# tasks.md - Shared Task Coordination System

**⚠️ IMPORTANT:** All agents MUST read this file before starting any new task.
Update this file when you start or finish a task.
Only one agent per task.

## Current Active Tasks

### [HIGH] Directory Beast — Fix Client Exception
- **Task**: Fix "Application error: client-side exception" on family-travel-directory.vercel.app
- **Status**: ✅ **FIXED & DEPLOYED** (2026-04-28 14:46 HKT)
- **Agent**: Captain (CEO Agent)
- **Root cause 1**: `require('@supabase/ssr')` called in browser from `lib/supabase-browser.ts`. `require` doesn't exist in browser.
- **Root cause 2**: `app/search/page.tsx` + `_client.tsx` had type mismatches with Phase 1 `DestinationCard` props (was passing `destination={d}` but component takes individual props). Build errored silently.
- **Root cause 3**: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` NOT set on Vercel project — only in `.env.local`. The noop proxy returned `{ data: null }` which crashed on destructuring `{ data: { subscription } }`.
- **Fixes**: (1) Changed `@supabase/ssr` to `@supabase/supabase-js` in browser lib. (2) Fixed `search/_client.tsx` props to match DestinationCard interface. (3) Added both env vars to Vercel project. (4) Fixed noop proxy to return `{ data: {} }` instead of `{ data: null }`.
- **Prevention**: (1) No `@supabase/ssr` in browser code. (2) All env vars must be set on Vercel before deploy. (3) Mock proxy must return valid destructureable shapes.

### [HIGH] Directory Beast — Phase 2 (Search + Map + Scoring)
- **Task**: Implement advanced search with filters, map view, destination scoring algorithm
- **Status**: 🔄 **READY TO START** — PRD exists at `knowledge/research/directory-beast-10-10-PRD.md`
- **Blocked on**: CAPTAIN needs to spawn CEO sub-agent to plan and delegate

### [HIGH] Social Beast — Wire Up Credentials
- **Task**: Fill `credentials.json` with real Telegram bot token, Twitter/X API keys, LinkedIn API keys
- **Status**: ⛔ **BLOCKED** — Needs Chris to provide API keys or Captain to generate them
- **39 files, 2,481 lines, all tests passing**
- **Cron set**: `0 7 * * * daily-pipeline.sh` (currently won't run without credentials)

### [MEDIUM] Nudge — Monitor & Improve
- **Status**: ✅ **Deployed** at https://nudge-sigma-liart.vercel.app
- **Agent**: Captain
- **Next**: Track usage, fix any issues

### [MEDIUM] GeneralScan — Phase 1 Done
- **Status**: ✅ **Complete** — 12/12 tests, build passes

### [MEDIUM] ScanWise — Phase 1 Done
- **Status**: ✅ **Complete** — Clean build at workspace/scanwise/

### [LOW] EV Charging Asia
- **Status**: 📄 **PRD written** (1,224 lines) — awaiting Directory Beast 10/10 completion
- **Blocked on**: Directory Beast Phase 2+ completion

### [LOW] AppFactory Beast
- **Status**: ❌ **Not started**

## Infrastructure Status

### Vercel Projects
- ✅ family-travel-directory — Live at family-travel-directory.vercel.app
- ✅ nudge — Live at nudge-sigma-liart.vercel.app
- ✅ social-beast-components — Created
- ✅ kidscan-api — Created
- ❌ habit-tracker — Not created
- ❌ affiliate-tracking — Not created

### Supabase Database
- ✅ Connected: URL + ANON key in .env.local
- ✅ SQL schema for auth ready: supabase/auth-schema.sql
- ✅ SQL schema for reviews ready: supabase/reviews-schema.sql
- ❌ SQL not yet run in Supabase dashboard

## Next Priority Actions (for CAPTAIN to execute autonomously)

1. **Run Supabase SQL** to create auth + reviews tables
2. **Start Directory Beast Phase 2** — spawn CEO sub-agent to plan and delegate
3. **Monitor DB site** — verify client error is gone after CDN purge
4. **Push Social Beast to git** once credentials are provided
5. **Commit all changes to git**

## Urgent Fix Notes
- `lib/supabase-browser.ts`: NEVER use `@supabase/ssr`. Must use `@supabase/supabase-js` only.
- `@supabase/ssr` breaks in browser because it uses ESM `require()` pattern.
- Vercel CDN may serve old chunks for up to 2-3 minutes after deploy. Hard refresh or incognito needed.

---
*Last Updated: 2026-04-28 14:25 HKT by Captain*
