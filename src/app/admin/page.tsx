'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function AdminPage() {
  const [coursesCount, setCoursesCount] = useState(0)

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch('/api/courses')
        const data = await res.json()
        setCoursesCount(data.length)
      } catch {}
    }
    fetchCourses()
  }, [])

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
              إدارة المنصة بالكامل
            </span>
          </div>
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
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ color: '#1B2B6B', fontWeight: 900, fontSize: '26px', margin: 0 }}>
            أهلاً بك في لوحة التحكم 🎓
          </h1>
          <p style={{ color: '#666', fontSize: '14px', marginTop: '5px', fontWeight: 600 }}>
            إدارة الكورسات والمواد والأسعار في منصة أكاديمية بريلينت
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '35px' }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
            border: '1px solid rgba(27,43,107,0.06)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📚</div>
            <div style={{ fontSize: '30px', fontWeight: 900, color: '#1B2B6B' }}>{coursesCount}</div>
            <div style={{ color: '#888', fontSize: '13px', fontWeight: 600, marginTop: '3px' }}>إجمالي الكورسات</div>
          </div>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
            border: '1px solid rgba(27,43,107,0.06)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📖</div>
            <div style={{ fontSize: '30px', fontWeight: 900, color: '#1B2B6B' }}>15</div>
            <div style={{ color: '#888', fontSize: '13px', fontWeight: 600, marginTop: '3px' }}>عدد المواد</div>
          </div>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
            border: '1px solid rgba(27,43,107,0.06)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>⭐</div>
            <div style={{ fontSize: '30px', fontWeight: 900, color: '#1B2B6B' }}>5</div>
            <div style={{ color: '#888', fontSize: '13px', fontWeight: 600, marginTop: '3px' }}>المراحل الدراسية</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <Link href="/admin/courses">
            <a style={{
              display: 'block',
              background: '#ffffff',
              borderRadius: '18px',
              padding: '28px',
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
              border: '1px solid rgba(27,43,107,0.06)',
              transition: 'transform 0.3s'
            }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>📚</div>
              <h3 style={{ color: '#1B2B6B', fontWeight: 900, margin: '0 0 5px', fontSize: '18px' }}>
                إدارة الكورسات
              </h3>
              <p style={{ color: '#888', fontSize: '13px', margin: 0, fontWeight: 600 }}>
                عرض تعديل وحذف الكورسات الموجودة
              </p>
              <div style={{
                marginTop: '15px',
                padding: '10px 20px',
                background: '#1B2B6B',
                color: '#fff',
                borderRadius: '50px',
                fontSize: '13px',
                fontWeight: 800,
                textAlign: 'center',
                display: 'inline-block'
              }}>
                افتح ←
              </div>
            </a>
          </Link>
          <Link href="/admin/courses/new">
            <a style={{
              display: 'block',
              background: '#ffffff',
              borderRadius: '18px',
              padding: '28px',
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
              border: '1px solid rgba(139,26,58,0.1)',
              transition: 'transform 0.3s'
            }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>➕</div>
              <h3 style={{ color: '#8B1A3A', fontWeight: 900, margin: '0 0 5px', fontSize: '18px' }}>
                إضافة كورس جديد
              </h3>
              <p style={{ color: '#888', fontSize: '13px', margin: 0, fontWeight: 600 }}>
                إنشاء كورس جديد ببيانه وسعره
              </p>
              <div style={{
                marginTop: '15px',
                padding: '10px 20px',
                background: '#8B1A3A',
                color: '#fff',
                borderRadius: '50px',
                fontSize: '13px',
                fontWeight: 800,
                textAlign: 'center',
                display: 'inline-block'
              }}>
                ابدأ ←
              </div>
            </a>
          </Link>
        </div>
      </main>
    </div>
  )
}