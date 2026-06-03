'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Sparkles, Layers, Star, Zap, BookOpen, Globe, Wallet, ShieldCheck, MapPin,
} from 'lucide-react';

import SeoMetadata from '@/components/SeoMetadata';
import FeaturedPlaybooks from '@/components/FeaturedPlaybooks';
import BlogCategoryLinks from '@/components/BlogCategoryLinks';
import LandingPageCrossLinks from '@/components/LandingPageCrossLinks';
import BrowseByCountry from '@/components/BrowseByCountry';
import { toolsData } from '@/lib/data';
import { playbooks } from '@/lib/playbooks';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import GeoSeoSchema from '@/components/GeoSeoSchema';
import CountryPageTemplate from '@/components/CountryPageTemplate';

const META = {
  title: 'Best AI Tools in Chile (2026) — Curated for Chilean Teams & Startups',
  description: 'Discover the best AI tools for Chilean businesses and founders. Curated directory of 85+ tools ranked by trending score, Chile-market readiness, and local relevance. Updated daily. Built for Santiago, Valparaíso, Concepción, and Chile.',
  ogTitle: 'Best AI Tools in Chile (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for Chile: CORFO ecosystem, Latin America',
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
        countryCode="chile"
        capital="Chile"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Chile"}
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

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-chile',
          countryName: 'Chile',
          countryCode: 'chile',
          capital: 'Chile',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-blue-700 via-white to-red-600',
          heroTitle: 'Best AI Tools for Chile in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-blue-700 via-white to-red-600 bg-clip-text text-transparent">Chile</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Chile operates in english for business. We flag every tool for local language support — critical for serving customers across Chile\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Chile businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Chile teams.' },
          { icon: Star, title: 'English Support', description: 'Chile\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Chile market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Chile', item: '/ai-tools-chile' },
        ]}
      />

      {/* FEATURED PLAYBOOKS */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-violet-600" />
              <span className="text-xs font-semibold text-violet-700 uppercase tracking-wider">Playbooks</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Chile Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Chile&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-chile" />
      </section>

      <BrowseByCountry />

      {/* BLOG LINKS */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BlogCategoryLinks />
        </div>
      </section>

      {/* FOMO BAR */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] sm:text-xs text-gray-500">
            <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-violet-500" /> Updated Daily</span>
            <span className="flex items-center gap-1"><BookOpen className="w-3 h-3 text-violet-500" /> {totalCount}+ tools</span>
            <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-500" /> Expert ranked</span>
          </div>
        </div>
      </div>
    </>
  );
}
