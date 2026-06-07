/**
 * Titan — Stripe Checkout Session API
 *
 * POST /api/checkout
 * Body: { plan_id: string, billing: "monthly" | "annual" }
 *
 * Creates a Stripe Checkout Session when STRIPE_SECRET_KEY is configured.
 * Returns mock/test session URL when Stripe keys are absent (dev mode).
 *
 * Env vars:
 *   STRIPE_SECRET_KEY      — Live Stripe secret key
 *   NEXT_PUBLIC_STRIPE_PK  — Stripe publishable key (for client)
 *   NEXT_PUBLIC_BASE_URL   — Site base URL (defaults to localhost:3000)
 */

import { NextResponse } from "next/server";

/* ─────────────────────────────────────────────────────────────
   Plan definitions — mirrors src/app/pricing/page.tsx
   ───────────────────────────────────────────────────────────── */
const PLANS: Record<string, { monthlyPrice: number; annualPrice: number; name: string }> = {
  novice: { monthlyPrice: 0, annualPrice: 0, name: "Novice (E-Rank)" },
  hunter: { monthlyPrice: 2900, annualPrice: 29000, name: "Hunter (B-Rank)" },       // $29 / $290
  elite: { monthlyPrice: 9900, annualPrice: 99000, name: "Elite (A-Rank)" },          // $99 / $990
  sovereign: { monthlyPrice: 24900, annualPrice: 249000, name: "Sovereign (S-Rank)" }, // $249 / $2490
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { plan_id, billing = "monthly" } = body;

    if (!plan_id || !PLANS[plan_id]) {
      return NextResponse.json({ error: `Invalid plan_id: ${plan_id}` }, { status: 400 });
    }

    if (!["monthly", "annual"].includes(billing)) {
      return NextResponse.json({ error: "billing must be 'monthly' or 'annual'" }, { status: 400 });
    }

    const plan = PLANS[plan_id];
    const price = billing === "annual" ? plan.annualPrice : plan.monthlyPrice;

    // Free plan — no checkout needed
    if (price === 0) {
      return NextResponse.json({
        url: `${BASE_URL}/sandbox?plan=${plan_id}&billing=${billing}`,
        free: true,
        message: "Free plan — redirected to Agent Studio",
      });
    }

    // ─── Stripe Checkout (live) ─────────────────────────────
    if (STRIPE_SECRET_KEY) {
      try {
        const stripe = await import("stripe");
        const stripeClient = new stripe.default(STRIPE_SECRET_KEY, {
          apiVersion: "2025-09-30" as any,
        });

        const session = await stripeClient.checkout.sessions.create({
          mode: "subscription",
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: plan.name,
                  description: `${plan.name} — ${billing} billing`,
                },
                unit_amount: price,            // cents
                recurring: {
                  interval: billing === "annual" ? "year" : "month",
                },
              },
              quantity: 1,
            },
          ],
          success_url: `${BASE_URL}/sandbox?session_id={CHECKOUT_SESSION_ID}&plan=${plan_id}`,
          cancel_url: `${BASE_URL}/pricing?canceled=true`,
        });

        return NextResponse.json({ url: session.url, session_id: session.id });
      } catch (stripeError) {
        console.error("Stripe checkout error:", stripeError);
        return NextResponse.json({ error: "Payment service unavailable" }, { status: 502 });
      }
    }

    // ─── Mock / Dev Mode ────────────────────────────────────
    // Return a simulated session URL when Stripe keys aren't configured.
    // In dev, this lets the frontend test the full checkout flow end-to-end.
    const mockSessionId = `cs_mock_${plan_id}_${billing}_${Date.now()}`;
    return NextResponse.json({
      url: `${BASE_URL}/sandbox?session_id=${mockSessionId}&plan=${plan_id}&billing=${billing}&mock=true`,
      session_id: mockSessionId,
      mock: true,
      message: "Mock checkout — set STRIPE_SECRET_KEY for live payments",
    });
  } catch (err) {
    console.error("Checkout API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
