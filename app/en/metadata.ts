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
  const fullTitle = `${title} | WerkCV.nl`;

  return {
    title: fullTitle,
    description,
    keywords,
    alternates: {
      canonical,
      languages: {
        "en-NL": canonical,
        "nl-NL": dutchUrl,
        "x-default": canonical,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: "WerkCV.nl",
      locale: "en_NL",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
