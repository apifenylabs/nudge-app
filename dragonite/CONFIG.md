# Dragonite — Configuration

## Broker: Interactive Brokers (IKBR)

### Account
- **Type:** Individual (Pro or Lite — check your account)
- **Balance:** ~$800 USD
- **Base currency:** USD
- **Status:** Funded, active, doing nothing

### Platform Access
We will use **IB Gateway** (headless) + **IB API** (ib_insync Python wrapper).

| Component | Purpose |
|-----------|---------|
| IB Gateway | Local connection to IKBR servers |
| ib_insync | Python async wrapper for IB API — cleaner than raw IB API |
| Client Portal | Web API (alternative, less stable) |

**Decision:** `ib_insync` for all trading. It's the most maintained Python wrapper, supports async, handles reconnection.

### Fees

| Fee Type | Cost | Notes |
|----------|------|-------|
| Inactivity fee | **$0** | Eliminated July 2021 |
| Minimum deposit | **$0** | |
| US stock commission | **$0** | IBKR Lite, or $0.0035/share (IBKR Pro) |
| EUR/USD spread | ~0.19 pips | Market data |
| EUR/USD commission | $3.50/side ($7 round turn) | Per standard lot (100k units) |
| EUR/USD all-in cost | ~0.59 pips | Spread + commission combined |
| GBP/USD all-in cost | ~0.8 pips | |
| USD/JPY all-in cost | ~0.7 pips | |
| Forex min commission | $2.00/order | ($4 round turn on small sizes) |

### Leverage
- **Forex (majors):** Up to 30:1 for US accounts (CFTC rule) — $800 controls ~$24,000
- **Stocks:** Up to 2:1 intraday (Reg T) — $800 controls $2,400
- **Options:** Varies by strategy

---

## Competitor Comparison (for reference)

| Feature | **IKBR** | **OANDA** | **tastyfx** | **Forex.com** |
|---------|----------|-----------|-------------|---------------|
| Min deposit | $0 | $0 | $0 | $100 |
| EUR/USD cost | 0.59 pips | 1.61 pips | 0.6 pips | 1.0 pip |
| Forex pairs | 90 | 69 | 91 | 80+ |
| US stocks | ✅ $0 | ❌ | ❌ | ❌ |
| Options | ✅ | ❌ | ❌ | ❌ |
| API quality | ⚠️ Complex | ✅ Simple | ✅ Med | ✅ Simple |
| Rating (fees) | #2/36 | #30/36 | #5/36 | #10/36 |
| Rating (overall) | #2/36 | #12/36 | #1/36 | #5/36 |

**Verdict:** IKBR wins on fees + multi-asset access. tastyfx wins for pure forex beginners. Since we already have $800 at IKBR and want both forex + stocks + options eventually, IKBR is the right call.

---

## Pairs & Instruments

### Active (Phase 1)
| Symbol | Type | Leverage | Strategy |
|--------|------|----------|----------|
| EUR.USD | Forex | 30:1 | Trend-following |
| GBP.USD | Forex | 30:1 | Trend-following |
| USD.JPY | Forex | 30:1 | Trend-following |

### Watchlist (Phase 2+)
| Symbol | Type | Notes |
|--------|------|-------|
| TQQQ | LETF | 3x Nasdaq |
| SOXL | LETF | 3x Semiconductors |
| SPY | ETF | Options target |
| QQQ | ETF | Options target |

---

## API Credentials
**DO NOT STORE IN TRACKED FILES.**
Set in `.env.local` (gitignored):
```
IBKR_HOST=127.0.0.1
IBKR_PORT=4002       # Paper: 4002, Live: 4001
IBKR_CLIENT_ID=1
IBKR_ACCOUNT=U1234567
```
