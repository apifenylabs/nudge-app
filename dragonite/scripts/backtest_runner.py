#!/usr/bin/env python3
"""
Dragonite — Backtest Runner
===========================
Run backtests using the trend-following strategy on forex data.
Fetches historical data from Yahoo Finance (free).
Uses local compute — no API costs.

Usage:
    python scripts/backtest_runner.py --pairs EUR.USD GBP.USD USD.JPY --months 6
"""

import argparse
import logging
import sys
from pathlib import Path

import pandas as pd
import yfinance as yf

# Add project root to path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from strategies.trend_following import TrendFollowingStrategy

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
logger = logging.getLogger("backtest_runner")

# Yahoo Finance tickers for forex
# Note: Yahoo uses inverted pairs for forex
FOREX_TICKERS = {
    "EUR.USD": "EURUSD=X",
    "GBP.USD": "GBPUSD=X",
    "USD.JPY": "USDJPY=X",
    "USD.CHF": "USDCHF=X",
    "AUD.USD": "AUDUSD=X",
}


def fetch_forex_data(
    ticker: str, period: str = "6mo", interval: str = "1h"
) -> pd.DataFrame:
    """Fetch forex data from Yahoo Finance."""
    logger.info(f"Fetching {ticker} ({period}, {interval})...")
    df = yf.download(ticker, period=period, interval=interval, progress=False)

    if df.empty:
        logger.warning(f"No data for {ticker}")
        return df

    # Flatten MultiIndex columns if present
    if isinstance(df.columns, pd.MultiIndex):
        df.columns = df.columns.get_level_values(0)

    # Rename to lowercase
    df = df.rename(
        columns={
            "Open": "open",
            "High": "high",
            "Low": "low",
            "Close": "close",
            "Volume": "volume",
        }
    )

    df = df.dropna()
    logger.info(f"  Got {len(df)} candles ({df.index[0]} to {df.index[-1]})")
    return df


def run_backtest(
    pair: str,
    months: int = 6,
    interval: str = "1h",
    initial_capital: float = 800.0,
    position_size_pct: float = 0.03,
    leverage: int = 30,
):
    """Run full backtest for a forex pair."""
    ticker = FOREX_TICKERS.get(pair)
    if not ticker:
        logger.error(f"Unknown pair: {pair}")
        return

    # Determine period string
    period_map = {1: "1mo", 3: "3mo", 6: "6mo", 12: "1y", 24: "2y"}
    period = period_map.get(months, "6mo")

    # Fetch data
    df = fetch_forex_data(ticker, period=period, interval=interval)
    if df.empty:
        return

    # Determine spread cost
    spread_map = {
        "EUR.USD": 0.000059,
        "GBP.USD": 0.000080,
        "USD.JPY": 0.000070,
    }
    spread_cost = spread_map.get(pair, 0.000070)

    # Run strategy
    strategy = TrendFollowingStrategy()
    results = strategy.backtest(
        df,
        initial_capital=initial_capital,
        position_size_pct=position_size_pct,
        leverage=leverage,
        spread_cost=spread_cost,
    )

    # Print results
    print(f"\n{'='*60}")
    print(f"BACKTEST RESULTS — {pair} ({period}, {interval})")
    print(f"{'='*60}")
    print(f"Initial Capital:  ${initial_capital:.2f}")
    print(f"Final Capital:    ${results['final_capital']:.2f}")
    print(f"Total Return:     {results['total_return']}")
    print(f"Total Trades:     {results['total_trades']}")
    print(f"Win Rate:         {results['win_rate']}")
    print(f"Max Drawdown:     {results['max_drawdown']}")
    print(f"Profit Factor:    {results['profit_factor']}")
    print(f"Avg Win:          ${results['avg_win']:.2f}" if isinstance(results.get('avg_win'), (int, float)) else f"Avg Win:          {results['avg_win']}")
    print(f"Avg Loss:         ${results['avg_loss']:.2f}" if isinstance(results.get('avg_loss'), (int, float)) else f"Avg Loss:         {results['avg_loss']}")
    print(f"{'='*60}\n")

    # Save to file
    output_dir = Path(__file__).resolve().parent.parent / "research" / "backtest_results"
    output_dir.mkdir(exist_ok=True)
    filename = output_dir / f"{pair}_{period}_{interval}_results.md"
    with open(filename, "w") as f:
        f.write(f"# Backtest: {pair} ({period}, {interval})\n\n")
        f.write(f"- **Date:** {pd.Timestamp.now().strftime('%Y-%m-%d %H:%M')}\n")
        f.write(f"- **Initial Capital:** ${initial_capital:.2f}\n")
        f.write(f"- **Final Capital:** ${results['final_capital']:.2f}\n")
        f.write(f"- **Total Return:** {results['total_return']}\n")
        f.write(f"- **Total Trades:** {results['total_trades']}\n")
        f.write(f"- **Win Rate:** {results['win_rate']}\n")
        f.write(f"- **Max Drawdown:** {results['max_drawdown']}\n")
        f.write(f"- **Profit Factor:** {results['profit_factor']}\n")
        f.write(f"- **Avg Win:** ${results['avg_win']:.2f}\n" if isinstance(results.get('avg_win'), (int, float)) else f"- **Avg Win:** {results['avg_win']}\n")
        f.write(f"- **Avg Loss:** ${results['avg_loss']:.2f}\n" if isinstance(results.get('avg_loss'), (int, float)) else f"- **Avg Loss:** {results['avg_loss']}\n")

    logger.info(f"Results saved to {filename}")
    return results


def main():
    parser = argparse.ArgumentParser(description="Dragonite Backtest Runner")
    parser.add_argument(
        "--pairs", nargs="+", default=["EUR.USD", "GBP.USD", "USD.JPY"],
        help="Forex pairs to backtest"
    )
    parser.add_argument("--months", type=int, default=6, help="Lookback period in months")
    parser.add_argument("--interval", default="1h", help="Candle interval (1h, 4h, 1d)")
    parser.add_argument("--capital", type=float, default=800.0, help="Initial capital")
    parser.add_argument("--risk", type=float, default=0.03, help="Risk per trade (%)")
    parser.add_argument("--leverage", type=int, default=30, help="Leverage")

    args = parser.parse_args()

    for pair in args.pairs:
        run_backtest(
            pair,
            months=args.months,
            interval=args.interval,
            initial_capital=args.capital,
            position_size_pct=args.risk,
            leverage=args.leverage,
        )


if __name__ == "__main__":
    main()
