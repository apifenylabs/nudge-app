#!/bin/bash
# Run Social Beast pipeline in mock mode — no real credentials needed
# This validates the pipeline and generates content for review

cd "$(dirname "$0")"
echo "=== Social Beast Pipeline (Mock Mode) ==="
echo "Started: $(date -u '+%Y-%m-%d %H:%M:%S UTC')"
echo ""

# Run via Node with MOCK=true to skip real publishing
MOCK=true node daily-pipeline.js 2>&1

echo ""
echo "=== Pipeline Complete: $(date -u '+%Y-%m-%d %H:%M:%S UTC') ==="
