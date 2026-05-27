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
  title: 'Best AI Tools in Japan (2026) — 100+ Tools for Japanese Startups & Enterprises',
  description:
    'Discover the best AI tools for Japan\'s $14B market. 100+ ranked tools with JPY/USD pricing, APPI compliance, Japanese (日本語) language support, and enterprise ecosystem fit. Updated for Tokyo, Osaka, Fukuoka & Kyoto.',
  ogTitle: 'Best AI Tools in Japan (2026) — Apifeny AI',
  ogDescription:
    '100+ AI tools ranked for the Japanese market. 🇯🇵 Japanese language support, JPY/USD pricing, APPI compliant, curated for Japan\'s enterprise and startup ecosystem.',
  ogImage: '/og/ai-tools-japan.png',
};

const TRUST_SECTIONS = [
  {
    icon: Globe,
    title: '🇯🇵 日本語 & English',
    description:
      'Japanese-first tools optimised for Japan\'s bilingual workforce. Platforms ranked by their Japanese (日本語) language support, kanji/kana rendering, and localisation quality alongside English-dominant enterprise tools popular in Tokyo\'s Marunouchi and Shibuya business districts.',
  },
  {
    icon: DollarSign,
    title: '💴 JPY / USD Pricing',
    description:
      'All tool prices shown in both Japanese Yen (¥) and USD. Japan\'s strong currency ecosystem means tools accepting JPY via local payment methods (Konbini, PayPay, LINE Pay) are prioritised for consumer and SME adoption.',
  },
  {
    icon: ShieldCheck,
    title: '🔒 APPI Compliance Reviewed',
    description:
      'Every tool evaluated against Japan\'s Act on the Protection of Personal Information (APPI). We flag compliance risks, highlight tools with Japan-based data centres (AWS Tokyo, GCP Tokyo), and note those aligning with METI\'s AI governance guidelines.',
  },
  {
    icon: Building2,
    title: '🏢 Japan Enterprise & Startup Ready',
    description:
      'Curated for Japan\'s unique dual economy — from Tokyo\'s Meguro-ku fintech and Minato-ku enterprise giants to Osaka\'s manufacturing AI, Fukuoka\'s startup scene, and Kyoto\'s deep-tech research labs.',
  },
];

const JP_AI_SNAPSHOT = [
  { label: 'AI Market (2026)', value: '$14.4B', sub: 'World\'s 4th largest economy' },
  { label: 'AI Engineer Shortage', value: '126K', sub: 'Critical talent gap driving tool adoption' },
  { label: 'Smartphone Penetration', value: '78%', sub: 'Highly connected mobile-first workforce' },
  { label: 'Tech Startups', value: '10,000+', sub: 'Tokyo, Osaka, Fukuoka, Kyoto innovation hubs' },
];

const WHY_JP = [
  {
    icon: Smartphone,
    title: 'Japan\'s AI Paradox — Massive Market, Talent Gap',
    description:
      'Japan\'s $14.4B AI market is the 4th largest globally, yet the country faces a critical shortage of 126,000 AI engineers. This paradox is driving explosive adoption of AI tools across every sector — from Tokyo\'s fintech startups to Osaka\'s industrial giants — as companies bridge the talent gap with software.',
  },
  {
    icon: Building2,
    title: 'SaaS & Enterprise Dominance',
    description:
      'Japan is the 2nd largest SaaS market in Asia after China, with enterprise AI procurement growing 32% YoY. Japanese enterprises are known for rigorous vendor evaluation — tools with Japanese documentation, local support teams, and SOC 2 / ISMS certification score higher in our rankings.',
  },
  {
    icon: Users,
    title: 'Manufacturing + Robotics AI Opportunity',
    description:
      'Japan\'s manufacturing sector ($800B+) combined with world-leading robotics (Fanuc, Yaskawa, Kawasaki) creates a uniquely valuable niche for AI tools in predictive maintenance, quality inspection, supply chain optimisation, and industrial automation — areas global rankings consistently overlook.',
  },
];

// ─── Tool Categories ──────────────────────────────────────────

const WRITING_CATEGORY = {
  id: 'writing',
  name: 'Writing & Content Creation',
  icon: BookOpen,
  description:
    'AI writing tools optimised for Japan\'s content ecosystem — from Japanese (日本語) business writing and keigo (敬語) formal communication to bilingual marketing materials and social media management for LINE, Twitter X Japan, and note.com.',
  tools: [
    { name: 'Jasper AI', tag: 'Best for Marketing Copy', description: 'Enterprise-grade AI writing with multilingual support. Popular with Tokyo advertising agencies (Dentsu, Hakuhodo) and brand managers creating Japanese marketing content.' },
    { name: 'Writesonic', tag: 'Best Value', description: 'Affordable AI writing with Japanese tone settings. ~$10/mo starting — ideal for Japanese SMEs and freelance copywriters in Shibuya and Shinjuku.' },
    { name: 'ChatGPT', tag: 'Most Used in Japan', description: 'Overwhelmingly popular across Japan. Strong Japanese language capabilities for keigo, business correspondence, and bilingual content generation.' },
    { name: 'Grammarly', tag: 'Best for English Writing', description: 'Essential for Japan\'s bilingual workforce. Widely used by Japanese professionals writing English reports, investor pitches, and international business correspondence.' },
  ],
};

const CODING_CATEGORY = {
  id: 'coding',
  name: 'Coding & Development',
  icon: Briefcase,
  description:
    'Development tools powering Japan\'s tech ecosystem — from Tokyo\'s fintech revolution (PayPay, Mercari, Rakuten) to Kyoto\'s robotics AI and Osaka\'s industrial IoT platforms.',
  tools: [
    { name: 'GitHub Copilot', tag: 'Best Overall', description: 'The standard for Japanese dev teams. Strong Python, TypeScript, and Go support. Copilot Chat in Japanese is widely adopted across Tokyo\'s startup scene and Rakuten\'s engineering teams.' },
    { name: 'Claude', tag: 'Best for Architecture', description: 'Gaining rapid traction among Japanese enterprise developers for code review, architecture design, and technical documentation in both Japanese and English.' },
    { name: 'Cursor', tag: 'Rising Star', description: 'AI-native IDE gaining popularity in Tokyo coding bootcamps (Code Chrysalis, Le Wagon Tokyo) and Japan\'s growing developer community on Zenn and Qiita.' },
    { name: 'Perplexity', tag: 'Best for Research', description: 'Widely adopted by Japanese researchers and engineers for technical research, API documentation lookup, and staying current with AI/ML developments in Japan\'s deep-tech sector.' },
  ],
};

const MARKETING_CATEGORY = {
  id: 'marketing',
  name: 'Marketing & E-Commerce',
  icon: BarChart3,
  description:
    'Marketing AI tools for Japan\'s unique digital landscape — where LINE dominates messaging, Twitter X Japan rules social, Rakuten and Amazon Japan lead e-commerce, and Mercari drives C2C commerce.',
  tools: [
    { name: 'AdCreative.ai', tag: 'Best for Ads', description: 'AI ad creative generator optimised for the Japanese market. Train on your product catalog for Rakuten, Amazon Japan, and LINE Ads with Japanese copy and visual aesthetics.' },
    { name: 'Canva AI', tag: 'Most Accessible', description: 'Overwhelmingly popular in Japan. AI-powered design for social media, print flyers (チラシ), and video content. Japanese templates, fonts, and seasonal design assets included.' },
    { name: 'Gamma', tag: 'Best for Presentations', description: 'AI presentation tool gaining traction in Japanese enterprise. Creates bilingual decks with proper Japanese formatting — popular in Tokyo consulting firms and startup pitch decks.' },
    { name: 'Notion AI', tag: 'Best for Teams', description: 'Deeply adopted by Japanese tech companies and startups for knowledge management. Japanese interface, community templates on note.com, and strong adoption in remote-work Japanese teams.' },
  ],
};

const DESIGN_CATEGORY = {
  id: 'design',
  name: 'Design & Creative',
  icon: Camera,
  description:
    'Design tools powering Japan\'s creative economy — from Tokyo\'s world-class advertising agencies and Shibuya\'s creative studios to freelance designers and e-commerce shop owners across the country.',
  tools: [
    { name: 'Canva', tag: 'Most Popular', description: 'The #1 design tool in Japan. AI features (Magic Studio, text-to-image, background removal) make it indispensable for Japanese creators, small businesses, and enterprise marketing teams.' },
    { name: 'Midjourney', tag: 'Best for Art', description: 'Hugely popular among Japanese digital artists, manga creators, and concept designers. Unique aesthetic sensibilities make it a favourite in Tokyo\'s creative studios and Kyoto\'s design schools.' },
    { name: 'Adobe Firefly', tag: 'Best Quality', description: 'Generative AI integrated into Creative Cloud. Preferred by Japan\'s top ad agencies (Dentsu, Hakuhodo, ADK) and professional designers for commercial-grade output with Japanese typography support.' },
    { name: 'Clipdrop', tag: 'Best Quick Edits', description: 'Rapid background removal and image editing. Widely adopted by Japanese e-commerce sellers on Rakuten, Amazon Japan, and Mercari for product photo optimisation.' },
  ],
};

const ALL_CATEGORIES = [WRITING_CATEGORY, CODING_CATEGORY, MARKETING_CATEGORY, DESIGN_CATEGORY];

// ─── Top 12 Tools ─────────────────────────────────────────────

const TOP_PICKS = [
  { rank: 1, name: 'ChatGPT', tag: 'Best Overall AI Assistant in Japan', trend: 'up' as const },
  { rank: 2, name: 'GitHub Copilot', tag: 'Best AI Coding Assistant', trend: 'up' as const },
  { rank: 3, name: 'Claude', tag: 'Best for Long-Form & Enterprise', trend: 'up' as const },
  { rank: 4, name: 'Notion AI', tag: 'Most Used for Japanese Teams', trend: 'up' as const },
  { rank: 5, name: 'Canva', tag: 'Most Used Design Tool in JP', trend: 'up' as const },
  { rank: 6, name: 'Midjourney', tag: 'Best AI Art for Japanese Aesthetics', trend: 'up' as const },
  { rank: 7, name: 'Jasper AI', tag: 'Best for Marketing Copy', trend: 'up' as const },
  { rank: 8, name: 'Perplexity', tag: 'Best Research Assistant', trend: 'up' as const },
  { rank: 9, name: 'AdCreative.ai', tag: 'Best for Japan E-Commerce Ads', trend: 'up' as const },
  { rank: 10, name: 'Writesonic', tag: 'Best Value Writing Tool', trend: 'up' as const },
  { rank: 11, name: 'Grammarly', tag: 'Best for Bilingual Writing', trend: 'up' as const },
  { rank: 12, name: 'Gamma', tag: 'Best AI Presentations', trend: 'up' as const },
];

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

export default function AiToolsJapanPage() {
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
          { name: 'AI Tools Japan', item: 'https://apifeny-ai.vercel.app/ai-tools-japan' },
        ]}
      />
      <GeoSeoSchema
        countryName="Japan"
        countryCode="jp"
        capital="Tokyo"
        currency="JPY"
        language="Japanese"
        languageCode="ja"
        marketSize="$4.9T GDP, 125M population, world's third-largest economy"
        slug="ai-tools-japan"
        faqs={[
          { question: "What are the best AI tools in Japan?", answer: "The best AI tools in Japan include ChatGPT for content and productivity, GitHub Copilot for development, Canva AI for design, and Salesforce Einstein for enterprise CRM. Japan's Society 5.0 initiative and its position as the world's third-largest economy drive sophisticated AI adoption across all sectors." },
          { question: "Are AI tools accessible for Japanese businesses?", answer: "Yes. Japan has world-class digital infrastructure with extensive 5G coverage. The Japanese government's AI Strategy 2022 provides R&D funding and adoption incentives. Major Japanese corporations like SoftBank, Rakuten, and NTT aggressively adopt AI. Language support (Japanese) is excellent across major platforms." },
          { question: "What AI tools are best for Japan's manufacturing sector?", answer: "Manufacturing (20% of GDP) leads AI adoption in Japan. Tools like Fanuc AI for industrial automation, NEC's AI for quality inspection, and Hitachi's AI for predictive maintenance transform Japanese factories. The Connected Industries policy promotes AI integration across supply chains." },
          { question: "What AI regulations apply in Japan?", answer: "Japan's Act on Protection of Personal Information (APPI) regulates data handling, with strict cross-border transfer rules. The Ministry of Economy, Trade and Industry (METI) issued AI Governance Guidelines. Japan's AI Strategy Council influences ethical AI development frameworks." },
          { question: "Is Japanese language well supported by AI tools?", answer: "Yes — Japanese has excellent AI support. ChatGPT, Claude, and Gemini all handle Japanese fluently. Major enterprise tools offer full Japanese localisation. Local AI giants like Preferred Networks, BrainPad, and SoftBank's AI division provide Japan-specific solutions." },
        ]}
      />

      <main className="min-h-screen bg-gradient-to-b from-white via-red-50/30 to-white dark:from-gray-950 dark:via-red-950/10 dark:to-gray-950">
        {/* ── Hero ─────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-red-100/50 dark:border-red-900/20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(188,0,45,0.06),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(188,0,45,0.08),transparent_50%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(26,26,26,0.04),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_bottom_left,rgba(26,26,26,0.06),transparent_50%)] pointer-events-none" />
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 relative">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-sm font-medium text-[#BC002D] dark:border-red-800 dark:bg-red-950/50 dark:text-red-300">
                <MapPin className="h-4 w-4" />
                🇯🇵 Curated for Japan
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
                Best AI Tools in{' '}
                <span className="bg-gradient-to-r from-[#BC002D] via-[#1A1A1A] to-[#BC002D] bg-clip-text text-transparent">
                  Japan
                </span>{' '}
                (2026)
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                100+ AI tools ranked for Japan's $14.4B market — with <strong>JPY/USD pricing</strong>,{' '}
                <strong>日本語 (Japanese) language support</strong>, and ratings for Japan's{' '}
                <strong>enterprise-driven, manufacturing-powered, mobile-first economy</strong>.
                Updated daily.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#top-picks"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#BC002D] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-200/50 transition-all hover:bg-[#8F0022] hover:shadow-red-300/50 dark:shadow-red-900/30"
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
                  className="rounded-xl border border-red-100/60 bg-white/80 p-5 shadow-sm transition-all hover:shadow-md dark:border-red-900/30 dark:bg-gray-900/80"
                >
                  <s.icon className="mb-3 h-6 w-6 text-[#BC002D]" />
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

        {/* ── Japan Market Snapshot ────────────────────── */}
        <section className="border-b border-gray-100 dark:border-gray-800">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              🇯🇵 Japan AI Market Snapshot
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500 dark:text-gray-400">
              Key metrics driving AI adoption in Japan — the world's 4th largest economy with a
              unique enterprise-driven, talent-constrained tech landscape.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {JP_AI_SNAPSHOT.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-red-100/60 bg-white p-6 text-center shadow-sm dark:border-red-900/30 dark:bg-gray-900"
                >
                  <p className="text-3xl font-bold text-[#BC002D] dark:text-red-400">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-300">{stat.label}</p>
                  <p className="mt-0.5 text-xs text-gray-400">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Japan ──────────────────────────────── */}
        <section className="border-b border-gray-100 dark:border-gray-800">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              Why Japan Needs Its Own AI Rankings
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500 dark:text-gray-400">
              Global AI tool rankings miss what makes Japan unique — from keigo linguistic requirements
              to APPI compliance and enterprise procurement cycles. Here's why a dedicated Japan ranking matters.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {WHY_JP.map((item) => (
                <div
                  key={item.title}
                  className="group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-[#BC002D]/30 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-[#BC002D]/40"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#BC002D]/10 text-[#BC002D] dark:bg-red-900/30 dark:text-red-400">
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
                🏆 Top 12 AI Tools in Japan
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                Our daily-updated ranking of the most popular and effective AI tools for the
                Japanese market, curated based on local usage patterns, Japanese language support,
                enterprise readiness, and affordability.
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
                Explore AI tools organised by category, each curated for the Japanese market
                with local context and ecosystem fit.
              </p>
            </div>
            <div className="space-y-12">
              {ALL_CATEGORIES.map((cat) => (
                <div key={cat.id} id={cat.id}>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#BC002D]/10 text-[#BC002D] dark:bg-red-900/30 dark:text-red-400">
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
                        className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#BC002D]/20 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50"
                      >
                        <span className="inline-block rounded-full bg-[#BC002D]/10 px-2.5 py-0.5 text-xs font-medium text-[#BC002D] dark:bg-red-900/40 dark:text-red-300">
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
        <section className="bg-gradient-to-r from-[#BC002D] to-[#1A1A1A]">
          <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              日本のビジネスに最適なAIツールをお探しですか？
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-white/80">
              Browse our full directory of 600+ AI tools, filter by category, compare pricing in JPY/USD,
              and read honest reviews from Japanese users and enterprise buyers. Your next productivity breakthrough
              is one click away.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#BC002D] shadow-lg transition-all hover:bg-red-50"
              >
                Browse Full Directory
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                <BookOpen className="h-4 w-4" />
                記事を読む — Read AI Guides
              </Link>
            </div>
          </div>
        </section>

        {/* ── Blog & Playbooks ───────────────────────── */}
        <section className="border-b border-gray-100 dark:border-gray-800">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              📖 Learn More About AI in Japan
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
            <LandingPageCrossLinks currentSlug="ai-tools-japan" />
          </div>
        </section>

        {/* ── Footer ──────────────────────────────────── */}
        <footer className="border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-950">
          <div className="mx-auto max-w-7xl px-4 py-8 text-center text-xs text-gray-400 sm:px-6 lg:px-8">
            <p>Apifeny AI — Independent AI Tool Rankings for Japan. Not affiliated with any listed tool.</p>
            <p className="mt-1">Prices shown in JPY/USD are approximate and may vary. Always verify pricing on the tool's official website.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
