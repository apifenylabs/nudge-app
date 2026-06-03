'use client';

/**
 * LifeOS — Usage Dashboard (Plugin-Level)
 *
 * Shows per-plugin usage analytics: sessions, messages, time spent,
 * phase progression, and daily activity.
 *
 * Can be embedded in:
 * - Plugin detail page (`/plugins/[id]`) as a "Your Activity" section
 * - Standalone analytics page (`/analytics`)
 *
 * Design matches LifeOS design system (Tailwind, same visual language as
 * the plugin index page and chat view).
 */

import { useEffect, useState, useCallback } from 'react';
import { getPluginUsage, getUsageSummary, resetUsageData, trackEvent, type PluginUsage, type UsageSummary } from '@/app/lib/usage-analytics';
import SparklineTrend from './SparklineTrend';

// ─── Sub-components ────────────────────────────────────────────────

function StatCard({ label, value, emoji, trend, pluginId, pct }: {
  label: string;
  value: string | number;
  emoji: string;
  trend?: 'up' | 'down' | 'neutral';
  /** If set, renders a SparklineTrend inline instead of a plain arrow */
  pluginId?: string;
  /** Completion percentage for the sparkline (0-100). Defaults to value if omitted and pluginId is set. */
  pct?: number;
}) {
  const sparklinePct = pct ?? (typeof value === 'number' ? Math.min(value, 100) : 50);
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between mb-1">
        <span className="text-lg">{emoji}</span>
        {pluginId && (
          <div className="w-20 max-w-[80px]">
            <SparklineTrend pluginId={pluginId} currentPct={sparklinePct} simplified />
          </div>
        )}
        {!pluginId && trend && (
          <span className={`text-[10px] font-mono ${
            trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-red-400' : 'text-gray-400'
          }`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
          </span>
        )}
      </div>
      <div className="text-xl sm:text-2xl font-bold text-gray-900 tabular-nums">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      <div className="text-[11px] text-gray-400 mt-0.5">{label}</div>
    </div>
  );
}

function DailyActivityChart({ dailyStats }: { dailyStats: Record<string, number> }) {
  const days = Object.entries(dailyStats)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-14); // Last 14 days

  if (days.length === 0) {
    return (
      <div className="text-center py-6 text-xs text-gray-400">
        No activity data yet. Start a conversation to see your activity.
      </div>
    );
  }

  const maxCount = Math.max(...days.map(([, c]) => c), 1);

  return (
    <div className="space-y-2">
      <div className="flex items-end gap-1 h-16">
        {days.map(([date, count]) => {
          const height = (count / maxCount) * 100;
          const isToday = date === new Date().toISOString().split('T')[0];
          const dayLabel = new Date(date + 'T00:00:00').toLocaleDateString(undefined, {
            weekday: 'short',
          });
          return (
            <div key={date} className="flex-1 flex flex-col items-center gap-0.5">
              <div
                className={`w-full rounded-sm transition-all ${
                  isToday ? 'bg-teal-400' : 'bg-teal-200'
                }`}
                style={{ height: `${Math.max(height, 4)}%` }}
                title={`${date}: ${count} session${count !== 1 ? 's' : ''}`}
              />
              <span className="text-[8px] text-gray-400">{dayLabel}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PhaseBreakdown({ phaseProgressions }: { phaseProgressions: Record<string, number> }) {
  const entries = Object.entries(phaseProgressions)
    .sort(([, a], [, b]) => b - a);

  if (entries.length === 0) {
    return (
      <div className="text-center py-4 text-xs text-gray-400">
        No phase progression data yet.
      </div>
    );
  }

  const maxCount = Math.max(...entries.map(([, c]) => c), 1);

  return (
    <div className="space-y-2">
      {entries.map(([phaseId, count]) => {
        const pct = (count / maxCount) * 100;
        return (
          <div key={phaseId} className="flex items-center gap-2">
            <span className="text-xs text-gray-600 w-20 truncate shrink-0 font-medium">
              {phaseId}
            </span>
            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-[11px] text-gray-400 tabular-nums w-6 text-right shrink-0">
              {count}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function PluginRankingTable({ rankings }: { rankings: UsageSummary['pluginRankings'] }) {
  if (rankings.length === 0) {
    return (
      <div className="text-center py-6 text-xs text-gray-400">
        No data yet.
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {rankings.map((p, i) => (
        <div
          key={p.pluginId}
          className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className={`text-xs font-mono ${
              i === 0 ? 'text-amber-500' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-orange-400' : 'text-gray-300'
            }`}>
              #{i + 1}
            </span>
            <span className="text-sm text-gray-800 truncate">{p.pluginName}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400 tabular-nums">
            <span>{p.sessions} sessions</span>
            <span>{p.messages} msgs</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Full Plugin Usage Section (for plugin detail page) ────────────

export function PluginUsageSection({ pluginId, pluginName }: { pluginId: string; pluginName: string }) {
  const [usage, setUsage] = useState<PluginUsage | null>(null);
  const [showReset, setShowReset] = useState(false);

  const refresh = useCallback(() => {
    setUsage(getPluginUsage(pluginId));
  }, [pluginId]);

  useEffect(() => {
    refresh();
    // Refresh on visibility change (user returns to tab)
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') refresh();
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [refresh]);

  const handleReset = () => {
    resetUsageData();
    setUsage(null);
    setShowReset(false);
  };

  if (!usage) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">📊</span>
          <h3 className="text-sm font-semibold text-gray-800">Your Activity</h3>
        </div>
        <p className="text-xs text-gray-400">
          No activity logged for {pluginName} yet. Start a conversation to see your stats.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">📊</span>
          <h3 className="text-sm font-semibold text-gray-800">Your Activity</h3>
        </div>
        <button
          onClick={() => setShowReset(!showReset)}
          className="text-[10px] text-gray-400 hover:text-red-500 transition-colors"
          title="Reset analytics"
        >
          ⚙
        </button>
      </div>

      {showReset && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-xs text-red-600 mb-2">
            This will delete all your usage data locally. This cannot be undone.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-1 text-xs font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={() => setShowReset(false)}
              className="px-3 py-1 text-xs font-medium text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        <StatCard label="Sessions" value={usage.totalSessions} emoji="💬" pluginId={pluginId} pct={Math.min(usage.totalSessions, 100)} />
        <StatCard label="Messages" value={usage.totalMessages} emoji="✉️" />
        <StatCard label="Time Spent" value={`${usage.totalTimeMinutes}m`} emoji="⏱" />
        <StatCard
          label="Last Used"
          value={usage.lastUsed ? new Date(usage.lastUsed + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Never'}
          emoji="📅"
        />
      </div>

      {/* Daily activity */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">Daily Activity (last 14 days)</h4>
        <DailyActivityChart dailyStats={usage.dailyStats} />
      </div>

      {/* Phase progression */}
      {Object.keys(usage.phaseProgressions).length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">Phase Progressions</h4>
          <PhaseBreakdown phaseProgressions={usage.phaseProgressions} />
        </div>
      )}
    </div>
  );
}

// ─── Full Analytics Page (standalone) ──────────────────────────────

export default function UsageAnalyticsPage() {
  const [summary, setSummary] = useState<UsageSummary | null>(null);

  useEffect(() => {
    setSummary(getUsageSummary());
    // Auto-refresh on return
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') setSummary(getUsageSummary());
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const isFresh = summary && summary.totalSessions === 0;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">📊</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Usage Analytics</h1>
          </div>
          <p className="text-sm text-gray-500 max-w-lg">
            See how you&apos;re using LifeOS — sessions, messages, time spent, and plugin rankings.
            All data is stored locally on your device.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        {isFresh ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">📈</span>
            </div>
            <p className="text-gray-500 text-base mb-1">No usage data yet</p>
            <p className="text-sm text-gray-400">
              Start a conversation in any plugin to see your analytics.
            </p>
          </div>
        ) : (
          <>
            {/* Summary stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <StatCard label="Total Sessions" value={summary?.totalSessions || 0} emoji="💬" pluginId="_all" pct={Math.min(summary?.totalSessions || 0, 100)} />
              <StatCard label="Total Messages" value={summary?.totalMessages || 0} emoji="✉️" />
              <StatCard label="Time Spent" value={summary ? `${summary.totalTimeMinutes}m` : '0m'} emoji="⏱" />
              <StatCard label="Active Days" value={summary?.activeDays || 0} emoji="📅" />
            </div>

            {/* Plugin rankings */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-gray-800 mb-3">Most Used Plugins</h2>
              {summary?.mostUsedPlugin && (
                <p className="text-xs text-gray-400 mb-3">
                  🏆 Most active: <span className="font-medium text-gray-600">{summary.mostUsedPlugin}</span>
                </p>
              )}
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <PluginRankingTable rankings={summary?.pluginRankings || []} />
              </div>
            </div>

            {/* Data note */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-[11px] text-gray-400">
                All usage data is stored locally on your device via localStorage.
                {isSupabaseConfigured() && ' Sync to Supabase happens when configured.'}
              </p>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

// Re-export for convenience
function isSupabaseConfigured(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('lifeos_supabase_configured') === 'true';
}
