import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { templateList } from "@/lib/templates/registry";

const featuredTemplates = templateList.filter((template) =>
  ["professional", "modern", "simple", "ats"].includes(template.id),
);

const templateUseCases: Record<string, string> = {
  professional: "Ideaal voor administratie, finance en zakelijke functies waar rust en overzicht belangrijk zijn.",
  modern: "Sterke keuze voor sales, marketing en tech als je een frisse maar professionele uitstraling wilt.",
  simple: "De veiligste optie voor snelle sollicitaties, starters en functies waar inhoud belangrijker is dan design.",
  ats: "Beste keuze als je door applicant tracking systems wilt komen met een ultra-helder, scanbaar format.",
};

const faqs = [
  {
    question: "Is WerkCV echt gratis te gebruiken?",
    answer:
      "Ja. Je kunt gratis een CV aanmaken, bewerken en verschillende templates vergelijken. Je betaalt alleen als je je CV als PDF wilt downloaden.",
  },
  {
    question: "Wat is het verschil tussen een gratis cv template en een gratis download?",
    answer:
      "Bij WerkCV is het template zelf gratis te gebruiken in de editor. De betaalde stap is alleen de uiteindelijke PDF-download. Zo kun je eerst alles testen voordat je beslist.",
  },
  {
    question: "Welke gratis cv template is het beste voor ATS?",
    answer:
      "De ATS-vriendelijke template en simpele layouts werken het best voor ATS-systemen. Ze gebruiken een duidelijke structuur, weinig visuele ruis en houden belangrijke keywords leesbaar.",
  },
  {
    question: "Kan ik mijn gratis CV later aanpassen?",
    answer:
      "Ja. Je CV blijft bewerkbaar, zodat je eenvoudig meerdere versies voor verschillende vacatures kunt maken en pas downloadt wanneer je tevreden bent.",
  },
];

export const metadata: Metadata = {
  title: "Gratis CV Template - Professioneel CV Maken Zonder Abonnement | WerkCV.nl",
  description:
    "Zoek je een gratis CV template? Vergelijk 13+ professionele CV sjablonen, kies een ATS-vriendelijke layout en maak gratis je CV. Betaal alleen bij PDF-download.",
  keywords: [
    "gratis cv template",
    "gratis cv sjabloon",
    "cv template gratis",
    "professioneel cv template",
    "ats cv template",
    "cv template zonder abonnement",
    "cv sjabloon gratis downloaden",
    "modern cv template",
    "cv maken gratis",
  ],
  alternates: {
    canonical: "https://werkcv.nl/gratis-cv-template",
    languages: {
      "nl-NL": "https://werkcv.nl/gratis-cv-template",
      "x-default": "https://werkcv.nl/gratis-cv-template",
    },
  },
};

export default function GratisCvTemplatePage() {
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
        name: "Gratis CV Template",
        item: "https://werkcv.nl/gratis-cv-template",
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
        <section className="mb-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-slate-700">
              Hoge intentie
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Gratis CV template kiezen zonder in een abonnement te belanden
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Een goed gratis CV template moet twee dingen tegelijk doen: professioneel ogen voor recruiters en praktisch genoeg zijn om snel te personaliseren voor elke vacature.
              WerkCV laat je gratis starten met {templateList.length} templates, meerdere kleurthema&apos;s en een ATS-vriendelijke editor. Je betaalt pas als je je PDF wilt downloaden.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Begin direct gratis
              </Link>
              <Link
                href="/templates"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Vergelijk templates
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                `${templateList.length} templates`,
                "ATS-vriendelijke optie",
                "Eenmalig €4,99 bij download",
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
            <div className="mt-6 flex flex-wrap gap-3 text-xs font-black uppercase tracking-[0.3em] text-slate-600">
              <span className="px-3 py-1 border-2 border-black bg-white">Gehost op EU-servers (Hetzner, DE)</span>
              <span className="px-3 py-1 border-2 border-black bg-white">GDPR-compliant – gegevens blijven in de EU</span>
              <span className="px-3 py-1 border-2 border-black bg-white">Geen abonnement, download betaal je los</span>
            </div>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Wat maakt een gratis cv sjabloon goed?</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <li>
                <strong className="text-black">Duidelijke structuur:</strong> recruiters moeten je profiel, werkervaring en vaardigheden in seconden kunnen scannen.
              </li>
              <li>
                <strong className="text-black">ATS-leesbaarheid:</strong> simpele secties en heldere koppen helpen je CV door sollicitatiesoftware.
              </li>
              <li>
                <strong className="text-black">Flexibiliteit:</strong> je wilt kunnen wisselen tussen modern, klassiek en minimal zonder opnieuw te beginnen.
              </li>
              <li>
                <strong className="text-black">Eerlijk prijsmodel:</strong> gratis bouwen en vergelijken, pas betalen wanneer je echt wilt downloaden.
              </li>
            </ul>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/cv-tips/cv-template-kiezen"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Lees ook: hoe kies je het beste cv template?
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                Beste opties
              </p>
              <h2 className="text-3xl font-black text-black">
                Gratis CV templates die direct bruikbaar zijn
              </h2>
            </div>
            <Link href="/templates" className="text-sm font-black text-black underline decoration-2 underline-offset-4">
              Bekijk alle templates
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredTemplates.map((template) => (
              <div
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
                <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
                  {templateUseCases[template.id]}
                </p>
                <div className="mt-auto pt-5">
                  <Link
                    href="/editor"
                    className="inline-block border-2 border-black bg-yellow-400 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-black"
                  >
                    Start in editor
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-3">
          <div className="border-4 border-black bg-yellow-400 p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-black">WerkCV.nl</p>
            <h2 className="mt-2 text-2xl font-black text-black">Gratis starten, helder afrekenen</h2>
            <p className="mt-3 text-sm font-bold leading-relaxed text-black">
              Je maakt gratis je CV, wisselt tussen layouts en betaalt pas op het moment dat je een PDF wilt downloaden.
            </p>
          </div>
          <div className="border-4 border-black bg-white p-6">
            <h3 className="text-lg font-black text-black">Waarom dit beter werkt dan “gratis proefperiodes”</h3>
            <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
              <li>Geen verborgen maandkosten.</li>
              <li>Geen automatische verlenging.</li>
              <li>Eerst volledig testen, daarna beslissen.</li>
              <li>Geschikt voor meerdere versies van hetzelfde CV.</li>
            </ul>
          </div>
          <div className="border-4 border-black bg-white p-6">
            <h3 className="text-lg font-black text-black">Beter dan zelf prutsen in Word</h3>
            <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
              <li>Geen opmaakstress of verschuivende tekstvakken.</li>
              <li>Direct een professionelere uitstraling.</li>
              <li>Sterkere ATS-compatibiliteit.</li>
              <li>Sneller aanpassen per vacature.</li>
            </ul>
          </div>
        </section>

        <section className="mb-14 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Keuzehulp
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Zo kies je het beste gratis cv template voor jouw situatie
            </h2>
            <div className="mt-6 space-y-5">
              {[
                {
                  title: "Kijk eerst naar de functie",
                  body: "Een administratieve of financiele rol vraagt meestal om een rustiger template. Marketing, sales en creatieve functies kunnen een modernere layout aan.",
                },
                {
                  title: "Kies een template dat je ervaring ondersteunt",
                  body: "Heb je veel werkervaring? Dan is een overzichtelijke, rustige layout belangrijk. Ben je starter, dan helpt een strakke template om je profiel en vaardigheden beter uit te lichten.",
                },
                {
                  title: "Optimaliseer daarna je inhoud",
                  body: "Een goed design helpt, maar sterke tekst bepaalt of je wordt uitgenodigd. Werk daarom direct aan je profieltekst en werkervaring zodra je layout staat.",
                },
              ].map((item, index) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center border-3 border-black bg-white text-sm font-black text-black" style={{ borderWidth: "3px" }}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-black">{item.title}</h3>
                    <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-black text-black">Slimme interne vervolgstappen</h3>
            <div className="mt-5 space-y-4">
              {[
                {
                  href: "/cv-maken",
                  title: "CV maken stappenplan",
                  body: "Gebruik de complete workflow om van leeg document naar een sterk, sollicitatieklaar CV te gaan.",
                },
                {
                  href: "/online-cv-maken",
                  title: "Online CV maken",
                  body: "Werk volledig online, pas snel aan per vacature en vermijd opmaakproblemen.",
                },
                {
                  href: "/professioneel-cv-template",
                  title: "Professioneel CV template",
                  body: "Zoek je een zakelijke, strakke stijl? Bekijk de professionele template voor kantoor- en businessrollen.",
                },
                {
                  href: "/cv-template-administratief-medewerker",
                  title: "CV template administratief medewerker",
                  body: "Bekijk een complete template + voorbeeldstructuur voor administratieve functies.",
                },
                {
                  href: "/cv-template-klantenservice-medewerker",
                  title: "CV template klantenservice medewerker",
                  body: "Praktische template- en KPI-aanpak voor customer service en support vacatures.",
                },
                {
                  href: "/cv-template-verpleegkundige",
                  title: "CV template verpleegkundige",
                  body: "BIG-proof template + zorgspecifieke voorbeelden voor ziekenhuis, wijk en VVT.",
                },
                {
                  href: "/cv-template-software-ontwikkelaar",
                  title: "CV template software ontwikkelaar",
                  body: "Developer-specifieke template met stack-opbouw, projectimpact en ATS-keywords.",
                },
                {
                  href: "/cv-template-verkoopmedewerker",
                  title: "CV template verkoopmedewerker",
                  body: "Retailgerichte template met profielteksten, omzet-KPI bullets en verkooptermen.",
                },
                {
                  href: "/cv-template-marketing-medewerker",
                  title: "CV template marketing medewerker",
                  body: "Kanaal- en campagnegerichte template met KPI-bullets voor marketingrollen.",
                },
                {
                  href: "/cv-template-office-manager",
                  title: "CV template office manager",
                  body: "Operationsgerichte template met planning-, proces- en stakeholderfocus.",
                },
                {
                  href: "/engels-cv-template",
                  title: "Engels CV template",
                  body: "Solliciteer je internationaal? Gebruik een Engelse template die past bij Nederlandse expat-vacatures.",
                },
                {
                  href: "/cv-template-word",
                  title: "CV template Word alternatief",
                  body: "Werk je nu in Word? Bekijk hoe je sneller kunt bouwen zonder opmaakproblemen.",
                },
                {
                  href: "/modern-cv-template",
                  title: "Modern CV template",
                  body: "Wil je een strakke, eigentijdse uitstraling? Bekijk wanneer een moderne layout beter werkt dan klassiek.",
                },
                {
                  href: "/ats-cv-template",
                  title: "ATS CV template",
                  body: "Wil je specifiek door sollicitatiesoftware heen komen? Bekijk de ATS-veilige template en bijbehorende checklist.",
                },
                {
                  href: "/cv-tips/cv-maken-in-word",
                  title: "CV maken in Word",
                  body: "Vergelijk waarom een online template vaak sneller en consistenter werkt dan Word.",
                },
                {
                  href: "/tools/profieltekst-generator",
                  title: "Profieltekst generator",
                  body: "Maak direct een sterke openingsalinea voor het template dat je kiest.",
                },
                {
                  href: "/prijzen",
                  title: "Prijzen",
                  body: "Bekijk precies wanneer je betaalt en waarom er geen abonnement nodig is.",
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
            Veelgestelde vragen over gratis CV templates
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

        <section className="border-4 border-black bg-black px-6 py-8 text-white shadow-[8px_8px_0px_0px_rgba(250,204,21,1)]">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
                Klaar om te starten?
              </p>
              <h2 className="mt-2 text-3xl font-black">
                Begin gratis, kies later pas of je wilt downloaden
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-200 sm:text-base">
                Vergelijk verschillende layouts, maak je inhoud sterker en kies pas aan het einde of je je CV als PDF wilt opslaan.
              </p>
            </div>
            <Link
              href="/editor"
              className="inline-block border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black"
            >
              Begin direct met je CV
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

