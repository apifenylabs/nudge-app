'use client';

import SeoMetadata from '@/components/SeoMetadata';
import EmailCapture from '@/components/EmailCapture';
import { useState, Suspense } from 'react';
import Link from 'next/link';

import {
 ArrowLeft, Download, CheckCircle, BookOpen, Users, Target, Zap, TrendingUp,
 DollarSign, Star, Clock, Sparkles, Lightbulb, ChevronRight, ShoppingCart,
 FileText, Rocket, Search as SearchIcon, Shield, BarChart3, Globe, Brain,
 MessageSquare, Layers, Calendar, Bot,
} from 'lucide-react';

interface Section { id: string; icon: React.ReactNode; title: string; description: string; items: string[]; }

const sections: Section[] = [
 { id: 'screening', icon: <SearchIcon className="w-5 h-5 text-violet-400" />, title: 'Automate Resume Screening with ChatGPT', description: 'Upload batches of resumes for AI-powered candidate ranking, skill gap analysis, and interview recommendations.', items: [
 'Uploading anonymized resumes for bias-free screening',
 'Ranking candidates against job requirements with match scores',
 'Identifying skill gaps, experience levels, and culture-fit indicators',
 'Structured output for ATS integration',
 'Best practices for fair and effective AI screening',
 ]},
 { id: 'jd', icon: <FileText className="w-5 h-5 text-cyan-400" />, title: 'Generate Job Descriptions with Gemini', description: 'Create compelling, inclusive job descriptions that attract the right candidates using AI.', items: [
 'Crafting role-specific job descriptions from a few keywords',
 'Using inclusive language to attract diverse candidates',
 'Structuring JDs for maximum search visibility',
 'Generating multiple versions for different platforms',
 'Keeping JD content fresh with AI-powered rewrites',
 ]},
 { id: 'interviews', icon: <MessageSquare className="w-5 h-5 text-fuchsia-400" />, title: 'Prepare Interview Guides with Claude', description: 'Generate structured interview guides with role-specific questions, scoring rubrics, and candidate-tailored prompts.', items: [
 'Generating behavioral questions using the STAR method',
 'Creating role-specific technical assessment prompts',
 'Building scoring rubrics for objective evaluation',
 'Tailoring questions to each candidate&#39;s experience',
 'Structuring interview kits for consistent hiring',
 ]},
 { id: 'skills', icon: <Brain className="w-5 h-5 text-amber-400" />, title: 'Design Skills Assessments with ChatGPT', description: 'Create AI-powered skills assessments that accurately evaluate candidate capabilities.', items: [
 'Designing role-relevant technical challenges',
 'Creating take-home assignments with clear rubrics',
 'Using AI to evaluate assessment submissions',
 'Generating soft-skill scenario questions',
 'Balancing depth with candidate time investment',
 ]},
 { id: 'matching', icon: <Target className="w-5 h-5 text-emerald-400" />, title: 'Match Candidates to Roles with Exa + Gemini', description: 'Use AI to match candidate profiles to open positions with precision and speed.', items: [
 'Building candidate profiles from resumes and interviews',
 'Cross-referencing skills against role requirements',
 'Gemini long-context analysis for best-fit matching',
 'Handling internal mobility and lateral moves',
 'Tracking candidate pipelines with AI insights',
 ]},
 { id: 'onboarding', icon: <Rocket className="w-5 h-5 text-green-400" />, title: 'Create Personalized Onboarding with Notion AI', description: 'Build automated onboarding workflows for every new hire.', items: [
 'Building Notion onboarding templates with role-specific content',
 'Auto-filling templates with hire details via Notion AI',
 'Creating day-1 checklists and first-week schedules',
 'Setting up learning paths and team introductions',
 'Linking tool access setup and policy documents',
 ]},
 { id: 'reviews', icon: <BarChart3 className="w-5 h-5 text-sky-400" />, title: 'Draft Performance Reviews with ChatGPT', description: 'Generate balanced performance reviews from accomplishments, feedback, and OKR data.', items: [
 'Feeding employee data: accomplishments, peer feedback, OKRs',
 'Generating balanced reviews with strengths and growth areas',
 'Creating SMART goals for the next quarter',
 'Drafting development plans and training recommendations',
 'Maintaining consistency across the organization',
 ]},
 { id: 'sentiment', icon: <BarChart3 className="w-5 h-5 text-rose-400" />, title: 'Analyze Employee Sentiment with Exa + Gemini', description: 'Monitor employee satisfaction using AI-powered sentiment analysis.', items: [
 'Gathering data from Glassdoor, Indeed, and internal surveys',
 'Running sentiment analysis on employee feedback',
 'Identifying trends before they become problems',
 'Generating actionable recommendations for leadership',
 'Tracking sentiment changes over time',
 ]},
];

const includedItems = [
 { icon: BookOpen, text: '8 comprehensive chapters', subtext: '40+ pages of actionable content' },
 { icon: FileText, text: 'Ready-to-use interview guides', subtext: 'Role-specific question banks' },
 { icon: Zap, text: 'AI screening prompt templates', subtext: '5 recruiter-optimized prompts' },
 { icon: Layers, text: 'Notion onboarding template pack', subtext: 'Role-specific day-1 plans' },
 { icon: DollarSign, text: 'Cost-effective HR tech stack', subtext: 'Full HR setup under $100/mo' },
 { icon: Calendar, text: 'Performance review templates', subtext: 'Quarterly review automation' },
];
const whoItsFor = [
 { icon: Users, text: 'HR professionals', subtext: 'Screen 100+ resumes in 30 min instead of 8 hours' },
 { icon: Target, text: 'Recruiters & hiring managers', subtext: 'Reduce time-to-hire by 45% with AI matching' },
 { icon: Star, text: 'Team leads & managers', subtext: 'Conduct better interviews with AI-generated guides' },
 { icon: Lightbulb, text: 'Startup founders', subtext: 'Build hiring pipeline without an HR team' },
];
const whatYoullLearn = [
 { icon: Bot, text: 'Screen resumes at scale', subtext: 'AI-powered candidate ranking' },
 { icon: Zap, text: 'Conduct better interviews', subtext: 'AI-generated question banks' },
 { icon: Layers, text: 'Automate onboarding', subtext: 'Personalized day-1 workflows' },
 { icon: Clock, text: 'Track employee sentiment', subtext: 'AI analysis of feedback data' },
];
const socialProofStats = [
 { icon: SearchIcon, value: '85%', label: 'Faster resume screening', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
 { icon: Target, value: '45%', label: 'Reduced time-to-hire', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
 { icon: Users, value: '40%', label: 'Better onboarding completion', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
 { icon: DollarSign, value: '$10K+', label: 'Saved per hire', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
];
const testimonials = [
 { name: 'Sarah M.', title: 'HR Director', stars: 5, quote: 'We reduced screening from 8 hours to 30 minutes per batch of 100 resumes. The AI matching surfaces better candidates than manual.' },
 { name: 'Alex T.', title: 'Tech Recruiter', stars: 5, quote: 'The interview guides are incredible. Claude generates 10 relevant questions with scoring rubrics from any JD.' },
 { name: 'Maya L.', title: 'Startup Founder', stars: 5, quote: 'I onboarded 5 hires in one week using the Notion AI templates. Everything just works.' },
];
const bonuses = [
 { name: 'Notion HR Hub Template', value: '$19', desc: 'Complete workspace with job descriptions, candidate tracker, onboarding plans, and review templates' },
 { name: '5 Recruiter Prompt Templates', value: '$15', desc: 'Pre-built ChatGPT prompts for resume screening, JD writing, interview prep, and performance reviews' },
 { name: 'ATS Integration Guide', value: '$13', desc: 'Step-by-step guide to connect AI screening with Lever, Greenhouse, BambooHR, and more' },
];
const faqItems = [
 { q: 'Is this a digital download?', a: "Yes! The AI for HR &amp; Recruiting playbook is a digital PDF delivered instantly after purchase." },
 { q: 'Do I need to be technical?', a: 'Not at all. This playbook is designed for HR professionals and recruiters of all backgrounds.' },
 { q: 'What tools do I need?', a: 'The core stack uses ChatGPT, Claude, Gemini, Notion AI, Exa, and Perplexity.' },
 { q: 'Can I get a refund?', a: 'Absolutely. 30-day money-back guarantee, no questions asked.' },
 { q: 'Does AI screening introduce bias?', a: 'We cover bias mitigation in detail, including anonymization and regular audit processes.' },
 { q: 'Can I use this with my existing ATS?', a: 'Yes! The ATS integration guide covers Lever, Greenhouse, BambooHR, and more.' },
];

function CheckoutOverlay({ onBack }: { onBack: () => void }) {
 const [email, setEmail] = useState('');
 const [loading, setLoading] = useState(false);
 const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
 const [message, setMessage] = useState('');
 const handlePurchase = async (e: React.FormEvent) => {
 e.preventDefault(); if (!email) return; setLoading(true); setStatus('idle');
 try {
 const res = await fetch('/api/create-checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, product: 'ai-for-hr-and-recruiting' }) });
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
 <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-4"><Users className="w-8 h-8 text-white" /></div>
 <h3 className="text-xl font-bold text-gray-900 mb-1">AI for HR &amp; Recruiting</h3>
 <p className="text-sm text-gray-700 mb-1">Complete PDF Playbook</p>
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
 {loading ? <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Processing...</> : <><Download className="w-4 h-4" /> Download PDF — $9</>}
 </button>
 {status === 'error' && <p className="text-xs text-red-400 text-center">{message}</p>}
 <p className="text-[10px] text-gray-600 text-center">Secure checkout. Instant download.</p>
 </form>
 )}
 </div>
 </div>
 );
}

function AiForHrAndRecruitingInner() {
 const [showCheckout, setShowCheckout] = useState(false);
 return (
 <>
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
 <SeoMetadata title="AI for HR & Recruiting — Apifeny" description="Revolutionize your HR workflows with AI: automated resume screening, structured interview guides, personalized onboarding, and employee sentiment analysis." />
 <nav aria-label="Breadcrumb" className="mb-4">
 <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-600">
 <li><Link href="/" className="hover:text-white transition">Home</Link></li>
 <li className="text-gray-500">/</li>
 <li><Link href="/playbooks" className="hover:text-white transition">Playbooks</Link></li>
 <li className="text-gray-800 truncate max-w-[200px]">AI for HR &amp; Recruiting</li>
 </ol>
 </nav>
 <Link href="/playbooks" className="inline-flex items-center gap-1.5 text-sm text-gray-700 hover:text-white transition mb-6 group"><ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" /> All Playbooks</Link>

 <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500/25 via-purple-500/15 to-tech-800 border border-violet-500/20 mb-8 sm:mb-10">
 <div className="absolute inset-0 bg-gray-50 opacity-30" />
 <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px] pointer-events-none" />
 <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />
 <div className="relative p-6 sm:p-8 lg:p-10">
 <div className="flex items-center gap-2 mb-3">
 <span className="text-3xl">👥</span>
 <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-100 text-amber-700 border-amber-200 border border-amber-500/30">Premium</span>
 </div>
 <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">AI for HR &amp; Recruiting</h1>
 <p className="text-sm sm:text-base text-gray-800 max-w-2xl mb-4 leading-relaxed">Revolutionize your HR workflows with AI: automated resume screening, structured interview guides, personalized onboarding, performance review drafting, and employee sentiment analysis. Designed for HR professionals, recruiters, and team leads.</p>
 <div className="flex flex-wrap gap-3 mb-4">
 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-800 border border-gray-200"><FileText className="w-3 h-3" /> 40+ pages</span>
 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-800 border border-gray-200"><Clock className="w-3 h-3" /> 8 chapters</span>
 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-800 border border-gray-200"><Sparkles className="w-3 h-3" /> 5+ AI prompts</span>
 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-800 border border-gray-200"><Globe className="w-3 h-3" /> Updated June 2026</span>
 </div>
 <div className="flex flex-wrap items-center gap-3">
 <button onClick={() => setShowCheckout(true)} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neon to-aqua text-white font-semibold text-sm hover:opacity-90 transition hover:-translate-y-0.5 shadow-lg shadow-neon/20"><Download className="w-4 h-4" /> Download PDF — $9</button>
 <a href="#preview" className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 text-sm font-medium hover:text-white hover:border-neon/30 transition"><BookOpen className="w-4 h-4" /> Preview</a>
 </div>
 <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-gray-700">
 <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Used by 100+ HR teams</span>
 <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> 30-Day Guarantee — save 10x or refund</span>
 </div>
 </div>
 </div>

 <section className="mb-8 sm:mb-10">
 <EmailCapture
 templateContent={`You are an AI-powered HR consultant. I need to automate parts of my hiring process.

Role I\'m hiring for: [job title]
Company size: [size]
Applicants per posting: [rough number]
Current hiring pain point: [what takes the most time?]

Please give me:
1. A job description template optimized for AI screening
2. 5 screening questions that reveal the best candidates
3. A scorecard template for evaluating applicants
4. An onboarding checklist that AI can help automate
5. The top 3 automation opportunities in my hiring workflow`}
 templateTitle="Free Prompt: Automate Your Hiring Workflow"
 playbookSlug="ai-for-hr-and-recruiting"
 playbookTitle="AI for HR & Recruiting"
 gradient="from-indigo-500/10 to-violet-500/10"
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
 <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-violet-500/20 bg-violet-500/10">
 <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0"><ICON className="w-5 h-5 text-violet-400" /></div>
 <div><p className="text-sm font-medium text-white">{item.text}</p><p className="text-xs text-gray-600 mt-0.5">{item.subtext}</p></div>
 </div>
 );})}
 </div>
 </section>
 ))}

 <section className="mb-8 sm:mb-10">
 <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><SearchIcon className="w-4 h-4 text-amber-400" /> Chapter Preview</h2>
 <p className="text-sm text-gray-700 mb-6">Here&apos;s everything covered. Each chapter is packed with actionable strategies and ready-to-use prompts.</p>
 <div className="space-y-4">
 {sections.map((section) => (
 <details key={section.id} className="group rounded-xl border border-gray-200 bg-white overflow-hidden transition hover:border-violet-500/20">
 <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
 <div className="flex items-center gap-3 min-w-0">
 <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">{section.icon}</div>
 <div className="min-w-0"><h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-violet-300 transition">{section.title}</h3><p className="text-xs text-gray-600 mt-0.5 line-clamp-1">{section.description}</p></div>
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
 <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Users className="w-4 h-4 text-violet-400" /> Real Results</h2>
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
 <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Zap className="w-4 h-4 text-amber-400" /> Free Bonuses ($47 Value)</h2>
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
 <div className="hidden sm:block text-2xl text-gray-500">&rarr;</div>
 <div className="text-center"><div className="text-2xl sm:text-3xl font-bold text-gray-600 line-through">$18</div><div className="text-xs text-gray-600">Next tier</div></div>
 </div>
 <button onClick={() => setShowCheckout(true)} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neon to-aqua text-white font-semibold text-sm hover:opacity-90 transition shadow-lg shadow-neon/20"><ShoppingCart className="w-4 h-4" /> Buy Now at $9</button>
 </div>
 </div>
 </section>

 <section className="mb-8 sm:mb-10">
 <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Lightbulb className="w-4 h-4 text-cyan-400" /> FAQ</h2>
 <div className="space-y-3">
 {faqItems.map((faq, i) => (
 <details key={i} className="group rounded-xl border border-gray-200 bg-white overflow-hidden transition hover:border-violet-500/20">
 <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
 <span className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-violet-300 transition pr-4">{faq.q}</span>
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
 <p className="text-sm text-gray-700 max-w-lg mx-auto mb-4">If the AI for HR &amp; Recruiting playbook doesn&apos;t help you reduce time-to-hire by at least 30% within 30 days, I&apos;ll refund every cent. No questions asked.</p>
 <button onClick={() => setShowCheckout(true)} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neon to-aqua text-white font-semibold text-sm hover:opacity-90 transition shadow-lg shadow-neon/20">
 <Download className="w-4 h-4" /> Download PDF — $9
 </button>
 </div>
 </section>

 </div>
 {showCheckout && <CheckoutOverlay onBack={() => setShowCheckout(false)} />}
 </>
 );
}

export default function AiForHrAndRecruitingPage() {
 return (
 <Suspense fallback={<div className="max-w-5xl mx-auto px-4 py-8"><div className="animate-pulse space-y-4"><div className="h-4 bg-white rounded w-1/4" /><div className="h-8 bg-white rounded w-3/4" /><div className="h-64 bg-white rounded" /></div></div>}>
 <AiForHrAndRecruitingInner />
 </Suspense>
 );
}
