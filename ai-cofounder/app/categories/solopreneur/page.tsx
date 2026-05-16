"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Lightbulb,
  Search,
  Hammer,
  Rocket,
  Mail,
  FileText,
  TrendingUp,
  BarChart3,
  CheckCircle,
  ChevronDown,
  Edit3,
  Users,
  Zap,
  Target,
} from "lucide-react";

const BUILD_PLAN = [
  { week: "Week 1", phase: "Validate", tasks: ["Market research (AI-assisted)", "Competitor analysis", "MVP scope definition", "User interview prep"], color: "#8B5CF6" },
  { week: "Week 2", phase: "Build", tasks: ["Set up dev environment", "Build core feature #1", "Build core feature #2", "CI/CD pipeline"], color: "#10B981" },
  { week: "Week 3", phase: "Launch", tasks: ["Landing page + waitlist", "Soft launch to 10 users", "Collect feedback", "Iterate on critical issues"], color: "#F59E0B" },
  { week: "Week 4", phase: "Scale", tasks: ["Content marketing strategy", "Set up analytics", "First paid acquisition test", "Plan v1.1 roadmap"], color: "#F97316" },
];

const HOW_IT_WORKS = [
  { icon: Lightbulb, title: "Describe Your Idea", desc: "One sentence or ten paragraphs. Tell us what you want to build, who it's for, and why it matters. The more context, the sharper the plan." },
  { icon: Search, title: "AI Validates the Market", desc: "We scan competitors, analyze search trends, estimate TAM, and surface risks you haven't thought of. No more building things nobody wants." },
  { icon: Hammer, title: "Get Your Build Plan", desc: "A week-by-week engineering and GTM roadmap tailored to your skill set, budget, and timeline. We tell you what to build, in what order, and why." },
  { icon: Rocket, title: "Launch Playbook", desc: "Step-by-step go-to-market: landing page copy, pricing strategy, launch sequence, community building, and first 100 users playbook." },
];

const COMING_FEATURES = [
  { icon: Mail, title: "Email Automation", desc: "AI writes and sends personalized nurture sequences to your waitlist and early users. Convert signups into paying customers without lifting a finger." },
  { icon: FileText, title: "Content Planning", desc: "Weekly content calendar with AI-generated drafts for Twitter, LinkedIn, and your blog. Designed to attract your exact ICP." },
  { icon: TrendingUp, title: "Competitor Tracking", desc: "Automated monitoring of competitor launches, pricing changes, and marketing moves. Get alerts when your landscape shifts." },
  { icon: BarChart3, title: "Growth Analytics", desc: "Revenue, retention, and user acquisition dashboards. AI flags anomalies and suggests experiments before metrics dip." },
];

export default function SolopreneurPage() {
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
      <section className="section-padding bg-gradient-to-b from-solopreneur/5 via-cream to-cream dark:from-solopreneur/10 dark:via-surfaceDark dark:to-surfaceDark">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-solopreneur/10 text-solopreneur text-sm font-medium border border-solopreneur/20">
              <Sparkles size={14} />
              Coming Soon
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ink dark:text-cream leading-tight">
              ⚡ AI Solopreneur —{" "}
              <span className="text-solopreneur">Your Business Cofounder</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
              The AI operating system for solo founders. Ideate, validate, build,
              launch, and scale — all guided by your AI cofounder that never
              sleeps.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/waitlist"
                className="btn-primary bg-solopreneur hover:bg-solopreneur/90 text-lg px-8 py-3.5 shadow-lg shadow-solopreneur/20 hover:shadow-xl hover:shadow-solopreneur/30"
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
              From napkin sketch to shipped product. No cofounder needed.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Timeline connector (desktop) */}
            <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-solopreneur/30 via-solopreneur to-solopreneur/30" />

            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.title} className="relative text-center group">
                {/* Icon */}
                <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-solopreneur/10 flex items-center justify-center group-hover:bg-solopreneur/20 transition-colors relative z-10">
                  <step.icon className="w-7 h-7 text-solopreneur" />
                </div>
                {/* Connecting dot */}
                <div className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-solopreneur border-4 border-cream dark:border-surfaceDark z-10" />
                {/* Content */}
                <div className="card p-6 text-center">
                  <span className="block text-solopreneur font-bold text-2xl mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold text-ink dark:text-cream mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Build Plan Preview */}
      <section className="section-padding bg-solopreneur/5 dark:bg-solopreneur/5">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-ink dark:text-cream mb-4">
                Your First 4-Week Build Plan
              </h2>
              <p className="text-muted text-lg max-w-xl mx-auto">
                This is what a real AI-generated build plan looks like.
                Every task is scoped to your skills and timeline.
              </p>
            </div>

            <div className="space-y-4">
              {BUILD_PLAN.map((stage) => (
                <div
                  key={stage.week}
                  className="card overflow-hidden group hover:shadow-md transition-shadow"
                >
                  {/* Phase header */}
                  <div
                    className="px-6 py-4 flex items-center gap-4"
                    style={{
                      background: `linear-gradient(135deg, ${stage.color}10, transparent)`,
                      borderLeft: `4px solid ${stage.color}`,
                    }}
                  >
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: stage.color }}
                    />
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                        {stage.week}
                      </span>
                      <h3 className="text-lg font-semibold text-ink dark:text-cream">
                        {stage.phase}
                      </h3>
                    </div>
                    <div className="ml-auto text-right">
                      <span
                        className="badge text-xs"
                        style={{
                          backgroundColor: `${stage.color}15`,
                          color: stage.color,
                        }}
                      >
                        {stage.tasks.length} tasks
                      </span>
                    </div>
                  </div>

                  {/* Tasks */}
                  <div className="px-6 pb-4">
                    <div className="grid sm:grid-cols-2 gap-2">
                      {stage.tasks.map((task) => (
                        <div
                          key={task}
                          className="flex items-center gap-3 py-2 text-sm text-ink/70 dark:text-cream/70"
                        >
                          <CheckCircle size={14} className="text-muted flex-shrink-0" />
                          {task}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-muted text-sm">
                * Your actual plan adapts to your idea, skills, and timeline.
                This is a sample for a typical SaaS MVP.
              </p>
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
              The full solopreneur OS. Here&apos;s what we&apos;re building next.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMING_FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="card p-6 hover:border-solopreneur/30 group"
              >
                <div className="w-12 h-12 rounded-xl bg-solopreneur/10 flex items-center justify-center mb-4 group-hover:bg-solopreneur/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-solopreneur" />
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
              className="btn-primary bg-solopreneur hover:bg-solopreneur/90 text-lg px-8 py-3.5 shadow-lg shadow-solopreneur/20"
            >
              Join the Waitlist
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-solopreneur to-solopreneur/80">
        <div className="section-container text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ship Faster. Ship Smarter.
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
            Stop building alone. Get your AI cofounder and go from idea to
            launch in weeks, not months. First plan is free.
          </p>
          <Link
            href="/waitlist"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-solopreneur rounded-xl font-semibold text-lg hover:bg-white/90 active:scale-[0.98] transition-all shadow-xl"
          >
            Join the Waitlist
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
