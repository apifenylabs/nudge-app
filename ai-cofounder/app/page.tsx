"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Sparkles, ArrowRight, Check, Star, Quote, Clock, DollarSign,
  Users, UtensilsCrossed, ShoppingCart, MessageCircle, Heart,
  ChevronRight, Camera, ChefHat
} from "lucide-react";

const CATEGORIES = [
  {
    key: "meal-planning",
    title: "Meal Planning AI",
    tag: "LIVE NOW — Try it free",
    description: "Stop asking 'what's for dinner?' Your AI cofounder builds a personalized weekly plan in 90 seconds.",
    color: "meal",
    gradient: "from-meal/20 to-meal/5",
    icon: "🍽️",
    href: "/categories/meal-planning/interactive",
    count: "1,247",
    quote: '"Saved me 4 hours/week and $187/month on groceries!"',
    quoteAuthor: "Sarah M., mom of 3",
  },
  {
    key: "personal-finance",
    title: "Personal Finance AI",
    tag: "Coming soon",
    description: "Get a personalized budget, savings plan, and investment strategy. Your CFO in your pocket.",
    color: "finance",
    gradient: "from-finance/20 to-finance/5",
    icon: "💰",
    href: "/categories/personal-finance",
    count: "892",
  },
  {
    key: "solopreneur",
    title: "Solopreneur AI",
    tag: "Coming soon",
    description: "Launch faster with an AI that handles research, pricing, content, and strategy for your next idea.",
    color: "solopreneur",
    gradient: "from-solopreneur/20 to-solopreneur/5",
    icon: "🚀",
    href: "/categories/solopreneur",
    count: "634",
  },
  {
    key: "travel",
    title: "Travel AI",
    tag: "Coming soon",
    description: "Your personal travel agent that builds itineraries, finds deals, and handles logistics.",
    color: "travel",
    gradient: "from-travel/20 to-travel/5",
    icon: "✈️",
    href: "/categories/travel",
    count: "521",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    role: "Mom of 3, Hong Kong",
    text: "Saved me 4 hours/week and $187 on groceries this month! I used to spend Sunday afternoons meal planning. Now it takes 90 seconds.",
    avatar: "SM",
    color: "bg-meal",
    saved: "$187/mo",
    time: "4 hrs/wk",
    verified: true,
  },
  {
    name: "Mike T.",
    role: "Busy Professional",
    text: "Finally a planner that actually uses what's in my fridge. No more buying ingredients I already have. The pantry scan feature is genius.",
    avatar: "MT",
    color: "bg-finance",
    saved: "$94/mo",
    time: "2 hrs/wk",
    verified: true,
  },
  {
    name: "Jessica L.",
    role: "New Mom",
    text: "I've tried every meal planning app. This one actually GETS me. The family profiles mean my husband gets his keto meals while I eat balanced.",
    avatar: "JL",
    color: "bg-solopreneur",
    saved: "N/A",
    time: "5 hrs/wk",
    verified: true,
  },
  {
    name: "David K.",
    role: "Freelancer",
    text: "The budget slider changed my life. I can see in real time how changing my budget affects the meal plan. Saved $200+ in the first two weeks.",
    avatar: "DK",
    color: "bg-travel",
    saved: "$200+/mo",
    time: "3 hrs/wk",
    verified: true,
  },
];

const HOW_IT_WORKS = [
  { step: 1, icon: <ChefHat size={24} />, title: "Answer 7 Questions", desc: "Diet, allergies, budget, cook time. Takes 60 seconds. Your AI cofounder learns your preferences." },
  { step: 2, icon: <Sparkles size={24} />, title: "AI Generates Your Plan", desc: "4 parallel agents (Research, Nutrition, Logistics, Budget) build your perfect week. Real recipes, real prices." },
  { step: 3, icon: <ShoppingCart size={24} />, title: "Shop & Save", desc: "One click sends your list to Instacart or Amazon Fresh. Smart substitutions use what's in your pantry." },
  { step: 4, icon: <MessageCircle size={24} />, title: "Tweak on the Go", desc: "Live Mode via WhatsApp/Telegram. Change a meal, adjust budget, get new suggestions instantly." },
];

export default function Home() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cream via-white to-cream">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-meal/[0.03] blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-accent/[0.03] blur-[100px]" />
        </div>

        <div className="section-container relative z-10 pt-16 sm:pt-20 pb-12">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left: Text */}
            <div className="flex-1 text-center lg:text-left">
              {/* Trust badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-meal/5 border border-meal/10 text-xs font-medium text-meal mb-6">
                <span className="w-2 h-2 rounded-full bg-meal animate-pulse" />
                Trusted by 1,247 busy families
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ink leading-[1.1] mb-6 text-balance">
                Your AI Cofounder for
                <span className="gradient-text block mt-2">everyday life</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted max-w-xl mb-8 leading-relaxed">
                Stop spending hours on decisions. Your personal AI agents handle meal planning, budgeting, and more — so you can focus on what matters.
              </p>

              {/* Live demo badge */}
              <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm border border-border/50 mb-8">
                <div className="w-2.5 h-2.5 rounded-full bg-meal live-pulse" />
                <span className="text-sm text-ink/70">
                  <strong className="text-ink">Meal Planning</strong> is live now —{" "}
                  <Link href="/categories/meal-planning/interactive" className="text-accent font-medium hover:underline">
                    try it free <ArrowRight size={14} className="inline" />
                  </Link>
                </span>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  href="/categories/meal-planning/interactive"
                  className="btn-primary bg-meal hover:bg-emerald-600 text-base py-3 px-6 justify-center"
                >
                  Get Your Meal Plan <ChevronRight size={18} />
                </Link>
                <Link href="/waitlist" className="btn-secondary justify-center">
                  Join Waitlist
                </Link>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-4 mt-6 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {["#10B981", "#3B82F6", "#8B5CF6", "#F97316", "#7C3AED"].map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white" style={{ background: c }}>
                      {["SM", "MT", "JL", "DK", "KC"][i]}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted">
                  <Star size={12} className="text-highlight fill-highlight" />
                  <Star size={12} className="text-highlight fill-highlight" />
                  <Star size={12} className="text-highlight fill-highlight" />
                  <Star size={12} className="text-highlight fill-highlight" />
                  <Star size={12} className="text-highlight fill-highlight" />
                  <span className="ml-1"><strong className="text-ink">4.9</strong> from 1,247+ users</span>
                </div>
              </div>
            </div>

            {/* Right: Hero visual */}
            <div className="flex-1 max-w-lg w-full">
              <div className="relative">
                {/* Main meal photo placeholder */}
                <div className="w-full aspect-[4/3] rounded-3xl bg-gradient-to-br from-meal/20 via-white to-accent/10 border border-border/50 shadow-xl overflow-hidden relative">
                  {/* Food emoji collage */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-3 p-8">
                      {["🥗", "🍣", "🥑", "🍝", "🥩", "🫐", "🥘", "🧁", "🥦"].map((emoji, i) => (
                        <div key={i} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center text-2xl sm:text-3xl shadow-sm border border-border/30 hover:scale-105 transition-transform"
                          style={{ animationDelay: `${i * 80}ms` }}>
                          {emoji}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
                </div>

                {/* Floating cards */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-lg border border-border/50 flex items-center gap-3 animate-float">
                  <div className="w-10 h-10 rounded-xl bg-meal/10 flex items-center justify-center">
                    <DollarSign size={20} className="text-meal" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">Saved this week</p>
                    <p className="text-sm font-bold text-meal">$133</p>
                  </div>
                </div>

                <div className="absolute -top-3 -right-3 bg-white rounded-2xl px-4 py-3 shadow-lg border border-border/50 flex items-center gap-3 animate-float" style={{ animationDelay: "-2s" }}>
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Clock size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">Time saved</p>
                    <p className="text-sm font-bold text-accent">4 hrs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UGC / Testimonials Section */}
      <section className="section-padding bg-white border-y border-border/50">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-3">Real Results. Real People.</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-ink">
              What Our Users Are Saying
            </h2>
            <p className="text-muted mt-3 max-w-lg mx-auto">
              Real families, real savings. Here's what happens when AI handles the dinner decisions.
            </p>
          </div>

          {/* Testimonial cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card animate-slide-up group" style={{ animationDelay: `${i * 100}ms` }}>
                {/* Before/After cards */}
                {i % 2 === 0 && (
                  <div className="flex gap-2 mb-4">
                    <div className="flex-1 px-3 py-2 rounded-xl bg-rose-50 border border-rose-100">
                      <p className="text-[10px] font-semibold text-rose-400 uppercase">Before</p>
                      <p className="text-xs text-rose-500 mt-0.5">Hours planning</p>
                    </div>
                    <div className="flex-1 px-3 py-2 rounded-xl bg-meal/10 border border-meal/20">
                      <p className="text-[10px] font-semibold text-meal uppercase">After</p>
                      <p className="text-xs text-meal font-medium mt-0.5">90 seconds</p>
                    </div>
                  </div>
                )}
                {/* Quote */}
                <p className="text-sm text-ink/80 leading-relaxed mb-4 relative pl-4 border-l-2 border-accent/20">
                  {t.text}
                </p>
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-sm font-bold text-white`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink">{t.name}</p>
                    <p className="text-xs text-muted">{t.role}</p>
                  </div>
                </div>
                {/* Results */}
                <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border/50">
                  <span className="badge badge-success text-[10px]">{t.time} saved</span>
                  {t.saved !== "N/A" && <span className="badge badge-accent text-[10px]">{t.saved} saved</span>}
                  <span className="verified-badge"><Check size={10} /> Verified</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom trust bar */}
          <div className="flex items-center justify-center gap-6 mt-8 text-xs text-muted">
            <span className="flex items-center gap-1.5"><Check size={12} className="text-meal" /> 1,247+ active users</span>
            <span className="flex items-center gap-1.5"><Check size={12} className="text-meal" /> 4.9/5 rating</span>
            <span className="flex items-center gap-1.5"><Check size={12} className="text-meal" /> $0 to start</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-gradient-to-b from-cream to-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-ink">
              From Questions to Dinner, in 90 Seconds
            </h2>
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-24 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-0.5 bg-gradient-to-r from-meal/30 via-accent/30 to-highlight/30" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {HOW_IT_WORKS.map((item, i) => (
                <div key={i} className="text-center animate-slide-up" style={{ animationDelay: `${i * 150}ms` }}>
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-border/50 flex items-center justify-center mx-auto mb-5 text-accent relative z-10">
                    {item.icon}
                  </div>
                  <div className="card p-6">
                    <span className="text-xs font-bold text-accent tracking-widest">STEP 0{item.step}</span>
                    <h3 className="text-lg font-semibold text-ink mt-2 mb-2">{item.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link
              href="/categories/meal-planning/interactive"
              className="btn-primary bg-meal hover:bg-emerald-600 text-base py-3 px-8"
            >
              Try Meal Planning Free <ArrowRight size={18} />
            </Link>
            <p className="text-xs text-muted mt-3">No credit card required. 1 free plan per week.</p>
          </div>
        </div>
      </section>

      {/* Vertical Cards */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-2">Choose Your Cofounder</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink">
                AI Agents for Every Area of Life
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CATEGORIES.slice(0, 2).map((cat) => (
              <Link
                key={cat.key}
                href={cat.href}
                className="card p-6 hover:border-meal/30 hover:shadow-lg group overflow-hidden relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{cat.icon}</span>
                    {cat.tag && (
                      <span className={`badge ${cat.key === "meal-planning" ? "badge-success" : "badge-accent"} flex items-center gap-1`}>
                        {cat.key === "meal-planning" && <span className="w-1.5 h-1.5 rounded-full bg-meal animate-pulse" />}
                        {cat.tag}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-2">{cat.title}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-4">{cat.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">{cat.count} users</span>
                    <span className="text-sm font-medium text-accent group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      {cat.key === "meal-planning" ? "Try it free" : "Get notified"} <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {CATEGORIES.slice(2).map((cat) => (
              <Link
                key={cat.key}
                href={cat.href}
                className="card p-6 hover:border-solopreneur/30 hover:shadow-lg group overflow-hidden relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{cat.icon}</span>
                    {cat.tag && <span className="badge badge-accent">{cat.tag}</span>}
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-2">{cat.title}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-4">{cat.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">{cat.count} waitlist</span>
                    <span className="text-sm font-medium text-accent group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Join waitlist <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-gradient-to-b from-cream to-white">
        <div className="section-container text-center">
          <div className="max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <ChefHat size={30} className="text-accent" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-ink mb-4">
              Ready to stop deciding what's for dinner?
            </h2>
            <p className="text-lg text-muted mb-8">
              1,247 busy families already let AI handle the hard part. Join them for free.
            </p>
            <Link
              href="/categories/meal-planning/interactive"
              className="btn-primary bg-meal hover:bg-emerald-600 text-base py-3 px-8"
            >
              Get Your First Meal Plan <ChevronRight size={18} />
            </Link>
            <p className="text-xs text-muted mt-3">90 seconds. No credit card. One free plan per week.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
