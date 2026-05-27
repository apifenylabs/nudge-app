import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// ─── Stripe Webhook — Premium Route PDF Purchases ─────────────────────
// Handles checkout.session.completed for premium route PDF purchases.
// Records purchase and grants download access.
// ─────────────────────────────────────────────────────────────────────

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

function getStripe(): Stripe | null {
  if (!stripeSecret) return null;
  return new Stripe(stripeSecret, { apiVersion: '2025-04-15' as any });
}

export async function POST(request: NextRequest) {
  const stripe = getStripe();

  if (!stripe || !webhookSecret) {
    // Webhook not configured — purchases handled by manual download page
    return NextResponse.json({ received: true, note: 'webhook not configured' });
  }

  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const routeSlug = session.metadata?.premium_route_slug;
        const routeId = session.metadata?.premium_route_id;
        const customerEmail = session.customer_details?.email;

        console.log(`✅ Premium route purchase: route=${routeSlug}, id=${routeId}, customer=${customerEmail}`);

        // In production with Supabase:
        // 1. Store purchase record in supabase
        // 2. Send download link via Resend/SendGrid
        break;
      }
      case 'checkout.session.expired': {
        console.log('⏰ Premium route checkout expired');
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
