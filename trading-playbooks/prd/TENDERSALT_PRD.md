# PRD: TendersAlt Fibonacci Retracement Strategy

## Project Information
```yaml
project: "Trading Playbooks - TendersAlt Fib Strategy"
version: "1.0"
date: "2026-04-30"
based_on_brd: "Unified trading playbooks"
```

## Executive Summary
The TendersAlt strategy identifies high-probability entries at Fibonacci retracement levels (Golden Pocket: 0.618–0.786), confirmed by momentum divergence, volume profile, and market structure. Designed for SOL perpetuals but works on any asset with clear swing highs/lows. 24/7 operation — no market-open dependency (unlike ORB).

**Core logic:** Identify major swing moves → calculate Fib levels → enter on retracement to golden pocket with Volume Profile + RSI divergence confirmation → trail stop as trend resumes.

## User Personas
```yaml
user_personas:
  - name: "Chris (Trader/Builder)"
    description: "Needs automated edge that doesn't require watching charts. Wants strategies that work 24/7 with proof."
    goals:
      - "Reliable entries at institutional levels (0.618-0.786)"
      - "Automated backtest validation before paper trading"
      - "Dynamic fee management for Solana execution"
    pain_points:
      - "ORB doesn't work on crypto"
      - "Wants something that survives all market conditions"
      - "Needs slippage/MEV protection"
```

## User Stories & Acceptance Criteria

```yaml
user_stories:
  - as_a: "Chris"
    i_want: "the system to identify all major swing swings (10%+ moves) and calculate Fib levels automatically"
    so_that: "I never miss a golden pocket setup"
    priority: "P0"
    acceptance_criteria:
      - "Detect swing highs/lows using rolling window peaks (configurable: 20-50 bars)"
      - "Calculate Fib levels: 0.236, 0.382, 0.500, 0.618, 0.786, 1.0, 1.272, 1.618"
      - "Identify Golden Pocket zone: 0.618 to 0.786 inclusive"
      - "Output swing_high, swing_low, swing_height_pct, all fib levels in signal"
      - "Work on any timeframe (15m, 1h, 4h, 1d)"

  - as_a: "Chris"
    i_want: "entry signals only when Fib retracement is confirmed by momentum divergence"
    so_that: "I avoid catching falling knives vs buying real reversals"
    priority: "P0"
    acceptance_criteria:
      - "Calculate RSI(14) at swing low and at current price"
      - "BUY signal: price enters 0.618-0.786 zone AND RSI shows bullish divergence (higher low in RSI vs lower low in price)"
      - "SELL signal: price enters 0.618-0.786 zone AND RSI shows bearish divergence"
      - "Configurable divergence threshold (default: 5 RSI points difference)"
      - "Signal includes: divergence_type (BULLISH/BEARISH/NONE), rsi_swing, rsi_current"

  - as_a: "Chris"
    i_want: "volume profile confirmation before taking a signal"
    so_that: "I only trade zones with institutional participation"
    priority: "P1"
    acceptance_criteria:
      - "Calculate Volume Weighted Average Price (VWAP) for the swing window"
      - "Calculate volume delta at Fib zone entry (buy vs sell volume ratio)"
      - "Signal only fires if volume ratio > 1.5 (confirming volume) or < 0.67 (reversal volume)"
      - "Include vwap and volume_ratio in signal output"

  - as_a: "Chris"
    i_want: "dynamic stop and target levels based on Fib extensions and ATR"
    so_that: "risk adapts to volatility"
    priority: "P1"
    acceptance_criteria:
      - "Stop loss: dynamic — below recent swing low (if BUY) or above swing high (if SELL)"
      - "Minimum stop: ATR * 1.5 to avoid noise stops"
      - "Take profit 1: 0.618 extension level (161.8% of swing)"
      - "Take profit 2: 1.0 extension level (200% of swing)"
      - "Partial TP: 50% at TP1, 50% trail at TP2"
      - "Include stop_loss, take_profit_1, take_profit_2 in every signal"

  - as_a: "Chris"
    i_want: "backtesting that accounts for Solana-specific execution costs"
    so_that: "I know the strategy is profitable after fees"
    priority: "P2"
    acceptance_criteria:
      - "Configurable priority fee (default: 0.0001 SOL per tx)"
      - "Configurable Jito bundle tip (default: 0.001 SOL)"
      - "Swap fee model: 0.3% per trade (Jupiter standard)"
      - "Slippage: configurable bps (default: 50bp for high congestion)"
      - "Total cost = swap_fee + priority_fee + jito_tip (if enabled)"
```

## Features

```yaml
features:
  - name: "Swing Detection Engine"
    description: "Identifies significant swing highs/lows using rolling window peak detection."
    priority: "P0"
    requirements:
      - "Rolling window peak detection using scipy.signal.argrelextrema OR numpy implementation"
      - "Minimum swing height: configurable (default: 5%) to filter noise"
      - "Maximum lookback: configurable (default: 100 bars)"
      - "Output: swing_high_price, swing_low_price, swing_height_pct, swing_direction (UP/DOWN)"

  - name: "Fib Retracement Calculator"
    description: "Calculates all Fibonacci retracement and extension levels from a swing."
    priority: "P0"
    requirements:
      - "Core levels: 0.236, 0.382, 0.5, 0.618, 0.786"
      - "Extension levels: 1.272, 1.618, 2.0, 2.618, 3.618"
      - "Golden Pocket zone: 0.618 ↔ 0.786 range"
      - "For up-swings: retrace levels are between swing_low and swing_high"
      - "For down-swings: retrace levels are between swing_high and swing_low"

  - name: "RSI Divergence Detector"
    description: "Compares RSI momentum at swing point vs current to detect divergence."
    priority: "P0"
    requirements:
      - "RSI period: configurable (default: 14)"
      - "Bullish divergence: price makes lower low, RSI makes higher low (zone entry)"
      - "Bearish divergence: price makes lower high, RSI makes higher high (zone entry)"
      - "Hidden divergence detection (for trend continuation signals)"

  - name: "Volume Profile Confirmer"
    description: "Checks volume profile at the retracement zone for institutional activity."
    priority: "P1"
    requirements:
      - "Calculate volume-weighted average price (VWAP) for swing window"
      - "Calculate cumulative volume delta at fib zone"
      - "Compare buy/sell volume ratio to threshold"

  - name: "Fee-Aware Backtest Engine"
    description: "Extended backtester that models Solana-specific execution costs."
    priority: "P2"
    requirements:
      - "Base swap fee: 0.3% (Jupiter routing fee)"
      - "Priority fee model: 0.0001 SOL base, auto-adjusted in high congestion"
      - "Jito bundle tip: configurable (0.001 SOL default)"
      - "Slippage model: 50bp default, 100bp in high volatility"
      - "Report total_costs, net_pnl, cost_pct_of_pnl per trade"
```

## Non-Functional Requirements

```yaml
non_functional_requirements:
  - category: "Performance"
    requirement: "Full analysis of 7,500 bars in <3 seconds"
  - category: "Isolation"
    requirement: "All code under trading-playbooks/. Only numpy, pandas, requests dependencies."
  - category: "Cost"
    requirement: "No API calls required for signal generation (uses cached data). Research via free APIs only."
  - category: "Maintainability"
    requirement: "Each function <200 lines. Single purpose. Named tendersalt_*.py"
```

## Technical Constraints
- Pure Python 3.10+ (numpy, pandas only)
- No TA-Lib (C dependency issues)
- All output JSON for orchestrator composability
- Swing detection must handle edge cases (equal highs, multiple swings within window)

## Design Requirements
- Extends existing ORB pipeline: reuse `fetch_data.py`, `backtest` pattern, `regime_snapshot.py`
- Signal output format: compatible with `orb_signal.py` schema (same entry/stop/tp fields, plus fib-specific fields)
- Each component independently testable

## Risk & Edge Cases
```yaml
risks:
  - risk: "Swing detection catches noise instead of major moves"
    mitigation: "Minimum swing height filter + configurable window size. Backtest validates."
  - risk: "RSI divergence false positives in trending markets"
    mitigation: "Volume profile filter catches only zones with institutional activity."
  - risk: "SOL liquidity drops during low-vol periods"
    mitigation: "Regime snapshot checks RPC health before enabling signal generation."
  - risk: "MEV/sandwich attacks on DEX entries"
    mitigation: "Configurable Jito bundle tip in backtest. Future: private RPC integration."
```

## Success Measurement
- **Launch Criteria:** All P0 acceptance criteria pass. Backtest on 90 days of SOL 15m data shows Sharpe > 1.0, win rate > 50%, PF > 1.5.
- **Comparison:** Must beat buy-and-hold SOL over same period.
- **Next Phase:** Paper trading simulation for 2 weeks.

## Approval
- **Product Owner:** Captain (acting CEO)  Date: 2026-04-30
- **CTO:** Auto-approved (autonomous mode per CEO directive)
