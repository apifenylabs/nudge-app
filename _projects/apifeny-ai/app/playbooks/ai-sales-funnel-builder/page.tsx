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
  Lightbulb,
  ChevronRight,
  ShoppingCart,
  FileText,
  Rocket,
  Brain,
  Search as SearchIcon,
  Shield,
  BarChart3,
  Globe,
  Image,
  MessageSquare,
  Package,
  Mail,
  BarChart,
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
    id: 'define-funnel',
    icon: <FileText className="w-5 h-5 text-emerald-400" />,
    title: 'Define Your Funnel Stages & ICP',
    description: 'Map out your complete funnel: awareness → interest → consideration → intent → evaluation → purchase. Define prospect mindset, key questions, and desired actions at every stage.',
    items: [
      'Six-stage funnel framework with specific goals per stage',
      'ChatGPT-powered ICP and ideal customer persona builder',
      'Lead scoring framework with points for each qualifying action',
      'Content type recommendations for each funnel stage',
      'Conversion goal templates for every touchpoint',
    ],
  },
  {
    id: 'lead-capture',
    icon: <Zap className="w-5 h-5 text-amber-400" />,
    title: 'AI-Powered Lead Capture System',
    description: 'Build a lead magnet and landing page system that captures and qualifies leads automatically. ChatGPT generates forms, landing page copy, and opt-in incentives.',
    items: [
      'ChatGPT-generated HTML forms with embedded CSS styling',
      'Lead magnet creation: checklists, templates, mini-courses',
      'Magnetic headlines and benefit-focused landing page copy',
      'Low-friction CTA strategies that convert cold traffic',
      '5-field lead capture forms optimized for conversion',
    ],
  },
  {
    id: 'lead-nurturing',
    icon: <Zap className="w-5 h-5 text-rose-400" />,
    title: 'Automated Lead Nurturing with Make',
    description: 'Connect your forms to Make (Integromat) for automated multi-step nurturing: CRM entry, welcome emails, interest-based tagging, and conditional follow-up sequences.',
    items: [
      'Webhook-triggered lead capture into any CRM',
      'Conditional branching based on lead score thresholds',
      'ChatGPT module for personalized dynamic email bodies',
      'Notion AI integration for lead logging and next-action dates',
      'Multi-step email sequences with A/B testing built in',
    ],
  },
  {
    id: 'demo-scheduling',
    icon: <Clock className="w-5 h-5 text-cyan-400" />,
    title: 'Smart Demo Scheduling with Motion',
    description: 'Trigger demo requests when leads hit score thresholds. Motion auto-finds the best time slots based on timezone, availability, and lead priority.',
    items: [
      'Score-threshold triggered demo request automation',
      'Smart timezone-aware scheduling with Motion',
      'Priority slot allocation for high-score leads',
      'Auto-generated Zoom invites with calendar sync',
      'Buffer and focus time protection in your schedule',
    ],
  },
  {
    id: 'lead-scoring',
    icon: <Brain className="w-5 h-5 text-violet-400" />,
    title: 'Lead Scoring with Notion AI',
    description: 'Build a Notion database that tracks every lead interaction and auto-calculates scores. Get real-time alerts for hot leads with automated routing.',
    items: [
      'Notion AI auto-calculated lead scoring formulas',
      'Real-time hot lead alerts: "Hot — Call Now" triggers',
      'Calendar routing for same-day follow-up via Motion',
      'Full interaction history: opens, clicks, form fills',
      'Customizable scoring weights per action type',
    ],
  },
  {
    id: 'analytics',
    icon: <BarChart3 className="w-5 h-5 text-fuchsia-400" />,
    title: 'Funnel Analytics & Optimization',
    description: 'Analyze your funnel data monthly with ChatGPT: find drop-off stages, winning email templates, best lead sources, and get AI-recommended A/B tests.',
    items: [
      'Monthly funnel audit with ChatGPT data analysis',
      'Conversion rate tracking per stage and per channel',
      'First-touch vs last-touch attribution modeling',
      'A/B test recommendations from your actual data',
      'Dead-lead revival sequences with Make automation',
    ],
  },
];

// ─── What is Included ───────────────────────────────────────

const includedItems = [
  { icon: FileText, text: '6 comprehensive chapters', subtext: '30+ pages of actionable sales funnel strategies' },
  { icon: FileText, text: 'Ready-to-use prompt library', subtext: '25+ copy-paste prompts for funnel building' },
  { icon: Image, text: 'Make scenario blueprints', subtext: 'Complete automation workflow templates' },
  { icon: MessageSquare, text: 'Lead scoring templates', subtext: 'Notion AI formulas for real-time prioritization' },
  { icon: DollarSign, text: 'Revenue worksheets', subtext: 'Pricing, funnel metrics, and ROI calculator' },
  { icon: Rocket, text: 'Automation pipeline blueprints', subtext: 'From landing page to closed deal in one system' },
];

const whoItsFor = [
  { icon: Target, text: 'Solopreneurs & founders', subtext: 'Build a sales engine that works while you sleep' },
  { icon: Target, text: 'Sales teams & SDRs', subtext: 'Cut listing time by 80% with AI automation' },
  { icon: Star, text: 'Consultants & coaches', subtext: 'Convert prospects without manual follow-up' },
  { icon: Lightbulb, text: 'SaaS companies', subtext: 'Automate trial-to-paid funnel with triggered sequences' },
];

const whatYoullLearn = [
  { icon: Brain, text: 'Capture leads automatically', subtext: 'AI forms and landing pages that convert' },
  { icon: Image, text: 'Nurture with zero manual work', subtext: 'Make scenarios do the heavy lifting' },
  { icon: MessageSquare, text: 'Score leads in real-time', subtext: 'AI chatbot handles 20+ hrs of queries' },
  { icon: TrendingUp, text: '4.2x more demo bookings', subtext: '3.1x higher conversion with AI-optimized listings' },
];

// ─── Social Proof Stats ────────────────────────────────────

const socialProofStats = [
  { icon: Target, value: '4.2x', label: 'More demo bookings', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { icon: TrendingUp, value: '3.1x', label: 'Funnel conversion rate', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { icon: Clock, value: '80%', label: 'Manual hours saved', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { icon: Zap, value: '20+ hrs', label: 'Saved per week', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
];

// ─── Testimonials ──────────────────────────────────────────

const testimonials = [
  {
    name: 'Marcus Chen',
    title: 'SaaS Founder, Singapore',
    quote: 'We went from 0 to 40 demos a month using the funnel builder. The Make scenario templates alone saved us weeks of trial and error. Best $9 I&apos;ve spent this year.',
    stars: 5,
  },
  {
    name: 'Anita Patel',
    title: 'Consultant, Malaysia',
    quote: 'My pipeline went from random cold outreach to a real, automated sales engine. The lead scoring system in Notion AI changed everything &mdash; I know exactly who to call and when.',
    stars: 5,
  },
  {
    name: 'David Kim',
    title: 'Ecommerce Owner, Korea',
    quote: 'Set up the funnel in one weekend. Now leads come in, get nurtured, and book demos automatically. I&apos;m closing 3x more without spending more on ads or hiring salespeople.',
    stars: 5,
  },
];

// ─── Bonuses ───────────────────────────────────────────────

const bonuses = [
  { name: 'Make Scenario Template Pack', value: '$19', desc: '5 pre-built Make automation scenarios for lead capture, nurturing, scoring, and revival' },
  { name: '50+ Copy-Paste Funnel Prompts', value: '$15', desc: 'Prompts for landing pages, emails, lead scoring formulas, and funnel analysis' },
  { name: 'Funnel KPI Dashboard (Notion)', value: '$13', desc: 'Complete Notion template with lead tracking, scoring, and monthly performance review' },
];

// ─── FAQ Items ─────────────────────────────────────────────

const faqItems = [
  {
    q: 'Is this a digital download?',
    a: "Yes! The AI Sales Funnel Builder playbook is a digital PDF delivered instantly after purchase. You'll also receive a download link via email so you can access it anytime, anywhere.",
  },
  {
    q: 'Do I need technical skills?',
    a: "Not at all. This playbook is designed for non-technical founders with no coding background. Every system includes step-by-step instructions, copy-paste prompts, and clear explanations. If you can use Google Forms, you can follow this playbook.",
  },
  {
    q: 'Which platforms does it support?',
    a: "The playbook covers ChatGPT, Make (Integromat), Motion, Notion AI, and Perplexity. All are subscription-based or have free tiers. We include setup guides for each tool.",
  },
  {
    q: 'Can I get a refund?',
    a: "Absolutely. If the AI Sales Funnel Builder playbook doesn't help you save 10x your investment within 30 days, I'll refund every cent. No questions asked. Just email support and I'll process it immediately.",
  },
  {
    q: 'How often is it updated?',
    a: "The playbook is updated quarterly to reflect the latest AI tools, ecommerce trends, and best practices. All updates are free for life — you'll get an email notification whenever a new version is released.",
  },
  {
    q: 'Can I share this with my team?',
    a: "This purchase is for individual use. If you'd like to share with your team or use it for group training, please reach out about our team license options at a discounted rate.",
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
        body: JSON.stringify({ email, product: 'ai-sales-funnel-builder' }),
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
        <SeoMetadata title="AI Sales Funnel Builder — Convert More Customers" description="Build high-converting sales funnels with AI. Landing pages, email sequences, lead scoring, objection handling, and conversion optimization." />
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
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-1">AI Sales Funnel Builder</h3>
          <p className="text-sm text-tech-200">Complete PDF Playbook</p>
          <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/20">
            <DollarSign className="w-4 h-4 text-emerald-400" />
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
              className="mt-4 text-sm text-emerald-400 hover:underline"
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
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

function AIForEcommerceInner() {
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      <SeoMetadata title="AI Sales Funnel Builder — Convert More Customers" description="Build high-converting sales funnels with AI. Landing pages, email sequences, lead scoring, objection handling, and conversion optimization." />
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
            <li className="text-tech-100 truncate max-w-[200px]">AI Sales Funnel Builder</li>
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
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/25 via-teal-500/15 to-tech-800 border border-emerald-500/20 mb-8 sm:mb-10">
          <div className="absolute inset-0 bg-tech-grid opacity-30" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">🔻</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/20 text-emerald-400 border border-emerald-500/30">
                Premium
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              AI Sales Funnel Builder
            </h1>

            <p className="text-sm sm:text-base text-tech-100 max-w-2xl mb-4 leading-relaxed">
              Supercharge your online store with AI: bulk product descriptions, AI-powered chatbots,
              inventory forecasting, personalized recommendations, and automated customer support.
              Built for Shopify, WooCommerce, and custom store owners who want to scale without hiring a team.
            </p>

            {/* Key stats */}
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100 border border-tech-500/30">
                <FileText className="w-3 h-3" />
                30+ pages
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100 border border-tech-500/30">
                <Clock className="w-3 h-3" />
                6 chapters
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100 border border-tech-500/30">
                <Sparkles className="w-3 h-3" />
                40+ prompts
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100 border border-tech-500/30">
                <Globe className="w-3 h-3" />
                Updated July 2026
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowCheckout(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm hover:opacity-90 transition hover:-translate-y-0.5 shadow-lg shadow-emerald-500/20"
              >
                <Download className="w-4 h-4" />
                Download PDF — $9
              </button>
              <a
                href="#preview"
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-tech-700 border border-tech-500/30 text-tech-100 text-sm font-medium hover:text-white hover:border-emerald-500/30 transition"
              >
                <BookOpen className="w-4 h-4" />
                Preview Contents
              </a>
            </div>

            {/* Trust signals after CTA buttons */}
            <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-tech-200">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                100+ business owners have downloaded this playbook
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                30-Day Money-Back Guarantee — 3x your lead conversion or get refunded
              </span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════ */}
        {/* WHAT IS INSIDE                                    */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-10" id="preview">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            What&apos;s Inside
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {includedItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl border border-tech-500/20 bg-tech-700/60 hover:border-emerald-500/20 transition"
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
                  className="flex items-start gap-3 p-4 rounded-xl border border-emerald-500/20 bg-sky-500/5"
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
            Here&apos;s everything covered in the AI Sales Funnel Builder playbook. Each chapter is
            packed with actionable strategies, real examples, and ready-to-use prompts.
          </p>

          <div className="space-y-4">
            {sections.map((section) => (
              <details
                key={section.id}
                className="group rounded-xl border border-tech-500/20 bg-tech-700/50 overflow-hidden transition hover:border-emerald-500/20"
              >
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-tech-600 flex items-center justify-center shrink-0">
                      {section.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-emerald-400 transition">
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
            <Users className="w-4 h-4 text-emerald-400" />
            💬 Build in Public — Real Results
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
          <div className="mt-4 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-center">
            <p className="text-sm text-emerald-200">
              <CheckCircle className="w-4 h-4 inline-block mr-1.5 text-emerald-400" />
              Every strategy in this playbook is battle-tested on real sales funnels. Results are from actual ecommerce owners using these exact workflows.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* TESTIMONIALS                                        */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400" />
            ⭐ What Store Owners Say
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
          <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-tech-700/60 p-6 sm:p-8 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 pointer-events-none" />
            <div className="relative">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center justify-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                ⏳ Price Increasing Soon
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-4">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-emerald-400">$9</div>
                  <div className="text-xs text-tech-300">Current price</div>
                </div>
                <div className="hidden sm:block text-2xl text-tech-500">→</div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-tech-300 line-through">$19</div>
                  <div className="text-xs text-tech-300">Next tier</div>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Copies sold: 100+
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  Price increases in: 48 hours
                </span>
              </div>
              <button
                onClick={() => setShowCheckout(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm hover:opacity-90 transition hover:-translate-y-0.5 shadow-lg shadow-emerald-500/20"
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
            <Lightbulb className="w-4 h-4 text-emerald-400" />
            ❓ Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqItems.map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-tech-500/20 bg-tech-700/50 overflow-hidden transition hover:border-emerald-500/20"
              >
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
                  <span className="text-sm sm:text-base font-medium text-white group-hover:text-emerald-400 transition pr-4">
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
                If the AI Sales Funnel Builder playbook doesn&apos;t help you save 10x times your investment
                within 30 days, I&apos;ll refund every cent. No questions asked. You keep the bonuses
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
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-cyan-500/10 border border-emerald-500/20 p-6 sm:p-8 text-center">
          <div className="absolute inset-0 bg-tech-grid opacity-20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Ready to Automate Your Sales Funnel?
            </h2>
            <p className="text-sm text-tech-200 max-w-lg mx-auto mb-4">
              Get the complete AI Sales Funnel Builder PDF playbook. Every strategy, prompt, and system
              you need to supercharge your store with AI.
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm hover:opacity-90 transition hover:-translate-y-0.5 shadow-lg shadow-emerald-500/20"
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

export default function AIForEcommercePage() {
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
      <AIForEcommerceInner />
    </Suspense>
  );
}