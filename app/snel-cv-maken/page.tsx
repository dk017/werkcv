import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { templateList } from "@/lib/templates/registry";

const featuredTemplates = templateList.filter((template) =>
  ["simple", "professional"].includes(template.id),
);

const templateUseCases: Record<string, string> = {
  simple:
    "Beste keuze als snelheid voorop staat en je zo min mogelijk designfrictie wilt tijdens het invullen.",
  professional:
    "Sterke optie als je snel klaar wilt zijn maar wel meteen een zakelijke uitstraling nodig hebt.",
};

const fastSteps = [
  {
    title: "1) Kies direct een rustige template in plaats van eindeloos vergelijken",
    body: "Als je snel een CV wilt, helpt een veilige standaard beter dan te veel opties. Simpel of Professioneel is dan meestal genoeg.",
  },
  {
    title: "2) Zet functietitel, profieltekst en laatste ervaring eerst neer",
    body: "Dat zijn de drie onderdelen die recruiters het snelst lezen en die het meeste verschil maken voor je eerste versie.",
  },
  {
    title: "3) Gebruik korte bullets in plaats van lange alinea's",
    body: "Snel cv maken lukt beter als je taken en resultaten in compacte regels opschrijft. Dat leest sneller en oogt meteen sterker.",
  },
  {
    title: "4) Maak eerst een verzendbare basis en verbeter daarna",
    body: "Perfectie kost tijd. Voor snelheid wil je eerst een degelijke sollicitatieversie hebben en pas daarna verfijnen per vacature.",
  },
  {
    title: "5) Download pas wanneer de kern klopt",
    body: "Controleer contactgegevens, functierichting en recente ervaring. Als die drie sterk zijn, is je snelle versie meestal al bruikbaar.",
  },
];

const speedSignals = [
  "Vaste structuur zonder lege opmaakkeuzes.",
  "Kerninformatie eerst, detailwerk later.",
  "Compacte bullets die recruiters direct kunnen scannen.",
  "Snelle basis die je later opnieuw kunt gebruiken.",
];

const timeBlocks = [
  {
    title: "5 minuten",
    body: "Template kiezen, functietitel zetten en profieltekst neerzetten.",
  },
  {
    title: "10 minuten",
    body: "Laatste werkervaring, opleiding en belangrijkste vaardigheden invullen.",
  },
  {
    title: "15 minuten",
    body: "Contactgegevens checken, volgorde nalopen en een eerste verzendbare versie afronden.",
  },
];

const faqs = [
  {
    question: "Hoe maak ik snel een cv zonder kwaliteit te verliezen?",
    answer:
      "Door de volgorde strak te houden: kies een rustige template, vul eerst functietitel, profieltekst en recente ervaring in, en werk daarna pas details uit.",
  },
  {
    question: "Welke template is het snelst om mee te werken?",
    answer:
      "De Simpel-template is het snelst als je weinig keuzes wilt. De Professioneel-template is bijna net zo snel, maar oogt direct wat zakelijker.",
  },
  {
    question: "Kan ik een cv in 15 minuten maken?",
    answer:
      "Een nette basisversie vaak wel. Zeker als je je laatste werkervaring en opleiding al helder hebt, kun je snel tot een verzendbare eerste versie komen.",
  },
  {
    question: "Is snel cv maken handig voor last-minute sollicitaties?",
    answer:
      "Ja. Juist dan helpt een vaste editorflow met rustige templates, zodat je geen tijd verliest aan opmaak of technische rompslomp.",
  },
];

export const metadata: Metadata = {
  title: "Snel CV Maken - In Korte Tijd Een Verzendbare Versie | WerkCV",
  description:
    "Snel cv maken zonder opmaakgedoe. Kies een rustige template, bouw in minuten een nette basisversie en download wanneer de kern klopt.",
  keywords: [
    "snel cv maken",
    "snel een cv maken",
    "vlug cv maken",
    "cv snel maken",
    "snelle cv builder",
    "in 10 minuten cv maken",
  ],
  alternates: {
    canonical: "https://werkcv.nl/snel-cv-maken",
    languages: {
      "nl-NL": "https://werkcv.nl/snel-cv-maken",
      "x-default": "https://werkcv.nl/snel-cv-maken",
    },
  },
};

export default function SnelCvMakenPage() {
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
        name: "Snel CV maken",
        item: "https://werkcv.nl/snel-cv-maken",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Snel CV maken in 5 stappen",
    description:
      "Praktische route voor sollicitanten die snel een bruikbare CV-versie nodig hebben.",
    totalTime: "PT15M",
    step: fastSteps.map((step) => ({
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
              Hoge-snelheid intentie
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Snel CV maken zonder dat het rommelig of gehaast oogt
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Snel cv maken gaat niet over haastige slordigheid, maar over een
              strakke volgorde. Kies een rustige template, zet de kerninformatie
              eerst neer en werk vanuit een versie die al binnen minuten serieus
              genoeg voelt om op verder te bouwen.
            </p>
            <p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-slate-600">
              Gebruik deze route als tijd je hoofdprobleem is. Voor het volledige
              traject rond inhoud, structuur en ATS-logica ga je daarna verder met
              de{" "}
              <Link
                href="/cv-maken"
                className="font-black text-black underline decoration-2 underline-offset-4"
              >
                hoofdgids CV maken
              </Link>
              .
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Start direct
              </Link>
              <Link
                href="/cv-maken"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk hoofdgids
              </Link>
            </div>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">
              Wat snelheid hier echt betekent
            </h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              {speedSignals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Snelheidsworkflow
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Zo kom je snel tot een verzendbare CV-versie
          </h2>
          <div className="mt-6 space-y-4">
            {fastSteps.map((step, index) => (
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

        <section className="mb-14 grid gap-5 md:grid-cols-3">
          {timeBlocks.map((item, index) => (
            <article
              key={item.title}
              className={`border-4 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] ${
                index === 1 ? "bg-yellow-400" : "bg-white"
              }`}
            >
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-700">
                {item.title}
              </p>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-800">
                {item.body}
              </p>
            </article>
          ))}
        </section>

        <section className="mb-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                Snelste templates
              </p>
              <h2 className="text-3xl font-black text-black">
                Twee templates waarmee je het snelst klaar bent
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

        <section className="mb-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              href: "/cv-maken",
              title: "CV maken",
              body: "Gebruik dit brede stappenplan als snelheid niet je enige vraag is en je inhoud ook scherper moet worden.",
            },
            {
              href: "/cv-maken-op-mobiel",
              title: "CV maken op mobiel",
              body: "Handig als je snel wilt reageren op een vacature terwijl je onderweg bent.",
            },
            {
              href: "/cv-maken-pdf",
              title: "CV maken PDF",
              body: "Rond je snelle versie daarna af tot een stabiele eind-PDF voor sollicitaties.",
            },
            {
              href: "/cv-opstellen",
              title: "CV opstellen",
              body: "Gebruik dit als je basis wel snel staat, maar structuur en volgorde nog beter moeten.",
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
            Snel werkt het best als je eerst de kern afmaakt en daarna pas poetst
          </h2>
          <p className="mt-4 max-w-3xl text-base font-medium leading-relaxed text-slate-200">
            Bij last-minute sollicitaties is een rustige, complete basisversie
            meestal waardevoller dan een half-af ontwerp waar te veel tijd in
            ging zitten. Snelheid wint hier via focus.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/editor"
              className="border-4 border-white bg-yellow-400 px-5 py-3 text-base font-black text-black"
            >
              Open editor
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
          <h2 className="text-3xl font-black text-black">
            Veelgestelde vragen over snel CV maken
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
