'use client';

import { useMemo } from 'react';
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
  Wallet,
  ShieldCheck,
  BarChart3,
  CheckCircle,
  Quote,
  Layers,
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
  title: 'Best AI Tools in Nigeria (2026) — Curated for NG Startups & Teams',
  description:
    'Discover the best AI tools for Nigeria businesses and founders. Curated directory of 85+ tools ranked by trending score, Africa-readiness, and local relevance. Updated daily. Supports English and regional languages.',
  ogTitle: 'Best AI Tools in Nigeria (2026) — Apifeny AI',
  ogDescription:
    'Find AI tools built for Nigeria: local NGN pricing, NDPR data compliance, and Africa market readiness. 85+ tools, expert ranked.',
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

// ─── Component ────────────────────────────────────────────────────────────────

export default function AIToolsNigeriaPage() {
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

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Nigeria', item: '/ai-tools-nigeria' },
        ]}
      />
      <GeoSeoSchema
        countryName="Nigeria"
        countryCode="ng"
        capital="Abuja"
        currency="NGN"
        language="English"
        languageCode="en"
        marketSize={"$577B economy (largest in Africa), 225M population, booming fintech scene (Flutterwave, Paystack, Interswitch), Africa's largest startup ecosystem with YC-backed startups and unicorns"}
        slug="ai-tools-nigeria"
        faqs={[
          { question: "What are the best AI tools in Nigeria?", answer: "The best AI tools in Nigeria include ChatGPT for content creation and productivity, GitHub Copilot for software development, Canva AI for design, and Google AI tools for business automation. Nigeria's thriving tech ecosystem — home to unicorns like Flutterwave and Africa's largest startup scene in Lagos — makes AI adoption a key priority for businesses, fintechs, and startups across Lagos, Abuja, and Port Harcourt." },
          { question: "Are AI tools Nigeria-ready for local businesses?", answer: "Yes, Nigeria's digital infrastructure is expanding rapidly with growing mobile penetration, expanding cloud adoption, and a thriving fintech ecosystem supporting digital payments (Flutterwave, Paystack, Interswitch). Nigerian businesses benefit from strong mobile money infrastructure, and the government's Nigeria AI Strategy and NITDA digital transformation initiatives. Many tools now offer NGN-friendly pricing and Africa-focused features." },
          { question: "What AI tools are best for Nigeria's key industries?", answer: "Nigeria's key sectors benefiting from AI include: fintech AI for digital payments and lending platforms (Flutterwave, Paystack, Carbon, FairMoney); e-commerce AI for Jumia and regional marketplaces; agricultural AI for crop monitoring and supply chain optimization; edtech AI for platforms like uLesson and AltSchool; and healthtech AI for telemedicine and diagnostics." },
          { question: "How can Nigerian startups adopt AI cost-effectively?", answer: "Nigerian startups can leverage NITDA innovation grants, Lagos State tech fund initiatives, and incubator programs like Co-Creation Hub (CcHub), Ventures Park, and the Lagos Tech Hub accelerator. Most AI tools offer free tiers (ChatGPT Free, Google Colab, GitHub Copilot free for students via GitHub Education, TensorFlow/PyTorch open source) — ideal for MVP development before fundraising from VCs like TLcom Capital and EchoVC." },
          { question: "What AI regulations exist in Nigeria?", answer: "Nigeria's AI governance is guided by the National AI Strategy and NITDA (National Information Technology Development Agency) digital transformation framework. The Nigeria Data Protection Regulation (NDPR) governs data handling for AI tools, overseen by the Nigeria Data Protection Commission (NDPC). The NCC (Nigerian Communications Commission) regulates AI in telecom and digital services, while the CBN (Central Bank of Nigeria) oversees fintech AI tools. Tools handling sensitive data should consider local cloud infrastructure options." },
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-xs sm:text-sm font-medium mb-6 animate-fade-in">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Nigeria-Focused · Updated Daily · {totalCount}+ Curated Tools
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight animate-slide-up">
              Best AI Tools for{' '}
              <span className="bg-gradient-to-r from-green-500 via-white to-green-400 bg-clip-text text-transparent">
                Nigeria
              </span>
              <br />
              <span className="text-tech-100">in 2026</span>
            </h1>

            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-tech-200 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Curated AI tools that <strong className="text-white">actually work for Nigeria</strong>. 
              We rank every tool on African market readiness, local pricing in NGN,
              NDPR data compliance, and fintech ecosystem fit — so you find tools built for Nigeria,
              not Silicon Valley.
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

            {/* NG-specific trust indicators */}
            <div className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-tech-300 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>English</span>
              </div>
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-yellow-400" />
                <span>NGN Local Pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-aqua" />
                <span>NDPR Data Compliance</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-neon-light" />
                <span>Nigeria Startup-Ready</span>
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Top AI Tools in Nigeria
              </h2>
            </div>
            <p className="text-sm sm:text-base text-tech-200 ml-[52px]">
              Highest-rated tools across all categories — ranked by trending score and Africa-readiness
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
                    ? 'bg-gradient-to-br from-green-400 to-white text-black'
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
                            ? 'fill-green-400 text-green-400'
                            : s === 'half'
                            ? 'fill-green-400/50 text-green-400'
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

        <div className="mt-10 text-center">
          <Link
            href="/tools"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-neon to-neon-dark text-white font-semibold text-sm sm:text-base transition-all hover:shadow-lg hover:shadow-neon/25 hover:-translate-y-0.5"
          >
            <span>Explore All {totalCount}+ Tools →</span>
          </Link>
        </div>
      </section>

      {/* ───── WHY NIGERIA MATTERS ───── */}
      <section className="border-y border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-white/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Why Nigeria Needs Its Own AI Tool Directory
              </h2>
            </div>
            <p className="text-sm sm:text-base text-tech-200 max-w-xl mx-auto">
              Most AI tool rankings are built for US or EU markets. Here&apos;s what matters for Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Globe,
                title: "Africa&apos;s Largest Economy",
                description: "With a $577B economy and 225M population, Nigeria is Africa&apos;s biggest market. We flag every tool for African market relevance so you don&apos;t discover regional gaps mid-deployment — critical for serving the continent&apos;s most dynamic digital economy.",
                gradient: 'from-neon/10 to-purple-900/10',
              },
              {
                icon: Wallet,
                title: 'NGN Pricing & Local Payments',
                description: "USD pricing doesn&apos;t reflect Nigerian buying power with 1 USD ≈ 1,500 NGN. We surface tools with regional pricing, NGN billing, and local payment methods including Flutterwave, Paystack, and Interswitch.",
                gradient: 'from-green-500/10 to-emerald-900/10',
              },
              {
                icon: ShieldCheck,
                title: 'NDPR & Data Sovereignty',
                description: "With the Nigeria Data Protection Regulation (NDPR) enforced by the Nigeria Data Protection Commission (NDPC), we rank tools by whether they offer regional cloud infrastructure and data compliance for Nigerian businesses.",
                gradient: 'from-aqua/10 to-cyan-900/10',
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

      {/* ───── CATEGORY SECTIONS ───── */}
      {categorySections.map((section) => {
        const sectionSlug = section.name === 'Writing & Content' ? 'writing-content'
          : section.name === 'Code & Development' ? 'code-development'
          : section.name === 'Design & Creative' ? 'design-creative'
          : 'marketing-seo';

        return (
          <section
            key={section.name}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 border-b border-tech-500/10 last:border-b-0"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Best AI {section.name.replace('Writing & Content', 'Writing Tools').replace('Code & Development', 'Coding Tools').replace('Design & Creative', 'Design Tools').replace('Marketing & SEO', 'Marketing Tools')} for Nigeria
                </h2>
                <p className="text-sm text-tech-200 mt-1 max-w-xl">
                  Top picks for NG teams — rated for local relevance, pricing, and support.
                </p>
              </div>
              <Link
                href={`/categories/${sectionSlug}`}
                className="group inline-flex items-center gap-1.5 text-sm text-neon-light hover:text-neon transition shrink-0"
              >
                View all {section.count} tools
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.tools.slice(0, 6).map((tool) => (
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
                      <Star className="w-2.5 h-2.5 fill-green-400 text-green-400" />
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

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={`/categories/${sectionSlug}`}
                className="inline-flex items-center gap-1 text-xs text-tech-300 hover:text-neon-light transition"
              >
                Browse all {section.name} tools for Nigeria
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </section>
        );
      })}

      {/* ───── FEATURED PLAYBOOKS ───── */}
      <section className="border-y border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Step-by-Step AI Playbooks
              </h2>
              <p className="text-xs sm:text-sm text-tech-200">
                Battle-tested guides to ship AI workflows — built for Nigerian teams and startups
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
        </div>
      </section>

      {/* ───── STATS BAR ───── */}
      <section className="border-y border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {[
              { label: 'Curated AI Tools', value: `${totalCount}+`, icon: Layers },
              { label: 'Playbooks', value: `${playbooks.length}+`, icon: BookOpen },
              { label: 'Expert Rankings', value: '5+', icon: Trophy },
              { label: 'NG-Ready Filters', value: '4', icon: CheckCircle },
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

      {/* ───── NIGERIA ECOSYSTEM ───── */}
      <section className="border-y border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Nigeria&apos;s AI Ecosystem Is Rising
              </h2>
            </div>
            <p className="text-sm sm:text-base text-tech-200 max-w-2xl mx-auto">
              From Lagos&apos;s thriving startup scene to the National AI Strategy, Nigeria is becoming
              Africa&apos;s ultimate tech frontier. Here&apos;s what it means for AI tool selection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "🇳🇬 Lagos Startup Scene",
                description: "Lagos is Africa&apos;s startup capital — home to YC-backed companies, unicorns like Flutterwave, and a thriving fintech ecosystem. We prioritize tools with affordable pricing, English language support, and African payment integration.",
              },
              {
                title: "💰 Fintech Dominance",
                description: "Nigeria leads Africa in fintech innovation with payment giants Flutterwave, Paystack (acquired by Stripe), and Interswitch. We check tools for fintech compatibility, mobile money integration, and NGN billing support.",
              },
              {
                title: "🌍 Pan-African Gateway",
                description: "With the largest economy and population in Africa, Nigeria serves as the gateway to the continent. Tools that work well in Nigeria typically scale to Ghana, Kenya, South Africa, and beyond.",
              },
              {
                title: "🏛️ Government Digital Push",
                description: "The Nigeria AI Strategy, NITDA digital transformation agenda, and Lagos State tech initiatives are driving AI adoption across sectors. Access to CBN fintech sandboxes and NCC regulatory frameworks supports innovation.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-tech-800/70 border border-tech-500/20 rounded-xl p-5 hover:border-neon/20 transition"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-tech-200 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section className="relative overflow-hidden border-t border-tech-500/20">
        <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />
        <div className="absolute top-[-30%] left-[-10%] w-[70%] h-[70%] bg-neon/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-aqua/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-xs font-medium mb-6">
            <MapPin className="w-3.5 h-3.5" />
            Built for Nigerian Founders, Fintechs & Teams
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            Find the Right AI Tool for Your Nigeria Business
          </h2>
          <p className="mt-4 text-base sm:text-lg text-tech-200 max-w-2xl mx-auto">
            No more guessing if a tool works in Nigeria. Every tool on Apifeny AI is rated for African market readiness, NGN pricing, and NDPR compliance. Start exploring — no account needed.
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
        heading="Nigeria-Focused AI Guides"
      />

      {/* ───── LANDING PAGE CROSS-LINKS ───── */}
      <LandingPageCrossLinks currentSlug="ai-tools-nigeria" />

      {/* ───── SEO FOOTER KEYWORDS ───── */}
      <section className="border-t border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="text-center">
            <p className="text-[10px] text-tech-400 leading-loose max-w-3xl mx-auto">
              <strong className="text-tech-300">Nigeria AI tools:</strong>{' '}
              best AI tools in Nigeria 2026 · AI tools for Nigeria businesses · Nigeria AI software · 
              AI writing tools Nigeria · AI coding tools Nigeria · AI marketing Nigeria · 
              Nigeria AI directory · AI tools for NG startups · affordable AI tools Nigeria · 
              free AI tools Nigeria · AI productivity Nigeria · Nigeria tech stack · 
              'AI tools for Lagos · AI tools for Abuja · AI tools for Port' Harcourt · African AI tools
            </p>
          </div>
        </div>
      </section>
    </>
  );
}