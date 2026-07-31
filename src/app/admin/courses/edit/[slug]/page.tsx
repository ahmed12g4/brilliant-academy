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
        const res = await fetch(`/api/courses?slug=${params.slug}`)
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
      <div style={{
        fontFamily: 'Cairo',
        direction: 'rtl',
        minHeight: '100vh',
        background: '#f5f5f5',
        padding: '40px 5vw',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <p style={{ color: '#666', fontSize: '18px' }}>جاري التحميل...</p>
      </div>
    )
  }

  return (
    <div style={{
      fontFamily: 'Cairo',
      direction: 'rtl',
      minHeight: '100vh',
      background: '#f5f5f5'
    }}>
      <header style={{
        background: '#1B2B6B',
        padding: '20px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 18px rgba(0,0,0,0.12)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img
            src="https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69afadb7c509a0bfb75719bb.png"
            alt="Brilliant Academy Logo"
            style={{ height: '50px', width: 'auto' }}
          />
          <span style={{ color: '#fff', fontSize: '20px', fontWeight: 800 }}>
            لوحة تحكم الأكاديمية بريلينت
          </span>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            await fetch('/api/admin/logout', { method: 'POST' })
            document.cookie = 'admin_pass=; path=/; max-age=0'
            window.location.href = '/admin/login'
          }}
        >
          <button
            type="submit"
            style={{
              padding: '10px 24px',
              background: '#8B1A3A',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            خروج
          </button>
        </form>
      </header>
      <div style={{ padding: '40px 5vw' }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          background: '#fff',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.06)'
        }}>
          <h1 style={{ color: '#1B2B6B', fontWeight: 900, marginBottom: '20px' }}>تعديل الكورس</h1>
          {error && <p style={{ color: '#d32f2f', marginBottom: '15px' }}>{error}</p>}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, color: '#1B2B6B' }}>اسم الكورس</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #eee', fontSize: '16px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, color: '#1B2B6B' }}>السعر (درهم)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #eee', fontSize: '16px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, color: '#1B2B6B' }}>الوصف</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #eee', fontSize: '16px' }}
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: '16px',
                background: '#1B2B6B',
                color: '#fff',
                border: 'none',
                borderRadius: '50px',
                fontSize: '18px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              {saving ? 'جاري الحفظ...' : 'حفظ التعديلات'}
            </button>
          </form>
          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <button
              onClick={handleDelete}
              style={{
                padding: '12px 24px',
                background: '#d32f2f',
                color: '#fff',
                border: 'none',
                borderRadius: '50px',
                fontSize: '14px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              حذف الكورس
            </button>
          </div>
          <Link href="/admin/courses">
            <a style={{ display: 'block', textAlign: 'center', color: '#666', fontSize: '14px', marginTop: '15px' }}>رجوع</a>
          </Link>
        </div>
      </div>
    </div>
  )
}