'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

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
      background: '#f5f5f5',
      padding: '40px 5vw'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: '#ffffff',
        borderRadius: '24px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
        overflow: 'hidden'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #1B2B6B 0%, #2a3a8c 50%, #8B1A3A 100%)',
          padding: '30px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{ color: '#ffffff', fontWeight: 900, margin: 0, fontSize: '24px' }}>
              📚 إدارة الكورسات
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', margin: '5px 0 0', fontSize: '14px', fontWeight: 600 }}>
              اضيف كورسات جديدة وعدّلها واحذفها
            </p>
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
                padding: '10px 22px',
                background: 'rgba(255,255,255,0.15)',
                color: '#fff',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: '50px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                fontFamily: 'Cairo'
              }}
            >
              خروج
            </button>
          </form>
        </div>
        <div style={{ padding: '30px 40px' }}>
          <div style={{ marginBottom: '25px' }}>
            <Link href="/admin/courses/new">
              <a style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                background: 'linear-gradient(135deg, #1B2B6B 0%, #2a3a8c 100%)',
                color: '#fff',
                borderRadius: '50px',
                fontWeight: 800,
                textDecoration: 'none',
                fontSize: '15px',
                boxShadow: '0 4px 15px rgba(27,43,107,0.2)',
                fontFamily: 'Cairo'
              }}>
                ➕ إضافة كورس جديد
              </a>
            </Link>
          </div>

          {loading ? (
            <p style={{ textAlign: 'center', padding: '40px 0', color: '#999', fontWeight: 600 }}>جاري التحميل...</p>
          ) : courses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px', background: '#fafafa', borderRadius: '16px' }}>
              <div style={{ fontSize: '60px', marginBottom: '15px' }}>📚</div>
              <p style={{ color: '#888', fontSize: '16px', fontWeight: 700, marginBottom: '20px' }}>لا توجد كورسات بعد</p>
              <Link href="/admin/courses/new">
                <a style={{
                  display: 'inline-block',
                  padding: '14px 30px',
                  background: '#8B1A3A',
                  color: '#fff',
                  borderRadius: '50px',
                  fontWeight: 800,
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontFamily: 'Cairo'
                }}>
                  أضف أول كورس
                </a>
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              {courses.map((c: any) => (
                <div key={c.id} style={{
                  background: '#fff',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  border: '1px solid rgba(27,43,107,0.08)',
                  boxShadow: '0 8px 25px rgba(139,26,58,0.05)',
                  transition: 'transform 0.3s, box-shadow 0.3s'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #1B2B6B 0%, #8B1A3A 100%)',
                    padding: '20px',
                    textAlign: 'center'
                  }}>
                    <h3 style={{ color: '#fff', fontWeight: 900, margin: 0, fontSize: '18px' }}>{c.name}</h3>
                    <span style={{
                      background: 'rgba(255,255,255,0.2)',
                      color: '#fff',
                      padding: '6px 16px',
                      borderRadius: '50px',
                      fontSize: '13px',
                      fontWeight: 700,
                      display: 'inline-block',
                      marginTop: '8px'
                    }}>
                      {c.price} درهم
                    </span>
                  </div>
                  <div style={{ padding: '15px 20px' }}>
                    {c.description && (
                      <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.5', marginBottom: '12px' }}>{c.description}</p>
                    )}
                    <span style={{
                      background: '#f0f0ff',
                      color: '#1B2B6B',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      direction: 'ltr',
                      display: 'inline-block'
                    }}>
                      /course/{c.slug}
                    </span>
                  </div>
                  <div style={{ padding: '0 20px 15px', display: 'flex', gap: '10px' }}>
                    <Link href={`/admin/courses/edit/${c.slug}`}>
                      <a style={{
                        flex: 1,
                        padding: '10px',
                        background: '#1B2B6B',
                        color: '#fff',
                        borderRadius: '10px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        textAlign: 'center',
                        fontSize: '13px',
                        fontFamily: 'Cairo'
                      }}>
                        ✏️ تعديل
                      </a>
                    </Link>
                    <button
                      onClick={() => handleDelete(c.slug)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        background: '#d32f2f',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '10px',
                        fontWeight: 700,
                        fontSize: '13px',
                        cursor: 'pointer',
                        fontFamily: 'Cairo'
                      }}
                    >
                      🗑 حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}