'use client';

/**
 * LifeOS — Quick Actions Dashboard
 *
 * One-click preset combinations that launch multiple plugins at once.
 * Saves recent launches to localStorage for quick re-access.
 *
 * SEO metadata is embedded in the component at render time.
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';

// ─── Types ─────────────────────────────────────────────────────────

type PluginRef = {
  id: string;
  name: string;
  emoji: string;
};

type Preset = {
  id: string;
  name: string;
  description: string;
  plugins: PluginRef[];
  estimatedMinutes: number;
  gradient: string;
  icon: string;
};

type LaunchRecord = {
  presetId: string;
  presetName: string;
  plugins: PluginRef[];
  launchedAt: number;
};

// ─── Preset Definitions ────────────────────────────────────────────

const PLUGIN_MAP: Record<string, PluginRef> = {
  travel: { id: 'travel', name: 'Travel OS', emoji: '✈️' },
  finance: { id: 'finance', name: 'Finance OS', emoji: '💰' },
  health: { id: 'health', name: 'Health OS', emoji: '💪' },
  career: { id: 'career', name: 'Career OS', emoji: '💼' },
  learning: { id: 'learning', name: 'Learning OS', emoji: '📚' },
  family: { id: 'family', name: 'Family OS', emoji: '❤️' },
  home: { id: 'home', name: 'Home OS', emoji: '🏠' },
  social: { id: 'social', name: 'Social OS', emoji: '🎉' },
  relationships: { id: 'relationships', name: 'Relationships OS', emoji: '💑' },
};

const PRESETS: Preset[] = [
  {
    id: 'weekend-planner',
    name: 'Weekend Planner',
    description: 'Plan a weekend getaway with friends — find a destination, sort budget, and coordinate the crew.',
    plugins: [PLUGIN_MAP.travel, PLUGIN_MAP.social, PLUGIN_MAP.finance],
    estimatedMinutes: 20,
    gradient: 'linear-gradient(135deg, #06B6D4, #D946EF, #10B981)',
    icon: '🗓️',
  },
  {
    id: 'health-reset',
    name: 'Health Reset',
    description: 'Kickstart a wellness routine — set health baselines, start a learning habit, and involve family.',
    plugins: [PLUGIN_MAP.health, PLUGIN_MAP.learning, PLUGIN_MAP.family],
    estimatedMinutes: 15,
    gradient: 'linear-gradient(135deg, #F43F5E, #F59E0B, #EC4899)',
    icon: '🔄',
  },
  {
    id: 'career-sprint',
    name: 'Career Sprint',
    description: 'Level up at work — build a career strategy, learn a new skill, and check your finances.',
    plugins: [PLUGIN_MAP.career, PLUGIN_MAP.learning, PLUGIN_MAP.finance],
    estimatedMinutes: 25,
    gradient: 'linear-gradient(135deg, #8B5CF6, #F59E0B, #10B981)',
    icon: '⚡',
  },
  {
    id: 'home-manager',
    name: 'Home Manager',
    description: 'Get the household in order — tackle projects, coordinate family chores, and plan social events.',
    plugins: [PLUGIN_MAP.home, PLUGIN_MAP.family, PLUGIN_MAP.social],
    estimatedMinutes: 20,
    gradient: 'linear-gradient(135deg, #EAB308, #EC4899, #D946EF)',
    icon: '🏡',
  },
  {
    id: 'finance-deep-dive',
    name: 'Finance Deep Dive',
    description: 'Get your money right — audit finances, plan career moves, and invest in learning.',
    plugins: [PLUGIN_MAP.finance, PLUGIN_MAP.career, PLUGIN_MAP.learning],
    estimatedMinutes: 30,
    gradient: 'linear-gradient(135deg, #10B981, #8B5CF6, #F59E0B)',
    icon: '📊',
  },
  {
    id: 'relationship-checkin',
    name: 'Relationship Check-in',
    description: 'Nurture what matters — connect with your partner, build social bonds, and check your wellbeing.',
    plugins: [PLUGIN_MAP.relationships, PLUGIN_MAP.social, PLUGIN_MAP.health],
    estimatedMinutes: 15,
    gradient: 'linear-gradient(135deg, #EF4444, #D946EF, #F43F5E)',
    icon: '💞',
  },
  {
    id: 'mindful-morning',
    name: 'Mindful Morning',
    description: 'Start your day centred — practice mindfulness, set health intentions, and plan a learning goal.',
    plugins: [
      { id: 'mindfulness', name: 'Mindfulness OS', emoji: '🧘' },
      PLUGIN_MAP.health,
      PLUGIN_MAP.learning,
    ],
    estimatedMinutes: 10,
    gradient: 'linear-gradient(135deg, #818CF8, #F43F5E, #F59E0B)',
    icon: '🌅',
  },
  {
    id: 'life-audit',
    name: 'Life Audit',
    description: 'Step back and take stock — assess your finances, career trajectory, and personal health all at once.',
    plugins: [PLUGIN_MAP.finance, PLUGIN_MAP.career, PLUGIN_MAP.health],
    estimatedMinutes: 30,
    gradient: 'linear-gradient(135deg, #0D9488, #7C3AED, #E11D48)',
    icon: '🔍',
  },
];

// ─── Helpers ───────────────────────────────────────────────────────

const STORAGE_KEY = 'lifeos_quick_actions_recent';

function loadRecent(): LaunchRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.slice(0, 10);
  } catch {
    return [];
  }
}

function saveRecent(record: LaunchRecord) {
  try {
    const existing = loadRecent();
    // Remove duplicate preset
    const filtered = existing.filter((r) => r.presetId !== record.presetId);
    const updated = [record, ...filtered].slice(0, 10);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // localStorage not available
  }
}

function formatTimeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

// ─── Components ────────────────────────────────────────────────────

function PresetCard({
  preset,
  onLaunch,
}: {
  preset: Preset;
  onLaunch: (preset: Preset) => void;
}) {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-2xl p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-transparent">
      {/* Gradient border glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `${preset.gradient}10`,
          border: '1px solid transparent',
          backgroundClip: 'padding-box',
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
              style={{ background: `${preset.gradient}15`, border: '1px solid rgba(0,0,0,0.05)' }}
            >
              {preset.icon}
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">{preset.name}</h3>
              <p className="text-xs text-gray-400 mt-0.5">
                {preset.plugins.length} plugins · ~{preset.estimatedMinutes} min session
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">
          {preset.description}
        </p>

        {/* Plugin chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {preset.plugins.map((p) => (
            <span
              key={p.id}
              className="inline-flex items-center gap-1 text-[10px] font-medium text-gray-600 bg-gray-50 px-2 py-1 rounded-md border border-gray-100"
            >
              <span>{p.emoji}</span>
              <span>{p.name}</span>
            </span>
          ))}
        </div>

        {/* Launch button */}
        <button
          onClick={() => onLaunch(preset)}
          className="w-full py-2 rounded-xl text-sm font-medium transition-all duration-200 bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:from-teal-600 hover:to-emerald-600 hover:shadow-md hover:shadow-teal-200/50 active:scale-[0.98]"
        >
          Launch →
        </button>
      </div>
    </div>
  );
}

function RecentLaunches({
  records,
  onClear,
}: {
  records: LaunchRecord[];
  onClear: () => void;
}) {
  if (records.length === 0) return null;

  return (
    <section className="mt-12 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-800">🕐 Recent Launches</h2>
        <button
          onClick={onClear}
          className="text-[11px] text-gray-400 hover:text-gray-600 transition-colors"
        >
          Clear history
        </button>
      </div>

      <div className="space-y-2">
        {records.map((record) => (
          <div
            key={`${record.presetId}-${record.launchedAt}`}
            className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3 hover:border-gray-200 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex items-center gap-1">
                {record.plugins.map((p) => (
                  <span key={p.id} className="text-sm" title={p.name}>
                    {p.emoji}
                  </span>
                ))}
              </div>
              <span className="text-sm font-medium text-gray-800 truncate">
                {record.presetName}
              </span>
              <span className="text-[11px] text-gray-400 whitespace-nowrap">
                {formatTimeAgo(record.launchedAt)}
              </span>
            </div>
            <span className="text-[10px] text-gray-300">
              {record.plugins.length} plugins
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────

export default function QuickActionsPage() {
  const [recent, setRecent] = useState<LaunchRecord[]>([]);
  const [launchedPreset, setLaunchedPreset] = useState<string | null>(null);

  useEffect(() => {
    setRecent(loadRecent());
  }, []);

  const handleLaunch = (preset: Preset) => {
    const record: LaunchRecord = {
      presetId: preset.id,
      presetName: preset.name,
      plugins: preset.plugins,
      launchedAt: Date.now(),
    };
    saveRecent(record);
    setRecent(loadRecent());
    setLaunchedPreset(preset.name);

    // Clear launch toast after 3s
    setTimeout(() => setLaunchedPreset(null), 3000);
  };

  const handleClearHistory = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setRecent([]);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-20 text-center">
          <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-200/50">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 16.5h3m-3-3h3m-3-3h3m-6 0h.008M12 18.75a9.75 9.75 0 010 19.5 9.75 9.75 0 010-19.5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            Quick Actions
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto mb-2">
            Launch multi-plugin sessions with one click.
          </p>
          <p className="text-sm text-gray-400">
            Preset combinations that tackle common life situations — no manual plugin switching needed.
          </p>
        </div>

        {/* Launch toast */}
        {launchedPreset && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-bounce">
            <div className="bg-gray-900 text-white text-sm px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>
                <strong>{launchedPreset}</strong> launched! Open the plugins to start.
              </span>
            </div>
          </div>
        )}
      </section>

      {/* ── Preset Grid ── */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRESETS.map((preset) => (
            <PresetCard key={preset.id} preset={preset} onLaunch={handleLaunch} />
          ))}
        </div>

        {/* Summary count */}
        <div className="mt-6 text-center">
          <span className="text-[11px] text-gray-400">
            {PRESETS.length} preset combinations covering {new Set(PRESETS.flatMap((p) => p.plugins.map((pl) => pl.id))).size} of 9 plugins
          </span>
        </div>
      </section>

      {/* ── Recent Launches ── */}
      <section className="max-w-5xl mx-auto px-4">
        <RecentLaunches records={recent} onClear={handleClearHistory} />
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-8 mt-8">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-gray-800 hover:text-teal-600 transition-colors">
            ← Back to LifeOS Home
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/plugins" className="text-xs text-gray-400 hover:text-teal-600 transition-colors">
              🧩 All Plugins
            </Link>
            <Link href="/analytics" className="text-xs text-gray-400 hover:text-teal-600 transition-colors">
              📊 Analytics
            </Link>
            <span className="text-xs text-gray-400">LifeOS · Quick Actions</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
