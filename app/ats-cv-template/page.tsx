import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getTemplateConfig } from "@/lib/templates/registry";

const atsTemplate = getTemplateConfig("ats");

const atsChecklist = [
  "Gebruik duidelijke koppen zoals Profiel, Werkervaring, Opleiding en Vaardigheden.",
  "Kies een enkel-koloms of zeer rustige layout zonder decoratieve blokken die tekst verstoppen.",
  "Verwerk keywords uit de vacature letterlijk in je werkervaring en vaardigheden.",
  "Exporteer als nette PDF nadat je de opmaak volledig hebt gecontroleerd.",
];

const commonMistakes = [
  "Te veel design-elementen die scanners verwarren.",
  "Vage functietitels zonder herkenbare zoekwoorden.",
  "Losse tekstvakken of tabellen uit Word die verschuiven bij export.",
  "Een CV dat mooi oogt, maar niet aansluit op de vacaturetaal.",
];

const faqs = [
  {
    question: "Wat is een ATS cv template?",
    answer:
      "Een ATS cv template is een layout die goed leesbaar blijft voor applicant tracking systems. Het ontwerp gebruikt duidelijke secties, voorspelbare koppen en weinig visuele afleiding, zodat software je gegevens correct kan uitlezen.",
  },
  {
    question: "Waarom is een ATS-vriendelijk cv belangrijk?",
    answer:
      "Veel werkgevers gebruiken sollicitatiesoftware om CV's te scannen op structuur en relevante keywords. Als je layout rommelig is of je tekst slecht uitleesbaar, kun je al verlies lijden voordat een recruiter je CV ziet.",
  },
  {
    question: "Is de ATS template van WerkCV gratis te gebruiken?",
    answer:
      "Ja. Je kunt de ATS template gratis kiezen, invullen en vergelijken in de editor. Je betaalt pas wanneer je je definitieve PDF wilt downloaden.",
  },
  {
    question: "Kan ik testen of mijn CV ATS-vriendelijk genoeg is?",
    answer:
      "Ja. Gebruik de ATS CV checker en de CV keywords tool om je inhoud te controleren op structuur, match met de vacature en ontbrekende zoekwoorden.",
  },
];

export const metadata: Metadata = {
  title: "ATS CV Template voor Nederlandse Sollicitaties | WerkCV",
  description:
    "Zoek je een ATS CV template? Kies een rustige ATS-vriendelijke template voor Nederlandse sollicitaties, start gratis in de editor en download pas als je CV klaar is.",
  keywords: [
    "ats cv template",
    "ats cv template nederland",
    "ats vriendelijke template",
    "ats cv sjabloon",
    "cv template voor ats",
    "ats template sollicitatie",
    "ats proof cv template",
    "ats resume template nederland",
  ],
  alternates: {
    canonical: "https://werkcv.nl/ats-cv-template",
    languages: {
      "nl-NL": "https://werkcv.nl/ats-cv-template",
      "x-default": "https://werkcv.nl/ats-cv-template",
    },
  },
};

export default function AtsCvTemplatePage() {
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
        name: "ATS CV Template",
        item: "https://werkcv.nl/ats-cv-template",
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
              Template-intent
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              ATS CV template voor Nederlandse sollicitaties
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Deze pagina is voor je templatekeuze. Met de {atsTemplate.nameDutch.toLowerCase()}e template van WerkCV kies je een rustige layout die recruiters snel kunnen scannen en
              sollicitatiesoftware goed kan uitlezen. Wil je eerst de regels achter een ATS-vriendelijke cv begrijpen of builders vergelijken, gebruik dan de gidslinks hieronder.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Start met ATS template
              </Link>
              <Link
                href="/tools/ats-cv-checker"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Test je CV
              </Link>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                href="/cv-tips/ats-vriendelijk-cv"
                className="border-2 border-black bg-white p-4 transition-colors hover:bg-yellow-100"
              >
                <p className="text-sm font-black text-black">Eerst de ATS-regels begrijpen</p>
                <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">
                  Lees hoe je je cv zelf ATS-vriendelijk maakt met de juiste opmaak, keywords en PDF-keuzes.
                </p>
              </Link>
              <Link
                href="/cv-gids/ats-vriendelijke-cv-builder-voor-nederlandse-vacatures"
                className="border-2 border-black bg-white p-4 transition-colors hover:bg-yellow-100"
              >
                <p className="text-sm font-black text-black">Builders vergelijken</p>
                <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">
                  Gebruik deze keuzehulp als je ATS ook wilt afwegen tegen andere builders en tooltypes.
                </p>
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Rustige ATS-layout",
                "Keywords beter scanbaar",
                "Gratis starten, later downloaden",
              ].map((item) => (
                <div
                  key={item}
                  className="border-3 border-black bg-white px-4 py-3 text-sm font-black text-black"
                  style={{ borderWidth: "3px" }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Waarom recruiters en ATS rustige templates verkiezen</h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              Veel gratis CV sjablonen zien er mooi uit, maar verliezen punten zodra ze door een parser worden gelezen. Onnodige grafische elementen, creatieve kolommen en slecht geplaatste
              tekstvakken maken je CV minder betrouwbaar voor software.
            </p>
            <div className="mt-5 border-t-4 border-black pt-5">
              <h3 className="text-sm font-black uppercase tracking-[0.18em] text-slate-700">
                Snelle definitie
              </h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                ATS staat voor Applicant Tracking System: software die CV&apos;s scant op structuur, relevante termen en leesbaarheid voordat een recruiter alles handmatig beoordeelt.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-14 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Template keuze
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Beste ATS-vriendelijke template op WerkCV
            </h2>
            <div className="mt-5 border-4 border-black bg-[#FFFEF0] p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
                Aanbevolen
              </p>
              <h3 className="mt-2 text-2xl font-black text-black">{atsTemplate.nameDutch}</h3>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                {atsTemplate.description}
              </p>
              <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
                <li>Enkel-koloms layout voor maximale leesbaarheid.</li>
                <li>Veilige structuur voor systemen die op vaste secties vertrouwen.</li>
                <li>Perfect als je solliciteert via grotere werkgevers, bureaus of corporate portals.</li>
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/editor"
                  className="border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black"
                >
                  Gebruik deze template
                </Link>
                <Link
                  href="/templates"
                  className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
                >
                  Vergelijk alle templates
                </Link>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Checklist
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Zo maak je je CV echt ATS-proof
            </h2>
            <div className="mt-6 space-y-4">
              {atsChecklist.map((item, index) => (
                <div key={item} className="flex gap-4">
                  <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center border-3 border-black bg-white text-sm font-black text-black"
                    style={{ borderWidth: "3px" }}
                  >
                    {index + 1}
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-slate-700">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              <Link
                href="/tools/cv-keywords"
                className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors hover:bg-yellow-100"
              >
                <p className="text-sm font-black text-black">CV keywords tool</p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                  Check of je functie-specifieke keywords overeenkomen met de vacaturetekst.
                </p>
              </Link>
              <Link
                href="/cv-gids/ats-vriendelijke-cv-builder-voor-nederlandse-vacatures"
                className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors hover:bg-yellow-100"
              >
                <p className="text-sm font-black text-black">Lees de ATS gids</p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                  Verdiep je in de regels achter ATS-vriendelijke builders, layouts en parsing voor Nederlandse sollicitaties.
                </p>
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Veelgemaakte fout
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Waarom veel “mooie” gratis templates juist minder goed presteren
            </h2>
            <ul className="mt-5 space-y-2 text-sm font-medium leading-relaxed text-slate-200">
              {commonMistakes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="border-4 border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Interne vervolgstappen
            </p>
            <div className="mt-4 space-y-4">
              {[
                {
                  href: "/cv-tips/ats-vriendelijk-cv",
                  title: "ATS-vriendelijke cv maken",
                  body: "Gebruik deze gids als je eerst de regels achter opmaak, keywords en PDF-keuzes wilt begrijpen.",
                },
                {
                  href: "/gratis-cv-template",
                  title: "Gratis CV template",
                  body: "Vergelijk ook bredere gratis template-opties als je nog tussen meerdere stijlen twijfelt.",
                },
                {
                  href: "/tools/ats-cv-checker",
                  title: "ATS CV checker",
                  body: "Laat je huidige CV scannen op leesbaarheid, structuur en verbeterpunten.",
                },
                {
                  href: "/prijzen",
                  title: "Prijzen",
                  body: "Controleer hoe het gratis-gebruiken en eenmalige downloadmodel precies werkt.",
                },
                {
                  href: "/cv-tips/cv-template-kiezen",
                  title: "CV template kiezen",
                  body: "Lees wanneer je beter voor ATS, modern of klassiek moet kiezen.",
                },
                {
                  href: "/cv-gids/welke-cv-builder-past-bij-jou-in-nederland",
                  title: "Welke CV builder past bij jou?",
                  body: "Gebruik deze keuzehulp als je ATS ook wilt afwegen tegen prijsmodel, tooltype en bredere sollicitatieflows.",
                },
                {
                  href: "/cv-gids/canva-vs-cv-builder-voor-sollicitaties",
                  title: "Canva vs CV builder",
                  body: "Handig als je twijfelt tussen visuele vrijheid en een rustiger, ATS-veilige sollicitatie-CV.",
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
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over ATS CV templates
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
                Klaar voor de volgende stap?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Bouw nu een ATS-vriendelijk CV in de editor
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Kies de ATS-template, verwerk je belangrijkste keywords en gebruik daarna de checker om te zien waar je nog winst kunt pakken.
              </p>
            </div>
            <Link
              href="/editor"
              className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
            >
              Start direct in editor
            </Link>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Footer />
    </div>
  );
}
