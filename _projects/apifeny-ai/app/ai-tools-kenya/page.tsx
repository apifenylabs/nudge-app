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
  title: 'Best AI Tools in Kenya (2026) — Curated for Kenyan Startups & Teams',
  description: 'Discover the best AI tools for Kenyan businesses and founders. Curated directory of 85+ tools ranked by trending score, Africa-readiness, and local relevance. Updated daily. Supports Swahili, English, and regional languages.',
  ogTitle: 'Best AI Tools in Kenya (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for Kenya: local KES pricing, data compliance, Swahili multilingual support, and African market readiness. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsKenyaPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Kenya', item: '/ai-tools-kenya' }]} />
      <GeoSeoSchema
        countryName="Kenya"
        countryCode="kenya"
        capital="Kenya"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Kenya"}
        slug="ai-tools-kenya"
        faqs={[
 { question: "What are the best AI tools in Kenya?", answer: "The best AI tools in Kenya include ChatGPT for content creation and productivity, GitHub Copilot for software development, Canva AI for design, and Google AI tools for business automation. Kenya's Silicon Savannah hosts a thriving ecosystem of AI startups centered around Nairobi, with Safaricom's AI initiatives, iHub innovation lab, and the Africa AI Lab at Strathmore University driving local AI adoption across fintech, agtech, and health." },
 { question: "Are AI tools Kenya-ready for local businesses?", answer: "Yes, Kenya has one of Africa's most advanced digital economies with 95%+ mobile money penetration via M-Pesa, widespread 4G/5G coverage, and growing cloud adoption through regional data centers. The Data Protection Act (2019) regulates personal data handling, and the Ministry of ICT's Kenya Digital Economy blueprint drives AI adoption. M-Pesa, now an AI-powered platform, processes over $30B in transactions monthly, demonstrating Kenya's readiness for sophisticated AI tools." },
 { question: "What AI tools are best for Kenya's key industries?", answer: "Kenya's key AI sectors include: fintech (M-Pesa, Branch, Tala using AI for credit scoring and fraud detection), agtech (iCow, Apollo Agriculture for AI-powered crop monitoring and insurance), healthtech (AFRICA Health, m-TIBA for AI diagnostics), e-commerce (Jumia, Kilimall with AI-powered logistics), education (Eneza Education, M-Shule with AI learning platforms), and boda boda logistics (SafeBoda, Little with AI route optimization)." },
 { question: "How can Kenyan startups adopt AI cost-effectively?", answer: "Kenyan startups can leverage the Kenya Innovation Agency (KeNIA) grants, Nailab accelerator programs, iHub innovation funding, and the $100M+ venture capital flowing into Nairobi's tech ecosystem from investors like Y Combinator, TLcom Capital, and Novastar Ventures. Most AI tools offer free tiers (ChatGPT Free, Google Colab, GitHub Copilot Education) ideal for MVP development. Google's startup programs and Microsoft's Africa Development Centre also provide AI resources." },
 { question: "What AI regulations exist in Kenya?", answer: "Kenya's Data Protection Act (2019) establishes the Office of the Data Protection Commissioner (ODPC) and governs personal data handling. The Kenya Information and Communications Act (KICA) regulates digital services, while the Central Bank of Kenya (CBK) oversees AI in fintech. Kenya's National AI Strategy is being developed under the Ministry of ICT. The East African Community (EAC) also develops regional digital frameworks that affect AI tool deployment." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-kenya',
          countryName: 'Kenya',
          countryCode: 'kenya',
          capital: 'Kenya',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-black via-red-600 to-green-600',
          heroTitle: 'Best AI Tools for Kenya in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-black via-red-600 to-green-600 bg-clip-text text-transparent">Kenya</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Kenya operates in english for business. We flag every tool for local language support — critical for serving customers across Kenya\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Kenya businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Kenya teams.' },
          { icon: Star, title: 'English Support', description: 'Kenya\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Kenya market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Kenya', item: '/ai-tools-kenya' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Kenya Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Kenya&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-kenya" />
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
