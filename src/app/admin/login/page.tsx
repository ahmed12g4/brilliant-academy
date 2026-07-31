'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })
    const data = await res.json()
    if (data.success) {
      router.push('/admin')
    } else {
      setError('خطأ في كلمة المرور')
    }
  }

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
        justifyContent: 'center',
        gap: '15px',
        boxShadow: '0 4px 18px rgba(0,0,0,0.12)'
      }}>
        <img
          src="https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69afadb7c509a0bfb75719bb.png"
          alt="Brilliant Academy Logo"
          style={{ height: '50px', width: 'auto' }}
        />
        <span style={{ color: '#fff', fontSize: '20px', fontWeight: 800 }}>
          لوحة تحكم الأكاديمية بريلينت
        </span>
      </header>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px'
      }}>
        <div style={{
          background: '#fff',
          borderRadius: '18px',
          padding: '40px 30px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
          width: '100%',
          maxWidth: '380px',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#1B2B6B', fontWeight: 900, marginBottom: '20px' }}>
            تسجيل دخول الإدارة
          </h2>
          {error && <p style={{ color: '#d32f2f', marginBottom: '15px' }}>{error}</p>}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="كلمة المرور"
              style={{
                padding: '14px 16px',
                borderRadius: '12px',
                border: '2px solid #eee',
                fontSize: '16px',
                fontWeight: 600,
                color: '#1B2B6B',
                textAlign: 'center'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '16px',
                background: '#8B1A3A',
                color: '#fff',
                border: 'none',
                borderRadius: '50px',
                fontSize: '18px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              دخول
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}