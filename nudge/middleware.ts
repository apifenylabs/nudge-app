import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Check if user has any auth cookies
  const hasAuthCookie = request.cookies.getAll().some(c => 
    c.name.includes('supabase') || c.name.includes('sb-') || c.name.includes('auth')
  )

  const { pathname } = request.nextUrl

  // Protected routes — redirect to login if no session
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/settings')) {
    if (!hasAuthCookie) {
      const redirectUrl = new URL('/auth/login', request.url)
      redirectUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Public routes — always pass through
  return NextResponse.next({
    request,
  })
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/|_next/data|join/|share/|refer/).*)',
  ],
}
