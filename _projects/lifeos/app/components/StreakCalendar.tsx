'use client';

/**
 * StreakCalendar — GitHub-style visual heatmap for habit tracking
 *
 * Renders a 52-week grid of colored squares showing habit completion
 * and mood levels, with streak counters baked in.
 *
 * Features:
 * - GitHub-style contribution grid (7 rows × 52 columns)
 * - Color intensity based on habit completion rate per day
 * - Optional mood overlay (color-coded mood score)
 * - Current/longest streak badges
 * - Hover tooltip with date and data details
 * - Month labels along the top
 */

import { useMemo, useState, useRef, useEffect } from 'react';
import {
  type MoodEntry,
  type HabitLog,
  type HabitDefinition,
  getMoodLog,
  getHabitLog,
  computeStreaks,
} from '@/app/lib/habit-mood-correlation';

// ─── Types ─────────────────────────────────────────────────────────

type ViewMode = 'habits' | 'mood';

interface StreakCalendarProps {
  habits: HabitDefinition[];
  onDateClick?: (date: string) => void;
}

interface DayCell {
  date: string;
  dayOfWeek: number; // 0=Sun, 1=Mon, ...
  monthLabel?: string;
  habitCount: number;
  habitTotal: number;
  habitRate: number; // 0-1
  moodValue?: number;
  isEmpty: boolean;
}

// ─── Color Scales ──────────────────────────────────────────────────

const HABIT_COLORS = [
  'bg-gray-100',                    // 0%
  'bg-emerald-200',                 // 1-25%
  'bg-emerald-300',                 // 26-50%
  'bg-emerald-400',                 // 51-75%
  'bg-emerald-500',                 // 76-99%
  'bg-emerald-600',                 // 100%
];

const MOOD_COLORS: Record<string, string> = {
  '1-3': 'bg-red-300',
  '4-5': 'bg-orange-300',
  '6-7': 'bg-amber-300',
  '8-9': 'bg-teal-300',
  '10': 'bg-emerald-400',
};

function getHabitColor(rate: number): string {
  if (rate >= 1) return HABIT_COLORS[5];
  if (rate >= 0.76) return HABIT_COLORS[4];
  if (rate >= 0.51) return HABIT_COLORS[3];
  if (rate >= 0.26) return HABIT_COLORS[2];
  if (rate > 0) return HABIT_COLORS[1];
  return HABIT_COLORS[0];
}

function getMoodColor(value: number): string {
  if (value >= 10) return MOOD_COLORS['10'];
  if (value >= 8) return MOOD_COLORS['8-9'];
  if (value >= 6) return MOOD_COLORS['6-7'];
  if (value >= 4) return MOOD_COLORS['4-5'];
  return MOOD_COLORS['1-3'];
}

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

function formatDateLabel(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function daysBetween(a: string, b: string): number {
  const da = new Date(a + 'T12:00:00');
  const db = new Date(b + 'T12:00:00');
  return Math.round((db.getTime() - da.getTime()) / 86400000);
}

// ─── Tooltip ───────────────────────────────────────────────────────

function SimpleTooltip({
  cell,
  habits,
  viewMode,
}: {
  cell: DayCell;
  habits: HabitDefinition[];
  viewMode: ViewMode;
}) {
  if (cell.isEmpty) return null;

  const moodEmoji = (val: number) => {
    if (val >= 9) return '🤩';
    if (val >= 7) return '😊';
    if (val >= 5) return '😐';
    if (val >= 3) return '😔';
    return '😢';
  };

  return (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none">
      <div className="bg-gray-900 text-white text-[11px] rounded-lg px-3 py-2 shadow-lg whitespace-nowrap min-w-[160px]">
        <p className="font-semibold mb-1">{formatDateLabel(cell.date)}</p>
        {viewMode === 'habits' ? (
          <>
            <p>
              Habits: <strong>{cell.habitCount}/{cell.habitTotal}</strong>
              {' '}({Math.round(cell.habitRate * 100)}%)
            </p>
            {cell.habitTotal === 0 && (
              <p className="text-gray-400 text-[10px] mt-0.5">No habits logged</p>
            )}
          </>
        ) : (
          <>
            {cell.moodValue !== undefined ? (
              <p>
                Mood: {moodEmoji(cell.moodValue)} <strong>{cell.moodValue}/10</strong>
              </p>
            ) : (
              <p className="text-gray-400 text-[10px]">No mood logged</p>
            )}
          </>
        )}
        {viewMode === 'habits' && cell.moodValue !== undefined && (
          <p className="text-gray-300 text-[10px] mt-0.5">
            Mood: {moodEmoji(cell.moodValue)} {cell.moodValue}/10
          </p>
        )}
      </div>
      <div className="w-2 h-2 bg-gray-900 rotate-45 absolute top-full left-1/2 -translate-x-1/2 -mt-1" />
    </div>
  );
}

// ─── Streak Badge ──────────────────────────────────────────────────

function StreakBadge({ current, longest, habitName, emoji }: {
  current: number;
  longest: number;
  habitName?: string;
  emoji?: string;
}) {
  return (
    <div className="flex items-center gap-3 text-xs">
      {current > 0 && (
        <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-lg px-2.5 py-1">
          <span className="text-sm">🔥</span>
          <span className="font-bold text-orange-700">{current}</span>
          <span className="text-orange-500">day streak</span>
        </div>
      )}
      {longest > 0 && (
        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1">
          <span className="text-sm">🏆</span>
          <span className="font-bold text-amber-700">{longest}</span>
          <span className="text-amber-500">best</span>
        </div>
      )}
      {current === 0 && longest === 0 && (
        <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1">
          <span className="text-sm">📭</span>
          <span className="text-gray-400">No streaks yet</span>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────

export default function StreakCalendar({ habits, onDateClick }: StreakCalendarProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('habits');
  const [hoveredCell, setHoveredCell] = useState<DayCell | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const [selectedHabitId, setSelectedHabitId] = useState<string | 'all'>('all');

  // Data
  const moodLog = useMemo(() => getMoodLog(), []);
  const habitLog = useMemo(() => getHabitLog(), []);
  const dateRangeStart = useMemo(() => {
    if (moodLog.length === 0 && habitLog.length === 0) {
      // Default to last 12 months
      const d = new Date();
      d.setFullYear(d.getFullYear() - 1);
      return d.toISOString().slice(0, 10);
    }
    // Find earliest date with data
    const all = new Set<string>();
    moodLog.forEach(m => all.add(m.date));
    habitLog.forEach(h => all.add(h.date));
    const sorted = Array.from(all).sort();
    // Go back a week before earliest data for clean grid
    const earliest = new Date(sorted[0] + 'T12:00:00');
    earliest.setDate(earliest.getDate() - 7);
    // But limit to 12 months
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    return earliest < oneYearAgo ? oneYearAgo.toISOString().slice(0, 10) : earliest.toISOString().slice(0, 10);
  }, [moodLog, habitLog]);

  // Build day cells
  const cells = useMemo(() => {
    const result: DayCell[] = [];
    const today = getToday();
    const start = new Date(dateRangeStart + 'T12:00:00');

    // Walk to the nearest Monday (so grid starts on Monday)
    const startDay = start.getDay();
    const diff = startDay === 0 ? -6 : 1 - startDay;
    start.setDate(start.getDate() + diff);

    const moodMap = new Map(moodLog.map(m => [m.date, m.value]));

    // Filter habit log by selected habit
    const filteredHabitLog = selectedHabitId === 'all'
      ? habitLog
      : habitLog.filter(h => h.habitId === selectedHabitId);

    // Build day-by-day habit completion map
    const habitByDate = new Map<string, { completed: number; total: number }>();
    filteredHabitLog.forEach(h => {
      if (!habitByDate.has(h.date)) {
        habitByDate.set(h.date, { completed: 0, total: 0 });
      }
      const entry = habitByDate.get(h.date)!;
      entry.total++;
      if (h.completed) entry.completed++;
    });

    const cursor = new Date(start);
    const todayDate = new Date(today + 'T12:00:00');

    while (cursor <= todayDate) {
      const dateStr = cursor.toISOString().slice(0, 10);
      const dayOfWeek = cursor.getDay();
      const data = habitByDate.get(dateStr);
      const moodVal = moodMap.get(dateStr);

      const habitCount = data?.completed ?? 0;
      const habitTotal = data?.total ?? 0;
      const habitRate = habitTotal > 0 ? habitCount / habitTotal : 0;

      result.push({
        date: dateStr,
        dayOfWeek,
        habitCount,
        habitTotal,
        habitRate,
        moodValue: moodVal,
        isEmpty: !data && moodVal === undefined,
      });

      cursor.setDate(cursor.getDate() + 1);
    }

    return result;
  }, [moodLog, habitLog, dateRangeStart, selectedHabitId]);

  // Group cells into weeks (each week = 7 days, Mon-Sun)
  const weeks = useMemo(() => {
    const w: DayCell[][] = [];
    let currentWeek: DayCell[] = [];

    cells.forEach((cell, i) => {
      // Pad first week with empty cells so Monday = row 0
      if (i === 0 && cell.dayOfWeek !== 1) {
        // Day starts on Monday (1), pad with empty cells
        for (let d = 1; d < cell.dayOfWeek; d++) {
          currentWeek.push({
            date: '',
            dayOfWeek: d,
            habitCount: 0,
            habitTotal: 0,
            habitRate: 0,
            isEmpty: true,
          });
        }
      }

      currentWeek.push(cell);

      if (cell.dayOfWeek === 0 || i === cells.length - 1) {
        // Fill remaining days in last week
        if (i === cells.length - 1) {
          const lastDay = cell.dayOfWeek;
          for (let d = lastDay + 1; d <= 6; d++) {
            currentWeek.push({
              date: '',
              dayOfWeek: d,
              habitCount: 0,
              habitTotal: 0,
              habitRate: 0,
              isEmpty: true,
            });
          }
          // Add Sunday (day 0 is last if we ended on Sunday)
          // Actually day 0 = Sunday, so if we ended on Sunday, we're fine
        }
        w.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      w.push(currentWeek);
    }

    return w;
  }, [cells]);

  // Month labels
  const monthLabels = useMemo(() => {
    const labels: { index: number; label: string }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, weekIdx) => {
      const midCell = week[3]; // Thursday-ish
      if (!midCell || midCell.isEmpty) return;
      const d = new Date(midCell.date + 'T12:00:00');
      const month = d.getMonth();
      if (month !== lastMonth) {
        labels.push({ index: weekIdx, label: d.toLocaleDateString('en-US', { month: 'short' }) });
        lastMonth = month;
      }
    });

    return labels;
  }, [weeks]);

  // Day-of-week labels
  const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  // Overall streaks per habit
  const streakSummary = useMemo(() => {
    if (selectedHabitId === 'all') {
      // Aggregate: longest streak across all habits
      let maxLongest = 0;
      let totalCurrent = 0;
      let activeHabitCount = 0;
      habits.forEach(h => {
        const s = computeStreaks(h.id);
        if (s.longest > maxLongest) maxLongest = s.longest;
        if (s.current > 0) {
          totalCurrent += s.current;
          activeHabitCount++;
        }
      });
      return {
        current: activeHabitCount > 0 ? Math.round(totalCurrent / activeHabitCount) : 0,
        longest: maxLongest,
        label: 'All habits',
      };
    }
    const s = computeStreaks(selectedHabitId);
    const habit = habits.find(h => h.id === selectedHabitId);
    return {
      current: s.current,
      longest: s.longest,
      label: habit?.name ?? 'Selected habit',
    };
  }, [habits, selectedHabitId]);

  // ─── Render ───────────────────────────────────────────────────

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">📅</span>
          <h3 className="text-sm font-bold text-gray-800">Streak Calendar</h3>
        </div>
        <StreakBadge
          current={streakSummary.current}
          longest={streakSummary.longest}
          habitName={streakSummary.label}
        />
      </div>

      {/* View toggle + habit filter */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        {/* View mode */}
        <div className="flex bg-gray-100 rounded-lg p-0.5">
          <button
            onClick={() => setViewMode('habits')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'habits'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            ✅ Habits
          </button>
          <button
            onClick={() => setViewMode('mood')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'mood'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            😊 Mood
          </button>
        </div>

        {/* Habit filter */}
        <select
          value={selectedHabitId}
          onChange={e => setSelectedHabitId(e.target.value)}
          className="text-xs border border-gray-200 rounded-lg px-2 py-1 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400/30"
        >
          <option value="all">All Habits</option>
          {habits.map(h => (
            <option key={h.id} value={h.id}>
              {h.emoji} {h.name}
            </option>
          ))}
        </select>
      </div>

      {/* ── Grid ── */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-flex flex-col gap-0.5 min-w-[700px]">
          {/* Month labels row */}
          <div className="flex ml-8 mb-1">
            {monthLabels.map((m, i) => (
              <div
                key={i}
                className="text-[10px] text-gray-400 font-medium"
                style={{
                  marginLeft: i === 0 ? `${m.index * 14}px` : `${(m.index - (monthLabels[i - 1]?.index ?? 0)) * 14 - 10}px`,
                }}
              >
                {m.label}
              </div>
            ))}
          </div>

          {/* Grid rows (day labels + cells) */}
          {weeks.length > 0 && DAY_LABELS.map((dayLabel, rowIdx) => (
            <div key={rowIdx} className="flex items-center gap-1">
              <span className="w-7 text-right text-[10px] text-gray-400 font-mono flex-shrink-0">
                {dayLabel}
              </span>
              <div className="flex gap-0.5">
                {weeks.map((week, weekIdx) => {
                  const cell = week[rowIdx];
                  if (!cell) return <div key={weekIdx} className="w-3.5 h-3.5" />;

                  const cellColor = cell.isEmpty
                    ? ''
                    : viewMode === 'habits'
                      ? getHabitColor(cell.habitRate)
                      : cell.moodValue !== undefined
                        ? getMoodColor(cell.moodValue)
                        : 'bg-gray-50';

                  const isToday = cell.date === getToday();

                  return (
                    <div
                      key={weekIdx}
                      className="relative"
                      onMouseEnter={(e) => {
                        if (!cell.isEmpty) {
                          setHoveredCell(cell);
                          const rect = e.currentTarget.getBoundingClientRect();
                          setTooltipPos({ x: rect.left, y: rect.top });
                        }
                      }}
                      onMouseLeave={() => setHoveredCell(null)}
                      onClick={() => {
                        if (!cell.isEmpty && onDateClick && cell.date) {
                          onDateClick(cell.date);
                        }
                      }}
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded-sm cursor-pointer transition-all duration-100 ${
                          cell.isEmpty
                            ? ''
                            : viewMode === 'habits'
                              ? getHabitColor(cell.habitRate)
                              : cell.moodValue !== undefined
                                ? getMoodColor(cell.moodValue)
                                : 'bg-gray-50'
                        } ${
                          isToday ? 'ring-2 ring-teal-400 ring-offset-1' : ''
                        } ${
                          !cell.isEmpty ? 'hover:scale-125 hover:ring-2 hover:ring-gray-400 hover:ring-offset-0.5' : ''
                        }`}
                      />

                      {/* Tooltip */}
                      {hoveredCell === cell && !cell.isEmpty && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-50 pointer-events-none">
                          <div className="bg-gray-900 text-white text-[10px] rounded-lg px-2.5 py-1.5 shadow-lg whitespace-nowrap min-w-[140px]">
                            <p className="font-semibold mb-0.5">
                              {formatDateLabel(cell.date)}
                            </p>
                            {viewMode === 'habits' ? (
                              <>
                                <p>
                                  ✅ {cell.habitCount}/{cell.habitTotal} habits
                                  {' '}({Math.round(cell.habitRate * 100)}%)
                                </p>
                                {cell.moodValue !== undefined && (
                                  <p className="text-gray-300">
                                    😊 Mood: {cell.moodValue}/10
                                  </p>
                                )}
                              </>
                            ) : (
                              <p>
                                {cell.moodValue !== undefined
                                  ? `😊 Mood: ${cell.moodValue}/10`
                                  : 'No mood logged'}
                              </p>
                            )}
                          </div>
                          <div className="w-1.5 h-1.5 bg-gray-900 rotate-45 absolute top-full left-1/2 -translate-x-1/2 -mt-0.5" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Legend ── */}
      <div className="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-gray-100">
        {/* Color key */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-gray-400 mr-1">
            {viewMode === 'habits' ? 'Completion:' : 'Mood:'}
          </span>
          {viewMode === 'habits' ? (
            <>
              {['None', '1-25%', '26-50%', '51-75%', '76-99%', '100%'].map((label, i) => (
                <div key={label} className="flex items-center gap-1">
                  <div className={`w-2.5 h-2.5 rounded-sm ${HABIT_COLORS[i] || 'bg-gray-100'}`} />
                  <span className="text-[9px] text-gray-400">{label}</span>
                </div>
              ))}
            </>
          ) : (
            <>
              {[
                { label: 'Low', color: 'bg-red-300' },
                { label: 'Med', color: 'bg-amber-300' },
                { label: 'Good', color: 'bg-teal-300' },
                { label: 'High', color: 'bg-emerald-400' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1">
                  <div className={`w-2.5 h-2.5 rounded-sm ${item.color}`} />
                  <span className="text-[9px] text-gray-400">{item.label}</span>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-[10px] text-gray-400">
          <span>
            📅 {cells.filter(c => !c.isEmpty).length} days tracked
          </span>
          <span>
            🟩 {cells.filter(c => !c.isEmpty && c.habitRate >= 0.5).length} good days
          </span>
        </div>
      </div>

      {/* ── Per-habit streak breakdown ── */}
      {selectedHabitId === 'all' && (
        <details className="group">
          <summary className="text-[11px] text-gray-500 cursor-pointer hover:text-gray-700 select-none">
            📋 Streak breakdown by habit
          </summary>
          <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {habits.map(h => {
              const s = computeStreaks(h.id);
              return (
                <div
                  key={h.id}
                  className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 rounded-lg text-xs"
                >
                  <span className="text-sm">{h.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] text-gray-700 truncate">{h.name}</p>
                    <p className="text-[10px] text-gray-400">
                      {s.current > 0 ? `🔥 ${s.current}d · ` : ''}
                      🏆 {s.longest}d best · {s.total} total
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </details>
      )}
    </div>
  );
}
