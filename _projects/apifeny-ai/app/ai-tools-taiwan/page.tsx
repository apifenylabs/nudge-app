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
  title: 'Best AI Tools in Taiwan (2026) — 100+ Tools for Taiwanese Startups & Enterprises',
  description: 'Discover the best AI tools for Taiwan',
  ogTitle: 'Best AI Tools in Taiwan (2026) — Apifeny AI',
  ogDescription: '100+ AI tools ranked for the Taiwanese market. 🇹🇼 Traditional Chinese support, TWD/USD pricing, PDPA compliant, curated for Taiwan',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsTaiwanPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Taiwan', item: '/ai-tools-taiwan' }]} />
      <GeoSeoSchema
        countryName="Taiwan"
        countryCode="taiwan"
        capital="Taiwan"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Taiwan"}
        slug="ai-tools-taiwan"
        faqs={[
 { question: "What are the best AI tools in Taiwan?", answer: "The best AI tools in Taiwan include ChatGPT for productivity, GitHub Copilot for development, Canva AI for design, and Claude for long-form content. Taiwan's $5B AI market — the fastest-growing in Asia outside China — is driven by its semiconductor dominance (TSMC, MediaTek) and government's $1B+ AI Action Plan." },
 { question: "Are AI tools accessible for Taiwanese businesses?", answer: "Yes. Taiwan has world-class digital infrastructure with 90%+ smartphone penetration and extensive 5G coverage. The government's Taiwan AI Action Plan provides R&D funding and adoption incentives. Most global AI tools offer Traditional Chinese (繁體中文) support. AWS Taipei Local Zone and GCP Taiwan provide local data centre options." },
 { question: "What AI tools best suit Taiwan's semiconductor industry?", answer: "Taiwan's semiconductor industry (63% of global foundry market) demands specialised AI tools. Synopsys AI for chip design, Cadence Cerebrus for EDA, and TSMC's own AI Foundry Solutions dominate. Foxconn and Quanta use AI for smart manufacturing. Taiwan's Hsinchu Science Park is the global epicentre of AI hardware innovation." },
 { question: "What AI regulations apply in Taiwan?", answer: "Taiwan's Personal Data Protection Act (PDPA) governs all data processing. The Ministry of Digital Affairs (moda) issues AI governance guidelines. Cross-border data transfers have specific requirements. Financial sector AI must comply with the Financial Supervisory Commission (FSC) regulations." },
 { question: "Is Traditional Chinese well supported by AI tools?", answer: "Yes. ChatGPT handles Traditional Chinese well. Claude offers excellent Traditional Chinese capabilities. Local providers like ASUS AI and Taiwan AI Labs develop Taiwan-specific solutions. Academia Sinica's CKIP Lab provides Traditional Chinese NLP services. The gap with English is small and narrowing quickly." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-taiwan',
          countryName: 'Taiwan',
          countryCode: 'taiwan',
          capital: 'Taiwan',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-red-600 via-white to-blue-600',
          heroTitle: 'Best AI Tools for Taiwan in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-red-600 via-white to-blue-600 bg-clip-text text-transparent">Taiwan</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Taiwan operates in english for business. We flag every tool for local language support — critical for serving customers across Taiwan\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Taiwan businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Taiwan teams.' },
          { icon: Star, title: 'English Support', description: 'Taiwan\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Taiwan market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Taiwan', item: '/ai-tools-taiwan' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Taiwan Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Taiwan&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-taiwan" />
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
