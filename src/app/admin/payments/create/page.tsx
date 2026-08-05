'use client'

import { useState } from 'react'

export default function CreatePaymentLinkPage() {
  const [formData, setFormData] = useState({
    course_name: '',
    price_aed: '',
    currency: 'aed',
    description: '',
    grade: '',
    subject: '',
    country: '',
    expires_in_hours: '24'
  })

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    checkout_url: string
    product_id: string
    price_id: string
    expires_at: number
    expires_in_hours: number | null
    course_name: string
    price_aed: number
    currency: string
  } | null>(null)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: 'success' | 'error' }>({
    visible: false,
    message: '',
    type: 'success'
  })

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setToast({ visible: true, message: 'تم نسخ الرابط!', type: 'success' })
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 2500)
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}
    if (!formData.course_name.trim()) errors.course_name = 'اسم الكورس مطلوب'
    if (!formData.price_aed || parseFloat(formData.price_aed) <= 0) errors.price_aed = 'السعر مطلوب ويجب أن يكون أكبر من صفر'
    if (!formData.country) errors.country = 'اختر البلد'
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/admin/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price_aed: parseFloat(formData.price_aed),
          expires_in_hours: parseInt(formData.expires_in_hours)
        })
      })

      const data = await response.json()

      if (data.success) {
        setResult(data)
      } else {
        setError(data.error || 'حدث خطأ أثناء إنشاء رابط الدفع')
      }
    } catch (err) {
      setError('حدث خطأ أثناء إنشاء رابط الدفع')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const formatExpiry = (hours: number | null) => {
    if (hours === null) return 'دائم'
    if (hours < 24) return `${hours} ساعة`
    const days = Math.floor(hours / 24)
    const remainingHours = hours % 24
    if (remainingHours === 0) return `${days} يوم`
    return `${days} يوم و ${remainingHours} ساعة`
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f0f2f5',
      fontFamily: 'Cairo',
      direction: 'rtl',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '640px',
        margin: '0 auto'
      }}>

        {/* Compact Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px',
          padding: '16px 20px',
          background: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <img
            src="https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69afadb7c509a0bfb75719bb.png"
            alt="Brilliant Academy"
            style={{ height: '36px', width: 'auto', flexShrink: 0 }}
          />
          <div>
            <h1 style={{
              color: '#1B2B6B',
              fontWeight: 900,
              fontSize: '18px',
              margin: 0,
              lineHeight: 1.2
            }}>
              إنشاء رابط دفع جديد
            </h1>
            <p style={{
              color: '#888',
              fontSize: '12px',
              margin: '2px 0 0',
              fontWeight: 500
            }}>
              أنشئ رابط دفع لطلابك — سيتم إنشاء منتج وسعر دائمين في Stripe
            </p>
          </div>
        </div>

        {/* Single Form Card */}
        <form onSubmit={handleSubmit} style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>

          {/* Row: Course Name + Price */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 700, color: '#374151', fontSize: '13px' }}>
                اسم المنتج/الكورس <span style={{ color: '#e11d48' }}>*</span>
              </label>
              <input
                type="text"
                value={formData.course_name}
                onChange={(e) => handleInputChange('course_name', e.target.value)}
                placeholder="مثال: رياضيات - الصف الخامس"
                required
                style={inputStyle}
              />
              {fieldErrors.course_name && <span style={errorText}>{fieldErrors.course_name}</span>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 700, color: '#374151', fontSize: '13px' }}>
                  السعر (AED) <span style={{ color: '#e11d48' }}>*</span>
                </label>
                <input
                  type="number"
                  value={formData.price_aed}
                  onChange={(e) => handleInputChange('price_aed', e.target.value)}
                  placeholder="0.00"
                  required
                  step="0.01"
                  min="0.01"
                  style={inputStyle}
                />
                {fieldErrors.price_aed && <span style={errorText}>{fieldErrors.price_aed}</span>}
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 700, color: '#374151', fontSize: '13px' }}>
                  البلد <span style={{ color: '#e11d48' }}>*</span>
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  style={selectStyle}
                >
                  <option value="">اختر البلد</option>
                  <option value="UAE">🇦🇪 الإمارات</option>
                  <option value="Kuwait">🇰🇼 الكويت</option>
                  <option value="Qatar">🇶🇦 قطر</option>
                  <option value="KSA">🇸🇦 السعودية</option>
                </select>
                {fieldErrors.country && <span style={errorText}>{fieldErrors.country}</span>}
              </div>
            </div>
          </div>

          {/* Row: Grade + Subject + Expiry */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 700, color: '#374151', fontSize: '13px' }}>
                  الصف الدراسي
                </label>
                <input
                  type="text"
                  value={formData.grade}
                  onChange={(e) => handleInputChange('grade', e.target.value)}
                  placeholder="مثال: الصف الخامس"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 700, color: '#374151', fontSize: '13px' }}>
                  المادة
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="مثال: الرياضيات"
                  style={inputStyle}
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 700, color: '#374151', fontSize: '13px' }}>
                مدة صلاحية الرابط
              </label>
              <select
                value={formData.expires_in_hours}
                onChange={(e) => handleInputChange('expires_in_hours', e.target.value)}
                style={selectStyle}
              >
                <option value="1">ساعة واحدة</option>
                <option value="6">6 ساعات</option>
                <option value="12">12 ساعة</option>
                <option value="24">يوم واحد (24 ساعة)</option>
                <option value="48">يومان (48 ساعة)</option>
                <option value="72">3 أيام (72 ساعة)</option>
                <option value="168">أسبوع واحد (168 ساعة)</option>
                <option value="720">شهر واحد (720 ساعة)</option>
                <option value="0">دائم (لا ينتهي)</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 700, color: '#374151', fontSize: '13px' }}>
              الوصف (اختياري)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="وصف تفصيلي للكورس أو المنتج..."
              rows={2}
              style={{ ...inputStyle, resize: 'vertical' as const, minHeight: '60px', lineHeight: 1.6 }}
            />
          </div>

          {/* Submit Button */}
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
              gap: '10px',
              marginTop: '4px'
            }}
          >
            {loading ? (
              <>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
                  <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2" strokeDasharray="40" strokeDashoffset="10"/>
                </svg>
                جاري الإنشاء...
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 10h6m0 0l-3-3m3 3l-3 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                إنشاء رابط الدفع
              </>
            )}
          </button>
        </form>

        {/* Error Alert */}
        {error && (
          <div style={{
            marginTop: '16px',
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

        {/* Success Result - Compact Card */}
        {result && (
          <div style={{
            marginTop: '20px',
            background: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            border: '2px solid #22c55e'
          }}>
            {/* Success Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#f0fdf4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="8" fill="#22c55e"/>
                  <path d="M7 10l3 3 5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 style={{ color: '#166534', fontWeight: 900, fontSize: '17px', margin: 0 }}>
                  تم إنشاء رابط الدفع بنجاح!
                </h3>
                <p style={{ color: '#888', fontSize: '12px', margin: '2px 0 0', fontWeight: 500 }}>
                  رابط الدفع جاهز — انسخه وأرسله للطالب
                </p>
              </div>
            </div>

            {/* Prominent Link Box */}
            <div style={{
              padding: '16px',
              background: '#fefce8',
              borderRadius: '12px',
              border: '2px solid #fde047',
              marginBottom: '16px',
              cursor: 'pointer'
            }} onClick={() => { copyToClipboard(result.checkout_url) }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '8px'
              }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M10 6H6a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2V8a2 2 0 00-2-2z" stroke="#ca8a04" strokeWidth="1.5"/>
                  <circle cx="11" cy="5" r="1.5" fill="#ca8a04"/>
                </svg>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#a16207', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  رابط الدفع
                </span>
              </div>
              <code style={{
                fontSize: '13px',
                wordBreak: 'break-all',
                color: '#1B2B6B',
                fontWeight: 600,
                direction: 'ltr',
                display: 'block',
                lineHeight: 1.5
              }}>
                {result.checkout_url}
              </code>
              <div style={{
                marginTop: '8px',
                fontSize: '11px',
                color: '#a16207',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M10 6H6a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2V8a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="11" cy="5" r="1.5" fill="currentColor"/>
                </svg>
                اضغط هنا لنسخ الرابط
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => { copyToClipboard(result.checkout_url) }}
                style={{
                  flex: '1',
                  minWidth: '120px',
                  padding: '10px 16px',
                  background: '#22c55e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 700,
                  fontFamily: 'Cairo',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="white" strokeWidth="1.5"/>
                  <path d="M3 11V3a1.5 1.5 0 011.5-1.5H11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                نسخ الرابط
              </button>
              <a
                href={result.checkout_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: '1',
                  minWidth: '120px',
                  padding: '10px 16px',
                  background: 'linear-gradient(135deg, #8B1A3A 0%, #c0392b 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 700,
                  fontFamily: 'Cairo',
                  textAlign: 'center',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 2L2 6h4M2 6v6a1 1 0 001 1h8a1 1 0 001-1V6h4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 14h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                اختبار الرابط
              </a>
            </div>

            {/* Details Grid - Compact */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              marginTop: '16px'
            }}>
              <div style={{
                padding: '12px',
                background: '#f9fafb',
                borderRadius: '10px',
                border: '1px solid #f3f4f6'
              }}>
                <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px' }}>المبلغ</span>
                <p style={{ margin: '4px 0 0', fontSize: '15px', fontWeight: 800, color: '#1B2B6B' }}>
                  {result.price_aed} {result.currency?.toUpperCase()}
                </p>
              </div>
              <div style={{
                padding: '12px',
                background: '#f9fafb',
                borderRadius: '10px',
                border: '1px solid #f3f4f6'
              }}>
                <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px' }}>الصلاحية</span>
                <p style={{ margin: '4px 0 0', fontSize: '13px', fontWeight: 700, color: result.expires_at > 0 ? '#166534' : '#e11d48' }}>
                  {formatExpiry(result.expires_in_hours)}
                </p>
              </div>
              <div style={{
                padding: '12px',
                background: '#f9fafb',
                borderRadius: '10px',
                border: '1px solid #f3f4f6',
                gridColumn: '1 / -1'
              }}>
                <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px' }}>الكورس</span>
                <p style={{ margin: '4px 0 0', fontSize: '14px', fontWeight: 700, color: '#1B2B6B' }}>
                  {result.course_name}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {toast.visible && (
          <div style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '12px 24px',
            background: toast.type === 'success' ? '#166534' : '#dc2626',
            color: '#ffffff',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 700,
            fontFamily: 'Cairo',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'toastIn 0.3s ease-out'
          }}>
            {toast.type === 'success' ? (
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" fill="white" opacity="0.2"/>
                <path d="M6 10l3 3 5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" fill="white" opacity="0.2"/>
                <path d="M7 7l6 6M13 7l-6 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
            {toast.message}
          </div>
        )}

        {/* Footer */}
        <div style={{
          marginTop: '20px',
          padding: '12px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#c0c4cc', fontSize: '12px', margin: 0 }}>
            © {new Date().getFullYear()} أكاديمية بريلينت
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @media (min-width: 640px) {
          div[style*="gridTemplateColumns: '1fr'"] {
            gridTemplateColumns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '10px',
  border: '2px solid #e5e7eb',
  fontSize: '14px',
  fontWeight: 500,
  color: '#1B2B6B',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  fontFamily: 'Cairo',
  boxSizing: 'border-box' as const,
  background: '#fff'
}

const selectStyle = {
  ...inputStyle,
  cursor: 'pointer',
  appearance: 'none' as const,
  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E\")",
  backgroundPosition: 'left 12px center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '16px',
  paddingRight: '40px',
  paddingLeft: '14px'
}

const errorText = {
  color: '#e11d48',
  fontSize: '12px',
  fontWeight: 500,
  marginTop: '4px',
  display: 'block'
}