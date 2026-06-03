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
  title: 'Best AI Tools in China (2026) — Curated for China Developers & Teams',
  description: 'Discover the best AI tools for China. Curated directory of 85+ tools ranked for Chinese language support, ¥ RMB pricing, data compliance (CSL/PIPL/DSL), and China market readiness. Updated daily.',
  ogTitle: 'Best AI Tools in China (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for China: 中文 support, ¥ RMB pricing, China data compliance, and WeChat/Alipay ecosystem readiness. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsChinaPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools China', item: '/ai-tools-china' }]} />
      <GeoSeoSchema
        countryName="China"
        countryCode="china"
        capital="China"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in China"}
        slug="ai-tools-china"
        faqs={[
 { question: "What are the best AI tools in China?", answer: "The best AI tools in China range from global platforms with 中文 support (ChatGPT, Claude, Gemini) to China-native powerhouses (Baidu ERNIE Bot, Alibaba Tongyi Qianwen, ByteDance Doubao, Zhipu GLM, MiniMax, Baichuan, SenseTime, Megvii). China is the world's #2 AI ecosystem behind the US, with Beijing's Zhongguancun, Shanghai's Zhangjiang, and Shenzhen's tech corridor producing a continuous stream of cutting-edge AI innovation." },
 { question: "Are foreign AI tools accessible in China?", answer: "Many global AI tools are accessible in China but with caveats. ChatGPT, Claude, and Gemini require VPN access due to China's Great Firewall. However, an increasing number of tools offer China-hosted versions or partnerships: Microsoft Azure OpenAI Service operates through 21Vianet in China, and many SaaS platforms have dedicated 中国版 (China editions) with local data residency. China's domestic AI ecosystem is exceptionally strong, with Baidu, Alibaba, Tencent, and ByteDance investing billions in AI." },
 { question: "What are the best AI tools for China's key industries?", answer: "China's AI strength spans: manufacturing & Industry 4.0 (Hikvision computer vision, Megvii industrial inspection, Baidu Apollo autonomous driving), fintech (Ant Group, WeChat Pay AI, JD Finance), healthcare AI (Ping An Health, Tencent Miying, iFlytek medical AI), e-commerce AI (Alibaba's Tongyi LLM, JD.com supply chain AI, Pinduoduo recommendation engines), edtech (Squirrel AI, Yuanfudao, iFlytek), and smart city AI (Dahua, Hikvision, SenseTime urban management systems)." },
 { question: "How can Chinese developers and startups adopt AI cost-effectively?", answer: "China developers benefit from the world's most aggressive cloud pricing: Alibaba Cloud, Baidu AI Cloud, Tencent Cloud, and Huawei Cloud all offer generous free tiers, startup credits, and SDK/API access. Alibaba Cloud's AI Platform provides access to Tongyi Qianwen and model-as-a-service pricing starting at ¥0.003 per 1K tokens. Baidu's Qianfan platform offers ERNIE Bot API access with free quotas. Startup incubators in Zhongguancun (Beijing), Zhangjiang (Shanghai), and Nanshan (Shenzhen) provide subsidized AI compute credits." },
 { question: "What AI regulations apply in China?", answer: "China has the world's most comprehensive AI regulatory framework: the Personal Information Protection Law (PIPL, 2021), Data Security Law (DSL, 2021), Cybersecurity Law (CSL, 2017), and the landmark AI governance regulations (2023) requiring algorithm filing, safety assessments, and content watermarking for generative AI services. The Cyberspace Administration of China (CAC) oversees AI content. Deep synthesis and generative AI services must register with the CAC and pass security reviews." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-china',
          countryName: 'China',
          countryCode: 'china',
          capital: 'China',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-red-600 via-yellow-400 to-red-600',
          heroTitle: 'Best AI Tools for China in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 bg-clip-text text-transparent">China</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'China operates in english for business. We flag every tool for local language support — critical for serving customers across China\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'China businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for China teams.' },
          { icon: Star, title: 'English Support', description: 'China\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for China market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools China', item: '/ai-tools-china' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for China Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for China&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-china" />
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
