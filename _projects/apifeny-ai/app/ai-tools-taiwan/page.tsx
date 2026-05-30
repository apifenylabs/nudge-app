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
 Microchip,
 Factory,
 Cpu,
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
 title: 'Best AI Tools in Taiwan (2026) — 100+ Tools for Taiwanese Startups & Enterprises',
 description:
 'Discover the best AI tools for Taiwan\'s $5B AI market. 100+ ranked tools with TWD/USD pricing, PDPA compliance, Traditional Chinese (繁體中文) support, and semiconductor ecosystem fit. Updated for Taipei, Hsinchu, Taichung & Kaohsiung.',
 ogTitle: 'Best AI Tools in Taiwan (2026) — Apifeny AI',
 ogDescription:
 '100+ AI tools ranked for the Taiwanese market. 🇹🇼 Traditional Chinese support, TWD/USD pricing, PDPA compliant, curated for Taiwan\'s semiconductor-led economy and startup ecosystem.',
 ogImage: '/og/ai-tools-taiwan.png',
};

const TRUST_SECTIONS = [
 {
 icon: Globe,
 title: '🇹🇼 繁體中文 & English',
 description:
 'Traditional Chinese-first tools optimised for Taiwan\'s workforce. Platforms ranked by their 繁體中文 support, character rendering, and localisation quality alongside English-dominant enterprise tools popular in Taipei\'s Neihu, Xinyi, and Nangang tech districts.',
 },
 {
 icon: DollarSign,
 title: 'NT$ TWD / USD Pricing',
 description:
 'All tool prices shown in both New Taiwan Dollars (NT$) and USD. Taiwan\'s sophisticated fintech ecosystem means tools accepting TWD via local payment methods (LINE Pay, Jkopay, Pi拍錢包, credit card) are prioritised for consumer and SME adoption.',
 },
 {
 icon: ShieldCheck,
 title: '🔒 PDPA Compliance Reviewed',
 description:
 'Every tool evaluated against Taiwan\'s Personal Data Protection Act (PDPA). We flag compliance risks, highlight tools with Taiwan-based data centres (AIGC Taiwan, AWS Taipei Local Zone, GCP Taiwan), and note those aligning with Taiwan\'s AI governance recommendations from the Ministry of Digital Affairs (moda).',
 },
 {
 icon: Cpu,
 title: '🔬 Taiwan Semiconductor & Enterprise Ready',
 description:
 'Curated for Taiwan\'s unique dual economy — from TSMC, MediaTek, Foxconn, and Quanta\'s enterprise AI deployments to Taipei\'s startup ecosystem, Hsinchu Science Park semiconductor R&D, and Kaohsiung\'s smart manufacturing initiatives.',
 },
];

const TAIWAN_AI_SNAPSHOT = [
 { label: 'AI Market (2026)', value: '$5B+', sub: 'Fastest-growing AI market in Southeast Asia; 13th in AI readiness globally' },
 { label: 'Smartphone Penetration', value: '90%+', sub: 'Mobile-first economy driving AI app adoption and edge computing demand' },
 { label: 'Semiconductor Dominance', value: '63% Global', sub: 'TSMC alone controls ~63% of global foundry market — AI hardware backbone' },
 { label: 'AI Startups', value: '2,000+', sub: 'Taipei, Hsinchu, Taichung — Asia\'s most capitalised deep-tech startup corridor' },
];

const WHY_TAIWAN = [
 {
 icon: Cpu,
 title: 'Taiwan\'s Semiconductor Advantage — The AI Hardware Capital',
 description:
 'Taiwan is the undisputed AI hardware capital of the world. TSMC manufactures the world\'s most advanced AI chips (3nm, 5nm, CoWoS packaging), MediaTek powers edge AI devices, and Foxconn assembles AI servers for NVIDIA, AMD, and AWS. This creates a uniquely valuable niche for AI tools in semiconductor design automation (EDA), chip yield optimisation, supply chain intelligence, and fab management. Taiwan\'s $5B+ AI market is growing faster than any other in Asia outside China, fuelled by a government investing $1B+ in AI R&D through the "Taiwan AI Action Plan" and "T大使" (Taiwan AI Ambassador) programme.',
 },
 {
 icon: Building2,
 title: 'From TSMC to Taipei — A Dual Economy of AI Opportunity',
 description:
 'Taiwan\'s economy is uniquely split between semiconductor giants (TSMC, MediaTek, Foxconn, Quanta, Wistron) that drive 40%+ of GDP through advanced manufacturing, and a vibrant startup scene in Taipei\'s Neihu Technology Park, Nankang Software Park, and Zhongshan Creative Hub. Enterprise AI in Taiwan means anything from TSMC-validated digital twin tools for fab optimisation to Foxconn\'s AI-powered smart manufacturing. Meanwhile, Taipei\'s 2,000+ startups demand AI tools for everything from fintech (LINE Bank, Richart, Pi拍錢包) to AI-driven SaaS targeting the broader Chinese-speaking market.',
 },
 {
 icon: Users,
 title: 'Mandarin + Global — Taiwan\'s AI Content & Commerce Goldmine',
 description:
 'Taiwan occupies a unique linguistic position — Traditional Chinese (繁體中文) is used by ~35M people in Taiwan, Hong Kong, and Macau, yet Taiwan\'s market is deeply connected to global markets. This creates a massive opportunity for AI tools that handle Traditional Chinese content generation, Taiwan-specific e-commerce (Shopee Taiwan, momo購物, PChome, Ruten), and bilingual CX tools. Taiwan\'s rich media ecosystem — from Taiwanese drama and indie music to a booming creator economy on YouTube Taiwan, TikTok, and Instagram Taiwan — demands AI tools adapted for Taiwan\'s specific cultural and linguistic nuances.',
 },
];

// ─── Tool Categories ──────────────────────────────────────────

const WRITING_CATEGORY = {
 id: 'writing',
 name: 'Writing & Content Creation',
 icon: BookOpen,
 description:
 'AI writing tools optimised for Taiwan\'s content ecosystem — from Traditional Chinese (繁體中文) business correspondence and formal communication to bilingual marketing materials and social media management for LINE, Facebook Taiwan, Instagram Taiwan, and YouTube Taiwan. Taiwan\'s unique position as a bridge between Chinese and global markets demands tools that handle both Traditional Chinese and English with cultural nuance.',
 tools: [
 { name: 'Jasper AI', tag: 'Best for Marketing Copy', description: 'Enterprise-grade AI writing with multilingual support. Popular with Taipei\'s top advertising agencies creating Traditional Chinese marketing content for both the Taiwan market and global brands.' },
 { name: 'Writesonic', tag: 'Best Value', description: 'Affordable AI writing with Traditional Chinese support. ~$10/mo starting — ideal for Taiwanese SMEs and freelance copywriters in Taipei and Taichung.' },
 { name: 'ChatGPT', tag: 'Most Used in Taiwan', description: 'Overwhelmingly popular across Taiwan. Strong Traditional Chinese language capabilities for business correspondence, content creation, and bilingual output. Preferred by both enterprises and individuals.' },
 { name: 'Claude', tag: 'Best for Long-Form', description: 'Gaining rapid adoption in Taiwan for long-form content creation, academic writing, and research in both Traditional Chinese and English. Popular at Taiwan\'s top universities (NTU, NTHU, NCKU) and research institutes (Academia Sinica).' },
 ],
};

const CODING_CATEGORY = {
 id: 'coding',
 name: 'Coding & Development',
 icon: Briefcase,
 description:
 'Development tools powering Taiwan\'s software and semiconductor ecosystem — from Hsinchu Science Park\'s EDA engineers to Taipei\'s fintech revolution (LINE Bank, Gogolook, Pinkoi) and the sprawling TSMC, MediaTek, and Foxconn engineering campuses.',
 tools: [
 { name: 'GitHub Copilot', tag: 'Best Overall', description: 'The standard for Taiwanese dev teams. Strong Python, TypeScript, Go, and Verilog support. Widely adopted across TSMC\'s software groups, MediaTek\'s chip teams, and Taipei\'s startup scene.' },
 { name: 'Claude', tag: 'Best for Architecture', description: 'Gaining rapid traction among Taiwanese enterprise developers for code review, system architecture design, and technical documentation in both Traditional Chinese and English. Popular at Foxconn and Quanta\'s AI teams.' },
 { name: 'Cursor', tag: 'Rising Star', description: 'AI-native IDE gaining popularity in Taiwanese coding bootcamps (Alpha Camp, AppWorks School, 台大創創) and Taiwan\'s growing developer community spanning semiconductor EDA and web/mobile development.' },
 { name: 'Perplexity', tag: 'Best for Research', description: 'Widely adopted by Taiwanese researchers, engineers, and students for technical research, semiconductor datasheet analysis, and staying current with AI/ML developments in Taiwan\'s deep-tech sector.' },
 ],
};

const MARKETING_CATEGORY = {
 id: 'marketing',
 name: 'Marketing & E-Commerce',
 icon: BarChart3,
 description:
 'Marketing AI tools for Taiwan\'s unique digital landscape — where LINE dominates messaging (95% penetration), Facebook and Instagram lead social commerce, momo購物, PChome, and Shopee Taiwan power e-commerce, and YouTube Taiwan drives the creator economy.',
 tools: [
 { name: 'AdCreative.ai', tag: 'Best for Ads', description: 'AI ad creative generator optimised for the Taiwan market. Train on your product catalog for Shopee Taiwan, momo購物, LINE Ads, Facebook Taiwan, and PChome with Traditional Chinese copy and Taiwan-specific design aesthetics.' },
 { name: 'Canva AI', tag: 'Most Accessible', description: 'Overwhelmingly popular in Taiwan. AI-powered design for social media, e-commerce product banners, and video thumbnails. Traditional Chinese templates, fonts, and seasonal design assets (Lunar New Year, Dragon Boat Festival, Mid-Autumn) included.' },
 { name: 'Gamma', tag: 'Best for Presentations', description: 'AI presentation tool gaining traction in Taiwanese enterprise and startup pitch decks. Creates bilingual decks with proper Traditional Chinese formatting — popular in Taipei consulting firms and accelerators (AppWorks, SparkLabs Taipei, 台大創創).' },
 { name: 'Notion AI', tag: 'Best for Teams', description: 'Deeply adopted by Taiwanese tech companies and startups for knowledge management. Strong Taiwanese community with Traditional Chinese templates, and popular in Taiwan\'s thriving remote-work and hybrid teams.' },
 ],
};

const DESIGN_CATEGORY = {
 id: 'design',
 name: 'Design & Creative',
 icon: Camera,
 description:
 'Design tools powering Taiwan\'s creative economy — from Taipei\'s world-class design studios (JL Design, Bito, Dosomething Studio) and advertising agencies (Leo Burnett Taiwan, Ogilvy Taiwan, Dentsu Taiwan) to the booming game development industry and indie music scene.',
 tools: [
 { name: 'Canva', tag: 'Most Popular', description: 'The #1 design tool in Taiwan. AI features (Magic Studio, text-to-image, background removal) make it indispensable for Taiwanese creators, small businesses, and enterprise marketing teams. Strong Traditional Chinese template library.' },
 { name: 'Midjourney', tag: 'Best for Art', description: 'Extremely popular among Taiwanese digital artists, game concept designers, and indie creators. Taiwan\'s vibrant art and design community has embraced Midjourney for everything from book covers to game concept art.' },
 { name: 'Adobe Firefly', tag: 'Best Quality', description: 'Generative AI integrated into Creative Cloud. Preferred by Taiwan\'s top design agencies and professional designers for commercial-grade output with Traditional Chinese typography (正體中文) support.' },
 { name: 'DALL-E 3', tag: 'Best Integration', description: 'Integrated with ChatGPT — widely used by Taiwanese content creators, marketers, and small businesses for rapid image generation with Traditional Chinese text prompts and cultural context awareness.' },
 ],
};

const SEMICONDUCTOR_CATEGORY = {
 id: 'semiconductor',
 name: 'Semiconductor & Engineering',
 icon: Cpu,
 description:
 'Specialised AI tools for Taiwan\'s world-leading semiconductor ecosystem — from TSMC\'s 3nm/5nm yield optimisation and MediaTek\'s chip design workflows to Foxconn\'s smart manufacturing and the broader supply chain spanning Hsinchu, Tainan, and Kaohsiung Science Parks.',
 tools: [
 { name: 'Synopsys.ai', tag: 'Industry Standard', description: 'The gold standard for AI-driven EDA. Synopsys\' AI-powered design tools (DSO.ai, VSO.ai, TSO.ai) are deeply integrated into TSMC\'s advanced node workflows for optimal chip floorplanning, timing closure, and power optimisation at 3nm and beyond.' },
 { name: 'Cadence Cerebrus', tag: 'Best for Layout', description: 'AI-driven chip design optimisation platform widely used at MediaTek, Realtek, and Novatek. Automated floorplan optimisation and design space exploration tailored for Taiwan\'s fabless semiconductor ecosystem.' },
 { name: 'Samsung SDS Brity AI', tag: 'Enterprise AI Platform', description: 'Comprehensive enterprise AI platform adopted by major Taiwan manufacturers including Foxconn and Quanta for supply chain optimisation, predictive maintenance, and quality control in smart factory environments.' },
 { name: 'Ansys SimAI', tag: 'Best for Simulation', description: 'AI-accelerated simulation platform used by Taiwan\'s advanced manufacturing ecosystem. Applied in TSMC\'s thermal analysis, Foxconn\'s structural simulation, and Lite-On\'s power electronics design workflows.' },
 ],
};

const ALL_CATEGORIES = [WRITING_CATEGORY, CODING_CATEGORY, MARKETING_CATEGORY, DESIGN_CATEGORY, SEMICONDUCTOR_CATEGORY];

// ─── Top 12 Tools ─────────────────────────────────────────────

const TOP_PICK_PREFIX = [
 { name: 'ChatGPT', tag: 'Best Overall AI Assistant in Taiwan', trend: 'up' as const },
 { name: 'GitHub Copilot', tag: 'Best AI Coding Assistant', trend: 'up' as const },
 { name: 'Claude', tag: 'Best for Long-Form & Enterprise', trend: 'up' as const },
 { name: 'Notion AI', tag: 'Most Used for Taiwanese Teams', trend: 'up' as const },
 { name: 'Canva', tag: 'Most Used Design Tool in Taiwan', trend: 'up' as const },
 { name: 'Midjourney', tag: 'Best AI Art for Taiwanese Creatives', trend: 'up' as const },
 { name: 'Jasper AI', tag: 'Best for Marketing Copy', trend: 'up' as const },
 { name: 'Perplexity', tag: 'Best Research Assistant', trend: 'up' as const },
 { name: 'AdCreative.ai', tag: 'Best for Taiwanese E-Commerce Ads', trend: 'up' as const },
 { name: 'Writesonic', tag: 'Best Value Writing Tool', trend: 'up' as const },
 { name: 'Synopsys.ai', tag: 'Best Semiconductor AI Platform', trend: 'up' as const },
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

export default function AiToolsTaiwanPage() {
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
 { name: 'AI Tools Taiwan', item: 'https://apifeny-ai.vercel.app/ai-tools-taiwan' },
 ]}
 />
 <GeoSeoSchema
 countryName="Taiwan"
 countryCode="tw"
 capital="Taipei"
 currency="TWD"
 language="Traditional Chinese"
 languageCode="zh-Hant"
 marketSize="$5B AI market, 24M population, semiconductor capital of the world"
 slug="ai-tools-taiwan"
 faqs={[
 { question: "What are the best AI tools in Taiwan?", answer: "The best AI tools in Taiwan include ChatGPT for productivity, GitHub Copilot for development, Canva AI for design, and Claude for long-form content. Taiwan's $5B AI market — the fastest-growing in Asia outside China — is driven by its semiconductor dominance (TSMC, MediaTek) and government's $1B+ AI Action Plan." },
 { question: "Are AI tools accessible for Taiwanese businesses?", answer: "Yes. Taiwan has world-class digital infrastructure with 90%+ smartphone penetration and extensive 5G coverage. The government's Taiwan AI Action Plan provides R&D funding and adoption incentives. Most global AI tools offer Traditional Chinese (繁體中文) support. AWS Taipei Local Zone and GCP Taiwan provide local data centre options." },
 { question: "What AI tools best suit Taiwan's semiconductor industry?", answer: "Taiwan's semiconductor industry (63% of global foundry market) demands specialised AI tools. Synopsys AI for chip design, Cadence Cerebrus for EDA, and TSMC's own AI Foundry Solutions dominate. Foxconn and Quanta use AI for smart manufacturing. Taiwan's Hsinchu Science Park is the global epicentre of AI hardware innovation." },
 { question: "What AI regulations apply in Taiwan?", answer: "Taiwan's Personal Data Protection Act (PDPA) governs all data processing. The Ministry of Digital Affairs (moda) issues AI governance guidelines. Cross-border data transfers have specific requirements. Financial sector AI must comply with the Financial Supervisory Commission (FSC) regulations." },
 { question: "Is Traditional Chinese well supported by AI tools?", answer: "Yes. ChatGPT handles Traditional Chinese well. Claude offers excellent Traditional Chinese capabilities. Local providers like ASUS AI and Taiwan AI Labs develop Taiwan-specific solutions. Academia Sinica's CKIP Lab provides Traditional Chinese NLP services. The gap with English is small and narrowing quickly." },
 ]}
 />

 <main className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white ">
 {/* ── Hero ─────────────────────────────────────── */}
 <section className="relative overflow-hidden border-b border-blue-100/50 ">
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,61,107,0.06),transparent_50%)] ,rgba(0,61,107,0.08),transparent_50%)] pointer-events-none" />
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(254,0,0,0.04),transparent_50%)] ,rgba(254,0,0,0.06),transparent_50%)] pointer-events-none" />
 <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 relative">
 <div className="mx-auto max-w-3xl text-center">
 <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-[#003D6B] ">
 <MapPin className="h-4 w-4" />
 🇹🇼 Curated for Taiwan
 </div>
 <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
 Best AI Tools in{' '}
 <span className="bg-gradient-to-r from-[#003D6B] via-[#FE0000] to-[#003D6B] bg-clip-text text-transparent">
 Taiwan
 </span>{' '}
 (2026)
 </h1>
 <p className="mt-6 text-lg leading-relaxed text-gray-600 ">
 100+ AI tools ranked for Taiwan's $5B+ AI market — with <strong>TWD/USD pricing</strong>,{' '}
 <strong>繁體中文 (Traditional Chinese) language support</strong>, and ratings for Taiwan's{' '}
 <strong>world-leading semiconductor ecosystem, 90%+ smartphone penetration, and startup corridor</strong>.
 Updated daily.
 </p>
 <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
 <a
 href="#top-picks"
 className="inline-flex items-center gap-2 rounded-xl bg-[#003D6B] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200/50 transition-all hover:bg-[#002A4D] hover:shadow-blue-300/50 "
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
 className="rounded-xl border border-blue-100/60 bg-white/80 p-5 shadow-sm transition-all hover:shadow-md "
 >
 <s.icon className="mb-3 h-6 w-6 text-[#003D6B]" />
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

 {/* ── Taiwan Market Snapshot ──────────────────── */}
 <section className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
 <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
 🇹🇼 Taiwan AI Market Snapshot
 </h2>
 <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500 ">
 Key metrics driving AI adoption in Taiwan — the world's semiconductor powerhouse with
 Asia's fastest-growing AI market and a unique hardware-software innovation dynamic.
 </p>
 <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
 {TAIWAN_AI_SNAPSHOT.map((stat) => (
 <div
 key={stat.label}
 className="rounded-xl border border-blue-100/60 bg-white p-6 text-center shadow-sm "
 >
 <p className="text-3xl font-bold text-[#003D6B] ">{stat.value}</p>
 <p className="mt-1 text-sm font-medium text-gray-700 ">{stat.label}</p>
 <p className="mt-0.5 text-xs text-gray-400">{stat.sub}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ── Why Taiwan ──────────────────────────────── */}
 <section className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
 <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
 Why Taiwan Needs Its Own AI Rankings
 </h2>
 <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500 ">
 Global AI tool rankings miss what makes Taiwan unique — from PDPA compliance and Traditional Chinese language support
 to semiconductor ecosystem integration, TSMC supply chain tools, and the Taipei startup scene. Here's why a dedicated Taiwan ranking matters.
 </p>
 <div className="mt-10 grid gap-6 md:grid-cols-3">
 {WHY_TAIWAN.map((item) => (
 <div
 key={item.title}
 className="group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-[#003D6B]/30 hover:shadow-md #003D6B]/40"
 >
 <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#003D6B]/10 text-[#003D6B] ">
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
 🏆 Top 12 AI Tools in Taiwan
 </h2>
 <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500 ">
 Our daily-updated ranking of the most popular and effective AI tools for the
 Taiwanese market, curated based on local usage patterns, Traditional Chinese support,
 semiconductor enterprise readiness, and affordability.
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
 Explore AI tools organised by category, each curated for the Taiwanese market
 with local context and ecosystem fit.
 </p>
 </div>
 <div className="space-y-12">
 {ALL_CATEGORIES.map((cat) => (
 <div key={cat.id} id={cat.id}>
 <div className="mb-6 flex items-center gap-3">
 <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#003D6B]/10 text-[#003D6B] ">
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
 className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#003D6B]/20 hover:shadow-md "
 >
 <span className="inline-block rounded-full bg-[#003D6B]/10 px-2.5 py-0.5 text-xs font-medium text-[#003D6B] ">
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
 <section className="bg-gradient-to-r from-[#003D6B] via-[#FE0000] to-[#003D6B]">
 <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
 <h2 className="text-2xl font-bold text-white sm:text-3xl">
 在台灣尋找最佳 AI 工具？
 </h2>
 <p className="mx-auto mt-4 max-w-2xl text-sm text-white/80">
 Browse our full directory of 600+ AI tools, filter by category, compare pricing in TWD/USD,
 and read honest reviews from Taiwanese users and enterprise buyers. Your next productivity breakthrough
 is one click away.
 </p>
 <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
 <Link
 href="/"
 className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#003D6B] shadow-lg transition-all hover:bg-blue-50"
 >
 Browse Full Directory
 <ArrowRight className="h-4 w-4" />
 </Link>
 <Link
 href="/blog"
 className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
 >
 <BookOpen className="h-4 w-4" />
 閱讀 AI 指南 — Read AI Guides
 </Link>
 </div>
 </div>
 </section>

 {/* ── Blog & Playbooks ───────────────────────── */}
 <section className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
 <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-gray-900 ">
 📖 Learn More About AI in Taiwan
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
 <LandingPageCrossLinks currentSlug="ai-tools-taiwan" />
 </div>
 </section>

 {/* ── Footer ──────────────────────────────────── */}
 <footer className="border-t border-gray-100 bg-white ">
 <div className="mx-auto max-w-7xl px-4 py-8 text-center text-xs text-gray-400 sm:px-6 lg:px-8">
 <p>Apifeny AI — Independent AI Tool Rankings for Taiwan. Not affiliated with any listed tool.</p>
 <p className="mt-1">Prices shown in TWD/USD are approximate and may vary. Always verify pricing on the tool's official website.</p>
 </div>
 </footer>
 </main>
 </>
 );
}
