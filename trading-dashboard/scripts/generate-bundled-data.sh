#!/usr/bin/env bash
# scripts/generate-bundled-data.sh
# Reads trading data from /home/captain/trading, writes bundled JSON for the dashboard.

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
TRADING_DIR="/home/captain/trading"

echo "=== Generating bundled trading data ==="

# 1. Trade log
if [ -f "$TRADING_DIR/production/logs/trade_log.json" ]; then
  cp "$TRADING_DIR/production/logs/trade_log.json" "$PROJECT_DIR/public/data/trade_log.json"
  echo "  ✓ trade_log.json ($(wc -c < "$TRADING_DIR/production/logs/trade_log.json") bytes)"
else
  echo "[]" > "$PROJECT_DIR/public/data/trade_log.json"
  echo "  ✗ trade_log.json not found — empty array"
fi

# 2. Bot state
if [ -f "$TRADING_DIR/production/logs/bot_state.json" ]; then
  cp "$TRADING_DIR/production/logs/bot_state.json" "$PROJECT_DIR/public/data/bot_state.json"
  echo "  ✓ bot_state.json"
else
  echo '{"status":"unknown","balance":0,"positions":0,"running_strategies":[]}' > "$PROJECT_DIR/public/data/bot_state.json"
  echo "  ✗ bot_state.json not found"
fi

# 3. Governance gate (strategy registry)
if [ -f "$TRADING_DIR/production/config.py" ]; then
  # Extract alloc values from config.py
  python3 -c "
import re
with open('$TRADING_DIR/production/config.py') as f:
    cfg = f.read()

allocations = {}
for line in cfg.split('\n'):
    line = line.strip()
    m = re.match(r'ALLOC_(\w+)\s*=\s*([\d.]+)', line)
    if m:
        key = m.group(1).lower()
        val = float(m.group(2))
        comment = ''
        if '#' in line:
            comment = line.split('#', 1)[1].strip()
        allocations[key] = {'alloc': val, 'comment': comment}

import json
with open('$PROJECT_DIR/public/data/allocations.json', 'w') as f:
    json.dump(allocations, f, indent=2)
print(f'  ✓ allocations.json ({len(allocations)} strategies)')
"
fi

# 4. Pipeline status from HEARTBEAT
HB_FILE="/home/captain/.openclaw/workspace/HEARTBEAT.md"
if [ -f "$HB_FILE" ]; then
  python3 -c "
import re
with open('$HB_FILE') as f:
    text = f.read()

# Find the pipeline table section
in_table = False
rows = []
for line in text.split('\n'):
    if 'Pipeline Status' in line:
        in_table = True
        continue
    if in_table and line.startswith('## '):
        break
    if in_table and line.startswith('|') and not line.startswith('|---'):
        cells = [c.strip() for c in line.split('|')]
        if len(cells) >= 6 and 'Strategy' not in line and '---' not in line:
            rows.append({
                'name': cells[1] if len(cells) > 1 else '',
                'phase': cells[2] if len(cells) > 2 else '',
                'wr': cells[3] if len(cells) > 3 else '',
                'pf': cells[4] if len(cells) > 4 else '',
                'live': '✅' in (cells[5] if len(cells) > 5 else ''),
                'next_step': cells[6] if len(cells) > 6 else '',
            })

import json
with open('$PROJECT_DIR/public/data/pipeline.json', 'w') as f:
    json.dump(rows, f, indent=2)
print(f'  ✓ pipeline.json ({len(rows)} strategies)')
"
fi

# 5. Research insights
if [ -f "$TRADING_DIR/research/rd_insights.md" ]; then
  cp "$TRADING_DIR/research/rd_insights.md" "$PROJECT_DIR/public/data/rd_insights.md"
  echo '  ✓ rd_insights.md'
fi

if [ -f "$TRADING_DIR/research/algo_hunt_results.md" ]; then
  cp "$TRADING_DIR/research/algo_hunt_results.md" "$PROJECT_DIR/public/data/algo_hunt_results.md"
  echo '  ✓ algo_hunt_results.md'
fi

echo "=== Done: $(date) ==="
