"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getStoredAttribution, track } from "@/lib/analytics";
import { normalizeAnalyticsPath } from "@/lib/analytics-paths";

const loginCopy = {
  nl: {
    eyebrow: "Je CV-editor staat klaar",
    title: "Ga verder naar je CV-editor",
    intro: "Geen wachtwoord nodig. We gebruiken je e-mailadres alleen om je CV veilig op te slaan en later terug te openen.",
    emailLabel: "E-mailadres",
    emailPlaceholder: "jij@voorbeeld.nl",
    sendCode: "Stuur code en ga verder",
    sending: "Bezig...",
    sentTo: "Code gestuurd naar",
    codeLabel: "6-cijferige code",
    verify: "Open mijn CV-editor",
    otherEmail: "Ander e-mailadres gebruiken",
    requestError: "Kon geen login code versturen.",
    verifyError: "Code is ongeldig of verlopen.",
    devCode: "Dev code",
    proof: ["Gratis bouwen", "Geen wachtwoord", "Geen abonnement"],
    reassurance: "Je betaalt pas wanneer je een PDF wilt downloaden.",
  },
  en: {
    eyebrow: "Your CV editor is ready",
    title: "Continue to your CV editor",
    intro: "No password needed. We only use your email to save your CV securely and let you return later.",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    sendCode: "Send code and continue",
    sending: "Working...",
    sentTo: "Code sent to",
    codeLabel: "6-digit code",
    verify: "Open my CV editor",
    otherEmail: "Use a different email address",
    requestError: "Could not send the login code.",
    verifyError: "The code is invalid or expired.",
    devCode: "Dev code",
    proof: ["Free to build", "No password", "No subscription"],
    reassurance: "You only pay when you want to download the PDF.",
  },
};

type LoginFormProps = {
  initialNext: string;
};

export default function LoginForm({ initialNext }: LoginFormProps) {
  const router = useRouter();
  const [next] = useState(initialNext);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [devCode, setDevCode] = useState<string | null>(null);
  const loginViewTrackedRef = useRef(false);

  const nextPath = normalizeAnalyticsPath(next);
  const locale = nextPath.startsWith("/en") ? "en" : "nl";
  const copy = loginCopy[locale];

  useEffect(() => {
    if (loginViewTrackedRef.current) return;
    track("login_view", { locale, nextPath });
    loginViewTrackedRef.current = true;
  }, [locale, nextPath]);

  const requestCode = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setDevCode(null);
    try {
      const response = await fetch("/api/auth/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        track("login_failed", {
          locale,
          nextPath,
          stage: "request_code",
          reason: data?.code === "INVALID_EMAIL" ? "invalid_email" : "server_error",
        });
        setError(data?.error || copy.requestError);
        return;
      }
      if (data?.devCode) {
        setDevCode(data.devCode);
      }
      track("login_code_requested", { locale, nextPath });
      setStep("code");
    } catch {
      track("login_failed", { locale, nextPath, stage: "request_code", reason: "network_error" });
      setError(copy.requestError);
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          code,
          next,
          attribution: getStoredAttribution(),
        }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        track("login_failed", {
          locale,
          nextPath,
          stage: "verify_code",
          reason: data?.code === "INVALID_CODE" ? "invalid_code" : "server_error",
        });
        setError(data?.error || copy.verifyError);
        return;
      }
      track("login_verified", {
        locale,
        nextPath,
        isNewUser: data?.isNewUser === true,
      });
      router.replace(typeof data?.redirectTo === "string" ? data.redirectTo : next);
    } catch {
      track("login_failed", { locale, nextPath, stage: "verify_code", reason: "network_error" });
      setError(copy.verifyError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#eef3f1] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
        <div className="mb-5">
          <Link href={locale === "en" ? "/en" : "/"} className="font-semibold text-lg text-slate-900">
            Werk<span className="bg-emerald-200 px-1 rounded-sm">CV</span>.nl
          </Link>
          <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
            {copy.eyebrow}
          </p>
          <h1 className="text-xl font-semibold text-slate-900 mt-3">{copy.title}</h1>
          <p className="text-sm text-slate-600 mt-1">{copy.intro}</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {copy.proof.map((item) => (
              <div key={item} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-2 text-center text-[11px] font-semibold text-slate-700">
                {item}
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs font-medium text-slate-500">{copy.reassurance}</p>
        </div>

        {step === "email" ? (
          <form onSubmit={requestCode} className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
                {copy.emailLabel}
              </label>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                placeholder={copy.emailPlaceholder}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-2.5 rounded-md font-semibold border border-emerald-700 hover:bg-emerald-700 transition-colors disabled:opacity-60"
            >
              {loading ? copy.sending : copy.sendCode}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyCode} className="space-y-4">
            <div className="text-sm text-slate-600">
              {copy.sentTo} <strong>{email}</strong>.
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
                {copy.codeLabel}
              </label>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                pattern="\d{6}"
                maxLength={6}
                inputMode="numeric"
                autoComplete="one-time-code"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                placeholder="123456"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-2.5 rounded-md font-semibold border border-emerald-700 hover:bg-emerald-700 transition-colors disabled:opacity-60"
            >
              {loading ? copy.sending : copy.verify}
            </button>
            <button
              type="button"
              onClick={() => setStep("email")}
              className="w-full bg-slate-100 text-slate-700 py-2 rounded-md font-semibold border border-slate-300 hover:bg-slate-200 transition-colors"
            >
              {copy.otherEmail}
            </button>
            {devCode && (
              <div className="text-xs text-amber-900 bg-amber-100 border border-amber-300 rounded-md px-3 py-2">
                {copy.devCode}: <strong>{devCode}</strong>
              </div>
            )}
          </form>
        )}

        {error && (
          <div role="alert" className="mt-4 text-sm text-rose-800 bg-rose-100 border border-rose-300 rounded-md px-3 py-2">
            {error}
          </div>
        )}
      </div>
    </main>
  );
}
