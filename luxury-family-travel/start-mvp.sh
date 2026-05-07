#!/bin/bash

echo "🚀 Starting Family Travel Directory MVP..."

# Kill any existing processes
pkill -f "next.*3005" 2>/dev/null || true
sleep 2

# Start the server
cd /home/captain/.openclaw/workspace/family-travel-directory
echo "Starting Next.js server on port 3005..."
nohup npm run dev -- -p 3005 > /tmp/family-travel-mvp.log 2>&1 &

# Wait for server to start
echo "Waiting for server to start..."
sleep 5

# Check if server is running
if curl -s -f http://localhost:3005 > /dev/null 2>&1; then
    echo "✅ Server is running at http://localhost:3005"
    echo "📊 Logs: /tmp/family-travel-mvp.log"
    echo ""
    echo "🎯 MVP Features:"
    echo "• Clean Klook-style UI"
    echo "• Tokyo data (4 sample activities)"
    echo "• Affiliate-ready structure"
    echo "• Mobile responsive"
    echo ""
    echo "💰 Affiliate Links Ready For:"
    echo "• Klook (8% commission)"
    echo "• Viator (6-8% commission)"
    echo "• GetYourGuide (6-10% commission)"
else
    echo "❌ Server failed to start. Check logs: /tmp/family-travel-mvp.log"
    tail -20 /tmp/family-travel-mvp.log
fi