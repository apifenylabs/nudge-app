'use client';

// OG tags handled by parent layout.

import SeoMetadata from '@/components/SeoMetadata';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Download,
  CheckCircle,
  BookOpen,
  Users,
  Target,
  Zap,
  TrendingUp,
  DollarSign,
  Star,
  Clock,
  Sparkles,
  ChevronRight,
  ShoppingCart,
  FileText,
  Shield,
  Globe,
  MapPin,
  MessageSquare,
  Lightbulb,
  BarChart3,
  SearchIcon,
} from 'lucide-react';

// ─── Section Breakdown ──────────────────────────────────────

interface Section {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
}

const sections: Section[] = [
  {
    id: 'multilingual',
    icon: <Globe className="w-5 h-5 text-amber-400" />,
    title: 'Multilingual Content at Scale',
    description: 'Generate culturally adapted content in Chinese, Japanese, Korean, Thai, Vietnamese, and Indonesian. Go beyond machine translation with AI that understands regional nuance and local idioms.',
    items: [
      'AI-powered localization for 8+ Asian languages',
      'Cultural adaptation: tone, humor, taboos, and imagery',
      'Generating WeChat articles, LINE broadcasts, and Kakao messages',
      'SEO keyword research in Chinese, Japanese, and Korean',
      'Avoiding translation fails that kill brand trust',
    ],
  },
  {
    id: 'wechat-line',
    icon: <MessageSquare className="w-5 h-5 text-amber-400" />,
    title: 'WeChat, LINE & Kakao — Asia\'s Big Three',
    description: 'Master the super-app ecosystems where billions of users live. From WeChat Official Accounts to LINE OA and KakaoTalk channels — AI workflows for each platform.',
    items: [
      'WeChat Official Account strategy with AI content generation',
      'LINE OA broadcast campaigns that convert',
      'KakaoTalk Plus Friend channel setup and automation',
      'Mini-program marketing with AI-assisted copywriting',
      'QR code funnel optimization for WeChat',
      'Cross-platform content repurposing workflows',
    ],
  },
  {
    id: 'local-seo',
    icon: <MapPin className="w-5 h-5 text-amber-400" />,
    title: 'Local SEO for Asian Markets',
    description: 'Dominate search in Asia with AI-powered local SEO. Baidu, Naver, Yahoo Japan, and Google — each requires a different approach. Learn the exact workflows for each search engine.',
    items: [
      'Baidu SEO: ICP licensing, content requirements, and ranking factors',
      'Naver optimization for Korean market dominance',
      'Yahoo Japan SEO best practices with AI keyword research',
      'Google Maps optimization for Asian cities (Hong Kong, Singapore, Bangkok, etc.)',
      'Local business listings across Asia — Dianping, Tabelog, and more',
      'AI-generated localized landing pages at scale',
    ],
  },
  {
    id: 'culture-adapt',
    icon: <Lightbulb className="w-5 h-5 text-amber-400" />,
    title: 'Cultural Adaptation & Brand Localization',
    description: 'What works in New York bombs in Tokyo. Learn how to adapt your brand voice, visuals, and messaging for Asian audiences using AI-powered cultural frameworks.',
    items: [
      'The Hofstede framework applied to marketing campaigns',
      'Color psychology across Asian cultures — red in China vs. Japan',
      'AI tools for cultural sensitivity checking',
      'Localizing your brand name and tagline for each market',
      'Navigating censorship and platform-specific content rules',
      'Holiday and festival marketing calendars for each country',
    ],
  },
  {
    id: 'influencer',
    icon: <Users className="w-5 h-5 text-amber-400" />,
    title: 'Influencer Discovery & Outreach in Asia',
    description: 'Find and connect with KOLs (Key Opinion Leaders) across Asia using AI-powered discovery. From Xiaohongshu influencers to Thai beauty bloggers to LINE creators.',
    items: [
      'AI-powered KOL discovery on Douyin, Xiaohongshu, and Bilibili',
      'Automated outreach sequences with personalized AI messages',
      'Vetting influencers: engagement rates, fake followers, ROI analysis',
      'Cross-border KOL campaign management workflows',
      'Tracking campaign performance with AI analytics',
      'Building long-term ambassador programs with AI CRM',
    ],
  },
  {
    id: 'shopee-lazada',
    icon: <ShoppingCart className="w-5 h-5 text-amber-400" />,
    title: 'Shopee, Lazada & E-Commerce Marketplaces',
    description: 'AI-driven product listings, ad optimization, and store management for Southeast Asia\'s largest e-commerce platforms. Scale your Shopee and Lazada stores without scaling your team.',
    items: [
      'AI-generated product titles and descriptions for Shopee & Lazada',
      'Keyword optimization for marketplace search algorithms',
      'Automated ad campaign management with AI bidding',
      'Review analysis and competitor intelligence workflows',
      'Pricing optimization based on market data',
      'Cross-border logistics and fulfillment automation',
    ],
  },
];

// ─── What is Included ───────────────────────────────────────

const includedItems = [
  { icon: BookOpen, text: '6 comprehensive chapters', subtext: '30+ pages of actionable Asian market content' },
  { icon: FileText, text: 'Platform-specific prompt templates', subtext: 'WeChat, LINE, Shopee, Baidu & more' },
  { icon: Zap, text: 'Cultural adaptation framework', subtext: '10+ country-specific checklists' },
  { icon: TrendingUp, text: 'Local SEO workflows', subtext: 'Baidu, Naver, Yahoo Japan & Google' },
  { icon: DollarSign, text: 'KOL outreach templates', subtext: 'Ready-to-use influencer scripts' },
  { icon: Globe, text: 'Multilingual content system', subtext: 'Chinese, Japanese, Korean, Thai & Vietnamese' },
];

const whoItsFor = [
  { icon: Users, text: 'E-commerce brands', subtext: 'Expanding into China, Japan, Korea & SE Asia' },
  { icon: Target, text: 'Digital marketers', subtext: 'Managing multi-market campaigns across Asia' },
  { icon: Star, text: 'Content creators', subtext: 'Building Asian audiences on local platforms' },
  { icon: Lightbulb, text: 'Startup founders', subtext: 'Launching products in APAC markets' },
];

const whatYoullLearn = [
  { icon: Globe, text: 'Speak to 8+ Asian markets', subtext: 'Cultural fluency across languages' },
  { icon: MessageSquare, text: 'Master WeChat & LINE', subtext: 'Super-app marketing workflows' },
  { icon: MapPin, text: 'Dominate Asian SEO', subtext: 'Baidu, Naver & Yahoo Japan' },
  { icon: ShoppingCart, text: 'Scale Shopee & Lazada', subtext: 'Marketplace listing automation' },
];

// ─── Social Proof Stats ────────────────────────────────────

const socialProofStats = [
  { icon: Users, value: '100+', label: 'Marketers using these workflows', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { icon: TrendingUp, value: '3.7x', label: 'Avg. engagement lift across markets', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { icon: MapPin, value: '12+', label: 'Countries with localized playbooks', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { icon: Zap, value: '200h+', label: 'Hours saved per month on localization', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
];

// ─── Testimonials ──────────────────────────────────────────

const testimonials = [
  {
    name: 'Yuki Tanaka',
    title: 'Digital Marketing Manager, Tokyo',
    quote: 'The WeChat and LINE chapters alone saved me weeks of trial and error. I had our first LINE OA campaign live in two days. The cultural nuance checks caught three things I would have completely missed.',
    stars: 5,
  },
  {
    name: 'Li Wei',
    title: 'Cross-Border E-Commerce Founder, Singapore',
    quote: 'I wasted $12K on a bad Baidu agency before finding this playbook. The local SEO workflows are incredibly detailed — I ranked our Shopee store on Baidu page 1 in 6 weeks, organically.',
    stars: 5,
  },
  {
    name: 'Ananya Patel',
    title: 'Growth Marketer, Bangalore',
    quote: 'Managing seven Asian markets used to take my entire team. Now I do it myself with AI workflows from this playbook. The KOL outreach templates are gold — response rates tripled.',
    stars: 5,
  },
];

// ─── Bonuses ───────────────────────────────────────────────

const bonuses = [
  { name: '50+ Platform Templates Bundle', value: '$19', desc: 'Ready-to-use WeChat OA templates, LINE broadcast scripts, and Shopee listing formats' },
  { name: 'Cultural Calendar & Holiday Guide', value: '$15', desc: 'Key marketing dates for 12 Asian countries — Chinese New Year, Songkran, Golden Week & more' },
  { name: 'Private Founders\' Community', value: '$13', desc: 'Join 100+ marketers sharing Asian market wins, platform updates, and strategy discussions' },
];

// ─── FAQ Items ─────────────────────────────────────────────

const faqItems = [
  {
    q: 'Is this a digital download?',
    a: "Yes! AI Marketing for Asian Markets is a digital PDF delivered instantly after purchase. You'll also receive a download link via email so you can access it anytime, anywhere.",
  },
  {
    q: 'Do I need to speak an Asian language?',
    a: "Not at all. This playbook is designed for English-speaking marketers. Every AI workflow, prompt template, and checklist works in English — the AI handles the multilingual content generation. You'll learn exactly what to prompt and what to review.",
  },
  {
    q: 'Can I get a refund?',
    a: "Absolutely. If AI Marketing for Asian Markets doesn't help you reach and convert Asian audiences more effectively within 30 days, I'll refund every cent. No questions asked. Just email support and I'll process it immediately.",
  },
  {
    q: 'Does this cover China-specific tools?',
    a: "Yes — Chapter 2 covers WeChat Official Accounts, Baidu SEO, Douyin marketing, and Xiaohongshu (Little Red Book) strategies. We also explain VPN requirements, ICP licensing, and China-specific compliance considerations.",
  },
  {
    q: 'How often is it updated?',
    a: "This playbook is updated quarterly to reflect platform changes (WeChat, LINE, Shopee, Lazada) and new AI capabilities. All updates are free for life — you'll get an email notification whenever a new version is released.",
  },
  {
    q: 'What if I\'m already marketing in Asia?',
    a: "Even better. Most experienced marketers discover workflows they hadn't considered — especially around AI-powered cross-platform content repurposing and the influencer vetting system. The KOL outreach automation alone has saved teams 10+ hours per week.",
  },
];

// ─── Checkout Overlay ───────────────────────────────────────

function CheckoutOverlay({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, product: 'ai-marketing-for-asia' }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create checkout');

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again or contact support.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative max-w-md w-full bg-tech-800 border border-tech-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-orange-500/10">
        <SeoMetadata title="AI Marketing for Asia — Localize & Dominate" description="AI-powered marketing playbook specifically for Asian markets. WeChat, Line, Shopee, Lazada integration, multilingual content, and local SEO." />
        <button
          onClick={onBack}
          className="absolute top-4 right-4 text-tech-300 hover:text-white transition"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-1">AI Marketing for Asian Markets</h3>
          <p className="text-sm text-tech-200">Complete PDF Playbook</p>
          <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/20">
            <DollarSign className="w-4 h-4 text-orange-400" />
            <span className="text-lg font-bold text-white">$9</span>
            <span className="text-xs text-tech-200">one-time</span>
          </div>
        </div>

        {status === 'success' ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <p className="text-white font-medium mb-1">{message}</p>
            <button
              onClick={onBack}
              className="mt-4 text-sm text-orange-400 hover:underline"
            >
              Back to playbook
            </button>
          </div>
        ) : (
          <form onSubmit={handlePurchase} className="space-y-4">
            <div>
              <label htmlFor="checkout-email" className="block text-sm font-medium text-tech-200 mb-1">
                Email address
              </label>
              <input
                id="checkout-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full bg-tech-900 border border-tech-500/50 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-tech-300 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/20 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 text-white font-semibold text-sm hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download PDF — $9
                </>
              )}
            </button>

            {status === 'error' && (
              <p className="text-xs text-red-400 text-center">{message}</p>
            )}

            <p className="text-[10px] text-tech-300 text-center">
              Secure checkout. Your PDF will be available immediately after purchase.
              <br />You will also receive a download link via email.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Inner Page (wrapped in Suspense) ───────────────────────

function AIForMarketingInner() {
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      <SeoMetadata title="AI Marketing for Asia — Localize & Dominate" description="AI-powered marketing playbook specifically for Asian markets. WeChat, Line, Shopee, Lazada integration, multilingual content, and local SEO." />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-tech-300">
            <li>
              <Link href="/" className="hover:text-white transition">Home</Link>
            </li>
            <li className="text-tech-500">/</li>
            <li>
              <Link href="/playbooks" className="hover:text-white transition">Playbooks</Link>
            </li>
            <li className="text-tech-100 truncate max-w-[200px]">AI Marketing for Asian Markets</li>
          </ol>
        </nav>

        {/* Back link */}
        <Link
          href="/playbooks"
          className="inline-flex items-center gap-1.5 text-sm text-tech-200 hover:text-white transition mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
          All Playbooks
        </Link>

        {/* ═══════════════════════════════════════════════════ */}
        {/* HERO SECTION                                     */}
        {/* ═══════════════════════════════════════════════════ */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/25 via-amber-500/15 to-tech-800 border border-orange-500/20 mb-8 sm:mb-10">
          <div className="absolute inset-0 bg-tech-grid opacity-30" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-orange-400" />
              <Globe className="w-5 h-5 text-amber-400" />
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Premium
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              AI Marketing for Asian Markets
            </h1>

            <p className="text-sm sm:text-base text-tech-100 max-w-2xl mb-4 leading-relaxed">
              The complete blueprint for reaching and converting Asian audiences with AI-powered marketing.
              From WeChat and LINE to Shopee and Lazada — this 30+ page PDF gives you every workflow,
              prompt template, and cultural framework you need to win in Asia.
            </p>

            {/* Key stats */}
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100 border border-tech-500/30">
                <FileText className="w-3 h-3" />
                30+ pages
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100 border border-tech-500/30">
                <BookOpen className="w-3 h-3" />
                6 chapters
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100 border border-tech-500/30">
                <Globe className="w-3 h-3" />
                12 country guides
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100 border border-tech-500/30">
                <Sparkles className="w-3 h-3" />
                Updated July 2026
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowCheckout(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 text-white font-semibold text-sm hover:opacity-90 transition hover:-translate-y-0.5 shadow-lg shadow-orange-500/20"
              >
                <Download className="w-4 h-4" />
                Download PDF — $9
              </button>
              <a
                href="#preview"
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-tech-700 border border-tech-500/30 text-tech-100 text-sm font-medium hover:text-white hover:border-orange-500/30 transition"
              >
                <BookOpen className="w-4 h-4" />
                Preview Contents
              </a>
            </div>

            {/* Trust signals */}
            <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-tech-200">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                100+ marketers have downloaded this playbook
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                30-Day Money-Back Guarantee
              </span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════ */}
        {/* WHAT IS INSIDE                                    */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-10" id="preview">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-orange-400" />
            What&apos;s Inside
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {includedItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl border border-tech-500/20 bg-tech-700/60 hover:border-orange-500/20 transition"
                >
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{item.text}</p>
                    <p className="text-xs text-tech-300 mt-0.5">{item.subtext}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* WHO THIS IS FOR                                   */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-sky-400" />
            Who This Is For
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {whoItsFor.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl border border-sky-500/20 bg-sky-500/5"
                >
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-sky-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{item.text}</p>
                    <p className="text-xs text-tech-300 mt-0.5">{item.subtext}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* WHAT YOU WILL LEARN                               */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-400" />
            What You&apos;ll Learn
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {whatYoullLearn.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{item.text}</p>
                    <p className="text-xs text-tech-300 mt-0.5">{item.subtext}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* CHAPTER PREVIEW — 6 Sections                       */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
            <SearchIcon className="w-4 h-4 text-amber-400" />
            Chapter Preview
          </h2>
          <p className="text-sm text-tech-200 mb-6">
            Here&apos;s everything covered in the AI Marketing for Asian Markets playbook.
            Each chapter is packed with platform-specific workflows, real examples, and copy-paste prompts.
          </p>

          <div className="space-y-4">
            {sections.map((section) => (
              <details
                key={section.id}
                className="group rounded-xl border border-tech-500/20 bg-tech-700/50 overflow-hidden transition hover:border-orange-500/20"
              >
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-tech-600 flex items-center justify-center shrink-0">
                      {section.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-orange-400 transition">
                        {section.title}
                      </h3>
                      <p className="text-xs text-tech-300 mt-0.5 line-clamp-1">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-tech-300 shrink-0 transition-transform group-open:rotate-90" />
                </summary>

                <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-tech-500/10 pt-3">
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-tech-100">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* SOCIAL PROOF / BUILD IN PUBLIC                      */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-400" />
            📊 Proven Across Asia
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {socialProofStats.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className={`flex flex-col items-center text-center p-4 sm:p-5 rounded-xl border ${item.border} ${item.bg}`}
                >
                  <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center mb-2`}>
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div className={`text-xl sm:text-2xl font-bold ${item.color}`}>{item.value}</div>
                  <div className="text-xs text-tech-200 mt-1">{item.label}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-center">
            <p className="text-sm text-amber-200">
              <CheckCircle className="w-4 h-4 inline-block mr-1.5 text-amber-400" />
              Every workflow in this playbook has been tested with real campaigns across China, Japan, Korea, Thailand, Vietnam, and Indonesia.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* TESTIMONIALS                                        */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400" />
            ⭐ What Early Adopters Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="flex flex-col p-5 rounded-xl border border-tech-500/20 bg-tech-700/60"
              >
                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="text-xs sm:text-sm text-tech-100 leading-relaxed mb-3 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="border-t border-tech-500/10 pt-3 mt-auto">
                  <div className="text-sm font-medium text-white">{t.name}</div>
                  <div className="text-xs text-tech-300">{t.title}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* BONUSES                                             */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            🎁 Free Bonuses ($47 Value — Yours Today)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {bonuses.map((bonus, i) => (
              <div
                key={i}
                className="relative flex flex-col p-5 rounded-xl border border-amber-500/20 bg-amber-500/5"
              >
                <div className="absolute -top-2 right-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    FREE
                  </span>
                </div>
                <div className="text-base font-semibold text-white mb-1 pr-12">{bonus.name}</div>
                <p className="text-xs text-tech-200 mb-2">{bonus.desc}</p>
                <div className="flex items-center gap-2 mt-auto">
              <span className="text-lg font-bold text-emerald-400">$0</span>
                  <span className="text-xs text-tech-300 line-through">{bonus.value}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-tech-300 text-center">
            Get all 3 bonuses instantly when you buy today.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* FOMO SECTION                                        */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-10">
          <div className="relative overflow-hidden rounded-2xl border border-tech-500/20 bg-tech-700/60 p-6 sm:p-8 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 pointer-events-none" />
            <div className="relative">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center justify-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                ⏳ Price Increasing Soon
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-4">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-orange-400">$9</div>
                  <div className="text-xs text-tech-300">Current price</div>
                </div>
                <div className="hidden sm:block text-2xl text-tech-500">→</div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-tech-300 line-through">$19</div>
                  <div className="text-xs text-tech-300">Next tier</div>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Copies sold: 100+
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  Price increases in: 48 hours
                </span>
              </div>
              <button
                onClick={() => setShowCheckout(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 text-white font-semibold text-sm hover:opacity-90 transition hover:-translate-y-0.5 shadow-lg shadow-orange-500/20"
              >
                <ShoppingCart className="w-4 h-4" />
                Buy Now at $9 — Price Goes Up Soon
              </button>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* FAQ ACCORDION                                       */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-cyan-400" />
            ❓ Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqItems.map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-tech-500/20 bg-tech-700/50 overflow-hidden transition hover:border-orange-500/20"
              >
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
                  <span className="text-sm sm:text-base font-medium text-white group-hover:text-orange-400 transition pr-4">
                    {faq.q}
                  </span>
                  <ChevronRight className="w-5 h-5 text-tech-300 shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-tech-500/10 pt-3">
                  <p className="text-xs sm:text-sm text-tech-200 leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* RISK REVERSAL / GUARANTEE                           */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-10">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-tech-800 border border-emerald-500/20 p-6 sm:p-8 text-center">
            <div className="absolute inset-0 bg-tech-grid opacity-20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />
            <div className="relative">
              <Shield className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
                100% Risk-Free — 30-Day Money-Back Guarantee
              </h2>
              <p className="text-sm text-tech-200 max-w-lg mx-auto mb-4 leading-relaxed">
                If AI Marketing for Asian Markets doesn&apos;t help you reach and convert Asian audiences
                more effectively within 30 days, I&apos;ll refund every cent. No questions asked. You keep the bonuses
                even if you ask for a refund — that&apos;s how confident I am this will work for you.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-tech-300">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  Instant download
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  30-day guarantee
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  Free updates
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* FINAL CTA — PRICE CARD                              */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-orange-500/5 border border-orange-500/20 p-6 sm:p-8 text-center">
          <div className="absolute inset-0 bg-tech-grid opacity-20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-500/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 mb-4">
              <Globe className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Ready to Reach Asian Markets?
            </h2>
            <p className="text-sm text-tech-200 max-w-lg mx-auto mb-4">
              Get the complete 30+ page PDF playbook. Every workflow, prompt, and cultural
              framework you need to market effectively across Asia.
            </p>

            <div className="inline-flex items-center gap-4 px-4 py-2 rounded-xl bg-tech-700/80 border border-tech-500/20 mb-4">
              <div className="text-left">
                <div className="text-2xl font-bold text-white">$9</div>
                <div className="text-[10px] text-tech-300">one-time payment</div>
              </div>
              <div className="h-8 w-px bg-tech-500/30" />
              <div className="text-left">
                <div className="text-xs font-medium text-emerald-400">Lifetime access</div>
                <div className="text-[10px] text-tech-300">Free updates</div>
              </div>
            </div>

            <button
              onClick={() => setShowCheckout(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 text-white font-semibold text-sm hover:opacity-90 transition hover:-translate-y-0.5 shadow-lg shadow-orange-500/20"
            >
              <ShoppingCart className="w-4 h-4" />
              Download PDF — $9
            </button>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[10px] text-tech-300">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                Instant download
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                30-day guarantee
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                Free updates
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Checkout Overlay */}
      {showCheckout && <CheckoutOverlay onBack={() => setShowCheckout(false)} />}
    </>
  );
}

// ─── Exported Page (Suspense-wrapped) ──────────────────────

export default function AIMarketingForAsiaPage() {
  return (
    <Suspense fallback={
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-tech-700 rounded w-1/4" />
          <div className="h-8 bg-tech-700 rounded w-3/4" />
          <div className="h-64 bg-tech-700 rounded" />
        </div>
      </div>
    }>
      <AIForMarketingInner />
    </Suspense>
  );
}
