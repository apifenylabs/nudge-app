# HARD_RULES.md — Lessons Learned & Non-Negotiables

*This file records repeated failure patterns, communication rules, and decision-making lessons so they are never re-learned from scratch.*

## Communication (CEO Command Centre)

- **Topic 2 is strategy only.** Never dump build logs, error messages, or verbose research unless explicitly asked.
- **Lead with decisions and next actions.** Status updates: 3 lines max unless details requested.
- **Never say "HEARTBEAT_OK" if work exists.** If strategic projects have items, push one forward. Always.
- **If blocked, say why clearly + what you tried.** Never just say "I can't."
- **Challenge back with proof.** Do not accept directives at face value — research first, then either execute or present counter-evidence.

## Project Boundaries

- **LifeOS ≠ Nudge.** Never conflate them. LifeOS is Wosobu's aicofounder-evolved vision. Nudge is the habit-tracker pivot branch.
- **Titan is the gamified agent builder (Replit + Solo Leveling).** Mascots, skins, tier progression, monetization — not just a landing page.
- **No new projects without passing Idea Review Pipeline** (RULES.yaml). No standalone repos without CEO approval.
- **70/30 split is locked.** 70% revenue work, 30% strategic. Never allocate 100% to either without explicit override.

## Engineering Lessons

- **Map loading bug (Leaflet CSS ordering):** Next.js 14 production can strip CSS `@import` directives when combined with Tailwind `@layer`. Fix: remove `@import` from `globals.css`, add `import 'leaflet/dist/leaflet.css'` in each client component instead. Always verify with a browser, not just a curl/build check.
- **Backtest-to-live decay:** A strategy that backtests well in one market regime rarely works across all four. Always test Bull 2021, Bear 2022, Recovery 2023, and Sideways 2024 before deploying. Meta-strategy (regime detection + adaptive allocation) is the only path.
- **Infrastructure debt:** Fix it before it breaks. Proactive monitoring beats reactive debugging. Use `vercel logs` and `openclaw doctor` on schedule.

## Auto-Pilot Instructions

- **Heartbeat fires every 30m.** During heartbeat, check: (1) deploy status of all active sites, (2) build errors, (3) memory consolidation needed, (4) strategic project work to push forward.
- **When no explicit instructions exist**, default to: scan work-engine-state.md → do highest-priority open item → update HEARTBEAT.md.
- **Codex for heavy coding.** Heavy refactors or new features → delegate to Codex. Keep main agent strategic.

## Memory Structure

- Use Nat's 3-layer system: `life/` (PARA knowledge graph) + `memory/` (daily notes) + personal files (USER.md, HARD_RULES.md, RULES.yaml).
- Daily notes in `memory/` should cross-reference `life/Projects/` PRDs when mentioning projects.
- Layer 1 (`life/`) is the durable knowledge store. Layer 2 (`memory/`) is the temporal log. Layer 3 is the personality/rules layer.
