"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const PRICING = [
  {
    name: "Free",
    price: "$0",
    description: "Get started with the basics. No credit card needed.",
    features: [
      "1 active agent",
      "Basic Skill Forge",
      "Standard progression",
      "Community access",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For power users who need more agents and deeper analytics.",
    features: [
      "5 concurrent agents",
      "Advanced Skill Forge + audit",
      "Full analytics dashboard",
      "Export skills to OpenClaw",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "Teams and organizations with compliance requirements.",
    features: [
      "Unlimited agents",
      "All Skill Forge features",
      "Team audit trails",
      "Custom integrations",
      "SLA guarantee",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function PricingSection() {
  const router = useRouter();

  const handlePricingCTA = useCallback((plan: string) => {
    try { track("landing_cta", { label: `pricing_${plan.toLowerCase()}` }); } catch {}
    router.push("/login");
  }, [router]);

  return (
    <section id="pricing" className="border-t border-gray-100 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Simple pricing. No hidden fees.
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Start free. Upgrade when you outgrow the basics.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PRICING.map((plan) => (
            <Card
              key={plan.name}
              className={`relative border ${plan.popular ? 'border-teal-200 shadow-lg shadow-teal-100/50' : 'border-gray-200'}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <Badge className="bg-gradient-to-r from-teal-500 to-amber-500 text-white border-0">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardContent className="p-6 pt-8">
                <h3 className="font-semibold text-gray-900 mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-0.5 mb-2">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="text-sm text-gray-500">{plan.period}</span>}
                </div>
                <p className="text-sm text-gray-500 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="h-4 w-4 text-teal-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full"
                  onClick={() => handlePricingCTA(plan.name)}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
