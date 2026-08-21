import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Notícias — Tribunal Digital",
};

export default function NoticiasIndex() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 pt-20 pb-20">
      <div className="mx-auto mb-10 flex max-w-xs items-center gap-3 font-mono text-[11px] tracking-widest text-td-muted uppercase">
        <span className="h-px flex-1 bg-td-border" />
        Tribunal Digital · Notícias
        <span className="h-px flex-1 bg-td-border" />
      </div>
      <h1 className="font-title mb-10 text-center text-3xl font-bold text-td-white sm:text-4xl">
        Notícias
      </h1>
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
              {post.frontmatter.source}
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
