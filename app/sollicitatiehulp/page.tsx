import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import {
  applicationHelpCategoryColors,
  applicationHelpCategoryLabels,
  ApplicationHelpCategory,
} from "@/lib/sollicitatiehulp/types";
import {
  getAllApplicationHelpArticles,
  getApplicationHelpArticlesByCategory,
} from "@/lib/sollicitatiehulp/registry";

export const metadata: Metadata = {
  title: "Sollicitatiehulp: helder schrijven, cv-termen en voorbeelden",
  description:
    "Praktische, gecontroleerde hulp voor je sollicitatie: aanhef, zakelijke formuleringen, cv-betekenis en het verschil tussen cv en resume.",
  keywords: [
    "sollicitatiehulp",
    "sollicitatiebrief schrijven",
    "zakelijke brief schrijven",
    "cv betekenis",
    "cv en resume verschil",
  ],
  alternates: {
    canonical: "https://werkcv.nl/sollicitatiehulp",
  },
  openGraph: {
    title: "Sollicitatiehulp | WerkCV",
    description:
      "Schrijf duidelijker en kies de juiste cv- en briefconventies met brongecontroleerde uitleg.",
    type: "website",
    locale: "nl_NL",
    url: "https://werkcv.nl/sollicitatiehulp",
  },
};

const categoryDescriptions: Record<ApplicationHelpCategory, string> = {
  taal: "Los veelgemaakte taalfouten op en vervang formele clichés door precieze, moderne zinnen.",
  brief: "Kies een aanhef en briefstructuur die past bij de ontvanger, de organisatie en jouw doel.",
  cv: "Begrijp de termen en conventies voordat je je cv voor Nederland of een internationale markt maakt.",
};

const categories: ApplicationHelpCategory[] = ["brief", "taal", "cv"];

export default function ApplicationHelpHubPage() {
  const articles = getAllApplicationHelpArticles();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Sollicitatiehulp",
    description: metadata.description,
    url: "https://werkcv.nl/sollicitatiehulp",
    inLanguage: "nl-NL",
    isAccessibleForFree: true,
    publisher: { "@id": "https://werkcv.nl/#organization" },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: article.title,
        url: `https://werkcv.nl/sollicitatiehulp/${article.slug}`,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-[#FFFEF0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-2xl font-black tracking-tight text-black">
            Werk<span className="bg-yellow-400 px-1">CV</span>.nl
          </Link>
          <Link
            href="/tools/sollicitatiebrief-generator"
            className="border-2 border-black bg-yellow-400 px-3 py-2 text-sm font-black text-black"
          >
            Maak je brief
          </Link>
        </div>
      </header>

      <main>
        <div className="border-b-4 border-black bg-white">
          <div className="mx-auto max-w-6xl px-6 py-3">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Sollicitatiehulp", href: "/sollicitatiehulp" },
              ]}
            />
          </div>
        </div>

        <section className="border-b-4 border-black bg-gradient-to-br from-yellow-100 via-[#FFFEF0] to-teal-50">
          <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
            <p className="inline-block border-2 border-black bg-[#4ECDC4] px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-black">
              Taal die werkt
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-black md:text-6xl">
              Sollicitatiehulp zonder clichés of giswerk
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-medium leading-relaxed text-slate-700 md:text-xl">
              Van de eerste aanhef tot de juiste internationale cv-term. Elk antwoord is
              praktisch uitgewerkt, gecontroleerd aan gezaghebbende taal- en loopbaanbronnen
              en voorzien van voorbeelden die je echt kunt aanpassen.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 text-xs font-black uppercase tracking-[0.16em] text-black">
              <span className="border-2 border-black bg-white px-3 py-2">Bronnen vermeld</span>
              <span className="border-2 border-black bg-white px-3 py-2">Situatiegerichte voorbeelden</span>
              <span className="border-2 border-black bg-white px-3 py-2">Gratis te lezen</span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-10 grid gap-5 md:grid-cols-3">
            <div className="border-4 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-3xl font-black">1</p>
              <h2 className="mt-2 text-lg font-black">Vind je precieze situatie</h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                Naam bekend of niet? Nederland of VS? Informeren of om actie vragen?
              </p>
            </div>
            <div className="border-4 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-3xl font-black">2</p>
              <h2 className="mt-2 text-lg font-black">Kies met de beslistabel</h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                Vergelijk opties, toon en uitzonderingen zonder een lang artikel te ontcijferen.
              </p>
            </div>
            <div className="border-4 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-3xl font-black">3</p>
              <h2 className="mt-2 text-lg font-black">Maak het eigen</h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                Pas het voorbeeld aan met jouw ontvanger, bewijs en gewenste vervolgstap.
              </p>
            </div>
          </div>

          <div className="space-y-14">
            {categories.map((category) => {
              const categoryArticles = getApplicationHelpArticlesByCategory(category);
              return (
                <section key={category} aria-labelledby={`${category}-title`}>
                  <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p
                        className="inline-block border-2 border-black px-3 py-1 text-xs font-black uppercase tracking-[0.18em]"
                        style={{ backgroundColor: applicationHelpCategoryColors[category] }}
                      >
                        {applicationHelpCategoryLabels[category]}
                      </p>
                      <h2 id={`${category}-title`} className="mt-3 text-3xl font-black text-black">
                        {applicationHelpCategoryLabels[category]}
                      </h2>
                    </div>
                    <p className="max-w-2xl text-sm font-medium leading-relaxed text-slate-700 md:text-right">
                      {categoryDescriptions[category]}
                    </p>
                  </div>

                  <div className="mt-6 grid gap-5 md:grid-cols-2">
                    {categoryArticles.map((article) => (
                      <Link
                        key={article.slug}
                        href={`/sollicitatiehulp/${article.slug}`}
                        className="group border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)]"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs font-black uppercase tracking-[0.15em] text-slate-500">
                            {article.readingTime} min lezen
                          </span>
                          <span aria-hidden="true" className="text-2xl font-black transition-transform group-hover:translate-x-1">
                            →
                          </span>
                        </div>
                        <h3 className="mt-3 text-xl font-black leading-tight text-black md:text-2xl">
                          {article.title}
                        </h3>
                        <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                          {article.description}
                        </p>
                        <p className="mt-4 border-l-4 border-[#4ECDC4] pl-3 text-sm font-bold leading-relaxed text-slate-900">
                          {article.quickAnswer}
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>

        <section className="border-y-4 border-black bg-[#4ECDC4]">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-black">Van uitleg naar toepassing</p>
              <h2 className="mt-2 text-3xl font-black text-black">Schrijf een brief die alleen van jou kan zijn</h2>
              <p className="mt-3 font-medium leading-relaxed text-black/80">
                Gebruik de generator als startpunt en controleer daarna elk voorbeeld op jouw
                ervaring, de vacature en de naam van de ontvanger.
              </p>
            </div>
            <Link
              href="/tools/sollicitatiebrief-generator"
              className="inline-block flex-shrink-0 border-4 border-black bg-white px-6 py-4 text-base font-black text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            >
              Open de briefgenerator
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
