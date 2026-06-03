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
  title: 'Türkçe & İngilizce Çift Dilli',
  description: 'Türkiye iş, eğitim ve günlük yaşamda Türkçe ve İngilizceyi bir arada kullanır. Her aracı çoklu dil desteği açısından değerlendiriyoruz böylece dil engelleriyle karşılaşmazsınız — 85 milyonluk nüfusa hizmet için kritik.',
  ogTitle: 'Best AI Tools in Turkey (2026) — Apifeny AI',
  ogDescription: 'Find AI tools built for Turkey. 85+ tools, expert ranked.',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function AIToolsTurkeyPage() {
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
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools Türkiye', item: '/ai-tools-turkey' }]} />
      <GeoSeoSchema
        countryName="Türkiye"
        countryCode="turkey"
        capital="Türkiye"
        currency="USD"
        language="English"
        languageCode="en"
        marketSize={"A growing market in Türkiye"}
        slug="ai-tools-turkey"
        faqs={[
 { question: "Türkiye'deki en iyi yapay zeka araçları nelerdir?", answer: "Türkiye'deki en iyi yapay zeka araçları arasında genel üretkenlik için ChatGPT, yazılım geliştirme için GitHub Copilot, tasarım için Canva AI ve yaratıcı çalışmalar için Midjourney yer alır. Türkiye'nin gelişen teknoloji ekosistemi — İstanbul, Ankara ve İzmir'deki startup merkezleriyle — yapay zeka araçlarının hızla benimsenmesini sağlamaktadır. TRAI (Türkiye Yapay Zeka İnisiyatifi) ve HAVELSAN gibi savunma teknolojisi şirketleri, yapay zeka inovasyonunda öncülük etmektedir." },
 { question: "Yapay zeka araçları Türkiye'deki işletmeler için uygun mudur?", answer: "Evet, Türkiye'nin dijital altyapısı hızla gelişmektedir. 5G'ye geçiş, artan bulut bilişim benimsemesi ve Dijital Türkiye ofisi gibi hükümet destekleriyle, Türk işletmeleri yapay zeka araçlarını giderek daha fazla kullanmaktadır. AWS'nin İstanbul Edge lokasyonu, Azure bölgesel veri merkezleri ve yerel bulut sağlayıcıları sayesinde veri egemenliği sorunları minimize edilmiştir. Birçok araç artık TRY dostu fiyatlandırma ve yerel ödeme yöntemleri (Kredi Kartı, Papara, İninal) sunmaktadır." },
 { question: "Türkiye'nin kilit sektörleri için hangi AI araçları en iyisidir?", answer: "Türkiye'de AI'dan faydalanan kilit sektörler şunlardır: savunma ve havacılık (HAVELSAN, ASELSAN, Baykar'da AI destekli sistemler), finans ve fintech (paramatik, Papara, Colendi'de AI tabanlı kredi risk değerlendirmesi), e-ticaret (Trendyol, Hepsiburada'da AI destekli öneriler), üretim ve lojistik (AI destekli tedarik zinciri optimizasyonu), sağlık (AI destekli teşhis ve Medipol, Acıbadem gibi hastanelerde hasta yönetimi) ve eğitim teknolojileri." },
 { question: "Türk girişimciler AI araçlarını nasıl uygun maliyetle kullanabilir?", answer: "Türk girişimciler, TÜBİTAK yapay zeka araştırma hibelerinden, KOSGEB teknoloji desteklerinden, Sanayi ve Teknoloji Bakanlığı'nın Teknogirişim desteklerinden ve kalkınma ajanslarının dijital dönüşüm teşviklerinden yararlanabilir. Ayrıca, birçok AI aracı ücretsiz katmanlar sunar (ChatGPT Ücretsiz, Google Colab, GitHub Copilot ücretsiz sürümü, TensorFlow/PyTorch açık kaynak) — fonlama öncesi MVP geliştirme için idealdir. İTÜ Çekirdek, Boğaziçi Üniversitesi Technopark ve ODTÜ Teknokent'teki kuluçka merkezleri de uygun fiyatlı kaynaklar sağlar." },
 { question: "Türkiye'de yapay zeka düzenlemeleri nelerdir?", answer: "Türkiye'de yapay zeka, Kişisel Verilerin Korunması Kanunu (KVKK) No. 6698 kapsamında veri gizliliği düzenlemelerine tabidir. TRAI (Türkiye Yapay Zeka İnisiyatifi), Ulusal Yapay Zeka Stratejisi (2021-2025) kapsamında AI politikalarını yönlendirmektedir. Dijital Türkiye ofisi ve Sanayi ve Teknoloji Bakanlığı AI düzenlemeleri üzerinde çalışmaktadır. Savunma sanayii AI uygulamaları ek protokollere tabidir ve BDDK fintech AI araçlarını düzenlemektedir." },
 ]}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-turkey',
          countryName: 'Türkiye',
          countryCode: 'turkey',
          capital: 'Türkiye',
          currency: 'USD',
          languages: 'English',
          heroGradient: 'from-red-600 via-white to-red-600',
          heroTitle: 'Best AI Tools for Türkiye in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r from-red-600 via-white to-red-600 bg-clip-text text-transparent">Türkiye</span>
          </>
        }
        sections={[
          { icon: Globe, title: 'English', description: 'Türkiye operates in english for business. We flag every tool for local language support — critical for serving customers across Türkiye\'s diverse regions.' },
          { icon: ShieldCheck, title: 'USD Pricing & Local Compliance', description: 'Türkiye businesses need tools that work in USD, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for Türkiye teams.' },
          { icon: Star, title: 'English Support', description: 'Türkiye\'s diverse business environment demands tools with english support, local customer service, and integration with locally-used platforms. We evaluate every tool for Türkiye market readiness.' }
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Türkiye', item: '/ai-tools-turkey' },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for Türkiye Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for Türkiye&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-turkey" />
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
