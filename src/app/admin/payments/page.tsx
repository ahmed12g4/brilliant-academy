'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminPayments() {
  const [orders, setOrders] = useState<any[]>([])
  const [filteredOrders, setFilteredOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch('/api/admin/orders')
        const data = await res.json()
        if (Array.isArray(data)) {
          setOrders(data)
          setFilteredOrders(data)
        }
      } catch (e) {
        console.error("Failed to load orders:", e)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  useEffect(() => {
    let result = orders

    // Filter by search query
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(o => 
        o.student_name?.toLowerCase().includes(q) ||
        o.student_email?.toLowerCase().includes(q) ||
        o.student_phone?.toLowerCase().includes(q) ||
        o.subject?.toLowerCase().includes(q) ||
        o.id?.toLowerCase().includes(q)
      )
    }

    // Filter by status
    if (statusFilter !== 'all') {
      result = result.filter(o => o.status === statusFilter)
    }

    setFilteredOrders(result)
  }, [search, statusFilter, orders])

  const countryNames = { UAE: 'الإمارات', Kuwait: 'الكويت', Qatar: 'قطر', KSA: 'السعودية' }

  return (
    <div style={{
      fontFamily: 'Cairo',
      direction: 'rtl',
      minHeight: '100vh',
      background: '#f8fafc',
      padding: '40px 5vw'
    }}>
      <div style={{
        maxWidth: '1200px',
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
              سجل المدفوعات والفواتير
            </span>
          </div>
          <Link href="/admin" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>
            ← رجوع للرئيسية
          </Link>
        </div>

        {/* Body */}
        <div style={{ padding: '35px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <h2 style={{ color: '#1B2B6B', fontWeight: 900, margin: 0, fontSize: '20px' }}>
                سجل المعاملات المالية 💳
              </h2>
              <p style={{ color: '#888', fontSize: '13px', margin: '3px 0 0', fontWeight: 600 }}>
                تابع عمليات الدفع الناجحة والمعلقة وقم بطباعة الفواتير للطلاب.
              </p>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', width: '100%', smWidth: 'auto' } as any}>
              <input
                type="text"
                placeholder="ابحث باسم الطالب، المادة، الهاتف..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '10px',
                  border: '2px solid #eee',
                  fontSize: '13px',
                  fontFamily: 'Cairo',
                  color: '#1B2B6B',
                  fontWeight: 600,
                  outline: 'none',
                  minWidth: '240px',
                  flex: 1
                }}
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '10px',
                  border: '2px solid #eee',
                  fontSize: '13px',
                  fontFamily: 'Cairo',
                  color: '#1B2B6B',
                  fontWeight: 600,
                  background: '#fff',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="all">كل العمليات</option>
                <option value="paid">المدفوعة فقط ✅</option>
                <option value="pending">المعلقة فقط ⏳</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <p style={{ color: '#999', fontSize: '16px', fontWeight: 600 }}>⏳ جاري تحميل سجل المعاملات...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: '#f8fafc', borderRadius: '16px' }}>
              <div style={{ fontSize: '50px', marginBottom: '10px' }}>💸</div>
              <p style={{ color: '#888', fontSize: '16px', fontWeight: 700 }}>لا توجد معاملات تطابق البحث حالياً</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right', fontSize: '14px' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '16px 20px', color: '#1B2B6B', fontWeight: 800 }}>اسم الطالب</th>
                    <th style={{ padding: '16px 20px', color: '#1B2B6B', fontWeight: 800 }}>بيانات الاتصال</th>
                    <th style={{ padding: '16px 20px', color: '#1B2B6B', fontWeight: 800 }}>الدولة والصف</th>
                    <th style={{ padding: '16px 20px', color: '#1B2B6B', fontWeight: 800 }}>المادة / الباقة</th>
                    <th style={{ padding: '16px 20px', color: '#1B2B6B', fontWeight: 800 }}>المبلغ</th>
                    <th style={{ padding: '16px 20px', color: '#1B2B6B', fontWeight: 800 }}>الحالة</th>
                    <th style={{ padding: '16px 20px', color: '#1B2B6B', fontWeight: 800 }}>التاريخ</th>
                    <th style={{ padding: '16px 20px', color: '#1B2B6B', fontWeight: 800, textAlign: 'center' }}>الخيارات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((o) => (
                    <tr key={o.id} style={{ borderBottom: '1px solid #edf2f7', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = '#f8fafc'} onMouseOut={(e) => e.currentTarget.style.background = 'none'}>
                      <td style={{ padding: '16px 20px', fontWeight: 700, color: '#1B2B6B' }}>
                        {o.student_name}
                      </td>
                      <td style={{ padding: '16px 20px', color: '#666', fontSize: '12px' }}>
                        <span style={{ display: 'block', fontWeight: 600 }}>{o.student_phone}</span>
                        <span style={{ display: 'block', color: '#888' }}>{o.student_email}</span>
                      </td>
                      <td style={{ padding: '16px 20px', color: '#666', fontWeight: 600 }}>
                        {countryNames[o.country as keyof typeof countryNames] || o.country} - الصف {o.grade}
                      </td>
                      <td style={{ padding: '16px 20px', color: '#1B2B6B', fontWeight: 600 }}>
                        {o.subject}
                        {o.package_id && o.package_id !== 'custom' && (
                          <span style={{
                            display: 'block',
                            fontSize: '11px',
                            color: '#8B1A3A',
                            fontWeight: 700,
                            marginTop: '2px'
                          }}>
                            {o.package_id === 'one' && 'حصة واحدة'}
                            {o.package_id === 'four' && 'باقة 4 حصص'}
                            {o.package_id === 'eight' && 'باقة 8 حصص'}
                            {o.package_id === 'twelve' && 'باقة 12 حصة'}
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '16px 20px', color: '#8B1A3A', fontWeight: 800, fontSize: '15px' }}>
                        {o.price_aed} {o.currency || 'AED'}
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          borderRadius: '50px',
                          fontSize: '12px',
                          fontWeight: 800,
                          background: o.status === 'paid' ? '#eafaf1' : '#fff7ed',
                          color: o.status === 'paid' ? '#27ae60' : '#e67e22'
                        }}>
                          {o.status === 'paid' ? '✅ مدفوع' : '⏳ معلق'}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px', color: '#888', fontSize: '12px', fontWeight: 600 }}>
                        {o.created_at ? new Date(o.created_at).toLocaleDateString('ar-EG', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : '-'}
                      </td>
                      <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                        <Link href={`/invoice/${o.id.replace('order:', '')}`} target="_blank" style={{
                          display: 'inline-block',
                          padding: '6px 12px',
                          background: '#1B2B6B',
                          color: '#fff',
                          textDecoration: 'none',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 700,
                          fontFamily: 'Cairo',
                          transition: 'background 0.2s'
                        }} onMouseOver={(e) => e.currentTarget.style.background = '#8B1A3A'} onMouseOut={(e) => e.currentTarget.style.background = '#1B2B6B'}>
                          📄 عرض الفاتورة / PDF
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
