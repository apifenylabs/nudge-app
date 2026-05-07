#!/usr/bin/env python3
"""
Regime Snapshot — Pre-trading volatility and liquidity check.
Determines whether the market is tradeable before firing signals.

Usage:
    python3 regime_snapshot.py [--market crypto|equity] [--output regime.json]
    
Output: JSON with volatility assessment and GO/CAUTION/SKIP recommendation.
"""
import argparse
import json
import sys
from datetime import datetime
from pathlib import Path

import numpy as np


def check_vix() -> float:
    """
    Fetch VIX from Yahoo Finance (free, no API key).
    Falls back to cached value if unavailable.
    """
    try:
        import subprocess
        import urllib.request
        
        url = "https://query1.finance.yahoo.com/v8/finance/chart/%5EVIX?range=1d&interval=1d"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode())
            vix = data["chart"]["result"][0]["meta"]["regularMarketPrice"]
            return float(vix)
    except Exception as e:
        print(f"Warning: Could not fetch VIX ({e}). Using default.")
        return 15.0  # Default normal VIX


def check_dvol() -> float:
    """
    Fetch DVOL (Deribit Bitcoin Volatility Index) — approximate via free endpoint.
    Falls back to cached value if unavailable.
    """
    try:
        import urllib.request
        
        url = "https://www.deribit.com/api/v2/public/get_index?currency=BTC"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode())
            if "result" in data and "btc_volatility" in data["result"]:
                return float(data["result"]["btc_volatility"])
            return 60.0
    except Exception as e:
        print(f"Warning: Could not fetch DVOL ({e}). Using default.")
        return 60.0  # Default crypto vol


def check_btc_dominance() -> float:
    """Fetch BTC dominance from CoinGecko (free)."""
    try:
        import urllib.request
        
        url = "https://api.coingecko.com/api/v3/global"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode())
            return float(data["data"]["market_cap_percentage"]["btc"])
    except Exception as e:
        print(f"Warning: Could not fetch BTC dominance ({e}). Using default.")
        return 55.0


def assess_regime(market: str, vix: float = None, dvol: float = None) -> dict:
    """
    Assess the market regime based on volatility levels.
    
    Returns regime label, recommendation, and underlying data.
    """
    now = datetime.utcnow().isoformat()
    
    result = {
        "timestamp": now,
        "market": market,
        "assessments": {},
        "recommendation": "GO",
        "overall_volatility": "MODERATE",
    }
    
    if market == "equity":
        vix_val = vix or check_vix()
        result["vix"] = round(vix_val, 2)
        
        if vix_val > 30:
            vol_label = "LETHAL"
            rec = "SKIP"
        elif vix_val > 25:
            vol_label = "HIGH"
            rec = "CAUTION"
        elif vix_val > 18:
            vol_label = "MODERATE"
            rec = "GO"
        else:
            vol_label = "LOW"
            rec = "GO"
        
        result["assessments"]["vix"] = {
            "value": vix_val,
            "label": vol_label,
            "recommendation": rec,
        }
        result["overall_volatility"] = vol_label
        if rec != "GO":
            result["recommendation"] = rec
    
    elif market == "crypto":
        dvol_val = dvol or check_dvol()
        btc_dom = check_btc_dominance()
        
        result["dvol"] = round(dvol_val, 2)
        result["btc_dominance_pct"] = round(btc_dom, 1)
        
        if dvol_val > 90:
            vol_label = "LETHAL"
            rec = "SKIP"
        elif dvol_val > 75:
            vol_label = "HIGH"
            rec = "CAUTION"
        elif dvol_val > 50:
            vol_label = "MODERATE"
            rec = "GO"
        else:
            vol_label = "LOW"
            rec = "GO"
        
        result["assessments"]["dvol"] = {
            "value": dvol_val,
            "label": vol_label,
            "recommendation": rec,
        }
        result["overall_volatility"] = vol_label
        if rec != "GO":
            result["recommendation"] = rec
    
    else:
        result["recommendation"] = "CAUTION"
        result["reason"] = f"Unknown market: {market}"
    
    return result


def assess_atr_health(df_path: str, atr_period: int = 20) -> dict:
    """
    Calculate ATR percentile from historical data to gauge current volatility vs baseline.
    """
    from orb_signal import load_ohlcv, calculate_atr
    
    df = load_ohlcv(df_path)
    atr = calculate_atr(df, atr_period)
    valid_atr = atr.dropna()
    
    if len(valid_atr) < 2:
        return {"atr_available": False, "reason": "Insufficient data"}
    
    current_atr = valid_atr.iloc[-1]
    median_atr = valid_atr.median()
    
    atr_percentile = (valid_atr <= current_atr).mean() * 100
    
    anomaly = current_atr > 2 * median_atr
    
    if anomaly:
        health = "HIGH_ANOMALY"
        rec = "CAUTION"
    elif atr_percentile > 80:
        health = "ELEVATED"
        rec = "GO"  # Still tradeable
    elif atr_percentile > 50:
        health = "NORMAL"
        rec = "GO"
    else:
        health = "LOW"
        rec = "CAUTION"  # Low vol = low opportunity
    
    return {
        "atr_available": True,
        "current_atr": round(current_atr, 4),
        "median_atr": round(median_atr, 4),
        "atr_percentile": round(atr_percentile, 1),
        "anomaly": bool(anomaly),
        "health": health,
        "recommendation": rec,
        "atr_ratio": round(float(current_atr / median_atr), 2),
    }


def main():
    parser = argparse.ArgumentParser(description="Regime Snapshot — Pre-trading volatility check")
    parser.add_argument("--market", "-m", choices=["crypto", "equity"], default="crypto", help="Market type")
    parser.add_argument("--output", "-o", default="regime_snapshot.json", help="Output path")
    parser.add_argument("--ohlcv", help="Optional path to OHLCV data for ATR health check")
    parser.add_argument("--vix", type=float, help="Override VIX value")
    parser.add_argument("--dvol", type=float, help="Override DVOL value")
    
    args = parser.parse_args()
    
    print(f"Running regime snapshot for {args.market} market...")
    
    regime = assess_regime(args.market, vix=args.vix, dvol=args.dvol)
    
    if args.ohlcv:
        atr_health = assess_atr_health(args.ohlcv)
        regime["atr_health"] = atr_health
        # Override recommendation if ATR says CAUTION/SKIP
        if atr_health["recommendation"] != "GO":
            regime["recommendation"] = atr_health["recommendation"]
            regime["atr_health"]["overrode_regime"] = True
    
    with open(args.output, "w") as f:
        json.dump(regime, f, indent=2)
    
    print(f"\n{'='*40}")
    if args.market == "equity":
        print(f"VIX: {regime.get('vix', 'N/A')}")
    else:
        print(f"DVOL: {regime.get('dvol', 'N/A')}")
    print(f"Volatility: {regime['overall_volatility']}")
    print(f"Recommendation: {regime['recommendation']} {'✅' if regime['recommendation'] == 'GO' else '⚠️'}")
    print(f"{'='*40}")
    print(f"Saved to {args.output}")


if __name__ == "__main__":
    main()
