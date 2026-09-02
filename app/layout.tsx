import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import BuildVersionGuard from "@/components/BuildVersionGuard";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { SharedSiteJsonLd } from "@/components/seo/JsonLd";
import BrandRouteBoundary from "@/components/brand/BrandRouteBoundary";
import ConditionalClarity from "@/components/ConditionalClarity";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://werkcv.nl'),
  title: {
    default: "WerkCV - Professioneel CV Maken | Online CV Builder",
    template: "%s",
  },
  description: "Maak binnen 5 minuten een professioneel CV. Kies uit 13+ ATS-vriendelijke templates, vul je gegevens in en download als PDF. Eenmalig €4,99, geen abonnement.",
  keywords: [
    "cv maken",
    "cv builder",
    "cv online maken",
    "professioneel cv",
    "cv template",
    "cv voorbeeld",
    "curriculum vitae maken",
    "cv schrijven",
    "cv downloaden",
    "ATS-vriendelijk cv",
    "gratis cv maker",
    "cv pdf downloaden",
    "sollicitatie cv",
    "cv nederland",
  ],
  openGraph: {
    title: "WerkCV - Professioneel CV Maken | Online CV Builder",
    description: "Maak binnen 5 minuten een professioneel CV. Kies uit 13+ ATS-vriendelijke templates en download als PDF. Eenmalig €4,99.",
    url: "https://werkcv.nl",
    siteName: "WerkCV",
    locale: "nl_NL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "WerkCV - Professioneel CV Maken",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@werkcvnl",
    title: "WerkCV - Professioneel CV Maken",
    description: "Maak binnen 5 minuten een professioneel CV. 13+ templates, eenmalig €4,99, geen abonnement.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "https://werkcv.nl",
  },
};

export const viewport: Viewport = {
  themeColor: "#4ECDC4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" suppressHydrationWarning translate="no">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.lang=location.pathname==='/en'||location.pathname.startsWith('/en/')?'en':'nl';",
          }}
        />
        <meta name="google" content="notranslate" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="WerkCV updates"
          href="https://werkcv.nl/rss.xml"
        />
        <SharedSiteJsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} antialiased notranslate`}
      >
        <ConditionalClarity />
        <GoogleAnalytics />
        <AnalyticsProvider />
        <BuildVersionGuard />
        <BrandRouteBoundary>{children}</BrandRouteBoundary>
      </body>
    </html>
  );
}

