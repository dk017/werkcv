import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { templateList } from "@/lib/templates/registry";

const featuredTemplates = templateList.filter((template) =>
  ["professional", "ats", "simple", "modern"].includes(template.id),
);

const workflow = [
  {
    title: "1) Kies direct een template dat bij je doelrol past",
    body: "Start met een rustige basis die recruiters snel kunnen scannen. Voor de meeste functies werken professionele en ATS-vriendelijke layouts het beste.",
  },
  {
    title: "2) Schrijf een vacaturegerichte profieltekst",
    body: "Vat je ervaring en toegevoegde waarde samen in 3 tot 4 zinnen. Gebruik relevante woorden uit de vacature zodat recruiter en ATS direct aansluiting zien.",
  },
  {
    title: "3) Zet werkervaring om naar impact-bullets",
    body: "Benoem per functie niet alleen taken, maar ook resultaten, verbeteringen en context. Dat maakt je CV online veel overtuigender.",
  },
  {
    title: "4) Voeg vaardigheden toe met bewijs",
    body: "Plaats alleen skills die terugkomen in je werkervaring, projecten of opleiding. Zo blijft je CV geloofwaardig tijdens selectie en gesprek.",
  },
  {
    title: "5) Pas je CV per vacature aan en download pas op het einde",
    body: "Maak online varianten voor verschillende functies, vergelijk snel en rond af wanneer je inhoud klopt. Dat verhoogt je respons zonder extra opmaakwerk.",
  },
];

const onlineAdvantages = [
  "Geen verschuivende opmaak zoals in losse documenten.",
  "Sneller varianten maken per vacature.",
  "Direct inzicht in templatekwaliteit en scanbaarheid.",
  "Eenvoudige flow van schrijven naar downloaden.",
  "Eerst gratis bouwen, pas betalen bij PDF-download.",
];

const profileSamples = [
  {
    title: "Online cv maken voorbeeld (klantenservice)",
    text: "Klantgerichte professional met 4 jaar ervaring in support via telefoon, chat en e-mail. Verhoogde klanttevredenheid naar 9,0 door snellere opvolging en betere probleemanalyse. Ik vertaal complexe vragen naar duidelijke oplossingen en werk efficiënt samen met operations en sales.",
  },
  {
    title: "Online cv maken voorbeeld (administratie)",
    text: "Nauwkeurige administratief medewerker met ervaring in facturatie, planning en dossierbeheer. Verminderde correcties in maandafsluitingen met 25% door extra controles in het verwerkingsproces. Ik combineer structuur, betrouwbaarheid en duidelijke communicatie onder tijdsdruk.",
  },
  {
    title: "Online cv maken voorbeeld (starter)",
    text: "Leergierige starter met stage-ervaring in projectondersteuning en rapportage. Tijdens mijn stage verbeterde ik de opvolging van openstaande acties met een duidelijk weekoverzicht voor het team. Ik zoek een rol waarin ik snel verantwoordelijkheid kan nemen en resultaten kan leveren.",
  },
];

const mistakeFixes = [
  {
    title: "Fout: online CV zien als 1 keer invullen",
    fix: "Fix: gebruik online juist voor snelle varianten per vacature met aangepaste titel, profieltekst en kernbullets.",
  },
  {
    title: "Fout: te veel design, te weinig inhoud",
    fix: "Fix: houd de layout rustig en investeer vooral in bewijsbare resultaten en relevante ervaring.",
  },
  {
    title: "Fout: keywords alleen in skills zetten",
    fix: "Fix: verwerk kerntermen uit de vacature ook in profieltekst en werkervaring voor betere matching.",
  },
  {
    title: "Fout: zonder eindcontrole downloaden",
    fix: "Fix: loop altijd check op datums, consistentie, spelfouten en leesbaarheid voordat je finaliseert.",
  },
];

const faqs = [
  {
    question: "Wat is de snelste manier om online een CV te maken?",
    answer:
      "Kies eerst een template, schrijf daarna profieltekst en werkervaring vacaturegericht, en pas vervolgens je skills aan. Zo maak je in korte tijd een sterke online versie die direct bruikbaar is.",
  },
  {
    question: "Is online cv maken gratis?",
    answer:
      "Bij WerkCV kun je gratis starten, schrijven en templates vergelijken. Je betaalt alleen wanneer je je definitieve PDF wilt downloaden.",
  },
  {
    question: "Wat is beter: online cv maken of Word?",
    answer:
      "Online werkt meestal sneller en consistenter, vooral als je meerdere vacaturevarianten nodig hebt. Word kan werken, maar kost vaak meer tijd aan opmaak en versiebeheer.",
  },
  {
    question: "Hoe maak ik mijn online CV ATS-vriendelijk?",
    answer:
      "Gebruik duidelijke secties, een rustige template en vacaturewoorden op natuurlijke plekken in titel, profiel, werkervaring en vaardigheden.",
  },
  {
    question: "Hoe lang moet een online CV zijn?",
    answer:
      "Voor de meeste sollicitaties is 1 pagina voldoende voor starters en 1 tot 2 pagina's voor ervaren kandidaten. Relevantie en scanbaarheid blijven het belangrijkst.",
  },
];

export const metadata: Metadata = {
  title: "Online CV Maken - Snel, Professioneel en Zonder Opmaakstress | WerkCV",
  description:
    "Online cv maken in een paar stappen. Gebruik templates, copy-ready voorbeelden en ATS tips. Start gratis en betaal alleen bij PDF-download.",
  keywords: [
    "online cv maken",
    "cv online maken",
    "cv maken online",
    "online cv maken gratis",
    "cv maken gratis online",
    "gratis online cv maken",
    "online curriculum vitae maken",
  ],
  alternates: {
    canonical: "https://werkcv.nl/online-cv-maken",
    languages: {
      "nl-NL": "https://werkcv.nl/online-cv-maken",
      "x-default": "https://werkcv.nl/online-cv-maken",
    },
  },
};

export default function OnlineCvMakenPage() {
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
        name: "Online CV Maken",
        item: "https://werkcv.nl/online-cv-maken",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Online cv maken in 5 stappen",
    description: "Snelle workflow om online een professioneel CV te maken.",
    totalTime: "PT30M",
    step: workflow.map((step) => ({
      "@type": "HowToStep",
      name: step.title,
      text: step.body,
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
              Hoge intentie: online cv maken
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Online CV maken zonder opmaakstress en zonder abonnement
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Wie online een CV wil maken zoekt vooral snelheid en controle: snel starten, inhoud per vacature aanpassen en pas op het einde beslissen over download. Op deze pagina krijg je een
              direct toepasbare workflow, voorbeelden en keuzes die je helpen om online een sterk CV te bouwen dat recruiter-proof en ATS-vriendelijk blijft.
            </p>
            <p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-slate-600">
              Deze route focust op werken in-browser en snel itereren. Zoek je het
              breedste stappenplan ongeacht kanaal of device? Dan blijft{" "}
              <Link
                href="/cv-maken"
                className="font-black text-black underline decoration-2 underline-offset-4"
              >
                CV maken
              </Link>{" "}
              de parent-pagina.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Start online in editor
              </Link>
              <Link
                href="/cv-maken"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk volledig CV stappenplan
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                `${templateList.length} templates beschikbaar`,
                "Direct online aanpassen per vacature",
                "Betaal alleen bij PDF-download",
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
            <h2 className="text-xl font-black text-black">Waarom online cv maken vaak beter werkt</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              {onlineAdvantages.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/cv-template-word"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Vergelijk met CV maken in Word
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Workflow
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Online CV maken in 5 stappen
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {workflow.map((step) => (
              <article
                key={step.title}
                className="border-4 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-black text-black">{step.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                Template startpunt
              </p>
              <h2 className="text-3xl font-black text-black">
                Start online met een template die direct werkt
              </h2>
            </div>
            <Link href="/templates" className="text-sm font-black text-black underline decoration-2 underline-offset-4">
              Bekijk alle templates
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
                    href="/editor"
                    className="inline-block border-2 border-black bg-yellow-400 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-black"
                  >
                    Gebruik online
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Copy-ready voorbeelden
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Voorbeeldteksten voor online CV maken
          </h2>
          <div className="mt-6 space-y-5">
            {profileSamples.map((item) => (
              <article
                key={item.title}
                className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-black text-black">{item.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{item.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/tools/profieltekst-generator"
              className="border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black"
            >
              Gebruik profieltekst tool
            </Link>
            <Link
              href="/tools/werkervaring-bullets"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              Maak werkervaring bullets
            </Link>
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Veelgemaakte fouten
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Waar online CV makers vaak op vastlopen
            </h2>
            <div className="mt-4 space-y-3">
              {mistakeFixes.map((item) => (
                <div key={item.title}>
                  <p className="text-sm font-bold leading-relaxed text-slate-100">{item.title}</p>
                  <p className="text-sm font-medium leading-relaxed text-slate-300">{item.fix}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="border-4 border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Interne vervolgstappen
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Maak je online workflow compleet
            </h2>
            <div className="mt-4 space-y-4">
              {[
                {
                  href: "/cv-maken",
                  title: "CV maken hoofdgids",
                  body: "Gebruik de complete parent hub voor strategie, inhoud en optimalisatie.",
                },
                {
                  href: "/cv-opstellen",
                  title: "CV opstellen gids",
                  body: "Volg de structuurvolgorde per sectie als je vooral hulp nodig hebt bij opbouw.",
                },
                {
                  href: "/gratis-cv-template",
                  title: "Gratis CV templates",
                  body: "Vergelijk template-richtingen en kies de beste layout voor jouw rol.",
                },
                {
                  href: "/cv-voorbeelden",
                  title: "CV voorbeelden per beroep",
                  body: "Bekijk inhoudelijke voorbeelden voor concrete functies en sectoren.",
                },
                {
                  href: "/prijzen",
                  title: "Prijzen",
                  body: "Bekijk wanneer je betaalt en waarom er geen maandabonnement nodig is.",
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
            Veelgestelde vragen over online CV maken
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
                Klaar om online te starten?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Maak nu online je CV en rond af wanneer je tevreden bent
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Gebruik deze workflow, pas je inhoud vacaturegericht aan en zet in korte tijd een sterke versie klaar voor verzending.
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
