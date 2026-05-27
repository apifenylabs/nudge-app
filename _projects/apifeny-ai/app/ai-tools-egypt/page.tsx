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
  title: 'Best AI Tools in Egypt (2026) — Curated for Egyptian Startups & Teams',
  description:
    'Discover the best AI tools for Egyptian businesses and founders. Curated directory of 85+ tools ranked by trending score, Africa-readiness, and local relevance. Updated daily. Supports Arabic, English, and regional languages.',
  ogTitle: 'Best AI Tools in Egypt (2026) — Apifeny AI',
  ogDescription:
    'Find AI tools built for Egypt: local EGP pricing, data compliance, Arabic multilingual support, and African market readiness. 85+ tools, expert ranked.',
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

export default function AIToolsEgyptPage() {
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
          { name: 'AI Tools Egypt', item: '/ai-tools-egypt' },
        ]}
      />
      <GeoSeoSchema
        countryName="Egypt"
        countryCode="eg"
        capital="Cairo"
        currency="EGP"
        language="Arabic"
        languageCode="ar"
        marketSize={"$470B economy, 110M population, North Africa's largest economy, fastest-growing startup ecosystem in Africa, booming ICT sector (Cairo ICT, MCIT strategy), strategic Suez Canal corridor"}
        slug="ai-tools-egypt"
        faqs={[
          { question: "ما هي أفضل أدوات الذكاء الاصطناعي في مصر في 2026؟", answer: "أفضل أدوات الذكاء الاصطناعي في مصر تشمل ChatGPT لإنشاء المحتوى والإنتاجية، وGitHub Copilot لتطوير البرمجيات، وCanva AI للتصميم، وأدوات Google AI للتشغيل الآلي. تشهد مصر نموًا سريعًا في مجال الذكاء الاصطناعي بدعم من وزارة الاتصالات وتكنولوجيا المعلومات (MCIT) والاستراتيجية الوطنية للذكاء الاصطناعي، مع أبرز المراكز في القاهرة والإسكندرية والمدن الذكية الجديدة." },
          { question: "هل أدوات الذكاء الاصطناعي مناسبة للسوق المصري؟", answer: "نعم، البنية التحتية الرقمية في مصر تشهد تطورًا كبيرًا مع انتشار الإنترنت فائق السرعة ومراكز البيانات الإقليمية (AWS البحرين، Azure الإمارات) ونظام المدفوعات الرقمية (فوري، إنستاباي، فودافون كاش). قانون حماية البيانات الشخصية المصري (قانون 151/2020) ينظم معالجة البيانات. الاستراتيجية الوطنية للذكاء الاصطناعي ورؤية مصر 2030 تدفعان بتبني الذكاء الاصطناعي في القطاعات الحيوية." },
          { question: "ما هي أدوات الذكاء الاصطناعي الأفضل للقطاعات الرئيسية في مصر؟", answer: "القطاعات المصرية الأكثر استفادة تشمل: الخدمات المالية (البنوك المصرية تستخدم الذكاء الاصطناعي للتمويل والكشف عن الاحتيال)، التكنولوجيا المالية (فوري، فالو)، الاتصالات (WE، أورنج)، اللوجستيات (قناة السويس، النقل الذكي)، التعليم (منصات مثل إدراك ونهم)، والرعاية الصحية (المستشفيات تستخدم الذكاء الاصطناعي للتشخيص)." },
          { question: "كيف يمكن للشركات الناشئة المصرية تبني الذكاء الاصطناعي بتكلفة معقولة؟", answer: "يمكن للشركات الناشئة المصرية الاستفادة من دعم هيئة تنمية صناعة تكنولوجيا المعلومات (ITIDA)، صندوق رعاية الابتكار، وحاضنات الأعمال مثل TIEC وCreativa. تقدم أدوات الذكاء الاصطناعي خططًا مجانية (ChatGPT Free، Google Colab، GitHub Copilot للطلاب) مثالية للنماذج الأولية قبل جمع التمويل." },
          { question: "ما هي اللوائح المنظمة للذكاء الاصطناعي في مصر؟", answer: "مصر تعمل على تطوير إطار تنظيمي شامل للذكاء الاصطناعي تحت إشراف المجلس الوطني للذكاء الاصطناعي (NCAI). قانون حماية البيانات الشخصية (قانون 151/2020) هو التشريع الرئيسي لحماية البيانات، وينظمه مركز حماية البيانات الشخصية. البنك المركزي المصري ينظم أدوات الذكاء الاصطناعي في القطاع المالي." },
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-medium mb-6 animate-fade-in">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Egypt-Focused · Updated Daily · {totalCount}+ Curated Tools
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight animate-slide-up">
              Best AI Tools for{' '}
              <span className="bg-gradient-to-r from-red-600 via-white to-black bg-clip-text text-transparent">
                Egypt
              </span>
              <br />
              <span className="text-tech-100">in 2026</span>
            </h1>

            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-tech-200 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Curated AI tools that <strong className="text-white">actually work for Egypt</strong>. 
              We rank every tool on Arabic/English multilingual support, local pricing in EGP,
              data protection compliance, and African market readiness — so you find tools built for Egypt,
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

            {/* Egypt-specific trust indicators */}
            <div className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-tech-300 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>العربية / English</span>
              </div>
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-yellow-400" />
                <span>Local Pricing (EGP)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-aqua" />
                <span>Data Protection & Compliance</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-neon-light" />
                <span>Egypt Startup-Ready</span>
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Top AI Tools in Egypt
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
                    ? 'bg-gradient-to-br from-red-500 to-white text-black'
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

      {/* ───── WHY PAKISTAN MATTERS ───── */}
      <section className="border-y border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-white/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Why Egypt Needs Its Own AI Tool Directory
              </h2>
            </div>
            <p className="text-sm sm:text-base text-tech-200 max-w-xl mx-auto">
              Most AI tool rankings are built for US or EU markets. Here's what matters for Egypt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Globe,
                title: 'Bilingual by Default',
                description: 'Egypt operates in Arabic and English across business, government, and education. We flag every tool for Arabic-language support so you don\'t discover language gaps mid-workflow — critical for serving a population of 110M+ across Egypt\'s unique position as the Arab world\'s tech and cultural hub.',
                gradient: 'from-neon/10 to-purple-900/10',
              },
              {
                icon: Wallet,
                title: 'EGP Pricing & Local Payments',
                description: 'USD pricing doesn\'t reflect Egyptian buying power with 1 USD ≈ 280 EGP. We surface tools with regional pricing, EGP billing, and local payment methods including JazzCash, Easypaisa, and NayaPay.',
                gradient: 'from-green-500/10 to-emerald-900/10',
              },
              {
                icon: ShieldCheck,
                title: 'Data Protection & Data Sovereignty',
                description: 'With the Prevention of Electronic Crimes Act (Data Protection) 2016, Egypt\'s Personal Data Protection Bill, and growing cybersecurity focus, we rank tools by whether they offer regional cloud infrastructure and data compliance for Egyptian businesses.',
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
                  Best AI {section.name.replace('Writing & Content', 'Writing Tools').replace('Code & Development', 'Coding Tools').replace('Design & Creative', 'Design Tools').replace('Marketing & SEO', 'Marketing Tools')} for Egypt
                </h2>
                <p className="text-sm text-tech-200 mt-1 max-w-xl">
                  Top picks for Egypt teams — rated for local relevance, pricing, and support.
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
                Browse all {section.name} tools for Egypt
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
                Battle-tested guides to ship AI workflows — built for Egyptian teams and freelancers
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
              { label: 'Egypt-Ready Filters', value: '4', icon: CheckCircle },
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

      {/* ───── PAKISTAN ECOSYSTEM ───── */}
      <section className="border-y border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Egypt's AI Ecosystem Is Rising Fast
              </h2>
            </div>
            <p className="text-sm sm:text-base text-tech-200 max-w-2xl mx-auto">
              From freelancer-friendly IT policies to the Digital Egypt initiative, Egypt is becoming
              North Africa's next tech frontier. Here's what it means for AI tool selection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {[
              {
                title: '🇵🇰 Digital Egypt & Ignite',
                description: 'Egypt\'s Ministry of Communications and Information Technology (MCIT) has launched a comprehensive AI strategy under Egypt Vision 2030. The National Council for Artificial Intelligence (NCAI) drives AI policy, while Cairo ICT and the Creativa innovation hubs foster the startup ecosystem.',
              },
              {
                title: '🏢 Cairo / Alexandria / Islamabad Tech Hubs',
                description: 'Egypt\'s three major tech hubs host thriving startup ecosystems and a massive freelance workforce. We prioritize tools with affordable pricing, Arabic support, and local payment integration.',
              },
              {
                title: '💰 EGP Affordability & Digital Payments',
                description: 'With 1 USD ≈ 280 EGP, USD-priced tools can be prohibitively expensive. We flag tools with regional pricing, EGP billing, and lower-cost alternatives for Egyptian businesses and freelancers.',
              },
              {
                title: '🌏 African AI Hub & Digital Transformation',
                description: 'Egypt is the 3rd largest freelancer market globally with over 1M+ freelancers on Upwork, Fiverr, and Freelancer. We check tools for freelancer-friendly pricing and remote collaboration features.',
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium mb-6">
            <MapPin className="w-3.5 h-3.5" />
            Built for Egyptian Founders, Freelancers & Teams
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            Find the Right AI Tool for Your Egypt Business
          </h2>
          <p className="mt-4 text-base sm:text-lg text-tech-200 max-w-2xl mx-auto">
            No more guessing if a tool works in Egypt. Every tool on Apifeny AI is rated for Arabic/English support, EGP pricing, and Asia readiness. Start exploring — no account needed.
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
        heading="Egypt-Focused AI Guides"
      />

      {/* ───── LANDING PAGE CROSS-LINKS ───── */}
      <LandingPageCrossLinks currentSlug="ai-tools-pakistan" />

      {/* ───── SEO FOOTER KEYWORDS ───── */}
      <section className="border-t border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="text-center">
            <p className="text-[10px] text-tech-400 leading-loose max-w-3xl mx-auto">
              <strong className="text-tech-300">Egypt AI tools:</strong>{' '}
              best AI tools in Egypt 2026 · AI tools for Egypt businesses · Egypt AI software · 
              AI writing tools Egypt · AI coding tools Egypt · AI marketing Egypt · 
              Egypt AI directory · AI tools for Egypt startups · affordable AI tools Egypt · 
              free AI tools Egypt · AI productivity Egypt · Egypt tech stack · 
              AI tools Cairo · AI tools Alexandria · AI tools Islamabad · Arabic AI tools
            </p>
          </div>
        </div>
      </section>
    </>
  );
}