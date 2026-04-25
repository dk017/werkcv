import type { Metadata } from "next";
import Link from "next/link";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import Footer from "@/components/Footer";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { siteUrl } from "@/lib/site-content";

const pageUrl = `${siteUrl}/cv-gids/cv-builder-opzeggen-en-alternatieven`;

const builders = [
  {
    name: "CVMaker",
    href: "/cvmaker-opzeggen",
    officialHref: "https://www.cvmaker.nl/prijzen",
    model: "14 dagen proefperiode, daarna maandelijks",
    summary:
      "De officiële prijzenpagina zegt dat je via Accountinstellingen en Abonnement kunt annuleren en noemt ook de helpdesk als alternatieve route.",
    watchout:
      "Controleer vooral de volgende verlengdatum en bewaar de bevestigingsmail waarin staat tot wanneer je toegang actief blijft.",
    compareHref: "/cv-gids/werkcv-vs-cvmaker",
    compareTitle: "CVMaker alternatief",
  },
  {
    name: "CV.nl",
    href: "/cv-nl-opzeggen",
    officialHref: "https://www.cv.nl/faq",
    model: "14 dagen gratis, daarna maandelijks",
    summary:
      "De officiële FAQ zegt dat opzeggen via Instellingen in je account werkt en dat je daarna automatisch een bevestiging per e-mail hoort te ontvangen.",
    watchout:
      "De voorwaarden zeggen dat je vóór de nieuwe periode moet opzeggen om automatische verlenging te voorkomen.",
    compareHref: "/cv-gids/werkcv-vs-cv-nl",
    compareTitle: "CV.nl alternatief",
  },
  {
    name: "CVster",
    href: "/cvster-opzeggen",
    officialHref: "https://help.cvster.nl/nl/articles/3831424",
    model: "7 dagen proefperiode, daarna premium",
    summary:
      "CVster zegt in het helpcentrum dat annuleren via Accountinstellingen kan en dat de contactpagina de fallback is als je niet meer kunt inloggen.",
    watchout:
      "Volgens de facturatie-uitleg kan een proefperiode automatisch omzetten naar premium als je niet op tijd annuleert.",
    compareHref: "/cv-gids/werkcv-vs-cvster",
    compareTitle: "CVster alternatief",
  },
  {
    name: "Resume.io",
    href: "/resume-io-opzeggen",
    officialHref: "https://help.resume.io/en/articles/3784896",
    model: "Planstructuur varieert per land",
    summary:
      "Resume.io zegt dat annuleren zelfs via de website kan zonder eerst in de app in te loggen en dat bevestiging per e-mail nodig is om het proces af te ronden.",
    watchout:
      "Niet elk plan verlengt hetzelfde. Resume.io noemt verschillende planvormen en locatieverschillen, dus controleer eerst welk type toegang jij hebt.",
    compareHref: "/cv-gids/werkcv-vs-resume-io",
    compareTitle: "Resume.io alternatief",
  },
  {
    name: "Zety",
    href: "/zety-opzeggen",
    officialHref: "https://zety.com/contact",
    model: "Trial en jaarplan met verlengvoorwaarden",
    summary:
      "Zety verwijst op de contact- en terms-pagina’s naar cancelen via support of via My Plan in je accountdashboard.",
    watchout:
      "Controleer of je op een trial- of jaarroute zit en bewaar de cancellation confirmation of het cancellation number goed.",
    compareHref: "/cv-gids/werkcv-vs-zety",
    compareTitle: "WerkCV vs Zety",
  },
  {
    name: "Novoresume",
    href: "/novoresume-opzeggen",
    officialHref: "https://novoresume.com/page/pricing",
    model: "Geen automatische subscription volgens pricingpagina",
    summary:
      "Novoresume positioneert dit minder als abonnement-opzeggen en meer als purchase cancellation of refund-intentie.",
    watchout:
      "De officiële terms noemen een 14-dagen cancellation/refundroute en vragen om order- en aankoopgegevens per e-mail.",
    compareHref: "/cv-gids/welke-cv-builder-past-bij-jou-in-nederland",
    compareTitle: "Welke CV builder past bij jou?",
  },
  {
    name: "LiveCareer",
    href: "/livecareer-opzeggen",
    officialHref: "https://www.livecareer.nl/gebruiksvoorwaarden",
    model: "Abonnement blijft lopen tot einde factureringsperiode",
    summary:
      "De Nederlandse voorwaarden zeggen dat je via Mijn account en Mijn instellingen kunt opzeggen of anders via de klantenservice.",
    watchout:
      "Na opzeggen stopt toegang niet altijd direct. De voorwaarden koppelen het einde van het abonnement aan de lopende factureringsperiode.",
    compareHref: "/cv-gids/werkcv-vs-livecareer",
    compareTitle: "LiveCareer alternatief",
  },
];

const sourceLinks = [
  { label: "CVMaker prijzen", href: "https://www.cvmaker.nl/prijzen" },
  { label: "CVMaker contact", href: "https://www.cvmaker.nl/contact" },
  { label: "CV.nl FAQ", href: "https://www.cv.nl/faq" },
  { label: "CV.nl voorwaarden", href: "https://www.cv.nl/terms" },
  { label: "CVster help: hoe zeg ik mijn account op?", href: "https://help.cvster.nl/nl/articles/3831424" },
  { label: "CVster help: hoe werkt facturering?", href: "https://help.cvster.nl/nl/articles/3832256" },
  { label: "Resume.io help: cancel, downgrade or delete your account", href: "https://help.resume.io/en/articles/3784896" },
  { label: "Resume.io help: how billing works", href: "https://help.resume.io/en/articles/3785664" },
  { label: "Resume.io pricing", href: "https://resume.io/pricing" },
  { label: "Zety contact", href: "https://zety.com/contact" },
  { label: "Zety pricing", href: "https://zety.com/pricing" },
  { label: "Zety terms of service", href: "https://zety.com/terms-of-service" },
  { label: "Novoresume pricing", href: "https://novoresume.com/page/pricing" },
  { label: "Novoresume terms and conditions", href: "https://novoresume.com/page/legal/terms-and-conditions" },
  { label: "LiveCareer Nederland gebruiksvoorwaarden", href: "https://www.livecareer.nl/gebruiksvoorwaarden" },
  { label: "LiveCareer Nederland contact", href: "https://www.livecareer.nl/contact" },
];

const checksBeforeCancelling = [
  "Controleer welk plan of welke proefperiode actief is voordat je opzegt.",
  "Let op de volgende verleng- of factuurdatum.",
  "Bewaar de bevestigingsmail of het opzeggingsnummer.",
  "Controleer of je nog toegang houdt tot het einde van de lopende periode.",
  "Download wat je nodig hebt voordat premiumtoegang eindigt.",
];

const faqs = [
  {
    question: "Welke cv-builders hebben meestal doorlopende billing?",
    answer:
      "Volgens de officiële pagina’s van CVMaker, CV.nl, CVster, Resume.io, Zety en LiveCareer moet je rekening houden met doorlopende billing of planverlenging, al verschillen trial- en jaarstructuren per platform. Novoresume positioneert zichzelf juist als niet-subscription based.",
  },
  {
    question: "Welke builder is het duidelijkst als ik juist geen abonnement wil?",
    answer:
      "Als je primaire doel is om weg te gaan van proefperiodes of maandelijkse verlenging, dan is een no-subscription route logischer dan nog een trial-model. Daarom sturen veel overstappers vanaf deze pagina door naar WerkCV’s vaste Nederlandse flow zonder maandabonnement.",
  },
  {
    question: "Moet ik altijd voor de volgende factuurdatum opzeggen?",
    answer:
      "In de praktijk wel. De officiële voorwaarden en helpteksten maken duidelijk dat timing belangrijk is om nieuwe verlenging of een volgende factureringsperiode te voorkomen.",
  },
  {
    question: "Waarom is Novoresume anders dan de andere opzegpagina’s?",
    answer:
      "Omdat Novoresume op de eigen pricingpagina zegt dat het model niet subscription based is. De zoekintentie gaat daar dus vaker over purchase cancellation, refund of twijfel over het juiste product dan over een klassiek maandabonnement.",
  },
  {
    question: "Is het slim om eerst op te zeggen of eerst een alternatief te kiezen?",
    answer:
      "Voor de meeste bezoekers is het slim om eerst te weten welk alternatief je daarna wilt gebruiken. Daarom combineert deze pagina opzeggen en overstappen in één overzicht.",
  },
];

export const metadata: Metadata = {
  title: "7 CV-builders opzeggen of cancelen + alternatieven (2026) | WerkCV",
  description:
    "CVMaker, CV.nl, CVster, Resume.io, Zety, Novoresume of LiveCareer stoppen? Bekijk per platform wat de officiële pagina's zeggen over opzeggen, cancelen of billing en welk alternatief daarna logischer is in Nederland.",
  keywords: [
    "cv builder opzeggen",
    "cv builder alternatieven",
    "cvmaker opzeggen",
    "cv.nl opzeggen",
    "cvster opzeggen",
    "resume.io opzeggen",
    "zety opzeggen",
    "novoresume opzeggen",
    "livecareer opzeggen",
    "cv maker zonder abonnement",
  ],
  alternates: {
    canonical: pageUrl,
    languages: {
      "nl-NL": pageUrl,
      "x-default": pageUrl,
    },
  },
  openGraph: {
    title: "7 CV-builders opzeggen of cancelen + alternatieven | WerkCV",
    description:
      "Vergelijk 7 opzegroutes en zie direct welk alternatief daarna beter past zonder trial- of maandelijkse frictie.",
    url: pageUrl,
    type: "article",
    locale: "nl_NL",
  },
};

export default function CvBuilderOpzeggenAlternatievenPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "CV gids",
        item: `${siteUrl}/cv-gids`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "CV-builder opzeggen en alternatieven",
        item: pageUrl,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "7 CV-builders opzeggen of cancelen en alternatieven in Nederland",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: builders.length,
    itemListElement: builders.map((builder, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: builder.name,
      url: `${siteUrl}${builder.href}`,
    })),
  };

  return (
    <div className="min-h-screen bg-[#FFFEF0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <FAQJsonLd questions={faqs} />

      <header className="relative z-10 border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-black">
              Werk<span className="bg-yellow-400 px-1">CV</span>.nl
            </span>
          </Link>
          <TrackedLandingLink
            href="/cv-maken-zonder-abonnement"
            trackingLocation="cv-builder-opzeggen-en-alternatieven:header_primary"
            trackingLabel="Alternatief zonder abonnement"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            Alternatief zonder abonnement
          </TrackedLandingLink>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 py-14">
        <section className="mb-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-slate-700">
              Switch-intent listicle
            </p>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-black md:text-5xl">
              7 CV-builders opzeggen of cancelen en betere alternatieven in Nederland
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Wie zoekt op opzeggen wil meestal twee dingen tegelijk: stoppen met een lopend
              plan en daarna bepalen welk alternatief beter past. Deze pagina vat daarom per
              platform samen wat de officiële bronnen zeggen en welke volgende stap logisch is.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLandingLink
                href="/cv-maken-zonder-abonnement"
                trackingLocation="cv-builder-opzeggen-en-alternatieven:hero_primary"
                trackingLabel="Bekijk alternatief zonder abonnement"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Bekijk alternatief zonder abonnement
              </TrackedLandingLink>
              <TrackedLandingLink
                href="/cv-gids/beste-cv-builder-zonder-abonnement"
                trackingLocation="cv-builder-opzeggen-en-alternatieven:hero_secondary"
                trackingLabel="Vergelijk zonder abonnement"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Vergelijk builders zonder abonnement
              </TrackedLandingLink>
            </div>
            <p className="mt-5 text-sm font-medium text-slate-600">
              Officiële bronnen gecheckt op 20 april 2026.
            </p>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Kort antwoord</h2>
            <div className="mt-5 space-y-4 text-sm font-medium leading-relaxed text-slate-700">
              <p>
                De meeste builders op deze pagina gebruiken trial-, premium- of
                abonnementslogica die je actief moet stoppen.
              </p>
              <p>
                De duidelijkste uitzondering is Novoresume, dat zichzelf op de pricingpagina
                neerzet als niet-subscription based.
              </p>
              <p>
                Voor Nederlandse bezoekers is de praktische vraag meestal niet alleen
                hoe je opzegt, maar ook of een rustiger alternatief zonder maandmodel beter past.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Vergelijk eerst
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Welk type opzeg- of overstapintentie heb je?
          </h2>
          <div className="mt-6 overflow-hidden border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="grid grid-cols-[0.9fr_1fr_1.2fr] border-b-4 border-black bg-black text-sm font-black text-white">
              <div className="px-4 py-3">Builder</div>
              <div className="px-4 py-3">Bekend model</div>
              <div className="px-4 py-3">Belangrijkste check</div>
            </div>
            {builders.map((builder) => (
              <Link
                key={builder.name}
                href={builder.href}
                className="grid grid-cols-[0.9fr_1fr_1.2fr] border-b border-black bg-white text-sm transition-colors hover:bg-yellow-50"
              >
                <div className="px-4 py-4 font-black text-black">{builder.name}</div>
                <div className="px-4 py-4 font-medium leading-relaxed text-slate-700">
                  {builder.model}
                </div>
                <div className="px-4 py-4 font-medium leading-relaxed text-slate-700">
                  {builder.watchout}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            De lijst
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Per platform: opzeggen, valkuil en beste volgende stap
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {builders.map((builder, index) => (
              <article
                key={builder.name}
                className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                  #{index + 1}
                </p>
                <h3 className="mt-2 text-2xl font-black text-black">{builder.name}</h3>
                <div className="mt-4 border-2 border-black bg-[#FFFEF9] p-4">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                    Wat de officiële pagina’s zeggen
                  </p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-black">
                    {builder.summary}
                  </p>
                </div>
                <div className="mt-4 grid gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                      Bekend model
                    </p>
                    <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">
                      {builder.model}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                      Check dit vóór je opzegt
                    </p>
                    <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">
                      {builder.watchout}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <TrackedLandingLink
                    href={builder.href}
                    trackingLocation={`cv-builder-opzeggen-en-alternatieven:${builder.name.toLowerCase()}:detail`}
                    trackingLabel={`${builder.name} opzeggen`}
                    className="border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black"
                  >
                    Open opzegroute
                  </TrackedLandingLink>
                  <TrackedLandingLink
                    href={builder.compareHref}
                    trackingLocation={`cv-builder-opzeggen-en-alternatieven:${builder.name.toLowerCase()}:compare`}
                    trackingLabel={builder.compareTitle}
                    className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
                  >
                    {builder.compareTitle}
                  </TrackedLandingLink>
                </div>
                <div className="mt-4">
                  <a
                    href={builder.officialHref}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-black text-black underline decoration-2 underline-offset-4"
                  >
                    Officiële bron openen
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Voor je opzegt
            </p>
            <h2 className="mt-2 text-2xl font-black">
              5 dingen die je eerst moet checken
            </h2>
            <div className="mt-4 space-y-3">
              {checksBeforeCancelling.map((check, index) => (
                <div key={check} className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center border-2 border-white bg-yellow-300 text-xs font-black text-black">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-slate-200">
                    {check}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-4 border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Beste volgende stap
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Ga eerst naar het alternatief zonder abonnement
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              De meeste bezoekers op deze pagina zoeken uiteindelijk een simpeler model,
              niet nóg een trialroute. Daarom is de logische volgende stap om eerst het
              no-subscription alternatief te bekijken en pas daarna verder te vergelijken.
            </p>
            <div className="mt-5 space-y-4">
              <TrackedLandingLink
                href="/cv-maken-zonder-abonnement"
                trackingLocation="cv-builder-opzeggen-en-alternatieven:next_primary"
                trackingLabel="Bekijk alternatief zonder abonnement"
                className="block border-2 border-black bg-[#FFFEF0] p-4 transition-colors hover:bg-yellow-100"
              >
                <span className="text-sm font-black text-black">
                  Alternatief zonder abonnement
                </span>
                <span className="mt-1 block text-sm font-medium leading-relaxed text-slate-700">
                  Kijk eerst hoe een Nederlandse CV-flow zonder maandelijkse verlenging werkt.
                </span>
              </TrackedLandingLink>
              <TrackedLandingLink
                href="/prijzen"
                trackingLocation="cv-builder-opzeggen-en-alternatieven:next_pricing"
                trackingLabel="WerkCV prijzen"
                className="block border-2 border-black bg-[#FFFEF0] p-4 transition-colors hover:bg-yellow-100"
              >
                <span className="text-sm font-black text-black">WerkCV prijzen</span>
                <span className="mt-1 block text-sm font-medium leading-relaxed text-slate-700">
                  Bekijk daarna hoe het eenmalige prijsmodel werkt en wanneer je betaalt.
                </span>
              </TrackedLandingLink>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Bronnen
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Officiële bronpagina’s achter deze lijst
          </h2>
          <div className="mt-6 space-y-3">
            {sourceLinks.map((source) => (
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
            Veelgestelde vragen over cv-builders opzeggen
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
                Klaar met trial- en abonnementsfrictie?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Kies daarna een Nederlandse CV-route die eenvoudiger aanvoelt
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Gebruik eerst de juiste opzegroute, maar beslis daarna bewust welk model je
                voor je volgende sollicitatie wilt gebruiken.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <TrackedLandingLink
                href="/cv-maken-zonder-abonnement"
                trackingLocation="cv-builder-opzeggen-en-alternatieven:footer_primary"
                trackingLabel="Bekijk alternatief"
                className="border-4 border-black bg-black px-5 py-3 text-center text-base font-black text-white"
              >
                Bekijk alternatief
              </TrackedLandingLink>
              <TrackedLandingLink
                href="/cv-gids/beste-cv-builder-zonder-abonnement"
                trackingLocation="cv-builder-opzeggen-en-alternatieven:footer_secondary"
                trackingLabel="Vergelijk builders"
                className="border-4 border-black bg-white px-5 py-3 text-center text-base font-black text-black"
              >
                Vergelijk builders
              </TrackedLandingLink>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
