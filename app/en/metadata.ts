import type { Metadata } from "next";

const BASE_URL = "https://werkcv.nl";

type BuildEnglishMetadataInput = {
  title: string;
  description: string;
  path: `/en${string}`;
  nlPath: `/${string}` | "/";
  keywords: string[];
  type?: "website" | "article";
};

export function buildEnglishMetadata({
  title,
  description,
  path,
  nlPath,
  keywords,
  type = "website",
}: BuildEnglishMetadataInput): Metadata {
  const canonical = `${BASE_URL}${path}`;
  const dutchUrl = `${BASE_URL}${nlPath}`;
  const fullTitle = `${title} | WerkCV`;
  const ogImageUrl = `${BASE_URL}/opengraph-image`;

  return {
    title: {
      absolute: fullTitle,
    },
    description,
    keywords,
    alternates: {
      canonical,
      languages: {
        en: canonical,
        "en-NL": canonical,
        nl: dutchUrl,
        "nl-NL": dutchUrl,
        "x-default": canonical,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: "WerkCV",
      locale: "en_NL",
      type,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@werkcvnl",
      title: fullTitle,
      description,
      images: [ogImageUrl],
    },
  };
}
