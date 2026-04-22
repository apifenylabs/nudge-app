#!/bin/bash
# Automatic Checkpoint System - Every 4 Hours

echo "=== CHECKPOINT SYSTEM ACTIVATED ==="
echo "Checkpoint: $(date '+%Y-%m-%d %H:%M HKT')"
echo ""

# 1. Directory Beast Check
echo "1. Directory Beast Status:"
cd /home/captain/.openclaw/workspace/family-travel-directory

# Build status
if npm run build 2>&1 | grep -q "✓ Compiled successfully"; then
    echo "   ✅ Build: PASSED"
    BUILD_PASSED=true
else
    echo "   ❌ Build: FAILED"
    BUILD_PASSED=false
fi

# File count
FILE_COUNT=$(find . -name "*.ts" -o -name "*.tsx" | wc -l)
echo "   📁 Files: $FILE_COUNT TypeScript files"

# Component count
COMPONENT_COUNT=$(find components -name "*.tsx" 2>/dev/null | wc -l)
echo "   🧩 Components: $COMPONENT_COUNT"

# Mock data count
MOCK_COUNT=$(grep -c "id:" lib/supabase.ts 2>/dev/null || echo "0")
echo "   📊 Mock data: $MOCK_COUNT businesses"

# 2. Social Beast Check
echo ""
echo "2. Social Beast Status:"
cd /home/captain/.openclaw/workspace/social-beast-components

if [ -d "components" ]; then
    COMP_COUNT=$(ls components/*.tsx 2>/dev/null | wc -l)
    echo "   🧩 Components: $COMP_COUNT/5"
    
    if [ $COMP_COUNT -ge 5 ]; then
        echo "   ✅ Target: ACHIEVED"
    else
        echo "   ⚠️ Target: IN PROGRESS ($((5-COMP_COUNT)) remaining)"
    fi
else
    echo "   ❌ No components directory"
fi

# 3. KidScan Beast Check
echo ""
echo "3. KidScan Beast Status:"
cd /home/captain/.openclaw/workspace/kidscan-api

if [ -d "app/api/age-filter" ]; then
    echo "   ✅ API endpoint: CREATED"
    ENDPOINT_EXISTS=true
else
    echo "   ❌ API endpoint: NOT CREATED"
    ENDPOINT_EXISTS=false
fi

# 4. AppFactory Beast Check
echo ""
echo "4. AppFactory Beast Status:"
cd /home/captain/.openclaw/workspace/habit-tracker

if [ -f "lib/schema.sql" ]; then
    echo "   ✅ Database schema: CREATED"
    SCHEMA_EXISTS=true
else
    echo "   ❌ Database schema: NOT CREATED"
    SCHEMA_EXISTS=false
fi

# 5. Affiliate Beast Check
echo ""
echo "5. Affiliate Beast Status:"
cd /home/captain/.openclaw/workspace/affiliate-tracking

if [ -f "lib/tracking.sql" ]; then
    echo "   ✅ Tracking schema: CREATED"
    TRACKING_EXISTS=true
else
    echo "   ❌ Tracking schema: NOT CREATED"
    TRACKING_EXISTS=false
fi

# 6. Nudge & Agent HQ Check
echo ""
echo "6. Nudge & Agent HQ Status:"
if [ -f "/home/captain/.openclaw/workspace/nudge-maintenance.md" ]; then
    echo "   ✅ Nudge maintenance: CONFIGURED"
else
    echo "   ❌ Nudge maintenance: NOT CONFIGURED"
fi

if [ -f "/home/captain/.openclaw/workspace/agent-hq-maintenance.md" ]; then
    echo "   ✅ Agent HQ maintenance: CONFIGURED"
else
    echo "   ❌ Agent HQ maintenance: NOT CONFIGURED"
fi

# 7. System Checks
echo ""
echo "7. System Status:"

# PM2 status
if command -v pm2 &> /dev/null; then
    PM2_RUNNING=$(pm2 status 2>/dev/null | grep -c "online")
    echo "   🔧 PM2: INSTALLED ($PM2_RUNNING processes online)"
else
    echo "   ❌ PM2: NOT INSTALLED"
fi

# Credential system
if [ -f "/home/captain/.config/openclaw-secrets/.env.agents" ]; then
    echo "   🔐 Credentials: CONFIGURED"
    CREDS_CONFIGURED=true
else
    echo "   ⚠️ Credentials: NOT CONFIGURED (see SAFE_CREDENTIAL_GUIDE.md)"
    CREDS_CONFIGURED=false
fi

# SIGKILL fix
if [ -f "/home/captain/.openclaw/workspace/fix-sigkill.sh" ]; then
    echo "   🛠️ SIGKILL fix: READY"
    FIX_READY=true
else
    echo "   ❌ SIGKILL fix: NOT READY"
    FIX_READY=false
fi

# 8. Summary
echo ""
echo "=== CHECKPOINT SUMMARY ==="
echo "Timestamp: $(date '+%Y-%m-%d %H:%M HKT')"
echo "Next checkpoint: $(date -d '+4 hours' '+%Y-%m-%d %H:%M HKT')"
echo ""
echo "Ready for deployment: $BUILD_PASSED"
echo "Credentials configured: $CREDS_CONFIGURED"
echo "SIGKILL fix ready: $FIX_READY"
echo ""
echo "Next actions:"
if [ "$CREDS_CONFIGURED" = "false" ]; then
    echo "1. Configure credentials using SAFE_CREDENTIAL_GUIDE.md"
fi
if [ "$FIX_READY" = "true" ]; then
    echo "2. Run ./fix-sigkill.sh to start stable servers"
fi
if [ "$BUILD_PASSED" = "true" ] && [ "$CREDS_CONFIGURED" = "true" ]; then
    echo "3. Run ./deploy-directory-beast.sh to deploy"
fi
echo ""
echo "=== CHECKPOINT COMPLETE ==="