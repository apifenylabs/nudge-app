# Ecosystem Telemetry — Data Moat

Shared usage-tracking layer for the 7-site ecosystem. Lightweight, consent-gated,
with batching, retry, and a drop-in toggle component.

## Files

| File | Purpose |
|------|---------|
| `index.ts` | Core library — singleton, batching, retry, consent, hook, wrapper |
| `component.tsx` | `EcosystemToggle` — opt-in/out toggle UI |

## Integration Steps (per site)

### 1. Copy the shared lib

```bash
# From the project root (e.g. _projects/ev-charging-asia/)
cp -r ../../shared/telemetry/index.ts lib/telemetry.ts
cp -r ../../shared/telemetry/component.tsx components/EcosystemToggle.tsx
```

Or symlink (works in local dev, not on Vercel):
```bash
ln -sf ../../shared/telemetry/index.ts lib/telemetry.ts
```

### 2. Create the collection API endpoint

`app/api/telemetry/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

const TELEMETRY_KEY = 'ecosystem-telemetry-2026';
const SITE_NAME = 'your-site-name'; // Change per site
const LOG_DIR = '/tmp/telemetry-logs';

export async function POST(req: NextRequest) {
  // Validate API key
  const key = req.headers.get('x-telemetry-key');
  if (key !== TELEMETRY_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { events } = body;

    if (!Array.isArray(events) || events.length === 0) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // Write to JSONL file
    const dateStr = new Date().toISOString().split('T')[0];
    const dir = path.join(LOG_DIR, SITE_NAME);
    const filePath = path.join(dir, `${dateStr}.jsonl`);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const lines = events.map((e: any) => {
      const sanitized = {
        event: String(e.event || '').slice(0, 128),
        data: e.data || {},
        timestamp: e.timestamp || new Date().toISOString(),
        site: String(e.site || SITE_NAME).slice(0, 64),
        sessionId: String(e.sessionId || 'unknown').slice(0, 64),
      };
      return JSON.stringify(sanitized);
    });

    fs.appendFileSync(filePath, lines.join('\n') + '\n', 'utf-8');

    return NextResponse.json({
      ok: true,
      count: events.length,
      site: SITE_NAME,
    });
  } catch (err) {
    console.error('[Telemetry API] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### 3. Create the stats endpoint

`app/api/telemetry/stats/route.ts` — See the shared template.

### 4. Add the toggle to `layout.tsx`

In the root layout, import and mount `EcosystemToggle`:

```tsx
// app/layout.tsx — add near the bottom, before </body>
import dynamic from 'next/dynamic';

const EcosystemToggle = dynamic(
  () => import('@/components/EcosystemToggle'),
  { ssr: false }
);

// In the layout body (after main content):
<EcosystemToggle />
```

### 5. Initialize telemetry on the client

In a client component or useEffect, call:

```tsx
useEffect(() => {
  const telemetry = EcosystemTelemetry.getInstance();
  telemetry.init('/api/telemetry');
  // Track first page view
  telemetry.track('page_view', { path: window.location.pathname });
}, []);
```

Or use the helper hook:
```tsx
import { EcosystemTelemetry, useEcosystemTelemetry, withTelemetry } from '@/lib/telemetry';
```

### 6. Update privacy page

Add a section to the privacy policy explaining the telemetry data moat,
user opt-in, and what data is collected.

## API Reference

### POST /api/telemetry
```json
{
  "events": [
    {
      "event": "affiliate_click",
      "data": { "destination": "booking.com" },
      "timestamp": "2026-05-18T00:00:00.000Z",
      "site": "ev-charging-asia",
      "sessionId": "abc-123"
    }
  ]
}
```
Headers: `x-telemetry-key: ecosystem-telemetry-2026`

### GET /api/telemetry/stats
Returns aggregated stats from log files.

## Architecture

- **Consent-first**: Nothing is tracked unless user opts in via toggle
- **Local-first**: Events buffer in memory, sent in batches of 10 or after 5s idle
- **Resilient**: 3 retries with exponential backoff, fails silently
- **File-based**: JSONL files in `/tmp/telemetry-logs/<site>/YYYY-MM-DD.jsonl`
- **Independent**: Each site works standalone, no shared DB or single point of failure
