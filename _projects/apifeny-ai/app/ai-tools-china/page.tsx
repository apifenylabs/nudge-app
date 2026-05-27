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
import { cn } from '@/lib/utils';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import GeoSeoSchema from '@/components/GeoSeoSchema';

// ─── Constants ────────────────────────────────────────────────────────────────

const META = {
  title: 'Best AI Tools in China (2026) — Curated for China Developers & Teams',
  description:
    'Discover the best AI tools for China. Curated directory of 85+ tools ranked for Chinese language support, ¥ RMB pricing, data compliance (CSL/PIPL/DSL), and China market readiness. Updated daily.',
  ogTitle: 'Best AI Tools in China (2026) — Apifeny AI',
  ogDescription:
    'Find AI tools built for China: 中文 support, ¥ RMB pricing, China data compliance, and WeChat/Alipay ecosystem readiness. 85+ tools, expert ranked.',
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

export default function AIToolsChinaPage() {
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
          { name: 'AI Tools China', item: '/ai-tools-china' },
        ]}
      />
      <GeoSeoSchema
        countryName="China"
        countryCode="cn"
        capital="Beijing"
        currency="CNY (¥)"
        language="Chinese"
        languageCode="zh"
        marketSize={"$18T+ economy, 1.4B population, world's #2 AI ecosystem, Beijing/Zhongguancun AI hub, Shanghai AI cluster, Shenzhen tech ecosystem, Hangzhou Alibaba AI ecosystem, 1B+ internet users, world leader in AI patent filings and computer vision"}
        slug="ai-tools-china"
        faqs={[
          { question: "What are the best AI tools in China?", answer: "The best AI tools in China range from global platforms with 中文 support (ChatGPT, Claude, Gemini) to China-native powerhouses (Baidu ERNIE Bot, Alibaba Tongyi Qianwen, ByteDance Doubao, Zhipu GLM, MiniMax, Baichuan, SenseTime, Megvii). China is the world's #2 AI ecosystem behind the US, with Beijing's Zhongguancun, Shanghai's Zhangjiang, and Shenzhen's tech corridor producing a continuous stream of cutting-edge AI innovation." },
          { question: "Are foreign AI tools accessible in China?", answer: "Many global AI tools are accessible in China but with caveats. ChatGPT, Claude, and Gemini require VPN access due to China's Great Firewall. However, an increasing number of tools offer China-hosted versions or partnerships: Microsoft Azure OpenAI Service operates through 21Vianet in China, and many SaaS platforms have dedicated 中国版 (China editions) with local data residency. China's domestic AI ecosystem is exceptionally strong, with Baidu, Alibaba, Tencent, and ByteDance investing billions in AI." },
          { question: "What are the best AI tools for China's key industries?", answer: "China's AI strength spans: manufacturing & Industry 4.0 (Hikvision computer vision, Megvii industrial inspection, Baidu Apollo autonomous driving), fintech (Ant Group, WeChat Pay AI, JD Finance), healthcare AI (Ping An Health, Tencent Miying, iFlytek medical AI), e-commerce AI (Alibaba's Tongyi LLM, JD.com supply chain AI, Pinduoduo recommendation engines), edtech (Squirrel AI, Yuanfudao, iFlytek), and smart city AI (Dahua, Hikvision, SenseTime urban management systems)." },
          { question: "How can Chinese developers and startups adopt AI cost-effectively?", answer: "China developers benefit from the world's most aggressive cloud pricing: Alibaba Cloud, Baidu AI Cloud, Tencent Cloud, and Huawei Cloud all offer generous free tiers, startup credits, and SDK/API access. Alibaba Cloud's AI Platform provides access to Tongyi Qianwen and model-as-a-service pricing starting at ¥0.003 per 1K tokens. Baidu's Qianfan platform offers ERNIE Bot API access with free quotas. Startup incubators in Zhongguancun (Beijing), Zhangjiang (Shanghai), and Nanshan (Shenzhen) provide subsidized AI compute credits." },
          { question: "What AI regulations apply in China?", answer: "China has the world's most comprehensive AI regulatory framework: the Personal Information Protection Law (PIPL, 2021), Data Security Law (DSL, 2021), Cybersecurity Law (CSL, 2017), and the landmark AI governance regulations (2023) requiring algorithm filing, safety assessments, and content watermarking for generative AI services. The Cyberspace Administration of China (CAC) oversees AI content. Deep synthesis and generative AI services must register with the CAC and pass security reviews." },
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-600/20 text-red-400 text-xs sm:text-sm font-medium mb-6 animate-fade-in">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              China-Focused · Updated Daily · {totalCount}+ Curated Tools
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight animate-slide-up">
              Best AI Tools for{' '}
              <span className="bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 bg-clip-text text-transparent">
                China
              </span>
              <br />
              <span className="text-tech-100">in 2026</span>
            </h1>

            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-tech-200 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Curated AI tools that <strong className="text-white">actually work for China</strong>. 
              We rank every tool on 中文 (Chinese) language support, local ¥ RMB pricing,
              PIPL/DSL/CSL data compliance, and China ecosystem readiness — so you find tools
              built for Beijing, Shanghai, and Shenzhen, not just Silicon Valley.
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

            {/* China-specific trust indicators */}
            <div className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-tech-300 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>中文 / English</span>
              </div>
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-yellow-400" />
                <span>Local Pricing (¥ RMB)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-aqua" />
                <span>PIPL / DSL / CSL Compliance</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-neon-light" />
                <span>China Ecosystem Ready</span>
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600/20 to-yellow-500/10 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5 text-red-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Top AI Tools in China
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
                    ? 'bg-gradient-to-br from-red-500 to-yellow-400 text-white'
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
                            ? 'fill-yellow-400 text-yellow-500'
                            : s === 'half'
                            ? 'fill-yellow-400/50 text-yellow-500'
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

      {/* ───── WHY CHINA MATTERS ───── */}
      <section className="border-y border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600/20 to-yellow-500/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-red-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Why China Needs Its Own AI Tool Directory
              </h2>
            </div>
            <p className="text-sm sm:text-base text-tech-200 max-w-xl mx-auto">
              Most AI tool rankings are built for US or EU markets. Here's what matters for China.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Globe,
                title: '中文 First, English Second',
                description: 'China operates primarily in 中文 (Simplified Chinese) for all business, government, and consumer interactions. We flag every tool for Chinese UI/UX support, Chinese customer service, and Simplified Chinese documentation — critical for teams in Beijing, Shanghai, Shenzhen, and across all of China\'s 1.4B-user market.',
                gradient: 'from-red-600/10 to-yellow-600/10',
              },
              {
                icon: Wallet,
                title: '¥ RMB Pricing & Local Payments',
                description: 'Global USD pricing doesn\'t work for China. We surface tools with ¥ RMB pricing (人民币), WeChat Pay integration, Alipay support, China cloud hosting (Alibaba Cloud, Baidu Cloud, Tencent Cloud), and local bank transfer options that China-based teams actually use.',
                gradient: 'from-green-500/10 to-emerald-900/10',
              },
              {
                icon: ShieldCheck,
                title: 'China Data Compliance (PIPL / DSL / CSL)',
                description: 'China\'s Personal Information Protection Law (PIPL), Data Security Law (DSL), and Cybersecurity Law (CSL) create one of the strictest data governance regimes globally. We rank tools by whether they offer China-hosted infrastructure, data residency guarantees, cross-border data transfer compliance, and CAC algorithm filing for AI services.',
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
                  <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-tech-200 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CATEGORY SECTIONS ───── */}
      {categorySections.map((section) => (
        <section key={section.name} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 scroll-mt-20" id={section.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {section.name} Tools for China
              </h2>
              <p className="text-sm sm:text-base text-tech-200 mt-1">
                {section.count} tools ranked for China market readiness
              </p>
            </div>
            <Link
              href={`/categories/${section.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
              className="group inline-flex items-center gap-1.5 text-sm text-neon-light hover:text-neon transition shrink-0"
            >
              View all {section.count} tools
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {section.tools.map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className={cn(
                  'group relative block rounded-xl border border-tech-500/30 bg-tech-700 p-5 transition-all duration-300',
                  'hover:border-neon/40 hover:shadow-lg hover:shadow-neon/5 hover:-translate-y-1'
                )}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-tech-500 to-tech-600 flex items-center justify-center shrink-0 border border-tech-400/30">
                    <span className="text-white font-bold text-sm">
                      {tool.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-white truncate group-hover:text-neon-light transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-tech-200 line-clamp-2 mt-0.5 leading-relaxed">
                      {tool.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
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
                              ? 'fill-yellow-400 text-yellow-500'
                              : s === 'half'
                              ? 'fill-yellow-400/50 text-yellow-500'
                              : 'fill-none text-tech-400'
                          )}
                        />
                      ));
                    })()}
                  </div>
                  <span className="text-xs text-tech-200">{tool.avg_rating.toFixed(1)}</span>
                  <div className="ml-auto flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-neon-light" />
                    <span className="text-[10px] font-medium text-neon-light">{tool.trending_score}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* ───── CHINA ECOSYSTEM ───── */}
      <section className="border-y border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600/20 to-yellow-500/10 flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5 text-red-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                China's AI Ecosystem at a Glance
              </h2>
            </div>
            <p className="text-sm sm:text-base text-tech-200 max-w-xl mx-auto">
              Understanding China's unique AI landscape is essential for choosing the right tools.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
            {[
              {
                title: '🇨🇳 Beijing AI Hub (Zhongguancun)',
                description: 'China\'s Silicon Valley — home to Baidu, ByteDance, Zhipu AI, SenseTime, Megvii, and 15,000+ AI startups. The Zhongguancun Science Park hosts China\'s National Engineering Laboratory for Deep Learning and the Beijing Academy of AI (BAAI), creators of the Wudao and Aquila foundation models.',
              },
              {
                title: '🌊 Shanghai AI Cluster (Zhangjiang)',
                description: 'Shanghai\'s Zhangjiang AI Island and Lin-gang Special Area form China\'s premier AI innovation hub. Shanghai is home to the Shanghai AI Laboratory, the World AI Conference (WAIC), and major AI operations from Microsoft, AWS, and Alibaba Cloud.',
              },
              {
                title: '🔌 Shenzhen Tech Corridor',
                description: 'The hardware capital of the world — Shenzhen\'s Nanshan district hosts Huawei, Tencent, DJI, and ZTE. The city is China\'s IoT and edge AI leader, with deep connections to the manufacturing supply chain and the Greater Bay Area\'s AI development zone.',
              },
              {
                title: '🏆 China AI Foundation Models',
                description: 'China\'s LLM ecosystem is the world\'s most competitive after the US: Baidu ERNIE Bot (文心一言), Alibaba Tongyi Qianwen (通义千问), ByteDance Doubao (豆包), Zhipu GLM (智谱), MiniMax, Baichuan (百川), 01.AI Yi, and SenseTime SenseNova — each with unique strengths in 中文 comprehension, multimodal capabilities, and industry-specific fine-tuning.',
              },
              {
                title: '📱 WeChat & Alipay Ecosystem',
                description: 'China\'s super-app ecosystem defines the AI experience. WeChat (1.3B+ MAU), Alipay (1B+ MAU), and Douyin (800M+ DAU) are AI-powered platforms integrating voice assistants, recommendation engines, computer vision, and payment AI. Tools that integrate with these ecosystems have massive distribution advantages.',
              },
              {
                title: '🔬 R&D & Government Support',
                description: 'China\'s 14th Five-Year Plan allocates ¥1.4T ($194B) to digital economy AI, and the New Generation AI Development Plan (2017) targets China as the world leader in AI by 2030. Key initiatives include the National AI Open Innovation Platforms, AI grand challenges, and smart city AI pilots across 500+ cities.',
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

      {/* ───── FEATURED PLAYBOOKS ───── */}
      <FeaturedPlaybooks />

      {/* ───── CTA ───── */}
      <section className="relative overflow-hidden border-t border-tech-500/20">
        <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />
        <div className="absolute top-[-30%] left-[-10%] w-[70%] h-[70%] bg-neon/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-aqua/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-600/20 text-red-400 text-xs font-medium mb-6">
            <MapPin className="w-3.5 h-3.5" />
            Built for China Developers, Startups & Enterprises
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            Find the Right AI Tool for Your China Business
          </h2>
          <p className="mt-4 text-base sm:text-lg text-tech-200 max-w-2xl mx-auto">
            No more guessing if a tool works in China. Every tool on Apifeny AI is rated for 中文 support, ¥ RMB pricing, and China data compliance (PIPL/DSL/CSL). Start exploring — no account needed.
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
        heading="China-Focused AI Guides"
      />

      {/* ───── LANDING PAGE CROSS-LINKS ───── */}
      <LandingPageCrossLinks currentSlug="ai-tools-china" />

      {/* ───── SEO FOOTER KEYWORDS ───── */}
      <section className="border-t border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="text-center">
            <p className="text-[10px] text-tech-400 leading-loose max-w-3xl mx-auto">
              <strong className="text-tech-300">China AI tools:</strong>{' '}
              best AI tools in China 2026 · AI tools for China developers · China AI software · 
              AI writing tools China · AI coding tools China · AI marketing China · 
              China AI directory · AI tools for China startups · affordable AI tools China · 
              free AI tools China · AI productivity China · China tech stack · 
              AI tools Beijing · AI tools Shanghai · AI tools Shenzhen · 
              中国AI工具 · 国内最好的AI工具 · AI软件中国 · 中文AI工具
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
