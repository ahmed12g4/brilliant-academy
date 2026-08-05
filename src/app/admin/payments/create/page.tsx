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
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)
    
    try {
      const response = await fetch('/api/admin/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('تم نسخ الرابط!')
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f8fafc',
      fontFamily: 'Cairo',
      direction: 'rtl'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ 
          background: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
          padding: '40px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <img 
              src="https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69afadb7c509a0bfb75719bb.png"
              alt="Brilliant Academy"
              style={{ height: '50px', marginBottom: '15px' }}
            />
            <h1 style={{ color: '#1B2B6B', fontWeight: 900, fontSize: '24px', margin: 0 }}>
              إنشاء رابط دفع جديد
            </h1>
            <p style={{ color: '#666', fontSize: '14px', margin: '10px 0 0' }}>
              أنشئ رابط دفع لطلابك - سيتم إنشاء منتج وسعر دائمين في شريطـStripe
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, color: '#1B2B6B' }}>
                  اسم المنتج/الكورس *
                </label>
                <input
                  type="text"
                  value={formData.course_name}
                  onChange={(e) => setFormData({...formData, course_name: e.target.value})}
                  placeholder="مثل: رياضيات - الصف الخامس"
                  required
                  style={inputStyle}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, color: '#1B2B6B' }}>
                  السعر (AED) *
                </label>
                <input
                  type="number"
                  value={formData.price_aed}
                  onChange={(e) => setFormData({...formData, price_aed: e.target.value})}
                  placeholder="0"
                  required
                  step="0.01"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, color: '#1B2B6B' }}>
                  الصف الدراسي
                </label>
                <input
                  type="text"
                  value={formData.grade}
                  onChange={(e) => setFormData({...formData, grade: e.target.value})}
                  placeholder="مثل: الصف الخامس"
                  style={inputStyle}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, color: '#1B2B6B' }}>
                  المادة
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  placeholder="مثل: الرياضيات"
                  style={inputStyle}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, color: '#1B2B6B' }}>
                  البلد
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                  style={inputStyle}
                >
                  <option value="">اختر البلد</option>
                  <option value="UAE">الإمارات</option>
                  <option value="Kuwait">الكويت</option>
                  <option value="Qatar">قطر</option>
                  <option value="KSA">المملكة العربية السعودية</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, color: '#1B2B6B' }}>
                الوصف
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="وصف تفصيلي للكورس أو المنتج"
                rows={3}
                style={{...inputStyle, resize: 'vertical', minHeight: '80px'}}
              />
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '14px',
                  background: loading ? '#ccc' : 'linear-gradient(135deg, #8B1A3A 0%, #c0392b 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'opacity 0.3s'
                }}
              >
                {loading ? '⏳ جاري الإنشاء...' : 'إنشاء رابط الدفع ←'}
              </button>
            </div>
          </form>

          {error && (
            <div style={{
              marginTop: '20px',
              padding: '15px',
              background: '#fff0f0',
              color: '#d32f2f',
              borderRadius: '12px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          {result && (
            <div style={{
              marginTop: '30px',
              padding: '25px',
              background: '#f0f9f0',
              border: '2px solid #27ae60',
              borderRadius: '16px'
            }}>
              <h3 style={{ color: '#27ae60', fontWeight: 900, margin: '0 0 15px', fontSize: '18px' }}>
                ✅ تم إنشاء رابط الدفع بنجاح!
              </h3>
              
              <div style={{ marginBottom: '15px' }}>
                <strong>رابط الدفع:</strong>
                <div style={{
                  marginTop: '8px',
                  padding: '12px',
                  background: '#ffffff',
                  borderRadius: '10px',
                  wordBreak: 'break-all',
                  fontSize: '13px'
                }}>
                  {result.checkout_url}
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(result.checkout_url)}
                  style={{
                    marginTop: '8px',
                    padding: '6px 12px',
                    background: '#27ae60',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 600
                  }}
                >
                  نسخ الرابط
                </button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                <div>
                  <strong>معرف المنتج في شريطـStripe:</strong>
                  <div style={{ fontSize: '13px', color: '#666', marginTop: '5px' }}>{result.product_id}</div>
                </div>
                <div>
                  <strong>معرف السعر في شريطـStripe:</strong>
                  <div style={{ fontSize: '13px', color: '#666', marginTop: '5px' }}>{result.price_id}</div>
                </div>
              </div>
              
              <div style={{ marginTop: '15px', padding: '10px', background: '#e8f5e8', borderRadius: '8px', fontSize: '13px' }}>
                <strong>تفاصيل الكورس:</strong> {result.course_name}<br/>
                <strong>السعر:</strong> {result.price_aed} {result.currency?.toUpperCase()}<br/>
                <strong>صالح لمدة:</strong> حتى {new Date(result.expires_at * 1000).toLocaleString('ar-SA')}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const inputStyle = {
  padding: '12px 16px',
  borderRadius: '10px',
  border: '2px solid #e0e0e0',
  fontSize: '14px',
  fontWeight: 600,
  color: '#1B2B6B',
  outline: 'none',
  transition: 'border-color 0.3s',
  fontFamily: 'Cairo'
}