#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# Social Beast — Daily Pipeline Runner
# Cron entry: 0 7 * * * /home/captain/.openclaw/workspace/skills/social-beast/daily-pipeline.sh
#
# Schedule:
#   07:00 — Source phase (pull from all projects)
#   07:30 — Transform phase (8 formats × N items)
#   08:00 — Approval phase (send to Telegram)
#   08:30 — Collect approvals
#   09:00 — Publish phase
# ═══════════════════════════════════════════════════════════════

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo "╔════════════════════════════════════════════════════════╗"
echo "║  Social Beast — Daily Pipeline                        ║"
echo "║  $TIMESTAMP                                             ║"
echo "╚════════════════════════════════════════════════════════╝"

# ── Environment ──
export NODE_PATH="${WORKSPACE_DIR}/node_modules:${WORKSPACE_DIR}/skills/social-beast"

# ── Step 1: Ensure directories ──
mkdir -p "${WORKSPACE_DIR}/social-beast-approvals/archive"
mkdir -p "${WORKSPACE_DIR}/social-beast-logs/archive"

# ── Step 2: Run the Node.js pipeline ──
echo ""
echo "▶ Running main pipeline..."
echo ""

cd "${WORKSPACE_DIR}"

# Check if node is available
if ! command -v node &>/dev/null; then
  echo "❌ ERROR: Node.js is not available. Cannot run pipeline."
  exit 1
fi

# Execute the pipeline
node "${SCRIPT_DIR}/daily-pipeline.js" 2>&1

EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
  echo "⚠ Pipeline exited with code $EXIT_CODE"
fi

# ── Step 3: Log rotation ──
# Keep last 30 days of logs
find "${WORKSPACE_DIR}/social-beast-logs" -name "log-*.json" -mtime +30 -exec mv {} "${WORKSPACE_DIR}/social-beast-logs/archive/" \;
find "${WORKSPACE_DIR}/social-beast-approvals" -name "approved-*.json" -mtime +30 -exec mv {} "${WORKSPACE_DIR}/social-beast-approvals/archive/" \;

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║  Pipeline complete.                                    ║"
echo "║  Exit code: $EXIT_CODE                                  ║"
echo "╚════════════════════════════════════════════════════════╝"

exit $EXIT_CODE
