#!/bin/bash
# Fix SIGKILL issues for OpenClaw orchestras

echo "=== Fixing SIGKILL Issues ==="

# 1. Increase inotify watches
echo "Increasing inotify watches..."
sudo sysctl fs.inotify.max_user_watches=524288
sudo sysctl fs.inotify.max_user_instances=512
echo "fs.inotify.max_user_watches=524288" | sudo tee -a /etc/sysctl.conf
echo "fs.inotify.max_user_instances=512" | sudo tee -a /etc/sysctl.conf

# 2. Check and increase swap if needed
echo "Checking swap..."
if [ $(free -m | awk '/^Swap:/ {print $2}') -lt 2048 ]; then
    echo "Increasing swap to 2GB..."
    sudo fallocate -l 2G /swapfile
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
fi

# 3. Install PM2 if not installed
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    npm install -g pm2
    pm2 startup
fi

# 4. Build all orchestras first
echo "Building all orchestras..."
cd /home/captain/.openclaw/workspace

for dir in family-travel-directory social-beast-components kidscan-api habit-tracker affiliate-tracking; do
    if [ -d "$dir" ]; then
        echo "Building $dir..."
        cd "$dir"
        npm run build 2>/dev/null || echo "Build failed for $dir"
        cd ..
    fi
done

# 5. Start all with PM2
echo "Starting all orchestras with PM2..."
pm2 start /home/captain/.openclaw/workspace/pm2-ecosystem.config.js

# 6. Save PM2 configuration
pm2 save
pm2 startup

echo "=== Fix Complete ==="
echo "Orchestras running on:"
echo "- Directory Beast: http://localhost:3000"
echo "- Social Beast: http://localhost:3001"
echo "- KidScan Beast: http://localhost:3002"
echo "- AppFactory Beast: http://localhost:3003"
echo "- Affiliate Beast: http://localhost:3004"
echo ""
echo "Check status: pm2 status"
echo "View logs: pm2 logs"