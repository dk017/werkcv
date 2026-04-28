import type { Metadata } from "next";
import CityCvLandingPage from "@/components/landing/CityCvLandingPage";
import { buildDutchMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildDutchMetadata({
  title: "CV maken in Rotterdam | Sterke CV voor haven en business | WerkCV",
  description:
    "Maak online een professioneel cv voor banen in Rotterdam. Geschikt voor logistiek, haven, techniek, business en zorg. Geen abonnement.",
  path: "/cv-maken-rotterdam",
  keywords: [
    "cv maken rotterdam",
    "cv laten maken rotterdam",
    "online cv maken rotterdam",
    "cv maker rotterdam",
  ],
  type: "article",
});

export default function CvMakenRotterdamPage() {
  return (
    <CityCvLandingPage
      city="Rotterdam"
      path="/cv-maken-rotterdam"
      h1="CV maken in Rotterdam"
      intro="Zoek je werk in Rotterdam? Maak een professionele cv die past bij functies in logistiek, haven, techniek, zakelijke dienstverlening, zorg of onderwijs. Je start gratis en betaalt alleen als je jouw cv als PDF downloadt."
      angleTitle="CV voor Rotterdam: concreet, praktisch en resultaatgericht"
      angleBody="Voor veel Rotterdamse vacatures werkt een cv het best als je snel laat zien wat je kunt, in welke omgeving je hebt gewerkt en welke resultaten of verantwoordelijkheden je hebt gehad. Houd je layout rustig en gebruik duidelijke functietitels, vaardigheden en werkervaring-bullets."
      sectors={[
        "Haven, logistiek en supply chain",
        "Techniek, bouw en infra",
        "Zakelijke dienstverlening",
        "Zorg, onderwijs en publieke sector",
        "Sales, klantenservice en operations",
      ]}
      examples={[
        "CV voor logistiek en haven",
        "CV voor techniek en infra",
        "CV voor operations en support",
      ]}
    />
  );
}
