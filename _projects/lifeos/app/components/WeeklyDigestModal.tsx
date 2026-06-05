'use client';

import { useState, useEffect } from 'react';
import { generateWeeklyDigest, downloadWeeklyDigest, type WeeklyDigest, type MindfulnessDigestData, type HealthDigestData, type HobbyDigestData } from '../lib/weekly-digest';

export default function WeeklyDigestModal({ onClose }: { onClose: () => void }) {
  const [digest, setDigest] = useState<WeeklyDigest | null>(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const base = generateWeeklyDigest();
    setDigest(base);

    // Try to enrich with adapter data (lightweight — only reads cached adapters)
    async function enrichAll() {
      if (!base) return;
      try {
        const { queryCachedAdapterData, queryCachedHealthData, queryCachedHobbyData } = await import('../lib/weekly-digest');
        const [mindfulness, health, hobbies] = await Promise.all([
          queryCachedAdapterData(),
          queryCachedHealthData(),
          queryCachedHobbyData(),
        ]);
        setDigest(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            mindfulnessData: mindfulness.length > 0 ? mindfulness : prev.mindfulnessData,
            healthData: health.length > 0 ? health : prev.healthData,
            hobbyData: hobbies.length > 0 ? hobbies : prev.hobbyData,
          };
        });
      } catch {
        // ignore — adapter enrichment is non-blocking
      }
    }
    enrichAll();
  }, []);

  const handleCopy = async () => {
    if (!digest) return;
    await navigator.clipboard.writeText(digest.markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!digest) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-8 max-w-lg w-full mx-4 text-center">
          <p className="text-gray-500">Not enough usage data yet. Start using LifeOS plugins to generate your weekly digest.</p>
          <button onClick={onClose} className="mt-4 text-sm text-teal-600 hover:text-teal-700 font-medium">Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-2xl w-full mx-4 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              🦊 Weekly Digest
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">{digest.dateRange}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="px-6 py-4 grid grid-cols-3 gap-3">
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-3 text-center border border-teal-100">
            <div className="text-2xl font-bold text-teal-700">{digest.totals.sessions}</div>
            <div className="text-xs text-teal-600 mt-0.5">Sessions</div>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-3 text-center border border-indigo-100">
            <div className="text-2xl font-bold text-indigo-700">{digest.totals.messages}</div>
            <div className="text-xs text-indigo-600 mt-0.5">Messages</div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-3 text-center border border-amber-100">
            <div className="text-2xl font-bold text-amber-700">{digest.totals.activeDays}</div>
            <div className="text-xs text-amber-600 mt-0.5">Active Days</div>
          </div>
        </div>

        {/* Mindfulness Adapter Data */}
        {digest.mindfulnessData.length > 0 ? (
          <div className="px-6 mb-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">🧘 Mindfulness Sync</h3>
            <div className="grid grid-cols-1 gap-2">
              {digest.mindfulnessData.map((md) => (
                <MindfulnessCard key={md.provider} data={md} />
              ))}
            </div>
          </div>
        ) : (
          <div className="px-6 mb-3">
            <a
              href="/plugins/mindfulness"
              className="group flex items-center gap-2 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl px-4 py-3 border border-teal-100 hover:border-teal-300 hover:shadow-sm transition-all"
            >
              <span className="text-lg">🧘</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-teal-700 group-hover:text-teal-800 transition-colors">
                  Connect a mindfulness app
                </p>
                <p className="text-xs text-teal-500 mt-0.5">
                  Link Headspace or Calm for meditation stats in your weekly digest
                </p>
              </div>
              <svg className="w-4 h-4 text-teal-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        )}

        {/* Health OS Adapter Data */}
        {digest.healthData.length > 0 ? (
          <div className="px-6 mb-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">❤️ Health Sync</h3>
            <div className="grid grid-cols-1 gap-2">
              {digest.healthData.map((hd) => (
                <HealthCard key={hd.provider} data={hd} />
              ))}
            </div>
          </div>
        ) : null}

        {/* Hobbies OS Adapter Data */}
        {digest.hobbyData.length > 0 ? (
          <div className="px-6 mb-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">🎯 Learning Sync</h3>
            <div className="grid grid-cols-1 gap-2">
              {digest.hobbyData.map((hd) => (
                <HobbyCard key={hd.provider} data={hd} />
              ))}
            </div>
          </div>
        ) : null}

        {/* Top Plugins */}
        {digest.topPlugins.length > 0 && (
          <div className="px-6 mb-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">🔥 Top Plugins</h3>
            <div className="space-y-1.5">
              {digest.topPlugins.map((p, i) => (
                <div key={p.name} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">
                    <span className="text-teal-500 font-mono mr-2">#{i + 1}</span>
                    {p.name}
                  </span>
                  <span className="text-gray-400 text-xs">{p.sessions} sessions · {p.messages} msgs</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Daily Activity Bar Chart */}
        {digest.dailyBreakdown.length > 0 && (
          <div className="px-6 mb-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">📅 Daily Activity</h3>
            <div className="flex items-end gap-2 h-16">
              {digest.dailyBreakdown.map((d) => {
                const max = Math.max(...digest.dailyBreakdown.map((x) => x.sessions), 1);
                const height = Math.max((d.sessions / max) * 100, d.sessions > 0 ? 20 : 4);
                return (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-gray-400">{d.sessions}</span>
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-teal-400 to-teal-300 transition-all"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-[10px] text-gray-500">{d.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Archetype */}
        {digest.archetype && (
          <div className="px-6 mb-3">
            <div className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 text-xs font-medium px-2.5 py-1 rounded-full border border-purple-200">
              {digest.archetype.emoji} {digest.archetype.name} tendency this period
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center gap-3">
          <button
            onClick={handleCopy}
            className={`flex-1 flex items-center justify-center gap-2 text-sm font-medium rounded-xl py-2.5 transition-all ${
              copied
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
            }`}
          >
            {copied ? (
              <>✅ Copied!</>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy Markdown
              </>
            )}
          </button>
          <button
            onClick={() => downloadWeeklyDigest()}
            className="flex-1 flex items-center justify-center gap-2 text-sm font-medium bg-teal-600 text-white rounded-xl py-2.5 hover:bg-teal-700 transition-all border border-teal-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download .md
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Mindfulness Adapter Card ──────────────────────────────────── */

function MindfulnessCard({ data }: { data: MindfulnessDigestData }) {
  const providerColors: Record<string, { bg: string; text: string; label: string; emoji: string }> = {
    headspace: { bg: 'from-orange-50 to-amber-50', text: 'text-orange-700', label: 'Headspace', emoji: '🧡' },
    calm: { bg: 'from-blue-50 to-indigo-50', text: 'text-blue-700', label: 'Calm', emoji: '💙' },
  };

  const colors = providerColors[data.provider] || {
    bg: 'from-teal-50 to-emerald-50',
    text: 'text-teal-700',
    label: data.provider.charAt(0).toUpperCase() + data.provider.slice(1),
    emoji: '🧘',
  };

  const moodDisplay = data.averageMoodDelta > 0
    ? `+${data.averageMoodDelta.toFixed(1)}`
    : data.averageMoodDelta.toFixed(1);

  return (
    <div className={`bg-gradient-to-r ${colors.bg} rounded-xl p-3 border border-gray-100`}>
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs font-semibold ${colors.text}`}>
          {colors.emoji} {colors.label}
        </span>
        <span className="text-xs text-gray-400">{data.currentStreak} day streak</span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <div className={`text-lg font-bold ${colors.text}`}>{Math.round(data.totalMinutes)}</div>
          <div className="text-[10px] text-gray-500">min meditated</div>
        </div>
        <div>
          <div className={`text-lg font-bold ${colors.text}`}>{data.totalSessions}</div>
          <div className="text-[10px] text-gray-500">sessions</div>
        </div>
        <div>
          <div className={`text-lg font-bold ${data.averageMoodDelta >= 0 ? 'text-green-600' : 'text-red-500'}`}>
            {moodDisplay}
          </div>
          <div className="text-[10px] text-gray-500">avg mood lift</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Health Adapter Card ──────────────────────────────────── */

function HealthCard({ data }: { data: HealthDigestData }) {
  const providerConfig: Record<string, { bg: string; text: string; label: string; emoji: string }> = {
    oura: { bg: 'from-purple-50 to-indigo-50', text: 'text-purple-700', label: 'Oura', emoji: '💍' },
    fitbit: { bg: 'from-blue-50 to-cyan-50', text: 'text-blue-700', label: 'Fitbit', emoji: '⌚' },
    apple_health: { bg: 'from-red-50 to-rose-50', text: 'text-red-700', label: 'Apple Health', emoji: '🍎' },
  };

  const cfg = providerConfig[data.provider] || {
    bg: 'from-gray-50 to-slate-50',
    text: 'text-gray-700',
    label: data.provider.charAt(0).toUpperCase() + data.provider.slice(1),
    emoji: '❤️',
  };

  return (
    <div className={`bg-gradient-to-r ${cfg.bg} rounded-xl p-3 border border-gray-100`}>
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs font-semibold ${cfg.text}`}>
          {cfg.emoji} {cfg.label}
        </span>
        <span className="text-xs text-gray-400">{data.stepsToday.toLocaleString()} steps today</span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <div className={`text-lg font-bold ${cfg.text}`}>{data.sleepHoursAvg > 0 ? data.sleepHoursAvg.toFixed(1) : '—'}</div>
          <div className="text-[10px] text-gray-500">avg sleep hrs</div>
        </div>
        <div>
          <div className={`text-lg font-bold ${cfg.text}`}>{data.workoutMinutes}</div>
          <div className="text-[10px] text-gray-500">workout min</div>
        </div>
        <div>
          <div className={`text-lg font-bold ${cfg.text}`}>{data.workoutsCount}</div>
          <div className="text-[10px] text-gray-500">workouts</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Hobby Adapter Card ───────────────────────────────────── */

function HobbyCard({ data }: { data: HobbyDigestData }) {
  const providerConfig: Record<string, { bg: string; text: string; label: string; emoji: string }> = {
    skillshare: { bg: 'from-pink-50 to-rose-50', text: 'text-pink-700', label: 'Skillshare', emoji: '🎨' },
    udemy: { bg: 'from-violet-50 to-purple-50', text: 'text-violet-700', label: 'Udemy', emoji: '📚' },
    youtube: { bg: 'from-red-50 to-orange-50', text: 'text-red-700', label: 'YouTube', emoji: '▶️' },
  };

  const cfg = providerConfig[data.provider] || {
    bg: 'from-gray-50 to-slate-50',
    text: 'text-gray-700',
    label: data.provider.charAt(0).toUpperCase() + data.provider.slice(1),
    emoji: '🎯',
  };

  return (
    <div className={`bg-gradient-to-r ${cfg.bg} rounded-xl p-3 border border-gray-100`}>
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs font-semibold ${cfg.text}`}>
          {cfg.emoji} {cfg.label}
        </span>
        <span className="text-xs text-gray-400">{data.projectsCompleted} projects</span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <div className={`text-lg font-bold ${cfg.text}`}>{data.totalHours.toFixed(1)}</div>
          <div className="text-[10px] text-gray-500">hours this month</div>
        </div>
        <div>
          <div className={`text-lg font-bold ${cfg.text}`}>{data.activeHobbies}</div>
          <div className="text-[10px] text-gray-500">active hobbies</div>
        </div>
        <div>
          <div className={`text-lg font-bold ${cfg.text}`}>{data.milestonesReached}</div>
          <div className="text-[10px] text-gray-500">milestones</div>
        </div>
      </div>
    </div>
  );
}
