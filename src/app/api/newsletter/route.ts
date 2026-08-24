import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";
import { upsertGhlContact } from "@/lib/ghl";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: {
    name?: string;
    email?: string;
    phone?: string;
    website?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const { name, email, phone } = body;

  if (!name || !email || !EMAIL_RE.test(email) || !phone) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  // Honeypot: se o cliente ainda mandar esse campo preenchido (bot que não roda JS
  // de verdade, ou reenviou o payload direto), retorna sucesso falso sem chamar o GHL.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const { env } = getCloudflareContext();
  const result = await upsertGhlContact(env as Record<string, string | undefined>, {
    name,
    email,
    phone,
    source: "SITE_TRIBUNAL_NEWSLETTER",
    tags: ["newsletter"],
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
