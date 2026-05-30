'use client';

/**
 * LifeOS — Plugins Index Page
 *
 * A browsable, filterable directory of all 9 LifeOS plugins.
 * Users can filter by category, search by name, or filter by status.
 *
 * SEO metadata is embedded in the component at render time.
 * UX: Category tabs, search bar, status filter, visual cards with gradients.
 */

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { PLUGINS } from '@/app/lib/plugin-registry';
import { PLUGIN_CATEGORIES, type PluginCategory } from '@/app/lib/plugin-manifest-schema';

// ─── Inline metadata helpers (replaces Next.js export for 'use client' pages) ───

interface CategoryMeta {
  id: string;
  label: string;
  emoji: string;
  description: string;
  count: number;
}

interface StatusMeta {
  id: string;
  label: string;
  count: number;
}

function inferCategory(pluginId: string): PluginCategory {
  const map: Record<string, PluginCategory> = {
    travel: 'lifestyle',
    finance: 'finance',
    health: 'health',
    career: 'career',
    learning: 'learning',
    family: 'lifestyle',
    home: 'home',
    social: 'lifestyle',
    relationships: 'relationships',
  };
  return map[pluginId] || 'productivity';
}

function buildCategories(): CategoryMeta[] {
  const catIds = Object.keys(PLUGIN_CATEGORIES) as PluginCategory[];
  return catIds.map((id) => {
    const cat = PLUGIN_CATEGORIES[id];
    const count = PLUGINS.filter((p) => inferCategory(p.id) === id).length;
    return {
      id,
      label: cat.label,
      emoji: cat.emoji,
      description: cat.description,
      count,
    };
  });
}

function buildStatuses(): StatusMeta[] {
  const counts: Record<string, number> = {};
  PLUGINS.forEach((p) => {
    counts[p.status] = (counts[p.status] || 0) + 1;
  });
  return ['active', 'beta', 'coming-soon'].map((id) => ({
    id,
    label: id === 'active' ? '🟢 Active' : id === 'beta' ? '🟡 Beta' : '🔜 Coming Soon',
    count: counts[id] || 0,
  }));
}

// ─── Status badge config ───

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  active: { label: '🟢 Active', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  beta: { label: '🟡 Beta', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  'coming-soon': { label: '🔜 Coming Soon', className: 'bg-gray-100 text-gray-500 border-gray-200' },
};

export default function PluginsIndexPage() {
  const plugins = PLUGINS;
  const categories = buildCategories();
  const statuses = buildStatuses();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return plugins.filter((p) => {
      if (selectedCategory && inferCategory(p.id) !== selectedCategory) return false;
      if (selectedStatus && p.status !== selectedStatus) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const catInfo = PLUGIN_CATEGORIES[inferCategory(p.id)];
        return (
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.features.some((f) => f.toLowerCase().includes(q)) ||
          catInfo.label.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [plugins, selectedCategory, selectedStatus, search]);

  const hasActiveFilters = selectedCategory || selectedStatus || search.trim();

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory(null);
    setSelectedStatus(null);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            All Plugins
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto mb-2">
            {plugins.length} AI-led copilot plugins for every area of your life.
          </p>
          <p className="text-sm text-gray-400">
            Each plugin is a specialized AI agent that asks, probes, researches, and guides — not just answers.
          </p>
        </div>
      </section>

      {/* ── Search + Filter Bar ── */}
      <section className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            {/* Search */}
            <div className="relative flex-1 w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search plugins…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400 text-gray-700 placeholder:text-gray-400"
              />
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                  !selectedCategory
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-teal-50 text-teal-700 border-teal-200'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {cat.emoji} {cat.label} ({cat.count})
                </button>
              ))}
            </div>
          </div>

          {/* Status chips + clear */}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Status:</span>
            {statuses.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedStatus(s.id === selectedStatus ? null : s.id)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-full border transition-colors ${
                  selectedStatus === s.id
                    ? 'bg-gray-800 text-white border-gray-800'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                }`}
              >
                {s.label} ({s.count})
              </button>
            ))}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="ml-auto text-[11px] text-gray-400 hover:text-gray-600 flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Results ── */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg mb-2">No plugins match your filters</p>
            <button
              onClick={clearFilters}
              className="text-sm text-teal-600 hover:text-teal-700 underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((plugin) => {
              const catInfo = PLUGIN_CATEGORIES[inferCategory(plugin.id)];
              const statusCfg = STATUS_CONFIG[plugin.status] || STATUS_CONFIG['coming-soon'];
              const isClickable = plugin.status === 'active' || plugin.status === 'beta';
              const card = (
                <div
                  className={`group relative bg-white border rounded-xl p-5 transition-all duration-200 ${
                    isClickable
                      ? 'border-gray-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-gray-300 cursor-pointer'
                      : 'border-gray-100 opacity-70'
                  }`}
                >
                  {/* Gradient accent bar */}
                  <div
                    className="absolute top-0 left-4 right-4 h-1 rounded-full opacity-60"
                    style={{ background: plugin.gradient }}
                  />

                  {/* Header */}
                  <div className="flex items-start justify-between mb-3 mt-1">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                        style={{
                          background: `${plugin.gradient.split(',')[0]}15`,
                          border: `1px solid ${plugin.gradient.split(',')[0].replace('linear-gradient(135deg, ', '').trim().split(' ')[0]}20`,
                        }}
                      >
                        {plugin.emoji}
                      </div>
                      <div>
                        <h2 className="text-sm font-semibold text-gray-900">{plugin.name}</h2>
                        <p className="text-[11px] text-gray-400">{catInfo.emoji} {catInfo.label}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full border ${statusCfg.className}`}>
                      {statusCfg.label}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">
                    {plugin.description}
                  </p>

                  {/* Features preview */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {plugin.features.slice(0, 2).map((f) => (
                      <span
                        key={f}
                        className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded-md border border-gray-100"
                      >
                        {f.length > 20 ? f.slice(0, 18) + '…' : f}
                      </span>
                    ))}
                    {plugin.features.length > 2 && (
                      <span className="text-[10px] text-gray-300">+{plugin.features.length - 2}</span>
                    )}
                  </div>

                  {/* Phase count + CTA */}
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                    <span className="text-[11px] text-gray-400">
                      {plugin.phases.length} phases
                    </span>
                    {isClickable ? (
                      <span className="text-[11px] font-medium text-teal-600 group-hover:translate-x-0.5 transition-transform">
                        Open →
                      </span>
                    ) : (
                      <span className="text-[11px] text-gray-300">Coming soon</span>
                    )}
                  </div>
                </div>
              );

              if (isClickable) {
                return (
                  <Link key={plugin.id} href={`/plugins/${plugin.id}`} className="block">
                    {card}
                  </Link>
                );
              }
              return <div key={plugin.id}>{card}</div>;
            })}
          </div>
        )}

        {/* ── Summary footer ── */}
        <div className="mt-10 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            Showing {filtered.length} of {plugins.length} plugins
            {selectedStatus ? ` · ${statuses.find((s) => s.id === selectedStatus)?.label}` : ''}
            {selectedCategory
              ? ` · ${categories.find((c) => c.id === selectedCategory)?.label}`
              : ''}
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-gray-800 hover:text-teal-600 transition-colors">
            ← Back to LifeOS Home
          </Link>
          <span className="text-xs text-gray-400">LifeOS · {plugins.length} plugins</span>
        </div>
      </footer>
    </main>
  );
}
