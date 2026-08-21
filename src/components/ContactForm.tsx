"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { formatPhone } from "@/lib/format";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
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
      <div className="rounded-sm border-l-2 border-td-gold bg-td-card px-6 py-6">
        <p className="text-td-white">
          Recebemos seu contato. Retornamos em breve.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Honeypot — mantido fora da tela, não display:none, pra bots simples não detectarem */}
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
        <label htmlFor="contact-website">Não preencher</label>
        <input type="text" id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="contact-name" className="mb-1 block text-sm text-td-muted">
          Nome
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          className="w-full rounded-sm border border-td-border bg-td-card px-4 py-3 text-td-white outline-none focus:border-td-gold"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-1 block text-sm text-td-muted">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          placeholder="contato@exemplo.com"
          className="w-full rounded-sm border border-td-border bg-td-card px-4 py-3 text-td-white outline-none focus:border-td-gold"
        />
      </div>

      <div>
        <label htmlFor="contact-phone" className="mb-1 block text-sm text-td-muted">
          WhatsApp
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          required
          value={phone}
          onChange={handlePhoneChange}
          placeholder="(00) 00000-0000"
          className="w-full rounded-sm border border-td-border bg-td-card px-4 py-3 text-td-white outline-none focus:border-td-gold"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1 block text-sm text-td-muted">
          Mensagem
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          className="w-full rounded-sm border border-td-border bg-td-card px-4 py-3 text-td-white outline-none focus:border-td-gold"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-sm bg-td-cta px-6 py-3 font-semibold text-td-bg-on-gold transition disabled:opacity-60"
      >
        {status === "loading" ? "Enviando..." : "Enviar"}
      </button>

      {status === "error" && (
        <p className="text-sm text-td-muted">
          Não deu pra enviar agora. Tenta de novo ou chama no WhatsApp.
        </p>
      )}
    </form>
  );
}
