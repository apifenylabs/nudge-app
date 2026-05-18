#!/bin/bash

echo "🚀 Launching Family Travel Directory v2.0"

# Clean up
pkill -f "next.*3006" 2>/dev/null || true
rm -rf .next 2>/dev/null || true
sleep 2

# Start server
echo "Starting server on port 3006..."
cd /home/captain/.openclaw/workspace/family-travel-directory
nohup npm run dev -- -p 3006 > /tmp/directory-v2.log 2>&1 &

# Wait for startup
echo "Waiting for server..."
sleep 8

# Check status
if ps aux | grep "next.*3006" | grep -v grep > /dev/null; then
    echo "✅ Server is running!"
    echo ""
    echo "📊 MVP LAUNCHED:"
    echo "• URL: http://localhost:3006"
    echo "• Cities: Tokyo + Bangkok"
    echo "• Activities: 6 premium listings"
    echo "• Affiliate: Klook, Viator, GetYourGuide"
    echo "• Commission: 6-8% ready"
    echo ""
    echo "🎯 IMMEDIATE MONETIZATION:"
    echo "1. Add affiliate IDs (replace OURCODE)"
    echo "2. Expand to Singapore data"
    echo "3. Basic SEO implementation"
    echo ""
    echo "📈 LOGS: /tmp/directory-v2.log"
else
    echo "❌ Server failed to start"
    tail -20 /tmp/directory-v2.log 2>/dev/null || echo "Check npm install status"
fi