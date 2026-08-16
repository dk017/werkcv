import type { Metadata } from "next";
import Link from "next/link";
import { AgencyContentLink, AgencyContentView } from "@/components/agency/AgencyContentAnalytics";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  AGENCY_CONTENT_MODIFIED,
  AGENCY_CONTENT_PUBLISHED,
  agencyKnowledgeGuides,
  publishedAgencyKnowledgeGuides,
} from "@/lib/agency-content";

const path = "/voor-bureaus/kennisbank";

export const metadata: Metadata = {
  title: "Kennisbank voor recruitmentbureaus | WerkCV",
  description:
    "Praktische gidsen over kandidaatvoorstellen, CV-opmaak, bewijs per functie-eis en het verantwoord delen van kandidaatdocumenten.",
  alternates: { canonical: `https://werkcv.nl${path}` },
  openGraph: {
    title: "WerkCV kennisbank voor bureaus",
    description:
      "Maak kandidaatvoorstellen die een opdrachtgever kan controleren, zonder onbevestigde informatie als feit te presenteren.",
    url: `https://werkcv.nl${path}`,
    type: "website",
    locale: "nl_NL",
  },
};

const questionsByStage = [
  {
    stage: "Voor het voorstel",
    questions: ["Welke vacature-eisen zijn werkelijk beslissend?", "Welke commerciële gegevens moet de kandidaat bevestigen?", "Welke CV-versie is de gecontroleerde bron?"],
  },
  {
    stage: "Tijdens de review",
    questions: ["Is ieder oordeel gekoppeld aan concreet CV-bewijs?", "Blijft ontbrekende informatie zichtbaar?", "Welke notities zijn intern en welke zijn voor de klant?"],
  },
  {
    stage: "Voor verzending",
    questions: ["Zijn introductie, beschikbaarheid en tarief bevestigd?", "Is de juiste volledige of versie zonder directe contactgegevens gekozen?", "Kan de opdrachtgever de belangrijkste aansluiting snel controleren?"],
  },
];

export default function AgencyKnowledgeIndexPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "WerkCV kennisbank voor bureaus",
    description: metadata.description,
    url: `https://werkcv.nl${path}`,
    inLanguage: "nl-NL",
    datePublished: AGENCY_CONTENT_PUBLISHED,
    dateModified: AGENCY_CONTENT_MODIFIED,
    isPartOf: { "@id": "https://werkcv.nl/#website" },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: publishedAgencyKnowledgeGuides.map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://werkcv.nl${guide.href}`,
        name: guide.title,
      })),
    },
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <AgencyContentView kind="index" path={path} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Voor bureaus", href: "/voor-bureaus" }, { label: "Kennisbank", href: path }]} />

      <section className="grid gap-8 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">Kennisbank voor bureaus</p>
          <h1 className="mt-4 break-words text-4xl font-black tracking-tight sm:text-6xl">Praktische uitleg voor kandidaatvoorstellen die klantvragen aankunnen.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-700">
            Een sterk kandidaatvoorstel is geen verkooppraatje over een CV. Het maakt zichtbaar wat aantoonbaar is, welke praktische gegevens zijn bevestigd en wat nog moet worden nagevraagd. Deze kennisbank helpt recruiters een voorstel op te bouwen dat bruikbaar blijft, ook wanneer zij geen WerkCV gebruiken.
          </p>
        </div>
        <aside className="border-2 border-slate-950 bg-yellow-300 p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-700">Redactionele regel</p>
          <p className="mt-3 text-xl font-black leading-snug">Een ontbrekend feit blijft een open vraag. AI mag er geen overtuigende zin van maken.</p>
        </aside>
      </section>

      <section className="border-y-2 border-slate-950 py-12 sm:py-16">
        <div className="grid gap-5 lg:grid-cols-3">
          {agencyKnowledgeGuides.map((guide) => {
            const published = guide.status === "published";
            const article = (
              <article className={`h-full border-2 border-slate-950 p-6 ${guide.theme === "emerald" ? "bg-emerald-100" : guide.theme === "yellow" ? "bg-yellow-100" : "bg-sky-100"}`}>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-600">{published ? "Gepubliceerd" : "In voorbereiding"}</span>
                  <span className="text-xs font-bold text-slate-500">{guide.readingTime}</span>
                </div>
                <h2 className="mt-5 text-2xl font-black leading-tight">{guide.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-700">{guide.description}</p>
                <p className="mt-6 text-sm font-black">{published ? "Lees de volledige gids →" : "Publicatie volgt na broncontrole"}</p>
              </article>
            );
            return published ? <Link key={guide.slug} href={guide.href}>{article}</Link> : <div key={guide.slug}>{article}</div>;
          })}
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Controle in drie momenten</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight">Stel de juiste vraag voordat u nieuwe tekst toevoegt.</h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {questionsByStage.map((group, index) => (
            <article key={group.stage} className="border-2 border-slate-950 bg-white p-5">
              <span className="font-mono text-sm font-black text-emerald-700">0{index + 1}</span>
              <h3 className="mt-3 text-xl font-black">{group.stage}</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
                {group.questions.map((question) => <li key={question} className="border-t border-slate-200 pt-3 first:border-0 first:pt-0">{question}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-2 border-slate-950 bg-slate-950 p-6 text-white shadow-[6px_6px_0px_0px_rgba(78,205,196,1)] sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">Van methode naar workflow</p>
            <h2 className="mt-2 max-w-2xl text-3xl font-black">WerkCV maakt dezelfde controles uitvoerbaar in één Agency-workspace.</h2>
          </div>
          <div className="flex shrink-0 flex-col gap-3">
            <AgencyContentLink href="/voor-bureaus" path={path} location="index_bottom" intent="learn" className="border-2 border-white bg-white px-5 py-3 text-center text-sm font-black text-slate-950">
              Bekijk de werkwijze
            </AgencyContentLink>
            <AgencyContentLink href="/agency#plan" path={path} location="index_bottom" intent="product" className="border-2 border-white bg-yellow-300 px-5 py-3 text-center text-sm font-black text-slate-950">
              Bekijk MatchPack · Agency billing
            </AgencyContentLink>
          </div>
        </div>
      </section>

      <JsonLd data={collectionSchema} />
    </main>
  );
}
