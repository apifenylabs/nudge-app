"""
CVD Tracker — Cumulative Volume Delta

Purpose:
- Track the running sum of aggressive market orders
  (buy trades = +volume, sell trades = -volume)
- Detect divergence: price making new low while CVD makes higher low
  = mathematical proof of liquidity hunt / institutional absorption
- Real-time: update on each trade event from HL trade WS

Research grounding:
- CVD divergence is the most cited edge on r/algotrading, r/FuturesTrading
  for both crypto and futures
- "When price and CVD disagree, trust the CVD" — universal among institutional
  order-flow traders
- Key use case: ORB breakout at NY open, check CVD. If price breaks up but CVD
  is flat or negative → stand down, it's a liquidity grab

Implementation:
- Maintain a running CVD over each session
- Compute rolling max/min of CVD for divergence detection
- Divergence types:
  1. Bullish: price makes new low, CVD makes higher low
  2. Bearish: price makes new high, CVD makes lower high
"""

import time
from collections import deque
from dataclasses import dataclass


@dataclass
class TradeEvent:
    """One trade from HL trade WebSocket."""
    ts: float
    price: float
    size: float
    side: str          # "Buy" or "Sell" (HL convention)
    is_buy: bool       # True if aggressive buy

    def __post_init__(self):
        if isinstance(self.side, str) and self.is_buy is None:
            self.is_buy = self.side.lower() == "buy"


@dataclass
class DeltaBar:
    """Aggregated delta over a time bar."""
    start_ts: float
    end_ts: float
    buy_volume: float
    sell_volume: float
    delta: float       # buy - sell
    open: float
    high: float
    low: float
    close: float
    trade_count: int
    cvd_at_open: float
    cvd_at_close: float


class CVDTracker:
    """Track Cumulative Volume Delta and detect divergences."""

    def __init__(self, bar_seconds: int = 60, lookback_bars: int = 20):
        """
        Args:
            bar_seconds: Aggregation bar length in seconds (default 60 = 1min bars)
            lookback_bars: How many bars to track for divergence detection
        """
        self.bar_seconds = bar_seconds
        self.lookback_bars = lookback_bars

        # Running CVD (total)
        self._cvd = 0.0
        self._current_bar_delta = 0.0
        self._current_bar_buy = 0.0
        self._current_bar_sell = 0.0
        self._current_bar_count = 0
        self._current_bar_open = None
        self._current_bar_high = -float('inf')
        self._current_bar_low = float('inf')
        self._current_bar_start = None

        # Completed bars
        self._bars: deque = deque(maxlen=lookback_bars)

        # CVD history for divergence detection
        self._cvd_history: deque = deque(maxlen=lookback_bars * 2)
        self._price_history: deque = deque(maxlen=lookback_bars * 2)

        # Last state
        self._last_cvd_close = 0.0
        self._last_price = 0.0
        self._total_trades = 0

    def add_trade(self, price: float, size: float, is_buy: bool,
                  ts: float = None) -> dict:
        """
        Process one trade event.

        Returns current bar + divergence state.
        """
        ts = ts or time.time()
        size = float(size)
        delta = size if is_buy else -size

        self._cvd += delta
        self._total_trades += 1
        self._last_price = price

        # Bar management
        bar_start = (ts // self.bar_seconds) * self.bar_seconds
        if self._current_bar_start is None:
            self._current_bar_start = bar_start
            self._current_bar_open = price

        if bar_start != self._current_bar_start:
            # Close current bar
            closed_bar = DeltaBar(
                start_ts=self._current_bar_start,
                end_ts=bar_start,
                buy_volume=self._current_bar_buy,
                sell_volume=self._current_bar_sell,
                delta=self._current_bar_delta,
                open=self._current_bar_open,
                high=self._current_bar_high,
                low=self._current_bar_low,
                close=self._last_cvd_close,
                trade_count=self._current_bar_count,
                cvd_at_open=self._last_cvd_close - self._current_bar_delta,
                cvd_at_close=self._last_cvd_close,
            )
            self._bars.append(closed_bar)
            self._cvd_history.append(self._last_cvd_close)
            self._price_history.append(price)

            # Start new bar
            self._current_bar_start = bar_start
            self._current_bar_delta = 0.0
            self._current_bar_buy = 0.0
            self._current_bar_sell = 0.0
            self._current_bar_count = 0
            self._current_bar_open = price
            self._current_bar_high = price
            self._current_bar_low = price

        # Accumulate current bar
        self._current_bar_delta += delta
        self._current_bar_count += 1
        if is_buy:
            self._current_bar_buy += size
        else:
            self._current_bar_sell += size
        self._current_bar_high = max(self._current_bar_high, price)
        self._current_bar_low = min(self._current_bar_low, price)
        self._last_cvd_close = self._cvd

        # Check divergence
        divergence = self._check_divergence(price)

        return {
            "cvd": round(self._cvd, 2),
            "bar_delta": round(self._current_bar_delta, 2),
            "bar_trades": self._current_bar_count,
            "total_trades": self._total_trades,
            "bar_buy_vol": round(self._current_bar_buy, 2),
            "bar_sell_vol": round(self._current_bar_sell, 2),
            "price": price,
            "is_buy": is_buy,
            "divergence": divergence,
        }

    def _check_divergence(self, price: float) -> dict:
        """Detect CVD divergence.

        Returns:
            {
                "bullish_divergence": bool,
                "bearish_divergence": bool,
                "strength": "none" | "weak" | "strong",
                "price_extremum": float | None,
                "cvd_extremum": float | None,
            }
        """
        result = {
            "bullish_divergence": False,
            "bearish_divergence": False,
            "strength": "none",
            "price_low": None,
            "cvd_low": None,
            "price_high": None,
            "cvd_high": None,
        }

        # Need at least a few bars for meaningful comparison
        if len(self._price_history) < 3 or len(self._cvd_history) < 3:
            return result

        prices = list(self._price_history)
        cvds = list(self._cvd_history)

        # Bullish divergence: price lower low, CVD higher low
        # Low in last chunk
        recent_prices = prices[-5:] if len(prices) >= 5 else prices
        recent_cvds = cvds[-5:] if len(cvds) >= 5 else cvds

        # Find lowest price point and corresponding CVD
        min_price_idx = recent_prices.index(min(recent_prices))
        max_price_idx = recent_prices.index(max(recent_prices))

        # If the lowest price is in the most recent 3 points
        if min_price_idx >= len(recent_prices) - 3:
            # Check if the 2nd lowest price point had lower CVD
            sorted_indices = sorted(range(len(recent_prices)),
                                    key=lambda i: recent_prices[i])
            if len(sorted_indices) >= 2:
                lowest_idx = sorted_indices[0]
                second_lowest_idx = sorted_indices[1]
                if second_lowest_idx < lowest_idx:
                    # Earlier point had similar or higher price but LOWER CVD
                    if (recent_cvds[lowest_idx] > recent_cvds[second_lowest_idx] and
                        recent_prices[lowest_idx] < recent_prices[second_lowest_idx]):
                        result["bullish_divergence"] = True
                        result["price_low"] = recent_prices[lowest_idx]
                        result["cvd_low"] = recent_cvds[lowest_idx]

        # Bearish divergence: price higher high, CVD lower high
        if max_price_idx >= len(recent_prices) - 3:
            sorted_indices_desc = sorted(range(len(recent_prices)),
                                         key=lambda i: recent_prices[i],
                                         reverse=True)
            if len(sorted_indices_desc) >= 2:
                highest_idx = sorted_indices_desc[0]
                second_highest_idx = sorted_indices_desc[1]
                if second_highest_idx < highest_idx:
                    if (recent_cvds[highest_idx] < recent_cvds[second_highest_idx] and
                        recent_prices[highest_idx] > recent_prices[second_highest_idx]):
                        result["bearish_divergence"] = True
                        result["price_high"] = recent_prices[highest_idx]
                        result["cvd_high"] = recent_cvds[highest_idx]

        # Strength estimate
        if result["bullish_divergence"] or result["bearish_divergence"]:
            # How extreme is the divergence? Look at how many bars the divergence spans
            div_bars = len(prices) - prices.index(min(prices)) if result["bullish_divergence"] else \
                       len(prices) - prices.index(max(prices))
            if div_bars >= 3:
                result["strength"] = "strong"
            else:
                result["strength"] = "weak"

        return result

    def get_bars(self, n: int = None) -> list:
        """Get completed delta bars."""
        if n is None:
            return list(self._bars)
        return list(self._bars)[-n:]

    def get_current_bar(self) -> dict:
        """Get in-progress bar data."""
        return {
            "delta": round(self._current_bar_delta, 2),
            "buy_vol": round(self._current_bar_buy, 2),
            "sell_vol": round(self._current_bar_sell, 2),
            "trade_count": self._current_bar_count,
            "open": self._current_bar_open,
            "high": self._current_bar_high if self._current_bar_high != -float('inf') else None,
            "low": self._current_bar_low if self._current_bar_low != float('inf') else None,
            "duration_s": 0 if self._current_bar_start is None else \
                round(time.time() - self._current_bar_start, 1),
        }

    def get_cvd_summary(self) -> dict:
        """Return complete CVD state summary."""
        cum_buy = sum(b.buy_volume for b in self._bars)
        cum_sell = sum(b.sell_volume for b in self._bars)

        return {
            "cvd": round(self._cvd, 2),
            "total_trades": self._total_trades,
            "completed_bars": len(self._bars),
            "total_buy_vol": round(cum_buy, 2),
            "total_sell_vol": round(cum_sell, 2),
            "buy_sell_ratio": round(cum_buy / cum_sell, 4) if cum_sell > 0 else None,
            "current_bar": self.get_current_bar(),
        }

    def reset(self):
        """Reset all state."""
        self._cvd = 0.0
        self._current_bar_delta = 0.0
        self._current_bar_buy = 0.0
        self._current_bar_sell = 0.0
        self._current_bar_count = 0
        self._current_bar_open = None
        self._current_bar_high = -float('inf')
        self._current_bar_low = float('inf')
        self._current_bar_start = None
        self._bars.clear()
        self._cvd_history.clear()
        self._price_history.clear()
        self._total_trades = 0
        self._last_cvd_close = 0.0


# Quick self-test
if __name__ == "__main__":
    import random, time

    cvd = CVDTracker(bar_seconds=5)  # 5s bars for fast testing

    # Simulate a bullish divergence: price drops, CVD rises
    price = 100.0
    base_time = time.time()

    # Phase 1: price falling, CVD also falling (trend down)
    for i in range(20):
        price -= random.uniform(0.1, 0.3)
        is_buy = random.random() < 0.3  # 30% buys = bearish
        vol = random.uniform(0.5, 5.0)
        result = cvd.add_trade(price, vol, is_buy, ts=base_time + i * 1.0)
        if i % 5 == 0:
            print(f"T{i:3d}: price={price:.2f}  cvd={result['cvd']:.2f}  "
                  f"buy={is_buy}  bar_delta={result['bar_delta']:+.2f}")

    # Phase 2: price keeps falling but CVD starts rising (divergence!)
    print("\n--- DIVERGENCE PHASE ---")
    for i in range(20, 35):
        price -= random.uniform(0.05, 0.15)
        is_buy = random.random() < 0.7  # 70% buys = accumulation
        vol = random.uniform(1.0, 8.0)
        result = cvd.add_trade(price, vol, is_buy, ts=base_time + i * 1.0)
        div = result.get("divergence", {})
        if div.get("bullish_divergence") or div.get("bearish_divergence"):
            print(f"T{i:3d}: ⚡ DIVERGENCE! price={price:.2f}  cvd={result['cvd']:.2f}  "
                  f"bullish={div['bullish_divergence']}  bearish={div['bearish_divergence']}  "
                  f"strength={div['strength']}")
        elif i % 5 == 0:
            print(f"T{i:3d}: price={price:.2f}  cvd={result['cvd']:.2f}  "
                  f"buy={is_buy}  bar_delta={result['bar_delta']:+.2f}")

    summary = cvd.get_cvd_summary()
    print()
    print(f"CVD Summary: cvd={summary['cvd']}, bars={summary['completed_bars']}, "
          f"ratio={summary['buy_sell_ratio']}")
