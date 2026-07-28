"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <style jsx>{`
        .ba-about-page { font-family: 'Cairo', sans-serif; direction: rtl; background-color: #fdfdfd; overflow-x: hidden; padding-bottom: 60px; }
        .ba-about-intro { background: linear-gradient(135deg, #8B1A3A 0%, #a22146 100%); color: #ffffff; padding: 90px 5vw; border-radius: 0 0 40px 40px; position: relative; overflow: hidden; text-align: center; box-shadow: 0 10px 30px rgba(139,26,58,0.15); }
        .ba-about-intro::before { content: ''; position: absolute; top: -60px; right: -60px; width: 250px; height: 250px; background-image: radial-gradient(circle, rgba(255,255,255,0.1) 10%, transparent 20%); background-size: 20px 20px; transform: rotate(15deg); z-index: 0; }
        .ba-intro-content { max-width: 900px; margin: 0 auto; position: relative; z-index: 1; }
        .ba-intro-content h1 { font-size: 42px; font-weight: 900; margin-bottom: 24px; line-height: 1.3; }
        .ba-intro-content p { font-size: 20px; font-weight: 600; line-height: 1.8; color: rgba(255,255,255,0.95); margin: 0; }
        .ba-vm-section { padding: 80px 5vw; max-width: 1100px; margin: -40px auto 0; position: relative; z-index: 2; }
        .ba-vm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
        .ba-vm-card { background: #ffffff; padding: 50px 40px; border-radius: 24px; box-shadow: 0 15px 40px rgba(27,43,107,0.04); border: 1px solid rgba(27,43,107,0.03); transition: transform 0.3s ease, box-shadow 0.3s ease; position: relative; overflow: hidden; }
        .ba-vm-card:hover { transform: translateY(-5px); box-shadow: 0 20px 50px rgba(27,43,107,0.08); }
        .ba-vm-card::before { content: ''; position: absolute; top: 0; right: 0; width: 100%; height: 5px; background: linear-gradient(90deg, #1B2B6B, #3a4eb3); }
        .ba-vm-card:nth-child(2)::before { background: linear-gradient(90deg, #8B1A3A, #be224e); }
        .ba-vm-icon { width: 70px; height: 70px; background: rgba(27,43,107,0.05); border-radius: 20px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; color: #1B2B6B; }
        .ba-vm-card:nth-child(2) .ba-vm-icon { background: rgba(139,26,58,0.05); color: #8B1A3A; }
        .ba-vm-icon svg { width: 35px; height: 35px; fill: currentColor; }
        .ba-vm-card h3 { font-size: 26px; font-weight: 800; color: #1B2B6B; margin-bottom: 16px; }
        .ba-vm-card:nth-child(2) h3 { color: #8B1A3A; }
        .ba-vm-card p { font-size: 16px; font-weight: 500; color: #555; line-height: 1.8; margin: 0; }
        .ba-start-section { padding: 40px 5vw 80px; max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: center; }
        .ba-start-content h2 { font-size: 36px; font-weight: 900; color: #1B2B6B; margin-bottom: 20px; line-height: 1.3; }
        .ba-start-content p { font-size: 17px; font-weight: 500; color: #555; line-height: 1.9; margin-bottom: 30px; }
        .ba-start-image { position: relative; text-align: center; }
        .ba-start-image img { position: relative; z-index: 1; width: 100%; max-width: 500px; height: auto; object-fit: contain; border-radius: 20px; }
        @media (max-width: 900px) { .ba-vm-grid { grid-template-columns: 1fr; } .ba-start-section { grid-template-columns: 1fr; text-align: center; } .ba-about-intro { padding: 70px 5vw 80px; } .ba-intro-content h1 { font-size: 32px; } .ba-intro-content p { font-size: 18px; } }
        @media (max-width: 480px) { .ba-intro-content h1 { font-size: 28px; } .ba-intro-content p { font-size: 16px; } .ba-vm-card { padding: 35px 25px; } .ba-start-content h2 { font-size: 28px; } }
      `}</style>
      <Header />
      <div className="ba-about-page">
        <section className="ba-about-intro">
          <div className="ba-intro-content">
            <h1>منصة بريلينت أكاديمي</h1>
            <p>هي منصة تعليمية بطاقم تعليمي أردني ، في منصة بريلينت أكاديمي نؤمن بأن كل طالب يستحق تعلّمًا يناسبه. ولهذا السبب نقوم بتقديم دروسًا فردية لطلاب مناهج دول الخليج بأسلوب مبسّط وفعّال مع متابعة مستمرة.</p>
          </div>
        </section>
        <section className="ba-vm-section">
          <div className="ba-vm-grid">
            <div className="ba-vm-card">
              <div className="ba-vm-icon"><svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /></svg></div>
              <h3>رؤيتنا</h3>
              <p>نسعى في بريلينت أكاديمي لتغيير الفكرة الخاطئة المأخوذة عن حصص الأون لاين وتهيئة بيئة تعليمية مناسبة للطالب تمكّنه من التعلم بطريقة ذكية وسهلة وواضحة وتناسب الفروقات الفردية.</p>
            </div>
            <div className="ba-vm-card">
              <div className="ba-vm-icon"><svg viewBox="0 0 24 24"><path d="M19.36 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96z" /><circle cx="12" cy="14" r="3" fill="currentColor" /><path d="M12 7l-4 4h8z" fill="currentColor" /></svg></div>
              <h3>أهدافنا</h3>
              <p>نهدف إلى زيادة قاعدة طلابنا من دول الخليج العربي وتقديم تعليم شامل يناسب مناهجهم ويلبي احتياجات الطلاب في هذه المناطق.</p>
            </div>
          </div>
        </section>
        <section className="ba-start-section">
          <div className="ba-start-content">
            <h2>ابدأ معنا الآن</h2>
            <p>ندعوكم للانضمام إلى بريلينت أكاديمي ، منصة تعليمية أونلاين صُممت لتقديم تجربة تعلم مميزة لطلاب دول الخليج.</p>
          </div>
          <div className="ba-start-image">
            <img src="https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69acb07fb003fa6b9a242163.png" alt="ابدأ معنا" />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
