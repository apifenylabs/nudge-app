import { NextRequest, NextResponse } from 'next/server';

// ════════════════════════════════════════════════════════════
// Stripe Checkout Session API
// ════════════════════════════════════════════════════════════
// Creates a Stripe Checkout Session for the AI Solopreneur
// Toolkit PDF playbook ($9 USD).
// Uses Stripe API directly via fetch (no SDK dependency).
// ════════════════════════════════════════════════════════════

const STRIPE_SECRET_KEY = process.env.VITE_STRIPE_SECRET_KEY;
const STRIPE_API_BASE = 'https://api.stripe.com/v1';

if (!STRIPE_SECRET_KEY) {
  console.warn(
    '[create-checkout] VITE_STRIPE_SECRET_KEY is not set. ' +
    'Set it in your .env.local or Vercel environment variables.'
  );
}

export async function POST(req: NextRequest) {
  try {
    if (!STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Please set VITE_STRIPE_SECRET_KEY.' },
        { status: 500 }
      );
    }

    // Parse request body for optional metadata
    const body = await req.json().catch(() => ({}));

    // Build the origin for success/cancel URLs
    const origin = req.headers.get('origin') || 'http://localhost:3000';

    // Create a Stripe Checkout Session
    const session = await createCheckoutSession({
      successUrl: `${origin}/playbooks/ai-solopreneur-toolkit?checkout=success`,
      cancelUrl: `${origin}/playbooks/ai-solopreneur-toolkit?checkout=cancelled`,
      customerEmail: body.email || undefined,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('[create-checkout] Error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session. Please try again.' },
      { status: 500 }
    );
  }
}

// ─── Stripe API Helpers ───────────────────────────────────

interface CreateSessionParams {
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
}

async function createCheckoutSession(params: CreateSessionParams) {
  const { successUrl, cancelUrl, customerEmail } = params;

  // Build form-encoded body for Stripe API
  const formData = new URLSearchParams();
  formData.append('mode', 'payment');
  formData.append('success_url', successUrl);
  formData.append('cancel_url', cancelUrl);
  formData.append('line_items[0][price_data][currency]', 'usd');
  formData.append('line_items[0][price_data][product_data][name]', 'AI Solopreneur Toolkit');
  formData.append(
    'line_items[0][price_data][product_data][description]',
    '5 AI tools that replaced $2,200/month in services for $70/month — PDF playbook with exact workflows and prompts.'
  );
  formData.append('line_items[0][price_data][unit_amount]', '900'); // $9.00 in cents
  formData.append('line_items[0][quantity]', '1');

  if (customerEmail) {
    formData.append('customer_email', customerEmail);
  }

  const response = await fetch(`${STRIPE_API_BASE}/checkout/sessions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Stripe API error ${response.status}: ${error}`);
  }

  return response.json();
}
