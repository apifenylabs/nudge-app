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
  GraduationCap,
  Database,
  Factory,
  Stethoscope,
  Ship,
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
  title: 'Best AI Tools in Bangladesh (2026) — 100+ Tools for Dhaka Startups & Garment Industry',
  description:
    "Discover the best AI tools for Bangladesh's $3B+ digital economy. 100+ ranked tools with BDT/USD pricing, Bengali (বাংলা) language support, and ratings for Bangladesh's garment industry, Dhaka startup ecosystem, and RMG sector AI adoption.",
  ogTitle: 'Best AI Tools in Bangladesh (2026) — Apifeny AI',
  ogDescription:
    "100+ AI tools ranked for the Bangladeshi market. 🇧🇩 Bengali (বাংলা) support, BDT/USD pricing, curated for Dhaka's startup scene and the world's 2nd largest garment industry.",
  ogImage: '/og/ai-tools-bangladesh.png',
};

const TRUST_SECTIONS = [
  {
    icon: Globe,
    title: '🇧🇩 বাংলা & English Support',
    description:
      'Bangla (Bengali)-first tools optimised for Bangladesh\'s 170M+ population. Platforms ranked by their বাংলা language support, Unicode rendering quality, and localisation depth alongside English tools popular in Dhaka\'s Gulshan, Banani, and Mirpur tech hubs.',
  },
  {
    icon: DollarSign,
    title: '৳ BDT / USD Pricing',
    description:
      'All tool prices shown in both Bangladeshi Taka (৳) and USD. Bangladesh\'s fast-growing digital payments ecosystem — bKash, Nagad, Rocket, and card payments — means tools with local payment integration are prioritised for consumer and SME adoption.',
  },
  {
    icon: ShieldCheck,
    title: '🔒 Data Protection Reviewed',
    description:
      'Every tool evaluated against Bangladesh\'s Digital Security Act and upcoming Data Protection Act. We flag compliance risks, highlight tools with regional data centres (AWS Singapore, GCP Singapore, BDCOM), and note alignment with a2i\'s digital governance framework.',
  },
  {
    icon: Factory,
    title: '🏭 Garment & RMG Industry Ready',
    description:
      'Curated for Bangladesh\'s unique dual economy — from the $46B ready-made garment (RMG) sector (world\'s 2nd largest) driving demand for AI in supply chain, quality control, and fashion design, to Dhaka\'s booming startup scene and Chattogram\'s port-driven commerce.',
  },
];

const BD_AI_SNAPSHOT = [
  { label: 'Digital Economy (2026)', value: '$3B+', sub: 'Fastest-growing digital economy in South Asia; 170M+ population' },
  { label: 'Garment Exports', value: '$46B', sub: 'World\'s 2nd largest RMG exporter — AI transforming quality control & design' },
  { label: 'Mobile Internet Users', value: '130M+', sub: 'Mobile-first economy — 60%+ smartphone penetration driving AI app adoption' },
  { label: 'Tech Hubs', value: '5,000+', sub: 'Dhaka, Chattogram, Sylhet — startups, IT parks, and a growing developer ecosystem' },
];

const WHY_BD = [
  {
    icon: Factory,
    title: 'Bangladesh\'s Garment AI Revolution — RMG 4.0',
    description:
      'Bangladesh is the world\'s second-largest ready-made garment exporter ($46B+ annually), powering brands like H&M, Zara, Uniqlo, and Walmart. AI is transforming the sector — from computer vision-based fabric defect detection and automated pattern grading to AI-driven fashion trend forecasting and sustainable manufacturing optimisation. Dhaka\'s garment factories are increasingly adopting AI for production planning, inventory management, and worker safety compliance. This creates massive demand for niche AI tools in textile design automation, supply chain intelligence, and quality assurance that generic global rankings completely miss.',
  },
  {
    icon: Smartphone,
    title: 'Digital Bangladesh — A Mobile-First AI Opportunity',
    description:
      'With 130M+ mobile internet users and 60%+ smartphone penetration, Bangladesh is a mobile-first digital economy. bKash alone processes 500M+ monthly transactions, and the government\'s "Digital Bangladesh" vision (a2i, ICT Division) is investing heavily in AI-powered public services. Dhaka\'s Gulshan and Banani tech districts host 5,000+ startups and IT firms building for both domestic and global markets. The startup ecosystem backed by BD Venture, Startup Bangladesh Limited, and international VCs creates a unique market for AI tools adapted for Bengali-language interfaces, bKash/Nagad payment integrations, and Bangladesh-specific compliance needs.',
  },
  {
    icon: Users,
    title: 'The Bengali Language AI Goldmine',
    description:
      'Bengali (বাংলা) is the 7th most spoken language globally with 270M+ speakers, yet it remains severely underserved by AI tools. Bangladesh represents the largest Bengali-speaking market, creating a massive opportunity for AI tools that handle Bengali script, Bangla NLP, and bilingual Bengali/English content generation. From Bengali content marketing for the booming e-commerce sector (Daraz, AjkerDeal, Evaly-style platforms) to Bengali voice interfaces for the country\'s large semi-literate population, the Bengali AI market is wide open — with almost no Western AI ranking addressing it seriously.',
  },
];

// ─── Tool Categories ──────────────────────────────────────────

const WRITING_CATEGORY = {
  id: 'writing',
  name: 'Writing & Content Creation',
  icon: BookOpen,
  description:
    'AI writing tools optimised for Bangladesh\'s bilingual content ecosystem — from Bengali (বাংলা) business communication and marketing content to English-Bengali bilingual social media management for Facebook Bangladesh (40M+ users), Messenger, and YouTube Bangladesh.',
  tools: [
    { name: 'Jasper AI', tag: 'Best for Marketing Copy', description: 'Enterprise-grade AI writing with multilingual support. Gaining traction in Dhaka\'s ad agencies and e-commerce marketing teams creating Bengali and English campaigns for Daraz, Bashundhara, and Square Group.' },
    { name: 'Writesonic', tag: 'Best Value', description: 'Affordable AI writing with Bengali support emerging. ~৳1,200/mo starting — ideal for Bangladeshi SMEs, freelance content creators, and digital marketing agencies in Dhaka and Chattogram.' },
    { name: 'ChatGPT', tag: 'Most Used in Bangladesh', description: 'Overwhelmingly popular across Bangladesh\'s tech workforce. Handles Bengali (বাংলা) prompts with decent accuracy. Widely used for email drafting, Bengali social media content, and bilingual business communication.' },
    { name: 'Claude', tag: 'Best for Long-Form', description: 'Gaining adoption in Bangladesh for academic writing, research papers, and long-form Bengali/English content. Popular at University of Dhaka, BUET, and BRAC University research circles.' },
  ],
};

const CODING_CATEGORY = {
  id: 'coding',
  name: 'Coding & Development',
  icon: Briefcase,
  description:
    'Development tools powering Bangladesh\'s growing software ecosystem — from Dhaka\'s IT outsourcing firms and startup studios to Chattogram\'s maritime tech and Sylhet\'s emerging developer community.',
  tools: [
    { name: 'GitHub Copilot', tag: 'Best Overall', description: 'The standard for Bangladeshi dev teams. Strong Python, JavaScript, PHP, and Java support. Widely used across Dhaka\'s IT outsourcing firms (BJIT, Therap BD, Tiger IT) and startup studios.' },
    { name: 'Claude', tag: 'Best for Architecture', description: 'Gaining traction among Bangladeshi developers for code review, architecture planning, and technical documentation in both Bengali and English. Popular in Dhaka\'s growing product engineering teams.' },
    { name: 'Cursor', tag: 'Rising Star', description: 'AI-native IDE gaining popularity in Bangladeshi coding bootcamps (Programming Hero, Phitron) and Dhaka University\'s CSE department and the broader developer community.' },
    { name: 'Perplexity', tag: 'Best for Research', description: 'Widely adopted by Bangladeshi engineers and students for technical research, competitive programming problem-solving, and staying current with AI/ML trends. Popular at BUET, DUET, and KUET.' },
  ],
};

const MARKETING_CATEGORY = {
  id: 'marketing',
  name: 'Marketing & E-Commerce',
  icon: BarChart3,
  description:
    'Marketing AI tools for Bangladesh\'s unique digital landscape — where Facebook dominates (40M+ users), Daraz leads e-commerce, bKash and Nagad power payments, and YouTube Bangladesh drives a booming creator economy.',
  tools: [
    { name: 'AdCreative.ai', tag: 'Best for Ads', description: 'AI ad creative generator for the Bangladesh market. Train on your product catalog for Daraz, Facebook Bangladesh Ads, and Google Ads with Bengali and English ad copy tailored for Bangladeshi consumers.' },
    { name: 'Canva AI', tag: 'Most Accessible', description: 'Overwhelmingly popular in Bangladesh. AI-powered design for social media, e-commerce banners, and Bengali/English content. Bengali Unicode font support and seasonal design assets (Pohela Boishakh, Eid, Victory Day) included.' },
    { name: 'Gamma', tag: 'Best for Presentations', description: 'AI presentation tool gaining traction in Dhaka\'s enterprise and startup scene. Popular for business pitches to BD Venture, Startup Bangladesh Limited, and international investors.' },
    { name: 'Notion AI', tag: 'Best for Teams', description: 'Adopted by Bangladeshi tech companies and remote teams for knowledge management. Growing community of Bengali Notion creators with localised templates for project management and team wikis.' },
  ],
};

const DESIGN_CATEGORY = {
  id: 'design',
  name: 'Design & Creative',
  icon: Camera,
  description:
    'Design tools powering Bangladesh\'s creative economy — from Dhaka\'s advertising agencies (Asiatic, Grey Bangladesh, Unitrend) and film industry (Dhallywood) to the booming D2C brand market and garment sector fashion design.',
  tools: [
    { name: 'Canva', tag: 'Most Popular', description: 'The #1 design tool in Bangladesh. AI features (Magic Studio, text-to-image) make it indispensable for Bengali creators, small businesses, and enterprise marketing teams producing bilingual content.' },
    { name: 'Midjourney', tag: 'Best for Art', description: 'Growing in popularity among Bangladeshi digital artists, fashion designers (for RMG sample design), and game developers exploring AI-generated concept art for the South Asian aesthetic.' },
    { name: 'Adobe Firefly', tag: 'Best Quality', description: 'Generative AI integrated into Creative Cloud. Preferred by Dhaka\'s top ad agencies and professional designers for commercial-grade output with Bengali typography (Bangla Unicode) support.' },
    { name: 'DALL-E 3', tag: 'Best Integration', description: 'Integrated with ChatGPT — widely used by Bangladeshi content creators, marketers, and small businesses for rapid image generation with Bengali text prompts and cultural context awareness.' },
  ],
};

const RMG_CATEGORY = {
  id: 'rmg',
  name: 'Garment & Textile AI',
  icon: Factory,
  description:
    'Specialised AI tools for Bangladesh\'s world-leading ready-made garment (RMG) sector — from computer vision fabric inspection and AI-driven fashion design to supply chain optimisation for Zara, H&M, Uniqlo, and Walmart suppliers across Dhaka, Chattogram, and Gazipur industrial zones.',
  tools: [
    { name: 'BlueSign AI', tag: 'Textile Sustainability', description: 'AI-powered textile sustainability platform adopted by major Bangladeshi RMG factories. Automates chemical management, water usage tracking, and carbon footprint analysis for export compliance with EU and US standards.' },
    { name: 'Smartex AI', tag: 'Best for Defect Detection', description: 'Computer vision-based fabric defect detection system deployed across Bangladesh\'s leading garment factories. Real-time inspection at 120m/min — dramatically reducing waste and improving quality for international buyers.' },
    { name: 'Calico AI', tag: 'Fashion Trend Forecasting', description: 'AI-driven trend forecasting platform helping Bangladeshi garment manufacturers predict next season\'s colours, patterns, and styles. Trained on global fashion data — essential for staying ahead in the fast-fashion supply chain.' },
    { name: 'Fashinza AI', tag: 'Supply Chain Optimisation', description: 'AI-powered supply chain platform for apparel manufacturing. Popular among Dhaka\'s mid-sized RMG factories for production planning, inventory optimisation, and buyer compliance management.' },
  ],
};

const ALL_CATEGORIES = [WRITING_CATEGORY, CODING_CATEGORY, MARKETING_CATEGORY, DESIGN_CATEGORY, RMG_CATEGORY];

// ─── Top 12 Tools ─────────────────────────────────────────────

const TOP_PICK_PREFIX = [
  { name: 'ChatGPT', tag: 'Best Overall AI Assistant in Bangladesh', trend: 'up' as const },
  { name: 'GitHub Copilot', tag: 'Best AI Coding Assistant', trend: 'up' as const },
  { name: 'Claude', tag: 'Best for Long-Form & Research', trend: 'up' as const },
  { name: 'Notion AI', tag: 'Most Used for Bangladeshi Teams', trend: 'up' as const },
  { name: 'Canva', tag: 'Most Used Design Tool in Bangladesh', trend: 'up' as const },
  { name: 'Midjourney', tag: 'Best AI Art for Bangladeshi Creatives', trend: 'up' as const },
  { name: 'Jasper AI', tag: 'Best for Marketing Copy', trend: 'up' as const },
  { name: 'Perplexity', tag: 'Best Research Assistant', trend: 'up' as const },
  { name: 'AdCreative.ai', tag: 'Best for Bangladeshi E-Commerce Ads', trend: 'up' as const },
  { name: 'Writesonic', tag: 'Best Value Writing Tool', trend: 'up' as const },
  { name: 'Smartex AI', tag: 'Best Garment AI Platform', trend: 'up' as const },
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

export default function AiToolsBangladeshPage() {
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
          { name: 'AI Tools Bangladesh', item: 'https://apifeny-ai.vercel.app/ai-tools-bangladesh' },
        ]}
      />
      <GeoSeoSchema
        countryName="Bangladesh"
        countryCode="bd"
        capital="Dhaka"
        currency="BDT"
        language="Bengali"
        languageCode="bn"
        marketSize={"$3B+ digital economy, 170M+ population, world's 2nd largest garment exporter ($46B RMG)"}
        slug="ai-tools-bangladesh"
        faqs={[
          { question: "What are the best AI tools in Bangladesh?", answer: "The best AI tools in Bangladesh vary by use case. ChatGPT leads for general productivity, GitHub Copilot for coding, Canva AI for design, and AdCreative.ai for marketing. For Bangladesh's unique garment industry, specialized tools like Smartex AI (fabric defect detection) and BlueSign AI (textile sustainability) are top choices." },
          { question: "Are AI tools available in Bengali (বাংলা)?", answer: "Yes, an increasing number of AI tools support Bengali. ChatGPT handles Bengali prompts with reasonable accuracy. Canva supports Bengali Unicode fonts. However, specialized Bengali NLP tools remain limited, creating opportunities for locally adapted solutions." },
          { question: "How can Bangladeshi businesses adopt AI?", answer: "Bangladeshi businesses can start with cloud-based AI tools requiring no infrastructure. ChatGPT for customer support, Canva AI for marketing materials, GitHub Copilot for development teams, and specialized RMG tools for the garment sector. Most offer free tiers to test before committing." },
          { question: 'What AI tools are best for the RMG/garment industry in Bangladesh?', answer: 'Bangladesh\'s $46B garment industry benefits from Smartex AI (fabric defect detection via computer vision), BlueSign AI (textile sustainability compliance), Calico AI (fashion trend forecasting), and Fashinza AI (supply chain optimization). These tools address quality control, sustainability certification, and global buyer compliance.' },
          { question: 'What payment methods do AI tools accept in Bangladesh?', answer: 'Most international AI tools accept credit/debit cards and PayPal. Some are adding support for bKash and Nagad, Bangladesh\'s leading mobile financial services. Pricing is typically in USD, though a growing number offer BDT-friendly payment options through local resellers or partners.' },
        ]}
      />

      <main className="min-h-screen bg-gradient-to-b from-white via-green-50/30 to-white dark:from-gray-950 dark:via-green-950/10 dark:to-gray-950">
        {/* ── Hero ─────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-green-100/50 dark:border-green-900/20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,106,78,0.06),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(0,106,78,0.08),transparent_50%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(218,41,28,0.04),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_bottom_left,rgba(218,41,28,0.06),transparent_50%)] pointer-events-none" />
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 relative">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-sm font-medium text-[#006A4E] dark:border-green-800 dark:bg-green-950/50 dark:text-green-300">
                <MapPin className="h-4 w-4" />
                🇧🇩 Curated for Bangladesh
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
                Best AI Tools in{' '}
                <span className="bg-gradient-to-r from-[#006A4E] via-[#DA291C] to-[#006A4E] bg-clip-text text-transparent">
                  Bangladesh
                </span>{' '}
                (2026)
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                100+ AI tools ranked for Bangladesh's <strong>$3B+ digital economy</strong> — with{' '}
                <strong>৳ BDT / USD pricing</strong>,{' '}
                <strong>বাংলা (Bengali) language support</strong>, and ratings for Bangladesh's{' '}
                <strong>world-leading garment industry ($46B RMG), Dhaka startup ecosystem, and mobile-first digital transformation</strong>.
                Updated daily.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#top-picks"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#006A4E] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-200/50 transition-all hover:bg-[#00503A] hover:shadow-green-300/50 dark:shadow-green-900/30"
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
                  className="rounded-xl border border-green-100/60 bg-white/80 p-5 shadow-sm transition-all hover:shadow-md dark:border-green-900/30 dark:bg-gray-900/80"
                >
                  <s.icon className="mb-3 h-6 w-6 text-[#006A4E]" />
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

        {/* ── Bangladesh Market Snapshot ───────────────── */}
        <section className="border-b border-gray-100 dark:border-gray-800">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              🇧🇩 Bangladesh AI Market Snapshot
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500 dark:text-gray-400">
              Key metrics driving AI adoption in Bangladesh — the world's fastest-growing digital economy in South Asia with
              a garment sector undergoing AI-driven transformation.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {BD_AI_SNAPSHOT.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-green-100/60 bg-white p-6 text-center shadow-sm dark:border-green-900/30 dark:bg-gray-900"
                >
                  <p className="text-3xl font-bold text-[#006A4E] dark:text-green-400">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-300">{stat.label}</p>
                  <p className="mt-0.5 text-xs text-gray-400">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Bangladesh ──────────────────────────── */}
        <section className="border-b border-gray-100 dark:border-gray-800">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              Why Bangladesh Needs Its Own AI Rankings
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500 dark:text-gray-400">
              Global AI tool rankings miss what makes Bangladesh unique — from the $46B RMG garment sector's AI transformation and
              the underserved Bengali (বাংলা) language AI market to Bangladesh's unique mobile-first, bKash-driven digital economy
              and the Dhaka startup scene. Here's why a dedicated Bangladesh ranking matters.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {WHY_BD.map((item) => (
                <div
                  key={item.title}
                  className="group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-[#006A4E]/30 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-[#006A4E]/40"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#006A4E]/10 text-[#006A4E] dark:bg-green-900/30 dark:text-green-400">
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
                🏆 Top 12 AI Tools in Bangladesh
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                Our daily-updated ranking of the most popular and effective AI tools for the
                Bangladeshi market, curated based on local usage patterns, Bengali language support,
                garment industry relevance, mobile-first ecosystem fit, and affordability.
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
                Explore AI tools organised by category, each curated for the Bangladeshi market
                with local context and ecosystem fit.
              </p>
            </div>
            <div className="space-y-12">
              {ALL_CATEGORIES.map((cat) => (
                <div key={cat.id} id={cat.id}>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#006A4E]/10 text-[#006A4E] dark:bg-green-900/30 dark:text-green-400">
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
                        className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#006A4E]/20 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50"
                      >
                        <span className="inline-block rounded-full bg-[#006A4E]/10 px-2.5 py-0.5 text-xs font-medium text-[#006A4E] dark:bg-green-900/40 dark:text-green-300">
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
        <section className="bg-gradient-to-r from-[#006A4E] via-[#DA291C] to-[#006A4E]">
          <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              বাংলাদেশের জন্য সেরা AI টুল খুঁজছেন?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-white/80">
              Browse our full directory of 600+ AI tools, filter by category, compare pricing in ৳ BDT/USD,
              and read honest reviews from Bangladeshi users and enterprise buyers. Your next productivity breakthrough
              is one click away — whether you're in Dhaka, Chattogram, or Sylhet.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#006A4E] shadow-lg transition-all hover:bg-green-50"
              >
                Browse Full Directory
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                <BookOpen className="h-4 w-4" />
                ব্লগ পড়ুন — Read AI Guides
              </Link>
            </div>
          </div>
        </section>

        {/* ── Blog & Playbooks ───────────────────────── */}
        <section className="border-b border-gray-100 dark:border-gray-800">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              📖 Learn More About AI in Bangladesh
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
            <LandingPageCrossLinks currentSlug="ai-tools-bangladesh" />
          </div>
        </section>

        {/* ── Footer ──────────────────────────────────── */}
        <footer className="border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-950">
          <div className="mx-auto max-w-7xl px-4 py-8 text-center text-xs text-gray-400 sm:px-6 lg:px-8">
            <p>Apifeny AI — Independent AI Tool Rankings for Bangladesh. Not affiliated with any listed tool.</p>
            <p className="mt-1">Prices shown in ৳ BDT / USD are approximate and may vary. Always verify pricing on the tool's official website.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
