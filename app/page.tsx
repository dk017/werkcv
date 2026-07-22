import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { getAllArticles } from "@/lib/cv-tips/registry";
import { getAllCategories, getAllExamples } from "@/lib/cv-voorbeelden/registry";
import { templateList } from "@/lib/templates/registry";
import {
  cvDownloadPrice,
  homepageFaqItems,
  siteAggregateRating,
  siteName,
  siteUrl,
} from "@/lib/site-content";
const homepageWebPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "CV Maken voor Nederlandse Vacatures – Gratis Starten | WerkCV",
  url: siteUrl,
  description:
    "Bouw gratis een professioneel, ATS-vriendelijk CV met 13+ templates voor de Nederlandse arbeidsmarkt. Eenmalig €4,99 bij download, geen abonnement.",
  inLanguage: "nl-NL",
  isPartOf: { "@id": "https://werkcv.nl/#website" },
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
  provider: { "@id": "https://werkcv.nl/#organization" },
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
  const articles = getAllArticles();
  const categories = getAllCategories();
  const showcaseTemplates = ["professional", "modern", "elegant", "ats"]
    .map((id) => templateList.find((template) => template.id === id))
    .filter((template): template is NonNullable<typeof template> => Boolean(template));

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
      <HomePageClient
        templateCount={templateList.length}
        articleCount={articles.length}
        exampleCount={getAllExamples().length}
        categoryCount={categories.length}
        showcaseTemplates={showcaseTemplates}
        featuredArticles={articles
          .filter((article) => article.featured)
          .slice(0, 3)
          .map(({ slug, title }) => ({ slug, title }))}
        featuredCategories={categories
          .slice(0, 6)
          .map(({ slug, name }) => ({ slug, name }))}
      />
    </>
  );
}
