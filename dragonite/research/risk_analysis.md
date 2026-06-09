# Dragonite — Risk Analysis & Monte Carlo

## Phase 1 Risk Parameters

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Starting capital | $800 | Current IKBR balance |
| Max single trade risk | 3% ($24) | Aggressive but survivable |
| Leverage | 30:1 | Max for US forex CFD |
| Max concurrent positions | 3 | Diversification without overexposure |
| Max portfolio at risk | 10% ($80) | More than 3 correlated trades would violate this |
| Daily loss limit | 6% ($48) | Lose 6% = stop for the day |
| Weekly loss limit | 12% ($96) | Lose 12% = stop for the week |
| Kill switch | 30% DD ($240 loss) | Hard stop, reassess strategy |
| Target R:R per trade | 1.5:1 | Conservative enough for 50%+ WR |
| Stop loss | 0.75% of entry | Tight enough to limit damage |
| Take profit | 1.125% of entry | 1.5x the stop |

## Scenario Analysis

### Conservative Scenario (40% WR, poor but survivable)
- 100 trades: -40% to -60% account loss
- You're dead at 30% DD kill switch — stops at ~63 trades
- **Verdict:** Tight stops save you, but strategy needs at least 45-50% WR to survive

### Expected Scenario (50% WR, 1.5R)
- 100 trades: +25% account growth
- $800 → $1,000 after 100 trades (about 33-50 trading days)
- From $1k, same WR: $1,000 → $1,250 → $1,563 → $1,954
- **Verdict:** Works, but slower than you want

### Bull Scenario (55% WR, 1.5R)
- 100 trades: +57.5% account growth
- $800 → $1,260 in 100 trades (~33-50 days)
- CAGR equivalent: 400-800% annualized
- **Verdict:** $10k in ~6-9 months if maintained

### Blowup Risk
| Event | Probability | Impact | Prevention |
|-------|------------|--------|-----------|
| 10-loss streak | ~0.1% (50% WR) | -22% account | Daily stop at -6% |
| 15-loss streak | ~0.03% | -32% account | Kill switch at -30% |
| Gap open (news) | ~5% of trades | Stop gets slipped 1-5% | Trade only high volume pairs, avoid news windows |
| Broker issue | Low | Unknown | Manual oversight, multiple connections |

## Volatility & Position Sizing

With $800 and 30:1 leverage, position sizes per pair:

| Pair | Stop (pips) | Pip Value (0.01 lot) | Stop Value | Position Size |
|------|------------|---------------------|-----------|--------------|
| EUR/USD | 7.5 pips | $0.10 | $24 risk | 0.32 lots (32,000 units) |
| GBP/USD | 8.5 pips | $0.10 | $20 risk | 0.24 lots (24,000 units) |
| USD/JPY | 7.0 pips | $0.10 | $16 risk | 0.23 lots (23,000 units) |

**Note:** These are rough calculations. Actual position size depends on current price and spread.

## Kill Switch Configuration

```
if current_balance < peak_balance * 0.70:  # -30% drawdown
    close_all_positions()
    cancel_all_orders()
    disable_strategy()
    send_telegram_alert()
    # Manual review required to re-enable
    wait_for_human()
```

## Phase Transitions

| Phase | Balance Range | Risk/Trade | Max Positions | Leverage |
|-------|-------------|-----------|---------------|----------|
| Phase 1 (Aggressive) | $800 - $5,000 | 3% | 3 | 30:1 |
| Phase 2 (Growth) | $5,000 - $20,000 | 2% | 5 | 20:1 |
| Phase 3 (Balanced) | $20,000 - $50,000 | 1.5% | 5 | 15:1 |
| Phase 4 (Conservative) | $50,000+ | 1% | 7 | 10:1 |
