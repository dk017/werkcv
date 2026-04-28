import type { Metadata } from "next";
import CityCvLandingPage from "@/components/landing/CityCvLandingPage";
import { buildDutchMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildDutchMetadata({
  title: "CV maken in Amsterdam | Online CV zonder abonnement | WerkCV",
  description:
    "Maak online een professioneel cv voor banen in Amsterdam. Gratis starten, ATS-vriendelijke templates en pas betalen bij PDF-download.",
  path: "/cv-maken-amsterdam",
  keywords: [
    "cv maken amsterdam",
    "cv laten maken amsterdam",
    "online cv maken amsterdam",
    "cv maker amsterdam",
  ],
  type: "article",
});

export default function CvMakenAmsterdamPage() {
  return (
    <CityCvLandingPage
      city="Amsterdam"
      path="/cv-maken-amsterdam"
      h1="CV maken in Amsterdam"
      intro="Solliciteer je in Amsterdam? Maak een duidelijke Nederlandse cv voor rollen in zakelijke dienstverlening, hospitality, tech, media, startups of internationale organisaties. WerkCV helpt je gratis starten en pas betalen bij PDF-download."
      angleTitle="Online cv maken voor de Amsterdamse arbeidsmarkt"
      angleBody="Amsterdam heeft veel verschillende vacaturetypes: van corporate functies op de Zuidas tot creatieve rollen, hospitality, customer support en internationale teams. Een goede cv voor Amsterdam is kort, scanbaar en direct afgestemd op de functie waarop je solliciteert."
      sectors={[
        "Zakelijke dienstverlening en finance",
        "Hospitality, retail en toerisme",
        "Tech, startups en scale-ups",
        "Media, marketing en creatieve functies",
        "Internationale en Engelstalige teams",
      ]}
      examples={[
        "CV voor Zuidas-functies",
        "CV voor hospitality en retail",
        "CV voor startup-rollen",
      ]}
    />
  );
}
