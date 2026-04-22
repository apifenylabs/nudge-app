#!/bin/bash
# Watchdog Orchestra Monitor
# Runs every 5 minutes to ensure all 7 orchestras are running

echo "=== WATCHDOG ORCHESTRA MONITOR ==="
echo "Time: $(date '+%Y-%m-%d %H:%M HKT')"
echo ""

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "❌ PM2 not installed. Installing..."
    npm install -g pm2
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install PM2"
        exit 1
    fi
fi

# Check if jq is installed (for JSON parsing)
if ! command -v jq &> /dev/null; then
    echo "❌ jq not installed. Installing..."
    sudo apt-get update && sudo apt-get install -y jq 2>/dev/null || \
    brew install jq 2>/dev/null || \
    echo "⚠️ Could not install jq. Using fallback check."
    JQ_AVAILABLE=false
else
    JQ_AVAILABLE=true
fi

cd /home/captain/.openclaw/workspace

# Check PM2 status
echo "Checking PM2 status..."
PM2_STATUS=$(pm2 status 2>&1)

if echo "$PM2_STATUS" | grep -q "online"; then
    echo "✅ PM2 has online processes"
    
    if [ "$JQ_AVAILABLE" = "true" ]; then
        # Use jq for precise check (EXACT COMMAND FROM YOUR REQUEST)
        RUNNING=$(pm2 jlist 2>/dev/null | jq '[.[] | .pm2_env.status] | contains(["online"])' 2>/dev/null)
        JQ_EXIT_CODE=$?
        
        if [ $JQ_EXIT_CODE -eq 0 ] && [ "$RUNNING" = "true" ]; then
            echo "✅ All orchestras running via PM2 (jq check)"
            
            # Count online processes
            ONLINE_COUNT=$(pm2 jlist 2>/dev/null | jq '[.[] | select(.pm2_env.status == "online")] | length' 2>/dev/null || echo "0")
            echo "📊 Online processes: $ONLINE_COUNT"
            
            if [ "$ONLINE_COUNT" -lt 5 ]; then
                echo "⚠️ Only $ONLINE_COUNT orchestras online (expected 5+)"
                echo "Restarting all orchestras..."
                ./fix-sigkill.sh
                # Send alert to Alpha-HQ (optional)
                curl -X POST http://localhost:3004/api/alerts -d '{"source":"watchdog","message":"Orchestras restarted"}' 2>/dev/null || true
            fi
        else
            echo "❌ Not all orchestras running. Restarting..."
            ./fix-sigkill.sh
            # Send alert to Alpha-HQ (optional)
            curl -X POST http://localhost:3004/api/alerts -d '{"source":"watchdog","message":"Orchestras restarted"}' 2>/dev/null || true
        fi
    else
        # Fallback check without jq
        ONLINE_COUNT=$(echo "$PM2_STATUS" | grep -c "online")
        echo "📊 Online processes (fallback): $ONLINE_COUNT"
        
        if [ "$ONLINE_COUNT" -lt 5 ]; then
            echo "⚠️ Only $ONLINE_COUNT orchestras online (expected 5+)"
            echo "Restarting all orchestras..."
            ./fix-sigkill.sh
        else
            echo "✅ Sufficient orchestras running (fallback check)"
        fi
    fi
else
    echo "❌ No PM2 processes online. Starting all orchestras..."
    ./fix-sigkill.sh
fi

# Health check endpoints (if orchestras have health endpoints)
echo ""
echo "Performing health checks..."

HEALTH_ENDPOINTS=(
    "http://localhost:3000"
    "http://localhost:3001" 
    "http://localhost:3002"
    "http://localhost:3003"
    "http://localhost:3004"
)

FAILED_CHECKS=0
for endpoint in "${HEALTH_ENDPOINTS[@]}"; do
    echo -n "Checking $endpoint ... "
    if curl -s --max-time 5 "$endpoint" > /dev/null; then
        echo "✅"
    else
        echo "❌"
        FAILED_CHECKS=$((FAILED_CHECKS + 1))
    fi
done

if [ "$FAILED_CHECKS" -gt 2 ]; then
    echo "⚠️ $FAILED_CHECKS health checks failed. Consider restarting..."
    # Optional: Send alert
    # curl -X POST http://localhost:3004/api/alerts -d '{"source":"watchdog","message":"Health checks failed"}'
fi

# Check memory usage
echo ""
echo "Checking system resources..."
MEMORY_USAGE=$(free -m | awk '/^Mem:/ {printf "%.1f%%", $3/$2*100}')
echo "📊 Memory usage: $MEMORY_USAGE"

if [ "$(echo "$MEMORY_USAGE" | sed 's/%//')" -gt 90 ]; then
    echo "⚠️ High memory usage. Consider optimizing or adding swap."
fi

# Log to file
LOG_FILE="/home/captain/.openclaw/workspace/watchdog.log"
echo "$(date '+%Y-%m-%d %H:%M:%S') - Online: $ONLINE_COUNT, Memory: $MEMORY_USAGE, Failed health: $FAILED_CHECKS" >> "$LOG_FILE"

# Keep log file manageable
tail -n 1000 "$LOG_FILE" > "$LOG_FILE.tmp" && mv "$LOG_FILE.tmp" "$LOG_FILE"

echo ""
echo "=== WATCHDOG COMPLETE ==="
echo "Next check: $(date -d '+5 minutes' '+%H:%M HKT')"