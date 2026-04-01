import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { templateList } from "@/lib/templates/registry";

const featuredTemplates = templateList.filter((template) =>
  ["professional", "classical", "formal", "ats"].includes(template.id),
);

const templateUseCases: Record<string, string> = {
  professional: "Breed inzetbaar wanneer je een rustige, moderne maar zakelijke basis wilt.",
  classical: "Past goed bij formele sectoren waar een tijdloze uitstraling sterker werkt dan een trendy layout.",
  formal: "Sterk voor finance, overheid, juridische rollen en andere functies waar je compact en professioneel wilt overkomen.",
  ats: "Praktisch wanneer je formele uitstraling wilt combineren met maximale scanbaarheid.",
};

const faqs = [
  {
    question: "Wat is een goede curriculum vitae template?",
    answer:
      "Een goede curriculum vitae template is rustig, professioneel en overzichtelijk. In de praktijk zijn formele of ATS-veilige layouts vaak de veiligste keuze.",
  },
  {
    question: "Is een curriculum vitae template anders dan een cv template?",
    answer:
      "Inhoudelijk meestal niet. De zoekterm curriculum vitae template is formeler, maar de recruiter-eisen blijven hetzelfde: scanbaarheid, rust en duidelijke secties.",
  },
  {
    question: "Welke template past bij formele Nederlandse sollicitaties?",
    answer:
      "Professioneel, Klassiek, Formeel en ATS-vriendelijk zijn meestal de beste startpunten voor formele Nederlandse sollicitaties.",
  },
  {
    question: "Kan ik een curriculum vitae template eerst gratis proberen?",
    answer:
      "Ja. Je kunt de editor en templates gratis gebruiken en pas betalen wanneer je de definitieve PDF wilt downloaden.",
  },
];

export const metadata: Metadata = {
  title: "Curriculum Vitae Template - Formele CV Layouts Vergelijken | WerkCV.nl",
  description:
    "Zoek je een curriculum vitae template? Vergelijk formele, rustige en ATS-vriendelijke CV-layouts voor Nederlandse sollicitaties en kies de beste template voor jouw rol.",
  keywords: [
    "curriculum vitae template",
    "curriculum vitae sjabloon",
    "formele cv template",
    "professionele curriculum vitae template",
    "curriculum vitae layout",
  ],
  alternates: {
    canonical: "https://werkcv.nl/curriculum-vitae-template",
    languages: {
      "nl-NL": "https://werkcv.nl/curriculum-vitae-template",
      "x-default": "https://werkcv.nl/curriculum-vitae-template",
    },
  },
};

export default function CurriculumVitaeTemplatePage() {
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
        name: "Curriculum Vitae Template",
        item: "https://werkcv.nl/curriculum-vitae-template",
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
            href="/templates"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            Bekijk templates
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-14">
        <section className="mb-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-slate-700">
              Intent: curriculum vitae template
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Curriculum vitae template kiezen voor een rustige, formele sollicitatie
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Deze zoekterm is formeler dan gewoon cv template, maar de behoefte is helder:
              een professionele layout die geloofwaardig oogt, goed scanbaar blijft en past
              bij Nederlandse sollicitaties. Daarom werkt een kleine set rustige templates hier beter
              dan tientallen drukke keuzes.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/templates"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Vergelijk formele templates
              </Link>
              <Link
                href="/curriculum-vitae-maken"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Eerst curriculum vitae maken
              </Link>
            </div>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Waar formele template-zoekers op letten</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <li>Rustige typografie en duidelijke sectiekoppen.</li>
              <li>Geen designruis die ten koste gaat van geloofwaardigheid.</li>
              <li>Voldoende ruimte voor profiel, werkervaring en opleiding.</li>
              <li>ATS-veilige structuur voor bredere inzetbaarheid.</li>
            </ul>
          </div>
        </section>

        <section className="mb-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredTemplates.map((template) => (
            <article
              key={template.id}
              className="flex h-full flex-col border-4 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            >
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                {template.nameDutch}
              </p>
              <h2 className="mt-2 text-xl font-black text-black">{template.name}</h2>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                {templateUseCases[template.id] ?? template.description}
              </p>
              <div className="mt-auto pt-5">
                <Link
                  href="/editor"
                  className="inline-block border-2 border-black bg-yellow-400 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-black"
                >
                  Gebruik in editor
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section className="mb-14 border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Vervolgstappen
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {[
              {
                href: "/curriculum-vitae-maken",
                title: "Curriculum vitae maken",
                body: "Gebruik deze route als je behalve templatekeuze ook hulp wilt bij inhoud en volgorde.",
              },
              {
                href: "/cv-maken-template",
                title: "CV maken template",
                body: "Breder template-overzicht als je minder formeel wilt vergelijken.",
              },
              {
                href: "/professioneel-cv-template",
                title: "Professioneel CV template",
                body: "Sterke volgende stap voor zakelijke functies waar rust en betrouwbaarheid centraal staan.",
              },
              {
                href: "/cv-opmaak-voorbeeld",
                title: "CV opmaak voorbeeld",
                body: "Controleer hoe een formele template samenwerkt met hierarchie, witruimte en scanbaarheid.",
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
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over curriculum vitae templates
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
                Klaar om een formele layout te kiezen?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Vergelijk templates en download pas wanneer je inhoud klopt
              </h2>
            </div>
            <Link
              href="/templates"
              className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
            >
              Bekijk templates
            </Link>
          </div>
        </section>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Footer />
    </div>
  );
}
