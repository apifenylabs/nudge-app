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
  title: 'Best AI Tools in Colombia (2026) — Curated for Colombian Teams & Startups',
  description: 'Discover the best AI tools for Colombian businesses and founders. Curated directory of 85+ tools ranked by trending score, Colombia-market readiness, and local relevance. Updated daily. Built for Bogotá, Medellín, Cali, and Colombia',
  ogTitle: 'Best AI Tools in Colombia (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for Colombia: iNNpulsa ecosystem, Latin America',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsColombiaPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Colombia', item: '/ai-tools-colombia' }]} />
      <GeoSeoSchema
        countryName="Colombia"
        countryCode="colombia"
        capital="Colombia"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Colombia"}
        slug="ai-tools-colombia"
        faqs={[
 { question: "What are the best AI tools in Colombia?", answer: "The best AI tools in Colombia include ChatGPT for content and productivity, GitHub Copilot for development, Claude for advanced reasoning, Canva AI for design, and Jasper for marketing. Colombia is Latin America's fastest-growing startup ecosystem — 2,126 startups, 3 unicorns (Rappi, Habi, Truora), and a 24% growth rate in 2025. These tools work well for Colombian businesses because they offer Spanish/English support, COP/USD flexibility, and strong data protection practices." },
 { question: "How does Colombian data privacy law (Law 1581) affect AI tool selection?", answer: "Colombia's Statutory Law 1581 of 2012 (Ley de Protección de Datos Personales) and its regulatory decrees impose strict requirements on how AI tools collect, use, and store personal data. The law is enforced by the SIC (Superintendencia de Industria y Comercio). Cross-border data transfers require adequate protections. We evaluate every tool for Colombian data protection compliance and LatAm data residency options." },
 { question: "What AI tools are best for Colombia's key industries?", answer: "Colombia's economy has distinct AI priorities: fintech AI in Bogotá and Medellín's booming financial ecosystem, logistics and mobility AI led by Rappi, edtech AI in Colombia's education technology scene, healthtech AI for healthcare, and creative AI in digital media. AI also transforms agriculture (coffee, flowers, bananas), energy, and manufacturing." },
 { question: "How can Colombian startups access AI funding and support?", answer: "Colombia offers extensive AI innovation support. iNNpulsa Colombia provides grants, co-investment, and acceleration programmes. Fondo Emprender (SENA) offers seed funding. The $111.5M National AI Policy funds AI adoption across sectors. Rockstart, Polymath Ventures, and K50 Ventures back Colombian AI startups. The ecosystem grew 24% in 2025." },
 { question: "What AI regulations exist in Colombia?", answer: "Colombia's AI regulatory framework is developing rapidly. The $111.5M National AI Policy (CONPES 4080) sets strategic direction. Law 1581 of 2012 governs personal data used in AI training, enforced by the SIC. The government is advancing a comprehensive AI law for high-impact AI systems. Sector-specific regulations apply: SFC for fintech AI, Invima for health AI, and MinTransporte for mobility AI. Colombia is a leader in LatAm AI governance." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-colombia',
          countryName: 'Colombia',
          countryCode: 'colombia',
          capital: 'Colombia',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-yellow-400 via-blue-600 to-red-600',
          heroTitle: 'Best AI Tools for Colombia in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-yellow-400 via-blue-600 to-red-600 bg-clip-text text-transparent">Colombia</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Colombia operates in english for business. We flag every tool for local language support — critical for serving customers across Colombia\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Colombia businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Colombia teams.' },
          { icon: Star, title: 'English Support', description: 'Colombia\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Colombia market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Colombia', item: '/ai-tools-colombia' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Colombia Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Colombia&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-colombia" />
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
