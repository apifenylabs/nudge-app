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
  title: 'Best AI Tools in Morocco (2026) — Curated for Moroccan Teams & Startups',
  description: 'AI tools directory · AI startup directory · AI business tools',
  ogTitle: 'Best AI Tools in Morocco (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for Morocco: MAD pricing, Law 09-08 compliance, Arabic/French support, African market readiness. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsMoroccoPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Morocco', item: '/ai-tools-morocco' }]} />
      <GeoSeoSchema
        countryName="Morocco"
        countryCode="ma"
        capital="Rabat"
        currency="MAD"
        language="Arabic / French / English"
        languageCode="ar"
        marketSize={"A $140B economy with 37M population, North Africa's 5th largest economy, growing tech ecosystem in Casablanca and Rabat, Francophone and Arabic business environment"}
        slug="ai-tools-morocco"
        faqs={[
          { question: "What are the best AI tools in Morocco?", answer: "The best AI tools in Morocco include ChatGPT for content and productivity, GitHub Copilot for development, Claude for advanced reasoning, Canva AI for design, and Jasper for marketing. Morocco\'s AI ecosystem combines world-leading AI research with a unique bilingual business environment." },
          { question: "How does local privacy law affect AI tool selection?", answer: "Morocco\'s Law 09-08 on personal data protection imposes strict requirements on how AI tools handle personal data. We evaluate every tool for compliance with Moroccan data protection regulations, data residency options, and consent management." },
          { question: "What makes Morocco\'s AI market unique?", answer: "Morocco is a bridge between Africa, Europe, and the Arab world. French and Arabic are business languages, MAD pricing is essential, and the growing tech ecosystem in Casablanca Finance City and Rabat Technopolis creates unique demand for AI tools." },
        ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-morocco',
          countryName: 'Morocco',
          countryCode: 'ma',
          capital: 'Rabat',
          currency: 'MAD',
          languages: 'Arabic / French / English',
          heroGradient: 'from-red-500 via-white to-green-500',
          heroTitle: 'Best AI Tools for Morocco in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-red-500 via-white to-green-500 bg-clip-text text-transparent">Morocco</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'Arabic / French / English', description: 'Morocco is a trilingual market where Arabic, French, and English all matter for business. We flag every tool for local language support — critical for serving customers across Morocco\'s diverse regions from Casablanca to Marrakech.' },
          { icon: ShieldCheck, title: 'Law 09-08 Compliant', description: 'Morocco\'s Law 09-08 on personal data protection is one of Africa\'s strongest privacy frameworks. We evaluate tools for local data residency, consent management, and compliance with Morocco\'s data protection authority (CNDP) requirements.' },
          { icon: Star, title: 'MAD Pricing & Local Support', description: 'Moroccan businesses need tools that work in dirhams (MAD), offer local payment methods like CMI, and provide French and Arabic customer support. We rank every tool on real-world usability for Moroccan teams.' },
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Morocco', item: '/ai-tools-morocco' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Moroccan Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Morocco&apos;s bilingual business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-morocco" />
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
