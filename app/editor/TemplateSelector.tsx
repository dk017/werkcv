"use client";

import { createElement } from "react";
import { createPortal } from "react-dom";
import { templateList, getThemeById } from "@/lib/templates/registry";
import { TemplateConfig } from "@/lib/templates";
import { getTemplateComponent } from "@/app/editor/templates";
import type { CVData } from "@/lib/cv";
import { LinkTextProvider } from "@/app/editor/templates/link-utils";
import { UiLanguage } from "@/lib/ui-language";

const templateComponents = new Map(
  templateList.map((template) => [template.id, getTemplateComponent(template.id)]),
);

const templateGroups = [
  {
    id: "plain",
    label: { nl: "Rustig & ATS-veilig", en: "Plain & ATS-safe" },
    description: {
      nl: "Eenvoudige layouts zonder onnodige kleur of grafische afleiding.",
      en: "Simple layouts without unnecessary colour or visual distractions.",
    },
    templateIds: ["ats", "simple", "monochrome", "classical"],
  },
  {
    id: "professional",
    label: { nl: "Professioneel", en: "Professional" },
    description: {
      nl: "Evenwichtige layouts die bij de meeste functies passen.",
      en: "Balanced layouts that work for most roles.",
    },
    templateIds: ["professional", "formal", "elegant", "robust"],
  },
  {
    id: "modern",
    label: { nl: "Modern & opvallend", en: "Modern & expressive" },
    description: {
      nl: "Meer visuele hiërarchie en kleur voor een uitgesproken uitstraling.",
      en: "More visual hierarchy and colour for a distinctive look.",
    },
    templateIds: ["modern", "dynamic", "jobboss", "remarkable", "sepia"],
  },
] as const;

const previewPhoto = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
  <rect width="240" height="240" fill="#e8eef4"/>
  <circle cx="120" cy="92" r="46" fill="#f8fbff"/>
  <path d="M44 214c10-50 38-78 76-78s66 28 76 78" fill="#f8fbff"/>
  <circle cx="120" cy="92" r="42" fill="#d9e3ee"/>
  <path d="M57 214c10-42 33-64 63-64s53 22 63 64" fill="#c3d2e1"/>
  <path d="M78 91c6-27 22-41 44-41 25 0 42 18 42 44 0 6-1 12-3 18-8-11-18-17-32-17-18 0-33-7-51-4Z" fill="#293241"/>
</svg>
`)}`;

const dutchPreviewData: CVData = {
  personal: {
    name: "Sanne de Vries",
    title: "Marketing Specialist",
    resumeLanguage: "nl",
    email: "sanne.devries@example.com",
    phone: "06 1234 5678",
    location: "Utrecht",
    address: "",
    postalCode: "",
    summary:
      "Resultaatgerichte marketing specialist met 6 jaar ervaring in B2B-campagnes, contentstrategie en conversieoptimalisatie. Sterk in het vertalen van klantinzichten naar concrete acties, heldere rapportages en campagnes die sales meetbaar ondersteunen.",
    birthDate: "",
    birthPlace: "",
    nationality: "",
    driversLicense: "",
    gender: "",
    maritalStatus: "",
    linkedIn: "linkedin.com/in/sannedevries",
    github: "",
    website: "",
    photo: previewPhoto,
  },
  experience: [
    {
      role: "Marketing Specialist",
      company: "Nexa Digital",
      location: "Amsterdam",
      start: "2021",
      end: "heden",
      description:
        "Verantwoordelijk voor campagnes, contentplanning en performance-rapportages voor drie internationale productteams.",
      highlights: [
        "Ontwikkelde e-mail-, social- en landingspagina-campagnes met duidelijke KPI's en maandelijkse managementrapportages.",
        "Verhoogde leadconversie met 18% door A/B-tests, betere segmentatie en nauwe samenwerking met sales.",
        "Bouwde een contentkalender waarmee productlanceringen consistenter en sneller werden uitgerold.",
      ],
    },
    {
      role: "Online Marketeer",
      company: "Bright Retail Group",
      location: "Utrecht",
      start: "2018",
      end: "2021",
      description:
        "Ondersteunde SEO, SEA, nieuwsbrieven en productcampagnes voor meerdere webshops.",
      highlights: [
        "Schreef en optimaliseerde categoriepagina's, blogs en productteksten op basis van zoekintentie.",
        "Analyseerde campagneprestaties in Google Analytics en presenteerde verbeteracties aan stakeholders.",
      ],
    },
  ],
  education: [
    {
      degree: "HBO Communicatie",
      school: "Hogeschool Utrecht",
      location: "Utrecht",
      start: "2017",
      end: "2021",
      description: "",
    },
    {
      degree: "Minor Digital Marketing",
      school: "Hogeschool van Amsterdam",
      location: "Amsterdam",
      start: "2020",
      end: "2021",
      description: "Focus op customer journeys, marketing automation en conversieonderzoek.",
    },
  ],
  skills: [
    { name: "Campagnebeheer", level: 5 },
    { name: "Marketing automation", level: 4 },
    { name: "SEO", level: 4 },
    { name: "Google Analytics", level: 4 },
    { name: "Contentstrategie", level: 4 },
    { name: "A/B-testen", level: 4 },
    { name: "Stakeholdermanagement", level: 4 },
  ],
  languages: [
    { name: "Nederlands", level: "Moedertaal" },
    { name: "Engels", level: "Vloeiend" },
    { name: "Duits", level: "Basis" },
  ],
  internships: [],
  interests: ["Content", "Data", "Design", "Gedragspsychologie"],
  properties: ["Analytisch", "Creatief", "Resultaatgericht"],
  courses: [
    { name: "Google Analytics 4", institution: "Google Skillshop", year: "2024" },
    { name: "SEO Copywriting", institution: "Frankwatching Academy", year: "2023" },
  ],
  awards: ["Genomineerd voor interne campaign excellence award 2023"],
  references: [],
  sideActivities: [],
  customSections: [],
};

const englishPreviewData: CVData = {
  personal: {
    name: "Emma Johnson",
    title: "Customer Success Specialist",
    resumeLanguage: "en",
    email: "emma.johnson@example.com",
    phone: "+31 6 1234 5678",
    location: "Rotterdam",
    address: "",
    postalCode: "",
    summary:
      "Customer success specialist with 5 years of experience supporting SaaS and e-commerce clients in the Netherlands. Strong in onboarding, retention, ticket analysis and clear stakeholder communication across sales, product and support teams.",
    birthDate: "",
    birthPlace: "",
    nationality: "",
    driversLicense: "",
    gender: "",
    maritalStatus: "",
    linkedIn: "linkedin.com/in/emmajohnson",
    github: "",
    website: "",
    photo: previewPhoto,
  },
  experience: [
    {
      role: "Customer Success Specialist",
      company: "Northstar Software",
      location: "Amsterdam",
      start: "2021",
      end: "present",
      description:
        "Owns onboarding, adoption check-ins and renewal preparation for mid-market clients across Europe.",
      highlights: [
        "Managed onboarding and adoption for 60+ international B2B clients across email, calls and product training.",
        "Improved first-90-day activation by creating clearer onboarding plans and shared success milestones.",
        "Reduced repeated support questions by improving help-centre content and customer handover notes.",
      ],
    },
    {
      role: "Support Specialist",
      company: "Harbour Commerce",
      location: "Rotterdam",
      start: "2019",
      end: "2021",
      description:
        "Handled customer requests for a fast-growing e-commerce platform and supported process improvements.",
      highlights: [
        "Resolved customer tickets in Zendesk while maintaining clear, professional communication.",
        "Created internal macros and knowledge-base updates that helped the team answer common questions faster.",
      ],
    },
  ],
  education: [
    {
      degree: "BA International Business",
      school: "Rotterdam University of Applied Sciences",
      location: "Rotterdam",
      start: "2017",
      end: "2021",
      description: "",
    },
    {
      degree: "Exchange Semester - Business Communication",
      school: "Erasmus University Rotterdam",
      location: "Rotterdam",
      start: "2020",
      end: "2020",
      description: "Coursework in intercultural communication, negotiation and service design.",
    },
  ],
  skills: [
    { name: "Customer onboarding", level: 5 },
    { name: "Retention", level: 4 },
    { name: "Zendesk", level: 4 },
    { name: "HubSpot", level: 4 },
    { name: "Reporting", level: 4 },
    { name: "SLA management", level: 4 },
    { name: "Product feedback", level: 4 },
  ],
  languages: [
    { name: "English", level: "Fluent" },
    { name: "Dutch", level: "Basic" },
    { name: "Spanish", level: "Good" },
  ],
  internships: [],
  interests: ["SaaS", "Customer research", "Process improvement", "Service design"],
  properties: ["Empathetic", "Structured", "Commercially aware"],
  courses: [
    { name: "Customer Success Management", institution: "SuccessCOACHING", year: "2024" },
    { name: "Zendesk Support Administrator", institution: "Zendesk", year: "2023" },
  ],
  awards: ["Customer team quality award for consistently strong CSAT feedback"],
  references: [],
  sideActivities: [],
  customSections: [],
};

function isEmptyCv(data: CVData) {
  return (
    !data.personal.name?.trim() &&
    !data.personal.title?.trim() &&
    !data.personal.email?.trim() &&
    !data.personal.phone?.trim() &&
    !data.personal.location?.trim() &&
    !data.personal.summary?.trim() &&
    data.experience.length === 0 &&
    data.education.length === 0 &&
    data.skills.length === 0 &&
    data.languages.length === 0
  );
}

interface TemplateGalleryProps {
  currentTemplateId: string;
  data: CVData;
  onSelectTemplate: (templateId: string, defaultThemeId: string) => void;
  uiLanguage?: UiLanguage;
  compact?: boolean;
  idPrefix?: string;
}

export function TemplateGallery({
  currentTemplateId,
  data,
  onSelectTemplate,
  uiLanguage = "nl",
  compact = false,
  idPrefix = "template-gallery",
}: TemplateGalleryProps) {
  const isEnglish = uiLanguage === "en";
  const previewData = isEmptyCv(data)
    ? isEnglish
      ? englishPreviewData
      : dutchPreviewData
    : data;

  return (
    <div className={compact ? "space-y-6" : "space-y-8"}>
      {templateGroups.map((group) => {
        const templates = group.templateIds
          .map((templateId) => templateList.find((template) => template.id === templateId))
          .filter((template): template is TemplateConfig => Boolean(template));
        const headingId = `${idPrefix}-${group.id}`;

        return (
          <section key={group.id} aria-labelledby={headingId}>
            <div className="mb-3">
              <h3
                id={headingId}
                className={compact ? "text-sm font-bold text-gray-950" : "text-base font-bold text-gray-950"}
              >
                {isEnglish ? group.label.en : group.label.nl}
              </h3>
              <p className={`mt-1 text-gray-600 ${compact ? "text-xs leading-relaxed" : "text-sm"}`}>
                {isEnglish ? group.description.en : group.description.nl}
              </p>
            </div>
            <div className={compact ? "grid grid-cols-2 gap-3" : "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"}>
              {templates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  data={previewData}
                  uiLanguage={uiLanguage}
                  compact={compact}
                  isSelected={template.id === currentTemplateId}
                  onSelect={() => onSelectTemplate(template.id, template.defaultThemeId)}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

interface TemplateSelectorProps {
  currentTemplateId: string;
  data: CVData;
  isOpen: boolean;
  reviewMode?: boolean;
  onOpen: () => void;
  onClose: (reason: "dismissed" | "selected") => void;
  onSelectTemplate: (templateId: string, defaultThemeId: string) => void;
  uiLanguage?: UiLanguage;
}

export default function TemplateSelector({
  currentTemplateId,
  data,
  isOpen,
  reviewMode = false,
  onOpen,
  onClose,
  onSelectTemplate,
  uiLanguage = "nl",
}: TemplateSelectorProps) {
  const isEnglish = uiLanguage === "en";

  const currentTemplate = templateList.find((template) => template.id === currentTemplateId);
  const templateModal = (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto p-4 pt-16 sm:pt-20">
      <div className="fixed inset-0 bg-black/50" onClick={() => onClose("dismissed")} />

      <div className="relative flex max-h-[calc(100vh-5rem)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[calc(100vh-6rem)]">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">
            {isEnglish ? "Choose a template" : "Kies een template"}
          </h2>
          <button
            type="button"
            onClick={() => onClose("dismissed")}
            className="rounded-lg p-2 transition hover:bg-gray-100"
            aria-label={isEnglish ? "Close template chooser" : "Templates sluiten"}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <TemplateGallery
            currentTemplateId={currentTemplateId}
            data={data}
            uiLanguage={uiLanguage}
            idPrefix="template-selector"
            onSelectTemplate={(templateId, defaultThemeId) => {
              onSelectTemplate(templateId, defaultThemeId);
              onClose("selected");
            }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        title={
          reviewMode
            ? isEnglish
              ? `Review design. Current template: ${currentTemplate?.name || "Template"}`
              : `Ontwerp bekijken. Huidig template: ${currentTemplate?.nameDutch || "Template"}`
            : undefined
        }
        aria-label={
          reviewMode
            ? isEnglish
              ? `Review design. Current template: ${currentTemplate?.name || "Template"}`
              : `Ontwerp bekijken. Huidig template: ${currentTemplate?.nameDutch || "Template"}`
            : isEnglish
              ? `Choose template. Current: ${currentTemplate?.name || "Template"}`
              : `Template kiezen. Huidig: ${currentTemplate?.nameDutch || "Template"}`
        }
        className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-semibold transition ${
          reviewMode
            ? "border-blue-300 bg-blue-50 text-blue-800 hover:bg-blue-100"
            : "border-transparent bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        <svg
          className={`h-4 w-4 ${reviewMode ? "text-blue-700" : "text-gray-600"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
          />
        </svg>
        <span className="hidden sm:inline">
          {reviewMode
            ? isEnglish
              ? "Review design"
              : "Ontwerp bekijken"
            : isEnglish
              ? currentTemplate?.name || "Template"
              : currentTemplate?.nameDutch || "Template"}
        </span>
      </button>

      {isOpen ? createPortal(templateModal, document.body) : null}
    </>
  );
}

function TemplateCard({
  template,
  data,
  uiLanguage,
  compact,
  isSelected,
  onSelect,
}: {
  template: TemplateConfig;
  data: CVData;
  uiLanguage: UiLanguage;
  compact: boolean;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const TemplateComponent = templateComponents.get(template.id);
  const theme = getThemeById(template.defaultThemeId);
  const templateName = uiLanguage === "en" ? template.name : template.nameDutch;

  if (!TemplateComponent) return null;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={templateName}
      aria-pressed={isSelected}
      className={`rounded-lg border-2 text-left transition-all hover:shadow-md ${
        compact ? "p-2" : "p-3"
      } ${
        isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div
        aria-hidden="true"
        className={`mb-2 flex items-center justify-center overflow-hidden rounded-md border border-gray-100 bg-gray-50 ${
          compact ? "h-[150px]" : "h-[200px]"
        }`}
      >
        <div style={{ zoom: compact ? 0.17 : 0.22, pointerEvents: "none", flexShrink: 0 }}>
          <LinkTextProvider disableAnchors>
            {createElement(TemplateComponent, { data, theme })}
          </LinkTextProvider>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className={`${compact ? "text-xs" : "text-sm"} font-medium text-gray-900`}>
          {templateName}
        </span>
        {isSelected && (
          <svg className="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </button>
  );
}
