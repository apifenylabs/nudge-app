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
  title: 'Best AI Tools in Ethiopia (2026) — 85+ Tools for Ethiopian Startups & Enterprises',
  description: 'Discover the best AI tools for Ethiopia. 85+ ranked tools with ETB pricing, local compliance, and ecosystem support. Updated daily for Ethiopian solopreneurs, SMEs, and enterprises in Addis Ababa and beyond.',
  ogTitle: 'Best AI Tools in Ethiopia (2026) — Apifeny AI',
  ogDescription: '85+ AI tools ranked for the Ethiopian market. 🇪🇹 ETB pricing, data-compliant, Amharic and English language support.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsEthiopiaPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Ethiopia', item: '/ai-tools-ethiopia' }]} />
      <GeoSeoSchema
        countryName="Ethiopia"
        countryCode="ethiopia"
        capital="Addis Ababa"
        currency="ETB"
        language="English"
        languageCode="en"
        marketSize={"one of Africa's fastest growing economies, with Addis Ababa emerging as a major tech hub"}
        slug="ai-tools-ethiopia"
        faqs={[
 { question: "What are the best AI tools for Ethiopia in 2026?", answer: "The best AI tools for Ethiopia include ChatGPT for content and productivity, GitHub Copilot for development, Canva AI for design, and Jasper for marketing. Ethiopia's economy is one of Africa's fastest growing, with Addis Ababa emerging as a major tech hub hosting innovation centres and startups across fintech, agritech, and healthtech." },
 { question: "Are AI tools accessible for Ethiopian businesses?", answer: "Yes. Internet penetration is rising rapidly, especially in Addis Ababa and regional capitals. Mobile money services like Telebirr and CBE Birr are driving digital adoption. The Ethiopian government's Digital Ethiopia 2025 strategy promotes technology adoption across education, agriculture, and financial services." },
 { question: "What AI tools are best for Ethiopia's key industries?", answer: "Agriculture (34% of GDP) benefits from AI tools for crop monitoring, weather prediction, and market pricing. Fintech is booming with mobile banking and micro-lending platforms. Healthtech startups use AI for telemedicine and diagnostic support in rural areas." },
 { question: "What data regulations apply in Ethiopia?", answer: "Ethiopia's Data Protection Proclamation (No. 1321/2024) is the primary data privacy law. The Information Network Security Administration (INSA) governs cybersecurity. Cross-border data transfers require compliance with local storage requirements for sensitive sectors." },
 { question: "Is Amharic language supported by AI tools?", answer: "Support is growing. Google Translate and ChatGPT have basic Amharic support. Local AI initiatives like the Ethiopian Artificial Intelligence Institute develop Amharic NLP models and speech recognition. Google's Amharic speech dataset has improved model accuracy for Ethiopian languages." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-ethiopia',
          countryName: 'Ethiopia',
          countryCode: 'ethiopia',
          capital: 'Addis Ababa',
          currency: 'ETB',
          languages: 'English',
          heroGradient: 'from-green-600 via-yellow-500 to-red-600',
          heroTitle: 'Best AI Tools for Ethiopia in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 bg-clip-text text-transparent">Ethiopia</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Ethiopia operates in english for business and technology. We flag every tool for local language support — critical for serving customers across Ethiopia\'s diverse regions including Oromia, Amhara, and SNNPR.' },
          { icon: ShieldCheck, title: 'ETB Pricing & Local Compliance', description: 'Ethiopian businesses need tools that work in ETB, offer local payment methods like Telebirr and CBE Birr, and comply with local data protection regulations. We rank every tool on real-world usability for Ethiopian teams.' },
          { icon: Star, title: 'English Support', description: 'Ethiopia\'s rapidly digitising economy demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Ethiopia market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Ethiopia', item: '/ai-tools-ethiopia' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Ethiopia Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Ethiopia&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-ethiopia" />
      </section>

      <BrowseByCountry />

            <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BlogCategoryLinks />
        </div>
      </section>
      <CountryBlogPosts
        countryName="Ethiopia"
        countrySlug="ethiopia"
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
