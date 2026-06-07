<!-- BEGIN:sekretz-rule -->
# 🚨 HARD RULE: Never hardcode secrets in tracked files (2026-06-07)

**This is checked FIRST every session. If you skip this, CEO will rightfully call you an idiot.**

- Secrets (API keys, tokens, passwords, PATs) NEVER go in ANY tracked file: .py, .ts, .tsx, .js, .sh, .json, .yaml, .yml, .md (including memory/*.md), .txt, .env, config files
- Secrets live ONLY in: .env.local (gitignored) or Vercel/GitHub cloud env vars
- If you need to document which env vars exist, use placeholder values (sk-YOUR_KEY_HERE) — never real ones
- Violation = P0 critical. CEO must be notified immediately.
- Git history with secrets must be force-rewritten with BFG Repo-Cleaner
- This applies to ALL apifenylabs repos on GitHub — every single one is PUBLIC

## 🛑 Human-approval gate for sensitive actions

**Before writing ANY secret/API key/token to ANY file anywhere (local or otherwise), STOP and ask CEO for approval.**

- This includes: local config files, auth profiles, dotfiles, environment files, credential stores
- This includes: generating files that contain keys as examples or templates
- This includes: writing keys to network services, cloud vaults, or deployment env vars
- If uncertain whether something is a secret → treat it as one → ask CEO

Exceptions (no approval needed):
- Reading a key from an env var and passing it to a runtime API call (no persistence)
- Writing placeholder values (sk-YOUR_KEY_HERE) in .env.example
- The pre-commit hook in .githooks/pre-commit — it only BLOCKS, never stores

Violation = immediate CEO notification with full context.
<!-- END:sekretz-rule -->

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:scope-before-code -->
# 🔭 Scope Before Code — Universal

**Plan first, code second.** Every session:

1. **Read AGENTS.md on the project first** — project-specific rules take priority
2. **Read target files before editing** — no blind writes
3. **State what you're about to do** — which files, what risk, what env vars
4. **Minimum viable change only** — no scope creep, no refactors in the same edit
5. **Always build after changes** — fix build errors immediately

_Adapted from vibe-coding-science (yarakyrychenko). The repo is gone but the principle lives on._
<!-- END:scope-before-code -->
