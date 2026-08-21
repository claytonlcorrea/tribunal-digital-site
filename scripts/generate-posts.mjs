// Lê content/posts/*.mdx e gera src/lib/posts-data.generated.ts como módulo JS estático.
//
// Por quê: no runtime do Cloudflare Workers (workerd), fs.readFileSync/readdirSync não
// tem acesso confiável a arquivos arbitrários do projeto, mesmo quando o file tracer do
// Next.js empacota o diretório. A solução usada por qualquer app Next.js rodando em edge
// runtime é converter o conteúdo em dados estáticos importados via módulo JS em vez de
// lidos do disco em runtime. Esse script roda antes do `next build` (ver package.json).

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const OUT_FILE = path.join(
  process.cwd(),
  "src",
  "lib",
  "posts-data.generated.ts",
);

const files = fs.existsSync(POSTS_DIR)
  ? fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"))
  : [];

const posts = files.map((filename) => {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  // HTML pré-compilado no build — o Worker nunca compila Markdown em runtime.
  const contentHtml = marked.parse(content, { async: false });
  return { slug, frontmatter: data, contentHtml };
});

posts.sort(
  (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date),
);

const header = `// Gerado automaticamente por scripts/generate-posts.mjs a partir de content/posts/*.mdx
// Não editar à mão — rode "npm run build" (ou o script direto) pra regenerar.
import type { Post } from "./posts";

export const POSTS: Post[] = `;

fs.writeFileSync(OUT_FILE, header + JSON.stringify(posts, null, 2) + ";\n");

console.log(`Gerados ${posts.length} post(s) em src/lib/posts-data.generated.ts`);
