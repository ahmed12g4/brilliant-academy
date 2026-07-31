import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  if (password === process.env.ADMIN_PASSWORD) {
    const res = NextResponse.json({ success: true })
    res.cookies.set('admin_pass', password, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })
    return res
  }

  return NextResponse.json({ success: false }, { status: 401 })
}