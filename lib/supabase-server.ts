// Lazy server Supabase client — never instantiated at module scope
import { cookies } from 'next/headers'

let _client: ReturnType<typeof import('@supabase/ssr')['createServerClient']> | null = null;

export async function createServerSupabaseClient() {
  const { createServerClient } = require('@supabase/ssr')
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Called from Server Component — ignore, middleware handles session refresh
          }
        },
      },
    }
  )
}
