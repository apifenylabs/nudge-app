#!/usr/bin/env python3
"""
15m Intraday BB Core Strategy Scan
BB(10,2.0) RSI<20 TP=1.5% SL=0.75%
Scalp/intraday mode for all 12 pairs across Binance + Hyperliquid.
"""

import ccxt
import pandas as pd
import numpy as np
import time
from datetime import datetime, timedelta, timezone

# ── Config ──────────────────────────────────────────────────────────────────
BB_PERIOD = 10
BB_STD = 2.0
RSI_PERIOD = 14
RSI_THRESHOLD = 20
TAKE_PROFIT_PCT = 1.5  # 1.5%
STOP_LOSS_PCT = 0.75   # 0.75%
TIMEFRAME = '15m'
DAYS_LOOKBACK = 90

# POPCAT/USDT:USDT is Binance futures naming
BINANCE_PAIRS = [
    'SOL/USDT', 'BTC/USDT', 'ETH/USDT', 'XRP/USDT',
    'AVAX/USDT', 'DOGE/USDT', 'SUI/USDT', 'WIF/USDT',
    'BONK/USDT', 'POPCAT/USDT:USDT', 'TAO/USDT',
]
HYPER_PAIRS = ['HYPE/USDT']

# ── Helpers ──────────────────────────────────────────────────────────────────

def compute_rsi(series, period=14):
    """Simple rolling RSI (equivalent to TradingView default)."""
    delta = series.diff()
    gain = delta.clip(lower=0)
    loss = (-delta).clip(lower=0)
    avg_gain = gain.rolling(window=period, min_periods=period).mean()
    avg_loss = loss.rolling(window=period, min_periods=period).mean()
    rs = avg_gain / avg_loss.replace(0, np.nan)
    rsi = 100 - (100 / (1 + rs))
    return rsi

def compute_bollinger(series, period=10, std=2.0):
    """BB upper, middle, lower."""
    mid = series.rolling(window=period).mean()
    sd = series.rolling(window=period).std(ddof=0)
    upper = mid + std * sd
    lower = mid - std * sd
    return upper, mid, lower

def fetch_ohlcv(exchange, symbol, timeframe, limit):
    """Fetch OHLCV data, retry once on failure."""
    try:
        ohlcv = exchange.fetch_ohlcv(symbol, timeframe, limit=limit)
        return ohlcv
    except Exception as e:
        print(f"  ⚠ Retry fetch for {symbol}: {e}")
        time.sleep(3)
        ohlcv = exchange.fetch_ohlcv(symbol, timeframe, limit=limit)
        return ohlcv

def analyze_pair(df, pair):
    """Run BB Core strategy on the dataframe. Returns metrics dict."""
    df = df.copy()
    if len(df) < 100:
        return None

    # Compute indicators
    df['bb_upper'], df['bb_mid'], df['bb_lower'] = compute_bollinger(df['close'], BB_PERIOD, BB_STD)
    df['rsi'] = compute_rsi(df['close'], period=RSI_PERIOD)

    # Signal: close < bb_lower AND rsi < 20
    df['signal'] = (df['close'] < df['bb_lower']) & (df['rsi'] < RSI_THRESHOLD)

    # Get signal positions
    signal_positions = df.index[df['signal']].tolist()
    total_signals = len(signal_positions)

    if total_signals == 0:
        return {
            'pair': pair,
            'signals_last_90d': 0,
            'recent_wr': 0.0,
            'avg_bars_held': 0.0,
            'total_r_last_90d': 0.0,
            'signal_frequency_per_day': 0.0,
            'total_trades': 0,
            'wins': 0,
            'losses': 0
        }

    # Simulate trades: enter at signal close, exit next bar (shift(1) logic)
    wins = 0
    losses = 0
    returns_list = []

    # Use integer position in the dataframe rather than Timestamp index
    # Reset index so we can use iloc
    df_reset = df.reset_index(drop=False)
    signal_ilocs = df_reset.index[df['signal'].values].tolist()

    for pos in signal_ilocs:
        if pos + 1 >= len(df_reset):
            continue

        entry_price = float(df_reset.iloc[pos]['close'])
        next_row = df_reset.iloc[pos + 1]

        high_next = float(next_row['high'])
        low_next = float(next_row['low'])

        tp_price = entry_price * (1 + TAKE_PROFIT_PCT / 100)
        sl_price = entry_price * (1 - STOP_LOSS_PCT / 100)

        # Simulate intra-bar exit (long only)
        if high_next >= tp_price:
            wins += 1
            returns_list.append(TAKE_PROFIT_PCT / 100)
        elif low_next <= sl_price:
            losses += 1
            returns_list.append(-STOP_LOSS_PCT / 100)
        else:
            # Close at next bar close
            close_next = float(next_row['close'])
            ret = (close_next - entry_price) / entry_price
            if ret > 0:
                wins += 1
            else:
                losses += 1
            returns_list.append(ret)

    total_trades = len(returns_list)
    wr = (wins / total_trades * 100) if total_trades > 0 else 0.0
    total_r = sum(returns_list) * 100  # as percentage

    # Signal freq: signals per day
    date_range_days = (df.index[-1] - df.index[0]).total_seconds() / 86400
    freq = total_signals / date_range_days if date_range_days > 0 else 0

    return {
        'pair': pair,
        'signals_last_90d': total_signals,
        'recent_wr': round(wr, 1),
        'avg_bars_held': 1.0,  # always 1 bar with shift(1) exit
        'total_r_last_90d': round(total_r, 2),
        'signal_frequency_per_day': round(freq, 2),
        'total_trades': total_trades,
        'wins': wins,
        'losses': losses
    }

# ── Main ────────────────────────────────────────────────────────────────────
print("=" * 70)
print("15m BB Core Strategy Scan — BB(10,2) RSI<20 TP1.5 SL0.75")
print(f"Started: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}")
print("=" * 70)

# Init exchanges
binance = ccxt.binance({'enableRateLimit': True})
hyperliquid = ccxt.hyperliquid({'enableRateLimit': True})

# Determine limit for ~90d of 15m data: 90 * 24 * 4 = 8640 candles
limit = 9000  # pad slightly

results = []

# ── Binance pairs ───────────────────────────────────────────────────────────
print("\n📊 Fetching Binance pairs...")
for pair in BINANCE_PAIRS:
    print(f"  → {pair} ... ", end='', flush=True)
    try:
        ohlcv = fetch_ohlcv(binance, pair, TIMEFRAME, limit)
        df = pd.DataFrame(ohlcv, columns=['timestamp', 'open', 'high', 'low', 'close', 'volume'])
        df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms', utc=True)
        df.set_index('timestamp', inplace=True)

        # Trim to last 90d
        cutoff = datetime.now(timezone.utc) - timedelta(days=DAYS_LOOKBACK)
        cutoff = cutoff.replace(tzinfo=timezone.utc)
        df = df[df.index >= cutoff]

        result = analyze_pair(df, pair)
        if result:
            results.append(result)
            print(f"{result['signals_last_90d']} signals, WR {result['recent_wr']}%")
        else:
            print("insufficient data")
    except Exception as e:
        print(f"FAILED: {e}")

# ── Hyperliquid pairs ──────────────────────────────────────────────────────
print("\n📊 Fetching Hyperliquid pairs...")
for pair in HYPER_PAIRS:
    print(f"  → {pair} ... ", end='', flush=True)
    try:
        ohlcv = fetch_ohlcv(hyperliquid, pair, TIMEFRAME, limit)
        df = pd.DataFrame(ohlcv, columns=['timestamp', 'open', 'high', 'low', 'close', 'volume'])
        df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms', utc=True)
        df.set_index('timestamp', inplace=True)

        cutoff = datetime.now(timezone.utc) - timedelta(days=DAYS_LOOKBACK)
        cutoff = cutoff.replace(tzinfo=timezone.utc)
        df = df[df.index >= cutoff]

        result = analyze_pair(df, pair)
        if result:
            results.append(result)
            print(f"{result['signals_last_90d']} signals, WR {result['recent_wr']}%")
        else:
            print("insufficient data")
    except Exception as e:
        print(f"FAILED: {e}")

# ── Results ────────────────────────────────────────────────────────────────
print("\n" + "=" * 70)
print("📈 RANKED RESULTS")
print("=" * 70)
header = f"{'Pair':<16} {'Signals':>8} {'WR%':>7} {'AvgBars':>8} {'TotR%':>10} {'Freq/d':>8} {'Trades':>8}"
print(header)
print("-" * 70)

# Sort by total R descending
results.sort(key=lambda r: r['total_r_last_90d'], reverse=True)

for r in results:
    pair_label = r['pair'].replace(':USDT', '') if ':USDT' in r['pair'] else r['pair']
    print(f"{pair_label:<16} {r['signals_last_90d']:>8} {r['recent_wr']:>6}% {r['avg_bars_held']:>8} {r['total_r_last_90d']:>9}% {r['signal_frequency_per_day']:>8} {r['total_trades']:>8}")

print("-" * 70)

# ── Verdict ─────────────────────────────────────────────────────────────────
print("\n🎯 VERDICT")
print("-" * 70)

worthy = []
meh = []
skip = []

for r in results:
    score = 0
    if r['recent_wr'] >= 50:
        score += 1
    if r['total_r_last_90d'] > 0:
        score += 1
    if r['signal_frequency_per_day'] >= 0.5:
        score += 1
    if r['total_trades'] >= 5:
        score += 1

    if score >= 3:
        worthy.append(r)
    elif score >= 2:
        meh.append(r)
    else:
        skip.append(r)

if worthy:
    print("\n✅ Worth monitoring for 15m scalping alongside 1h system:")
    for r in worthy:
        p = r['pair'].replace(':USDT', '')
        print(f"   • {p:<12} — WR {r['recent_wr']}% | TotR {r['total_r_last_90d']:+.2f}% | {r['signal_frequency_per_day']}/day | {r['total_trades']} trades")

if meh:
    print("\n⚠️  Borderline — could watch but not primary:")
    for r in meh:
        p = r['pair'].replace(':USDT', '')
        print(f"   • {p:<12} — WR {r['recent_wr']}% | TotR {r['total_r_last_90d']:+.2f}% | {r['signal_frequency_per_day']}/day")

if skip:
    print("\n❌ Avoid or low conviction:")
    for r in skip:
        p = r['pair'].replace(':USDT', '')
        print(f"   • {p:<12} — WR {r['recent_wr']}% | TotR {r['total_r_last_90d']:+.2f}% | {r['signal_frequency_per_day']}/day")

print("\n" + "=" * 70)
print("Done.")
print("=" * 70)

# ── Write markdown report ──────────────────────────────────────────────────
run_ts = datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')
md = (
    "# 15m Intraday BB Core Strategy Scan\n\n"
    "**Strategy:** BB(10,2.0) + RSI < 20 | TP = 1.5% | SL = 0.75%\n"
    "**Data:** 15-minute candles, last ~90 days\n"
    f"**Run:** {run_ts}\n\n"
    "## Results (ranked by total R)\n\n"
    "| Pair | Signals | WR% | Avg Bars Held | Total R% | Freq/day | Trades |\n"
    "|------|---------|------|--------------|---------|----------|--------|\n"
)

for r in results:
    pair_label = r['pair'].replace(':USDT', '')
    md += f"| {pair_label} | {r['signals_last_90d']} | {r['recent_wr']}% | {r['avg_bars_held']} | {r['total_r_last_90d']:+.2f}% | {r['signal_frequency_per_day']} | {r['total_trades']} |\n"

md += "\n## Verdict\n\n"

if worthy:
    md += "### ✅ Worth Monitoring (alongside 1h system)\n\n"
    for r in worthy:
        p = r['pair'].replace(':USDT', '')
        md += f"- **{p}** — WR {r['recent_wr']}%, Total R {r['total_r_last_90d']:+.2f}%, {r['signal_frequency_per_day']} signals/day, {r['total_trades']} trades\n"
    md += "\n"

if meh:
    md += "### ⚠️ Borderline\n\n"
    for r in meh:
        p = r['pair'].replace(':USDT', '')
        md += f"- {p} — WR {r['recent_wr']}%, Total R {r['total_r_last_90d']:+.2f}%, {r['signal_frequency_per_day']}/day\n"
    md += "\n"

if skip:
    md += "### ❌ Avoid / Low Conviction\n\n"
    for r in skip:
        p = r['pair'].replace(':USDT', '')
        md += f"- {p} — WR {r['recent_wr']}%, Total R {r['total_r_last_90d']:+.2f}%, {r['signal_frequency_per_day']}/day\n"
    md += "\n"

md += "---\n*Generated automatically by intraday_15m_scan.py*\n"

with open('/home/captain/.openclaw/workspace/intraday_15m_scan.md', 'w') as f:
    f.write(md)

print("\n✅ Report written to intraday_15m_scan.md")
