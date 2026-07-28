"use client";
export default function WhyUs() {
  return (
    <>
      <style jsx>{`
        .why-section { padding: 100px 5vw; background-color: #ffffff; font-family: 'Cairo', sans-serif; direction: rtl; position: relative; overflow: hidden; border-radius: 18px; }
        .why-section::before, .why-section::after { content: ''; position: absolute; border-radius: 50%; opacity: 0.04; z-index: 0; }
        .why-section::before { width: 400px; height: 400px; background-color: #8B1A3A; top: -150px; right: -100px; }
        .why-section::after { width: 300px; height: 300px; background-color: #1B2B6B; bottom: -100px; left: -100px; }
        .why-container { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
        .why-header-box { text-align: center; margin-bottom: 70px; }
        .why-header-box h2 { font-size: 42px; font-weight: 900; color: #1B2B6B; line-height: 1.4; margin-bottom: 16px; }
        .why-header-box h2 span { color: #8B1A3A; background: rgba(139,26,58,0.08); padding: 4px 16px; border-radius: 12px; display: inline-block; transform: rotate(-2deg); }
        .why-header-box p { font-size: 20px; font-weight: 600; color: #666; max-width: 700px; margin: 0 auto; line-height: 1.6; }
        .why-cards-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; padding: 10px; }
        @media (max-width: 1100px) { .why-cards-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) { .why-cards-grid { grid-template-columns: 1fr; } }
        .why-card { background: #ffffff; border-radius: 24px; padding: 40px 30px 35px; position: relative; box-shadow: 0 10px 40px rgba(0,0,0,0.04); border: 2px solid transparent; transition: all 0.4s cubic-bezier(0.175,0.885,0.32,1.275); z-index: 1; }
        .why-card:hover { transform: translateY(-12px); }
        .why-icon-num { position: absolute; top: -24px; right: 30px; width: 55px; height: 55px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 900; color: #ffffff; border-radius: 16px; box-shadow: 0 8px 20px rgba(0,0,0,0.15); border: 4px solid #ffffff; }
        .why-card h3 { font-size: 22px; font-weight: 800; margin-top: 10px; margin-bottom: 16px; line-height: 1.3; }
        .why-card p { font-size: 15px; color: #555; line-height: 1.8; font-weight: 500; margin: 0; }
        .why-card:nth-child(1) .why-icon-num { background: linear-gradient(135deg, #1B2B6B, #3a4eb3); }
        .why-card:nth-child(1) h3 { color: #8B1A3A; }
        .why-card:nth-child(1):hover { border-color: rgba(139,26,58,0.2); box-shadow: 0 15px 45px rgba(139,26,58,0.1); }
        .why-card:nth-child(2) .why-icon-num { background: linear-gradient(135deg, #8B1A3A, #c02d53); }
        .why-card:nth-child(2) h3 { color: #1B2B6B; }
        .why-card:nth-child(2):hover { border-color: rgba(27,43,107,0.2); box-shadow: 0 15px 45px rgba(27,43,107,0.1); }
        .why-card:nth-child(3) .why-icon-num { background: linear-gradient(135deg, #1B2B6B, #3a4eb3); }
        .why-card:nth-child(3) h3 { color: #8B1A3A; }
        .why-card:nth-child(3):hover { border-color: rgba(139,26,58,0.2); box-shadow: 0 15px 45px rgba(139,26,58,0.1); }
        .why-card:nth-child(4) .why-icon-num { background: linear-gradient(135deg, #8B1A3A, #c02d53); }
        .why-card:nth-child(4) h3 { color: #1B2B6B; }
        .why-card:nth-child(4):hover { border-color: rgba(27,43,107,0.2); box-shadow: 0 15px 45px rgba(27,43,107,0.1); }
        @media (max-width: 992px) { .why-header-box h2 { font-size: 34px; } .why-header-box p { font-size: 18px; } }
        @media (max-width: 768px) { .why-section { padding: 70px 5vw; } .why-header-box { margin-bottom: 50px; } .why-header-box h2 { font-size: 28px; } .why-header-box h2 span { padding: 2px 10px; border-radius: 8px; } .why-header-box p { font-size: 16px; padding: 0 10px; } .why-cards-grid { gap: 40px; } .why-card { padding: 35px 20px 25px; } }
        @media (max-width: 480px) { .why-header-box h2 { font-size: 24px; } .why-card h3 { font-size: 20px; } .why-card p { font-size: 14px; } }
      `}</style>
      <section className="why-section">
        <div className="why-container">
          <div className="why-header-box">
            <h2>لماذا بريلينت <span>أكاديمي</span> هو الخيار الأفضل؟</h2>
            <p>نرافق الطالب خطوة بخطوة نحو النجاح في بيئة تعليمية متكاملة تضمن التفوق والتميز</p>
          </div>
          <div className="why-cards-grid">
            <div className="why-card">
              <div className="why-icon-num">01</div>
              <h3>الكادر التعليمي</h3>
              <p>نخبة من المعلمين المتخصصين وذوي الخبرة في تعليم مناهج الخليج، يقدّمون شرحاً مبسطاً يساعد الطالب على الفهم والتقدم بثقة.</p>
            </div>
            <div className="why-card">
              <div className="why-icon-num">02</div>
              <h3>الوقت</h3>
              <p>حرية اختيار الأيام والأوقات المناسبة للحصص بسهولة، بما يتوافق مع برنامج الطالب اليومي دون أي ضغط.</p>
            </div>
            <div className="why-card">
              <div className="why-icon-num">03</div>
              <h3>المتابعة المستمرة</h3>
              <p>متابعة مستوى الطالب بشكل مستمر مع تقارير دورية لولي الأمر توضح التقدم ونقاط القوة والجوانب التي تحتاج تطوير.</p>
            </div>
            <div className="why-card">
              <div className="why-icon-num">04</div>
              <h3>التدريس المتكامل</h3>
              <p>تدريس شامل يغطي شرح الدروس، حل الواجبات، وتجهيز الطالب للاختبارات القصيرة والنهائية لضمان أفضل النتائج.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
