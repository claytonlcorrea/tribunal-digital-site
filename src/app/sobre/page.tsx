import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Folio from "@/components/Folio";
import YouTubeEmbed from "@/components/YouTubeEmbed";

export const metadata: Metadata = {
  title: "Sobre — Tribunal Digital",
  description:
    "Joaquim Neto, perito digital especializado em provas digitais para a defesa técnica em processos penais.",
};

const CERTIFICACOES = [
  "Computer Hacking Forensics Investigator (CHFI v10)",
  "Certified Ethical Hacker (CEH v11)",
  "Certified Networking Security Expert (CNSE)",
  "Certified Security Architecture Expert (CSAE)",
  "Especialista em Informática Forense — IPOG",
  "Audio and Image Forensics — BluEAD",
  "Pós-graduando em Cibersegurança Ofensiva — ACADI-TI",
  "Graduado em Gestão de Recursos Humanos — Ateneu",
  "Técnico em Redes de Computadores — IFCE",
];

const ESTUDOS_DE_CASO = [
  {
    id: "qfmNJ0Yq988",
    titulo:
      "A localização por antena que colocou seu cliente na cena do crime pode estar errada",
  },
  {
    id: "exTf82AX4uQ",
    titulo:
      "Como a polícia extrai dados do seu celular (e o que a defesa precisa saber)",
  },
];

const PUBLICACOES = [
  {
    veiculo: "Conjur",
    titulo: "STJ anula condenação por ausência de integralidade da prova digital",
    href: "https://www.conjur.com.br/2025-nov-07/stj-anula-condenacao-por-ausencia-de-integralidade-da-prova-digital/",
  },
  {
    veiculo: "Conjur",
    titulo: "Prova penal digital: relatórios do Cellebrite podem ser insuficientes?",
    href: "https://www.conjur.com.br/2025-out-10/prova-penal-digital-relatorios-do-cellebrite-podem-ser-insuficientes/",
  },
  {
    veiculo: "Conjur",
    titulo:
      "Prova digital comprometida pela simples alteração da data no dispositivo apreendido",
    href: "https://www.conjur.com.br/2025-ago-22/prova-digital-comprometida-pela-simples-alteracao-da-data-no-dispositivo-apreendido/",
  },
  {
    veiculo: "Migalhas",
    titulo:
      "Muro do contraditório nas provas digitais — acesso integral aos dados brutos",
    href: "https://www.migalhas.com.br/depeso/434264/muro-do-contraditorio-nas-provas-digitais--acesso-aos-dados-brutos",
  },
];

const PALESTRAS_E_PODCAST = [
  {
    id: "-TcZDuMg03E",
    titulo:
      "Criminal Player #320 — com Alexandre Morais da Rosa, Aury Lopes Jr, Joaquim Neto e Lorenzo Parodi",
  },
  {
    id: "lKQ43NYQVEY",
    titulo:
      "A prova digital pode parecer íntegra e estar completamente manipulada — XI Congresso Penal",
  },
];

export default function Sobre() {
  return (
    <main className="flex flex-1 flex-col items-center">
      <section className="grid w-full max-w-3xl grid-cols-1 items-start gap-10 px-6 pt-20 pb-16 sm:grid-cols-[1fr_1.3fr] sm:gap-14">
        <div className="mx-auto w-48 sm:mx-0 sm:w-full">
          <p className="mb-2 font-mono text-[11px] tracking-widest text-td-muted uppercase">
            fls. 01 — Perito
          </p>
          <Image
            src="/images/joaquim-sobre.png"
            alt="Joaquim Neto"
            width={420}
            height={560}
            className="w-full rounded-sm border border-td-border"
            priority
          />
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-td-gold">
            Sobre
          </p>
          <h1 className="font-title mb-5 text-3xl font-bold leading-tight text-td-white sm:text-4xl">
            Joaquim Bartolomeu Ferreira Neto
          </h1>
          <p className="text-lg leading-relaxed text-td-white">
            Perito digital com mais de 10 anos de experiência, atuando em
            casos complexos e grandes operações. Especializado em identificar
            nulidades, inconsistências e oportunidades estratégicas em
            provas digitais, traduzindo análise técnica forense em vantagem
            real na defesa técnica em processos penais.
          </p>
        </div>
      </section>

      <Reveal className="w-full">
        <section className="mx-auto w-full max-w-2xl border-t border-td-border px-6 py-16">
          <Folio n="02" label="Trajetória" />
          <p className="font-title text-2xl leading-snug text-td-white sm:text-3xl">
            Mais de 10 anos de experiência em casos complexos e grandes
            operações.
          </p>
          <p className="mt-6 leading-relaxed text-td-muted">
            Ao longo da carreira, atuou como Perito Judicial, Assistente
            Técnico, Especialista em Recuperação de Dados, Analista de
            Redes de Computadores, profissional de Infraestrutura de TI,
            Desenvolvedor Web e Professor. É palestrante e membro da
            comissão especial de perícias da OAB-SP, levando o debate sobre
            prova digital pra dentro da própria advocacia.
          </p>
        </section>
      </Reveal>

      <Reveal className="w-full">
        <section className="mx-auto w-full max-w-2xl border-t border-td-border px-6 py-16">
          <Folio n="03" label="Formação e certificações" />
          <p className="font-title text-2xl leading-snug text-td-white sm:text-3xl">
            Base técnica reconhecida nas principais certificações da área.
          </p>
          <ul className="mt-6 divide-y divide-td-border border-t border-td-border">
            {CERTIFICACOES.map((item) => (
              <li
                key={item}
                className="py-3 leading-relaxed text-td-cream"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal className="w-full">
        <section className="mx-auto w-full max-w-2xl border-t border-td-border px-6 py-16">
          <Folio n="04" label="Autor e criador de método" />
          <p className="font-title text-2xl leading-snug text-td-white sm:text-3xl">
            Referência escrita sobre perícia digital e OSINT.
          </p>
          <p className="mt-6 leading-relaxed text-td-muted">
            Autor do livro{" "}
            <span className="text-td-cream">IPED Zero to Hero</span>,
            coautor de{" "}
            <span className="text-td-cream">
              OSINT do Zero à Investigação Profissional
            </span>{" "}
            e coautor de{" "}
            <span className="text-td-cream">Perícias Digitais</span>. Criador
            do método{" "}
            <span className="text-td-cream">
              RDPD (Recuperação de Dados com Perícia Digital)
            </span>{" "}
            e do método{" "}
            <span className="text-td-cream">
              PDA (Provas Digitais Advanced)
            </span>
            , usados hoje por advogados criminalistas e peritos em todo o
            país.
          </p>
        </section>
      </Reveal>

      <Reveal className="w-full">
        <section className="mx-auto w-full max-w-2xl border-t border-td-border px-6 py-16">
          <Folio n="05" label="Estudos de caso" />
          <p className="font-title text-2xl leading-snug text-td-white sm:text-3xl">
            Como a análise técnica muda a estratégia de defesa, explicado caso
            a caso.
          </p>
          <div className="mt-8 flex flex-col gap-8">
            {ESTUDOS_DE_CASO.map((video) => (
              <div key={video.id}>
                <YouTubeEmbed id={video.id} title={video.titulo} />
                <p className="mt-3 leading-relaxed text-td-muted">
                  {video.titulo}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal className="w-full">
        <section className="mx-auto w-full max-w-2xl border-t border-td-border px-6 py-16">
          <Folio n="06" label="Publicações" />
          <p className="font-title text-2xl leading-snug text-td-white sm:text-3xl">
            Artigos publicados em veículos de referência do meio jurídico.
          </p>
          <ul className="mt-6 divide-y divide-td-border border-t border-td-border">
            {PUBLICACOES.map((pub) => (
              <li key={pub.href} className="py-4">
                <a
                  href={pub.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-1"
                >
                  <span className="font-mono text-[11px] tracking-widest text-td-muted uppercase">
                    {pub.veiculo}
                  </span>
                  <span className="leading-relaxed text-td-cream transition group-hover:text-td-gold">
                    {pub.titulo} &rarr;
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal className="w-full">
        <section className="mx-auto w-full max-w-2xl border-t border-td-border px-6 py-16">
          <Folio n="07" label="Palestras e podcast" />
          <p className="font-title text-2xl leading-snug text-td-white sm:text-3xl">
            Participações públicas discutindo prova digital com outros nomes
            do meio penal.
          </p>
          <div className="mt-8 flex flex-col gap-8">
            {PALESTRAS_E_PODCAST.map((video) => (
              <div key={video.id}>
                <YouTubeEmbed id={video.id} title={video.titulo} />
                <p className="mt-3 leading-relaxed text-td-muted">
                  {video.titulo}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal className="w-full">
        <section className="mx-auto w-full max-w-2xl border-t border-td-border px-6 py-16">
          <Folio n="08" label="Como o trabalho é feito" />
          <p className="font-title text-2xl leading-snug text-td-white sm:text-3xl">
            Prova digital não se avalia pela aparência de um relatório
            pronto.
          </p>
          <p className="mt-6 leading-relaxed text-td-muted">
            A análise parte sempre do dado bruto, seja extração de celular,
            registro de geolocalização, log de aplicativo ou imagem de
            mídia, verificando cadeia de custódia, integridade e
            autenticidade antes de qualquer conclusão. O objetivo não é
            confirmar o que já foi escrito num laudo. É verificar se o laudo
            se sustenta tecnicamente, e apontar com precisão onde ele não se
            sustenta.
          </p>
        </section>
      </Reveal>

      <Reveal className="w-full">
        <section className="mx-auto w-full max-w-2xl border-t border-td-border px-6 py-16">
          <Folio n="09" label="Um trabalho técnico, não jurídico" />
          <p className="leading-relaxed text-td-white">
            Joaquim Neto é perito digital, não advogado. O trabalho é
            identificar o que a prova digital mostra, ou deixa de mostrar,
            com rigor técnico. A estratégia jurídica sobre como usar isso no
            processo é sempre construída em conjunto com o advogado
            responsável pelo caso.
          </p>
        </section>
      </Reveal>

      <Reveal className="w-full">
        <section className="mx-auto w-full max-w-2xl border-t border-td-border px-6 py-20 text-center">
          <p className="mb-3 text-td-white">
            Quer discutir casos reais de prova digital com o Joaquim e outros
            advogados criminalistas toda semana?
          </p>
          <Link
            href="/comunidade"
            className="font-semibold text-td-gold transition hover:text-td-cream"
          >
            Conhecer a Comunidade Tribunal Digital &rarr;
          </Link>
        </section>
      </Reveal>
    </main>
  );
}
