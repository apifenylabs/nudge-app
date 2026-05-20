/**
 * GET /api/stripe/invoices
 * Returns recent Stripe invoices for the authenticated user's family subscription.
 * Used by InvoiceHistory component to show payment history.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getInvoices } from '@/lib/stripe/server'

export async function GET(_request: NextRequest) {
  try {
    const supabase = createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's primary family
    const { data: membership } = await supabase
      .from('family_members')
      .select('family_id')
      .eq('user_id', user.id)
      .limit(1)
      .single()

    if (!membership) {
      return NextResponse.json({ invoices: [] })
    }

    // Get subscription to find customer ID
    const adminDb = createAdminClient()
    const { data: subscription } = await adminDb
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('family_id', membership.family_id)
      .single()

    if (!subscription?.stripe_customer_id) {
      return NextResponse.json({ invoices: [] })
    }

    // Fetch invoices from Stripe
    const invoices = await getInvoices(subscription.stripe_customer_id)

    // Map to safe client response
    const mapped = invoices.map((inv: any) => ({
      id: inv.id,
      number: inv.number,
      status: inv.status,
      amountPaid: inv.amount_paid,
      amountDue: inv.amount_due,
      currency: inv.currency,
      created: new Date(inv.created * 1000).toISOString(),
      paidAt: inv.status === 'paid' ? new Date(inv.status_transitions?.paid_at * 1000 || inv.created * 1000).toISOString() : null,
      periodStart: new Date(inv.period_start * 1000).toISOString(),
      periodEnd: new Date(inv.period_end * 1000).toISOString(),
      hostedInvoiceUrl: inv.hosted_invoice_url,
      invoicePdf: inv.invoice_pdf,
      lines: (inv.lines?.data || []).map((line: any) => ({
        description: line.description,
        amount: line.amount,
        period: {
          start: new Date(line.period?.start * 1000).toISOString(),
          end: new Date(line.period?.end * 1000).toISOString(),
        },
      })),
    }))

    return NextResponse.json({ invoices: mapped })
  } catch (err: any) {
    console.error('Stripe invoices error:', err)
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 })
  }
}
