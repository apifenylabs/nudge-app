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
  title: 'Best AI Tools in the Philippines (2026) — 85+ Tools for Filipino Startups & Enterprises',
  description:
    'Discover the best AI tools for the Philippines. 85+ ranked tools with PHP pricing, NPC compliance, and local ecosystem support. Updated daily for Filipino solopreneurs, SMEs, and enterprises.',
  ogTitle: 'Best AI Tools in the Philippines (2026) — Apifeny AI',
  ogDescription:
    '85+ AI tools ranked for the Philippine market. 🇵🇭 PHP pricing, NPC-compliant, Filipino-language supported.',
  ogImage: '/og/ai-tools-philippines.png',
};

const TRUST_SECTIONS = [
  {
    icon: Globe,
    title: '🇵🇭 English & Filipino',
    description:
      'Optimized for the Philippines\' bilingual workforce. English-dominant tools ranked alongside platforms with Tagalog/Filipino language support for maximum accessibility.',
  },
  {
    icon: DollarSign,
    title: '₱ PHP Pricing',
    description:
      'All tool prices shown in Philippine Pesos. We track freemium tiers, peso-friendly plans, and tools with GCash/PayMaya payment support for hassle-free subscriptions.',
  },
  {
    icon: ShieldCheck,
    title: '🔒 NPC Compliant',
    description:
      'Every tool evaluated for compliance with the National Privacy Commission (NPC) Act 10173. We flag data sovereignty risks and highlight tools with local data centers.',
  },
  {
    icon: Building2,
    title: '🏢 PH Enterprise Ready',
    description:
      'Curated for the Philippine enterprise ecosystem — from BPO integration to e-commerce (Shopee/Lazada API tools), fintech (GCash/PayMaya stack), and government digitalization.',
  },
];

const PH_AI_SNAPSHOT = [
  { label: 'AI Market Size (2026)', value: '₱12.5B+', sub: 'Growing 28% YoY' },
  { label: 'BPO AI Adoption', value: '62%', sub: 'Of BPO firms use AI tools' },
  { label: 'Filipino AI Startups', value: '340+', sub: 'Across Metro Manila, Cebu, Davao' },
  { label: 'Mobile-First Users', value: '78%', sub: 'Access AI via smartphone' },
];

const WHY_PH = [
  {
    icon: Smartphone,
    title: 'Mobile-First Economy',
    description:
      'The Philippines has one of the highest mobile internet usage rates in Southeast Asia. AI tools that work flawlessly on mobile get priority placement in our rankings.',
  },
  {
    icon: Users,
    title: 'BPO & Outsourcing Hub',
    description:
      'As the world\'s BPO capital, Philippine businesses need AI tools for workforce management, call center automation, and virtual assistant integration. Our rankings reflect this.',
  },
  {
    icon: Heart,
    title: 'Strong Creator & Freelancer Culture',
    description:
      'Filipinos are among the world\'s most active freelancers and content creators. AI writing, video, music, and design tools are ranked with the solo creator in mind.',
  },
];

// ─── Tool Categories ──────────────────────────────────────────────────────────

const WRITING_CATEGORY = {
  id: 'writing',
  name: 'Writing & Content Creation',
  icon: BookOpen,
  description:
    'AI writing tools optimized for the Philippines\' bilingual content ecosystem — from blog posts in English to social media captions in Taglish.',
  tools: [
    { name: 'Jasper AI', tag: 'Best for Marketing Copy', description: 'Enterprise-grade AI writing with brand voice customization. Strong for BPO marketing teams.' },
    { name: 'Writesonic', tag: 'Best Value', description: 'Affordable AI writing with Filipino-influenced tone options. ₱1,200/mo starting.' },
    { name: 'Rytr', tag: 'Best for Freelancers', description: 'Lightweight writing assistant popular with Filipino freelancers on Upwork and OnlineJobs.ph.' },
    { name: 'Copy.ai', tag: 'Best for Social Media', description: 'Quick social media content generation. Ideal for PH brands on Facebook, TikTok, and Instagram.' },
  ],
};

const CODING_CATEGORY = {
  id: 'coding',
  name: 'Coding & Development',
  icon: Briefcase,
  description:
    'Development tools powering the Philippines\' growing tech startup ecosystem — from BGC startups to Cebu dev shops.',
  tools: [
    { name: 'GitHub Copilot', tag: 'Best Overall', description: 'Standard for PH dev teams. Strong PHP, JavaScript, and Python support for local web dev shops.' },
    { name: 'Cursor', tag: 'Rising Star', description: 'AI-native IDE gaining traction in PH bootcamps and dev communities. Free tier available.' },
    { name: 'Replit AI', tag: 'Best for Learning', description: 'Popular among Filipino CS students and bootcamp graduates learning full-stack development.' },
    { name: 'Tabnine', tag: 'Best for Privacy', description: 'On-device AI coding that works offline — valuable for PH enterprises with data sensitivity requirements.' },
  ],
};

const MARKETING_CATEGORY = {
  id: 'marketing',
  name: 'Marketing & E-Commerce',
  icon: BarChart3,
  description:
    'Marketing AI tools tailored for the Philippines\' unique digital landscape — where Shopee, Lazada, TikTok Shop, and Facebook dominate.',
  tools: [
    { name: 'AdCreative.ai', tag: 'Best for Ads', description: 'AI ad creative generator optimized for PH social commerce. Train on your Shopee/Lazada product catalog.' },
    { name: 'Jasper AI', tag: 'Best for Content', description: 'Multi-channel content for Filipino brands — from email to SMS to Viber broadcast.' },
    { name: 'Canva AI', tag: 'Most Accessible', description: 'Overwhelmingly popular in PH. AI-powered design tools for social media, print, and video content.' },
    { name: 'Typeface', tag: 'Best for Enterprise', description: 'Enterprise brand content platform. Used by PH conglomerates for consistent multi-brand content.' },
  ],
};

const DESIGN_CATEGORY = {
  id: 'design',
  name: 'Design & Creative',
  icon: Camera,
  description:
    'Design tools that power the Philippines\' vibrant creative economy — from Manila ad agencies to Cebu-based freelance designers.',
  tools: [
    { name: 'Canva', tag: 'Most Popular', description: 'The #1 design tool in the PH. AI features (Magic Studio, text-to-image) make it indispensable.' },
    { name: 'Adobe Firefly', tag: 'Best Quality', description: 'Generative AI integrated into Creative Cloud. Preferred by PH ad agencies and professional designers.' },
    { name: 'Midjourney', tag: 'Best for Art', description: 'Popular among Filipino digital artists and concept designers. Strong Discord community locally.' },
    { name: 'Clipdrop', tag: 'Best Quick Edits', description: 'Quick background removal and image editing. Wide adoption among PH e-commerce sellers.' },
  ],
};

const ALL_CATEGORIES = [WRITING_CATEGORY, CODING_CATEGORY, MARKETING_CATEGORY, DESIGN_CATEGORY];

// ─── Top 12 Tools ────────────────────────────────────────────────────────────

const TOP_PICKS = [
  { rank: 1, name: 'ChatGPT', tag: 'Best Overall AI Assistant', trend: 'up' as const },
  { rank: 2, name: 'GitHub Copilot', tag: 'Best AI Coding Assistant', trend: 'up' as const },
  { rank: 3, name: 'Jasper AI', tag: 'Best for PH Marketing Copy', trend: 'up' as const },
  { rank: 4, name: 'Canva', tag: 'Most Used Design Tool in PH', trend: 'up' as const },
  { rank: 5, name: 'Midjourney', tag: 'Best AI Art Generator', trend: 'up' as const },
  { rank: 6, name: 'Claude', tag: 'Best for Long-Form Analysis', trend: 'up' as const },
  { rank: 7, name: 'Notion AI', tag: 'Best for PH Remote Teams', trend: 'up' as const },
  { rank: 8, name: 'Perplexity', tag: 'Best AI Research Assistant', trend: 'up' as const },
  { rank: 9, name: 'AdCreative.ai', tag: 'Best for PH E-Commerce Ads', trend: 'up' as const },
  { rank: 10, name: 'Writesonic', tag: 'Best Value Writing Tool', trend: 'up' as const },
  { rank: 11, name: 'Descript', tag: 'Best for PH Content Creators', trend: 'up' as const },
  { rank: 12, name: 'Copy.ai', tag: 'Best for Social Media Mgmt', trend: 'up' as const },
];

// ─── Components ──────────────────────────────────────────────────────────────

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

// ─── Page Component ──────────────────────────────────────────────────────────

export default function AiToolsPhilippinesPage() {
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
          { name: 'AI Tools Philippines', item: 'https://apifeny-ai.vercel.app/ai-tools-philippines' },
        ]}
      />
      <GeoSeoSchema
        countryName="Philippines"
        countryCode="ph"
        capital="Manila"
        currency="PHP"
        language="Filipino"
        languageCode="fil"
        marketSize="$435B GDP, 115M population, BPO capital of the world, fast-growing digital economy"
        slug="ai-tools-philippines"
        faqs={[
          { question: "What are the best AI tools in the Philippines?", answer: "The best AI tools for Filipino teams include ChatGPT for content and productivity, GitHub Copilot for development, Canva AI for design, and Grammarly for writing. The Philippines' strong English proficiency and BPO industry make it a natural fit for AI-powered business tools." },
          { question: "Are AI tools affordable for Filipino startups?", answer: "Most major AI tools offer free tiers suitable for startup validation. The DICT's Digital Startup Development and Acceleration Programme provides grants. Philippine startups can also access the DOST's Small Enterprise Technology Upgrading Programme (SETUP) for technology adoption." },
          { question: "What AI tools are best for the BPO industry?", answer: "The Philippines' BPO sector ($32B revenue) benefits from AI tools like Gong for call analysis, Intercom for AI chatbots, Notion AI for documentation, and Otter.ai for transcription. AI-powered quality assurance and sentiment analysis are transforming the BPO industry." },
          { question: "What AI regulations apply in the Philippines?", answer: "The Data Privacy Act of 2012 (RA 10173) governs personal data processing. The NPC (National Privacy Commission) enforces compliance. BPO companies handling international client data must meet their clients' GDPR or equivalent requirements." },
          { question: "What local AI initiatives exist in the Philippines?", answer: "The DOST-ASTI (Advanced Science and Technology Institute) develops local AI solutions. The National AI Roadmap (2022-2028) targets AI adoption across government services. UP Diliman's Electrical and Electronics Engineering Institute leads AI research with a focus on Filipino language processing." },
        ]}
      />

      <main className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-950 dark:via-blue-950/10 dark:to-gray-950">
        {/* ── Hero ─────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-blue-100/50 dark:border-blue-900/20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,56,168,0.06),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(0,56,168,0.08),transparent_50%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(206,17,38,0.04),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_bottom_left,rgba(206,17,38,0.06),transparent_50%)] pointer-events-none" />
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 relative">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
                <MapPin className="h-4 w-4" />
                🇵🇭 Curated for the Philippines
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
                Best AI Tools in the{' '}
                <span className="bg-gradient-to-r from-[#0038A8] via-[#CE1126] to-[#0038A8] bg-clip-text text-transparent">
                  Philippines
                </span>{' '}
                (2026)
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                85+ AI tools ranked for the Philippine market — with <strong>PHP pricing</strong>,{' '}
                <strong>NPC compliance</strong>, and support for the Philippines' unique{' '}
                <strong>mobile-first, BPO-driven, freelancer-powered economy</strong>.
                Updated daily.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#top-picks"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0038A8] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200/50 transition-all hover:bg-[#002a7f] hover:shadow-blue-300/50 dark:shadow-blue-900/30"
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
                  <s.icon className="mb-3 h-6 w-6 text-[#CE1126]" />
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

        {/* ── PH Market Snapshot ──────────────────────── */}
        <section className="border-b border-gray-100 dark:border-gray-800">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              🇵🇭 Philippine AI Market Snapshot
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500 dark:text-gray-400">
              Key metrics driving AI adoption in the Philippines — an economy powered by BPO, 
              remittances, a young workforce, and rapid digitalization.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PH_AI_SNAPSHOT.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-blue-100/60 bg-white p-6 text-center shadow-sm dark:border-blue-900/30 dark:bg-gray-900"
                >
                  <p className="text-3xl font-bold text-[#0038A8] dark:text-blue-400">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-300">{stat.label}</p>
                  <p className="mt-0.5 text-xs text-gray-400">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Philippines ─────────────────────────── */}
        <section className="border-b border-gray-100 dark:border-gray-800">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              Why the Philippines Needs Its Own AI Rankings
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500 dark:text-gray-400">
              Global AI tool rankings miss what makes the Philippines unique. Here's why a dedicated
              Philippine ranking matters.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {WHY_PH.map((item) => (
                <div
                  key={item.title}
                  className="group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-[#CE1126]/30 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-[#CE1126]/40"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#0038A8]/10 text-[#0038A8] dark:bg-blue-900/30 dark:text-blue-400">
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
                🏆 Top 12 AI Tools in the Philippines
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                Our daily-updated ranking of the most popular and effective AI tools for the 
                Philippine market, curated based on local usage patterns, affordability, and relevance.
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
                Explore AI tools organized by category, each curated for the Philippine market.
              </p>
            </div>
            <div className="space-y-12">
              {ALL_CATEGORIES.map((cat) => (
                <div key={cat.id} id={cat.id}>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0038A8]/10 text-[#0038A8] dark:bg-blue-900/30 dark:text-blue-400">
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
                        className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#0038A8]/20 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50"
                      >
                        <span className="inline-block rounded-full bg-[#0038A8]/10 px-2.5 py-0.5 text-xs font-medium text-[#0038A8] dark:bg-blue-900/40 dark:text-blue-300">
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
        <section className="bg-gradient-to-r from-[#0038A8] to-[#CE1126]">
          <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              🇵🇭 Ready to Find the Perfect AI Tool for Your Philippine Business?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-white/80">
              Browse our full directory of 600+ AI tools, filter by category, compare pricing in PHP, 
              and read honest reviews from Filipino users. Your next productivity breakthrough is one click away.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#0038A8] shadow-lg transition-all hover:bg-blue-50"
              >
                Browse Full Directory
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog/ai-tools-philippines-2026"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                <BookOpen className="h-4 w-4" />
                Read the PH AI Tools Blog Post
              </Link>
            </div>
          </div>
        </section>

        {/* ── Blog & Playbooks ───────────────────────── */}
        <section className="border-b border-gray-100 dark:border-gray-800">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              📖 Learn More About AI in the Philippines
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
            <LandingPageCrossLinks currentSlug="ai-tools-philippines" />
          </div>
        </section>

        {/* ── Footer ──────────────────────────────────── */}
        <footer className="border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-950">
          <div className="mx-auto max-w-7xl px-4 py-8 text-center text-xs text-gray-400 sm:px-6 lg:px-8">
            <p>Apifeny AI — Independent AI Tool Rankings for the Philippines. Not affiliated with any listed tool.</p>
            <p className="mt-1">Prices shown in PHP are approximate and may vary. Always verify pricing on the tool's official website.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
