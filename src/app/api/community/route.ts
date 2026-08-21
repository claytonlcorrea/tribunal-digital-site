import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";
import { createGhlContact } from "@/lib/ghl";

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

  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const { env } = getCloudflareContext();
  const result = await createGhlContact(env as Record<string, string | undefined>, {
    name,
    email,
    phone,
    source: "SITE_TRIBUNAL",
    tags: ["site-comunidade"],
  });

  // Não travar a conversão por causa do CRM: o front-end redireciona pro checkout mesmo
  // se isso vier ok:false — o erro só é logado no servidor (dentro de createGhlContact).
  return NextResponse.json({ ok: result.ok });
}
