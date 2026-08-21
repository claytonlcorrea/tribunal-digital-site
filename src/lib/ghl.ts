type GhlEnv = Record<string, string | undefined>;

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
      }),
    });

    if (!ghlRes.ok) {
      console.error("ghl: resposta de erro", ghlRes.status, await ghlRes.text());
      return { ok: false, error: "ghl_error" };
    }

    // Mensagem livre vai como nota anexada ao contato, GHL não tem campo padrão pra isso
    // no create de contato. Best-effort: se falhar, não derruba o sucesso principal.
    if (input.message) {
      const created = (await ghlRes.json()) as { contact?: { id?: string } };
      const contactId = created.contact?.id;
      if (contactId) {
        try {
          await fetch(
            `https://services.leadconnectorhq.com/contacts/${contactId}/notes`,
            {
              method: "POST",
              headers: ghlHeaders,
              body: JSON.stringify({ body: input.message }),
            },
          );
        } catch (err) {
          console.error("ghl: falha ao anexar nota", err);
        }
      }
    }

    return { ok: true };
  } catch (err) {
    console.error("ghl: falha de rede ao chamar API", err);
    return { ok: false, error: "network_error" };
  }
}
