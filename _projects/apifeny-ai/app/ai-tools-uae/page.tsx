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
  title: 'Best AI Tools in UAE (2026) — Curated for UAE Startups & Teams',
  description: 'Discover the best AI tools for UAE businesses and founders. Curated directory of 85+ tools ranked by trending score, Asia-readiness, and local relevance. Updated daily. Supports Arabic, English, and regional languages.',
  ogTitle: 'Best AI Tools in UAE (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for UAE: local AED pricing, data compliance, Arabic/English multilingual support, and MENA market readiness. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsUaePage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools UAE', item: '/ai-tools-uae' }]} />
      <GeoSeoSchema
        countryName="UAE"
        countryCode="uae"
        capital="UAE"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in UAE"}
        slug="ai-tools-uae"
        faqs={[
 { question: "What are the best AI tools in the UAE?", answer: "The best AI tools in the UAE include ChatGPT for content and productivity, GitHub Copilot for software development, Canva AI for design, and Salesforce Einstein for enterprise CRM. The UAE's AI ecosystem is one of the most advanced globally, driven by the UAE National AI Strategy 2031, Smart Dubai, and Abu Dhabi's AI hub (MBZUAI, G42, Core42). Dubai and Abu Dhabi are positioning themselves as global AI capitals with world-class infrastructure." },
 { question: "Are AI tools UAE-ready for local businesses?", answer: "Yes, the UAE has among the best digital infrastructure in the world: 5G coverage exceeding 98%, Tier IV data centres, and advanced cloud adoption. UAE businesses benefit from sovereign cloud services (G42 Cloud, Oracle Dubai, AWS UAE), a robust fintech ecosystem (DIFC, ADGM, UAE Pass, digital banking), and strong IP protection laws. The UAE's National AI Strategy 2031 is the most comprehensive in the region." },
 { question: "What AI tools are best for the UAE's key industries?", answer: "The UAE's key sectors leveraging AI include: oil & gas AI for upstream optimisation by ADNOC, tourism AI for Expo legacy and Visit Dubai campaigns, fintech AI under DIFC and ADGM regulations, healthcare AI across Dubai Health Authority and Abu Dhabi's DOH, smart city AI through Smart Dubai's Dubai AI Roadmap, and aviation AI with Emirates and Etihad adopting predictive maintenance." },
 { question: "How can UAE startups adopt AI cost-effectively?", answer: "UAE startups can leverage funding from the Mohammed bin Rashid Innovation Fund (worth AED 2B), ADQ's venture ecosystem, Hub71 in Abu Dhabi (zero corporate tax for 5+ years), Dubai Future Accelerators, and in5 Dubai. Most major AI tools offer free tiers (ChatGPT, Google Colab, GitHub Copilot via education) and cloud startups get generous AWS/Azure/GCP credits. Dubai Internet City and Abu Dhabi's Hub71 provide subsidised infrastructure." },
 { question: "What AI regulations apply in the UAE?", answer: "The UAE has comprehensive AI governance: the UAE National AI Strategy 2031, the Dubai AI Principles and Dubai AI Ethics Guidelines, and UAE Data Protection Law (Federal Decree-Law No. 45 of 2021). ADGM and DIFC have their own data protection regulations. The Telecommunications and Digital Government Regulatory Authority (TDRA) governs AI in telecom. Financial AI tools need Central Bank approval, and health AI must comply with DOH/DHA standards." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-uae',
          countryName: 'UAE',
          countryCode: 'uae',
          capital: 'UAE',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-green-600 via-white to-black',
          heroTitle: 'Best AI Tools for UAE in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-green-600 via-white to-black bg-clip-text text-transparent">UAE</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'UAE operates in english for business. We flag every tool for local language support — critical for serving customers across UAE\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'UAE businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for UAE teams.' },
          { icon: Star, title: 'English Support', description: 'UAE\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for UAE market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools UAE', item: '/ai-tools-uae' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for UAE Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for UAE&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-uae" />
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
