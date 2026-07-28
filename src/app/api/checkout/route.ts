import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createOrder } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, packageId, grade, subject, country, priceAed } = body;

    if (!name || !email || !phone || !packageId || !grade || !subject) {
      return NextResponse.json({ error: "جميع الحقول مطلوبة" }, { status: 400 });
    }

    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes("xxx")) {
      return NextResponse.json({ error: "مفاتيح Stripe غير مضافة بعد. يرجى إضافة المفاتيح في ملف .env.local" }, { status: 500 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "aed",
            product_data: {
              name: `أكاديمية بريلينت - ${subject}`,
              description: `باقة ${packageId} - الصف ${grade} - ${country}`,
            },
            unit_amount: priceAed * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${siteUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/payment/cancel`,
      metadata: {
        student_name: name,
        student_phone: phone,
        country,
        grade: String(grade),
        subject,
        package_id: packageId,
      },
    });

    await createOrder({
      student_name: name,
      student_email: email,
      student_phone: phone,
      country,
      grade,
      subject,
      package_id: packageId,
      price_aed: priceAed,
      stripe_session_id: session.id,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: error.message || "حدث خطأ في الخادم" }, { status: 500 });
  }
}
