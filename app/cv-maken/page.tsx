import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { templateList } from "@/lib/templates/registry";

const featuredTemplates = templateList.filter((template) =>
  ["professional", "ats", "simple", "modern"].includes(template.id),
);

const templateUseCases: Record<string, string> = {
  professional: "Beste keuze voor zakelijke rollen waar rust, structuur en betrouwbaarheid doorslaggevend zijn.",
  ats: "Sterk voor vacatures met veel concurrentie en ATS-filtering op duidelijke koppen en keywords.",
  simple: "Praktisch voor starters, korte CV's en snelle sollicitaties zonder visuele ruis.",
  modern: "Geschikt voor marketing, sales en tech wanneer je een frisse maar professionele uitstraling wilt.",
};

const workflowSteps = [
  {
    title: "1) Kies eerst je doelrol en vacaturetype",
    body: "Een CV maken begint niet met opmaak, maar met richting. Beslis voor welke functie je nu solliciteert en welke ervaring het meest relevant is voor die rol.",
  },
  {
    title: "2) Zet je profieltekst in 3-4 zinnen neer",
    body: "Vat je ervaring, specialisatie en toegevoegde waarde samen. Gebruik taal uit de vacature zodat recruiter en ATS direct match zien.",
  },
  {
    title: "3) Bouw werkervaring op met resultaatgerichte bullets",
    body: "Schrijf per functie 3 tot 6 bullets met actie en impact. Vermijd alleen taaklijsten; benoem wat je verbeterde, hoeveel en in welke context.",
  },
  {
    title: "4) Selecteer relevante vaardigheden",
    body: "Gebruik alleen skills die je echt kunt onderbouwen in werkervaring, projecten of opleiding. Dat maakt je CV geloofwaardig en sterker in gesprekken.",
  },
  {
    title: "5) Kies een template die de inhoud ondersteunt",
    body: "Voor de meeste Nederlandse sollicitaties werkt een rustige, scanbare layout beter dan een druk design. Laat inhoud het werk doen.",
  },
  {
    title: "6) Controleer ATS-woorden en leesbaarheid",
    body: "Verwerk kerntermen uit de vacature op natuurlijke plekken: functietitel, profiel, werkervaring en skills. Houd koppen en structuur helder.",
  },
  {
    title: "7) Maak een versie per vacature",
    body: "Een cv maken voor 2026 betekent varianten bouwen. Pas per vacature titel, profieltekst en kernbullets aan voor hogere respons.",
  },
];

const profileExamples = [
  {
    title: "CV maken voorbeeld (medior, operations)",
    text: "Resultaatgerichte operations professional met 6 jaar ervaring in procesoptimalisatie, planning en teamcoordinatie. Realiseerde een doorlooptijdverkorting van 24% door bottlenecks in de dagelijkse operatie structureel op te lossen. Ik combineer data, overzicht en eigenaarschap om teams voorspelbaar te laten presteren.",
  },
  {
    title: "CV maken voorbeeld (starter)",
    text: "Gemotiveerde starter met stage-ervaring in klantcontact, administratieve ondersteuning en rapportage. Tijdens mijn afstudeerstage ontwikkelde ik een overzicht voor opvolging van openstaande acties, waardoor het team sneller prioriteiten kon stellen. Ik zoek een rol waarin ik nauwkeurigheid en leergierigheid direct kan inzetten.",
  },
  {
    title: "CV maken voorbeeld (carriere switch)",
    text: "Klantgerichte professional met 8 jaar commerciële ervaring, nu in transitie naar customer success. In mijn vorige functie verhoogde ik klantbehoud met 18% door gestructureerde opvolging en betere overdracht tussen sales en support. Ik vertaal klantbehoeften naar acties die retentie en tevredenheid verhogen.",
  },
];

const bulletPairs = [
  {
    weak: "Verantwoordelijk voor klantcontact en administratie.",
    strong:
      "Dagelijks 45+ klantvragen afgehandeld en administratieve opvolging gestandaardiseerd, waardoor reactietijd met 21% daalde.",
  },
  {
    weak: "Werkte met Excel en rapportages.",
    strong:
      "Wekelijkse Excel-rapportages geautomatiseerd met controles, waardoor handmatige correcties in de maandafsluiting met 30% afnamen.",
  },
  {
    weak: "Ondersteunde het team bij projecten.",
    strong:
      "Projectplanning en voortgangsbewaking ingericht voor 3 parallelle trajecten, met 100% oplevering binnen afgesproken deadlines.",
  },
];

const hardSkills = [
  "Excel / Google Sheets (analyse, controles, dashboards)",
  "Office 365 / Google Workspace",
  "CRM- of ATS-systemen",
  "Rapportage en documentatie",
  "Proces- en kwaliteitsverbetering",
  "Basis data-analyse",
];

const softSkills = [
  "Prioriteiten stellen onder tijdsdruk",
  "Heldere schriftelijke communicatie",
  "Nauwkeurigheid en eigenaarschap",
  "Samenwerking met meerdere stakeholders",
  "Probleemoplossend werken",
  "Klant- en resultaatgerichtheid",
];

const keywordBank = [
  "cv maken",
  "curriculum vitae maken",
  "cv opstellen",
  "resultaatgericht",
  "stakeholdermanagement",
  "procesverbetering",
  "planning",
  "rapportage",
  "team samenwerking",
  "kwaliteitscontrole",
];

const mistakeFixes = [
  {
    title: "Fout: te veel over jezelf, te weinig over de vacature",
    fix: "Fix: laat in profiel en werkervaring zien hoe jouw ervaring direct aansluit op de gevraagde taken en resultaten.",
  },
  {
    title: "Fout: alleen verantwoordelijkheden opsommen",
    fix: "Fix: herschrijf bullets naar actie + context + uitkomst, bij voorkeur met cijfers of aantoonbare verbetering.",
  },
  {
    title: "Fout: 1 standaard CV voor alle functies",
    fix: "Fix: maak per vacature een aangepaste versie met relevante keywords, prioriteiten en voorbeelden.",
  },
  {
    title: "Fout: design kiezen dat scanbaarheid schaadt",
    fix: "Fix: gebruik een rustige template en houd secties kort, logisch en consistent geordend.",
  },
];

const faqs = [
  {
    question: "Hoe kan ik snel een goed cv maken?",
    answer:
      "Begin met een duidelijke doelrol, schrijf een korte profieltekst, voeg resultaatgerichte werkervaring toe en kies daarna een rustige template. Werk vervolgens vacaturegericht af in de editor.",
  },
  {
    question: "Wat moet er minimaal in een CV staan?",
    answer:
      "Persoonsgegevens, functietitel/profieltekst, relevante werkervaring, opleiding en vaardigheden vormen de basis. Voeg alleen onderdelen toe die je sollicitatie sterker maken.",
  },
  {
    question: "Is online cv maken beter dan in Word?",
    answer:
      "Voor de meeste mensen wel. Online bouwen voorkomt opmaakproblemen, versnelt aanpassingen per vacature en maakt het makkelijker om consistente, ATS-vriendelijke versies te maken.",
  },
  {
    question: "Hoe lang mag een CV zijn in Nederland?",
    answer:
      "Meestal werkt 1 pagina voor starters en 1 tot 2 pagina's voor ervaren kandidaten. Lengte is minder belangrijk dan relevantie en scanbaarheid.",
  },
  {
    question: "Kan ik gratis een CV maken op WerkCV?",
    answer:
      "Ja. Je kunt gratis starten, bewerken en templates vergelijken. Je betaalt alleen als je je definitieve PDF wilt downloaden.",
  },
  {
    question: "Welke template is het beste als ik twijfel?",
    answer:
      "Start meestal met een professionele of ATS-vriendelijke template. Die werken voor veel functies omdat ze duidelijk, rustig en recruiter-proof zijn.",
  },
];

export const metadata: Metadata = {
  title: "CV Maken - Stap-voor-Stap een Sterk CV in 2026 | WerkCV.nl",
  description:
    "CV maken in 2026? Gebruik ons stap-voor-stap plan, copy-ready voorbeelden en ATS tips. Maak direct online je CV en betaal alleen bij download.",
  keywords: [
    "cv maken",
    "curriculum vitae maken",
    "een cv maken",
    "maken cv",
    "cv maken tips",
    "online cv maken",
    "cv opstellen",
    "cv aanmaken",
    "goed cv maken",
    "cv maken gratis",
    "gratis cv maken",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-maken",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-maken",
      "x-default": "https://werkcv.nl/cv-maken",
    },
  },
};

export default function CvMakenPage() {
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
        name: "CV Maken",
        item: "https://werkcv.nl/cv-maken",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "CV maken in 7 stappen",
    description: "Praktische workflow om snel een sterk en scanbaar CV te maken.",
    totalTime: "PT45M",
    step: workflowSteps.map((step) => ({
      "@type": "HowToStep",
      name: step.title,
      text: step.body,
    })),
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
            href="/editor"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            Start in editor
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-14">
        <section className="mb-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-slate-700">
              Kernintentie: CV maken
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV maken dat direct duidelijk, professioneel en sollicitatieklaar is
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Een sterk CV maken betekent keuzes maken: relevante inhoud, heldere structuur en een layout die recruiters in seconden kunnen scannen. Op deze pagina krijg je een praktische workflow,
              copy-ready voorbeelden en concrete cv maken tips die je meteen kunt toepassen. Begin gratis in de editor, optimaliseer per vacature en download pas als je tevreden bent.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Maak nu je CV
              </Link>
              <Link
                href="/templates"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Vergelijk templates
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Stap-voor-stap CV workflow",
                "ATS + recruiter-proof aanpak",
                "Start gratis, betaal bij download",
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
            <h2 className="text-xl font-black text-black">Wat recruiters direct checken in je CV</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <li>
                <strong className="text-black">Relevantie:</strong> sluit je functietitel en profieltekst aan op de vacature?
              </li>
              <li>
                <strong className="text-black">Bewijs:</strong> laat je resultaten zien, niet alleen taken?
              </li>
              <li>
                <strong className="text-black">Scanbaarheid:</strong> is je opbouw logisch met duidelijke koppen en korte bullets?
              </li>
              <li>
                <strong className="text-black">Consistency:</strong> zijn stijl, taal en datums helder en foutarm?
              </li>
            </ul>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/tools/cv-keywords"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Check vacaturekeywords met de CV keywords tool
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Praktische aanpak
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            CV maken in 7 stappen (van leeg document naar sollicitatieklaar)
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {workflowSteps.map((step) => (
              <article
                key={step.title}
                className="border-4 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-black text-black">{step.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                Template-keuze
              </p>
              <h2 className="text-3xl font-black text-black">
                Welke template helpt het beste bij CV maken?
              </h2>
            </div>
            <Link href="/templates" className="text-sm font-black text-black underline decoration-2 underline-offset-4">
              Bekijk alle templates
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredTemplates.map((template) => (
              <div
                key={template.id}
                className="flex h-full flex-col border-4 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  {template.nameDutch}
                </p>
                <h3 className="mt-2 text-xl font-black text-black">{template.name}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                  {template.description}
                </p>
                <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
                  {templateUseCases[template.id]}
                </p>
                <div className="mt-auto pt-5">
                  <Link
                    href="/editor"
                    className="inline-block border-2 border-black bg-yellow-400 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-black"
                  >
                    Start in editor
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Link
              href="/gratis-cv-template"
              className="border-2 border-black bg-white p-4 text-sm font-black text-black transition-colors hover:bg-yellow-100"
            >
              Gratis CV template opties
            </Link>
            <Link
              href="/ats-cv-template"
              className="border-2 border-black bg-white p-4 text-sm font-black text-black transition-colors hover:bg-yellow-100"
            >
              ATS CV template vergelijken
            </Link>
            <Link
              href="/cv-template-word"
              className="border-2 border-black bg-white p-4 text-sm font-black text-black transition-colors hover:bg-yellow-100"
            >
              CV maken vs Word aanpak
            </Link>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Copy-ready inhoud
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Voorbeelden die je direct kunt gebruiken als je een CV gaat maken
          </h2>
          <div className="mt-6 space-y-5">
            {profileExamples.map((example) => (
              <article
                key={example.title}
                className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-black text-black">{example.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{example.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/tools/profieltekst-generator"
              className="border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black"
            >
              Genereer profieltekst
            </Link>
            <Link
              href="/profieltekst-cv-voorbeelden"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              Bekijk meer profieltekst voorbeelden
            </Link>
          </div>
        </section>

        <section className="mb-14 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Werkervaring formuleren
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Van zwakke naar sterke bullets
            </h2>
            <div className="mt-5 space-y-4">
              {bulletPairs.map((pair) => (
                <div key={pair.weak} className="border-2 border-black bg-[#FFFEF0] p-4">
                  <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-600">
                    Te zwak
                  </p>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">
                    {pair.weak}
                  </p>
                  <p className="mt-3 text-xs font-black uppercase tracking-[0.15em] text-slate-600">
                    Sterke versie
                  </p>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">
                    {pair.strong}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/tools/werkervaring-bullets"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Maak bullets op maat met de werkervaring tool
              </Link>
            </div>
          </div>

          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Skills + keywords
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Wat zet je in vaardigheden als je een CV maakt?
            </h2>
            <div className="mt-5 grid gap-4">
              <div className="border-2 border-black bg-[#FFFEF0] p-4">
                <p className="text-sm font-black text-black">Hard skills</p>
                <ul className="mt-2 space-y-1 text-sm font-medium text-slate-700">
                  {hardSkills.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="border-2 border-black bg-[#FFFEF0] p-4">
                <p className="text-sm font-black text-black">Soft skills</p>
                <ul className="mt-2 space-y-1 text-sm font-medium text-slate-700">
                  {softSkills.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
                Keyword bank
              </p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                {keywordBank.join(" | ")}
              </p>
            </div>
            <div className="mt-6 border-t-2 border-black pt-4">
              <Link
                href="/tools/vaardigheden-generator"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Gebruik de vaardigheden tool voor vacaturematch
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Veelgemaakte fouten
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Waarom veel mensen een CV maken maar weinig reacties krijgen
            </h2>
            <div className="mt-4 space-y-3">
              {mistakeFixes.map((item) => (
                <div key={item.title}>
                  <p className="text-sm font-bold leading-relaxed text-slate-100">{item.title}</p>
                  <p className="text-sm font-medium leading-relaxed text-slate-300">{item.fix}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="border-4 border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Slimme vervolgstappen
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Verdiep je CV stap voor stap
            </h2>
            <div className="mt-4 space-y-4">
              {[
                {
                  href: "/online-cv-maken",
                  title: "Online CV maken",
                  body: "Werk je liever volledig online? Volg de snelle web-based workflow voor meerdere vacaturevarianten.",
                },
                {
                  href: "/gratis-cv-maken",
                  title: "Gratis CV maken",
                  body: "Legt direct uit hoe gratis starten werkt en waarom je pas bij de PDF-download betaalt.",
                },
                {
                  href: "/cv-aanmaken",
                  title: "CV aanmaken",
                  body: "Ideaal als je vooral snel een eerste versie wilt opzetten zonder opmaakstress.",
                },
                {
                  href: "/cv-opstellen",
                  title: "CV opstellen",
                  body: "Loop je vast op volgorde en structuur? Gebruik de opstelgids met sectie-indeling en voorbeelden.",
                },
                {
                  href: "/curriculum-vitae-maken",
                  title: "Curriculum vitae maken",
                  body: "Formelere variant van dezelfde intentie, handig voor zakelijke en traditionele zoekers.",
                },
                {
                  href: "/cv-maken-in-engels",
                  title: "CV maken in Engels",
                  body: "Solliciteer je internationaal? Gebruik de Engelse workflow met copy-ready voorbeeldzinnen.",
                },
                {
                  href: "/cv-opmaak-voorbeeld",
                  title: "CV opmaak voorbeeld",
                  body: "Check goede vs slechte layoutvoorbeelden en verbeter direct de scanbaarheid van je CV.",
                },
                {
                  href: "/cv-voorbeelden",
                  title: "CV voorbeelden per beroep",
                  body: "Vergelijk inhoud per functie en neem de beste opbouw over voor jouw rol.",
                },
                {
                  href: "/cv-tips/cv-schrijven-tips",
                  title: "CV schrijven tips",
                  body: "Verdiep de schrijfregels voor profieltekst, werkervaring en ATS-structuur.",
                },
                {
                  href: "/werkervaring-cv-voorbeelden",
                  title: "Werkervaring voorbeelden",
                  body: "Zie hoe je taken omzet naar impactvolle bullets die recruiters overtuigen.",
                },
                {
                  href: "/prijzen",
                  title: "Prijzen",
                  body: "Bekijk precies hoe het model werkt: gratis starten, eenmalig betalen bij download.",
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
            Veelgestelde vragen over CV maken
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
                Klaar om je CV nu echt af te maken?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Start direct met CV maken en download pas als je tevreden bent
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Bouw gratis in de editor, gebruik de voorbeelden op deze pagina en maak in korte tijd een versie die recruiters direct begrijpen.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Open editor
              </Link>
              <Link
                href="/prijzen"
                className="inline-block border-4 border-black bg-black px-5 py-3 text-base font-black text-white"
              >
                Bekijk prijzen
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <Footer />
    </div>
  );
}
