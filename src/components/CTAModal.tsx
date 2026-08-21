"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { formatPhone } from "@/lib/format";

const CHECKOUT_URL = "https://clkdmg.site/subscribe/tribunal-digital-anual";

export default function CTAModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    nameRef.current?.focus();

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

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

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cta-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md rounded-sm border border-td-border bg-td-card px-7 py-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 text-td-muted transition hover:text-td-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-td-gold">
          Tribunal Digital
        </p>
        <h2
          id="cta-modal-title"
          className="font-title mb-6 text-2xl font-bold text-td-white"
        >
          Entrar na Comunidade
        </h2>

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
            <label htmlFor="cta-website">Não preencher</label>
            <input
              type="text"
              id="cta-website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="cta-name" className="mb-1 block text-sm text-td-muted">
              Nome
            </label>
            <input
              ref={nameRef}
              id="cta-name"
              name="name"
              type="text"
              required
              className="w-full rounded-sm border border-td-border bg-td-bg px-4 py-3 text-td-white outline-none focus:border-td-gold"
            />
          </div>

          <div>
            <label htmlFor="cta-phone" className="mb-1 block text-sm text-td-muted">
              Telefone
            </label>
            <input
              id="cta-phone"
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
            <label htmlFor="cta-email" className="mb-1 block text-sm text-td-muted">
              Email
            </label>
            <input
              id="cta-email"
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
            disabled={loading}
            className="mt-2 rounded-sm bg-td-cta px-6 py-3 font-semibold text-td-bg-on-gold transition disabled:opacity-60"
          >
            {loading ? "Confirmando..." : "Garantir minha vaga"}
          </button>
        </form>
      </div>
    </div>
  );
}
