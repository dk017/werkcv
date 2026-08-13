import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getAllSkillGuideArticles } from "@/lib/vaardigheden-gids/registry";
import {
  skillGuideCategoryColors,
  skillGuideCategoryLabels,
} from "@/lib/vaardigheden-gids/types";

export const metadata: Metadata = {
  title: "Vaardigheden & eigenschappen: van woord naar bewijs",
  description:
    "Ontdek eigenschappen, cognitieve en didactische vaardigheden, competenties en verbeterpunten. Met voorbeelden die je omzet in geloofwaardig werkbewijs.",
  keywords: [
    "vaardigheden",
    "eigenschappen",
    "competenties",
    "karaktereigenschappen",
    "cognitieve vaardigheden",
    "didactische vaardigheden",
  ],
  alternates: { canonical: "https://werkcv.nl/vaardigheden" },
  openGraph: {
    title: "Vaardigheden & eigenschappen | WerkCV",
    description: "Kies de juiste woorden en bewijs ze in cv en sollicitatiegesprek.",
    type: "website",
    locale: "nl_NL",
    url: "https://werkcv.nl/vaardigheden",
  },
};

const foundationLinks = [
  {
    href: "/vaardigheden-cv-voorbeelden",
    title: "Vaardigheden op je cv",
    body: "Kies hard en soft skills per functie en bouw een scanbare skillssectie.",
  },
  {
    href: "/competenties-voorbeelden",
    title: "Competenties voorbeelden",
    body: "Vergelijk professioneel werkgedrag zoals plannen, analyseren en samenwerken.",
  },
  {
    href: "/eigenschappen-cv-voorbeelden",
    title: "Eigenschappen op je cv",
    body: "Selecteer persoonlijke kenmerken die relevant en aantoonbaar zijn.",
  },
];

export default function SkillsHubPage() {
  const articles = getAllSkillGuideArticles();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Vaardigheden en eigenschappen",
    description: metadata.description,
    url: "https://werkcv.nl/vaardigheden",
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
        url: `https://werkcv.nl/vaardigheden/${article.slug}`,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-[#FFFEF0]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-2xl font-black tracking-tight text-black">
            Werk<span className="bg-yellow-400 px-1">CV</span>.nl
          </Link>
          <Link href="/tools/vaardigheden-generator" className="border-2 border-black bg-yellow-400 px-3 py-2 text-sm font-black text-black">
            Maak mijn shortlist
          </Link>
        </div>
      </header>

      <main>
        <div className="border-b-4 border-black bg-white">
          <div className="mx-auto max-w-6xl px-6 py-3">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Vaardigheden", href: "/vaardigheden" }]} />
          </div>
        </div>

        <section className="border-b-4 border-black bg-gradient-to-br from-emerald-50 via-yellow-50 to-blue-50">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <p className="inline-block border-2 border-black bg-[#A7F3D0] px-3 py-1 text-xs font-black uppercase tracking-[0.22em]">
              Van label naar gedrag
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-black md:text-6xl">
              Vaardigheden en eigenschappen die je kunt bewijzen
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-medium leading-relaxed text-slate-700 md:text-xl">
              Een woordenlijst is pas het begin. Leer het juiste begrip kiezen, herken het
              bijbehorende gedrag en vertaal dat naar een voorbeeld dat een recruiter kan volgen.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">De basis</p>
          <h2 className="mt-2 text-3xl font-black text-black">Wat wil je op je cv zetten?</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {foundationLinks.map((item) => (
              <Link key={item.href} href={item.href} className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-colors hover:bg-yellow-50">
                <h3 className="text-xl font-black text-black">{item.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{item.body}</p>
              </Link>
            ))}
          </div>

          <div className="mt-16 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Verdiepende gidsen</p>
              <h2 className="mt-2 text-3xl font-black text-black">Begrijp het gedrag achter het woord</h2>
            </div>
          </div>
          <div className="mt-7 grid gap-6 md:grid-cols-2">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/vaardigheden/${article.slug}`}
                className="group border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <span
                    className="border-2 border-black px-2 py-1 text-xs font-black uppercase tracking-[0.14em]"
                    style={{ backgroundColor: skillGuideCategoryColors[article.category] }}
                  >
                    {skillGuideCategoryLabels[article.category]}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{article.readingTime} min</span>
                </div>
                <h3 className="mt-4 text-2xl font-black leading-tight text-black">{article.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{article.description}</p>
                <p className="mt-4 border-l-4 border-[#4ECDC4] pl-3 text-sm font-bold leading-relaxed text-slate-900">
                  {article.quickAnswer}
                </p>
                <span className="mt-5 inline-block font-black text-black transition-transform group-hover:translate-x-1">Lees de gids →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y-4 border-black bg-[#A7F3D0]">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-black text-black">Van vacaturewoord naar eerlijke shortlist</h2>
              <p className="mt-3 font-medium leading-relaxed text-black/80">
                Kies alleen vaardigheden die je beheerst en bereid voor elk belangrijk woord een concreet voorbeeld voor.
              </p>
            </div>
            <Link href="/tools/vaardigheden-generator" className="border-4 border-black bg-white px-6 py-4 font-black text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
              Open de vaardigheden-generator
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
