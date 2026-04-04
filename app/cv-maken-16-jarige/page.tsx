import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const teenSteps = [
  {
    title: "1) Zet je bijbaan- of stage-intentie duidelijk neer",
    body: "Bij 16-jarigen kijken werkgevers snel naar beschikbaarheid, motivatie en het soort werk dat je zoekt. Maak dat bovenaan meteen concreet.",
  },
  {
    title: "2) Gebruik school, projecten en bijbaanbewijs slim",
    body: "Ook een korte bijbaan, schoolproject, clubverantwoordelijkheid of vrijwilligerswerk kan laten zien dat je betrouwbaar bent en snel leert.",
  },
  {
    title: "3) Laat zien dat je afspraken nakomt",
    body: "Voor eerste werkervaring telt houding zwaar. Benoem punctualiteit, teamwerk, service of verantwoordelijkheid als je daar bewijs voor hebt.",
  },
  {
    title: "4) Houd je CV rustig en niet te lang",
    body: "1 pagina is vrijwel altijd genoeg. Een eenvoudige template maakt je CV sneller leesbaar en serieuzer.",
  },
];

const signals = [
  "Beschikbaarheid na school, in het weekend of in vakanties.",
  "Werkhouding en leerbereidheid.",
  "Eerste praktijkervaring of verantwoordelijkheid, hoe klein ook.",
  "Korte, nette opmaak zonder onnodige details.",
];

const faqs = [
  {
    question: "Hoe maak ik een cv als 16-jarige?",
    answer:
      "Begin met een korte profieltekst, schoolgegevens, beschikbaarheid en alles wat laat zien dat je verantwoordelijk en gemotiveerd bent: bijbaan, stage, vrijwilligerswerk, sport of schoolactiviteiten.",
  },
  {
    question: "Wat moet er op een cv van een 16-jarige staan?",
    answer:
      "School, contactgegevens, wat voor werk je zoekt, je beschikbaarheid en voorbeelden van inzet of verantwoordelijkheid. Werkgevers zoeken vooral potentie en werkhouding.",
  },
  {
    question: "Heb ik werkervaring nodig voor een eerste cv?",
    answer:
      "Nee. Bij een eerste CV mag je ook laten zien wat je op school, in projecten, bij sport, oppassen of vrijwilligerswerk hebt gedaan.",
  },
  {
    question: "Kan ik dit cv later aanpassen voor andere bijbanen?",
    answer:
      "Ja. WerkCV is juist handig om snel varianten te maken voor winkelwerk, horeca, logistiek of andere eerste banen.",
  },
];

export const metadata: Metadata = {
  title: "CV Maken 16 Jarige - Eerste CV voor Bijbaan, Winkel of Horeca | WerkCV",
  description:
    "CV maken als 16-jarige? Zet school, beschikbaarheid, eerste ervaring en werkhouding om in een sterk eerste CV voor bijbaan of stage. Start gratis in de editor.",
  keywords: [
    "cv maken 16 jarige",
    "cv maken voor 16 jarige",
    "cv 16 jarige",
    "cv maken 16 jaar",
    "gratis cv maken voor 16 jarige",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-maken-16-jarige",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-maken-16-jarige",
      "x-default": "https://werkcv.nl/cv-maken-16-jarige",
    },
  },
};

export default function CvMaken16JarigePage() {
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
        name: "CV Maken 16 Jarige",
        item: "https://werkcv.nl/cv-maken-16-jarige",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Eerste CV maken als 16-jarige",
    description:
      "Praktische aanpak voor 16-jarigen die een eerste CV voor bijbaan, winkel, horeca of stage willen maken.",
    totalTime: "PT15M",
    step: teenSteps.map((step) => ({
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
              Jongeren-intentie
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV maken als 16-jarige voor bijbaan, winkel, horeca of eerste stage
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Op je 16e heb je vaak al iets meer ruimte voor bijbanen, winkelwerk,
              horeca of een eerste praktijkstage. Je CV moet daarom vooral laten zien
              dat je serieus bent, beschikbaar bent en snel inzetbaar kunt worden.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Start je eerste CV
              </Link>
              <Link
                href="/cv-voorbeelden/studenten-en-starters/bijbaan-deeltijd-cv"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk bijbaan voorbeeld
              </Link>
            </div>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Wat werkgevers willen zien</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              {signals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Eerste stappen
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Zo bouw je als 16-jarige een serieus eerste CV
          </h2>
          <div className="mt-6 space-y-4">
            {teenSteps.map((step, index) => (
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
              href: "/cv-voorbeelden/studenten-en-starters/bijbaan-deeltijd-cv",
              title: "Bijbaan CV voorbeeld",
              body: "Handig voor supermarkt, retail, horeca en andere eerste banen.",
            },
            {
              href: "/cv-maken-15-jarige",
              title: "CV maken 15-jarige",
              body: "Voor net jongere zoekers met vergelijkbare bijbaan-intentie.",
            },
            {
              href: "/cv-maken-op-mobiel",
              title: "CV maken op mobiel",
              body: "Past goed bij jongeren die snel via telefoon willen starten.",
            },
            {
              href: "/cv-maken-student",
              title: "CV maken student",
              body: "Ga breder als je ook stage en startersrollen wilt meenemen.",
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
          <h2 className="text-3xl font-black text-black">Veelgestelde vragen over een CV als 16-jarige</h2>
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
