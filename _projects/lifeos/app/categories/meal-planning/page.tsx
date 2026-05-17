"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChefHat,
  ClipboardList,
  Sparkles,
  ShoppingCart,
  Apple,
  Users,
  MapPin,
  ChevronDown,
  Hammer,
  Utensils,
  Sun,
  Moon,
  ListChecks,
} from "lucide-react";

const SAMPLE_PLAN = [
  { day: "Mon", meals: ["Veggie Scramble + Avocado Toast", "Quinoa & Grilled Chicken Bowl", "Lemon Herb Salmon + Roasted Veggies"] },
  { day: "Tue", meals: ["Greek Yogurt Parfait + Berries", "Mediterranean Chickpea Wrap", "Beef Stir-Fry with Brown Rice"] },
  { day: "Wed", meals: ["Overnight Oats + Almond Butter", "Turkey & Avocado Sandwich", "Baked Tofu with Sesame Broccoli"] },
  { day: "Thu", meals: ["Smoothie Bowl + Granola", "Lentil Soup + Crusty Bread", "Grilled Shrimp Tacos + Mango Salsa"] },
  { day: "Fri", meals: ["Poached Eggs + Sautéed Greens", "Tuna Poke Bowl", "Pesto Chicken with Zucchini Noodles"] },
  { day: "Sat", meals: ["Banana Pancakes + Maple Drizzle", "Caprese Panini + Side Salad", "Herb-Crusted Lamb + Mashed Cauliflower"] },
  { day: "Sun", meals: ["Breakfast Burrito + Salsa", "Roasted Veggie Buddha Bowl", "Thai Green Curry + Jasmine Rice"] },
];

const HOW_IT_WORKS = [
  {
    icon: ChefHat,
    title: "Tell us about yourself",
    desc: "Your diet, allergies, cuisine preferences, and health goals. The more we know, the better your plan.",
  },
  {
    icon: ClipboardList,
    title: "List your pantry",
    desc: "Optional, but helps reduce food waste and saves you money. AI will prioritize what you already have.",
  },
  {
    icon: Sparkles,
    title: "AI generates your week",
    desc: "A balanced, varied, realistic plan — no weird ingredients, no repetitive meals, no unrealistic prep times.",
  },
  {
    icon: ShoppingCart,
    title: "Get your grocery list",
    desc: "Smart auto-generated shopping list with substitutions. Adapts to what's on sale and in season.",
  },
];

const COMING_FEATURES = [
  { icon: ShoppingCart, title: "One-Click Grocery Ordering", desc: "Push your list straight to your preferred delivery service. We're integrating with Instacart, Amazon Fresh, and local grocers." },
  { icon: Apple, title: "Calorie & Macro Tracking", desc: "Automatic daily targets that adjust as you log meals. No more manual logging — just eat what's planned." },
  { icon: Users, title: "Family & Couples Plans", desc: "Plans for 2, 4, or more. Each person gets their preferences respected. Smarter than cooking two separate dinners." },
  { icon: MapPin, title: "Restaurant Recommendations", desc: "When you're eating out, AI recommends dishes from local menus that match your plan and macros." },
];

export default function MealPlanningPage() {
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
      <section className="section-padding bg-gradient-to-b from-meal/5 via-cream to-cream dark:from-meal/10 dark:via-surfaceDark dark:to-surfaceDark">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-meal/10 dark:bg-meal/10 text-meal dark:text-meal/80 text-sm font-medium border border-meal/20 dark:border-meal/30">
              <Sparkles size={14} />
              Coming Soon
            </div>

            {/* Hero text */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ink dark:text-cream leading-tight">
              🥗 AI Meal Planner —{" "}
              <span className="text-meal">Your Personal Nutrition Cofounder</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted dark:text-cream/80 max-w-2xl mx-auto leading-relaxed">
              Stop staring at your fridge. Get a personalized weekly meal plan
              based on your preferences, dietary needs, and what&apos;s in your
              pantry. No more &ldquo;what&apos;s for dinner?&rdquo;
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/categories/meal-planning/interactive" className="btn-primary bg-meal hover:bg-meal/90 text-lg px-8 py-3.5 shadow-lg shadow-meal/20 hover:shadow-xl hover:shadow-meal/30">
                Get Your First Meal Plan — Free
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
            <p className="text-muted dark:text-cream/80 text-lg max-w-xl mx-auto">
              Four steps to never asking &ldquo;what&apos;s for dinner?&rdquo; again.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Timeline connector (desktop) */}
            <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-meal/30 via-meal to-meal/30" />

            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.title} className="relative text-center group">
                {/* Step number */}
                <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-meal/10 flex items-center justify-center group-hover:bg-meal/20 transition-colors relative z-10">
                  <step.icon className="w-7 h-7 text-meal" />
                </div>
                {/* Connecting dot */}
                <div className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-meal border-4 border-cream dark:border-surfaceDark z-10" />
                {/* Content */}
                <div className="card p-6 text-center">
                  <span className="block text-meal font-bold text-2xl mb-2">
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

      {/* Sample Plan Preview */}
      <section className="section-padding bg-meal/5 dark:bg-meal/5">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-ink dark:text-cream mb-4">
              Sample Plan Preview
            </h2>
            <p className="text-muted dark:text-cream/80 text-lg max-w-xl mx-auto">
              This is what your actual AI-generated plan looks like — real meals, no repeats.
            </p>
          </div>

          {/* Desktop table */}
          <div className="hidden lg:block overflow-x-auto rounded-2xl border border-border dark:border-darkBorder">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-meal/10 dark:bg-meal/10">
                  <th className="p-4 font-semibold text-ink dark:text-cream border-r border-border dark:border-darkBorder">
                    Day
                  </th>
                  <th className="p-4 font-semibold text-meal dark:text-meal/80 border-r border-border dark:border-darkBorder">
                    <Sun size={14} className="inline mr-1" /> Breakfast
                  </th>
                  <th className="p-4 font-semibold text-amber-600 dark:text-amber-400 border-r border-border dark:border-darkBorder">
                    <Utensils size={14} className="inline mr-1" /> Lunch
                  </th>
                  <th className="p-4 font-semibold text-indigo-600 dark:text-indigo-400">
                    <Moon size={14} className="inline mr-1" /> Dinner
                  </th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE_PLAN.map((row, i) => (
                  <tr
                    key={row.day}
                    className={`border-t border-border dark:border-darkBorder ${
                      i % 2 === 0 ? "bg-white dark:bg-surfaceDark" : "bg-cream dark:bg-surfaceDark/50"
                    } hover:bg-meal/5 dark:hover:bg-meal/5 transition-colors`}
                  >
                    <td className="p-4 font-semibold text-ink dark:text-cream border-r border-border dark:border-darkBorder">
                      {row.day}
                    </td>
                    {row.meals.map((meal, j) => (
                      <td
                        key={j}
                        className="p-4 text-sm text-ink/80 dark:text-cream/80 border-r border-border dark:border-darkBorder last:border-r-0"
                      >
                        {meal}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="lg:hidden space-y-4">
            {SAMPLE_PLAN.map((row) => (
              <div
                key={row.day}
                className="card p-4 space-y-3"
              >
                <div className="text-meal font-bold text-lg">{row.day}</div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-meal mt-0.5"><Sun size={14} /></span>
                    <span className="text-ink dark:text-cream">{row.meals[0]}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-amber-600 mt-0.5"><Utensils size={14} /></span>
                    <span className="text-ink dark:text-cream">{row.meals[1]}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-600 mt-0.5"><Moon size={14} /></span>
                    <span className="text-ink dark:text-cream">{row.meals[2]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-muted text-sm">
              * Your plan adapts to your preferences. This is just an example.
            </p>
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
            <p className="text-muted dark:text-cream/80 text-lg max-w-xl mx-auto">
              We&apos;re building the full nutrition OS. Here&apos;s what&apos;s on the roadmap.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMING_FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="card p-6 hover:border-meal/30 group"
              >
                <div className="w-12 h-12 rounded-xl bg-meal/10 flex items-center justify-center mb-4 group-hover:bg-meal/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-meal" />
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
              href="/categories/meal-planning/interactive"
              className="btn-primary bg-meal hover:bg-meal/90 text-lg px-8 py-3.5 shadow-lg shadow-meal/20"
            >
              Try the Interactive Planner
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-meal to-meal/80">
        <div className="section-container text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Stop the &ldquo;What&apos;s for Dinner?&rdquo; Spiral?
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
            First plan is free. No credit card. No commitment. Just better meals
            from day one.
          </p>
          <Link
            href="/categories/meal-planning/interactive"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-meal rounded-xl font-semibold text-lg hover:bg-white/90 active:scale-[0.98] transition-all shadow-xl"
          >
            Get Your First Meal Plan — Free
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
