import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const sourceLinks = [
  {
    label: "CVMaker prijzen",
    href: "https://www.cvmaker.nl/prijzen",
  },
  {
    label: "CVMaker contact",
    href: "https://www.cvmaker.nl/contact",
  },
];

const steps = [
  "Log in bij CVMaker en klik rechtsboven op je naam.",
  "Open Accountinstellingen en ga naar Abonnement.",
  "Gebruik daar de knop om je abonnement direct te annuleren, of neem contact op met de helpdesk.",
  "Controleer de bevestiging per e-mail en let op de datum tot wanneer je nog toegang hebt.",
];

const faqs = [
  {
    question: "Hoe zeg je CVMaker op?",
    answer:
      "Volgens de officiele CVMaker prijzenpagina log je in, klik je rechtsboven op je naam, ga je naar Accountinstellingen en vervolgens naar Abonnement om direct te annuleren. CVMaker noemt ook de helpdesk als alternatief.",
  },
  {
    question: "Wat gebeurt er na opzeggen bij CVMaker?",
    answer:
      "De officiele prijzenpagina zegt dat je na opzeggen geen verdere bedragen meer hoeft te betalen en dat je toegang behoudt tot de datum die in je bevestigingsmail staat.",
  },
  {
    question: "Heeft CVMaker een proefperiode of abonnement?",
    answer:
      "Ja. De officiele prijzenpagina noemt CVMaker Pro voor EUR1,99 voor 14 dagen en daarna EUR21,99 per maand met automatische verlenging totdat je opzegt.",
  },
  {
    question: "Waarom zoeken mensen op cvmaker opzeggen?",
    answer:
      "Die zoekterm is meestal geen losse informatievraag, maar een signaal dat iemand een abonnementsplatform wil stoppen en openstaat voor een eenvoudiger alternatief zonder maandelijkse verlenging.",
  },
];

export const metadata: Metadata = {
  title: "CVMaker Opzeggen - Officiele Stappen + Alternatief | WerkCV",
  description:
    "Zoek je hoe je CVMaker opzegt? Bekijk de officiele stappen van CVMaker, wat de prijzenpagina zegt over annuleren en vergelijk daarna een alternatief zonder abonnement.",
  keywords: [
    "cvmaker opzeggen",
    "cvmaker abonnement opzeggen",
    "cv maker opzeggen",
    "cvmaker annuleren",
    "cvmaker stoppen",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cvmaker-opzeggen",
    languages: {
      "nl-NL": "https://werkcv.nl/cvmaker-opzeggen",
      "x-default": "https://werkcv.nl/cvmaker-opzeggen",
    },
  },
};

export default function CvmakerOpzeggenPage() {
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
        name: "CVMaker opzeggen",
        item: "https://werkcv.nl/cvmaker-opzeggen",
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
              Intent: cvmaker opzeggen
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              CVMaker opzeggen: wat de officiele prijzenpagina zegt
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Deze pagina vat samen wat CVMaker zelf publiceert over annuleren. Dat maakt de intentie
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
                href="/cv-gids/werkcv-vs-cvmaker"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Vergelijk WerkCV vs CVMaker
              </Link>
            </div>
            <p className="mt-5 text-sm font-medium text-slate-600">
              Officiele bronnen gecheckt op 1 april 2026.
            </p>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Kernpunten uit de officiele bronnen</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <li>CVMaker zegt dat opzeggen via Accountinstellingen &gt; Abonnement kan.</li>
              <li>De prijzenpagina noemt ook contact met de helpdesk als route om te annuleren.</li>
              <li>CVMaker noemt EUR1,99 voor 14 dagen en daarna EUR21,99 per maand met automatische verlenging.</li>
              <li>Na annuleren blijven kosten stoppen en houd je toegang tot de datum uit je bevestigingsmail.</li>
            </ul>
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Op basis van de CVMaker prijzenpagina
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Stappen om CVMaker op te zeggen
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
              Wat opvalt op de prijzenpagina
            </p>
            <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-200">
              <p>
                CVMaker koppelt annuleren direct aan het abonnementsmodel: EUR1,99 voor 14 dagen en
                daarna EUR21,99 per maand zolang Pro actief blijft.
              </p>
              <p>
                Dezelfde pagina zegt dat je zelf kunt annuleren via Accountinstellingen of via de
                helpdesk, wat een nuttig detail is als je niet meteen de juiste accountroute vindt.
              </p>
              <p>
                Ook belangrijk: CVMaker zegt dat je na annuleren geen extra bedragen meer betaalt,
                maar wel toegang houdt tot de datum in je bevestigingsmail. Dat is precies het punt
                waar veel mensen willen vergelijken met een eenmalig model.
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
                  href: "/cv-gids/werkcv-vs-cvmaker",
                  title: "WerkCV vs CVMaker",
                  body: "Vergelijk prijsmodel, use case en productscope naast elkaar.",
                },
                {
                  href: "/beste-cv-maker-nederland",
                  title: "Beste CV maker Nederland",
                  body: "Brede vergelijking als je meer CV-tools naast elkaar wilt afwegen.",
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
            Officiele CVMaker pagina&apos;s
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
            Veelgestelde vragen over CVMaker opzeggen
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
