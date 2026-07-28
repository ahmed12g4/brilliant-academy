"use client";
import Link from "next/link";

export default function PaymentCancel() {
  return (
    <>
      <style jsx>{`
        .ba-cancel-container { max-width: 500px; width: 100%; text-align: center; background: #ffffff; padding: 40px 30px; border-radius: 30px; box-shadow: 0 10px 40px rgba(27,43,107,0.08); margin: 80px auto; animation: slideUp 0.6s ease-out; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .ba-cancel-icon { width: 70px; height: 70px; background: #FFF4F2; color: #8B1A3A; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 32px; margin: 0 auto 20px; }
        .ba-cancel-container h1 { font-size: 26px; font-weight: 900; color: #1B2B6B; margin-bottom: 12px; }
        .ba-cancel-container p { font-size: 16px; color: #666; font-weight: 600; line-height: 1.6; margin-bottom: 30px; }
        .ba-btn-primary { background: #1B2B6B; color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 50px; font-size: 17px; font-weight: 800; transition: all 0.3s ease; box-shadow: 0 8px 15px rgba(27,43,107,0.15); display: inline-block; }
        .ba-btn-primary:hover { transform: translateY(-3px); background: #8B1A3A; }
      `}</style>
      <div style={{ fontFamily: "'Cairo', sans-serif", direction: "rtl", backgroundColor: "#FFF4F2", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }}>
        <div className="ba-cancel-container">
          <div className="ba-cancel-icon">&#10005;</div>
          <h1>تم إلغاء عملية الدفع</h1>
          <p>لم تتم عملية الدفع. لا تقلق، يمكنك المحاولة مرة أخرى في أي وقت.</p>
          <Link href="/courses" className="ba-btn-primary">العودة للمناهج</Link>
        </div>
      </div>
    </>
  );
}
