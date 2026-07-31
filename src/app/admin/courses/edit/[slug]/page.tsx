'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function EditCourse({ params }: { params: { slug: string } }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch('/api/courses')
        const courses = await res.json()
        const course = courses.find((c: any) => c.slug === params.slug)
        if (course) {
          setName(course.name)
          setPrice(String(course.price))
          setDescription(course.description || '')
        }
      } catch {}
      setLoading(false)
    }
    fetchCourse()
  }, [params.slug])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const res = await fetch('/api/courses', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price: parseFloat(price), description, slug: params.slug })
    })
    const data = await res.json()
    if (data.error) {
      setError(data.error)
    } else {
      router.push('/admin/courses')
    }
    setSaving(false)
  }

  const handleDelete = async () => {
    if (!confirm('هل أنت متأكد من حذف هذا الكورس؟')) return
    await fetch(`/api/courses?slug=${params.slug}`, { method: 'DELETE' })
    router.push('/admin/courses')
  }

  if (loading) {
    return (
      <div style={{ fontFamily: 'Cairo', direction: 'rtl', minHeight: '100vh', background: '#f5f5f5', padding: '40px 5vw', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#666', fontSize: '16px' }}>جاري التحميل...</p>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: 'Cairo', direction: 'rtl', minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={{ background: '#ffffff', borderBottom: '3px solid #8B1A3A', padding: '15px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69afadb7c509a0bfb75719bb.png" alt="Logo" style={{ height: '40px', width: 'auto' }} />
          <span style={{ color: '#1B2B6B', fontWeight: 800, fontSize: '16px' }}>لوحة التحكم</span>
        </div>
        <form onSubmit={async (e) => { e.preventDefault(); document.cookie = 'admin_pass=; path=/; max-age=0'; window.location.href = '/admin/login' }}>
          <button type="submit" style={{ padding: '8px 20px', background: '#8B1A3A', color: '#fff', border: 'none', borderRadius: '50px', fontSize: '13px', fontWeight: 800, cursor: 'pointer' }}>خروج</button>
        </form>
      </header>
      <main style={{ padding: '40px 5vw' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', background: '#fff', borderRadius: '24px', padding: '40px', boxShadow: '0 10px 40px rgba(0,0,0,0.06)' }}>
          <Link href="/admin/courses">
            <a style={{ color: '#1B2B6B', textDecoration: 'none', fontSize: '14px', fontWeight: 700, display: 'inline-block', marginBottom: '20px' }}>← رجوع</a>
          </Link>
          <h1 style={{ color: '#1B2B6B', fontWeight: 900, marginBottom: '8px', fontSize: '22px' }}>تعديل الكورس</h1>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '25px' }}>عدّل البيانات المطلوبة</p>
          {error && <p style={{ color: '#d32f2f', marginBottom: '15px', fontSize: '14px' }}>{error}</p>}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 700, color: '#1B2B6B', fontSize: '14px' }}>اسم الكورس</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #eee', fontSize: '15px', fontFamily: 'Cairo', color: '#1B2B6B' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 700, color: '#1B2B6B', fontSize: '14px' }}>السعر (درهم)</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #eee', fontSize: '15px', fontFamily: 'Cairo', color: '#1B2B6B' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 700, color: '#1B2B6B', fontSize: '14px' }}>الوصف (اختياري)</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #eee', fontSize: '15px', fontFamily: 'Cairo', color: '#1B2B6B', resize: 'vertical' }} />
            </div>
            <button type="submit" disabled={saving} style={{ padding: '16px', background: '#1B2B6B', color: '#fff', border: 'none', borderRadius: '50px', fontSize: '17px', fontWeight: 800, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'Cairo' }}>
              {saving ? 'جاري الحفظ...' : '💾 حفظ التعديلات'}
            </button>
          </form>
          <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <p style={{ color: '#888', fontSize: '13px', marginBottom: '10px', fontWeight: 700 }}>⚠️ خطير: حذف الكورس</p>
            <button onClick={handleDelete} style={{ padding: '10px 24px', background: '#d32f2f', color: '#fff', border: 'none', borderRadius: '50px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Cairo' }}>
              🗑 حذف الكورس
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}