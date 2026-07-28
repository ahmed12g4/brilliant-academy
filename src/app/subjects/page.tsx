"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getGradeName } from "@/lib/prices";

const IMAGES: Record<string, string> = {
  quran: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee30bace6472829e13e22.jpg",
  physics: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee30b4a2d887954d8c4b3.jpg",
  math: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee30b7c2702346932011a.jpg",
  geology: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee30b5a8a19c1b2c830e7.jpg",
  history: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee30bb9be7061ed0eddaf.jpg",
  biology: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee30c8d3eae3a31a71b47.jpg",
  mental: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee30bb9be704bb00eddb7.jpg",
  geography: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee30bbfc81f03f916a9a8.jpg",
  english: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee30b248bef45defd1667.jpg",
  islamic: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee30bbfc81fc7bf16a9a9.jpg",
  arabic: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee30bace6475935e13e29.jpg",
  science: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee30b5a8a19b7b8c830e8.jpg",
  chemistry: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee30b4a2d88111cd8c4af.jpg",
  french: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee30b8d3eae7beca71b2d.jpg",
  social: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aee2fe7c2702751431fefe.jpg",
};

const SUBJECT_GROUPS = {
  primary: [
    { name: "لغة عربية", img: IMAGES.arabic },
    { name: "لغة انجليزية", img: IMAGES.english },
    { name: "رياضيات", img: IMAGES.math },
    { name: "علوم", img: IMAGES.science },
    { name: "قرآن كـريم", img: IMAGES.quran },
    { name: "تربية إسلامية", img: IMAGES.islamic },
    { name: "حساب ذهني", img: IMAGES.mental },
    { name: "اجتماعيات", img: IMAGES.social },
  ],
  grade10: [
    { name: "لغة عربية", img: IMAGES.arabic },
    { name: "لغة انجليزية", img: IMAGES.english },
    { name: "رياضيات", img: IMAGES.math },
    { name: "فيزيـاء", img: IMAGES.physics },
    { name: "كيـميـاء", img: IMAGES.chemistry },
    { name: "أحيـاء", img: IMAGES.biology },
    { name: "قرآن كـريم", img: IMAGES.quran },
    { name: "تربية إسلامية", img: IMAGES.islamic },
    { name: "اجتماعيات", img: IMAGES.social },
  ],
  senior: [
    { name: "لغة عربية", img: IMAGES.arabic },
    { name: "لغة انجليزية", img: IMAGES.english },
    { name: "لغة فرنسية", img: IMAGES.french },
    { name: "رياضيات وإحصاء", img: IMAGES.math },
    { name: "فيزيـاء", img: IMAGES.physics },
    { name: "كيـميـاء", img: IMAGES.chemistry },
    { name: "أحيـاء", img: IMAGES.biology },
    { name: "قرآن كـريم", img: IMAGES.quran },
    { name: "تربية إسلامية", img: IMAGES.islamic },
    { name: "جيولوجيا", img: IMAGES.geology },
    { name: "جغرافيـا", img: IMAGES.geography },
    { name: "تاريـخ", img: IMAGES.history },
  ],
};

const countryNames: Record<string, string> = {
  Kuwait: "منهج الكويت",
  KSA: "منهج السعودية",
  Qatar: "منهج قطر",
  UAE: "منهج الإمارات",
};

function SubjectsContent() {
  const searchParams = useSearchParams();
  const grade = parseInt(searchParams.get("grade") || "1");
  const country = searchParams.get("country") || "Kuwait";

  let subjects = SUBJECT_GROUPS.primary;
  if (grade === 10) subjects = SUBJECT_GROUPS.grade10;
  else if (grade === 11 || grade === 12) subjects = SUBJECT_GROUPS.senior;

  return (
    <>
      <style>{`
        :root {
          --primary-navy: #1B2B6B;
          --accent-red: #8B1A3A;
        }

        .ba-subjects-section {
          background-color: #f5f5f5;
          padding: 40px 5vw 80px;
          text-align: center;
          min-height: 100vh;
        }

        .ba-subjects-container {
          max-width: 1200px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 24px;
          padding: 60px 40px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
        }

        .ba-subjects-header {
          margin-bottom: 50px;
        }

        .ba-subjects-header h1 {
          font-size: clamp(34px, 5vw, 48px);
          font-weight: 900;
          color: var(--primary-navy);
          margin-bottom: 15px;
        }

        .ba-subjects-header h1 span {
          color: var(--accent-red);
        }

        .ba-subjects-header p {
          font-size: 18px;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
        }

        .ba-subjects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .ba-subject-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 50px 30px;
          text-decoration: none;
          box-shadow: 0 8px 25px rgba(139, 26, 58, 0.05);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          border: 2px solid #ffffff;
        }

        .ba-subject-card:hover {
          transform: translateY(-10px);
          border-color: var(--accent-red);
          box-shadow: 0 15px 40px rgba(139, 26, 58, 0.1);
        }

        .ba-sub-img-wrapper {
          width: 100%;
          max-width: 250px;
          height: 200px;
          background: #fff4f2;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          transition: transform 0.4s ease;
          border: 1px solid rgba(139, 26, 58, 0.05);
        }

        .ba-subject-card:hover .ba-sub-img-wrapper {
          transform: scale(1.05);
        }

        .ba-sub-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 6px 15px rgba(0, 0, 0, 0.08));
        }

        .ba-subject-card h3 {
          font-size: 24px;
          font-weight: 800;
          color: var(--primary-navy);
          margin: 0;
        }

        .ba-sub-btn {
          background: #f8f9ff;
          color: var(--accent-red);
          font-size: 15px;
          font-weight: 800;
          padding: 10px 24px;
          border-radius: 50px;
          margin-top: auto;
          transition: all 0.3s ease;
        }

        .ba-subject-card:hover .ba-sub-btn {
          background: var(--accent-red);
          color: white;
        }

        @media (max-width: 650px) {
          .ba-subjects-section {
            padding: 20px 4vw 60px;
          }

          .ba-subjects-container {
            padding: 30px 15px;
            border-radius: 16px;
          }

          .ba-subjects-header h1 {
            font-size: 28px;
          }

          .ba-subjects-grid {
            grid-template-columns: 1fr;
            gap: 20px;
            max-width: 400px;
          }

          .ba-subject-card {
            padding: 30px 20px;
          }

          .ba-sub-img-wrapper {
            height: 150px;
          }
        }
      `}</style>
      <section className="ba-subjects-section">
        <div className="ba-subjects-container">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "30px", fontSize: "14px", fontWeight: 600, color: "#666", justifyContent: "flex-start" }}>
            <Link href="/courses" style={{ color: "#1B2B6B", textDecoration: "none" }}>المناهج</Link>
            <span style={{ color: "#ddd" }}>/</span>
            <Link href={`/grades?country=${country}`} style={{ color: "#1B2B6B", textDecoration: "none" }}>{countryNames[country] || "منهج الكويت"}</Link>
            <span style={{ color: "#ddd" }}>/</span>
            <span>الصف {getGradeName(grade)}</span>
          </div>
          <div className="ba-subjects-header">
            <h1>اختر المادة لـ <span>الصف {getGradeName(grade)}</span></h1>
            <p>اختر المادة للمتابعة مع أفضل مدرسي أكاديمية بريلينت</p>
          </div>
          <div className="ba-subjects-grid">
            {subjects.map((s) => (
              <Link href={`/pricing?grade=${grade}&country=${country}&subject=${encodeURIComponent(s.name)}`} className="ba-subject-card" key={s.name}>
                <div className="ba-sub-img-wrapper">
                  <img src={s.img} alt={s.name} className="ba-sub-img" />
                </div>
                <h3>{s.name}</h3>
                <div className="ba-sub-btn">عرض الكورسات</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default function SubjectsPage() {
  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        <Suspense fallback={<div style={{ textAlign: "center", padding: "100px 20px", fontFamily: "Cairo" }}>جاري التحميل...</div>}>
          <SubjectsContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
