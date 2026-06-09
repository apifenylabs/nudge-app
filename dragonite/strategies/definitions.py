"""
Dragonite — Strategy Definitions
=================================
Each strategy is a dict that can be passed to the backtest runner or live trader.
"""

# Best performing forex strategy after backtesting
FOREX_TREND_FOLLOWING = {
    "name": "Forex Trend-Following 4H",
    "class": "TrendFollowingStrategy",
    "module": "strategies.trend_following",
    "pairs": ["USD.JPY"],  # Primary — best backtest results
    "timeframe": "4h",
    "params": {
        "fast_ema": 10,
        "slow_ema": 30,
        "rsi_period": 14,
        "rsi_long_max": 50,
        "rsi_short_min": 50,
        "adx_period": 14,
        "adx_threshold": 20,
        "risk_reward": 1.5,
        "stop_percent": 0.005,
        "min_signal_distance_bars": 6,  # 24h between signals
    },
    "risk": {
        "max_risk_per_trade": 0.03,  # 3% of account
        "leverage": 10,
        "max_positions": 2,  # Only 1 forex pair active
        "spread_cost": 0.00007,  # USD/JPY all-in
    },
    "phase": 1,
    "status": "backtested",  # backtested | paper | live
}

# Secondary watchlist pairs (for expansion)
FOREX_WATCHLIST = {
    "GBP.USD": {
        "strategy": "Forex Trend-Following 4H",
        "status": "research",
        "backtest_return": "+5.0%",  # 6mo at 30:1 leverage
        "note": "Higher volatility but lower WR than USD/JPY",
    },
    "EUR.USD": {
        "strategy": "Forex Trend-Following 4H",
        "status": "research",
        "backtest_return": "+6.9%",  # 6mo at 30:1 leverage
        "note": "Range-bound, needs different approach",
    },
}

__all__ = ["FOREX_TREND_FOLLOWING", "FOREX_WATCHLIST"]
