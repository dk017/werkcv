"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import type { CVData } from "@/lib/cv";
import {
  scrubAnonymizedText,
  scrubKnownCandidateName,
  type MatchPackAnalysis,
  type MatchPackSubmission,
} from "@/lib/agency-matchpack";
import { track } from "@/lib/analytics";
import ScaledCvPreview from "@/app/editor/ScaledCvPreview";

type PackSummary = {
  id: string;
  title: string;
  vacancyTitle: string | null;
  locale: string;
  sourceFileType: string | null;
  status: string;
  cvDocumentId: string | null;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type PackDetail = PackSummary & {
  vacancyText: string;
  candidateData: CVData;
  anonymizedData: CVData;
  analysis: MatchPackAnalysis;
  submissionData: MatchPackSubmission;
  templateId: string;
  colorThemeId: string;
};

type AgencyMatchPackWorkspaceProps = {
  initialPacks: PackSummary[];
  initialUsed: number;
  allowance: number;
  canCreate: boolean;
};

const inputClassName =
  "w-full border-2 border-slate-300 bg-white px-3 py-3 text-sm font-semibold text-slate-900 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

function formatDate(value: string | null): string {
  if (!value) return "—";
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function statusLabel(status: string): string {
  return status === "approved" ? "Goedgekeurd" : "Conceptreview";
}

function statusClass(status: string): string {
  return status === "approved"
    ? "border-emerald-300 bg-emerald-50 text-emerald-800"
    : "border-amber-300 bg-amber-50 text-amber-900";
}

function toSummary(pack: PackDetail | PackSummary): PackSummary {
  return {
    id: pack.id,
    title: pack.title,
    vacancyTitle: pack.vacancyTitle,
    locale: pack.locale,
    sourceFileType: pack.sourceFileType,
    status: pack.status,
    cvDocumentId: pack.cvDocumentId,
    approvedAt: pack.approvedAt,
    createdAt: pack.createdAt,
    updatedAt: pack.updatedAt,
  };
}

function getStatusText(status: string): string {
  if (status === "strong") return "Sterk";
  if (status === "partial") return "Gedeeltelijk";
  return "Ontbreekt";
}

function getStatusTone(status: string): string {
  if (status === "strong") return "border-emerald-200 bg-emerald-50 text-emerald-800";
  if (status === "partial") return "border-amber-200 bg-amber-50 text-amber-900";
  return "border-rose-200 bg-rose-50 text-rose-800";
}

export default function AgencyMatchPackWorkspace({
  initialPacks,
  initialUsed,
  allowance,
  canCreate,
}: AgencyMatchPackWorkspaceProps) {
  const [packs, setPacks] = useState<PackSummary[]>(initialPacks);
  const [activePack, setActivePack] = useState<PackDetail | null>(null);
  const [vacancyTitle, setVacancyTitle] = useState("");
  const [vacancyText, setVacancyText] = useState("");
  const [locale, setLocale] = useState<"nl" | "en">("nl");
  const [file, setFile] = useState<File | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState([false, false, false]);
  const [used, setUsed] = useState(initialUsed);
  const [fullPageCount, setFullPageCount] = useState(1);
  const [anonymizedPageCount, setAnonymizedPageCount] = useState(1);
  const [isDirty, setIsDirty] = useState(false);

  const reviewReady = checkedItems.every(Boolean);
  const activeResult = activePack?.analysis.result;
  const activeIsApproved = activePack?.status === "approved" && Boolean(activePack.cvDocumentId);
  const hasQuota = canCreate && used < allowance;
  const usagePercent = Math.min(100, (used / Math.max(1, allowance)) * 100);

  const activePackTitle = useMemo(() => {
    if (!activePack) return "Nieuw kandidaatvoorstel";
    return activePack.vacancyTitle || activePack.title;
  }, [activePack]);

  const resetWorkspace = () => {
    setActivePack(null);
    setVacancyTitle("");
    setVacancyText("");
    setLocale("nl");
    setFile(null);
    setCheckedItems([false, false, false]);
    setError(null);
    setNotice(null);
    setIsDirty(false);
  };

  const updateCandidatePersonal = (field: keyof CVData["personal"], value: string) => {
    setActivePack((current) => current ? {
      ...current,
      candidateData: {
        ...current.candidateData,
        personal: { ...current.candidateData.personal, [field]: value },
      },
    } : current);
    setIsDirty(true);
  };

  const updateExperience = (index: number, field: keyof CVData["experience"][number], value: string | string[]) => {
    setActivePack((current) => current ? {
      ...current,
      candidateData: {
        ...current.candidateData,
        experience: current.candidateData.experience.map((item, itemIndex) => itemIndex === index
          ? { ...item, [field]: value }
          : item),
      },
    } : current);
    setIsDirty(true);
  };

  const updateEducation = (index: number, field: keyof CVData["education"][number], value: string) => {
    setActivePack((current) => current ? {
      ...current,
      candidateData: {
        ...current.candidateData,
        education: current.candidateData.education.map((item, itemIndex) => itemIndex === index
          ? { ...item, [field]: value }
          : item),
      },
    } : current);
    setIsDirty(true);
  };

  const updateSkills = (value: string) => {
    const names = value.split(",").map((item) => item.trim()).filter(Boolean).slice(0, 40);
    setActivePack((current) => current ? {
      ...current,
      candidateData: {
        ...current.candidateData,
        skills: names.map((name, index) => ({ name, level: current.candidateData.skills[index]?.level || 3 })),
      },
    } : current);
    setIsDirty(true);
  };

  const updateSubmission = <K extends keyof MatchPackSubmission>(field: K, value: MatchPackSubmission[K]) => {
    setActivePack((current) => current ? {
      ...current,
      submissionData: { ...current.submissionData, [field]: value },
    } : current);
    setIsDirty(true);
  };

  const updateCommercial = (field: keyof MatchPackSubmission["commercial"], value: string) => {
    setActivePack((current) => current ? {
      ...current,
      submissionData: {
        ...current.submissionData,
        commercial: { ...current.submissionData.commercial, [field]: value },
      },
    } : current);
    setIsDirty(true);
  };

  const handleAnalyze = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setError("Upload eerst het CV van de kandidaat.");
      return;
    }
    if (vacancyText.trim().length < 120) {
      setError("Plak de volledige vacaturetekst, inclusief eisen en verantwoordelijkheden.");
      return;
    }

    setIsBusy(true);
    setError(null);
    setNotice(null);
    const fileType = file.name.toLowerCase().endsWith(".pdf")
      ? "pdf"
      : file.name.toLowerCase().endsWith(".docx") ? "docx" : "unknown";
    track("matchpack_analysis_started", { locale, fileType });
    try {
      const formData = new FormData();
      formData.append("cvFile", file);
      formData.append("vacancyTitle", vacancyTitle);
      formData.append("vacancyText", vacancyText);
      formData.append("locale", locale);

      const response = await fetch("/api/agency/matchpack", {
        method: "POST",
        body: formData,
        cache: "no-store",
      });
      const body = await response.json().catch(() => null) as { pack?: PackDetail; error?: string; code?: string } | null;
      if (!response.ok || !body?.pack) {
        track("matchpack_analysis_failed", { locale, reason: body?.code || `http_${response.status}` });
        throw new Error(body?.error || "De MatchPack kon niet worden gemaakt.");
      }

      setActivePack(body.pack);
      setPacks((current) => [toSummary(body.pack as PackDetail), ...current.filter((pack) => pack.id !== body.pack?.id)]);
      setCheckedItems([false, false, false]);
      setIsDirty(false);
      setNotice("Analyse klaar. Controleer de bewijzen en redactionele wijzigingen voordat je goedkeurt.");
      track("matchpack_analysis_completed", {
        locale,
        requirementCount: body.pack.analysis.result.requirements.length,
        scoreBand: body.pack.analysis.result.scoreBand,
      });
    } catch (caught) {
      if (!(caught instanceof Error)) track("matchpack_analysis_failed", { locale, reason: "unknown" });
      setError(caught instanceof Error ? caught.message : "De MatchPack kon niet worden gemaakt.");
    } finally {
      setIsBusy(false);
    }
  };

  const openPack = async (id: string) => {
    setIsBusy(true);
    setError(null);
    setNotice(null);
    try {
      const response = await fetch(`/api/agency/matchpack/${encodeURIComponent(id)}`, { cache: "no-store" });
      const body = await response.json().catch(() => null) as { pack?: PackDetail; error?: string } | null;
      if (!response.ok || !body?.pack) throw new Error(body?.error || "De MatchPack kon niet worden geopend.");
      setActivePack(body.pack);
      setCheckedItems([false, false, false]);
      setIsDirty(false);
      track("matchpack_review_opened", {
        locale: body.pack.locale === "en" ? "en" : "nl",
        status: body.pack.status === "approved" ? "approved" : "analyzed",
      });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "De MatchPack kon niet worden geopend.");
    } finally {
      setIsBusy(false);
    }
  };

  const saveDraft = async () => {
    if (!activePack || activeIsApproved) return;
    setIsBusy(true);
    setError(null);
    setNotice(null);
    try {
      const response = await fetch(`/api/agency/matchpack/${encodeURIComponent(activePack.id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateData: activePack.candidateData,
          submissionData: activePack.submissionData,
        }),
      });
      const body = await response.json().catch(() => null) as {
        pack?: Pick<PackDetail, "candidateData" | "anonymizedData" | "submissionData" | "updatedAt">;
        error?: string;
      } | null;
      if (!response.ok || !body?.pack) throw new Error(body?.error || "Het concept kon niet worden opgeslagen.");
      setActivePack((current) => current ? { ...current, ...body.pack } : current);
      setPacks((current) => current.map((pack) => pack.id === activePack.id
        ? { ...pack, updatedAt: body.pack?.updatedAt || pack.updatedAt }
        : pack));
      setIsDirty(false);
      setCheckedItems([false, false, false]);
      setNotice("Concept opgeslagen. De volledige en geredigeerde versie gebruiken nu dezelfde gecontroleerde brondata.");
      track("matchpack_draft_saved", {
        locale: activePack.locale === "en" ? "en" : "nl",
        selectedVariant: activePack.submissionData.selectedVariant,
      });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Het concept kon niet worden opgeslagen.");
    } finally {
      setIsBusy(false);
    }
  };

  const approvePack = async () => {
    if (!activePack || !reviewReady || activeIsApproved || isDirty) return;
    setIsBusy(true);
    setError(null);
    setNotice(null);
    try {
      const response = await fetch(`/api/agency/matchpack/${encodeURIComponent(activePack.id)}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const body = await response.json().catch(() => null) as {
        cvId?: string;
        reused?: boolean;
        quota?: { used?: number; remaining?: number };
        error?: string;
      } | null;
      if (!response.ok || typeof body?.cvId !== "string") {
        throw new Error(body?.error || "De MatchPack kon niet worden goedgekeurd.");
      }

      setActivePack((current) => current ? {
        ...current,
        status: "approved",
        cvDocumentId: body.cvId || current.cvDocumentId,
        approvedAt: new Date().toISOString(),
      } : current);
      setPacks((current) => current.map((pack) => pack.id === activePack.id
        ? { ...pack, status: "approved", cvDocumentId: body.cvId || pack.cvDocumentId, approvedAt: new Date().toISOString() }
        : pack));
      if (typeof body.quota?.used === "number") setUsed(body.quota.used);
      setNotice(body.reused ? "Dit kandidaatvoorstel was al goedgekeurd." : "Goedgekeurd. Eén voorstel-slot is nu gebruikt en beide pakketten staan klaar.");
      track("matchpack_approved", {
        locale: activePack.locale === "en" ? "en" : "nl",
        selectedVariant: activePack.submissionData.selectedVariant,
        requirementCount: activePack.analysis.result.requirements.length,
      });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "De MatchPack kon niet worden goedgekeurd.");
    } finally {
      setIsBusy(false);
    }
  };

  const copyClientEmail = async () => {
    if (!activePack) return;
    try {
      const locale = activePack.locale === "en" ? "en" : "nl";
      const prepare = (value: string) => activePack.submissionData.selectedVariant === "anonymized"
        ? scrubKnownCandidateName(scrubAnonymizedText(value, locale), activePack.candidateData.personal.name, locale)
        : value;
      await navigator.clipboard.writeText(`${prepare(activePack.submissionData.clientEmailSubject)}\n\n${prepare(activePack.submissionData.clientEmailBody)}`);
      setNotice("Onderwerp en e-mailtekst gekopieerd.");
      track("matchpack_email_copied", { locale });
    } catch {
      setError("Kopiëren lukte niet. Selecteer de e-mailtekst handmatig.");
    }
  };

  const deletePack = async () => {
    if (!activePack || activeIsApproved) return;
    if (!window.confirm("Deze ongekeurde MatchPack verwijderen?")) return;

    setIsBusy(true);
    setError(null);
    try {
      const response = await fetch(`/api/agency/matchpack/${encodeURIComponent(activePack.id)}`, { method: "DELETE" });
      const body = await response.json().catch(() => null) as { error?: string } | null;
      if (!response.ok) throw new Error(body?.error || "De MatchPack kon niet worden verwijderd.");
      setPacks((current) => current.filter((pack) => pack.id !== activePack.id));
      resetWorkspace();
      setNotice("MatchPack verwijderd.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "De MatchPack kon niet worden verwijderd.");
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <div className="mt-8 grid gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="h-fit border-2 border-slate-900 bg-white p-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Agency workflow</p>
            <h2 className="mt-1 text-xl font-black">Kandidaatvoorstellen</h2>
          </div>
          <button
            type="button"
            onClick={resetWorkspace}
            className="border-2 border-slate-900 bg-yellow-300 px-3 py-2 text-xs font-black"
          >
            Nieuw
          </button>
        </div>

        <div className="mt-5 border-t-2 border-slate-100 pt-4">
          <div className="flex items-end justify-between gap-3">
            <span className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">Voorstel-slots</span>
            <span className="text-sm font-black">{used} / {allowance}</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden bg-slate-100">
            <div className="h-full bg-emerald-500" style={{ width: `${usagePercent}%` }} />
          </div>
          <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-500">
            Analyse en conceptreview gebruiken geen slot. Een slot wordt pas gebruikt bij definitieve goedkeuring.
          </p>
        </div>

        <div className="mt-5 space-y-2">
          {packs.length ? packs.map((pack) => (
            <button
              type="button"
              key={pack.id}
              onClick={() => void openPack(pack.id)}
              className={`w-full border-2 px-3 py-3 text-left transition-colors ${activePack?.id === pack.id ? "border-emerald-600 bg-emerald-50" : "border-slate-200 bg-white hover:border-slate-400"}`}
            >
              <span className="block truncate text-sm font-black">{pack.vacancyTitle || pack.title}</span>
              <span className="mt-1 flex items-center justify-between gap-2 text-[11px] font-bold text-slate-500">
                <span>{formatDate(pack.updatedAt)}</span>
                <span className={`border px-1.5 py-0.5 ${statusClass(pack.status)}`}>{statusLabel(pack.status)}</span>
              </span>
            </button>
          )) : (
            <p className="border-2 border-dashed border-slate-300 px-3 py-4 text-xs font-semibold leading-relaxed text-slate-500">
              Nog geen kandidaatvoorstellen. Start met een CV en vacature hieronder.
            </p>
          )}
        </div>
      </aside>

      <section className="min-w-0">
        {error ? <div className="mb-5 border-2 border-rose-500 bg-rose-50 p-4 text-sm font-semibold text-rose-900" role="alert">{error}</div> : null}
        {notice ? <div className="mb-5 border-2 border-emerald-500 bg-emerald-50 p-4 text-sm font-semibold text-emerald-900" role="status">{notice}</div> : null}

        {!activePack ? (
          <form onSubmit={handleAnalyze} className="border-2 border-slate-900 bg-white p-5 shadow-[5px_5px_0px_0px_rgba(78,205,196,1)] sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-slate-100 pb-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Nieuw kandidaatvoorstel · MatchPack</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">CV + vacature → compleet concept voor review</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
                  Upload het CV, plak de vacature en laat WerkCV de eisen koppelen aan concreet bewijs. Je houdt de laatste goedkeuring zelf.
                </p>
              </div>
              <span className="border-2 border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-800">Geen slot bij analyse</span>
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <label className="block text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                Vacaturetitel <span className="font-semibold normal-case tracking-normal">(optioneel)</span>
                <input className={`${inputClassName} mt-2`} value={vacancyTitle} onChange={(event) => setVacancyTitle(event.target.value)} placeholder="Bijv. Senior Java Developer" maxLength={160} />
              </label>
              <label className="block text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                Outputtaal
                <select className={`${inputClassName} mt-2`} value={locale} onChange={(event) => setLocale(event.target.value === "en" ? "en" : "nl")}>
                  <option value="nl">Nederlands</option>
                  <option value="en">English</option>
                </select>
              </label>
            </div>

            <label className="mt-5 block text-xs font-black uppercase tracking-[0.12em] text-slate-500">
              Kandidaat-CV
              <input
                className="mt-2 block w-full border-2 border-dashed border-slate-300 bg-slate-50 px-3 py-4 text-sm font-semibold text-slate-700 file:mr-3 file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:font-black file:text-white"
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(event) => setFile(event.target.files?.[0] || null)}
              />
              <span className="mt-2 block text-xs font-semibold normal-case tracking-normal text-slate-500">PDF of DOCX · maximaal 10 MB · tekstgebaseerd bestand</span>
            </label>

            <label className="mt-5 block text-xs font-black uppercase tracking-[0.12em] text-slate-500">
              Volledige vacaturetekst
              <textarea className={`${inputClassName} mt-2 min-h-64 resize-y font-medium leading-relaxed`} value={vacancyText} onChange={(event) => setVacancyText(event.target.value)} placeholder="Plak hier de functie, verantwoordelijkheden, eisen en pré's..." maxLength={18000} />
              <span className="mt-2 block text-xs font-semibold normal-case tracking-normal text-slate-500">{vacancyText.length.toLocaleString("nl-NL")} / 18.000 tekens</span>
            </label>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t-2 border-slate-100 pt-5">
              <p className="max-w-xl text-xs font-semibold leading-relaxed text-slate-500">De upload en vacaturetekst worden alleen binnen je beveiligde agency-account verwerkt. Het originele bestand wordt niet opgeslagen.</p>
              <button type="submit" disabled={isBusy || !hasQuota} className="border-2 border-slate-900 bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] disabled:cursor-not-allowed disabled:opacity-50">
                {isBusy ? "Voorstel analyseren…" : hasQuota ? "Analyseer en maak concept" : "Maandlimiet bereikt"}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-slate-900 pb-5">
              <div>
                <button type="button" onClick={resetWorkspace} className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700 underline underline-offset-4">← Nieuwe MatchPack</button>
                <h2 className="mt-3 text-3xl font-black tracking-tight">{activePackTitle}</h2>
                <p className="mt-2 text-sm font-semibold text-slate-500">Aangemaakt {formatDate(activePack.createdAt)} · {activePack.sourceFileType?.toUpperCase() || "CV"}</p>
              </div>
              <span className={`border-2 px-3 py-2 text-xs font-black ${statusClass(activePack.status)}`}>{statusLabel(activePack.status)}</span>
            </div>

            {activeResult ? (
              <>
                <section className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
                  <div className="border-2 border-slate-900 bg-white p-5 shadow-[4px_4px_0px_0px_rgba(78,205,196,1)] sm:p-6">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Evidence-backed fit summary</p>
                    <h3 className="mt-2 text-2xl font-black">Waarom dit profiel wel of niet past</h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-700">{activeResult.summary}</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      <div className="border-2 border-slate-200 bg-slate-50 p-3"><p className="text-[11px] font-black uppercase tracking-[0.12em] text-slate-500">Rol</p><p className="mt-1 text-sm font-black">{activeResult.perceivedRole}</p></div>
                      <div className="border-2 border-slate-200 bg-slate-50 p-3"><p className="text-[11px] font-black uppercase tracking-[0.12em] text-slate-500">Senioriteit</p><p className="mt-1 text-sm font-black">{activeResult.perceivedSeniority}</p></div>
                      <div className="border-2 border-slate-200 bg-slate-50 p-3"><p className="text-[11px] font-black uppercase tracking-[0.12em] text-slate-500">Secundaire score</p><p className="mt-1 text-sm font-black">{activeResult.score}/100 · {activeResult.scoreLabel}</p></div>
                    </div>
                  </div>
                  <div className="border-2 border-slate-900 bg-slate-950 p-5 text-white sm:p-6">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-300">Recruiter focus</p>
                    <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-200">Gebruik de bewijsregels hieronder in je interne review. Een score is geen aanname over de beslissing van een werkgever.</p>
                    <div className="mt-5 space-y-3">
                      {activeResult.strengths.slice(0, 3).map((strength) => <div key={`${strength.title}-${strength.evidence}`} className="border-l-4 border-emerald-400 pl-3"><p className="text-sm font-black">{strength.title}</p><p className="mt-1 text-xs leading-relaxed text-slate-300">{strength.evidence}</p></div>)}
                    </div>
                  </div>
                </section>

                <section className="border-2 border-slate-900 bg-white p-5 sm:p-6">
                  <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Vacancy evidence map</p><h3 className="mt-2 text-2xl font-black">Eisen, bewijs en eerlijk vervolgpunt</h3></div><span className="text-xs font-bold text-slate-500">{activeResult.requirements.length} eisen gecontroleerd</span></div>
                  <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[760px] border-collapse text-left text-sm"><thead><tr className="border-b-2 border-slate-900 text-xs uppercase tracking-[0.1em] text-slate-500"><th className="px-3 py-3">Vacature-eis</th><th className="px-3 py-3">Status</th><th className="px-3 py-3">CV-bewijs</th><th className="px-3 py-3">Eerlijke actie</th></tr></thead><tbody>{activeResult.requirements.map((requirement) => <tr key={`${requirement.requirement}-${requirement.vacancyEvidence}`} className="border-b border-slate-100 align-top"><td className="px-3 py-4"><p className="font-black">{requirement.requirement}</p><p className="mt-1 text-xs leading-relaxed text-slate-500">“{requirement.vacancyEvidence}”</p></td><td className="px-3 py-4"><span className={`inline-flex border px-2 py-1 text-xs font-black ${getStatusTone(requirement.status)}`}>{getStatusText(requirement.status)}</span></td><td className="px-3 py-4 text-xs leading-relaxed text-slate-700">{requirement.cvEvidence || "Geen concreet bewijs gevonden."}</td><td className="px-3 py-4 text-xs leading-relaxed text-slate-700">{requirement.honestAction}</td></tr>)}</tbody></table></div>
                </section>

                <section className="grid gap-5 lg:grid-cols-2">
                  <div className="border-2 border-amber-400 bg-amber-50 p-5"><p className="text-xs font-black uppercase tracking-[0.16em] text-amber-800">Top verbeterpunten</p><div className="mt-4 space-y-4">{activeResult.topFixes.map((fix) => <div key={`${fix.title}-${fix.action}`}><p className="text-sm font-black text-amber-950">{fix.title}</p><p className="mt-1 text-xs leading-relaxed text-amber-900">{fix.evidence} {fix.action}</p></div>)}</div></div>
                  <div className="border-2 border-slate-200 bg-slate-50 p-5"><p className="text-xs font-black uppercase tracking-[0.16em] text-slate-600">Niet verbergen</p><p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">Ontbrekende termen: {activeResult.missingKeywords.length ? activeResult.missingKeywords.join(", ") : "geen duidelijke ontbrekende termen gevonden"}.</p><p className="mt-4 text-xs font-semibold leading-relaxed text-slate-500">{activeResult.limitations[0]}</p></div>
                </section>

                <section className="border-2 border-slate-900 bg-white p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Gecontroleerde brondata</p>
                      <h3 className="mt-2 text-2xl font-black">Corrigeer de informatie vóór goedkeuring</h3>
                      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">Deze velden voeden zowel het volledige CV als het geredigeerde concept. Corrigeer alleen extractiefouten en voeg geen onbevestigde claims toe.</p>
                    </div>
                    {isDirty ? <span className="border-2 border-amber-300 bg-amber-50 px-3 py-2 text-xs font-black text-amber-900">Niet-opgeslagen wijzigingen</span> : <span className="border-2 border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-800">Brondata gesynchroniseerd</span>}
                  </div>

                  <details className="mt-5 border-2 border-slate-200 bg-slate-50 p-4" open={!activeIsApproved}>
                    <summary className="cursor-pointer font-black">Persoons- en profielgegevens</summary>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      {([
                        ["name", "Naam"],
                        ["title", "Professionele titel"],
                        ["email", "E-mail"],
                        ["phone", "Telefoon"],
                        ["location", "Woonplaats"],
                      ] as const).map(([field, label]) => <label key={field} className="text-xs font-black uppercase tracking-[0.1em] text-slate-500">{label}<input className={`${inputClassName} mt-2 normal-case tracking-normal`} value={activePack.candidateData.personal[field]} onChange={(event) => updateCandidatePersonal(field, event.target.value)} disabled={activeIsApproved} maxLength={240} /></label>)}
                    </div>
                    <label className="mt-4 block text-xs font-black uppercase tracking-[0.1em] text-slate-500">Profielsamenvatting<textarea className={`${inputClassName} mt-2 min-h-36 normal-case tracking-normal`} value={activePack.candidateData.personal.summary} onChange={(event) => updateCandidatePersonal("summary", event.target.value)} disabled={activeIsApproved} maxLength={4_000} /></label>
                    <label className="mt-4 block text-xs font-black uppercase tracking-[0.1em] text-slate-500">Vaardigheden, kommagescheiden<input className={`${inputClassName} mt-2 normal-case tracking-normal`} value={activePack.candidateData.skills.map((skill) => skill.name).join(", ")} onChange={(event) => updateSkills(event.target.value)} disabled={activeIsApproved} maxLength={1_500} /></label>
                  </details>

                  <details className="mt-3 border-2 border-slate-200 bg-slate-50 p-4">
                    <summary className="cursor-pointer font-black">Werkervaring ({activePack.candidateData.experience.length})</summary>
                    <div className="mt-4 space-y-5">
                      {activePack.candidateData.experience.map((experience, index) => <div key={`${experience.company}-${experience.role}-${index}`} className="border-l-4 border-emerald-400 bg-white p-4">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <label className="text-xs font-black text-slate-500">Functie<input className={`${inputClassName} mt-1`} value={experience.role} onChange={(event) => updateExperience(index, "role", event.target.value)} disabled={activeIsApproved} maxLength={240} /></label>
                          <label className="text-xs font-black text-slate-500">Organisatie<input className={`${inputClassName} mt-1`} value={experience.company} onChange={(event) => updateExperience(index, "company", event.target.value)} disabled={activeIsApproved} maxLength={240} /></label>
                          <label className="text-xs font-black text-slate-500">Start<input className={`${inputClassName} mt-1`} value={experience.start} onChange={(event) => updateExperience(index, "start", event.target.value)} disabled={activeIsApproved} maxLength={80} /></label>
                          <label className="text-xs font-black text-slate-500">Einde<input className={`${inputClassName} mt-1`} value={experience.end} onChange={(event) => updateExperience(index, "end", event.target.value)} disabled={activeIsApproved} maxLength={80} /></label>
                        </div>
                        <label className="mt-3 block text-xs font-black text-slate-500">Beschrijving<textarea className={`${inputClassName} mt-1 min-h-24`} value={experience.description} onChange={(event) => updateExperience(index, "description", event.target.value)} disabled={activeIsApproved} maxLength={3_000} /></label>
                        <label className="mt-3 block text-xs font-black text-slate-500">Resultaten en taken, één per regel<textarea className={`${inputClassName} mt-1 min-h-28`} value={experience.highlights.join("\n")} onChange={(event) => updateExperience(index, "highlights", event.target.value.split("\n").map((item) => item.trim()).filter(Boolean))} disabled={activeIsApproved} maxLength={5_000} /></label>
                      </div>)}
                    </div>
                  </details>

                  <details className="mt-3 border-2 border-slate-200 bg-slate-50 p-4">
                    <summary className="cursor-pointer font-black">Opleidingen ({activePack.candidateData.education.length})</summary>
                    <div className="mt-4 space-y-4">
                      {activePack.candidateData.education.map((education, index) => <div key={`${education.school}-${education.degree}-${index}`} className="grid gap-3 border-l-4 border-sky-400 bg-white p-4 sm:grid-cols-2">
                        <label className="text-xs font-black text-slate-500">Opleiding<input className={`${inputClassName} mt-1`} value={education.degree} onChange={(event) => updateEducation(index, "degree", event.target.value)} disabled={activeIsApproved} /></label>
                        <label className="text-xs font-black text-slate-500">Onderwijsinstelling<input className={`${inputClassName} mt-1`} value={education.school} onChange={(event) => updateEducation(index, "school", event.target.value)} disabled={activeIsApproved} /></label>
                        <label className="text-xs font-black text-slate-500">Start<input className={`${inputClassName} mt-1`} value={education.start} onChange={(event) => updateEducation(index, "start", event.target.value)} disabled={activeIsApproved} /></label>
                        <label className="text-xs font-black text-slate-500">Einde<input className={`${inputClassName} mt-1`} value={education.end} onChange={(event) => updateEducation(index, "end", event.target.value)} disabled={activeIsApproved} /></label>
                      </div>)}
                    </div>
                  </details>
                </section>

                <section className="border-2 border-slate-900 bg-emerald-50 p-5 sm:p-6">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-800">Klantvoorstel</p>
                  <h3 className="mt-2 text-2xl font-black">Maak de introductie en begeleidende e-mail af</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-700">WerkCV vult alleen informatie uit het CV en de vacature voor. Beschikbaarheid, salaris en wensen blijven leeg totdat jij ze bevestigt.</p>

                  <label className="mt-5 block text-xs font-black uppercase tracking-[0.1em] text-slate-600">Introductie op het voorblad<textarea className={`${inputClassName} mt-2 min-h-36 normal-case tracking-normal`} value={activePack.submissionData.clientIntroduction} onChange={(event) => updateSubmission("clientIntroduction", event.target.value)} disabled={activeIsApproved} maxLength={2_800} /></label>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {([
                      ["availability", "Beschikbaarheid"],
                      ["noticePeriod", "Opzegtermijn"],
                      ["salaryIndication", "Salaris- of tariefindicatie"],
                      ["hoursPerWeek", "Uren per week"],
                      ["workLocation", "Werklocatie"],
                    ] as const).map(([field, label]) => <label key={field} className="text-xs font-black text-slate-600">{label}<input className={`${inputClassName} mt-2`} value={activePack.submissionData.commercial[field]} onChange={(event) => updateCommercial(field, event.target.value)} disabled={activeIsApproved} maxLength={240} placeholder="Leeg laten als onbekend" /></label>)}
                  </div>
                  <label className="mt-4 block text-xs font-black text-slate-600">Wensen van de kandidaat<textarea className={`${inputClassName} mt-2 min-h-24`} value={activePack.submissionData.commercial.candidatePreferences} onChange={(event) => updateCommercial("candidatePreferences", event.target.value)} disabled={activeIsApproved} maxLength={800} placeholder="Alleen bevestigde voorkeuren" /></label>
                  <label className="mt-4 block text-xs font-black text-slate-600">Interne recruiternotities — niet opgenomen in het klantpakket<textarea className={`${inputClassName} mt-2 min-h-24`} value={activePack.submissionData.recruiterNotes} onChange={(event) => updateSubmission("recruiterNotes", event.target.value)} disabled={activeIsApproved} maxLength={4_000} /></label>

                  <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
                    <label className="text-xs font-black text-slate-600">E-mailonderwerp<input className={`${inputClassName} mt-2`} value={activePack.submissionData.clientEmailSubject} onChange={(event) => updateSubmission("clientEmailSubject", event.target.value)} disabled={activeIsApproved} maxLength={180} /></label>
                    <label className="text-xs font-black text-slate-600">Begeleidende e-mail<textarea className={`${inputClassName} mt-2 min-h-44`} value={activePack.submissionData.clientEmailBody} onChange={(event) => updateSubmission("clientEmailBody", event.target.value)} disabled={activeIsApproved} maxLength={4_000} /></label>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-4 border-t-2 border-emerald-200 pt-5">
                    <span className="text-xs font-black uppercase tracking-[0.1em] text-slate-600">Voorkeursuitvoer</span>
                    {(["full", "anonymized"] as const).map((variant) => <label key={variant} className="flex items-center gap-2 text-sm font-bold"><input type="radio" checked={activePack.submissionData.selectedVariant === variant} onChange={() => updateSubmission("selectedVariant", variant)} disabled={activeIsApproved} className="h-4 w-4 accent-emerald-600" />{variant === "full" ? "Volledig kandidaatvoorstel" : "Geredigeerd concept"}</label>)}
                    <button type="button" onClick={() => void copyClientEmail()} disabled={isDirty} className="ml-auto border-2 border-slate-900 bg-white px-4 py-2 text-xs font-black disabled:cursor-not-allowed disabled:opacity-50">Kopieer e-mail</button>
                  </div>

                  {!activeIsApproved ? <button type="button" onClick={() => void saveDraft()} disabled={!isDirty || isBusy} className="mt-5 border-2 border-slate-900 bg-emerald-400 px-5 py-3 text-sm font-black shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] disabled:cursor-not-allowed disabled:opacity-50">{isBusy ? "Opslaan…" : isDirty ? "Sla gecontroleerd concept op" : "Concept opgeslagen"}</button> : null}
                </section>

                <section className="border-2 border-slate-900 bg-white p-5 sm:p-6">
                  <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Twee klantpakketten</p><h3 className="mt-2 text-2xl font-black">Volledig voorstel en geredigeerd concept</h3></div><p className="text-xs font-semibold text-slate-500">Elk pakket bevat een voorblad en het gecontroleerde CV</p></div>
                  <div className="mt-5 grid gap-6 lg:grid-cols-2">
                    <div className="min-w-0 border-2 border-slate-200 bg-slate-50 p-3"><div className="flex items-center justify-between gap-3"><p className="text-sm font-black">Volledige CV</p><span className="text-xs font-bold text-slate-500">{fullPageCount} pagina&apos;s</span></div><div className="mt-3 max-h-[680px] overflow-auto bg-slate-200 p-3"><ScaledCvPreview data={activePack.candidateData} templateId={activePack.templateId} colorThemeId={activePack.colorThemeId} scale={0.43} pageCount={fullPageCount} paginated onPageCountChange={setFullPageCount} /></div></div>
                    <div className="min-w-0 border-2 border-slate-200 bg-slate-50 p-3"><div className="flex items-center justify-between gap-3"><p className="text-sm font-black">Geredigeerd concept</p><span className="text-xs font-bold text-slate-500">{anonymizedPageCount} pagina&apos;s</span></div><div className="mt-3 max-h-[680px] overflow-auto bg-slate-200 p-3"><ScaledCvPreview data={activePack.anonymizedData} templateId={activePack.templateId} colorThemeId={activePack.colorThemeId} scale={0.43} pageCount={anonymizedPageCount} paginated onPageCountChange={setAnonymizedPageCount} /></div><p className="mt-3 border-2 border-amber-300 bg-amber-50 p-3 text-xs font-semibold leading-relaxed text-amber-950">{activePack.analysis.anonymization.reviewWarning}</p></div>
                  </div>
                </section>

                <section className="border-2 border-slate-900 bg-yellow-50 p-5 sm:p-6">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-700">Approval checklist</p>
                  <h3 className="mt-2 text-2xl font-black">Jij blijft de eindredacteur</h3>
                  <div className="mt-4 space-y-3 text-sm font-semibold text-slate-800">
                    {["Ik heb de vacature-eisen, het CV-bewijs en alle correcties gecontroleerd.", "Ik heb de introductie, commerciële gegevens en begeleidende e-mail gecontroleerd.", "Ik heb zowel het volledige voorstel als het geredigeerde concept gecontroleerd."] .map((label, index) => <label key={label} className="flex items-start gap-3"><input type="checkbox" className="mt-0.5 h-5 w-5 accent-emerald-600" checked={checkedItems[index]} onChange={(event) => setCheckedItems((current) => current.map((value, itemIndex) => itemIndex === index ? event.target.checked : value))} disabled={activeIsApproved || isDirty} /><span>{label}</span></label>)}
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-3 border-t-2 border-yellow-200 pt-5">
                    {!activeIsApproved ? <button type="button" onClick={() => void approvePack()} disabled={!reviewReady || isBusy || !hasQuota || isDirty} className="border-2 border-slate-900 bg-emerald-400 px-5 py-3 text-sm font-black shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] disabled:cursor-not-allowed disabled:opacity-50">{isBusy ? "Goedkeuren…" : isDirty ? "Sla wijzigingen eerst op" : hasQuota ? "Goedkeuren en 1 voorstel-slot gebruiken" : "Maandlimiet bereikt"}</button> : <><a href={`/api/agency/matchpack/${encodeURIComponent(activePack.id)}/pdf?variant=full`} onClick={() => track("matchpack_pdf_downloaded", { variant: "full" })} className="border-2 border-slate-900 bg-emerald-400 px-4 py-3 text-sm font-black">Volledig voorstel downloaden</a><a href={`/api/agency/matchpack/${encodeURIComponent(activePack.id)}/pdf?variant=anonymized`} onClick={() => track("matchpack_pdf_downloaded", { variant: "anonymized" })} className="border-2 border-slate-900 bg-white px-4 py-3 text-sm font-black">Geredigeerd concept downloaden</a>{activePack.cvDocumentId ? <Link href={`/editor?id=${encodeURIComponent(activePack.cvDocumentId)}`} className="border-2 border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-700">Goedgekeurd CV openen</Link> : null}</>}
                    {!activeIsApproved ? <button type="button" onClick={() => void deletePack()} disabled={isBusy} className="border-2 border-rose-200 bg-white px-4 py-3 text-sm font-black text-rose-700 disabled:opacity-50">Verwijder concept</button> : <span className="text-xs font-bold text-emerald-800">Goedgekeurd op {formatDate(activePack.approvedAt)}</span>}
                  </div>
                </section>
              </>
            ) : <p className="border-2 border-rose-500 bg-rose-50 p-5 text-sm font-semibold text-rose-900">Deze MatchPack bevat geen geldige analyse.</p>}
          </div>
        )}
      </section>
    </div>
  );
}
