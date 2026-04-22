#!/bin/bash

# Supabase configuration for all Beast orchestras
# Using shared Supabase project with separate schemas

SUPABASE_URL="https://llnflvnjinavbtqadgyu.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsbmZsdm5qaW5hdmJ0cWFkZ3l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2OTM4MTUsImV4cCI6MjA5MjI2OTgxNX0.xnn7-x8rV2cluETN-3eDI2yhuxMzcnTraBKmwbW1qJw"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsbmZsdm5qaW5hdmJ0cWFkZ3l1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY5MzgxNSwiZXhwIjoyMDkyMjY5ODE1fQ.0wL1fWdm3jWHVqF1apvGnYuGKniFUbE7LqFOxwrwW54"

echo "=== Supabase Configuration for All Beast Orchestras ==="
echo "Supabase URL: $SUPABASE_URL"
echo ""

# Directory Beast (already configured)
echo "1. Directory Beast:"
echo "   Schema: directory"
echo "   Tables: businesses, categories, reviews, users"
echo "   Status: ✅ Configured (you updated URL)"
echo ""

# Social Beast
echo "2. Social Beast:"
echo "   Schema: social"
echo "   Tables: posts, platforms, analytics, content_calendar"
echo "   Env Variables:"
echo "   SUPABASE_URL_SOCIAL=$SUPABASE_URL"
echo "   SUPABASE_ANON_KEY_SOCIAL=$SUPABASE_ANON_KEY"
echo "   SUPABASE_SERVICE_ROLE_KEY_SOCIAL=$SUPABASE_SERVICE_ROLE_KEY"
echo ""

# KidScan Beast
echo "3. KidScan Beast:"
echo "   Schema: kidscan"
echo "   Tables: products, ingredients, age_groups, safety_scores"
echo "   Env Variables:"
echo "   SUPABASE_URL_KIDSCAN=$SUPABASE_URL"
echo "   SUPABASE_ANON_KEY_KIDSCAN=$SUPABASE_ANON_KEY"
echo "   SUPABASE_SERVICE_ROLE_KEY_KIDSCAN=$SUPABASE_SERVICE_ROLE_KEY"
echo ""

# AppFactory Beast
echo "4. AppFactory Beast:"
echo "   Schema: appfactory"
echo "   Tables: habits, completions, streaks, templates"
echo "   Env Variables:"
echo "   SUPABASE_URL_APPFACTORY=$SUPABASE_URL"
echo "   SUPABASE_ANON_KEY_APPFACTORY=$SUPABASE_ANON_KEY"
echo "   SUPABASE_SERVICE_ROLE_KEY_APPFACTORY=$SUPABASE_SERVICE_ROLE_KEY"
echo ""

# Affiliate Beast
echo "5. Affiliate Beast:"
echo "   Schema: affiliate"
echo "   Tables: commissions, merchants, clicks, payouts"
echo "   Env Variables:"
echo "   SUPABASE_URL_AFFILIATE=$SUPABASE_URL"
echo "   SUPABASE_ANON_KEY_AFFILIATE=$SUPABASE_ANON_KEY"
echo "   SUPABASE_SERVICE_ROLE_KEY_AFFILIATE=$SUPABASE_SERVICE_ROLE_KEY"
echo ""

# Nudge Beast
echo "6. Nudge Beast:"
echo "   Schema: nudge"
echo "   Tables: tasks, families, members, reminders"
echo "   Env Variables:"
echo "   SUPABASE_URL_NUDGE=$SUPABASE_URL"
echo "   SUPABASE_ANON_KEY_NUDGE=$SUPABASE_ANON_KEY"
echo "   SUPABASE_SERVICE_ROLE_KEY_NUDGE=$SUPABASE_SERVICE_ROLE_KEY"
echo ""

echo "=== Next Steps ==="
echo "1. Create schemas in Supabase:"
echo "   CREATE SCHEMA IF NOT EXISTS directory;"
echo "   CREATE SCHEMA IF NOT EXISTS social;"
echo "   CREATE SCHEMA IF NOT EXISTS kidscan;"
echo "   CREATE SCHEMA IF NOT EXISTS appfactory;"
echo "   CREATE SCHEMA IF NOT EXISTS affiliate;"
echo "   CREATE SCHEMA IF NOT EXISTS nudge;"
echo ""
echo "2. Update each Beast's .env.local with their respective variables"
echo "3. Run database migrations for each schema"
echo "4. Test database connections"
echo ""
echo "=== Vercel Environment Variables ==="
echo "Add the above env variables to each Vercel project"
echo "Use Vercel CLI or dashboard to configure"