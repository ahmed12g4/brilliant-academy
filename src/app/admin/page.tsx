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

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f0f2f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Cairo',
      direction: 'rtl',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: '#ffffff',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
        overflow: 'hidden'
      }}>
        {/* Top accent bar */}
        <div style={{
          height: '4px',
          background: 'linear-gradient(90deg, #1B2B6B, #8B1A3A)',
          width: '100%'
        }} />

        {/* Content */}
        <div style={{ padding: '40px 32px' }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #1B2B6B 0%, #8B1A3A 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 4px 16px rgba(27,43,107,0.2)'
            }}>
              <img
                src="https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69afadb7c509a0bfb75719bb.png"
                alt="Brilliant Academy"
                style={{ height: '40px', width: 'auto' }}
              />
            </div>
            <h1 style={{
              color: '#1B2B6B',
              fontWeight: 900,
              fontSize: '22px',
              margin: '0 0 6px',
              letterSpacing: '-0.3px'
            }}>
              أكاديمية بريلينت
            </h1>
            <p style={{
              color: '#888',
              fontSize: '13px',
              margin: 0,
              fontWeight: 500
            }}>
              تسجيل الدخول للوحة التحكم
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 700,
                color: '#374151',
                fontSize: '14px'
              }}>
                كلمة المرور
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '18px',
                  opacity: 0.4
                }}>
                  🔒
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  required
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '14px 44px 14px 16px',
                    borderRadius: '12px',
                    border: '2px solid #e5e7eb',
                    fontSize: '15px',
                    fontWeight: 500,
                    color: '#1B2B6B',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    fontFamily: 'Cairo',
                    boxSizing: 'border-box',
                    background: '#fafafa'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#8B1A3A'
                    e.target.style.boxShadow = '0 0 0 3px rgba(139,26,58,0.1)'
                    e.target.style.background = '#fff'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb'
                    e.target.style.boxShadow = 'none'
                    e.target.style.background = '#fafafa'
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '16px',
                background: loading ? '#9ca3af' : 'linear-gradient(135deg, #8B1A3A 0%, #c0392b 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 800,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'Cairo',
                boxShadow: loading ? 'none' : '0 4px 12px rgba(139,26,58,0.3)',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {loading ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
                    <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2" strokeDasharray="40" strokeDashoffset="10" />
                  </svg>
                  جاري التحقق...
                </>
              ) : (
                'دخول ←'
              )}
            </button>

            {error && (
              <div style={{
                padding: '12px 16px',
                background: '#fef2f2',
                color: '#dc2626',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 600,
                textAlign: 'center',
                border: '1px solid #fecaca'
              }}>
                {error}
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 32px',
          background: '#f9fafb',
          borderTop: '1px solid #f3f4f6',
          textAlign: 'center'
        }}>
          <p style={{
            color: '#9ca3af',
            fontSize: '12px',
            margin: 0,
            fontWeight: 500
          }}>
            © {new Date().getFullYear()} أكاديمية بريلينت
          </p>
        </div>
      </div>

      {/* Spin animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}