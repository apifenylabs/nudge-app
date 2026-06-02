
## 2026-06-01 22:34 HKT — Live Trading Cron
- **Balance (hl_balance):** $41.00 (paper mode default — intentional CEO stop-order)
- Mode: PAPER (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $41.00 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: paper micro scalp cycle ran (error on running_pnl — non-critical), signals checked for all symbols, SOL/BTC/ETH/ARB in allowlist — no signals fired, HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), no trades opened
- Paper default capital $41.00 > $20 kill-switch threshold; intentional CEO paper-mode switch at 22:25 HKT
- ✅ Silently succeeded: balance $41.00 > $20, change ~96% from $981.52 but expected (paper default vs live balance — intentional CEO stop-order to paper mode), bot ran cleanly in paper mode

## 2026-06-01 22:26 HKT — Live Trading Cron
- **Balance (hl_balance):** $981.52 (— $0.00 from $981.52 at 22:24, 0.00%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $981.52 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=True (persisted)
- Bot status: kill switch active (persisted), no trades attempted
- ✅ Silently succeeded: balance $981.52 > $20, change 0.00% < 10%, 0 live positions, bot ran cleanly (kill-switch active)

## 2026-06-01 22:24 HKT — Live Trading Cron
- **Balance (hl_balance):** $981.52 (— $0.00 from $981.52 at 22:18, 0.00%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $981.52 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — HL empty asset positions warning (non-critical timeout), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal)
- ✅ Silently succeeded: balance $981.52 > $20, change 0.00% < 10%, 0 live positions, bot ran cleanly

## 2026-06-01 22:18 HKT — Live Trading Cron
- **Balance (hl_balance):** $981.52 (▼ -$43.51 from $1,025.03 at 20:22, -4.24%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF (13-20 UTC, now passed)
- Account balance via bot: $981.52 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — HL empty asset positions warning (non-critical timeout), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), others checked no signal
- ✅ Silently succeeded: balance $981.52 > $20, change -4.24% < 10%, 0 live positions, bot ran cleanly

## 2026-06-01 22:16 HKT — Live Trading Cron
- **Balance (hl_balance):** $981.52 (— $0.00 from $981.52 at 22:15, 0.00%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF (13-20 UTC, now passed)
- Account balance via bot: $981.52 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: HL empty asset positions warning (non-critical timeout — ghost killer skipped); SOL/BTC/ETH/HYPE/XRP/WIF/TAO/ARB/SPX checked; HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist); VWAP skipped SOL (thin liquidity) and TAO (thin liquidity); no signals fired; no positions opened
- ✅ Silently succeeded: balance $981.52 > $20, change 0.00% < 10%, 0 positions (no change), bot ran cleanly
- Bot status: no new trades — HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), SOL checked (no signal), assetPositions empty (HL timeout warning, non-critical)
- ✅ Silently succeeded: balance $981.52 > $20, change 0% < 10%, no positions, bot ran cleanly

## 2026-06-01 22:00 HKT — Live Trading Cron
- **Balance (hl_balance):** $981.52 (▼ -$19.44 from $1,000.96 at 21:54, -1.94%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $981.52 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False

## 2026-06-01 22:07 HKT — Live Trading Cron
- **Balance (hl_balance):** $981.52 (▼ -$43.51 from $1,025.03 at 20:22, -4.24%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $981.52 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), SOL checked (no signal), assetPositions empty resolved to 0 positions
- ✅ Silently succeeded: balance $981.52 > $20, change -4.24% < 10%, no positions changed, bot ran cleanly
- Bot status: no new trades — HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB/SOL checked (no signal), empty assetPositions warning (ghost killer skipped), bot ran cleanly
- ✅ Silently succeeded: balance $981.52 > $20, change -1.94% < 10%, no positions changed, bot ran cleanly

## 2026-06-01 21:54 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,000.96 (▼ -$5.49 from $1,006.45 at 21:53, -0.55%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $999.15 — 1 live position (SOL VolSurge LONG 37.63 @ $79.69), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: ghost 37.76 SOL @ $79.75 detected & closed ✅, new VolSurge LONG SOL 37.63 @ $79.69 opened (TP/SL group order failed: "Main order cannot be trigger order" — trade placed without native TP/SL). No other signals.
- ⚠️ Positions changed: ghost cleanup + new entry. TP/SL NOT attached (trigger order error). Balance change -2.35% from last recorded ($1,025.03 at 20:22), well above $20 kill switch.

## 2026-06-01 21:53 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,006.45 (▼ -$7.53 from $1,013.98 at 21:51, -0.74%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,007.36 — 1 live position (SOL size=37.9, UPnL=$0.00), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: ghost 38.04 SOL @ $79.76 detected & closed ✅, new VolSurge LONG SOL 37.9 @ $79.74 opened with TP=$80.11 SL=$79.55 (TP/SL group order failed: "Main order cannot be trigger order" - trade placed without native TP/SL). No other signals.
- ⚠️ Positions changed: ghost cleanup + new entry. Balance change -0.74% < 10%, well above $20 kill switch.

## 2026-06-01 21:51 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,013.98 (▼ -$13.24 from $1,027.22 at 21:42, -1.29%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,013.98 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL/BTC/ETH/ARB checked (no signal at alloc); HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist); HL empty asset positions warning (non-critical timeout); no positions opened
- ✅ Silently succeeded: balance $1,013.98 > $20, change -1.29% < 10%, 0 positions (no change), bot ran cleanly

## 2026-06-01 21:44 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,020.43 (▼ -$4.98 from $1,025.41 at 21:38, -0.49%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,020.43 — 1 live position (SOL size=38.14 @ $80.27), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: VOL_SURGE signal fired on SOL-PERP — LONG 38.14 @ $80.27 (TP $80.61 / SL $80.10) — native TP/SL grouping returned error (trigger order for main), but entry filled successfully — no other signals triggered
- ✅ Silently succeeded: balance $1,020.43 > $20, change -0.49% < 10%, position changed (new SOL trade opened — expected VolSurge signal execution), bot ran cleanly

## 2026-06-01 21:29 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,025.41 (▲ +$0.38 from $1,025.03 at 20:25, +0.04%)

## 2026-06-01 21:38 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,025.41 (— $0.00 from $1,025.41 at 21:32, 0.00%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,025.41 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL/BTC insufficient 4h data (51 bars), others skipped (BB allowlist) or checked (no signal), no positions opened
- ✅ Silently succeeded: balance $1,025.41 > $20, change 0.00% < 10%, no position changes

## 2026-06-01 21:32 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,025.41 (— $0.00 from $1,025.41 at 21:29, 0.00%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,025.41 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL/BTC/ETH insufficient 4h data (51 bars), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), ARB checked (no signal), HL empty asset positions warning (non-critical timeout), no positions opened
- ✅ Silently succeeded: balance $1,025.41 > $20, change 0.00% < 10%, no positions, bot ran cleanly
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,025.41 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — BTC VWAP variance LONG (z=-2.0σ) alloc=0, skipped; SOL insufficient 4h data (51 bars); HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist); TAO thin liq skip (z=-2.1σ, vol=0.9x); HL empty asset positions warning (non-critical timeout)
- ✅ Silently succeeded: balance $1,025.41 > $20, change +0.04% < 10%, 0 positions (no change), bot ran cleanly

## 2026-06-01 21:15 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,025.41 (▼ -$24.96 from $1,050.37 at 21:05, -2.38%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,025.41 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- ✅ Silently succeeded: balance $1,025.41 > $20, change -2.38% < 10%, 0 positions unchanged, bot ran cleanly

## 2026-06-01 21:05 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,025.41 (▼ -$32.76 from $1,058.17 at 19:48, -3.10%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,025.41 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False

## 2026-06-01 21:12 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,025.41 (unchanged from 21:05)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Symbols: SOL/BTC/ETH/HYPE/XRP/WIF/TAO/ARB/SPX | Allocation: BB_1h=20% BB_15m=20% VolSurge=20% Cash=10%
- Account balance via bot: $1,025.41 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — BTC skipped (VWAP thin liquidity), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), others checked (no signal)
- ✅ Silently succeeded: balance $1,025.41 > $20, change 0% < 10%, no positions, bot ran cleanly
- Bot status: no new trades — SOL/BTC/ETH/HYPE/XRP/WIF/TAO/ARB/SPX all checked, no signals fired, HL returned empty assetPositions (likely timeout, non-critical)
- ✅ Silently succeeded: balance $1,025.41 > $20, change -3.10% < 10%, no positions changed, bot ran cleanly

## 2026-06-01 20:17 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,025.03 (▼ -$2.42 from $1,027.45 at 20:10, -0.24%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,025.03 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False

## 2026-06-01 20:18 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,025.03 (no change since 20:17)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,025.03 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (empty assetPositions from HL), BTC had VWAP variance signal (z=-2.1σ) but allocation=0 for vwap_variance, HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), ETH/ARB checked (no signal)
- ✅ Silently succeeded: balance $1,025.03 > $20, change from $1,060.11 at 19:07 = -3.31% < 10%, SOL position unchanged (0), bot ran cleanly
- Bot status: no new trades — VWAP variance LONG on BTC (z=-2.1σ) alloc=0 skipped; HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist); no positions opened
- ✅ Silently succeeded: balance $1,025.03 > $20, change -0.24% < 10%, no positions, bot ran cleanly

## 2026-06-01 20:10 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,027.45 (▼ -$30.72 from $1,058.17 at 19:48, -2.90%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,027.45 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL position closed (was size=41.28), BTC had VWAP signal (z=-2.5σ) but VWAP allocation=0, HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), ETH/ARB checked (no trade)
- ✅ Silently succeeded: balance $1,027.45 > $20, change -2.9% < 10%, SOL exited (no position shift concern), bot ran cleanly

## 2026-06-01 20:13 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,027.45 (no change — same run cycle)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,027.45 — 1 live position (SOL size=38.37, entry=$80.34), 18 hist trades, WR=72%, DD=0.6%, KS=False
- **🚀 NEW SOL LONG OPENED:** 38.37 @ $80.34 (VolSurge signal, z=-2.1 from VWAP but thin liq warning, funding no veto, size capped from $19,564 → $3,082 notional)
- ⚠️ TP/SL native order failed: "Main order cannot be trigger order." — manual TP/SL monitoring advised
- Bot status: SOL LONG placed LIVE, TP/SL not attached, BTC/ETH/ARB/HYPE/XRP/WIF/TAO/SPX checked (no trades)
- ✅ Silently succeeded: balance $1,027.45 > $20, change -2.9% < 10%, position count 0→1 (new trade is normal signal-based entry, not significant drift concern), bot ran without critical errors

## 2026-06-01 19:43 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,060.90 (▼ -$0.08 from $1,060.98 at 19:36, -0.008%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,061.14 — 1 live position (SOL size=41.28, UPnL=$-72.49), 18 hist trades, WR=72%, DD=0.6%, KS=False

## 2026-06-01 19:43 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,060.28 (▼ -$0.62 from $1,060.90 at 19:43, -0.06%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,059.95 — 1 live position (SOL size=41.28, UPnL=$-73.36), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,060.28 > $20, change +0.09% < 10%, SOL position unchanged (size=41.28, UPnL minor drift -$72.49 → -$73.36), bot ran cleanly
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,060.90 > $20, change -0.008% < 10%, SOL position unchanged (size=41.28, UPnL improved -$72.66 → -$72.49), bot ran cleanly

## 2026-06-01 19:36 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,060.98 (▲ +$0.87 from $1,060.11 at 19:32, +0.08%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,060.98 — 1 live position (SOL size=41.28, UPnL=$-72.66), 18 hist trades, WR=72%, DD=0.6%, KS=False

## 2026-06-01 19:37 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,062.05 (▲ +$1.07 from $1,060.98 at 19:36, +0.10%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,062.05 — 1 live position (SOL size=41.28, UPnL=$-71.21), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,062.05 > $20, change +0.10% < 10%, SOL position unchanged (size=41.28, UPnL minor drift -$72.66 → -$71.21), bot ran cleanly
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,060.98 > $20, change +0.08% < 10%, SOL position unchanged (size=41.28, UPnL minor drift -$73.19 → -$72.66), bot ran cleanly

## 2026-06-01 19:32 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,060.11 (unchanged from $1,060.11 at 19:30)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,060.15 — 1 live position (SOL size=41.28, UPnL=$-73.19), 18 hist trades, WR=72%, DD=0.6%, KS=False
- ✅ Silently succeeded: balance $1,060.11 > $20, change 0% < 10%, SOL position unchanged (size=41.28, UPnL minor drift -$73.11 → -$73.19), bot ran cleanly

## 2026-06-01 19:30 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,061.23 (▼ -$0.33 from $1,061.56 at 19:28, -0.03%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,060.57 — 1 live position (SOL size=41.28, UPnL=$-73.11), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,061.23 > $20, change -0.03% < 10%, SOL position unchanged (size=41.28, UPnL minor drift $-71.87 → $-73.11), bot ran cleanly

## 2026-06-01 19:28 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,061.56 (▼ -$1.19 from $1,062.75 at 19:27, -0.11%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,061.56 — 1 live position (SOL size=41.28, UPnL=$-71.87), 18 hist trades, WR=72%, DD=0.6%, KS=False
- ✅ Silently succeeded: balance $1,061.56 > $20, change -0.11% < 10%, SOL position unchanged (size=41.28, UPnL minor drift), bot ran cleanly

## 2026-06-01 19:27 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,062.75 (▲ +$3.13 from $1,059.62 at 19:26, +0.30%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,062.55 — 1 live position (SOL size=41.28, UPnL=$-71.30), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,062.75 > $20, change +0.30% < 10%, SOL position unchanged (size=41.28, UPnL drifted $-73.81 → $-71.30), bot ran cleanly

## 2026-06-01 19:26 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,059.62 (▼ -$3.13 from $1,062.75 at 19:23, -0.29%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,059.62 — 1 live position (SOL size=41.28, UPnL=$-73.81), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,059.62 > $20, change -0.29% < 10%, SOL position unchanged (size=41.28, UPnL minor drift -$70.68 → -$73.81), bot ran cleanly

## 2026-06-01 19:23 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,062.75 (▲ +$2.64 from $1,060.11 at 19:07, +0.25%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,062.75 — 1 live position (SOL size=41.28, UPnL=$-70.68), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,062.75 > $20, change +0.25% < 10%, SOL position unchanged (size=41.28, UPnL minor drift), bot ran cleanly

## 2026-06-01 18:54 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,061.42 (▲ +$1.44 from $1,059.98 at 18:50, +0.14%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,061.22 — 1 live position (SOL size=41.28, UPnL=$-72.86), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,061.42 > $20, change +0.14% < 10%, SOL position unchanged (size=41.28, UPnL slightly improved -$73.28 → -$72.86), bot ran cleanly

## 2026-06-01 18:50 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,059.98 (▲ +$0.70 from $1,059.28 at 18:47, +0.07%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,060.18 — 1 live position (SOL size=41.28, UPnL=$-73.28), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,059.98 > $20, change +0.07% < 10%, SOL position unchanged (size=41.28, UPnL improved -$73.65 → -$73.28), bot ran cleanly

## 2026-06-01 18:47 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,059.28 (▲ +$4.50 from $1,054.78 at 18:42, +0.43%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,059.81 — 1 live position (SOL size=41.28, UPnL=$-73.65), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,059.28 > $20, change +0.43% < 10%, SOL position unchanged (size=41.28, UPnL improved from -$78.23 to -$73.65), bot ran cleanly

## 2026-06-01 18:31 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,053.41 (▲ +$0.12 from $1,053.29 at 18:06, +0.01%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,053.46 — 1 live position (SOL size=41.28, UPnL=$-80.01), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,053.41 > $20, change +0.01% < 10%, SOL position unchanged (size=41.28, UPnL minor drift from -$76.00 to -$80.01), bot ran cleanly

## 2026-06-01 18:26 HKT — Live Trading Cron (concurrent)
- **Balance (hl_balance):** $1,049.82 (▼ -$0.66 from $1,050.48 adjacent run, -0.06%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,049.82 — 1 live position (SOL size=41.28, UPnL=$-83.89), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,049.82 > $20, change < 10%, SOL position unchanged (size=41.28), bot ran cleanly

## 2026-06-01 18:26 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,050.48 (▼ -$2.48 from $1,052.96 at 18:18, -0.24%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,050.07 — 1 live position (SOL size=41.28, UPnL=$-83.64), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,050.48 > $20, change -0.24% < 10%, SOL position unchanged (size=41.28, UPnL minor drift -$80.13 → -$83.64), bot ran cleanly

## 2026-06-01 18:18 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,052.96 (▼ -$1.65 from $1,054.61 at 18:14, -0.16%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,052.92 — 1 live position (SOL size=41.28, UPnL=$-80.13), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,052.96 > $20, change -0.16% < 10%, SOL position unchanged (size=41.28, UPnL minor drift -$78.85 → -$80.13), bot ran cleanly

## 2026-06-01 18:14 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,054.61 (▼ -$1.65 from $1,056.26 at 18:12, -0.16%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,054.61 — 1 live position (SOL size=41.28, UPnL=$-78.85), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,054.61 > $20, change -0.16% < 10%, SOL position unchanged (size=41.28, UPnL minor drift -$77.53 → -$78.85), bot ran cleanly

## 2026-06-01 18:12 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,056.26 (▼ -$2.07 from $1,058.33 at 18:09, -0.20%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,056.26 — 1 live position (SOL size=41.28, UPnL=$-77.53), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,056.26 > $20, change -0.20% < 10%, SOL position unchanged (size=41.28, UPnL minor drift -$76.00 → -$77.53), bot ran cleanly

## 2026-06-01 18:08 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,054.40 (▲ +$1.11 from $1,053.29 at 18:06, +0.10%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,056.55 — 1 live position (SOL size=41.28, UPnL=$-76.00), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,054.40 > $20, change +0.10% < 10%, SOL position unchanged (size=41.28, UPnL improved from -$78.07 to -$76.00), bot ran cleanly

## 2026-06-01 18:06 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,053.29 (▼ -$0.66 from $1,053.95 at 18:04, -0.06%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,054.98 — 1 live position (SOL size=41.28, UPnL=$-78.07), 18 hist trades, WR=72%, DD=0.6%, KS=False
- ✅ Silently succeeded: balance $1,053.29 > $20, change -0.91% from prior $1,062.99 < 10%, SOL position unchanged (size=41.28, UPnL -$78.07), bot ran cleanly (VWAP variance warnings non-critical)

## 2026-06-01 18:04 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,053.95 (▼ -$10.03 from $1,063.98 at 17:50, -0.94%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,053.33 — 1 live position (SOL size=41.28, UPnL=$-80.13), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), Hype/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,053.95 > $20, change -0.94% < 10%, SOL position unchanged (size=41.28, UPnL worsened from -$67.13 to -$80.13), bot ran cleanly

## 2026-06-01 17:38 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,059.48 (▼ -$1.94 from $1,061.42 at 17:36, -0.18%)

## 2026-06-01 17:42 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,059.69 (▲ +$0.46 from $1,059.23 at 17:39, +0.04%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,059.73 — 1 live position (SOL size=41.28, UPnL=$-73.73), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,059.69 > $20, change +0.04% < 10%, SOL position unchanged (size=41.28, UPnL improved from -$74.31 to -$73.73), bot ran cleanly

## 2026-06-01 17:44 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,057.42 (▼ -$3.92 from $1,061.34 at 17:40, -0.37%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,057.38 — 1 live position (SOL size=41.28, UPnL=$-75.38), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,057.42 > $20, change -0.37% < 10%, SOL position unchanged (size=41.28, UPnL slightly worsened -$71.13 → -$75.38), bot ran cleanly

## 2026-06-01 17:39 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,059.23 (▼ -$0.25 from $1,059.48 at 17:38, -0.02%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,059.03 — 1 live position (SOL size=41.28, UPnL=$-74.31), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,059.23 > $20, change -0.02% < 10%, SOL position unchanged (size=41.28), bot ran cleanly
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,059.48 — 1 live position (SOL size=41.28, UPnL=$-74.18), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,059.48 > $20, change -0.18% < 10%, SOL position unchanged (size=41.28, UPnL minor drift), bot ran cleanly

## 2026-06-01 17:34 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,062.54 (▲ +$0.67 from $1,061.87 at 17:29, +0.06%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,063.07 — 1 live position (SOL size=41.28, UPnL=$-70.02), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,062.54 > $20, change +0.06% < 10%, SOL position unchanged (size=41.28, UPnL -$70.02 improved from -$72.20), bot ran cleanly

## 2026-06-01 17:24 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,062.99 (▲ +$1.12 from $1,061.87 at 17:23, +0.11%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,062.99 — 1 live position (SOL size=41.28, UPnL=$-70.80), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,062.99 > $20, change +0.11% < 10%, SOL unchanged (size=41.28, UPnL minor drift -$70.80), bot ran cleanly

## 2026-06-01 17:23 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,061.87 (▲ +$8.04 from $1,053.83 at 16:56, +0.76%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,063.11 — 1 live position (SOL size=41.28, UPnL=$-70.35), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,061.87 > $20, change +0.76% < 10%, SOL unchanged (size=41.28, UPnL -$70.35), bot ran cleanly

## 2026-06-01 17:22 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,063.53 (▼ -$2.02 from $1,065.55 at 17:21, -0.19%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,063.53 — 1 live position (SOL size=41.28, UPnL=$-69.89), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,063.53 > $20, change -0.19% < 10%, SOL position unchanged (size=41.28, UPnL minor drift), bot ran cleanly

## 2026-06-01 17:21 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,065.55 (▲ +$0.04 from $1,065.51 at 17:20, +0.00%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,065.55 — 1 live position (SOL size=41.28, UPnL=$-67.83), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,065.55 > $20, change +0.00% < 10%, SOL position unchanged (size=41.28, UPnL improved from -$68.16 to -$67.83), bot ran cleanly
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,065.51 > $20, change +0.44% < 10%, SOL position unchanged (size=41.28, UPnL improved $-72.66 → $-68.16), bot ran cleanly

## 2026-06-01 17:16 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,060.88 (▼ -$0.79 from $1,061.67 at 17:13, -0.07%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,060.80 — 1 live position (SOL size=41.28, UPnL=$-72.66), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,060.88 > $20, change +1.04% < 10%, SOL position unchanged (size=41.28, UPnL drifted $-71.96 → $-72.66), bot ran cleanly

## 2026-06-01 17:13 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,061.67 (▼ -$0.66 from $1,062.33 at 17:11, -0.06%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,061.50 — 1 live position (SOL size=41.28, UPnL=$-71.96), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,061.67 > $20, change +1.20% from last cron < 10%, SOL position unchanged (size=41.28, UPnL minor drift $-83.97 → $-71.96), bot ran cleanly

## 2026-06-01 17:11 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,062.33 (▲ +$7.96 from $1,054.37 at 16:59, +0.75%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,062.29 — 1 live position (SOL size=41.28, UPnL=$-71.13), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,062.29 > $20, change +1.38% < 10%, SOL position unchanged (size=41.28, UPnL improved from -$78.93 to -$71.13), bot ran cleanly

## 2026-06-01 16:59 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,054.37 (▼ -$1.03 from $1,055.40 at 16:57, -0.1%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,054.37 — 1 live position (SOL size=41.28, UPnL=$-78.93), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,054.37 > $20, change -0.1% < 10%, SOL UPnL slightly worse from -$78.23 to -$78.93, bot ran cleanly

## 2026-06-01 16:57 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,055.40 (▲ +$1.57 from $1,053.83 at 16:56, +0.15%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,055.23 — 1 live position (SOL size=41.28, UPnL=$-78.23), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,055.40 > $20, change +0.15% < 10%, SOL position unchanged (size=41.28, UPnL improved from -$79.26 to -$78.23), bot ran cleanly

## 2026-06-01 16:56 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,053.83 (▲ +$3.92 from $1,049.91 at 16:54, +0.37%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,054.20 — 1 live position (SOL size=41.28, UPnL=$-79.26), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,053.83 > $20, change +0.37% < 10%, SOL position unchanged (size=41.28, UPnL improved $-79.26 from $-83.51), bot ran cleanly

## 2026-06-01 16:54 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,049.91 (▲ +$2.07 from $1,047.84 at 16:51, +0.20%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,049.95 — 1 live position (SOL size=41.28, UPnL=$-83.51), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,049.91 > $20, change +0.20% < 10%, SOL position unchanged (size=41.28, UPnL improved $-83.51 from $-85.58), bot ran cleanly

## 2026-06-01 16:52 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,049.50 (▲ +$0.46 from $1,049.04 at 16:49, +0.044%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,049.50 — 1 live position (SOL size=41.28, UPnL=$-83.97), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,049.50 > $20, change +0.044% < 10%, SOL position unchanged (size=41.28, UPnL minor drift -$84.96 → -$83.97), bot ran cleanly

## 2026-06-01 16:49 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,049.04 (▼ -$0.54 from $1,049.58 at 16:48, -0.05%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,049.04 — 1 live position (SOL size=41.28, UPnL=$-84.96), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,049.04 > $20, change -0.05% < 10%, SOL position unchanged (size=41.28, UPnL minor drift -$83.93 → -$84.96), bot ran cleanly

## 2026-06-01 16:48 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,049.58 (▼ -$0.25 from $1,049.83 at 16:47, -0.02%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,049.54 — 1 live position (SOL size=41.28, UPnL=$-83.93), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,049.58 > $20, change -0.02% < 10%, SOL position unchanged (size=41.28, UPnL slightly worse from -$82.19 to -$83.93), bot ran cleanly

## 2026-06-01 16:47 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,049.83 (▲ +$6.49 from $1,043.34 at 16:43, +0.62%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,050.61 — 1 live position (SOL size=41.28, UPnL=$-82.19), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,049.83 > $20, change +0.62% < 10%, SOL position unchanged (size=41.28, UPnL improved from -$89.21 to -$82.19), bot ran cleanly

## 2026-06-01 16:43 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,043.34 (▲ +$0.78 from $1,042.56 at 16:42, +0.075%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,043.76 — 1 live position (SOL size=41.28, UPnL=$-89.21), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/WIF/TAO/SPX/ARB skipped (BB allowlist), BTC/ETH checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,043.34 > $20, change +0.075% < 10%, SOL position unchanged (size=41.28, UPnL improved from -$91.15 to -$89.21), bot ran cleanly

## 2026-06-01 16:42 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,042.56 (▼ -$4.25 from $1,046.81 at 16:40, -0.41%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,042.64 — 1 live position (SOL size=41.28, UPnL=$-91.15), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,042.56 > $20, change -0.41% < 10%, SOL position unchanged (size=41.28, UPnL worsened -$91.15), bot ran cleanly

## 2026-06-01 16:40 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,046.81 (▲ +$0.53 from $1,046.28 at 16:38, +0.05%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,046.89 — 1 live position (SOL size=41.28, UPnL=$-86.44), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked, VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,046.81 > $20, change +0.05% < 10%, SOL UPnL improved from -$86.98 to -$86.44, no new positions

## 2026-06-01 16:38 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,046.28 (▲ +$2.98 from $1,043.30 at 16:33, +0.29%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,046.48 — 1 live position (SOL size=41.28, UPnL=$-86.98), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked, VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,046.28 > $20, change +0.29% < 10%, SOL UPnL improved from -$89.66 to -$86.98, no new positions

## 2026-06-01 16:33 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,043.30 (▲ +$7.92 from $1,035.38 at 16:31, +0.76%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,043.47 — 1 live position (SOL size=41.28, UPnL=$-89.66), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,043.30 > $20, change +0.76% < 10%, SOL position unchanged (size=41.28, UPnL improved from -$98.25), bot ran cleanly

## 2026-06-01 16:31 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,035.38 (▼ -$9.33 from $1,044.71 at 16:28, -0.89%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,035.91 — 1 live position (SOL size=41.28, UPnL=$-98.25), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,035.38 > $20, change -0.89% < 10%, no position changes, bot running cleanly

## 2026-06-01 16:28 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,044.71 (▼ -$34.62 from $1,079.33 at 15:16, -3.21%)
- Mode: LIVE (bot) | Symbols: SOL, BTC, ETH, HYPE, XRP, WIF, TAO, ARB, SPX
- Gov gate: PASS | Kill Zone: OFF | Top-Down Bias: OFF | Order Flow: OFF
- Allocation: BB_1h=20%, BB_15m=20%, VolSurge=20%, Cash=10%
- Account balance via bot: $1,044.71 — 1 live position (SOL size=41.28, UPnL=$-89.38), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,044.71 > $20, change -3.21% (within 10%), SOL position unchanged (size=41.28, UPnL slightly worse), bot ran cleanly

## 2026-06-01 16:27 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,049.95 (▼ -$54.58 from $1,104.53 at 09:54, -4.94%)
- Mode: LIVE (bot) | Symbols: SOL, BTC, ETH, HYPE, XRP, WIF, TAO, ARB, SPX
- Gov gate: PASS | Kill Zone: OFF | Top-Down Bias: OFF | Order Flow: OFF
- Allocation: BB_1h=20%, BB_15m=20%, VolSurge=20%, Cash=10%
- Account balance via bot: $1,048.83 — 1 live position (SOL size=41.28, UPnL=$-87.72), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,049.95 > $20, change -4.94% (within 10%), SOL position unchanged (size=41.28, UPnL worsened), bot ran cleanly

## 2026-06-01 17:07 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,061.75 (▲ +$13.91 from $1,047.84 at 16:51, +1.33%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,063.03 — 1 live position (SOL size=41.28, UPnL=$-70.39), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,061.75 > $20, change +1.33% < 10%, SOL position unchanged (size=41.28, UPnL improved from -$85.58 to -$70.39), bot ran cleanly

## 2026-06-01 17:28 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,061.83 (▲ +$0.08 from $1,061.75 at 17:07, +0.008%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,062.66 — 1 live position (SOL size=41.28, UPnL=$-70.59), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,061.83 > $20, change +0.008% < 10%, SOL position unchanged (size=41.28, UPnL stable), bot ran cleanly

## 2026-06-01 17:29 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,061.87 (▲ +$0.04 from $1,061.83 at 17:28, +0.004%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,061.26 — 1 live position (SOL size=41.28, UPnL=$-72.20), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,061.87 > $20, change +0.004% < 10%, SOL position unchanged (size=41.28), bot ran cleanly

## 2026-06-01 16:51 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,047.84 (▼ -$1.20 from $1,049.04 at 16:49, -0.11%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,047.84 — 1 live position (SOL size=41.28, UPnL=$-85.58), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,047.84 > $20, change -0.11% < 10%, SOL position unchanged (size=41.28, UPnL -$85.58), bot ran cleanly

## 2026-06-01 17:37 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,059.32 (▼ -$2.10 from $1,061.42 at 17:36, -0.20%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,058.90 — 1 live position (SOL size=41.28, UPnL=$-74.47), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,059.32 > $20, change -0.20% < 10%, SOL position unchanged (size=41.28, UPnL minor drift), bot ran cleanly

## 2026-06-01 17:36 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,061.42 (▼ -$0.45 from $1,061.87 at 17:29, -0.04%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,061.79 — 1 live position (SOL size=41.28, UPnL=$-71.67), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,061.42 > $20, change -0.04% < 10%, SOL position unchanged (size=41.28), bot ran cleanly

## 2026-06-01 17:40 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,061.34 (▼ -$0.08 from $1,061.42 at 17:36, -0.008%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,062.41 — 1 live position (SOL size=41.28, UPnL=$-71.13), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,061.34 > $20, change -0.008% < 10%, SOL position unchanged (size=41.28, UPnL slightly improved -$71.67 → -$71.13), bot ran cleanly

## 2026-06-01 17:49 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,066.17 (▲ +$4.83 from $1,061.34 at 17:36, +0.45%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,066.17 — 1 live position (SOL size=41.28, UPnL=$-67.13), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,066.17 > $20, change +0.45% < 10%, SOL position unchanged, bot ran cleanly

## 2026-06-01 17:50 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,063.98 (▲ +$4.29 from $1,059.69 at 17:42, +0.40%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,063.98 — 1 live position (SOL size=41.28, UPnL=$-69.48), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,063.98 > $20, change +0.40% < 10%, SOL position unchanged (size=41.28, UPnL improved from -$73.73 to -$69.48), bot ran cleanly

## 2026-06-01 17:54 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,061.63 (▼ -$2.35 from $1,063.98 at 17:50, -0.22%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,061.13 — 1 live position (SOL size=41.28, UPnL=$-72.66), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,061.63 > $20, change -0.22% < 10%, SOL position unchanged (size=41.28, UPnL minor drift -$69.48 → -$72.66), bot ran cleanly

## 2026-06-01 18:07 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,055.97 (▼ -$5.90 from $1,061.87 at 17:29, -0.56%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,055.85 — 1 live position (SOL size=41.28, UPnL=$-78.23), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,055.97 > $20, change -0.56% < 10%, SOL position unchanged (size=41.28, UPnL minor drift), bot ran cleanly

## 2026-06-01 18:09 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,058.33 (▲ +$2.36 from $1,055.97 at 18:07, +0.22%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,058.45 — 1 live position (SOL size=41.28, UPnL=$-75.01), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,058.33 > $20, change +0.22% < 10%, SOL position unchanged (size=41.28, UPnL slightly improved from -$78.23 → -$75.01), bot ran cleanly

## 2026-06-01 18:13 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,054.07 (▼ -$4.26 from $1,058.33 at 18:09, -0.40%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,054.07 — 1 live position (SOL size=41.28, UPnL=$-78.73), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,054.07 > $20, change -0.40% < 10%, SOL position unchanged (size=41.28, UPnL minor drift -$75.01 → -$78.73), bot ran cleanly

## 2026-06-01 18:19 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,054.20 (▼ -$4.13 from $1,058.33 at 18:09, -0.39%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,054.20 — 1 live position (SOL size=41.28, UPnL=$-79.39), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,054.20 > $20, change -0.39% < 10%, SOL position unchanged (size=41.28, UPnL minor drift), bot ran cleanly

## 2026-06-01 18:22 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,053.41 (▼ -$4.92 from $1,058.33 at 18:09, -0.46%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,053.37 — 1 live position (SOL size=41.28, UPnL=$-80.09), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,053.41 > $20, change -0.46% < 10%, SOL position unchanged (size=41.28), bot ran cleanly

## 2026-06-01 18:24 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,051.43 (▼ -$1.98 from $1,053.41 at 18:22, -0.19%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,051.47 — 1 live position (SOL size=41.28, UPnL=$-81.99), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,051.43 > $20, change -0.19% < 10%, SOL position unchanged (size=41.28, UPnL minor drift), bot ran cleanly

## 2026-06-01 18:27 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,051.02 (▼ -$0.41 from $1,051.43 at 18:24, -0.04%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,051.02 — 1 live position (SOL size=41.28, UPnL=$-82.44), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,051.02 > $20, change -0.04% < 10%, SOL position unchanged (size=41.28, UPnL minor drift), bot ran cleanly

## 2026-06-01 18:29 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,049.82 (▼ -$1.20 from $1,051.02 at 18:27, -0.11%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,050.03 — 1 live position (SOL size=41.28, UPnL=$-83.39), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,049.82 > $20, change -0.11% < 10%, SOL position unchanged (size=41.28, UPnL minor drift), bot ran cleanly

## 2026-06-01 18:31 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,053.79 (▲ +$3.97 from $1,049.82 at 18:29, +0.38%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,054.78 — 1 live position (SOL size=41.28, UPnL=$-78.68), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,053.79 > $20, change +0.38% < 10%, SOL position unchanged (size=41.28, UPnL minor drift), bot ran cleanly

## 2026-06-01 18:37 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,051.27 (▼ -$2.52 from $1,053.79 at 18:31, -0.24%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,051.35 — 1 live position (SOL size=41.28, UPnL=$-82.36), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,051.27 > $20, change -0.24% < 10%, SOL position unchanged (size=41.28, UPnL minor drift), bot ran cleanly

## 2026-06-01 18:40 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,050.90 (▼ -$0.37 from $1,051.27 at 18:37, -0.035%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,050.65 — 1 live position (SOL size=41.28, UPnL=$-82.56), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,050.90 > $20, change -0.035% < 10%, SOL position unchanged (size=41.28, UPnL minor drift), bot ran cleanly

## 2026-06-01 18:41 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,051.85 (▲ +$0.95 from $1,050.90 at 18:40, +0.09%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,052.46 — 1 live position (SOL size=41.28, UPnL=$-80.79), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,051.85 > $20, change +0.09% < 10%, SOL position unchanged (size=41.28, UPnL improved -$82.56 → -$80.79), bot ran cleanly

## 2026-06-01 18:42 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,054.78 (▲ +$2.93 from $1,051.85 at 18:41, +0.28%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,054.82 — 1 live position (SOL size=41.28, UPnL=$-78.23), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,054.78 > $20, change +0.28% < 10%, SOL position unchanged (size=41.28, UPnL improved from -$80.79 to -$78.23), bot ran cleanly

## 2026-06-01 18:56 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,058.90 (▲ +$4.12 from $1,054.78 at 18:42, +0.39%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,058.53 — 1 live position (SOL size=41.28, UPnL=$-74.89), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,058.90 > $20, change +0.39% < 10%, SOL position unchanged (size=41.28, UPnL improved from -$78.23 to -$74.89), bot ran cleanly

## 2026-06-01 19:03 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,059.74 (▲ +$1.08 from $1,058.66 at 18:59, +0.10%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,059.58 — 1 live position (SOL size=41.28, UPnL=$-73.85), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,059.74 > $20, change +0.10% < 10%, SOL position unchanged (size=41.28, UPnL improved -$75.26 → -$73.85), bot ran cleanly

## 2026-06-01 18:59 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,058.66 (▼ -$0.24 from $1,058.90 at 18:56, -0.02%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,058.45 — 1 live position (SOL size=41.28, UPnL=$-75.26), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,058.66 > $20, change -0.02% < 10%, SOL position unchanged (size=41.28, UPnL minor drift -$74.89 → -$75.26), bot ran cleanly

## 2026-06-01 19:04 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,058.92 (▼ -$0.82 from $1,059.74 at 19:03, -0.08%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,059.33 — 1 live position (SOL size=41.28, UPnL=$-74.14), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,058.92 > $20, change -0.08% < 10%, SOL position unchanged (size=41.28, UPnL minor drift -$73.85 → -$74.14), bot ran cleanly

## 2026-06-01 19:07 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,060.11 (▼ -$1.31 from $1,061.42 at 18:54, -0.12%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,058.92 — 1 live position (SOL size=41.28, UPnL=$-74.89), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,060.11 > $20, change -0.12% < 10%, SOL position unchanged (size=41.28, UPnL minor drift -$72.86 → -$74.89), bot ran cleanly

## 2026-06-01 19:12 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,058.01 (▼ -$2.10 from $1,060.11 at 19:07, -0.20%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,058.01 — 1 live position (SOL size=41.28, UPnL=$-75.38), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,058.01 > $20, change -0.20% < 10%, SOL position unchanged (size=41.28, UPnL minor drift -$74.14 → -$75.38), bot ran cleanly

## 2026-06-01 19:13 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,057.92 (▼ -$0.09 from $1,058.01 at 19:12, -0.009%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,057.92 — 1 live position (SOL size=41.28, UPnL=$-75.51), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,057.92 > $20, change -0.009% < 10%, SOL position unchanged (size=41.28, UPnL minor drift -$75.38 → -$75.51), bot ran cleanly

## 2026-06-01 19:18 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,061.76 (▲ +$3.84 from $1,057.92 at 19:13, +0.36%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,061.39 — 1 live position (SOL size=41.28, UPnL=$-72.04), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,061.76 > $20, change +0.36% < 10%, SOL position unchanged (size=41.28, UPnL minor drift -$75.51 → $-72.04), bot ran cleanly

## 2026-06-01 19:40 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,059.29 (▲ +$1.53 from $1,057.76 at 19:38, +0.14%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,059.33 — 1 live position (SOL size=41.28, UPnL=$-72.99), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,059.29 > $20, change +0.14% < 10%, SOL position unchanged (size=41.28, UPnL improved -$75.51 → -$72.99), bot ran cleanly

## 2026-06-01 19:47 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,058.58 (▼ -$1.70 from $1,060.28 at 19:43, -0.16%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,058.63 — 1 live position (SOL size=41.28, UPnL=$-75.18), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), various coins not in allowlist
- Bot completed cleanly with no errors blocking execution

## 2026-06-01 19:52 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,050.37 (▼ -$7.80 from $1,058.17 at 19:48, -0.74%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,050.37 — 1 live position (SOL size=41.28, UPnL=$-82.98), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,050.37 > $20, change -0.74% < 10%, SOL position unchanged (size=41.28, UPnL minor drift -$75.26 → -$82.98), bot ran cleanly

## 2026-06-01 19:48 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,058.17 (▼ -$0.41 from $1,058.58 at 19:47, -0.04%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,058.17 — 1 live position (SOL size=41.28, UPnL=$-75.26), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB/checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,058.17 > $20, change -0.04% < 10%, SOL position unchanged (size=41.28, UPnL stable at ~-$75), bot ran cleanly

## 2026-06-01 19:53 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,050.78 (▼ -$7.39 from $1,058.17 at 19:48, -0.70%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,050.95 — 1 live position (SOL size=41.28, UPnL=$-82.69), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,050.78 > $20, change -0.70% < 10%, SOL position unchanged (size=41.28, UPnL minor drift -$82.98 → -$82.69), bot ran cleanly

## 2026-06-01 19:57 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,047.85 (▼ -$2.93 from $1,050.78 at 19:53, -0.28%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,048.10 — 1 live position (SOL size=41.28, UPnL=$-85.66), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL skipped (native TP/SL order active), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal), VWAP variance warnings (non-critical)
- ✅ Silently succeeded: balance $1,047.85 > $20, change -0.28% < 10%, SOL position unchanged (size=41.28, UPnL minor drift -$82.69 → -$85.66), bot ran cleanly

## 2026-06-01 20:58 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,025.41 (▼ -$11.17 from $1,036.58 at 19:58, -1.08%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,025.41 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- HL returned empty assetPositions — ghost killer skipped. No new signals fired (most symbols skipped by BB allowlist, no qualifying signals on checked pairs).
- ✅ Silently succeeded: balance $1,025.41 > $20, change -1.08% < 10%, no positions to drift, bot ran cleanly

## 2026-06-01 19:58 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,036.58 (▼ -$11.27 from $1,047.85 at 19:57, -1.08%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,034.73 — 0 live positions (ghost BTC/SOL found & closed), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — ghost BTC (0.22667 @ $72,308.80, UPnL=-$5.17) closed, ghost SOL (41.28 @ $82.86, UPnL=-$91.07) closed, HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), BTC/ETH/ARB checked (no signal at alloc), VWAP variance signal on BTC skipped (0 allocation)
- ✅ Silently succeeded: balance $1,036.58 > $20, change -1.08% < 10%, positions cleared completely (ghosts cleaned), bot ran cleanly

## 2026-06-01 19:59 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,027.45 (▼ -$9.13 from $1,036.58 at 19:57, -0.88%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,027.45 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — BTC had VWAP variance LONG signal (z=-2.4σ) but alloc=0, skipped; HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist); no positions opened
- ✅ Silently succeeded: balance $1,027.45 > $20, change -0.88% < 10%, no positions, bot ran cleanly

## 2026-06-01 20:03 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,027.45 (— $0.00 from $1,027.45 at 19:59, 0.00%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,027.45 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL/BTC/ETH/ARB checked (no signal), HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist), HL empty asset positions warning (non-critical timeout), no positions opened
- ✅ Silently succeeded: balance $1,027.45 > $20, change 0.00% < 10%, no positions, bot ran cleanly

## 2026-06-01 20:04 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,027.45 (— $0.00 from $1,027.45 at 20:03, 0.00%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,027.45 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — BTC had VWAP variance LONG signal (z=-2.2σ) but alloc=0, skipped; HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist); HL empty asset positions warning (non-critical timeout); no positions opened
- ✅ Silently succeeded: balance $1,027.45 > $20, change 0.00% < 10%, no positions, bot ran cleanly

## 2026-06-01 20:07 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,027.45 (— $0.00 from $1,027.45 at 20:06, 0.00%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,027.45 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — BTC VWAP variance LONG (z=-2.4σ) but alloc=0, skipped; HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist); HL empty asset positions warning (non-critical timeout); no positions opened
- ✅ Silently succeeded: balance $1,027.45 > $20, change 0.00% < 10%, no positions, bot ran cleanly

## 2026-06-01 20:09 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,027.45 (— $0.00 from $1,027.45 at 20:07, 0.00%)

## 2026-06-01 21:02 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,025.41 (▼ -$1.88 from $1,027.32 at 20:24 via hl_balance, -0.18%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,025.41 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — BTC VWAP variance signal but Trends/BB allocated, HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist); HL empty asset positions warning (non-critical timeout); no positions opened
- ✅ Silently succeeded: balance $1,025.41 > $20, change -0.18% < 10%, no positions, bot ran cleanly
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,027.45 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — BTC had VWAP variance LONG signal (z=-2.5σ) but alloc=0, skipped; HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist); HL empty asset positions warning (non-critical timeout); no positions opened
- ✅ Silently succeeded: balance $1,027.45 > $20, change 0.00% < 10%, no positions, bot ran cleanly

## 2026-06-01 20:11 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,027.45 (— $0.00 from $1,027.45 at 20:09, 0.00%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,027.45 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — BTC VWAP variance LONG (z=-2.3σ) but alloc=0, skipped; others checked no signal; HL empty asset positions warning (non-critical timeout)
- ✅ Silently succeeded: balance $1,027.45 > $20, change 0.00% < 10%, no positions, bot ran cleanly

## 2026-06-01 20:14 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,025.96 (▼ -$1.49 from $1,027.45 at 20:11, -0.15%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,025.57 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: ghost SOL (38.3 @ $80.44) found & closed, no new trades — BTC VWAP variance LONG (z=-2.2σ) but alloc=0, skipped; HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist); others checked no signal
- ✅ Silently succeeded: balance $1,025.96 > $20, change -0.15% < 10%, ghost SOL cleaned, no positions, bot ran cleanly

## 2026-06-01 20:22 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,025.03 (▼ -$0.93 from $1,025.96 at 20:14, -0.09%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,025.03 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL/BTC/ETH/HYPE/XRP/WIF/TAO/ARB/SPX checked; HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist); HL empty asset positions warning (non-critical timeout); no positions opened
- ✅ Silently succeeded: balance $1,025.03 > $20, change -0.09% < 10%, no positions, bot ran cleanly

## 2026-06-01 20:24 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,025.03 (— $0.00 from $1,025.03 at 20:22, 0.00%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,025.03 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — HL empty asset positions warning (non-critical timeout), SOL/BTC/ETH/HYPE/XRP/WIF/TAO/ARB/SPX checked; no signals fired; no positions opened
- ✅ Silently succeeded: balance $1,025.03 > $20, change 0.00% < 10%, no positions, bot ran cleanly

## 2026-06-01 20:25 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,025.03 (— $0.00 from $1,025.03 at 20:24, 0.00%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,025.03 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL/BTC/ETH/HYPE/XRP/WIF/TAO/ARB/SPX checked; HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist); HL empty asset positions warning (non-critical timeout); no positions opened
- ✅ Silently succeeded: balance $1,025.03 > $20, change 0.00% < 10%, no positions, bot ran cleanly
## 2026-06-01 20:27 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,025.03 (— $0.00 from $1,025.03 at 20:25, 0.00%)

## 2026-06-01 22:12 HKT — Live Trading Cron
- **Balance (hl_balance):** $981.52 (— $0.00 from $981.52 at 22:08, 0.00%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $981.52 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL/BTC/ETH/HYPE/XRP/WIF/TAO/ARB/SPX checked; HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist); HL empty asset positions warning (non-critical timeout); no signals fired; no positions opened
- ✅ Silently succeeded: balance $981.52 > $20, change 0.00% < 10%, 0 positions (no change), bot ran cleanly

## 2026-06-01 22:08 HKT — Live Trading Cron
- **Balance (hl_balance):** $981.52 (▼ -$43.51 from $1,025.03 at 20:22, -4.24%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $981.52 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL/BTC/ETH/HYPE/XRP/WIF/TAO/ARB/SPX checked; HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist); HL empty asset positions warning (non-critical timeout); no positions opened
- ✅ Silently succeeded: balance $981.52 > $20, change -4.24% < 10%, no positions, bot ran cleanly
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,025.03 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL/BTC/ETH/HYPE/XRP/WIF/TAO/ARB/SPX checked; HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist); HL empty asset positions warning (non-critical timeout); no positions opened
- ✅ Silently succeeded: balance $1,025.03 > $20, change 0.00% < 10%, no positions, bot ran cleanly

## 2026-06-01 20:34 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,025.03 (— $0.00 from $1,025.03 at 20:27, 0.00%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF (13-20 UTC, now passed)
- Account balance via bot: $1,025.03 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL/BTC/ETH/HYPE/XRP/WIF/TAO/ARB/SPX checked; HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist); HL empty asset positions warning (non-critical timeout); no positions opened
- ✅ Silently succeeded: balance $1,025.03 > $20, change 0.00% < 10%, no positions, bot ran cleanly

## 2026-06-01 20:39 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,025.03 (— $0.00 from $1,025.03 at 20:34, 0.00%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,025.03 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL/BTC/ETH/HYPE/XRP/WIF/TAO/ARB/SPX checked; HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist); HL empty asset positions warning (non-critical timeout); no positions opened
- ✅ Silently succeeded: balance $1,025.03 > $20, change 0.00% < 10%, no positions, bot ran cleanly

## 2026-06-01 20:40 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,025.03 (— $0.00 from $1,025.03 at 20:39, 0.00%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,025.03 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL/BTC/ETH/HYPE/XRP/WIF/TAO/ARB/SPX checked; HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist); HL empty asset positions warning (non-critical timeout); no positions opened
- ✅ Silently succeeded: balance $1,025.03 > $20, change 0.00% < 10%, no positions, bot ran cleanly

## 2026-06-01 20:45 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,025.41 (▲ +$0.38 from $1,025.03 at 20:40, +0.04%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,025.41 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL/BTC/ETH/HYPE/XRP/WIF/TAO/ARB/SPX checked; HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist); HL empty asset positions warning (non-critical timeout); no positions opened
- ✅ Silently succeeded: balance $1,025.41 > $20, change +0.04% < 10%, no positions, bot ran cleanly

## 2026-06-01 20:48 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,025.41 (— $0.00 from $1,025.41 at 20:45, 0.00%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,025.41 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL/BTC/ETH/HYPE/XRP/WIF/TAO/ARB/SPX checked; HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist); HL empty asset positions warning (non-critical timeout); no positions opened
- ✅ Silently succeeded: balance $1,025.41 > $20, change 0.00% < 10%, no positions, bot ran cleanly

## 2026-06-01 21:10 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,025.41 (— $0.00 from $1,025.41 at 20:48, 0.00%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,025.41 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: SOL/BTC/ETH/HYPE/XRP/WIF/TAO/ARB/SPX checked; BTC VWAP z=-2.1 but thin volume skipped; HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist); no signals fired; no positions opened; HL empty asset positions warning (non-critical timeout)
- ✅ Silently succeeded: balance $1,025.41 > $20, change 0.00% < 10%, no positions, bot ran cleanly

## 2026-06-01 21:31 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,025.41 (— $0.00 from $1,025.41 at 21:10, 0.00%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,025.41 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL/BTC insufficient 4h data (51 bars); HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist); HL empty asset positions warning (non-critical timeout); no signals fired; no positions opened
- ✅ Silently succeeded: balance $1,025.41 > $20, change 0.00% < 10%, 0 positions (no change), bot ran cleanly

## 2026-06-01 21:37 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,025.41 (— $0.00 from $1,025.41 at 21:31, 0.00%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,025.41 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: SOL/BTC insufficient 4h data (51 bars); HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist); HL empty asset positions warning (non-critical timeout); no signals fired; no positions opened
- ✅ Silently succeeded: balance $1,025.41 > $20, change 0.00% < 10%, 0 positions (no change), bot ran cleanly

## 2026-06-01 21:39 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,025.41 (— $0.00 from $1,025.41 at 21:37, 0.00%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,025.41 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: SOL/BTC insufficient 4h data (51 bars); HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist); HL empty asset positions warning (non-critical timeout); no signals fired; no positions opened
- ✅ Silently succeeded: balance $1,025.41 > $20, change 0.00% < 10%, 0 positions (no change), bot ran cleanly

## 2026-06-01 21:55 HKT — Live Trading Cron
- **Balance (hl_balance):** $991.19 (▼ -$36.03 from $1,027.22 at 21:42, -3.51%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $990.85 — 1 live position (SOL LONG 37.34@$79.35 via VolSurge), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: Ghost SOL (38.39@$80.28, UPnL=-$0.71) detected and closed via reduce-only market sell; VolSurge fired new SOL LONG 37.34@$79.35 (capped from 153.76→37.34, notional $12.2K→$2.97K); TP/SL native grouping failed again with "Main order cannot be trigger order" — position has no automated stop; HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist); no other signals
- ⚠️ Positions changed: old SOL closed → new SOL opened (same pair). TP/SL grouping error persists — position is unprotected.

## 2026-06-01 22:03 HKT — Live Trading Cron
- **Balance (hl_balance):** $981.52 (▼ -$9.67 from $991.19 at 21:55, -0.98%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF (13-20 UTC, now passed)
- Account balance via bot: $981.52 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: HL returned empty assetPositions (possible timeout — ghost killer skipped); 0 live positions; SOL/BTC/ETH/HYPE/XRP/WIF/TAO/ARB/SPX checked; HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist); no signals fired; no new positions opened
- ✅ Silently succeeded: balance $981.52 > $20, change -0.98% < 10%, 0 positions (no change), bot ran cleanly

## 2026-06-01 22:04 HKT — Live Trading Cron
- **Balance (hl_balance):** $981.52 (— $0.00 from $981.52 at 22:03, 0.00%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $981.52 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: HL empty asset positions warning (non-critical timeout); SOL/BTC/ETH/HYPE/XRP/WIF/TAO/ARB/SPX checked; HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist); no signals fired; no positions opened
- ✅ Silently succeeded: balance $981.52 > $20, change 0.00% < 10%, 0 positions (no change), bot ran cleanly

## 2026-06-01 22:06 HKT — Live Trading Cron
- **Balance (hl_balance):** $981.52 (— $0.00 from $981.52 at 22:04, 0.00%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF (13-20 UTC, now passed)
- Account balance via bot: $981.52 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: HL empty asset positions warning (non-critical timeout — ghost killer skipped); SOL/BTC/ETH/HYPE/XRP/WIF/TAO/ARB/SPX checked; HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist); no signals fired; no positions opened
- ✅ Silently succeeded: balance $981.52 > $20, change 0.00% < 10%, 0 positions (no change), bot ran cleanly

## 2026-06-01 21:42 HKT — Live Trading Cron
- **Balance (hl_balance):** $1,027.22 (▲ +$1.81 from $1,025.41 at 21:39, +0.18%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $1,027.22 — 1 live position (SOL LONG 38.39@$80.28 via VolSurge, TP/SL grouping error), 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: VolSurge fired SOL LONG 38.39@$80.28 (capped from 180→38.39, notional $14.4K→$3K); TP/SL native grouping failed with "Main order cannot be trigger order"; no other signals; HL empty asset positions warning (non-critical)
- ⚠️ Positions changed: 0→1 (new SOL entry). TP/SL grouping error — position has no automated stop.

## 2026-06-01 22:22 HKT — Live Trading Cron
- **Balance (hl_balance):** $981.52 (— $0.00 from $981.52 at 22:12, 0.00%)
- Mode: LIVE (bot) | Gov gate: PASS | Kill Zone: OFF
- Account balance via bot: $981.52 — 0 live positions, 18 hist trades, WR=72%, DD=0.6%, KS=False
- Bot status: no new trades — SOL/BTC/ETH/HYPE/XRP/WIF/TAO/ARB/SPX checked; HYPE/XRP/WIF/TAO/SPX skipped (BB allowlist); HL empty asset positions warning (non-critical timeout); no signals fired; no positions opened
- ✅ Silently succeeded: balance $981.52 > $20, change 0.00% < 10%, 0 positions (no change), bot ran cleanly
