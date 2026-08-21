import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";
import { createGhlContact } from "@/lib/ghl";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
    website?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const { name, email, phone, message } = body;

  if (!name || !email || !EMAIL_RE.test(email) || !phone) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  // Honeypot: se o cliente ainda mandar esse campo preenchido (bot que não roda JS
  // de verdade, ou reenviou o payload direto), retorna sucesso falso sem chamar o GHL.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const { env } = getCloudflareContext();
  const result = await createGhlContact(env as Record<string, string | undefined>, {
    name,
    email,
    phone,
    message,
    source: "SITE_TRIBUNAL_CONTATO",
    tags: ["site-contato"],
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
