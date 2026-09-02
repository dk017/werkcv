import Link from "next/link";
import { claimEvidenceBenchmarkReleaseReady } from "@/lib/benchmark/claim-evidence-release-gate";
import { publicClaimEvidenceBenchmarkV1Checksum } from "@/lib/benchmark/claim-evidence-public-v1";

const thresholds = [
  ["Citation resolution validity", "100%"],
  ["Unsupported/contradicted catch recall", "≥ 90%"],
  ["Severe false alarms on supported claims", "≤ 5%"],
  ["Macro-F1", "≥ 0.80"],
  ["Current-fact confirmation recall", "≥ 90%"],
  ["Repeated-run verdict stability", "≥ 95%"],
] as const;

const sources = [
  { label: "NIST AI RMF — Measure", href: "https://airc.nist.gov/airmf-resources/playbook/measure/" },
  { label: "Google Dataset structured data", href: "https://developers.google.com/search/docs/appearance/structured-data/dataset" },
  { label: "FactCC factual consistency research", href: "https://aclanthology.org/2020.emnlp-main.750/" },
  { label: "FENICE factuality evaluation", href: "https://aclanthology.org/2024.findings-acl.841/" },
] as const;

export default function ClaimEvidenceMethodology({ locale }: { locale: "nl" | "en" }) {
  const published = claimEvidenceBenchmarkReleaseReady();
  const nl = locale === "nl";
  const toolUrl = nl ? "/tools/kandidaatvoorstel-checker" : "/en/candidate-proposal-checker";
  const datasetJsonLd = published ? {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "WerkCV Claim–Evidence Benchmark v1",
    version: "1.0.0",
    creator: { "@type": "Organization", name: "WerkCV", url: "https://werkcv.nl" },
    license: "https://creativecommons.org/licenses/by/4.0/",
    inLanguage: ["nl", "en"],
    description: "An independently reviewed, fictional bilingual dataset for evaluating whether atomic candidate-proposal claims are supported by CV source spans.",
    distribution: ["jsonl", "csv"].map((format) => ({
      "@type": "DataDownload",
      encodingFormat: format === "csv" ? "text/csv" : "application/x-ndjson",
      contentUrl: `https://werkcv.nl/api/benchmark/claim-evidence-v1?format=${format}`,
    })),
  } : null;

  return (
    <main className="wk-page-shell overflow-hidden">
      {datasetJsonLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd).replace(/</g, "\\u003c") }} /> : null}
      <section className="relative border-b border-[var(--wk-border)] bg-[radial-gradient(circle_at_12%_16%,rgba(255,224,122,0.55),transparent_28%),radial-gradient(circle_at_86%_18%,rgba(78,205,196,0.2),transparent_30%),var(--wk-surface)]">
        <div className="wk-container wk-content-wrap py-14 sm:py-20 lg:py-24">
          <div className="max-w-4xl">
            <p className="wk-eyebrow">WerkCV Claim–Evidence Benchmark v1</p>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">{nl ? "Zo toetsen we of voorstelclaims naar echte CV-bronnen terugwijzen." : "How we test whether proposal claims trace back to real CV sources."}</h1>
            <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-[var(--wk-ink-muted)]">{nl ? "Deze methode meet bronondersteuning. Zij bewijst niet dat een kandidaat objectief de waarheid spreekt, geschikt is voor een functie of juridisch geïdentificeerd is." : "This methodology measures source support. It does not establish candidate truthfulness, job suitability or legal identity."}</p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-[var(--wk-ink-muted)]">
              <span className="rounded-full border border-[var(--wk-border)] bg-white/80 px-4 py-2">{nl ? "Auteur: WerkCV productteam" : "Author: WerkCV product team"}</span>
              <span className="rounded-full border border-[var(--wk-border)] bg-white/80 px-4 py-2">{nl ? "Laatst bijgewerkt: 1 september 2026" : "Last updated: 1 September 2026"}</span>
              <span className="rounded-full border border-amber-300 bg-amber-50 px-4 py-2 text-amber-900">{published ? (nl ? "Onafhankelijk beoordeeld" : "Independently reviewed") : (nl ? "Onafhankelijke review open" : "Independent review pending")}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="wk-section">
        <div className="wk-container space-y-6">
          <article className="rounded-[var(--wk-radius-lg)] border border-amber-300 bg-amber-50 p-6 shadow-[var(--wk-shadow-sm)] sm:p-8">
            <p className="wk-eyebrow text-amber-900">{published ? (nl ? "Vrijgegeven versie" : "Released version") : (nl ? "Huidige status" : "Current status")}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">{published ? (nl ? "De beoordeelde transparantieset is beschikbaar." : "The reviewed transparency set is available.") : (nl ? "Er staat nog geen prestatiescore op deze pagina." : "No performance score is published on this page yet.")}</h2>
            <p className="mt-4 max-w-4xl font-medium leading-7 text-[var(--wk-ink-muted)]">{published ? (nl ? "De download bevat alleen de onafhankelijk beoordeelde openbare set. De private holdout blijft buiten publieke applicatiebestanden." : "The download contains only the independently reviewed public set. The private holdout remains outside public application assets.") : (nl ? "De 60 fictieve openbare conceptcases en evaluatiecode zijn technisch voorbereid. De vereiste onafhankelijke tweetalige review, overeenstemmingsmeting en adjudicatie zijn nog niet afgerond. Daarom blijven downloads en nauwkeurigheidsclaims gesloten." : "The 60 fictional public draft cases and evaluation code are technically prepared. Required independent bilingual review, agreement measurement and adjudication are incomplete, so downloads and accuracy claims remain closed.")}</p>
          </article>

          <div className="grid gap-6 lg:grid-cols-2">
            <article className="wk-card">
              <p className="wk-eyebrow">01 · Dataset</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">{nl ? "Wat iedere case vastlegt" : "What every case records"}</h2>
              <ul className="mt-6 space-y-3 font-medium leading-7 text-[var(--wk-ink-muted)]">
                <li>• {nl ? "Exacte claimspan in het voorstel" : "Exact proposal claim span"}</li>
                <li>• {nl ? "Verwacht oordeel en geaccepteerde bronspan, of expliciete afwezigheid" : "Expected verdict and accepted source span, or explicit absence"}</li>
                <li>• {nl ? "Foutcategorie, annotatiereden, bronversie en SHA-256-checksum" : "Error category, annotation rationale, source version and SHA-256 checksum"}</li>
                <li>• {nl ? "30 Nederlandse en 30 Engelse openbare cases" : "30 Dutch and 30 English public cases"}</li>
                <li>• {nl ? "Tien beroepsfamilies, meerdere senioriteitsniveaus en alle zes oordelen" : "Ten occupational families, multiple seniority levels and all six verdicts"}</li>
              </ul>
            </article>
            <article className="wk-card bg-[var(--wk-highlight-soft)]">
              <p className="wk-eyebrow">02 · Holdout</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">{nl ? "Moeilijke cases blijven privé en onveranderd." : "Difficult cases remain private and unchanged."}</h2>
              <p className="mt-5 font-medium leading-7 text-[var(--wk-ink-muted)]">{nl ? "Een aparte set van 40 fictieve cases—20 Nederlands en 20 Engels—wordt alleen via een extern pad en goedgekeurde checksum geladen. De cases staan niet in publieke assets of downloads. Ontbreekt het bestand of wijkt de checksum af, dan stopt de evaluatie." : "A separate set of 40 fictional cases—20 Dutch and 20 English—is loaded only from an external path with an approved checksum. The cases are not stored in public assets or downloads. A missing file or checksum mismatch stops evaluation."}</p>
            </article>
          </div>

          <article className="wk-card">
            <p className="wk-eyebrow">03 · {nl ? "Meetprotocol" : "Evaluation protocol"}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">{nl ? "Drie vastgezette runs, zichtbare drempels." : "Three pinned runs, visible thresholds."}</h2>
            <p className="mt-4 max-w-4xl font-medium leading-7 text-[var(--wk-ink-muted)]">{nl ? "Iedere case wordt drie keer uitgevoerd met vastgelegde applicatiecommit, parser, model, prompt, temperatuur en bronchecksums. Resultaten worden per taal en bestandstype uitgesplitst; bootstrap-intervallen en mislukte voorbeelden horen bij het verslag." : "Every case is run three times with a pinned application commit, parser, model, prompt, temperature and source checksums. Results are separated by language and file type; bootstrap intervals and failed examples belong in the report."}</p>
            <div className="mt-7 overflow-x-auto">
              <table className="min-w-[620px] w-full border-collapse text-left text-sm">
                <thead><tr className="border-b border-[var(--wk-border-strong)]"><th className="px-3 py-3 font-semibold">{nl ? "Maatstaf" : "Measure"}</th><th className="px-3 py-3 font-semibold">{nl ? "Publicatiedrempel" : "Publication threshold"}</th></tr></thead>
                <tbody>{thresholds.map(([name, threshold]) => <tr className="border-b border-[var(--wk-border)]" key={name}><td className="px-3 py-4 font-medium">{name}</td><td className="px-3 py-4 font-semibold">{threshold}</td></tr>)}</tbody>
              </table>
            </div>
            <p className="mt-5 text-sm font-medium leading-6 text-[var(--wk-ink-muted)]">{nl ? "Een mislukte drempel wordt gerapporteerd als beperking; moeilijke cases worden niet verwijderd om een score te verhogen." : "A failed threshold is reported as a limitation; difficult cases are not removed to improve a score."}</p>
          </article>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="wk-card">
              <p className="wk-eyebrow">04 · {nl ? "Menselijke beoordeling" : "Human review"}</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">{nl ? "Publicatie vereist een onafhankelijke tweetalige reviewer." : "Publication requires an independent bilingual reviewer."}</h2>
              <p className="mt-5 font-medium leading-7 text-[var(--wk-ink-muted)]">{nl ? "De reviewer moet ervaring hebben met kandidaatvoorstellen voor recruitmentbureaus. Credentials en belangenconflicten worden vastgelegd. Meningsverschillen worden gedocumenteerd en geadjudiceerd; onopgeloste verschillen krijgen een tweede specialist." : "The reviewer must have recruitment-agency candidate-submission experience. Credentials and conflicts are recorded. Disagreements are documented and adjudicated; unresolved cases receive a second specialist opinion."}</p>
              <p className="mt-4 text-sm font-semibold text-amber-900">{published ? (nl ? "Reviewrecord goedgekeurd voor deze release." : "Review record approved for this release.") : (nl ? "Reviewer nog niet gepubliceerd; deze externe poort staat open." : "Reviewer not yet published; this external gate remains open.")}</p>
            </article>
            <aside className="wk-card bg-[var(--wk-surface-muted)]">
              <p className="wk-eyebrow">{nl ? "Reproduceerbaarheid" : "Reproducibility"}</p>
              <p className="mt-4 text-sm font-semibold">Public draft SHA-256</p>
              <code className="mt-2 block break-all rounded-xl bg-white p-3 text-xs leading-5">{publicClaimEvidenceBenchmarkV1Checksum}</code>
              <p className="mt-4 text-sm font-medium text-[var(--wk-ink-muted)]">{nl ? "Laatst technisch geëvalueerd: nog niet voor publicatie." : "Last technically evaluated: not yet for publication."}</p>
              {published ? <div className="mt-5 flex flex-wrap gap-3"><a className="wk-button wk-button-secondary" href="/api/benchmark/claim-evidence-v1?format=jsonl">JSONL</a><a className="wk-button wk-button-secondary" href="/api/benchmark/claim-evidence-v1?format=csv">CSV</a></div> : null}
            </aside>
          </div>

          <article className="wk-card">
            <p className="wk-eyebrow">{nl ? "Bronnen voor de methode" : "Method sources"}</p>
            <p className="mt-4 max-w-4xl font-medium leading-7 text-[var(--wk-ink-muted)]">{nl ? "Deze bronnen ondersteunen de keuze voor herhaalbare evaluatie, bronspannen en transparante publicatie. Ze bewijzen geen productprestatie; die moet uit de beschreven review en evaluatie komen." : "These sources support repeatable evaluation, source-span checking and transparent publication. They do not prove product performance; that evidence must come from the review and evaluation described above."}</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">{sources.map((source) => <li key={source.href}><a className="inline-flex font-semibold text-[var(--wk-accent-strong)] underline decoration-2 underline-offset-4" href={source.href} rel="noreferrer" target="_blank">{source.label} ↗</a></li>)}</ul>
          </article>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link className="wk-button wk-button-primary" href={toolUrl}>{nl ? "Open de gratis claimchecker" : "Open the free claim verifier"}</Link>
            <Link className="wk-button wk-button-secondary" href={nl ? "/agency" : "/en/agency"}>{nl ? "Bekijk MatchPack" : "See MatchPack"}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
