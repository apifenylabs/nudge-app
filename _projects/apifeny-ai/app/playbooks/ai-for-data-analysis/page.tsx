'use client';

import SeoMetadata from '@/components/SeoMetadata';
import EmailCapture from '@/components/EmailCapture';
import { useState, Suspense } from 'react';
import Link from 'next/link';

import {
 ArrowLeft, Download, CheckCircle, BookOpen, Users, Target, Zap, TrendingUp,
 DollarSign, Star, Clock, Sparkles, Lightbulb, ChevronRight, ShoppingCart,
 FileText, Rocket, Search as SearchIcon, Shield, BarChart3, Globe, LineChart,
 Database, Activity, Table2, GitBranch, Layers,
} from 'lucide-react';

interface Section { id: string; icon: React.ReactNode; title: string; description: string; items: string[]; }

const sections: Section[] = [
 { id: 's1', icon: <Database className="w-5 h-5 text-indigo-400" />, title: 'Clean and Prepare Data with ChatGPT', description: 'Upload your CSV into ChatGPT with Code Interpreter to detect and fix formatting issues, identify outliers, fill missing values, and remove duplicates.', items: [
 'Upload CSVs directly to ChatGPT Code Interpreter for automated cleaning',
 'Detect formatting issues, outliers, and missing values',
 'Standardize column names and remove duplicates',
 ]},
 { id: 's2', icon: <Activity className="w-5 h-5 text-violet-400" />, title: 'Run Exploratory Analysis with Gemini', description: "Leverage Gemini's 1M context to process entire datasets at once for distribution analysis, correlation matrices, trend identification, and summary stats.", items: [
 "Leverage Gemini's 1M context for full-dataset analysis",
 'Distribution analysis, correlation matrices, and trend identification',
 'Identify top 5 insights a business leader should know',
 ]},
 { id: 's3', icon: <BarChart3 className="w-5 h-5 text-sky-400" />, title: 'Build Interactive Dashboards with AI', description: 'Describe your data and metrics. Ask ChatGPT to generate Python code for a Streamlit dashboard, Google Sheets formulas, or Excel dashboards.', items: [
 'Generate Streamlit dashboard Python code from data description',
 'Create Google Sheets formulas for live updating dashboards',
 'Specify KPIs, filters, chart types, and update frequency',
 ]},
 { id: 's4', icon: <Table2 className="w-5 h-5 text-emerald-400" />, title: 'Statistical Analysis with Claude', description: 'Claude excels at rigorous statistical analysis with A/B test evaluation, hypothesis testing, confidence intervals, and regression analysis.', items: [
 'Upload data for hypothesis testing and confidence intervals',
 'Run regression analysis with methodology explanations',
 'A/B test evaluation: conversion rates per variant, p-value',
 ]},
 { id: 's5', icon: <FileText className="w-5 h-5 text-amber-400" />, title: 'Generate Narrative Insights with ChatGPT', description: 'Feed ChatGPT cleaned data and analysis results for executive summaries, key findings, actionable recommendations, and presentation-ready charts.', items: [
 'Executive summary generation from raw analysis output',
 'Key findings with data-driven storytelling narrative',
 'Actionable recommendations tied to business outcomes',
 ]},
 { id: 's6', icon: <GitBranch className="w-5 h-5 text-cyan-400" />, title: 'Automate Recurring Reports with Notion AI', description: 'Set up a Notion database connected to data sources to generate weekly summary reports, highlight changes, flag anomalies, and create action items.', items: [
 'Connect Notion database to recurring data sources',
 'Generate weekly summary reports automatically',
 'Highlight period-over-period changes and trends',
 ]},
 { id: 's7', icon: <Layers className="w-5 h-5 text-fuchsia-400" />, title: 'Build the Complete Data Pipeline', description: 'Create a prompt chain: Clean, Analyze, Visualize, Report for a complete data analysis pipeline from raw data to executive insights.', items: [
 'Clean \u2192 Analyze \u2192 Visualize \u2192 Report pipeline architecture',
 'Each step outputs structured data for the next step',
 'Template prompts for common analyses (cohort, funnel, RFM)',
 ]},
];

const includedItems = [
 { icon: BookOpen, text: '7 comprehensive chapters', subtext: '40+ pages of actionable content' },
 { icon: FileText, text: 'Ready-to-use prompt library', subtext: '30+ copy-paste data analysis prompts' },
 { icon: Zap, text: 'Dataset cleaning checklist', subtext: 'CSV, Excel, and database formats' },
 { icon: TrendingUp, text: 'Dashboard templates', subtext: 'Streamlit, Sheets, and Excel' },
 { icon: DollarSign, text: 'Cost comparison matrix', subtext: 'AI tools vs. $5K/mo analyst' },
 { icon: Rocket, text: 'A/B test evaluation toolkit', subtext: 'Hypothesis testing and significance' },
];
const whoItsFor = [
 { icon: Users, text: 'Data analysts', subtext: 'Wanting to 10x analysis speed with AI' },
 { icon: Target, text: 'Business owners', subtext: 'Making data-driven decisions faster' },
 { icon: Star, text: 'Product managers', subtext: 'Building insights into product strategy' },
 { icon: Lightbulb, text: 'Excel power users', subtext: 'Leveling up to AI-powered analytics' },
];
const whatYoullLearn = [
 { icon: Database, text: 'Clean messy data fast', subtext: 'Automated formatting and outlier detection' },
 { icon: LineChart, text: 'Build dashboards instantly', subtext: 'Streamlit, Sheets, and Excel' },
 { icon: TrendingUp, text: 'Run statistical tests', subtext: 'A/B testing and regression analysis' },
 { icon: DollarSign, text: 'Automate weekly reports', subtext: 'Notion AI and scheduled analysis' },
];
const socialProofStats = [
 { icon: Users, value: '500+', label: 'Analysts using AI workflows', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
 { icon: TrendingUp, value: '10x', label: 'Faster analysis speed', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
 { icon: Clock, value: '80%', label: 'Faster report generation', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
 { icon: Zap, value: '100%', label: 'Tested every prompt', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
];
const testimonials = [
 { name: 'James Liu', title: 'Data Analyst', stars: 5, quote: 'This playbook cut my analysis time by 80%. I used to spend 5 hours cleaning data and running stats \u2014 now it takes under an hour.' },
 { name: 'Aisha Kone', title: 'Product Manager', stars: 5, quote: 'I built my first Streamlit dashboard in 30 minutes. The templates saved me a week of work.' },
 { name: 'David Chen', title: 'Startup Founder', stars: 5, quote: 'The A/B test evaluation toolkit alone paid for itself. It showed me how to calculate significance correctly.' },
];
const bonuses = [
 { name: 'Prompt Library (30+ Prompts)', value: '$15', desc: 'Copy-paste prompts for cleaning, analysis, visualization, and reporting' },
 { name: 'Streamlit Dashboard Template', value: '$19', desc: 'Ready-to-deploy dashboard code with KPIs, filters, and charts' },
 { name: 'A/B Test Calculator', value: '$12', desc: 'Interactive calculator for significance testing and sample sizing' },
];
const faqItems = [
 { q: 'Is this a digital download?', a: "Yes! The AI for Data Analysis playbook is a digital PDF delivered instantly. You'll also receive a download link via email." },
 { q: 'What level of data experience do I need?', a: 'Intermediate. You should be comfortable with spreadsheets. The AI handles the heavy lifting.' },
 { q: 'Can I get a refund?', a: "Absolutely. If it doesn't save you 10x your investment within 30 days, I'll refund every cent." },
 { q: 'What tools do I need?', a: "ChatGPT Plus, Gemini, Claude, and Notion AI. Most can be done with ChatGPT alone. Under $100/mo total." },
];

function CheckoutOverlay({ onBack }: { onBack: () => void }) {
 const [email, setEmail] = useState('');
 const [loading, setLoading] = useState(false);
 const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
 const [message, setMessage] = useState('');
 const handlePurchase = async (e: React.FormEvent) => {
 e.preventDefault(); if (!email) return; setLoading(true); setStatus('idle');
 try {
 const res = await fetch('/api/create-checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, product: 'ai-for-data-analysis' }) });
 const data = await res.json(); if (!res.ok) throw new Error(data.error || 'Failed');
 window.location.href = data.url;
 } catch (err) { setStatus('error'); setMessage(err instanceof Error ? err.message : 'Something went wrong.'); } finally { setLoading(false); }
 };
 return (
 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
 <div className="relative max-w-md w-full bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-neon/10">
 <button onClick={onBack} className="absolute top-4 right-4 text-gray-600 hover:text-white transition" aria-label="Close">
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
 </button>
 <div className="text-center mb-6">
 <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-neon to-aqua flex items-center justify-center mb-4"><FileText className="w-8 h-8 text-white" /></div>
 <h3 className="text-xl font-bold text-gray-900 mb-1">AI for Data Analysis</h3>
 <p className="text-sm text-gray-700">Complete PDF Playbook</p>
 <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-neon/15 border border-neon/20">
 <DollarSign className="w-4 h-4 text-neon-light" /><span className="text-lg font-bold text-gray-900">$9</span><span className="text-xs text-gray-700">one-time</span>
 </div>
 </div>
 {status === 'success' ? (
 <div className="text-center py-6">
 <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-4"><CheckCircle className="w-8 h-8 text-emerald-400" /></div>
 <p className="text-white font-medium mb-1">{message}</p>
 <button onClick={onBack} className="mt-4 text-sm text-neon-light hover:underline">Back</button>
 </div>
 ) : (
 <form onSubmit={handlePurchase} className="space-y-4">
 <div>
 <label htmlFor="ce" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
 <input id="ce" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required
 className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-neon/60 focus:ring-1 focus:ring-neon/20 transition" />
 </div>
 <button type="submit" disabled={loading}
 className="w-full py-3 rounded-xl bg-gradient-to-r from-neon to-aqua text-white font-semibold text-sm hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
 {loading ? <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Processing...</> : <><Download className="w-4 h-4" /> Download PDF \u2014 $9</>}
 </button>
 {status === 'error' && <p className="text-xs text-red-400 text-center">{message}</p>}
 <p className="text-[10px] text-gray-600 text-center">Secure checkout. Instant download.</p>
 </form>
 )}
 </div>
 </div>
 );
}

function AIForDataAnalysisInner() {
 const [showCheckout, setShowCheckout] = useState(false);
 return (
 <>
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
 <SeoMetadata title="AI for Data Analysis \u2014 Apifeny" description="Analyze data faster with AI: clean datasets, build dashboards, run statistics, and automate reports with ChatGPT, Gemini, and Claude." />
 <nav aria-label="Breadcrumb" className="mb-4">
 <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-600">
 <li><Link href="/" className="hover:text-white transition">Home</Link></li>
 <li className="text-gray-500">/</li>
 <li><Link href="/playbooks" className="hover:text-white transition">Playbooks</Link></li>
 <li className="text-gray-800 truncate max-w-[200px]">AI for Data Analysis</li>
 </ol>
 </nav>
 <Link href="/playbooks" className="inline-flex items-center gap-1.5 text-sm text-gray-700 hover:text-white transition mb-6 group"><ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" /> All Playbooks</Link>

 <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500/25 via-violet-500/15 to-tech-800 border border-indigo-500/20 mb-8 sm:mb-10">
 <div className="absolute inset-0 bg-gray-50 opacity-30" />
 <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
 <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />
 <div className="relative p-6 sm:p-8 lg:p-10">
 <div className="flex items-center gap-2 mb-3">
 <span className="text-3xl">📊</span>
 <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-100 text-amber-700 border-amber-200 border border-amber-500/30">Premium</span>
 </div>
 <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">AI for Data Analysis: Spreadsheets to Insights</h1>
 <p className="text-sm sm:text-base text-gray-800 max-w-2xl mb-4 leading-relaxed">Analyze data faster with AI. From cleaning messy datasets to building interactive dashboards and running statistical tests \u2014 this 40+ page PDF shows you how to combine ChatGPT, Gemini, and Claude for a complete AI-powered analysis pipeline.</p>
 <div className="flex flex-wrap gap-3 mb-4">
 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-800 border border-gray-200"><FileText className="w-3 h-3" /> 40+ pages</span>
 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-800 border border-gray-200"><Clock className="w-3 h-3" /> 7 chapters</span>
 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-800 border border-gray-200"><Sparkles className="w-3 h-3" /> 30+ prompts</span>
 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-800 border border-gray-200"><Globe className="w-3 h-3" /> Updated July 2026</span>
 </div>
 <div className="flex flex-wrap items-center gap-3">
 <button onClick={() => setShowCheckout(true)} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neon to-aqua text-white font-semibold text-sm hover:opacity-90 transition hover:-translate-y-0.5 shadow-lg shadow-neon/20"><Download className="w-4 h-4" /> Download PDF \u2014 $9</button>
 <a href="#preview" className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 text-sm font-medium hover:text-white hover:border-neon/30 transition"><BookOpen className="w-4 h-4" /> Preview</a>
 </div>
 <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-gray-700">
 <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" /> 500+ analysts downloaded</span>
 <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> 30-Day Guarantee \u2014 save 10x or refund</span>
 </div>
 </div>
 </div>

 {/* Free Template Section */}
 <section className="mb-8 sm:mb-10">
 <EmailCapture
 templateContent={`You are a data analyst. I need a Python analysis script for my dataset.

Dataset: [describe — e.g., "CSV with 10K customer rows, columns: signup_date, country, plan_type, revenue, churned"]
Goal: [what do you want to find out? — e.g., "Which customer segments churn most?"]
Output format: [e.g., "charts + summary table"]

Please give me:
1. A complete Python script using pandas, matplotlib/seaborn
2. Comments explaining each section
3. Expected output description
4. File naming conventions for saving outputs
5. A 1-paragraph executive summary template`}
 templateTitle="Free Prompt: AI-Powered Data Analysis Script"
 playbookSlug="ai-for-data-analysis"
 playbookTitle="AI for Data Analysis"
 gradient="from-indigo-500/10 to-cyan-500/10"
 />
 </section>

 {[["What's Inside", BookOpen, 'text-neon-light'],
 ["Who This Is For", Users, 'text-sky-400'],
 ["What You'll Learn", Target, 'text-emerald-400']].map(([title, Icon, color]) => (
 <section key={''+title} className="mb-8 sm:mb-10" id={title === "What's Inside" ? 'preview' : undefined}>
 <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Icon className={'w-4 h-4 ' + color} /> {''+title}</h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
 {(title === "What's Inside" ? includedItems : title === 'Who This Is For' ? whoItsFor : whatYoullLearn).map((item, i) => {
 const ICON = item.icon; return (
 <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/10">
 <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0"><ICON className="w-5 h-5 text-indigo-400" /></div>
 <div><p className="text-sm font-medium text-white">{item.text}</p><p className="text-xs text-gray-600 mt-0.5">{item.subtext}</p></div>
 </div>
 );})}
 </div>
 {whoItsFor.length > 0 && title === 'Who This Is For' ? <div className="grid-cols-2" /> : null}
 </section>
 ))}

 <section className="mb-8 sm:mb-10">
 <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><SearchIcon className="w-4 h-4 text-amber-400" /> Chapter Preview</h2>
 <p className="text-sm text-gray-700 mb-6">Here&apos;s everything covered. Each chapter is packed with actionable strategies and ready-to-use prompts.</p>
 <div className="space-y-4">
 {sections.map((section) => (
 <details key={section.id} className="group rounded-xl border border-gray-200 bg-white overflow-hidden transition hover:border-indigo-500/20">
 <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
 <div className="flex items-center gap-3 min-w-0">
 <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">{section.icon}</div>
 <div className="min-w-0"><h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-indigo-300 transition">{section.title}</h3><p className="text-xs text-gray-600 mt-0.5 line-clamp-1">{section.description}</p></div>
 </div>
 <ChevronRight className="w-5 h-5 text-gray-600 shrink-0 transition-transform group-open:rotate-90" />
 </summary>
 <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-gray-200 pt-3">
 <ul className="space-y-2">{section.items.map((item, i) => (<li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-800"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />{item}</li>))}</ul>
 </div>
 </details>
 ))}
 </div>
 </section>

 <section className="mb-8 sm:mb-10">
 <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Users className="w-4 h-4 text-indigo-400" /> Real Results</h2>
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
 {socialProofStats.map((item, i) => { const Icon = item.icon; return (
 <div key={i} className={'flex flex-col items-center text-center p-4 sm:p-5 rounded-xl border ' + item.border + ' ' + item.bg}>
 <div className={'w-10 h-10 rounded-lg ' + item.bg + ' flex items-center justify-center mb-2'}><Icon className={'w-5 h-5 ' + item.color} /></div>
 <div className={'text-xl sm:text-2xl font-bold ' + item.color}>{item.value}</div>
 <div className="text-xs text-gray-700 mt-1">{item.label}</div>
 </div>
 );})}
 </div>
 </section>

 <section className="mb-8 sm:mb-10">
 <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Star className="w-4 h-4 text-amber-400" /> Reviews</h2>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
 {testimonials.map((t, i) => (
 <div key={i} className="flex flex-col p-5 rounded-xl border border-gray-200 bg-gray-50">
 <div className="flex items-center gap-0.5 mb-3">{Array.from({ length: t.stars }).map((_, si) => (<Star key={si} className="w-4 h-4 text-amber-400 fill-amber-400" />))}</div>
 <blockquote className="text-xs sm:text-sm text-gray-800 leading-relaxed mb-3 flex-1">&ldquo;{t.quote}&rdquo;</blockquote>
 <div className="border-t border-gray-200 pt-3 mt-auto"><div className="text-sm font-medium text-gray-900">{t.name}</div><div className="text-xs text-gray-600">{t.title}</div></div>
 </div>
 ))}
 </div>
 </section>

 <section className="mb-8 sm:mb-10">
 <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Zap className="w-4 h-4 text-amber-400" /> Free Bonuses ($46 Value)</h2>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
 {bonuses.map((b, i) => (
 <div key={i} className="relative flex flex-col p-5 rounded-xl border border-amber-500/20 bg-amber-500/5">
 <div className="absolute -top-2 right-3"><span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">FREE</span></div>
 <div className="text-base font-semibold text-gray-900 mb-1 pr-12">{b.name}</div>
 <p className="text-xs text-gray-700 mb-2">{b.desc}</p>
 <div className="flex items-center gap-2 mt-auto"><span className="text-lg font-bold text-emerald-400">$0</span><span className="text-xs text-gray-600 line-through">{b.value}</span></div>
 </div>
 ))}
 </div>
 </section>

 <section className="mb-8 sm:mb-10">
 <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8 text-center">
 <div className="relative">
 <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2"><Clock className="w-5 h-5 text-cyan-400" /> Price Increasing Soon</h2>
 <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-4">
 <div className="text-center"><div className="text-3xl sm:text-4xl font-bold text-neon-light">$9</div><div className="text-xs text-gray-600">Current</div></div>
 <div className="hidden sm:block text-2xl text-gray-500">\u2192</div>
 <div className="text-center"><div className="text-2xl sm:text-3xl font-bold text-gray-600 line-through">$19</div><div className="text-xs text-gray-600">Next tier</div></div>
 </div>
 <button onClick={() => setShowCheckout(true)} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neon to-aqua text-white font-semibold text-sm hover:opacity-90 transition shadow-lg shadow-neon/20"><ShoppingCart className="w-4 h-4" /> Buy Now at $9</button>
 </div>
 </div>
 </section>

 <section className="mb-8 sm:mb-10">
 <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Lightbulb className="w-4 h-4 text-cyan-400" /> FAQ</h2>
 <div className="space-y-3">
 {faqItems.map((faq, i) => (
 <details key={i} className="group rounded-xl border border-gray-200 bg-white overflow-hidden transition hover:border-indigo-500/20">
 <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
 <span className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-indigo-300 transition pr-4">{faq.q}</span>
 <ChevronRight className="w-5 h-5 text-gray-600 shrink-0 transition-transform group-open:rotate-90" />
 </summary>
 <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-gray-200 pt-3">
 <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{faq.a}</p>
 </div>
 </details>
 ))}
 </div>
 </section>

 <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-tech-800 border border-emerald-500/20 p-6 sm:p-8 text-center">
 <div className="relative">
 <Shield className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
 <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">30-Day Money-Back Guarantee</h2>
 <p className="text-sm text-gray-700 max-w-lg mx-auto mb-4">If this playbook doesn't save you 10x your investment within 30 days, I'll refund every cent. No questions asked.</p>
 <button onClick={() => setShowCheckout(true)} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neon to-aqua text-white font-semibold text-sm hover:opacity-90 transition shadow-lg shadow-neon/20">
 <Download className="w-4 h-4" /> Download PDF \u2014 $9
 </button>
 </div>
 </section>

 </div>
 {showCheckout && <CheckoutOverlay onBack={() => setShowCheckout(false)} />}
 </>
 );
}

export default function AIForDataAnalysisPage() {
 return (
 <Suspense fallback={<div className="max-w-5xl mx-auto px-4 py-8"><div className="animate-pulse space-y-4"><div className="h-4 bg-white rounded w-1/4" /><div className="h-8 bg-white rounded w-3/4" /><div className="h-64 bg-white rounded" /></div></div>}>
 <AIForDataAnalysisInner />
 </Suspense>
 );
}
