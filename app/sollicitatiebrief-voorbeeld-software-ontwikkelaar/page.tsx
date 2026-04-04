import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const examples = [
  {
    title: "Voorbeeld opening (full-stack / software developer)",
    text: "Met veel interesse solliciteer ik naar de functie van software ontwikkelaar bij [Bedrijfsnaam]. In mijn huidige rol bouw ik aan TypeScript- en Node.js-features die direct bijdragen aan stabiele releases, betere performance en een snellere doorlooptijd van productverbeteringen.",
  },
  {
    title: "Voorbeeld kernalinea (backend impact en schaalbaarheid)",
    text: "De afgelopen periode heb ik API-latency met 37% verlaagd door query-optimalisatie, caching en betere indexering in PostgreSQL. Daarnaast verkleinde ik de kans op regressies via testautomatisering en duidelijke pull request-richtlijnen, waardoor releases voorspelbaarder werden.",
  },
  {
    title: "Voorbeeld kernalinea (frontend / productwaarde)",
    text: "Aan de frontendzijde werkte ik aan React- en Next.js-schermen waar snelheid en gebruikservaring direct invloed hadden op activatie en conversie. Door componenten te herstructureren en rendering-knelpunten op te lossen, daalden laadtijden merkbaar en nam het aantal supportmeldingen op kritieke flows af.",
  },
  {
    title: "Voorbeeld motivatie-alinea (team en engineering cultuur)",
    text: "Wat mij aanspreekt in uw vacature is de combinatie van technische diepgang en gezamenlijke productverantwoordelijkheid. Ik werk het liefst in een team waar code reviews, documentatie, incident learning en eigenaarschap vanzelfsprekend zijn, omdat daar de beste software en de snelste groei ontstaan.",
  },
  {
    title: "Voorbeeld junior / starter alinea",
    text: "Tijdens mijn stage en afstudeerproject heb ik met JavaScript, REST API's en testautomatisering gewerkt aan een intern dashboard waarmee handmatige rapportage sterk werd teruggebracht. Ik zoek nu een rol waarin ik mijn basis in development verder kan uitbouwen in een team met hoge codekwaliteit.",
  },
  {
    title: "Voorbeeld afsluiting (gesprekgericht en concreet)",
    text: "Graag licht ik in een gesprek toe hoe mijn ervaring met moderne webstack, technische samenwerking en productie-impact kan bijdragen aan uw team. Dank voor uw tijd en overweging. Ik zie uw reactie met belangstelling tegemoet.",
  },
];

const recruiterSignals = [
  "Je noemt de stack die in de vacature centraal staat en koppelt die aan echte projectcontext.",
  "Je brief laat zien wat jouw code verbeterde: performance, betrouwbaarheid, delivery of gebruikerswaarde.",
  "Je benoemt engineering-discipline zoals code reviews, testing, documentatie of ownership.",
  "Je motivatie past bij product, domein of teamcultuur en klinkt niet als generieke AI-copy.",
];

const roleAngles = [
  {
    title: "Frontend / product",
    body: "Leg nadruk op performance, accessibility, UI-betrouwbaarheid en impact op gebruikersflows.",
  },
  {
    title: "Backend / platform",
    body: "Schrijf over schaalbaarheid, stabiliteit, dataverwerking, API-ontwerp en incidentreductie.",
  },
  {
    title: "Full-stack / scale-up",
    body: "Laat zien dat je end-to-end denkt: van featurebouw tot deployment, monitoring en teamafstemming.",
  },
  {
    title: "Junior / starter",
    body: "Gebruik stages, studieprojecten of GitHub-projecten als bewijs van delivery en leercurve.",
  },
];

const checklist = [
  "Noem de functietitel exact en spiegel 2-3 kernwoorden uit de vacature terug.",
  "Kies 1 of 2 technische resultaten, bijvoorbeeld latency, bugs, delivery-snelheid of productimpact.",
  "Benoem je stack alleen als je ook kort laat zien wat je ermee bouwde of verbeterde.",
  "Laat zien hoe je samenwerkt: code reviews, productafstemming, testing of documentatie.",
  "Sluit af met een gespreksoffer waarin je jouw bijdrage aan team of product concreet maakt.",
];

const starterPlan = [
  "Gebruik stage-, afstudeer- of side-projecten als bewijs van echte software delivery.",
  "Beschrijf per project kort het probleem, jouw aanpak, de stack en het resultaat.",
  "Zet GitHub, portfolio of live demo alleen in je brief als het representatief werk laat zien.",
  "Focus op groeipotentieel plus discipline, niet op loze claims als 'passie voor code'.",
];

const atsTerms = [
  "software ontwikkelaar",
  "software engineer",
  "frontend developer",
  "backend developer",
  "full stack developer",
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "REST API",
  "PostgreSQL",
  "CI/CD",
  "Docker",
  "AWS",
  "testautomatisering",
];

const mistakes = [
  "Een lijst met tools noemen zonder te tonen welk probleem je ermee oploste.",
  "Te veel over passie of nieuwsgierigheid schrijven en te weinig over echte delivery.",
  "Geen metrics of resultaatcontext gebruiken bij projecten of werkervaring.",
  "De brief niet afstemmen op het type rol: frontend, backend, full-stack of platform.",
  "Algemene motivatie gebruiken zonder match met product, domein of engineeringcultuur.",
];

const faqs = [
  {
    question: "Wat moet in een sollicitatiebrief voor software ontwikkelaar staan?",
    answer:
      "Noem de relevante stack, beschrijf een of twee technische resultaten en laat zien hoe je samenwerkt binnen een developmentteam. Recruiters willen niet alleen tools zien, maar vooral bewijs van impact en rolfit.",
  },
  {
    question: "Hoe technisch moet een developer sollicitatiebrief zijn?",
    answer:
      "Technisch genoeg om geloofwaardig te zijn, maar niet zo diep dat het op documentatie lijkt. Noem stack, context en resultaat in duidelijke taal zodat zowel recruiter als tech lead de relevantie snel ziet.",
  },
  {
    question: "Kan ik solliciteren als software ontwikkelaar zonder veel werkervaring?",
    answer:
      "Ja. Gebruik stages, afstudeerprojecten, freelancewerk of sterke GitHub-projecten als bewijs van delivery. Het belangrijkste is dat je laat zien wat jij hebt gebouwd, geleerd en verbeterd.",
  },
  {
    question: "Welke resultaten kan ik in mijn brief noemen?",
    answer:
      "Denk aan performanceverbetering, minder bugs, snellere releases, betrouwbaarheid, lagere supportdruk of een betere gebruikersflow. Kies alleen metrics die je zelf kort kunt toelichten.",
  },
  {
    question: "Kan ik dit voorbeeld letterlijk overnemen?",
    answer:
      "Gebruik het als structuur en herschrijf het met jouw stack, projecten en resultaten. Juist personalisatie bepaalt of je brief overtuigt bij developer vacatures.",
  },
];

const sourceLinks = [
  {
    label: "CV template software ontwikkelaar (WerkCV)",
    href: "/cv-template-software-ontwikkelaar",
  },
  {
    label: "CV voorbeeld software ontwikkelaar (WerkCV)",
    href: "/cv-voorbeelden/technologie-en-ict/software-ontwikkelaar",
  },
  {
    label: "Werk.nl - Kansrijke beroepen ICT",
    href: "https://www.werk.nl/arbeidsmarktinformatie/kansrijke-beroepen/ict",
  },
  {
    label: "Stack Overflow Developer Survey 2025 - Technology",
    href: "https://survey.stackoverflow.co/2025/technology/",
  },
  {
    label: "Resume.io - Software Developer Cover Letter Example",
    href: "https://resume.io/cover-letter-examples/software-developer",
  },
];

export const metadata: Metadata = {
  title: "Sollicitatiebrief Voorbeeld Software Ontwikkelaar | WerkCV",
  description:
    "Gebruik een sterk sollicitatiebrief voorbeeld voor software ontwikkelaar. Inclusief tech-specifieke voorbeeldzinnen, ATS-termen, startertips en interne links naar CV template en editor.",
  keywords: [
    "sollicitatiebrief voorbeeld software ontwikkelaar",
    "motivatiebrief software developer voorbeeld",
    "sollicitatiebrief software engineer",
    "sollicitatiebrief developer voorbeeld",
    "software developer motivatiebrief",
    "sollicitatiebrief frontend developer",
    "sollicitatiebrief backend developer",
  ],
  alternates: {
    canonical: "https://werkcv.nl/sollicitatiebrief-voorbeeld-software-ontwikkelaar",
    languages: {
      "nl-NL": "https://werkcv.nl/sollicitatiebrief-voorbeeld-software-ontwikkelaar",
      "x-default": "https://werkcv.nl/sollicitatiebrief-voorbeeld-software-ontwikkelaar",
    },
  },
};

export default function SollicitatiebriefVoorbeeldSoftwareOntwikkelaarPage() {
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
        name: "Sollicitatiebrief Voorbeeld Software Ontwikkelaar",
        item: "https://werkcv.nl/sollicitatiebrief-voorbeeld-software-ontwikkelaar",
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
            href="/tools/sollicitatiebrief-generator"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            Open generator
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-14">
        <section className="mb-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-slate-700">
              Rol-intent: software development
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Sollicitatiebrief voorbeeld software ontwikkelaar dat stack, impact en teamfit geloofwaardig overbrengt
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Een sterke developer brief verkoopt geen buzzwords, maar laat zien wat jouw code in productie heeft verbeterd. Gebruik deze pagina om sneller een brief te schrijven die inhoudelijk sterk
              voelt voor recruiters, hiring managers en tech leads.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/tools/sollicitatiebrief-generator"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Schrijf direct in generator
              </Link>
              <Link
                href="/cv-template-software-ontwikkelaar"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Koppel met developer CV template
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Tech-specifieke voorbeeldblokken",
                "ATS-zoektermen voor dev-vacatures",
                "Direct door naar editor of generator",
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
            <h2 className="text-xl font-black text-black">Wat tech recruiters in deze brief meteen scannen</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              {recruiterSignals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/sollicitatiebrief-voorbeeld"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Bekijk ook: algemene sollicitatiebrief voorbeelden
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Accent per developer rol
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Welke accenten je in je softwarebrief legt per type functie
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {roleAngles.map((item) => (
              <article
                key={item.title}
                className="border-4 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-black text-black">{item.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Copy-ready voorbeelden
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Sollicitatiebrief voorbeeldblokken voor software ontwikkelaars
          </h2>
          <div className="mt-6 space-y-5">
            {examples.map((example) => (
              <article
                key={example.title}
                className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-black text-black">{example.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{example.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Checklist voor verzenden
            </p>
            <div className="mt-4 space-y-3">
              {checklist.map((item, index) => (
                <div key={item} className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center border-2 border-white bg-black text-xs font-black text-white">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-slate-200">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t-2 border-yellow-300 pt-4">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
                ATS-termen om logisch te verwerken
              </p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-100">
                {atsTerms.join(" | ")}
              </p>
            </div>
          </div>

          <div className="border-4 border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Zonder veel ervaring
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Zo maak je een developer brief sterk als junior of starter
            </h2>
            <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
              {starterPlan.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-2 border-black pt-4">
              <Link
                href="/cv-template-software-ontwikkelaar"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Combineer dit direct met het software ontwikkelaar CV template
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="border-4 border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Veelgemaakte fouten
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Wat je developer brief zwakker maakt dan nodig
            </h2>
            <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
              {mistakes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="border-4 border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Slimme vervolgstappen
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Maak je brief sterker met deze aansluitende pagina&apos;s
            </h2>
            <div className="mt-4 space-y-3">
              {[
                {
                  href: "/cv-template-software-ontwikkelaar",
                  title: "CV template software ontwikkelaar",
                  body: "Laat je brief en CV dezelfde technische diepte en structuur uitstralen.",
                },
                {
                  href: "/cv-voorbeelden/technologie-en-ict/software-ontwikkelaar",
                  title: "CV voorbeeld software ontwikkelaar",
                  body: "Bekijk hoe recruiters stack, projecten en impact het liefst terugzien in een developer CV.",
                },
                {
                  href: "/tools/sollicitatiebrief-generator",
                  title: "Sollicitatiebrief generator",
                  body: "Gebruik de voorbeeldzinnen direct als input en personaliseer op jouw vacature.",
                },
                {
                  href: "/editor",
                  title: "Open CV editor",
                  body: "Werk je developer CV meteen uit in dezelfde workflow als je brief.",
                },
                {
                  href: "/prijzen",
                  title: "Prijzen",
                  body: "Start gratis en betaal alleen wanneer je je CV wilt downloaden.",
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
            Bronnen (laatst gecontroleerd: 11 maart 2026)
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Bronnen en referenties
          </h2>
          <div className="mt-6 space-y-3">
            {sourceLinks.map((source) => (
              <a
                key={source.label}
                href={source.href}
                target={source.href.startsWith("http") ? "_blank" : undefined}
                rel={source.href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="block border-2 border-black bg-white p-4 text-sm font-medium text-slate-700 transition-colors hover:bg-yellow-100"
              >
                <span className="font-black text-black">{source.label}</span>
                <span className="mt-1 block break-all">
                  {source.href.startsWith("http") ? source.href : `https://werkcv.nl${source.href}`}
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over een sollicitatiebrief voor software ontwikkelaars
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
                Klaar om je brief en CV samen af te ronden?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Schrijf je developer sollicitatiebrief en finaliseer daarna direct je CV
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Gebruik de generator voor je brief en werk vervolgens je CV uit in dezelfde workflow zodat vacaturefit, stack en impact overal consistent zijn.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/sollicitatiebrief-generator"
                className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Start met sollicitatiebrief
              </Link>
              <Link
                href="/editor"
                className="inline-block border-4 border-black bg-black px-5 py-3 text-base font-black text-white"
              >
                Open CV editor
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

      <Footer />
    </div>
  );
}
