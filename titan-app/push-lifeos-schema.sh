#!/usr/bin/env bash
# push-lifeos-schema.sh
# Push LifeOS schema to Supabase via Management API
# Requires: SUPABASE_ACCESS_TOKEN env var
# Usage: SUPABASE_ACCESS_TOKEN=xxx ./push-lifeos-schema.sh

set -euo pipefail

PROJECT_REF="yrvnkepndpjmlrewecro"
MIGRATION_FILE="/home/captain/.openclaw/workspace/titan-app/supabase/migrations/20260526_create_lifeos_tables.sql"

if [ -z "${SUPABASE_ACCESS_TOKEN:-}" ]; then
  echo "ERROR: SUPABASE_ACCESS_TOKEN not set"
  echo ""
  echo "How to get your PAT:"
  echo "  1. Go to https://supabase.com/dashboard/account/tokens"
  echo "  2. Create a new token with scope 'Management API'"
  echo "  3. Set as env var: export SUPABASE_ACCESS_TOKEN='your-token-here'"
  echo ""
  echo "How to get your service_role key (alternative):"
  echo "  1. Go to https://supabase.com/dashboard/project/${PROJECT_REF}/settings/api"
  echo "  2. Copy the 'service_role' key (NOT anon)"
  echo "  3. Use with psql or the SQL API directly"
  exit 1
fi

SQL=$(cat "$MIGRATION_FILE")

echo "Pushing migration to project $PROJECT_REF..."

# Option A: Supabase CLI (preferred)
export SUPABASE_ACCESS_TOKEN
supabase db push --project-ref "$PROJECT_REF" 2>&1 || {
  echo ""
  echo "Option A failed. Trying Option B: Direct SQL API via service_role key..."
  echo "Run this manually with your service_role key:"
  echo ""
  echo "  curl -X POST 'https://${PROJECT_REF}.supabase.co/rest/v1/rpc/' \\"
  echo "    -H 'apikey: YOUR_SERVICE_ROLE_KEY' \\"
  echo "    -H 'Authorization: Bearer YOUR_SERVICE_ROLE_KEY' \\"
  echo "    -H 'Content-Type: application/json' \\"
  echo "    -d '{\"query\": \"$(cat $MIGRATION_FILE | tr '\n' ' ' | sed 's/"/\\"/g')\"'"
  echo ""
  echo "Or use the Supabase dashboard SQL editor:"
  echo "  https://supabase.com/dashboard/project/${PROJECT_REF}/sql/new"
  echo "  -> Paste the contents of $MIGRATION_FILE"
  echo "  -> Click 'Run'"
}
