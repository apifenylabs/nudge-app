#!/usr/bin/env python3
"""
15M Scalp Frequency Test — BB(10,2.0) + RSI(14) < 20
Same exact code as bb_core_stress_test.py but on 15m data.

Key question: Does 15m give 4-10x more signals than 1h while maintaining WR > 50%?
"""

import sys
import os
import numpy as np
import pandas as pd
import ccxt
import warnings
import traceback
import time as time_module
from datetime import datetime, timezone, timedelta

warnings.filterwarnings("ignore")
np.random.seed(42)

# ─── Strategy (exact production code from bb_core.py) ────────────────────────

def compute_bb(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df["bb_mid"] = df["close"].rolling(10).mean()
    df["bb_std"] = df["close"].rolling(10).std()
    df["bb_upper"] = df["bb_mid"] + 2.0 * df["bb_std"]
    df["bb_lower"] = df["bb_mid"] - 2.0 * df["bb_std"]
    delta = df["close"].diff()
    gain = delta.clip(lower=0).rolling(14).mean()
    loss = -delta.clip(upper=0).rolling(14).mean()
    rs = gain / loss.replace(0, np.nan)
    df["rsi"] = 100 - (100 / (1 + rs))
    high_low = df["high"] - df["low"]
    high_close = (df["high"] - df["close"].shift()).abs()
    low_close = (df["low"] - df["close"].shift()).abs()
    tr = high_low.combine(high_close, max).combine(low_close, max)
    df["atr"] = tr.rolling(14).mean()
    return df


# ─── Data fetching (15m) ─────────────────────────────────────────────────────

# 6 months of data
END = datetime.now(timezone.utc)
START_6M = END - timedelta(days=183)
START_STR = START_6M.strftime("%Y-%m-%dT00:00:00Z")
END_STR = END.strftime("%Y-%m-%dT23:00:00Z")

print(f"Data range: {START_6M.date()} → {END.date()} ({183} days)")

EXCHANGES = {
    "SOL/USDT": "binance",
    "BTC/USDT": "binance",
    "ETH/USDT": "binance",
    "XRP/USDT": "binance",
    "WIF/USDT": "binance",
    "TAO/USDT": "binance",
    "HYPE/USDT": "hyperliquid",
}

SLIPPAGE_BP = {
    "SOL/USDT": 2.5,
    "BTC/USDT": 0.5,
    "ETH/USDT": 1,
    "XRP/USDT": 2.5,
    "WIF/USDT": 4,
    "TAO/USDT": 4,
    "HYPE/USDT": 3,
}


def fetch_ohlcv(symbol: str, exchange_name: str, timeframe: str = "15m", limit: int = 1000) -> pd.DataFrame | None:
    """Fetch OHLCV at given timeframe. Properly paginates through all data."""
    name_to_exc = {
        "binance": ccxt.binance({"enableRateLimit": True}),
        "hyperliquid": ccxt.hyperliquid({"enableRateLimit": True}),
        "bybit": ccxt.bybit({"enableRateLimit": True}),
        "kucoin": ccxt.kucoin({"enableRateLimit": True}),
    }

    tries = [exchange_name]
    if exchange_name not in ("bybit", "kucoin"):
        tries.extend(["bybit", "kucoin"])

    for exc_name in tries:
        exc = name_to_exc.get(exc_name)
        if exc is None:
            continue
        try:
            since = exc.parse8601(START_STR)
            all_ohlcv = []
            # Calculate rate limit sleep
            sleep_s = exc.rateLimit / 1000 if exc.rateLimit else 0.2

            while True:
                ohlcv = exc.fetch_ohlcv(symbol, timeframe, since=since, limit=limit)
                if not ohlcv:
                    break
                all_ohlcv.extend(ohlcv)
                if len(ohlcv) < limit:
                    break
                since = ohlcv[-1][0]  # use exact last timestamp
                time_module.sleep(sleep_s)

            if not all_ohlcv:
                print(f"  ⚠ {symbol} on {exc_name} ({timeframe}): no data")
                continue

            df = pd.DataFrame(all_ohlcv, columns=["timestamp", "open", "high", "low", "close", "volume"])
            df["timestamp"] = pd.to_datetime(df["timestamp"], unit="ms", utc=True)
            df = df.drop_duplicates(subset="timestamp").sort_values("timestamp").reset_index(drop=True)
            mask = (df["timestamp"] >= pd.Timestamp(START_STR)) & (df["timestamp"] <= pd.Timestamp(END_STR))
            df = df[mask].reset_index(drop=True)
            print(f"  ✅ {symbol} ({timeframe}) from {exc_name}: {len(df)} bars ({df['timestamp'].iloc[0].date()} → {df['timestamp'].iloc[-1].date()})")
            return df
        except Exception as e:
            print(f"  ❌ {symbol} on {exc_name} ({timeframe}): {e}")
            traceback.print_exc()
            continue
    return None


# ─── Backtest engine ─────────────────────────────────────────────────────────

def run_backtest(df: pd.DataFrame, slippage_bp: float = 0) -> dict:
    """Run BB Core backtest, return trade list and stats."""
    df = compute_bb(df).copy()
    trades = []
    bar_idx = 0
    n = len(df)

    while bar_idx < n:
        bar = df.iloc[bar_idx]
        rsi = bar["rsi"]
        close = bar["close"]
        lower = bar["bb_lower"]
        atr = bar["atr"]

        if pd.isna(rsi) or pd.isna(atr):
            bar_idx += 1
            continue

        # Entry: RSI < 20 AND close < lower BB
        if rsi < 20 and close < lower:
            entry_price = float(close)
            entry_slippage = entry_price * (slippage_bp / 10000)
            actual_entry = entry_price + entry_slippage  # long entry slip up

            tp_price = actual_entry + 1.5 * float(atr)
            sl_price = actual_entry - 0.75 * float(atr)
            max_hold = 48  # 48 bars = 12h on 15m

            exit_price = None
            exit_reason = None
            bars_held = 0

            for lookahead in range(1, min(max_hold + 1, n - bar_idx)):
                future = df.iloc[bar_idx + lookahead]
                high = float(future["high"])
                low = float(future["low"])
                bars_held += 1

                if high >= tp_price:
                    exit_price = tp_price
                    exit_reason = "TP"
                    break
                if low <= sl_price:
                    exit_price = sl_price
                    exit_reason = "SL"
                    break

            if exit_price is None:
                exit_bar_idx = bar_idx + min(max_hold, n - bar_idx - 1)
                exit_price = float(df.iloc[exit_bar_idx]["close"])
                exit_reason = "TIME"
            else:
                exit_bar_idx = bar_idx + bars_held

            exit_slippage = exit_price * (slippage_bp / 10000)
            actual_exit = exit_price - exit_slippage

            r_mult = (actual_exit - actual_entry) / float(atr) if atr != 0 else 0

            trades.append({
                "entry_bar": bar_idx,
                "exit_bar": exit_bar_idx,
                "entry": actual_entry,
                "exit": actual_exit,
                "atr": float(atr),
                "r": r_mult,
                "rsi_entry": float(rsi),
                "bars_held": bars_held,
                "exit_reason": exit_reason,
            })

            bar_idx = exit_bar_idx + 1
        else:
            bar_idx += 1

    if not trades:
        total_days = (df["timestamp"].iloc[-1] - df["timestamp"].iloc[0]).total_seconds() / 86400
        weeks = total_days / 7 if total_days > 0 else 1
        return {"trades": [], "total_signals": 0, "wins": 0, "losses": 0,
                "wr": 0, "pf": 0, "total_r": 0, "avg_r": 0,
                "max_consec_losses": 0, "avg_bars_held": 0,
                "signals_per_week": 0, "total_days": round(total_days, 1), "weeks": round(weeks, 1)}

    trade_df = pd.DataFrame(trades)
    wins = trade_df[trade_df["r"] > 0]
    losses = trade_df[trade_df["r"] <= 0]
    total_signals = len(trade_df)
    wr = len(wins) / total_signals if total_signals > 0 else 0
    total_gain = trade_df[trade_df["r"] > 0]["r"].sum()
    total_loss = abs(trade_df[trade_df["r"] < 0]["r"].sum())
    pf = total_gain / total_loss if total_loss > 0 else (total_gain if total_gain > 0 else 0)
    total_r = trade_df["r"].sum()

    r_signs = (trade_df["r"] > 0).astype(int).tolist()
    max_consec = 0
    curr = 0
    for s in r_signs:
        if s == 0:
            curr += 1
            max_consec = max(max_consec, curr)
        else:
            curr = 0

    total_days = (df["timestamp"].iloc[-1] - df["timestamp"].iloc[0]).total_seconds() / 86400
    weeks = total_days / 7 if total_days > 0 else 1
    signals_per_week = round(total_signals / weeks, 2)

    result = {
        "trades": trades,
        "total_signals": total_signals,
        "total_days": round(total_days, 1),
        "weeks": round(weeks, 1),
        "wins": len(wins),
        "losses": len(losses),
        "wr": round(wr * 100, 1),
        "pf": round(pf, 2),
        "total_r": round(total_r, 2),
        "avg_r": round(trade_df["r"].mean(), 3),
        "max_consec_losses": max_consec,
        "avg_bars_held": round(trade_df["bars_held"].mean(), 1),
        "signals_per_week": signals_per_week,
    }
    return result


# ─── Main ────────────────────────────────────────────────────────────────────

def main():
    results = {}

    for symbol, default_exchange in EXCHANGES.items():
        slippage_bp = SLIPPAGE_BP.get(symbol, 2.5)
        print(f"\n{'='*60}")
        print(f"📊 {symbol} (slippage: {slippage_bp}bp, exchange: {default_exchange})")
        print(f"{'='*60}")

        df_15m = fetch_ohlcv(symbol, default_exchange, "15m")
        if df_15m is None or len(df_15m) < 100:
            print(f"  ❌ FAILED: insufficient 15m data for {symbol}")
            results[symbol] = {"error": "insufficient 15m data"}
            continue

        df_1h = fetch_ohlcv(symbol, default_exchange, "1h")
        if df_1h is None or len(df_1h) < 100:
            print(f"  ⚠ Could not get 1h reference for {symbol}")
            df_1h = None

        try:
            bt_15m = run_backtest(df_15m, slippage_bp)
            print(f"\n  📈 15M RESULTS:")
            print(f"     Signals: {bt_15m['total_signals']} ({bt_15m['signals_per_week']}/week)")
            print(f"     WR: {bt_15m['wr']}% | PF: {bt_15m['pf']} | Total R: {bt_15m['total_r']}")
            print(f"     Max Consec Losses: {bt_15m['max_consec_losses']} | Avg Bars Held: {bt_15m['avg_bars_held']}")
            print(f"     Period: {bt_15m['total_days']} days ({bt_15m['weeks']} weeks)")

            bt_1h = None
            if df_1h is not None:
                bt_1h = run_backtest(df_1h, slippage_bp)
                print(f"\n  📈 1H REFERENCE:")
                print(f"     Signals: {bt_1h['total_signals']} ({bt_1h['signals_per_week']}/week)")
                print(f"     WR: {bt_1h['wr']}% | PF: {bt_1h['pf']} | Total R: {bt_1h['total_r']}")

            signal_ratio = bt_15m['total_signals'] / max(bt_1h['total_signals'], 1) if bt_1h else None
            if signal_ratio:
                print(f"\n  🔄 Signal Ratio 15m/1h: {signal_ratio:.1f}x")

            results[symbol] = {
                "15m": {
                    "signals": bt_15m["total_signals"],
                    "signals_per_week": bt_15m["signals_per_week"],
                    "wr": bt_15m["wr"],
                    "pf": bt_15m["pf"],
                    "total_r": bt_15m["total_r"],
                    "avg_r": bt_15m["avg_r"],
                    "max_consec_losses": bt_15m["max_consec_losses"],
                    "avg_bars_held": bt_15m["avg_bars_held"],
                    "trades": bt_15m["trades"],
                    "total_days": bt_15m["total_days"],
                },
                "1h_ref": {
                    "signals": bt_1h["total_signals"] if bt_1h else 0,
                    "signals_per_week": bt_1h["signals_per_week"] if bt_1h else 0,
                    "wr": bt_1h["wr"] if bt_1h else 0,
                    "pf": bt_1h["pf"] if bt_1h else 0,
                    "total_r": bt_1h["total_r"] if bt_1h else 0,
                },
                "signal_ratio_15m_to_1h": round(signal_ratio, 2) if signal_ratio else 0,
            }

        except Exception as e:
            print(f"  ❌ FAILED: {e}")
            traceback.print_exc()
            results[symbol] = {"error": str(e)}

    # ─── Output table ──────────────────────────────────────────────────────
    print(f"\n\n{'='*60}")
    print("📋 15M SCALP RESULTS")
    print(f"{'='*60}")

    valid = {k: v for k, v in results.items() if "error" not in v}
    ranked = sorted(valid.items(), key=lambda x: x[1]["15m"]["wr"], reverse=True)

    lines = []
    lines.append("# 15M Scalp Frequency Test Results")
    lines.append("")
    lines.append("## Strategy (exact BB Core)")
    lines.append("- BB(10,2.0) + RSI(14) < 20 entry")
    lines.append("- TP = 1.5 × ATR(14) | SL = 0.75 × ATR(14)")
    lines.append("- Max hold = 48 bars (12h on 15m, 48h on 1h)")
    lines.append("- Non-overlapping trades (bar skip)")
    lines.append("- Slippage: 0.5-4bp depending on liquidity")
    lines.append("- RSI(14) = SMA of gains/losses (exact bb_core.py)")
    lines.append("")
    lines.append("## Data Range")
    lines.append(f"- **15m OHLCV**: {START_6M.date()} → {END.date()} ({183} days)")
    lines.append(f"- Generated: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}")
    lines.append("")

    lines.append("## Per-Pair Results")
    lines.append("")
    lines.append("| Pair | 15m Signals | 1h Signals | Ratio (15m/1h) | 15m WR% | 15m PF | 15m Total R | 15m Avg R | 1h WR% | 1h PF | Trades/Week (15m) | Max Consec Loss | Avg Bars Held | Verdict |")
    lines.append("|------|:----------:|:----------:|:--------------:|:-------:|:------:|:-----------:|:---------:|:------:|:-----:|:-----------------:|:---------------:|:-------------:|:-------:|")

    for symbol_key, r in ranked:
        m = r["15m"]
        h = r["1h_ref"]
        ratio = r["signal_ratio_15m_to_1h"]

        if m["wr"] >= 50:
            verdict = "✅ PASS"
        elif m["wr"] >= 35:
            verdict = "⚠️ EDGE"
        else:
            verdict = "❌ NOISE"

        if ratio >= 4 and m["wr"] >= 40:
            verdict += " + HIGH FREQ"
        elif ratio >= 2:
            verdict += " (freq OK)"
        else:
            verdict += " (low freq)"

        lines.append(
            f"| {symbol_key} | {m['signals']} | {h['signals']} | {ratio}x | "
            f"{m['wr']}% | {m['pf']} | {m['total_r']} | {m['avg_r']} | "
            f"{h['wr']}% | {h['pf']} | "
            f"{m['signals_per_week']} | {m['max_consec_losses']} | {m['avg_bars_held']} | {verdict} |"
        )

    lines.append("")

    # Summary stats
    avg_15m_wr = np.mean([r["15m"]["wr"] for sym, r in ranked]) if ranked else 0
    avg_ratio = np.mean([r["signal_ratio_15m_to_1h"] for sym, r in ranked]) if ranked else 0
    total_15m_sigs = sum([r["15m"]["signals"] for sym, r in ranked])
    total_1h_sigs = sum([r["1h_ref"]["signals"] for sym, r in ranked])
    avg_spw = np.mean([r["15m"]["signals_per_week"] for sym, r in ranked]) if ranked else 0

    passes = [(sym, r) for sym, r in ranked if r["15m"]["wr"] >= 50]
    edges = [(sym, r) for sym, r in ranked if 35 <= r["15m"]["wr"] < 50]
    noise = [(sym, r) for sym, r in ranked if r["15m"]["wr"] < 35]

    lines.append("## Summary")
    lines.append("")
    lines.append(f"- **Average 15m WR: {avg_15m_wr:.1f}%**")
    lines.append(f"- **Average signal ratio (15m/1h): {avg_ratio:.1f}x**")
    lines.append(f"- **Total 15m signals (all pairs): {total_15m_sigs}**")
    lines.append(f"- **Total 1h signals (all pairs): {total_1h_sigs}**")
    lines.append(f"- **Average trades/week on 15m: {avg_spw:.1f}**")
    lines.append("")
    lines.append(f"- **PASS (WR ≥ 50%): {len(passes)} pairs**")
    for sym, r in passes:
        lines.append(f"  - {sym}: {r['15m']['wr']}% WR, {r['15m']['signals_per_week']}/week")
    lines.append(f"- **EDGE (WR 35-50%): {len(edges)} pairs**")
    for sym, r in edges:
        lines.append(f"  - {sym}: {r['15m']['wr']}% WR, {r['15m']['signals_per_week']}/week")
    lines.append(f"- **NOISE (WR < 35%): {len(noise)} pairs**")
    for sym, r in noise:
        lines.append(f"  - {sym}: {r['15m']['wr']}% WR, {r['15m']['signals_per_week']}/week")
    lines.append("")

    # Key question answer
    lines.append("## Key Question")
    lines.append("")
    lines.append("> **Does 15m provide 4-10× more signals than 1h while maintaining WR > 50%?**")
    lines.append("")

    if avg_15m_wr >= 50 and avg_ratio >= 4:
        lines.append("### ✅ YES — 15m is worth running as a parallel system")
        lines.append(f"- WR: {avg_15m_wr:.1f}% (above 50% threshold)")
        lines.append(f"- Signal ratio: {avg_ratio:.1f}x (above 4× threshold)")
    elif avg_15m_wr >= 35:
        lines.append("### ⚠️ QUALIFIED — 15m has edge but needs size control")
        lines.append(f"- WR: {avg_15m_wr:.1f}% (above 35% edge threshold, below 50% pass threshold)")
        lines.append(f"- Signal ratio: {avg_ratio:.1f}x")
        if avg_ratio >= 4:
            lines.append("- Signal frequency is high enough. Use smaller position sizing.")
    else:
        lines.append("### ❌ NO — 15m noise is too high for this strategy")
        lines.append(f"- WR: {avg_15m_wr:.1f}% (below 35% noise threshold)")
        lines.append(f"- Signal ratio: {avg_ratio:.1f}x")

    lines.append("")
    lines.append("## Trade Details (15m)")
    lines.append("")

    for symbol_key, r in ranked:
        m = r["15m"]
        trades = m.get("trades", [])
        lines.append(f"### {symbol_key}")
        lines.append(f"- **Signals**: {m['signals']} over {m['total_days']} days ({m['signals_per_week']}/week)")
        lines.append(f"- **WR**: {m['wr']}% | **PF**: {m['pf']} | **Total R**: {m['total_r']} | **Avg R**: {m['avg_r']}")
        lines.append(f"- **Max Consec Losses**: {m['max_consec_losses']} | **Avg Bars Held**: {m['avg_bars_held']}")
        lines.append("")

        if trades:
            reasons = {}
            for t in trades:
                rsn = t["exit_reason"]
                reasons[rsn] = reasons.get(rsn, 0) + 1
            lines.append(f"  Exit breakdown: {reasons}")
            lines.append("")

            r_vals = [t["r"] for t in trades]
            r_signs_bin = [1 if t > 0 else 0 for t in r_vals]
            runs = []
            current_run = 0
            for s in r_signs_bin:
                if s == 0:
                    current_run += 1
                else:
                    if current_run > 0:
                        runs.append(current_run)
                    current_run = 0
            if current_run > 0:
                runs.append(current_run)
            if runs:
                lines.append(f"  Loss runs (lengths): {runs[:15]}{'...' if len(runs) > 15 else ''}")
                lines.append(f"  Worst loss run: {max(runs)} consecutive losses")
            lines.append("")

    lines.append("---")
    lines.append("### Methodology")
    lines.append("- RSI(14) computed as SMA of gains/losses over 14 periods (exact bb_core.py code)")
    lines.append("- Entry: RSI < 20 AND close < BB lower band")
    lines.append("- Exit: TP (1.5×ATR) or SL (0.75×ATR) or time stop (48 bars = 12h on 15m)")
    lines.append("- Non-overlapping: after trade exits, skip to next bar")
    lines.append("- Slippage applied: entry × (1 + bp/10000), exit × (1 - bp/10000)")
    lines.append("")
    lines.append("### Legend")
    lines.append("- **PASS**: WR ≥ 50% — viable parallel system")
    lines.append("- **EDGE**: WR 35-50% — tradeable with careful position sizing")
    lines.append("- **NOISE**: WR < 35% — not worth trading")

    output = "\n".join(lines)
    output_path = "/home/captain/.openclaw/workspace/15m_scalp_results.md"
    with open(output_path, "w") as f:
        f.write(output)
    print(f"\n📄 Written to {output_path}")

    print(f"\n{'='*60}")
    print("SUMMARY")
    print(f"{'='*60}")
    print(f"Avg 15m WR: {avg_15m_wr:.1f}%")
    print(f"Avg signal ratio (15m/1h): {avg_ratio:.1f}x")
    print(f"Pass (WR≥50%): {len(passes)} | Edge (35-50%): {len(edges)} | Noise (<35%): {len(noise)}")


if __name__ == "__main__":
    main()
