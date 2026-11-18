// Võtab vastu fellinforest.ee hinnapäringu vormi ja saadab selle Telegrami.

const MAX_LENGTHS = {
  name: 100,
  phone: 50,
  email: 200,
  katastritunnus: 200,
  huvi: 100,
  message: 2000,
};
const MULTILINE_FIELDS = ["message"];
const MAX_BODY_BYTES = 16 * 1024;
const REQUIRED_FIELDS = ["name", "phone"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LABELS = {
  name: "Nimi",
  phone: "Telefon",
  email: "E-post",
  katastritunnus: "Katastritunnus",
  huvi: "Huvi",
};

export function validateInquiry(formData) {
  const inquiry = Object.fromEntries(
    Object.keys(MAX_LENGTHS).map((field) => {
      const value = String(formData.get(field) ?? "");
      // Üherealised väljad ei saa Telegrami sõnumisse võltsridu lisada.
      const cleaned = MULTILINE_FIELDS.includes(field) ? value : value.replace(/\s+/g, " ");
      return [field, cleaned.trim()];
    }),
  );

  const missing = REQUIRED_FIELDS.find((field) => inquiry[field] === "");
  if (missing) return { ok: false, error: `Missing field: ${missing}` };

  const tooLong = Object.keys(MAX_LENGTHS).find((field) => inquiry[field].length > MAX_LENGTHS[field]);
  if (tooLong) return { ok: false, error: `Field too long: ${tooLong}` };

  if (inquiry.email !== "" && !EMAIL_PATTERN.test(inquiry.email)) {
    return { ok: false, error: "Invalid email" };
  }

  return { ok: true, inquiry };
}

export function formatMessage(inquiry) {
  const lines = Object.entries(LABELS)
    .filter(([field]) => inquiry[field])
    .map(([field, label]) => `${label}: ${inquiry[field]}`);
  const extra = inquiry.message ? ["", "Lisainfo:", inquiry.message] : [];
  return ["🌲 Uus hinnapäring – fellinforest.ee", "", ...lines, ...extra].join("\n");
}

function allowedOrigin(request, env) {
  const origin = request.headers.get("Origin") ?? "";
  const allowed = (env.ALLOWED_ORIGINS ?? "").split(",").map((o) => o.trim());
  return allowed.includes(origin) ? origin : null;
}

function json(status, error, origin) {
  const headers = { "Content-Type": "application/json" };
  if (origin) headers["Access-Control-Allow-Origin"] = origin;
  return new Response(JSON.stringify({ success: error === null, error }), { status, headers });
}

async function sendTelegram(env, text) {
  let res;
  try {
    res = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text }),
    });
  } catch (err) {
    console.error("Telegram sendMessage request failed", err.message);
    return false;
  }
  if (!res.ok) {
    console.error("Telegram sendMessage failed", res.status, await res.text());
  }
  return res.ok;
}

function preflight(origin) {
  if (!origin) return new Response(null, { status: 403 });
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Accept, Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
}

async function readForm(request) {
  const body = await request.arrayBuffer();
  if (body.byteLength > MAX_BODY_BYTES) return { status: 413, error: "Request too large" };
  try {
    const contentType = request.headers.get("Content-Type") ?? "";
    const formData = await new Response(body, { headers: { "Content-Type": contentType } }).formData();
    return { formData };
  } catch {
    return { status: 400, error: "Invalid form data" };
  }
}

export default {
  async fetch(request, env) {
    const origin = allowedOrigin(request, env);

    if (request.method === "OPTIONS") return preflight(origin);
    if (request.method !== "POST") return json(405, "Method not allowed", origin);
    if (!origin) return json(403, "Origin not allowed", null);

    if (env.INQUIRY_LIMITER) {
      const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
      const { success } = await env.INQUIRY_LIMITER.limit({ key: ip });
      if (!success) return json(429, "Too many requests", origin);
    }

    const { formData, status, error } = await readForm(request);
    if (!formData) return json(status, error, origin);

    // Meepott: botid täidavad peidetud välja; teeskleme edu, et nad edasi liiguksid.
    if (String(formData.get("_gotcha") ?? "") !== "") return json(200, null, origin);

    const result = validateInquiry(formData);
    if (!result.ok) return json(400, result.error, origin);

    if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
      console.error("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID secret is not set");
      return json(500, "Server not configured", origin);
    }

    const sent = await sendTelegram(env, formatMessage(result.inquiry));
    return sent ? json(200, null, origin) : json(502, "Notification failed", origin);
  },
};
