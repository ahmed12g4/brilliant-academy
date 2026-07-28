"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <style jsx>{`
        .ba-terms-wrapper { background-color: #ffffff; font-family: 'Cairo', sans-serif; direction: rtl; padding: 60px 5vw; color: #000; overflow-x: hidden; }
        .ba-terms-container { max-width: 1100px; margin: 0 auto; }
        .ba-terms-hero { display: flex; align-items: center; justify-content: space-between; gap: 60px; margin-bottom: 80px; text-align: right; }
        .ba-terms-hero-content { flex: 1; }
        .ba-terms-hero-content h1 { font-size: clamp(32px, 5vw, 42px); font-weight: 900; color: #000; margin: 0 0 20px 0; line-height: 1.2; }
        .ba-terms-hero-content p { font-size: 17px; color: #666; line-height: 1.8; font-weight: 500; max-width: 650px; margin: 0; }
        .ba-terms-heading-img { flex: 0 0 280px; position: relative; }
        .ba-terms-heading-img img { width: 100%; height: auto; display: block; border-radius: 12px; box-shadow: -15px 15px 0px #8b1a3a; }
        .ba-terms-points { display: flex; flex-direction: column; gap: 60px; text-align: right; }
        .ba-terms-point { display: block; width: 100%; }
        .ba-terms-point h2 { font-size: 28px; font-weight: 900; color: #000; margin: 0 0 15px 0; text-align: right; display: block; }
        .ba-terms-point p { font-size: 16px; color: #666; line-height: 1.8; font-weight: 500; margin: 0; max-width: 900px; text-align: right; display: block; }
        .ba-terms-footer { margin-top: 100px; text-align: right; padding-top: 40px; border-top: 1px solid #eee; }
        .ba-terms-footer h3 { font-size: 22px; font-weight: 900; color: #000; margin: 0 0 20px 0; }
        .ba-terms-footer p { font-size: 16px; color: #666; line-height: 1.8; font-weight: 500; margin: 0 0 8px 0; }
        .ba-terms-footer a { color: #000; text-decoration: underline; font-weight: 700; }
        @media (max-width: 850px) { .ba-terms-hero { flex-direction: column-reverse; text-align: center; gap: 40px; } .ba-terms-hero-content p { margin: 0 auto; } .ba-terms-heading-img { flex: 0 0 200px; max-width: 240px; } .ba-terms-point h2 { text-align: center; font-size: 24px; } .ba-terms-point p { text-align: center; font-size: 15px; margin: 0 auto; } .ba-terms-footer { text-align: center; } }
      `}</style>
      <Header />
      <div className="ba-terms-wrapper">
        <div className="ba-terms-container">
          <div className="ba-terms-hero">
            <div className="ba-terms-hero-content">
              <h1>الشروط والأحكام</h1>
              <p>أهلاً بكم في أكاديمية بريلينت! قبل البدء باستخدام خدماتنا، يُرجى قراءة هذه الشروط والأحكام بعناية.</p>
            </div>
            <div className="ba-terms-heading-img">
              <img src="https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69ad8943d130b9ff38ec0bfe.png" alt="Terms" />
            </div>
          </div>
          <div className="ba-terms-points">
            <div className="ba-terms-point"><h2>مقدمة الخدمات التعليمية .1</h2><p>تقدم أكاديمية بريلينت حصصاً ودروساً أونلاين فردية لطلاب المراحل الدراسية من الروضة وحتى الصف الثاني عشر في مختلف المواد الدراسية.</p></div>
            <div className="ba-terms-point"><h2>التسجيل والحساب .2</h2><p>للإستفادة من خدماتنا التعليمية، قد يُطلب منك تقديم بعض المعلومات الخاصة بك، ويجب تقديم معلومات دقيقة وكاملة أثناء عملية التسجيل.</p></div>
            <div className="ba-terms-point"><h2>الدفع .3</h2><p>تُستحق رسوم الكورسات عند الحجز. نقبل الدفع عبر وسائل الدفع الإلكتروني الآمنة. أسعار الكورسات مدرجة على موقعنا الإلكتروني.</p></div>
            <div className="ba-terms-point"><h2>الإلغاء أو التأجيل .4</h2><p>إذا كنت ترغب في إلغاء الكورس، يُرجى القيام بذلك قبل البدء لتجنب أي رسوم إلغاء.</p></div>
            <div className="ba-terms-point"><h2>السلوك .5</h2><p>أنت توافق على الالتزام بالسلوك اللائق والمحترم خلال الحصص.</p></div>
            <div className="ba-terms-point"><h2>تعديلات على الشروط .6</h2><p>نحتفظ بحقنا في تعديل أو تحديث هذه الشروط في أي وقت دون إشعار مسبق.</p></div>
          </div>
          <div className="ba-terms-footer">
            <h3>تواصل معنا</h3>
            <p>البريد الإلكتروني: <a href="mailto:Info@thebrilliant-academy.com">Info@thebrilliant-academy.com</a></p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
