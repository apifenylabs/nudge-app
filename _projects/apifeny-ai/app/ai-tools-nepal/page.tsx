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
  title: 'Best AI Tools in Nepal (2026) — 100+ Tools for Kathmandu Dev Scene & Trekking AI',
  description: 'Nepali (नेपाली)-first tools optimised for Nepal',
  ogTitle: 'Best AI Tools in Nepal (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for Nepal. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsNepalPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Nepal', item: '/ai-tools-nepal' }]} />
      <GeoSeoSchema
        countryName="Nepal"
        countryCode="nepal"
        capital="Nepal"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Nepal"}
        slug="ai-tools-nepal"
        faqs={[
 { question: 'What are the best AI tools in Nepal?', answer: 'ChatGPT is widely used by Nepal\'s growing developer community for coding and productivity. GitHub Copilot and Cursor are popular among Kathmandu\'s tech workforce. Canva AI dominates for design, and Perplexity for research. Tourism-focused AI tools for Nepal\'s travel sector are also gaining traction.' },
 { question: 'Do AI tools support Nepali (नेपाली)?', answer: 'ChatGPT handles Nepali prompts reasonably well for most use cases. Canva supports Nepali Unicode fonts. However, dedicated Nepali NLP tools remain scarce, creating opportunities for locally developed AI solutions targeting Nepal\'s 30M+ population.' },
 { question: 'How can Nepali businesses adopt AI affordably?', answer: 'Start with free tiers: ChatGPT Free for productivity, Canva Free for design, GitHub Copilot Free for students and open-source. Most cloud-based AI tools require no local infrastructure. The growing coworking scene in Kathmandu (Kathmandu University, IT Park) provides community support for AI adoption.' },
 { question: 'What is the state of AI in Nepal?', answer: 'Nepal\'s AI ecosystem is emerging, driven by the developer community around Kathmandu University, Pulchowk Engineering Campus, and the IT Park initiative. AI is being applied in tourism (chatbots, itinerary planning), agriculture (crop monitoring), and disaster management (earthquake prediction). The government\'s Digital Nepal Framework supports AI adoption.' },
 { question: 'Are there locally-developed AI tools in Nepal?', answer: 'Yes, a small but growing number of Nepali startups and university projects are building AI tools. These include Nepali NLP models, tourism AI assistants, and agri-tech solutions. However, most businesses still rely on global AI platforms adapted for the local context.' },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-nepal',
          countryName: 'Nepal',
          countryCode: 'nepal',
          capital: 'Nepal',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-blue-700 via-white to-red-600',
          heroTitle: 'Best AI Tools for Nepal in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-blue-700 via-white to-red-600 bg-clip-text text-transparent">Nepal</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Nepal operates in english for business. We flag every tool for local language support — critical for serving customers across Nepal\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Nepal businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Nepal teams.' },
          { icon: Star, title: 'English Support', description: 'Nepal\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Nepal market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Nepal', item: '/ai-tools-nepal' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Nepal Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Nepal&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-nepal" />
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
