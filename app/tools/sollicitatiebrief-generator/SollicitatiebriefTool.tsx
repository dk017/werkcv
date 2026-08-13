"use client";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { track } from "@/lib/analytics";
import {
  getMotivationLetterPreset,
  type MotivationLetterTone,
} from "@/lib/motivation-letter-presets";

type Locale = "nl" | "en";

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
    vacancyLabel: "Vacaturetekst (optioneel, aanbevolen)",
    vacancyPlaceholder: "Plak de belangrijkste taken, eisen en gewenste vaardigheden uit de vacature…",
    vacancyHint: "Met de vacature kan de brief jouw bewijs aan de juiste eisen koppelen.",
    motivationLabel: "Jouw bewijs & achtergrond",
    motivationPlaceholder: "bijv. 5 jaar UX-ervaring in e-commerce. Herontwierp de mobiele checkout na usabilitytests; het aantal afgeronde bestellingen steeg met 12%. Werkt dagelijks met Figma en een productteam…",
    motivationHint: "Noem alleen ervaring, vaardigheden en resultaten die je in een gesprek kunt toelichten.",
    companyMotivationLabel: "Waarom deze rol of organisatie? (optioneel)",
    companyMotivationPlaceholder: "bijv. Ik wil dichter op productbeslissingen werken en word enthousiast van jullie focus op toegankelijk online winkelen…",
    companyMotivationHint: "Laat dit leeg als je nog geen specifieke reden hebt; de generator verzint er geen.",
    privacyNote: "Plak geen BSN, medische gegevens, privégegevens van klanten of andere vertrouwelijke informatie.",
    presetLoaded: "Voorbeeld geladen",
    presetHelp: "De voorbeeldgegevens staan klaar. Vervang ze door je eigen controleerbare ervaring voordat je genereert.",
    chooseOther: "Kies een ander voorbeeld",
    validationError: "Vul je doelrol en minimaal 20 tekens controleerbare achtergrond in.",
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
    reviewTitle: "Controleer vóór je verstuurt",
    reviewIntro: "AI maakt een eerste versie. Jij blijft verantwoordelijk voor de inhoud.",
    reviewItems: [
      "Zijn functie, organisatie en aanhef juist?",
      "Kun je elk genoemd resultaat en elke vaardigheid uitleggen?",
      "Klinkt de brief als jij en sluit hij aantoonbaar aan op de vacature?",
      "Heb je spelling, contactgegevens en sollicitatie-instructies gecontroleerd?",
    ],
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
    vacancyLabel: "Vacancy text (optional, recommended)",
    vacancyPlaceholder: "Paste the key responsibilities, requirements and desired skills from the vacancy…",
    vacancyHint: "The vacancy lets the letter connect your evidence to the right requirements.",
    motivationLabel: "Your evidence & background",
    motivationPlaceholder: "for example 4 years in SaaS customer success. Rebuilt the onboarding flow with product and support, reducing time-to-value by 18%. Works daily with HubSpot and customer education…",
    motivationHint: "Only include experience, skills and results you can explain in an interview.",
    companyMotivationLabel: "Why this role or organisation? (optional)",
    companyMotivationPlaceholder: "for example I want to work closer to product decisions and your focus on accessible travel technology appeals to me…",
    companyMotivationHint: "Leave this blank if you do not have a specific reason yet; the generator will not invent one.",
    privacyNote: "Do not paste national ID numbers, medical data, private customer details or other confidential information.",
    presetLoaded: "Example loaded",
    presetHelp: "The example details are ready. Replace them with your own verifiable experience before generating.",
    chooseOther: "Choose another example",
    validationError: "Enter your target role and at least 20 characters of verifiable background.",
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
    reviewTitle: "Check before you send",
    reviewIntro: "AI creates a first draft. You remain responsible for the content.",
    reviewItems: [
      "Are the role, organisation and salutation correct?",
      "Can you explain every result and skill mentioned?",
      "Does the letter sound like you and demonstrably match the vacancy?",
      "Did you check spelling, contact details and application instructions?",
    ],
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
  const searchParams = useSearchParams();
  const selectedPreset = locale === "nl"
    ? getMotivationLetterPreset(searchParams.get("voorbeeld"))
    : undefined;

  const [naam, setNaam] = useState("");
  const [doelrol, setDoelrol] = useState(selectedPreset?.role ?? "");
  const [bedrijfsnaam, setBedrijfsnaam] = useState("");
  const [vacaturetekst, setVacaturetekst] = useState("");
  const [motivatie, setMotivatie] = useState(selectedPreset?.context ?? "");
  const [bedrijfsmotivatie, setBedrijfsmotivatie] = useState("");
  const [toon, setToon] = useState<MotivationLetterTone>(selectedPreset?.tone ?? "professioneel");
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
    track("cover_letter_generator_started", {
      preset: selectedPreset?.slug ?? "manual",
      locale,
      tone: toon,
    });

    try {
      const res = await fetch(`/api/tools/sollicitatiebrief?locale=${locale}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          naam,
          doelrol,
          bedrijfsnaam,
          vacaturetekst,
          motivatie,
          bedrijfsmotivatie,
          toon,
          locale,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? strings.requestError);
        return;
      }
      setResult(json.brief ?? "");
      track("cover_letter_generator_completed", {
        preset: selectedPreset?.slug ?? "manual",
        locale,
      });
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
          {selectedPreset ? (
            <div className="border-2 border-black bg-[#FFF4C2] p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
                    {strings.presetLoaded}: {selectedPreset.label}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700">{strings.presetHelp}</p>
                </div>
                <Link
                  href="/motivatiebrief-voorbeeld#kies-voorbeeld"
                  className="shrink-0 text-xs font-black text-black underline decoration-2 underline-offset-4"
                >
                  {strings.chooseOther}
                </Link>
              </div>
            </div>
          ) : null}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
                {strings.nameLabel}
              </label>
              <input
                value={naam}
                onChange={(e) => setNaam(e.target.value)}
                placeholder={strings.namePlaceholder}
                maxLength={100}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
                {strings.roleLabel} <span className="text-red-500">*</span>
              </label>
              <input
                value={doelrol}
                onChange={(e) => {
                  setDoelrol(e.target.value);
                  setError("");
                }}
                placeholder={strings.rolePlaceholder}
                maxLength={160}
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
                maxLength={160}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
                {strings.toneLabel}
              </label>
              <select
                value={toon}
                onChange={(e) => setToon(e.target.value as MotivationLetterTone)}
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
              {strings.vacancyLabel}
            </label>
            <textarea
              value={vacaturetekst}
              onChange={(e) => {
                setVacaturetekst(e.target.value);
                setError("");
              }}
              placeholder={strings.vacancyPlaceholder}
              rows={5}
              maxLength={6000}
              className={`${inputClass} resize-y`}
            />
            <p className="mt-1 text-xs text-slate-500">{strings.vacancyHint}</p>
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
              maxLength={4000}
              className={`${inputClass} resize-y`}
            />
            <p className="mt-1 text-xs text-slate-500">{strings.motivationHint}</p>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
              {strings.companyMotivationLabel}
            </label>
            <textarea
              value={bedrijfsmotivatie}
              onChange={(e) => setBedrijfsmotivatie(e.target.value)}
              placeholder={strings.companyMotivationPlaceholder}
              rows={3}
              maxLength={1500}
              className={`${inputClass} resize-y`}
            />
            <p className="mt-1 text-xs text-slate-500">{strings.companyMotivationHint}</p>
          </div>

          <p className="border-l-4 border-amber-400 bg-amber-50 px-3 py-2 text-xs font-medium leading-relaxed text-amber-950">
            {strings.privacyNote}
          </p>

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

          <div className="border-2 border-black bg-[#FFF4C2] p-4">
            <p className="text-sm font-black text-slate-900">{strings.reviewTitle}</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-700">{strings.reviewIntro}</p>
            <ul className="mt-3 space-y-2">
              {strings.reviewItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs font-medium leading-relaxed text-slate-800">
                  <span aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 border-2 border-black bg-white" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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
