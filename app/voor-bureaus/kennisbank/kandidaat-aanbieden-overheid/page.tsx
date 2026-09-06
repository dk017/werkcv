import type { Metadata } from "next";
import Link from "next/link";
import { AgencyContentDownloadLink, AgencyContentLink, AgencyContentView } from "@/components/agency/AgencyContentAnalytics";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd, JsonLd } from "@/components/seo/JsonLd";
import { AGENCY_CONTENT_MODIFIED, AGENCY_CONTENT_PUBLISHED } from "@/lib/agency-content";
import { getAgencyAcquisitionRoute } from "@/lib/agency-acquisition";
import { agencyPublicSectorExample, type PublicSectorRequirementStatus, type PublicSectorRequirementType } from "@/lib/agency-public-sector-example";
import { getAgencyMonthlyPriceDisplay } from "@/lib/agency-plan";

const route = getAgencyAcquisitionRoute("/voor-bureaus/kennisbank/kandidaat-aanbieden-overheid")!;
const path = route.path;
const pageUrl = `https://werkcv.nl${path}`;
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

const statusLabel: Record<PublicSectorRequirementStatus, string> = {
  supported: "Ondersteund",
  partially_supported: "Gedeeltelijk ondersteund",
  unsupported: "Geen bewijs",
  contradicted: "Tegenstrijdig risico",
  confirmation_required: "Kandidaat bevestigen",
  not_checkable: "Niet controleerbaar",
};

const statusClass: Record<PublicSectorRequirementStatus, string> = {
  supported: "border-emerald-200 bg-emerald-50 text-emerald-900",
  partially_supported: "border-amber-200 bg-amber-50 text-amber-950",
  unsupported: "border-rose-200 bg-rose-50 text-rose-950",
  contradicted: "border-rose-200 bg-rose-50 text-rose-950",
  confirmation_required: "border-amber-200 bg-amber-50 text-amber-950",
  not_checkable: "border-slate-200 bg-slate-50 text-slate-800",
};

const typeLabels: Record<PublicSectorRequirementType, string> = {
  knock_out: "Knock-out eis",
  wish: "Wens",
  current_fact: "Actueel feit",
  competency: "Competentie",
  portal_rule: "Portaalregel",
};

const faqs = [
  {
    question: "Wat betekent ‘aantoonbaar’ bij een overheidsopdracht?",
    answer: "Een recruiter moet een eis kunnen verbinden aan een concreet, controleerbaar fragment uit een bevoegd aangeleverd CV of aan een afzonderlijk bevestigde actuele bron. Een los trefwoord of een aanname is geen bewijs.",
  },
  {
    question: "Is iedere vacature-eis een knock-out eis?",
    answer: "Nee. Classificeer eerst of een punt een harde knock-out eis, wens, actuele commerciële informatie, subjectieve competentie of specifieke portaalregel is. Volg altijd de tekst van de concrete opdracht.",
  },
  {
    question: "Mag beschikbaarheid uit het CV worden gehaald?",
    answer: "Niet automatisch. Beschikbaarheid, uren, tarief, opzegtermijn en locatievoorkeur zijn veranderlijke feiten. Vraag de kandidaat en label het antwoord apart als actuele bevestigde informatie.",
  },
  {
    question: "Garandeert deze checklist dat een opdrachtgever de kandidaat accepteert?",
    answer: "Nee. De matrix maakt bronrelaties en open punten zichtbaar. De recruiter blijft verantwoordelijk voor de inhoud, de actuele opdrachtregels en de beslissing om te delen.",
  },
];

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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://werkcv.nl/" },
    { "@type": "ListItem", position: 2, name: "Voor bureaus", item: "https://werkcv.nl/voor-bureaus" },
    { "@type": "ListItem", position: 3, name: "Kennisbank", item: "https://werkcv.nl/voor-bureaus/kennisbank" },
    { "@type": "ListItem", position: 4, name: route.h1, item: pageUrl },
  ],
};

export default function CandidateOfferGovernmentPage() {
  return (
    <div className="wk-agency-marketing">
      <main className="wk-container py-8">
        <AgencyContentView kind="public-sector-guide" path={path} />
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Voor bureaus", href: "/voor-bureaus" },
          { label: "Kennisbank", href: "/voor-bureaus/kennisbank" },
          { label: "Kandidaat aanbieden bij de overheid", href: path },
        ]} />

        <article>
          <header className="grid min-w-0 gap-8 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-end">
            <div className="min-w-0">
              <p className="wk-eyebrow">Kennisbank voor bureaus · publieke opdrachten</p>
              <h1 className="mt-5 break-words text-4xl font-black leading-[1.06] tracking-[-0.05em] sm:text-6xl">{route.h1}</h1>
              <p className="mt-6 max-w-3xl text-lg font-medium leading-relaxed text-[var(--wk-ink-muted)]">
                Bij een overheidsopdracht is een trefwoord in een CV niet genoeg. Leg iedere eis naast het exacte bronfragment, markeer wat ontbreekt of verandert en laat een recruiter de klantversie controleren vóór verzending.
              </p>
              <div className="mt-7 flex flex-wrap gap-3 text-xs font-bold text-[var(--wk-ink-muted)]">
                <span className="rounded-full border border-[var(--wk-warning)] bg-[var(--wk-warning-soft)] px-3 py-2">{agencyPublicSectorExample.notice}</span>
                <span className="rounded-full border border-[var(--wk-border)] bg-[var(--wk-surface)] px-3 py-2">Bijgewerkt 3 september 2026</span>
              </div>
              <div className="mt-7 flex min-w-0 flex-col gap-3 sm:flex-row">
                <AgencyContentLink href="/tools/kandidaatvoorstel-checker" path={path} location="public_sector_hero_checker" intent="product" className="wk-button wk-button-primary">Controleer een voorstel gratis</AgencyContentLink>
                <a href="#matrix" className="wk-button wk-button-secondary">Bekijk de eisenmatrix</a>
              </div>
            </div>
            <aside className="wk-card wk-card-dark min-w-0 p-6 sm:p-8">
              <p className="wk-eyebrow text-[var(--wk-highlight)]">Kort antwoord</p>
              <p className="mt-4 text-2xl font-black leading-tight text-white">Koppel eerst de eis aan bewijs. Schrijf daarna de klantclaim.</p>
              <p className="mt-4 text-sm font-medium leading-relaxed text-white/75">Een vacature geeft context voor de controle; zij bewijst niet dat een kandidaat aan de eis voldoet.</p>
            </aside>
          </header>

          <section className="wk-section border-y border-[var(--wk-border)]" aria-labelledby="classify-title">
            <p className="wk-eyebrow">1. Classificeer voordat je schrijft</p>
            <h2 id="classify-title" className="mt-4 max-w-4xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Niet ieder zinnetje uit een opdracht heeft dezelfde bewijsstandaard.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[
                ["Knock-out eis", "Moet volledig aantoonbaar zijn; maak een ontbrekend fragment zichtbaar."],
                ["Wens", "Een pluspunt dat je niet als harde voorwaarde mag presenteren."],
                ["Actueel feit", "Beschikbaarheid, uren, tarief of locatie: vraag de kandidaat."],
                ["Competentie", "Beschrijf gedrag met context; vermijd lege kwalificaties."],
                ["Portaalregel", "Volg de concrete opdrachtinstructie; regels zijn niet universeel."],
              ].map(([label, body]) => (
                <article key={label} className="wk-card min-w-0 p-5">
                  <h3 className="text-lg font-black">{label}</h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">{body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="wk-section" aria-labelledby="workflow-title">
            <p className="wk-eyebrow">2. Werk in deze volgorde</p>
            <h2 id="workflow-title" className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Van knock-out eis naar controleerbaar kandidaatvoorstel.</h2>
            <ol className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                ["Eisen exact overnemen", "Kopieer de actuele opdrachttekst en bewaar de bron en checked-on datum."],
                ["Bronfragment vinden", "Noteer pagina, sectie en de exacte zin uit het bevoegd aangeleverde CV."],
                ["Duur en toeschrijving controleren", "Controleer werkgever, project, periode, numerieke omvang en verantwoordelijkheidsniveau."],
                ["Open punten niet verbergen", "Gebruik geen aannames om een ontbrekende eis overtuigend te laten klinken."],
                ["Actuele feiten bevestigen", "Laat kandidaatbevestiging apart staan van CV-bewijs voor beschikbaarheid, tarief en uren."],
                ["Klantversie reviewen", "Controleer introductie, begeleidende e-mail, outputvariant en portaalregels vóór export."],
              ].map(([title, body], index) => (
                <li key={title} className="wk-card flex min-w-0 gap-4 p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--wk-radius-sm)] bg-[var(--wk-accent)] text-sm font-black">{String(index + 1).padStart(2, "0")}</span>
                  <div className="min-w-0"><h3 className="font-black">{title}</h3><p className="mt-2 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">{body}</p></div>
                </li>
              ))}
            </ol>
          </section>

          <section id="matrix" className="wk-section border-y border-[var(--wk-border)] scroll-mt-6" aria-labelledby="matrix-title">
            <p className="wk-card wk-card-warning mb-6 text-sm leading-relaxed">Deze handleiding beschrijft een handmatige, volledige eisencontrole. De automatische MatchPack-analyse is beperkter: {getAgencyReviewScopeNotice("nl")}</p>
            <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0"><p className="wk-eyebrow">3. Fictieve eisenmatrix</p><h2 id="matrix-title" className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Iedere claim heeft een status en volgende actie.</h2></div>
              <span className="shrink-0 rounded-full border border-[var(--wk-warning)] bg-[var(--wk-warning-soft)] px-3 py-2 text-xs font-black">Geen echte kandidaatdata</span>
            </div>
            <p className="mt-5 max-w-4xl text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">Dit is een complete fictieve submission voor {agencyPublicSectorExample.vacancy.organisation}. De statussen beschrijven alleen de relatie tussen claim en bron; ze zeggen niets over waarheid, geschiktheid of acceptatiekans.</p>
            <div className="mt-8 overflow-x-auto rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface)]">
              <table className="w-full min-w-[1180px] border-collapse text-left text-sm">
                <caption className="sr-only">Fictieve eisenmatrix voor een kandidaatvoorstel bij de overheid</caption>
                <thead className="bg-[var(--wk-primary)] text-white"><tr>{["Eis", "Type", "Klantclaim", "Exact CV-bewijs", "Bron", "Status", "Volgende actie"].map((label) => <th key={label} scope="col" className="p-4 text-xs font-extrabold uppercase tracking-[0.07em]">{label}</th>)}</tr></thead>
                <tbody>{agencyPublicSectorExample.requirements.map((item) => <tr key={item.id} className="border-t border-[var(--wk-border)] align-top"><th scope="row" className="w-[20%] p-4 font-black leading-relaxed">{item.requirement}</th><td className="p-4 font-bold text-[var(--wk-ink-muted)]">{typeLabels[item.type]}</td><td className="p-4 font-medium leading-relaxed">{item.clientClaim}</td><td className="p-4 leading-relaxed text-[var(--wk-ink-muted)]">{item.evidence}</td><td className="p-4 text-xs font-bold text-[var(--wk-ink-muted)]">{item.sourcePage === "—" ? item.sourceSection : `p. ${item.sourcePage} · ${item.sourceSection}`}</td><td className="p-4"><span className={`inline-flex rounded-full border px-3 py-2 text-xs font-black ${statusClass[item.status]}`}>{statusLabel[item.status]}</span><p className="mt-3 max-w-[18rem] text-xs font-medium leading-relaxed text-[var(--wk-ink-muted)]">{item.explanation}</p></td><td className="p-4 font-bold leading-relaxed">{item.disposition}</td></tr>)}</tbody>
              </table>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2"><AgencyContentDownloadLink href="/downloads/werkcv-eisenmatrix-kandidaat-aanbieden-overheid.docx" path={path} format="docx" className="wk-button wk-button-secondary">Download matrix als DOCX</AgencyContentDownloadLink><AgencyContentDownloadLink href="/downloads/werkcv-eisenmatrix-kandidaat-aanbieden-overheid.csv" path={path} format="csv" className="wk-button wk-button-secondary">Download matrix als CSV</AgencyContentDownloadLink></div>
          </section>

          <section className="wk-section" aria-labelledby="source-title">
            <p className="wk-eyebrow">4. Controleer de bron</p>
            <h2 id="source-title" className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Een bronverwijzing moet terug te vinden zijn.</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">{agencyPublicSectorExample.sourceSections.map((source) => <article key={source.id} className="wk-card min-w-0 p-5"><p className="text-xs font-black uppercase tracking-[0.12em] text-[var(--wk-primary)]">CV · pagina {source.page} · {source.section}</p><p className="mt-4 text-sm font-semibold leading-relaxed">“{source.text}”</p></article>)}</div>
            <p className="mt-6 max-w-4xl text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">Bij een echte review bewaart de workflow daarnaast een bron-digest en een exacte span. Een vacature mag de vraag verduidelijken, maar is nooit bewijs dat de kandidaat over een vaardigheid beschikt.</p>
          </section>

          <section className="wk-section border-y border-[var(--wk-border)]" aria-labelledby="submission-title">
            <p className="wk-eyebrow">5. Maak de klantversie</p>
            <h2 id="submission-title" className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Een volledige fictieve submission blijft eerlijk over open punten.</h2>
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <article className="wk-card wk-card-success min-w-0 p-6"><p className="wk-eyebrow">Klantintroductie</p><p className="mt-4 text-sm font-semibold leading-relaxed">{agencyPublicSectorExample.clientIntroduction}</p></article>
              <article className="wk-card wk-card-warning min-w-0 p-6"><p className="wk-eyebrow">Begeleidend e-mailfragment</p><p className="mt-4 whitespace-pre-line text-sm font-semibold leading-relaxed">{agencyPublicSectorExample.emailExcerpt}</p></article>
            </div>
            <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
              <article className="wk-card min-w-0 border-[var(--wk-primary)] bg-[var(--wk-accent-soft)] p-6" aria-labelledby="output-preview-title">
                <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="wk-eyebrow">6. Voorbeeld van de eindoutput</p><h3 id="output-preview-title" className="mt-3 text-2xl font-black tracking-[-0.03em]">{agencyPublicSectorExample.finalOutputPreview.selectedOutput}</h3></div><span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-900">Recruiter review vereist</span></div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2"><div className="rounded-[var(--wk-radius-sm)] border border-[var(--wk-border)] bg-[var(--wk-surface)] p-4"><p className="text-xs font-black uppercase tracking-[0.1em] text-[var(--wk-ink-muted)]">Ontvanger</p><p className="mt-2 font-black">{agencyPublicSectorExample.finalOutputPreview.recipient}</p></div><div className="rounded-[var(--wk-radius-sm)] border border-[var(--wk-border)] bg-[var(--wk-surface)] p-4"><p className="text-xs font-black uppercase tracking-[0.1em] text-[var(--wk-ink-muted)]">Vacature</p><p className="mt-2 font-black">{agencyPublicSectorExample.finalOutputPreview.vacancy}</p></div></div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="rounded-[var(--wk-radius-sm)] border border-emerald-200 bg-emerald-50 p-4"><p className="text-xs font-black uppercase tracking-[0.1em] text-emerald-900">Opgenomen</p><p className="mt-2 text-sm font-semibold leading-relaxed text-emerald-950">{agencyPublicSectorExample.finalOutputPreview.included}</p></div><div className="rounded-[var(--wk-radius-sm)] border border-amber-200 bg-amber-50 p-4"><p className="text-xs font-black uppercase tracking-[0.1em] text-amber-900">Open / niet als CV-feit</p><p className="mt-2 text-sm font-semibold leading-relaxed text-amber-950">{agencyPublicSectorExample.finalOutputPreview.notIncluded}</p></div></div>
                <div className="mt-5 flex flex-wrap gap-3" aria-label="Voorbeeldformaten"><span className="rounded-full border border-[var(--wk-border)] bg-[var(--wk-surface)] px-3 py-2 text-xs font-black">PDF · goedgekeurde snapshot</span><span className="rounded-full border border-[var(--wk-border)] bg-[var(--wk-surface)] px-3 py-2 text-xs font-black">DOCX · goedgekeurde snapshot</span></div>
                <p className="mt-4 text-xs font-medium leading-relaxed text-[var(--wk-ink-muted)]">De voorbeeldbestanden zijn fictieve illustraties. Controleer altijd dat je eigen PDF/DOCX, introductie en e-mail exact dezelfde goedgekeurde snapshot bevatten.</p>
              </article>
              <aside className="wk-card wk-card-dark min-w-0 p-6"><p className="wk-eyebrow text-[var(--wk-highlight)]">Wat deze preview niet doet</p><p className="mt-4 text-lg font-black leading-tight text-white">Geen ranking, waarheidsclaim of acceptatiegarantie.</p><p className="mt-3 text-sm font-medium leading-relaxed text-white/75">Een status zegt alleen hoe de claim aan de bron is gekoppeld. Recruiterreview en actuele kandidaatbevestiging blijven nodig voordat je deelt.</p></aside>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2"><article className="wk-card min-w-0 p-5"><h3 className="font-black">Veelgemaakte fouten</h3><ul className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]"><li>• Een wens herschrijven als harde ervaring.</li><li>• Een cursus aan de verkeerde cao of werkgever toeschrijven.</li><li>• “Zeven jaar” gebruiken zonder werkperiodes te controleren.</li><li>• Beschikbaarheid of tarief uit een oud CV afleiden.</li></ul></article><article className="wk-card min-w-0 p-5"><h3 className="font-black">Laatste pre-send checklist</h3><ul className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]"><li>□ Iedere knock-out eis heeft een bron of een zichtbaar open punt.</li><li>□ Getallen, data, werkgevers en projecten zijn gecontroleerd.</li><li>□ Actuele feiten zijn apart bevestigd.</li><li>□ Introductie, e-mail en PDF/DOCX zijn dezelfde snapshot.</li></ul></article></div>
          </section>

          <section className="wk-section" aria-labelledby="tool-title">
            <div className="wk-card wk-card-dark flex min-w-0 flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"><div className="min-w-0"><p className="wk-eyebrow text-[var(--wk-highlight)]">Maak de controle herhaalbaar</p><h2 id="tool-title" className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-white">Controleer eerst gratis. Bewaar en keur pas daarna goed.</h2><p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-white/75">De checker is een ungated kwaliteitshulp. MatchPack voegt de bewerkbare introductie, versiecontrole en goedgekeurde PDF/DOCX-export toe. Het vervangt je ATS niet en rangschikt geen kandidaten.</p></div><div className="flex shrink-0 flex-col gap-3"><AgencyContentLink href="/tools/kandidaatvoorstel-checker" path={path} location="public_sector_tool_bridge" intent="product" className="wk-button wk-button-secondary">Open de gratis checker</AgencyContentLink><AgencyContentLink href="/agency#plan" path={path} location="public_sector_matchpack_cta" intent="product" className="wk-button wk-button-primary">Start MatchPack · {monthlyPrice}</AgencyContentLink></div></div>
          </section>

          <section className="wk-section border-y border-[var(--wk-border)]" aria-labelledby="faq-title"><p className="wk-eyebrow">Veelgestelde vragen</p><h2 id="faq-title" className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Wat recruiters vaak willen weten.</h2><div className="mt-7 space-y-3">{faqs.map((faq) => <details key={faq.question} className="wk-card p-5"><summary className="cursor-pointer font-black">{faq.question}</summary><p className="mt-3 max-w-4xl text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">{faq.answer}</p></details>)}</div></section>

          <section className="wk-section" aria-labelledby="sources-title"><p className="wk-eyebrow">Bronnen en beperkingen</p><h2 id="sources-title" className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Gebruik altijd de actuele opdrachttekst.</h2><p className="mt-4 max-w-4xl text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">De voorbeelden hieronder laten zien dat Nederlandse overheids- en detacheringsopdrachten regelmatig om motivatie of bewijs per eis vragen. Ze zijn geen universele portaalregels, juridisch advies of garantie op acceptatie.</p><div className="mt-7 grid gap-4 md:grid-cols-2">{[
            ["OverheidZZP · Projectleider huisvesting", "Voorbeeld van knock-out criteria en uitleg per vereiste.", "https://overheidzzp.nl/vacatures/projectleider-huisvesting/"],
            ["SelectHR · Software Engineer Everest", "Voorbeeld waarin knock-out criteria in het CV moeten worden gemotiveerd.", "https://select.hr/opdrachten/001-kadaster-sa/software-engineer-everest/0e3e587f-fb15-4867-b43e-1091879a9dee"],
            ["Divetro · Adviseur onboarden", "Voorbeeld van bewijs, motivatie en actuele beschikbaarheidsinformatie.", "https://divetro.nl/vacature/inhuur-adviseur-onboarden/"],
            ["Opdracht Overheid · veelgestelde vragen", "Context over het lezen van actuele overheidsopdrachten.", "https://www.opdrachtoverheid.nl/veelgestelde-vragen/"],
          ].map(([label, note, href]) => <a key={href} href={href} target="_blank" rel="noreferrer" className="wk-card min-w-0 p-5 transition-colors hover:bg-[var(--wk-accent-soft)]"><h3 className="font-black text-[var(--wk-primary)] underline decoration-2 underline-offset-4">{label}</h3><p className="mt-3 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">{note}</p></a>)}</div></section>
        </article>
        <nav aria-label="Verder lezen" className="mt-10 flex flex-wrap gap-4 text-sm font-extrabold"><Link href="/voor-bureaus/kennisbank" className="text-[var(--wk-primary)] underline decoration-2 underline-offset-4">← Terug naar de kennisbank</Link><Link href="/voor-bureaus" className="text-[var(--wk-primary)] underline decoration-2 underline-offset-4">Bekijk WerkCV voor bureaus</Link></nav>
        <FAQJsonLd questions={faqs} />
        <JsonLd data={articleSchema} />
        <JsonLd data={breadcrumbSchema} />
      </main>
    </div>
  );
}
import { getAgencyReviewScopeNotice } from "@/lib/agency-review-scope";
