import type { Metadata } from "next";
import CvCheckLanding from "@/components/cv-check/CvCheckLanding";
import { CV_CHECK_LANDINGS } from "@/lib/cv-check/landing-content";
import { buildDutchMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildDutchMetadata({
  title: "CV vergelijken met vacature: gratis match-check met AI | WerkCV",
  description:
    "Vergelijk je cv gratis met een vacature. Zie per eis of je cv die aantoont, met citaten uit de vacature en je cv, en welke drie punten je als eerste aanpast.",
  path: "/cv-check/vacature",
  keywords: ["cv vergelijken met vacature", "cv vacature match", "cv matchen met vacature", "vacature keywords cv", "ats match checker"],
});

export default function CvCheckVacancyPage() {
  return <CvCheckLanding content={CV_CHECK_LANDINGS.nlVacancy} />;
}
