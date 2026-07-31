import { kv } from '@/lib/db'
import PrintButton from '@/components/PrintButton'

export default async function InvoicePage({ params }: { params: { id: string } }) {
  const orderId = `order:${params.id}`
  let order: any = null

  try {
    order = await kv.get(orderId)
  } catch (e) {
    console.error("Failed to load order for invoice:", e)
  }

  if (!order) {
    return (
      <div style={{
        fontFamily: 'Cairo, sans-serif',
        direction: 'rtl',
        minHeight: '100vh',
        background: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          maxWidth: '400px'
        }}>
          <div style={{ fontSize: '50px', marginBottom: '15px' }}>🔍</div>
          <h2 style={{ color: '#1B2B6B', fontWeight: 900, margin: '0 0 10px' }}>الفاتورة غير موجودة</h2>
          <p style={{ color: '#888', fontSize: '14px', margin: '0 0 20px', fontWeight: 600 }}>
            لم نتمكن من العثور على الفاتورة المطلوبة، يرجى التأكد من الرابط والمحاولة مرة أخرى.
          </p>
        </div>
      </div>
    )
  }

  const countryNames = { UAE: 'الإمارات', Kuwait: 'الكويت', Qatar: 'قطر', KSA: 'السعودية' }
  const formattedDate = order.created_at ? new Date(order.created_at).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '-'

  return (
    <div style={{
      fontFamily: 'Cairo, sans-serif',
      direction: 'rtl',
      minHeight: '100vh',
      background: '#f1f5f9',
      padding: '40px 20px'
    }}>
      {/* Google Fonts Link */}
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet" />

      {/* Embedded Print CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body {
            background: #ffffff !important;
            padding: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          .invoice-container {
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}} />

      <div className="invoice-container" style={{
        maxWidth: '850px',
        margin: '0 auto',
        background: '#ffffff',
        borderRadius: '24px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
        padding: '50px',
        border: '1px solid #e2e8f0',
        boxSizing: 'border-box'
      }}>
        {/* Invoice Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottom: '2px solid #f1f5f9',
          paddingBottom: '30px',
          marginBottom: '30px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <img
              src="https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69afadb7c509a0bfb75719bb.png"
              alt="Brilliant Academy"
              style={{ height: '55px', width: 'auto', marginBottom: '10px' }}
            />
            <h1 style={{ color: '#1B2B6B', fontWeight: 900, margin: 0, fontSize: '20px' }}>أكاديمية بريلينت</h1>
            <p style={{ color: '#888', fontSize: '12px', margin: '3px 0 0', fontWeight: 600 }}>التعليم التفاعلي الذكي</p>
          </div>

          <div style={{ textAlign: 'left', direction: 'ltr' }}>
            <h2 style={{ color: '#8B1A3A', fontWeight: 900, margin: '0 0 5px', fontSize: '24px', letterSpacing: '0.5px' }}>
              TAX INVOICE / فاتورة ضريبية
            </h2>
            <div style={{ color: '#666', fontSize: '13px', fontWeight: 600, display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span><strong>Invoice No:</strong> {order.id.replace('order:', 'INV-')}</span>
              <span><strong>Date:</strong> {formattedDate}</span>
              <span><strong>Status:</strong> {order.status === 'paid' ? 'Paid / مدفوعة ✅' : 'Pending / معلقة ⏳'}</span>
            </div>
          </div>
        </div>

        {/* Client & Academy Details */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px',
          marginBottom: '40px'
        }}>
          {/* Bill To */}
          <div style={{
            background: '#f8fafc',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid #f1f5f9'
          }}>
            <h3 style={{ color: '#1B2B6B', fontWeight: 800, margin: '0 0 10px', fontSize: '14px', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px' }}>
              فوترت إلى (العميل):
            </h3>
            <div style={{ color: '#4a5568', fontSize: '13px', fontWeight: 600, display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <span style={{ fontSize: '15px', color: '#1B2B6B', fontWeight: 800 }}>{order.student_name}</span>
              <span>البريد الإلكتروني: {order.student_email}</span>
              <span>رقم الهاتف: {order.student_phone}</span>
              <span>المنهج: {countryNames[order.country as keyof typeof countryNames] || order.country} - الصف {order.grade}</span>
            </div>
          </div>

          {/* Bill From */}
          <div style={{
            background: '#f8fafc',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid #f1f5f9'
          }}>
            <h3 style={{ color: '#1B2B6B', fontWeight: 800, margin: '0 0 10px', fontSize: '14px', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px' }}>
              صدرت من:
            </h3>
            <div style={{ color: '#4a5568', fontSize: '13px', fontWeight: 600, display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <span style={{ fontSize: '15px', color: '#1B2B6B', fontWeight: 800 }}>أكاديمية بريلينت التعليمية</span>
              <span>الموقع الإلكتروني: thebrilliant-academy.com</span>
              <span>طريقة الدفع: بطاقة ائتمانية (Stripe)</span>
              <span>دولة الفوترة: الإمارات العربية المتحدة</span>
            </div>
          </div>
        </div>

        {/* Invoice Items Table */}
        <div style={{ marginBottom: '40px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#1B2B6B', color: '#ffffff' }}>
                <th style={{ padding: '12px 20px', borderRadius: '0 10px 10px 0', fontWeight: 800 }}>البند / الخدمة</th>
                <th style={{ padding: '12px 20px', fontWeight: 800, textAlign: 'center' }}>الكمية</th>
                <th style={{ padding: '12px 20px', fontWeight: 800, textAlign: 'left' }}>سعر الوحدة</th>
                <th style={{ padding: '12px 20px', borderRadius: '10px 0 0 10px', fontWeight: 800, textAlign: 'left' }}>الإجمالي</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                <td style={{ padding: '20px', fontWeight: 700, color: '#1B2B6B' }}>
                  {order.subject}
                  {order.package_id && order.package_id !== 'custom' && (
                    <span style={{ display: 'block', fontSize: '11px', color: '#8B1A3A', fontWeight: 700, marginTop: '4px' }}>
                      الباقة: {
                        order.package_id === 'one' ? 'حصة واحدة' :
                        order.package_id === 'four' ? 'باقة 4 حصص' :
                        order.package_id === 'eight' ? 'باقة 8 حصص' :
                        order.package_id === 'twelve' ? 'باقة 12 حصة' : order.package_id
                      }
                    </span>
                  )}
                </td>
                <td style={{ padding: '20px', textAlign: 'center', fontWeight: 600, color: '#4a5568' }}>1</td>
                <td style={{ padding: '20px', textAlign: 'left', fontWeight: 600, color: '#4a5568' }}>{order.price_aed} AED</td>
                <td style={{ padding: '20px', textAlign: 'left', fontWeight: 800, color: '#1B2B6B' }}>{order.price_aed} AED</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Invoice Summary */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          flexDirection: 'column',
          alignSelf: 'flex-end',
          marginRight: 'auto',
          maxWidth: '300px',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '14px', fontWeight: 600, color: '#4a5568' }}>
            <span>المجموع الفرعي:</span>
            <span>{order.price_aed} AED</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '14px', fontWeight: 600, color: '#4a5568' }}>
            <span>الضريبة (0%):</span>
            <span>0.00 AED</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            fontSize: '18px',
            fontWeight: 900,
            color: '#8B1A3A',
            borderTop: '2px solid #f1f5f9',
            paddingTop: '10px',
            marginTop: '5px'
          }}>
            <span>الصافي النهائي:</span>
            <span>{order.price_aed} AED</span>
          </div>
        </div>

        {/* Footer Note */}
        <div style={{
          marginTop: '60px',
          textAlign: 'center',
          borderTop: '1px solid #f1f5f9',
          paddingTop: '20px',
          color: '#888',
          fontSize: '12px',
          fontWeight: 600
        }}>
          <p>شكراً لثقتكم بأكاديمية بريلينت. في حال وجود أي استفسار يرجى التواصل معنا عبر الواتساب.</p>
          <p style={{ marginTop: '5px', direction: 'ltr' }}>Brilliant Academy © 2026. All rights reserved.</p>
        </div>

        {/* Interactive Print and Actions Bar */}
        <PrintButton />
      </div>
    </div>
  )
}
