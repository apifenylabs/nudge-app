"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";
import {
  Check,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Bot,
  Swords,
  Trophy,
  Zap,
  Shield,
  Star,
  Crown,
  Diamond,
  Users,
  TrendingUp,
  Layers,
  Repeat,
  BookOpen,
  Cpu,
  Code,
  Palette,
  Share2,
  Lock,
  HelpingHand,
  Menu,
  X,
  Globe,
  ZapOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

// ─── Feature Data ────────────────────────────────────────────────────────

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  highlight?: string;
  items?: string[];
  tier: "free" | "pro" | "enterprise";
}

const FEATURES: Feature[] = [
  {
    icon: <Bot className="h-6 w-6" />,
    title: "AI Agent Builder",
    description: "Create, train, and deploy custom AI agents through an intuitive visual interface. No coding required.",
    gradient: "from-teal-500 to-emerald-500",
    highlight: "Build agents in 5 minutes",
    items: [
      "Visual agent builder — drag, configure, deploy",
      "Pre-built agent templates for common roles",
      "Custom instructions & personality settings",
      "Multi-model support (GPT, Claude, Mistral)",
      "Agent cloning & forking for rapid iteration",
    ],
    tier: "free",
  },
  {
    icon: <Swords className="h-6 w-6" />,
    title: "Agent Swarm Orchestration",
    description: "Run multiple agents in parallel with intelligent task delegation, error handling, and fallback chains.",
    gradient: "from-purple-500 to-pink-500",
    highlight: "Parallel agent execution",
    items: [
      "Visual swarm builder — connect agents via drag & drop",
      "Intelligent task routing & delegation",
      "Error handling with automatic fallback chains",
      "Parallel execution with configurable concurrency",
      "Swarm analytics — latency, cost, success rates",
    ],
    tier: "pro",
  },
  {
    icon: <Trophy className="h-6 w-6" />,
    title: "Gamified Progression",
    description: "Level up your agents through XP, achievements, and evolution milestones. Unlock new abilities as you grow.",
    gradient: "from-amber-500 to-orange-500",
    highlight: "XP + leveling system",
    items: [
      "XP accumulation from agent tasks & completions",
      "Leveling system with stat unlocks per tier",
      "Evolution thresholds — agents transform visually",
      "Achievement badges for milestones",
      "God-Tier unlocks for top-level progression",
    ],
    tier: "free",
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: "5 Iconic Mascot Archetypes",
    description: "Each agent pairs with a mascot archetype — from Sage's wisdom to Pixel's creativity. Collect, evolve, and customize them all.",
    gradient: "from-rose-500 to-pink-500",
    highlight: "Collectible mascots",
    items: [
      "5 iconic mascot archetypes — Sage, Spark, Aegis, Drift, Pixel",
      "Archetype-based personalities (Wisdom, Energy, Protection, Exploration, Creation)",
      "Rarity tiers from Common to Legendary",
      "Each mascot changes agent interaction style",
      "Unlockable evolution forms at higher levels",
    ],
    tier: "free",
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: "Premium Skin System",
    description: "Customize your mascots with collectible skins. Trade, collect, and show off your rare finds.",
    gradient: "from-violet-500 to-indigo-500",
    highlight: "Collectible + tradable",
    items: [
      "Skins for all 5 archetype mascots",
      "Rarity system: Common → Legendary",
      "Skin marketplace for trading with other users",
      "Seasonal limited-edition skins",
      "Skin sets with matching bonuses",
    ],
    tier: "pro",
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    title: "Skill Forge & Certification",
    description: "Forge custom skills for your agents and get AI-audited certifications in Gold, Silver, or Bronze tiers.",
    gradient: "from-cyan-500 to-blue-500",
    highlight: "AI-audited certifications",
    items: [
      "Visual Skill Forge builder with templates",
      "Custom skill parameters & execution logic",
      "AI-powered skill audit & quality scoring",
      "Gold / Silver / Bronze certification tiers",
      "Export certified skills to OpenClaw",
    ],
    tier: "pro",
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Full Analytics Dashboard",
    description: "Track agent performance, cost, usage patterns, and ROI with detailed charts and exportable reports.",
    gradient: "from-emerald-500 to-teal-500",
    highlight: "Real-time metrics",
    items: [
      "Real-time agent performance dashboards",
      "Cost tracking per agent & per task",
      "Usage patterns — peak hours, task types",
      "ROI analysis — time saved vs. cost incurred",
      "CSV/PDF export for reporting",
    ],
    tier: "pro",
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "REST API & Webhooks",
    description: "Integrate Titan agents into your own apps via a clean REST API. Webhooks for event-driven workflows.",
    gradient: "from-sky-500 to-indigo-500",
    highlight: "Developer-first API",
    items: [
      "RESTful API with full agent lifecycle control",
      "Webhook events: task_completed, agent_level_up, etc.",
      "API keys with granular permission scoping",
      "Rate limiting: 100 req/hr (Pro), Custom (Enterprise)",
      "SDK examples in Python, Node.js, curl",
    ],
    tier: "pro",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Enterprise Security & Compliance",
    description: "SOC 2-aligned security, end-to-end encryption, team audit trails, and custom SLAs for enterprise teams.",
    gradient: "from-slate-500 to-gray-600",
    highlight: "SOC 2 practices",
    items: [
      "End-to-end encryption for all agent data",
      "SOC 2-aligned security practices & audits",
      "Team audit trails with user-level logging",
      "Custom integrations with your existing stack",
      "99.9% SLA guarantee with dedicated support",
    ],
    tier: "enterprise",
  },
  {
    icon: <Repeat className="h-6 w-6" />,
    title: "OpenClaw Export",
    description: "Export certified skills and agent configurations directly to OpenClaw for use in your own infrastructure.",
    gradient: "from-orange-500 to-amber-500",
    highlight: "Seamless OpenClaw sync",
    items: [
      "One-click export to OpenClaw format",
      "Certified skills retain gold/silver/bronze rating",
      "Agent configurations as YAML/JSON bundles",
      "Version tracking for exported artifacts",
      "Sync back — import OpenClaw skills into Titan",
    ],
    tier: "pro",
  },
];

const QUICK_COMPARE = [
  { feature: "AI Agent Builder", free: "✓", pro: "✓", enterprise: "✓" },
  { feature: "Gamified Progression", free: "✓", pro: "✓", enterprise: "✓" },
  { feature: "8 Mascot Companions", free: "1 mascot", pro: "All 8", enterprise: "All 8" },
  { feature: "Skill Forge", free: "Basic", pro: "Advanced + Cert", enterprise: "Advanced + Cert" },
  { feature: "Swarm Orchestration", free: "—", pro: "Up to 5 agents", enterprise: "Unlimited" },
  { feature: "Premium Skins", free: "1 default", pro: "3 premium", enterprise: "All skins" },
  { feature: "Analytics Dashboard", free: "Basic", pro: "Full", enterprise: "Full + Custom" },
  { feature: "API & Webhooks", free: "—", pro: "100 req/hr", enterprise: "Custom limits" },
  { feature: "Secret Agent Mode", free: "—", pro: "✓", enterprise: "✓" },
  { feature: "OpenClaw Export", free: "—", pro: "✓", enterprise: "✓" },
];

const TIER_CAPS = [
  { icon: <Zap className="h-5 w-5" />, title: "Free Tier", text: "Get started with a single agent, basic Skill Forge, and standard progression. No credit card needed." },
  { icon: <Crown className="h-5 w-5" />, title: "Pro Tier", text: "5 concurrent agents, advanced Skill Forge with certification, full analytics, API access, and premium skins." },
  { icon: <Diamond className="h-5 w-5" />, title: "Enterprise Tier", text: "Unlimited agents, custom integrations, dedicated support, 99.9% SLA, and team audit trails." },
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

// ─── Features Page ───────────────────────────────────────────────────────

export default function FeaturesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbJsonLd items={[
        { label: "Home", href: "/" },
        { label: "Features", href: "/features" },
      ]} />

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
            <a href="/pricing" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Pricing</a>
            <a href="/blog" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Blog</a>
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

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(20,184,166,0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(245,158,11,0.05),transparent_60%)]" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12 sm:pt-24 sm:pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4 border-teal-200/30 bg-teal-50 text-teal-600">
              <Sparkles className="h-3 w-3 mr-1" />
              Everything You Need
            </Badge>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              Features That Make{" "}
              <span className="titan-text-gradient">Agents Powerful</span>
            </h1>

            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
              From visual agent building to enterprise-grade orchestration — Titan gives you
              the tools to build, train, and scale your own AI agent collective.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                className="bg-gradient-to-r from-teal-500 to-amber-500 text-white hover:from-teal-400 hover:to-amber-400 border-0 group"
                onClick={() => { track("features_cta_build"); router.push("/login"); }}
              >
                <Sparkles className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                Build Your First Agent — Free
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-200/40 text-gray-500 hover:text-gray-900 hover:border-teal-200/40"
                onClick={() => { track("features_cta_pricing"); router.push("/pricing"); }}
              >
                See Pricing
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Tier Overview Cards ── */}
      <section className="border-t border-gray-200/20 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-3 gap-4"
          >
            {TIER_CAPS.map((tier, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card className="h-full border-gray-200/30 bg-white hover:border-teal-200/30 hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-50 to-amber-50 border border-teal-100/20 flex items-center justify-center text-teal-600 mb-4">
                      {tier.icon}
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">{tier.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{tier.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Feature Detail Grid ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-5"
        >
          {FEATURES.map((feature, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="group h-full border-gray-200/30 bg-white hover:border-teal-200/40 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                {/* Gradient accent line on top */}
                <div className={cn("h-1 w-full bg-gradient-to-r", feature.gradient)} />

                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start gap-4 mb-4">
                    {/* Icon */}
                    <div className={cn(
                      "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shrink-0",
                      feature.gradient
                    )}>
                      {feature.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                        {feature.highlight && (
                          <Badge variant="outline" className="border-teal-200/20 bg-teal-50 text-teal-600 text-[10px]">
                            {feature.highlight}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>

                  {/* Feature bullets */}
                  <ul className="space-y-2 ml-0">
                    {feature.items?.map((item, fi) => (
                      <li key={fi} className="flex items-start gap-2 text-sm text-gray-500">
                        <Check className="h-4 w-4 text-teal-500 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Tier badge */}
                  <div className="mt-4">
                    <Badge className={cn(
                      "text-[10px] border-0",
                      feature.tier === "free" && "bg-gray-100 text-gray-500",
                      feature.tier === "pro" && "bg-teal-50 text-teal-600",
                      feature.tier === "enterprise" && "bg-amber-50 text-amber-600",
                    )}>
                      {feature.tier === "free" && "Free"}
                      {feature.tier === "pro" && "Pro"}
                      {feature.tier === "enterprise" && "Enterprise"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Secret Agent Mode Spotlight ── */}
      <section className="border-t border-gray-200/20 bg-gradient-to-br from-teal-50 via-white to-amber-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge variant="outline" className="mb-4 border-teal-200/30 bg-teal-50 text-teal-600">
              <Shield className="h-3 w-3 mr-1" />
              Secret Agent Mode
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Your Agents, <span className="titan-text-gradient">In Stealth</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto mb-6 leading-relaxed">
              Pro and Enterprise users unlock <strong className="text-gray-900">Secret Agent Mode</strong> —
              a privacy-first execution environment where agent activity is encrypted end-to-end,
              no logs are retained on Titan servers, and all processing happens in isolated containers.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <Lock className="h-4 w-4 text-teal-500" />
                End-to-end encrypted
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-teal-500" />
                Zero-log retention
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-teal-500" />
                Isolated containers
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Quick Feature Comparison ── */}
      <section className="border-t border-gray-200/20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Feature Comparison
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                See which tier has the features you need. Full detail on our{" "}
                <a href="/pricing" className="text-teal-600 hover:text-teal-500 underline underline-offset-2">pricing page</a>.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200/20">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium w-[220px] sm:w-[280px]">
                      Feature
                    </th>
                    <th className="text-center py-3 px-3 text-gray-400 font-medium">Free</th>
                    <th className="text-center py-3 px-3 text-teal-600 font-medium">Pro</th>
                    <th className="text-center py-3 px-3 text-amber-600 font-medium">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {QUICK_COMPARE.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-200/10 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-2.5 px-4 text-gray-700 font-medium">{row.feature}</td>
                      <td className="py-2.5 px-3 text-center text-gray-400">{row.free}</td>
                      <td className="py-2.5 px-3 text-center text-teal-600">{row.pro}</td>
                      <td className="py-2.5 px-3 text-center text-amber-600">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="border-t border-gray-200/20 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 border-teal-200/30 bg-teal-50 text-teal-600">
                <Users className="h-3 w-3 mr-1" />
                Built For Everyone
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Who Is Titan For?
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Whether you're a solo creator or an enterprise team, Titan scales with you.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  icon: <Bot className="h-5 w-5" />,
                  title: "Solo Builders & Creators",
                  desc: "Build personal AI assistants for research, writing, social media management, and daily productivity. Start free, upgrade when you need more.",
                },
                {
                  icon: <Users className="h-5 w-5" />,
                  title: "Startups & Small Teams",
                  desc: "Orchestrate swarms of specialized agents for customer support, lead generation, content production, and data analysis — all without a dev team.",
                },
                {
                  icon: <TrendingUp className="h-5 w-5" />,
                  title: "Enterprise & Agencies",
                  desc: "Deploy unlimited agents with custom integrations, dedicated infrastructure, team audit trails, and SLA-backed reliability for mission-critical workflows.",
                },
              ].map((useCase, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full border-gray-200/30 bg-white hover:border-teal-200/30 hover:shadow-md transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-50 to-amber-50 border border-teal-100/20 flex items-center justify-center text-teal-600 mb-4">
                        {useCase.icon}
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{useCase.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
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
                  Ready to meet your new team?
                </h2>
                <p className="text-gray-500 mb-6">
                  Your first agent is five minutes away. No credit card, no commitment.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-teal-500 to-amber-500 text-white hover:from-teal-400 hover:to-amber-400 border-0 group"
                    onClick={() => { track("features_final_cta"); router.push("/login"); }}
                  >
                    <Sparkles className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                    Build Your First Agent — Free
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-gray-200/40 text-gray-500 hover:text-gray-900 hover:border-teal-200/40"
                    onClick={() => { track("features_cta_pricing_bottom"); router.push("/pricing"); }}
                  >
                    Compare Plans
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
            <a href="/pricing" className="hover:text-gray-500 transition-colors">Pricing</a>
            <a href="/blog" className="hover:text-gray-500 transition-colors">Blog</a>
            <a href="/privacy" className="hover:text-gray-500 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
