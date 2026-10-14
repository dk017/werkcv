"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { getStoredAttribution, track } from "@/lib/analytics";
import { cvDownloadPrice } from "@/lib/site-content";

// Download without an account (CV-check improve flow): the email and login code are asked here, next
// to the CV, instead of on a separate login page; then straight to the claim page, which saves the CV
// to the new account and opens checkout. Payment details stay on the payment provider's page.

export type CheckSummary = { first: number; current: number; doneCount: number; total: number };

const COPY = {
  nl: {
    eyebrow: "Klaar om te downloaden",
    improvedTitle: "Je cijfer ging omhoog",
    title: "Download je cv",
    fixed: (done: number, total: number) => `${done} van ${total} verbeterpunten opgelost`,
    emailLabel: "Je e-mailadres",
    emailHint: "We mailen je een code, zo bewaar je je cv.",
    continue: `Verder naar betalen · ${cvDownloadPrice.display}`,
    sentTo: (email: string) => `We hebben een code gestuurd naar ${email}.`,
    codeLabel: "6-cijferige code",
    confirm: "Bevestig en ga naar betalen",
    otherEmail: "Ander e-mailadres",
    working: "Bezig…",
    priceLine: "Eenmalig, geen abonnement · daarna onbeperkt aanpassen en opnieuw downloaden",
    notice: "We sturen je af en toe een bericht over je cv. Afmelden kan altijd.",
    back: "Terug naar je cv",
    requestError: "Kon geen code versturen. Controleer je e-mailadres.",
    verifyError: "De code is ongeldig of verlopen.",
    devCode: "Dev code",
  },
  en: {
    eyebrow: "Ready to download",
    improvedTitle: "Your grade went up",
    title: "Download your CV",
    fixed: (done: number, total: number) => `${done} of ${total} points fixed`,
    emailLabel: "Your email address",
    emailHint: "We email you a code, so your CV is saved.",
    continue: `Continue to payment · ${cvDownloadPrice.displayEn}`,
    sentTo: (email: string) => `We sent a code to ${email}.`,
    codeLabel: "6-digit code",
    confirm: "Confirm and continue to payment",
    otherEmail: "Use a different email",
    working: "Working…",
    priceLine: "One-time, no subscription · then edit and download again as often as you like",
    notice: "We occasionally email you about your CV. You can unsubscribe at any time.",
    back: "Back to your CV",
    requestError: "Could not send a code. Check your email address.",
    verifyError: "The code is invalid or expired.",
    devCode: "Dev code",
  },
} as const;

export default function DownloadDialog({
  locale,
  claimPath,
  summary,
  onClose,
}: {
  locale: "nl" | "en";
  claimPath: string;
  summary: CheckSummary | null;
  onClose: () => void;
}) {
  const copy = COPY[locale];
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [devCode, setDevCode] = useState<string | null>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const format = (value: number) => new Intl.NumberFormat(locale === "en" ? "en-GB" : "nl-NL", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value);
  const improved = summary && summary.current > summary.first;

  // The parent passes a new onClose on every render; a ref keeps this effect to one run per opening
  // (one login_view, focus returned once).
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });
  const viewTrackedRef = useRef(false);
  useEffect(() => {
    // Once per opening, also when React runs effects twice in development (as LoginForm does).
    if (!viewTrackedRef.current) track("login_view", { locale, nextPath: "/editor/claim" });
    viewTrackedRef.current = true;
    const previous = document.activeElement as HTMLElement | null;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [locale]);

  useEffect(() => {
    firstFieldRef.current?.focus();
  }, [step]);

  const requestCode = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        track("login_failed", { locale, nextPath: "/editor/claim", stage: "request_code", reason: data?.code === "INVALID_EMAIL" ? "invalid_email" : "server_error" });
        setError(data?.error || copy.requestError);
        return;
      }
      if (data?.devCode) setDevCode(data.devCode);
      track("login_code_requested", { locale, nextPath: "/editor/claim" });
      setStep("code");
    } catch {
      track("login_failed", { locale, nextPath: "/editor/claim", stage: "request_code", reason: "network_error" });
      setError(copy.requestError);
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, next: claimPath, locale, attribution: getStoredAttribution() }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        track("login_failed", { locale, nextPath: "/editor/claim", stage: "verify_code", reason: data?.code === "INVALID_CODE" ? "invalid_code" : "server_error" });
        setError(data?.error || copy.verifyError);
        return;
      }
      track("login_verified", { locale, nextPath: "/editor/claim", isNewUser: data?.isNewUser === true });
      window.location.assign(typeof data?.redirectTo === "string" ? data.redirectTo : claimPath);
    } catch {
      track("login_failed", { locale, nextPath: "/editor/claim", stage: "verify_code", reason: "network_error" });
      setError(copy.verifyError);
      setLoading(false);
    }
  };

  return (
    <div className="werkcv-brand fixed inset-0 z-[80] flex items-center justify-center bg-[rgb(16_32_29/0.45)] p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="download-dialog-title"
        className="w-full max-w-[480px] rounded-[var(--wk-radius-lg)] bg-[var(--wk-surface)] p-6 shadow-[var(--wk-shadow-md)]"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[var(--wk-success)]">{copy.eyebrow}</p>
        <h2 id="download-dialog-title" className="mt-1 text-2xl font-extrabold text-[var(--wk-ink)]">
          {improved ? copy.improvedTitle : copy.title}
        </h2>
        {improved && summary && (
          <p className="mt-3 flex items-center gap-3">
            <span className="text-3xl font-extrabold text-[var(--wk-ink-muted)]">{format(summary.first)}</span>
            <span aria-hidden="true" className="text-xl text-[var(--wk-ink-muted)]">→</span>
            <span className="text-4xl font-extrabold text-[var(--wk-success)]">{format(summary.current)}</span>
          </p>
        )}
        {summary && summary.doneCount > 0 && <p className="mt-2 text-sm font-semibold text-[var(--wk-ink)]">✓ {copy.fixed(summary.doneCount, summary.total)}</p>}

        {step === "email" ? (
          <form onSubmit={requestCode} className="mt-5">
            <label className="block text-sm font-bold text-[var(--wk-ink)]" htmlFor="download-dialog-email">
              {copy.emailLabel}
            </label>
            <p className="text-xs text-[var(--wk-ink-muted)]">{copy.emailHint}</p>
            <input
              ref={firstFieldRef}
              id="download-dialog-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={locale === "en" ? "you@example.com" : "jij@voorbeeld.nl"}
              className="wk-input mt-2 w-full"
            />
            {error && <p role="alert" className="mt-2 text-sm text-[var(--wk-danger)]">{error}</p>}
            <button type="submit" disabled={loading} className="wk-button wk-button-primary mt-3 w-full justify-center py-3 text-base">
              {loading ? copy.working : copy.continue}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyCode} className="mt-5">
            <p className="text-sm text-[var(--wk-ink)]">{copy.sentTo(email)}</p>
            <label className="mt-3 block text-sm font-bold text-[var(--wk-ink)]" htmlFor="download-dialog-code">
              {copy.codeLabel}
            </label>
            <input
              ref={firstFieldRef}
              id="download-dialog-code"
              required
              pattern="\d{6}"
              maxLength={6}
              inputMode="numeric"
              autoComplete="one-time-code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="123456"
              className="wk-input mt-2 w-full tracking-[0.3em]"
            />
            {devCode && <p className="mt-1 text-xs text-[var(--wk-ink-muted)]">{copy.devCode}: {devCode}</p>}
            {error && <p role="alert" className="mt-2 text-sm text-[var(--wk-danger)]">{error}</p>}
            <button type="submit" disabled={loading} className="wk-button wk-button-primary mt-3 w-full justify-center py-3 text-base">
              {loading ? copy.working : copy.confirm}
            </button>
            <button type="button" className="mt-2 text-sm font-semibold text-[var(--wk-ink-muted)] underline underline-offset-4" onClick={() => { setStep("email"); setCode(""); setError(null); }}>
              {copy.otherEmail}
            </button>
          </form>
        )}

        <p className="mt-3 text-center text-xs text-[var(--wk-ink-muted)]">{copy.priceLine}</p>
        <p className="mt-1 text-center text-xs text-[var(--wk-ink-muted)]">{copy.notice}</p>
        <p className="mt-4 text-center">
          <button type="button" className="wk-button wk-button-secondary wk-button-small" onClick={onClose}>
            {copy.back}
          </button>
        </p>
      </div>
    </div>
  );
}
