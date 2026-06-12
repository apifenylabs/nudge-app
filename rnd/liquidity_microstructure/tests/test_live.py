#!/usr/bin/env python3
"""
Live Hyperliquid L2 stream test — 120-second smoke test.

Connects to HL WebSocket:
- l2Book stream for BBO snapshots
- trades stream for trade events
- Computes OFI + CVD + wall detection in real-time
- Prints stats every 10 seconds
- Exits after 120 seconds (or when ESC hit)

Usage:
    python test_live.py               # Test default pair (ETH)
    python test_live.py --pair SOL     # Test SOL
    python test_live.py --time 60      # Run for 60 seconds

Prerequisite:
    pip install websocket-client

Golden rule: Prove in sandbox first. This test proves the engine
can connect, ingest, and compute — no trading involved.
"""

import sys, os, json, time, threading, argparse
from datetime import datetime, timezone

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from engine.liquidity_engine import LiquidityEngine

# Try imports — fail gracefully if missing
try:
    import websocket
except ImportError:
    print("❌ Need websocket-client: pip install websocket-client")
    sys.exit(1)


# 🛠 Config
HL_WS = "wss://api.hyperliquid.xyz/ws"
DEFAULT_PAIR = "ETH"
TIMEOUT_SECONDS = 120


class LiveTester:
    """Connects to HL WS, feeds data to microstructure engine, prints stats."""

    def __init__(self, pair: str = DEFAULT_PAIR, duration: int = TIMEOUT_SECONDS):
        self.pair = pair
        self.duration = duration
        self.engine = LiquidityEngine(tick_size=0.01, ofi_bin=10)

        self.ws = None
        self.start_ts = time.time()
        self._stop = False
        self._last_print = 0
        self._bbo_count = 0
        self._trade_count = 0
        self._stats_interval = 10  # Print summary every 10s
        self._l2_snapshots = 0

        # On-task tracking
        self.ws_errors = 0

    def on_message(self, ws, message):
        now = time.time()
        try:
            data = json.loads(message)
        except json.JSONDecodeError:
            return

        # Handle subscription confirmation
        if isinstance(data, dict) and data.get("channel") == "subscriptionResponse":
            sub_type = data.get("data", {}).get("subscription", {}).get("type", "")
            print(f"  ✅ Subscribed to {sub_type}")
            return

        # Handle L2 book data
        if isinstance(data, list):
            for msg in data:
                self._process_msg(msg)
        elif isinstance(data, dict):
            self._process_msg(data)

    def _process_msg(self, msg):
        # Channel routing
        channel = msg.get("channel", "")
        now = time.time()

        if channel == "l2Book":
            self._l2_snapshots += 1
            data = msg.get("data", {})
            levels = data.get("levels", [[], []])
            # HL sends [bid_levels, ask_levels] as [[price,sz,n], ...]
            bids = levels[0] if len(levels) > 0 else []
            asks = levels[1] if len(levels) > 1 else []

            # Extract (price, size) tuples
            bid_prices = [(float(b[0]), float(b[1])) for b in bids[:10]]
            ask_prices = [(float(a[0]), float(a[1])) for a in asks[:10]]

            if bid_prices and ask_prices:
                mid = (bid_prices[0][0] + ask_prices[0][0]) / 2.0

                # Feed BBO (top of book)
                self.engine.add_bbo(bid_prices[0][0], bid_prices[0][1],
                                    ask_prices[0][0], ask_prices[0][1], now)

                # Feed L2 for wall detection
                self.engine.analyze_book(bid_prices, ask_prices, mid)

        elif channel == "trades":
            self._trade_count += 1
            data = msg.get("data", [])
            if isinstance(data, list):
                for trade in data[:5]:  # process max 5 per message
                    try:
                        price = float(trade.get("px", 0))
                        size = float(trade.get("sz", 0))
                        side = trade.get("side", "Buy")
                        is_buy = side.lower() == "buy"
                        if price > 0 and size > 0:
                            self.engine.add_trade(price, size, is_buy, now)
                    except (ValueError, TypeError):
                        pass

    def on_error(self, ws, error):
        # Suppress nil/heartbeat errors from websocket-client
        err_str = str(error)
        if err_str in ("0", "''", "", "None"):
            return
        self.ws_errors += 1
        print(f"\n  ⚠ WS Error: {error}")

    def on_close(self, ws, close_status_code, close_msg):
        print(f"\n  🔌 WS Closed: {close_status_code}")

    def on_open(self, ws):
        print(f"  ✅ WS Connected to {HL_WS}")
        # Subscribe to l2Book
        sub_l2 = {
            "method": "subscribe",
            "subscription": {
                "type": "l2Book",
                "coin": self.pair,
            }
        }
        ws.send(json.dumps(sub_l2))
        print(f"  📡 Subscribed to l2Book: {self.pair}")

        # Subscribe to trades
        sub_trades = {
            "method": "subscribe",
            "subscription": {
                "type": "trades",
                "coin": self.pair,
            }
        }
        ws.send(json.dumps(sub_trades))
        print(f"  📡 Subscribed to trades: {self.pair}")

    def _print_stats(self):
        """Pretty-print current engine state."""
        now = time.time()
        elapsed = now - self.start_ts

        # Report
        report_text = self.engine.report()

        # Evaluate filter
        result = self.engine.evaluate()

        lines = [
            f"\n{'━' * 56}",
            f"  LIVE MICROSTRUCTURE — {self.pair}  "
              f"({elapsed:.0f}s / {self.duration}s)",
            f"  l2Book snaps: {self._l2_snapshots}  |  "
              f"Trades: {self._trade_count}  |  "
              f"WS errors: {self.ws_errors}",
            f"{'━' * 56}",
        ]

        # Add report
        for line in report_text.split('\n'):
            if line.strip():
                lines.append(line)

        lines.extend([
            "",
            f"  ── FILTER ──",
            f"  Score: {result.overall_score:+.4f}",
            f"  Decision: {result.decision.value}",
            f"  Reasons:",
        ])
        for r in result.reasons:
            lines.append(f"    → {r}")

        lines.append(f"{'━' * 56}")
        lines.append("")

        print("\n".join(lines))
        sys.stdout.flush()

    def run(self):
        """Main loop — connect, stream, print stats."""
        print(f"\n{'=' * 56}")
        print(f"  LIQUIDITY MICROSTRUCTURE — LIVE TEST")
        print(f"  Pair: {self.pair}  |  Duration: {self.duration}s")
        print(f"  Time: {datetime.now(timezone.utc).strftime('%H:%M:%S UTC')}")
        print(f"{'=' * 56}\n")

        self.start_ts = time.time()

        # Connect
        self.ws = websocket.WebSocketApp(
            HL_WS,
            on_open=self.on_open,
            on_message=self.on_message,
            on_error=self.on_error,
            on_close=self.on_close,
        )

        # Run WS in background thread
        wst = threading.Thread(target=self.ws.run_forever, daemon=True)
        wst.start()

        # Wait for connection
        time.sleep(2)

        if not wst.is_alive():
            print("  ❌ WS thread died immediately — check network/API")
            return

        # Main monitoring loop
        try:
            while time.time() - self.start_ts < self.duration and not self._stop:
                time.sleep(0.5)

                # Print stats every interval
                elapsed = time.time() - self.start_ts
                if elapsed - self._last_print >= self._stats_interval:
                    self._print_stats()
                    self._last_print = elapsed

        except KeyboardInterrupt:
            print("\n\n  ⏹ Stopped by user")

        finally:
            self._stop = True
            if self.ws:
                self.ws.close()
            elapsed = time.time() - self.start_ts

            print(f"\n  ── COMPLETE ({elapsed:.0f}s) ──")
            print(f"  L2 snapshots:  {self._l2_snapshots}")
            print(f"  Trade events:  {self._trade_count}")
            print(f"  WS errors:     {self.ws_errors}")

            if self._l2_snapshots > 0:
                reg = self.engine.ofi.get_regression()
                print(f"  OFI regression: β={reg.get('beta', 'N/A')}  "
                      f"R²={reg.get('r_squared', 'N/A')}  "
                      f"n={reg.get('n_observations', 0)}")

            cvd = self.engine.cvd.get_cvd_summary()
            print(f"  CVD total:     {cvd.get('cvd', 'N/A')}")
            print(f"  CVD trades:    {cvd.get('total_trades', 0)}")

            print(f"\n  ✅ Test complete. Engine ingested {self._l2_snapshots} snapshots "
                  f"and {self._trade_count} trades.")

            # Clean exit
            wst.join(timeout=3)


def main():
    parser = argparse.ArgumentParser(description="Live HL microstructure engine test")
    parser.add_argument("--pair", default=DEFAULT_PAIR, help="HL coin symbol (default: ETH)")
    parser.add_argument("--time", type=int, default=TIMEOUT_SECONDS,
                        help=f"Test duration in seconds (default: {TIMEOUT_SECONDS})")
    args = parser.parse_args()

    tester = LiveTester(pair=args.pair, duration=args.time)
    tester.run()


if __name__ == "__main__":
    main()
