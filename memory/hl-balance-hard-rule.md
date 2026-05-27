# HARD RULE: HL Balance Authority

**Never guess, recall from memory, or estimate HL balances. Ever.**

## The One Number

```
HL wallet: 0xd547d5C7c3eAE5e8BA20b105E599a1588BB96c00
Endpoint: spotClearinghouseState → USDC total
```

**Spot USDC total is the only balance that matters.** It includes perp margin as a "hold" on the spot side. Perp equity is NOT additive.

## Authoritative Script

```bash
python3 /home/captain/trading/production/hl_balance.py
```

This script:
1. Hits HL API on the CORRECT wallet (`0xd547d5C7c3eAE5e8BA20b105E599a1588BB96c00`)
2. Reads spot USDC total (this = whole account)
3. Reads perp equity (this is inside spot's hold — NOT extra)
4. Reports ONE NUMBER: the total

## Hard-Wired Into These Crons

- `live-trading-cron` (every 1 min) — balance pre-check before main_bot.py
- `trading-beast-news-aware` (every 30 min) — balance in pulse
- `trading-audit-daily` (daily 08:00) — balance in audit
- `morning-pulse-telegram` (daily 08:00) — balance in report

## What I NEVER Do

- ❌ Query wallet `0x3408781cB667172DBd55D6Ee2c2fc3c3F9127EF1` (wrong wallet)
- ❌ Add spot USDC + perp equity together (double count)
- ❌ Recall balance from memory (always API call)
- ❌ Guess or estimate account values

## Verification

If Wosobu says the balance is different from what I show:
1. Run `python3 /home/captain/trading/production/hl_balance.py` immediately
2. Report the raw output verbatim
3. If still wrong, check if wallet env var changed in `/home/captain/trading/production/.env`
