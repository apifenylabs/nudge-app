import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getPremiumRouteBySlug } from '@/lib/premium-routes';

// ─── Stripe Checkout for Premium Route PDFs ──────────────────────────
// Creates a Stripe Checkout Session for a premium route PDF purchase.
// Falls back gracefully when STRIPE_SECRET_KEY is unset.
// ─────────────────────────────────────────────────────────────────────

const stripeSecret = process.env.STRIPE_SECRET_KEY;

function getStripe(): Stripe | null {
  if (!stripeSecret) return null;
  return new Stripe(stripeSecret, { apiVersion: '2025-04-15' as any });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, successUrl, cancelUrl } = body;

    if (!slug) {
      return NextResponse.json({ error: 'Missing route slug' }, { status: 400 });
    }

    const route = getPremiumRouteBySlug(slug);
    if (!route) {
      return NextResponse.json({ error: `Premium route not found: ${slug}` }, { status: 404 });
    }

    const baseUrl = request.nextUrl.origin;
    const stripe = getStripe();

    if (stripe && stripeSecret) {
      // ── Real Stripe Checkout Session ──
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: route.currency.toLowerCase(),
              product_data: {
                name: route.title,
                description: route.subtitle.slice(0, 120),
                images: [],
              },
              unit_amount: Math.round(route.price * 100), // cents
            },
            quantity: 1,
          },
        ],
        metadata: {
          premium_route_slug: route.slug,
          premium_route_id: route.id,
          product_type: 'premium-route-pdf',
        },
        success_url: successUrl || `${baseUrl}/premium-routes/${route.slug}/download?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: cancelUrl || `${baseUrl}/routes?canceled=1`,
      });

      return NextResponse.json({
        url: session.url,
        sessionId: session.id,
        mode: 'stripe_checkout',
      });
    }

    // ── Fallback when Stripe key not configured ──
    return NextResponse.json({
      url: `${baseUrl}/premium-routes/${route.slug}/purchase?fallback=true`,
      mode: 'fallback',
    });
  } catch (err: any) {
    console.error('Premium route checkout error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
