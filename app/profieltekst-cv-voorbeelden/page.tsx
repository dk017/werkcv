import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import SectionIntentLinks from "@/components/seo/SectionIntentLinks";

const frameworkSteps = [
  "Open met je rol, ervaringsniveau en domein in 1 zin.",
  "Noem 2 of 3 kernvaardigheden die direct relevant zijn voor de vacature.",
  "Voeg 1 concreet resultaat toe met metric of aantoonbare impact.",
  "Sluit af met het type rol of bijdrage waar je nu op focust.",
];

const roleExamples = [
  {
    title: "Starter - communicatie",
    text: "Ambitieuze communicatiestarter met stage-ervaring in contentcreatie, social planning en e-mailcampagnes. Tijdens mijn afstudeerproject verhoogde ik de nieuwsbrief CTR met 18% door betere onderwerpregels en segmentatie. Ik zoek een junior communicatie- of marketingrol waarin ik creativiteit en data combineer.",
    why: "Sterk voor starters: potentie + relevant bewijs + duidelijke richting.",
  },
  {
    title: "Administratief medewerker",
    text: "Nauwkeurige administratief medewerker met 6 jaar ervaring in dossierbeheer, planning en klantcontact. Ik verbeterde de factuurdoorlooptijd met 24% door processen tussen operations en finance te standaardiseren. Ik breng structuur, eigenaarschap en rust in drukke teams.",
    why: "Laat betrouwbaarheid en procesimpact samen zien.",
  },
  {
    title: "Klantenservice specialist",
    text: "Servicegerichte klantenservice specialist met 4 jaar ervaring in telefoon-, chat- en e-mailondersteuning. Ik behaalde een gemiddelde CSAT van 9,1 en verlaagde escalaties met 21% via betere first-response scripts. Ik zoek een rol waarin ik servicekwaliteit en teamcoaching combineer.",
    why: "Koppelt servicegedrag aan meetbare klantresultaten.",
  },
  {
    title: "Software developer",
    text: "Full-stack developer met 5 jaar ervaring in TypeScript, React en Node.js binnen productteams. Ik verlaagde paginalaadtijden met 38% en hielp releasecycli versnellen naar wekelijkse deploys via CI/CD-optimalisatie. Ik bouw graag schaalbare producten met directe gebruikersimpact.",
    why: "Stack + impact + productfocus in één compacte intro.",
  },
  {
    title: "Verpleegkundige",
    text: "BIG-geregistreerde verpleegkundige met 8 jaar ervaring in klinische zorg en multidisciplinaire samenwerking. Ik ben sterk in triage, zorgcoordinatie en patientcommunicatie, en droeg bij aan 15% kortere overdrachttijden op de afdeling. Ik zoek een rol waar kwaliteit van zorg en teamontwikkeling centraal staan.",
    why: "Maakt zorginhoud en operationele bijdrage tastbaar.",
  },
  {
    title: "Carrièreswitch naar data-analist",
    text: "Resultaatgerichte operations professional met 7 jaar ervaring in procesverbetering en KPI-rapportage, in transitie naar data-analyse. Ik bouwde interne dashboards die wekelijks 10 uur rapportagetijd bespaarden en rondde een intensief traject in SQL en Power BI af. Ik wil mijn domeinkennis inzetten in een junior data-analist rol.",
    why: "Ideaal voor switchers: bestaande waarde plus geloofwaardige nieuwe richting.",
  },
];

const sentenceStarters = {
  "Openingszinnen": [
    "Resultaatgerichte [functie] met [x] jaar ervaring in [domein].",
    "Ervaren [functie] gespecialiseerd in [vaardigheid] en [vaardigheid].",
    "Praktisch ingestelde [functie] met focus op [resultaatgebied].",
    "Klantgerichte [functie] met bewezen ervaring in [context].",
  ],
  "Impactzinnen": [
    "Verhoogde [KPI] met [x]% door [actie].",
    "Verlaagde [doorlooptijd/kosten] met [x]% via [aanpak].",
    "Beheerde [volume/team] en verbeterde [resultaat].",
    "Introduceerde [proces/tool] met [meetbare uitkomst].",
  ],
  "Afsluitzinnen": [
    "Ik zoek een rol waarin ik [vaardigheid] en [vaardigheid] verder inzet.",
    "Mijn focus ligt op [doelrol] binnen [sector/type organisatie].",
    "Ik voeg waarde toe met [sterkte] in teams die [context].",
    "Klaar om bij te dragen aan [bedrijfsdoel] met [jouw expertise].",
  ],
};

const intentMatches = [
  {
    title: "Voorbeeld profiel cv",
    body: "Gebruik een korte opening van 3 tot 5 zinnen met rol, kernskills, bewijs en gewenste volgende stap.",
  },
  {
    title: "Profiel in cv voorbeeld",
    body: "Plaats je profiel direct onder je naam en contactgegevens, zodat recruiters eerst context zien en daarna je ervaring.",
  },
  {
    title: "CV profielschets voorbeeld",
    body: "Zie profielschets, profieltekst en CV-samenvatting als varianten van dezelfde opening: kort, concreet en vacaturegericht.",
  },
];

const mistakes = [
  "Te algemeen: motivatiewoorden zonder bewijs of context.",
  "Te lang: profieltekst van 120+ woorden wordt vaak overgeslagen.",
  "Geen vacaturematch: dezelfde tekst voor elke sollicitatie gebruiken.",
  "Losse claims: vaardigheden noemen zonder terugkoppeling in werkervaring.",
];

const faqs = [
  {
    question: "Wat is een goede profieltekst op een CV?",
    answer:
      "Een goede profieltekst is kort, concreet en vacaturegericht. In 3 tot 5 zinnen laat je zien wie je bent, wat je specialisme is, welke impact je levert en wat je zoekt in je volgende rol.",
  },
  {
    question: "Hoe lang moet een profieltekst zijn?",
    answer:
      "In de meeste gevallen werkt 60 tot 90 woorden het best. Kort genoeg om snel te scannen, lang genoeg om relevantie en bewijs te tonen.",
  },
  {
    question: "Wat is het verschil tussen profieltekst en samenvatting?",
    answer:
      "In de praktijk worden beide termen vaak door elkaar gebruikt. Het gaat in beide gevallen om de korte introductie bovenaan je CV die direct duidelijk maakt waarom jij relevant bent.",
  },
  {
    question: "Moet ik mijn profieltekst per vacature aanpassen?",
    answer:
      "Ja. Pas functietitel, kernvaardigheden en impactzinnen aan op de vacaturetaal. Dat verhoogt zowel recruiter-relevantie als ATS-match.",
  },
];

const profileIntentLinks = [
  {
    href: "/cv-aanmaken",
    label: "CV aanmaken met een profieltekst die meteen de toon zet",
    description:
      "Gebruik een Nederlandse CV-opbouw waarin je opening, werkervaring en vaardigheden elkaar logisch versterken.",
  },
  {
    href: "/templates",
    label: "Vergelijk templates zodra je profieltekst inhoudelijk staat",
    description:
      "Kies daarna pas de layout die past bij je rol, zodat inhoud en opbouw elkaar versterken in plaats van concurreren.",
  },
  {
    href: "/gratis-cv-maken",
    label: "Gratis CV maken en je profieltekst daarna per vacature aanscherpen",
    description:
      "Start gratis met een basisversie en verfijn je opening pas wanneer je inhoud en layout goed staan.",
  },
  {
    href: "/cv-maken-student",
    label: "Studenten-CV maken als je profieltekst extra veel context moet geven",
    description:
      "Laat opleiding, stages en leervermogen sneller landen met een compacte opening bovenaan je CV.",
  },
  {
    href: "/cv-maken-in-engels",
    label: "Engels CV maken met Nederlandse scanstructuur",
    description:
      "Houd je profieltekst Engelstalig, maar laat de opbouw wel aansluiten op wat Nederlandse recruiters verwachten.",
  },
];

export const metadata: Metadata = {
  title: "Voorbeeld Profiel CV - Profieltekst Voorbeelden per Functie | WerkCV",
  description:
    "Zoek je een voorbeeld profiel cv of profiel in cv voorbeeld? Bekijk profieltekst voorbeelden per functie, plus structuur, zinsstarters en foutencheck. Direct toepassen in je CV.",
  keywords: [
    "voorbeeld profiel cv",
    "profiel in cv voorbeeld",
    "cv profielschets voorbeeld",
    "profieltekst cv voorbeelden",
    "persoonlijk profiel cv voorbeeld",
    "cv profieltekst voorbeeld",
    "profieltekst op cv",
    "cv introductie voorbeelden",
    "goede profieltekst cv",
    "profieltekst schrijven cv",
  ],
  alternates: {
    canonical: "https://werkcv.nl/profieltekst-cv-voorbeelden",
    languages: {
      "nl-NL": "https://werkcv.nl/profieltekst-cv-voorbeelden",
      "x-default": "https://werkcv.nl/profieltekst-cv-voorbeelden",
    },
  },
};

export default function ProfieltekstCvVoorbeeldenPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://werkcv.nl",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Profieltekst CV Voorbeelden",
        item: "https://werkcv.nl/profieltekst-cv-voorbeelden",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FFFEF0]">
      <header className="relative z-10 border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-black">
              Werk<span className="bg-yellow-400 px-1">CV</span>.nl
            </span>
          </Link>
          <Link
            href="/tools/profieltekst-generator"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            Open profieltekst tool
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-14">
        <section className="mb-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-slate-700">
              Intent: voorbeeld profiel cv
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Voorbeeld profiel CV: profieltekst voorbeelden die meteen relevantie opbouwen
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Zoek je een voorbeeld profiel op je cv? Voor Nederlandse sollicitaties werkt dezelfde regel als op sterke resume-sites: geen vage claims, wel rolcontext, kernskills en meetbare impact.
              Gebruik de voorbeelden hieronder als bouwstenen voor je eigen profieltekst of profielschets.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/tools/profieltekst-generator"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Genereer je profieltekst
              </Link>
              <Link
                href="/cv-aanmaken"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                CV aanmaken met deze opening
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Voorbeelden per profieltype",
                "Formule voor vacaturematch",
                "Direct toepasbaar in editor",
              ].map((item) => (
                <div
                  key={item}
                  className="border-3 border-black bg-white px-4 py-3 text-sm font-black text-black"
                  style={{ borderWidth: "3px" }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">De 4-delige formule voor een sterke profieltekst</h2>
            <div className="mt-5 space-y-4">
              {frameworkSteps.map((step, index) => (
                <div key={step} className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center border-2 border-black bg-yellow-300 text-xs font-black">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-slate-700">{step}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/cv-tips/profieltekst-schrijven"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Lees ook: profieltekst schrijven
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14 grid gap-4 md:grid-cols-3">
          {intentMatches.map((item) => (
            <article
              key={item.title}
              className="border-4 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            >
              <h2 className="text-lg font-black text-black">{item.title}</h2>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Copy-ready voorbeelden
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Profieltekst voorbeelden per type kandidaat
          </h2>
          <div className="mt-6 space-y-5">
            {roleExamples.map((example) => (
              <article
                key={example.title}
                className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-black text-black">{example.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{example.text}</p>
                <p className="mt-4 border-t-2 border-black pt-3 text-xs font-bold uppercase tracking-[0.12em] text-slate-600">
                  Waarom dit werkt: <span className="normal-case tracking-normal font-medium text-slate-700">{example.why}</span>
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Zinsbibliotheek
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Handige profieltekst zinnen om te personaliseren
          </h2>
          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
            Gebruik deze patronen als startpunt en vervang functietitel, context en impact met jouw eigen data.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {Object.entries(sentenceStarters).map(([group, items]) => (
              <div key={group} className="border-2 border-black bg-[#FFFEF0] p-4">
                <p className="text-sm font-black text-black">{group}</p>
                <ul className="mt-3 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
            Van profieltekst naar complete sollicitatieversie
          </p>
          <h2 className="mt-2 text-2xl font-black text-black sm:text-3xl">
            Gebruik je openingszin als startpunt voor een sterker volledig CV
          </h2>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
            Een goede profieltekst werkt pas echt als de rest van je CV dezelfde toon, bewijsvoering en vacaturefocus vasthoudt. Open daarom meteen de juiste CV-route zodra je basiszin staat.
          </p>
          <SectionIntentLinks links={profileIntentLinks} locale="nl" />
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Veelgemaakte fouten
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Waarom profielteksten vaak zwak overkomen
            </h2>
            <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-200">
              {mistakes.map((mistake) => (
                <li key={mistake}>{mistake}</li>
              ))}
            </ul>
          </div>
          <div className="border-4 border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Relevante vervolgstappen
            </p>
            <div className="mt-4 space-y-4">
              {[
                {
                  href: "/tools/profieltekst-generator",
                  title: "Profieltekst generator",
                  body: "Genereer in seconden een profieltekst op basis van jouw doelrol.",
                },
                {
                  href: "/cv-aanmaken",
                  title: "CV aanmaken",
                  body: "Zet je profieltekst meteen boven een eerste Nederlandse basisversie als je nog vanaf nul begint.",
                },
                {
                  href: "/templates",
                  title: "Templates vergelijken",
                  body: "Kies een layout zodra je profieltekst goed staat en laat daarna de rest van je CV op dezelfde toon aansluiten.",
                },
                {
                  href: "/gratis-cv-maken",
                  title: "Gratis CV maken",
                  body: "Begin gratis als je eerst wilt schrijven, vergelijken en pas bij download wilt betalen.",
                },
                {
                  href: "/cv-maken-student",
                  title: "Studenten-CV maken",
                  body: "Handig als je profieltekst opleiding, stages en eerste ervaring extra duidelijk moet maken.",
                },
                {
                  href: "/cv-maken-in-engels",
                  title: "Engels CV maken",
                  body: "Gebruik een Engelstalige opening met een structuur die Nederlandse recruiters nog steeds snel kunnen scannen.",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block border-2 border-black bg-[#FFFEF0] p-4 transition-colors hover:bg-yellow-100"
                >
                  <p className="text-sm font-black text-black">{item.title}</p>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">{item.body}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over profielteksten op je CV
          </h2>
          <div className="mx-auto mt-8 max-w-3xl space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <summary className="flex cursor-pointer items-center justify-between p-4 text-left text-base font-black text-black">
                  {faq.question}
                  <span className="ml-3 text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="border-t-2 border-black px-4 pb-4 pt-3 text-sm font-medium leading-relaxed text-slate-700">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="border-4 border-black bg-yellow-400 px-6 py-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-black">
                Klaar om je profieltekst te finaliseren?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Genereer je profieltekst en publiceer direct in je CV
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Gebruik de voorbeelden als basis en zet je definitieve versie direct in de editor.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/profieltekst-generator"
                className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Start profieltekst tool
              </Link>
              <Link
                href="/templates"
                className="inline-block border-4 border-black bg-black px-5 py-3 text-base font-black text-white"
              >
                Kies template voor je profieltekst
              </Link>
            </div>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Footer />
    </div>
  );
}
