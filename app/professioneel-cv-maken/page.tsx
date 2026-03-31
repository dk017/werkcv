import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { templateList } from "@/lib/templates/registry";

const featuredTemplates = templateList.filter((template) =>
  ["professional", "formal", "ats"].includes(template.id),
);

const templateUseCases: Record<string, string> = {
  professional:
    "Sterke standaardkeuze als je een zakelijke, rustige en breed inzetbare uitstraling zoekt.",
  formal:
    "Handig voor management, consultancy en functies waar volwassen uitstraling belangrijker is dan creatief design.",
  ats: "Slim als je professionele uitstraling wilt combineren met maximale scanbaarheid en standaardsecties.",
};

const professionalSteps = [
  {
    title: "1) Kies een rustige template met duidelijke hiërarchie",
    body: "Een professioneel CV begint met een layout die orde, rust en geloofwaardigheid uitstraalt. Rust werkt vaker beter dan opvallend design.",
  },
  {
    title: "2) Gebruik een functietitel die meteen richting geeft",
    body: "Laat direct zien op welke rol je mikt. Dat maakt je profieltekst, ervaring en skills meteen coherenter.",
  },
  {
    title: "3) Schrijf zakelijk, kort en concreet",
    body: "Een professioneel CV is niet stijver, maar duidelijker. Vermijd vage woorden en laat zien wat je deed, verbeterde of opleverde.",
  },
  {
    title: "4) Houd je werkervaring resultaatgericht",
    body: "Recruiters lezen liever drie scherpe bullets met impact dan een lang blok taken zonder context of prioriteit.",
  },
  {
    title: "5) Laat de PDF er net zo rustig uitzien als de editor",
    body: "Controleer marges, witruimte en koppen in de eindversie. Professioneel betekent ook: stabiel en verzorgd in PDF.",
  },
];

const professionalSignals = [
  "Duidelijke functietitel en zakelijke profieltekst.",
  "Rustige kleurkeuze en voorspelbare secties.",
  "Werkervaring met resultaten, context en verantwoordelijkheid.",
  "Geen overbodige design-elementen die afleiden van de inhoud.",
];

const mistakes = [
  {
    title: "Te veel design om professioneel te lijken",
    body: "Veel kandidaten denken dat meer grafische elementen professioneler ogen. In werkelijkheid voelt dat vaak juist druk en minder senior.",
  },
  {
    title: "Een profieltekst vol containerbegrippen",
    body: "Woorden als resultaatgericht, proactief en communicatief tellen pas als je ze koppelt aan echte context of bewijs.",
  },
  {
    title: "Werkervaring beschrijven als takenlijst",
    body: "Professioneel oogt niet wat je uitvoerde, maar hoe helder je impact, verantwoordelijkheid en scope benoemt.",
  },
  {
    title: "Te veel kleur- of stijlsprongen",
    body: "Een professioneel CV hoort visueel consistent te zijn. Eén stijlrichting werkt beter dan meerdere accenten tegelijk.",
  },
];

const faqs = [
  {
    question: "Wat maakt een cv professioneel?",
    answer:
      "Een professioneel CV combineert rustige opmaak, duidelijke secties, een geloofwaardige profieltekst en werkervaring die concreet laat zien wat je hebt gedaan en bereikt.",
  },
  {
    question: "Welke template is het meest professioneel?",
    answer:
      "Voor de meeste functies zijn de Professioneel-, Formeel- en ATS-templates de veiligste keuzes. Ze geven structuur zonder onnodige visuele ruis.",
  },
  {
    question: "Moet een professioneel cv saai zijn?",
    answer:
      "Nee. Professioneel betekent vooral helder, verzorgd en doelgericht. Een subtiele stijl of accentkleur kan prima, zolang de inhoud dominant blijft.",
  },
  {
    question: "Is een professioneel cv ook ATS-vriendelijk?",
    answer:
      "Ja, zolang je vaste secties, gewone koppen en een rustige layout gebruikt. Professionele opmaak en ATS-veiligheid gaan meestal goed samen.",
  },
];

export const metadata: Metadata = {
  title: "Professioneel CV Maken - Rustig, Zakelijk en Recruiter-proof | WerkCV.nl",
  description:
    "Professioneel cv maken? Kies een rustige zakelijke template, schrijf concreet en bouw een recruiter-proof CV dat ook ATS goed kan lezen.",
  keywords: [
    "professioneel cv maken",
    "professioneel cv",
    "zakelijk cv maken",
    "professioneel curriculum vitae",
    "professionele cv template",
    "professioneel cv opmaken",
  ],
  alternates: {
    canonical: "https://werkcv.nl/professioneel-cv-maken",
    languages: {
      "nl-NL": "https://werkcv.nl/professioneel-cv-maken",
      "x-default": "https://werkcv.nl/professioneel-cv-maken",
    },
  },
};

export default function ProfessioneelCvMakenPage() {
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
        name: "Professioneel CV maken",
        item: "https://werkcv.nl/professioneel-cv-maken",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Professioneel CV maken in 5 stappen",
    description:
      "Praktische aanpak voor een rustig, zakelijk en recruiter-proof CV.",
    totalTime: "PT25M",
    step: professionalSteps.map((step) => ({
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
              Professionele stijl-intentie
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Professioneel CV maken zonder dat het stijf of saai wordt
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Professioneel cv maken draait niet om zwaardere woorden of meer
              design, maar om rust, duidelijke keuzes en geloofwaardige inhoud.
              Deze route helpt je om een zakelijke indruk te maken zonder dat je
              CV generiek of afstandelijk voelt.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Maak je CV professioneel
              </Link>
              <Link
                href="/templates"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk rustige templates
              </Link>
            </div>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Signalen van een professioneel CV</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              {professionalSignals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/professioneel-cv-voorbeeld"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Bekijk eerst een professioneel CV voorbeeld
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Stappenplan
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Zo maak je je CV professioneler in plaats van formeler
          </h2>
          <div className="mt-6 space-y-4">
            {professionalSteps.map((step, index) => (
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
                Beste templates voor een professionele uitstraling
              </h2>
            </div>
            <Link
              href="/templates"
              className="text-sm font-black text-black underline decoration-2 underline-offset-4"
            >
              Bekijk alle templates
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
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
          {mistakes.map((item) => (
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
              href: "/professioneel-cv-template",
              title: "Professioneel CV template",
              body: "Ga direct naar de zakelijke templatekeuze als je minder wilt experimenteren en sneller wilt afronden.",
            },
            {
              href: "/professioneel-cv-voorbeeld",
              title: "Professioneel CV voorbeeld",
              body: "Vergelijk eerst hoe een rustige zakelijke versie inhoudelijk is opgebouwd.",
            },
            {
              href: "/cv-opmaken",
              title: "CV opmaken",
              body: "Verfijn daarna witruimte, koppen en PDF-rust voor een sterkere eindversie.",
            },
            {
              href: "/ats-cv-template",
              title: "ATS CV template",
              body: "Kies deze route als professionaliteit en scanbaarheid allebei zwaar wegen.",
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
            Professioneel betekent: duidelijker kiezen, niet meer toevoegen
          </h2>
          <p className="mt-4 max-w-3xl text-base font-medium leading-relaxed text-slate-200">
            De meeste CV&apos;s worden niet zwakker door te weinig informatie, maar
            door te veel ruis. Kies een rustige template, schrijf scherper en laat
            de PDF professioneel ogen zonder onnodige opsmuk.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/editor"
              className="border-4 border-white bg-yellow-400 px-5 py-3 text-base font-black text-black"
            >
              Start professioneel
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
            Veelgestelde vragen over professioneel CV maken
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
