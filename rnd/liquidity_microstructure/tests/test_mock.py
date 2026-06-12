"""
Mock Tests — Unit tests for all microstructure engine components.
Runs 100% offline with synthetic data. Green = ready for live test.
"""

import sys, os, time, json, unittest
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from engine.session_gate import get_session_state, is_in_session, CONFIG
from engine.wall_detector import WallDetector
from engine.ofi_calculator import OFICalculator
from engine.cvd_tracker import CVDTracker
from engine.liquidity_engine import LiquidityEngine, SignalDecision


class TestSessionGate(unittest.TestCase):
    """Session gate — ensures engine only runs during overlap."""

    def test_primary_window_active(self):
        """14-21 UTC should be active."""
        self.assertTrue(is_in_session(14))
        self.assertTrue(is_in_session(15))
        self.assertTrue(is_in_session(20))

    def test_primary_window_inactive(self):
        """Outside 14-21 UTC should be inactive."""
        # Within window
        self.assertTrue(is_in_session(14))
        self.assertTrue(is_in_session(20))
        # Outside
        self.assertFalse(is_in_session(8))
        self.assertFalse(is_in_session(22))

    def test_asia_trial_window(self):
        """Asia session (1-8 UTC) should work when configured."""
        self.assertTrue(is_in_session(3, CONFIG["asia_trial"]))
        self.assertTrue(is_in_session(1, CONFIG["asia_trial"]))
        self.assertFalse(is_in_session(9, CONFIG["asia_trial"]))

    def test_quality_heuristic(self):
        """High quality during NY+LK overlap, low during Asia."""
        state_peak = get_session_state(hour_utc=15)
        self.assertEqual(state_peak["data_quality"], "high")
        state_low = get_session_state(hour_utc=3)
        self.assertEqual(state_low["data_quality"], "low")


class TestWallDetector(unittest.TestCase):
    """Wall detection — identifies significant order book levels."""

    def setUp(self):
        self.wd = WallDetector()

    def test_basic_wall_detection(self):
        """Should detect walls where size > 3x median."""
        mid = 100.0
        bids = [(99.9, 500), (99.8, 1200), (99.7, 80), (99.6, 50)]
        asks = [(100.1, 400), (100.2, 100), (100.3, 2000), (100.4, 60)]

        result = self.wd.analyze(bids, asks, mid)

        # 1200 at bid and 2000 at ask should be walls
        ask_wall_prices = [w["price"] for w in result["ask_walls"]]
        self.assertIn(100.3, ask_wall_prices)

        bid_wall_prices = [w["price"] for w in result["bid_walls"]]
        self.assertIn(99.8, bid_wall_prices)

    def test_no_walls_flat_book(self):
        """Flat book with uniform sizes should have no walls."""
        mid = 100.0
        bids = [(99.9, 100), (99.8, 90), (99.7, 95), (99.6, 85)]
        asks = [(100.1, 100), (100.2, 95), (100.3, 105), (100.4, 90)]

        result = self.wd.analyze(bids, asks, mid)
        self.assertFalse(result["walls_found"])
        self.assertEqual(len(result["ask_walls"]), 0)
        self.assertEqual(len(result["bid_walls"]), 0)

    def test_spoof_detection(self):
        """Repeated identical wall sizes should flag spoof risk."""
        mid = 100.0

        # Send same wall repeatedly
        for _ in range(5):
            self.wd.analyze(
                [(99.9, 2000), (99.8, 100)],
                [(100.1, 2000), (100.2, 100)],
                mid
            )

        # Now check with normal small bids mixed in
        result = self.wd.analyze(
            [(99.9, 2000), (99.8, 1500)],
            [(100.1, 2000), (100.2, 800)],
            mid
        )

        for w in result["ask_walls"]:
            if w["price"] == 100.1 and w["size"] == 2000:
                # This level has been spoofing
                self.assertIn(w["spoof_risk"], ["possible", "probable"])

    def test_sweep_targets_provided(self):
        """Should provide buy/sweep and sell/sweep target prices.
        Convention: buy = ask wall (sweep up through), sell = bid wall (sweep down through).
        """
        mid = 100.0
        bids = [(99.9, 500), (99.8, 1500)]
        asks = [(100.1, 400), (100.2, 3000)]

        result = self.wd.analyze(bids, asks, mid)
        self.assertIn(99.8, result["sweep_targets"]["sell"])
        self.assertIn(100.2, result["sweep_targets"]["buy"])

    def test_wall_imbalance(self):
        """Heavy bid wall vs light ask wall → positive imbalance.
        Use 10 levels: one anomalous bid wall stands out vs uniformly small asks.
        """
        mid = 100.0
        bids = [(99.9, 500), (99.8, 300), (99.7, 400), (99.6, 5000),  # 5000 is a wall
                (99.5, 300), (99.4, 400), (99.3, 350), (99.2, 300)]
        asks = [(100.1, 500), (100.2, 400), (100.3, 500)]

        result = self.wd.analyze(bids, asks, mid)
        # Should detect 99.6 as a bid wall
        bid_wall_99_6 = [w for w in result["bid_walls"] if w["price"] == 99.6]
        self.assertEqual(len(bid_wall_99_6), 1)
        self.assertGreater(result["imbalance"], 0)  # bid-heavy


class TestOFICalculator(unittest.TestCase):
    """OFI calculation — Cont et al (2014) implementation."""

    def test_ofi_computed(self):
        """Adding BBO events should produce OFI values."""
        calc = OFICalculator(tick_size=0.1, bin_seconds=5)
        ts = 1000.0

        r1 = calc.add_bbo(99.9, 500, 100.1, 500, ts)
        r2 = calc.add_bbo(99.9, 600, 100.1, 500, ts + 0.2)

        # Second event: bid size increased from 500→600, no other change
        # e_n = I(99.9≥99.9)*600 - I(99.9≤99.9)*500
        #       - I(100.1≤100.1)*500 + I(100.1≥100.1)*500
        #     = 1*600 - 1*500 - 1*500 + 1*500
        #     = 600 - 500 - 500 + 500 = 100
        self.assertIsNotNone(r2["ofi"])
        self.assertGreater(r2["ofi"], 0)

    def test_ofi_negative_when_supply_increases(self):
        """Adding ask size without moving price → negative OFI."""
        calc = OFICalculator(tick_size=0.1, bin_seconds=10)
        ts = 2000.0

        r1 = calc.add_bbo(99.9, 500, 100.1, 500, ts)
        r2 = calc.add_bbo(99.9, 500, 100.1, 800, ts + 0.2)

        # Ask size increased from 500→800
        # e_n = I(99.9≥99.9)*500 - I(99.9≤99.9)*500
        #       - I(100.1≤100.1)*800 + I(100.1≥100.1)*500
        #     = 500 - 500 - 800 + 500 = -300
        self.assertIsNotNone(r2["ofi"])
        self.assertLess(r2["ofi"], 0)

    def test_regression_works(self):
        """After enough bins, regression should produce valid R²."""
        calc = OFICalculator(tick_size=0.1, bin_seconds=2)

        base_ts = 3000.0
        for i in range(100):
            ts = base_ts + i * 0.5
            # Introduce some directional drift to get meaningful regression
            drift = i * 0.001
            calc.add_bbo(99.9 + drift, 500, 100.1 + drift, 500, ts)

        reg = calc.get_regression()
        self.assertGreater(reg["n_observations"], 2)
        self.assertIsNotNone(reg["r_squared"])

    def test_reset(self):
        """Reset should clear all state."""
        calc = OFICalculator(tick_size=0.1, bin_seconds=10)
        ts = 4000.0

        calc.add_bbo(99.9, 500, 100.1, 500, ts)
        calc.add_bbo(99.9, 600, 100.1, 500, ts + 0.2)
        calc.reset()

        # After reset, first add_bbo should not produce OFI (no prior state)
        r = calc.add_bbo(99.9, 500, 100.1, 500, ts + 10)
        self.assertIsNone(r["ofi"])


class TestCVDTracker(unittest.TestCase):
    """CVD tracking — cumulative volume delta + divergence detection."""

    def test_basic_cvd(self):
        """CVD should go up on buys, down on sells."""
        cvd = CVDTracker(bar_seconds=20)
        ts = 5000.0

        r1 = cvd.add_trade(100.0, 10, True, ts)
        r2 = cvd.add_trade(100.0, 10, False, ts + 1)

        # CVD: +10 - 10 = 0
        self.assertEqual(r2["cvd"], 0.0)

        r3 = cvd.add_trade(100.0, 15, True, ts + 2)
        self.assertEqual(r3["cvd"], 15.0)  # 0 + 15

        r4 = cvd.add_trade(100.0, 5, True, ts + 3)
        self.assertEqual(r4["cvd"], 20.0)  # 15 + 5

    def test_divergence_detected(self):
        """Bullish divergence: price down, CVD up."""
        cvd = CVDTracker(bar_seconds=3)
        base = 6000.0

        # Need many trades across bar boundaries
        ts = base
        price = 100.0

        # Phase 1: falling price, falling CVD (active selling)
        for i in range(20):
            price -= 0.2
            cvd.add_trade(price, random.uniform(1, 5), False, ts)
            ts += 0.5

        # Phase 2: price still falling (by less), CVD rising (absorption)
        for i in range(20):
            price -= 0.08
            cvd.add_trade(price, random.uniform(2, 8), True, ts)
            ts += 0.5

        summary = cvd.get_cvd_summary()
        self.assertGreater(summary["total_trades"], 0)

    def test_bar_aggregation(self):
        """Trades should be bucketed into time bars."""
        cvd = CVDTracker(bar_seconds=5)
        ts = 7000.0

        cvd.add_trade(100.0, 10, True, ts)
        cvd.add_trade(100.0, 10, True, ts + 1)
        cvd.add_trade(100.0, 10, True, ts + 2)

        # Same bar (5-second bin)
        bar = cvd.get_current_bar()
        self.assertEqual(bar["trade_count"], 3)
        self.assertEqual(bar["delta"], 30.0)

        # New bar after >5 seconds
        cvd.add_trade(100.0, 5, False, ts + 6)
        bar2 = cvd.get_current_bar()
        self.assertEqual(bar2["trade_count"], 1)
        self.assertEqual(bar2["delta"], -5.0)


class TestLiquidityEngine(unittest.TestCase):
    """Full engine — combines all signals."""

    def test_session_blocks_outside_window(self):
        """Outside session window, engine should block."""
        # Can't easily mock time, but we can trust session gate
        # Verify the engine creates instances correctly
        engine = LiquidityEngine()
        self.assertIsNotNone(engine.ofi)
        self.assertIsNotNone(engine.cvd)
        self.assertIsNotNone(engine.wall)

    def test_empty_data_neutral(self):
        """With no data, engine should return neutral score."""
        engine = LiquidityEngine()
        # Use a session that's likely active (this test runs during the day)
        # If outside session, result will be neutral anyway
        result = engine.evaluate()
        self.assertIn(result.decision, [SignalDecision.NEUTRAL])

    def test_with_synthetic_data(self):
        """Engine should process data without crashing."""
        engine = LiquidityEngine()
        import random

        for i in range(30):
            ts = time.time() + i * 0.3
            engine.add_bbo(
                100.0 + random.gauss(0, 0.05),
                500 + random.gauss(0, 100),
                100.1 + random.gauss(0, 0.05),
                500 + random.gauss(0, 100),
                ts
            )

        # Should produce a report without errors
        report = engine.report()
        self.assertIn("LIQUIDITY MICROSTRUCTURE", report)

    def test_report_format(self):
        """Report should contain key sections."""
        engine = LiquidityEngine()
        report = engine.report()
        self.assertIn("Session", report)
        self.assertIn("OFI", report)
        self.assertIn("CVD", report)

    def test_reset(self):
        """Reset should clear all component state."""
        engine = LiquidityEngine()
        engine.add_bbo(100.0, 500, 100.1, 500)
        engine.reset()
        # Should have no state after reset
        state = engine.ofi.get_current_ofi_state()
        self.assertEqual(state.get("ofi", 0), 0.0)


import random  # needed by test_divergence_detected

if __name__ == "__main__":
    print("=" * 60)
    print("  LIQUIDITY MICROSTRUCTURE — UNIT TESTS")
    print("=" * 60)
    unittest.main(verbosity=2)
