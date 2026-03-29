import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { FAQJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";

const partnerTypes = [
  {
    title: "Loopbaancoaches & jobcoaches",
    description:
      "Voor coaches die klanten sneller van advies naar een concreet CV willen brengen, zonder abonnement of gedoe.",
  },
  {
    title: "Scholen & career services",
    description:
      "Voor opleidingen, bootcamps en studiebegeleiding die studenten een praktische Nederlandse CV-route willen geven.",
  },
  {
    title: "Communities & nieuwsbrieven",
    description:
      "Voor communities, expat-programma's en jobclubs die bruikbare tools en gidsen willen delen met hun doelgroep.",
  },
  {
    title: "Recruitment & outplacement",
    description:
      "Voor partijen die kandidaten willen verwijzen naar heldere templates, sollicitatietools en werk-in-Nederland informatie.",
  },
];

const partnerAssets = [
  {
    title: "Nederlandse tools",
    description:
      "Praktische calculators en checks voor salaris, WW, transitievergoeding en contractvragen.",
    links: [
      { href: "/tools/netto-bruto-calculator", label: "Netto-bruto calculator" },
      { href: "/tools/transitievergoeding-berekenen", label: "Transitievergoeding" },
      { href: "/tools/ww-recht-checker", label: "WW-recht checker" },
    ],
  },
  {
    title: "CV & sollicitatiehulp",
    description:
      "Dutch-first content voor CV-opbouw, voorbeeldteksten, templates en rolgerichte gidsen.",
    links: [
      { href: "/cv-maken", label: "CV maken" },
      { href: "/gratis-cv-template", label: "Gratis CV template" },
      { href: "/cv-gids", label: "CV gidsen" },
    ],
  },
  {
    title: "Engelse / expat route",
    description:
      "Ondersteuning voor internationals die een CV of sollicitatiebrief voor de Nederlandse markt nodig hebben.",
    links: [
      { href: "/engels-cv-template", label: "Engels CV template" },
      { href: "/cv-maken-in-engels", label: "CV maken in Engels" },
      { href: "/tools/zoekjaar-checker", label: "Zoekjaar checker" },
    ],
  },
];

const collaborationModes = [
  {
    title: "Resource-link of toolkit-opname",
    body:
      "Voeg een relevante WerkCV-tool of gids toe aan je resourcepagina, nieuwsbrief of deelnemersomgeving.",
  },
  {
    title: "Workshop of webinar",
    body:
      "Gebruik WerkCV als praktische vervolgstap na een sessie over CV's, solliciteren of werken in Nederland.",
  },
  {
    title: "Partnerpagina of custom samenwerking",
    body:
      "We kunnen samen een eenvoudige route afspreken voor jouw doelgroep, met de juiste landing pages en hulpmiddelen.",
  },
];

const steps = [
  {
    title: "1. Vertel wie jouw doelgroep is",
    body:
      "Bijvoorbeeld studenten, starters, expats, herintreders of kandidaten in een outplacementtraject.",
  },
  {
    title: "2. Kies de juiste WerkCV-assets",
    body:
      "We koppelen de meest bruikbare tools, templates en gidsen aan jouw use case in plaats van een generieke linkdump.",
  },
  {
    title: "3. Start klein en meet wat werkt",
    body:
      "Begin met een resource-link, workshop of partnerverwijzing en schaal alleen wat echt gebruikt wordt.",
  },
];

const faqs = [
  {
    question: "Voor welk soort partners is WerkCV bedoeld?",
    answer:
      "WerkCV past het best bij loopbaancoaches, career services, jobclubs, communities, bootcamps, recruiters en partijen die mensen helpen solliciteren of werken in Nederland.",
  },
  {
    question: "Moet een partner een groot volume hebben?",
    answer:
      "Nee. Een kleine maar relevante doelgroep is vaak waardevoller dan veel algemeen verkeer. We zoeken fit, niet alleen bereik.",
  },
  {
    question: "Hebben jullie al een vast affiliate programma?",
    answer:
      "Op dit moment werken we vooral met eenvoudige samenwerkingen op maat. Dat kan een resource-link, nieuwsbriefvermelding, workshop of doorverwijzing zijn.",
  },
  {
    question: "Kunnen partners ook Engelstalige doelgroepen bedienen?",
    answer:
      "Ja. WerkCV is Dutch-first, maar heeft ook Engelse CV- en expat-assets voor doelgroepen die de Nederlandse arbeidsmarkt ingaan.",
  },
];

export const metadata: Metadata = {
  title: "Partners | WerkCV.nl voor coaches, scholen en communities",
  description:
    "Werk samen met WerkCV.nl als coach, school, community of career service. Deel Nederlandse CV-tools, gidsen en praktische sollicitatiehulp.",
  keywords: [
    "werkcv partners",
    "cv partner nederland",
    "loopbaancoach samenwerking",
    "career service cv tools",
    "cv tools voor studenten",
    "nederlandse cv gidsen",
  ],
  alternates: {
    canonical: "https://werkcv.nl/partners",
  },
};

export default function PartnersPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://werkcv.nl/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Partners",
        item: "https://werkcv.nl/partners",
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
            href="/contact"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-bold text-black transition-colors hover:bg-yellow-300"
          >
            Contact
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-12">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm font-medium text-gray-600">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-black hover:underline">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="font-bold text-black">Partners</li>
          </ol>
        </nav>

        <section className="mb-10 border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="mb-4 inline-block border-2 border-black bg-teal-300 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-black">
            Samenwerken met WerkCV.nl
          </div>
          <h1 className="mb-4 text-4xl font-black text-black md:text-5xl">
            WerkCV voor partners die mensen echt verder willen helpen
          </h1>
          <p className="max-w-3xl text-lg font-medium leading-relaxed text-black">
            WerkCV.nl helpt mensen in Nederland met CV&apos;s, sollicitatiebrieven en praktische tools
            rond werken, salaris en contracten. We werken graag samen met coaches, scholen,
            communities en career services die hun doelgroep iets bruikbaars willen meegeven.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact?subject=Partner%20met%20WerkCV"
              className="inline-block border-4 border-black bg-yellow-400 px-6 py-4 text-center text-lg font-black text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              Plan een kennismaking
            </Link>
            <Link
              href="/agency"
              className="inline-block border-4 border-black bg-white px-6 py-4 text-center text-lg font-black text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-gray-50 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              Agency pilot voor recruiters
            </Link>
          </div>
        </section>

        <section className="mb-10 grid gap-6 md:grid-cols-2">
          {partnerTypes.map((item) => (
            <article
              key={item.title}
              className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <h2 className="mb-3 text-xl font-black text-black">{item.title}</h2>
              <p className="font-medium leading-relaxed text-gray-700">{item.description}</p>
            </article>
          ))}
        </section>

        <section className="mb-10">
          <h2 className="mb-6 text-3xl font-black text-black">Waar partners naar kunnen linken</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {partnerAssets.map((asset) => (
              <article
                key={asset.title}
                className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="mb-3 text-xl font-black text-black">{asset.title}</h3>
                <p className="mb-4 text-sm font-medium leading-relaxed text-gray-700">
                  {asset.description}
                </p>
                <div className="space-y-2">
                  {asset.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block border-2 border-black bg-[#FFFEF0] px-3 py-2 text-sm font-bold text-black transition-colors hover:bg-yellow-100"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-3xl font-black text-black">Vormen van samenwerking</h2>
            <div className="space-y-4">
              {collaborationModes.map((mode) => (
                <div key={mode.title} className="border-2 border-black bg-[#FFFEF0] p-4">
                  <h3 className="mb-2 text-lg font-black text-black">{mode.title}</h3>
                  <p className="text-sm font-medium leading-relaxed text-gray-700">{mode.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-4 border-black bg-teal-300 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-2xl font-black text-black">Waarom WerkCV past</h2>
            <ul className="space-y-3 text-sm font-bold text-black">
              <li>&bull; Dutch-first content en tools voor lagere-competitie zoekintentie</li>
              <li>&bull; Gratis starten, zonder abonnement of lock-in voor gebruikers</li>
              <li>&bull; Praktische tools naast content, dus meer bruikbaarheid dan alleen tekst</li>
              <li>&bull; Ook inzetbaar voor Engelse / internationale doelgroepen die naar Nederland willen werken</li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-6 text-3xl font-black text-black">Zo starten we</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.title}
                className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="mb-3 text-xl font-black text-black">{step.title}</h3>
                <p className="text-sm font-medium leading-relaxed text-gray-700">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-6 text-3xl font-black text-black">Veelgestelde vragen</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <summary className="flex cursor-pointer items-center justify-between p-4 font-black text-black">
                  {faq.question}
                  <span className="ml-2 text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="border-t-2 border-black px-4 pb-4 pt-3 font-medium leading-relaxed text-gray-700">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="border-4 border-black bg-yellow-400 p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-3 text-3xl font-black text-black">Praat met ons over een relevante samenwerking</h2>
          <p className="mx-auto mb-6 max-w-2xl font-medium leading-relaxed text-black">
            Stuur kort door wie je helpt, welke doelgroep je hebt en welke WerkCV-assets daarbij
            kunnen passen. Dan reageren we met een praktische eerste stap.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="mailto:contact@werkcv.nl?subject=Partner%20met%20WerkCV"
              className="inline-block border-4 border-black bg-white px-6 py-4 text-lg font-black text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              Mail ons
            </a>
            <Link
              href="/contact"
              className="inline-block border-4 border-black bg-black px-6 py-4 text-lg font-black text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              Open contactpagina
            </Link>
          </div>
        </section>
      </main>

      <FAQJsonLd questions={faqs} />
      <OrganizationJsonLd />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Footer />
    </div>
  );
}
