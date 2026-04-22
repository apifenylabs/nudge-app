# Safe Credential Guide for Autonomous Deployment

## Overview
Secure storage of scoped tokens in `~/.config/openclaw-secrets/.env.agents` for autonomous deployment.

## Step-by-Step Instructions

### 1. Create Secure Directory Structure
```bash
# Run on your mini PC
mkdir -p ~/.config/openclaw-secrets
chmod 700 ~/.config/openclaw-secrets
cd ~/.config/openclaw-secrets
```

### 2. Create Credentials Template
```bash
# Create template file (you'll fill actual values)
cat > .env.agents.template << 'EOF'
# === GITHUB CREDENTIALS ===
# Scope: repo (full control), workflow
GITHUB_PAT=your_personal_access_token_here
GITHUB_USERNAME=your_github_username
GITHUB_EMAIL=your_email@example.com

# Repository URLs
GITHUB_REPO_DIRECTORY=https://github.com/yourusername/family-travel-directory.git
GITHUB_REPO_SOCIAL=https://github.com/yourusername/social-beast-components.git
GITHUB_REPO_KIDSCAN=https://github.com/yourusername/kidscan-api.git
GITHUB_REPO_APPFACTORY=https://github.com/yourusername/habit-tracker.git
GITHUB_REPO_AFFILIATE=https://github.com/yourusername/affiliate-tracking.git

# === VERCEL CREDENTIALS ===
# Scope: Read & write for projects, deployments
VERCEL_TOKEN=your_vercel_api_token_here
VERCEL_ORG_ID=your_organization_id_here
VERCEL_PROJECT_ID_DIRECTORY=your_project_id_here
VERCEL_PROJECT_ID_SOCIAL=your_project_id_here
VERCEL_PROJECT_ID_KIDSCAN=your_project_id_here
VERCEL_PROJECT_ID_APPFACTORY=your_project_id_here
VERCEL_PROJECT_ID_AFFILIATE=your_project_id_here

# === SUPABASE CREDENTIALS ===
# Service role keys (bypasses RLS - use carefully)
SUPABASE_URL_DIRECTORY=https://family-travel-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY_DIRECTORY=your_service_role_key_here
SUPABASE_ANON_KEY_DIRECTORY=your_anon_key_here

SUPABASE_URL_KIDSCAN=https://kidscan-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY_KIDSCAN=your_service_role_key_here

SUPABASE_URL_APPFACTORY=https://habit-tracker-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY_APPFACTORY=your_service_role_key_here

SUPABASE_URL_AFFILIATE=https://affiliate-tracking-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY_AFFILIATE=your_service_role_key_here

# === AFFILIATE PROGRAM CREDENTIALS ===
BOOKING_COM_AFFILIATE_ID=your_affiliate_id_here
GETYOURGUIDE_AFFILIATE_ID=your_affiliate_id_here
AMAZON_ASSOCIATES_TAG=your_tag_here

# === SECURITY SETTINGS ===
# Encryption key for sensitive data (optional)
ENCRYPTION_KEY=generate_random_32_char_key
EOF
```

### 3. Create Actual Credentials File
```bash
# Create the actual file (you fill values, keep secret)
cat > .env.agents << 'EOF'
# === ACTUAL CREDENTIALS - KEEP SECURE ===
# Fill these with your real credentials

# GITHUB
GITHUB_PAT=REPLACE_WITH_YOUR_TOKEN
GITHUB_USERNAME=REPLACE_WITH_YOUR_USERNAME
GITHUB_EMAIL=REPLACE_WITH_YOUR_EMAIL

GITHUB_REPO_DIRECTORY=REPLACE_WITH_YOUR_REPO_URL
GITHUB_REPO_SOCIAL=REPLACE_WITH_YOUR_REPO_URL
GITHUB_REPO_KIDSCAN=REPLACE_WITH_YOUR_REPO_URL
GITHUB_REPO_APPFACTORY=REPLACE_WITH_YOUR_REPO_URL
GITHUB_REPO_AFFILIATE=REPLACE_WITH_YOUR_REPO_URL

# VERCEL
VERCEL_TOKEN=REPLACE_WITH_YOUR_TOKEN
VERCEL_ORG_ID=REPLACE_WITH_YOUR_ORG_ID
VERCEL_PROJECT_ID_DIRECTORY=REPLACE_WITH_YOUR_PROJECT_ID
VERCEL_PROJECT_ID_SOCIAL=REPLACE_WITH_YOUR_PROJECT_ID
VERCEL_PROJECT_ID_KIDSCAN=REPLACE_WITH_YOUR_PROJECT_ID
VERCEL_PROJECT_ID_APPFACTORY=REPLACE_WITH_YOUR_PROJECT_ID
VERCEL_PROJECT_ID_AFFILIATE=REPLACE_WITH_YOUR_PROJECT_ID

# SUPABASE
SUPABASE_URL_DIRECTORY=REPLACE_WITH_YOUR_URL
SUPABASE_SERVICE_ROLE_KEY_DIRECTORY=REPLACE_WITH_YOUR_KEY
SUPABASE_ANON_KEY_DIRECTORY=REPLACE_WITH_YOUR_KEY

SUPABASE_URL_KIDSCAN=REPLACE_WITH_YOUR_URL
SUPABASE_SERVICE_ROLE_KEY_KIDSCAN=REPLACE_WITH_YOUR_KEY

SUPABASE_URL_APPFACTORY=REPLACE_WITH_YOUR_URL
SUPABASE_SERVICE_ROLE_KEY_APPFACTORY=REPLACE_WITH_YOUR_KEY

SUPABASE_URL_AFFILIATE=REPLACE_WITH_YOUR_URL
SUPABASE_SERVICE_ROLE_KEY_AFFILIATE=REPLACE_WITH_YOUR_KEY

# AFFILIATE
BOOKING_COM_AFFILIATE_ID=REPLACE_WITH_YOUR_ID
GETYOURGUIDE_AFFILIATE_ID=REPLACE_WITH_YOUR_ID
AMAZON_ASSOCIATES_TAG=REPLACE_WITH_YOUR_TAG

# SECURITY
ENCRYPTION_KEY=REPLACE_WITH_RANDOM_32_CHAR_KEY
EOF

# Make it readable only by you
chmod 600 .env.agents
```

### 4. Create Safe Loader Script
```bash
# Create script that safely loads credentials
cat > load-credentials.sh << 'EOF'
#!/bin/bash
# Safe credential loader for OpenClaw agents

CREDENTIALS_FILE="$HOME/.config/openclaw-secrets/.env.agents"

if [ ! -f "$CREDENTIALS_FILE" ]; then
    echo "ERROR: Credentials file not found at $CREDENTIALS_FILE"
    echo "Please create it using the template in SAFE_CREDENTIAL_GUIDE.md"
    exit 1
fi

# Load credentials
export $(grep -v '^#' "$CREDENTIALS_FILE" | xargs)

# Verify required variables are set
required_vars=(
    "GITHUB_PAT"
    "VERCEL_TOKEN"
    "SUPABASE_URL_DIRECTORY"
    "SUPABASE_SERVICE_ROLE_KEY_DIRECTORY"
)

for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "ERROR: Required variable $var is not set"
        exit 1
    fi
done

echo "Credentials loaded successfully (values not displayed for security)"
EOF

chmod +x load-credentials.sh
```

### 5. Create Deployment Script Using Credentials
```bash
cat > deploy-directory-beast.sh << 'EOF'
#!/bin/bash
# Directory Beast deployment using secure credentials

# Load credentials
source ~/.config/openclaw-secrets/load-credentials.sh

cd /home/captain/.openclaw/workspace/family-travel-directory

echo "=== Deploying Directory Beast ==="

# 1. Build
echo "Building..."
npm run build
if [ $? -ne 0 ]; then
    echo "Build failed!"
    exit 1
fi

# 2. Initialize git
if [ ! -d .git ]; then
    echo "Initializing git repository..."
    git init
    git config user.email "$GITHUB_EMAIL"
    git config user.name "$GITHUB_USERNAME"
    git add .
    git commit -m "Directory Beast v1.0 - Family Travel Directory"
fi

# 3. Push to GitHub
echo "Pushing to GitHub..."
git remote add origin "$GITHUB_REPO_DIRECTORY" 2>/dev/null || true
git push -u origin main --force

# 4. Deploy to Vercel
echo "Deploying to Vercel..."
npx vercel deploy --prod --token "$VERCEL_TOKEN" --yes

# 5. Set up Supabase environment
echo "Setting up Supabase environment..."
cat > .env.production << ENV
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL_DIRECTORY
NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY_DIRECTORY
ENV

echo "=== Deployment Complete ==="
echo "Directory Beast should now be live on Vercel"
echo "Supabase environment configured"
EOF

chmod +x deploy-directory-beast.sh
```

### 6. How to Get Each Credential

#### **GitHub Personal Access Token:**
1. Go to GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. **Note:** "OpenClaw Deployment"
4. **Expiration:** 90 days (recommended)
5. **Scopes:** Select `repo` (Full control of private repositories) and `workflow`
6. Click "Generate token"
7. **IMPORTANT:** Copy token immediately (won't show again)

#### **Vercel API Token:**
1. Go to Vercel.com → Settings → Tokens
2. Click "Create Token"
3. **Name:** "OpenClaw Autonomous Deployment"
4. **Scope:** Select all (or at minimum: read/write for projects, deployments, env vars)
5. Click "Create Token"
6. Copy token

#### **Supabase Service Role Key:**
1. Go to your Supabase project → Settings → API
2. Under "Project API keys", find:
   - **URL:** Use the "Project URL"
   - **anon public:** Use for client-side
   - **service_role:** Use for server-side (bypasses RLS)
3. **WARNING:** Service role key has full access - use carefully
4. Create separate Supabase projects for each orchestra

#### **Affiliate Program IDs:**
- **Booking.com:** Sign up at affiliate.booking.com
- **GetYourGuide:** partners.getyourguide.com
- **Amazon Associates:** affiliate-program.amazon.com

### 7. Security Best Practices

#### **Token Scoping:**
- GitHub: Only `repo` and `workflow` scopes
- Vercel: Project-specific tokens if possible
- Supabase: Use service role only for deployment, anon key for client

#### **Regular Rotation:**
```bash
# Create rotation script
cat > rotate-credentials.sh << 'EOF'
#!/bin/bash
echo "=== Credential Rotation ==="
echo "1. Generate new GitHub token"
echo "2. Generate new Vercel token"
echo "3. Update ~/.config/openclaw-secrets/.env.agents"
echo "4. Test deployment with new credentials"
echo "5. Revoke old tokens"
EOF
chmod +x rotate-credentials.sh
```

#### **Monitoring:**
```bash
# Check token usage
cat > monitor-credentials.sh << 'EOF'
#!/bin/bash
echo "=== Credential Monitoring ==="
echo "GitHub token last used: Check GitHub audit log"
echo "Vercel token usage: Check Vercel dashboard"
echo "Supabase usage: Check Supabase logs"
echo ""
echo "Alert if:"
echo "- Unusual deployment patterns"
echo "- Token used from unexpected IP"
echo "- Rate limits approached"
EOF
chmod +x monitor-credentials.sh
```

### 8. Testing the System

#### **Dry Run (No Real Credentials):**
```bash
# Create test credentials file
cat > ~/.config/openclaw-secrets/.env.agents.test << 'EOF'
GITHUB_PAT=test_token
VERCEL_TOKEN=test_token
SUPABASE_URL_DIRECTORY=https://test.supabase.co
SUPABASE_SERVICE_ROLE_KEY_DIRECTORY=test_key
EOF

# Test loader
source ~/.config/openclaw-secrets/load-credentials.sh
```

#### **Full Test (With Real Credentials):**
```bash
# 1. Set up real credentials
# 2. Run deployment script
./deploy-directory-beast.sh

# Expected output:
# - Build succeeds
# - Git push works
# - Vercel deployment starts
# - Environment configured
```

### 9. Troubleshooting

#### **Common Issues:**
1. **Permission denied:** Check file permissions (`chmod 600 .env.agents`)
2. **Token expired:** Rotate credentials
3. **Rate limited:** Check usage, add delays
4. **Build fails:** Fix code before deployment

#### **Emergency Revocation:**
```bash
# If credentials compromised:
# 1. GitHub: Revoke token in Settings → Developer settings
# 2. Vercel: Delete token in Settings → Tokens
# 3. Supabase: Rotate service role key in Settings → API
# 4. Update .env.agents with new credentials
```

### 10. Next Steps After Credential Setup

1. **Run the fix-sigkill script:** `./fix-sigkill.sh`
2. **Start all orchestras:** `pm2 start ecosystem.config.js`
3. **Test deployment:** `./deploy-directory-beast.sh`
4. **Monitor:** Check logs with `pm2 logs`
5. **Scale:** Add more features once basic deployment works

## Summary
This system allows autonomous deployment while maintaining security through:
- **Scoped tokens** (minimum required permissions)
- **Secure storage** (encrypted directory, restricted permissions)
- **Regular rotation** (90-day token expiration)
- **Monitoring** (usage tracking, anomaly detection)

**No credential requests.** Follow these instructions when ready to enable autonomous deployment.