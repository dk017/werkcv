import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const sourceLinks = [
  {
    label: "CV.nl FAQ",
    href: "https://www.cv.nl/faq",
  },
  {
    label: "CV.nl algemene voorwaarden",
    href: "https://www.cv.nl/terms",
  },
];

const steps = [
  "Log in bij CV.nl en open het profielicoon rechtsboven.",
  "Ga naar Instellingen in je account.",
  "Gebruik daar de knop Opzeggen.",
  "Controleer daarna of je een bevestiging per e-mail hebt ontvangen.",
];

const faqs = [
  {
    question: "Hoe zeg je CV.nl op?",
    answer:
      "Volgens de officiele CV.nl FAQ log je in, ga je via het profielicoon naar Instellingen en gebruik je daar de knop Opzeggen. CV.nl zegt erbij dat je automatisch een bevestiging per e-mail ontvangt.",
  },
  {
    question: "Moet je voor de volgende periode opzeggen?",
    answer:
      "Ja. In de algemene voorwaarden van CV.nl staat dat je in ieder geval voor de dag van de nieuwe periode moet opzeggen om verlenging te voorkomen.",
  },
  {
    question: "Heeft CV.nl een gratis proefperiode?",
    answer:
      "Volgens de CV.nl FAQ en voorwaarden is het abonnement de eerste 14 dagen gratis, waarna maandelijks kosten in rekening worden gebracht.",
  },
  {
    question: "Waarom zoeken mensen op cv.nl opzeggen?",
    answer:
      "Deze zoekopdracht is meestal geen informatievraag alleen, maar een signaal dat iemand weg wil van een abonnement en openstaat voor een alternatief met een eenvoudiger prijsmodel.",
  },
];

export const metadata: Metadata = {
  title: "CV.nl Opzeggen - Officiele Stappen + Alternatief | WerkCV",
  description:
    "Zoek je hoe je CV.nl opzegt? Bekijk de officiele stappen uit de CV.nl FAQ, wat de voorwaarden zeggen over opzeggen en vergelijk daarna een alternatief zonder abonnement.",
  keywords: [
    "cv.nl opzeggen",
    "cv nl opzeggen",
    "cv.nl abonnement opzeggen",
    "abonnement cv.nl stoppen",
    "cv.nl account opzeggen",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-nl-opzeggen",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-nl-opzeggen",
      "x-default": "https://werkcv.nl/cv-nl-opzeggen",
    },
  },
};

export default function CvNlOpzeggenPage() {
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
        name: "CV.nl opzeggen",
        item: "https://werkcv.nl/cv-nl-opzeggen",
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
            href="/cv-maken-zonder-abonnement"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            Zonder abonnement
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-14">
        <section className="mb-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-slate-700">
              Intent: cv.nl opzeggen
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV.nl opzeggen: wat de officiele FAQ en voorwaarden zeggen
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Deze pagina vat samen wat CV.nl zelf publiceert over opzeggen. Dat maakt de intentie
              handig voor mensen die een lopend account willen stoppen en daarna willen vergelijken
              of een eenvoudiger prijsmodel beter past.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/cv-maken-zonder-abonnement"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Bekijk alternatief zonder abonnement
              </Link>
              <Link
                href="/cv-gids/werkcv-vs-cv-nl"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Vergelijk WerkCV vs CV.nl
              </Link>
            </div>
            <p className="mt-5 text-sm font-medium text-slate-600">
              Officiele bronnen gecheckt op 1 april 2026.
            </p>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Kernpunten uit de officiele bronnen</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <li>CV.nl zegt in de FAQ dat opzeggen via Instellingen in je account gaat.</li>
              <li>Volgens dezelfde FAQ ontvang je daarna automatisch een bevestiging per e-mail.</li>
              <li>CV.nl noemt in FAQ en voorwaarden een abonnement met 14 dagen gratis en daarna maandelijkse kosten.</li>
              <li>In de voorwaarden staat dat je in ieder geval voor de nieuwe periode moet opzeggen om verlenging te voorkomen.</li>
            </ul>
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Op basis van de CV.nl FAQ
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Stappen om CV.nl op te zeggen
          </h2>
          <div className="mt-6 space-y-4">
            {steps.map((step, index) => (
              <div key={step} className="flex gap-4">
                <div
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center border-3 border-black bg-[#FFFEF0] text-sm font-black text-black"
                  style={{ borderWidth: "3px" }}
                >
                  {index + 1}
                </div>
                <p className="pt-1 text-sm font-medium leading-relaxed text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Wat opvalt in de voorwaarden
            </p>
            <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-200">
              <p>
                In de voorwaarden staat dat het abonnement automatisch loopt vanaf het account en
                na 14 dagen vooraf maandelijks wordt afgeschreven.
              </p>
              <p>
                Ook staat daar dat je in ieder geval voor de dag van de nieuwe periode moet opzeggen
                om verlenging te voorkomen.
              </p>
              <p>
                Daarnaast vermelden de voorwaarden dat na einde van het abonnement rechten op
                sollicitatiebrieven en de vormgeving van gegenereerde CV&apos;s beperkt zijn, tenzij die
                rechten apart zijn afgekocht. Dat is een belangrijk verschil met een eenmalig model.
              </p>
            </div>
          </div>

          <div className="border-4 border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Relevante vervolgstappen
            </p>
            <div className="mt-4 space-y-4">
              {[
                {
                  href: "/cv-maken-zonder-abonnement",
                  title: "CV maken zonder abonnement",
                  body: "Gebruik deze route als je na opzeggen vooral een prijsmodel zonder maandelijkse verlenging zoekt.",
                },
                {
                  href: "/cv-gids/werkcv-vs-cv-nl",
                  title: "WerkCV vs CV.nl",
                  body: "Vergelijk prijsmodel, use case en sollicitatiefocus naast elkaar.",
                },
                {
                  href: "/beste-cv-maker-nederland",
                  title: "Beste CV maker Nederland",
                  body: "Brede vergelijking als je meer tools naast elkaar wilt afwegen.",
                },
                {
                  href: "/prijzen",
                  title: "WerkCV prijzen",
                  body: "Bekijk het eenmalige model van WerkCV als alternatief voor abonnementsplatformen.",
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
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Bronnen
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Officiele CV.nl pagina&apos;s
          </h2>
          <div className="mt-6 space-y-3">
            {sourceLinks.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="block border-2 border-black bg-white p-4 text-sm font-medium text-slate-700 transition-colors hover:bg-yellow-100"
              >
                <span className="font-black text-black">{source.label}</span>
                <span className="mt-1 block break-all">{source.href}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over CV.nl opzeggen
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
                Klaar met abonnementen?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Kijk of een eenmalig CV-model beter past bij jouw sollicitatieproces
              </h2>
            </div>
            <Link
              href="/cv-maken-zonder-abonnement"
              className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
            >
              Bekijk alternatief
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
