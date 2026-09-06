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
import { getAgencyAcquisitionRoute } from "@/lib/agency-acquisition";
import { getAgencyPublicCapabilities } from "@/lib/agency-public-capabilities";
import { getAgencyMonthlyPriceDisplay, AGENCY_MONTHLY_CREDIT_LIMIT } from "@/lib/agency-plan";

const path = "/voor-bureaus";
const route = getAgencyAcquisitionRoute(path)!;
const capabilities = getAgencyPublicCapabilities();
const monthlyPrice = getAgencyMonthlyPriceDisplay("nl");

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: `https://werkcv.nl${path}` },
  openGraph: {
    title: route.title,
    description:
      "WerkCV brengt vacature-eisen, CV-bewijs en bevestigde voorstelgegevens samen zonder ontbrekende informatie te verbergen.",
    url: `https://werkcv.nl${path}`,
    type: "website",
    locale: "nl_NL",
  },
};

const primaryButtonClass = "wk-button wk-button-primary";
const secondaryButtonClass = "wk-button wk-button-secondary";

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
  ["Je wilt alleen een kandidaat-CV opmaken", "CV-editor", "Een consistente CV-PDF vanuit de bestaande editor."],
  ["Je stelt een kandidaat voor op een concrete vacature", "MatchPack", "Functie-eisen, CV-bewijs, open punten, voorstelgegevens en PDF + DOCX."],
  ["Je verwerkt veel kandidaten tegelijk", "Nog niet ondersteund", "De huidige workflow behandelt één kandidaat en één vacature per voorstel."],
    ["Je wilt rechtstreeks synchroniseren met een ATS", "Nog niet ondersteund", "WerkCV levert PDF- en DOCX-output plus een kopieerbare e-mail; directe ATS-koppelingen zijn niet inbegrepen."],
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
      `De Agency-billing tier kost ${monthlyPrice} en omvat ${AGENCY_MONTHLY_CREDIT_LIMIT} gedeelde CV-credits per betaalde periode. Eén credit geldt voor een nieuw zelfstandig kandidaat-CV of de eerste definitieve goedkeuring van een MatchPack. Bewerken en opnieuw downloaden gebruiken geen extra credit.`,
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
    <div className="wk-agency-marketing">
    <main className="wk-container py-8">
      <AgencyContentView kind="hub" path={path} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Voor bureaus", href: path }]} />

      <section className="grid min-w-0 gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center">
        <div className="min-w-0">
          <p className="wk-eyebrow">WerkCV voor bureaus</p>
          <h1 className="mt-5 break-words text-4xl font-black leading-[1.06] tracking-[-0.05em] sm:text-6xl">
            {route.h1}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-700">
            WerkCV maakt van één CV en vacature een voorstel voor recruiterreview. Je controleert intern de gevonden bronfragmenten en open punten. De klant ontvangt de goedgekeurde introductie en het gekozen CV; de begeleidende e-mail kopieer je apart.
          </p>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row">
            <AgencyContentLink href="#werkwijze" path={path} location="hub_hero" intent="learn" className={primaryButtonClass}>
              Bekijk de werkwijze
            </AgencyContentLink>
            <AgencyContentLink href="/agency#plan" path={path} location="hub_hero" intent="product" className={secondaryButtonClass}>
              Bekijk MatchPack
            </AgencyContentLink>
          </div>
          <Link href="/tools/kandidaatvoorstel-checker" className="mt-5 inline-flex text-sm font-black text-emerald-800 underline decoration-2 underline-offset-4">
            {capabilities.proposalClaimVerifier ? "Probeer gratis de Candidate Proposal Evidence Checker →" : "Bekijk eerst het gratis CV-bewijs voor een vacature →"}
          </Link>
          <p className="mt-5 text-sm font-semibold text-slate-500">
            Voor recruitment- en detacheringsbureaus die kandidaten voorstellen op concrete vacatures.
          </p>
        </div>

          <aside className="wk-card wk-card-dark min-w-0 p-6 sm:p-8">
            <p className="wk-eyebrow text-[var(--wk-highlight)]">Wat je als recruiter controleert</p>
          <ol className="mt-6 space-y-5">
            {[
              ["01", "Welke eisen zijn belangrijk?"],
              ["02", "Welk CV-bewijs ondersteunt de geselecteerde eisen?"],
              ["03", "Wat is nog niet bevestigd?"],
              ["04", "Welke versie heeft de recruiter goedgekeurd?"],
            ].map(([number, question]) => (
              <li key={number} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-slate-700 pb-4 last:border-0 last:pb-0">
                <span className="font-mono text-sm font-black text-[var(--wk-highlight)]">{number}</span>
                <span className="font-extrabold leading-snug">{question}</span>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      <section className="wk-section border-y border-[var(--wk-border)]">
        <p className="wk-eyebrow">Waar het voorstelproces breekt</p>
        <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
          Een mooier document helpt niet wanneer de onderbouwing ontbreekt.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {frictionPoints.map((item, index) => (
            <article key={item.title} className="wk-card min-w-0 p-5">
              <span className="font-mono text-sm font-black text-[var(--wk-danger)]">0{index + 1}</span>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="werkwijze" className="wk-section scroll-mt-6">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="wk-eyebrow">WerkCV MatchPack</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Van bronbestand naar gecontroleerde snapshot.</h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">
              WerkCV bereidt het voorstel voor. De recruiter blijft verantwoordelijk voor bewijs, correcties, praktische gegevens en de beslissing om het document te delen.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {workflow.map(([number, title, body]) => (
              <article key={number} className="wk-card min-w-0 p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-[var(--wk-radius-sm)] bg-[var(--wk-accent)] text-sm font-black">{number}</span>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wk-section border-y border-[var(--wk-border)]">
        <p className="wk-eyebrow">Kies de juiste route</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Niet ieder bureauprobleem vraagt om MatchPack.</h2>
        <div className="mt-8 overflow-x-auto rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface)]">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="bg-[var(--wk-primary)] text-white">
              <tr><th className="p-4">Jouw situatie</th><th className="p-4">Passende route</th><th className="p-4">Wat je krijgt</th></tr>
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

      <section className="wk-section">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="wk-eyebrow">Kennisbank voor bureaus</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Gebruik de aanpak ook zonder software.</h2>
          </div>
          <Link href="/voor-bureaus/kennisbank" className="text-sm font-black text-emerald-800 underline decoration-2 underline-offset-4">
            Bekijk de hele kennisbank →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {agencyKnowledgeGuides.map((guide) => {
            const published = guide.status === "published";
            const content = (
              <article className={`wk-card h-full min-w-0 p-5 ${guide.theme === "emerald" ? "bg-[var(--wk-accent-soft)]" : guide.theme === "yellow" ? "bg-[var(--wk-highlight-soft)]" : "bg-[var(--wk-surface-subtle)]"}`}>
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

      <section className="wk-section border-y border-[var(--wk-border)]">
        <h2 className="text-3xl font-semibold tracking-[-0.04em]">Veelgestelde vragen</h2>
        <div className="mt-6 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="wk-card p-5">
              <summary className="cursor-pointer font-black">{faq.question}</summary>
              <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="wk-card wk-card-dark mt-12 min-w-0 p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="wk-eyebrow text-[var(--wk-highlight)]">Maak de onderbouwing zichtbaar</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-white">Geef je opdrachtgever minder zoekwerk en je recruiter meer controle.</h2>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-white/75">Bekijk eerst het fictieve voorstel. Start daarna MatchPack met de Agency-billing tier wanneer de werkwijze past.</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3">
            <AgencyContentLink href="/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld" path={path} location="hub_bottom" intent="sample" className="wk-button wk-button-secondary">
              Bekijk het volledige voorbeeld
            </AgencyContentLink>
            <AgencyContentLink href="/agency#plan" path={path} location="hub_bottom" intent="product" className="wk-button wk-button-primary">
              Bekijk MatchPack {monthlyPrice}
            </AgencyContentLink>
          </div>
        </div>
      </section>

      <p className="mt-5 text-center text-xs font-semibold text-[var(--wk-ink-muted)]"><Link href="/agency/privacy" className="text-[var(--wk-primary)] underline underline-offset-4">Privacy, retentie en DPA-informatie</Link></p>

      <FAQJsonLd questions={faqs} />
      <JsonLd data={webpageSchema} />
    </main>
    </div>
  );
}
