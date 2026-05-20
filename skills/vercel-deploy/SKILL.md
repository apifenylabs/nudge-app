---
name: vercel-deploy
description: Standardized Vercel deployment pipeline for OpenClaw projects — full build, deploy, smoke-test, error-boundary checks, and rollback. Use for every deploy to prevent stale chunk errors and cold-start failures.
---

# Vercel Deploy Pipeline

Standardized build → deploy → verify → rollback flow for all projects.

## Pre-flight Checks

Before any deploy:

1. **Clean old builds**: `rm -rf .next .vercel/output`
2. **Full rebuild**: `npm run build` (not incremental — verify it passes)
3. **Check build output**: no errors, all pages listed
4. **If old `.vercel/output` exists**: delete it — stale chunks from prior builds cause deploy failures

## Deploy

```bash
# Build for Vercel
npx vercel build --prod

# Deploy prebuilt
npx vercel --prod --prebuilt
```

## Smoke Test

After deploy:
```bash
# Warm and verify static pages
for path in "" "/blog" "/routes" "/search"; do
  curl -s -o /dev/null -w "%{http_code} $path\n" "https://$VERCEL_URL$path"
done
```

All should return `200`.

## Error Boundary Installation

Every app needs these to prevent "Application error" blank screens:

- `app/error.tsx` — page-level client error boundary
- `app/global-error.tsx` — root-level error boundary

Template:
```tsx
'use client';
export default function Error({error, reset}: {error: Error; reset: () => void}) {
  // Friendly fallback + reset button
}
```

## Common Failures

| Symptom | Cause | Fix |
|---|---|---|
| `File does not exist: "chunks/4.js"` | Stale `.vercel/output` | `rm -rf .vercel/output` then rebuild |
| `Application error: client-side exception` | No error boundary + cold start | Add `error.tsx`, warm pages with curl |
| 504 on first load | Free-tier cold start | Pre-warm with curl post-deploy |
| Build OOM (e.g. 1125 station pages) | Too many static params | Reduce `generateStaticParams` to 50, use ISR for rest |

## Rollback

```bash
npx vercel list
npx vercel rollback <deployment-url>
```
