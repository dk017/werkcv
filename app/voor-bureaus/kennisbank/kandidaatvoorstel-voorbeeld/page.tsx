import type { Metadata } from "next";
import Link from "next/link";
import { AgencyContentLink, AgencyContentView } from "@/components/agency/AgencyContentAnalytics";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd, JsonLd } from "@/components/seo/JsonLd";
import AgencyCheckoutButton from "@/components/agency/AgencyCheckoutButton";
import { agencyFictionalExample, fictionalExampleSourceDigest } from "@/lib/agency-fictional-example";
import { getAgencyAcquisitionRoute } from "@/lib/agency-acquisition";
import { AGENCY_MONTHLY_CREDIT_LIMIT, getAgencyMonthlyPriceDisplay } from "@/lib/agency-plan";
import { AGENCY_CONTENT_MODIFIED, AGENCY_CONTENT_PUBLISHED } from "@/lib/agency-content";
import { isAgencyDodoConfigured } from "@/lib/dodo";

const route = getAgencyAcquisitionRoute("/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld")!;
const pageUrl = `https://werkcv.nl${route.path}`;
const monthlyPrice = getAgencyMonthlyPriceDisplay("nl");

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: route.title,
    description: route.description,
    url: pageUrl,
    type: "article",
    locale: "nl_NL",
  },
};

const statusLabel: Record<(typeof agencyFictionalExample.evidence)[number]["status"], string> = {
  supported: "Ondersteund",
  partially_supported: "Gedeeltelijk ondersteund",
  confirmation_required: "Kandidaat bevestigen",
  unsupported: "Niet ondersteund",
};

const statusClass: Record<(typeof agencyFictionalExample.evidence)[number]["status"], string> = {
  supported: "border-emerald-200 bg-emerald-50 text-emerald-900",
  partially_supported: "border-amber-200 bg-amber-50 text-amber-950",
  confirmation_required: "border-amber-200 bg-amber-50 text-amber-950",
  unsupported: "border-rose-200 bg-rose-50 text-rose-950",
};

const faqs = [
  {
    question: "Is dit een echt kandidaatvoorstel?",
    answer: "Nee. Nina de Vries, Stadshaven Zorggroep, de vacature en alle CV-inhoud zijn volledig fictief en bedoeld om de reviewlogica te laten zien.",
  },
  {
    question: "Betekent ‘ondersteund’ dat de kandidaat geschikt is?",
    answer: "Nee. Ondersteund betekent alleen dat het weergegeven CV-fragment de specifieke claim inhoudelijk ondersteunt. De recruiter blijft verantwoordelijk voor beoordeling en besluitvorming.",
  },
  {
    question: "Waarom staat beschikbaarheid niet als CV-bewijs?",
    answer: "Beschikbaarheid is veranderlijke informatie. In dit voorbeeld staat zij daarom als kandidaatbevestiging en niet als feit dat uit het CV volgt.",
  },
  {
    question: "Kan ik dit voorbeeld als klantdocument gebruiken?",
    answer: "Nee. Gebruik het uitsluitend als uitleg en testfixture. Een echte klantversie hoort uit een bevoegd aangeleverd CV, een echte vacature, recruiterreview en een gecontroleerde snapshot te komen.",
  },
];

function CheckoutCta() {
  if (!isAgencyDodoConfigured()) {
    return <Link href="/agency#plan" className="wk-button wk-button-primary">Bekijk MatchPack · Agency</Link>;
  }

  return <AgencyCheckoutButton locale="nl" location="agency_example_bottom" label={`Start MatchPack · ${monthlyPrice}`} className="wk-button wk-button-primary" />;
}

export default function CandidateProposalExamplePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: route.title,
    description: route.description,
    url: pageUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    author: { "@id": "https://werkcv.nl/#organization" },
    publisher: { "@id": "https://werkcv.nl/#organization" },
    datePublished: AGENCY_CONTENT_PUBLISHED,
    dateModified: AGENCY_CONTENT_MODIFIED,
    inLanguage: "nl-NL",
    isAccessibleForFree: true,
  };

  return (
    <div className="wk-agency-marketing">
      <main className="wk-container py-8">
        <AgencyContentView kind="example" path={route.path} slug="kandidaatvoorstel-voorbeeld" />
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Voor bureaus", href: "/voor-bureaus" }, { label: "Kennisbank", href: "/voor-bureaus/kennisbank" }, { label: "Kandidaatvoorstel voorbeeld", href: route.path }]} />

        <header className="grid min-w-0 gap-8 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end">
          <div className="min-w-0">
            <p className="wk-eyebrow">Kennisbank · uitgewerkt voorbeeld</p>
            <h1 className="mt-5 break-words text-4xl font-black leading-[1.06] tracking-[-0.05em] sm:text-6xl">{route.h1}</h1>
            <p className="mt-6 max-w-3xl text-lg font-medium leading-relaxed text-[var(--wk-ink-muted)]">Bekijk hoe je een klantintroductie opbouwt wanneer iedere belangrijke bewering aan CV-bewijs, recruiterbeoordeling of kandidaatbevestiging moet kunnen worden gekoppeld.</p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold text-slate-600">
              <span className="rounded-full border border-[var(--wk-warning)] bg-[var(--wk-warning-soft)] px-3 py-2">{agencyFictionalExample.notice}</span>
              <span className="rounded-full border border-[var(--wk-border)] bg-[var(--wk-surface)] px-3 py-2">Bronfixture: {fictionalExampleSourceDigest}</span>
            </div>
          </div>
          <aside className="wk-card wk-card-dark min-w-0 p-6 sm:p-8">
            <p className="wk-eyebrow text-[var(--wk-highlight)]">Lees dit als recruiter</p>
            <p className="mt-4 text-2xl font-black leading-tight text-white">Een status beschrijft de bronrelatie, niet de waarheid of geschiktheid van een kandidaat.</p>
            <p className="mt-4 text-sm font-medium leading-relaxed text-white/75">Open punten blijven zichtbaar totdat een bevoegd persoon ze controleert.</p>
          </aside>
        </header>

        <section className="wk-section border-y border-[var(--wk-border)]" aria-labelledby="vacancy-title">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="wk-eyebrow">1. Vacaturecontext</p>
              <h2 id="vacancy-title" className="mt-4 text-3xl font-semibold tracking-[-0.04em]">{agencyFictionalExample.vacancy.title}</h2>
              <p className="mt-2 text-sm font-bold text-slate-500">{agencyFictionalExample.vacancy.organisation} · volledig fictief</p>
              <p className="mt-5 text-sm leading-relaxed text-slate-700">{agencyFictionalExample.vacancy.context}</p>
            </div>
            <div className="wk-card wk-card-warning min-w-0 p-6">
              <p className="wk-eyebrow">Relevante vraag uit de vacature</p>
              <p className="mt-3 text-xl font-black leading-snug">{agencyFictionalExample.vacancy.requirementSummary}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">De vacature geeft context voor de controle. Zij is geen bewijs dat Nina over de genoemde ervaring beschikt.</p>
            </div>
          </div>
        </section>

        <section className="wk-section" aria-labelledby="source-title">
          <p className="wk-eyebrow">2. Bron-CV</p>
          <h2 id="source-title" className="mt-4 text-3xl font-semibold tracking-[-0.04em]">De passages waar de review naar terugverwijst.</h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-600">De labels zijn stabiele sectieverwijzingen uit deze fictieve fixture. Een echte MatchPack-revisie bewaart daarnaast de bron-digest en exacte locatie van het aangeleverde bestand.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {agencyFictionalExample.sourceSections.map((source) => (
              <article key={source.id} className="wk-card min-w-0 p-5">
                <p className="wk-eyebrow">{source.label}</p>
                <p className="mt-2 text-xs font-bold text-slate-500">{source.location}</p>
                <blockquote className="mt-4 border-l-4 border-emerald-400 pl-4 text-sm font-semibold leading-relaxed text-slate-800">“{source.snippet}”</blockquote>
              </article>
            ))}
          </div>
        </section>

        <section className="wk-section border-y border-[var(--wk-border)]" aria-labelledby="claims-title">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="wk-eyebrow">3. Claim review</p>
              <h2 id="claims-title" className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Elke claim krijgt een bronrelatie en een vervolgstap.</h2>
            </div>
            <span className="w-fit rounded-full border border-[var(--wk-border)] bg-[var(--wk-surface)] px-3 py-2 text-xs font-extrabold text-[var(--wk-ink-muted)]">Geen matchscore · geen ranking</span>
          </div>
          <div className="mt-8 space-y-4">
            {agencyFictionalExample.evidence.map((claim) => (
              <article key={claim.id} className="wk-card min-w-0 p-5 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0"><p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Klantclaim</p><h3 className="mt-2 break-words text-lg font-black">{claim.requirement}</h3></div>
                  <span className={`w-fit shrink-0 rounded-full border px-3 py-1.5 text-xs font-black ${statusClass[claim.status]}`}>{statusLabel[claim.status]}</span>
                </div>
                <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1fr]">
                  <div className="min-w-0"><p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Bron</p><p className="mt-2 text-xs font-bold text-slate-600">{claim.sourceLocation}</p>{claim.sourceSnippet ? <blockquote className="mt-3 border-l-4 border-slate-300 pl-4 text-sm leading-relaxed text-slate-800">“{claim.sourceSnippet}”</blockquote> : <p className="mt-3 border-l-4 border-amber-300 pl-4 text-sm font-semibold leading-relaxed text-amber-950">Geen passende bronpassage in het fictieve CV.</p>}</div>
                  <div className="min-w-0"><p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Uitleg en actie</p><p className="mt-3 text-sm leading-relaxed text-slate-700">{claim.explanation}</p><p className="mt-3 rounded-[var(--wk-radius-sm,10px)] bg-[var(--wk-surface-subtle,#f4f7f5)] p-3 text-sm font-bold text-slate-800">Volgende stap: {claim.nextAction}</p></div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="wk-section" aria-labelledby="output-title">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="wk-eyebrow">4. Recruiterdispositie</p>
              <h2 id="output-title" className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Wat gaat wel en niet naar de klant?</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">De recruiter behoudt de beslissing. In deze fictieve versie blijven AFAS, Power BI en de startdatum open totdat ze door de juiste persoon zijn gecontroleerd. Niet-ondersteunde claims worden verwijderd of handmatig beoordeeld.</p>
              <ul className="mt-6 space-y-3 text-sm font-semibold text-slate-700"><li className="flex gap-3"><span className="font-black text-emerald-700">✓</span>Ondersteunde CV-claims kunnen in de introductie worden gebruikt.</li><li className="flex gap-3"><span className="font-black text-amber-700">!</span>Gedeeltelijke claims krijgen een expliciete beperking.</li><li className="flex gap-3"><span className="font-black text-rose-700">×</span>Niet-ondersteunde claims worden niet als kandidaatfeit gedeeld.</li></ul>
            </div>
            <div className="wk-card wk-card-accent p-6">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--wk-primary)]">Goedgekeurde klantintroductie · fictief</p>
              <p className="mt-4 text-base font-semibold leading-relaxed text-slate-800">“{agencyFictionalExample.recruiterIntroduction}”</p>
              <p className="mt-5 text-xs leading-relaxed text-slate-500">De tekst noemt beperkingen waar bewijs of bevestiging ontbreekt. Een echte recruiter moet deze versie opnieuw controleren vóór delen.</p>
            </div>
          </div>
        </section>

        <section className="wk-section border-y border-[var(--wk-border)]" aria-labelledby="email-title">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div><p className="wk-eyebrow">5. Begeleidende e-mail</p><h2 id="email-title" className="mt-4 text-3xl font-semibold tracking-[-0.04em]">De klantmail herhaalt niet meer dan het bewijs draagt.</h2><p className="mt-4 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">De mail noemt de rol, de relevante bronrelatie en de open punten. Recruiternotities en interne hypotheses blijven buiten het klantbericht.</p></div>
            <div className="wk-card p-6"><p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">{agencyFictionalExample.clientEmail.subject}</p><p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-700">{agencyFictionalExample.clientEmail.body}</p></div>
          </div>
        </section>

        <section className="wk-section" aria-labelledby="outputs-title">
          <p className="wk-eyebrow">6. Outputcontrole</p>
          <h2 id="outputs-title" className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Eén goedgekeurde snapshot, twee mogelijke klantvarianten.</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <article className="wk-card wk-card-success p-5"><h3 className="text-xl font-black">Volledig voorstel</h3><p className="mt-3 text-sm leading-relaxed text-slate-700">De volledige gekozen CV-inhoud, introductie en bevestigde voorstelgegevens uit dezelfde goedgekeurde snapshot.</p><p className="mt-4 text-xs font-bold text-slate-500">PDF en DOCX wanneer de Agency-output beschikbaar is.</p></article>
            <article className="wk-card wk-card-warning p-5"><h3 className="text-xl font-black">Zonder directe contactgegevens</h3><p className="mt-3 text-sm leading-relaxed text-slate-700">Bekende directe velden kunnen worden verwijderd. Werkgevers, scholen, projecten en tekstfragmenten kunnen nog herkenbaar zijn.</p><p className="mt-4 text-xs font-bold text-slate-500">Controleer het echte bestand; dit is geen juridische anonimiteitsgarantie.</p></article>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-slate-600">{agencyFictionalExample.outputNote}</p>
        </section>

        <section className="wk-card wk-card-dark min-w-0 p-6 sm:p-8">
          <div className="flex min-w-0 flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><p className="wk-eyebrow text-[var(--wk-highlight)]">Zelf controleren</p><h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-white">Gebruik dit patroon op je eigen kandidaatvoorstel.</h2><p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-white/75">Start met de gratis checker voor een eerste bewijscontrole of bekijk de volledige MatchPack-workflow.</p></div><div className="flex shrink-0 flex-col gap-3"><AgencyContentLink href="/tools/kandidaatvoorstel-checker" path={route.path} location="example_bottom" intent="sample" className="wk-button wk-button-secondary">Start gratis bewijscontrole</AgencyContentLink><CheckoutCta /></div></div>
        </section>

        <section className="wk-section border-y border-[var(--wk-border)]"><p className="wk-eyebrow">FAQ</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Veelgestelde vragen</h2><div className="mt-7 space-y-3">{faqs.map((faq) => <details key={faq.question} className="wk-card p-5"><summary className="cursor-pointer font-semibold">{faq.question}</summary><p className="mt-3 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">{faq.answer}</p></details>)}</div></section>

        <nav aria-label="Verder lezen" className="mt-10 flex flex-wrap gap-4 text-sm font-extrabold"><Link href="/voor-bureaus/kennisbank" className="text-[var(--wk-primary)] underline decoration-2 underline-offset-4">← Terug naar de kennisbank</Link><Link href="/voor-bureaus/kennisbank/kandidaat-voorstellen-opdrachtgever" className="text-[var(--wk-primary)] underline decoration-2 underline-offset-4">Lees de checklist</Link></nav>
        <p className="mt-6 text-xs font-medium leading-relaxed text-[var(--wk-ink-muted)]">Prijscontext: de Agency-billing tier is momenteel {monthlyPrice} voor {AGENCY_MONTHLY_CREDIT_LIMIT} gedeelde CV-credits. Dit voorbeeld is volledig gratis en gebruikt geen echte kandidaatdata.</p>
        <FAQJsonLd questions={faqs} />
        <JsonLd data={articleSchema} />
      </main>
    </div>
  );
}
