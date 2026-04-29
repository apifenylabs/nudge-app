# DEBUG_CHECKLIST.md — Production Firefighting

## When a site goes down or shows client errors

### Step 1: Check Server Response
```bash
curl -sI https://site.com | head -5
```
If 200, the server is fine — it's a client-side JS error.

### Step 2: Check Vercel Build Status
```bash
cd project-dir && npx vercel list --scope team-name
```
Look for `● Error` deployments. If the latest is `● Ready` but the site is broken, it's a runtime issue, not a build issue.

### Step 3: Check Vercel Build Log First (not local)
```bash
npx vercel inspect --scope team-name | tail -30
```
If Vercel build fails but local build passes → environment mismatch. Check env vars.

### Step 4: Check Environment Variables on Vercel
```bash
npx vercel env list --scope team-name
```
**This is the #1 overlooked issue.** If `.env.local` has vars but Vercel doesn't, the build will fail or produce broken JS. Common missing vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

### Step 5: Check for Incomplete Feature Files
When a sub-agent creates Phase N of a feature but files from Phase N+1 are partially created:
- `app/search/page.tsx` exists but imports missing `_client.tsx`
- `_client.tsx` exists but references components with changed interfaces
- Fix: `find /app -name "page.tsx" | xargs grep "from './_client'"` and check each `_client.tsx` exists

### Step 6: Check for ESM/CJS Mismatch in Browser Code
```bash
grep -rn "require" lib/ components/ --include="*.ts" --include="*.tsx"
```
If `require()` appears in browser-facing code, it will throw `ReferenceError: require is not defined`. Fix: use `import` (ESM) instead. Common culprit: `@supabase/ssr` which is ESM-only. Use `@supabase/supabase-js` for browser.

### Step 7: Check Mock/Noop Proxy Shapes
If using a noop proxy for server-side rendering, ensure all destructured properties return valid objects:
```typescript
// WRONG — crashes on `{ data: { subscription } }`
return () => Promise.resolve({ data: null, error: null });
// RIGHT
return () => Promise.resolve({ data: {}, error: null });
```

### Step 8: Local Dev Server for Browser Errors
```bash
cd project-dir && npx next dev -p 3456
```
Open Chrome DevTools → Console. Catch the real error. Check for:
- `require is not defined`
- `Cannot destructure property 'X' of 'Y'`
- `Module not found: Can't resolve './_client'`
- Network tab: 404 on chunk files

### Step 9: Full Local Clean Build (matches Vercel)
```bash
rm -rf .next && npm run build
```
Vercel runs `npm run build` from scratch — no cached `.next/`. If local builds with cache but fails clean, you'll miss Vercel errors.

### Step 10: Deploy and Verify Chunks
After deploying:
```bash
curl -s https://site.com/ | grep -oP 'buildId[^,]*' | head -1
curl -s https://site.com/ | grep -oP 'chunks/app/page-[^"]+' | sort -u
```
Old chunks mean old deploy is still serving. Hard refresh or wait for CDN purge.

---

## Prevention Rules to Add to CODE_REVIEW.md

1. **Browser code never uses `require()`** — always `import`. `@supabase/ssr` is server-only.
2. **Every new route must have a complete `page.tsx` + `_client.tsx` pair** — no half-baked routes.
3. **All env vars must be added to Vercel before or immediately after first deploy** — not just `.env.local`.
4. **Mock/noop proxies must return destructureable shapes** — no `null` where code expects an object.
5. **`npm run build` must pass with `rm -rf .next` first** — cached builds hide errors.
