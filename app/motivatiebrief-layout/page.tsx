import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import SectionIntentLinks from "@/components/seo/SectionIntentLinks";

const layoutRules = [
  {
    title: "1) Houd je motivatiebrief op 1 A4",
    body: "Een sterke brief is compact. Vier korte alinea's met genoeg witruimte werken meestal beter dan een lange tekstmuur.",
  },
  {
    title: "2) Kies een rustig lettertype en formaat",
    body: "Gebruik een leesbaar lettertype zoals Arial, Calibri of Times New Roman in grootte 10, 11 of 12. Dat oogt professioneel en blijft goed scanbaar.",
  },
  {
    title: "3) Zet opbouw en layout in dezelfde richting",
    body: "Naam, aanhef, opening, middenstuk en afsluiting moeten visueel logisch volgen. Laat witregels en uitlijning de structuur ondersteunen.",
  },
  {
    title: "4) Gebruik korte alinea's van 3 tot 5 regels",
    body: "Recruiters lezen liever vier compacte blokken dan één groot tekstvlak. Korte alinea's verhogen de kans dat je kernpunten echt worden gelezen.",
  },
  {
    title: "5) Verstuur je brief als PDF",
    body: "Zo blijft je opmaak stabiel en ziet je brief er hetzelfde uit op verschillende apparaten of in een ATS-flow.",
  },
];

const structureBlocks = [
  {
    title: "Kop en onderwerp",
    body: "Zet je naam en contactgegevens duidelijk bovenaan. Voeg onderwerp of functietitel alleen toe als dat in de sollicitatieflow of bedrijfscultuur logisch is.",
  },
  {
    title: "Openingsalinea",
    body: "Noem de functie, waarom die je aanspreekt en wat jouw eerste sterke match is. Geen generieke openingszin zonder context.",
  },
  {
    title: "Middenstuk",
    body: "Werk 1 of 2 relevante prestaties uit. De layout moet dat ondersteunen met rustige alinea's, niet met teveel bullets of tussenkopjes.",
  },
  {
    title: "Afsluiting",
    body: "Sluit zakelijk af, bedank voor de tijd en nodig uit tot een gesprek. Houd ook dit blok kort zodat de brief netjes eindigt.",
  },
];

const wrongVsRight = [
  {
    wrong: "Een volle pagina zonder witregels of visuele rust.",
    right: "Vier compacte alinea's met genoeg witruimte ertussen.",
  },
  {
    wrong: "Veel stijlen tegelijk: vet, cursief, kleuraccenten en verschillende lettertypes.",
    right: "Eén rustige stijl met alleen subtiele nadruk op functietitel of onderwerpregel.",
  },
  {
    wrong: "Een brief die er heel anders uitziet dan je CV.",
    right: "Brief en CV gebruiken dezelfde professionele toon en vergelijkbare typografie.",
  },
  {
    wrong: "Word-bestand versturen waardoor layout verschuift.",
    right: "PDF versturen zodat je opmaak stabiel en netjes blijft.",
  },
];

const intentLinks = [
  {
    href: "/tools/sollicitatiebrief-generator",
    label: "Motivatiebrief schrijven in de generator",
    description: "Gebruik de layoutregels van deze pagina en zet ze direct om in een nette briefstructuur.",
  },
  {
    href: "/motivatiebrief-voorbeeld",
    label: "Motivatiebrief voorbeelden bekijken",
    description: "Handig als je naast opmaak ook voorbeeldzinnen en voorbeeldalinea's wilt vergelijken.",
  },
  {
    href: "/sollicitatiebrief-voorbeeld",
    label: "Sollicitatiebrief voorbeeld en opbouw vergelijken",
    description: "Gebruik deze route als je motivatiebrief en sollicitatiebrief in dezelfde flow wilt uitwerken.",
  },
  {
    href: "/professioneel-cv-template",
    label: "Professioneel CV template kiezen",
    description: "Laat je brief en CV visueel op elkaar aansluiten wanneer je solliciteert op zakelijke of professionele rollen.",
  },
];

const faqs = [
  {
    question: "Wat is een goede motivatiebrief layout?",
    answer:
      "Een goede motivatiebrief layout is rustig, scanbaar en compact. Denk aan een leesbaar lettertype, korte alinea's, genoeg witruimte en maximaal één pagina.",
  },
  {
    question: "Welk lettertype gebruik je voor een motivatiebrief?",
    answer:
      "Veelgebruikte, professionele keuzes zijn Arial, Calibri en Times New Roman in grootte 10, 11 of 12. Kies vooral voor leesbaarheid en consistentie.",
  },
  {
    question: "Hoe lang mag een motivatiebrief zijn?",
    answer:
      "Voor de meeste sollicitaties werkt maximaal één A4 het best. Dat dwingt je tot focus en maakt je brief prettiger om te lezen.",
  },
  {
    question: "Moet mijn motivatiebrief dezelfde opmaak hebben als mijn cv?",
    answer:
      "Ja, dat helpt. Je brief hoeft niet identiek te zijn, maar een vergelijkbare typografie en professionele stijl zorgen voor een sterker geheel.",
  },
];

export const metadata: Metadata = {
  title: "Motivatiebrief Layout - Opmaak, Structuur en Voorbeeld | WerkCV.nl",
  description:
    "Zoek je motivatiebrief layout of opmaak? Bekijk praktische regels voor lettertype, witruimte, structuur en PDF-opmaak. Direct toepassen in je brief en CV-flow.",
  keywords: [
    "motivatiebrief layout",
    "motivatiebrief opmaak",
    "opmaak motivatiebrief",
    "sollicitatiebrief opmaak",
    "motivatiebrief structuur",
    "brief layout sollicitatie",
  ],
  alternates: {
    canonical: "https://werkcv.nl/motivatiebrief-layout",
    languages: {
      "nl-NL": "https://werkcv.nl/motivatiebrief-layout",
      "x-default": "https://werkcv.nl/motivatiebrief-layout",
    },
  },
};

export default function MotivatiebriefLayoutPage() {
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
        name: "Motivatiebrief Layout",
        item: "https://werkcv.nl/motivatiebrief-layout",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Motivatiebrief layout verbeteren",
    description: "Praktische stappen om de opmaak van je motivatiebrief professioneel en scanbaar te maken.",
    totalTime: "PT20M",
    step: layoutRules.map((rule) => ({
      "@type": "HowToStep",
      name: rule.title,
      text: rule.body,
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
            href="/tools/sollicitatiebrief-generator"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            Open generator
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-14">
        <section className="mb-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-slate-700">
              Intent: motivatiebrief layout
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Motivatiebrief layout die professioneel oogt en prettig leest
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Zoek je een nette motivatiebrief opmaak? Dan gaat het niet alleen om wat je schrijft,
              maar ook om hoe de brief op de pagina staat. Op deze pagina zie je welke layout, lengte,
              lettertypes en witruimte het beste werken voor Nederlandse sollicitaties.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/tools/sollicitatiebrief-generator"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Pas layout direct toe
              </Link>
              <Link
                href="/motivatiebrief-voorbeeld"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Eerst voorbeelden bekijken
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Lettertype + witruimte",
                "Opbouw per briefblok",
                "Direct toepasbaar in generator",
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
            <h2 className="text-xl font-black text-black">Snelle layout-check</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <li><strong className="text-black">Lengte:</strong> houd je brief op maximaal 1 A4.</li>
              <li><strong className="text-black">Lettertype:</strong> gebruik Arial, Calibri of Times New Roman.</li>
              <li><strong className="text-black">Grootte:</strong> meestal 10, 11 of 12.</li>
              <li><strong className="text-black">Structuur:</strong> werk met 4 korte alinea&apos;s en witregels ertussen.</li>
              <li><strong className="text-black">Bestand:</strong> verstuur je brief als PDF.</li>
            </ul>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/sollicitatiebrief-voorbeeld"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Lees ook: sollicitatiebrief voorbeeld
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Layoutregels
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Motivatiebrief opmaak in 5 praktische stappen
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {layoutRules.map((rule) => (
              <article
                key={rule.title}
                className="border-4 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-black text-black">{rule.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{rule.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Opbouw
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Welke briefblokken moeten visueel direct duidelijk zijn?
            </h2>
            <div className="mt-4 space-y-4">
              {structureBlocks.map((item) => (
                <div key={item.title} className="border-2 border-black bg-[#FFFEF0] p-4">
                  <p className="text-sm font-black text-black">{item.title}</p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Fout naar goed
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Slechte en sterke motivatiebrief layout naast elkaar
            </h2>
            <div className="mt-4 space-y-4">
              {wrongVsRight.map((item) => (
                <div key={item.wrong}>
                  <p className="text-sm font-medium text-slate-300">
                    <span className="font-black">Fout:</span> {item.wrong}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-100">
                    <span className="font-black">Sterk:</span> {item.right}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Van opmaak naar complete brief
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Gebruik de juiste route zodra je layout klopt
          </h2>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
            Goede opmaak is pas nuttig als je inhoud ook klopt. Gebruik daarom meteen de juiste vervolgstap:
            voorbeelden vergelijken, een brief genereren of je CV visueel laten aansluiten op dezelfde sollicitatie.
          </p>
          <SectionIntentLinks links={intentLinks} locale="nl" />
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over motivatiebrief layout
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
                Klaar om je brief netjes af te maken?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Gebruik een rustige layout en schrijf daarna direct je brief
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Zet deze opmaakregels meteen om in een overtuigende sollicitatiebrief en laat je CV in dezelfde flow aansluiten.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/sollicitatiebrief-generator"
                className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Start met brief
              </Link>
              <Link
                href="/professioneel-cv-template"
                className="inline-block border-4 border-black bg-black px-5 py-3 text-base font-black text-white"
              >
                Kies CV template
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
