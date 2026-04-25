#!/bin/bash
# Auto-recovery script: Brings all orchestras online
# Only starts processes that aren't already running

WORKSPACE=/home/captain/.openclaw/workspace
RESTARTED=false

# Try PM2 resurrect first (fastest path)
pm2 resurrect 2>/dev/null
sleep 2

# Check each beast by port, start if missing
check_and_start() {
  local port=$1
  local name=$2
  local dir=$3
  if curl -s -o /dev/null http://localhost:$port 2>/dev/null; then
    echo "✅ $name already running on $port"
  else
    echo "⚠️  $name down on $port — starting..."
    cd "$WORKSPACE/$dir"
    PORT=$port pm2 start "npm start" --name "$name" --restart-delay 5000 --max-restarts 5 2>/dev/null
    RESTARTED=true
  fi
}

check_and_start 3000 "directory-beast" "family-travel-directory"
check_and_start 3001 "nudge-beast" "nudge"

if [ "$RESTARTED" = true ]; then
  pm2 save
  echo "✅ State saved at $(date)"
else
  echo "✅ All orchestras already running at $(date)"
fi
