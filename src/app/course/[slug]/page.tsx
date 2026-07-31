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
        <div style={{ fontSize: '60px', marginBottom: '15px' }}>📚</div>
        <h1 style={{ color: '#1B2B6B' }}>الكورس غير موجود</h1>
      </div>
    )
  }

  return (
    <div style={{
      fontFamily: 'Cairo',
      direction: 'rtl',
      minHeight: '100vh',
      background: '#f5f5f5',
      padding: '60px 5vw'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        background: '#fff',
        borderRadius: '24px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
        overflow: 'hidden'
      }}>
        {course.imageUrl ? (
          <div style={{ width: '100%', height: '250px', overflow: 'hidden', position: 'relative' }}>
            <img
              src={course.imageUrl}
              alt={course.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
              padding: '30px 20px 15px',
              color: '#fff'
            }}>
              <h1 style={{ color: '#fff', fontWeight: 900, margin: 0, fontSize: '22px' }}>{course.name}</h1>
            </div>
          </div>
        ) : (
          <div style={{
            background: 'linear-gradient(135deg, #1B2B6B 0%, #8B1A3A 100%)',
            padding: '40px 20px',
            textAlign: 'center'
          }}>
            <h1 style={{ color: '#fff', fontWeight: 900, margin: 0, fontSize: '22px' }}>{course.name}</h1>
          </div>
        )}
        <div style={{ padding: '25px 25px' }}>
          {course.description && (
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>{course.description}</p>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{
              background: '#f0f0ff',
              color: '#1B2B6B',
              padding: '6px 14px',
              borderRadius: '50px',
              fontSize: '12px',
              fontWeight: 700,
              direction: 'ltr',
              display: 'inline-block'
            }}>
              /course/{course.slug}
            </span>
          </div>
          <div style={{
            background: '#fafafa',
            borderRadius: '14px',
            padding: '18px',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            <div style={{ color: '#888', fontSize: '12px', fontWeight: 600, marginBottom: '3px' }}>السعر</div>
            <div style={{ color: '#8B1A3A', fontSize: '36px', fontWeight: 900 }}>{course.price} <span style={{ fontSize: '16px', fontWeight: 700, color: '#1B2B6B' }}>درهم</span></div>
          </div>
          <Link href={`/checkout?package=custom&price=${course.price}&subject=${encodeURIComponent(course.name)}&slug=${course.slug}`}>
            <a style={{
              display: 'block',
              textAlign: 'center',
              padding: '16px',
              background: 'linear-gradient(135deg, #8B1A3A 0%, #c0392b 100%)',
              color: '#fff',
              borderRadius: '50px',
              fontWeight: 800,
              textDecoration: 'none',
              fontSize: '17px',
              fontFamily: 'Cairo',
              boxShadow: '0 4px 15px rgba(139,26,58,0.25)'
            }}>
              ادفع الآن وابدأ التعلم 🚀
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}