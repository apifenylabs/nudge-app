"use client";

import { motion } from "framer-motion";
import { Check, X, ArrowRight, ExternalLink, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   Titan vs v0 by Vercel — Detailed Comparison
   ───────────────────────────────────────────────────────────── */

const categories = [
  {
    name: "Agent Building",
    items: [
      { feature: "Visual node-based builder", titan: true, competitor: false, note: "v0 is a generative UI tool, not an agent builder" },
      { feature: "AI agent creation from UI", titan: true, competitor: false, note: "v0 creates UI components, not agents" },
      { feature: "Tool-use configuration", titan: true, competitor: false, note: "v0 has no tool-use system" },
      { feature: "Multi-step agent logic", titan: true, competitor: false, note: "v0 generates single components, not agent flows" },
      { feature: "Custom agent behaviors", titan: true, competitor: false, note: "v0 doesn't build agents" },
    ],
  },
  {
    name: "Development Experience",
    items: [
      { feature: "UI component generation", titan: false, competitor: true, note: "v0's core strength — shadcn/ui + Tailwind components" },
      { feature: "Prompt-to-UI pipeline", titan: false, competitor: true, note: "v0 generates React components from descriptions" },
      { feature: "No-code agent creation", titan: true, competitor: false, note: "v0 requires some React knowledge" },
      { feature: "Sandbox testing", titan: true, competitor: true, note: "v0 has a component sandbox with React preview" },
      { feature: "Git integration", titan: "coming", competitor: true, note: "v0 syncs with Vercel/GitHub" },
    ],
  },
  {
    name: "Deployment & Operations",
    items: [
      { feature: "One-click agent deploy", titan: true, competitor: false, note: "v0 deploys components, not agents" },
      { feature: "Vercel deployment", titan: false, competitor: true, note: "v0 publishes directly to Vercel" },
      { feature: "API endpoint generation", titan: true, competitor: false, note: "v0 generates components not endpoints" },
      { feature: "Edge functions runtime", titan: false, competitor: true, note: "v0 leverages Vercel Edge" },
      { feature: "Monitoring & analytics", titan: "coming", competitor: true, note: "Vercel Analytics" },
    ],
  },
  {
    name: "Skill Building & Progression",
    items: [
      { feature: "Gamified progression system", titan: true, competitor: false, note: "v0 has no progression system" },
      { feature: "Rank tiers (E → S)", titan: true, competitor: false, note: "No ranks in v0" },
      { feature: "XP and achievements", titan: true, competitor: false, note: "v0 has no XP" },
      { feature: "Guided learning path", titan: true, competitor: false, note: "v0 has no guided learning" },
      { feature: "Community templates", titan: true, competitor: false, note: "v0 has limited sharing" },
    ],
  },
  {
    name: "Pricing",
    items: [
      { feature: "Free tier available", titan: true, competitor: true, note: "Both have free tiers" },
      { feature: "Pro plan", titan: "$15/mo", competitor: "$20/mo" },
      { feature: "Includes agent hosting", titan: true, competitor: false, note: "v0 doesn't host agents" },
      { feature: "Includes edge hosting", titan: false, competitor: true, note: "Vercel Hobby included" },
    ],
  },
];

function FeatureCell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="w-5 h-5 text-emerald-500 mx-auto" />;
  if (value === false) return <X className="w-5 h-5 text-red-400 mx-auto" />;
  if (typeof value === "string" && value !== "partial") return <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{value}</span>;
  return <span className="text-xs text-amber-500 italic">Partial</span>;
}

export default function TitanVsV0Client() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/compare" className="hover:text-indigo-600 transition-colors">Comparisons</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 dark:text-white font-medium">Titan vs v0</span>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
              <span className="text-2xl font-bold text-indigo-600">T</span>
            </div>
            <span className="text-2xl text-slate-400">vs</span>
            <div className="w-14 h-14 rounded-xl bg-black dark:bg-white/10 flex items-center justify-center">
              <span className="text-lg font-bold text-black dark:text-white">v0</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Titan vs v0 by Vercel
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            v0 by Vercel generates React components and UI from natural language prompts — 
            think of it as a UI designer that writes code. Titan is an agent-building platform 
            with visual workflows and deployment. v0 beautifies your frontend; Titan powers 
            your backend intelligence.
          </p>
        </motion.div>

        {/* Head-to-Head Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-12"
        >
          {categories.map((cat) => (
            <div key={cat.name}>
              <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{cat.name}</h3>
              </div>
              {cat.items.map((item, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-12 gap-4 px-6 py-3 ${i % 2 === 0 ? "bg-white dark:bg-slate-900" : "bg-slate-50/50 dark:bg-slate-900/50"} border-b border-slate-100 dark:border-slate-800 last:border-b-0`}
                >
                  <div className="col-span-6">
                    <span className="text-sm text-slate-700 dark:text-slate-300">{item.feature}</span>
                    {item.note && (
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{item.note}</p>
                    )}
                  </div>
                  <div className="col-span-3 flex justify-center">
                    <FeatureCell value={item.titan} />
                  </div>
                  <div className="col-span-3 flex justify-center">
                    <FeatureCell value={item.competitor} />
                  </div>
                </div>
              ))}
            </div>
          ))}
          {/* Header row */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <div className="col-span-6" />
            <div className="col-span-3 text-center text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              Titan
            </div>
            <div className="col-span-3 text-center text-sm font-semibold text-slate-500 dark:text-slate-400">
              v0
            </div>
          </div>
        </motion.div>

        {/* Verdict */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-2xl border border-indigo-100 dark:border-indigo-900 p-8 mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">The Verdict</h2>
          </div>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            <strong>v0 is a UI tool. Titan is an agent platform. Both are Vercel-native.</strong> 
            v0 excels at one thing: turning prompts into beautiful, responsive React components 
            with shadcn/ui and Tailwind. It is the fastest way to go from idea to polished 
            frontend — and it integrates perfectly with the Vercel ecosystem.
          </p>
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Titan doesn&apos;t generate UI. Titan generates <em>agents</em>. The natural 
            combination: use v0 to design and generate your app&apos;s interface, then power 
            it with Titan agents exposed as API routes on Vercel. If you&apos;re building on 
            Vercel, this is the ultimate stack — v0 for the look, Titan for the logic, Vercel 
            for the deployment.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/sandbox"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors text-sm"
            >
              Try Titan Sandbox <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://v0.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm"
            >
              Visit v0 <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* More Comparisons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
            More Comparisons
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "Titan vs Cursor", slug: "titan-vs-cursor" },
              { name: "Titan vs Replit", slug: "titan-vs-replit" },
              { name: "Titan vs Copilot", slug: "titan-vs-copilot" },
              { name: "Titan vs Lovable", slug: "titan-vs-lovable" },
              { name: "Titan vs Bolt.new", slug: "titan-vs-bolt" },
            ].map((item) => (
              <Link
                key={item.slug}
                href={`/compare/${item.slug}`}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors text-sm text-slate-700 dark:text-slate-300 hover:text-indigo-600"
              >
                <ChevronRight className="w-4 h-4 text-indigo-400" />
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
