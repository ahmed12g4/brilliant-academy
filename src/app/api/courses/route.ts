import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')

  if (slug) {
    const course = (await kv.hget('courses', slug)) as string | null
    if (course) {
      return NextResponse.json([JSON.parse(course)])
    }
    return NextResponse.json([])
  }

  const courses = await kv.hgetall('courses') || {}
  return NextResponse.json(Object.values(courses))
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, price, description, slug, imageUrl, subject, gradeLevel } = body

  if (!name || !price || !slug) {
    return NextResponse.json({ error: 'البيانات ناقصة' }, { status: 400 })
  }

  const now = new Date().toISOString()
  const course = {
    id: slug,
    name,
    price,
    description,
    imageUrl,
    subject,
    gradeLevel,
    slug,
    createdAt: now
  }

  await kv.hset('courses', { [slug]: JSON.stringify(course) })

  return NextResponse.json(course)
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { name, price, description, slug, imageUrl, subject } = body

  if (!name || !price || !slug) {
    return NextResponse.json({ error: 'البيانات ناقصة' }, { status: 400 })
  }

  const existing = (await kv.hget('courses', slug)) as string | null
  if (!existing) {
    return NextResponse.json({ error: 'الكورس غير موجود' }, { status: 404 })
  }

  const old = JSON.parse(existing)
  const course = {
    id: slug,
    name,
    price,
    description,
    imageUrl: imageUrl || old.imageUrl,
    subject: subject || old.subject,
    gradeLevel: old.gradeLevel,
    slug,
    createdAt: old.createdAt,
    updatedAt: new Date().toISOString()
  }

  await kv.hset('courses', { [slug]: JSON.stringify(course) })

  return NextResponse.json(course)
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    return NextResponse.json({ error: 'محدد الكورس' }, { status: 400 })
  }

  await kv.hdel('courses', slug as string)

  return NextResponse.json({ success: true })
}