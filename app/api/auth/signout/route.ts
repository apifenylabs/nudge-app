import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function POST(request: Request) {
  const cookieStore = request.headers.get('cookie') || ''
  const supabase = createServerClient(
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
          // response headers handle cookies
        },
      },
    }
  )

  await supabase.auth.signOut()

  return NextResponse.redirect(new URL('/', request.url))
}
