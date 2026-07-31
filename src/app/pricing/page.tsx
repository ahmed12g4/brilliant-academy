"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PRICES, COUNTRY_NAMES, getGradeGroup, getGradeName, isMentalMath, type Country } from "@/lib/prices";

const FLAGS: Record<string, string> = {
  Kuwait: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69adddfa80d3592af463c9ac.png",
  KSA: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69af710d4a2d8823e0effff7.png",
  Qatar: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69adddfabfc81f2d53ef5e07.png",
};

function PricingContent() {
  const searchParams = useSearchParams();
  const grade = parseInt(searchParams.get("grade") || "1");
  const subject = searchParams.get("subject") || "";
  const country = (searchParams.get("country") || "Kuwait") as Country;
  const [adminCourses, setAdminCourses] = useState<any[]>([]);
  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch('/api/courses');
        const data = await res.json();
        const filtered = data.filter((c: any) => {
          if (c.gradeLevel !== grade) return false;
          if (c.country !== country) return false;
          if (c.subject !== subject) return false;
          return true;
        });
        setAdminCourses(filtered);
      } catch {}
      setAdminLoading(false);
    }
    fetchCourses();
  }, [grade, country, subject]);

  const mental = isMentalMath(subject);
  const group = mental ? "mental_math" : getGradeGroup(grade);
  const data: Record<string, any> = PRICES[group as keyof typeof PRICES] as any;

  return (
    <>
      <style>{`
        .ba-pricing-section {
          background-color: #f5f5f5;
          padding: 40px 5vw 80px;
          text-align: center;
          min-height: 100vh;
        }

        .ba-pricing-container {
          max-width: 1400px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 24px;
          padding: 60px 40px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
        }

        .ba-pricing-header {
          margin-bottom: 50px;
        }

        .ba-pricing-header h1 {
          font-size: clamp(34px, 5vw, 48px);
          font-weight: 900;
          color: var(--primary-navy);
          margin-bottom: 15px;
        }

        .ba-pricing-header h1 span {
          color: var(--accent-red);
        }

        .ba-pricing-header p {
          font-size: 18px;
          color: #666;
          font-weight: 600;
        }

        .ba-pricing-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr) !important;
          gap: 20px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .ba-pricing-grid.centered {
          display: flex;
          justify-content: center;
        }

        .ba-price-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 40px 20px;
          text-decoration: none;
          box-shadow: 0 8px 25px rgba(139, 26, 58, 0.05);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          border: 2px solid #ffffff;
          position: relative;
          overflow: hidden;
          height: 100%;
          box-sizing: border-box;
        }

        .ba-price-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(27, 43, 107, 0.1);
          border-color: var(--accent-red);
        }

        .ba-package-name {
          font-size: 22px;
          font-weight: 900;
          color: var(--primary-navy);
          margin: 0;
        }

        .ba-package-desc {
          font-size: 16px;
          color: #666;
          font-weight: 600;
          min-height: 48px;
        }

        .ba-price-amount {
          margin: 15px 0;
        }

        .ba-price-value {
          font-size: 48px;
          font-weight: 900;
          color: var(--accent-red);
        }

        .ba-price-currency {
          font-size: 18px;
          font-weight: 700;
          color: var(--primary-navy);
          margin-right: 5px;
        }

        .ba-currency-info {
          background: #fdf8f9;
          padding: 18px 15px;
          border-radius: 12px;
          width: 100%;
          font-size: 14px;
          color: var(--primary-navy);
          display: flex;
          flex-direction: column;
          gap: 8px;
          border: 1px solid rgba(139, 26, 58, 0.08);
          font-weight: 700;
          box-sizing: border-box;
        }

        .ba-currency-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .ba-currency-country {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ba-mini-flag {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .ba-subscribe-btn {
          background: var(--primary-navy);
          color: white;
          width: 100%;
          padding: 16px;
          border-radius: 50px;
          font-size: 18px;
          font-weight: 800;
          text-align: center;
          transition: all 0.3s ease;
          margin-top: auto;
          cursor: pointer;
          border: none;
        }

        .ba-price-card:hover .ba-subscribe-btn {
          background: var(--accent-red);
        }

        .ba-popular-tag {
          position: absolute;
          top: 20px;
          left: -35px;
          background: var(--accent-red);
          color: white;
          padding: 8px 40px;
          font-size: 12px;
          font-weight: 800;
          transform: rotate(-45deg);
        }

        .ba-mental-math-note {
          background: #fff4f2;
          color: var(--accent-red);
          padding: 12px 20px;
          border-radius: 12px;
          font-weight: 700;
          margin-bottom: 25px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 1px solid var(--accent-red);
          font-size: 15px;
          box-shadow: 0 5px 15px rgba(139, 26, 58, 0.05);
          max-width: 500px;
          line-height: 1.4;
        }

        .ba-mental-math-note strong {
          display: inline;
          font-size: 16px;
          color: var(--primary-navy);
        }

        @media (max-width: 1200px) {
          .ba-pricing-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            max-width: 900px;
            padding: 0 20px;
          }
        }

        @media (max-width: 768px) {
          .ba-pricing-section {
            padding: 20px 4vw 60px;
          }

          .ba-pricing-container {
            padding: 30px 15px;
            border-radius: 16px;
          }

          .ba-pricing-grid {
            grid-template-columns: 1fr !important;
            max-width: 450px;
            gap: 25px;
          }

          .ba-price-card {
            padding: 30px 25px;
            min-height: 520px;
          }

          .ba-package-name {
            font-size: 24px;
          }

          .ba-price-value {
            font-size: 42px;
          }

          .ba-currency-info {
            padding: 15px;
          }
        }
      `}</style>
      <section className="ba-pricing-section">
        <div className="ba-pricing-container">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "30px", fontSize: "14px", fontWeight: 600, color: "#666", justifyContent: "flex-start" }}>
            <Link href="/courses" style={{ color: "var(--primary-navy)", textDecoration: "none" }}>المناهج</Link>
            <span style={{ color: "#ddd" }}>/</span>
            <Link href={`/grades?country=${country}`} style={{ color: "var(--primary-navy)", textDecoration: "none" }}>{COUNTRY_NAMES[country as Country] || "منهج الكويت"}</Link>
            <span style={{ color: "#ddd" }}>/</span>
            <Link href={`/subjects?grade=${grade}&country=${country}`} style={{ color: "var(--primary-navy)", textDecoration: "none" }}>الصف {getGradeName(grade)}</Link>
            <span style={{ color: "#ddd" }}>/</span>
            <span>{subject}</span>
          </div>

          <div className="ba-pricing-header" style={{ marginBottom: "30px" }}>
            <h1>باقات مادة <span>{subject}</span></h1>
            <p style={{ marginBottom: "20px" }}>الصف {getGradeName(grade)} - اختر الباقة المناسبة لك</p>
            {mental && (
              <div className="ba-mental-math-note" style={{ margin: "0 auto" }}>
                <strong>ملاحظة هامة:</strong> المعداد ومذكرة الحل لا تشمل سعر الحصص.
              </div>
            )}
          </div>

          <div className={`ba-pricing-grid ${mental ? "centered" : ""}`}>
            {mental ? (
              <div className="ba-price-card">
                <div className="ba-popular-tag">الأكثر طلباً</div>
                <h3 className="ba-package-name">باقة الحساب الذهني</h3>
                <p className="ba-package-desc">كل حصة مدتها 40 دقيقة، لمدة 4 أسابيع (8 حصص)</p>
                <div className="ba-price-amount">
                  <span className="ba-price-value">{data.eight.aed}</span>
                  <span className="ba-price-currency">درهم</span>
                </div>
                <div className="ba-currency-info">
                  <div className="ba-currency-item"><div className="ba-currency-country"><img src={FLAGS.Kuwait} className="ba-mini-flag" alt="Kuwait" /><span>الكويت:</span></div><span>{data.eight.kwd} دينار</span></div>
                  <div className="ba-currency-item"><div className="ba-currency-country"><img src={FLAGS.KSA} className="ba-mini-flag" alt="KSA" /><span>السعودية:</span></div><span>{data.eight.sar} ريال</span></div>
                  <div className="ba-currency-item"><div className="ba-currency-country"><img src={FLAGS.Qatar} className="ba-mini-flag" alt="Qatar" /><span>قطر:</span></div><span>{data.eight.qar} ريال</span></div>
                </div>
                <Link href={`/checkout?package=eight&grade=${grade}&country=${country}&subject=${encodeURIComponent(subject)}`} className="ba-subscribe-btn">اشترك الآن</Link>
              </div>
            ) : (
              (["one", "four", "eight", "twelve"] as const).map((pkg, i) => {
                const prices = data[pkg];
                const pkgNames: Record<string, string> = { one: "حصة واحدة فقط", four: "باقة 4 حصص", eight: "باقة 8 حصص", twelve: "باقة 12 حصة" };
                const pkgDescs: Record<string, string> = { one: "مدة الحصة 40 دقيقة", four: "كل حصة مدتها 40 دقيقة، لمدة 4 أسابيع", eight: "كل حصة مدتها 40 دقيقة، لمدة 4 أسابيع", twelve: "كل حصة مدتها 40 دقيقة، لمدة 4 أسابيع" };
                return (
                  <div className="ba-price-card" key={pkg}>
                    {i === 2 && <div className="ba-popular-tag">الأكثر طلباً</div>}
                    <h3 className="ba-package-name">{pkgNames[pkg]}</h3>
                    <p className="ba-package-desc">{pkgDescs[pkg]}</p>
                    <div className="ba-price-amount">
                      <span className="ba-price-value">{prices.aed}</span>
                      <span className="ba-price-currency">درهم</span>
                    </div>
                    <div className="ba-currency-info">
                      <div className="ba-currency-item"><div className="ba-currency-country"><img src={FLAGS.Kuwait} className="ba-mini-flag" alt="Kuwait" /><span>الكويت:</span></div><span>{prices.kwd} دينار</span></div>
                      <div className="ba-currency-item"><div className="ba-currency-country"><img src={FLAGS.KSA} className="ba-mini-flag" alt="KSA" /><span>السعودية:</span></div><span>{prices.sar} ريال</span></div>
                      <div className="ba-currency-item"><div className="ba-currency-country"><img src={FLAGS.Qatar} className="ba-mini-flag" alt="Qatar" /><span>قطر:</span></div><span>{prices.qar} ريال</span></div>
                    </div>
                    <Link href={`/checkout?package=${pkg}&grade=${grade}&country=${country}&subject=${encodeURIComponent(subject)}`} className="ba-subscribe-btn">اشترك الآن</Link>
                  </div>
                );
              })
            )}
          </div>

          {/* Admin-added courses */}
          {adminLoading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p style={{ color: '#999', fontSize: '14px' }}>⏳ جاري التحميل...</p>
            </div>
          ) : adminCourses.length > 0 ? (
            <>
              <h2 style={{ color: '#1B2B6B', fontWeight: 900, marginBottom: '20px', fontSize: '22px', textAlign: 'center' }}>
                📚 كورسات إضافية
              </h2>
              <div className="ba-pricing-grid">
                {adminCourses.map((c: any) => (
                  <div className="ba-price-card" key={c.id}>
                    {c.imageUrl && (
                      <div style={{ width: '100%', height: '120px', borderRadius: '12px', overflow: 'hidden', marginBottom: '10px' }}>
                        <img src={c.imageUrl} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                    <h3 className="ba-package-name">{c.name}</h3>
                    <p className="ba-package-desc">{c.description || ''}</p>
                    <div className="ba-price-amount">
                      <span className="ba-price-value">{c.price}</span>
                      <span className="ba-price-currency">درهم</span>
                    </div>
                    <Link href={`/checkout?course=${c.id}&grade=${grade}&country=${country}&subject=${encodeURIComponent(subject)}`} className="ba-subscribe-btn">اشترك الآن</Link>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>
    </>
  );
}

export default function PricingPage() {
  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        <Suspense fallback={<div style={{ textAlign: "center", padding: "100px 20px", fontFamily: "Cairo" }}>جاري التحميل...</div>}>
          <PricingContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
