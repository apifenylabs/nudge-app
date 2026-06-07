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
  title: 'Best AI Tools in Pakistan (2026) — Curated for PK Startups & Teams',
  description: 'Discover the best AI tools for Pakistan businesses and founders. Curated directory of 85+ tools ranked by trending score, Asia-readiness, and local relevance. Updated daily. Supports Urdu, English, and regional languages.',
  ogTitle: 'Best AI Tools in Pakistan (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for Pakistan: local PKR pricing, data compliance, Urdu multilingual support, and Asian market readiness. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsPakistanPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Pakistan', item: '/ai-tools-pakistan' }]} />
      <GeoSeoSchema
        countryName="Pakistan"
        countryCode="pakistan"
        capital="Pakistan"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Pakistan"}
        slug="ai-tools-pakistan"
        faqs={[
 { question: "What are the best AI tools in Pakistan?", answer: "The best AI tools in Pakistan include ChatGPT for content creation and productivity, GitHub Copilot for software development, Canva AI for design, and Google AI tools for business automation. Pakistan's rapidly growing IT sector (exports exceeding $2.5B) and DigiPakistan initiative make AI adoption a key priority for businesses, freelancers, and startups across Karachi, Lahore, Islamabad, and Rawalpindi." },
 { question: "Are AI tools Pakistan-ready for local businesses?", answer: "Yes, Pakistan's digital infrastructure is expanding rapidly with 3G/4G penetration exceeding 50%, growing cloud adoption, and government support under the Digital Pakistan policy. Pakistani businesses benefit from regional cloud availability (AWS Bahrain, Azure UAE), growing fintech ecosystem (JazzCash, Easypaisa, NayaPay), and improving IP enforcement. Many tools now offer PKR-friendly pricing via regional resellers." },
 { question: "What AI tools are best for Pakistan's key industries?", answer: "Pakistan's key sectors benefiting from AI include: IT & software exports (freelancers using AI coding tools on Upwork/Fiverr), e-commerce AI for Daraz and regional marketplaces, textile and manufacturing AI for efficiency, agricultural AI for crop monitoring and yield prediction, fintech AI for digital lending and Islamic banking, and education AI for EdTech platforms like Sabaq and Taleemabad." },
 { question: "How can Pakistani startups adopt AI cost-effectively?", answer: "Pakistani startups can leverage the Ignite National Technology Fund grants for AI R&D, P@SHA Seed & Growth Fund, State Bank's refinancing scheme for technology startups at subsidized rates, and the Ministry of IT's Digital Pakistan Innovation Challenge. Most AI tools offer free tiers (ChatGPT Free, Google Colab, GitHub Copilot free for students via GitHub Education, TensorFlow/PyTorch open source) — ideal for MVP development before fundraising." },
 { question: "What AI regulations exist in Pakistan?", answer: "Pakistan is developing its AI governance framework under the Ministry of IT and Telecommunication's Digital Pakistan Vision. The Prevention of Electronic Crimes Act (PECA) 2016 governs data handling for AI tools. Pakistan's proposed Personal Data Protection Bill will further regulate AI data processing. The State Bank of Pakistan (SBP) regulates fintech AI tools, and PTA provides oversight for AI in telecom and digital services. Tools handling sensitive data should consider regional cloud infrastructure." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-pakistan',
          countryName: 'Pakistan',
          countryCode: 'pakistan',
          capital: 'Pakistan',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-green-600 via-white to-green-600',
          heroTitle: 'Best AI Tools for Pakistan in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-green-600 via-white to-green-600 bg-clip-text text-transparent">Pakistan</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Pakistan operates in english for business. We flag every tool for local language support — critical for serving customers across Pakistan\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Pakistan businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Pakistan teams.' },
          { icon: Star, title: 'English Support', description: 'Pakistan\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Pakistan market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Pakistan', item: '/ai-tools-pakistan' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Pakistan Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Pakistan&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-pakistan" />
      </section>

      <BrowseByCountry />

            <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BlogCategoryLinks />
        </div>
      </section>
      <CountryBlogPosts
        countryName="Pakistan"
        countrySlug="pakistan"
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
