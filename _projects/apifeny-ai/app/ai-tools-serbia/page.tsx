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
  title: 'Best AI Tools in Serbia (2026) — Curated for Balkan Tech & Startups',
  description: 'Discover the best AI tools for Serbian businesses and developers. Curated directory of 85+ tools ranked by trending score, Serbia-market readiness, and local relevance. Updated daily. Built for Belgrade tech ecosystem.',
  ogTitle: 'Best AI Tools in Serbia (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for Serbia: multilingual support, RSD/EUR pricing, GDPR alignment, and Balkan market readiness. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsSerbiaPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Serbia', item: '/ai-tools-serbia' }]} />
      <GeoSeoSchema
        countryName="Serbia"
        countryCode="serbia"
        capital="Serbia"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Serbia"}
        slug="ai-tools-serbia"
        faqs={[
 { question: "What AI tools are most popular in Serbia?", answer: "The most popular AI tools in Serbia include ChatGPT and Claude for content generation, GitHub Copilot for development, DeepSeek for analysis, and platform-specific tools for Serbian language NLP and Balkan business needs." },
 { question: "Are these AI tools available in Serbian language?", answer: "Many top AI platforms now support Serbian or have strong multilingual capabilities. ChatGPT, Google Gemini, and DeepL offer Serbian interfaces or reliable Serbian text generation. We flag tools with explicit Serbian/Balkan language support." },
 { question: "Do AI tools on this directory support RSD/EUR pricing?", answer: "Yes, most SAAS tools listed here support EUR billing and Serbian businesses can also use RSD via local payment processors. We note any tools with Serbia-specific or Balkan regional pricing plans." },
 { question: "How does data protection work for AI tools in Serbia?", answer: "Serbia has its own Law on Personal Data Protection (ZPPD), largely aligned with GDPR. Serbia is also an EU candidate country, so many tools with GDPR compliance work well for Serbian users. We check data processing standards on every listed tool." },
 { question: "What industries in Serbia benefit most from AI?", answer: "Serbia's IT outsourcing, fintech, agriculture, gaming, and manufacturing sectors lead AI adoption. Belgrade's growing startup ecosystem, combined with EU accession funding and government digitalization programs, creates strong demand for AI tools in development, automation, and analytics." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-serbia',
          countryName: 'Serbia',
          countryCode: 'serbia',
          capital: 'Serbia',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-red-600 via-blue-600 to-white',
          heroTitle: 'Best AI Tools for Serbia in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-red-600 via-blue-600 to-white bg-clip-text text-transparent">Serbia</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Serbia operates in english for business. We flag every tool for local language support — critical for serving customers across Serbia\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Serbia businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Serbia teams.' },
          { icon: Star, title: 'English Support', description: 'Serbia\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Serbia market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Serbia', item: '/ai-tools-serbia' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Serbia Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Serbia&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-serbia" />
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
