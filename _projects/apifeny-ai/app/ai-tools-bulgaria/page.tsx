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
  title: 'Best AI Tools in Bulgaria (2026) — Curated for Bulgarian Teams & Startups',
  description: 'Discover the best AI tools for Bulgarian businesses and developers. Curated directory of 85+ tools ranked by trending score, Bulgaria-market readiness, and local relevance. Updated daily. Built for Sofia, Plovdiv, Varna, and Bulgaria',
  ogTitle: 'Best AI Tools in Bulgaria (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for Bulgaria: EU-market aligned, BGN/EUR pricing, Bulgarian/English support, and GDPR compliance. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsBulgariaPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Bulgaria', item: '/ai-tools-bulgaria' }]} />
      <GeoSeoSchema
        countryName="Bulgaria"
        countryCode="bulgaria"
        capital="Bulgaria"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Bulgaria"}
        slug="ai-tools-bulgaria"
        faqs={[
 { question: "What are the best AI tools for Bulgaria in 2026?", answer: "The best AI tools in Bulgaria include ChatGPT for productivity, GitHub Copilot for development, Claude for analysis, and Canva AI for design. Bulgaria's strong developer community also uses Cursor, Replit, and v0 for rapid prototyping." },
 { question: "How does Bulgarian data protection law affect AI tool selection?", answer: "As an EU member state, Bulgaria enforces GDPR through the Personal Data Protection Act. AI tools must support EU data residency and GDPR compliance." },
 { question: "What AI tools are best for Bulgaria's outsourcing and software industry?", answer: "Bulgaria's software development and BPO sectors benefit from AI coding assistants (GitHub Copilot, Cursor, Windsurf), project management AI (Linear, Notion AI), communication tools (Otter.ai, Fireflies), and QA automation tools." },
 { question: "How can Bulgarian developers and startups access AI funding?", answer: "Bulgarian AI startups can access EU Horizon Europe funding, the Bulgarian Innovation Fund, and the National Programme for Scientific Research. Sofia-based programmes like Eleven Ventures and LAUNCHub provide early-stage funding." },
 { question: "What AI regulations apply in Bulgaria?", answer: "Bulgaria follows the EU AI Act as the primary regulatory framework. National enforcement falls under the Ministry of Electronic Governance and the CPDP for data protection." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-bulgaria',
          countryName: 'Bulgaria',
          countryCode: 'bulgaria',
          capital: 'Bulgaria',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-white via-green-600 to-red-600',
          heroTitle: 'Best AI Tools for Bulgaria in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-white via-green-600 to-red-600 bg-clip-text text-transparent">Bulgaria</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Bulgaria operates in english for business. We flag every tool for local language support — critical for serving customers across Bulgaria\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Bulgaria businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Bulgaria teams.' },
          { icon: Star, title: 'English Support', description: 'Bulgaria\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Bulgaria market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Bulgaria', item: '/ai-tools-bulgaria' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Bulgaria Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Bulgaria&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-bulgaria" />
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
