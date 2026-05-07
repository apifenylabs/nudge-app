# Overnight Strategy — May 5 → 6 (After Chris Asleep)

## Current State
- OmniMind MVP built, tested, committed. All 3 phases done.
- Both directory-beast + nudge-beast: 5D uptime, 0 restarts ✅
- 4 static sites still live (verified earlier tonight)
- Nudge/Directory blocked on Supabase service_role key + DEEPSEEK_API_KEY

## What to Build Overnight

### Priority 1: OmniMind Production Readiness (Polish + Deploy Prep)
- [x] backend/tests/ — 24 pytest tests passing (fixed SQLite thread issue)
- [x] README.md with full docs (setup, API reference, plugin install, architecture)
- [ ] GitHub push setup (check if gh CLI is available, check SSH keys) — still blocked
- [x] Verify frontend `npm run build` produces clean production build (fixed TS error)
- [x] Dockerfile for backend (multi-stage, minimal, CPU-only)
- [x] requirements.txt, .dockerignore, Dockerfile
- [x] Fixed empty text validation (min_length=1)
- [x] Fixed rate limiter for tests (reset between tests)
- [x] Qdrant collection at module level for TestClient compat

### Priority 2: OmniMind Phase 2 Prep (Architecture Docs Only — No Code)
- [x] Written: docs/phase2-architecture.md (full spec: AES-256-GCM, Scrypt KDF, JWT auth, DB migration, 15hr estimate)

### Priority 3: OpenClaw Plugin on ClawHub
- [ ] ~~Check if the plugin can be published to ClawHub~~ (needs ClawHub account — defer)
- [x] Write README.md for the plugin

### Priority 4: Check Beast Status
- Hourly: pm2 list, curl port 3000 & 3001
- If either drops: restart via pm2 resurrect

## Blockers
- Supabase service_role key (need from Chris)
- DEEPSEEK_API_KEY (need from Chris)
- GitHub personal access token (for remote push)
- Domain registration (luxury-hotels-asia.com)

## Budget Tight
- Default: Ollama llama3.2 (free, local)
- Only DeepSeek for: architecture design, security review, or hard debugging
- Phase 2 architecture review = maybe $0.02 DeepSeek (worth it for security)
