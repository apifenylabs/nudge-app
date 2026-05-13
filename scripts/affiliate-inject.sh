#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# Affiliate ID Injector — Universal Script for All 6 Sites
# ═══════════════════════════════════════════════════════════════
# Usage: ./scripts/affiliate-inject.sh [--dry-run]
#
# Reads workspace/credentials/affiliate-ids.json for real IDs.
# If file doesn't exist, creates it from template, exits.
# Then patches every site's affiliate config files.
#
# Run this once Chris provides affiliate IDs.
# ═══════════════════════════════════════════════════════════════

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE="$(cd "$SCRIPT_DIR/.." && pwd)"
CREDENTIALS_DIR="$WORKSPACE/credentials"
IDS_FILE="$CREDENTIALS_DIR/affiliate-ids.json"
DRY_RUN="${1:-}"
TOTAL_PATCHES=0

# Color output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

info()  { echo -e "${GREEN}[INFO]${NC} $1"; }
warn()  { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; }

# ─── Step 1: Check/Create Credentials File ────────────────────
if [ ! -f "$IDS_FILE" ]; then
  info "Creating affiliate-ids.json template..."
  mkdir -p "$CREDENTIALS_DIR"
  cat > "$IDS_FILE" << 'JSONEOF'
{
  "_comment": "Replace placeholder IDs with real ones from affiliate programs",
  "_updated": "YYYY-MM-DD",
  "klook": { "id": "YOUR_KLOOK_ID", "url": "https://affiliate.klook.com/redirect?aid=YOUR_KLOOK_ID&aff_adid=" },
  "viator": { "pid": "YOUR_VIATOR_PID", "mid": "YOUR_VIATOR_MCID", "url": "https://www.viator.com/?pid=YOUR_VIATOR_PID" },
  "booking": { "aid": "YOUR_BOOKING_AID", "url": "https://www.booking.com/index.html?aid=YOUR_BOOKING_AID" },
  "getyourguide": { "partner_id": "YOUR_GYG_ID", "url": "https://www.getyourguide.com/?partner_id=YOUR_GYG_ID" },
  "amazon": { "tag": "YOUR_AMAZON_TAG", "url": "https://www.amazon.com/?tag=YOUR_AMAZON_TAG" },
  "ai_tools": {
    "jasper": "YOUR_JASPER_REFERRAL",
    "writesonic": "YOUR_WRITESONIC_REFERRAL",
    "copymatic": "YOUR_COPYMATIC_REFERRAL",
    "murf": "YOUR_MURF_REFERRAL"
  }
}
JSONEOF
  warn "Template created at $IDS_FILE"
  warn "Ask Chris to fill in real IDs, then re-run this script."
  warn ""
  warn "Quick signup links for Chris:"
  warn "  Klook:    https://affiliate.klook.com"
  warn "  Viator:   https://www.viator.com/affiliates"
  warn "  Booking:  Via CJ.com or Booking.com affiliate program"
  warn "  Jasper:   https://www.jasper.ai/affiliates"
  exit 0
fi

# ─── Step 2: Read IDs ──────────────────────────────────────────
IDS=$(cat "$IDS_FILE")
check_id() {
  local val=$(echo "$IDS" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('$1',{}).get('$2','MISSING'))" 2>/dev/null)
  if [ "$val" = "MISSING" ] || [ "$val" = "YOUR_${1}_${2}" ] || [ "$val" = "YOUR_${1^^}_${2^^}" ]; then
    return 1
  fi
  echo "$val"
  return 0
}

KLOOK_ID=$(check_id "klook" "id" 2>/dev/null || echo "")
VIATOR_PID=$(check_id "viator" "pid" 2>/dev/null || echo "")
BOOKING_AID=$(check_id "booking" "aid" 2>/dev/null || echo "")
GYG_ID=$(check_id "getyourguide" "partner_id" 2>/dev/null || echo "")
AMAZON_TAG=$(check_id "amazon" "tag" 2>/dev/null || echo "")

info "Loaded affiliate IDs: Klook=$KLOOK_ID Viator=$VIATOR_PID Booking=$BOOKING_AID GYG=$GYG_ID Amazon=$AMAZON_TAG"

# ─── Step 3: Apply patches to each site ────────────────────────
patch_file() {
  local file="$1"
  if [ ! -f "$file" ]; then
    warn "File not found: $file (skipping)"
    return
  fi
  local tmp="${file}.tmp"
  cp "$file" "$tmp"
  local patched=false

  # Replace placeholder Klook IDs
  if [ -n "$KLOOK_ID" ]; then
    if grep -q "119991" "$tmp" 2>/dev/null; then
      sed -i "s/119991/$KLOOK_ID/g" "$tmp"
      patched=true
    fi
    if grep -q "YOUR_KLOOK_ID" "$tmp" 2>/dev/null; then
      sed -i "s/YOUR_KLOOK_ID/$KLOOK_ID/g" "$tmp"
      patched=true
    fi
  fi

  # Replace placeholder Viator IDs
  if [ -n "$VIATOR_PID" ]; then
    if grep -q "P00299136" "$tmp" 2>/dev/null; then
      sed -i "s/P00299136/$VIATOR_PID/g" "$tmp"
      patched=true
    fi
    if grep -q "YOUR_VIATOR_PID" "$tmp" 2>/dev/null; then
      sed -i "s/YOUR_VIATOR_PID/$VIATOR_PID/g" "$tmp"
      patched=true
    fi
  fi

  # Replace placeholder Booking IDs
  if [ -n "$BOOKING_AID" ]; then
    if grep -q "2875669" "$tmp" 2>/dev/null; then
      sed -i "s/2875669/$BOOKING_AID/g" "$tmp"
      patched=true
    fi
    if grep -q "YOUR_BOOKING_AID" "$tmp" 2>/dev/null; then
      sed -i "s/YOUR_BOOKING_AID/$BOOKING_AID/g" "$tmp"
      patched=true
    fi
  fi

  # Replace GYG placeholders
  if [ -n "$GYG_ID" ]; then
    if grep -q "YOUR_GYG_ID" "$tmp" 2>/dev/null; then
      sed -i "s/YOUR_GYG_ID/$GYG_ID/g" "$tmp"
      patched=true
    fi
  fi

  # Replace Amazon placeholders
  if [ -n "$AMAZON_TAG" ]; then
    if grep -q "YOUR_AMAZON_TAG" "$tmp" 2>/dev/null; then
      sed -i "s/YOUR_AMAZON_TAG/$AMAZON_TAG/g" "$tmp"
      patched=true
    fi
  fi

  if [ "$patched" = true ]; then
    if [ "$DRY_RUN" = "--dry-run" ]; then
      diff "$file" "$tmp" 2>/dev/null | head -5 || true
      info "[DRY-RUN] Would patch: $file"
      rm "$tmp"
    else
      mv "$tmp" "$file"
      info "Patched: $file"
      TOTAL_PATCHES=$((TOTAL_PATCHES + 1))
    fi
  else
    rm "$tmp"
    info "No changes needed: $file"
  fi
}

info "Scanning for affiliate config files across all sites..."
find "$WORKSPACE" -path "*/lib/affiliate*" -type f | grep -v node_modules | while read -r file; do
  patch_file "$file"
done

# Also scan for any data files with affiliate mentions
info "Scanning blog data files for affiliate placeholders..."
find "$WORKSPACE" -name "generated-blog-data.ts" -type f | grep -v node_modules | while read -r file; do
  if grep -q "KLOOK_ID\|BOOKING_ID\|YOUR_KLOOK\|YOUR_BOOKING\|YOUR_VIATOR\|aid=2875669\|aid=119991\|P00299136" "$file" 2>/dev/null; then
    patch_file "$file"
  fi
done

echo ""
if [ "$DRY_RUN" = "--dry-run" ]; then
  info "Dry run complete."
else
  info "Done! Patched $TOTAL_PATCHES files across all sites."
fi
info ""
info "Summary of IDs:"
info "  Klook:    ${KLOOK_ID:-NOT SET}"
info "  Viator:   ${VIATOR_PID:-NOT SET}"
info "  Booking:  ${BOOKING_AID:-NOT SET}"
info "  GYG:      ${GYG_ID:-NOT SET}"
info "  Amazon:   ${AMAZON_TAG:-NOT SET}"
if [ -z "$KLOOK_ID" ] && [ -z "$VIATOR_PID" ] && [ -z "$BOOKING_AID" ]; then
  warn "No real affiliate IDs found. Run this again after Chris fills credentials/affiliate-ids.json"
fi
