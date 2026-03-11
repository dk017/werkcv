import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getTemplateConfig } from "@/lib/templates/registry";

const modernTemplate = getTemplateConfig("modern");

const idealFor = [
  "Marketing, growth en contentrollen waar een frisse eerste indruk helpt.",
  "Sales- en klantgerichte functies waar je professionaliteit en energie wilt combineren.",
  "Tech- en digitale functies die modern mogen ogen zonder onrustig te worden.",
  "Starters en medior kandidaten die niet te klassiek willen overkomen.",
];

const modernSignals = [
  "Strakke witruimte en heldere visuele hiërarchie.",
  "Professionele uitstraling zonder ouderwetse look.",
  "Goede balans tussen design en leesbaarheid.",
  "Geschikt voor recruiters die snel willen scannen.",
];

const faqs = [
  {
    question: "Wat is een modern cv template?",
    answer:
      "Een modern cv template is een eigentijdse layout met sterke hiërarchie, frisse typografie en een strakke uitstraling. Het doel is dat je CV direct professioneel oogt zonder rommelig of overdreven creatief te worden.",
  },
  {
    question: "Voor welke functies past een modern cv het best?",
    answer:
      "Een modern cv past vooral goed bij marketing, sales, tech, product, operations en veel kantoorfuncties. Het is vaak de beste middenweg tussen een klassiek CV en een creatief ontwerp.",
  },
  {
    question: "Is een modern cv template nog steeds ATS-vriendelijk?",
    answer:
      "Ja, zolang de structuur helder blijft. Een modern template werkt prima als de secties duidelijk zijn, je geen onnodige design-elementen gebruikt en je inhoud goed scanbaar blijft. Voor maximale veiligheid kun je ook de ATS-pagina bekijken.",
  },
  {
    question: "Kan ik een modern cv template gratis proberen?",
    answer:
      "Ja. Je kunt de moderne template gratis openen en invullen in de editor. Je betaalt pas als je je CV als PDF wilt downloaden.",
  },
];

export const metadata: Metadata = {
  title: "Modern CV Template - Strak en Professioneel CV Ontwerp | WerkCV.nl",
  description:
    "Zoek je een modern CV template? Kies een strakke, professionele layout voor marketing, sales, tech en zakelijke functies. Begin gratis in de editor en download pas als je tevreden bent.",
  keywords: [
    "modern cv template",
    "modern cv sjabloon",
    "strak cv template",
    "professioneel modern cv",
    "modern cv ontwerp",
    "eigentijds cv template",
    "cv template modern",
    "modern cv maken",
  ],
  alternates: {
    canonical: "https://werkcv.nl/modern-cv-template",
    languages: {
      "nl-NL": "https://werkcv.nl/modern-cv-template",
      "x-default": "https://werkcv.nl/modern-cv-template",
    },
  },
};

export default function ModernCvTemplatePage() {
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
        name: "Modern CV Template",
        item: "https://werkcv.nl/modern-cv-template",
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
              Design-intent
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Modern CV template voor een sterke eerste indruk zonder overdreven design
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Een modern CV template moet direct professioneel ogen, maar nog steeds rustig genoeg blijven om snel gelezen te worden. De {modernTemplate.nameDutch.toLowerCase()}e template
              van WerkCV geeft je precies die balans: eigentijds, strak en geschikt voor recruiters die in seconden beslissen of ze verder lezen.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Start met modern template
              </Link>
              <Link
                href="/templates"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Vergelijk layouts
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Strakke uitstraling",
                "Past bij moderne functies",
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
            <h2 className="text-xl font-black text-black">Waarom kiezen voor modern in plaats van klassiek?</h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              Een klassiek CV kan veilig zijn, maar voelt soms generiek of verouderd. Een modern template laat zien dat je verzorgd, actueel en professioneel presenteert. Zeker in rollen waar
              communicatie, tempo of digitale vaardigheden tellen, kan dat de juiste toon zetten.
            </p>
            <div className="mt-5 border-t-4 border-black pt-5">
              <Link
                href="/gratis-cv-template"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Vergelijk ook: gratis CV template opties
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Aanbevolen layout
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              De beste moderne template op WerkCV
            </h2>
            <div className="mt-5 border-4 border-black bg-[#FFFEF0] p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
                Favoriet
              </p>
              <h3 className="mt-2 text-2xl font-black text-black">{modernTemplate.nameDutch}</h3>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                {modernTemplate.description}
              </p>
              <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
                {modernSignals.map((item) => (
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
              Beste use-cases
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Voor deze rollen werkt een modern CV vaak het best
            </h2>
            <div className="mt-6 space-y-4">
              {idealFor.map((item, index) => (
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
                href="/cv-voorbeelden/marketing-en-communicatie/social-media-specialist"
                className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors hover:bg-yellow-100"
              >
                <p className="text-sm font-black text-black">Voorbeeld: social media specialist</p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                  Bekijk een functie waarbij een moderne uitstraling logisch en geloofwaardig is.
                </p>
              </Link>
              <Link
                href="/cv-voorbeelden/technologie-en-ict/software-ontwikkelaar"
                className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors hover:bg-yellow-100"
              >
                <p className="text-sm font-black text-black">Voorbeeld: software ontwikkelaar</p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                  Zie hoe een moderne template goed werkt voor digitale en technische profielen.
                </p>
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Belangrijke nuance
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Modern betekent niet druk of creatief om het creatieve
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-200">
              De beste moderne CV&apos;s voelen strak en actueel, niet overdesigned. Zodra een template te veel kleurblokken, iconen of onrustige secties gebruikt, verlies je leesbaarheid. Kies dus
              modern als stijl, niet als gimmick.
            </p>
          </div>
          <div className="border-4 border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Slimme vervolgstappen
            </p>
            <div className="mt-4 space-y-4">
              {[
                {
                  href: "/tools/profieltekst-generator",
                  title: "Profieltekst generator",
                  body: "Geef je moderne layout een sterke, korte openingssamenvatting die direct overtuigt.",
                },
                {
                  href: "/tools/werkervaring-bullets",
                  title: "Werkervaring bullets",
                  body: "Maak je ervaring scherper zodat de inhoud net zo sterk is als het design.",
                },
                {
                  href: "/cv-template-software-ontwikkelaar",
                  title: "CV template software ontwikkelaar",
                  body: "Bekijk een developer-specifieke pagina met stackopbouw, metrics en ATS-termen.",
                },
                {
                  href: "/cv-template-marketing-medewerker",
                  title: "CV template marketing medewerker",
                  body: "Bekijk een marketing-specifieke pagina met campagne-KPI's, kanalen en ATS-termen.",
                },
                {
                  href: "/cv-template-office-manager",
                  title: "CV template office manager",
                  body: "Bekijk een operations-specifieke pagina met planning, procesregie en stakeholderfocus.",
                },
                {
                  href: "/ats-cv-template",
                  title: "ATS CV template",
                  body: "Twijfel je tussen modern en veilig voor ATS? Vergelijk hier de meer functionele optie.",
                },
                {
                  href: "/prijzen",
                  title: "Prijzen",
                  body: "Bekijk hoe je gratis kunt starten en alleen betaalt wanneer je wilt downloaden.",
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
            Veelgestelde vragen over moderne CV templates
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
                Klaar om te bouwen?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Open de editor en start direct met een modern CV
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Kies je layout, verfijn je profieltekst en werk je bullets bij tot je CV er net zo sterk uitziet als het leest.
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
