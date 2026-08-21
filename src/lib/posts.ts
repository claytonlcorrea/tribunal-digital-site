import { POSTS } from "./posts-data.generated";

export type FaqItem = {
  question: string;
  answer: string;
};

export type PostFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  source?: string;
  // "Resposta direta" — resumo de 2-3 frases logo após o título, pensado pra
  // ser extraído por AI Overviews / assistentes de IA que buscam citar a resposta direto.
  summary?: string;
  // Perguntas frequentes — vira seção visual E schema JSON-LD FAQPage (ver page.tsx).
  faq?: FaqItem[];
};

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  contentHtml: string;
};

export function getAllPosts(): Post[] {
  return POSTS;
}

export function getPostBySlug(slug: string): Post | null {
  return POSTS.find((post) => post.slug === slug) ?? null;
}
