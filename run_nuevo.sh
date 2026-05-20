#!/bin/bash
cd /home/captain/trading
python3 scripts/playbook_nuevo_weekly.py --backtest BTC 2>&1
python3 scripts/playbook_nuevo_weekly.py --backtest SOL 2>&1
