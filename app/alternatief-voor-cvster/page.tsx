import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import MobileStickyCta from "@/components/landing/MobileStickyCta";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { cvDownloadPrice } from "@/lib/site-content";

const pageUrl = "https://werkcv.nl/alternatief-voor-cvster";
const checkedDate = "7 juni 2026";

const heroBadges = [
  `WerkCV: eenmalig ${cvDownloadPrice.display}`,
  "Geen proefabonnement",
  "CVster: €2,95 voor 7 dagen",
  "Daarna €14,95 per 4 weken",
];

const sourceLinks = [
  {
    label: "CVster pricing",
    href: "https://cvster.nl/pricing",
    note: "Publieke prijzenpagina met €2,95 voor 7 dagen, daarna €14,95 per 4 weken, plus 6-maanden- en jaaropties en gratis toegang met beperkingen.",
  },
  {
    label: "CVster gratis gebruiken",
    href: "https://help.cvster.nl/article/267-hoe-kan-ik-cvsternl-gratis-gebruiken",
    note: "Helpartikel over gratis gebruik: één cv, één sollicitatiebrief, TXT-download en een beperkt aantal gratis PDF-sjablonen.",
  },
  {
    label: "CVster account annuleren",
    href: "https://help.cvster.nl/article/264-hoe-kan-ik-mijn-account-opzeggen-annuleren-of-verwijderen",
    note: "Helpcentrumartikel over annuleren via website of app, inclusief bevestiging per e-mail en hoe lang premium na annuleren actief blijft.",
  },
  {
    label: "CVster facturatie",
    href: "https://help.cvster.nl/article/272-hoe-werkt-facturering",
    note: "Facturatie-uitleg die nog spreekt over 7 dagen gratis proberen en ook zegt dat prijzen per regio of ouder prijsmodel kunnen verschillen.",
  },
  {
    label: "CVster ATS cv checker",
    href: "https://cvster.nl/cv-checker",
    note: "Productpagina voor de gratis AI ATS checker, gebruikt om de bredere suite-positionering van CVster te onderbouwen.",
  },
  {
    label: "CVster over ons",
    href: "https://cvster.nl/about",
    note: "Over-ons pagina met huidige schaalcijfers en positionering als onderdeel van Resume.io / Career.io.",
  },
];

const comparisonRows = [
  {
    label: "Prijsmodel",
    werkcv: `Gratis starten, daarna éénmalig ${cvDownloadPrice.display} per cv-download.`,
    cvster: "Pricingpagina toont €2,95 voor 7 dagen en daarna €14,95 per 4 weken, plus langere premiumopties.",
  },
  {
    label: "Gratis toegang",
    werkcv: "Gratis bouwen en vergelijken; betaling pas bij jouw definitieve PDF-download.",
    cvster: "Gratis account met één cv, één sollicitatiebrief, TXT-download en een beperkt aantal gratis PDF-sjablonen.",
  },
  {
    label: "Waar betaal je voor?",
    werkcv: "Voor de definitieve PDF-download van je cv.",
    cvster: "Voor een bredere documentsuite met meer cv's, sollicitatiebrieven, premium templates, kleuren en onbeperkte downloads.",
  },
  {
    label: "Extra tooling",
    werkcv: "Bewust smalle cv-flow zonder grotere platformlaag.",
    cvster: "Grotere suite met onder meer ATS-checker, sollicitatiebrief-flow en meerdere export- en deelroutes.",
  },
  {
    label: "Beste voor",
    werkcv: "Mensen die snel een goed cv willen afronden zonder proef- of abonnementsdruk.",
    cvster: "Mensen die bewust een grotere cv- en sollicitatiebriefsuite met extra tools willen gebruiken.",
  },
];

const whyWerkCvCards = [
  {
    title: "Je wilt geen proefperiode onthouden",
    body: "WerkCV past beter als je cv maken als een tijdelijke taak ziet en geen 7-daagse trial of periodieke verlenging wilt managen.",
  },
  {
    title: "Je zoekt vooral een rustige eindroute",
    body: "Veel mensen die naar een CVster alternatief zoeken, willen niet eerst bepalen welk premiumplan of welke extra tool bij hen past. Ze willen gewoon een cv afronden.",
  },
  {
    title: "Je hebt geen grotere suite nodig",
    body: "Als ATS-checking, meerdere documenttypes en bredere platformmodules niet je hoofdbehoefte zijn, is een compactere no-subscription route vaak logischer.",
  },
];

const cvsterBetterFit = [
  "Je wilt cv en sollicitatiebrief in één grotere editor-suite combineren.",
  "Je wilt ATS-checking, extra formats of meerdere documentroutes kunnen gebruiken.",
  "Je vindt een trial- of premiummodel acceptabel omdat je meerdere onderdelen van het platform actief gebruikt.",
];

const relatedLinks = [
  {
    href: "/prijzen",
    title: "Bekijk het WerkCV prijsmodel",
    body: `Handig als je eenmalig ${cvDownloadPrice.display} concreet wilt afzetten tegen een proef- of premiummodel.`,
  },
  {
    href: "/cvster-opzeggen",
    title: "Controleer eerst de CVster opzegroute",
    body: "Gebruik deze pagina als je eerst wilt nagaan hoe annuleren via website, account en bevestigingsmail werkt.",
  },
  {
    href: "/cv-maken-zonder-abonnement",
    title: "CV maken zonder abonnement",
    body: "Goede vervolgstap als het prijsmodel en het ontbreken van een trial voor jou de doorslag geven.",
  },
  {
    href: "/cv-downloaden-zonder-abonnement",
    title: "CV downloaden zonder abonnement",
    body: "Specifiek voor mensen die vooral willen weten wat er op het downloadmoment gebeurt en waarom daar geen maandkosten achteraan komen.",
  },
  {
    href: "/cv-gids/werkcv-vs-cvster",
    title: "Lees de uitgebreide vergelijking",
    body: "Diepere gids met meer context over platformbreedte, formats, ATS en gebruikssituaties.",
  },
];

const faqItems = [
  {
    question: "Wat is een goed alternatief voor CVster?",
    answer:
      `Voor mensen die vooral zonder proefabonnement een cv willen maken, is WerkCV een logisch alternatief. Je start gratis en betaalt pas ${cvDownloadPrice.display} wanneer je de PDF wilt downloaden.`,
  },
  {
    question: "Is CVster op dit moment een abonnement?",
    answer:
      "CVster heeft op dit moment meerdere modellen. De publieke pricingpagina toont €2,95 voor 7 dagen en daarna €14,95 per 4 weken, plus langere premiumopties en gratis toegang met beperkingen.",
  },
  {
    question: "Waarom noemt deze vergelijking een verschil tussen pricing en facturatie-uitleg?",
    answer:
      "Omdat de officiële CVster bronnen niet volledig gelijk lopen. De pricingpagina noemt €2,95 voor 7 dagen, terwijl de facturatie-uitleg nog over 7 dagen gratis proberen spreekt en erbij zegt dat prijzen per regio of ouder prijsmodel kunnen verschillen. Daarom gebruiken we de pricingpagina als meest concrete huidige prijsbron en noemen we de afwijking expliciet.",
  },
  {
    question: "Wanneer is CVster een betere keuze dan WerkCV?",
    answer:
      "CVster past beter als je juist een grotere suite zoekt met cv's, sollicitatiebrieven, ATS-checking en meerdere documentroutes in één platform.",
  },
  {
    question: "Wanneer is WerkCV slimmer dan CVster?",
    answer:
      "WerkCV is slimmer als je vooral een cv wilt bouwen en afronden zonder trial, zonder automatische verlenging en zonder extra platformlagen die je niet nodig hebt.",
  },
];

export const metadata: Metadata = {
  title: {
    absolute: "Alternatief voor CVster (2026) | WerkCV zonder proefabonnement",
  },
  description:
    "Zoek je een alternatief voor CVster? Vergelijk het actuele CVster prijsmodel met WerkCV: eenmalig betalen bij download, geen proefabonnement en een rustigere cv-flow.",
  keywords: [
    "alternatief voor cvster",
    "cvster alternatief",
    "cvster abonnement alternatief",
    "cvster proefabonnement alternatief",
    "werkcv vs cvster",
    "cv maken zonder abonnement",
  ],
  alternates: {
    canonical: pageUrl,
    languages: {
      "nl-NL": pageUrl,
      "x-default": pageUrl,
    },
  },
  openGraph: {
    title: "Alternatief voor CVster (2026) | WerkCV zonder proefabonnement",
    description:
      "Vergelijk het actuele CVster prijsmodel met WerkCV: eenmalig betalen bij download, geen proefabonnement en een rustigere cv-flow.",
    url: pageUrl,
    siteName: "WerkCV",
    locale: "nl_NL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Alternatief voor CVster - WerkCV",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alternatief voor CVster (2026) | WerkCV zonder proefabonnement",
    description:
      "Vergelijk het actuele CVster prijsmodel met WerkCV: eenmalig betalen bij download, geen proefabonnement en een rustigere cv-flow.",
    images: ["/opengraph-image"],
  },
};

export default function AlternatiefVoorCvsterPage() {
  return (
    <div className="min-h-screen bg-[#FFFEF0]">
      <FAQJsonLd questions={faqItems} />

      <header className="border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-black">
              Werk<span className="bg-yellow-400 px-1">CV</span>.nl
            </span>
          </Link>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/prijzen"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              Bekijk prijsmodel
            </Link>
            <TrackedLandingLink
              href="/editor"
              trackingLocation="alternatief-voor-cvster:header_primary"
              trackingLabel="Maak gratis je cv"
              className="border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black"
            >
              Maak gratis je cv
            </TrackedLandingLink>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 pb-28 md:pb-10">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Alternatief voor CVster", href: "/alternatief-voor-cvster" },
            ]}
          />
        </div>

        <section className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {heroBadges.map((badge) => (
                <span
                  key={badge}
                  className="border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-black"
                >
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-black md:text-5xl">
              Alternatief voor CVster: wanneer WerkCV slimmer is
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Zoek je een alternatief voor CVster omdat je geen proefabonnement of periodieke premiumtoegang wilt? Dan draait de keuze meestal minder om wie de meeste functies heeft en meer om welk producttype echt bij jouw sollicitatiegedrag past.
            </p>
            <p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
              Op basis van de officiële CVster pricing-, help-, facturatie-, ATS- en over-ons pagina&apos;s gecheckt op <span className="font-black text-black">{checkedDate}</span> is het contrast vrij duidelijk: WerkCV is de smallere no-subscription cv-route, terwijl CVster publiek een bredere premiumsuite toont.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLandingLink
                href="/editor"
                trackingLocation="alternatief-voor-cvster:hero_primary"
                trackingLabel="Maak gratis je cv zonder proefabonnement"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Maak gratis je cv zonder proefabonnement
              </TrackedLandingLink>
              <Link
                href="/cv-gids/werkcv-vs-cvster"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Lees de uitgebreide vergelijking
              </Link>
            </div>
          </div>

          <aside className="h-fit border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Kort antwoord
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Kies WerkCV als je vooral eenvoud en prijsrust wilt
            </h2>
            <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <p>WerkCV past beter als je vooral een nette cv-PDF wilt bouwen, downloaden en later eventueel opnieuw aanpassen zonder trial- of premiumbeheer.</p>
              <p>CVster past beter als je bewust een grotere cv- en sollicitatiebriefsuite zoekt met meer documentroutes en extra hulpmiddelen zoals een ATS-checker.</p>
              <p>Het verschil zit dus niet vooral in wie “meer kan”, maar in de vraag of jij echt een suite nodig hebt of vooral een rustige cv-afrondroute.</p>
            </div>
          </aside>
        </section>

        <section className="mb-12 border-4 border-black bg-yellow-100 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-700">
            Belangrijke nuance
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            De officiële CVster bronnen lopen niet volledig gelijk
          </h2>
          <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-800">
            <p>
              De huidige pricingpagina van CVster toont <span className="font-black text-black">€2,95 voor 7 dagen</span> en daarna <span className="font-black text-black">€14,95 per 4 weken</span>.
            </p>
            <p>
              De facturatie-uitleg spreekt tegelijk nog over <span className="font-black text-black">7 dagen gratis proberen</span> en zegt er ook bij dat prijzen per regio of ouder prijsmodel kunnen verschillen.
            </p>
            <p>
              Daarom gebruiken we de pricingpagina als meest concrete huidige prijsbron, maar noemen we de afwijking expliciet zodat deze vergelijking controleerbaar blijft.
            </p>
          </div>
        </section>

        <section className="mb-12 overflow-x-auto border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="border-b-4 border-black bg-[#FFF4D6] px-4 py-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
              Direct vergelijken
            </p>
            <h2 className="mt-1 text-2xl font-black text-black">
              WerkCV versus CVster
            </h2>
            <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
              Deze vergelijking is bewust smal gehouden rond prijsmodel, gratis limieten, suite-omvang en welk type gebruiker daadwerkelijk meer waarde uit het platform haalt.
            </p>
          </div>
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-black text-white">
                {["", "WerkCV", "CVster"].map((heading) => (
                  <th
                    key={heading || "feature"}
                    className="border-b-2 border-white/20 px-4 py-3 text-left font-black"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.label} className="odd:bg-[#FFF9D9]">
                  <td className="border-t-2 border-black px-4 py-3 align-top font-black text-black">
                    {row.label}
                  </td>
                  <td className="border-t-2 border-black px-4 py-3 align-top font-medium text-slate-700">
                    {row.werkcv}
                  </td>
                  <td className="border-t-2 border-black px-4 py-3 align-top font-medium text-slate-700">
                    {row.cvster}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mb-12 grid gap-5 md:grid-cols-3">
          {whyWerkCvCards.map((card) => (
            <article
              key={card.title}
              className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            >
              <h2 className="text-xl font-black text-black">{card.title}</h2>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{card.body}</p>
            </article>
          ))}
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-2">
          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Wanneer WerkCV beter past
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Minder suite, minder trial-frictie
            </h2>
            <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <p>WerkCV is meestal slimmer als je vooral een cv wilt afronden en niet eerst wilt beslissen welke premiumtoegang, langere looptijd of extra module je wel of niet nodig hebt.</p>
              <p>Dat geldt vooral als je prijsrust en een simpele Nederlandse cv-flow belangrijker vindt dan extra tooling rond vacatures, ATS-checking of meerdere documenttypes.</p>
              <p>Je start gratis, betaalt alleen als je de PDF wilt downloaden en hoeft later niets op te zeggen of terug te denken aan een trial-omslag.</p>
            </div>
            <TrackedLandingLink
              href="/editor"
              trackingLocation="alternatief-voor-cvster:mid_primary"
              trackingLabel="Start zonder CVster proefabonnement"
              className="mt-5 inline-block border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              Start zonder CVster proefabonnement
            </TrackedLandingLink>
          </article>

          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Wanneer CVster logischer is
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Als je juist een grotere documentsuite wilt
            </h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-sm font-medium leading-relaxed text-slate-700 marker:text-black">
              {cvsterBetterFit.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              Die bredere aanpak is niet per se slechter, maar het is wel een ander producttype dan een compacte cv-builder zonder trial.
            </p>
          </article>
        </section>

        <section className="mb-12 border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
            Vervolgstappen
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {relatedLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block border-2 border-white bg-white/10 p-4 transition-colors hover:bg-white hover:text-black"
              >
                <p className="text-sm font-black">{item.title}</p>
                <p className="mt-1 text-sm font-medium leading-relaxed text-slate-200 hover:text-slate-700">
                  {item.body}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Bronnen
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Officiële CVster pagina&apos;s die zijn gebruikt
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
                <span className="mt-2 block text-xs leading-relaxed text-slate-600">{source.note}</span>
              </a>
            ))}
          </div>
          <p className="mt-4 text-xs font-medium leading-relaxed text-slate-600">
            Controleer prijzen en voorwaarden altijd zelf opnieuw op de officiële CVster pagina&apos;s. Deze vergelijking is geschreven op basis van publiek zichtbare informatie op {checkedDate}.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over een alternatief voor CVster
          </h2>
          <div className="mx-auto mt-8 max-w-4xl space-y-4">
            {faqItems.map((faq) => (
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
                Rustiger prijsmodel
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Wil je vooral een goed cv zonder proefabonnement?
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Maak je cv gratis in WerkCV en betaal pas éénmalig {cvDownloadPrice.display} als je de PDF echt wilt downloaden.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <TrackedLandingLink
                href="/editor"
                trackingLocation="alternatief-voor-cvster:bottom_primary"
                trackingLabel="Maak gratis je cv"
                className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Maak gratis je cv
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

      <Footer />

      <MobileStickyCta
        text="Alternatief voor CVster"
        buttonLabel="Start gratis"
        href="/editor"
        trackingLocation="alternatief-voor-cvster:sticky_primary"
        trackingLabel="Start gratis"
        ctaEventName="cta_no_subscription_sticky"
      />
    </div>
  );
}
