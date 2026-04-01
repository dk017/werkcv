import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const writingSteps = [
  {
    title: "1) Begin met de functie en je directe match",
    body: "Noem de functie, waarom die je aanspreekt en wat jouw eerste sterke match is. Vermijd standaardopeningen zonder context.",
  },
  {
    title: "2) Kies 1 of 2 relevante prestaties",
    body: "Een motivatiebrief overtuigt pas echt als je motivatie koppelt aan bewijs. Gebruik daarom concrete resultaten of voorbeelden uit stage, werk of projectervaring.",
  },
  {
    title: "3) Verbind jezelf aan het bedrijf",
    body: "Laat zien dat je niet alleen een baan zoekt, maar juist deze rol bij dit bedrijf. Gebruik taal uit de vacature en noem wat jou inhoudelijk aantrekt.",
  },
  {
    title: "4) Houd je brief compact en scanbaar",
    body: "Vier korte alinea's zijn meestal genoeg. Recruiters willen snel begrijpen waarom jij past, zonder een lange tekstmuur te lezen.",
  },
  {
    title: "5) Sluit af met een rustige call-to-action",
    body: "Bedank voor de tijd, nodig uit tot een gesprek en sluit professioneel af. Zelfverzekerd werkt beter dan overdreven enthousiast.",
  },
];

const paragraphBlocks = [
  {
    title: "Opening",
    example:
      "Met belangstelling solliciteer ik naar de functie van [functietitel] bij [bedrijfsnaam], omdat deze rol sterk aansluit op mijn ervaring in [domein] en mijn motivatie om [type bijdrage] te leveren.",
  },
  {
    title: "Bewijs",
    example:
      "In mijn huidige rol heb ik [resultaat] bereikt door [aanpak]. Juist die combinatie van [vaardigheid] en [vaardigheid] wil ik inzetten in deze functie.",
  },
  {
    title: "Bedrijfsfit",
    example:
      "Wat mij aanspreekt in [bedrijfsnaam] is [inhoudelijke reden uit vacature of missie]. Ik zie daarin een duidelijke match met hoe ik zelf werk en wil bijdragen.",
  },
  {
    title: "Afsluiting",
    example:
      "Graag licht ik mijn motivatie en ervaring in een gesprek verder toe. Dank voor uw tijd en overweging.",
  },
];

const mistakes = [
  "De brief herhaalt alleen wat al in je CV staat.",
  "Je gebruikt algemene woorden zoals gemotiveerd en leergierig zonder bewijs.",
  "Je schrijft te lang door en verliest daardoor focus.",
  "Je brief kan naar elk bedrijf gestuurd worden zonder aanpassing.",
];

const faqs = [
  {
    question: "Hoe schrijf je een goede motivatiebrief?",
    answer:
      "Een goede motivatiebrief legt in korte, duidelijke alinea's uit waarom deze functie bij je past, welke relevante ervaring je meebrengt en waarom juist dit bedrijf logisch is voor jouw volgende stap.",
  },
  {
    question: "Hoe lang moet een motivatiebrief zijn?",
    answer:
      "Voor de meeste sollicitaties is een halve tot maximaal een hele A4 genoeg. Vier korte alinea's werken meestal beter dan een lange brief.",
  },
  {
    question: "Wat is het verschil tussen motivatiebrief schrijven en sollicitatiebrief schrijven?",
    answer:
      "In Nederland worden de termen vaak door elkaar gebruikt. In de praktijk gaat het meestal om dezelfde brief: motivatie plus geschiktheid voor een concrete vacature.",
  },
  {
    question: "Moet ik mijn motivatiebrief per vacature aanpassen?",
    answer:
      "Ja. Pas functietitel, gebruikte vacaturetaal, bewijs en bedrijfsfit altijd aan. Dat maakt je brief relevanter voor recruiter en ATS.",
  },
];

export const metadata: Metadata = {
  title: "Motivatiebrief Schrijven - Uitleg, Structuur en Voorbeelden | WerkCV.nl",
  description:
    "Zoek je hulp bij motivatiebrief schrijven? Gebruik een duidelijke structuur, voorbeeldzinnen en praktische stappen om sneller een overtuigende brief te maken.",
  keywords: [
    "motivatiebrief schrijven",
    "hoe schrijf je een motivatiebrief",
    "goede motivatiebrief schrijven",
    "motivatiebrief structuur",
    "motivatiebrief opbouw",
    "motivatiebrief tips",
  ],
  alternates: {
    canonical: "https://werkcv.nl/motivatiebrief-schrijven",
    languages: {
      "nl-NL": "https://werkcv.nl/motivatiebrief-schrijven",
      "x-default": "https://werkcv.nl/motivatiebrief-schrijven",
    },
  },
};

export default function MotivatiebriefSchrijvenPage() {
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
        name: "Motivatiebrief Schrijven",
        item: "https://werkcv.nl/motivatiebrief-schrijven",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Motivatiebrief schrijven in 5 stappen",
    description: "Praktische stappen om een korte, overtuigende motivatiebrief te schrijven.",
    totalTime: "PT20M",
    step: writingSteps.map((step) => ({
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
              Intent: motivatiebrief schrijven
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Motivatiebrief schrijven zonder in algemene tekst te blijven hangen
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Wie zoekt op motivatiebrief schrijven wil meestal geen losse voorbeelden alleen,
              maar een duidelijke manier van werken. Op deze pagina zie je welke opbouw goed
              werkt, welke zinnen je echt nodig hebt en hoe je motivatie koppelt aan bewijs.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/tools/sollicitatiebrief-generator"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Schrijf direct in generator
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
                "Stap-voor-stap structuur",
                "Voorbeeldzinnen per alinea",
                "Direct toepasbaar in tool",
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
            <h2 className="text-xl font-black text-black">Snelle schrijfregel</h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              Een motivatiebrief is geen samenvatting van je CV. Het is een korte brug tussen
              vacature, motivatie en bewijs. Recruiters willen snel zien waarom jij inhoudelijk
              past, niet alleen dat je enthousiast bent.
            </p>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/motivatiebrief-layout"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Bekijk ook: motivatiebrief layout
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Workflow
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Motivatiebrief schrijven in 5 praktische stappen
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {writingSteps.map((step) => (
              <article
                key={step.title}
                className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-xl font-black text-black">{step.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Bouwblokken
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Voorbeeldzinnen per briefonderdeel
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {paragraphBlocks.map((item) => (
              <article
                key={item.title}
                className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-black text-black">{item.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{item.example}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Veelgemaakte fouten
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Waarom motivatiebrieven vaak zwak landen
            </h2>
            <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-200">
              {mistakes.map((mistake) => (
                <li key={mistake}>{mistake}</li>
              ))}
            </ul>
          </div>
          <div className="border-4 border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Slimme vervolgstappen
            </p>
            <div className="mt-4 space-y-4">
              {[
                {
                  href: "/motivatiebrief-voorbeeld",
                  title: "Motivatiebrief voorbeelden",
                  body: "Vergelijk complete voorbeeldalinea&apos;s zodra je de structuur begrijpt.",
                },
                {
                  href: "/korte-motivatiebrief-voorbeeld",
                  title: "Korte motivatiebrief voorbeeld",
                  body: "Handig als je je brief compacter wilt houden zonder te vaag te worden.",
                },
                {
                  href: "/sollicitatiebrief-voorbeeld",
                  title: "Sollicitatiebrief voorbeeld",
                  body: "Gebruik deze route als je motivatie en vacaturefit in dezelfde brief wilt uitwerken.",
                },
                {
                  href: "/tools/sollicitatiebrief-generator",
                  title: "Sollicitatiebrief generator",
                  body: "Zet de schrijfregels direct om in een persoonlijke brief voor jouw vacature.",
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
            Veelgestelde vragen over motivatiebrief schrijven
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
                Klaar om te schrijven?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Schrijf je motivatiebrief en koppel daarna een sterk CV
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Gebruik de structuur op deze pagina, zet hem direct om in de generator en
                laat daarna je CV op dezelfde vacature aansluiten.
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
                href="/editor"
                className="inline-block border-4 border-black bg-black px-5 py-3 text-base font-black text-white"
              >
                Bouw ook je CV
              </Link>
            </div>
          </div>
        </section>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <Footer />
    </div>
  );
}
