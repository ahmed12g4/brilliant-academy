'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const countries = [
  { code: 'Kuwait', name: 'منهج الكويت' },
  { code: 'KSA', name: 'منهج السعودية' },
  { code: 'Qatar', name: 'منهج قطر' },
  { code: 'UAE', name: 'منهج الإمارات' },
]

const subjects = [
  'رياضيات',
  'علوم',
  'لغة عربية',
  'لغة انجليزية',
  'فيزياء',
  'كيمياء',
  'أحياء',
  'جيولوجيا',
  'اجتماعيات',
  'تربية إسلامية',
  'قرآن كـريم',
  'حساب ذهني',
  'لغة فرنسية',
  'تاريخ',
  'جغرافيا',
  'أخرى (مخصص)'
]

export default function PaymentLinksGenerator() {
  const [subject, setSubject] = useState('')
  const [customSubject, setCustomSubject] = useState('')
  const [price, setPrice] = useState('')
  const [country, setCountry] = useState('Kuwait')
  const [grade, setGrade] = useState('1')
  const [generatedLink, setGeneratedLink] = useState('')
  const [copied, setCopied] = useState(false)
  const [siteUrl, setSiteUrl] = useState('')

  useEffect(() => {
    // Get the base URL in the browser
    setSiteUrl(window.location.origin)
  }, [])

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    
    const finalSubject = subject === 'أخرى (مخصص)' ? customSubject : subject
    if (!finalSubject || !price) return

    const params = new URLSearchParams()
    params.set('package', 'custom')
    params.set('price', price)
    params.set('subject', finalSubject)
    params.set('grade', grade)
    params.set('country', country)

    const link = `${siteUrl}/checkout?${params.toString()}`
    setGeneratedLink(link)
    setCopied(false)
  }

  const copyToClipboard = () => {
    if (!generatedLink) return
    navigator.clipboard.writeText(generatedLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getWhatsAppLink = () => {
    const finalSubject = subject === 'أخرى (مخصص)' ? customSubject : subject
    const text = `أهلاً بك، تم إنشاء رابط الدفع الخاص بك لـ (${finalSubject}) بقيمة (${price} درهم):\n\n${generatedLink}\n\nيرجى فتح الرابط وإتمام الدفع لبدء التعلم. شكراً لك! 🎓`
    return `https://wa.me/?text=${encodeURIComponent(text)}`
  }

  return (
    <div style={{
      fontFamily: 'Cairo',
      direction: 'rtl',
      minHeight: '100vh',
      background: '#f8fafc',
      padding: '40px 5vw'
    }}>
      <div style={{
        maxWidth: '700px',
        margin: '0 auto',
        background: '#ffffff',
        borderRadius: '24px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
        overflow: 'hidden',
        border: '1px solid rgba(27,43,107,0.06)'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1B2B6B 0%, #2a3a8c 50%, #8B1A3A 100%)',
          padding: '25px 30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src="https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69afadb7c509a0bfb75719bb.png"
              alt="Logo"
              style={{ height: '38px', width: 'auto' }}
            />
            <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '15px' }}>
              إنشاء رابط دفع مخصص
            </span>
          </div>
          <Link href="/admin" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>
            ← رجوع للرئيسية
          </Link>
        </div>

        {/* Form Body */}
        <div style={{ padding: '35px' }}>
          <h2 style={{ color: '#1B2B6B', fontWeight: 900, marginBottom: '5px', fontSize: '20px' }}>
            توليد رابط دفع سريع 🔗
          </h2>
          <p style={{ color: '#666', fontSize: '13px', marginBottom: '25px', fontWeight: 600 }}>
            املأ تفاصيل المادة والسعر لتوليد رابط مباشر يمكن إرساله للعميل عبر واتساب.
          </p>

          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Country Selection */}
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 700, color: '#1B2B6B', fontSize: '13px' }}>
                اختر الدولة/المنهج
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '13px 14px',
                  borderRadius: '12px',
                  border: '2px solid #eee',
                  fontSize: '14px',
                  fontFamily: 'Cairo',
                  color: '#1B2B6B',
                  fontWeight: 600,
                  background: '#fff',
                  outline: 'none'
                }}
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Grade Selection */}
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 700, color: '#1B2B6B', fontSize: '13px' }}>
                اختر الصف الدراسي
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '13px 14px',
                  borderRadius: '12px',
                  border: '2px solid #eee',
                  fontSize: '14px',
                  fontFamily: 'Cairo',
                  color: '#1B2B6B',
                  fontWeight: 600,
                  background: '#fff',
                  outline: 'none'
                }}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((g) => (
                  <option key={g} value={String(g)}>الصف {g}</option>
                ))}
              </select>
            </div>

            {/* Subject Selection */}
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 700, color: '#1B2B6B', fontSize: '13px' }}>
                اختر المادة / نوع الخدمة
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '13px 14px',
                  borderRadius: '12px',
                  border: '2px solid #eee',
                  fontSize: '14px',
                  fontFamily: 'Cairo',
                  color: '#1B2B6B',
                  fontWeight: 600,
                  background: '#fff',
                  outline: 'none'
                }}
              >
                <option value="">اختر المادة</option>
                {subjects.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Custom Subject Name if "other" is selected */}
            {subject === 'أخرى (مخصص)' && (
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 700, color: '#1B2B6B', fontSize: '13px' }}>
                  اسم الخدمة المخصصة
                </label>
                <input
                  type="text"
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  required
                  placeholder="مثال: باقة مراجعة شاملة لغة عربية"
                  style={{
                    width: '100%',
                    padding: '13px 14px',
                    borderRadius: '12px',
                    border: '2px solid #eee',
                    fontSize: '14px',
                    fontFamily: 'Cairo',
                    color: '#1B2B6B',
                    fontWeight: 600,
                    outline: 'none'
                  }}
                />
              </div>
            )}

            {/* Price field */}
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 700, color: '#1B2B6B', fontSize: '13px' }}>
                السعر بالدرهم الإماراتي (AED)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min="1"
                placeholder="أدخل السعر المطلوب للدفع"
                style={{
                  width: '100%',
                  padding: '13px 14px',
                  borderRadius: '12px',
                  border: '2px solid #eee',
                  fontSize: '14px',
                  fontFamily: 'Cairo',
                  color: '#1B2B6B',
                  fontWeight: 600,
                  outline: 'none'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={!subject || !price || (subject === 'أخرى (مخصص)' && !customSubject)}
              style={{
                width: '100%',
                padding: '15px',
                background: (!subject || !price || (subject === 'أخرى (مخصص)' && !customSubject)) ? '#ccc' : '#8B1A3A',
                color: '#fff',
                border: 'none',
                borderRadius: '50px',
                fontSize: '16px',
                fontWeight: 800,
                cursor: (!subject || !price || (subject === 'أخرى (مخصص)' && !customSubject)) ? 'not-allowed' : 'pointer',
                fontFamily: 'Cairo',
                boxShadow: '0 4px 15px rgba(139,26,58,0.2)'
              }}
            >
              🔗 توليد الرابط المخصص
            </button>
          </form>

          {/* Generated Link Display */}
          {generatedLink && (
            <div style={{
              marginTop: '30px',
              padding: '20px',
              background: '#f8fafc',
              borderRadius: '16px',
              border: '2px dashed #8B1A3A',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>
              <div>
                <span style={{ color: '#1B2B6B', fontWeight: 800, fontSize: '14px', display: 'block', marginBottom: '5px' }}>
                  الرابط الذي تم توليده:
                </span>
                <div style={{
                  background: '#ffffff',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  color: '#8B1A3A',
                  fontSize: '12px',
                  wordBreak: 'break-all',
                  fontFamily: 'monospace',
                  direction: 'ltr',
                  textAlign: 'left',
                  fontWeight: 600
                }}>
                  {generatedLink}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={copyToClipboard}
                  style={{
                    flex: 1,
                    minWidth: '140px',
                    padding: '12px',
                    background: copied ? '#27ae60' : '#1B2B6B',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontFamily: 'Cairo',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  {copied ? '✅ تم النسخ!' : '📋 نسخ الرابط'}
                </button>

                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    minWidth: '140px',
                    padding: '12px',
                    background: '#25D366',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontFamily: 'Cairo',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    textDecoration: 'none',
                    textAlign: 'center'
                  }}
                >
                  💬 مشاركة عبر WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
