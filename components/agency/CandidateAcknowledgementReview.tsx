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

export default function CandidateAcknowledgementReview() {
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

  const correctionOptions = useMemo(() => {
    if (!review) return [] as Array<{ key: string; label: string; type: Suggestion["targetType"]; path: string; value: string }>;
    const cv = review.snapshotData.candidateData as CVData;
    const submission = review.snapshotData.submissionData as MatchPackSubmission;
    return [
      cv.personal.summary ? { key: "cv-summary", label: "CV — profile", type: "candidate_cv" as const, path: "personal.summary", value: cv.personal.summary } : null,
      ...cv.experience.flatMap((item, index) => item.description ? [{ key: `experience-${index}`, label: `CV — ${item.role || `experience ${index + 1}`}`, type: "candidate_cv" as const, path: `experience.${index}.description`, value: item.description }] : []),
      { key: "introduction", label: "Client introduction", type: "client_introduction" as const, path: "clientIntroduction", value: submission.clientIntroduction },
      { key: "email", label: "Accompanying email", type: "client_email" as const, path: "clientEmailBody", value: submission.clientEmailBody },
      ...Object.entries(submission.commercial).filter(([, value]) => value).map(([key, value]) => ({ key: `commercial-${key}`, label: `Current information — ${key}`, type: "commercial_fact" as const, path: `commercial.${key}`, value })),
    ].filter((option): option is NonNullable<typeof option> => Boolean(option));
  }, [review]);

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
      setError(body.error || "Your response could not be saved.");
      return;
    }
    setReview((current) => current ? { ...current, candidateResponse: responseValue, respondedAt: new Date().toISOString() } : current);
    setState("submitted");
  }

  if (state === "loading") return <main className="mx-auto min-h-screen max-w-3xl px-4 py-16"><p className="text-sm font-semibold text-slate-600">Secure review is loading…</p></main>;
  if (state === "ready" || state === "opening") return <main className="mx-auto flex min-h-screen max-w-xl items-center px-4 py-16"><section className={card}><p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Private candidate review</p><h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Open the proposal only when you are ready to review it.</h1><p className="mt-4 text-sm leading-6 text-slate-700">The link is single-use. Selecting the button opens a 60-minute review session. Opening this link shows control of the mailbox only; it is not identity verification or an electronic signature.</p><button className={`${button} mt-6 bg-emerald-400`} type="button" onClick={() => void openReview()} disabled={state === "opening"}>{state === "opening" ? "Opening…" : "Open proposal"}</button></section></main>;
  if (state === "unavailable") return <main className="mx-auto flex min-h-screen max-w-xl items-center px-4 py-16"><section className={card}><h1 className="text-3xl font-black text-slate-950">This review is unavailable.</h1><p className="mt-4 text-sm leading-6 text-slate-700">The invitation may have expired, been used or been withdrawn. Ask the recruitment agency for a new invitation.</p></section></main>;
  if (!review) return null;

  const snapshot = review.snapshotData;
  const cv = snapshot.candidateData as CVData;
  const submission = snapshot.submissionData as MatchPackSubmission;
  if (state === "submitted") return <main className="mx-auto flex min-h-screen max-w-xl items-center px-4 py-16"><section className={card}><p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Response recorded</p><h1 className="mt-3 text-3xl font-black text-slate-950">Thank you. The agency can now continue.</h1><p className="mt-4 text-sm leading-6 text-slate-700">Your response applies only to the exact version shown in this review. A changed version requires a new invitation.</p></section></main>;

  return <main className="min-h-screen bg-[#f8f7f2] px-4 py-8 text-slate-950 sm:py-12">
    <div className="mx-auto max-w-4xl space-y-5">
      <header className={card}>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Candidate acknowledgement</p>
        <h1 className="mt-3 break-words text-3xl font-black tracking-tight sm:text-5xl">Check exactly what {snapshot.agency.legalName} plans to share.</h1>
        <p className="mt-4 leading-7 text-slate-700">Intended recipient: <strong>{snapshot.recipientOrganization}</strong>. Vacancy: <strong>{snapshot.vacancyTitle}</strong>.</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">AI helped compare proposal claims with the supplied CV. It does not verify your identity or determine whether you are suitable. The recruiter remains responsible for the final version.</p>
        <p className="mt-3 text-sm text-slate-600">Scheduled retention date: {new Date(snapshot.retentionExpiresAt).toLocaleDateString(snapshot.locale === "nl" ? "nl-NL" : "en-GB")}. <a className="font-bold text-emerald-800 underline" href={snapshot.agency.privacyPolicyUrl} rel="noreferrer" target="_blank">Privacy information</a> · {snapshot.agency.privacyContactEmail}</p>
      </header>

      <section className={card}>
        <h2 className="text-2xl font-black">Selected CV information</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2"><p><strong>{cv.personal.name}</strong><br />{cv.personal.title}</p><p className="break-words text-sm text-slate-700">{[cv.personal.email, cv.personal.phone, cv.personal.location].filter(Boolean).join(" · ") || "Direct contact details are not included."}</p></div>
        {cv.personal.summary ? <div className="mt-5"><h3 className="font-extrabold">Profile</h3><p className="mt-2 whitespace-pre-wrap leading-7 text-slate-700">{cv.personal.summary}</p></div> : null}
        <div className="mt-6 space-y-5">{cv.experience.map((item, index) => <article key={`${item.role}-${index}`} className="border-t border-slate-200 pt-4"><h3 className="font-extrabold">{item.role}{item.company ? ` · ${item.company}` : ""}</h3><p className="mt-1 text-sm text-slate-500">{formatRange(item.start, item.end)}{item.location ? ` · ${item.location}` : ""}</p><p className="mt-2 whitespace-pre-wrap leading-7 text-slate-700">{item.description}</p>{item.highlights.length ? <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">{item.highlights.map((value) => <li key={value}>{value}</li>)}</ul> : null}</article>)}</div>
        {cv.education.length ? <div className="mt-6"><h3 className="font-extrabold">Education</h3>{cv.education.map((item, index) => <p className="mt-2 text-slate-700" key={`${item.degree}-${index}`}>{item.degree}{item.school ? ` · ${item.school}` : ""} <span className="text-sm text-slate-500">{formatRange(item.start, item.end)}</span></p>)}</div> : null}
        {cv.skills.length ? <p className="mt-6 text-sm text-slate-700"><strong>Skills:</strong> {cv.skills.map((item) => item.name).join(", ")}</p> : null}
      </section>

      <section className={card}><h2 className="text-2xl font-black">Client-facing proposal</h2><h3 className="mt-5 font-extrabold">Introduction</h3><p className="mt-2 whitespace-pre-wrap leading-7 text-slate-700">{submission.clientIntroduction}</p><h3 className="mt-6 font-extrabold">Accompanying email</h3><p className="mt-2 font-bold">{submission.clientEmailSubject}</p><p className="mt-2 whitespace-pre-wrap leading-7 text-slate-700">{submission.clientEmailBody}</p></section>
      <section className={card}><h2 className="text-2xl font-black">Changing information</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{Object.entries(submission.commercial).map(([key, value]) => <div className="rounded-xl bg-slate-50 p-4" key={key}><p className="break-words text-xs font-black uppercase tracking-wide text-slate-500">{key}</p><p className="mt-1 break-words font-bold">{value || "Not provided"}</p></div>)}</div></section>

      <section className={card}><h2 className="text-2xl font-black">Suggest a correction</h2><p className="mt-2 text-sm leading-6 text-slate-600">Suggestions do not alter the proposal automatically. The recruiter must accept or reject each one, and an accepted change requires a new review invitation.</p><label className="mt-5 block text-sm font-bold">Section<select className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3" value={selectedCorrection} onChange={(event) => chooseCorrection(event.target.value)}><option value="">Choose a section</option>{correctionOptions.map((option) => <option value={option.key} key={option.key}>{option.label}</option>)}</select></label>{selectedCorrection ? <><label className="mt-4 block text-sm font-bold">Proposed wording<textarea className="mt-2 min-h-32 w-full rounded-xl border border-slate-300 p-3 font-normal" value={proposedValue} onChange={(event) => setProposedValue(event.target.value)} /></label><label className="mt-4 block text-sm font-bold">Optional explanation<textarea className="mt-2 min-h-20 w-full rounded-xl border border-slate-300 p-3 font-normal" value={candidateNote} onChange={(event) => setCandidateNote(event.target.value)} /></label><button type="button" className={`${button} mt-4 bg-white`} onClick={addSuggestion}>Add correction</button></> : null}{suggestions.length ? <ul className="mt-5 space-y-3">{suggestions.map((item) => <li className="rounded-xl border border-amber-300 bg-amber-50 p-4" key={item.targetPath}><strong>{item.targetPath}</strong><p className="mt-1 text-sm">{item.proposedValue}</p><button type="button" className="mt-2 text-sm font-bold underline" onClick={() => setSuggestions((current) => current.filter((value) => value.targetPath !== item.targetPath))}>Remove</button></li>)}</ul> : null}</section>

      {error ? <p role="alert" className="rounded-xl border border-red-300 bg-red-50 p-4 font-bold text-red-900">{error}</p> : null}
      <section className={`${card} bg-emerald-50`}><h2 className="text-2xl font-black">Your response to this version</h2><p className="mt-2 text-sm leading-6 text-slate-700">Confirmation means the displayed information is correct to your knowledge and may be shared with the named organisation for this vacancy. It is not consent wording, identity verification or an electronic signature.</p><div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><button type="button" className={`${button} bg-emerald-400`} onClick={() => void submit("confirmed")}>Confirm displayed information</button><button type="button" className={`${button} bg-amber-200`} disabled={!suggestions.length} onClick={() => void submit("corrections_requested")}>Send {suggestions.length || ""} correction{suggestions.length === 1 ? "" : "s"}</button><button type="button" className={`${button} bg-white text-red-800`} onClick={() => void submit("declined")}>Decline sharing this version</button></div></section>
    </div>
  </main>;
}
