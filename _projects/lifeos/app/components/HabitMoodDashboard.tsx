'use client';

/**
 * HabitMoodDashboard
 *
 * A full-featured dashboard for tracking daily habits + mood,
 * viewing correlation insights, and building streaks.
 *
 * Renders as a tabbed panel inside the Health OS plugin detail page.
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import StreakCalendar from './StreakCalendar';
import {
  type MoodEntry,
  type HabitLog,
  type HabitDefinition,
  type CorrelationReport,
  type WeekComparison,
  DEFAULT_HABITS,
  getMoodLog,
  addMoodEntry,
  deleteMoodEntry,
  getHabitLog,
  logHabit,
  clearHabitLog,
  getDateRangeStarts,
  computeCorrelationReport,
  computeStreaks,
  computeWeekComparison,
} from '@/app/lib/habit-mood-correlation';

// ─── Utility ───────────────────────────────────────────────────────

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function daysAgo(dateStr: string): number {
  const now = new Date();
  const then = new Date(dateStr + 'T12:00:00');
  return Math.round((now.getTime() - then.getTime()) / 86400000);
}

function moodEmoji(val: number): string {
  if (val >= 9) return '🤩';
  if (val >= 7) return '😊';
  if (val >= 5) return '😐';
  if (val >= 3) return '😔';
  return '😢';
}

function moodColor(val: number): string {
  if (val >= 9) return 'text-emerald-500';
  if (val >= 7) return 'text-teal-500';
  if (val >= 5) return 'text-amber-500';
  if (val >= 3) return 'text-orange-500';
  return 'text-red-500';
}

function strengthColor(strength: string): string {
  if (strength.includes('strong-positive')) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
  if (strength.includes('moderate-positive')) return 'text-teal-600 bg-teal-50 border-teal-200';
  if (strength.includes('weak-positive')) return 'text-blue-600 bg-blue-50 border-blue-200';
  if (strength.includes('strong-negative')) return 'text-red-600 bg-red-50 border-red-200';
  if (strength.includes('moderate-negative')) return 'text-orange-600 bg-orange-50 border-orange-200';
  if (strength.includes('weak-negative')) return 'text-amber-600 bg-amber-50 border-amber-200';
  return 'text-gray-400 bg-gray-50 border-gray-200';
}

// ─── Tab types ─────────────────────────────────────────────────────

type TabId = 'daily' | 'correlations' | 'history' | 'settings';

const TABS: { id: TabId; label: string; emoji: string }[] = [
  { id: 'daily', label: 'Daily Log', emoji: '📝' },
  { id: 'correlations', label: 'Insights', emoji: '🔬' },
  { id: 'history', label: 'History', emoji: '📊' },
  { id: 'settings', label: 'Habits', emoji: '⚙️' },
];

// ─── Mood Slider ───────────────────────────────────────────────────

function MoodSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">Low</span>
        <span className="text-2xl">{moodEmoji(value)}</span>
        <span className="text-xs text-gray-400">High</span>
      </div>
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-red-300 via-amber-300 to-emerald-300 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-teal-400 [&::-webkit-slider-thumb]:shadow-md"
      />
      <div className="flex items-center justify-center gap-2">
        <span className={`text-lg font-bold ${moodColor(value)}`}>{value}/10</span>
      </div>
    </div>
  );
}

// ─── Daily Log Tab ─────────────────────────────────────────────────

function DailyLogTab({
  date,
  habits,
  onLogHabit,
  onClearHabit,
  moodEntry,
  onSetMood,
  onDeleteMood,
}: {
  date: string;
  habits: HabitDefinition[];
  onLogHabit: (habit: HabitLog) => void;
  onClearHabit: (habitId: string) => void;
  moodEntry: MoodEntry | undefined;
  onSetMood: (value: number) => void;
  onDeleteMood: () => void;
}) {
  const [moodValue, setMoodValue] = useState(moodEntry?.value || 7);
  const [moodNote, setMoodNote] = useState(moodEntry?.note || '');
  const todayHabits = useMemo(() => {
    const log = getHabitLog().filter(h => h.date === date);
    const map = new Map(log.map(h => [h.habitId, h]));
    return habits.map(h => ({
      ...h,
      logged: map.get(h.id),
      completed: map.get(h.id)?.completed ?? false,
    }));
  }, [date, habits]);

  const isToday = date === today();

  return (
    <div className="space-y-6">
      {/* Date header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-gray-800">
            {isToday ? 'Today' : formatDate(date)}
          </h3>
          <p className="text-xs text-gray-400">
            {isToday ? `${daysAgo(date)} days ago` : `${daysAgo(date)} days ago`}
          </p>
        </div>
        {!isToday && (
          <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
            Past entry
          </span>
        )}
      </div>

      {/* Mood section */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h4 className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span>😊</span> Mood Rating
        </h4>
        <MoodSlider value={moodValue} onChange={setMoodValue} />
        <div className="mt-3">
          <textarea
            value={moodNote}
            onChange={e => setMoodNote(e.target.value)}
            placeholder="How are you feeling today? (optional)"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent resize-none"
            rows={2}
          />
        </div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => {
              onSetMood(moodValue);
              // Store note separately if needed
              if (moodNote.trim()) {
                const entry: MoodEntry = {
                  date,
                  value: moodValue,
                  note: moodNote.trim() || undefined,
                  createdAt: new Date().toISOString(),
                };
                addMoodEntry(entry);
              }
            }}
            className="flex-1 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-xs font-medium transition-colors"
          >
            {moodEntry ? 'Update Mood' : 'Log Mood'}
          </button>
          {moodEntry && (
            <button
              onClick={onDeleteMood}
              className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg text-xs font-medium transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      {/* Habits section */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h4 className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span>✅</span> Daily Habits
        </h4>
        <div className="space-y-1.5">
          {todayHabits.map(habit => {
            const streak = habit.id ? computeStreaks(habit.id) : null;
            return (
              <div
                key={habit.id}
                className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                  habit.completed
                    ? 'bg-emerald-50 border border-emerald-200'
                    : 'bg-gray-50 border border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-base flex-shrink-0">{habit.emoji}</span>
                  <div className="min-w-0">
                    <span className={`text-sm font-medium ${habit.completed ? 'text-emerald-700' : 'text-gray-700'}`}>
                      {habit.name}
                    </span>
                    {streak && streak.current > 1 && (
                      <span className="ml-2 text-[10px] text-orange-500 font-medium">
                        🔥 {streak.current}d
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (habit.completed) {
                      onClearHabit(habit.id);
                    } else {
                      onLogHabit({
                        date,
                        habitId: habit.id,
                        habitName: habit.name,
                        category: habit.category,
                        completed: true,
                        createdAt: new Date().toISOString(),
                      });
                    }
                  }}
                  className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                    habit.completed
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-gray-300 hover:border-teal-400'
                  }`}
                >
                  {habit.completed && (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Correlation Bar ───────────────────────────────────────────────

function CorrelationBar({ r }: { r: number }) {
  // Clamp to [-1, 1]
  const clamped = Math.max(-1, Math.min(1, r));
  // Map to percentage: 0 is center
  const pct = clamped * 50; // -50 to +50
  const width = Math.abs(pct);
  const isPositive = clamped >= 0;

  return (
    <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
      {/* Center line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 z-10" />
      {/* Bar */}
      <div
        className={`absolute top-0 h-full rounded-full transition-all duration-500 ${
          isPositive ? 'bg-gradient-to-r from-teal-300 to-emerald-500' : 'bg-gradient-to-l from-red-300 to-red-500'
        }`}
        style={{
          left: isPositive ? '50%' : `${50 - width}%`,
          width: `${width}%`,
        }}
      />
    </div>
  );
}

// ─── Week Comparison Panel ────────────────────────────────────────

function weekLabel(weekStart: string): string {
  if (!weekStart) return '—';
  const mon = new Date(weekStart + 'T12:00:00');
  const sun = new Date(mon);
  sun.setDate(mon.getDate() + 6);
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return `${mon.toLocaleDateString('en-US', opts)} – ${sun.toLocaleDateString('en-US', opts)}`;
}

function DeltaBadge({ delta, suffix = '' }: { delta: number; suffix?: string }) {
  if (delta === 0) {
    return <span className="text-[11px] text-gray-400 font-medium">→ Same{suffix}</span>;
  }
  const isUp = delta > 0;
  return (
    <span className={`text-[11px] font-bold ${isUp ? 'text-emerald-600' : 'text-red-500'}`}>
      {isUp ? '↑' : '↓'} {Math.abs(delta).toFixed(1)}{suffix}
    </span>
  );
}

function WeekComparisonPanel({ comparison, habits }: { comparison: WeekComparison; habits: HabitDefinition[] }) {
  if (!comparison.thisWeekStart) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
        <div className="text-center py-3">
          <div className="w-10 h-10 mx-auto mb-2 bg-blue-100 rounded-xl flex items-center justify-center">
            <span className="text-xl">📊</span>
          </div>
          <p className="text-xs text-gray-500 mb-1">Not enough data for week comparison</p>
          <p className="text-[10px] text-gray-400">
            Log mood and habits for at least one full week to see how you compare.
          </p>
        </div>
      </div>
    );
  }

  // Sort habits by absolute delta (most improved / most declined first)
  const sortedHabits = [...habits]
    .filter(h => comparison.habitRates[h.id])
    .sort((a, b) => Math.abs(comparison.habitRates[b.id]?.delta ?? 0) - Math.abs(comparison.habitRates[a.id]?.delta ?? 0));

  // Count improved vs declined
  const improved = sortedHabits.filter(h => (comparison.habitRates[h.id]?.delta ?? 0) > 0).length;
  const declined = sortedHabits.filter(h => (comparison.habitRates[h.id]?.delta ?? 0) < 0).length;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold text-gray-700 flex items-center gap-2">
          <span>📊</span> Week vs Last Week
        </h4>
        <span className="text-[10px] text-gray-400 font-mono">
          {weekLabel(comparison.lastWeekStart)} → {weekLabel(comparison.thisWeekStart)}
        </span>
      </div>

      {/* Mood Comparison */}
      <div className="bg-white border border-blue-100 rounded-xl p-3.5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-600">😊 Average Mood</span>
          <DeltaBadge delta={comparison.moodDelta} suffix=" pts" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center">
            <div className="text-[10px] text-gray-400 mb-0.5">This Week</div>
            <div className={`text-xl font-bold ${isNaN(comparison.thisWeekMoodAvg) ? 'text-gray-300' : comparison.moodDelta >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              {isNaN(comparison.thisWeekMoodAvg) ? '—' : comparison.thisWeekMoodAvg.toFixed(1)}
            </div>
            <div className="text-[10px] text-gray-400">{comparison.thisWeekDays} days</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] text-gray-400 mb-0.5">Last Week</div>
            <div className={`text-xl font-bold ${isNaN(comparison.lastWeekMoodAvg) ? 'text-gray-300' : 'text-gray-600'}`}>
              {isNaN(comparison.lastWeekMoodAvg) ? '—' : comparison.lastWeekMoodAvg.toFixed(1)}
            </div>
            <div className="text-[10px] text-gray-400">{comparison.lastWeekDays} days</div>
          </div>
        </div>
      </div>

      {/* Habit Completion Comparison */}
      <div className="bg-white border border-blue-100 rounded-xl p-3.5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-600">✅ Overall Habit Rate</span>
          <DeltaBadge delta={comparison.overallRateDelta * 100} suffix="%" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center">
            <div className="text-[10px] text-gray-400 mb-0.5">This Week</div>
            <div className={`text-xl font-bold ${comparison.overallRateDelta >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              {(comparison.thisWeekOverallRate * 100).toFixed(0)}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-[10px] text-gray-400 mb-0.5">Last Week</div>
            <div className="text-xl font-bold text-gray-600">
              {(comparison.lastWeekOverallRate * 100).toFixed(0)}%
            </div>
          </div>
        </div>
      </div>

      {/* Per-habit breakdown */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-600 flex items-center gap-2">
            <span>📋</span> Per-Habit Change
          </span>
          <div className="flex gap-2 text-[10px]">
            <span className="text-emerald-600">↑ {improved} better</span>
            {declined > 0 && <span className="text-red-500">↓ {declined} worse</span>}
          </div>
        </div>
        <div className="space-y-1.5">
          {sortedHabits.map(habit => {
            const h = comparison.habitRates[habit.id];
            if (!h) return null;
            const barWidth = Math.abs(h.delta) * 100;
            return (
              <div key={habit.id} className="flex items-center gap-2 bg-gray-50 rounded-lg px-2.5 py-1.5">
                <span className="text-sm w-5 flex-shrink-0">{habit.emoji}</span>
                <span className="text-[11px] text-gray-600 w-24 truncate flex-shrink-0">{habit.name}</span>
                <div className="flex-1 flex items-center gap-1">
                  {h.delta < 0 && (
                    <div className="flex-1 flex justify-end">
                      <div
                        className="h-2 bg-red-200 rounded-l-full"
                        style={{ width: `${Math.min(barWidth, 100)}%` }}
                      />
                    </div>
                  )}
                  {h.delta > 0 && (
                    <div className="flex-1">
                      <div
                        className="h-2 bg-emerald-200 rounded-r-full"
                        style={{ width: `${Math.min(barWidth, 100)}%` }}
                      />
                    </div>
                  )}
                  {h.delta === 0 && (
                    <div className="flex-1 text-center">
                      <div className="h-0.5 bg-gray-200 mx-2" />
                    </div>
                  )}
                </div>
                <span className={`text-[10px] font-mono w-12 text-right ${h.delta > 0 ? 'text-emerald-600' : h.delta < 0 ? 'text-red-500' : 'text-gray-400'}`}>
                  {h.delta > 0 ? '+' : ''}{(h.delta * 100).toFixed(0)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary sentence */}
      <div className="text-[10px] text-gray-400 italic bg-white/60 rounded-lg px-3 py-2">
        {comparison.moodDelta > 0.5
          ? `📈 Mood is up ${comparison.moodDelta.toFixed(1)} points compared to last week. Keep doing what's working!`
          : comparison.moodDelta < -0.5
          ? `📉 Mood dropped ${Math.abs(comparison.moodDelta).toFixed(1)} points this week. Check which habits slipped.`
          : `➡️ Mood is stable compared to last week (${comparison.moodDelta.toFixed(1)} pts change).`}
      </div>
    </div>
  );
}

// ─── Correlations Tab ──────────────────────────────────────────────

function CorrelationsTab({ report, weekComparison, habits }: { report: CorrelationReport; weekComparison: WeekComparison; habits: HabitDefinition[] }) {
  const sorted = useMemo(
    () => [...report.results].sort((a, b) => Math.abs(b.r) - Math.abs(a.r)),
    [report.results],
  );

  const meaningfulResults = sorted.filter(r => r.n >= 3 && r.strength !== 'none');

  if (report.dataDays < 3) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-xl flex items-center justify-center">
          <span className="text-2xl">📊</span>
        </div>
        <p className="text-sm text-gray-500 mb-1">Not enough data yet</p>
        <p className="text-xs text-gray-400">
          Log at least 3 days of mood + habits to see correlations.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Currently: {report.dataDays} days with data
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall mood summary */}
      <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200 rounded-xl p-4">
        <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <span>📈</span> Overall Mood Trend
        </h4>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <div className={`text-2xl font-bold ${moodColor(Math.round(report.overallMoodTrend.average))}`}>
              {report.overallMoodTrend.average.toFixed(1)}
            </div>
            <div className="text-[10px] text-gray-400">Average</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-700">
              {report.overallMoodTrend.trend === 'up' ? '📈' : report.overallMoodTrend.trend === 'down' ? '📉' : '➡️'}
            </div>
            <div className="text-[10px] text-gray-400">Trend</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-700">
              {report.overallMoodTrend.volatility.toFixed(1)}
            </div>
            <div className="text-[10px] text-gray-400">Volatility</div>
          </div>
        </div>
        <p className="text-[11px] text-gray-500 mt-2 text-center">
          Based on {report.dataDays} days of data. Lower volatility = more stable mood.
        </p>
      </div>

      {/* Week-over-Week Comparison */}
      <WeekComparisonPanel comparison={weekComparison} habits={habits} />

      {/* Top insight card */}
      {report.topPositive && (
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🏆</span>
            <h4 className="text-xs font-semibold text-gray-700">Biggest Mood Booster</h4>
          </div>
          <p className="text-sm text-gray-700">{report.topPositive.insight}</p>
        </div>
      )}

      {report.topNegative && (
        <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">⚠️</span>
            <h4 className="text-xs font-semibold text-gray-700">Watch Out</h4>
          </div>
          <p className="text-sm text-gray-700">{report.topNegative.insight}</p>
        </div>
      )}

      {/* All correlations */}
      <div>
        <h4 className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span>📋</span> All Habit Correlations
        </h4>
        <div className="space-y-2">
          {meaningfulResults.length === 0 && (
            <div className="text-center py-6">
              <p className="text-xs text-gray-400">
                Log more habit data to see correlations. Try logging consistently for 5+ days.
              </p>
            </div>
          )}
          {meaningfulResults.map(result => (
            <div
              key={result.habitId}
              className="bg-white border border-gray-200 rounded-xl p-3.5"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">{result.emoji}</span>
                  <span className="text-sm font-medium text-gray-800">{result.habitName}</span>
                </div>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full border ${strengthColor(result.strength)}`}>
                  r = {result.r.toFixed(2)}
                </span>
              </div>
              <CorrelationBar r={result.r} />
              <div className="flex items-center justify-between mt-1.5">
                <p className="text-[11px] text-gray-400">
                  {result.n} paired days · {result.trend === 'up' ? '📈 rising' : result.trend === 'down' ? '📉 declining' : '➡️ stable'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── History Tab ───────────────────────────────────────────────────

function HistoryTab({
  moodLog,
  habitLog,
  habits,
  onSelectDate,
}: {
  moodLog: MoodEntry[];
  habitLog: HabitLog[];
  habits: HabitDefinition[];
  onSelectDate: (date: string) => void;
}) {
  // Toggle between streak calendar and list view
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  // ─── List View (original week-based) ───
  const weeks = useMemo(() => {
    const grouped: { label: string; days: { date: string; mood?: MoodEntry; completed: number; total: number }[] }[] = [];
    const dates = getDateRangeStarts().sort().reverse();
    if (dates.length === 0) return [];

    const moodMap = new Map(moodLog.map(m => [m.date, m]));

    let currentWeek: { date: string; mood?: MoodEntry; completed: number; total: number }[] = [];
    let weekStart = '';

    dates.forEach((date, i) => {
      if (i > 0 && dates[i - 1] !== date) {
        const prev = new Date(dates[i - 1] + 'T12:00:00');
        const curr = new Date(date + 'T12:00:00');
        const diffDays = Math.round((prev.getTime() - curr.getTime()) / 86400000);
        if (diffDays > 1) {
          if (currentWeek.length > 0) {
            grouped.push({ label: weekStart || currentWeek[0].date, days: currentWeek });
            currentWeek = [];
          }
        }
      }

      const dayHabits = habitLog.filter(h => h.date === date);
      currentWeek.push({
        date,
        mood: moodMap.get(date),
        completed: dayHabits.filter(h => h.completed).length,
        total: habits.length,
      });

      if (currentWeek.length === 7) {
        grouped.push({ label: currentWeek[0].date, days: currentWeek });
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      grouped.push({ label: currentWeek[0].date, days: currentWeek });
    }

    return grouped;
  }, [moodLog, habitLog, habits]);

  // Detect if there's any data at all
  const hasAnyData = useMemo(() => {
    return moodLog.length > 0 || habitLog.length > 0;
  }, [moodLog, habitLog]);

  if (!hasAnyData) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-xl flex items-center justify-center">
          <span className="text-2xl">📅</span>
        </div>
        <p className="text-sm text-gray-500 mb-1">No entries yet</p>
        <p className="text-xs text-gray-400">
          Start logging your daily mood and habits to build a history.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* View toggle */}
      <div className="flex items-center justify-between">
        <div className="flex bg-gray-100 rounded-lg p-0.5">
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'calendar'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            🟩 Heatmap
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'list'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            📋 Week Grid
          </button>
        </div>
      </div>

      {viewMode === 'calendar' ? (
        <StreakCalendar habits={habits} onDateClick={onSelectDate} />
      ) : weeks.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-xl flex items-center justify-center">
            <span className="text-2xl">📅</span>
          </div>
          <p className="text-sm text-gray-500 mb-1">No entries yet</p>
          <p className="text-xs text-gray-400">
            Start logging your daily mood and habits to build a history.
          </p>
        </div>
      ) : (
        <>
          {weeks.map(week => (
            <div key={week.label}>
              <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Week of {formatDate(week.label)}
              </h4>
              <div className="grid grid-cols-7 gap-1.5">
                {week.days.map(day => (
                  <button
                    key={day.date}
                    onClick={() => onSelectDate(day.date)}
                    className="p-2 bg-gray-50 border border-gray-100 rounded-lg hover:border-teal-200 hover:bg-teal-50 transition-colors text-center"
                  >
                    <div className="text-[9px] text-gray-400 font-mono">
                      {new Date(day.date + 'T12:00:00').getDate()}
                    </div>
                    {day.mood ? (
                      <div className={`text-lg ${moodColor(day.mood.value)}`}>
                        {moodEmoji(day.mood.value)}
                      </div>
                    ) : (
                      <div className="text-lg text-gray-200">—</div>
                    )}
                    <div className="text-[8px] text-gray-400 mt-0.5">
                      {day.completed}/{day.total}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

// ─── Settings (Habit Definitions) Tab ──────────────────────────────

function SettingsTab({
  habits,
}: {
  habits: HabitDefinition[];
}) {
  // Track which habits are enabled
  const [enabledIds, setEnabledIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return habits.map(h => h.id);
    try {
      const raw = localStorage.getItem('lifeos_enabled_habits');
      return raw ? JSON.parse(raw) : habits.map(h => h.id);
    } catch {
      return habits.map(h => h.id);
    }
  });

  const toggle = useCallback((id: string) => {
    setEnabledIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem('lifeos_enabled_habits', JSON.stringify(next));
      return next;
    });
  }, []);

  // ── Data Export ────────────────────────────────────────────────
  const downloadFile = useCallback((content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const exportData = useCallback((format: 'csv' | 'json') => {
    const moodLog = JSON.parse(localStorage.getItem('lifeos_mood_log') || '{}');
    const habitLog = JSON.parse(localStorage.getItem('lifeos_habit_log') || '{}');
    const snapshot = {
      exportedAt: new Date().toISOString(),
      source: 'LifeOS HabitMoodDashboard',
      moodLog,
      habitLog,
      habits,
    };

    if (format === 'json') {
      downloadFile(
        JSON.stringify(snapshot, null, 2),
        `lifeos-export-${new Date().toISOString().slice(0, 10)}.json`,
        'application/json',
      );
      return;
    }

    // CSV: flatten habitLog into rows
    const allDates = new Set([
      ...Object.keys(habitLog),
      ...Object.keys(moodLog),
    ].sort());

    const header = ['date', 'mood_score', 'mood_note', ...habits.map((h: HabitDefinition) => h.emoji + ' ' + h.name)];
    const rows = Array.from(allDates).map((date: string) => {
      const mood = moodLog[date];
      const habitsForDate = habitLog[date] || [];
      return [
        date,
        mood?.score ?? '',
        (mood?.note || '').replace(/,/g, '\,'),
        ...habits.map((h: HabitDefinition) => (habitsForDate.includes(h.id) ? '✓' : '')),
      ];
    });

    const csv = [header.join(','), ...rows.map((r: string[]) => r.join(','))].join('\n');
    downloadFile(
      csv,
      `lifeos-export-${new Date().toISOString().slice(0, 10)}.csv`,
      'text/csv',
    );
  }, [habits, downloadFile]);

  // Group by category
  const grouped = useMemo(() => {
    const map = new Map<string, HabitDefinition[]>();
    habits.forEach(h => {
      if (!map.has(h.category)) map.set(h.category, []);
      map.get(h.category)!.push(h);
    });
    return Array.from(map.entries());
  }, [habits]);

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h4 className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span>⚙️</span> Enable / Disable Habits
        </h4>
        <p className="text-[11px] text-gray-400 mb-3">
          Choose which habits appear on your Daily Log. Disabled habits won't show up but existing data is preserved.
        </p>

        {grouped.map(([category, categoryHabits]) => (
          <div key={category} className="mb-3">
            <h5 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
              {category}
            </h5>
            <div className="space-y-1">
              {categoryHabits.map(habit => (
                <div key={habit.id} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span>{habit.emoji}</span>
                    <span className="text-sm text-gray-700">{habit.name}</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enabledIds.includes(habit.id)}
                      onChange={() => toggle(habit.id)}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-teal-500" />
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h4 className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span>📤</span> Data Export
        </h4>
        <p className="text-[11px] text-gray-400 mb-3">
          Download your habit and mood tracking data for analysis or backup.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => exportData('csv')}
            className="px-3 py-2 bg-teal-50 hover:bg-teal-100 text-teal-600 rounded-lg text-xs font-medium transition-colors"
          >
            ↓ Export CSV
          </button>
          <button
            onClick={() => exportData('json')}
            className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-xs font-medium transition-colors"
          >
            ↓ Export JSON
          </button>
          <span className="text-[10px] text-gray-300 self-center ml-1">
            (all data, no deletion)
          </span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <span>🗑️</span> Data Management
        </h4>
        <button
          onClick={() => {
            if (confirm('Delete ALL mood and habit data? This cannot be undone.')) {
              localStorage.removeItem('lifeos_mood_log');
              localStorage.removeItem('lifeos_habit_log');
              window.location.reload();
            }
          }}
          className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg text-xs font-medium transition-colors"
        >
          Delete All Data
        </button>
      </div>
    </div>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────

export default function HabitMoodDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('daily');
  const [currentDate, setCurrentDate] = useState(today());
  const [habits, setHabits] = useState<HabitDefinition[]>(DEFAULT_HABITS);
  const [moodLog, setMoodLog] = useState<MoodEntry[]>([]);
  const [habitLog, setHabitLog] = useState<HabitLog[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // Reload data
  const refresh = useCallback(() => setRefreshKey(k => k + 1), []);

  useEffect(() => {
    setMoodLog(getMoodLog());
    setHabitLog(getHabitLog());
    // Load enabled habits
    try {
      const raw = localStorage.getItem('lifeos_enabled_habits');
      if (raw) {
        const ids: string[] = JSON.parse(raw);
        setHabits(DEFAULT_HABITS.filter(h => ids.includes(h.id)));
      }
    } catch { /* ignore */ }
  }, [refreshKey]);

  const report = useMemo(() => computeCorrelationReport(habits), [habits, refreshKey]);
  const weekComparison = useMemo(() => computeWeekComparison(habits), [habits, refreshKey]);

  const currentMood = useMemo(
    () => moodLog.find(m => m.date === currentDate),
    [moodLog, currentDate],
  );

  const handleLogHabit = (entry: HabitLog) => {
    logHabit(entry);
    refresh();
  };

  const handleClearHabit = (habitId: string) => {
    clearHabitLog(currentDate, habitId);
    refresh();
  };

  const handleSetMood = (value: number) => {
    addMoodEntry({
      date: currentDate,
      value,
      createdAt: new Date().toISOString(),
    });
    refresh();
  };

  const handleDeleteMood = () => {
    deleteMoodEntry(currentDate);
    refresh();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-emerald-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔬</span>
            <h3 className="text-sm font-bold text-gray-800">Habit → Mood Tracker</h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-700 border border-teal-200">
              {report.dataDays}d
            </span>
          </div>
          <button
            onClick={() => setCurrentDate(today())}
            className="text-[10px] text-teal-600 hover:text-teal-700 font-medium"
          >
            Today
          </button>
        </div>
      </div>

      {/* Date nav */}
      {activeTab === 'daily' && (
        <div className="px-4 py-2 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <button
            onClick={() => {
              const d = new Date(currentDate + 'T12:00:00');
              d.setDate(d.getDate() - 1);
              setCurrentDate(d.toISOString().slice(0, 10));
            }}
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            ← Previous
          </button>
          <span className="text-[11px] font-medium text-gray-500">
            {currentDate === today() ? 'Today' : formatDate(currentDate)}
          </span>
          <button
            onClick={() => {
              const d = new Date(currentDate + 'T12:00:00');
              d.setDate(d.getDate() + 1);
              const next = d.toISOString().slice(0, 10);
              if (next <= today()) setCurrentDate(next);
            }}
            disabled={currentDate === today()}
            className="text-xs text-gray-400 hover:text-gray-600 disabled:text-gray-200 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      )}

      {/* Tab bar */}
      <div className="flex border-b border-gray-100">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-3 py-2.5 text-xs font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-teal-700 bg-teal-50/50'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className="mr-1">{tab.emoji}</span>
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-teal-500 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-4 max-h-[500px] overflow-y-auto">
        {activeTab === 'daily' && (
          <DailyLogTab
            date={currentDate}
            habits={habits}
            onLogHabit={handleLogHabit}
            onClearHabit={handleClearHabit}
            moodEntry={currentMood}
            onSetMood={handleSetMood}
            onDeleteMood={handleDeleteMood}
          />
        )}
        {activeTab === 'correlations' && (
          <CorrelationsTab report={report} weekComparison={weekComparison} habits={habits} />
        )}
        {activeTab === 'history' && (
          <HistoryTab
            moodLog={moodLog}
            habitLog={habitLog}
            habits={habits}
            onSelectDate={setCurrentDate}
          />
        )}
        {activeTab === 'settings' && (
          <SettingsTab habits={DEFAULT_HABITS} />
        )}
      </div>
    </div>
  );
}
