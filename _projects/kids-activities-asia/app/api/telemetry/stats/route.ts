import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

const TELEMETRY_KEY = 'ecosystem-telemetry-2026';
const LOG_DIR = '/tmp/telemetry-logs';

interface LogEvent {
  event: string;
  data: Record<string, string | number | boolean>;
  timestamp: string;
  site: string;
  sessionId: string;
}

function getSites(dir: string): string[] {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory()).map((e) => e.name);
  } catch {
    return [];
  }
}

function parseLogFile(filePath: string): LogEvent[] {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line) as LogEvent;
        } catch {
          return null;
        }
      })
      .filter(Boolean) as LogEvent[];
  } catch {
    return [];
  }
}

function getDateNDaysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
}

export async function GET(req: NextRequest) {
  // Auth check (optional — for production dashboard)
  const key = req.headers.get('x-telemetry-key');
  const isAuthorized = key === TELEMETRY_KEY;

  // Only return detailed stats if authorized
  if (!isAuthorized) {
    return NextResponse.json({
      ok: true,
      message: 'Telemetry dashboard requires x-telemetry-key header',
    });
  }

  try {
    const sites = getSites(LOG_DIR);
    const today = new Date().toISOString().split('T')[0];
    const thisWeekStart = getDateNDaysAgo(6);

    // Collect events from all sites for today and this week
    const todayEvents: LogEvent[] = [];
    const weekEvents: LogEvent[] = [];
    const eventsBySite: Record<string, number> = {};
    const eventCounts: Record<string, number> = {};
    const conversionPaths: Record<string, number> = {};
    const uniqueSessionsToday = new Set<string>();
    const uniqueSessionsWeek = new Set<string>();

    for (const site of sites) {
      const siteDir = path.join(LOG_DIR, site);

      // Today's file
      const todayFile = path.join(siteDir, `${today}.jsonl`);
      const todayLogs = parseLogFile(todayFile);
      todayEvents.push(...todayLogs);

      // This week's files
      const allFiles = fs.readdirSync(siteDir).filter((f) => f.endsWith('.jsonl'));
      for (const file of allFiles) {
        const dateStr = file.replace('.jsonl', '');
        if (dateStr >= thisWeekStart && dateStr <= today) {
          const logs = parseLogFile(path.join(siteDir, file));
          weekEvents.push(...logs);
        }
      }

      // Count by site (all time available)
      const allSiteFiles = fs.readdirSync(siteDir).filter((f) => f.endsWith('.jsonl'));
      let siteCount = 0;
      for (const file of allSiteFiles) {
        const logs = parseLogFile(path.join(siteDir, file));
        siteCount += logs.length;
      }
      eventsBySite[site] = siteCount;
    }

    // Aggregate today stats
    for (const evt of todayEvents) {
      uniqueSessionsToday.add(evt.sessionId);
      eventCounts[evt.event] = (eventCounts[evt.event] || 0) + 1;
    }

    // Aggregate week stats
    for (const evt of weekEvents) {
      uniqueSessionsWeek.add(evt.sessionId);
    }

    // Calculate conversion paths from week events
    // Group by session, look for event sequences
    const sessionEvents: Record<string, LogEvent[]> = {};
    for (const evt of weekEvents) {
      if (!sessionEvents[evt.sessionId]) {
        sessionEvents[evt.sessionId] = [];
      }
      sessionEvents[evt.sessionId].push(evt);
    }

    for (const [, evts] of Object.entries(sessionEvents)) {
      evts.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      for (let i = 0; i < evts.length - 1; i++) {
        const pathStr = `${evts[i].event}->${evts[i + 1].event}`;
        conversionPaths[pathStr] = (conversionPaths[pathStr] || 0) + 1;
      }
    }

    // Top events sorted by count
    const topEvents = Object.entries(eventCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 20)
      .map(([event, count]) => ({ event, count }));

    // Top conversion paths
    const topPaths = Object.entries(conversionPaths)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 20)
      .reduce((acc, [key, count]) => {
        acc[key] = count;
        return acc;
      }, {} as Record<string, number>);

    return NextResponse.json({
      sites,
      activeUsers: {
        today: uniqueSessionsToday.size,
        thisWeek: uniqueSessionsWeek.size,
      },
      eventsBySite,
      topEvents,
      conversionPaths: topPaths,
    });
  } catch (err) {
    console.error('[Telemetry Stats API] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
