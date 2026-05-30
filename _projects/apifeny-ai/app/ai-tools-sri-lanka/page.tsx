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
 Palmtree,
 Ship,
 TreePine,
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
 title: 'Best AI Tools in Sri Lanka (2026) — 100+ Tools for Colombo Tech Scene & Tourism AI',
 description:
 "Discover the best AI tools for Sri Lanka's $5B digital economy. 100+ ranked tools with LKR/USD pricing, Sinhala (සිංහල) & Tamil (தமிழ்) language support, and ratings for Sri Lanka's tourism revival, Colombo startup ecosystem, and tea industry AI adoption.",
 ogTitle: 'Best AI Tools in Sri Lanka (2026) — Apifeny AI',
 ogDescription:
 "100+ AI tools ranked for the Sri Lankan market. 🇱🇰 Sinhala (සිංහල) & Tamil (தமிழ்) support, LKR/USD pricing, curated for Colombo's tech scene and the tourism and tea industries.",
 ogImage: '/og/ai-tools-sri-lanka.png',
};

const TRUST_SECTIONS = [
 {
 icon: Globe,
 title: '🇱🇰 සිංහල / தமிழ் & English',
 description:
 'Sinhala- and Tamil-first tools optimised for Sri Lanka\'s 22M+ population. Platforms ranked by their සිංහල and தமிழ் language support, Unicode rendering, and localisation quality alongside English tools popular in Colombo\'s software export corridor.',
 },
 {
 icon: DollarSign,
 title: 'Rs LKR / USD Pricing',
 description:
 'All tool prices shown in both Sri Lankan Rupees (Rs) and USD. Sri Lanka\'s growing fintech ecosystem — with LankaPay, Genie, FriMi, and local credit card processing — means tools with local payment integration are prioritised for SMEs and enterprises.',
 },
 {
 icon: ShieldCheck,
 title: '🔒 Data Protection Reviewed',
 description:
 'Every tool evaluated against Sri Lanka\'s Personal Data Protection Act No. 9 of 2022. We flag compliance risks, highlight tools with regional data centres (AWS Singapore, AWS Mumbai, LK Domain Registry), and note alignment with ICT Agency of Sri Lanka (ICTA) digital governance.',
 },
 {
 icon: TreePine,
 title: '🌴 Tourism & Tea Industry Ready',
 description:
 'Curated for Sri Lanka\'s dual signature economy — from AI-powered tourism marketing for the post-pandemic travel revival (2M+ tourists in 2025) and smart hotel management in Colombo, Galle, and Kandy, to AI-driven tea quality grading, yield prediction, and supply chain optimisation for Sri Lanka\'s world-famous Ceylon Tea industry.',
 },
];

const LK_AI_SNAPSHOT = [
 { label: 'Digital Economy (2026)', value: '$5B+', sub: 'Growing digital economy; 22M+ population with rising mobile penetration' },
 { label: 'Tourism Recovery', value: '2M+ Visitors', sub: 'Post-pandemic tourism revival driving AI demand in hospitality & marketing' },
 { label: 'IT Exports', value: '$1.2B+', sub: 'Sri Lanka\'s software export industry — 80,000+ IT professionals' },
 { label: 'Mobile Users', value: '28M+', sub: 'High mobile penetration with smartphone-first internet access' },
];

const WHY_LK = [
 {
 icon: Palmtree,
 title: 'Sri Lanka\'s Tourism AI Renaissance — The Pearl of the Indian Ocean',
 description:
 'Sri Lanka\'s tourism industry is experiencing a powerful post-pandemic revival, welcoming 2M+ visitors annually to its golden beaches (Bentota, Mirissa, Arugam Bay), ancient cities (Anuradhapura, Polonnaruwa, Sigiriya), hill country (Kandy, Nuwara Eliya, Ella), and wildlife parks (Yala, Udawalawe, Wilpattu). AI is transforming the sector — from personalised travel recommendation engines and dynamic pricing for boutique hotels in Galle Fort to AI-powered multi-language tour guide apps handling Sinhala, Tamil, English, Russian, and Chinese. Sri Lankan tourism boards, boutique hotel chains, and tour operators are increasingly adopting AI for yield management, guest personalisation, and social media marketing targeting European, Indian, and Chinese travellers.',
 },
 {
 icon: Briefcase,
 title: 'Colombo\'s Software Export Engine — The IT-BPM Hub',
 description:
 'Sri Lanka\'s $1.2B+ IT/BPM export industry employs 80,000+ professionals across Colombo\'s tech corridor stretching from Colombo 1 to Kotte. Major players (Virtusa, IFS, Pearson, Sysco LABS, WSO2, Zone24x7) and 400+ startups create strong demand for AI development tools. The country produces 10,000+ IT graduates annually, and the government\'s "Digital Sri Lanka 2030" vision targets $5B in IT exports. This creates a unique market for AI coding assistants, project management tools, and enterprise AI platforms adapted for Sri Lanka\'s specific outsourcing and product engineering landscape.',
 },
 {
 icon: Database,
 title: 'Ceylon Tea & Agriculture AI — From Plantation to Cup',
 description:
 'Sri Lanka is the world\'s 4th largest tea producer and exporter (Ceylon Tea — 300M+ kg annually), alongside significant rubber, coconut, and spice exports. AI is transforming the plantation sector — from drone-based leaf health monitoring and AI-driven plucking optimisation to blockchain-backed tea traceability and quality grading. Sri Lanka\'s unique smallholder tea sector (70% of production) creates demand for affordable, mobile-first AI tools accessible in Sinhala and Tamil. The intersection of traditional agriculture and frontier AI represents one of the most overlooked opportunities in South Asia.',
 },
];

// ─── Tool Categories ──────────────────────────────────────────

const WRITING_CATEGORY = {
 id: 'writing',
 name: 'Writing & Content Creation',
 icon: BookOpen,
 description:
 'AI writing tools optimised for Sri Lanka\'s multilingual content ecosystem — from Sinhala (සිංහල) and Tamil (தமிழ்) content marketing to English business writing and bilingual social media management for Facebook Sri Lanka, Instagram, and YouTube.',
 tools: [
 { name: 'Jasper AI', tag: 'Best for Marketing Copy', description: 'Enterprise-grade AI writing with multilingual support. Growing adoption in Colombo\'s ad agencies and tourism marketing teams creating Sinhala, Tamil, and English campaigns for Sri Lanka Tourism, boutique hotels, and tea exporters.' },
 { name: 'Writesonic', tag: 'Best Value', description: 'Affordable AI writing with emerging Sinhala support. ~Rs 3,500/mo starting — ideal for Sri Lankan SMEs, D2C tea brands, and freelance content creators in Colombo and Galle.' },
 { name: 'ChatGPT', tag: 'Most Used in Sri Lanka', description: 'Overwhelmingly popular across Sri Lanka\'s tech workforce and tourism sector. Handles Sinhala and Tamil prompts. Widely used for email drafting, tourism content, and bilingual business communication.' },
 { name: 'Claude', tag: 'Best for Long-Form', description: 'Gaining traction in Sri Lanka for long-form content, academic writing, and research in Sinhala, Tamil, and English. Popular at University of Colombo, University of Peradeniya, and Moratuwa University.' },
 ],
};

const CODING_CATEGORY = {
 id: 'coding',
 name: 'Coding & Development',
 icon: Briefcase,
 description:
 'Development tools powering Sri Lanka\'s $1.2B+ IT export ecosystem — from Colombo\'s Global Capability Centres (Virtusa, Pearson, Sysco LABS) and product engineering firms (WSO2, Zone24x7) to the growing startup scene in Kotte and Battaramulla.',
 tools: [
 { name: 'GitHub Copilot', tag: 'Best Overall', description: 'The standard for Sri Lankan dev teams. Strong Python, JavaScript, Java, and Go support. Widely adopted across Colombo\'s IT export industry — Virtusa, IFS, Sysco LABS, and WSO2 engineering teams.' },
 { name: 'Claude', tag: 'Best for Architecture', description: 'Gaining rapid traction among Sri Lankan enterprise developers for code review, system architecture, and technical documentation in both English and Sinhala. Popular at IFS R&D and Pearson engineering centres.' },
 { name: 'Cursor', tag: 'Rising Star', description: 'AI-native IDE gaining popularity in Sri Lankan coding bootcamps and university programmes (University of Moratuwa CSE, UCSC) and Colombo\'s growing developer community.' },
 { name: 'Perplexity', tag: 'Best for Research', description: 'Widely adopted by Sri Lankan engineers for technical research, API documentation lookup, and competitive analysis. Popular among University of Moratuwa and IIT Sri Lanka students and early-stage startup teams.' },
 ],
};

const MARKETING_CATEGORY = {
 id: 'marketing',
 name: 'Marketing & E-Commerce',
 icon: BarChart3,
 description:
 'Marketing AI tools for Sri Lanka\'s unique digital landscape — where Facebook and Instagram lead social commerce, Daraz.lk powers e-commerce, and YouTube Sri Lanka drives the creator economy alongside the booming tourism marketing sector.',
 tools: [
 { name: 'AdCreative.ai', tag: 'Best for Ads', description: 'AI ad creative generator for the Sri Lankan market. Train on your product catalog for Daraz.lk, Facebook Ads Sri Lanka, and Google Ads with Sinhala, Tamil, and English ad copy for tourism, tea, and consumer brands.' },
 { name: 'Canva AI', tag: 'Most Accessible', description: 'Overwhelmingly popular in Sri Lanka. AI-powered design for social media, e-commerce banners, and travel content. Sinhala Unicode and Tamil font support with seasonal assets (Sinhala & Tamil New Year, Vesak, Christmas) included.' },
 { name: 'Gamma', tag: 'Best for Presentations', description: 'AI presentation tool gaining traction in Colombo\'s enterprise and consulting scene. Popular for pitch decks targeting Sri Lankan VCs (Ennovate, Venture Frontier) and international investors.' },
 { name: 'Notion AI', tag: 'Best for Teams', description: 'Adopted by Sri Lankan tech companies and remote-first startups for knowledge management. Growing community of Sinhala Notion creators with localised templates for project management and tourism operations.' },
 ],
};

const DESIGN_CATEGORY = {
 id: 'design',
 name: 'Design & Creative',
 icon: Camera,
 description:
 'Design tools powering Sri Lanka\'s creative economy — from Colombo\'s advertising agencies (Grant, Leo Burnett Sri Lanka, Triad) and the tourism visual content boom to tea branding, boutique hotel photography, and the growing game development scene.',
 tools: [
 { name: 'Canva', tag: 'Most Popular', description: 'The #1 design tool in Sri Lanka. AI features (Magic Studio, text-to-image) make it indispensable for tourism marketers, small businesses, and enterprise teams creating content in Sinhala, Tamil, and English.' },
 { name: 'Midjourney', tag: 'Best for Art', description: 'Growing in popularity among Sri Lankan digital artists, tourism content creators generating Sri Lankan landscape art, and game developers exploring the island\'s rich cultural aesthetic for concept art.' },
 { name: 'Adobe Firefly', tag: 'Best Quality', description: 'Generative AI integrated into Creative Cloud. Preferred by Colombo\'s top ad agencies and professional designers for commercial-grade output with Sinhala and Tamil typography support.' },
 { name: 'DALL-E 3', tag: 'Best Integration', description: 'Integrated with ChatGPT — widely used by Sri Lankan content creators, tourism marketers, and small businesses for rapid image generation with Sinhala, Tamil, and English text prompts.' },
 ],
};

const TOURISM_CATEGORY = {
 id: 'tourism',
 name: 'Tourism & Hospitality AI',
 icon: Palmtree,
 description:
 'Specialised AI tools for Sri Lanka\'s tourism revival — from personalised travel recommendation engines and dynamic hotel pricing to AI-powered multi-language tour guides and social media marketing automation targeting European, Indian, and Chinese travellers visiting Colombo, Galle, Kandy, Ella, and Yala.',
 tools: [
 { name: 'TravelBoast AI', tag: 'Best for Itineraries', description: 'AI-powered travel itinerary planner gaining traction among Sri Lankan boutique hotels and tour operators. Creates personalised multi-day itineraries for Sri Lanka\'s diverse attractions — from wildlife safaris in Yala to tea plantation tours in Nuwara Eliya.' },
 { name: 'Oaky AI', tag: 'Hotel Revenue Management', description: 'AI-driven hotel revenue management platform adopted by boutique hotels and resorts in Colombo, Galle Fort, Bentota, and Kandy. Dynamic pricing based on seasonal demand, booking patterns, and competitive analysis.' },
 { name: 'Rep AI', tag: 'Best for Guest Communication', description: 'AI-powered guest communication and concierge platform for Sri Lankan hotels. Handles multi-language queries (English, Sinhala, Tamil, Russian, Mandarin) across WhatsApp, Messenger, and email.' },
 { name: 'Viator Marketplace AI', tag: 'Tour Operator Optimisation', description: 'AI tools integrated with the Viator/TripAdvisor marketplace helping Sri Lankan tour operators optimise listings, pricing, and reviews for maximum visibility among international travellers.' },
 ],
};

const ALL_CATEGORIES = [WRITING_CATEGORY, CODING_CATEGORY, MARKETING_CATEGORY, DESIGN_CATEGORY, TOURISM_CATEGORY];

// ─── Top 12 Tools ─────────────────────────────────────────────

const TOP_PICK_PREFIX = [
 { name: 'ChatGPT', tag: 'Best Overall AI Assistant in Sri Lanka', trend: 'up' as const },
 { name: 'GitHub Copilot', tag: 'Best AI Coding Assistant', trend: 'up' as const },
 { name: 'Claude', tag: 'Best for Long-Form & Research', trend: 'up' as const },
 { name: 'Notion AI', tag: 'Most Used for Sri Lankan Teams', trend: 'up' as const },
 { name: 'Canva', tag: 'Most Used Design Tool in Sri Lanka', trend: 'up' as const },
 { name: 'Midjourney', tag: 'Best AI Art for Sri Lankan Creatives', trend: 'up' as const },
 { name: 'Jasper AI', tag: 'Best for Marketing Copy', trend: 'up' as const },
 { name: 'Perplexity', tag: 'Best Research Assistant', trend: 'up' as const },
 { name: 'AdCreative.ai', tag: 'Best for Tourism & E-Commerce Ads', trend: 'up' as const },
 { name: 'Writesonic', tag: 'Best Value Writing Tool', trend: 'up' as const },
 { name: 'Oaky AI', tag: 'Best Hotel Revenue AI', trend: 'up' as const },
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

export default function AiToolsSriLankaPage() {
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
 { name: 'AI Tools Sri Lanka', item: 'https://apifeny-ai.vercel.app/ai-tools-sri-lanka' },
 ]}
 />
 <GeoSeoSchema
 countryName="Sri Lanka"
 countryCode="lk"
 capital="Colombo"
 currency="LKR"
 language="Sinhala"
 languageCode="si"
 marketSize="$15B digital economy, tech outsourcing hub, growing startup ecosystem in Colombo"
 slug="ai-tools-sri-lanka"
 faqs={[
 { question: 'What are the best AI tools in Sri Lanka?', answer: 'ChatGPT leads for general productivity in Sri Lanka, GitHub Copilot for developers, Canva AI for design and marketing, and Perplexity for research. Sri Lanka\'s growing IT outsourcing sector makes coding tools especially relevant for Colombo\'s tech workforce.' },
 { question: 'Do AI tools support Sinhala (සිංහල) and Tamil (தமிழ்)?', answer: 'Support varies. ChatGPT handles Sinhala prompts with reasonable accuracy. Google\'s AI tools have stronger support for both Sinhala and Tamil due to Google\'s broader language coverage. Canva supports Sinhala Unicode fonts. Specialized tools for local languages remain a growing area.' },
 { question: 'How can Sri Lankan startups leverage AI?', answer: 'Sri Lankan startups can use no-code AI tools like ChatGPT, Claude, and Perplexity for research and content. GitHub Copilot and Cursor for development. Canva AI and AdCreative.ai for marketing. Most offer free tiers, making them accessible for bootstrapped startups in Colombo and Jaffna.' },
 { question: 'What payment options do AI tools offer in Sri Lanka?', answer: 'International AI tools typically accept credit/debit cards and PayPal. Some platforms support payments through Sri Lankan banks via Visa/Mastercard. USD pricing is standard, though some tools offer regional pricing for developing markets.' },
 { question: 'Is AI adoption growing in Sri Lanka?', answer: 'Yes, AI adoption in Sri Lanka is accelerating, driven by the IT outsourcing sector, a growing startup scene in Colombo, and government digitalization initiatives. The Lanka Software Foundation and academic institutions (University of Moratuwa, UCSC) are actively involved in AI research and training.' },
 ]}
 />

 <main className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white ">
 {/* ── Hero ─────────────────────────────────────── */}
 <section className="relative overflow-hidden border-b border-amber-100/50 ">
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,16,46,0.06),transparent_50%)] ,rgba(200,16,46,0.08),transparent_50%)] pointer-events-none" />
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,183,77,0.04),transparent_50%)] ,rgba(255,183,77,0.06),transparent_50%)] pointer-events-none" />
 <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 relative">
 <div className="mx-auto max-w-3xl text-center">
 <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-medium text-[#C8102E] ">
 <MapPin className="h-4 w-4" />
 🇱🇰 Curated for Sri Lanka
 </div>
 <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
 Best AI Tools in{' '}
 <span className="bg-gradient-to-r from-[#C8102E] via-[#FFB74D] to-[#C8102E] bg-clip-text text-transparent">
 Sri Lanka
 </span>{' '}
 (2026)
 </h1>
 <p className="mt-6 text-lg leading-relaxed text-gray-600 ">
 100+ AI tools ranked for Sri Lanka's <strong>$5B digital economy</strong> — with{' '}
 <strong>Rs LKR / USD pricing</strong>,{' '}
 <strong>සිංහල & தமிழ் bilingual support</strong>, and ratings for Sri Lanka's{' '}
 <strong>tourism revival (2M+ visitors), Colombo IT export corridor ($1.2B+), and Ceylon Tea industry AI transformation</strong>.
 Updated daily.
 </p>
 <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
 <a
 href="#top-picks"
 className="inline-flex items-center gap-2 rounded-xl bg-[#C8102E] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-200/50 transition-all hover:bg-[#A00D25] hover:shadow-amber-300/50 "
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
 className="rounded-xl border border-amber-100/60 bg-white/80 p-5 shadow-sm transition-all hover:shadow-md "
 >
 <s.icon className="mb-3 h-6 w-6 text-[#C8102E]" />
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

 {/* ── Sri Lanka Market Snapshot ───────────────── */}
 <section className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
 <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
 🇱🇰 Sri Lanka AI Market Snapshot
 </h2>
 <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500 ">
 Key metrics driving AI adoption in Sri Lanka — the Pearl of the Indian Ocean with a
 unique blend of tourism, IT exports, and plantation agriculture.
 </p>
 <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
 {LK_AI_SNAPSHOT.map((stat) => (
 <div
 key={stat.label}
 className="rounded-xl border border-amber-100/60 bg-white p-6 text-center shadow-sm "
 >
 <p className="text-3xl font-bold text-[#C8102E] ">{stat.value}</p>
 <p className="mt-1 text-sm font-medium text-gray-700 ">{stat.label}</p>
 <p className="mt-0.5 text-xs text-gray-400">{stat.sub}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ── Why Sri Lanka ──────────────────────────── */}
 <section className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
 <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
 Why Sri Lanka Needs Its Own AI Rankings
 </h2>
 <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500 ">
 Global AI tool rankings miss what makes Sri Lanka unique — from the post-pandemic tourism AI transformation and
 the country's $1.2B IT export industry to the unique Sinhala & Tamil language AI opportunity and
 Ceylon Tea industry's tech-driven future. Here's why a dedicated Sri Lanka ranking matters.
 </p>
 <div className="mt-10 grid gap-6 md:grid-cols-3">
 {WHY_LK.map((item) => (
 <div
 key={item.title}
 className="group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-[#C8102E]/30 hover:shadow-md #C8102E]/40"
 >
 <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#C8102E]/10 text-[#C8102E] ">
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
 🏆 Top 12 AI Tools in Sri Lanka
 </h2>
 <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500 ">
 Our daily-updated ranking of the most popular and effective AI tools for the
 Sri Lankan market, curated based on local usage patterns, Sinhala & Tamil language support,
 tourism and IT services ecosystem fit, and affordability.
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
 Explore AI tools organised by category, each curated for the Sri Lankan market
 with local context and ecosystem fit.
 </p>
 </div>
 <div className="space-y-12">
 {ALL_CATEGORIES.map((cat) => (
 <div key={cat.id} id={cat.id}>
 <div className="mb-6 flex items-center gap-3">
 <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#C8102E]/10 text-[#C8102E] ">
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
 className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#C8102E]/20 hover:shadow-md "
 >
 <span className="inline-block rounded-full bg-[#C8102E]/10 px-2.5 py-0.5 text-xs font-medium text-[#C8102E] ">
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
 <section className="bg-gradient-to-r from-[#C8102E] via-[#FFB74D] to-[#C8102E]">
 <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
 <h2 className="text-2xl font-bold text-white sm:text-3xl">
 ශ්‍රී ලංකාව සඳහා හොඳම AI මෙවලම් සොයනවාද?
 </h2>
 <p className="mx-auto mt-4 max-w-2xl text-sm text-white/80">
 Browse our full directory of 600+ AI tools, filter by category, compare pricing in Rs LKR/USD,
 and read honest reviews from Sri Lankan users and enterprise buyers. Your next productivity breakthrough
 is one click away — whether you're in Colombo, Kandy, Galle, or Jaffna.
 </p>
 <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
 <Link
 href="/"
 className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#C8102E] shadow-lg transition-all hover:bg-amber-50"
 >
 Browse Full Directory
 <ArrowRight className="h-4 w-4" />
 </Link>
 <Link
 href="/blog"
 className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
 >
 <BookOpen className="h-4 w-4" />
 බ්ලොග් කියවන්න — Read AI Guides
 </Link>
 </div>
 </div>
 </section>

 {/* ── Blog & Playbooks ───────────────────────── */}
 <section className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
 <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-gray-900 ">
 📖 Learn More About AI in Sri Lanka
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
 <LandingPageCrossLinks currentSlug="ai-tools-sri-lanka" />
 </div>
 </section>

 {/* ── Footer ──────────────────────────────────── */}
 <footer className="border-t border-gray-100 bg-white ">
 <div className="mx-auto max-w-7xl px-4 py-8 text-center text-xs text-gray-400 sm:px-6 lg:px-8">
 <p>Apifeny AI — Independent AI Tool Rankings for Sri Lanka. Not affiliated with any listed tool.</p>
 <p className="mt-1">Prices shown in Rs LKR / USD are approximate and may vary. Always verify pricing on the tool's official website.</p>
 </div>
 </footer>
 </main>
 </>
 );
}
