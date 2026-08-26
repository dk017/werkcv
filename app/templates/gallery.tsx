"use client";
/* eslint-disable react-hooks/static-components */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TemplateConfig, ColorTheme } from "@/lib/templates";
import { CVData, defaultCV, sampleCV } from "@/lib/cv";
import { getTemplateComponent, getTheme } from "@/app/editor/templates";
import Footer from "@/components/Footer";
import { getStoredAttribution, track } from "@/lib/analytics";
import { UiLanguage } from "@/lib/ui-language";
import { normalizeStartSource } from "@/lib/start-source";

interface TemplateGalleryProps {
  templates: TemplateConfig[];
  uiLanguage?: UiLanguage;
  initialStartSource?: string;
}

const categoryLabels: Record<UiLanguage, Record<string, string>> = {
  nl: {
    all: "Alle",
    classic: "Klassiek",
    modern: "Modern",
    creative: "Creatief",
    minimal: "Minimaal",
  },
  en: {
    all: "All",
    classic: "Classic",
    modern: "Modern",
    creative: "Creative",
    minimal: "Minimal",
  },
};

const templatePreviewData: CVData = {
  ...sampleCV,
  personal: {
    ...sampleCV.personal,
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    linkedIn: "linkedin.com/in/simone-van-roodenburg",
    github: "github.com/simoneroodenburg",
    website: "simoneroodenburg.dev",
    summary:
      "Gemotiveerde en enthousiaste lerares basisonderwijs met een passie voor het inspireren en begeleiden van jonge leerlingen. Ik vertaal leerdoelen naar praktische lessen, werk datagedreven aan leerresultaten en bouw sterke ouder- en teamcommunicatie.",
  },
  experience: [
    ...sampleCV.experience,
    {
      role: "Onderwijsassistent",
      company: "OBS De Horizon",
      location: "Utrecht",
      start: "augustus 2016",
      end: "juli 2018",
      description:
        "Ondersteunde leerkrachten in groep 3 en 5 bij taal- en rekendidactiek.",
      highlights: [
        "Differentiatieplannen opgesteld voor leerlingen met taalachterstand",
        "Projectweek georganiseerd met lokale bibliotheek en ouders",
      ],
    },
  ],
  courses: [
    ...sampleCV.courses,
    {
      name: "Didactisch Coachen",
      institution: "Onderwijsacademie NL",
      year: "2023",
    },
  ],
  awards: [
    "Docent van het Jaar nominatie (2022)",
    "Schoolinnovatie Award (team, 2021)",
  ],
  interests: [
    "Schilderen",
    "Kinderliteratuur",
    "Natuurwandelingen",
    "Onderwijsinnovatie",
  ],
};

const englishTemplatePreviewData: CVData = {
  ...templatePreviewData,
  personal: {
    ...templatePreviewData.personal,
    title: "Primary School Teacher",
    resumeLanguage: "en",
    summary:
      "Motivated and energetic primary school teacher with a strong focus on practical lessons, measurable learning progress, and clear communication with parents and colleagues.",
  },
  experience: templatePreviewData.experience.map((item, index) =>
    index === 0
      ? {
          ...item,
          role: "Primary School Teacher",
          start: "August 2020",
          end: "Present",
          description:
            "Develops engaging lessons and tracks learning progress across core subjects.",
        }
      : {
          ...item,
          role: "Teaching Assistant",
          start: "August 2016",
          end: "July 2018",
          description:
            "Supported teachers in language and math classes for mixed-ability groups.",
        },
  ),
  education: templatePreviewData.education.map((item) => ({
    ...item,
    degree: "Bachelor of Primary Education",
    start: "September 2012",
    end: "June 2016",
    description:
      "Focused on lesson planning, child development, and practical classroom management.",
  })),
  skills: [
    { name: "Differentiated teaching", level: 5 },
    { name: "Classroom management", level: 5 },
    { name: "Parent communication", level: 4 },
    { name: "Curriculum planning", level: 4 },
    { name: "Educational technology", level: 4 },
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "Dutch", level: "Good" },
    { name: "German", level: "Basic" },
  ],
  courses: [
    {
      name: "Instructional Coaching",
      institution: "Education Academy NL",
      year: "2023",
    },
  ],
  awards: [
    "Teacher of the Year nomination (2022)",
    "School Innovation Award (team, 2021)",
  ],
  interests: [
    "Painting",
    "Children's literature",
    "Nature walks",
    "Education innovation",
  ],
};

const templateDescriptionsEn: Record<string, string> = {
  professional:
    "Clean, credible, and modern. A safe choice for business-focused roles.",
  classical: "Timeless and mature. Strong fit for experienced professionals.",
  formal: "Structured and polished. Useful for management and consulting roles.",
  modern:
    "Fresh without losing recruiter safety. Good for contemporary office roles.",
  dynamic:
    "Sharper visual energy while staying ATS-aware and easy to scan.",
  jobboss:
    "Friendly and lively. Strong option for starters and creative applicants.",
  elegant: "Refined and balanced. Works well across many professional sectors.",
  remarkable:
    "Confident and distinctive without becoming noisy for recruiters.",
  sepia:
    "Warm, organized, and stylish. Useful when you want personality with structure.",
  simple: "Minimal and direct. Lets your experience do the talking.",
  robust: "Clear and information-dense. Good when you have more to show.",
  monochrome:
    "Typographic and focused. Strong if you want a calm, high-contrast layout.",
  ats: "Built for ATS readability first. Plain, structured, and keyword-friendly.",
};

function RichTemplatePreview({
  templateId,
  colorThemeId,
  data,
}: {
  templateId: string;
  colorThemeId: string;
  data: CVData;
}) {
  const TemplateComponent = getTemplateComponent(templateId);
  const theme = getTheme(templateId, colorThemeId);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-white">
      <div
        className="origin-top-left pointer-events-none"
        style={{
          transform: "scale(0.24)",
          width: `${100 / 0.24}%`,
        }}
      >
        <TemplateComponent data={data} theme={theme} />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white via-white/95 to-transparent" />
    </div>
  );
}

const recommendedTemplateIds = new Set(["professional", "classical", "ats", "modern"]);

const templatePriority: Record<string, number> = {
  professional: 0,
  classical: 1,
  ats: 2,
  modern: 3,
  formal: 4,
};

const quickStartTemplates = [
  {
    templateId: "professional",
    themeId: "charcoal",
  },
  {
    templateId: "classical",
    themeId: "charcoal",
  },
  {
    templateId: "ats",
    themeId: "charcoal",
  },
  {
    templateId: "modern",
    themeId: "ocean-blue",
  },
];

function getQuickStartCopy(templateId: string, uiLanguage: UiLanguage) {
  if (uiLanguage === "en") {
    if (templateId === "professional") {
      return {
        eyebrow: "Premium default",
        body: "Clean single-column layout with strong hierarchy. Best first choice when the CV must look worth sending and downloading.",
      };
    }
    if (templateId === "classical") {
      return {
        eyebrow: "Safest choice for most jobs",
        body: "Best starting point if you want a calm, credible application format for Dutch employers.",
      };
    }
    if (templateId === "ats") {
      return {
        eyebrow: "Strict ATS focus",
        body: "Pick this when scanability, standard headings, and keyword structure matter most for the vacancy.",
      };
    }
    return {
      eyebrow: "Modern but recruiter-safe",
      body: "More personality without becoming risky for recruiters or applicant tracking systems.",
    };
  }

  if (templateId === "professional") {
    return {
      eyebrow: "Premium standaard",
      body: "Rustige single-column opmaak met sterke hierarchie. Beste eerste keuze als je CV direct downloadwaardig moet voelen.",
    };
  }
  if (templateId === "classical") {
    return {
      eyebrow: "Veilige keuze voor de meeste vacatures",
      body: "Beste startpunt als je snel een rustige, geloofwaardige sollicitatieversie wilt voor Nederlandse werkgevers.",
    };
  }
  if (templateId === "ats") {
    return {
      eyebrow: "Strikte ATS-focus",
      body: "Kies deze als scanbaarheid, standaardkoppen en keyword-structuur het zwaarst meewegen voor de vacature.",
    };
  }
  return {
    eyebrow: "Modern maar veilig",
    body: "Meer uitstraling zonder onrustig te worden voor recruiters of sollicitatiesoftware.",
  };
}

export default function TemplateGallery({
  templates,
  uiLanguage = "nl",
  initialStartSource,
}: TemplateGalleryProps) {
  const router = useRouter();
  const isEnglish = uiLanguage === "en";
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState<string | null>(null);
  const [hoveredColors, setHoveredColors] = useState<Record<string, string>>({});

  const previewData = isEnglish ? englishTemplatePreviewData : templatePreviewData;

  const getTemplateName = (template: TemplateConfig) =>
    isEnglish ? template.name : template.nameDutch;
  const getTemplateDescription = (template: TemplateConfig) =>
    isEnglish ? templateDescriptionsEn[template.id] || template.description : template.description;

  const filteredTemplates = templates
    .filter((template) => {
      const matchesCategory =
        selectedCategory === "all" || template.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        template.nameDutch.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getTemplateDescription(template)
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((left, right) => {
      const leftPriority = templatePriority[left.id] ?? 999;
      const rightPriority = templatePriority[right.id] ?? 999;
      if (leftPriority !== rightPriority) return leftPriority - rightPriority;
      return getTemplateName(left).localeCompare(
        getTemplateName(right),
        isEnglish ? "en" : "nl",
      );
    });

  const categoryCounts: Record<string, number> = {
    all: templates.length,
    classic: templates.filter((template) => template.category === "classic").length,
    modern: templates.filter((template) => template.category === "modern").length,
    creative: templates.filter((template) => template.category === "creative").length,
    minimal: templates.filter((template) => template.category === "minimal").length,
  };

  const handleSelectTemplate = async (
    templateId: string,
    defaultThemeId: string,
    entryPoint = "template_gallery",
  ) => {
    const startSource = normalizeStartSource(initialStartSource) || entryPoint;
    setIsCreating(templateId);
    try {
      track("cta_clicked", { location: entryPoint, label: templateId });
      track("start_cv", { entryPoint, templateId });
      const attribution = getStoredAttribution();
      const initialData: CVData = {
        ...defaultCV,
        personal: {
          ...defaultCV.personal,
          resumeLanguage: isEnglish ? "en" : "nl",
        },
      };

      const response = await fetch("/api/create-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId,
          colorThemeId: defaultThemeId,
          attribution,
          startSource,
          initialData,
        }),
      });
      const raw = await response.text();
      let data: { cvId?: string; error?: string } | null = null;
      if (raw) {
        try {
          data = JSON.parse(raw) as { cvId?: string; error?: string };
        } catch {
          data = null;
        }
      }

      if (!response.ok) {
        if (response.status === 401) {
          const nextPath = `${isEnglish ? "/en" : ""}/editor?template=${encodeURIComponent(templateId)}&startSource=${encodeURIComponent(startSource)}`;
          router.push(`/login?next=${encodeURIComponent(nextPath)}`);
          return;
        }
        const message = data?.error || `Request failed with status ${response.status}`;
        throw new Error(message);
      }

      if (!data?.cvId || typeof data.cvId !== "string") {
        throw new Error("Missing cvId in create-cv response");
      }

      router.push(
        `${isEnglish ? "/en/editor" : "/editor"}?id=${encodeURIComponent(data.cvId)}&template=${encodeURIComponent(templateId)}&startSource=${encodeURIComponent(startSource)}`,
      );
    } catch (error) {
      console.error("Error creating CV:", error);
    } finally {
      setIsCreating(null);
    }
  };

  const handleUploadExisting = () => {
    const startSource = normalizeStartSource(initialStartSource) || "template_upload";
    track("cta_clicked", { location: "template_gallery_entry", label: "upload_existing_cv" });
    track("start_cv", { entryPoint: "template_upload" });
    setIsCreating("upload");
    router.push(
      `${isEnglish ? "/en" : ""}/editor?upload=1&startSource=${encodeURIComponent(startSource)}`,
    );
  };

  const getActiveTheme = (template: TemplateConfig): ColorTheme => {
    const hoveredThemeId = hoveredColors[template.id];
    if (hoveredThemeId) {
      return (
        template.colorThemes.find((theme) => theme.id === hoveredThemeId) ||
        template.colorThemes[0]
      );
    }
    return (
      template.colorThemes.find((theme) => theme.id === template.defaultThemeId) ||
      template.colorThemes[0]
    );
  };

  return (
    <main id="quick-start">
      <section className="wk-section">
        <div className="wk-container text-center">
          <div className="wk-eyebrow mb-4">
            <span>{isEnglish ? "Jobs in the Netherlands" : "Nederlandse sollicitaties"}</span>
          </div>
          <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight text-[var(--wk-ink)] md:text-5xl">
            {isEnglish ? "Choose your " : "Kies je "}
            <span className="wk-hero-highlight">
              {isEnglish ? "ATS-friendly" : "ATS-vriendelijke"}
            </span>
            {isEnglish ? " CV template" : " CV template"}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[var(--wk-ink-muted)]">
            {isEnglish
              ? "Compare ATS-friendly layouts for jobs in the Netherlands, choose the style that fits your target role, and switch template or color later if your content changes."
              : "Vergelijk ATS-vriendelijke layouts voor Nederlandse vacatures, kies de stijl die bij je rol past en wissel later nog van template of kleur als je inhoud verandert."}{" "}
            <span className="wk-inline-highlight">
              {isEnglish
                ? "Start free and pay once per CV when you want to download the PDF."
                : "Start gratis, betaal eenmalig per CV wanneer je wilt downloaden."}
            </span>
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="wk-trust-pill">
              {isEnglish ? "ATS-friendly" : "ATS-vriendelijk"}
            </span>
            <span className="wk-trust-pill">
              {isEnglish ? "For Dutch-market jobs" : "Voor NL vacatures"}
            </span>
            <span className="wk-trust-pill">
              {isEnglish ? "Download again later" : "Later opnieuw downloaden"}
            </span>
            <span className="wk-trust-pill">
              {isEnglish ? "No subscription" : "Geen abonnement"}
            </span>
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="wk-card grid gap-5 border-[var(--wk-primary)]/20 bg-[var(--wk-surface-subtle)] md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="wk-eyebrow">
                <span>{isEnglish ? "Already have a CV?" : "Heb je al een CV?"}</span>
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[var(--wk-ink)]">
                {isEnglish ? "Start from your existing CV" : "Begin met je bestaande CV"}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--wk-ink-muted)]">
                {isEnglish
                  ? "Upload a PDF or DOCX, review the extracted content, and keep editing in the same template workspace."
                  : "Upload een PDF of DOCX, controleer de overgenomen inhoud en bewerk alles verder in dezelfde template-werkruimte."}
              </p>
            </div>
            <button
              type="button"
              onClick={handleUploadExisting}
              disabled={isCreating !== null}
              className="wk-button wk-button-primary whitespace-nowrap"
            >
              {isCreating === "upload"
                ? isEnglish
                  ? "Opening upload..."
                  : "Upload openen..."
                : isEnglish
                  ? "Upload existing CV"
                  : "Bestaand CV uploaden"}
            </button>
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="mb-6 text-center">
            <p className="wk-eyebrow">
              <span>{isEnglish ? "Which one should I pick?" : "Welke moet ik kiezen?"}</span>
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--wk-ink-muted)]">
              {isEnglish
                ? "If you are unsure, start with Classical. We highlight it first because it feels safest for broad applications in the Netherlands."
                : "Als je twijfelt, begin met Klassiek. Die route geven we nu bewust voorrang omdat hij het veiligst voelt voor brede Nederlandse sollicitaties."}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {quickStartTemplates.map((item) => {
              const template = templates.find((entry) => entry.id === item.templateId);
              if (!template) return null;

              const quickStart = getQuickStartCopy(item.templateId, uiLanguage);

              return (
                <div key={item.templateId} className="wk-card">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--wk-ink-muted)]">
                    {quickStart.eyebrow}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-[var(--wk-ink)]">
                    {getTemplateName(template)}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[var(--wk-ink-muted)]">
                    {quickStart.body}
                  </p>
                  <button
                    onClick={() =>
                      handleSelectTemplate(
                        item.templateId,
                        item.themeId,
                        "template_quick_pick",
                      )
                    }
                    disabled={isCreating !== null}
                    className="wk-button wk-button-primary mt-5 w-full"
                  >
                    {isCreating === item.templateId
                      ? isEnglish
                        ? "Creating..."
                        : "Bezig..."
                      : isEnglish
                        ? `Start with ${getTemplateName(template)}`
                        : `Start met ${getTemplateName(template)}`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="wk-section pt-0">
        <div className="wk-container">
          <div className="mx-auto mb-8 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={isEnglish ? "Search by name or style..." : "Zoek op naam of stijl..."}
              className="wk-input w-full"
            />
          </div>

          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {Object.entries(categoryLabels[uiLanguage]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`wk-button wk-button-small ${
                  selectedCategory === key
                    ? "wk-button-primary"
                    : "wk-button-secondary"
                }`}
              >
                {label}
                <span
                  className={`ml-2 rounded-full px-1.5 py-0.5 text-xs font-semibold ${
                    selectedCategory === key
                      ? "bg-white/20"
                      : "bg-[var(--wk-surface-subtle)] text-[var(--wk-ink-muted)]"
                  }`}
                >
                  {categoryCounts[key]}
                </span>
              </button>
            ))}
          </div>

          <div className="wk-card mb-10">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--wk-ink-muted)]">
                  {isEnglish ? "Classical" : "Klassiek"}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                  {isEnglish
                    ? "Best choice if you want clarity, calm structure, and broad usability."
                    : "Beste keuze als je vooral rust, duidelijkheid en brede inzetbaarheid zoekt."}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--wk-ink-muted)]">
                  ATS
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                  {isEnglish
                    ? "Use this when the vacancy feels corporate, strict, or heavily keyword-driven."
                    : "Gebruik dit als de vacature corporate, streng of sterk keyword-gedreven aanvoelt."}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--wk-ink-muted)]">
                  Modern
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                  {isEnglish
                    ? "Choose this if you want more visual personality without losing recruiter safety."
                    : "Kies deze als je iets meer uitstraling wilt zonder recruiter-veiligheid op te geven."}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => {
              const activeTheme = getActiveTheme(template);

              return (
                <div
                  key={template.id}
                  className="wk-card group relative overflow-hidden p-0 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {recommendedTemplateIds.has(template.id) && (
                    <div className="absolute right-3 top-3 z-20">
                      <span className="wk-badge wk-badge-warning">
                        {isEnglish ? "Recommended" : "Aanbevolen"}
                      </span>
                    </div>
                  )}

                  <div
                    className="relative h-56 overflow-hidden p-4 md:h-72"
                    style={{ backgroundColor: "var(--wk-surface-subtle)" }}
                  >
                    <div className="relative z-10 h-full transition-transform duration-200 group-hover:scale-[1.01]">
                      <RichTemplatePreview
                        templateId={template.id}
                        colorThemeId={activeTheme.id}
                        data={previewData}
                      />
                    </div>
                  </div>

                  <div className="border-t border-[var(--wk-border)] p-5">
                    <h3 className="mb-1 text-xl font-semibold text-[var(--wk-ink)]">
                      {getTemplateName(template)}
                    </h3>
                    <p className="mb-4 text-sm leading-6 text-[var(--wk-ink-muted)]">
                      {getTemplateDescription(template)}
                    </p>

                    <div className="mb-4 flex items-center gap-2">
                      <span className="text-xs font-semibold text-[var(--wk-ink-muted)]">
                        {isEnglish ? "Colors:" : "Kleuren:"}
                      </span>
                      <div className="flex gap-1.5">
                        {template.colorThemes.slice(0, 6).map((theme) => (
                          <button
                            key={theme.id}
                            className={`h-6 w-6 rounded-full border transition-all ${
                              activeTheme.id === theme.id
                                ? "scale-110 border-[var(--wk-ink)] ring-2 ring-[var(--wk-accent-soft)]"
                                : "border-[var(--wk-border)] hover:scale-105"
                            }`}
                            style={{ backgroundColor: theme.primary }}
                            title={theme.name}
                            onMouseEnter={() =>
                              setHoveredColors((prev) => ({ ...prev, [template.id]: theme.id }))
                            }
                            onMouseLeave={() =>
                              setHoveredColors((prev) => ({ ...prev, [template.id]: "" }))
                            }
                          />
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        handleSelectTemplate(template.id, template.defaultThemeId)
                      }
                      disabled={isCreating !== null}
                      className="wk-button wk-button-secondary w-full"
                    >
                      {isCreating === template.id ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--wk-ink)] border-t-transparent" />
                          {isEnglish ? "Creating..." : "Bezig..."}
                        </span>
                      ) : isEnglish ? (
                        `Start with ${getTemplateName(template)}`
                      ) : (
                        `Start met ${getTemplateName(template)}`
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="py-16 text-center">
              <div className="wk-card inline-block px-8 py-4">
                <p className="font-medium text-[var(--wk-ink)]">
                  {searchQuery
                    ? isEnglish
                      ? `No templates found for "${searchQuery}". Try a different search.`
                      : `Geen templates gevonden voor "${searchQuery}". Probeer een andere zoekterm.`
                    : isEnglish
                      ? "No templates found in this category."
                      : "Geen templates gevonden in deze categorie."}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer variant="brand" uiLanguage={uiLanguage} />
    </main>
  );
}
