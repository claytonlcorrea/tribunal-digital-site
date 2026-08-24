"use client";

import { useState } from "react";

export default function ShareButtons({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard indisponível (ex: contexto não seguro) — sem crash, só não copia.
    }
  }

  return (
    <div className="mb-8 flex items-center gap-4">
      <span className="text-xs font-semibold uppercase tracking-widest text-td-gold">
        Compartilhar
      </span>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartilhar no WhatsApp"
        className="text-td-muted transition hover:text-td-gold"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.4 1.32-1.94 1.4-.5.08-1.13.11-1.83-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.16-4.94-4.35-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.13 1.02-2.42.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.83 2 .9 2.15.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.44.29.15.46.13.63-.08.17-.21.72-.84.91-1.13.19-.29.38-.24.63-.15.26.1 1.65.78 1.93.92.29.15.48.21.55.34.07.13.07.71-.17 1.39Z" />
        </svg>
      </a>

      <a
        href={linkedinHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartilhar no LinkedIn"
        className="text-td-muted transition hover:text-td-gold"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.94 5.5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-1.74.33-3.42 2.48-3.42 2.12 0 2.15 1.98 2.15 3.53V21H22v-7.19c0-3.44-.74-6.09-4.76-6.09-1.93 0-3.22 1.06-3.75 2.06h-.05V8.48Z" />
        </svg>
      </a>

      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copiar link"
        className="text-td-muted transition hover:text-td-gold"
      >
        {copied ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M10 13a5 5 0 0 0 7.07 0l2.5-2.5a5 5 0 0 0-7.07-7.07L11 4.88" />
            <path d="M14 11a5 5 0 0 0-7.07 0l-2.5 2.5a5 5 0 0 0 7.07 7.07L13 19.12" />
          </svg>
        )}
      </button>

      {copied && (
        <span className="text-xs text-td-gold">Link copiado</span>
      )}
    </div>
  );
}
