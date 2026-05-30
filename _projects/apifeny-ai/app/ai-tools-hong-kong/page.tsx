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
  MapPin,
  Globe,
  DollarSign,
  ShieldCheck,
  BarChart3,
  CheckCircle,
  Quote,
  Layers,
  Building2,
} from 'lucide-react';

import SeoMetadata from '@/components/SeoMetadata';
import FeaturedPlaybooks from '@/components/FeaturedPlaybooks';
import BlogCategoryLinks from '@/components/BlogCategoryLinks';
import LandingPageCrossLinks from '@/components/LandingPageCrossLinks';
import { toolsData } from '@/lib/data';
import { playbooks } from '@/lib/playbooks';
import { cn } from '@/lib/utils';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import GeoSeoSchema from '@/components/GeoSeoSchema';

// ─── Constants ────────────────────────────────────────────────────────────────

const META = {
  title: 'Best AI Tools in Hong Kong (2026) — Curated for HK Startups & Enterprises',
  description:
    'Discover the best AI tools for Hong Kong businesses. Curated directory of 85+ tools ranked by trending score, Chinese-language readiness, data privacy, and local relevance. Updated daily.',
  ogTitle: 'Best AI Tools in Hong Kong (2026) — Apifeny AI',
  ogDescription:
    'Find AI tools built for Hong Kong: Traditional Chinese support, HKD pricing, data residency compliance (PDPO), and Asia-Pacific readiness. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

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

export default function AIToolsHongKongPage() {
  const top12 = useMemo(() => topByTrending(12), []);

  const categorySections = useMemo(
    () =>
      CATEGORY_NAMES.map((name) => ({
        name,
        tools: topByCategory(name, 6),
        count: toolsData.filter((t) => t.is_published && t.category === name).length,
      })),
    []
  );

  const totalCount = useMemo(
    () => toolsData.filter((t) => t.is_published).length,
    []
  );

  // Inject JSON-LD
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'ai-tools-hong-kong-jsonld';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Best AI Tools in Hong Kong (2026)',
      description: 'Curated directory of 85+ top-rated AI tools relevant to Hong Kong businesses, startups, and enterprises.',
      url: 'https://apifeny-ai.vercel.app/ai-tools-hong-kong',
      inLanguage: 'zh-HK',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Apifeny AI',
        url: 'https://apifeny-ai.vercel.app',
      },
    });
    const existing = document.getElementById('ai-tools-hong-kong-jsonld');
    if (existing) existing.remove();
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, []);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Hong Kong', item: '/ai-tools-hong-kong' },
        ]}
      />
      <GeoSeoSchema
        countryName="Hong Kong"
        countryCode="hk"
        capital="Hong Kong"
        currency="HKD"
        language="Chinese"
        languageCode="zh"
        marketSize="$470B GDP, 7.5M population, Asia's world city, leading fintech hub"
        slug="ai-tools-hong-kong"
        faqs={[
          { question: "What are the best AI tools in Hong Kong?", answer: "The best AI tools in Hong Kong include ChatGPT for productivity, GitHub Copilot for development, Canva AI for design, and Jasper for marketing. Hong Kong's unique position as a global financial hub and its strong IP protection laws make it an ideal market for adopting enterprise AI tools." },
          { question: "Are AI tools accessible for Hong Kong startups?", answer: "Yes. Hong Kong startups benefit from world-class digital infrastructure, the highest internet speeds in Asia, Cyberport and HKSTP incubation programmes, and government grants like the ITF (Innovation and Technology Fund) of up to HK$10M. Most AI platforms offer free tiers perfect for early-stage validation." },
          { question: "What AI tools are best for Hong Kong's financial sector?", answer: "Hong Kong's financial services sector — 21% of GDP — benefits from AI tools like Kensho for financial analysis, Ayasdi for compliance, Darktrace for cybersecurity, and Salesforce Einstein for CRM. Regtech and fintech AI adoption is accelerating under HKMA's Fintech 2025 strategy." },
          { question: "What AI regulations apply in Hong Kong?", answer: "Hong Kong's Personal Data (Privacy) Ordinance (PDPO) governs data handling. The Privacy Commissioner has issued AI-specific guidance on ethical AI use. For financial sector AI, HKMA's Supervisory Policy Manual provides additional requirements." },
          { question: "Are there Hong Kong-specific AI models?", answer: "Yes. The Hong Kong Generative AI Research and Development Center (HKGAI) develops Cantonese and Chinese-language models. Local universities (HKU, CUHK, HKUST) publish cutting-edge AI research, and companies like SenseTime (HQ in HK) offer regionally optimised computer vision AI." },
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
        <div className="absolute inset-0 bg-tech-grid opacity-40 pointer-events-none" />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-neon/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-aqua/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon/10 border border-neon/20 text-neon-light text-xs sm:text-sm font-medium mb-6 animate-fade-in">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Hong Kong-Focused · Updated Daily · {totalCount}+ Curated Tools
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight animate-slide-up">
              Best AI Tools for{' '}
              <span className="bg-gradient-to-r from-red-400 via-white to-red-300 bg-clip-text text-transparent">
                Hong Kong
              </span>
              <br />
              <span className="text-tech-100">in 2026</span>
            </h1>

            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-tech-200 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Curated AI tools that <strong className="text-white">actually work for Hong Kong</strong>. 
              We rank every tool on Traditional Chinese support, HKD pricing, PDPO data residency compliance, 
              and Asia-Pacific readiness — so you find tools built for HK, not Silicon Valley.
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
                Browse by Category
              </Link>
            </div>

            {/* HK-specific trust indicators */}
            <div className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-tech-300 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>中文支援 (Traditional Chinese)</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-asia" />
                <span>HKD Pricing Checked</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-aqua" />
                <span>PDPO Data Residency</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-rose-400" />
                <span>HK Enterprise Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── TOP TOOLS ───── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-asia/20 to-amber-500/10 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5 text-asia" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Top AI Tools in Hong Kong
              </h2>
            </div>
            <p className="text-sm sm:text-base text-tech-200 ml-[52px]">
              Highest-rated tools across all categories — ranked by trending score and Asia-readiness
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
      </section>

      {/* ───── CATEGORY SECTIONS ───── */}
      <section className="border-t border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aqua/20 to-sky-500/10 flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5 text-aqua" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Browse by Category
              </h2>
            </div>
            <p className="text-sm sm:text-base text-tech-200 ml-[52px]">
              Find the best AI tools for each use case — curated for Hong Kong teams
            </p>
          </div>

          <div className="space-y-12 sm:space-y-14">
            {categorySections.map((section) => (
              <div key={section.name}>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">
                    {section.name}
                    <span className="text-xs text-tech-300 ml-2 font-normal">({section.count} tools)</span>
                  </h3>
                  <Link
                    href={`/categories/${section.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                    className="group inline-flex items-center gap-1 text-xs sm:text-sm text-neon-light hover:text-neon transition"
                  >
                    View all
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
                  {section.tools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={`/tools/${tool.slug}`}
                      className="group block rounded-lg border border-tech-500/20 bg-tech-700/60 p-3.5 transition-all hover:border-neon/30 hover:bg-tech-700 hover:-translate-y-0.5"
                    >
                      <h4 className="text-sm font-medium text-white truncate group-hover:text-neon-light transition-colors">
                        {tool.name}
                      </h4>
                      <p className="text-[10px] text-tech-300 mt-1 line-clamp-2 leading-relaxed">
                        {tool.tagline}
                      </p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <TrendingUp className="w-2.5 h-2.5 text-neon-light" />
                        <span className="text-[10px] text-neon-light font-medium">{tool.trending_score}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── PLAYBOOKS SECTION ───── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon/20 to-emerald-500/10 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-neon-light" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Trending Playbooks for HK Businesses
              </h2>
            </div>
            <p className="text-sm sm:text-base text-tech-200 ml-[52px]">
              Step-by-step AI workflows tailored for Hong Kong founders and teams
            </p>
          </div>
          <Link
            href="/playbooks"
            className="group inline-flex items-center gap-1.5 text-sm text-neon-light hover:text-neon transition shrink-0"
          >
            All playbooks
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <FeaturedPlaybooks />
      </section>

      {/* ───── WHY HK MATTERS ───── */}
      <section className="border-t border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-2 justify-center">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-400/20 to-rose-500/10 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-red-300" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
                Why Hong Kong Needs Its Own AI Tool Ranking
              </h2>
            </div>
            <p className="text-sm sm:text-base text-tech-200 text-center mt-4 max-w-2xl mx-auto">
              Hong Kong is a unique AI market. You need tools that work in Traditional Chinese, 
              comply with PDPO, offer local support, and price in HKD. Generic global rankings 
              won't tell you if a tool works here.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
              <div className="rounded-xl border border-tech-500/20 bg-tech-700/40 p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-sky-500/10 flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-cyan-300" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">Traditional Chinese First</h3>
                <p className="text-xs text-tech-300 leading-relaxed">
                  Tools are ranked on their support for 繁體中文 — from UI localization to content generation quality.
                </p>
              </div>
              <div className="rounded-xl border border-tech-500/20 bg-tech-700/40 p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400/20 to-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-6 h-6 text-emerald-300" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">PDPO Compliance Checked</h3>
                <p className="text-xs text-tech-300 leading-relaxed">
                  We verify data residency and privacy compliance with Hong Kong&apos;s Personal Data (Privacy) Ordinance.
                </p>
              </div>
              <div className="rounded-xl border border-tech-500/20 bg-tech-700/40 p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-asia/20 to-amber-500/10 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-6 h-6 text-asia" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">HKD & Local Pricing</h3>
                <p className="text-xs text-tech-300 leading-relaxed">
                  Tools that offer Hong Kong pricing, local payment methods (FPS), and regional support teams ranked higher.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── HK AI STATS ───── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center gap-3 mb-2 justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-asia/20 to-amber-500/10 flex items-center justify-center shrink-0">
              <BarChart3 className="w-5 h-5 text-asia" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Hong Kong AI Market Snapshot
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-8 max-w-3xl mx-auto">
          {[
            { value: '85+', label: 'Curated AI Tools', icon: Sparkles },
            { value: '90%', label: 'Support Traditional Chinese', icon: Globe },
            { value: '75%', label: 'Offer HKD Pricing', icon: DollarSign },
            { value: '60%', label: 'PDPO Compliant', icon: ShieldCheck },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-tech-500/20 bg-tech-700/40 p-5 text-center">
              <div className="w-10 h-10 rounded-xl bg-tech-600/60 flex items-center justify-center mx-auto mb-3 border border-tech-500/20">
                <stat.icon className="w-5 h-5 text-neon-light" />
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-white block">{stat.value}</span>
              <span className="text-xs sm:text-sm text-tech-300">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section className="relative overflow-hidden border-t border-tech-500/20">
        <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />
        <div className="absolute top-[-30%] left-[-10%] w-[70%] h-[70%] bg-neon/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-aqua/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-400/10 border border-red-400/20 text-red-300 text-xs font-medium mb-6">
            <MapPin className="w-3.5 h-3.5" />
            Built for Hong Kong Teams
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            Find the Right AI Tool for Your Hong Kong Business
          </h2>
          <p className="mt-4 text-base sm:text-lg text-tech-200 max-w-2xl mx-auto">
            No more guessing if a tool works in HK. Every tool on Apifeny AI is rated for Traditional Chinese support, 
            local pricing, and PDPO compliance. Start exploring — no account needed.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/tools"
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-neon to-neon-dark text-white font-semibold text-sm sm:text-base transition-all hover:shadow-lg hover:shadow-neon/25 hover:-translate-y-0.5"
            >
              <span>Explore All {totalCount}+ Tools</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-tech-500/40 text-tech-100 hover:border-neon/30 hover:text-white text-sm sm:text-base font-medium transition-all"
            >
              Browse by Category
            </Link>
          </div>
        </div>
      </section>

      {/* ───── BLOG CROSS-LINKS ───── */}
      <BlogCategoryLinks
        slugs={['ai-tools', 'comparisons', 'productivity', 'solopreneur']}
        heading="Hong Kong-Inspired AI Guides"
      />

      {/* ───── LANDING PAGE CROSS-LINKS ───── */}
      <LandingPageCrossLinks currentSlug="ai-tools-hong-kong" />

      {/* ───── SEO FOOTER KEYWORDS ───── */}
      <section className="border-t border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="text-center">
            <p className="text-[10px] text-tech-400 leading-loose max-w-3xl mx-auto">
              <strong className="text-tech-300">Hong Kong AI tools:</strong>{' '}
              best AI tools in Hong Kong 2026 · AI tools for Hong Kong businesses · Hong Kong AI software · 
              AI writing tools Hong Kong · AI coding tools Hong Kong · AI marketing Hong Kong · 
              Hong Kong AI directory · AI tools for HK startups · 香港AI工具 · traditional Chinese AI tools · 
              affordable AI tools Hong Kong · free AI tools Hong Kong · AI productivity Hong Kong · 
              Hong Kong tech stack · PDPO compliant AI tools
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
