import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import SectionIntentLinks from "@/components/seo/SectionIntentLinks";
import { getTemplateConfig } from "@/lib/templates/registry";

const modernTemplate = getTemplateConfig("modern");
const professionalTemplate = getTemplateConfig("professional");
const atsTemplate = getTemplateConfig("ats");

const recruiterSignals = [
  "Meetbare campagneresultaten zoals CTR, CPL, conversie, ROAS of omzetbijdrage.",
  "Kanaalervaring duidelijk benoemd: SEO, SEA, social, e-mail en content.",
  "Sterke vertaling van data naar concrete optimalisatie-acties.",
  "Samenwerking met sales, design en productteams voor betere funnel-output.",
];

const templateCards = [
  {
    label: "Beste allround keuze",
    name: modernTemplate.nameDutch,
    body: "Moderne, heldere layout die goed werkt voor marketingrollen met veel kanaal- en resultaatinformatie.",
    fit: "Past goed bij: marketing medewerker, online marketeer, content marketeer.",
  },
  {
    label: "Voor zakelijke teams",
    name: professionalTemplate.nameDutch,
    body: "Rustige, professionele opmaak voor corporates en B2B-omgevingen waar structuur en betrouwbaarheid tellen.",
    fit: "Past goed bij: marketing in scale-ups, agencies en corporate teams.",
  },
  {
    label: "Voor maximale ATS-veiligheid",
    name: atsTemplate.nameDutch,
    body: "Sterke keuze als je via grote vacaturesites en ATS-gestuurde selectie solliciteert.",
    fit: "Past goed bij: hoge sollicitatievolumes en strikte software-screening.",
  },
];

const profileExamples = [
  {
    title: "Marketing medewerker (allround)",
    text: "Resultaatgerichte marketing medewerker met 4 jaar ervaring in digitale campagnes, e-mailflows en contentoptimalisatie. Ik verhoogde de leadkwaliteit door betere segmentatie en campagne-afstemming met sales. Ik combineer creativiteit met data om structureel betere funnelresultaten te realiseren.",
  },
  {
    title: "Online marketeer (performance focus)",
    text: "Datagedreven online marketeer met ervaring in SEA, paid social en landing page optimalisatie. Ik verlaagde CPL met 24% via gerichte doelgroepsegmentatie en creatieve A/B-tests. Ik neem eigenaarschap van briefing tot rapportage en stuur actief op rendement.",
  },
  {
    title: "Content marketeer",
    text: "Content marketeer met 3+ jaar ervaring in SEO-content, social distributie en e-mailnurture. Ik verhoogde organisch verkeer met consistente topic-clusters en verbeterde contentstructuur. Ik schrijf en optimaliseer content die zowel vindbaarheid als conversie ondersteunt.",
  },
  {
    title: "Starter / junior marketing",
    text: "Leergierige marketingstarter met stage-ervaring in social content, basis-ads en campagnerapportages. Ik hielp bij het opzetten van maandelijkse contentplanning waardoor publicaties consistenter werden. Ik zoek een junior rol waarin ik snel groei op experimenten, data en kanaaluitvoering.",
  },
];

const impactBullets = [
  "CPL met 22% verlaagd door doelgroepsegmentatie en creatief-testplanning.",
  "Lead-to-meeting ratio verhoogd via betere afstemming tussen marketing en sales.",
  "Organisch verkeer vergroot met SEO-contentclusters rond commerciële zoekintentie.",
  "ROAS verbeterd door budgetverschuiving naar best presterende campagnesets.",
  "E-mail open- en click rates verhoogd door onderwerpregels en segmentatie te testen.",
  "Landing pages geoptimaliseerd met A/B-tests waardoor conversie steeg.",
  "Campagnerapportage gestandaardiseerd voor snellere besluitvorming in het team.",
  "Contentkalender ingericht waardoor output en kanaalconsistentie omhoog gingen.",
];

const hardSkills = [
  "SEO basis en contentoptimalisatie",
  "SEA / paid social campaign management",
  "E-mailmarketing en segmentatie",
  "Google Analytics / dashboardrapportage",
  "A/B testing en CRO-denken",
  "Campagneplanning en briefing",
];

const softSkills = [
  "Data-gedreven denken",
  "Creatief conceptmatig werken",
  "Sterke schriftelijke communicatie",
  "Samenwerken in cross-functionele teams",
  "Prioriteren op impact",
  "Eigenaarschap van uitvoering tot evaluatie",
];

const atsKeywords = [
  "marketing medewerker",
  "online marketeer",
  "content marketeer",
  "SEO",
  "SEA",
  "social media",
  "e-mailmarketing",
  "leadgeneratie",
  "conversie",
  "ROAS",
  "CPL",
  "Google Analytics",
];

const starterPlan = [
  "Gebruik stageprojecten en schoolopdrachten met duidelijke campagne-output.",
  "Noem de kanalen waarop je hebt gewerkt en wat je concreet hebt verbeterd.",
  "Voeg kleine maar meetbare resultaten toe, bijvoorbeeld groei in clicks of leads.",
  "Koppel elke skill aan context zodat je geen algemene marketingclaims doet.",
];

const mistakes = [
  "Alleen schrijven dat je creatief bent zonder campagnebewijs of metrics.",
  "Kanaalervaring noemen zonder resultaten of leerpunten uit optimalisatie.",
  "Geen vacaturetaal gebruiken zoals leadgeneratie, conversie en funnel.",
  "Te veel tools opsommen zonder aan te geven wat je er daadwerkelijk mee deed.",
];

const faqs = [
  {
    question: "Wat is het beste cv template voor marketing medewerker?",
    answer:
      "Meestal werkt een modern of professioneel template het best: visueel strak, maar vooral scanbaar voor recruiters. De inhoud blijft doorslaggevend, dus combineer layout met meetbare campagne-impact.",
  },
  {
    question: "Welke KPI's moet ik op een marketing CV zetten?",
    answer:
      "Gebruik KPI's zoals CTR, CPL, conversieratio, ROAS, organisch verkeer of leadkwaliteit. Kies KPI's die passen bij jouw kanaalwerk en rolverantwoordelijkheid.",
  },
  {
    question: "Hoe maak ik een marketing CV zonder lange werkervaring?",
    answer:
      "Gebruik stage, freelance of projectwerk met kanaaloutput en resultaten. Recruiters zien liever kleine, echte resultaten dan algemene omschrijvingen zonder bewijs.",
  },
  {
    question: "Wat is het verschil tussen een marketing CV template en een marketing CV voorbeeld?",
    answer:
      "Een template geeft structuur en opmaak. Een voorbeeld helpt je met inhoud en formuleringen. Samen zorgen ze voor een CV dat zowel professioneel oogt als inhoudelijk overtuigt.",
  },
];

const sourceLinks = [
  {
    label: "CV voorbeeld marketing manager (WerkCV)",
    href: "/cv-voorbeelden/marketing-en-communicatie/marketing-manager",
  },
  {
    label: "CV voorbeeld social media specialist (WerkCV)",
    href: "/cv-voorbeelden/marketing-en-communicatie/social-media-specialist",
  },
  {
    label: "Resume.io - Marketing Resume Examples",
    href: "https://resume.io/resume-examples/marketing",
  },
];

const marketingTemplateIntentLinks = [
  {
    href: "/cv-aanmaken",
    label: "CV aanmaken voor marketingrollen",
    description: "Start direct met een sollicitatieversie waarin campagne-impact en kanaalervaring centraal staan.",
  },
  {
    href: "/gratis-cv-template",
    label: "Gratis CV template voor marketeers",
    description: "Vergelijk eerst gratis layout-opties voordat je je marketing-CV afrondt.",
  },
  {
    href: "/cv-maken-template",
    label: "CV maken met template",
    description: "Gebruik een vaste templateflow om KPI's, cases en kanaalervaring beter te structureren.",
  },
  {
    href: "/modern-cv-template",
    label: "Modern CV template voor marketing",
    description: "Handig als je creativiteit en performance wilt laten zien zonder onrustige opmaak.",
  },
  {
    href: "/ats-cv-template",
    label: "ATS CV template voor grote marketingteams",
    description: "Relevant voor corporate vacatures en funnels met striktere ATS-screening.",
  },
];

export const metadata: Metadata = {
  title: "CV Template Marketing Medewerker - KPI-gedreven Sollicitatieklaar | WerkCV.nl",
  description:
    "Gebruik het beste CV template voor marketing medewerker. Inclusief profieltekst voorbeelden, campagne-KPI bullets, skills en ATS-keywords. Start gratis in de editor.",
  keywords: [
    "cv template marketing medewerker",
    "marketing medewerker cv template",
    "cv marketing medewerker voorbeeld",
    "marketing cv voorbeeld",
    "online marketeer cv",
    "content marketeer cv",
    "cv template marketeer",
    "marketing cv maken",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-template-marketing-medewerker",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-template-marketing-medewerker",
      "x-default": "https://werkcv.nl/cv-template-marketing-medewerker",
    },
  },
};

export default function CvTemplateMarketingMedewerkerPage() {
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
        name: "CV Template Marketing Medewerker",
        item: "https://werkcv.nl/cv-template-marketing-medewerker",
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
              Rol-intent: marketing
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV template marketing medewerker dat resultaat en creativiteit geloofwaardig combineert
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Bij marketing sollicitaties draait het om twee dingen: inhoud die overtuigt en metrics die bewijs leveren. Deze pagina helpt je met de juiste template, copy-ready profielteksten,
              KPI-bullets en ATS-termen zodat je direct sterker solliciteert.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Start met marketing template
              </Link>
              <Link
                href="/cv-voorbeelden/marketing-en-communicatie/marketing-manager"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk volledig CV voorbeeld
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Template + inhoud in één workflow",
                "Campagne-KPI voorbeelden",
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
            <h2 className="text-xl font-black text-black">Wat recruiters direct checken bij marketing CV&apos;s</h2>
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
            Welke CV template werkt het best voor marketing medewerker?
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
          <div className="mt-6 grid gap-4 md:grid-cols-5">
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
              href="/cv-template-verkoopmedewerker"
              className="border-2 border-black bg-white p-4 text-sm font-black text-black transition-colors hover:bg-yellow-100"
            >
              Bekijk verkoopmedewerker variant
            </Link>
            <Link
              href="/cv-template-office-manager"
              className="border-2 border-black bg-white p-4 text-sm font-black text-black transition-colors hover:bg-yellow-100"
            >
              Bekijk office manager variant
            </Link>
            <Link
              href="/templates"
              className="border-2 border-black bg-white p-4 text-sm font-black text-black transition-colors hover:bg-yellow-100"
            >
              Bekijk alle templates
            </Link>
          </div>
          <div className="mt-8 border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Template-intentie
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Van marketing template naar sollicitatieversie
            </h2>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
              Gebruik deze vervolgstappen als je vanuit marketing-intentie wilt doorpakken naar de beste template- of aanmaakroute voor performance-, content- en allround marketingrollen.
            </p>
            <SectionIntentLinks links={marketingTemplateIntentLinks} locale="nl" />
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Copy-ready profieltekst
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Profieltekst voorbeelden voor marketingrollen
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
          </div>
        </section>

        <section className="mb-14 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Werkervaring bullets
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Sterke campagne-bullets voor je marketing CV
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
                Maak marketing-bullets op maat met de werkervaring tool
              </Link>
            </div>
          </div>

          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Skills + ATS termen
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Vaardigheden en zoekwoorden die vaak in marketingvacatures terugkomen
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
              Zo bouw je een sterk marketing CV als starter
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
              Wat je uitnodigingen kan blokkeren in marketing sollicitaties
            </h2>
            <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
              {mistakes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-2 border-black pt-4">
              <Link
                href="/cv-voorbeelden/marketing-en-communicatie/marketing-manager"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Bekijk ook: volledig CV voorbeeld marketing manager
              </Link>
              <Link
                href="/sollicitatiebrief-voorbeeld-marketing"
                className="mt-3 block text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Match je CV met: sollicitatiebrief voorbeeld marketing
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Bronnen (laatst gecontroleerd: 9 maart 2026)
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Bronnen en inspiratie achter deze pagina
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
                <span className="mt-1 block break-all">{source.href.startsWith("http") ? source.href : `https://werkcv.nl${source.href}`}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over een CV template voor marketing medewerker
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
                Klaar om je marketing CV af te maken?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Bouw je CV in de editor en solliciteer met meer bewijs per campagne
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Start gratis met de juiste template, gebruik KPI-voorbeelden die passen bij je rol en download pas als je sollicitatieversie staat.
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
