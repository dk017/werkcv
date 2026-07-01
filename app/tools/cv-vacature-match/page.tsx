import type { Metadata } from "next";
import CvVacancyMatchLanding from "@/components/tools/CvVacancyMatchLanding";
import { getLanguageAlternates } from "@/lib/i18n/route-pairs";

const title = "CV Vacature Match Checker | Gratis en Bewijsgericht";
const description =
  "Vergelijk je CV gratis met een vacature. Bekijk welke eisen zijn onderbouwd, hoe je profiel overkomt en welke drie verbeteringen de meeste impact hebben.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "cv vacature match",
    "cv vergelijken met vacature",
    "ats match checker",
    "vacature keywords cv",
  ],
  alternates: {
    canonical: "https://werkcv.nl/tools/cv-vacature-match",
    languages: getLanguageAlternates("/tools/cv-vacature-match") ?? undefined,
  },
  openGraph: {
    title,
    description,
    url: "https://werkcv.nl/tools/cv-vacature-match",
    siteName: "WerkCV",
    locale: "nl_NL",
    type: "website",
  },
};

export default function CvVacatureMatchPage() {
  return <CvVacancyMatchLanding locale="nl" />;
}
