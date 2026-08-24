type GhlEnv = Record<string, string | undefined>;

// Campo personalizado "Mensagem" (contact.mensagem), criado no location do Tribunal
// Digital especificamente pra guardar o texto do formulário de Contato. Precisa ser um
// campo de verdade (não nota) pra poder ser usado como merge tag num workflow do GHL,
// por exemplo pra notificar o closer via WhatsApp quando chega mensagem nova.
const MENSAGEM_FIELD_ID = "Btkc93SxAM4uEDoW4Cl8";

type CreateGhlContactInput = {
  name: string;
  email: string;
  phone?: string;
  source: string;
  tags?: string[];
  message?: string;
};

type CreateGhlContactResult = { ok: true } | { ok: false; error: string };

// Compartilhado entre src/app/api/contact/route.ts e src/app/api/community/route.ts —
// mesma chamada à API do GHL, só muda o "source" (campo Origem) e as tags de cada form.
export async function createGhlContact(
  env: GhlEnv,
  input: CreateGhlContactInput,
): Promise<CreateGhlContactResult> {
  const token = env.GHL_API_TOKEN;
  const locationId = env.GHL_LOCATION_ID;

  if (!token || !locationId) {
    console.error("ghl: GHL_API_TOKEN ou GHL_LOCATION_ID ausente no ambiente");
    return { ok: false, error: "server_not_configured" };
  }

  const ghlHeaders = {
    Authorization: `Bearer ${token}`,
    Version: "2021-07-28",
    "Content-Type": "application/json",
  };

  try {
    const ghlRes = await fetch("https://services.leadconnectorhq.com/contacts/", {
      method: "POST",
      headers: ghlHeaders,
      body: JSON.stringify({
        locationId,
        firstName: input.name,
        email: input.email,
        phone: input.phone || undefined,
        source: input.source,
        tags: input.tags,
        customFields: input.message
          ? [{ id: MENSAGEM_FIELD_ID, value: input.message }]
          : undefined,
      }),
    });

    if (!ghlRes.ok) {
      console.error("ghl: resposta de erro", ghlRes.status, await ghlRes.text());
      return { ok: false, error: "ghl_error" };
    }

    return { ok: true };
  } catch (err) {
    console.error("ghl: falha de rede ao chamar API", err);
    return { ok: false, error: "network_error" };
  }
}

type UpsertGhlContactInput = {
  name: string;
  email: string;
  phone?: string;
  source: string;
  tags?: string[];
};

// Usa o endpoint /contacts/upsert do GHL (dedupe por email/telefone): se o contato já
// existe, atualiza e só adiciona as tags novas (não recria nem substitui as existentes).
// Usado pela newsletter, onde reinscrição com o mesmo email não pode gerar contato duplicado.
export async function upsertGhlContact(
  env: GhlEnv,
  input: UpsertGhlContactInput,
): Promise<CreateGhlContactResult> {
  const token = env.GHL_API_TOKEN;
  const locationId = env.GHL_LOCATION_ID;

  if (!token || !locationId) {
    console.error("ghl: GHL_API_TOKEN ou GHL_LOCATION_ID ausente no ambiente");
    return { ok: false, error: "server_not_configured" };
  }

  try {
    const ghlRes = await fetch("https://services.leadconnectorhq.com/contacts/upsert", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        locationId,
        firstName: input.name,
        email: input.email,
        phone: input.phone || undefined,
        source: input.source,
        tags: input.tags,
      }),
    });

    if (!ghlRes.ok) {
      console.error("ghl: resposta de erro (upsert)", ghlRes.status, await ghlRes.text());
      return { ok: false, error: "ghl_error" };
    }

    return { ok: true };
  } catch (err) {
    console.error("ghl: falha de rede ao chamar API (upsert)", err);
    return { ok: false, error: "network_error" };
  }
}
