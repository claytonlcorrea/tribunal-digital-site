import Image from "next/image";
import Link from "next/link";
import CTAButton from "./CTAButton";

const LINKS = [
  { href: "/#tribunal-digital", label: "Sobre" },
  { href: "/#joaquim", label: "Joaquim Neto" },
  { href: "/noticias", label: "Notícias" },
  { href: "/#contato", label: "Contato" },
];

export default function Nav() {
  return (
    <header className="border-b border-td-border">
      <nav className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.jpeg"
            alt="Tribunal Digital"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-title text-lg font-bold text-td-white">
            Tribunal Digital
          </span>
        </Link>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm font-medium text-td-muted transition hover:text-td-gold"
            >
              {link.label}
            </Link>
          ))}
          <CTAButton className="rounded-sm bg-td-cta px-5 py-2 text-sm font-semibold text-td-bg-on-gold transition hover:opacity-90">
            Entrar na Comunidade
          </CTAButton>
        </div>
      </nav>
    </header>
  );
}
