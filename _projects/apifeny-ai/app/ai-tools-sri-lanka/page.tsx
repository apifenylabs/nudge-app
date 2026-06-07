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
  title: 'Best AI Tools in Sri Lanka (2026) — 100+ Tools for Colombo Tech Scene & Tourism AI',
  description: 'Sinhala- and Tamil-first tools optimised for Sri Lanka',
  ogTitle: 'Best AI Tools in Sri Lanka (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for Sri Lanka. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsSriLankaPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Sri Lanka', item: '/ai-tools-sri-lanka' }]} />
      <GeoSeoSchema
        countryName="Sri Lanka"
        countryCode="sri-lanka"
        capital="Sri Lanka"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Sri Lanka"}
        slug="ai-tools-sri-lanka"
        faqs={[
 { question: 'What are the best AI tools in Sri Lanka?', answer: 'ChatGPT leads for general productivity in Sri Lanka, GitHub Copilot for developers, Canva AI for design and marketing, and Perplexity for research. Sri Lanka\'s growing IT outsourcing sector makes coding tools especially relevant for Colombo\'s tech workforce.' },
 { question: 'Do AI tools support Sinhala (සිංහල) and Tamil (தமிழ்)?', answer: 'Support varies. ChatGPT handles Sinhala prompts with reasonable accuracy. Google\'s AI tools have stronger support for both Sinhala and Tamil due to Google\'s broader language coverage. Canva supports Sinhala Unicode fonts. Specialized tools for local languages remain a growing area.' },
 { question: 'How can Sri Lankan startups leverage AI?', answer: 'Sri Lankan startups can use no-code AI tools like ChatGPT, Claude, and Perplexity for research and content. GitHub Copilot and Cursor for development. Canva AI and AdCreative.ai for marketing. Most offer free tiers, making them accessible for bootstrapped startups in Colombo and Jaffna.' },
 { question: 'What payment options do AI tools offer in Sri Lanka?', answer: 'International AI tools typically accept credit/debit cards and PayPal. Some platforms support payments through Sri Lankan banks via Visa/Mastercard. USD pricing is standard, though some tools offer regional pricing for developing markets.' },
 { question: 'Is AI adoption growing in Sri Lanka?', answer: 'Yes, AI adoption in Sri Lanka is accelerating, driven by the IT outsourcing sector, a growing startup scene in Colombo, and government digitalization initiatives. The Lanka Software Foundation and academic institutions (University of Moratuwa, UCSC) are actively involved in AI research and training.' },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-sri-lanka',
          countryName: 'Sri Lanka',
          countryCode: 'sri-lanka',
          capital: 'Sri Lanka',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-yellow-400 via-green-600 to-red-600',
          heroTitle: 'Best AI Tools for Sri Lanka in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-yellow-400 via-green-600 to-red-600 bg-clip-text text-transparent">Sri Lanka</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Sri Lanka operates in english for business. We flag every tool for local language support — critical for serving customers across Sri Lanka\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Sri Lanka businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Sri Lanka teams.' },
          { icon: Star, title: 'English Support', description: 'Sri Lanka\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Sri Lanka market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Sri Lanka', item: '/ai-tools-sri-lanka' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Sri Lanka Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Sri Lanka&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-sri-lanka" />
      </section>

      <BrowseByCountry />

            <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BlogCategoryLinks />
        </div>
      </section>
      <CountryBlogPosts
        countryName="Sri Lanka"
        countrySlug="sri-lanka"
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
