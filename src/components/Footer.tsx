export default function Footer() {
  return (
    <footer className="border-t border-td-border">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-3 px-6 py-10 text-center">
        <p className="font-title text-sm font-semibold text-td-white">
          Tribunal Digital
        </p>
        <p className="text-xs text-td-muted">
          Joaquim Neto, perito digital &middot; provas digitais e estratégia
          técnica para advogados criminalistas.
        </p>
        <div className="mt-2 flex gap-6 text-xs">
          <a
            href="https://instagram.com/peritojoaquimneto"
            target="_blank"
            rel="noopener noreferrer"
            className="text-td-muted transition hover:text-td-gold"
          >
            Instagram
          </a>
          <a
            href="https://wa.me/558586884321?text=Ol%C3%A1%2C%20vim%20pelo%20site%20do%20Tribunal%20Digital"
            target="_blank"
            rel="noopener noreferrer"
            className="text-td-muted transition hover:text-td-gold"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
