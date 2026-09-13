import type { Metadata } from "next";
import StudentCvGuidePage from "@/components/seo/StudentCvGuidePage";
import { bblCvGuide } from "@/lib/student-cv-guides";

export const metadata: Metadata = {
  title: bblCvGuide.metaTitle,
  description: bblCvGuide.metaDescription,
  keywords: [
    "cv bbl opleiding",
    "cv leerwerkplek",
    "cv bbl zonder ervaring",
    "bbl cv voorbeeld",
    "leerwerkplek cv maken",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-gids/cv-bbl-opleiding",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-gids/cv-bbl-opleiding",
      "x-default": "https://werkcv.nl/cv-gids/cv-bbl-opleiding",
    },
  },
  openGraph: {
    title: bblCvGuide.metaTitle,
    description: bblCvGuide.metaDescription,
    type: "article",
    locale: "nl_NL",
    url: "https://werkcv.nl/cv-gids/cv-bbl-opleiding",
  },
};

export default function BblCvOpleidingPage() {
  return <StudentCvGuidePage config={bblCvGuide} />;
}
