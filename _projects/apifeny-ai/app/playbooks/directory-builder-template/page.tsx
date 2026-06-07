'use client';

import SeoMetadata from '@/components/SeoMetadata';
import EmailCapture from '@/components/EmailCapture';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import {
 ArrowLeft, Download, CheckCircle, BookOpen, Users, Target, Zap,
 TrendingUp, DollarSign, Star, Clock, Sparkles, Lightbulb,
 ChevronRight, ShoppingCart, Shield, Brain, Search, BarChart3,
 RefreshCw, FileText, Rocket, Globe, Layout, Layers, ExternalLink,
} from 'lucide-react';

const sections = [
 {
 id: 'niche',
 icon: <Search className="w-5 h-5 text-emerald-400" />,
 title: 'Niche Selection & Validation',
 description: 'Use AI to validate niche demand, affiliate potential, and competition before building.',
 items: ['5-factor niche scoring framework', 'Perplexity + ChatGPT validation workflow', 'Affiliate program research automation', 'Competition gap analysis with AI', 'Traffic and revenue projection model'],
 },
 {
 id: 'architecture',
 icon: <Layers className="w-5 h-5 text-cyan-400" />,
 title: 'Content Architecture & Data Model',
 description: 'Design your directory schema with AI — entities, rankings, and filters.',
 items: ['Entity relationship design with ChatGPT', 'Ranking factor and scoring weight system', 'Filter and search architecture', 'SEO-optimized URL structure', 'Content model for 1000+ listings'],
 },
 {
 id: 'build',
 icon: <Zap className="w-5 h-5 text-violet-400" />,
 title: 'Build with Cursor + Next.js',
 description: 'Scaffold and deploy a complete directory with AI-assisted coding.',
 items: ['Cursor Agent mode for rapid scaffolding', 'Dynamic routes with generateStaticParams', 'Category filtering and faceted search', 'Ranking display with star ratings', 'SEO metadata generation per listing'],
 },
 {
 id: 'ranking',
 icon: <BarChart3 className="w-5 h-5 text-amber-400" />,
 title: 'Cosme-Style Ranking Algorithm',
 description: 'Implement a multi-factor scoring system that drives user engagement.',
 items: ['5-factor scoring: ratings, trending, editorial, saves, recency', 'Weight tuning based on engagement data', 'Flat JSON data for fast page loads', 'Badge and highlight system for top listings'],
 },
 {
 id: 'monetize',
 icon: <DollarSign className="w-5 h-5 text-rose-400" />,
 title: 'Affiliate Monetization Setup',
 description: 'Integrate affiliate links, sponsored listings, and comparison tables.',
 items: ['Contextual affiliate link placement', 'Price comparison tables with affiliate CTAs', 'Sponsored/featured listing tiers', 'Exit-intent discount popups with affiliate links'],
 },
 {
 id: 'seo',
 icon: <Globe className="w-5 h-5 text-sky-400" />,
 title: 'SEO & Content Automation',
 description: 'Automated content generation pipeline that publishes while you sleep.',
 items: ['Sitemap generation script', 'Weekly AI content pipeline (3-5 posts)', 'Internal linking automation', 'Schema.org markup for rich snippets', 'Cross-site network linking'],
 },
 {
 id: 'monitor',
 icon: <RefreshCw className="w-5 h-5 text-fuchsia-400" />,
 title: 'Deploy & Monitor',
 description: 'Deploy to Vercel and set up automated analytics reporting.',
 items: ['Custom domain + Vercel deployment', 'Analytics + Speed Insights setup', 'Search Console + GA4 configuration', 'Weekly AI traffic analysis report'],
 },
];

const includedItems = [
 { icon: BookOpen, text: '8 comprehensive chapters', subtext: 'From niche selection to deployment' },
 { icon: FileText, text: 'AI agent squad prompts', subtext: 'Cursor + ChatGPT + Claude workflows' },
 { icon: Zap, text: '2-week build timeline', subtext: 'Validated with first-time directory builders' },
 { icon: TrendingUp, text: 'Ranking algorithm code', subtext: 'Copy-paste ready scoring system' },
 { icon: DollarSign, text: 'Affiliate setup guide', subtext: 'Booking.com, Klook, Viator, Agoda + more' },
 { icon: Rocket, text: 'Cross-site network playbook', subtext: 'Build a portfolio, not a single site' },
];

const socialProofStats = [
 { icon: TrendingUp, value: '2 weeks', label: 'Build time', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
 { icon: DollarSign, value: '$200-500/mo', label: 'Revenue in 90 days', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
 { icon: Users, value: '100+', label: 'Copies sold', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
 { icon: Zap, value: '$0-20/mo', label: 'Running cost', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
];

const faqItems = [
 { q: 'Do I need to know how to code?', a: 'Basic familiarity with web concepts helps, but the playbook is designed for non-developers. Cursor AI Agent does the heavy lifting — you describe what you want and it builds it.' },
 { q: 'Can I really build in 2 weeks?', a: 'Yes. The playbook includes exact prompts for Cursor to generate your directory. First-time builders complete it in a weekend for a basic directory, 2 weeks for a fully-featured one.' },
 { q: 'What affiliate networks do you cover?', a: 'Booking.com, Klook, Viator, Agoda, Trip.com, GetYourGuide, Skyscanner, Expedia, Amazon Associates, ShareASale, Impact, and CJ Affiliate setup guides.' },
 { q: 'Can I clone this for multiple directories?', a: 'That\'s exactly the point. The template is designed for cloning. Second directory takes 50% less time. Create a portfolio of 10+ directories for exponential traffic.' },
 { q: 'What about hosting costs?', a: 'Vercel free tier handles most directories. You only pay for custom domains ($10-15/yr each) and AI tool subscriptions you already have.' },
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
 body: JSON.stringify({ email, product: 'directory-builder-template' }),
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
 <div className="relative max-w-md w-full bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-emerald-500/10">
 <button onClick={onBack} className="absolute top-4 right-4 text-gray-600 hover:text-white transition" aria-label="Close">
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
 </button>
 <div className="text-center mb-6">
 <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-4">
 <Layout className="w-8 h-8 text-white" />
 </div>
 <h3 className="text-xl font-bold text-white mb-1">Directory Builder Template</h3>
 <p className="text-sm text-gray-700">Complete PDF Playbook</p>
 <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/20">
 <DollarSign className="w-4 h-4 text-emerald-400" />
 <span className="text-lg font-bold text-white">$19</span>
 <span className="text-xs text-gray-700">one-time</span>
 </div>
 </div>
 <form onSubmit={handlePurchase} className="space-y-4">
 <div>
 <label htmlFor="checkout-email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
 <input id="checkout-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required
 className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-400/60 focus:ring-1 focus:ring-emerald-400/20 transition" />
 </div>
 <button type="submit" disabled={loading}
 className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-semibold text-sm hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
 {loading ? (
 <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Processing...</>
 ) : (
 <><Download className="w-4 h-4" /> Download PDF — $19</>
 )}
 </button>
 {error && <p className="text-xs text-red-400 text-center">{error}</p>}
 <p className="text-[10px] text-gray-600 text-center">Secure checkout. Instant download after purchase.</p>
 </form>
 </div>
 </div>
 );
}

function DirectoryBuilderTemplateInner() {
 const [showCheckout, setShowCheckout] = useState(false);

 return (
 <>
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
 <SeoMetadata title="Directory Builder Template — Build a Niche Directory in 2 Weeks with AI" description="Complete blueprint for building, launching, and monetizing a niche directory website using AI tools. Cosme-style rankings, affiliate monetization, SEO automation." />
 <nav aria-label="Breadcrumb" className="mb-4">
 <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-600">
 <li><Link href="/" className="hover:text-white transition">Home</Link></li>
 <li className="text-gray-500">/</li>
 <li><Link href="/playbooks" className="hover:text-white transition">Playbooks</Link></li>
 <li className="text-gray-800 truncate max-w-[200px]">Directory Builder Template</li>
 </ol>
 </nav>
 <Link href="/playbooks" className="inline-flex items-center gap-1.5 text-sm text-gray-700 hover:text-white transition mb-6 group">
 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
 All Playbooks
 </Link>

 {/* Hero */}
 <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/25 via-teal-500/15 to-tech-800 border border-emerald-500/20 mb-8 sm:mb-10">
 <div className="absolute inset-0 bg-gray-50 opacity-30" />
 <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
 <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
 <div className="relative p-6 sm:p-8 lg:p-10">
 <div className="flex items-center gap-2 mb-3">
 <span className="text-3xl">🏗️</span>
 <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Premium</span>
 </div>
 <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">Build a Profitable Niche Directory in 2 Weeks</h1>
 <p className="text-sm sm:text-base text-gray-800 max-w-2xl mb-4 leading-relaxed">
 The complete blueprint for building, launching, and monetizing niche directories with AI.
 From niche selection to affiliate revenue — including Cosme-style ranking algorithms,
 SEO automation, and cross-site network effects. This is the exact system used to
 build 6 directories generating 1000s of pages of content.
 </p>
 <div className="flex flex-wrap gap-3 mb-4">
 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-800 border border-gray-200"><FileText className="w-3 h-3" /> 50+ pages</span>
 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-800 border border-gray-200"><BookOpen className="w-3 h-3" /> 8 chapters</span>
 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-800 border border-gray-200"><Sparkles className="w-3 h-3" /> AI agent prompts</span>
 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-800 border border-gray-200"><Globe className="w-3 h-3" /> Updated May 2026</span>
 </div>
 <div className="flex flex-wrap items-center gap-3">
 <button onClick={() => setShowCheckout(true)}
 className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-semibold text-sm hover:opacity-90 transition hover:-translate-y-0.5 shadow-lg shadow-emerald-500/20">
 <Download className="w-4 h-4" /> Download PDF — $19
 </button>
 <a href="#preview" className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 text-sm font-medium hover:text-white hover:border-emerald-400/30 transition">
 <BookOpen className="w-4 h-4" /> Preview Contents
 </a>
 </div>
 <div className="mt-4 flex flex-wrap gap-3 sm:gap-4 text-xs text-gray-700">
 <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> 100+ directory builders use this template</span>
 <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> 30-Day Money-Back Guarantee</span>
 </div>
 </div>
 </div>

 {/* Free Template */}
 <section className="mb-8 sm:mb-10">
 <EmailCapture
 templateContent={`You are a digital strategy consultant specializing in niche directories. I have an idea for a directory website and need you to validate it.

My directory idea: [describe your niche — e.g., "Best coworking spaces in Bangkok"]
Target audience: [who will visit this site?]
Monetization plan: [affiliate, sponsored listings, ads, all three]

Analyze:
1. Search demand — estimate monthly searches for 10 related keywords
2. Competition — on a scale of 1-10, how saturated is this niche?
3. Affiliate potential — which 3+ affiliate programs exist in this space?
4. Content moat — could I generate 200+ unique listings?
5. Revenue estimate — what's a realistic monthly revenue after 6 months?

Score out of 10 and give me a green/yellow/red light.`}
 templateTitle="Free Prompt: Validate Your Directory Niche Idea"
 playbookSlug="directory-builder-template"
 playbookTitle="Directory Builder Template"
 gradient="from-emerald-500/10 to-teal-500/10"
 />
 </section>

 {/* Social Proof */}
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
 <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><BookOpen className="w-4 h-4 text-emerald-400" /> What&apos;s Inside</h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
 {includedItems.map((item, i) => {
 const Icon = item.icon;
 return (
 <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 bg-gray-50 hover:border-emerald-400/20 transition">
 <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0"><Icon className="w-5 h-5 text-emerald-400" /></div>
 <div><p className="text-sm font-medium text-white">{item.text}</p><p className="text-xs text-gray-600 mt-0.5">{item.subtext}</p></div>
 </div>
 );
 })}
 </div>
 </section>

 {/* Chapter Preview */}
 <section className="mb-8 sm:mb-10">
 <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><BookOpen className="w-4 h-4 text-cyan-400" /> Chapter Preview</h2>
 <div className="space-y-3">
 {sections.map((section) => (
 <details key={section.id} className="group rounded-xl border border-gray-200 bg-white overflow-hidden transition hover:border-emerald-400/20">
 <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">{section.icon}</div>
 <div>
 <span className="text-sm sm:text-base font-medium text-white group-hover:text-emerald-400 transition">{section.title}</span>
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
 <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><Lightbulb className="w-4 h-4 text-cyan-400" /> FAQ</h2>
 <div className="space-y-3">
 {faqItems.map((faq, i) => (
 <details key={i} className="group rounded-xl border border-gray-200 bg-white overflow-hidden transition hover:border-emerald-400/20">
 <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
 <span className="text-sm sm:text-base font-medium text-white group-hover:text-emerald-400 transition pr-4">{faq.q}</span>
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
 <Shield className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
 <h2 className="text-lg sm:text-xl font-bold text-white mb-2">100% Risk-Free — 30-Day Money-Back Guarantee</h2>
 <p className="text-sm text-gray-700 max-w-lg mx-auto mb-4">
 If this template doesn&apos;t help you build and launch a directory within 30 days, I&apos;ll refund every cent.
 </p>
 <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
 <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Instant download</span>
 <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> 30-day guarantee</span>
 <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Free updates</span>
 </div>
 </div>
 </section>

 {/* Final CTA */}
 <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-tech-800 border border-emerald-400/20 p-6 sm:p-8 text-center">
 <div className="absolute inset-0 bg-gray-50 opacity-20" />
 <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 mb-4">
 <Layout className="w-8 h-8 text-white" />
 </div>
 <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Ready to Build Your Directory Empire?</h2>
 <p className="text-sm text-gray-700 max-w-lg mx-auto mb-4">
 Get the complete 50+ page PDF playbook. Every prompt, every setup guide,
 every automation — all you need to build and monetize niche directories with AI.
 </p>
 <div className="inline-flex items-center gap-4 px-4 py-2 rounded-xl bg-white border border-gray-200 mb-4">
 <div className="text-left">
 <div className="text-2xl font-bold text-white">$19</div>
 <div className="text-[10px] text-gray-600">one-time payment</div>
 </div>
 <div className="h-8 w-px border-gray-200" />
 <div className="text-left">
 <div className="text-xs font-medium text-emerald-400">Lifetime access</div>
 <div className="text-[10px] text-gray-600">Free updates</div>
 </div>
 </div>
 <button onClick={() => setShowCheckout(true)}
 className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-semibold text-sm hover:opacity-90 transition hover:-translate-y-0.5 shadow-lg shadow-emerald-500/20">
 <ShoppingCart className="w-4 h-4" /> Download PDF — $19
 </button>
 </section>
 </div>
 {showCheckout && <CheckoutOverlay onBack={() => setShowCheckout(false)} />}
 </>
 );
}

export default function DirectoryBuilderTemplatePage() {
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
 <DirectoryBuilderTemplateInner />
 </Suspense>
 );
}
