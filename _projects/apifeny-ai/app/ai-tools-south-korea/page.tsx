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
  Layers,
  Building2,
  Users,
  Smartphone,
  Briefcase,
  Heart,
  Camera,
  Hash,
} from 'lucide-react';

import SeoMetadata from '@/components/SeoMetadata';
import FeaturedPlaybooks from '@/components/FeaturedPlaybooks';
import BlogCategoryLinks from '@/components/BlogCategoryLinks';
import LandingPageCrossLinks from '@/components/LandingPageCrossLinks';
import { toolsData } from '@/lib/data';
import { cn } from '@/lib/utils';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import GeoSeoSchema from '@/components/GeoSeoSchema';

// ─── Constants ────────────────────────────────────────────────

const META = {
  title: 'Best AI Tools in South Korea (2026) — 100+ Tools for Korean Startups & Chaebols',
  description:
    'Discover the best AI tools for South Korea\'s $21B AI market. 100+ ranked tools with KRW/USD pricing, PIPA compliance, Korean (한국어) language support, and enterprise ecosystem fit. Updated for Seoul, Busan, Daejeon & Pangyo.',
  ogTitle: 'Best AI Tools in South Korea (2026) — Apifeny AI',
  ogDescription:
    '100+ AI tools ranked for the South Korean market. 🇰🇷 Korean language support, KRW/USD pricing, PIPA compliant, curated for Korea\'s chaebol-led enterprise and K-startup ecosystem.',
  ogImage: '/og/ai-tools-south-korea.png',
};

const TRUST_SECTIONS = [
  {
    icon: Globe,
    title: '🇰🇷 한국어 & English',
    description:
      'Korean-first tools optimised for South Korea\'s monolingual-first workforce. Platforms ranked by their Korean (한국어) language support, Hangul rendering, and localisation quality alongside English-dominant enterprise tools popular in Seoul\'s Gangnam, Jongno, and Pangyo tech valleys.',
  },
  {
    icon: DollarSign,
    title: '₩ KRW / USD Pricing',
    description:
      'All tool prices shown in both South Korean Won (₩) and USD. Korea\'s advanced digital payment ecosystem means tools accepting KRW via local methods (KakaoPay, Naver Pay, Toss) are prioritised for consumer and SME adoption.',
  },
  {
    icon: ShieldCheck,
    title: '🔒 PIPA Compliance Reviewed',
    description:
      'Every tool evaluated against Korea\'s Personal Information Protection Act (PIPA). We flag compliance risks, highlight tools with Korea-based data centres (AWS Seoul, GCP Seoul, Naver Cloud), and note those aligning with KISA\'s AI governance recommendations.',
  },
  {
    icon: Building2,
    title: '🏢 Korea Chaebol & Startup Ready',
    description:
      'Curated for South Korea\'s unique dual economy — from Samsung, LG, SK, and Hyundai\'s enterprise AI deployments to Pangyo\'s K-startup ecosystem, Daejeon\'s KAIST deep-tech research, and Busan\'s smart city AI initiatives.',
  },
];

const KR_AI_SNAPSHOT = [
  { label: 'AI Market (2026)', value: '$21.2B', sub: 'World\'s 12th largest economy, 5th in AI readiness' },
  { label: '5G Penetration', value: '97%', sub: 'World\'s highest — driving real-time AI adoption' },
  { label: 'AI Research Output', value: '#6 Global', sub: 'KAIST, Seoul National, POSTECH leading globally' },
  { label: 'K-Startups', value: '40,000+', sub: 'Pangyo, Seoul, Busan — Asia\'s most dynamic startup ecosystem' },
];

const WHY_KR = [
  {
    icon: Smartphone,
    title: 'Korea\'s AI Powerhouse — World-Leading Infrastructure',
    description:
      'South Korea\'s $21.2B AI market is one of the most advanced globally, powered by the world\'s highest 5G penetration (97%), a government investing $1.3B in AI R&D, and a unique chaebol-startup dynamic where Samsung, LG, SK, and Naver compete alongside 40,000+ K-startups. Korea ranks #6 globally in AI research output.',
  },
  {
    icon: Building2,
    title: 'Chaebol AI Dominance & K-Cloud Ecosystem',
    description:
      'Korea\'s family-run conglomerates (chaebols) control 60%+ of GDP and are racing to deploy enterprise AI — Samsung\'s Bespoke AI appliances, LG\'s AI-powered manufacturing, Hyundai\'s autonomous driving. Meanwhile, Naver Cloud and Kakao are building Korea-specific AI platforms competing with global providers, creating a uniquely bifurcated market.',
  },
  {
    icon: Users,
    title: 'K-Content & Entertainment AI Goldmine',
    description:
      'Korea\'s cultural export machine — K-Pop (BTS, BLACKPINK, NewJeans), K-Dramas (Squid Game, Parasite), K-Beauty, and K-Gaming (PUBG, League of Korea) — generates a uniquely valuable AI niche for content creation, virtual production, deepfake detection, fan engagement analytics, and AI-powered music production.',
  },
];

// ─── Tool Categories ──────────────────────────────────────────

const WRITING_CATEGORY = {
  id: 'writing',
  name: 'Writing & Content Creation',
  icon: BookOpen,
  description:
    'AI writing tools optimised for South Korea\'s content ecosystem — from Korean (한국어) business writing and honorific (존댓말) formal communication to bilingual marketing materials and social media management for KakaoTalk, Naver Blog, Instagram Korea, and YouTube Korea.',
  tools: [
    { name: 'Jasper AI', tag: 'Best for Marketing Copy', description: 'Enterprise-grade AI writing with multilingual support. Popular with Seoul\'s top advertising agencies (Cheil Worldwide, Innocean) and brand managers creating Korean marketing content.' },
    { name: 'Writesonic', tag: 'Best Value', description: 'Affordable AI writing with Korean tone settings. ~$10/mo starting — ideal for Korean SMEs and freelance copywriters in Gangnam and Hongdae.' },
    { name: 'ChatGPT', tag: 'Most Used in Korea', description: 'Overwhelmingly popular across South Korea. Strong Korean language capabilities for honorifics (존댓말), business correspondence, and bilingual content generation.' },
    { name: 'HyperCLOVA X', tag: 'Naver\'s Korean AI', description: 'Naver\'s homegrown LLM — best-in-class for Korean language tasks. Integrated with Naver Search, SmartStore, and Works. Preferred by Korean enterprises for PIPA-compliant AI deployments.' },
  ],
};

const CODING_CATEGORY = {
  id: 'coding',
  name: 'Coding & Development',
  icon: Briefcase,
  description:
    'Development tools powering South Korea\'s software ecosystem — from Seoul\'s fintech revolution (KakaoBank, Toss, Viva Republica) to Daejeon\'s deep-tech AI labs and the sprawling Samsung, LG, and SK engineering campuses.',
  tools: [
    { name: 'GitHub Copilot', tag: 'Best Overall', description: 'The standard for Korean dev teams. Strong Python, TypeScript, and Go support. Widely adopted across Samsung SDS, Naver, Kakao, and Seoul\'s startup scene.' },
    { name: 'Claude', tag: 'Best for Architecture', description: 'Gaining rapid traction among Korean enterprise developers for code review, architecture design, and technical documentation in both Korean and English.' },
    { name: 'Cursor', tag: 'Rising Star', description: 'AI-native IDE gaining popularity in Korean coding bootcamps (Code States, Wecode, Team Spart) and Korea\'s growing developer community on Naver D2 and Kakao Tech.' },
    { name: 'Perplexity', tag: 'Best for Research', description: 'Widely adopted by Korean researchers and engineers for technical research, API documentation lookup, and staying current with AI/ML developments in Korea\'s deep-tech sector.' },
  ],
};

const MARKETING_CATEGORY = {
  id: 'marketing',
  name: 'Marketing & E-Commerce',
  icon: BarChart3,
  description:
    'Marketing AI tools for South Korea\'s unique digital landscape — where KakaoTalk dominates messaging (96% penetration), Naver rules search and commerce, Coupang leads e-commerce, and YouTube Korea powers creator economy.',
  tools: [
    { name: 'AdCreative.ai', tag: 'Best for Ads', description: 'AI ad creative generator optimised for the Korean market. Train on your product catalog for Coupang, Naver SmartStore, KakaoTalk Ads, and GMarket with Korean copy and minimalist Korean design aesthetics.' },
    { name: 'Canva AI', tag: 'Most Accessible', description: 'Overwhelmingly popular in Korea. AI-powered design for social media, online shopping banners, and video content. Korean templates, fonts, and seasonal design assets (Chuseok, Seollal) included.' },
    { name: 'Gamma', tag: 'Best for Presentations', description: 'AI presentation tool gaining traction in Korean enterprise. Creates bilingual decks with proper Korean formatting — popular in Seoul consulting firms and K-startup pitch decks targeting global VCs.' },
    { name: 'Notion AI', tag: 'Best for Teams', description: 'Deeply adopted by Korean tech companies and startups for knowledge management. Korean community templates on Naver Blog, and strong adoption in Korean remote-work teams.' },
  ],
};

const DESIGN_CATEGORY = {
  id: 'design',
  name: 'Design & Creative',
  icon: Camera,
  description:
    'Design tools powering South Korea\'s creative economy — from Seoul\'s world-class advertising agencies (Cheil, Innocean, HS Ad) and Gangnam\'s creative studios to the booming K-Content industry spanning gaming, animation, and virtual production.',
  tools: [
    { name: 'Canva', tag: 'Most Popular', description: 'The #1 design tool in Korea. AI features (Magic Studio, text-to-image, background removal) make it indispensable for Korean creators, small businesses, and enterprise marketing teams.' },
    { name: 'Midjourney', tag: 'Best for Art', description: 'Hugely popular among Korean digital artists, webtoon (웹툰) creators, and game concept designers. Unique aesthetic sensibilities make it a favourite in Seoul\'s creative studios.' },
    { name: 'Adobe Firefly', tag: 'Best Quality', description: 'Generative AI integrated into Creative Cloud. Preferred by Korea\'s top ad agencies and professional designers for commercial-grade output with Korean typography (Hangul) support.' },
    { name: 'DALL-E 3', tag: 'Best Integration', description: 'Integrated with ChatGPT — widely used by Korean content creators, marketers, and small businesses for rapid image generation with Korean text prompts and characters.' },
  ],
};

const ALL_CATEGORIES = [WRITING_CATEGORY, CODING_CATEGORY, MARKETING_CATEGORY, DESIGN_CATEGORY];

// ─── Top 12 Tools ─────────────────────────────────────────────

const TOP_PICK_PREFIX = [
  { name: 'ChatGPT', tag: 'Best Overall AI Assistant in Korea', trend: 'up' as const },
  { name: 'GitHub Copilot', tag: 'Best AI Coding Assistant', trend: 'up' as const },
  { name: 'Claude', tag: 'Best for Long-Form & Enterprise', trend: 'up' as const },
  { name: 'Notion AI', tag: 'Most Used for Korean Teams', trend: 'up' as const },
  { name: 'Canva', tag: 'Most Used Design Tool in Korea', trend: 'up' as const },
  { name: 'Midjourney', tag: 'Best AI Art for Korean Aesthetics', trend: 'up' as const },
  { name: 'Jasper AI', tag: 'Best for Marketing Copy', trend: 'up' as const },
  { name: 'Perplexity', tag: 'Best Research Assistant', trend: 'up' as const },
  { name: 'AdCreative.ai', tag: 'Best for Korean E-Commerce Ads', trend: 'up' as const },
  { name: 'Writesonic', tag: 'Best Value Writing Tool', trend: 'up' as const },
  { name: 'HyperCLOVA X', tag: 'Best Korean-Language LLM', trend: 'up' as const },
  { name: 'Gamma', tag: 'Best AI Presentations', trend: 'up' as const },
];

const TOP_PICKS = TOP_PICK_PREFIX.map((item, i) => ({ ...item, rank: i + 1 }));

// ─── Components ───────────────────────────────────────────────

function TrendBadge({ trend }: { trend: 'up' | 'stable' | 'new' }) {
  const styles = {
    up: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    stable: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    new: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  };
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium', styles[trend])}>
      {trend === 'up' && <TrendingUp className="h-3 w-3" />}
      {trend === 'new' && <Sparkles className="h-3 w-3" />}
      {trend === 'stable' && <Star className="h-3 w-3" />}
      {trend === 'up' ? 'Trending' : trend === 'new' ? 'New' : 'Stable'}
    </span>
  );
}

// ─── Page Component ───────────────────────────────────────────

export default function AiToolsSouthKoreaPage() {
  return (
    <>
      <SeoMetadata
        title={META.title}
        description={META.description}
        ogTitle={META.ogTitle}
        ogDescription={META.ogDescription}
        ogImage={META.ogImage}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: 'https://apifeny-ai.vercel.app' },
          { name: 'AI Tools South Korea', item: 'https://apifeny-ai.vercel.app/ai-tools-south-korea' },
        ]}
      />
      <GeoSeoSchema
        countryName="South Korea"
        countryCode="kr"
        capital="Seoul"
        currency="KRW"
        language="Korean"
        languageCode="ko"
        marketSize="$1.7T GDP, 52M population, world's most digitally connected country"
        slug="ai-tools-south-korea"
        faqs={[
          { question: "What are the best AI tools in South Korea?", answer: "The best AI tools in South Korea include ChatGPT for productivity, GitHub Copilot for development, Canva AI for design, and local platforms like Naver's HyperCLOVA X for Korean-optimised AI. South Korea's world-leading digital infrastructure and government-driven AI push make it an advanced AI market." },
          { question: "Are AI tools accessible for Korean businesses?", answer: "South Korea has the world's fastest average internet speed and 97% smartphone penetration. The Digital New Deal supports AI adoption with ₩76T in funding. Government K-Cloud projects subsidise AI for SMEs. Most global AI tools offer Korean language support." },
          { question: "What AI tools are best for Korea's semiconductor industry?", answer: "Korea's semiconductor industry (led by Samsung and SK Hynix, 20% of global market) uses AI for chip design optimisation, defect detection, and yield prediction. Synopsys AI, Cadence AI, and Samsung's own AI Foundry Solutions are transforming semiconductor manufacturing." },
          { question: "What AI regulations apply in South Korea?", answer: "Korea's Personal Information Protection Act (PIPA) is one of Asia's strictest data privacy laws. The AI Act (2024) provides a comprehensive regulatory framework. The Korea Internet & Security Agency (KISA) enforces data protection compliance for AI systems." },
          { question: "Is Korean language well supported by AI tools?", answer: "Korean has excellent AI support. ChatGPT handles Korean well, but Naver's HyperCLOVA X and Kakao's KoGPT often outperform on Korean-language tasks. Major enterprise tools offer Korean localisation. The government's AI Hub provides Korean-language datasets and models." },
        ]}
      />

      <main className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-950 dark:via-blue-950/10 dark:to-gray-950">
        {/* ── Hero ─────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-blue-100/50 dark:border-blue-900/20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(60,90,210,0.06),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(60,90,210,0.08),transparent_50%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(204,0,0,0.04),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_bottom_left,rgba(204,0,0,0.06),transparent_50%)] pointer-events-none" />
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 relative">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-[#3C5AD2] dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
                <MapPin className="h-4 w-4" />
                🇰🇷 Curated for South Korea
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
                Best AI Tools in{' '}
                <span className="bg-gradient-to-r from-[#3C5AD2] via-[#CC0000] to-[#003478] bg-clip-text text-transparent">
                  South Korea
                </span>{' '}
                (2026)
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                100+ AI tools ranked for South Korea's $21.2B market — with <strong>KRW/USD pricing</strong>,{' '}
                <strong>한국어 (Korean) language support</strong>, and ratings for Korea's{' '}
                <strong>chaebol-led enterprise, world-leading 5G infrastructure, and K-startup ecosystem</strong>.
                Updated daily.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#top-picks"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#3C5AD2] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200/50 transition-all hover:bg-[#2E47A8] hover:shadow-blue-300/50 dark:shadow-blue-900/30"
                >
                  <Trophy className="h-4 w-4" />
                  View Top Rankings
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#categories"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <Layers className="h-4 w-4" />
                  Browse by Category
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust Signals ───────────────────────────── */}
        <section className="border-b border-gray-100 dark:border-gray-800">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {TRUST_SECTIONS.map((s) => (
                <div
                  key={s.title}
                  className="rounded-xl border border-blue-100/60 bg-white/80 p-5 shadow-sm transition-all hover:shadow-md dark:border-blue-900/30 dark:bg-gray-900/80"
                >
                  <s.icon className="mb-3 h-6 w-6 text-[#3C5AD2]" />
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Korea Market Snapshot ────────────────────── */}
        <section className="border-b border-gray-100 dark:border-gray-800">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              🇰🇷 South Korea AI Market Snapshot
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500 dark:text-gray-400">
              Key metrics driving AI adoption in South Korea — the world's 5th most AI-ready economy with
              world-leading digital infrastructure and a unique chaebol-startup dynamic.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {KR_AI_SNAPSHOT.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-blue-100/60 bg-white p-6 text-center shadow-sm dark:border-blue-900/30 dark:bg-gray-900"
                >
                  <p className="text-3xl font-bold text-[#3C5AD2] dark:text-blue-400">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-300">{stat.label}</p>
                  <p className="mt-0.5 text-xs text-gray-400">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Korea ──────────────────────────────── */}
        <section className="border-b border-gray-100 dark:border-gray-800">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              Why South Korea Needs Its Own AI Rankings
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500 dark:text-gray-400">
              Global AI tool rankings miss what makes Korea unique — from PIPA compliance and Naver's ecosystem dominance
              to chaebol procurement cycles and the K-Content AI opportunity. Here's why a dedicated Korea ranking matters.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {WHY_KR.map((item) => (
                <div
                  key={item.title}
                  className="group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-[#3C5AD2]/30 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-[#3C5AD2]/40"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#3C5AD2]/10 text-[#3C5AD2] dark:bg-blue-900/30 dark:text-blue-400">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Top 12 Rankings ─────────────────────────── */}
        <section id="top-picks" className="border-b border-gray-100 dark:border-gray-800">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                🏆 Top 12 AI Tools in South Korea
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                Our daily-updated ranking of the most popular and effective AI tools for the
                South Korean market, curated based on local usage patterns, Korean language support,
                chaebol enterprise readiness, and affordability.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {TOP_PICKS.map((tool) => (
                <div
                  key={tool.rank}
                  className={cn(
                    'group relative rounded-xl border p-5 transition-all hover:shadow-md',
                    tool.rank <= 3
                      ? 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-white dark:border-yellow-900/50 dark:from-yellow-950/20 dark:to-gray-950'
                      : 'border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/50'
                  )}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold',
                        tool.rank === 1
                          ? 'bg-yellow-400 text-yellow-900'
                          : tool.rank === 2
                          ? 'bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-gray-200'
                          : tool.rank === 3
                          ? 'bg-amber-600 text-white'
                          : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                      )}
                    >
                      {tool.rank}
                    </span>
                    <TrendBadge trend={tool.trend} />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">{tool.name}</h3>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{tool.tag}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Category Sections ───────────────────────── */}
        <section id="categories" className="border-b border-gray-100 dark:border-gray-800">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                📂 Browse by Category
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                Explore AI tools organised by category, each curated for the South Korean market
                with local context and ecosystem fit.
              </p>
            </div>
            <div className="space-y-12">
              {ALL_CATEGORIES.map((cat) => (
                <div key={cat.id} id={cat.id}>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3C5AD2]/10 text-[#3C5AD2] dark:bg-blue-900/30 dark:text-blue-400">
                      <cat.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{cat.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{cat.description}</p>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {cat.tools.map((tool) => (
                      <div
                        key={tool.name}
                        className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#3C5AD2]/20 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50"
                      >
                        <span className="inline-block rounded-full bg-[#3C5AD2]/10 px-2.5 py-0.5 text-xs font-medium text-[#3C5AD2] dark:bg-blue-900/40 dark:text-blue-300">
                          {tool.tag}
                        </span>
                        <h4 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">{tool.name}</h4>
                        <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400">{tool.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────── */}
        <section className="bg-gradient-to-r from-[#3C5AD2] via-[#CC0000] to-[#003478]">
          <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              한국 비즈니스에 가장 적합한 AI 도구를 찾고 계신가요?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-white/80">
              Browse our full directory of 600+ AI tools, filter by category, compare pricing in KRW/USD,
              and read honest reviews from Korean users and enterprise buyers. Your next productivity breakthrough
              is one click away.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#3C5AD2] shadow-lg transition-all hover:bg-blue-50"
              >
                Browse Full Directory
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                <BookOpen className="h-4 w-4" />
                블로그 보기 — Read AI Guides
              </Link>
            </div>
          </div>
        </section>

        {/* ── Blog & Playbooks ───────────────────────── */}
        <section className="border-b border-gray-100 dark:border-gray-800">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              📖 Learn More About AI in South Korea
            </h2>
            <div className="grid gap-8 lg:grid-cols-2">
              <BlogCategoryLinks slugs={['ai-tools', 'comparisons', 'productivity']} />
              <FeaturedPlaybooks />
            </div>
          </div>
        </section>

        {/* ── Cross Links ─────────────────────────────── */}
        <section className="border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/50">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <LandingPageCrossLinks currentSlug="ai-tools-south-korea" />
          </div>
        </section>

        {/* ── Footer ──────────────────────────────────── */}
        <footer className="border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-950">
          <div className="mx-auto max-w-7xl px-4 py-8 text-center text-xs text-gray-400 sm:px-6 lg:px-8">
            <p>Apifeny AI — Independent AI Tool Rankings for South Korea. Not affiliated with any listed tool.</p>
            <p className="mt-1">Prices shown in KRW/USD are approximate and may vary. Always verify pricing on the tool's official website.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
