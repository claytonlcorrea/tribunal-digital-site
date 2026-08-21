import Link from "next/link";
import Reveal from "@/components/Reveal";
import Folio from "@/components/Folio";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <main className="flex flex-1 flex-col items-center">
      {/* Hero — capa do dossiê */}
      <section className="w-full max-w-2xl px-6 pt-20 pb-20 text-center">
        <div className="mx-auto mb-10 flex max-w-xs items-center gap-3 font-mono text-[11px] tracking-widest text-td-muted uppercase">
          <span className="h-px flex-1 bg-td-border" />
          Tribunal Digital · Dossiê Digital
          <span className="h-px flex-1 bg-td-border" />
        </div>
        <h1 className="font-title text-4xl font-bold leading-[1.15] text-td-white sm:text-5xl">
          Quem não entende prova digital, não é chamado pras{" "}
          <span className="text-td-cream">grandes operações</span>.
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-td-muted">
          O processo penal mudou. Cada vez mais, o que decide um caso não é só
          a tese, é a cadeia de custódia e a integridade da prova digital por
          trás dela. Essa mudança está acontecendo silenciosamente, e quem
          não entende como ela funciona vai ficando pra trás.
        </p>
        <Link
          href="/comunidade#entrar"
          className="mt-10 inline-block rounded-sm bg-td-cta px-7 py-3 font-semibold text-td-bg-on-gold transition hover:opacity-90"
        >
          Entrar na Comunidade Tribunal Digital
        </Link>
      </section>

      {/* A mudança silenciosa */}
      <Reveal className="w-full">
        <section className="mx-auto w-full max-w-2xl border-t border-td-border px-6 py-20">
          <Folio n="01" label="A mudança silenciosa" />
          <p className="font-title text-2xl leading-snug text-td-white sm:text-3xl">
            Prints, extrações de celular, geolocalização, logs de aplicativo.
            Hoje, provas digitais decidem processos que antes se resolviam só
            no confronto de teses.
          </p>
          <p className="mt-6 leading-relaxed text-td-muted">
            Só que a maioria das defesas ainda trata prova digital como
            anexo, não como o centro da estratégia. Isso está mudando o
            resultado de casos, e vai continuar mudando.
          </p>
        </section>
      </Reveal>

      {/* Grandes operações / Comunidade */}
      <Reveal className="w-full">
        <section className="mx-auto w-full max-w-2xl border-t border-td-border px-6 py-20">
          <Folio n="02" label="Grandes operações" />
          <p className="font-title text-2xl leading-snug text-td-white sm:text-3xl">
            Advogado chamado pra grandes operações não é o que sabe mais lei.
            É o que domina o terreno técnico que decide o caso antes da
            audiência.
          </p>
          <p className="mt-6 leading-relaxed text-td-muted">
            A Comunidade Tribunal Digital existe pra isso: centenas de
            advogados criminalistas que levam prova digital a sério, e por
            isso são chamados quando o caso é grande.
          </p>
          <Link
            href="/comunidade"
            className="mt-8 inline-block font-semibold text-td-gold transition hover:text-td-cream"
          >
            Conhecer a Comunidade &rarr;
          </Link>
        </section>
      </Reveal>

      {/* Prova social */}
      <Reveal className="w-full">
        <section className="mx-auto w-full max-w-2xl border-t border-td-border px-6 py-20">
          <Folio n="03" label="Prova social" />
          <p className="font-title text-2xl leading-snug text-td-white sm:text-3xl">
            Mais de 10 anos de perícia digital, em casos complexos e grandes
            operações.
          </p>
          <p className="mt-6 leading-relaxed text-td-muted">
            É o que advogados que atuam com o Tribunal Digital confirmam na
            prática, caso após caso.
          </p>
          <div className="mt-10">
            <p className="mb-2 font-mono text-[11px] tracking-widest text-td-muted uppercase">
              Anexo — Depoimento
            </p>
            <video
              className="aspect-[464/555] w-full rounded-sm border border-td-border object-cover object-bottom"
              src="/videos/depoimento-tribunal-digital.mp4"
              controls
              playsInline
              preload="metadata"
              aria-label="Depoimento de advogado sobre o Tribunal Digital"
            />
          </div>
        </section>
      </Reveal>

      {/* Últimas notícias */}
      <Reveal className="w-full">
        <section className="mx-auto w-full max-w-2xl border-t border-td-border px-6 py-20">
          <Folio n="04" label="Últimas notícias" />
          <div className="flex flex-col">
            {posts.length === 0 && (
              <p className="text-td-muted">Nenhuma matéria publicada ainda.</p>
            )}
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/noticias/${post.slug}`}
                className="group border-t border-td-border py-6 first:border-t-0 first:pt-0"
              >
                <p className="mb-1 text-xs uppercase tracking-wide text-td-muted">
                  {post.frontmatter.source}
                </p>
                <h3 className="font-title text-xl font-semibold text-td-white transition group-hover:text-td-cream">
                  {post.frontmatter.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-td-muted">
                  {post.frontmatter.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>

      {/* CTA final */}
      <Reveal className="w-full">
        <section className="mx-auto w-full max-w-2xl border-t border-td-border px-6 py-20 text-center">
          <p className="font-title text-2xl leading-snug text-td-white">
            Quer ser chamado pras grandes operações?
          </p>
          <Link
            href="/comunidade#entrar"
            className="mt-6 inline-block rounded-sm bg-td-cta px-6 py-3 font-semibold text-td-bg-on-gold transition hover:opacity-90"
          >
            Entrar na Comunidade Tribunal Digital
          </Link>
        </section>
      </Reveal>
    </main>
  );
}
