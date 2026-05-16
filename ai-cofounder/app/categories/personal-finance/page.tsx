"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  PiggyBank,
  Target,
  TrendingUp,
  BarChart3,
  FileText,
  CreditCard,
  Lightbulb,
  ShieldCheck,
  Wallet,
  PieChart as PieChartIcon,
  ChevronDown,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const BUDGET_DATA = [
  { name: "Housing", value: 35, color: "#3B82F6" },
  { name: "Food", value: 15, color: "#10B981" },
  { name: "Transport", value: 12, color: "#F59E0B" },
  { name: "Savings", value: 20, color: "#8B5CF6" },
  { name: "Discretionary", value: 10, color: "#F97316" },
  { name: "Insurance", value: 8, color: "#EF4444" },
];

const HOW_IT_WORKS = [
  { icon: Wallet, title: "Connect Your Picture", desc: "Link your accounts, upload pay stubs, or tell us your numbers. We don't store your credentials — just your snapshot." },
  { icon: Target, title: "Set Your Goals", desc: "Pay off debt? Buy a home? Retire early? Tell us your timeline and we'll build the plan backwards from there." },
  { icon: BarChart3, title: "AI Analyzes", desc: "Our engine processes your income, expenses, debts, and goals against millions of anonymized financial paths." },
  { icon: TrendingUp, title: "Get Your Roadmap", desc: "A step-by-step financial playbook: budget, savings targets, debt payoff schedule, and investment allocations." },
];

const COMING_FEATURES = [
  { icon: CreditCard, title: "Bill Negotiation", desc: "AI will find every bill you're overpaying for — subscriptions, insurance, utilities — and negotiate on your behalf." },
  { icon: ShieldCheck, title: "Credit Optimization", desc: "Get personalized credit card recommendations, utilization tips, and a timeline to hit your target score." },
  { icon: Lightbulb, title: "Investment Suggestions", desc: "Portfolio recommendations based on your risk tolerance, timeline, and tax situation. Not financial advice — just math." },
  { icon: FileText, title: "Tax Strategy", desc: "AI finds deductions you're missing and suggests moves to minimize your tax burden year-round, not just April." },
];

export default function PersonalFinancePage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    return () => observerRef.current?.disconnect();
  }, []);

  const observe = (id: string) => (el: HTMLDivElement | null) => {
    if (el && observerRef.current) observerRef.current.observe(el);
  };

  const isVisible = (id: string) => visibleSections.has(id);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-finance/5 via-cream to-cream dark:from-finance/10 dark:via-surfaceDark dark:to-surfaceDark">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-finance/10 text-finance text-sm font-medium border border-finance/20">
              <Sparkles size={14} />
              Coming Soon
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ink dark:text-cream leading-tight">
              💰 AI Finance Coach —{" "}
              <span className="text-finance">Your Money Cofounder</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
              Stop guessing. Get a personalized financial plan, budget breakdown,
              and investment roadmap — built by AI that understands your goals.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/waitlist"
                className="btn-primary bg-finance hover:bg-finance/90 text-lg px-8 py-3.5 shadow-lg shadow-finance/20 hover:shadow-xl hover:shadow-finance/30"
              >
                Join the Waitlist
                <ArrowRight size={18} />
              </Link>
              <Link href="/" className="btn-secondary text-lg px-8 py-3.5">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        ref={observe("how-it-works")}
        className={`section-padding transition-all duration-700 ${
          isVisible("how-it-works") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-ink dark:text-cream mb-4">
              How It Works
            </h2>
            <p className="text-muted text-lg max-w-xl mx-auto">
              From chaos to clarity in four steps. No spreadsheets required.
            </p>
          </div>

          <div className="relative">
            {/* Vertical connector for mobile + desktop */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-finance/30 via-finance to-finance/30 hidden md:block" />

            <div className="space-y-12 md:space-y-16">
              {HOW_IT_WORKS.map((step, i) => (
                <div key={step.title} className="relative flex items-start gap-6 md:gap-8 group">
                  {/* Icon / Number */}
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-2xl bg-finance/10 flex items-center justify-center group-hover:bg-finance/20 transition-colors">
                    <step.icon className="w-7 h-7 text-finance" />
                  </div>
                  {/* Connecting dot */}
                  <div className="hidden md:block absolute top-8 left-[31px] w-4 h-4 rounded-full bg-finance border-4 border-cream dark:border-surfaceDark z-10" />
                  {/* Content */}
                  <div className="card flex-1 p-6 md:p-8">
                    <span className="text-finance font-bold text-sm tracking-widest uppercase mb-1 block">
                      Step {i + 1}
                    </span>
                    <h3 className="text-xl font-semibold text-ink dark:text-cream mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sample Budget Output */}
      <section className="section-padding bg-finance/5 dark:bg-finance/5">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-ink dark:text-cream mb-4">
                Your Budget, Visualized
              </h2>
              <p className="text-muted text-lg max-w-xl mx-auto">
                This is what a real AI-generated budget breakdown looks like.
                Every percentage is backed by your actual spending data.
              </p>
            </div>

            <div className="card p-6 md:p-10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Pie chart */}
                <div className="h-[300px] md:h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={BUDGET_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={110}
                        paddingAngle={4}
                        dataKey="value"
                        animationBegin={300}
                        animationDuration={1200}
                      >
                        {BUDGET_DATA.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            stroke="transparent"
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                          border: "1px solid #E5E7EB",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                          fontSize: "14px",
                        }}
                        formatter={(value: number) => `${value}%`}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend + breakdown */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-ink dark:text-cream mb-4">
                    Recommended Monthly Allocation
                  </h3>
                  {BUDGET_DATA.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between py-1.5"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-ink dark:text-cream">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-ink dark:text-cream">
                        {item.value}%
                      </span>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-border dark:border-darkBorder mt-4">
                    <p className="text-muted text-sm">
                      Your actual percentages will adjust based on income,
                      location, goals, and debt. This is a sample for a typical
                      professional in their 30s.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Coming */}
      <section
        id="coming-soon"
        ref={observe("coming-soon")}
        className={`section-padding transition-all duration-700 ${
          isVisible("coming-soon") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-ink dark:text-cream mb-4">
              What&apos;s Coming
            </h2>
            <p className="text-muted text-lg max-w-xl mx-auto">
              We&apos;re building the complete financial AI. Here&apos;s what&apos;s next.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMING_FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="card p-6 hover:border-finance/30 group"
              >
                <div className="w-12 h-12 rounded-xl bg-finance/10 flex items-center justify-center mb-4 group-hover:bg-finance/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-finance" />
                </div>
                <h3 className="font-semibold text-ink dark:text-cream mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/waitlist"
              className="btn-primary bg-finance hover:bg-finance/90 text-lg px-8 py-3.5 shadow-lg shadow-finance/20"
            >
              Join the Waitlist
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-finance to-finance/80">
        <div className="section-container text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Your Money. Understood.
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
            Join thousands who&apos;ve stopped guessing about their finances.
            First roadmap is free. No credit card needed.
          </p>
          <Link
            href="/waitlist"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-finance rounded-xl font-semibold text-lg hover:bg-white/90 active:scale-[0.98] transition-all shadow-xl"
          >
            Join the Waitlist
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
