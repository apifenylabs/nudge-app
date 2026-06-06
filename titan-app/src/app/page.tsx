"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
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
  Diamond,
  Quote,
  Mail,
  Lock,
  Server,
  ShieldCheck,
} from "lucide-react";
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";
import ProgressionCarousel from "@/components/organisms/ProgressionCarousel";

const MASCOTS = [
  { name: "Sage", emoji: "🦉", src: "/mascots/sage.svg", element: "Wisdom", rarity: "Uncommon", bg: "from-indigo-100 to-indigo-50", border: "border-indigo-200", accent: "text-indigo-600" },
  { name: "Spark", emoji: "⚡", src: "/mascots/spark.svg", element: "Energy", rarity: "Uncommon", bg: "from-yellow-100 to-yellow-50", border: "border-yellow-200", accent: "text-yellow-600" },
  { name: "Aegis", emoji: "🛡️", src: "/mascots/aegis.svg", element: "Protection", rarity: "Rare", bg: "from-pink-100 to-pink-50", border: "border-pink-200", accent: "text-pink-600" },
  { name: "Drift", emoji: "🐉", src: "/mascots/drift.svg", element: "Exploration", rarity: "Rare", bg: "from-emerald-100 to-emerald-50", border: "border-emerald-200", accent: "text-emerald-600" },
  { name: "Pixel", emoji: "🎮", src: "/mascots/pixel.svg", element: "Creation", rarity: "Legendary", bg: "from-sky-100 to-sky-50", border: "border-sky-200", accent: "text-sky-600" },
];

const RARITY_COLORS: Record<string, string> = {
  Common: "text-gray-500 bg-gray-100",
  Uncommon: "text-green-600 bg-green-50",
  Rare: "text-blue-600 bg-blue-50",
  Epic: "text-purple-600 bg-purple-50",
  Legendary: "text-amber-600 bg-amber-50",
};

const MASCOT_OPTIONS = [
  { name: "Sage", emoji: "🦉" },
  { name: "Spark", emoji: "⚡" },
  { name: "Aegis", emoji: "🛡️" },
  { name: "Drift", emoji: "🐉" },
  { name: "Pixel", emoji: "🎮" },
];

const SKINS_PLANS = [
  { name: "Free", price: "$0", skins: "1 (default)", cooldown: "N/A", swapFee: "—", color: "text-gray-600", bg: "bg-gray-50", border: "border-gray-200" },
  { name: "Starter", price: "$5", skins: "3", cooldown: "30 days", swapFee: "Free", color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-200" },
  { name: "Collector", price: "$12", skins: "10", cooldown: "14 days", swapFee: "Free", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" },
  { name: "Skin Market", price: "Single", skins: "Any skin", cooldown: "7 days", swapFee: "$1-5", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
];

const FEATURES = [
  {
    icon: <Swords className="h-5 w-5" />,
    title: "Skill Builder",
    description: "Create custom AI skills with a built-in editor. Get them certified through automated audits — gold, silver, or bronze.",
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
    title: "Plugin Ecosystem",
    description: "Plug in skills for travel, finance, health, productivity — each with streaks, analytics, and daily check-ins.",
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
  { label: "Companions", value: "8", suffix: "unique skins", icon: <Bot className="h-4 w-4" /> },
  { label: "Rarity Tiers", value: "5", suffix: "common → legendary", icon: <Zap className="h-4 w-4" /> },
  { label: "Skill Builder", value: "Built-in", suffix: "no coding needed", icon: <Trophy className="h-4 w-4" /> },
  { label: "God Powers", value: "14", suffix: "unlockable abilities", icon: <TrendingUp className="h-4 w-4" /> },
];

export default function LandingPage() {
  const router = useRouter();
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistName, setWaitlistName] = useState("");
  const [waitlistMascot, setWaitlistMascot] = useState("");
  const [waitlistStatus, setWaitlistStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [waitlistMessage, setWaitlistMessage] = useState("");

  const trackCTA = useCallback((label: string) => {
    try { track("landing_cta", { label }); } catch {}
  }, []);

  const handleSignup = useCallback(() => {
    trackCTA("hero_start_free");
    router.push("/login");
  }, [router, trackCTA]);

  const handleSeeHow = useCallback(() => {
    trackCTA("hero_see_how");
    const el = document.getElementById("features");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, [trackCTA]);

  const handlePricingCTA = useCallback((plan: string) => {
    trackCTA(`pricing_${plan.toLowerCase()}`);
    router.push("/login");
  }, [router, trackCTA]);

  const handleWaitlistSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail.includes("@")) return;

    setWaitlistStatus("loading");
    setWaitlistMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: waitlistEmail,
          name: waitlistName,
          preferredMascot: waitlistMascot,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setWaitlistStatus("success");
        setWaitlistMessage(data.message || "You're on the list! 🎉");
        trackCTA("waitlist_signup");
      } else {
        setWaitlistStatus("error");
        setWaitlistMessage(data.error || "Something went wrong.");
      }
    } catch {
      setWaitlistStatus("error");
      setWaitlistMessage("Network error. Please try again.");
    }
  }, [waitlistEmail, waitlistName, waitlistMascot, trackCTA]);

  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbJsonLd items={[
        { label: "Home", href: "/" },
      ]} />

      {/* ── SoftwareApplication JSON-LD ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Titan — AI Agent Platform",
            operatingSystem: "Web",
            applicationCategory: "AIApplication",
            description:
              "Build your own AI agent collective with Titan. Gamified XP progression, 5 iconic companion archetypes, skill forge, certifications, and God-Tier unlocks.",
            url: "https://titan-app-puce.vercel.app",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            author: {
              "@type": "Organization",
              name: "Apifeny Labs",
            },
          }),
        }}
      />

      {/* ── Navigation ── */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-amber-500 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-teal-200/50 group-hover:scale-105">
              <span className="text-sm font-bold text-white">T</span>
            </div>
            <span className="text-sm font-semibold text-gray-900 group-hover:text-teal-700 transition-colors duration-300">Titan</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Pricing</a>
            <a href="/login" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Sign In</a>
            <Button size="sm" onClick={() => { trackCTA("nav_get_started"); router.push("/login"); }}>
              Get Started
            </Button>
          </nav>
          <div className="flex md:hidden items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => router.push("/login")}>
              Sign In
            </Button>
            <Button size="sm" onClick={() => { trackCTA("nav_start_free_mobile"); router.push("/login"); }}>
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
          {/* Animated floating orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-[0.04]"
            style={{ background: 'radial-gradient(circle, #14B8A6 0%, transparent 70%)' }}
            animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-[0.03]"
            style={{ background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)' }}
            animate={{ y: [0, 15, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12 sm:pt-24 sm:pb-16">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-50">
              <Sparkles className="h-3 w-3 mr-1" />
              Your AI Swarm, Evolved
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-4 leading-tight">
              Your AI Agent
              <br />
              <span className="bg-gradient-to-r from-teal-600 to-amber-500 bg-clip-text text-transparent" style={{ animation: 'pulse 3s ease-in-out infinite' }}>
                Grows With You
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-6 leading-relaxed">
              Pick a companion. Give it skills. Watch it evolve from a baby mascot into a God-Tier
              AI swarm that works for you — managing tasks, analyzing data, and automating your life.
              Like raising a Pokémon, but it actually does your work.
            </p>

            {/* Conversion-optimized CTA — urgency + specific value */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button size="lg" onClick={handleSignup} className="w-full sm:w-auto group">
                <Sparkles className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                Build Your First Agent — Free
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" onClick={handleSeeHow} className="w-full sm:w-auto">
                See How It Works
              </Button>
            </div>
            {/* Social proof strip directly under CTA */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-teal-500" />
                No credit card
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-teal-500" />
                Start in 2 minutes
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-teal-500" />
                340+ agents built
              </span>
            </div>
          </div>

          {/* ── Scroll indicator ── */}
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <motion.div
              className="w-5 h-8 rounded-full border border-gray-300 flex justify-center pt-1.5"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div className="w-1 h-1.5 rounded-full bg-gray-400" />
            </motion.div>
          </motion.div>

          {/* ── Mascot Grid ── */}
          <div className="mt-10 sm:mt-12">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {MASCOTS.map((mascot, i) => {
                const rarityBadge = RARITY_COLORS[mascot.rarity] || "text-gray-500 bg-gray-100";
                return (
                  <motion.div
                    key={mascot.name}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className={`relative w-28 sm:w-32 h-44 sm:h-48 ${mascot.border} hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group overflow-hidden`}>
                      {/* Hover glow aura */}
                      <motion.div
                        className="absolute -inset-4 rounded-full opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, ${mascot.src.includes('sage') ? '#6366F1' : mascot.src.includes('spark') ? '#FACC15' : mascot.src.includes('aegis') ? '#F472B6' : mascot.src.includes('drift') ? '#34D399' : '#0EA5E9'}20 0%, transparent 70%)`,
                          filter: 'blur(12px)',
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
                      <CardContent className="p-0 h-full flex flex-col relative z-[1]">
                        {/* Mascot image area */}
                        <div className={`flex-1 flex items-center justify-center bg-gradient-to-b ${mascot.bg} p-3 relative overflow-hidden`}>
                          {/* Animated shimmer overlay on hover */}
                          <motion.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                            style={{
                              background: `linear-gradient(105deg, transparent 30%, ${mascot.src.includes('sage') ? '#6366F1' : mascot.src.includes('spark') ? '#FACC15' : mascot.src.includes('aegis') ? '#F472B6' : mascot.src.includes('drift') ? '#34D399' : '#0EA5E9'}15 50%, transparent 70%)`,
                              backgroundSize: '200% 100%',
                            }}
                          />
                          <Image
                            src={mascot.src}
                            alt={mascot.name}
                            width={80}
                            height={80}
                            className="w-16 h-16 sm:w-20 sm:h-20 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                            style={{
                              filter: `drop-shadow(0 0 ${mascot.src.includes('pixel') ? '12px #0EA5E9' : mascot.src.includes('aegis') ? '10px #F472B6' : mascot.src.includes('drift') ? '10px #34D399' : '8px transparent'})`,
                            }}
                          />
                        </div>
                        {/* Info bar */}
                        <div className="px-2 py-1.5 text-center border-t border-gray-100 relative z-[1] bg-white/80 backdrop-blur-sm">
                          <p className="text-xs font-semibold text-gray-900 truncate">{mascot.emoji} {mascot.name}</p>
                          <div className="flex items-center justify-center gap-1 mt-0.5">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${rarityBadge}`}>
                              {mascot.rarity}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
            <p className="text-center text-sm text-gray-400 mt-4">
              Each companion has unique evolutions, abilities, and unlockable skins. Your choice matters.
            </p>
          </div>

          {/* Stats row */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className="text-gray-400 mb-1">{stat.icon}</div>
                <span className="text-xl font-bold text-gray-900">{stat.value}</span>
                <span className="text-xs text-gray-500 mt-0.5">{stat.label}</span>
                {stat.suffix && <span className="text-[10px] text-gray-400">{stat.suffix}</span>}
              </div>
            ))}
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
            {/* Problem-Solution comparison for conversion lift */}
            <div className="mt-6 max-w-2xl mx-auto grid grid-cols-2 gap-4 text-left">
              <div className="p-4 rounded-xl bg-white border border-red-100">
                <p className="text-xs font-semibold text-red-500 mb-2">Without Titan</p>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-1.5 text-xs text-gray-500">✕ Juggling 5+ SaaS tools</li>
                  <li className="flex items-start gap-1.5 text-xs text-gray-500">✕ Agents that don&#39;t grow with you</li>
                  <li className="flex items-start gap-1.5 text-xs text-gray-500">✕ No gamified progression or XP</li>
                  <li className="flex items-start gap-1.5 text-xs text-gray-500">✕ Hard to automate complex workflows</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-white border border-teal-100">
                <p className="text-xs font-semibold text-teal-600 mb-2">With Titan</p>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-1.5 text-xs text-gray-600">✓ One hub for all your AI tools</li>
                  <li className="flex items-start gap-1.5 text-xs text-gray-600">✓ Agents evolve and level up over time</li>
                  <li className="flex items-start gap-1.5 text-xs text-gray-600">✓ XP, achievements, God-Tier unlocks</li>
                  <li className="flex items-start gap-1.5 text-xs text-gray-600">✓ Visual swarm + skill forge in minutes</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Create Your Profile", desc: "Sign up, choose your companion mascot, and define your agent's first skill.", color: "from-teal-500 to-teal-600" },
              { step: "02", title: "Build & Deploy", desc: "Create custom AI skills in a built-in editor, test them live, and put them to work managing your tasks.", color: "from-amber-500 to-amber-600" },
              { step: "03", title: "Earn & Ascend", desc: "Every action earns XP. Level up, unlock tiers, and grow your swarm.", color: "from-purple-500 to-purple-600" },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className="h-full border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110`}>
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

      {/* ── God-Tier Callout ── */}
      <section className="border-t border-gray-100 bg-gradient-to-br from-purple-50/80 via-indigo-50/50 to-purple-50/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <Badge variant="outline" className="mb-4 border-purple-200 bg-purple-50 text-purple-700">
                <Diamond className="h-3 w-3 mr-1" />
                God-Tier Engine
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Ascend beyond level 30
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Hit <strong>Level 30</strong> to unlock the God-Tier system — a suite of 14 transcendent abilities
                across three tiers. Automate audits, spawn orbital swarms, command robotics,
                and evolve your mascot into its final form.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Ability Tiers", value: "3", color: "text-purple-600", bg: "bg-purple-50" },
                  { label: "God Powers", value: "14", color: "text-amber-600", bg: "bg-amber-50" },
                  { label: "Unlock Level", value: "30", color: "text-rose-600", bg: "bg-rose-50" },
                  { label: "Robotics Ready", value: "✓", color: "text-emerald-600", bg: "bg-emerald-50" },
                ].map((s) => (
                  <div key={s.label} className={`${s.bg} rounded-xl px-4 py-3 flex items-center justify-between`}>
                    <span className="text-sm text-gray-600">{s.label}</span>
                    <span className={`text-lg font-bold ${s.color}`}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl border border-purple-100 shadow-lg shadow-purple-100/30 p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-amber-500 flex items-center justify-center">
                    <Crown className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900">God-Tier Abilities</span>
                </div>
                <div className="space-y-3">
                  {[
                    { tier: "Tier 3", name: "Autonomous Deployment", color: "text-amber-600", desc: "Self-deploying agent swarms" },
                    { tier: "Tier 2", name: "Swarm Orchestration", color: "text-purple-600", desc: "Real-time multi-agent coordination" },
                    { tier: "Tier 1", name: "Skill Evolution", color: "text-rose-600", desc: "Memory-driven ability upgrades" },
                  ].map((a, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${a.color.replace('text-', 'bg-').replace('600', '100')} ${a.color}`}>
                        {a.tier}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{a.name}</p>
                        <p className="text-xs text-gray-500">{a.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof / Testimonials ── */}
      <section className="border-t border-gray-100 bg-gray-50/50">
        <div className="py-16 sm:py-20">
          <TestimonialCarousel
            testimonials={[
              {
                id: "marcus-l",
                name: "Marcus L.",
                role: "Solo Developer",
                content: "Titan replaces 3 SaaS tools I was paying for. My mascot tracks my trading bot, runs my blog SEO checks, and even manages my affiliate links — all from one dashboard.",
                rating: 5,
                badge: "Lv. 18 — 8,420 XP",
              },
              {
                id: "sarah-k",
                name: "Sarah K.",
                role: "Startup Founder",
                content: "The progression system is genius. I actually enjoy optimizing my workflows because every optimization gives XP. It turns productivity into a game I want to play.",
                rating: 5,
                badge: "Lv. 24 — 11,950 XP",
              },
              {
                id: "james-c",
                name: "James C.",
                role: "Digital Nomad",
                content: "I built and certified a gold-tier travel planning agent in under 2 hours. The skill forge is the fastest agent builder I've used — and I've used most of them.",
                rating: 4,
                badge: "Lv. 12 — 5,680 XP",
              },
              {
                id: "elena-m",
                name: "Elena M.",
                role: "Freelance Designer",
                content: "I was skeptical about gamified productivity, but Titan actually works. I've automated my client intake, invoicing, and portfolio updates. My Spark mascot is at level 15 already.",
                rating: 5,
                badge: "Lv. 15 — 6,230 XP",
              },
              {
                id: "ray-t",
                name: "Ray T.",
                role: "DevOps Engineer",
                content: "The orbital swarm visualization alone is worth it. I can see all my agents working in real-time, and the God-Tier automation is legit — it's like having 10 interns.",
                rating: 4,
                badge: "Lv. 28 — 14,100 XP",
              },
            ]}
          />

          {/* Trust Bar — Social proof numbers */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: "Beta Users", value: "50+", icon: <Users className="h-4 w-4" />, color: "text-teal-600", bg: "bg-teal-50" },
              { label: "Agents Built", value: "340+", icon: <Bot className="h-4 w-4" />, color: "text-amber-600", bg: "bg-amber-50" },
              { label: "Skills Certified", value: "180+", icon: <Trophy className="h-4 w-4" />, color: "text-purple-600", bg: "bg-purple-50" },
              { label: "Avg. XP Gained", value: "4,200", icon: <TrendingUp className="h-4 w-4" />, color: "text-emerald-600", bg: "bg-emerald-50" },
            ].map((s) => (
              <div key={s.label} className={`${s.bg} rounded-xl px-4 py-4 flex flex-col items-center text-center border border-gray-100`}>
                <div className={`${s.color} mb-1.5`}>{s.icon}</div>
                <span className="text-xl font-bold text-gray-900">{s.value}</span>
                <span className="text-xs text-gray-500 mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Badges ── */}
      <section className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="text-center mb-8">
            <p className="text-sm text-gray-400 font-medium uppercase tracking-widest">
              Security &amp; Infrastructure
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            {[
              { icon: <ShieldCheck className="h-5 w-5" />, label: "OWASP Compliant", desc: "Security audited" },
              { icon: <Server className="h-5 w-5" />, label: "Supabase Backend", desc: "Postgres-powered" },
              { icon: <Lock className="h-5 w-5" />, label: "End-to-End Encrypted", desc: "Your data, your keys" },
              { icon: <Zap className="h-5 w-5" />, label: "Vercel Edge", desc: "Global low-latency" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500">
                  {b.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{b.label}</p>
                  <p className="text-xs text-gray-500">{b.desc}</p>
                </div>
              </div>
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
              <Card className="h-full border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className={`w-10 h-10 rounded-lg ${feature.bg} ${feature.color} flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-600 transition-colors duration-300">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Live Progression Carousel ── */}
      <section className="border-t border-gray-100 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4 border-amber-200 bg-amber-50 text-amber-700">
            <Sparkles className="h-3 w-3 mr-1" />
            Interactive Preview
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            See Your Agent Evolve
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Swipe through the 7 stages of agent progression. Each tier unlocks new auras,
            abilities, and visual prestige. Your real agent matches your level automatically.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <ProgressionCarousel currentLevel={15} />
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            Demo showing Level 15 (Master tier). Sign in to see YOUR progression.
          </p>
        </div>
      </section>

      {/* ── Skin System ── */}
      <section className="border-t border-gray-100 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4 border-amber-200 bg-amber-50 text-amber-700">
            <Star className="h-3 w-3 mr-1" />
            Skins & Cosmetics
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Collect &amp; Customize Your Companions
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Like any great game, your Titan mascot is more than a tool — it&apos;s an identity.
            Unlock skins, swap styles, and flex your rarity. Each decision costs commitment.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
          {SKINS_PLANS.map((plan) => (
            <Card key={plan.name} className={`${plan.border} ${plan.bg} border-2`}>
              <CardContent className="p-5 text-center">
                <h3 className={`font-semibold ${plan.color} mb-1`}>{plan.name}</h3>
                <p className="text-2xl font-bold text-gray-900 mb-1">{plan.price}</p>
                <div className="space-y-1 text-xs text-gray-500">
                  <p><span className="font-medium text-gray-700">Skins:</span> {plan.skins}</p>
                  <p><span className="font-medium text-gray-700">Swap cooldown:</span> {plan.cooldown}</p>
                  <p><span className="font-medium text-gray-700">Fee:</span> {plan.swapFee}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-2xl mx-auto bg-gray-50 rounded-2xl border border-gray-200 p-6 sm:p-8">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Diamond className="h-4 w-4 text-amber-500" />
            Skins Monetization Strategy
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex gap-2"><span className="text-amber-500 shrink-0">•</span> <strong>Monthly rotation:</strong> 2-3 exclusive skins rotate in/out of the shop each month. FOMO drives purchases.</li>
            <li className="flex gap-2"><span className="text-amber-500 shrink-0">•</span> <strong>Cooldown friction:</strong> Swapping skins costs time (30d free → 7d paid). This makes each choice feel meaningful, and power-users pay to shorten the wait.</li>
            <li className="flex gap-2"><span className="text-amber-500 shrink-0">•</span> <strong>Rarity tiers:</strong> Common (free), Uncommon ($2), Rare ($5), Epic ($12), Legendary ($25). Higher rarities have animated effects, unique sounds, and particle trails.</li>
            <li className="flex gap-2"><span className="text-amber-500 shrink-0">•</span> <strong>Trade-in system:</strong> Users can trade 3 common skins for 1 uncommon, or pay a fee to resell owned skins on a marketplace (30% platform cut).</li>
            <li className="flex gap-2"><span className="text-amber-500 shrink-0">•</span> <strong>Evolution unlocks:</strong> Hitting level 10/20/30 on a mascot unlocks exclusive evolution skins for that line — no purchase needed, earned through play.</li>
            <li className="flex gap-2"><span className="text-amber-500 shrink-0">•</span> <strong>Projected skin MRR:</strong> With 200 users at $5-12/mo on skin tiers + 20 single sales/month → ~$1,200-2,500/mo within 3 months.</li>
          </ul>
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
                    onClick={() => handlePricingCTA(plan.name)}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Early Access Waitlist ── */}
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
              <Mail className="h-3 w-3 mr-1" />
              Private Beta
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Join the Waitlist
            </h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              We&apos;re onboarding builders in waves. Sign up with your email and tell us your
              preferred companion — we&apos;ll send you an invite when your cohort opens, plus
              exclusive early-bird pricing.
            </p>

            {waitlistStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl border border-teal-100 shadow-sm p-8"
              >
                <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-teal-600" />
                </div>
                <p className="text-lg font-semibold text-teal-700 mb-1">{waitlistMessage}</p>
                <p className="text-sm text-gray-500">We&apos;ll email you when your cohort opens.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="space-y-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400"
                />
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={waitlistName}
                  onChange={(e) => setWaitlistName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400"
                />
                <select
                  value={waitlistMascot}
                  onChange={(e) => setWaitlistMascot(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400 bg-white"
                >
                  <option value="">Pick your companion (optional)</option>
                  {MASCOT_OPTIONS.map((m) => (
                    <option key={m.name} value={m.name}>
                      {m.emoji} {m.name}
                    </option>
                  ))}
                </select>
                <Button
                  type="submit"
                  disabled={waitlistStatus === "loading"}
                  className="w-full"
                >
                  {waitlistStatus === "loading" ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Signing up...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Join Waitlist
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  )}
                </Button>

                {waitlistStatus === "error" && (
                  <p className="text-sm text-red-500 mt-2">{waitlistMessage}</p>
                )}
              </form>
            )}

            <p className="text-xs text-gray-400 mt-6">
              <span className="font-medium text-gray-500">Join 340+ creators</span> building their AI swarm. No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
          <Card className="border-gray-200 bg-gradient-to-br from-teal-50 to-amber-50">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Ready to ascend?
              </h2>
              <p className="text-gray-500 mb-6">
                Start free. No credit card required. Your swarm awaits.
              </p>
              <Button size="lg" onClick={() => { trackCTA("final_cta_enter_forge"); router.push("/login"); }}>
                <Swords className="h-4 w-4 mr-2" />
                Enter the Forge
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
          </motion.div>
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
            <a href="/compare" className="hover:text-gray-600 transition-colors">Compare</a>
            <span className="text-gray-300">·</span>
            <a href="/privacy" className="hover:text-gray-600 transition-colors">Privacy</a>
            <span className="text-gray-300">·</span>
            <span>Built with shadcn/ui</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
