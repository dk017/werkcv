"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getStoredAttribution, track } from "@/lib/analytics";
import { normalizeAnalyticsPath } from "@/lib/analytics-paths";
import { readEnglishRoleExampleSourceFromPath } from "@/lib/english-role-examples";

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
    exampleEyebrow: "Je voorbeeld staat klaar",
    exampleTitle: "Sla dit voorbeeld op en open de editor",
    exampleIntro: "Stuur jezelf een eenmalige code. Daarna zetten we dit voorbeeld direct klaar in jouw CV-editor.",
    resumeEyebrow: "Je PDF-upload staat klaar",
    resumeTitle: "Log in en ga verder met je PDF",
    resumeIntro: "Na het inloggen ga je terug naar de vertaler. Selecteer daar je PDF om direct verder te gaan.",
    resumeVerify: "Ga verder met PDF uploaden",
    agencyEyebrow: "MatchPack-werkruimte staat klaar",
    agencyTitle: "Ga verder naar je Agency-werkruimte",
    agencyIntro: "Gebruik hetzelfde e-mailadres als bij je Agency-plan. Je persoonlijke CV's en MatchPack-documenten blijven gescheiden.",
    agencyVerify: "Open mijn MatchPack-werkruimte",
    agencyReassurance: "Je komt alleen in de gedeelde Agency-werkruimte waarvoor je toegang hebt.",
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
    exampleEyebrow: "Your example is ready",
    exampleTitle: "Save this example and open the editor",
    exampleIntro: "Send yourself a one-time code. Then we will open this example directly in your CV editor.",
    resumeEyebrow: "Your PDF upload is ready",
    resumeTitle: "Sign in and continue with your PDF",
    resumeIntro: "After sign-in, you’ll return to the translator. Select your PDF there to continue immediately.",
    resumeVerify: "Continue PDF upload",
    agencyEyebrow: "Your MatchPack workspace is ready",
    agencyTitle: "Continue to your Agency workspace",
    agencyIntro: "Use the same email address as your Agency plan. Your personal CVs and MatchPack documents stay separate.",
    agencyVerify: "Open my MatchPack workspace",
    agencyReassurance: "You will only enter the shared Agency workspace you are entitled to use.",
  },
};

type LoginFormProps = {
  initialNext: string;
  initialLocale?: keyof typeof loginCopy;
};

export default function LoginForm({ initialNext, initialLocale }: LoginFormProps) {
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
  const locale = initialLocale || (nextPath.startsWith("/en") ? "en" : "nl");
  const copy = loginCopy[locale];
  const englishRoleExampleSource = readEnglishRoleExampleSourceFromPath(next);
  const roleExampleAnalytics = englishRoleExampleSource
    ? {
        roleSlug: englishRoleExampleSource.roleSlug,
        entryMethod: englishRoleExampleSource.entryMethod,
      }
    : {};
  const isExampleStart =
    englishRoleExampleSource?.entryMethod === "example" ||
    next.includes("startSource=example_page") ||
    next.includes("startSource=example_blank_template") ||
    next.includes("startSource=english_example_page") ||
    next.includes("startSource=linkedin_to_cv_tool") ||
    next.includes("startSource=salary_role_page");
  const isResumeUpload =
    next.includes("resumeUpload=continue") ||
    next.includes("upload=1") ||
    englishRoleExampleSource?.entryMethod === "upload";
  const isMatchPackStart = nextPath === "/agency/account" || nextPath.startsWith("/agency/account/");
  const eyebrow = isExampleStart
    ? copy.exampleEyebrow
    : isResumeUpload
      ? copy.resumeEyebrow
      : isMatchPackStart
        ? copy.agencyEyebrow
        : copy.eyebrow;
  const title = isExampleStart
    ? copy.exampleTitle
    : isResumeUpload
      ? copy.resumeTitle
      : isMatchPackStart
        ? copy.agencyTitle
        : copy.title;
  const intro = isExampleStart
    ? copy.exampleIntro
    : isResumeUpload
      ? copy.resumeIntro
      : isMatchPackStart
        ? copy.agencyIntro
        : copy.intro;
  const reassurance = isMatchPackStart ? copy.agencyReassurance : copy.reassurance;

  useEffect(() => {
    if (loginViewTrackedRef.current) return;
    track("login_view", { locale, nextPath, ...roleExampleAnalytics });
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
      track("login_code_requested", { locale, nextPath, ...roleExampleAnalytics });
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
        ...roleExampleAnalytics,
      });
      router.replace(typeof data?.redirectTo === "string" ? data.redirectTo : nextPath);
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
            {eyebrow}
          </p>
          <h1 className="text-xl font-semibold text-slate-900 mt-3">
            {title}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            {intro}
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {copy.proof.map((item) => (
              <div key={item} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-2 text-center text-[11px] font-semibold text-slate-700">
                {item}
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs font-medium text-slate-500">{reassurance}</p>
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
              {loading ? copy.sending : isMatchPackStart ? copy.agencyVerify : isResumeUpload ? copy.resumeVerify : copy.verify}
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
