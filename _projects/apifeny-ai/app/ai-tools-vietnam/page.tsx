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
  title: 'Công Cụ AI Tốt Nhất tại Việt Nam (2026) — 85+ Tools Cho Startup & Doanh Nghiệp',
  description: 'Khám phá các công cụ AI tốt nhất cho doanh nghiệp Việt Nam. Danh mục 85+ công cụ được xếp hạng theo trend, hỗ trợ tiếng Việt, PDPA, và định giá VND. Cập nhật hằng ngày.',
  ogTitle: 'Công Cụ AI Tốt Nhất tại Việt Nam (2026) — Apifeny AI',
  ogDescription: 'Tìm công cụ AI phù hợp với doanh nghiệp Việt: hỗ trợ tiếng Việt, giá VND, tuân thủ PDPA, và sẵn sàng cho thị trường châu Á. 85+ công cụ, xếp hạng chuyên gia.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsVietnamPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Vietnam', item: '/ai-tools-vietnam' }]} />
      <GeoSeoSchema
        countryName="Vietnam"
        countryCode="vietnam"
        capital="Vietnam"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Vietnam"}
        slug="ai-tools-vietnam"
        faqs={[
 { question: "What are the best AI tools in Vietnam?", answer: "The best AI tools for Vietnamese teams include ChatGPT for content creation, GitHub Copilot for development, Canva AI for design, and Zalo AI for local-language processing. Vietnam's rapidly expanding digital economy and young, tech-savvy population drive strong AI adoption." },
 { question: "Are AI tools accessible for Vietnamese businesses?", answer: "Yes, but pricing matters. Most global AI tools charge in USD, which affects affordability. Vietnamese businesses benefit from local alternatives like Zalo AI, Vbee for TTS, and FPT.AI. The government's National Digital Transformation Programme targets 100% digital enterprises and offers technology adoption incentives." },
 { question: "What AI tools suit Vietnam's key industries?", answer: "Manufacturing (35% of GDP) benefits from computer vision AI for quality control. E-commerce benefits from chatbots and recommendation engines. Fintech uses AI for credit scoring and fraud detection. Agriculture AI for crop monitoring is growing with support from the MARD digital farming initiative." },
 { question: "What AI regulations apply in Vietnam?", answer: "Vietnam's Cybersecurity Law (2018) and Decree 13/2023 on Personal Data Protection affect AI tool deployment. Cross-border data transfers require government approval. AI tools processing Vietnamese user data should consider local servers in Ho Chi Minh City or Hanoi." },
 { question: "Is Vietnamese language well supported by AI tools?", answer: "Support is growing. ChatGPT handles Vietnamese well. Google Translate and DeepL have good Vietnamese support. Local tools like Zalo AI, Vbee, and VinaSpeech provide Vietnamese-first functionality. The Vietnamese government's Make in Vietnam initiative promotes domestic AI solutions." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-vietnam',
          countryName: 'Vietnam',
          countryCode: 'vietnam',
          capital: 'Vietnam',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-red-600 via-yellow-400 to-red-600',
          heroTitle: 'Best AI Tools for Vietnam in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 bg-clip-text text-transparent">Vietnam</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Vietnam operates in english for business. We flag every tool for local language support — critical for serving customers across Vietnam\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Vietnam businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Vietnam teams.' },
          { icon: Star, title: 'English Support', description: 'Vietnam\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Vietnam market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Vietnam', item: '/ai-tools-vietnam' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Vietnam Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Vietnam&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-vietnam" />
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
