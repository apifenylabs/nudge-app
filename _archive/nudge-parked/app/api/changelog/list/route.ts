/**
 * GET /api/changelog/list
 *
 * Returns published changelog entries with seen status for the requesting user.
 * Query params: userId (optional), limit (default 20), offset (default 0)
 *
 * Response: {
 *   entries: Array<ChangelogEntryWithSeen>,
 *   totalUnseen: number,
 *   total: number,
 * }
 */

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { ensureMigration } from '@/lib/supabase/migrate'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    const limit = parseInt(searchParams.get('limit') || '20', 10)
    const offset = parseInt(searchParams.get('offset') || '0', 10)

    await ensureMigration('changelog_entries')
    await ensureMigration('changelog_seen')

    const supabase = createAdminClient()

    // Get published changelog entries
    const { data: entries, error: entriesError, count } = await supabase
      .from('changelog_entries')
      .select('*', { count: 'exact' })
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (entriesError) {
      console.error('[Changelog List] Error fetching entries:', entriesError)
      return NextResponse.json({ error: 'Failed to fetch changelog entries' }, { status: 500 })
    }

    // If no user ID provided, return entries without seen status
    if (!userId) {
      return NextResponse.json({
        success: true,
        entries: (entries || []).map(e => ({ ...e, seen: false })),
        totalUnseen: entries?.length || 0,
        total: count || 0,
      })
    }

    // Get seen entries for this user
    const entryIds = (entries || []).map(e => e.id)
    let seenEntryIds = new Set<string>()

    if (entryIds.length > 0) {
      const { data: seen } = await supabase
        .from('changelog_seen')
        .select('entry_id')
        .eq('user_id', userId)
        .in('entry_id', entryIds)

      if (seen) {
        seenEntryIds = new Set(seen.map(s => s.entry_id))
      }
    }

    // Get total unseen count (all entries, not just this page)
    const { count: totalPublished } = await supabase
      .from('changelog_entries')
      .select('*', { count: 'exact', head: true })
      .eq('is_published', true)

    const { count: totalSeen } = await supabase
      .from('changelog_seen')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)

    const totalUnseen = (totalPublished || 0) - (totalSeen || 0)

    // Merge seen status into entries
    const entriesWithSeen = (entries || []).map(e => ({
      ...e,
      seen: seenEntryIds.has(e.id),
    }))

    return NextResponse.json({
      success: true,
      entries: entriesWithSeen,
      totalUnseen: Math.max(0, totalUnseen),
      total: count || 0,
    })
  } catch (err: any) {
    console.error('[Changelog List] Error:', err.message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
