"use client";

import { motion } from "framer-motion";
import { Check, X, ArrowRight, ExternalLink, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   Titan vs Cursor — Detailed Comparison
   ───────────────────────────────────────────────────────────── */

const categories = [
  {
    name: "Agent Building",
    items: [
      { feature: "Visual node-based builder", titan: true, competitor: "partial", note: "Cursor has no visual builder" },
      { feature: "Agent workflow design", titan: true, competitor: false, note: "Cursor is a code editor, not an agent platform" },
      { feature: "Tool-use configuration", titan: true, competitor: false, note: "Cursor has no tool-use system" },
      { feature: "Multi-step agent logic", titan: true, competitor: "partial", note: "Cursor Tab can do multi-step edits" },
      { feature: "Custom agent behaviors", titan: true, competitor: false, note: "Cursor doesn't build agents" },
    ],
  },
  {
    name: "Development Experience",
    items: [
      { feature: "No-code agent creation", titan: true, competitor: false, note: "Cursor requires coding knowledge" },
      { feature: "Code editor integration", titan: "coming", competitor: true, note: "Cursor is a VS Code fork — excellent DX" },
      { feature: "Sandbox testing", titan: true, competitor: false, note: "No agent sandbox in Cursor" },
      { feature: "Real-time preview", titan: true, competitor: "partial", note: "Cursor has preview for code, not agents" },
      { feature: "Git integration", titan: "coming", competitor: true, note: "Cursor has deep Git support" },
    ],
  },
  {
    name: "Deployment & Operations",
    items: [
      { feature: "One-click agent deploy", titan: true, competitor: false, note: "Cursor doesn't deploy agents" },
      { feature: "API endpoint generation", titan: true, competitor: false, note: "Cursor doesn't generate API endpoints" },
      { feature: "Production hosting", titan: true, competitor: false, note: "Cursor doesn't host your apps" },
      { feature: "Monitoring & logs", titan: "coming", competitor: false, note: "Cursor has no monitoring" },
      { feature: "Version management", titan: "coming", competitor: true, note: "Cursor uses Git" },
    ],
  },
  {
    name: "Skill Building & Progression",
    items: [
      { feature: "Gamified progression system", titan: true, competitor: false, note: "Cursor has no gamification" },
      { feature: "Rank tiers (E → S)", titan: true, competitor: false, note: "No rank system in Cursor" },
      { feature: "XP and achievements", titan: true, competitor: false, note: "Cursor has no XP" },
      { feature: "Guided learning path", titan: true, competitor: false, note: "Cursor has no learning path" },
      { feature: "Community templates", titan: true, competitor: false, note: "Cursor has no template marketplace" },
    ],
  },
  {
    name: "Pricing",
    items: [
      { feature: "Free tier available", titan: true, competitor: true, note: "Both have free tiers" },
      { feature: "Pro plan", titan: "$15/mo", competitor: "$20/mo" },
      { feature: "Includes agent hosting", titan: true, competitor: false, note: "Cursor doesn't host agents" },
      { feature: "Team plan", titan: "Coming", competitor: "$40/mo per user" },
    ],
  },
];

function FeatureCell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="w-5 h-5 text-emerald-500 mx-auto" />;
  if (value === false) return <X className="w-5 h-5 text-red-400 mx-auto" />;
  if (typeof value === "string" && value !== "partial") return <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{value}</span>;
  return <span className="text-xs text-amber-500 italic">Partial</span>;
}

export default function TitanVsCursorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/compare" className="hover:text-indigo-600 transition-colors">Comparisons</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 dark:text-white font-medium">Titan vs Cursor</span>
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
            <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <span className="text-2xl">⇥</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Titan vs Cursor
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Cursor is an excellent AI-native code editor. Titan is an agent building platform. 
            They solve different problems — but if you want to build AI agents, Titan is the tool.
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
              Cursor
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
            <strong>They&apos;re complementary tools.</strong> Use Cursor when you&apos;re writing code. 
            Use Titan when you&apos;re building AI agents. Cursor makes you a faster developer; 
            Titan lets you build things that Cursor can&apos;t — autonomous agents with tool-use, 
            reasoning, and deployment.
          </p>
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            If you&apos;re already using Cursor, Titan integrates into your workflow. Build the agent
            in Titan, use the generated API endpoints in Cursor. Best of both worlds.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/sandbox"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors text-sm"
            >
              Try Titan Sandbox <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://www.cursor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm"
            >
              Visit Cursor <ExternalLink className="w-4 h-4" />
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
              { name: "Titan vs Replit", slug: "titan-vs-replit" },
              { name: "Titan vs Copilot", slug: "titan-vs-copilot" },
              { name: "Titan vs Lovable", slug: "titan-vs-lovable" },
              { name: "Titan vs Bolt.new", slug: "titan-vs-bolt" },
              { name: "Titan vs v0", slug: "titan-vs-v0" },
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
