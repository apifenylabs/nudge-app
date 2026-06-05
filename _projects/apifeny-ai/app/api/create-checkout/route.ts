import { NextRequest, NextResponse } from 'next/server';

// ════════════════════════════════════════════════════════════
// Stripe Checkout Session API — Multi-Product + Pro
// ════════════════════════════════════════════════════════════
// Creates a Stripe Checkout Session for:
// - Single playbook PDFs ($9-19 one-time)
// - Pro membership ($47/mo for all playbooks)
// Uses Stripe API directly via fetch (no SDK dependency).
// ════════════════════════════════════════════════════════════

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_API_BASE = 'https://api.stripe.com/v1';

interface ProductConfig {
 name: string;
 description: string;
 unitAmount: number; // cents
 mode: 'payment' | 'subscription';
 interval?: 'month' | 'year';
}

const PRODUCTS: Record<string, ProductConfig> = {
 // ═══ Single Playbook PDFs (one-time) ═══
 'ai-solopreneur-toolkit': {
 name: 'AI Solopreneur Toolkit',
 description: '5 AI tools that replaced $2,200/month in services for $70/month — PDF playbook with exact workflows and prompts.',
 unitAmount: 900,
 mode: 'payment',
 },
 'directory-builder-template': {
 name: 'Directory Builder Template',
 description: 'Complete directory website template with AI agent squads — deploy your own directory in hours, not weeks.',
 unitAmount: 1900,
 mode: 'payment',
 },
 'ai-workflow-automation': {
 name: 'AI Workflow Automation',
 description: 'Build autonomous workflows with AI — from mapping to deployment. Complete playbook with 50+ ready-to-use prompts.',
 unitAmount: 900,
 mode: 'payment',
 },
 'ai-content-creation-busy-founders': {
 name: 'AI Content Creation for Busy Founders',
 description: 'Produce 3x more content in half the time. 45+ page PDF with 40+ AI prompts for blog, social, email, and video.',
 unitAmount: 900,
 mode: 'payment',
 },
 'ai-for-data-analysis': {
 name: 'AI for Data Analysis',
 description: 'Learn to analyze, visualize, and interpret data with AI. Complete PDF guide with Python scripts and SQL templates.',
 unitAmount: 900,
 mode: 'payment',
 },
 'ai-for-hr-and-recruiting': {
 name: 'AI for HR & Recruiting',
 description: 'Transform your HR process with AI: job descriptions, screening automation, candidate matching, and onboarding workflows.',
 unitAmount: 900,
 mode: 'payment',
 },
 'ai-for-personal-finance': {
 name: 'AI for Personal Finance',
 description: 'Take control of your finances with AI: budgeting, investing, tax optimization, and financial planning workflows.',
 unitAmount: 900,
 mode: 'payment',
 },
 'ai-for-social-media-management': {
 name: 'AI for Social Media Management',
 description: 'Master social media with AI: content calendars, viral hooks, engagement analytics, and cross-platform automation.',
 unitAmount: 900,
 mode: 'payment',
 },
 'ai-personal-assistant-setup': {
 name: 'AI Personal Assistant Setup',
 description: 'Set up your AI-powered personal assistant: email triage, calendar management, task automation, and daily briefings.',
 unitAmount: 900,
 mode: 'payment',
 },
 'ai-for-ecommerce': {
 name: 'AI for E-Commerce',
 description: 'Transform your online store with AI-powered product descriptions, customer segmentation, and automated merchandising.',
 unitAmount: 200,
 mode: 'payment',
 },
 'ai-for-marketing-automation': {
 name: 'AI for Marketing Automation',
 description: 'Automate campaigns, personalize at scale, and predict customer behavior with AI-driven marketing workflows.',
 unitAmount: 1000,
 mode: 'payment',
 },
 'ai-sales-funnel-builder': {
 name: 'AI Sales Funnel Builder',
 description: 'Generate leads, optimize conversion, and close more deals with AI-powered sales funnels and automated follow-ups.',
 unitAmount: 900,
 mode: 'payment',
 },
 'ai-marketing-for-asia': {
 name: 'AI Marketing for Asia',
 description: 'Localized AI marketing strategies for Asian markets: WeChat, LINE, Shopee, Lazada, and SEA-specific platforms.',
 unitAmount: 1200,
 mode: 'payment',
 },

 // ═══ Pro Membership (subscription) ═══
 'pro-monthly': {
 name: 'Apifeny Pro — Monthly',
 description: 'Unlimited access to ALL playbooks, premium prompts, and new releases. Cancel anytime.',
 unitAmount: 3700,
 mode: 'subscription',
 interval: 'month',
 },
 'pro-yearly': {
 name: 'Apifeny Pro — Yearly',
 description: 'Unlimited access to ALL playbooks + 2 months free. Best value at $30/mo.',
 unitAmount: 29700,
 mode: 'subscription',
 interval: 'year',
 },
};

if (!STRIPE_SECRET_KEY) {
 console.warn('[create-checkout] STRIPE_SECRET_KEY is not set.');
}

export async function POST(req: NextRequest) {
 try {
 if (!STRIPE_SECRET_KEY) {
 return NextResponse.json(
 { error: 'Stripe is not configured. Please set STRIPE_SECRET_KEY.' },
 { status: 500 }
 );
 }

 const body = await req.json().catch(() => ({}));
 const productSlug: string = body.product || 'ai-solopreneur-toolkit';
 const product = PRODUCTS[productSlug];

 if (!product) {
 return NextResponse.json(
 { error: `Invalid product "${productSlug}". Valid products: ${Object.keys(PRODUCTS).join(', ')}` },
 { status: 400 }
 );
 }

 const origin = req.headers.get('origin') || 'http://localhost:3000';

 // Determine redirect target
 const redirectSlug =
 productSlug === 'directory-builder-template'
 ? 'directory-builder'
 : productSlug === 'pro-monthly' || productSlug === 'pro-yearly'
 ? 'pro'
 : productSlug;

  // Add product slug to metadata so webhook can map it
 const session = await createCheckoutSession({
 product,
 successUrl: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&product=${productSlug}`,
 cancelUrl: `${origin}/playbooks/${redirectSlug}?checkout=cancelled`,
 customerEmail: body.email || undefined,
 productSlug,
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
 productSlug?: string;
}

async function createCheckoutSession(params: CreateSessionParams) {
 const { product, successUrl, cancelUrl, customerEmail, productSlug } = params;

 const formData = new URLSearchParams();
 formData.append('mode', product.mode);

 // Attach product slug at session level so webhook always has it
 if (productSlug) {
 formData.append('metadata[product_slug]', productSlug);
 }
 formData.append('success_url', successUrl);
 formData.append('cancel_url', cancelUrl);
 formData.append('line_items[0][price_data][currency]', 'usd');
 formData.append('line_items[0][price_data][product_data][name]', product.name);
 formData.append('line_items[0][price_data][product_data][description]', product.description);
 formData.append('line_items[0][price_data][unit_amount]', String(product.unitAmount));
 formData.append('line_items[0][quantity]', '1');

 // Embed product slug in the description so webhook can read it
 formData.append('line_items[0][price_data][product_data][metadata][product_slug]', productSlug || '');

 if (product.mode === 'subscription' && product.interval) {
 formData.append('line_items[0][price_data][recurring][interval]', product.interval);
 }

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
 mode: config.mode,
 })),
 });
}
