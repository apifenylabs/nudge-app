#!/bin/bash
# Deploy AI Cofounder to Vercel
# Chris: Run once after `vercel login`
# Usage: bash scripts/deploy.sh

set -e

cd "$(dirname "$0")/.."

echo "🧪 Verifying build..."
npx next build

echo "🧹 Removing old deployments..."
vercel remove ai-cofounder --yes 2>/dev/null || true

echo "🚀 Deploying to Vercel..."
vercel --prod --yes

echo "✅ Deployed!"
echo ""
echo "🔗 Check your Vercel dashboard for the live URL."
