import type { Metadata } from "next";
import CvCheckMethodology from "@/components/cv-check/CvCheckMethodology";
import { buildEnglishMetadata } from "@/app/en/metadata";

export const metadata: Metadata = buildEnglishMetadata({
  title: "How the WerkCV CV Check Calculates Your Grade: Methodology",
  description:
    "Which checks the WerkCV CV check runs, how much each part counts, what rules and AI assess, and what the grade does not tell you.",
  path: "/en/cv-check/methodology",
  nlPath: "/cv-check/methodologie",
  keywords: ["cv checker methodology", "cv score explained", "ats check method"],
});

export default function EnglishCvCheckMethodologyPage() {
  return <CvCheckMethodology locale="en" />;
}
