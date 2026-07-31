import { NextRequest, NextResponse } from 'next/server'

const memoryStore: Record<string, string> = {}

async function hgetall(key: string) {
  const prefix = key + ':'
  const result: Record<string, string> = {}
  for (const k of Object.keys(memoryStore)) {
    if (k.startsWith(prefix)) {
      result[k.slice(prefix.length)] = memoryStore[k]
    }
  }
  return result
}

async function hset(key: string, values: Record<string, string>) {
  const prefix = key + ':'
  for (const [field, value] of Object.entries(values)) {
    memoryStore[prefix + field] = value
  }
}

async function hget(key: string, field: string) {
  return memoryStore[key + ':' + field] || null
}

async function hdel(key: string, field: string) {
  delete memoryStore[key + ':' + field]
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')

  if (slug) {
    const course = await hget('courses', slug)
    if (course) {
      return NextResponse.json([JSON.parse(course)])
    }
    return NextResponse.json([])
  }

  const courses = await hgetall('courses')
  return NextResponse.json(Object.values(courses))
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, price, description, slug, imageUrl, subject, gradeLevel, country } = body

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
    country,
    slug,
    createdAt: now
  }

  await hset('courses', { [slug]: JSON.stringify(course) })

  return NextResponse.json(course)
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { name, price, description, slug, imageUrl, subject, gradeLevel, country } = body

  if (!name || !price || !slug) {
    return NextResponse.json({ error: 'البيانات ناقصة' }, { status: 400 })
  }

  const existing = await hget('courses', slug)
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
    gradeLevel: gradeLevel ?? old.gradeLevel,
    country: country ?? old.country,
    slug,
    createdAt: old.createdAt,
    updatedAt: new Date().toISOString()
  }

  await hset('courses', { [slug]: JSON.stringify(course) })

  return NextResponse.json(course)
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    return NextResponse.json({ error: 'محدد الكورس' }, { status: 400 })
  }

  await hdel('courses', slug)

  return NextResponse.json({ success: true })
}