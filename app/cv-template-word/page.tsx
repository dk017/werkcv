import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import SectionIntentLinks from "@/components/seo/SectionIntentLinks";
import { getTemplateConfig } from "@/lib/templates/registry";

const simpleTemplate = getTemplateConfig("simple");

const wordPainPoints = [
  "Opmaak verschuift zodra je iets kleins aanpast.",
  "Kolommen en tabellen worden onrustig op mobiel of PDF.",
  "Je bent meer tijd kwijt aan layout dan aan inhoud.",
  "Versiebeheer wordt chaos bij meerdere sollicitaties.",
];

const betterFlow = [
  "Kies een template dat past bij je functie en ervaring.",
  "Vul profieltekst, werkervaring en vaardigheden in met focus op resultaten.",
  "Pas per vacature je keywords aan zonder opnieuw te ontwerpen.",
  "Download alleen als je tevreden bent met de eindversie.",
];

const faqs = [
  {
    question: "Is een cv template in Word nog wel slim in 2026?",
    answer:
      "Word kan werken, maar kost vaak veel tijd door opmaakwerk en versieproblemen. Voor de meeste sollicitanten is een online template sneller en consistenter, zeker als je meerdere varianten van je CV nodig hebt.",
  },
  {
    question: "Kan ik met WerkCV hetzelfde doen als met een Word-template?",
    answer:
      "Ja, maar sneller. Je kiest direct een professionele layout, vult je gegevens in en houdt alles centraal. Je hoeft niet handmatig marges, lettertypes of tabellen te repareren.",
  },
  {
    question: "Is een Word-cv minder ATS-vriendelijk?",
    answer:
      "Dat hangt af van de opmaak. Veel Word-templates gebruiken tabellen of creatieve elementen die parsers kunnen verstoren. Een rustige ATS-vriendelijke template vermindert dat risico.",
  },
  {
    question: "Kan ik gratis starten en later pas beslissen?",
    answer:
      "Ja. Je kunt gratis beginnen, templates vergelijken en je CV opbouwen. Je betaalt pas op het moment dat je je PDF wilt downloaden.",
  },
];

const wordIntentLinks = [
  {
    href: "/cv-maken-in-word",
    label: "CV maken in Word-intent omzetten naar een snellere online flow",
    description:
      "Lees eerst wanneer Word nog logisch is en wanneer een online editor je minder opmaakstress geeft.",
  },
  {
    href: "/cv-maken-template",
    label: "CV maken met een template in plaats van losse Word-opmaak",
    description:
      "Werk vanuit een vaste layout zodat je sneller per vacature kunt aanpassen.",
  },
  {
    href: "/gratis-cv-template",
    label: "Gratis CV template kiezen zonder direct vast te zitten aan Word",
    description:
      "Vergelijk meerdere gratis stijlen voordat je beslist welke layout het best past.",
  },
  {
    href: "/cv-maken-pdf",
    label: "CV maken en als stabiele PDF versturen in plaats van als .docx",
    description:
      "Gebruik een eindformaat dat er op elk scherm hetzelfde uitziet wanneer je solliciteert.",
  },
];

export const metadata: Metadata = {
  title: "CV Template Word - Beter Alternatief Voor Word Sjablonen | WerkCV",
  description:
    "Zoek je een CV template voor Word? Vergelijk Word-sjablonen met een sneller online alternatief. Start gratis met een professioneel CV template en download pas als je tevreden bent.",
  keywords: [
    "cv template word",
    "cv sjabloon word",
    "word cv template",
    "cv maken in word",
    "professioneel cv word",
    "gratis cv template word",
    "ats cv word",
    "alternatief voor word cv",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-template-word",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-template-word",
      "x-default": "https://werkcv.nl/cv-template-word",
    },
  },
};

export default function CvTemplateWordPage() {
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
        name: "CV Template Word",
        item: "https://werkcv.nl/cv-template-word",
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
            href="/templates"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            Bekijk Word-alternatieven
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-14">
        <section className="mb-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-slate-700">
              Migratie-intent
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV template Word gezocht? Kies een sneller alternatief zonder opmaakstress
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Veel sollicitanten starten in Word omdat het bekend voelt. In praktijk gaat veel tijd verloren aan opmaak, versies en kleine layoutfouten. Met WerkCV kies je direct een professioneel
              template, werk je sneller per vacature en houd je focus op wat echt telt: inhoud die uitnodigt voor een gesprek.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/templates"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Bekijk CV templates
              </Link>
              <Link
                href="/cv-aanmaken"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                CV aanmaken zonder Word
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Minder opmaakwerk",
                "Sneller aanpassen per vacature",
                "Gratis starten, later downloaden",
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
            <h2 className="text-xl font-black text-black">Waarom Word vaak vertraagt</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              {wordPainPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/cv-tips/cv-maken-in-word"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Lees ook: uitgebreide gids over CV maken in Word
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Aanbevolen start
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Template voor Word-gebruikers die sneller willen werken
            </h2>
            <div className="mt-5 border-4 border-black bg-[#FFFEF0] p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
                Praktische keuze
              </p>
              <h3 className="mt-2 text-2xl font-black text-black">{simpleTemplate.nameDutch}</h3>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                {simpleTemplate.description}
              </p>
              <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
                <li>Rustige layout die vertrouwd voelt voor klassieke Word-gebruikers.</li>
                <li>Makkelijk aan te passen zonder dat de opmaak instort.</li>
                <li>Goede basis voor zowel starters als ervaren kandidaten.</li>
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/cv-maken-template"
                  className="border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black"
                >
                  Bouw je CV met een template
                </Link>
                <Link
                  href="/modern-cv-template"
                  className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
                >
                  Of kies modern
                </Link>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Sneller proces
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Van Word naar een beter CV in 4 stappen
            </h2>
            <div className="mt-6 space-y-4">
              {betterFlow.map((item, index) => (
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
                  Schrijf sneller een sterke opening in plaats van tijd verliezen op layout.
                </p>
              </Link>
              <Link
                href="/tools/werkervaring-bullets"
                className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors hover:bg-yellow-100"
              >
                <p className="text-sm font-black text-black">Werkervaring bullets</p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                  Zet taken om naar resultaatgerichte bullets die recruiters direct snappen.
                </p>
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Belangrijk verschil
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Word is een documenttool, geen sollicitatieflow
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-200">
              Met Word ontwerp je handmatig en kopieer je vaak oude versies. Met WerkCV werk je in een vaste flow: template kiezen, inhoud optimaliseren, per vacature aanpassen en klaarzetten voor
              download. Dat scheelt tijd en voorkomt fouten.
            </p>
          </div>
          <div className="border-4 border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Van Word-intentie naar een stabieler sollicitatieproces
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Open eerst de route die je Word-werk echt vervangt
            </h2>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
              Wie zoekt op een CV template voor Word wil meestal niet per se een .docx-bestand, maar een snelle manier om een nette versie te bouwen, te bewaren en als PDF te versturen.
            </p>
            <SectionIntentLinks links={wordIntentLinks} locale="nl" />
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over CV templates in Word
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
                Klaar om Word te vervangen?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Start nu met een professioneel template in de editor
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Houd je focus op inhoud, niet op opmaakfixes. Begin gratis en download pas wanneer je CV klaar is voor versturen.
              </p>
            </div>
            <Link
              href="/templates"
              className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
            >
              Bekijk templates
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
