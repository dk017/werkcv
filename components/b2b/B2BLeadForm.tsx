"use client";

import { FormEvent, useState } from "react";
import { getStoredAttribution, track } from "@/lib/analytics";
import type { B2BLeadPage } from "@/lib/b2b-leads";

type SelectOption = {
  value: string;
  label: string;
};

type B2BLeadFormProps = {
  pageType: B2BLeadPage;
  pagePath: string;
  title: string;
  description: string;
  submitLabel: string;
  audienceLabel: string;
  audienceOptions: SelectOption[];
  volumeLabel?: string;
  volumeOptions?: SelectOption[];
  goalLabel?: string;
  goalPlaceholder?: string;
  notesPlaceholder?: string;
  successMessage?: string;
};

type FormState = {
  name: string;
  workEmail: string;
  organization: string;
  role: string;
  audienceType: string;
  monthlyVolume: string;
  timeline: string;
  goal: string;
  notes: string;
  website: string;
};

type FieldErrors = Partial<Record<keyof FormState | "form", string[]>>;

const defaultVolumeOptions: SelectOption[] = [
  { value: "under-10", label: "Minder dan 10 per maand" },
  { value: "10-30", label: "10 tot 30 per maand" },
  { value: "31-75", label: "31 tot 75 per maand" },
  { value: "76-150", label: "76 tot 150 per maand" },
  { value: "150-plus", label: "Meer dan 150 per maand" },
  { value: "unknown", label: "Nog niet scherp" },
];

const timelineOptions: SelectOption[] = [
  { value: "this-month", label: "Deze maand" },
  { value: "1-2-months", label: "Binnen 1 tot 2 maanden" },
  { value: "this-quarter", label: "Dit kwartaal" },
  { value: "researching", label: "Nog aan het orienteren" },
];

const initialState: FormState = {
  name: "",
  workEmail: "",
  organization: "",
  role: "",
  audienceType: "",
  monthlyVolume: "",
  timeline: "",
  goal: "",
  notes: "",
  website: "",
};

function getErrorMessage(fieldErrors: FieldErrors, field: keyof FormState | "form") {
  return fieldErrors[field]?.[0] || "";
}

export default function B2BLeadForm({
  pageType,
  pagePath,
  title,
  description,
  submitLabel,
  audienceLabel,
  audienceOptions,
  volumeLabel = "Volume of bereik",
  volumeOptions = defaultVolumeOptions,
  goalLabel = "Wat wil je opzetten?",
  goalPlaceholder = "Beschrijf kort je doelgroep, huidige werkwijze en wat je wilt testen of lanceren.",
  notesPlaceholder = "Optioneel: links, doelgroepdetails of vragen.",
  successMessage = "Ontvangen. We reageren normaal binnen 1 tot 2 werkdagen met een concrete vervolgstap.",
}: B2BLeadFormProps) {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasTrackedStart, setHasTrackedStart] = useState(false);

  const handleFieldFocus = () => {
    if (hasTrackedStart) return;
    track("b2b_form_started", { pageType, path: pagePath });
    setHasTrackedStart(true);
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setFormState((current) => ({ ...current, [field]: value }));

    if (fieldErrors[field]) {
      setFieldErrors((current) => ({ ...current, [field]: undefined }));
    }
    if (fieldErrors.form) {
      setFieldErrors((current) => ({ ...current, form: undefined }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);
    setFieldErrors({});

    try {
      const response = await fetch("/api/b2b-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formState,
          pageType,
          pagePath,
          attribution: getStoredAttribution(),
        }),
      });

      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
        fieldErrors?: FieldErrors;
      };

      if (!response.ok) {
        const reason = result.error || "Submission failed";
        setFieldErrors(result.fieldErrors || { form: [reason] });
        track("b2b_form_failed", { pageType, path: pagePath, reason });
        return;
      }

      setFormState(initialState);
      setFieldErrors({});
      setIsSuccess(true);
      track("b2b_form_submitted", { pageType, path: pagePath });
    } catch {
      const reason = "Netwerkfout. Probeer het opnieuw.";
      setFieldErrors({ form: [reason] });
      track("b2b_form_failed", { pageType, path: pagePath, reason });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <h3 className="mb-3 text-2xl font-black text-black">{title}</h3>
      <p className="mb-6 text-sm font-medium leading-relaxed text-gray-700">{description}</p>

      {isSuccess ? (
        <div className="border-2 border-black bg-emerald-200 p-4 text-sm font-bold text-black">
          {successMessage}
        </div>
      ) : null}

      {getErrorMessage(fieldErrors, "form") ? (
        <div className="mb-4 border-2 border-black bg-rose-200 p-4 text-sm font-bold text-black">
          {getErrorMessage(fieldErrors, "form")}
        </div>
      ) : null}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="website"
          value={formState.website}
          onChange={(event) => handleChange("website", event.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-black text-black">Naam</span>
            <input
              type="text"
              required
              value={formState.name}
              onFocus={handleFieldFocus}
              onChange={(event) => handleChange("name", event.target.value)}
              className="w-full border-2 border-black bg-[#FFFEF0] px-4 py-3 text-sm font-medium text-black outline-none transition-colors focus:bg-white"
              placeholder="Jouw naam"
            />
            {getErrorMessage(fieldErrors, "name") ? (
              <span className="mt-2 block text-xs font-bold text-red-700">
                {getErrorMessage(fieldErrors, "name")}
              </span>
            ) : null}
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-black text-black">Werk e-mail</span>
            <input
              type="email"
              required
              value={formState.workEmail}
              onFocus={handleFieldFocus}
              onChange={(event) => handleChange("workEmail", event.target.value)}
              className="w-full border-2 border-black bg-[#FFFEF0] px-4 py-3 text-sm font-medium text-black outline-none transition-colors focus:bg-white"
              placeholder="naam@bedrijf.nl"
            />
            {getErrorMessage(fieldErrors, "workEmail") ? (
              <span className="mt-2 block text-xs font-bold text-red-700">
                {getErrorMessage(fieldErrors, "workEmail")}
              </span>
            ) : null}
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-black text-black">Organisatie</span>
            <input
              type="text"
              required
              value={formState.organization}
              onFocus={handleFieldFocus}
              onChange={(event) => handleChange("organization", event.target.value)}
              className="w-full border-2 border-black bg-[#FFFEF0] px-4 py-3 text-sm font-medium text-black outline-none transition-colors focus:bg-white"
              placeholder="Bedrijfsnaam"
            />
            {getErrorMessage(fieldErrors, "organization") ? (
              <span className="mt-2 block text-xs font-bold text-red-700">
                {getErrorMessage(fieldErrors, "organization")}
              </span>
            ) : null}
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-black text-black">Jouw rol</span>
            <input
              type="text"
              required
              value={formState.role}
              onFocus={handleFieldFocus}
              onChange={(event) => handleChange("role", event.target.value)}
              className="w-full border-2 border-black bg-[#FFFEF0] px-4 py-3 text-sm font-medium text-black outline-none transition-colors focus:bg-white"
              placeholder="Bijvoorbeeld founder, coach of recruiter"
            />
            {getErrorMessage(fieldErrors, "role") ? (
              <span className="mt-2 block text-xs font-bold text-red-700">
                {getErrorMessage(fieldErrors, "role")}
              </span>
            ) : null}
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-black text-black">{audienceLabel}</span>
            <select
              required
              value={formState.audienceType}
              onFocus={handleFieldFocus}
              onChange={(event) => handleChange("audienceType", event.target.value)}
              className="w-full border-2 border-black bg-[#FFFEF0] px-4 py-3 text-sm font-medium text-black outline-none transition-colors focus:bg-white"
            >
              <option value="">Kies een optie</option>
              {audienceOptions.map((option) => (
                <option key={option.value} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
            {getErrorMessage(fieldErrors, "audienceType") ? (
              <span className="mt-2 block text-xs font-bold text-red-700">
                {getErrorMessage(fieldErrors, "audienceType")}
              </span>
            ) : null}
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-black text-black">{volumeLabel}</span>
            <select
              required
              value={formState.monthlyVolume}
              onFocus={handleFieldFocus}
              onChange={(event) => handleChange("monthlyVolume", event.target.value)}
              className="w-full border-2 border-black bg-[#FFFEF0] px-4 py-3 text-sm font-medium text-black outline-none transition-colors focus:bg-white"
            >
              <option value="">Kies een indicatie</option>
              {volumeOptions.map((option) => (
                <option key={option.value} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
            {getErrorMessage(fieldErrors, "monthlyVolume") ? (
              <span className="mt-2 block text-xs font-bold text-red-700">
                {getErrorMessage(fieldErrors, "monthlyVolume")}
              </span>
            ) : null}
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-black text-black">{goalLabel}</span>
          <textarea
            required
            rows={5}
            value={formState.goal}
            onFocus={handleFieldFocus}
            onChange={(event) => handleChange("goal", event.target.value)}
            className="w-full border-2 border-black bg-[#FFFEF0] px-4 py-3 text-sm font-medium text-black outline-none transition-colors focus:bg-white"
            placeholder={goalPlaceholder}
          />
          {getErrorMessage(fieldErrors, "goal") ? (
            <span className="mt-2 block text-xs font-bold text-red-700">
              {getErrorMessage(fieldErrors, "goal")}
            </span>
          ) : null}
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-black text-black">Gewenste timing</span>
            <select
              required
              value={formState.timeline}
              onFocus={handleFieldFocus}
              onChange={(event) => handleChange("timeline", event.target.value)}
              className="w-full border-2 border-black bg-[#FFFEF0] px-4 py-3 text-sm font-medium text-black outline-none transition-colors focus:bg-white"
            >
              <option value="">Kies een timing</option>
              {timelineOptions.map((option) => (
                <option key={option.value} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
            {getErrorMessage(fieldErrors, "timeline") ? (
              <span className="mt-2 block text-xs font-bold text-red-700">
                {getErrorMessage(fieldErrors, "timeline")}
              </span>
            ) : null}
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-black text-black">Extra context</span>
            <textarea
              rows={3}
            value={formState.notes}
            onFocus={handleFieldFocus}
            onChange={(event) => handleChange("notes", event.target.value)}
            className="w-full border-2 border-black bg-[#FFFEF0] px-4 py-3 text-sm font-medium text-black outline-none transition-colors focus:bg-white"
            placeholder={notesPlaceholder}
          />
            {getErrorMessage(fieldErrors, "notes") ? (
              <span className="mt-2 block text-xs font-bold text-red-700">
                {getErrorMessage(fieldErrors, "notes")}
              </span>
            ) : null}
          </label>
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-medium leading-relaxed text-gray-600">
            Door dit formulier te sturen geef je genoeg context om gericht te reageren. Geen
            nieuwsbriefinschrijving, geen automatische sales-sequence.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center border-4 border-black bg-yellow-400 px-6 py-3 text-base font-black text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            {isSubmitting ? "Bezig..." : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
