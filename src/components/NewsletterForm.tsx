"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { formatPhone } from "@/lib/format";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [phone, setPhone] = useState("");

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    setPhone(formatPhone(event.target.value));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: campo invisível pra humano, bot de formulário costuma preencher.
    if (data.get("website")) {
      setStatus("success");
      return;
    }

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
        }),
      });

      if (!res.ok) throw new Error("request failed");

      setStatus("success");
      form.reset();
      setPhone("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mb-10 rounded-sm border-l-2 border-td-gold bg-td-card px-6 py-6">
        <p className="text-td-white">
          Inscrição confirmada. A próxima newsletter chega quarta-feira, às 9h15.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-10 rounded-sm border-l-2 border-td-gold bg-td-card px-6 py-6">
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-td-gold">
        Newsletter
      </p>
      <h2 className="font-title mb-1 text-xl font-bold text-td-white">
        Receba as análises toda quarta-feira
      </h2>
      <p className="mb-5 text-sm text-td-muted">
        Direto no seu email, às 9h15: as decisões mais recentes sobre provas digitais e
        cadeia de custódia, traduzidas em vantagem prática pro criminalista.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-9999px",
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
        >
          <label htmlFor="newsletter-website">Não preencher</label>
          <input
            type="text"
            id="newsletter-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor="newsletter-name" className="mb-1 block text-sm text-td-muted">
            Nome
          </label>
          <input
            id="newsletter-name"
            name="name"
            type="text"
            required
            className="w-full rounded-sm border border-td-border bg-td-bg px-4 py-3 text-td-white outline-none focus:border-td-gold"
          />
        </div>

        <div>
          <label htmlFor="newsletter-phone" className="mb-1 block text-sm text-td-muted">
            Telefone
          </label>
          <input
            id="newsletter-phone"
            name="phone"
            type="tel"
            required
            value={phone}
            onChange={handlePhoneChange}
            placeholder="(00) 00000-0000"
            className="w-full rounded-sm border border-td-border bg-td-bg px-4 py-3 text-td-white outline-none focus:border-td-gold"
          />
        </div>

        <div>
          <label htmlFor="newsletter-email" className="mb-1 block text-sm text-td-muted">
            Email
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            placeholder="contato@exemplo.com"
            className="w-full rounded-sm border border-td-border bg-td-bg px-4 py-3 text-td-white outline-none focus:border-td-gold"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-sm bg-td-cta px-6 py-3 font-semibold text-td-bg-on-gold transition disabled:opacity-60"
        >
          {status === "loading" ? "Inscrevendo..." : "Quero receber"}
        </button>

        {status === "error" && (
          <p className="text-sm text-td-muted">
            Não deu pra inscrever agora. Tenta de novo em instantes.
          </p>
        )}
      </form>
    </div>
  );
}
