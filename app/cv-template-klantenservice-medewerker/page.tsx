import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getTemplateConfig } from "@/lib/templates/registry";

const modernTemplate = getTemplateConfig("modern");
const professionalTemplate = getTemplateConfig("professional");
const atsTemplate = getTemplateConfig("ats");

const recruiterSignals = [
  "Klanttevredenheid zichtbaar met metrics zoals CSAT, NPS of FCR.",
  "Kanaalervaring expliciet genoemd: telefoon, e-mail, chat en social care.",
  "Goede balans tussen snelheid (SLA) en kwaliteit van afhandeling.",
  "Aantoonbare ervaring met CRM- en ticketsystemen.",
];

const templateCards = [
  {
    label: "Beste allround keuze",
    name: modernTemplate.nameDutch,
    body: "Frisse, professionele template die goed past bij klantgerichte rollen waar communicatie en energie belangrijk zijn.",
    fit: "Past goed bij: klantenservice medewerker, customer support, service advisor.",
  },
  {
    label: "Voor stabiele zakelijke uitstraling",
    name: professionalTemplate.nameDutch,
    body: "Rustige, betrouwbare layout voor servicefuncties in corporate, finance, zorg en overheid.",
    fit: "Past goed bij: customer care in formele omgevingen en backoffice service.",
  },
  {
    label: "Voor maximale ATS-veiligheid",
    name: atsTemplate.nameDutch,
    body: "Heldere structuur voor vacatures met veel kandidaten en strikte softwareselectie.",
    fit: "Past goed bij: grote werkgevers en portals met standaard ATS-screening.",
  },
];

const profileExamples = [
  {
    title: "Algemeen klantenservice medewerker (medior)",
    text: "Klantgerichte klantenservice medewerker met 4+ jaar ervaring in telefonie, e-mail en chat binnen KPI-gestuurde teams. Verhoogde first contact resolution van 71% naar 82% door betere intakevragen en kennisbankgebruik. Ik combineer empathie met duidelijke afhandeling en betrouwbare opvolging.",
  },
  {
    title: "Starter / junior klantenservice",
    text: "Servicegerichte starter met stage- en bijbaanervaring in klantcontact, ordervragen en klachtenafhandeling. Ik behaalde consequent hoge klantwaardering door helder te communiceren en cases volledig af te ronden. Ik zoek een junior supportrol waarin ik klantgerichtheid en leersnelheid inzet.",
  },
  {
    title: "E-commerce customer support",
    text: "Customer support specialist met 3 jaar ervaring in e-commerce, met focus op retouren, leveringsvragen en accountcases. Ik verlaagde escalaties met 19% door proactieve opvolgberichten en betere statuscommunicatie. Ik help teams klantverwachtingen beter managen zonder snelheid te verliezen.",
  },
  {
    title: "Senior klantenservice / teamondersteunend",
    text: "Ervaren klantenservice professional met 7 jaar ervaring in omni-channel support en kwaliteitsverbetering. Ik verhoogde CSAT naar 9.1 door coachingsfeedback, scherpere scripts en betere escalatieregels. Ik neem eigenaarschap op servicekwaliteit en kennisdeling binnen het team.",
  },
];

const impactBullets = [
  "First contact resolution verhoogd van 68% naar 79% via verbeterde intakevragen.",
  "CSAT-score structureel verbeterd door consequente follow-up binnen afgesproken SLA.",
  "Escalatievolume verlaagd door terugkerende issues te signaleren en procesmatig op te lossen.",
  "Gemiddelde afhandeltijd verlaagd zonder kwaliteitsverlies door kennisbankoptimalisatie.",
  "CRM-registratie opgeschoond waardoor overdracht tussen shifts betrouwbaarder werd.",
  "Klantfeedback geclusterd en vertaald naar concrete verbeteracties voor operations.",
  "Chat- en e-mailtemplates geoptimaliseerd met hogere duidelijkheid en minder herhaalvragen.",
  "Piekmomenten opgevangen met prioriteringsregels waardoor wachttijden beperkt bleven.",
];

const hardSkills = [
  "CRM-systemen (Salesforce, Zendesk, Freshdesk of vergelijkbaar)",
  "Ticketing en casebeheer",
  "SLA-bewaking en prioritering",
  "E-mail en chatcommunicatie op hoog tempo",
  "Call handling en gesprekssamenvatting",
  "Basis rapportage op CSAT, NPS, FCR en afhandeltijd",
];

const softSkills = [
  "Empathische communicatie",
  "De-escaleren van frustratie",
  "Probleemoplossend denken",
  "Stressbestendigheid tijdens piekdrukte",
  "Nauwkeurige opvolging",
  "Samenwerken met operations en productteams",
];

const atsKeywords = [
  "klantenservice medewerker",
  "customer support",
  "customer care",
  "first contact resolution",
  "CSAT",
  "NPS",
  "SLA",
  "CRM",
  "ticketing",
  "klachtenafhandeling",
  "escalatie",
  "omnichannel",
];

const starterPlan = [
  "Gebruik stage, bijbaan of vrijwilligerswerk met klantcontact als bewijs van servicegedrag.",
  "Noem altijd kanaalervaring, ook als je vooral mail of telefoon deed.",
  "Laat zien hoe je lastige cases afrondde in plaats van alleen taken op te sommen.",
  "Voeg een korte KPI-indicatie toe, bijvoorbeeld klantwaardering of oplossingspercentage.",
];

const mistakes = [
  "Alleen schrijven dat je klantvriendelijk bent zonder meetbaar bewijs.",
  "Geen onderscheid maken tussen telefoon, chat en e-mailervaring.",
  "Te algemene bullets zonder resultaat of verbeterimpact.",
  "CV niet afstemmen op vacaturetermen zoals SLA, CRM of klantbehoud.",
];

const faqs = [
  {
    question: "Wat is het beste cv template voor klantenservice medewerker?",
    answer:
      "Meestal werkt een moderne of professionele template het best: duidelijk, scanbaar en klantgericht zonder visuele ruis. Voor extra softwareveiligheid kun je ook een ATS-vriendelijke template gebruiken.",
  },
  {
    question: "Welke vaardigheden moet ik op een klantenservice cv zetten?",
    answer:
      "Combineer hard skills zoals CRM, ticketing, SLA-bewaking en kanaalervaring met soft skills zoals empathie, de-escalatie en probleemoplossend vermogen. Koppel vaardigheden altijd aan concrete resultaten.",
  },
  {
    question: "Hoe maak ik een klantenservice cv zonder veel ervaring?",
    answer:
      "Gebruik relevante praktijk uit stage, bijbaan of retail/horeca. Laat zien hoe je klantvragen oploste, klachten afhandelde en opvolging deed. Ook kleine, concrete resultaten maken verschil.",
  },
  {
    question: "Wat is het verschil tussen cv template en cv voorbeeld voor klantenservice?",
    answer:
      "Een template geeft je de juiste structuur en layout. Een voorbeeld helpt je met inhoud en formuleringen. Het sterkste resultaat krijg je door beide te combineren in de editor.",
  },
];

export const metadata: Metadata = {
  title: "CV Template Klantenservice Medewerker - Direct Sollicitatieklaar | WerkCV.nl",
  description:
    "Gebruik het beste CV template voor klantenservice medewerker. Inclusief profieltekst voorbeelden, KPI-bullets, ATS-keywords en startertips. Start gratis in de editor.",
  keywords: [
    "cv template klantenservice medewerker",
    "klantenservice medewerker cv template",
    "customer service cv template",
    "customer support cv voorbeeld",
    "klantenservice cv maken",
    "klantenservice cv vaardigheden",
    "customer care cv",
    "cv voorbeeld klantenservice medewerker template",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-template-klantenservice-medewerker",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-template-klantenservice-medewerker",
      "x-default": "https://werkcv.nl/cv-template-klantenservice-medewerker",
    },
  },
};

export default function CvTemplateKlantenserviceMedewerkerPage() {
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
        name: "CV Template Klantenservice Medewerker",
        item: "https://werkcv.nl/cv-template-klantenservice-medewerker",
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
              Rol-intent: klantenservice
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV template klantenservice medewerker dat snelheid en servicekwaliteit overtuigend laat zien
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              In klantenservice wordt je CV geselecteerd op twee dimensies: hoe goed je klanten helpt en hoe consistent je prestaties zijn. Deze pagina combineert templatekeuze met
              copy-ready profielteksten, KPI-bullets en ATS-termen zodat je direct een sterkere sollicitatie neerzet.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Start met klantenservice template
              </Link>
              <Link
                href="/cv-gids/cv-voorbeeld-klantenservice-medewerker"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk volledig CV voorbeeld
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Template + KPI content in een flow",
                "Klantservice ATS-keywords",
                "Gratis starten, pas betalen bij download",
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
            <h2 className="text-xl font-black text-black">Wat recruiters direct checken bij klantenservice CV&apos;s</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              {recruiterSignals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/tools/cv-keywords"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Check je vacaturematch met de CV keywords tool
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Template-keuze
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Welke CV template werkt het best voor klantenservice medewerker?
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {templateCards.map((card) => (
              <article
                key={card.name}
                className="flex h-full flex-col border-4 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
                  {card.label}
                </p>
                <h3 className="mt-2 text-xl font-black text-black">{card.name}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{card.body}</p>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{card.fit}</p>
                <div className="mt-auto pt-5">
                  <Link
                    href="/editor"
                    className="inline-block border-2 border-black bg-yellow-400 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-black"
                  >
                    Gebruik in editor
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <Link
              href="/modern-cv-template"
              className="border-2 border-black bg-white p-4 text-sm font-black text-black transition-colors hover:bg-yellow-100"
            >
              Vergelijk met modern CV template
            </Link>
            <Link
              href="/professioneel-cv-template"
              className="border-2 border-black bg-white p-4 text-sm font-black text-black transition-colors hover:bg-yellow-100"
            >
              Vergelijk met professioneel CV template
            </Link>
            <Link
              href="/ats-cv-template"
              className="border-2 border-black bg-white p-4 text-sm font-black text-black transition-colors hover:bg-yellow-100"
            >
              Vergelijk met ATS CV template
            </Link>
            <Link
              href="/cv-template-verkoopmedewerker"
              className="border-2 border-black bg-white p-4 text-sm font-black text-black transition-colors hover:bg-yellow-100"
            >
              Bekijk verkoopmedewerker variant
            </Link>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Copy-ready profieltekst
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Profieltekst voorbeelden voor klantenservice functies
          </h2>
          <div className="mt-6 space-y-5">
            {profileExamples.map((example) => (
              <article
                key={example.title}
                className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-black text-black">{example.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{example.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/tools/profieltekst-generator"
              className="border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black"
            >
              Genereer profieltekst
            </Link>
            <Link
              href="/profieltekst-cv-voorbeelden"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              Meer profieltekst voorbeelden
            </Link>
            <Link
              href="/sollicitatiebrief-voorbeeld-klantenservice"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              Voorbeeld sollicitatiebrief klantenservice
            </Link>
          </div>
        </section>

        <section className="mb-14 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Werkervaring bullets
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Sterke KPI-bullets voor je klantenservice CV
            </h2>
            <ul className="mt-5 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
              {impactBullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/tools/werkervaring-bullets"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Maak service-bullets op maat met de werkervaring tool
              </Link>
            </div>
          </div>

          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Skills + ATS termen
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Vaardigheden en keywords die in servicevacatures terugkomen
            </h2>
            <div className="mt-5 grid gap-4">
              <div className="border-2 border-black bg-[#FFFEF0] p-4">
                <p className="text-sm font-black text-black">Hard skills</p>
                <ul className="mt-2 space-y-1 text-sm font-medium text-slate-700">
                  {hardSkills.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="border-2 border-black bg-[#FFFEF0] p-4">
                <p className="text-sm font-black text-black">Soft skills</p>
                <ul className="mt-2 space-y-1 text-sm font-medium text-slate-700">
                  {softSkills.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
                ATS keyword bank
              </p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                {atsKeywords.join(" | ")}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Zonder ervaring
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Zo bouw je een sterk klantenservice CV als starter
            </h2>
            <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-200">
              {starterPlan.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="border-4 border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Veelgemaakte fouten
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Wat je uitnodigingen kan blokkeren in klantenservice
            </h2>
            <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
              {mistakes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-2 border-black pt-4">
              <Link
                href="/cv-gids/cv-voorbeeld-klantenservice-medewerker"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Bekijk ook: volledig CV voorbeeld klantenservice medewerker
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over een CV template voor klantenservice medewerker
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
                Klaar om je klantenservice CV af te maken?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Bouw je CV in de editor en solliciteer met meer bewijs en structuur
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Start gratis met de juiste template, pas de KPI-voorbeelden aan op jouw ervaring en download pas als je tevreden bent.
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

      <Footer />
    </div>
  );
}
