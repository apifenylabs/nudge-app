# PRD: Opening Range Breakout (ORB) Signal Strategy

## Project Information
```yaml
project: "Trading Playbooks - ORB Strategy"
version: "1.0"
date: "2026-04-30"
based_on_brd: "BRD_v1.0 (unified trading playbooks)"
```

## Executive Summary
The Opening Range Breakout (ORB) is a classic intraday momentum strategy: capture the first ~5-15 minutes of price action, define a range (high/low), then trade breakouts in the direction of momentum. This playbook will generate machine-readable signals, backtest them against historical data, and provide entry/exit logic ready for paper trading.

## User Personas
```yaml
user_personas:
  - name: "Chris (Trader/Builder)"
    description: "Owner-operator running multiple automated strategies. Wants clean signals, low maintenance, verifiable backtests before risking real capital."
    goals:
      - "Generate reliable ORB signals without manual chart watching"
      - "Validate signal quality via backtesting before going live"
      - "Integrate signals into a paper trading loop then live trading"
    pain_points:
      - "Too many half-finished projects in the workspace"
      - "Wants proof (backtest results) before committing real money"
      - "Needs low token-cost automation (budget <$0.20/day)"
```

## User Stories & Acceptance Criteria

```yaml
user_stories:
  - as_a: "Chris"
    i_want: "to generate ORB signals from OHLCV data for any asset in any timeframe"
    so_that: "I can automate entry/exit decisions without watching charts"
    priority: "P0"
    acceptance_criteria:
      - "Script accepts CSV or JSON OHLCV input with columns: timestamp, open, high, low, close, volume"
      - "Signal output contains: timestamp, direction (BUY/SELL/NEUTRAL), entry_price, stop_loss, take_profit_1r, take_profit_2r, status (NEW/ACTIVE/CLOSED/EXPIRED)"
      - "Works on any configurable opening range window (default: first 15 min, configurable 5-60 min)"
      - "Signals respect ATR-based stop loss and 1.5R/2R take profit levels"

  - as_a: "Chris"
    i_want: "a backtesting engine that runs ORB signals against historical data and reports performance metrics"
    so_that: "I can validate the strategy before paper trading"
    priority: "P0"
    acceptance_criteria:
      - "Backtest processes at least 500 trading days of hourly or 15-min data"
      - "Outputs: total_return, win_rate, max_drawdown, sharpe_ratio, profit_factor, num_trades, avg_win, avg_loss"
      - "Slippage configurable (default: 0.1%)"
      - "Fee configurable (default: 0.05% per trade)"
      - "Reports equity curve as JSON array for charting"

  - as_a: "Chris"
    i_want: "the ORB strategy to respect position sizing rules"
    so_that: "I don't risk more than 1% per trade"
    priority: "P1"
    acceptance_criteria:
      - "Configurable risk_per_trade_pct (default: 1.0)"
      - "Calculate position size = (account_balance * risk_pct) / (entry - stop_loss)"
      - "Enforce max_position_pct of account (default: 20%)"
      - "Report position_size and risk_amount in every signal"

  - as_a: "Chris"
    i_want: "the ORB system to generate a morning 'regime snapshot' before firing signals"
    so_that: "I (or the orchestrator) can skip trading on high-volatility or low-liquidity days"
    priority: "P2"
    acceptance_criteria:
      - "Fetch VIX or DVOL (anomaly threshold: VIX > 30 or DVOL > 90 = skip)"
      - "Calculate 20-day ATR percentile; skip if current ATR > 2x 20-day median"
      - "Generate brief regime report: volatility_ok (bool), regime_label (LOW/MODERATE/HIGH/LETHAL), atr_percentile"
```

## Features

```yaml
features:
  - name: "ORB Signal Generator"
    description: "Consumes OHLCV data, identifies the opening range, generates breakout signals with dynamic stop/target levels."
    priority: "P0"
    requirements:
      - "Pure Python (no external dependencies beyond numpy+pandas)"
      - "Accepts configurable opening range window (minutes or bars)"
      - "Generates BUY signal when price breaks above OR high + ATR*0.5 buffer"
      - "Generates SELL signal when price breaks below OR low - ATR*0.5 buffer"
      - "Stop loss: ATR * 1.5 below entry (for BUY) / above entry (for SELL)"
      - "Take profit 1: 1.5R (where R = entry - stop_loss)"
      - "Take profit 2: 2R"
      - "Signal expires EOD if not triggered"
      - "Output as JSON for machine consumption"

  - name: "ORB Backtest Engine"
    description: "Simulates trading the ORB strategy over historical data and reports performance."
    priority: "P0"
    requirements:
      - "Process all historical OHLCV data in one pass"
      - "Track open positions, handle partial fills at TP1/TP2 (50% each)"
      - "Apply slippage (configurable bps) and fees (configurable bps)"
      - "Support compounding or fixed position sizing"
      - "Generate equity curve array + trade log (timestamp, side, entry, exit, pnl, reason)"
      - "Export results to JSON"

  - name: "Regime Snapshot (Morning Check)"
    description: "Pre-trading volatility and liquidity check."
    priority: "P2"
    requirements:
      - "Check VIX (for equities) or DVOL (for crypto) via free API"
      - "ATR percentile of last 20 days"
      - "Recommend: GO / CAUTION / SKIP"
      - "Output as JSON for orchestrator consumption"
```

## Non-Functional Requirements

```yaml
non_functional_requirements:
  - category: "Performance"
    requirement: "Backtest of 2 years of hourly data completes in <5 seconds on consumer hardware"
  - category: "Isolation"
    requirement: "All code lives under ~/.openclaw/workspace/trading-playbooks/. No external deps beyond numpy/pandas/requests"
  - category: "Cost"
    requirement: "Signal generation costs <$0.001 in API tokens per run. Backtest runs once, cached thereafter."
  - category: "Maintainability"
    requirement: "Each function is a single-purpose Python module (<200 lines). Named orb_signal.py, orb_backtest.py, etc."
  - category: "Reproducibility"
    requirement: "Backtest with fixed seed produces identical results across runs. Results hashable."
```

## Technical Constraints
- Python 3.10+ only. Standard library + numpy + pandas + requests. No TA-Lib (C dependency hell).
- All output is JSON for composability with orchestrator tools.
- No persistent database; signals are ephemeral (file-based for now).
- No real API keys stored in code. Use environment variables or config file.

## Design Requirements
- Signal output format must be parseable by a future Telegram bot or web dashboard.
- Each module must have a `--help` flag and sensible defaults.
- Unit tests for signal logic with fixed OHLCV fixtures.

## Risk & Edge Cases
```yaml
risks:
  - risk: "Range too tight/low volume → false breakouts"
    mitigation: "Require ATR buffer (0.5x ATR) before confirming breakout. Configurable for higher thresholds."
  - risk: "Gaps cause stop-loss to slip past entry"
    mitigation: "Backtest must account for gap-through fills (fill at next bar's open, not at stop price if gap exceeds it)."
  - risk: "Overfitting to historical data"
    mitigation: "Walk-forward validation: train on 70%, test on 30%. Report both periods separately."
```

## Success Measurement
- **Launch Criteria:** All P0 acceptance criteria pass. Backtest on 500+ bars shows Sharpe > 1.0, win rate > 45%, max drawdown < 15%.
- **Success Metrics:** Backtest meets thresholds → move to paper trading simulation.
- **Next Phase Triggers:** Paper trading 2 weeks with positive PnL → consider live deployment (with user approval).

## Approval
- **Product Owner:** Captain (acting)  Date: 2026-04-30
- **CTO:** Chris (user)  Date: _________
