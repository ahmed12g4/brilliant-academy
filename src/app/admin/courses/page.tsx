'use client'
import Link from 'next/link'

export default async function AdminCourses() {
  let courses: any[] = []
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/courses`, {
      cache: 'no-store'
    })
    courses = await res.json()
  } catch {}

  return (
    <div style={{
      fontFamily: 'Cairo',
      direction: 'rtl',
      minHeight: '100vh',
      background: '#f5f5f5'
    }}>
      <header style={{
        background: '#1B2B6B',
        padding: '20px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 18px rgba(0,0,0,0.12)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img
            src="https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69afadb7c509a0bfb75719bb.png"
            alt="Brilliant Academy Logo"
            style={{ height: '50px', width: 'auto' }}
          />
          <span style={{ color: '#fff', fontSize: '20px', fontWeight: 800 }}>
            لوحة تحكم الأكاديمية بريلينت
          </span>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            await fetch('/api/admin/logout', { method: 'POST' })
            document.cookie = 'admin_pass=; path=/; max-age=0'
            window.location.href = '/admin/login'
          }}
        >
          <button
            type="submit"
            style={{
              padding: '10px 24px',
              background: '#8B1A3A',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            خروج
          </button>
        </form>
      </header>
      <div style={{ padding: '40px 5vw' }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          background: '#fff',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.06)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h1 style={{ color: '#1B2B6B', fontWeight: 900 }}>كورساتك</h1>
            <Link href="/admin/courses/new">
              <a style={{
                padding: '12px 24px',
                background: '#8B1A3A',
                color: '#fff',
                borderRadius: '50px',
                fontWeight: 800,
                textDecoration: 'none',
                display: 'inline-block'
              }}>
                + إضافة كورس
              </a>
            </Link>
          </div>

          {courses.length === 0 ? (
            <p style={{ color: '#999', textAlign: 'center', padding: '60px 0' }}>
              لا توجد كورسات بعد
            </p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'right', padding: '12px', borderBottom: '2px solid #eee', color: '#1B2B6B' }}>الاسم</th>
                  <th style={{ textAlign: 'right', padding: '12px', borderBottom: '2px solid #eee', color: '#1B2B6B' }}>السعر</th>
                  <th style={{ textAlign: 'right', padding: '12px', borderBottom: '2px solid #eee', color: '#1B2B6B' }}>الرابط</th>
                  <th style={{ textAlign: 'center', padding: '12px', borderBottom: '2px solid #eee', color: '#1B2B6B' }}>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c: any) => (
                  <tr key={c.id}>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{c.name}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{c.price} درهم</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>/course/{c.slug}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee', textAlign: 'center' }}>
                      <Link href={`/admin/courses/edit/${c.slug}`}>
                        <a style={{ color: '#1B2B6B', marginRight: '10px' }}>تعديل</a>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
