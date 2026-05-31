"use client";

import { useState, useCallback } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { track } from "@vercel/analytics";
import { Check, X, HelpCircle, Shield, Sparkles, ChevronRight, Star, Zap, Crown, CreditCard, RefreshCw, Lock, ArrowLeft } from "lucide-react";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import FaqPageJsonLd from "@/components/seo/FaqPageJsonLd";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type BillingPeriod = "monthly" | "yearly";

interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  description: string;
  cta: string;
  popular: boolean;
  priceId: string;
  features: { text: string; included: boolean }[];
  color: string;
  gradient: string;
  icon: React.ReactNode;
}

const PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Get started with a single agent",
    price: "$0",
    period: "/forever",
    description: "Perfect for exploring Titan. No credit card required.",
    cta: "Get Started Free",
    popular: false,
    priceId: "price_free",
    features: [
      { text: "1 active agent", included: true },
      { text: "Basic Skill Forge builder", included: true },
      { text: "Standard progression & XP tracking", included: true },
      { text: "1 default mascot skin", included: true },
      { text: "Community access", included: true },
      { text: "Advanced Skill Forge + audit", included: false },
      { text: "Skill certification (gold/silver/bronze)", included: false },
      { text: "Full analytics dashboard", included: false },
      { text: "Export skills to OpenClaw", included: false },
      { text: "Premium mascot skins", included: false },
      { text: "API access", included: false },
      { text: "Priority support", included: false },
    ],
    color: "from-gray-500 to-gray-400",
    gradient: "",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    id: "pro-monthly",
    name: "Pro",
    tagline: "Unlock your swarm's full potential",
    price: "$29",
    period: "/month",
    description: "For power users who need more agents, certifications, and deeper analytics.",
    cta: "Subscribe Monthly",
    popular: true,
    priceId: "price_pro_monthly",
    features: [
      { text: "5 concurrent agents", included: true },
      { text: "Advanced Skill Forge + audit", included: true },
      { text: "Skill certification (gold/silver/bronze)", included: true },
      { text: "Full analytics dashboard", included: true },
      { text: "Export skills to OpenClaw", included: true },
      { text: "3 premium mascot skins", included: true },
      { text: "API access", included: true },
      { text: "Priority support", included: true },
      { text: "Unlimited agents", included: false },
      { text: "Custom integrations", included: false },
      { text: "SLA guarantee", included: false },
      { text: "Dedicated support", included: false },
    ],
    color: "from-teal-400 to-amber-500",
    gradient: "bg-gradient-to-br from-teal-500/10 to-amber-500/10",
    icon: <Crown className="h-5 w-5" />,
  },
  {
    id: "pro-yearly",
    name: "Pro Yearly",
    tagline: "Save 17% — two months free",
    price: "$290",
    period: "/year ($24.17/mo)",
    description: "The best value for committed power users. All Pro features at a discount.",
    cta: "Subscribe Yearly",
    popular: false,
    priceId: "price_pro_yearly",
    features: [
      { text: "5 concurrent agents", included: true },
      { text: "Advanced Skill Forge + audit", included: true },
      { text: "Skill certification (gold/silver/bronze)", included: true },
      { text: "Full analytics dashboard", included: true },
      { text: "Export skills to OpenClaw", included: true },
      { text: "3 premium mascot skins", included: true },
      { text: "API access", included: true },
      { text: "Priority support", included: true },
      { text: "2 months free — Save $58", included: true },
      { text: "Unlimited agents", included: false },
      { text: "Custom integrations", included: false },
      { text: "SLA guarantee", included: false },
    ],
    color: "from-purple-400 to-teal-400",
    gradient: "bg-gradient-to-br from-purple-500/10 to-teal-500/10",
    icon: <Star className="h-5 w-5" />,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For teams with compliance needs",
    price: "Custom",
    period: "",
    description: "Teams and organizations that need unlimited agents, custom integrations, and SLAs.",
    cta: "Contact Sales",
    popular: false,
    priceId: "price_enterprise",
    features: [
      { text: "Unlimited agents", included: true },
      { text: "Advanced Skill Forge + audit", included: true },
      { text: "Skill certification (gold/silver/bronze)", included: true },
      { text: "Full analytics dashboard", included: true },
      { text: "Export skills to OpenClaw", included: true },
      { text: "All premium mascot skins", included: true },
      { text: "API access + rate limits", included: true },
      { text: "Dedicated support", included: true },
      { text: "Custom integrations", included: true },
      { text: "SLA guarantee (99.9%)", included: true },
      { text: "Team audit trails", included: true },
      { text: "Onboarding & training", included: true },
    ],
    color: "from-amber-400 to-rose-500",
    gradient: "bg-gradient-to-br from-amber-500/10 to-rose-500/10",
    icon: <Shield className="h-5 w-5" />,
  },
];

const FEATURE_COMPARISON = [
  { category: "Agents", features: [
    { name: "Active agents", free: "1", pro: "5", enterprise: "Unlimited" },
    { name: "Agent memory (KB)", free: "64 KB", pro: "512 KB", enterprise: "Custom" },
    { name: "Concurrent runs", free: "1", pro: "5", enterprise: "Unlimited" },
  ]},
  { category: "Skills & Certification", features: [
    { name: "Skill Forge builder", free: "Basic", pro: "Advanced", enterprise: "Advanced" },
    { name: "Skill certification", free: "—", pro: "Gold / Silver / Bronze", enterprise: "Gold / Silver / Bronze" },
    { name: "Custom skill templates", free: "—", pro: "✓", enterprise: "✓" },
  ]},
  { category: "Mascots & Skins", features: [
    { name: "Mascot companions", free: "1", pro: "All 5", enterprise: "All 5" },
    { name: "Premium skins", free: "1 (default)", pro: "3 premium", enterprise: "All skins" },
    { name: "Skin marketplace access", free: "—", pro: "✓", enterprise: "✓" },
  ]},
  { category: "Platform", features: [
    { name: "API access", free: "—", pro: "✓ (100 req/hr)", enterprise: "✓ (Custom)" },
    { name: "Analytics dashboard", free: "Basic", pro: "Full", enterprise: "Full + custom" },
    { name: "Export to OpenClaw", free: "—", pro: "✓", enterprise: "✓" },
    { name: "Priority support", free: "—", pro: "Email (24h)", enterprise: "Dedicated + Slack" },
    { name: "SLA guarantee", free: "—", pro: "—", enterprise: "99.9%" },
  ]},
];

const FAQS = [
  {
    q: "Can I upgrade from Free to Pro at any time?",
    a: "Absolutely. You can upgrade anytime from your dashboard. Your Pro billing starts immediately, and you get full access to all Pro features — no waiting period.",
  },
  {
    q: "What happens if I cancel my subscription?",
    a: "You keep access to Pro features until the end of your current billing period. After that, your account reverts to the Free tier. Your agents, skills, and progress are preserved — you won't lose anything.",
  },
  {
    q: "Is there a free trial for Pro?",
    a: "Yes! Pro comes with a 14-day free trial. You won't be charged until the trial ends, and you can cancel anytime during the trial with no charge.",
  },
  {
    q: "Can I switch from monthly to yearly billing?",
    a: "Yes. You can switch anytime. The yearly plan saves you 17% ($58/year). When you switch mid-cycle, we prorate the remaining balance of your monthly plan toward the yearly subscription.",
  },
  {
    q: "Do you offer student or startup discounts?",
    a: "We offer discounted Enterprise plans for early-stage startups (under 10 employees) and verified student teams. Contact sales for details.",
  },
  {
    q: "How does the 14-day money-back guarantee work?",
    a: "If you're not satisfied with Pro within 14 days of your first payment, email support@titan.ai and we'll issue a full refund — no questions asked.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards (Visa, Mastercard, Amex, Discover) through Stripe. Enterprise customers can also pay via invoice with NET-30 terms.",
  },
  {
    q: "Is my data secure on Titan?",
    a: "Yes. We use end-to-end encryption for all agent data, OWASP-compliant security audits, and SOC 2 practices. Enterprise customers get additional audit trails and compliance reporting.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PricingPage() {
  const router = useRouter();

  const handleSubscribe = useCallback(async (plan: PricingPlan) => {
    track("pricing_subscribe_click", { plan: plan.id, price: plan.price });

    // Free plan — just redirect to signup
    if (plan.id === "free") {
      router.push("/login");
      return;
    }

    // Enterprise — contact sales
    if (plan.id === "enterprise") {
      router.push("/contact");
      return;
    }

    // Get email from localStorage mock (or prompt user)
    const storedEmail = typeof window !== "undefined"
      ? localStorage.getItem("titan_user_email") || "user@example.com"
      : "user@example.com";

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: plan.priceId,
          email: storedEmail,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  }, [router]);

  const handleTrackFaq = useCallback((question: string) => {
    track("pricing_faq_expand", { question: question.slice(0, 60) });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbJsonLd items={[
        { label: "Home", href: "/" },
        { label: "Pricing", href: "/pricing" },
      ]} />
      <FaqPageJsonLd items={FAQS} pageSlug="pricing" />
      {/* ── Navigation ── */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
            <Separator orientation="vertical" className="h-5 bg-gray-200/40" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-500 to-amber-500 flex items-center justify-center">
                <span className="text-xs font-bold text-white">T</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">Titan</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Dashboard</a>
            <Button
              size="sm"
              variant="outline"
              className="border-teal-200/30 text-teal-600 hover:bg-teal-50"
              onClick={() => router.push("/login")}
            >
              Sign In
            </Button>
          </nav>
        </div>
      </header>

      {/* ── Test Mode Badge ── */}
      <div className="bg-gradient-to-r from-amber-50 via-amber-100/20 to-amber-50 border-b border-amber-200/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-center gap-2">
          <Badge variant="outline" className="border-amber-200/30 bg-amber-50 text-amber-600 text-[10px]">
            🧪 Test Mode
          </Badge>
          <span className="text-xs text-gray-400/70">
            No real charges — Stripe is in mock mode for development
          </span>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-8 sm:pt-24 sm:pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4 border-teal-200/30 bg-teal-50 text-teal-600">
              <Sparkles className="h-3 w-3 mr-1" />
              Simple, Transparent Pricing
            </Badge>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              Choose Your{" "}
              <span className="titan-text-gradient">Tier</span>
            </h1>

            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-6">
              Start free. Upgrade when you need more agents, skills, and power.
              No hidden fees, no surprises.
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-teal-500" />
                No credit card for Free
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-teal-500" />
                14-day money-back guarantee
              </span>
              <span className="flex items-center gap-1">
                <Lock className="h-3 w-3 text-teal-500" />
                Secure Stripe checkout
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Pricing Cards ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
        >
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              variants={itemVariants}
              className={cn(
                "relative flex flex-col",
                plan.popular && "lg:-mt-4 lg:mb-4"
              )}
            >
              <Card
                className={cn(
                  "flex-1 flex flex-col border bg-white/40 backdrop-blur-sm hover:border-teal-200/30 transition-all duration-300 group",
                  plan.popular
                    ? "border-teal-300 ring-2 ring-teal-400 shadow-[0_0_30px_rgba(20,184,166,0.12)]"
                    : "border-gray-200/30 hover:shadow-lg"
                )}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-0 right-0 flex justify-center z-10">
                    <Badge className="bg-gradient-to-r from-teal-500 to-amber-500 text-white border-0 text-xs px-3 py-0.5">
                      <Star className="h-3 w-3 mr-1 fill-white" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                {/* Plan icon */}
                <div className="absolute top-4 right-4 opacity-[0.04] pointer-events-none">
                  <div className="text-6xl">{plan.icon}</div>
                </div>

                <CardHeader className="pb-3 relative z-[1]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={cn(
                      "w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center",
                      plan.color
                    )}>
                      {plan.icon}
                    </div>
                    <CardTitle className="text-gray-900 text-lg">{plan.name}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-500 text-sm">
                    {plan.tagline}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col relative z-[1]">
                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-sm text-gray-400">{plan.period}</span>
                    </div>
                    <p className="text-xs text-gray-400/50 mt-1">{plan.description}</p>
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant={plan.popular ? "default" : "outline"}
                    className={cn(
                      "w-full mb-5 group/btn",
                      plan.popular
                        ? "bg-gradient-to-r from-teal-500 to-amber-500 text-white hover:from-teal-400 hover:to-amber-400 border-0"
                        : "border-gray-200/40 text-gray-500 hover:text-gray-900 hover:border-teal-200/40 hover:bg-teal-50"
                    )}
                    onClick={() => handleSubscribe(plan)}
                  >
                    {plan.cta}
                    {plan.id !== "free" && plan.id !== "enterprise" && (
                      <ChevronRight className="h-3.5 w-3.5 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
                    )}
                  </Button>

                  {/* Features */}
                  <ul className="space-y-2.5 flex-1">
                    {plan.features.map((feat, fi) => (
                      <li
                        key={fi}
                        className={cn(
                          "flex items-start gap-2 text-xs",
                          feat.included ? "text-gray-500" : "text-gray-300"
                        )}
                      >
                        {feat.included ? (
                          <Check className="h-3.5 w-3.5 text-teal-500 mt-0.5 shrink-0" />
                        ) : (
                          <X className="h-3.5 w-3.5 text-gray-200 mt-0.5 shrink-0" />
                        )}
                        {feat.text}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── 14-Day Money-Back Guarantee ── */}
      <section className="border-t border-gray-200/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/20 mb-4">
              <RefreshCw className="h-6 w-6 text-emerald-500" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              14-Day Money-Back Guarantee
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto mb-6 leading-relaxed">
              We're confident Titan will level up your productivity. If you're not satisfied
              within <strong className="text-gray-900">14 days</strong> of your first Pro payment,
              email us and we'll issue a <strong className="text-gray-900">full refund</strong>{" "}
              — no questions asked, no hassle.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-teal-500" />
                No-questions-asked refund
              </span>
              <span className="flex items-center gap-1.5">
                <CreditCard className="h-3.5 w-3.5 text-teal-500" />
                Full refund to original payment method
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-teal-500" />
                Keep your Free tier access
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Feature Comparison Table ── */}
      <section className="border-t border-gray-200/20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Compare Plans Side-by-Side
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Every feature, every tier. See exactly what you get at each level.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200/20">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium w-[200px] sm:w-[260px]">
                      Feature
                    </th>
                    <th className="text-center py-3 px-3 text-gray-400 font-medium">Free</th>
                    <th className="text-center py-3 px-3 text-gray-400 font-medium">Pro</th>
                    <th className="text-center py-3 px-3 text-gray-400 font-medium">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {FEATURE_COMPARISON.map((section, si) => (
                    <React.Fragment key={`cat-${si}`}>
                      {/* Category header */}
                      <tr className="border-b border-gray-200/10">
                        <td
                          colSpan={4}
                          className="py-3 px-4 text-xs font-semibold text-teal-600 uppercase tracking-wider"
                        >
                          {section.category}
                        </td>
                      </tr>
                      {/* Feature rows */}
                      {section.features.map((feat, fi) => (
                        <tr
                          key={`feat-${si}-${fi}`}
                          className="border-b border-gray-200/10 hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="py-2.5 px-4 text-gray-500">
                            {feat.name}
                          </td>
                          <td className="py-2.5 px-3 text-center text-gray-400">
                            {feat.free}
                          </td>
                          <td className="py-2.5 px-3 text-center text-gray-900">
                            {feat.pro}
                          </td>
                          <td className="py-2.5 px-3 text-center text-amber-600">
                            {feat.enterprise}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="border-t border-gray-200/20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <Badge variant="outline" className="mb-4 border-teal-200/20 bg-teal-50 text-teal-600">
                <HelpCircle className="h-3 w-3 mr-1" />
                FAQ
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Questions? We've Got Answers.
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Everything you need to know about billing, upgrades, and cancellations.
              </p>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <details
                  key={i}
                  className="group"
                  onClick={() => handleTrackFaq(faq.q)}
                >
                  <summary className="flex items-center justify-between gap-4 p-4 rounded-xl bg-gray-50/30 border border-gray-200/20 cursor-pointer hover:bg-gray-50/50 hover:border-teal-200/20 transition-all list-none">
                    <span className="text-sm font-medium text-gray-900 group-open:text-teal-600 transition-colors">
                      {faq.q}
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400 shrink-0 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-4 pt-2 pb-4 text-sm text-gray-500 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400 mb-3">
                Still have questions? We're here to help.
              </p>
              <Button
                variant="outline"
                className="border-teal-200/30 text-teal-600 hover:bg-teal-50"
                onClick={() => {
                  track("pricing_contact_support");
                  window.location.href = "mailto:support@titan.ai";
                }}
              >
                Contact Support
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="border-t border-gray-200/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <Card className="border-teal-200/20 bg-gradient-to-br from-teal-50 via-white to-amber-50">
              <CardContent className="p-8 sm:p-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  Ready to build your swarm?
                </h2>
                <p className="text-gray-500 mb-6">
                  Start free. No credit card. Your first agent is waiting.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-teal-500 to-amber-500 text-white hover:from-teal-400 hover:to-amber-400 border-0 group"
                    onClick={() => { track("pricing_final_cta"); router.push("/login"); }}
                  >
                    <Sparkles className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                    Build Your First Agent — Free
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-gray-200/40 text-gray-500 hover:text-gray-900 hover:border-teal-200/40"
                    onClick={() => router.push("/")}
                  >
                    Learn More
                  </Button>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Check className="h-3 w-3 text-teal-500" />
                    No credit card
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="h-3 w-3 text-teal-500" />
                    14-day guarantee
                  </span>
                  <span className="flex items-center gap-1">
                    <Lock className="h-3 w-3 text-teal-500" />
                    Secure checkout
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-200/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-teal-500 to-amber-500 flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">T</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">Titan</span>
            <span className="text-xs text-gray-400">Phasr Forge · © 2026</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <a href="/privacy" className="hover:text-gray-500 transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-gray-500 transition-colors">Terms</a>
            <span className="hidden sm:inline">Built with shadcn/ui</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
