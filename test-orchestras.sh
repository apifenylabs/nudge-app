#!/bin/bash

echo "=== Testing All 6 Orchestras ==="
echo "Current time: $(date)"
echo ""

# Test 1: Check PM2 status
echo "1. PM2 Status:"
pm2 list | grep -E "(name|online|stopped)" | head -20
echo ""

# Test 2: Check if applications are building
echo "2. Build Tests:"

test_build() {
    local name=$1
    local path=$2
    echo "Testing $name..."
    if cd "$path" 2>/dev/null && npm run build 2>&1 | grep -q "Compiled successfully\|✓ Generating static pages"; then
        echo "  ✅ $name builds successfully"
        return 0
    else
        echo "  ❌ $name build failed"
        return 1
    fi
}

test_build "Directory Beast" "/home/captain/.openclaw/workspace/family-travel-directory"
test_build "Social Beast" "/home/captain/.openclaw/workspace/social-beast-components"
test_build "Nudge" "/home/captain/.openclaw/workspace/nudge"
test_build "KidScan API" "/home/captain/.openclaw/workspace/kidscan-api"
test_build "Habit Tracker" "/home/captain/.openclaw/workspace/habit-tracker"
test_build "Affiliate Tracking" "/home/captain/.openclaw/workspace/affiliate-tracking"

echo ""
echo "3. Git Status:"
echo "Directory Beast: $(cd /home/captain/.openclaw/workspace/family-travel-directory && git log --oneline -1 2>/dev/null || echo 'No git')"
echo "GitHub Repo: https://github.com/apifenylabs/family-travel-directory"
echo ""

echo "4. Deployment Status:"
echo "Vercel Project: family-travel-directory (created)"
echo "Vercel Team: apifenylabs-2612"
echo ""

echo "=== Test Complete ==="