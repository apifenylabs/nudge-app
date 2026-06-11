'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Newspaper,
  Globe,
  TrendingUp,
  Sparkles,
  ExternalLink,
  ArrowRight,
  MapPin,
  Tag,
  CalendarDays,
  ArrowLeft,
  Rss,
  Bookmark,
  Info,
  Mail,
  X,
  Filter,
} from 'lucide-react';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import {
  aiNewsArticles,
  getCategoryInfo,
  getRegionLabel,
  getFeaturedArticles,
  getLatestArticles,
  formatDate,
  type NewsCategory,
  type NewsRegion,
  NEWS_CATEGORIES,
  NEWS_REGIONS,
} from '@/lib/ai-news-data';

const BASE_URL = 'https://apifeny-ai.vercel.app';

function AINewsPage() {
  const [activeCategory, setActiveCategory] = useState<NewsCategory | 'all'>('all');
  const [activeRegion, setActiveRegion] = useState<NewsRegion | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);

  const featuredArticles = getFeaturedArticles();

  const categoryBreakdown = useMemo(
    () =>
      NEWS_CATEGORIES.map((cat) => {
        const count = aiNewsArticles.filter((a) => a.category === cat.value).length;
        return { ...cat, count };
      }).filter((c) => c.count > 0),
    []
  );

  const regionBreakdown = useMemo(
    () =>
      NEWS_REGIONS.map((reg) => {
        const count = aiNewsArticles.filter((a) => a.region === reg.value).length;
        return { ...reg, count };
      }).filter((r) => r.count > 0),
    []
  );

  const filteredArticles = useMemo(() => {
    const all = getLatestArticles();
    if (activeCategory === 'all' && activeRegion === 'all') return all;
    return all.filter((a) => {
      if (activeCategory !== 'all' && a.category !== activeCategory) return false;
      if (activeRegion !== 'all' && a.region !== activeRegion) return false;
      return true;
    });
  }, [activeCategory, activeRegion]);

  const hasActiveFilters = activeCategory !== 'all' || activeRegion !== 'all';

  const clearFilters = () => {
    setActiveCategory('all');
    setActiveRegion('all');
  };

  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'AI News', item: '/ai-news' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-700 hover:text-white transition mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
          Home
        </Link>

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section className="relative mb-10 sm:mb-12">
          <div className="absolute inset-0 bg-gray-50 opacity-30 rounded-2xl" />
          <div className="relative rounded-2xl bg-gradient-to-br from-blue-600/10 via-cyan-500/5 to-sky-500/10 border border-gray-200 p-8 sm:p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-medium mb-4">
              <Rss className="w-3.5 h-3.5" />
              Weekly AI News Digest
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              AI News{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                — Asia Edition
              </span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl leading-relaxed">
              Curated AI industry news from across Asia and the world. Product launches, funding rounds,
              regulatory changes, research breakthroughs, and ecosystem updates — updated weekly by
              the Apifeny editorial team.
            </p>

            {/* Quick stats */}
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="inline-flex items-center gap-1.5">
                <Newspaper className="w-4 h-4 text-blue-500" />
                {aiNewsArticles.length} stories
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-cyan-500" />
                {aiNewsArticles.filter((a) => a.isAsiaSpecific).length} Asia-specific
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4 text-emerald-500" />
                Updated weekly
              </span>
            </div>
          </div>
        </section>

        {/* ── Filter Bar ────────────────────────────────────────── */}
        <div className="mb-8">
          {/* Toggle + active chips */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200 transition"
            >
              <Filter className="w-3.5 h-3.5" />
              {showFilters ? 'Hide Filters' : 'Filter'}
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition"
              >
                <X className="w-3 h-3" />
                Clear all filters
              </button>
            )}

            {activeCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                {getCategoryInfo(activeCategory).emoji} {getCategoryInfo(activeCategory).label}
                <button onClick={() => setActiveCategory('all')} className="ml-0.5 hover:text-blue-900">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {activeRegion !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-700 text-xs font-medium">
                <MapPin className="w-3 h-3" /> {getRegionLabel(activeRegion)}
                <button onClick={() => setActiveRegion('all')} className="ml-0.5 hover:text-cyan-900">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {hasActiveFilters && (
              <span className="text-xs text-gray-400">
                {filteredArticles.length} of {aiNewsArticles.length} stories
              </span>
            )}
          </div>

          {/* Expandable filter panels */}
          {showFilters && (
            <div className="space-y-4 p-5 rounded-xl bg-gray-50 border border-gray-200">
              {/* Category filters */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">
                  By Category
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveCategory('all')}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition ${
                      activeCategory === 'all'
                        ? 'bg-neon text-white shadow-sm'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Rss className="w-3 h-3" /> All
                  </button>
                  {categoryBreakdown.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setActiveCategory(cat.value)}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition ${
                        activeCategory === cat.value
                          ? 'bg-neon text-white shadow-sm'
                          : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {cat.emoji} {cat.label}
                      <span className="ml-0.5 opacity-70">({cat.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Region filters */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">
                  By Region
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveRegion('all')}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition ${
                      activeRegion === 'all'
                        ? 'bg-neon text-white shadow-sm'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Globe className="w-3 h-3" /> All Regions
                  </button>
                  {regionBreakdown.map((reg) => (
                    <button
                      key={reg.value}
                      onClick={() => setActiveRegion(reg.value)}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition ${
                        activeRegion === reg.value
                          ? 'bg-neon text-white shadow-sm'
                          : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <MapPin className="w-3 h-3" /> {reg.label}
                      <span className="ml-0.5 opacity-70">({reg.count})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Static category pills (always visible) */}
          {!showFilters && !hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-neon text-white text-xs font-medium">
                <Rss className="w-3.5 h-3.5" /> All News
              </span>
              {categoryBreakdown.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => { setActiveCategory(cat.value); setShowFilters(true); }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs font-medium hover:bg-gray-200 transition cursor-pointer"
                >
                  {cat.emoji} {cat.label}
                  <span className="ml-0.5 text-gray-400">({cat.count})</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Featured Articles ─────────────────────────────────────── */}
        {featuredArticles.length > 0 && !hasActiveFilters && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2 className="text-xl font-bold text-gray-900">Featured Stories</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredArticles.map((article) => {
                const catInfo = getCategoryInfo(article.category);
                return (
                  <article
                    key={article.id}
                    className="group relative rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-6 transition-all hover:shadow-md hover:border-amber-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-medium">
                        {catInfo.emoji} {catInfo.label}
                      </span>
                      <span className="text-[11px] text-gray-400 whitespace-nowrap">
                        {formatDate(article.publishedAt)}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-neon transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {article.summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        {article.isAsiaSpecific && (
                          <span className="inline-flex items-center gap-0.5 text-cyan-600">
                            <MapPin className="w-3 h-3" /> {getRegionLabel(article.region)}
                          </span>
                        )}
                        <span className="text-gray-300">·</span>
                        <span>{article.source}</span>
                      </div>
                      <a
                        href={article.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-neon hover:underline font-medium"
                      >
                        Read <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* ── News Feed (filtered or all) ────────────────────────────── */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Newspaper className="w-5 h-5 text-gray-700" />
            <h2 className="text-xl font-bold text-gray-900">
              {hasActiveFilters ? 'Filtered Stories' : 'Latest News'}
            </h2>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No stories match this filter</h3>
              <p className="text-sm text-gray-500 mb-4">
                Try a different category or region combination.
              </p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-neon text-white rounded-lg text-sm font-medium hover:bg-neon/90 transition"
              >
                <X className="w-4 h-4" /> Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredArticles.map((article) => {
                const catInfo = getCategoryInfo(article.category);
                return (
                  <Link
                    key={article.id}
                    href={`/ai-news/${article.id}`}
                    className="group flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all"
                  >
                    {/* Category icon */}
                    <div className="hidden sm:flex w-10 h-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-lg">
                      {catInfo.emoji}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-[10px] font-medium">
                          {catInfo.emoji} {catInfo.label}
                        </span>
                        {article.isAsiaSpecific && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] text-cyan-600 font-medium">
                            <MapPin className="w-3 h-3" /> {getRegionLabel(article.region)}
                          </span>
                        )}
                        <span className="text-[11px] text-gray-400">{formatDate(article.publishedAt)}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900 group-hover:text-neon transition-colors leading-snug mb-1">
                        {article.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-2">
                        {article.summary}
                      </p>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-gray-400">{article.source}</span>
                        {article.tags.length > 0 && (
                          <div className="hidden sm:flex items-center gap-1.5">
                            <Tag className="w-3 h-3 text-gray-300" />
                            {article.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="text-gray-400">#{tag}</span>
                            ))}
                            {article.tags.length > 3 && (
                              <span className="text-gray-300">+{article.tags.length - 3}</span>
                            )}
                          </div>
                        )}
                        <span className="ml-auto inline-flex items-center gap-1 text-neon group-hover:underline font-medium">
                          Read <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* ── Why This Exists ────────────────────────────────────────── */}
        <section className="mt-16">
          <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 p-8 sm:p-10">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-gray-700" />
              <h2 className="text-lg font-bold text-gray-900">Why AI News?</h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              The AI landscape changes weekly — especially in Asia, where regulatory frameworks,
              startup ecosystems, and enterprise adoption are evolving faster than anywhere else
              in the world. This page cuts through the noise to bring you the stories that matter
              for founders, developers, and tech professionals operating in or targeting Asian markets.
            </p>
            <div className="grid gap-4 sm:grid-cols-3 text-sm">
              <div className="p-4 rounded-xl bg-white border border-gray-200">
                <div className="font-semibold text-gray-900 mb-1">🌏 Asia-First Lens</div>
                <p className="text-gray-500">Every story evaluated for relevance to Asian markets and audiences.</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-gray-200">
                <div className="font-semibold text-gray-900 mb-1">📋 Curated, Not Crawled</div>
                <p className="text-gray-500">Editorially selected — no algorithm, no spam, no clickbait.</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-gray-200">
                <div className="font-semibold text-gray-900 mb-1">🔄 Weekly Refresh</div>
                <p className="text-gray-500">New stories added every week. Bookmark and check back.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Newsletter Cross-Promotion ──────────────────────────── */}
        <section className="mt-12 text-center">
          <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-fuchsia-50 border border-violet-200 p-8 sm:p-10 max-w-2xl mx-auto">
            <Mail className="mx-auto mb-3 w-8 h-8 text-violet-500" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Never Miss an AI Update</h2>
            <p className="text-gray-600 text-sm mb-6 max-w-lg mx-auto">
              Get the week&apos;s most important AI stories delivered to your inbox every Monday.
              Curated by the Apifeny editorial team. No spam, unsubscribe anytime.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent"
              />
              <button className="w-full sm:w-auto px-6 py-2.5 bg-neon text-white rounded-lg font-medium hover:bg-neon/90 transition shadow-sm whitespace-nowrap text-sm">
                Subscribe Free
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Join <span className="font-medium text-gray-500">630+</span> solopreneurs staying ahead of the AI curve.
            </p>
          </div>
        </section>

        {/* ── Explore More ────────────────────────────────────────────── */}
        <section className="mt-8 text-center">
          <div className="inline-block p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 max-w-2xl mx-auto">
            <Bookmark className="mx-auto mb-3 w-8 h-8 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Explore More AI Content</h2>
            <p className="text-gray-600 text-sm mb-6">
              Browse our full directory, trending tools, or monthly roundup to find the right AI tools for your workflow.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/trending"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-neon text-white rounded-lg font-medium hover:bg-neon/90 transition shadow-sm"
              >
                <TrendingUp className="w-4 h-4" />
                Trending Tools
              </Link>
              <Link
                href="/monthly-roundup"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 rounded-lg font-medium border border-gray-200 hover:bg-gray-50 transition"
              >
                <Sparkles className="w-4 h-4" />
                Monthly Roundup
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 rounded-lg font-medium border border-gray-200 hover:bg-gray-50 transition"
              >
                <ArrowRight className="w-4 h-4" />
                All Tools
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AINewsPage;
