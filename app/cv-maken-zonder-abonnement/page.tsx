import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { comparisonRows, faqs } from "./content";

const pageUrl = "https://werkcv.nl/cv-maken-zonder-abonnement";

export const metadata: Metadata = {
  title: {
    absolute: "CV Maken Eenmalig Betalen? Geen Abonnement | WerkCV",
  },
  description:
    "Zoek je een CV builder zonder abonnement? Vergelijk WerkCV met CVmaker, CV.nl en CVster. Start gratis en betaal bij WerkCV eenmalig €4,99 per CV.",
  keywords: [
    "cv maken eenmalig betalen",
    "cv maken zonder abonnement",
    "cv eenmalig betalen",
    "cv builder zonder abonnement",
    "geen abonnement cv maker",
  ],
  alternates: {
    canonical: pageUrl,
    languages: {
      "nl-NL": pageUrl,
      "x-default": pageUrl,
    },
  },
  openGraph: {
    title: "CV Maken Eenmalig Betalen? Geen Abonnement | WerkCV",
    description:
      "Zoek je een CV builder zonder abonnement? Vergelijk WerkCV met CVmaker, CV.nl en CVster. Start gratis en betaal bij WerkCV eenmalig €4,99 per CV.",
    url: pageUrl,
    siteName: "WerkCV",
    locale: "nl_NL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "WerkCV - CV maken met eenmalig betalen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CV Maken Eenmalig Betalen? Geen Abonnement | WerkCV",
    description:
      "Zoek je een CV builder zonder abonnement? Vergelijk WerkCV met CVmaker, CV.nl en CVster. Start gratis en betaal bij WerkCV eenmalig €4,99 per CV.",
    images: ["/opengraph-image"],
  },
};

export default function CvMakenZonderAbonnementPage() {
  return (
    <div className="min-h-screen bg-[#FFFEF0]">
      <FAQJsonLd questions={[...faqs]} />

      <header className="border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-black">
              Werk<span className="bg-yellow-400 px-1">CV</span>.nl
            </span>
          </Link>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/prijzen"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              Bekijk prijsmodel
            </Link>
            <Link
              href="/editor"
              className="border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black"
            >
              Start gratis
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "CV maken eenmalig betalen", href: "/cv-maken-zonder-abonnement" },
            ]}
          />
        </div>

        <section className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {["Eenmalig €4,99", "Geen abonnement", "Later opnieuw downloaden", "ATS-vriendelijk"].map((badge) => (
                <span
                  key={badge}
                  className="border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-black"
                >
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV maken met eenmalig betalen zonder abonnement
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Je zoekt geen gratis proefperiode die later verandert in een maandabonnement. Je zoekt een CV-builder waarmee je je CV maakt, een keer betaalt en klaar bent. WerkCV is gebouwd voor precies dat moment: start gratis, betaal pas €4,99 bij je eerste PDF-download en open datzelfde CV later opnieuw zonder extra kosten of opzeggedoe.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Start gratis in de editor
              </Link>
              <Link
                href="/templates"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Vergelijk templates
              </Link>
            </div>

            <div className="mt-8 overflow-x-auto border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="border-b-4 border-black bg-[#FFF4D6] px-4 py-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
                  Direct vergelijken
                </p>
                <h2 className="mt-1 text-2xl font-black text-black">
                  WerkCV vs CVmaker vs CV.nl vs CVster
                </h2>
                <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
                  Als je al weet dat je geen abonnement wilt, gaat de keuze meestal over prijsmodel, opnieuw kunnen downloaden en hoeveel gedoe je later nog hebt.
                </p>
              </div>
              <table className="min-w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-black text-white">
                    {["", "WerkCV", "CVmaker", "CV.nl", "CVster"].map((heading) => (
                      <th
                        key={heading || "feature"}
                        className="border-b-2 border-white/20 px-4 py-3 text-left font-black"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row[0]} className="odd:bg-[#FFF9D9]">
                      {row.map((cell, index) => (
                        <td
                          key={`${row[0]}-${cell}`}
                          className={`border-t-2 border-black px-4 py-3 align-top ${
                            index === 0 ? "font-black text-black" : "font-medium text-slate-700"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="border-t-2 border-black bg-[#FFF4D6] px-4 py-3 text-xs font-medium text-slate-600">
                Indicatieve vergelijking op basis van publieke prijsmodellen. Controleer actuele voorwaarden altijd zelf voordat je kiest.
              </p>
            </div>
          </div>

          <aside className="h-fit border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Waarom deze pagina converteert
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              De intentie is niet gratis, maar eerlijk geprijsd
            </h2>
            <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <p>Deze zoekopdracht komt van mensen die willen betalen, maar niet vast willen zitten aan een maandbedrag voor een tijdelijke tool.</p>
              <p>WerkCV sluit daar direct op aan: eerst bouwen, daarna pas betalen, en geen automatische verlenging die blijft doorlopen.</p>
              <p>Zo past het prijsmodel beter bij hoe sollicitanten een CV-builder echt gebruiken: intensief voor even, niet als doorlopend abonnement.</p>
            </div>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/cv-gids/beste-cv-builder-zonder-abonnement"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Vergelijk ook builders zonder abonnement
              </Link>
            </div>
          </aside>
        </section>

        <section className="mb-12 grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Betaal alleen als je CV echt klaar is",
              body: "Schrijf, herschrijf en vergelijk templates eerst gratis. De betaling zit alleen op de PDF-download van het document dat je wilt versturen.",
            },
            {
              title: "Geen opzegstress of verborgen verlenging",
              body: "Je hoeft nergens een maandplan stop te zetten. Voor hetzelfde betaalde CV kun je later terugkomen, bewerken en opnieuw downloaden zonder extra kosten.",
            },
            {
              title: "Zelfde kwaliteit, beter prijsmodel",
              body: "Het eindresultaat hangt af van templates, ATS-veiligheid en gebruiksgemak. WerkCV koppelt die kwaliteit aan een prijsmodel dat logischer voelt voor Nederlandse sollicitanten.",
            },
          ].map((card) => (
            <article
              key={card.title}
              className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            >
              <h2 className="text-xl font-black text-black">{card.title}</h2>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{card.body}</p>
            </article>
          ))}
        </section>

        <section className="mb-12 border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
            Handige vervolgroutes
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {[
              {
                href: "/prijzen",
                title: "Bekijk precies hoe het prijsmodel werkt",
                body: "Ga naar prijzen als je wilt zien wat je krijgt voor €4,99 en wanneer je precies betaalt.",
              },
              {
                href: "/templates",
                title: "Vergelijk ATS-vriendelijke templates",
                body: "Gebruik eerst de template-overzichtspagina als je wilt zien welke layout het best past bij jouw vacaturetype.",
              },
              {
                href: "/cv-maken",
                title: "Lees de hoofdgids over CV maken",
                body: "Handig als je behalve het prijsmodel ook je inhoud, opbouw en ATS-aanpak wilt aanscherpen.",
              },
              {
                href: "/gratis-cv-maken",
                title: "Gratis starten en later beslissen",
                body: "Goede vervolgstap voor bezoekers die eerst zonder drempel willen bouwen en pas later over de PDF beslissen.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block border-2 border-white bg-white/10 p-4 transition-colors hover:bg-white hover:text-black"
              >
                <p className="text-sm font-black">{item.title}</p>
                <p className="mt-1 text-sm font-medium leading-relaxed text-slate-200 hover:text-slate-700">
                  {item.body}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over cv maken met eenmalig betalen
          </h2>
          <div className="mx-auto mt-8 max-w-4xl space-y-4">
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
                Klaar om zonder abonnement te starten?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Bouw gratis, betaal later eenmalig en hou daarna toegang tot hetzelfde CV
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Dat maakt WerkCV logisch voor tijdelijke sollicitatie-intentie: je betaalt voor een resultaat, niet voor een maandabonnement.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Open editor
              </Link>
              <Link
                href="/templates"
                className="inline-block border-4 border-black bg-black px-5 py-3 text-base font-black text-white"
              >
                Bekijk templates
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
