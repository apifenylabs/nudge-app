"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Sparkles, ArrowRight, Check, Star, Clock, DollarSign,
  Heart, ChevronRight, TrendingDown, Zap, Award
} from "lucide-react";

const TESTIMONIALS = [
  { name: "Sarah M.", role: "Mom of 3, HK", text: "Saved me 4 hours/week and $187 on groceries this month! Now it takes 90 seconds.", avatar: "SM", saved: "$187/mo", time: "4 hrs/wk" },
  { name: "Mike T.", role: "Professional", text: "Finally a planner that actually uses what's in my fridge. The pantry scan is genius.", avatar: "MT", saved: "$94/mo", time: "2 hrs/wk" },
  { name: "Jessica L.", role: "New Mom", text: "I've tried every meal planning app. This one actually GETS me. Family profiles are a lifesaver.", avatar: "JL", saved: "N/A", time: "5 hrs/wk" },
  { name: "David K.", role: "Freelancer", text: "The budget slider changed my life. Saved $200+ in the first two weeks.", avatar: "DK", saved: "$200+/mo", time: "3 hrs/wk" },
  { name: "Rachel P.", role: "Dietitian", text: "I recommend this to my clients. Sound nutrition logic, doable recipes.", avatar: "RP", saved: "N/A", time: "3 hrs/wk" },
  { name: "Tom W.", role: "Remote Worker", text: "$210 saved in three weeks. The leftover integration is a game-changer.", avatar: "TW", saved: "$70/mo", time: "2 hrs/wk" },
];

const CATEGORIES = [
  { key: "meal-planning", title: "Meal Planning AI", tag: "LIVE NOW", description: "Your AI cofounder builds a personalized weekly plan in 90 seconds.", icon: "🍽️", href: "/categories/meal-planning/interactive", count: "1,247" },
  { key: "personal-finance", title: "Personal Finance AI", tag: "Coming soon", description: "Personalized budget, savings, and investment strategy.", icon: "💰", href: "/categories/personal-finance", count: "892" },
  { key: "solopreneur", title: "Solopreneur AI", tag: "Coming soon", description: "Launch faster with AI research, pricing, and strategy.", icon: "🚀", href: "/categories/solopreneur", count: "634" },
  { key: "travel", title: "Travel AI", tag: "Coming soon", description: "AI builds itineraries, finds deals, handles logistics.", icon: "✈️", href: "/categories/travel", count: "521" },
];

const HOW_IT_WORKS = [
  { step: 1, emoji: "📋", title: "Answer 7 Questions", desc: "Diet, allergies, budget, cook time. Takes 60 seconds.", photo: "1556909114-f6e7ad7d3136" },
  { step: 2, emoji: "🤖", title: "AI Builds Your Week", desc: "4 agents create your perfect plan. Real recipes. No repeats.", photo: "1466637574441-749b8f19452f" },
  { step: 3, emoji: "🛒", title: "Smart Shopping List", desc: "One-click order to Instacart/Amazon Fresh. Save $200+/mo.", photo: "1542838132-92c53300491e" },
  { step: 4, emoji: "💬", title: "Tweak on the Go", desc: "Live Mode to change meals, budget, get new suggestions.", photo: "1606787364406-a3c2e3a43ab9" },
];

const SAMPLE_MEALS = [
  { day: "Mon", meals: ["Overnight oats + berries", "Quinoa bowl + tahini", "Lemon herb chicken"], emoji: "🥗" },
  { day: "Tue", meals: ["Green smoothie", "Mediterranean wrap", "Salmon + mango salsa"], emoji: "🍣" },
  { day: "Wed", meals: ["Avocado toast", "Falafel + hummus", "Turkey chili"], emoji: "🥑" },
];

const COMPARISONS = [
  { before: "4+ hrs/week planning", after: "90 seconds", saved: "$230/mo", name: "Martinez Family" },
  { before: "Takeout 5x/week", after: "Home-cooked 6x/week", saved: "$390/mo", name: "David" },
];

export default function Home() {
  const ugcTimer = useRef<ReturnType<typeof setInterval>>();
  useEffect(() => {
    ugcTimer.current = setInterval(() => {}, 5000);
    return () => clearInterval(ugcTimer.current);
  }, []);

  const heroEmojiRows = [
    ["🥗", "🍣", "🥑", "🍝", "🥩"],
    ["🥦", "🍳", "🥘", "🧁", "🥞"],
    ["🫐", "🍜", "🥟", "🌯", "🥪"],
  ];
  const bgEmojis = ["🥩","🥦","🥑","🍝","🍣","🥗","🥘","🍳","🥐","🫐","🥬","🧀","🍤","🥕","🧅","🍄","🍋","🥝","🍜","🥟","🍙","🥞","🧇","🥓","🌯","🥪","🍛","🥐","🥒","🫑"];

  return (
    <div className="min-h-screen bg-cream">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cream via-white to-cream">
        <div className="absolute inset-0 pointer-events-none select-none opacity-[0.035]">
          <div className="grid grid-cols-6 gap-6 p-12">
            {bgEmojis.map((e,i) => (
              <span key={i} className="text-3xl" style={{animation:`food-float ${5+(i%3)*2}s ease-in-out infinite`,animationDelay:`-${i*0.4}s`}}>{e}</span>
            ))}
          </div>
        </div>
        <div className="absolute top-[-15%] left-[-5%] w-[50%] h-[50%] rounded-full bg-meal/[0.04] blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[50%] h-[50%] rounded-full bg-accent/[0.03] blur-[120px]" />

        <div className="section-container relative z-10 pt-8 sm:pt-12 pb-12 sm:pb-16">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="flex-1 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-meal/10 border border-meal/20 text-xs font-semibold text-meal mb-5 animate-fade-in">
                <span className="w-2 h-2 rounded-full bg-meal animate-pulse" />
                Trusted by <strong className="mx-1">1,247 families</strong> — saving $230/mo avg
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ink leading-[1.1] mb-5 text-balance">
                <span className="inline-flex items-center gap-2 flex-wrap justify-center lg:justify-start">
                  <span className="food-float text-3xl">🥘</span>Stop asking<span className="food-float-delayed text-3xl">🤔</span>
                </span>
                <span className="block mt-1">&quot;What&apos;s for dinner?&quot;</span>
                <span className="gradient-text block mt-2">Let AI handle it.</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted max-w-xl mx-auto lg:mx-0 mb-6 leading-relaxed">
                Your personal AI cofounder builds a <strong>weekly meal plan</strong> tailored to your diet, budget, and pantry. <strong>90 seconds.</strong>
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-meal/5 border border-meal/10 text-xs font-medium text-meal"><DollarSign size={14} /> Save $230/mo</span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent/5 border border-accent/10 text-xs font-medium text-accent"><Clock size={14} /> Save 4 hrs/wk</span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-highlight/5 border border-highlight/10 text-xs font-medium text-highlight"><TrendingDown size={14} /> -60% food waste</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
                <Link href="/categories/meal-planning/interactive" className="inline-flex items-center gap-2 px-6 py-3.5 bg-meal hover:bg-emerald-600 text-white font-semibold text-base rounded-2xl shadow-lg shadow-meal/25 hover:shadow-xl transition-all active:scale-[0.98]">
                  <Sparkles size={18} />Get Your Free Meal Plan <ChevronRight size={18} />
                </Link>
                <Link href="/waitlist" className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-ink font-medium text-base rounded-2xl border border-border hover:border-accent/30 hover:bg-accent/5 transition-all justify-center">Join Waitlist</Link>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {[{c:"bg-meal",l:"SM"},{c:"bg-finance",l:"MT"},{c:"bg-solopreneur",l:"JL"},{c:"bg-travel",l:"DK"},{c:"bg-accent",l:"+"}].map((a,i) => (
                    <div key={i} className={`w-9 h-9 rounded-full border-2 border-white ${a.c} flex items-center justify-center text-[11px] font-bold text-white shadow-sm`}>{a.l}</div>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} className="text-highlight fill-highlight" />)}
                  <span className="ml-1"><strong className="text-ink">4.9</strong> from 1,247+ reviews</span>
                </div>
              </div>
            </div>

            <div className="flex-1 max-w-lg w-full">
              <div className="relative">
                <div className="w-full aspect-square rounded-3xl bg-gradient-to-br from-meal/[0.08] via-white to-accent/[0.06] border border-border/50 shadow-xl overflow-hidden relative">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
                    {heroEmojiRows.map((row, ri) => (
                      <div key={ri} className="flex gap-2 justify-center">
                        {row.map((emoji, ci) => (
                          <div key={ci} className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-2xl sm:text-3xl shadow-sm border border-border/20"
                            style={{animation:`food-float ${5+(ri*3+ci)%4}s ease-in-out infinite`,animationDelay:`-${(ri*5+ci)*0.3}s`}}>{emoji}</div>
                        ))}
                      </div>
                    ))}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-meal/20 to-accent/10 blur-xl animate-pulse" />
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-3 -left-3 bg-white rounded-2xl px-4 py-3 shadow-lg border border-border/50 flex items-center gap-3 animate-float z-10">
                  <div className="w-10 h-10 rounded-xl bg-meal/10 flex items-center justify-center"><DollarSign size={20} className="text-meal" /></div>
                  <div><p className="text-[10px] text-muted uppercase tracking-wider font-semibold">Saved this month</p><p className="text-sm font-bold text-meal">$230 avg</p></div>
                </div>
                <div className="absolute -top-3 -right-3 bg-white rounded-2xl px-4 py-3 shadow-lg border animate-float z-10" style={{animationDelay:"-2.5s"}}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center"><Clock size={20} className="text-accent" /></div>
                    <div><p className="text-[10px] text-muted uppercase tracking-wider font-semibold">Time saved</p><p className="text-sm font-bold text-accent">4 hrs/wk</p></div>
                  </div>
                </div>
                <div className="absolute -bottom-3 -right-3 bg-white rounded-2xl px-4 py-3 shadow-lg border animate-float z-10" style={{animationDelay:"-1.2s"}}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-highlight/10 flex items-center justify-center"><TrendingDown size={20} className="text-highlight" /></div>
                    <div><p className="text-[10px] text-muted uppercase tracking-wider font-semibold">Less waste</p><p className="text-sm font-bold text-highlight">-60%</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UGC CAROUSEL */}
      <section className="py-8 bg-white border-y border-border/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold text-muted uppercase tracking-widest">📸 Real reviews from real kitchens</span>
            <div className="flex-1 h-px bg-gradient-to-r from-border/50 to-transparent" />
          </div>
          <div className="overflow-hidden">
            <div className="flex gap-4 ugc-track" style={{width:`${TESTIMONIALS.length*2*320}px`}}>
              {[...TESTIMONIALS,...TESTIMONIALS].map((t,i) => (
                <div key={i} className="flex-shrink-0 w-[300px] bg-cream rounded-2xl p-4 border border-border/30 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-meal to-accent flex items-center justify-center text-sm font-bold text-white flex-shrink-0">{t.avatar}</div>
                    <div><p className="text-sm font-semibold text-ink">{t.name}</p><p className="text-[10px] text-muted">{t.role}</p></div>
                    <Star size={14} className="text-highlight fill-highlight ml-auto" />
                  </div>
                  <p className="text-sm text-ink/80 leading-relaxed mb-2">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="px-2 py-0.5 rounded-full bg-meal/10 text-meal font-medium">{t.time} saved</span>
                    {t.saved!=="N/A" && <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">{t.saved}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY BAR */}
      <section className="py-6 bg-meal/5 border-y border-meal/10">
        <div className="section-container">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-muted">
            <span className="flex items-center gap-1.5"><Award size={14} className="text-meal" /><strong className="text-ink">1,247</strong> active families</span>
            <span className="flex items-center gap-1.5"><Star size={14} className="text-highlight fill-highlight" /><strong className="text-ink">4.9/5</strong> rating</span>
            <span className="flex items-center gap-1.5"><Check size={14} className="text-meal" /><strong className="text-ink">$230/mo</strong> avg savings</span>
            <span className="flex items-center gap-1.5"><Heart size={14} className="text-meal" /><strong className="text-ink">94%</strong> recommend</span>
            <span className="flex items-center gap-1.5"><Zap size={14} className="text-accent" /><strong className="text-ink">$0</strong> to start</span>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-padding bg-gradient-to-b from-cream to-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="food-float inline-block text-lg mb-2">👩‍🍳</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-ink mb-3">From Questions to Dinner, in 90 Seconds</h2>
            <p className="text-muted max-w-lg mx-auto">Answer 7 quick questions. Get a perfect plan.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {HOW_IT_WORKS.map((item,i) => (
              <div key={i} className="kitchen-card flex flex-col sm:flex-row items-stretch gap-0 animate-slide-up" style={{animationDelay:`${i*120}ms`}}>
                <div className="sm:w-2/5 h-48 sm:h-auto bg-cover bg-center" style={{backgroundImage:`url(https://images.unsplash.com/photo-${item.photo}?w=600&h=400&fit=crop)`}} />
                <div className="sm:w-3/5 p-5 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="text-xs font-bold text-meal tracking-widest uppercase">Step 0{item.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-ink mb-2">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/categories/meal-planning/interactive" className="inline-flex items-center gap-2 px-8 py-3.5 bg-meal hover:bg-emerald-600 text-white font-semibold rounded-2xl shadow-lg shadow-meal/20 hover:shadow-xl transition-all text-base">
              Try Meal Planning Free <ArrowRight size={18} />
            </Link>
            <p className="text-xs text-muted mt-3">No credit card. 1 free plan per week.</p>
          </div>
        </div>
      </section>

      {/* LIVE PREVIEW */}
      <section className="section-padding bg-white border-y border-border/30">
        <div className="section-container">
          <div className="text-center mb-10">
            <span className="inline-flex gap-1 text-2xl mb-2">🥘 🥗 🍝</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink mt-2">What Your Plan Looks Like</h2>
            <p className="text-muted text-sm mt-2">Real meals. Real variety. No weird ingredients.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {SAMPLE_MEALS.map((day,i) => (
              <div key={i} className="recipe-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-ink">{day.day}</span>
                  <span className="text-2xl food-float">{day.emoji}</span>
                </div>
                {day.meals.map((m,j) => (
                  <div key={j} className="flex items-start gap-2 mb-1.5 text-sm">
                    <span className="text-meal font-medium w-16 flex-shrink-0">{["🌅","☀️","🌙"][j]}</span>
                    <span className="text-ink/80">{m}</span>
                  </div>
                ))}
                <div className="mt-3 pt-3 border-t border-border/30 flex items-center justify-between text-xs text-muted">
                  <span>🔥 ~1,850 cal</span>
                  <span className="text-meal font-semibold">~$12/day</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/categories/meal-planning/interactive" className="text-sm font-medium text-accent hover:underline inline-flex items-center gap-1">
              See your personalized plan → <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* PRICING COMPARISON */}
      <section className="section-padding bg-gradient-to-b from-cream to-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-3xl mb-2 block">💰📊</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink">Save 60% vs Takeout</h2>
              <p className="text-muted mt-2 text-sm">How a family of 4 saves with AI meal planning.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="kitchen-card p-5 text-center border-rose-200 bg-rose-50/30">
                <p className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2">🍕 Eating Out</p>
                <p className="text-3xl font-bold text-rose-500">$900</p>
                <p className="text-xs text-rose-400 mt-1">per month</p>
                <div className="mt-3 space-y-1.5 text-xs text-rose-400">
                  <p>❌ No control</p><p>❌ 45 min/meal</p><p>❌ Hard to eat healthy</p>
                </div>
              </div>
              <div className="kitchen-card p-5 text-center border-amber-200 bg-amber-50/30">
                <p className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-2">🛒 Just Groceries</p>
                <p className="text-3xl font-bold text-amber-600">$650</p>
                <p className="text-xs text-amber-400 mt-1">waste + guesswork</p>
                <div className="mt-3 space-y-1.5 text-xs text-amber-500">
                  <p>⚠️ 30% food waste</p><p>⚠️ 4hrs/wk planning</p><p>⚠️ Repetitive meals</p>
                </div>
              </div>
              <div className="kitchen-card p-5 text-center border-meal/30 bg-meal/5 relative overflow-hidden">
                <div className="absolute top-2 right-2 bg-meal text-white text-[9px] font-bold px-2 py-0.5 rounded-full">BEST VALUE</div>
                <p className="text-xs font-semibold text-meal uppercase tracking-wider mb-2">🤖 With Cofounder</p>
                <p className="text-3xl font-bold text-meal">$520</p>
                <p className="text-xs text-meal/70 mt-1">with savings</p>
                <div className="mt-3 space-y-1.5 text-xs text-meal/80">
                  <p>✅ Save $230+/mo</p><p>✅ 90 seconds planning</p><p>✅ Nutrition-optimized</p>
                </div>
                <div className="mt-4 pt-3 border-t border-meal/10"><p className="text-xl font-bold text-meal">Save 60%</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BEFORE/AFTER */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-ink">Before &amp; After Cofounder</h2>
            <p className="text-muted text-sm mt-2">Real stories from real users.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {COMPARISONS.map((c,i) => (
              <div key={i} className="before-after-card p-5 bg-gradient-to-br from-meal/[0.02] to-accent/[0.02]">
                <div className="flex gap-4 mb-4">
                  <div className="flex-1 p-3 rounded-xl bg-rose-50 border border-rose-100">
                    <p className="text-[10px] font-semibold text-rose-400 uppercase">Before</p>
                    <p className="text-sm text-rose-500 mt-1">{c.before}</p>
                  </div>
                  <div className="flex-1 p-3 rounded-xl bg-meal/10 border border-meal/20">
                    <p className="text-[10px] font-semibold text-meal uppercase">After</p>
                    <p className="text-sm text-meal font-medium mt-1">{c.after}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">{c.name}</span>
                  <span className="text-sm font-bold text-meal">Saved {c.saved}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VERTICAL CARDS */}
      <section className="section-padding bg-cream">
        <div className="section-container">
          <div className="mb-8">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-2">Choose Your Cofounder</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink">AI Agents for Every Area of Life</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CATEGORIES.map((cat,i) => (
              <Link key={cat.key} href={cat.href} className="card p-6 hover:shadow-lg group overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  i===0?"from-meal/20 to-meal/5":i===1?"from-finance/20 to-finance/5":i===2?"from-solopreneur/20 to-solopreneur/5":"from-travel/20 to-travel/5"
                } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{cat.icon}</span>
                    {cat.tag && <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium ${
                      i===0?"bg-meal/10 text-meal":"bg-accent/10 text-accent"
                    }`}>
                      {i===0 && <span className="w-1.5 h-1.5 rounded-full bg-meal animate-pulse" />}
                      {cat.tag}
                    </span>}
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-2">{cat.title}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-4">{cat.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">{cat.count} {i===0?"users":"waitlist"}</span>
                    <span className="text-sm font-medium text-accent group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      {i===0?"Try it free":"Get notified"} <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-padding bg-gradient-to-b from-cream to-white">
        <div className="section-container text-center">
          <div className="max-w-xl mx-auto">
            <div className="food-float text-4xl mb-6">🥘</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-ink mb-4">Ready to stop deciding what&apos;s for dinner?</h2>
            <p className="text-lg text-muted mb-8">1,247 busy families already let AI handle the hard part. Join them for free.</p>
            <Link href="/categories/meal-planning/interactive" className="inline-flex items-center gap-2 px-8 py-3.5 bg-meal hover:bg-emerald-600 text-white font-semibold rounded-2xl shadow-lg shadow-meal/20 hover:shadow-xl transition-all text-base">
              Get Your First Meal Plan <ChevronRight size={18} />
            </Link>
            <p className="text-xs text-muted mt-3">90 seconds. No credit card. One free plan per week.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
