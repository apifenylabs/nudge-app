#!/bin/bash
# Nudge Supabase Schema Deploy
# Run this ONCE after logging into Supabase
#
# Usage:
#   supabase login
#   supabase link --project-ref yrwnkepndpjmlrewcro
#   bash scripts/deploy-nudge-schema.sh

echo "=== Nudge Schema Deploy ==="
echo "Run this from the nudge project root (~/.openclaw/workspace/_projects/nudge/)"
echo ""
echo "If you haven't linked the project yet:"
echo "  supabase login"
echo "  supabase link --project-ref yrwnkepndpjmlrewcro"
echo ""
echo "Then run individual migration files in order:"
echo "  1. supabase-migration-inline.sql (base tables)"
echo "  2. supabase-migration-billing.sql"
echo "  3. supabase-migration-onboarding.sql"
echo "  4. supabase-migration-soft-delete.sql"
echo "  5. supabase-migration-notifications.sql"
echo "  6. supabase-migration-referral-gamification.sql"
echo ""
echo "Or run the combined schema:"
echo "  cat /tmp/nudge-complete-schema.sql | supabase db execute"
