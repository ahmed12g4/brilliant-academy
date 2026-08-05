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
    expires_in_hours: number
    course_name: string
    price_aed: number
    currency: string
  } | null>(null)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

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

  const formatExpiry = (hours: number) => {
    if (hours < 24) return `${hours} ساعة`
    const days = Math.floor(hours / 24)
    const remainingHours = hours % 24
    if (remainingHours === 0) return `${days} يوم`
    return `${days} يوم و ${remainingHours} ساعة`
  }

  return (
    <div style={pageContainer}>
      <div style={pageInner}>
        {/* Header */}
        <div style={headerSection}>
          <div style={logoRow}>
            <div style={logoCircle}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L20 10H28L22 16L24 24L16 19L8 24L10 16L4 10H12L16 2Z" fill="#8B1A3A"/>
              </svg>
            </div>
            <div>
              <h1 style={headerTitle}>إنشاء رابط دفع جديد</h1>
              <p style={headerSub}>أنشئ رابط دفع لطلابك — سيتم إنشاء منتج وسعر دائمين في Stripe</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={formGrid}>
          {/* Section: Basic Info */}
          <div style={sectionCard}>
            <div style={sectionHeader}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" stroke="#8B1A3A" strokeWidth="1.5"/><path d="M2 8h16" stroke="#8B1A3A" strokeWidth="1.5"/><circle cx="6" cy="13" r="1.5" fill="#8B1A3A"/></svg>
              <h2 style={sectionTitle}>المعلومات الأساسية</h2>
            </div>
            <div style={fieldGrid2}>
              <div style={fieldGroup}>
                <label style={labelStyle}>اسم المنتج/الكورس <span style={star}>*</span></label>
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
              <div style={fieldGroup}>
                <label style={labelStyle}>السعر (AED) <span style={star}>*</span></label>
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
            </div>
          </div>

          {/* Section: Details */}
          <div style={sectionCard}>
            <div style={sectionHeader}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#8B1A3A" strokeWidth="1.5"/><path d="M10 6v4l3 2" stroke="#8B1A3A" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <h2 style={sectionTitle}>التفاصيل</h2>
            </div>
            <div style={fieldGrid3}>
              <div style={fieldGroup}>
                <label style={labelStyle}>الصف الدراسي</label>
                <input
                  type="text"
                  value={formData.grade}
                  onChange={(e) => handleInputChange('grade', e.target.value)}
                  placeholder="مثال: الصف الخامس"
                  style={inputStyle}
                />
              </div>
              <div style={fieldGroup}>
                <label style={labelStyle}>المادة</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="مثال: الرياضيات"
                  style={inputStyle}
                />
              </div>
              <div style={fieldGroup}>
                <label style={labelStyle}>البلد <span style={star}>*</span></label>
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

          {/* Section: Expiration */}
          <div style={sectionCard}>
            <div style={sectionHeader}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#8B1A3A" strokeWidth="1.5"/><path d="M10 5v5l3 3" stroke="#8B1A3A" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <h2 style={sectionTitle}>إعدادات الرابط</h2>
            </div>
            <div style={fieldGroup}>
              <label style={labelStyle}>مدة صلاحية الرابط</label>
              <div style={selectWrapper}>
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
              <p style={helperText}>الرابط سيتوقف عن العمل بعد انتهاء المدة المحددة</p>
            </div>
          </div>

          {/* Section: Description */}
          <div style={sectionCard}>
            <div style={sectionHeader}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h10M3 15h12" stroke="#8B1A3A" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <h2 style={sectionTitle}>الوصف (اختياري)</h2>
            </div>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="وصف تفصيلي للكورس أو المنتج..."
              rows={3}
              style={textareaStyle}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={loading ? { ...submitBtn, opacity: 0.7, cursor: 'not-allowed' } : submitBtn}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
                  <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2" strokeDasharray="40" strokeDashoffset="10"/>
                </svg>
                جاري الإنشاء...
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 10h6m0 0l-3-3m3 3l-3 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                إنشاء رابط الدفع
              </span>
            )}
          </button>
        </form>

        {/* Error Alert */}
        {error && (
          <div style={alertError}>
            <span style={{ fontSize: '18px' }}>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Success Result */}
        {result && (
          <div style={successCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={successIcon}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="12" fill="#22c55e"/>
                  <path d="M9 14l3 3 5-6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 style={successTitle}>✅ تم إنشاء رابط الدفع بنجاح!</h3>
                <p style={successSub}>رابط الدفع جاهز الآن — انسخه وأرسله للطالب</p>
              </div>
            </div>

            {/* Link Box */}
            <div style={linkBox} onClick={() => { navigator.clipboard.writeText(result.checkout_url); alert('تم نسخ الرابط!') }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 6H6a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2V8a2 2 0 00-2-2z" stroke="#8B1A3A" strokeWidth="1.5"/><circle cx="11" cy="5" r="1.5" fill="#8B1A3A"/></svg>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280' }}>رابط الدفع</span>
              </div>
              <code style={{ fontSize: '13px', wordBreak: 'break-all', color: '#1B2B6B' }}>{result.checkout_url}</code>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '16px' }}>
              <button
                onClick={() => { navigator.clipboard.writeText(result.checkout_url); alert('تم نسخ الرابط!') }}
                style={copyBtn}
              >
                📋 نسخ الرابط
              </button>
              <a
                href={result.checkout_url}
                target="_blank"
                rel="noopener noreferrer"
                style={testBtn}
              >
                🧪 اختبار رابط الدفع
              </a>
            </div>

            {/* Details Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '20px' }}>
              <div style={detailBox}>
                <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 500 }}>معرف المنتج</span>
                <code style={{ fontSize: '12px', color: '#1B2B6B', wordBreak: 'break-all' }}>{result.product_id}</code>
              </div>
              <div style={detailBox}>
                <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 500 }}>معرف السعر</span>
                <code style={{ fontSize: '12px', color: '#1B2B6B', wordBreak: 'break-all' }}>{result.price_id}</code>
              </div>
              <div style={detailBox}>
                <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 500 }}>المبلغ</span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#1B2B6B' }}>{result.price_aed} {result.currency?.toUpperCase()}</span>
              </div>
              <div style={detailBox}>
                <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 500 }}>صالح حتى</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: result.expires_at > 0 ? '#166534' : '#e11d48' }}>
                  {result.expires_at > 0 ? formatExpiry(result.expires_in_hours) : 'لا ينتهي'}
                </span>
              </div>
            </div>

            {/* Course Info */}
            <div style={infoBox}>
              <strong style={{ color: '#1B2B6B' }}>الكورس:</strong> {result.course_name}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Styles
const pageContainer = {
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)',
  fontFamily: '"Cairo", system-ui, sans-serif',
  direction: 'rtl' as const,
  padding: '32px 16px'
}

const pageInner = {
  maxWidth: '960px',
  margin: '0 auto'
}

const headerSection = {
  marginBottom: '32px'
}

const logoRow = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '12px'
}

const logoCircle = {
  width: '56px',
  height: '56px',
  borderRadius: '16px',
  background: 'linear-gradient(135deg, #8B1A3A 0%, #c0392b 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 12px rgba(139,26,58,0.3)'
}

const headerTitle = {
  color: '#1B2B6B',
  fontWeight: 900,
  fontSize: '28px',
  margin: 0,
  lineHeight: 1.2
}

const headerSub = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '4px 0 0',
  fontWeight: 500
}

const formGrid = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '20px'
}

const sectionCard = {
  background: '#ffffff',
  borderRadius: '14px',
  padding: '24px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
  border: '1px solid #eef2f7'
}

const sectionHeader = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '20px',
  paddingBottom: '12px',
  borderBottom: '1px solid #f3f4f6'
}

const sectionTitle = {
  color: '#1B2B6B',
  fontWeight: 800,
  fontSize: '17px',
  margin: 0
}

const fieldGrid2 = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '16px',
  '@media (min-width: 640px)': { gridTemplateColumns: '1fr 1fr' }
}

const fieldGrid3 = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '16px',
  '@media (min-width: 640px)': { gridTemplateColumns: '1fr 1fr' },
  '@media (min-width: 1024px)': { gridTemplateColumns: '1fr 1fr 1fr' }
}

const fieldGroup = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '6px'
}

const labelStyle = {
  fontSize: '13px',
  fontWeight: 600,
  color: '#374151'
}

const star = {
  color: '#e11d48',
  marginRight: '2px'
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
  fontFamily: '"Cairo", system-ui, sans-serif',
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
  paddingRight: '40px'
}

const selectWrapper = {
  position: 'relative' as const
}

const textareaStyle = {
  ...inputStyle,
  resize: 'vertical' as const,
  minHeight: '80px',
  lineHeight: 1.6
}

const errorText = {
  color: '#e11d48',
  fontSize: '12px',
  fontWeight: 500
}

const helperText = {
  fontSize: '12px',
  color: '#9ca3af',
  marginTop: '4px'
}

const submitBtn = {
  width: '100%',
  padding: '16px 24px',
  background: 'linear-gradient(135deg, #8B1A3A 0%, #c0392b 100%)',
  color: '#ffffff',
  border: 'none',
  borderRadius: '12px',
  fontSize: '16px',
  fontWeight: 800,
  cursor: 'pointer',
  fontFamily: '"Cairo", system-ui, sans-serif',
  transition: 'transform 0.15s, box-shadow 0.15s',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  boxShadow: '0 4px 12px rgba(139,26,58,0.3)'
}

const alertError = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '14px 18px',
  background: '#fef2f2',
  color: '#e11d48',
  borderRadius: '10px',
  fontSize: '14px',
  fontWeight: 500,
  border: '1px solid #fecaca',
  marginTop: '20px'
}

const successCard = {
  marginTop: '24px',
  padding: '28px',
  background: '#ffffff',
  border: '2px solid #22c55e',
  borderRadius: '14px',
  boxShadow: '0 4px 16px rgba(34,197,94,0.1)'
}

const successIcon = {
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  background: '#f0fdf4',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0
}

const successTitle = {
  color: '#166534',
  fontWeight: 900,
  fontSize: '20px',
  margin: 0
}

const successSub = {
  color: '#6b7280',
  fontSize: '13px',
  margin: '2px 0 0',
  fontWeight: 500
}

const linkBox = {
  padding: '16px',
  background: '#f9fafb',
  borderRadius: '10px',
  border: '1px solid #e5e7eb',
  cursor: 'pointer',
  transition: 'background 0.15s'
}

const copyBtn = {
  flex: '1',
  minWidth: '140px',
  padding: '12px 20px',
  background: '#22c55e',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 700,
  fontFamily: '"Cairo", system-ui, sans-serif',
  transition: 'background 0.15s'
}

const testBtn = {
  flex: '1',
  minWidth: '140px',
  padding: '12px 20px',
  background: 'linear-gradient(135deg, #8B1A3A 0%, #c0392b 100%)',
  color: '#ffffff',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 700,
  fontFamily: '"Cairo", system-ui, sans-serif',
  textDecoration: 'none',
  textAlign: 'center',
  transition: 'transform 0.15s, box-shadow 0.15s'
}

const detailBox = {
  padding: '14px',
  background: '#f9fafb',
  border: '1px solid #e5e7eb',
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '4px'
}

const infoBox = {
  marginTop: '16px',
  padding: '14px 18px',
  background: '#eff6ff',
  border: '1px solid #bfdbfe',
  borderRadius: '10px',
  fontSize: '14px',
  color: '#1e40af',
  lineHeight: 1.8
}