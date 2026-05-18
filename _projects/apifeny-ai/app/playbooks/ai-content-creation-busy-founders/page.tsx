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
  PenTool,
  MessageSquare,
  Image,
  Edit,
} from 'lucide-react';

interface Section {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
}

const sections: Section[] = [
  {
    id: 'strategy',
    icon: <Brain className="w-5 h-5 text-violet-400" />,
    title: 'Content Strategy in 30 Minutes',
    description: 'How to build a complete content strategy using AI in under an hour. Covers niche positioning, audience analysis, and content pillar planning.',
    items: [
      'Audience discovery — let AI analyze your ideal reader in minutes',
      'Content pillar architecture: 3-5 themes that drive traffic',
      'Keyword research with ChatGPT and Perplexity',
      'Competitor content gap analysis',
      'The 30-minute content strategy template',
      'Setting up a content calendar that practically writes itself',
    ],
  },
  {
    id: 'writing',
    icon: <PenTool className="w-5 h-5 text-cyan-400" />,
    title: 'AI-Powered Writing — Blog Posts That Rank & Convert',
    description: 'From outline to published post in under an hour. Learn the exact prompt chains for writing SEO-optimized, human-quality blog content.',
    items: [
      'The 5-prompt blog workflow: outline, draft, optimize, edit, polish',
      'Structuring content for readability and SEO',
      'Adding real examples, data, and personality to AI drafts',
      'Internal linking strategies AI can execute',
      'Fact-checking and citation automation',
      'Case studies and storytelling with AI assistance',
    ],
  },
  {
    id: 'social',
    icon: <MessageSquare className="w-5 h-5 text-fuchsia-400" />,
    title: 'Social Media Content — 30 Days in One Session',
    description: 'Batch-produce a month of social media content across LinkedIn, X, Threads, and newsletters using AI agents.',
    items: [
      'The 30-day content batching framework',
      'One long-form post → 15+ social media variants',
      'Platform-specific optimization (LinkedIn, X, Threads)',
      'Thread creation and hook generation',
      'Visual content briefs for designers and AI image tools',
      'Scheduling and cross-posting automation',
    ],
  },
  {
    id: 'email',
    icon: <FileText className="w-5 h-5 text-emerald-400" />,
    title: 'Email & Newsletter Content That Grows Your List',
    description: 'Build an email content engine that nurtures subscribers, drives opens, and converts readers into customers.',
    items: [
      'Welcome sequences that convert on autopilot',
      'Weekly newsletter templates for busy founders',
      'AI-powered subject line testing and optimization',
      'Segmentation strategies AI can execute',
      'Re-engagement campaigns for cold subscribers',
      'Email-to-blog and blog-to-email content recycling',
    ],
  },
  {
    id: 'multimedia',
    icon: <Image className="w-5 h-5 text-amber-400" />,
    title: 'Multimedia Content — Video, Audio & Visuals',
    description: 'Repurpose written content into video scripts, podcast episodes, infographics, and social visuals with minimal effort.',
    items: [
      'Blog post → video script in 5 prompts',
      'AI-generated podcast outlines and show notes',
      'Social graphics and visual content briefs',
      'Repurposing frameworks: one pillar, 20+ formats',
      'AI voiceover and transcription workflows',
      'Thumbnail and hook generation for video content',
    ],
  },
  {
    id: 'workflow',
    icon: <Zap className="w-5 h-5 text-sky-400" />,
    title: 'The Automated Content Pipeline',
    description: 'String together AI tools into an end-to-end content production pipeline that runs on autopilot.',
    items: [
      'Research → write → optimize → publish → distribute',
      'Zapier/Make automations for content flow',
      'AI content review and quality assurance',
      'Performance tracking and iteration loops',
      'Scaling from 1x/week to daily content with same effort',
      'Tools stack: ChatGPT, Claude, Canva AI, Descript, Buffer',
    ],
  },
  {
    id: 'measurement',
    icon: <BarChart3 className="w-5 h-5 text-rose-400" />,
    title: 'Measurement & Optimization — Data-Driven Content',
    description: 'Use AI to analyze content performance, identify winners, and double down on what works.',
    items: [
      'AI-powered content performance audits',
      'Identifying high-converting topics and formats',
      'A/B testing headlines and CTAs at scale',
      'Competitor content monitoring with AI',
      'ROI reporting for content marketing efforts',
      'The content flywheel: turning winners into more winners',
    ],
  },
];

const includedItems = [
  { icon: BookOpen, text: '7 comprehensive chapters', subtext: '45+ pages of actionable content' },
  { icon: FileText, text: 'Ready-to-use prompt library', subtext: '40+ copy-paste AI prompts' },
  { icon: Zap, text: 'Content calendar template', subtext: 'Plan 30 days of content in one sitting' },
  { icon: TrendingUp, text: 'SEO optimization checklists', subtext: 'Rank higher with AI-assisted research' },
  { icon: DollarSign, text: 'Repurposing cheat sheet', subtext: 'One piece of content → 20+ formats' },
  { icon: Rocket, text: 'Newsletter launch kit', subtext: 'From zero to first 1,000 subscribers' },
];

const whoItsFor = [
  { icon: Users, text: 'Busy founders', subtext: 'No time for content? This system changes that' },
  { icon: Target, text: 'Solo marketers', subtext: 'Own your entire content pipeline with AI' },
  { icon: Star, text: 'Content creators', subtext: 'Scale output without burning out' },
  { icon: Lightbulb, text: 'Agency owners', subtext: 'Deliver client content at 5x speed' },
];

const whatYoullLearn = [
  { icon: Brain, text: 'Build a content strategy in 30 min', subtext: 'AI-assisted niche positioning' },
  { icon: PenTool, text: 'Write posts that rank and convert', subtext: 'Proven prompt workflows' },
  { icon: Zap, text: 'Batch 30 days of content in one go', subtext: 'Production line efficiency' },
  { icon: TrendingUp, text: 'Measure and optimize everything', subtext: 'Data-driven content decisions' },
];

const socialProofStats = [
  { icon: Users, value: '200+', label: 'Founders using these workflows', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
  { icon: TrendingUp, value: '15 hrs', label: 'Saved per week on content', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
  { icon: Clock, value: '85%', label: 'Faster content production', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
  { icon: Zap, value: '3x', label: 'More content with same effort', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
];

const testimonials = [
  {
    name: 'Alex Nakamura',
    title: 'SaaS Founder',
    quote: 'I used to spend 20 hours a week on content. Now I produce more in 5 hours. The batching framework alone is worth 10x the price. My LinkedIn engagement doubled in the first month.',
    stars: 5,
  },
  {
    name: 'Rachel Choi',
    title: 'Ecommerce Owner',
    quote: 'This playbook transformed my content pipeline. I went from sporadic posting to a consistent 3x/week schedule. The newsletter templates helped me grow from 0 to 800 subscribers in 6 weeks.',
    stars: 5,
  },
  {
    name: 'David Osei',
    title: 'Freelance Marketer',
    quote: 'The repurposing cheat sheet is a game-changer. One client blog post now becomes 15+ social media posts, an email, a video script, and podcast notes. My clients love the volume and quality.',
    stars: 5,
  },
];

const bonuses = [
  { name: 'Content Calendar Notion Template', value: '$19', desc: 'Plan, track, and manage 30 days of content with automated prompts and scheduling' },
  { name: '40+ Copy-Paste Content Prompts', value: '$15', desc: 'Ready-to-use prompts for blog posts, social media, emails, and video scripts' },
  { name: 'Newsletter Growth Checklist', value: '$13', desc: 'Step-by-step system to grow from 0 to 5K subscribers with AI assistance' },
];

const faqItems = [
  {
    q: 'Is this a digital download?',
    a: "Yes! The AI Content Creation for Busy Founders playbook is a digital PDF delivered instantly after purchase. You'll also receive a download link via email so you can access it anytime, anywhere.",
  },
  {
    q: 'Do I need to be a good writer?',
    a: "Not at all. This playbook is designed for founders who struggle with writing or simply don't have time. The AI prompts do the heavy lifting — you just add your expertise and perspective.",
  },
  {
    q: 'Can I get a refund?',
    a: "Absolutely. If this playbook doesn't help you produce 3x more content in half the time within 30 days, I'll refund every cent. No questions asked. Just email support.",
  },
  {
    q: 'How often is it updated?',
    a: "The playbook is updated quarterly to reflect the latest AI tools, platform changes, and content strategies. All updates are free for life.",
  },
  {
    q: 'Which AI tools do I need?',
    a: "The playbook is optimized for ChatGPT and Claude, but the frameworks work with any AI writing tool. Bonus prompts for Perplexity, Canva AI, and Descript are included.",
  },
  {
    q: 'Can I share this with my team?',
    a: "This purchase is for individual use. If you'd like to share with your team or use it for training, please reach out about our team license options at a discounted rate.",
  },
];

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
        body: JSON.stringify({ email, product: 'ai-content-creation-busy-founders' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create checkout');
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
      <div className="relative max-w-md w-full bg-tech-800 border border-tech-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-pink-500/10">
        <button onClick={onBack} className="absolute top-4 right-4 text-tech-300 hover:text-white transition" aria-label="Close">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center mb-4">
            <PenTool className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-1">AI Content Creation for Busy Founders</h3>
          <p className="text-sm text-tech-200">Complete PDF Playbook</p>
          <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/20">
            <DollarSign className="w-4 h-4 text-pink-400" />
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
            <button onClick={onBack} className="mt-4 text-sm text-pink-400 hover:underline">Back to playbook</button>
          </div>
        ) : (
          <form onSubmit={handlePurchase} className="space-y-4">
            <div>
              <label htmlFor="checkout-email" className="block text-sm font-medium text-tech-200 mb-1">Email address</label>
              <input id="checkout-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required
                className="w-full bg-tech-900 border border-tech-500/50 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-tech-300 focus:outline-none focus:border-pink-400/60 focus:ring-1 focus:ring-pink-400/20 transition" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-400 to-rose-500 text-white font-semibold text-sm hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {loading ? (
                <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Processing...</>
              ) : (
                <><Download className="w-4 h-4" /> Download PDF — $9</>
              )}
            </button>
            {status === 'error' && <p className="text-xs text-red-400 text-center">{message}</p>}
            <p className="text-[10px] text-tech-300 text-center">Secure checkout. Your PDF will be available immediately after purchase.</p>
          </form>
        )}
      </div>
    </div>
  );
}

function AIContentCreationForBusyFoundersInner() {
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <SeoMetadata title="AI Content Creation for Busy Founders — Produce 3x More in Half the Time" description="Step-by-step playbook for founders who want to create high-quality content with AI. Strategy, writing, social media, email, and repurposing workflows." />
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-tech-300">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li className="text-tech-500">/</li>
            <li><Link href="/playbooks" className="hover:text-white transition">Playbooks</Link></li>
            <li className="text-tech-100 truncate max-w-[200px]">AI Content Creation for Busy Founders</li>
          </ol>
        </nav>
        <Link href="/playbooks" className="inline-flex items-center gap-1.5 text-sm text-tech-200 hover:text-white transition mb-6 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
          All Playbooks
        </Link>

        {/* Hero */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-500/25 via-rose-500/15 to-tech-800 border border-pink-500/20 mb-8 sm:mb-10">
          <div className="absolute inset-0 bg-tech-grid opacity-30" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">✍️</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">Premium</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">AI Content Creation for Busy Founders</h1>
            <p className="text-sm sm:text-base text-tech-100 max-w-2xl mb-4 leading-relaxed">
              Stop spending 20+ hours a week on content. This playbook shows you how to
              produce high-quality blog posts, social media, emails, and video scripts in
              a fraction of the time — using AI as your co-pilot, not your replacement.
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100 border border-tech-500/30"><FileText className="w-3 h-3" /> 45+ pages</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100 border border-tech-500/30"><PenTool className="w-3 h-3" /> 7 chapters</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100 border border-tech-500/30"><Sparkles className="w-3 h-3" /> 40+ prompts</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100 border border-tech-500/30"><Globe className="w-3 h-3" /> Updated July 2026</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={() => setShowCheckout(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-400 to-rose-500 text-white font-semibold text-sm hover:opacity-90 transition hover:-translate-y-0.5 shadow-lg shadow-pink-500/20">
                <Download className="w-4 h-4" /> Download PDF — $9
              </button>
              <a href="#preview" className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-tech-700 border border-tech-500/30 text-tech-100 text-sm font-medium hover:text-white hover:border-pink-400/30 transition">
                <BookOpen className="w-4 h-4" /> Preview Contents
              </a>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-tech-200">
              <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" /> 200+ founders have downloaded this playbook</span>
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> 30-Day Money-Back Guarantee</span>
            </div>
          </div>
        </div>

        {/* What's Inside */}
        <section className="mb-8 sm:mb-10" id="preview">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><BookOpen className="w-4 h-4 text-pink-400" /> What&apos;s Inside</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {includedItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-tech-500/20 bg-tech-700/60 hover:border-pink-400/20 transition">
                  <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center shrink-0"><Icon className="w-5 h-5 text-pink-400" /></div>
                  <div><p className="text-sm font-medium text-white">{item.text}</p><p className="text-xs text-tech-300 mt-0.5">{item.subtext}</p></div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Who This Is For */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><Users className="w-4 h-4 text-sky-400" /> Who This Is For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {whoItsFor.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-sky-500/20 bg-sky-500/5">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0"><Icon className="w-5 h-5 text-sky-400" /></div>
                  <div><p className="text-sm font-medium text-white">{item.text}</p><p className="text-xs text-tech-300 mt-0.5">{item.subtext}</p></div>
                </div>
              );
            })}
          </div>
        </section>

        {/* What You'll Learn */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><Target className="w-4 h-4 text-emerald-400" /> What You&apos;ll Learn</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {whatYoullLearn.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0"><Icon className="w-5 h-5 text-emerald-400" /></div>
                  <div><p className="text-sm font-medium text-white">{item.text}</p><p className="text-xs text-tech-300 mt-0.5">{item.subtext}</p></div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Chapter Preview */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><SearchIcon className="w-4 h-4 text-amber-400" /> Chapter Preview</h2>
          <p className="text-sm text-tech-200 mb-6">Here&apos;s everything covered in the AI Content Creation playbook. Each chapter is packed with actionable strategies, real examples, and ready-to-use prompts.</p>
          <div className="space-y-4">
            {sections.map((section) => (
              <details key={section.id} className="group rounded-xl border border-tech-500/20 bg-tech-700/50 overflow-hidden transition hover:border-pink-400/20">
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-tech-600 flex items-center justify-center shrink-0">{section.icon}</div>
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-pink-400 transition">{section.title}</h3>
                      <p className="text-xs text-tech-300 mt-0.5 line-clamp-1">{section.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-tech-300 shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-tech-500/10 pt-3">
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-tech-100"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> {item}</li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Social Proof */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><Users className="w-4 h-4 text-emerald-400" /> 💬 Real Results — Deployed by 200+ Founders</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {socialProofStats.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className={`flex flex-col items-center text-center p-4 sm:p-5 rounded-xl border ${item.border} ${item.bg}`}>
                  <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center mb-2`}><Icon className={`w-5 h-5 ${item.color}`} /></div>
                  <div className={`text-xl sm:text-2xl font-bold ${item.color}`}>{item.value}</div>
                  <div className="text-xs text-tech-200 mt-1">{item.label}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-center">
            <p className="text-sm text-emerald-200"><CheckCircle className="w-4 h-4 inline-block mr-1.5 text-emerald-400" /> Every workflow in this playbook has been battle-tested with real founders.</p>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><Star className="w-4 h-4 text-amber-400" /> ⭐ What Early Adopters Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {testimonials.map((t, i) => (
              <div key={i} className="flex flex-col p-5 rounded-xl border border-tech-500/20 bg-tech-700/60">
                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: t.stars }).map((_, si) => (<Star key={si} className="w-4 h-4 text-amber-400 fill-amber-400" />))}
                </div>
                <blockquote className="text-xs sm:text-sm text-tech-100 leading-relaxed mb-3 flex-1">&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="border-t border-tech-500/10 pt-3 mt-auto">
                  <div className="text-sm font-medium text-white">{t.name}</div>
                  <div className="text-xs text-tech-300">{t.title}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bonuses */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><Zap className="w-4 h-4 text-amber-400" /> 🎁 Free Bonuses ($47 Value — Yours Today)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {bonuses.map((bonus, i) => (
              <div key={i} className="relative flex flex-col p-5 rounded-xl border border-amber-500/20 bg-amber-500/5">
                <div className="absolute -top-2 right-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">FREE</span>
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
          <p className="mt-4 text-xs text-tech-300 text-center">Get all 3 bonuses instantly when you buy today.</p>
        </section>

        {/* FOMO */}
        <section className="mb-8 sm:mb-10">
          <div className="relative overflow-hidden rounded-2xl border border-tech-500/20 bg-tech-700/60 p-6 sm:p-8 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-rose-500/5 pointer-events-none" />
            <div className="relative">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center justify-center gap-2"><Clock className="w-5 h-5 text-cyan-400" /> ⏳ Price Increasing Soon</h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-4">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-pink-400">$9</div>
                  <div className="text-xs text-tech-300">Current price</div>
                </div>
                <div className="hidden sm:block text-2xl text-tech-500">→</div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-tech-300 line-through">$19</div>
                  <div className="text-xs text-tech-300">Next tier</div>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs"><TrendingUp className="w-3.5 h-3.5" /> Copies sold: 200+</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs"><Clock className="w-3.5 h-3.5" /> Price increases in: 48 hours</span>
              </div>
              <button onClick={() => setShowCheckout(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-400 to-rose-500 text-white font-semibold text-sm hover:opacity-90 transition hover:-translate-y-0.5 shadow-lg shadow-pink-500/20">
                <ShoppingCart className="w-4 h-4" /> Buy Now at $9 — Price Goes Up Soon
              </button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><Lightbulb className="w-4 h-4 text-cyan-400" /> Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqItems.map((faq, i) => (
              <details key={i} className="group rounded-xl border border-tech-500/20 bg-tech-700/50 overflow-hidden transition hover:border-pink-400/20">
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
                  <span className="text-sm sm:text-base font-medium text-white group-hover:text-pink-400 transition pr-4">{faq.q}</span>
                  <ChevronRight className="w-5 h-5 text-tech-300 shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-tech-500/10 pt-3">
                  <p className="text-xs sm:text-sm text-tech-200 leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Guarantee */}
        <section className="mb-8 sm:mb-10">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-tech-800 border border-emerald-500/20 p-6 sm:p-8 text-center">
            <div className="absolute inset-0 bg-tech-grid opacity-20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />
            <div className="relative">
              <Shield className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2">100% Risk-Free - 30-Day Money-Back Guarantee</h2>
              <p className="text-sm text-tech-200 max-w-lg mx-auto mb-4 leading-relaxed">
                If the AI Content Creation playbook doesn&apos;t help you produce 3x more content in half the time
                within 30 days, I will refund every cent. No questions asked. You keep the bonuses even if you ask for a refund.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-tech-300">
                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Instant download</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> 30-day guarantee</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Free updates</span>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-500/20 via-rose-500/10 to-amber-500/10 border border-pink-400/20 p-6 sm:p-8 text-center">
          <div className="absolute inset-0 bg-tech-grid opacity-20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-pink-500/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 mb-4">
              <PenTool className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Ready to Save 15 Hours a Week on Content?</h2>
            <p className="text-sm text-tech-200 max-w-lg mx-auto mb-4">
              Get the complete 45+ page PDF playbook. Every system, prompt, and strategy
              you need to create content that grows your business — without the burnout.
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
            <button onClick={() => setShowCheckout(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-400 to-rose-500 text-white font-semibold text-sm hover:opacity-90 transition hover:-translate-y-0.5 shadow-lg shadow-pink-500/20">
              <ShoppingCart className="w-4 h-4" /> Download PDF - $9
            </button>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[10px] text-tech-300">
              <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-400" /> Instant download</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-400" /> 30-day guarantee</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-400" /> Free updates</span>
            </div>
          </div>
        </section>
      </div>
      {showCheckout && <CheckoutOverlay onBack={() => setShowCheckout(false)} />}
    </>
  );
}

export default function AIContentCreationForBusyFoundersPage() {
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
      <AIContentCreationForBusyFoundersInner />
    </Suspense>
  );
}
