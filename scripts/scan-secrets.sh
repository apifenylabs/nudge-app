#!/bin/bash
# Scan for secrets in staged files (pre-commit mode) or in specified paths
# Usage: scan-secrets.sh [--pre-commit | file1 file2 ...]

RED='\033[0;31m'
NC='\033[0m'
SECRET_PATTERNS=(
    'sk-[a-zA-Z0-9]{20,}'           # OpenAI/DeepSeek-style keys
    'sk-proj-[a-zA-Z0-9]{20,}'      # OpenAI project keys
    'ghp_[a-zA-Z0-9]{36,}'          # GitHub PAT
    'gho_[a-zA-Z0-9]{36,}'          # GitHub OAuth
    'ghu_[a-zA-Z0-9]{36,}'          # GitHub user token
    'ghs_[a-zA-Z0-9]{36,}'          # GitHub server-to-server
    'ghr_[a-zA-Z0-9]{36,}'          # GitHub refresh
    'xox[baprs]-[a-zA-Z0-9-]{10,}'  # Slack tokens
    'AIzaSy[a-zA-Z0-9_-]{20,}'      # Google API keys
    'sk-ant-[a-zA-Z0-9]{20,}'       # Anthropic keys
    'sk-bd3[a-zA-Z0-9]{30,}'        # Old DeepSeek leak
    'sk-edd[a-zA-Z0-9]{30,}'        # Current DeepSeek key
    'SUPABASE_KEY_SECRET'             # Generic supabase key ref
    'eyJhbG[a-zA-Z0-9_-]{20,}'      # JWT tokens (supabase style)
)

BLOCKED=false

if [ "$1" = "--pre-commit" ]; then
    # Scan staged files
    STAGED=$(git diff --cached --name-only --diff-filter=ACM)
    if [ -z "$STAGED" ]; then
        exit 0
    fi
    TARGETS=$(echo "$STAGED" | xargs -I{} sh -c 'test -f "{}" && echo "{}"')
else
    TARGETS="$@"
fi

for pattern in "${SECRET_PATTERNS[@]}"; do
    MATCHES=""
    if [ "$1" = "--pre-commit" ]; then
        MATCHES=$(git diff --cached -- "$TARGETS" 2>/dev/null | grep -E "$pattern" | grep -v '^[+-]' | grep -v '^index ' || true)
    else
        MATCHES=$(grep -rn "$pattern" $TARGETS 2>/dev/null | grep -v node_modules | grep -v '.git/' || true)
    fi
    
    if [ -n "$MATCHES" ]; then
        echo -e "${RED}⚠️  SECRET DETECTED (pattern: $pattern)${NC}"
        echo "$MATCHES" | head -5
        BLOCKED=true
    fi
done

if [ "$BLOCKED" = true ]; then
    echo ""
    echo -e "${RED}❌ COMMIT BLOCKED: Secrets found in staged files.${NC}"
    echo "   Remove them or use 'git commit --no-verify' only if you're 100% sure."
    echo "   Remember: NEVER commit API keys, tokens, or passwords to git."
    exit 1
fi

exit 0
