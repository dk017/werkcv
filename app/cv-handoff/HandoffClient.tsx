"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { ToolHandoff } from "@/lib/tool-cv-handoff-schema";
const TOKEN_KEY = "werkcv_tool_handoff_token_v1";
type Review = { handoff: ToolHandoff; documents: { id: string; title: string }[]; expiresAt: string; destination: { id: string; title: string; summary: string; language?: string; version: string } | null };
export default function HandoffClient({ locale = "nl" }: { locale?: "nl" | "en" }) {
  const router = useRouter(); const en = locale === "en";
  const [review, setReview] = useState<Review | null>(null);
  const [selected, setSelected] = useState(""); const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  const token = useRef(""); const pending = useRef(false);
  const exchange = useCallback(async (action: "review" | "apply", cvId = "", version: string | null = null) => {
    if (pending.current) return;
    pending.current = true; setBusy(true); setError("");
    try {
      if (!token.current) throw new Error("UNAVAILABLE");
      const response = await fetch("/api/tools/cv-handoff/consume", { method: "POST", headers: { "Content-Type": "application/json" }, signal: AbortSignal.timeout(15000), body: JSON.stringify({ token: token.current, action, cvId: cvId || null, version }) });
      if (response.status === 401) { setReview(null); router.replace(`/login?locale=${locale}&next=${encodeURIComponent(en ? "/en/cv-handoff" : "/cv-handoff")}`); return; }
      const body = await response.json();
      if (!response.ok) throw new Error(body.code || "HANDOFF_FAILED");
      if (body.applied) {
        sessionStorage.removeItem(TOKEN_KEY);
        router.replace(`${body.locale === "en" ? "/en/editor" : "/editor"}?id=${encodeURIComponent(body.cvId)}`); return;
      }
      setReview(body); setSelected(cvId);
    } catch (failure) {
      const code = failure instanceof Error ? failure.message : "";
      if (code === "UNAVAILABLE" || code === "NOT_FOUND") { setReview(null); sessionStorage.removeItem(TOKEN_KEY); }
      if (code === "STALE_DOCUMENT") setReview(null);
      setError(code === "STALE_DOCUMENT" ? (en ? "Your CV changed. Reload the review before applying." : "Je CV is gewijzigd. Laad de controle opnieuw voordat je doorgaat.") : (en ? "The transfer could not finish. Retry to recover it, or return to the tool if it has expired." : "De overdracht is niet afgerond. Probeer opnieuw of ga terug naar de tool als de link is verlopen."));
    } finally { pending.current = false; setBusy(false); }
  }, [en, locale, router]);
  useEffect(() => {
    const incoming = new URLSearchParams(location.hash.slice(1)).get("token");
    token.current = incoming || sessionStorage.getItem(TOKEN_KEY) || "";
    history.replaceState(null, "", location.pathname);
    sessionStorage.removeItem("werkcv_pending_tool_handoff_v1");
    if (token.current) sessionStorage.setItem(TOKEN_KEY, token.current);
    void exchange("review");
  }, [exchange]);
  const content = review?.handoff.kind === "profile" ? review.handoff.payload.text : review?.handoff.payload.bullets.join("\n• ");
  return <main className="mx-auto max-w-2xl p-5 sm:p-8">
    <h1 className="text-2xl font-semibold">{en ? "Review and add to your CV" : "Controleer en voeg toe aan je CV"}</h1>
    {error && <p role="alert" className="my-4 rounded-xl bg-amber-50 p-4">{error}</p>}
    {busy && <p role="status">{en ? "Loading…" : "Laden…"}</p>}
    {review && <>
      <label className="mt-6 block font-semibold" htmlFor="destination">{en ? "Choose the destination CV" : "Kies het doel-CV"}</label>
      <select id="destination" disabled={busy} value={selected} onChange={event => void exchange("review", event.target.value)} className="mt-2 w-full rounded-lg border p-3">
        <option value="">{en ? "Create a new CV" : "Maak een nieuw CV"}</option>
        {review.documents.map(doc => <option key={doc.id} value={doc.id}>{doc.title}</option>)}
      </select>
      <p className="mt-2 text-sm">{en ? "Shows your 100 most recently edited personal CVs." : "Toont je 100 laatst bewerkte persoonlijke CV’s."}</p>
      {review.destination && <section className="mt-5 rounded-xl bg-slate-50 p-4"><h2 className="font-semibold">{en ? "Current profile" : "Huidig profiel"}</h2><p className="whitespace-pre-wrap break-words">{review.destination.summary || (en ? "Empty" : "Leeg")}</p></section>}
      <section className="mt-5 rounded-xl border border-teal-200 p-4"><h2 className="font-semibold">{en ? "Selected tool result" : "Geselecteerd toolresultaat"}</h2><p className="whitespace-pre-wrap break-words">{content}</p></section>
      <p className="my-4">{review.handoff.kind === "profile" ? (en ? "Applying replaces only the profile in the selected CV. Check all facts first." : "Toepassen vervangt alleen het profiel in het gekozen CV. Controleer eerst alle feiten.") : (en ? "Applying adds a new experience entry. Existing jobs remain unchanged." : "Toepassen voegt een nieuwe werkervaring toe. Bestaande functies blijven behouden.")}</p>
      {review.destination?.language && review.destination.language !== review.handoff.locale && <p className="my-3 text-amber-900">{en ? "This result has a different language from your CV. Applying does not translate it or change your CV language." : "Dit resultaat heeft een andere taal dan je CV. Toepassen vertaalt niet en wijzigt je CV-taal niet."}</p>}
      <button type="button" disabled={busy} onClick={() => void exchange("apply", selected, review.destination?.version ?? null)} className="rounded-xl bg-teal-900 px-4 py-3 font-semibold text-white disabled:opacity-50">{en ? "Apply to selected CV" : "Toepassen op gekozen CV"}</button>
    </>}
    {error && <button type="button" disabled={busy} onClick={() => void exchange("review", selected)} className="my-3 rounded-lg border p-3">{en ? "Reload review" : "Controle opnieuw laden"}</button>}
    <a href={en ? "/en/templates" : "/templates"} onClick={() => sessionStorage.removeItem(TOKEN_KEY)} className="ml-3 inline-block py-3 underline">{en ? "Cancel" : "Annuleren"}</a>
  </main>;
}
