'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Trophy,
  Star,
  Zap,
  BookOpen,
  MapPin,
  Globe,
  Wallet,
  ShieldCheck,
  BarChart3,
  CheckCircle,
  Quote,
  Layers,
} from 'lucide-react';

import SeoMetadata from '@/components/SeoMetadata';
import FeaturedPlaybooks from '@/components/FeaturedPlaybooks';
import BlogCategoryLinks from '@/components/BlogCategoryLinks';
import LandingPageCrossLinks from '@/components/LandingPageCrossLinks';
import { toolsData } from '@/lib/data';
import { playbooks } from '@/lib/playbooks';
import { cn } from '@/lib/utils';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import GeoSeoSchema from '@/components/GeoSeoSchema';

// ─── Constants ────────────────────────────────────────────────────────────────

const META = {
  title: "Türkiye'nin En İyi Yapay Zeka Araçları (2026) — Startup ve Ekibiniz İçin",
  description:
    "Türkiye'deki işletmeler ve girişimciler için en iyi yapay zeka araçlarını keşfedin. 85+ araç, trend puanına, Türkçe desteğine ve yerel uygunluğa göre sıralanmıştır. Her gün güncellenir. Türkçe, İngilizce ve bölgesel dilleri destekler.",
  ogTitle: "Türkiye'nin En İyi Yapay Zeka Araçları (2026) — Apifeny AI",
  ogDescription:
    "Türkiye pazarı için özel olarak seçilmiş yapay zeka araçları: yerel TRY fiyatlandırması, KVKK uyumluluğu, Türkçe çoklu dil desteği ve Asya pazarına hazırlık. 85+ araç, uzman sıralaması.",
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function topByTrending(limit: number) {
  return [...toolsData]
    .filter((t) => t.is_published)
    .sort((a, b) => b.trending_score - a.trending_score)
    .slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData]
    .filter((t) => t.is_published && t.category === category)
    .sort((a, b) => b.trending_score - a.trending_score)
    .slice(0, limit);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AIToolsTurkeyPage() {
  const top12 = useMemo(() => topByTrending(12), []);

  const categorySections = useMemo(
    () =>
      CATEGORY_NAMES.map((name) => ({
        name,
        tools: topByCategory(name, 6),
        count: toolsData.filter((t) => t.is_published && t.category === name).length,
      })),
    []
  );

  const totalCount = useMemo(
    () => toolsData.filter((t) => t.is_published).length,
    []
  );

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools Turkey', item: '/ai-tools-turkey' },
        ]}
      />
      <GeoSeoSchema
        countryName="Turkey"
        countryCode="tr"
        capital="Ankara"
        currency="TRY"
        language="Turkish"
        languageCode="tr"
        marketSize={"$1.1T economy, 85M population, booming defense-tech and fintech ecosystem, strategic bridge between Europe and Asia"}
        slug="ai-tools-turkey"
        faqs={[
          { question: "Türkiye'deki en iyi yapay zeka araçları nelerdir?", answer: "Türkiye'deki en iyi yapay zeka araçları arasında genel üretkenlik için ChatGPT, yazılım geliştirme için GitHub Copilot, tasarım için Canva AI ve yaratıcı çalışmalar için Midjourney yer alır. Türkiye'nin gelişen teknoloji ekosistemi — İstanbul, Ankara ve İzmir'deki startup merkezleriyle — yapay zeka araçlarının hızla benimsenmesini sağlamaktadır. TRAI (Türkiye Yapay Zeka İnisiyatifi) ve HAVELSAN gibi savunma teknolojisi şirketleri, yapay zeka inovasyonunda öncülük etmektedir." },
          { question: "Yapay zeka araçları Türkiye'deki işletmeler için uygun mudur?", answer: "Evet, Türkiye'nin dijital altyapısı hızla gelişmektedir. 5G'ye geçiş, artan bulut bilişim benimsemesi ve Dijital Türkiye ofisi gibi hükümet destekleriyle, Türk işletmeleri yapay zeka araçlarını giderek daha fazla kullanmaktadır. AWS'nin İstanbul Edge lokasyonu, Azure bölgesel veri merkezleri ve yerel bulut sağlayıcıları sayesinde veri egemenliği sorunları minimize edilmiştir. Birçok araç artık TRY dostu fiyatlandırma ve yerel ödeme yöntemleri (Kredi Kartı, Papara, İninal) sunmaktadır." },
          { question: "Türkiye'nin kilit sektörleri için hangi AI araçları en iyisidir?", answer: "Türkiye'de AI'dan faydalanan kilit sektörler şunlardır: savunma ve havacılık (HAVELSAN, ASELSAN, Baykar'da AI destekli sistemler), finans ve fintech (paramatik, Papara, Colendi'de AI tabanlı kredi risk değerlendirmesi), e-ticaret (Trendyol, Hepsiburada'da AI destekli öneriler), üretim ve lojistik (AI destekli tedarik zinciri optimizasyonu), sağlık (AI destekli teşhis ve Medipol, Acıbadem gibi hastanelerde hasta yönetimi) ve eğitim teknolojileri." },
          { question: "Türk girişimciler AI araçlarını nasıl uygun maliyetle kullanabilir?", answer: "Türk girişimciler, TÜBİTAK yapay zeka araştırma hibelerinden, KOSGEB teknoloji desteklerinden, Sanayi ve Teknoloji Bakanlığı'nın Teknogirişim desteklerinden ve kalkınma ajanslarının dijital dönüşüm teşviklerinden yararlanabilir. Ayrıca, birçok AI aracı ücretsiz katmanlar sunar (ChatGPT Ücretsiz, Google Colab, GitHub Copilot ücretsiz sürümü, TensorFlow/PyTorch açık kaynak) — fonlama öncesi MVP geliştirme için idealdir. İTÜ Çekirdek, Boğaziçi Üniversitesi Technopark ve ODTÜ Teknokent'teki kuluçka merkezleri de uygun fiyatlı kaynaklar sağlar." },
          { question: "Türkiye'de yapay zeka düzenlemeleri nelerdir?", answer: "Türkiye'de yapay zeka, Kişisel Verilerin Korunması Kanunu (KVKK) No. 6698 kapsamında veri gizliliği düzenlemelerine tabidir. TRAI (Türkiye Yapay Zeka İnisiyatifi), Ulusal Yapay Zeka Stratejisi (2021-2025) kapsamında AI politikalarını yönlendirmektedir. Dijital Türkiye ofisi ve Sanayi ve Teknoloji Bakanlığı AI düzenlemeleri üzerinde çalışmaktadır. Savunma sanayii AI uygulamaları ek protokollere tabidir ve BDDK fintech AI araçlarını düzenlemektedir." },
        ]}
      />
      <SeoMetadata
        title={META.title}
        description={META.description}
        ogTitle={META.ogTitle}
        ogDescription={META.ogDescription}
        ogImage={META.ogImage}
      />

      {/* ───── HERO ───── */}
      <section className="relative overflow-hidden border-b border-tech-500/20">
        <div className="absolute inset-0 bg-tech-grid opacity-40 pointer-events-none" />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-neon/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-aqua/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs sm:text-sm font-medium mb-6 animate-fade-in">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              🇹🇷 Türkiye-Odaklı · Her Gün Güncellenir · {totalCount}+ Seçilmiş Araç
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight animate-slide-up">
              Türkiye'deki En İyi{' '}
              <span className="bg-gradient-to-r from-red-400 via-white to-red-300 bg-clip-text text-transparent">
                Yapay Zeka Araçları
              </span>
              <br />
              <span className="text-tech-100">2026</span>
            </h1>

            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-tech-200 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <strong className="text-white">Türkiye için gerçekten çalışan</strong> yapay zeka araçlarını keşfedin.
              Her aracı Türkçe/İngilizce çoklu dil desteği, yerel TRY fiyatlandırması,
              KVKK uyumluluğu ve Asya-Avrupa pazarına hazırlık açısından değerlendiriyoruz.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link
                href="/tools"
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-neon to-neon-dark text-white font-semibold text-sm sm:text-base transition-all hover:shadow-lg hover:shadow-neon/25 hover:-translate-y-0.5"
              >
                <span>{totalCount}+ Aracın Tümünü Keşfedin</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/categories/writing-content"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-tech-500/40 text-tech-100 hover:border-neon/30 hover:text-white text-sm sm:text-base font-medium transition-all"
              >
                Kategorilere Göz Atın
              </Link>
            </div>

            {/* TR-specific trust indicators */}
            <div className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-tech-300 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-red-400" />
                <span>Türkçe / English</span>
              </div>
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-yellow-400" />
                <span>TRY Fiyatlandırma</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-aqua" />
                <span>KVKK Uyumlu</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-neon-light" />
                <span>TR Startup'lara Hazır</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── TOP TOOLS ───── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5 text-red-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Türkiye'deki En İyi Yapay Zeka Araçları
              </h2>
            </div>
            <p className="text-sm sm:text-base text-tech-200 ml-[52px]">
              Tüm kategorilerde en yüksek puanlı araçlar — trend puanı ve Asya-Avrupa pazarına hazırlık açısından sıralanmıştır
            </p>
          </div>
          <Link
            href="/tools"
            className="group inline-flex items-center gap-1.5 text-sm text-neon-light hover:text-neon transition shrink-0"
          >
            Tümünü görün
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {top12.map((tool, i) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className={cn(
                'group relative block rounded-xl border border-tech-500/30 bg-tech-700 p-5 transition-all duration-300',
                'hover:border-neon/40 hover:shadow-lg hover:shadow-neon/5 hover:-translate-y-1',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50'
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-tech-500 to-tech-600 flex items-center justify-center border border-tech-400/20 group-hover:border-neon/30 transition shrink-0">
                    <span className="text-white font-bold text-xs">
                      {tool.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-white truncate max-w-[140px] group-hover:text-neon-light transition">
                      {tool.name}
                    </h3>
                    <p className="text-[11px] text-tech-300 truncate max-w-[140px]">{tool.tagline}</p>
                  </div>
                </div>
                <span
                  className={cn(
                    'shrink-0 inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium border',
                    tool.pricing_tier === 'Free'
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : tool.pricing_tier === 'Freemium'
                      ? 'bg-sky-500/20 text-sky-400 border-sky-500/30'
                      : tool.pricing_tier === 'Paid'
                      ? 'bg-neon/20 text-neon-light border-neon/30'
                      : tool.pricing_tier === 'Enterprise'
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                  )}
                >
                  {tool.pricing_tier === 'Freemium' ? 'Ücretsiz+' : tool.pricing_tier}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-0.5">
                  {(() => {
                    const stars: ('full' | 'half' | 'empty')[] = [];
                    for (let i = 1; i <= 5; i++) {
                      if (tool.avg_rating >= i) stars.push('full');
                      else if (tool.avg_rating >= i - 0.5) stars.push('half');
                      else stars.push('empty');
                    }
                    return stars.map((s, si) => (
                      <Star
                        key={si}
                        className={cn(
                          'w-3 h-3',
                          s === 'full'
                            ? 'fill-red-400 text-red-400'
                            : s === 'half'
                            ? 'fill-red-400/50 text-red-400'
                            : 'fill-none text-tech-400'
                        )}
                      />
                    ));
                  })()}
                </div>
                <span className="text-xs text-tech-200">
                  {tool.avg_rating.toFixed(1)}
                  {tool.total_ratings >= 1000
                    ? ` (${(tool.total_ratings / 1000).toFixed(1)}K)`
                    : ` (${tool.total_ratings})`}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-tech-600 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-neon to-aqua transition-all duration-500"
                    style={{ width: `${tool.trending_score}%` }}
                  />
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <TrendingUp className="w-3 h-3 text-neon-light" />
                  <span className="text-[10px] font-medium text-neon-light">{tool.trending_score}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/tools"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-neon to-neon-dark text-white font-semibold text-sm sm:text-base transition-all hover:shadow-lg hover:shadow-neon/25 hover:-translate-y-0.5"
          >
            <span>{totalCount}+ Aracın Tümünü Keşfedin →</span>
          </Link>
        </div>
      </section>

      {/* ───── WHY TURKEY MATTERS ───── */}
      <section className="border-y border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-white/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-red-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Türkiye'nin Kendi Yapay Zeka Araç Rehberine Neden İhtiyacı Var?
              </h2>
            </div>
            <p className="text-sm sm:text-base text-tech-200 max-w-xl mx-auto">
              Çoğu yapay zeka aracı sıralaması ABD veya AB pazarları için yapılır. İşte Türkiye için önemli olanlar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Globe,
                title: 'Türkçe & İngilizce Çift Dilli',
                description: 'Türkiye iş, eğitim ve günlük yaşamda Türkçe ve İngilizceyi bir arada kullanır. Her aracı çoklu dil desteği açısından değerlendiriyoruz böylece dil engelleriyle karşılaşmazsınız — 85 milyonluk nüfusa hizmet için kritik.',
                gradient: 'from-neon/10 to-purple-900/10',
              },
              {
                icon: Wallet,
                title: 'TRY Fiyatlandırma & Yerel Ödemeler',
                description: '1 USD ≈ 30 TRY olan döviz kuruyla, dolar bazlı fiyatlandırma Türk alım gücünü yansıtmaz. Bölgesel fiyatlandırma, TRY faturalandırma ve Kredi Kartı, Papara, İninal gibi yerel ödeme yöntemleri sunan araçları öne çıkarıyoruz.',
                gradient: 'from-red-500/10 to-orange-900/10',
              },
              {
                icon: ShieldCheck,
                title: 'KVKK & Veri Egemenliği',
                description: "KVKK (Kişisel Verilerin Korunması Kanunu) No. 6698 ve artan siber güvenlik odağıyla, araçları bölgesel bulut altyapısı ve Türk işletmeleri için veri uyumluluğu sunup sunmadıklarına göre sıralıyoruz. AWS İstanbul Edge ve Azure bölgesel veri merkezleri önemli avantajlar sağlar.",
                gradient: 'from-aqua/10 to-cyan-900/10',
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`relative rounded-xl bg-gradient-to-br ${item.gradient} bg-tech-700 border border-tech-500/30 p-6`}
              >
                <div className="absolute inset-0 bg-tech-grid opacity-20 rounded-xl pointer-events-none" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-tech-600/60 flex items-center justify-center border border-tech-500/20 mb-4">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-tech-200 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CATEGORY SECTIONS ───── */}
      {categorySections.map((section) => {
        const sectionSlug = section.name === 'Writing & Content' ? 'writing-content'
          : section.name === 'Code & Development' ? 'code-development'
          : section.name === 'Design & Creative' ? 'design-creative'
          : 'marketing-seo';

        return (
          <section
            key={section.name}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 border-b border-tech-500/10 last:border-b-0"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Türkiye İçin En İyi {section.name.replace('Writing & Content', 'Yazma Araçları').replace('Code & Development', 'Kodlama Araçları').replace('Design & Creative', 'Tasarım Araçları').replace('Marketing & SEO', 'Pazarlama Araçları')}
                </h2>
                <p className="text-sm text-tech-200 mt-1 max-w-xl">
                  Türk ekipleri için en iyi seçimler — yerel uygunluk, fiyatlandırma ve desteğe göre derecelendirilmiştir.
                </p>
              </div>
              <Link
                href={`/categories/${sectionSlug}`}
                className="group inline-flex items-center gap-1.5 text-sm text-neon-light hover:text-neon transition shrink-0"
              >
                {section.count} aracın tümünü görüntüle
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.tools.slice(0, 6).map((tool) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.slug}`}
                  className="group relative block rounded-xl border border-tech-500/30 bg-tech-700/80 p-4 transition-all duration-300 hover:border-neon/30 hover:bg-tech-700 hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-2.5 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-tech-500 to-tech-600 flex items-center justify-center shrink-0 border border-tech-400/20 group-hover:border-neon/30 transition">
                      <span className="text-white font-bold text-xs">
                        {tool.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-white truncate group-hover:text-neon-light transition">
                        {tool.name}
                      </h3>
                      <p className="text-[11px] text-tech-200 line-clamp-2 mt-0.5">
                        {tool.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium border',
                        tool.pricing_tier === 'Free'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : tool.pricing_tier === 'Freemium'
                          ? 'bg-sky-500/20 text-sky-400 border-sky-500/30'
                          : 'bg-neon/20 text-neon-light border-neon/30'
                      )}
                    >
                      {tool.pricing_tier === 'Freemium' ? 'Ücretsiz+' : tool.pricing_tier}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-red-400 text-red-400" />
                      <span className="text-[10px] text-tech-200">{tool.avg_rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-0.5 ml-auto">
                      <TrendingUp className="w-2.5 h-2.5 text-neon-light" />
                      <span className="text-[9px] text-neon-light font-medium">{tool.trending_score}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={`/categories/${sectionSlug}`}
                className="inline-flex items-center gap-1 text-xs text-tech-300 hover:text-neon-light transition"
              >
                Türkiye için tüm {section.name} araçlarına göz atın
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </section>
        );
      })}

      {/* ───── FEATURED PLAYBOOKS ───── */}
      <section className="border-y border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Adım Adım Yapay Zeka Rehberleri
              </h2>
              <p className="text-xs sm:text-sm text-tech-200">
                Savaşta test edilmiş rehberler — Türk ekipleri ve girişimciler için hazırlanmıştır
              </p>
            </div>
          </div>

          <FeaturedPlaybooks />

          <div className="mt-8 text-center">
            <Link
              href="/playbooks"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-tech-500/30 text-tech-100 hover:border-neon/30 hover:text-white text-sm font-medium transition-all"
            >
              {playbooks.length} rehberin tümüne göz atın
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───── STATS BAR ───── */}
      <section className="border-y border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {[
              { label: 'Seçilmiş AI Araçları', value: `${totalCount}+`, icon: Layers },
              { label: 'Rehberler', value: `${playbooks.length}+`, icon: BookOpen },
              { label: 'Uzman Sıralaması', value: '5+', icon: Trophy },
              { label: 'TR Hazır Filtreler', value: '4', icon: CheckCircle },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-tech-600/60 flex items-center justify-center border border-tech-500/20">
                  <stat.icon className="w-5 h-5 text-neon-light" />
                </div>
                <span className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</span>
                <span className="text-xs sm:text-sm text-tech-300">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── TURKEY ECOSYSTEM ───── */}
      <section className="border-y border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-emerald-500/10 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-red-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Türkiye'nin Yapay Zeka Ekosistemi Yükseliyor
              </h2>
            </div>
            <p className="text-sm sm:text-base text-tech-200 max-w-2xl mx-auto">
              Savunma sanayiinden finteche, e-ticaretten eğitime — Türkiye, Asya ile Avrupa arasında köprü konumunda hızla büyüyen bir yapay zeka merkezidir. İşte AI aracı seçimi için anlamı.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {[
              {
                title: '🇹🇷 TRAI & Ulusal Yapay Zeka Stratejisi',
                description: 'Türkiye Yapay Zeka İnisiyatifi (TRAI) ve Ulusal Yapay Zeka Stratejisi (2021-2025), yapay zeka benimsenmesini savunma, finans, sağlık, eğitim ve ulaşım sektörlerinde teşvik etmektedir. Hükümet, AI araştırma merkezlerine ve teknoloji girişimlerine önemli yatırımlar yapmaktadır.',
              },
              {
                title: '🏢 İstanbul / Ankara / İzmir Teknoloji Merkezleri',
                description: "Türkiye'nin üç büyük teknoloji merkezi, gelişen startup ekosistemlerine ve köklü sanayi şirketlerine ev sahipliği yapmaktadır. İTÜ ARI Teknokent, ODTÜ Teknokent ve Boğaziçi Üniversitesi Technopark gibi teknoparklar, inovasyonun kalbidir.",
              },
              {
                title: '💰 TRY Uygun Fiyatlandırma',
                description: '1 USD ≈ 30 TRY olan döviz kuruyla, dolar bazlı araçlar önemli ölçüde daha pahalı olabilir. Türk işletmeleri ve girişimciler için bölgesel fiyatlandırma, TRY faturalandırma ve uygun maliyetli alternatifler sunan araçları işaretliyoruz.',
              },
              {
                title: '🌏 Küresel Rekabetçi Girişimciler',
                description: 'Türkiye, güçlü bir girişimci kültürüne ve küresel rekabetçiliğe sahiptir. Trendyol, Getir, Hepsiburada, Peak ve Insider gibi Türk teknoloji şirketleri dünya çapında başarı elde etmiştir. AI araçlarını girişimci dostu fiyatlandırma ve uzaktan çalışma özellikleri açısından değerlendiriyoruz.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-tech-800/70 border border-tech-500/20 rounded-xl p-5 hover:border-neon/20 transition"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-tech-200 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-white/10 flex items-center justify-center shrink-0">
                <Quote className="w-5 h-5 text-red-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Türkiye Yapay Zeka Araçları — Sıkça Sorulan Sorular
              </h2>
            </div>
            <p className="text-sm sm:text-base text-tech-200 max-w-xl mx-auto">
              Türkiye pazarı için AI araçları hakkında en sık sorulan soruların yanıtları.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Türkiye'deki en iyi yapay zeka araçları nelerdir?",
                a: "Türkiye'deki en iyi yapay zeka araçları arasında genel üretkenlik için ChatGPT, yazılım geliştirme için GitHub Copilot, tasarım için Canva AI ve yaratıcı çalışmalar için Midjourney yer alır. Türkiye'nin gelişen teknoloji ekosistemi — İstanbul, Ankara ve İzmir'deki startup merkezleriyle — yapay zeka araçlarının hızla benimsenmesini sağlamaktadır. TRAI (Türkiye Yapay Zeka İnisiyatifi) ve HAVELSAN gibi savunma teknolojisi şirketleri, yapay zeka inovasyonunda öncülük etmektedir.",
              },
              {
                q: "Yapay zeka araçları Türkiye'deki işletmeler için uygun mudur?",
                a: "Evet, Türkiye'nin dijital altyapısı hızla gelişmektedir. 5G'ye geçiş, artan bulut bilişim benimsemesi ve Dijital Türkiye ofisi gibi hükümet destekleriyle, Türk işletmeleri yapay zeka araçlarını giderek daha fazla kullanmaktadır. AWS'nin İstanbul Edge lokasyonu, Azure bölgesel veri merkezleri ve yerel bulut sağlayıcıları sayesinde veri egemenliği sorunları minimize edilmiştir. Birçok araç artık TRY dostu fiyatlandırma ve yerel ödeme yöntemleri (Kredi Kartı, Papara, İninal) sunmaktadır.",
              },
              {
                q: "Türkiye'nin kilit sektörleri için hangi AI araçları en iyisidir?",
                a: "Türkiye'de AI'dan faydalanan kilit sektörler şunlardır: savunma ve havacılık (HAVELSAN, ASELSAN, Baykar'da AI destekli sistemler), finans ve fintech (paramatik, Papara, Colendi'de AI tabanlı kredi risk değerlendirmesi), e-ticaret (Trendyol, Hepsiburada'da AI destekli öneriler), üretim ve lojistik (AI destekli tedarik zinciri optimizasyonu), sağlık (AI destekli teşhis ve Medipol, Acıbadem gibi hastanelerde hasta yönetimi) ve eğitim teknolojileri.",
              },
              {
                q: "Türk girişimciler AI araçlarını nasıl uygun maliyetle kullanabilir?",
                a: "Türk girişimciler, TÜBİTAK yapay zeka araştırma hibelerinden, KOSGEB teknoloji desteklerinden, Sanayi ve Teknoloji Bakanlığı'nın Teknogirişim desteklerinden ve kalkınma ajanslarının dijital dönüşüm teşviklerinden yararlanabilir. Ayrıca, birçok AI aracı ücretsiz katmanlar sunar (ChatGPT Ücretsiz, Google Colab, GitHub Copilot ücretsiz sürümü, TensorFlow/PyTorch açık kaynak) — fonlama öncesi MVP geliştirme için idealdir. İTÜ Çekirdek, Boğaziçi Üniversitesi Technopark ve ODTÜ Teknokent'teki kuluçka merkezleri de uygun fiyatlı kaynaklar sağlar.",
              },
              {
                q: "Türkiye'de yapay zeka düzenlemeleri nelerdir?",
                a: "Türkiye'de yapay zeka, Kişisel Verilerin Korunması Kanunu (KVKK) No. 6698 kapsamında veri gizliliği düzenlemelerine tabidir. TRAI (Türkiye Yapay Zeka İnisiyatifi), Ulusal Yapay Zeka Stratejisi (2021-2025) kapsamında AI politikalarını yönlendirmektedir. Dijital Türkiye ofisi ve Sanayi ve Teknoloji Bakanlığı AI düzenlemeleri üzerinde çalışmaktadır. Savunma sanayii AI uygulamaları ek protokollere tabidir ve BDDK fintech AI araçlarını düzenlemektedir.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-tech-500/20 bg-tech-800/50 overflow-hidden"
              >
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm sm:text-base font-medium text-white hover:text-neon-light transition list-none">
                  <span>{faq.q}</span>
                  <ChevronRight className="w-4 h-4 text-tech-300 group-open:rotate-90 transition-transform shrink-0 ml-2" />
                </summary>
                <div className="px-5 pb-4">
                  <p className="text-sm text-tech-200 leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section className="relative overflow-hidden border-t border-tech-500/20">
        <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />
        <div className="absolute top-[-30%] left-[-10%] w-[70%] h-[70%] bg-neon/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-aqua/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-medium mb-6">
            <MapPin className="w-3.5 h-3.5" />
            Türk Girişimciler, Ekipler ve Şirketler İçin Geliştirildi
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            Türkiye İşletmeniz İçin Doğru Yapay Zeka Aracını Bulun
          </h2>
          <p className="mt-4 text-base sm:text-lg text-tech-200 max-w-2xl mx-auto">
            Bir aracın Türkiye'de çalışıp çalışmadığını tahmin etmek zorunda kalmayın. Apifeny AI'daki her araç, Türkçe/İngilizce desteği, TRY fiyatlandırması ve Asya-Avrupa pazarına hazırlık açısından değerlendirilir. Keşfetmeye başlayın — hesap gerekmez.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/tools"
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-neon to-neon-dark text-white font-semibold text-sm sm:text-base transition-all hover:shadow-lg hover:shadow-neon/25 hover:-translate-y-0.5"
            >
              <span>{totalCount}+ Aracın Tümünü Keşfedin</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-tech-500/40 text-tech-100 hover:border-neon/30 hover:text-white text-sm sm:text-base font-medium transition-all"
            >
              Kategorilere Göz Atın
            </Link>
          </div>
        </div>
      </section>

      {/* ───── BLOG CROSS-LINKS ───── */}
      <BlogCategoryLinks
        slugs={['ai-tools', 'comparisons', 'productivity', 'solopreneur']}
        heading="Türkiye-Odaklı Yapay Zeka Rehberleri"
      />

      {/* ───── LANDING PAGE CROSS-LINKS ───── */}
      <LandingPageCrossLinks currentSlug="ai-tools-turkey" />

      {/* ───── SEO FOOTER KEYWORDS ───── */}
      <section className="border-t border-tech-500/20 bg-tech-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="text-center">
            <p className="text-[10px] text-tech-400 leading-loose max-w-3xl mx-auto">
              <strong className="text-tech-300">Türkiye yapay zeka araçları:</strong>{' '}
              Türkiye'deki en iyi yapay zeka araçları 2026 · Türkiye işletmeleri için AI araçları · Türkiye AI yazılımı ·
              yapay zeka yazma araçları Türkiye · yapay zeka kodlama araçları Türkiye · AI pazarlama Türkiye ·
              Türkiye AI rehberi · Türk girişimleri için AI araçları · uygun fiyatlı AI araçları Türkiye ·
              ücretsiz AI araçları Türkiye · AI verimlilik Türkiye · Türkiye teknoloji yığını ·
              İstanbul AI araçları · Ankara AI araçları · İzmir AI araçları · Türkçe yapay zeka araçları ·
              yapay zeka Türkiye 2026 · KVKK uyumlu AI · TRAI yapay zeka stratejisi · HAVELSAN yapay zeka
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
