# BB Core Stress Test Results — Full History

**Strategy:** BB(10,2.0) + RSI(14) < 20 entry | TP=1.5×ATR | SL=0.75×ATR | Max Hold=48 bars
**Data:** 1h OHLCV — all available bars from 2024-01-01 to 2026-05-22
**Slippage:** Applied per-pair (see bp column)
**Monte Carlo:** 2000 shuffled trade sequences — P95/P50/P5 ending R
**Walk-Forward:** 60/20/20 chronological split (train/val/test)
**Generated:** 2026-05-22 17:26 UTC

| Rank | Pair | Slippage | Bars | Signals | WR% | PF | Total R | Avg R | MaxL | AvgBar | MC P95 | MC P50 | MC P5 | WF Trn(W/P) | WF Val(W/P) | WF Tst(W/P) | Status |
|------|------|----------|------|---------|-----|----|---------|-------|------|--------|--------|--------|-------|-------------|--------------|-------------|--------|
| 1 | HYPE/USDT | 3bp | 5004 | 18 | 50.0% | 1.84 | 5.99 | 0.333 | 3 | 2.2 | 5.99R | 5.99R | 5.99R | 42.9%/1.38 | 66.7%/3.75 | 100.0%/1.45 | ✅ |
| 2 | TAO/USDT | 3bp | 18510 | 60 | 40.0% | 1.28 | 7.82 | 0.13 | 6 | 3.6 | 7.82R | 7.82R | 7.82R | 41.7%/1.38 | 42.9%/1.43 | 30.0%/0.82 | ✅ |
| 3 | BTC/USDT | 0.5bp | 20946 | 87 | 39.1% | 1.26 | 10.54 | 0.121 | 5 | 2.5 | 10.54R | 10.54R | 10.54R | 45.7%/1.66 | 35.3%/1.07 | 29.2%/0.81 | ✅ |
| 4 | XRP/USDT | 2bp | 20946 | 65 | 33.8% | 0.98 | -0.62 | -0.01 | 9 | 2.3 | -0.62R | -0.62R | -0.62R | 33.3%/0.96 | 22.2%/0.55 | 41.2%/1.34 | ✅ |
| 5 | ETH/USDT | 1bp | 20946 | 96 | 32.3% | 0.92 | -3.96 | -0.041 | 9 | 3.5 | -3.96R | -3.96R | -3.96R | 33.3%/0.96 | 42.9%/1.47 | 24.0%/0.62 | ✅ |
| 6 | WIF/USDT | 3bp | 19396 | 63 | 30.2% | 0.84 | -5.4 | -0.086 | 8 | 3.7 | -5.4R | -5.4R | -5.4R | 29.4%/0.81 | 30.8%/0.86 | 31.2%/0.88 | ✅ |
| 7 | SOL/USDT | 2bp | 20946 | 67 | 29.9% | 0.82 | -6.47 | -0.097 | 7 | 4.6 | -6.47R | -6.47R | -6.47R | 31.6%/0.89 | 44.4%/1.54 | 20.0%/0.48 | ✅ |


---
### Legend
- **Bars**: Total OHLCV bars fetched
- **Signals**: Total trade entries during period
- **WR%**: Win Rate
- **PF**: Profit Factor (gross win R / gross loss R)
- **Total R**: Net R-multiple sum across all trades
- **Avg R**: Mean R-multiple per trade
- **MaxL**: Max consecutive losses
- **AvgBar**: Mean bars held per trade
- **MC P95/P50/P5**: Monte Carlo 2000-shuffled ending R distribution
- **WF Trn/Val/Tst**: Walk-forward WR% / PF per split
- **⚠️ INCONCLUSIVE**: <5 total signals — insufficient data for reliable stats

**Ranking:** Profit Factor (PF) descending → Win Rate (WR) → Total R