#!/usr/bin/env python3
"""
Dragonite — Manual Trade Tool
==============================
Place a single trade with risk controls enforced.
For when you want to override the bot and trade manually.

Usage:
    python scripts/manual_trade.py EUR.USD BUY 10000 --stop 1.0850 --target 1.0950
"""

import argparse
import logging
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

logging.basicConfig(level=logging.INFO, format="%(message)s")
logger = logging.getLogger("manual_trade")


def main():
    parser = argparse.ArgumentParser(description="Dragonite Manual Trade")
    parser.add_argument("symbol", help="Symbol (EUR.USD, GBP.USD, etc)")
    parser.add_argument("action", choices=["BUY", "SELL"], help="Trade direction")
    parser.add_argument("quantity", type=float, help="Quantity in units")
    parser.add_argument("--stop", type=float, help="Stop loss price")
    parser.add_argument("--target", type=float, help="Take profit price")
    parser.add_argument("--paper", action="store_true", default=True,
                        help="Paper trade mode")

    args = parser.parse_args()

    print(f"\n📊 Dragonite Manual Trade")
    print(f"{'='*50}")
    print(f"Symbol:   {args.symbol}")
    print(f"Action:   {args.action}")
    print(f"Quantity: {args.quantity:.0f} units")
    print(f"Stop:     {args.stop if args.stop else 'Not set'}")
    print(f"Target:   {args.target if args.target else 'Not set'}")
    print(f"Mode:     {'📄 Paper' if args.paper else '💵 Live'}")
    print(f"{'='*50}")
    print()

    # Validate
    if not args.symbol:
        print("❌ Symbol is required")
        sys.exit(1)

    if args.quantity <= 0:
        print("❌ Quantity must be positive")
        sys.exit(1)

    if args.stop and args.target:
        if args.action == "BUY" and args.stop >= args.target:
            print("❌ Stop must be below target for BUY")
            sys.exit(1)
        if args.action == "SELL" and args.stop <= args.target:
            print("❌ Stop must be above target for SELL")
            sys.exit(1)

    if args.paper:
        print("✅ Paper mode — trade logged but not executed live\n")
        print(f"Command would execute:")
        print(f"  {args.action} {args.quantity:.0f} {args.symbol}")
        print(f"  Stop: {args.stop} | Target: {args.target}")
    else:
        print("⚠️  Live mode not yet enabled — connect to IB Gateway first")

    print("\nDone.")


if __name__ == "__main__":
    main()
