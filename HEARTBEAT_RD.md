# HEARTBEAT RD — Decisions & Research Registry

## 2026-05-29 00:56 HKT

### Correction: Session 1 Reasoning Agent Was Wrong on BB 1h
The initial reasoning audit (2026-05-28 22:34) recommended 40% allocation to BB 1h as primary alpha. 5-year OOS backtest proved:
- BTC: 19% WR (PF 0.75) → losing money
- ETH: 30% WR (PF 1.21) → barely positive
- SOL: 26% WR (PF 0.89) → losing money
- 83-90% training WR was data-snooping on 12-day window

**Decision: BB 1h allocation set to 0%, funding realigned to 15m grid.**

### Confirmed: The Limit Grid Edge
- 15m grid passes OOS on 6/12 symbols
- Market entry passes on 0/12 symbols
- Edge is microstructural (liquidity provision), not directional prediction

### Decision: Speed-Up Path = Universe Expansion, Not New Strategies
- Current: 15 trades/mo on 12 symbols
- Adding ARB, OP, LINK, SUI, ATOM to BB 15m grid should add 5-8 trades/mo
- Ecosystem correlation: Max 1 EVM L2 (ARB/OP) concurrent

### Risk Registered
- TP/SL native orders were wiped during outage. Need to verify TPSL persistence on HL after server restarts.
- No startup allowlist validation → open risk for stale positions after config changes.

### Original Session 1 bugs (22:34) — fixed:
1. BB 1h phantom: ✅ 1h signal loop wired
2. Funding proxy / taker flow zero alloc: ✅ risk_manager cases added
3. WIF stale-state: ❌ still open — gated from allowlists but no startup validation
