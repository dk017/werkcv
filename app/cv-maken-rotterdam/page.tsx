import type { Metadata } from "next";
import CityCvLandingPage from "@/components/landing/CityCvLandingPage";
import { buildDutchMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildDutchMetadata({
  title: "CV maken in Rotterdam | Sterke CV voor haven en business | WerkCV",
  description:
    "Maak online een professioneel cv voor banen in Rotterdam. Tips voor haven, logistiek, techniek, energie, operations en zakelijke functies. Geen abonnement.",
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
      intro="Zoek je werk in Rotterdam? Dan wil je een cv die concreet laat zien wat je kunt in logistiek, haven, techniek, energie, operations, zakelijke dienstverlening of zorg. Rotterdamse vacatures vragen vaak om bewijs: systemen, processen, veiligheid, planning, stakeholders en resultaat."
      angleTitle="CV voor Rotterdam: concreet, praktisch en resultaatgericht"
      angleBody="Rotterdam is sterk verbonden met haven, maritieme dienstverlening, logistiek, industrie, energie en stedelijke dienstverlening. Een goed cv voor deze markt is niet alleen netjes opgemaakt, maar toont ook scope: type proces, teamgrootte, systemen, veiligheidscontext, volumes, planning of klantimpact."
      sectors={[
        "Haven, logistiek, supply chain en terminals",
        "Maritiem, offshore en scheepvaartdienstverlening",
        "Techniek, energie, industrie en onderhoud",
        "Bouw, infra en stedelijke ontwikkeling",
        "Zorg, onderwijs en publieke sector",
        "Operations, sales support en klantenservice",
      ]}
      examples={[
        "CV voor logistiek en haven",
        "CV voor techniek en infra",
        "CV voor operations en support",
      ]}
      proofPoints={[
        "Voor haven- en logistieke functies telt operationele duidelijkheid: noem systemen, volumes, transportmodaliteiten, planningsverantwoordelijkheid en samenwerking met terminals, vervoerders of klanten.",
        "Voor techniek en energie wil je veiligheid, onderhoud, storingsanalyse, certificaten en praktische projectervaring concreet maken. Algemene zinnen als ‘technisch ingesteld’ zijn te zwak.",
        "Voor zakelijke functies in Rotterdam werkt een cv goed als je procesverbetering, stakeholdercommunicatie en datagedreven rapportage zichtbaar maakt.",
        "Bij carrièreswitch naar haven of logistiek moet je overdraagbare ervaring expliciet vertalen: planning, voorraad, klantcontact, compliance, procescontrole of teamcoördinatie.",
      ]}
      profileExamples={[
        {
          title: "Logistiek / haven profieltekst",
          text:
            "Logistiek professional met ervaring in planning, voorraadcontrole en klantafstemming binnen tijdkritische processen. Sterk in overzicht houden, schakelen met meerdere partijen en het voorkomen van fouten in overdracht, documentatie en levering.",
        },
        {
          title: "Techniek / onderhoud profieltekst",
          text:
            "Praktisch ingestelde technicus met ervaring in storingsanalyse, preventief onderhoud en veilige uitvoering in operationele omgevingen. Ik werk nauwkeurig, communiceer helder met operators en lever machines of installaties betrouwbaar op.",
        },
        {
          title: "Operations / business support profieltekst",
          text:
            "Operations medewerker met ervaring in procesbewaking, rapportage en interne afstemming. Ik combineer klantgerichtheid met structuur en zorg dat dossiers, planningen en acties tijdig worden opgevolgd.",
        },
      ]}
      bulletExamples={[
        {
          sector: "Haven / logistiek",
          weak: "Goederen gepland en contact gehad met chauffeurs.",
          strong:
            "Coördineerde dagelijkse transportplanning, stemde af met chauffeurs en klanten en voorkwam vertragingen door afwijkingen vroegtijdig te signaleren.",
        },
        {
          sector: "Techniek / onderhoud",
          weak: "Onderhoud uitgevoerd aan machines.",
          strong:
            "Voerde preventief onderhoud en eerste storingsanalyse uit aan productiemachines en registreerde bevindingen voor technische overdracht en vervolgactie.",
        },
        {
          sector: "Operations support",
          weak: "Rapportages gemaakt en administratie gedaan.",
          strong:
            "Stelde wekelijkse operationele rapportages op, controleerde afwijkingen in dossiers en hielp teams prioriteiten stellen op basis van openstaande acties.",
        },
      ]}
      checklist={[
        "Noem relevante systemen: WMS, TMS, ERP, CRM, Excel, planningssoftware of technische tooling.",
        "Maak duidelijk met welke volumes, shifts, teams, klanten of processen je werkte.",
        "Zet certificaten, veiligheidstrainingen of rijbewijzen zichtbaar als ze relevant zijn.",
        "Vertaal carrièreswitchervaring naar Rotterdamse sectoren: planning, operatie, techniek, klantcontact of compliance.",
        "Gebruik concrete werkwoorden: coördineerde, controleerde, analyseerde, loste op, verbeterde.",
        "Check of je cv scanbaar blijft voor ATS en recruiters die veel operationele profielen vergelijken.",
      ]}
    />
  );
}
