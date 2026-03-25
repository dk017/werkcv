import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import SectionIntentLinks from "@/components/seo/SectionIntentLinks";
import { templateList } from "@/lib/templates/registry";

const featuredTemplates = templateList.filter((template) =>
  ["professional", "ats", "simple", "modern"].includes(template.id),
);

const layoutRules = [
  {
    title: "1) Start met een duidelijke hiërarchie",
    body: "Gebruik één duidelijke titel, vaste sectiekoppen en genoeg witruimte. Recruiters moeten in enkele seconden de kern kunnen scannen.",
  },
  {
    title: "2) Werk met consistente sectievolgorde",
    body: "Persoonlijke gegevens, profiel, werkervaring, opleiding en vaardigheden vormen meestal de beste basisvolgorde voor Nederlandse sollicitaties.",
  },
  {
    title: "3) Houd tekstblokken kort en scanbaar",
    body: "Gebruik korte alinea's en bullets met impact. Vermijd lange paragrafen die de leesbaarheid van je CV-opmaak verlagen.",
  },
  {
    title: "4) Gebruik subtiele stijl, niet visuele ruis",
    body: "Kies een rustige kleuraccenten en heldere typografie. Te veel iconen, grafieken of decoratie leidt af van je inhoud.",
  },
  {
    title: "5) Controleer ATS-veiligheid",
    body: "Gebruik standaard sectietitels en stabiele PDF-opmaak. Vermijd complexe tabellen en design-elementen die parsing kunnen verstoren.",
  },
];

const wrongVsRight = [
  {
    wrong: "Vier verschillende lettertypes en wisselende kopgroottes.",
    right: "Eén primair lettertype, vaste kopstijl en consistente spacing.",
  },
  {
    wrong: "Lange werkervaringstekst zonder bullets.",
    right: "Korte bullets met actie + resultaat + context.",
  },
  {
    wrong: "Volle pagina zonder witruimte en marges.",
    right: "Rustige layout met duidelijke sectieblokken en ademruimte.",
  },
  {
    wrong: "Mooie opmaak, maar geen duidelijke rolfocus.",
    right: "Opmaak ondersteunt inhoud: functietitel, profiel en recente impact direct zichtbaar.",
  },
];

const roleLayoutAdvice = [
  {
    title: "Zakelijke/administratieve rollen",
    advice:
      "Gebruik een klassieke, rustige opmaak met focus op betrouwbaarheid, structuur en foutloze presentatie.",
  },
  {
    title: "Tech en productrollen",
    advice:
      "Houd de layout clean en laat stack, projecten en impact duidelijk uitkomen. Gebruik geen overdesign.",
  },
  {
    title: "Starter en carrièreswitch",
    advice:
      "Leg visuele nadruk op profieltekst, vaardigheden en relevante projecten zodat je potentie direct zichtbaar is.",
  },
];

const faqs = [
  {
    question: "Wat is een goede cv opmaak voorbeeld voor 2026?",
    answer:
      "Een goede opmaak is scanbaar, rustig en consistent. De layout moet je inhoud ondersteunen, niet overschreeuwen.",
  },
  {
    question: "Is mooie cv opmaak belangrijker dan inhoud?",
    answer:
      "Nee. Opmaak helpt alleen als je inhoud sterk is. Recruiters beslissen op relevantie en bewijs, niet op decoratie.",
  },
  {
    question: "Kan ik cv opmaak in Word doen?",
    answer:
      "Dat kan, maar het kost vaak meer tijd en geeft sneller layoutproblemen. Een editor met vaste templates is meestal sneller en consistenter.",
  },
  {
    question: "Welke cv opmaak werkt het best voor ATS?",
    answer:
      "Een simpele structuur met standaard secties, duidelijke koppen en beperkte visuele complexiteit werkt meestal het beste.",
  },
  {
    question: "Hoeveel kleuren mag ik gebruiken in mijn cv-opmaak?",
    answer:
      "Meestal is één hoofdkleur met neutrale basis voldoende. Te veel kleuren maken je CV vaak onrustig.",
  },
];

const layoutIntentLinks = [
  {
    href: "/cv-opmaken",
    label: "CV opmaken zonder layoutstress",
    description: "Gebruik een route die draait om structuur, witruimte en recruiter-proof opmaak.",
  },
  {
    href: "/cv-maken-template",
    label: "CV maken met template",
    description: "Start met een template in plaats van alles handmatig op te maken.",
  },
  {
    href: "/ats-cv-template",
    label: "ATS CV template kiezen",
    description: "Handig als je layout ook softwareveilig moet blijven voor sollicitatiesystemen.",
  },
  {
    href: "/cv-maken-in-word",
    label: "CV maken in Word vergelijken",
    description: "Zie wanneer Word meer opmaakfrictie geeft dan een vaste templateflow.",
  },
  {
    href: "/cv-maken-pdf",
    label: "CV als stabiele PDF afronden",
    description: "Zet je definitieve opmaak om in een sollicitatieklare PDF zonder layoutverschuiving.",
  },
];

const sources = [
  {
    label: "Indeed NL - CV opmaak en structuur advies",
    href: "https://nl.indeed.com/carrieregids/cv-motivatiebrief/cv-opmaak",
  },
  {
    label: "Prospects UK - CV formatting best practices",
    href: "https://www.prospects.ac.uk/careers-advice/cvs-and-cover-letters/how-to-write-a-cv",
  },
  {
    label: "Resume.io - Resume layout patterns",
    href: "https://resume.io/resume-examples",
  },
];

export const metadata: Metadata = {
  title: "CV Opmaak Voorbeeld - Rustige, Professionele Layout Tips | WerkCV.nl",
  description:
    "Zoek je een CV opmaak voorbeeld? Bekijk goede en slechte opmaak, praktische layoutregels en ATS-veilige keuzes. Start direct in de editor.",
  keywords: [
    "cv opmaak voorbeeld",
    "voorbeeld cv opmaak",
    "opmaak cv voorbeeld",
    "cv opmaken",
    "cv opmaak",
    "opmaak cv",
    "cv opmaken voorbeeld",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-opmaak-voorbeeld",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-opmaak-voorbeeld",
      "x-default": "https://werkcv.nl/cv-opmaak-voorbeeld",
    },
  },
};

export default function CvOpmaakVoorbeeldPage() {
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
        name: "CV Opmaak Voorbeeld",
        item: "https://werkcv.nl/cv-opmaak-voorbeeld",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "CV opmaak verbeteren in 5 stappen",
    description: "Praktische stappen om CV-opmaak professioneel en scanbaar te maken.",
    totalTime: "PT30M",
    step: layoutRules.map((rule) => ({
      "@type": "HowToStep",
      name: rule.title,
      text: rule.body,
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
              Intent: cv opmaak voorbeeld
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV opmaak voorbeeld dat professioneel oogt en direct scanbaar is
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Een goede CV-opmaak maakt het verschil tussen &quot;onduidelijk&quot; en &quot;direct overtuigend&quot;. Op deze pagina zie je wat werkt, wat niet werkt, en hoe je opmaak je inhoud sterker maakt zonder
              design-overload. Gebruik de voorbeelden hieronder als layout-checklist voordat je solliciteert.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Pas je opmaak direct toe
              </Link>
              <Link
                href="/cv-opstellen"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Eerst structuur bepalen
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Goed vs fout opmaakvoorbeelden",
                "ATS-veilige layoutregels",
                "Direct toepasbaar in editor",
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
            <h2 className="text-xl font-black text-black">Snelle opmaak-check</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <li>
                <strong className="text-black">Rust:</strong> genoeg witruimte tussen secties.
              </li>
              <li>
                <strong className="text-black">Consistentie:</strong> vaste koppen, marges en letterstijl.
              </li>
              <li>
                <strong className="text-black">Focus:</strong> recente ervaring en resultaten visueel bovenaan.
              </li>
              <li>
                <strong className="text-black">Leesbaarheid:</strong> korte bullets, geen tekstblokken.
              </li>
            </ul>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/tools/cv-keywords"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Check ook je keyword-match per vacature
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Layoutregels
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            CV opmaken in 5 praktische stappen
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {layoutRules.map((rule) => (
              <article
                key={rule.title}
                className="border-4 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-black text-black">{rule.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{rule.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Fout naar goed
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Voorbeelden van slechte en sterke cv-opmaak
            </h2>
            <div className="mt-4 space-y-4">
              {wrongVsRight.map((item) => (
                <div key={item.wrong}>
                  <p className="text-sm font-medium text-slate-300">
                    <span className="font-black">Fout:</span> {item.wrong}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-100">
                    <span className="font-black">Sterk:</span> {item.right}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Per rol
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Welke cv-opmaak past bij jouw type functie?
            </h2>
            <div className="mt-4 space-y-4">
              {roleLayoutAdvice.map((item) => (
                <div key={item.title} className="border-2 border-black bg-[#FFFEF0] p-4">
                  <p className="text-sm font-black text-black">{item.title}</p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{item.advice}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                Template-aanpak
              </p>
              <h2 className="text-3xl font-black text-black">
                Templates die opmaakproblemen voorkomen
              </h2>
            </div>
            <Link href="/cv-maken-template" className="text-sm font-black text-black underline decoration-2 underline-offset-4">
              Bekijk template-route
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredTemplates.map((template) => (
              <article
                key={template.id}
                className="flex h-full flex-col border-4 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  {template.nameDutch}
                </p>
                <h3 className="mt-2 text-xl font-black text-black">{template.name}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                  {template.description}
                </p>
                <div className="mt-auto pt-5">
                  <Link
                    href="/cv-maken-template"
                    className="inline-block border-2 border-black bg-yellow-400 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-black"
                  >
                    Kies template-route
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Layout-intentie
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Van opmaakvoorbeeld naar de juiste CV-route
            </h2>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
              Gebruik deze vervolgstappen als je niet alleen inspiratie zoekt, maar direct wilt doorpakken naar de juiste template, ATS-veilige layout of definitieve PDF-flow.
            </p>
            <SectionIntentLinks links={layoutIntentLinks} locale="nl" />
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Bronnen en checkdatum
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Richtlijnen gecheckt op 8 maart 2026
          </h2>
          <div className="mt-6 space-y-3">
            {sources.map((source) => (
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
            Veelgestelde vragen over cv opmaak voorbeelden
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
                Klaar om je CV-opmaak te verbeteren?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Zet nu je inhoud in een opmaak die recruiters direct begrijpen
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Gebruik de regels op deze pagina, bouw in de editor, en download zodra je CV visueel en inhoudelijk klopt.
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
                href="/prijzen"
                className="inline-block border-4 border-black bg-black px-5 py-3 text-base font-black text-white"
              >
                Bekijk prijzen
              </Link>
            </div>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <Footer />
    </div>
  );
}
