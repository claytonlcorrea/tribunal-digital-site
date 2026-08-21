"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { formatPhone } from "@/lib/format";

const CHECKOUT_URL = "https://clkdmg.site/subscribe/tribunal-digital-anual";

export default function CommunityForm() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    setPhone(formatPhone(event.target.value));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const form = event.currentTarget;
    const data = new FormData(form);

    if (data.get("website")) {
      window.location.href = CHECKOUT_URL;
      return;
    }

    try {
      await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
        }),
      });
    } catch {
      // Não trava a conversão por falha de rede/CRM — segue pro checkout mesmo assim.
    }

    window.location.href = CHECKOUT_URL;
  }

  return (
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
        <label htmlFor="website">Não preencher</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="mb-1 block text-sm text-td-muted">
          Nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-sm border border-td-border bg-td-card px-4 py-3 text-td-white outline-none focus:border-td-gold"
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block text-sm text-td-muted">
          Telefone
        </label>
        <input
          id="phone"
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
        <label htmlFor="email" className="mb-1 block text-sm text-td-muted">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-sm border border-td-border bg-td-card px-4 py-3 text-td-white outline-none focus:border-td-gold"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 rounded-sm bg-td-cta px-6 py-3 font-semibold text-td-bg-on-gold transition disabled:opacity-60"
      >
        {loading ? "Confirmando..." : "Quero fazer parte da Comunidade"}
      </button>
    </form>
  );
}
