import { NextResponse } from 'next/server';
import supabase, { isSupabaseConfigured } from '@/lib/supabase-client';

/**
 * GET /api/progression/:id
 * Returns a user's progression profile (rank, XP, abilities, stats).
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isSupabaseConfigured) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  }

  const { id } = await params;

  const { data: profile, error } = await supabase!
    .from('profiles')
    .select(`
      id,
      display_name,
      current_rank,
      total_xp,
      tier,
      tutorial_seen,
      agents_created,
      agents_deployed,
      sandbox_sessions,
      unlocked_abilities,
      first_agent_created,
      first_deploy,
      completed_tutorial,
      created_at,
      updated_at
    `)
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Also fetch rank thresholds
  const { data: thresholds } = await supabase!
    .from('rank_thresholds')
    .select('*')
    .order('xp_required', { ascending: true });

  // Calculate next rank
  const nextRank = thresholds?.find((t) => t.xp_required > (profile?.total_xp ?? 0));

  return NextResponse.json({
    profile,
    thresholds,
    next_rank: nextRank ?? null,
    xp_for_next: nextRank ? nextRank.xp_required - (profile?.total_xp ?? 0) : 0,
  });
}

/**
 * PATCH /api/progression/:id
 * Updates progression fields on a user's profile.
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isSupabaseConfigured) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  }

  const { id } = await params;
  const body = await request.json();

  // Whitelist updatable fields
  const allowed = new Set([
    'display_name',
    'avatar_url',
    'tutorial_seen',
    'agents_created',
    'agents_deployed',
    'sandbox_sessions',
    'first_agent_created',
    'first_deploy',
    'completed_tutorial',
  ]);

  const updates: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(body)) {
    if (allowed.has(key)) {
      updates[key] = value;
    }
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
  }

  const { data, error } = await supabase!
    .from('profiles')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ profile: data });
}
