"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PRICES, getGradeGroup, isMentalMath } from "@/lib/prices";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const packageId = searchParams.get("package") || "";
  const courseId = searchParams.get("course") || "";
  const grade = parseInt(searchParams.get("grade") || "1");
  const subject = searchParams.get("subject") || "";
  const country = searchParams.get("country") || "Kuwait";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [courseName, setCourseName] = useState("");

  const mental = isMentalMath(subject);
  const group = mental ? "mental_math" : getGradeGroup(grade);
  const prices: Record<string, { aed: number; kwd: number; qar: number; sar: number }> = PRICES[group as keyof typeof PRICES] as any;
  const price = prices?.[packageId] || { aed: 0, kwd: 0, qar: 0, sar: 0 };

  useEffect(() => {
    if (courseId) {
      fetch(`/api/courses?slug=${courseId}`)
        .then(res => res.json())
        .then(data => {
          if (data[0]) {
            setCoursePrice(data[0].price);
            setCourseName(data[0].name);
          }
        })
        .catch(() => {});
    }
  }, [courseId]);

  const finalPrice = courseId ? coursePrice : price?.aed || 0;
  const finalName = courseId ? courseName : (packageId ? { one: "حصة واحدة", four: "باقة 4 حصص", eight: "باقة 8 حصص", twelve: "باقة 12 حصة" }[packageId] || "الباقة" : "الباقة");

  const packageNames: Record<string, string> = { one: "حصة واحدة", four: "باقة 4 حصص", eight: "باقة 8 حصص", twelve: "باقة 12 حصة" };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !phone) { setError("يرجى تعبئة جميع الحقول"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, packageId, courseId, grade, subject, country, priceAed: finalPrice }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "حدث خطأ، حاول مرة أخرى");
        setLoading(false);
      }
    } catch {
      setError("حدث خطأ في الاتصال، حاول مرة أخرى");
      setLoading(false);
    }
  }

  return (
    <>
      <style jsx>{`
        .ba-checkout-section { direction: rtl; padding: 40px 5vw; min-height: 100vh; }
        .ba-checkout-container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 24px; padding: 40px 35px; box-shadow: 0 10px 40px rgba(139,26,58,0.08); }
        .ba-checkout-header { text-align: center; margin-bottom: 25px; }
        .ba-checkout-header h2 { font-size: 28px; font-weight: 900; color: #1B2B6B; margin-bottom: 6px; }
        .ba-checkout-header h2 span { color: #8B1A3A; }
        .ba-checkout-header p { font-size: 14px; color: #888; font-weight: 600; }
        .ba-package-summary { background: #fff4f2; border-radius: 12px; padding: 14px 18px; margin-bottom: 25px; border: 1px dashed #8B1A3A; display: flex; justify-content: space-between; align-items: center; font-size: 14px; font-weight: 700; color: #1B2B6B; }
        .ba-package-summary .ba-price { color: #8B1A3A; font-size: 18px; font-weight: 900; }
        .ba-form-group { margin-bottom: 16px; }
        .ba-form-group label { display: block; font-size: 14px; font-weight: 700; color: #1B2B6B; margin-bottom: 6px; }
        .ba-form-group input { width: 100%; padding: 14px 16px; border: 2px solid #eee; border-radius: 12px; font-family: 'Cairo', sans-serif; font-size: 15px; font-weight: 600; color: #1B2B6B; transition: border-color 0.3s; direction: rtl; }
        .ba-form-group input:focus { outline: none; border-color: #8B1A3A; }
        .ba-form-group input::placeholder { color: #bbb; }
        .ba-btn { display: block; width: 100%; background: #8B1A3A; color: white; padding: 18px; border-radius: 50px; font-family: 'Cairo', sans-serif; font-size: 20px; font-weight: 900; text-align: center; text-decoration: none; border: none; cursor: pointer; margin-top: 10px; transition: background 0.3s; }
        .ba-btn:hover { background: #1B2B6B; }
        .ba-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .ba-secure-note { text-align: center; font-size: 13px; color: #999; font-weight: 600; margin-top: 15px; }
        .ba-error { background: #fff0f0; color: #d32f2f; padding: 10px 16px; border-radius: 10px; font-size: 14px; font-weight: 600; margin-bottom: 15px; text-align: center; }
        @media (max-width: 650px) { .ba-checkout-section { padding: 25px 4vw; } .ba-checkout-container { padding: 25px 18px; } }
      `}</style>
      <div className="ba-checkout-section">
        <div className="ba-checkout-container">
          <div className="ba-checkout-header">
            <h2>بيانات <span>الطالب</span></h2>
            <p>يرجى تعبئة البيانات بدقة للتواصل معك</p>
          </div>
          <div className="ba-package-summary">
            <div>{finalName} - {subject}</div>
            <div className="ba-price">{finalPrice} درهم</div>
          </div>
          {error && <div className="ba-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="ba-form-group">
              <label>اسم الطالب الكامل</label>
              <input type="text" placeholder="أدخل اسم الطالب" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="ba-form-group">
              <label>البريد الإلكتروني</label>
              <input type="email" placeholder="example@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required dir="ltr" />
            </div>
            <div className="ba-form-group">
              <label>رقم الواتساب</label>
              <input type="tel" placeholder="+965 XXXX XXXX" value={phone} onChange={(e) => setPhone(e.target.value)} required dir="ltr" />
            </div>
            <button type="submit" className="ba-btn" disabled={loading}>
              {loading ? "جاري التحويل..." : "ادفع الآن"}
            </button>
          </form>
          <div className="ba-secure-note">بياناتك محمية وآمنة تماماً</div>
        </div>
      </div>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        <Suspense fallback={<div style={{ textAlign: "center", padding: "100px 20px", fontFamily: "Cairo" }}>جاري التحميل...</div>}>
          <CheckoutContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
