"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import type { ProposalClaimVerificationV1 } from "@/lib/tools/proposal-claim-verifier-schema";

type Locale = "nl" | "en";
type InputMode = "text" | "file";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(["pdf", "doc", "docx"]);

function sample(locale: Locale) {
  if (locale === "en") return {
    cv: `Maya de Vries\nSenior HR Adviser | Utrecht\n\nPROFILE\nHR adviser with seven years of experience in healthcare and professional services.\n\nEXPERIENCE\nSenior HR Adviser — Noordlicht Services | 2021–present\nAdvised 18 team leaders on absence, performance and organisational change.\nManaged complex absence cases under Dutch reintegration legislation.\nBuilt monthly HR reports in Excel and supported one reorganisation.\n\nHR Adviser — Horizon Care | 2019–2021\nAdvised managers and trained them in absence conversations.\n\nEDUCATION\nBSc Human Resource Management — HU University of Applied Sciences.\n\nSKILLS\nEmployment law, absence management, Excel, Dutch (native), English (B2).`,
    proposal: `Maya is a senior HR adviser with seven years of relevant experience. She has advised more than twenty team leaders and independently configured AFAS workflows. She built executive Power BI dashboards and led three reorganisations. Maya is available from 1 October for 36 hours per week and expects a salary of €5,800. We consider her a pragmatic adviser who will fit the client team well.`,
    vacancy: `Senior HR adviser. Required: five years of HR advisory experience, complex absence cases, AFAS workflow configuration, Power BI and experience advising at least twenty managers.`,
  };
  return {
    cv: `Maya de Vries\nSenior HR-adviseur | Utrecht\n\nPROFIEL\nHR-adviseur met zeven jaar ervaring binnen zorg en zakelijke dienstverlening.\n\nWERKERVARING\nSenior HR-adviseur — Noordlicht Services | 2021–heden\nAdviseerde 18 teamleiders over verzuim, functioneren en organisatieverandering.\nBehandelde complexe verzuimdossiers volgens de Wet verbetering poortwachter.\nBouwde maandelijkse HR-rapportages in Excel en ondersteunde één reorganisatie.\n\nHR-adviseur — Horizon Zorg | 2019–2021\nAdviseerde managers en trainde hen in verzuimgesprekken.\n\nOPLEIDING\nHbo Human Resource Management — Hogeschool Utrecht.\n\nVAARDIGHEDEN\nArbeidsrecht, verzuim, Excel, Nederlands (moedertaal), Engels (B2).`,
    proposal: `Maya is een senior HR-adviseur met zeven jaar relevante ervaring. Zij heeft meer dan twintig teamleiders geadviseerd en zelfstandig AFAS-workflows ingericht. Zij bouwde Power BI-dashboards voor de directie en leidde drie reorganisaties. Maya is vanaf 1 oktober beschikbaar voor 36 uur per week en verwacht een salaris van €5.800. Wij zien haar als een pragmatische adviseur die goed bij het klantteam zal passen.`,
    vacancy: `Senior HR-adviseur. Vereist: vijf jaar advieservaring, complexe verzuimdossiers, AFAS-workflows, Power BI en ervaring met minimaal twintig leidinggevenden.`,
  };
}

function copy(locale: Locale) {
  const en = locale === "en";
  return {
     title: en ? "Check candidate-proposal claims against CV evidence" : "Controleer CV-bewijs vóór je een kandidaatvoorstel verstuurt",
    intro: en
      ? "Compare a candidate proposal with the original CV. WerkCV shows which claims have exact support, which need correction and which require current candidate confirmation."
      : "Vergelijk een kandidaatvoorstel met het originele CV. WerkCV toont welke claims exact zijn onderbouwd, welke moeten worden gecorrigeerd en welke actuele kandidaatbevestiging vereisen.",
    back: en ? "Agency" : "Voor bureaus",
    context: en ? "Proposal Claim Verifier" : "Voorstel Claim Verifier",
    modeClaims: en ? "Proposal claims vs CV" : "Voorstelclaims vs CV",
    modeRequirements: en ? "Vacancy requirements vs CV" : "Vacature-eisen vs CV",
    badge: en ? "Free · no account" : "Gratis · geen account",
    sourceTitle: en ? "Source documents" : "Brondocumenten",
    cvLabel: en ? "Candidate CV" : "Kandidaat-CV",
    proposalLabel: en ? "Client-facing proposal or introduction" : "Klantvoorstel of introductie",
    vacancyLabel: en ? "Vacancy text (optional context)" : "Vacaturetekst (optionele context)",
    paste: en ? "Paste text" : "Tekst plakken",
    upload: en ? "Upload file" : "Bestand uploaden",
    sample: en ? "Load a transparent sample" : "Laad een transparant voorbeeld",
    reset: en ? "Reset" : "Wissen",
    submit: en ? "Verify proposal claims" : "Controleer voorstelclaims",
    loading: en ? "Checking exact source support…" : "Exact bronbewijs controleren…",
    privacy: en
      ? "Inputs are processed for this check and are not saved in the WerkCV database. Do not use a CV without authority."
      : "Invoer wordt voor deze controle verwerkt en niet opgeslagen in de WerkCV-database. Gebruik geen CV zonder bevoegdheid.",
    error: en ? "The check could not be completed." : "De controle kon niet worden voltooid.",
    resultTitle: en ? "Claim-by-claim source check" : "Broncontrole per voorstelclaim",
    resultIntro: en
      ? "This is source support, not truth or identity verification. A recruiter remains responsible for review."
      : "Dit is bronondersteuning, geen waarheids- of identiteitscontrole. De recruiter blijft verantwoordelijk voor de review.",
    evidence: en ? "Exact CV source" : "Exacte CV-bron",
    noEvidence: en ? "No resolvable CV source found." : "Geen herleidbare CV-bron gevonden.",
    action: en ? "Next action" : "Volgende actie",
    methodology: en ? "/en/agency/methodology/claim-evidence-benchmark" : "/voor-bureaus/methodologie/claim-evidence-benchmark",
    methodologyLabel: en ? "Read the versioned methodology" : "Lees de versieerbare methodologie",
    cta: en ? "Use the controlled MatchPack workflow" : "Gebruik de gecontroleerde MatchPack-workflow",
    copyReport: en ? "Copy report" : "Kopieer rapport",
    copied: en ? "Report copied" : "Rapport gekopieerd",
  };
}

const verdictTone: Record<string, string> = {
  supported: "border-emerald-300 bg-emerald-50 text-emerald-900",
  partially_supported: "border-amber-300 bg-amber-50 text-amber-950",
  unsupported: "border-rose-300 bg-rose-50 text-rose-900",
  contradicted: "border-rose-500 bg-rose-100 text-rose-950",
  confirmation_required: "border-sky-300 bg-sky-50 text-sky-950",
  not_checkable: "border-slate-300 bg-slate-100 text-slate-800",
};

function verdictLabel(verdict: string, locale: Locale): string {
  const labels = locale === "en" ? {
    supported: "Supported", partially_supported: "Partially supported", unsupported: "Unsupported",
    contradicted: "Contradicted", confirmation_required: "Candidate confirmation needed", not_checkable: "Not CV-checkable",
  } : {
    supported: "Onderbouwd", partially_supported: "Gedeeltelijk onderbouwd", unsupported: "Niet onderbouwd",
    contradicted: "Tegengesproken", confirmation_required: "Kandidaatbevestiging nodig", not_checkable: "Niet via CV controleerbaar",
  };
  return labels[verdict as keyof typeof labels] || verdict;
}

export default function ProposalClaimVerifier({ locale = "nl", candidateAcknowledgementEnabled = false }: { locale?: Locale; candidateAcknowledgementEnabled?: boolean }) {
  const t = copy(locale);
  const [inputMode, setInputMode] = useState<InputMode>("text");
  const [cvText, setCvText] = useState("");
  const [proposalText, setProposalText] = useState("");
  const [vacancyText, setVacancyText] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [result, setResult] = useState<ProposalClaimVerificationV1 | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const basePath = locale === "en" ? "/en/candidate-proposal-checker" : "/tools/kandidaatvoorstel-checker";

  useEffect(() => {
    track("proposal_claim_verifier_viewed", { locale });
  }, [locale]);

  function loadSample() {
    const value = sample(locale);
    setCvText(value.cv);
    setProposalText(value.proposal);
    setVacancyText(value.vacancy);
    setCvFile(null);
    setInputMode("text");
    setResult(null);
    setError(null);
    track("proposal_claim_verifier_sample_loaded", { locale });
  }

  function reset() {
    setCvText(""); setProposalText(""); setVacancyText(""); setCvFile(null); setResult(null); setError(null); setCopied(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  function selectFile(file?: File) {
    if (!file) return;
    const extension = file.name.toLocaleLowerCase().split(".").pop() || "";
    if (!ALLOWED_EXTENSIONS.has(extension) || file.size > MAX_FILE_SIZE) {
      setError(locale === "en" ? "Use a PDF, DOC or DOCX file of no more than 10 MB." : "Gebruik een PDF-, DOC- of DOCX-bestand van maximaal 10 MB.");
      return;
    }
    setCvFile(file); setCvText(""); setError(null); setResult(null);
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true); setError(null); setResult(null); setCopied(false);
    track("proposal_claim_verifier_started", { locale, inputType: cvFile ? "file" : "text" });
    try {
      let response: Response;
      if (cvFile) {
        const body = new FormData();
        body.append("cvFile", cvFile); body.append("proposalText", proposalText); body.append("vacancyText", vacancyText); body.append("locale", locale);
        response = await fetch(`/api/tools/proposal-claim-verifier?locale=${locale}`, { method: "POST", body });
      } else {
        response = await fetch(`/api/tools/proposal-claim-verifier?locale=${locale}`, {
          method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ cvText, proposalText, vacancyText, locale }),
        });
      }
      const data = await response.json().catch(() => ({})) as { result?: ProposalClaimVerificationV1; error?: string };
      if (!response.ok || !data.result) throw new Error(data.error || t.error);
      setResult(data.result);
      track("proposal_claim_verifier_completed", {
        locale, claimCount: data.result.summary.total,
        unsupportedCount: data.result.summary.unsupported + data.result.summary.contradicted,
        confirmationCount: data.result.summary.confirmationRequired,
      });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : t.error);
      track("proposal_claim_verifier_failed", { locale, reason: "request_failed" });
    } finally { setLoading(false); }
  }

  async function copyResult() {
    if (!result) return;
    const text = result.claims.map((claim, index) => `${index + 1}. ${claim.claim}\n${verdictLabel(claim.verdict, locale)} — ${claim.explanation}\n${t.action}: ${claim.action}`).join("\n\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    track("proposal_claim_verifier_result_copied", { locale, claimCount: result.summary.total });
  }

  const canSubmit = Boolean((cvText.trim().length >= 120 || cvFile) && proposalText.trim().length >= 40);
  const inputClass = "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-relaxed outline-none focus:border-teal-700 focus:ring-4 focus:ring-teal-100";

  return <div className="min-h-screen text-slate-950">
    <main>
      <section className="border-b border-slate-200 bg-[var(--wk-accent-soft)]">
        <div className="wk-container py-12 sm:py-16">
          <span className="wk-eyebrow">{t.badge}</span>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-[-0.05em] sm:text-6xl">{t.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-700">{t.intro}</p>
          <nav className="mt-7 flex flex-wrap gap-2" aria-label={locale === "en" ? "Checker mode" : "Controlemodus"}>
            <Link href={basePath} aria-current="page" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-extrabold text-white">{t.modeClaims}</Link>
            <Link href={`${basePath}?mode=requirements`} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-extrabold text-slate-700">{t.modeRequirements}</Link>
          </nav>
        </div>
      </section>

      <section className="wk-container py-10 sm:py-14">
        <form onSubmit={submit} className="wk-card p-5 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="wk-eyebrow">{t.sourceTitle}</p><p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">{t.privacy}</p></div><div className="flex gap-3"><button type="button" onClick={loadSample} className="wk-button wk-button-secondary">{t.sample}</button><button type="button" onClick={reset} className="text-sm font-extrabold underline">{t.reset}</button></div></div>
          <div className="mt-7 grid gap-6 lg:grid-cols-2">
            <div><div className="flex items-center justify-between gap-3"><label className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-600" htmlFor="claim-cv">{t.cvLabel}</label><div className="flex rounded-full border border-slate-200 bg-slate-50 p-1"><button type="button" onClick={() => { setInputMode("text"); setCvFile(null); }} className={`rounded-full px-3 py-1 text-xs font-bold ${inputMode === "text" ? "bg-white shadow" : "text-slate-500"}`}>{t.paste}</button><button type="button" onClick={() => setInputMode("file")} className={`rounded-full px-3 py-1 text-xs font-bold ${inputMode === "file" ? "bg-white shadow" : "text-slate-500"}`}>{t.upload}</button></div></div>
              {inputMode === "text" ? <textarea id="claim-cv" value={cvText} onChange={(event) => setCvText(event.target.value)} className={`${inputClass} mt-2 min-h-72`} maxLength={18_000} /> : <div className="mt-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6"><input ref={fileRef} id="claim-cv" type="file" accept=".pdf,.doc,.docx" onChange={(event) => selectFile(event.target.files?.[0])} className="w-full text-sm" />{cvFile ? <p className="mt-3 text-sm font-bold text-emerald-800">{cvFile.name}</p> : null}</div>}
            </div>
            <div className="space-y-5"><label className="block text-xs font-extrabold uppercase tracking-[0.12em] text-slate-600" htmlFor="claim-proposal">{t.proposalLabel}<textarea id="claim-proposal" value={proposalText} onChange={(event) => setProposalText(event.target.value)} className={`${inputClass} mt-2 min-h-44`} maxLength={8_000} /></label><label className="block text-xs font-extrabold uppercase tracking-[0.12em] text-slate-600" htmlFor="claim-vacancy">{t.vacancyLabel}<textarea id="claim-vacancy" value={vacancyText} onChange={(event) => setVacancyText(event.target.value)} className={`${inputClass} mt-2 min-h-28`} maxLength={18_000} /></label></div>
          </div>
          {error ? <div role="alert" className="mt-6 rounded-xl border border-rose-300 bg-rose-50 p-4 text-sm font-bold text-rose-900">{error}</div> : null}
          <div className="mt-7 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-2xl text-xs leading-relaxed text-slate-500">{t.privacy}</p><button type="submit" disabled={!canSubmit || loading} className="wk-button wk-button-primary disabled:cursor-not-allowed disabled:opacity-50">{loading ? t.loading : t.submit}</button></div>
        </form>
      </section>

      {result ? <section className="border-y border-slate-200 bg-white" aria-live="polite"><div className="wk-container py-12 sm:py-16">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="wk-eyebrow">ProposalClaimVerificationV1</p><h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">{t.resultTitle}</h2><p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">{t.resultIntro}</p></div><button type="button" onClick={copyResult} className="wk-button wk-button-secondary">{copied ? t.copied : t.copyReport}</button></div>
        <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">{([
          ["supported", result.summary.supported], ["partially_supported", result.summary.partiallySupported], ["unsupported", result.summary.unsupported],
          ["contradicted", result.summary.contradicted], ["confirmation_required", result.summary.confirmationRequired], ["not_checkable", result.summary.notCheckable],
        ] as const).map(([key, value]) => <div key={key} className={`rounded-xl border p-4 ${verdictTone[key]}`}><p className="text-2xl font-extrabold">{value}</p><p className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.08em]">{verdictLabel(key, locale)}</p></div>)}</div>
        <div className="mt-8 space-y-5">{result.claims.map((claim, index) => <article key={claim.id} className="wk-card p-5 sm:p-6"><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">{index + 1} · {claim.category.replaceAll("_", " ")}</p><h3 className="mt-2 max-w-3xl text-lg font-extrabold leading-snug">“{claim.claim}”</h3></div><span className={`w-fit rounded-full border px-3 py-2 text-xs font-extrabold ${verdictTone[claim.verdict]}`}>{verdictLabel(claim.verdict, locale)}</span></div><p className="mt-4 text-sm leading-relaxed text-slate-700">{claim.explanation}</p>{claim.evidence.length ? <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4"><p className="text-xs font-extrabold uppercase tracking-[0.12em] text-emerald-800">{t.evidence}</p>{claim.evidence.map((reference) => <blockquote key={`${reference.sourceLine}-${reference.snippet}`} className="mt-2 text-sm leading-relaxed text-emerald-950">“{reference.snippet}” <span className="font-bold">· {reference.sourcePage ? `PDF ${reference.sourcePage}` : `${locale === "en" ? "line" : "regel"} ${reference.sourceLine}`} · {reference.sourceSection}</span></blockquote>)}</div> : <p className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">{t.noEvidence}</p>}<div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4"><p className="text-xs font-extrabold uppercase tracking-[0.12em] text-amber-800">{t.action}</p><p className="mt-2 text-sm font-semibold leading-relaxed text-amber-950">{claim.action}</p></div></article>)}</div>
        <div className="mt-8 grid gap-5 lg:grid-cols-2"><div className="rounded-2xl bg-slate-950 p-6 text-white"><h3 className="text-lg font-extrabold">{locale === "en" ? "Limits" : "Beperkingen"}</h3><ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">{result.limitations.map((item) => <li key={item}>— {item}</li>)}</ul><Link href={t.methodology} onClick={() => track("proposal_claim_methodology_clicked", { locale })} className="mt-5 inline-block font-extrabold text-teal-300 underline">{t.methodologyLabel} →</Link></div><div className="rounded-2xl border border-teal-200 bg-teal-50 p-6"><h3 className="text-2xl font-extrabold">{t.cta}</h3><p className="mt-3 text-sm leading-relaxed text-slate-700">{locale === "en" ? `MatchPack adds recruiter dispositions, version history${candidateAcknowledgementEnabled ? ", candidate acknowledgement" : ""} and one controlled export snapshot.` : `MatchPack voegt recruiterbesluiten, versiegeschiedenis${candidateAcknowledgementEnabled ? ", kandidaatbevestiging" : ""} en één gecontroleerde exportsnapshot toe.`}</p><Link href={locale === "en" ? "/en/agency" : "/agency"} onClick={() => track("proposal_claim_verifier_cta_clicked", { locale, destination: "agency" })} className="wk-button wk-button-primary mt-5">MatchPack →</Link></div></div>
      </div></section> : null}
    </main>
  </div>;
}
