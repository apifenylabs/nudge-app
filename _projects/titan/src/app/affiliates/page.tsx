"use client";

import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────────────────────
   Affiliate / Referral Page — Static content, no DB needed
   ───────────────────────────────────────────────────────────── */

interface PlanCard {
  name: string;
  commission: string;
  rate: string;
  color: string;
  popular?: boolean;
}

const plans: PlanCard[] = [
  {
    name: "Starter",
    commission: "15% recurring",
    rate: "First 5 sales/month",
    color: "from-slate-500 to-slate-600",
  },
  {
    name: "Pro",
    commission: "20% recurring",
    rate: "6–20 sales/month",
    color: "from-cyan-500 to-blue-600",
    popular: true,
  },
  {
    name: "Elite",
    commission: "25% recurring",
    rate: "21+ sales/month",
    color: "from-purple-500 to-pink-600",
  },
];

const benefits = [
  {
    icon: "💰",
    title: "Recurring Commissions",
    desc: "Earn every month as long as your referrals stay subscribed. No one-time cap.",
  },
  {
    icon: "📊",
    title: "Real-Time Dashboard",
    desc: "Track clicks, signups, and commissions in your personal affiliate dashboard.",
  },
  {
    icon: "🛠️",
    title: "Marketing Assets",
    desc: "Banners, email templates, comparison tables — everything you need to convert.",
  },
  {
    icon: "🎯",
    title: "Dedicated Support",
    desc: "Affiliate manager assigned at Pro tier. Priority support for Elite partners.",
  },
  {
    icon: "🚀",
    title: "Early Access",
    desc: "Be the first to know about new features, beta programs, and promotional periods.",
  },
  {
    icon: "🏆",
    title: "Leaderboard Bonuses",
    desc: "Top affiliates each quarter earn cash bonuses + exclusive Titan swag.",
  },
];

const faqs = [
  {
    q: "Who can join the affiliate program?",
    a: "Anyone with an audience interested in AI agents, no-code tools, or developer tooling. Content creators, YouTubers, bloggers, newsletter writers, and community builders are welcome.",
  },
  {
    q: "How are commissions paid?",
    a: "Payouts are processed monthly via PayPal or Stripe, with a minimum threshold of $50. Payments go out within 5 business days after month-end.",
  },
  {
    q: "What counts as a referral?",
    a: "A paid subscription started through your unique affiliate link. The cookie window is 60 days — if someone clicks your link and subscribes within 60 days, you get credit.",
  },
  {
    q: "Do I earn on upsells?",
    a: "Yes! You earn commission on the initial subscription AND any upgrades the referred user makes, as long as they remain an active customer.",
  },
  {
    q: "Can I promote Titan on social media?",
    a: "Absolutely. We encourage it. Use your affiliate link in YouTube descriptions, Twitter threads, LinkedIn posts, TikTok, and Instagram. Just no paid ads on your affiliate link without prior approval.",
  },
  {
    q: "How do I get started?",
    a: "Click the 'Join Affiliate Program' button below, fill out the brief application, and you'll receive your unique referral link within 24 hours.",
  },
];

/* ─────────────────────────────────────────────────────────────
   Page Component
   ───────────────────────────────────────────────────────────── */
export default function AffiliatesPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#08080f] text-white">
      {/* ─── NAV (matches homepage) ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#08080fe0] backdrop-blur-xl border-b border-[#1e293b]/50"
            : "bg-transparent"
        }`}
      >
        <div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="text-2xl">🗡️</span>
              <span className="text-lg font-bold">
                <span className="text-cyan-400">Ti</span>
                <span className="text-purple-400">tan</span>
              </span>
            </a>

            <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
              <a href="/features" className="hover:text-cyan-400 transition-colors">Features</a>
              <a href="/pricing" className="hover:text-cyan-400 transition-colors">Pricing</a>
              <a href="/robotics" className="hover:text-cyan-400 transition-colors">Robotics</a>
              <a href="/affiliates" className="text-cyan-400 transition-colors">Affiliates</a>
            </div>

            <button className="hidden md:inline-flex px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
              Launch App
            </button>

            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <span className={`block h-[2px] w-6 rounded bg-slate-300 transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block h-[2px] w-6 rounded bg-slate-300 transition-all duration-300 ${mobileOpen ? "opacity-0 scale-0" : ""}`} />
              <span className={`block h-[2px] w-6 rounded bg-slate-300 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </button>
          </div>

          <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="mx-4 sm:mx-6 mb-3 rounded-2xl border border-[#1e293b]/60 bg-[#08080ff0] backdrop-blur-xl p-5 space-y-1">
              <a href="/features" onClick={closeMobile} className="block px-4 py-3 rounded-xl text-sm text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all">Features</a>
              <a href="/pricing" onClick={closeMobile} className="block px-4 py-3 rounded-xl text-sm text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all">Pricing</a>
              <a href="/robotics" onClick={closeMobile} className="block px-4 py-3 rounded-xl text-sm text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all">Robotics</a>
              <a href="/affiliates" onClick={closeMobile} className="block px-4 py-3 rounded-xl text-sm text-cyan-400 bg-cyan-500/5 transition-all">Affiliates</a>
              <div className="pt-2">
                <button onClick={closeMobile} className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
                  Launch App
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-1/4 left-[10%] w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/3 right-[10%] w-80 h-80 rounded-full bg-purple-600/5 blur-3xl animate-pulse pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-medium mb-6">
            🔗 Partner Program
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
            Earn{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              25% Recurring
            </span>{" "}
            on Every Referral
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
            Turn your audience into passive income. Join the Titan Affiliate Program and earn recurring commissions every month your referrals stay active.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#join"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              Join Affiliate Program →
            </a>
            <a
              href="#faq"
              className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 font-semibold hover:border-slate-500 transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* ─── COMMISSION TIERS ─── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">Commission Tiers</h2>
          <p className="text-slate-400 text-center mb-12 max-w-xl mx-auto">
            The more you refer, the higher your rate. Tiers reset monthly so you&apos;re always incentivized.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border ${
                  plan.popular ? "border-cyan-500/40 bg-[#0a1628]" : "border-[#1e293b] bg-[#0c0c18]"
                } p-6 flex flex-col`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-[10px] font-bold text-white tracking-wider uppercase">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                <div className={`text-3xl font-extrabold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent mb-1`}>
                  {plan.commission}
                </div>
                <p className="text-slate-500 text-sm mb-6">{plan.rate}</p>
                <ul className="space-y-2 text-sm text-slate-400 flex-1 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">✓</span>
                    Recurring monthly commission
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">✓</span>
                    60-day attribution cookie
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">✓</span>
                    Real-time dashboard
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">✓</span>
                    Marketing assets included
                  </li>
                </ul>
                <a
                  href="#join"
                  className={`w-full text-center py-2.5 rounded-xl font-semibold text-sm transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg hover:shadow-cyan-500/30"
                      : "border border-slate-700 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  {plan.popular ? "Get Started" : `Go ${plan.name}`}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BENEFITS GRID ─── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">Why Partner With Titan?</h2>
          <p className="text-slate-400 text-center mb-12 max-w-xl mx-auto">
            Everything you need to succeed as an affiliate partner.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-xl border border-[#1e293b] bg-[#0c0c18] p-5 hover:border-cyan-500/20 transition-all group"
              >
                <div className="text-2xl mb-3 group-hover:scale-110 transition-transform">{b.icon}</div>
                <h3 className="font-semibold mb-1">{b.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">How It Works</h2>
          <p className="text-slate-400 text-center mb-12 max-w-xl mx-auto">
            Three simple steps to start earning.
          </p>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Apply", desc: "Fill out the quick application form. We review and approve within 24 hours." },
              { step: "2", title: "Share", desc: "Get your unique referral link. Share it on your blog, social media, or newsletter." },
              { step: "3", title: "Earn", desc: "Earn recurring commissions every month your referrals stay subscribed. No cap." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── JOIN FORM ─── */}
      <section id="join" className="py-20 px-4">
        <div className="max-w-lg mx-auto">
          <div className="rounded-2xl border border-[#1e293b] bg-[#0c0c18] p-8 text-center">
            <div className="text-4xl mb-4">🔗</div>
            <h2 className="text-2xl font-bold mb-2">Join the Affiliate Program</h2>
            <p className="text-slate-400 text-sm mb-6">
              Drop your email and we&apos;ll send you the application link and full partner kit.
            </p>
            {submitted ? (
              <div className="py-4 px-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm">
                ✅ Thanks! Check your email for the application link and partner kit.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#12121f] border border-[#1e293b] text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 text-sm"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                >
                  Send Application Link
                </button>
                <p className="text-[10px] text-slate-600">
                  No spam. We&apos;ll send one email with your application link.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-center mb-12 max-w-xl mx-auto">
            Everything you need to know about the affiliate program.
          </p>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="group rounded-xl border border-[#1e293b] bg-[#0c0c18] overflow-hidden">
                <summary className="px-5 py-4 font-medium text-sm cursor-pointer list-none flex items-center justify-between hover:text-cyan-400 transition-colors">
                  {faq.q}
                  <span className="text-slate-500 group-open:rotate-180 transition-transform text-lg">▾</span>
                </summary>
                <div className="px-5 pb-4 text-sm text-slate-400 leading-relaxed border-t border-[#1e293b] pt-3">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-[#0a1628] to-[#100a1a] p-10">
          <h2 className="text-3xl font-bold mb-3">Ready to Start Earning?</h2>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            Join hundreds of affiliates earning recurring commissions by sharing Titan with their audience.
          </p>
          <a
            href="#join"
            className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
          >
            Get Your Affiliate Link →
          </a>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-[#1e293b] py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <span>© 2026 Titan. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="/features" className="hover:text-slate-400 transition-colors">Features</a>
            <a href="/pricing" className="hover:text-slate-400 transition-colors">Pricing</a>
            <a href="/affiliates" className="hover:text-slate-400 transition-colors">Affiliates</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
