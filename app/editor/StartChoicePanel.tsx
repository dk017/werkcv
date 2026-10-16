"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { Icon } from "@/components/app/icons";
import type { AppLocale } from "@/lib/app-v2-paths";
import { searchStartExamples, type StartExampleSummary } from "@/lib/start-choice";

const COPY = {
    nl: {
        eyebrow: "Nieuw cv",
        title: "Hoe wil je beginnen?",
        intro: "Kies wat voor jou het snelst gaat. Alles kun je daarna nog aanpassen.",
        uploadTitle: "Upload je huidige cv",
        uploadText: "PDF of Word. We vullen alle stappen voor je in.",
        fastest: "Snelst",
        exampleTitle: "Begin met een voorbeeld voor je functie",
        exampleText: "Typ je functie en kies een ingevuld voorbeeld. Daarna vervang je de tekst door je eigen ervaring.",
        searchLabel: "Je functie",
        searchPlaceholder: "Bijv. verpleegkundige, chauffeur, docent",
        results: "Voorbeelden",
        none: (query: string) => `Geen voorbeeld gevonden voor "${query}". Probeer een ander woord, of begin met lege velden.`,
        loading: "Voorbeeld laden…",
        failed: "Het voorbeeld kon niet worden geladen. Probeer het opnieuw.",
        blank: "Begin met lege velden",
    },
    en: {
        eyebrow: "New CV",
        title: "How do you want to start?",
        intro: "Pick whatever is quickest for you. You can change everything afterwards.",
        uploadTitle: "Upload your current CV",
        uploadText: "PDF or Word. We fill in every step for you.",
        fastest: "Fastest",
        exampleTitle: "Start from an example for your job",
        exampleText: "Type your job and pick a filled-in example. Then replace the text with your own experience.",
        searchLabel: "Your job",
        searchPlaceholder: "E.g. data analyst, nurse, teacher",
        results: "Examples",
        none: (query: string) => `No example found for "${query}". Try another word, or start with empty fields.`,
        loading: "Loading example…",
        failed: "The example could not be loaded. Please try again.",
        blank: "Start with empty fields",
    },
} as const;

/**
 * "Hoe wil je beginnen?" for a new, empty CV (lib/start-choice.ts): upload, an example for your
 * job, or the empty form. The example list is fetched once; the chosen example is loaded by the
 * editor (onExample).
 */
export default function StartChoicePanel({
    locale = "nl",
    onUpload,
    onBlank,
    onExample,
}: {
    locale?: AppLocale;
    onUpload: () => void;
    onBlank: () => void;
    onExample: (example: StartExampleSummary, query: string) => Promise<boolean>;
}) {
    const c = COPY[locale];
    const titleId = useId();
    const searchId = useId();
    const [examples, setExamples] = useState<StartExampleSummary[]>([]);
    const [query, setQuery] = useState("");
    const [loadingKey, setLoadingKey] = useState<string | null>(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        let cancelled = false;
        fetch(`/api/start-examples?locale=${locale}`)
            .then((response) => (response.ok ? response.json() : null))
            .then((body: { examples?: StartExampleSummary[] } | null) => {
                if (!cancelled && body?.examples) setExamples(body.examples);
            })
            .catch(() => undefined);
        return () => { cancelled = true; };
    }, [locale]);

    const matches = useMemo(() => searchStartExamples(examples, query), [examples, query]);
    const trimmed = query.trim();

    const choose = async (example: StartExampleSummary) => {
        setLoadingKey(example.key);
        setFailed(false);
        const ok = await onExample(example, trimmed);
        if (!ok) {
            setFailed(true);
            setLoadingKey(null);
        }
    };

    return (
        <section aria-labelledby={titleId} className="flex flex-col gap-4">
            <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--wk-success)]">{c.eyebrow}</p>
                <h1 id={titleId} className="mt-1.5 text-[28px] font-extrabold tracking-tight text-[var(--wk-ink)]">{c.title}</h1>
                <p className="mt-2 max-w-[60ch] text-[15px] leading-relaxed text-[var(--wk-ink-muted)]">{c.intro}</p>
            </div>

            <button
                type="button"
                onClick={onUpload}
                className="flex w-full items-center gap-3 rounded-[14px] border-2 border-[var(--wk-primary)] bg-[var(--wk-surface)] p-4 text-left transition-colors hover:bg-[var(--wk-surface-subtle)]"
            >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--wk-accent-soft)] text-[var(--wk-primary)]">
                    <Icon name="upload" size={20} />
                </span>
                <span className="flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                        <span className="text-[16px] font-extrabold text-[var(--wk-ink)]">{c.uploadTitle}</span>
                        <span className="rounded-full bg-[var(--wk-success-soft)] px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[var(--wk-success)]">{c.fastest}</span>
                    </span>
                    <span className="mt-0.5 block text-[14px] text-[var(--wk-ink-muted)]">{c.uploadText}</span>
                </span>
                <Icon name="arrowRight" size={18} className="shrink-0 text-[var(--wk-ink-muted)]" />
            </button>

            <div className="rounded-[14px] border border-[var(--wk-border)] bg-[var(--wk-surface)] p-4">
                <div className="flex items-start gap-3">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--wk-highlight-soft)] text-[var(--wk-warning)]">
                        <Icon name="file" size={20} />
                    </span>
                    <div className="min-w-0 flex-1">
                        <p className="text-[16px] font-extrabold text-[var(--wk-ink)]">{c.exampleTitle}</p>
                        <p className="mt-0.5 text-[14px] text-[var(--wk-ink-muted)]">{c.exampleText}</p>
                    </div>
                </div>
                <label htmlFor={searchId} className="mt-4 block text-[13px] font-bold text-[var(--wk-ink)]">{c.searchLabel}</label>
                <div className="relative mt-1.5">
                    <Icon name="search" size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--wk-ink-muted)]" />
                    <input
                        id={searchId}
                        type="search"
                        value={query}
                        onChange={(event) => { setQuery(event.target.value); setFailed(false); }}
                        placeholder={c.searchPlaceholder}
                        autoComplete="off"
                        className="w-full rounded-[10px] border border-[var(--wk-border-strong)] bg-[var(--wk-surface)] py-3 pl-10 pr-3 text-[15px] text-[var(--wk-ink)] outline-none focus:border-[var(--wk-focus)] focus:ring-2 focus:ring-[var(--wk-accent-soft)]"
                    />
                </div>
                {trimmed && matches.length > 0 ? (
                    <ul aria-label={c.results} className="mt-3 flex flex-col gap-2">
                        {matches.map((example) => (
                            <li key={example.key}>
                                <button
                                    type="button"
                                    onClick={() => void choose(example)}
                                    disabled={loadingKey !== null}
                                    className="flex w-full items-center justify-between gap-3 rounded-[10px] border border-[var(--wk-border)] px-3.5 py-3 text-left hover:border-[var(--wk-primary)] hover:bg-[var(--wk-surface-subtle)] disabled:opacity-60"
                                >
                                    <span className="min-w-0">
                                        <span className="block text-[15px] font-bold text-[var(--wk-ink)]">{example.name}</span>
                                        {example.group ? <span className="block text-[12px] text-[var(--wk-ink-muted)]">{example.group}</span> : null}
                                    </span>
                                    <span className="shrink-0 text-[13px] font-bold text-[var(--wk-primary)]">
                                        {loadingKey === example.key ? c.loading : <Icon name="arrowRight" size={17} />}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : null}
                {trimmed && examples.length > 0 && matches.length === 0 ? (
                    <p className="mt-3 text-[13px] text-[var(--wk-ink-muted)]" role="status">{c.none(trimmed)}</p>
                ) : null}
                {failed ? <p className="mt-3 text-[13px] font-bold text-[var(--wk-danger)]" role="alert">{c.failed}</p> : null}
            </div>

            <button
                type="button"
                onClick={onBlank}
                className="self-start rounded-[10px] px-1 py-2 text-[15px] font-bold text-[var(--wk-primary)] underline underline-offset-4 hover:text-[var(--wk-primary-hover)]"
            >
                {c.blank}
            </button>
        </section>
    );
}
