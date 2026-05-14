"use client";

import { useEffect, useMemo, useState } from "react";
import TrackedToolLink from "@/components/analytics/TrackedToolLink";
import { track } from "@/lib/analytics";

type ToolLanguage = "nl" | "en";

type PreviewSection = {
  key: string;
  title: string;
  lines: string[];
};

type PreviewPayload = {
  sections: PreviewSection[];
  detectedLanguage: ToolLanguage;
  suggestedTitle: string;
  suggestedName: string;
};

function sectionToClipboardText(section: PreviewSection) {
  return section.lines.join("\n\n").trim();
}

export default function LinkedinToCvTool() {
  const [profileText, setProfileText] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [language, setLanguage] = useState<ToolLanguage>("nl");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<PreviewPayload | null>(null);

  useEffect(() => {
    track("linkedin_to_cv_tool_view", {
      page_path: "/tools/linkedin-naar-cv",
    });
  }, []);

  const sectionCount = useMemo(() => result?.sections.length || 0, [result]);

  async function handleSubmit() {
    const trimmed = profileText.trim();
    setError("");
    setResult(null);

    if (!trimmed) {
      setError("Plak eerst de tekst van je LinkedIn-profiel.");
      return;
    }

    if (trimmed.length < 180) {
      setError("De tekst lijkt te kort. Plak bijvoorbeeld ook je info-sectie, werkervaring en vaardigheden.");
      return;
    }

    setStatus("submitting");
    track("linkedin_to_cv_submit", {
      page_path: "/tools/linkedin-naar-cv",
      target_role: targetRole.trim() || undefined,
      language,
    });

    try {
      const response = await fetch("/api/linkedin-to-cv-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileText: trimmed,
          targetRole: targetRole.trim(),
          language,
        }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        setError(payload?.error || "Omzetten mislukt. Probeer het opnieuw.");
        setStatus("idle");
        return;
      }

      setResult(payload as PreviewPayload);
      setStatus("done");
      track("linkedin_to_cv_output_generated", {
        page_path: "/tools/linkedin-naar-cv",
        language,
        sections_generated: (payload as PreviewPayload).sections.length,
      });
    } catch (fetchError) {
      console.error("linkedin_to_cv_submit_failed", fetchError);
      setError("Omzetten mislukt. Probeer het opnieuw.");
      setStatus("idle");
    }
  }

  async function handleCopy(section: PreviewSection) {
    const text = sectionToClipboardText(section);
    await navigator.clipboard.writeText(text);
    track("linkedin_to_cv_copy_section", {
      page_path: "/tools/linkedin-naar-cv",
      section: section.key,
    });
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-2xl font-black text-slate-900">LinkedIn-profiel omzetten naar cv</h2>
        <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
          Plak je LinkedIn-tekst hieronder. Je krijgt daarna een cv-structuur met profieltekst, werkervaring, opleiding, vaardigheden en verbeterpunten.
        </p>

        <div className="mt-6 grid gap-5">
          <label className="block">
            <span className="mb-2 block text-sm font-black text-slate-900">LinkedIn-profieltekst</span>
            <textarea
              value={profileText}
              onChange={(event) => setProfileText(event.target.value)}
              placeholder="Plak hier de tekst van je LinkedIn-profiel, bijvoorbeeld je headline, info-sectie, werkervaring, opleiding en vaardigheden."
              className="min-h-[240px] w-full rounded-2xl border-2 border-black p-4 text-sm text-slate-800 outline-none"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-[1fr_220px]">
            <label className="block">
              <span className="mb-2 block text-sm font-black text-slate-900">Doelrol (optioneel)</span>
              <input
                value={targetRole}
                onChange={(event) => setTargetRole(event.target.value)}
                placeholder="Bijvoorbeeld: administratief medewerker, software ontwikkelaar, projectmanager"
                className="w-full rounded-2xl border-2 border-black p-3 text-sm text-slate-800 outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-black text-slate-900">CV-taal</span>
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value === "en" ? "en" : "nl")}
                className="w-full rounded-2xl border-2 border-black p-3 text-sm font-black text-slate-800 outline-none"
              >
                <option value="nl">Nederlands</option>
                <option value="en">Engels</option>
              </select>
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={status === "submitting"}
              className="border-4 border-black bg-[#4ECDC4] px-5 py-3 text-sm font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
            >
              {status === "submitting" ? "Bezig met omzetten..." : "Zet om naar cv"}
            </button>
            <TrackedToolLink
              href="/cv-maken"
              eventName="linkedin_to_cv_cta_editor_click"
              trackingLocation="linkedin_to_cv:hero_secondary"
              trackingLabel="Maak direct een nieuw cv"
              className="border-4 border-black bg-white px-5 py-3 text-sm font-black text-black"
            >
              Maak direct een nieuw cv
            </TrackedToolLink>
          </div>

          <p className="text-sm font-medium text-slate-700">
            Gratis starten. Betaal alleen als je later je cv als PDF downloadt.
          </p>
          <p className="text-xs font-medium text-slate-500">
            Plak alleen informatie die je wilt gebruiken voor je cv. WerkCV vraagt niet om je LinkedIn-login.
          </p>
          {error && <p className="text-sm font-black text-red-600">{error}</p>}
        </div>
      </section>

      {result && (
        <section className="rounded-3xl border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Output</p>
              <h2 className="mt-2 text-2xl font-black text-slate-900">
                Je LinkedIn-profiel als cv-structuur
              </h2>
              <p className="mt-2 text-sm font-medium text-slate-700">
                {result.suggestedName || "Profiel"} {result.suggestedTitle ? `• ${result.suggestedTitle}` : ""}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-600">
                {sectionCount} secties gegenereerd. Gebruik dit als basis en maak daarna een nette sollicitatieversie.
              </p>
            </div>
            <TrackedToolLink
              href="/cv-checken"
              eventName="linkedin_to_cv_cta_editor_click"
              trackingLocation="linkedin_to_cv:output_followup"
              trackingLabel="Check je cv daarna ook"
              className="border-2 border-black bg-[#FFF7E8] px-4 py-2 text-sm font-black text-black"
            >
              Check je cv daarna ook
            </TrackedToolLink>
          </div>

          <div className="mt-6 space-y-5">
            {result.sections.map((section) => (
              <article key={section.key} className="rounded-2xl border-2 border-black bg-[#FFFEF9] p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-black text-slate-900">{section.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(section)}
                      className="border-2 border-black bg-white px-3 py-2 text-xs font-black text-black"
                    >
                      Kopieer tekst
                    </button>
                    <TrackedToolLink
                      href="/editor"
                      eventName="linkedin_to_cv_cta_editor_click"
                      trackingLocation={`linkedin_to_cv:${section.key}:editor`}
                      trackingLabel="Gebruik in mijn WerkCV"
                      className="border-2 border-black bg-[#4ECDC4] px-3 py-2 text-xs font-black text-black"
                    >
                      Gebruik in mijn WerkCV
                    </TrackedToolLink>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  {section.lines.map((line, index) => (
                    <div key={`${section.key}-${index}`} className="rounded-xl border border-slate-200 bg-white p-3">
                      <p className="whitespace-pre-line text-sm font-medium leading-relaxed text-slate-700">{line}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(78,205,196,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-200">Volgende stap</p>
            <h3 className="mt-2 text-2xl font-black text-white">
              Maak van deze LinkedIn-tekst een nette cv-PDF
            </h3>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-200">
              Je LinkedIn-profiel is vaak te breed of te informeel voor een sollicitatie. Gebruik de gegenereerde structuur als basis en maak er direct een professionele, ATS-vriendelijke cv van in WerkCV.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <TrackedToolLink
                href="/editor"
                eventName="linkedin_to_cv_cta_editor_click"
                trackingLocation="linkedin_to_cv:final_editor"
                trackingLabel="Maak mijn cv in WerkCV"
                className="border-4 border-white bg-[#4ECDC4] px-5 py-3 text-sm font-black text-black"
              >
                Maak mijn cv in WerkCV
              </TrackedToolLink>
              <TrackedToolLink
                href="/templates"
                eventName="linkedin_to_cv_cta_templates_click"
                trackingLocation="linkedin_to_cv:final_templates"
                trackingLabel="Bekijk cv-templates"
                className="border-4 border-white bg-transparent px-5 py-3 text-sm font-black text-white"
              >
                Bekijk cv-templates
              </TrackedToolLink>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-200">
              Gratis bouwen. Eénmalig €4,99 bij PDF-download. Geen abonnement.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
