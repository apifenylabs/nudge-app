/**
 * POST /api/auth/signup
 *
 * Extended signup endpoint that:
 * 1. Creates the auth user via Supabase Admin
 * 2. Creates the user profile in public.users
 * 3. Creates a family + family membership
 * 4. **Sends the welcome email (Step 1 of the drip sequence)** immediately
 * 5. Returns the session info so the client can continue to onboarding
 *
 * This replaces the pure client-side signup flow, adding the welcome email
 * send right after account creation for immediate user engagement.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendEmail } from '@/lib/email/send'
import { welcomeSequenceEmail } from '@/lib/email/templates'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, fullName, telegramUsername } = body

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { success: false, error: 'Email, password, and full name are required' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // ── Step 1: Create auth user ──
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        full_name: fullName,
        telegram_username: telegramUsername || null,
      },
      email_confirm: true,
    })

    if (authError) {
      console.error('[Signup API] Auth error:', authError.message)
      return NextResponse.json(
        { success: false, error: authError.message },
        { status: 400 }
      )
    }

    if (!authData.user) {
      return NextResponse.json(
        { success: false, error: 'Failed to create user' },
        { status: 500 }
      )
    }

    const userId = authData.user.id

    // ── Step 2: Create user profile ──
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: userId,
        email,
        full_name: fullName,
        telegram_username: telegramUsername || null,
      })

    if (profileError) {
      console.error('[Signup API] Profile error:', profileError.message)
      // Non-fatal — continue
    }

    // ── Step 3: Create family ──
    const familyName = `${fullName.split(' ')[0]}'s Family`
    const { data: familyData, error: familyError } = await supabase
      .from('families')
      .insert({
        name: familyName,
        owner_id: userId,
      })
      .select()
      .single()

    if (familyError) {
      console.error('[Signup API] Family error:', familyError.message)
      return NextResponse.json(
        { success: false, error: 'Failed to create family' },
        { status: 500 }
      )
    }

    // ── Step 4: Add owner as family member ──
    const { error: memberError } = await supabase
      .from('family_members')
      .insert({
        family_id: familyData.id,
        user_id: userId,
        role: 'owner',
      })

    if (memberError) {
      console.error('[Signup API] Member error:', memberError.message)
      // Non-fatal — continue
    }

    // ── Step 5: Send welcome email (fire-and-forget, non-blocking) ──
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nudge-sigma-liart.vercel.app'

    // Fire welcome email in background — don't block the response
    sendEmail(
      welcomeSequenceEmail({
        to: email,
        userName: fullName,
        familyName,
        step: 1,
        inviteCode: familyData.invite_code,
        dashboardUrl: `${appUrl}/dashboard`,
      })
    ).then((result) => {
      // Log to email_log (fire-and-forget)
      supabase
        .from('email_log')
        .insert({
          user_id: userId,
          email_type: 'welcome_step1',
          sent: result.success,
          metadata: result.success
            ? { source: 'inline_signup' }
            : { error: result.error, source: 'inline_signup' },
        })
        .then()

      if (result.success) {
        console.log(`[Signup API] Welcome email sent to ${email}`)
      } else {
        console.warn(`[Signup API] Welcome email failed for ${email}: ${result.error}`)
      }
    }).catch((err: any) => {
      console.error(`[Signup API] Welcome email exception for ${email}:`, err.message)
    })

    // ── Step 6: Return success ──
    console.log(`[Signup API] User created: ${email} (${userId}), family: ${familyData.id}`)

    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        email,
        fullName,
      },
      family: {
        id: familyData.id,
        name: familyData.name,
        inviteCode: familyData.invite_code,
      },
    })
  } catch (err: any) {
    console.error('[Signup API] Fatal error:', err.message)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
