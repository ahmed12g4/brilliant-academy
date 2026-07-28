"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <style jsx>{`
        .ba-hero-container { width: 100%; background-color: transparent; padding-top: 30px; padding-bottom: 0; font-family: 'Cairo', sans-serif; direction: rtl; position: relative; }
        .ba-hero-container::before { content: ''; position: absolute; top: 200px; left: 0; right: 0; bottom: 0; background-color: #FFF4F2; z-index: -1; }
        .ba-hero-box { width: calc(100% - 40px); max-width: 1100px; margin: 0 auto; border-radius: 20px; position: relative; background: linear-gradient(135deg, #1B2B6B 0%, #2a3a8c 45%, #8B1A3A 100%); box-shadow: 0 16px 40px rgba(27,43,107,0.15); min-height: 380px; }
        .ba-hero-box::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: radial-gradient(#ffffff 1px, transparent 1px); background-size: 20px 20px; opacity: 0.05; z-index: 1; border-radius: 20px; }
        .ba-hero-img-wrap { position: relative; z-index: 3; width: 100%; display: flex; justify-content: center; align-items: flex-end; margin-top: -340px; pointer-events: none; }
        .ba-hero-img-wrap img { height: 700px; width: auto; max-width: 130%; object-fit: contain; display: block; filter: drop-shadow(0 -5px 25px rgba(27,43,107,0.3)); }
        @media (max-width: 860px) { .ba-hero-box { min-height: 280px; } .ba-hero-img-wrap { margin-top: -260px; } .ba-hero-img-wrap img { height: 550px; } }
        @media (max-width: 768px) {
          .ba-hero-container { padding-top: 20px; }
          .ba-hero-container::before { top: 150px; }
          .ba-hero-box { width: calc(100% - 24px); border-radius: 16px; min-height: 220px; }
          .ba-hero-img-wrap { margin-top: -220px; width: 100%; overflow: hidden; display: flex; justify-content: center; align-items: flex-end; padding-bottom: 25px; }
          .ba-hero-img-wrap img { height: 281px; width: auto; max-width: none; flex-shrink: 0; margin: 0; padding: 0; object-fit: contain; }
        }
        @media (max-width: 380px) { .ba-hero-container::before { top: 130px; } .ba-hero-box { min-height: 180px; } .ba-hero-img-wrap { margin-top: -180px; } .ba-hero-img-wrap img { height: 440px; } }
      `}</style>
      <section className="ba-hero-container">
        <div className="ba-hero-box"></div>
        <div className="ba-hero-img-wrap">
          <img src="https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aac62c7bdf382ab0999b64.png" alt="Brilliant Academy Hero Image" />
        </div>
        {isMobile && (
          <Link href="/courses" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #1B2B6B 0%, #8B1A3A 100%)",
            color: "white",
            textDecoration: "none",
            padding: "15px 45px",
            borderRadius: "18px",
            fontWeight: 800,
            fontSize: "19px",
            margin: "0 auto 40px",
            width: "fit-content",
            boxShadow: "0 10px 25px rgba(27, 43, 107, 0.2)",
            zIndex: 10,
            position: "relative" as const,
            fontFamily: "'Cairo', sans-serif"
          }}>ابدأ الآن</Link>
        )}
      </section>
    </>
  );
}
