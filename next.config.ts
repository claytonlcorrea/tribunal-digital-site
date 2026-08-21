import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Regra separada pro caminho vazio: "/blog/:path*" sozinho não substitui o
        // destino corretamente quando :path* captura zero segmentos (bug observado
        // em teste real via npm run preview — a URL virava "/noticias/:path*" literal).
        source: "/blog",
        destination: "/noticias",
        permanent: true,
      },
      {
        source: "/blog/:path+",
        destination: "/noticias/:path+",
        permanent: true,
      },
      // Rotas da versão anterior do site, que agora são seções da página única.
      { source: "/comunidade", destination: "/#tribunal-digital", permanent: true },
      { source: "/sobre", destination: "/#joaquim", permanent: true },
      { source: "/contato", destination: "/#contato", permanent: true },
      { source: "/servicos", destination: "/#tribunal-digital", permanent: true },
    ];
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
