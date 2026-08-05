import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Allow access to /admin (login page) without authentication
  if (path === '/admin') {
    return NextResponse.next()
  }

  if (path.startsWith('/admin')) {
    const password = request.cookies.get('admin_pass')?.value

    if (password !== process.env.ADMIN_PASSWORD) {
      const loginUrl = new URL('/admin', request.url)
      loginUrl.searchParams.set('callbackUrl', path)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}