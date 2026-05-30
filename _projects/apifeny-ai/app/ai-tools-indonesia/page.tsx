'use client';

import { useEffect, useMemo } from 'react';
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
 DollarSign,
 ShieldCheck,
 BarChart3,
 CheckCircle,
 Layers,
 Building2,
 Users,
 Smartphone,
 Briefcase,
 Heart,
 Camera,
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
 title: 'Alat AI Terbaik di Indonesia (2026) — 85+ Tools untuk Startup & Enterprise',
 description:
 'Temukan alat AI terbaik untuk bisnis di Indonesia. 85+ alat AI yang di-curate dengan dukungan Bahasa Indonesia, harga IDR, kepatuhan UU PDP, dan ekosistem lokal. Diperbarui setiap hari.',
 ogTitle: 'Alat AI Terbaik di Indonesia (2026) — Apifeny AI',
 ogDescription:
 '85+ alat AI terbaik untuk pasar Indonesia. Dukungan Bahasa Indonesia, harga IDR, kepatuhan UU PDP, dan ramah ekosistem startup lokal.',
 ogImage: '/og/ai-tools-indonesia.png',
};

const TRUST_SECTIONS = [
 {
 icon: Globe,
 title: '🇮🇩 Bahasa Indonesia & English',
 description:
 'Dioptimalkan untuk tenaga kerja bilingual Indonesia. Alat berbahasa Inggris diperingkatkan bersama platform dengan dukungan penuh Bahasa Indonesia — dari UI hingga konten generatif — untuk aksesibilitas maksimal.',
 },
 {
 icon: DollarSign,
 title: '₱ IDR Pricing',
 description:
 'Semua harga alat ditampilkan dalam Rupiah Indonesia. Kami melacak freemium tier, paket harga IDR, dan alat dengan dukungan pembayaran GoPay, OVO, DANA, QRIS untuk langganan tanpa repot.',
 },
 {
 icon: ShieldCheck,
 title: '🔒 UU PDP Compliant',
 description:
 'Setiap alat dievaluasi kepatuhannya terhadap Undang-Undang Perlindungan Data Pribadi (UU PDP) No. 27 Tahun 2022. Kami menandai risiko kedaulatan data dan menyoroti alat dengan pusat data lokal.',
 },
 {
 icon: Building2,
 title: '🏢 ID Enterprise Ready',
 description:
 'Di-curate untuk ekosistem enterprise Indonesia — dari integrasi Gojek/Tokopedia/Shopee hingga e-commerce, fintech, dan digitalisasi pemerintahan. Alat yang digunakan oleh tim di Jakarta, Bandung, dan Yogyakarta.',
 },
];

const INDONESIA_AI_SNAPSHOT = [
 { label: 'Pasar AI (2026)', value: 'IDR 15T+', sub: 'Tumbuh 32% YoY' },
 { label: 'UMKM Adopsi AI', value: '40M+', sub: 'UMKM mulai gunakan AI tools' },
 { label: 'Startup AI Indonesia', value: '320+', sub: 'Jakarta, Bandung, Yogyakarta' },
 { label: 'Pengguna Mobile-First', value: '70%', sub: 'Akses AI via smartphone' },
];

const WHY_INDONESIA = [
 {
 icon: Globe,
 title: 'Ekonomi Digital Terbesar di Asia Tenggara',
 description:
 'Indonesia adalah ekonomi digital terbesar di Asia Tenggara dengan ekosistem Gojek, Tokopedia, Shopee, dan Traveloka. Peringkat alat AI kami mencerminkan kebutuhan unik dari ekonomi digital senilai $90M+ ini — dari logistik hingga e-commerce dan layanan on-demand.',
 },
 {
 icon: Building2,
 title: 'Gelombang Digitalisasi UMKM',
 description:
 'Dengan lebih dari 40 juta UMKM di Indonesia, adopsi AI menjadi kunci daya saing. Alat yang membantu UMKM — dari pembuatan konten otomatis, manajemen inventaris, hingga chatbot layanan pelanggan — mendapat prioritas dalam peringkat kami.',
 },
 {
 icon: Users,
 title: 'Ledakan Kreator & EdTech',
 description:
 'Indonesia memiliki ekosistem kreator dan EdTech yang booming dengan startup seperti Ruangguru, Zenius, dan CoLearn. Alat AI untuk membuat konten pembelajaran, video, musik, dan desain diperingkatkan dengan kebutuhan kreator dan pendidik Indonesia sebagai prioritas.',
 },
];

// ─── Category names and their Indonesian translations ─────────────────────────

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

const CATEGORY_INDONESIAN: Record<string, string> = {
 'Writing & Content': 'Alat Menulis',
 'Code & Development': 'Alat Coding',
 'Design & Creative': 'Alat Desain',
 'Marketing & SEO': 'Alat Marketing',
};

// ─── Top Picks (static for display) ───────────────────────────────────────────

const TOP_PICKS = [
 { rank: 1, name: 'ChatGPT', tag: 'Best Overall AI Assistant', trend: 'up' as const },
 { rank: 2, name: 'GitHub Copilot', tag: 'Best AI Coding Assistant', trend: 'up' as const },
 { rank: 3, name: 'Claude', tag: 'Best untuk Analisis Panjang', trend: 'up' as const },
 { rank: 4, name: 'Canva', tag: 'Alat Desain #1 di Indonesia', trend: 'up' as const },
 { rank: 5, name: 'Midjourney', tag: 'Best AI Art Generator', trend: 'up' as const },
 { rank: 6, name: 'Notion AI', tag: 'Best untuk Tim Remote ID', trend: 'up' as const },
 { rank: 7, name: 'Perplexity', tag: 'Best AI Research Assistant', trend: 'up' as const },
 { rank: 8, name: 'Writesonic', tag: 'Best Value Alat Menulis', trend: 'up' as const },
 { rank: 9, name: 'Descript', tag: 'Best untuk Kreator Konten ID', trend: 'up' as const },
 { rank: 10, name: 'Copy.ai', tag: 'Best untuk Social Media', trend: 'up' as const },
 { rank: 11, name: 'Jasper AI', tag: 'Best untuk Marketing Copy ID', trend: 'up' as const },
 { rank: 12, name: 'AdCreative.ai', tag: 'Best untuk Iklan E-Commerce', trend: 'up' as const },
];

// ─── Indonesian Category Data ─────────────────────────────────────────────────

const WRITING_CATEGORY = {
 id: 'writing',
 name: 'Menulis & Konten',
 icon: BookOpen,
 description:
 'Alat AI menulis yang dioptimalkan untuk ekosistem konten bilingual Indonesia — dari artikel blog hingga caption media sosial dalam Bahasa Indonesia dan bahasa Inggris.',
 tools: [
 { name: 'Jasper AI', tag: 'Terbaik untuk Marketing', description: 'Penulisan AI enterprise-grade dengan kustomisasi brand voice. Kuat untuk tim marketing di Jakarta dan kota besar.' },
 { name: 'Writesonic', tag: 'Nilai Terbaik', description: 'Alat menulis AI terjangkau dengan opsi gaya Bahasa Indonesia. Mulai Rp20.000/bulan.' },
 { name: 'Rytr', tag: 'Terbaik untuk Freelancer', description: 'Asisten menulis ringan yang populer di kalangan freelancer Indonesia di Upwork dan Sribu.' },
 { name: 'Copy.ai', tag: 'Terbaik untuk Medsos', description: 'Generasi konten media sosial cepat. Ideal untuk brand Indonesia di TikTok, Instagram, dan Shopee Live.' },
 ],
};

const CODING_CATEGORY = {
 id: 'coding',
 name: 'Coding & Development',
 icon: Briefcase,
 description:
 'Alat development yang mendukung ekosistem startup teknologi Indonesia yang sedang berkembang — dari BSD hingga Bandung dan Yogyakarta.',
 tools: [
 { name: 'GitHub Copilot', tag: 'Terbaik Keseluruhan', description: 'Standar untuk tim developer Indonesia. Dukungan kuat untuk PHP, JavaScript, dan Go yang populer di web dev shop lokal.' },
 { name: 'Cursor', tag: 'Bintang Naik', description: 'IDE berbasis AI yang populer di bootcamp dan komunitas developer Indonesia. Tersedia tier gratis.' },
 { name: 'Replit AI', tag: 'Terbaik untuk Belajar', description: 'Populer di kalangan mahasiswa CS Indonesia dan lulusan bootcamp yang belajar full-stack development.' },
 { name: 'Tabnine', tag: 'Terbaik untuk Privasi', description: 'AI coding on-device yang bekerja offline — berharga untuk enterprise Indonesia dengan persyaratan kepatuhan data.' },
 ],
};

const MARKETING_CATEGORY = {
 id: 'marketing',
 name: 'Marketing & E-Commerce',
 icon: BarChart3,
 description:
 'Alat AI marketing yang disesuaikan untuk lanskap digital Indonesia — di mana Shopee, Tokopedia, TikTok Shop, dan Instagram mendominasi.',
 tools: [
 { name: 'AdCreative.ai', tag: 'Terbaik untuk Iklan', description: 'Generator kreatif iklan AI yang dioptimalkan untuk social commerce Indonesia. Latih dari katalog produk Shopee/Tokopedia Anda.' },
 { name: 'Jasper AI', tag: 'Terbaik untuk Konten', description: 'Konten multi-channel untuk brand Indonesia — dari email, SMS, hingga broadcast WhatsApp dan Viber.' },
 { name: 'Canva AI', tag: 'Paling Aksesibel', description: 'Sangat populer di Indonesia. Alat desain AI dengan template Ramadhan dan Lebaran untuk konten media sosial, cetak, dan video.' },
 { name: 'Typeface', tag: 'Terbaik untuk Enterprise', description: 'Platform konten brand enterprise. Digunakan oleh konglomerat Indonesia untuk konten multi-brand yang konsisten.' },
 ],
};

const DESIGN_CATEGORY = {
 id: 'design',
 name: 'Desain & Kreatif',
 icon: Camera,
 description:
 'Alat desain yang mendukung ekonomi kreatif Indonesia yang dinamis — dari agensi iklan di Jakarta hingga desainer freelance di Bali dan Bandung.',
 tools: [
 { name: 'Canva', tag: 'Paling Populer', description: 'Alat desain #1 di Indonesia. Fitur AI (Magic Studio, text-to-image) membuatnya tak tergantikan.' },
 { name: 'Adobe Firefly', tag: 'Kualitas Terbaik', description: 'Generative AI yang terintegrasi ke Creative Cloud. Preferensi agensi iklan dan desainer profesional Indonesia.' },
 { name: 'Midjourney', tag: 'Terbaik untuk Seni', description: 'Populer di kalangan seniman digital dan desainer konsep Indonesia. Komunitas Discord lokal yang kuat.' },
 { name: 'Clipdrop', tag: 'Edit Cepat Terbaik', description: 'Penghapusan latar dan editing gambar cepat. Adopsi luas di kalangan penjual e-commerce Indonesia.' },
 ],
};

const ALL_CATEGORIES = [WRITING_CATEGORY, CODING_CATEGORY, MARKETING_CATEGORY, DESIGN_CATEGORY];

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

function findPlaybook(slug: string) {
 return playbooks.find((p) => p.slug === slug);
}

// ─── Components ──────────────────────────────────────────────────────────────

function TrendBadge({ trend }: { trend: 'up' | 'stable' | 'new' }) {
 const styles = {
 up: 'bg-green-100 text-green-700 ',
 stable: 'bg-blue-100 text-blue-700 ',
 new: 'bg-purple-100 text-purple-700 ',
 };
 return (
 <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium', styles[trend])}>
 {trend === 'up' && <TrendingUp className="h-3 w-3" />}
 {trend === 'new' && <Sparkles className="h-3 w-3" />}
 {trend === 'stable' && <Star className="h-3 w-3" />}
 {trend === 'up' ? 'Trending' : trend === 'new' ? 'Baru' : 'Stabil'}
 </span>
 );
}

// ─── StarRating Component ─────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
 const stars: ('full' | 'half' | 'empty')[] = [];
 for (let i = 1; i <= 5; i++) {
 if (rating >= i) stars.push('full');
 else if (rating >= i - 0.5) stars.push('half');
 else stars.push('empty');
 }
 return (
 <div className="flex items-center gap-0.5">
 {stars.map((s, idx) => (
 <Star
 key={idx}
 className={cn(
 'w-3 h-3',
 s === 'full'
 ? 'fill-yellow-400 text-yellow-400'
 : s === 'half'
 ? 'fill-yellow-400/50 text-yellow-400'
 : 'fill-none text-gray-300 '
 )}
 />
 ))}
 </div>
 );
}

// ─── Head Hreflang ────────────────────────────────────────────────────────────

function HeadHreflang() {
 useEffect(() => {
 const links = [
 { rel: 'alternate', hrefLang: 'id-ID', href: 'https://apifeny-ai.vercel.app/ai-tools-indonesia' },
 { rel: 'alternate', hrefLang: 'en-ID', href: 'https://apifeny-ai.vercel.app/ai-tools-indonesia' },
 { rel: 'alternate', hrefLang: 'x-default', href: 'https://apifeny-ai.vercel.app/ai-tools-indonesia' },
 { rel: 'canonical', hrefLang: '', href: 'https://apifeny-ai.vercel.app/ai-tools-indonesia' },
 ];

 links.forEach(({ rel, hrefLang, href }) => {
 const attr = hrefLang ? 'hreflang' : 'rel';
 const selector = hrefLang
 ? 'link[rel="' + rel + '"][hreflang="' + hrefLang + '"]'
 : 'link[rel="' + rel + '"]';

 let el = document.querySelector(selector) as HTMLLinkElement | null;
 if (!el) {
 el = document.createElement('link');
 el.setAttribute('rel', rel);
 if (hrefLang) el.setAttribute('hreflang', hrefLang);
 document.head.appendChild(el);
 }
 el.setAttribute('href', href);
 });
 }, []);

 return null;
}

// ─── Page Component ──────────────────────────────────────────────────────────

export default function AIToolsIndonesiaPage() {
 const top12 = useMemo(() => topByTrending(12), []);
 const totalCount = useMemo(
 () => toolsData.filter((t) => t.is_published).length,
 []
 );

 const categorySections = useMemo(
 () =>
 CATEGORY_NAMES.map((name) => ({
 name,
 indonesianName: CATEGORY_INDONESIAN[name],
 tools: topByCategory(name, 6),
 count: toolsData.filter((t) => t.is_published && t.category === name).length,
 })),
 []
 );

 // Inject JSON-LD
 useEffect(() => {
 const script = document.createElement('script');
 script.type = 'application/ld+json';
 script.id = 'ai-tools-indonesia-jsonld';
 script.textContent = JSON.stringify({
 '@context': 'https://schema.org',
 '@type': 'CollectionPage',
 name: 'Alat AI Terbaik di Indonesia (2026)',
 description: '85+ alat AI yang di-curate untuk startup, enterprise, dan tim di Indonesia.',
 url: 'https://apifeny-ai.vercel.app/ai-tools-indonesia',
 inLanguage: 'id-ID',
 isPartOf: {
 '@type': 'WebSite',
 name: 'Apifeny AI',
 url: 'https://apifeny-ai.vercel.app',
 },
 });
 const existing = document.getElementById('ai-tools-indonesia-jsonld');
 if (existing) existing.remove();
 document.head.appendChild(script);
 return () => { script.remove(); };
 }, []);

 return (
 <>
 <SeoMetadata
 title={META.title}
 description={META.description}
 ogTitle={META.ogTitle}
 ogDescription={META.ogDescription}
 ogImage={META.ogImage}
 />
 <BreadcrumbSchema
 items={[
 { name: 'Home', item: 'https://apifeny-ai.vercel.app' },
 { name: 'AI Tools Indonesia', item: 'https://apifeny-ai.vercel.app/ai-tools-indonesia' },
 ]}
 />
 <GeoSeoSchema
 countryName="Indonesia"
 countryCode="id"
 capital="Jakarta"
 currency="IDR"
 language="Indonesian"
 languageCode="id"
 marketSize="$1.3T GDP, 280M population, Southeast Asia's largest economy"
 slug="ai-tools-indonesia"
 faqs={[
 { question: "What are the best AI tools in Indonesia?", answer: "The best AI tools in Indonesia include ChatGPT for general productivity, GitHub Copilot for development, Canva AI for design, and Midjourney for creative work. Indonesia's massive digital economy — the largest in SE Asia — makes it a prime market for AI adoption across all sectors." },
 { question: "Are AI tools accessible for Indonesian SMEs?", answer: "Yes. Indonesia has 65M+ SMEs forming 61% of GDP. Many global AI tools offer free tiers. Local alternatives include Kata.ai for Indonesian-language chatbots, Nodeflux for computer vision, and Prosa.ai for NLP. Government initiatives like Making Indonesia 4.0 support SME digitalisation." },
 { question: "What AI tools suit Indonesia's key sectors?", answer: "E-commerce and fintech lead AI adoption, with Gojek, Tokopedia, and Bukalapak using AI for recommendations and logistics. Agritech benefits from AI crop monitoring tools. The government's Digital Transformation Agenda targets AI integration across healthcare, education, and public services." },
 { question: "What AI regulations apply in Indonesia?", answer: "Indonesia's PDP Law (UU No. 27/2022) governs personal data protection, effective 2024. Cross-border data transfer rules require registration. The Ministry of Communication and Informatics (Kominfo) regulates digital services and has issued circulars on ethical AI use." },
 { question: "Is Indonesian language supported by AI tools?", answer: "Major AI platforms increasingly support Bahasa Indonesia. ChatGPT offers solid Indonesian-language performance. Local providers like Kata.ai and Prosa.ai offer Indonesian-first NLP. Google's Indonesian language support has improved significantly through its AI for Indonesia initiative." },
 ]}
 />

 {/* ───── HREFLANG ───── */}
 <HeadHreflang />

 <main className="min-h-screen bg-gradient-to-b from-white via-red-50/30 to-white ">
 {/* ── Hero ─────────────────────────────────────── */}
 <section className="relative overflow-hidden border-b border-red-100/50 ">
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(206,17,38,0.06),transparent_50%)] ,rgba(206,17,38,0.08),transparent_50%)] pointer-events-none" />
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.04),transparent_50%)] ,rgba(255,255,255,0.06),transparent_50%)] pointer-events-none" />
 <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 relative">
 <div className="mx-auto max-w-3xl text-center">
 <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-sm font-medium text-red-700 ">
 <MapPin className="h-4 w-4" />
 🇮🇩 Di-curate untuk Indonesia
 </div>
 <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
 Alat AI Terbaik di{' '}
 <span className="bg-gradient-to-r from-[#CE1126] via-red-500 to-[#CE1126] bg-clip-text text-transparent">
 Indonesia
 </span>{' '}
 (2026)
 </h1>
 <p className="mt-6 text-lg leading-relaxed text-gray-600 ">
 {totalCount}+ alat AI diperingkatkan untuk pasar Indonesia — dengan <strong>harga IDR</strong>,{' '}
 <strong>kepatuhan UU PDP</strong>, dan dukungan untuk ekonomi{' '}
 <strong>mobile-first, UMKM, dan startup Indonesia</strong>.
 Diperbarui setiap hari.
 </p>
 <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
 <a
 href="#top-picks"
 className="inline-flex items-center gap-2 rounded-xl bg-[#CE1126] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-200/50 transition-all hover:bg-[#a80e1f] hover:shadow-red-300/50 "
 >
 <Trophy className="h-4 w-4" />
 Lihat Peringkat Teratas
 <ArrowRight className="h-4 w-4" />
 </a>
 <a
 href="#categories"
 className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 "
 >
 <Layers className="h-4 w-4" />
 Jelajahi per Kategori
 </a>
 </div>
 </div>
 </div>
 </section>

 {/* ── Trust Signals ───────────────────────────── */}
 <section className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
 <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
 {TRUST_SECTIONS.map((s) => (
 <div
 key={s.title}
 className="rounded-xl border border-red-100/60 bg-white/80 p-5 shadow-sm transition-all hover:shadow-md "
 >
 <s.icon className="mb-3 h-6 w-6 text-[#CE1126]" />
 <h3 className="text-sm font-semibold text-gray-900 ">
 {s.title}
 </h3>
 <p className="mt-1 text-xs leading-relaxed text-gray-500 ">
 {s.description}
 </p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ── Indonesia AI Market Snapshot ──────────────── */}
 <section className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
 <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
 🇮🇩 Pasar AI Indonesia
 </h2>
 <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500 ">
 Metrik kunci yang mendorong adopsi AI di Indonesia — ekonomi terbesar di Asia Tenggara dengan
 populasi muda, digitalisasi UMKM, dan ekosistem startup yang booming.
 </p>
 <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
 {INDONESIA_AI_SNAPSHOT.map((stat) => (
 <div
 key={stat.label}
 className="rounded-xl border border-red-100/60 bg-white p-6 text-center shadow-sm "
 >
 <p className="text-3xl font-bold text-[#CE1126] ">{stat.value}</p>
 <p className="mt-1 text-sm font-medium text-gray-700 ">{stat.label}</p>
 <p className="mt-0.5 text-xs text-gray-400">{stat.sub}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ── Why Indonesia ─────────────────────────── */}
 <section className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
 <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
 Mengapa Indonesia Butuh Peringkat AI Sendiri
 </h2>
 <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500 ">
 Peringkat alat AI global melewatkan apa yang membuat Indonesia unik. Inilah mengapa peringkat
 khusus Indonesia penting.
 </p>
 <div className="mt-10 grid gap-6 md:grid-cols-3">
 {WHY_INDONESIA.map((item) => (
 <div
 key={item.title}
 className="group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-[#CE1126]/30 hover:shadow-md #CE1126]/40"
 >
 <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#CE1126]/10 text-[#CE1126] ">
 <item.icon className="h-6 w-6" />
 </div>
 <h3 className="text-lg font-semibold text-gray-900 ">{item.title}</h3>
 <p className="mt-2 text-sm leading-relaxed text-gray-500 ">{item.description}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ── Top 12 Rankings ─────────────────────────── */}
 <section id="top-picks" className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
 <div className="mb-10 text-center">
 <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
 🏆 12 Alat AI Teratas di Indonesia
 </h2>
 <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500 ">
 Peringkat harian alat AI paling populer dan efektif untuk pasar Indonesia,
 di-curate berdasarkan pola penggunaan lokal, keterjangkauan, dan relevansi.
 </p>
 </div>
 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
 {TOP_PICKS.map((tool) => (
 <div
 key={tool.rank}
 className={cn(
 'group relative rounded-xl border p-5 transition-all hover:shadow-md',
 tool.rank <= 3
 ? 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-white '
 : 'border-gray-200 bg-white '
 )}
 >
 <div className="mb-3 flex items-center justify-between">
 <span
 className={cn(
 'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold',
 tool.rank === 1
 ? 'bg-yellow-400 text-yellow-900'
 : tool.rank === 2
 ? 'bg-gray-300 text-gray-700 '
 : tool.rank === 3
 ? 'bg-amber-600 text-white'
 : 'bg-gray-100 text-gray-500 '
 )}
 >
 {tool.rank}
 </span>
 <TrendBadge trend={tool.trend} />
 </div>
 <h3 className="text-base font-semibold text-gray-900 ">{tool.name}</h3>
 <p className="mt-1 text-xs text-gray-500 ">{tool.tag}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ── Category Sections (Static) ──────────────── */}
 <section id="categories" className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
 <div className="mb-10 text-center">
 <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
 📂 Jelajahi per Kategori
 </h2>
 <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500 ">
 Jelajahi alat AI yang diorganisir per kategori, masing-masing di-curate untuk pasar Indonesia.
 </p>
 </div>
 <div className="space-y-12">
 {ALL_CATEGORIES.map((cat) => (
 <div key={cat.id} id={cat.id}>
 <div className="mb-6 flex items-center gap-3">
 <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#CE1126]/10 text-[#CE1126] ">
 <cat.icon className="h-5 w-5" />
 </div>
 <div>
 <h3 className="text-lg font-bold text-gray-900 ">{cat.name}</h3>
 <p className="text-xs text-gray-500 ">{cat.description}</p>
 </div>
 </div>
 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
 {cat.tools.map((tool) => (
 <div
 key={tool.name}
 className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#CE1126]/20 hover:shadow-md "
 >
 <span className="inline-block rounded-full bg-[#CE1126]/10 px-2.5 py-0.5 text-xs font-medium text-[#CE1126] ">
 {tool.tag}
 </span>
 <h4 className="mt-2 text-sm font-semibold text-gray-900 ">{tool.name}</h4>
 <p className="mt-1 text-xs leading-relaxed text-gray-500 ">{tool.description}</p>
 </div>
 ))}
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ── Top Tools from Database (Dynamic) ─────── */}
 <section className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
 <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
 <div>
 <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 ">
 Alat AI Trending di Indonesia
 </h2>
 <p className="text-sm text-gray-500 mt-1">
 Berdasarkan trending score dan kesiapan pasar Indonesia
 </p>
 </div>
 <Link
 href="/tools"
 className="group inline-flex items-center gap-1.5 text-sm text-[#CE1126] hover:text-[#a80e1f] transition shrink-0"
 >
 Lihat semua peringkat
 <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
 </Link>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
 {top12.map((tool, i) => (
 <Link
 key={tool.id}
 href={'/tools/' + tool.slug}
 className={cn(
 'group relative block rounded-xl border border-gray-200 bg-white p-5 transition-all duration-300',
 'hover:border-[#CE1126]/30 hover:shadow-lg hover:shadow-red-100/50 hover:-translate-y-1',
 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CE1126]/50',
 ' '
 )}
 >
 <div
 className={cn(
 'absolute -top-2 -left-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-lg z-10',
 i === 0
 ? 'bg-gradient-to-br from-[#CE1126] to-red-400 text-white'
 : i === 1
 ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-black'
 : i === 2
 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white'
 : 'bg-gray-100 text-gray-500 border border-gray-300 '
 )}
 >
 #{i + 1}
 </div>

 <div className="flex items-start gap-3 mb-3">
 <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#CE1126]/10 to-red-100 flex items-center justify-center shrink-0 border border-red-100 ">
 <span className="text-[#CE1126] font-bold text-sm ">
 {tool.name.split(' ').map(function(w) { return w[0]; }).join('').slice(0, 2).toUpperCase()}
 </span>
 </div>
 <div className="min-w-0 flex-1">
 <h3 className="text-base font-semibold text-gray-900 truncate group-hover:text-[#CE1126] transition-colors ">
 {tool.name}
 </h3>
 <p className="text-xs text-gray-500 line-clamp-2 mt-0.5 leading-relaxed ">
 {tool.tagline}
 </p>
 </div>
 </div>

 <div className="flex flex-wrap items-center gap-2 mb-3">
 <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-600 border border-gray-200 ">
 {tool.category}
 </span>
 <span
 className={cn(
 'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border',
 tool.pricing_tier === 'Free'
 ? 'bg-emerald-100 text-emerald-700 border-emerald-200 '
 : tool.pricing_tier === 'Freemium'
 ? 'bg-sky-100 text-sky-700 border-sky-200 '
 : tool.pricing_tier === 'Paid'
 ? 'bg-amber-100 text-amber-700 border-amber-200 '
 : tool.pricing_tier === 'Enterprise'
 ? 'bg-purple-100 text-purple-700 border-purple-200 '
 : 'bg-gray-100 text-gray-600 border-gray-200 '
 )}
 >
 {tool.pricing_tier === 'Freemium' ? 'Free+' : tool.pricing_tier}
 </span>
 </div>

 <div className="flex items-center gap-2 mb-3">
 <StarRating rating={tool.avg_rating} />
 <span className="text-xs text-gray-500 ">
 {tool.avg_rating.toFixed(1)}
 {tool.total_ratings >= 1000
 ? ' (' + (tool.total_ratings / 1000).toFixed(1) + 'K)'
 : ' (' + tool.total_ratings + ')'}
 </span>
 </div>

 <div className="flex items-center gap-2">
 <div className="flex-1 h-1.5 rounded-full bg-gray-200 overflow-hidden">
 <div
 className="h-full rounded-full bg-gradient-to-r from-[#CE1126] to-red-400 transition-all duration-500"
 style={{ width: tool.trending_score + '%' }}
 />
 </div>
 <div className="flex items-center gap-1 shrink-0">
 <TrendingUp className="w-3 h-3 text-[#CE1126]" />
 <span className="text-[10px] font-medium text-[#CE1126]">{tool.trending_score}</span>
 </div>
 </div>
 </Link>
 ))}
 </div>

 <div className="mt-10 text-center">
 <Link
 href="/tools"
 className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#CE1126] text-white font-semibold text-sm sm:text-base transition-all hover:bg-[#a80e1f] hover:shadow-lg hover:shadow-red-200/50"
 >
 <span>Jelajahi Semua {totalCount}+ Tools →</span>
 </Link>
 </div>
 </div>
 </section>

 {/* ── WHY INDONESIA NEEDS ITS OWN RANKING (Detailed) ───── */}
 <section className="border-y border-gray-100 bg-gray-50/50 ">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
 <div className="text-center mb-10 sm:mb-12">
 <div className="flex items-center justify-center gap-3 mb-3">
 <div className="w-10 h-10 rounded-xl bg-[#CE1126]/10 flex items-center justify-center shrink-0">
 <MapPin className="w-5 h-5 text-[#CE1126]" />
 </div>
 <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 ">
 Why Indonesia Needs Its Own AI Tool Ranking
 </h2>
 </div>
 <p className="text-sm text-gray-500 max-w-xl mx-auto ">
 Most AI tool rankings are built for US or EU markets. Here&apos;s what matters for Indonesia.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
 {[
 {
 icon: Globe,
 title: '🇮🇩 Bahasa Indonesia First',
 description: 'Bahasa Indonesia is spoken by 270M+ people, but many AI tools treat it as an afterthought. We rank tools on genuine Indonesian language support — from UI localization to content generation in Bahasa Indonesia with proper grammar and cultural nuance.',
 },
 {
 icon: ShieldCheck,
 title: '🛡️ UU PDP Compliance',
 description: 'Indonesia\'s Personal Data Protection Law (UU PDP), enacted in 2022, imposes strict requirements on data processing, cross-border transfers, and user consent. We verify which tools meet Indonesia\'s data protection standards.',
 },
 {
 icon: DollarSign,
 title: '💰 IDR Pricing Transparency',
 description: 'With 1 USD approx 16,000 IDR, dollar-based pricing can be prohibitively expensive for Indonesian teams. We surface tools with IDR pricing, local payment methods (GoPay, OVO, DANA, QRIS), and transparent regional pricing tiers.',
 },
 {
 icon: Building2,
 title: '🏢 Local Ecosystem Focus',
 description: 'From Jakarta\'s BSD tech hub to Bandung\'s startup scene and Yogyakarta\'s developer community, Indonesia\'s AI ecosystem is booming. We prioritize tools with Indonesian support teams, local servers, and proven adoption in ID enterprises and startups.',
 },
 ].map(function(item) {
 return (
 <div
 key={item.title}
 className="relative rounded-xl bg-white border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-[#CE1126]/20 transition-all "
 >
 <div className="relative">
 <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
 <p className="text-sm text-gray-500 leading-relaxed ">{item.description}</p>
 </div>
 </div>
 );
 })}
 </div>
 </div>
 </section>

 {/* ───── CATEGORY SECTIONS (Dynamic) ───── */}
 {categorySections.map(function(section) {
 var sectionSlug = section.name === 'Writing & Content' ? 'writing-content'
 : section.name === 'Code & Development' ? 'code-development'
 : section.name === 'Design & Creative' ? 'design-creative'
 : 'marketing-seo';

 return (
 <section
 key={section.name}
 className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 border-b border-gray-100 last:border-b-0"
 >
 <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
 <div>
 <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ">
 Best AI {section.indonesianName} for Indonesia
 </h2>
 <p className="text-sm text-gray-500 mt-1 max-w-xl">
 Top picks for ID teams — rated for Bahasa Indonesia support, local pricing, and regional relevance.
 </p>
 </div>
 <Link
 href={'/categories/' + sectionSlug}
 className="group inline-flex items-center gap-1.5 text-sm text-[#CE1126] hover:text-[#a80e1f] transition shrink-0"
 >
 View all {section.count} tools
 <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
 </Link>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {section.tools.slice(0, 6).map(function(tool) {
 return (
 <Link
 key={tool.id}
 href={'/tools/' + tool.slug}
 className="group relative block rounded-xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:border-[#CE1126]/20 hover:shadow-md hover:-translate-y-0.5 "
 >
 <div className="flex items-start gap-2.5 mb-2">
 <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#CE1126]/10 to-red-100 flex items-center justify-center shrink-0 border border-red-100 ">
 <span className="text-[#CE1126] font-bold text-xs ">
 {tool.name.split(' ').map(function(w) { return w[0]; }).join('').slice(0, 2).toUpperCase()}
 </span>
 </div>
 <div className="min-w-0 flex-1">
 <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-[#CE1126] transition ">
 {tool.name}
 </h3>
 <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5 ">
 {tool.tagline}
 </p>
 </div>
 </div>

 <div className="flex items-center gap-2">
 <span
 className={cn(
 'inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium border',
 tool.pricing_tier === 'Free'
 ? 'bg-emerald-100 text-emerald-700 border-emerald-200 '
 : tool.pricing_tier === 'Freemium'
 ? 'bg-sky-100 text-sky-700 border-sky-200 '
 : 'bg-amber-100 text-amber-700 border-amber-200 '
 )}
 >
 {tool.pricing_tier === 'Freemium' ? 'Free+' : tool.pricing_tier}
 </span>
 <div className="flex items-center gap-1">
 <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
 <span className="text-[10px] text-gray-500 ">{tool.avg_rating.toFixed(1)}</span>
 </div>
 <div className="flex items-center gap-0.5 ml-auto">
 <TrendingUp className="w-2.5 h-2.5 text-[#CE1126]" />
 <span className="text-[9px] text-[#CE1126] font-medium">{tool.trending_score}</span>
 </div>
 </div>
 </Link>
 );
 })}
 </div>

 <div className="mt-6 flex flex-wrap items-center gap-3">
 <Link
 href={'/categories/' + sectionSlug}
 className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-[#CE1126] transition "
 >
 Browse all {section.name} tools for Indonesia
 <ArrowRight className="w-3 h-3" />
 </Link>
 </div>
 </section>
 );
 })}

 {/* ───── FEATURED PLAYBOOKS ───── */}
 <section className="border-y border-gray-100 bg-gray-50/50 ">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
 <div className="flex items-center gap-3 mb-6 sm:mb-8">
 <div className="w-10 h-10 rounded-xl bg-[#CE1126]/10 flex items-center justify-center shrink-0">
 <BookOpen className="w-5 h-5 text-[#CE1126]" />
 </div>
 <div>
 <h2 className="text-xl sm:text-2xl font-bold text-gray-900 ">
 Step-by-Step AI Playbooks
 </h2>
 <p className="text-xs sm:text-sm text-gray-500 ">
 Panduan teruji untuk menerapkan alur kerja AI — relevan untuk tim Indonesia juga
 </p>
 </div>
 </div>

 <FeaturedPlaybooks />

 <div className="mt-8 text-center">
 <Link
 href="/playbooks"
 className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:border-[#CE1126]/30 hover:text-[#CE1126] text-sm font-medium transition-all "
 >
 Browse all {playbooks.length} playbooks
 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
 </Link>
 </div>
 </div>
 </section>

 {/* ───── INFO SECTION ───── */}
 <section className="border-y border-gray-100 ">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
 {[
 {
 title: '🇮🇩 Making Indonesia 4.0',
 description: 'Indonesia\'s national roadmap targets AI, IoT, and robotics adoption across manufacturing, agriculture, and digital services. This drives rapid enterprise AI adoption in the country\'s $1.1T economy.',
 },
 {
 title: '🏙️ Jakarta & Bandung Tech Hubs',
 description: 'Greater Jakarta and Bandung host 10+ unicorns (Gojek, Tokopedia, Traveloka) and 2,000+ startups. Indonesian developers are early adopters of AI tools, creating high demand for localized AI solutions.',
 },
 {
 title: '🏭 E-Commerce & Fintech AI',
 description: 'Indonesia\'s e-commerce market ($60B+) and fintech sector (1,000+ startups) are adopting AI rapidly — from recommendation engines to fraud detection. Tools serving these verticals rank higher.',
 },
 ].map(function(item) {
 return (
 <div
 key={item.title}
 className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[#CE1126]/20 transition "
 >
 <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
 <p className="text-sm text-gray-500 leading-relaxed ">{item.description}</p>
 </div>
 );
 })}
 </div>
 </div>
 </section>

 {/* ───── CTA ───── */}
 <section className="bg-gradient-to-r from-[#CE1126] to-[#FFFFFF] relative overflow-hidden">
 <div className="absolute inset-0 bg-gradient-to-r from-[#CE1126]/90 via-white/10 to-[#CE1126]/90 pointer-events-none" />
 <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-medium mb-6 backdrop-blur-sm">
 <MapPin className="w-3.5 h-3.5" />
 Dibangun untuk Tim Indonesia — Built for ID Teams
 </div>
 <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
 🇮🇩 Siap Menemukan Alat AI yang Tepat untuk Bisnis Anda?
 </h2>
 <p className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
 Jelajahi direktori lengkap 600+ alat AI kami, filter berdasarkan kategori, bandingkan harga dalam IDR,
 dan baca ulasan jujur dari pengguna Indonesia. Produktivitas Anda hanya satu klik lagi.
 </p>
 <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
 <Link
 href="/tools"
 className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-[#CE1126] font-semibold text-sm sm:text-base shadow-lg transition-all hover:bg-red-50 hover:shadow-xl"
 >
 Jelajahi Semua Tools
 <ArrowRight className="w-4 h-4" />
 </Link>
 <Link
 href="/blog/ai-tools-indonesia-2026"
 className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-white/40 text-white text-sm sm:text-base font-medium transition-all hover:bg-white/10 backdrop-blur-sm"
 >
 <BookOpen className="w-4 h-4" />
 Baca Blog AI Tools Indonesia
 </Link>
 </div>
 </div>
 </section>

 {/* ───── BLOG CROSS-LINKS ───── */}
 <section className="border-b border-gray-100 ">
 <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
 <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-gray-900 ">
 📖 Pelajari Lebih Lanjut tentang AI di Indonesia
 </h2>
 <div className="grid gap-8 lg:grid-cols-2">
 <BlogCategoryLinks slugs={['ai-tools', 'comparisons', 'productivity']} />
 <FeaturedPlaybooks />
 </div>
 </div>
 </section>

 {/* ───── LANDING PAGE CROSS-LINKS ───── */}
 <section className="border-t border-gray-100 bg-gray-50/50 ">
 <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
 <LandingPageCrossLinks currentSlug="ai-tools-indonesia" />
 </div>
 </section>

 {/* ───── SEO FOOTER KEYWORDS ───── */}
 <section className="border-t border-gray-100 bg-white ">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
 <div className="text-center">
 <p className="text-[10px] text-gray-400 leading-loose max-w-3xl mx-auto ">
 <strong className="text-gray-500 ">Indonesia AI tools:</strong>{' '}
 best AI tools in Indonesia 2026 · AI tools for Indonesia businesses · Indonesia AI software · 
 alat AI terbaik di Indonesia · AI writing tools Indonesia · AI coding tools Indonesia · AI marketing Indonesia · 
 Indonesia AI directory · AI tools for ID startups · Bahasa Indonesia AI tools · 
 affordable AI tools Indonesia · free AI tools Indonesia · AI productivity Indonesia · 
 Indonesia tech stack · UU PDP compliant AI tools · Jakarta AI tools · Bandung AI tools
 </p>
 </div>
 </div>
 </section>

 {/* ── Footer ──────────────────────────────────── */}
 <footer className="border-t border-gray-100 bg-white ">
 <div className="mx-auto max-w-7xl px-4 py-8 text-center text-xs text-gray-400 sm:px-6 lg:px-8">
 <p>Apifeny AI — Peringkat Alat AI Independen untuk Indonesia. Tidak berafiliasi dengan alat yang terdaftar.</p>
 <p className="mt-1">Harga dalam IDR bersifat perkiraan dan dapat berubah. Selalu verifikasi harga di situs web resmi alat.</p>
 </div>
 </footer>
 </main>
 </>
 );
}
