import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { completed, step, action } = body

    if (action === 'skip') {
      // Track skip in user metadata
      await supabase.auth.updateUser({
        data: {
          onboarding_skipped_at: new Date().toISOString(),
          onboarding_skip_count: (user.user_metadata?.onboarding_skip_count || 0) + 1,
        },
      })
      return NextResponse.json({ ok: true })
    }

    if (action === 'complete' || completed === true) {
      // Mark onboarding as completed
      await supabase.auth.updateUser({
        data: {
          onboarding_completed_at: new Date().toISOString(),
          onboarding_completed: true,
        },
      })

      // Update public users table
      await supabase
        .from('users')
        .update({
          display_name: body.display_name || undefined,
          updated_at: new Date().toISOString(),
        })
        .eq('auth_uid', user.id)

      return NextResponse.json({ ok: true })
    }

    if (action === 'step' && typeof step === 'number') {
      // Track individual step completion
      await supabase.auth.updateUser({
        data: {
          [`onboarding_step_${step}_at`]: new Date().toISOString(),
        },
      })
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Onboarding API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
