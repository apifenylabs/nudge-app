#!/usr/bin/env bash
# install-deps.sh — Install Python dependencies for trading playbooks
set -e
cd "$(dirname "$0")"
echo "Installing dependencies..."
pip install -r requirements.txt --quiet
echo "✅ Dependencies installed"
