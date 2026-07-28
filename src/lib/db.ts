import { kv } from "@vercel/kv";

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
  const orderId = `order:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`;
  const newOrder = {
    id: orderId,
    ...order,
    currency: order.currency || "AED",
    status: "pending",
    created_at: new Date().toISOString(),
  };

  await kv.set(orderId, newOrder);
  await kv.set(`stripe:${order.stripe_session_id}`, orderId);

  return newOrder;
}

export async function updateOrderStatus(stripeSessionId: string, status: string, paymentIntent?: string) {
  const orderId = await kv.get<string>(`stripe:${stripeSessionId}`);
  if (!orderId) return;

  const order = await kv.get<any>(orderId);
  if (!order) return;

  order.status = status;
  if (paymentIntent) order.stripe_payment_intent = paymentIntent;

  await kv.set(orderId, order);
}

export async function getOrder(sessionId: string) {
  const orderId = await kv.get<string>(`stripe:${sessionId}`);
  if (!orderId) return null;
  return await kv.get<any>(orderId);
}
