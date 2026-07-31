import { NextRequest, NextResponse } from 'next/server'
import { getOrders } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    // Check auth via cookies (same as middleware)
    const password = req.cookies.get('admin_pass')?.value
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'غير مصرح للوصول' }, { status: 401 })
    }

    const orders = await getOrders()
    return NextResponse.json(orders)
  } catch (error: any) {
    console.error("Failed to fetch orders in API:", error)
    return NextResponse.json({ error: 'حدث خطأ في الخادم' }, { status: 500 })
  }
}
