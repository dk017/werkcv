"use client";

import { useEffect, useRef, useState } from "react";
import { cvSchema, type CVData } from "@/lib/cv";
import { rewriteContext } from "@/lib/ai-rewrite-review";
import { applyWritingChange, rebaseWritingChanges, writingChanges, writingContextKey, writingProvenanceSchema, type WritingChange, type WritingSelection } from "@/lib/ai-writing-changes";
import { safeAiErrorCode } from "@/lib/ai-error-code";
import { writingLatencyBucket } from "@/lib/ai-writing-analytics";
import { track } from "@/lib/analytics";
import AiAnalyticsPreferences from "@/components/AiAnalyticsPreferences";
import KeywordScannerWidget from "./KeywordScannerWidget";

type HistoryItem = WritingChange & { historyId: string };
type Props = {
  selection: WritingSelection;
  locale: "nl" | "en";
  cvId: string;
  vacancy: string;
  role: string;
  getData: () => CVData;
  prepare: (data: CVData) => Promise<boolean>;
  getVersion: () => string | undefined;
  apply: (data: CVData) => void;
  history: HistoryItem[];
  onHistory: (history: HistoryItem[]) => void;
  onClose: () => void;
  blocked: boolean;
};
const buttonClass = "rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:opacity-50";
export default function AiWritingAssistant(props: Props) {
  const { selection, locale, cvId, getData, prepare, getVersion, apply, history, onHistory, onClose, blocked, vacancy, role } = props;
  const tr = (nl: string, en: string) => locale === "en" ? en : nl;
  const dialog = useRef<HTMLDialogElement>(null);
  const controller = useRef<AbortController | null>(null);
  const sequence = useRef(0);
  const factsStarted = useRef(false);
  const [facts, setFacts] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [changes, setChanges] = useState<Array<WritingChange & { status: "pending" | "accepted" | "rejected" }>>([]);
  const baseline = useRef("");
  const currentKey = (data: CVData) => writingContextKey(data, selection.target, vacancy, role) + JSON.stringify(facts);
  const analyticsTarget = selection.target.kind === "experience" ? "experience" : selection.target.kind;
  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const trigger = previous?.dataset.writingTrigger;
    dialog.current?.showModal();
    track("ai_writing_opened", { locale, target: analyticsTarget, action: selection.action });
    return () => {
      sequence.current = -1; controller.current?.abort();
      const restored = previous?.isConnected ? previous :
        [...document.querySelectorAll<HTMLElement>("[data-writing-trigger]")].find(element => element.dataset.writingTrigger === trigger);
      restored?.focus();
    };
  }, [analyticsTarget, locale, selection.action]);

  async function generate(regenerate?: WritingChange) {
    if (busy || blocked) return;
    setBusy(true); setError(""); setNotice("");
    controller.current?.abort();
    const abort = new AbortController(); controller.current = abort;
    const run = ++sequence.current;
    const startedAt = performance.now();
    const source = structuredClone(getData());
    const key = currentKey(source);
    const requestId = crypto.randomUUID();
    const target = regenerate?.target ?? selection.target;
    const entry = target.kind === "experience" ? source.experience.find(e => e.entryId === target.entryId) : undefined;
    const chosenBullet = regenerate?.bullet ? { operation: (entry?.highlights[regenerate.bullet.index] === undefined ? "insert_bullet" : "replace_bullet") as "insert_bullet" | "replace_bullet", index: regenerate.bullet.index } : selection.bullet;
    const bullet = chosenBullet && entry ? { ...chosenBullet, expectedArray: [...entry.highlights], expectedText: chosenBullet.operation === "insert_bullet" ? "" : entry.highlights[chosenBullet.index] } : undefined;
    const schemaVersion = bullet ? 2 : 1;
    track("ai_writing_requested", { locale, target: analyticsTarget, action: selection.action, regeneration: Boolean(regenerate), bullet: Boolean(bullet) });
    const action = regenerate ? (selection.action === "shorten" ? "shorten" : bullet?.operation === "insert_bullet" ? "draft_experience" : bullet ? "improve" :
      target.kind === "profile" ? "draft_profile" : "draft_experience") : selection.action;
    try {
      if (regenerate?.bullet && (!entry || ![regenerate.bullet.arrayBefore, regenerate.bullet.arrayAfter]
        .some(array => JSON.stringify(array) === JSON.stringify(entry.highlights)))) throw new Error("STALE_DOCUMENT");
      if (!(await prepare(source))) throw new Error("SAVE_CONFLICT");
      if (run !== sequence.current || abort.signal.aborted) return;
      const requestedVersion = getVersion();
      const response = await fetch("/api/ats-rewrite", {
        method: "POST", headers: { "Content-Type": "application/json" },
        signal: AbortSignal.any([abort.signal, AbortSignal.timeout(45000)]),
        body: JSON.stringify({
          schemaVersion, requestId, cvId, expectedContentVersion: requestedVersion, ...(bullet ? { bullet } : {}),
          data: rewriteContext(source), action, target, facts: target.kind === "all" ? "" : facts,
          targetRole: role, jobDescription: vacancy,
        }),
      });
      const body = await response.json().catch(() => null);
      if (!response.ok) throw new Error(body?.code || "SUGGESTION_FAILED");
      const result = cvSchema.safeParse(body?.data);
      const provenance = writingProvenanceSchema.safeParse(body?.provenance);
      if (!result.success || body?.schemaVersion !== schemaVersion || body?.requestId !== requestId ||
        !provenance.success || provenance.data.requestId !== requestId || provenance.data.documentVersion !== requestedVersion ||
        (bullet && !provenance.data.sourceArrayDigest)) throw new Error("SUGGESTION_FAILED");
      if (run !== sequence.current || abort.signal.aborted) return;
      if (currentKey(getData()) !== key) throw new Error("STALE_DOCUMENT");
      const incoming = writingChanges(source, result.data, target, chosenBullet)
        .filter(change => !regenerate || (change.field === regenerate.field && (!regenerate.bullet || change.bullet?.index === regenerate.bullet.index)))
        .map(change => ({ ...change, provenance: { ...provenance.data, operationId: `${requestId}:${change.id}` }, status: "pending" as const }));
      const retainOtherChanges = baseline.current === key;
      baseline.current = key;
      setChanges(old => regenerate && retainOtherChanges
        ? [...old.filter(change => change.id !== regenerate.id), ...incoming]
        : incoming);
      track("ai_writing_result", { locale, target: analyticsTarget, changeCount: incoming.length, bullet: Boolean(bullet), latency: writingLatencyBucket(performance.now() - startedAt) });
      if (body.bulletReviewRequired === true) setNotice(tr("Een deel van de bulletpunten kon niet veilig worden gekoppeld en is behouden. Gebruik Verbeter naast een afzonderlijk bulletpunt, of Voeg een taak toe met je eigen feiten. Andere suggesties kun je hieronder bekijken.", "Some bullet changes could not be safely linked and were kept unchanged. Use Improve beside an individual bullet, or Add a responsibility with your own facts. You can review other suggestions below."));
      else if (!incoming.length) setNotice(tr("Geen wijzigingen voorgesteld. Je tekst is behouden.", "No changes suggested. Your text has been kept."));
      else setNotice(tr("Suggesties zijn klaar. Controleer elke wijziging hieronder.", "Suggestions are ready. Review each change below."));
    } catch (failure) {
      if (run !== sequence.current || abort.signal.aborted) return;
      const code = safeAiErrorCode(failure instanceof Error ? failure.message : "");
      track("ai_writing_failed", { locale, target: analyticsTarget, reason: code });
      const messages: Record<string, string> = {
        MORE_FACTS_REQUIRED: tr("Voeg je echte taken of ervaring toe; alleen een functietitel is niet genoeg.", "Add actual responsibilities or experience; a job title alone is not enough."),
        AI_DAILY_LIMIT: tr("Je dagelijkse AI-limiet is bereikt. Je kunt gewoon bewerken en downloaden.", "Your daily AI limit is reached. Editing and downloads remain available."),
        AI_BUSY: tr("De schrijfhulp is bezig. Probeer over een minuut opnieuw.", "Writing assistance is busy. Try again in a minute."),
        FACT_REVIEW_REQUIRED: tr("De suggestie veranderde mogelijk feiten en is tegengehouden. Je oorspronkelijke tekst blijft behouden.", "The suggestion may have changed facts and was blocked. Your original text is unchanged."),
        STALE_DOCUMENT: tr("Je CV of context is veranderd. Vraag een nieuwe suggestie aan.", "Your CV or context changed. Request a new suggestion."),
        SAVE_CONFLICT: tr("Opslaan is niet gelukt. Bewaar je tekst voordat je opnieuw laadt.", "Saving failed. Copy your text before reloading."),
        NO_SHORTER_SUGGESTION: tr("Geen veilige kortere versie gevonden. Je tekst blijft behouden.", "No safe shorter version was found. Your text is unchanged."),
        INPUT_TOO_LARGE: tr("Deze tekst is te lang. Kort je notities of vacaturetekst in en probeer opnieuw.", "This text is too long. Shorten your notes or vacancy text and try again."),
        AUTH_REQUIRED: tr("Je sessie is verlopen. Kopieer je niet-opgeslagen tekst en meld je opnieuw aan voordat je verdergaat.", "Your session expired. Copy any unsaved text and sign in again before continuing."),
      };
      setError(messages[code] || tr("De suggestie kon niet worden opgehaald. Je tekst is niet gewijzigd.", "The suggestion could not be retrieved. Your text has not changed."));
    } finally { if (run === sequence.current) setBusy(false); }
  }
  function accept(change: WritingChange) {
    if (blocked || busy) return;
    setError("");
    try {
      const current = getData();
      if (currentKey(current) !== baseline.current) throw new Error("STALE_CHANGE");
      const next = applyWritingChange(current, change);
      apply(next);
      baseline.current = currentKey(next);
      onHistory([...history, { ...change, historyId: crypto.randomUUID() }]);
      setChanges(old => {
        const rebased = rebaseWritingChanges(old, change, next);
        return old.map((item, index) => ({ ...rebased[index], status: item.id === change.id ? "accepted" : item.status }));
      });
      [...(dialog.current?.querySelectorAll<HTMLElement>("[data-change-id]") || [])].find(element => element.dataset.changeId === change.id)?.focus();
      setNotice(tr("Alleen deze wijziging is toegepast.", "Only this change was applied."));
      track("ai_writing_decision", { locale, target: analyticsTarget, field: change.field, bullet: Boolean(change.bullet), decision: "accepted" });
    } catch { setError(tr("De tekst is veranderd. Vraag een nieuwe suggestie aan.", "The text has changed. Request a new suggestion.")); }
  }
  function undo(item: HistoryItem) {
    if (blocked || busy) return;
    setError("");
    try {
      const next = applyWritingChange(getData(), item, true);
      apply(next); onHistory(history.filter(entry => entry.historyId !== item.historyId));
      dialog.current?.querySelector<HTMLElement>("#ai-writing-title")?.focus();
      // Undo changes the review source: require regeneration before applying remaining cards.
      baseline.current = "";
      setNotice(tr("De oorspronkelijke tekst is hersteld.", "The original text has been restored."));
      track("ai_writing_decision", { locale, target: analyticsTarget, field: item.field, bullet: Boolean(item.bullet), decision: "undone" });
    } catch {
      setError(tr("Deze tekst is later gewijzigd. Automatisch herstellen is niet veilig. Kopieer de oorspronkelijke tekst hieronder als je die wilt gebruiken.",
        "This text was edited later. Automatic undo is unsafe. Copy the original text below if you want to restore it."));
    }
  }
  const label = (change: WritingChange) => change.field === "summary" ? tr("Profiel", "Profile") :
    change.field === "description" ? tr("Functiebeschrijving", "Job description") : change.bullet ? `${tr("Bulletpunt", "Bullet")} ${change.bullet.index + 1}` : tr("Bulletpunten", "Bullet points");
  const value = (text: string | string[]) => Array.isArray(text) ? text.map(line => "• " + line).join("\n") : text;
  return (
    <dialog ref={dialog} onCancel={onClose} aria-labelledby="ai-writing-title"
      className="m-auto max-h-[90dvh] w-[calc(100%_-_1rem)] max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 shadow-xl backdrop:bg-slate-950/40 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <h2 id="ai-writing-title" tabIndex={-1} className="text-xl font-semibold">{tr("AI-schrijfhulp", "AI writing assistance")}</h2>
        <button type="button" autoFocus onClick={onClose} className={buttonClass}>{tr("Sluiten", "Close")}</button>
      </div>
      <p className="my-3 text-sm">{tr("Controleer alle feiten. Niets wordt vervangen totdat je een wijziging accepteert.", "Check every fact. Nothing is replaced until you accept a change.")}</p>
      <p className="break-words font-medium">{selection.target.kind === "profile" ? tr("Persoonlijk profiel", "Personal profile") :
        selection.target.kind === "all" ? tr("Profiel en werkervaring", "Profile and experience") :
        getData().experience.filter(e => e.entryId === (selection.target as { entryId: string }).entryId).map(e => [e.role, e.company].filter(Boolean).join(" — ")).join("")}</p>
      <p className="text-sm">{selection.action === "shorten" ? tr("Maak korter, zonder feiten te veranderen.", "Make it shorter without changing facts.") :
        selection.action === "improve" ? tr("Verbeter de formulering, zonder feiten toe te voegen.", "Improve wording without adding facts.") :
        tr("Schrijf op basis van je eigen ervaring en feiten.", "Write from your own experience and facts.")}</p>
      <p className="text-sm">{tr("Suggestietaal:", "Suggestion language:")} {getData().personal.resumeLanguage === "en" ? tr("Engels", "English") : tr("Nederlands", "Dutch")}</p>
      {selection.target.kind === "all" && vacancy.trim().length >= 20 && <div className="my-4">
        <p className="mb-2 text-sm">{tr("Bekijk vacaturetermen en letterlijke cv-passages naast de tekstvoorstellen. Een term in je cv bewijst geen vaardigheid; lees ook de context. Ontbreekt een echt voorbeeld? Voeg dat eerst zelf toe in het juiste cv-onderdeel.", "Review vacancy terms and literal CV passages alongside the proposed wording. A term in your CV does not prove proficiency; read the context too. Missing a real example? Add it yourself in the appropriate CV section first.")}</p>
        <KeywordScannerWidget cvId={cvId} data={getData()} jobDescription={vacancy} onJobDescriptionChange={() => undefined} uiLanguage={locale} readOnly />
      </div>}
      {selection.target.kind !== "all" && selection.bullet?.operation !== "replace_bullet" && <details className="my-4 rounded-xl border p-3">
        <summary className="cursor-pointer font-medium">{tr("Hulp nodig om je ervaring te beschrijven?", "Need help describing your experience?")}</summary>
        {(selection.target.kind === "profile" ? [
          tr("Welke opleiding, projecten of ervaring wil je noemen?", "Which education, projects or experience would you like to mention?"),
          tr("Welke taken heb je zelf uitgevoerd?", "Which tasks did you carry out yourself?"),
          tr("Welke vaardigheden kun je met een voorbeeld laten zien?", "Which skills can you illustrate with an example?"),
          tr("Welk werk zoek je?", "What kind of work are you looking for?"),
        ] : [tr("Wat deed je zelf?", "What did you do yourself?"), tr("Welke hulpmiddelen of programma’s gebruikte je?", "Which tools or programs did you use?"), tr("Voor wie of met wie werkte je?", "Who did you support or work with?"), tr("Wat was het resultaat? Laat dit leeg als je dat niet weet.", "What was the result? Leave this blank if you do not know.")]).map((question, index) => <label key={question} className="mt-3 block text-sm">{question}<textarea disabled={busy} maxLength={900} value={answers[index]} onChange={event => { if (!factsStarted.current) { factsStarted.current = true; track("ai_writing_facts", { locale, target: analyticsTarget, stage: "started" }); } setAnswers(old => old.map((a, i) => i === index ? event.target.value : a)); }} className="mt-1 w-full rounded-lg border p-2" /></label>)}
        <button type="button" disabled={busy} className={buttonClass + " mt-3"} onClick={() => { setFacts(answers.filter(a => a.trim()).join("\n")); if (answers.some(a => a.trim())) track("ai_writing_facts", { locale, target: analyticsTarget, stage: "completed" }); }}>{tr("Bekijk en bewerk mijn notities hieronder", "Review and edit my notes below")}</button>
        <p className="mt-2 text-sm">{tr("Getallen zijn niet verplicht. Je notities zijn jouw eigen informatie; controleer ze voordat je ze gebruikt.", "Numbers are optional. These are your own statements; check them before using them.")}</p>
      </details>}
      {selection.target.kind !== "all" && selection.bullet?.operation !== "replace_bullet" && <label className="my-4 block text-sm font-medium">
        {tr("Jouw feiten (optioneel als ze al in je CV staan)", "Your facts (optional if already in your CV)")}
        <textarea value={facts} onChange={event => setFacts(event.target.value)} maxLength={4000} disabled={busy}
          placeholder={tr("Welke taken voerde je uit? Welke hulpmiddelen gebruikte je? Noem alleen resultaten die je kunt onderbouwen.", "What did you do? Which tools did you use? Include only results you can substantiate.")}
          className="mt-2 min-h-28 w-full rounded-lg border border-slate-300 p-3 font-normal" />
        <span className="font-normal">{tr("Deze notities worden niet als apart CV-onderdeel opgeslagen.", "These notes are not saved as a separate CV section.")}</span>
      </label>}
      <button type="button" disabled={busy || blocked} onClick={() => void generate()} className={buttonClass + " my-3 bg-teal-900 text-white"}>
        {busy ? tr("Suggestie maken…", "Preparing suggestion…") : tr("Nieuwe suggestie", "Generate suggestion")}
      </button>
      {error && <p role="alert" className="my-3 rounded-lg bg-amber-50 p-3 text-sm">{error}</p>}
      <p role="status" aria-live="polite" className="text-sm">{notice}</p>
      <div aria-busy={busy}>
        {changes.map(change => <section key={change.id} className="my-4 min-w-0 rounded-xl border border-slate-200 p-3">
          <h3 tabIndex={-1} data-change-id={change.id} className="break-words font-semibold">{label(change)} {change.label && <span>— {change.label}</span>}</h3>
          <div className="my-3 grid gap-3 sm:grid-cols-2">
            <div className="min-w-0"><h4 className="text-sm font-semibold">{tr("Origineel", "Original")}</h4><p className="whitespace-pre-wrap break-words text-sm">{value(change.before) || tr("(leeg)", "(empty)")}</p></div>
            <div className="min-w-0"><h4 className="text-sm font-semibold">{tr("Suggestie", "Suggestion")}</h4><p className="whitespace-pre-wrap break-words text-sm">{value(change.after) || tr("(leeg)", "(empty)")}</p></div>
          </div>
          {change.status === "pending" ? <div className="flex flex-wrap gap-2">
            <button type="button" disabled={busy || blocked} onClick={() => accept(change)} className={buttonClass}>{tr("Gebruik deze tekst", "Use this text")}</button>
            <button type="button" disabled={busy} onClick={event => {
              setError("");
              setChanges(old => old.map(c => c.id === change.id ? { ...c, status: "rejected" } : c));
              event.currentTarget.closest("section")?.querySelector<HTMLElement>("h3")?.focus();
              setNotice(tr("Originele tekst behouden.", "Original text kept."));
              track("ai_writing_decision", { locale, target: analyticsTarget, field: change.field, decision: "rejected" });
            }} className={buttonClass}>{tr("Behoud origineel", "Keep original")}</button>
            <button type="button" disabled={busy || blocked} onClick={() => void generate(change)} className={buttonClass}>{tr("Nieuwe suggestie", "Try another suggestion")}</button>
          </div> : <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm">{change.status === "accepted" ? tr("Toegepast", "Applied") : tr("Origineel behouden", "Original kept")}</p>
            <button type="button" disabled={busy || blocked} onClick={() => void generate(change)} className={buttonClass}>{tr("Nieuwe suggestie", "Try another suggestion")}</button>
          </div>}
        </section>)}
      </div>
      {history.length > 0 && <section className="mt-6 border-t pt-4"><h3 className="font-semibold">{tr("Wijzigingen in deze sessie", "Changes in this session")}</h3>
        {[...history].reverse().map(item => <details key={item.historyId} className="my-3 rounded-lg border p-3">
          <summary className="cursor-pointer break-words">{label(item)} {item.label}</summary>
          <p className="my-2 whitespace-pre-wrap break-words text-sm">{value(item.before) || tr("(leeg)", "(empty)")}</p>
          <button type="button" disabled={busy || blocked} onClick={() => undo(item)} className={buttonClass}>{tr("Ongedaan maken", "Undo")}</button>
        </details>)}
      </section>}
      <div className="mt-6 border-t pt-4">
        <AiAnalyticsPreferences locale={locale} />
      </div>
    </dialog>
  );
}
