import type { Metadata } from "next";
import { templateList } from "@/lib/templates/registry";
import TemplateGallery from "./gallery";
import { cookies } from "next/headers";
import { normalizeStartSource, PENDING_START_SOURCE_COOKIE, readEncodedStartSource } from "@/lib/start-source";

const pageUrl = "https://werkcv.nl/templates";

export const metadata: Metadata = {
  title: {
    absolute: "ATS-vriendelijke CV Templates voor Nederlandse Vacatures | WerkCV",
  },
  description:
    "Vergelijk ATS-vriendelijke CV templates voor Nederlandse vacatures. Kies rustig, modern of strikt ATS, start gratis en betaal pas bij PDF-download. | WerkCV",
  keywords: [
    "cv template",
    "cv ontwerp",
    "cv layout",
    "professioneel cv template",
    "modern cv template",
    "klassiek cv template",
    "ATS-vriendelijk cv template",
    "cv template kiezen",
    "cv stijl",
    "gratis cv template",
  ],
  alternates: {
    canonical: pageUrl,
    languages: {
      "nl-NL": pageUrl,
      "en-NL": "https://werkcv.nl/en/templates",
      "x-default": pageUrl,
    },
  },
  openGraph: {
    title: "ATS-vriendelijke CV Templates voor Nederlandse Vacatures | WerkCV",
    description:
      "Vergelijk ATS-vriendelijke CV templates voor Nederlandse vacatures. Kies rustig, modern of strikt ATS, start gratis en betaal pas bij PDF-download.",
    url: pageUrl,
    siteName: "WerkCV",
    locale: "nl_NL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "WerkCV - ATS-vriendelijke CV templates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ATS-vriendelijke CV Templates voor Nederlandse Vacatures | WerkCV",
    description:
      "Vergelijk ATS-vriendelijke CV templates voor Nederlandse vacatures. Kies rustig, modern of strikt ATS, start gratis en betaal pas bij PDF-download.",
    images: ["/opengraph-image"],
  },
};

export default async function TemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{ startSource?: string }>;
}) {
  const { startSource } = await searchParams;
  const cookieStore = await cookies();
  const resolvedStartSource =
    normalizeStartSource(startSource) ||
    readEncodedStartSource(cookieStore.get(PENDING_START_SOURCE_COOKIE)?.value) ||
    undefined;
  return (
    <main id="quick-start">
      <TemplateGallery templates={templateList} initialStartSource={resolvedStartSource} />
    </main>
  );
}
