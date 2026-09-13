"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EnglishProfileSummaryTool() {
  const router = useRouter();
  const [currentRole, setCurrentRole] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [strengths, setStrengths] = useState("");
  const [years, setYears] = useState("");
  const [tone, setTone] = useState<"professional" | "enthusiastic" | "concise">("professional");
  const [result, setResult] = useState("");
  const [busy, setBusy] = useState(false);
  const [handoffBusy, setHandoffBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const inputClass = "mt-2 w-full rounded-xl border border-[var(--wk-line)] bg-white px-4 py-3 text-[var(--wk-ink)] outline-none focus:border-[var(--wk-accent)] focus:ring-2 focus:ring-[var(--wk-accent-soft)]";

  async function generate() {
    if (!currentRole.trim() || !targetRole.trim()) { setError("Enter your current or latest role and the role you want next."); return; }
    setBusy(true); setError(""); setResult("");
    try {
      const response = await fetch("/api/tools/profieltekst", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ locale: "en", huidigeFunctie: currentRole, doelrol: targetRole, competenties: strengths, ervaringJaren: years, toon: tone === "enthusiastic" ? "enthousiast" : tone === "concise" ? "beknopt" : "professioneel" }) });
      const body = await response.json();
      if (!response.ok || typeof body.profieltekst !== "string" || !body.profieltekst.trim()) throw new Error(body.error || "GENERATION_FAILED");
      setResult(body.profieltekst.trim());
    } catch (failure) { setError(failure instanceof Error && failure.message === "Input is too long." ? "Keep each field under 800 characters." : "We could not generate the profile. Please try again."); }
    finally { setBusy(false); }
  }

  async function addToCv() {
    if (!result || handoffBusy) return;
    setHandoffBusy(true); setError("");
    try {
      const response = await fetch("/api/tools/cv-handoff", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind: "profile", locale: "en", payload: { text: result } }) });
      const body = await response.json();
      if (!response.ok || typeof body.token !== "string") throw new Error("HANDOFF_FAILED");
      router.replace(`/en/cv-handoff#token=${encodeURIComponent(body.token)}`);
    } catch { setError("The text could not be transferred safely. Copy it or try again."); setHandoffBusy(false); }
  }

  async function copy() { try { await navigator.clipboard.writeText(result); setCopied(true); window.setTimeout(() => setCopied(false), 1800); } catch { setError("Copying is unavailable in this browser. Select the text manually."); } }

  return <section className="wk-card p-5 sm:p-8" aria-labelledby="profile-tool-title">
    {!result ? <div className="space-y-5">
      <h2 id="profile-tool-title" className="text-xl font-semibold">Generate an English profile</h2>
      <div className="grid gap-5 sm:grid-cols-2"><label><span className="text-sm font-semibold">Current or latest role *</span><input className={inputClass} value={currentRole} onChange={event => setCurrentRole(event.target.value)} maxLength={800} placeholder="e.g. Customer service assistant" /></label><label><span className="text-sm font-semibold">Target role *</span><input className={inputClass} value={targetRole} onChange={event => setTargetRole(event.target.value)} maxLength={800} placeholder="e.g. Customer success specialist" /></label></div>
      <label className="block"><span className="text-sm font-semibold">Strengths (comma-separated)</span><input className={inputClass} value={strengths} onChange={event => setStrengths(event.target.value)} maxLength={800} placeholder="e.g. email support, Excel, careful follow-up" /></label>
      <div className="grid gap-5 sm:grid-cols-2"><label><span className="text-sm font-semibold">Relevant years (optional)</span><input className={inputClass} value={years} onChange={event => setYears(event.target.value)} maxLength={800} placeholder="e.g. 4" /></label><label><span className="text-sm font-semibold">Tone</span><select className={inputClass} value={tone} onChange={event => setTone(event.target.value as typeof tone)}><option value="professional">Professional</option><option value="enthusiastic">Enthusiastic</option><option value="concise">Concise</option></select></label></div>
      {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      <button type="button" onClick={() => void generate()} disabled={busy} className="wk-button wk-button-primary disabled:opacity-60">{busy ? "Writing your profile…" : "Generate my profile"}</button>
    </div> : <div className="space-y-5">
      <div className="flex items-center justify-between gap-4"><h2 id="profile-tool-title" className="text-xl font-semibold">Your draft profile</h2><span className="rounded-full bg-[var(--wk-accent-soft)] px-3 py-1 text-xs font-semibold">Generated</span></div>
      <p className="rounded-xl border border-[var(--wk-line)] bg-[var(--wk-surface-subtle)] p-5 leading-8">{result}</p>
      <p className="text-sm leading-6 text-[var(--wk-ink-muted)]">This is wording help, not a fact check. Confirm every role, date, number, employer and skill yourself.</p>
      {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      <div className="flex flex-col gap-3 sm:flex-row"><button type="button" onClick={() => void addToCv()} disabled={handoffBusy} className="wk-button wk-button-primary flex-1 justify-center disabled:opacity-60">{handoffBusy ? "Preparing secure transfer…" : "Add to my CV"}</button><button type="button" onClick={() => void copy()} className="wk-button wk-button-secondary flex-1 justify-center">{copied ? "Copied" : "Copy text"}</button></div>
      <button type="button" onClick={() => { setResult(""); setError(""); }} className="w-full text-sm font-semibold text-[var(--wk-ink-muted)] underline underline-offset-4">Generate another version</button>
    </div>}
  </section>;
}
