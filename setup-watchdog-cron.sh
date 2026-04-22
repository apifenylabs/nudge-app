#!/bin/bash
# Setup Watchdog Cron Job

echo "=== Setting up Watchdog Orchestra Monitor ==="

# Make sure watchdog script is executable
chmod +x /home/captain/.openclaw/workspace/watchdog-orchestra-monitor.sh

# Create cron job entry
CRON_JOB="*/5 * * * * /home/captain/.openclaw/workspace/watchdog-orchestra-monitor.sh >> /home/captain/.openclaw/workspace/watchdog-cron.log 2>&1"

# Add to crontab
(crontab -l 2>/dev/null | grep -v "watchdog-orchestra-monitor.sh"; echo "$CRON_JOB") | crontab -

# Create log file
touch /home/captain/.openclaw/workspace/watchdog-cron.log
touch /home/captain/.openclaw/workspace/watchdog.log

echo "Watchdog cron job added:"
echo "Schedule: Every 5 minutes"
echo "Script: /home/captain/.openclaw/workspace/watchdog-orchestra-monitor.sh"
echo "Logs: /home/captain/.openclaw/workspace/watchdog-cron.log"
echo "Status log: /home/captain/.openclaw/workspace/watchdog.log"
echo ""
echo "Current crontab:"
crontab -l
echo ""
echo "To test immediately:"
echo "  ./watchdog-orchestra-monitor.sh"
echo ""
echo "To view logs:"
echo "  tail -f /home/captain/.openclaw/workspace/watchdog-cron.log"
echo "  tail -f /home/captain/.openclaw/workspace/watchdog.log"
echo ""
echo "To remove watchdog:"
echo "  crontab -l | grep -v watchdog | crontab -"
echo ""
echo "=== Watchdog Setup Complete ==="