### HARD RULE: Governance gate is immutable (2026-05-30 10:11 HKT)
- Every ALLOC_ in config.py must map to a strategy in APPROVED_STRATEGIES
- Unregistered strategies are AUTO-KILLED (critical violation, blocks bot start)
- CEO expects every strategy to be backtest-validated BEFORE reaching his decision feed
- Strategies reach CEO only after PROVEN gate passed or with full data attach

### Trading Bot — Ghost State Fix + Infrastructure (2026-05-30 08:50 HKT)
- **Bug Fixed:** bot_state.json held 5 stale ghost orders, causing bot to skip all coins ("native TP/SL order active"). State cleared, triple hardening applied (auto-reconciliation, orphan killer safety, stable API format).
- **Playbook 4 (Trend Following):** Already built in strategies/trend_following.py. REGISTERED in governance gate.
- **R&D Agent:** Fixed 2 crashing bugs. Now produces real trade analysis.
- **Wick Imbalance:** Analyzed 60 combos on ETH 1h. Best PF 2.67 but WR 45% — below live gate. Not deployed. Doc written.
- **Forex BB/RSI:** Paper-deployed in forex_strategy.py. 5 pairs, ADX filter. Paper-only (no broker connector).
- **Governance Gate:** Updated with bb_15m (PROVEN), astronomer_swing (UNPROVEN), trend_following (UNPROVEN).
