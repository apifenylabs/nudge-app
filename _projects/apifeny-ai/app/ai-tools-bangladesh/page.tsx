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
  title: 'Best AI Tools in Bangladesh (2026) — 100+ Tools for Dhaka Startups & Garment Industry',
  description: 'Bangla (Bengali)-first tools optimised for Bangladesh',
  ogTitle: 'Best AI Tools in Bangladesh (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for Bangladesh. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsBangladeshPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Bangladesh', item: '/ai-tools-bangladesh' }]} />
      <GeoSeoSchema
        countryName="Bangladesh"
        countryCode="bangladesh"
        capital="Bangladesh"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Bangladesh"}
        slug="ai-tools-bangladesh"
        faqs={[
 { question: "What are the best AI tools in Bangladesh?", answer: "The best AI tools in Bangladesh vary by use case. ChatGPT leads for general productivity, GitHub Copilot for coding, Canva AI for design, and AdCreative.ai for marketing. For Bangladesh's unique garment industry, specialized tools like Smartex AI (fabric defect detection) and BlueSign AI (textile sustainability) are top choices." },
 { question: "Are AI tools available in Bengali (বাংলা)?", answer: "Yes, an increasing number of AI tools support Bengali. ChatGPT handles Bengali prompts with reasonable accuracy. Canva supports Bengali Unicode fonts. However, specialized Bengali NLP tools remain limited, creating opportunities for locally adapted solutions." },
 { question: "How can Bangladeshi businesses adopt AI?", answer: "Bangladeshi businesses can start with cloud-based AI tools requiring no infrastructure. ChatGPT for customer support, Canva AI for marketing materials, GitHub Copilot for development teams, and specialized RMG tools for the garment sector. Most offer free tiers to test before committing." },
 { question: 'What AI tools are best for the RMG/garment industry in Bangladesh?', answer: 'Bangladesh\'s $46B garment industry benefits from Smartex AI (fabric defect detection via computer vision), BlueSign AI (textile sustainability compliance), Calico AI (fashion trend forecasting), and Fashinza AI (supply chain optimization). These tools address quality control, sustainability certification, and global buyer compliance.' },
 { question: 'What payment methods do AI tools accept in Bangladesh?', answer: 'Most international AI tools accept credit/debit cards and PayPal. Some are adding support for bKash and Nagad, Bangladesh\'s leading mobile financial services. Pricing is typically in USD, though a growing number offer BDT-friendly payment options through local resellers or partners.' },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-bangladesh',
          countryName: 'Bangladesh',
          countryCode: 'bangladesh',
          capital: 'Bangladesh',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-green-600 via-red-600 to-green-600',
          heroTitle: 'Best AI Tools for Bangladesh in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-green-600 via-red-600 to-green-600 bg-clip-text text-transparent">Bangladesh</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Bangladesh operates in english for business. We flag every tool for local language support — critical for serving customers across Bangladesh\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Bangladesh businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Bangladesh teams.' },
          { icon: Star, title: 'English Support', description: 'Bangladesh\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Bangladesh market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Bangladesh', item: '/ai-tools-bangladesh' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Bangladesh Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Bangladesh&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-bangladesh" />
      </section>

      <BrowseByCountry />

            <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BlogCategoryLinks />
        </div>
      </section>
      <CountryBlogPosts
        countryName="Bangladesh"
        countrySlug="bangladesh"
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
