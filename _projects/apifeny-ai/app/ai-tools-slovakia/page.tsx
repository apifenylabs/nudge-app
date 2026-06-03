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
  title: 'Best AI Tools in Slovakia (2026) — Curated for Slovak Teams & Startups',
  description: 'Discover the best AI tools for Slovak businesses and founders. Curated directory of 85+ tools ranked by trending score, Slovakia-market readiness, and local relevance. Updated daily. Built for Bratislava, Košice, and Slovakia',
  ogTitle: 'Best AI Tools in Slovakia (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for Slovakia: EUR pricing, GDPR compliance, Slovak/English support, and Industry 4.0 readiness. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsSlovakiaPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Slovakia', item: '/ai-tools-slovakia' }]} />
      <GeoSeoSchema
        countryName="Slovakia"
        countryCode="slovakia"
        capital="Slovakia"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Slovakia"}
        slug="ai-tools-slovakia"
        faqs={[
 { question: "What are the best AI tools for Slovak businesses and developers in 2026?", answer: "The best AI tools for Slovakia include ChatGPT for content, GitHub Copilot for development, Claude for analysis, and Cursor for AI-assisted coding. ESET's own AI-powered threat detection sets the standard for cybersecurity AI in the region." },
 { question: "How does GDPR affect AI tool selection for Slovak companies?", answer: "As an EU member, Slovakia implements GDPR through its Personal Data Protection Act (Zákon č. 18/2018 Z.z. o ochrane osobných údajov). The Slovak Data Protection Authority (ÚOOÚ) actively enforces compliance." },
 { question: "What AI tools are best for Slovakia's key industries?", answer: "Slovakia's economy-driven AI needs include: automotive (predictive maintenance, quality vision AI — VW, KIA, Stellantis), cybersecurity (ESET — ML-based threat detection), IT outsourcing (T-Systems, Ness — process automation AI), banking (Slovenská Sporiteľňa, Tatra banka — fraud detection AI), and manufacturing (Industry 4.0 automation)." },
 { question: "How can Slovak startups access AI tools affordably?", answer: "Slovak startups can access European Innovation Council (EIC) grants, Horizon Europe programs, and local support from Slovak Business Agency (SBA), Slovak Investment and Trade Development Agency (SARIO), and accelerator programs like Spot and the Cassovia Startup Centre in Košice." },
 { question: "What AI regulations exist in Slovakia?", answer: "As an EU member, Slovakia follows the EU AI Act. National legislation includes the Personal Data Protection Act (Zákon č. 18/2018 Z.z.), and the emerging Slovak AI Strategy framework aligning with the EU coordinated plan on AI." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-slovakia',
          countryName: 'Slovakia',
          countryCode: 'slovakia',
          capital: 'Slovakia',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-white via-blue-600 to-red-600',
          heroTitle: 'Best AI Tools for Slovakia in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-white via-blue-600 to-red-600 bg-clip-text text-transparent">Slovakia</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Slovakia operates in english for business. We flag every tool for local language support — critical for serving customers across Slovakia\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Slovakia businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Slovakia teams.' },
          { icon: Star, title: 'English Support', description: 'Slovakia\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Slovakia market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Slovakia', item: '/ai-tools-slovakia' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Slovakia Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Slovakia&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-slovakia" />
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
