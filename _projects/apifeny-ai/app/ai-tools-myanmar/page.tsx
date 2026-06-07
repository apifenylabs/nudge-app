'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Sparkles, Layers, Star, Zap, BookOpen, Globe, Wallet, ShieldCheck, MapPin,
} from 'lucide-react';

import SeoMetadata from '@/components/SeoMetadata';
import FeaturedPlaybooks from '@/components/FeaturedPlaybooks';
import BlogCategoryLinks from '@/components/BlogCategoryLinks';
import CountryBlogPosts from '@/components/CountryBlogPosts';
import LandingPageCrossLinks from '@/components/LandingPageCrossLinks';
import BrowseByCountry from '@/components/BrowseByCountry';
import { toolsData } from '@/lib/data';
import { playbooks } from '@/lib/playbooks';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import GeoSeoSchema from '@/components/GeoSeoSchema';
import CountryPageTemplate from '@/components/CountryPageTemplate';

const META = {
  title: 'Best AI Tools in Myanmar (2026) — Top AI Tools for Burmese Teams & Startups',
  description: 'Discover the best AI tools for Myanmar',
  ogTitle: 'Best AI Tools in Myanmar (2026) — Apifeny AI',
  ogDescription: 'AI tools ranked for the Myanmar market. 🇲🇲 Burmese language support, MMK/USD pricing, and curated for Myanmar',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsMyanmarPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Myanmar', item: '/ai-tools-myanmar' }]} />
      <GeoSeoSchema
        countryName="Myanmar"
        countryCode="myanmar"
        capital="Myanmar"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Myanmar"}
        slug="ai-tools-myanmar"
        faqs={[
 { question: "What are the best AI tools in Myanmar?", answer: "The best AI tools accessible in Myanmar include ChatGPT for productivity, Canva AI for design, Grammarly for English writing, and Trello AI for project management. Myanmar's emerging digital economy is growing despite infrastructure challenges, with increasing mobile penetration and a young, tech-adaptable population driving gradual AI adoption." },
 { question: "Are AI tools accessible for Myanmar businesses?", answer: "Access is improving. Most global AI tools offer free tiers, which makes them accessible. Mobile-first tools perform best given Myanmar's high mobile usage. The government's Myanmar Digital Economy Development Roadmap aims to build digital infrastructure. However, connectivity in rural areas and foreign exchange access remain challenges for SaaS subscription in USD." },
 { question: "What AI tools suit Myanmar's key industries?", answer: "Agriculture (38% of GDP) benefits from AI crop monitoring and weather prediction tools. The garment manufacturing sector uses AI for quality control. Tourism (pre-pandemic) benefits from AI translation and booking tools. Mobile banking and fintech AI grow with Wave Money, KBZ Pay, and other mobile wallet platforms." },
 { question: "What AI regulations apply in Myanmar?", answer: "Myanmar's Law Protecting the Privacy and Security of Citizens (2017) governs data privacy. The Ministry of Transport and Communications (MOTC) regulates digital services. Financial sector AI must comply with the Central Bank of Myanmar's regulations. Cross-border data processing regulations are still developing." },
 { question: "Is Burmese language supported by AI tools?", answer: "Burmese language support is limited. Google Translate covers basic Burmese. ChatGPT has limited Burmese understanding. Local initiatives like the Myanmar NLP Research Group at the University of Yangon work on Burmese language AI. The government's e-Government Master Plan encourages local language technology development." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-myanmar',
          countryName: 'Myanmar',
          countryCode: 'myanmar',
          capital: 'Myanmar',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-yellow-400 via-green-600 to-red-600',
          heroTitle: 'Best AI Tools for Myanmar in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-yellow-400 via-green-600 to-red-600 bg-clip-text text-transparent">Myanmar</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Myanmar operates in english for business. We flag every tool for local language support — critical for serving customers across Myanmar\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Myanmar businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Myanmar teams.' },
          { icon: Star, title: 'English Support', description: 'Myanmar\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Myanmar market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Myanmar', item: '/ai-tools-myanmar' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Myanmar Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Myanmar&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-myanmar" />
      </section>

      <BrowseByCountry />

            <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BlogCategoryLinks />
        </div>
      </section>
      <CountryBlogPosts
        countryName="Myanmar"
        countrySlug="myanmar"
      />

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
