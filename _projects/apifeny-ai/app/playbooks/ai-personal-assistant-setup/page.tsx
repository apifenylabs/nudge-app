'use client';

// OG tags handled by parent layout.

import SeoMetadata from '@/components/SeoMetadata';
import EmailCapture from '@/components/EmailCapture';
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
 id: 'mindset',
 icon: <Brain className="w-5 h-5 text-violet-400" />,
 title: 'The Solopreneur Mindset & Strategy',
 description: 'How to think like a successful solopreneur using AI as your force multiplier. Covers opportunity identification, risk management, and the mental models that separate thriving solo founders from the rest.',
 items: [
 'Why 2024-2026 is the golden age for solopreneurs',
 'The 80/20 rule of AI-powered business building',
 'How to choose the right business model (SaaS, services, content, or hybrid)',
 'Building in public — the unfair advantage',
 'Setting up your AI-first workflow from day one',
 ],
 },
 {
 id: 'stack',
 icon: <Zap className="w-5 h-5 text-cyan-400" />,
 title: 'Your AI Tool Stack — Every Tool You Need',
 description: 'The curated, battle-tested tool stack that powers successful solopreneurs. No bloat, no hype — just what actually works, organized by function with cost analysis and setup guides.',
 items: [
 'Coding & Development: Cursor, Claude, GitHub Copilot',
 'Content & Writing: ChatGPT, Claude, Jasper',
 'Design & Visuals: Canva AI, Midjourney, Runway',
 'Research & Data: Perplexity, Gemini, Exa',
 'Marketing & Growth: Semrush, SurferSEO, Intercom AI',
 'Finance & Admin: Gemini, Notion AI, ChatGPT',
 'Customer Support: Intercom Fin, DeepL, Zendesk AI',
 'Full cost breakdown — get a complete stack for under $200/mo',
 ],
 },
 {
 id: 'idea-to-mvp',
 icon: <Rocket className="w-5 h-5 text-fuchsia-400" />,
 title: 'Idea to MVP in 72 Hours',
 description: 'The exact step-by-step process for taking a raw idea and shipping a working MVP in under a week using AI agents. Used by solopreneurs who have shipped 20+ products.',
 items: [
 'Phase 1 — Strategic Planning with ChatGPT o3 (2 hours)',
 'Phase 2 — Product Ownership & Spec Writing with Claude (1 hour)',
 'Phase 3 — Market Research with Perplexity (1 hour)',
 'Phase 4 — Architecture Design with Claude (2 hours)',
 'Phase 5 — Vibe Coding with Cursor + Claude (24-48 hours)',
 'Phase 6 — Code Review with Claude (1 hour)',
 'Phase 7 — Testing with ChatGPT + Devin (2 hours)',
 'Phase 8 — Deployment with Vercel / Railway (1 hour)',
 ],
 },
 {
 id: 'content',
 icon: <FileText className="w-5 h-5 text-emerald-400" />,
 title: 'Content Engine — Generate Traffic on Autopilot',
 description: 'Build a content production system that generates blog posts, social media, email newsletters, and video content without requiring hours of manual work each day.',
 items: [
 'Setting up your content strategy with ChatGPT',
 'The 3-2-1 content framework: 3 pillars, 2 formats, 1 core message',
 'AI-powered SEO research and keyword targeting',
 'Batch content production — 30 days of content in one session',
 'Repurposing: one long-form piece into 20+ social media posts',
 'Email newsletter automation with AI-generated digests',
 'Building a content calendar that your AI tools can execute',
 ],
 },
 {
 id: 'marketing',
 icon: <TrendingUp className="w-5 h-5 text-amber-400" />,
 title: 'Marketing & Growth — Acquire Users Without a Budget',
 description: 'Growth strategies specifically designed for solopreneurs with limited budgets. Learn how to leverage AI for SEO, social media, email marketing, and paid ads with minimal spend.',
 items: [
 'AI-powered SEO: from keyword research to content optimization',
 'Social media growth with AI-generated content and scheduling',
 'Email marketing automation that converts',
 'Building an audience on X, LinkedIn, and YouTube with AI',
 'Paid ads on a shoestring budget',
 'Referral and viral loops designed with AI assistance',
 'Measuring what matters: KPI dashboards with AI analytics',
 ],
 },
 {
 id: 'monetize',
 icon: <DollarSign className="w-5 h-5 text-green-400" />,
 title: 'Monetization — 7 Revenue Streams for Solopreneurs',
 description: 'Diversified revenue strategies that turn your AI-powered business into a sustainable income machine. From product sales to services to content monetization.',
 items: [
 'SaaS subscription: build and launch your own product',
 'Digital products: templates, courses, and toolkits',
 'Services: consulting, coaching, and done-for-you',
 'Content monetization: newsletter, YouTube, and affiliates',
 'Marketplace and platform income',
 'Strategic partnerships and joint ventures',
 'How to combine 3-4 streams for stable, growing income',
 ],
 },
 {
 id: 'automation',
 icon: <Zap className="w-5 h-5 text-sky-400" />,
 title: 'Automation & Operations — Run Your Business on Autopilot',
 description: 'Set up automated systems for customer support, billing, onboarding, reporting, and day-to-day operations using AI agents and no-code tools.',
 items: [
 'AI customer support that handles 80%+ of tickets',
 'Automated billing, invoicing, and financial tracking',
 'Customer onboarding sequences with AI personalization',
 'Automated reporting and KPI dashboards',
 'Social media scheduling and content distribution',
 'Email automation sequences for nurture and upsells',
 'The set and forget operations framework',
 ],
 },
 {
 id: 'scaling',
 icon: <BarChart3 className="w-5 h-5 text-rose-400" />,
 title: 'Scaling Beyond $10K/Mo',
 description: 'What to do when you hit the $10K/month milestone. Systems, team building, and strategies for breaking through plateaus without burning out.',
 items: [
 'When to hire your first AI-augmented team member',
 'Systems that scale: documentation, SOPs, and delegation',
 'From solopreneur to small team: the transition playbook',
 'International expansion with AI translation and localization',
 'Advanced AI agent orchestration for complex workflows',
 'Maintaining quality and brand voice as you scale',
 'Avoiding the solopreneur burnout trap',
 ],
 },
];

// ─── What is Included ───────────────────────────────────────

const includedItems = [
 { icon: BookOpen, text: '8 comprehensive chapters', subtext: '50+ pages of actionable content' },
 { icon: FileText, text: 'Ready-to-use prompt library', subtext: '50+ copy-paste AI prompts' },
 { icon: Zap, text: 'Tool stack comparison matrix', subtext: '20+ tools compared by cost and features' },
 { icon: TrendingUp, text: 'Growth checklists and templates', subtext: 'SEO, content, email, and marketing' },
 { icon: DollarSign, text: 'Revenue strategy worksheets', subtext: '7 monetization models with calculators' },
 { icon: Rocket, text: 'MVP shipping playbook', subtext: 'Step-by-step from idea to deployed product' },
];

const whoItsFor = [
 { icon: Users, text: 'Aspiring solopreneurs', subtext: 'Ready to build your first AI-powered business' },
 { icon: Target, text: 'Side hustlers', subtext: 'Looking to scale from side project to full-time income' },
 { icon: Star, text: 'Experienced founders', subtext: 'Wanting to leverage AI for 10x efficiency gains' },
 { icon: Lightbulb, text: 'Agency owners', subtext: 'Transitioning to product-based revenue models' },
];

const whatYoullLearn = [
 { icon: Brain, text: 'Think like an AI-first founder', subtext: 'Mental models and decision frameworks' },
 { icon: Rocket, text: 'Ship products in days, not months', subtext: 'Full-stack AI development pipeline' },
 { icon: TrendingUp, text: 'Grow without ad spend', subtext: 'Organic growth and viral strategies' },
 { icon: DollarSign, text: 'Monetize with multiple streams', subtext: 'Products, services, and passive income' },
];

// ─── Social Proof Stats ────────────────────────────────────

const socialProofStats = [
 { icon: Users, value: '20+', label: 'Products launched in 2026', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
 { icon: TrendingUp, value: '$0 → $7k', label: 'MRR built solo', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
 { icon: Clock, value: '300+', label: 'Hours saved with AI agents', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
 { icon: Zap, value: '100%', label: 'Tested every prompt myself', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
];

// ─── Testimonials ──────────────────────────────────────────

const testimonials = [
 {
 name: 'Sarah Chen',
 title: 'Freelance Designer',
 quote: 'This playbook saved me months of trial and error. I went from tinkering with AI tools to shipping my first SaaS product in 5 days. The prompt library alone is worth 10x the price.',
 stars: 5,
 },
 {
 name: 'Mike Rodriguez',
 title: 'SaaS Founder',
 quote: 'I was skeptical about another AI guide, but this is different. Every system is battle-tested and actually works. My content engine runs on autopilot now, generating 20+ posts a week with zero manual work.',
 stars: 5,
 },
 {
 name: 'Priya Patel',
 title: 'Content Creator',
 quote: 'The monetization chapter alone paid for itself on day one. I set up two new revenue streams using the frameworks in this book. Essential reading for anyone serious about building with AI.',
 stars: 5,
 },
];

// ─── Bonuses ───────────────────────────────────────────────

const bonuses = [
 { name: 'Notion Dashboard Template', value: '$19', desc: 'Track your business metrics, content pipeline, and revenue goals in one place' },
 { name: '50+ Ready-to-Use Prompts', value: '$15', desc: 'Copy-paste prompts for content, coding, marketing, and strategy' },
 { name: 'Private Community Access', value: '$13', desc: 'Join a network of AI-first solopreneurs sharing wins and strategies' },
];

// ─── FAQ Items ─────────────────────────────────────────────

const faqItems = [
 {
 q: 'Is this a digital download?',
 a: "Yes! The AI Personal Assistant Setup Guide is a digital PDF delivered instantly after purchase. You'll also receive a download link via email so you can access it anytime, anywhere.",
 },
 {
 q: 'Do I need technical skills?',
 a: "Not at all. This playbook is designed for non-technical founders. Every system includes step-by-step instructions, copy-paste prompts, and clear explanations. If you can use a web browser, you can follow this playbook.",
 },
 {
 q: 'Can I get a refund?',
 a: "Absolutely. If the AI Personal Assistant Setup Guide doesn't help you save 10x your investment within 30 days, I'll refund every cent. No questions asked. Just email support and I'll process it immediately.",
 },
 {
 q: 'How often is it updated?',
 a: "The playbook is updated quarterly to reflect the latest AI tools, strategies, and best practices. All updates are free for life — you'll get an email notification whenever a new version is released.",
 },
 {
 q: 'Can I share this with my team?',
 a: "This purchase is for individual use. If you'd like to share with your team or use it for group training, please reach out about our team license options at a discounted rate.",
 },
 {
 q: 'What if I already use AI tools?',
 a: "Even better. This playbook goes beyond basic tool usage — it gives you complete systems, workflows, and strategies to 10x your productivity and revenue. Most experienced AI users discover new approaches and frameworks they hadn't considered.",
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
 body: JSON.stringify({ email, product: 'ai-personal-assistant-setup' }),
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
 <div className="relative max-w-md w-full bg-tech-800 border border-tech-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-neon/10">
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
 <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-neon to-aqua flex items-center justify-center mb-4">
 <FileText className="w-8 h-8 text-white" />
 </div>
 <h3 className="text-xl font-bold text-white mb-1">AI Personal Assistant Setup Guide</h3>
 <p className="text-sm text-tech-200">Complete PDF Playbook</p>
 <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-neon/15 border border-neon/20">
 <DollarSign className="w-4 h-4 text-neon-light" />
 <span className="text-lg font-bold text-white">$7</span>
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
 className="mt-4 text-sm text-neon-light hover:underline"
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
 className="w-full bg-tech-900 border border-tech-500/50 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-tech-300 focus:outline-none focus:border-neon/60 focus:ring-1 focus:ring-neon/20 transition"
 />
 </div>

 <button
 type="submit"
 disabled={loading}
 className="w-full py-3 rounded-xl bg-gradient-to-r from-neon to-aqua text-white font-semibold text-sm hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
 Download PDF — $7
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

function AISolopreneurToolkitInner() {
 const [showCheckout, setShowCheckout] = useState(false);

 return (
 <>
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
 <SeoMetadata title="AI Personal Assistant Setup Guide — Apifeny" description="Set up your own AI personal assistant in under an hour. Covers tool selection, automation setup, scheduling, email management, and task triage with ChatGPT, Claude, and Zapier." />
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
 <li className="text-tech-100 truncate max-w-[200px]">AI Personal Assistant Setup Guide</li>
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
 {/* HERO SECTION */}
 {/* ═══════════════════════════════════════════════════ */}
 <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-500/30 to-violet-500/30 border border-neon/20 mb-8 sm:mb-10">
 <div className="absolute inset-0 bg-tech-grid opacity-30" />
 <div className="absolute top-0 right-0 w-96 h-96 bg-neon/10 rounded-full blur-[120px] pointer-events-none" />
 <div className="absolute bottom-0 left-0 w-64 h-64 bg-aqua/10 rounded-full blur-[100px] pointer-events-none" />

 <div className="relative p-6 sm:p-8 lg:p-10">
 <div className="flex items-center gap-2 mb-3">
 <span className="text-3xl">🧠</span>
 <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">
 Premium
 </span>
 </div>

 <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
 AI Personal Assistant Setup Guide
 </h1>

 <p className="text-sm sm:text-base text-tech-100 max-w-2xl mb-4 leading-relaxed">
 Set up ChatGPT, Notion AI & Zapier to automate scheduling, emails, research, and daily tasks
 From choosing your niche to scaling past $10K/month — this 50+ page PDF
 gives you every system, prompt, and strategy you need.
 </p>

 {/* Key stats */}
 <div className="flex flex-wrap gap-3 mb-4">
 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100 border border-tech-500/30">
 <FileText className="w-3 h-3" />
 50+ pages
 </span>
 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100 border border-tech-500/30">
 <Clock className="w-3 h-3" />
 8 chapters
 </span>
 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100 border border-tech-500/30">
 <Sparkles className="w-3 h-3" />
 50+ prompts
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
 className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neon to-aqua text-white font-semibold text-sm hover:opacity-90 transition hover:-translate-y-0.5 shadow-lg shadow-neon/20"
 >
 <Download className="w-4 h-4" />
 Download PDF — $7
 </button>
 <a
 href="#preview"
 className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-tech-700 border border-tech-500/30 text-tech-100 text-sm font-medium hover:text-white hover:border-neon/30 transition"
 >
 <BookOpen className="w-4 h-4" />
 Preview Contents
 </a>
 </div>

 {/* Trust signals after CTA buttons */}
 <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-tech-200">
 <span className="flex items-center gap-1.5">
 <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
 127+ builders have downloaded this playbook
 </span>
 <span className="flex items-center gap-1.5">
 <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
 30-Day Money-Back Guarantee — save 10x or get refunded
 </span>
 </div>
 </div>
 </div>

 {/* Free Template Section */}
 <section className="mb-8 sm:mb-10">
 <EmailCapture
 templateContent={`You are a personal executive assistant. Help me design my perfect AI-powered daily briefing.

My role: [describe your work]
My priorities this month: [top 3-5 priorities]
My industry: [what do you track?]
My KPIs: [what numbers matter daily?]
My tools: [which apps do I use — email, calendar, CRM, analytics, etc.]

Design a daily briefing system that:
1. Aggregates data from all tools into one view
2. Highlights what changed since yesterday
3. Flags urgent items (emails, deadlines, alerts)
4. Suggests top 3 priorities for today
5. Shows one strategic insight I might miss

Bonus: Write the exact ChatGPT/Claude prompt I should start my day with.`}
 templateTitle="Free Prompt: Your AI Morning Briefing"
 playbookSlug="ai-personal-assistant-setup"
 playbookTitle="AI Personal Assistant Setup"
 gradient="from-sky-500/10 to-violet-500/10"
 />
 </section>

 {/* ═══════════════════════════════════════════════════ */}
 {/* WHAT IS INSIDE */}
 {/* ═══════════════════════════════════════════════════ */}
 <section className="mb-8 sm:mb-10" id="preview">
 <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
 <BookOpen className="w-4 h-4 text-neon-light" />
 What&apos;s Inside
 </h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
 {includedItems.map((item, i) => {
 const Icon = item.icon;
 return (
 <div
 key={i}
 className="flex items-start gap-3 p-4 rounded-xl border border-tech-500/20 bg-tech-700/60 hover:border-neon/20 transition"
 >
 <div className="w-10 h-10 rounded-lg bg-neon/10 flex items-center justify-center shrink-0">
 <Icon className="w-5 h-5 text-neon-light" />
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
 {/* WHO THIS IS FOR */}
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
 {/* WHAT YOU WILL LEARN */}
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
 {/* CHAPTER PREVIEW — 8 Sections */}
 {/* ═══════════════════════════════════════════════════ */}
 <section className="mb-8 sm:mb-10">
 <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
 <SearchIcon className="w-4 h-4 text-amber-400" />
 Chapter Preview
 </h2>
 <p className="text-sm text-tech-200 mb-6">
 Here&apos;s everything covered in the AI Personal Assistant Setup Guide. Each chapter is
 packed with actionable strategies, real examples, and ready-to-use prompts.
 </p>

 <div className="space-y-4">
 {sections.map((section) => (
 <details
 key={section.id}
 className="group rounded-xl border border-tech-500/20 bg-tech-700/50 overflow-hidden transition hover:border-neon/20"
 >
 <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
 <div className="flex items-center gap-3 min-w-0">
 <div className="w-10 h-10 rounded-lg bg-tech-600 flex items-center justify-center shrink-0">
 {section.icon}
 </div>
 <div className="min-w-0">
 <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-neon-light transition">
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
 {/* SOCIAL PROOF / BUILD IN PUBLIC */}
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
 Every strategy in this playbook is battle-tested. I used it to build and ship products myself.
 </p>
 </div>
 </section>

 {/* ═══════════════════════════════════════════════════ */}
 {/* TESTIMONIALS */}
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
 {/* Star rating */}
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
 {/* BONUSES */}
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
 {/* FOMO SECTION */}
 {/* ═══════════════════════════════════════════════════ */}
 <section className="mb-8 sm:mb-10">
 <div className="relative overflow-hidden rounded-2xl border border-tech-500/20 bg-tech-700/60 p-6 sm:p-8 text-center">
 <div className="absolute inset-0 bg-gradient-to-br from-neon/5 via-transparent to-cyan-500/5 pointer-events-none" />
 <div className="relative">
 <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center justify-center gap-2">
 <Clock className="w-5 h-5 text-cyan-400" />
 ⏳ Price Increasing Soon
 </h2>
 <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-4">
 <div className="text-center">
 <div className="text-3xl sm:text-4xl font-bold text-neon-light">$7</div>
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
 Copies sold: 127+
 </span>
 <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs">
 <Clock className="w-3.5 h-3.5" />
 Price increases in: 48 hours
 </span>
 </div>
 <button
 onClick={() => setShowCheckout(true)}
 className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neon to-aqua text-white font-semibold text-sm hover:opacity-90 transition hover:-translate-y-0.5 shadow-lg shadow-neon/20"
 >
 <ShoppingCart className="w-4 h-4" />
 Buy Now at $7 — Price Goes Up Soon
 </button>
 </div>
 </div>
 </section>

 {/* ═══════════════════════════════════════════════════ */}
 {/* FAQ ACCORDION */}
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
 className="group rounded-xl border border-tech-500/20 bg-tech-700/50 overflow-hidden transition hover:border-neon/20"
 >
 <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
 <span className="text-sm sm:text-base font-medium text-white group-hover:text-neon-light transition pr-4">
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
 {/* RISK REVERSAL / GUARANTEE */}
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
 If the AI Personal Assistant Setup Guide doesn&apos;t help you save 10x times your investment
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
 {/* FINAL CTA — PRICE CARD */}
 {/* ═══════════════════════════════════════════════════ */}
 <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-neon/10 border border-neon/20 p-6 sm:p-8 text-center">
 <div className="absolute inset-0 bg-tech-grid opacity-20" />
 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-neon/15 rounded-full blur-[100px] pointer-events-none" />

 <div className="relative">
 <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-neon to-aqua mb-4">
 <FileText className="w-8 h-8 text-white" />
 </div>

 <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
 Ready to Build Your AI-Powered Business?
 </h2>
 <p className="text-sm text-tech-200 max-w-lg mx-auto mb-4">
 Get the complete 50+ page PDF playbook. Every strategy, prompt, and system
 you need to go from idea to profitable solopreneur.
 </p>

 <div className="inline-flex items-center gap-4 px-4 py-2 rounded-xl bg-tech-700/80 border border-tech-500/20 mb-4">
 <div className="text-left">
 <div className="text-2xl font-bold text-white">$7</div>
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
 className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neon to-aqua text-white font-semibold text-sm hover:opacity-90 transition hover:-translate-y-0.5 shadow-lg shadow-neon/20"
 >
 <ShoppingCart className="w-4 h-4" />
 Download PDF — $7
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

export default function AISolopreneurToolkitPage() {
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
 <AISolopreneurToolkitInner />
 </Suspense>
 );
}
