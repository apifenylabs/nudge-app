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
  title: 'Best AI Tools in Saudi Arabia (2026) — Curated for KSA Startups & Teams',
  description: 'Discover the best AI tools for Saudi businesses and founders. Curated directory of 85+ tools ranked by trending score, Asia-readiness, and local relevance. Updated daily. Supports Arabic, English, and regional languages.',
  ogTitle: 'Best AI Tools in Saudi Arabia (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for Saudi Arabia: local SAR pricing, data compliance, Arabic multilingual support, and MENA market readiness. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsSaudiArabiaPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Saudi Arabia', item: '/ai-tools-saudi-arabia' }]} />
      <GeoSeoSchema
        countryName="Saudi Arabia"
        countryCode="saudi-arabia"
        capital="Saudi Arabia"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Saudi Arabia"}
        slug="ai-tools-saudi-arabia"
        faqs={[
 { question: "What are the best AI tools in Saudi Arabia?", answer: "The best AI tools in Saudi Arabia include ChatGPT for content and productivity, GitHub Copilot for development, Canva AI for design, and Salesforce Einstein for enterprise CRM. Saudi Arabia's AI ecosystem is surging under Vision 2030, with NEOM, the Saudi Data & AI Authority (SDAIA), and KAUST driving world-class AI research and adoption across every sector of the economy." },
 { question: "Are AI tools Saudi Arabia-ready for local businesses?", answer: "Yes, Saudi Arabia has the largest ICT market in the Middle East at $35B+, with 98% 4G/5G coverage, Tier IV data centres, and massive cloud investment (Oracle, AWS, Azure, Google Cloud opening regions in KSA). Businesses benefit from SDAIA's AI governance framework, the National Data Management Office (NDMO) standards, and Vision 2030's digital transformation mandate across all government and private sectors." },
 { question: "What AI tools are best for Saudi Arabia's key industries?", answer: "Saudi Arabia's key AI-adopting sectors include: energy & petrochemicals AI (Aramco's AI initiatives), smart cities AI (NEOM, Red Sea Project, Qiddiya), fintech AI (SAMA's regulatory sandbox, STC Pay, lean digital banks), healthcare AI (MOH and SEHA digital health), logistics AI (Saudi Ports Authority, Bahri, Saudi Railways), and tourism AI (Vision 2030 tourism target of 150M visits by 2030)." },
 { question: "How can Saudi startups adopt AI cost-effectively?", answer: "Saudi startups can leverage funding from Monsha'at's venture debt programs, the Saudi Venture Capital Company (SVC) with SAR 2B+ deployed, KAUST Innovation Fund, and NEOM's startup accelerator. Most AI tools offer free tiers for startups (ChatGPT, GitHub Copilot education, Google Colab, open-source models) and cloud providers offer generous startup credits (AWS Activate, Microsoft for Startups, Google for Startups)." },
 { question: "What AI regulations exist in Saudi Arabia?", answer: "Saudi Arabia has the most established AI governance in the Middle East: SDAIA (Saudi Data & AI Authority) oversees all AI and data policy, the National Data Management Office (NDMO) sets data standards, and the Personal Data Protection Law (PDPL) 2022 governs AI data processing. SAMA regulates fintech AI, CITC oversees telecom AI, and the Saudi FDA governs health AI. The AI Ethics Principles published by SDAIA provide a comprehensive framework for responsible AI." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-saudi-arabia',
          countryName: 'Saudi Arabia',
          countryCode: 'saudi-arabia',
          capital: 'Saudi Arabia',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-green-600 via-white to-green-600',
          heroTitle: 'Best AI Tools for Saudi Arabia in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-green-600 via-white to-green-600 bg-clip-text text-transparent">Saudi Arabia</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Saudi Arabia operates in english for business. We flag every tool for local language support — critical for serving customers across Saudi Arabia\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Saudi Arabia businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Saudi Arabia teams.' },
          { icon: Star, title: 'English Support', description: 'Saudi Arabia\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Saudi Arabia market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Saudi Arabia', item: '/ai-tools-saudi-arabia' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Saudi Arabia Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Saudi Arabia&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-saudi-arabia" />
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
