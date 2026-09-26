import type { Metadata } from "next";
import CvCheckLanding from "@/components/cv-check/CvCheckLanding";
import { buildEnglishMetadata } from "@/app/en/metadata";
import { CV_CHECK_LANDINGS } from "@/lib/cv-check/landing-content";

export const metadata: Metadata = buildEnglishMetadata({
  title: "Free CV Checker for the Netherlands: ATS Check and Job Match",
  description:
    "Check your CV for free with AI, no account needed. See what Dutch recruiters and application systems get from your CV, what to fix first and how it matches a job ad.",
  path: "/en/cv-check",
  nlPath: "/cv-check",
  keywords: ["cv checker netherlands", "dutch cv checker", "resume checker netherlands", "resume optimizer netherlands", "ats cv check"],
});

export default function EnglishCvCheckPage() {
  return <CvCheckLanding content={CV_CHECK_LANDINGS.enGeneral} />;
}
