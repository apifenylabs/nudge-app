'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight, ChevronRight, Sparkles, TrendingUp, Trophy, Star,
  Zap, BookOpen, MapPin, Globe, Wallet, ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CountryConfig {
  slug: string;
  countryName: string;
  countryCode: string;
  capital: string;
  currency: string;
  languages: string;
  heroGradient: string;
  heroTitle: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
}

interface Tool {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  pricing_tier: string;
  avg_rating: number;
  total_ratings: number;
  trending_score: number;
}

interface CategorySection {
  name: string;
  tools: Tool[];
  count: number;
}

export default function CountryPageTemplate({
  config,
  topTools,
  categorySections,
  totalCount,
  heroHighlight,
  sections,
  breadcrumbs,
}: {
  config: CountryConfig;
  topTools: Tool[];
  categorySections: CategorySection[];
  totalCount: number;
  heroHighlight: ReactNode;
  sections: Array<{ icon: typeof Globe; title: string; description: string }>;
  breadcrumbs: Array<{ name: string; item: string }>;
}) {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-8 sm:pb-12 bg-gradient-to-br from-violet-50/80 via-white to-cyan-50/50">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${config.badgeBg} ${config.badgeBorder} ${config.badgeText} text-xs sm:text-sm font-medium mb-6`}>
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {config.countryName}-Focused · Updated Daily · {totalCount}+ Curated Tools
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              Best AI Tools for{' '}
              <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                {config.countryName}
              </span>
              <br />
              <span className="text-gray-500">in 2026</span>
            </h1>

            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Curated AI tools that <strong className="text-gray-900">actually work for {config.countryName}</strong>.
              We rank every tool on local compliance, local pricing, local language support —
              so you find tools built for {config.countryName}&apos;s unique market.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm sm:text-base transition-all shadow-lg shadow-violet-200 hover:-translate-y-0.5"
              >
                <span>Explore All {totalCount}+ Tools</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/categories/writing-content"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900 text-sm sm:text-base font-medium transition-all"
              >
                Browse by Category
              </Link>
            </div>

            <div className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-violet-500" />
                <span>{config.languages}</span>
              </div>
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-amber-500" />
                <span>{config.currency} Pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Local Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOP TOOLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5 text-amber-500" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Top AI Tools in {config.countryName}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-500 ml-[52px]">
              Highest-rated tools across all categories — ranked by trending score and market readiness
            </p>
          </div>
          <Link
            href="/tools"
            className="group inline-flex items-center gap-1.5 text-sm text-violet-600 hover:text-violet-700 transition shrink-0"
          >
            See full rankings
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {topTools.slice(0, 12).map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} rank={i} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm sm:text-base transition-all shadow-lg shadow-violet-200 hover:-translate-y-0.5"
          >
            Explore All {totalCount}+ Tools →
          </Link>
        </div>
      </section>

      {/* WHY THIS COUNTRY MATTERS */}
      <section className="border-y border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-violet-600" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Why {config.countryName} Needs Its Own AI Tool Directory
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
              {config.countryName}&apos;s AI ecosystem is unique — distinct regulatory and cultural landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {sections.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-gray-200 bg-white p-6 hover:shadow-md hover:border-gray-300 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY SECTIONS */}
      {categorySections.map((section) => {
        const sectionSlug =
          section.name === 'Writing & Content'
            ? 'writing-content'
            : section.name === 'Code & Development'
            ? 'code-development'
            : section.name === 'Design & Creative'
            ? 'design-creative'
            : 'marketing-seo';
        return (
          <section
            key={section.name}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 border-b border-gray-200 last:border-b-0"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Best AI{' '}
                  {section.name
                    .replace('Writing & Content', 'Writing Tools')
                    .replace('Code & Development', 'Coding Tools')
                    .replace('Design & Creative', 'Design Tools')
                    .replace('Marketing & SEO', 'Marketing Tools')}{' '}
                  for {config.countryName}
                </h2>
                <p className="text-sm text-gray-500 mt-1 max-w-xl">
                  Top picks for {config.countryName} teams — rated for local compliance, local pricing, and multilingual support.
                </p>
              </div>
              <Link
                href={`/categories/${sectionSlug}`}
                className="group inline-flex items-center gap-1.5 text-sm text-violet-600 hover:text-violet-700 transition shrink-0"
              >
                View all {section.count} tools
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.tools.slice(0, 6).map((tool) => (
                <CompactToolCard key={tool.id} tool={tool} />
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={`/categories/${sectionSlug}`}
                className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-violet-600 transition"
              >
                Browse all {section.name} tools for {config.countryName}
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </section>
        );
      })}
    </>
  );
}

function ToolCard({ tool, rank }: { tool: Tool; rank: number }) {
  const rankColors = [
    'bg-amber-100 text-amber-700 border-amber-200',
    'bg-gray-100 text-gray-600 border-gray-200',
    'bg-orange-100 text-orange-700 border-orange-200',
    'bg-gray-100 text-gray-500 border-gray-200',
  ];

  return (
    <Link
      key={tool.id}
      href={`/tools/${tool.slug}`}
      className="group relative block rounded-xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100/50 hover:-translate-y-1"
    >
      <div
        className={`absolute -top-2 -left-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-sm z-10 border ${
          rankColors[Math.min(rank, 3)]
        }`}
      >
        #{rank + 1}
      </div>
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-100 to-violet-200 flex items-center justify-center shrink-0 group-hover:from-violet-200 group-hover:to-violet-300 transition">
          <span className="text-violet-700 font-bold text-sm">
            {tool.name
              .split(' ')
              .map((w) => w[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-gray-900 truncate group-hover:text-violet-700 transition-colors">
            {tool.name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2 mt-0.5 leading-relaxed">{tool.tagline}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
          {tool.category}
        </span>
        <PricingBadge tier={tool.pricing_tier} />
      </div>
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={cn(
                'w-3 h-3',
                tool.avg_rating >= s
                  ? 'fill-amber-400 text-amber-400'
                  : tool.avg_rating >= s - 0.5
                  ? 'fill-amber-400/50 text-amber-400'
                  : 'fill-none text-gray-300'
              )}
            />
          ))}
        </div>
        <span className="text-xs text-gray-500">
          {tool.avg_rating.toFixed(1)}
          {tool.total_ratings >= 1000
            ? ` (${(tool.total_ratings / 1000).toFixed(1)}K)`
            : ` (${tool.total_ratings})`}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-400 transition-all duration-500"
            style={{ width: `${tool.trending_score}%` }}
          />
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <TrendingUp className="w-3 h-3 text-violet-500" />
          <span className="text-[10px] font-medium text-violet-600">{tool.trending_score}</span>
        </div>
      </div>
    </Link>
  );
}

function CompactToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      key={tool.id}
      href={`/tools/${tool.slug}`}
      className="group relative block rounded-xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:border-violet-300 hover:shadow-md hover:-translate-y-0.5"
    >
      <div className="flex items-start gap-2.5 mb-2">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-100 to-violet-200 flex items-center justify-center shrink-0 group-hover:from-violet-200 group-hover:to-violet-300 transition">
          <span className="text-violet-700 font-bold text-xs">
            {tool.name
              .split(' ')
              .map((w) => w[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-violet-700 transition">
            {tool.name}
          </h3>
          <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">{tool.tagline}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <PricingBadge tier={tool.pricing_tier} compact />
        <div className="flex items-center gap-1">
          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
          <span className="text-[10px] text-gray-500">{tool.avg_rating.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-0.5 ml-auto">
          <TrendingUp className="w-2.5 h-2.5 text-violet-500" />
          <span className="text-[9px] text-violet-600 font-medium">{tool.trending_score}</span>
        </div>
      </div>
    </Link>
  );
}

function PricingBadge({ tier, compact }: { tier: string; compact?: boolean }) {
  const styles: Record<string, string> = {
    Free: compact
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Freemium: compact
      ? 'bg-sky-50 text-sky-700 border-sky-200'
      : 'bg-sky-50 text-sky-700 border-sky-200',
    Paid: compact
      ? 'bg-violet-50 text-violet-700 border-violet-200'
      : 'bg-violet-50 text-violet-700 border-violet-200',
    Enterprise: compact
      ? 'bg-amber-50 text-amber-700 border-amber-200'
      : 'bg-amber-50 text-amber-700 border-amber-200',
  };

  const label = tier === 'Freemium' ? 'Free+' : tier;

  return compact ? (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium border ${
        styles[tier] || 'bg-gray-50 text-gray-600 border-gray-200'
      }`}
    >
      {label}
    </span>
  ) : (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${
        styles[tier] || 'bg-gray-50 text-gray-600 border-gray-200'
      }`}
    >
      {label}
    </span>
  );
}
