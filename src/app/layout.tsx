import type { Metadata } from "next";
import { Lora, Montserrat, IBM_Plex_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Toques monoespaçados em referências de página ("fls. 01") e dados —
// textura de auto processual, ver clientes/tribunal-digital/marca/design-guide.md
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Tribunal Digital",
  description:
    "Provas digitais, cadeia de custódia e estratégia técnica para advogados criminalistas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${lora.variable} ${montserrat.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-td-bg text-td-white">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
