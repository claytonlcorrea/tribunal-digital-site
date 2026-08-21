const SOCIAL = [
  {
    label: "Instagram",
    href: "https://instagram.com/peritojoaquimneto",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@peritodigital",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.58 7.19c-.23-.87-.91-1.56-1.78-1.79C18.25 5 12 5 12 5s-6.25 0-7.8.4c-.87.23-1.55.92-1.78 1.79C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.87.91 1.55 1.78 1.79C5.75 19 12 19 12 19s6.25 0 7.8-.4c.87-.24 1.55-.92 1.78-1.79C22 15.25 22 12 22 12s0-3.25-.42-4.81ZM10 15.5v-7l6 3.5-6 3.5Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/peritojoaquimneto",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.94 5.5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-1.74.33-3.42 2.48-3.42 2.12 0 2.15 1.98 2.15 3.53V21H22v-7.19c0-3.44-.74-6.09-4.76-6.09-1.93 0-3.22 1.06-3.75 2.06h-.05V8.48Z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/558586884321?text=Ol%C3%A1%2C%20vim%20pelo%20site%20do%20Tribunal%20Digital",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.4 1.32-1.94 1.4-.5.08-1.13.11-1.83-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.16-4.94-4.35-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.13 1.02-2.42.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.83 2 .9 2.15.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.44.29.15.46.13.63-.08.17-.21.72-.84.91-1.13.19-.29.38-.24.63-.15.26.1 1.65.78 1.93.92.29.15.48.21.55.34.07.13.07.71-.17 1.39Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-td-border">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-4 px-6 py-16 text-center">
        <p className="font-title text-lg font-semibold text-td-white">
          Tribunal Digital
        </p>
        <p className="max-w-md text-sm leading-relaxed text-td-muted">
          Joaquim Neto, perito digital · comunidade de advogados criminalistas
          para provas digitais e cadeia de custódia.
        </p>
        <div className="mt-2 flex gap-6">
          {SOCIAL.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="text-td-muted transition hover:text-td-gold"
            >
              {item.icon}
            </a>
          ))}
        </div>
        <p className="mt-6 text-xs text-td-muted">
          © {new Date().getFullYear()} Tribunal Digital. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
