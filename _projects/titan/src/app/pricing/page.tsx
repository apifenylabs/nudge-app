"use client";

import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────────────────────
   Pricing Page — Stripe Test Mode (localStorage mock)
   Uses localStorage to simulate checkout instead of Supabase/DB
   ───────────────────────────────────────────────────────────── */

type BillingCycle = "monthly" | "annual";

interface Plan {
  id: string;
  name: string;
  subtitle: string;
  rank: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
  color: string;
}

const plans: Plan[] = [
  {
    id: "novice",
    name: "Novice",
    subtitle: "E-Rank",
    rank: "E",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "Start your journey. Basic agent building with community templates.",
    color: "from-slate-400 to-slate-500",
    features: [
      "1 Agent slot",
      "Basic prompt tools",
      "Text-only responses",
      "Community templates",
      "24h support response",
    ],
    highlighted: false,
  },
  {
    id: "hunter",
    name: "Hunter",
    subtitle: "B-Rank",
    rank: "B",
    monthlyPrice: 29,
    annualPrice: 290,
    description: "Unlock tool integration and advanced memory. Bleed the gates dry.",
    color: "from-cyan-500 to-cyan-600",
    badge: "Most Popular",
    features: [
      "5 Agent slots",
      "Tool integration (APIs)",
      "File & web access",
      "Advanced memory (1M tokens)",
      "Custom knowledge bases",
      "Priority support (4h)",
    ],
    highlighted: true,
  },
  {
    id: "sovereign",
    name: "Sovereign",
    subtitle: "S-Rank",
    rank: "S",
    monthlyPrice: 99,
    annualPrice: 990,
    description: "Full orchestration, unlimited agents, private deployment. Ascend.",
    color: "from-purple-500 to-fuchsia-600",
    features: [
      "Unlimited agents",
      "Multi-agent orchestration",
      "API access & webhooks",
      "Custom training & fine-tuning",
      "Private deployment (VPC)",
      "Dedicated account manager",
      "99.99% SLA",
    ],
    highlighted: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    subtitle: "Guild",
    rank: "G",
    monthlyPrice: 499,
    annualPrice: 4990,
    description: "For organizations building at scale. Custom everything.",
    color: "from-amber-500 to-orange-600",
    features: [
      "Unlimited agents + teams",
      "SSO / SAML / RBAC",
      "On-premise deployment",
      "Custom model training",
      "White-label options",
      "24/7 dedicated support",
      "Custom contracts & invoicing",
    ],
    highlighted: false,
  },
];

/* ─────────────────────────────────────────────────────────────
   localStorage mock checkout
   ───────────────────────────────────────────────────────────── */
function simulateCheckout(planId: string, billing: BillingCycle) {
  const key = "titan_mock_checkout";
  const existing = JSON.parse(localStorage.getItem(key) || "{}");
  const now = Date.now();

  existing[planId] = {
    planId,
    billing,
    purchasedAt: now,
    expiresAt: now + (billing === "annual" ? 365 : 30) * 24 * 60 * 60 * 1000,
    status: "active",
    orderId: `mock_${planId}_${now}`,
  };

  localStorage.setItem(key, JSON.stringify(existing));
  return existing[planId];
}

function getActivePlans(): Record<string, any> {
  return JSON.parse(localStorage.getItem("titan_mock_checkout") || "{}");
}

function clearCheckout() {
  localStorage.removeItem("titan_mock_checkout");
}

/* ─────────────────────────────────────────────────────────────
   Plan Card Component
   ───────────────────────────────────────────────────────────── */
function PlanCard({
  plan,
  billing,
  onCheckout,
  active,
}: {
  plan: Plan;
  billing: BillingCycle;
  onCheckout: (id: string) => void;
  active: boolean;
}) {
  const price = billing === "monthly" ? plan.monthlyPrice : plan.annualPrice;

  return (
    <div
      className={`relative rounded-2xl p-[1px] transition-all duration-300 ${
        plan.highlighted ? "scale-105 z-10" : "scale-100"
      } ${active ? "ring-2 ring-cyan-400" : ""}`}
    >
      {/* glow border */}
      {plan.highlighted && (
        <div
          className="absolute inset-0 rounded-2xl opacity-40 blur-sm"
          style={{
            background: "linear-gradient(135deg, #22d3ee, #a855f7)",
          }}
        />
      )}

      <div className="glass relative rounded-2xl p-6 flex flex-col">
        {/* badge */}
        {plan.badge && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-[10px] font-bold text-white uppercase tracking-widest">
            {plan.badge}
          </div>
        )}

        {/* header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white">{plan.name}</h3>
            <p className="text-xs text-slate-500">{plan.description}</p>
          </div>
          <span
            className={`text-xs font-black uppercase tracking-widest bg-gradient-to-r ${plan.color} text-transparent bg-clip-text`}
          >
            {plan.subtitle}
          </span>
        </div>

        {/* price */}
        <div className="mb-4">
          {price === 0 ? (
            <span className="text-3xl font-black text-white">Free</span>
          ) : (
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-white">${price}</span>
              <span className="text-sm text-slate-500">
                /{billing === "monthly" ? "mo" : "yr"}
              </span>
            </div>
          )}
          {billing === "annual" && price > 0 && (
            <p className="text-[10px] text-cyan-400 mt-0.5">
              Save ${plan.monthlyPrice * 12 - price}/yr
            </p>
          )}
        </div>

        {/* features */}
        <ul className="space-y-2 mb-6 flex-1">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
              <span className="text-cyan-400 mt-0.5 shrink-0">◆</span>
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => onCheckout(plan.id)}
          className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
            plan.highlighted
              ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg hover:shadow-cyan-500/30"
              : "border border-slate-600 text-slate-300 hover:border-cyan-500/50 hover:text-white"
          }`}
        >
          {active ? "✓ Active" : plan.id === "novice" ? "Current Plan" : "Choose Plan"}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Success Modal
   ───────────────────────────────────────────────────────────── */
function SuccessModal({
  order,
  onClose,
}: {
  order: any;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="glass rounded-2xl p-8 max-w-sm w-full mx-4 text-center border border-cyan-500/20">
        <div className="text-5xl mb-4">⚔️</div>
        <h3 className="text-xl font-bold text-white mb-2">Purchase Complete!</h3>
        <p className="text-slate-400 text-sm mb-4">
          Your <span className="text-cyan-400 font-semibold">{order.planId}</span> plan is now active.
        </p>
        <div className="bg-slate-800/50 rounded-xl p-3 mb-4 text-left text-xs font-mono">
          <div className="text-slate-500">Order ID</div>
          <div className="text-cyan-400 truncate">{order.orderId}</div>
          <div className="text-slate-500 mt-1">Status</div>
          <div className="text-green-400">{order.status}</div>
          <div className="text-slate-500 mt-1">Billing</div>
          <div className="text-slate-300">{order.billing}</div>
          <div className="text-slate-500 mt-1">Expires</div>
          <div className="text-slate-300">{new Date(order.expiresAt).toLocaleDateString()}</div>
        </div>
        <p className="text-[10px] text-slate-600 mb-4">
          🔒 Test mode — no real payment processed. Stripe checkout coming soon.
        </p>
        <button
          onClick={onClose}
          className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Page Component
   ───────────────────────────────────────────────────────────── */
export default function PricingPage() {
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [activePlans, setActivePlans] = useState<Record<string, any>>({});
  const [checkoutOrder, setCheckoutOrder] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.title = 'Pricing — Titan | AI Agent Builder Plans';
    const existing = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (existing) existing.content = 'Titan pricing plans: Free tier, Pro $20/mo, Team $50/mo, Enterprise $200/mo. Build unlimited AI agents with rank-based progression, skill trees, and multi-agent orchestration.';
    setActivePlans(getActivePlans());
  }, []);

  const handleCheckout = (planId: string) => {
    const order = simulateCheckout(planId, billing);
    setActivePlans(getActivePlans());
    setCheckoutOrder(order);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#08080f]">
      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://titan.vercel.app/" },
              { "@type": "ListItem", "position": 2, "name": "Pricing", "item": "https://titan.vercel.app/pricing" },
            ],
          }),
        }}
      />

      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-[#08080fe0] backdrop-blur-xl border-b border-[#1e293b]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <span className="text-lg font-bold">
            <span className="text-cyan-400">Ti</span>
            <span className="text-purple-400">tan</span>
            {" "}
            <span className="text-sm font-normal text-slate-500">/ Pricing</span>
          </span>
          <a
            href="/"
            className="text-xs text-slate-500 hover:text-cyan-400 transition-colors"
          >
            ← Back
          </a>
        </div>
      </nav>

      <main className="relative z-10 py-16 sm:py-24 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
            Choose Your{" "}
            <span className="text-gradient">Rank</span>
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto mb-6">
            Start free. Upgrade when you outgrow the basics. No hidden fees — cancel anytime.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 bg-slate-900/50 rounded-xl p-1 border border-slate-800/50">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                billing === "monthly"
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                billing === "annual"
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Annual{" "}
              <span className="text-[10px] text-cyan-400 font-bold">Save 15%</span>
            </button>
          </div>
        </div>

        {/* Plans grid */}
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-start">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              billing={billing}
              onCheckout={handleCheckout}
              active={!!activePlans[plan.id]}
            />
          ))}
        </div>

        {/* Test mode notice */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/5 border border-amber-500/20 text-xs text-amber-400">
            <span>🔬</span>
            Test mode — localStorage mock. Real Stripe checkout coming soon.
          </div>
        </div>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto mt-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Frequently Asked
          </h2>
          <div className="space-y-4">
            {[
              { q: "Can I switch plans anytime?", a: "Yes. Upgrade or downgrade instantly. Changes take effect on your next billing cycle." },
              { q: "What happens when I hit my agent limit?", a: "You can still access existing agents. New agent creation pauses until you upgrade or free up a slot." },
              { q: "Is there a free trial for paid plans?", a: "All paid plans include a 14-day free trial. No credit card required." },
              { q: "Can I cancel anytime?", a: "Yes. Cancel with one click. No lock-in contracts." },
              { q: "Do you offer custom enterprise pricing?", a: "Contact us at enterprise@titan.ai for custom quotes at scale." },
            ].map((faq, i) => (
              <details key={i} className="glass rounded-xl border border-slate-800/50 group">
                <summary className="px-5 py-3.5 text-sm font-medium text-slate-300 cursor-pointer hover:text-white transition-colors list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-cyan-400 text-xs group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-4 text-xs text-slate-500 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      </main>

      {/* Success modal */}
      {checkoutOrder && (
        <SuccessModal
          order={checkoutOrder}
          onClose={() => setCheckoutOrder(null)}
        />
      )}
    </div>
  );
}
