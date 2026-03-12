import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { FAQJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";

const coachBenefits = [
  {
    title: "Minder tijd kwijt aan opmaakvragen",
    body:
      "Cliënten kunnen direct starten met Nederlandse templates, in plaats van losse Word-bestanden of onduidelijke layouts.",
  },
  {
    title: "Sterke combinatie van tools + uitleg",
    body:
      "WerkCV combineert editor, voorbeeldpagina's, sollicitatiehulp en nuttige tools rond werk en salaris.",
  },
  {
    title: "Werkt voor Nederlands én internationaal profiel",
    body:
      "Naast Dutch-first assets zijn er Engelse CV- en expat-routes voor coaches die internationals begeleiden.",
  },
  {
    title: "Geen abonnement als basisboodschap",
    body:
      "Gebruikers kunnen gratis starten en betalen pas bij download. Dat maakt doorverwijzen eenvoudiger en transparanter.",
  },
];

const coachUseCases = [
  {
    title: "Loopbaanbegeleiding",
    body:
      "Gebruik WerkCV als praktische stap na een sessie over richting, profieltekst, werkervaring of sollicitatiestrategie.",
  },
  {
    title: "Outplacement & re-integratie",
    body:
      "Verwijs kandidaten naar heldere templates, Nederlandse sollicitatiegidsen en concrete tools die direct bruikbaar zijn.",
  },
  {
    title: "Studenten en starters",
    body:
      "Combineer basiscoaching met toegankelijke templates, voorbeeldzinnen en CV-hulp zonder ingewikkelde software.",
  },
  {
    title: "Expat en international coaching",
    body:
      "Koppel Engelse CV-assets aan visa- en werk-in-Nederland tools voor mensen die de Nederlandse markt nog moeten leren kennen.",
  },
];

const resourceLinks = [
  { href: "/gratis-cv-template", label: "Gratis CV template" },
  { href: "/cv-voorbeelden", label: "CV voorbeelden" },
  { href: "/cv-gids", label: "CV gidsen" },
  { href: "/tools", label: "Gratis tools" },
  { href: "/engels-cv-template", label: "Engels CV template" },
  { href: "/tools/zoekjaar-checker", label: "Zoekjaar checker" },
];

const collaborationOptions = [
  "Resource-link of toolkit-opname voor cliënten",
  "Workshop of webinar voor jouw doelgroep",
  "Co-branded selectie van relevante WerkCV-assets",
  "Eenvoudige partnerafspraak op maat per doelgroep",
];

const faqs = [
  {
    question: "Voor welke coaches is deze pagina bedoeld?",
    answer:
      "Voor loopbaancoaches, jobcoaches, studentcoaches, outplacementbegeleiders, re-integratieprofessionals en coaches die internationals of expats begeleiden.",
  },
  {
    question: "Moet ik technisch iets integreren om WerkCV te gebruiken?",
    answer:
      "Nee. De eenvoudigste samenwerking is een relevante resource-link, verwijzing of gezamenlijke workshop. Daar is geen technische integratie voor nodig.",
  },
  {
    question: "Kunnen mijn cliënten gratis starten?",
    answer:
      "Ja. Cliënten kunnen gratis in de editor werken en betalen pas wanneer ze hun PDF willen downloaden.",
  },
  {
    question: "Kunnen jullie ook Engelse of expat-doelgroepen ondersteunen?",
    answer:
      "Ja. WerkCV is Dutch-first, maar heeft ook Engelse CV-assets en tools zoals de zoekjaar checker voor internationals die naar Nederland willen werken.",
  },
];

export const metadata: Metadata = {
  title: "Voor coaches en loopbaanbegeleiders | WerkCV.nl",
  description:
    "WerkCV.nl voor loopbaancoaches, jobcoaches en re-integratie. Verwijs cliënten naar Nederlandse CV-templates, gidsen en praktische sollicitatietools.",
  keywords: [
    "werkcv voor coaches",
    "loopbaancoach cv tool",
    "jobcoach cv templates",
    "reintegratie cv hulp",
    "outplacement cv tools",
    "nederlandse cv hulp voor coaches",
  ],
  alternates: {
    canonical: "https://werkcv.nl/for-coaches",
  },
};

export default function ForCoachesPage() {
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
        name: "Voor coaches",
        item: "https://werkcv.nl/for-coaches",
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
            href="/partners"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-bold text-black transition-colors hover:bg-yellow-300"
          >
            Partners
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
            <li className="font-bold text-black">Voor coaches</li>
          </ol>
        </nav>

        <section className="mb-10 border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="mb-4 inline-block border-2 border-black bg-yellow-400 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-black">
            Voor coaches en loopbaanbegeleiders
          </div>
          <h1 className="mb-4 text-4xl font-black text-black md:text-5xl">
            Geef cliënten een praktische CV-route, niet alleen advies
          </h1>
          <p className="max-w-3xl text-lg font-medium leading-relaxed text-black">
            WerkCV.nl helpt coaches en begeleiders die hun cliënten een concrete volgende stap
            willen geven: een Dutch-first CV-editor, sollicitatiehulp en gratis tools voor werken in
            Nederland. Geschikt voor loopbaancoaching, outplacement, starters en internationale
            kandidaten.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="mailto:contact@werkcv.nl?subject=WerkCV%20voor%20coaches"
              className="inline-block border-4 border-black bg-yellow-400 px-6 py-4 text-center text-lg font-black text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              Bespreek samenwerking
            </a>
            <Link
              href="/contact"
              className="inline-block border-4 border-black bg-white px-6 py-4 text-center text-lg font-black text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-gray-50 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              Contact opnemen
            </Link>
          </div>
        </section>

        <section className="mb-10 grid gap-6 md:grid-cols-2">
          {coachBenefits.map((item) => (
            <article
              key={item.title}
              className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <h2 className="mb-3 text-xl font-black text-black">{item.title}</h2>
              <p className="font-medium leading-relaxed text-gray-700">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="mb-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-3xl font-black text-black">Wanneer WerkCV het meest helpt</h2>
            <div className="space-y-4">
              {coachUseCases.map((item) => (
                <div key={item.title} className="border-2 border-black bg-[#FFFEF0] p-4">
                  <h3 className="mb-2 text-lg font-black text-black">{item.title}</h3>
                  <p className="text-sm font-medium leading-relaxed text-gray-700">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-4 border-black bg-teal-300 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-2xl font-black text-black">Samenwerking kan klein beginnen</h2>
            <ul className="space-y-3 text-sm font-bold leading-relaxed text-black">
              {collaborationOptions.map((item) => (
                <li key={item}>&bull; {item}</li>
              ))}
            </ul>
            <p className="mt-5 text-sm font-medium leading-relaxed text-black">
              We werken liever met een relevante, bruikbare route voor jouw cliënten dan met een
              generieke sales-pitch.
            </p>
          </div>
        </section>

        <section className="mb-10 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-4 text-3xl font-black text-black">Assets die je direct kunt doorgeven</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {resourceLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-2 border-black bg-[#FFFEF0] px-4 py-3 text-sm font-bold text-black transition-colors hover:bg-yellow-100"
              >
                {link.label}
              </Link>
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
          <h2 className="mb-3 text-3xl font-black text-black">Stuur ons jouw doelgroep en use case</h2>
          <p className="mx-auto mb-6 max-w-2xl font-medium leading-relaxed text-black">
            Vertel in een paar regels wie je begeleidt, welke content of tools je nodig hebt en hoe je
            cliënten nu richting hun CV helpt. Dan komen wij terug met een concrete eerste route.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="mailto:contact@werkcv.nl?subject=WerkCV%20voor%20coaches"
              className="inline-block border-4 border-black bg-white px-6 py-4 text-lg font-black text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              Mail voor samenwerking
            </a>
            <Link
              href="/partners"
              className="inline-block border-4 border-black bg-black px-6 py-4 text-lg font-black text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              Bekijk partneropties
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
