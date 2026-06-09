"""
Dragonite — Order Manager
=========================
Place, modify, cancel, and track orders on Interactive Brokers.
Built on top of DragoniteBroker.

Usage:
    from execution.order_manager import OrderManager
    om = OrderManager(broker)
    order = await om.place_market_order("EUR.USD", "BUY", 10000)
"""

import logging
from typing import Optional

from ib_insync import (
    Order as IBOrder,
    Trade,
    Forex,
    Stock,
    LimitOrder,
    MarketOrder,
    StopOrder,
)

from execution.broker import DragoniteBroker

logger = logging.getLogger("dragonite.order_manager")


class OrderManager:
    """Order lifecycle management."""

    def __init__(self, broker: DragoniteBroker):
        self.broker = broker
        self._open_orders: dict[str, Trade] = {}

    def _build_contract(self, symbol: str, sec_type: str = "FOREX",
                        currency: str = "USD"):
        """Build IBKR contract object."""
        if sec_type == "FOREX":
            return Forex(symbol)
        elif sec_type == "STK":
            return Stock(symbol, "SMART", currency)
        else:
            raise ValueError(f"Unsupported sec_type: {sec_type}")

    async def place_market_order(
        self, symbol: str, action: str, quantity: float,
        sec_type: str = "FOREX", currency: str = "USD"
    ) -> Optional[Trade]:
        """Place a market order."""
        if not self.broker._connected:
            logger.error("Not connected to IB")
            return None

        try:
            contract = self._build_contract(symbol, sec_type, currency)
            self.broker.ib.qualifyContracts(contract)
            order = MarketOrder(action, quantity)
            trade = self.broker.ib.placeOrder(contract, order)
            logger.info(f"Market {action} {quantity} {symbol} — orderId={trade.order.orderId}")
            self._open_orders[str(trade.order.orderId)] = trade
            return trade
        except Exception as e:
            logger.error(f"Failed to place market order: {e}")
            return None

    async def place_limit_order(
        self, symbol: str, action: str, quantity: float,
        limit_price: float, sec_type: str = "FOREX",
        currency: str = "USD"
    ) -> Optional[Trade]:
        """Place a limit order."""
        if not self.broker._connected:
            return None

        try:
            contract = self._build_contract(symbol, sec_type, currency)
            self.broker.ib.qualifyContracts(contract)
            order = LimitOrder(action, quantity, limit_price)
            trade = self.broker.ib.placeOrder(contract, order)
            logger.info(
                f"Limit {action} {quantity} {symbol} @ {limit_price}"
            )
            self._open_orders[str(trade.order.orderId)] = trade
            return trade
        except Exception as e:
            logger.error(f"Failed to place limit order: {e}")
            return None

    async def place_stop_order(
        self, symbol: str, action: str, quantity: float,
        stop_price: float, sec_type: str = "FOREX",
        currency: str = "USD"
    ) -> Optional[Trade]:
        """Place a stop order (stop-loss)."""
        if not self.broker._connected:
            return None

        try:
            contract = self._build_contract(symbol, sec_type, currency)
            self.broker.ib.qualifyContracts(contract)
            order = StopOrder(action, quantity, stop_price)
            trade = self.broker.ib.placeOrder(contract, order)
            logger.info(
                f"Stop {action} {quantity} {symbol} @ {stop_price}"
            )
            self._open_orders[str(trade.order.orderId)] = trade
            return trade
        except Exception as e:
            logger.error(f"Failed to place stop order: {e}")
            return None

    async def cancel_order(self, order_id: int) -> bool:
        """Cancel an open order."""
        try:
            self.broker.ib.cancelOrder(order_id)
            logger.info(f"Cancelled order {order_id}")
            return True
        except Exception as e:
            logger.error(f"Failed to cancel order {order_id}: {e}")
            return False

    async def get_open_orders(self) -> list[dict]:
        """Fetch all open orders."""
        try:
            orders = self.broker.ib.openOrders()
            return [
                {
                    "order_id": o.orderId,
                    "symbol": o.contract.symbol,
                    "action": o.action,
                    "quantity": float(o.totalQuantity),
                    "order_type": o.orderType,
                    "limit_price": float(o.lcp) if o.lcp else None,
                    "status": o.orderStatus.status,
                }
                for o in orders
            ]
        except Exception as e:
            logger.error(f"Failed to get open orders: {e}")
            return []

    async def get_order_status(self, order_id: int) -> Optional[dict]:
        """Get status of a specific order."""
        try:
            trades = self.broker.ib.trades()
            for trade in trades:
                if trade.order.orderId == order_id:
                    return {
                        "order_id": order_id,
                        "status": trade.orderStatus.status,
                        "filled": float(trade.orderStatus.filled),
                        "remaining": float(trade.orderStatus.remaining),
                        "avg_fill_price": float(trade.orderStatus.avgFillPrice)
                        if trade.orderStatus.avgFillPrice else None,
                    }
            return None
        except Exception as e:
            logger.error(f"Failed to get order status: {e}")
            return None
