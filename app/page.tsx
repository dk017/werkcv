import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";
import { FAQJsonLd, HowToJsonLd } from "@/components/seo/JsonLd";
import {
  cvDownloadPrice,
  homepageFaqItems,
  siteAggregateRating,
  siteName,
  siteUrl,
} from "@/lib/site-content";

const homepageHowToSteps = [
  {
    name: "Kies een template",
    text: "Selecteer een rustige, ATS-vriendelijke CV-template die past bij Nederlandse vacatures.",
  },
  {
    name: "Vul je gegevens in",
    text: "Werk je profiel, werkervaring, opleiding en vaardigheden uit in de editor met live preview.",
  },
  {
    name: "Download als PDF",
    text: `Start gratis en betaal eenmalig ${cvDownloadPrice.display} wanneer je je CV als PDF wilt downloaden.`,
  },
];

const homepageWebPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "CV Maken voor Nederlandse Vacatures – Gratis Starten | WerkCV",
  url: siteUrl,
  description:
    "Bouw gratis een professioneel, ATS-vriendelijk CV met 13+ templates voor de Nederlandse arbeidsmarkt. Eenmalig €4,99 bij download, geen abonnement.",
  inLanguage: "nl-NL",
  isPartOf: {
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
  },
};

const homepageSoftwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteName,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: siteUrl,
  description:
    "Nederlandse CV builder waarmee je gratis start, ATS-vriendelijke templates kiest en een CV maakt voor Nederlandse vacatures.",
  inLanguage: "nl-NL",
  areaServed: {
    "@type": "Country",
    name: "Netherlands",
  },
  offers: {
    "@type": "Offer",
    price: cvDownloadPrice.value,
    priceCurrency: cvDownloadPrice.currency,
    availability: "https://schema.org/InStock",
    url: `${siteUrl}/prijzen`,
  },
  featureList: [
    "ATS-vriendelijke CV templates",
    "Gratis starten zonder abonnement",
    "Eenmalige PDF-download",
    "Nederlandse arbeidsmarkt focus",
    "Later opnieuw downloaden",
  ],
  provider: {
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
  },
  ...(siteAggregateRating
    ? {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: siteAggregateRating.ratingValue,
          reviewCount: siteAggregateRating.reviewCount,
          bestRating: siteAggregateRating.bestRating ?? 5,
          worstRating: siteAggregateRating.worstRating ?? 1,
        },
      }
    : {}),
};

export const metadata: Metadata = {
  title: {
    absolute: "CV Maken voor Nederlandse Vacatures – Gratis Starten | WerkCV",
  },
  description:
    "Bouw gratis een professioneel, ATS-vriendelijk CV met 13+ templates voor de Nederlandse arbeidsmarkt. Eenmalig €4,99 bij download, geen abonnement. | WerkCV",
  keywords: [
    "cv maken",
    "cv maken nederland",
    "cv builder nederland",
    "ats vriendelijk cv",
    "cv voor nederlandse vacatures",
    "gratis cv maken",
    "cv template nederland",
    "cv downloaden pdf",
  ],
  alternates: {
    canonical: "https://werkcv.nl",
    languages: {
      nl: "https://werkcv.nl",
      "nl-NL": "https://werkcv.nl",
      en: "https://werkcv.nl/en",
      "en-NL": "https://werkcv.nl/en",
      "x-default": "https://werkcv.nl",
    },
  },
  openGraph: {
    title: "CV Maken voor Nederlandse Vacatures – Gratis Starten | WerkCV",
    description:
      "Bouw gratis een professioneel, ATS-vriendelijk CV met 13+ templates voor de Nederlandse arbeidsmarkt. Eenmalig €4,99 bij download, geen abonnement.",
    url: "https://werkcv.nl",
    siteName: "WerkCV",
    locale: "nl_NL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "WerkCV - CV maken voor Nederlandse vacatures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@werkcvnl",
    title: "CV Maken voor Nederlandse Vacatures – Gratis Starten | WerkCV",
    description:
      "Bouw gratis een professioneel, ATS-vriendelijk CV met 13+ templates voor de Nederlandse arbeidsmarkt. Eenmalig €4,99 bij download, geen abonnement.",
    images: ["/opengraph-image"],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageWebPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSoftwareApplicationJsonLd) }}
      />
      <FAQJsonLd questions={homepageFaqItems} />
      <HowToJsonLd
        name="Hoe maak je een ATS-vriendelijk CV voor Nederlandse vacatures"
        description="Gebruik WerkCV om gratis te starten, een ATS-vriendelijke template te kiezen en later als PDF te downloaden."
        steps={homepageHowToSteps}
      />
      <HomePageClient />
    </>
  );
}
