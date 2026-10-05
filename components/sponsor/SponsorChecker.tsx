"use client";

import { useRef, useState, type FormEvent } from "react";
import JobPassCallout from "@/components/pricing/JobPassCallout";
import { track } from "@/lib/analytics";
import type { SponsorSearchResult } from "@/lib/sponsor/register";
import { IND_SOURCE_URL, RESULT_COPY, formatRegisterDate, type SponsorLocale } from "./copy";

type Checked = SponsorSearchResult & { query: string; queryKind: "name" | "kvk"; registerDate: string | null };

/**
 * One request answers the question: the API returns the verdict and the matching register entries together.
 * `passPlacement` names the page this sits on, so clicks on the Job Pass callout under a result can be told apart.
 */
export default function SponsorChecker({ locale, passPlacement, initialQuery = "" }: { locale: SponsorLocale; passPlacement: string; initialQuery?: string }) {
  const copy = RESULT_COPY[locale];
  const [query, setQuery] = useState(initialQuery);
  const [result, setResult] = useState<Checked | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const latest = useRef(0);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const text = query.trim();
    if (text.length < 2 || loading) return;
    const request = ++latest.current;
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/tools/sponsor-check?q=${encodeURIComponent(text)}&locale=${locale}`);
      const data = (await response.json().catch(() => null)) as (Checked & { error?: string }) | null;
      if (request !== latest.current) return;
      if (!response.ok || !data || data.error) {
        setResult(null);
        setError(data?.error || (locale === "en" ? "The check is unavailable right now. Please try again." : "De check is nu niet beschikbaar. Probeer het opnieuw."));
        return;
      }
      setResult(data);
      track("sponsor_check_searched", { locale, status: data.status, match_count: data.total, query_kind: data.queryKind });
    } catch {
      if (request === latest.current) {
        setResult(null);
        setError(locale === "en" ? "Connection problem. Check your internet and try again." : "Verbindingsprobleem. Controleer je internet en probeer het opnieuw.");
      }
    } finally {
      if (request === latest.current) setLoading(false);
    }
  }

  const status = result ? copy[result.status] : null;
  const date = result ? formatRegisterDate(result.registerDate, locale) : "";

  return (
    <div>
      <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row" role="search">
        <label className="sr-only" htmlFor={`sponsor-q-${passPlacement}`}>
          {copy.label}
        </label>
        <input
          id={`sponsor-q-${passPlacement}`}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={copy.placeholder}
          maxLength={160}
          autoComplete="off"
          className="min-h-12 w-full flex-1 rounded-xl border border-[var(--wk-border)] bg-white px-4 text-base text-[var(--wk-ink)]"
        />
        <button type="submit" disabled={loading || query.trim().length < 2} className="wk-button wk-button-primary min-h-12 sm:w-40">
          {loading ? copy.searching : copy.button}
        </button>
      </form>

      <div aria-live="polite" className="mt-4">
        {error && <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">{error}</p>}

        {result && status && (
          <div className="space-y-4">
            <div
              className={`rounded-xl border p-4 ${
                result.status === "listed" ? "border-emerald-300 bg-emerald-50" : result.status === "possible" ? "border-amber-300 bg-amber-50" : "border-[var(--wk-border)] bg-white"
              }`}
              role="status"
            >
              <p className="font-semibold text-[var(--wk-ink)]">{status.title}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{status.body}</p>
              {result.matches.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {result.matches.map((match) => (
                    <li key={`${match.name}-${match.kvk}`} className="rounded-lg bg-white/70 p-3 text-sm">
                      <span className="font-semibold text-[var(--wk-ink)]">{match.name}</span>
                      <span className="block text-[var(--wk-ink-muted)]">
                        {copy.kvk} {match.kvk} · {match.match === "exact" ? copy.exact : copy.close}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {result.total > result.matches.length && <p className="mt-2 text-sm text-[var(--wk-ink-muted)]">{copy.more(result.matches.length, result.total)}</p>}
              <p className="mt-3 text-xs text-[var(--wk-ink-muted)]">
                {copy.registerDate(date)}{" "}
                <a href={IND_SOURCE_URL[locale]} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">
                  {copy.source}
                </a>
              </p>
            </div>
            <JobPassCallout locale={locale} placement={`${passPlacement}_result`} compact />
          </div>
        )}
      </div>
    </div>
  );
}
