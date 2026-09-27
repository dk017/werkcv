"use client";

import { useState } from "react";
import { findAiLeftovers } from "@/lib/cv-check/ai-leftovers";
import { track } from "@/lib/analytics";

// Signals from the 27 Sep 2026 letter test (docs/product/2026-09-27-chatgpt-cv-page-research.md §7).
const STANDARD_OPENING =
  /^\W*(met (veel|grote) (interesse|belangstelling|enthousiasme)|hierbij (solliciteer|wil|reageer)|graag solliciteer ik|naar aanleiding van (uw|jullie) vacature)/im;
const TRAITS = [
  "stressbestendig",
  "flexibel",
  "resultaatgericht",
  "oplossingsgericht",
  "teamspeler",
  "zelfstandig",
  "nauwkeurig",
  "proactief",
  "leergierig",
  "betrouwbaar",
  "empathisch",
  "collegiaal",
  "gedreven",
  "accuraat",
  "representatief",
];

type Result = {
  leftovers: ReturnType<typeof findAiLeftovers>;
  standardOpening: string | null;
  traits: string[];
  words: number;
};

const KIND_LABEL = {
  placeholder: "Invulveld",
  markdown: "Opmaakteken",
  chat: "Chatbottekst of advies",
} as const;

function firstSentenceAfterSalutation(text: string): string {
  const afterSalutation = text.replace(/^[\s\S]*?(geachte|beste)[^\n]*\n+/i, "");
  return afterSalutation.trim().split(/(?<=[.!?])\s/)[0] ?? "";
}

export default function LetterLeftoverCheck() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  function runCheck() {
    const trimmed = text.trim();
    if (trimmed.split(/\s+/).length < 40) {
      setError("Plak de volledige brief (minstens een paar alinea's).");
      setResult(null);
      return;
    }
    setError("");
    const opening = firstSentenceAfterSalutation(trimmed);
    const lower = trimmed.toLowerCase();
    const next: Result = {
      leftovers: findAiLeftovers(trimmed),
      standardOpening: STANDARD_OPENING.test(opening) ? opening.slice(0, 120) : null,
      traits: TRAITS.filter((trait) => lower.includes(trait)),
      words: trimmed.split(/\s+/).filter(Boolean).length,
    };
    setResult(next);
    // Counts only; the letter text never leaves the browser.
    track("letter_check_completed", {
      placeholder: next.leftovers.some((hit) => hit.kind === "placeholder"),
      markdown: next.leftovers.some((hit) => hit.kind === "markdown"),
      chat: next.leftovers.some((hit) => hit.kind === "chat"),
      standard_opening: Boolean(next.standardOpening),
      trait_count: next.traits.length,
      words: next.words,
    });
  }

  const clean = result && !result.leftovers.length && !result.standardOpening && !result.traits.length;

  return (
    <div className="wk-card p-5">
      <label htmlFor="letter-check-input" className="font-semibold text-[var(--wk-ink)]">
        Plak je brief
      </label>
      <textarea
        id="letter-check-input"
        className="wk-input mt-3 min-h-[220px] w-full"
        placeholder="Plak hier de volledige tekst van je sollicitatiebrief of motivatiebrief…"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button type="button" onClick={runCheck} className="wk-button wk-button-primary">
          Check mijn brief
        </button>
        <span className="text-sm text-[var(--wk-ink-muted)]">Gratis. Je brief wordt niet verstuurd of opgeslagen; de check draait in je browser.</span>
      </div>
      {error && <p className="mt-3 text-sm font-semibold text-rose-700">{error}</p>}

      {result && (
        <div className="mt-6 space-y-4" aria-live="polite">
          {clean && (
            <p className="font-semibold text-emerald-700">
              Geen restanten, standaardopening of losse eigenschappen gevonden. Lees de brief nog één keer hardop: klopt elk feit?
            </p>
          )}
          {result.leftovers.length > 0 && (
            <div>
              <h3 className="font-semibold text-rose-700">Haal dit weg voordat je verstuurt</h3>
              <ul className="mt-2 space-y-2 text-sm">
                {result.leftovers.map((hit) => (
                  <li key={hit.kind + hit.excerpt}>
                    <span className="font-semibold">{KIND_LABEL[hit.kind]}:</span> &ldquo;{hit.excerpt}&rdquo;
                  </li>
                ))}
              </ul>
            </div>
          )}
          {result.standardOpening && (
            <div>
              <h3 className="font-semibold text-amber-700">Veelgebruikte openingszin</h3>
              <p className="mt-1 text-sm text-[var(--wk-ink-muted)]">
                &ldquo;{result.standardOpening}&rdquo; In onze test begonnen alle brieven van de populaire prompts zo. Begin liever met waarom deze functie bij jou past.
              </p>
            </div>
          )}
          {result.traits.length > 0 && (
            <div>
              <h3 className="font-semibold text-amber-700">Eigenschappen zonder voorbeeld?</h3>
              <p className="mt-1 text-sm text-[var(--wk-ink-muted)]">
                Gevonden: {result.traits.join(", ")}. Staan ze er omdat jij ze gaf, en kun je ze met een voorbeeld onderbouwen? Zo niet, haal ze weg.
              </p>
            </div>
          )}
          <p className="text-sm text-[var(--wk-ink-muted)]">Aantal woorden: {result.words}.</p>
        </div>
      )}
    </div>
  );
}
