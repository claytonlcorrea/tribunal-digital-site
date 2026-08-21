import type { Metadata } from "next";
import { Lora, Montserrat } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CTAModalProvider } from "@/components/CTAModalProvider";
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

export const metadata: Metadata = {
  title: "Tribunal Digital",
  description:
    "Provas digitais, cadeia de custódia e estratégia técnica para advogados criminalistas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${lora.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-td-bg text-td-white">
        <CTAModalProvider>
          <Nav />
          {children}
          <Footer />
        </CTAModalProvider>
      </body>
    </html>
  );
}
