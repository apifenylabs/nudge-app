import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Simple middleware: just redirect /account to /auth/login
  // Skip Supabase SSR — we handle auth client-side
  if (request.nextUrl.pathname.startsWith('/account')) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/account/:path*'],
}
