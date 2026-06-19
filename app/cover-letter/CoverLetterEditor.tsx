"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { getTargetVacancySessionKey } from "@/lib/cover-letter-session";
import type { UiLanguage } from "@/lib/ui-language";

type CoverLetterTone = "professional" | "enthusiastic" | "concise";

type CoverLetterEditorProps = {
  cvId: string;
  initialTargetRole: string;
  uiLanguage: UiLanguage;
};

const inputClass = "w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100";

export default function CoverLetterEditor({ cvId, initialTargetRole, uiLanguage }: CoverLetterEditorProps) {
  const isEnglish = uiLanguage === "en";
  const tr = useCallback((dutch: string, english: string) => (isEnglish ? english : dutch), [isEnglish]);
  const editorHref = isEnglish ? `/en/editor?id=${encodeURIComponent(cvId)}` : `/editor?id=${encodeURIComponent(cvId)}`;
  const [targetRole, setTargetRole] = useState(initialTargetRole);
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [tone, setTone] = useState<CoverLetterTone>("professional");
  const [coverLetter, setCoverLetter] = useState("");
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const storedVacancy = window.sessionStorage.getItem(getTargetVacancySessionKey(cvId));
    if (storedVacancy) setJobDescription(storedVacancy);

    let cancelled = false;
    const loadCoverLetter = async () => {
      try {
        const response = await fetch(`/api/cover-letter?cvId=${encodeURIComponent(cvId)}`);
        if (!response.ok) return;
        const result = await response.json().catch(() => null);
        if (cancelled) return;
        setCoverLetter(typeof result?.coverLetter === "string" ? result.coverLetter : "");
        setUpdatedAt(typeof result?.updatedAt === "string" ? result.updatedAt : null);
      } catch {
        if (!cancelled) {
          alert(tr("Sollicitatiebrief laden mislukt. Probeer het opnieuw.", "Loading the cover letter failed. Please try again."));
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    loadCoverLetter();
    return () => {
      cancelled = true;
    };
  }, [cvId, tr]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    track("cta_clicked", { location: "cover_letter_workspace", label: coverLetter ? "regenerate" : "generate" });
    try {
      const response = await fetch("/api/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvId, targetRole, companyName, jobDescription, tone }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        alert(result?.error || tr("Sollicitatiebrief genereren mislukt. Probeer het opnieuw.", "Cover letter generation failed. Please try again."));
        return;
      }
      setCoverLetter(typeof result?.coverLetter === "string" ? result.coverLetter : "");
      setUpdatedAt(typeof result?.updatedAt === "string" ? result.updatedAt : null);
      setIsDirty(false);
    } catch {
      alert(tr("Sollicitatiebrief genereren mislukt. Probeer het opnieuw.", "Cover letter generation failed. Please try again."));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!isDirty) return;
    setIsSaving(true);
    track("cta_clicked", { location: "cover_letter_workspace", label: "save" });
    try {
      const response = await fetch("/api/cover-letter", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvId, coverLetter }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        alert(result?.error || tr("Opslaan van sollicitatiebrief mislukt.", "Saving the cover letter failed."));
        return;
      }
      setCoverLetter(typeof result?.coverLetter === "string" ? result.coverLetter : coverLetter);
      setUpdatedAt(typeof result?.updatedAt === "string" ? result.updatedAt : null);
      setIsDirty(false);
    } catch {
      alert(tr("Opslaan van sollicitatiebrief mislukt.", "Saving the cover letter failed."));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href={editorHref} className="text-sm font-semibold text-slate-600 hover:text-slate-950">
            ← {tr("Terug naar CV", "Back to CV")}
          </Link>
          <span className="text-xs font-semibold text-slate-500">
            {isDirty ? tr("Niet opgeslagen", "Not saved") : tr("Opgeslagen", "Saved")}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6 max-w-3xl">
          <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">{tr("Sollicitatiebrief", "Cover letter")}</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {tr("Werk in een aparte ruimte aan je brief. Je CV blijft ongewijzigd en je brief wordt bij hetzelfde CV opgeslagen.", "Write your letter in a focused workspace. Your CV stays unchanged and the letter is saved with the same CV.")}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <section className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-950">{tr("Vacaturegegevens", "Vacancy details")}</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase text-slate-500">{tr("Doelrol", "Target role")}</label>
                <input maxLength={200} value={targetRole} onChange={(event) => setTargetRole(event.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase text-slate-500">{tr("Bedrijfsnaam", "Company name")}</label>
                <input maxLength={200} value={companyName} onChange={(event) => setCompanyName(event.target.value)} placeholder={tr("bv. ASML", "e.g. ASML")} className={inputClass} />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase text-slate-500">{tr("Toon", "Tone")}</label>
                <select value={tone} onChange={(event) => setTone(event.target.value as CoverLetterTone)} className={inputClass}>
                  <option value="professional">{tr("Professioneel", "Professional")}</option>
                  <option value="enthusiastic">{tr("Enthousiast", "Enthusiastic")}</option>
                  <option value="concise">{tr("Bondig", "Concise")}</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase text-slate-500">{tr("Vacaturetekst", "Job description")}</label>
                <textarea
                  value={jobDescription}
                  onChange={(event) => {
                    setJobDescription(event.target.value);
                    window.sessionStorage.setItem(getTargetVacancySessionKey(cvId), event.target.value);
                  }}
                  rows={9}
                  maxLength={20000}
                  placeholder={tr("Plak hier de vacaturetekst...", "Paste the job description here...")}
                  className={`${inputClass} resize-y`}
                />
              </div>
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full rounded-md border border-emerald-700 bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isGenerating ? tr("Genereren...", "Generating...") : coverLetter ? tr("Brief opnieuw genereren", "Regenerate letter") : tr("Brief genereren", "Generate letter")}
              </button>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-slate-950">{tr("Brieftekst", "Letter text")}</h2>
              {updatedAt ? <span className="text-xs text-slate-500">{tr("Bijgewerkt", "Updated")}: {new Date(updatedAt).toLocaleString(isEnglish ? "en-NL" : "nl-NL")}</span> : null}
            </div>
            {isLoading ? (
              <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">{tr("Sollicitatiebrief laden...", "Loading cover letter...")}</div>
            ) : (
              <textarea
                value={coverLetter}
                maxLength={50000}
                onChange={(event) => {
                  setCoverLetter(event.target.value);
                  setIsDirty(true);
                }}
                placeholder={tr("Genereer een brief of schrijf hier je eigen versie.", "Generate a letter or write your own version here.")}
                className={`${inputClass} mt-4 min-h-[520px] resize-y leading-relaxed`}
              />
            )}
            <button
              type="button"
              onClick={handleSave}
              disabled={!isDirty || isSaving}
              className="mt-4 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? tr("Opslaan...", "Saving...") : isDirty ? tr("Brief opslaan", "Save letter") : `✓ ${tr("Opgeslagen", "Saved")}`}
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
