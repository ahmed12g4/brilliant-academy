'use client'
import Link from 'next/link'

export default function AdminPage() {
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
            style={{ height: '45px', width: 'auto' }}
          />
          <span style={{ color: '#1B2B6B', fontSize: '18px', fontWeight: 800 }}>
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
          <h1 style={{ color: '#1B2B6B', fontWeight: 900, marginBottom: '8px', fontSize: '28px' }}>
            أهلاً بك في لوحة التحكم
          </h1>
          <p style={{ color: '#666', fontWeight: 600, marginBottom: '35px', fontSize: '15px' }}>
            أنزل إدِر كورساتك وأنشئ روابط دفع مخصصة
          </p>

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Link href="/admin/courses">
              <a style={{
                padding: '18px 32px',
                background: '#1B2B6B',
                color: '#fff',
                borderRadius: '14px',
                fontWeight: 800,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '16px',
                transition: 'background 0.3s',
                boxShadow: '0 4px 15px rgba(27,43,107,0.15)'
              }}>
                📚 إدارة الكورسات
              </a>
            </Link>
            <Link href="/admin/courses/new">
              <a style={{
                padding: '18px 32px',
                background: '#8B1A3A',
                color: '#fff',
                borderRadius: '14px',
                fontWeight: 800,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '16px',
                transition: 'background 0.3s',
                boxShadow: '0 4px 15px rgba(139,26,58,0.15)'
              }}>
                ➕ إضافة كورس جديد
              </a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}