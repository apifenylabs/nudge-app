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
 title: 'Best AI Tools in Luxembourg (2026) — Curated for Luxembourgish Teams & Startups',
 description:
 'Discover the best AI tools for Luxembourgish businesses and founders. Find GDPR-compliant, EUR-priced AI tools for Luxembourg City startups, the finance sector, and space-tech ecosystem.',
 ogTitle: 'Best AI Tools in Luxembourg (2026) — Apifeny AI',
 ogDescription:
 'Find AI tools purpose-built for Luxembourg: EU GDPR compliance, EUR pricing, and multilingual (Luxembourgish / French / German / English) support. Curated for the finance hub and EU institution capital.',
 ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
 return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
 return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsLuxembourgPage() {
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
 <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Luxembourg', item: '/ai-tools-luxembourg' }]} />
 <GeoSeoSchema
 countryName="Luxembourg"
 countryCode="lu"
 capital="Luxembourg City"
 currency="EUR"
 language="Luxembourgish / French / German / English"
 languageCode="en"
 marketSize={"Small but wealthy economy, 650K population, global finance and EU institution hub (European Court of Justice, European Investment Bank), rapidly growing fintech and space tech sector, strong digital infrastructure"}
 slug="ai-tools-luxembourg"
 faqs={[
 { question: "What are the best AI tools in Luxembourg?", answer: "The best AI tools in Luxembourg include ChatGPT for content and productivity, GitHub Copilot for development, Claude for advanced reasoning, Canva AI for design, and Jasper for marketing. Luxembourg is an EU powerhouse in finance, fintech, and space technology — home to the European Court of Justice, European Investment Bank, SES satellite communications, and a thriving fund management industry. The country's AI ecosystem is driven by the Luxembourg AI Strategy (AI4LU), Luxinnovation, Interdisciplinary Centre for Security, Reliability and Trust (SnT) at Uni.lu, and the Luxembourg National Data Service (LNDS)." },
 { question: "How does GDPR affect Luxembourgish AI tool selection?", answer: "Luxembourg is an EU member state, so the General Data Protection Regulation (GDPR) applies in full with oversight from the Commission Nationale pour la Protection des Données (CNPD). The CNPD enforces strict standards on how AI tools collect, process, and store personal data. Luxembourg-based businesses — especially in finance and EU institutions — must ensure AI tools meet GDPR requirements including data residency within the EEA, DPA compliance documentation, data processing agreements (DPAs), and rights to explanation for automated decisions. The proposed EU AI Act adds additional obligations for high-risk AI systems, with CNPD expected to play a key enforcement role." },
 { question: "What AI tools are best for Luxembourg's finance sector?", answer: "Luxembourg holds the world's second-largest investment fund centre after the US, manages over €5 trillion in fund assets, and hosts the European Investment Bank (EIB). AI tools for this sector require: regulatory compliance with CSSF (Commission de Surveillance du Secteur Financier) guidelines, secure data handling for fund management and wealth advisory, automated AML/KYC screening, portfolio risk analysis with model explainability, multilingual reporting in English, French, and German, and integration with Bloomberg, Refinitiv, and other financial data platforms. Document intelligence tools for fund prospectuses and regulatory filings are especially in demand in Luxembourg's asset management ecosystem." },
 { question: "How can Luxembourgish startups access AI funding?", answer: "Luxembourg offers extensive AI innovation support. The Luxembourg AI Strategy (AI4LU) coordinates national AI policy and funding. Luxinnovation provides guidance and matchmaking for AI projects. The Fit4Start programme offers up to €150K for early-stage AI startups. The Luxembourg National Research Fund (FNR) funds AI research through CORE and BRIDGES programmes. Horizon Europe, the EU's €95.5B research framework, funds Luxembourg-based AI consortia. The European Space Agency (ESA) Business Incubation Centre (BIC) Luxembourg supports space-adjacent AI startups. The Ministry of the Economy offers digital transformation vouchers for AI adoption by SMEs. The Luxembourg House of Financial Technology (LHoFT) supports fintech AI startups." },
 { question: "What AI regulations exist in Luxembourg?", answer: "Luxembourg's AI regulatory framework is multi-layered. The EU AI Act, passed in 2024, establishes risk-based requirements for AI systems including transparency, human oversight, and conformity assessments for high-risk applications. GDPR, enforced locally by the CNPD, governs all personal data used in AI training and inference. The CSSF regulates AI in financial services including automated advising, credit scoring, and anti-money laundering. The EU Digital Operational Resilience Act (DORA) imposes ICT risk management requirements on financial entities using AI. The EU Data Act and Data Governance Act affect how AI tools access and process data. National AI legislation is being developed under the AI4LU strategy, with potential new laws on AI accountability in the finance sector." },
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
 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-700/10 border border-blue-700/20 text-blue-300 text-xs sm:text-sm font-medium mb-6 animate-fade-in">
 <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
 Luxembourg-Focused · Updated Daily · {totalCount}+ Curated Tools
 </div>

 <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight animate-slide-up">
 Best AI Tools for{' '}
 <span className="bg-gradient-to-r from-blue-500 via-white to-blue-300 bg-clip-text text-transparent">
 Luxembourg
 </span>
 <br />
 <span className="text-tech-100">in 2026</span>
 </h1>

 <p className="mt-5 sm:mt-6 text-base sm:text-lg text-tech-200 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
 Curated AI tools that <strong className="text-white">actually work for Luxembourg</strong>. 
 We rank every tool on GDPR compliance, EUR pricing, multilingual (Luxembourgish / French / German / English) support, and finance-sector readiness for Luxembourg City businesses.
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
 <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-blue-400" /><span>Lëtzebuergesch / FR / DE / EN</span></div>
 <div className="flex items-center gap-2"><Wallet className="w-4 h-4 text-yellow-400" /><span>EUR Pricing</span></div>
 <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-aqua" /><span>EU GDPR + Finance-Grade</span></div>
 <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-neon-light" /><span>EU Institution Ready</span></div>
 </div>
 </div>
 </div>
 </section>

 {/* TOP TOOLS */}
 <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
 <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
 <div>
 <div className="flex items-center gap-3 mb-2">
 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center shrink-0"><Trophy className="w-5 h-5 text-blue-400" /></div>
 <h2 className="text-2xl sm:text-3xl font-bold text-white">Top AI Tools in Luxembourg</h2>
 </div>
 <p className="text-sm sm:text-base text-tech-200 ml-[52px]">Highest-rated tools across all categories — ranked by trending score and Luxembourg-market readiness</p>
 </div>
 <Link href="/tools" className="group inline-flex items-center gap-1.5 text-sm text-neon-light hover:text-neon transition shrink-0">
 See full rankings<ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
 </Link>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
 {top12.map((tool, i) => (
 <Link key={tool.id} href={`/tools/${tool.slug}`} className={cn('group relative block rounded-xl border border-tech-500/30 bg-tech-700 p-5 transition-all duration-300', 'hover:border-neon/40 hover:shadow-lg hover:shadow-neon/5 hover:-translate-y-1', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50')}>
 <div className={cn('absolute -top-2 -left-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-lg z-10', i === 0 ? 'bg-gradient-to-br from-blue-600 to-white text-black' : i === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-black' : i === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white' : 'bg-tech-500 text-tech-100 border border-tech-400/30')}>#{i + 1}</div>
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
 {(() => { const stars = []; for (let i = 1; i <= 5; i++) { if (tool.avg_rating >= i) stars.push('full'); else if (tool.avg_rating >= i - 0.5) stars.push('half'); else stars.push('empty'); } return stars.map((s, si) => (<Star key={si} className={cn('w-3 h-3', s === 'full' ? 'fill-red-400 text-blue-400' : s === 'half' ? 'fill-red-400/50 text-blue-400' : 'fill-none text-tech-400')} />)); })()}
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

 {/* WHY LUXEMBOURG MATTERS */}
 <section className="border-y border-tech-500/20 bg-tech-800/50">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
 <div className="text-center mb-10 sm:mb-12">
 <div className="flex items-center justify-center gap-3 mb-3">
 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-white/10 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-blue-400" /></div>
 <h2 className="text-2xl sm:text-3xl font-bold text-white">Why Luxembourg Needs Its Own AI Tool Directory</h2>
 </div>
 <p className="text-sm sm:text-base text-tech-200 max-w-xl mx-auto">Luxembourg's AI ecosystem is unique — a global finance powerhouse meets EU institution capital with a booming space tech sector.</p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
 {[
 { icon: Globe, title: 'EU Institution Hub Advantage', description: 'Luxembourg hosts the European Court of Justice, European Court of Auditors, European Investment Bank, and European Stability Mechanism. AI tools here need EU institutional-grade compliance, multilingual documentation, and GDPR-first architecture.', gradient: 'from-neon/10 to-purple-900/10' },
 { icon: ShieldCheck, title: 'Finance Sector AI Compliance', description: 'With over €5 trillion in fund assets and CSSF regulatory oversight, Luxembourg\'s finance sector demands AI tools that handle AML/KYC, portfolio risk analysis, and automated reporting with full explainability and audit trails.', gradient: 'from-red-500/10 to-rose-900/10' },
 { icon: Zap, title: 'Space Tech & Satellite AI', description: 'Luxembourg is the home of SES, the world\'s leading satellite operator, and hosts the ESA Business Incubation Centre. The country leads in satellite data analytics, Earth observation AI, and space communications technology through the Luxembourg Space Agency.', gradient: 'from-aqua/10 to-cyan-900/10' },
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
 <h2 className="text-xl sm:text-2xl font-bold text-white">Best AI {section.name.replace('Writing & Content', 'Writing Tools').replace('Code & Development', 'Coding Tools').replace('Marketing & SEO', 'Marketing Tools')} for Luxembourg</h2>
 <p className="text-sm text-tech-200 mt-1 max-w-xl">Highest-rated tools ranked by EU compliance and finance-sector readiness.</p>
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
 <div className="flex items-center gap-1"><Star className="w-2.5 h-2.5 fill-red-400 text-blue-400" /><span className="text-[10px] text-tech-200">{tool.avg_rating.toFixed(1)}</span></div>
 <div className="flex items-center gap-0.5 ml-auto"><TrendingUp className="w-2.5 h-2.5 text-neon-light" /><span className="text-[9px] text-neon-light font-medium">{tool.trending_score}</span></div>
 </div>
 </Link>
 ))}
 </div>
 <div className="mt-6 flex flex-wrap items-center gap-3">
 <Link href={`/categories/${sectionSlug}`} className="inline-flex items-center gap-1 text-xs text-tech-300 hover:text-neon-light transition">Browse all {section.name} tools for Luxembourg<ArrowRight className="w-3 h-3" /></Link>
 </div>
 </section>
 );
 })}

 {/* FEATURED PLAYBOOKS */}
 <section className="border-y border-tech-500/20 bg-tech-800/50">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
 <div className="flex items-center gap-3 mb-6 sm:mb-8">
 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center shrink-0"><BookOpen className="w-5 h-5 text-blue-400" /></div>
 <div><h2 className="text-xl sm:text-2xl font-bold text-white">Step-by-Step AI Playbooks</h2><p className="text-xs sm:text-sm text-tech-200">Battle-tested guides to ship AI workflows — built for Luxembourgish teams and startups</p></div>
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
 { label: 'LU-Ready Filters', value: '4', icon: CheckCircle },
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

 {/* LUXEMBOURG'S AI ECOSYSTEM */}
 <section className="border-y border-tech-500/20 bg-tech-800/50">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
 <div className="text-center mb-10">
 <div className="flex items-center justify-center gap-3 mb-3">
 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-rose-500/10 flex items-center justify-center shrink-0"><BookOpen className="w-5 h-5 text-blue-400" /></div>
 <h2 className="text-2xl sm:text-3xl font-bold text-white">Luxembourg's AI Ecosystem Is a Finance & Space Powerhouse</h2>
 </div>
 <p className="text-sm sm:text-base text-tech-200 max-w-2xl mx-auto">
 From Luxembourg City's finance district to the Kirchberg EU quarter and the space tech valley, Luxembourg produces world-leading AI for regulated industries.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
 {[
 { title: '💰 Luxembourg City — Finance Hub', description: 'Luxembourg City is the world\'s second-largest investment fund centre, home to the Luxembourg Stock Exchange and over 130 banks. AI tools here need CSSF compliance, fund analytics, and secure document processing.' },
 { title: '🛰️ Space Tech & Satellite AI', description: 'Luxembourg leads Europe in space tech with SES (world\'s largest satellite operator), ESA BIC Luxembourg, and a thriving space startup ecosystem. AI for Earth observation, satellite data, and space communications is a national priority.' },
 { title: '🗣️ Multilingual AI Needs', description: 'With three official languages (Luxembourgish, French, German) plus widespread English and Portuguese, Luxembourg requires AI tools with strong multilingual NLP, translation, and localisation capabilities — a unique challenge in European AI deployment.' },
 { title: '🚀 Luxinnovation Startup Ecosystem', description: 'Luxinnovation supports over 400 tech startups through Fit4Start, the Luxembourg Space Cluster, and LHoFT fintech hub. The University of Luxembourg\'s SnT centre leads AI research in cybersecurity, fintech, and space systems.' },
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
 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-700/10 border border-blue-700/20 text-blue-300 text-xs font-medium mb-6">
 <MapPin className="w-3.5 h-3.5" />
 Built for Luxembourgish Founders, Finance Professionals & EU Institutions
 </div>
 <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
 Find the Right AI Tool for Your Luxembourg Business
 </h2>
 <p className="mt-4 text-base sm:text-lg text-tech-200 max-w-2xl mx-auto">
 No more guessing if a tool complies with GDPR and CSSF rules, supports multilingual workflows, or works for Luxembourgish teams. Every tool on Apifeny AI is rated for EU data compliance, EUR pricing, and finance-grade readiness. Start exploring — no account needed.
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

 <BlogCategoryLinks slugs={['ai-tools', 'comparisons', 'productivity', 'solopreneur']} heading="Luxembourg-Focused AI Guides" />
 <LandingPageCrossLinks currentSlug="ai-tools-luxembourg" />

 {/* SEO FOOTER KEYWORDS */}
 <section className="border-t border-tech-500/20 bg-tech-800/50">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
 <div className="text-center">
 <p className="text-[10px] text-tech-400 leading-loose max-w-3xl mx-auto">
 <strong className="text-tech-300">Luxembourg AI tools:</strong>{' '}
 best AI tools in Luxembourg 2026 · AI tools for Luxembourgish businesses · Luxembourg AI software · AI coding tools Luxembourg · AI marketing Luxembourg · Luxembourg AI directory ·
 AI tools Luxembourg City · AI tools finance sector · AI tools EU institutions · AI compliance GDPR Luxembourg · CSSF AI guidelines · CNPD data protection ·
 AI for asset management Luxembourg · AI for fund management · Luxembourg fintech AI tools ·
 AI tools Lëtzebuerg · Luxembourg space tech AI · SES AI tools · ESA BIC Luxembourg AI ·
 AI startups Luxembourg · Luxinnovation AI funding · Fit4Start AI programme ·
 AI tools Kirchberg · AI tools Belval · multilingual AI tools Luxembourgish French German
 </p>
 </div>
 </div>
 </section>
 </>
 );
}