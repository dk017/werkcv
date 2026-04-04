import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const sourceLinks = [
  {
    label: "CVster contact",
    href: "https://cvster.nl/contact",
  },
  {
    label: "CVster help: hoe zeg ik mijn account op?",
    href: "https://help.cvster.nl/nl/articles/3831424",
  },
  {
    label: "CVster help: hoe werkt facturering?",
    href: "https://help.cvster.nl/nl/articles/3832256",
  },
];

const steps = [
  "Open CVster en ga rechtsboven naar Account.",
  "Ga naar Accountinstellingen en kies daar Annuleer abonnement.",
  "Kun je niet inloggen? Gebruik dan de contactpagina van CVster om je account op te zoeken en alsnog te annuleren.",
  "Controleer de bevestiging per e-mail en let op tot wanneer premium nog actief blijft.",
];

const faqs = [
  {
    question: "Hoe zeg je CVster op?",
    answer:
      "Volgens de officiele help-pagina kun je in de app via Accountinstellingen je abonnement annuleren. CVster zegt ook dat je dit via de contactpagina kunt regelen als je niet kunt inloggen.",
  },
  {
    question: "Wat gebeurt er na opzeggen bij CVster?",
    answer:
      "CVster zegt dat je premium na annuleren nog actief blijft tot 30 dagen na je laatste maandbetaling of tot 7 dagen na je laatste proefperiodebetaling. Daarna schakelt het account terug naar gratis.",
  },
  {
    question: "Heeft CVster een gratis account na opzeggen?",
    answer:
      "Ja. Volgens de help-pagina kun je na annuleren nog steeds inloggen, je CV bekijken en verder gebruiken binnen de gratis accountmogelijkheden.",
  },
  {
    question: "Heeft CVster een proefperiode?",
    answer:
      "Ja. De officiele facturatie-uitleg zegt dat een proefperiode na 7 dagen automatisch wordt omgezet in een premiumabonnement als je niet op tijd annuleert. CVster zegt er ook bij dat prijzen kunnen verschillen per regio of ouder prijsmodel.",
  },
];

export const metadata: Metadata = {
  title: "CVster Opzeggen - Officiele Stappen + Alternatief | WerkCV",
  description:
    "Zoek je hoe je CVster opzegt? Bekijk de officiele stappen van CVster, wat het helpcentrum zegt over annuleren en vergelijk daarna een alternatief zonder abonnement.",
  keywords: [
    "cvster opzeggen",
    "cvster abonnement opzeggen",
    "cvster annuleren",
    "cvster stoppen",
    "cvster premium opzeggen",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cvster-opzeggen",
    languages: {
      "nl-NL": "https://werkcv.nl/cvster-opzeggen",
      "x-default": "https://werkcv.nl/cvster-opzeggen",
    },
  },
};

export default function CvsterOpzeggenPage() {
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
        name: "CVster opzeggen",
        item: "https://werkcv.nl/cvster-opzeggen",
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
              Intent: cvster opzeggen
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              CVster opzeggen: wat het officiele helpcentrum zegt
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Deze pagina vat samen wat CVster zelf publiceert over annuleren. Dat maakt de intentie
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
                href="/cv-gids/werkcv-vs-cvster"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Vergelijk WerkCV vs CVster
              </Link>
            </div>
            <p className="mt-5 text-sm font-medium text-slate-600">
              Officiele bronnen gecheckt op 1 april 2026.
            </p>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Kernpunten uit de officiele bronnen</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <li>CVster zegt dat opzeggen via Accountinstellingen kan.</li>
              <li>Kun je niet inloggen, dan noemt CVster de contactpagina als alternatieve route.</li>
              <li>Na annuleren blijft premium nog actief tot het einde van de lopende betaalperiode of proefperiode.</li>
              <li>Daarna schakelt het account terug naar gratis en kun je nog steeds inloggen.</li>
            </ul>
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Op basis van het CVster helpcentrum
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Stappen om CVster op te zeggen
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
              Wat opvalt in het helpcentrum
            </p>
            <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-200">
              <p>
                CVster maakt annuleren relatief praktisch: volgens het helpcentrum kun je het zowel
                in je account als via de contactpagina regelen als je niet kunt inloggen.
              </p>
              <p>
                Ook belangrijk is wat er na annuleren gebeurt. CVster zegt expliciet dat premium niet
                direct verdwijnt, maar nog doorloopt tot het einde van je laatste maand- of proefbetaling.
              </p>
              <p>
                De officiele facturatie-uitleg zegt daarnaast dat een proefperiode na 7 dagen automatisch
                overgaat in premium als je niet op tijd annuleert. CVster zegt er wel bij dat prijzen per
                regio of ouder prijsmodel kunnen verschillen, dus controleer altijd je eigen checkoutdetails.
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
                  href: "/cv-gids/werkcv-vs-cvster",
                  title: "WerkCV vs CVster",
                  body: "Vergelijk prijsmodel, use case en suite-omvang naast elkaar.",
                },
                {
                  href: "/beste-cv-maker-nederland",
                  title: "Beste CV maker Nederland",
                  body: "Brede vergelijking als je meer CV-tools naast elkaar wilt afwegen.",
                },
                {
                  href: "/prijzen",
                  title: "WerkCV prijzen",
                  body: "Bekijk het eenmalige model van WerkCV als alternatief voor proef- en premiumplatformen.",
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
            Officiele CVster pagina&apos;s
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
            Veelgestelde vragen over CVster opzeggen
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
                Klaar met proef- en premiummodellen?
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
