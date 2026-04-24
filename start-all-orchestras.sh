#!/bin/bash
# Auto-recovery script: Brings all orchestras online
WORKSPACE=/home/captain/.openclaw/workspace

# Ensure PM2 daemon is running
pm2 resurrect 2>/dev/null || true

# Start Directory Beast
cd $WORKSPACE/family-travel-directory
if ! curl -s -o /dev/null http://localhost:3000 2>/dev/null; then
  PORT=3000 pm2 start "npm start" --name directory-beast --restart-delay 5000 --max-restarts 5
fi

# Start Nudge Beast
cd $WORKSPACE/nudge
if ! curl -s -o /dev/null http://localhost:3001 2>/dev/null; then
  PORT=3001 pm2 start "npm start" --name nudge-beast --restart-delay 5000 --max-restarts 5
fi

pm2 save
echo "All orchestras started at $(date)"
