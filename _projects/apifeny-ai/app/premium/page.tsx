'use client';

import { useState } from 'react';
import Link from 'next/link';
import EmailCapture from '@/components/EmailCapture';
import {
  Crown,
  CheckCircle,
  ArrowRight,
  Download,
  BookOpen,
  FileText,
  Zap,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Star,
  Shield,
  Layers,
} from 'lucide-react';

const BENEFITS = [
  {
    icon: BookOpen,
    title: '15 Premium Playbooks',
    description: 'Exclusive in-depth playbooks — AI solopreneur toolkit, directory building, workflow automation, and more. Updated monthly.',
  },
  {
    icon: FileText,
    title: 'Infographics Library',
    description: 'Visual cheat sheets and workflow diagrams for every playbook. Print them, pin them, share them with your team.',
  },
  {
    icon: Zap,
    title: 'Monthly New Content',
    description: 'New playbooks, templates, and prompts added every month. Your subscription grows with you.',
  },
  {
    icon: Download,
    title: 'Copy-Paste Prompts',
    description: '300+ ready-to-use AI prompts across all premium playbooks. No rewriting — just paste and ship.',
  },
  {
    icon: TrendingUp,
    title: 'Revenue Blueprints',
    description: 'Real MRR strategies from solopreneurs using AI. See exactly what works and how much it earns.',
  },
  {
    icon: Star,
    title: 'Early Access',
    description: 'Be the first to get every new playbook before public release. Shape what gets built next.',
  },
];

const FAQS = [
  {
    q: 'What happens after I subscribe?',
    a: 'You get instant access to all 15 premium playbooks, infographics, and prompts. New content drops monthly.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel at any time — you keep access until the end of your billing period.',
  },
  {
    q: 'What if I just want one playbook?',
    a: 'Individual premium playbooks start at $9. The bundle gives you everything at a fraction of the cost.',
  },
];

export default function PremiumPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      const existing = JSON.parse(localStorage.getItem('apifeny-emails') || '[]');
      if (!existing.includes(email.trim().toLowerCase())) {
        existing.push(email.trim().toLowerCase());
        localStorage.setItem('apifeny-emails', JSON.stringify(existing));
      }
    } catch {}
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Gradient background matching main landing page */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-cyan-50" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-violet-100/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-cyan-100/30 to-transparent" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-700 text-xs font-medium mb-6">
            <Crown className="w-4 h-4" />
            Pro Playbook Bundle
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Go From AI Curious to{' '}
            <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              AI Power User
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto mb-8 leading-relaxed">
            Stop collecting AI tools. Start shipping real results. Get 15 premium playbooks,
            an infographics library, and monthly new content — all in one bundle.
          </p>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-10">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Monthly</h3>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-3xl font-bold text-gray-900">$19</span>
                <span className="text-sm text-gray-400">/mo</span>
              </div>
              <ul className="space-y-2 mb-4 text-left">
                <li className="flex items-start gap-2 text-xs text-gray-600">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  All 15 playbooks
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-600">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  Infographics library
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-600">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  Monthly new content
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-600">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  Cancel anytime
                </li>
              </ul>
              <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition">
                <Crown className="w-4 h-4" />
                Subscribe Monthly
              </button>
            </div>

            <div className="rounded-xl border-2 border-violet-200 bg-gradient-to-b from-violet-50 to-white p-6 shadow-md relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-[10px] font-bold">
                Best Value
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Yearly</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold text-gray-900">$149</span>
                <span className="text-sm text-gray-400">/yr</span>
              </div>
              <p className="text-xs text-emerald-600 font-medium mb-3 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Save 35% — that's $12.42/mo
              </p>
              <ul className="space-y-2 mb-4 text-left">
                <li className="flex items-start gap-2 text-xs text-gray-600">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  Everything in monthly
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-600">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  2 months free
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-600">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  Priority new content
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-600">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  Cancel anytime
                </li>
              </ul>
              <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white text-sm font-medium transition shadow-md">
                <Crown className="w-4 h-4" />
                Subscribe Yearly
              </button>
            </div>
          </div>

          {/* Waitlist / Email Capture */}
          {!submitted ? (
            <div className="max-w-md mx-auto rounded-xl border border-violet-100 bg-gradient-to-r from-violet-50/50 to-cyan-50/50 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                🔥 Launching soon — join the waitlist
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Be the first to know when the Pro Playbook Bundle goes live. Early birds get a special discount.
              </p>
              <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100 transition"
                  required
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition shrink-0"
                >
                  <Download className="w-4 h-4" />
                  Join Waitlist
                </button>
              </form>
              <p className="text-[10px] text-gray-400 mt-2">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          ) : (
            <div className="max-w-md mx-auto rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
              <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <h3 className="text-sm font-semibold text-emerald-800 mb-1">You're on the list! 🎉</h3>
              <p className="text-xs text-emerald-600">
                We'll notify you when the Pro Playbook Bundle launches. Early bird pricing coming your way.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Everything in the Pro Bundle
            </h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              One subscription. Every premium playbook. Infographics, prompts, and monthly drops.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-xl border border-gray-200 bg-white p-5 hover:border-violet-200 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-violet-100 border border-violet-200 flex items-center justify-center mb-3">
                  <benefit.icon className="w-5 h-5 text-violet-600" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Guarantee */}
      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-10 h-10 text-violet-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Risk. Real Results.</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
            30-day money-back guarantee. If the Pro Bundle doesn't make you more productive with AI,
            we'll refund you — no questions asked.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto text-center">
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
              <div className="text-lg font-bold text-gray-900">15</div>
              <div className="text-xs text-gray-500">Premium Playbooks</div>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
              <div className="text-lg font-bold text-gray-900">300+</div>
              <div className="text-xs text-gray-500">AI Prompts</div>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
              <div className="text-lg font-bold text-gray-900">30</div>
              <div className="text-xs text-gray-500">Day Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="rounded-xl border border-gray-200 bg-white p-4 group open:border-violet-200 open:shadow-sm transition-all"
              >
                <summary className="text-sm font-medium text-gray-900 cursor-pointer flex items-center justify-between">
                  {faq.q}
                  <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
            Ready to Level Up?
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Get the Pro Playbook Bundle and go from AI curious to AI power user.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/playbooks"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition"
            >
              <BookOpen className="w-4 h-4" />
              Browse Free Playbooks
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition"
            >
              <Layers className="w-4 h-4" />
              Browse Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
