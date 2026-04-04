import type { Metadata } from "next";
import Link from "next/link";
import { getDutchWavePages } from "@/lib/seo-wave/data";

export const metadata: Metadata = {
  title: "Nederlandse CV Gids 2026 | CV maken, voorbeelden, templates en tips",
  description:
    "De Nederlandse CV gids van WerkCV: gebruik deze centrale hub voor cv maken, cv voorbeelden, profieltekst, werkervaring, vaardigheden, Engels CV en vacaturegerichte templates.",
  keywords: [
    "cv gids",
    "cv maken nederland",
    "cv voorbeeld",
    "profieltekst cv",
    "werkervaring cv",
    "vaardigheden cv",
    "nederlandse cv gids",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-gids",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-gids",
      "en-NL": "https://werkcv.nl/en/guides",
      "x-default": "https://werkcv.nl/cv-gids",
    },
  },
  openGraph: {
    title: "Nederlandse CV Gids 2026 | WerkCV",
    description:
      "De centrale hub voor cv maken, voorbeelden, templates en schrijfadvies in Nederland.",
    type: "website",
    locale: "nl_NL",
  },
};

const guideGroups = [
  {
    title: "Eerst je basis goed zetten",
    description:
      "Deze pagina's helpen als je nog richting zoekt: welke structuur werkt, hoe je recruiter-proof schrijft en waar je gratis kunt starten.",
    links: [
      { href: "/cv-maken", label: "CV maken" },
      { href: "/gratis-cv-maken", label: "Gratis CV maken" },
      { href: "/cv-aanmaken", label: "CV aanmaken" },
      { href: "/cv-opstellen", label: "CV opstellen" },
      { href: "/makkelijk-cv-maken", label: "Makkelijk CV maken" },
      { href: "/snel-cv-maken", label: "Snel CV maken" },
    ],
  },
  {
    title: "Voorbeelden en templates kiezen",
    description:
      "Gebruik dit cluster als je liever vergelijkt op rol, stijl of opmaak voordat je zelf gaat schrijven.",
    links: [
      { href: "/cv-voorbeelden", label: "CV voorbeelden" },
      { href: "/cv-maken-template", label: "CV maken template" },
      { href: "/cv-maken-sjabloon", label: "CV maken sjabloon" },
      { href: "/templates", label: "CV templates" },
      { href: "/professioneel-cv-maken", label: "Professioneel CV maken" },
      { href: "/mooie-cv-maken", label: "Mooie CV maken" },
      { href: "/cv-ontwerpen", label: "CV ontwerpen" },
    ],
  },
  {
    title: "Speciale situaties en nieuwe intenties",
    description:
      "Deze routes pakken long-tail zoekintentie op voor studenten, stages, jongeren, mobiel, PDF en Engelstalige sollicitaties.",
    links: [
      { href: "/cv-maken-student", label: "CV maken student" },
      { href: "/stage-cv-maken", label: "Stage CV maken" },
      { href: "/eerste-cv-maken", label: "Eerste CV maken" },
      { href: "/cv-maken-16-jarige", label: "CV maken 16-jarige" },
      { href: "/cv-maken-pdf", label: "CV maken PDF" },
      { href: "/cv-maken-op-mobiel", label: "CV maken op mobiel" },
      { href: "/cv-maken-in-engels", label: "CV maken in Engels" },
    ],
  },
];

const comparisonGuideGroups = [
  {
    title: "Vergelijk builders op het juiste criterium",
    description:
      "Gebruik deze pagina's als je niet alleen een template zoekt, maar wilt kiezen op prijsmodel, ATS-risico, designvrijheid of type sollicitatieworkflow.",
    links: [
      { href: "/cv-gids/welke-cv-builder-past-bij-jou-in-nederland", label: "Welke CV builder past bij jou?" },
      { href: "/cv-gids/beste-cv-builder-zonder-abonnement", label: "Beste zonder abonnement" },
      { href: "/cv-gids/ats-vriendelijke-cv-builder-voor-nederlandse-vacatures", label: "ATS-vriendelijke builder" },
      { href: "/cv-gids/canva-vs-cv-builder-voor-sollicitaties", label: "Canva vs CV builder" },
    ],
  },
  {
    title: "Vergelijk WerkCV met andere platforms",
    description:
      "Deze vergelijkingen zijn nuttig als je niet zomaar de bekendste tool wilt kiezen, maar het model en de use case van elk platform wilt afwegen.",
    links: [
      { href: "/cv-gids/werkcv-vs-cvmaker", label: "WerkCV vs CVMaker" },
      { href: "/cv-gids/werkcv-vs-cv-nl", label: "WerkCV vs CV.nl" },
      { href: "/cv-gids/werkcv-vs-cvwizard", label: "WerkCV vs CVwizard" },
      { href: "/cv-gids/werkcv-vs-cvster", label: "WerkCV vs CVster" },
      { href: "/cv-gids/werkcv-vs-europass", label: "WerkCV vs Europass" },
      { href: "/cv-gids/werkcv-vs-resumaker", label: "WerkCV vs Resumaker" },
      { href: "/cv-gids/werkcv-vs-maakeencv", label: "WerkCV vs maakeencv.nl" },
    ],
  },
];

const contentBlocks = [
  {
    href: "/profieltekst-cv-voorbeelden",
    title: "Profieltekst CV voorbeelden",
    body: "Voor openingsalinea's die direct vertrouwen en richting geven.",
  },
  {
    href: "/werkervaring-cv-voorbeelden",
    title: "Werkervaring CV voorbeelden",
    body: "Voor betere bullets, resultaten en recruiter-proof bewijs.",
  },
  {
    href: "/vaardigheden-cv-voorbeelden",
    title: "Vaardigheden CV voorbeelden",
    body: "Voor skillssecties die logisch matchen met de vacature.",
  },
  {
    href: "/cv-voorbeelden",
    title: "CV voorbeelden per beroep",
    body: "Voor rolgerichte inhoud, structuur en voorbeeldprofielen.",
  },
];

const workflowSteps = [
  {
    title: "1) Kies je zoekintentie",
    body: "Bijvoorbeeld gratis cv maken, cv maken student of cv maken in Engels.",
  },
  {
    title: "2) Verbeter kerninhoud",
    body: "Werk eerst je profieltekst, werkervaring en vaardigheden inhoudelijk uit.",
  },
  {
    title: "3) Vergelijk voorbeeld of template",
    body: "Gebruik voorbeelden voor inhoud en templates voor structuur en visualiteit.",
  },
  {
    title: "4) Bouw je definitieve versie",
    body: "Ga daarna pas naar de editor en download wanneer je versie vacaturegericht klopt.",
  },
];

export default function CvgidsHubPage() {
  const pages = getDutchWavePages();

  return (
    <main className="min-h-screen bg-[#FFFEF9]">
      <section className="border-b-4 border-black bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <span className="inline-block bg-[#FF6B6B] text-white text-sm font-bold px-3 py-1 mb-4 border-2 border-black">
            NEDERLANDSE CV GIDS
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Nederlandse CV gids voor veelgezochte termen
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl leading-relaxed">
            Gebruik deze pagina als centrale hub voor cv maken in Nederland. Je vindt hier niet alleen losse gidsen, maar ook de beste routes voor profieltekst, werkervaring, vaardigheden, templates, voorbeelden en speciale situaties zoals een student-CV of een Engels CV voor Nederlandse vacatures.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              "Sterke interne routes voor cv maken, voorbeelden en templates",
              "Long-tail pagina's voor student, stage, mobiel, PDF en Engels",
              "Gidsen die je direct doorsturen naar editor, tools en rolgerichte voorbeelden",
            ].map((item) => (
              <div key={item} className="border-3 border-black bg-white p-4 text-sm font-black text-gray-900" style={{ borderWidth: "3px" }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-4 border-black bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-black text-gray-900 mb-4">Hoe gebruik je deze gids slim?</h2>
          <p className="text-gray-700 max-w-4xl leading-relaxed">
            De snelste route is meestal: begin met de intentiepagina die past bij je situatie, open daarna een inhoudelijke gids voor profieltekst of werkervaring, vergelijk eventueel een voorbeeld, en finaliseer pas dan in de editor. Zo voelt deze hub minder als een losse verzameling artikelen en meer als een complete Nederlandse CV-workflow.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {workflowSteps.map((step) => (
              <article key={step.title} className="border-3 border-black bg-[#FFFEF9] p-5" style={{ borderWidth: "3px" }}>
                <h3 className="text-lg font-black text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-4 border-black bg-[#FFF7E8]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-black text-gray-900 mb-4">Belangrijkste CV-routes</h2>
          <p className="text-gray-700 max-w-4xl leading-relaxed">
            Dit zijn de pagina&apos;s waar de meeste Nederlandse zoekintenties samenkomen. Als deze hub links moet doorgeven aan routes met de meeste commerciële en inhoudelijke waarde, dan zijn dit de logische kandidaten.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {guideGroups.map((group) => (
              <article key={group.title} className="border-4 border-black bg-white p-6">
                <h3 className="text-2xl font-black text-gray-900">{group.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">{group.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="border-2 border-black bg-[#FFFEF9] px-3 py-1.5 text-sm font-bold hover:bg-yellow-100 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-4 border-black bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-black text-gray-900 mb-4">Diepe gidsen voor profiel, werkervaring en vaardigheden</h2>
          <p className="text-gray-700 max-w-4xl leading-relaxed">
            Een goede Nederlandse CV-pagina is niet alleen een overzicht, maar ook een bron waar andere sites natuurlijk naar zouden kunnen linken. Daarom wijzen we hier niet alleen naar losse rolpagina&apos;s, maar ook naar de belangrijkste inhoudsthema&apos;s: hoe je een sterke profieltekst schrijft, werkervaring overtuigend formuleert en vaardigheden ATS-proof inzet.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {contentBlocks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block border-4 border-black bg-[#FFFEF9] p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5"
              >
                <p className="text-sm font-black text-gray-900">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{item.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-4 border-black bg-[#FFF7E8]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-black text-gray-900 mb-4">Vergelijk CV builders slim voordat je kiest</h2>
          <p className="text-gray-700 max-w-4xl leading-relaxed">
            Steeds meer bezoekers komen niet binnen op “hoe maak ik een CV?”, maar op “welke tool moet ik gebruiken?”. Daarom hebben we de belangrijkste vergelijking- en keuzehulppagina&apos;s hier als eigen cluster bij elkaar gezet.
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {comparisonGuideGroups.map((group) => (
              <article key={group.title} className="border-4 border-black bg-white p-6">
                <h3 className="text-2xl font-black text-gray-900">{group.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">{group.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="border-2 border-black bg-[#FFFEF9] px-3 py-1.5 text-sm font-bold hover:bg-yellow-100 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-6">
          <h2 className="text-3xl font-black text-gray-900 mb-3">Alle CV gidsen</h2>
          <p className="text-gray-700 max-w-4xl leading-relaxed">
            Hieronder staan alle inhoudelijke gidsen uit deze cluster. Gebruik ze als verdieping nadat je de juiste intentieroute hierboven hebt gekozen.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => (
            <Link
              key={page.slug}
              href={`/cv-gids/${page.slug}`}
              className="group block bg-white border-3 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
            >
              <h2 className="font-black text-xl mb-2 group-hover:text-[#FF6B6B] transition-colors">
                {page.title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-3">{page.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
