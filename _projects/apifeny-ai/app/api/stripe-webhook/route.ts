import { NextRequest, NextResponse } from 'next/server';

// ════════════════════════════════════════════════════════════
// Stripe Webhook Handler
// ════════════════════════════════════════════════════════════
// Receives Stripe webhook events and dispatches fulfillment logic.
//
// Setup in Stripe Dashboard:
// 1. Go to https://dashboard.stripe.com/webhooks
// 2. Add endpoint: https://apifeny-ai.vercel.app/api/stripe-webhook
// 3. Listen for: checkout.session.completed
// 4. Set signing secret (STRIPE_WEBHOOK_SECRET env var) — optional for now
//
// ════════════════════════════════════════════════════════════

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
 try {
 const body = await req.text();
 const signature = req.headers.get('stripe-signature') || '';

 // When STRIPE_WEBHOOK_SECRET is configured, verify the signature.
 // For now we accept raw events (stub mode).
 let event;
 if (STRIPE_WEBHOOK_SECRET) {
 // TODO: Use stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET)
 // when the Stripe SDK is available.
 event = JSON.parse(body);
 } else {
 // Stub mode: parse body directly (no signature verification).
 // ⚠️ Only safe during development. Enable STRIPE_WEBHOOK_SECRET before production.
 event = JSON.parse(body);
 }

 const eventType = event.type;

 switch (eventType) {
 case 'checkout.session.completed': {
 const session = event.data.object;
 console.log('[stripe-webhook] ✅ checkout.session.completed', {
 sessionId: session.id,
 customer: session.customer_details?.email || session.customer_email,
 amountTotal: session.amount_total,
 currency: session.currency,
 mode: session.mode,
 subscription: session.subscription,
 paymentStatus: session.payment_status,
 metadata: session.metadata,
 });
 // TODO: Fulfill the order when Supabase is connected:
 // - Grant Pro membership access for subscription sessions
 // - Add download links for single-product purchases
 // - Send confirmation email
 break;
 }

 case 'checkout.session.expired': {
 console.log('[stripe-webhook] ⏱️ checkout.session.expired', {
 sessionId: event.data.object.id,
 });
 break;
 }

 case 'customer.subscription.updated':
 case 'customer.subscription.deleted': {
 console.log('[stripe-webhook] 🔔 subscription event', {
 type: eventType,
 subscriptionId: event.data.object.id,
 status: event.data.object.status,
 customer: event.data.object.customer,
 });
 // TODO: Update user's subscription status in Supabase
 break;
 }

 default: {
 console.log(`[stripe-webhook] ℹ️ unhandled event type: ${eventType}`);
 break;
 }
 }

 return NextResponse.json({ received: true });
 } catch (error) {
 console.error('[stripe-webhook] Error:', error);
 return NextResponse.json(
 { error: 'Webhook processing failed' },
 { status: 400 }
 );
 }
}

// Health check endpoint so Stripe can verify the endpoint is alive
export async function GET() {
 return NextResponse.json({ status: 'ok', webhook: 'active' });
}
