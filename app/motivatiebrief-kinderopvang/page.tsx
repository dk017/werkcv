import type { Metadata } from "next";
import EmployerMotivationLetterPage from "@/components/seo/EmployerMotivationLetterPage";
import { childcareMotivationPage } from "@/lib/employer-motivation-pages";

export const metadata: Metadata = {
  title: "Motivatiebrief Kinderopvang: Pedagogisch Voorbeeld | WerkCV",
  description: "Schrijf een motivatiebrief voor de kinderopvang. Met pedagogisch voorbeeld, bewijszinnen, actuele kwalificatie- en taalaandachtspunten en generator.",
  keywords: ["motivatiebrief kinderopvang", "sollicitatiebrief kinderopvang", "motivatiebrief pedagogisch medewerker", "motivatie kinderopvang voorbeeld"],
  alternates: { canonical: "https://werkcv.nl/motivatiebrief-kinderopvang" },
  openGraph: {
    title: "Motivatiebrief kinderopvang: pedagogisch voorbeeld",
    description: "Maak veiligheid, ontwikkeling en oudercontact concreet in je brief.",
    url: "https://werkcv.nl/motivatiebrief-kinderopvang",
    type: "article",
    locale: "nl_NL",
  },
};

export default function MotivatiebriefKinderopvangPage() {
  return <EmployerMotivationLetterPage data={childcareMotivationPage} />;
}
