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
  title: 'Best AI Tools in Egypt (2026) — Curated for Egyptian Startups & Teams',
  description: 'Discover the best AI tools for Egyptian businesses and founders. Curated directory of 85+ tools ranked by trending score, Africa-readiness, and local relevance. Updated daily. Supports Arabic, English, and regional languages.',
  ogTitle: 'Best AI Tools in Egypt (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for Egypt: local EGP pricing, data compliance, Arabic multilingual support, and African market readiness. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsEgyptPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Egypt', item: '/ai-tools-egypt' }]} />
      <GeoSeoSchema
        countryName="Egypt"
        countryCode="egypt"
        capital="Egypt"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Egypt"}
        slug="ai-tools-egypt"
        faqs={[
 { question: "ما هي أفضل أدوات الذكاء الاصطناعي في مصر في 2026؟", answer: "أفضل أدوات الذكاء الاصطناعي في مصر تشمل ChatGPT لإنشاء المحتوى والإنتاجية، وGitHub Copilot لتطوير البرمجيات، وCanva AI للتصميم، وأدوات Google AI للتشغيل الآلي. تشهد مصر نموًا سريعًا في مجال الذكاء الاصطناعي بدعم من وزارة الاتصالات وتكنولوجيا المعلومات (MCIT) والاستراتيجية الوطنية للذكاء الاصطناعي، مع أبرز المراكز في القاهرة والإسكندرية والمدن الذكية الجديدة." },
 { question: "هل أدوات الذكاء الاصطناعي مناسبة للسوق المصري؟", answer: "نعم، البنية التحتية الرقمية في مصر تشهد تطورًا كبيرًا مع انتشار الإنترنت فائق السرعة ومراكز البيانات الإقليمية (AWS البحرين، Azure الإمارات) ونظام المدفوعات الرقمية (فوري، إنستاباي، فودافون كاش). قانون حماية البيانات الشخصية المصري (قانون 151/2020) ينظم معالجة البيانات. الاستراتيجية الوطنية للذكاء الاصطناعي ورؤية مصر 2030 تدفعان بتبني الذكاء الاصطناعي في القطاعات الحيوية." },
 { question: "ما هي أدوات الذكاء الاصطناعي الأفضل للقطاعات الرئيسية في مصر؟", answer: "القطاعات المصرية الأكثر استفادة تشمل: الخدمات المالية (البنوك المصرية تستخدم الذكاء الاصطناعي للتمويل والكشف عن الاحتيال)، التكنولوجيا المالية (فوري، فالو)، الاتصالات (WE، أورنج)، اللوجستيات (قناة السويس، النقل الذكي)، التعليم (منصات مثل إدراك ونهم)، والرعاية الصحية (المستشفيات تستخدم الذكاء الاصطناعي للتشخيص)." },
 { question: "كيف يمكن للشركات الناشئة المصرية تبني الذكاء الاصطناعي بتكلفة معقولة؟", answer: "يمكن للشركات الناشئة المصرية الاستفادة من دعم هيئة تنمية صناعة تكنولوجيا المعلومات (ITIDA)، صندوق رعاية الابتكار، وحاضنات الأعمال مثل TIEC وCreativa. تقدم أدوات الذكاء الاصطناعي خططًا مجانية (ChatGPT Free، Google Colab، GitHub Copilot للطلاب) مثالية للنماذج الأولية قبل جمع التمويل." },
 { question: "ما هي اللوائح المنظمة للذكاء الاصطناعي في مصر؟", answer: "مصر تعمل على تطوير إطار تنظيمي شامل للذكاء الاصطناعي تحت إشراف المجلس الوطني للذكاء الاصطناعي (NCAI). قانون حماية البيانات الشخصية (قانون 151/2020) هو التشريع الرئيسي لحماية البيانات، وينظمه مركز حماية البيانات الشخصية. البنك المركزي المصري ينظم أدوات الذكاء الاصطناعي في القطاع المالي." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-egypt',
          countryName: 'Egypt',
          countryCode: 'egypt',
          capital: 'Egypt',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-red-600 via-white to-black',
          heroTitle: 'Best AI Tools for Egypt in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-red-600 via-white to-black bg-clip-text text-transparent">Egypt</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Egypt operates in english for business. We flag every tool for local language support — critical for serving customers across Egypt\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Egypt businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Egypt teams.' },
          { icon: Star, title: 'English Support', description: 'Egypt\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Egypt market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Egypt', item: '/ai-tools-egypt' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Egypt Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Egypt&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-egypt" />
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
