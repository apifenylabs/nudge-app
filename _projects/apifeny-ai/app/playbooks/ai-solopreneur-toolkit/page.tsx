'use client';

import SeoMetadata from '@/components/SeoMetadata';
import EmailCapture from '@/components/EmailCapture';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import {
 ArrowLeft, Download, CheckCircle, BookOpen, Users, Target, Zap,
 TrendingUp, DollarSign, Star, Clock, Sparkles, Lightbulb,
 ChevronRight, ShoppingCart, Shield, Brain, MessageSquare, PenTool,
 Search, BarChart3, RefreshCw, FileText, Rocket, Globe, Image,
} from 'lucide-react';

const sections = [
 {
 id: 'support',
 icon: <MessageSquare className="w-5 h-5 text-amber-400" />,
 title: 'Customer Support Automation — Replace $2K/mo Intercom',
 description: 'Build a custom AI support bot using LangChain + OpenAI that handles 85% of tickets automatically for $47/mo.',
 items: [
 'RAG pipeline setup with OpenAI + LangChain',
 'Telegram bot integration for support tickets',
 'Knowledge base structure for AI training',
 'Escalation rules: when to pass to a human',
 'Analytics dashboard for support metrics',
 'One-weekend implementation timeline',
 ],
 },
 {
 id: 'content',
 icon: <PenTool className="w-5 h-5 text-cyan-400" />,
 title: 'Content Factory — Replace $150/mo Writers',
 description: 'Use ChatGPT + Perplexity + Claude to produce 12 blog posts, 120 social media posts, and a weekly newsletter for $20/mo.',
 items: [
 'Exact prompts for blog posts that rank on Google',
 'Social media batch production (LinkedIn, X, Threads)',
 'Newsletter template with AI-powered subject lines',
 'Editorial calendar you can set up in 30 min',
 'SEO optimization checklist for AI-generated content',
 'Content repurposing: one post → 10+ pieces',
 ],
 },
 {
 id: 'design',
 icon: <Image className="w-5 h-5 text-fuchsia-400" />,
 title: 'Design Studio — Replace $200/mo Designers',
 description: 'Generate logos, marketing visuals, product photography, and presentations using Canva AI + Midjourney for $13/mo.',
 items: [
 'Brand kit setup for consistent AI-generated visuals',
 'Prompt library for logos, banners, and social graphics',
 'Product photography with AI background replacement',
 'Presentation decks from text → slides in 5 min',
 'Batch production workflow for marketing materials',
 ],
 },
 {
 id: 'seo',
 icon: <Search className="w-5 h-5 text-emerald-400" />,
 title: 'SEO Engine — Replace $500/mo SEO Agencies',
 description: 'Automated SEO content engine using Perplexity for research, ChatGPT for drafting, and Claude for fact-checking.',
 items: [
 'Keyword research automation with Perplexity',
 'Content cluster strategy that Google loves',
 'Internal linking automation script',
 'AI-powered content gap analysis vs competitors',
 'Publish 3 SEO-optimized posts per week for $0',
 'Track rankings and iterate with AI reports',
 ],
 },
 {
 id: 'finance',
 icon: <BarChart3 className="w-5 h-5 text-rose-400" />,
 title: 'Finance & Analysis — Replace $350/mo Analysts',
 description: 'Financial modeling, document analysis, and automated reporting with Gemini + ChatGPT + Perplexity for $10/mo.',
 items: [
 'AI-powered financial model builder',
 'Document analysis for contracts and 10-Ks',
 'Automated investor update generation',
 'Expense tracking and categorization with AI',
 'Monthly financial dashboard in Google Sheets',
 ],
 },
];

const includedItems = [
 { icon: BookOpen, text: '5 comprehensive chapters', subtext: 'From support setup to financial automation' },
 { icon: FileText, text: '30+ copy-paste AI prompts', subtext: 'Ready to use in ChatGPT, Claude, Gemini' },
 { icon: Zap, text: 'One-weekend setup guide', subtext: 'Timed and tested with a first-time user' },
 { icon: TrendingUp, text: 'ROI calculator spreadsheet', subtext: 'See exactly how much you save per tool' },
 { icon: DollarSign, text: 'Tool comparison matrix', subtext: 'Best AI tools for every use case' },
 { icon: Rocket, text: 'Validation checklists', subtext: 'Test AI outputs before cutting services' },
];

const socialProofStats = [
 { icon: DollarSign, value: '$2,130/mo', label: 'Average savings', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
 { icon: Users, value: '300+', label: 'Solopreneurs using this', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
 { icon: Clock, value: '1 weekend', label: 'Total setup time', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
 { icon: Zap, value: '$70/mo', label: 'Total AI tool cost', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
];

const faqItems = [
 { q: 'Is this a digital download?', a: 'Yes! The AI Solopreneur Toolkit is a digital PDF delivered instantly after purchase. You\'ll also receive a download link via email so you can access it anytime.' },
 { q: 'Do I need technical skills?', a: 'Not at all. This playbook is designed for non-technical solopreneurs. Every section includes step-by-step instructions with screenshots. The most technical thing is copy-pasting prompts.' },
 { q: 'Can I get a refund?', a: 'Absolutely. If this toolkit doesn\'t save you at least $500/mo within 30 days, I\'ll refund every cent. No questions asked.' },
 { q: 'How often is it updated?', a: 'The toolkit is updated quarterly as AI tools and pricing change. All updates are free for life.' },
 { q: 'Which AI tools do I need?', a: 'The toolkit is optimized for ChatGPT ($20/mo), Claude ($20/mo), Perplexity ($20/mo), and Canva AI ($13/mo). Total: $73/mo.' },
 { q: 'Can I share with my team?', a: 'Individual use license. Contact us for team pricing.' },
];

function CheckoutOverlay({ onBack }: { onBack: () => void }) {
 const [email, setEmail] = useState('');
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');

 const handlePurchase = async (e: React.FormEvent) => {
 e.preventDefault();
 if (!email) return;
 setLoading(true);
 setError('');
 try {
 const res = await fetch('/api/create-checkout', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ email, product: 'ai-solopreneur-toolkit' }),
 });
 const data = await res.json();
 if (!res.ok) throw new Error(data.error || 'Failed to create checkout');
 window.location.href = data.url;
 } catch (err) {
 setError(err instanceof Error ? err.message : 'Something went wrong.');
 } finally {
 setLoading(false);
 }
 };

 return (
 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
 <div className="relative max-w-md w-full bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-amber-500/10">
 <button onClick={onBack} className="absolute top-4 right-4 text-gray-600 hover:text-white transition" aria-label="Close">
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
 </button>
 <div className="text-center mb-6">
 <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-4">
 <DollarSign className="w-8 h-8 text-white" />
 </div>
 <h3 className="text-xl font-bold text-gray-900 mb-1">AI Solopreneur Toolkit</h3>
 <p className="text-sm text-gray-700">Complete PDF Playbook</p>
 <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/20">
 <DollarSign className="w-4 h-4 text-amber-400" />
 <span className="text-lg font-bold text-gray-900">$9</span>
 <span className="text-xs text-gray-700">one-time</span>
 </div>
 </div>
 <form onSubmit={handlePurchase} className="space-y-4">
 <div>
 <label htmlFor="checkout-email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
 <input id="checkout-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required
 className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/20 transition" />
 </div>
 <button type="submit" disabled={loading}
 className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold text-sm hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
 {loading ? (
 <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Processing...</>
 ) : (
 <><Download className="w-4 h-4" /> Download PDF — $9</>
 )}
 </button>
 {error && <p className="text-xs text-red-400 text-center">{error}</p>}
 <p className="text-[10px] text-gray-600 text-center">Secure checkout. Instant download after purchase.</p>
 </form>
 </div>
 </div>
 );
}

function AiSolopreneurToolkitInner() {
 const [showCheckout, setShowCheckout] = useState(false);

 return (
 <>
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
 <SeoMetadata title="AI Solopreneur Toolkit — Replace $2,200/mo in Services for $70/mo" description="Step-by-step PDF playbook showing solopreneurs how to replace $2,200/month in services with $70/month in AI tools." />
 <nav aria-label="Breadcrumb" className="mb-4">
 <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-600">
 <li><Link href="/" className="hover:text-white transition">Home</Link></li>
 <li className="text-gray-500">/</li>
 <li><Link href="/playbooks" className="hover:text-white transition">Playbooks</Link></li>
 <li className="text-gray-800 truncate max-w-[200px]">AI Solopreneur Toolkit</li>
 </ol>
 </nav>
 <Link href="/playbooks" className="inline-flex items-center gap-1.5 text-sm text-gray-700 hover:text-white transition mb-6 group">
 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
 All Playbooks
 </Link>

 {/* Hero */}
 <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/25 via-orange-500/15 to-tech-800 border border-amber-500/20 mb-8 sm:mb-10">
 <div className="absolute inset-0 bg-gray-50 opacity-30" />
 <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
 <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
 <div className="relative p-6 sm:p-8 lg:p-10">
 <div className="flex items-center gap-2 mb-3">
 <span className="text-3xl">📦</span>
 <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-100 text-amber-700 border-amber-200 border border-amber-500/30">Premium</span>
 </div>
 <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
 Spend $70/mo on AI to Replace $2,200/mo in Services
 </h1>
 <p className="text-sm sm:text-base text-gray-800 max-w-2xl mb-4 leading-relaxed">
 Most solopreneurs burn $2,200+/month on agencies, freelancers, and SaaS tools.
 This playbook shows you exactly how to replace 5 services with AI — for $70/month.
 Complete with step-by-step setups, exact prompts, and ROI calculators.
 </p>
 <div className="flex flex-wrap gap-3 mb-4">
 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-800 border border-gray-200"><FileText className="w-3 h-3" /> 40+ pages</span>
 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-800 border border-gray-200"><PenTool className="w-3 h-3" /> 5 chapters</span>
 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-800 border border-gray-200"><Sparkles className="w-3 h-3" /> 30+ prompts</span>
 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-800 border border-gray-200"><Globe className="w-3 h-3" /> Updated May 2026</span>
 </div>
 <div className="flex flex-wrap items-center gap-3">
 <button onClick={() => setShowCheckout(true)}
 className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold text-sm hover:opacity-90 transition hover:-translate-y-0.5 shadow-lg shadow-amber-500/20">
 <Download className="w-4 h-4" /> Download PDF — $9
 </button>
 <a href="#preview" className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 text-sm font-medium hover:text-white hover:border-amber-400/30 transition">
 <BookOpen className="w-4 h-4" /> Preview Contents
 </a>
 </div>
 <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-gray-700">
 <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" /> 300+ solopreneurs have downloaded this</span>
 <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> 30-Day Money-Back Guarantee</span>
 </div>
 </div>
 </div>

 {/* Free Template Section */}
 <section className="mb-8 sm:mb-10">
 <EmailCapture
 templateContent={`You are an expert customer support bot builder. Help me design a support automation system for my business.

My business: [describe your business — e.g., "SaaS tool for freelancers"]
My top 5 support questions:
1. [question]
2. [question]
3. [question]
4. [question]
5. [question]

Please give me:
1. A knowledge base structure — what docs/FAQs I need to prepare
2. A RAG pipeline setup — which tools to connect (OpenAI + LangChain + Telegram)
3. Response templates for each of my top 5 questions
4. An escalation rule — when should the AI pass to a human?
5. A 3-hour weekend implementation timeline`}
 templateTitle="Free Prompt: Build Your AI Customer Support Bot"
 playbookSlug="ai-solopreneur-toolkit"
 playbookTitle="AI Solopreneur Toolkit"
 gradient="from-amber-500/10 to-orange-500/10"
 />
 </section>

 {/* Social Proof Stats */}
 <section className="mb-8 sm:mb-10">
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
 {socialProofStats.map((stat, i) => (
 <div key={i} className={`rounded-xl ${stat.bg} border ${stat.border} p-4 text-center`}>
 <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-1`} />
 <div className={`text-lg sm:text-xl font-bold ${stat.color}`}>{stat.value}</div>
 <div className="text-[10px] text-gray-600">{stat.label}</div>
 </div>
 ))}
 </div>
 </section>

 {/* What's Inside */}
 <section className="mb-8 sm:mb-10" id="preview">
 <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><BookOpen className="w-4 h-4 text-amber-400" /> What&apos;s Inside</h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
 {includedItems.map((item, i) => {
 const Icon = item.icon;
 return (
 <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 bg-gray-50 hover:border-amber-400/20 transition">
 <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0"><Icon className="w-5 h-5 text-amber-400" /></div>
 <div><p className="text-sm font-medium text-white">{item.text}</p><p className="text-xs text-gray-600 mt-0.5">{item.subtext}</p></div>
 </div>
 );
 })}
 </div>
 </section>

 {/* The $2,200 Breakdown */}
 <section className="mb-8 sm:mb-10">
 <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/10 via-amber-500/10 to-tech-800 border border-amber-500/20 p-6 sm:p-8">
 <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 text-center">The $2,200/mo You&apos;re Burning — Replaced by $70/mo AI</h2>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
 <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
 <div className="text-lg font-bold text-red-400">$2,000/mo</div>
 <div className="text-xs text-gray-700">Intercom Customer Support → <span className="text-emerald-400">$47/mo AI bot</span></div>
 </div>
 <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
 <div className="text-lg font-bold text-red-400">$150/mo</div>
 <div className="text-xs text-gray-700">Content Writers → <span className="text-emerald-400">$20/mo AI</span></div>
 </div>
 <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
 <div className="text-lg font-bold text-red-400">$200/mo</div>
 <div className="text-xs text-gray-700">Designers → <span className="text-emerald-400">$13/mo AI</span></div>
 </div>
 <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
 <div className="text-lg font-bold text-red-400">$500/mo</div>
 <div className="text-xs text-gray-700">SEO Agency → <span className="text-emerald-400">$0 AI (free tools)</span></div>
 </div>
 <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
 <div className="text-lg font-bold text-red-400">$350/mo</div>
 <div className="text-xs text-gray-700">Analysts → <span className="text-emerald-400">$10/mo AI</span></div>
 </div>
 <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col items-center justify-center">
 <div className="text-2xl font-bold text-emerald-400">$2,130/mo</div>
 <div className="text-xs text-gray-700">Total savings</div>
 <div className="text-[10px] text-gray-600">$70/mo AI cost - $2,200/mo services</div>
 </div>
 </div>
 </div>
 </section>

 {/* Chapter Sections */}
 <section className="mb-8 sm:mb-10">
 <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><BookOpen className="w-4 h-4 text-cyan-400" /> Chapter Preview</h2>
 <div className="space-y-3">
 {sections.map((section) => (
 <details key={section.id} className="group rounded-xl border border-gray-200 bg-white overflow-hidden transition hover:border-amber-400/20">
 <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">{section.icon}</div>
 <div>
 <span className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-amber-400 transition">{section.title}</span>
 <p className="text-xs text-gray-600 mt-0.5">{section.description}</p>
 </div>
 </div>
 <ChevronRight className="w-5 h-5 text-gray-600 shrink-0 transition-transform group-open:rotate-90" />
 </summary>
 <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-gray-200 pt-3">
 <ul className="space-y-1.5">
 {section.items.map((item, i) => (
 <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
 <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
 {item}
 </li>
 ))}
 </ul>
 </div>
 </details>
 ))}
 </div>
 </section>

 {/* FAQ */}
 <section className="mb-8 sm:mb-10">
 <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Lightbulb className="w-4 h-4 text-cyan-400" /> FAQ</h2>
 <div className="space-y-3">
 {faqItems.map((faq, i) => (
 <details key={i} className="group rounded-xl border border-gray-200 bg-white overflow-hidden transition hover:border-amber-400/20">
 <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
 <span className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-amber-400 transition pr-4">{faq.q}</span>
 <ChevronRight className="w-5 h-5 text-gray-600 shrink-0 transition-transform group-open:rotate-90" />
 </summary>
 <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-gray-200 pt-3">
 <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{faq.a}</p>
 </div>
 </details>
 ))}
 </div>
 </section>

 {/* Guarantee */}
 <section className="mb-8 sm:mb-10">
 <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-tech-800 border border-emerald-500/20 p-6 sm:p-8 text-center">
 <div className="absolute inset-0 bg-gray-50 opacity-20" />
 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />
 <div className="relative">
 <Shield className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
 <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">100% Risk-Free — 30-Day Money-Back Guarantee</h2>
 <p className="text-sm text-gray-700 max-w-lg mx-auto mb-4">
 If this toolkit doesn&apos;t save you at least $500/mo within 30 days, I&apos;ll refund every cent.
 You keep the playbook and all prompts even if you ask for a refund.
 </p>
 <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
 <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Instant download</span>
 <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> 30-day guarantee</span>
 <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Free updates</span>
 </div>
 </div>
 </div>
 </section>

 {/* Final CTA */}
 <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-tech-800 border border-amber-400/20 p-6 sm:p-8 text-center">
 <div className="absolute inset-0 bg-gray-50 opacity-20" />
 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/15 rounded-full blur-[100px] pointer-events-none" />
 <div className="relative">
 <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 mb-4">
 <DollarSign className="w-8 h-8 text-white" />
 </div>
 <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Ready to Save $2,130/mo?</h2>
 <p className="text-sm text-gray-700 max-w-lg mx-auto mb-4">
 Get the complete 40+ page PDF playbook. Every prompt, setup guide, and
 ROI calculator you need to replace $2,200/mo in services with $70/mo in AI.
 </p>
 <div className="inline-flex items-center gap-4 px-4 py-2 rounded-xl bg-white border border-gray-200 mb-4">
 <div className="text-left">
 <div className="text-2xl font-bold text-gray-900">$9</div>
 <div className="text-[10px] text-gray-600">one-time payment</div>
 </div>
 <div className="h-8 w-px border-gray-200" />
 <div className="text-left">
 <div className="text-xs font-medium text-emerald-400">Lifetime access</div>
 <div className="text-[10px] text-gray-600">Free updates</div>
 </div>
 </div>
 <button onClick={() => setShowCheckout(true)}
 className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold text-sm hover:opacity-90 transition hover:-translate-y-0.5 shadow-lg shadow-amber-500/20">
 <ShoppingCart className="w-4 h-4" /> Download PDF — $9
 </button>
 </div>
 </section>
 </div>
 {showCheckout && <CheckoutOverlay onBack={() => setShowCheckout(false)} />}
 </>
 );
}

export default function AISolopreneurToolkitPage() {
 return (
 <Suspense fallback={
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
 <div className="animate-pulse space-y-4">
 <div className="h-4 bg-white rounded w-1/4" />
 <div className="h-8 bg-white rounded w-3/4" />
 <div className="h-64 bg-white rounded" />
 </div>
 </div>
 }>
 <AiSolopreneurToolkitInner />
 </Suspense>
 );
}
