"use client";

import Link from "next/link";
import { ArrowRight, UtensilsCrossed, Wallet, Zap, Compass, Sparkles } from "lucide-react";

const VERTICALS = [
  {
    slug: "meal-planning",
    title: "Meal Planning",
    emoji: "🥗",
    icon: UtensilsCrossed,
    desc: "Your personal nutrition AI. Stop asking 'what's for dinner?' Get weekly meal plans, grocery lists, and budget-friendly recipes tailored to you.",
    color: "meal",
    badgeClass: "badge-meal",
    status: "Try Now",
    href: "/categories/meal-planning/interactive",
  },
  {
    slug: "personal-finance",
    title: "Personal Finance",
    emoji: "💰",
    icon: Wallet,
    desc: "Your money cofounder. Budgeting, savings targets, investment roadmaps — AI that understands your goals and builds a plan to reach them.",
    color: "finance",
    badgeClass: "badge-finance",
    status: "Coming Soon",
    href: "/categories/personal-finance",
  },
  {
    slug: "solopreneur",
    title: "Solopreneur",
    emoji: "⚡",
    icon: Zap,
    desc: "The AI operating system for solo founders. Ideate, validate, build, launch, and scale — with a cofounder that never sleeps.",
    color: "solopreneur",
    badgeClass: "badge-solopreneur",
    status: "Coming Soon",
    href: "/categories/solopreneur",
  },
  {
    slug: "travel",
    title: "Travel",
    emoji: "✈️",
    icon: Compass,
    desc: "Your adventure cofounder. Personalized itineraries, budget-optimized routing, and local gems. Skip the 20-tab research spiral.",
    color: "travel",
    badgeClass: "badge-travel",
    status: "Coming Soon",
    href: "/categories/travel",
  },
];

export default function CategoriesOverview() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-accent/5 via-cream to-cream dark:from-accent/10 dark:via-surfaceDark dark:to-surfaceDark">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20 animate-fade-in">
              <Sparkles size={14} />
              AI-Powered Vertical Agents
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ink dark:text-cream leading-tight">
              Choose Your{" "}
              <span className="gradient-text">Vertical</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted dark:text-cream/80 max-w-2xl mx-auto leading-relaxed">
              Each vertical is a specialized AI agent trained on a specific domain. Pick the one that matches your goals — your AI cofounder will handle the rest.
            </p>
          </div>
        </div>
      </section>

      {/* Vertical Cards */}
      <section className="section-padding">
        <div className="section-container">
          <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {VERTICALS.map((v, idx) => {
              const Icon = v.icon;
              const isLive = v.status === "Try Now";
              return (
                <Link
                  key={v.slug}
                  href={v.href}
                  className="card group block p-6 sm:p-8 relative overflow-hidden animate-slide-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors`}
                    style={{
                      backgroundColor: `rgb(from var(--color-${v.color}) / 0.1)`,
                    }}
                  >
                    <Icon size={28} className={`text-${v.color}`} />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-xl font-bold text-ink dark:text-cream">
                      {v.emoji} {v.title}
                    </h2>
                    <span className={`badge ${v.badgeClass}`}>{v.status}</span>
                  </div>
                        <p className="text-sm text-muted dark:text-cream/80 leading-relaxed mb-5">
                    {v.desc}
                  </p>
                  <div
                    className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
                      isLive
                        ? "text-meal dark:text-meal/80 group-hover:text-meal/80"
                        : "text-muted dark:text-cream/60 group-hover:text-ink dark:group-hover:text-cream"
                    }`}
                  >
                    {isLive ? "Try it now" : "Get notified when live"}
                    <ArrowRight size={14} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why multiple verticals */}
      <section className="section-padding bg-white dark:bg-surfaceDark/50">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-ink dark:text-cream mb-4">
              Why Multiple Verticals?
            </h2>
            <p className="text-muted dark:text-cream/80 leading-relaxed max-w-xl mx-auto">
              A single AI that does everything does nothing well. Each vertical agent
              is trained on deep domain knowledge — recipes, macros, and grocery data
              for meal planning; market trends, tax rules, and investment strategies
              for finance.
            </p>
            <div className="mt-8">
              <Link href="/" className="btn-primary">
                Back to Home <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
