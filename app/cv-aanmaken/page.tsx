import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { templateList } from "@/lib/templates/registry";

const featuredTemplates = templateList.filter((template) =>
  ["simple", "professional", "ats", "modern"].includes(template.id),
);

const templateUseCases: Record<string, string> = {
  simple:
    "De snelste start voor een eerste versie zonder dat je vastloopt op designkeuzes.",
  professional:
    "Veilige keuze als je direct een zakelijke uitstraling wilt voor brede Nederlandse functies.",
  ats: "Handig voor sollicitaties waar scanbaarheid, standaardkoppen en recruiter-proof structuur prioriteit hebben.",
  modern:
    "Goede optie als je snel wilt starten maar wel een frissere uitstraling zoekt voor marketing, sales of tech.",
};

const quickStartSteps = [
  {
    title: "1) Kies een basistemplate die weinig frictie geeft",
    body: "Voor cv aanmaken werkt een simpele of professionele template vaak het best. Je wilt eerst starten, niet eindeloos dubben over design.",
  },
  {
    title: "2) Vul meteen naam, contactgegevens en functierichting in",
    body: "Zodra basisgegevens en een duidelijke functietitel staan, voelt het CV niet meer leeg en wordt de rest van de invuloefening veel makkelijker.",
  },
  {
    title: "3) Schrijf een korte profieltekst met doel en bewijs",
    body: "In 3 tot 4 zinnen laat je zien wie je bent, waar je goed in bent en wat je nu zoekt. Dat geeft richting aan alle volgende secties.",
  },
  {
    title: "4) Voeg werkervaring, opleiding en vaardigheden toe in logische volgorde",
    body: "Begin met de meest relevante ervaring en houd secties compact. Zo zet je snel een versie neer die recruiter en ATS kunnen volgen.",
  },
  {
    title: "5) Werk daarna pas verder aan vacatureversies en download",
    body: "Cv aanmaken is de eerste stap. Daarna pas optimaliseer je per vacature, vergelijk je templates en besluit je of je de PDF wilt downloaden.",
  },
];

const fastBenefits = [
  "Je begint vanuit een duidelijke template in plaats van een leeg document.",
  "Je maakt snel een eerste versie die later per vacature verfijnd kan worden.",
  "Je voorkomt opmaakstress in Word of losse design-tools.",
  "Je ziet direct welke vaste secties nog ontbreken.",
  "Je werkt vanuit hetzelfde CV door naar een definitieve sollicitatieversie.",
];

const audienceCards = [
  {
    title: "Voor starters",
    body: "Gebruik studie, stage, bijbaan en projecten om snel een eerste professioneel CV neer te zetten.",
  },
  {
    title: "Voor carrièreswitchers",
    body: "Begin met overdraagbare vaardigheden en maak daarna de brug naar je nieuwe richting.",
  },
  {
    title: "Voor ervaren kandidaten",
    body: "Maak eerst de basisversie compleet en ga daarna schrappen, prioriteren en toespitsen op de vacature.",
  },
];

const mistakes = [
  {
    title: "Fout: denken dat cv aanmaken en cv afronden hetzelfde is",
    fix: "Fix: behandel aanmaken als je basisversie. Het echte winnen zit daarna in aanscherpen per vacature.",
  },
  {
    title: "Fout: te lang blijven hangen in templatekeuze",
    fix: "Fix: kies eerst een rustige standaardtemplate en optimaliseer design pas nadat de inhoud staat.",
  },
  {
    title: "Fout: secties invullen zonder functierichting",
    fix: "Fix: zet al bij het aanmaken een duidelijke functietitel of doelrol bovenaan je CV.",
  },
];

const faqs = [
  {
    question: "Wat is het verschil tussen cv aanmaken en cv maken?",
    answer:
      "Cv aanmaken draait vooral om snel een eerste bruikbare basisversie opzetten. Cv maken gaat daarna verder met aanscherpen, structureren en optimaliseren voor echte sollicitaties.",
  },
  {
    question: "Hoe maak ik snel een eerste CV aan?",
    answer:
      "Kies een template, vul direct je basisgegevens en functietitel in, schrijf een korte profieltekst en voeg daarna werkervaring, opleiding en vaardigheden toe.",
  },
  {
    question: "Is cv aanmaken bij WerkCV gratis te starten?",
    answer:
      "Ja. Je kunt gratis beginnen in de editor en pas betalen wanneer je de definitieve PDF wilt downloaden.",
  },
  {
    question: "Welke template is het beste om een CV mee aan te maken?",
    answer:
      "De Simpel-, Professioneel- en ATS-templates zijn het meest praktisch voor een snelle eerste versie. Ze geven direct structuur zonder veel afleiding.",
  },
  {
    question: "Moet ik meteen alles perfect invullen?",
    answer:
      "Nee. Het doel van cv aanmaken is vooral een complete basis. Daarna kun je makkelijker schrappen, herschrijven en je CV per vacature verbeteren.",
  },
];

export const metadata: Metadata = {
  title: "CV Aanmaken - Snel een Eerste Professionele Versie Starten | WerkCV",
  description:
    "CV aanmaken in een paar duidelijke stappen. Start gratis, vul direct je eerste professionele versie in en werk daarna verder in de editor.",
  keywords: [
    "cv aanmaken",
    "gratis cv aanmaken",
    "cv aan maken",
    "online cv aanmaken",
    "mijn cv maken",
    "maak cv",
    "cv aanmaken gratis",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-aanmaken",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-aanmaken",
      "x-default": "https://werkcv.nl/cv-aanmaken",
    },
  },
};

export default function CvAanmakenPage() {
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
        name: "CV Aanmaken",
        item: "https://werkcv.nl/cv-aanmaken",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "CV aanmaken in 5 stappen",
    description:
      "Snelle flow voor mensen die eerst een complete basisversie van hun CV willen opzetten.",
    totalTime: "PT20M",
    step: quickStartSteps.map((step) => ({
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
              Start-intentie: cv aanmaken
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV aanmaken zonder vast te lopen op een lege pagina
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Zoekers op cv aanmaken willen meestal één ding: snel een eerste versie
              neerzetten die professioneel oogt en later verder kan worden verfijnd.
              Deze pagina helpt je die eerste stap compact en logisch te zetten,
              zonder dat je direct verdwaalt in design, details of te veel opties.
            </p>
            <p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-slate-600">
              Zie dit als de snelle start-route. Voor de volledige aanpak rond
              structuur, vacatureaanpassing en ATS-logica gebruik je daarna beter{" "}
              <Link
                href="/cv-maken"
                className="font-black text-black underline decoration-2 underline-offset-4"
              >
                de hoofdgids CV maken
              </Link>
              .
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Maak direct je eerste CV aan
              </Link>
              <Link
                href="/templates"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk templates eerst
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Snelle eerste versie",
                "Gratis starten in editor",
                "Later aanscherpen per vacature",
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
            <h2 className="text-xl font-black text-black">
              Waarom cv aanmaken een eigen intentie is
            </h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              {fastBenefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/cv-maken"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Ga daarna verder met het volledige CV stappenplan
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Workflow
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            CV aanmaken in 5 snelle stappen
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {quickStartSteps.map((step) => (
              <article
                key={step.title}
                className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-xl font-black text-black">{step.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-5 md:grid-cols-3">
          {audienceCards.map((card, index) => (
            <div
              key={card.title}
              className={`border-4 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] ${
                index === 1 ? "bg-yellow-400" : "bg-white"
              }`}
            >
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-700">
                {card.title}
              </p>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-800">
                {card.body}
              </p>
            </div>
          ))}
        </section>

        <section className="mb-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                Beste starttemplates
              </p>
              <h2 className="text-3xl font-black text-black">
                Templates waarmee je snel een eerste CV aanmaakt
              </h2>
            </div>
            <Link
              href="/templates"
              className="text-sm font-black text-black underline decoration-2 underline-offset-4"
            >
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
                <h3 className="mt-2 text-xl font-black text-black">
                  {template.name}
                </h3>
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
                    Start nu
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Veelgemaakte fouten
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Waar cv aanmaken vaak onnodig stroef wordt
            </h2>
            <div className="mt-4 space-y-3">
              {mistakes.map((item) => (
                <div key={item.title}>
                  <p className="text-sm font-bold leading-relaxed text-slate-100">
                    {item.title}
                  </p>
                  <p className="text-sm font-medium leading-relaxed text-slate-300">
                    {item.fix}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Slimme vervolgstappen
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Bouw door vanuit je eerste versie
            </h2>
            <div className="mt-4 space-y-4">
              {[
                {
                  href: "/gratis-cv-maken",
                  title: "Gratis CV maken",
                  body: "Voor bezoekers die vooral geruststelling zoeken over prijs, gratis starten en het moment van betalen.",
                },
                {
                  href: "/cv-maken",
                  title: "CV maken",
                  body: "Gebruik daarna de uitgebreidere gids voor profieltekst, bulletwriting en vacaturegerichte optimalisatie.",
                },
                {
                  href: "/cv-opstellen",
                  title: "CV opstellen",
                  body: "Loopt de basis wel, maar twijfel je nog over volgorde en structuur? Dan is dit de juiste vervolgstap.",
                },
                {
                  href: "/cv-voorbeelden",
                  title: "CV voorbeelden",
                  body: "Vergelijk echte voorbeelden per beroep als je meer houvast nodig hebt na je eerste opzet.",
                },
                {
                  href: "/prijzen",
                  title: "Prijzen",
                  body: "Check hoe het eenmalige downloadmodel werkt zodra je CV klaar is om te versturen.",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block border-2 border-black bg-[#FFFEF0] p-4 transition-colors hover:bg-yellow-100"
                >
                  <p className="text-sm font-black text-black">{item.title}</p>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">
                    {item.body}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over CV aanmaken
          </h2>
          <div className="mx-auto mt-8 max-w-3xl space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <summary className="flex cursor-pointer items-center justify-between p-4 text-left text-base font-black text-black">
                  {faq.question}
                  <span className="ml-3 text-xl transition-transform group-open:rotate-45">
                    +
                  </span>
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
                Klaar om je basisversie op te zetten?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Maak je eerste CV aan en verfijn daarna pas per vacature
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Begin compact, zet de structuur neer en gebruik daarna voorbeelden,
                templates en vacatureaanpassingen om je CV sterker te maken.
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
