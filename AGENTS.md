# Site institucional Tribunal Digital

## O que é
Site institucional completo do cliente Tribunal Digital, publicado no domínio
tribunaldigital.com.br. Desde 2026-08-21, é uma página única (Hero, Sobre o Tribunal
Digital, Sobre o Joaquim Neto, Contato, tudo em `/`) mais Notícias como página separada
(`/noticias`). Reconstruído do zero nessa data — a versão anterior (com `/sobre`,
`/comunidade`, `/contato` como páginas e conceito visual "Dossiê") foi descartada porque o
cliente não gostou; o histórico fica preservado no repositório git próprio do projeto
(github.com/claytonlcorrea/tribunal-digital-site, privado). Notícias recebe as matérias
geradas pela skill `/tribunal-digital-newsletter` (raiz do workspace) a partir da raspagem
de notícias jurídicas, substituindo a publicação manual no WordPress.

O funil do site é único: todo CTA (nav, hero, seção Sobre o Tribunal Digital) abre um modal
(`CTAModalProvider`/`CTAModal`) que captura nome/telefone/email e redireciona pro checkout
pago da Comunidade — não pra venda de perícia avulsa, que é papel do site pessoal do Joaquim
(joaquimneto.com.br), uma propriedade separada. O design é guiado pela skill
`frontend-design`: fotografia real do cliente em bleed total, tipografia editorial grande,
sem elementos decorativos de UI (nada de chips, badges ou molduras genéricas) — ver
`clientes/tribunal-digital/marca/design-guide.md`.

## Tipo
Produto (site) — deliverable do cliente Tribunal Digital

## Escopo
- App Next.js/React
- Deploy no Cloudflare Workers via OpenNext (`@opennextjs/cloudflare`)
- Domínio próprio: tribunaldigital.com.br (já configurado no Cloudflare)
- Páginas: Home (`/`, página única com âncoras `#tribunal-digital`, `#joaquim`, `#contato`), Notícias (`/noticias`)
- `/sobre`, `/comunidade`, `/contato` e `/servicos` (rotas da versão anterior) redirecionam pra âncoras da home — ver `next.config.ts`
- Posts em arquivos MDX, um por matéria, em `content/posts/`
- `/blog` e `/blog/[slug]` (nome antigo da seção) redirecionam permanentemente pra
  `/noticias` equivalente — não remover esse redirect, tem link de newsletter já enviada
  apontando pra lá
- Formulário de contato cria contato no CRM do Go High Level (`src/app/api/contact/route.ts`)

## Contexto
- Prazo: construção iniciada em 2026-08 ("essa semana")
- Cada matéria nova vem de `clientes/tribunal-digital/conteudo/blog/materia-*.md`
  (gerada pela skill `/tribunal-digital-newsletter`) e deve virar um post MDX aqui
- Identidade visual segue `clientes/tribunal-digital/marca/design-guide.md`

## Arquivos importantes
- `content/posts/*.mdx` — um arquivo por matéria publicada. Frontmatter obrigatório: `title`, `date`, `excerpt`, `source`. Frontmatter opcional pra SEO/IA: `summary` (resposta direta de 2-3 frases, renderizada em destaque logo após o título — pensada pra ser extraída por AI Overviews/assistentes) e `faq` (lista de `{question, answer}`, vira seção visual de FAQ E schema JSON-LD FAQPage). Nem toda matéria precisa de `summary`/`faq`, mas ajuda bastante em pauta que tem resposta objetiva (definição, "isso é crime?", "o que fazer se...")
- `scripts/generate-posts.mjs` — lê `content/posts/*.mdx`, converte markdown pra HTML (via `marked`) e gera `src/lib/posts-data.generated.ts`. Roda automaticamente antes de `build`/`dev` (ver `package.json`)
- `src/lib/posts-data.generated.ts` — gerado, não editar à mão
- `src/lib/posts.ts` — lê os dados já gerados (`posts-data.generated.ts`)
- `src/app/page.tsx` — página única: Hero (`#hero`), Sobre o Tribunal Digital (`#tribunal-digital`), Sobre o Joaquim Neto (`#joaquim`, com os vídeos de palestra/podcast logo abaixo), Estudo de Caso (`#estudo-de-caso`, 2 vídeos), Contato (`#contato`)
- `src/components/YouTubeEmbed.tsx` — embed com facade (miniatura do YouTube + clique pra carregar o iframe), usado nas seções Joaquim e Estudo de Caso. Os 4 vídeos são do canal pessoal do Joaquim (não hospedados aqui)
- `src/app/noticias/page.tsx` — listagem completa
- `src/app/noticias/[slug]/page.tsx` — post individual, renderiza `contentHtml` pré-compilado + resposta direta + FAQ, e injeta JSON-LD (`Article` sempre, `FAQPage` quando o post tem `faq`)
- `src/components/CTAModalProvider.tsx` / `CTAModal.tsx` / `CTAButton.tsx` — sistema de CTA global. `CTAModalProvider` envolve o `<body>` (em `layout.tsx`) e expõe `useCTAModal()`; qualquer botão em qualquer página usa `<CTAButton>` (ou o hook direto) pra abrir o modal, que captura nome/telefone/email e redireciona pro checkout (`CHECKOUT_URL` dentro de `CTAModal.tsx`)
- `src/components/ContactForm.tsx` — formulário da seção Contato (nome/email/telefone/mensagem + honeypot), diferente do `CTAModal` (esse não redireciona pro checkout, só cria contato)
- `src/app/api/community/route.ts` — recebe o form do `CTAModal` e cria contato no GHL, tag `site-comunidade`
- `src/app/api/contact/route.ts` — recebe o `ContactForm` e cria contato no GHL, tag `site-contato`. Ambas as rotas precisam de `GHL_API_TOKEN` (escopo `contacts.write`) e `GHL_LOCATION_ID` como secrets (`wrangler secret put`, ou `.dev.vars` local) — sem isso, respondem erro genérico sem quebrar o resto do site
- `src/components/Nav.tsx` / `Footer.tsx` — navegação e rodapé compartilhados. Footer usa `public/images/footer.webp` como imagem de fundo. Ícones: Instagram @peritojoaquimneto, LinkedIn peritojoaquimneto, WhatsApp +55 85 8688-4321
- `next.config.ts` — redirect `/blog` → `/noticias`, e `/sobre` `/comunidade` `/contato` `/servicos` → âncoras da home
- `src/app/sitemap.ts` / `src/app/robots.ts` — sitemap e robots.txt gerados a partir dos posts, automáticos
- `src/app/globals.css` — paleta e tipografia do Tribunal Digital (Tailwind v4, tokens `--td-*`)
- `wrangler.jsonc` — config do Worker `tribunal-digital-blog`, rotas do domínio tribunaldigital.com.br
- `public/images/joaquim-header.png` — foto do hero (Joaquim à direita, espaço vazio à esquerda pra headline)
- `public/images/joaquim-perfil.png` — foto retrato P&B usada na seção Sobre o Joaquim
- `public/images/logo.jpeg` — selo/logo oficial do Tribunal Digital, usado no nav e na seção Sobre o Tribunal Digital
- `public/images/footer.webp` — foto de fundo do rodapé
- Todas as fotos originais (resolução maior) ficam em `clientes/tribunal-digital/marca/fotos/`

## Regras específicas
- Publicação de post novo é feita pela skill `/publicar-blog-td` (raiz do workspace), não manualmente
- Nunca alterar o texto de uma matéria já aprovada ao converter pra MDX
- Cores e fontes sempre via os tokens `--td-*` de `globals.css`, nunca hardcoded
- Deploy: `npm run deploy` (roda `opennextjs-cloudflare build` + `deploy`)
- **Nunca ler conteúdo via `fs` em runtime, nem compilar Markdown/MDX em runtime (ex: `next-mdx-remote` renderizando a cada request).** O runtime do Cloudflare Workers (workerd) não dá acesso confiável a filesystem arbitrário nem bundla de forma consistente árvores de dependência grandes tipo remark/rehype/mdast. Todo conteúdo tem que virar dado estático (JS/JSON) em build time — é o que `generate-posts.mjs` faz. Isso já causou um bug real em produção (posts sumindo / Internal Server Error) antes de virar essa regra
- Testar sempre com `npm run preview` (roda no runtime real via workerd) antes de `npm run deploy` — `npm run dev`/`next start` rodam em Node.js puro e escondem esse tipo de bug
- **Redirect com wildcard zero-or-more (`:path*`) não substitui certo no destino quando captura zero segmentos** — `source: "/blog/:path*"` redirecionando pra `destination: "/noticias/:path*"` gerava a URL literal `/noticias/:path*` pro caso `/blog` sem slug (só funcionava com slug). Solução: regra exata separada pro caminho vazio + `:path+` (um-ou-mais) pro resto. Sempre testar redirect com `fetch(..., { redirect: 'manual' })` via `npm run preview` antes de confiar
- Segredos (`GHL_API_TOKEN`, `GHL_LOCATION_ID`) nunca em `wrangler.jsonc` nem commitados — só via `wrangler secret put` (produção) ou `.dev.vars` (local, gitignored). `.dev.vars.example` fica commitado com os campos vazios

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
