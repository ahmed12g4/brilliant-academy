'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const categories = [
  { id: 'primary', name: 'ابتدائي', grades: 'الصف 1-6' },
  { id: 'middle', name: 'متوسط', grades: 'الصف 7-9' },
  { id: 'secondary', name: 'ثانوي', grades: 'الصف 10-12' },
  { id: 'mental', name: 'حساب ذهني', grades: 'مستويات متعددة' },
]

export default function NewCourse() {
  const [step, setStep] = useState(1)
  const [category, setCategory] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [slug, setSlug] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCategoryNext = () => {
    if (!category) return
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !price || !slug) return
    setLoading(true)
    await fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price: parseFloat(price), description, slug })
    })
    router.push('/admin/courses')
  }

  return (
    <div style={{
      fontFamily: 'Cairo',
      direction: 'rtl',
      minHeight: '100vh',
      background: '#f5f5f5'
    }}>
      <header style={{
        background: '#ffffff',
        borderBottom: '3px solid #8B1A3A',
        padding: '15px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 10px rgba(0,0,0,0.06)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src="https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69afadb7c509a0bfb75719bb.png"
            alt="Logo"
            style={{ height: '40px', width: 'auto' }}
          />
          <span style={{ color: '#1B2B6B', fontWeight: 800, fontSize: '16px' }}>
            لوحة التحكم
          </span>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            document.cookie = 'admin_pass=; path=/; max-age=0'
            window.location.href = '/admin/login'
          }}
        >
          <button
            type="submit"
            style={{
              padding: '8px 20px',
              background: '#8B1A3A',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            خروج
          </button>
        </form>
      </header>
      <main style={{ padding: '40px 5vw' }}>
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          background: '#fff',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
            <Link href="/admin/courses">
              <a style={{ color: '#1B2B6B', textDecoration: 'none', fontSize: '14px', fontWeight: 700 }}>
                ← رجوع
              </a>
            </Link>
            <span style={{ color: '#ccc', fontSize: '14px' }}>|</span>
            <span style={{ color: '#888', fontSize: '14px' }}>
              خطوة {step} من 2
            </span>
          </div>

          {step === 1 && (
            <>
              <h2 style={{ color: '#1B2B6B', fontWeight: 900, marginBottom: '8px', fontSize: '22px' }}>
                اختر تصنيف الكورس
              </h2>
              <p style={{ color: '#666', fontSize: '14px', marginBottom: '25px' }}>
                اختار التصنيف اللي يناسب الكورس الجديد
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    style={{
                      padding: '24px',
                      background: category === cat.id ? '#1B2B6B' : '#fafafa',
                      color: category === cat.id ? '#fff' : '#1B2B6B',
                      border: `2px solid ${category === cat.id ? '#1B2B6B' : '#eee'}`,
                      borderRadius: '16px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.3s',
                      fontFamily: 'Cairo'
                    }}
                  >
                    <div style={{ fontWeight: 900, fontSize: '18px', marginBottom: '5px' }}>
                      {cat.name}
                    </div>
                    <div style={{ fontSize: '12px', opacity: 0.7 }}>
                      {cat.grades}
                    </div>
                  </button>
                ))}
              </div>
              <div style={{ marginTop: '25px', textAlign: 'left' }}>
                <button
                  onClick={handleCategoryNext}
                  disabled={!category}
                  style={{
                    padding: '14px 36px',
                    background: category ? '#8B1A3A' : '#ccc',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: '16px',
                    fontWeight: 800,
                    cursor: category ? 'pointer' : 'not-allowed',
                    fontFamily: 'Cairo'
                  }}
                >
                  التالي ←
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 style={{ color: '#1B2B6B', fontWeight: 900, marginBottom: '8px', fontSize: '22px' }}>
                تفاصيل الكورس
              </h2>
              <p style={{ color: '#666', fontSize: '14px', marginBottom: '25px' }}>
                املأ البيانات المطلوبة
              </p>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: 700, color: '#1B2B6B', fontSize: '14px' }}>
                    اسم الكورس
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="مثال: لغة عربية - الصف السادس"
                    style={{
                      width: '100%', padding: '14px 16px', borderRadius: '12px',
                      border: '2px solid #eee', fontSize: '15px', fontFamily: 'Cairo',
                      color: '#1B2B6B'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: 700, color: '#1B2B6B', fontSize: '14px' }}>
                    السعر (درهم)
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    min="0"
                    placeholder="مثال: 150"
                    style={{
                      width: '100%', padding: '14px 16px', borderRadius: '12px',
                      border: '2px solid #eee', fontSize: '15px', fontFamily: 'Cairo',
                      color: '#1B2B6B'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: 700, color: '#1B2B6B', fontSize: '14px' }}>
                    الرابط (slug)
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                    placeholder="مثال: arabic-grade6"
                    style={{
                      width: '100%', padding: '14px 16px', borderRadius: '12px',
                      border: '2px solid #eee', fontSize: '15px', fontFamily: 'Cairo',
                      color: '#1B2B6B'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: 700, color: '#1B2B6B', fontSize: '14px' }}>
                    الوصف (اختياري)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    style={{
                      width: '100%', padding: '14px 16px', borderRadius: '12px',
                      border: '2px solid #eee', fontSize: '15px', fontFamily: 'Cairo',
                      color: '#1B2B6B', resize: 'vertical'
                    }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '16px',
                    background: '#8B1A3A',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: '17px',
                    fontWeight: 800,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontFamily: 'Cairo'
                  }}
                >
                  {loading ? 'جاري الحفظ...' : '💾 حفظ الكورس'}
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  )
}