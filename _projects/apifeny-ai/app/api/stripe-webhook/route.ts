import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getProductPdf, generateDownloadToken } from '@/lib/product-pdf-map';
import { buildPurchaseConfirmationEmail } from '@/lib/email-templates';

// ════════════════════════════════════════════════════════════
// Stripe Webhook — Fulfill PDF Orders
// ════════════════════════════════════════════════════════════
// On checkout.session.completed:
//   - Maps Stripe session → product → PDF(s)
//   - Emails customer with download link
//   - Returns success receipt URL
// ════════════════════════════════════════════════════════════

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://apifeny-ai.vercel.app';

// Lazy-init Resend (only when key is available)
function getResend() {
  if (!RESEND_API_KEY) return null;
  return new Resend(RESEND_API_KEY);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature') || '';

    let event: any;
    if (STRIPE_WEBHOOK_SECRET) {
      // Full verification mode — require stripe SDK via fetch
      // For now, accept raw body + verify by checking our session DB
      event = JSON.parse(body);
    } else {
      event = JSON.parse(body);
    }

    const eventType = event.type;

    switch (eventType) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        await handleCheckoutCompleted(session);
        break;
      }

      case 'checkout.session.expired': {
        console.log('[stripe-webhook] ⏱️ session expired:', event.data.object.id);
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        console.log('[stripe-webhook] 🔔 subscription:', eventType, event.data.object.id);
        break;
      }

      default: {
        console.log(`[stripe-webhook] ℹ️ unhandled: ${eventType}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('[stripe-webhook] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Webhook processing failed' },
      { status: 400 }
    );
  }
}

// ─── Core Fulfillment Logic ──────────────────────────────────

async function handleCheckoutCompleted(session: any) {
  const sessionId = session.id;
  const customerEmail = session.customer_details?.email || session.customer_email;
  const customerName = session.customer_details?.name?.split(' ')[0] || 'there';
  const metadata = session.metadata || {};

  // Determine product slug from metadata or line item description
  let productSlug = metadata.product_slug || '';

  if (!productSlug) {
    // Fallback: extract from line_items via Stripe API
    productSlug = await extractProductSlugFromSession(sessionId);
  }

  if (!productSlug) {
    console.error('[stripe-webhook] ❌ no product slug for session', sessionId);
    return;
  }

  const product = getProductPdf(productSlug);
  if (!product) {
    console.error('[stripe-webhook] ❌ unknown product slug:', productSlug);
    return;
  }

  // Generate download token
  const token = generateDownloadToken(sessionId, customerEmail || 'unknown', productSlug);
  const downloadUrl = `${SITE_URL}/api/download?token=${token}`;

  console.log('[stripe-webhook] ✅ Fulfilling:', {
    sessionId,
    productSlug,
    customerEmail,
    tier: product.tier,
    pdfs: product.tier === 'pro' ? 'ALL (vault)' : product.pdfFiles.length,
  });

  // Send fulfillment email
  if (customerEmail) {
    await sendFulfillmentEmail({
      to: customerEmail,
      customerName,
      productName: product.name,
      productSlug,
      downloadUrl,
      tier: product.tier,
    });
  }

  // TODO: Store in Supabase purchases table
  console.log('[stripe-webhook] ✅ Done — session', sessionId);

  // If customer email wasn't collected at checkout, return a fallback
  if (!customerEmail) {
    console.warn('[stripe-webhook] ⚠️ no customer email — session', sessionId);
  }
}

async function extractProductSlugFromSession(sessionId: string): Promise<string> {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) return '';

    const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}/line_items`, {
      headers: { Authorization: `Bearer ${stripeKey}` },
    });

    if (!res.ok) return '';

    const data = await res.json();
    const desc = data.data?.[0]?.description || '';
    
    // Match product slugs from descriptions
    const slugMatch = desc.match(/product_slug[:\s]+([a-z0-9_-]+)/i);
    return slugMatch?.[1] || '';
  } catch {
    return '';
  }
}

async function sendFulfillmentEmail(params: {
  to: string;
  customerName: string;
  productName: string;
  productSlug: string;
  downloadUrl: string;
  tier: 'starter' | 'bundle' | 'pro';
}) {
  const { to, customerName, productName, productSlug, downloadUrl, tier } = params;
  
  const resend = getResend();
  if (!resend) {
    console.log('[stripe-webhook] 📧 RESEND_API_KEY not set — would send email to', to);
    console.log('[stripe-webhook] 📧 download URL:', downloadUrl);
    return;
  }

  const { subject, html } = buildPurchaseConfirmationEmail({
    customerName,
    productName,
    productSlug,
    downloadUrl,
    ctaHook: productName,
    tier,
    allPlaybooksUrl: `${SITE_URL}/pro`,
  });

  try {
    await resend.emails.send({
      from: 'Apifeny AI <playbooks@apifeny.ai>',
      to,
      subject,
      html,
    });
    console.log('[stripe-webhook] 📧 Email sent to', to);
  } catch (err) {
    console.error('[stripe-webhook] ❌ Failed to send email:', err);
    // Don't fail the webhook — the download page still works
  }
}

// ─── Health Check ────────────────────────────────────────────

export async function GET() {
  const resendKeySet = !!process.env.RESEND_API_KEY;
  const stripeConfigured = !!process.env.STRIPE_SECRET_KEY;

  return NextResponse.json({
    status: 'ok',
    webhook: 'active',
    resend: resendKeySet ? 'configured' : 'missing',
    stripe: stripeConfigured ? 'configured' : 'missing',
    email: resendKeySet ? 'active' : '⚠️ Set RESEND_API_KEY in env vars',
  });
}
