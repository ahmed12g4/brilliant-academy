let kv: any = null;

try {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const kvModule = await import("@vercel/kv");
    kv = kvModule.kv;
  }
} catch {
  kv = null;
}

export async function createOrder(order: {
  student_name: string;
  student_email: string;
  student_phone: string;
  country: string;
  grade: number;
  subject: string;
  package_id: string;
  price_aed: number;
  currency?: string;
  stripe_session_id?: string;
}) {
  const newOrder = {
    id: `order:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`,
    ...order,
    currency: order.currency || "AED",
    status: "pending",
    created_at: new Date().toISOString(),
  };

  if (kv) {
    try {
      await kv.set(newOrder.id, newOrder);
      await kv.set(`stripe:${order.stripe_session_id}`, newOrder.id);
    } catch (e) {
      console.error("KV save failed:", e);
    }
  }

  return newOrder;
}

export async function updateOrderStatus(stripeSessionId: string, status: string, paymentIntent?: string) {
  if (!kv) return;
  try {
    const orderId = await kv.get(`stripe:${stripeSessionId}`);
    if (!orderId) return;
    const order = await kv.get(orderId);
    if (!order) return;
    order.status = status;
    if (paymentIntent) order.stripe_payment_intent = paymentIntent;
    await kv.set(orderId, order);
  } catch (e) {
    console.error("KV update failed:", e);
  }
}

export async function getOrder(sessionId: string) {
  if (!kv) return null;
  try {
    const orderId = await kv.get(`stripe:${sessionId}`);
    if (!orderId) return null;
    return await kv.get(orderId);
  } catch {
    return null;
  }
}
