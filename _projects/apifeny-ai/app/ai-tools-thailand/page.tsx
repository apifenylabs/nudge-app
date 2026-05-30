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
 title: 'Best AI Tools in Thailand (2026) — 85+ Tools for Thai Startups & Enterprises',
 description:
 'Discover the best AI tools for Thailand. 85+ ranked tools with THB pricing, PDPA compliance, and local ecosystem support. Updated daily for Thai solopreneurs, SMEs, and enterprises.',
 ogTitle: 'Best AI Tools in Thailand (2026) — Apifeny AI',
 ogDescription:
 '85+ AI tools ranked for the Thai market. 🇹🇭 THB pricing, PDPA-compliant, Thai-language supported.',
 ogImage: '/og/ai-tools-thailand.png',
};

const TRUST_SECTIONS = [
 {
 icon: Globe,
 title: '🇹🇭 ภาษาไทย (Thai) & English',
 description:
 'Optimized for Thailand\'s bilingual workforce. English-dominant tools ranked alongside platforms with Thai language support for maximum accessibility across Bangkok and regional hubs.',
 },
 {
 icon: DollarSign,
 title: '฿ THB Pricing',
 description:
 'All tool prices shown in Thai Baht. We track freemium tiers, baht-friendly plans, and tools with PromptPay/TrueMoney payment support for hassle-free subscriptions.',
 },
 {
 icon: ShieldCheck,
 title: '🔒 PDPA Compliant',
 description:
 'Every tool evaluated for compliance with Thailand\'s Personal Data Protection Act (PDPA) B.E. 2562. We flag data sovereignty risks and highlight tools with local data centers in Thailand.',
 },
 {
 icon: Building2,
 title: '🏢 Thailand Enterprise Ready',
 description:
 'Curated for the Thai enterprise ecosystem — from manufacturing Industry 4.0 to e-commerce (Shopee/Lazada/Line API tools), fintech (TrueMoney/SCB stack), and government digitalization (Thai Digital Government).',
 },
];

const TH_AI_SNAPSHOT = [
 { label: 'AI Market Size (2026)', value: '฿18B+', sub: 'Growing 32% YoY' },
 { label: 'Manufacturing AI', value: '55%', sub: 'Of factories use AI tools' },
 { label: 'Thai AI Startups', value: '280+', sub: 'Across Bangkok, Chiang Mai, Phuket' },
 { label: 'Line Platform Users', value: '96%', sub: 'Penetration among Thai internet users' },
];

const WHY_TH = [
 {
 icon: Smartphone,
 title: 'Line-First Digital Economy',
 description:
 'Thailand runs on Line. With 96% internet penetration, AI tools that integrate with Line OA, Line Shopping, and Line Pay get priority in our rankings. This ecosystem is unique to Thailand.',
 },
 {
 icon: Building2,
 title: 'Thailand 4.0 & Manufacturing Hub',
 description:
 'As ASEAN\'s second-largest economy, Thailand\'s manufacturing sector (automotive, electronics, food) is rapidly adopting AI for smart factories, predictive maintenance, and supply chain optimization.',
 },
 {
 icon: Users,
 title: 'Booming Creator & Tourism Economy',
 description:
 'Thailand has Asia\'s most vibrant creator economy and a world-leading tourism sector. AI writing, video, photo, travel planning, and hotel management tools are ranked for these unique needs.',
 },
];

// ─── Tool Categories ──────────────────────────────────────────────────────────

const WRITING_CATEGORY = {
 id: 'writing',
 name: 'Writing & Content Creation',
 icon: BookOpen,
 description:
 'AI writing tools optimized for Thailand\'s bilingual content ecosystem — from blog posts in English to social media captions in Thai (ภาษาไทย).',
 tools: [
 { name: 'Jasper AI', tag: 'Best for Marketing Copy', description: 'Enterprise-grade AI writing with brand voice customization. Strong for Thai marketing teams in Bangkok.' },
 { name: 'Writesonic', tag: 'Best Value', description: 'Affordable AI writing with Thai-influenced tone options. ฿1,000/mo starting.' },
 { name: 'Rytr', tag: 'Best for Freelancers', description: 'Lightweight writing assistant popular with Thai freelancers. Supports Thai language output.' },
 { name: 'Copy.ai', tag: 'Best for Social Media', description: 'Quick social media content generation. Ideal for Thai brands on Line, Facebook, and TikTok.' },
 ],
};

const CODING_CATEGORY = {
 id: 'coding',
 name: 'Coding & Development',
 icon: Briefcase,
 description:
 'Development tools powering Thailand\'s growing tech startup ecosystem — from Bangkok fintech to Chiang Mai digital nomad hubs.',
 tools: [
 { name: 'GitHub Copilot', tag: 'Best Overall', description: 'Standard for Thai dev teams. Strong PHP, JavaScript, and Python support for local web dev and e-commerce shops.' },
 { name: 'Cursor', tag: 'Rising Star', description: 'AI-native IDE gaining traction in Thai coding bootcamps and dev communities. Free tier available.' },
 { name: 'Replit AI', tag: 'Best for Learning', description: 'Popular among Thai CS students and bootcamp graduates learning full-stack development.' },
 { name: 'Tabnine', tag: 'Best for Privacy', description: 'On-device AI coding that works offline — valuable for Thai enterprises with PDPA data sensitivity requirements.' },
 ],
};

const MARKETING_CATEGORY = {
 id: 'marketing',
 name: 'Marketing & E-Commerce',
 icon: BarChart3,
 description:
 'Marketing AI tools tailored for Thailand\'s unique digital landscape — where Line, Shopee, Lazada, TikTok Shop, and Facebook dominate.',
 tools: [
 { name: 'AdCreative.ai', tag: 'Best for Ads', description: 'AI ad creative generator optimized for Thai social commerce. Train on your Shopee/Lazada product catalog.' },
 { name: 'Jasper AI', tag: 'Best for Content', description: 'Multi-channel content for Thai brands — from email to Line OA to Viber broadcast.' },
 { name: 'Canva AI', tag: 'Most Accessible', description: 'Overwhelmingly popular in Thailand. AI-powered design tools for social media, print, and video content.' },
 { name: 'Typeface', tag: 'Best for Enterprise', description: 'Enterprise brand content platform. Used by Thai conglomerates for consistent multi-brand content.' },
 ],
};

const DESIGN_CATEGORY = {
 id: 'design',
 name: 'Design & Creative',
 icon: Camera,
 description:
 'Design tools that power Thailand\'s vibrant creative economy — from Bangkok ad agencies to Chiang Mai-based freelance designers.',
 tools: [
 { name: 'Canva', tag: 'Most Popular', description: 'The #1 design tool in Thailand. AI features (Magic Studio, text-to-image) make it indispensable for Thai creators.' },
 { name: 'Adobe Firefly', tag: 'Best Quality', description: 'Generative AI integrated into Creative Cloud. Preferred by Thai ad agencies and professional designers.' },
 { name: 'Midjourney', tag: 'Best for Art', description: 'Popular among Thai digital artists and concept designers. Strong Discord community locally.' },
 { name: 'Clipdrop', tag: 'Best Quick Edits', description: 'Quick background removal and image editing. Wide adoption among Thai e-commerce sellers on Shopee and Lazada.' },
 ],
};

const ALL_CATEGORIES = [WRITING_CATEGORY, CODING_CATEGORY, MARKETING_CATEGORY, DESIGN_CATEGORY];

// ─── Top 12 Tools ────────────────────────────────────────────────────────────

const TOP_PICKS = [
 { rank: 1, name: 'ChatGPT', tag: 'Best Overall AI Assistant', trend: 'up' as const },
 { rank: 2, name: 'GitHub Copilot', tag: 'Best AI Coding Assistant', trend: 'up' as const },
 { rank: 3, name: 'Jasper AI', tag: 'Best for Thai Marketing Copy', trend: 'up' as const },
 { rank: 4, name: 'Canva', tag: 'Most Used Design Tool in TH', trend: 'up' as const },
 { rank: 5, name: 'Midjourney', tag: 'Best AI Art Generator', trend: 'up' as const },
 { rank: 6, name: 'Claude', tag: 'Best for Long-Form Analysis', trend: 'up' as const },
 { rank: 7, name: 'Notion AI', tag: 'Best for Thai Remote Teams', trend: 'up' as const },
 { rank: 8, name: 'Perplexity', tag: 'Best AI Research Assistant', trend: 'up' as const },
 { rank: 9, name: 'AdCreative.ai', tag: 'Best for Thai E-Commerce Ads', trend: 'up' as const },
 { rank: 10, name: 'Writesonic', tag: 'Best Value Writing Tool', trend: 'up' as const },
 { rank: 11, name: 'Descript', tag: 'Best for Thai Content Creators', trend: 'up' as const },
 { rank: 12, name: 'Copy.ai', tag: 'Best for Social Media Mgmt', trend: 'up' as const },
];

// ─── Components ──────────────────────────────────────────────────────────────

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

// ─── Page Component ──────────────────────────────────────────────────────────

export default function AiToolsThailandPage() {
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
 { name: 'AI Tools Thailand', item: 'https://apifeny-ai.vercel.app/ai-tools-thailand' },
 ]}
 />
 <GeoSeoSchema
 countryName="Thailand"
 countryCode="th"
 capital="Bangkok"
 currency="THB"
 language="Thai"
 languageCode="th"
 marketSize="$520B GDP, 70M population, Southeast Asia's second-largest economy"
 slug="ai-tools-thailand"
 faqs={[
 { question: "What are the best AI tools in Thailand?", answer: "The best AI tools in Thailand include ChatGPT for content and productivity, GitHub Copilot for development, Canva AI for design, and Jasper for marketing. Thailand's rapidly digitising economy and strong government support through Thailand 4.0 make it a growing AI market." },
 { question: "Are AI tools accessible for Thai businesses?", answer: "Yes. Most global AI tools work well in Thailand. The Board of Investment (BOI) offers tax incentives for tech adoption. The Digital Economy Promotion Agency (DEPA) provides grants and certification. Thailand's high smartphone penetration (80%+) and strong 5G rollout support cloud-based AI tools." },
 { question: "What AI tools are best for Thailand's tourism industry?", answer: "Tourism (12% of GDP) benefits from AI chatbots for customer service, TripAdvisor AI for personalised recommendations, and local tools like Ricult for tourism analytics. The Tourism Authority of Thailand (TAT) promotes digital transformation through its Amazing Thailand Digital Tourism initiative." },
 { question: "What AI regulations apply in Thailand?", answer: "Thailand's Personal Data Protection Act (PDPA), effective June 2022, is one of Asia's strongest data privacy laws — similar to GDPR. Cross-border data transfers have strict requirements. The Electronic Transactions Development Agency (ETDA) governs digital platform regulations." },
 { question: "Is Thai language supported by AI tools?", answer: "Support is improving. ChatGPT handles Thai moderately well. Google Translate supports Thai. Local providers like NECTEC (National Electronics and Computer Technology Center) develop Thai-language NLP. The Thai government's AI Roadmap (2022-2027) prioritises Thai language AI development." },
 ]}
 />

 <main className="min-h-screen bg-gradient-to-b from-white via-purple-50/30 to-white ">
 {/* ── Hero ─────────────────────────────────────── */}
 <section className="relative overflow-hidden border-b border-purple-100/50 ">
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(45,42,157,0.06),transparent_50%)] ,rgba(45,42,157,0.08),transparent_50%)] pointer-events-none" />
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(237,27,36,0.04),transparent_50%)] ,rgba(237,27,36,0.06),transparent_50%)] pointer-events-none" />
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_60%)] ,rgba(255,255,255,0.02),transparent_60%)] pointer-events-none" />
 <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 relative">
 <div className="mx-auto max-w-3xl text-center">
 <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-sm font-medium text-purple-700 ">
 <MapPin className="h-4 w-4" />
 🇹🇭 Curated for Thailand
 </div>
 <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
 Best AI Tools in{' '}
 <span className="bg-gradient-to-r from-[#2D2A9D] via-[#ED1B24] to-[#2D2A9D] bg-clip-text text-transparent">
 Thailand
 </span>{' '}
 (2026)
 </h1>
 <p className="mt-6 text-lg leading-relaxed text-gray-600 ">
 85+ AI tools ranked for the Thai market — with <strong>THB pricing</strong>,{' '}
 <strong>PDPA compliance</strong>, and support for Thailand's unique{' '}
 <strong>Line-first, manufacturing-driven, creator-powered economy</strong>.
 Updated daily.
 </p>
 <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
 <a
 href="#top-picks"
 className="inline-flex items-center gap-2 rounded-xl bg-[#2D2A9D] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200/50 transition-all hover:bg-[#1f1d6e] hover:shadow-purple-300/50 "
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
 className="rounded-xl border border-purple-100/60 bg-white/80 p-5 shadow-sm transition-all hover:shadow-md "
 >
 <s.icon className="mb-3 h-6 w-6 text-[#ED1B24]" />
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

 {/* ── TH Market Snapshot ──────────────────────── */}
 <section className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
 <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
 🇹🇭 Thailand AI Market Snapshot
 </h2>
 <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500 ">
 Key metrics driving AI adoption in Thailand — ASEAN's second-largest economy powered by
 manufacturing, tourism, a Line-first digital ecosystem, and Thailand 4.0 policy.
 </p>
 <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
 {TH_AI_SNAPSHOT.map((stat) => (
 <div
 key={stat.label}
 className="rounded-xl border border-purple-100/60 bg-white p-6 text-center shadow-sm "
 >
 <p className="text-3xl font-bold text-[#2D2A9D] ">{stat.value}</p>
 <p className="mt-1 text-sm font-medium text-gray-700 ">{stat.label}</p>
 <p className="mt-0.5 text-xs text-gray-400">{stat.sub}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ── Why Thailand ─────────────────────────── */}
 <section className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
 <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
 Why Thailand Needs Its Own AI Rankings
 </h2>
 <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500 ">
 Global AI tool rankings miss what makes Thailand unique. Here's why a dedicated
 Thailand ranking matters.
 </p>
 <div className="mt-10 grid gap-6 md:grid-cols-3">
 {WHY_TH.map((item) => (
 <div
 key={item.title}
 className="group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-[#ED1B24]/30 hover:shadow-md #ED1B24]/40"
 >
 <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#2D2A9D]/10 text-[#2D2A9D] ">
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
 🏆 Top 12 AI Tools in Thailand
 </h2>
 <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500 ">
 Our daily-updated ranking of the most popular and effective AI tools for the
 Thai market, curated based on local usage patterns, affordability, and relevance.
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
 Explore AI tools organized by category, each curated for the Thai market.
 </p>
 </div>
 <div className="space-y-12">
 {ALL_CATEGORIES.map((cat) => (
 <div key={cat.id} id={cat.id}>
 <div className="mb-6 flex items-center gap-3">
 <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2D2A9D]/10 text-[#2D2A9D] ">
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
 className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#2D2A9D]/20 hover:shadow-md "
 >
 <span className="inline-block rounded-full bg-[#2D2A9D]/10 px-2.5 py-0.5 text-xs font-medium text-[#2D2A9D] ">
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
 <section className="bg-gradient-to-r from-[#2D2A9D] to-[#ED1B24]">
 <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
 <h2 className="text-2xl font-bold text-white sm:text-3xl">
 🇹🇭 พร้อมแล้วหรือยังที่จะค้นหา AI Tool ที่ใช่สำหรับธุรกิจของคุณ?
 </h2>
 <p className="mx-auto mt-4 max-w-2xl text-sm text-white/80">
 Browse our full directory of 600+ AI tools, filter by category, compare pricing in THB,
 and read honest reviews from Thai users. Your next productivity breakthrough is one click away.
 </p>
 <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
 <Link
 href="/"
 className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#2D2A9D] shadow-lg transition-all hover:bg-purple-50"
 >
 Browse Full Directory
 <ArrowRight className="h-4 w-4" />
 </Link>
 <Link
 href="/blog/ai-tools-thailand-2026"
 className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
 >
 <BookOpen className="h-4 w-4" />
 อ่านบทความ — Read the Thailand AI Guide
 </Link>
 </div>
 </div>
 </section>

 {/* ── Blog & Playbooks ───────────────────────── */}
 <section className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
 <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-gray-900 ">
 📖 Learn More About AI in Thailand
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
 <LandingPageCrossLinks currentSlug="ai-tools-thailand" />
 </div>
 </section>

 {/* ── Footer ──────────────────────────────────── */}
 <footer className="border-t border-gray-100 bg-white ">
 <div className="mx-auto max-w-7xl px-4 py-8 text-center text-xs text-gray-400 sm:px-6 lg:px-8">
 <p>Apifeny AI — Independent AI Tool Rankings for Thailand. Not affiliated with any listed tool.</p>
 <p className="mt-1">Prices shown in THB are approximate and may vary. Always verify pricing on the tool's official website.</p>
 </div>
 </footer>
 </main>
 </>
 );
}
