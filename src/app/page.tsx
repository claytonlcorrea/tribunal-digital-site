import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CTAButton from "@/components/CTAButton";
import ContactForm from "@/components/ContactForm";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { formatPostDate, getAllPosts } from "@/lib/posts";

const PALESTRAS_E_PODCAST = [
  {
    id: "lKQ43NYQVEY",
    titulo: "XI Congresso Penal",
  },
  {
    id: "-TcZDuMg03E",
    titulo: "Podcast Criminal Player",
  },
];

const ESTUDOS_DE_CASO = [
  {
    id: "qfmNJ0Yq988",
    titulo: "Análise de ERBs",
    descricao:
      "Estudo de caso sobre análise de ERBs e estratégia técnica utilizada para direito ao contraditório.",
  },
  {
    id: "exTf82AX4uQ",
    titulo: "Análise Extração Celular com Cellebrite",
    descricao: "Estudo de Caso de análise de extração de dados de celular.",
  },
];

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative h-[88vh] max-h-[860px] min-h-[560px] w-full">
        <Image
          src="/images/joaquim-header.png"
          alt="Joaquim Neto, perito digital, em seu escritório"
          fill
          priority
          className="object-cover object-[68%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/35 to-transparent" />

        <div className="relative flex h-full w-full max-w-6xl flex-col justify-end px-6 pb-16 sm:justify-center sm:pb-0 mx-auto">
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-td-gold">
              Tribunal Digital
            </p>
            <h1 className="font-title text-4xl font-bold leading-[1.15] text-td-white sm:text-5xl lg:text-6xl">
              Quem não entende provas digitais, não é lembrado para{" "}
              <span className="text-td-cream">grandes operações</span>.
            </h1>
          </div>
        </div>
      </section>

      {/* Sobre o Tribunal Digital */}
      <Reveal className="w-full">
        <section
          id="tribunal-digital"
          className="mx-auto flex w-full max-w-6xl flex-col items-center gap-14 border-t border-td-border px-6 py-20 lg:flex-row lg:gap-20"
        >
          <div className="mx-auto w-full max-w-sm shrink-0 lg:mx-0">
            <Image
              src="/images/logo.jpeg"
              alt="Tribunal Digital"
              width={1024}
              height={1024}
              className="w-full"
              style={{
                maskImage:
                  "radial-gradient(ellipse 80% 80% at center, black 65%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 80% 80% at center, black 65%, transparent 100%)",
              }}
            />
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-td-gold">
              A nova era da advocacia criminalista
            </p>
            <div className="flex flex-col gap-4 leading-relaxed text-td-muted">
              <p>
                A advocacia criminalista entrou numa era nova. Prints,
                extração de celular, geolocalização e log de aplicativo
                decidem processos que antes se resolviam só no confronto de
                teses. Quem não entende integralidade dos dados e cadeia de
                custódia perde a discussão técnica antes de abrir a boca na
                audiência. E não é chamado pras grandes operações.
              </p>
              <p>
                A Comunidade Tribunal Digital existe pra fechar essa lacuna.
                Centenas de advogados criminalistas discutem casos reais entre
                si e com o perito Joaquim Neto, toda semana, ao vivo, além de
                acesso a uma biblioteca de cursos gravados sobre prova
                digital, cadeia de custódia, geolocalização, deepfake e outros
                temas técnicos aplicados à advocacia criminal. É prática
                constante com quem já passou pelo problema técnico que você
                está vendo agora no seu caso.
              </p>
            </div>

            <CTAButton className="mt-8 rounded-sm bg-td-cta px-6 py-3 font-semibold text-td-bg-on-gold transition hover:opacity-90">
              Garantir minha vaga na Comunidade
            </CTAButton>
          </div>
        </section>
      </Reveal>

      {/* Sobre o Joaquim Neto */}
      <Reveal className="w-full">
        <section
          id="joaquim"
          className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 border-t border-td-border px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20"
        >
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-td-gold">
              Quem é
            </p>
            <h2 className="font-title text-3xl font-bold leading-tight text-td-white sm:text-4xl">
              Joaquim Neto, Perito Digital
            </h2>
            <div className="mt-6 flex flex-col gap-4 leading-relaxed text-td-muted">
              <p>
                Sou Joaquim Neto, perito digital, mentor de advogados e
                criador da primeira comunidade de provas digitais para
                advogados do Brasil.
              </p>
              <p>
                Depois de anos mergulhado em investigações, certificações e
                análises forenses, criei o Tribunal Digital, um método que
                ensina advogados criminalistas a transformar provas técnicas
                em teses jurídicas capazes de virar um processo.
              </p>
              <p>
                Hoje, ajudo advogados a descobrir o que a acusação não quer
                que eles vejam: os detalhes invisíveis que fazem toda a
                diferença entre uma condenação e uma absolvição.
              </p>
            </div>
          </div>

          <div className="mx-auto w-full max-w-sm lg:mx-0 lg:ml-auto">
            <Image
              src="/images/joaquim-04.jpeg"
              alt="Joaquim Neto"
              width={1792}
              height={2400}
              className="w-full"
              style={{
                maskImage:
                  "radial-gradient(ellipse 62% 67% at center, black 32%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 62% 67% at center, black 32%, transparent 100%)",
              }}
            />
          </div>
        </section>
      </Reveal>

      {/* Palestras e podcast, dentro do bloco "Quem é" */}
      <Reveal className="w-full">
        <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 border-t border-td-border px-6 py-20 sm:grid-cols-2">
          {PALESTRAS_E_PODCAST.map((video) => (
            <div key={video.id}>
              <YouTubeEmbed id={video.id} title={video.titulo} />
              <p className="mt-3 text-sm leading-relaxed text-td-muted">
                {video.titulo}
              </p>
            </div>
          ))}
        </section>
      </Reveal>

      {/* Estudo de Caso */}
      <Reveal className="w-full">
        <section
          id="estudo-de-caso"
          className="mx-auto w-full max-w-6xl border-t border-td-border px-6 py-20"
        >
          <p className="mb-10 text-xs font-semibold uppercase tracking-widest text-td-gold">
            Estudo de Caso
          </p>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
            {ESTUDOS_DE_CASO.map((video) => (
              <div key={video.id}>
                <YouTubeEmbed id={video.id} title={video.titulo} />
                <h3 className="font-title mt-4 text-xl font-bold text-td-white">
                  {video.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-td-muted">
                  {video.descricao}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Notícias */}
      <Reveal className="w-full">
        <section
          id="noticias"
          className="mx-auto w-full max-w-6xl border-t border-td-border px-6 py-20"
        >
          <p className="mb-10 text-xs font-semibold uppercase tracking-widest text-td-gold">
            Artigos e Notícias
          </p>
          <div className="divide-y divide-td-border border-t border-td-border">
            {posts.length === 0 && (
              <p className="py-6 text-td-muted">Nenhuma matéria publicada ainda.</p>
            )}
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/noticias/${post.slug}`}
                className="group block py-6"
              >
                <p className="mb-1 text-xs uppercase tracking-wide text-td-gold">
                  {formatPostDate(post.frontmatter.date)}
                  {post.frontmatter.source ? ` - ${post.frontmatter.source}` : ""}
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
          <Link
            href="/noticias"
            className="mt-8 inline-block font-semibold text-td-gold transition hover:text-td-cream"
          >
            Ver todas as notícias &rarr;
          </Link>
        </section>
      </Reveal>

      {/* Contato */}
      <Reveal className="w-full">
        <section id="contato" className="relative w-full border-t border-td-border">
          <Image
            src="/images/footer.webp"
            alt=""
            fill
            className="object-cover object-[65%_35%] opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-td-bg via-td-bg/70 to-td-bg/85" />

          <div className="relative mx-auto w-full max-w-xl px-6 py-20">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-td-gold">
              Contato
            </p>
            <h2 className="font-title mb-4 text-2xl font-bold leading-tight text-td-white sm:text-3xl">
              Fale com a equipe do Tribunal Digital
            </h2>
            <p className="mb-8 leading-relaxed text-td-muted">
              Advogado criminalista com um caso que envolve prova digital, ou
              interesse em entender melhor o trabalho? Preenche o formulário
              abaixo.
            </p>
            <ContactForm />
          </div>
        </section>
      </Reveal>
    </main>
  );
}
