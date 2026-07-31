'use client'
import Link from 'next/link'

export default function AdminPage() {
  return (
    <div style={{
      fontFamily: 'Cairo',
      direction: 'rtl',
      minHeight: '100vh',
      background: '#f5f5f5',
      padding: '40px 5vw'
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        background: '#ffffff',
        borderRadius: '24px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
        overflow: 'hidden'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #1B2B6B 0%, #2a3a8c 50%, #8B1A3A 100%)',
          padding: '35px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img
              src="https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69afadb7c509a0bfb75719bb.png"
              alt="Logo"
              style={{ height: '50px', width: 'auto' }}
            />
            <div>
              <h1 style={{ color: '#ffffff', fontWeight: 900, margin: 0, fontSize: '22px' }}>
                لوحة تحكم أكاديمية بريلينت
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', margin: '3px 0 0', fontSize: '13px', fontWeight: 600 }}>
                أنزل الإدارة الكاملة للمنصة
              </p>
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
                padding: '10px 24px',
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
        <div style={{ padding: '35px 40px' }}>
          <h2 style={{ color: '#1B2B6B', fontWeight: 900, marginBottom: '5px', fontSize: '20px' }}>
            أهلاً بك في لوحة التحكم
          </h2>
          <p style={{ color: '#666', fontSize: '14px', fontWeight: 600, marginBottom: '30px' }}>
            أنزل إدِر كورساتك وأنشئ روابط دفع مخصصة للطلاب
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <Link href="/admin/courses">
              <a style={{
                display: 'block',
                padding: '24px',
                background: 'linear-gradient(135deg, #1B2B6B 0%, #2a3a8c 100%)',
                color: '#fff',
                borderRadius: '16px',
                textDecoration: 'none',
                textAlign: 'center',
                boxShadow: '0 8px 25px rgba(27,43,107,0.15)',
                transition: 'transform 0.3s'
              }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>📚</div>
                <div style={{ fontWeight: 800, fontSize: '16px' }}>إدارة الكورسات</div>
                <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '5px', fontWeight: 600 }}>عرض وتعديل وحذف</div>
              </a>
            </Link>
            <Link href="/admin/courses/new">
              <a style={{
                display: 'block',
                padding: '24px',
                background: 'linear-gradient(135deg, #8B1A3A 0%, #c0392b 100%)',
                color: '#fff',
                borderRadius: '16px',
                textDecoration: 'none',
                textAlign: 'center',
                boxShadow: '0 8px 25px rgba(139,26,58,0.15)',
                transition: 'transform 0.3s'
              }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>➕</div>
                <div style={{ fontWeight: 800, fontSize: '16px' }}>إضافة كورس جديد</div>
                <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '5px', fontWeight: 600 }}>إنشاء كورس وإدارة الأسعار</div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}