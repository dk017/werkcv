import type { Metadata } from "next";
import { getLanguageAlternates } from "@/lib/i18n/route-pairs";

const BASE_URL = "https://werkcv.nl";
const DEFAULT_OG_IMAGE = `${BASE_URL}/opengraph-image`;

type BuildDutchMetadataInput = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  keywords?: string[];
  type?: "website" | "article";
  languages?: Record<string, string>;
};

export function buildDutchMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  languages,
}: BuildDutchMetadataInput): Metadata {
  const canonical = path === "/" ? BASE_URL : `${BASE_URL}${path}`;
  const languageAlternates = languages ?? getLanguageAlternates(path);

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical,
      ...(languageAlternates ? { languages: languageAlternates } : {}),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "WerkCV",
      locale: "nl_NL",
      type,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@werkcvnl",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}
