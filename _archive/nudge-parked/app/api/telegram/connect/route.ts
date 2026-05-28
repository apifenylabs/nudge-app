import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * POST /api/telegram/connect
 * Links a Telegram chat to the authenticated user's Nudge account.
 * 
 * Flow:
 * 1. User clicks "Connect Telegram" in settings
 * 2. Backend generates a one-time code
 * 3. User sends /start <code> to the bot on Telegram
 * 4. Bot verifies the code and links the chat
 *
 * Request body: { code: string, chatId: number }
 * Response: { success: boolean, verified?: boolean }
 */

// Temporary store for connection codes (in production, use DB)
// Format: { [code: string]: { userId: string, expiresAt: number } }
const pendingConnections = new Map<string, { userId: string; expiresAt: number }>()

// Clean up expired codes periodically
setInterval(() => {
  const now = Date.now()
  pendingConnections.forEach((data, code) => {
    if (data.expiresAt < now) pendingConnections.delete(code)
  })
}, 60000)

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // no I,O,0,1 to avoid confusion
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

/**
 * GET /api/telegram/connect?action=generate
 * Generates a one-time connection code for the authenticated user.
 * Returns: { code: string, expiresIn: number (seconds) }
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    if (action === 'generate') {
      // Generate a unique one-time code
      let code: string
      do {
        code = generateCode()
      } while (pendingConnections.has(code))

      pendingConnections.set(code, {
        userId: user.id,
        expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
      })

      return NextResponse.json({
        code,
        expiresIn: 300,
        instructions: `Send this code to the Nudge Telegram bot:\n1. Open Telegram\n2. Search for @nudge_bot\n3. Send: /connect ${code}`,
      })
    }

    return NextResponse.json({ error: 'Invalid action. Use ?action=generate' }, { status: 400 })
  } catch (error: any) {
    console.error('Telegram connect error:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

/**
 * POST /api/telegram/connect
 * Verifies a connection code and links Telegram chat to user.
 * Called by the Telegram webhook when user sends /connect <code>
 */
export async function POST(request: NextRequest) {
  try {
    const { code, chatId, username } = await request.json()

    if (!code || !chatId) {
      return NextResponse.json({ error: 'Code and chatId required' }, { status: 400 })
    }

    const connection = pendingConnections.get(code.toUpperCase())
    if (!connection) {
      return NextResponse.json({ error: 'Invalid or expired code' }, { status: 404 })
    }

    if (connection.expiresAt < Date.now()) {
      pendingConnections.delete(code.toUpperCase())
      return NextResponse.json({ error: 'Code expired. Generate a new one.' }, { status: 410 })
    }

    // Link the Telegram chat to the user
    const adminDb = createAdminClient()
    const { error: updateError } = await adminDb
      .from('users')
      .update({
        telegram_chat_id: chatId,
        telegram_username: username || null,
      })
      .eq('id', connection.userId)

    if (updateError) {
      console.error('Failed to link Telegram:', updateError)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    // Clean up the code
    pendingConnections.delete(code.toUpperCase())

    return NextResponse.json({
      success: true,
      verified: true,
      userId: connection.userId,
    })
  } catch (error: any) {
    console.error('Telegram connect POST error:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
