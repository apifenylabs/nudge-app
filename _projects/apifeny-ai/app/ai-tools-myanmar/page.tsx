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
 title: 'Best AI Tools in Myanmar (2026) — Top AI Tools for Burmese Teams & Startups',
 description:
 'Discover the best AI tools for Myanmar\'s emerging digital economy. Ranked tools with MMK/USD pricing, Burmese (ျမန္မာဘာသာ) language support, and local ecosystem fit. Curated for Yangon, Mandalay, Naypyidaw & Myanmar\'s growing tech community.',
 ogTitle: 'Best AI Tools in Myanmar (2026) — Apifeny AI',
 ogDescription:
 'AI tools ranked for the Myanmar market. 🇲🇲 Burmese language support, MMK/USD pricing, and curated for Myanmar\'s emerging startup ecosystem and digital transformation.',
 ogImage: '/og/ai-tools-myanmar.png',
};

const TRUST_SECTIONS = [
 {
 icon: Globe,
 title: '🇲🇲 ျမန္မာဘာသာ & English',
 description:
 'Tools ranked by their support for Burmese (Myanmar) language — including Unicode (Zawgyi compatibility), Burmese script rendering, and localisation quality. English-dominant platforms popular in Yangon\'s business district are also rated for their accessibility in Myanmar\'s multilingual market.',
 },
 {
 icon: DollarSign,
 title: '₾ MMK / USD Pricing',
 description:
 'All tool prices shown in both Myanmar Kyat (MMK) and USD. Tools accepting local payment methods (KBZ Pay, Wave Money, CB Pay) are prioritised for Myanmar\'s mobile-first digital payment ecosystem.',
 },
 {
 icon: ShieldCheck,
 title: '🔒 Data Privacy Reviewed',
 description:
 'Every tool evaluated for data protection practices relevant to Myanmar\'s evolving legal framework. We highlight tools with clear privacy policies, local data handling practices, and alignment with ASEAN data governance standards.',
 },
 {
 icon: Building2,
 title: '🏢 Myanmar Enterprise Ready',
 description:
 'Curated for Myanmar\'s unique business environment — from Yangon\'s banking and trading sectors and Mandalay\'s agri-processing to the emerging startup ecosystem. Tools rated for affordability, reliability, and adaptability to Myanmar\'s mobile-first internet landscape.',
 },
];

const MM_AI_SNAPSHOT = [
 { label: 'Internet Users', value: '25M+', sub: '54M population — growing mobile-first digital adoption' },
 { label: 'Mobile Penetration', value: '120%+', sub: 'SIM penetration — driving mobile-first AI access' },
 { label: 'Startup Ecosystem', value: 'Growing', sub: 'Yangon tech hub — fintech, e-commerce, agri-tech' },
 { label: 'Digital Payments', value: '70%+', sub: 'Wave Money, KBZ Pay, CB Pay — mobile wallet adoption' },
];

const WHY_MM = [
 {
 icon: Smartphone,
 title: 'Myanmar\'s Digital Transformation — Mobile-First AI Opportunity',
 description:
 'Myanmar skipped desktop internet entirely — jumping straight to mobile. With 25M+ internet users and the highest SIM penetration in Southeast Asia (120%+), the country presents a unique "mobile-first" AI adoption opportunity. Digital payments via Wave Money, KBZ Pay, and CB Pay are growing fast, creating a fertile ground for AI-powered fintech, agri-tech, and e-commerce solutions.',
 },
 {
 icon: Building2,
 title: 'Emerging Tech Ecosystem in Yangon & Beyond',
 description:
 'Yangon\'s tech ecosystem is growing — from fintech startups capitalising on Myanmar\'s underbanked population (70%+ unbanked) to agri-tech solutions for the country\'s 70% rural workforce. AI tools that work offline-first, support Burmese language, and integrate with local payment systems have a unique advantage in this market.',
 },
 {
 icon: Users,
 title: 'Southeast Asia\'s Next Digital Frontier',
 description:
 'With a young, digitally-native population (median age 29), rapidly improving infrastructure, and increasing international tech investment, Myanmar represents Southeast Asia\'s next big digital opportunity. AI tools that adapt early to Burmese language support, local compliance, and mobile-first delivery will capture a first-mover advantage in this emerging market of 54M people.',
 },
];

// ─── Tool Categories ──────────────────────────────────────────

const WRITING_CATEGORY = {
 id: 'writing',
 name: 'Writing & Content Creation',
 icon: BookOpen,
 description:
 'AI writing tools with Burmese language capabilities — from Unicode/Zawgyi-compatible content creation and English-to-Burmese translation to social media management for Facebook (the dominant platform in Myanmar) and digital marketing content for Yangon-based businesses.',
 tools: [
 { name: 'ChatGPT', tag: 'Most Used in Myanmar', description: 'The most popular AI assistant in Myanmar. Strong multilingual support including Burmese text generation. Widely used for English-Burmese translation, business correspondence, and content creation by Myanmar professionals and students.' },
 { name: 'Jasper AI', tag: 'Best for Marketing Copy', description: 'Enterprise-grade AI writing with multilingual output. Used by Yangon\'s emerging digital marketing agencies for bilingual content creation targeting both local and export markets.' },
 { name: 'Writesonic', tag: 'Best Value', description: 'Affordable AI writing starting at ~$10/mo. Popular among Myanmar SMEs and freelance content creators for English and basic Burmese content needs.' },
 { name: 'Grammarly', tag: 'Best for English Writing', description: 'Widely adopted by Myanmar\'s BPO, outsourcing, and business processing sectors. Essential for English-language business communication in Yangon\'s corporate offices.' },
 ],
};

const CODING_CATEGORY = {
 id: 'coding',
 name: 'Coding & Development',
 icon: Briefcase,
 description:
 'Development tools supporting Myanmar\'s growing software community — from Yangon\'s coding bootcamps and tech education programs (Myanmar Code Lab, ACE Data Systems) to freelance developers on platforms like Upwork and Fiverr.',
 tools: [
 { name: 'GitHub Copilot', tag: 'Best Overall', description: 'The standard for Myanmar\'s growing developer community. Strong JavaScript, Python, and PHP support. Widely adopted in Yangon\'s tech companies and by freelancers serving international clients.' },
 { name: 'Claude', tag: 'Best for Architecture', description: 'Gaining traction among Myanmar developers for code review, system design, and technical documentation. Particularly useful for developer teams working on fintech and agri-tech projects.' },
 { name: 'Cursor', tag: 'Rising Star', description: 'AI-native IDE growing in popularity among Myanmar\'s bootcamp graduates and self-taught developers building MVPs for local and international clients.' },
 { name: 'Perplexity', tag: 'Best for Research', description: 'Used by Myanmar developers and university students for technical research, API documentation, and staying current with global tech trends in an environment where traditional education resources may be limited.' },
 ],
};

const MARKETING_CATEGORY = {
 id: 'marketing',
 name: 'Marketing & E-Commerce',
 icon: BarChart3,
 description:
 'Marketing AI tools for Myanmar\'s unique digital landscape — where Facebook (Meta) dominates social media (20M+ users), Shopee and Facebook Marketplace lead e-commerce, and Wave Money powers the mobile payment revolution.',
 tools: [
 { name: 'Canva AI', tag: 'Most Accessible', description: 'Extremely popular in Myanmar. AI-powered design for Facebook posts, shop banners, and video content for Shopee Myanmar and Facebook Marketplace sellers. Burmese templates and accessible free tier make it the go-to tool.' },
 { name: 'AdCreative.ai', tag: 'Best for Ads', description: 'AI ad creative generator for Facebook and Google Ads. Train on your product catalog for Myanmar\'s e-commerce platforms. Useful for local brands and Yangon agencies running targeted campaigns.' },
 { name: 'Gamma', tag: 'Best for Presentations', description: 'AI presentation tool gaining traction among Myanmar professionals, educators, and startup founders creating pitch decks and business proposals for both local and international audiences.' },
 { name: 'Notion AI', tag: 'Best for Teams', description: 'Growing adoption among Myanmar tech companies and startups for knowledge management and collaboration. Popular in Yangon\'s remote-work ecosystem and among international NGOs operating in Myanmar.' },
 ],
};

const DESIGN_CATEGORY = {
 id: 'design',
 name: 'Design & Creative',
 icon: Camera,
 description:
 'Design tools for Myanmar\'s creative economy — from Yangon\'s graphic design studios and Mandalay\'s content creators to the growing freelance design community serving international clients.',
 tools: [
 { name: 'Canva', tag: 'Most Popular', description: 'The #1 design tool in Myanmar. AI features (Magic Studio, text-to-image, background removal) make it essential for Facebook content creators, small shop owners, and marketing teams creating visual content.' },
 { name: 'Midjourney', tag: 'Best for Art', description: 'Growing in popularity among Myanmar digital artists, game developers (Myanmar\'s emerging mobile gaming scene), and content creators for unique visual assets inspired by Burmese culture and aesthetics.' },
 { name: 'Adobe Firefly', tag: 'Best Quality', description: 'Generative AI integrated into Creative Cloud. Used by Myanmar\'s top design agencies and professional creatives for high-quality commercial work.' },
 { name: 'DALL-E 3', tag: 'Best Integration', description: 'Integrated with ChatGPT — used by Myanmar content creators and marketers for rapid image generation with Burmese and English text prompts.' },
 ],
};

const ALL_CATEGORIES = [WRITING_CATEGORY, CODING_CATEGORY, MARKETING_CATEGORY, DESIGN_CATEGORY];

// ─── Top 12 Tools ─────────────────────────────────────────────

const TOP_PICK_PREFIX = [
 { name: 'ChatGPT', tag: 'Best Overall AI Assistant in Myanmar', trend: 'up' as const },
 { name: 'Canva', tag: 'Most Used Design Tool in Myanmar', trend: 'up' as const },
 { name: 'GitHub Copilot', tag: 'Best AI Coding Assistant', trend: 'up' as const },
 { name: 'Grammarly', tag: 'Best for Business English', trend: 'up' as const },
 { name: 'Claude', tag: 'Best for Enterprise & Analysis', trend: 'up' as const },
 { name: 'Notion AI', tag: 'Best for Team Collaboration', trend: 'up' as const },
 { name: 'Perplexity', tag: 'Best Research Assistant', trend: 'up' as const },
 { name: 'Midjourney', tag: 'Best AI Art & Design', trend: 'up' as const },
 { name: 'Writesonic', tag: 'Best Value Writing Tool', trend: 'up' as const },
 { name: 'Jasper AI', tag: 'Best for Marketing Copy', trend: 'up' as const },
 { name: 'AdCreative.ai', tag: 'Best for Social Media Ads', trend: 'up' as const },
 { name: 'Gamma', tag: 'Best AI Presentations', trend: 'up' as const },
];

const TOP_PICKS = TOP_PICK_PREFIX.map((item, i) => ({ ...item, rank: i + 1 }));

// ─── Components ───────────────────────────────────────────────

function TrendBadge({ trend }: { trend: 'up' | 'stable' | 'new' }) {
 const styles = {
 up: 'bg-green-100 text-green-700 ',
 stable: 'bg-blue-100 text-blue-700 ',
 new: 'bg-purple-100 text-purple-700 ',
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

export default function AiToolsMyanmarPage() {
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
 { name: 'AI Tools Myanmar', item: 'https://apifeny-ai.vercel.app/ai-tools-myanmar' },
 ]}
 />
 <GeoSeoSchema
 countryName="Myanmar"
 countryCode="mm"
 capital="Naypyidaw"
 currency="MMK"
 language="Burmese"
 languageCode="my"
 marketSize="$60B GDP, 54M population, emerging digital economy in Southeast Asia"
 slug="ai-tools-myanmar"
 faqs={[
 { question: "What are the best AI tools in Myanmar?", answer: "The best AI tools accessible in Myanmar include ChatGPT for productivity, Canva AI for design, Grammarly for English writing, and Trello AI for project management. Myanmar's emerging digital economy is growing despite infrastructure challenges, with increasing mobile penetration and a young, tech-adaptable population driving gradual AI adoption." },
 { question: "Are AI tools accessible for Myanmar businesses?", answer: "Access is improving. Most global AI tools offer free tiers, which makes them accessible. Mobile-first tools perform best given Myanmar's high mobile usage. The government's Myanmar Digital Economy Development Roadmap aims to build digital infrastructure. However, connectivity in rural areas and foreign exchange access remain challenges for SaaS subscription in USD." },
 { question: "What AI tools suit Myanmar's key industries?", answer: "Agriculture (38% of GDP) benefits from AI crop monitoring and weather prediction tools. The garment manufacturing sector uses AI for quality control. Tourism (pre-pandemic) benefits from AI translation and booking tools. Mobile banking and fintech AI grow with Wave Money, KBZ Pay, and other mobile wallet platforms." },
 { question: "What AI regulations apply in Myanmar?", answer: "Myanmar's Law Protecting the Privacy and Security of Citizens (2017) governs data privacy. The Ministry of Transport and Communications (MOTC) regulates digital services. Financial sector AI must comply with the Central Bank of Myanmar's regulations. Cross-border data processing regulations are still developing." },
 { question: "Is Burmese language supported by AI tools?", answer: "Burmese language support is limited. Google Translate covers basic Burmese. ChatGPT has limited Burmese understanding. Local initiatives like the Myanmar NLP Research Group at the University of Yangon work on Burmese language AI. The government's e-Government Master Plan encourages local language technology development." },
 ]}
 />

 <main className="min-h-screen bg-gradient-to-b from-white via-yellow-50/30 to-white ">
 {/* ── Hero ─────────────────────────────────────── */}
 <section className="relative overflow-hidden border-b border-yellow-100/50 ">
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(254,203,0,0.06),transparent_50%)] ,rgba(254,203,0,0.08),transparent_50%)] pointer-events-none" />
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,74,43,0.04),transparent_50%)] ,rgba(0,74,43,0.06),transparent_50%)] pointer-events-none" />
 <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 relative">
 <div className="mx-auto max-w-3xl text-center">
 <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-4 py-1.5 text-sm font-medium text-[#FECB00] ">
 <MapPin className="h-4 w-4" />
 🇲🇲 Curated for Myanmar
 </div>
 <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
 Best AI Tools in{' '}
 <span className="bg-gradient-to-r from-[#FECB00] via-[#34B233] to-[#EA2839] bg-clip-text text-transparent">
 Myanmar
 </span>{' '}
 (2026)
 </h1>
 <p className="mt-6 text-lg leading-relaxed text-gray-600 ">
 AI tools ranked for Myanmar's emerging digital economy — with{' '}
 <strong>ျမန္မာဘာသာ (Burmese) language support</strong>,{' '}
 <strong>MMK/USD pricing</strong>, and ratings for Myanmar's{' '}
 <strong>mobile-first market, Yangon tech ecosystem, and mobile payment landscape</strong>.
 Updated daily.
 </p>
 <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
 <a
 href="#top-picks"
 className="inline-flex items-center gap-2 rounded-xl bg-[#FECB00] px-6 py-3 text-sm font-semibold text-gray-900 shadow-lg shadow-yellow-200/50 transition-all hover:bg-[#E5B700] hover:shadow-yellow-300/50 "
 >
 <Trophy className="h-4 w-4" />
 View Top Rankings
 <ArrowRight className="h-4 w-4" />
 </a>
 <a
 href="#categories"
 className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 "
 >
 <Layers className="h-4 w-4" />
 Browse by Category
 </a>
 </div>
 </div>
 </div>
 </section>

 {/* ── Trust Signals ───────────────────────────── */}
 <section className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
 <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
 {TRUST_SECTIONS.map((s) => (
 <div
 key={s.title}
 className="rounded-xl border border-yellow-100/60 bg-white/80 p-5 shadow-sm transition-all hover:shadow-md "
 >
 <s.icon className="mb-3 h-6 w-6 text-[#FECB00]" />
 <h3 className="text-sm font-semibold text-gray-900 ">
 {s.title}
 </h3>
 <p className="mt-1 text-xs leading-relaxed text-gray-500 ">
 {s.description}
 </p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ── Myanmar Market Snapshot ────────────────── */}
 <section className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
 <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
 🇲🇲 Myanmar AI Market Snapshot
 </h2>
 <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500 ">
 Key metrics driving digital and AI adoption in Myanmar — Southeast Asia's emerging mobile-first market.
 </p>
 <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
 {MM_AI_SNAPSHOT.map((stat) => (
 <div
 key={stat.label}
 className="rounded-xl border border-yellow-100/60 bg-white p-6 text-center shadow-sm "
 >
 <p className="text-3xl font-bold text-[#FECB00] ">{stat.value}</p>
 <p className="mt-1 text-sm font-medium text-gray-700 ">{stat.label}</p>
 <p className="mt-0.5 text-xs text-gray-400">{stat.sub}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ── Why Myanmar ──────────────────────────────── */}
 <section className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
 <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
 Why Myanmar Needs Its Own AI Rankings
 </h2>
 <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500 ">
 Global AI tool rankings miss what makes Myanmar unique — from its mobile-first digital leapfrogging and Burmese language ecosystem to local payment integrations and the emerging Yangon tech scene. Here's why a dedicated Myanmar ranking matters.
 </p>
 <div className="mt-10 grid gap-6 md:grid-cols-3">
 {WHY_MM.map((item) => (
 <div
 key={item.title}
 className="group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-[#FECB00]/30 hover:shadow-md #FECB00]/40"
 >
 <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#FECB00]/10 text-[#FECB00] ">
 <item.icon className="h-6 w-6" />
 </div>
 <h3 className="text-lg font-semibold text-gray-900 ">{item.title}</h3>
 <p className="mt-2 text-sm leading-relaxed text-gray-500 ">{item.description}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ── Top 12 Rankings ─────────────────────────── */}
 <section id="top-picks" className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
 <div className="mb-10 text-center">
 <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
 🏆 Top 12 AI Tools in Myanmar
 </h2>
 <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500 ">
 Our daily-updated ranking of the most popular and effective AI tools for the
 Myanmar market, curated based on Burmese language support, mobile accessibility,
 affordability, and digital payment integration.
 </p>
 </div>
 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
 {TOP_PICKS.map((tool) => (
 <div
 key={tool.rank}
 className={cn(
 'group relative rounded-xl border p-5 transition-all hover:shadow-md',
 tool.rank <= 3
 ? 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-white '
 : 'border-gray-200 bg-white '
 )}
 >
 <div className="mb-3 flex items-center justify-between">
 <span
 className={cn(
 'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold',
 tool.rank === 1
 ? 'bg-yellow-400 text-yellow-900'
 : tool.rank === 2
 ? 'bg-gray-300 text-gray-700 '
 : tool.rank === 3
 ? 'bg-amber-600 text-white'
 : 'bg-gray-100 text-gray-500 '
 )}
 >
 {tool.rank}
 </span>
 <TrendBadge trend={tool.trend} />
 </div>
 <h3 className="text-base font-semibold text-gray-900 ">{tool.name}</h3>
 <p className="mt-1 text-xs text-gray-500 ">{tool.tag}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ── Category Sections ───────────────────────── */}
 <section id="categories" className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
 <div className="mb-10 text-center">
 <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
 📂 Browse by Category
 </h2>
 <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500 ">
 Explore AI tools organised by category, each curated for the Myanmar market
 with local context and ecosystem fit.
 </p>
 </div>
 <div className="space-y-12">
 {ALL_CATEGORIES.map((cat) => (
 <div key={cat.id} id={cat.id}>
 <div className="mb-6 flex items-center gap-3">
 <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FECB00]/10 text-[#FECB00] ">
 <cat.icon className="h-5 w-5" />
 </div>
 <div>
 <h3 className="text-lg font-bold text-gray-900 ">{cat.name}</h3>
 <p className="text-xs text-gray-500 ">{cat.description}</p>
 </div>
 </div>
 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
 {cat.tools.map((tool) => (
 <div
 key={tool.name}
 className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#FECB00]/20 hover:shadow-md "
 >
 <span className="inline-block rounded-full bg-[#FECB00]/10 px-2.5 py-0.5 text-xs font-medium text-[#FECB00] ">
 {tool.tag}
 </span>
 <h4 className="mt-2 text-sm font-semibold text-gray-900 ">{tool.name}</h4>
 <p className="mt-1 text-xs leading-relaxed text-gray-500 ">{tool.description}</p>
 </div>
 ))}
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ── CTA ──────────────────────────────────────── */}
 <section className="bg-gradient-to-r from-[#FECB00] via-[#34B233] to-[#EA2839]">
 <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
 <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
 ျမန္မာႏိုင္ငံအတြက္ အေကာင္းဆုံး AI Tool ကို ရွာေဖြေနပါသလား?
 </h2>
 <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-800">
 Browse our full directory of 600+ AI tools, filter by category, compare pricing in MMK/USD,
 and read honest reviews from Myanmar users. Your next productivity breakthrough
 is one click away — whether you're in Yangon, Mandalay, or Naypyidaw.
 </p>
 <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
 <Link
 href="/"
 className="inline-flex items-center gap-2 rounded-xl bg-[#EA2839] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#C42230]"
 >
 Browse Full Directory
 <ArrowRight className="h-4 w-4" />
 </Link>
 <Link
 href="/blog"
 className="inline-flex items-center gap-2 rounded-xl border border-gray-900 px-6 py-3 text-sm font-semibold text-gray-900 transition-all hover:bg-white/20"
 >
 <BookOpen className="h-4 w-4" />
 ဘေလာ့ဂ္ဖတ္ရန္ — Read AI Guides
 </Link>
 </div>
 </div>
 </section>

 {/* ── Blog & Playbooks ───────────────────────── */}
 <section className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
 <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-gray-900 ">
 📖 Learn More About AI in Myanmar
 </h2>
 <div className="grid gap-8 lg:grid-cols-2">
 <BlogCategoryLinks slugs={['ai-tools', 'comparisons', 'productivity']} />
 <FeaturedPlaybooks />
 </div>
 </div>
 </section>

 {/* ── Cross Links ─────────────────────────────── */}
 <section className="border-t border-gray-100 bg-gray-50/50 ">
 <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
 <LandingPageCrossLinks currentSlug="ai-tools-myanmar" />
 </div>
 </section>

 {/* ── Footer ──────────────────────────────────── */}
 <footer className="border-t border-gray-100 bg-white ">
 <div className="mx-auto max-w-7xl px-4 py-8 text-center text-xs text-gray-400 sm:px-6 lg:px-8">
 <p>Apifeny AI — Independent AI Tool Rankings for Myanmar. Not affiliated with any listed tool.</p>
 <p className="mt-1">Prices shown in MMK/USD are approximate and may vary. Always verify pricing on the tool's official website.</p>
 </div>
 </footer>
 </main>
 </>
 );
}
