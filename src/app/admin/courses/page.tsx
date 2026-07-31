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

  const countryNames = { UAE: 'منهج الإمارات', Kuwait: 'منهج الكويت', Qatar: 'منهج قطر', KSA: 'منهج السعودية' }

  return (
    <div style={{
      fontFamily: 'Cairo',
      direction: 'rtl',
      minHeight: '100vh',
      background: '#f5f5f5',
      padding: '40px 5vw'
    }}>
      <header style={{
        background: '#ffffff',
        borderBottom: '3px solid #8B1A3A',
        padding: '15px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
        maxWidth: '1200px',
        margin: '0 auto 30px',
        borderRadius: '0 0 18px 18px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src="https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69afadb7c509a0bfb75719bb.png"
            alt="Logo"
            style={{ height: '42px', width: 'auto' }}
          />
          <div>
            <span style={{ color: '#1B2B6B', fontWeight: 800, fontSize: '16px', display: 'block' }}>
              لوحة تحكم أكاديمية بريلينت
            </span>
            <span style={{ color: '#888', fontSize: '12px', fontWeight: 600 }}>
              إدارة الكورسات
            </span>
          </div>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            if (!confirm('هل أنت متأكد من خروجك؟')) return
            document.cookie = 'admin_pass=; path=/; max-age=0'
            window.location.href = '/admin/login'
          }}
        >
          <button
            type="submit"
            style={{
              padding: '9px 22px',
              background: '#8B1A3A',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              fontFamily: 'Cairo'
            }}
          >
            خروج ✕
          </button>
        </form>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h1 style={{ color: '#1B2B6B', fontWeight: 900, margin: 0, fontSize: '26px' }}>إدارة الكورسات</h1>
            <p style={{ color: '#888', fontSize: '13px', margin: '3px 0 0', fontWeight: 600 }}>
              تعديل وحذف الكورسات الموجودة في المنصة
            </p>
          </div>
          <Link href="/admin/courses/new">
            <a style={{
              padding: '14px 28px',
              background: '#8B1A3A',
              color: '#fff',
              borderRadius: '50px',
              fontWeight: 800,
              textDecoration: 'none',
              fontSize: '14px',
              fontFamily: 'Cairo',
              boxShadow: '0 4px 15px rgba(139,26,58,0.3)',
              display: 'inline-block'
            }}>
              ➕ إضافة كورس جديد
            </a>
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <p style={{ color: '#999', fontSize: '16px', fontWeight: 600 }}>⏳ جاري التحميل...</p>
          </div>
        ) : courses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fafafa', borderRadius: '16px' }}>
            <div style={{ fontSize: '50px', marginBottom: '10px' }}>📚</div>
            <p style={{ color: '#888', fontSize: '16px', fontWeight: 700, marginBottom: '15px' }}>لا توجد كورسات</p>
            <Link href="/admin/courses/new">
              <a style={{
                display: 'inline-block',
                padding: '14px 30px',
                background: '#1B2B6B',
                color: '#fff',
                borderRadius: '50px',
                fontWeight: 800,
                textDecoration: 'none',
                fontSize: '14px',
                fontFamily: 'Cairo'
              }}>
                أضف أول كورس
              </a>
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
            {courses.map((c: any) => (
              <div key={c.id} style={{
                background: '#ffffff',
                borderRadius: '18px',
                overflow: 'hidden',
                border: '1px solid rgba(27,43,107,0.08)',
                boxShadow: '0 8px 25px rgba(139,26,58,0.05)'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #1B2B6B 0%, #2a3a8c 50%, #8B1A3A 100%)',
                  padding: '18px 20px'
                }}>
                  <h3 style={{ color: '#ffffff', fontWeight: 900, margin: 0, fontSize: '16px' }}>{c.name}</h3>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                    {c.country && (
                      <span style={{
                        background: 'rgba(255,255,255,0.2)',
                        color: '#fff',
                        padding: '3px 10px',
                        borderRadius: '50px',
                        fontSize: '11px',
                        fontWeight: 700
                      }}>
                        {countryNames[c.country as keyof typeof countryNames] || c.country}
                      </span>
                    )}
                    <span style={{
                      background: 'rgba(255,255,255,0.2)',
                      color: '#fff',
                      padding: '3px 10px',
                      borderRadius: '50px',
                      fontSize: '11px',
                      fontWeight: 700
                    }}>
                      {c.subject || 'عام'}
                    </span>
                    <span style={{
                      background: 'rgba(255,255,255,0.2)',
                      color: '#fff',
                      padding: '3px 10px',
                      borderRadius: '50px',
                      fontSize: '11px',
                      fontWeight: 700
                    }}>
                      {c.gradeLevel ? `الصف ${c.gradeLevel}` : 'عام'}
                    </span>
                  </div>
                </div>
                <div style={{ padding: '15px 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ color: '#888', fontSize: '12px', fontWeight: 600, direction: 'ltr', display: 'inline-block', background: '#f0f0ff', padding: '3px 8px', borderRadius: '6px' as any }}>
                      /course/{c.slug}
                    </span>
                    <span style={{
                      color: '#8B1A3A',
                      fontSize: '18px',
                      fontWeight: 900
                    }}>
                      {c.price} درهم
                    </span>
                  </div>
                  {c.description && (
                    <p style={{ color: '#999', fontSize: '12px', lineHeight: '1.4', marginBottom: '12px' }}>
                      {c.description}
                    </p>
                  )}
                  <div style={{ display: 'flex', gap: '10px' }}>
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
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}