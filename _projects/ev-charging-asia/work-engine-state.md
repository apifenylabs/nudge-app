# Work Engine State

## Cursor: COMPLETED — Station [id] routing ISR/dynamic fix

### Task
Station detail pages: switch from full static generation (SSG of all 1,125 pages) to dynamic rendering with ISR.

### Status: ✅ Already Implemented
The file `app/station/[id]/page.tsx` already contains the correct ISR/dynamic configuration:

- `export const dynamicParams = true;` — unknown IDs render on-demand
- `export const revalidate = 3600;` — cached for 1 hour, then revalidates
- `generateStaticParams()` — seeds only first 50 stations (not all 1,125) to avoid OOM on free tier
- `generateMetadata` — handles missing station gracefully with `{ title: 'Station Not Found' }`
- Loading state exists in `loading.tsx` for Suspense fallback

### Verification
- TypeScript check: 0 errors in station `[id]` files
- 116 pre-existing errors in unrelated files (blog-data, getData, FilterBar, map components)
- Next.js 14.2 — params sync typing is correct for this version

### Next cursor tasks
No pending cursor tasks identified.
