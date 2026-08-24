import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { formatPostDate, getAllPosts, getPostBySlug } from "@/lib/posts";
import ShareButtons from "@/components/ShareButtons";

const SITE_URL = "https://tribunaldigital.com.br";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const url = `${SITE_URL}/noticias/${slug}`;
  return {
    title: `${post.frontmatter.title} — Tribunal Digital`,
    description: post.frontmatter.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      url,
      type: "article",
      publishedTime: post.frontmatter.date,
      siteName: "Tribunal Digital",
    },
  };
}

export default async function NoticiaPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/noticias/${slug}`;

  // Article schema — ajuda Google e crawlers de IA a identificar autor, data e assunto.
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    author: { "@type": "Person", name: "Joaquim Neto" },
    publisher: { "@type": "Organization", name: "Tribunal Digital" },
    mainEntityOfPage: url,
  };

  // FAQPage schema — só quando o post tem FAQ estruturado no frontmatter.
  // É o que faz a pergunta/resposta aparecer direto no Google e ser citável por IA.
  const faqSchema = post.frontmatter.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.frontmatter.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-td-gold">
        {formatPostDate(post.frontmatter.date)}
        {post.frontmatter.source ? ` - ${post.frontmatter.source}` : ""}
      </p>
      <h1 className="font-title mb-6 text-3xl font-bold leading-tight text-td-white sm:text-4xl">
        {post.frontmatter.title}
      </h1>

      <ShareButtons url={url} title={post.frontmatter.title} />

      {post.frontmatter.summary && (
        <div className="mb-8 rounded-md border-l-2 border-td-border bg-td-card px-6 py-5">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-td-gold">
            Resposta direta
          </p>
          <p className="text-td-white">{post.frontmatter.summary}</p>
        </div>
      )}

      <div
        className="prose-td"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {post.frontmatter.faq && post.frontmatter.faq.length > 0 && (
        <div className="mt-12">
          <h2 className="font-title mb-4 text-2xl font-bold text-td-white">
            Perguntas frequentes
          </h2>
          <div className="flex flex-col gap-3">
            {post.frontmatter.faq.map((item) => (
              <div
                key={item.question}
                className="rounded-md border-l-2 border-td-border bg-td-card px-6 py-5"
              >
                <p className="mb-2 font-semibold text-td-cream">
                  {item.question}
                </p>
                <p className="text-td-white">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
