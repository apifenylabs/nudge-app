# Backtest Results & Research Log
## Date: 2026-04-30 04:17 HKT

### ORB Strategy on BTCUSDT 1h (90 days)
**Result:** ALL parameter combinations negative returns. Best Sharpe: -2.9

**Root cause analysis:**
1. **Crypto is 24/7** — No clean "opening range" like equities. The ORB concept (first 15 min → trade breakout) doesn't map cleanly to crypto hourlies.
2. **Recent chop market** — Jan-Apr 2026 BTC ranged ~$70-80k with no sustained directional moves. Breakout strategies bleed in sideways markets.
3. **Hourly data too coarse** — ORB on hourly means the "opening range" is the first N hours, which covers a massive price band.

### Key Learning
- **ORB works better on equities** (SPY, QQQ) where there's a defined market open.
- **For crypto, need different strategies:** momentum, mean reversion, or order-flow based.
- **Need 5-min or 15-min data** for intraday crypto trading.

### Next Playbook Priorities

| Priority | Strategy | Market | Data Needed | Est Dev Time |
|----------|----------|--------|-------------|-------------|
| 1 | **TendersAlt Fib Retracement** | SOL perp | 15min OHLCV | 2-3h |
| 2 | **Momentum Breakout** | BTC/ETH 5min | 5min OHLCV | 1-2h |
| 3 | **Mean Reversion (Bollinger)** | BTC 5min | 5min OHLCV | 1h |
| 4 | **Stat-Arb (ETH/BTC ratio)** | BTC/ETH | 1h OHLCV | 3-4h |

### What's Built & Working
- ✅ ORB Signal Generator (`scripts/orb_signal.py`) — generic OHLCV → signal pipeline
- ✅ ORB Backtest Engine (`scripts/orb_backtest.py`) — simulates trades with slippage/fees
- ✅ Regime Snapshot (`scripts/regime_snapshot.py`) — VIX/DVOL checks
- ✅ Data Fetcher (`scripts/fetch_data.py`) — Binance + Yahoo Finance
- ✅ Unit Tests (`scripts/test_orb.py`) — 9/9 passing
- ✅ Parameter Sweep (`run_sweep.py`) — automated optimization
- ✅ Full backtest pipeline

### Architecture Reusable
The pattern (signal.py → backtest.py → fetch_data.py → regime.py) is **strategy-agnostic**. Each new playbook = new signal generator + extended backtest. Same data pipeline, same regime checks.
