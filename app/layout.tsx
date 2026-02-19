import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://werkcv.nl'),
  title: {
    default: "WerkCV.nl - Professioneel CV Maken | Online CV Builder",
    template: "%s | WerkCV.nl",
  },
  description: "Maak binnen 5 minuten een professioneel CV. Kies uit 13+ ATS-vriendelijke templates, vul je gegevens in en download als PDF. Eenmalig €5, geen abonnement.",
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
    title: "WerkCV.nl - Professioneel CV Maken | Online CV Builder",
    description: "Maak binnen 5 minuten een professioneel CV. Kies uit 13+ ATS-vriendelijke templates en download als PDF. Eenmalig €5.",
    url: "https://werkcv.nl",
    siteName: "WerkCV.nl",
    locale: "nl_NL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "WerkCV.nl – Professioneel CV Maken",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WerkCV.nl - Professioneel CV Maken",
    description: "Maak binnen 5 minuten een professioneel CV. 13+ templates, eenmalig €5, geen abonnement.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "https://werkcv.nl",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" suppressHydrationWarning translate="no">
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased notranslate`}
      >
        <GoogleAnalytics />
        <AnalyticsProvider />
        {children}
      </body>
    </html>
  );
}
