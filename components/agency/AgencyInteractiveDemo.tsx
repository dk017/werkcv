"use client";

import { useRef, useState } from "react";
import type { CVData } from "@/lib/cv";
import { track } from "@/lib/analytics";
import ScaledCvPreview from "@/app/editor/ScaledCvPreview";
import AgencyCheckoutButton from "@/components/agency/AgencyCheckoutButton";

const initialDemoData: CVData = {
  personal: {
    name: "Sanne Vermeer",
    title: "HR-adviseur",
    resumeLanguage: "nl",
    email: "sanne.vermeer@example.com",
    phone: "06 1234 5678",
    location: "Utrecht",
    address: "",
    postalCode: "",
    summary:
      "Ervaren HR-adviseur met een rustige, praktische aanpak voor verzuimbegeleiding, onboarding en teamontwikkeling. Verbindt beleid met de dagelijkse praktijk en helpt organisaties om medewerkers duurzaam inzetbaar te houden.",
    birthDate: "",
    birthPlace: "",
    nationality: "",
    driversLicense: "B",
    gender: "",
    maritalStatus: "",
    linkedIn: "linkedin.com/in/sanne-vermeer",
    github: "",
    website: "",
    photo: "",
  },
  experience: [
    {
      role: "HR-adviseur",
      company: "MiddenNederland Zorggroep",
      location: "Utrecht",
      start: "maart 2021",
      end: "heden",
      description: "",
      highlights: [
        "Begeleiden van leidinggevenden bij verzuim, ontwikkeling en complexe personeelsvraagstukken.",
        "Verbeteren van onboarding en interne communicatie voor nieuwe medewerkers.",
        "Adviseren over HR-beleid en vertalen van organisatiedoelen naar werkbare processen.",
      ],
    },
    {
      role: "HR-medewerker",
      company: "PeopleWorks",
      location: "Amersfoort",
      start: "januari 2018",
      end: "februari 2021",
      description: "",
      highlights: [
        "Ondersteunen van HR-processen voor meerdere teams en locaties.",
        "Opstellen van rapportages en voorbereiden van personeelsgesprekken.",
      ],
    },
  ],
  education: [
    {
      degree: "HBO Personeel en Arbeid",
      school: "Hogeschool Utrecht",
      location: "Utrecht",
      start: "2014",
      end: "2018",
      description: "",
    },
  ],
  skills: [
    { name: "Verzuimbegeleiding", level: 5 },
    { name: "Onboarding", level: 5 },
    { name: "HR-beleid", level: 4 },
    { name: "Gespreksvoering", level: 4 },
  ],
  languages: [
    { name: "Nederlands", level: "Moedertaal" },
    { name: "Engels", level: "Goed" },
  ],
  internships: [],
  interests: [],
  properties: [],
  courses: [],
  awards: [],
  references: [],
  sideActivities: [],
  customSections: [],
};

type DemoField = "name" | "title" | "summary" | "experience" | "skills";

const inputClassName =
  "w-full border-2 border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

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
    <section id="agency-demo" className="border-y-2 border-slate-900 py-14">
      <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
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
            <p className="flex gap-2"><span className="text-emerald-700">✓</span> Geen CV-slot of account wordt aangemaakt</p>
            <p className="flex gap-2"><span className="text-emerald-700">✓</span> Fictieve kandidaatdata, live preview</p>
          </div>
          {!isOpen ? (
            <button
              type="button"
              onClick={openDemo}
              className="mt-7 inline-flex min-h-12 items-center justify-center border-2 border-slate-900 bg-yellow-300 px-5 py-3 text-center text-sm font-black text-slate-950 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
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
          <div className="border-2 border-slate-900 bg-white p-5 shadow-[6px_6px_0px_0px_rgba(78,205,196,1)] sm:p-7">
            <div className="border-2 border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Agency demo</p>
              <p className="mt-3 text-2xl font-black">Eén kandidaat. Eén vaste route.</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Test de belangrijkste handeling: inhoud aanpassen en meteen zien hoe het client-ready document eruitziet.
              </p>
              <div className="mt-6 grid gap-2 sm:grid-cols-3">
                {["Inhoud", "Opmaak", "PDF-ready"].map((item) => (
                  <span key={item} className="border-2 border-slate-900 bg-white px-3 py-2 text-center text-xs font-black">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 border-2 border-slate-900 bg-slate-950 p-4 shadow-[6px_6px_0px_0px_rgba(78,205,196,1)] sm:p-6 xl:grid-cols-[0.8fr_1.2fr]">
            <div className="border-2 border-slate-900 bg-white p-4 sm:p-5">
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

              <div className="mt-5 border-t-2 border-slate-200 pt-4">
                <p className="text-xs leading-relaxed text-slate-500">
                  Dit is een preview van de vaste voorstelroute. Met de Agency-toegang maakt jouw bureau voorstellen in een consistente opmaak.
                </p>
                <AgencyCheckoutButton
                  location="agency_demo"
                  label="Start met 50 CV's — €149/maand"
                  className="mt-4 inline-flex min-h-12 w-full items-center justify-center border-2 border-slate-900 bg-emerald-400 px-4 py-3 text-center text-sm font-black text-slate-950 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
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
