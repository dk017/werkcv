import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const examples = [
  {
    title: "Voorbeeld opening (administratieve functie)",
    text: "Met vijf jaar ervaring in administratieve ondersteuning en procesverbetering solliciteer ik met enthousiasme naar de functie van administratief medewerker bij [Bedrijfsnaam]. In mijn huidige rol heb ik de doorlooptijd van dossierverwerking met 28% verkort door duidelijke werkafspraken en beter gebruik van Excel-automatisering.",
  },
  {
    title: "Voorbeeld middenstuk (klantenservice)",
    text: "In de afgelopen drie jaar heb ik dagelijks complexe klantvragen afgehandeld via telefoon en e-mail. Daarbij behaalde ik consequent een klanttevredenheid van 9,1 en wist ik de gemiddelde afhandeltijd met 17% te verlagen zonder kwaliteitsverlies. Die combinatie van service en efficiency wil ik inzetten binnen uw team.",
  },
  {
    title: "Voorbeeld afsluiting (starter/junior)",
    text: "Graag licht ik in een gesprek toe hoe mijn stage-ervaring en proactieve werkhouding aansluiten op uw teamdoelen. Ik zie ernaar uit om mijn energie en leergierigheid in te zetten bij [Bedrijfsnaam]. Dank voor uw tijd en overweging.",
  },
];

const checklist = [
  "Gebruik de taal van de vacature en noem de functie exact.",
  "Koppel je ervaring aan 1-2 concrete resultaten met cijfers.",
  "Laat zien waarom juist dit bedrijf bij je past.",
  "Sluit af met een duidelijke uitnodiging voor een gesprek.",
];

const faqs = [
  {
    question: "Wat is een goed sollicitatiebrief voorbeeld?",
    answer:
      "Een goed voorbeeld laat direct motivatie, relevante ervaring en concrete resultaten zien. De brief is specifiek voor de vacature en niet een algemene tekst die je naar iedereen stuurt.",
  },
  {
    question: "Hoe lang moet een sollicitatiebrief zijn?",
    answer:
      "Houd je brief meestal op ongeveer 3 tot 5 korte alinea's. Recruiters willen snel kunnen zien waarom jij past bij de functie, zonder lange en herhalende tekst.",
  },
  {
    question: "Is een motivatiebrief hetzelfde als een sollicitatiebrief?",
    answer:
      "In de praktijk worden de termen vaak door elkaar gebruikt. Beide doelen zijn hetzelfde: overtuigen waarom jij geschikt bent voor de rol en waarom je gemotiveerd bent voor dit bedrijf.",
  },
  {
    question: "Kan ik een sollicitatiebrief voorbeeld direct kopieren?",
    answer:
      "Gebruik voorbeelden als structuur, niet als eindtekst. Recruiters herkennen standaardteksten snel. Pas voorbeelden altijd aan op jouw ervaring, resultaten en de specifieke vacature.",
  },
];

export const metadata: Metadata = {
  title: "Sollicitatiebrief voorbeeld in 2026: opening, midden en afsluiting | WerkCV",
  description:
    "Zoek je een sollicitatiebrief voorbeeld? Bekijk sterke openingszinnen, voorbeeldalinea's en een heldere briefstructuur. Gebruik voorbeelden als basis en schrijf daarna vacaturegericht verder.",
  keywords: [
    "sollicitatiebrief voorbeeld",
    "motivatiebrief voorbeeld",
    "goede sollicitatiebrief",
    "sollicitatiebrief schrijven voorbeeld",
    "sollicitatiebrief opening",
    "sollicitatiebrief afsluiting",
    "korte sollicitatiebrief voorbeeld",
    "sollicitatiebrief template",
  ],
  alternates: {
    canonical: "https://werkcv.nl/sollicitatiebrief-voorbeeld",
    languages: {
      "nl-NL": "https://werkcv.nl/sollicitatiebrief-voorbeeld",
      "x-default": "https://werkcv.nl/sollicitatiebrief-voorbeeld",
    },
  },
};

export default function SollicitatiebriefVoorbeeldPage() {
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
        name: "Sollicitatiebrief Voorbeeld",
        item: "https://werkcv.nl/sollicitatiebrief-voorbeeld",
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
              Brief-intent
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Sollicitatiebrief voorbeelden die je direct kunt omzetten naar jouw situatie
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Een sterke sollicitatiebrief is kort, concreet en vacaturegericht. Gebruik de voorbeelden hieronder als bouwblok: opening, kern en afsluiting. Daarna pas je de tekst aan op jouw
              resultaten, zodat je brief persoonlijk en geloofwaardig blijft.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/tools/sollicitatiebrief-generator"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Schrijf met voorbeelden in generator
              </Link>
              <Link
                href="/editor"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bouw ook je CV
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Voorbeeldzinnen per onderdeel",
                "Vacaturegerichte structuur",
                "Direct bruikbaar met AI-tool",
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
            <h2 className="text-xl font-black text-black">Snelle checklist voor een sterke brief</h2>
            <div className="mt-5 space-y-4">
              {checklist.map((item, index) => (
                <div key={item} className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center border-2 border-black bg-yellow-300 text-xs font-black">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-slate-700">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/cv-tips/sollicitatiebrief-tips"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Lees ook: sollicitatiebrief tips
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Copy-ready voorbeelden
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Sollicitatiebrief voorbeeldzinnen per onderdeel
          </h2>
          <div className="mt-6 space-y-5">
            {examples.map((example) => (
              <article
                key={example.title}
                className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-black text-black">{example.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{example.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Veelgemaakte fout
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Te algemeen schrijven zonder bewijs
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-200">
              Zinnen als &quot;ik ben gemotiveerd en leergierig&quot; werken pas als je ze onderbouwt met voorbeelden. Laat kort zien wat je hebt bereikt en waarom dat relevant is voor deze functie.
            </p>
          </div>
          <div className="border-4 border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Relevante vervolgstappen
            </p>
            <div className="mt-4 space-y-4">
              {[
                {
                  href: "/sollicitatiebrief-maken",
                  title: "Sollicitatiebrief maken",
                  body: "Start bij de centrale briefhub als je nog moet kiezen tussen voorbeelden, workflow en specialistische routes.",
                },
                {
                  href: "/motivatiebrief-schrijven",
                  title: "Motivatiebrief schrijven",
                  body: "Gebruik deze route als je eerst de schrijfstructuur en opbouw wilt aanscherpen.",
                },
                {
                  href: "/sollicitatiebrief-beginnen",
                  title: "Sollicitatiebrief beginnen",
                  body: "Scherp eerst je eerste zin aan als je voorbeeldbrief nog te standaard opent.",
                },
                {
                  href: "/motivatiebrief-zonder-werkervaring",
                  title: "Motivatiebrief zonder werkervaring",
                  body: "Gebruik deze route als je vooral studie, stage, projecten of bijbaan als bewijs wilt gebruiken.",
                },
                {
                  href: "/open-sollicitatie-brief",
                  title: "Open sollicitatie schrijven",
                  body: "Gebruik een andere briefaanpak als je zonder concrete vacature schrijft.",
                },
                {
                  href: "/sollicitatiebrief-voorbeeld-administratief-medewerker",
                  title: "Voorbeeld administratief medewerker",
                  body: "Bekijk een role-specifiek voorbeeld met administratieve zinnen, resultaten en structuur.",
                },
                {
                  href: "/sollicitatiebrief-voorbeeld-verpleegkundige",
                  title: "Voorbeeld verpleegkundige",
                  body: "Gebruik zorgspecifieke voorbeeldzinnen met BIG- en kwaliteitsfocus.",
                },
                {
                  href: "/sollicitatiebrief-voorbeeld-software-ontwikkelaar",
                  title: "Voorbeeld software ontwikkelaar",
                  body: "Gebruik developer-specifieke voorbeeldzinnen met stackmatch, technische impact en teamfit.",
                },
                {
                  href: "/motivatiebrief-voorbeeld",
                  title: "Motivatiebrief voorbeelden",
                  body: "Gebruik extra voorbeeldalinea's als je focus meer op motivatie en fit ligt.",
                },
                {
                  href: "/tools/sollicitatiebrief-generator",
                  title: "Sollicitatiebrief generator",
                  body: "Gebruik deze voorbeelden direct in de tool en pas ze aan op jouw vacature.",
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
            Veelgestelde vragen over sollicitatiebrief voorbeelden
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
                Klaar om je brief te versturen?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Maak nu je sollicitatiebrief en CV in één flow
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Gebruik de generator voor je brief en koppel dat direct aan een professioneel CV in de editor.
              </p>
            </div>
            <Link
              href="/tools/sollicitatiebrief-generator"
              className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
            >
              Start met sollicitatiebrief
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
