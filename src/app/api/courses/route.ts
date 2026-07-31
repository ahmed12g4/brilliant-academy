import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { PRICES } from '@/lib/prices'

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

  const platformCourses = generatePlatformCourses()
  const adminCourses = await kv.hgetall('courses') || {}

  return NextResponse.json([...platformCourses, ...Object.values(adminCourses)])
}

function generatePlatformCourses(): any[] {
  const subjects = ['لغة عربية', 'لغة انجليزية', 'رياضيات', 'علوم', 'قرآن كـريم', 'تربية إسلامية', 'حساب ذهني', 'اجتماعيات', 'فيزياء', 'كيما', 'أحياء', 'لغة فرنسية', 'جيولوجيا', 'جغرافي', 'تاريخ']
  const countries = ['Kuwait', 'KSA', 'Qatar', 'UAE']
  const courses: any[] = []

  const groups = ['grades_1_5', 'grades_6_9', 'grades_10_11', 'grade_12', 'mental_math']

  groups.forEach((group: string) => {
    const data = PRICES[group as keyof typeof PRICES] as Record<string, any>
    if (!data) return
    subjects.forEach((subject) => {
      countries.forEach((country) => {
        const slug = `${group}-${country}-${subject}`.toLowerCase().replace(/\s+/g, '-')
        const pkg = data.one
        if (pkg) {
          courses.push({
            id: slug,
            name: `${subject} - ${getGroupLabel(group)} - ${getCountryName(country)}`,
            price: pkg[country.toLowerCase()] || pkg.aed || 0,
            subject,
            country,
            gradeLevel: group,
            slug,
            createdAt: 'platform'
          })
        }
      })
    })
  })

  return courses
}

function getGroupLabel(group: string): string {
  const labels: Record<string, string> = {
    'grades_1_5': 'ابتدائي',
    'grades_6_9': 'متوسط',
    'grades_10_11': 'ثانوي',
    'grade_12': 'ثانوي',
    'mental_math': 'حساب ذهني'
  }
  return labels[group] || group
}

function getCountryName(country: string): string {
  const names: Record<string, string> = {
    'Kuwait': 'الكويت',
    'KSA': 'السعودية',
    'Qatar': 'قطر',
    'UAE': 'الإمارات'
  }
  return names[country] || country
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