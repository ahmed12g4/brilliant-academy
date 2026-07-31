import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { PRICES, getGradeGroup, isMentalMath } from '@/lib/prices'
import { getGradeName } from '@/lib/prices'

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

  const kvCourses = await kv.hgetall('courses') || {}
  const adminCourses = Object.values(kvCourses) as string[]

  const autoSubjects = ['لغة عربية', 'لغة انجليزية', 'رياضيات', 'علوم', 'قرآن كـريم', 'تربية إسلامية', 'حساب ذهني', 'اجتماعيات', 'فيزياء', 'كيما', 'أحياء', 'لغة فرنسية', 'جيولوجيا', 'جغرافي', 'تاريخ']
  const gradeGroups = ['grades_1_5', 'grades_6_9', 'grades_10_11', 'grade_12', 'mental_math']

  const autoCourses: any[] = []
  gradeGroups.forEach((group) => {
    const data = PRICES[group as keyof typeof PRICES] as Record<string, any>
    if (!data) return
    Object.keys(data).forEach((pkg) => {
      autoSubjects.forEach((subject) => {
        const slug = `${group}-${subject}`.toLowerCase().replace(/\s+/g, '-')
        autoCourses.push({
          id: slug,
          name: `${subject} - ${group === 'mental_math' ? 'حساب ذهني' : getGradeGroupLabel(group)}`,
          price: (data as any)[pkg]?.aed || 0,
          description: `${subject} - باقة ${pkg}`,
          imageUrl: null,
          subject,
          gradeLevel: group,
          slug,
          createdAt: '2026-01-01T00:00:00.000Z'
        })
      })
    })
  })

  return NextResponse.json([...adminCourses, ...autoCourses])
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

function getGradeGroupLabel(group: string): string {
  const labels: Record<string, string> = {
    'grades_1_5': 'ابتدائي (1-5)',
    'grades_6_9': 'متوسط (6-9)',
    'grades_10_11': 'ثانوي (10-11)',
    'grade_12': 'ثانوي (12)',
    'mental_math': 'حساب ذهني'
  }
  return labels[group] || group
}