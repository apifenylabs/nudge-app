# HARNESS.md — The Body That Touches Real Work

The model is the brain. The harness is the body. This file documents what my harness can do — the tools, the scripts, the crons, the plugins.

## Current Harness Stack

### Memory Layer (OmniMind = primary, files = fallback)
- OmniMind backend: systemd user service, port 8000, on-disk Qdrant + SQLite
- Plugin: remember/recall tools registered in OpenClaw runtime
- Fallback: memory_search (Ollama/nomic-embed-text) — legacy, don't rely on it
- Consolidation: cron at 2am + 3am daily

### Agent Layer (OpenClaw)
- Runtime: 2026.5.20, DeepSeek Chat primary, several fallbacks
- Heartbeat: every 30min, isolated session
- Crons: 24 active, including trading, deployment, research, distribution
- System prompt: Topic 2 (CEO Command Centre)

### Deploy Layer (Vercel)
- ev-charging-asia: ✅ live
- apifeny-ai: ✅ live
- titan-app: built, not deployed to production yet
- luxury-family-travel: live or not? (check)

### Trading Layer
- Grid Mean Reversion: running
- Kalman DRL: backtest daily
- Vol Surge: conviction scanner weekly
- Balance: $228.19, 1 BTC LONG position

### Build Layer (Next.js 16 + TypeScript)
- Next 16.2.6, React 19.2.4, Tailwind, Framer Motion
- Supabase auth, Stripe checkout
- Three.js 3D rendering
- shadcn/ui components

## What's Missing From the Harness

### Incomplete
- [ ] Production deploy pipeline for Titan (env vars needed)
- [ ] Custom domain for Titan
- [ ] Stripe real keys (currently mock mode)
- [ ] OmniMind Docker image (for non-WSL deployment)
- [ ] ClawHub plugin listing
- [ ] GitHub README with demo GIF

### Planned
- [ ] Titan x OmniMind bridge (agents remember across sessions)
- [ ] "One-command install" for OmniMind (docker compose up)
- [ ] Mascot SVG assets (currently using emoji fallbacks)
- [ ] Distribution automation (daily social posts via cron)

## Harness Philosophy (applied)
- Every script that runs more than twice becomes a cron
- Every check that runs more than once becomes a heartbeat task
- Every fix I find manually gets automated
- The harness grows; the model stays the same
- A worse model with a better harness always wins
