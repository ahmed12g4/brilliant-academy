'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminPage() {
  const [stats, setStats] = useState({
    coursesCount: 0,
    paidCount: 0,
    pendingCount: 0,
    totalRevenue: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [coursesRes, ordersRes] = await Promise.all([
          fetch('/api/courses'),
          fetch('/api/admin/orders')
        ])
        
        const courses = await coursesRes.json()
        const orders = await ordersRes.json()

        const paid = orders.filter((o: any) => o.status === 'paid')
        const pending = orders.filter((o: any) => o.status === 'pending')
        const revenue = paid.reduce((acc: number, curr: any) => acc + (Number(curr.price_aed) || 0), 0)

        setStats({
          coursesCount: Array.isArray(courses) ? courses.length : 0,
          paidCount: paid.length,
          pendingCount: pending.length,
          totalRevenue: revenue
        })
      } catch (e) {
        console.error("Failed to fetch dashboard stats:", e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div style={{
      fontFamily: 'Cairo',
      direction: 'rtl',
      minHeight: '100vh',
      background: '#f8fafc',
      padding: '40px 5vw'
    }}>
      <header style={{
        background: '#ffffff',
        borderBottom: '3px solid #8B1A3A',
        padding: '15px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
        maxWidth: '1200px',
        margin: '0 auto 30px',
        borderRadius: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src="https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69afadb7c509a0bfb75719bb.png"
            alt="Logo"
            style={{ height: '42px', width: 'auto' }}
          />
          <div>
            <span style={{ color: '#1B2B6B', fontWeight: 800, fontSize: '16px', display: 'block' }}>
              لوحة تحكم أكاديمية بريلينت
            </span>
            <span style={{ color: '#888', fontSize: '12px', fontWeight: 600 }}>
              إدارة المنصة بالكامل
            </span>
          </div>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            if (!confirm('هل أنت متأكد من خروجك من لوحة التحكم؟')) return
            document.cookie = 'admin_pass=; path=/; max-age=0'
            window.location.href = '/admin/login'
          }}
        >
          <button
            type="submit"
            style={{
              padding: '9px 22px',
              background: '#8B1A3A',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              fontFamily: 'Cairo'
            }}
          >
            خروج ✕
          </button>
        </form>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ color: '#1B2B6B', fontWeight: 900, fontSize: '26px', margin: 0 }}>
            أهلاً بك في لوحة التحكم 🎓
          </h1>
          <p style={{ color: '#666', fontSize: '14px', marginTop: '5px', fontWeight: 600 }}>
            إدارة الكورسات والمواد وروابط الدفع والفواتير في منصة أكاديمية بريلينت
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p style={{ color: '#888', fontSize: '16px', fontWeight: 600 }}>⏳ جاري تحميل الإحصائيات...</p>
          </div>
        ) : (
          <>
            {/* Stats Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '35px' }}>
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                border: '1px solid rgba(27,43,107,0.06)'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>💰</div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#1B2B6B' }}>
                  {stats.totalRevenue} <span style={{ fontSize: '14px', fontWeight: 700 }}>درهم</span>
                </div>
                <div style={{ color: '#888', fontSize: '13px', fontWeight: 600, marginTop: '3px' }}>إجمالي الإيرادات المحصلة</div>
              </div>
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                border: '1px solid rgba(27,43,107,0.06)'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>✅</div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#27ae60' }}>{stats.paidCount}</div>
                <div style={{ color: '#888', fontSize: '13px', fontWeight: 600, marginTop: '3px' }}>عمليات الدفع الناجحة</div>
              </div>
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                border: '1px solid rgba(27,43,107,0.06)'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>⏳</div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#e67e22' }}>{stats.pendingCount}</div>
                <div style={{ color: '#888', fontSize: '13px', fontWeight: 600, marginTop: '3px' }}>الفواتير/الطلبات المعلقة</div>
              </div>
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                border: '1px solid rgba(27,43,107,0.06)'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>📚</div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#8B1A3A' }}>{stats.coursesCount}</div>
                <div style={{ color: '#888', fontSize: '13px', fontWeight: 600, marginTop: '3px' }}>عدد الكورسات الكلي</div>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <h2 style={{ color: '#1B2B6B', fontWeight: 900, fontSize: '20px', marginBottom: '20px' }}>الوصول السريع للمهام ⚡</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <Link href="/admin/payments" style={{
                display: 'block',
                background: '#ffffff',
                borderRadius: '18px',
                padding: '28px',
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                border: '1px solid rgba(27,43,107,0.06)',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'none'}>
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>📊</div>
                <h3 style={{ color: '#1B2B6B', fontWeight: 900, margin: '0 0 5px', fontSize: '18px' }}>
                  سجل المدفوعات والفواتير
                </h3>
                <p style={{ color: '#888', fontSize: '13px', margin: 0, fontWeight: 600 }}>
                  متابعة الطلاب الذين دفعوا، تصفح الفواتير، وتحميلها بصيغة PDF.
                </p>
                <div style={{
                  marginTop: '15px',
                  padding: '10px 20px',
                  background: '#1B2B6B',
                  color: '#fff',
                  borderRadius: '50px',
                  fontSize: '13px',
                  fontWeight: 800,
                  textAlign: 'center',
                  display: 'inline-block'
                }}>
                  افتح السجل ←
                </div>
              </Link>

              <Link href="/admin/payments/links" style={{
                display: 'block',
                background: '#ffffff',
                borderRadius: '18px',
                padding: '28px',
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                border: '1px solid rgba(27,43,107,0.06)',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'none'}>
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔗</div>
                <h3 style={{ color: '#8B1A3A', fontWeight: 900, margin: '0 0 5px', fontSize: '18px' }}>
                  إنشاء رابط دفع مخصص
                </h3>
                <p style={{ color: '#888', fontSize: '13px', margin: 0, fontWeight: 600 }}>
                  توليد رابط دفع بمبلغ مخصص وإرساله للطالب عبر واتساب فوراً.
                </p>
                <div style={{
                  marginTop: '15px',
                  padding: '10px 20px',
                  background: '#8B1A3A',
                  color: '#fff',
                  borderRadius: '50px',
                  fontSize: '13px',
                  fontWeight: 800,
                  textAlign: 'center',
                  display: 'inline-block'
                }}>
                  إنشاء رابط جديد ←
                </div>
              </Link>

              <Link href="/admin/courses" style={{
                display: 'block',
                background: '#ffffff',
                borderRadius: '18px',
                padding: '28px',
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                border: '1px solid rgba(27,43,107,0.06)',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'none'}>
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>📚</div>
                <h3 style={{ color: '#1B2B6B', fontWeight: 900, margin: '0 0 5px', fontSize: '18px' }}>
                  إدارة الكورسات (المنتجات)
                </h3>
                <p style={{ color: '#888', fontSize: '13px', margin: 0, fontWeight: 600 }}>
                  عرض، تعديل، وحذف الكورسات والمواد المتاحة في المنصة حالياً.
                </p>
                <div style={{
                  marginTop: '15px',
                  padding: '10px 20px',
                  background: '#1B2B6B',
                  color: '#fff',
                  borderRadius: '50px',
                  fontSize: '13px',
                  fontWeight: 800,
                  textAlign: 'center',
                  display: 'inline-block'
                }}>
                  إدارة المنتجات ←
                </div>
              </Link>

              <Link href="/admin/courses/new" style={{
                display: 'block',
                background: '#ffffff',
                borderRadius: '18px',
                padding: '28px',
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                border: '1px solid rgba(27,43,107,0.06)',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'none'}>
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>➕</div>
                <h3 style={{ color: '#8B1A3A', fontWeight: 900, margin: '0 0 5px', fontSize: '18px' }}>
                  إضافة كورس (منتج) جديد
                </h3>
                <p style={{ color: '#888', fontSize: '13px', margin: 0, fontWeight: 600 }}>
                  إدخال كورس جديد وتحديد سعره والمادة الملحقة به والصف الدراسي.
                </p>
                <div style={{
                  marginTop: '15px',
                  padding: '10px 20px',
                  background: '#8B1A3A',
                  color: '#fff',
                  borderRadius: '50px',
                  fontSize: '13px',
                  fontWeight: 800,
                  textAlign: 'center',
                  display: 'inline-block'
                }}>
                  أضف كورس جديد ←
                </div>
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  )
}