### HARD RULE: NEVER hardcode secrets in tracked files (2026-06-07 08:43 HKT) — IMMUTABLE
- Secrets API keys, tokens, passwords, PATs are NEVER written to ANY tracked file: no .py, .ts, .tsx, .js, .sh, .json, .yaml, .yml, .md (including memory/*.md), .txt, .env, config files
- Secrets live ONLY in: .env.local (gitignored) or Vercel/GitHub/cloud environment variables
- This rule is CHECKED FIRST every session in MEMORY.md section scan
- Violation is P0 critical: auto-kill task, alert CEO immediately
- .env.example can contain public/anonymous keys only (NEXT_PUBLIC_* anon keys are DESIGNED to be public)
- ANY file that references a secret MUST use env var interpolation only, NEVER hardcoded values
- Git history with secrets must be force-rewritten with BFG Repo-Cleaner

### HARD RULE: Goals & Milestones first — every session (2026-06-12 08:50 HKT)
- GOALS_AND_MILESTONES.md is read FIRST every session and every cron run
- Every action must push a milestone forward. No aimless building.
- Ranking targets and revenue milestones are the only valid work drivers
- Blockers are logged and surfaced; do not work around them with non-milestone work
- Daily check: status report to CEO on milestone progress

### HARD RULE: Governance gate is immutable (2026-05-30 10:11 HKT)
- Every ALLOC_ in config.py must map to a strategy in APPROVED_STRATEGIES
- Unregistered strategies are AUTO-KILLED (critical violation, blocks bot start)
- CEO expects every strategy to be backtest-validated BEFORE reaching his decision feed
- Strategies reach CEO only after PROVEN gate passed or with full data attach

### Trading Bot — OI/Funding Collector + Cooldown Gate + Funding Proxy Live Wiring (2026-06-02 23:43 HKT)
- **oi_funding_collector.py:** NEW. Native HL metaAndAssetCtxs ingest, 60s cache, 5-target OI/funding extraction with rolling 60-snapshot delta computation
- **Cooldown Gate:** 2-hour per-symbol cooldown on loss. Prevents VolSurge double-loss bug where bot re-entered SOL LONG 18 minutes after losing (23:09 + 23:27). Backed by full UAT Scenario 6.
- **Funding Proxy live wired:** OI delta ratio now passed to `check_funding_signal()`. Was running with oi_change=0.0. Now uses real OI deltas from collector.
- **UAT v2:** 6 scenarios, 34/34 pass. Extended to cover OI delta computation, funding_proxy signal firing, cooldown persistence/expiry.
- **Preflight:** ALL PASS. Ready for deploy.

### Trading Bot — Ghost State Fix + Infrastructure (2026-05-30 08:50 HKT)
- **Bug Fixed:** bot_state.json held 5 stale ghost orders, causing bot to skip all coins ("native TP/SL order active"). State cleared, triple hardening applied (auto-reconciliation, orphan killer safety, stable API format).
- **Playbook 4 (Trend Following):** Already built in strategies/trend_following.py. REGISTERED in governance gate.
- **R&D Agent:** Fixed 2 crashing bugs. Now produces real trade analysis.
- **Wick Imbalance:** Analyzed 60 combos on ETH 1h. Best PF 2.67 but WR 45% — below live gate. Not deployed. Doc written.
- **Forex BB/RSI:** Paper-deployed in forex_strategy.py. 5 pairs, ADX filter. Paper-only (no broker connector).
- **Governance Gate:** Updated with bb_15m (PROVEN), astronomer_swing (UNPROVEN), trend_following (UNPROVEN).
