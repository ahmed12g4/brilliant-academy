"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <style jsx>{`
        .ba-contact-page { font-family: 'Cairo', sans-serif; direction: rtl; background-color: #fdfdfd; overflow-x: hidden; padding-bottom: 80px; }
        .ba-contact-intro { background: linear-gradient(135deg, #1B2B6B 0%, #2a3a8c 100%); color: #ffffff; padding: 90px 5vw; border-radius: 0 0 40px 40px; position: relative; overflow: hidden; text-align: center; box-shadow: 0 10px 30px rgba(27,43,107,0.15); }
        .ba-contact-intro::before { content: ''; position: absolute; bottom: -50px; left: -50px; width: 300px; height: 300px; background-image: radial-gradient(circle, rgba(255,255,255,0.05) 10%, transparent 20%); background-size: 30px 30px; z-index: 0; }
        .ba-contact-content { max-width: 800px; margin: 0 auto; position: relative; z-index: 1; }
        .ba-contact-content h1 { font-size: 42px; font-weight: 900; margin-bottom: 24px; line-height: 1.3; }
        .ba-contact-content p { font-size: 20px; font-weight: 600; line-height: 1.8; color: rgba(255,255,255,0.9); margin: 0; }
        .ba-info-section { padding: 60px 5vw 0; max-width: 1000px; margin: -50px auto 0; position: relative; z-index: 2; display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
        .ba-info-card { background: #ffffff; padding: 40px 30px; border-radius: 24px; box-shadow: 0 15px 40px rgba(27,43,107,0.05); border: 1px solid rgba(27,43,107,0.03); text-align: center; transition: transform 0.3s ease, box-shadow 0.3s ease; position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; text-decoration: none; }
        .ba-info-card:hover { transform: translateY(-8px); box-shadow: 0 20px 50px rgba(27,43,107,0.1); }
        .ba-info-card::after { content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 6px; background: linear-gradient(90deg, #1B2B6B, #3a4eb3); }
        .ba-info-card.whatsapp::after { background: linear-gradient(90deg, #25D366, #128C7E); }
        .ba-info-card.email-card::after { background: linear-gradient(90deg, #8B1A3A, #be224e); }
        .ba-info-icon { width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; transition: transform 0.3s ease; }
        .ba-info-card:hover .ba-info-icon { transform: scale(1.1); }
        .ba-info-card.email-card .ba-info-icon { background: rgba(139,26,58,0.06); color: #8B1A3A; }
        .ba-info-card.whatsapp .ba-info-icon { background: rgba(37,211,102,0.08); color: #25D366; }
        .ba-info-card.location .ba-info-icon { background: rgba(27,43,107,0.06); color: #1B2B6B; }
        .ba-info-icon svg { width: 36px; height: 36px; fill: currentColor; }
        .ba-info-card h3 { font-size: 22px; font-weight: 800; margin-bottom: 12px; color: #333; }
        .ba-info-card span { font-size: 17px; font-weight: 600; color: #666; margin: 0; direction: ltr; }
        .ba-info-card.location p { direction: rtl; font-size: 17px; font-weight: 600; color: #666; }
        .ba-whatsapp-numbers { display: flex; flex-direction: column; gap: 8px; margin-top: 4px; }
        .ba-whatsapp-numbers a { font-size: 17px; font-weight: 600; color: #25D366; text-decoration: none; transition: color 0.2s ease; direction: ltr; }
        .ba-whatsapp-numbers a:hover { color: #128C7E; }
        @media (max-width: 900px) { .ba-info-section { grid-template-columns: 1fr; max-width: 500px; margin-top: -30px; } .ba-contact-intro { padding: 70px 5vw 80px; } .ba-contact-content h1 { font-size: 34px; } }
        @media (max-width: 480px) { .ba-contact-content h1 { font-size: 28px; } .ba-contact-content p { font-size: 16px; } .ba-info-card { padding: 35px 25px; } .ba-info-card h3 { font-size: 20px; } .ba-info-card span { font-size: 15px; } .ba-whatsapp-numbers a { font-size: 15px; } }
      `}</style>
      <Header />
      <div className="ba-contact-page">
        <section className="ba-contact-intro">
          <div className="ba-contact-content">
            <h1>تواصل معنا الآن</h1>
            <p>فريقنا متخصص وجاهز للإجابة عن جميع استفساراتكم ومساعدتكم في أي وقت.</p>
          </div>
        </section>
        <section className="ba-info-section">
          <a href="mailto:Info@thebrilliant-academy.com" className="ba-info-card email-card">
            <div className="ba-info-icon"><svg viewBox="0 0 24 24"><path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" /></svg></div>
            <h3>البريد الإلكتروني</h3>
            <span>Info@thebrilliant-academy.com</span>
          </a>
          <div className="ba-info-card whatsapp">
            <div className="ba-info-icon"><svg viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.441-1.273.606-1.446c.165-.173.359-.217.478-.217.119 0 .238.001.344.006.11.005.257-.038.402.316.149.362.508 1.239.553 1.331.045.093.075.201.015.321-.06.12-.09.194-.18.286-.09.092-.187.202-.27.283-.087.086-.178.18-.08.347.098.167.435.717.935 1.166.643.578 1.181.758 1.348.843.167.085.265.07.363-.042.098-.112.424-.493.538-.662.114-.17.228-.142.381-.085.153.057.969.458 1.136.541.167.083.278.125.318.195.04.07.04.404-.104.809z" /></svg></div>
            <h3>واتساب</h3>
            <div className="ba-whatsapp-numbers">
              <a href="https://wa.me/962795842276" target="_blank" rel="noreferrer">+962 7 9584 2276</a>
              <a href="https://wa.me/96596614017" target="_blank" rel="noreferrer">+965 9661 4017</a>
            </div>
          </div>
          <div className="ba-info-card location">
            <div className="ba-info-icon"><svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg></div>
            <h3>العنوان</h3>
            <p>نصل إليكم أينما كنتم</p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
