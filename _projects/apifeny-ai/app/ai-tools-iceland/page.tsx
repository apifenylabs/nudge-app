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
  title: 'Best AI Tools in Iceland (2026) — Curated for Icelandic Teams & Startups',
  description: 'Discover the best AI tools for Icelandic businesses and founders. Find GDPR-compliant, ISK-priced AI tools for Reykjavík startups.',
  ogTitle: 'Best AI Tools in Iceland (2026) — Apifeny AI',
  ogDescription: 'Find AI tools purpose-built for Iceland: Nordic GDPR compliance, ISK pricing, and Icelandic language support.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsIcelandPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Iceland', item: '/ai-tools-iceland' }]} />
      <GeoSeoSchema
        countryName="Iceland"
        countryCode="iceland"
        capital="Iceland"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Iceland"}
        slug="ai-tools-iceland"
        faqs={[
 { question: "What are the best AI tools in Iceland?", answer: "AI tools popular in Iceland: ChatGPT, Claude, GitHub Copilot, and Nordic-focused AI platforms." },
 { question: "How does GDPR affect Icelandic AI tool selection?", answer: "Iceland is in the EEA, so EU GDPR applies fully with additional Nordic data protection authority oversight." },
 { question: "What AI tools are best for Icelandic startups?", answer: "Cloud-based tools with ISK billing and Icelandic language support, plus tools optimized for renewable energy and geothermal AI workloads." },
 { question: "How can Icelandic founders access AI funding?", answer: "Iceland offers Rannis grants, EU Horizon Europe participation, Innovation Center Iceland programs, and Nordic AI accelerator partnerships." },
 { question: "What AI regulations exist in Iceland?", answer: "EU GDPR, EEA AI Act alignment, and national data protection authority (Persónuvernd) oversight." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-iceland',
          countryName: 'Iceland',
          countryCode: 'iceland',
          capital: 'Iceland',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-blue-600 via-white to-red-600',
          heroTitle: 'Best AI Tools for Iceland in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-blue-600 via-white to-red-600 bg-clip-text text-transparent">Iceland</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Iceland operates in english for business. We flag every tool for local language support — critical for serving customers across Iceland\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Iceland businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Iceland teams.' },
          { icon: Star, title: 'English Support', description: 'Iceland\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Iceland market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Iceland', item: '/ai-tools-iceland' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Iceland Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Iceland&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-iceland" />
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
