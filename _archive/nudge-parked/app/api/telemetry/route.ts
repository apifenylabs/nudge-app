import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

const TELEMETRY_KEY = 'ecosystem-telemetry-2026';
const SITE_NAME = 'nudge';
const LOG_DIR = '/tmp/telemetry-logs';

export async function POST(req: NextRequest) {
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
