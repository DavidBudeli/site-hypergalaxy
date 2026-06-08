import type { Metadata, Viewport } from "next";
import "./globals.css";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Hyper Galaxy",
  url: "https://hypergalaxy.cloud",
  description:
    "Infraestrutura inteligente para IA, automação e operações em escala.",
  sameAs: ["https://hypergalaxy.cloud"],
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
    email: "hello@hypergalaxy.cloud",
    availableLanguage: ["Portuguese", "English"]
  }
};

export const metadata: Metadata = {
  title: {
    default: "Hyper Galaxy Cloud",
    template: "%s | Hyper Galaxy Cloud"
  },
  description: "Infraestrutura inteligente para IA, automação e operações em escala.",
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
  icons: {
    icon: "/assets/brand/hyper-galaxy-app-icon.png",
    apple: "/assets/brand/hyper-galaxy-app-icon.png"
  },
  metadataBase: new URL("https://hypergalaxy.cloud"),
  alternates: {
    canonical: "https://hypergalaxy.cloud"
  },
  openGraph: {
    title: "Hyper Galaxy Cloud",
    description: "Infraestrutura inteligente para IA, automação e operações em escala.",
    url: "https://hypergalaxy.cloud",
    siteName: "Hyper Galaxy",
    type: "website",
    locale: "pt_BR",
    alternateLocale: ["en_US"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Hyper Galaxy Cloud",
    description: "Infraestrutura inteligente para IA, automação e operações em escala."
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
