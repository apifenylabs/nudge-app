#!/bin/bash
# OmniMind + OpenClaw watchdog — runs every 15 min via cron
# Checks: OpenClaw gateway alive, Memify worker healthy, critical cron jobs

LOG="/tmp/omnimind-watchdog.log"
GW_CHECK=$(openclaw gateway status 2>&1 | grep -c "Runtime: running")
MEM_CHECK=$(journalctl --user -u openclaw-gateway --since "15 min ago" --no-pager 2>/dev/null | grep -ci "OmniMind\|Memify\|memory")

if [ "$GW_CHECK" -eq 0 ]; then
  echo "[$(date)] WATCHDOG: Gateway DOWN — attempting restart" >> "$LOG"
  systemctl --user restart openclaw-gateway.service 2>&1 >> "$LOG"
  echo "[$(date)] WATCHDOG: Restart issued" >> "$LOG"
elif [ "$MEM_CHECK" -eq 0 ]; then
  echo "[$(date)] WATCHDOG: Gateway OK, no Memify activity in 15min (may be idle)" >> "$LOG"
else
  echo "[$(date)] WATCHDOG: All healthy" >> "$LOG"
fi
