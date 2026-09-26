import type { Metadata } from "next";
import CvCheckLanding from "@/components/cv-check/CvCheckLanding";
import { buildEnglishMetadata } from "@/app/en/metadata";
import { CV_CHECK_LANDINGS } from "@/lib/cv-check/landing-content";

export const metadata: Metadata = buildEnglishMetadata({
  title: "Compare Your CV With a Job Ad in the Netherlands: Free Job Match Check",
  description:
    "Compare your CV with a Dutch job ad for free. See per requirement whether your CV shows it, with quotes from both, and the three fixes to make first.",
  path: "/en/cv-check/job-match",
  nlPath: "/cv-check/vacature",
  keywords: ["cv job match checker", "compare cv with job description", "resume job match netherlands", "ats keyword match"],
});

export default function EnglishCvJobMatchPage() {
  return <CvCheckLanding content={CV_CHECK_LANDINGS.enVacancy} />;
}
