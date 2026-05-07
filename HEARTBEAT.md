# HEARTBEAT.md - Current State

## 🟢 Both Orchestras Online

- **directory-beast** (id 23, PID 2719350) — port 3000, just started, 0 restarts
- **nudge-beast** (id 1, PID 2715160) — port 3001, 5m up, 1 restart

## Incident Log — Apr 28-29

**19:10 HK** — Both processes dropped (empty PM2 table). `pm2 resurrect` recovered. New PIDs: 2627961/2627962.

**00:40 HK (just now)** — Directory Beast crashed in EADDRINUSE loop (34 restarts). Port 3000 held by orphan process. Nudge Beast restarted once (PID 2715160, 1 restart).

**Recovery steps taken:**
1. `npm run build` to restore missing `.next` artifacts
2. `fuser -k 3000/tcp` to kill orphan port holder
3. Cleaned up 16 duplicate PM2 processes (created by `-i 0` cluster flag)
4. Restarted clean single instance via `pm2 start "npm start" --name "directory-beast"`

**Root cause:** WSL/system-level process drops still happening sporadically (~every 4-24h). Recovery working.

## 🔄 AUTO-WORK MODE
When idle, this session runs autonomous work. Do NOT wait for Chris.

- If Chris hasn't messaged in 15+ min, check overnight-progress.md and continue work
- If sub-agents are asleep, wake them up
- Priority: Deploy → Build → Improve → Create
- Track all progress in overnight-progress.md

## Overnight (May 5→6) Completed ✅
- [x] 24/24 tests passing (fixed SQLite thread issue)
- [x] README, Dockerfile, production artifacts
- [x] Phase 2 architecture doc written
- [x] Plugin README written
- [x] Frontend builds cleanly
- [x] Both beasts: 5D uptime, zero restarts

## Awaiting Chris
- Supabase service_role key (for both beasts + OmniMind Phase 2)
- DEEPSEEK_API_KEY
- GitHub PAT for remote push
- Domain registration
