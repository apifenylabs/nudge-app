#!/bin/bash
# Post-deploy smoke test
URL="${1:-https://ev-charging-asia.vercel.app}"
FAIL=0

echo "=== Smoke Testing $URL ==="
for path in "" "/routes" "/blog" "/search" "/compare"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$URL$path" --connect-timeout 10 --max-time 15)
  if [ "$code" = "200" ]; then
    echo "  ✅ $code $path"
  else
    echo "  ❌ $code $path"
    FAIL=$((FAIL+1))
  fi
done

if [ "$FAIL" -gt 0 ]; then
  echo "FAILED: $FAIL endpoints returned non-200"
  exit 1
else
  echo "✅ All pages pass"
fi
