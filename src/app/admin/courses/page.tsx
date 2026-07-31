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
        if (Array.isArray(data)) {
          setCourses(data)
        }
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

  const countryNames = { UAE: 'الإمارات', Kuwait: 'الكويت', Qatar: 'قطر', KSA: 'السعودية' }

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
        borderRadius: '16px'
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
              إدارة المنصة بالكامل
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
            <h1 style={{ color: '#1B2B6B', fontWeight: 900, margin: 0, fontSize: '26px' }}>إدارة الكورسات والمنتجات</h1>
            <p style={{ color: '#888', fontSize: '13px', margin: '3px 0 0', fontWeight: 600 }}>
              تعديل وحذف الكورسات المضافة في المنصة والتي تظهر للطلاب
            </p>
          </div>
          <Link href="/admin/courses/new" style={{
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
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <p style={{ color: '#999', fontSize: '16px', fontWeight: 600 }}>⏳ جاري التحميل...</p>
          </div>
        ) : courses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fafafa', borderRadius: '16px' }}>
            <div style={{ fontSize: '50px', marginBottom: '10px' }}>📚</div>
            <p style={{ color: '#888', fontSize: '16px', fontWeight: 700, marginBottom: '15px' }}>لا توجد كورسات مضافة حالياً</p>
            <Link href="/admin/courses/new" style={{
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
              أضف أول كورس حقيقي
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '25px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {courses.map((c: any) => (
              <div key={c.id} style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '30px 20px',
                boxShadow: '0 8px 25px rgba(139, 26, 58, 0.05)',
                border: '2px solid #ffffff',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                position: 'relative',
                overflow: 'hidden',
                boxSizing: 'border-box',
                transition: 'transform 0.3s'
              }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'none'}>
                
                {/* Course Image */}
                {c.imageUrl ? (
                  <div style={{ width: '100%', height: '150px', borderRadius: '12px', overflow: 'hidden', marginBottom: '5px' }}>
                    <img src={c.imageUrl} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ) : (
                  <div style={{
                    width: '100%',
                    height: '150px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #1B2B6B 0%, #8B1A3A 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '40px',
                    marginBottom: '5px'
                  }}>
                    📚
                  </div>
                )}

                {/* Course Title */}
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 900,
                  color: '#1B2B6B',
                  margin: 0,
                  textAlign: 'center'
                }}>{c.name}</h3>

                {/* Badges for Info */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {c.country && (
                    <span style={{
                      background: '#fdf8f9',
                      border: '1px solid rgba(139, 26, 58, 0.1)',
                      color: '#8B1A3A',
                      padding: '3px 10px',
                      borderRadius: '50px',
                      fontSize: '11px',
                      fontWeight: 700
                    }}>
                      {countryNames[c.country as keyof typeof countryNames] || c.country}
                    </span>
                  )}
                  <span style={{
                    background: '#f8f9ff',
                    border: '1px solid rgba(27, 43, 107, 0.1)',
                    color: '#1B2B6B',
                    padding: '3px 10px',
                    borderRadius: '50px',
                    fontSize: '11px',
                    fontWeight: 700
                  }}>
                    الصف {c.gradeLevel}
                  </span>
                  <span style={{
                    background: '#f0faf1',
                    border: '1px solid rgba(39, 174, 96, 0.1)',
                    color: '#27ae60',
                    padding: '3px 10px',
                    borderRadius: '50px',
                    fontSize: '11px',
                    fontWeight: 700
                  }}>
                    {c.subject || 'عام'}
                  </span>
                </div>

                {/* Description */}
                {c.description && (
                  <p style={{
                    fontSize: '13px',
                    color: '#666',
                    fontWeight: 600,
                    margin: 0,
                    textAlign: 'center',
                    lineHeight: '1.5',
                    minHeight: '38px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>{c.description}</p>
                )}

                {/* Price */}
                <div style={{
                  margin: '5px 0',
                  textAlign: 'center'
                }}>
                  <span style={{ fontSize: '32px', fontWeight: 900, color: '#8B1A3A' }}>{c.price}</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#1B2B6B', marginRight: '5px' }}>درهم</span>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                  <Link href={`/admin/courses/edit/${c.slug}`} style={{
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
      </main>
    </div>
  )
}