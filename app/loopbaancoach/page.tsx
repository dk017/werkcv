import type { Metadata } from "next";
import Link from "next/link";
import B2BLeadForm from "@/components/b2b/B2BLeadForm";
import Footer from "@/components/Footer";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { buildDutchMetadata } from "@/lib/page-metadata";
import { cvDownloadPrice } from "@/lib/site-content";

const audienceOptions = [
  { value: "loopbaancoach", label: "Loopbaancoach" },
  { value: "jobcoach", label: "Jobcoach" },
  { value: "reintegratie", label: "Re-integratiebegeleider" },
  { value: "outplacement", label: "Outplacementbegeleider" },
  { value: "student", label: "Studenten- of startercoach" },
  { value: "other", label: "Andere begeleidingspraktijk" },
];

const clientProblems = [
  {
    title: "De cliënt heeft wel ervaring, maar geen scherpe richting",
    body:
      "Veel cv's blijven hangen in taken, oude functies en losse vaardigheden. Een coach helpt richting kiezen; WerkCV helpt die richting vertalen naar profieltekst, werkervaring en een scanbare cv-structuur.",
  },
  {
    title: "Word- of Canva-bestanden kosten te veel correctietijd",
    body:
      "Een kleine wijziging kan de opmaak breken. Met een vaste cv-editor blijft de layout rustig, zodat jouw feedback vooral over inhoud, bewijs en vacaturefit gaat.",
  },
  {
    title: "LinkedIn, cv en vacature sluiten niet op elkaar aan",
    body:
      "Cliënten hebben vaak een breed LinkedIn-profiel en een te algemene cv. WerkCV biedt routes om LinkedIn-tekst, cv-checks en vacaturekeywords naar één sollicitatieversie te brengen.",
  },
  {
    title: "De cliënt wil snel iets kunnen versturen",
    body:
      "Bij outplacement, re-integratie, startersbegeleiding of loopbaantrajecten is momentum belangrijk. Een eerste nette cv-versie verlaagt de drempel om vacatures concreet te bespreken.",
  },
];

const workflowSteps = [
  {
    title: "1. Intake: richting en doelgroep bepalen",
    body:
      "Bepaal samen welke rol, sector of vacaturetype centraal staat. De cv hoeft niet alles te vertellen; hij moet de volgende stap logisch maken.",
  },
  {
    title: "2. Eerste cv-versie laten bouwen",
    body:
      "De cliënt vult basisgegevens, werkervaring en opleiding in WerkCV in. Jij hoeft niet vanaf een leeg document mee te schrijven.",
  },
  {
    title: "3. Coachreview op inhoud",
    body:
      "Bespreek profieltekst, recente resultaten, gaten of carrièreswitch en welke ervaring hoger op de pagina moet staan.",
  },
  {
    title: "4. Vacaturegerichte versie maken",
    body:
      "Gebruik cv-check, ATS-check of vacaturematch om keywords en werkervaring aan te scherpen voor een concrete sollicitatie.",
  },
  {
    title: "5. PDF pas downloaden als de versie klopt",
    body:
      `De cliënt kan gratis bouwen en betaalt pas ${cvDownloadPrice.display} bij PDF-download. Er loopt geen individueel abonnement door.`,
  },
];

const trajectoryCards = [
  {
    title: "Loopbaanoriëntatie",
    body:
      "Na gesprekken over waarden, competenties en richting kan de cliënt een cv maken die past bij de gekozen vervolgstap.",
  },
  {
    title: "Outplacement",
    body:
      "Gebruik WerkCV om kandidaten snel van analyse naar sollicitatieklare documenten te brengen zonder losse opmaakbestanden.",
  },
  {
    title: "Re-integratie en spoor 2",
    body:
      "WerkCV kan helpen bij een praktische externe arbeidsmarktoriëntatie. Het is geen juridisch of medisch trajectsysteem, maar wel een concrete cv-route.",
  },
  {
    title: "Starters en studenten",
    body:
      "Voor cliënten met weinig ervaring helpen voorbeelden, profieltekst en templatekeuze om stages, bijbanen en projecten professioneel te presenteren.",
  },
  {
    title: "Internationals en expats",
    body:
      "Combineer Engelstalige CV-routes met Nederlandse templates voor kandidaten die hun profiel willen aanpassen aan de Nederlandse arbeidsmarkt.",
  },
  {
    title: "Carrièreswitch",
    body:
      "Maak overdraagbare vaardigheden zichtbaar zonder het cv vaag te maken. Focus op bewijs, context en relevante resultaten.",
  },
];

const coachToolkit = [
  {
    label: "Startlink voor cliënt",
    text:
      "Gebruik WerkCV om eerst een basis-cv te maken. We bespreken daarna vooral profiel, werkervaring en aansluiting op de vacature.",
  },
  {
    label: "Feedbackprompt",
    text:
      "Markeer per functie: wat was je verantwoordelijkheid, wat heb je verbeterd, met wie werkte je samen en welk resultaat kun je concreet maken?",
  },
  {
    label: "Vacaturecheck",
    text:
      "Plak de vacature naast je cv en kijk welke functietermen, vaardigheden of resultaten nog ontbreken.",
  },
];

const resourceLinks = [
  { href: "/cv-checken", label: "CV checken" },
  { href: "/cv-optimaliseren", label: "CV optimaliseren" },
  { href: "/tools/ats-cv-checker", label: "ATS cv-checker" },
  { href: "/tools/cv-vacature-match", label: "CV vacaturematch" },
  { href: "/tools/linkedin-naar-cv", label: "LinkedIn naar cv" },
  { href: "/tools/profieltekst-generator", label: "Profieltekst generator" },
  { href: "/cv-voorbeelden", label: "CV voorbeelden" },
  { href: "/en/dutch-cv-template", label: "Dutch CV template" },
];

const faqItems = [
  {
    question: "Is WerkCV volledige software voor loopbaancoaches?",
    answer:
      "Nee. WerkCV is geen CRM, dossier- of trajectadministratie. Het is een praktische cv-werkruimte voor cliënten, met editor, templates, voorbeelden en checks.",
  },
  {
    question: "Kunnen cliënten gratis starten?",
    answer:
      `Ja. Cliënten kunnen gratis bouwen, aanpassen en controleren. Ze betalen pas ${cvDownloadPrice.display} wanneer ze hun definitieve cv als PDF willen downloaden.`,
  },
  {
    question: "Past WerkCV bij re-integratie of spoor 2?",
    answer:
      "WerkCV kan nuttig zijn als praktische cv-route binnen een traject. Het vervangt geen juridisch, medisch of arbeidsdeskundig advies en is geen trajectregistratiesysteem.",
  },
  {
    question: "Kan ik WerkCV gebruiken zonder technische integratie?",
    answer:
      "Ja. De lichtste route is een vaste client-link, toolkit of workshopopzet. Voor grotere groepen kunnen we samen kijken naar een passende partnerroute.",
  },
];

export const metadata: Metadata = buildDutchMetadata({
  title: "CV tool voor loopbaancoaches | Cliënten sneller naar een sterk cv | WerkCV",
  description:
    "Gebruik WerkCV als praktische cv tool voor loopbaancoaches, outplacement en re-integratie. Help cliënten naar een Nederlandse, ATS-vriendelijke cv zonder abonnement.",
  path: "/loopbaancoach",
  keywords: [
    "cv tool voor loopbaancoaches",
    "loopbaancoach cv software",
    "cv voor cliënten maken",
    "cv tool re-integratie",
    "outplacement cv tool",
    "spoor 2 cv begeleiding",
  ],
  type: "article",
});

export default function LoopbaancoachPage() {
  return (
    <div className="min-h-screen bg-[#FFFEF0]">
      <FAQJsonLd questions={faqItems} />

      <header className="border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-black">
              Werk<span className="bg-yellow-400 px-1">CV</span>.nl
            </span>
          </Link>
          <a
            href="#coach-aanvraag"
            className="border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black"
          >
            Vraag toolkit aan
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <section className="mb-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-slate-700">
              Voor loopbaancoaches, outplacement en re-integratie
            </p>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV tool voor loopbaancoaches
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Geef cliënten geen leeg Word-document mee, maar een praktische cv-werkruimte. WerkCV helpt cliënten hun ervaring structureren, hun profiel aanscherpen en een Nederlandse, ATS-vriendelijke cv maken die past bij hun volgende stap.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#coach-aanvraag"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Vraag coach toolkit aan
              </a>
              <Link
                href="/cv-checken"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk cv-check route
              </Link>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-700">
              Voor individuele cliënten: gratis starten, éénmalig {cvDownloadPrice.display} bij PDF-download, geen abonnement.
            </p>
          </div>

          <aside className="h-fit border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black text-black">
              Wanneer deze pagina relevant is
            </h2>
            <ul className="mt-4 space-y-3 text-sm font-bold leading-relaxed text-slate-700">
              <li>&bull; Je begeleidt cliënten naar nieuw werk.</li>
              <li>&bull; Je bent veel tijd kwijt aan cv-opmaak.</li>
              <li>&bull; Cliënten hebben moeite met profieltekst of concrete bullets.</li>
              <li>&bull; Je zoekt een lichte tool, geen zwaar softwaresysteem.</li>
            </ul>
          </aside>
        </section>

        <section className="mb-12 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Positionering
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Geen coachplatform, maar een client CV workspace
          </h2>
          <p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
            WerkCV is bewust licht. Jij blijft de coach voor richting, context en persoonlijke keuzes. WerkCV neemt vooral het praktische cv-werk over: structuur, templates, voorbeeldroutes, ATS-checks en een duidelijke PDF-download.
          </p>
        </section>

        <section className="mb-12">
          <div className="mb-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Herkenbare cliëntproblemen
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Waar cliënten vaak vastlopen op hun cv
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {clientProblems.map((item) => (
              <article
                key={item.title}
                className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-xl font-black text-black">{item.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12 border-4 border-black bg-[#FFF9D9] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Praktische workflow
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            WerkCV workflow voor loopbaancoaches
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-5">
            {workflowSteps.map((step) => (
              <article
                key={step.title}
                className="border-3 border-black bg-white p-4"
                style={{ borderWidth: "3px" }}
              >
                <h3 className="text-sm font-black leading-snug text-black">{step.title}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="mb-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Trajecten
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Voor welke begeleiding past WerkCV?
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {trajectoryCards.map((card) => (
              <article
                key={card.title}
                className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-black text-black">{card.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Klaar om te gebruiken
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Client handoff: tekst die je direct kunt gebruiken
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {coachToolkit.map((item) => (
              <article key={item.label} className="border-2 border-black bg-[#FFFEF0] p-4">
                <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-600">
                  {item.label}
                </h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                  “{item.text}”
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12 border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
          <h2 className="text-3xl font-black">Nuttige routes voor je cliënten</h2>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-200">
            Gebruik deze links als toolkit in je deelnemersomgeving, e-mail na een sessie of workshopmateriaal.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {resourceLinks.map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                className="border-2 border-white bg-white px-4 py-3 text-sm font-black text-black"
              >
                {resource.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black text-black">
              Wanneer WerkCV niet genoeg is
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              Sommige cliënten hebben eerst persoonlijke begeleiding nodig bij verlies, gezondheid, conflict, juridische vragen of complexe re-integratie. WerkCV lost dat niet op. Het is bedoeld voor het moment waarop de cliënt klaar is om zijn of haar arbeidsmarktverhaal praktisch te vertalen naar een cv.
            </p>
          </div>
          <div className="border-4 border-black bg-yellow-400 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black text-black">
              Waarom dit beter converteert dan een losse link
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-black">
              De cliënt krijgt niet alleen “maak hier je cv”, maar een volgorde: basisversie bouwen, checken, coachfeedback verwerken, vacaturegericht maken en pas downloaden als de versie klopt. Dat maakt de betaalstap logischer.
            </p>
          </div>
        </section>

        <section id="coach-aanvraag" className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-4 border-black bg-yellow-400 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-black">
              B2B lead
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Wil je een coach toolkit of partnerroute?
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-black">
              Beschrijf je doelgroep, trajecttype en waar cliënten nu vastlopen. Dan kunnen we meedenken over een bruikbare route: resource-link, workshop, vaste toolkit of partnerafspraak.
            </p>
          </div>

          <B2BLeadForm
            pageType="coach"
            pagePath="/loopbaancoach"
            title="Vraag een loopbaancoach toolkit aan"
            description="Vertel kort welke cliënten je begeleidt en waar je cv-proces nu vastloopt."
            submitLabel="Stuur aanvraag"
            audienceLabel="Type begeleiding"
            audienceOptions={audienceOptions}
            goalLabel="Wat wil je met WerkCV doen?"
            goalPlaceholder="Bijvoorbeeld: cliënten na sessie 2 naar een cv laten werken, workshop voor outplacementgroep, toolkit voor re-integratie of starterstraject."
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
