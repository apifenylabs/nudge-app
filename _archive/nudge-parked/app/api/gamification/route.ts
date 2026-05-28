import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

/**
 * GET /api/gamification
 * Returns streak, achievements, and leaderboard for the authenticated user.
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const admin = createAdminClient()

    // Get user's public user ID
    const { data: profile } = await admin
      .from('users')
      .select('id')
      .eq('auth_uid', user.id)
      .single()

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    // Get streak data
    const { data: streak } = await admin
      .from('user_streaks')
      .select('*')
      .eq('user_id', profile.id)
      .single()

    // Get all achievements with earned status
    const { data: allAchievements } = await admin
      .from('achievements')
      .select('*')
      .order('requirement_value', { ascending: true })

    const { data: earnedAchievements } = await admin
      .from('user_achievements')
      .select('achievement_id, earned_at')
      .eq('user_id', profile.id)

    const earnedMap = new Map(
      (earnedAchievements || []).map(a => [a.achievement_id, a.earned_at])
    )

    // Calculate progress for each achievement
    const achievements = (allAchievements || []).map(a => {
      let progress = 0
      if (a.requirement_type === 'tasks_completed') {
        progress = streak?.total_completed || 0
      } else if (a.requirement_type === 'streak_days') {
        progress = streak?.current_streak || 0
      } else if (a.requirement_type === 'referrals') {
        // We'll get from referral codes
        const totalSignups = 0 // simplified
      } else if (a.requirement_type === 'family_members') {
        // Simplified
      }
      return {
        key: a.key,
        title: a.title,
        description: a.description,
        icon: a.icon,
        requirement_value: a.requirement_value,
        requirement_type: a.requirement_type,
        progress,
        earned_at: earnedMap.get(a.id) || null,
      }
    })

    // Get leaderboard for the user's primary family
    const { data: membership } = await admin
      .from('family_members')
      .select('family_id')
      .eq('user_id', profile.id)
      .limit(1)
      .single()

    let leaderboard: any[] = []
    if (membership) {
      const { data: scores } = await admin
        .from('family_scores')
        .select('user_id, points, tasks_completed, streak, updated_at')
        .eq('family_id', membership.family_id)
        .order('points', { ascending: false })
        .limit(10)

      if (scores) {
        const userIds = scores.map(s => s.user_id)
        const { data: users } = await admin
          .from('users')
          .select('id, display_name, avatar_url')
          .in('id', userIds)

        const userMap = new Map((users || []).map(u => [u.id, u]))

        // Get streaks for all users
        const { data: allStreaks } = await admin
          .from('user_streaks')
          .select('user_id, current_streak')
          .in('user_id', userIds)

        const streakMap = new Map((allStreaks || []).map(s => [s.user_id, s.current_streak]))

        leaderboard = scores.map(s => ({
          user_id: s.user_id,
          display_name: userMap.get(s.user_id)?.display_name || 'Unknown',
          points: s.points,
          tasks_completed: s.tasks_completed,
          streak: streakMap.get(s.user_id) || 0,
          avatar_url: userMap.get(s.user_id)?.avatar_url || null,
        }))
      }
    }

    return NextResponse.json({
      streak: streak || null,
      achievements,
      leaderboard,
    })
  } catch (err: any) {
    console.error('Gamification error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
