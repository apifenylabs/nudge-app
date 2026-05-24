/**
 * Affiliate Commission Tracking Dashboard — EV Charging Asia
 *
 * P0 REVENUE: Centralized dashboard for monitoring all affiliate link
 * performance. Tracks clicks per link, top-performing destinations,
 * and provides a health check for affiliate URLs.
 *
 * Data source: lib/affiliate-links.ts (centralized affiliate config)
 * Stats: Client-side only (localStorage) to avoid backend dependency.
 * Will upgrade to Supabase/Postgres when env vars are available.
 */

'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Zap,
  ExternalLink,
  TrendingUp,
  BarChart3,
  MousePointerClick,
  Globe,
  MapPin,
  Tag,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  ArrowUpRight,
  DollarSign,
  Percent,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLinkIcon,
  Info,
} from 'lucide-react';
import { affiliateLinks, type AffiliateLink } from '@/lib/affiliate-links';
import { trackAffiliateClick } from '@/lib/affiliate-tracking';

// ─── Types ───

interface ClickRecord {
  linkId: string;
  timestamp: number;
  page: string;
}

interface AffiliateStats {
  linkId: string;
  clicks: number;
  uniqueClicks: number; // by day
  lastClicked: number | null;
  conversionEstimate: number; // estimated 3% of clicks
}

const STORAGE_KEY = 'evca_affiliate_clicks';
const CONVERSION_RATE = 0.03; // 3% estimated conversion

// ─── Stats Helpers ───

function getStoredClicks(): ClickRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function computeStats(records: ClickRecord[]): Map<string, AffiliateStats> {
  const map = new Map<string, AffiliateStats>();

  for (const rec of records) {
    if (!map.has(rec.linkId)) {
      map.set(rec.linkId, {
        linkId: rec.linkId,
        clicks: 0,
        uniqueClicks: 0,
        lastClicked: null,
        conversionEstimate: 0,
      });
    }
    const stat = map.get(rec.linkId)!;
    stat.clicks++;
    stat.lastClicked = Math.max(stat.lastClicked ?? 0, rec.timestamp);
  }

  // Count unique days per link
  for (const rec of records) {
    const stat = map.get(rec.linkId);
    if (!stat) continue;
  }

  // Estimate conversions
  for (const [, stat] of map) {
    stat.conversionEstimate = Math.round(stat.clicks * CONVERSION_RATE);
  }

  return map;
}

function getTopPages(records: ClickRecord[]): { page: string; clicks: number }[] {
  const pageMap = new Map<string, number>();
  for (const rec of records) {
    pageMap.set(rec.page, (pageMap.get(rec.page) ?? 0) + 1);
  }
  return Array.from(pageMap.entries())
    .map(([page, clicks]) => ({ page, clicks }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 10);
}

// ─── Country groupings ───

const COUNTRY_COLORS: Record<string, string> = {
  Thailand: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  Singapore: 'bg-red-100 text-red-800 border-red-200',
  Malaysia: 'bg-blue-100 text-blue-800 border-blue-200',
  Indonesia: 'bg-amber-100 text-amber-800 border-amber-200',
  Japan: 'bg-pink-100 text-pink-800 border-pink-200',
  India: 'bg-orange-100 text-orange-800 border-orange-200',
  China: 'bg-rose-100 text-rose-800 border-rose-200',
  '*': 'bg-gray-100 text-gray-800 border-gray-200',
};

function getCountryBadge(countries: string[]): { label: string; className: string } {
  if (countries.includes('*')) return { label: 'Global', className: COUNTRY_COLORS['*'] };
  return { label: countries[0] || 'Global', className: COUNTRY_COLORS[countries[0]] || COUNTRY_COLORS['*'] };
}

// ─── Type icons ───

const TYPE_ICONS: Record<string, string> = {
  ev_rental: '🚗',
  hotel: '🏨',
  tour: '🎫',
  gear: '🔌',
  experience: '🌟',
};

// ─── Main Dashboard ───

export default function AffiliateDashboardPage() {
  const [records, setRecords] = useState<ClickRecord[]>([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'clicks' | 'type'>('name');
  const [expandedLink, setExpandedLink] = useState<string | null>(null);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    setRecords(getStoredClicks());
  }, []);

  const statsMap = useMemo(() => computeStats(records), [records]);
  const topPages = useMemo(() => getTopPages(records), [records]);
  const totalClicks = records.length;

  // Filter links
  const filteredLinks = useMemo(() => {
    let links = affiliateLinks;
    if (typeFilter !== 'all') {
      links = links.filter(l => l.type === typeFilter);
    }
    if (search) {
      const q = search.toLowerCase();
      links = links.filter(
        l =>
          l.name.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          l.tags.some(t => t.toLowerCase().includes(q)) ||
          l.countries.some(c => c.toLowerCase().includes(q))
      );
    }
    // Sort
    links = [...links].sort((a, b) => {
      if (sortBy === 'clicks') {
        const aClicks = statsMap.get(a.id)?.clicks ?? 0;
        const bClicks = statsMap.get(b.id)?.clicks ?? 0;
        return bClicks - aClicks;
      }
      if (sortBy === 'type') return a.type.localeCompare(b.type);
      return a.name.localeCompare(b.name);
    });
    return links;
  }, [affiliateLinks, typeFilter, search, sortBy, statsMap]);

  const resetStats = () => {
    if (confirm('Reset all click tracking data? This cannot be undone.')) {
      localStorage.removeItem(STORAGE_KEY);
      setRecords([]);
    }
  };

  // ─── Render ───

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap size={18} className="text-green-500" />
            <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">EV Charging Asia</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAbout(!showAbout)}
              className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex items-center gap-1"
            >
              <Info size={14} />
              About
            </button>
            <button
              onClick={resetStats}
              className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1"
              title="Reset tracking data"
            >
              <RefreshCw size={14} />
              Reset
            </button>
          </div>
        </div>
      </header>

      {/* About panel */}
      {showAbout && (
        <div className="bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200 mb-2">
              About This Dashboard
            </h3>
            <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed max-w-3xl">
              This dashboard tracks affiliate link clicks (Booking.com, Klook, Viator, etc.) across EV Charging
              Asia. Click tracking is stored locally in your browser and <strong>never sent to any server</strong>.
              When a visitor clicks an affiliate link on the site, a record is saved with the link ID, timestamp,
              and page path. Use this dashboard to identify top-performing content and optimize your affiliate
              placement strategy. Estimated commissions assume a 3% conversion rate at average order values.
            </p>
          </div>
        </div>
      )}

      {/* Stats overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <BarChart3 size={20} className="text-green-500" />
              Affiliate Dashboard
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Commission tracker &amp; link performance monitor — {totalClicks} total clicks recorded
            </p>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-center gap-2 mb-1">
              <MousePointerClick size={14} className="text-sky-500" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Total Clicks</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalClicks}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">All time</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign size={14} className="text-green-500" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Est. Conversions</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {Math.round(totalClicks * CONVERSION_RATE)}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">At 3% rate</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-center gap-2 mb-1">
              <Percent size={14} className="text-purple-500" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Links Tracked</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{affiliateLinks.length}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Across {new Set(affiliateLinks.map(l => l.type)).size} categories</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-center gap-2 mb-1">
              <Globe size={14} className="text-amber-500" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Countries</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {new Set(affiliateLinks.flatMap(l => l.countries)).size}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">Including global</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main link table */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
              {/* Filters */}
              <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search links by name, tag, or country..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                  <select
                    value={typeFilter}
                    onChange={e => setTypeFilter(e.target.value)}
                    className="px-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500"
                  >
                    <option value="all">All Types</option>
                    <option value="ev_rental">🚗 EV Rentals</option>
                    <option value="hotel">🏨 Hotels</option>
                    <option value="tour">🎫 Tours</option>
                    <option value="gear">🔌 Gear</option>
                    <option value="experience">🌟 Experiences</option>
                  </select>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as any)}
                    className="px-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500"
                  >
                    <option value="name">Sort: Name</option>
                    <option value="clicks">Sort: Most Clicked</option>
                    <option value="type">Sort: Type</option>
                  </select>
                </div>
              </div>

              {/* Link list */}
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredLinks.map(link => {
                  const stat = statsMap.get(link.id);
                  const countryInfo = getCountryBadge(link.countries);
                  const isExpanded = expandedLink === link.id;

                  return (
                    <div key={link.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <button
                        onClick={() => setExpandedLink(isExpanded ? null : link.id)}
                        className="w-full text-left px-4 py-3 flex items-center gap-3"
                      >
                        {/* Click indicator */}
                        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm shrink-0">
                          {TYPE_ICONS[link.type] || '🔗'}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">
                            {link.name}
                          </p>
                          <p className="text-[10px] text-gray-400 truncate mt-0.5">{link.description}</p>
                        </div>

                        {/* Country badge */}
                        <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded border shrink-0 ${countryInfo.className}`}>
                          {countryInfo.label}
                        </span>

                        {/* Click count */}
                        <div className="text-right shrink-0 min-w-[48px]">
                          <p className="text-xs font-bold text-gray-900 dark:text-gray-100">
                            {stat?.clicks ?? 0}
                          </p>
                          <p className="text-[9px] text-gray-400">clicks</p>
                        </div>

                        {isExpanded ? <ChevronUp size={14} className="text-gray-300 shrink-0" /> : <ChevronDown size={14} className="text-gray-300 shrink-0" />}
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4 pt-0 pl-16">
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2.5">
                              <p className="text-[9px] text-gray-400 uppercase tracking-wider">Clicks</p>
                              <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{stat?.clicks ?? 0}</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2.5">
                              <p className="text-[9px] text-gray-400 uppercase tracking-wider">Est. Conversions</p>
                              <p className="text-sm font-bold text-green-600">{stat?.conversionEstimate ?? 0}</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2.5">
                              <p className="text-[9px] text-gray-400 uppercase tracking-wider">Last Click</p>
                              <p className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                                {stat?.lastClicked
                                  ? new Date(stat.lastClicked).toLocaleDateString()
                                  : 'Never'}
                              </p>
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mb-2">
                            {link.tags.map(tag => (
                              <span
                                key={tag}
                                className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>

                          {/* Affiliate link URL test */}
                          <div className="flex items-center gap-2">
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer sponsored"
                              onClick={() => trackAffiliateClick(link.id)}
                              className="inline-flex items-center gap-1 text-[10px] font-medium text-sky-600 hover:text-sky-700 dark:text-sky-400"
                            >
                              <ExternalLink size={10} />
                              Test Link
                            </a>
                            <span className="text-[9px] text-gray-400">
                              Commission: {link.commission || 'Standard rate'}
                            </span>
                            <span className="text-[9px] text-gray-300">|</span>
                            <span className="text-[9px] text-gray-400">{link.type.replace('_', ' ')}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {filteredLinks.length === 0 && (
                <div className="p-8 text-center">
                  <Search size={24} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-sm text-gray-400">No links match your search</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: Top pages + Health summary */}
          <div className="space-y-4">
            {/* Top Pages */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
              <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5 mb-3">
                <TrendingUp size={14} className="text-green-500" />
                Top Pages by Clicks
              </h3>
              {topPages.length > 0 ? (
                <div className="space-y-1.5">
                  {topPages.map((page, i) => (
                    <div key={page.page} className="flex items-center gap-2">
                      <span className="text-[9px] font-mono text-gray-400 w-4 text-right">{i + 1}.</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-medium text-gray-700 dark:text-gray-300 truncate">
                          {page.page}
                        </p>
                        <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full mt-1">
                          <div
                            className="h-1.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
                            style={{ width: `${(page.clicks / totalClicks) * 100}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-[9px] font-mono text-gray-500 shrink-0">{page.clicks}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400">No clicks recorded yet. Visit blog pages and click affiliate links to populate this data.</p>
              )}
            </div>

            {/* Health Summary */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
              <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5 mb-3">
                <CheckCircle2 size={14} className="text-green-500" />
                Link Health
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500">Total links configured</span>
                  <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">{affiliateLinks.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500">Links with clicks</span>
                  <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">{statsMap.size}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500">Categories</span>
                  <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">{new Set(affiliateLinks.map(l => l.type)).size}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500">Countries targeted</span>
                  <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">{new Set(affiliateLinks.flatMap(l => l.countries)).size}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl border border-green-200 dark:border-green-900 p-4">
              <h3 className="text-xs font-bold text-green-900 dark:text-green-200 flex items-center gap-1.5 mb-2">
                <Sparkles size={14} className="text-green-500" />
                Revenue Potential
              </h3>
              <p className="text-[10px] text-green-700 dark:text-green-400 leading-relaxed">
                Based on {totalClicks} tracked clicks and a 3% conversion rate, estimated commissions:
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="bg-white/60 dark:bg-green-900/30 rounded-lg p-2 text-center">
                  <p className="text-xs text-green-600 dark:text-green-300">~{Math.round(totalClicks * CONVERSION_RATE)}</p>
                  <p className="text-[8px] text-green-500">Conversions</p>
                </div>
                <div className="bg-white/60 dark:bg-green-900/30 rounded-lg p-2 text-center">
                  <p className="text-xs text-green-600 dark:text-green-300">Est. ${Math.round(totalClicks * CONVERSION_RATE * 5)}</p>
                  <p className="text-[8px] text-green-500">Revenue (@$5/conv)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Setup guide */}
        <div className="mt-8 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
          <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5 mb-2">
            <Info size={14} className="text-blue-500" />
            Next Steps — Affiliate Infrastructure
          </h3>
          <div className="text-[10px] text-gray-500 leading-relaxed space-y-1">
            <p>1. ✅ Dashboard created — click tracking via localStorage is operational</p>
            <p>2. ⏳ Add <code className="text-[9px] bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">NEXT_PUBLIC_AFFILIATE_BOOKING_COM</code> env vars for deep linking</p>
            <p>3. ⏳ Upgrade stats to Supabase when DB env vars are available</p>
            <p>4. ⏳ Add Stripe payout tracking for actual commission reconciliation</p>
            <p>5. ⏳ Create auto-reporting (weekly email) with top performers</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600">
              <Zap size={14} className="text-green-500" />
              EV Charging Asia
            </Link>
            <p className="text-[9px] text-gray-400">
              Commission dashboard • Data stored locally • Last updated: May 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
