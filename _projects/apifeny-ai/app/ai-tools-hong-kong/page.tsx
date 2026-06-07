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
  title: 'Best AI Tools in Hong Kong (2026) — Curated for HK Startups & Enterprises',
  description: 'Discover the best AI tools for Hong Kong businesses. Curated directory of 85+ tools ranked by trending score, Chinese-language readiness, data privacy, and local relevance. Updated daily.',
  ogTitle: 'Best AI Tools in Hong Kong (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for Hong Kong: Traditional Chinese support, HKD pricing, data residency compliance (PDPO), and Asia-Pacific readiness. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsHongKongPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Hong Kong', item: '/ai-tools-hong-kong' }]} />
      <GeoSeoSchema
        countryName="Hong Kong"
        countryCode="hong-kong"
        capital="Hong Kong"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Hong Kong"}
        slug="ai-tools-hong-kong"
        faqs={[
 { question: "What are the best AI tools in Hong Kong?", answer: "The best AI tools in Hong Kong include ChatGPT for productivity, GitHub Copilot for development, Canva AI for design, and Jasper for marketing. Hong Kong's unique position as a global financial hub and its strong IP protection laws make it an ideal market for adopting enterprise AI tools." },
 { question: "Are AI tools accessible for Hong Kong startups?", answer: "Yes. Hong Kong startups benefit from world-class digital infrastructure, the highest internet speeds in Asia, Cyberport and HKSTP incubation programmes, and government grants like the ITF (Innovation and Technology Fund) of up to HK$10M. Most AI platforms offer free tiers perfect for early-stage validation." },
 { question: "What AI tools are best for Hong Kong's financial sector?", answer: "Hong Kong's financial services sector — 21% of GDP — benefits from AI tools like Kensho for financial analysis, Ayasdi for compliance, Darktrace for cybersecurity, and Salesforce Einstein for CRM. Regtech and fintech AI adoption is accelerating under HKMA's Fintech 2025 strategy." },
 { question: "What AI regulations apply in Hong Kong?", answer: "Hong Kong's Personal Data (Privacy) Ordinance (PDPO) governs data handling. The Privacy Commissioner has issued AI-specific guidance on ethical AI use. For financial sector AI, HKMA's Supervisory Policy Manual provides additional requirements." },
 { question: "Are there Hong Kong-specific AI models?", answer: "Yes. The Hong Kong Generative AI Research and Development Center (HKGAI) develops Cantonese and Chinese-language models. Local universities (HKU, CUHK, HKUST) publish cutting-edge AI research, and companies like SenseTime (HQ in HK) offer regionally optimised computer vision AI." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-hong-kong',
          countryName: 'Hong Kong',
          countryCode: 'hong-kong',
          capital: 'Hong Kong',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-red-600 via-white to-red-600',
          heroTitle: 'Best AI Tools for Hong Kong in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-red-600 via-white to-red-600 bg-clip-text text-transparent">Hong Kong</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Hong Kong operates in english for business. We flag every tool for local language support — critical for serving customers across Hong Kong\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Hong Kong businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Hong Kong teams.' },
          { icon: Star, title: 'English Support', description: 'Hong Kong\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Hong Kong market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Hong Kong', item: '/ai-tools-hong-kong' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Hong Kong Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Hong Kong&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-hong-kong" />
      </section>

      <BrowseByCountry />

            <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BlogCategoryLinks />
        </div>
      </section>
      <CountryBlogPosts
        countryName="Hong Kong"
        countrySlug="hong-kong"
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
