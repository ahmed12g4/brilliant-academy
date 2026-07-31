'use client'

export default function PrintButton() {
  return (
    <div className="no-print" style={{
      display: 'flex',
      gap: '15px',
      justifyContent: 'center',
      marginTop: '40px',
      marginBottom: '20px'
    }}>
      <button
        onClick={() => window.print()}
        style={{
          padding: '12px 30px',
          background: '#8B1A3A',
          color: '#ffffff',
          border: 'none',
          borderRadius: '50px',
          fontSize: '15px',
          fontWeight: 800,
          cursor: 'pointer',
          fontFamily: 'Cairo',
          boxShadow: '0 4px 15px rgba(139,26,58,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        🖨️ طباعة الفاتورة / حفظ كـ PDF
      </button>

      <button
        onClick={() => window.close()}
        style={{
          padding: '12px 30px',
          background: '#1B2B6B',
          color: '#ffffff',
          border: 'none',
          borderRadius: '50px',
          fontSize: '15px',
          fontWeight: 800,
          cursor: 'pointer',
          fontFamily: 'Cairo',
          boxShadow: '0 4px 15px rgba(27,43,107,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        ✕ إغلاق النافذة
      </button>
    </div>
  )
}
