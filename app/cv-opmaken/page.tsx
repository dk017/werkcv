import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const formattingSteps = [
  {
    title: "1) Begin met de juiste template",
    body: "Goede CV-opmaak begint niet in een leeg Word-document maar met een layout die al rust, hiërarchie en scanbaarheid biedt.",
  },
  {
    title: "2) Houd secties kort en voorspelbaar",
    body: "Gebruik standaardkoppen zoals Profiel, Werkervaring, Opleiding en Vaardigheden. Daardoor snappen recruiter en ATS direct je structuur.",
  },
  {
    title: "3) Laat witruimte het werk doen",
    body: "Te weinig ruimte maakt een CV vermoeiend om te scannen. Goede opmaak betekent ook bewust ruimte laten tussen onderdelen.",
  },
  {
    title: "4) Gebruik maximaal één stijlaccent",
    body: "Een subtiele accentkleur of strakkere kopstijl helpt. Meer is meestal ruis en zelden een conversievoordeel.",
  },
  {
    title: "5) Controleer altijd de PDF-eindversie",
    body: "De beste opmaak is pas goed als de PDF stabiel, leesbaar en professioneel oogt op laptop en mobiel.",
  },
];

const commonMistakes = [
  {
    title: "Te weinig witruimte",
    body: "Een volgepakt CV lijkt langer dan het is en leest trager. Geef secties ademruimte.",
  },
  {
    title: "Onrustige koppen en marges",
    body: "Inconsistente kopgroottes en wisselende marges maken je CV rommelig, ook als de inhoud goed is.",
  },
  {
    title: "Te veel design-elementen",
    body: "Grafieken, iconen en blokken helpen zelden bij standaard sollicitaties en kunnen ATS-verwerking verstoren.",
  },
  {
    title: "Goede inhoud in verkeerde layout",
    body: "Zelfs sterke ervaring verliest impact als de opmaak de logica van je verhaal niet ondersteunt.",
  },
];

const faqs = [
  {
    question: "Wat betekent cv opmaken precies?",
    answer:
      "CV opmaken betekent dat je de structuur, witruimte, koppen en visuele hiërarchie zo instelt dat recruiters je inhoud snel kunnen scannen.",
  },
  {
    question: "Is cv opmaken hetzelfde als cv ontwerp?",
    answer:
      "Niet helemaal. Ontwerp klinkt vaak creatiever. Opmaken gaat vooral over leesbaarheid, rust en een professionele recruiter-proof layout.",
  },
  {
    question: "Moet ik mijn cv in Word opmaken?",
    answer:
      "Dat kan, maar een vaste editor met templates geeft meestal sneller een consistente en stabiele PDF zonder layoutproblemen.",
  },
  {
    question: "Welke cv-opmaak werkt het best voor ATS?",
    answer:
      "Een rustige layout met standaardsecties, beperkte visuele complexiteit en duidelijke koppen werkt het best voor ATS en recruiters.",
  },
];

export const metadata: Metadata = {
  title: "CV Opmaken - Professionele Layout Tips en Voorbeelden | WerkCV",
  description:
    "CV opmaken zonder rommelige layout? Leer hoe je je CV professioneel, ATS-vriendelijk en scanbaar opmaakt en pas het direct toe in de editor.",
  keywords: [
    "cv opmaken",
    "cv opmaak",
    "opmaak cv",
    "cv layout maken",
    "cv mooi maken",
    "professioneel cv opmaken",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-opmaken",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-opmaken",
      "x-default": "https://werkcv.nl/cv-opmaken",
    },
  },
};

export default function CvOpmakenPage() {
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
        name: "CV Opmaken",
        item: "https://werkcv.nl/cv-opmaken",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "CV professioneel opmaken in 5 stappen",
    description:
      "Praktische richtlijnen om een CV rustig, scanbaar en recruiter-proof op te maken.",
    totalTime: "PT25M",
    step: formattingSteps.map((step) => ({
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
              Layout-intentie
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV opmaken zodat recruiters direct zien wat telt
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Goede CV-opmaak maakt je ervaring sneller leesbaar, professioneler en
              betrouwbaarder. De meeste kandidaten verliezen niet op inhoud, maar op
              onrustige opmaak. Hier zie je hoe je die fout voorkomt en hoe je die
              verbeteringen direct toepast in WerkCV.
            </p>
            <p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-slate-600">
              Deze route gaat bewust over layout en visuele rust, niet over de hele
              schrijfstrategie. Voor de algemene workflow rond inhoud, structuur en
              sub-intents gebruik je{" "}
              <Link
                href="/cv-maken"
                className="font-black text-black underline decoration-2 underline-offset-4"
              >
                de CV maken gids
              </Link>
              .
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/templates"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Start met een rustige template
              </Link>
              <Link
                href="/cv-opmaak-voorbeeld"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk opmaakvoorbeelden
              </Link>
            </div>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Snelle opmaakregels</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <li>Gebruik vaste secties en logische volgorde.</li>
              <li>Laat witruimte werken in plaats van extra design.</li>
              <li>Beperk accentkleuren en decoratie.</li>
              <li>Controleer altijd de PDF-eindversie voor je solliciteert.</li>
            </ul>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/cv-maken-template"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Begin eerst met de juiste template
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Stappenplan
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Zo maak je je CV-opmaak sterker in plaats van drukker
          </h2>
          <div className="mt-6 space-y-4">
            {formattingSteps.map((step, index) => (
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

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          {commonMistakes.map((item) => (
            <article
              key={item.title}
              className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            >
              <h2 className="text-xl font-black text-black">{item.title}</h2>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                {item.body}
              </p>
            </article>
          ))}
        </section>

        <section className="mb-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              href: "/cv-opmaak-voorbeeld",
              title: "CV opmaak voorbeeld",
              body: "Zie goede en slechte layoutkeuzes naast elkaar.",
            },
            {
              href: "/cv-maken-template",
              title: "CV maken template",
              body: "Kies eerst een rustige basislayout voor je sollicitatie.",
            },
            {
              href: "/modern-cv-voorbeeld",
              title: "Modern CV voorbeeld",
              body: "Voor functies waar een frissere uitstraling logisch is.",
            },
            {
              href: "/professioneel-cv-voorbeeld",
              title: "Professioneel CV voorbeeld",
              body: "Voor zakelijke functies waar rust en structuur zwaarder wegen.",
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
            Rustige CV-opmaak wint vaker dan opvallende CV-opmaak
          </h2>
          <p className="mt-4 max-w-3xl text-base font-medium leading-relaxed text-slate-200">
            Voor de meeste Nederlandse vacatures is een professionele, scanbare
            layout de beste keuze. WerkCV helpt je die versie snel te bouwen zonder
            dat je zelf in Word of Canva hoeft te worstelen met marges en stijl.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/templates"
              className="border-4 border-white bg-yellow-400 px-5 py-3 text-base font-black text-black"
            >
              Vergelijk templates
            </Link>
            <Link
              href="/cv-aanmaken"
              className="border-4 border-white bg-transparent px-5 py-3 text-base font-black text-white"
            >
              Start met je basis-CV
            </Link>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-3xl font-black text-black">Veelgestelde vragen over CV opmaken</h2>
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
