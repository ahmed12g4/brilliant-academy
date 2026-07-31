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
    <div style={{ fontFamily: 'Cairo', direction: 'rtl', minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={{ background: '#ffffff', borderBottom: '3px solid #8B1A3A', padding: '15px 40px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69afadb7c509a0bfb75719bb.png" alt="Logo" style={{ height: '40px', width: 'auto' }} />
          <span style={{ color: '#1B2B6B', fontWeight: 800, fontSize: '16px' }}>لوحة التحكم</span>
        </div>
      </header>
      <main style={{ padding: '60px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#fff', borderRadius: '20px', padding: '40px 30px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', width: '100%', maxWidth: '380px', textAlign: 'center' }}>
          <h2 style={{ color: '#1B2B6B', fontWeight: 900, marginBottom: '20px', fontSize: '20px' }}>تسجيل دخول الإدارة</h2>
          {error && <p style={{ color: '#d32f2f', marginBottom: '15px', fontSize: '14px' }}>{error}</p>}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="كلمة المرور" style={{ padding: '14px 16px', borderRadius: '12px', border: '2px solid #eee', fontSize: '16px', fontWeight: 600, color: '#1B2B6B', textAlign: 'center', fontFamily: 'Cairo' }} />
            <button type="submit" style={{ padding: '16px', background: '#8B1A3A', color: '#fff', border: 'none', borderRadius: '50px', fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Cairo' }}>دخول</button>
          </form>
        </div>
      </main>
    </div>
  )
}