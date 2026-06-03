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
  title: 'Best AI Tools in Uruguay (2026) — Curated for Uruguayan Teams & Startups',
  description: 'Discover top AI tools for Uruguayan businesses and founders. Curated directory of AI apps ranked for Uruguay-market readiness and local relevance.',
  ogTitle: 'Best AI Tools in Uruguay (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for Uruguay: UYU pricing, Spanish/English support, local relevance. Expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsUruguayPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Uruguay', item: '/ai-tools-uruguay' }]} />
      <GeoSeoSchema
        countryName="Uruguay"
        countryCode="uruguay"
        capital="Uruguay"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Uruguay"}
        slug="ai-tools-uruguay"
        faqs={[
 { question: "What are the best AI tools in Uruguay?", answer: "The best AI tools in Uruguay cater to local language needs, regulatory needs, and specific market demands. Popular categories include writing, coding, design, and marketing tools — all ranked on Apifeny AI." },
 { question: "Are AI tools available in local languages?", answer: "Many international AI tools offer multilingual support including languages relevant to Uruguay. Check each tool settings to confirm local language support." },
 { question: "How do I choose the right AI tool for my business?", answer: "Consider factors like local language support, regional pricing, data compliance with Uruguay regulations, and specific use cases for your industry. Our directory helps you compare." },
 { question: "What industries in Uruguay benefit most from AI?", answer: "Key sectors adopting AI in Uruguay include technology, finance, healthcare, education, and e-commerce — each with growing tool ecosystems." },
 { question: "What is the AI startup scene like in Uruguay?", answer: "Uruguay has a developing AI startup ecosystem with incubators, funding programs, and community events driving innovation forward." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-uruguay',
          countryName: 'Uruguay',
          countryCode: 'uruguay',
          capital: 'Uruguay',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-blue-600 via-white to-blue-600',
          heroTitle: 'Best AI Tools for Uruguay in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-blue-600 via-white to-blue-600 bg-clip-text text-transparent">Uruguay</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Uruguay operates in english for business. We flag every tool for local language support — critical for serving customers across Uruguay\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Uruguay businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Uruguay teams.' },
          { icon: Star, title: 'English Support', description: 'Uruguay\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Uruguay market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Uruguay', item: '/ai-tools-uruguay' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Uruguay Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Uruguay&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-uruguay" />
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
