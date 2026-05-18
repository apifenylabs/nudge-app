# Beast Log

## 2026-05-18 — Data Moat Infrastructure

### What was built
**Ecosystem-wide usage telemetry for all 7 sites.** Consent-gated, file-based, no shared DB.

### Files created

**Shared library:** `_projects/shared/telemetry/`
- `index.ts` — `EcosystemTelemetry` singleton (batching up to 10 events / 5s idle, 3 retry exponential backoff, consent-gated, site auto-detection via hostname, SPA navigation tracking)
- `component.tsx` — `EcosystemToggle` React component (localStorage opt-in toggle, positioned bottom-right, links to privacy)
- `README.md` — integration docs

**Per-site files (created for all 7 sites):**
- `app/api/telemetry/route.ts` — POST endpoint, validates key, writes JSONL to `/tmp/telemetry-logs/<site>/YYYY-MM-DD.jsonl`
- `app/api/telemetry/stats/route.ts` — GET endpoint, reads logs, returns aggregated stats (active users, events by site, top events, conversion paths)
- `lib/telemetry.ts` — site-specific copy of shared lib (siteName hardcoded per site)
- `components/EcosystemToggle.tsx` — opt-in/out toggle
- `components/TelemetryInit.tsx` — client-side telemetry initializer (handles SPA navigation)

**Layout modifications (all 7 sites):**
- Added `dynamic` import for `EcosystemToggle` and `TelemetryInit` (ssr: false)
- Added `<EcosystemToggle />` and `<TelemetryInit />` before `<Analytics />` in each body

**Privacy page updates (all 7 sites):**
- Added "Usage Data & Ecosystem Improvement" section describing optional telemetry, consent requirement, and data collected
- Created privacy page for **nudge** (didn't have one)

### Sites handled

| Site | Status | Notes |
|------|--------|-------|
| ev-charging-asia | ✅ Built & tested | Primary test target, build passes |
| family-travel-directory | ✅ All files | Privacy updated |
| luxury-family-travel | ✅ All files | Privacy updated |
| kids-activities-asia | ✅ All files | Privacy updated. Pre-existing TS errors (MapWithFilters) |
| senior-friendly-travel-asia | ✅ All files | Privacy updated |
| apifeny-ai | ✅ All files | Privacy updated |
| nudge | ✅ All files | Privacy page created from scratch. Layout imports restored |

### Architecture
- **Consent-first**: localStorage key `ecosystem_telemetry_consent`. Nothing tracked unless user opts in
- **Batching**: Buffer up to 10 events or 5s idle before sending
- **Retry**: 3 retries with 1s/2s/4s exponential backoff
- **Independent**: Each site writes to its own JSONL files at `/tmp/telemetry-logs/<site>/YYYY-MM-DD.jsonl`
- **Shared key**: `x-telemetry-key: ecosystem-telemetry-2026`
- **No single point of failure**: Each site operates autonomously

### Dashboard
`GET /api/telemetry/stats` (requires x-telemetry-key header) returns:
- `sites[]` — all sites with log data
- `activeUsers.{today, thisWeek}` — unique session counts
- `eventsBySite` — total event counts per site
- `topEvents[].{event, count}` — top 20 events
- `conversionPaths` — event sequence pairs (e.g., `page_view->affiliate_click`)
