import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendEmail } from '@/lib/email/send'
import { familyInviteEmail } from '@/lib/email/templates'
import { buildAppUrl } from '@/lib/config'
import { getFamilyPlan, getPlanFeatures } from '@/lib/plans'

/**
 * POST /api/family/invite
 * Sends a family invitation by email.
 * Also generates a Telegram deep link for sharing.
 *
 * Request body: { email: string, role?: 'admin' | 'member' }
 * Response: { success: boolean, inviteLink?: string, telegramLink?: string }
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { email, role = 'member' } = await request.json()
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const adminDb = createAdminClient()

    // Get user's family
    const { data: memberships } = await adminDb
      .from('family_members')
      .select('family_id, role')
      .eq('user_id', user.id)
      .limit(1)

    if (!memberships || memberships.length === 0) {
      return NextResponse.json({ error: 'No family found' }, { status: 404 })
    }

    const { family_id, role: myRole } = memberships[0]

    // Only admins/owners can invite
    if (myRole !== 'admin' && myRole !== 'owner') {
      return NextResponse.json({ error: 'Only admins can invite members' }, { status: 403 })
    }

    // Check plan's max family members limit
    const plan = await getFamilyPlan(family_id)
    const planFeatures = getPlanFeatures(plan)

    if (planFeatures.maxFamilyMembers !== -1) {
      const { count: currentMembers } = await adminDb
        .from('family_members')
        .select('*', { count: 'exact', head: true })
        .eq('family_id', family_id)

      if (currentMembers !== null && currentMembers >= planFeatures.maxFamilyMembers) {
        return NextResponse.json({
          error: `Your ${plan} plan allows a maximum of ${planFeatures.maxFamilyMembers} family member${planFeatures.maxFamilyMembers > 1 ? 's' : ''}. Upgrade to Pro or Family plan to add more members.`,
          code: 'family_member_limit_reached',
          currentMembers,
          maxMembers: planFeatures.maxFamilyMembers,
        }, { status: 403 })
      }
    }

    // Get family info
    const { data: family } = await adminDb
      .from('families')
      .select('*')
      .eq('id', family_id)
      .single()

    if (!family) {
      return NextResponse.json({ error: 'Family not found' }, { status: 404 })
    }

    // Get inviter name
    const { data: inviterProfile } = await adminDb
      .from('users')
      .select('full_name, display_name, email')
      .eq('id', user.id)
      .single()

    const inviterName = inviterProfile?.full_name || inviterProfile?.display_name || inviterProfile?.email || 'A family member'

    // Build invite links
    const inviteCode = family.invite_code
    const inviteLink = buildAppUrl(`/join/${inviteCode}`)
    const botUsername = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || 'nudge_bot'
    const telegramLink = `https://t.me/${botUsername}?start=invite_${inviteCode}`

    // Check if recipient already has an account and is in the family
    const { data: existingUser } = await adminDb
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase().trim())
      .single()

    if (existingUser) {
      // Check if they're already in this family
      const { data: existingMembership } = await adminDb
        .from('family_members')
        .select('id')
        .eq('family_id', family_id)
        .eq('user_id', existingUser.id)
        .single()

      if (existingMembership) {
        return NextResponse.json({
          success: false,
          error: 'This person is already a member of your family',
          inviteLink,
          telegramLink,
        })
      }

      // Auto-add them
      const { error: addError } = await adminDb
        .from('family_members')
        .insert({
          family_id,
          user_id: existingUser.id,
          role,
        })

      if (addError) {
        return NextResponse.json({ error: 'Failed to add member' }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        message: 'Member added to family',
        inviteLink,
        telegramLink,
        autoJoined: true,
      })
    }

    // Send invitation email
    const emailResult = await sendEmail(familyInviteEmail({
      to: email,
      inviterName,
      familyName: family.name,
      inviteCode,
      inviteLink,
    }))

    // Log the invitation
    await adminDb.from('telegram_messages').insert({
      chat_id: 0,
      message_id: 0,
      message_text: `[Invite] ${inviterName} invited ${email} to "${family.name}" via ${inviteLink}`,
      is_bot_response: false,
    }).maybeSingle()

    return NextResponse.json({
      success: emailResult.success,
      message: emailResult.success
        ? `Invitation sent to ${email}`
        : 'Invite link generated (email sending unavailable)',
      inviteLink,
      telegramLink,
      inviteCode,
      emailSent: emailResult.success,
      emailError: emailResult.error,
    })

  } catch (error: any) {
    console.error('Family invite error:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
