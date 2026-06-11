"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { track } from "@vercel/analytics";
import {
  Sparkles,
  Rocket,
  Shield,
  Zap,
  Bot,
  Cpu,
  Star,
  Gift,
  Bell,
  ArrowUpRight,
  Calendar,
  GitMerge,
  Bug,
  Paintbrush,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

// ─── Types ───────────────────────────────────────────────────────────────

type ChangeType = "feature" | "improvement" | "fix" | "experimental";

interface ChangelogEntry {
  version: string;
  date: string;
  tagline: string;
  type: "major" | "minor" | "patch";
  changes: {
    type: ChangeType;
    text: string;
  }[];
}

// ─── Changelog Data ──────────────────────────────────────────────────────

const CHANGELOG: ChangelogEntry[] = [
  {
    version: "v1.6.0",
    date: "May 29, 2026",
    tagline: "Features Page, Activity Feed & Tier Comparison",
    type: "minor",
    changes: [
      { type: "feature", text: "New /features page with 10 detailed feature cards across Free/Pro/Enterprise tiers" },
      { type: "feature", text: "Feature comparison table with 13-row quick compare between all tiers" },
      { type: "feature", text: "Secret Agent Mode spotlight section for advanced users" },
      { type: "feature", text: "Agent Activity Feed on dashboard — scrollable history with type-colored borders" },
      { type: "feature", text: "Unread indicator with blue dot on new activity items" },
      { type: "feature", text: "Mark all as read / Clear feed actions with confirmation dialog" },
      { type: "improvement", text: "BreadcrumbList JSON-LD now on all pages for better SEO" },
      { type: "improvement", text: "Smoothed Framer Motion transitions across landing and features pages" },
    ],
  },
  {
    version: "v1.5.0",
    date: "May 20, 2026",
    tagline: "Mascots, Skill Market & Agent Swarm Orchestration",
    type: "major",
    changes: [
      { type: "feature", text: "Five iconic companion archetypes — Sage 🦉, Spark ⚡, Aegis 🛡️, Drift 🐉, Pixel 🎮" },
      { type: "feature", text: "Skill Market trading hub — buy, sell, and trade skill certifications" },
      { type: "feature", text: "Multi-agent swarm orchestration with delegation chains" },
      { type: "feature", text: "Agent evolution system with visual transformation at milestones" },
      { type: "feature", text: "Tier-based progression: Apprentice → Expert → Master → Legend → God-Tier" },
      { type: "improvement", text: "Redesigned mascot selection screen with animated previews" },
      { type: "improvement", text: "Skill Forge audit now supports batch certification" },
      { type: "fix", text: "Fixed agent memory persistence across sessions" },
    ],
  },
  {
    version: "v1.4.0",
    date: "May 10, 2026",
    tagline: "Persistent Agent Memory & Cross-Session Context",
    type: "minor",
    changes: [
      { type: "feature", text: "Persistent memory for all agents — remembers context across sessions" },
      { type: "feature", text: "Per-agent memory retention settings (short/long/forever)" },
      { type: "feature", text: "Cross-session context carryover for ongoing tasks" },
      { type: "feature", text: "Memory usage dashboard showing token consumption per agent" },
      { type: "improvement", text: "Memory compression for long-running agents (auto-truncates old context)" },
      { type: "fix", text: "Fixed context window overflow errors on complex multi-step tasks" },
    ],
  },
  {
    version: "v1.3.0",
    date: "April 28, 2026",
    tagline: "Supabase Migration, Auth & Skill Forge V2",
    type: "major",
    changes: [
      { type: "feature", text: "User authentication with Supabase — email/password and Google SSO" },
      { type: "feature", text: "Skill Forge v2 with automated certification audits (Gold/Silver/Bronze)" },
      { type: "feature", text: "Dashboard redesign with live activity sparkline" },
      { type: "feature", text: "Agent progress tracking with XP bars and level milestones" },
      { type: "feature", text: "LifeOS chat persistence via Supabase (cross-device history)" },
      { type: "improvement", text: "Migrated from localStorage to Supabase for all user data" },
      { type: "improvement", text: "RLS policies for data isolation between users" },
      { type: "fix", text: "Fixed auth modal closing on failed login attempt" },
    ],
  },
  {
    version: "v1.2.0",
    date: "April 15, 2026",
    tagline: "LifeOS Beta, Plugin System & Agent Skills",
    type: "minor",
    changes: [
      { type: "feature", text: "LifeOS personality-aware copilot beta with 4 initial plugins" },
      { type: "feature", text: "Plugin system architecture — modular, extensible, category-based" },
      { type: "feature", text: "Agent skill tree: Level-based unlocks with branching paths" },
      { type: "feature", text: "/pricing page with Free/Pro/Enterprise tier comparison" },
      { type: "experimental", text: "Voice interface for agent commands (opt-in beta)" },
      { type: "improvement", text: "Reduced agent response latency by 40%" },
      { type: "fix", text: "Fixed chat persistence losing context on page refresh" },
    ],
  },
  {
    version: "v1.1.0",
    date: "April 1, 2026",
    tagline: "Mascot Companions, XP System & Landing Launch",
    type: "minor",
    changes: [
      { type: "feature", text: "Introducing new archetype mascot system — Sage, Spark, Aegis, Drift, and Pixel" },
      { type: "feature", text: "Gamified XP progression system with level-up celebrations" },
      { type: "feature", text: "Agent naming and personality customization" },
      { type: "feature", text: "Landing page with hero animation, mascot showcase, and feature highlights" },
      { type: "feature", text: "Vercel Analytics and Speed Insights across all pages" },
      { type: "improvement", text: "SEO meta tags and Open Graph for social sharing" },
    ],
  },
  {
    version: "v1.0.0",
    date: "March 18, 2026",
    tagline: "Initial Launch — Build Your First Agent",
    type: "major",
    changes: [
      { type: "feature", text: "Agent builder with natural language instructions" },
      { type: "feature", text: "Basic agent dashboard with lifecycle controls" },
      { type: "feature", text: "Codex integration for tool-using agents" },
      { type: "feature", text: "Dark theme UI with responsive design" },
      { type: "feature", text: "Framer Motion animations and micro-interactions" },
      { type: "feature", text: "Blog with 10 initial articles" },
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────

const typeIcons: Record<ChangeType, React.ReactNode> = {
  feature: <Star className="h-3.5 w-3.5" />,
  improvement: <TrendingUp className="h-3.5 w-3.5" />,
  fix: <Bug className="h-3.5 w-3.5" />,
  experimental: <Gift className="h-3.5 w-3.5" />,
};

const typeLabels: Record<ChangeType, { label: string; color: string }> = {
  feature: { label: "New", color: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300" },
  improvement: { label: "Improved", color: "border-blue-400/30 bg-blue-500/10 text-blue-300" },
  fix: { label: "Fix", color: "border-amber-400/30 bg-amber-500/10 text-amber-300" },
  experimental: { label: "Experimental", color: "border-purple-400/30 bg-purple-500/10 text-purple-300" },
};

const versionBadge: Record<string, string> = {
  major: "bg-gradient-to-r from-violet-500 to-pink-500 text-white",
  minor: "border-violet-400/30 bg-violet-500/10 text-violet-200",
  patch: "border-violet-400/20 bg-violet-600/10 text-violet-300/60",
};

const versionLabel: Record<string, string> = {
  major: "Major Release",
  minor: "Update",
  patch: "Patch",
};

function containerAnim() {
  return {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };
}

function itemAnim() {
  return {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
}

// ─── Changelog Page ──────────────────────────────────────────────────────

export default function ChangelogPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Changelog", href: "/changelog" },
        ]}
      />

      {/* ── SoftwareApplication JSON-LD ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Titan — Changelog & Release Notes",
            operatingSystem: "Web",
            applicationCategory: "AIApplication",
            description:
              "Titan release notes, feature updates, bug fixes, and platform improvements. Track the evolution of the AI agent platform.",
            url: "https://titan-app-puce.vercel.app/changelog",
            applicationSuite: "Titan",
            releaseNotes: "https://titan-app-puce.vercel.app/changelog",
            author: {
              "@type": "Organization",
              name: "Apifeny Labs",
            },
          }),
        }}
      />

      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-violet-200/30 bg-gradient-to-b from-violet-950 via-violet-900 to-purple-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(236,72,153,0.1),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge className="mb-4 border-violet-400/30 bg-violet-500/10 text-violet-200">
              <GitMerge className="mr-1 h-3 w-3" />
              Changelog
            </Badge>
            <h1 className="bg-gradient-to-r from-white via-violet-100 to-pink-100 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl">
              What&apos;s New
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-violet-200/70">
              Every release, update, and improvement shipped to Titan. Follow our journey from v1.0 to the future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Timeline ──────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-purple-950 via-violet-950 to-violet-950">
        {/* Vertical timeline line */}
        <div className="absolute left-1/2 top-0 hidden h-full w-px bg-gradient-to-b from-violet-500/30 via-violet-400/20 to-transparent md:block" />

        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            variants={containerAnim()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="relative space-y-16"
          >
            {CHANGELOG.map((entry, idx) => (
              <motion.div
                key={entry.version}
                variants={itemAnim()}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 top-8 hidden -translate-x-1/2 md:block">
                  <div className="flex h-5 w-5 items-center justify-center">
                    <div
                      className={`h-full w-full rounded-full border-2 ${
                        entry.type === "major"
                          ? "border-violet-400 bg-violet-600 shadow-lg shadow-violet-500/30"
                          : "border-violet-500/40 bg-violet-800 shadow-md shadow-violet-500/10"
                      }`}
                    />
                  </div>
                </div>

                {/* Card (alternates left/right on desktop) */}
                <div
                  className={`md:w-[calc(50%-2rem)] ${
                    idx % 2 === 0 ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"
                  }`}
                >
                  <Card className="group relative overflow-hidden border-violet-400/20 bg-gradient-to-br from-violet-900/60 to-purple-900/30 backdrop-blur-sm transition-all duration-300 hover:border-violet-400/40 hover:shadow-xl hover:shadow-violet-500/10">
                    {/* Top accent bar */}
                    <div
                      className={`absolute left-0 right-0 top-0 h-1 ${
                        entry.type === "major"
                          ? "bg-gradient-to-r from-violet-500 to-pink-500"
                          : entry.type === "minor"
                            ? "bg-gradient-to-r from-violet-400/60 to-purple-400/40"
                            : "bg-violet-400/20"
                      }`}
                    />

                    <CardContent className="p-6 sm:p-8">
                      {/* Version header */}
                      <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-bold tracking-tight ${
                            versionBadge[entry.type]
                          }`}
                        >
                          {entry.version}
                        </span>
                        <Badge
                          className={`border-0 ${
                            entry.type === "major"
                              ? "bg-pink-500/10 text-pink-300"
                              : entry.type === "minor"
                                ? "bg-violet-500/10 text-violet-300"
                                : "bg-violet-600/10 text-violet-400"
                          }`}
                        >
                          {versionLabel[entry.type]}
                        </Badge>
                        <span className="inline-flex items-center gap-1 text-xs text-violet-400/50">
                          <Calendar className="h-3 w-3" />
                          {entry.date}
                        </span>
                      </div>

                      {/* Tagline */}
                      <p className="mb-5 text-lg font-semibold text-white/90">
                        {entry.tagline}
                      </p>

                      {/* Changes list */}
                      <ul className="space-y-2.5">
                        {entry.changes.map((change, ci) => (
                          <li key={ci} className="flex items-start gap-3">
                            <span
                              className={`mt-0.5 inline-flex shrink-0 items-center justify-center rounded-full p-1 ${
                                change.type === "feature"
                                  ? "bg-emerald-500/10 text-emerald-400"
                                  : change.type === "improvement"
                                    ? "bg-blue-500/10 text-blue-400"
                                    : change.type === "fix"
                                      ? "bg-amber-500/10 text-amber-400"
                                      : "bg-purple-500/10 text-purple-400"
                              }`}
                            >
                              {typeIcons[change.type]}
                            </span>
                            <div className="flex flex-wrap items-baseline gap-2">
                              <span
                                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
                                  typeLabels[change.type].color
                                }`}
                              >
                                {typeLabels[change.type].label}
                              </span>
                              <span className="text-sm text-violet-200/70">
                                {change.text}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ─── What's Next ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mt-20 max-w-2xl text-center"
          >
            <div className="rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-900/60 to-purple-900/30 p-8 backdrop-blur-sm">
              <Rocket className="mx-auto mb-4 h-8 w-8 text-violet-400" />
              <h3 className="mb-2 text-2xl font-bold text-white">What&apos;s Coming Next</h3>
              <p className="mb-6 text-sm text-violet-300/60">
                We&apos;re working on onboarding wizard, affiliate/referral program, and deeper LifeOS integration. Subscribe to the newsletter to get notified.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/blog">
                  <Button
                    variant="outline"
                    className="border-violet-400/30 text-violet-300 hover:bg-violet-800/40"
                    onClick={() => track("changelog_blog_link")}
                  >
                    Visit Blog
                    <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </Link>
                <Link href="/features">
                  <Button
                    className="bg-violet-500 text-white hover:bg-violet-600"
                    onClick={() => track("changelog_features_link")}
                  >
                    View Features
                    <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────── */}
      <footer className="border-t border-violet-800/20 bg-violet-950">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-violet-400/40">
              &copy; {new Date().getFullYear()} Titan. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/" className="text-xs text-violet-400/40 transition-colors hover:text-violet-300">
                Home
              </Link>
              <Link href="/blog" className="text-xs text-violet-400/40 transition-colors hover:text-violet-300">
                Blog
              </Link>
              <Link href="/pricing" className="text-xs text-violet-400/40 transition-colors hover:text-violet-300">
                Pricing
              </Link>
              <Link href="/privacy" className="text-xs text-violet-400/40 transition-colors hover:text-violet-300">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
