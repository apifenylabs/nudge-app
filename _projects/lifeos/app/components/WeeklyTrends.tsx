'use client';

import { LifeOSData, TRACKERS, getTrackerLabel } from '../lib/storage';
import type { DayEntry } from '../lib/storage';

interface WeeklyTrendsProps {
  data: LifeOSData;
}

interface TrackerStat {
  id: string;
  label: string;
  avg: number;
  best: number;
  worst: number;
  variance: number;
  trend: 'up' | 'down' | 'flat';
}

function computeStats(data: LifeOSData): {
  trackerStats: TrackerStat[];
  weeklyAvg: number;
  bestDay: { date: string; score: number } | null;
  worstDay: { date: string; score: number } | null;
  dayOfWeekBreakdown: Record<string, { total: number; count: number }>;
} {
  const days = Object.entries(data.days ?? {})
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-28); // last 28 days for meaningful stats

  // Per-tracker stats for last 7 days
  const last7 = days.slice(-7);
  const trackerSums: Record<string, number[]> = {};
  TRACKERS.forEach((tk) => {
    trackerSums[tk.id] = [];
  });

  last7.forEach(([, entry]) => {
    TRACKERS.forEach((tk) => {
      const v = (entry as DayEntry)[tk.id as keyof DayEntry] ?? tk.def;
      trackerSums[tk.id].push(v as number);
    });
  });

  const trackerStats: TrackerStat[] = TRACKERS.map((tk) => {
    const vals = trackerSums[tk.id];
    const avg = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    const best = vals.length > 0 ? Math.max(...vals) : 0;
    const worst = vals.length > 0 ? Math.min(...vals) : 0;
    const variance =
      vals.length > 1
        ? Math.sqrt(vals.reduce((acc, v) => acc + (v - avg) ** 2, 0) / vals.length)
        : 0;

    // Trend: compare last 3 days vs 3 before that
    let trend: 'up' | 'down' | 'flat' = 'flat';
    if (vals.length >= 6) {
      const recent3 = vals.slice(-3).reduce((a, b) => a + b, 0) / 3;
      const prior3 = vals.slice(-6, -3).reduce((a, b) => a + b, 0) / 3;
      if (recent3 > prior3 + 0.2) trend = 'up';
      else if (recent3 < prior3 - 0.2) trend = 'down';
    }

    return { id: tk.id, label: tk.label, avg: Math.round(avg * 10) / 10, best, worst, variance: Math.round(variance * 10) / 10, trend };
  });

  // Weekly average score
  const scores = last7.map(([, entry]) => {
    let t = 0;
    TRACKERS.forEach((tk) => {
      const v = (entry as DayEntry)[tk.id as keyof DayEntry] ?? tk.def;
      t += v as number;
    });
    return Math.round((t / TRACKERS.length) * 25);
  });
  const weeklyAvg = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  // Best/worst day in last 28 days
  const allScores = days.map(([date, entry]) => {
    let t = 0;
    TRACKERS.forEach((tk) => {
      const v = (entry as DayEntry)[tk.id as keyof DayEntry] ?? tk.def;
      t += v as number;
    });
    return { date, score: Math.round((t / TRACKERS.length) * 25) };
  });
  const bestDay = allScores.length > 0 ? allScores.reduce((a, b) => (a.score > b.score ? a : b)) : null;
  const worstDay = allScores.length > 0 ? allScores.reduce((a, b) => (a.score < b.score ? a : b)) : null;

  // Day-of-week breakdown
  const dayOfWeekBreakdown: Record<string, { total: number; count: number }> = {};
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dayNames.forEach((n) => { dayOfWeekBreakdown[n] = { total: 0, count: 0 }; });

  days.forEach(([date, entry]) => {
    const d = new Date(date + 'T12:00:00');
    const dayName = dayNames[d.getDay()];
    let t = 0;
    TRACKERS.forEach((tk) => {
      const v = (entry as DayEntry)[tk.id as keyof DayEntry] ?? tk.def;
      t += v as number;
    });
    const score = Math.round((t / TRACKERS.length) * 25);
    dayOfWeekBreakdown[dayName].total += score;
    dayOfWeekBreakdown[dayName].count += 1;
  });

  return { trackerStats, weeklyAvg, bestDay, worstDay, dayOfWeekBreakdown };
}

export default function WeeklyTrends({ data }: WeeklyTrendsProps) {
  const { trackerStats, weeklyAvg, bestDay, worstDay, dayOfWeekBreakdown } = computeStats(data);
  const daysEntered = Object.keys(data.days ?? {}).length;

  if (daysEntered < 2) {
    return (
      <div className="card">
        <h2>📊 Weekly Trends</h2>
        <div className="empty" style={{ padding: '20px 0' }}>
          Track at least 2 days to see trends and insights.
        </div>
      </div>
    );
  }

  const dayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="card">
      <h2>📊 Weekly Trends</h2>

      {/* Overall weekly average */}
      <div style={{
        textAlign: 'center',
        padding: '16px 0',
        borderBottom: '1px solid #f0f0f0',
        marginBottom: 12,
      }}>
        <div style={{ fontSize: 11, color: '#999', marginBottom: 4 }}>7-DAY AVERAGE</div>
        <div style={{
          fontSize: 36,
          fontWeight: 700,
          color: weeklyAvg >= 80 ? '#22c55e' : weeklyAvg >= 50 ? '#f59e0b' : '#ef4444',
        }}>
          {weeklyAvg}%
        </div>
      </div>

      {/* Best / Worst day */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
        {bestDay && (
          <div style={{ flex: 1, background: '#f0fdf4', borderRadius: 10, padding: '8px 10px' }}>
            <div style={{ fontSize: 10, color: '#16a34a', fontWeight: 600 }}>BEST DAY</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#15803d', marginTop: 2 }}>
              {bestDay.score}%
            </div>
            <div style={{ fontSize: 10, color: '#666' }}>
              {new Date(bestDay.date + 'T12:00:00').toLocaleDateString('en-US', {
                weekday: 'short', month: 'short', day: 'numeric',
              })}
            </div>
          </div>
        )}
        {worstDay && (
          <div style={{ flex: 1, background: '#fef2f2', borderRadius: 10, padding: '8px 10px' }}>
            <div style={{ fontSize: 10, color: '#dc2626', fontWeight: 600 }}>WORST DAY</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#b91c1c', marginTop: 2 }}>
              {worstDay.score}%
            </div>
            <div style={{ fontSize: 10, color: '#666' }}>
              {new Date(worstDay.date + 'T12:00:00').toLocaleDateString('en-US', {
                weekday: 'short', month: 'short', day: 'numeric',
              })}
            </div>
          </div>
        )}
      </div>

      {/* Day of week heatmap */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: '#999', fontWeight: 600, marginBottom: 6 }}>BY DAY OF WEEK</div>
        <div style={{ display: 'flex', gap: 4 }}>
          {dayOrder.map((dayName) => {
            const bd = dayOfWeekBreakdown[dayName];
            const avg = bd && bd.count > 0 ? Math.round(bd.total / bd.count) : 0;
            const intensity = avg >= 80 ? 'high' : avg >= 50 ? 'mid' : avg > 0 ? 'low' : 'none';
            const bgColors: Record<string, string> = {
              high: '#22c55e',
              mid: '#f59e0b',
              low: '#fde68a',
              none: '#f5f5f5',
            };
            const textColors: Record<string, string> = {
              high: 'white',
              mid: 'white',
              low: '#92400e',
              none: '#ccc',
            };
            return (
              <div
                key={dayName}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '8px 2px',
                  borderRadius: 8,
                  background: bgColors[intensity],
                  color: textColors[intensity],
                  fontSize: 11,
                  fontWeight: 600,
                }}
                title={`${dayName}: avg ${avg}% (${bd?.count ?? 0} days)`}
              >
                <div>{dayName.slice(0, 2)}</div>
                <div style={{ fontSize: 13, marginTop: 2 }}>{avg}{avg > 0 ? '%' : ''}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Per-tracker breakdown */}
      <div style={{ fontSize: 11, color: '#999', fontWeight: 600, marginBottom: 6 }}>PER-TRACKER (7 DAY AVG)</div>
      {trackerStats.map((ts) => {
        const maxVal = Math.max(...TRACKERS.filter(t => t.id === ts.id).flatMap(t => t.options.map(o => o.v)), 1);
        const pct = Math.round((ts.avg / maxVal) * 100);
        const barColor = pct >= 75 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#ef4444';
        const trendSymbol = ts.trend === 'up' ? '↑' : ts.trend === 'down' ? '↓' : '→';
        const trendColor = ts.trend === 'up' ? '#22c55e' : ts.trend === 'down' ? '#ef4444' : '#999';
        return (
          <div key={ts.id} style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <span style={{ fontSize: 12, fontWeight: 500 }}>{ts.label}</span>
              <span style={{ fontSize: 12, color: '#666' }}>
                {ts.avg} <span style={{ color: trendColor }}>{trendSymbol}</span>
              </span>
            </div>
            <div style={{ height: 6, background: '#eee', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${pct}%`,
                background: barColor,
                borderRadius: 3,
                transition: 'width 0.3s',
              }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
