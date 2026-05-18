import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

function getSupabase(request: Request) {
  const cookieStore = request.headers.get('cookie') || ''
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.split(';').map(c => {
            const [name, ...rest] = c.trim().split('=')
            return { name, value: rest.join('=') }
          }).filter(c => c.name)
        },
        setAll() {
          // no-op
        },
      },
    }
  )
}

/** GET /api/bookmarks — list user's bookmarks */
export async function GET(request: Request) {
  const supabase = getSupabase(request)
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

/** POST /api/bookmarks — add a bookmark */
export async function POST(request: Request) {
  const supabase = getSupabase(request)
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { destination_id } = await request.json()
  if (!destination_id) {
    return NextResponse.json({ error: 'destination_id is required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('bookmarks')
    .upsert({ user_id: user.id, destination_id }, { onConflict: 'user_id,destination_id' })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}

/** DELETE /api/bookmarks — remove a bookmark */
export async function DELETE(request: Request) {
  const supabase = getSupabase(request)
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { destination_id } = await request.json()
  if (!destination_id) {
    return NextResponse.json({ error: 'destination_id is required' }, { status: 400 })
  }

  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('user_id', user.id)
    .eq('destination_id', destination_id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
