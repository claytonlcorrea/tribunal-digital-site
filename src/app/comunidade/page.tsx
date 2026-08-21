import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Folio from "@/components/Folio";
import CommunityForm from "./CommunityForm";

export const metadata: Metadata = {
  title: "Comunidade — Tribunal Digital",
  description:
    "A comunidade de advogados criminalistas que dominam prova digital e cadeia de custódia, e por isso são chamados pras grandes operações.",
};

export default function Comunidade() {
  return (
    <main className="flex flex-1 flex-col items-center">
      <section className="w-full max-w-2xl px-6 pt-20 pb-16 text-center">
        <div className="mx-auto mb-10 flex max-w-xs items-center gap-3 font-mono text-[11px] tracking-widest text-td-muted uppercase">
          <span className="h-px flex-1 bg-td-border" />
          Tribunal Digital · Comunidade
          <span className="h-px flex-1 bg-td-border" />
        </div>
        <h1 className="font-title text-4xl font-bold leading-[1.15] text-td-white sm:text-5xl">
          O lugar de quem quer ser chamado pras{" "}
          <span className="text-td-cream">grandes operações</span>.
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-td-muted">
          Centenas de advogados criminalistas que levam prova digital a
          sério, discutem casos reais entre si e com o Joaquim Neto, e
          constroem o tipo de autoridade técnica que faz um caso grande
          chegar até você.
        </p>
      </section>

      <Reveal className="w-full">
        <section className="mx-auto w-full max-w-2xl border-t border-td-border px-6 py-16">
          <Folio n="01" label="Por que existe" />
          <p className="font-title text-2xl leading-snug text-td-white sm:text-3xl">
            Prova digital não se aprende sozinho, lendo laudo depois de laudo
            já finalizado.
          </p>
          <p className="mt-6 leading-relaxed text-td-muted">
            Se aprende discutindo caso real, com quem já passou pelo mesmo
            problema técnico que você está vendo agora. É isso que a
            Comunidade Tribunal Digital constrói: um lugar onde a troca entre
            advogados e a proximidade com o Joaquim encurtam o caminho até
            virar referência técnica no seu mercado.
          </p>
        </section>
      </Reveal>

      <Reveal className="w-full">
        <section className="mx-auto w-full max-w-2xl border-t border-td-border px-6 py-16">
          <Folio n="02" label="O que acontece por dentro" />
          <ul className="flex flex-col gap-4 text-td-white">
            <li className="border-t border-td-border pt-4 first:border-t-0 first:pt-0">
              Encontro ao vivo semanal, toda quinta às 19h, com discussão de
              casos reais
            </li>
            <li className="border-t border-td-border pt-4">
              Acesso direto à comunidade de advogados criminalistas que já
              domina prova digital
            </li>
            <li className="border-t border-td-border pt-4">
              Referência constante do Joaquim Neto sobre cadeia de custódia,
              integridade e estratégia técnica aplicada a caso real
            </li>
          </ul>
        </section>
      </Reveal>

      <Reveal className="w-full">
        <section
          id="entrar"
          className="mx-auto w-full max-w-xl border-t border-td-border px-6 py-20"
        >
          <Folio n="03" label="Fazer parte" />
          <h2 className="font-title mb-6 text-2xl font-bold text-td-white">
            Entrar na Comunidade Tribunal Digital
          </h2>
          <CommunityForm />
        </section>
      </Reveal>
    </main>
  );
}
