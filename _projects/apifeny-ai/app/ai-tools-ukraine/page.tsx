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
  title: 'Best AI Tools in Ukraine (2026) — Curated for Ukrainian Teams & Startups',
  description: 'Discover the best AI tools for Ukrainian businesses and developers. Curated directory of 85+ tools ranked by trending score, Ukraine-market readiness, and local relevance. Updated daily. Built for Kyiv, Lviv, Kharkiv, and Ukraine',
  ogTitle: 'Best AI Tools in Ukraine (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for Ukraine: EU-aligned, UAH/pricing, Ukrainian/English support, and GDPR compliance. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsUkrainePage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Ukraine', item: '/ai-tools-ukraine' }]} />
      <GeoSeoSchema
        countryName="Ukraine"
        countryCode="ukraine"
        capital="Ukraine"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Ukraine"}
        slug="ai-tools-ukraine"
        faqs={[
 { question: "What are the best AI tools for Ukrainian startups in 2026?", answer: "Top AI tools for Ukrainian startups include ChatGPT for bilingual UA/EN workflows, Grammarly (founded by Ukrainians) for writing, GitHub Copilot for development, and Notion AI for project management. For EU-market expansion, HubSpot AI, Jasper, and TensorFlow-based custom models are widely adopted." },
 { question: "How can Ukrainian developers access AI tools despite sanctions and payment restrictions?", answer: "Many AI tool providers now accept UAH via local payment processors (Portmone, LiqPay) or cryptocurrency. Service-based tools like OpenAI's API accept international cards and EUR/USD accounts. Some tools offer special wartime pricing or extended trials for Ukrainian users." },
 { question: "Do AI tools support the Ukrainian language?", answer: "Major AI platforms including ChatGPT, Claude, and Google AI now fully support Ukrainian language input and output. Grammarly offers Ukrainian English grammar correction. For NLP and text analytics, Ukrainian-specific models (like Ukrainian BERT) are available on Hugging Face." },
 { question: "What AI tools are best for Ukraine's defense and agritech sectors?", answer: "For defense: Palantir, drone AI analytics (via local startups like Himera), and SIGINT AI tools. For agritech: John Deere Operations Center AI, Cropio, and local platforms like Kray. Many defense and agritech tools offer Ukrainian-language interfaces and offline-capable deployments." },
 { question: "Are there free or low-cost AI tools for Ukrainian students and educators?", answer: "Yes — Microsoft Education AI, Google Workspace for Education, and ChatGPT Free provide robust free tiers. The Ministry of Digital Transformation's 'Diia' platform also integrates AI services. GitHub Education Pack offers free Copilot access for verified Ukrainian students." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-ukraine',
          countryName: 'Ukraine',
          countryCode: 'ukraine',
          capital: 'Ukraine',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-blue-600 via-yellow-400 to-blue-600',
          heroTitle: 'Best AI Tools for Ukraine in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-blue-600 via-yellow-400 to-blue-600 bg-clip-text text-transparent">Ukraine</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Ukraine operates in english for business. We flag every tool for local language support — critical for serving customers across Ukraine\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Ukraine businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Ukraine teams.' },
          { icon: Star, title: 'English Support', description: 'Ukraine\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Ukraine market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Ukraine', item: '/ai-tools-ukraine' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Ukraine Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Ukraine&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-ukraine" />
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
