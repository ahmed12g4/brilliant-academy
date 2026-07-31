'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function EditCourse({ params }: { params: { slug: string } }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [subject, setSubject] = useState('')
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
          setImageUrl(course.imageUrl || '')
          setSubject(course.subject || '')
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
      body: JSON.stringify({ name, price: parseFloat(price), description, slug: params.slug, imageUrl, subject })
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
    <div style={{ fontFamily: 'Cairo', direction: 'rtl', minHeight: '100vh', background: '#f5f5f5', padding: '40px 5vw' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', background: '#fff', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <div style={{ background: 'linear-gradient(135deg, #1B2B6B 0%, #2a3a8c 50%, #8B1A3A 100%)', padding: '25px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69afadb7c509a0bfb75719bb.png" alt="Logo" style={{ height: '38px', width: 'auto' }} />
            <span style={{ color: '#fff', fontWeight: 800, fontSize: '15px' }}>تعديل الكورس</span>
          </div>
          <form onSubmit={async (e) => { e.preventDefault(); document.cookie = 'admin_pass=; path=/; max-age=0'; window.location.href = '/admin/login' }}>
            <button type="submit" style={{ padding: '8px 18px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '50px', fontSize: '12px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Cairo' }}>خروج</button>
          </form>
        </div>
        <div style={{ padding: '30px' }}>
          <Link href="/admin/courses">
            <a style={{ color: '#1B2B6B', textDecoration: 'none', fontSize: '13px', fontWeight: 700, display: 'inline-block', marginBottom: '20px' }}>← رجوع</a>
          </Link>
          <h2 style={{ color: '#1B2B6B', fontWeight: 900, marginBottom: '5px', fontSize: '20px' }}>تعديل الكورس</h2>
          <p style={{ color: '#666', fontSize: '13px', marginBottom: '20px' }}>عدّل البيانات المطلوبة</p>
          {error && <p style={{ color: '#d32f2f', marginBottom: '12px', fontSize: '13px', fontWeight: 600 }}>{error}</p>}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 700, color: '#1B2B6B', fontSize: '13px' }}>عنوان الكورس</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #eee', fontSize: '14px', fontFamily: 'Cairo', color: '#1B2B6B', fontWeight: 600 }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 700, color: '#1B2B6B', fontSize: '13px' }}>السعر (درهم AED)</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required min="1" style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #eee', fontSize: '14px', fontFamily: 'Cairo', color: '#1B2B6B', fontWeight: 600 }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 700, color: '#1B2B6B', fontSize: '13px' }}>رابط الصورة (اختياري)</label>
              <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/image.jpg" style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #eee', fontSize: '14px', fontFamily: 'Cairo', color: '#1B2B6B', fontWeight: 600 }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 700, color: '#1B2B6B', fontSize: '13px' }}>الوصف (اختياري)</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #eee', fontSize: '14px', fontFamily: 'Cairo', color: '#1B2B6B', resize: 'vertical' }} />
            </div>
            <button type="submit" disabled={saving} style={{ padding: '14px', background: '#1B2B6B', color: '#fff', border: 'none', borderRadius: '50px', fontSize: '16px', fontWeight: 800, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'Cairo' }}>
              {saving ? 'جاري الحفظ...' : '💾 حفظ التعديلات'}
            </button>
          </form>
          <div style={{ marginTop: '25px', paddingTop: '18px', borderTop: '1px solid #eee' }}>
            <p style={{ color: '#888', fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>⚠️ خطير: حذف الكورس</p>
            <button onClick={handleDelete} style={{ padding: '10px 22px', background: '#d32f2f', color: '#fff', border: 'none', borderRadius: '50px', fontSize: '12px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Cairo' }}>🗑 حذف الكورس</button>
          </div>
        </div>
      </div>
    </div>
  )
}