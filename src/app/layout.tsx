import type { Metadata, Viewport } from "next";
import "./globals.css";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Hyper Galaxy",
  url: "https://hypergalaxy.ai",
  description:
    "AI intelligence infrastructure, automation systems and premium SaaS platforms for modern companies.",
  sameAs: ["https://hypergalaxy.ai"],
  knowsAbout: [
    "Artificial Intelligence",
    "Automation",
    "SaaS Platforms",
    "AI Agents",
    "Cloud Infrastructure"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "hello@hypergalaxy.ai",
    availableLanguage: ["Portuguese", "English"]
  }
};

export const metadata: Metadata = {
  title: {
    default: "Hyper Galaxy | AI, Automacao e Plataformas SaaS",
    template: "%s | Hyper Galaxy"
  },
  description:
    "Hyper Galaxy constroi sistemas inteligentes, automacoes e plataformas escalaveis para empresas modernas.",
  keywords: [
    "Hyper Galaxy",
    "inteligencia artificial",
    "automacao",
    "SaaS",
    "software house",
    "agentes IA",
    "infraestrutura"
  ],
  authors: [{ name: "Hyper Galaxy" }],
  creator: "Hyper Galaxy",
  metadataBase: new URL("https://hypergalaxy.ai"),
  openGraph: {
    title: "Hyper Galaxy | AI Intelligence Infrastructure",
    description:
      "Uma plataforma premium para agentes de IA, automacoes e sistemas SaaS escalaveis.",
    url: "https://hypergalaxy.ai",
    siteName: "Hyper Galaxy",
    type: "website",
    locale: "pt_BR",
    alternateLocale: ["en_US"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Hyper Galaxy | AI Intelligence Infrastructure",
    description:
      "Tecnologia, IA e automacao para empresas modernas."
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  themeColor: "#030712",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
