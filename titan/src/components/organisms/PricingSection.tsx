"use client";

import { useState } from "react";

const PRICING = [
  {
    name: "Hatchling",
    emoji: "🥚",
    monthly: 0,
    annual: 0,
    description: "Start your journey. One agent, basic skills, community queue.",
    features: ["1 agent", "Basic skill tree", "Community support", "Web dashboard", "5 BAU tasks/mo"],
    cta: "Start Free",
    featured: false,
  },
  {
    name: "Apprentice",
    emoji: "🐣",
    monthly: 19,
    annual: 190,
    description: "For builders who need more power. Priority queue + custom skills.",
    features: [
      "5 agents",
      "Advanced skill forging",
      "Priority queue",
      "Email support",
      "Unlimited BAU tasks",
      "Custom skill triggers",
    ],
    cta: "Subscribe",
    featured: true,
  },
  {
    name: "Adept",
    emoji: "🦊",
    monthly: 49,
    annual: 490,
    description: "Full swarm control. Deploy to hardware, negotiate between agents.",
    features: [
      "20 agents",
      "Swarm orchestrator",
      "Robot deployment",
      "API access",
      "Slack/Discord webhooks",
      "Analytics dashboard",
    ],
    cta: "Subscribe",
    featured: false,
  },
  {
    name: "God-Tier",
    emoji: "👑",
    monthly: 149,
    annual: 1490,
    description: "Unlimited everything. God-Tier certification, white-label, SLA.",
    features: [
      "Unlimited agents",
      "God-Tier certification",
      "White-label branding",
      "SLA 99.9%",
      "Dedicated support",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    featured: false,
  },
];

function PricingCard({
  plan,
  annual,
}: {
  plan: (typeof PRICING)[0];
  annual: boolean;
}) {
  const price = annual ? plan.annual : plan.monthly;
  const periodLabel = annual ? "/year" : "/month";
  const savings =
    plan.monthly > 0
      ? Math.round((1 - plan.annual / (plan.monthly * 12)) * 100)
      : 0;

  return (
    <div
      className={`relative p-6 rounded-2xl border transition-all duration-300 flex flex-col ${
        plan.featured
          ? "bg-gradient-to-b from-amber-900/30 to-gray-900 border-amber-500/40 shadow-lg shadow-amber-500/10 scale-105"
          : "bg-gray-800/40 border-gray-700/40 hover:border-gray-600"
      }`}
    >
      {plan.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-purple-600 text-xs font-bold text-white shadow-lg whitespace-nowrap">
          Most Popular
        </div>
      )}
      <div className="text-3xl mb-3">{plan.emoji}</div>
      <h3 className="text-lg font-bold text-white">{plan.name}</h3>
      <p className="text-sm text-gray-400 mt-1 mb-4 leading-relaxed">
        {plan.description}
      </p>

      <div className="mb-4">
        <span className="text-3xl font-bold text-white">
          {price === 0 ? "Free" : `$${price}`}
        </span>
        {price > 0 && (
          <span className="text-sm text-gray-500 ml-1">{periodLabel}</span>
        )}
        {savings > 0 && annual && (
          <div className="mt-1.5 inline-block px-2 py-0.5 rounded-full bg-emerald-900/40 border border-emerald-700/40 text-emerald-400 text-[10px] font-semibold">
            Save {savings}%
          </div>
        )}
      </div>

      <ul className="space-y-2 mb-6 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
            <svg
              className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
          plan.featured
            ? "bg-gradient-to-r from-amber-500 to-purple-600 text-white hover:from-amber-400 hover:to-purple-500 shadow-lg shadow-amber-500/20"
            : "bg-gray-700 text-gray-200 hover:bg-gray-600"
        }`}
      >
        {plan.cta}
      </button>
    </div>
  );
}

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">
          Simple, Transparent Pricing
        </h2>
        <p className="text-gray-400 text-center mb-8 max-w-xl mx-auto">
          Start free. Upgrade when your swarm grows.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span
            className={`text-sm font-medium transition-colors ${
              !annual ? "text-white" : "text-gray-500"
            }`}
          >
            Monthly
          </span>
          <button
            onClick={() => setAnnual((prev) => !prev)}
            className={`relative w-14 h-7 rounded-full transition-colors ${
              annual ? "bg-amber-500" : "bg-gray-600"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                annual ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </button>
          <span
            className={`text-sm font-medium transition-colors ${
              annual ? "text-white" : "text-gray-500"
            }`}
          >
            Annual
            <span className="ml-1.5 text-[10px] text-emerald-400 font-semibold">
              Save up to 17%
            </span>
          </span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {PRICING.map((plan) => (
            <PricingCard key={plan.name} plan={plan} annual={annual} />
          ))}
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">
          All plans include free updates. No hidden fees. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
