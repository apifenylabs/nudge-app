"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DollarSign,
  Users,
  Share2,
  TrendingUp,
  Check,
  ChevronRight,
  Sparkles,
  Star,
  Diamond,
  Target,
  BarChart3,
  Gift,
  Calendar,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  ExternalLink,
  Mail,
  Award,
  Rocket,
  ClipboardList,
  Zap,
} from "lucide-react";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Sign Up Free",
    description:
      "Create your affiliate account in under 2 minutes. No approval process — start promoting immediately.",
    icon: ClipboardList,
    color: "from-teal-500 to-teal-600",
  },
  {
    step: "02",
    title: "Share Your Link",
    description:
      "Share your unique referral link across social media, YouTube, blogs, or email. We provide banners, landing pages, and email templates.",
    icon: Share2,
    color: "from-amber-500 to-amber-600",
  },
  {
    step: "03",
    title: "Earn Monthly",
    description:
      "Get paid monthly for every paying user you refer. Higher sales volume unlocks higher commission tiers automatically.",
    icon: TrendingUp,
    color: "from-purple-500 to-purple-600",
  },
];

const TIERS = [
  {
    name: "Starter",
    monthlyRange: "$0 – $1,000",
    commission: "20%",
    badge: "Get Started",
    badgeColor: "text-teal-700 bg-teal-50 border-teal-200",
    accent: "teal",
    features: [
      "Standard referral link & dashboard",
      "Monthly payouts (min. $50)",
      "Email support",
      "Standard banner assets",
    ],
  },
  {
    name: "Pro",
    monthlyRange: "$1,000 – $5,000",
    commission: "25%",
    badge: "Most Popular",
    badgeColor: "text-amber-700 bg-amber-50 border-amber-200",
    accent: "amber",
    popular: true,
    features: [
      "Everything in Starter",
      "Priority payout processing",
      "Dedicated affiliate manager",
      "Custom landing pages",
      "Early access to new products",
    ],
  },
  {
    name: "Elite",
    monthlyRange: "$5,000+",
    commission: "30%",
    badge: "Top Tier",
    badgeColor: "text-purple-700 bg-purple-50 border-purple-200",
    accent: "purple",
    features: [
      "Everything in Pro",
      "Bi-weekly payouts",
      "Co-marketing opportunities",
      "Custom swag & assets",
      "Quarterly strategy calls",
      "Beta access to new features",
    ],
  },
];

const FAQS = [
  {
    q: "How does the recurring commission work?",
    a: "When someone you refer signs up for a paid Titan plan, you earn a percentage of their subscription fee every single month for as long as they remain a paying customer. If they upgrade, your commission increases too.",
  },
  {
    q: "When and how do I get paid?",
    a: "Payouts are processed monthly via PayPal, Wise, or bank transfer once you cross the $50 minimum threshold. Pro affiliates get priority processing, Elite affiliates can opt for bi-weekly payouts.",
  },
  {
    q: "What counts as a qualified referral?",
    a: "A qualified referral is a new user who signs up through your unique affiliate link and purchases any paid Titan plan within 90 days. Existing users and self-referrals are excluded.",
  },
  {
    q: "What promotional materials do you provide?",
    a: "We provide banners (multiple sizes), email templates, social media copy, comparison graphics, video assets, and custom landing pages — especially for Pro and Elite affiliates.",
  },
  {
    q: "Can I promote Titan on YouTube or social media?",
    a: "Absolutely. Many of our top affiliates run YouTube tutorials, Twitter threads, and LinkedIn posts about AI agent building. We encourage authentic, value-first content. Just use your affiliate link in the description or bio.",
  },
  {
    q: "Is there a cookie duration?",
    a: "Yes. Our cookie lasts 90 days. If a potential customer clicks your link and purchases within 90 days (even if they browse away and come back), you still earn the commission.",
  },
];

function FAQItem({
  question,
  answer,
  defaultOpen,
}: {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-medium text-gray-900 pr-4">
          {question}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-5 pb-4">
          <p className="text-sm text-gray-500 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function AffiliatePageClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setEmailSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ── Navigation ── */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-amber-500 flex items-center justify-center">
              <span className="text-sm font-bold text-white">T</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">Titan</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#how-it-works" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              How It Works
            </a>
            <a href="#tiers" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Commission Tiers
            </a>
            <a href="#faq" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              FAQ
            </a>
            <a href="https://apifeny.ai/affiliate-signup" target="_blank" rel="noopener noreferrer">
              <Button size="sm">
                Join Free
                <ExternalLink className="h-3 w-3 ml-1.5" />
              </Button>
            </a>
          </nav>
          <div className="flex md:hidden items-center gap-2">
            <a href="https://apifeny.ai/affiliate-signup" target="_blank" rel="noopener noreferrer">
              <Button size="sm">
                Join Free
                <ExternalLink className="h-3 w-3 ml-1.5" />
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-teal-50/60 to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-amber-50/60 to-transparent" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-50">
              <Sparkles className="h-3 w-3 mr-1" />
              Affiliate Program — Now Open
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-4 leading-tight">
              Earn{" "}
              <span className="bg-gradient-to-r from-teal-600 to-amber-500 bg-clip-text text-transparent">
                20% Recurring Commission
              </span>
              <br />
              Promoting AI Agents
            </h1>

            <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-8 leading-relaxed">
              Titan is the fastest-growing AI agent platform with a built-in referral engine.
              Share what you build, earn on every paying user you bring in — month after month.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href="https://apifeny.ai/affiliate-signup"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="w-full sm:w-auto group">
                  <Rocket className="h-4 w-4 mr-2 group-hover:-translate-y-0.5 transition-transform" />
                  Become an Affiliate — Free
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </a>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  const el = document.getElementById("how-it-works");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto"
              >
                See How It Works
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-teal-500" />
                Free to join
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-teal-500" />
                No minimum sales
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-teal-500" />
                90-day cookie window
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-teal-500" />
                Monthly payouts
              </span>
            </div>
          </div>

          {/* ── Stats Row ── */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {[
              { icon: <DollarSign className="h-4 w-4" />, value: "20-30%", label: "Commission", sub: "recurring" },
              { icon: <Users className="h-4 w-4" />, value: "3", label: "Commission Tiers", sub: "Starter → Elite" },
              { icon: <Calendar className="h-4 w-4" />, value: "90", label: "Cookie Duration", sub: "days" },
              { icon: <BarChart3 className="h-4 w-4" />, value: "Real-time", label: "Dashboard", sub: "track every click" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center p-3 rounded-xl bg-gray-50 border border-gray-100"
              >
                <div className="text-gray-400 mb-1">{stat.icon}</div>
                <span className="text-xl font-bold text-gray-900">{stat.value}</span>
                <span className="text-xs text-gray-500 mt-0.5">{stat.label}</span>
                {stat.sub && <span className="text-[10px] text-gray-400">{stat.sub}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Three steps to start earning
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              No complicated onboarding. Join, share, and earn recurring commissions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className="h-full border-gray-200 hover:border-gray-300 hover:shadow-md transition-all">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-4`}
                    >
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="w-10 h-6 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                      <span className="text-[10px] font-bold text-gray-500">
                        Step {step.step}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Promote Titan ── */}
      <section className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-amber-200 bg-amber-50 text-amber-700">
              <Target className="h-3 w-3 mr-1" />
              Why Titan Affiliates Win
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Your audience already wants this
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              AI agents are the hottest category in tech. Titan makes them accessible,
              fun, and profitable — for both you and the people you refer.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              {
                icon: <TrendingUp className="h-5 w-5" />,
                title: "Recurring Revenue",
                description:
                  "Earn every month as long as your referrals stay subscribed. No one-time payout caps.",
                color: "text-teal-600",
                bg: "bg-teal-50",
              },
              {
                icon: <Diamond className="h-5 w-5" />,
                title: "Climbing Tiers",
                description:
                  "The more you sell, the higher your commission rate. Hit Elite for 30% recurring.",
                color: "text-amber-600",
                bg: "bg-amber-50",
              },
              {
                icon: <Gift className="h-5 w-5" />,
                title: "Creator Assets",
                description:
                  "Professional banners, landing pages, email sequences, and video scripts ready to go.",
                color: "text-purple-600",
                bg: "bg-purple-50",
              },
              {
                icon: <BarChart3 className="h-5 w-5" />,
                title: "Real-Time Dashboard",
                description:
                  "Track clicks, signups, and commissions in real time. No more guessing.",
                color: "text-cyan-600",
                bg: "bg-cyan-50",
              },
              {
                icon: <Award className="h-5 w-5" />,
                title: "Top-Performer Bonuses",
                description:
                  "Quarterly cash bonuses for top referrers. Plus exclusive Titan swag and early access.",
                color: "text-rose-600",
                bg: "bg-rose-50",
              },
              {
                icon: <Zap className="h-5 w-5" />,
                title: "Zero-Risk Trial",
                description:
                  "Your referrals get a free tier too. They don't need to buy to start — you earn when they upgrade.",
                color: "text-emerald-600",
                bg: "bg-emerald-50",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <Card className="h-full border-gray-200 hover:border-gray-300 hover:shadow-md transition-all group">
                  <CardContent className="p-6">
                    <div
                      className={`w-10 h-10 rounded-lg ${feature.bg} ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Commission Tiers ── */}
      <section id="tiers" className="border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-teal-200 bg-teal-50 text-teal-700">
              <TrendingUp className="h-3 w-3 mr-1" />
              Commission Tiers
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Earn more as you grow
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Commission rates increase automatically based on your monthly sales volume.
              Every dollar billed qualifies toward the next tier.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TIERS.map((tier) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <Card
                  className={`relative h-full border ${
                    tier.popular
                      ? "border-teal-200 shadow-lg shadow-teal-100/50"
                      : "border-gray-200"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-0 right-0 flex justify-center">
                      <Badge className="bg-gradient-to-r from-teal-500 to-amber-500 text-white border-0">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardContent className={`p-6 ${tier.popular ? "pt-8" : "pt-6"}`}>
                    {/* Tier name */}
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{tier.name}</h3>

                    {/* Commission badge */}
                    <div className="mb-1">
                      <span className="text-4xl font-extrabold text-gray-900">
                        {tier.commission}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">commission</span>
                    </div>

                    {/* Monthly range */}
                    <p className="text-xs text-gray-500 mb-4">
                      {tier.monthlyRange} / month in sales
                    </p>

                    {/* Badge */}
                    <Badge variant="outline" className={`mb-5 ${tier.badgeColor}`}>
                      {tier.badge}
                    </Badge>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                          <Check className="h-4 w-4 text-teal-500 mt-0.5 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <a
                      href="https://apifeny.ai/affiliate-signup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button
                        variant={tier.popular ? "default" : "outline"}
                        className="w-full"
                      >
                        Join as {tier.name}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section id="faq" className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <Badge variant="outline" className="mb-4 border-purple-200 bg-purple-50 text-purple-700">
                <HelpCircle className="h-3 w-3 mr-1" />
                Frequently Asked Questions
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Everything you need to know
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Got more questions? Reach out to{" "}
                <a
                  href="mailto:affiliates@apifeny.ai"
                  className="text-teal-600 hover:text-teal-700 underline underline-offset-2"
                >
                  affiliates@apifeny.ai
                </a>
              </p>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <FAQItem
                  key={i}
                  question={faq.q}
                  answer={faq.a}
                  defaultOpen={i === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer CTA with Email Capture ── */}
      <section className="border-t border-gray-100 bg-gradient-to-br from-teal-50/30 via-white to-amber-50/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <motion.div
            className="max-w-xl mx-auto text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-4 border-teal-200 bg-teal-50 text-teal-700">
              <Rocket className="h-3 w-3 mr-1" />
              Start Earning Today
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Ready to start earning?
            </h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Drop your email below and we&apos;ll send you everything you need to get started —
              affiliate link, assets, and your first commission guide.
            </p>

            {emailSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl border border-teal-100 shadow-sm p-8"
              >
                <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-teal-600" />
                </div>
                <p className="text-lg font-semibold text-teal-700 mb-1">
                  You&apos;re on the list! 🎉
                </p>
                <p className="text-sm text-gray-500">
                  Check your inbox for your affiliate starter kit.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400"
                />
                <Button type="submit">
                  <Mail className="h-4 w-4 mr-2" />
                  Get Started
                </Button>
              </form>
            )}

            <p className="text-xs text-gray-400 mt-6">
              <span className="font-medium text-gray-500">Free to join.</span> No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-gray-200 bg-gradient-to-br from-teal-50 to-amber-50">
            <CardContent className="p-8 sm:p-12">
              <Star className="h-8 w-8 text-amber-500 mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Join 50+ affiliates already earning
              </h2>
              <p className="text-gray-500 mb-6">
                Sign up free. Start promoting. Earn recurring commissions from day one.
              </p>
              <a
                href="https://apifeny.ai/affiliate-signup"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="group">
                  Become an Affiliate
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">Titan</span>
            <span className="text-xs text-gray-400">by Apifeny Labs · © 2026</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <a
              href="https://apifeny.ai/affiliate-signup"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition-colors"
            >
              Affiliate Login
            </a>
            <span>Powered by Apifeny.ai</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
