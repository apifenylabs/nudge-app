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
 title: 'Best AI Tools in Cambodia (2026) — 75+ Tools for Khmer Startups & SMEs',
 description:
 'Discover the best AI tools for Cambodia. 75+ ranked tools with KHR/USD pricing, PDPA compliance, Khmer language support, and local ecosystem fit. Updated for Phnom Penh, Siem Reap & Sihanoukville.',
 ogTitle: 'Best AI Tools in Cambodia (2026) — Apifeny AI',
 ogDescription:
 '75+ AI tools ranked for the Cambodian market. 🇰🇭 Khmer language support, USD/KHR pricing, data privacy compliant.',
 ogImage: '/og/ai-tools-cambodia.png',
};

const TRUST_SECTIONS = [
 {
 icon: Globe,
 title: '🇰🇭 ភាសាខ្មែរ (Khmer) & English',
 description:
 'Optimized for Cambodia\'s bilingual workforce. English-dominant tools ranked alongside platforms with Khmer (ភាសាខ្មែរ) Unicode support for maximum accessibility across Phnom Penh\'s business districts and provincial centres.',
 },
 {
 icon: DollarSign,
 title: '៛ KHR / USD Pricing',
 description:
 'All tool prices shown in both Khmer Riel (៛) and USD. Cambodia\'s dual-currency economy means tools accepting USD are preferred, while KHR-friendly plans suit local SME budgets.',
 },
 {
 icon: ShieldCheck,
 title: '🔒 Data Privacy Reviewed',
 description:
 'Every tool evaluated for data handling standards. Cambodia\'s data protection framework is evolving — we flag risks and highlight tools with ASEAN-aligned privacy practices and local server options.',
 },
 {
 icon: Building2,
 title: '🏢 Cambodia SME & Startup Ready',
 description:
 'Curated for Cambodia\'s fast-growing digital economy — from Phnom Penh\'s fintech and agri-tech startups to Siem Reap\'s tourism tech, Sihanoukville\'s logistics, and the booming e-commerce sector.',
 },
];

const KH_AI_SNAPSHOT = [
 { label: 'AI Market Growth (2026)', value: '៛15B+', sub: 'Startup ecosystem grew 51% YoY' },
 { label: 'Smartphone Penetration', value: '68%', sub: 'Mobile-first internet users' },
 { label: 'Khmer SMEs', value: '500K+', sub: 'Driving 70% of employment' },
 { label: 'Tech Startups', value: '50+', sub: 'Across Phnom Penh & provincial hubs' },
];

const WHY_KH = [
 {
 icon: Smartphone,
 title: 'Mobile-First Digital Leap',
 description:
 'Cambodia leapfrogged desktops straight to smartphones. With 68% smartphone penetration and booming mobile banking (Wing, ABA, ACLEDA), AI tools that work well on mobile and integrate with Cambodian payment systems get priority in our rankings.',
 },
 {
 icon: Building2,
 title: 'Youth-Driven Startup Wave',
 description:
 'With 60% of the population under 30 and startup ecosystem growth of 51% YoY, Cambodia\'s young entrepreneurs are hungry for AI tools that work on SME budgets. Our rankings prioritise freemium tiers and affordable entry points for Phnom Penh\'s newest founders.',
 },
 {
 icon: Users,
 title: 'Tourism & Agri-Tech Opportunity',
 description:
 'Angkor Wat draws 7M+ annual visitors, while agriculture employs 40% of the workforce. AI tools for travel tech, hotel management, precision agriculture, and supply chain optimisation are ranked specifically for these Cambodian economic pillars.',
 },
];

// ─── Tool Categories ──────────────────────────────────────────

const WRITING_CATEGORY = {
 id: 'writing',
 name: 'Writing & Content Creation',
 icon: BookOpen,
 description:
 'AI writing tools optimised for Cambodia\'s content ecosystem — from English business writing to Khmer (ភាសាខ្មែរ) social media and bilingual marketing.',
 tools: [
 { name: 'Jasper AI', tag: 'Best for Marketing Copy', description: 'Enterprise-grade AI writing with brand voice. Popular with Phnom Penh marketing agencies serving international clients.' },
 { name: 'Writesonic', tag: 'Best Value', description: 'Affordable AI writing with Khmer-friendly tone options. ~$10/mo starting — ideal for Cambodian SMEs.' },
 { name: 'Rytr', tag: 'Best for Freelancers', description: 'Lightweight writing assistant popular with the growing Cambodian freelance community on Upwork and Fiverr.' },
 { name: 'Copy.ai', tag: 'Best for Social Media', description: 'Quick social content for Facebook, Instagram, and TikTok — Cambodia\'s dominant social platforms.' },
 ],
};

const CODING_CATEGORY = {
 id: 'coding',
 name: 'Coding & Development',
 icon: Briefcase,
 description:
 'Development tools powering Cambodia\'s growing tech scene — from Phnom Penh fintech (Pi Pay, TrueMoney) to provincial tech education centres.',
 tools: [
 { name: 'GitHub Copilot', tag: 'Best Overall', description: 'Standard for Khmer dev teams. Strong PHP, JavaScript, and Python support for local web dev and e-commerce platforms.' },
 { name: 'Cursor', tag: 'Rising Star', description: 'AI-native IDE gaining traction in Phnom Penh coding bootcamps (Kirirom, SabaiCode) and dev communities.' },
 { name: 'Replit AI', tag: 'Best for Learning', description: 'Popular among Khmer CS students at ITC (Institute of Technology of Cambodia) and RUPP learning full-stack development.' },
 { name: 'Tabnine', tag: 'Best for Privacy', description: 'On-device AI coding for organisations with sensitive client data in the banking and legal sectors.' },
 ],
};

const MARKETING_CATEGORY = {
 id: 'marketing',
 name: 'Marketing & E-Commerce',
 icon: BarChart3,
 description:
 'Marketing AI tools for Cambodia\'s unique digital landscape — where Facebook, Telegram, TikTok Shop, and local e-commerce (SmallWorld, Khmer24) dominate.',
 tools: [
 { name: 'AdCreative.ai', tag: 'Best for Ads', description: 'AI ad creative generator optimised for Cambodian social commerce. Train on your Facebook/TikTok Shop product catalog.' },
 { name: 'Jasper AI', tag: 'Best for Content', description: 'Multi-channel content for Khmer brands — from Facebook posts to Telegram broadcast to email marketing.' },
 { name: 'Canva AI', tag: 'Most Accessible', description: 'Overwhelmingly popular in Cambodia. AI-powered design for social media, print flyers, and video content in Khmer & English.' },
 { name: 'Typeface', tag: 'Best for Enterprise', description: 'Enterprise brand platform used by larger Cambodian conglomerates for consistent multi-brand content across ASEAN.' },
 ],
};

const DESIGN_CATEGORY = {
 id: 'design',
 name: 'Design & Creative',
 icon: Camera,
 description:
 'Design tools powering Cambodia\'s creative economy — from Phnom Penh ad agencies to freelance designers and e-commerce shop owners.',
 tools: [
 { name: 'Canva', tag: 'Most Popular', description: 'The #1 design tool in Cambodia. AI features (Magic Studio, text-to-image) make it indispensable for Khmer creators and small businesses.' },
 { name: 'Adobe Firefly', tag: 'Best Quality', description: 'Generative AI integrated into Creative Cloud. Preferred by Phnom Penh\'s top agencies and professional designers.' },
 { name: 'Midjourney', tag: 'Best for Art', description: 'Growing popularity among Khmer digital artists and concept designers for architectural visualisations and creative branding.' },
 { name: 'Clipdrop', tag: 'Best Quick Edits', description: 'Quick background removal and image editing. Widely adopted by Cambodian e-commerce sellers on Facebook and Telegram marketplaces.' },
 ],
};

const ALL_CATEGORIES = [WRITING_CATEGORY, CODING_CATEGORY, MARKETING_CATEGORY, DESIGN_CATEGORY];

// ─── Top 12 Tools ─────────────────────────────────────────────

const TOP_PICKS = [
 { rank: 1, name: 'ChatGPT', tag: 'Best Overall AI Assistant', trend: 'up' as const },
 { rank: 2, name: 'GitHub Copilot', tag: 'Best AI Coding Assistant', trend: 'up' as const },
 { rank: 3, name: 'Jasper AI', tag: 'Best for Marketing Copy', trend: 'up' as const },
 { rank: 4, name: 'Canva', tag: 'Most Used Design Tool in KH', trend: 'up' as const },
 { rank: 5, name: 'Midjourney', tag: 'Best AI Art Generator', trend: 'up' as const },
 { rank: 6, name: 'Claude', tag: 'Best for Long-Form Analysis', trend: 'up' as const },
 { rank: 7, name: 'Notion AI', tag: 'Best for Remote Teams', trend: 'up' as const },
 { rank: 8, name: 'Perplexity', tag: 'Best AI Research Assistant', trend: 'up' as const },
 { rank: 9, name: 'AdCreative.ai', tag: 'Best for Social Commerce Ads', trend: 'up' as const },
 { rank: 10, name: 'Writesonic', tag: 'Best Value Writing Tool', trend: 'up' as const },
 { rank: 11, name: 'Descript', tag: 'Best for Khmer Content Creators', trend: 'up' as const },
 { rank: 12, name: 'Copy.ai', tag: 'Best for Social Media Mgmt', trend: 'up' as const },
];

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

export default function AiToolsCambodiaPage() {
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
 { name: 'AI Tools Cambodia', item: 'https://apifeny-ai.vercel.app/ai-tools-cambodia' },
 ]}
 />
 <GeoSeoSchema
 countryName="Cambodia"
 countryCode="kh"
 capital="Phnom Penh"
 currency="KHR"
 language="Khmer"
 languageCode="km"
 marketSize="$30B GDP, 17M population, fastest-growing economy in ASEAN"
 slug="ai-tools-cambodia"
 faqs={[
 { question: "What are the best AI tools in Cambodia?", answer: "The best AI tools accessible in Cambodia include ChatGPT for productivity, Canva AI for design, Grammarly for writing, and Trello AI for project management. Cambodia's rapidly growing digital ecosystem and young population (median age 27) drive increasing adoption of AI tools." },
 { question: "Are AI tools accessible for Cambodian SMEs?", answer: "Most global AI tools offer free tiers suitable for Cambodian SMEs. The Ministry of Post and Telecommunications (MPTC) provides support through the Digital Economy and Society Policy Framework. Cambodia's 4G coverage reaches 90%+, enabling cloud-based tool access." },
 { question: "What AI tools suit Cambodia's key industries?", answer: "Garment manufacturing (leading export) benefits from computer vision quality control AI. Agriculture (rice, rubber, cassava) uses AI for crop monitoring. Tourism (Angkor Wat) benefits from AI translation and recommendation tools. The government's Rectangular Strategy includes digital transformation goals." },
 { question: "What AI regulations apply in Cambodia?", answer: "Cambodia's Law on Cybersecurity (2023) and the Personal Data Protection Law affect AI tool usage. Financial sector AI must comply with the National Bank of Cambodia's regulations. Cross-border data processing is an emerging area of regulation." },
 { question: "Is Khmer language supported by AI tools?", answer: "Khmer language support is limited but growing. Google Translate covers Khmer basics. ChatGPT offers limited Khmer understanding. Local initiatives like the Royal University of Phnom Penh's AI research lab work on Khmer NLP. The MPTC's Smart City framework encourages local AI solutions." },
 ]}
 />

 <main className="min-h-screen bg-gradient-to-b from-white via-red-50/30 to-white ">
 {/* ── Hero ─────────────────────────────────────── */}
 <section className="relative overflow-hidden border-b border-red-100/50 ">
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,53,166,0.06),transparent_50%)] ,rgba(0,53,166,0.08),transparent_50%)] pointer-events-none" />
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(218,41,28,0.04),transparent_50%)] ,rgba(218,41,28,0.06),transparent_50%)] pointer-events-none" />
 <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 relative">
 <div className="mx-auto max-w-3xl text-center">
 <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-sm font-medium text-red-700 ">
 <MapPin className="h-4 w-4" />
 🇰🇭 Curated for Cambodia
 </div>
 <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
 Best AI Tools in{' '}
 <span className="bg-gradient-to-r from-[#0035A6] via-[#DA291C] to-[#0035A6] bg-clip-text text-transparent">
 Cambodia
 </span>{' '}
 (2026)
 </h1>
 <p className="mt-6 text-lg leading-relaxed text-gray-600 ">
 75+ AI tools ranked for the Cambodian market — with <strong>KHR/USD pricing</strong>,{' '}
 <strong>Khmer (ភាសាខ្មែរ) language support</strong>, and ratings for Cambodia's{' '}
 <strong>mobile-first, youth-driven, tourism-powered economy</strong>.
 Updated daily.
 </p>
 <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
 <a
 href="#top-picks"
 className="inline-flex items-center gap-2 rounded-xl bg-[#0035A6] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-200/50 transition-all hover:bg-[#002481] hover:shadow-red-300/50 "
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
 className="rounded-xl border border-red-100/60 bg-white/80 p-5 shadow-sm transition-all hover:shadow-md "
 >
 <s.icon className="mb-3 h-6 w-6 text-[#DA291C]" />
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

 {/* ── KH Market Snapshot ───────────────────────── */}
 <section className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
 <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
 🇰🇭 Cambodia AI Market Snapshot
 </h2>
 <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500 ">
 Key metrics driving AI adoption in Cambodia — a mobile-first, youth-powered economy
 with the fastest-growing startup ecosystem in ASEAN.
 </p>
 <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
 {KH_AI_SNAPSHOT.map((stat) => (
 <div
 key={stat.label}
 className="rounded-xl border border-red-100/60 bg-white p-6 text-center shadow-sm "
 >
 <p className="text-3xl font-bold text-[#0035A6] ">{stat.value}</p>
 <p className="mt-1 text-sm font-medium text-gray-700 ">{stat.label}</p>
 <p className="mt-0.5 text-xs text-gray-400">{stat.sub}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ── Why Cambodia ───────────────────────────── */}
 <section className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
 <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
 Why Cambodia Needs Its Own AI Rankings
 </h2>
 <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500 ">
 Global AI tool rankings miss what makes Cambodia unique. Here's why a dedicated
 Cambodia ranking matters.
 </p>
 <div className="mt-10 grid gap-6 md:grid-cols-3">
 {WHY_KH.map((item) => (
 <div
 key={item.title}
 className="group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-[#DA291C]/30 hover:shadow-md #DA291C]/40"
 >
 <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#0035A6]/10 text-[#0035A6] ">
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
 🏆 Top 12 AI Tools in Cambodia
 </h2>
 <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500 ">
 Our daily-updated ranking of the most popular and effective AI tools for the
 Cambodian market, curated based on local usage patterns, affordability, and relevance.
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
 Explore AI tools organised by category, each curated for the Cambodian market.
 </p>
 </div>
 <div className="space-y-12">
 {ALL_CATEGORIES.map((cat) => (
 <div key={cat.id} id={cat.id}>
 <div className="mb-6 flex items-center gap-3">
 <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0035A6]/10 text-[#0035A6] ">
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
 className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#0035A6]/20 hover:shadow-md "
 >
 <span className="inline-block rounded-full bg-[#0035A6]/10 px-2.5 py-0.5 text-xs font-medium text-[#0035A6] ">
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
 <section className="bg-gradient-to-r from-[#0035A6] to-[#DA291C]">
 <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
 <h2 className="text-2xl font-bold text-white sm:text-3xl">
 🇰🇭 តើអ្នកត្រៀមរួចរាល់ហើយឬនៅក្នុងការស្វែងរក AI Tool ដែលសាកសមនឹងអាជីវកម្មរបស់អ្នក?
 </h2>
 <p className="mx-auto mt-4 max-w-2xl text-sm text-white/80">
 Browse our full directory of 600+ AI tools, filter by category, compare pricing in USD/KHR,
 and read honest reviews from Cambodian users. Your next productivity breakthrough is one click away.
 </p>
 <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
 <Link
 href="/"
 className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#0035A6] shadow-lg transition-all hover:bg-blue-50"
 >
 Browse Full Directory
 <ArrowRight className="h-4 w-4" />
 </Link>
 <Link
 href="/blog"
 className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
 >
 <BookOpen className="h-4 w-4" />
 អានអត្ថបទ — Read AI Guides
 </Link>
 </div>
 </div>
 </section>

 {/* ── Blog & Playbooks ───────────────────────── */}
 <section className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
 <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-gray-900 ">
 📖 Learn More About AI in Cambodia
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
 <LandingPageCrossLinks currentSlug="ai-tools-cambodia" />
 </div>
 </section>

 {/* ── Footer ──────────────────────────────────── */}
 <footer className="border-t border-gray-100 bg-white ">
 <div className="mx-auto max-w-7xl px-4 py-8 text-center text-xs text-gray-400 sm:px-6 lg:px-8">
 <p>Apifeny AI — Independent AI Tool Rankings for Cambodia. Not affiliated with any listed tool.</p>
 <p className="mt-1">Prices shown in USD/KHR are approximate and may vary. Always verify pricing on the tool's official website.</p>
 </div>
 </footer>
 </main>
 </>
 );
}
