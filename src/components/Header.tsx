"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest("#baBurger") && !target.closest("#baMobile")) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <style jsx global>{`
        .ba-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 28px;
          height: 90px;
          background: #ffffff;
          box-shadow: 0 4px 18px rgba(27, 43, 107, 0.08);
          font-family: 'Cairo', sans-serif;
          direction: rtl;
          position: fixed;
          top: 14px;
          left: 0;
          right: 0;
          margin: 0 auto;
          width: calc(100% - 40px);
          max-width: 1100px;
          border-radius: 18px;
          z-index: 99999999 !important;
          border-bottom: 0 !important;
        }

        body { padding-top: 120px !important; background-color: #ffffff !important; background-image: linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px) !important; background-size: 30px 30px !important; }
        section, header, nav { border-bottom: none !important; }

        @keyframes baLogoReveal3DPremium {
          0% { opacity: 0; transform: perspective(1000px) rotateX(45deg) rotateY(-35deg) scale(0.4) translateZ(-150px) translateY(-40px); filter: drop-shadow(0 0 0 rgba(27,43,107,0)) blur(10px); }
          40% { opacity: 1; transform: perspective(1000px) rotateX(-12deg) rotateY(15deg) scale(1.1) translateZ(50px) translateY(12px); filter: drop-shadow(0 25px 35px rgba(27,43,107,0.25)) blur(0px); }
          70% { transform: perspective(1000px) rotateX(6deg) rotateY(-8deg) scale(0.96) translateZ(-20px) translateY(-5px); filter: drop-shadow(0 15px 20px rgba(27,43,107,0.15)); }
          100% { opacity: 1; transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0) translateY(0); filter: drop-shadow(0 10px 15px rgba(27,43,107,0.1)); }
        }

        .ba-logo a { display: flex; align-items: center; text-decoration: none; }
        .ba-logo img { height: 120px; width: 200px; object-fit: contain; object-position: right center; display: block; opacity: 0; transform-origin: center; animation: baLogoReveal3DPremium 2.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .ba-links { display: flex; align-items: center; gap: 6px; list-style: none; margin: 0; padding: 0; }
        .ba-links a { text-decoration: none; color: #1B2B6B; font-size: 16px; font-weight: 700; padding: 8px 16px; border-radius: 10px; transition: background .2s, color .2s; font-family: 'Cairo', sans-serif; }
        .ba-links a:hover { background: #FFF4F2; color: #8B1A3A; }
        .ba-btn { background: #8B1A3A !important; color: #fff !important; padding: 10px 24px !important; border-radius: 24px !important; font-weight: 800 !important; margin-right: 8px; transition: background .25s !important; }
        .ba-btn:hover { background: #1B2B6B !important; color: #fff !important; }
        .ba-burger { display: none; flex-direction: column; justify-content: center; align-items: center; width: 46px; height: 46px; background: #FFF4F2; border: none; border-radius: 12px; cursor: pointer; gap: 6px; }
        .ba-burger span { display: block; width: 24px; height: 3px; background: #1B2B6B; border-radius: 4px; transition: all .35s cubic-bezier(.4, 0, .2, 1); transform-origin: center; }
        .ba-burger.open span:nth-child(1) { transform: translateY(9px) rotate(45deg); }
        .ba-burger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .ba-burger.open span:nth-child(3) { transform: translateY(-9px) rotate(-45deg); }
        .ba-mobile { position: fixed; top: 110px; left: 0; right: 0; margin: 0 auto; width: calc(100% - 40px); max-width: 1100px; background: #ffffff; border-radius: 18px; box-shadow: 0 12px 40px rgba(27,43,107,.12); border: 1px solid #f0e0de; z-index: 99999998 !important; max-height: 0; overflow: hidden; transition: max-height .4s ease; font-family: 'Cairo', sans-serif; direction: rtl; display: block; }
        .ba-mobile.open { max-height: 380px; }
        .ba-mobile ul { list-style: none; padding: 12px 16px 16px; display: flex; flex-direction: column; gap: 4px; margin: 0; }
        .ba-mobile ul li a { display: block; text-align: center; text-decoration: none; color: #1B2B6B; font-size: 16px; font-weight: 700; padding: 12px 16px; border-radius: 12px; transition: background .2s; font-family: 'Cairo', sans-serif; }
        .ba-mobile ul li a:hover { background: #FFF4F2; color: #8B1A3A; }
        .ba-mobile ul li a.mob-btn { background: #8B1A3A; color: #fff !important; text-align: center; font-weight: 800; margin-top: 6px; }
        .ba-mobile ul li a.mob-btn:hover { background: #1B2B6B; }

        @media (max-width: 768px) {
          body { padding-top: 130px !important; }
          .ba-nav { width: calc(100% - 24px); top: 14px; padding: 0 16px; height: 95px; background: rgba(255,255,255,0.98); backdrop-filter: blur(10px); }
          .ba-links { display: none !important; }
          .ba-burger { display: flex; }
          .ba-logo { flex: 1; }
          .ba-logo img { height: 60px; width: 70%; max-width: 180px; object-fit: contain; object-position: right; }
          .ba-mobile { top: 116px; width: calc(100% - 24px); }
        }
        @media (max-width: 420px) {
          body { padding-top: 110px !important; }
          .ba-nav { height: 85px; padding: 0 12px; }
          .ba-logo img { height: 60px; max-width: 150px; }
          .ba-mobile { top: 106px; }
        }
      `}</style>

      <nav className="ba-nav">
        <div className="ba-logo">
          <Link href="/">
            <img src="https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69afadb7c509a0bfb75719bb.png" alt="Brilliant Academy" />
          </Link>
        </div>
        <ul className="ba-links">
          <li><Link href="/">الرئيسية</Link></li>
          <li><Link href="/courses">المناهج</Link></li>
          <li><Link href="/about">من نحن</Link></li>
          <li><Link href="/contact">اتصل بنا</Link></li>
          <li><Link href="/courses" className="ba-btn">سجل الآن</Link></li>
        </ul>
        <button className={`ba-burger ${open ? "open" : ""}`} id="baBurger" onClick={() => setOpen(!open)} aria-label="القائمة">
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div className={`ba-mobile ${open ? "open" : ""}`} id="baMobile">
        <ul>
          <li><Link href="/" onClick={() => setOpen(false)}>الرئيسية</Link></li>
          <li><Link href="/courses" onClick={() => setOpen(false)}>المناهج</Link></li>
          <li><Link href="/about" onClick={() => setOpen(false)}>من نحن</Link></li>
          <li><Link href="/contact" onClick={() => setOpen(false)}>اتصل بنا</Link></li>
          <li><Link href="/courses" className="mob-btn" onClick={() => setOpen(false)}>سجل الآن</Link></li>
        </ul>
      </div>
    </>
  );
}
