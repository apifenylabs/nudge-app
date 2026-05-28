#!/usr/bin/env bash
# Clean Canadian clone content from 21 country pages.
# This script does targeted sed replacements on known Canadian content patterns.

set -euo pipefail

APP="/home/captain/.openclaw/workspace/apifeny-ai/app"

# Files to fix (all except canada and for-startups)
FILES=$(ls -d "$APP"/ai-tools-*/page.tsx | grep -v "ai-tools-canada" | grep -v "ai-tools-for-startups" | grep -v "ai-tools-china" | grep -v "ai-tools-india" | grep -v "ai-tools-australia" | grep -v "ai-tools-brazil" | grep -v "ai-tools-egypt" | grep -v "ai-tools-france" | grep -v "ai-tools-germany" | grep -v "ai-tools-hong-kong" | grep -v "ai-tools-indonesia" | grep -v "ai-tools-japan" | grep -v "ai-tools-kenya" | grep -v "ai-tools-malaysia" | grep -v "ai-tools-pakistan" | grep -v "ai-tools-philippines" | grep -v "ai-tools-saudi-arabia" | grep -v "ai-tools-singapore" | grep -v "ai-tools-south-korea" | grep -v "ai-tools-taiwan" | grep -v "ai-tools-thailand" | grep -v "ai-tools-turkey" | grep -v "ai-tools-uae" | grep -v "ai-tools-uk" | grep -v "ai-tools-usa" | grep -v "ai-tools-vietnam" | grep -v "ai-tools-bangladesh" | grep -v "ai-tools-cambodia" | grep -v "ai-tools-myanmar" | grep -v "ai-tools-nepal" | grep -v "ai-tools-sri-lanka")

echo "=== Files to fix ==="
for f in $FILES; do
    echo "  $f"
done

