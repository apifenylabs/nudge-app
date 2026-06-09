# Aqua Guard Layer — Build Status

## Summary

**8 guard components built, 0 production files modified.**

Built (1,288 total lines of new code):
| # | Component | File | Lines | Status |
|---|-----------|------|-------|--------|
| 1 | PositionGuard | `guard/position_guard.py` | 184 | ✅ Built |
| 2 | OrderPipe | `guard/order_pipe.py` | 198 | ✅ Built |
| 3 | Rate Limit Guard | `guard/rate_limit.py` | 108 | ✅ Built |
| 4 | Time Sync Guard | `guard/time_sync.py` | 92 | ✅ Built |
| 5 | DFA Regime Gate | `guard/dfa_gate.py` | 190 | ✅ Built |
| 6 | Churn Rate Limiter | `guard/churn.py` | 177 | ✅ Built (new) |
| 7 | Execution Monitor | `monitor/execution_monitor.py` | 119 | ✅ Built |
| 8 | Trade Registry | `registry/active_trades.py` | 216 | ✅ Built |

All wrappers import production modules by reference — no code copy.

Not yet wired into orchestrator.py (Phase 5 step — waiting on go-ahead).

## Directory layout

```
aqua/core/
├── guard/                    # Safety infra (new)
│   ├── __init__.py
│   ├── position_guard.py     # WS position awareness
│   ├── order_pipe.py         # Directional gate
│   ├── rate_limit.py         # 429 retry + circuit breaker
│   ├── time_sync.py          # Clock drift detection
│   ├── dfa_gate.py           # Hurst regime filter
│   └── churn.py              # Per-strategy lockout
├── monitor/
│   ├── __init__.py
│   └── execution_monitor.py  # Anomaly detection
├── registry/
│   ├── __init__.py
│   └── active_trades.py      # Persistent trade tracking
├── filters/                  # Existing — unmodified
├── data_connector.py         # Existing — unmodified
├── order_queue.py            # Existing — unmodified
├── risk_manager.py           # Existing — unmodified
├── orchestrator.py           # Existing — unmodified
└── strategies/               # Existing — unmodified
```

## Strategy parity verified

| Strategy | Production | Aqua | Logic Match | Signal Contract |
|----------|-----------|------|-------------|-----------------|
| bb_core | `strategies/bb_core.py` | `aqua/strategies/bb_core.py` | ✅ Identical | Keys renamed (entry→entry_price, tp→take_profit) |
| vol_surge | `strategies/vol_surge.py` | `aqua/strategies/vol_surge.py` | ✅ Identical | Production returns string; aqua returns dict |
| funding_proxy | `strategies/funding_proxy.py` | `aqua/strategies/funding_proxy.py` | ✅ Identical | Same params, signal filter logic |
| turtle_soup | `strategies/turtle_soup_macro_v2.py` | `aqua/strategies/turtle_soup.py` | ✅ Identical | Same sweep logic, dedup, SL/TP calc |
| btc_stat_arb | `strategies/btc_neutral_stat_arb.py` | `aqua/strategies/btc_stat_arb.py` | ✅ Identical | Same OLS regression, z-score, ATR calc |

All strategy signal contracts (entry_price, stop_loss, take_profit, atr, coin, direction) are consumed correctly by orchestrator.py.

## Churn limiter (gap identified during build)

Legacy main_bot.py has a 2-hour per-strategy lockout after 3+ enters/exits in 3 minutes. This is separate from the execution monitor's detection — it's an active gate. Built as `guard/churn.py`.

## What remains to wire

The following files need their signal processing flow modified to use the guard layer:

**orchestrator.py** — add guard initialization, per-coin DFA gate check, per-strategy churn check
**order_queue.py** — add PositionGuard position check and OrderPipe option to execute_signal()

These are orchestration-only changes — strategy modules untouched.

## Testing plan

Each guard component has standalone smoke test (`if __name__ == "__main__"`). Run:
```
python3 -m aqua.core.guard.position_guard
python3 -m aqua.core.guard.rate_limit
python3 -m aqua.core.guard.time_sync
python3 -m aqua.core.guard.churn
python3 -m aqua.core.monitor.execution_monitor
python3 -m aqua.core.registry.active_trades
```

Integration test: run aqua with all guards wired. All signals should flow through the same gates as legacy.
