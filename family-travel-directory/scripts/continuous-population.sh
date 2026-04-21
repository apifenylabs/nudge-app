#!/bin/bash

# Continuous Directory Population Script
# Runs every 4 hours to keep directory fresh

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PARENT_DIR="$(dirname "$DIR")"
LOG_FILE="$PARENT_DIR/logs/population-$(date +%Y%m%d).log"
PID_FILE="$PARENT_DIR/tmp/population.pid"

# Create directories if they don't exist
mkdir -p "$(dirname "$LOG_FILE")"
mkdir -p "$(dirname "$PID_FILE")"

# Check if already running
if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if kill -0 "$PID" 2>/dev/null; then
        echo "[$(date)] Process already running with PID $PID" >> "$LOG_FILE"
        exit 0
    else
        echo "[$(date)] Stale PID file found, removing" >> "$LOG_FILE"
        rm "$PID_FILE"
    fi
fi

# Write PID
echo $$ > "$PID_FILE"

# Function to clean up on exit
cleanup() {
    echo "[$(date)] Cleaning up..." >> "$LOG_FILE"
    rm -f "$PID_FILE"
    exit 0
}

trap cleanup EXIT INT TERM

echo "=========================================" >> "$LOG_FILE"
echo "[$(date)] Starting continuous population" >> "$LOG_FILE"
echo "=========================================" >> "$LOG_FILE"

# Load environment variables
if [ -f "$PARENT_DIR/.env.local" ]; then
    export $(grep -v '^#' "$PARENT_DIR/.env.local" | xargs)
fi

# Run population in a loop
while true; do
    RUN_START=$(date +%s)
    
    echo "[$(date)] Starting population cycle" >> "$LOG_FILE"
    
    # Run the population script
    cd "$PARENT_DIR" && node "$DIR/populate-directory.js" >> "$LOG_FILE" 2>&1
    
    RUN_END=$(date +%s)
    RUN_DURATION=$((RUN_END - RUN_START))
    
    echo "[$(date)] Population cycle completed in ${RUN_DURATION}s" >> "$LOG_FILE"
    
    # Check if we need to gather more data
    DATA_COUNT=$(find "$PARENT_DIR/data" -name "*.json" | wc -l)
    if [ "$DATA_COUNT" -lt 10 ]; then
        echo "[$(date)] Low data count ($DATA_COUNT files), triggering data collection" >> "$LOG_FILE"
        # Trigger data collection (to be implemented)
        # node "$DIR/gather-data.js" >> "$LOG_FILE" 2>&1
    fi
    
    # Calculate next run time (4 hours from now)
    NEXT_RUN=$((RUN_END + 14400)) # 4 hours in seconds
    NOW=$(date +%s)
    SLEEP_TIME=$((NEXT_RUN - NOW))
    
    if [ "$SLEEP_TIME" -gt 0 ]; then
        echo "[$(date)] Sleeping for $((SLEEP_TIME / 3600))h $(((SLEEP_TIME % 3600) / 60))m until next run" >> "$LOG_FILE"
        sleep "$SLEEP_TIME"
    else
        echo "[$(date)] Immediate next run" >> "$LOG_FILE"
        sleep 60
    fi
done