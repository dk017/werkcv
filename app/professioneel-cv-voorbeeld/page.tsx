import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getTemplateConfig } from "@/lib/templates/registry";

const professionalTemplate = getTemplateConfig("professional");

const sampleBullets = [
  "Coördineerde agenda-, contract- en leveranciersbeheer voor een team van 25 medewerkers.",
  "Vereenvoudigde administratieve processen waardoor responstijd op interne aanvragen met 22% daalde.",
  "Ondersteunde finance en operations met rapportages, planning en kwaliteitscontrole.",
];

const fitCases = [
  "Administratieve, office en supportrollen.",
  "Finance, HR en operationsfuncties.",
  "Brede zakelijke functies waar rust en betrouwbaarheid zwaar wegen.",
  "Kandidaten die liever professioneel en helder ogen dan creatief of opvallend.",
];

const faqs = [
  {
    question: "Wat is een professioneel cv voorbeeld?",
    answer:
      "Een professioneel CV voorbeeld laat zien hoe een rustige, zakelijke layout eruitziet waarbij inhoud, structuur en geloofwaardigheid vooropstaan.",
  },
  {
    question: "Voor welke functies past een professioneel CV voorbeeld het best?",
    answer:
      "Voor administratie, finance, HR, operations, support en veel andere zakelijke rollen werkt een professionele layout meestal het sterkst.",
  },
  {
    question: "Is professioneel hetzelfde als ouderwets?",
    answer:
      "Nee. Professioneel betekent dat je CV helder, verzorgd en recruiter-proof oogt. Het hoeft niet saai of verouderd te zijn.",
  },
  {
    question: "Kan ik dit professionele voorbeeld direct gebruiken?",
    answer:
      "Ja. Je kunt de professionele template openen in de editor, je eigen inhoud invullen en alleen betalen als je de PDF wilt downloaden.",
  },
];

export const metadata: Metadata = {
  title: "Professioneel CV Voorbeeld - Rustig en Zakelijk CV Voorbeeld | WerkCV",
  description:
    "Bekijk een professioneel CV voorbeeld voor administratie, finance, HR en operations. Zie hoe een rustige, zakelijke layout eruitziet en start direct in de editor.",
  keywords: [
    "professioneel cv voorbeeld",
    "voorbeeld professioneel cv",
    "professionele cv voorbeeld",
    "zakelijk cv voorbeeld",
    "rustig cv voorbeeld",
    "professioneel cv maken",
  ],
  alternates: {
    canonical: "https://werkcv.nl/professioneel-cv-voorbeeld",
    languages: {
      "nl-NL": "https://werkcv.nl/professioneel-cv-voorbeeld",
      "x-default": "https://werkcv.nl/professioneel-cv-voorbeeld",
    },
  },
};

export default function ProfessioneelCvVoorbeeldPage() {
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
        name: "Professioneel CV Voorbeeld",
        item: "https://werkcv.nl/professioneel-cv-voorbeeld",
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
              Professioneel CV voorbeeld voor een rustige, zakelijke sollicitatie-indruk
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Een professioneel CV voorbeeld is vooral nuttig als je wilt zien hoe
              een rustige layout eruitziet in de praktijk. Deze stijl werkt sterk
              voor brede Nederlandse functies waar betrouwbaarheid, overzicht en
              duidelijkheid belangrijker zijn dan opvallend design.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/professioneel-cv-template"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Gebruik de professionele template
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
            <h2 className="text-xl font-black text-black">Wanneer professioneel logisch is</h2>
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
            Zo kan een professioneel CV eruitzien
          </h2>
          <div className="mt-6 border-4 border-black bg-[#FFFEF0] p-6">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-600">
              Template
            </p>
            <h3 className="mt-2 text-2xl font-black text-black">{professionalTemplate.nameDutch}</h3>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              <strong className="text-black">Profielvoorbeeld:</strong> Ervaren
              administratief professional met focus op structuur, service en
              procesverbetering. Werkt nauwkeurig, communiceert helder en vertaalt
              operationele behoeften naar overzicht en betrouwbare uitvoering.
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
              <strong className="text-black">Vaardigheden:</strong> Administratie,
              rapportage, stakeholdercommunicatie, MS Office, planning,
              procesverbetering, kwaliteitscontrole.
            </p>
          </div>
        </section>

        <section className="mb-14 grid gap-4 md:grid-cols-3">
          {[
            {
              href: "/professioneel-cv-template",
              title: "Professioneel CV template",
              body: "Ga van voorbeeld naar je eigen zakelijke versie.",
            },
            {
              href: "/cv-maken-sjabloon",
              title: "CV maken sjabloon",
              body: "Vergelijk professionele sjablonen met simpelere of modernere opties.",
            },
            {
              href: "/cv-opmaken",
              title: "CV opmaken",
              body: "Versterk de layout verder voordat je de PDF vastzet.",
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
          <h2 className="text-3xl font-black text-black">Veelgestelde vragen over professionele CV voorbeelden</h2>
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
