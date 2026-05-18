import { NextRequest, NextResponse } from 'next/server';

// ════════════════════════════════════════════════════════════
// Stripe Checkout Session API — Multi-Product
// ════════════════════════════════════════════════════════════
// Creates a Stripe Checkout Session for any paid Apifeny AI
// playbook PDF. Supports 3 products with individual pricing.
// Uses Stripe API directly via fetch (no SDK dependency).
// ════════════════════════════════════════════════════════════

const STRIPE_SECRET_KEY = process.env.VITE_STRIPE_SECRET_KEY;
const STRIPE_API_BASE = 'https://api.stripe.com/v1';

interface ProductConfig {
  name: string;
  description: string;
  unitAmount: number; // cents
}

const PRODUCTS: Record<string, ProductConfig> = {
  'ai-solopreneur-toolkit': {
    name: 'AI Solopreneur Toolkit',
    description:
      '5 AI tools that replaced $2,200/month in services for $70/month — PDF playbook with exact workflows and prompts.',
    unitAmount: 900, // $9.00
  },
  'directory-builder-template': {
    name: 'Directory Builder Template',
    description:
      'Complete directory website template with AI agent squads — deploy your own directory in hours, not weeks.',
    unitAmount: 1900, // $19.00
  },
  'ai-workflow-automation': {
    name: 'AI Workflow Automation',
    description:
      'Build autonomous workflows with AI — from mapping to deployment. Complete playbook with 50+ ready-to-use prompts.',
    unitAmount: 900, // $9.00
  },
  'ai-for-ecommerce': {
    name: 'AI for E-Commerce',
    description:
      'Transform your online store with AI-powered product descriptions, customer segmentation, dynamic pricing, and automated merchandising.',
    unitAmount: 200, // $2.00 — intro price
  },
  'ai-for-marketing-automation': {
    name: 'AI for Marketing Automation',
    description:
      'Automate campaigns, personalize at scale, and predict customer behavior with AI-driven marketing workflows.',
    unitAmount: 1000, // $10.00
  },
  'ai-sales-funnel-builder': {
    name: 'AI Sales Funnel Builder',
    description:
      'Generate leads, optimize conversion, and close more deals with AI-powered sales funnels and automated follow-ups.',
    unitAmount: 900, // $9.00
  },
  'ai-marketing-for-asia': {
    name: 'AI Marketing for Asia',
    description:
      'Localized AI marketing strategies for Asian markets: WeChat, LINE, Shopee, Lazada, and SEA-specific platforms.',
    unitAmount: 1200, // $12.00
  },
};

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

    // Parse request body
    const body = await req.json().catch(() => ({}));
    const productSlug: string = body.product || 'ai-solopreneur-toolkit';
    const product = PRODUCTS[productSlug];

    if (!product) {
      return NextResponse.json(
        {
          error: `Invalid product "${productSlug}". Valid products: ${Object.keys(PRODUCTS).join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Build the origin for success/cancel URLs
    const origin = req.headers.get('origin') || 'http://localhost:3000';

    // Clean slug for redirect URL
    const redirectSlug = productSlug === 'directory-builder-template' ? 'directory-builder' : productSlug.replace(/-/g, '-');

    // Create a Stripe Checkout Session
    const session = await createCheckoutSession({
      product,
      successUrl: `${origin}/playbooks/${redirectSlug}?checkout=success`,
      cancelUrl: `${origin}/playbooks/${redirectSlug}?checkout=cancelled`,
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

// ─── Stripe API Helpers ──────────────────────────────────────

interface CreateSessionParams {
  product: ProductConfig;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
}

async function createCheckoutSession(params: CreateSessionParams) {
  const { product, successUrl, cancelUrl, customerEmail } = params;

  // Build form-encoded body for Stripe API
  const formData = new URLSearchParams();
  formData.append('mode', 'payment');
  formData.append('success_url', successUrl);
  formData.append('cancel_url', cancelUrl);
  formData.append('line_items[0][price_data][currency]', 'usd');
  formData.append('line_items[0][price_data][product_data][name]', product.name);
  formData.append('line_items[0][price_data][product_data][description]', product.description);
  formData.append('line_items[0][price_data][unit_amount]', String(product.unitAmount));
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

// ─── Expose available products on GET ──────────────────────────

export async function GET() {
  return NextResponse.json({
    status: 'active',
    products: Object.entries(PRODUCTS).map(([slug, config]) => ({
      slug,
      name: config.name,
      price: `$${(config.unitAmount / 100).toFixed(0)}`,
    })),
  });
}
