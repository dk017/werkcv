import type { Metadata } from "next";
import CityCvLandingPage from "@/components/landing/CityCvLandingPage";
import { buildDutchMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildDutchMetadata({
  title: "CV maken in Amsterdam | Online CV zonder abonnement | WerkCV",
  description:
    "Maak online een professioneel cv voor banen in Amsterdam. Tips voor tech, hospitality, finance, startups en internationale teams. Geen abonnement.",
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
      intro="Solliciteer je in Amsterdam? Dan concurreer je vaak in een brede, internationale arbeidsmarkt: tech en startups, finance op de Zuidas, hospitality, creatieve functies, life sciences en supportrollen bij internationale teams. Maak daarom geen algemeen cv, maar een duidelijke versie per vacature."
      angleTitle="Online cv maken voor de Amsterdamse arbeidsmarkt"
      angleBody="Amsterdam vraagt om een cv dat snel laat zien waar je past. Voor internationale teams wil je taalniveau, beschikbaarheid en relevante tools helder maken. Voor Zuidas- of corporate functies tellen betrouwbaarheid, stakeholdercommunicatie en meetbare resultaten. Voor hospitality, retail en customer support wil je juist tempo, klantcontact en planning concreet maken."
      sectors={[
        "Tech, startups, product en AI-teams",
        "Finance, legal en zakelijke dienstverlening rond de Zuidas",
        "Hospitality, retail, events en toerisme",
        "Media, marketing, design en creatieve functies",
        "Life sciences, health, research en sustainability",
        "Internationale en Engelstalige supportteams",
      ]}
      examples={[
        "CV voor Zuidas-functies",
        "CV voor hospitality en retail",
        "CV voor startup-rollen",
      ]}
      proofPoints={[
        "Gebruik niet één Amsterdam-cv voor alles. Een cv voor een startup mag meer product- en ownership-taal bevatten; een cv voor finance of legal moet strakker, formeler en bewijsgerichter zijn.",
        "Amsterdamse werkgevers krijgen vaak internationale kandidaten. Maak je taalniveau, werkvergunning of beschikbaarheid duidelijk als dat relevant is voor de vacature.",
        "Bij tech, product en datafuncties werkt een rustige ATS-vriendelijke template meestal beter dan een zwaar ontworpen cv. Recruiters willen stack, impact en scope snel kunnen scannen.",
        "Bij hospitality, retail en events is snelheid belangrijk: laat zien hoeveel gasten, klanten, shifts, reserveringen of processen je aankon.",
      ]}
      profileExamples={[
        {
          title: "Tech / startup profieltekst",
          text:
            "Productgerichte softwareontwikkelaar met 4 jaar ervaring in TypeScript, React en API-integraties. Gewend aan korte feedbackloops, cross-functionele samenwerking en het verbeteren van gebruikersflows op basis van data. Zoek een rol in Amsterdam waar ik productimpact en technische kwaliteit kan combineren.",
        },
        {
          title: "Hospitality / customer service profieltekst",
          text:
            "Gastvrije hospitality professional met ervaring in drukke Amsterdamse serviceomgevingen. Sterk in klantcontact, planning en samenwerken onder tijdsdruk. Ik combineer tempo met nauwkeurigheid en zorg dat gasten en collega’s duidelijke opvolging krijgen.",
        },
        {
          title: "Zuidas / zakelijke dienstverlening profieltekst",
          text:
            "Nauwkeurige administratief en operations professional met ervaring in stakeholdercommunicatie, planning en rapportages. Ik werk gestructureerd, bewaak deadlines en zorg dat processen betrouwbaar blijven voor teams, klanten en management.",
        },
        {
          title: "International support profieltekst",
          text:
            "Meertalige supportmedewerker met ervaring in e-mail, telefoon en CRM-opvolging voor internationale klanten. Sterk in duidelijke communicatie, prioriteiten stellen en het vertalen van klantvragen naar concrete acties voor interne teams.",
        },
      ]}
      bulletExamples={[
        {
          sector: "Startup / product",
          weak: "Gewerkt aan de website en bugs opgelost.",
          strong:
            "Verbeterde onboardingflow in React en verminderde supportvragen over accountactivatie door duidelijke foutmeldingen en betere validatie.",
        },
        {
          sector: "Hospitality",
          weak: "Klanten geholpen en reserveringen gedaan.",
          strong:
            "Verwerkte dagelijks reserveringen, gastvragen en tafelplanning tijdens piekuren en zorgde voor duidelijke overdracht aan keuken en bediening.",
        },
        {
          sector: "Finance / operations",
          weak: "Verantwoordelijk voor administratie.",
          strong:
            "Controleerde facturen, klantgegevens en rapportages voor maandafsluiting en signaleerde afwijkingen voordat dossiers naar finance gingen.",
        },
      ]}
      checklist={[
        "Staat je gewenste functietitel bovenaan of in je profieltekst?",
        "Noem je relevante tools, talen en systemen die in Amsterdamse vacatures terugkomen?",
        "Is je cv ook begrijpelijk voor internationale recruiters als de vacature Engelstalig is?",
        "Zijn je werkervaring-bullets concreet genoeg: aantallen, tools, klanten, processen of resultaten?",
        "Gebruik je een rustige template die goed scanbaar blijft in ATS-systemen?",
        "Heb je één cv-versie per vacaturetype in plaats van één algemene Amsterdam-cv?",
      ]}
    />
  );
}
