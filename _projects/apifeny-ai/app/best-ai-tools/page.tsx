'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Trophy,
  Star,
  Zap,
  BookOpen,
  PenTool,
  Code,
  Palette,
  Megaphone,
  Layers,
  BarChart3,
  CheckCircle,
  Quote,
  GitCompare,
  ListChecks,
} from 'lucide-react';

import SeoMetadata from '@/components/SeoMetadata';
import FeaturedPlaybooks from '@/components/FeaturedPlaybooks';
import FeaturedCategories from '@/components/FeaturedCategories';
import FeaturedCollections from '@/components/FeaturedCollections';
import FeaturedRankings from '@/components/FeaturedRankings';
import { toolsData } from '@/lib/data';
import { playbooks } from '@/lib/playbooks';
import { collections } from '@/lib/collections';
import { cn } from '@/lib/utils';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

// ─── Constants ────────────────────────────────────────────────────────────────

const META = {
  title: 'Best AI Tools in 2026 — Curated Directory of 85+ Tools',
  description:
    'Discover the best AI tools of 2026. Curated directory of 85+ top-rated AI tools across writing, coding, design, marketing, and more. Expert rankings, real reviews, and Asia-ready filters.',
  ogTitle: 'Best AI Tools in 2026 — Apifeny AI',
  ogDescription:
    'Find the single best AI tool for every task. 85+ hand-picked tools ranked by trending score, real user ratings, and Asia-readiness. Updated daily.',
  ogImage: '/og',
};

// Category icons for category sections
const CATEGORY_CONFIG: Record<
  string,
  { icon: typeof Zap; slug: string; description: string; playbookSlugs: string[] }
> = {
  'Writing & Content': {
    icon: PenTool,
    slug: 'writing-content',
    description: 'Create blog posts, social content, emails, and copy that converts — 10x faster with AI.',
    playbookSlugs: ['content-creation-with-chatgpt', 'ai-content-creation-busy-founders', 'ai-for-social-media-management'],
  },
  'Code & Development': {
    icon: Code,
    slug: 'code-development',
    description: 'Ship faster with AI coding assistants. Generate, review, debug, and deploy with confidence.',
    playbookSlugs: ['ai-workflow-automation', 'directory-builder'],
  },
  'Design & Creative': {
    icon: Palette,
    slug: 'design-creative',
    description: 'Generate stunning visuals, edit images, and create brand assets — no design skills needed.',
    playbookSlugs: ['ai-content-creation-busy-founders', 'ai-for-marketing-automation'],
  },
  'Marketing & SEO': {
    icon: Megaphone,
    slug: 'marketing-seo',
    description: 'Automate campaigns, optimize for search, and scale your marketing with AI-powered tools.',
    playbookSlugs: ['ai-for-marketing-automation', 'ai-marketing-for-asia', 'ai-sales-funnel-builder'],
  },
};

const CATEGORY_NAMES = Object.keys(CATEGORY_CONFIG);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function topByTrending(limit: number) {
  return [...toolsData]
    .filter((t) => t.is_published)
    .sort((a, b) => b.trending_score - a.trending_score)
    .slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData]
    .filter((t) => t.is_published && t.category === category)
    .sort((a, b) => b.trending_score - a.trending_score)
    .slice(0, limit);
}

function findPlaybook(slug: string) {
  return playbooks.find((p) => p.slug === slug);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BestAIToolsPage() {
  const top12 = useMemo(() => topByTrending(12), []);

  const categorySections = useMemo(
    () =>
      CATEGORY_NAMES.map((name) => ({
        name,
        config: CATEGORY_CONFIG[name],
        tools: topByCategory(name, 4),
        count: toolsData.filter((t) => t.is_published && t.category === name).length,
      })),
    []
  );

  const totalCount = useMemo(
    () => toolsData.filter((t) => t.is_published).length,
    []
  );

  const blogPosts = useMemo(() => {
    // We pull from generated-blog-data, but keep it simple: reference known slugs
    return [
      { slug: 'ai-for-content-creation-asia-strategy', title: 'AI Content Creation Strategy for Asia (2026)', excerpt: 'How top creators use AI tools to produce content across 8 Asian markets simultaneously.' },
      { slug: 'ai-image-generation-tools-marketers-asia', title: 'Best AI Image Tools for Asian Marketing', excerpt: 'Generate culturally-relevant visuals for Asian audiences with these top-rated AI image tools.' },
      { slug: 'ai-email-marketing-small-business-asia', title: 'AI Email Marketing Guide for Small Business', excerpt: 'Automate personalized email campaigns at scale using AI — built for Asian small businesses.' },
    ];
  }, []);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Best AI Tools', item: '/best-ai-tools' },
        ]}
      />
      <SeoMetadata
        title={META.title}
        description={META.description}
        ogTitle={META.ogTitle}
        ogDescription={META.ogDescription}
        ogImage={META.ogImage}
      />

      {/* ───── HERO ───── */}
      <section className="relative overflow-hidden border-b border-tech-500/20">
        {/* Background grid + glow */}
        <div className="absolute inset-0 bg-tech-grid opacity-40 pointer-events-none" />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-neon/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-aqua/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon/10 border border-neon/20 text-neon-light text-xs sm:text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Updated Daily · {totalCount}+ Curated Tools · 47 Blog Posts
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight animate-slide-up">
              Best AI Tools in{' '}
              <span className="bg-gradient-to-r from-neon-light via-asia to-aqua bg-clip-text text-transparent">
                2026
              </span>
              <br />
              <span className="text-tech-100">Curated Directory of {totalCount}+ Tools</span>
            </h1>

            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-tech-200 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Stop collecting AI tools. Start finding the <strong className="text-white">single best tool</strong> for every task.
              Expert rankings, real user reviews, and Asia-ready filters — all in one place.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link
                href="/tools"
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-neon to-neon-dark text-white font-semibold text-sm sm:text-base transition-all hover:shadow-lg hover:shadow-neon/25 hover:-translate-y-0.5"
              >
                <span>Explore All {totalCount}+ Tools</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/categories/writing-content"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-tech-500/40 text-tech-100 hover:border-neon/30 hover:text-white text-sm sm:text-base font-medium transition-all"
              >
                <Zap className="w-4 h-4" />
                Browse by Category
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-tech-300 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                <span>Editorially Ranked</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-asia" />
                <span>Real User Reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-aqua" />
                <span>Asia-Ready Filter</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── TOP 12 TOOLS GRID ───── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-asia/20 to-amber-500/10 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5 text-asia" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Top Rated AI Tools in 2026
              </h2>
            </div>
            <p className="text-sm sm:text-base text-tech-200 ml-[52px]">
              Our expert picks — ranked by trending score, user ratings, and Asia-readiness
            </p>
          </div>
          <Link
            href="/tools"
            className="group inline-flex items-center gap-1.5 text-sm text-neon-light hover:text-neon transition shrink-0"
          >
            See full rankings
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {top12.map((tool, i) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className={cn(
                'group relative block rounded-xl border border-tech-500/30 bg-tech-700 p-5 transition-all duration-300',
                'hover:border-neon/40 hover:shadow-lg hover:shadow-neon/5 hover:-translate-y-1',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50'
              )}
            >
              {/* Rank badge */}
              <div
                className={cn(
                  'absolute -top-2 -left-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-lg z-10',
                  i === 0
                    ? 'bg-gradient-to-br from-asia to-amber-400 text-black'
                    : i === 1
                    ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-black'
                    : i === 2
                    ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white'
                    : 'bg-tech-500 text-tech-100 border border-tech-400/30'
                )}
              >
                #{i + 1}
              </div>

              {/* Logo */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-tech-500 to-tech-600 flex items-center justify-center shrink-0 border border-tech-400/30 group-hover:border-neon/30 transition">
                  <span className="text-white font-bold text-sm">
                    {tool.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold text-white truncate group-hover:text-neon-light transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-tech-200 line-clamp-2 mt-0.5 leading-relaxed">
                    {tool.tagline}
                  </p>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600/60 text-tech-100 border border-tech-500/30">
                  {tool.category}
                </span>
                <span
                  className={cn(
                    'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border',
                    tool.pricing_tier === 'Free'
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : tool.pricing_tier === 'Freemium'
                      ? 'bg-sky-500/20 text-sky-400 border-sky-500/30'
                      : tool.pricing_tier === 'Paid'
                      ? 'bg-neon/20 text-neon-light border-neon/30'
                      : tool.pricing_tier === 'Enterprise'
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                  )}
                >
                  {tool.pricing_tier === 'Freemium' ? 'Free+' : tool.pricing_tier}
                </span>
              </div>

              {/* Star rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-0.5">
                  {(() => {
                    const stars: ('full' | 'half' | 'empty')[] = [];
                    for (let i = 1; i <= 5; i++) {
                      if (tool.avg_rating >= i) stars.push('full');
                      else if (tool.avg_rating >= i - 0.5) stars.push('half');
                      else stars.push('empty');
                    }
                    return stars.map((s, si) => (
                      <Star
                        key={si}
                        className={cn(
                          'w-3 h-3',
                          s === 'full'
                            ? 'fill-asia text-asia'
                            : s === 'half'
                            ? 'fill-asia/50 text-asia'
                            : 'fill-none text-tech-400'
                        )}
                      />
                    ));
                  })()}
                </div>
                <span className="text-xs text-tech-200">
                  {tool.avg_rating.toFixed(1)}
                  {tool.total_ratings >= 1000
                    ? ` (${(tool.total_ratings / 1000).toFixed(1)}K)`
                    : ` (${tool.total_ratings})`}
                </span>
              </div>

              {/* Trending score bar */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-tech-600 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-neon to-aqua transition-all duration-500"
                    style={{ width: `${tool.trending_score}%` }}
                  />
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <TrendingUp className="w-3 h-3 text-neon-light" />
                  <span className="text-[10px] font-medium text-neon-light">{tool.trending_score}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/tools"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-neon to-neon-dark text-white font-semibold text-sm sm:text-base transition-all hover:shadow-lg hover:shadow-neon/25 hover:-translate-y-0.5"
          >
            <span>Explore All {totalCount}+ Tools →</span>
          </Link>
          <p className="mt-3 text-xs text-tech-300">
            Sort by trending, rating, category, or Asia-readiness. Real user reviews, updated daily.
          </p>
        </div>
      </section>

      {/* ───── BRIDGE: STATS BAR ───── */}
      <section className="border-y border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {[
              { label: 'Curated AI Tools', value: `${totalCount}+`, icon: Layers },
              { label: 'How-To Playbooks', value: `${playbooks.length}+`, icon: BookOpen },
              { label: 'Expert Rankings', value: `${collections.length}+`, icon: Trophy },
              { label: 'Blog Guides', value: '47', icon: BarChart3 },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-tech-600/60 flex items-center justify-center border border-tech-500/20">
                  <stat.icon className="w-5 h-5 text-neon-light" />
                </div>
                <span className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</span>
                <span className="text-xs sm:text-sm text-tech-300">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CATEGORY SECTIONS ───── */}
      {categorySections.map((section) => {
        const Icon = section.config.icon;
        const firstPlaybook = section.config.playbookSlugs[0]
          ? findPlaybook(section.config.playbookSlugs[0])
          : null;

        return (
          <section
            key={section.name}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 border-b border-tech-500/10 last:border-b-0"
          >
            {/* Section header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-tech-600/60 flex items-center justify-center shrink-0 border border-tech-500/20 mt-1">
                  <Icon className="w-5 h-5 text-neon-light" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Best AI {section.name.replace('Writing & Content', 'Writing Tools').replace('Code & Development', 'Coding Tools').replace('Design & Creative', 'Design Tools').replace('Marketing & SEO', 'Marketing Tools')}
                  </h2>
                  <p className="text-sm text-tech-200 mt-1 max-w-xl">
                    {section.config.description}
                  </p>
                </div>
              </div>
              <Link
                href={`/tools?category=${encodeURIComponent(section.name)}`}
                className="group inline-flex items-center gap-1.5 text-sm text-neon-light hover:text-neon transition shrink-0"
              >
                View all {section.count} tools
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Tool cards — 4 per category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {section.tools.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.slug}`}
                  className="group relative block rounded-xl border border-tech-500/30 bg-tech-700/80 p-4 transition-all duration-300 hover:border-neon/30 hover:bg-tech-700 hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-2.5 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-tech-500 to-tech-600 flex items-center justify-center shrink-0 border border-tech-400/20 group-hover:border-neon/30 transition">
                      <span className="text-white font-bold text-xs">
                        {tool.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-white truncate group-hover:text-neon-light transition">
                        {tool.name}
                      </h3>
                      <p className="text-[11px] text-tech-200 line-clamp-2 mt-0.5">
                        {tool.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium border',
                        tool.pricing_tier === 'Free'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : tool.pricing_tier === 'Freemium'
                          ? 'bg-sky-500/20 text-sky-400 border-sky-500/30'
                          : 'bg-neon/20 text-neon-light border-neon/30'
                      )}
                    >
                      {tool.pricing_tier === 'Freemium' ? 'Free+' : tool.pricing_tier}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-asia text-asia" />
                      <span className="text-[10px] text-tech-200">{tool.avg_rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-0.5 ml-auto">
                      <TrendingUp className="w-2.5 h-2.5 text-neon-light" />
                      <span className="text-[9px] text-neon-light font-medium">{tool.trending_score}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Cross-link to playbook + more */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {firstPlaybook && (
                <Link
                  href={`/playbook/${firstPlaybook.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-tech-700 border border-tech-500/30 text-xs text-tech-100 hover:border-neon/30 hover:text-neon-light transition"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>Playbook: {firstPlaybook.title}</span>
                </Link>
              )}
              <Link
                href={`/categories/${section.config.slug}`}
                className="inline-flex items-center gap-1 text-xs text-tech-300 hover:text-neon-light transition"
              >
                Browse category page
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </section>
        );
      })}

      {/* ───── HOW IT WORKS ───── */}
      <section className="border-y border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">How Apifeny AI Helps You Find the Best Tools</h2>
            <p className="text-sm sm:text-base text-tech-200 mt-2 max-w-xl mx-auto">
              We don&apos;t just list tools. We rank them by what actually matters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Trending Score',
                description: 'Real-time popularity ranking based on user engagement, saves, and community ratings. See what\'s actually working right now.',
                gradient: 'from-neon/20 to-neon-dark/10',
              },
              {
                icon: Star,
                title: 'Real User Reviews',
                description: 'Aggregated ratings from actual users across platforms. No paid placements, no fake reviews — just honest, verified feedback.',
                gradient: 'from-asia/20 to-amber-500/10',
              },
              {
                icon: CheckCircle,
                title: 'Asia-Ready Filter',
                description: 'Every tool scored on multilingual support, local pricing, data residency, and Asian market suitability. Find tools that work in your region.',
                gradient: 'from-aqua/20 to-cyan-500/10',
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`relative rounded-xl bg-gradient-to-br ${item.gradient} bg-tech-700 border border-tech-500/30 p-6`}
              >
                <div className="absolute inset-0 bg-tech-grid opacity-20 rounded-xl pointer-events-none" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-tech-600/60 flex items-center justify-center border border-tech-500/20 mb-4">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-tech-200 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── FEATURED PLAYBOOKS ───── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Step-by-Step AI Playbooks
            </h2>
            <p className="text-xs sm:text-sm text-tech-200">
              Not sure where to start? Follow our battle-tested playbooks.
            </p>
          </div>
        </div>

        <FeaturedPlaybooks />

        <div className="mt-8 text-center">
          <Link
            href="/playbooks"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-tech-500/30 text-tech-100 hover:border-neon/30 hover:text-white text-sm font-medium transition-all"
          >
            Browse all {playbooks.length} playbooks
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ───── CURATED COLLECTIONS ───── */}
      <section className="border-y border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <FeaturedCollections />
        </div>
      </section>

      {/* ───── WORKFLOW RANKINGS ───── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <FeaturedRankings />
      </section>

      {/* ───── TESTIMONIALS / SOCIAL PROOF ───── */}
      <section className="border-y border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-asia/20 to-amber-500/10 flex items-center justify-center shrink-0">
                <Quote className="w-5 h-5 text-asia" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Trusted by Builders, Marketers &amp; Creators
              </h2>
            </div>
            <p className="text-sm sm:text-base text-tech-200 max-w-xl mx-auto">
              Real stories from people who use Apifeny AI to find their tools and ship faster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                quote: 'Apifeny AI saved me hours of research. I found the perfect AI writing tool for my content team in minutes, not days.',
                name: 'Sarah Chen',
                role: 'Content Director, TechStart Asia',
                gradient: 'from-neon/10 to-purple-900/10',
              },
              {
                quote: 'The Asia-ready filter is a game-changer. Most AI directories ignore local pricing and language support. This one gets it right.',
                name: 'Rahul Mehta',
                role: 'Founder, DigiBoost India',
                gradient: 'from-aqua/10 to-cyan-900/10',
              },
              {
                quote: 'I went from zero to a fully automated marketing workflow using the playbooks here. The tool rankings are spot on.',
                name: 'Lisa Wong',
                role: 'Solopreneur, Singapore',
                gradient: 'from-asia/10 to-amber-900/10',
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className={`relative rounded-xl bg-gradient-to-br ${testimonial.gradient} bg-tech-700 border border-tech-500/30 p-6`}
              >
                <div className="absolute inset-0 bg-tech-grid opacity-20 rounded-xl pointer-events-none" />
                <div className="relative">
                  <Quote className="w-8 h-8 text-tech-400/40 mb-3" />
                  <p className="text-sm text-tech-100 leading-relaxed mb-4 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-asia text-asia" />
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                    <p className="text-xs text-tech-300">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/success-stories"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-tech-500/30 text-tech-100 hover:border-neon/30 hover:text-white text-sm font-medium transition-all"
            >
              Read more success stories
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───── CTA COMPARE / RANKINGS / PLAYBOOK ───── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />
        <div className="absolute top-[-20%] left-[-5%] w-[50%] h-[50%] bg-neon/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Three Ways to Find Your Perfect AI Tool
            </h2>
            <p className="text-sm sm:text-base text-tech-200 mt-2 max-w-xl mx-auto">
              Whether you&apos;re comparing, ranking, or following a playbook — we&apos;ve got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <Link
              href="/tools?view=compare"
              className="group block rounded-xl border border-tech-500/30 bg-tech-700 p-6 text-center hover:border-neon/30 hover:-translate-y-1 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon/20 to-neon-dark/10 flex items-center justify-center mx-auto mb-4 border border-neon/20 group-hover:border-neon/40 transition">
                <GitCompare className="w-7 h-7 text-neon-light" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Compare Tools</h3>
              <p className="text-sm text-tech-200 leading-relaxed mb-4">
                Side-by-side comparison of top AI tools. See pricing, features, ratings, and Asia-readiness at a glance.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-neon-light group-hover:text-neon transition">
                Compare now
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>

            <Link
              href="/rankings"
              className="group block rounded-xl border border-tech-500/30 bg-tech-700 p-6 text-center hover:border-neon/30 hover:-translate-y-1 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-asia/20 to-amber-500/10 flex items-center justify-center mx-auto mb-4 border border-asia/20 group-hover:border-asia/40 transition">
                <ListChecks className="w-7 h-7 text-asia" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">View Rankings</h3>
              <p className="text-sm text-tech-200 leading-relaxed mb-4">
                Expert-curated workflow rankings. Discover the #1 tool for content creation, coding, marketing, and more.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-asia group-hover:text-asia-light transition">
                View rankings
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>

            <Link
              href="/playbooks"
              className="group block rounded-xl border border-tech-500/30 bg-tech-700 p-6 text-center hover:border-neon/30 hover:-translate-y-1 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-aqua/20 to-cyan-500/10 flex items-center justify-center mx-auto mb-4 border border-aqua/20 group-hover:border-aqua/40 transition">
                <BookOpen className="w-7 h-7 text-aqua" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Get the Playbook</h3>
              <p className="text-sm text-tech-200 leading-relaxed mb-4">
                Step-by-step guides to build AI-powered workflows. From content creation to automation — follow the blueprint.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-aqua group-hover:text-aqua-light transition">
                Get the playbook
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ───── BLOG / LEARNING ───── */}
      <section className="border-y border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500/20 to-sky-600/10 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Latest from the Blog
                </h2>
                <p className="text-xs sm:text-sm text-tech-200">
                  Expert guides, comparisons, and Asia-focused AI strategies
                </p>
              </div>
            </div>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1.5 text-sm text-neon-light hover:text-neon transition shrink-0"
            >
              All posts
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-xl border border-tech-500/30 bg-tech-700 p-5 hover:border-neon/30 hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-tech-500 to-tech-600 flex items-center justify-center group-hover:border-neon/30 transition">
                    <BookOpen className="w-4 h-4 text-tech-100" />
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-neon-light transition-colors mb-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-tech-200 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-1 text-xs text-neon-light/60 group-hover:text-neon-light transition-colors mt-3">
                  Read article
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-tech-500/30 text-tech-100 hover:border-neon/30 hover:text-white text-sm font-medium transition-all"
            >
              Read all 47 expert guides
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───── FEATURED CATEGORIES (BROWSE ALL) ───── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <FeaturedCategories />
      </section>

      {/* ───── SEO KEYWORD FOOTER ───── */}
      <section className="border-t border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h3 className="text-xs font-semibold text-tech-200 uppercase tracking-wider mb-3">By Category</h3>
              <ul className="space-y-2">
                <li><Link href="/categories/writing-content" className="text-xs text-tech-300 hover:text-neon-light transition">AI Writing Tools</Link></li>
                <li><Link href="/categories/code-development" className="text-xs text-tech-300 hover:text-neon-light transition">AI Coding Tools</Link></li>
                <li><Link href="/categories/design-creative" className="text-xs text-tech-300 hover:text-neon-light transition">AI Design Tools</Link></li>
                <li><Link href="/categories/marketing-seo" className="text-xs text-tech-300 hover:text-neon-light transition">AI Marketing Tools</Link></li>
                <li><Link href="/categories" className="text-xs text-tech-300 hover:text-neon-light transition">All Categories →</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-tech-200 uppercase tracking-wider mb-3">By Workflow</h3>
              <ul className="space-y-2">
                <li><Link href="/rankings" className="text-xs text-tech-300 hover:text-neon-light transition">Workflow Rankings</Link></li>
                <li><Link href="/tools" className="text-xs text-tech-300 hover:text-neon-light transition">All Tools</Link></li>
                <li><Link href="/playbooks" className="text-xs text-tech-300 hover:text-neon-light transition">Playbooks</Link></li>
                <li><Link href="/blog" className="text-xs text-tech-300 hover:text-neon-light transition">Blog &amp; Guides</Link></li>
                <li><Link href="/collections" className="text-xs text-tech-300 hover:text-neon-light transition">Curated Collections →</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-tech-200 uppercase tracking-wider mb-3">Top Tools 2026</h3>
              <ul className="space-y-2">
                {topByTrending(5).map((tool) => (
                  <li key={tool.id}>
                    <Link href={`/tools/${tool.slug}`} className="text-xs text-tech-300 hover:text-neon-light transition truncate block">
                      {tool.name}
                    </Link>
                  </li>
                ))}
                <li><Link href="/tools" className="text-xs text-tech-300 hover:text-neon-light transition">View all {totalCount}+ tools →</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-tech-200 uppercase tracking-wider mb-3">SEO Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/sitemap.xml" className="text-xs text-tech-300 hover:text-neon-light transition">Sitemap</Link></li>
                <li><Link href="/privacy" className="text-xs text-tech-300 hover:text-neon-light transition">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-xs text-tech-300 hover:text-neon-light transition">Terms of Service</Link></li>
                <li><Link href="/submit" className="text-xs text-tech-300 hover:text-neon-light transition">Submit a Tool</Link></li>
                <li className="pt-2 text-[10px] text-tech-400 leading-relaxed">
                  Discover the best AI tools of 2026 — curated, ranked, and reviewed. Free AI tool directory with Asia-ready filters.
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-tech-500/10 text-center">
            <p className="text-[10px] text-tech-400 leading-loose max-w-2xl mx-auto">
              <strong className="text-tech-300">Popular searches:</strong>{' '}
              <Link href="/tools/chatgpt" className="hover:text-neon-light transition">ChatGPT</Link> ·{' '}
              <Link href="/tools/claude" className="hover:text-neon-light transition">Claude</Link> ·{' '}
              <Link href="/tools/gemini" className="hover:text-neon-light transition">Gemini</Link> ·{' '}
              <Link href="/tools/perplexity" className="hover:text-neon-light transition">Perplexity</Link> ·{' '}
              <Link href="/tools/midjourney" className="hover:text-neon-light transition">Midjourney</Link> ·{' '}
              <Link href="/categories/code-development" className="hover:text-neon-light transition">AI coding tools</Link> ·{' '}
              <Link href="/categories/writing-content" className="hover:text-neon-light transition">AI writing assistants</Link> ·{' '}
              <Link href="/categories/marketing-seo" className="hover:text-neon-light transition">AI marketing software</Link> ·{' '}
              <Link href="/rankings" className="hover:text-neon-light transition">Workflow rankings</Link> ·{' '}
              <Link href="/playbooks" className="hover:text-neon-light transition">AI playbooks</Link>
            </p>
          </div>
        </div>
      </section>

      {/* ───── FINAL CTA ───── */}
      <section className="relative overflow-hidden border-t border-tech-500/20">
        <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />
        <div className="absolute top-[-30%] left-[-10%] w-[70%] h-[70%] bg-neon/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-aqua/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            Ready to Find the Best AI Tools for Your Workflow?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-tech-200 max-w-2xl mx-auto">
            Stop wasting hours searching through endless lists. Apifeny AI has already done the work for you — {totalCount}+ tools ranked, reviewed, and ready to explore.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/tools"
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-neon to-neon-dark text-white font-semibold text-sm sm:text-base transition-all hover:shadow-lg hover:shadow-neon/25 hover:-translate-y-0.5"
            >
              <span>Explore All {totalCount}+ Tools →</span>
            </Link>
            <Link
              href="/categories/writing-content"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-tech-500/40 text-tech-100 hover:border-neon/30 hover:text-white text-sm sm:text-base font-medium transition-all"
            >
              Browse by Category
            </Link>
          </div>

          <div className="mt-6 text-xs text-tech-300">
            No account required. No email needed. Start exploring instantly.
          </div>
        </div>
      </section>
    </>
  );
}
