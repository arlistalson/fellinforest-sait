import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import worker, { validateInquiry, formatMessage } from "../src/index.js";

const ORIGIN = "https://fellinforest.ee";
const ENV = {
  TELEGRAM_BOT_TOKEN: "123:abc",
  TELEGRAM_CHAT_ID: "42",
  ALLOWED_ORIGINS: "https://fellinforest.ee,https://www.fellinforest.ee",
};

function form(fields) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.append(k, v);
  return fd;
}

const VALID = {
  name: "Mari Maasikas",
  phone: "+372 5555 5555",
  email: "mari@example.ee",
  katastritunnus: "12345:001:0001",
  huvi: "Raieõiguse müük",
  message: "Umbes 5 ha kuusikut.",
};

function post(fields, origin = ORIGIN) {
  return new Request("https://inquiry.example.workers.dev/", {
    method: "POST",
    headers: origin ? { Origin: origin } : {},
    body: form(fields),
  });
}

let realFetch;
let telegramCalls;
let telegramStatus;

beforeEach(() => {
  realFetch = globalThis.fetch;
  telegramCalls = [];
  telegramStatus = 200;
  globalThis.fetch = async (url, init) => {
    telegramCalls.push({ url, body: JSON.parse(init.body) });
    return new Response("{}", { status: telegramStatus });
  };
});

afterEach(() => {
  globalThis.fetch = realFetch;
});

function silenceErrors(fn) {
  return async () => {
    const original = console.error;
    console.error = () => {};
    try {
      await fn();
    } finally {
      console.error = original;
    }
  };
}

test("validateInquiry accepts a complete inquiry and trims values", () => {
  const result = validateInquiry(form({ ...VALID, name: "  Mari  " }));
  assert.equal(result.ok, true);
  assert.equal(result.inquiry.name, "Mari");
});

test("validateInquiry accepts an inquiry with only name and phone", () => {
  const result = validateInquiry(form({ name: "Mari", phone: "5555 5555" }));
  assert.equal(result.ok, true);
  assert.equal(result.inquiry.email, "");
});

test("validateInquiry rejects a missing phone", () => {
  const result = validateInquiry(form({ ...VALID, phone: "  " }));
  assert.equal(result.ok, false);
  assert.match(result.error, /phone/);
});

test("validateInquiry rejects a missing name", () => {
  const result = validateInquiry(form({ ...VALID, name: "" }));
  assert.equal(result.ok, false);
  assert.match(result.error, /name/);
});

test("validateInquiry rejects an invalid email when one is given", () => {
  const result = validateInquiry(form({ ...VALID, email: "not-an-email" }));
  assert.equal(result.ok, false);
  assert.match(result.error, /email/);
});

test("validateInquiry rejects over-long fields", () => {
  const result = validateInquiry(form({ ...VALID, message: "x".repeat(2001) }));
  assert.equal(result.ok, false);
  assert.match(result.error, /message/);
});

test("validateInquiry collapses line breaks in single-line fields but keeps them in message", () => {
  const result = validateInquiry(form({ ...VALID, name: "Mari\nTelefon: 000", message: "rida 1\nrida 2" }));
  assert.equal(result.inquiry.name, "Mari Telefon: 000");
  assert.equal(result.inquiry.message, "rida 1\nrida 2");
});

test("formatMessage lists filled fields and skips empty optional ones", () => {
  const text = formatMessage({ ...VALID, email: "", katastritunnus: "" });
  assert.match(text, /Mari Maasikas/);
  assert.match(text, /\+372 5555 5555/);
  assert.match(text, /Raieõiguse müük/);
  assert.match(text, /Umbes 5 ha kuusikut\./);
  assert.doesNotMatch(text, /E-post/);
  assert.doesNotMatch(text, /Katastritunnus/);
});

test("valid POST sends one Telegram message and returns success", async () => {
  const res = await worker.fetch(post(VALID), ENV);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { success: true, error: null });
  assert.equal(res.headers.get("Access-Control-Allow-Origin"), ORIGIN);
  assert.equal(telegramCalls.length, 1);
  assert.equal(telegramCalls[0].url, "https://api.telegram.org/bot123:abc/sendMessage");
  assert.equal(telegramCalls[0].body.chat_id, "42");
  assert.match(telegramCalls[0].body.text, /Mari Maasikas/);
});

test("www origin is allowed", async () => {
  const res = await worker.fetch(post(VALID, "https://www.fellinforest.ee"), ENV);
  assert.equal(res.status, 200);
});

test("filled honeypot pretends success without notifying", async () => {
  const res = await worker.fetch(post({ ...VALID, _gotcha: "bot" }), ENV);
  assert.equal(res.status, 200);
  assert.equal(telegramCalls.length, 0);
});

test("invalid inquiry returns 400 without notifying", async () => {
  const res = await worker.fetch(post({ ...VALID, phone: "" }), ENV);
  assert.equal(res.status, 400);
  assert.equal((await res.json()).success, false);
  assert.equal(telegramCalls.length, 0);
});

test("disallowed origin returns 403", async () => {
  const res = await worker.fetch(post(VALID, "https://evil.example"), ENV);
  assert.equal(res.status, 403);
  assert.equal(telegramCalls.length, 0);
});

test("non-POST methods return 405", async () => {
  const res = await worker.fetch(new Request("https://x.dev/", { headers: { Origin: ORIGIN } }), ENV);
  assert.equal(res.status, 405);
});

test("OPTIONS preflight from allowed origin returns 204 with CORS headers", async () => {
  const req = new Request("https://x.dev/", { method: "OPTIONS", headers: { Origin: ORIGIN } });
  const res = await worker.fetch(req, ENV);
  assert.equal(res.status, 204);
  assert.equal(res.headers.get("Access-Control-Allow-Origin"), ORIGIN);
});

test("rate-limited requests return 429 without notifying", async () => {
  const env = { ...ENV, INQUIRY_LIMITER: { limit: async () => ({ success: false }) } };
  const res = await worker.fetch(post(VALID), env);
  assert.equal(res.status, 429);
  assert.equal(telegramCalls.length, 0);
});

test("oversized body returns 413 without notifying", async () => {
  const res = await worker.fetch(post({ ...VALID, message: "x".repeat(20000) }), ENV);
  assert.equal(res.status, 413);
  assert.equal(telegramCalls.length, 0);
});

test(
  "Telegram failure returns 502 so the visitor sees the fallback",
  silenceErrors(async () => {
    telegramStatus = 401;
    const res = await worker.fetch(post(VALID), ENV);
    assert.equal(res.status, 502);
  }),
);

test(
  "network error reaching Telegram returns 502 with CORS headers",
  silenceErrors(async () => {
    globalThis.fetch = async () => {
      throw new Error("network down");
    };
    const res = await worker.fetch(post(VALID), ENV);
    assert.equal(res.status, 502);
    assert.equal(res.headers.get("Access-Control-Allow-Origin"), ORIGIN);
  }),
);

test(
  "missing Telegram secrets returns 500 without calling Telegram",
  silenceErrors(async () => {
    const res = await worker.fetch(post(VALID), { ...ENV, TELEGRAM_BOT_TOKEN: "" });
    assert.equal(res.status, 500);
    assert.equal(telegramCalls.length, 0);
  }),
);
