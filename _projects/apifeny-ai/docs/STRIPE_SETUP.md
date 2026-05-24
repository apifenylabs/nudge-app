# Stripe Payment Setup

This guide walks you through connecting Stripe payments to apifeny.ai.

---

## 1. Create a Stripe Account

1. Go to [stripe.com](https://stripe.com) and click **Start now**.
2. Sign up with your email and fill in your business details.
3. Complete the onboarding (you can set it to test mode first).

> For development/testing, you only need a Stripe account — **no tax ID or bank account required**. Stripe provides test API keys immediately.

---

## 2. Get Your Secret Key

1. Log in to the [Stripe Dashboard](https://dashboard.stripe.com).
2. In the left sidebar, go to **Developers** → **API keys**.
3. Under **Standard keys**, you'll see two keys:
   - **Publishable key** (`pk_test_...`) — safe to expose in frontend code
   - **Secret key** (`sk_test_...`) — **never expose this publicly**
4. Copy the **Secret key** (`sk_test_...`).

---

## 3. Configure Environment Variables

### Local Development

1. Create a `.env.local` file in the project root (not tracked by Git):

   ```bash
   cp .env.example .env.local
   ```

2. Add the Stripe secret key:

   ```env
   STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   ```

3. Restart your dev server:

   ```bash
   npm run dev
   ```

### Vercel Production

1. Go to your Vercel project dashboard: `https://vercel.com/your-team/apifeny-ai/settings/environment-variables`
2. Add a new environment variable:
   - **Name**: `STRIPE_SECRET_KEY`
   - **Value**: `sk_live_your_live_secret_key` (use the **live** key for production)
3. Select all environments (Production, Preview, Development) or at minimum **Production**.
4. Re-deploy the project to pick up the new env vars.

> ⚠️ **Important**: Never use `NEXT_PUBLIC_` prefix for Stripe secret keys. The secret key is server-side only. Our API routes read `process.env.STRIPE_SECRET_KEY` server-side.

---

## 4. Test with Stripe Test Cards

Stripe provides test card numbers that work with test mode keys (`sk_test_...`).

| Result              | Card Number          | CVC | Expiry    |
| ------------------- | -------------------- | --- | --------- |
| **Success**         | `4242 4242 4242 4242`       | Any | Any future |
| **Declined**        | `4000 0000 0000 0002`       | Any | Any future |
| **Insufficient funds** | `4000 0000 0000 9995`   | Any | Any future |
| **3D Secure required** | `4000 0025 0000 3155`    | Any | Any future |

1. Run the app: `npm run dev`
2. Open `http://localhost:3000/playbooks/ai-solopreneur-toolkit`
3. Click **Buy Now**
4. On the Stripe Checkout page, enter `4242 4242 4242 4242`, any future expiry date, any CVC, and any name.
5. Complete the payment — you should be redirected back to the playbook page with `?checkout=success` in the URL.

---

## 5. Webhooks (for fulfillment)

Once you deploy to production, set up webhooks to handle order fulfillment:

1. In the [Stripe Dashboard](https://dashboard.stripe.com/webhooks), click **Add endpoint**.
2. **Endpoint URL**: `https://apifeny.ai/api/stripe-webhook`
3. **Events to listen to**:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Click **Add endpoint**.
5. Reveal the **Signing secret** (`whsec_...`) and add it as `STRIPE_WEBHOOK_SECRET` in your Vercel env vars.

The webhook handler is at `/api/stripe-webhook/route.ts`. It currently logs events to console. Real fulfillment (granting Pro access, sending emails) comes when Supabase is connected.

---

## 6. Going Live

1. In Stripe Dashboard, flip the **Viewing test data** toggle to **Viewing live data** (top-right).
2. Complete any remaining onboarding (bank account, tax info).
3. Get your **live secret key** (`sk_live_...`) from Developers → API keys.
4. Update `STRIPE_SECRET_KEY` in Vercel env vars to the live key.
5. Set up live webhook endpoints with your production URL.
6. Deploy and test with a real card.

---

## Troubleshooting

| Symptom | Likely Fix |
| ------- | ---------- |
| `Stripe is not configured. Please set STRIPE_SECRET_KEY.` | Missing env var. Add `STRIPE_SECRET_KEY` to `.env.local` or Vercel. |
| `Stripe API error 401` | Invalid secret key. Check the key starts with `sk_test_` or `sk_live_`. |
| Checkout page shows `No such payment_intent` | The checkout session expired (30 min default). Start a new one. |
| Webhook returns 400 | Invalid payload or signature. Verify the webhook signing secret matches. |

---

**Related files:**
- `/app/api/create-checkout/route.ts` — Creates Stripe Checkout Sessions
- `/app/api/stripe-webhook/route.ts` — Handles Stripe webhook events
- `/app/playbooks/[slug]/page.tsx` — UI triggers for checkout
