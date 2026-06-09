"""
Dragonite — IKBR Broker Connector
==================================
Thin wrapper around ib_insync for Interactive Brokers Gateway.
Handles connection lifecycle, reconnection, market data, and account info.

Usage:
    from execution.broker import DragoniteBroker
    broker = DragoniteBroker(host="127.0.0.1", port=4002, client_id=1)
    await broker.connect()
    print(await broker.get_account_summary())
"""

import asyncio
import logging
from typing import Optional

from ib_insync import IB, Contract, Stock, Forex, Position

logger = logging.getLogger("dragonite.broker")


class DragoniteBroker:
    """Interactive Brokers connection manager."""

    def __init__(
        self,
        host: str = "127.0.0.1",
        port: int = 4002,
        client_id: int = 1,
        paper: bool = True,
    ):
        self.host = host
        self.port = port
        self.client_id = client_id
        self.paper = paper
        self.ib = IB()
        self._connected = False

    async def connect(self) -> bool:
        """Connect to IB Gateway/TWS."""
        try:
            self.ib.connect(self.host, self.port, clientId=self.client_id)
            self._connected = True
            logger.info(
                f"Connected to IB Gateway at {self.host}:{self.port} "
                f"(paper={self.paper})"
            )
            return True
        except ConnectionRefusedError:
            logger.error(
                f"Connection refused — is IB Gateway running on "
                f"{self.host}:{self.port}?"
            )
            return False
        except Exception as e:
            logger.error(f"Connection failed: {e}")
            return False

    def disconnect(self):
        """Disconnect from IB Gateway."""
        if self._connected:
            self.ib.disconnect()
            self._connected = False
            logger.info("Disconnected from IB Gateway")

    async def get_account_summary(self) -> dict:
        """Fetch account balance and summary."""
        if not self._connected:
            return {}

        try:
            summary = self.ib.accountSummary()
            result = {}
            for item in summary:
                if item.tag in ("TotalCashValue", "NetLiquidation", "GrossPositionValue"):
                    result[item.tag] = float(item.value)
            return result
        except Exception as e:
            logger.error(f"Failed to get account summary: {e}")
            return {}

    async def get_positions(self) -> list[dict]:
        """Fetch current open positions."""
        if not self._connected:
            return []

        try:
            positions = self.ib.positions()
            return [
                {
                    "symbol": pos.contract.symbol,
                    "sec_type": pos.contract.secType,
                    "currency": pos.contract.currency,
                    "quantity": float(pos.position),
                    "market_price": float(pos.marketPrice),
                    "market_value": float(pos.marketValue),
                    "avg_cost": float(pos.averageCost),
                    "unrealized_pnl": float(pos.unrealizedPNL),
                }
                for pos in positions
                if abs(float(pos.position)) > 0
            ]
        except Exception as e:
            logger.error(f"Failed to get positions: {e}")
            return []

    async def get_market_data(self, symbol: str, sec_type: str = "FOREX",
                               currency: str = "USD") -> Optional[dict]:
        """Fetch current market data for a symbol."""
        if not self._connected:
            return None

        try:
            if sec_type == "FOREX":
                contract = Forex(symbol)
            elif sec_type == "STK":
                contract = Stock(symbol, "SMART", currency)
            else:
                logger.error(f"Unsupported sec_type: {sec_type}")
                return None

            self.ib.qualifyContracts(contract)
            ticker = self.ib.reqMktData(contract, "", False, False)
            # Wait briefly for data
            await asyncio.sleep(0.5)

            return {
                "symbol": symbol,
                "bid": float(ticker.bid) if ticker.bid else None,
                "ask": float(ticker.ask) if ticker.ask else None,
                "last": float(ticker.last) if ticker.last else None,
                "spread": (float(ticker.ask) - float(ticker.bid))
                if ticker.ask and ticker.bid else None,
            }
        except Exception as e:
            logger.error(f"Market data failed for {symbol}: {e}")
            return None

    async def is_connected(self) -> bool:
        """Check if connection is alive."""
        return self._connected and self.ib.isConnected()
