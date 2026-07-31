'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })
    const data = await res.json()
    if (data.success) {
      router.push('/admin')
    } else {
      setError('كلمة المرور غير صحيحة')
    }
    setLoading(false)
  }

  return (
    <div style={{
      fontFamily: 'Cairo',
      direction: 'rtl',
      minHeight: '100vh',
      background: '#f5f5f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '24px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
        width: '100%',
        maxWidth: '400px',
        overflow: 'hidden'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #1B2B6B 0%, #2a3a8c 50%, #8B1A3A 100%)',
          padding: '40px 30px',
          textAlign: 'center'
        }}>
          <img
            src="https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69afadb7c509a0bfb75719bb.png"
            alt="Brilliant Academy"
            style={{ height: '60px', width: 'auto', marginBottom: '15px' }}
          />
          <h2 style={{ color: '#ffffff', fontWeight: 900, margin: 0, fontSize: '20px' }}>
            أكاديمية بريلينت
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', margin: '5px 0 0', fontSize: '13px', fontWeight: 600 }}>
            لوحة تحكم الإدارة
          </p>
        </div>
        <div style={{ padding: '30px' }}>
          <h3 style={{ color: '#1B2B6B', fontWeight: 900, marginBottom: '5px', textAlign: 'center', fontSize: '18px' }}>
            تسجيل الدخول
          </h3>
          <p style={{ color: '#888', textAlign: 'center', fontSize: '13px', marginBottom: '25px', fontWeight: 600 }}>
            أدخل كلمة المرور للوصول للوحة التحكم
          </p>
          {error && (
            <div style={{
              background: '#fff0f0',
              color: '#d32f2f',
              padding: '12px 16px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 700, color: '#1B2B6B', fontSize: '14px' }}>
                كلمة المرور
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="أدخل كلمة المرور"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: '2px solid #eee',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#1B2B6B',
                  textAlign: 'center',
                  fontFamily: 'Cairo',
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#8B1A3A'}
                onBlur={(e) => e.target.style.borderColor = '#eee'}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '16px',
                background: loading ? '#ccc' : 'linear-gradient(135deg, #8B1A3A 0%, #c0392b 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50px',
                fontSize: '17px',
                fontWeight: 800,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'Cairo',
                boxShadow: '0 4px 15px rgba(139,26,58,0.3)',
                transition: 'opacity 0.3s'
              }}
            >
              {loading ? '⏳ جاري التحقق...' : 'دخول ←'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}