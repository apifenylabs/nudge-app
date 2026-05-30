'use client';

import { useMemo } from 'react';
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
 Wallet,
 ShieldCheck,
 BarChart3,
 CheckCircle,
 Quote,
 Layers,
} from 'lucide-react';

import SeoMetadata from '@/components/SeoMetadata';
import FeaturedPlaybooks from '@/components/FeaturedPlaybooks';
import BlogCategoryLinks from '@/components/BlogCategoryLinks';
import LandingPageCrossLinks from '@/components/LandingPageCrossLinks';
import { toolsData } from '@/lib/data';
import { playbooks } from '@/lib/playbooks';
import { cn } from '@/lib/utils';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import GeoSeoSchema from '@/components/GeoSeoSchema';

// ─── Constants ────────────────────────────────────────────────────────────────

const META = {
 title: 'Best AI Tools in Japan (2026) — Curated for Japanese Teams & Startups',
 description:
 'Discover the best AI tools for Japanese businesses and founders. Curated directory of 85+ tools ranked by trending score, Japan-market readiness, and local relevance. Updated daily. Built for Tokyo, Osaka, Kyoto, and Japan\'s thriving AI robotics ecosystem.',
 ogTitle: 'Best AI Tools in Japan (2026) — Apifeny AI',
 ogDescription:
 'Find AI tools built for Japan: RIKEN AIP research, Tokyo University ecosystem, JPY pricing, Japanese (JA) support, and APAC data compliance. 85+ tools, expert ranked.',
 ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
 return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
 return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsJapanPage() {
 const top12 = useMemo(() => topByTrending(12), []);
 const categorySections = useMemo(() =>
 CATEGORY_NAMES.map((name) => ({
 name,
 tools: topByCategory(name, 6),
 count: toolsData.filter((t) => t.is_published && t.category === name).length,
 })),
 []);
 const totalCount = useMemo(() => toolsData.filter((t) => t.is_published).length, []);

 return (
 <>
 <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Japan', item: '/ai-tools-japan' }]} />
 <GeoSeoSchema
 countryName="Japan"
 countryCode="jp"
 capital="Tokyo"
 currency="JPY"
 language="Japanese"
 languageCode="ja"
 marketSize={"$4.2T economy, 125M population, world-leading robotics and AI research ecosystem (RIKEN AIP, Tokyo U, Kyoto U), G7 member with strong deep-tech manufacturing, rapidly growing startup scene (J-Startup, METI)"}
 slug="ai-tools-japan"
 faqs={[
 { question: "What are the best AI tools in Japan?", answer: "The best AI tools in Japan include ChatGPT for content and productivity, GitHub Copilot for development, Claude for advanced reasoning in both English and Japanese, Canva AI for design, and Jasper for marketing. Japan is a global AI powerhouse — home to RIKEN's Center for Advanced Intelligence Project (AIP) in Tokyo, the University of Tokyo's Matsuo Lab, and Kyoto University's machine learning research groups. The country's Society 5.0 strategy and ¥1T+ AI investment make it one of the world's most dynamic AI markets." },
 { question: "How does Japanese privacy law (APPI) affect AI tool selection?", answer: "Japan's Act on the Protection of Personal Information (APPI) and its 2020 amendments impose strict requirements on how AI tools collect, process, and transfer personal data. The Personal Information Protection Commission (PPC) oversees enforcement with specific guidance for AI systems. Key considerations include cross-border data transfer restrictions (especially relevant for cloud AI tools), consent management for training data, and transparency requirements for automated decision-making. The proposed AI governance framework will add further obligations for high-risk AI systems." },
 { question: "What AI tools are best for Japan's key industries?", answer: "Japan's economy has distinct AI priorities: manufacturing robotics and industrial AI for automotive and electronics, NLP tools for Japanese language processing in finance and media, healthcare AI for Japan's ageing population, FinTech AI for payments and wealth management (PayPay, Rakuten), retail AI for convenience store and e-commerce optimisation, and construction AI for infrastructure management. Japanese companies also lead in semiconductor AI and materials informatics." },
 { question: "How can Japanese startups access AI funding and support?", answer: "Japan offers extensive AI innovation support. METI's AI Strategy 2025 provides ¥1T+ in compute infrastructure and talent development. JST CREST funds AI research projects. NEDO provides technology development grants for deep-tech AI. The J-Startup programme accelerates high-potential startups. The Startup Visa initiative makes it easier for international AI talent to launch in Japan. JSPS KAKENHI grants support academic AI research. METI's subsidies for SMEs adopting AI provide up to 50% cost coverage." },
 { question: "What AI regulations exist in Japan?", answer: "Japan's AI regulatory framework is evolving rapidly. The Social Principles of Human-Centric AI (2019) set foundational ethics. The AI Strategy 2025 establishes a comprehensive governance framework. APPI (2020 amendments) governs data used in AI training. Sector-specific regulations apply: MHLW for medical AI devices, FSA/BoJ for financial AI, METI for industrial AI, and MLIT for autonomous vehicles and drones." },
 ]}
 />
 <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

 {/* HERO */}
 <section className="relative overflow-hidden border-b border-tech-500/20">
 <div className="absolute inset-0 bg-tech-grid opacity-40 pointer-events-none" />
 <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-neon/10 rounded-full blur-[120px] pointer-events-none" />
 <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-aqua/10 rounded-full blur-[100px] pointer-events-none" />

 <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
 <div className="max-w-4xl mx-auto text-center">
 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-700/10 border border-red-700/20 text-red-300 text-xs sm:text-sm font-medium mb-6 animate-fade-in">
 <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
 Japan-Focused · Updated Daily · {totalCount}+ Curated Tools
 </div>

 <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight animate-slide-up">
 Best AI Tools for{' '}
 <span className="bg-gradient-to-r from-red-500 via-white to-red-400 bg-clip-text text-transparent">
 Japan
 </span>
 <br />
 <span className="text-tech-100">in 2026</span>
 </h1>

 <p className="mt-5 sm:mt-6 text-base sm:text-lg text-tech-200 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
 Curated AI tools that <strong className="text-white">actually work for Japan</strong>. 
 We rank every tool on APPI compliance, JPY pricing, Japanese (JA) language support, and Japan AI ecosystem readiness — so you find tools built for Japan's unique market.
 </p>

 <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
 <Link href="/tools" className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-neon to-neon-dark text-white font-semibold text-sm sm:text-base transition-all hover:shadow-lg hover:shadow-neon/25 hover:-translate-y-0.5">
 <span>Explore All {totalCount}+ Tools</span>
 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
 </Link>
 <Link href="/categories/writing-content" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-tech-500/40 text-tech-100 hover:border-neon/30 hover:text-white text-sm sm:text-base font-medium transition-all">
 Browse by Category
 </Link>
 </div>

 <div className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-tech-300 animate-fade-in" style={{ animationDelay: '0.3s' }}>
 <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-rose-400" /><span>Japanese (日本語)</span></div>
 <div className="flex items-center gap-2"><Wallet className="w-4 h-4 text-yellow-400" /><span>JPY Pricing</span></div>
 <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-aqua" /><span>APPI & PPC</span></div>
 <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-neon-light" /><span>Research-Ready</span></div>
 </div>
 </div>
 </div>
 </section>

 {/* TOP TOOLS */}
 <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
 <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
 <div>
 <div className="flex items-center gap-3 mb-2">
 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center shrink-0"><Trophy className="w-5 h-5 text-rose-400" /></div>
 <h2 className="text-2xl sm:text-3xl font-bold text-white">Top AI Tools in Japan</h2>
 </div>
 <p className="text-sm sm:text-base text-tech-200 ml-[52px]">Highest-rated tools across all categories — ranked by trending score and Japan-market readiness</p>
 </div>
 <Link href="/tools" className="group inline-flex items-center gap-1.5 text-sm text-neon-light hover:text-neon transition shrink-0">
 See full rankings<ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
 </Link>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
 {top12.map((tool, i) => (
 <Link key={tool.id} href={`/tools/${tool.slug}`} className={cn('group relative block rounded-xl border border-tech-500/30 bg-tech-700 p-5 transition-all duration-300', 'hover:border-neon/40 hover:shadow-lg hover:shadow-neon/5 hover:-translate-y-1', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50')}>
 <div className={cn('absolute -top-2 -left-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-lg z-10', i === 0 ? 'bg-gradient-to-br from-red-600 to-white text-black' : i === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-black' : i === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white' : 'bg-tech-500 text-tech-100 border border-tech-400/30')}>#{i + 1}</div>
 <div className="flex items-start gap-3 mb-3">
 <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-tech-500 to-tech-600 flex items-center justify-center shrink-0 border border-tech-400/30 group-hover:border-neon/30 transition"><span className="text-white font-bold text-sm">{tool.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}</span></div>
 <div className="min-w-0 flex-1">
 <h3 className="text-base font-semibold text-white truncate group-hover:text-neon-light transition-colors">{tool.name}</h3>
 <p className="text-xs text-tech-200 line-clamp-2 mt-0.5 leading-relaxed">{tool.tagline}</p>
 </div>
 </div>
 <div className="flex flex-wrap items-center gap-2 mb-3">
 <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600/60 text-tech-100 border border-tech-500/30">{tool.category}</span>
 <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border', tool.pricing_tier === 'Free' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : tool.pricing_tier === 'Freemium' ? 'bg-sky-500/20 text-sky-400 border-sky-500/30' : tool.pricing_tier === 'Paid' ? 'bg-neon/20 text-neon-light border-neon/30' : tool.pricing_tier === 'Enterprise' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-gray-500/20 text-gray-400 border-gray-500/30')}>{tool.pricing_tier === 'Freemium' ? 'Free+' : tool.pricing_tier}</span>
 </div>
 <div className="flex items-center gap-2 mb-3">
 <div className="flex items-center gap-0.5">
 {(() => { const stars = []; for (let i = 1; i <= 5; i++) { if (tool.avg_rating >= i) stars.push('full'); else if (tool.avg_rating >= i - 0.5) stars.push('half'); else stars.push('empty'); } return stars.map((s, si) => (<Star key={si} className={cn('w-3 h-3', s === 'full' ? 'fill-red-400 text-rose-400' : s === 'half' ? 'fill-red-400/50 text-rose-400' : 'fill-none text-tech-400')} />)); })()}
 </div>
 <span className="text-xs text-tech-200">{tool.avg_rating.toFixed(1)}{tool.total_ratings >= 1000 ? ` (${(tool.total_ratings / 1000).toFixed(1)}K)` : ` (${tool.total_ratings})`}</span>
 </div>
 <div className="flex items-center gap-2">
 <div className="flex-1 h-1.5 rounded-full bg-tech-600 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-neon to-aqua transition-all duration-500" style={{ width: `${tool.trending_score}%` }} /></div>
 <div className="flex items-center gap-1 shrink-0"><TrendingUp className="w-3 h-3 text-neon-light" /><span className="text-[10px] font-medium text-neon-light">{tool.trending_score}</span></div>
 </div>
 </Link>
 ))}
 </div>

 <div className="mt-10 text-center">
 <Link href="/tools" className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-neon to-neon-dark text-white font-semibold text-sm sm:text-base transition-all hover:shadow-lg hover:shadow-neon/25 hover:-translate-y-0.5"><span>Explore All {totalCount}+ Tools →</span></Link>
 </div>
 </section>

 {/* WHY THIS COUNTRY MATTERS */}
 <section className="border-y border-tech-500/20 bg-tech-800/50">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
 <div className="text-center mb-10 sm:mb-12">
 <div className="flex items-center justify-center gap-3 mb-3">
 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-white/10 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-rose-400" /></div>
 <h2 className="text-2xl sm:text-3xl font-bold text-white">Why Japan Needs Its Own AI Tool Directory</h2>
 </div>
 <p className="text-sm sm:text-base text-tech-200 max-w-xl mx-auto">Japan's AI ecosystem is unique — world-leading robotics manufacturing meets a distinct regulatory, linguistic, and cultural landscape.regulatory and cultural landscape.</p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
 {[
 { icon: Globe, title: 'Japanese Support (日本語)', description: 'Japan demands native-level NLP from AI tools. We flag every tool for Japanese language support — kanji/kana input, Japanese UI localisation, keigo (honorific) awareness, and compliance with METI\'s AI guidelines for Japanese-language interfaces and cultural nuance.', gradient: 'from-neon/10 to-purple-900/10' },
 { icon: ShieldCheck, title: 'APPI, PPC & AIDA Compliance', description: 'Japan\'s privacy landscape includes the Act on Protection of Personal Information (APPI, 2020 amendments), the Personal Information Protection Commission (PPC) guidance, and the proposed AI governance framework. We verify every tool\'s cross-border data transfer mechanisms, consent management, and alignment with PPC guidelines for AI systems.', gradient: 'from-red-500/10 to-rose-900/10' },
 { icon: Zap, title: 'RIKEN AIP & Tokyo U Ecosystem', description: 'Japan\'s AIST/RIKEN Center for Advanced Intelligence Project (AIP), the University of Tokyo\'s Matsuo Lab and Preferred Networks spinout, and Kyoto University\'s machine learning labs represent Japan\'s world-class AI research ecosystem. We highlight tools that integrate with Japanese academia\'s unique collaboration pipeline.', gradient: 'from-aqua/10 to-cyan-900/10' },
 ].map((item) => (
 <div key={item.title} className={`relative rounded-xl bg-gradient-to-br ${item.gradient} bg-tech-700 border border-tech-500/30 p-6`}>
 <div className="absolute inset-0 bg-tech-grid opacity-20 rounded-xl pointer-events-none" />
 <div className="relative">
 <div className="w-12 h-12 rounded-xl bg-tech-600/60 flex items-center justify-center border border-tech-500/20 mb-4"><item.icon className="w-6 h-6 text-white" /></div>
 <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
 <p className="text-sm text-tech-200 leading-relaxed">{item.description}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* CATEGORY SECTIONS */}
 {categorySections.map((section) => {
 const sectionSlug = section.name === 'Writing & Content' ? 'writing-content' : section.name === 'Code & Development' ? 'code-development' : section.name === 'Design & Creative' ? 'design-creative' : 'marketing-seo';
 return (
 <section key={section.name} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 border-b border-tech-500/10 last:border-b-0">
 <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
 <div>
 <h2 className="text-xl sm:text-2xl font-bold text-white">Best AI {section.name.replace('Writing & Content', 'Writing Tools').replace('Code & Development', 'Coding Tools').replace('Marketing & SEO', 'Marketing Tools')} for Japan</h2>
 <p className="text-sm text-tech-200 mt-1 max-w-xl">Highest-rated tools across all categories — ranked by trending score and Japan-market readiness. Built for Tokyo's RIKEN ecosystem, Osaka's manufacturing AI, and Japan's ¥1T+ AI strategy.</p>
 </div>
 <Link href={`/categories/${sectionSlug}`} className="group inline-flex items-center gap-1.5 text-sm text-neon-light hover:text-neon transition shrink-0">View all {section.count} tools<ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></Link>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {section.tools.slice(0, 6).map((tool) => (
 <Link key={tool.id} href={`/tools/${tool.slug}`} className="group relative block rounded-xl border border-tech-500/30 bg-tech-700/80 p-4 transition-all duration-300 hover:border-neon/30 hover:bg-tech-700 hover:-translate-y-0.5">
 <div className="flex items-start gap-2.5 mb-2">
 <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-tech-500 to-tech-600 flex items-center justify-center shrink-0 border border-tech-400/20 group-hover:border-neon/30 transition"><span className="text-white font-bold text-xs">{tool.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}</span></div>
 <div className="min-w-0 flex-1"><h3 className="text-sm font-semibold text-white truncate group-hover:text-neon-light transition">{tool.name}</h3><p className="text-[11px] text-tech-200 line-clamp-2 mt-0.5">{tool.tagline}</p></div>
 </div>
 <div className="flex items-center gap-2">
 <span className={cn('inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium border', tool.pricing_tier === 'Free' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : tool.pricing_tier === 'Freemium' ? 'bg-sky-500/20 text-sky-400 border-sky-500/30' : 'bg-neon/20 text-neon-light border-neon/30')}>{tool.pricing_tier === 'Freemium' ? 'Free+' : tool.pricing_tier}</span>
 <div className="flex items-center gap-1"><Star className="w-2.5 h-2.5 fill-red-400 text-rose-400" /><span className="text-[10px] text-tech-200">{tool.avg_rating.toFixed(1)}</span></div>
 <div className="flex items-center gap-0.5 ml-auto"><TrendingUp className="w-2.5 h-2.5 text-neon-light" /><span className="text-[9px] text-neon-light font-medium">{tool.trending_score}</span></div>
 </div>
 </Link>
 ))}
 </div>
 <div className="mt-6 flex flex-wrap items-center gap-3">
 <Link href={`/categories/${sectionSlug}`} className="inline-flex items-center gap-1 text-xs text-tech-300 hover:text-neon-light transition">Browse all {section.name} tools for Japan<ArrowRight className="w-3 h-3" /></Link>
 </div>
 </section>
 );
 })}

 {/* FEATURED PLAYBOOKS */}
 <section className="border-y border-tech-500/20 bg-tech-800/50">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
 <div className="flex items-center gap-3 mb-6 sm:mb-8">
 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center shrink-0"><BookOpen className="w-5 h-5 text-rose-400" /></div>
 <div><h2 className="text-xl sm:text-2xl font-bold text-white">Step-by-Step AI Playbooks</h2><p className="text-xs sm:text-sm text-tech-200">Battle-tested guides to ship AI workflows — built for Japanese teams and startups</p></div>
 </div>
 <FeaturedPlaybooks />
 <div className="mt-8 text-center">
 <Link href="/playbooks" className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-tech-500/30 text-tech-100 hover:border-neon/30 hover:text-white text-sm font-medium transition-all">Browse all {playbooks.length} playbooks<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
 </div>
 </div>
 </section>

 {/* STATS BAR */}
 <section className="border-y border-tech-500/20 bg-tech-800/50">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
 {[
 { label: 'Curated AI Tools', value: `${totalCount}+`, icon: Layers },
 { label: 'Playbooks', value: `${playbooks.length}+`, icon: BookOpen },
 { label: 'Expert Rankings', value: '5+', icon: Trophy },
 { label: 'JP-Ready Filters', value: '4', icon: CheckCircle },
 ].map((stat) => (
 <div key={stat.label} className="flex flex-col items-center gap-2">
 <div className="w-10 h-10 rounded-xl bg-tech-600/60 flex items-center justify-center border border-tech-500/20"><stat.icon className="w-5 h-5 text-neon-light" /></div>
 <span className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</span>
 <span className="text-xs sm:text-sm text-tech-300">{stat.label}</span>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* LOCAL ECOSYSTEM */}
 <section className="border-y border-tech-500/20 bg-tech-800/50">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
 <div className="text-center mb-10">
 <div className="flex items-center justify-center gap-3 mb-3">
 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-rose-500/10 flex items-center justify-center shrink-0"><BookOpen className="w-5 h-5 text-rose-400" /></div>
 <h2 className="text-2xl sm:text-3xl font-bold text-white">Japan's AI Ecosystem Is a Global Robotics & Research Powerhouse</h2>
 </div>
 <p className="text-sm sm:text-base text-tech-200 max-w-2xl mx-auto">
 From Tokyo's RIKEN AIP and Matsuo Lab to Kyoto's ML research and Tsukuba's AIST, Japan produces world-leading robotics AI, manufacturing intelligence, and language technology — with a distinctly Japanese approach to Society 5.0.to responsible AI.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
 {[
 { title: '🗼 Tokyo — Robotics & AI Capital', description: 'Tokyo is Asia\'s leading AI city, anchored by the University of Tokyo\'s Matsuo Lab, RIKEN AIP in Odaiba, and Preferred Networks — Japan\'s most valuable AI startup. The ecosystem spans manufacturing AI, FinTech (Rakuten, Mercari), NLP for Japanese, and healthcare AI. The Tokyo Metropolitan Government\'s global startup acceleration programs and the Yaesu Innovation District drive AI commercialization.' },
 { title: '🎓 Kyoto/Osaka — Deep Tech & Manufacturing', description: 'The Kansai region hosts Kyoto University\'s world-class ML research, Osaka University\'s ISIR (Institute of Scientific and Industrial Research), and deep-tech AI in manufacturing robotics, semiconductor inspection, and healthcare imaging. Omron, Keyence, and Fanuc drive industrial AI innovation. Osaka\'s Grand Front R&D hub is a growing startup ecosystem.' },
 { title: '🏙️ Tsukuba & Fukuoka — AI Research Cities', description: 'Tsukuba Science City is home to AIST (National Institute of Advanced Industrial Science and Technology), Japan\'s largest public research organisation. Fukuoka\'s Startup City acceleration program is growing a vibrant AI community. Both cities offer dedicated AI compute resources and deep collaboration with government agencies like NEDO.' },
 { title: '🔬 METI & Japan AI Strategy', description: 'Japan\'s AI Strategy 2025, led by METI and the Cabinet Office, invests ¥1T+ ($7B+) in AI compute infrastructure, talent development, and societal adoption. Combined with JSPS KAKENHI grants, JST CREST AI research funding, NEDO technology development programs, the J-Startup programme, and the Startup Visa initiative, Japan offers comprehensive government support for AI startups and researchers.' },
 ].map((item) => (
 <div key={item.title} className="bg-tech-800/70 border border-tech-500/20 rounded-xl p-5 hover:border-neon/20 transition">
 <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
 <p className="text-sm text-tech-200 leading-relaxed">{item.description}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* CTA */}
 <section className="relative overflow-hidden border-t border-tech-500/20">
 <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />
 <div className="absolute top-[-30%] left-[-10%] w-[70%] h-[70%] bg-neon/10 rounded-full blur-[150px] pointer-events-none" />
 <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-aqua/10 rounded-full blur-[120px] pointer-events-none" />

 <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-700/10 border border-red-700/20 text-red-300 text-xs font-medium mb-6">
 <MapPin className="w-3.5 h-3.5" />
 Built for Japanese Founders, Researchers & Enterprises
 </div>
 <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
 Find the Right AI Tool for Your Japan Business
 </h2>
 <p className="mt-4 text-base sm:text-lg text-tech-200 max-w-2xl mx-auto">
 No more guessing if a tool complies with APPI, supports Japanese, or works for Japanese teams. Every tool on Apifeny AI is rated for Japan data compliance, JPY pricing, and Japanese language readiness. Start exploring — no account needed.
 </p>
 <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
 <Link href="/tools" className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-neon to-neon-dark text-white font-semibold text-sm sm:text-base transition-all hover:shadow-lg hover:shadow-neon/25 hover:-translate-y-0.5">
 <span>Explore All {totalCount}+ Tools</span>
 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
 </Link>
 <Link href="/categories" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-tech-500/40 text-tech-100 hover:border-neon/30 hover:text-white text-sm sm:text-base font-medium transition-all">
 Browse by Category
 </Link>
 </div>
 </div>
 </section>

 <BlogCategoryLinks slugs={['ai-tools', 'comparisons', 'productivity', 'solopreneur']} heading="Japan-Focused AI Guides" />
 <LandingPageCrossLinks currentSlug="ai-tools-japan" />

 {/* SEO FOOTER KEYWORDS */}
 <section className="border-t border-tech-500/20 bg-tech-800/50">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
 <div className="text-center">
 <p className="text-[10px] text-tech-400 leading-loose max-w-3xl mx-auto">
 <strong className="text-tech-300">Japan AI tools:</strong>{' '}
 best AI tools in Japan 2026 · AI tools for Japanese businesses · Japan AI software · AI writing tools Japan · AI coding tools Japan · AI marketing Japan · Japan AI directory · AI tools for Japanese startups · enterprise AI tools Japan · free AI tools Japan · AI productivity Japan · Japanese tech stack · 'AI tools for Tokyo · AI tools for Osaka · AI tools for Yokohama'
 </p>
 </div>
 </div>
 </section>
 </>
 );
}
