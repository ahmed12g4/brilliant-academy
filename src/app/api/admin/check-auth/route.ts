export async function GET(request: NextRequest) {
  try {
    // Check auth via cookies (same as middleware)
    const password = request.cookies.get('admin_pass')?.value
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'غير مصرح للوصول' }, { status: 401 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: 'حدث خطأ في الخادم' }, { status: 500 })
  }
}