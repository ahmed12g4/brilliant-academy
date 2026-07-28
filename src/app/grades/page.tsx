"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getGradeName } from "@/lib/prices";

const gradeImages: Record<number, string> = {
  1: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69adfc5ebfc81f18c3f3ba1f.png",
  2: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69adfc5ee041da1279a5fc81.png",
  3: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69adfc5e6be28a162cfc1713.png",
  4: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69adfc5e14ebc37944560ee5.png",
  5: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69adfc5e80d359888d681f75.png",
  6: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69adfc5ee041dad244a5fc65.png",
  7: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69adfc5ebfc81ff490f3ba1e.png",
  8: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69adfc5e80d359e5d6681f74.png",
  9: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69adfc5ebfc81fc74bf3ba20.png",
  10: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69adfc5ee041da5b9ca5fc66.png",
  11: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69adfc5e6be28a54d9fc1714.png",
  12: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69adfc5ebfc81fdebbf3ba21.png",
};

const countryNames: Record<string, string> = {
  Kuwait: "منهج الكويت",
  KSA: "منهج السعودية",
  Qatar: "منهج قطر",
  UAE: "منهج الإمارات",
};

function GradesContent() {
  const searchParams = useSearchParams();
  const country = searchParams.get("country") || "";

  return (
    <>
      <style>{`
        .ba-grades-section {
          background-color: #ffffff;
          font-family: 'Cairo', sans-serif;
          direction: rtl;
          padding: 40px 5vw 80px;
          color: #1B2B6B;
          min-height: 100vh;
          border-radius: 18px;
        }

        .ba-grades-container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .ba-breadcrumbs {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 30px;
          font-size: 14px;
          font-weight: 600;
          color: #666;
        }

        .ba-breadcrumbs a {
          color: #1B2B6B;
          text-decoration: none;
          transition: color 0.3s;
        }

        .ba-breadcrumbs a:hover {
          color: #8B1A3A;
        }

        .ba-breadcrumbs span.sep {
          color: #ddd;
        }

        .ba-grades-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .ba-grades-header h1 {
          font-size: clamp(34px, 5vw, 48px);
          font-weight: 900;
          color: #1B2B6B;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .ba-grades-header h1 span {
          color: #8B1A3A;
        }

        .ba-grades-header p {
          font-size: 18px;
          color: #666;
          font-weight: 600;
          margin: 0;
        }

        .ba-grades-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 25px;
        }

        .ba-grade-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 50px 30px;
          text-decoration: none;
          border: 2px solid #ffffff;
          box-shadow: 0 8px 25px rgba(139, 26, 58, 0.05);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          text-align: center;
        }

        .ba-grade-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(27, 43, 107, 0.1);
          border-color: #8B1A3A;
        }

        .ba-grade-img-wrapper {
          width: 100%;
          max-width: 280px;
          height: 240px;
          background: #fff4f2;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          transition: transform 0.4s ease;
          border: 1px solid rgba(139, 26, 58, 0.05);
        }

        .ba-grade-card:hover .ba-grade-img-wrapper {
          transform: scale(1.08);
        }

        .ba-grade-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.08));
        }

        .ba-grade-card h3 {
          font-size: 26px;
          font-weight: 800;
          color: #1B2B6B;
          margin: 0;
        }

        .ba-grade-btn {
          background: #f8f9ff;
          color: #8B1A3A;
          font-size: 15px;
          font-weight: 800;
          padding: 10px 24px;
          border-radius: 50px;
          margin-top: auto;
          transition: all 0.3s ease;
        }

        .ba-grade-card:hover .ba-grade-btn {
          background: #8B1A3A;
          color: #ffffff;
        }

        @media (max-width: 1000px) {
          .ba-grades-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .ba-grades-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }
        }

        @media (max-width: 480px) {
          .ba-grades-section {
            padding: 30px 4vw 60px;
          }

          .ba-grades-header h1 {
            font-size: 24px;
          }

          .ba-grades-grid {
            gap: 12px;
          }

          .ba-grade-card {
            padding: 15px 10px;
            border-radius: 16px;
          }

          .ba-grade-img-wrapper {
            height: 180px;
            padding: 8px;
          }

          .ba-grade-img {
            max-width: 150px;
          }

          .ba-grade-card h3 {
            font-size: 18px;
          }

          .ba-grade-btn {
            font-size: 11px;
            padding: 6px 12px;
          }
        }
      `}</style>
      <div className="ba-grades-section">
        <div className="ba-grades-container">
          <div className="ba-breadcrumbs">
            <Link href="/courses">المناهج</Link>
            <span className="sep">/</span>
            <span>{countryNames[country] || country}</span>
          </div>
          <div className="ba-grades-header">
            <h1>مو بس دروس .. هذا <span>مستقبل</span> نبدأ معك ونكمّل المشوار !</h1>
            <p>اختر صفك الدراسي لبدء رحلة النجاح مع بريلينت أكاديمي</p>
          </div>
          <div className="ba-grades-grid">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((g) => (
              <Link href={`/subjects?grade=${g}&country=${country}`} className="ba-grade-card" key={g}>
                <div className="ba-grade-img-wrapper">
                  <img src={gradeImages[g]} alt={`الصف ${getGradeName(g)}`} className="ba-grade-img" />
                </div>
                <h3>الصف {getGradeName(g)}</h3>
                <div className="ba-grade-btn">اختر المواد</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default function GradesPage() {
  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        <Suspense fallback={<div style={{ textAlign: "center", padding: "100px 20px", fontFamily: "Cairo" }}>جاري التحميل...</div>}>
          <GradesContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
