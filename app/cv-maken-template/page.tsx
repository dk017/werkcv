import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { templateList } from "@/lib/templates/registry";

const featuredTemplates = templateList.filter((template) =>
  ["professional", "modern", "simple", "ats"].includes(template.id),
);

const templateUseCases: Record<string, string> = {
  professional:
    "Sterke keuze als je een rustige, brede template zoekt voor administratie, finance, support en veel kantoorfuncties.",
  modern:
    "Handig wanneer je CV wat frisser mag ogen voor marketing, sales, product of tech zonder onrustig te worden.",
  simple:
    "Snelste start als je vooral een heldere basis wilt en niet wilt blijven hangen op designkeuzes.",
  ats: "Geschikt wanneer je maximale scanbaarheid en standaardstructuur wilt voor recruiter en ATS.",
};

const selectionSteps = [
  {
    title: "1) Kies eerst op functietype, niet op kleur",
    body: "Een goede CV-template versterkt je rol en sector. Begin daarom bij de vraag welk niveau van formaliteit en rust je nodig hebt.",
  },
  {
    title: "2) Controleer of je inhoud genoeg ruimte krijgt",
    body: "Templates werken pas goed als profieltekst, werkervaring en vaardigheden niet gepropt ogen. Scan je voorbeeldinhoud altijd in de layout.",
  },
  {
    title: "3) Gebruik rustige sectiekoppen en logische volgorde",
    body: "De beste templates maken meteen duidelijk waar profiel, ervaring, opleiding en vaardigheden staan. Dat versnelt de eerste recruiter-scan.",
  },
  {
    title: "4) Vergelijk twee of drie layouts met dezelfde inhoud",
    body: "Door dezelfde tekst in meerdere templates te bekijken zie je snel welke versie het meest professioneel en geloofwaardig overkomt.",
  },
  {
    title: "5) Download pas wanneer de combinatie van inhoud en layout klopt",
    body: "WerkCV laat je eerst gratis vergelijken. Daardoor kies je de template pas op basis van een echte sollicitatieversie, niet op gevoel alleen.",
  },
];

const faqs = [
  {
    question: "Wat is het verschil tussen een cv template en een cv sjabloon?",
    answer:
      "In de praktijk wordt hetzelfde bedoeld: een vaste layout waarmee je sneller een professioneel CV opbouwt. Template wordt iets vaker gebruikt bij online editors.",
  },
  {
    question: "Welke cv template past het best bij de meeste sollicitaties?",
    answer:
      "Voor de meeste Nederlandse functies zijn rustige templates zoals Professioneel, Simpel en ATS de veiligste keuzes. Ze blijven scanbaar en breed inzetbaar.",
  },
  {
    question: "Kan ik een cv template eerst gratis proberen?",
    answer:
      "Ja. Je kunt de templates gratis openen in de editor, je inhoud invullen en layouts vergelijken. Je betaalt alleen wanneer je de definitieve PDF wilt downloaden.",
  },
  {
    question: "Moet een cv template creatief zijn om op te vallen?",
    answer:
      "Niet per se. Voor de meeste sollicitaties werkt duidelijke structuur beter dan opvallend design. Opvallen moet vooral uit je inhoud en relevantie komen.",
  },
];

export const metadata: Metadata = {
  title: "CV Maken Template - Kies de Beste CV Layout voor Jouw Sollicitatie | WerkCV.nl",
  description:
    "Zoek je een CV maken template? Vergelijk rustige, moderne en ATS-vriendelijke layouts, kies de beste template voor jouw rol en start gratis in de editor.",
  keywords: [
    "cv maken template",
    "cv template maken",
    "template cv maken",
    "professionele cv template",
    "cv layout kiezen",
    "cv template online",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-maken-template",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-maken-template",
      "x-default": "https://werkcv.nl/cv-maken-template",
    },
  },
};

export default function CvMakenTemplatePage() {
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
        name: "CV Maken Template",
        item: "https://werkcv.nl/cv-maken-template",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Beste CV template kiezen in 5 stappen",
    description:
      "Praktische stappen om de juiste CV-template te kiezen en direct in de editor te gebruiken.",
    totalTime: "PT20M",
    step: selectionSteps.map((step) => ({
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
              Template-intentie
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV maken template kiezen zonder te verdwalen in te veel layouts
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Wie zoekt op <strong>cv maken template</strong> wil meestal snel een
              goede layout kiezen en daarna verder met de inhoud. Op deze pagina
              helpen we je de beste CV-template selecteren op basis van rol,
              uitstraling en scanbaarheid, zodat je daarna direct kunt starten in
              de editor.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/templates"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Bekijk alle templates
              </Link>
              <Link
                href="/editor"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Start direct met invullen
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Rustige en moderne layouts",
                "Vergelijk op echte inhoud",
                "Eenmalig betalen bij download",
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
            <h2 className="text-xl font-black text-black">
              Wat maakt een goede CV-template?
            </h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <li>
                <strong className="text-black">Scanbaar:</strong> secties en koppen
                zijn direct duidelijk.
              </li>
              <li>
                <strong className="text-black">Passend:</strong> de uitstraling klopt
                met je rol en sector.
              </li>
              <li>
                <strong className="text-black">Rustig:</strong> inhoud krijgt ruimte
                zonder designruis.
              </li>
              <li>
                <strong className="text-black">Praktisch:</strong> je kunt snel
                vergelijken en door naar de definitieve versie.
              </li>
            </ul>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/cv-maken-sjabloon"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Liever zoeken op sjabloon? Bekijk cv maken sjabloon
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          {featuredTemplates.map((template) => (
            <article
              key={template.id}
              className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            >
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
                Template
              </p>
              <h2 className="mt-2 text-2xl font-black text-black">
                {template.nameDutch}
              </h2>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                {templateUseCases[template.id] ?? template.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/editor"
                  className="border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black"
                >
                  Gebruik in editor
                </Link>
                <Link
                  href="/templates"
                  className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
                >
                  Vergelijk layouts
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section className="mb-14 border-4 border-black bg-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Keuzeproces
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Zo kies je de beste CV-template zonder tijd te verliezen
          </h2>
          <div className="mt-6 space-y-4">
            {selectionSteps.map((step, index) => (
              <div key={step.title} className="flex gap-4">
                <div
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center border-3 border-black bg-[#FFFEF0] text-sm font-black text-black"
                  style={{ borderWidth: "3px" }}
                >
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-black text-black">{step.title}</h3>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              href: "/curriculum-vitae-template",
              title: "Curriculum vitae template",
              body: "Speciaal voor formelere template-intentie en rustige, zakelijke layouts.",
            },
            {
              href: "/cv-maken-sjabloon",
              title: "CV maken sjabloon",
              body: "Dezelfde cluster in meer sjabloon-taal en met extra keuzehulp.",
            },
            {
              href: "/cv-opmaken",
              title: "CV opmaken",
              body: "Verbeter de layout nadat je de juiste template hebt gekozen.",
            },
            {
              href: "/modern-cv-voorbeeld",
              title: "Modern CV voorbeeld",
              body: "Zie wanneer een frissere uitstraling beter past dan een klassieke layout.",
            },
            {
              href: "/professioneel-cv-voorbeeld",
              title: "Professioneel CV voorbeeld",
              body: "Bekijk een rustiger voorbeeld voor zakelijke en brede functies.",
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

        <section className="mb-14 border-4 border-black bg-black p-8 text-white shadow-[8px_8px_0px_0px_rgba(250,204,21,1)]">
          <h2 className="text-3xl font-black">
            Kies je template, vul je inhoud in en download pas wanneer alles klopt
          </h2>
          <p className="mt-4 max-w-3xl text-base font-medium leading-relaxed text-slate-200">
            WerkCV is gebouwd voor mensen die eerst een goede template willen kiezen,
            daarna hun inhoud willen aanscherpen en pas op het einde willen betalen
            voor de PDF. Dat maakt template-zoekintentie direct bruikbaar voor echte
            sollicitaties.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/templates"
              className="border-4 border-white bg-yellow-400 px-5 py-3 text-base font-black text-black"
            >
              Vergelijk templates
            </Link>
            <Link
              href="/prijzen"
              className="border-4 border-white bg-transparent px-5 py-3 text-base font-black text-white"
            >
              Bekijk prijzen
            </Link>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-3xl font-black text-black">Veelgestelde vragen over CV templates</h2>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </div>
  );
}
