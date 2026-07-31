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
          <h1 style={{ color: '#1B2B6B', fontWeight: 900, marginBottom: '10px' }}>
            لوحة تحكم الأكاديمية بريلينت
          </h1>
          <p style={{ color: '#666', fontWeight: 600, marginBottom: '30px' }}>
            أدرِِ كورساتك وأنشئ روابط دفع مخصصة
          </p>

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Link href="/admin/courses">
              <a style={{
                padding: '16px 24px',
                background: '#8B1A3A',
                color: '#fff',
                borderRadius: '50px',
                fontWeight: 800,
                textDecoration: 'none',
                display: 'inline-block'
              }}>
                إدارة الكورسات
              </a>
            </Link>
            <Link href="/admin/courses/new">
              <a style={{
                padding: '16px 24px',
                background: '#1B2B6B',
                color: '#fff',
                borderRadius: '50px',
                fontWeight: 800,
                textDecoration: 'none',
                display: 'inline-block'
              }}>
                إضافة كورس جديد
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
