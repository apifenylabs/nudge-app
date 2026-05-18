#!/usr/bin/env python3
"""TendersAlt production signal agent — generates signals using best validated params."""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.chdir(os.path.dirname(os.path.abspath(__file__)))

from tendersalt_v3 import generate_signals_v3, calculate_rsi, detect_swings, calculate_fib_levels, calculate_atr
from tendersalt_backtest import run_backtest_multiday
from orb_signal import load_ohlcv
from datetime import datetime
import numpy as np

# Best validated params from 216-run sweep
PARAMS = {
    "swing_min_height_pct": 8.0,
    "swing_window": 30,
    "atr_stop_mult": 2.5,
    "atr_tp1_mult": 4.0,
    "atr_tp2_mult": 7.0,
    "require_divergence": True,
    "divergence_threshold": 3.0,
    "use_trend_filter": True,
    "trend_ma_period": 50,
    "risk_per_trade_pct": 1.0,
    "account_balance": 1000.0,
    "max_position_pct": 20.0,
    "min_signal_gap_bars": 48,
}

def generate_and_backtest(data_path, output_path=None, show_trades=False):
    """Generate signals + run backtest in one shot."""
    print(f"Loading {data_path}...")
    df = load_ohlcv(data_path)
    
    print(f"Generating signals (swing={PARAMS['swing_min_height_pct']}%, "
          f"stop={PARAMS['atr_stop_mult']}x ATR, div={PARAMS['require_divergence']})...")
    
    # Use v4 signal generation for best results
    signals = generate_v4_signals(df, PARAMS)
    
    print(f"Found {len(signals)} signals")
    
    if not signals:
        return {"signals": [], "performance": None}
    
    # Run multi-day backtest
    print(f"Running backtest...")
    results = run_backtest_multiday(
        df, signals,
        slippage_bps=10,
        fee_bps=5,
        initial_balance=PARAMS["account_balance"],
    )
    
    perf = results["performance"]
    print(f"\nPERFORMANCE:")
    print(f"  Trades: {perf['num_trades']}")
    print(f"  Return: {perf['total_return_pct']:+.2f}%")
    print(f"  Win rate: {perf['win_rate_pct']:.0f}%")
    print(f"  Sharpe: {perf['sharpe_ratio']}")
    print(f"  Max DD: {perf['max_drawdown_pct']:.1f}%")
    print(f"  Profit Factor: {perf['profit_factor']:.2f}")
    
    if show_trades and results["trades"]:
        print(f"\nTRADES:")
        for t in sorted(results["trades"], key=lambda x: x.get("entry_date", x.get("date", ""))):
            print(f"  {t.get('entry_date','')[:10]} {t['side']:4s} "
                  f"${t['entry']:.2f}->${t['exit']:.2f} ${t['pnl']:+.2f} "
                  f"{t['exit_reason']} ({t['bars_held']} bars)")
    
    if output_path:
        output = {
            "generated_at": datetime.utcnow().isoformat(),
            "params": PARAMS,
            "performance": perf,
            "signals": signals,
            "trades": results["trades"],
        }
        with open(output_path, "w") as f:
            json.dump(output, f, indent=2)
        print(f"\nSaved to {output_path}")
    
    return results


def generate_v4_signals(df, params):
    """Generate v4 refined signals (the best-performing version)."""
    closes = df["close"].values
    highs = df["high"].values
    lows = df["low"].values
    rsi = calculate_rsi(closes, 14)
    atr = calculate_atr(df, 14)
    
    swings = detect_swings(df, 
        min_height_pct=params["swing_min_height_pct"], 
        window=params["swing_window"])
    
    signals = []
    signaled_keys = set()
    
    # Trend filter: MA50
    trend_ma = params["trend_ma_period"]
    use_tf = params["use_trend_filter"]
    ma50 = np.zeros(len(closes))
    for i in range(trend_ma, len(closes)):
        ma50[i] = np.mean(closes[i-trend_ma:i])
    
    for i in range(max(200, trend_ma), len(df)):
        c, h, l = closes[i], highs[i], lows[i]
        
        for pair in reversed(swings):
            if pair["swing_end"]["index"] >= i: continue
            if pair["swing_end"]["index"] < i - 300: break
            
            sk = f"{pair['swing_low']['index']}_{pair['swing_high']['index']}"
            if sk in signaled_keys: continue
            
            fib = calculate_fib_levels(pair["swing_low"]["price"], pair["swing_high"]["price"])
            gp_min, gp_max = fib["golden_pocket"]["entry_min"], fib["golden_pocket"]["entry_max"]
            
            if not (l <= gp_max and h >= gp_min): continue
            if abs(c - (gp_min+gp_max)/2) / ((gp_min+gp_max)/2) > 0.05: continue
            
            # RSI divergence
            rsi_swing = rsi[pair["swing_low"]["index"]]
            rsi_diff = rsi[i] - rsi_swing
            
            if params["require_divergence"]:
                if pair["direction"] == "UP" and rsi_diff < params["divergence_threshold"]: continue
                if pair["direction"] == "DOWN" and -rsi_diff < params["divergence_threshold"]: continue
            
            # Side: SELL when price retraces from UP swing, BUY when bounces from DOWN swing
            if pair["direction"] == "UP":
                side = "SELL"
            else:
                side = "BUY"
            
            # Trend filter: only take trades WITH the trend
            if use_tf and i >= trend_ma and not np.isnan(ma50[i]):
                trend_up = c > ma50[i]
                if (side == "BUY" and not trend_up) or (side == "SELL" and trend_up):
                    continue
            
            entry = c
            atr_v = atr[i]
            if atr_v <= 0: continue
            
            sm = params["atr_stop_mult"]
            tm1 = params["atr_tp1_mult"]
            tm2 = params["atr_tp2_mult"]
            
            if side == "SELL":
                stop = entry + atr_v * sm
                tp1 = entry - atr_v * tm1
                tp2 = entry - atr_v * tm2
            else:
                stop = entry - atr_v * sm
                tp1 = entry + atr_v * tm1
                tp2 = entry + atr_v * tm2
            
            risk = abs(entry - stop)
            risk_amount = params["account_balance"] * params["risk_per_trade_pct"] / 100
            qty = min(
                risk_amount / risk if risk > 0 else 0,
                (params["account_balance"] * params["max_position_pct"] / 100) / entry
            )
            
            signals.append({
                "strategy": "TENDERSALT_V4",
                "timestamp": str(df["timestamp"].iloc[i]),
                "bar_index": int(i),
                "side": side,
                "entry_price": round(entry, 4),
                "stop_loss": round(stop, 4),
                "take_profit_1": round(tp1, 4),
                "take_profit_2": round(tp2, 4),
                "position_size": round(qty, 6),
                "risk_amount": round(risk_amount, 2),
                "risk_reward_1": round(abs(tp1-entry)/risk, 2) if risk > 0 else 0,
                "risk_reward_2": round(abs(tp2-entry)/risk, 2) if risk > 0 else 0,
                "swing_low": pair["swing_low"]["price"],
                "swing_high": pair["swing_high"]["price"],
                "swing_height_pct": pair["height_pct"],
                "swing_direction": pair["direction"],
                "golden_pocket_min": gp_min,
                "golden_pocket_max": gp_max,
                "rsi_at_swing": round(float(rsi_swing), 1),
                "rsi_current": round(float(rsi[i]), 1),
                "rsi_diff": round(float(rsi_diff), 1),
                "fib_1_618": fib["extension"]["1.618"],
                "fib_2_000": fib["extension"]["2.000"],
            })
            signaled_keys.add(sk)
            break
    
    return signals


if __name__ == "__main__":
    data_path = sys.argv[1] if len(sys.argv) > 1 else "data/SOLUSDT_15m_90d.csv"
    output_path = sys.argv[2] if len(sys.argv) > 2 else "data/TENDERSALT_v4_production.json"
    show_trades = "--show" in sys.argv
    
    generate_and_backtest(data_path, output_path, show_trades=show_trades)
