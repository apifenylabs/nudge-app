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
  title: 'Best AI Tools in the Philippines (2026) — 85+ Tools for Filipino Startups & Enterprises',
  description: 'Discover the best AI tools for the Philippines. 85+ ranked tools with PHP pricing, NPC compliance, and local ecosystem support. Updated daily for Filipino solopreneurs, SMEs, and enterprises.',
  ogTitle: 'Best AI Tools in the Philippines (2026) — Apifeny AI',
  ogDescription: '85+ AI tools ranked for the Philippine market. 🇵🇭 PHP pricing, NPC-compliant, Filipino-language supported.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsPhilippinesPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Philippines', item: '/ai-tools-philippines' }]} />
      <GeoSeoSchema
        countryName="Philippines"
        countryCode="philippines"
        capital="Philippines"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Philippines"}
        slug="ai-tools-philippines"
        faqs={[
 { question: "What are the best AI tools in the Philippines?", answer: "The best AI tools for Filipino teams include ChatGPT for content and productivity, GitHub Copilot for development, Canva AI for design, and Grammarly for writing. The Philippines' strong English proficiency and BPO industry make it a natural fit for AI-powered business tools." },
 { question: "Are AI tools affordable for Filipino startups?", answer: "Most major AI tools offer free tiers suitable for startup validation. The DICT's Digital Startup Development and Acceleration Programme provides grants. Philippine startups can also access the DOST's Small Enterprise Technology Upgrading Programme (SETUP) for technology adoption." },
 { question: "What AI tools are best for the BPO industry?", answer: "The Philippines' BPO sector ($32B revenue) benefits from AI tools like Gong for call analysis, Intercom for AI chatbots, Notion AI for documentation, and Otter.ai for transcription. AI-powered quality assurance and sentiment analysis are transforming the BPO industry." },
 { question: "What AI regulations apply in the Philippines?", answer: "The Data Privacy Act of 2012 (RA 10173) governs personal data processing. The NPC (National Privacy Commission) enforces compliance. BPO companies handling international client data must meet their clients' GDPR or equivalent requirements." },
 { question: "What local AI initiatives exist in the Philippines?", answer: "The DOST-ASTI (Advanced Science and Technology Institute) develops local AI solutions. The National AI Roadmap (2022-2028) targets AI adoption across government services. UP Diliman's Electrical and Electronics Engineering Institute leads AI research with a focus on Filipino language processing." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-philippines',
          countryName: 'Philippines',
          countryCode: 'philippines',
          capital: 'Philippines',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-blue-600 via-white to-red-600',
          heroTitle: 'Best AI Tools for Philippines in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-blue-600 via-white to-red-600 bg-clip-text text-transparent">Philippines</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Philippines operates in english for business. We flag every tool for local language support — critical for serving customers across Philippines\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Philippines businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Philippines teams.' },
          { icon: Star, title: 'English Support', description: 'Philippines\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Philippines market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Philippines', item: '/ai-tools-philippines' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Philippines Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Philippines&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-philippines" />
      </section>

      <BrowseByCountry />

            <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BlogCategoryLinks />
        </div>
      </section>
      <CountryBlogPosts
        countryName="Philippines"
        countrySlug="philippines"
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
