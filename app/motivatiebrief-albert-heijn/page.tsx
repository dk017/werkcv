import type { Metadata } from "next";
import EmployerMotivationLetterPage from "@/components/seo/EmployerMotivationLetterPage";
import { albertHeijnMotivationPage } from "@/lib/employer-motivation-pages";

export const metadata: Metadata = {
  title: "Motivatiebrief Albert Heijn: Voorbeeld + Generator | WerkCV",
  description: "Schrijf een persoonlijke motivatiebrief voor Albert Heijn. Met voorbeeld, bewijs per winkelrol, beschikbaarheidstips en vooraf ingevulde generator.",
  keywords: ["motivatiebrief albert heijn", "sollicitatiebrief albert heijn", "motivatie albert heijn", "solliciteren albert heijn"],
  alternates: { canonical: "https://werkcv.nl/motivatiebrief-albert-heijn" },
  openGraph: {
    title: "Motivatiebrief Albert Heijn: persoonlijk voorbeeld",
    description: "Van standaardzin naar geloofwaardig bewijs voor winkelrol en bijbaan.",
    url: "https://werkcv.nl/motivatiebrief-albert-heijn",
    type: "article",
    locale: "nl_NL",
  },
};

export default function MotivatiebriefAlbertHeijnPage() {
  return <EmployerMotivationLetterPage data={albertHeijnMotivationPage} />;
}
