"use client";
import { useState } from "react";

const faqData = [
  { q: "هل الحصص فردية أم مجموعات؟", a: "جميع حصص بريلينت أكاديمي فردية ولا يوجد مجموعات لمراعاة الفروق التعليمية لكل طالب." },
  { q: "ما هي أوقات الحصص في المنصة؟", a: "الحصص متوفرة خلال الفترتين الصباحية والمسائية ، من الساعة 10 صباحاً وحتى الساعة 9 مساءاً." },
  { q: "ماهي مدة الكورس الواحد؟", a: "جميع كورسات المنصة مدتها 4 أسابيع يبدأ من تاريخ أول حصة." },
  { q: "هل يوجد وقت محدد للتسجيل؟", a: "لا يوجد وقت محدد للتسجيل ، جميع الكورسات متوفرة خلال السنة كاملة حتى في العطلة الربيعية والصيفية." },
  { q: "هل يوجد حصة تجريبية قبل التسجيل؟", a: "نعم يوجد حصة تجريبية مدتها 15 دقيقة لمادة واحدة من اختياركم." },
];

export default function FAQ() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <>
      <style jsx>{`
        .ba-faq-section { padding: 90px 5vw; background-color: #ffffff; font-family: 'Cairo', sans-serif; direction: rtl; position: relative; overflow: hidden; border-radius: 18px; }
        .ba-faq-container { max-width: 900px; margin: 0 auto; position: relative; z-index: 1; }
        .ba-faq-section::before { content: '?'; position: absolute; font-family: 'Cairo', sans-serif; font-weight: 900; font-size: 400px; color: #1B2B6B; opacity: 0.02; top: -100px; right: -50px; line-height: 1; z-index: 0; transform: rotate(15deg); }
        .ba-faq-header { text-align: center; margin-bottom: 50px; }
        .ba-faq-header h2 { font-size: 38px; font-weight: 900; color: #8B1A3A; line-height: 1.4; margin-bottom: 12px; }
        .ba-faq-header p { font-size: 18px; font-weight: 600; color: #666; }
        .ba-faq-list { display: flex; flex-direction: column; gap: 16px; }
        .ba-faq-item { background: #ffffff; border: 1px solid rgba(27,43,107,0.1); border-radius: 16px; transition: box-shadow 0.3s ease, border-color 0.3s ease; box-shadow: 0 4px 15px rgba(0,0,0,0.02); overflow: hidden; }
        .ba-faq-item.active { box-shadow: 0 10px 30px rgba(27,43,107,0.08); border-color: rgba(139,26,58,0.3); border-right: 5px solid #1B2B6B; }
        .ba-faq-btn { width: 100%; text-align: right; background: none; border: none; padding: 22px 24px; font-family: 'Cairo', sans-serif; font-size: 18px; font-weight: 700; color: #1B2B6B; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: color 0.3s ease; -webkit-tap-highlight-color: transparent; user-select: none; }
        .ba-faq-icon { width: 30px; height: 30px; background: #FFF4F2; color: #8B1A3A; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: bold; transition: transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275), background 0.3s; flex-shrink: 0; margin-right: 16px; }
        .ba-faq-item.active .ba-faq-icon { transform: rotate(45deg); background: #8B1A3A; color: #ffffff; }
        .ba-faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.35s ease-out; }
        .ba-faq-answer-inner { padding: 0 24px 22px 24px; }
        .ba-faq-answer p { margin: 0; font-size: 15px; color: #555; line-height: 1.8; font-weight: 500; border-top: 1px dashed rgba(27,43,107,0.1); padding-top: 15px; }
        @media (max-width: 768px) { .ba-faq-section { padding: 70px 5vw; } .ba-faq-header h2 { font-size: 28px; } .ba-faq-header p { font-size: 16px; } .ba-faq-btn { font-size: 16px; padding: 18px 20px; } .ba-faq-answer-inner { padding: 0 20px 20px 20px; } .ba-faq-answer p { font-size: 14.5px; } }
      `}</style>
      <section className="ba-faq-section">
        <div className="ba-faq-container">
          <div className="ba-faq-header">
            <h2>الاستفسارات الشائعة</h2>
            <p>كل ما تحتاج معرفته عن نظام الدراسة في أكاديمية بريلينت</p>
          </div>
          <div className="ba-faq-list">
            {faqData.map((item, i) => (
              <div className={`ba-faq-item ${activeIdx === i ? "active" : ""}`} key={i}>
                <button className="ba-faq-btn" onClick={() => setActiveIdx(activeIdx === i ? null : i)}>
                  {item.q}
                  <span className="ba-faq-icon">+</span>
                </button>
                <div className="ba-faq-answer" style={{ maxHeight: activeIdx === i ? "200px" : "0" }}>
                  <div className="ba-faq-answer-inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
