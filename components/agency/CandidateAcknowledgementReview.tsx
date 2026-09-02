"use client";

import { useEffect, useMemo, useState } from "react";
import type { CVData } from "@/lib/cv";
import type { MatchPackSubmission } from "@/lib/agency-matchpack";
import type { CandidateReviewSnapshotV1 } from "@/lib/agency-candidate-review";

type LoadedReview = {
  id: string;
  snapshotData: CandidateReviewSnapshotV1;
  status: string;
  candidateResponse: string | null;
  respondedAt: string | null;
};

type Suggestion = {
  targetType: "candidate_cv" | "client_introduction" | "client_email" | "commercial_fact";
  targetPath: string;
  originalValue: string;
  proposedValue: string;
  candidateNote: string;
};

const card = "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7";
const button = "min-h-12 rounded-xl border border-slate-900 px-5 py-3 text-sm font-extrabold transition disabled:cursor-not-allowed disabled:opacity-50";

function formatRange(start: string, end: string) {
  return [start, end].filter(Boolean).join(" – ");
}

function candidateCopy(locale: "nl" | "en") {
  const en = locale === "en";
  return {
    loading: en ? "Secure review is loading…" : "Beveiligde review wordt geladen…",
    privateReview: en ? "Private candidate review" : "Privé kandidaatcontrole",
    openTitle: en ? "Open the proposal only when you are ready to review it." : "Open het voorstel wanneer je klaar bent om het te controleren.",
    openBody: en ? "The link is single-use. Selecting the button opens a 60-minute review session. Opening this link shows control of the mailbox only; it is not identity verification or an electronic signature." : "De link is eenmalig te gebruiken. Met de knop open je een reviewsessie van 60 minuten. Toegang tot deze mailbox is geen identiteitscontrole of elektronische handtekening.",
    opening: en ? "Opening…" : "Openen…",
    open: en ? "Open proposal" : "Open voorstel",
    unavailableTitle: en ? "This review is unavailable." : "Deze review is niet beschikbaar.",
    unavailableBody: en ? "The invitation may have expired, been used or been withdrawn. Ask the recruitment agency for a new invitation." : "De uitnodiging kan verlopen, gebruikt of ingetrokken zijn. Vraag het recruitmentbureau om een nieuwe uitnodiging.",
    recorded: en ? "Response recorded" : "Reactie vastgelegd",
    thankYou: en ? "Thank you. The agency can now continue." : "Bedankt. Het bureau kan nu verder.",
    exactVersion: en ? "Your response applies only to the exact version shown in this review. A changed version requires a new invitation." : "Je reactie geldt alleen voor de exacte versie in deze review. Voor een gewijzigde versie is een nieuwe uitnodiging nodig.",
    acknowledgement: en ? "Candidate acknowledgement" : "Kandidaatbevestiging",
    checkShare: (agency: string) => en ? `Check exactly what ${agency} plans to share.` : `Controleer precies wat ${agency} wil delen.`,
    recipient: en ? "Intended recipient" : "Beoogde ontvanger",
    vacancy: en ? "Vacancy" : "Vacature",
    ai: en ? "AI helped compare proposal claims with the supplied CV. It does not verify your identity or determine whether you are suitable. The recruiter remains responsible for the final version." : "AI hielp voorstelclaims te vergelijken met het aangeleverde CV. Dit controleert je identiteit of geschiktheid niet. De recruiter blijft verantwoordelijk voor de definitieve versie.",
    retention: en ? "Scheduled retention date" : "Geplande bewaartermijn tot",
    privacy: en ? "Privacy information" : "Privacy-informatie",
    selectedCv: en ? "Selected CV information" : "Geselecteerde CV-informatie",
    directMissing: en ? "Direct contact details are not included." : "Directe contactgegevens zijn niet opgenomen.",
    profile: en ? "Profile" : "Profiel",
    education: en ? "Education" : "Opleidingen",
    skills: en ? "Skills" : "Vaardigheden",
    proposal: en ? "Client-facing proposal" : "Voorstel voor de opdrachtgever",
    introduction: en ? "Introduction" : "Introductie",
    email: en ? "Accompanying email" : "Begeleidende e-mail",
    changing: en ? "Changing information" : "Veranderlijke informatie",
    notProvided: en ? "Not provided" : "Niet opgegeven",
    suggest: en ? "Suggest a correction" : "Stel een correctie voor",
    suggestBody: en ? "Suggestions do not alter the proposal automatically. The recruiter must accept or reject each one, and an accepted change requires a new review invitation." : "Suggesties wijzigen het voorstel niet automatisch. De recruiter accepteert of weigert iedere suggestie; een geaccepteerde wijziging vereist een nieuwe reviewuitnodiging.",
    section: en ? "Section" : "Onderdeel",
    choose: en ? "Choose a section" : "Kies een onderdeel",
    proposed: en ? "Proposed wording" : "Voorgestelde tekst",
    optional: en ? "Optional explanation" : "Optionele toelichting",
    add: en ? "Add correction" : "Correctie toevoegen",
    remove: en ? "Remove" : "Verwijderen",
    responseTitle: en ? "Your response to this version" : "Jouw reactie op deze versie",
    responseBody: en ? "Confirmation means the displayed information is correct to your knowledge and may be shared with the named organisation for this vacancy. It is not consent wording, identity verification or an electronic signature." : "Bevestiging betekent dat de getoonde informatie naar jouw weten klopt en voor deze vacature met de genoemde organisatie mag worden gedeeld. Dit is geen toestemmingstekst, identiteitscontrole of elektronische handtekening.",
    confirm: en ? "Confirm displayed information" : "Getoonde informatie bevestigen",
    sendCorrections: (count: number) => en ? `Send ${count} correction${count === 1 ? "" : "s"}` : `${count} correctie${count === 1 ? "" : "s"} versturen`,
    decline: en ? "Decline sharing this version" : "Delen van deze versie weigeren",
    saveError: en ? "Your response could not be saved." : "Je reactie kon niet worden opgeslagen.",
  };
}

export default function CandidateAcknowledgementReview() {
  const [requestedLocale, setRequestedLocale] = useState<"nl" | "en">("nl");
  const [fragmentToken, setFragmentToken] = useState("");
  const [review, setReview] = useState<LoadedReview | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "opening" | "review" | "submitted" | "unavailable">("loading");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedCorrection, setSelectedCorrection] = useState("");
  const [proposedValue, setProposedValue] = useState("");
  const [candidateNote, setCandidateNote] = useState("");

  async function loadCurrent() {
    const response = await fetch("/api/candidate-review/current", { cache: "no-store", credentials: "same-origin" });
    const body = await response.json().catch(() => ({}));
    if (!response.ok || !body.review) return false;
    setReview(body.review);
    setState(body.review.respondedAt ? "submitted" : "review");
    return true;
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const token = params.get("token") || "";
      setRequestedLocale(new URLSearchParams(window.location.search).get("lang") === "en" ? "en" : "nl");
      setFragmentToken(token);
      void loadCurrent().then((loaded) => setState((current) => loaded ? current : token ? "ready" : "unavailable"));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  async function openReview() {
    if (!fragmentToken) return;
    setState("opening");
    setError("");
    const response = await fetch("/api/candidate-review/exchange", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: fragmentToken }),
    });
    if (!response.ok) {
      setState("unavailable");
      return;
    }
    window.history.replaceState(null, "", window.location.pathname);
    setFragmentToken("");
    if (!await loadCurrent()) setState("unavailable");
  }

  const displayLocale = review?.snapshotData.locale || requestedLocale;
  const t = candidateCopy(displayLocale);
  const correctionOptions = useMemo(() => {
    if (!review) return [] as Array<{ key: string; label: string; type: Suggestion["targetType"]; path: string; value: string }>;
    const cv = review.snapshotData.candidateData as CVData;
    const submission = review.snapshotData.submissionData as MatchPackSubmission;
    return [
      cv.personal.summary ? { key: "cv-summary", label: `CV — ${displayLocale === "en" ? "profile" : "profiel"}`, type: "candidate_cv" as const, path: "personal.summary", value: cv.personal.summary } : null,
      ...cv.experience.flatMap((item, index) => item.description ? [{ key: `experience-${index}`, label: `CV — ${item.role || `${displayLocale === "en" ? "experience" : "ervaring"} ${index + 1}`}`, type: "candidate_cv" as const, path: `experience.${index}.description`, value: item.description }] : []),
      { key: "introduction", label: displayLocale === "en" ? "Client introduction" : "Klantintroductie", type: "client_introduction" as const, path: "clientIntroduction", value: submission.clientIntroduction },
      { key: "email", label: displayLocale === "en" ? "Accompanying email" : "Begeleidende e-mail", type: "client_email" as const, path: "clientEmailBody", value: submission.clientEmailBody },
      ...Object.entries(submission.commercial).filter(([, value]) => value).map(([key, value]) => ({ key: `commercial-${key}`, label: `${displayLocale === "en" ? "Current information" : "Actuele informatie"} — ${key}`, type: "commercial_fact" as const, path: `commercial.${key}`, value })),
    ].filter((option): option is NonNullable<typeof option> => Boolean(option));
  }, [displayLocale, review]);

  function chooseCorrection(key: string) {
    setSelectedCorrection(key);
    const option = correctionOptions.find((item) => item.key === key);
    setProposedValue(option?.value || "");
  }

  function addSuggestion() {
    const option = correctionOptions.find((item) => item.key === selectedCorrection);
    if (!option || !proposedValue.trim() || proposedValue.trim() === option.value.trim()) return;
    setSuggestions((current) => [...current.filter((item) => item.targetPath !== option.path), {
      targetType: option.type,
      targetPath: option.path,
      originalValue: option.value,
      proposedValue: proposedValue.trim(),
      candidateNote: candidateNote.trim(),
    }]);
    setSelectedCorrection("");
    setProposedValue("");
    setCandidateNote("");
  }

  async function submit(responseValue: "confirmed" | "declined" | "corrections_requested") {
    if (responseValue === "corrections_requested" && !suggestions.length) return;
    setError("");
    const response = await fetch("/api/candidate-review/respond", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ response: responseValue, suggestions: responseValue === "corrections_requested" ? suggestions : [] }),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      setError(body.error || t.saveError);
      return;
    }
    setReview((current) => current ? { ...current, candidateResponse: responseValue, respondedAt: new Date().toISOString() } : current);
    setState("submitted");
  }

  if (state === "loading") return <main className="mx-auto min-h-screen max-w-3xl px-4 py-16"><p className="text-sm font-semibold text-slate-600">{t.loading}</p></main>;
  if (state === "ready" || state === "opening") return <main className="mx-auto flex min-h-screen max-w-xl items-center px-4 py-16"><section className={card}><p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">{t.privateReview}</p><h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">{t.openTitle}</h1><p className="mt-4 text-sm leading-6 text-slate-700">{t.openBody}</p><button className={`${button} mt-6 bg-emerald-400`} type="button" onClick={() => void openReview()} disabled={state === "opening"}>{state === "opening" ? t.opening : t.open}</button></section></main>;
  if (state === "unavailable") return <main className="mx-auto flex min-h-screen max-w-xl items-center px-4 py-16"><section className={card}><h1 className="text-3xl font-black text-slate-950">{t.unavailableTitle}</h1><p className="mt-4 text-sm leading-6 text-slate-700">{t.unavailableBody}</p></section></main>;
  if (!review) return null;

  const snapshot = review.snapshotData;
  const cv = snapshot.candidateData as CVData;
  const submission = snapshot.submissionData as MatchPackSubmission;
  if (state === "submitted") return <main className="mx-auto flex min-h-screen max-w-xl items-center px-4 py-16"><section className={card}><p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">{t.recorded}</p><h1 className="mt-3 text-3xl font-black text-slate-950">{t.thankYou}</h1><p className="mt-4 text-sm leading-6 text-slate-700">{t.exactVersion}</p></section></main>;

  return <main className="min-h-screen bg-[#f8f7f2] px-4 py-8 text-slate-950 sm:py-12">
    <div className="mx-auto max-w-4xl space-y-5">
      <header className={card}>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">{t.acknowledgement}</p>
        <h1 className="mt-3 break-words text-3xl font-black tracking-tight sm:text-5xl">{t.checkShare(snapshot.agency.legalName)}</h1>
        <p className="mt-4 leading-7 text-slate-700">{t.recipient}: <strong>{snapshot.recipientOrganization}</strong>. {t.vacancy}: <strong>{snapshot.vacancyTitle}</strong>.</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">{t.ai}</p>
        <p className="mt-3 text-sm text-slate-600">{t.retention}: {new Date(snapshot.retentionExpiresAt).toLocaleDateString(snapshot.locale === "nl" ? "nl-NL" : "en-GB")}. <a className="font-bold text-emerald-800 underline" href={snapshot.agency.privacyPolicyUrl} rel="noreferrer" target="_blank">{t.privacy}</a> · {snapshot.agency.privacyContactEmail}</p>
      </header>

      <section className={card}>
        <h2 className="text-2xl font-black">{t.selectedCv}</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2"><p><strong>{cv.personal.name}</strong><br />{cv.personal.title}</p><p className="break-words text-sm text-slate-700">{[cv.personal.email, cv.personal.phone, cv.personal.location].filter(Boolean).join(" · ") || t.directMissing}</p></div>
        {cv.personal.summary ? <div className="mt-5"><h3 className="font-extrabold">{t.profile}</h3><p className="mt-2 whitespace-pre-wrap leading-7 text-slate-700">{cv.personal.summary}</p></div> : null}
        <div className="mt-6 space-y-5">{cv.experience.map((item, index) => <article key={`${item.role}-${index}`} className="border-t border-slate-200 pt-4"><h3 className="font-extrabold">{item.role}{item.company ? ` · ${item.company}` : ""}</h3><p className="mt-1 text-sm text-slate-500">{formatRange(item.start, item.end)}{item.location ? ` · ${item.location}` : ""}</p><p className="mt-2 whitespace-pre-wrap leading-7 text-slate-700">{item.description}</p>{item.highlights.length ? <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">{item.highlights.map((value) => <li key={value}>{value}</li>)}</ul> : null}</article>)}</div>
        {cv.education.length ? <div className="mt-6"><h3 className="font-extrabold">{t.education}</h3>{cv.education.map((item, index) => <p className="mt-2 text-slate-700" key={`${item.degree}-${index}`}>{item.degree}{item.school ? ` · ${item.school}` : ""} <span className="text-sm text-slate-500">{formatRange(item.start, item.end)}</span></p>)}</div> : null}
        {cv.skills.length ? <p className="mt-6 text-sm text-slate-700"><strong>{t.skills}:</strong> {cv.skills.map((item) => item.name).join(", ")}</p> : null}
      </section>

      <section className={card}><h2 className="text-2xl font-black">{t.proposal}</h2><h3 className="mt-5 font-extrabold">{t.introduction}</h3><p className="mt-2 whitespace-pre-wrap leading-7 text-slate-700">{submission.clientIntroduction}</p><h3 className="mt-6 font-extrabold">{t.email}</h3><p className="mt-2 font-bold">{submission.clientEmailSubject}</p><p className="mt-2 whitespace-pre-wrap leading-7 text-slate-700">{submission.clientEmailBody}</p></section>
      <section className={card}><h2 className="text-2xl font-black">{t.changing}</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{Object.entries(submission.commercial).map(([key, value]) => <div className="rounded-xl bg-slate-50 p-4" key={key}><p className="break-words text-xs font-black uppercase tracking-wide text-slate-500">{key}</p><p className="mt-1 break-words font-bold">{value || t.notProvided}</p></div>)}</div></section>

      <section className={card}><h2 className="text-2xl font-black">{t.suggest}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{t.suggestBody}</p><label className="mt-5 block text-sm font-bold">{t.section}<select className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3" value={selectedCorrection} onChange={(event) => chooseCorrection(event.target.value)}><option value="">{t.choose}</option>{correctionOptions.map((option) => <option value={option.key} key={option.key}>{option.label}</option>)}</select></label>{selectedCorrection ? <><label className="mt-4 block text-sm font-bold">{t.proposed}<textarea className="mt-2 min-h-32 w-full rounded-xl border border-slate-300 p-3 font-normal" value={proposedValue} onChange={(event) => setProposedValue(event.target.value)} /></label><label className="mt-4 block text-sm font-bold">{t.optional}<textarea className="mt-2 min-h-20 w-full rounded-xl border border-slate-300 p-3 font-normal" value={candidateNote} onChange={(event) => setCandidateNote(event.target.value)} /></label><button type="button" className={`${button} mt-4 bg-white`} onClick={addSuggestion}>{t.add}</button></> : null}{suggestions.length ? <ul className="mt-5 space-y-3">{suggestions.map((item) => <li className="rounded-xl border border-amber-300 bg-amber-50 p-4" key={item.targetPath}><strong>{item.targetPath}</strong><p className="mt-1 text-sm">{item.proposedValue}</p><button type="button" className="mt-2 text-sm font-bold underline" onClick={() => setSuggestions((current) => current.filter((value) => value.targetPath !== item.targetPath))}>{t.remove}</button></li>)}</ul> : null}</section>

      {error ? <p role="alert" className="rounded-xl border border-red-300 bg-red-50 p-4 font-bold text-red-900">{error}</p> : null}
      <section className={`${card} bg-emerald-50`}><h2 className="text-2xl font-black">{t.responseTitle}</h2><p className="mt-2 text-sm leading-6 text-slate-700">{t.responseBody}</p><div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><button type="button" className={`${button} bg-emerald-400`} onClick={() => void submit("confirmed")}>{t.confirm}</button><button type="button" className={`${button} bg-amber-200`} disabled={!suggestions.length} onClick={() => void submit("corrections_requested")}>{t.sendCorrections(suggestions.length)}</button><button type="button" className={`${button} bg-white text-red-800`} onClick={() => void submit("declined")}>{t.decline}</button></div></section>
    </div>
  </main>;
}
