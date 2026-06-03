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
  title: 'Best AI Tools in Lithuania (2026) — Curated for Baltic Startups & Developers',
  description: 'Discover the best AI tools for Lithuanian businesses and developers. Curated directory of 85+ tools ranked by trending score, Lithuania-market readiness, and local relevance. Updated daily. Built for Vilnius tech ecosystem.',
  ogTitle: 'Best AI Tools in Lithuania (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for Lithuania: multilingual support, EUR pricing, GDPR compliance, and Baltic data center readiness. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsLithuaniaPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Lithuania', item: '/ai-tools-lithuania' }]} />
      <GeoSeoSchema
        countryName="Lithuania"
        countryCode="lithuania"
        capital="Lithuania"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Lithuania"}
        slug="ai-tools-lithuania"
        faqs={[
 {
 question: 'What AI tools are most popular in Lithuania?',
 answer:
 'The most popular AI tools in Lithuania include ChatGPT and DeepSeek for content generation, GitHub Copilot for development, Claude for analysis, and platform-specific tools for Lithuanian language NLP and Baltic business needs.',
 },
 {
 question:
 'Are these AI tools available in Lithuanian language?',
 answer:
 'Many top AI platforms now support Lithuanian or have strong multilingual capabilities. ChatGPT, Google Gemini, and DeepL offer Lithuanian interfaces or reliable Lithuanian text generation. We flag tools with explicit Lithuanian/Eastern European language support.',
 },
 {
 question:
 'Do AI tools on this directory support EUR pricing?',
 answer:
 'Yes, most SAAS tools listed here support EUR billing and EU VAT compliance. Lithuanian businesses benefit from EUR pricing without currency conversion fees. We note any tools with Lithuania-specific or Baltic regional pricing plans.',
 },
 {
 question:
 'How does GDPR affect AI tool usage in Lithuania?',
 answer:
 'Lithuania follows the EU General Data Protection Regulation (GDPR) with oversight by the State Data Protection Inspectorate (VDAI). All tools on our directory meet GDPR standards. Cloud providers with Baltic data centers offer the lowest latency for Lithuanian users.',
 },
 {
 question:
 'What industries in Lithuania benefit most from AI?',
 answer:
 'Lithuania\'s fintech, cybersecurity, biotech, laser technology, and logistics sectors are seeing the fastest AI adoption. Vilnius\'s growing startup ecosystem — home to companies like Kilo Health, Nord Security, and Vinted — combined with EU funding, creates strong demand for AI tools in development, automation, and analytics.',
 },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-lithuania',
          countryName: 'Lithuania',
          countryCode: 'lithuania',
          capital: 'Lithuania',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-yellow-400 via-green-600 to-red-600',
          heroTitle: 'Best AI Tools for Lithuania in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-yellow-400 via-green-600 to-red-600 bg-clip-text text-transparent">Lithuania</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Lithuania operates in english for business. We flag every tool for local language support — critical for serving customers across Lithuania\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Lithuania businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Lithuania teams.' },
          { icon: Star, title: 'English Support', description: 'Lithuania\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Lithuania market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Lithuania', item: '/ai-tools-lithuania' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Lithuania Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Lithuania&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-lithuania" />
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
