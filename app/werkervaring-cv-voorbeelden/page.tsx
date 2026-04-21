import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import SectionIntentLinks from "@/components/seo/SectionIntentLinks";

const frameworkSteps = [
  "Start elke bullet met een krachtig werkwoord (verbeterde, verhoogde, reduceerde, ontwikkelde).",
  "Noem de context: team, klanten, omzet, projecten of volume waar je verantwoordelijk voor was.",
  "Maak impact meetbaar met cijfers, percentages, tijdswinst, kwaliteit of kostenbesparing.",
  "Koppel je bullets aan de vacature: kies alleen resultaten die relevant zijn voor de nieuwe rol.",
];

const roleExamples = [
  {
    title: "Administratief medewerker",
    weak: "Verantwoordelijk voor administratie en klantcontact.",
    strong:
      "Verwerkte dagelijks 85+ dossiers foutloos en verkortte de factuurdoorlooptijd met 24% door standaardisatie van intake- en archiefprocessen.",
    why: "Laat volume, betrouwbaarheid en procesimpact zien in één zin.",
  },
  {
    title: "Klantenservice medewerker",
    weak: "Hielp klanten met vragen via telefoon en e-mail.",
    strong:
      "Behandelde gemiddeld 120 klantcases per week via telefoon en e-mail, verhoogde CSAT naar 9,1 en verlaagde escalaties met 21% door betere first-response scripts.",
    why: "Concreet op kanaal, volume en meetbare servicekwaliteit.",
  },
  {
    title: "Verkoopmedewerker",
    weak: "Verantwoordelijk voor verkoop in de winkel.",
    strong:
      "Overtrof maandelijkse verkoopdoelen met gemiddeld 18% en verhoogde het aantal aanvullende verkopen met 27% via actieve productcombinaties en klantadvies.",
    why: "Geeft direct commerciële waarde en verkoopgedrag weer.",
  },
  {
    title: "Marketing specialist",
    weak: "Maakte social media posts en campagnes.",
    strong:
      "Optimaliseerde e-mail- en social campagnes waardoor CTR met 22% steeg en CPL met 16% daalde binnen drie kwartalen.",
    why: "Toont effect op funnelmetrics in plaats van losse taken.",
  },
  {
    title: "Software developer",
    weak: "Bouwde features voor webapplicatie.",
    strong:
      "Implementeerde performance-optimalisaties in React/Node.js waardoor paginalaadtijd met 38% daalde en releasefrequentie steeg van 1x per 3 weken naar wekelijks.",
    why: "Koppelt techniek aan productimpact en teamvelocity.",
  },
  {
    title: "Projectcoordinator",
    weak: "Ondersteunde projecten en planning.",
    strong:
      "Coordineerde 12 parallelle klantprojecten met 98% oplevering op tijd door strakkere sprintplanning, risico-updates en stakeholderafstemming.",
    why: "Bewijst ownership, complexiteit en leverbetrouwbaarheid.",
  },
  {
    title: "Verpleegkundige",
    weak: "Verleende zorg aan patienten.",
    strong:
      "Leverde dagelijkse zorg aan 20+ patienten per dienst en verkortte overdrachtstijd met 15% door verbeterde triage- en rapportageafspraken binnen het team.",
    why: "Laat zorginhoud en operationele verbetering tegelijk zien.",
  },
  {
    title: "Logistiek medewerker",
    weak: "Werkte in het magazijn en deed orderpicking.",
    strong:
      "Verwerkte gemiddeld 230 orderregels per dienst met 99,4% picknauwkeurigheid en verlaagde retouren met 12% door extra kwaliteitscontrole op verzending.",
    why: "Maakt productiviteit en kwaliteit direct toetsbaar.",
  },
];

const bulletLibrary = [
  "Automatiseerde wekelijkse rapportages waardoor 8 uur handmatig werk per week werd bespaard.",
  "Verhoogde first-time-right van administratieve verwerking van 92% naar 98%.",
  "Trainde 5 nieuwe teamleden en verkortte onboarding van 4 weken naar 2,5 week.",
  "Verminderde klantwachttijden met 19% door herinrichting van serviceprocessen.",
  "Introduceerde nieuw opvolgsysteem waardoor openstaande tickets met 31% daalden.",
  "Verbeterde voorraadnauwkeurigheid van 94% naar 99% binnen 2 maanden.",
  "Realiseerde kostenbesparing van EUR 18.000 per jaar via betere leveranciersafspraken.",
  "Verhoogde nieuwsbrief-inschrijvingen met 26% door optimalisatie van landingspagina's.",
  "Leidde implementatie van nieuw CRM voor 3 teams zonder downtime.",
  "Haalde 11 van 12 kwartalen de gestelde sales target (gemiddeld 112%).",
];

const mistakes = [
  "Alleen taken opsommen zonder resultaat of impact.",
  "Vage woorden gebruiken: “geholpen”, “bezig met”, “ondersteund” zonder context.",
  "Te veel bullets (10+) per functie waardoor de kern verdwijnt.",
  "Geen aansluiting met vacaturetermen en gevraagde competenties.",
];

const faqs = [
  {
    question: "Hoe beschrijf ik werkervaring op mijn cv?",
    answer:
      "Gebruik korte bullets met actie + context + resultaat. Laat per functie 3 tot 6 relevante bullets zien en focus op prestaties die passen bij de vacature waarop je solliciteert.",
  },
  {
    question: "Hoeveel bullets moet ik per functie op mijn cv zetten?",
    answer:
      "Meestal werken 3 tot 6 bullets per recente functie het best. Voor oudere functies zijn 1 tot 3 bullets vaak voldoende, zolang de inhoud relevant blijft.",
  },
  {
    question: "Moet ik cijfers gebruiken bij werkervaring?",
    answer:
      "Ja, waar mogelijk wel. Cijfers maken je impact geloofwaardig en scanbaar voor recruiters, bijvoorbeeld percentages, volumes, omzet, tijdsbesparing of kwaliteitsverbetering.",
  },
  {
    question: "Kan ik deze werkervaring voorbeelden direct kopieren?",
    answer:
      "Gebruik ze als structuur en inspiratie. Pas elk voorbeeld aan op jouw situatie, functiecontext en resultaten zodat je CV authentiek en geloofwaardig blijft.",
  },
];

const experienceIntentLinks = [
  {
    href: "/cv-aanmaken",
    label: "CV aanmaken met sterke werkervaring als hoofdmotor",
    description:
      "Gebruik een structuur waarin recente functies en resultaat-bullets direct de meeste ruimte krijgen.",
  },
  {
    href: "/templates",
    label: "Vergelijk templates voor resultaatgedreven bullets",
    description:
      "Kies een layout waarin prestaties, metrics en projectimpact sneller scannen dan taakomschrijvingen.",
  },
  {
    href: "/ats-cv-template",
    label: "ATS CV template gebruiken voor leesbare werkervaring",
    description:
      "Houd functietitels, bullets en vacaturekeywords schoon voor recruitersoftware en snelle handmatige scans.",
  },
  {
    href: "/cv-maken-pdf",
    label: "CV maken als PDF voor een stabiele sollicitatieversie",
    description:
      "Werk je ervaring online uit en exporteer daarna naar een format dat overal hetzelfde blijft.",
  },
];

export const metadata: Metadata = {
  title: "Werkervaring CV Voorbeelden - Sterke Bullet Points met Resultaat | WerkCV",
  description:
    "Zoek je werkervaring cv voorbeelden? Bekijk sterke bullet points per functie met actie + resultaat. Inclusief formule, foutencheck en direct toepassen in editor.",
  keywords: [
    "werkervaring cv voorbeelden",
    "cv werkervaring voorbeelden",
    "cv bullet points voorbeelden",
    "werkervaring beschrijven cv",
    "resultaatgerichte cv bullets",
    "werkervaring op cv zetten",
    "cv prestaties voorbeelden",
  ],
  alternates: {
    canonical: "https://werkcv.nl/werkervaring-cv-voorbeelden",
    languages: {
      "nl-NL": "https://werkcv.nl/werkervaring-cv-voorbeelden",
      "x-default": "https://werkcv.nl/werkervaring-cv-voorbeelden",
    },
  },
};

export default function WerkervaringCvVoorbeeldenPage() {
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
        name: "Werkervaring CV Voorbeelden",
        item: "https://werkcv.nl/werkervaring-cv-voorbeelden",
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
            href="/tools/werkervaring-bullets"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            Open bullets tool
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-14">
        <section className="mb-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-slate-700">
              Hoog-intent voorbeelden
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Werkervaring CV voorbeelden die recruiters direct als relevant herkennen
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Succesvolle Engelse resume-platforms winnen op resultaatgerichte experience bullets. Die aanpak werkt in Nederland net zo goed: niet alleen wat je deed, maar welke impact je leverde.
              Gebruik deze voorbeelden als basis en pas ze aan op jouw functie en vacature.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/tools/werkervaring-bullets"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Genereer je bullets
              </Link>
              <Link
                href="/cv-aanmaken"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                CV aanmaken met deze bullets
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Voorbeeld bullets per functie",
                "Formule uit bewezen resume-praktijk",
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
            <h2 className="text-xl font-black text-black">De 4-delige formule voor sterke werkervaring bullets</h2>
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
                href="/cv-tips/cv-werkervaring-beschrijven"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Lees ook: werkervaring op je CV beschrijven
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Voor en na voorbeelden
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Werkervaring voorbeelden per functie
          </h2>
          <div className="mt-6 space-y-5">
            {roleExamples.map((example) => (
              <article
                key={example.title}
                className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-black text-black">{example.title}</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="border-2 border-red-300 bg-red-50 p-4">
                    <p className="text-xs font-black uppercase tracking-[0.15em] text-red-700">
                      Zwak voorbeeld
                    </p>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-red-900">
                      {example.weak}
                    </p>
                  </div>
                  <div className="border-2 border-emerald-300 bg-emerald-50 p-4">
                    <p className="text-xs font-black uppercase tracking-[0.15em] text-emerald-700">
                      Sterk voorbeeld
                    </p>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-emerald-900">
                      {example.strong}
                    </p>
                  </div>
                </div>
                <p className="mt-4 border-t-2 border-black pt-3 text-xs font-bold uppercase tracking-[0.12em] text-slate-600">
                  Waarom dit werkt: <span className="normal-case font-medium tracking-normal text-slate-700">{example.why}</span>
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Copy-ready bibliotheek
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            10 sterke bullet points om op maat te maken
          </h2>
          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
            Kopieer deze niet letterlijk, maar vervang cijfers, context en resultaten met jouw data.
          </p>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {bulletLibrary.map((bullet) => (
              <li
                key={bullet}
                className="border-2 border-black bg-[#FFFEF0] p-4 text-sm font-medium leading-relaxed text-slate-700"
              >
                {bullet}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Van bullet naar complete CV-versie
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Zet sterke werkervaring in de juiste template en exportflow
          </h2>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
            Goede bullets verliezen waarde als ze in een zwakke structuur of rommelige
            layout belanden. Gebruik daarom een route die je werkervaring niet alleen
            inhoudelijk, maar ook visueel en technisch recruiter-proof maakt.
          </p>
          <SectionIntentLinks links={experienceIntentLinks} locale="nl" />
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Veelgemaakte fouten
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Waarom werkervaring vaak niet overtuigt
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
                  href: "/tools/werkervaring-bullets",
                  title: "Werkervaring bullets generator",
                  body: "Genereer direct functiegerichte bullets die je kunt aanpassen op jouw situatie.",
                },
                {
                  href: "/cv-aanmaken",
                  title: "CV aanmaken",
                  body: "Gebruik een structuur waarin werkervaring direct de kern van je sollicitatie wordt.",
                },
                {
                  href: "/cv-maken-template",
                  title: "CV maken met template",
                  body: "Zet je bullets in een layout die impact en scanbaarheid voorop zet.",
                },
                {
                  href: "/templates",
                  title: "Templates vergelijken",
                  body: "Gebruik een directe templatekeuze zodra je bullets inhoudelijk sterk genoeg zijn en je vooral nog de juiste presentatie wilt kiezen.",
                },
                {
                  href: "/ats-cv-template",
                  title: "ATS CV template",
                  body: "Gebruik een template waarin functietitels, bullets en keywords schoon uitleesbaar blijven.",
                },
                {
                  href: "/cv-maken-pdf",
                  title: "CV maken als PDF",
                  body: "Werk je ervaringen online uit en download daarna een stabiele sollicitatieversie.",
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
            Veelgestelde vragen over werkervaring op je CV
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
                Klaar om je werkervaring te upgraden?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Genereer bullets en zet ze direct op je CV
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Gebruik de voorbeelden, maak je eigen versie en publiceer direct in de editor.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/werkervaring-bullets"
                className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Start bullets tool
              </Link>
              <Link
                href="/templates"
                className="inline-block border-4 border-black bg-black px-5 py-3 text-base font-black text-white"
              >
                Kies template voor je bullets
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


