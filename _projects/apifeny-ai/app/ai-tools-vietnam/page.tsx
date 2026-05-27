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
  title: 'Công Cụ AI Tốt Nhất tại Việt Nam (2026) — 85+ Tools Cho Startup & Doanh Nghiệp',
  description:
    'Khám phá các công cụ AI tốt nhất cho doanh nghiệp Việt Nam. Danh mục 85+ công cụ được xếp hạng theo trend, hỗ trợ tiếng Việt, PDPA, và định giá VND. Cập nhật hằng ngày.',
  ogTitle: 'Công Cụ AI Tốt Nhất tại Việt Nam (2026) — Apifeny AI',
  ogDescription:
    'Tìm công cụ AI phù hợp với doanh nghiệp Việt: hỗ trợ tiếng Việt, giá VND, tuân thủ PDPA, và sẵn sàng cho thị trường châu Á. 85+ công cụ, xếp hạng chuyên gia.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

const CATEGORY_VIETNAMESE: Record<string, string> = {
  'Writing & Content': 'Công Cụ Viết',
  'Code & Development': 'Công Cụ Lập Trình',
  'Design & Creative': 'Công Cụ Thiết Kế',
  'Marketing & SEO': 'Công Cụ Marketing',
};

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

export default function AIToolsVietnamPage() {
  const top12 = useMemo(() => topByTrending(12), []);

  const categorySections = useMemo(
    () =>
      CATEGORY_NAMES.map((name) => ({
        name,
        vietnameseName: CATEGORY_VIETNAMESE[name],
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
    script.id = 'ai-tools-vietnam-jsonld';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Công Cụ AI Tốt Nhất tại Việt Nam (2026)',
      description: 'Danh mục 85+ công cụ AI hàng đầu cho doanh nghiệp, startup và đội nhóm tại Việt Nam.',
      url: 'https://apifeny.ai/ai-tools-vietnam',
      inLanguage: 'vi-VN',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Apifeny AI',
        url: 'https://apifeny.ai',
      },
    });
    const existing = document.getElementById('ai-tools-vietnam-jsonld');
    if (existing) existing.remove();
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, []);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Vietnam', item: '/ai-tools-vietnam' },
        ]}
      />
      <GeoSeoSchema
        countryName="Vietnam"
        countryCode="vn"
        capital="Hanoi"
        currency="VND"
        language="Vietnamese"
        languageCode="vi"
        marketSize="$430B GDP, 100M population, fastest-growing digital economy in SE Asia"
        slug="ai-tools-vietnam"
        faqs={[
          { question: "What are the best AI tools in Vietnam?", answer: "The best AI tools for Vietnamese teams include ChatGPT for content creation, GitHub Copilot for development, Canva AI for design, and Zalo AI for local-language processing. Vietnam's rapidly expanding digital economy and young, tech-savvy population drive strong AI adoption." },
          { question: "Are AI tools accessible for Vietnamese businesses?", answer: "Yes, but pricing matters. Most global AI tools charge in USD, which affects affordability. Vietnamese businesses benefit from local alternatives like Zalo AI, Vbee for TTS, and FPT.AI. The government's National Digital Transformation Programme targets 100% digital enterprises and offers technology adoption incentives." },
          { question: "What AI tools suit Vietnam's key industries?", answer: "Manufacturing (35% of GDP) benefits from computer vision AI for quality control. E-commerce benefits from chatbots and recommendation engines. Fintech uses AI for credit scoring and fraud detection. Agriculture AI for crop monitoring is growing with support from the MARD digital farming initiative." },
          { question: "What AI regulations apply in Vietnam?", answer: "Vietnam's Cybersecurity Law (2018) and Decree 13/2023 on Personal Data Protection affect AI tool deployment. Cross-border data transfers require government approval. AI tools processing Vietnamese user data should consider local servers in Ho Chi Minh City or Hanoi." },
          { question: "Is Vietnamese language well supported by AI tools?", answer: "Support is growing. ChatGPT handles Vietnamese well. Google Translate and DeepL have good Vietnamese support. Local tools like Zalo AI, Vbee, and VinaSpeech provide Vietnamese-first functionality. The Vietnamese government's Make in Vietnam initiative promotes domestic AI solutions." },
        ]}
      />
      <SeoMetadata
        title={META.title}
        description={META.description}
        ogTitle={META.ogTitle}
        ogDescription={META.ogDescription}
        ogImage={META.ogImage}
      />

      {/* ───── HREF LANG TAGS ───── */}
      <HeadHreflang />

      {/* ───── HERO ───── */}
      <section className="relative overflow-hidden border-b border-tech-500/20">
        <div className="absolute inset-0 bg-tech-grid opacity-40 pointer-events-none" />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge — Vietnam red & yellow theme */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-red-300 text-xs sm:text-sm font-medium mb-6 animate-fade-in">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Việt Nam-Focused · Updated Daily · {totalCount}+ Curated Tools
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight animate-slide-up">
              AI Tools for{' '}
              <span className="bg-gradient-to-r from-red-500 via-yellow-400 to-red-400 bg-clip-text text-transparent">
                Vietnam
              </span>
              <br />
              <span className="text-tech-100">in 2026</span>
            </h1>

            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-tech-200 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Curated AI tools that <strong className="text-white">actually work for Vietnam</strong>. 
              We rank every tool on tiếng Việt language support, VND pricing transparency, PDPA data residency compliance,
              and local enterprise readiness — so you find tools built for Vietnam, not Silicon Valley.
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

            {/* VN-specific trust indicators */}
            <div className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-tech-300 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>🇻🇳 Tiếng Việt (Full Support)</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-yellow-400" />
                <span>VND Pricing Checked</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-aqua" />
                <span>PDPA & Data Residency</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-red-400" />
                <span>VN Enterprise Ready</span>
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-yellow-500/10 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5 text-red-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Top AI Tools in Vietnam
              </h2>
            </div>
            <p className="text-sm sm:text-base text-tech-200 ml-[52px]">
              Highest-rated tools across all categories — ranked by trending score and Vietnam-readiness
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
                    ? 'bg-gradient-to-br from-red-500 to-yellow-400 text-black'
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
                            ? 'fill-yellow-400 text-yellow-400'
                            : s === 'half'
                            ? 'fill-yellow-400/50 text-yellow-400'
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
                    className="h-full rounded-full bg-gradient-to-r from-red-500 to-yellow-400 transition-all duration-500"
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

      {/* ───── WHY VIETNAM NEEDS ITS OWN RANKING ───── */}
      <section className="border-y border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-yellow-500/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-red-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Why Vietnam Needs Its Own AI Tool Ranking
              </h2>
            </div>
            <p className="text-sm sm:text-base text-tech-200 max-w-xl mx-auto">
              Most AI tool rankings are built for US or EU markets. Here's what matters for Vietnam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Globe,
                title: '🇻🇳 Tiếng Việt First',
                description: 'Vietnamese is spoken by 90M+ people, but many AI tools treat it as an afterthought. We rank tools on genuine Vietnamese language support — from UI localization to content generation in tiếng Việt with proper diacritics and tone accuracy.',
                gradient: 'from-red-500/10 to-rose-900/10',
              },
              {
                icon: ShieldCheck,
                title: '🛡️ PDPA Compliance',
                description: 'Vietnam\'s Personal Data Protection Act (PDPA), effective July 2023, imposes strict requirements on data processing, cross-border transfers, and user consent. We verify which tools meet Vietnam\'s data protection standards.',
                gradient: 'from-aqua/10 to-cyan-900/10',
              },
              {
                icon: DollarSign,
                title: '💰 VND Pricing Transparency',
                description: 'With 1 USD ≈ 25,000 VND, dollar-based pricing can be prohibitively expensive for VN teams. We surface tools with VND pricing, local payment methods (VietQR, Momo, VNPay), and transparent regional pricing tiers.',
                gradient: 'from-yellow-500/10 to-amber-900/10',
              },
              {
                icon: Building2,
                title: '🏢 Local Ecosystem Focus',
                description: 'From HCMC\'s tech corridor to Hanoi\'s startup hubs, Vietnam\'s AI ecosystem is booming. We prioritize tools with Vietnamese support teams, local servers, and proven adoption in VN enterprises and startups.',
                gradient: 'from-emerald-500/10 to-green-900/10',
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`relative rounded-xl bg-gradient-to-br ${item.gradient} bg-tech-700 border border-tech-500/30 p-6`}
              >
                <div className="absolute inset-0 bg-tech-grid opacity-20 rounded-xl pointer-events-none" />
                <div className="relative">
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
                  Best AI {section.vietnameseName} for Vietnam
                </h2>
                <p className="text-sm text-tech-200 mt-1 max-w-xl">
                  Top picks for VN teams — rated for tiếng Việt support, local pricing, and regional relevance.
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
                      <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
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
                Browse all {section.name} tools for Vietnam
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
                Battle-tested guides to ship AI workflows — relevant for VN teams too
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

      {/* ───── VIETNAM AI MARKET SNAPSHOT ───── */}
      <section className="border-y border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-yellow-500/10 flex items-center justify-center shrink-0">
                <BarChart3 className="w-5 h-5 text-red-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Vietnam AI Market Snapshot
              </h2>
            </div>
            <p className="text-sm sm:text-base text-tech-200 max-w-2xl mx-auto">
              Vietnam is one of Southeast Asia's fastest-growing AI markets — driven by a young tech workforce,
              government-backed National AI Strategy, and surging fintech & manufacturing adoption.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto mb-10">
            {[
              { value: '85+', label: 'Curated AI Tools', icon: Sparkles },
              { value: '50%+', label: 'Tools Support Tiếng Việt', icon: Globe },
              { value: '15M+', label: 'VN Tech Workforce', icon: Building2 },
              { value: '2023', label: 'PDPA Effective Year', icon: ShieldCheck },
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {[
              {
                title: '🇻🇳 National AI Strategy',
                description: 'Vietnam\'s government launched the National Strategy on AI R&D and Application (2021-2030), targeting Vietnam as an AI innovation hub in ASEAN. This drives enterprise AI adoption across sectors.',
              },
              {
                title: '🏙️ HCMC & Hanoi Tech Hubs',
                description: 'Ho Chi Minh City and Hanoi host vibrant developer communities with 500K+ software engineers. Vietnamese developers are early adopters of AI coding tools, making local relevance critical.',
              },
              {
                title: '🏭 Manufacturing & Fintech AI',
                description: 'Vietnam\'s manufacturing sector (15% of GDP) and booming fintech scene are adopting AI rapidly — from predictive maintenance to fraud detection. Tools serving these verticals rank higher.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-tech-800/70 border border-tech-500/20 rounded-xl p-5 hover:border-red-500/30 transition"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-tech-200 leading-relaxed">{item.description}</p>
              </div>
            ))}
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
              { label: 'VN-Ready Filters', value: '4', icon: CheckCircle },
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

      {/* ───── CTA ───── */}
      <section className="relative overflow-hidden border-t border-tech-500/20">
        <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />
        <div className="absolute top-[-30%] left-[-10%] w-[70%] h-[70%] bg-red-500/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-red-300 text-xs font-medium mb-6">
            <MapPin className="w-3.5 h-3.5" />
            Xây Dựng Cho Đội Ngũ Việt Nam — Built for VN Teams
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            Tìm Công Cụ AI Phù Hợp Cho Doanh Nghiệp Của Bạn
          </h2>
          <p className="mt-4 text-base sm:text-lg text-tech-200 max-w-2xl mx-auto">
            Không còn phải đoán xem công cụ nào hoạt động tốt tại Việt Nam. Mọi công cụ trên Apifeny AI đều được đánh giá về hỗ trợ tiếng Việt, giá cả VND, và tuân thủ PDPA. Bắt đầu khám phá — không cần tài khoản.
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
        heading="Vietnam-Inspired AI Guides"
      />

      {/* ───── LANDING PAGE CROSS-LINKS ───── */}
      <LandingPageCrossLinks currentSlug="ai-tools-vietnam" />

      {/* ───── SEO FOOTER KEYWORDS ───── */}
      <section className="border-t border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="text-center">
            <p className="text-[10px] text-tech-400 leading-loose max-w-3xl mx-auto">
              <strong className="text-tech-300">Vietnam AI tools:</strong>{' '}
              best AI tools in Vietnam 2026 · AI tools for Vietnam businesses · Vietnam AI software · 
              công cụ AI tại Việt Nam · AI writing tools Vietnam · AI coding tools Vietnam · AI marketing Vietnam · 
              Vietnam AI directory · AI tools for VN startups · tiếng Việt AI tools · 
              affordable AI tools Vietnam · free AI tools Vietnam · AI productivity Vietnam · 
              Vietnam tech stack · PDPA compliant AI tools · HCMC AI tools · Hanoi AI tools
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Hreflang Head Injection ────────────────────────────────

function HeadHreflang() {
  useEffect(() => {
    const links = [
      { rel: 'alternate', hrefLang: 'vi-VN', href: 'https://apifeny.ai/ai-tools-vietnam' },
      { rel: 'alternate', hrefLang: 'en-VN', href: 'https://apifeny.ai/ai-tools-vietnam' },
      { rel: 'alternate', hrefLang: 'x-default', href: 'https://apifeny.ai/ai-tools-vietnam' },
      { rel: 'canonical', hrefLang: '', href: 'https://apifeny.ai/ai-tools-vietnam' },
    ];

    links.forEach(({ rel, hrefLang, href }) => {
      const attr = hrefLang ? 'hreflang' : 'rel';
      const selector = hrefLang
        ? `link[rel="${rel}"][hreflang="${hrefLang}"]`
        : `link[rel="${rel}"]`;
      
      let el = document.querySelector(selector) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        if (hrefLang) el.setAttribute('hreflang', hrefLang);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    });
  }, []);

  return null;
}