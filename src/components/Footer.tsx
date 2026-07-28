"use client";
import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [waOpen, setWaOpen] = useState(false);

  return (
    <>
      <style jsx global>{`
        .ba-footer {
          background-color: #ffffff; color: #1B2B6B; font-family: 'Cairo', sans-serif; direction: rtl;
          padding: 50px 6vw 20px; position: relative; overflow: hidden; border: 1px solid rgba(27,43,107,0.08);
          border-radius: 18px; max-width: 1200px; margin: 20px auto;
        }
        .ba-footer::before { content: ''; position: absolute; top: -100px; right: -100px; width: 300px; height: 300px; background: radial-gradient(circle, rgba(255,244,242,1) 0%, rgba(255,244,242,0) 70%); z-index: 0; }
        .ba-footer::after { content: ''; position: absolute; bottom: -150px; left: -150px; width: 400px; height: 400px; background: radial-gradient(circle, rgba(27,43,107,0.03) 0%, rgba(27,43,107,0) 70%); z-index: 0; }
        .ba-foot-wrap { display: grid; grid-template-columns: 2fr 1.5fr 1fr; gap: 50px; position: relative; z-index: 2; border-bottom: 1px solid rgba(27,43,107,0.06); padding-bottom: 40px; margin-bottom: 30px; }
        .ba-foot-brand { display: flex; flex-direction: column; gap: 20px; }
        .ba-foot-logo img { height: 85px; width: auto; max-width: 100%; object-fit: contain; display: block; }
        .ba-foot-brand p { font-size: 15px; color: #555; line-height: 1.8; font-weight: 500; max-width: 340px; margin: 0; }
        .ba-foot-title { font-size: 20px; font-weight: 800; margin-bottom: 24px; color: #1B2B6B; position: relative; display: inline-block; }
        .ba-foot-title::after { content: ''; position: absolute; bottom: -10px; right: 0; width: 35px; height: 4px; background: #8B1A3A; border-radius: 4px; }
        .ba-foot-links ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 14px; }
        .ba-foot-links a { color: #555; text-decoration: none; font-size: 15px; font-weight: 700; transition: color 0.3s, transform 0.3s; display: inline-flex; align-items: center; gap: 8px; }
        .ba-foot-links a::before { content: '←'; font-size: 16px; color: #8B1A3A; opacity: 0; transform: translateX(-10px); transition: all 0.4s ease; }
        .ba-foot-links a:hover { color: #1B2B6B; transform: translateX(-5px); }
        .ba-foot-links a:hover::before { opacity: 1; transform: translateX(0); }
        .ba-social-icons { display: flex; gap: 16px; flex-wrap: wrap; }
        .ba-icon-btn { width: 45px; height: 45px; border-radius: 12px; background: #ffffff; border: 1px solid rgba(27,43,107,0.08); display: flex; align-items: center; justify-content: center; text-decoration: none; transition: all 0.3s ease; cursor: pointer; }
        .ba-icon-btn svg { width: 22px; height: 22px; transition: transform 0.3s ease, fill 0.3s ease; }
        .ba-icon-btn.whatsapp svg { fill: #25D366; width: 26px; height: 26px; transform: scale(1.15); }
        .ba-icon-btn.instagram svg { fill: #E1306C; }
        .ba-icon-btn.email svg { fill: #EA4335; }
        .ba-icon-btn.whatsapp:hover { background: rgba(37,211,102,0.08); border-color: rgba(37,211,102,0.3); }
        .ba-icon-btn.instagram:hover { background: rgba(225,48,108,0.08); border-color: rgba(225,48,108,0.3); }
        .ba-icon-btn.email:hover { background: rgba(234,67,53,0.08); border-color: rgba(234,67,53,0.3); }
        .ba-icon-btn:hover svg { transform: scale(1.1); }
        .ba-icon-btn.whatsapp:hover svg { transform: scale(1.25); }
        .ba-whatsapp-dropdown { position: relative; display: inline-flex; }
        .ba-whatsapp-dropdown .ba-icon-btn { cursor: pointer; }
        .ba-whatsapp-dropdown-content { display: none; position: absolute; bottom: calc(100% + 12px); left: auto; right: 0; transform: none; background: #ffffff; border-radius: 14px; box-shadow: 0 10px 40px rgba(0,0,0,0.12); padding: 8px; min-width: 190px; z-index: 100; border: 1px solid rgba(27,43,107,0.06); }
        .ba-whatsapp-dropdown-content.show { display: block; }
        .ba-whatsapp-dropdown-content a { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 10px; color: #333; font-size: 14px; font-weight: 700; text-decoration: none; direction: ltr; transition: background 0.2s ease; }
        .ba-whatsapp-dropdown-content a:hover { background: rgba(37,211,102,0.08); }
        .ba-whatsapp-dropdown-content a svg { width: 18px; height: 18px; fill: #25D366; flex-shrink: 0; }
        .ba-whatsapp-dropdown-arrow { position: absolute; bottom: -6px; left: auto; right: 20px; transform: rotate(45deg); width: 12px; height: 12px; background: #ffffff; border-right: 1px solid rgba(27,43,107,0.06); border-bottom: 1px solid rgba(27,43,107,0.06); }
        .ba-contact-email { display: inline-block; margin-top: 15px; color: #777; font-size: 14.5px; font-weight: 600; text-decoration: none; direction: ltr; transition: color 0.3s ease; white-space: nowrap; word-break: keep-all; }
        .ba-contact-email:hover { color: #1B2B6B; }
        .ba-copy { text-align: center; font-size: 14px; color: #888; font-weight: 600; position: relative; z-index: 2; }
        @media (max-width: 900px) { .ba-foot-wrap { grid-template-columns: 1fr 1fr; gap: 40px; } }
        @media (max-width: 600px) {
          .ba-footer { padding: 50px 5vw 25px; }
          .ba-foot-wrap { grid-template-columns: 1fr; text-align: right; gap: 40px; }
          .ba-foot-title::after { right: 0; left: auto; }
          .ba-foot-brand p { max-width: 100%; }
        }
      `}</style>

      <footer className="ba-footer">
        <div className="ba-foot-wrap">
          <div className="ba-foot-brand">
            <Link href="/" className="ba-foot-logo">
              <img src="https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69afadb7c509a0bfb75719bb.png" alt="أكاديمية بريليانت" />
            </Link>
            <p>نرافق أبناءكم خطوة بخطوة نحو النجاح والتميز من خلال بيئة تعليمية تفاعلية حديثة، ومعلمين متخصصين في مناهج الخليج.</p>
          </div>

          <div className="ba-foot-links">
            <h4 className="ba-foot-title">روابط سريعة</h4>
            <ul>
              <li><Link href="/">الرئيسية</Link></li>
              <li><Link href="/courses">المناهج</Link></li>
              <li><Link href="/about">من نحن</Link></li>
              <li><Link href="/contact">اتصل بنا</Link></li>
              <li><a href="https://portal.thebrilliant-academy.com">تسجيل الدخول</a></li>
              <li><Link href="/refund">سياسة الاسترجاع</Link></li>
              <li><Link href="/terms">الشروط والاحكام</Link></li>
            </ul>
          </div>

          <div className="ba-foot-social">
            <h4 className="ba-foot-title">تواصل معنا</h4>
            <div className="ba-social-icons">
              <div className="ba-whatsapp-dropdown">
                <div className="ba-icon-btn whatsapp" onClick={(e) => { e.stopPropagation(); setWaOpen(!waOpen); }} aria-label="واتساب">
                  <svg viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.441-1.273.606-1.446c.165-.173.359-.217.478-.217.119 0 .238.001.344.006.11.005.257-.038.402.316.149.362.508 1.239.553 1.331.045.093.075.201.015.321-.06.12-.09.194-.18.286-.09.092-.187.202-.27.283-.087.086-.178.18-.08.347.098.167.435.717.935 1.166.643.578 1.181.758 1.348.843.167.085.265.07.363-.042.098-.112.424-.493.538-.662.114-.17.228-.142.381-.085.153.057.969.458 1.136.541.167.083.278.125.318.195.04.07.04.404-.104.809z" /></svg>
                </div>
                <div className={`ba-whatsapp-dropdown-content ${waOpen ? "show" : ""}`}>
                  <a href="https://wa.me/962795842276" target="_blank" rel="noreferrer">
                    <svg viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771z"/></svg>
                    +962 7 9584 2276
                  </a>
                  <a href="https://wa.me/96596614017" target="_blank" rel="noreferrer">
                    <svg viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771z"/></svg>
                    +965 9661 4017
                  </a>
                  <div className="ba-whatsapp-dropdown-arrow"></div>
                </div>
              </div>
              <a href="https://www.instagram.com/thebrilliantacademy_?igsh=MW9keWM3dTN0b3ZwbA==" className="ba-icon-btn instagram" aria-label="إنستجرام" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a href="mailto:info@thebrilliant-academy.com" className="ba-icon-btn email" aria-label="إرسال إيميل">
                <svg viewBox="0 0 24 24"><path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" /></svg>
              </a>
            </div>
            <a href="mailto:info@thebrilliant-academy.com" className="ba-contact-email">info@thebrilliant-academy.com</a>
          </div>
        </div>
        <div className="ba-copy">جميع الحقوق محفوظة لصالح أكاديمية بريلينت &copy; 2026</div>
      </footer>
    </>
  );
}
