import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const examples = [
  {
    title: "Voorbeeld motivatie-alinea (career switch)",
    text: "Na zes jaar in retailmanagement wil ik mijn klantgerichte en resultaatgedreven aanpak inzetten binnen customer success. In mijn huidige rol heb ik een team van 12 medewerkers aangestuurd, de NPS met 14 punten verbeterd en nieuwe onboardingprocedures opgezet. Juist die combinatie van operationele discipline en klantfocus wil ik bij [Bedrijfsnaam] inzetten.",
  },
  {
    title: "Voorbeeld motivatie-alinea (starter)",
    text: "Tijdens mijn stage bij [Organisatie] ontdekte ik hoe sterk mijn analytische vaardigheden en communicatie samenkomen in een data-gedreven omgeving. Ik ben gemotiveerd om deze basis verder uit te bouwen in een junior data-analist rol, waarin ik direct kan bijdragen aan betere besluitvorming met heldere rapportages.",
  },
  {
    title: "Voorbeeld motivatie-alinea (ervaren professional)",
    text: "Wat mij aanspreekt in deze functie is de combinatie van strategische verantwoordelijkheid en uitvoering dichtbij de operatie. In mijn huidige functie heb ik cross-functionele projecten geleid die de doorlooptijd met 22% verkortten. Ik zie in uw vacature dezelfde impactgerichte aanpak en wil daar actief aan bijdragen.",
  },
];

const checklist = [
  "Leg kort uit waarom deze functie inhoudelijk bij je past.",
  "Noem 1-2 relevante prestaties als bewijs van geschiktheid.",
  "Verbind jouw motivatie aan het bedrijf of de sector.",
  "Houd je toon concreet en professioneel, niet te algemeen.",
];

const faqs = [
  {
    question: "Wat is een goed motivatiebrief voorbeeld?",
    answer:
      "Een goed voorbeeld laat zien waarom jij juist voor deze rol en dit bedrijf kiest, en onderbouwt dat met concrete ervaring of resultaten. De brief is specifiek, kort en overtuigend.",
  },
  {
    question: "Hoe verschilt een motivatiebrief van een sollicitatiebrief?",
    answer:
      "In veel vacatures bedoelt men hetzelfde. Praktisch gezien kun je beide benamingen gebruiken voor een brief waarin je motivatie en geschiktheid voor de functie toelicht.",
  },
  {
    question: "Hoe lang moet een motivatiebrief zijn?",
    answer:
      "Meestal is 3 tot 5 korte alinea's voldoende. Recruiters willen snel zien waarom je past, zonder lange algemene tekst.",
  },
  {
    question: "Mag ik een motivatiebrief voorbeeld letterlijk overnemen?",
    answer:
      "Gebruik voorbeelden als structuur en inspiratie. Personaliseer altijd op jouw situatie, rol en resultaten om geloofwaardig te blijven.",
  },
];

export const metadata: Metadata = {
  title: "Motivatiebrief Voorbeeld - Praktische Voorbeelden + Opbouw | WerkCV",
  description:
    "Zoek je een motivatiebrief voorbeeld? Bekijk sterke voorbeeldalinea's, een duidelijke opbouw en een checklist voor een overtuigende brief. Pas direct toe in de generator.",
  keywords: [
    "motivatiebrief voorbeeld",
    "goede motivatiebrief",
    "motivatiebrief schrijven voorbeeld",
    "motivatiebrief opbouw",
    "motivatiebrief voorbeeld zinnen",
    "korte motivatiebrief",
    "motivatiebrief template",
    "motivatiebrief sollicitatie",
  ],
  alternates: {
    canonical: "https://werkcv.nl/motivatiebrief-voorbeeld",
    languages: {
      "nl-NL": "https://werkcv.nl/motivatiebrief-voorbeeld",
      "x-default": "https://werkcv.nl/motivatiebrief-voorbeeld",
    },
  },
};

export default function MotivatiebriefVoorbeeldPage() {
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
        name: "Motivatiebrief Voorbeeld",
        item: "https://werkcv.nl/motivatiebrief-voorbeeld",
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
              Motivatie-intent
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Motivatiebrief voorbeelden die je snel omzet naar een overtuigende brief
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Een sterke motivatiebrief draait om één ding: duidelijk maken waarom jij deze functie echt wilt en waarom jij geschikt bent. Gebruik de voorbeelden hieronder als basis en vul ze aan met
              jouw concrete ervaring en resultaten.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/tools/sollicitatiebrief-generator"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Schrijf motivatiebrief in generator
              </Link>
              <Link
                href="/sollicitatiebrief-voorbeeld"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk sollicitatiebrief voorbeelden
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Voorbeelden per context",
                "Concreet en vacaturegericht",
                "Direct toepasbaar in tool",
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
            <h2 className="text-xl font-black text-black">Checklist voor een sterke motivatiebrief</h2>
            <div className="mt-5 space-y-4">
              {checklist.map((item, index) => (
                <div key={item} className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center border-2 border-black bg-yellow-300 text-xs font-black">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-slate-700">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/cv-tips/sollicitatiebrief-tips"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Lees ook: sollicitatiebrief tips
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Copy-ready motivatieblokken
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Motivatiebrief voorbeelden per situatie
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
              Veelgemaakte fout
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Alleen motivatie noemen zonder inhoudelijk bewijs
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-200">
              Recruiters zien graag motivatie, maar beslissen op relevantie. Koppel je motivatie dus altijd aan één of twee resultaten uit je ervaring zodat je brief zowel enthousiast als
              geloofwaardig is.
            </p>
          </div>
          <div className="border-4 border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Relevante vervolgstappen
            </p>
            <div className="mt-4 space-y-4">
              {[
                {
                  href: "/motivatiebrief-schrijven",
                  title: "Motivatiebrief schrijven",
                  body: "Gebruik deze route als je minder voorbeelden en meer stap-voor-stap schrijfstructuur zoekt.",
                },
                {
                  href: "/korte-motivatiebrief-voorbeeld",
                  title: "Korte motivatiebrief voorbeeld",
                  body: "Handig als je compact wilt schrijven zonder de inhoud te mager te maken.",
                },
                {
                  href: "/motivatiebrief-stage-voorbeeld",
                  title: "Motivatiebrief stage voorbeeld",
                  body: "Gebruik stagegerichte voorbeeldblokken als je opleiding, projecten en leerdoelen centraal staan.",
                },
                {
                  href: "/sollicitatiebrief-voorbeeld-administratief-medewerker",
                  title: "Sollicitatiebrief administratief medewerker",
                  body: "Bekijk role-specifieke voorbeeldzinnen voor administratieve functies.",
                },
                {
                  href: "/sollicitatiebrief-voorbeeld-klantenservice",
                  title: "Sollicitatiebrief klantenservice",
                  body: "Gebruik klantenservice-specifieke briefblokken met service-KPI voorbeelden.",
                },
                {
                  href: "/sollicitatiebrief-voorbeeld-verpleegkundige",
                  title: "Sollicitatiebrief verpleegkundige",
                  body: "Bekijk zorgspecifieke briefblokken met BIG- en klinische focus.",
                },
                {
                  href: "/sollicitatiebrief-voorbeeld-marketing",
                  title: "Sollicitatiebrief marketing",
                  body: "Gebruik marketing-specifieke voorbeeldzinnen met kanaalervaring en KPI-focus.",
                },
                {
                  href: "/sollicitatiebrief-voorbeeld-office-manager",
                  title: "Sollicitatiebrief office manager",
                  body: "Bekijk office manager voorbeeldblokken met focus op structuur, procesverbetering en regie.",
                },
                {
                  href: "/sollicitatiebrief-voorbeeld-verkoopmedewerker",
                  title: "Sollicitatiebrief verkoopmedewerker",
                  body: "Gebruik verkoop-specifieke briefblokken met klantfocus, targetbijdrage en retailcontext.",
                },
                {
                  href: "/sollicitatiebrief-voorbeeld-software-ontwikkelaar",
                  title: "Sollicitatiebrief software ontwikkelaar",
                  body: "Bekijk developer-specifieke briefblokken met stack, impact en engineeringcultuur.",
                },
                {
                  href: "/sollicitatiebrief-in-engels",
                  title: "Sollicitatiebrief in Engels",
                  body: "Gebruik Engelse opbouw en voorbeeldzinnen voor internationale of Engelstalige vacatures.",
                },
                {
                  href: "/open-sollicitatie-brief",
                  title: "Open sollicitatie brief",
                  body: "Gebruik deze route als je zonder concrete vacature toch een sterke, gerichte brief wilt sturen.",
                },
                {
                  href: "/motivatiebrief-layout",
                  title: "Motivatiebrief layout",
                  body: "Gebruik deze pagina als je niet alleen voorbeeldzinnen, maar ook de juiste opmaak, witruimte en PDF-structuur wilt.",
                },
                {
                  href: "/tools/sollicitatiebrief-generator",
                  title: "Sollicitatiebrief generator",
                  body: "Gebruik de voorbeelden direct als input en personaliseer op jouw vacature.",
                },
                {
                  href: "/sollicitatiebrief-voorbeeld",
                  title: "Sollicitatiebrief voorbeelden",
                  body: "Combineer motivatievoorbeelden met sterke openings- en afsluitzinnen.",
                },
                {
                  href: "/professioneel-cv-template",
                  title: "Professioneel CV template",
                  body: "Laat je brief en CV dezelfde professionele toon uitstralen.",
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
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over motivatiebrief voorbeelden
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
                Klaar om je motivatiebrief af te maken?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Schrijf nu je motivatiebrief en koppel direct een sterk CV
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Gebruik de generator voor je brief en werk daarna je CV uit in dezelfde flow.
              </p>
            </div>
            <Link
              href="/tools/sollicitatiebrief-generator"
              className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
            >
              Start met motivatiebrief
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
