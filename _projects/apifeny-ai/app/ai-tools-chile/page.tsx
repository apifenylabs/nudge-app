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
  title: 'Best AI Tools in Chile (2026) — Curated for Chilean Teams & Startups',
  description:
    'Discover the best AI tools for Chilean businesses and founders. Curated directory of 85+ tools ranked by trending score, Chile-market readiness, and local relevance. Updated daily. Built for Santiago, Valparaíso, Concepción, and Chile\'s thriving AI ecosystem.',
  ogTitle: 'Best AI Tools in Chile (2026) — Apifeny AI',
  ogDescription:
    'Find AI tools built for Chile: CORFO ecosystem, Latin America\'s most competitive economy, CLP/USD pricing, and Spanish/English support. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsChilePage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Chile', item: '/ai-tools-chile' }]} />
      <GeoSeoSchema
        countryName="Chile"
        countryCode="cl"
        capital="Santiago"
        currency="CLP"
        language="Spanish / English"
        languageCode="es"
        marketSize={"$340B economy, 19.5M population, Latin America's most competitive startup ecosystem — home to CORFO, two unicorns, strong mining AI, fintech, and agtech sectors, and a growing Santiago innovation hub"}
        slug="ai-tools-chile"
        faqs={[
          { question: "What are the best AI tools in Chile?", answer: "The best AI tools in Chile include ChatGPT for content and productivity, GitHub Copilot for development, Claude for advanced reasoning, Canva AI for design, and Jasper for marketing. Chile is Latin America's most competitive startup ecosystem — home to CORFO, two unicorns (Buk, Xepelin), and a growing tech scene in Santiago. These tools work well for Chilean businesses because they offer Spanish/English support, CLP/USD flexibility, and strong data protection practices." },
          { question: "How does Chilean data privacy law (Law 19.628) affect AI tool selection?", answer: "Chile's Law No. 19.628 (Ley de Protección de la Vida Privada) governs personal data processing, enforced by the Council for Transparency (CPLT). A comprehensive new Data Protection Bill is advancing through Congress, inspired by the GDPR, introducing stronger requirements for AI training data. We evaluate every tool for Chilean data protection compliance and LatAm data residency options." },
          { question: "What AI tools are best for Chile's key industries?", answer: "Chile's economy has distinct AI priorities: mining AI for the world's largest copper and second-largest lithium producer, agtech AI for Chile's wine, salmon, and fruit exports, fintech AI in Santiago's financial ecosystem, and renewable energy AI for Chile's world-leading solar and wind sectors. AI also transforms Chile's retail, logistics, and healthcare sectors." },
          { question: "How can Chilean startups access AI funding and support?", answer: "Chile offers extensive AI innovation support. CORFO provides equity-free grants up to $100K and 35% R&D tax credits through programmes like Start-Up Chile. ProChile supports international expansion. Universities (PUC, UChile, USM, UAI) offer research partnerships. Angel networks like ChileGlobal Angels and VC funds like FEN Ventures back Chilean AI startups." },
          { question: "What AI regulations exist in Chile?", answer: "Chile's AI regulatory framework is evolving. The National AI Policy sets strategic direction for responsible AI development. A new Data Protection Bill inspired by the GDPR is advancing through Congress. Sector-specific regulations apply: CMF for fintech AI, SERNAGEOMIN for mining AI, and ISP for health AI. Chile aligns with OECD AI Principles." },
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs sm:text-sm font-medium mb-6 animate-fade-in">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Chile-Focused · Updated Daily · {totalCount}+ Curated Tools
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight animate-slide-up">
              Best AI Tools for{' '}
              <span className="bg-gradient-to-r from-red-500 via-white to-red-400 bg-clip-text text-transparent">
                Chile
              </span>
              <br />
              <span className="text-tech-100">in 2026</span>
            </h1>

            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-tech-200 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Curated AI tools that <strong className="text-white">actually work for Chile</strong>. 
              We rank every tool on Chilean data compliance, CLP/USD pricing, and Spanish/English support,
              and Chile AI ecosystem readiness — so you find tools built for Chile's unique market.
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
              <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-red-400" /><span>Español / English</span></div>
              <div className="flex items-center gap-2"><Wallet className="w-4 h-4 text-yellow-400" /><span>CLP/USD Pricing</span></div>
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-aqua" /><span>Ley de Protección de Datos</span></div>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-neon-light" /><span>Chile Tech-Ready</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* TOP TOOLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center shrink-0"><Trophy className="w-5 h-5 text-red-400" /></div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Top AI Tools in Chile</h2>
            </div>
            <p className="text-sm sm:text-base text-tech-200 ml-[52px]">Highest-rated tools across all categories — ranked by trending score and Chile-market readiness</p>
          </div>
          <Link href="/tools" className="group inline-flex items-center gap-1.5 text-sm text-neon-light hover:text-neon transition shrink-0">
            See full rankings<ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {top12.map((tool, i) => (
            <Link key={tool.id} href={`/tools/${tool.slug}`} className={cn('group relative block rounded-xl border border-tech-500/30 bg-tech-700 p-5 transition-all duration-300', 'hover:border-neon/40 hover:shadow-lg hover:shadow-neon/5 hover:-translate-y-1', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50')}>
              <div className={cn('absolute -top-2 -left-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-lg z-10', i === 0 ? 'bg-gradient-to-br from-red-500 to-white text-black' : i === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-black' : i === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white' : 'bg-tech-500 text-tech-100 border border-tech-400/30')}>#{i + 1}</div>
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
                  {(() => { const stars = []; for (let i = 1; i <= 5; i++) { if (tool.avg_rating >= i) stars.push('full'); else if (tool.avg_rating >= i - 0.5) stars.push('half'); else stars.push('empty'); } return stars.map((s, si) => (<Star key={si} className={cn('w-3 h-3', s === 'full' ? 'fill-red-400 text-red-400' : s === 'half' ? 'fill-red-400/50 text-red-400' : 'fill-none text-tech-400')} />)); })()}
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

      {/* WHY CANADA MATTERS */}
      <section className="border-y border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-white/10 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-red-400" /></div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Why Chile Needs Its Own AI Tool Directory</h2>
            </div>
            <p className="text-sm sm:text-base text-tech-200 max-w-xl mx-auto">Chile's AI ecosystem is unique — Latin America's most competitive economy with world-leading mining AI, agtech innovation, and a rapidly growing startup scene backed by CORFO and Start-Up Chile.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {[
              { icon: Globe, title: 'Español/English Ready', description: 'Chile is a Spanish-speaking nation with strong English proficiency in the tech sector. We flag every tool for Spanish-language support and bilingual readiness — critical for serving markets across Latin America.', gradient: 'from-neon/10 to-purple-900/10' },
              { icon: ShieldCheck, title: 'Law 19.628 — Chilean Privacy Framework', description: 'Chile\'s data protection law (Law 19.628) is enforced by the Council for Transparency (CPLT). A new comprehensive Data Protection Bill inspired by GDPR is advancing through Congress, introducing stronger requirements for AI training data and cross-border transfers.', gradient: 'from-red-500/10 to-rose-900/10' },
              { icon: Zap, title: 'CORFO & Start-Up Chile Ecosystem', description: 'CORFO provides equity-free grants up to $100K and 35% R&D tax credits through Start-Up Chile and other innovation programmes. Chile\'s two unicorns (Buk, Xepelin) and growing VC ecosystem make it Latin America\'s most attractive AI startup destination.', gradient: 'from-aqua/10 to-cyan-900/10' },
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
                <h2 className="text-xl sm:text-2xl font-bold text-white">Best AI {section.name.replace('Writing & Content', 'Writing Tools').replace('Code & Development', 'Coding Tools').replace('Design & Creative', 'Design Tools').replace('Marketing & SEO', 'Marketing Tools')} for Chile</h2>
                <p className="text-sm text-tech-200 mt-1 max-w-xl">Top picks for chilean teams — rated for local relevance and CLP/USD pricing.</p>
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
                    <div className="flex items-center gap-1"><Star className="w-2.5 h-2.5 fill-red-400 text-red-400" /><span className="text-[10px] text-tech-200">{tool.avg_rating.toFixed(1)}</span></div>
                    <div className="flex items-center gap-0.5 ml-auto"><TrendingUp className="w-2.5 h-2.5 text-neon-light" /><span className="text-[9px] text-neon-light font-medium">{tool.trending_score}</span></div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href={`/categories/${sectionSlug}`} className="inline-flex items-center gap-1 text-xs text-tech-300 hover:text-neon-light transition">Browse all {section.name} tools for Chile<ArrowRight className="w-3 h-3" /></Link>
            </div>
          </section>
        );
      })}

      {/* FEATURED PLAYBOOKS */}
      <section className="border-y border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center shrink-0"><BookOpen className="w-5 h-5 text-red-400" /></div>
            <div><h2 className="text-xl sm:text-2xl font-bold text-white">Step-by-Step AI Playbooks</h2><p className="text-xs sm:text-sm text-tech-200">Battle-tested guides to ship AI workflows — built for chile teams and startups</p></div>
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
              { label: 'CL-Ready Filters', value: '4', icon: CheckCircle },
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

      {/* CANADA ECOSYSTEM */}
      <section className="border-y border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-rose-500/10 flex items-center justify-center shrink-0"><BookOpen className="w-5 h-5 text-red-400" /></div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Chile's AI Ecosystem Is Latin America's Most Competitive</h2>
            </div>
            <p className="text-sm sm:text-base text-tech-200 max-w-2xl mx-auto">
              From Santiago's innovation hub to the Atacama Desert's solar AI, Chile produces world-class AI research
              and Latin America's most competitive tech ecosystem. These four pillars power
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {[
              { title: '🇨🇦 🇨🇱 Santiago — CORFO & Innovation Hub', description: 'Santiago is the heart of Chile\'s AI ecosystem, home to CORFO, Start-Up Chile, and a growing concentration of AI startups, accelerators, and VC firms. The city\'s innovation district hosts coworking spaces, university labs, and corporate innovation centres.' },
              { title: '🎓 ⛏️ Antofagasta — Mining AI & Resources', description: 'Antofagasta is the world\'s copper mining capital and a leader in mining AI. Companies use AI for predictive maintenance, autonomous haulage, and mineral processing optimisation. Chile\'s copper mines are among the most technologically advanced globally.' },
              { title: '🏢 🌱 Valparaíso — Agtech & Biotech AI', description: 'Valparaíso and the Central Valley drive Chile\'s agtech AI revolution. From precision agriculture in vineyards to AI-powered salmon farming, Chile\'s agricultural sector leverages AI for global export competitiveness in wine, fruit, and seafood.' },
              { title: '🔬 Concepción — Energy & Green Tech AI', description: 'Concepción and the Bio-Bío region lead Chile\'s renewable energy AI transformation. Chile has the world\'s highest solar radiation levels in the Atacama Desert and massive wind potential — AI optimises grid integration, battery storage, and green hydrogen production.' },
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-medium mb-6">
            <MapPin className="w-3.5 h-3.5" />
            Built for Chile Founders, Teams & Innovators
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            Find the Right AI Tool for Your Chile Business
          </h2>
          <p className="mt-4 text-base sm:text-lg text-tech-200 max-w-2xl mx-auto">
            No more guessing if a tool works for Chile's market, or respects local data laws. Every tool on Apifeny AI is rated for Chile data compliance, local pricing, and relevance. Start exploring — no account needed.
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

      <BlogCategoryLinks slugs={['ai-tools', 'comparisons', 'productivity', 'solopreneur']} heading="Chile-Focused AI Guides" />
      <LandingPageCrossLinks currentSlug="ai-tools-chile" />

      {/* SEO FOOTER KEYWORDS */}
      <section className="border-t border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="text-center">
            <p className="text-[10px] text-tech-400 leading-loose max-w-3xl mx-auto">
              <strong className="text-tech-300">Chile AI tools:</strong>{' '}
              best AI tools in Chile 2026 · AI tools for Chilean businesses · Chile AI software · AI writing tools Chile · AI coding tools Chile · AI marketing Chile · Chile AI directory · AI tools for Chilean startups · enterprise AI tools Chile · free AI tools Chile · AI productivity Chile · Chilean tech stack · AI tools Santiago · AI tools Valparaíso · AI tools Concepción
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
