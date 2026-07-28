"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const countryData = [
  { code: "UAE", name: "منهج الإمارات", flag: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69adddfae041da3294a1a498.png" },
  { code: "Kuwait", name: "منهج الكويت", flag: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69adddfa80d3592af463c9ac.png" },
  { code: "Qatar", name: "منهج قطر", flag: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69af710d7116a18d1ec04894.png" },
  { code: "KSA", name: "منهج السعودية", flag: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69af710d4a2d8823e0effff7.png" },
];

const countryNames: Record<string, string> = {
  UAE: "منهج الإمارات",
  Kuwait: "منهج الكويت",
  Qatar: "منهج قطر",
  KSA: "منهج السعودية",
};

function CoursesContent() {
  const searchParams = useSearchParams();
  const country = searchParams.get("country") || "";

  return (
    <>
      <style>{`
        .ba-curriculum-section {
          background-color: #ffffff;
          font-family: 'Cairo', sans-serif;
          direction: rtl;
          padding: 80px 5vw;
          color: #1B2B6B;
          text-align: center;
          min-height: 100vh;
          border-radius: 18px;
        }
        .ba-curr-container {
          max-width: 1100px;
          margin: 0 auto;
        }
        .ba-curr-header {
          margin-bottom: 60px;
        }
        .ba-curr-header h1 {
          font-size: clamp(34px, 5vw, 48px);
          font-weight: 900;
          color: #1B2B6B;
          margin-bottom: 20px;
          line-height: 1.2;
        }
        .ba-curr-header h1 span {
          color: #8B1A3A;
          position: relative;
        }
        .ba-curr-header p {
          font-size: 20px;
          color: #555;
          font-weight: 600;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.7;
        }
        .ba-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Cairo', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: #555;
          margin-bottom: 30px;
          direction: rtl;
        }
        .ba-breadcrumb a {
          color: #1B2B6B;
          text-decoration: none;
        }
        .ba-breadcrumb a:hover {
          color: #8B1A3A;
        }
        .ba-breadcrumb span.separator {
          color: #999;
        }
        .ba-breadcrumb span.current {
          color: #8B1A3A;
          font-weight: 700;
        }
        .ba-countries-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
          margin-top: 40px;
        }
        .ba-country-card {
          background: #ffffff;
          border-radius: 28px;
          padding: 40px 30px;
          text-decoration: none;
          border: 2px solid #ffffff;
          box-shadow: 0 10px 30px rgba(139, 26, 58, 0.05);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 20px;
          position: relative;
          height: 100%;
          min-height: 420px;
          justify-content: center;
        }
        .ba-country-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 20px 50px rgba(27, 43, 107, 0.12);
          border-color: #8B1A3A;
        }
        .ba-flag-wrapper {
          width: 160px;
          height: 160px;
          background: #fff4f2;
          border-radius: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5px;
          border: 1px solid rgba(139, 26, 58, 0.05);
          box-shadow: 0 5px 20px rgba(139, 26, 58, 0.05);
          transition: transform 0.4s ease;
        }
        .ba-country-card:hover .ba-flag-wrapper {
          transform: scale(1.1) rotate(6deg);
        }
        .ba-flag-wrapper img {
          width: 100px;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 6px 15px rgba(0, 0, 0, 0.1));
        }
        .ba-country-card h3 {
          font-size: 24px;
          font-weight: 800;
          color: #1B2B6B;
          margin: 0;
          transition: color 0.3s ease;
          white-space: nowrap;
        }
        .ba-country-card:hover h3 {
          color: #8B1A3A;
        }
        .ba-explore-btn {
          background: #f8f9ff;
          color: #8B1A3A;
          font-size: 14px;
          font-weight: 800;
          padding: 8px 20px;
          border-radius: 50px;
          transition: all 0.3s ease;
          align-self: flex-start;
          margin-top: auto;
          border: 1px solid transparent;
        }
        .ba-country-card:hover .ba-explore-btn {
          background: #8B1A3A;
          color: #ffffff;
          box-shadow: 0 8px 15px rgba(139, 26, 58, 0.15);
        }
        @media (max-width: 1100px) {
          .ba-countries-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 650px) {
          .ba-curriculum-section {
            padding: 20px 4vw;
            min-height: auto;
          }
          .ba-curr-header {
            margin-bottom: 20px;
          }
          .ba-curr-header h1 {
            font-size: 22px;
            margin-bottom: 8px;
          }
          .ba-curr-header p {
            font-size: 13px;
            line-height: 1.4;
          }
          .ba-countries-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            width: 100%;
            margin: 0;
          }
          .ba-country-card {
            min-height: 180px;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px 10px;
            gap: 12px;
            border-radius: 20px;
            text-align: center;
            border: 1px solid #f2f2f2;
            box-shadow: 0 5px 15px rgba(139, 26, 58, 0.03);
          }
          .ba-flag-wrapper {
            width: 70px;
            height: 70px;
            margin-bottom: 0;
            flex-shrink: 0;
            border-radius: 18px;
            background: #fff4f2;
          }
          .ba-flag-wrapper img {
            width: 40px;
          }
          .ba-country-card h3 {
            font-size: 16px;
            font-weight: 800;
            margin: 0;
            padding: 0;
          }
          .ba-explore-btn {
            margin: 0;
            padding: 8px 18px;
            font-size: 13px;
            background: #8B1A3A;
            color: #ffffff;
            border-radius: 50px;
            white-space: nowrap;
            align-self: center;
          }
        }
      `}</style>
      {country && countryNames[country] && (
        <div className="ba-breadcrumb">
          <Link href="/courses">المناهج</Link>
          <span className="separator">/</span>
          <span className="current">{countryNames[country]}</span>
        </div>
      )}
      <section className="ba-curriculum-section">
        <div className="ba-curr-container">
          <div className="ba-curr-header">
            <h1>مو بس دروس .. هذا <span>مستقبل</span> نبدأ معك ونكمّل المشوار !</h1>
            <p>اختر المادة التعليمية والمرحلة الدراسية وعدد الحصص المناسبة لك بكل سهولة.</p>
          </div>
          <div className="ba-countries-grid">
            {countryData.map((c) => (
              <Link href={`/grades?country=${c.code}`} className="ba-country-card" key={c.code}>
                <div className="ba-flag-wrapper">
                  <img src={c.flag} alt={c.name} />
                </div>
                <h3>{c.name}</h3>
                <div className="ba-explore-btn">عرض المراحل</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default function CoursesPageWrapper() {
  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        <Suspense fallback={<div style={{ textAlign: "center", padding: "100px 20px", fontFamily: "Cairo" }}>جاري التحميل...</div>}>
          <CoursesContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
