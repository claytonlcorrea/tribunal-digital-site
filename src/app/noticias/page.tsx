import Link from "next/link";
import type { Metadata } from "next";
import { formatPostDate, getAllPosts } from "@/lib/posts";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Artigos e Notícias — Tribunal Digital",
};

export default function NoticiasIndex() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 pt-20 pb-20">
      <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-td-gold">
        Tribunal Digital
      </p>
      <h1 className="font-title mb-10 text-center text-3xl font-bold text-td-white sm:text-4xl">
        Artigos e Notícias
      </h1>
      <NewsletterForm />
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
            <h2 className="font-title text-xl font-semibold text-td-white transition group-hover:text-td-cream">
              {post.frontmatter.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-td-muted">
              {post.frontmatter.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
