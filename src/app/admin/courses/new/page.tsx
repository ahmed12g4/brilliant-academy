'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const subjects = [
  { id: 'arabic', name: 'لغة عربية', icon: '📖', color: '#8B1A3A' },
  { id: 'english', name: 'لغة انجليزية', icon: '🔤', color: '#1B2B6B' },
  { id: 'math', name: 'رياضيات', icon: '🔢', color: '#2a7a4b' },
  { id: 'science', name: 'علوم', icon: '🔬', color: '#8B6914' },
  { id: 'quran', name: 'قرآن كـريم', icon: '📜', color: '#2a5a8c' },
  { id: 'islamic', name: 'تربية إسلامية', icon: '🕌', color: '#6a3d8c' },
  { id: 'mental', name: 'حساب ذهني', icon: '🧠', color: '#c0392b' },
  { id: 'social', name: 'اجتماعيات', icon: '🌍', color: '#5a7a3c' },
  { id: 'physics', name: 'فيزياء', icon: '⚡', color: '#1B2B6B' },
  { id: 'chemistry', name: 'كيما', icon: '🧪', color: '#8B6914' },
  { id: 'biology', name: 'أحياء', icon: '🧬', color: '#2a7a4b' },
  { id: 'french', name: 'لغة فرنسية', icon: '🇫🇷', color: '#1B2B6B' },
]

const gradeLevels = [
  { id: 'primary', name: 'ابتدائي', grades: '1-6' },
  { id: 'middle', name: 'متوسط', grades: '7-9' },
  { id: 'secondary', name: 'ثانوي', grades: '10-12' },
]

export default function NewCourse() {
  const [step, setStep] = useState(1)
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedGradeLevel, setSelectedGradeLevel] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubject(subjectId)
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !price || !selectedSubject) return
    setLoading(true)
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now()
    await fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price: parseFloat(price), description, slug, imageUrl, subject: selectedSubject, gradeLevel: selectedGradeLevel })
    })
    router.push('/admin/courses')
  }

  const selectedSubjectData = subjects.find((s) => s.id === selectedSubject)

  return (
    <div style={{
      fontFamily: 'Cairo',
      direction: 'rtl',
      minHeight: '100vh',
      background: '#f5f5f5',
      padding: '40px 5vw'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        background: '#fff',
        borderRadius: '24px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
        overflow: 'hidden'
      }}>
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
            <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '15px' }}>إضافة كورس جديد</span>
          </div>
          <Link href="/admin/courses">
            <a style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>
              ← رجوع للكورسات
            </a>
          </Link>
        </div>

        <div style={{ padding: '30px' }}>
          {/* Step Indicator */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
            {[1, 2].map((s) => (
              <div key={s} style={{
                flex: 1,
                height: '6px',
                borderRadius: '3px',
                background: s <= step ? '#8B1A3A' : '#eee',
                transition: 'background 0.3s'
              }} />
            ))}
          </div>

          {step === 1 && (
            <>
              <h2 style={{ color: '#1B2B6B', fontWeight: 900, marginBottom: '5px', fontSize: '20px' }}>
                اختر المادة
              </h2>
              <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px', fontWeight: 600 }}>
                اختار المادة التعليمية من القائمة
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px' }}>
                {subjects.map((subj) => (
                  <button
                    key={subj.id}
                    onClick={() => handleSubjectSelect(subj.id)}
                    style={{
                      padding: '16px 10px',
                      background: selectedSubject === subj.id ? subj.color : '#fafafa',
                      color: selectedSubject === subj.id ? '#fff' : '#333',
                      border: `2px solid ${selectedSubject === subj.id ? subj.color : '#eee'}`,
                      borderRadius: '12px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.3s',
                      fontFamily: 'Cairo'
                    }}
                  >
                    <div style={{ fontSize: '22px', marginBottom: '6px' }}>{subj.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: '12px' }}>{subj.name}</div>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && selectedSubjectData && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <span style={{ fontSize: '24px' }}>{selectedSubjectData.icon}</span>
                <div>
                  <span style={{
                    background: selectedSubjectData.color,
                    color: '#fff',
                    padding: '4px 14px',
                    borderRadius: '50px',
                    fontSize: '12px',
                    fontWeight: 800
                  }}>
                    {selectedSubjectData.name}
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 700, color: '#1B2B6B', fontSize: '13px' }}>
                    عنوان الكورس
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="مثال: لغة عربية - الصف السادس"
                    style={{
                      width: '100%', padding: '13px 14px', borderRadius: '12px',
                      border: '2px solid #eee', fontSize: '14px', fontFamily: 'Cairo',
                      color: '#1B2B6B', fontWeight: 600
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 700, color: '#1B2B6B', fontSize: '13px' }}>
                    السعر - درهم إماراتي (AED)
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    min="1"
                    placeholder="مثال: 150"
                    style={{
                      width: '100%', padding: '13px 14px', borderRadius: '12px',
                      border: '2px solid #eee', fontSize: '14px', fontFamily: 'Cairo',
                      color: '#1B2B6B', fontWeight: 600
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 700, color: '#1B2B6B', fontSize: '13px' }}>
                    رابط صورة الكورس (URL)
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/course-image.jpg"
                    style={{
                      width: '100%', padding: '13px 14px', borderRadius: '12px',
                      border: '2px solid #eee', fontSize: '14px', fontFamily: 'Cairo',
                      color: '#1B2B6B', fontWeight: 600
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 700, color: '#1B2B6B', fontSize: '13px' }}>
                    الوصف
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="وصف الكورس..."
                    style={{
                      width: '100%', padding: '13px 14px', borderRadius: '12px',
                      border: '2px solid #eee', fontSize: '14px', fontFamily: 'Cairo',
                      color: '#1B2B6B', resize: 'vertical'
                    }}
                  />
                </div>

                <div style={{ marginTop: '5px' }}>
                  <button
                    type="submit"
                    disabled={loading || !name || !price}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: loading || !name || !price ? '#ccc' : '#8B1A3A',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50px',
                      fontSize: '17px',
                      fontWeight: 800,
                      cursor: loading || !name || !price ? 'not-allowed' : 'pointer',
                      fontFamily: 'Cairo'
                    }}
                  >
                    {loading ? '⏳ جاري الحفظ...' : '💾 حفظ الكورس'}
                  </button>
                </div>
              </form>

              {name && price && (
                <div style={{ marginTop: '20px', padding: '15px', background: '#f0f8ff', borderRadius: '12px', border: '1px solid #d0e0ff' }}>
                  <p style={{ color: '#1B2B6B', fontSize: '13px', fontWeight: 700, marginBottom: '3px' }}>رابط الكورس:</p>
                  <code style={{
                    fontSize: '13px',
                    color: '#8B1A3A',
                    fontWeight: 700,
                    direction: 'ltr',
                    fontFamily: 'monospace'
                  }}>
                    /course/{name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}
                  </code>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}