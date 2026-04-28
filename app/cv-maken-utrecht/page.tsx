import type { Metadata } from "next";
import CityCvLandingPage from "@/components/landing/CityCvLandingPage";
import { buildDutchMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildDutchMetadata({
  title: "CV maken in Utrecht | Professionele CV zonder abonnement | WerkCV",
  description:
    "Maak online een professioneel cv voor banen in Utrecht. Gratis starten, ATS-vriendelijke templates en eenmalig betalen bij PDF-download.",
  path: "/cv-maken-utrecht",
  keywords: [
    "cv maken utrecht",
    "cv laten maken utrecht",
    "online cv maken utrecht",
    "cv maker utrecht",
  ],
  type: "article",
});

export default function CvMakenUtrechtPage() {
  return (
    <CityCvLandingPage
      city="Utrecht"
      path="/cv-maken-utrecht"
      h1="CV maken in Utrecht"
      intro="Solliciteer je in Utrecht of de regio Midden-Nederland? Maak een nette, ATS-vriendelijke cv voor functies in zorg, onderwijs, overheid, zakelijke dienstverlening, IT of customer operations. Gratis starten, geen abonnement."
      angleTitle="CV maken voor functies in Utrecht en omgeving"
      angleBody="Utrecht heeft veel functies in organisaties waar structuur en duidelijkheid belangrijk zijn. Laat in je cv snel zien welke rol je zoekt, welke ervaring relevant is en welke vaardigheden aansluiten op de vacature."
      sectors={[
        "Zorg, onderwijs en maatschappelijke organisaties",
        "Overheid, beleid en publieke dienstverlening",
        "IT, data en productteams",
        "Customer operations en support",
        "Zakelijke dienstverlening en projectrollen",
      ]}
      examples={[
        "CV voor overheid en beleid",
        "CV voor zorg en onderwijs",
        "CV voor IT en support",
      ]}
    />
  );
}
