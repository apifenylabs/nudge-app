'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Crown,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Download,
  BookOpen,
  FileText,
  Zap,
  ChevronRight,
  TrendingUp,
  Star,
  Shield,
} from 'lucide-react';

const FEATURES = [
  {
    icon: BookOpen,
    title: '79+ AI Playbooks',
    description: 'Every playbook from the directory — solopreneur toolkit, content creation, coding, marketing, data, HR, finance, and more.',
  },
  {
    icon: FileText,
    title: 'PDF Downloads',
    description: 'Every playbook available as a beautifully formatted PDF. Offline access, print-friendly, copy-paste ready prompts.',
  },
  {
    icon: Download,
    title: 'Copy-Paste Prompts',
    description: '300+ ready-to-use AI prompts across all playbooks. No rewriting, no guessing — just paste and run.',
  },
  {
    icon: TrendingUp,
    title: 'Revenue Stories & Metrics',
    description: 'Real MRR data from verified users. See exactly how much others are earning with each playbook.',
  },
  {
    icon: Star,
    title: 'New Playbooks First',
    description: 'Pro members get early access to every new playbook before public release.',
  },
  {
    icon: Shield,
    title: 'Lifetime Access',
    description: 'Download everything. Keep forever. Cancel anytime — your PDFs are yours to keep.',
  },
];

const PLANS = [
  {
    id: 'pro-monthly',
    name: 'Monthly',
    price: 37,
    period: '/mo',
    description: 'Full access. Cancel anytime.',
    cta: 'Subscribe Monthly',
    highlighted: false,
    features: [
      'All 105+ playbooks',
      'PDF downloads',
      '300+ prompts',
      'New playbooks first',
      'Cancel anytime',
    ],
  },
  {
    id: 'pro-yearly',
    name: 'Yearly',
    price: 25,
    period: '/mo',
    description: '2 months free. $247/yr. Best value.',
    cta: 'Subscribe Yearly',
    highlighted: true,
    features: [
      'All 105+ playbooks',
      'PDF downloads',
      '300+ prompts',
      'New playbooks first',
      '2 months free',
    ],
  },
];

const GUARANTEES = [
  '30-day money-back guarantee. No questions asked.',
  'Cancel anytime. Your PDFs stay yours.',
  'Secure checkout via Stripe.',
  'New playbooks added every month.',
];

export default function PremiumPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleSubscribe = async (planId: string) => {
    setLoading(planId);
    setError('');

    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: planId }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to create checkout session');
      }

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,163,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.06),transparent_50%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 " />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-200 mb-6">
            <Crown className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-medium text-amber-700">Apifeny Pro</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Stop Collecting AI Tools.{' '}
            <span className="bg-gradient-to-r from-neon via-aqua to-violet-400 bg-clip-text text-transparent">
              Start Shipping.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed">
            Get every AI playbook, every step-by-step PDF, every copy-paste prompt.
            {''}
            One subscription unlocks your full AI solopreneur stack — content creation,
            coding, marketing, automation, finance, and more.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Link
              href="#plans"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neon to-aqua text-white text-sm font-semibold hover:shadow-lg hover:shadow-neon/20 transition-all"
            >
              <Crown className="w-4 h-4" />
              See Plans & Pricing
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/playbooks"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-gray-100 text-gray-800 text-sm font-semibold border border-gray-200 transition-all"
            >
              Browse Free Playbooks
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">79+</div>
              <div className="text-xs text-gray-400 mt-1">Playbooks</div>
            </div>
            <div className="w-px h-10 bg-gray-100 hidden sm:block" />
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">300+</div>
              <div className="text-xs text-gray-400 mt-1">AI Prompts</div>
            </div>
            <div className="w-px h-10 bg-gray-100 hidden sm:block" />
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">$9</div>
              <div className="text-xs text-gray-400 mt-1">Per Playbook or Free</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Everything You Need to Ship with AI
            </h2>
            <p className="text-sm text-gray-600 max-w-xl mx-auto">
              Playbooks aren&apos;t just tutorials — they&apos;re repeatable systems that turn AI tools into real results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-gray-300/30 bg-gray-50/40 p-5 hover:border-gray-200 hover:bg-gray-50/60 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-neon/10 border border-neon/20 flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-neon-light" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Simple Pricing. No Surprises.
            </h2>
            <p className="text-sm text-gray-600 max-w-lg mx-auto">
              Stop paying per playbook. Get everything for one simple subscription.
              Or buy individual playbooks starting at $9.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-xl border p-6 relative ${
                  plan.highlighted
                    ? 'border-neon/40 bg-gradient-to-b from-neon/5 to-tech-800/60 ring-1 ring-neon/20'
                    : 'border-gray-300/30 bg-gray-50/40'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-neon to-aqua text-gray-900 text-[10px] font-bold">
                    Best Value
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-bold text-white">${plan.price}</span>
                    <span className="text-gray-400 text-sm">{plan.period}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{plan.description}</p>
                </div>

                <ul className="space-y-2 mb-5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs text-gray-700">
                      <CheckCircle className="w-3.5 h-3.5 text-neon-light shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={loading === plan.id}
                  className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-neon to-aqua text-gray-900 hover:shadow-lg hover:shadow-neon/20'
                      : 'bg-gray-100 hover:bg-gray-200 text-white border border-gray-200'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading === plan.id ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <>
                      <Crown className="w-4 h-4" />
                      {plan.cta}
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          {error && (
            <div className="mt-4 max-w-md mx-auto text-center p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <p className="text-xs text-rose-400">{error}</p>
            </div>
          )}

          {/* Individual prices */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400 mb-3">
              Or buy individual playbooks starting at <span className="text-gray-700 font-semibold">$9</span> one-time
            </p>
            <Link
              href="/playbooks"
              className="inline-flex items-center gap-1.5 text-xs text-neon-light hover:text-neon transition"
            >
              Browse all playbooks
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="pb-16 sm:pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-xl border border-gray-300/30 bg-gray-50/30 p-6 sm:p-8">
            <Shield className="w-10 h-10 text-neon/60 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white mb-3">Vibe Checked. Results Backed.</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-lg mx-auto">
              {GUARANTEES.map((g) => (
                <div key={g} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-neon-light shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600">{g}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <p className="text-xs text-gray-400 mb-3">Still exploring?</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/playbooks"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white hover:bg-gray-100 text-gray-700 text-xs font-medium border border-gray-200 transition-all"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Free Playbooks
              </Link>
              <Link
                href="/revenue"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white hover:bg-gray-100 text-gray-700 text-xs font-medium border border-gray-200 transition-all"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                Revenue Tracker
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
