import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getTemplateConfig } from "@/lib/templates/registry";

const professionalTemplate = getTemplateConfig("professional");

const professionalUseCases = [
  "Administratieve en office functies waar structuur en betrouwbaarheid tellen.",
  "Finance, control en zakelijke rollen waar een rustige presentatie vertrouwen geeft.",
  "HR, operations en supportfuncties waar overzicht belangrijker is dan visueel experiment.",
  "Medior en senior kandidaten die professioneel willen overkomen zonder stijf of ouderwets te lijken.",
];

const professionalChecklist = [
  "Gebruik een scherpe profieltekst van 3-4 regels met rol en meerwaarde.",
  "Zet werkervaring in omgekeerd chronologische volgorde met meetbare resultaten.",
  "Houd vaardigheden compact en relevant voor de vacature.",
  "Gebruik een rustige template die in 10 seconden scanbaar blijft.",
];

const faqs = [
  {
    question: "Wat is een professioneel cv template?",
    answer:
      "Een professioneel CV template is een strak en overzichtelijk ontwerp dat betrouwbaarheid uitstraalt. Het benadrukt inhoud en resultaten zonder drukke vormgeving die afleidt.",
  },
  {
    question: "Voor welke functies is een professioneel cv het beste?",
    answer:
      "Dit type template werkt sterk voor zakelijke, administratieve, financiële, HR en operationele functies. Het is een veilige keuze voor rollen waar helderheid en structuur zwaar wegen.",
  },
  {
    question: "Is professioneel hetzelfde als saai?",
    answer:
      "Nee. Professioneel betekent dat je CV verzorgd, modern en rustig oogt, zodat recruiters snel de juiste informatie vinden. Het gaat om duidelijke hiërarchie, niet om overdesign.",
  },
  {
    question: "Kan ik een professioneel cv template gratis gebruiken?",
    answer:
      "Ja. Je kunt gratis starten in de editor, templates vergelijken en je CV opbouwen. Je betaalt alleen wanneer je je definitieve PDF wilt downloaden.",
  },
];

export const metadata: Metadata = {
  title: "Professioneel CV Template - Zakelijk en Strak CV Ontwerp | WerkCV.nl",
  description:
    "Zoek je een professioneel CV template? Kies een zakelijke, strakke layout voor administratie, finance, HR en operations. Start gratis in de editor en download pas als je tevreden bent.",
  keywords: [
    "professioneel cv template",
    "zakelijk cv template",
    "strak cv template",
    "professioneel cv maken",
    "cv template professioneel",
    "net cv template",
    "cv layout zakelijk",
    "cv template voor kantoorfunctie",
  ],
  alternates: {
    canonical: "https://werkcv.nl/professioneel-cv-template",
    languages: {
      "nl-NL": "https://werkcv.nl/professioneel-cv-template",
      "x-default": "https://werkcv.nl/professioneel-cv-template",
    },
  },
};

export default function ProfessioneelCvTemplatePage() {
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
        name: "Professioneel CV Template",
        item: "https://werkcv.nl/professioneel-cv-template",
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
              Zakelijke intentie
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Professioneel CV template dat rustig oogt en direct vertrouwen wekt
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Voor veel functies is een professioneel CV de sterkste keuze: strak, overzichtelijk en geloofwaardig. De {professionalTemplate.nameDutch.toLowerCase()}e template van WerkCV helpt je
              om inhoud en presentatie goed te balanceren, zodat recruiters snel zien waarom jij geschikt bent.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Start met professioneel template
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
                "Zakelijke uitstraling",
                "Rustige structuur",
                "Gratis starten in editor",
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
            <h2 className="text-xl font-black text-black">Waarom professioneel vaak het hoogste vertrouwen geeft</h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              Recruiters beoordelen eerst op leesbaarheid en relevantie. Een professioneel template maakt die eerste scan makkelijker: duidelijke koppen, consistente secties en geen visuele ruis
              die afleidt van je prestaties.
            </p>
            <div className="mt-5 border-t-4 border-black pt-5">
              <Link
                href="/modern-cv-template"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Twijfel je tussen strak en modern? Vergelijk met modern CV template
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Aanbevolen keuze
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Beste professionele template op WerkCV
            </h2>
            <div className="mt-5 border-4 border-black bg-[#FFFEF0] p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
                Favoriet
              </p>
              <h3 className="mt-2 text-2xl font-black text-black">{professionalTemplate.nameDutch}</h3>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                {professionalTemplate.description}
              </p>
              <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
                {professionalUseCases.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/editor"
                  className="border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black"
                >
                  Gebruik deze template
                </Link>
                <Link
                  href="/cv-tips/cv-template-kiezen"
                  className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
                >
                  Lees keuzehulp
                </Link>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Inhoud-checklist
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Zo maak je je professionele CV sterker
            </h2>
            <div className="mt-6 space-y-4">
              {professionalChecklist.map((item, index) => (
                <div key={item} className="flex gap-4">
                  <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center border-3 border-black bg-white text-sm font-black text-black"
                    style={{ borderWidth: "3px" }}
                  >
                    {index + 1}
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-slate-700">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              <Link
                href="/tools/profieltekst-generator"
                className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors hover:bg-yellow-100"
              >
                <p className="text-sm font-black text-black">Profieltekst generator</p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                  Schrijf een zakelijke opening die direct relevantie en richting laat zien.
                </p>
              </Link>
              <Link
                href="/tools/werkervaring-bullets"
                className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors hover:bg-yellow-100"
              >
                <p className="text-sm font-black text-black">Werkervaring bullets</p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                  Zet je ervaring om in resultaatgedreven bullets die professioneel overkomen.
                </p>
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Veelgemaakte fout
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Te veel nadruk op design, te weinig op relevantie
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-200">
              Ook bij een professioneel template blijft inhoud doorslaggevend. Een nette layout zonder concrete resultaten en vacaturegerichte taal overtuigt zelden. Gebruik design als drager, niet
              als vervanging van inhoud.
            </p>
          </div>
          <div className="border-4 border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Relevante vervolgstappen
            </p>
            <div className="mt-4 space-y-4">
              {[
                {
                  href: "/cv-samenvatting-voorbeelden",
                  title: "CV samenvatting voorbeelden",
                  body: "Gebruik sterke profieltekstvoorbeelden om je professionele opening scherper te maken.",
                },
                {
                  href: "/cv-template-administratief-medewerker",
                  title: "CV template administratief medewerker",
                  body: "Specifieke template- en inhoudsaanpak voor administratieve en backoffice vacatures.",
                },
                {
                  href: "/cv-template-verpleegkundige",
                  title: "CV template verpleegkundige",
                  body: "Specifieke BIG-proof aanpak met zorggerichte profielteksten, skills en bullets.",
                },
                {
                  href: "/cv-template-verkoopmedewerker",
                  title: "CV template verkoopmedewerker",
                  body: "Commerciële retail-aanpak met concrete KPI-bullets en scanbare profielteksten.",
                },
                {
                  href: "/cv-template-marketing-medewerker",
                  title: "CV template marketing medewerker",
                  body: "Datagedreven marketing-aanpak met campagne-KPI's, profielteksten en ATS-termen.",
                },
                {
                  href: "/cv-template-office-manager",
                  title: "CV template office manager",
                  body: "Structuur- en operationsgerichte aanpak voor planning, leveranciers en teamondersteuning.",
                },
                {
                  href: "/gratis-cv-template",
                  title: "Gratis CV template",
                  body: "Vergelijk professionele templates met andere stijlen voordat je definitief kiest.",
                },
                {
                  href: "/cv-template-word",
                  title: "CV template Word alternatief",
                  body: "Werk je nu in Word? Stap over op een strakker proces zonder opmaakstress.",
                },
                {
                  href: "/ats-cv-template",
                  title: "ATS CV template",
                  body: "Wil je maximale zekerheid op ATS-scans? Vergelijk met de ATS-veilige optie.",
                },
                {
                  href: "/prijzen",
                  title: "Prijzen",
                  body: "Bekijk het model: gratis bouwen, eenmalig betalen bij download.",
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
            Veelgestelde vragen over professionele CV templates
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
                Klaar om te solliciteren?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Bouw nu je professionele CV in de editor
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Kies je template, verbeter je inhoud en download pas wanneer je CV klaar is om te versturen.
              </p>
            </div>
            <Link
              href="/editor"
              className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
            >
              Start direct in editor
            </Link>
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
