import CvVacancyMatchLanding from "@/components/tools/CvVacancyMatchLanding";
import { buildEnglishMetadata } from "@/app/en/metadata";

export const metadata = buildEnglishMetadata({
  title: "CV and job match checker for the Netherlands",
  description:
    "Compare your CV with a Netherlands vacancy. See which requirements are supported, how your positioning reads and the three improvements to prioritize.",
  path: "/en/cv-job-match-checker",
  nlPath: "/tools/cv-vacature-match",
  keywords: [
    "cv job match checker netherlands",
    "resume vacancy match netherlands",
    "ats keyword match",
    "compare cv with job description",
  ],
});

export default function EnglishCvJobMatchCheckerPage() {
  return <CvVacancyMatchLanding locale="en" />;
}
