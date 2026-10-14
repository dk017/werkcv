"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { appPaths, type AppLocale } from "@/lib/app-v2-paths";
import { applicationStatuses, type AppJob, type ApplicationStatus, type CvChoice, type JobErrorCode, type JobResult, type SavedApplication } from "@/lib/app-jobs/model";
import { addManualVacancy, changeJobStatus, findJobs, saveVacancy, tailorForJob } from "./actions";
import { track } from "@/lib/analytics";

const COPY = {
  nl: {
    title: "Vacatures voor jou", applications: "Mijn sollicitaties", intro: "Vind werk dat aansluit bij je ervaring. Bewaar een vacature en maak er een gerichte versie van je CV voor.",
    trackerIntro: "Houd bij waar je hebt gesolliciteerd en open het CV dat bij elke vacature hoort.",
    cv: "Gebruik dit CV", noCv: "Zoeken zonder CV", role: "Gewenste functie", location: "Plaats of regio", remote: "Alleen op afstand", search: "Zoek vacatures", searching: "Zoeken…",
    privacy: "We zoeken met je functie en regio. Je CV en contactgegevens worden niet naar de vacatureaanbieder gestuurd.",
    preferences: "Deze voorkeuren zijn ingevuld vanuit je CV. Pas ze aan als je iets anders zoekt.",
    first: "Waar wil je aan de slag?", firstBody: "Vul een functie en regio in. We zoeken recente vacatures in Nederland en tonen welke vaardigheden ook in jouw CV staan.",
    empty: "Geen vacatures gevonden", emptyBody: "Probeer een andere functienaam, een grotere regio of zet de filter voor werken op afstand uit. Je kunt ook zelf een vacature toevoegen.",
    saved: "Bewaard", save: "Bewaar vacature", detail: "Bekijk vacaturetekst", visit: "Bekijk bij de aanbieder", source: "Via JSearch", manualSource: "Zelf toegevoegd", remoteTag: "Op afstand", posted: "Geplaatst", unknownDate: "Datum onbekend",
    matches: "Ook in jouw CV", missing: "Genoemd in vacature, niet gevonden in je CV", noMatch: "Geen expliciete vaardigheidsoverlap gevonden. Lees de vacature om te beoordelen of deze bij je past.", evidence: "Dit is tekstoverlap, geen voorspelling van je kans op een baan.",
    paste: "Zelf een vacature toevoegen", pasteIntro: "Plak een vacature die je ergens anders hebt gevonden. Je kunt deze bewaren en je CV erop afstemmen.",
    jobTitle: "Functietitel", company: "Werkgever", description: "Volledige vacaturetekst", url: "Link naar de vacature (optioneel)", add: "Bewaar eigen vacature", cancel: "Annuleren", pasted: "Vacature bewaard. Je vindt deze bij Mijn sollicitaties.",
    all: "Alle statussen", status: "Status", noApplications: "Je hebt nog geen vacatures bewaard", noApplicationsBody: "Zoek een vacature of voeg er zelf een toe om je sollicitaties bij te houden.", filteredEmpty: "Geen sollicitaties met deze status.",
    tailor: "Maak een CV voor deze vacature", openCv: "Open bijbehorend CV", copyNote: "We maken een aparte kopie. In de editor kun je wijzigingen bekijken voordat je ze toepast. Je originele CV blijft behouden.", chooseCv: "Kies bovenaan een CV om een kopie te maken.", noDescription: "Deze vacature heeft te weinig tekst om je CV erop af te stemmen.",
    applyNote: "Solliciteren doe je bij de aanbieder. Werk daarna hier zelf je status bij.", aiOff: "Je kunt de kopie handmatig aanpassen. AI-suggesties zijn momenteel niet beschikbaar.",
    results: "recente vacatures", cached: "Eerder opgehaalde resultaten", fresh: "Zojuist opgehaald", expired: "De opgegeven sluitingsdatum is verstreken. Controleer of solliciteren nog kan.",
    statusLabels: { saved: "Bewaard", applied: "Gesolliciteerd", interview: "Gesprek", offer: "Aanbod", rejected: "Afgewezen" },
  },
  en: {
    title: "Jobs for you", applications: "My applications", intro: "Find work that fits your experience. Save a vacancy and create a version of your CV for it.",
    trackerIntro: "Track your applications and open the CV linked to each vacancy.",
    cv: "Use this CV", noCv: "Search without a CV", role: "Target role", location: "City or region", remote: "Remote only", search: "Find jobs", searching: "Searching…",
    privacy: "We search using your role and region. Your CV and contact details are not sent to the job provider.",
    preferences: "These preferences come from your CV. Change them if you are looking for something different.",
    first: "Where would you like to work?", firstBody: "Enter a role and region. We search recent vacancies in the Netherlands and show skills that also appear in your CV.",
    empty: "No jobs found", emptyBody: "Try another job title, a wider region or turn off the remote filter. You can also add a vacancy yourself.",
    saved: "Saved", save: "Save vacancy", detail: "Read job description", visit: "View on provider website", source: "Via JSearch", manualSource: "Added by you", remoteTag: "Remote", posted: "Posted", unknownDate: "Date unknown",
    matches: "Also in your CV", missing: "Listed in vacancy, not found in your CV", noMatch: "No explicit skill overlap found. Read the vacancy to decide whether it suits you.", evidence: "This is text overlap, not a prediction of your chances of getting hired.",
    paste: "Add your own vacancy", pasteIntro: "Paste a vacancy you found elsewhere. Save it and tailor your CV to it.",
    jobTitle: "Job title", company: "Employer", description: "Full job description", url: "Vacancy link (optional)", add: "Save my vacancy", cancel: "Cancel", pasted: "Vacancy saved. You can find it in My applications.",
    all: "All statuses", status: "Status", noApplications: "No saved vacancies yet", noApplicationsBody: "Find a vacancy or add your own to start tracking your applications.", filteredEmpty: "No applications with this status.",
    tailor: "Create a CV for this vacancy", openCv: "Open linked CV", copyNote: "We create a separate copy. Review changes in the editor before applying them. Your original CV is preserved.", chooseCv: "Choose a CV above to create a copy.", noDescription: "This vacancy has too little text to tailor your CV.",
    applyNote: "Apply on the provider website, then update your status here yourself.", aiOff: "You can edit the copy manually. AI suggestions are currently unavailable.",
    results: "recent vacancies", cached: "Previously fetched results", fresh: "Just fetched", expired: "The stated closing date has passed. Check whether applications are still open.",
    statusLabels: { saved: "Saved", applied: "Applied", interview: "Interview", offer: "Offer", rejected: "Rejected" },
  },
};

const ERRORS: Record<AppLocale, Record<JobErrorCode, string>> = {
  nl: { AUTH: "Log opnieuw in om verder te gaan.", DISABLED: "Deze werkruimte is niet beschikbaar.", INVALID: "Controleer je invoer. Vul bij een eigen vacature minstens 40 tekens vacaturetekst in.", NOT_FOUND: "Dit CV of deze vacature is niet meer beschikbaar. Vernieuw de pagina.", UNAVAILABLE: "Dit lukte niet. Probeer het later opnieuw. Je kunt ook zelf een vacature toevoegen.", QUOTA: "De zoeklimiet is bereikt. Probeer later opnieuw of voeg zelf een vacature toe.", NOT_CONFIGURED: "Vacatures zoeken is nog niet beschikbaar. Je kunt wel zelf een vacature toevoegen.", BUSY: "Er wordt al gezocht. Probeer het zo opnieuw." },
  en: { AUTH: "Log in again to continue.", DISABLED: "This workspace is unavailable.", INVALID: "Check your input. An added vacancy needs at least 40 characters of description.", NOT_FOUND: "This CV or vacancy is no longer available. Refresh the page.", UNAVAILABLE: "That did not work. Try again later, or add your own vacancy.", QUOTA: "The search limit has been reached. Try again later or add your own vacancy.", NOT_CONFIGURED: "Job search is not available yet. You can still add your own vacancy.", BUSY: "A search is already running. Try again shortly." },
};
const field = "mt-1.5 min-h-11 w-full rounded-xl border border-[var(--wk-border-strong)] bg-white px-3 py-2.5 text-[15px] font-normal focus:outline-2 focus:outline-offset-2 focus:outline-[var(--wk-focus)]";
const secondary = "inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--wk-border-strong)] bg-white px-4 py-2 text-sm font-bold hover:bg-[var(--wk-surface-subtle)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--wk-focus)] disabled:cursor-not-allowed disabled:opacity-50";
const primary = "inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--wk-primary)] px-4 py-2 text-sm font-bold text-white hover:bg-[var(--wk-primary-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--wk-focus)] disabled:cursor-not-allowed disabled:opacity-50";

export default function JobsWorkspace({ locale, view, cvs, initialApplications, aiEnabled }: {
  locale: AppLocale; view: "jobs" | "applications"; cvs: CvChoice[]; initialApplications: SavedApplication[]; aiEnabled: boolean;
}) {
  const c = COPY[locale];
  const paths = appPaths(locale);
  const router = useRouter();
  const [cvId, setCvId] = useState(cvs[0]?.id ?? "");
  const [role, setRole] = useState(cvs[0]?.role ?? "");
  const [location, setLocation] = useState(cvs[0]?.location || (locale === "en" ? "Netherlands" : "Nederland"));
  const [remote, setRemote] = useState(false);
  const [results, setResults] = useState<{ results: JobResult[]; searchKey: string; cached: boolean } | null>(null);
  const [applications, setApplications] = useState(initialApplications);
  const [filter, setFilter] = useState<ApplicationStatus | "all">("all");
  const [showManual, setShowManual] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<JobErrorCode | null>(null);
  const [notice, setNotice] = useState("");
  const [manual, setManual] = useState({ title: "", company: "", location: "", description: "", url: "" });
  async function work(name: string, action: () => Promise<void>) {
    if (busy) return;
    setBusy(name); setError(null); setNotice("");
    try { await action(); } catch { setError("UNAVAILABLE"); } finally { setBusy(null); }
  }
  function remember(saved: SavedApplication) {
    setApplications(prev => [saved, ...prev.filter(item => item.id !== saved.id)]);
  }
  const editorUrl = (id: string) => `${paths.editorBase}?id=${encodeURIComponent(id)}&${locale === "en" ? "step" : "stap"}=afronden#target-vacancy`;

  function card(job: AppJob, saved?: SavedApplication, match?: JobResult["match"]) {
    const expired = job.expiresAt && new Date(job.expiresAt) < new Date();
    return <article key={saved?.id ?? job.key} className="rounded-2xl border border-[var(--wk-border)] bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-wide text-[var(--wk-ink-muted)]">{job.company || (job.source === "manual" ? c.manualSource : c.source)}</p>
          <h2 className="mt-1 break-words text-xl font-extrabold">{job.title}</h2>
          <p className="mt-2 text-sm text-[var(--wk-ink-muted)]">{job.location}{job.remote ? ` · ${c.remoteTag}` : ""}</p>
        </div>
        {saved && <span className="rounded-full bg-[var(--wk-accent-soft)] px-3 py-1.5 text-xs font-bold text-[var(--wk-primary)]">{c.statusLabels[saved.status]}</span>}
      </div>
      <p className="mt-3 text-xs text-[var(--wk-ink-muted)]">{job.source === "jsearch" ? c.source : c.manualSource} · {job.postedAt ? `${c.posted} ${new Intl.DateTimeFormat(locale === "nl" ? "nl-NL" : "en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(job.postedAt))}` : c.unknownDate}</p>
      {expired && <p className="mt-3 text-sm text-amber-900">{c.expired}</p>}
      {match && cvId && <div className="mt-4 rounded-xl bg-[var(--wk-surface-subtle)] p-3 text-sm">
        {match.matched.length > 0 ? <p><strong>{c.matches}:</strong> {match.matched.join(", ")}</p> : <p>{c.noMatch}</p>}
        {match.notInCv.length > 0 && <p className="mt-2"><strong>{c.missing}:</strong> {match.notInCv.join(", ")}</p>}
        <p className="mt-2 text-xs text-[var(--wk-ink-muted)]">{c.evidence}</p>
      </div>}
      {job.description && <details className="mt-4">
        <summary className="flex min-h-11 cursor-pointer items-center rounded-lg text-sm font-bold underline underline-offset-4 focus-visible:outline-2">{c.detail}</summary>
        <p className="mt-2 max-h-96 overflow-y-auto whitespace-pre-wrap break-words rounded-xl bg-[var(--wk-surface-subtle)] p-4 text-sm leading-relaxed">{job.description}</p>
      </details>}
      <div className="mt-4 flex flex-wrap gap-2">
        {!saved && results && <button className={primary} disabled={!!busy} onClick={() => void work(job.key, async () => {
          const response = await saveVacancy({ searchKey: results.searchKey, jobKey: job.key });
          if (response.ok) { remember(response.value); track("job_saved", { locale, source: "search" }); } else setError(response.code);
        })}>{busy === job.key ? "…" : c.save}</button>}
        {job.url && <a className={secondary} href={job.url} target="_blank" rel="noopener noreferrer">{c.visit} ↗</a>}
        {saved?.tailoredCvId ? <Link className={primary} href={editorUrl(saved.tailoredCvId)}>{c.openCv}</Link> : saved && <button className={primary} disabled={!!busy || !cvId || job.description.trim().length < 40} onClick={() => void work(saved.id, async () => {
          const response = await tailorForJob({ id: saved.id, cvId, locale });
          if (!response.ok) { setError(response.code); return; }
          track("job_tailored_cv_created", { locale, reused: response.value.reused });
          remember({ ...saved, tailoredCvId: response.value.cvId });
          router.push(editorUrl(response.value.cvId));
        })}>{busy === saved.id ? "…" : c.tailor}</button>}
      </div>
      {saved && <>
        {!saved.tailoredCvId && <p className="mt-3 text-xs leading-relaxed text-[var(--wk-ink-muted)]">{!cvId ? c.chooseCv : job.description.trim().length < 40 ? c.noDescription : c.copyNote}{!aiEnabled ? ` ${c.aiOff}` : ""}</p>}
        {view === "applications" && <div className="mt-4 border-t border-[var(--wk-border)] pt-4">
          <label className="block max-w-xs text-sm font-bold">{c.status}
            <select className={field} value={saved.status} disabled={!!busy} onChange={event => {
              const status = event.target.value as ApplicationStatus;
              void work(saved.id, async () => {
                const response = await changeJobStatus({ id: saved.id, status });
                if (response.ok) { remember({ ...saved, status }); track("job_status_changed", { locale, status }); } else setError(response.code);
              });
            }}>{applicationStatuses.map(status => <option key={status} value={status}>{c.statusLabels[status]}</option>)}</select>
          </label>
          <p className="mt-2 text-xs text-[var(--wk-ink-muted)]">{c.applyNote}</p>
        </div>}
      </>}
    </article>;
  }

  return <main className="mx-auto max-w-6xl px-4 py-7 sm:px-7 sm:py-10">
    <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{view === "jobs" ? c.title : c.applications}</h1>
    <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--wk-ink-muted)]">{view === "jobs" ? c.intro : c.trackerIntro}</p>
    <nav className="mt-6 flex flex-wrap gap-2" aria-label={locale === "nl" ? "Vacatures en sollicitaties" : "Jobs and applications"}>
      <Link className={view === "jobs" ? primary : secondary} aria-current={view === "jobs" ? "page" : undefined} href={paths.jobs}>{c.title}</Link>
      <Link className={view === "applications" ? primary : secondary} aria-current={view === "applications" ? "page" : undefined} href={paths.applications}>{c.applications} ({applications.length})</Link>
      <button className={secondary} aria-expanded={showManual} aria-controls="manual-vacancy" onClick={() => setShowManual(!showManual)}>{c.paste}</button>
    </nav>
    {error && <div role="alert" className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">{ERRORS[locale][error]}{error === "AUTH" && <Link className="ml-2 underline" href={`/login?locale=${locale}&next=${encodeURIComponent(view === "jobs" ? paths.jobs : paths.applications)}`}>Log in</Link>}</div>}
    {notice && <p role="status" className="mt-5 rounded-xl bg-[var(--wk-accent-soft)] p-4 text-sm">{notice}</p>}
    {showManual && <form id="manual-vacancy" className="mt-6 space-y-4 rounded-2xl border border-[var(--wk-border)] bg-white p-5 sm:p-6" onSubmit={event => {
      event.preventDefault(); void work("manual", async () => {
        const response = await addManualVacancy(manual);
        if (!response.ok) { setError(response.code); return; }
        track("job_saved", { locale, source: "manual" });
        remember(response.value); setShowManual(false); setNotice(c.pasted); setManual({ title: "", company: "", location: "", description: "", url: "" });
      });
    }}>
      <h2 className="text-xl font-extrabold">{c.paste}</h2><p className="text-sm text-[var(--wk-ink-muted)]">{c.pasteIntro}</p>
      <div className="grid gap-4 sm:grid-cols-2">{([['title', c.jobTitle], ['company', c.company], ['location', c.location], ['url', c.url]] as const).map(([name, label]) => <label key={name} className="text-sm font-bold">{label}<input className={field} type={name === "url" ? "url" : "text"} required={name === "title"} minLength={name === "title" ? 2 : undefined} maxLength={name === "url" ? 2048 : 200} value={manual[name]} onChange={e => setManual({ ...manual, [name]: e.target.value })} /></label>)}</div>
      <label className="block text-sm font-bold">{c.description}<textarea className={`${field} min-h-44`} required minLength={40} maxLength={18000} value={manual.description} onChange={e => setManual({ ...manual, description: e.target.value })} /></label>
      <div className="flex gap-2"><button className={primary} disabled={!!busy}>{busy === "manual" ? "…" : c.add}</button><button type="button" className={secondary} onClick={() => setShowManual(false)}>{c.cancel}</button></div>
    </form>}
    <form className="my-6 rounded-2xl border border-[var(--wk-border)] bg-white p-5 sm:p-6" onSubmit={event => {
      event.preventDefault(); if (view !== "jobs") return;
      void work("search", async () => {
        setResults(null);
        const response = await findJobs({ ...(cvId ? { cvId } : {}), role, location, remote, locale });
        // Counts only: no role, region or CV text in analytics.
        track("job_search_submitted", response.ok
          ? { locale, remote, with_cv: Boolean(cvId), outcome: "ok", results: response.value.results.length, cached: response.value.cached }
          : { locale, remote, with_cv: Boolean(cvId), outcome: "error", results: 0, cached: false, error: response.code });
        if (response.ok) setResults(response.value); else setError(response.code);
      });
    }}>
      <label className="block max-w-lg text-sm font-bold">{c.cv}<select className={field} value={cvId} disabled={!!busy} onChange={event => {
        setCvId(event.target.value); setResults(null);
        const cv = cvs.find(cv => cv.id === event.target.value);
        if (cv) { setRole(cv.role); setLocation(cv.location || (locale === "en" ? "Netherlands" : "Nederland")); }
      }}><option value="">{c.noCv}</option>{cvs.map(cv => <option key={cv.id} value={cv.id}>{cv.title}</option>)}</select></label>
      {view === "jobs" && <>
        {cvId && <p className="mt-2 text-xs text-[var(--wk-ink-muted)]">{c.preferences}</p>}
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-bold">{c.role}<input className={field} required minLength={2} maxLength={120} value={role} disabled={!!busy} onChange={e => { setRole(e.target.value); setResults(null); }} /></label>
          <label className="text-sm font-bold">{c.location}<input className={field} required minLength={2} maxLength={100} value={location} disabled={!!busy} onChange={e => { setLocation(e.target.value); setResults(null); }} /></label>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><label className="flex min-h-11 items-center gap-3 text-sm font-bold"><input type="checkbox" className="h-5 w-5 accent-[var(--wk-primary)]" checked={remote} disabled={!!busy} onChange={e => { setRemote(e.target.checked); setResults(null); }} />{c.remote}</label><button className={primary} disabled={!!busy}>{busy === "search" ? c.searching : c.search}</button></div>
        <p className="mt-3 text-xs leading-relaxed text-[var(--wk-ink-muted)]">{c.privacy}</p>
      </>}
    </form>
    <div aria-live="polite" aria-busy={busy === "search"}>
      {view === "jobs" ? results ? <>
        <p className="mb-4 text-sm text-[var(--wk-ink-muted)]">{results.results.length} {c.results} · {results.cached ? c.cached : c.fresh}</p>
        {results.results.length ? <div className="space-y-4">{results.results.map(({ job, match }) => card(job, applications.find(a => a.job.key === job.key), match))}</div> : <Empty title={c.empty} body={c.emptyBody} />}
      </> : !busy && <Empty title={c.first} body={c.firstBody} /> : <>
        <label className="mb-5 block max-w-xs text-sm font-bold">{c.status}<select className={field} value={filter} onChange={e => setFilter(e.target.value as ApplicationStatus | "all")}><option value="all">{c.all}</option>{applicationStatuses.map(status => <option key={status} value={status}>{c.statusLabels[status]} ({applications.filter(a => a.status === status).length})</option>)}</select></label>
        {!applications.length ? <Empty title={c.noApplications} body={c.noApplicationsBody} /> : <div className="space-y-4">{applications.filter(a => filter === "all" || a.status === filter).map(saved => card(saved.job, saved))}{!applications.some(a => filter === "all" || a.status === filter) && <p className="py-10 text-center">{c.filteredEmpty}</p>}</div>}
      </>}
    </div>
  </main>;
}

function Empty({ title, body }: { title: string; body: string }) {
  return <div className="rounded-2xl border-2 border-dashed border-[var(--wk-border-strong)] px-6 py-12 text-center"><h2 className="text-xl font-extrabold">{title}</h2><p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[var(--wk-ink-muted)]">{body}</p></div>;
}
