# HEARTBEAT.md — Captain Alpha Status

**Last Updated:** 2026-06-07 15:19 HKT

**STATUS:** 🔴 KEY ROTATION IN PROGRESS

## Critical Session: Security Cleanup

### Event: DeepSeek API Key rotation received from CEO

New DeepSeek key received via chat. Protected as follows:
- ✅ Key stored ONLY in `.env.local` (gitignored)
- ✅ 6 Python scripts across `_projects/` had OLD hardcoded key — ALL FIXED to use `os.environ.get("DEEPSEEK_API_KEY", "")`
- ✅ All env refs use `process.env.DEEPSEEK_API_KEY` or `os.environ.get()` pattern
- ✅ Audit of all 8 apifenylabs repos complete — **only nudge-app affected**
- ✅ `.env.example` sanitized to placeholder values

### DeepSeek API Key — NEW key received, OLD key (sk-bd34...) in git history
**OLD key was hardcoded in these files (ALL FIXED to env var pattern):**
- `_projects/ev-charging-asia/gen_rankings.py`
- `_projects/ev-charging-asia/gen_more_posts.py`
- `_projects/apifeny-ai/gen_new_playbooks.py`
- `_projects/family-travel-directory/_projects/ev-charging-asia/gen_rankings.py` (nested copy)
- `_projects/family-travel-directory/_projects/ev-charging-asia/gen_more_posts.py` (nested copy)
- `_projects/family-travel-directory/_projects/apifeny-ai/gen_new_playbooks.py` (nested copy)
- Also leaked in nudge-app git history via `gen_ev_posts.py` — needs BFG

### Pending Rotation (CEO dashboard, not yet done)
Older secrets from nudge-app git history still need rotation:
- Supabase Service Key
- GitHub PAT (old one — `ghp_wW...HgGY`)
- Vercel PAT
- Telegram Bot Token (from `841904...Qkcw`)

## Updated HARD RULES
- **AGENTS.md** → SEKRETZ rule: first scan target every session
- **MEMORY.md** → HARD RULE #1: Never hardcode secrets in tracked files (P0 violation)
- Any file that needs a secret MUST use env var interpolation
- Git history with secrets → BFG Repo-Cleaner required

## Deployment & Dev Work (same session)
- **Kill Switch Fix (08:38 HKT)** — 3 fixes to main_bot.py + execution_monitor.py: retry-on-zero balance check, stale kill-switch recovery, detector rename/noise suppression. UAT 62/62 ✅
- **Project Aqua Phase 2: BB Core ported** — strategies/bb_core.py → aqua/strategies/bb_core.py. Clean contract, no score path. 9/9 protocol checks pass.
- **Rename: framework_v2 → aqua** — dir rename, all imports updated, zero stale references.
- **Rename: turtle_soup_v2.py → turtle_soup.py** — stripped all "v2"/"fw2" naming.
- **Legacy archive** — 8 dead strategies moved to _archive/. Live strategies in strategies/ remain: bb_core, funding_proxy, vol_surge, btc_stat_arb, oi_gate, orderflow_filters, vwap_variance.

## Site Health
- All sites HTTP 200 ✅ (last checked earlier this session)
