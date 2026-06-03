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
  title: 'Best AI Tools in India (2026) — 100+ Tools for Indian Startups & Enterprises',
  description: 'India is a multilingual AI goldmine. Tools ranked by their support for Indian languages — Hindi (हिन्दी), Bengali (বাংলা), Tamil (தமிழ்), Telugu (తెలుగు), Marathi (मराठी), and more — plus Hinglish code-switching (the dominant online mode). English-dominant platforms popular in Bangalore, Mumbai, and Gurgaon are also rated for localisation quality.',
  ogTitle: 'Best AI Tools in India (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for India. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsIndiaPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools India', item: '/ai-tools-india' }]} />
      <GeoSeoSchema
        countryName="India"
        countryCode="india"
        capital="India"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in India"}
        slug="ai-tools-india"
        faqs={[
 { question: "What are the best AI tools in India?", answer: "The best AI tools in India include ChatGPT for productivity, GitHub Copilot for software development across India's 100K+ startups, Canva AI for design, and Jasper for marketing. India's $1.2B+ AI market is the fastest-growing globally, driven by Digital India, UPI, and the world's third-largest startup ecosystem." },
 { question: "Are AI tools accessible for Indian businesses?", answer: "Yes. India's Jio-led digital revolution made data affordable — 800M+ internet users. Most AI tools have free tiers and INR-friendly pricing. The government's Digital India programme and Startup India initiative provide tech adoption grants. AWS's India regions (Mumbai, Hyderabad) and GCP's Mumbai region ensure low-latency access." },
 { question: "What AI tools are best for India's IT and BPO sector?", answer: "India's IT-BPM sector ($245B revenue) leads AI adoption. GitHub Copilot and Tabnine boost developer productivity for India's 5M+ software engineers. AI-powered QA tools, automation platforms, and NLP tools for multilingual Indian language support are transforming the BPO sector. Companies like TCS, Infosys, and Wipro invest heavily in proprietary AI platforms." },
 { question: "What AI regulations apply in India?", answer: "India's Digital Personal Data Protection Act (DPDPA) 2023 is the primary data protection law. The Ministry of Electronics and Information Technology (MeitY) governs AI policy. The NITI Aayog's National Strategy for AI guides ethical AI adoption. Sectoral regulators like RBI (finance) and IRDAI (insurance) impose additional AI compliance requirements." },
 { question: "Is Hindi and Indian language support available?", answer: "Support is evolving. ChatGPT supports Hindi and major Indian languages. Google's AI works well with Hindi, Tamil, Telugu, Bengali, and Marathi. Indian AI labs like Bhashini (government) and AI4Bharat develop open-source Indian language models. The government's National Language Translation Mission (NLTM) accelerates regional language AI development." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-india',
          countryName: 'India',
          countryCode: 'india',
          capital: 'India',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-orange-500 via-white to-green-500',
          heroTitle: 'Best AI Tools for India in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-orange-500 via-white to-green-500 bg-clip-text text-transparent">India</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'India operates in english for business. We flag every tool for local language support — critical for serving customers across India\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'India businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for India teams.' },
          { icon: Star, title: 'English Support', description: 'India\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for India market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools India', item: '/ai-tools-india' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for India Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for India&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-india" />
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
