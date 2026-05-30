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
 Mountain,
 Trees,
 Tent,
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
 title: 'Best AI Tools in Nepal (2026) — 100+ Tools for Kathmandu Dev Scene & Trekking AI',
 description:
 "Discover the best AI tools for Nepal's growing digital economy. 100+ ranked tools with NPR/USD pricing, Nepali (नेपाली) language support, and ratings for Nepal's tourism AI, Kathmandu developer ecosystem, and hydropower sector technology adoption.",
 ogTitle: 'Best AI Tools in Nepal (2026) — Apifeny AI',
 ogDescription:
 "100+ AI tools ranked for the Nepali market. 🇳🇵 Nepali (नेपाली) support, NPR/USD pricing, curated for Kathmandu's tech scene and the trekking and tourism industries.",
 ogImage: '/og/ai-tools-nepal.png',
};

const TRUST_SECTIONS = [
 {
 icon: Globe,
 title: '🇳🇵 नेपाली & English Support',
 description:
 'Nepali (नेपाली)-first tools optimised for Nepal\'s 30M+ population. Platforms ranked by their नेपाली language support, Unicode rendering quality (Devanagari script), and localisation depth alongside English tools popular in Kathmandu\'s emerging tech hubs in Lalitpur, Bhaktapur, and Pokhara.',
 },
 {
 icon: DollarSign,
 title: 'Rs NPR / USD Pricing',
 description:
 'All tool prices shown in both Nepali Rupees (Rs) and USD. Nepal\'s growing digital payments ecosystem — eSewa, Khalti, ConnectIPS, and mobile banking — means tools with local payment integration are prioritised for SME and consumer adoption.',
 },
 {
 icon: ShieldCheck,
 title: '🔒 Data Protection Reviewed',
 description:
 'Every tool evaluated against Nepal\'s IT and Data Protection frameworks including the 2075 IT Bill and National Cyber Security Policy. We flag compliance risks, highlight tools with regional data centres, and note alignment with the Government of Nepal\'s Digital Nepal Framework.',
 },
 {
 icon: Mountain,
 title: '🏔️ Trekking & Tourism Industry Ready',
 description:
 'Curated for Nepal\'s majestic dual identity — from AI-powered trekking and mountaineering safety tools for the Everest, Annapurna, and Langtang regions to Kathmandu\'s growing software development ecosystem and the technology needs of Nepal\'s vital hydropower, tourism, and remittance-driven economy.',
 },
];

const NP_AI_SNAPSHOT = [
 { label: 'Digital Economy (2026)', value: '$2B+', sub: 'Growing digital services sector; 30M+ population with rising connectivity' },
 { label: 'Tourist Arrivals', value: '1.2M+', sub: 'Pre-pandemic peak ~1.2M — Everest, Annapurna, and cultural tourism driving AI demand' },
 { label: 'Remittance Economy', value: '$10B+', sub: '25%+ of GDP — fintech AI for cross-border payments, forex, and financial inclusion' },
 { label: 'Mobile Internet Users', value: '22M+', sub: 'Mobile-first with 65%+ smartphone penetration — Ncell & NTC driving connectivity' },
];

const WHY_NP = [
 {
 icon: Mountain,
 title: 'Nepal\'s Trekking & Mountaineering AI Frontier',
 description:
 'Nepal is home to 8 of the world\'s 14 highest peaks including Mount Everest, drawing 1.2M+ visitors annually for trekking, mountaineering, and cultural tourism. AI is transforming the sector in unique ways — from AI-powered avalanche prediction and weather modelling for the Himalayan trails to personalised trekking itinerary generators and multi-language guide apps handling Nepali, Hindi, English, Mandarin, and French. The Annapurna and Everest regions alone see 100K+ trekkers annually, creating demand for AI in safety monitoring, smart logistics (porter scheduling, gear tracking), and eco-tourism management. Nepal\'s unique high-altitude tourism creates AI use cases found nowhere else.',
 },
 {
 icon: Briefcase,
 title: 'Kathmandu\'s Developer Ecosystem — Emerging Tech Hub',
 description:
 'Nepal\'s rapidly growing software industry produces 10,000+ IT graduates annually (Tribhuvan University, Kathmandu University, Pokhara University, Pulchowk Campus) and supports 500+ registered IT companies. Kathmandu\'s tech corridor — from Kupondole and Lalitpur to Bhaktapur — hosts a thriving freelance developer community, IT outsourcing firms (DeerWalk, CloudFactory, F1Soft), and a growing startup ecosystem backed by accelerators like Bikas Udhyami and Nepal Angels. The developer community\'s strong focus on React, Python/Django, PHP/Laravel, and mobile app development creates strong demand for AI coding assistants and dev tools.',
 },
 {
 icon: Database,
 title: 'Digital Nepal — Remittance, Hydropower & Agriculture AI',
 description:
 'Nepal\'s $10B+ remittance economy (25%+ of GDP) drives demand for AI in fintech — from intelligent forex analytics and fraud detection to AI-powered financial inclusion tools for Nepal\'s large unbanked population. The hydropower sector (Nepal\'s biggest export opportunity with 2,000+ MW installed, 40,000 MW potential) increasingly uses AI for dam monitoring, water flow prediction, and grid management in challenging Himalayan terrain. Agriculture AI is emerging for Nepal\'s tea (Ilam), coffee, cardamom, and paddy sectors — with drone-based crop health monitoring and Nepali-language agri-advisory platforms gaining adoption.',
 },
];

// ─── Tool Categories ──────────────────────────────────────────

const WRITING_CATEGORY = {
 id: 'writing',
 name: 'Writing & Content Creation',
 icon: BookOpen,
 description:
 'AI writing tools optimised for Nepal\'s bilingual content ecosystem — from Nepali (नेपाली) marketing content and business communication to English content for the tourism industry and bilingual social media management for Facebook Nepal, Instagram, and YouTube.',
 tools: [
 { name: 'Jasper AI', tag: 'Best for Marketing Copy', description: 'Enterprise-grade AI writing with multilingual support. Growing adoption in Kathmandu\'s tour agencies, trekking companies, and marketing firms creating Nepali and English campaigns for Nepal Tourism Board and boutique hotels in Pokhara and Chitwan.' },
 { name: 'Writesonic', tag: 'Best Value', description: 'Affordable AI writing with emerging Nepali support. ~Rs 1,500/mo starting — ideal for Nepali SMEs, travel content creators, and freelance writers in Kathmandu and Pokhara.' },
 { name: 'ChatGPT', tag: 'Most Used in Nepal', description: 'Overwhelmingly popular across Nepal\'s tech workforce and tourism sector. Handles Nepali (नेपाली) prompts with good accuracy. Widely used for trekking itineraries, email drafting, and bilingual business communication.' },
 { name: 'Claude', tag: 'Best for Long-Form', description: 'Gaining traction in Nepal for long-form travel content, academic writing, and research in Nepali and English. Popular at Tribhuvan University, Kathmandu University, and the research community in Lalitpur.' },
 ],
};

const CODING_CATEGORY = {
 id: 'coding',
 name: 'Coding & Development',
 icon: Briefcase,
 description:
 'Development tools powering Nepal\'s growing software ecosystem — from Kathmandu\'s IT outsourcing firms and freelance developer community in Kupondole and Lalitpur to Pokhara\'s emerging tech scene and the growing startup culture.',
 tools: [
 { name: 'GitHub Copilot', tag: 'Best Overall', description: 'The standard for Nepali dev teams. Strong Python, JavaScript, PHP, and React support. Widely adopted across Kathmandu\'s IT companies (DeerWalk, CloudFactory, F1Soft) and the growing freelance developer community.' },
 { name: 'Claude', tag: 'Best for Architecture', description: 'Gaining traction among Nepali developers for code review, architecture planning, and technical documentation in both English and Nepali. Popular in Kathmandu\'s product engineering teams and startup studios.' },
 { name: 'Cursor', tag: 'Rising Star', description: 'AI-native IDE gaining popularity in Nepali coding bootcamps and university programmes (Pulchowk Engineering Campus, KU) and Kathmandu\'s growing developer community.' },
 { name: 'Perplexity', tag: 'Best for Research', description: 'Widely adopted by Nepali engineers and students for technical research, competitive programming, and staying current with AI/ML trends. Popular at Pulchowk, KU, and Pokhara University.' },
 ],
};

const MARKETING_CATEGORY = {
 id: 'marketing',
 name: 'Marketing & E-Commerce',
 icon: BarChart3,
 description:
 'Marketing AI tools for Nepal\'s unique digital landscape — where Facebook dominates (12M+ users), Daraz and Sastodeal power e-commerce, eSewa and Khalti drive payments, and YouTube Nepal drives a growing creator economy supported by tourism and diaspora audiences.',
 tools: [
 { name: 'AdCreative.ai', tag: 'Best for Ads', description: 'AI ad creative generator for the Nepali market. Train on your product catalog for Daraz.shop, Sastodeal, and Facebook Ads Nepal with Nepali and English ad copy tailored for trekking, tourism, and consumer brands.' },
 { name: 'Canva AI', tag: 'Most Accessible', description: 'Overwhelmingly popular in Nepal. AI-powered design for social media, travel brochures, and e-commerce banners. Devanagari (Nepali) font support and seasonal assets (Dashain, Tihar, Holi, Buddha Jayanti) included.' },
 { name: 'Gamma', tag: 'Best for Presentations', description: 'AI presentation tool gaining traction in Kathmandu\'s enterprise, NGO, and development sector. Popular for pitch decks targeting Nepal Angels, Bikas Udhyami, and international development partners.' },
 { name: 'Notion AI', tag: 'Best for Teams', description: 'Adopted by Nepali tech companies, development organisations, and remote teams for knowledge management. Growing community of Nepali Notion creators with localised templates for project management and travel operations.' },
 ],
};

const DESIGN_CATEGORY = {
 id: 'design',
 name: 'Design & Creative',
 icon: Camera,
 description:
 'Design tools powering Nepal\'s creative economy — from Kathmandu\'s advertising agencies and the booming travel visual content market to traditional Thangka painting AI, Himalayan landscape photography, and the growing indie game development scene.',
 tools: [
 { name: 'Canva', tag: 'Most Popular', description: 'The #1 design tool in Nepal. AI features (Magic Studio, text-to-image) make it indispensable for tourism marketers, trekking companies, and small businesses creating content in Nepali and English.' },
 { name: 'Midjourney', tag: 'Best for Art', description: 'Growing in popularity among Nepali digital artists, travel content creators generating Himalayan landscape art, and designers inspired by Nepal\'s rich Buddhist and Hindu iconography.' },
 { name: 'Adobe Firefly', tag: 'Best Quality', description: 'Generative AI integrated into Creative Cloud. Preferred by Kathmandu\'s top ad agencies and professional designers for commercial-grade output with Devanagari (Nepali) typography support.' },
 { name: 'DALL-E 3', tag: 'Best Integration', description: 'Integrated with ChatGPT — widely used by Nepali content creators, tourism marketers, and small businesses for rapid image generation with Nepali text prompts and cultural context awareness.' },
 ],
};

const TOURISM_CATEGORY = {
 id: 'tourism',
 name: 'Trekking & Tourism AI',
 icon: Mountain,
 description:
 'Specialised AI tools for Nepal\'s world-famous tourism and adventure sector — from AI-powered Everest and Annapurna trekking itinerary planners and real-time weather/avalanche prediction to smart hotel management in Kathmandu, Pokhara, and Chitwan, and multi-language tour guide apps serving trekkers from India, China, Europe, and the US.',
 tools: [
 { name: 'Komoot AI', tag: 'Best for Route Planning', description: 'AI-powered route planning platform widely used by trekkers in Nepal. Provides detailed elevation profiles, trail conditions, and estimated times for the Annapurna Circuit, Everest Base Camp, and Langtang Valley treks.' },
 { name: 'Tomorrow.io AI', tag: 'Mountain Weather AI', description: 'AI-powered hyperlocal weather prediction used by trekking agencies and mountaineering expeditions in Nepal. Critical for safety planning on Everest, Ama Dablam, and other Himalayan peaks with real-time avalanche risk assessment.' },
 { name: 'LodgeManager AI', tag: 'Tea House & Hotel AI', description: 'AI-driven property management system adopted by tea houses and boutique lodges along Nepal\'s major trekking routes. Handles booking, inventory, and multi-language guest communication for the Annapurna and Everest regions.' },
 { name: 'Tripoto AI', tag: 'Travel Content & Marketing', description: 'AI travel content platform helping Nepali tour operators and trekking agencies create engaging multi-language content for international travellers. Optimises blog posts, social media, and video content for Nepal\'s key source markets.' },
 ],
};

const ALL_CATEGORIES = [WRITING_CATEGORY, CODING_CATEGORY, MARKETING_CATEGORY, DESIGN_CATEGORY, TOURISM_CATEGORY];

// ─── Top 12 Tools ─────────────────────────────────────────────

const TOP_PICK_PREFIX = [
 { name: 'ChatGPT', tag: 'Best Overall AI Assistant in Nepal', trend: 'up' as const },
 { name: 'GitHub Copilot', tag: 'Best AI Coding Assistant', trend: 'up' as const },
 { name: 'Claude', tag: 'Best for Long-Form & Research', trend: 'up' as const },
 { name: 'Notion AI', tag: 'Most Used for Nepali Teams', trend: 'up' as const },
 { name: 'Canva', tag: 'Most Used Design Tool in Nepal', trend: 'up' as const },
 { name: 'Midjourney', tag: 'Best AI Art for Nepali Creatives', trend: 'up' as const },
 { name: 'Jasper AI', tag: 'Best for Marketing Copy', trend: 'up' as const },
 { name: 'Perplexity', tag: 'Best Research Assistant', trend: 'up' as const },
 { name: 'AdCreative.ai', tag: 'Best for Tourism & E-Commerce Ads', trend: 'up' as const },
 { name: 'Writesonic', tag: 'Best Value Writing Tool', trend: 'up' as const },
 { name: 'Tomorrow.io AI', tag: 'Best Mountain Weather AI', trend: 'up' as const },
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

export default function AiToolsNepalPage() {
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
 { name: 'AI Tools Nepal', item: 'https://apifeny-ai.vercel.app/ai-tools-nepal' },
 ]}
 />
 <GeoSeoSchema
 countryName="Nepal"
 countryCode="np"
 capital="Kathmandu"
 currency="NPR"
 language="Nepali"
 languageCode="ne"
 marketSize="Emerging digital economy, growing Kathmandu developer ecosystem, tourism-tech AI adoption"
 slug="ai-tools-nepal"
 faqs={[
 { question: 'What are the best AI tools in Nepal?', answer: 'ChatGPT is widely used by Nepal\'s growing developer community for coding and productivity. GitHub Copilot and Cursor are popular among Kathmandu\'s tech workforce. Canva AI dominates for design, and Perplexity for research. Tourism-focused AI tools for Nepal\'s travel sector are also gaining traction.' },
 { question: 'Do AI tools support Nepali (नेपाली)?', answer: 'ChatGPT handles Nepali prompts reasonably well for most use cases. Canva supports Nepali Unicode fonts. However, dedicated Nepali NLP tools remain scarce, creating opportunities for locally developed AI solutions targeting Nepal\'s 30M+ population.' },
 { question: 'How can Nepali businesses adopt AI affordably?', answer: 'Start with free tiers: ChatGPT Free for productivity, Canva Free for design, GitHub Copilot Free for students and open-source. Most cloud-based AI tools require no local infrastructure. The growing coworking scene in Kathmandu (Kathmandu University, IT Park) provides community support for AI adoption.' },
 { question: 'What is the state of AI in Nepal?', answer: 'Nepal\'s AI ecosystem is emerging, driven by the developer community around Kathmandu University, Pulchowk Engineering Campus, and the IT Park initiative. AI is being applied in tourism (chatbots, itinerary planning), agriculture (crop monitoring), and disaster management (earthquake prediction). The government\'s Digital Nepal Framework supports AI adoption.' },
 { question: 'Are there locally-developed AI tools in Nepal?', answer: 'Yes, a small but growing number of Nepali startups and university projects are building AI tools. These include Nepali NLP models, tourism AI assistants, and agri-tech solutions. However, most businesses still rely on global AI platforms adapted for the local context.' },
 ]}
 />

 <main className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white ">
 {/* ── Hero ─────────────────────────────────────── */}
 <section className="relative overflow-hidden border-b border-blue-100/50 ">
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,74,173,0.06),transparent_50%)] ,rgba(0,74,173,0.08),transparent_50%)] pointer-events-none" />
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,0,0,0.04),transparent_50%)] ,rgba(255,0,0,0.06),transparent_50%)] pointer-events-none" />
 <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 relative">
 <div className="mx-auto max-w-3xl text-center">
 <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-[#003DA5] ">
 <MapPin className="h-4 w-4" />
 🇳🇵 Curated for Nepal
 </div>
 <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
 Best AI Tools in{' '}
 <span className="bg-gradient-to-r from-[#003DA5] via-[#DC143C] to-[#003DA5] bg-clip-text text-transparent">
 Nepal
 </span>{' '}
 (2026)
 </h1>
 <p className="mt-6 text-lg leading-relaxed text-gray-600 ">
 100+ AI tools ranked for Nepal's <strong>$2B+ digital economy</strong> — with{' '}
 <strong>Rs NPR / USD pricing</strong>,{' '}
 <strong>नेपाली (Nepali) language support</strong>, and ratings for Nepal's{' '}
 <strong>world-famous trekking & tourism industry, Kathmandu's emerging developer ecosystem, and the hydropower and remittance-driven economy</strong>.
 Updated daily.
 </p>
 <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
 <a
 href="#top-picks"
 className="inline-flex items-center gap-2 rounded-xl bg-[#003DA5] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200/50 transition-all hover:bg-[#002D7A] hover:shadow-blue-300/50 "
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
 <s.icon className="mb-3 h-6 w-6 text-[#003DA5]" />
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

 {/* ── Nepal Market Snapshot ───────────────────── */}
 <section className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
 <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
 🇳🇵 Nepal AI Market Snapshot
 </h2>
 <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500 ">
 Key metrics driving AI adoption in Nepal — the land of the Himalayas with a
 rapidly digitalising economy powered by tourism, remittances, and a growing tech talent pool.
 </p>
 <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
 {NP_AI_SNAPSHOT.map((stat) => (
 <div
 key={stat.label}
 className="rounded-xl border border-blue-100/60 bg-white p-6 text-center shadow-sm "
 >
 <p className="text-3xl font-bold text-[#003DA5] ">{stat.value}</p>
 <p className="mt-1 text-sm font-medium text-gray-700 ">{stat.label}</p>
 <p className="mt-0.5 text-xs text-gray-400">{stat.sub}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ── Why Nepal ──────────────────────────────── */}
 <section className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
 <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
 Why Nepal Needs Its Own AI Rankings
 </h2>
 <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500 ">
 Global AI tool rankings miss what makes Nepal unique — from AI-powered Himalayan trekking safety and the
 underserved Nepali (नेपाली) language AI market to Nepal's unique remittance-driven fintech landscape and
 the growing Kathmandu developer community. Here's why a dedicated Nepal ranking matters.
 </p>
 <div className="mt-10 grid gap-6 md:grid-cols-3">
 {WHY_NP.map((item) => (
 <div
 key={item.title}
 className="group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-[#003DA5]/30 hover:shadow-md #003DA5]/40"
 >
 <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#003DA5]/10 text-[#003DA5] ">
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
 🏆 Top 12 AI Tools in Nepal
 </h2>
 <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500 ">
 Our daily-updated ranking of the most popular and effective AI tools for the
 Nepali market, curated based on local usage patterns, Nepali language support,
 tourism and trekking ecosystem fit, and value pricing.
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
 Explore AI tools organised by category, each curated for the Nepali market
 with local context and ecosystem fit.
 </p>
 </div>
 <div className="space-y-12">
 {ALL_CATEGORIES.map((cat) => (
 <div key={cat.id} id={cat.id}>
 <div className="mb-6 flex items-center gap-3">
 <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#003DA5]/10 text-[#003DA5] ">
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
 className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#003DA5]/20 hover:shadow-md "
 >
 <span className="inline-block rounded-full bg-[#003DA5]/10 px-2.5 py-0.5 text-xs font-medium text-[#003DA5] ">
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
 <section className="bg-gradient-to-r from-[#003DA5] via-[#DC143C] to-[#003DA5]">
 <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
 <h2 className="text-2xl font-bold text-white sm:text-3xl">
 नेपालको लागि उत्तम AI उपकरण खोज्दै हुनुहुन्छ?
 </h2>
 <p className="mx-auto mt-4 max-w-2xl text-sm text-white/80">
 Browse our full directory of 600+ AI tools, filter by category, compare pricing in Rs NPR/USD,
 and read honest reviews from Nepali users and enterprise buyers. Your next productivity breakthrough
 is one click away — whether you're in Kathmandu, Pokhara, Chitwan, or Lalitpur.
 </p>
 <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
 <Link
 href="/"
 className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#003DA5] shadow-lg transition-all hover:bg-blue-50"
 >
 Browse Full Directory
 <ArrowRight className="h-4 w-4" />
 </Link>
 <Link
 href="/blog"
 className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
 >
 <BookOpen className="h-4 w-4" />
 ब्लग पढ्नुहोस् — Read AI Guides
 </Link>
 </div>
 </div>
 </section>

 {/* ── Blog & Playbooks ───────────────────────── */}
 <section className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
 <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-gray-900 ">
 📖 Learn More About AI in Nepal
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
 <LandingPageCrossLinks currentSlug="ai-tools-nepal" />
 </div>
 </section>

 {/* ── Footer ──────────────────────────────────── */}
 <footer className="border-t border-gray-100 bg-white ">
 <div className="mx-auto max-w-7xl px-4 py-8 text-center text-xs text-gray-400 sm:px-6 lg:px-8">
 <p>Apifeny AI — Independent AI Tool Rankings for Nepal. Not affiliated with any listed tool.</p>
 <p className="mt-1">Prices shown in Rs NPR / USD are approximate and may vary. Always verify pricing on the tool's official website.</p>
 </div>
 </footer>
 </main>
 </>
 );
}
