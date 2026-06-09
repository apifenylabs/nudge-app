# Aqua Guard Layer — Dev Bay Spec

## Overview

The current `aqua/` can generate signals and paper-execute, but has zero safety infrastructure. To go live, it needs 6 defense layers that legacy `main_bot.py` has. This spec defines what to port, how (thin wrappers, no code copy), and the wiring changes.

**Golden rule:** Every guard component is a thin wrapper that imports the production module by reference. No copying code. This means production files must remain untouched during migration.

---

## Directory Layout

```
aqua/
├── orchestrator.py          # Entry point — keep, refactor wiring
├── core/
│   ├── data_connector.py    # Keep
│   ├── order_queue.py       # Refactor — add guard/pipe params
│   ├── risk_manager.py      # Keep (good)
│   ├── filters/             # Keep
│   ├── guard/               ★ NEW — Safety infra
│   │   ├── __init__.py
│   │   ├── position_guard.py
│   │   ├── order_pipe.py
│   │   ├── rate_limit.py
│   │   ├── time_sync.py
│   │   └── dfa_gate.py      ★ NEW — Regime gate (not in original plan, see note)
│   ├── monitor/              ★ NEW — Health
│   │   ├── __init__.py
│   │   └── execution_monitor.py
│   └── registry/             ★ NEW — Persistent trade state
│       ├── __init__.py
│       └── active_trades.py
├── strategies/              # Keep (5 strategies)
└── logs/                    # Keep
```

---

## Item 1: PositionGuard ← CRITICAL

**What's missing:** Aqua has zero knowledge of exchange positions. `data_connector.get_open_positions()` polls HL every cycle — rate-limited, stale, no real-time awareness. This means `execute_signal()` can ghost-layer onto an existing position.

**Fix:** Thin wrapper that imports and instantiates `PositionGuard` from production.

**File:** `aqua/core/guard/position_guard.py`

```python
"""
Thin wrapper — imports production PositionGuard.
WS listener runs in background thread. HTTP fallback on WS drop.
"""
from production.position_guard import PositionGuard
# Re-export the class and PositionState dataclass
```

**Wiring changes:**
- `orchestrator.py` startup: creates `PositionGuard(connector._connector)`, calls `guard.start()` daemon thread
- `orchestrator.py` `run_cycle()`: passes `guard` into `_order_queue["process_signal"]`
- `order_queue.py` `execute_signal()`: checks `guard.has_same_side(symbol, side)` before placing TP/SL group
- `execute_signal()`: if `has_same_side`, log BLOCKED and return — never place

**Test:**
1. Startup: guard creates WS subscription, `.live_positions` populated
2. No position: `has_position("SOL-PERP")` → False, orders proceed
3. Existing position: `has_same_side("SOL-PERP", "B")` → True when LONG exists, blocks same-side

---

## Item 2: OrderPipe ← CRITICAL

**What's missing:** `execute_signal()` calls `connector._connector.place_tpsl_group()` directly. No directional gating. If BB fires LONG on a coin with an existing SHORT, it'll increase the wrong direction. If LONG on existing LONG, it ghosts layers.

**Fix:** Thin wrapper that imports `OrderPipe` from production.

**File:** `aqua/core/guard/order_pipe.py`

```python
"""
Thin wrapper — imports production OrderPipe.
Routes orders through directional gate before HL.
"""
from production.order_pipe import OrderPipe, OrderGateResult
```

**Wiring changes:**
- `orchestrator.py` startup: creates `OrderPipe(guard, connector._connector)` (needs guard instance from Item 1)
- `orchestrator.py` passes `pipe` into `_order_queue["process_signal"]`
- `order_queue.py` `execute_signal()`: replaces `connector._connector.place_tpsl_group(...)` with `pipe.place_tpsl_group(...)` — adds `strategy=signal.get("strategy")` parameter
- If pipe blocks (returns `OrderGateResult(allowed=False)`), log and return blocked

**Test:**
1. No position: `place_tpsl_group` passes through to HL
2. Same-side position: blocked with "ghost layer prevented" reason
3. Opposite-side position: passes (reduction/exit)
4. Paper mode: pipe logs skipped, no HL call

---

## Item 3: Rate Limit Guard ← IMPORTANT

**What's missing:** Aqua's data connector calls HL raw. We already saw a 429 error in earlier test runs. No retry, no exponential backoff, no circuit breaker. One 429 on the info endpoint = cycle runs blind.

**Fix:** Thin wrapper that imports `safe_call` decorator from production's `rate_limit_guard.py`.

**File:** `aqua/core/guard/rate_limit.py`

```python
"""
Thin wrapper — imports production rate_limit_guard.
Provides wrapped connector methods for the orchestrator.
"""
from production.rate_limit_guard import safe_call
```

**Wiring changes:**
- `orchestrator.py` wraps the `AquaDataConnector` methods with `@safe_call(endpoint="info")` for data fetches
- OR: wrap at the `run_cycle()` level — any `dc.get_*()` call goes through safe_call
- Circuit breaker state lives in production's `rate_limit_guard._circuit_state` (shared, not duplicated)
- If circuit breaker open, orchestrator logs SKIP and continues to next coin/strategy (doesn't crash)

**Configuration (same as legacy, imported from config.py):**
```python
MAX_RETRIES = 4
BASE_DELAY_MS = 100
MAX_DELAY_MS = 2000
CONSECUTIVE_429_LIMIT = 5
CIRCUIT_BREAKER_DELAY_S = 60
```

**Test (paper mode):**
1. Normal calls: pass through with 0 delay
2. Mocked 429 response: retry with backoff, fall to stale data return
3. 5 consecutive 429s: circuit breaker opens, future calls return None
4. After 60s: circuit breaker closes, calls resume

---

## Item 4: Time Sync Guard ← IMPORTANT

**What's missing:** WSL2 clock drift after Windows sleep/resume kills signed orders silently. Hyperliquid rejects if local clock >500ms from server time. Legacy checks this every cycle via `time_sync_guard.check_time_sync()`.

**Fix:** Thin wrapper that imports and calls production's `time_sync_guard`.

**File:** `aqua/core/guard/time_sync.py`

```python
"""
Thin wrapper — imports production time_sync_guard.
Checks clock drift before orchestration cycle.
"""
from production.time_sync_guard import check_time_sync, MAX_DRIFT_MS

def check_and_report() -> tuple[bool, float]:
    """
    Returns (passed: bool, drift_ms: float).
    If drift > MAX_DRIFT_MS, attempts NTP sync.
    If still out of tolerance, returns False — caller decides halt.
    """
    passed, drift, _ = check_time_sync(halt_on_fail=False)
    return (passed, round(drift, 0))
```

**Wiring changes:**
- `orchestrator.py` `run_cycle()`: first action is `time_sync.check_and_report()`
- If drift > 500ms and LIVE mode: log CRITICAL, skip the entire cycle, return early
- If drift > 500ms and PAPER mode: log WARNING, continue (paper orders don't sign)

**Config** (shared with legacy via config.py import, no duplication):
```python
MAX_DRIFT_MS = 500  # <-- this is already in config.py
```

**Test:**
1. Normal: drift < 100ms, passes, cycle proceeds
2. Forced drift > 500ms (paper): warning logged, cycle continues
3. Forced drift > 500ms (live): cycle skipped, "CLOCK_DRIFT" error returned

---

## Item 5: DFA Regime Gate ← CRITICAL (gap in original plan)

**What's missing:** Legacy `dfa_filter.py` computes Hurst exponent per coin and blocks BB/momentum strategies in chop regimes. Aqua has no equivalent — BB 1h/15m and VolSurge could fire signals on `SOL` when H<0.42, which legacy DFA would have blocked.

**This was missing from the architecture plan pasted in chat.** Do not skip it.

**Fix:** Thin wrapper that imports `RegimeGate` from production's `dfa_filter.py`.

**File:** `aqua/core/guard/dfa_gate.py`

```python
"""
Thin wrapper — imports production DFA RegimeGate.
Provides per-coin regime decision and bulk report.
Regime decisions:
  - LOCK (H<=0.25): block ALL strategies on this coin
  - CONSTRICTED (0.25<H<0.42): block BB + momentum, allow neutral (stat arb, funding)
  - NORMALIZED (H>=0.42): full execution
"""
from production.dfa_filter import RegimeGate

class AquaRegimeGate:
    def __init__(self, connector):
        self._gate = RegimeGate(connector)
        self._cache_ttl = 600  # 10 min

    def check(self, coin: str, strategy: str) -> tuple[bool, str]:
        """
        Returns (allowed: bool, reason: str).
        LOCK blocks everything. CONSTRICTED blocks BB/* and vol_surge and turtle_soup.
        NORMALIZED allowed for all strategies.
        """
        ...

    def report(self, symbols: list[str]) -> dict:
        ...
```

**Wiring changes:**
- `orchestrator.py` startup: creates `AquaRegimeGate(connector._connector)`
- `orchestrator.py` `run_cycle()`: before running strategy `check_signal()`, calls `dfa_gate.check(coin, strategy_name)`
- If gate returns `(False, reason)`, log `REGIME BLOCKED: reason`, continue to next coin
- Cache: 10-min TTL per coin (DFA is expensive — 144-bar computation). Recomputes on cache miss.

**Legacy behavior reference (from dfa_filter.py):**
```python
LOCK_THRESHOLD = 0.25
UNLOCK_THRESHOLD = 0.42
# Hysteresis: exit LOCK only above 0.30, enter LOCK only below 0.28
HYSTERESIS_HIGH = 0.30
HYSTERESIS_LOW = 0.28
```

**Test:**
1. Coin at H=0.50 (NORMALIZED): all strategies pass
2. Coin at H=0.35 (CONSTRICTED): BB and VolSurge blocked, funding_proxy and btc_stat_arb pass
3. Coin at H=0.20 (LOCK): all strategies blocked
4. Cache miss: fresh compute, cached for 10 min
5. Stale cache used when: connector unavailable (allow_stale=True)

---

## Item 6: Execution Monitor ← IMPORTANT

**What's missing:** Legacy `execution_monitor.py` runs every cycle and detects rapid churn, ghost loops, balance drift, and persistent kill switch. Aqua logs signals but has no anomaly detection. We need early warning when something goes wrong.

**Fix:** Thin wrapper that imports and calls production's `execution_monitor.scan()`.

**File:** `aqua/core/monitor/execution_monitor.py`

```python
"""
Thin wrapper — imports production execution_monitor.
Runs anomaly scan after each cycle. Logs new alerts.
"""
from production.execution_monitor import scan as _scan

def scan(risk_state: dict, initial_balance: float = None) -> dict:
    """
    Returns dict with anomalies, new_alerts, count, new_count.
    Persists to production's logs/anomalies.json for cross-cycle dedup.
    """
    result = _scan(risk_state, initial_balance)
    for anomaly in result.get("new_alerts", []):
        severity = anomaly.get("severity", "warning")
        log.warning(f"[MONITOR] {severity.upper()}: {anomaly['type']} — {json.dumps(anomaly)}")
    return result
```

**Wiring changes:**
- `orchestrator.py` `run_cycle()`: after cycle loop completes, calls `monitor.scan(risk_state, initial_balance=balance_before_cycle)`
- New anomalies logged to `aqua/logs/monitor/` and cross-referenced with legacy `logs/anomalies.json` (same file, shared dedup)
- Pulse integration: anomaly count included in status report

**What it detects (same detectors as legacy):**
1. `rapid_churn`: same symbol+strategy enters/exits >3 times in 5 min
2. `ghost_loop`: ORPHAN_KILLER fires on same symbol >=3 times in 6 min
3. `balance_drift`: balance drops >$5 more than trade PnL explains
4. `slippage_blowout`: fill deviates >0.3% from signal price (live only)
5. `persistent_kill_switch`: kill switch still engaged from earlier cycle

**Test:**
1. Clean state: scan returns 0 anomalies
2. Rapid churn triggered: `rapid_churn` anomaly logged, severity "warning"
3. Supressed duplicates: same anomaly type+reason already in anomalies.json → not logged again

---

## Item 7: Active Trades Registry ← NICE TO HAVE

**What's missing:** Aqua has no persistent record of open trades across cycles. Legacy uses `active_trades.py` with JSON persistence. Without this, restarting aqua loses all position context.

**File:** `aqua/core/registry/active_trades.py`

```python
"""
Persistent trade registry — wraps production active_trades logic.
Stored in aqua/logs/registry/trades.json.
Used by orchestrator to persist open positions between cycles.
"""
import json, os
from datetime import datetime, timezone

_TRADE_REGISTRY = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "logs/registry/trades.json",
)

def record_trade(trade: dict):
    ...

def get_open() -> list[dict]:
    ...

def close_trade(trade_id: str, pnl: float):
    ...
```

**Wiring changes:**
- `order_queue.py` `execute_signal()`: calls `registry.record_trade()` on successful execution
- Pulse: reads `registry.get_open()` for position count
- Risk manager: cross-checks `state["open_positions"]` against registry (another layer of ghost detection)

---

## Orchestrator Wiring Summary

The orchestrator's `run_cycle()` will look like:

```python
def run_cycle(symbols=None, dry_run=True):
    _lazy_imports()

    # 1. Time sync check (Item 4)
    time_ok, drift = time_sync.check_and_report()
    if not time_ok and not dry_run:
        log.error("CLOCK DRIFT — skipping cycle")
        return {"error": "clock_drift"}

    # 2. Start PositionGuard (Item 1) — daemon thread, started once
    guard = PositionGuard(connector._connector)
    guard.start()

    # 3. Create OrderPipe (Item 2)
    pipe = OrderPipe(guard, connector._connector) if not dry_run else None

    # 4. Create DFA Gate (Item 5)
    dfa = AquaRegimeGate(connector._connector)

    # 5. Wrap connector with rate limit guard (Item 3)
    safe_dc = RateLimitedConnector(dc)  # or decorator pattern

    # 6. Load risk state + capture initial balance
    risk_state = risk_manager.load_state()
    balance_before = balance

    # 7. For each coin + strategy:
    for strat_cfg in REGISTERED_STRATEGIES:
        for coin in symbols:
            # DFA gate check
            allowed, reason = dfa.check(coin, strat_cfg["name"])
            if not allowed:
                log.info(f"  REGIME BLOCKED: {strat_cfg['name']} on {coin} — {reason}")
                continue

            # Fetch data, run strategy, process signal
            # ... existing logic ...

            # Pass guard + pipe + safe_dc into process_signal
            result = order_queue.process_signal(
                signal_payload,
                guard=guard,
                pipe=pipe,
                safe_dc=safe_dc,
                ...
            )

    # 8. Anomaly scan (Item 6)
    anomalies = execution_monitor.scan(risk_state, balance_before)
    if anomalies["new_count"] > 0:
        log.warning(f"  NEW ANOMALIES: {anomalies}")

    return result
```

---

## Pulse Integration

Update `status()` to include guard layer status:

```python
def status() -> dict:
    return {
        ...
        "guard": {
            "position_guard": guard.is_running if guard else False,
            "order_pipe": pipe is not None,
            "rate_limit": safe_dc is not None,
            "time_sync": "ok" if time_ok else "drift",
            "dfa_gate": {
                "coins_computed": len(dfa._cache),
                "regimes": {c: dfa.check(c, "any")[1] for c in ...}
            },
        },
        "monitor": {
            "anomaly_count": len(last_anomalies.get("anomalies", [])),
            "new_alerts": last_anomalies.get("new_count", 0),
        },
        ...
    }
```

---

## Dependencies / Constraints

1. **Production files must stay untouched** during migration. All guard wrappers use `from production.<module> import` — if dev refactors those files, the import path breaks.
2. **After switchover** (Phase 5), imports can be updated to inline the modules or repoint paths. For now, reference-only.
3. **Imports require sys.path manipulation** — the `_lazy_imports()` pattern in `orchestrator.py` already adds the production dir to sys.path. Guard wrappers do the same.
4. **Logs remain separated** — `aqua/logs/` never touches `production/logs/`. Exception: `execution_monitor.py` writes to `production/logs/anomalies.json` for cross-cycle dedup (shared anomaly file). This is acceptable because both aqua and legacy would read/write the same file for dedup to work.

---

## Testing Plan

| Item | Paper Test | Mock Test |
|------|-----------|-----------|
| PositionGuard | Start without wallet — log "paper mode, empty positions" | Mock WS stream, verify live_positions update |
| OrderPipe | Skipped (no HL connection) | Mock guard.has_same_side=True → blocked |
| Rate Limit | Run normally, verify pass-through | Inject 429 on get_candles → verify retry + stale data |
| Time Sync | Report drift, continue | Force time offset → verify live halt |
| DFA Gate | Compute on available 1h data, cache 10min | Inject H=0.20 → verify ALL blocked |
| Execution Monitor | Run with empty state → 0 anomalies | Inject rapid churn in trade history → verify detection |

Migration order: Items 1→2→5→3→4→6→7. Do not go live until all 6 are wired.
