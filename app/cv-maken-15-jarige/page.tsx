import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const teenSignals = [
  "Beschikbaarheid voor bijbaan of weekendwerk.",
  "Schoolniveau en relevante vakken of interesses.",
  "Verantwoordelijkheid uit sport, vrijwilligerswerk, oppassen of schoolactiviteiten.",
  "Een nette, volwassen opmaak zonder te veel tekst.",
];

const teenSteps = [
  {
    title: "1) Begin met een simpele functierichting",
    body: "Noem duidelijk of je zoekt naar een bijbaan in winkel, horeca, supermarkt, logistiek of iets anders. Dat maakt je CV meteen concreter.",
  },
  {
    title: "2) Gebruik school, activiteiten en kleine verantwoordelijkheden",
    body: "Ook zonder officiële baan kun je laten zien dat je afspraken nakomt, op tijd bent, helpt organiseren of klantcontact aankunt.",
  },
  {
    title: "3) Houd het kort en netjes",
    body: "Voor een 15-jarige is 1 pagina ruim genoeg. Een rustige template werkt beter dan veel design of te veel tekst.",
  },
  {
    title: "4) Laat zien waarom jij betrouwbaar bent",
    body: "Werkgevers nemen jongeren vooral aan op houding. Beschrijf daarom inzet, leergierigheid, vriendelijkheid en beschikbaarheid helder.",
  },
];

const faqs = [
  {
    question: "Kan ik op mijn 15e al een cv maken?",
    answer:
      "Ja. Voor bijbanen, stage-achtige schooltrajecten en eerste werkervaring is een kort en netjes CV heel nuttig, ook als je nog weinig formele ervaring hebt.",
  },
  {
    question: "Wat zet ik op een cv als 15-jarige?",
    answer:
      "Zet je school, sterke eigenschappen, beschikbaarheid, hobby's die iets zeggen over inzet, vrijwilligerswerk, oppassen, sport of andere verantwoordelijkheden op je CV.",
  },
  {
    question: "Hoe lang moet een cv voor een 15-jarige zijn?",
    answer:
      "1 pagina is genoeg. Werkgevers willen snel zien wie je bent, wat je zoekt en waarom jij betrouwbaar overkomt.",
  },
  {
    question: "Kan ik zonder ervaring toch solliciteren met een cv?",
    answer:
      "Ja. Bij jongeren draait het minder om ervaring en meer om houding, beschikbaarheid, netheid en het vermogen om snel te leren.",
  },
];

export const metadata: Metadata = {
  title: "CV Maken 15 Jarige - Eerste CV voor Bijbaan of Schoolverlater | WerkCV.nl",
  description:
    "CV maken als 15-jarige? Bouw een kort, netjes en betrouwbaar eerste CV voor bijbaan, supermarkt, horeca of winkelwerk. Start gratis in de editor.",
  keywords: [
    "cv maken 15 jarige",
    "cv maken voor 15 jarige",
    "cv 15 jarige maken",
    "gratis cv maken voor 15 jarige",
    "cv 15 jaar",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-maken-15-jarige",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-maken-15-jarige",
      "x-default": "https://werkcv.nl/cv-maken-15-jarige",
    },
  },
};

export default function CvMaken15JarigePage() {
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
        name: "CV Maken 15 Jarige",
        item: "https://werkcv.nl/cv-maken-15-jarige",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Eerste CV maken als 15-jarige",
    description:
      "Praktische aanpak voor jongeren die een eerste CV voor bijbaan of winkelwerk willen maken.",
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
              CV maken als 15-jarige voor je eerste bijbaan of winkelwerk
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Als 15-jarige heb je vaak nog geen officiële werkervaring, maar je kunt
              wel een sterk eerste CV maken. Werkgevers zoeken op deze leeftijd vooral
              nette presentatie, betrouwbaarheid, motivatie en beschikbaarheid. Daar
              moet je CV dus op sturen.
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
            <h2 className="text-xl font-black text-black">Wat werkgevers bij jongeren willen zien</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              {teenSignals.map((item) => (
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
            Zo maak je een eerste CV als 15-jarige
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
              body: "Gebruik dit als praktische basis voor supermarkt, retail of horeca.",
            },
            {
              href: "/cv-maken-op-mobiel",
              title: "CV maken op mobiel",
              body: "Veel jongeren starten sneller via mobiel dan via laptop.",
            },
            {
              href: "/cv-maken-16-jarige",
              title: "CV maken 16-jarige",
              body: "Dezelfde cluster voor net iets oudere schoolverlaters en bijbanen.",
            },
            {
              href: "/cv-maken-student",
              title: "CV maken student",
              body: "Ga breder als je ook stage of eerste baan meeneemt.",
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
          <h2 className="text-3xl font-black text-black">Veelgestelde vragen over een CV als 15-jarige</h2>
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
