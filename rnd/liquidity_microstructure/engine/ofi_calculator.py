"""
OFI Calculator — Order Flow Imbalance (Cont et al 2014)

Purpose:
- Compute OFI from L2 BBO snapshots (best bid/ask + sizes)
- Aggregate into configurable time bins (1s, 10s, 60s)
- Fit linear model: Δmid = α + β·OFI

Research grounding:
- Cont et al (2014): R² ~0.40-0.50 at 1s on equities
- Silantyev (2018) on BitMEX XBTUSD: R²=7.1% at 1s, 40.5% at 10s, ~85% at 1m
  -> Crypto needs wider bins due to lower update arrival rates
- dm13450 on Coinbase BTC/USD: R²=0.40 in-sample, 0.41 out-of-sample at 1s
  -> Confirms signal is real for crypto with sufficient bin width

Key finding for our setup:
- Hyperliquid spits ~3-4 L2 updates/sec per coin in active trading
- At 1s bins: low event count, poor signal (~7% R² based on lit)
- At 10s bins: R² jumps to ~40% — this is our primary bin
- At 60s bins: even better signal but slower to react

Formula:
e_n = I(PB_n ≥ PB_{n-1})·QB_n - I(PB_n ≤ PB_{n-1})·QB_{n-1}
    - I(PA_n ≤ PA_{n-1})·QA_n + I(PA_n ≥ PA_{n-1})·QA_{n-1}

OFI_t = Σ(e_n) over events in bin t
Δmid_t = (mid_t - mid_{t-1}) / tick_size

Model: Δmid = α + β·OFI
Interpretation: β ≈ 0.15 means 10,000 contracts of net OFI = 1.5 ticks mid change
"""

from collections import deque
from dataclasses import dataclass
from datetime import datetime, timezone
import time
import statistics


@dataclass
class BBOEvent:
    """One BBO change event at the top of the book."""
    ts: float
    bid_price: float
    bid_size: float
    ask_price: float
    ask_size: float
    mid_price: float

    def __repr__(self):
        return f"BBO(ts={self.ts:.2f}, bid={self.bid_price}@{self.bid_size:.1f}, ask={self.ask_price}@{self.ask_size:.1f})"


class OFICalculator:
    """Compute Order Flow Imbalance from a stream of BBO snapshots."""

    def __init__(self, tick_size: float = 0.01, bin_seconds: int = 10,
                 max_events: int = 10000):
        """
        Args:
            tick_size: Minimum price increment (HL perp default ~0.01-0.1)
            bin_seconds: Aggregation window in seconds (10 = research-validated sweet spot)
            max_events: Max BBO events to retain in memory
        """
        self.tick_size = tick_size
        self.bin_seconds = bin_seconds
        self.max_events = max_events
        self._events: list = []  # all BBO events
        self._last_bbo: BBOEvent = None

        # OFI per bin
        self._ofi_bins: dict = {}  # {bin_start_ts: ofi_value}
        self._mid_deltas: dict = {}  # {bin_start_ts: mid_change_in_ticks}

        # Running regression stats
        self._n_obs = 0
        self._sum_x = 0.0
        self._sum_y = 0.0
        self._sum_xx = 0.0
        self._sum_xy = 0.0

        # Rolling window for recent regressions
        self._rolling_window = deque(maxlen=500)

    def add_bbo(self, bid_price: float, bid_size: float,
                 ask_price: float, ask_size: float,
                 ts: float = None) -> dict:
        """
        Process one BBO snapshot. Returns current OFI for the active bin.

        Args:
            bid_price: Best bid price
            bid_size: Best bid size (contracts)
            ask_price: Best ask price
            ask_size: Best ask size (contracts)
            ts: Timestamp (defaults to time.time())

        Returns:
            {
                "ofi": current bin OFI or None,
                "e_n": latest event impact,
                "mid": current mid,
                "bin_active": how far into current bin (seconds),
                "event_count": events in current bin,
            }
        """
        ts = ts or time.time()
        mid = (bid_price + ask_price) / 2.0
        current = BBOEvent(ts, bid_price, bid_size, ask_price, ask_size, mid)

        result = {
            "ofi": None,
            "e_n": 0.0,
            "mid": mid,
            "bin_active": 0.0,
            "event_count": 0,
        }

        if self._last_bbo is not None:
            prev = self._last_bbo
            # Compute event impact e_n
            # I(PB_n ≥ PB_{n-1}) * QB_n  -  I(PB_n ≤ PB_{n-1}) * QB_{n-1}
            # - I(PA_n ≤ PA_{n-1}) * QA_n  + I(PA_n ≥ PA_{n-1}) * QA_{n-1}
            e_n = (
                (1.0 if current.bid_price >= prev.bid_price else 0.0) * current.bid_size
                - (1.0 if current.bid_price <= prev.bid_price else 0.0) * prev.bid_size
                - (1.0 if current.ask_price <= prev.ask_price else 0.0) * current.ask_size
                + (1.0 if current.ask_price >= prev.ask_price else 0.0) * prev.ask_size
            )
            result["e_n"] = round(e_n, 4)

            # Check for bin boundary
            bin_start = (ts // self.bin_seconds) * self.bin_seconds
            prev_bin_start = (prev.ts // self.bin_seconds) * self.bin_seconds

            if bin_start != prev_bin_start:
                # Close previous bin
                self._close_bin(prev_bin_start, prev)
                # Start new bin
                self._ofi_bins[bin_start] = 0.0
                self._ofi_bins[f"{bin_start}_events"] = 0
                self._ofi_bins[f"{bin_start}_start_mid"] = mid

            # Add to current bin
            if bin_start not in self._ofi_bins:
                self._ofi_bins[bin_start] = 0.0
                self._ofi_bins[f"{bin_start}_events"] = 0
                self._ofi_bins[f"{bin_start}_start_mid"] = mid

            self._ofi_bins[bin_start] += e_n
            self._ofi_bins[f"{bin_start}_events"] += 1

            result["ofi"] = round(self._ofi_bins[bin_start], 4)
            result["bin_active"] = round(ts - bin_start, 2)
            result["event_count"] = self._ofi_bins[f"{bin_start}_events"]

        # Store
        self._events.append(current)
        if len(self._events) > self.max_events:
            self._events.pop(0)
        self._last_bbo = current

        return result

    def _close_bin(self, bin_start: float, last_bbo: BBOEvent):
        """Close a bin: compute mid delta and record for regression."""
        bin_key = bin_start
        bin_events_key = f"{bin_start}_events"
        start_mid_key = f"{bin_start}_start_mid"

        if bin_key in self._ofi_bins and start_mid_key in self._ofi_bins:
            ofi_val = self._ofi_bins[bin_key]
            start_mid = self._ofi_bins[start_mid_key]
            mid_delta = (last_bbo.mid_price - start_mid) / self.tick_size

            self._mid_deltas[bin_start] = round(mid_delta, 4)

            # Record for regression
            self._rolling_window.append((ofi_val, mid_delta))
            self._n_obs += 1
            self._sum_x += ofi_val
            self._sum_y += mid_delta
            self._sum_xx += ofi_val ** 2
            self._sum_xy += ofi_val * mid_delta

        # Cleanup old bins (keep last 100)
        to_delete = []
        for k in list(self._ofi_bins.keys()):
            if isinstance(k, (int, float)) and k < bin_start - 100 * self.bin_seconds:
                to_delete.append(k)
        for k in to_delete:
            self._ofi_bins.pop(k, None)
            self._ofi_bins.pop(f"{k}_events", None)
            self._ofi_bins.pop(f"{k}_start_mid", None)
            self._mid_deltas.pop(k, None)

    def get_regression(self) -> dict:
        """Compute current OLS regression: Δmid = α + β·OFI

        Returns:
            {
                "beta": β coefficient,
                "alpha": α coefficient,
                "r_squared": R²,
                "n_observations": count,
                "interpretation": str,
            }
        """
        n = self._n_obs
        if n < 3:
            return {"beta": 0, "alpha": 0, "r_squared": 0,
                    "n_observations": n,
                    "interpretation": "Insufficient data (< 3 bins)"}

        # Use rolling window for current estimates
        window_data = list(self._rolling_window)
        if len(window_data) < 3:
            return {"beta": 0, "alpha": 0, "r_squared": 0,
                    "n_observations": n, "interpretation": "Insufficient rolling data"}

        xs = [w[0] for w in window_data]
        ys = [w[1] for w in window_data]

        n_w = len(window_data)
        mean_x = sum(xs) / n_w
        mean_y = sum(ys) / n_w

        # β = Σ((x-mean_x)(y-mean_y)) / Σ((x-mean_x)²)
        # window_data = [(ofi, delta), ...], xs = [ofi, ...], ys = [delta, ...]
        num = sum((x_val - mean_x) * (y_val - mean_y) for x_val, y_val in window_data)
        den = sum((x_val - mean_x)**2 for x_val in xs)
        beta = num / den if den != 0 else 0.0

        alpha = mean_y - beta * mean_x

        # R² = 1 - SS_res / SS_tot
        ss_res = sum((y_val - (alpha + beta * x_val))**2 for x_val, y_val in window_data)
        ss_tot = sum((y - mean_y)**2 for y in ys)
        r_sq = 1.0 - (ss_res / ss_tot) if ss_tot != 0 else 0.0

        # Interpret: β > 0 = OFI predicts price direction
        if beta > 0.01:
            interp = (f"OFI predicts price with β={beta:.4f}. "
                      f"{10000 * beta:.0f} contracts net OFI → ~{10000 * beta:.0f} ticks move.")
        elif beta < -0.01:
            interp = "OFI predicting inverted (negative β — possible data error or regime shift)"
        else:
            interp = "No predictive relationship (β near 0)"

        return {
            "beta": round(beta, 6),
            "alpha": round(alpha, 6),
            "r_squared": round(r_sq, 4),
            "n_observations": n_w,
            "total_bins_seen": n,
            "interpretation": interp,
        }

    def get_current_ofi_state(self) -> dict:
        """Return current OFI state for the active bin."""
        now = time.time()
        bin_start = (now // self.bin_seconds) * self.bin_seconds

        ofi = self._ofi_bins.get(bin_start, 0.0)
        events = self._ofi_bins.get(f"{bin_start}_events", 0)
        start_mid = self._ofi_bins.get(f"{bin_start}_start_mid", None)

        return {
            "ofi": round(ofi, 4),
            "bin_seconds": self.bin_seconds,
            "events_in_bin": events,
            "seconds_into_bin": round(now - bin_start, 2),
            "start_mid": start_mid,
            "current_mid": self._last_bbo.mid_price if self._last_bbo else None,
        }

    def reset(self):
        """Reset all state."""
        self._events.clear()
        self._last_bbo = None
        self._ofi_bins.clear()
        self._mid_deltas.clear()
        self._n_obs = 0
        self._sum_x = self._sum_y = self._sum_xx = self._sum_xy = 0.0
        self._rolling_window.clear()


# Quick self-test
if __name__ == "__main__":
    import random

    ofi_calc = OFICalculator(tick_size=0.1, bin_seconds=10)

    # Simulate 200 BBO events over ~30 seconds (about right for HL L2)
    bid = 100.0
    ask = 100.1
    for i in range(200):
        ts = time.time() + i * 0.15
        # Add some noise to simulate real book
        bid_noise = random.gauss(0, 0.02)
        ask_noise = random.gauss(0, 0.02)
        bid_size = 500 + random.gauss(0, 200)
        ask_size = 500 + random.gauss(0, 200)

        result = ofi_calc.add_bbo(
            bid + bid_noise, max(0, bid_size),
            ask + ask_noise, max(0, ask_size),
            ts=ts
        )

        if result["ofi"] is not None and i % 20 == 0:
            print(f"Event {i:3d}: e_n={result['e_n']:+8.1f}  OFI={result['ofi']:+8.1f}  "
                  f"mid={result['mid']:.2f}  bin={result['bin_active']:.1f}s")

    reg = ofi_calc.get_regression()
    print()
    print("=" * 60)
    print("OLS Regression Results (simulated data)")
    print("=" * 60)
    print(f"  β (OFI coefficient): {reg['beta']}")
    print(f"  α (intercept):        {reg['alpha']}")
    print(f"  R²:                   {reg['r_squared']}")
    print(f"  Observations:         {reg['n_observations']}")
    print(f"  Interpretation:       {reg['interpretation']}")
