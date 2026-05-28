import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * POST /api/family/join
 * Join a family using an invite code.
 * Requires authenticated user.
 *
 * Request body: { code: string }
 * Response: { success: boolean, family?: { id, name }, error?: string }
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { code } = await request.json()
    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Invite code is required' }, { status: 400 })
    }

    const adminDb = createAdminClient()

    // Find family by invite code
    const { data: family, error: familyError } = await adminDb
      .from('families')
      .select('*')
      .eq('invite_code', code.toUpperCase().trim())
      .single()

    if (familyError || !family) {
      return NextResponse.json({ error: 'Invalid invite code. Check the code and try again.' }, { status: 404 })
    }

    // Get user's internal ID
    const { data: profile } = await adminDb
      .from('users')
      .select('id')
      .eq('id', user.id)
      .single()

    if (!profile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 })
    }

    // Check if already a member
    const { data: existingMembership } = await adminDb
      .from('family_members')
      .select('id, role')
      .eq('family_id', family.id)
      .eq('user_id', profile.id)
      .single()

    if (existingMembership) {
      return NextResponse.json({
        success: true,
        alreadyMember: true,
        family: {
          id: family.id,
          name: family.name,
          role: existingMembership.role,
        },
      })
    }

    // Check if user is in any other family (limit: 1 family per user for MVP)
    const { data: otherFamilies } = await adminDb
      .from('family_members')
      .select('family_id')
      .eq('user_id', profile.id)
      .limit(1)

    // Add member
    const { error: joinError } = await adminDb
      .from('family_members')
      .insert({
        family_id: family.id,
        user_id: profile.id,
        role: 'member',
      })

    if (joinError) {
      console.error('Join error:', joinError)
      return NextResponse.json({ error: 'Failed to join family. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      joined: true,
      family: {
        id: family.id,
        name: family.name,
        role: 'member',
        memberCount: 0,
      },
    })

  } catch (error: any) {
    console.error('Family join error:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
