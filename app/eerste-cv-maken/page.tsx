import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { templateList } from "@/lib/templates/registry";

const featuredTemplates = templateList.filter((template) =>
  ["simple", "modern"].includes(template.id),
);

const templateUseCases: Record<string, string> = {
  simple:
    "Beste keuze als je zonder ervaring vooral rust, duidelijke secties en weinig keuzes wilt.",
  modern:
    "Handig als je eerste cv wel fris mag ogen, maar nog steeds overzichtelijk moet blijven voor recruiters.",
};

const firstCvSteps = [
  {
    title: "1) Start niet vanuit ervaring, maar vanuit richting",
    body: "Je eerste CV hoeft niet vol banen te staan. Begin met de rol, bijbaan, stage of studiecontext waarop je je richt.",
  },
  {
    title: "2) Gebruik school, projecten en bijbanen als bewijs",
    body: "Opdrachten, groepswerk, vrijwilligerswerk, sportverantwoordelijkheid en bijbanen zeggen vaak al genoeg over inzet en betrouwbaarheid.",
  },
  {
    title: "3) Houd de profieltekst kort en eerlijk",
    body: "Beschrijf vooral wat je zoekt, waar je sterk in bent en welke werkhouding je meebrengt. Recruiters verwachten hier potentie, geen senior verhaal.",
  },
  {
    title: "4) Kies een simpele layout die je inhoud helpt",
    body: "Bij een eerste CV wint duidelijkheid bijna altijd van design. Een rustige template maakt je tekst serieuzer en makkelijker scanbaar.",
  },
  {
    title: "5) Maak daarna een versie per vacature of doelgroep",
    body: "Eerste cv maken betekent niet dat er maar één versie hoeft te zijn. Pas je titel, profiel en accenten aan voor stage, bijbaan of startersrol.",
  },
];

const firstCvSignals = [
  "Duidelijke functierichting of doelrol bovenaan.",
  "Opleiding, projecten en bijbanen slim gebruikt als bewijs.",
  "Korte profieltekst zonder opgeblazen claims.",
  "Rustige layout met secties die recruiters snel begrijpen.",
];

const proofIdeas = [
  {
    title: "Schoolprojecten",
    body: "Gebruik projecten waarbij je iets organiseerde, presenteerde, onderzocht of samen bouwde. Dat is vaak bruikbaarder dan je denkt.",
  },
  {
    title: "Bijbanen",
    body: "Ook een supermarkt-, horeca- of winkelbaan bewijst punctualiteit, klantcontact, tempo en verantwoordelijkheid.",
  },
  {
    title: "Vrijwilligerswerk",
    body: "Laat zien dat je initiatief neemt, taken oppakt en afspraken nakomt buiten school of werk.",
  },
  {
    title: "Sport en verenigingen",
    body: "Teamsport, bestuur, commissies of evenementen kunnen prima relevant zijn als ze iets zeggen over discipline of samenwerking.",
  },
];

const faqs = [
  {
    question: "Wat zet ik op mijn eerste cv zonder werkervaring?",
    answer:
      "Zet vooral opleiding, projecten, bijbanen, vrijwilligerswerk, vaardigheden en een korte profieltekst op je eerste CV. Recruiters zoeken hier vooral potentie en betrouwbaarheid.",
  },
  {
    question: "Moet mijn eerste cv 1 pagina zijn?",
    answer:
      "Ja, in de meeste gevallen is 1 pagina ideaal. Een eerste CV werkt het best als het compact, duidelijk en snel scanbaar blijft.",
  },
  {
    question: "Welke template werkt het best voor een eerste cv?",
    answer:
      "De Simpel-template is meestal de veiligste keuze. De Modern-template kan ook goed werken als je iets frissere uitstraling wilt zonder onrust.",
  },
  {
    question: "Kan ik met mijn eerste cv ook solliciteren op stage of bijbaan?",
    answer:
      "Ja. Juist daarom is het slim om vanuit een basisversie te werken en daarna kleine aanpassingen te maken voor stage, bijbaan of startersfunctie.",
  },
];

export const metadata: Metadata = {
  title: "Eerste CV Maken - Zonder Ervaring Toch Serieus Overkomen | WerkCV",
  description:
    "Eerste cv maken zonder veel werkervaring? Bouw een rustige, geloofwaardige eerste versie met school, projecten, bijbanen en een duidelijke profieltekst.",
  keywords: [
    "eerste cv maken",
    "eerste cv",
    "eerste curriculum vitae maken",
    "cv maken zonder ervaring",
    "eerste cv zonder werkervaring",
    "mijn eerste cv maken",
  ],
  alternates: {
    canonical: "https://werkcv.nl/eerste-cv-maken",
    languages: {
      "nl-NL": "https://werkcv.nl/eerste-cv-maken",
      "x-default": "https://werkcv.nl/eerste-cv-maken",
    },
  },
};

export default function EersteCvMakenPage() {
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
        name: "Eerste CV maken",
        item: "https://werkcv.nl/eerste-cv-maken",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Eerste CV maken in 5 stappen",
    description:
      "Praktische route voor starters die hun eerste geloofwaardige CV willen maken zonder veel werkervaring.",
    totalTime: "PT20M",
    step: firstCvSteps.map((step) => ({
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
              Starter-intentie
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Eerste CV maken zonder ervaring toch serieus en geloofwaardig
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Je eerste CV hoeft niet perfect of indrukwekkend lang te zijn. Het
              moet vooral laten zien dat je richting hebt, verantwoordelijkheid
              pakt en genoeg basis meebrengt om uitgenodigd te worden voor een
              stage, bijbaan of startersrol.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Maak je eerste CV
              </Link>
              <Link
                href="/cv-maken-student"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk student-route
              </Link>
            </div>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">
              Wat recruiters op een eerste CV willen zien
            </h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              {firstCvSignals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Stappenplan
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Zo maak je een sterk eerste CV zonder te overcompenseren
          </h2>
          <div className="mt-6 space-y-4">
            {firstCvSteps.map((step, index) => (
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

        <section className="mb-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                Aanbevolen templates
              </p>
              <h2 className="text-3xl font-black text-black">
                Templates die goed werken voor je eerste CV
              </h2>
            </div>
            <Link
              href="/templates"
              className="text-sm font-black text-black underline decoration-2 underline-offset-4"
            >
              Bekijk alle templates
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {featuredTemplates.map((template) => (
              <div
                key={template.id}
                className="flex h-full flex-col border-4 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  {template.nameDutch}
                </p>
                <h3 className="mt-2 text-xl font-black text-black">
                  {template.name}
                </h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                  {template.description}
                </p>
                <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
                  {templateUseCases[template.id]}
                </p>
                <div className="mt-auto pt-5">
                  <Link
                    href="/editor"
                    className="inline-block border-2 border-black bg-yellow-400 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-black"
                  >
                    Start nu
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          {proofIdeas.map((item) => (
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
              href: "/cv-maken-student",
              title: "CV maken student",
              body: "Gebruik deze route als je eerste CV vooral voor studie, stage of startersrollen bedoeld is.",
            },
            {
              href: "/stage-cv-maken",
              title: "Stage CV maken",
              body: "Handig als je eerste versie specifiek richting stage of afstudeerplek gaat.",
            },
            {
              href: "/cv-maken-16-jarige",
              title: "CV maken 16-jarige",
              body: "Sterke vervolgstap als leeftijd en bijbaancontext je zoekintentie bepalen.",
            },
            {
              href: "/cv-voorbeelden",
              title: "CV voorbeelden",
              body: "Vergelijk voorbeelden per beroep als je wilt zien hoe startersinformatie eruit kan zien in een echte layout.",
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
            Eerste CV maken draait om bewijs van potentie, niet om neppe senioriteit
          </h2>
          <p className="mt-4 max-w-3xl text-base font-medium leading-relaxed text-slate-200">
            Laat liever een rustige, eerlijke en heldere starter zien dan een CV
            dat grootser klinkt dan je profiel echt is. Richting, inzet en
            betrouwbaarheid winnen hier vaker dan bravoure.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/editor"
              className="border-4 border-white bg-yellow-400 px-5 py-3 text-base font-black text-black"
            >
              Start je eerste versie
            </Link>
            <Link
              href="/templates"
              className="border-4 border-white bg-transparent px-5 py-3 text-base font-black text-white"
            >
              Bekijk templates
            </Link>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-3xl font-black text-black">
            Veelgestelde vragen over eerste CV maken
          </h2>
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
