# LifeOS — Next Steps Activation Plan
**Date**: 2026-06-05
**Status**: READY FOR CEO REVIEW

## Current State
- Codebase: 13 plugins scaffolded, Excalidraw integrated, personality engine, auth UI
- `.env.local` has Supabase keys → BUT `yrvnkepndpjmlrewecro.supabase.co` DNS does not resolve
- No schema applied to Supabase (tables need to be created)
- Vercel project may or may not have env vars set

## Blocker #1: Supabase DNS / Project Health
**The Supabase project URL `yrvnkepndpjmlrewecro` doesn't resolve from the build environment.**

### Action needed (CEO, ~5 min):
1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) 
2. Check if project `yrvnkepndpjmlrewecro` is active/paused/deleted
3. If paused: unpause (can take 2-5 min)
4. If deleted: create a new Supabase project (free tier is fine, spin up in ~30 sec)
5. Copy new URL and anon key → set as:
   - Vercel env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `.env.local` in the project root
6. Run the SQL from `supabase-schema.sql` in the new project's SQL Editor

### If Supabase is healthy but DNS is blocked:
- Try `https://yrvnkepndpjmlrewecro.functions.supabase.co` (functions subdomain)
- Or use the Supabase CLI: `supabase link --project-ref yrvnkepndpjmlrewecro`
- Actually most likely: just re-verify from supabase dashboard

## Blocker #2: Schema Not Applied
- `supabase-schema.sql` has all tables ready: `lifeos_entries`, `lifeos_chats`, `lifeos_messages`, `lifeos_canvas_items`, `lifeos_personality_events`
- After Supabase is live → run this SQL in Supabase dashboard SQL editor
- Then `npm run build` — local persistence will upgrade to Supabase persistence automatically

## Blocker #3: Vercel Env Vars
- Needs: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Also needs a production domain (optional — vercel.app works fine for MVP)
- If CEO prefers: I can handle this once Supabase keys are set

## Ready-to-Execute Sprint Plan (if CEO approves)

### Sprint 1: "Make It Live" (~2 hours)
- [ ] CEO: Verify/fix Supabase project → share new keys
- [ ] Agent: Apply schema SQL, update .env.local, deploy to Vercel
- [ ] Agent: Smoke test — auth flow, plugin session creation, canvas save/load
- [ ] Result: LifeOS running live with Supabase persistence

### Sprint 2: "AI Conversation Engine" (~4 hours)
- [ ] Wire plugin-registry.ts phase router → actual LLM calls (DeepSeek)
- [ ] Build phase-by-phase conversation flow for Travel OS (pilot plugin)
- [ ] Connect personality profile to LLM system prompt
- [ ] Test: "Plan a trip to Japan" — AI should lead conversation

### Sprint 3: "Canvas + Cross-Category" (~4 hours)
- [ ] Excalidraw canvas sections auto-populate from AI conversation
- [ ] Cross-category awareness (Finance OS knows about Travel plans)
- [ ] Ultraplan feature (single-blocker detection)
- [ ] Multi-plugin testing

## Immediate Wins to Unblock
| # | Task | Who | Time | Impact |
|---|------|-----|------|--------|
| 1 | Check Supabase project or create new | CEO | 5 min | 🔑 unlocks everything |
| 2 | Set Vercel env vars | CEO | 2 min | enables live deploy |
| 3 | Apply schema SQL | Agent | 1 min | after keys work |
| 4 | Deploy & smoke test | Agent | 5 min | after schema |
| 5 | Wire conversation engine | Agent | 4 hrs | the real product |

## Notes
- The app builds and runs locally with in-memory fallback (no Supabase needed for dev)
- 13 plugin directories exist with individual conversation flows
- Excalidraw canvas renders but doesn't persist to backend yet
- Personality profile screen is built but uses static data
- Auth UI (login/signup/reset) is complete with OAuth placeholders

---

*Ready when CEO is. This doc covers everything needed to move LifeOS from "scaffolded" to "live."*
