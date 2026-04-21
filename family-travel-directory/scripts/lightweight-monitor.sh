#!/bin/bash

# Lightweight Monitor - Just ensures critical services are running
# Uses minimal resources to avoid being killed

LOG_FILE="/tmp/family-travel-monitor.log"
PID_FILE="/tmp/family-travel-monitor.pid"

# Write PID
echo $$ > "$PID_FILE"

# Cleanup function
cleanup() {
    rm -f "$PID_FILE"
    exit 0
}

trap cleanup EXIT INT TERM

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

log "🚀 Starting lightweight monitor"

# Main monitoring loop
while true; do
    # Check if directory server is running
    if ! curl -s -f http://localhost:3005 > /dev/null 2>&1; then
        log "❌ Directory server down, restarting..."
        cd /home/captain/.openclaw/workspace/family-travel-directory
        pkill -f "next.*3005" 2>/dev/null || true
        sleep 2
        nohup npm run dev -- -p 3005 > /tmp/directory-server.log 2>&1 &
        sleep 5
        log "✅ Directory server restarted"
    fi
    
    # Check if workflow is running (but don't restart if killed - may be intentional)
    if ! ps -p $(cat /tmp/workflow.pid 2>/dev/null) > /dev/null 2>&1; then
        log "⚠️  Workflow not running (may be intentional)"
        # Don't auto-restart workflow to avoid resource issues
    fi
    
    # Sleep for 5 minutes
    sleep 300
done