'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const countries = [
  { code: 'UAE', name: 'منهج الإمارات', flag: 'https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69adddfae041da3294a1a498.png' },
  { code: 'Kuwait', name: 'منهج الكويت', flag: 'https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69adddfa80d3592af463c9ac.png' },
  { code: 'Qatar', name: 'منهج قطر', flag: 'https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69af710d7116a18d1ec04894.png' },
  { code: 'KSA', name: 'منهج السعودية', flag: 'https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69af710d4a2d8823e0effff7.png' },
]

const subjects = [
  { name: 'لغة عربية', img: 'https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee30bace6475935e13e29.jpg' },
  { name: 'لغة انجليزية', img: 'https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee30b248bef45defd1667.jpg' },
  { name: 'رياضيات', img: 'https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee30b7c2702346932011a.jpg' },
  { name: 'علوم', img: 'https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee30b5a8a19b7b8c830e8.jpg' },
  { name: 'قرآن كـريم', img: 'https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee30bace6472829e13e22.jpg' },
  { name: 'تربية إسلامية', img: 'https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee30bbfc81fc7bf16a9a9.jpg' },
  { name: 'حساب ذهني', img: 'https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee30bb9be704bb00eddb7.jpg' },
  { name: 'اجتماعيات', img: 'https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee2fe7c2702751431fefe.jpg' },
  { name: 'فيزياء', img: 'https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee30b4a2d887954d8c4b3.jpg' },
  { name: 'كيما', img: 'https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee30b4a2d88111cd8c4af.jpg' },
  { name: 'أحياء', img: 'https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee30c8d3eae3a31a71b47.jpg' },
  { name: 'لغة فرنسية', img: 'https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee30b8d3eae7beca71b2d.jpg' },
  { name: 'جيولوجيا', img: 'https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee30b5a8a19c1b2c830e7.jpg' },
  { name: 'جغرافي', img: 'https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee30bbfc81f03f916a9a8.jpg' },
  { name: 'تاريخ', img: 'https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee30bb9be7061ed0eddaf.jpg' },
]

export default function NewCourse() {
  const [step, setStep] = useState(1)
  const [country, setCountry] = useState('')
  const [grade, setGrade] = useState('')
  const [subject, setSubject] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!country || !grade || !subject) return
    setStep(2)
  }

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !price || !country || !grade || !subject) return
    setLoading(true)
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now()
    await fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price: parseFloat(price), description, slug, imageUrl, subject, country, gradeLevel: parseInt(grade) })
    })
    router.push('/admin/courses')
  }

  const selectedSubjectData = subjects.find((s) => s.name === subject)

  return (
    <div style={{ fontFamily: 'Cairo', direction: 'rtl', minHeight: '100vh', background: '#f5f5f5', padding: '40px 5vw' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', background: '#fff', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <div style={{ background: 'linear-gradient(135deg, #1B2B6B 0%, #2a3a8c 50%, #8B1A3A 100%)', padding: '25px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69afadb7c509a0bfb75719bb.png" alt="Logo" style={{ height: '38px', width: 'auto' }} />
            <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '15px' }}>إضافة كورس جديد</span>
          </div>
          <Link href="/admin/courses" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>← رجوع للكورسات</Link>
        </div>

        <div style={{ padding: '30px' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
            {[1, 2].map((s) => (
              <div key={s} style={{ flex: 1, height: '6px', borderRadius: '3px', background: s <= step ? '#8B1A3A' : '#eee', transition: 'background 0.3s' }} />
            ))}
          </div>

          {step === 1 && (
            <>
              <h2 style={{ color: '#1B2B6B', fontWeight: 900, marginBottom: '5px', fontSize: '20px' }}>اختر التفاصيل الأساسية</h2>
              <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px', fontWeight: 600 }}>اختار الدولة والمرحلة والمادة</p>
              <form onSubmit={handleStep1Submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 700, color: '#1B2B6B', fontSize: '13px' }}>اختر الدولة</label>
                  <select value={country} onChange={(e) => setCountry(e.target.value)} required style={{ width: '100%', padding: '13px 14px', borderRadius: '12px', border: '2px solid #eee', fontSize: '14px', fontFamily: 'Cairo', color: '#1B2B6B', fontWeight: 600, background: '#fff' }}>
                    <option value="">اختر الدولة</option>
                    {countries.map((c) => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 700, color: '#1B2B6B', fontSize: '13px' }}>اختر الصف</label>
                  <select value={grade} onChange={(e) => setGrade(e.target.value)} required style={{ width: '100%', padding: '13px 14px', borderRadius: '12px', border: '2px solid #eee', fontSize: '14px', fontFamily: 'Cairo', color: '#1B2B6B', fontWeight: 600, background: '#fff' }}>
                    <option value="">اختر الصف</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((g) => (
                      <option key={g} value={String(g)}>الصف {g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 700, color: '#1B2B6B', fontSize: '13px' }}>اختر المادة</label>
                  <select value={subject} onChange={(e) => setSubject(e.target.value)} required style={{ width: '100%', padding: '13px 14px', borderRadius: '12px', border: '2px solid #eee', fontSize: '14px', fontFamily: 'Cairo', color: '#1B2B6B', fontWeight: 600, background: '#fff' }}>
                    <option value="">اختر المادة</option>
                    {subjects.map((s) => (
                      <option key={s.name} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
                {subject && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: '#f8f9ff', borderRadius: '12px' }}>
                    {selectedSubjectData && <img src={selectedSubjectData.img} alt={subject} style={{ width: '40px', height: '40px', borderRadius: '10px', objectFit: 'cover' }} />}
                    <span style={{ fontWeight: 700, color: '#1B2B6B', fontSize: '14px' }}>{subject}</span>
                  </div>
                )}
                <button type="submit" disabled={!country || !grade || !subject} style={{ width: '100%', padding: '16px', background: (!country || !grade || !subject) ? '#ccc' : '#8B1A3A', color: '#fff', border: 'none', borderRadius: '50px', fontSize: '17px', fontWeight: 800, cursor: (!country || !grade || !subject) ? 'not-allowed' : 'pointer', fontFamily: 'Cairo' }}>
                  التالي ←
                </button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', padding: '12px', background: '#f8f9ff', borderRadius: '12px' }}>
                {selectedSubjectData && <img src={selectedSubjectData.img} alt={subject} style={{ width: '40px', height: '40px', borderRadius: '10px', objectFit: 'cover' }} />}
                <div>
                  <span style={{ background: '#8B1A3A', color: '#fff', padding: '4px 14px', borderRadius: '50px', fontSize: '12px', fontWeight: 800, display: 'inline-block', marginBottom: '3px' }}>{subject}</span>
                  <span style={{ fontWeight: 700, color: '#1B2B6B', fontSize: '13px', marginRight: '10px' }}>الصف {grade} - {countries.find((c) => c.code === country)?.name}</span>
                </div>
              </div>

              <form onSubmit={handleStep2Submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 700, color: '#1B2B6B', fontSize: '13px' }}>عنوان الكورس</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="مثال: لغة عربية - الصف السادس" style={{ width: '100%', padding: '13px 14px', borderRadius: '12px', border: '2px solid #eee', fontSize: '14px', fontFamily: 'Cairo', color: '#1B2B6B', fontWeight: 600 }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 700, color: '#1B2B6B', fontSize: '13px' }}>السعر - درهم إماراتي (AED)</label>
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required min="1" placeholder="مثال: 150" style={{ width: '100%', padding: '13px 14px', borderRadius: '12px', border: '2px solid #eee', fontSize: '14px', fontFamily: 'Cairo', color: '#1B2B6B', fontWeight: 600 }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 700, color: '#1B2B6B', fontSize: '13px' }}>رابط صورة الكورس (URL)</label>
                  <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/course-image.jpg" style={{ width: '100%', padding: '13px 14px', borderRadius: '12px', border: '2px solid #eee', fontSize: '14px', fontFamily: 'Cairo', color: '#1B2B6B', fontWeight: 600 }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 700, color: '#1B2B6B', fontSize: '13px' }}>الوصف</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="وصف الكورس..." style={{ width: '100%', padding: '13px 14px', borderRadius: '12px', border: '2px solid #eee', fontSize: '14px', fontFamily: 'Cairo', color: '#1B2B6B', resize: 'vertical' }} />
                </div>
                <div style={{ marginTop: '5px' }}>
                  <button type="submit" disabled={loading || !name || !price} style={{ width: '100%', padding: '16px', background: (loading || !name || !price) ? '#ccc' : '#8B1A3A', color: '#fff', border: 'none', borderRadius: '50px', fontSize: '17px', fontWeight: 800, cursor: (loading || !name || !price) ? 'not-allowed' : 'pointer', fontFamily: 'Cairo' }}>
                    {loading ? '⏳ جاري الحفظ...' : '💾 حفظ الكورس'}
                  </button>
                </div>
              </form>

              {name && price && (
                <div style={{ marginTop: '20px', padding: '15px', background: '#f0f8ff', borderRadius: '12px', border: '1px solid #d0e0ff' }}>
                  <p style={{ color: '#1B2B6B', fontSize: '13px', fontWeight: 700, marginBottom: '3px' }}>رابط الكورس:</p>
                  <code style={{ fontSize: '13px', color: '#8B1A3A', fontWeight: 700, direction: 'ltr', fontFamily: 'monospace' }}>/course/{name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}</code>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}