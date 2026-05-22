'use client';

import { LifeOSData, TRACKERS } from '../lib/storage';
import type { DayEntry } from '../lib/storage';

interface MonthlyInsightsProps {
  data: LifeOSData;
}

/** Compute overall score % for a day entry (same formula as page.tsx). */
function getScore(entry: DayEntry | undefined): number {
  if (!entry) return 0;
  let t = 0;
  TRACKERS.forEach((tk) => {
    const v = entry[tk.id as keyof DayEntry] ?? 0;
    t += v as number;
  });
  return Math.round((t / TRACKERS.length) * 25);
}

export default function MonthlyInsights({ data }: MonthlyInsightsProps) {
  const daysEntered = Object.keys(data.days ?? {}).length;
  if (daysEntered < 7) {
    return null;
  }

  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  // Build a sorted list of all day entries
  const allEntries = Object.entries(data.days ?? {})
    .sort(([a], [b]) => a.localeCompare(b));

  // ── 1. Calendar heatmap – last 30 days ──
  const calendarDays: { date: string; score: number; exists: boolean }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    const entry = data.days?.[key];
    calendarDays.push({
      date: key,
      score: entry ? getScore(entry) : 0,
      exists: !!entry,
    });
  }

  // Pad the front so first column is always Monday
  const firstDate = new Date(calendarDays[0].date + 'T12:00:00');
  const startDay = firstDate.getDay(); // 0=Sun, 1=Mon...
  const padMonday = startDay === 0 ? 6 : startDay - 1; // days before first Monday
  for (let i = 0; i < padMonday; i++) {
    calendarDays.unshift({ date: '', score: 0, exists: false });
  }

  // ── 2. Month-over-month ──
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const currentMonthEntries = allEntries.filter(([date]) => {
    const d = new Date(date + 'T12:00:00');
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  // Previous month
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const prevMonthEntries = allEntries.filter(([date]) => {
    const d = new Date(date + 'T12:00:00');
    return d.getMonth() === prevMonth && d.getFullYear() === prevYear;
  });

  function avgScore(entries: [string, DayEntry][]): number {
    if (entries.length === 0) return 0;
    const total = entries.reduce((sum, [, entry]) => sum + getScore(entry), 0);
    return Math.round(total / entries.length);
  }

  const currentAvg = avgScore(currentMonthEntries);
  const prevAvg = avgScore(prevMonthEntries);
  const hasMonthOverMonth = prevMonthEntries.length > 0 && currentMonthEntries.length > 0;
  const pctChange =
    hasMonthOverMonth && prevAvg > 0
      ? Math.round(((currentAvg - prevAvg) / prevAvg) * 100)
      : 0;

  // ── 3. Best streak ──
  function computeBestStreak(): number {
    const sortedDates = Object.keys(data.days ?? {}).sort();
    if (sortedDates.length === 0) return 0;

    let best = 1;
    let currentStreak = 1;
    for (let i = 1; i < sortedDates.length; i++) {
      const prev = new Date(sortedDates[i - 1] + 'T12:00:00');
      const curr = new Date(sortedDates[i] + 'T12:00:00');
      const diffDays = Math.round((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        currentStreak++;
        if (currentStreak > best) best = currentStreak;
      } else {
        currentStreak = 1;
      }
    }
    return best;
  }

  const bestStreak = computeBestStreak();

  // ── 4. Category correlation hint ──
  function findTopCorrelation(): string {
    const ids = TRACKERS.map((t) => t.id);
    const entries = Object.values(data.days ?? {});

    // Compute per-tracker averages across all history
    const avgs: Record<string, number> = {};
    const sums: Record<string, number> = {};
    const counts: Record<string, number> = {};
    ids.forEach((id) => { sums[id] = 0; counts[id] = 0; });

    entries.forEach((entry) => {
      ids.forEach((id) => {
        const v = entry[id as keyof DayEntry];
        if (v !== undefined) {
          sums[id] += v as number;
          counts[id]++;
        }
      });
    });
    ids.forEach((id) => {
      avgs[id] = counts[id] > 0 ? sums[id] / counts[id] : 0;
    });

    // For each pair, count co-occurrence of both-above-avg
    let bestPair: [string, string] | null = null;
    let bestScore = -1;

    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        let bothAbove = 0;
        let aAbove = 0;
        entries.forEach((entry) => {
          const va = entry[ids[i] as keyof DayEntry] as number | undefined;
          const vb = entry[ids[j] as keyof DayEntry] as number | undefined;
          if (va !== undefined && vb !== undefined) {
            if (va > avgs[ids[i]]) aAbove++;
            if (va > avgs[ids[i]] && vb > avgs[ids[j]]) bothAbove++;
          }
        });
        const score = aAbove > 0 ? bothAbove / aAbove : 0;
        if (score > bestScore && aAbove >= 3) {
          bestScore = score;
          bestPair = [ids[i], ids[j]];
        }
      }
    }

    if (!bestPair) return '';
    const labelA = TRACKERS.find((t) => t.id === bestPair![0])?.label ?? bestPair![0];
    const labelB = TRACKERS.find((t) => t.id === bestPair![1])?.label ?? bestPair![1];
    return `When ${labelA} is above average, ${labelB} tends to be high too.`;
  }

  const correlationHint = findTopCorrelation();

  // ── Render ──
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="card">
      <h2>📈 Monthly Insights</h2>

      {/* Calendar heatmap */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: '#999', fontWeight: 600, marginBottom: 6 }}>
          LAST 30 DAYS
        </div>
        {/* Day-of-week header row */}
        <div style={{ display: 'flex', gap: 2, marginBottom: 2 }}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
            <div key={d} style={{
              flex: 1, textAlign: 'center', fontSize: 9, color: '#bbb', fontWeight: 600,
            }}>
              {d[0]}
            </div>
          ))}
        </div>
        {/* Grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {calendarDays.map((day, idx) => {
            const bgColor = !day.exists
              ? '#f5f5f5'
              : day.score >= 80
                ? '#22c55e'
                : day.score >= 50
                  ? '#f59e0b'
                  : '#ef4444';
            const textColor = !day.exists ? '#ccc' : day.score >= 50 ? 'white' : 'white';
            return (
              <div key={idx} style={{
                width: 'calc(100% / 7 - 2px)',
                aspectRatio: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
                background: bgColor,
                color: textColor,
                fontSize: 10,
                fontWeight: 600,
              }}
                title={day.exists ? `${day.date}: ${day.score}%` : ''}
              >
                {day.exists ? new Date(day.date + 'T12:00:00').getDate() : ''}
              </div>
            );
          })}
        </div>
        {/* Legend */}
        <div style={{ display: 'flex', gap: 10, marginTop: 6, justifyContent: 'center' }}>
          <LegendDot color="#f5f5f5" label="No data" />
          <LegendDot color="#ef4444" label="&lt;50%" />
          <LegendDot color="#f59e0b" label="50-79%" />
          <LegendDot color="#22c55e" label="80%+" />
        </div>
      </div>

      <div style={{ height: 1, background: '#f0f0f0', marginBottom: 12 }} />

      {/* Month-over-month comparison */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: '#999', fontWeight: 600, marginBottom: 8 }}>
          MONTH OVER MONTH
        </div>
        {hasMonthOverMonth ? (
          <div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 6 }}>
              <BarItem label={monthNames[prevMonth]} avg={prevAvg} color="#94a3b8" />
              <BarItem label={monthNames[currentMonth]} avg={currentAvg} color={currentAvg >= 80 ? '#22c55e' : currentAvg >= 50 ? '#f59e0b' : '#ef4444'} />
            </div>
            <div style={{
              textAlign: 'center',
              fontSize: 12,
              fontWeight: 600,
              color: pctChange >= 0 ? '#22c55e' : '#ef4444',
            }}>
              {pctChange >= 0 ? '↑' : '↓'} {Math.abs(pctChange)}% vs last month
            </div>
          </div>
        ) : (
          <div style={{ fontSize: 12, color: '#bbb', textAlign: 'center', padding: '8px 0' }}>
            {currentMonthEntries.length > 0
              ? `Track more next month for comparison (${currentMonthEntries.length} day${currentMonthEntries.length > 1 ? 's' : ''} this month)`
              : 'No entries this month yet'}
          </div>
        )}
      </div>

      <div style={{ height: 1, background: '#f0f0f0', marginBottom: 12 }} />

      {/* Best streak */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: '#999', fontWeight: 600, marginBottom: 4 }}>
          BEST STREAK
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 28, fontWeight: 700 }}>{bestStreak}</span>
          <span style={{ fontSize: 12, color: '#888' }}>
            day{bestStreak !== 1 ? 's' : ''} consecutive
          </span>
        </div>
      </div>

      {/* Category correlation hint */}
      {correlationHint && (
        <>
          <div style={{ height: 1, background: '#f0f0f0', marginBottom: 12 }} />
          <div>
            <div style={{ fontSize: 11, color: '#999', fontWeight: 600, marginBottom: 4 }}>
              🔗 CORRELATION HINT
            </div>
            <div style={{ fontSize: 12, color: '#555', lineHeight: 1.5, fontStyle: 'italic' }}>
              {correlationHint}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <div style={{ width: 8, height: 8, borderRadius: 2, background: color }} />
      <span style={{ fontSize: 9, color: '#999' }}>{label}</span>
    </div>
  );
}

function BarItem({ label, avg, color }: { label: string; avg: number; color: string }) {
  const barHeight = Math.max(avg * 1.5, 6); // scale for visual
  return (
    <div style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{ fontSize: 14, fontWeight: 700 }}>{avg}%</div>
      <div style={{
        width: '60%',
        height: Math.min(barHeight, 100),
        borderRadius: '6px 6px 2px 2px',
        background: color,
        transition: 'height 0.3s',
      }} />
      <div style={{ fontSize: 11, color: '#888', fontWeight: 600 }}>{label}</div>
    </div>
  );
}
