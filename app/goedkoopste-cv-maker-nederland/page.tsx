import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import MobileStickyCta from "@/components/landing/MobileStickyCta";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import {
  consumerCvPricingFacts,
  formatPricingCheckedAtNl,
  toConsumerCvPricingView,
  type ConsumerCvPricingModel,
} from "@/lib/commercial/consumer-cv-pricing";
import { cvDownloadPrice } from "@/lib/site-content";

const pageUrl = "https://werkcv.nl/goedkoopste-cv-maker-nederland";
export const revalidate = 86400;

const comparisonNow = new Date();
const competitorViews = consumerCvPricingFacts.map((fact) =>
  toConsumerCvPricingView(fact, comparisonNow),
);
const lastChecked = formatPricingCheckedAtNl(consumerCvPricingFacts[0].checkedAt);

const modelLabels: Record<ConsumerCvPricingModel, string> = {
  free: "Gratis",
  one_time: "Eenmalig",
  trial_subscription: "Proef + abonnement",
  subscription: "Abonnement",
  mixed: "Gratis en betaalde routes",
  unverified: "Niet geverifieerd",
};

const comparisonRows = [
  {
    tool: "WerkCV.nl",
    officialUrl: "https://werkcv.nl/prijzen",
    start: cvDownloadPrice.display,
    later: "Geen maandbedrag",
    model: "Eenmalig per afzonderlijk CV",
    cancellation: "Nee",
    checkedAt: "Actueel via WerkCV-prijsbron",
    bestFor: "Een begeleide CV-route met preview en zonder abonnement.",
    note: "Je betaalt pas bij je eerste PDF-download van dat CV.",
  },
  ...competitorViews.map((fact) => ({
    tool: fact.providerName,
    officialUrl: fact.officialUrl,
    start: fact.displayedInitialPriceTextNl || "Actuele prijs niet onafhankelijk geverifieerd",
    later: fact.displayedRecurringPriceTextNl || "Controleer de officiële bron",
    model: fact.fresh ? modelLabels[fact.model] : "Prijs tijdelijk niet geverifieerd",
    cancellation:
      fact.cancellationRequired === null
        ? "Afhankelijk van de gekozen betaalde route"
        : fact.cancellationRequired
          ? "Ja bij de verlengende route"
          : "Nee voor deze route",
    checkedAt: formatPricingCheckedAtNl(fact.checkedAt),
    bestFor: fact.bestForNl,
    note: fact.fresh ? fact.factualNoteNl : "Open de officiële bron voor de actuele prijs en voorwaarden.",
  })),
];

const pricingSources = competitorViews.map((fact) => ({
  label: `${fact.providerName} — officiële bron`,
  href: fact.officialUrl,
}));

const scenarioRows = [
  {
    scenario: "Je wilt vandaag één professioneel CV maken en afronden",
    cheapest:
      "YoungCapital als je volledig gratis wilt blijven; WerkCV als je bewust een nette betaalde route zonder abonnement zoekt.",
  },
  {
    scenario: "Je wilt vooral een mooie design-CV voor een creatief profiel",
    cheapest:
      "Canva gratis is vaak de laagste instap, maar je moet zelf strenger op leesbaarheid en rust letten.",
  },
  {
    scenario: "Je verwacht maar één of twee keer per jaar een CV nodig te hebben",
    cheapest:
      "Eenmalig betalen blijft vrijwel altijd logischer dan een doorlopend maandabonnement.",
  },
  {
    scenario: "Je wilt maandenlang CV, brief en vacatures in één platform houden",
    cheapest:
      "Dan kunnen abonnementsplatforms functioneel logisch zijn, ook al zijn ze voor één losse download duurder.",
  },
];

const faqs = [
  {
    question: "Wat is de goedkoopste manier om één professioneel CV te maken in Nederland?",
    answer: `Als je puur naar euro's kijkt, is een volledig gratis optie zoals YoungCapital het goedkoopst. WerkCV is een betaalde route zonder abonnement: je bouwt en bekijkt je CV gratis en betaalt ${cvDownloadPrice.display} voor de eerste PDF-download van dat afzonderlijke CV. Welke optie het voordeligst is, hangt af van de gewenste begeleiding en vormgeving.`,
  },
  {
    question: "Zijn gratis CV-makers echt gratis?",
    answer:
      "Sommige wel, maar niet allemaal op dezelfde manier. YoungCapital positioneert zijn CV-maker als gratis maken en gratis downloaden. Canva heeft een gratis route, maar werkt breder als freemium ontwerptool. Andere aanbieders lijken goedkoop door een proefprijs, maar lopen daarna over in een abonnement.",
  },
  {
    question: "Waarom zijn proefabonnementen vaak duurder dan ze lijken?",
    answer:
      "Omdat de eerste prijs niet het hele verhaal is. Bij CV.nl en CVMaker is de instap laag, maar volgens hun officiële pricingpagina's wordt de proefperiode daarna automatisch verlengd tegen een maandbedrag. Voor iemand die maar één CV nodig heeft, kan dat economisch onlogisch zijn.",
  },
  {
    question: "Is een duurdere CV-builder automatisch beter?",
    answer:
      "Nee. Duurder betekent vaak vooral dat je betaalt voor langere toegang, extra productlagen of een abonnement. Voor één goede sollicitatieversie zijn rustige templates, duidelijke structuur en een logisch prijsmodel meestal belangrijker dan een hogere maandprijs.",
  },
  {
    question: "Wanneer is een abonnement op een CV-tool wel logisch?",
    answer:
      "Vooral als je langdurig actief solliciteert, veel documenten wilt beheren, of bewust een platform wilt met CV, sollicitatiebrief, vacatures en een sollicitatie-overzicht in één account. Voor een eenmalige sollicitatieronde is dat vaak minder logisch.",
  },
  {
    question: "Hoe recent zijn de prijzen op deze pagina gecontroleerd?",
    answer:
      `De genoemde prijzen en modellen zijn gecontroleerd op officiële pricing- of help-pagina's van de aanbieders op ${lastChecked}. Controleer altijd de actuele prijs op de website van de aanbieder voordat je betaalt, want voorwaarden kunnen veranderen.`,
  },
];

export function generateMetadata(): Metadata {
  return {
    title: "Goedkoopste CV-maker Nederland: kosten vergeleken | WerkCV",
    description: `Vergelijk gratis CV-tools, eenmalige downloads en abonnementen. Zie actuele prijsmodellen, verlenging en wat WerkCV voor ${cvDownloadPrice.display} inclusief btw biedt.`,
    keywords: [
      "goedkoopste cv maker nederland",
      "goedkope cv maker",
      "cv maker gratis of betaald",
      "cv maken goedkoop",
      "goedkoop professioneel cv",
      "eenmalig cv maken",
      "cv builder zonder abonnement",
      "goedkoopste cv tool",
    ],
    alternates: {
      canonical: pageUrl,
      languages: {
        "nl-NL": pageUrl,
        "x-default": pageUrl,
      },
    },
    openGraph: {
      title: "Goedkoopste CV-maker Nederland: kosten vergeleken | WerkCV",
      description:
        "Vergelijk gratis opties, eenmalige betaling en proefabonnementen op basis van wat één professioneel CV je echt kost.",
      url: pageUrl,
      siteName: "WerkCV",
      locale: "nl_NL",
      type: "article",
    },
  };
}

export default function GoedkoopsteCvMakerNederlandPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Wat is de goedkoopste CV-maker in Nederland?",
    description:
      "Vergelijk gratis CV-makers, eenmalige betaling en proefabonnementen op basis van totale kosten voor één professioneel CV in Nederland.",
    inLanguage: "nl-NL",
    mainEntityOfPage: pageUrl,
    datePublished: "2026-04-10",
    dateModified: "2026-08-30",
    author: { "@id": "https://werkcv.nl/#organization" },
    publisher: { "@id": "https://werkcv.nl/#organization" },
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FFFEF0]">
      <FAQJsonLd questions={faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <header className="border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-black">
              Werk<span className="bg-yellow-400 px-1">CV</span>.nl
            </span>
          </Link>
          <TrackedLandingLink
            href="/editor?template=professional&startSource=nl_cheapest_cv_hero"
            trackingLocation="nl_cheapest_cv_hero"
            trackingLabel="start_editor"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            Start in editor
          </TrackedLandingLink>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              {
                label: "Goedkoopste CV maker Nederland",
                href: "/goedkoopste-cv-maker-nederland",
              },
            ]}
          />
        </div>

        <section className="mb-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.24em] text-slate-700">
              Prijsvergelijking voor één CV
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Wat is de goedkoopste CV-maker in Nederland?
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Een volledig gratis tool is het goedkoopst in euro&apos;s. Voor een begeleide route
              zonder abonnement betaal je bij WerkCV {cvDownloadPrice.display} voor de eerste
              PDF-download van één CV. Proefabonnementen kunnen goedkoper starten, maar daarna
              automatisch doorlopen. Hieronder vergelijken we het volledige prijsmodel.
            </p>
            <p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-slate-600">
              Daarom vergelijkt deze pagina niet op merkbekendheid of design, maar op een simpelere
              vraag: wat kost het je echt om vandaag één professioneel CV te maken en te
              downloaden? Laatste prijscontrole:{" "}
              <span className="font-black text-slate-900">{lastChecked}</span> op de officiële
              pricing- of help-pagina&apos;s van de aanbieders.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.18em] text-black">
              {[
                "Gratis opties",
                "Eenmalig betalen",
                "Proefabonnementen",
                "Totale kosten",
                 "Officiële bronnen",
              ].map((badge) => (
                <span key={badge} className="border-2 border-black bg-white px-3 py-1">
                  {badge}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <TrackedLandingLink
                href="/editor?template=professional&startSource=nl_cheapest_cv_hero"
                trackingLocation="nl_cheapest_cv_hero"
                trackingLabel="start_editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Maak eerst gratis je CV
              </TrackedLandingLink>
              <Link
                href="/templates?startSource=nl_cheapest_cv_templates"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Vergelijk templates
              </Link>
              <Link href="#vergelijking" className="self-center text-sm font-black underline">
                Bekijk de vergelijking
              </Link>
            </div>
          </div>

          <aside className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">De korte conclusie</h2>
            <div className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <p>
                Wie echt <span className="font-black text-black">helemaal gratis</span> wil
                blijven, komt vooral uit bij YoungCapital of een designroute zoals Canva.
              </p>
              <p>
                Wie een{" "}
                <span className="font-black text-black">
                  betaalde maar eenvoudige route zonder abonnement
                </span>{" "}
                 zoekt, vindt bij WerkCV een begeleide betaalde route van {cvDownloadPrice.display}
                 voor de eerste PDF-download van één CV.
              </p>
              <p>
                Wie kiest voor een <span className="font-black text-black">lage proefprijs</span>{" "}
                bij CV.nl of CVMaker moet vooral letten op de maandprijs daarna. Voor één losse
                download voelt dat model vaak goedkoper dan het werkelijk is.
              </p>
            </div>
          </aside>
        </section>

        <section
          id="vergelijking"
          className="mb-12 scroll-mt-24 overflow-x-auto border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        >
          <div className="border-b-4 border-black bg-[#FFF4D6] px-5 py-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
              Direct vergelijken
            </p>
            <h2 className="mt-1 text-2xl font-black text-black">
              Wat kost één professioneel CV je echt?
            </h2>
            <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
              Deze vergelijking focust bewust op prijsmodel en eerste-downloadlogica. Niet op wie
              de grootste kennisbank heeft of de meeste marketingclaims maakt.
            </p>
          </div>
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-black text-white">
                {[
                  "Tool",
                  "Startprijs",
                  "Daarna",
                  "Model",
                  "Opzeggen",
                  "Gecontroleerd",
                  "Beste voor",
                  "Let op",
                ].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="border-b-2 border-white/20 px-4 py-3 text-left font-black"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.tool} className="odd:bg-[#FFF9D9]">
                  <td className="border-t-2 border-black px-4 py-3 align-top font-black text-black">
                     <a
                       href={row.officialUrl}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="underline decoration-2 underline-offset-2"
                     >
                       {row.tool}
                     </a>
                  </td>
                  <td className="border-t-2 border-black px-4 py-3 align-top font-medium text-slate-700">
                    {row.start}
                  </td>
                  <td className="border-t-2 border-black px-4 py-3 align-top font-medium text-slate-700">
                    {row.later}
                  </td>
                   <td className="border-t-2 border-black px-4 py-3 align-top font-medium text-slate-700">
                     {row.model}
                   </td>
                   <td className="border-t-2 border-black px-4 py-3 align-top font-medium text-slate-700">
                     {row.cancellation}
                   </td>
                   <td className="border-t-2 border-black px-4 py-3 align-top font-medium text-slate-700">
                     {row.checkedAt}
                   </td>
                  <td className="border-t-2 border-black px-4 py-3 align-top font-medium text-slate-700">
                    {row.bestFor}
                  </td>
                  <td className="border-t-2 border-black px-4 py-3 align-top font-medium text-slate-700">
                    {row.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="border-t-2 border-black bg-[#FFF4D6] px-4 py-3 text-xs font-medium text-slate-600">
            Prijzen en modellen gecontroleerd op officiële pricing- of help-pagina&apos;s op{" "}
            {lastChecked}. Controleer voorwaarden altijd opnieuw voordat je betaalt.
          </p>
          <div className="border-t-2 border-black bg-white px-4 py-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
              Officiële bronpagina&apos;s
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {pricingSources.map((source) => (
                <a
                  key={source.href}
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-black bg-[#FFF9D9] px-3 py-2 text-xs font-black text-black transition-colors hover:bg-yellow-200"
                >
                  {source.label}
                </a>
              ))}
            </div>
            <TrackedLandingLink
              href="/editor?template=professional&startSource=nl_cheapest_cv_comparison"
              trackingLocation="nl_cheapest_cv_comparison"
              trackingLabel="start_editor"
              className="mt-4 inline-block border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black"
            >
              Probeer WerkCV gratis
            </TrackedLandingLink>
          </div>
        </section>

        <section className="mb-12 grid gap-5 md:grid-cols-2">
          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black text-black">Wat is echt gratis?</h2>
            <div className="mt-4 space-y-4 text-sm font-medium leading-relaxed text-slate-700">
              <p>
                Als je nul euro wilt uitgeven, zijn er in de praktijk twee heel verschillende
                routes. YoungCapital positioneert zijn CV-maker expliciet als gratis maken en
                gratis downloaden. Dat is dus een echte gratis optie voor wie snel een basisversie
                nodig heeft.
              </p>
              <p>
                Canva is ook laagdrempelig gratis, maar functioneert primair als ontwerpplatform.
                Dat is sterk als je visueel wilt tweaken, maar het betekent ook dat je zelf meer
                keuzes moet maken over rust, leesbaarheid en hoe professioneel het eindresultaat
                aanvoelt voor een gewone sollicitatie.
              </p>
              <p>
                Gratis is dus niet automatisch hetzelfde als eenvoudig of recruiter-proof. Het
                betekent alleen dat je financieel geen instapdrempel hebt.
              </p>
            </div>
          </article>

          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black text-black">
              Wat is de goedkoopste betaalde route?
            </h2>
            <div className="mt-4 space-y-4 text-sm font-medium leading-relaxed text-slate-700">
              <p>
                Voor wie bewust wil betalen voor een netter einddocument, maar geen
                maandabonnement wil, ligt WerkCV in een andere categorie dan proefmodellen. Je
                start gratis en betaalt {cvDownloadPrice.display} op het moment dat je je
                definitieve PDF van dat CV wilt downloaden.
              </p>
              <p>
                Dat is niet dezelfde prijslogica als een lage proefprijs die daarna overgaat in
                een maandbedrag. Voor één losse sollicitatieronde voelt een
                eenmalige betaling meestal eerlijker en voorspelbaarder, juist omdat het eindigt
                zodra je CV klaar is.
              </p>
              <p>
                Daarom is de nuttige prijsvraag niet alleen &apos;wat kost de eerste klik?&apos;,
                maar &apos;welk model past bij mijn gebruik als ik maar één of twee CV-versies
                nodig heb?&apos;
              </p>
            </div>
          </article>
        </section>

        <section className="mb-12 border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Prijsvraag per situatie
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Welke route is het goedkoopst voor jouw gebruik?
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="bg-black text-white">
                  <th className="px-4 py-3 text-left font-black">Situatie</th>
                  <th className="px-4 py-3 text-left font-black">Praktische conclusie</th>
                </tr>
              </thead>
              <tbody>
                {scenarioRows.map((row) => (
                  <tr key={row.scenario} className="odd:bg-[#FFF9D9]">
                    <td className="border-t-2 border-black px-4 py-3 align-top font-black text-black">
                      {row.scenario}
                    </td>
                    <td className="border-t-2 border-black px-4 py-3 align-top font-medium text-slate-700">
                      {row.cheapest}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12 grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Wanneer goedkoop alsnog duur wordt",
              body: "Dat gebeurt vooral bij proefabonnementen. De startprijs is laag, maar economisch relevant is wat je betaalt als je niet dezelfde dag weer opzegt of als je de tool maar kort nodig had.",
            },
            {
              title: "Waarom gratis niet altijd de beste fit is",
              body: "Een gratis tool kan perfect zijn voor een snelle basisversie. Maar als je tijd verliest aan ontwerpkeuzes of een minder rustig eindresultaat krijgt, verschuift de echte kostprijs van geld naar tijd en kwaliteit.",
            },
            {
               title: "Waar WerkCV in dit landschap logisch wordt",
               body: "Niet als 'goedkoopste van alles', maar als duidelijke begeleide betaalde route zonder doorlopende rekening. Voor sollicitanten die structuur en voorspelbare kosten willen, kan dat een passende keuze zijn.",
            },
          ].map((card) => (
            <article
              key={card.title}
              className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            >
              <h2 className="text-xl font-black text-black">{card.title}</h2>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                {card.body}
              </p>
            </article>
          ))}
        </section>

        <section className="mb-12 border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
            Sterke vervolgroutes
          </p>
          <h2 className="mt-2 text-3xl font-black">
            Waar kijk je hierna het best naar?
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {[
              {
                href: "/cv-maken-zonder-abonnement",
                title: "Eenmalig betalen vs abonnement",
                body: "Ga hierna door als prijsmodel voor jou het hoofdcriterium is en je proefabonnementen actief wilt vermijden.",
              },
              {
                href: "/beste-cv-maker-nederland",
                title: "Brede buildervergelijking",
                body: "Gebruik deze route als je behalve prijs ook ATS, templates en algemene productfit wilt vergelijken.",
              },
              {
                href: "/gratis-cv-maken",
                title: "Gratis starten",
                body: "Handig als je eerst zonder drempel wilt bouwen en pas later wilt beslissen over je definitieve document.",
              },
              {
                href: "/templates",
                title: "Templatekeuze",
                body: "Open de templates als je al weet dat je verder wilt en alleen nog een rustige, professionele layout wilt kiezen.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block border-2 border-white bg-white/10 p-4 transition-colors hover:bg-white hover:text-black"
              >
                <p className="text-sm font-black">{item.title}</p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-200 hover:text-slate-700">
                  {item.body}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen
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
                Klaar om te kiezen?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Maak je CV zonder abonnementsstress
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Vergelijk rustig de templates, bouw je inhoud gratis op en beslis pas op het einde
                of je je PDF wilt downloaden.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <TrackedLandingLink
                href="/editor?template=professional&startSource=nl_cheapest_cv_bottom"
                trackingLocation="nl_cheapest_cv_bottom"
                trackingLabel="start_editor"
                className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Maak je CV en bekijk het resultaat
              </TrackedLandingLink>
              <Link
                href="/prijzen"
                className="inline-block border-4 border-black bg-black px-5 py-3 text-base font-black text-white"
              >
                Bekijk prijsmodel
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MobileStickyCta
        href="/editor?template=professional&startSource=nl_cheapest_cv_sticky"
        text="Maak en bekijk je CV gratis"
        buttonLabel="Start gratis"
        trackingLocation="nl_cheapest_cv_sticky"
        trackingLabel="start_editor"
      />
      <Footer />
    </div>
  );
}
