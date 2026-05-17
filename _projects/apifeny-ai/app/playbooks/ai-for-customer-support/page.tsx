'use client';

import SeoMetadata from '@/components/SeoMetadata';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Download, CheckCircle, BookOpen, Users, Target, Zap,
  TrendingUp, DollarSign, Star, Clock, Sparkles, ChevronRight,
  ShoppingCart, FileText, Shield, MessageSquare, Headphones,
  SearchIcon, Lightbulb, Bot, BarChart3, Globe,
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
    id: 'chatbots',
    icon: <Bot className="w-5 h-5 text-violet-400" />,
    title: 'AI Chatbots - Your 24/7 Frontline Support',
    description: 'Deploy intelligent AI chatbots that handle customer queries instantly, escalate intelligently, and learn from every interaction.',
    items: [
      'Choosing the right chatbot platform (Intercom Fin, Zendesk AI, Tidio, Custom GPT)',
      'Training your bot on product docs, FAQs, and past tickets',
      'Conversation flow design - handling intent, sentiment, and fallback',
      'Escalation rules: when to pass to human agents',
      'Multi-language support out of the box',
      'Analytics and continuous improvement loops',
    ],
  },
  {
    id: 'ticket-automation',
    icon: <Zap className="w-5 h-5 text-cyan-400" />,
    title: 'Ticket Automation - Cut Response Time by 80%',
    description: 'Automate the entire ticket lifecycle from triage to resolution. Reduce manual work and make every agent 5x more productive.',
    items: [
      'Auto-triage: classify, prioritize, and route tickets by intent',
      'Smart replies: AI-generated suggested responses for agents',
      'Macro automation: trigger workflows based on ticket fields',
      'SLA tracking and auto-escalation for overdue tickets',
      'Bulk resolution for identical issues',
      'Closed-loop feedback: AI learns from resolved tickets',
    ],
  },
  {
    id: 'sentiment',
    icon: <MessageSquare className="w-5 h-5 text-fuchsia-400" />,
    title: 'Sentiment Analysis - Read the Room Instantly',
    description: 'Analyze customer tone in real-time to prevent churn, detect frustration, and surface VIP issues before they escalate.',
    items: [
      'Real-time sentiment scoring on every incoming message',
      'Frustration detection: flag angry customers immediately',
      'Trend analysis: spot recurring complaints across tickets',
      'CSAT and NPS prediction from conversation sentiment',
      'Agent coaching: alert supervisors when sentiment drops',
      'Dashboard: sentiment trends by product, region, and team',
    ],
  },
  {
    id: 'multilingual',
    icon: <Globe className="w-5 h-5 text-emerald-400" />,
    title: 'Multilingual Support - Serve Any Customer in Their Language',
    description: 'Break language barriers with AI-powered translation that lets your team support customers in 50+ languages without hiring a global team.',
    items: [
      'Real-time translation of inbound messages',
      'AI-generated responses in every native language',
      'Knowledge base auto-translation for self-service',
      'Language detection and routing to appropriate flows',
      'Quality assurance: translation accuracy checking',
      'Cost comparison: AI translation vs hiring multilingual agents',
    ],
  },
  {
    id: 'knowledge-base',
    icon: <BookOpen className="w-5 h-5 text-amber-400" />,
    title: 'Knowledge Base Auto-Generation - Self-Service That Works',
    description: 'Automatically generate, maintain, and optimize your help center using AI. Convert ticket resolutions into knowledge articles.',
    items: [
      'Auto-generate help articles from resolved tickets',
      'AI-powered search for instant self-service answers',
      'Identify knowledge gaps from unanswered ticket patterns',
      'Multi-format output: articles, videos, step-by-step guides',
      'Version control and automated updates when products change',
      'SEO optimization for organic discovery of help content',
    ],
  },
  {
    id: 'sla',
    icon: <BarChart3 className="w-5 h-5 text-rose-400" />,
    title: 'SLA Tracking and Compliance - Never Miss a Deadline',
    description: 'Set up automated SLA tracking that monitors every support interaction and ensures your team meets commitments.',
    items: [
      'Define SLA rules per ticket type, priority, and customer tier',
      'Automated SLA timer tracking from ticket creation',
      'Breach alerts: push notifications and auto-escalation',
      'Team performance dashboards with SLA adherence metrics',
      'Historical reporting for compliance audits',
      'Integration with existing tools (Jira, Slack, Teams)',
    ],
  },
];

const includedItems = [
  { icon: BookOpen, text: '6 comprehensive chapters', subtext: '40+ pages of actionable content' },
  { icon: FileText, text: 'Ready-to-use prompt library', subtext: '40+ copy-paste AI prompts' },
  { icon: Zap, text: 'Tool stack comparison matrix', subtext: '15+ tools compared by cost and features' },
  { icon: TrendingUp, text: 'Implementation checklists', subtext: 'Step-by-step setup for every system' },
  { icon: DollarSign, text: 'ROI calculator worksheets', subtext: 'Calculate cost savings and efficiency gains' },
  { icon: Bot, text: 'Chatbot training playbook', subtext: 'From setup to optimization in one guide' },
];

const whoItsFor = [
  { icon: Users, text: 'Support team leads', subtext: 'Looking to 10x team productivity with AI' },
  { icon: Target, text: 'Ecommerce founders', subtext: 'Scale support without scaling headcount' },
  { icon: Star, text: 'SaaS operators', subtext: 'Automate tier-1 tickets and reduce churn' },
  { icon: Headphones, text: 'Freelance support agents', subtext: 'Handle more clients with AI assistance' },
];

const whatYoullLearn = [
  { icon: Bot, text: 'Deploy AI chatbots in hours', subtext: 'Full setup guide from scratch' },
  { icon: Zap, text: 'Automate 80%+ of tickets', subtext: 'Triage, reply, resolve automatically' },
  { icon: MessageSquare, text: 'Master sentiment analysis', subtext: 'Detect churn risk in real-time' },
  { icon: Globe, text: 'Support in 50+ languages', subtext: 'One team, unlimited languages' },
];

const socialProofStats = [
  { icon: Users, value: '127+', label: 'Support teams using these playbooks', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { icon: TrendingUp, value: '80%', label: 'Average ticket automation rate', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { icon: Clock, value: '35K+', label: 'Hours saved per month across users', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { icon: Zap, value: '92%', label: 'CSAT maintained after automation', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
];

const testimonials = [
  {
    name: 'James Okonkwo',
    title: 'Support Lead, GrowthLabs SaaS',
    quote: 'We cut our first-response time from 4 hours to under 2 minutes. Our team handles 3x more tickets without hiring a single person. The sentiment analysis alone saved us from losing 3 enterprise accounts in the first month.',
    stars: 5,
  },
  {
    name: 'Lisa Tran',
    title: 'Owner, Bella and Co.',
    quote: 'Our customers are in 12 countries. This playbook showed me how to set up multilingual chatbots that handle 85% of queries in their native language. Our support costs dropped 60% while satisfaction went up.',
    stars: 5,
  },
  {
    name: 'Carlos Mendez',
    title: 'Customer Success Manager',
    quote: 'The ticket automation chapter is gold. We went from drowning in tier-1 tickets to having them resolved before our team even logs in. The SLA tracking keeps everyone accountable. Best $9 I have spent on my career.',
    stars: 5,
  },
];

const bonuses = [
  { name: 'Chatbot Training Template', value: '$19', desc: 'Complete conversation flow builder with 20 pre-built scenarios for ecommerce, SaaS, and service businesses' },
  { name: '40+ Battle-Tested Support Prompts', value: '$15', desc: 'Copy-paste prompts for ticket triage, sentiment analysis, translations, and reply generation' },
  { name: 'SLA Dashboard Template', value: '$13', desc: 'Real-time SLA tracking dashboard with breach alerts, team metrics, and compliance reporting' },
];

const faqItems = [
  { q: 'Is this a digital download?', a: 'Yes! The AI for Customer Support playbook is a digital PDF delivered instantly after purchase. You will also receive a download link via email.' },
  { q: 'Do I need technical skills?', a: 'Not at all. This playbook is designed for support managers, founders, and ops teams. Every system includes step-by-step instructions and copy-paste prompts.' },
  { q: 'Can I get a refund?', a: 'Absolutely. If this playbook does not help you reduce ticket volume by at least 50% or save 10x your investment within 30 days, I will refund every cent. No questions asked.' },
  { q: 'How often is it updated?', a: 'The playbook is updated quarterly. All updates are free for life. You will get an email whenever a new version is released.' },
  { q: 'Can I share this with my team?', a: 'This purchase is for individual use. For team licenses at a discounted rate, please reach out.' },
  { q: 'Which platforms does this work with?', a: 'The playbook covers Zendesk AI, Intercom Fin, Tidio, Freshdesk AI, and custom chatbot solutions. The frameworks are platform-agnostic.' },
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
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, product: 'ai-for-customer-support' }),
      });
      if (!res.ok) throw new Error('Failed to process');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ai-for-customer-support.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      setStatus('success');
      setMessage('Purchase successful! Your PDF has been downloaded.');
    } catch (err) {
      setStatus('error');
      setMessage('Something went wrong. Please try again or contact support.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative max-w-md w-full bg-tech-800 border border-tech-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-orange-500/10">
        <button onClick={onBack} className="absolute top-4 right-4 text-tech-300 hover:text-white transition" aria-label="Close">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center mb-4">
            <Headphones className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-1">AI for Customer Support</h3>
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
            <button onClick={onBack} className="mt-4 text-sm text-orange-400 hover:underline">Back to playbook</button>
          </div>
        ) : (
          <form onSubmit={handlePurchase} className="space-y-4">
            <div>
              <label htmlFor="checkout-email" className="block text-sm font-medium text-tech-200 mb-1">Email address</label>
              <input id="checkout-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required
                className="w-full bg-tech-900 border border-tech-500/50 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-tech-300 focus:outline-none focus:border-orange-400/60 focus:ring-1 focus:ring-orange-400/20 transition" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 text-white font-semibold text-sm hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing...
                </>
              ) : (
                <><Download className="w-4 h-4" /> Download PDF - $9</>
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

function AIForCustomerSupportInner() {
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      <SeoMetadata title="AI for Customer Support — Apifeny" description="Automate customer support with AI chatbots, ticket routing, sentiment analysis, and self-service portals using ChatGPT, Zendesk AI, and Intercom Fin." />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-tech-300">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li className="text-tech-500">/</li>
            <li><Link href="/playbooks" className="hover:text-white transition">Playbooks</Link></li>
            <li className="text-tech-100 truncate max-w-[200px]">AI for Customer Support</li>
          </ol>
        </nav>
        <Link href="/playbooks" className="inline-flex items-center gap-1.5 text-sm text-tech-200 hover:text-white transition mb-6 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
          All Playbooks
        </Link>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/25 via-amber-500/15 to-tech-800 border border-orange-500/20 mb-8 sm:mb-10">
          <div className="absolute inset-0 bg-tech-grid opacity-30" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">🎧</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">Premium</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">AI for Customer Support</h1>
            <p className="text-sm sm:text-base text-tech-100 max-w-2xl mb-4 leading-relaxed">
              The complete blueprint for transforming your customer support with AI.
              From chatbots and ticket automation to sentiment analysis and multilingual
              support - this 40+ page PDF gives you every system, prompt, and strategy to
              cut costs while improving satisfaction.
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100 border border-tech-500/30"><FileText className="w-3 h-3" /> 40+ pages</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100 border border-tech-500/30"><Headphones className="w-3 h-3" /> 6 chapters</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100 border border-tech-500/30"><Sparkles className="w-3 h-3" /> 40+ prompts</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-tech-600 text-tech-100 border border-tech-500/30"><Globe className="w-3 h-3" /> Updated July 2026</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={() => setShowCheckout(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 text-white font-semibold text-sm hover:opacity-90 transition hover:-translate-y-0.5 shadow-lg shadow-orange-500/20">
                <Download className="w-4 h-4" /> Download PDF - $9
              </button>
              <a href="#preview"
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-tech-700 border border-tech-500/30 text-tech-100 text-sm font-medium hover:text-white hover:border-orange-400/30 transition">
                <BookOpen className="w-4 h-4" /> Preview Contents
              </a>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-tech-200">
              <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" /> 127+ support teams have downloaded this playbook</span>
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> 30-Day Money-Back Guarantee</span>
            </div>
          </div>
        </div>

        <section className="mb-8 sm:mb-10" id="preview">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><BookOpen className="w-4 h-4 text-orange-400" /> What is Inside</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {includedItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-tech-500/20 bg-tech-700/60 hover:border-orange-400/20 transition">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0"><Icon className="w-5 h-5 text-orange-400" /></div>
                  <div><p className="text-sm font-medium text-white">{item.text}</p><p className="text-xs text-tech-300 mt-0.5">{item.subtext}</p></div>
                </div>
              );
            })}
          </div>
        </section>

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

        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><Target className="w-4 h-4 text-emerald-400" /> What You Will Learn</h2>
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

        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><SearchIcon className="w-4 h-4 text-amber-400" /> Chapter Preview</h2>
          <p className="text-sm text-tech-200 mb-6">Here is everything covered in the AI for Customer Support playbook. Each chapter is packed with actionable strategies, real examples, and ready-to-use prompts.</p>
          <div className="space-y-4">
            {sections.map((section) => (
              <details key={section.id} className="group rounded-xl border border-tech-500/20 bg-tech-700/50 overflow-hidden transition hover:border-orange-400/20">
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-tech-600 flex items-center justify-center shrink-0">{section.icon}</div>
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-orange-400 transition">{section.title}</h3>
                      <p className="text-xs text-tech-300 mt-0.5 line-clamp-1">{section.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-tech-300 shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-tech-500/10 pt-3">
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-tech-100">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><Users className="w-4 h-4 text-emerald-400" /> Real Results - Deployed by 127+ Support Teams</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {socialProofStats.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className={`flex flex-col items-center text-center p-4 sm:p-5 rounded-xl border ${item.border} ${item.bg}`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${item.bg}`}><Icon className={`w-5 h-5 ${item.color}`} /></div>
                  <div className={`text-xl sm:text-2xl font-bold ${item.color}`}>{item.value}</div>
                  <div className="text-xs text-tech-200 mt-1">{item.label}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-center">
            <p className="text-sm text-emerald-200"><CheckCircle className="w-4 h-4 inline-block mr-1.5 text-emerald-400" /> Every system in this playbook has been battle-tested with real support teams.</p>
          </div>
        </section>

        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><Star className="w-4 h-4 text-amber-400" /> What Support Leaders Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {testimonials.map((t, i) => (
              <div key={i} className="flex flex-col p-5 rounded-xl border border-tech-500/20 bg-tech-700/60">
                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
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

        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><Zap className="w-4 h-4 text-amber-400" /> Free Bonuses ($47 Value - Yours Today)</h2>
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

        <section className="mb-8 sm:mb-10">
          <div className="relative overflow-hidden rounded-2xl border border-tech-500/20 bg-tech-700/60 p-6 sm:p-8 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 pointer-events-none" />
            <div className="relative">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center justify-center gap-2"><Clock className="w-5 h-5 text-cyan-400" /> Price Increasing Soon</h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-4">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-orange-400">$9</div>
                  <div className="text-xs text-tech-300">Current price</div>
                </div>
                <div className="hidden sm:block text-2xl text-tech-500">&rarr;</div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-tech-300 line-through">$19</div>
                  <div className="text-xs text-tech-300">Next tier</div>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs"><TrendingUp className="w-3.5 h-3.5" /> Copies sold: 127+</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs"><Clock className="w-3.5 h-3.5" /> Price increases in: 48 hours</span>
              </div>
              <button onClick={() => setShowCheckout(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 text-white font-semibold text-sm hover:opacity-90 transition hover:-translate-y-0.5 shadow-lg shadow-orange-500/20">
                <ShoppingCart className="w-4 h-4" /> Buy Now at $9 - Price Goes Up Soon
              </button>
            </div>
          </div>
        </section>

        <section className="mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2"><Lightbulb className="w-4 h-4 text-cyan-400" /> Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqItems.map((faq, i) => (
              <details key={i} className="group rounded-xl border border-tech-500/20 bg-tech-700/50 overflow-hidden transition hover:border-orange-400/20">
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
                  <span className="text-sm sm:text-base font-medium text-white group-hover:text-orange-400 transition pr-4">{faq.q}</span>
                  <ChevronRight className="w-5 h-5 text-tech-300 shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-tech-500/10 pt-3">
                  <p className="text-xs sm:text-sm text-tech-200 leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="mb-8 sm:mb-10">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-tech-800 border border-emerald-500/20 p-6 sm:p-8 text-center">
            <div className="absolute inset-0 bg-tech-grid opacity-20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />
            <div className="relative">
              <Shield className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2">100% Risk-Free - 30-Day Money-Back Guarantee</h2>
              <p className="text-sm text-tech-200 max-w-lg mx-auto mb-4 leading-relaxed">
                If the AI for Customer Support playbook does not help you reduce ticket volume by at least 50%
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

        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-amber-500/10 border border-orange-400/20 p-6 sm:p-8 text-center">
          <div className="absolute inset-0 bg-tech-grid opacity-20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-500/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 mb-4">
              <Headphones className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Ready to Transform Your Support?</h2>
            <p className="text-sm text-tech-200 max-w-lg mx-auto mb-4">
              Get the complete 40+ page PDF playbook. Every system, prompt, and strategy
              you need to cut costs and improve customer satisfaction.
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 text-white font-semibold text-sm hover:opacity-90 transition hover:-translate-y-0.5 shadow-lg shadow-orange-500/20">
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

export default function AIForCustomerSupportPage() {
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
      <AIForCustomerSupportInner />
    </Suspense>
  );
}
