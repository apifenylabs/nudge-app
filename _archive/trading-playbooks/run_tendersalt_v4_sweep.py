#!/usr/bin/env python3
"""TendersAlt v4: Comprehensive parameter sweep with full backtesting."""
import sys, os, json, itertools
sys.path.insert(0, "/home/captain/.openclaw/workspace/trading-playbooks/scripts")
os.chdir("/home/captain/.openclaw/workspace/trading-playbooks")

from orb_signal import load_ohlcv
from tendersalt_v3 import detect_swings, calculate_fib_levels, calculate_rsi
from tendersalt_backtest import run_backtest_multiday
import numpy as np

DATASETS = {
    "SOL_15m_bear": "data/SOLUSDT_15m_90d.csv",
    "SOL_1h_choppy": "data/SOLUSDT_uptrend_30m.csv",
}

def generate_v4_signals(df, swing_min_pct, atr_stop_mult, atr_tp1_mult, atr_tp2_mult,
                        require_divergence=False, skip_direction=None):
    """Generate v4 signals with configurable params."""
    closes = df['close'].values
    highs = df['high'].values
    lows = df['low'].values
    
    rsi = calculate_rsi(closes, 14)
    swings = detect_swings(df, min_height_pct=swing_min_pct)
    signals = []
    signaled_keys = set()
    
    for i in range(200, len(df)):
        for pair in reversed(swings):
            if pair['swing_end']['index'] >= i: continue
            if pair['swing_end']['index'] < i - 300: break
            
            sk = f"{pair['swing_low']['index']}_{pair['swing_high']['index']}"
            if sk in signaled_keys: continue
            
            fib = calculate_fib_levels(pair['swing_low']['price'], pair['swing_high']['price'])
            gp_min, gp_max = fib['golden_pocket']['entry_min'], fib['golden_pocket']['entry_max']
            if not (lows[i] <= gp_max and highs[i] >= gp_min): continue
            if abs(closes[i] - (gp_min+gp_max)/2) / ((gp_min+gp_max)/2) > 0.05: continue
            
            # RSI divergence check
            if require_divergence:
                rsi_swing = rsi[pair['swing_low']['index']]
                rsi_diff = rsi[i] - rsi_swing
                if pair['direction'] == 'UP' and rsi_diff < 3: continue
                if pair['direction'] == 'DOWN' and -rsi_diff < 3: continue
            
            # Determine side
            if skip_direction == 'BUY' and pair['direction'] == 'DOWN': continue
            if skip_direction == 'SELL' and pair['direction'] == 'UP': continue
            
            side = 'SELL' if pair['direction'] == 'UP' else 'BUY'
            
            # ATR
            trs = [max(highs[j]-lows[j], abs(highs[j]-closes[j-1]), abs(lows[j]-closes[j-1])) for j in range(max(0,i-13),i+1)]
            atr_v = np.mean(trs)
            if atr_v <= 0: continue
            
            entry = closes[i]
            if side == 'SELL':
                stop = entry + atr_v * atr_stop_mult
                tp1 = entry - atr_v * atr_tp1_mult
                tp2 = entry - atr_v * atr_tp2_mult
            else:
                stop = entry - atr_v * atr_stop_mult
                tp1 = entry + atr_v * atr_tp1_mult
                tp2 = entry + atr_v * atr_tp2_mult
            
            risk = abs(entry - stop)
            qty = min(10.0 / risk if risk > 0 else 0, 200.0 / entry)
            
            signals.append({
                'strategy': 'TENDERSALT_V4',
                'timestamp': str(df['timestamp'].iloc[i]),
                'bar_index': int(i),
                'side': side,
                'entry_price': round(entry, 4),
                'stop_loss': round(stop, 4),
                'take_profit_1': round(tp1, 4),
                'take_profit_2': round(tp2, 4),
                'position_size': round(qty, 6),
                'risk_amount': 10.0,
                'risk_reward_1': round(abs(tp1-entry)/risk, 2),
                'risk_reward_2': round(abs(tp2-entry)/risk, 2),
            })
            signaled_keys.add(sk)
            break
    
    return signals


# Sweep
results = []

for ds_name, ds_path in DATASETS.items():
    df = load_ohlcv(ds_path)
    
    for swing_pct, stop_m, tp1_m, tp2_m, req_div in itertools.product(
        [5.0, 8.0, 10.0],
        [1.5, 2.0, 2.5],
        [3.0, 4.0, 5.0],
        [5.0, 7.0, 9.0],
        [False, True]
    ):
        sigs = generate_v4_signals(df, swing_pct, stop_m, tp1_m, tp2_m, require_divergence=req_div)
        if not sigs:
            continue
        
        r = run_backtest_multiday(df, sigs, slippage_bps=10, fee_bps=5, initial_balance=1000.0)
        perf = r['performance']
        
        r_dim = {
            'dataset': ds_name,
            'swing_pct': swing_pct,
            'stop_mult': stop_m,
            'tp1_mult': tp1_m,
            'tp2_mult': tp2_m,
            'div_req': req_div,
            'trades': perf['num_trades'],
            'return_pct': perf['total_return_pct'],
            'win_rate': perf['win_rate_pct'],
            'sharpe': perf['sharpe_ratio'],
            'max_dd': perf['max_drawdown_pct'],
            'pf': perf['profit_factor'],
        }
        results.append(r_dim)
        
        sh_str = f"{perf['sharpe_ratio']:+.2f}" if perf['sharpe_ratio'] is not None else "N/A"
        print(f"  {ds_name:>15} swing={swing_pct:3.0f}% stop={stop_m:.1f}x tp={tp1_m:.1f}/{tp2_m:.1f}x "
              f"div={req_div} -> {perf['num_trades']:2d} trades "
              f"ret={perf['total_return_pct']:>+6.2f}% wr={perf['win_rate_pct']:3.0f}% "
              f"sh={sh_str} dd={perf['max_drawdown_pct']:5.1f}% pf={perf['profit_factor']:.2f}")

# Top by Sharpe
results.sort(key=lambda r: r['sharpe'], reverse=True)
print(f"\n{'='*80}")
print("TOP 10 by Sharpe:")
print(f"{'='*80}")
for r in results[:10]:
    print(f"  {r['dataset']:>15} swing={r['swing_pct']:3.0f}% stop={r['stop_mult']:.1f}x "
          f"tp={r['tp1_mult']:.1f}/{r['tp2_mult']:.1f}x div={r['div_req']} "
          f"-> {r['trades']:2d} trades ret={r['return_pct']:>+6.2f}% "
          f"wr={r['win_rate']:3.0f}% sh={r['sharpe']:+.2f} dd={r['max_dd']:5.1f}% pf={r['pf']:.2f}")

json.dump(results, open("data/TENDERSALT_v4_sweep.json", "w"), indent=2)
