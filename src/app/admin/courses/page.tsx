'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function AdminCourses() {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch('/api/courses')
        const data = await res.json()
        setCourses(data)
      } catch {}
      setLoading(false)
    }
    fetchCourses()
  }, [])

  const handleDelete = async (slug: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الكورس؟')) return
    await fetch(`/api/courses?slug=${slug}`, { method: 'DELETE' })
    setCourses(courses.filter((c: any) => c.slug !== slug))
  }

  return (
    <div style={{
      fontFamily: 'Cairo',
      direction: 'rtl',
      minHeight: '100vh',
      background: '#f5f5f5'
    }}>
      <header style={{
        background: '#ffffff',
        borderBottom: '3px solid #8B1A3A',
        padding: '15px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 10px rgba(0,0,0,0.06)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src="https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69afadb7c509a0bfb75719bb.png"
            alt="Logo"
            style={{ height: '40px', width: 'auto' }}
          />
          <span style={{ color: '#1B2B6B', fontWeight: 800, fontSize: '16px' }}>
            لوحة التحكم
          </span>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            document.cookie = 'admin_pass=; path=/; max-age=0'
            window.location.href = '/admin/login'
          }}
        >
          <button
            type="submit"
            style={{
              padding: '8px 20px',
              background: '#8B1A3A',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            خروج
          </button>
        </form>
      </header>
      <main style={{ padding: '40px 5vw' }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          background: '#fff',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.06)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
            <h1 style={{ color: '#1B2B6B', fontWeight: 900, fontSize: '24px', margin: 0 }}>
              📚 كورساتي
            </h1>
            <Link href="/admin/courses/new">
              <a style={{
                padding: '12px 24px',
                background: '#8B1A3A',
                color: '#fff',
                borderRadius: '50px',
                fontWeight: 800,
                textDecoration: 'none',
                fontSize: '14px',
                display: 'inline-block'
              }}>
                ➕ إضافة كورس جديد
              </a>
            </Link>
          </div>

          {loading ? (
            <p style={{ textAlign: 'center', padding: '60px 0', color: '#999' }}>جاري التحميل...</p>
          ) : courses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ color: '#999', fontSize: '16px' }}>لا توجد كورسات بعد</p>
              <Link href="/admin/courses/new">
                <a style={{
                  display: 'inline-block',
                  marginTop: '15px',
                  padding: '12px 24px',
                  background: '#1B2B6B',
                  color: '#fff',
                  borderRadius: '50px',
                  fontWeight: 800,
                  textDecoration: 'none',
                  fontSize: '14px'
                }}>
                  أضف أول كورس
                </a>
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {courses.map((c: any) => (
                <div key={c.id} style={{
                  background: '#fafafa',
                  borderRadius: '16px',
                  padding: '20px',
                  border: '1px solid #eee',
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <h3 style={{ color: '#1B2B6B', fontWeight: 800, margin: 0, fontSize: '18px' }}>{c.name}</h3>
                    <span style={{
                      background: '#8B1A3A',
                      color: '#fff',
                      padding: '4px 12px',
                      borderRadius: '50px',
                      fontSize: '12px',
                      fontWeight: 800
                    }}>
                      {c.price} درهم
                    </span>
                  </div>
                  {c.description && (
                    <p style={{ color: '#666', fontSize: '13px', marginBottom: '12px', lineHeight: '1.5' }}>
                      {c.description}
                    </p>
                  )}
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
                    <span style={{
                      background: '#f0f0ff',
                      color: '#1B2B6B',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700
                    }}>
                      الرابط: /course/{c.slug}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Link href={`/admin/courses/edit/${c.slug}`}>
                      <a style={{
                        padding: '8px 16px',
                        background: '#1B2B6B',
                        color: '#fff',
                        borderRadius: '8px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        fontSize: '13px'
                      }}>
                        تعديل
                      </a>
                    </Link>
                    <button
                      onClick={() => handleDelete(c.slug)}
                      style={{
                        padding: '8px 16px',
                        background: '#d32f2f',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}