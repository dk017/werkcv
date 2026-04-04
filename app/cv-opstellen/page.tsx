import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { templateList } from "@/lib/templates/registry";

const topTemplates = templateList.filter((template) =>
  ["professional", "ats", "simple", "modern"].includes(template.id),
);

const structureSteps = [
  {
    title: "1) Contactgegevens + functietitel",
    body: "Begin met naam, telefoon, e-mail, woonplaats en een duidelijke functietitel die aansluit op de vacature. Voeg alleen links toe die echt professioneel relevant zijn, zoals LinkedIn.",
  },
  {
    title: "2) Korte profieltekst (3-4 zinnen)",
    body: "Vat samen wie je bent, welke ervaring je meebrengt en welke waarde je toevoegt. Schrijf vacaturegericht en verwerk kernwoorden op een natuurlijke manier.",
  },
  {
    title: "3) Werkervaring in omgekeerd chronologische volgorde",
    body: "Start met je meest recente functie. Zet per rol 3 tot 6 bullets met actie, context en resultaat. Vermijd alleen taakomschrijvingen.",
  },
  {
    title: "4) Opleiding en relevante cursussen",
    body: "Noem opleiding, instelling en periode. Voeg alleen trainingen en certificaten toe die helpen voor deze functie.",
  },
  {
    title: "5) Vaardigheden en tools",
    body: "Combineer harde vaardigheden (software, methodes, talen) met soft skills die je kunt onderbouwen in ervaring of projecten.",
  },
  {
    title: "6) Eventuele extra secties",
    body: "Voeg alleen nevenactiviteiten, vrijwilligerswerk, projecten of certificeringen toe als ze bijdragen aan je geschiktheid voor de rol.",
  },
];

const roleVariants = [
  {
    title: "Starter opstellen",
    bullets: [
      "Plaats profieltekst en vaardigheden hoog op de pagina.",
      "Gebruik stages, bijbanen en projecten als bewijs.",
      "Houd het meestal op 1 pagina met focus op potentie.",
    ],
  },
  {
    title: "Medior/senior opstellen",
    bullets: [
      "Leg nadruk op recente functies en meetbare impact.",
      "Gebruik 1 tot 2 pagina's, met selectie op relevantie.",
      "Zet leiderschap, scope en verbeterresultaten expliciet neer.",
    ],
  },
  {
    title: "Carriere switch opstellen",
    bullets: [
      "Begin met overdraagbare skills in profieltekst.",
      "Gebruik skills-sectie en projecten om brug naar nieuwe rol te maken.",
      "Laat oude ervaring alleen staan als die direct relevant is.",
    ],
  },
];

const sectionExamples = [
  {
    title: "Profieltekst (goed opgesteld)",
    text: "Resultaatgerichte administratief medewerker met 5 jaar ervaring in dossierbeheer, facturatie en procesoptimalisatie. Verminderde correcties in maandafsluitingen met 28% door extra controlepunten in te voeren. Ik combineer nauwkeurigheid met duidelijke communicatie richting finance en operations.",
  },
  {
    title: "Werkervaring bullet (goed opgesteld)",
    text: "Factuurverwerking gestandaardiseerd met een controleworkflow, waardoor herstelwerk in de maandafsluiting met 30% daalde.",
  },
  {
    title: "Vaardigheden (goed opgesteld)",
    text: "Excel (gevorderd), Office 365, AFAS, rapportage, kwaliteitscontrole, prioriteiten stellen, stakeholdercommunicatie.",
  },
];

const mistakes = [
  {
    title: "Fout: cv opstellen als lange tekst zonder blokken",
    fix: "Fix: gebruik vaste secties met duidelijke koppen en witruimte. Recruiters scannen snel; structuur wint.",
  },
  {
    title: "Fout: alles opnemen zonder selectie",
    fix: "Fix: laat alleen ervaring en skills staan die relevant zijn voor de vacature waarop je nu solliciteert.",
  },
  {
    title: "Fout: werkervaring zonder resultaten",
    fix: "Fix: herschrijf per rol naar actie + resultaat + context. Waar mogelijk met cijfers.",
  },
  {
    title: "Fout: opmaak die ATS lastig leest",
    fix: "Fix: vermijd te veel grafische elementen, hou sectienamen standaard en lever als PDF aan.",
  },
];

const atsChecklist = [
  "Gebruik herkenbare sectietitels zoals Werkervaring, Opleiding, Vaardigheden.",
  "Gebruik vacaturetaal in functietitel, profieltekst en werkervaring.",
  "Vermijd overmatig grafische elementen die parsing kunnen verstoren.",
  "Controleer op consistente datumnotatie en heldere volgorde.",
  "Exporteer als PDF zodat opmaak stabiel blijft.",
];

const faqs = [
  {
    question: "Wat betekent een cv goed opstellen?",
    answer:
      "Dat je informatie logisch ordent zodat recruiter en ATS in seconden begrijpen wat je kunt. Het gaat om volgorde, selectie en leesbaarheid, niet alleen om design.",
  },
  {
    question: "Wat is de beste volgorde voor een cv?",
    answer:
      "Voor de meeste sollicitaties werkt: contactgegevens, profieltekst, werkervaring, opleiding, vaardigheden en daarna optionele secties zoals certificaten of vrijwilligerswerk.",
  },
  {
    question: "Hoe stel ik een cv op zonder veel werkervaring?",
    answer:
      "Gebruik een sterke profieltekst, zet relevante vaardigheden vroeg in je CV en gebruik stages, projecten of vrijwilligerswerk als bewijs van inzet en resultaat.",
  },
  {
    question: "Moet ik mijn cv per vacature opnieuw opstellen?",
    answer:
      "Ja, meestal wel. Pas functietitel, profieltekst en prioriteit in werkervaring aan op de vacature. Dat verhoogt je match en je kans op reactie.",
  },
  {
    question: "Is 1 pagina altijd beter dan 2 pagina's?",
    answer:
      "Niet altijd. Starters kunnen vaak op 1 pagina blijven, ervaren kandidaten mogen naar 2 pagina's als alle informatie relevant en scanbaar blijft.",
  },
];

const sources = [
  {
    label: "werk.nl - Cv maken (onderdelen, volgorde, PDF-tip)",
    href: "https://www.werk.nl/werkzoekenden/solliciteren/tips/cv/",
  },
  {
    label: "UWV Inspiratie - Dit willen werkgevers lezen op je cv",
    href: "https://inspiratie.uwv.nl/loopbaan/dit-willen-werkgevers-lezen-op-je-cv-dukke-geeft-tips",
  },
  {
    label: "Indeed NL - Hoe maak je een cv",
    href: "https://nl.indeed.com/carrieregids/cv-motivatiebrief/hoe-maak-je-een-cv",
  },
  {
    label: "Indeed Support - ATS-vriendelijke opmaak (geen zware grafische opmaak)",
    href: "https://support.indeed.com/hc/nl/articles/11314976176141-Veelgestelde-vragen-Een-cv-bestand-aanmaken-uploaden-en-beheren",
  },
];

export const metadata: Metadata = {
  title: "CV Opstellen - Juiste Structuur, Volgorde en Voorbeelden | WerkCV",
  description:
    "CV opstellen in 2026? Gebruik de juiste volgorde, structuurvarianten en voorbeelden per sectie. Bouw direct in de editor en betaal alleen bij download.",
  keywords: [
    "cv opstellen",
    "opstellen cv",
    "opstellen van een cv",
    "opstelling cv",
    "cv opstellen voorbeeld",
    "hoe cv opstellen",
    "cv structuur",
    "curriculum vitae opstellen",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-opstellen",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-opstellen",
      "x-default": "https://werkcv.nl/cv-opstellen",
    },
  },
};

export default function CvOpstellenPage() {
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
        name: "CV Opstellen",
        item: "https://werkcv.nl/cv-opstellen",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "CV opstellen in 6 onderdelen",
    description: "Praktische structuur om een CV logisch en recruiter-proof op te stellen.",
    totalTime: "PT40M",
    step: structureSteps.map((step) => ({
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
              Structuur-intentie: CV opstellen
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV opstellen met de juiste volgorde en inhoud per sectie
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Veel kandidaten weten wat ze willen vertellen, maar niet hoe ze hun CV logisch moeten opstellen. Op deze pagina krijg je een duidelijk opbouwmodel, voorbeelden per sectie en
              varianten voor starter, medior en carriere switch. Zo zet je snel een CV neer dat zowel recruiters als ATS-systemen goed kunnen lezen.
            </p>
            <p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-slate-600">
              Deze pagina bezit dus vooral de structuur- en volgorde-intentie. Voor
              de bredere route met ook templatekeuze, gratis starten en andere sub-intents
              ga je terug naar{" "}
              <Link
                href="/cv-maken"
                className="font-black text-black underline decoration-2 underline-offset-4"
              >
                CV maken
              </Link>
              .
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Stel je CV direct op
              </Link>
              <Link
                href="/cv-opmaak-voorbeeld"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk cv opmaak voorbeelden
              </Link>
              <Link
                href="/cv-maken"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Naar complete CV gids
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Volgorde + sectie-opbouw",
                "Voorbeelden en foutcorrecties",
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
            <h2 className="text-xl font-black text-black">Snelle check voor een goed opgesteld CV</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <li>
                <strong className="text-black">Duidelijke secties:</strong> profiel, werkervaring, opleiding, vaardigheden.
              </li>
              <li>
                <strong className="text-black">Logische volgorde:</strong> meest relevante info bovenaan.
              </li>
              <li>
                <strong className="text-black">Korte bullets:</strong> geen lange lappen tekst.
              </li>
              <li>
                <strong className="text-black">Vacaturematch:</strong> termen en prioriteiten sluiten aan op de rol.
              </li>
            </ul>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/tools/cv-keywords"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Controleer je vacaturematch met de keywords tool
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Structuurmodel
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            CV opstellen in 6 vaste onderdelen
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {structureSteps.map((step) => (
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

        <section className="mb-14 grid gap-6 md:grid-cols-3">
          {roleVariants.map((variant) => (
            <article
              key={variant.title}
              className="border-4 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            >
              <h3 className="text-xl font-black text-black">{variant.title}</h3>
              <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
                {variant.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Voorbeeldblokken
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Zo ziet een goed opgesteld CV eruit in de praktijk
          </h2>
          <div className="mt-6 space-y-5">
            {sectionExamples.map((item) => (
              <article
                key={item.title}
                className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-black text-black">{item.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{item.text}</p>
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
              href="/tools/werkervaring-bullets"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              Maak werkervaring bullets
            </Link>
            <Link
              href="/vaardigheden-cv-voorbeelden"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              Bekijk vaardigheden voorbeelden
            </Link>
          </div>
        </section>

        <section className="mb-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                Aanbevolen templates
              </p>
              <h2 className="text-3xl font-black text-black">
                Kies een layout die je opstelling ondersteunt
              </h2>
            </div>
            <Link href="/templates" className="text-sm font-black text-black underline decoration-2 underline-offset-4">
              Bekijk alle templates
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {topTemplates.map((template) => (
              <article
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
                <div className="mt-auto pt-5">
                  <Link
                    href="/editor"
                    className="inline-block border-2 border-black bg-yellow-400 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-black"
                  >
                    Start in editor
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Fouten en fixes
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Veelgemaakte fouten bij CV opstellen
            </h2>
            <div className="mt-4 space-y-3">
              {mistakes.map((item) => (
                <div key={item.title}>
                  <p className="text-sm font-bold leading-relaxed text-slate-100">{item.title}</p>
                  <p className="text-sm font-medium leading-relaxed text-slate-300">{item.fix}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              ATS-check
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              ATS-vriendelijke opstelling checklist
            </h2>
            <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
              {atsChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-2 border-black pt-4">
              <Link
                href="/ats-cv-template"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Vergelijk met ATS CV template
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Bronnen en checkdatum
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Onderbouwde richtlijnen (gecheckt op 8 maart 2026)
          </h2>
          <div className="mt-6 space-y-3">
            {sources.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="block border-2 border-black bg-white p-4 text-sm font-medium text-slate-700 transition-colors hover:bg-yellow-100"
              >
                <span className="font-black text-black">{source.label}</span>
                <span className="mt-1 block break-all">{source.href}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Verwante intenties
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Pagina&apos;s die dicht op CV opstellen zitten
            </h2>
            <div className="mt-4 space-y-4">
              {[
                {
                  href: "/cv-maken",
                  title: "CV maken",
                  body: "De bredere gids als je behalve structuur ook hulp zoekt bij profieltekst, bullets en templatekeuze.",
                },
                {
                  href: "/cv-aanmaken",
                  title: "CV aanmaken",
                  body: "Voor zoekers die eerst snel een eerste basisversie willen opzetten en daarna pas willen aanscherpen.",
                },
                {
                  href: "/curriculum-vitae-maken",
                  title: "Curriculum vitae maken",
                  body: "Formelere variant voor bezoekers die zakelijker taalgebruik gebruiken maar dezelfde opbouw nodig hebben.",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block border-2 border-black bg-[#FFFEF0] p-4 transition-colors hover:bg-yellow-100"
                >
                  <p className="text-sm font-black text-black">{item.title}</p>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">
                    {item.body}
                  </p>
                </Link>
              ))}
            </div>
          </div>
          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Prijs- en startintentie
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Routes voor gratis starten of direct bouwen
            </h2>
            <div className="mt-4 space-y-4">
              {[
                {
                  href: "/gratis-cv-maken",
                  title: "Gratis CV maken",
                  body: "Legt helder uit hoe gratis starten werkt en wanneer de eenmalige betaling pas in beeld komt.",
                },
                {
                  href: "/online-cv-maken",
                  title: "Online CV maken",
                  body: "Logische vervolgroute voor bezoekers die structuur zoeken, maar liever meteen online in een builder werken.",
                },
                {
                  href: "/prijzen",
                  title: "Prijzen",
                  body: "Bekijk het betaalmodel als je wilt snappen hoe gratis bewerken en betaald downloaden samenkomen.",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block border-2 border-black bg-[#FFFEF0] p-4 transition-colors hover:bg-yellow-100"
                >
                  <p className="text-sm font-black text-black">{item.title}</p>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">
                    {item.body}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over CV opstellen
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
                Klaar om je CV echt goed op te stellen?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Zet de juiste structuur direct om naar je eigen CV
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Gebruik deze opbouw, pas hem aan op je vacature en rond af in de editor zonder opmaakgedoe.
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
