"""
Dragonite — Trend-Following Strategy (Forex)
============================================
Adapted from crypto BB Core for forex markets.

Key difference from crypto: forex trends are smoother but have less volatility.
Strategy focuses on HIGH-quality signals only — fewer trades, higher WR.

Signal Rules:
1. Only take 1 trade per direction per trend cycle (first signal, then wait)
2. EMA 50 as trend filter (price above EMA for longs, below for shorts)
3. RSI pullback to mean (40-50 for longs, 50-60 for shorts) IN a trend
4. ADX > 25 (strong trend only)

Entry: Pullback to 20 EMA in direction of 50 EMA trend
  LONG: price > 50 EMA (uptrend) + price pulls back to 20 EMA + RSI < 50
  SHORT: price < 50 EMA (downtrend) + price bounces to 20 EMA + RSI > 50

Exit: 2R target or 1R stop-loss (2:1 R:R)
Leverage: 10:1 (more conservative than max 30:1)
"""

import logging
from typing import Optional

import pandas as pd
import numpy as np

logger = logging.getLogger("dragonite.strategies.trend_following")


class TrendFollowingStrategy:
    """
    Trend-following strategy for forex with signal gating.

    Only one active signal per direction at a time.
    Waits for pullback to 20 EMA in direction of 50 EMA trend.
    """

    def __init__(
        self,
        fast_ema: int = 20,
        slow_ema: int = 50,
        rsi_period: int = 14,
        rsi_long_max: float = 50.0,
        rsi_short_min: float = 50.0,
        adx_period: int = 14,
        adx_threshold: int = 25,
        risk_reward: float = 2.0,  # 2:1 R:R
        stop_percent: float = 0.005,  # 0.5% stop (tighter for forex)
        min_signal_distance_bars: int = 24,  # 24h between signals (direction matters)
    ):
        self.fast_ema = fast_ema
        self.slow_ema = slow_ema
        self.rsi_period = rsi_period
        self.rsi_long_max = rsi_long_max
        self.rsi_short_min = rsi_short_min
        self.adx_period = adx_period
        self.adx_threshold = adx_threshold
        self.risk_reward = risk_reward
        self.stop_percent = stop_percent
        self.min_signal_distance_bars = min_signal_distance_bars

    def _compute_ema(self, prices: pd.Series, period: int) -> pd.Series:
        return prices.ewm(span=period, adjust=False).mean()

    def _compute_rsi(self, prices: pd.Series, period: int) -> pd.Series:
        delta = prices.diff()
        gain = delta.clip(lower=0)
        loss = -delta.clip(upper=0)
        avg_gain = gain.rolling(window=period).mean()
        avg_loss = loss.rolling(window=period).mean()
        rs = avg_gain / avg_loss
        rsi = 100 - (100 / (1 + rs))
        return rsi

    def _compute_adx(self, high: pd.Series, low: pd.Series,
                     close: pd.Series, period: int) -> pd.Series:
        prev_close = close.shift(1)
        tr1 = high - low
        tr2 = (high - prev_close).abs()
        tr3 = (low - prev_close).abs()
        tr = pd.concat([tr1, tr2, tr3], axis=1).max(axis=1)
        atr = tr.rolling(window=period).mean()

        up_move = high - high.shift(1)
        down_move = low.shift(1) - low
        plus_dm = np.where((up_move > down_move) & (up_move > 0), up_move, 0)
        minus_dm = np.where((down_move > up_move) & (down_move > 0), down_move, 0)

        plus_di = 100 * pd.Series(plus_dm, index=close.index).rolling(period).mean() / atr
        minus_di = 100 * pd.Series(minus_dm, index=close.index).rolling(period).mean() / atr

        dx = 100 * (plus_di - minus_di).abs() / (plus_di + minus_di)
        adx = dx.rolling(period).mean()
        return adx

    def generate_signals(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Generate trading signals with single-signal gating.

        Only emits one LONG signal per cycle (price must cross below 50 EMA
        to reset) and one SHORT signal per cycle.

        Returns:
            DataFrame with columns: ema_fast, ema_slow, rsi, adx, signal,
            entry_price, stop_loss, take_profit
        """
        df = df.copy()

        price = df["close"]
        df["ema_fast"] = self._compute_ema(price, self.fast_ema)
        df["ema_slow"] = self._compute_ema(price, self.slow_ema)
        df["rsi"] = self._compute_rsi(price, self.rsi_period)
        df["adx"] = self._compute_adx(df["high"], df["low"], price, self.adx_period)
        df["atr"] = self._compute_atr(df["high"], df["low"], price, self.adx_period)

        df["signal"] = 0

        # Trend direction from 50 EMA
        df["uptrend"] = price > df["ema_slow"]

        # Pullback condition: price crossed below fast EMA while still above slow EMA
        df["below_fast_ema"] = price < df["ema_fast"]
        df["above_fast_ema"] = price > df["ema_fast"]

        # --- Gated signal logic ---
        # Only fire a signal if we haven't had one in the same direction recently
        # LONG: uptrend + pullback below fast EMA + RSI < 50 + ADX > 25
        # SHORT: downtrend + bounce above fast EMA + RSI > 50 + ADX > 25

        in_long = False
        in_short = False
        bars_since_last_long = 999
        bars_since_last_short = 999

        for i in range(self.slow_ema + self.adx_period, len(df)):
            bars_since_last_long += 1
            bars_since_last_short += 1

            row = df.iloc[i]
            adx_ok = row["adx"] > self.adx_threshold

            # LONG check
            long_cond = (
                row["uptrend"]
                and row["below_fast_ema"]
                and row["rsi"] < self.rsi_long_max
                and adx_ok
                and bars_since_last_long >= self.min_signal_distance_bars
                and not in_long
            )

            if long_cond:
                df.loc[df.index[i], "signal"] = 1
                bars_since_last_long = 0
                in_long = True
                in_short = False  # Reset short gate
                continue

            # SHORT check
            short_cond = (
                not row["uptrend"]
                and row["above_fast_ema"]
                and row["rsi"] > self.rsi_short_min
                and adx_ok
                and bars_since_last_short >= self.min_signal_distance_bars
                and not in_short
            )

            if short_cond:
                df.loc[df.index[i], "signal"] = -1
                bars_since_last_short = 0
                in_short = True
                in_long = False  # Reset long gate
                continue

            # Reset gates when trend changes
            if not row["uptrend"]:
                in_long = False
            if row["uptrend"]:
                in_short = False

        # Entry/exit prices using ATR for dynamic stops
        df["entry_price"] = price
        df["stop_distance"] = df["atr"] * 1.5  # 1.5x ATR stop
        df["target_distance"] = df["stop_distance"] * self.risk_reward

        df["stop_loss"] = np.where(
            df["signal"] == 1,
            price - df["stop_distance"],
            np.where(df["signal"] == -1, price + df["stop_distance"], np.nan),
        )
        df["take_profit"] = np.where(
            df["signal"] == 1,
            price + df["target_distance"],
            np.where(df["signal"] == -1, price - df["target_distance"], np.nan),
        )

        return df

    def _compute_atr(self, high: pd.Series, low: pd.Series,
                     close: pd.Series, period: int) -> pd.Series:
        prev_close = close.shift(1)
        tr1 = high - low
        tr2 = (high - prev_close).abs()
        tr3 = (low - prev_close).abs()
        tr = pd.concat([tr1, tr2, tr3], axis=1).max(axis=1)
        return tr.rolling(window=period).mean()

    def backtest(
        self, df: pd.DataFrame, initial_capital: float = 800.0,
        position_size_pct: float = 0.03, leverage: int = 10,
        spread_cost: float = 0.000059
    ) -> dict:
        """
        Run backtest with realistic position sizing.

        Position sizing:
        - Risk = capital * position_size_pct (3% of account)
        - Stop distance in price = from signal row (ATR-based)
        - Notional = risk_amount / (stop_distance / entry_price)
        - Units = notional / entry_price
        """
        df = self.generate_signals(df)
        trades = []
        capital = initial_capital
        peak = capital

        for i in range(len(df)):
            if df.iloc[i]["signal"] == 0 or capital <= 0:
                continue

            signal = df.iloc[i]["signal"]
            entry = float(df.iloc[i]["entry_price"])
            stop = float(df.iloc[i]["stop_loss"])
            target = float(df.iloc[i]["take_profit"])
            stop_dist = float(df.iloc[i]["stop_distance"])

            if pd.isna(stop) or pd.isna(target) or stop_dist == 0:
                continue

            # Risk-based position sizing
            risk_amount = capital * position_size_pct
            stop_pct = stop_dist / entry
            # Notional capped by leverage
            notional = min(risk_amount / stop_pct, capital * leverage)
            units = notional / entry

            # Spread cost (round trip)
            spread_fee = notional * spread_cost * 2

            # Walk forward to find outcome
            outcome = None
            exit_price = entry
            for j in range(i + 1, min(i + 200, len(df))):
                row = df.iloc[j]
                if signal == 1:
                    if row["low"] <= stop and row["close"] <= stop * 1.001:
                        outcome = "stop_loss"
                        exit_price = stop
                        break
                    if row["high"] >= target:
                        outcome = "take_profit"
                        exit_price = target
                        break
                else:
                    if row["high"] >= stop and row["close"] >= stop * 0.999:
                        outcome = "stop_loss"
                        exit_price = stop
                        break
                    if row["low"] <= target:
                        outcome = "take_profit"
                        exit_price = target
                        break

            if outcome is None:
                exit_price = float(df.iloc[min(i + 199, len(df) - 1)]["close"])
                outcome = "timeout"

            # P&L
            if signal == 1:
                pnl = (exit_price - entry) * units - spread_fee
            else:
                pnl = (entry - exit_price) * units - spread_fee

            capital += pnl
            if capital > peak:
                peak = capital
            if capital <= 0:
                capital = 0
                trades.append({
                    "entry_time": str(df.index[i]),
                    "signal": "LONG" if signal == 1 else "SHORT",
                    "entry": round(entry, 5),
                    "exit": round(exit_price, 5),
                    "pnl": round(pnl, 2),
                    "outcome": outcome,
                    "capital_after": 0,
                })
                break

            trades.append({
                "entry_time": str(df.index[i]),
                "signal": "LONG" if signal == 1 else "SHORT",
                "entry": round(entry, 5),
                "exit": round(exit_price, 5),
                "pnl": round(pnl, 2),
                "pnl_pct": round(pnl / (capital - pnl) * 100, 2) if capital != pnl else 0,
                "outcome": outcome,
                "capital_after": round(capital, 2),
            })

        total_trades = len(trades)
        if total_trades == 0:
            return {"total_trades": 0, "final_capital": capital, "total_return": "0%"}

        wins = [t for t in trades if t["pnl"] > 0]
        losses = [t for t in trades if t["pnl"] <= 0]
        win_rate = len(wins) / total_trades if total_trades > 0 else 0
        total_return = (capital - initial_capital) / initial_capital
        max_dd = self._max_drawdown(trades)

        total_win = sum(t["pnl"] for t in wins)
        total_loss = abs(sum(t["pnl"] for t in losses))

        return {
            "total_trades": total_trades,
            "win_rate": f"{win_rate:.1%}",
            "total_return": f"{total_return:.2%}",
            "final_capital": round(capital, 2),
            "max_drawdown": f"{max_dd:.2%}",
            "avg_win": round(total_win / len(wins), 2) if wins else 0,
            "avg_loss": round(-total_loss / len(losses), 2) if losses else 0,
            "profit_factor": round(total_win / total_loss, 2) if total_loss > 0 else float("inf"),
            "trades": trades[:10],
        }

    def _max_drawdown(self, trades: list[dict]) -> float:
        capitals = [t["capital_after"] for t in trades]
        if not capitals:
            return 0.0
        peak = capitals[0]
        max_dd = 0.0
        for c in capitals:
            if c > peak:
                peak = c
            if peak > 0:
                dd = (peak - c) / peak
                if dd > max_dd:
                    max_dd = dd
        return max_dd
