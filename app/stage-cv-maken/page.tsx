import type { Metadata } from "next";
import StudentCvGuidePage from "@/components/seo/StudentCvGuidePage";
import { stageCvGuide } from "@/lib/student-cv-guides";

export const metadata: Metadata = {
  title: stageCvGuide.metaTitle,
  description: stageCvGuide.metaDescription,
  keywords: [
    "stage cv maken",
    "cv mbo stage",
    "cv stage zonder ervaring",
    "cv maken voor stage",
    "stage cv voorbeeld",
  ],
  alternates: {
    canonical: "https://werkcv.nl/stage-cv-maken",
    languages: {
      "nl-NL": "https://werkcv.nl/stage-cv-maken",
      "x-default": "https://werkcv.nl/stage-cv-maken",
    },
  },
  openGraph: {
    title: stageCvGuide.metaTitle,
    description: stageCvGuide.metaDescription,
    type: "article",
    locale: "nl_NL",
    url: "https://werkcv.nl/stage-cv-maken",
  },
};

export default function StageCvMakenPage() {
  return <StudentCvGuidePage config={stageCvGuide} />;
}
