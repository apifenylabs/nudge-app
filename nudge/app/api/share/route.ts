import { NextRequest, NextResponse } from 'next/server'

/**
 * API: Generate a shareable link for a completed task.
 * POST /api/share
 *
 * Body:
 *   taskId: string
 *
 * Returns:
 *   { url: string, task: { title, completedBy, completedAt } }
 *
 * The URL can be shared to social media. The page renders a
 * beautiful share card for non-logged-in viewers.
 */
export async function POST(req: NextRequest) {
  try {
    const { taskId } = await req.json()

    if (!taskId || typeof taskId !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid taskId' },
        { status: 400 }
      )
    }

    // Generate a share URL with the task ID
    // The /share page will look up the task and render a card
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nudge-sigma-liart.vercel.app'
    const url = new URL(`/share/${encodeURIComponent(taskId)}`, baseUrl)

    return NextResponse.json({
      url: url.toString(),
    })
  } catch (err) {
    console.error('Share link generation error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
