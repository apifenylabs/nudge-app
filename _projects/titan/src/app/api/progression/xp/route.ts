import { NextResponse } from 'next/server';
import supabase, { isSupabaseConfigured } from '@/lib/supabase-client';

/**
 * XP award reasons and their values.
 */
const XP_REWARDS: Record<string, number> = {
  agent_created: 25,
  agent_deployed: 50,
  tutorial_completed: 100,
  first_agent: 100, // bonus
  first_deploy: 150,
  daily_login: 10,
  sandbox_session: 5,
};

/**
 * POST /api/progression/xp
 * Award XP to a user. Auto-calculates rank promotion.
 *
 * Body: { profile_id: string, reason: string, metadata?: object }
 */
export async function POST(request: Request) {
  if (!isSupabaseConfigured) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  }

  const body = await request.json();
  const { profile_id, reason, metadata = {} } = body;

  if (!profile_id || !reason) {
    return NextResponse.json({ error: 'profile_id and reason required' }, { status: 400 });
  }

  const amount = XP_REWARDS[reason];
  if (!amount) {
    return NextResponse.json({ error: `Unknown XP reason: ${reason}` }, { status: 400 });
  }

  // 1. Fetch current profile
  const { data: profile, error: profileError } = await supabase!
    .from('profiles')
    .select('id, total_xp, current_rank')
    .eq('id', profile_id)
    .single();

  if (profileError || !profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
  }

  const newXp = profile.total_xp + amount;

  // 2. Determine new rank
  const { data: thresholds } = await supabase!
    .from('rank_thresholds')
    .select('rank, xp_required')
    .order('xp_required', { ascending: true });

  let newRank = profile.current_rank;
  if (thresholds) {
    for (const t of thresholds) {
      if (newXp >= t.xp_required) {
        newRank = t.rank;
      }
    }
  }

  // 3. Fetch abilities for new rank
  const { data: rankData } = await supabase!
    .from('rank_thresholds')
    .select('abilities')
    .eq('rank', newRank)
    .single();

  // 4. Update profile
  const { data: updatedProfile, error: updateError } = await supabase!
    .from('profiles')
    .update({
      total_xp: newXp,
      current_rank: newRank,
      unlocked_abilities: rankData?.abilities ?? [],
    })
    .eq('id', profile_id)
    .select()
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  // 5. Log the XP event
  await supabase!
    .from('xp_events')
    .insert({
      profile_id,
      amount,
      reason,
      metadata: {
        ...metadata,
        rank_at_time: profile.current_rank,
        new_rank: newRank,
      },
    });

  const rankChanged = newRank !== profile.current_rank;

  return NextResponse.json({
    xp_awarded: amount,
    total_xp: newXp,
    previous_rank: profile.current_rank,
    current_rank: newRank,
    rank_up: rankChanged,
    profile: updatedProfile,
  });
}
