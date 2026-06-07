import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import MobileStickyCta from "@/components/landing/MobileStickyCta";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { cvDownloadPrice } from "@/lib/site-content";

const pageUrl = "https://werkcv.nl/alternatief-voor-cv-nl";
const checkedDate = "7 juni 2026";

const heroBadges = [
  `WerkCV: eenmalig ${cvDownloadPrice.display}`,
  "Geen abonnement",
  "CV.nl pricing: €19,99 / maand",
  "Prijscheck geverifieerd",
];

const sourceLinks = [
  {
    label: "CV.nl pricing",
    href: "https://www.cv.nl/pricing",
    note: "Publieke prijzenpagina met €0,99 voor 14 dagen en daarna €19,99 per maand met automatische verlenging.",
  },
  {
    label: "CV.nl FAQ",
    href: "https://www.cv.nl/faq",
    note: "FAQ over kosten, downloaden, opzeggen via Instellingen en bevestiging per e-mail.",
  },
  {
    label: "CV.nl contact",
    href: "https://www.cv.nl/contact",
    note: "Contactpagina met knop 'Lidmaatschap opzeggen' en adresgegevens.",
  },
  {
    label: "CV.nl algemene voorwaarden",
    href: "https://www.cv.nl/terms",
    note: "Voorwaarden met abonnement, opzegging en verlenging; pagina vermeldt laatste wijziging op 18 april 2020.",
  },
];

const comparisonRows = [
  {
    label: "Prijsmodel",
    werkcv: `Gratis starten, daarna éénmalig ${cvDownloadPrice.display} per cv-download.`,
    cvnl: "Pricingpagina toont €0,99 voor 14 dagen en daarna €19,99 per maand met automatische verlenging.",
  },
  {
    label: "Waar betaal je voor?",
    werkcv: "Voor de definitieve PDF-download van je cv.",
    cvnl: "Voor accounttoegang tot cv's, sollicitatiebrieven, vacatures, sollicitaties en tools.",
  },
  {
    label: "Na je betaling",
    werkcv: "Hetzelfde cv later opnieuw openen, bijwerken en opnieuw downloaden zonder maandabonnement.",
    cvnl: "Doorlopende toegang zolang je abonnement actief blijft.",
  },
  {
    label: "Beste voor",
    werkcv: "Mensen die vooral snel een goed cv willen afronden zonder terugkerende kosten.",
    cvnl: "Mensen die bewust een breder sollicitatieplatform met vacatures en tracker zoeken.",
  },
];

const whyWerkCvCards = [
  {
    title: "Je wilt geen proef- of abonnementslus",
    body: "WerkCV past beter als je cv maken als een korte taak ziet: bouwen, downloaden en later alleen terugkomen als je iets wilt aanpassen.",
  },
  {
    title: "Je zoekt vooral prijsrust",
    body: "Veel mensen die op CV.nl alternatief zoeken, willen niet opnieuw onthouden wanneer een proefperiode of maandbedrag doorloopt. WerkCV houdt het model veel smaller.",
  },
  {
    title: "Je hebt geen sollicitatieplatform nodig",
    body: "Als vacatures bekijken, sollicitaties bijhouden en extra platformmodules niet je hoofdbehoefte zijn, is een kleinere no-subscription route vaak praktischer.",
  },
];

const cvNlBetterFit = [
  "Je wilt vacatures, sollicitaties en cv/briefbeheer in één groter account combineren.",
  "Je vindt maandtoegang acceptabel zolang je actief solliciteert en meerdere functies gebruikt.",
  "Je zoekt nadrukkelijk een breder Nederlands sollicitatieplatform, niet alleen een cv-builder.",
];

const relatedLinks = [
  {
    href: "/prijzen",
    title: "Bekijk het WerkCV prijsmodel",
    body: `Handig als je het verschil tussen eenmalig ${cvDownloadPrice.display} en een maandabonnement concreet wilt zien.`,
  },
  {
    href: "/cv-nl-opzeggen",
    title: "Check eerst de CV.nl opzegroute",
    body: "Gebruik deze pagina als je eerst wilt controleren hoe opzeggen via account, Instellingen en bevestigingsmail werkt.",
  },
  {
    href: "/cv-maken-zonder-abonnement",
    title: "CV maken zonder abonnement",
    body: "De beste vervolgstap als het prijsmodel voor jou het doorslaggevende verschil is.",
  },
  {
    href: "/cv-maken-eenmalig-betalen",
    title: "CV maken en eenmalig betalen",
    body: "Gebruik deze route als je vooral wilt begrijpen hoe gratis starten en betalen bij download samenwerkt.",
  },
  {
    href: "/cv-gids/werkcv-vs-cv-nl",
    title: "Lees de uitgebreide vergelijking",
    body: "Diepere gids met meer context over platformbreedte, gebruikssituaties en vervolgroutes.",
  },
];

const faqItems = [
  {
    question: "Wat is een goed alternatief voor CV.nl?",
    answer:
      `Voor mensen die vooral zonder abonnement een cv willen maken, is WerkCV een logisch alternatief. Je start gratis en betaalt pas ${cvDownloadPrice.display} wanneer je de PDF wilt downloaden.`,
  },
  {
    question: "Is CV.nl op dit moment een abonnement?",
    answer:
      "Ja. De publieke pricingpagina toont op dit moment €0,99 voor 14 dagen en daarna €19,99 per maand met automatische verlenging. De FAQ noemt nog dat de eerste 14 dagen gratis zijn. De pricingpagina is daarom de duidelijkste actuele prijsreferentie, maar controleer dit altijd zelf op de officiële site.",
  },
  {
    question: "Wanneer is CV.nl een betere keuze dan WerkCV?",
    answer:
      "CV.nl past beter als je bewust een groter sollicitatieplatform zoekt met cv's, sollicitatiebrieven, vacatures en een tracker in één account.",
  },
  {
    question: "Wanneer is WerkCV slimmer dan CV.nl?",
    answer:
      "WerkCV is slimmer als je vooral een cv wilt bouwen en afronden zonder terugkerende kosten, zonder automatische verlenging en zonder extra platformlagen die je niet nodig hebt.",
  },
  {
    question: "Waarom noemt deze vergelijking een verschil tussen FAQ en pricing?",
    answer:
      "Omdat de officiële CV.nl bronnen niet exact hetzelfde formuleren. De pricingpagina noemt €0,99 voor 14 dagen, terwijl de FAQ nog spreekt over de eerste 14 dagen gratis. Daarom noemen we beide en gebruiken we de pricingpagina als meest concrete huidige prijsbron.",
  },
];

export const metadata: Metadata = {
  title: {
    absolute: "Alternatief voor CV.nl (2026) | WerkCV zonder abonnement",
  },
  description:
    "Zoek je een alternatief voor CV.nl? Vergelijk het actuele CV.nl abonnementsmodel met WerkCV: eenmalig betalen bij download, geen automatische verlenging en een rustigere cv-flow.",
  keywords: [
    "alternatief voor cv.nl",
    "cv.nl alternatief",
    "cv.nl kosten alternatief",
    "cv.nl abonnement alternatief",
    "werkcv vs cv.nl",
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
    title: "Alternatief voor CV.nl (2026) | WerkCV zonder abonnement",
    description:
      "Vergelijk het actuele CV.nl abonnementsmodel met WerkCV: eenmalig betalen bij download, geen automatische verlenging en een rustigere cv-flow.",
    url: pageUrl,
    siteName: "WerkCV",
    locale: "nl_NL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Alternatief voor CV.nl - WerkCV",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alternatief voor CV.nl (2026) | WerkCV zonder abonnement",
    description:
      "Vergelijk het actuele CV.nl abonnementsmodel met WerkCV: eenmalig betalen bij download, geen automatische verlenging en een rustigere cv-flow.",
    images: ["/opengraph-image"],
  },
};

export default function AlternatiefVoorCvNlPage() {
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
              trackingLocation="alternatief-voor-cv-nl:header_primary"
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
              { label: "Alternatief voor CV.nl", href: "/alternatief-voor-cv-nl" },
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
              Alternatief voor CV.nl: wanneer WerkCV slimmer is
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Zoek je een alternatief voor CV.nl omdat je geen doorlopend cv-abonnement wilt? Dan is de hoofdvraag meestal niet welke site meer functies heeft, maar welk prijsmodel beter past bij hoe jij solliciteert.
            </p>
            <p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
              Op basis van de officiële CV.nl pricing-, FAQ-, contact- en voorwaardenpagina&apos;s
              gecheckt op <span className="font-black text-black">{checkedDate}</span> is het actuele
              contrast vrij duidelijk: WerkCV werkt met gratis starten en een eenmalige betaling bij
              PDF-download, terwijl CV.nl publiek een abonnementsmodel toont.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLandingLink
                href="/editor"
                trackingLocation="alternatief-voor-cv-nl:hero_primary"
                trackingLabel="Maak gratis je cv zonder abonnement"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Maak gratis je cv zonder abonnement
              </TrackedLandingLink>
              <Link
                href="/cv-gids/werkcv-vs-cv-nl"
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
              Kies WerkCV als je vooral prijsrust wilt
            </h2>
            <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <p>WerkCV past beter als je gewoon een goed cv wilt bouwen en afronden zonder maandtoegang te hoeven beheren.</p>
              <p>CV.nl past beter als je bewust vacatures, sollicitaties, sollicitatiebrieven en accounttoegang in een groter platform wilt bundelen.</p>
              <p>Het verschil zit dus minder in “meer functies is beter” en meer in de vraag of je echt een platform nodig hebt of vooral een duidelijke cv-route.</p>
            </div>
          </aside>
        </section>

        <section className="mb-12 border-4 border-black bg-yellow-100 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-700">
            Belangrijke nuance
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            De officiële CV.nl bronnen zijn niet helemaal gelijk
          </h2>
          <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-800">
            <p>
              De huidige pricingpagina van CV.nl toont <span className="font-black text-black">€0,99 voor 14 dagen</span> en daarna <span className="font-black text-black">€19,99 per maand</span> met automatische verlenging.
            </p>
            <p>
              De FAQ zegt tegelijk nog dat de eerste 14 dagen gratis zijn. Daarom behandelen we de pricingpagina als de meest concrete actuele prijsbron, maar noemen we de FAQ-afwijking expliciet zodat deze vergelijking controleerbaar blijft.
            </p>
            <p>
              De voorwaardenpagina vermeldt daarnaast dat het abonnement via je account opzegbaar is en dat je in ieder geval voor de nieuwe periode moet opzeggen om verlenging te voorkomen.
            </p>
          </div>
        </section>

        <section className="mb-12 overflow-x-auto border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="border-b-4 border-black bg-[#FFF4D6] px-4 py-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
              Direct vergelijken
            </p>
            <h2 className="mt-1 text-2xl font-black text-black">
              WerkCV versus CV.nl
            </h2>
            <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
              Deze vergelijking is bewust smal gehouden rond prijsmodel, gebruikssituatie en wat je na betaling of activatie praktisch aan toegang houdt.
            </p>
          </div>
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-black text-white">
                {["", "WerkCV", "CV.nl"].map((heading) => (
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
                    {row.cvnl}
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
              Minder platform, meer duidelijkheid
            </h2>
            <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <p>WerkCV is meestal slimmer als je vooral een nette cv-PDF nodig hebt en niet wilt betalen voor een bredere sollicitatieomgeving die je misschien nauwelijks gebruikt.</p>
              <p>Dat geldt vooral als je prijsrust belangrijker vindt dan extra modules zoals vacatures, trackers of een app.</p>
              <p>Je start gratis, betaalt alleen als je de PDF wilt downloaden en hoeft later niets op te zeggen.</p>
            </div>
            <TrackedLandingLink
              href="/editor"
              trackingLocation="alternatief-voor-cv-nl:mid_primary"
              trackingLabel="Start zonder CV.nl abonnement"
              className="mt-5 inline-block border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              Start zonder CV.nl abonnement
            </TrackedLandingLink>
          </article>

          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Wanneer CV.nl logischer is
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Als je juist een groter sollicitatieplatform wilt
            </h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-sm font-medium leading-relaxed text-slate-700 marker:text-black">
              {cvNlBetterFit.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              Die bredere aanpak is niet per se slechter, maar hij is wel een ander producttype dan een no-subscription cv-builder.
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
            Officiële CV.nl pagina&apos;s die zijn gebruikt
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
            Controleer prijzen en voorwaarden altijd zelf opnieuw op de officiële CV.nl pagina&apos;s. Deze vergelijking is geschreven op basis van publiek zichtbare informatie op {checkedDate}.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over een alternatief voor CV.nl
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
                Wil je vooral een goed cv zonder abonnement?
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Maak je cv gratis in WerkCV en betaal pas éénmalig {cvDownloadPrice.display} als je de PDF echt wilt downloaden.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <TrackedLandingLink
                href="/editor"
                trackingLocation="alternatief-voor-cv-nl:bottom_primary"
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
        text="Alternatief voor CV.nl"
        buttonLabel="Start gratis"
        href="/editor"
        trackingLocation="alternatief-voor-cv-nl:sticky_primary"
        trackingLabel="Start gratis"
        ctaEventName="cta_no_subscription_sticky"
      />
    </div>
  );
}
