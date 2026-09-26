import type { Metadata } from "next";
import CvCheckLanding from "@/components/cv-check/CvCheckLanding";
import { CV_CHECK_LANDINGS } from "@/lib/cv-check/landing-content";
import { buildDutchMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildDutchMetadata({
  title: "Gratis CV-check en ATS checker met AI | WerkCV",
  description:
    "Check je cv gratis met AI, zonder account. Zie wat een ATS en recruiters uit je cv halen, wat je als eerste verbetert en, met een vacature, per eis of je die aantoont.",
  path: "/cv-check",
  keywords: ["cv check", "cv checker", "ats checker", "ats cv checker", "ai cv checker", "cv scanner", "cv laten checken", "cv nakijken"],
});

export default function CvCheckPage() {
  return <CvCheckLanding content={CV_CHECK_LANDINGS.nlGeneral} />;
}
