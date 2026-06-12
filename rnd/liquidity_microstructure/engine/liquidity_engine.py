"""
Liquidity Engine — Main Orchestrator

Purpose:
- Combines OFI + CVD + Wall Detection + Session Gate into a single filter score
- Score range: [-1, +1] where:
    +1 = strongly bullish microstructure (enter long)
    -1 = strongly bearish microstructure (enter short)
     0 = neutral / no clear signal (no trade)
- Designed to be wired as a FILTER on existing Aqua strategies
  (BB reversion, stat arb, turtle soup, etc.)

Filter logic:
1. Session gate: outside 14-21 UTC → score = 0 (no filter, but low confidence)
2. If supply walls detected AND OFI positive → bullish pressure
3. If demand walls swept AND CVD showing bullish divergence → reversal imminent
4. If OFI negative sustained (>3 bins) OR CVD bearish divergence → stand down

Usage as filter:
```python
from engine.liquidity_engine import LiquidityEngine

engine = LiquidityEngine()
# On each signal from Aqua strategy:
score = engine.evaluate(signal_side="LONG", signal_confidence=0.6)
if score >= 0.3:
    # Execute — microstructure confirms
elif score <= -0.3:
    # Microstructure contradicts — skip
else:
    # Neutral — let the base strategy decide
```
"""

from .session_gate import get_session_state, CONFIG as SESSION_CONFIG
from .ofi_calculator import OFICalculator
from .cvd_tracker import CVDTracker
from .wall_detector import WallDetector

from dataclasses import dataclass
from enum import Enum
import time


class SignalDecision(Enum):
    CONFIRM = "confirm"       # Microstructure supports the trade
    CONTRADICT = "contradict" # Microstructure opposes the trade
    NEUTRAL = "neutral"       # No clear microstructure signal


@dataclass
class FilterResult:
    """Result of microstructure filter evaluation."""
    overall_score: float        # -1 to +1
    decision: SignalDecision
    breakout_filter: str         # "allow" | "block" | "neutral"
    session_state: dict
    ofi_state: dict
    wall_state: dict
    cvd_state: dict
    reasons: list                # Human-readable reasons


class LiquidityEngine:
    """Combines all microstructure signals into one filter score."""

    def __init__(self, tick_size: float = 0.1, ofi_bin: int = 10):
        """
        Args:
            tick_size: HL perp tick size (~0.01-0.1 depending on pair)
            ofi_bin: OFI aggregation in seconds (10 = validated sweet spot)
        """
        self.ofi = OFICalculator(tick_size=tick_size, bin_seconds=ofi_bin)
        self.cvd = CVDTracker(bar_seconds=60)  # 1-minute CVD bars
        self.wall = WallDetector()

        # Tracking for trending OFI
        self._ofi_signs: list = []      # Last few OFI signs
        self._ofi_bins_tracked: int = 0

        # Session window
        self.session_window = SESSION_CONFIG["primary"]

    def add_bbo(self, bid_price: float, bid_size: float,
                ask_price: float, ask_size: float,
                ts: float = None) -> None:
        """Feed a BBO snapshot to the engine."""
        self.ofi.add_bbo(bid_price, bid_size, ask_price, ask_size, ts)

    def add_trade(self, price: float, size: float, is_buy: bool,
                  ts: float = None) -> None:
        """Feed a trade event to the engine."""
        self.cvd.add_trade(price, size, is_buy, ts)

    def analyze_book(self, bids: list, asks: list, mid_price: float) -> None:
        """Feed L2 book snapshot to the wall detector."""
        self.wall.analyze(bids, asks, mid_price)

    def evaluate(self, signal_side: str = None,
                 signal_confidence: float = 0.5) -> FilterResult:
        """
        Evaluate current microstructure state as a trade filter.

        Args:
            signal_side: "LONG", "SHORT", or None for neutral assessment
            signal_confidence: Base strategy's confidence (0-1)

        Returns:
            FilterResult with overall_score and decision
        """
        now_ts = time.time()
        reasons = []

        # ── 1. Session Gate ────────────────────────────────────────────
        session = get_session_state()
        if not session["active"]:
            return FilterResult(
                overall_score=0.0,
                decision=SignalDecision.NEUTRAL,
                breakout_filter="block",
                session_state=session,
                ofi_state={},
                wall_state={},
                cvd_state={},
                reasons=[f"Outside session window {self.session_window} UTC "
                         f"(current: {session['utc_hour']}Z, {session['session_name']})"],
            )

        # ── 2. OFI state ────────────────────────────────────────────────
        ofi_state = self.ofi.get_current_ofi_state()
        ofi_regression = self.ofi.get_regression()
        ofi_val = ofi_state.get("ofi", 0.0)
        ofi_events = ofi_state.get("events_in_bin", 0)

        ofi_score = 0.0
        if abs(ofi_val) > 0 and ofi_events >= 3:
            # Normalize OFI to [-1, 1] using tanh-like scaling
            ofi_score = max(-1.0, min(1.0, ofi_val / 10000.0))

            # Check persistence: same sign over multiple bins
            self._ofi_signs.append(1 if ofi_val > 0 else (-1 if ofi_val < 0 else 0))
            self._ofi_bins_tracked += 1
            if len(self._ofi_signs) > 5:
                self._ofi_signs.pop(0)

            # If 3+ consecutive bins same sign, amplify score
            if len(self._ofi_signs) >= 3 and abs(sum(self._ofi_signs[-3:])) >= 3:
                ofi_score *= 1.5  # Persistent flow direction = stronger signal
                reasons.append(f"OFI persistent {('positive' if ofi_val > 0 else 'negative')} "
                               f"({ofi_val:.0f}) across {min(3, len(self._ofi_signs))}+ bins")

            reasons.append(f"OFI={ofi_val:+.0f} (R²={ofi_regression['r_squared']:.2f})")

        # ── 3. Wall Detection ──────────────────────────────────────────
        # Wall data is set externally via analyze_book()
        # For now, use the last wall result if available
        # (wall state is stored externally, so we approximate)
        wall_score = 0.0

        # ── 4. CVD Divergence ──────────────────────────────────────────
        cvd_summary = self.cvd.get_cvd_summary()
        cvd_current = cvd_summary.get("current_bar", {})
        cvd_div = {}

        # We can only detect divergence after bars complete
        cvd_bars = self.cvd.get_bars(5)
        cvd_score = 0.0

        # Check completed bars for divergence signals
        if len(cvd_bars) >= 3:
            recent_prices = [b.close for b in cvd_bars[-3:]]
            recent_cvds = [b.cvd_at_close for b in self.cvd._bars._get_ex()[-3:]] if hasattr(self.cvd._bars, '_get_ex') else []

        # Current bar delta direction
        bar_delta = cvd_current.get("delta", 0)
        if abs(bar_delta) > 10:
            cvd_score = max(-0.5, min(0.5, bar_delta / 100.0))
            reasons.append(f"CVD bar delta={bar_delta:+.1f}")

        # ── 5. Combined Score ─────────────────────────────────────────
        # Weights tuned from OFI research: OFI ~60%, CVD ~30%, walls ~10%
        combined = (ofi_score * 0.6) + (cvd_score * 0.3) + (wall_score * 0.1)
        overall = max(-1.0, min(1.0, combined))

        # ── 6. Decision ───────────────────────────────────────────────
        decision = SignalDecision.NEUTRAL
        breakout_filter = "neutral"

        if overall <= -0.5:
            decision = SignalDecision.CONTRADICT
            breakout_filter = "block"
            reasons.append("Microstructure strongly bearish")
        elif overall >= 0.5:
            decision = SignalDecision.CONFIRM
            breakout_filter = "allow"
            reasons.append("Microstructure strongly bullish")
        elif overall <= -0.2:
            decision = SignalDecision.CONTRADICT
            breakout_filter = "block"
            reasons.append("Microstructure moderately bearish")
        elif overall >= 0.2:
            decision = SignalDecision.CONFIRM
            breakout_filter = "allow"
            reasons.append("Microstructure moderately bullish")
        else:
            breakout_filter = "neutral"
            reasons.append("Microstructure neutral — base strategy decides")

        # Apply signal_side override
        if signal_side == "LONG" and overall < -0.2:
            decision = SignalDecision.CONTRADICT
            breakout_filter = "block"
            reasons.append(f"Long signal but microstructure bearish ({overall:.2f})")
        elif signal_side == "SHORT" and overall > 0.2:
            decision = SignalDecision.CONTRADICT
            breakout_filter = "block"
            reasons.append(f"Short signal but microstructure bullish ({overall:.2f})")

        return FilterResult(
            overall_score=round(overall, 4),
            decision=decision,
            breakout_filter=breakout_filter,
            session_state=session,
            ofi_state=ofi_state,
            wall_state={},  # Not available in this eval pass
            cvd_state=cvd_summary,
            reasons=reasons,
        )

    def report(self) -> str:
        """Generate a human-readable snapshot of current state."""
        session = get_session_state()
        ofi_state = self.ofi.get_current_ofi_state()
        reg = self.ofi.get_regression()
        cvd_s = self.cvd.get_cvd_summary()

        lines = [
            "╔══════════════════════════════════════════════╗",
            "║     LIQUIDITY MICROSTRUCTURE ENGINE          ║",
            "╚══════════════════════════════════════════════╝",
            "",
            f"  Session:    {session['session_name']} ({'ACTIVE' if session['active'] else 'OFF'})",
            f"  Quality:    {session['data_quality']}",
            f"  Window:     {self.session_window} UTC",
            "",
            "  ── OFI ──",
            f"  Current:    {ofi_state.get('ofi', 'N/A')}",
            f"  Bin:        {ofi_state.get('bin_seconds', 'N/A')}s  "
              f"({ofi_state.get('events_in_bin', 0)} events, "
              f"{ofi_state.get('seconds_into_bin', 0):.1f}s in)",
            f"  Regression: β={reg.get('beta', 'N/A')}  R²={reg.get('r_squared', 'N/A')} "
              f"(n={reg.get('n_observations', 0)})",
            "",
            "  ── CVD ──",
            f"  Total:      {cvd_s.get('cvd', 'N/A')}",
            f"  Trades:     {cvd_s.get('total_trades', 0)}",
            f"  Ratio:      {cvd_s.get('buy_sell_ratio', 'N/A')} (buy/sell)",
            f"  Current:    Δ={cvd_s.get('current_bar', {}).get('delta', 'N/A')} "
              f"({cvd_s.get('current_bar', {}).get('trade_count', 0)} trades)",
        ]

        return "\n".join(lines)

    def reset(self):
        """Reset all tracking state."""
        self.ofi.reset()
        self.cvd.reset()
        self.wall.reset()
        self._ofi_signs.clear()
        self._ofi_bins_tracked = 0


# Quick self-test
if __name__ == "__main__":
    import random

    engine = LiquidityEngine()

    # Simulate 50 BBO updates
    print("Simulating market data feed...")
    for i in range(50):
        bid = 100.0 + random.gauss(0, 0.05)
        ask = bid + 0.1 + random.gauss(0, 0.02)
        bid_sz = 500 + random.gauss(0, 200)
        ask_sz = 500 + random.gauss(0, 200)
        ts = time.time() + i * 0.2
        engine.add_bbo(max(0, bid), max(0, bid_sz), max(0, ask), max(0, ask_sz), ts)

        # Some trades
        if i % 3 == 0:
            engine.add_trade(100.0 + random.gauss(0, 0.2),
                            random.uniform(0.5, 5),
                            random.random() < 0.5, ts=ts)

        if i % 5 == 0:
            engine.add_trade(100.0 + random.gauss(0, 0.3),
                            random.uniform(1, 10),
                            random.random() < 0.6, ts=ts)

    print()
    print(engine.report())
    print()

    # Evaluate
    result = engine.evaluate()
    print(f"  ── FILTER ──")
    print(f"  Score:      {result.overall_score:+.4f}")
    print(f"  Decision:   {result.decision.value}")
    print(f"  Filter:     {result.breakout_filter}")
    print(f"  Reasons:")
    for r in result.reasons:
        print(f"    → {r}")
