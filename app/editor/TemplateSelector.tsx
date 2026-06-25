"use client";

import { createElement, useState } from "react";
import { templateList, getThemeById } from "@/lib/templates/registry";
import { TemplateConfig } from "@/lib/templates";
import { getTemplateComponent } from "@/app/editor/templates";
import type { CVData } from "@/lib/cv";
import { LinkTextProvider } from "@/app/editor/templates/link-utils";
import { UiLanguage } from "@/lib/ui-language";

const templateComponents = new Map(
  templateList.map((template) => [template.id, getTemplateComponent(template.id)]),
);

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

interface TemplateSelectorProps {
  currentTemplateId: string;
  data: CVData;
  onSelectTemplate: (templateId: string, defaultThemeId: string) => void;
  uiLanguage?: UiLanguage;
}

export default function TemplateSelector({
  currentTemplateId,
  data,
  onSelectTemplate,
  uiLanguage = "nl",
}: TemplateSelectorProps) {
  const isEnglish = uiLanguage === "en";
  const [isOpen, setIsOpen] = useState(false);

  const currentTemplate = templateList.find((template) => template.id === currentTemplateId);
  const previewData = isEmptyCv(data)
    ? isEnglish
      ? englishPreviewData
      : dutchPreviewData
    : data;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-700 transition hover:bg-gray-200"
      >
        <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
          />
        </svg>
        <span className="hidden sm:inline">
          {isEnglish
            ? currentTemplate?.name || "Template"
            : currentTemplate?.nameDutch || "Template"}
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />

          <div className="relative flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-bold text-gray-900">
                {isEnglish ? "Choose a template" : "Kies een template"}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 transition hover:bg-gray-100"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {templateList.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    data={previewData}
                    uiLanguage={uiLanguage}
                    isSelected={template.id === currentTemplateId}
                    onSelect={() => {
                      onSelectTemplate(template.id, template.defaultThemeId);
                      setIsOpen(false);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function TemplateCard({
  template,
  data,
  uiLanguage,
  isSelected,
  onSelect,
}: {
  template: TemplateConfig;
  data: CVData;
  uiLanguage: UiLanguage;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const TemplateComponent = templateComponents.get(template.id);
  const theme = getThemeById(template.defaultThemeId);

  if (!TemplateComponent) return null;

  return (
    <button
      onClick={onSelect}
      className={`rounded-xl border-2 p-3 text-left transition-all hover:shadow-md ${
        isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="mb-2 flex h-[200px] items-start justify-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
        <div style={{ zoom: 0.22, pointerEvents: "none", flexShrink: 0 }}>
          <LinkTextProvider disableAnchors>
            {createElement(TemplateComponent, { data, theme })}
          </LinkTextProvider>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-900">
          {uiLanguage === "en" ? template.name : template.nameDutch}
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
