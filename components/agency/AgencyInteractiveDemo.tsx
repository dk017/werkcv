"use client";

import { useRef, useState } from "react";
import type { CVData } from "@/lib/cv";
import { track } from "@/lib/analytics";
import { agencyFictionalCandidateData } from "@/lib/agency-fictional-example";
import { AGENCY_MONTHLY_CREDIT_LIMIT, getAgencyMonthlyPriceDisplay } from "@/lib/agency-plan";
import ScaledCvPreview from "@/app/editor/ScaledCvPreview";
import AgencyCheckoutButton from "@/components/agency/AgencyCheckoutButton";

const initialDemoData: CVData = structuredClone(agencyFictionalCandidateData);
const monthlyPrice = getAgencyMonthlyPriceDisplay("nl");

type DemoField = "name" | "title" | "summary" | "experience" | "skills";

const inputClassName =
  "wk-input w-full px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--wk-focus)] focus:ring-2 focus:ring-[var(--wk-accent-soft)]";

function getSkillsValue(data: CVData): string {
  return data.skills.map((skill) => skill.name).join(", ");
}
export default function AgencyInteractiveDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<CVData>(initialDemoData);
  const [pageCount, setPageCount] = useState(1);
  const trackedFields = useRef<Set<DemoField>>(new Set());

  const openDemo = () => {
    setIsOpen(true);
    track("agency_demo_started", { location: "agency_demo_section", mode: "sample" });
  };

  const trackField = (field: DemoField) => {
    if (trackedFields.current.has(field)) return;
    trackedFields.current.add(field);
    track("agency_demo_field_changed", { field, mode: "sample" });
  };

  const updatePersonal = (field: "name" | "title" | "summary", value: string) => {
    setData((current) => ({
      ...current,
      personal: { ...current.personal, [field]: value },
    }));
  };

  const updateExperience = (value: string) => {
    setData((current) => ({
      ...current,
      experience: current.experience.length
        ? [{ ...current.experience[0], role: value }]
        : current.experience,
    }));
  };

  const updateSkills = (value: string) => {
    const skills = value
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean)
      .slice(0, 8)
      .map((name) => ({ name, level: 4 }));

    setData((current) => ({ ...current, skills }));
  };

  return (
    <section id="agency-demo" className="wk-section border-y border-[var(--wk-border)]">
      <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-start">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
            Probeer de WerkCV-route
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Zie hoe een klant-CV er direct rustiger en voorstelbaar uitziet.
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Klik door een fictief Nederlands kandidaatprofiel en pas een paar velden aan. Je ziet dezelfde vaste CV-route die je bureau met Agency-toegang voor nieuwe CV&apos;s gebruikt.
          </p>
          <div className="mt-6 space-y-3 text-sm font-bold text-slate-700">
            <p className="flex gap-2"><span className="text-emerald-700">✓</span> Geen login voor deze demo</p>
            <p className="flex gap-2"><span className="text-emerald-700">✓</span> Geen CV-credit of account wordt aangemaakt</p>
            <p className="flex gap-2"><span className="text-emerald-700">✓</span> Fictieve kandidaatdata, live preview</p>
          </div>
          {!isOpen ? (
            <button
              type="button"
              onClick={openDemo}
              className="wk-button wk-button-primary mt-7 min-h-12 px-5 text-sm"
            >
              Start met een voorbeeld-CV
            </button>
          ) : (
            <p className="mt-7 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Pas links aan — de preview rechts verandert direct
            </p>
          )}
        </div>

        {!isOpen ? (
          <div className="wk-card p-5 sm:p-7">
            <div className="wk-card p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Agency demo</p>
              <p className="mt-3 text-2xl font-black">Eén kandidaat. Eén vaste route.</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Test de belangrijkste handeling: inhoud aanpassen en meteen zien hoe het client-ready document eruitziet.
              </p>
              <div className="mt-6 grid gap-2 sm:grid-cols-3">
                {["Inhoud", "Opmaak", "PDF-ready"].map((item) => (
                  <span key={item} className="wk-trust-pill justify-center rounded-[var(--wk-radius-sm)] bg-white px-3 py-2 text-center text-xs">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid min-w-0 gap-6 rounded-[var(--wk-radius-lg)] bg-[var(--wk-primary)] p-4 sm:p-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="wk-card p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Fictief kandidaatprofiel</p>
                  <h3 className="mt-2 text-xl font-black">Bewerk de inhoud</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-black text-slate-500 underline underline-offset-4 hover:text-slate-900"
                >
                  Sluiten
                </button>
              </div>

              <div className="mt-5 space-y-4">
                <label className="block text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                  Naam
                  <input
                    className={`${inputClassName} mt-1 normal-case tracking-normal`}
                    value={data.personal.name}
                    onChange={(event) => updatePersonal("name", event.target.value)}
                    onBlur={() => trackField("name")}
                  />
                </label>
                <label className="block text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                  Functietitel
                  <input
                    className={`${inputClassName} mt-1 normal-case tracking-normal`}
                    value={data.personal.title}
                    onChange={(event) => updatePersonal("title", event.target.value)}
                    onBlur={() => trackField("title")}
                  />
                </label>
                <label className="block text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                  Profieltekst
                  <textarea
                    className={`${inputClassName} mt-1 min-h-28 resize-y normal-case tracking-normal`}
                    value={data.personal.summary}
                    onChange={(event) => updatePersonal("summary", event.target.value)}
                    onBlur={() => trackField("summary")}
                  />
                </label>
                <label className="block text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                  Eerste functie
                  <input
                    className={`${inputClassName} mt-1 normal-case tracking-normal`}
                    value={data.experience[0]?.role || ""}
                    onChange={(event) => updateExperience(event.target.value)}
                    onBlur={() => trackField("experience")}
                  />
                </label>
                <label className="block text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                  Vaardigheden <span className="font-semibold normal-case tracking-normal">(komma&apos;s)</span>
                  <input
                    className={`${inputClassName} mt-1 normal-case tracking-normal`}
                    value={getSkillsValue(data)}
                    onChange={(event) => updateSkills(event.target.value)}
                    onBlur={() => trackField("skills")}
                  />
                </label>
              </div>

              <div className="mt-5 border-t border-[var(--wk-border)] pt-4">
                <p className="text-xs leading-relaxed text-slate-500">
                  Dit is een preview van de vaste voorstelroute. Met de Agency-toegang maakt jouw bureau voorstellen in een consistente opmaak.
                </p>
                <AgencyCheckoutButton
                  locale="nl"
                  location="agency_demo"
                  label={`Start met ${AGENCY_MONTHLY_CREDIT_LIMIT} CV-credits — ${monthlyPrice}`}
                  className="wk-button wk-button-accent mt-4 min-h-12 w-full disabled:cursor-wait disabled:opacity-60"
                />
              </div>
            </div>

            <div className="min-w-0">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-white">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-300">Live preview</p>
                  <p className="mt-1 text-sm font-bold text-slate-200">WerkCV MatchPack · Professional</p>
                </div>
                <span className="border border-slate-700 px-3 py-1 text-xs font-bold text-slate-300">
                  {pageCount} {pageCount === 1 ? "pagina" : "pagina's"}
                </span>
              </div>
              <div className="max-h-[720px] overflow-auto bg-slate-200 p-3 sm:p-5">
                <ScaledCvPreview
                  data={data}
                  templateId="professional"
                  colorThemeId="classic-blue"
                  scale={0.52}
                  pageCount={pageCount}
                  paginated
                  onPageCountChange={setPageCount}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
