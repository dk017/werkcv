import type { Metadata } from "next";
import CityCvLandingPage from "@/components/landing/CityCvLandingPage";
import { buildDutchMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildDutchMetadata({
  title: "CV maken in Utrecht | Professionele CV zonder abonnement | WerkCV",
  description:
    "Maak online een professioneel cv voor banen in Utrecht. Tips voor zorg, onderwijs, overheid, life sciences, IT en zakelijke functies. Geen abonnement.",
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
      intro="Solliciteer je in Utrecht of de regio Midden-Nederland? Dan kom je vaak functies tegen in zorg, onderwijs, overheid, life sciences, duurzaamheid, IT en zakelijke dienstverlening. Maak een cv dat rustig, betrouwbaar en inhoudelijk concreet laat zien waar je past."
      angleTitle="CV maken voor functies in Utrecht en omgeving"
      angleBody="Utrecht is sterk in gezondheid, kennis, onderwijs, publieke dienstverlening en innovatie. Voor je cv betekent dit: schrijf minder algemeen, maak je maatschappelijke of technische context duidelijk en laat zien hoe je samenwerkt met professionals, studenten, cliënten, onderzoekers, inwoners of interne stakeholders."
      sectors={[
        "Zorg, welzijn en maatschappelijke organisaties",
        "Onderwijs, training en studentbegeleiding",
        "Overheid, beleid en publieke dienstverlening",
        "Life sciences, health en Utrecht Science Park",
        "IT, data, product en digitale dienstverlening",
        "Zakelijke dienstverlening en projectrollen",
      ]}
      examples={[
        "CV voor overheid en beleid",
        "CV voor zorg en onderwijs",
        "CV voor IT en support",
      ]}
      proofPoints={[
        "Voor zorg en welzijn wil je mensgerichtheid combineren met betrouwbaarheid: cliëntcontact, dossiervorming, multidisciplinair overleg en planning.",
        "Voor onderwijs en begeleiding tellen doelgroep, les- of begeleidingsvorm, voortgangsbewaking en communicatie met studenten, ouders of collega’s.",
        "Voor overheid en publieke dienstverlening werkt een formele, overzichtelijke cv beter dan een creatief ontwerp. Benoem beleid, processen, bewonerscontact of stakeholderafstemming concreet.",
        "Voor life sciences, health en IT wil je tooling, onderzoek, data, kwaliteit, compliance of projectcontext duidelijk maken zonder je cv te technisch of te lang te maken.",
      ]}
      profileExamples={[
        {
          title: "Zorg / welzijn profieltekst",
          text:
            "Betrokken zorgprofessional met ervaring in cliëntcontact, rapportage en samenwerken met collega’s binnen multidisciplinaire teams. Ik werk zorgvuldig, blijf rustig onder druk en zorg voor duidelijke overdracht en opvolging.",
        },
        {
          title: "Onderwijs / begeleiding profieltekst",
          text:
            "Onderwijsgerichte professional met ervaring in begeleiding, planning en duidelijke communicatie met studenten en collega’s. Sterk in structuur aanbrengen, voortgang volgen en leerdoelen vertalen naar praktische ondersteuning.",
        },
        {
          title: "Overheid / beleid profieltekst",
          text:
            "Gestructureerde beleids- en projectmedewerker met ervaring in analyse, stakeholderafstemming en heldere rapportage. Ik vertaal informatie naar bruikbare acties en bewaak voortgang binnen publieke of maatschappelijke trajecten.",
        },
        {
          title: "IT / digitale dienstverlening profieltekst",
          text:
            "Analytische IT-professional met ervaring in gebruikerssupport, procesverbetering en digitale dienstverlening. Ik combineer technische nieuwsgierigheid met duidelijke communicatie richting gebruikers en interne teams.",
        },
      ]}
      bulletExamples={[
        {
          sector: "Zorg / welzijn",
          weak: "Cliënten geholpen en administratie bijgehouden.",
          strong:
            "Ondersteunde cliënten bij dagelijkse vragen, registreerde voortgang zorgvuldig en stemde bijzonderheden tijdig af met collega’s voor duidelijke overdracht.",
        },
        {
          sector: "Onderwijs / begeleiding",
          weak: "Studenten begeleid.",
          strong:
            "Begeleidde studenten bij planning en opdrachten, signaleerde voortgangsrisico’s en stemde vervolgstappen af met docententeam en student.",
        },
        {
          sector: "Overheid / project",
          weak: "Meegewerkt aan projecten en verslagen gemaakt.",
          strong:
            "Verzamelde input van stakeholders, werkte actiepunten uit en bewaakte voortgang voor een projectteam binnen publieke dienstverlening.",
        },
      ]}
      checklist={[
        "Maak duidelijk met welke doelgroep je werkte: cliënten, studenten, inwoners, onderzoekers, gebruikers of interne teams.",
        "Noem relevante systemen: ECD, LMS, zaaksysteem, CRM, Excel, Power BI, Jira of andere tooling.",
        "Laat samenwerking zien: multidisciplinair overleg, beleidsafstemming, docententeam, projectteam of klantcontact.",
        "Gebruik een rustige template voor overheid, zorg en onderwijs; betrouwbaarheid is belangrijker dan visueel effect.",
        "Maak resultaten concreet zonder privacygevoelige details te noemen.",
        "Check je cv op ATS-leesbaarheid voordat je de PDF downloadt.",
      ]}
    />
  );
}
