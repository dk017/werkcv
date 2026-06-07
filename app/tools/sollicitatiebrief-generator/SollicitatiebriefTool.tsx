"use client";
import { useState } from "react";

type Locale = "nl" | "en";
type Tone = "professioneel" | "enthousiast" | "beknopt";

type SollicitatiebriefToolProps = {
  locale?: Locale;
  cvHref?: string;
};

const copy = {
  nl: {
    nameLabel: "Jouw naam (optioneel)",
    namePlaceholder: "bijv. Lisa de Vries",
    roleLabel: "Doelrol",
    rolePlaceholder: "bijv. UX Designer",
    companyLabel: "Bedrijfsnaam (optioneel)",
    companyPlaceholder: "bijv. Bol.com",
    toneLabel: "Toon",
    motivationLabel: "Jouw motivatie & achtergrond",
    motivationPlaceholder: "bijv. 5 jaar ervaring als UX designer in e-commerce. Gespecialiseerd in mobile-first design en usability testing. Wil graag naar een product-gedreven bedrijf waar ik meer impact kan maken...",
    motivationHint: "Meer context = een sterkere, persoonlijkere brief.",
    validationError: "Vul je doelrol en een korte motivatie in (minimaal 20 tekens).",
    requestError: "Genereren mislukt.",
    connectionError: "Verbindingsfout. Probeer het opnieuw.",
    generate: "Genereer sollicitatiebrief",
    generating: "Brief schrijven...",
    resultLabel: "Jouw sollicitatiebrief",
    generated: "✓ Gegenereerd",
    copy: "Kopieer brief",
    copied: "✓ Gekopieerd!",
    cvCta: "Maak ook je CV →",
    regenerate: "Opnieuw genereren",
    tones: {
      professioneel: "Professioneel",
      enthousiast: "Enthousiast",
      beknopt: "Beknopt",
    },
  },
  en: {
    nameLabel: "Your name (optional)",
    namePlaceholder: "for example Emma Johnson",
    roleLabel: "Target role",
    rolePlaceholder: "for example Customer Success Manager",
    companyLabel: "Company name (optional)",
    companyPlaceholder: "for example Booking.com",
    toneLabel: "Tone",
    motivationLabel: "Your motivation & background",
    motivationPlaceholder: "for example 4 years of experience in customer success at SaaS companies. Strong in onboarding, CRM follow-up and cross-team communication. Looking for a more product-led environment where I can improve retention and customer education...",
    motivationHint: "More context = a stronger, more personal letter.",
    validationError: "Enter your target role and a short motivation (minimum 20 characters).",
    requestError: "Generation failed.",
    connectionError: "Connection error. Please try again.",
    generate: "Generate cover letter",
    generating: "Writing letter...",
    resultLabel: "Your cover letter",
    generated: "✓ Generated",
    copy: "Copy letter",
    copied: "✓ Copied!",
    cvCta: "Build the matching CV →",
    regenerate: "Generate again",
    tones: {
      professioneel: "Professional",
      enthousiast: "Warm",
      beknopt: "Concise",
    },
  },
} as const;

export default function SollicitatiebriefTool({
  locale = "nl",
  cvHref,
}: SollicitatiebriefToolProps) {
  const strings = copy[locale];
  const resolvedCvHref = cvHref ?? (locale === "en" ? "/en/editor" : "/templates");

  const [naam, setNaam] = useState("");
  const [doelrol, setDoelrol] = useState("");
  const [bedrijfsnaam, setBedrijfsnaam] = useState("");
  const [motivatie, setMotivatie] = useState("");
  const [toon, setToon] = useState<Tone>("professioneel");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleGenerate() {
    if (!doelrol.trim() || motivatie.trim().length < 20) {
      setError(strings.validationError);
      return;
    }
    setError("");
    setIsLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/tools/sollicitatiebrief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ naam, doelrol, bedrijfsnaam, motivatie, toon, locale }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? strings.requestError);
        return;
      }
      setResult(json.brief ?? "");
    } catch {
      setError(strings.connectionError);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-8">
      {!result ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
                {strings.nameLabel}
              </label>
              <input
                value={naam}
                onChange={(e) => setNaam(e.target.value)}
                placeholder={strings.namePlaceholder}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
                {strings.roleLabel} <span className="text-red-500">*</span>
              </label>
              <input
                value={doelrol}
                onChange={(e) => setDoelrol(e.target.value)}
                placeholder={strings.rolePlaceholder}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
                {strings.companyLabel}
              </label>
              <input
                value={bedrijfsnaam}
                onChange={(e) => setBedrijfsnaam(e.target.value)}
                placeholder={strings.companyPlaceholder}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
                {strings.toneLabel}
              </label>
              <select
                value={toon}
                onChange={(e) => setToon(e.target.value as Tone)}
                className={inputClass}
              >
                <option value="professioneel">{strings.tones.professioneel}</option>
                <option value="enthousiast">{strings.tones.enthousiast}</option>
                <option value="beknopt">{strings.tones.beknopt}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
              {strings.motivationLabel} <span className="text-red-500">*</span>
            </label>
            <textarea
              value={motivatie}
              onChange={(e) => {
                setMotivatie(e.target.value);
                setError("");
              }}
              placeholder={strings.motivationPlaceholder}
              rows={5}
              className={`${inputClass} resize-none`}
            />
            <p className="mt-1 text-xs text-slate-400">{strings.motivationHint}</p>
          </div>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 border-3 border-black bg-[#4ECDC4] px-6 py-3 text-sm font-black text-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-teal-500 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:cursor-not-allowed disabled:opacity-50"
            style={{ borderWidth: "3px" }}
          >
            {isLoading ? (
              <>
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v8z" />
                </svg>
                {strings.generating}
              </>
            ) : (
              strings.generate
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wide text-slate-500">{strings.resultLabel}</span>
            <span className="rounded border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-600">
              {strings.generated}
            </span>
          </div>

          <div className="rounded-lg border-2 border-slate-200 bg-slate-50 p-4">
            <pre className="whitespace-pre-wrap font-sans text-sm font-medium leading-relaxed text-slate-800">{result}</pre>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleCopy}
              className="flex flex-1 items-center justify-center gap-2 border-3 border-black bg-black px-4 py-3 text-sm font-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] transition-all hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
              style={{ borderWidth: "3px" }}
            >
              {copied ? strings.copied : strings.copy}
            </button>
            <a
              href={resolvedCvHref}
              className="flex flex-1 items-center justify-center gap-2 border-3 border-black bg-[#4ECDC4] px-4 py-3 text-sm font-black text-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              style={{ borderWidth: "3px" }}
            >
              {strings.cvCta}
            </a>
          </div>

          <button
            onClick={() => {
              setResult("");
              setError("");
            }}
            className="w-full rounded-lg border border-slate-200 py-2 text-xs font-bold text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
          >
            {strings.regenerate}
          </button>
        </div>
      )}
    </div>
  );
}
