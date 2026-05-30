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
  title: 'Best AI Tools in Peru (2026) — Curated for Peruvian Startups & Developers',
  description:
    'Discover the best AI tools for Peruvian businesses and developers. Curated directory of 85+ tools ranked by trending score, Peru-market readiness, and local relevance. Updated daily. Built for Lima\'s tech ecosystem.',
  ogTitle: 'Best AI Tools in Peru (2026) — Apifeny AI',
  ogDescription:
    'Find AI tools built for Peru: Spanish-first, PEN/pricing, bilingual support, and LATAM data protection compliance. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsPeruPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Peru', item: '/ai-tools-peru' }]} />
      <GeoSeoSchema
        countryName="Peru"
        countryCode="PE"
        capital="Lima"
        currency="PEN"
        language="Spanish"
        languageCode="es"
        marketSize={"Peru's digital economy is surging, driven by a booming startup scene in Lima's 'Silicon Valley' — the San Isidro and Miraflores tech corridor. With over 500,000 IT professionals, a government-backed 'Digital Transformation Agenda' led by the Ministry of Production, and world-class engineering talent from UTEC and PUCP, Peru is positioned as a fast-growing AI hub in Latin America. Key sectors include fintech (with 40% of Peru's 150+ fintechs based in Lima), agritech serving the Andean region, and mining tech where AI is revolutionizing copper extraction efficiency."}
        slug="ai-tools-peru"
        faqs={[
          { question: "What are the best AI tools for Peruvian startups in 2026?", answer: "Top AI tools for Peruvian startups include ChatGPT for bilingual ES/EN workflows, Jasper for Spanish content marketing, GitHub Copilot for development, and Notion AI for project management. For LATAM expansion, HubSpot AI, Salesforce Einstein, and TensorFlow-based custom models are widely adopted." },
          { question: "How can Peruvian developers access paid AI tools with PEN pricing?", answer: "Most major AI platforms accept PEN credit cards through local issuing banks (BCP, Interbank, BBVA). Some tools offer LATAM-specific pricing tiers. Open-source alternatives are popular in universities, and free tiers from Google AI, Microsoft AI, and OpenAI provide robust entry points." },
          { question: "Do AI tools support Peruvian Spanish (with local dialects)?", answer: "Major AI platforms including ChatGPT, Claude, and Google AI support Peruvian Spanish variants. Natural language tools have improved significantly for LATAM dialects. For speech recognition, Peruvian-accented training data is increasingly available through regional AI research initiatives." },
          { question: "What AI tools are best for Peru's mining and agritech sectors?", answer: "For mining: computer vision platforms (DroneDeploy, Pix4D), predictive maintenance AI (Uptake, C3 AI), and geological ML tools. For agritech: satellite imagery AI (Cropio, Descartes Labs), soil analysis ML, and climate prediction models. Several local startups offer customized solutions." },
          { question: "Are there free AI learning resources for Peruvian students?", answer: "Yes — Microsoft Learn AI, Google AI Education, and AWS Educate offer free tiers. UTEC and PUCP provide subsidized AI certificates. The 'Peru AI' community on Discord/WhatsApp offers mentorship. Google's 'Crece con Google' program includes free AI workshops in Spanish." },
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-500/30 text-yellow-300 text-xs sm:text-sm font-medium mb-6 animate-fade-in">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Peru-Focused · Updated Daily · {totalCount}+ Curated Tools
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight animate-slide-up">
              Best AI Tools for{' '}
              <span className="bg-gradient-to-r from-[#D91023] via-white/20 to-[#D91023] bg-clip-text text-transparent">
                Peru
              </span>
              <br />
              <span className="text-tech-100">in 2026</span>
            </h1>

            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-tech-200 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Curated AI tools that <strong className="text-white">actually work for Peru</strong>. 
              and start building with AI tools designed for Peru's growing digital economy.
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
              <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-emerald-400" /><span>🇵🇪 Spanish</span></div>
              <div className="flex items-center gap-2"><Wallet className="w-4 h-4 text-yellow-400" /><span>💰 PEN</span></div>
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-aqua" /><span>🛡️ LATAM Data Law</span></div>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-neon-light" /><span>🚀 Digital Transformation</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* TOP TOOLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center shrink-0"><Trophy className="w-5 h-5 text-emerald-400" /></div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Top AI Tools in Peru</h2>
            </div>
            <p className="text-sm sm:text-base text-tech-200 ml-[52px]">Highest-rated tools across all categories — ranked by trending score and Peru-market readiness</p>
          </div>
          <Link href="/tools" className="group inline-flex items-center gap-1.5 text-sm text-neon-light hover:text-neon transition shrink-0">
            See full rankings<ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {top12.map((tool, i) => (
            <Link key={tool.id} href={`/tools/${tool.slug}`} className={cn('group relative block rounded-xl border border-tech-500/30 bg-tech-700 p-5 transition-all duration-300', 'hover:border-neon/40 hover:shadow-lg hover:shadow-neon/5 hover:-translate-y-1', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50')}>
              <div className={cn('absolute -top-2 -left-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-lg z-10', i === 0 ? 'bg-gradient-to-br text-yellow-400 text-black' : i === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-black' : i === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white' : 'bg-tech-500 text-tech-100 border border-tech-400/30')}>#{i + 1}</div>
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
                  {(() => { const stars = []; for (let i = 1; i <= 5; i++) { if (tool.avg_rating >= i) stars.push('full'); else if (tool.avg_rating >= i - 0.5) stars.push('half'); else stars.push('empty'); } return stars.map((s, si) => (<Star key={si} className={cn('w-3 h-3', s === 'full' ? 'fill-red-400 text-emerald-400' : s === 'half' ? 'fill-red-400/50 text-emerald-400' : 'fill-none text-tech-400')} />)); })()}
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-white/10 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-emerald-400" /></div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Why Peruvian Teams Need Localized AI Tools</h2>
            </div>
            <p className="text-sm sm:text-base text-tech-200 max-w-xl mx-auto">Peruvian businesses face unique challenges — a rapidly digitizing economy driven by fintech, world-leading mining operations undergoing AI transformation, a bilingual Spanish/English user base, and LATAM-specific data protection laws. Generic AI tools miss critical requirements: native Peruvian Spanish support, PEN pricing sensitivity, compliance with Ley 29733, and offline-capable deployments for remote mining sites. Our Peru-curated directory filters for tools that understand these realities.regulatory and cultural landscape.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {[
              { icon: Globe, title: '🇵🇪 500K+ IT Professionals', description: 'Peru\'s tech workforce spans 500,000+ IT professionals, with UTEC and PUCP producing top AI/ML engineers. Lima\'s tech corridor in San Isidro and Miraflores is the epicenter of innovation.', gradient: 'from-neon/10 to-purple-900/10' },
              { icon: ShieldCheck, title: '📜 LATAM Data Protection Law', description: 'Peru\'s Personal Data Protection Law (Ley 29733) and the newly created National Data Protection Authority enforce strict data governance. AI companies must comply with both local law and cross-border LATAM regulations.', gradient: 'from-red-500/10 to-rose-900/10' },
              { icon: Zap, title: '🎓 World-Class Engineering Education', description: 'UTEC (Universidad de Ingeniería y Tecnología) ranks among Latin America\'s top engineering schools. PUCP, UNI, and USIL have launched dedicated AI/ML tracks, producing graduates for global tech firms.', gradient: 'from-aqua/10 to-cyan-900/10' },
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
                <h2 className="text-xl sm:text-2xl font-bold text-white">Best AI {section.name.replace('Writing & Content', 'Writing Tools').replace('Code & Development', 'Coding Tools').replace('Marketing & SEO', 'Marketing Tools')} for Peru</h2>
                <p className="text-sm text-tech-200 mt-1 max-w-xl">Top picks for Peruvian teams — rated for Spanish support, PEN-friendly pricing, data sovereignty, and LATAM infrastructure.</p>
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
                    <div className="flex items-center gap-1"><Star className="w-2.5 h-2.5 fill-red-400 text-emerald-400" /><span className="text-[10px] text-tech-200">{tool.avg_rating.toFixed(1)}</span></div>
                    <div className="flex items-center gap-0.5 ml-auto"><TrendingUp className="w-2.5 h-2.5 text-neon-light" /><span className="text-[9px] text-neon-light font-medium">{tool.trending_score}</span></div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href={`/categories/${sectionSlug}`} className="inline-flex items-center gap-1 text-xs text-tech-300 hover:text-neon-light transition">Browse all {section.name} tools for Peru<ArrowRight className="w-3 h-3" /></Link>
            </div>
          </section>
        );
      })}

      {/* FEATURED PLAYBOOKS */}
      <section className="border-y border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center shrink-0"><BookOpen className="w-5 h-5 text-emerald-400" /></div>
            <div><h2 className="text-xl sm:text-2xl font-bold text-white">Step-by-Step AI Playbooks</h2><p className="text-xs sm:text-sm text-tech-200">Battle-tested guides to ship AI workflows — built for teams and startups</p></div>
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
              { label: 'Peru Filters', value: '4', icon: CheckCircle },
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-rose-500/10 flex items-center justify-center shrink-0"><BookOpen className="w-5 h-5 text-emerald-400" /></div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">🇵🇪 Peru's AI Ecosystem</h2>
            </div>
            <p className="text-sm sm:text-base text-tech-200 max-w-2xl mx-auto">
              Peru's AI ecosystem combines the energy of Lima's startup scene, the practical demands of the mining and agriculture industries, and a government pushing digital transformation. With world-class engineering from UTEC and PUCP, Peru is emerging as a Latin American AI contender.to responsible AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {[
              { title: '🏛️ Lima — Startup Hub & Innovation Districts', description: 'Lima\'s San Isidro and Miraflores districts form Peru\'s tech corridor, home to 300+ startups, incubators like UTEC Ventures, and innovation labs from major corporations. The \'Startup Peru\' program by the Ministry of Production provides grants and acceleration.' },
              { title: '🌄 Arequipa & Cusco — Emerging Tech Hubs', description: 'Arequipa\'s tech park and Cusco\'s digital nomad scene are attracting remote AI talent. University partnerships with UTEC are expanding AI education beyond Lima, with specialized agritech and tourism AI programs.' },
              { title: '⛏️ Mining AI — A Peruvian Competitive Advantage', description: 'Peru is the world\'s second-largest copper producer. Mining AI startups like Wayra and Khipu are applying computer vision and predictive analytics to optimize extraction, safety, and environmental monitoring — a uniquely Peruvian AI niche.' },
              { title: '💳 Fintech & Digital Payments Boom', description: 'With 150+ fintechs, Peru\'s digital payments revolution is AI-driven. Platforms like Yape (BCP), Lukita, and Kushki use machine learning for credit scoring, fraud detection, and financial inclusion for the 57% unbanked population.' },
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-500/30 text-yellow-300 text-xs font-medium mb-6">
            <MapPin className="w-3.5 h-3.5" />
            Built for Peruvian founders, Researchers & Enterprises
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            Find the Right AI Tool for Your Business
          </h2>
          <p className="mt-4 text-base sm:text-lg text-tech-200 max-w-2xl mx-auto">
            No more guessing if a tool complies with local privacy regulations, supports French, or works for Peruvian teams. Every tool on Apifeny AI is rated for local data compliance, local currency pricing, and local readiness. Start exploring — no account needed.
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

      <BlogCategoryLinks slugs={['ai-tools', 'comparisons', 'productivity', 'solopreneur']} heading="How to Choose AI Tools for Your Peruvian Business" />
      <LandingPageCrossLinks currentSlug="ai-tools-peru" />

      {/* SEO FOOTER KEYWORDS */}
      <section className="border-t border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="text-center">
            <p className="text-[10px] text-tech-400 leading-loose max-w-3xl mx-auto">
              <strong className="text-tech-300">Peru AI tools:</strong>{' '}
              AI tools Peru, best AI tools Peru 2026, Peru AI directory, AI for Peruvian businesses, Lima AI startups, AI tools Spanish, Peru machine learning, AI fintech Peru, mining AI Peru, AI agritech Peru 
              AI tools · AI tools · AI tools
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
