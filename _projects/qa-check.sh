#!/usr/bin/env bash
# Pre-deploy QA check — scans for invisible text patterns
set -e

SITE="$1"
if [ -z "$SITE" ]; then
  echo "Usage: $0 <site-project-dir>"
  echo "Example: $0 _projects/family-travel-directory"
  exit 1
fi

echo "=== QA Check: $SITE ==="

# Track failures
FAIL=0

# Check 1: text-white on light backgrounds (no dark: equivalent)
echo ""
echo "--- Check 1: text-white on light backgrounds ---"
TEXT_WHITE_COUNT=$(grep -rn "text-white" "$SITE/app" "$SITE/components" --include="*.tsx" 2>/dev/null | grep -v "dark:" | grep -v "dark:" | wc -l)
echo "Found $TEXT_WHITE_COUNT text-white occurrences without dark: variant"
# Show the sample with context
grep -rn "text-white" "$SITE/app" "$SITE/components" --include="*.tsx" 2>/dev/null | grep -v "dark:" | head -15

# Check 2: text-gray-500/400 on white backgrounds
echo ""
echo "--- Check 2: text-gray-400/500 (likely too light on white bg) ---"
GRAY_COUNT=$(grep -rn "text-gray-4\|text-gray-5" "$SITE/app" "$SITE/components" --include="*.tsx" 2>/dev/null | grep -v "dark:" | grep -v ".d." | wc -l)
echo "Found $GRAY_COUNT text-gray-400/500 occurrences without dark: variant"
grep -rn "text-gray-4\|text-gray-5" "$SITE/app" "$SITE/components" --include="*.tsx" 2>/dev/null | grep -v "dark:" | head -15

# Check 3: Brand colors consistency (no green on family travel)
if [[ "$SITE" == *"family-travel"* ]]; then
  echo ""
  echo "--- Check 3: Green colors on family travel (should be purple) ---"
  GREEN_COUNT=$(grep -rn "#4A6B4E\|#5A7D5E\|#2F4732\|#3D5A41" "$SITE" --include="*.css" --include="*.tsx" 2>/dev/null | grep -v node_modules | wc -l)
  if [ "$GREEN_COUNT" -gt 0 ]; then
    echo "❌ FAIL: $GREEN_COUNT green color references found (should be purple)"
    grep -rn "#4A6B4E\|#5A7D5E\|#2F4732\|#3D5A41" "$SITE" --include="*.css" --include="*.tsx" 2>/dev/null | grep -v node_modules | head -10
    FAIL=1
  else
    echo "✅ PASS: No green brand colors detected"
  fi
fi

# Check 4: Cross-site link colors (should be purple, not green)
echo ""
echo "--- Check 4: Cross-site link colors ---"
GREEN_LINKS=$(grep -rn "cross-site-link" "$SITE" --include="*.css" --include="*.tsx" 2>/dev/null | grep -i "green\|#16a34a\|#15803d\|#166534\|#14532d\|#f0fdf4\|#dcfce7\|#bbf7d0\|#86efac" | grep -v node_modules | wc -l)
if [ "$GREEN_LINKS" -gt 0 ]; then
  echo "❌ FAIL: $GREEN_LINKS green cross-site link references"
  FAIL=1
else
  echo "✅ PASS: No green cross-site links"
fi

# Check 5: Travelpayouts pixel uses dangerouslySetInnerHTML
echo ""
echo "--- Check 5: Travelpayouts pixel ---"
LAYOUT="$SITE/app/layout.tsx"
if [ -f "$LAYOUT" ]; then
  if grep -q "nowprocket\|tp\.tlv" "$LAYOUT" 2>/dev/null; then
    echo "✅ PASS: Travelpayouts pixel found"
    if grep -q "dangerouslySetInnerHTML" "$LAYOUT" 2>/dev/null; then
      echo "✅ PASS: Uses dangerouslySetInnerHTML (not JSX)"
    else
      echo "❌ FAIL: Pixel may be using JSX props instead of dangerouslySetInnerHTML"
      FAIL=1
    fi
  else
    echo "⚠️  WARN: Travelpayouts pixel not found in layout"
  fi
fi

# Summary
echo ""
echo "=== QA Result ==="
if [ "$FAIL" -eq 0 ]; then
  echo "✅ ALL CHECKS PASSED — safe to deploy"
else
  echo "❌ $FAIL CHECK(S) FAILED — fix before deploying"
fi

exit $FAIL
