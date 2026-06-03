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
  title: 'Best AI Tools in Cambodia (2026) — 75+ Tools for Khmer Startups & SMEs',
  description: 'Discover the best AI tools for Cambodia. 75+ ranked tools with KHR/USD pricing, PDPA compliance, Khmer language support, and local ecosystem fit. Updated for Phnom Penh, Siem Reap & Sihanoukville.',
  ogTitle: 'Best AI Tools in Cambodia (2026) — Apifeny AI',
  ogDescription: '75+ AI tools ranked for the Cambodian market. 🇰🇭 Khmer language support, USD/KHR pricing, data privacy compliant.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsCambodiaPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Cambodia', item: '/ai-tools-cambodia' }]} />
      <GeoSeoSchema
        countryName="Cambodia"
        countryCode="cambodia"
        capital="Cambodia"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Cambodia"}
        slug="ai-tools-cambodia"
        faqs={[
 { question: "What are the best AI tools in Cambodia?", answer: "The best AI tools accessible in Cambodia include ChatGPT for productivity, Canva AI for design, Grammarly for writing, and Trello AI for project management. Cambodia's rapidly growing digital ecosystem and young population (median age 27) drive increasing adoption of AI tools." },
 { question: "Are AI tools accessible for Cambodian SMEs?", answer: "Most global AI tools offer free tiers suitable for Cambodian SMEs. The Ministry of Post and Telecommunications (MPTC) provides support through the Digital Economy and Society Policy Framework. Cambodia's 4G coverage reaches 90%+, enabling cloud-based tool access." },
 { question: "What AI tools suit Cambodia's key industries?", answer: "Garment manufacturing (leading export) benefits from computer vision quality control AI. Agriculture (rice, rubber, cassava) uses AI for crop monitoring. Tourism (Angkor Wat) benefits from AI translation and recommendation tools. The government's Rectangular Strategy includes digital transformation goals." },
 { question: "What AI regulations apply in Cambodia?", answer: "Cambodia's Law on Cybersecurity (2023) and the Personal Data Protection Law affect AI tool usage. Financial sector AI must comply with the National Bank of Cambodia's regulations. Cross-border data processing is an emerging area of regulation." },
 { question: "Is Khmer language supported by AI tools?", answer: "Khmer language support is limited but growing. Google Translate covers Khmer basics. ChatGPT offers limited Khmer understanding. Local initiatives like the Royal University of Phnom Penh's AI research lab work on Khmer NLP. The MPTC's Smart City framework encourages local AI solutions." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-cambodia',
          countryName: 'Cambodia',
          countryCode: 'cambodia',
          capital: 'Cambodia',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-blue-800 via-red-600 to-blue-800',
          heroTitle: 'Best AI Tools for Cambodia in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-blue-800 via-red-600 to-blue-800 bg-clip-text text-transparent">Cambodia</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Cambodia operates in english for business. We flag every tool for local language support — critical for serving customers across Cambodia\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Cambodia businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Cambodia teams.' },
          { icon: Star, title: 'English Support', description: 'Cambodia\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Cambodia market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Cambodia', item: '/ai-tools-cambodia' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Cambodia Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Cambodia&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-cambodia" />
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
