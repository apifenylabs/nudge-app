#!/bin/bash
# Setup automatic checkpoints every 4 hours

echo "=== Setting up Automatic Checkpoints ==="

# Create checkpoint script
cat > /home/captain/.openclaw/workspace/run-checkpoint.sh << 'EOF'
#!/bin/bash
cd /home/captain/.openclaw/workspace
./checkpoint-system.sh > checkpoint-$(date +%Y-%m-%d-%H%M).log 2>&1
EOF

chmod +x /home/captain/.openclaw/workspace/run-checkpoint.sh

# Create crontab entry
CRON_JOB="0 */4 * * * /home/captain/.openclaw/workspace/run-checkpoint.sh"

# Add to crontab
(crontab -l 2>/dev/null | grep -v "run-checkpoint.sh"; echo "$CRON_JOB") | crontab -

echo "Checkpoints scheduled every 4 hours:"
echo "00:00, 04:00, 08:00, 12:00, 16:00, 20:00 HKT"
echo ""
echo "Checkpoint logs will be saved to:"
echo "/home/captain/.openclaw/workspace/checkpoint-YYYY-MM-DD-HHMM.log"
echo ""
echo "To view current crontab: crontab -l"
echo "To remove: crontab -r"
echo ""
echo "=== Checkpoint System Ready ==="