import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getTemplateConfig } from "@/lib/templates/registry";

const modernTemplate = getTemplateConfig("modern");

const sampleBullets = [
  "Leidde een redesign van de e-mailfunnel waardoor activatie met 18% steeg in drie maanden.",
  "Werkte met design, sales en product samen om campagnes sneller live te krijgen.",
  "Vertaalde data-inzichten naar duidelijke verbeteringen in content, positioning en conversie.",
];

const fitCases = [
  "Marketing, growth en contentrollen.",
  "Product, tech en digitale functies met moderne uitstraling.",
  "Sales- en klantgerichte functies waar energie en professionaliteit samenkomen.",
  "Starters en medior kandidaten die frisser willen ogen dan klassiek, maar niet creatief-extreem.",
];

const faqs = [
  {
    question: "Wat is een modern cv voorbeeld?",
    answer:
      "Een modern CV voorbeeld laat zien hoe een eigentijdse, rustige layout eruitziet met actuele secties, sterke witruimte en een professionele uitstraling.",
  },
  {
    question: "Voor welke functies past een modern CV voorbeeld het best?",
    answer:
      "Vooral voor marketing, sales, tech, product en andere moderne kantoorfuncties waar een frisse maar geloofwaardige presentatie goed werkt.",
  },
  {
    question: "Is een modern CV voorbeeld nog steeds ATS-vriendelijk?",
    answer:
      "Ja, zolang de structuur helder blijft en je geen overmatig design gebruikt. Een modern uiterlijk hoeft ATS-veiligheid niet in de weg te zitten.",
  },
  {
    question: "Kan ik dit moderne voorbeeld direct gebruiken?",
    answer:
      "Ja. Je kunt de moderne template openen in de editor, je eigen inhoud invullen en daarna pas beslissen of je de PDF wilt downloaden.",
  },
];

export const metadata: Metadata = {
  title: "Modern CV Voorbeeld - Voorbeeld van een Strakke Moderne Layout | WerkCV.nl",
  description:
    "Bekijk een modern CV voorbeeld voor marketing, sales, tech en andere moderne functies. Zie hoe een frisse, professionele layout eruitziet en start direct in de editor.",
  keywords: [
    "modern cv voorbeeld",
    "voorbeeld modern cv",
    "moderne cv voorbeeld",
    "modern cv maken",
    "fris cv voorbeeld",
    "modern cv layout",
  ],
  alternates: {
    canonical: "https://werkcv.nl/modern-cv-voorbeeld",
    languages: {
      "nl-NL": "https://werkcv.nl/modern-cv-voorbeeld",
      "x-default": "https://werkcv.nl/modern-cv-voorbeeld",
    },
  },
};

export default function ModernCvVoorbeeldPage() {
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
        name: "Modern CV Voorbeeld",
        item: "https://werkcv.nl/modern-cv-voorbeeld",
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
              Voorbeeld-intentie
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Modern CV voorbeeld voor een frisse, professionele eerste indruk
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Een modern CV voorbeeld helpt je inschatten of een frissere layout bij
              jouw rol past. Het doel is niet om opvallend te zijn om het opvallend
              zijn, maar om je inhoud actueel, verzorgd en makkelijk scanbaar te
              presenteren.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/modern-cv-template"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Gebruik de moderne template
              </Link>
              <Link
                href="/editor"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Start direct in editor
              </Link>
            </div>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Wanneer modern logisch is</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              {fitCases.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Voorbeeldopbouw
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Zo kan een modern CV eruitzien
          </h2>
          <div className="mt-6 border-4 border-black bg-[#FFFEF0] p-6">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-600">
              Template
            </p>
            <h3 className="mt-2 text-2xl font-black text-black">{modernTemplate.nameDutch}</h3>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              <strong className="text-black">Profielvoorbeeld:</strong> Allround growth
              marketeer met 4 jaar ervaring in performance, content en lifecycle.
              Combineert analytisch denken met sterke executie en weet campagnes snel
              te vertalen naar meetbare omzet- en activatiegroei.
            </p>
            <div className="mt-5">
              <p className="text-sm font-black text-black">Werkervaring</p>
              <ul className="mt-3 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
                {sampleBullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
            <p className="mt-5 text-sm font-medium leading-relaxed text-slate-700">
              <strong className="text-black">Vaardigheden:</strong> Growth marketing,
              CRM, SQL basis, A/B testing, stakeholdermanagement, contentstrategie.
            </p>
          </div>
        </section>

        <section className="mb-14 grid gap-4 md:grid-cols-3">
          {[
            {
              href: "/modern-cv-template",
              title: "Modern CV template",
              body: "Ga van voorbeeld naar je eigen moderne versie.",
            },
            {
              href: "/cv-maken-template",
              title: "CV maken template",
              body: "Vergelijk moderne layouts met rustigere template-opties.",
            },
            {
              href: "/cv-opmaken",
              title: "CV opmaken",
              body: "Verfijn de layout verder voordat je de PDF vastzet.",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors hover:bg-yellow-100"
            >
              <p className="text-sm font-black text-black">{item.title}</p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                {item.body}
              </p>
            </Link>
          ))}
        </section>

        <section className="mb-14">
          <h2 className="text-3xl font-black text-black">Veelgestelde vragen over moderne CV voorbeelden</h2>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-black text-black">{faq.question}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </div>
  );
}
