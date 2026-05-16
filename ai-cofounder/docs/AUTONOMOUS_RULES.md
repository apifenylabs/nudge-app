# AI Cofounder — Autonomous Execution Rules (LOCKED May 16, 2026)

> These rules govern the 24/7 autonomous work engine. Do not modify without explicit approval from Chris.

## Cron Jobs

| Job | Schedule | Timeout | Parallel | RAM Guard |
|---|---|---|---|---|
| `ceo-24-7-work-engine` | Every hour | 45 min | max 3 sessions | >1.5GB free |
| `ceo-daily-report` | Daily at 20:00 HKT | 5 min | 1 session | none |
| `ceo-weekly-review` | Weekly Sunday 20:00 HKT | 10 min | 1 session | none |

## Execution Loop

Every wake, follow this exact sequence:

```
1. READ → this file + SOUL.md + CEO.md + WORK_ENGINE_STATE.md
2. PICK → Research OR Build (never skip both — always do at least one)
3. EXECUTE → Build code, write content, fix issues, or research
4. VERIFY → Run `npm run build`, check for errors
5. LOG → Write changes to WORK_ENGINE_STATE.md
6. LOOP → Find next task from priority queue, repeat
```

## Self-Recovery

| Failure Mode | Recovery Action |
|---|---|
| **Timeout** | Log issue to WORK_ENGINE_STATE.md, kill stalled sub-agent, move to next task in queue |
| **OOM (Out of Memory)** | Wait 30s, check RAM with `free -m`, retry with smaller batch (reduce parallel count to 1) |
| **Build failure** | Fix the error in-place, retry build. If still fails after 2 attempts, log as known issue in WORK_ENGINE_STATE.md and move on |
| **Missing credentials** | Skip that task entirely, pick from zero-auth queue (content, SEO, design, blog) |
| **API rate limited** | Wait 60s, retry once. If still limited, skip and log response headers |
| **npm/yarn error** | Clear cache (`npm cache clean --force`), reinstall, retry build |

**Golden rule:** Never idle. Always find the next buildable thing. If all queues are empty, start a new feature or do research.

## Priority Queue

```
1. ✦ Meal Planning & Nutrition     — first vertical, build content, refine UX
2. ✦ Personal Finance               — second vertical, high LTV
3. ✦ Solopreneur/Small Biz Ops      — third vertical, dogfood
4. ✦ Travel Planning                 — fourth vertical, proven pattern
5. → Cross-site SEO                  — sitemap, schema, metadata, robots
6. → Waitlist capture                — email collection, signup component
7. → Affiliate infrastructure        — link management, tracking
8. → Blog content generation         — SEO posts, build-in-public
```

## Budget & Model Routing

**Daily cap:** $0.50

| Task Type | Model | Cost Tier |
|---|---|---|
| Easy/repetitive/simple tasks | `ollama:qwen3-coder` | Free (local) |
| Research / trend scanning | Gemini 2.5 Flash (free) → on error: Ollama Gemma4 + web_search | Free |
| 80%+ of work (coding, writing, SEO, testing) | DeepSeek-chat | Low |
| Parallel coding (Coder 2) | `ollama:qwen3-coder` | Free (local) |
| Final review / complex reasoning | DeepSeek-chat first → Sonnet (only after 2 failures) | Low → Medium |
| Production deployment decisions | Claude Opus | **REQUIRES explicit human approval** |

**CRITICAL RULES:**
- All local models MUST be prefixed with `ollama:` to route to localhost:11434
- NEVER send local models to cloud APIs
- If Gemini errors (429/quota exhausted) → skip immediately to Ollama + web_search. No retries.
- Claude Sonnet/Opus are NEVER for routine work
- On ANY model error → IMMEDIATELY try next safe model. Never stall.

## Communication Rules

- All build output, decisions, and blockers logged to WORK_ENGINE_STATE.md
- Daily report sent at 20:00 HKT via Telegram (token usage, cost, progress, next actions)
- Blocker? If blocked >15 minutes → log to WORK_ENGINE_STATE.md and switch tasks
- Never ask Chris for input unless: (a) payment decision needed, (b) credentials missing, (c) strategic pivot required

## Security & Safety

- No real money spent without explicit approval
- No real accounts accessed without explicit approval
- No data exfiltration — ever
- All credentials stored in `.env.local` only (never committed)
- Private keys, API tokens, passwords — never logged, never echoed
