import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { cookies } from 'next/headers'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const cookieStore = await cookies()
  const passwordCookie = cookieStore.get('admin_pass')
  
  if (passwordCookie && ADMIN_PASSWORD) {
    return passwordCookie.value === ADMIN_PASSWORD
  }
  
  const authHeader = request.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7)
    if (token === ADMIN_PASSWORD) {
      return true
    }
  }
  
  return false
}

function calculateExpiresAt(hours: number): number {
  return Math.floor(Date.now() / 1000) + (hours * 60 * 60)
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'غير مصرح بالدخول' }, { status: 401 })
  }

  try {
    const { 
      course_name, 
      price_aed, 
      currency = "aed", 
      description, 
      grade, 
      subject, 
      country,
      expires_in_hours = 24
    } = await request.json()
    
    if (!course_name || !price_aed) {
      return NextResponse.json({ error: "اسم الكورس والسعر مطلوبان" }, { status: 400 })
    }
    
    const unitAmount = Math.round(price_aed * 100)
    const expiresAt = calculateExpiresAt(expires_in_hours)
    
    const stripeProduct = await stripe.products.create({
      name: course_name,
      description: description || `كورس ${course_name} - ${country || 'الإمارات'} (${grade || ''} - ${subject || ''})`,
      metadata: {
        course_name,
        price_aed,
        currency,
        grade: grade || '',
        subject: subject || '',
        country: country || '',
        expires_in_hours: expires_in_hours.toString()
      }
    })
    
    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      currency: currency.toLowerCase(),
      unit_amount: Math.round(price_aed * 100),
      metadata: {
        course_name,
        price_aed,
        currency,
        grade: grade || '',
        subject: subject || '',
        country: country || '',
        expires_in_hours: expires_in_hours.toString()
      }
    })
    
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{
        price: stripePrice.id,
        quantity: 1,
      }],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}&product=${stripeProduct.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/cancel`,
      expires_at: Math.floor(Date.now() / 1000) + (expires_in_hours * 60 * 60),
      metadata: {
        course_name,
        price_aed,
        currency,
        stripe_product_id: stripeProduct.id,
        stripe_price_id: stripePrice.id,
        expires_in_hours: expires_in_hours.toString()
      }
    })
    
    return NextResponse.json({
      success: true,
      product_id: stripeProduct.id,
      price_id: stripePrice.id,
      checkout_url: checkoutSession.url,
      expires_at: checkoutSession.expires_at,
      expires_in_hours,
      course_name,
      price_aed,
      currency,
      message: 'تم إنشاء رابط الدفع بنجاح في Stripe'
    })
  } catch (error) {
    console.error('خطأ في إنشاء رابط الدفع:', error)
    return NextResponse.json({ error: 'فشل في إنشاء رابط الدفع' }, { status: 500 })
  }
}