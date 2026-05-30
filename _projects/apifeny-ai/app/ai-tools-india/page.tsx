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
 title: 'Best AI Tools in India (2026) — 100+ Tools for Indian Startups & Enterprises',
 description:
 "Discover the best AI tools for India's $15B AI market. 100+ ranked tools with INR/USD pricing, compliance with India's DPDP Act 2023, and Hindi/English bilingual support. Curated for Bangalore, Mumbai, Delhi NCR, Hyderabad & Pune tech ecosystems.",
 ogTitle: 'Best AI Tools in India (2026) — Apifeny AI',
 ogDescription:
 "100+ AI tools ranked for the Indian market. 🇮🇳 INR pricing, Hindi/English language support, DPDP Act 2023 compliance, and curated for India's startup unicorn ecosystem and enterprise IT landscape.",
 ogImage: '/og/ai-tools-india.png',
};

const TRUST_SECTIONS = [
 {
 icon: Globe,
 title: '🇮🇳 हिन्दी / English & 22 Official Languages',
 description:
 'India is a multilingual AI goldmine. Tools ranked by their support for Indian languages — Hindi (हिन्दी), Bengali (বাংলা), Tamil (தமிழ்), Telugu (తెలుగు), Marathi (मराठी), and more — plus Hinglish code-switching (the dominant online mode). English-dominant platforms popular in Bangalore, Mumbai, and Gurgaon are also rated for localisation quality.',
 },
 {
 icon: DollarSign,
 title: '₹ INR / USD Pricing',
 description:
 'All tool prices shown in Indian Rupees (₹) and USD. India\'s cost-conscious market means tools offering INR billing via UPI (GPay, PhonePe, Paytm) and RuPay card acceptance are prioritised. Free-tier value and budget-friendliness for startups matter heavily.',
 },
 {
 icon: ShieldCheck,
 title: '🔒 DPDP Act 2023 Compliance Reviewed',
 description:
 'Every tool evaluated against India\'s Digital Personal Data Protection Act 2023. We flag compliance risks, highlight tools with India-based data centres (AWS Mumbai, GCP Mumbai, Azure Central India, Yotta, STT GDC), and identify alignment with MeitY\'s AI governance framework.',
 },
 {
 icon: Building2,
 title: '🏢 India Startup & Enterprise Ready',
 description:
 'Curated for India\'s dual-speed economy — from Bangalore\'s SaaS unicorns (Zoho, Freshworks, Postman) and Mumbai\'s fintech giants to Delhi NCR\'s e-commerce (Flipkart, Zomato, Paytm) and Hyderabad\'s pharmaceutical AI labs. India\'s 100,000+ DPIIT-recognised startups base.',
 },
];

const IN_AI_SNAPSHOT = [
 { label: 'AI Market (2026)', value: '$15B+', sub: 'World\'s 5th largest economy, fastest-growing AI ecosystem' },
 { label: 'Developer Base', value: '4M+', sub: 'World\'s 2nd largest — growing at 30% YoY' },
 { label: 'AI Unicorns', value: '18+', sub: 'Bangalore, Mumbai, Delhi — Asia\'s hottest AI startup scene' },
 { label: 'Digital Users', value: '900M+', sub: 'Internet users — Jio, Aadhaar, UPI create vast AI training data' },
];

const WHY_IN = [
 {
 icon: Smartphone,
 title: 'India\'s AI Revolution — World\'s Largest Digital Lab',
 description:
 'India\'s $15B+ AI market is the fastest-growing among major economies, powered by 900M+ internet users (Jio), the world\'s largest real-time payment system (UPI — $2T+ annual transactions), Aadhaar\'s 1.4B biometric ID base, and a government investing $1.2B in the IndiaAI Mission. India produces 4M+ developers annually — the world\'s largest talent pool.',
 },
 {
 icon: Building2,
 title: 'Startup Unicorn Engine & SaaS Capital',
 description:
 'India is home to 100,000+ DPIIT-recognised startups and 100+ unicorns. Bangalore alone houses 40+ AI startups and is the world\'s SaaS outsourcing capital (Zoho, Freshworks, Postman, BrowserStack). The India Stack (Aadhaar + UPI + DigiLocker + ONDC) creates unique AI training data and deployment opportunities unavailable anywhere else.',
 },
 {
 icon: Users,
 title: 'Bharat AI — The Next Billion Users Opportunity',
 description:
 'Beyond India\'s English-speaking elite lies "Bharat" — the next billion users who interact in 22+ scheduled languages and hundreds of dialects. Voice-first AI (Bhashini, Jugalbandi), vernacular chatbots, and Indic LLMs (Sarvam AI\'s OpenHathi, CoRover.ai\'s BharatGPT) represent the most exciting AI frontier globally, with no Western parallel.',
 },
];

// ─── Tool Categories ──────────────────────────────────────────

const WRITING_CATEGORY = {
 id: 'writing',
 name: 'Writing & Content Creation',
 icon: BookOpen,
 description:
 'AI writing tools optimised for India\'s multilingual content ecosystem — from Hindi (हिन्दी) and Hinglish content marketing and formal English business writing to regional language social media management for WhatsApp Business, ShareChat, Moj, and YouTube India.',
 tools: [
 { name: 'Jasper AI', tag: 'Best for Marketing Copy', description: 'Enterprise-grade AI writing with multilingual support. Popular with Mumbai\'s top ad agencies (Ogilvy India, DDB Mudra) and Bangalore SaaS teams creating both English and Indian language content.' },
 { name: 'Writesonic', tag: 'Best Value', description: 'Affordable AI writing with Indian pricing. ~₹900/mo starting — ideal for Indian SMEs, D2C brands on Shopify India/Flipkart, and freelance content writers in Delhi and Bangalore.' },
 { name: 'ChatGPT', tag: 'Most Used in India', description: 'Overwhelmingly popular across India\'s tech workforce. Strong Hindi, Hinglish, and regional language capabilities. Widely used for email drafting, social media content, and bilingual business communication.' },
 { name: 'Sarvam AI', tag: 'India\'s Homegrown LLM', description: 'Bangalore-based Sarvam AI\'s OpenHathi and custom LLMs — best-in-class for Hindi and Indic languages. Voice-first, vernacular-first approach. Integrated with Bhashini, India\'s National Language Translation Mission.' },
 ],
};

const CODING_CATEGORY = {
 id: 'coding',
 name: 'Coding & Development',
 icon: Briefcase,
 description:
 'Development tools powering India\'s software ecosystem — from Bangalore\'s Global Capability Centres (Google, Microsoft, Goldman Sachs) and Hyderabad\'s pharma IT to Pune\'s automotive software and Delhi NCR\'s e-commerce giants.',
 tools: [
 { name: 'GitHub Copilot', tag: 'Best Overall', description: 'The standard for Indian dev teams. India has the 2nd largest GitHub developer community globally. Strong Python, JavaScript, Java, and Go support. Widely adopted across Bangalore\'s SaaS scene and India\'s GCC landscape.' },
 { name: 'Claude', tag: 'Best for Architecture', description: 'Gaining rapid traction among Indian enterprise developers for code review, architecture design, and technical documentation. Strong adoption in Hyderabad\'s pharma AI labs and Pune\'s enterprise IT shops.' },
 { name: 'Cursor', tag: 'Rising Star', description: 'AI-native IDE gaining popularity in Indian coding bootcamps (Masai School, Pesto, Newton School) and India\'s growing developer community across Bangalore, Chennai, and Ahmedabad tech hubs.' },
 { name: 'Perplexity', tag: 'Best for Research', description: 'Widely adopted by Indian engineers for technical research, API docs lookup, and competitive analysis. Especially popular among IIT and NIT students and early-stage startup teams building MVPs rapidly.' },
 ],
};

const MARKETING_CATEGORY = {
 id: 'marketing',
 name: 'Marketing & E-Commerce',
 icon: BarChart3,
 description:
 'Marketing AI tools for India\'s unique digital landscape — where WhatsApp Business dominates communication (500M+ users), Flipkart and Meesho lead e-commerce in Bharat, ShareChat/Moj/Instagram Reels power the creator economy, and UPI revolutionises payments.',
 tools: [
 { name: 'AdCreative.ai', tag: 'Best for Ads', description: 'AI ad creative generator optimised for the Indian market. Train on your product catalog for Flipkart, Amazon India, Meesho, WhatsApp Business Ads, and Google Ads India with Hinglish and regional language copy.' },
 { name: 'Canva AI', tag: 'Most Accessible', description: 'Overwhelmingly popular in India. AI-powered design for social media, e-commerce banners (for India\'s festive seasons — Diwali, Holi, Dussehra), and video content. Indian templates, Devanagari font support, and seasonal design assets included.' },
 { name: 'Gamma', tag: 'Best for Presentations', description: 'AI presentation tool popular across Indian enterprise, consulting firms (BCG India, McKinsey GSC), and pitch decks for Indian startups seeking funding from Sequoia India, Accel, and Peak XV Partners.' },
 { name: 'Notion AI', tag: 'Best for Teams', description: 'Deeply adopted by Indian tech companies and remote-first startups for knowledge management. Strong Indian community on Twitter/X and LinkedIn. Popular for engineering documentation, PRD writing, and team wikis.' },
 ],
};

const DESIGN_CATEGORY = {
 id: 'design',
 name: 'Design & Creative',
 icon: Camera,
 description:
 'Design tools powering India\'s creative economy — from Mumbai\'s Bollywood (Bollywood) and advertising agencies to Bangalore\'s animation studios, Delhi\'s architectural firms, and the booming D2C brand visual identity market.',
 tools: [
 { name: 'Canva', tag: 'Most Popular', description: 'The #1 design tool in India. AI features (Magic Studio, text-to-image, background removal) make it indispensable for Indian creators, small businesses, and enterprise marketing teams creating content in English, Hindi, and regional languages.' },
 { name: 'Midjourney', tag: 'Best for Art', description: 'Hugely popular among Indian digital artists, game concept designers (India has 1900+ gaming studios), and Bollywood/tollywood poster designers — matching India\'s distinctive maximalist visual aesthetic.' },
 { name: 'Adobe Firefly', tag: 'Best Quality', description: 'Generative AI integrated into Creative Cloud. Preferred by India\'s top ad agencies and professional designers for commercial-grade output with Indian typography (Devanagari, Tamil, Telugu scripts) support.' },
 { name: 'DALL-E 3', tag: 'Best Integration', description: 'Integrated with ChatGPT — widely used by Indian content creators, marketers, and small businesses for rapid image generation with Hindi, Hinglish, and English text prompts.' },
 ],
};

const ALL_CATEGORIES = [WRITING_CATEGORY, CODING_CATEGORY, MARKETING_CATEGORY, DESIGN_CATEGORY];

// ─── Top 12 Tools ─────────────────────────────────────────────

const TOP_PICK_PREFIX = [
 { name: 'ChatGPT', tag: 'Best Overall AI Assistant in India', trend: 'up' as const },
 { name: 'GitHub Copilot', tag: 'Best AI Coding Assistant', trend: 'up' as const },
 { name: 'Claude', tag: 'Best for Long-Form & Enterprise', trend: 'up' as const },
 { name: 'Notion AI', tag: 'Most Used for Indian Teams', trend: 'up' as const },
 { name: 'Canva', tag: 'Most Used Design Tool in India', trend: 'up' as const },
 { name: 'Midjourney', tag: 'Best AI Art for Indian Aesthetics', trend: 'up' as const },
 { name: 'Jasper AI', tag: 'Best for Marketing Copy', trend: 'up' as const },
 { name: 'Perplexity', tag: 'Best Research Assistant', trend: 'up' as const },
 { name: 'AdCreative.ai', tag: 'Best for Indian E-Commerce Ads', trend: 'up' as const },
 { name: 'Writesonic', tag: 'Best Value Writing Tool', trend: 'up' as const },
 { name: 'Sarvam AI', tag: 'Best Indic-Language LLM', trend: 'up' as const },
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

export default function AiToolsIndiaPage() {
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
 { name: 'AI Tools India', item: 'https://apifeny-ai.vercel.app/ai-tools-india' },
 ]}
 />
 <GeoSeoSchema
 countryName="India"
 countryCode="in"
 capital="New Delhi"
 currency="INR"
 language="Hindi"
 languageCode="hi"
 marketSize="$3.7T GDP, 1.4B population, world's third-largest startup ecosystem"
 slug="ai-tools-india"
 faqs={[
 { question: "What are the best AI tools in India?", answer: "The best AI tools in India include ChatGPT for productivity, GitHub Copilot for software development across India's 100K+ startups, Canva AI for design, and Jasper for marketing. India's $1.2B+ AI market is the fastest-growing globally, driven by Digital India, UPI, and the world's third-largest startup ecosystem." },
 { question: "Are AI tools accessible for Indian businesses?", answer: "Yes. India's Jio-led digital revolution made data affordable — 800M+ internet users. Most AI tools have free tiers and INR-friendly pricing. The government's Digital India programme and Startup India initiative provide tech adoption grants. AWS's India regions (Mumbai, Hyderabad) and GCP's Mumbai region ensure low-latency access." },
 { question: "What AI tools are best for India's IT and BPO sector?", answer: "India's IT-BPM sector ($245B revenue) leads AI adoption. GitHub Copilot and Tabnine boost developer productivity for India's 5M+ software engineers. AI-powered QA tools, automation platforms, and NLP tools for multilingual Indian language support are transforming the BPO sector. Companies like TCS, Infosys, and Wipro invest heavily in proprietary AI platforms." },
 { question: "What AI regulations apply in India?", answer: "India's Digital Personal Data Protection Act (DPDPA) 2023 is the primary data protection law. The Ministry of Electronics and Information Technology (MeitY) governs AI policy. The NITI Aayog's National Strategy for AI guides ethical AI adoption. Sectoral regulators like RBI (finance) and IRDAI (insurance) impose additional AI compliance requirements." },
 { question: "Is Hindi and Indian language support available?", answer: "Support is evolving. ChatGPT supports Hindi and major Indian languages. Google's AI works well with Hindi, Tamil, Telugu, Bengali, and Marathi. Indian AI labs like Bhashini (government) and AI4Bharat develop open-source Indian language models. The government's National Language Translation Mission (NLTM) accelerates regional language AI development." },
 ]}
 />

 <main className="min-h-screen bg-gradient-to-b from-white via-orange-50/30 to-white ">
 {/* ── Hero ─────────────────────────────────────── */}
 <section className="relative overflow-hidden border-b border-orange-100/50 ">
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,153,51,0.06),transparent_50%)] ,rgba(255,153,51,0.08),transparent_50%)] pointer-events-none" />
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,102,51,0.04),transparent_50%)] ,rgba(0,102,51,0.06),transparent_50%)] pointer-events-none" />
 <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 relative">
 <div className="mx-auto max-w-3xl text-center">
 <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm font-medium text-[#FF9933] ">
 <MapPin className="h-4 w-4" />
 🇮🇳 Curated for India
 </div>
 <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
 Best AI Tools in{' '}
 <span className="bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#138808] bg-clip-text text-transparent">
 India
 </span>{' '}
 (2026)
 </h1>
 <p className="mt-6 text-lg leading-relaxed text-gray-600 ">
 100+ AI tools ranked for India's <strong>$15B+ AI market</strong> — with{' '}
 <strong>₹ INR / USD pricing</strong>,{' '}
 <strong>हिन्दी & English bilingual support</strong>, and ratings for India's{' '}
 <strong>startup unicorn ecosystem, the India Stack (UPI/Aadhaar), and the "Bharat" next-billion-user opportunity</strong>.
 Updated daily.
 </p>
 <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
 <a
 href="#top-picks"
 className="inline-flex items-center gap-2 rounded-xl bg-[#FF9933] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200/50 transition-all hover:bg-[#E68A2E] hover:shadow-orange-300/50 "
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
 className="rounded-xl border border-orange-100/60 bg-white/80 p-5 shadow-sm transition-all hover:shadow-md "
 >
 <s.icon className="mb-3 h-6 w-6 text-[#FF9933]" />
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

 {/* ── India Market Snapshot ────────────────────── */}
 <section className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
 <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
 🇮🇳 India AI Market Snapshot
 </h2>
 <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500 ">
 Key metrics driving AI adoption in India — the world's fastest-growing major economy with
 a digital infrastructure (India Stack) that has no global parallel.
 </p>
 <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
 {IN_AI_SNAPSHOT.map((stat) => (
 <div
 key={stat.label}
 className="rounded-xl border border-orange-100/60 bg-white p-6 text-center shadow-sm "
 >
 <p className="text-3xl font-bold text-[#FF9933] ">{stat.value}</p>
 <p className="mt-1 text-sm font-medium text-gray-700 ">{stat.label}</p>
 <p className="mt-0.5 text-xs text-gray-400">{stat.sub}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ── Why India ──────────────────────────────── */}
 <section className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
 <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
 Why India Needs Its Own AI Rankings
 </h2>
 <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500 ">
 Global AI tool rankings miss what makes India unique — from the India Stack (UPI, Aadhaar, ONDC) and the
 multilingual AI opportunity of "Bharat" to India's DPDP Act compliance requirements and the booming
 vernacular-first startup ecosystem. Here's why a dedicated India ranking matters.
 </p>
 <div className="mt-10 grid gap-6 md:grid-cols-3">
 {WHY_IN.map((item) => (
 <div
 key={item.title}
 className="group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-[#FF9933]/30 hover:shadow-md #FF9933]/40"
 >
 <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#FF9933]/10 text-[#FF9933] ">
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
 🏆 Top 12 AI Tools in India
 </h2>
 <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500 ">
 Our daily-updated ranking of the most popular and effective AI tools for the
 Indian market, curated based on local usage patterns, Indian language support,
 DPDP Act 2023 compliance, India Stack integration, and value pricing.
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
 Explore AI tools organised by category, each curated for the Indian market
 with local context and ecosystem fit.
 </p>
 </div>
 <div className="space-y-12">
 {ALL_CATEGORIES.map((cat) => (
 <div key={cat.id} id={cat.id}>
 <div className="mb-6 flex items-center gap-3">
 <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF9933]/10 text-[#FF9933] ">
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
 className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#FF9933]/20 hover:shadow-md "
 >
 <span className="inline-block rounded-full bg-[#FF9933]/10 px-2.5 py-0.5 text-xs font-medium text-[#FF9933] ">
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
 <section className="bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#138808]">
 <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
 <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
 भारत के लिए सबसे अच्छा AI टूल ढूंढ रहे हैं?
 </h2>
 <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-700">
 Browse our full directory of 600+ AI tools, filter by category, compare pricing in ₹ INR/USD,
 and read honest reviews from Indian users and enterprise buyers. Your next productivity breakthrough
 is one click away — whether you're in Bangalore, Mumbai, Delhi, or Bharat.
 </p>
 <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
 <Link
 href="/"
 className="inline-flex items-center gap-2 rounded-xl bg-[#138808] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#0F6E06]"
 >
 Browse Full Directory
 <ArrowRight className="h-4 w-4" />
 </Link>
 <Link
 href="/blog"
 className="inline-flex items-center gap-2 rounded-xl border border-[#138808] px-6 py-3 text-sm font-semibold text-[#138808] transition-all hover:bg-green-50"
 >
 <BookOpen className="h-4 w-4" />
 ब्लॉग पढ़ें — Read AI Guides
 </Link>
 </div>
 </div>
 </section>

 {/* ── Blog & Playbooks ───────────────────────── */}
 <section className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
 <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-gray-900 ">
 📖 Learn More About AI in India
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
 <LandingPageCrossLinks currentSlug="ai-tools-india" />
 </div>
 </section>

 {/* ── Footer ──────────────────────────────────── */}
 <footer className="border-t border-gray-100 bg-white ">
 <div className="mx-auto max-w-7xl px-4 py-8 text-center text-xs text-gray-400 sm:px-6 lg:px-8">
 <p>Apifeny AI — Independent AI Tool Rankings for India. Not affiliated with any listed tool.</p>
 <p className="mt-1">Prices shown in ₹ INR / USD are approximate and may vary. Always verify pricing on the tool's official website.</p>
 </div>
 </footer>
 </main>
 </>
 );
}
