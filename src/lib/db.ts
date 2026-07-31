import { kv as vercelKv } from '@vercel/kv';
import fs from 'fs';
import path from 'path';

// Determine if we should use local JSON fallback (in development without KV credentials)
const useFallback = !process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN;

const FALLBACK_FILE = path.join(process.cwd(), 'kv_fallback.json');

// Initialize fallback file if it doesn't exist
if (useFallback && !fs.existsSync(FALLBACK_FILE)) {
  try {
    fs.writeFileSync(FALLBACK_FILE, JSON.stringify({ keys: {}, hashes: {} }, null, 2), 'utf8');
  } catch (e) {
    console.error("Failed to initialize local fallback DB file:", e);
  }
}

function readFallback() {
  if (!fs.existsSync(FALLBACK_FILE)) {
    return { keys: {}, hashes: {} };
  }
  try {
    const content = fs.readFileSync(FALLBACK_FILE, 'utf8');
    return JSON.parse(content || '{"keys":{},"hashes":{}}');
  } catch (e) {
    return { keys: {}, hashes: {} };
  }
}

function writeFallback(data: any) {
  try {
    fs.writeFileSync(FALLBACK_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error("Write fallback failed:", e);
  }
}

// Export custom kv object mimicking @vercel/kv API with fallback support
export const kv = {
  async get(key: string) {
    if (!useFallback) {
      try {
        return await vercelKv.get(key);
      } catch (e) {
        console.error("Vercel KV get error, falling back:", e);
      }
    }
    const data = readFallback();
    return data.keys[key] ?? null;
  },

  async set(key: string, value: any) {
    if (!useFallback) {
      try {
        return await vercelKv.set(key, value);
      } catch (e) {
        console.error("Vercel KV set error, falling back:", e);
      }
    }
    const data = readFallback();
    data.keys[key] = value;
    writeFallback(data);
    return 'OK';
  },

  async keys(pattern: string) {
    if (!useFallback) {
      try {
        return await vercelKv.keys(pattern);
      } catch (e) {
        console.error("Vercel KV keys error, falling back:", e);
      }
    }
    const data = readFallback();
    const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
    return Object.keys(data.keys).filter(k => regex.test(k));
  },

  async hget(key: string, field: string) {
    if (!useFallback) {
      try {
        return await vercelKv.hget(key, field);
      } catch (e) {
        console.error("Vercel KV hget error, falling back:", e);
      }
    }
    const data = readFallback();
    const hash = data.hashes[key] || {};
    return hash[field] ?? null;
  },

  async hset(key: string, fields: Record<string, any>) {
    if (!useFallback) {
      try {
        return await vercelKv.hset(key, fields);
      } catch (e) {
        console.error("Vercel KV hset error, falling back:", e);
      }
    }
    const data = readFallback();
    if (!data.hashes[key]) {
      data.hashes[key] = {};
    }
    for (const [field, value] of Object.entries(fields)) {
      data.hashes[key][field] = value;
    }
    writeFallback(data);
    return Object.keys(fields).length;
  },

  async hdel(key: string, field: string) {
    if (!useFallback) {
      try {
        return await vercelKv.hdel(key, field);
      } catch (e) {
        console.error("Vercel KV hdel error, falling back:", e);
      }
    }
    const data = readFallback();
    if (data.hashes[key] && data.hashes[key][field] !== undefined) {
      delete data.hashes[key][field];
      writeFallback(data);
      return 1;
    }
    return 0;
  },

  async hgetall(key: string) {
    if (!useFallback) {
      try {
        return await vercelKv.hgetall(key);
      } catch (e) {
        console.error("Vercel KV hgetall error, falling back:", e);
      }
    }
    const data = readFallback();
    return data.hashes[key] ?? null;
  }
};

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

  try {
    await kv.set(newOrder.id, newOrder);
    if (order.stripe_session_id) {
      await kv.set(`stripe:${order.stripe_session_id}`, newOrder.id);
    }
  } catch (e) {
    console.error("KV save failed:", e);
  }

  return newOrder;
}

export async function updateOrderStatus(stripeSessionId: string, status: string, paymentIntent?: string) {
  try {
    const orderId = await kv.get(`stripe:${stripeSessionId}`) as string | null;
    if (!orderId) return;
    const order = await kv.get(orderId) as any;
    if (!order) return;
    order.status = status;
    if (paymentIntent) order.stripe_payment_intent = paymentIntent;
    await kv.set(orderId, order);
  } catch (e) {
    console.error("KV update failed:", e);
  }
}

export async function getOrder(sessionId: string) {
  try {
    const orderId = await kv.get(`stripe:${sessionId}`) as string | null;
    if (!orderId) return null;
    return await kv.get(orderId);
  } catch {
    return null;
  }
}

export async function getOrders() {
  try {
    const keys = await kv.keys("order:*");
    if (!keys || keys.length === 0) return [];
    
    const orders: any[] = [];
    for (const key of keys) {
      const order = await kv.get(key);
      if (order) {
        orders.push(order);
      }
    }
    // Sort by created_at descending
    return orders.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  } catch (e) {
    console.error("Failed to fetch orders:", e);
    return [];
  }
}
