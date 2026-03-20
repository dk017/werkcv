import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const mobileAdvantages = [
  "Snel kleine aanpassingen doen tussen werk, studie of reizen door.",
  "Direct reageren op een vacature zodra je die ziet.",
  "Geen laptop nodig voor profieltekst, titel of snelle vacatureversie.",
  "Makkelijker voor starters en bijbaanzoekers die vooral mobiel werken.",
];

const mobileFlow = [
  {
    title: "1) Kies een rustige template die goed schaalt op kleine schermen",
    body: "Mobiel werken vraagt om minder frictie. Begin met een template die je inhoud compact en overzichtelijk houdt.",
  },
  {
    title: "2) Vul eerst titel, profiel en recente ervaring in",
    body: "Op mobiel win je door de belangrijkste stukken eerst af te maken. Detailoptimalisatie kan daarna nog steeds.",
  },
  {
    title: "3) Gebruik mobiel voor snelle vacature-aanpassingen",
    body: "Een functietitel, profieltekst of paar bullets aanpassen gaat vaak prima op je telefoon en bespaart uitstel.",
  },
  {
    title: "4) Controleer daarna de volledige versie voor download",
    body: "Mobiel is sterk voor snelheid, maar je wilt de eindversie nog steeds rustig nalopen voordat je je PDF verstuurt.",
  },
];

const faqs = [
  {
    question: "Kan ik echt een cv maken op mobiel?",
    answer:
      "Ja. Voor veel gebruikers is mobiel prima voor starten, invullen en snelle aanpassingen. Voor de eindcheck is het slim om nog even rustig naar de volledige versie te kijken.",
  },
  {
    question: "Is cv maken op telefoon handig voor sollicitaties?",
    answer:
      "Ja, vooral als je snel wilt reageren op vacatures of onderweg kleine wijzigingen wilt maken. Het verlaagt de drempel om meteen te beginnen.",
  },
  {
    question: "Wat moet ik eerst doen als ik mijn cv op mobiel maak?",
    answer:
      "Begin met functietitel, profieltekst en recente werkervaring. Daarmee staat de kern van je sollicitatie al snel goed.",
  },
  {
    question: "Kan ik daarna ook een PDF downloaden?",
    answer:
      "Ja. WerkCV laat je mobiel werken en daarna de definitieve PDF downloaden zodra je versie klaar is.",
  },
];

export const metadata: Metadata = {
  title: "CV Maken op Mobiel - Snel Je CV Bouwen op Telefoon | WerkCV.nl",
  description:
    "CV maken op mobiel of telefoon? Werk sneller vanuit een vaste template, pas je profiel en ervaring direct aan en download daarna je PDF.",
  keywords: [
    "cv maken op mobiel",
    "cv maken op telefoon",
    "mobiel cv maken",
    "cv op telefoon maken",
    "cv maken mobile",
    "cv maken smartphone",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-maken-op-mobiel",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-maken-op-mobiel",
      "x-default": "https://werkcv.nl/cv-maken-op-mobiel",
    },
  },
};

export default function CvMakenOpMobielPage() {
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
        name: "CV Maken op Mobiel",
        item: "https://werkcv.nl/cv-maken-op-mobiel",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "CV maken op mobiel in 4 stappen",
    description:
      "Praktische mobiele workflow om snel een CV te starten, aanpassen en afronden.",
    totalTime: "PT15M",
    step: mobileFlow.map((step) => ({
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
              Mobiele intentie
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV maken op mobiel zodat je direct kunt starten, ook zonder laptop
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Zoekers op <strong>cv maken op mobiel</strong> of{" "}
              <strong>cv maken op telefoon</strong> willen vooral snelheid. Geen
              uitstel tot ze achter een laptop zitten, maar meteen een serieuze
              sollicitatieversie starten. Deze pagina laat zien hoe je dat praktisch
              en zonder rommelige flow doet.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Start mobiel je CV
              </Link>
              <Link
                href="/gratis-cv-maken"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Start gratis
              </Link>
            </div>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Waarom mobiel interessant is</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              {mobileAdvantages.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Mobiele workflow
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Zo gebruik je mobiel slim voor je CV
          </h2>
          <div className="mt-6 space-y-4">
            {mobileFlow.map((step, index) => (
              <div key={step.title} className="flex gap-4">
                <div
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center border-3 border-black bg-[#FFFEF0] text-sm font-black text-black"
                  style={{ borderWidth: "3px" }}
                >
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-black text-black">{step.title}</h3>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-4 md:grid-cols-3">
          {[
            {
              href: "/online-cv-maken",
              title: "Online CV maken",
              body: "Brede online flow als je buiten mobiel ook laptopgebruik meeneemt.",
            },
            {
              href: "/cv-maken-pdf",
              title: "CV maken PDF",
              body: "Zet je mobiele versie daarna stabiel om naar de eind-PDF.",
            },
            {
              href: "/cv-aanmaken",
              title: "CV aanmaken",
              body: "Voor gebruikers die vooral snel een eerste basisversie willen.",
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
          <h2 className="text-3xl font-black text-black">Veelgestelde vragen over CV maken op mobiel</h2>
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
