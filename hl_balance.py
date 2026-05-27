#!/usr/bin/env python3
"""Hyperliquid Balance Checker — authoritative single source of truth.
   HARD RULE: Spot total = entire account (perp equity is inside spot's hold).
   Never add spot+perp. Spot USDC total = what you see in HL UI."""

import json, urllib.request, sys
from datetime import datetime, timezone

HL_API = "https://api.hyperliquid.xyz/info"
WALLET = "0xd547d5C7c3eAE5e8BA20b105E599a1588BB96c00"

def hl_post(data):
    req = urllib.request.Request(HL_API, data=json.dumps(data).encode(),
                                 headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=10) as r:
        return json.loads(r.read())

now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
print("=" * 56)
print(f"  HYPERLIQUID ACCOUNT — {now}")
print(f"  Wallet: {WALLET[:10]}…{WALLET[-6:]}")
print("=" * 56)

# 1. SPOT = master balance (includes perp margin as hold)
spot = hl_post({"type": "spotClearinghouseState", "user": WALLET})
spot_total = 0.0
spot_hold = 0.0
spot_available = 0.0
for b in spot.get("balances", []):
    if b["coin"] == "USDC":
        spot_total = float(b["total"])
        spot_hold = float(b.get("hold", "0"))
        spot_available = spot_total - spot_hold
        break

# 2. PERP = positions inside the same account
perp = hl_post({"type": "clearinghouseState", "user": WALLET})
perp_equity = float(perp["marginSummary"]["accountValue"])
perp_ntl = float(perp["marginSummary"]["totalNtlPos"])
perp_margin = float(perp["marginSummary"]["totalMarginUsed"])

# 3. DISPLAY — spot total is THE number
print(f"")
print(f"  TOTAL ACCOUNT:     ${spot_total:.2f}")
print(f"  ─────────────────────────────────────")
print(f"  Spot Cash:         ${spot_available:.2f}")
print(f"  In Margin (hold):  ${spot_hold:.2f}")
print(f"  ─────────────────────────────────────")
print(f"  Perp Equity:       ${perp_equity:.2f}   (inside the hold—NOT extra)")
print(f"  Perp Notional:     ${perp_ntl:.2f}")
print(f"  Perp Margin Used:  ${perp_margin:.2f}")

# Open positions
positions = perp.get("assetPositions", [])
if positions:
    print(f"")
    print(f"  OPEN POSITIONS:")
    for p in positions:
        pos = p["position"]
        coin = pos["coin"]
        szi = float(pos["szi"])
        entry = float(pos["entryPx"])
        upnl = float(pos["unrealizedPnl"])
        side = "LONG" if szi > 0 else "SHORT"
        print(f"    {coin:6s} {side:5s} | {abs(szi):.4f} @ ${entry:.2f} | UPnL: ${upnl:+.2f}")
else:
    print(f"")
    print(f"  No open positions")

print(f"")
print(f"  ⚠️  ONE NUMBER: ${spot_total:.2f}")
print(f"  (This is the only number that matches the HL UI)")
print(f"=" * 56)
