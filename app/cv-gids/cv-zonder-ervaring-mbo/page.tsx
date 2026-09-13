import type { Metadata } from "next";
import StudentCvGuidePage from "@/components/seo/StudentCvGuidePage";
import { mboWithoutExperienceGuide } from "@/lib/student-cv-guides";

export const metadata: Metadata = {
  title: mboWithoutExperienceGuide.metaTitle,
  description: mboWithoutExperienceGuide.metaDescription,
  keywords: [
    "cv zonder ervaring mbo",
    "profieltekst cv mbo student",
    "cv mbo student",
    "eerste cv mbo",
    "cv maken zonder werkervaring",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-gids/cv-zonder-ervaring-mbo",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-gids/cv-zonder-ervaring-mbo",
      "x-default": "https://werkcv.nl/cv-gids/cv-zonder-ervaring-mbo",
    },
  },
  openGraph: {
    title: mboWithoutExperienceGuide.metaTitle,
    description: mboWithoutExperienceGuide.metaDescription,
    type: "article",
    locale: "nl_NL",
    url: "https://werkcv.nl/cv-gids/cv-zonder-ervaring-mbo",
  },
};

export default function MboCvZonderErvaringPage() {
  return <StudentCvGuidePage config={mboWithoutExperienceGuide} />;
}
