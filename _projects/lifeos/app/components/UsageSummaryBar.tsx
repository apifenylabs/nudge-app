'use client';

/**
 * UsageSummaryBar — Top-of-page usage summary bar for the LifeOS dashboard
 *
 * Shows a compact stats row at the top of the homepage with:
 *   - Active sessions (today)
 *   - Messages today
 *   - Top 3 most-used plugins with inline mini sparklines
 *
 * Only renders when there's actual usage data (no empty-state bar).
 * Blazing fast — reads from localStorage, no network calls.
 */

import { useState, useEffect, useMemo } from 'react';
import { getUsageSummary, type UsageSummary } from '@/app/lib/usage-analytics';
import MiniSparkline from './MiniSparkline';

// ─── Types ─────────────────────────────────────────────────────────

type TodayCounts = {
  sessions: number;
  messages: number;
};

// ─── Helpers ──────────────────────────────────────────────────────

function getTodayCounts(): TodayCounts {
  if (typeof window === 'undefined') return { sessions: 0, messages: 0 };
  try {
    const raw = localStorage.getItem('lifeos_usage_events');
    if (!raw) return { sessions: 0, messages: 0 };
    const events: any[] = JSON.parse(raw);
    const today = new Date().toISOString().split('T')[0];
    const todayEvents = events.filter((e) => e.timestamp?.startsWith(today));
    return {
      sessions: todayEvents.filter((e) => e.eventType === 'session_started').length,
      messages: todayEvents.filter((e) => e.eventType === 'message_sent').length,
    };
  } catch {
    return { sessions: 0, messages: 0 };
  }
}

// ─── Sub-components ──────────────────────────────────────────────

function StatPill({
  icon,
  label,
  value,
  active,
}: {
  icon: string;
  label: string;
  value: number;
  active: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
        active
          ? 'bg-teal-50 border-teal-200 shadow-sm'
          : 'bg-white border-gray-100 text-gray-400'
      }`}
    >
      <span className="text-sm">{icon}</span>
      <span className={`text-sm font-bold font-mono ${active ? 'text-teal-700' : 'text-gray-400'}`}>
        {value}
      </span>
      <span className={`text-[10px] hidden sm:inline ${active ? 'text-teal-600' : 'text-gray-400'}`}>
        {label}
      </span>
    </div>
  );
}

function TopPluginBadge({
  rank,
  pluginName,
  pluginId,
  sessions,
}: {
  rank: number;
  pluginName: string;
  pluginId: string;
  sessions: number;
}) {
  const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉';
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-gray-200 hover:border-teal-300 hover:bg-teal-50/30 transition-all group">
      <span className="text-xs">{medal}</span>
      <span className="text-[11px] font-medium text-gray-700 group-hover:text-teal-700 truncate max-w-[64px] sm:max-w-[100px]">
        {pluginName}
      </span>
      <div className="w-12 shrink-0">
        <MiniSparkline pluginId={pluginId} />
      </div>
      <span className="text-[10px] font-mono text-gray-400 hidden sm:inline">
        {sessions} session{sessions !== 1 ? 's' : ''}
      </span>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────

export default function UsageSummaryBar() {
  const [summary, setSummary] = useState<UsageSummary | null>(null);
  const [today, setToday] = useState<TodayCounts>({ sessions: 0, messages: 0 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Hydrate from localStorage on mount (client-only)
    setSummary(getUsageSummary());
    setToday(getTodayCounts());
    setReady(true);
  }, []);

  // Re-read every 60 seconds (for long-running sessions)
  useEffect(() => {
    if (!ready) return;
    const interval = setInterval(() => {
      setSummary(getUsageSummary());
      setToday(getTodayCounts());
    }, 60_000);
    return () => clearInterval(interval);
  }, [ready]);

  // Don't render anything until client-side hydration
  if (!ready) return null;

  // Don't render if no usage at all
  const hasUsage =
    summary &&
    (summary.totalSessions > 0 || summary.totalMessages > 0 || summary.activeDays > 0);

  if (!hasUsage) return null;

  const topPlugins = (summary?.pluginRankings?.slice(0, 3) || []);

  return (
    <div className="mb-8">
      <div className="relative">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-50/60 via-white to-emerald-50/60 rounded-2xl border border-teal-100/50" />

        <div className="relative px-4 py-3">
          {/* Label row */}
          <div className="flex items-center gap-1.5 mb-2.5">
            <span className="text-sm">📊</span>
            <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
              Your Activity
            </span>
            {summary && summary.activeDays > 0 && (
              <span className="text-[10px] text-gray-400 font-mono">
                · {summary.activeDays} active day{summary.activeDays > 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Today's Sessions */}
            <StatPill
              icon="💬"
              label="today"
              value={today.sessions}
              active={today.sessions > 0}
            />
            {/* Today's Messages */}
            <StatPill
              icon="✉️"
              label="messages today"
              value={today.messages}
              active={today.messages > 0}
            />

            {/* Separator dot */}
            {topPlugins.length > 0 && (
              <span className="text-gray-300 hidden sm:inline">·</span>
            )}

            {/* Top 3 plugins */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {topPlugins.map((p, i) => (
                <TopPluginBadge
                  key={p.pluginId}
                  rank={i + 1}
                  pluginName={p.pluginName}
                  pluginId={p.pluginId}
                  sessions={p.sessions}
                />
              ))}
            </div>

            {/* All-time totals — subtle, far right */}
            <div className="ml-auto hidden lg:flex items-center gap-2 text-[10px] text-gray-400">
              <span title="Total sessions">
                📋 {summary?.totalSessions ?? 0} total
              </span>
              <span>·</span>
              <span title="Total time">
                ⏱️ {summary && summary.totalTimeMinutes > 60
                  ? `${(summary.totalTimeMinutes / 60).toFixed(1)}h`
                  : `${summary?.totalTimeMinutes ?? 0}m`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
