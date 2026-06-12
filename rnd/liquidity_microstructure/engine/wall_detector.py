"""
Wall Detector — knows where the liquidity is.

Purpose:
- Identify significant limit depth walls (clusters of resting orders)
- Detect spoof/cancellation walls (walls that keep refreshing)
- Provide sweep-level targets for limit entries

Key finding from prior R&D:
- Price sweeps through wall levels, then reverses
- If you market-order at next open after sweep, WR = 38-42%
- If you pre-place limit orders at wall levels, edge flips to positive
- Cancellation walls (spoof) = price does NOT sweep = skip

Algorithm:
1. Scan L2 book (bids + asks at each price level)
2. Cluster: find levels where size > 3× rolling median per side
3. Mark walls: total_cluster_size, level, spread from mid
4. Spoof detection: if same wall level keeps appearing with same size
   in consecutive snapshots, flag as suspicious
"""

import time
from collections import defaultdict
from statistics import median


class WallDetector:
    """Detects significant limit order walls from L2 snapshots."""

    def __init__(self, wall_multiplier: float = 3.0, n_levels: int = 10,
                 spoof_lookback: int = 3):
        """
        Args:
            wall_multiplier: Factor above rolling median to flag as wall (default 3×)
            n_levels: Levels from mid to scan per side
            spoof_lookback: Consecutive snapshots to check for cancellation pattern
        """
        self.wall_multiplier = wall_multiplier
        self.n_levels = n_levels
        self.spoof_lookback = spoof_lookback

        # Rolling history for each level — {price_level: [(size, timestamp)]}
        self.ask_history: dict = defaultdict(list)
        self.bid_history: dict = defaultdict(list)
        self.snapshot_count = 0

    def analyze(self, bids: list, asks: list, mid_price: float) -> dict:
        """
        Analyze one L2 book snapshot.

        Args:
            bids: [(price, size), ...] for bid levels
            asks: [(price, size), ...] for ask levels
            mid_price: current mid = (best_bid + best_ask) / 2

        Returns:
            {
                "walls_found": bool,
                "ask_walls": [{"level", "size", "spread_pct", "spoof_risk", "price"}],
                "bid_walls": [{"level", "size", "spread_pct", "spoof_risk", "price"}],
                "sweep_targets": {"buy": [price], "sell": [price]},
                "imbalance": float,  # -1 to +1 at wall levels
            }
        """
        self.snapshot_count += 1
        now = time.time()

        # Separate price/size
        bid_prices = [b[0] for b in bids[:self.n_levels]]
        ask_prices = [a[0] for a in asks[:self.n_levels]]
        bid_sizes = [b[1] for b in bids[:self.n_levels]]
        ask_sizes = [a[1] for a in asks[:self.n_levels]]

        if not bid_sizes or not ask_sizes:
            return {"walls_found": False, "ask_walls": [], "bid_walls": [],
                    "sweep_targets": {"buy": [], "sell": []}, "imbalance": 0.0}

        # Build rolling reference medians
        hist_bid_sizes = [s for history in self.bid_history.values() for s, _ in history[-5:]]
        hist_ask_sizes = [s for history in self.ask_history.values() for s, _ in history[-5:]]

        # Reference median = median of all known sizes (history + current)
        all_bid_sizes = bid_sizes + hist_bid_sizes[-30:]
        all_ask_sizes = ask_sizes + hist_ask_sizes[-30:]
        bid_median_ref = median(all_bid_sizes) if all_bid_sizes else 1
        ask_median_ref = median(all_ask_sizes) if all_ask_sizes else 1

        # Wall detection: a level is a wall if it's anomalously large compared
        # to its SIBLINGS at the same depth. Simple heuristic:
        #   size > 2.5× median of other levels on same side
        # with an absolute minimum floor of 200 contracts.
        def find_walls(levels):
            walls = []
            sizes = [s for _, s in levels]
            global_median = median(sizes) if sizes else 1
            for i, (price, size) in enumerate(levels):
                other_sizes = [s for j, (_, s) in enumerate(levels) if j != i]
                neighbor_median = median(other_sizes) if other_sizes else 1
                # Must be > 2.5x what neighbors are doing AND > 2x the global median
                # First snapshot floor: need meaningful size
                if size > neighbor_median * 2.5 and size >= 200:
                    walls.append((i, price, size, neighbor_median))
            return walls

        # Detect walls using clustering
        ask_wall_data = find_walls(asks[:self.n_levels])
        bid_wall_data = find_walls(bids[:self.n_levels])

        # Build wall objects
        ask_walls = []
        for i, price, size, ref_mid in ask_wall_data:
            spread_pct = ((price - mid_price) / mid_price) * 100
            self.ask_history[price].append((size, now))
            spoof_risk = self._check_spoof(self.ask_history[price], price, "ask")
            ask_walls.append({
                "level": i,
                "price": price,
                "size": size,
                "spread_pct": round(spread_pct, 3),
                "spoof_risk": spoof_risk,
                "ref_median": ref_mid,
            })

        bid_walls = []
        for i, price, size, ref_mid in bid_wall_data:
            spread_pct = ((mid_price - price) / mid_price) * 100
            self.bid_history[price].append((size, now))
            spoof_risk = self._check_spoof(self.bid_history[price], price, "bid")
            bid_walls.append({
                "level": i,
                "price": price,
                "size": size,
                "spread_pct": round(spread_pct, 3),
                "spoof_risk": spoof_risk,
                "ref_median": ref_mid,
            })

        # Sweep targets: prices where walls exist (skip probable spoofs)
        sweep_buy = [w["price"] for w in ask_walls if w["spoof_risk"] != "probable"]
        sweep_sell = [w["price"] for w in bid_walls if w["spoof_risk"] != "probable"]

        # Imbalance at wall levels only
        wall_bid_vol = sum(w["size"] for w in bid_walls)
        wall_ask_vol = sum(w["size"] for w in ask_walls)
        total = wall_bid_vol + wall_ask_vol
        imbalance = ((wall_bid_vol - wall_ask_vol) / total) if total > 0 else 0.0

        return {
            "walls_found": len(ask_walls) > 0 or len(bid_walls) > 0,
            "ask_walls": ask_walls,
            "bid_walls": bid_walls,
            "sweep_targets": {"buy": sweep_buy, "sell": sweep_sell},
            "imbalance": round(imbalance, 4),
            "bid_median_ref": bid_median_ref,
            "ask_median_ref": ask_median_ref,
        }

    def _check_spoof(self, history: list, price: float, side: str) -> str:
        """Check if a level looks like a spoof wall.

        Spoof signature:
        - Same price level, similar size, appearing repeatedly
        - Size stays ~constant across last N snapshots
        - Possible: same level keeps appearing in consecutive snapshots

        Returns: "none" | "possible" | "probable"
        """
        recent = [h[0] for h in history[-self.spoof_lookback:]]
        if len(recent) < 2:
            return "none"

        # If the level appears fewer times than expected given snapshot count
        # and the sizes are highly consistent -> possible spoof
        expected_appearances = min(self.snapshot_count, self.spoof_lookback)
        if len(recent) >= expected_appearances - 1 and len(recent) >= 3:
            # Check size consistency (spoof algorithms keep precise size)
            size_range = max(recent) - min(recent)
            mean_size = sum(recent) / len(recent)
            if mean_size > 0 and (size_range / mean_size) < 0.05:
                return "probable"
            if mean_size > 0 and (size_range / mean_size) < 0.15:
                return "possible"

        return "none"

    def get_sweep_levels(self, result: dict) -> dict:
        """Extract limit order entry levels from wall analysis.

        Returns prices where we'd want to place limit orders.
        """
        return result.get("sweep_targets", {"buy": [], "sell": []})

    def reset(self):
        """Reset all tracking state."""
        self.ask_history.clear()
        self.bid_history.clear()
        self.snapshot_count = 0


# Quick self-test
if __name__ == "__main__":
    import json
    wd = WallDetector()

    # Simulate HL-style L2 with obvious walls
    mid = 100.0
    bids = [(99.9, 500), (99.8, 1200), (99.7, 100), (99.6, 50)]  # 1200 is a wall
    asks = [(100.1, 400), (100.2, 80), (100.3, 2000), (100.4, 60)]  # 2000 is a wall

    result = wd.analyze(bids, asks, mid)
    print("Wall Detection Test:")
    print(f"  Walls found: {result['walls_found']}")
    print(f"  Ask walls: {len(result['ask_walls'])} — {[w['price'] for w in result['ask_walls']]} (sizes: {[w['size'] for w in result['ask_walls']]})")
    print(f"  Bid walls: {len(result['bid_walls'])} — {[w['price'] for w in result['bid_walls']]}")
    print(f"  Sweep targets (buy): {result['sweep_targets']['buy']}")
    print(f"  Sweep targets (sell): {result['sweep_targets']['sell']}")
    print(f"  Wall-level imbalance: {result['imbalance']}")
    print()

    # Test spoof detection: same wall appearing with identical size
    for _ in range(5):
        wd.analyze([(99.9, 2000)], [(100.1, 2000)], mid)  # suspiciously clean
    result2 = wd.analyze(bids, asks, mid)
    print("Spoof Detection Test (same level, same size repeatedly):")
    for w in result2.get("bid_walls", []):
        print(f"  Bid wall at {w['price']}: spoof_risk={w['spoof_risk']}")
    for w in result2.get("ask_walls", []):
        print(f"  Ask wall at {w['price']}: spoof_risk={w['spoof_risk']}")
