import type { Metadata } from "next";
import Link from "next/link";
import { AgencyContentLink, AgencyContentView } from "@/components/agency/AgencyContentAnalytics";
import AgencyRoiCalculator from "@/components/agency/AgencyRoiCalculator";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd, JsonLd } from "@/components/seo/JsonLd";
import {
  AGENCY_CONTENT_MODIFIED,
  AGENCY_CONTENT_PUBLISHED,
  agencyKnowledgeGuides,
} from "@/lib/agency-content";

const path = "/voor-bureaus";

export const metadata: Metadata = {
  title: "WerkCV voor recruitmentbureaus en detacheerders",
  description:
    "Maak controleerbare kandidaatvoorstellen met CV-bewijs per functie-eis, zichtbare open punten, recruiter-review en consistente PDF- en DOCX-output.",
  alternates: { canonical: `https://werkcv.nl${path}` },
  openGraph: {
    title: "Van kandidaat-CV naar een voorstel dat uw opdrachtgever kan beoordelen",
    description:
      "WerkCV brengt vacature-eisen, CV-bewijs en bevestigde voorstelgegevens samen zonder ontbrekende informatie te verbergen.",
    url: `https://werkcv.nl${path}`,
    type: "website",
    locale: "nl_NL",
  },
};

const primaryButtonClass =
  "inline-flex min-h-12 items-center justify-center border-2 border-slate-950 bg-emerald-400 px-5 py-3 text-center text-sm font-black text-slate-950 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5";
const secondaryButtonClass =
  "inline-flex min-h-12 items-center justify-center border-2 border-slate-950 bg-white px-5 py-3 text-center text-sm font-black text-slate-950 transition-colors hover:bg-yellow-100";

const frictionPoints = [
  {
    title: "De aansluiting zit alleen in het hoofd van de recruiter",
    body: "De opdrachtgever krijgt een CV, maar moet zelf afleiden welke ervaring bij welke functie-eis hoort.",
  },
  {
    title: "Onbevestigde informatie klinkt alsnog als een feit",
    body: "Beschikbaarheid, tarief of specifieke toolervaring raakt gemakkelijk vermengd met aannames of losse intake-notities.",
  },
  {
    title: "Volledige en contactvrije versies lopen uiteen",
    body: "Losse bron-, volledige en versies zonder directe contactgegevens maken het moeilijk om te zien welke inhoud daadwerkelijk is gecontroleerd.",
  },
];

const workflow = [
  ["1", "Breng bron en vraag samen", "Upload één tekstgebaseerd PDF- of DOCX-CV en plak de volledige vacature."],
  ["2", "Controleer de bewijsmatrix", "Bekijk per functie-eis wat sterk, gedeeltelijk of niet aantoonbaar is in het CV."],
  ["3", "Bevestig de feiten", "Corrigeer extracties en vul alleen gegevens in die met de kandidaat zijn gecontroleerd."],
  ["4", "Keur de snapshot goed", "Kies een volledig voorstel of optionele versie zonder directe contactgegevens als PDF en kopieer de begeleidende e-mail."],
] as const;

const decisionRows = [
  ["U wilt alleen een kandidaat-CV opmaken", "Agency CV-route", "Een consistente CV-PDF vanuit de bestaande editor."],
  ["U stelt een kandidaat voor op een concrete vacature", "MatchPack", "Functie-eisen, CV-bewijs, open punten, voorstelgegevens en PDF + DOCX."],
  ["U verwerkt veel kandidaten tegelijk", "Nog niet ondersteund", "De huidige workflow behandelt één kandidaat en één vacature per voorstel."],
  ["U wilt rechtstreeks synchroniseren met een ATS", "Nog niet ondersteund", "WerkCV levert PDF-output en een kopieerbare e-mail, geen ATS-koppeling."],
] as const;

const faqs = [
  {
    question: "Wat is het verschil tussen een kandidaat-CV en een kandidaatvoorstel?",
    answer:
      "Een kandidaat-CV beschrijft opleiding, ervaring en vaardigheden. Een kandidaatvoorstel voegt de context voor één opdrachtgever toe: doelrol, onderbouwde aansluiting op functie-eisen, bevestigde praktische gegevens, open punten en een begeleidende introductie.",
  },
  {
    question: "Vult WerkCV ontbrekende gegevens automatisch aan?",
    answer:
      "Nee. Beschikbaarheid, opzegtermijn, salaris- of tariefindicatie en kandidaatwensen blijven leeg totdat de recruiter ze zelf bevestigt. Ontbrekend bewijs blijft zichtbaar in plaats van te worden omgezet in een overtuigend klinkende aanname.",
  },
  {
    question: "Levert MatchPack een DOCX-bestand?",
    answer:
      "Ja. Na goedkeuring kun je de gekozen klantversie als PDF én DOCX downloaden. De introductie en begeleidende e-mail zijn vóór goedkeuring bewerkbaar in de MatchPack-workspace.",
  },
  {
    question: "Is de versie zonder directe contactgegevens automatisch anoniem of AVG-proof?",
    answer:
      "Nee. WerkCV maakt gestructureerde naam- en contactvelden leeg en filtert contactachtige tekst, maar namen in lopende tekst, werkgevers, opleidingen of projecten kunnen iemand nog herkenbaar maken. De recruiter moet het concept altijd controleren en blijft verantwoordelijk voor de grondslag en het doel van delen.",
  },
  {
    question: "Kan een heel recruitmentteam in hetzelfde account werken?",
    answer:
      "De eigenaar kan editors, reviewers en viewers toevoegen. Rollen bepalen wie kan maken, controleren, goedkeuren of alleen lezen. Bulkverwerking en een klantportaal zijn nog niet inbegrepen.",
  },
  {
    question: "Wat kost de Agency-billing tier voor MatchPack?",
    answer:
      "De Agency-billing tier kost €149 per betaalde maand en omvat maximaal 50 nieuwe kandidaatdocumenten of definitief goedgekeurde voorstellen. Analyse, conceptreview en opnieuw downloaden van hetzelfde goedgekeurde voorstel gebruiken niet opnieuw een slot.",
  },
];

export default function VoorBureausPage() {
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "WerkCV voor bureaus",
    description: metadata.description,
    url: `https://werkcv.nl${path}`,
    inLanguage: "nl-NL",
    datePublished: AGENCY_CONTENT_PUBLISHED,
    dateModified: AGENCY_CONTENT_MODIFIED,
    isPartOf: { "@id": "https://werkcv.nl/#website" },
    about: { "@type": "SoftwareApplication", name: "WerkCV MatchPack", url: "https://werkcv.nl/agency" },
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <AgencyContentView kind="hub" path={path} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Voor bureaus", href: path }]} />

      <section className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">WerkCV voor bureaus</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            Laat uw opdrachtgever niet zelf uitzoeken waarom een kandidaat past.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-700">
            Een professioneel kandidaatvoorstel maakt functie-eisen, concreet CV-bewijs en bevestigde praktische gegevens in één pakket zichtbaar. WerkCV zet één CV en vacature om in een controleerbaar concept, houdt onbekende informatie open en laat de recruiter vóór PDF-export goedkeuren. Zo ontvangt de klant een onderbouwd voorstel, niet alleen een opnieuw opgemaakt CV.
          </p>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row">
            <AgencyContentLink href="#werkwijze" path={path} location="hub_hero" intent="learn" className={primaryButtonClass}>
              Bekijk de werkwijze
            </AgencyContentLink>
            <AgencyContentLink href="/agency#plan" path={path} location="hub_hero" intent="product" className={secondaryButtonClass}>
              Start MatchPack · Agency
            </AgencyContentLink>
          </div>
          <Link href="/tools/kandidaatvoorstel-checker" className="mt-5 inline-flex text-sm font-black text-emerald-800 underline decoration-2 underline-offset-4">
            Probeer eerst gratis de Candidate Proposal Evidence Checker →
          </Link>
          <p className="mt-5 text-sm font-semibold text-slate-500">
            Voor recruitmentbureaus, werving-en-selectiebureaus, detacheerders, outplacement- en re-integratiebureaus en loopbaancoaches die kandidaten op concrete vacatures of trajecten begeleiden.
          </p>
        </div>

        <aside className="border-2 border-slate-950 bg-slate-950 p-6 text-white shadow-[8px_8px_0px_0px_rgba(78,205,196,1)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">De opdrachtgever moet direct kunnen zien</p>
          <ol className="mt-6 space-y-5">
            {[
              ["01", "Welke eisen zijn belangrijk?"],
              ["02", "Welk CV-bewijs ondersteunt iedere eis?"],
              ["03", "Wat is nog niet bevestigd?"],
              ["04", "Welke versie heeft de recruiter goedgekeurd?"],
            ].map(([number, question]) => (
              <li key={number} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-slate-700 pb-4 last:border-0 last:pb-0">
                <span className="font-mono text-sm font-black text-yellow-300">{number}</span>
                <span className="font-black leading-snug">{question}</span>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      <section className="border-y-2 border-slate-950 py-12 sm:py-16">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-700">Waar het voorstelproces breekt</p>
        <h2 className="mt-3 max-w-4xl text-3xl font-black tracking-tight sm:text-4xl">
          Een mooier document helpt niet wanneer de onderbouwing ontbreekt.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {frictionPoints.map((item, index) => (
            <article key={item.title} className="border-2 border-slate-950 bg-white p-5">
              <span className="font-mono text-sm font-black text-rose-600">0{index + 1}</span>
              <h3 className="mt-4 text-lg font-black">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="werkwijze" className="scroll-mt-6 py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">WerkCV MatchPack</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Van bronbestand naar gecontroleerde snapshot.</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              WerkCV bereidt het voorstel voor. De recruiter blijft verantwoordelijk voor bewijs, correcties, praktische gegevens en de beslissing om het document te delen.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {workflow.map(([number, title, body]) => (
              <article key={number} className="border-2 border-slate-950 bg-white p-5 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                <span className="flex h-9 w-9 items-center justify-center bg-emerald-400 text-sm font-black">{number}</span>
                <h3 className="mt-4 font-black">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y-2 border-slate-950 py-12 sm:py-16">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-700">Kies de juiste route</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight">Niet ieder bureauprobleem vraagt om MatchPack.</h2>
        <div className="mt-7 overflow-x-auto border-2 border-slate-950 bg-white">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="bg-slate-950 text-white">
              <tr><th className="p-4">Uw situatie</th><th className="p-4">Passende route</th><th className="p-4">Wat u krijgt</th></tr>
            </thead>
            <tbody>
              {decisionRows.map(([situation, route, outcome]) => (
                <tr key={situation} className="border-t border-slate-200 align-top">
                  <th className="p-4 font-black">{situation}</th><td className="p-4 font-bold text-emerald-800">{route}</td><td className="p-4 leading-relaxed text-slate-600">{outcome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <AgencyRoiCalculator path={path} />

      <section className="py-12 sm:py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Kennisbank voor bureaus</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">Gebruik de aanpak ook zonder software.</h2>
          </div>
          <Link href="/voor-bureaus/kennisbank" className="text-sm font-black text-emerald-800 underline decoration-2 underline-offset-4">
            Bekijk de hele kennisbank →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {agencyKnowledgeGuides.map((guide) => {
            const published = guide.status === "published";
            const content = (
              <article className={`h-full border-2 border-slate-950 p-5 ${guide.theme === "emerald" ? "bg-emerald-100" : guide.theme === "yellow" ? "bg-yellow-100" : "bg-sky-100"}`}>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-600">{published ? guide.readingTime : "In voorbereiding"}</p>
                <h3 className="mt-3 text-xl font-black leading-snug">{guide.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{guide.description}</p>
                <p className="mt-5 text-sm font-black">{published ? "Lees de gids →" : "Wordt toegevoegd na broncontrole"}</p>
              </article>
            );
            return published ? <Link key={guide.slug} href={guide.href}>{content}</Link> : <div key={guide.slug}>{content}</div>;
          })}
        </div>
      </section>

      <section className="border-y-2 border-slate-950 py-12 sm:py-16">
        <h2 className="text-3xl font-black tracking-tight">Veelgestelde vragen</h2>
        <div className="mt-6 space-y-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="border-2 border-slate-200 bg-white p-4 open:border-slate-950">
              <summary className="cursor-pointer font-black">{faq.question}</summary>
              <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-12 border-2 border-slate-950 bg-slate-950 p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)] sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-yellow-300">Maak de onderbouwing zichtbaar</p>
            <h2 className="mt-2 max-w-2xl text-3xl font-black">Geef uw opdrachtgever minder zoekwerk en uw recruiter meer controle.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">Bekijk eerst het fictieve voorstel. Start daarna MatchPack met de Agency-billing tier wanneer de werkwijze past.</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3">
            <AgencyContentLink href="/agency#voorbeeld" path={path} location="hub_bottom" intent="sample" className="border-2 border-white bg-white px-5 py-3 text-center text-sm font-black text-slate-950">
              Bekijk het voorbeeld
            </AgencyContentLink>
            <AgencyContentLink href="/agency#plan" path={path} location="hub_bottom" intent="product" className="border-2 border-white bg-yellow-300 px-5 py-3 text-center text-sm font-black text-slate-950">
              Start MatchPack · Agency €149/maand
            </AgencyContentLink>
          </div>
        </div>
      </section>

      <p className="mt-5 text-center text-xs font-semibold text-slate-500"><Link href="/agency/privacy" className="text-emerald-700 underline underline-offset-4">Privacy, retentie en DPA-informatie</Link></p>

      <FAQJsonLd questions={faqs} />
      <JsonLd data={webpageSchema} />
    </main>
  );
}
