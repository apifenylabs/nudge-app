# Liquidity Microstructure Engine — R&D Sandbox

## Purpose
Build a real-time L2 order book microstructure engine for Hyperliquid. Generates OFI (Order Flow Imbalance), CVD (Cumulative Volume Delta), wall clustering, and session-gated signals. Proved here first, prod later by CEO approval.

## Golden Rule
Prove in sandbox → CEO reviews data → CEO gates prod.

## Components

| File | Purpose |
|------|---------|
| `engine/l2_stream.py` | WebSocket L2 + trades + BBO stream (3 simultaneous WS) |
| `engine/ofi_calculator.py` | Order Flow Imbalance (Cont et al 2014) — 1s bin, 10s bin, 60s bin |
| `engine/cvd_tracker.py` | Cumulative Volume Delta — buy/sell from trade tape |
| `engine/wall_detector.py` | Wall clustering + spoof wall detection |
| `engine/session_gate.py` | London+NY overlap gate (14:00-21:00 UTC only) |
| `engine/liquidity_engine.py` | Main orchestrator — combines all signals into a single filter score |
| `tests/test_live.py` | Live smoke test against HL — 60s run, prints stats |
| `tests/test_mock.py` | Unit tests with mock data |
| `data/` | Captured L2 snapshots for offline testing |

## Signal Flow

```
HL WS → l2Book stream ─→ OFI Calculator (1s/10s/60s bins)
                        ─→ CVD Tracker (real-time)
                        ─→ Wall Detector (clusters + spoof)
                        
Session Gate (14-21 UTC) → off / on
                          
All signals → Liquidity Engine → Filter Score [-1, +1]
  +1 = strongly bullish microstructure
  -1 = strongly bearish
   0 = neutral / no clear signal
   
→ Wired to existing Aqua strategies as override filter
```

## Test Plan
1. `test_mock.py` — unit tests for each component with synthetic data
2. `test_live.py` — 120s live stream, verify WS connects, prints OFI + CVD + wall data
3. CEO reviews results
4. Producer cron created only after approval
