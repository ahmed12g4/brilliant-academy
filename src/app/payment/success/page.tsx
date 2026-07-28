"use client";
import Link from "next/link";

export default function PaymentSuccess() {
  return (
    <>
      <style jsx>{`
        :root { --primary: #1B2B6B; --accent: #8B1A3A; --pink: #FFF4F2; }
        .ba-thank-container { max-width: 500px; width: 100%; text-align: center; background: #ffffff; padding: 25px 25px; border-radius: 30px; box-shadow: 0 10px 40px rgba(27,43,107,0.08); position: relative; animation: slideUp 0.8s ease-out; margin: 60px auto; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .ba-success-icon { width: 70px; height: 70px; background: #FFF4F2; color: #8B1A3A; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 32px; margin: 0 auto 15px; position: relative; }
        .ba-success-icon::after { content: ''; position: absolute; width: 100%; height: 100%; border: 2px solid #8B1A3A; border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(1.3); opacity: 0; } }
        .ba-thank-container h1 { font-size: 28px; font-weight: 900; margin-bottom: 12px; color: #1B2B6B; }
        .ba-thank-container h1 span { color: #8B1A3A; }
        .ba-thank-container p { font-size: 16px; color: #555; font-weight: 600; line-height: 1.5; margin-bottom: 25px; }
        .ba-next-steps { background: #FFF4F2; border-radius: 20px; padding: 20px; margin-bottom: 25px; text-align: right; }
        .ba-next-steps h3 { font-size: 17px; font-weight: 800; margin-bottom: 12px; color: #8B1A3A; display: flex; align-items: center; gap: 10px; }
        .ba-step-item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px; font-size: 14px; font-weight: 600; color: #444; }
        .ba-step-item .icon { color: #8B1A3A; margin-top: 4px; font-size: 12px; }
        .ba-cta-group { display: flex; flex-direction: column; gap: 12px; }
        .ba-btn-primary { background: #1B2B6B; color: #ffffff; text-decoration: none; padding: 14px 25px; border-radius: 50px; font-size: 17px; font-weight: 800; transition: all 0.3s ease; box-shadow: 0 8px 15px rgba(27,43,107,0.15); text-align: center; }
        .ba-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 25px rgba(27,43,107,0.25); background: #8B1A3A; }
        .ba-btn-outline { color: #1B2B6B; text-decoration: none; font-size: 15px; font-weight: 700; transition: color 0.3s ease; text-align: center; }
        .ba-btn-outline:hover { color: #8B1A3A; }
        @media (max-width: 650px) { .ba-thank-container { padding: 25px 20px; border-radius: 25px; } .ba-thank-container h1 { font-size: 24px; } .ba-next-steps { padding: 15px; } }
      `}</style>
      <div style={{ fontFamily: "'Cairo', sans-serif", direction: "rtl", backgroundColor: "#FFF4F2", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }}>
        <div className="ba-thank-container">
          <div className="ba-success-icon">&#10003;</div>
          <h1>مبروك! تم <span>التسجيل</span> بنجاح</h1>
          <p>أهلاً بك في أكاديمية بريلينت. يسعدنا انضمامك إلينا لبدء رحلة تعليمية متميزة.</p>
          <div className="ba-next-steps">
            <h3>ماذا سيحدث الآن؟</h3>
            <div className="ba-step-item"><span className="icon">&#9679;</span><span>تفقد بريدك الإلكتروني لتحصل على بيانات التسجيل الخاصة بك.</span></div>
            <div className="ba-step-item"><span className="icon">&#9679;</span><span>ستقوم إدارة المنصة بالتواصل معكم قريباً لتأكيد كافة المعلومات.</span></div>
            <div className="ba-step-item"><span className="icon">&#9679;</span><span>ستقوم المعلمة بالتواصل معكم لتنسيق وتأكيد جدول الطالب الدراسي.</span></div>
            <div style={{ marginTop: "15px", textAlign: "center", borderTop: "1px dashed rgba(139,26,58,0.2)", paddingTop: "15px" }}>
              <p style={{ margin: 0, color: "#8B1A3A", fontSize: "17px", fontWeight: 800 }}>نبدا الحصص بكل ثقة وحماس</p>
            </div>
          </div>
          <div className="ba-cta-group">
            <a href="https://portal.thebrilliant-academy.com" className="ba-btn-primary">انتقل إلى لوحة التحكم</a>
            <Link href="/" className="ba-btn-outline">العودة للرئيسية</Link>
          </div>
        </div>
      </div>
    </>
  );
}
