import Image from "next/image";
import Link from "next/link";

const LINKS = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/comunidade", label: "Comunidade" },
  { href: "/noticias", label: "Notícias" },
  { href: "/contato", label: "Contato" },
];

export default function Nav() {
  return (
    <header className="border-b border-td-border">
      <nav className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-4 px-6 py-5">
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
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm font-medium text-td-muted transition hover:text-td-gold"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
