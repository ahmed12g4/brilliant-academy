"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RefundPage() {
  return (
    <>
      <style jsx>{`
        .ba-refund-wrapper { background-color: #ffffff; font-family: 'Cairo', sans-serif; direction: rtl; padding: 60px 5vw; color: #000; overflow-x: hidden; }
        .ba-refund-container { max-width: 1100px; margin: 0 auto; }
        .ba-refund-hero { display: flex; align-items: center; justify-content: space-between; gap: 60px; margin-bottom: 80px; text-align: right; }
        .ba-refund-hero-content { flex: 1; }
        .ba-refund-hero-content h1 { font-size: clamp(32px, 5vw, 42px); font-weight: 900; color: #000; margin: 0 0 20px 0; line-height: 1.2; }
        .ba-refund-hero-content p { font-size: 17px; color: #666; line-height: 1.8; font-weight: 500; max-width: 650px; margin: 0; }
        .ba-refund-heading-img { flex: 0 0 280px; position: relative; }
        .ba-refund-heading-img img { width: 100%; height: auto; display: block; border-radius: 12px; box-shadow: -15px 15px 0px #1B2B6B; }
        .ba-refund-points { display: flex; flex-direction: column; gap: 60px; text-align: right; }
        .ba-refund-point { display: block; width: 100%; }
        .ba-refund-point h2 { font-size: 28px; font-weight: 900; color: #000; margin: 0 0 15px 0; text-align: right; display: block; }
        .ba-refund-point p { font-size: 16px; color: #666; line-height: 1.8; font-weight: 500; margin: 0; max-width: 900px; text-align: right; display: block; }
        .ba-refund-footer { margin-top: 100px; text-align: right; padding-top: 40px; border-top: 1px solid #eee; }
        .ba-refund-footer h3 { font-size: 22px; font-weight: 900; color: #000; margin: 0 0 20px 0; }
        .ba-refund-footer p { font-size: 16px; color: #666; line-height: 1.8; font-weight: 500; margin: 0 0 8px 0; }
        .ba-refund-footer a { color: #000; text-decoration: underline; font-weight: 700; }
        @media (max-width: 850px) { .ba-refund-hero { flex-direction: column-reverse; text-align: center; gap: 40px; } .ba-refund-hero-content p { margin: 0 auto; } .ba-refund-heading-img { flex: 0 0 200px; max-width: 240px; } .ba-refund-point h2 { text-align: center; font-size: 24px; } .ba-refund-point p { text-align: center; font-size: 15px; margin: 0 auto; } .ba-refund-footer { text-align: center; } }
      `}</style>
      <Header />
      <div className="ba-refund-wrapper">
        <div className="ba-refund-container">
          <div className="ba-refund-hero">
            <div className="ba-refund-hero-content">
              <h1>سياسة استرجاع الأموال</h1>
              <p>في أكاديمية بريلينت، نسعى جاهدين لتقديم دروس تعليمية عالية الجودة لطلابنا. مع ذلك، نتفهم أنه قد توجد ظروف تستدعي طلب استرجاع الأموال.</p>
            </div>
            <div className="ba-refund-heading-img">
              <img src="https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69ad890ebfc81fde3fe39ef4.png" alt="Refund" />
            </div>
          </div>
          <div className="ba-refund-points">
            <div className="ba-refund-point"><h2>سياسة الإلغاء .1</h2><p>في حال رغبتكم في إلغاء الكورس، يُرجى القيام بذلك قبل البدء به لتجنب أي رسوم إلغاء إضافية قد تُطبق.</p></div>
            <div className="ba-refund-point"><h2>سياسة استرجاع الرسوم .2</h2><p>نوفر في البداية حصة تجريبية مجانية للتأكد من ملاءمة الكورس لمتطلبات الطالب. وبمجرد بدء الكورس رسمياً، لا يتوفر خيار استرجاع الرسوم.</p></div>
            <div className="ba-refund-point"><h2>عملية استرجاع الرسوم .3</h2><p>بعد استلام طلب استرجاع أموالك عند إلغاء أي كورس (قبل البدء)، سيتواصل معك فريقنا للحصول على معلوماتك البنكية. سيتم معالجة الطلب خلال 5 أيام عمل.</p></div>
          </div>
          <div className="ba-refund-footer">
            <h3>تواصل معنا</h3>
            <p>البريد الإلكتروني: <a href="mailto:Info@thebrilliant-academy.com">Info@thebrilliant-academy.com</a></p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
