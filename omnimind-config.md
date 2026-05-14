# OmniMind Configuration (copied for self-contained topic work)

## Supabase Project
PROJECT_REF: gacynshwirvgeyrfwcly
DASHBOARD_URL: https://supabase.com/dashboard/project/gacynshwirvgeyrfwcly

## Deploy URLs (for Fly.io / Railway)
- SQL Editor: https://supabase.com/dashboard/project/gacynshwirvgeyrfwcly/sql/new
- API Settings: https://supabase.com/dashboard/project/gacynshwirvgeyrfwcly/settings/api
- Database URL pattern: postgresql://postgres.gacynshwirvgeyrfwcly:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true

## Secrets that need to be set (for flyctl secrets set or Railway env vars):
# Required:
MEMORY_API_KEY=<choose-a-secure-key>
SUPABASE_URL=https://gacynshwirvgeyrfwcly.supabase.co
SUPABASE_SERVICE_KEY=<from Settings > API > service_role key (must get from dashboard)>
OMNIMIND_ENCRYPTION_SALT=<openssl rand -hex 16>

# Optional:
SUPABASE_ANON_KEY=<from Settings > API > anon public key>
RATE_LIMIT_PER_MIN=60
LOG_LEVEL=info

## Deploy Commands (Run on mini PC):
### Option A: Fly.io
# curl -L https://fly.io/install.sh | sh
# cd ~/workspaces/omnimind && flyctl auth login && flyctl launch --no-deploy && flyctl secrets set MEMORY_API_KEY=... SUPABASE_URL=... SUPABASE_SERVICE_KEY=... OMNIMIND_ENCRYPTION_SALT=... && flyctl deploy

### Option B: Railway
# Connect repo: https://railway.app/new → select github.com/apifenylabs/omnimind
# Add all secrets in Railway Dashboard → Variables
# Railway auto-detects Dockerfile and deploys

### Option C: Docker Compose (VPS)
# git clone https://github.com/apifenylabs/omnimind.git
# cd omnimind
# cp .env.example .env  # fill in secrets
# docker compose up -d

## After Deploy
# Verify: curl https://your-app-url/ping
# Should return: {"status": "ok"}
# Then run migrate: curl -X POST https://your-app-url/api/deploy-schema
# (Supabase tables should already exist — you pasted the SQL)

## OpenClaw Plugin Config (in openclaw config.yaml):
# plugins:
#   entries:
#     omnimind:
#       apiUrl: "https://your-app-url"
#       apiKey: "your-MEMORY_API_KEY"
#       defaultUserId: "openclaw-agent"

## Built Artifacts (all on master @ ccc2e63):
# - sdk/python/omnimind/  ← PyPI package, self-tested
# - docker-compose.yml    ← Qdrant + backend + Caddy
# - Caddyfile             ← TLS, rate limiting, security headers
# - .env.example          ← all env vars documented
# - sdk/agent-integration.py ← standalone agent runtime integration
# - backend/crypto_utils.py  ← AES-256-GCM Phase 2 encryption
# - PRD.md               ← full venture deck
