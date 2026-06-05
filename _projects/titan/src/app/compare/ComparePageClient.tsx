"use client";

import { motion } from "framer-motion";
import { Check, X, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   Titan vs Competitors — Comparison Overview Page
   ───────────────────────────────────────────────────────────── */

interface ComparisonItem {
  name: string;
  slug: string;
  tagline: string;
  logo: string;
  pros: string[];
  cons: string[];
  titanBetter: string[];
  price: string;
  link: string;
}

const comparisons: ComparisonItem[] = [
  {
    name: "Cursor",
    slug: "titan-vs-cursor",
    tagline: "AI-native code editor vs visual agent builder",
    logo: "⇥",
    pros: [
      "Excellent autocomplete on existing codebases",
      "Deep IDE integration (VS Code fork)",
      "Fast iteration for experienced devs",
    ],
    cons: [
      "Requires coding knowledge — not for non-devs",
      "No visual agent workflow builder",
      "Limited to code generation, not full agent lifecycle",
    ],
    titanBetter: [
      "Visual node-based agent builder (no code required)",
      "End-to-end agent lifecycle (build → test → deploy)",
      "Built-in progression system levels up your skills",
      "Sandbox environment for testing agents before deploy",
    ],
    price: "Free tier + $20/mo Pro",
    link: "https://www.cursor.com",
  },
  {
    name: "Replit",
    slug: "titan-vs-replit",
    tagline: "Browser-based IDE vs purpose-built agent platform",
    logo: "△",
    pros: [
      "Browser IDE — no local setup",
      "Good for quick prototypes and sharing",
      "AI-powered code completion (Ghostwriter)",
    ],
    cons: [
      "General-purpose coding environment, not agent-native",
      "No visual agent builder or node graph",
      "Limited deployment options for agents",
      "No progression/gamification for skill building",
    ],
    titanBetter: [
      "Purpose-built for AI agent creation, not general coding",
      "Visual node palette for drag-and-drop agent design",
      "One-click deploy with built-in hosting",
      "Progression system with ranks (E → S) and XP",
      "Sandbox preview tests agents before going live",
    ],
    price: "Free tier + $25/mo Core",
    link: "https://replit.com",
  },
  {
    name: "GitHub Copilot",
    slug: "titan-vs-copilot",
    tagline: "Code completion tool vs full agent platform",
    logo: "☰",
    pros: [
      "Excellent code suggestions in real-time",
      "Deep integration with VS Code and JetBrains",
      "Large language model trained on public code",
    ],
    cons: [
      "Autocomplete only — no agent building capability",
      "No visual workflow designer",
      "No sandbox or deploy pipeline for agents",
      "Single-user focus, no team collaboration",
    ],
    titanBetter: [
      "Build complete AI agents, not just code snippets",
      "Full visual builder with node palette and preview",
      "Deploy agents to production with one click",
      "Gamified progression keeps you learning and building",
      "API-first design for integration into your stack",
    ],
    price: "$10/mo Individual",
    link: "https://github.com/features/copilot",
  },
  {
    name: "Lovable (GPT Engineer)",
    slug: "titan-vs-lovable",
    tagline: "AI app builder vs agent platform",
    logo: "♡",
    pros: [
      "Build full apps from natural language prompts",
      "Good for rapid prototyping of web apps",
      "No coding required for basic apps",
    ],
    cons: [
      "Produces apps, not AI agents — different paradigm",
      "No visual node graph for complex agent logic",
      "Limited customization for agent behavior",
      "No sandbox testing for agents specifically",
    ],
    titanBetter: [
      "Purpose-built for AI agents with tool-use capability",
      "Visual node palette for designing agent workflows",
      "Sandbox preview with real-time agent testing",
      "Progression system teaches agent design concepts",
      "Built-in deployment to production",
    ],
    price: "Free tier + $20/mo Starter",
    link: "https://lovable.dev",
  },
  {
    name: "Bolt.new",
    slug: "titan-vs-bolt",
    tagline: "Prompt-to-app vs visual agent builder",
    logo: "⚡",
    pros: [
      "Fast app generation from prompts",
      "Good for MVPs and landing pages",
      "Browser-based, no setup required",
    ],
    cons: [
      "Generates static apps, not interactive agents",
      "No node-based visual workflow editor",
      "Limited to web app generation",
      "No progression, learning path, or sandbox for agents",
    ],
    titanBetter: [
      "Build interactive AI agents that take actions",
      "Visual node palette for complex agent logic",
      "Sandbox testing environment with real-time preview",
      "Progression system with ranks and XP",
      "Agent deployment to production API endpoints",
    ],
    price: "Free tier + $20/mo Pro",
    link: "https://bolt.new",
  },
  {
    name: "v0 by Vercel",
    slug: "titan-vs-v0",
    tagline: "UI component generator vs agent builder",
    logo: "▽",
    pros: [
      "Excellent React component generation",
      "Great for UI prototyping and design iteration",
      "Seamless Vercel deployment integration",
    ],
    cons: [
      "UI components only — not agent building",
      "No agent workflow or tool-use design",
      "No visual node editor",
      "Limited to frontend generation",
    ],
    titanBetter: [
      "Full agent platform — not just UI generation",
      "Build agents that use tools, APIs, and reasoning",
      "Visual node palette for complex agent logic",
      "Sandbox testing with real-time preview",
      "Production deployment with API endpoints",
    ],
    price: "Free tier + $20/mo Pro",
    link: "https://v0.dev",
  },
];

function ComparisonCard({ item, index }: { item: ComparisonItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Header */}
      <div className="p-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
            {item.logo}
          </span>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {item.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{item.tagline}</p>
          </div>
        </div>
        <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          {item.price}
        </span>
      </div>

      {/* Cons */}
      <div className="p-6 pb-3 space-y-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-red-500 flex items-center gap-1.5">
          <X className="w-3.5 h-3.5" /> Limitations
        </h4>
        <ul className="space-y-1.5">
          {item.cons.map((con, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
              <span className="text-red-400 mt-0.5 flex-shrink-0">•</span>
              {con}
            </li>
          ))}
        </ul>
      </div>

      {/* Titan Advantage */}
      <div className="px-6 pb-6 space-y-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-500 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Titan Advantage
        </h4>
        <ul className="space-y-1.5">
          {item.titanBetter.map((adv, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
              <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              {adv}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="px-6 pb-6">
        <Link
          href={`/compare/${item.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
        >
          Full comparison <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function ComparePageClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Titan vs <span className="text-indigo-600 dark:text-indigo-400">The Alternatives</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            See how Titan compares to every major AI development platform. We built Titan because the tools
            below weren&apos;t designed for building agents.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comparisons.map((item, i) => (
            <ComparisonCard key={item.slug} item={item} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/sandbox"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors text-sm"
            >
              Try Titan Sandbox <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900 text-slate-700 dark:text-slate-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors text-sm"
            >
              See Pricing <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
