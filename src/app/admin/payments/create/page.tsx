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
    country: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ 
    checkout_url: string; 
    product_id: string; 
    price_id: string; 
    expires_at: number; 
    course_name: string; 
    price_aed: number; 
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
          price_aed: parseFloat(formData.price_aed)
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setResult(data)
      } else {
        setError(data.error || 'حدث خطأ أثناء إنشاء رابط الدفع')
      }
    } catch (error) {
      setError('حدث خطأ أثناء إنشاء رابط الدفع')
      console.error('Error:', error)
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

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <img src="https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69afadb7c509a0bfb75719bb.png" alt="Brilliant Academy" style={logoStyle} />
          <h1 style={titleStyle}>إنشاء رابط دفع جديد</h1>
          <p style={subtitleStyle}>أنشئ رابط دفع لطلابك — سيتم إنشاء منتج وسعر دائمين في Stripe</p>
        </div>

        <form onSubmit={handleSubmit} style={formStyle}>
          {/* Row 1: Course Name & Price */}
          <div style={gridStyle2}>
            <Field 
              label="اسم المنتج/الكورس *"
              error={fieldErrors.course_name}
              required
            >
              <input
                type="text"
                value={formData.course_name}
                onChange={(e) => handleInputChange('course_name', e.target.value)}
                placeholder="مثال: رياضيات - الصف الخامس"
                required
                style={inputStyle}
              />
            </Field>
            
            <Field 
              label="السعر (AED) *"
              error={fieldErrors.price_aed}
              required
            >
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
            </Field>
          </div>

          {/* Row 2: Grade, Subject, Country */}
          <div style={gridStyle3}>
            <Field label="الصف الدراسي" error={fieldErrors.grade}>
              <input
                type="text"
                value={formData.grade}
                onChange={(e) => handleInputChange('grade', e.target.value)}
                placeholder="مثال: الصف الخامس"
                style={inputStyle}
              />
            </Field>
            
            <Field label="المادة" error={fieldErrors.subject}>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                placeholder="مثال: الرياضيات"
                style={inputStyle}
              />
            </Field>
            
            <Field label="البلد" error={fieldErrors.country}>
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
            </Field>
          </div>

          {/* Description */}
          <Field label="الوصف">
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="وصف تفصيلي للكورس أو المنتج (اختياري)"
              rows={4}
              style={textareaStyle}
            />
          </Field>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={submitButtonStyle}
          >
            {loading ? (
              <>
                <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
                جاري الإنشاء...
              </>
            ) : (
              'إنشاء رابط الدفع ←'
            )}
          </button>
        </form>

        {error && <Alert type="error">{error}</Alert>}

        {result && (
          <div style={successCardStyle}>
            <h3 style={successTitleStyle}>✅ تم إنشاء رابط الدفع بنجاح!</h3>
            
            <div style={linkContainerStyle}>
              <label style={linkLabelStyle}>رابط الدفع (اضغط للنسخ):</label>
              <div style={linkBoxStyle} onClick={() => navigator.clipboard.writeText(result.checkout_url)} title="اضغط للنسخ">
                {result.checkout_url}
              </div>
              <button 
                onClick={() => { navigator.clipboard.writeText(result.checkout_url); alert('تم نسخ الرابط!') }}
                style={copyButtonStyle}
              >
                📋 نسخ الرابط
              </button>
            </div>

            <div style={detailsGridStyle}>
              <DetailCard label="معرف المنتج في Stripe" value={result.product_id} />
              <DetailCard label="معرف السعر في Stripe" value={result.price_id} />
            </div>

            <div style={infoCardStyle}>
              <strong>تفاصيل الكورس:</strong> {result.course_name}<br/>
              <strong>السعر:</strong> {result.price_aed} {result.currency?.toUpperCase()}<br/>
              <strong>صالح حتى:</strong> {new Date(result.expires_at * 1000).toLocaleString('ar-SA', { 
                year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
              })}
            </div>

            <div style={testLinkStyle}>
              <a 
                href={result.checkout_url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={testLinkButtonStyle}
              >
                🧪 اختبار رابط الدفع (يفتح في تبويب جديد)
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Components
const Field = ({ label, children, error, required }: { 
  label: string; 
  children: React.ReactNode; 
  error?: string; 
  required?: boolean 
}) => (
  <div style={fieldWrapperStyle}>
    <label style={labelStyle}>{label} {required && <span style={requiredStyle}>*</span>}</label>
    <div style={inputWrapperStyle}>{children}</div>
    {error && <span style={errorStyle}>{error}</span>}
  </div>
)

const Alert = ({ type, children }: { type: 'error'; children: React.ReactNode }) => (
  <div style={type === 'error' ? alertErrorStyle : alertSuccessStyle}>{children}</div>
)

const DetailCard = ({ label, value }: { label: string; value: string }) => (
  <div style={detailCardStyle}>
    <span style={detailLabelStyle}>{label}</span>
    <code style={detailValueStyle}>{value}</code>
  </div>
)

// Styles
const containerStyle = {
  minHeight: '100vh',
  background: '#f8fafc',
  fontFamily: '"Cairo", system-ui, sans-serif',
  direction: 'rtl' as const,
  padding: '24px 16px'
}

const cardStyle = {
  maxWidth: '900px',
  margin: '0 auto',
  background: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
  padding: '32px 24px'
}

const headerStyle = {
  textAlign: 'center' as const,
  marginBottom: '32px',
  paddingBottom: '24px',
  borderBottom: '1px solid #eef2f7'
}

const logoStyle = { height: '48px', marginBottom: '16px' }
const titleStyle = { color: '#1B2B6B', fontWeight: 900, fontSize: '28px', margin: '0 0 8px', lineHeight: 1.2 }
const subtitleStyle = { color: '#6b7280', fontSize: '15px', margin: 0, fontWeight: 500 }

const formStyle = { display: 'flex', flexDirection: 'column' as const, gap: '24px' }

const gridStyle2 = { 
  display: 'grid', 
  gap: '20px',
  gridTemplateColumns: '1fr',
  '@media (min-width: 640px)': { gridTemplateColumns: '1fr 1fr' }
}

const gridStyle3 = { 
  display: 'grid', 
  gap: '20px',
  gridTemplateColumns: '1fr',
  '@media (min-width: 640px)': { gridTemplateColumns: '1fr 1fr' },
  '@media (min-width: 1024px)': { gridTemplateColumns: '1fr 1fr 1fr' }
}

const fieldWrapperStyle = { display: 'flex', flexDirection: 'column' as const, gap: '6px' }
const labelStyle = { display: 'block', fontWeight: 600, color: '#1B2B6B', fontSize: '14px' }
const requiredStyle = { color: '#e11d48', marginRight: '4px' }
const inputWrapperStyle = { width: '100%' }
const errorStyle = { color: '#e11d48', fontSize: '12px', fontWeight: 500, marginTop: '4px' }

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: '10px',
  border: '2px solid #e5e7eb',
  fontSize: '15px',
  fontWeight: 600,
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

const textareaStyle = {
  ...inputStyle,
  resize: 'vertical' as const,
  minHeight: '100px',
  lineHeight: 1.6
}

const submitButtonStyle = {
  width: '100%',
  padding: '16px 24px',
  background: 'linear-gradient(135deg, #8B1A3A 0%, #c0392b 100%)',
  color: '#ffffff',
  border: 'none',
  borderRadius: '12px',
  fontSize: '17px',
  fontWeight: 800,
  cursor: 'pointer',
  fontFamily: '"Cairo", system-ui, sans-serif',
  transition: 'transform 0.15s, box-shadow 0.15s',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  marginTop: '8px'
}

const alertErrorStyle = {
  padding: '14px 18px',
  background: '#fef2f2',
  color: '#e11d48',
  borderRadius: '10px',
  fontSize: '14px',
  fontWeight: 500,
  border: '1px solid #fecaca'
}

const alertSuccessStyle = {
  padding: '14px 18px',
  background: '#f0fdf4',
  color: '#166534',
  borderRadius: '10px',
  fontSize: '14px',
  fontWeight: 500,
  border: '1px solid #bbf7d0'
}

const successCardStyle = {
  marginTop: '32px',
  padding: '28px',
  background: '#f0fdf4',
  border: '2px solid #22c55e',
  borderRadius: '14px'
}

const successTitleStyle = { color: '#166534', fontWeight: 900, fontSize: '20px', margin: '0 0 20px' }

const linkContainerStyle = { marginBottom: '20px' }
const linkLabelStyle = { display: 'block', fontWeight: 600, color: '#1B2B6B', fontSize: '14px', marginBottom: '8px' }
const linkBoxStyle = {
  padding: '14px 16px',
  background: '#ffffff',
  borderRadius: '10px',
  wordBreak: 'break-all' as const,
  fontSize: '13px',
  fontFamily: 'monospace',
  color: '#1B2B6B',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  cursor: 'pointer',
  userSelect: 'all' as const,
  transition: 'background 0.15s'
}

const copyButtonStyle = {
  marginTop: '10px',
  padding: '10px 18px',
  background: '#22c55e',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '13px',
  fontWeight: 600,
  fontFamily: '"Cairo", system-ui, sans-serif',
  transition: 'background 0.15s'
}

const detailsGridStyle = {
  display: 'grid',
  gap: '16px',
  marginTop: '20px',
  gridTemplateColumns: '1fr',
  '@media (min-width: 640px)': { gridTemplateColumns: '1fr 1fr' }
}

const detailCardStyle = {
  padding: '16px',
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '10px'
}

const detailLabelStyle = { display: 'block', fontSize: '12px', color: '#6b7280', fontWeight: 500, marginBottom: '6px' }
const detailValueStyle = { fontSize: '13px', color: '#1B2B6B', fontFamily: 'monospace', wordBreak: 'break-all' as const }

const infoCardStyle = {
  marginTop: '20px',
  padding: '18px',
  background: '#eff6ff',
  border: '1px solid #bfdbfe',
  borderRadius: '10px',
  fontSize: '14px',
  color: '#1e40af',
  lineHeight: 1.8
}

const testLinkStyle = { marginTop: '24px', textAlign: 'center' as const }
const testLinkButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '14px 28px',
  background: 'linear-gradient(135deg, #8B1A3A 0%, #c0392b 100%)',
  color: '#ffffff',
  border: 'none',
  borderRadius: '12px',
  fontSize: '16px',
  fontWeight: 700,
  cursor: 'pointer',
  fontFamily: '"Cairo", system-ui, sans-serif',
  textDecoration: 'none',
  transition: 'transform 0.15s, box-shadow 0.15s'
}

export default CreatePaymentLinkPage