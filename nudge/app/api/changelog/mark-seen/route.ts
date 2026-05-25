/**
 * POST /api/changelog/mark-seen
 *
 * Marks one or more changelog entries as seen by a user.
 * Body: { userId: string, entryIds: string[] }
 *
 * If entryIds is empty or not provided, marks ALL entries as seen.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { ensureMigration } from '@/lib/supabase/migrate'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, entryIds } = body as { userId?: string; entryIds?: string[] }

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid userId' }, { status: 400 })
    }

    const supabase = createAdminClient()
    await ensureMigration('changelog_seen')

    if (!entryIds || !Array.isArray(entryIds) || entryIds.length === 0) {
      // Mark all published entries as seen
      const { data: allEntries } = await supabase
        .from('changelog_entries')
        .select('id')
        .eq('is_published', true)

      if (!allEntries || allEntries.length === 0) {
        return NextResponse.json({ success: true, marked: 0 })
      }

      const allIds = allEntries.map(e => e.id)

      // Batch upsert: insert only those not already seen
      const { data: alreadySeen } = await supabase
        .from('changelog_seen')
        .select('entry_id')
        .eq('user_id', userId)
        .in('entry_id', allIds)

      const seenSet = new Set((alreadySeen || []).map(s => s.entry_id))
      const toInsert = allIds
        .filter(id => !seenSet.has(id))
        .map(entryId => ({
          user_id: userId,
          entry_id: entryId,
          seen_at: new Date().toISOString(),
        }))

      if (toInsert.length === 0) {
        return NextResponse.json({ success: true, marked: 0 })
      }

      const { error: insertError } = await supabase
        .from('changelog_seen')
        .insert(toInsert)

      if (insertError) {
        console.error('[Changelog Mark Seen] Batch insert error:', insertError)
        return NextResponse.json({ error: 'Failed to mark entries as seen' }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        marked: toInsert.length,
        allMarked: true,
      })
    }

    // Mark specific entries
    const toInsert = entryIds.map(entryId => ({
      user_id: userId,
      entry_id: entryId,
      seen_at: new Date().toISOString(),
    }))

    // Use upsert with ignore duplicates to avoid errors on already-seen entries
    let inserted = 0
    for (const item of toInsert) {
      const { error } = await supabase
        .from('changelog_seen')
        .upsert(item, {
          onConflict: 'user_id, entry_id',
          ignoreDuplicates: true,
        })
      if (!error) inserted++
    }

    return NextResponse.json({
      success: true,
      marked: inserted,
      allMarked: false,
    })
  } catch (err: any) {
    console.error('[Changelog Mark Seen] Error:', err.message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
