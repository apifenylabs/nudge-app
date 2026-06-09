"""
Dragonite — Forex Breakout/Momentum Strategy
=============================================
Designed specifically for forex market structure.
Forex trends differently than crypto — uses breakouts and momentum
rather than EMA pullbacks.

Strategy: Breakout of 24h (Daily) range with momentum confirmation.
- Entry: Price breaks above/below previous 24h range high/low
- Filter: Volume (tick volume) confirmation + RSI momentum
- Exit: Trail stop based on ATR (chandelier exit)

This is a common forex institutional play — break of prior day range
with continuation following the Asian session break.

TF: 1H entries based on 24h range levels
"""

import logging

import pandas as pd
import numpy as np

logger = logging.getLogger("dragonite.strategies.breakout")


class BreakoutStrategy:
    """
    Range-breakout strategy for forex.

    Signal rules:
    1. Calculate 24-bar (24h) range high/low
    2. LONG: price closes above range high + RSI > 50 + ATR > 20-period average
    3. SHORT: price closes below range low + RSI < 50 + ATR > 20-period average
    4. 2R target, 1R stop
    5. Max 1 trade per 12 hours per pair
    """

    def __init__(
        self,
        range_period: int = 24,
        rsi_period: int = 7,
        atr_period: int = 20,
        atr_multiplier: float = 1.5,
        risk_reward: float = 2.0,
        cooldown_bars: int = 12,
    ):
        self.range_period = range_period
        self.rsi_period = rsi_period
        self.atr_period = atr_period
        self.atr_multiplier = atr_multiplier
        self.risk_reward = risk_reward
        self.cooldown_bars = cooldown_bars  # 12h between signals

    def _compute_rsi(self, prices: pd.Series, period: int) -> pd.Series:
        delta = prices.diff()
        gain = delta.clip(lower=0)
        loss = -delta.clip(upper=0)
        avg_gain = gain.rolling(window=period).mean()
        avg_loss = loss.rolling(window=period).mean()
        rs = avg_gain / avg_loss
        rsi = 100 - (100 / (1 + rs))
        return rsi

    def _compute_atr(self, high: pd.Series, low: pd.Series,
                     close: pd.Series, period: int) -> pd.Series:
        prev_close = close.shift(1)
        tr1 = high - low
        tr2 = (high - prev_close).abs()
        tr3 = (low - prev_close).abs()
        tr = pd.concat([tr1, tr2, tr3], axis=1).max(axis=1)
        return tr.rolling(window=period).mean()

    def generate_signals(self, df: pd.DataFrame) -> pd.DataFrame:
        df = df.copy()

        price = df["close"]
        df["range_high"] = df["high"].rolling(self.range_period).max().shift(1)
        df["range_low"] = df["low"].rolling(self.range_period).min().shift(1)
        df["rsi"] = self._compute_rsi(price, self.rsi_period)
        df["atr"] = self._compute_atr(df["high"], df["low"], price, self.atr_period)
        df["atr_avg"] = df["atr"].rolling(self.atr_period).mean()

        df["signal"] = 0
        df["entry_price"] = price

        # LONG: close > range high + RSI > 50 + ATR expanding
        long_cond = (
            (price > df["range_high"])
            & (df["rsi"] > 50)
            & (df["atr"] > df["atr_avg"])
        )

        # SHORT: close < range low + RSI < 50 + ATR expanding
        short_cond = (
            (price < df["range_low"])
            & (df["rsi"] < 50)
            & (df["atr"] > df["atr_avg"])
        )

        # Gate: only one signal per cooldown period
        in_trade = False
        bars_since_last = 999

        for i in range(self.range_period + self.atr_period, len(df)):
            bars_since_last += 1

            if bars_since_last < self.cooldown_bars:
                continue

            sig = 0
            if long_cond.iloc[i]:
                sig = 1
            elif short_cond.iloc[i]:
                sig = -1

            if sig != 0:
                df.loc[df.index[i], "signal"] = sig
                bars_since_last = 0

        # Stop/target
        df["stop_distance"] = df["atr"] * self.atr_multiplier
        df["stop_loss"] = np.where(
            df["signal"] == 1,
            price - df["stop_distance"],
            np.where(df["signal"] == -1, price + df["stop_distance"], np.nan),
        )
        df["take_profit"] = np.where(
            df["signal"] == 1,
            price + df["stop_distance"] * self.risk_reward,
            np.where(
                df["signal"] == -1,
                price - df["stop_distance"] * self.risk_reward,
                np.nan,
            ),
        )

        return df

    def backtest(
        self, df: pd.DataFrame, initial_capital: float = 800.0,
        position_size_pct: float = 0.03, leverage: int = 10,
        spread_cost: float = 0.000059
    ) -> dict:
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

            risk_amount = capital * position_size_pct
            stop_pct = stop_dist / entry
            notional = min(risk_amount / stop_pct, capital * leverage)
            units = notional / entry
            spread_fee = notional * spread_cost * 2

            outcome = None
            exit_price = entry
            for j in range(i + 1, min(i + 200, len(df))):
                row = df.iloc[j]
                if signal == 1:
                    if row["low"] <= stop:
                        outcome = "stop_loss"
                        exit_price = stop
                        break
                    if row["high"] >= target:
                        outcome = "take_profit"
                        exit_price = target
                        break
                else:
                    if row["high"] >= stop:
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

        total_w = sum(t["pnl"] for t in wins)
        total_l = abs(sum(t["pnl"] for t in losses))

        return {
            "total_trades": total_trades,
            "win_rate": f"{win_rate:.1%}",
            "total_return": f"{total_return:.2%}",
            "final_capital": round(capital, 2),
            "max_drawdown": f"{max_dd:.2%}",
            "avg_win": round(total_w / len(wins), 2) if wins else 0,
            "avg_loss": round(-total_l / len(losses), 2) if losses else 0,
            "profit_factor": round(total_w / total_l, 2) if total_l > 0 else float("inf"),
            "trades": trades[:5],
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
