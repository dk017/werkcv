import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getTemplateConfig } from "@/lib/templates/registry";

const elegantTemplate = getTemplateConfig("elegant");

const whenEnglishMakesSense = [
  "Je solliciteert bij een internationaal bedrijf in Nederland.",
  "De vacaturetekst is volledig in het Engels opgesteld.",
  "De voertaal in het team is Engels of hybride.",
  "Je richt je op expat-rollen, scale-ups of globale techbedrijven.",
];

const englishCvChecklist = [
  "Gebruik internationale functietitels die recruiters direct herkennen.",
  "Schrijf resultaatgericht in korte, duidelijke zinnen.",
  "Vermeld taalniveau (bijv. English C1, Dutch B1) concreet.",
  "Houd je format rustig zodat het ATS-proof blijft.",
];

const faqs = [
  {
    question: "Wanneer kies je voor een Engels cv template?",
    answer:
      "Kies een Engels CV wanneer de vacature, recruitercommunicatie of bedrijfstaal Engels is. Bij Nederlandse, lokaal georiënteerde vacatures werkt een Nederlands CV meestal beter.",
  },
  {
    question: "Is een Engels CV in Nederland geaccepteerd?",
    answer:
      "Ja, vooral bij internationale organisaties, techbedrijven en functies met veel Engelstalige communicatie. Controleer altijd de taal van de vacature en pas je CV daarop aan.",
  },
  {
    question: "Kan ik met WerkCV een Engels cv maken?",
    answer:
      "Ja. Je kunt de template kiezen, je content in het Engels invullen en direct een professioneel PDF-CV genereren. Je betaalt pas als je wilt downloaden.",
  },
  {
    question: "Hoe houd ik een Engels cv ATS-vriendelijk?",
    answer:
      "Gebruik duidelijke sectiekoppen, relevante Engelse keywords uit de vacature en vermijd onnodig complexe opmaak. De ATS-templates op WerkCV helpen daarbij.",
  },
];

export const metadata: Metadata = {
  title: "Engels CV Template - Professioneel English Resume Voor Nederland | WerkCV",
  description:
    "Zoek je een Engels CV template voor Nederland? Kies een professioneel English resume format, schrijf vacaturegericht en start gratis in de editor. Download pas als je tevreden bent.",
  keywords: [
    "engels cv template",
    "english cv template netherlands",
    "engels cv maken",
    "engels resume template",
    "cv in het engels",
    "international cv template",
    "ats english cv template",
  ],
  alternates: {
    canonical: "https://werkcv.nl/engels-cv-template",
    languages: {
      "nl-NL": "https://werkcv.nl/engels-cv-template",
      "en-NL": "https://werkcv.nl/en/dutch-cv-template",
      "x-default": "https://werkcv.nl/engels-cv-template",
    },
  },
};

export default function EngelsCvTemplatePage() {
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
        name: "Engels CV Template",
        item: "https://werkcv.nl/engels-cv-template",
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
              Taal-intent
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Engels CV template voor internationale vacatures in Nederland
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Voor internationale werkgevers werkt een Engels CV vaak beter dan een vertaalde Nederlandse versie. Met WerkCV kies je een professionele template, schrijf je direct in het Engels en
              houd je structuur duidelijk voor zowel recruiters als ATS-systemen.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Start met Engels CV
              </Link>
              <Link
                href="/en/dutch-cv-template"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                English guide
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Internationale stijl",
                "ATS-vriendelijke structuur",
                "Gratis starten in editor",
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
            <h2 className="text-xl font-black text-black">Wanneer kies je Engels boven Nederlands?</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              {whenEnglishMakesSense.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/cv-tips/cv-maken-in-het-engels"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Lees ook: CV maken in het Engels
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Template tip
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Beste template voor een professioneel English CV
            </h2>
            <div className="mt-5 border-4 border-black bg-[#FFFEF0] p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
                Aanbevolen
              </p>
              <h3 className="mt-2 text-2xl font-black text-black">{elegantTemplate.nameDutch}</h3>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                {elegantTemplate.description}
              </p>
              <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
                <li>Goede balans tussen professionaliteit en moderne uitstraling.</li>
                <li>Sterk voor internationale rollen waar presentatie belangrijk is.</li>
                <li>Makkelijk aan te passen naar een ATS-veiliger variant indien nodig.</li>
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
              Praktische checklist
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Zo maak je een sterk Engels CV voor Nederland
            </h2>
            <div className="mt-6 space-y-4">
              {englishCvChecklist.map((item, index) => (
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
                href="/ats-cv-template"
                className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors hover:bg-yellow-100"
              >
                <p className="text-sm font-black text-black">ATS CV template</p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                  Kies dit als je maximale zekerheid wilt bij ATS-scans en grote werkgevers.
                </p>
              </Link>
              <Link
                href="/tools/cv-keywords"
                className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors hover:bg-yellow-100"
              >
                <p className="text-sm font-black text-black">CV keywords tool</p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                  Check of je Engelse termen echt matchen met de vacaturewoorden.
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
              Letterlijk vertalen van Nederlands CV-taalgebruik
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-200">
              Internationale recruiters verwachten vaak een directere stijl: korter, concreter en resultaatgericht. Vermijd letterlijke vertalingen die onnatuurlijk klinken en focus op impact,
              cijfers en verantwoordelijkheden.
            </p>
          </div>
          <div className="border-4 border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Relevante vervolgstappen
            </p>
            <div className="mt-4 space-y-4">
              {[
                {
                  href: "/engels-cv-voorbeeld",
                  title: "Engels CV voorbeeld",
                  body: "Gebruik eerst een inhoudelijk voorbeeld als je vooral zoekt naar Engelse summary- en bulletstijl.",
                },
                {
                  href: "/sollicitatiebrief-in-engels",
                  title: "Sollicitatiebrief in Engels",
                  body: "Combineer je Engelse CV met een cover letter die past bij internationale sollicitaties.",
                },
                {
                  href: "/cv-maken-in-engels",
                  title: "CV maken in Engels",
                  body: "Gebruik de complete gids met Engelse samenvattingen, bullets en taalcorrecties.",
                },
                {
                  href: "/modern-cv-template",
                  title: "Modern CV template",
                  body: "Wil je een modernere uitstraling voor internationale functies? Vergelijk deze optie.",
                },
                {
                  href: "/gratis-cv-template",
                  title: "Gratis CV template",
                  body: "Start gratis en vergelijk meerdere stijlen voordat je een definitieve keuze maakt.",
                },
                {
                  href: "/en/guides/dutch-cv-for-expats",
                  title: "Dutch CV for expats",
                  body: "Engelse gids met context voor internationale kandidaten in Nederland.",
                },
                {
                  href: "/prijzen",
                  title: "Prijzen",
                  body: "Bekijk precies wanneer je betaalt en hoe het eenmalige model werkt.",
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
            Veelgestelde vragen over Engels CV templates
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
                Klaar voor internationale vacatures?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Bouw nu je Engelse CV in de editor
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Kies je template, schrijf scherp in het Engels en maak een versie die past bij internationale recruiters in Nederland.
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
