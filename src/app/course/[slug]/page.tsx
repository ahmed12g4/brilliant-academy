import { kv } from '@vercel/kv'
import Link from 'next/link'

export default async function CoursePage({ params }: { params: { slug: string } }) {
  let course = null
  try {
     const raw = await kv.hget('courses', params.slug) as string | null
     if (raw) course = JSON.parse(raw)
  } catch {}

  if (!course) {
    return (
      <div style={{
        fontFamily: 'Cairo',
        direction: 'rtl',
        minHeight: '100vh',
        background: '#f5f5f5',
        padding: '80px 5vw',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#1B2B6B' }}>الكورس مش موجود</h1>
      </div>
    )
  }

  return (
    <div style={{
      fontFamily: 'Cairo',
      direction: 'rtl',
      minHeight: '100vh',
      background: '#f5f5f5',
      padding: '80px 5vw'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        background: '#fff',
        borderRadius: '24px',
        padding: '40px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#1B2B6B', fontWeight: 900, marginBottom: '15px' }}>{course.name}</h1>
        <p style={{ color: '#666', marginBottom: '20px' }}>{course.description}</p>
        <p style={{ color: '#8B1A3A', fontSize: '32px', fontWeight: 900, marginBottom: '30px' }}>{course.price} درهم</p>
        <Link href={`/checkout?package=custom&price=${course.price}&subject=${encodeURIComponent(course.name)}&slug=${course.slug}`}>
          <a style={{
            display: 'inline-block',
            padding: '16px 40px',
            background: '#8B1A3A',
            color: '#fff',
            borderRadius: '50px',
            fontWeight: 800,
            textDecoration: 'none'
          }}>
            ادفع الآن
          </a>
        </Link>
      </div>
    </div>
  )
}
