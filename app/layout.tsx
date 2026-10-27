import { cvDownloadPrice } from "@/lib/site-content";
import type { Metadata, Viewport } from "next";
import { Gelasio, Geist, Geist_Mono, Inter, Manrope, Merriweather, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import BuildVersionGuard from "@/components/BuildVersionGuard";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { SharedSiteJsonLd } from "@/components/seo/JsonLd";
import BrandRouteBoundary from "@/components/brand/BrandRouteBoundary";
import ConditionalClarity from "@/components/ConditionalClarity";
import ClarityConsentBanner from "@/components/ClarityConsentBanner";
import AgencyAnalyticsPreferences from "@/components/agency/AgencyAnalyticsPreferences";

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

// CV fonts (templates and the document-mode font choice). Bundled, so the browser preview and the
// server-side PDF render the same font; not preloaded, so other pages do not download them.
// Gelasio has the same character widths as Georgia, so the serif templates keep their layout.
const cvTemplateSerif = Gelasio({ variable: "--font-cv-template-serif", subsets: ["latin"], display: "swap", preload: false });
const cvSerif = Source_Serif_4({ variable: "--font-cv-serif", subsets: ["latin"], display: "swap", preload: false });
const cvInter = Inter({ variable: "--font-cv-inter", subsets: ["latin"], display: "swap", preload: false });
const cvMerriweather = Merriweather({ variable: "--font-cv-merriweather", subsets: ["latin"], weight: ["400", "700"], display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL('https://werkcv.nl'),
  title: {
    default: "WerkCV - Professioneel CV Maken | Online CV Builder",
    template: "%s",
  },
  description: `Maak binnen 5 minuten een professioneel CV. Kies uit 13+ ATS-vriendelijke templates, vul je gegevens in en download als PDF. Eenmalig ${cvDownloadPrice.display}, geen abonnement.`,
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
  // No url/title/description here: a page without its own openGraph inherits this object, and
  // the homepage's values would make it claim to be the homepage. Crawlers fall back to the
  // page's <title> and URL. The homepage sets its own openGraph.
  openGraph: {
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
    images: ["/opengraph-image"],
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
        className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${cvTemplateSerif.variable} ${cvSerif.variable} ${cvInter.variable} ${cvMerriweather.variable} antialiased notranslate`}
      >
        <ConditionalClarity />
        <GoogleAnalytics />
        <AnalyticsProvider />
        <BuildVersionGuard />
        <BrandRouteBoundary>{children}</BrandRouteBoundary>
        <AgencyAnalyticsPreferences />
        <ClarityConsentBanner />
      </body>
    </html>
  );
}

