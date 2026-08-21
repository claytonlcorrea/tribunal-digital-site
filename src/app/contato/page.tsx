import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contato — Tribunal Digital",
};

export default function Contato() {
  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-6 pt-20 pb-20">
      <div className="mx-auto mb-10 flex max-w-xs items-center gap-3 font-mono text-[11px] tracking-widest text-td-muted uppercase">
        <span className="h-px flex-1 bg-td-border" />
        Tribunal Digital · Contato
        <span className="h-px flex-1 bg-td-border" />
      </div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-td-gold">
        Contato
      </p>
      <h1 className="font-title mb-4 text-3xl font-bold leading-tight text-td-white">
        Fale com o Tribunal Digital
      </h1>
      <p className="mb-10 leading-relaxed text-td-muted">
        Advogado criminalista com um caso que envolve prova digital, ou
        interesse em entender melhor o trabalho? Preenche o formulário abaixo.
      </p>

      <ContactForm />

      <p className="mt-8 text-sm text-td-muted">
        Prefere outro canal? Instagram e WhatsApp estão no rodapé.
      </p>
    </main>
  );
}
