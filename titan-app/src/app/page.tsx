"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Swords,
  Crown,
  Zap,
  Shield,
  Orbit,
  ChevronRight,
  Check,
  Sparkles,
  Trophy,
  Users,
  TrendingUp,
  Star,
} from "lucide-react";

const FEATURES = [
  {
    icon: <Swords className="h-5 w-5" />,
    title: "Skill Forge",
    description: "Craft custom agent skills with a built-in editor. Certify them through automated audits — gold, silver, or bronze.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: <Crown className="h-5 w-5" />,
    title: "Progression System",
    description: "Earn XP, unlock tiers, and ascend through God-Tier ranks. Every action levels up your swarm.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: <Orbit className="h-5 w-5" />,
    title: "Orbital Swarm",
    description: "Visualize your agents orbiting your core. Drag-and-drop orchestration with real-time monitoring.",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "LifeOS Integration",
    description: "Travel, finance, health, productivity plugins — each with streaks, analytics, and daily check-ins.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Audit & Certify",
    description: "OWASP and TDAD compliance checks. Production-grade security for production-grade agents.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: <Trophy className="h-5 w-5" />,
    title: "Mascot Evolution",
    description: "Your companion evolves as you do. Unlock skins, outfits, and 3D tier upgrades through progression.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

const PRICING = [
  {
    name: "Free",
    price: "$0",
    description: "Get started with the basics. No credit card needed.",
    features: [
      "1 active agent",
      "Basic Skill Forge",
      "Standard progression",
      "Community access",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For power users who need more agents and deeper analytics.",
    features: [
      "5 concurrent agents",
      "Advanced Skill Forge + audit",
      "Full analytics dashboard",
      "Export skills to OpenClaw",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "Teams and organizations with compliance requirements.",
    features: [
      "Unlimited agents",
      "All Skill Forge features",
      "Team audit trails",
      "Custom integrations",
      "SLA guarantee",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const STATS = [
  { label: "Active Agents", value: "0", icon: <Bot className="h-4 w-4" /> },
  { label: "Skills Deployed", value: "0", icon: <Zap className="h-4 w-4" /> },
  { label: "Community Members", value: "0", icon: <Users className="h-4 w-4" /> },
  { label: "XP Earned", value: "0", icon: <TrendingUp className="h-4 w-4" /> },
];

export default function LandingPage() {
  const router = useRouter();

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
            <a href="#features" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Pricing</a>
            <a href="/login" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Sign In</a>
            <Button size="sm" onClick={() => router.push("/login")}>
              Get Started
            </Button>
          </nav>
          <div className="flex md:hidden items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => router.push("/login")}>
              Sign In
            </Button>
            <Button size="sm" onClick={() => router.push("/login")}>
              Start Free
            </Button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-teal-50/60 to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-amber-50/60 to-transparent" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 sm:pt-32 sm:pb-24">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-50">
              <Sparkles className="h-3 w-3 mr-1" />
              Your AI Swarm, Evolved
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
              Level Up Your
              <br />
              <span className="bg-gradient-to-r from-teal-600 to-amber-500 bg-clip-text text-transparent">
                AI Agent Swarm
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-8 leading-relaxed">
              Forge custom skills, command an orbital swarm, and climb through God-Tier ranks.
              Titan turns your AI ecosystem into a living progression system — like an RPG for your productivity.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button size="lg" onClick={() => router.push("/login")} className="w-full sm:w-auto">
                <Swords className="h-4 w-4 mr-2" />
                Enter the Forge
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => router.push("/login")} className="w-full sm:w-auto">
                Sign In
              </Button>
            </div>

            {/* Stats row */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-gray-400 mb-1">{stat.icon}</div>
                  <span className="text-xl font-bold text-gray-900">{stat.value}</span>
                  <span className="text-xs text-gray-500 mt-0.5">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Three steps to your first agent
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              No setup, no config. Start building in minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Create Your Profile", desc: "Sign up, choose your companion mascot, and define your agent's first skill.", color: "from-teal-500 to-teal-600" },
              { step: "02", title: "Forge & Deploy", desc: "Craft skills in the built-in editor, test them, and deploy to your orbital swarm.", color: "from-amber-500 to-amber-600" },
              { step: "03", title: "Earn & Ascend", desc: "Every action earns XP. Level up, unlock tiers, and grow your swarm.", color: "from-purple-500 to-purple-600" },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className="h-full border-gray-200 hover:border-gray-300 hover:shadow-md transition-all">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-4`}>
                      <span className="text-white font-bold text-lg">{step.step}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Everything you need to command your swarm
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Built for AI power users who want their tools to feel like progression.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <Card className="h-full border-gray-200 hover:border-gray-300 hover:shadow-md transition-all group">
                <CardContent className="p-6">
                  <div className={`w-10 h-10 rounded-lg ${feature.bg} ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Simple pricing. No hidden fees.
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Start free. Upgrade when you outgrow the basics.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRICING.map((plan) => (
              <Card
                key={plan.name}
                className={`relative border ${plan.popular ? 'border-teal-200 shadow-lg shadow-teal-100/50' : 'border-gray-200'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-0 right-0 flex justify-center">
                    <Badge className="bg-gradient-to-r from-teal-500 to-amber-500 text-white border-0">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6 pt-8">
                  <h3 className="font-semibold text-gray-900 mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-0.5 mb-2">
                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                    {plan.period && <span className="text-sm text-gray-500">{plan.period}</span>}
                  </div>
                  <p className="text-sm text-gray-500 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="h-4 w-4 text-teal-500 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.popular ? "default" : "outline"}
                    className="w-full"
                    onClick={() => router.push(plan.name === "Enterprise" ? "/login" : "/login")}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-gray-200 bg-gradient-to-br from-teal-50 to-amber-50">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Ready to ascend?
              </h2>
              <p className="text-gray-500 mb-6">
                Start free. No credit card required. Your swarm awaits.
              </p>
              <Button size="lg" onClick={() => router.push("/login")}>
                <Swords className="h-4 w-4 mr-2" />
                Enter the Forge
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">Titan</span>
            <span className="text-xs text-gray-400">Phasr Forge · © 2026</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span>Built with shadcn/ui</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
