'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      
      if (res.ok) {
        router.push('/admin/payments/create')
      } else {
        const data = await res.json()
        setError(data.error || 'كلمة المرور غير صحيحة')
      }
    } catch (error) {
      setError('خطأ في الاتصال')
    } finally {
      setLoading(false)
    }
  }

  const buttonStyle = {
    padding: '16px',
    background: loading ? '#ccc' : 'linear-gradient(135deg, #8B1A3A 0%, #c0392b 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 800,
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    fontFamily: 'Cairo'
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1B2B6B 0%, #8B1A3A 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Cairo',
      direction: 'rtl'
    }}>
      <div style={{ 
        background: '#ffffff',
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
        padding: '50px',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '30px' }}>
          <img 
            src="https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69afadb7c509a0bfb75719bb.png"
            alt="Brilliant Academy"
            style={{ height: '60px', marginBottom: '20px' }}
          />
          <h1 style={{ color: '#1B2B6B', fontWeight: 900, fontSize: '24px', margin: 0 }}>
            لوحة تحكم أكاديمية بريلينت
          </h1>
          <p style={{ color: '#666', fontSize: '14px', margin: '10px 0 0', fontWeight: 600 }}>
            أدخل كلمة المرور للوصول إلى إنشاء رابط الدفع
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ textAlign: 'right' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: 700, 
              color: '#1B2B6B',
              fontSize: '14px'
            }}>
              كلمة المرور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور للوصول"
              required
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={buttonStyle}
          >
            {loading ? '⏳ جاري التحقق...' : 'دخول إلى لوحة التحكم ←'}
          </button>

          {error && (
            <div style={errorStyle}>
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: '12px',
  border: '2px solid #e0e0e0',
  fontSize: '15px',
  fontWeight: 600,
  color: '#1B2B6B',
  outline: 'none',
  transition: 'border-color 0.3s',
  fontFamily: 'Cairo',
  textAlign: 'right' as const
}

const errorStyle = {
  padding: '12px 16px',
  background: '#fff0f0',
  color: '#d32f2f',
  borderRadius: '12px',
  fontSize: '14px',
  fontWeight: 600,
  marginTop: '10px'
}