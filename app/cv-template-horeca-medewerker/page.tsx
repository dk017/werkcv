import type { Metadata } from "next";
import RoleCvTemplatePage from "@/components/seo/RoleCvTemplatePage";

export const metadata: Metadata = {
  title: "CV Template Horeca Medewerker | WerkCV",
  description:
    "Gebruik een sterk CV template voor horeca medewerker. Inclusief profieltekst, voorbeeld bullets, checklist en links naar horeca-CV en sollicitatiebrief routes.",
  keywords: [
    "cv template horeca medewerker",
    "horeca cv template",
    "cv voorbeeld horeca template",
    "cv horeca medewerker",
    "bediening cv template",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-template-horeca-medewerker",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-template-horeca-medewerker",
      "x-default": "https://werkcv.nl/cv-template-horeca-medewerker",
    },
  },
};

export default function CvTemplateHorecaMedewerkerPage() {
  return (
    <RoleCvTemplatePage
      roleLabel="horeca medewerker"
      pageTitle="CV template horeca medewerker voor service, tempo en duidelijke beschikbaarheid"
      intro="Een horeca-CV moet snel laten zien dat je gasten goed helpt, onder druk tempo houdt en betrouwbaar inzetbaar bent. Deze pagina helpt je met een passende template-opzet, een profieltekst die direct richting geeft en bullets die beter aansluiten op horeca-selectie."
      profileText="Gastvrije en energieke horeca medewerker met ervaring in bediening, kassa en samenwerken tijdens piekuren. Werkt klantgericht, houdt overzicht onder druk en is flexibel inzetbaar in avonden en weekenden. Zoekt een rol waarin service, tempo en teamwerk samenkomen."
      recruiterSignals={[
        "Servicegericht en gastvrij gedrag dat ook onder druk overeind blijft.",
        "Duidelijkheid over type ervaring: bediening, fastservice, kassa of allround horeca.",
        "Beschikbaarheid en betrouwbaarheid op drukke momenten.",
        "Een korte, scanbare opmaak met praktische bewijsvoering.",
      ]}
      bulletExamples={[
        "Verwerkte bestellingen en betalingen snel en correct tijdens piekmomenten op terras en binnenbediening.",
        "Ondersteunde het team met openen, afsluiten en voorbereiden van drukke serviceblokken in avond- en weekenddiensten.",
        "Behield hoge gasttevredenheid door vriendelijke service en duidelijke communicatie, ook bij volle bezetting.",
        "Combineerde kassa, uitgifte en opruimtaken zonder verlies van tempo of netheid op de werkvloer.",
      ]}
      checklist={[
        "Noem direct je type horeca-ervaring of de rol waarop je mikt.",
        "Verwerk beschikbaarheid als avonden en weekenden relevant zijn.",
        "Gebruik bullets met service, tempo en teamwork in plaats van alleen taken.",
        "Kies een rustige, ATS-vriendelijke template zonder onnodige designruis.",
      ]}
      faqs={[
        {
          question: "Wat is het beste CV template voor horeca medewerker?",
          answer:
            "Meestal werkt een rustige, scanbare template het best. In horeca wil een werkgever snel service, tempo en inzetbaarheid kunnen beoordelen zonder afgeleid te worden door opmaak.",
        },
        {
          question: "Moet ik beschikbaarheid op mijn horeca-CV zetten?",
          answer:
            "Ja, vaak wel. Zeker bij bijbanen, avonden, weekenden of wisselende diensten kan dat een belangrijk selectiepunt zijn.",
        },
        {
          question: "Hoe maak ik een horeca-CV zonder veel ervaring?",
          answer:
            "Gebruik bijbaan, retail, vrijwilligerswerk of klantcontact als bewijs voor service, werktempo en betrouwbaarheid. Kleine praktijkervaring kan in horeca al veel zeggen.",
        },
        {
          question: "Is een horeca-CV vooral voor starters?",
          answer:
            "Nee. Ook ervaren horeca-profielen profiteren van een template die service, teamwerk en piekprestaties duidelijk laat landen.",
        },
      ]}
      relatedLinks={[
        { href: "/cv-gids/cv-voorbeeld-horeca-medewerker", label: "Volledig horeca-CV voorbeeld" },
        { href: "/sollicitatiebrief-voorbeeld-horeca-medewerker", label: "Sollicitatiebrief horeca medewerker" },
        { href: "/cv-voorbeelden/horeca-en-detailhandel", label: "Meer horeca en retail voorbeelden" },
        { href: "/templates", label: "Vergelijk alle templates" },
        { href: "/cv-maken-student", label: "Student of bijbaan route" },
      ]}
    />
  );
}
