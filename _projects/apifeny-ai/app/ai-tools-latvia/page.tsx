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
  title: 'Best AI Tools in Latvia (2026) — Curated for Baltic Startups & Developers',
  description: 'Discover the best AI tools for Latvian businesses and developers. Curated directory of 85+ tools ranked by trending score, Latvia-market readiness, and local relevance. Updated daily. Built for Riga tech ecosystem.',
  ogTitle: 'Best AI Tools in Latvia (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for Latvia: multilingual support, EUR pricing, GDPR compliance, and Baltic data center readiness. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsLatviaPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Latvia', item: '/ai-tools-latvia' }]} />
      <GeoSeoSchema
        countryName="Latvia"
        countryCode="latvia"
        capital="Latvia"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Latvia"}
        slug="ai-tools-latvia"
        faqs={[
 { question: "What AI tools are most popular in Latvia?", answer: "The most popular AI tools in Latvia include ChatGPT and DeepSeek for content generation, GitHub Copilot for development, Claude for analysis, and platform-specific tools for Latvian language NLP and Baltic business needs." },
 { question: "Are these AI tools available in Latvian language?", answer: "Many top AI platforms now support Latvian or have strong multilingual capabilities. ChatGPT, Google Gemini, and DeepL offer Latvian interfaces or reliable Latvian text generation. We flag tools with explicit Latvian/Eastern European language support." },
 { question: "Do AI tools on this directory support EUR pricing?", answer: "Yes, most SAAS tools listed here support EUR billing and EU VAT compliance. Latvian businesses benefit from EUR pricing without currency conversion fees. We note any tools with Latvia-specific or Baltic regional pricing plans." },
 { question: "How does GDPR affect AI tool usage in Latvia?", answer: "Latvia follows the EU General Data Protection Regulation (GDPR) with oversight by the DVI. All tools on our directory meet GDPR standards. Cloud providers with Baltic data centers offer the lowest latency for Latvian users." },
 { question: "What industries in Latvia benefit most from AI?", answer: "Latvia's IT outsourcing, fintech, logistics, healthcare, and smart city sectors are seeing the fastest AI adoption. Riga's growing startup ecosystem, combined with EU funding, creates strong demand for AI tools in development, automation, and analytics." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-latvia',
          countryName: 'Latvia',
          countryCode: 'latvia',
          capital: 'Latvia',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-red-600 via-white to-red-600',
          heroTitle: 'Best AI Tools for Latvia in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-red-600 via-white to-red-600 bg-clip-text text-transparent">Latvia</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Latvia operates in english for business. We flag every tool for local language support — critical for serving customers across Latvia\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Latvia businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Latvia teams.' },
          { icon: Star, title: 'English Support', description: 'Latvia\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Latvia market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Latvia', item: '/ai-tools-latvia' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Latvia Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Latvia&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-latvia" />
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
