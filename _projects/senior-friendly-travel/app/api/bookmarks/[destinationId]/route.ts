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

/** GET /api/bookmarks/[destinationId] — check if destination is bookmarked */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ destinationId: string }> }
) {
  const { destinationId } = await params
  const supabase = getSupabase(request)
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ bookmarked: false })
  }

  const { data, error } = await supabase
    .from('bookmarks')
    .select('id')
    .eq('user_id', user.id)
    .eq('destination_id', destinationId)
    .maybeSingle()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ bookmarked: !!data })
}
