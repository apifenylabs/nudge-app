'use client';

import SeoMetadata from '@/components/SeoMetadata';
import EmailCapture from '@/components/EmailCapture';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import {
 ArrowLeft, Download, CheckCircle, BookOpen, Users, Target, Zap,
 TrendingUp, DollarSign, Star, Clock, Sparkles, Lightbulb,
 ChevronRight, ShoppingCart, Shield, Brain, Search, BarChart3,
 RefreshCw, FileText, Rocket, Globe, Workflow, GitBranch, Layers,
} from 'lucide-react';

const sections = [
 {
 id: 'audit',
 icon: <Search className="w-5 h-5 text-amber-400" />,
 title: 'Workflow Audit & Diagnosis',
 description: 'Systematically audit your workflows using the 3-step framework to find high-ROI automation.',
 items: ['Capture: list every weekly task', 'Categorize: frequency vs cognition matrix', 'Prioritize: ROI scoring formula', 'Automation ROI: (hours saved × hourly rate) - cost'],
 },
 {
 id: 'backbone',
 icon: <GitBranch className="w-5 h-5 text-cyan-400" />,
 title: 'Choose Your Automation Backbone',
 description: 'Zapier vs Make vs n8n — which one for your needs? Build the 5-layer automation stack.',
 items: ['No-code vs low-code vs custom-code comparison', 'Trigger, Process, AI, Action, Log layer design', 'Start with Make ($9/mo), scale to n8n'],
 },
 {
 id: 'content',
 icon: <FileText className="w-5 h-5 text-fuchsia-400" />,
 title: 'AI Content Pipeline',
 description: 'End-to-end content automation: RSS → research → draft → optimize → distribute → analyze.',
 items: ['RSS monitoring for topic discovery', 'AI research and outline generation', 'Draft production with your preferred model', 'Automated SEO optimization', 'Cross-platform distribution'],
 },
 {
 id: 'ops',
 icon: <Zap className="w-5 h-5 text-emerald-400" />,
 title: 'Business Operations Automation',
 description: 'Deploy automation for support, sales, invoicing, project management, and HR.',
 items: ['Customer support auto-triage (saves 15-20 hrs/week)', 'Lead scoring and nurturing pipeline', 'Invoicing and expense tracking', 'Meeting intelligence and notes', 'HR onboarding for micro-teams'],
 },
 {
 id: 'multiagent',
 icon: <Brain className="w-5 h-5 text-violet-400" />,
 title: 'Multi-Agent Systems',
 description: 'Build AI agent teams that collaborate: researcher, writer, reviewer, publisher.',
 items: ['Agent role definition and handoff protocols', 'Shared memory and context between agents', 'Quality assurance workflows', 'Human-in-the-loop review gates'],
 },
 {
 id: 'monitor',
 icon: <BarChart3 className="w-5 h-5 text-rose-400" />,
 title: 'Monitoring & Optimization',
 description: 'Track automation performance with dashboards and AI-driven improvement suggestions.',
 items: ['Automation health dashboards', 'Cost tracking per workflow', 'Error rate monitoring', 'AI-suggested workflow improvements'],
 },
 {
 id: 'scale',
 icon: <Rocket className="w-5 h-5 text-sky-400" />,
 title: 'Scaling from Solo to Team',
 description: 'How to scale your automation stack as you grow from solopreneur to team.',
 items: ['From personal automations to team workflows', 'Permission and access management', 'Template sharing across the org', 'Audit logs and compliance'],
 },
];

const includedItems = [
 { icon: BookOpen, text: '7 comprehensive chapters', subtext: '50+ pages of automation workflows' },
 { icon: FileText, text: 'Ready-to-deploy templates', subtext: 'Copy-paste Zapier/Make/n8n configs' },
 { icon: Zap, text: '7 automation playbooks', subtext: 'Content, support, sales, ops, and more' },
 { icon: TrendingUp, text: 'ROI calculator spreadsheet', subtext: 'Calculate exact time and money saved' },
 { icon: DollarSign, text: 'Tool cost comparison', subtext: 'Best tools at every price point' },
 { icon: Rocket, text: 'Multi-agent system blueprints', subtext: 'AI teams that work 24/7' },
];

const faqItems = [
 { q: 'Do I need to know how to code?', a: 'No. The playbook covers no-code (Zapier/Make), low-code (n8n), and custom-code options. Start with no-code, level up as you grow.' },
 { q: 'Which automation tools does this cover?', a: 'Zapier, Make, n8n, and custom Python/Node.js workflows. You choose your stack.' },
 { q: 'Can I really save 20+ hours a week?', a: 'The average user reports 22 hours saved per week after implementing the first 3 playbooks. Customer support automation alone saves 15-20 hours.' },
 { q: 'How long does setup take?', a: 'First automation takes a weekend. Subsequent ones take hours as you reuse patterns from the playbook.' },
 { q: 'What about maintenance?', a: 'The playbook includes monitoring dashboards and quarterly review templates to keep your automations running smoothly.' },
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
 body: JSON.stringify({ email, product: 'ai-workflow-automation' }),
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
 <div className="relative max-w-md w-full bg-tech-800 border border-tech-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-amber-500/10">
 <button onClick={onBack} className="absolute top-4 right-4 text-tech-300 hover:text-white transition" aria-label="Close">
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
 </button>
 <div className="text-center mb-6">
 <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-4">
 <Zap className="w-8 h-8 text-white" />
 </div>
 <h3 className="text-xl font-bold text-white mb-1">AI Workflow Automation</h3>
 <p className="text-sm text-tech-200">Complete PDF Playbook</p>
 <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/20">
 <DollarSign className="w-4 h-4 text-amber-400" />
 <span className="text-lg font-bold text-white">$9</span>
 <span className="text-xs text-tech-200">one-time</span>
 </div>
 </div>
 <form onSubmit={handlePurchase} className="space-y-4">
 <div>
 <label htmlFor="checkout-email" className="block text-sm font-medium text-tech-200 mb-1">Email address</label>
 <input id="checkout-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required
 className="w-full bg-tech-900 border border-tech-500/50 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-tech-300 focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/20 transition" />
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
 <p className="text-[10px] text-tech-300 text-center">Secure checkout. Instant download.</p>
 </form>
 </div>
 </div>
 );
}

function AiWorkflowAutomationInner() {
 const [showCheckout, setShowCheckout] = useState(false);

 return (
 <>
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
 <SeoMetadata title="AI Workflow Automation Playbook — Save 20+ Hours Per Week" description="Complete guide to building autonomous AI workflows. 7 ready-to-deploy automation playbooks for content, support, sales, and more." />
 <nav aria-label="Breadcrumb" className="mb-4">
 <ol className="flex flex-wrap items-center gap-1.5 text-xs text-tech-300">
 <li><Link href="/" className="hover:text-white transition">Home</Link></li>
 <li className="text-tech-500">/</li>
 <li><Link href="/playbooks" className="hover:text-white transition">Playbooks</Link></li>
 <li className="text-tech-100 truncate max-w-[200px]">AI Workflow Automation</li>
 </ol>
 </nav>
 <Link href="/playbooks" className="inline-flex items-center gap-1.5 text-sm text-tech-200 hover:text-white transition mb-6 group">
 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
 All Playbooks
 </Link>

 {/* Hero */}
 <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/25 via-orange-500/15 to-tech-800 border border-amber-500/20 mb-8 sm:mb-10">
 <div className="absolute inset-0 bg-tech-grid opacity-30" />
 <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
 <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
 <div className="relative p-6 sm:p-8 lg:p-10">
 <div className="flex items-center gap-2 mb-3">
 <span className="text-3xl">⚡</span>
 <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">Premium</span>
 </div>
 <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">Build Autonomous Workflows That Save 20+ Hours Per Week</h1>
 <p className="text-sm sm:text-base text-tech-100 max-w-2xl mb-4 leading-relaxed">
 From no-code connectors to multi-agent systems — this playbook shows you how to audit,
 design, deploy, and scale AI-powered automation. Includes 7 ready-to-deploy automation
 playbooks you can set up this weekend.
 </p>
 <div className="flex flex-wrap gap-3 mb-4">
 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100 border border-tech-500/30"><FileText className="w-3 h-3" /> 50+ pages</span>
 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100 border border-tech-500/30"><BookOpen className="w-3 h-3" /> 7 chapters</span>
 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100 border border-tech-500/30"><Sparkles className="w-3 h-3" /> 7 playbooks</span>
 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100 border border-tech-500/30"><Globe className="w-3 h-3" /> Updated May 2026</span>
 </div>
 <div className="flex flex-wrap items-center gap-3">
 <button onClick={() => setShowCheckout(true)}
 className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold text-sm hover:opacity-90 transition hover:-translate-y-0.5 shadow-lg shadow-amber-500/20">
 <Download className="w-4 h-4" /> Download PDF — $9
 </button>
 <a href="#preview" className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-tech-700 border border-tech-500/30 text-tech-100 text-sm font-medium hover:text-white hover:border-amber-400/30 transition">
 <BookOpen className="w-4 h-4" /> Preview Contents
 </a>
 </div>
 <div className="mt-4 flex flex-wrap gap-3 sm:gap-4 text-xs text-tech-200">
 <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" /> 150+ automation enthusiasts</span>
 <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> 30-Day Money-Back Guarantee</span>
 </div>
 </div>
 </div>

 {/* Free Template */}
 <section className="mb-8 sm:mb-10">
 <EmailCapture
 templateContent={`You are a business automation specialist. Help me audit my weekly workflows and find high-ROI automation opportunities.

My role: [e.g., "solopreneur running an online store"]
Hours I work per week: [X hours]
My hourly rate: [$X]

List every recurring task I probably do (estimate if unsure), then for each task:
1. Task name
2. Hours per week spent
3. Cognitiveness (high/medium/low — how much human judgment is needed)
4. Current tool used (if any)

Then rank them by Automation ROI Score = (hours/week × hourly rate × 4 weeks) / (complexity factor: high=3, medium=1.5, low=1)

Give me the top 10 automation opportunities with estimated tool costs and setup time.`}
 templateTitle="Free Prompt: Audit Your Workflows for Automation ROI"
 playbookSlug="ai-workflow-automation"
 playbookTitle="AI Workflow Automation"
 gradient="from-amber-500/10 to-orange-500/10"
 />
 </section>

 {/* Stats */}
 <section className="mb-8 sm:mb-10">
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
 <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-center">
 <Zap className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
 <div className="text-lg sm:text-xl font-bold text-emerald-400">20+ hrs</div>
 <div className="text-[10px] text-tech-300">Saved per week</div>
 </div>
 <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-4 text-center">
 <DollarSign className="w-5 h-5 text-amber-400 mx-auto mb-1" />
 <div className="text-lg sm:text-xl font-bold text-amber-400">$500-2K/mo</div>
 <div className="text-[10px] text-tech-300">Labor cost saved</div>
 </div>
 <div className="rounded-xl bg-cyan-500/10 border border-cyan-500/20 p-4 text-center">
 <Users className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
 <div className="text-lg sm:text-xl font-bold text-cyan-400">150+</div>
 <div className="text-[10px] text-tech-300">Users</div>
 </div>
 <div className="rounded-xl bg-violet-500/10 border border-violet-500/20 p-4 text-center">
 <TrendingUp className="w-5 h-5 text-violet-400 mx-auto mb-1" />
 <div className="text-lg sm:text-xl font-bold text-violet-400">7</div>
 <div className="text-[10px] text-tech-300">Deployable playbooks</div>
 </div>
 </div>
 </section>

 {/* What's Inside */}
 <section className="mb-8 sm:mb-10" id="preview">
 <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><BookOpen className="w-4 h-4 text-amber-400" /> What&apos;s Inside</h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
 {includedItems.map((item, i) => {
 const Icon = item.icon;
 return (
 <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-tech-500/20 bg-tech-700/60 hover:border-amber-400/20 transition">
 <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0"><Icon className="w-5 h-5 text-amber-400" /></div>
 <div><p className="text-sm font-medium text-white">{item.text}</p><p className="text-xs text-tech-300 mt-0.5">{item.subtext}</p></div>
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
 <details key={section.id} className="group rounded-xl border border-tech-500/20 bg-tech-700/50 overflow-hidden transition hover:border-amber-400/20">
 <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-lg bg-tech-600 flex items-center justify-center">{section.icon}</div>
 <div>
 <span className="text-sm sm:text-base font-medium text-white group-hover:text-amber-400 transition">{section.title}</span>
 <p className="text-xs text-tech-300 mt-0.5">{section.description}</p>
 </div>
 </div>
 <ChevronRight className="w-5 h-5 text-tech-300 shrink-0 transition-transform group-open:rotate-90" />
 </summary>
 <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-tech-500/10 pt-3">
 <ul className="space-y-1.5">
 {section.items.map((item, i) => (
 <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-tech-200">
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
 <details key={i} className="group rounded-xl border border-tech-500/20 bg-tech-700/50 overflow-hidden transition hover:border-amber-400/20">
 <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
 <span className="text-sm sm:text-base font-medium text-white group-hover:text-amber-400 transition pr-4">{faq.q}</span>
 <ChevronRight className="w-5 h-5 text-tech-300 shrink-0 transition-transform group-open:rotate-90" />
 </summary>
 <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-tech-500/10 pt-3">
 <p className="text-xs sm:text-sm text-tech-200 leading-relaxed">{faq.a}</p>
 </div>
 </details>
 ))}
 </div>
 </section>

 {/* Guarantee & CTA */}
 <section className="mb-8 sm:mb-10">
 <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-tech-800 border border-emerald-500/20 p-6 sm:p-8 text-center">
 <Shield className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
 <h2 className="text-lg sm:text-xl font-bold text-white mb-2">100% Risk-Free — 30-Day Guarantee</h2>
 <p className="text-sm text-tech-200 max-w-lg mx-auto mb-4">If you don&apos;t save 20+ hours/week within 30 days, full refund.</p>
 <button onClick={() => setShowCheckout(true)}
 className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold text-sm hover:opacity-90 transition shadow-lg shadow-amber-500/20">
 <ShoppingCart className="w-4 h-4" /> Download PDF — $9
 </button>
 </div>
 </section>
 </div>
 {showCheckout && <CheckoutOverlay onBack={() => setShowCheckout(false)} />}
 </>
 );
}

export default function AiWorkflowAutomationPage() {
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
 <AiWorkflowAutomationInner />
 </Suspense>
 );
}
