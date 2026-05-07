'use client';

import { useState, useEffect } from 'react';
import { Sparkles, GitCommit, TrendingUp, Globe, Rocket, Code, Zap, Star, ChevronRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

// ─── Data ───────────────────────────────────────────────────────

interface UpdateItem {
  date: string;
  type: 'feature' | 'content' | 'infra' | 'seo';
  title: string;
  description: string;
  icon: string;
  link?: string;
}

const UPDATES: UpdateItem[] = [
  {
    date: '2026-05-03',
    type: 'feature',
    title: 'Long-Tail SEO Pages Launched',
    description: '51 programmatic landing pages for city-based family activity searches. Each page cross-references destinations by city and age group.',
    icon: '🔍',
    link: '/activity/things-to-do-in-tokyo-with-kids',
  },
  {
    date: '2026-05-03',
    type: 'feature',
    title: 'Pinterest Pin Generator',
    description: '583 ready-to-post pins generated with viral-optimized descriptions, hashtags, and overlays. First 30 pins batched for upload.',
    icon: '📌',
  },
  {
    date: '2026-05-03',
    type: 'infra',
    title: 'Flywheel Cross-Directory System',
    description: 'Family directory now links to EV Charging Asia (336 station links) and Luxury Family Travel (152 stay links). Widget on every destination page.',
    icon: '🔄',
  },
  {
    date: '2026-05-02',
    type: 'feature',
    title: 'Information Gain Layer',
    description: 'Real parent tips from verified sources. 562 destinations now have unique, actionable tips (96% coverage).',
    icon: '💡',
  },
  {
    date: '2026-05-02',
    type: 'feature',
    title: 'Price Comparison Widget',
    description: 'Klook & Viator affiliate links with best-price banners on every destination page.',
    icon: '💰',
  },
  {
    date: '2026-05-02',
    type: 'infra',
    title: 'Schema Hardening Phase 1-2',
    description: 'Revenue engine, metadata, and deep-linking infrastructure across all 583 destinations.',
    icon: '🏗️',
  },
  {
    date: '2026-05-01',
    type: 'content',
    title: '583 Destinations Live',
    description: 'Full directory across 248 cities in 40+ countries. Japan, Thailand, Vietnam, Korea, China, Singapore, and beyond.',
    icon: '🌏',
  },
  {
    date: '2026-04-28',
    type: 'infra',
    title: 'Comparison Tables Deployed',
    description: 'Side-by-side itinerary comparison for half-day vs full-day visits on every destination page.',
    icon: '📊',
  },
  {
    date: '2026-04-27',
    type: 'feature',
    title: 'Carousel & All Destinations Grid',
    description: 'Replaced static grids with responsive carousels. All Destinations section gets its own carousel.',
    icon: '🎠',
  },
  {
    date: '2026-04-26',
    type: 'infra',
    title: 'Spacing & Layout Fix',
    description: 'Removed persistent blank space on homepage. Zero mb-14 in rendered HTML.',
    icon: '📐',
  },
];

const TYPE_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  feature: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' },
  content: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  infra: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  seo: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
};

// ─── Metrics ────────────────────────────────────────────────────

function MetricCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
        <p className="text-lg font-bold text-gray-900">{value}</p>
        {sub && <p className="text-[10px] text-gray-400">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────

export default function BuildInPublicFeed() {
  const [collapsed, setCollapsed] = useState(true);
  const [stats, setStats] = useState({ destinations: 583, cities: 248, countries: 40, tips: 0 });

  useEffect(() => {
    fetch('/data/destinations.json')
      .then(r => r.json())
      .then(data => {
        const tipCount = data.reduce((a: number, d: any) => a + (d.tipsAndTricks?.length || 0), 0);
        setStats({
          destinations: data.length,
          cities: new Set(data.map((d: any) => d.city)).size,
          countries: new Set(data.map((d: any) => d.country)).size,
          tips: tipCount,
        });
      })
      .catch(() => {});
  }, []);

  const visibleUpdates = collapsed ? UPDATES.slice(0, 4) : UPDATES;

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="bg-gradient-to-br from-gray-50 to-slate-50/50 border border-gray-200 rounded-2xl p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-sm">
            <Rocket size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Building in Public</h2>
            <p className="text-xs text-gray-500">Daily updates on the Family Travel Asia directory build</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <MetricCard icon={<Globe size={16} />} label="Destinations" value={stats.destinations.toLocaleString()} />
          <MetricCard icon={<MapPin className="!p-0" size={16} />} label="Cities" value={stats.cities.toLocaleString()} />
          <MetricCard icon={<Star size={16} />} label="Parent Tips" value={stats.tips.toLocaleString()} />
          <MetricCard icon={<Zap size={16} />} label="Schema Fields" value="27" sub="per destination" />
        </div>

        {/* Changelog */}
        <div className="space-y-0">
          {visibleUpdates.map((update, idx) => {
            const style = TYPE_STYLES[update.type];
            return (
              <div key={idx} className={`flex gap-3 py-3 ${idx < visibleUpdates.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <div className="text-lg flex-shrink-0 mt-0.5">{update.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-gray-900">{update.title}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${style.bg} ${style.text} ${style.border} border`}>
                      {update.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{update.description}</p>
                  <span className="text-[10px] text-gray-400">{update.date}</span>
                  {update.link && (
                    <Link href={update.link} className="text-[10px] text-sky-600 hover:text-sky-700 ml-2 font-medium">
                      View →
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Expand/Collapse */}
        {UPDATES.length > 4 && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="mt-4 w-full text-center text-sm text-gray-500 hover:text-gray-700 font-medium py-2 bg-gray-100/50 rounded-xl transition-colors"
          >
            {collapsed ? `Show all ${UPDATES.length} updates ↓` : 'Show less ↑'}
          </button>
        )}

        {/* Bottom link */}
        <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-[10px] text-gray-400">Built with Next.js · Tailwind · Supabase · 27-field schema</p>
          <div className="flex items-center gap-3 text-[10px]">
            <Link href="/search" className="text-sky-600 hover:underline">Browse all →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapPin(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
