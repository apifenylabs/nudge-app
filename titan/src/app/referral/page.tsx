import { Metadata } from 'next';
import Link from 'next/link';
import {
  Zap, Gift, Users, TrendingUp, DollarSign, Star, ShieldCheck,
  ArrowRight, Sparkles, Copy, CheckCircle, ExternalLink
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Referral Program — Titan AI Agent Platform',
  description: 'Earn 20% recurring commission by referring builders to Titan. Share your unique link, get paid monthly. No cap, no limit.',
  openGraph: {
    title: 'Titan Affiliate & Referral Program — Earn 20% Recurring',
    description: 'Share Titan with fellow AI agent builders and earn 20% recurring commission on every paid plan. No limits, monthly payouts.',
    type: 'website',
  },
};

const BENEFITS = [
  {
    icon: <DollarSign className="w-8 h-8 text-emerald-500" />,
    title: '20% Recurring Commission',
    desc: 'Earn 20% of every payment from your referrals — month after month, as long as they stay. No one-time capped payouts.',
  },
  {
    icon: <Users className="w-8 h-8 text-sky-500" />,
    title: 'No Earnings Cap',
    desc: 'Refer 10 users or 1,000 — there is no ceiling. Your earnings grow linearly with your network.',
  },
  {
    icon: <Gift className="w-8 h-8 text-purple-500" />,
    title: 'Monthly Payouts',
    desc: 'Get paid every 30 days via PayPal, Stripe, or bank transfer. Minimum $50 payout threshold.',
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-rose-500" />,
    title: 'Real-Time Dashboard',
    desc: 'Track your referrals, conversions, and earnings in real time. No guessing, no delayed reports.',
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-amber-500" />,
    title: '90-Day Cookie Window',
    desc: 'If someone clicks your link but signs up 3 months later — you still get credit. Fair attribution, no rush.',
  },
  {
    icon: <Star className="w-8 h-8 text-indigo-500" />,
    title: 'Top Referrer Bonuses',
    desc: 'Quarterly bonuses for the top 10 referrers — extra cash, Titan swag, and early access to new features.',
  },
];

const TIERS = [
  { level: 'Bronze', referrals: '1–5', reward: '20% recurring', color: 'text-amber-600' },
  { level: 'Silver', referrals: '6–20', reward: '22% recurring + monthly shoutout', color: 'text-gray-300' },
  { level: 'Gold', referrals: '21–50', reward: '25% recurring + swag pack', color: 'text-yellow-500' },
  { level: 'Diamond', referrals: '51–100', reward: '28% recurring + Titan hoodie', color: 'text-cyan-400' },
  { level: 'God-Tier', referrals: '100+', reward: '30% recurring + VIP support + early access', color: 'text-amber-400' },
];

const FAQ = [
  {
    q: 'Who can join the referral program?',
    a: 'Anyone! Developers, content creators, AI enthusiasts, agencies, and enterprise partners. If you know someone who builds AI agents, you can earn from sharing Titan.',
  },
  {
    q: 'How do I get my referral link?',
    a: 'Sign up for a free Titan account, visit the Dashboard > Referrals tab, and copy your unique link. You can share it anywhere — social media, blog posts, YouTube, Discord.',
  },
  {
    q: 'When do I get paid?',
    a: 'Payouts are processed within 7 days of each 30-day cycle. You need at least $50 in earned commission to receive a payout. Payments are sent via PayPal, Stripe, or direct bank transfer.',
  },
  {
    q: 'Do I earn on upgrades too?',
    a: 'Yes. If your referral starts on the Free tier and upgrades to Starter or Pro later, you earn 20% on their new plan price too. It applies to all plan changes going forward.',
  },
  {
    q: 'Can I refer myself?',
    a: 'No. Self-referrals, fraudulent signups, or gaming the system result in forfeited commissions and account suspension. We verify every conversion.',
  },
  {
    q: 'Is there a dashboard to track earnings?',
    a: 'Yes. Every referrer gets a private dashboard with real-time stats: clicks, signups, conversions, active referrals, pending payouts, and lifetime earnings.',
  },
];

export default function ReferralPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-20 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/30 border border-emerald-700/30 text-emerald-300 text-sm font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Now Open — Titan Referral Program
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-amber-400 to-purple-400 bg-clip-text text-transparent">
            Earn 20% Recurring
          </h1>
          <p className="text-xl text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed">
            Share Titan with AI agent builders and earn <span className="text-emerald-400 font-semibold">20% recurring commission</span> on every plan they pay for. No cap, no limit, monthly payouts.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              href="#join"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl font-semibold hover:from-emerald-400 hover:to-teal-500 transition-all shadow-lg shadow-emerald-500/20"
            >
              Join the Program
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-xl font-semibold hover:bg-gray-700 transition-all border border-gray-700"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl bg-gray-800/40 border border-gray-700/40">
            <div className="text-3xl font-bold text-emerald-400">20%</div>
            <div className="text-gray-400 text-sm mt-1">Recurring Commission</div>
          </div>
          <div className="p-4 rounded-xl bg-gray-800/40 border border-gray-700/40">
            <div className="text-3xl font-bold text-purple-400">∞</div>
            <div className="text-gray-400 text-sm mt-1">No Earnings Cap</div>
          </div>
          <div className="p-4 rounded-xl bg-gray-800/40 border border-gray-700/40">
            <div className="text-3xl font-bold text-sky-400">30d</div>
            <div className="text-gray-400 text-sm mt-1">Payout Cycle</div>
          </div>
          <div className="p-4 rounded-xl bg-gray-800/40 border border-gray-700/40">
            <div className="text-3xl font-bold text-amber-400">90d</div>
            <div className="text-gray-400 text-sm mt-1">Cookie Window</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-6 py-16 bg-gray-900/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
            Three simple steps to start earning recurring revenue by sharing Titan.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-gray-800/40 border border-gray-700/40">
              <div className="w-14 h-14 rounded-full bg-emerald-900/40 border border-emerald-700/40 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-400">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Sign Up Free</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Create a free Titan account and navigate to your Referral Dashboard. Your unique referral link is generated automatically.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-800/40 border border-gray-700/40">
              <div className="w-14 h-14 rounded-full bg-purple-900/40 border border-purple-700/40 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-400">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Share Your Link</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Post it on Twitter/X, LinkedIn, YouTube, your blog, or Discord. Every click is tracked with a 90-day attribution window.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-800/40 border border-gray-700/40">
              <div className="w-14 h-14 rounded-full bg-amber-900/40 border border-amber-700/40 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-amber-400">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Earn Monthly</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Get paid every 30 days. Recurring 20% on every payment your referrals make — as long as they stay, you get paid.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b) => (
              <div key={b.title} className="p-6 rounded-xl bg-gray-800/40 border border-gray-700/40 hover:border-emerald-500/20 transition-all group">
                <div className="mb-4 group-hover:scale-110 transition-transform">{b.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{b.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="px-6 py-16 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Referral Tiers</h2>
          <p className="text-gray-400 text-center mb-10 max-w-xl mx-auto">
            The more you refer, the higher your commission rate climbs. Inspired by Titan&apos;s own progression system.
          </p>
          <div className="space-y-4">
            {TIERS.map((t) => (
              <div key={t.level} className="flex items-center justify-between p-4 rounded-xl bg-gray-800/40 border border-gray-700/40">
                <div className="flex items-center gap-3">
                  <span className={`font-bold ${t.color}`}>{t.level}</span>
                  <span className="text-gray-500 text-sm">{t.referrals} referrals</span>
                </div>
                <span className="text-sm text-gray-300 text-right">{t.reward}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Referral Link */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
          <Copy className="w-8 h-8 mx-auto mb-4 text-emerald-400" />
          <h2 className="text-2xl font-bold text-center mb-2">Your Referral Link</h2>
          <p className="text-gray-400 text-center mb-6 max-w-md mx-auto">
            After signing up, your unique link will look like this — ready to share anywhere.
          </p>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-700/40 border border-gray-600/40">
            <code className="flex-1 text-sm text-emerald-300 font-mono break-all">
              titan.build/refer?ref=yourname
            </code>
            <button className="shrink-0 p-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition-colors" title="Copy example link">
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <p className="text-gray-500 text-xs mt-3 text-center">
            You&apos;ll get your real link after creating a free account.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 bg-gray-900/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <details key={item.q} className="group p-4 rounded-xl bg-gray-800/40 border border-gray-700/40 open:border-emerald-700/40 transition-all">
                <summary className="flex items-center justify-between cursor-pointer font-medium text-gray-200 group-open:text-emerald-300">
                  {item.q}
                  <span className="shrink-0 ml-2 text-gray-500 group-open:rotate-180 transition-transform">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </span>
                </summary>
                <p className="mt-4 text-gray-400 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section id="join" className="px-6 pb-20 pt-8">
        <div className="max-w-3xl mx-auto text-center p-10 rounded-2xl bg-gradient-to-br from-emerald-900/30 to-gray-900 border border-emerald-700/30">
          <Gift className="w-12 h-12 mx-auto mb-4 text-emerald-400" />
          <h2 className="text-2xl font-bold mb-2">Ready to Start Earning?</h2>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            Create a free Titan account, grab your referral link, and start sharing. No approval needed — you&apos;re live the moment you sign up.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl font-semibold hover:from-emerald-400 hover:to-teal-500 transition-all shadow-lg shadow-emerald-500/20"
            >
              Create Free Account
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-xl font-semibold hover:bg-gray-700 transition-all border border-gray-700"
            >
              Learn More About Titan
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-gray-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <span className="font-semibold">Titan</span>
          </div>
          <nav className="flex gap-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
            <Link href="/changelog" className="hover:text-gray-300 transition-colors">Changelog</Link>
            <Link href="/about" className="hover:text-gray-300 transition-colors">About</Link>
            <Link href="/compare" className="hover:text-gray-300 transition-colors">Compare</Link>
          </nav>
          <p className="text-gray-500 text-sm">Phase 6 — Visual Progression & Robotics Bridge</p>
        </div>
      </footer>
    </div>
  );
}
